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
		canUseFetch    : 'AbortController' in deWindow, // Firefox 57+, Chrome 66+, Safari 11.1+,
		canUseNativeXHR: true,
		firefoxVer     : isFirefox ? +(userAgent.match(/Firefox\/(\d+)/) || [0, 0])[1] : 0,
		isESNext       : typeof deMainFuncOuter === 'undefined',
		isFirefox,
		isInPage       : true,
		isMobile       : /Android|iPhone/i.test(userAgent),
		isMsEdge       : userAgent.includes('Edge/'),
		isSafari,
		isWebkit,
		userAgent      : userAgent + (isFirefox ? ` [${ navigator.buildID }]` : ''),

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
		}
	};
}
