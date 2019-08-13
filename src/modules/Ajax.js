/* ==[ Ajax.js ]==============================================================================================
                                                AJAX FUNCTIONS
=========================================================================================================== */

// Main AJAX util
function $ajax(url, params = null, isCORS = false) {
	let resolve, reject, cancelFn;
	const needTO = params ? params.useTimeout : false;
	const WAITING_TIME = 5e3;
	if(((isCORS ? !nav.hasGMXHR : !nav.canUseNativeXHR) || aib.hasRefererErr && nav.canUseFetch) &&
		(nav.canUseFetchBlob || !url.startsWith('blob'))
	) {
		if(!params) {
			params = {};
		}
		params.referrer =
			doc.referrer.startsWith(aib.prot + '//' + aib.host) ? doc.referrer : deWindow.location;
		if(params.data) {
			params.body = params.data;
			delete params.data;
		}
		if(isCORS) {
			params.mode = 'cors';
		}
		url = getAbsLink(url);
		// Chrome-extension: avoid CORS in content script. Sending data to background.js
		if(isCORS && nav.isChrome && nav.scriptHandler === 'WebExtension') {
			if(params.body) {
				// Converting image as Uint8Array to text data for sending in POST request from background.js
				let textData = '';
				const arrData = params.body.arr;
				for(let i = 0, len = arrData.length; i < len; ++i) {
					textData += String.fromCharCode(arrData[i]);
				}
				params.body.arr = textData;
			}
			chrome.runtime.sendMessage({ 'de-messsage': 'corsRequest', url, params }, res => {
				const { answer } = res;
				if(res.isError || !aib.isAjaxStatusOK(res.status)) {
					reject(res.statusText ?
						new AjaxError(res.status, res.statusText) : getErrorMessage(answer));
					return;
				}
				const obj = {};
				switch(params.responseType) {
				case 'arraybuffer':
				case 'blob': { // Converting text data from the background.js response to arraybuffer/blob
					const buf = new ArrayBuffer(answer.length);
					const bufView = new Uint8Array(buf);
					for(let i = 0, len = answer.length; i < len; ++i) {
						bufView[i] = answer.charCodeAt(i);
					}
					obj.response = params.responseType === 'blob' ? new Blob([buf]) : buf;
					break;
				}
				default: obj.responseText = answer;
				}
				resolve(obj);
			});
		} else {
			const controller = new AbortController();
			params.signal = controller.signal;
			const loadTO = needTO && setTimeout(() => {
				reject(AjaxError.Timeout);
				try {
					controller.abort();
				} catch(err) {}
			}, WAITING_TIME);
			cancelFn = () => {
				if(needTO) {
					clearTimeout(loadTO);
				}
				controller.abort();
			};
			fetch(url, params).then(async res => {
				if(!aib.isAjaxStatusOK(res.status)) {
					reject(new AjaxError(res.status, res.statusText));
					return;
				}
				switch(params.responseType) {
				case 'arraybuffer': res.response = await res.arrayBuffer(); break;
				case 'blob': res.response = await res.blob(); break;
				default: res.responseText = await res.text();
				}
				resolve(res);
			}).catch(err => reject(getErrorMessage(err)));
		}
	} else if((isCORS || !nav.canUseNativeXHR) && nav.hasGMXHR) {
		let gmxhr;
		const timeoutFn = () => {
			reject(AjaxError.Timeout);
			try {
				gmxhr.abort();
			} catch(err) {}
		};
		let loadTO = needTO && setTimeout(timeoutFn, WAITING_TIME);
		const obj = {
			method : (params && params.method) || 'GET',
			url    : nav.fixLink(url),
			onreadystatechange(e) {
				if(needTO) {
					clearTimeout(loadTO);
				}
				if(e.readyState === 4) {
					if(aib.isAjaxStatusOK(e.status)) {
						resolve(e);
					} else {
						reject(new AjaxError(e.status, e.statusText));
					}
				} else if(needTO) {
					loadTO = setTimeout(timeoutFn, WAITING_TIME);
				}
			}
		};
		if(params) {
			if(params.onprogress) {
				obj.upload = { onprogress: params.onprogress };
				delete params.onprogress;
			}
			delete params.method;
			Object.assign(obj, params);
		}
		if(nav.hasNewGM) {
			GM.xmlHttpRequest(obj);
			cancelFn = emptyFn; // GreaseMonkey 4 cannot cancel xhr's
		} else {
			gmxhr = GM_xmlhttpRequest(obj);
			cancelFn = () => {
				if(needTO) {
					clearTimeout(loadTO);
				}
				try {
					gmxhr.abort();
				} catch(err) {}
			};
		}
	} else if(nav.canUseNativeXHR) {
		const xhr = new XMLHttpRequest();
		const timeoutFn = () => {
			reject(AjaxError.Timeout);
			xhr.abort();
		};
		let loadTO = needTO && setTimeout(timeoutFn, WAITING_TIME);
		if(params && params.onprogress) {
			xhr.upload.onprogress = params.onprogress;
		}
		xhr.onreadystatechange = ({ target }) => {
			if(needTO) {
				clearTimeout(loadTO);
			}
			if(target.readyState === 4) {
				if(aib.isAjaxStatusOK(target.status)) {
					resolve(target);
				} else {
					reject(new AjaxError(target.status, target.statusText));
				}
			} else if(needTO) {
				loadTO = setTimeout(timeoutFn, WAITING_TIME);
			}
		};
		try {
			xhr.open((params && params.method) || 'GET', getAbsLink(url), true);
			if(params) {
				if(params.responseType) {
					xhr.responseType = params.responseType;
				}
				const { headers } = params;
				if(headers) {
					for(const h in headers) {
						if(headers.hasOwnProperty(h)) {
							xhr.setRequestHeader(h, headers[h]);
						}
					}
				}
			}
			xhr.send(params && params.data || null);
			cancelFn = () => {
				if(needTO) {
					clearTimeout(loadTO);
				}
				xhr.abort();
			};
		} catch(err) {
			clearTimeout(loadTO);
			nav.canUseNativeXHR = false;
			return $ajax(url, params);
		}
	} else {
		reject(new AjaxError(0, 'Ajax error: Can`t send any type of request.'));
	}
	return new CancelablePromise((res, rej) => {
		resolve = res;
		reject = rej;
	}, cancelFn);
}

class AjaxError {
	constructor(code, message) {
		this.code = code;
		this.message = message;
	}
	toString() {
		return this.code <= 0 ?
			String(this.message || Lng.noConnect[lang]) :
			`HTTP [${ this.code }] ${ this.message }`;
	}
}
AjaxError.Success = new AjaxError(200, 'OK');
AjaxError.Locked = new AjaxError(-1, { toString: () => Lng.thrClosed[lang] });
AjaxError.Timeout = new AjaxError(0, { toString: () => Lng.noConnect[lang] + ' (timeout)' });

const AjaxCache = {
	clearCache() {
		this._data = new Map();
	},
	fixURL: url => `${ url }${ url.includes('?') ? '&' : '?' }nocache=${ Math.random() }`,
	runCachedAjax(url, useCache) {
		const { hasCacheControl, params } = this._data.get(url) || {};
		const ajaxURL = hasCacheControl === false ? this.fixURL(url) : url;
		return $ajax(ajaxURL, useCache && params || { useTimeout: true }, aib._4chan).then(xhr =>
			this.saveData(url, xhr) ? xhr : $ajax(this.fixURL(url), useCache && params, aib._4chan));
	},
	saveData(url, xhr) {
		let ETag = null;
		let LastModified = null;
		let i = 0;
		let hasCacheControl = false;
		let headers = 'getAllResponseHeaders' in xhr ? xhr.getAllResponseHeaders() : xhr.responseHeaders;
		headers = headers ? /* usual xhr */ headers.split('\r\n') : /* fetch */ xhr.headers;
		for(const idx in headers) {
			if(!headers.hasOwnProperty(idx)) {
				continue;
			}
			let header = headers[idx];
			if(typeof header === 'string') { // usual xhr
				const сIdx = header.indexOf(':');
				if(сIdx === -1) {
					continue;
				}
				const name = header.substring(0, сIdx);
				const value = header.substring(сIdx + 2, header.length);
				header = [name, value];
			}
			const hName = header[0].toLowerCase();
			let matched = true;
			switch(hName) {
			case 'cache-control': hasCacheControl = true; break;
			case 'last-modified': LastModified = header[1]; break;
			case 'etag': ETag = header[1]; break;
			default: matched = false;
			}
			if(matched && ++i === 3) {
				break;
			}
		}
		headers = null;
		if(ETag || LastModified) {
			headers = {};
			if(ETag) {
				headers['If-None-Match'] = ETag;
			}
			if(LastModified) {
				headers['If-Modified-Since'] = LastModified;
			}
		}
		const hasUrl = this._data.has(url);
		this._data.set(url, {
			hasCacheControl,
			params: headers ? { headers, useTimeout: true } : { useTimeout: true }
		});
		return hasUrl || hasCacheControl;
	},

	_data: new Map()
};

function ajaxLoad(url, returnForm = true, useCache = false, checkArch = false) {
	return AjaxCache.runCachedAjax(url, useCache).then(xhr => {
		let el;
		const text = xhr.responseText;
		if(text.includes('</html>')) {
			el = returnForm ? $q(aib.qDForm, $DOM(text)) : $DOM(text);
		}
		return !el ? CancelablePromise.reject(new AjaxError(0, Lng.errCorruptData[lang])) :
			checkArch ? [el, (xhr.responseURL || '').includes('/arch/')] : el;
	}, err => err.code === 304 ? null : CancelablePromise.reject(err));
}

function ajaxPostsLoad(brd, tNum, useCache, useJson = true) {
	if(useJson && aib.JsonBuilder) {
		return AjaxCache.runCachedAjax(aib.getJsonApiUrl(brd, tNum), useCache).then(xhr => {
			try {
				return new aib.JsonBuilder(JSON.parse(xhr.responseText), brd);
			} catch(err) {
				if(err instanceof AjaxError) {
					return CancelablePromise.reject(err);
				}
				console.warn(`API error: ${ err }. Switching to DOM parsing!`);
				aib.JsonBuilder = null;
				return ajaxPostsLoad(brd, tNum, useCache);
			}
		}, err => err.code === 304 ? null : CancelablePromise.reject(err));
	}
	return aib.iichan ?
		ajaxLoad(aib.getThrUrl(brd, tNum), true, useCache, true)
			.then(data => data && data[0] ? new DOMPostsBuilder(data[0], data[1]) : null) :
		ajaxLoad(aib.getThrUrl(brd, tNum), true, useCache)
			.then(form => form ? new DOMPostsBuilder(form) : null);
}

function infoLoadErrors(err, showError = true) {
	const isAjax = err instanceof AjaxError;
	const eCode = isAjax ? err.code : 0;
	if(eCode === 200) {
		closePopup('newposts');
	} else if(isAjax && eCode === 0) {
		$popup('newposts', err.message ? String(err.message) :
			`${ Lng.noConnect[lang] }: \n${ getErrorMessage(err) }`);
	} else {
		$popup('newposts', `${ Lng.thrNotFound[lang] } (№${ aib.t }): \n${ getErrorMessage(err) }`);
		if(showError) {
			doc.title = `{${ eCode }} ${ doc.title }`;
		}
	}
}
