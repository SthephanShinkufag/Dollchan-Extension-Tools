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
	const canUseFetch = 'AbortController' in deWindow; // Firefox 57+, Chrome 66+, Safari 11.1+
	if(!('requestAnimationFrame' in deWindow)) { // XXX: Opera Presto
		deWindow.requestAnimationFrame = fn => setTimeout(fn, 0);
	}
	let needFileHack = false;
	try {
		new File([''], '');
		if(isFirefox || isSafari) {
			needFileHack = !FormData.prototype.get;
		}
	} catch(err) {
		needFileHack = true;
	}
	if(needFileHack && FormData) { // XXX: Firefox < 39, Chrome < 50, Safari < 11 - FormData hack
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
	nav = {
		canUseFetch,
		canUseNativeXHR : true,
		firefoxVer      : isFirefox ? +(ua.match(/Firefox\/(\d+)/) || [0, 0])[1] : 0,
		isESNext        : typeof deMainFuncOuter === 'undefined',
		isFirefox,
		isMsEdge        : ua.includes('Edge/'),
		isPresto        : !!deWindow.opera,
		isSafari,
		isWebkit,
		ua              : navigator.userAgent + (isFirefox ? ` [${ navigator.buildID }]` : ''),

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
		// XXX: Opera Presto - hack for SVG events
		get fixEventEl() {
			const value = !this.isPresto ? el => el :
				el => el?.correspondingUseElement?.ownerSVGElement || el;
			Object.defineProperty(this, 'fixEventEl', { value });
			return value;
		}
	};
}
