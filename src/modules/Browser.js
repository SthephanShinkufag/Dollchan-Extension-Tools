/* ==[ Browser.js ]===========================================================================================
                                      BROWSER DETECTORS AND DEPENDENCIES
=========================================================================================================== */

function checkStorage() {
	try {
		locStorage = window.localStorage;
		sesStorage = window.sessionStorage;
		sesStorage['__de-test'] = 1;
	} catch(e) {
		if(typeof unsafeWindow !== 'undefined') {
			locStorage = unsafeWindow.localStorage;
			sesStorage = unsafeWindow.sessionStorage;
		}
	}
	if(!(locStorage && (typeof locStorage === 'object') && sesStorage)) {
		console.error('Webstorage error: please, enable webstorage!');
		return false;
	}
	return true;
}

// Browser identification and browser-specific hacks
function initNavFuncs() {
	const ua = navigator.userAgent;
	const isFirefox = ua.includes('Gecko/');
	const isWebkit = ua.includes('WebKit/');
	const isChrome = isWebkit && ua.includes('Chrome/');
	const isSafari = isWebkit && !isChrome;
	const isChromeStorage = (typeof chrome === 'object') && !!chrome && !!chrome.storage;
	const isScriptStorage = !!scriptStorage && !ua.includes('Opera Mobi');
	const isNewGM = /* global GM */ typeof GM !== 'undefined' && typeof GM.xmlHttpRequest === 'function';
	let isGM = false;
	if(!isNewGM) {
		try {
			isGM = (typeof GM_setValue === 'function') &&
				(!isChrome || !GM_setValue.toString().includes('not supported'));
		} catch(e) {
			isGM = e.message === 'Permission denied to access property "toString"';
		}
	}
	if(!('requestAnimationFrame' in window)) { // XXX: nav.Presto
		window.requestAnimationFrame = fn => setTimeout(fn, 0);
	}
	if(!('remove' in Element.prototype)) { // XXX: nav.Presto
		Element.prototype.remove = function() {
			if(this.parentNode) {
				this.parentNode.removeChild(this);
			}
		};
	}
	let needFileHack = false;
	try {
		new File([''], '');
		if(isFirefox || isSafari) {
			needFileHack = !FormData.prototype.get;
		}
	} catch(e) {
		needFileHack = true;
	}
	if(needFileHack && FormData) {
		const OrigFormData = FormData;
		const origAppend = FormData.prototype.append;
		FormData = function FormData(form) {
			const rv = form ? new OrigFormData(form) : new OrigFormData();
			rv.append = function append(name, value, fileName = null) {
				if(value instanceof Blob && 'name' in value && fileName === null) {
					return origAppend.call(this, name, value, value.name);
				}
				return origAppend.apply(this, arguments);
			};
			return rv;
		};
		window.File = function File(arr, name) {
			const rv = new Blob(arr);
			rv.name = name;
			return rv;
		};
	}
	if('toJSON' in aProto) {
		delete aProto.toJSON;
	}
	nav = {
		get ua() {
			return navigator.userAgent + (this.isFirefox ? ' [' + navigator.buildID + ']' : '');
		},
		isFirefox,
		isWebkit,
		isChrome,
		isSafari,
		isGM,
		isNewGM,
		isChromeStorage,
		isScriptStorage,
		Presto   : !!window.opera,
		MsEdge   : ua.includes('Edge/'),
		isGlobal : isGM || isNewGM || isChromeStorage || isScriptStorage,
		hasGMXHR : (typeof GM_xmlhttpRequest === 'function') ||
			isNewGM && (typeof GM.xmlHttpRequest === 'function'),
		get isESNext() {
			return typeof deMainFuncOuter === 'undefined';
		},
		get scriptInstall() {
			if(this.isFirefox) {
				if(this.isNewGM) {
					if(GM.info) {
						return `${ GM.info.scriptHandler } ${ GM.info.version }`;
					}
					return 'Greasemonkey';
				}
				return typeof GM_info !== 'undefined' ? 'Greasemonkey' : 'Scriptish';
			}
			return isChromeStorage ? 'WebExtension' : isGM || isNewGM ? 'Monkey' : 'Native userscript';
		},
		cssMatches(leftSel, ...rules) {
			return leftSel + rules.join(', ' + leftSel);
		},
		fixLink: isSafari ? getAbsLink : function fixLink(url) {
			return url;
		},
		get hasTemplate() {
			const value = 'content' in document.createElement('template');
			Object.defineProperty(this, 'hasTemplate', { value });
			return value;
		},
		get hasWorker() {
			let value = false;
			try {
				value = 'Worker' in window && 'URL' in window;
			} catch(e) {}
			if(value && this.isFirefox) {
				value = +(navigator.userAgent.match(/rv:(\d{2,})\./) || [])[1] >= 40;
			}
			Object.defineProperty(this, 'hasWorker', { value });
			return value;
		},
		get canPlayMP3() {
			const value = !!new Audio().canPlayType('audio/mpeg;');
			Object.defineProperty(this, 'canPlayMP3', { value });
			return value;
		},
		get matchesSelector() {
			const dE = doc.documentElement;
			const func = dE.matches || dE.mozMatchesSelector ||
				dE.webkitMatchesSelector || dE.oMatchesSelector;
			const value = (el, sel) => func.call(el, sel);
			Object.defineProperty(this, 'matchesSelector', { value });
			return value;
		},
		get viewportHeight() {
			const value = document.compatMode && document.compatMode === 'CSS1Compat' ?
				() => doc.documentElement.clientHeight : () => docBody.clientHeight;
			Object.defineProperty(this, 'viewportHeight', { value });
			return value;
		},
		get viewportWidth() {
			const value = document.compatMode && document.compatMode === 'CSS1Compat' ?
				() => doc.documentElement.clientWidth : () => docBody.clientWidth;
			Object.defineProperty(this, 'viewportWidth', { value });
			return value;
		},
		// Workaround for old greasemonkeys
		getUnsafeUint8Array(data, i, len) {
			let Ctor = Uint8Array;
			if(!nav.isNewGM && nav.isFirefox) {
				try {
					if(!(new Uint8Array(data) instanceof Uint8Array)) {
						Ctor = unsafeWindow.Uint8Array;
					}
				} catch(e) {
					Ctor = unsafeWindow.Uint8Array;
				}
			}
			switch(arguments.length) {
			case 1: return new Ctor(data);
			case 2: return new Ctor(data, i);
			case 3: return new Ctor(data, i, len);
			}
			throw new Error();
		},
		getUnsafeDataView(data, offset) {
			const rv = new DataView(data, offset || 0);
			return nav.isNewGM || !nav.isFirefox || (rv instanceof DataView) ?
				rv : new unsafeWindow.DataView(data, offset || 0);
		}
	};
}
