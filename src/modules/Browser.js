/* ==[ Browser.js ]===========================================================================================
                                      BROWSER DETECTORS AND DEPENDENCIES
=========================================================================================================== */

function checkStorage() {
	try {
		locStorage = window.localStorage;
		sesStorage = window.sessionStorage;
		sesStorage['de-test'] = 1;
	} catch(err) {
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
	let scriptHandler, isGM = false;
	if(!isNewGM) {
		try {
			isGM = (typeof GM_setValue === 'function') &&
				(!isChrome || !GM_setValue.toString().includes('not supported'));
		} catch(err) {
			isGM = err.message === 'Permission denied to access property "toString"';
		}
		scriptHandler = isChromeStorage ? 'WebExtension' :
			typeof GM_info === 'undefined' ? isFirefox ? 'Scriptish' : 'Unknown' :
			GM_info.scriptHandler ? `${ GM_info.scriptHandler } ${ GM_info.version }` :
			isFirefox ? 'Greasemonkey' : 'Unknown';
	} else {
		scriptHandler = GM.info ? `${ GM.info.scriptHandler } ${ GM.info.version }` : 'Greasemonkey';
	}
	if(!('requestAnimationFrame' in window)) { // XXX: nav.isPresto
		window.requestAnimationFrame = fn => setTimeout(fn, 0);
	}
	if(!('remove' in Element.prototype)) { // XXX: nav.isPresto
		Element.prototype.remove = function() {
			const el = this.parentNode;
			if(el) {
				el.removeChild(this);
			}
		};
	}
	const nlProto = NodeList.prototype;
	$each = 'forEach' in nlProto ?
		(els, cb) => nlProto.forEach.call(els, cb) :
		(els, cb) => aProto.forEach.call(els, cb);
	let needFileHack = false;
	try {
		new File([''], '');
		if(isFirefox || isSafari) {
			needFileHack = !FormData.prototype.get;
		}
	} catch(ett) {
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
	nav = {
		ua         : navigator.userAgent + (isFirefox ? ` [${ navigator.buildID }]` : ''),
		scriptHandler,
		isESNext   : typeof deMainFuncOuter === 'undefined',
		isFirefox,
		firefoxVer : isFirefox ? +(ua.match(/Gecko\/[^/]+\/(\d+)/) || [0, 0])[1] : 0,
		isWebkit,
		isChrome,
		isSafari,
		isPresto   : !!window.opera,
		isMsEdge   : ua.includes('Edge/'),
		isGM,
		isNewGM,
		isChromeStorage,
		isScriptStorage,
		isGlobal   : isGM || isNewGM || isChromeStorage || isScriptStorage,
		hasGMXHR   : (typeof GM_xmlhttpRequest === 'function') ||
			isNewGM && (typeof GM.xmlHttpRequest === 'function'),
		get canPlayMP3() {
			const value = !!new Audio().canPlayType('audio/mpeg;');
			Object.defineProperty(this, 'canPlayMP3', { value });
			return value;
		},
		get hasTemplate() {
			const value = 'content' in doc.createElement('template');
			Object.defineProperty(this, 'hasTemplate', { value });
			return value;
		},
		get hasWorker() {
			let value = false;
			try {
				value = 'Worker' in window && 'URL' in window;
			} catch(err) {}
			value = value && this.firefoxVer >= 40;
			Object.defineProperty(this, 'hasWorker', { value });
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
			const value = doc.compatMode && doc.compatMode === 'CSS1Compat' ?
				() => doc.documentElement.clientHeight : () => docBody.clientHeight;
			Object.defineProperty(this, 'viewportHeight', { value });
			return value;
		},
		get viewportWidth() {
			const value = doc.compatMode && doc.compatMode === 'CSS1Compat' ?
				() => doc.documentElement.clientWidth : () => docBody.clientWidth;
			Object.defineProperty(this, 'viewportWidth', { value });
			return value;
		},
		cssMatches : (leftSel, ...rules) => leftSel + rules.join(', ' + leftSel),
		fixLink    : isSafari ? getAbsLink : url => url,
		// Workaround for old greasemonkeys
		getUnsafeUint8Array(data, i, len) {
			let Ctor = Uint8Array;
			if(!nav.isNewGM && nav.isFirefox) {
				try {
					if(!(new Uint8Array(data) instanceof Uint8Array)) {
						Ctor = unsafeWindow.Uint8Array;
					}
				} catch(err) {
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
