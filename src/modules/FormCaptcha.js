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
		this._isHcap = !!$q('.h-captcha', this.parentEl);
		this._isRecap = this._isHcap || !!$q('[id*="recaptcha"], [class*="recaptcha"]', this.parentEl);
		this._lastUpdate = null;
		this.originHTML = this.parentEl.innerHTML;
		$hide(this.parentEl);
		if(!this._isRecap) {
			this.parentEl.innerHTML = '';
		}
	}
	addCaptcha() {
		if(this.isAdded) {
			return;
		}
		this.isAdded = true;
		if(this._isHcap) {
			$show(this.parentEl);
		} else if(this._isRecap) {
			const el = $q('#g-recaptcha, .g-recaptcha');
			el.insertAdjacentHTML('afterend', `<div id="g-recaptcha" class="g-recaptcha" data-sitekey="${
				el.getAttribute('data-sitekey') }"></div>`);
			el.remove();
		} else {
			this.parentEl.innerHTML = this.originHTML;
			this.textEl = $q('input[type="text"][name*="aptcha"]', this.parentEl);
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
			const en = 'qwertyuiop[]]assdfghjkl;\'\'zxcvbnm,.`\\';
			const code = e.charCode || e.keyCode;
			let i;
			let chr = String.fromCharCode(code).toLowerCase();
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
			insertText(e.target, chr);
			break;
		}
		case 'focus': this.updateOutdated();
		}
		e.preventDefault();
		e.stopPropagation();
	}
	initCapPromise() {
		const initPromise = aib.captchaInit ? aib.captchaInit(this) : null;
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
		if(!aib.formHeaders && (aib.multiFile || Cfg.fileInputs !== 2)) {
			this.textEl.placeholder = Lng.cap[lang];
		}
		['keypress', 'focus'].forEach(e => this.textEl.addEventListener(e, this));
		this.textEl.onkeypress = null;
		this.textEl.onfocus = null;
	}
	showCaptcha(isUpdateImage = false) {
		if(!this.textEl) {
			$show(this.parentEl);
			if(aib.captchaUpdate) {
				aib.captchaUpdate(this, false);
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
		if(a.tagName.toLowerCase() === 'a') {
			a.replaceWith(img);
		}
		if(isUpdateImage) {
			this.refreshCaptcha(false);
		} else {
			this._lastUpdate = Date.now();
		}
		$show(this.parentEl);
	}
	refreshCaptcha(isFocus, isError = false, tNum = this.tNum) {
		if(!this.isAdded || tNum !== this.tNum) {
			this.tNum = tNum;
			this.isAdded = false;
			this.hasCaptcha = true;
			this.textEl = null;
			$hide(this.parentEl);
			this.addCaptcha();
			return;
		} else if(!this.hasCaptcha && !isError) {
			return;
		}
		this._lastUpdate = Date.now();
		if(aib.captchaUpdate) {
			const updatePromise = aib.captchaUpdate(this, isError);
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
			if(!aib.getCaptchaSrc) {
				img.click();
				return;
			}
			const src = img.getAttribute('src');
			if(!src) {
				return;
			}
			const newSrc = aib.getCaptchaSrc(src, tNum);
			img.src = '';
			img.src = newSrc;
			if(aib.stormWallFixCaptcha) {
				aib.stormWallFixCaptcha(newSrc, img);
			}
		}
	}
	updateHelper(url, fn) {
		if(aib.captchaUpdPromise) {
			aib.captchaUpdPromise.cancelPromise();
		}
		return (aib.captchaUpdPromise = $ajax(url).then(xhr => {
			aib.captchaUpdPromise = null;
			fn(xhr);
		}, err => {
			if(!(err instanceof CancelError)) {
				aib.captchaUpdPromise = null;
				return CancelablePromise.reject(err);
			}
		}));
	}
	updateOutdated() {
		if(!aib.makaba && this._lastUpdate && (Date.now() - this._lastUpdate > Cfg.capUpdTime * 1e3)) {
			this.refreshCaptcha(false);
		}
	}

	_setUpdateError(e) {
		if(e) {
			this.parentEl.innerHTML = e.toString();
			this.isAdded = false;
			this.parentEl.onclick = () => {
				this.parentEl.onclick = null;
				this.addCaptcha();
			};
			$show(this.parentEl);
		}
	}
	_updateRecap() {
		// <EXCLUDED_FROM_EXTENSION>
		const script = doc.createElement('script');
		script.src = aib.protocol +
			(this._isHcap ? '//js.hcaptcha.com/1/api.js' : '//www.google.com/recaptcha/api.js');
		doc.head.append(script);
		setTimeout(() => script.remove(), 1e5);
		// </EXCLUDED_FROM_EXTENSION>
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
