/* ==[ Browser.js ]===========================================================================================
                                      BROWSER DETECTORS AND DEPENDENCIES
=========================================================================================================== */

// Browser identification and browser-specific hacks
function initBrowser() {
	locStorage = deWindow.localStorage;
	sesStorage = deWindow.sessionStorage;
	const { userAgent } = navigator;
	const isFirefox = userAgent.includes('Gecko/');
	const isWebkit = userAgent.includes('WebKit/');
	const isChrome = isWebkit && userAgent.includes('Chrome/');
	const isSafari = isWebkit && !isChrome;

	// Dollchan installation detection (userscript manager / webextension / in-page)
	let scriptHandler;
	let isInPage = false;
	let isWebExtension = false;
	let hasGMXHR = false;
	let hasOldGM = false;
	let hasWebStorage = false;
	const hasNewGM = typeof GM !== 'undefined';
	if(hasNewGM) {
		const handlerName = GM.info?.scriptHandler;
		if(handlerName === 'FireMonkey') {
			hasOldGM = true;
		} else {
			hasGMXHR = typeof GM.xmlHttpRequest === 'function';
		}
		scriptHandler = handlerName ? handlerName + ' ' + GM.info.version :
			isFirefox ? 'Greasemonkey' : 'Unknown';
	} else if(typeof GM_info !== 'undefined') {
		const handlerName = GM_info?.scriptHandler;
		hasGMXHR = typeof GM_xmlhttpRequest === 'function';
		scriptHandler = handlerName ? handlerName + ' ' + GM_info.version :
			isFirefox ? 'Greasemonkey' : 'Unknown';
	} else {
		hasWebStorage = (isFirefox || ('chrome' in deWindow)) &&
			(typeof chrome === 'object') && !!chrome && !!chrome.storage;
		if(hasWebStorage) {
			isWebExtension = true;
			scriptHandler = 'WebExtension';
		} else {
			isInPage = true;
			scriptHandler = 'In-page';
		}
	}

	// XXX: Firefox < 39, Chrome < 50, Safari < 11 - FormData hack
	let needFileHack = false;
	try {
		new File([''], '');
		if(isFirefox || isSafari) {
			needFileHack = !FormData.prototype.get;
		}
	} catch(err) {
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
				return origAppend.apply(this, [name, value, fileName]);
			};
			return rv;
		};
		deWindow.File = function File(arr, name) {
			const rv = new Blob(arr);
			rv.name = name;
			return rv;
		};
	}

	return {
		canUseFetch     : 'AbortController' in deWindow, // Firefox 57+, Chrome 66+, Safari 11.1+,
		canUseNativeXHR : true,
		firefoxVer      : isFirefox ? +(userAgent.match(/Firefox\/(\d+)/) || [0, 0])[1] : 0,
		hasGlobalStorage: hasOldGM || hasNewGM || hasWebStorage,
		hasGMXHR,
		hasNewGM,
		hasOldGM,
		hasWebStorage,
		isESNext        : typeof deMainFuncOuter === 'undefined',
		isFirefox,
		isInPage,
		isMsEdge        : userAgent.includes('Edge/'),
		isMobile        : /Android|iPhone/i.test(userAgent),
		isSafari,
		isTampermonkey  : scriptHandler.startsWith('Tampermonkey'),
		isViolentmonkey : scriptHandler.startsWith('Violentmonkey'),
		isWebExtension,
		isWebkit,
		scriptHandler,
		userAgent       : userAgent + (isFirefox ? ` [${ navigator.buildID }]` : ''),

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
			const func = dE.matches || dE.mozMatchesSelector || dE.webkitMatchesSelector;
			const value = (el, sel) => func.call(el, sel);
			Object.defineProperty(this, 'matchesSelector', { value });
			return value;
		},
		get viewportHeight() {
			const value = doc.compatMode && doc.compatMode === 'CSS1Compat' ?
				() => doc.documentElement.clientHeight : () => doc.body.clientHeight;
			Object.defineProperty(this, 'viewportHeight', { value });
			return value;
		},
		get viewportWidth() {
			const value = doc.compatMode && doc.compatMode === 'CSS1Compat' ?
				() => doc.documentElement.clientWidth : () => doc.body.clientWidth;
			Object.defineProperty(this, 'viewportWidth', { value });
			return value;
		},
		// XXX: Firefox + old Greasemonkey
		// Hack to prevent 'Accessing TypedArray data over Xrays is slow, and forbidden' errors
		unsafeUint8Array(data, i, len) {
			let Ctor = Uint8Array;
			if(this.isFirefox && (this.hasOldGM || this.isTampermonkey)) {
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
		// XXX: Firefox + old Greasemonkey
		unsafeDataView(data, offset = 0) {
			const value = new DataView(data, offset);
			return this.isFirefox && this.hasOldGM && !(value instanceof DataView) ?
				new unsafeWindow.DataView(data, offset) : value;
		}
	};
}
