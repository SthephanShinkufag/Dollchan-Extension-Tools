/*==[ Browser.js ]============================================================================================
                                      BROWSER DETECTORS AND DEPENDENCIES
============================================================================================================*/

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
	const firefox = ua.includes('Gecko/');
	const webkit = ua.includes('WebKit/');
	const chrome = webkit && ua.includes('Chrome/');
	const safari = webkit && !chrome;
	const isChromeStorage = !!window.chrome && !!window.chrome.storage;
	const isScriptStorage = !!scriptStorage && !ua.includes('Opera Mobi');
	let isGM = false;
	let isNewGM = typeof GM !== 'undefined' && typeof GM.setValue === 'function';
	if(!isNewGM) {
		try {
			isGM = (typeof GM_setValue === 'function') &&
				(!chrome || !GM_setValue.toString().includes('not supported'));
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
		if(firefox || safari) {
			needFileHack = !FormData.prototype.get;
		}
	} catch(e) {
		needFileHack = true;
	}
	if(needFileHack && FormData) {
		const origFormData = FormData;
		const origAppend = FormData.prototype.append;
		FormData = function FormData(form) {
			const rv = form ? new origFormData(form) : new origFormData();
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
			return navigator.userAgent + (this.Firefox ? ' [' + navigator.buildID + ']' : '');
		},
		Firefox: firefox,
		WebKit: webkit,
		Chrome: chrome,
		Safari: safari,
		Presto: !!window.opera,
		MsEdge: ua.includes('Edge/'),
		isGM: isGM,
		isNewGM: isNewGM,
		get isESNext() {
			return typeof de_main_func_outer === 'undefined';
		},
		isChromeStorage: isChromeStorage,
		isScriptStorage: isScriptStorage,
		isGlobal: isGM || isNewGM || isChromeStorage || isScriptStorage,
		hasGMXHR: (typeof GM_xmlhttpRequest === 'function') || (isNewGM && (typeof GM.xmlHttpRequest === 'function')),
		get scriptInstall() {
			if(this.Firefox) {
				if(this.isNewGM) {
					if(GM.info) {
						return `${ GM.info.scriptHandler } ${ GM.info.version }`;
					}
					return 'Greasemonkey';
				}
				return typeof GM_info !== 'undefined' ? 'Greasemonkey' : 'Scriptish';
			}
			return isChromeStorage ? 'Chrome extension' : isGM ? 'Monkey' : 'Native userscript';
		},
		cssMatches(leftSel, ...rules) {
			return leftSel + rules.join(', ' + leftSel);
		},
		fixLink: safari ? getAbsLink : function fixLink(url) {
			return url;
		},
		get hasTemplate() {
			const value = 'content' in document.createElement('template');
			Object.defineProperty(this, 'hasTemplate', { value });
			return value;
		},
		get hasWorker() {
			let val = false;
			try {
				val = 'Worker' in window && 'URL' in window;
			} catch(e) {}
			if(val && this.Firefox) {
				val = +(navigator.userAgent.match(/rv:(\d{2,})\./) || [])[1] >= 40;
			}
			Object.defineProperty(this, 'hasWorker', { value: val });
			return val;
		},
		get canPlayMP3() {
			const val = !!new Audio().canPlayType('audio/mpeg;');
			Object.defineProperty(this, 'canPlayMP3', { value: val });
			return val;
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
			const value = document.compatMode && document.compatMode == 'CSS1Compat' ?
				() => doc.documentElement.clientHeight : () => docBody.clientHeight;
			Object.defineProperty(this, 'viewportHeight', { value });
			return value;
		},
		get viewportWidth() {
			const value = document.compatMode && document.compatMode == 'CSS1Compat' ?
				() => doc.documentElement.clientWidth : () => docBody.clientWidth;
			Object.defineProperty(this, 'viewportWidth', { value });
			return value;
		},
		// Workaround for old greasemonkeys
		getUnsafeUint8Array(data, i, len) {
			let ctor = Uint8Array;
			if(!nav.isNewGM && nav.Firefox) {
				try {
					if(!(new Uint8Array(data) instanceof Uint8Array)) {
						ctor = unsafeWindow.Uint8Array;
					}
				} catch(e) {
					ctor = unsafeWindow.Uint8Array;
				}
			}
			switch(arguments.length) {
				case 1: return new ctor(data);
				case 2: return new ctor(data, i);
				case 3: return new ctor(data, i, len);
			}
			throw new Error();
		},
		getUnsafeDataView(data, offset) {
			const rv = new DataView(data, offset || 0);
			return nav.isNewGM || !nav.Firefox || (rv instanceof DataView) ? rv : new unsafeWindow.DataView(data, offset || 0);
		}
	};
}
