/* ==[ Ajax.js ]==============================================================================================
                                                AJAX FUNCTIONS
=========================================================================================================== */

// Main AJAX util
function $ajax(url, params = null, useNative = nativeXHRworks) {
	let resolve, reject, cancelFn;
	const needTO = params ? params.useTimeout : false;
	if(!useNative && nav.hasGMXHR) {
		let gmxhr;
		const toFunc = () => {
			reject(AjaxError.Timeout);
			try {
				gmxhr.abort();
			} catch(e) {}
		};
		let loadTO = needTO && setTimeout(toFunc, 5e3);
		const obj = {
			method : (params && params.method) || 'GET',
			url    : nav.fixLink(url),
			onreadystatechange(e) {
				if(needTO) {
					clearTimeout(loadTO);
				}
				if(e.readyState === 4) {
					if(e.status === 200 || aib.tiny && e.status === 400) {
						resolve(e);
					} else {
						reject(new AjaxError(e.status, e.statusText));
					}
				} else if(needTO) {
					loadTO = setTimeout(toFunc, 5e3);
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
		// TODO: GreaseMonkey 4.0alpha cannot cancel xhr's
		if(nav.isNewGM) {
			GM.xmlHttpRequest(obj);
			cancelFn = emptyFn;
		} else {
			gmxhr = GM_xmlhttpRequest(obj);
			cancelFn = () => {
				if(needTO) {
					clearTimeout(loadTO);
				}
				try {
					gmxhr.abort();
				} catch(e) {}
			};
		}
	} else {
		const xhr = new XMLHttpRequest();
		const toFunc = () => {
			reject(AjaxError.Timeout);
			xhr.abort();
		};
		let loadTO = needTO && setTimeout(toFunc, 5e3);
		if(params && params.onprogress) {
			xhr.upload.onprogress = params.onprogress;
		}
		xhr.onreadystatechange = ({ target }) => {
			if(needTO) {
				clearTimeout(loadTO);
			}
			if(target.readyState === 4) {
				if(target.status === 200 ||
					(aib.tiny && target.status === 400) ||
					(target.status === 0 && target.responseType === 'arraybuffer')
				) {
					resolve(target);
				} else {
					reject(new AjaxError(target.status, target.statusText));
				}
			} else if(needTO) {
				loadTO = setTimeout(toFunc, 5e3);
			}
		};
		try {
			xhr.open((params && params.method) || 'GET', url, true);
			if(params) {
				if(params.responseType) {
					xhr.responseType = params.responseType;
				}
				const { headers } = params;
				if(headers) {
					for(let h in headers) {
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
		} catch(e) {
			clearTimeout(loadTO);
			nativeXHRworks = false;
			return $ajax(url, params, false);
		}
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
			'HTTP [' + this.code + '] ' + this.message;
	}
}
AjaxError.Success = new AjaxError(200, 'OK');
AjaxError.Locked = new AjaxError(-1, { toString() {
	return Lng.thrClosed[lang];
} });
AjaxError.Timeout = new AjaxError(0, { toString() {
	return Lng.noConnect[lang] + ' (timeout)';
} });

class AjaxCache extends null {
	static clear() {
		AjaxCache._data = new Map();
	}
	static fixURL(url) {
		return url + (url.includes('?') ? '&' : '?') + 'nocache=' + Math.random();
	}
	static runCachedAjax(url, useCache) {
		var { hasCacheControl, params } = AjaxCache._data.get(url) || {};
		var ajaxURL = hasCacheControl === false ? AjaxCache.fixURL(url) : url;
		return $ajax(ajaxURL, useCache && params || { useTimeout: true }).then(xhr =>
			AjaxCache.saveData(url, xhr) ? xhr : $ajax(AjaxCache.fixURL(url), useCache && params)
		);
	}
	static saveData(url, xhr) {
		var ETag = null, LastModified = null, i = 0,
			hasCacheControl = false,
			ajaxHeaders = 'getAllResponseHeaders' in xhr ?
				xhr.getAllResponseHeaders() :
				xhr.responseHeaders;
		for(var header of ajaxHeaders.split('\r\n')) {
			let lHeader = header.toLowerCase();
			if(lHeader.startsWith('cache-control: ')) {
				hasCacheControl = true;
				i++;
			} else if(lHeader.startsWith('last-modified: ')) {
				LastModified = header.substr(15);
				i++;
			} else if(lHeader.startsWith('etag: ')) {
				ETag = header.substr(6);
				i++;
			}
			if(i === 3) {
				break;
			}
		}
		let headers = null;
		if(ETag || LastModified) {
			headers = {};
			if(ETag) {
				headers['If-None-Match'] = ETag;
			}
			if(LastModified) {
				headers['If-Modified-Since'] = LastModified;
			}
		}
		let hasUrl = AjaxCache._data.has(url);
		AjaxCache._data.set(url, {
			hasCacheControl,
			params: headers ? { headers, useTimeout: true } : { useTimeout: true } });
		return hasUrl || hasCacheControl;
	}
}
AjaxCache._data = new Map();

function ajaxLoad(url, returnForm = true, useCache = false, checkArch = false) {
	return AjaxCache.runCachedAjax(url, useCache).then(xhr => {
		var el, text = xhr.responseText;
		if(text.includes('</html>')) {
			el = returnForm ? $q(aib.qDForm, $DOM(text)) : $DOM(text);
		}
		return el ? (!checkArch ? el : [el, (xhr.responseURL || '').includes('/arch/')]) :
			CancelablePromise.reject(new AjaxError(0, Lng.errCorruptData[lang]));
	}, err => err.code === 304 ? null : CancelablePromise.reject(err));
}

function ajaxPostsLoad(brd, tNum, useCache) {
	if(aib.JsonBuilder) {
		return AjaxCache.runCachedAjax(aib.getJsonApiUrl(brd, tNum), useCache).then(xhr => {
			try {
				return new aib.JsonBuilder(JSON.parse(xhr.responseText), brd);
			} catch(e) {
				if(e instanceof AjaxError) {
					return CancelablePromise.reject(e);
				}
				console.warn(`API error: ${ e }. Switching to DOM parsing!`);
				aib.JsonBuilder = null;
				return ajaxPostsLoad(brd, tNum, useCache);
			}
		}, e => e.code === 304 ? null : CancelablePromise.reject(e));
	}
	return aib.iichan ?
		ajaxLoad(aib.getThrUrl(brd, tNum), true, useCache, true)
			.then(data => data && data[0] ? new DOMPostsBuilder(data[0], data[1]) : null) :
		ajaxLoad(aib.getThrUrl(brd, tNum), true, useCache)
			.then(form => form ? new DOMPostsBuilder(form) : null);
}

function infoLoadErrors(e, showError = true) {
	var isAjax = e instanceof AjaxError,
		eCode = isAjax ? e.code : 0;
	if(eCode === 200) {
		closePopup('newposts');
	} else if(isAjax && eCode === 0) {
		$popup('newposts', e.message ? String(e.message) : Lng.noConnect[lang]);
	} else {
		$popup('newposts', Lng.thrNotFound[lang] + aib.t + '): \n' + getErrorMessage(e));
		if(showError) {
			doc.title = '{' + eCode + '} ' + doc.title;
		}
	}
}
