/* ==[ Browser.js ]===========================================================================================
                                      BROWSER DETECTORS AND DEPENDENCIES
=========================================================================================================== */

function checkStorage() {
	try {
		locStorage = deWindow.localStorage;
		sesStorage = deWindow.sessionStorage;
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
	const hasPrestoStorage = !!prestoStorage && !ua.includes('Opera Mobi');
	const hasNewGM = /* global GM */ typeof GM !== 'undefined' && typeof GM.xmlHttpRequest === 'function';
	const canUseFetch = 'AbortController' in deWindow; // Firefox 57+, Chrome 66+, Safari 11.1+
	let scriptHandler, hasWebStorage = false;
	let hasOldGM = false;
	if(hasNewGM) {
		scriptHandler = GM.info ? `${ GM.info.scriptHandler } ${ GM.info.version }` : 'Greasemonkey';
	} else {
		try {
			hasOldGM = (typeof GM_setValue === 'function') &&
				(!isChrome || !GM_setValue.toString().includes('not supported'));
		} catch(err) {
			hasOldGM = err.message === 'Permission denied to access property "toString"'; // Chrome
		}
		hasWebStorage = !hasOldGM && (isFirefox || ('chrome' in deWindow)) &&
			(typeof chrome === 'object') && !!chrome && !!chrome.storage;
		scriptHandler = hasWebStorage ? 'WebExtension' :
			typeof GM_info === 'undefined' ? isFirefox ? 'Scriptish' : 'Unknown' :
			GM_info.scriptHandler ? `${ GM_info.scriptHandler } ${ GM_info.version }` :
			isFirefox ? 'Greasemonkey' : 'Unknown';
	}
	if(!('requestAnimationFrame' in deWindow)) { // XXX: Opera Presto
		deWindow.requestAnimationFrame = fn => setTimeout(fn, 0);
	}
	if(!('remove' in Element.prototype)) { // XXX: Opera Presto
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
	} catch(err) {
		needFileHack = true;
	}
	if(needFileHack && FormData) { // XXX: Firefox < 39, Chrome < 50, Safari < 11
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
		deWindow.File = function File(arr, name) {
			const rv = new Blob(arr);
			rv.name = name;
			return rv;
		};
	}
	nav = {
		cssMatches: (leftSel, ...rules) => leftSel.split(', ').map(
			val => val + rules.join(', ' + val)
		).join(', '),
		canUseFetch,
		canUseFetchBlob: canUseFetch &&
			(!isChrome || scriptHandler !== 'WebExtension' && !scriptHandler.startsWith('Violentmonkey')),
		canUseFetchCORS  : canUseFetch && !scriptHandler.startsWith('Tampermonkey'),
		canUseNativeXHR  : true,
		firefoxVer       : isFirefox ? +(ua.match(/Firefox\/(\d+)/) || [0, 0])[1] : 0,
		fixLink          : isSafari ? getAbsLink : url => url,
		hasGlobalStorage : hasOldGM || hasNewGM || hasWebStorage || hasPrestoStorage,
		hasGMXHR         : (typeof GM_xmlhttpRequest === 'function') ||
			hasNewGM && (typeof GM.xmlHttpRequest === 'function'),
		hasNewGM,
		hasOldGM,
		hasPrestoStorage,
		hasWebStorage,
		isChrome,
		isESNext : typeof deMainFuncOuter === 'undefined',
		isFirefox,
		isMsEdge : ua.includes('Edge/'),
		isPresto : !!deWindow.opera,
		isSafari,
		isWebkit,
		scriptHandler,
		ua       : navigator.userAgent + (isFirefox ? ` [${ navigator.buildID }]` : ''),

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
				value = 'Worker' in deWindow && 'URL' in deWindow;
			} catch(err) {}
			if(value && this.isFirefox) {
				value = this.firefoxVer >= 40;
			}
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
		getUnsafeUint8Array(data, i, len) { // XXX: Old Greasemonkeys
			let Ctor = Uint8Array;
			if(nav.isFirefox && nav.hasOldGM) {
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
		getUnsafeDataView(data, offset) { // XXX: Old Greasemonkeys
			const value = new DataView(data, offset || 0);
			return !nav.isFirefox || !nav.hasOldGM || (value instanceof DataView) ? value :
				new unsafeWindow.DataView(data, offset || 0);
		}
	};
}
