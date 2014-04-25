//============================================================================================================
//													BROWSER
//============================================================================================================

function getNavFuncs() {
	if(!('contains' in String.prototype)) {
		String.prototype.contains = function(s) {
			return this.indexOf(s) !== -1;
		};
		String.prototype.startsWith = function(s) {
			return this.indexOf(s) === 0;
		};
	}
	if(!('repeat' in String.prototype)) {
		String.prototype.repeat = function(nTimes) {
		  return new Array(nTimes + 1).join(this.valueOf());
		};
	}
	if(!('clz32' in Math)) {
		Math.clz32 = function(x) {
			return x < 1 ? x === 0 ? 32 : 0 : 31 - ((Math.log(x) / Math.LN2) >> 0);
		};
	}
	if('toJSON' in aProto) {
		delete aProto.toJSON;
	}
	if(!('URL' in window)) {
		window.URL = window.webkitURL;
	}
	var ua = window.navigator.userAgent,
		opera = window.opera ? +window.opera.version() : 0,
		isOldOpera = opera ? opera < 12.1 : false,
		webkit = ua.contains('WebKit/'),
		chrome = webkit && ua.contains('Chrome/'),
		safari = webkit && !chrome,
		isGM = typeof GM_setValue === 'function' && 
			(!chrome || !GM_setValue.toString().contains('not supported')),
		isScriptStorage = !!scriptStorage && !ua.contains('Opera Mobi');
	if(!window.GM_xmlhttpRequest) {
		window.GM_xmlhttpRequest = $xhr;
	}
	return {
		get ua() {
			return navigator.userAgent + (this.Firefox ? ' [' + navigator.buildID + ']' : '');
		},
		Firefox: ua.contains('Gecko/'),
		Opera: !!opera,
		oldOpera: isOldOpera,
		WebKit: webkit,
		Chrome: chrome,
		Safari: safari,
		isGM: isGM,
		isGlobal: isGM || isScriptStorage,
		isSStorage: isScriptStorage,
		cssFix: webkit ? '-webkit-' : isOldOpera ? '-o-' : '',
		Anim: !isOldOpera,
		animName: webkit ? 'webkitAnimationName' : isOldOpera ? 'OAnimationName' : 'animationName',
		animEnd: webkit ? 'webkitAnimationEnd' : isOldOpera ? 'oAnimationEnd' : 'animationend',
		animEvent: function(el, Fn) {
			el.addEventListener(this.animEnd, function aEvent() {
				this.removeEventListener(nav.animEnd, aEvent, false);
				Fn(this);
				Fn = null;
			}, false);
		},
		noBlob: isOldOpera,
		fixLink: safari ? getAbsLink : function fixLink(url) {
			return url;
		},
		get hasWorker() {
			var val = 'Worker' in (this.Firefox ? unsafeWindow : Window);
			Object.defineProperty(this, 'hasWorker', { value: val });
			return val;
		},
		get canPlayMP3() {
			var val = !!new Audio().canPlayType('audio/mp3; codecs="mp3"');
			Object.defineProperty(this, 'canPlayMP3', { value: val });
			return val;
		},
		get canPlayWebm() {
			var val = !!new Audio().canPlayType('video/webm; codecs="vp8,vorbis"');
			Object.defineProperty(this, 'canPlayWebm', { value: val });
			return val;
		},
		get matchesSelector() {
			var dE = doc.documentElement,
				fun = dE.matchesSelector || dE.mozMatchesSelector ||
					dE.webkitMatchesSelector || dE.oMatchesSelector,
				val = Function.prototype.call.bind(fun);
			Object.defineProperty(this, 'matchesSelector', { value: val });
			return val;
		}
	};
}

