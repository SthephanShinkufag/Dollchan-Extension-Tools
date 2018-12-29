/* ==[ FormCaptcha.js ]=======================================================================================
                                                    CAPTCHA
=========================================================================================================== */

class Captcha {
	constructor(el, initNum) {
		this.hasCaptcha = true;
		this.textEl = null;
		this.tNum = initNum;
		this.parentEl = nav.matchesSelector(el, aib.qFormTr) ? el : aib.getCapParent(el);
		this.isAdded = false;
		this.isSubmitWait = false;
		this._isRecap = !aib._02ch && !!$q('[id*="recaptcha"], [class*="recaptcha"]', this.parentEl);
		this._lastUpdate = null;
		this.originHTML = this.parentEl.innerHTML;
		$hide(this.parentEl);
		if(!this._isRecap) {
			this.parentEl.innerHTML = '';
		}
	}
	addCaptcha() {
		if(this.isAdded) { // Run this function only once
			return;
		}
		this.isAdded = true;
		if(!this._isRecap) {
			this.parentEl.innerHTML = this.originHTML;
			this.textEl = $q('input[type="text"][name*="aptcha"]', this.parentEl);
		} else {
			const el = $q('#g-recaptcha, .g-recaptcha');
			$replace(el, `<div id="g-recaptcha" class="g-recaptcha" data-sitekey="${
				el.getAttribute('data-sitekey') }"></div>`);
		}
		this.initCapPromise();
	}
	handleEvent(e) {
		switch(e.type) {
		case 'keypress': {
			if(!Cfg.captchaLang || e.which === 0) {
				return;
			}
			const ruUa = 'йцукенгшщзхъїфыівапролджэєячсмитьбюёґ';
			const en = "qwertyuiop[]]assdfghjkl;''zxcvbnm,.`\\";
			const code = e.charCode || e.keyCode;
			let i, chr = String.fromCharCode(code).toLowerCase();
			if(Cfg.captchaLang === 1) {
				if(code < 0x0410 || code > 0x04FF || (i = ruUa.indexOf(chr)) === -1) {
					return;
				}
				chr = en[i];
			} else {
				if(code < 0x0021 || code > 0x007A || (i = en.indexOf(chr)) === -1) {
					return;
				}
				chr = ruUa[i];
			}
			$txtInsert(e.target, chr);
			break;
		}
		case 'focus': this.updateOutdated();
		}
		$pd(e);
		e.stopPropagation();
	}
	initCapPromise() {
		const initPromise = aib.initCaptcha ? aib.initCaptcha(this) : null;
		if(initPromise) {
			initPromise.then(() => this.showCaptcha(), err => {
				if(err instanceof AjaxError) {
					this._setUpdateError(err);
				} else {
					this.hasCaptcha = false;
				}
			});
		} else if(this.hasCaptcha) {
			this.showCaptcha(true);
		}
	}
	initImage(img) {
		img.title = Lng.refresh[lang];
		img.alt = Lng.loading[lang];
		img.style.cssText = 'vertical-align: text-bottom; border: none; cursor: pointer;';
		img.onclick = () => this.refreshCaptcha(true);
	}
	initTextEl() {
		this.textEl.autocomplete = 'off';
		if(!aib.kusaba && (aib.multiFile || Cfg.fileInputs !== 2)) {
			this.textEl.placeholder = Lng.cap[lang];
		}
		this.textEl.addEventListener('keypress', this);
		this.textEl.onkeypress = null;
		this.textEl.addEventListener('focus', this);
		this.textEl.onfocus = null;
	}
	showCaptcha(isUpdateImage = false) {
		if(!this.textEl) {
			$show(this.parentEl);
			if(aib.updateCaptcha) {
				aib.updateCaptcha(this, false);
			} else if(this._isRecap) {
				this._updateRecap();
			}
			return;
		}
		this.initTextEl();
		let img;
		if(this._isRecap || !(img = $q('img', this.parentEl))) {
			$show(this.parentEl);
			return;
		}
		this.initImage(img);
		const a = img.parentNode;
		if(a.tagName === 'A') {
			$replace(a, img);
		}
		if(isUpdateImage) {
			this.refreshCaptcha(false);
		} else {
			this._lastUpdate = Date.now();
		}
		$show(this.parentEl);
	}
	refreshCaptcha(isFocus, isErr = false, tNum = this.tNum) {
		if(!this.isAdded || tNum !== this.tNum) {
			this.tNum = tNum;
			this.isAdded = false;
			this.hasCaptcha = true;
			this.textEl = null;
			$hide(this.parentEl);
			this.addCaptcha();
			return;
		} else if(!this.hasCaptcha && !isErr) {
			return;
		}
		this._lastUpdate = Date.now();
		if(aib.updateCaptcha) {
			const updatePromise = aib.updateCaptcha(this, isErr);
			if(updatePromise) {
				updatePromise.then(() => this._updateTextEl(isFocus), err => this._setUpdateError(err));
			}
		} else if(this._isRecap) {
			this._updateRecap();
		} else if(this.textEl) {
			this._updateTextEl(isFocus);
			const img = $q('img', this.parentEl);
			if(!img) {
				return;
			}
			if(aib.getCaptchaSrc) {
				const src = img.getAttribute('src');
				if(src) {
					img.src = '';
					img.src = aib.getCaptchaSrc(src, tNum);
				}
			} else {
				img.click();
			}
		}
	}
	updateHelper(url, fn) {
		if(aib._capUpdPromise) {
			aib._capUpdPromise.cancelPromise();
		}
		return (aib._capUpdPromise = $ajax(url).then(xhr => {
			aib._capUpdPromise = null;
			fn(xhr);
		}, err => {
			if(!(err instanceof CancelError)) {
				aib._capUpdPromise = null;
				return CancelablePromise.reject(err);
			}
		}));
	}
	updateOutdated() {
		if(this._lastUpdate && (Date.now() - this._lastUpdate > Cfg.capUpdTime * 1e3)) {
			this.refreshCaptcha(false);
		}
	}

	_setUpdateError(e) {
		if(e) {
			this.parentEl = e.toString();
			this.isAdded = false;
			this.parentEl.onclick = () => {
				this.parentEl.onclick = null;
				this.addCaptcha();
			};
			$show(this.parentEl);
		}
	}
	_updateRecap() {
		const script = doc.createElement('script');
		script.type = 'text/javascript';
		script.src = aib.prot + '//www.google.com/recaptcha/api.js';
		doc.head.appendChild(script);
		setTimeout(() => $del(script), 1e5);
	}
	_updateTextEl(isFocus) {
		if(this.textEl) {
			this.textEl.value = '';
			if(isFocus) {
				this.textEl.focus();
			}
		}
	}
}
