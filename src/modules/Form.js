/* ==[ Form.js ]==============================================================================================
                                                   POSTFORM
                 postform improving, quick reply window, markup text panel, sage button, etc
=========================================================================================================== */

class PostForm {
	constructor(form, oeForm = null, ignoreForm = false) {
		this.isBottom = false;
		this.isHidden = false;
		this.isQuick = false;
		this.lastQuickPNum = -1;
		this.pArea = [];
		this.pForm = null;
		this.qArea = null;
		this._pBtn = [];
		const qOeForm = 'form[name="oeform"], form[action*="paint"]';
		this.oeForm = oeForm || $q(qOeForm);
		if(!ignoreForm && !form) {
			if(this.oeForm) {
				ajaxLoad(aib.getThrUrl(aib.b, Thread.first.num), false).then(loadedDoc => {
					const form = $q(aib.qForm, loadedDoc);
					const oeForm = $q(qOeForm, loadedDoc);
					postform = new PostForm(form && doc.adoptNode(form),
						oeForm && doc.adoptNode(oeForm), true);
				}, () => (postform = new PostForm(null, null, true)));
			} else {
				this.form = null;
			}
			return;
		}
		this.tNum = aib.t;
		this.form = form;
		this.files = null;
		this.txta = $q(aib.qFormTxta, form);
		this.subm = $q(aib.qFormSubm, form);
		this.name = $q(aib.qFormName, form);
		this.mail = $q(aib.qFormMail, form);
		this.subj = $q(aib.qFormSubj, form);
		this.passw = $q(aib.qFormPassw, form);
		this.rules = $q(aib.qFormRules, form);
		this.video = $q('tr input[name="video"], tr input[name="embed"]', form);
		this._initFileInputs();
		this._makeHideableContainer();
		this._makeWindow();
		if(!form || !this.txta) {
			return;
		}
		form.style.display = 'inline-block';
		form.style.textAlign = 'left';
		const { qArea, txta } = this;
		new WinResizer('reply', 'top', 'textaHeight', qArea, txta);
		new WinResizer('reply', 'left', 'textaWidth', qArea, txta);
		new WinResizer('reply', 'right', 'textaWidth', qArea, txta);
		new WinResizer('reply', 'bottom', 'textaHeight', qArea, txta);
		this._initTextarea();
		this.addMarkupPanel();
		this.setPlaceholders();
		this._initCaptcha();
		this._initSubmit();
		aib.updateSubmitBtn(this.subm);
		if(Cfg.ajaxPosting) {
			this._initAjaxPosting();
		}
		if(Cfg.addSageBtn && this.mail) {
			PostForm.hideField(this.mail.closest('label') || this.mail);
			setTimeout(() => this.toggleSage(), 0);
		}
		if(Cfg.noPassword && this.passw) {
			$hide(this.passw.closest(aib.qFormTr));
		}
		if(Cfg.noName && this.name) {
			PostForm.hideField(this.name);
		}
		if(Cfg.noSubj && this.subj) {
			PostForm.hideField(this.subj);
		}
		if(Cfg.userName && this.name) {
			setTimeout(PostForm.setUserName, 0);
		}
		if(this.passw) {
			setTimeout(PostForm.setUserPassw, 0);
		}
	}
	static hideField(el) {
		const next = el.nextElementSibling;
		$toggle(next && (next.style.display !== 'none') ||
			el.previousElementSibling ? el : el.closest(aib.qFormTr));
	}
	static async setUserName() {
		const el = $q('input[info="nameValue"]');
		if(el) {
			await CfgSaver.save('nameValue', el.value);
		}
		postform.name.value = Cfg.userName ? Cfg.nameValue : '';
	}
	static async setUserPassw() {
		if(!Cfg.userPassw) {
			return;
		}
		const el = $q('input[info="passwValue"]');
		if(el) {
			await CfgSaver.save('passwValue', el.value);
		}
		const value = postform.passw.value = Cfg.passwValue;
		for(const { passEl } of DelForm) {
			if(passEl) {
				passEl.value = value;
			}
		}
	}
	get isVisible() {
		if(!this.isHidden && this.isBottom && $q(':focus', this.pForm)) {
			const cr = this.pForm.getBoundingClientRect();
			return cr.bottom > 0 && cr.top < nav.viewportHeight();
		}
		return false;
	}
	get sageBtn() {
		const value = $aEnd(this.subm, '<span id="de-sagebtn"><svg class="de-btn-sage">' +
			'<use xlink:href="#de-symbol-post-sage"/></svg></span>');
		value.onclick = async () => {
			await toggleCfg('sageReply');
			this.toggleSage();
		};
		Object.defineProperty(this, 'sageBtn', { value });
		return value;
	}
	get top() {
		return this.pForm.getBoundingClientRect().top;
	}
	addMarkupPanel() {
		let el = $id('de-txt-panel');
		if(!Cfg.addTextBtns) {
			aib.removeFormButtons(el);
			return;
		}
		if(!el) {
			el = $add('<span id="de-txt-panel"></span>');
			['click', 'mouseover'].forEach(e => el.addEventListener(e, this));
		}
		el.style.cssFloat = Cfg.txtBtnsLoc ? 'none' : 'right';
		aib.insertFormButtons(this, el);
		const id = ['bold', 'italic', 'under', 'strike', 'spoil', 'code', 'sup', 'sub'];
		const val = ['B', 'i', 'U', 'S', '%', 'C', 'x\u00b2', 'x\u2082'];
		const mode = Cfg.addTextBtns;
		let html = '';
		for(let i = 0, len = aib.markupTags.length; i < len; ++i) {
			const tag = aib.markupTags[i];
			if(tag) {
				html += `<div id="de-btn-${ id[i] }" de-title="${ Lng.txtBtn[i][lang] }" de-tag="${ tag }">${
					mode === 2 ? `${ !html ? '[' : '' }&nbsp;<a class="de-abtn" href="#">${ val[i] }</a> /` :
					mode === 3 ? `<button type="button" style="font-weight: bold;">${ val[i] }</button>` :
					`<svg><use xlink:href="#de-symbol-markup-${ id[i] }"/></svg>`
				}</div>`;
			}
		}
		el.innerHTML = `${ html }<div id="de-btn-quote" de-title="${ Lng.txtBtn[8][lang] }" de-tag="q">${
			mode === 2 ? '&nbsp;<a class="de-abtn" href="#">&gt;</a> ]' :
			mode === 3 ? '<button type="button" style="font-weight: bold;">&gt;</button>' :
			'<svg><use xlink:href="#de-symbol-markup-quote"/></svg>'
		}</span>`;
	}
	clearForm() {
		if(this.txta) {
			this.txta.value = '';
		}
		if(this.files) {
			this.files.clearInputs();
		}
		if(this.video) {
			this.video.value = '';
		}
	}
	closeReply() {
		if(this.isQuick) {
			this.isQuick = false;
			this.lastQuickPNum = -1;
			if(!aib.t) {
				this._toggleQuickReply(false);
				this.tNum = false;
			}
			this.setReply(false, !aib.t || Cfg.addPostForm > 1);
		}
	}
	handleEvent(e) {
		let el = e.target;
		if(el.tagName.toLowerCase() !== 'div') {
			el = el.parentNode;
		}
		const { id } = el;
		if(!id.startsWith('de-btn')) {
			return;
		}
		if(e.type === 'mouseover') {
			if(id === 'de-btn-quote') {
				quotedText = deWindow.getSelection().toString();
			}
			let key = -1;
			if(HotKeys.enabled) {
				switch(id.substr(7)) {
				case 'bold': key = 12; break;
				case 'italic': key = 13; break;
				case 'strike': key = 14; break;
				case 'spoil': key = 15; break;
				case 'code': key = 16;
				}
			}
			KeyEditListener.setTitle(el, key);
			return;
		}
		const txtaEl = postform.txta;
		const { selectionStart: start, selectionEnd: end } = txtaEl;
		const quote = Cfg.spacedQuote ? '> ' : '>';
		if(id === 'de-btn-quote') {
			insertText(txtaEl, quote + (start === end ? quotedText : txtaEl.value.substring(start, end))
				.replace(/^[\r\n]|[\r\n]+$/g, '').replace(/\n/gm, '\n' + quote) + (quotedText ? '\n' : ''));
			quotedText = '';
		} else {
			const { scrtop } = txtaEl;
			const val = PostForm._wrapText(el.getAttribute('de-tag'), txtaEl.value.substring(start, end));
			const len = start + val[0];
			txtaEl.value = txtaEl.value.substr(0, start) + val[1] + txtaEl.value.substr(end);
			txtaEl.setSelectionRange(len, len);
			txtaEl.focus();
			txtaEl.scrollTop = scrtop;
		}
		e.preventDefault();
		e.stopPropagation();
	}
	refreshCap(isError = false) {
		if(this.cap) {
			this.cap.refreshCaptcha(isError, isError, this.tNum);
		}
	}
	setPlaceholders() {
		if(aib.formHeaders || !aib.multiFile && Cfg.fileInputs === 2) {
			return;
		}
		this._setPlaceholder('name');
		this._setPlaceholder('subj');
		this._setPlaceholder('mail');
		this._setPlaceholder('video');
		if(this.cap) {
			this._setPlaceholder('cap');
		}
	}
	setReply(isQuick, needToHide) {
		if(isQuick) {
			this.qArea.firstChild.after(this.pForm);
		} else {
			this.pArea[+this.isBottom].after(this.qArea);
			this._pBtn[+this.isBottom].after(this.pForm);
		}
		this.isHidden = needToHide;
		$toggle(this.qArea, isQuick);
		$toggle(this.pForm, !needToHide);
		this.updatePAreaBtns();
	}
	showMainReply(isBottom, e) {
		this.closeReply();
		if(!aib.t) {
			this.tNum = false;
			this.refreshCap();
		}
		if(this.isBottom === isBottom) {
			$toggle(this.pForm, this.isHidden);
			this.isHidden = !this.isHidden;
			this.updatePAreaBtns();
		} else {
			this.isBottom = isBottom;
			this.setReply(false, false);
		}
		if(e) {
			e.preventDefault();
		}
	}
	showQuickReply(post, pNum, isCloseReply, isNumClick, isNoLink = false) {
		if(!this.isQuick) {
			this.isQuick = true;
			this.setReply(true, false);
			$q('a', this._pBtn[+this.isBottom]).className =
				`de-abtn de-parea-btn-${ aib.t ? 'reply' : 'thr' }`;
		} else if(isCloseReply && !quotedText && post.wrap.nextElementSibling === this.qArea) {
			this.closeReply();
			return;
		}
		post.wrap.after(this.qArea);
		if(this.qArea.classList.contains('de-win')) {
			updateWinZ(this.qArea.style);
		}
		const qNum = post.thr.num;
		if(!aib.t) {
			this._toggleQuickReply(qNum);
		}
		if(!this.form) {
			return;
		}
		if(!aib.t && this.tNum !== qNum) {
			this.tNum = qNum;
			this.refreshCap();
		}
		this.tNum = qNum;
		const txt = this.txta.value;
		const isOnNewLine = txt === '' || txt.slice(-1) === '\n';
		const link = isNoLink || post.isOp && !Cfg.addOPLink && !aib.t && !isNumClick ? '' :
			isNumClick ? `>>${ pNum }${ isOnNewLine ? '\n' : '' }` :
			(isOnNewLine ? '' : '\n') +
				(this.lastQuickPNum === pNum && txt.includes('>>' + pNum) ? '' : `>>${ pNum }\n`);
		const quote = !quotedText ? '' : `${ quotedText.replace(/^[\r\n]|[\r\n]+$/g, '')
			.replace(/(^|\n)(.)/gm, `$1>${ Cfg.spacedQuote ? ' ' : '' }$2`) }\n`;
		insertText(this.txta, link + quote);
		const winTitle = post.thr.op.title.trim();
		$q('.de-win-title', this.qArea).textContent =
			(winTitle.length < 28 ? winTitle : `${ winTitle.substr(0, 30) }\u2026`) || `#${ pNum }`;
		this.lastQuickPNum = pNum;
	}
	toggleSage() {
		if(!Cfg.addSageBtn || !this.mail) {
			return;
		}
		const isSage = Cfg.sageReply;
		this.sageBtn.style.opacity = isSage ? '1' : '.3';
		this.sageBtn.title = isSage ? Lng.disableSage[lang] : Lng.enableSage[lang];
		if(this.mail.type === 'text') {
			this.mail.value = isSage ? 'sage' : aib._4chan ? 'noko' : '';
		} else {
			this.mail.checked = isSage;
		}
	}
	updatePAreaBtns() {
		const txt = 'de-abtn de-parea-btn-';
		const rep = aib.t ? 'reply' : 'thr';
		$q('a', this._pBtn[+this.isBottom]).className = txt + (!this.pForm.style.display ? 'close' : rep);
		$q('a', this._pBtn[+!this.isBottom]).className = txt + rep;
	}

	static _wrapText(tag, text) {
		let isBB = aib.markupBB;
		if(tag.startsWith('[')) {
			tag = tag.substr(1);
			isBB = true;
		}
		if(isBB) {
			if(text.includes('\n')) {
				const str = `[${ tag }]${ text }[/${ tag }]`;
				return [str.length, str];
			}
			const m = text.match(/^(\s*)(.*?)(\s*)$/);
			const str = `${ m[1] }[${ tag }]${ m[2] }[/${ tag }]${ m[3] }`;
			return [!m[2].length ? m[1].length + tag.length + 2 : str.length, str];
		}
		let m;
		let rv = '';
		let i = 0;
		const arr = text.split('\n');
		for(let len = arr.length; i < len; ++i) {
			m = arr[i].match(/^(\s*)(.*?)(\s*)$/);
			rv += '\n' + m[1] + (tag === '^H' ? m[2] + '^H'.repeat(m[2].length) : tag + m[2] + tag) + m[3];
		}
		return [i === 1 && !m[2].length && tag !== '^H' ?
			m[1].length + tag.length :
			rv.length - 1, rv.slice(1)];
	}
	_initAjaxPosting() {
		let el;
		if(aib.qFormRedir && (el = $q(aib.qFormRedir, this.form))) {
			aib.disableRedirection(el);
		}
		this.form.onsubmit = async e => {
			e.preventDefault();
			$popup('upload', Lng.sending[lang], true);
			try {
				const data = await html5Submit(this.form, this.subm, true);
				await checkSubmit(data);
			} catch(err) {
				showSubmitError(err);
			}
		};
	}
	_initCaptcha() {
		const capEl =
			$q('input[type="text"][name*="aptcha"], *[id*="captcha"], *[class*="captcha"]', this.form);
		if(!capEl) {
			this.cap = null;
			return;
		}
		this.cap = new Captcha(capEl, this.tNum);
		const updCapFn = () => {
			this.cap.addCaptcha();
			this.cap.updateOutdated();
		};
		this.txta.addEventListener('focus', updCapFn);
		if(this.files) {
			this.files.onchange = updCapFn;
		}
		this.form.addEventListener('click', () => this.cap.addCaptcha(), true);
	}
	_initFileInputs() {
		const fileEl = $q(aib.qFormFile, this.form);
		if(!fileEl) {
			return;
		}
		if(aib.fixFileInputs) {
			aib.fixFileInputs(fileEl.closest(aib.qFormTd));
		}
		this.files = new Files(this, $q(aib.qFormFile, this.form));
		// We need to clear file inputs in case if session was restored.
		deWindow.addEventListener('load',
			() => setTimeout(() => !this.files.filesCount && this.files.clearInputs(), 0));
	}
	_initSubmit() {
		this.subm.addEventListener('click', e => {
			if(Cfg.warnSubjTrip && this.subj && /#.|##./.test(this.subj.value)) {
				e.preventDefault();
				$popup('upload', Lng.subjHasTrip[lang]);
				return;
			}
			let val = this.txta.value;
			if(Spells.outreps) {
				val = Spells.outReplace(val);
			}
			if(this.tNum && pByNum.get(this.tNum).subj === 'Dollchan Extension Tools') {
				const temp = `\n\n${ PostForm._wrapText(aib.markupTags[5],
					`${ '-'.repeat(50) }\n${ nav.ua }\nv${ version }.${ commit }${
						nav.isESNext ? '.es6' : '' } [${ nav.scriptHandler }]`
				)[1] }`;
				if(!val.includes(temp)) {
					val += temp;
				}
			}
			this.txta.value = val;
			this.toggleSage();
			if(Cfg.ajaxPosting) {
				$popup('upload', Lng.checking[lang], true);
			}
			if(this.video && (val = this.video.value?.match(Videos.ytReg))) {
				this.video.value = 'http://www.youtube.com/watch?v=' + val[1];
			}
			if(this.isQuick) {
				$hide(this.pForm);
				$hide(this.qArea);
				this._pBtn[+this.isBottom].after(this.pForm);
			}
			updater.pauseUpdater();
		});
	}
	_initTextarea() {
		const el = this.txta;
		if(aib.dobrochan) {
			el.removeAttribute('id');
		}
		el.classList.add('de-textarea');
		const { style } = el;
		style.setProperty('width', Cfg.textaWidth + 'px', 'important');
		style.setProperty('height', Cfg.textaHeight + 'px', 'important');
		// Allow to scroll page on PgUp/PgDn
		el.addEventListener('keypress', e => {
			const code = e.charCode || e.keyCode;
			if((code === 33 /* PgUp */ || code === 34 /* PgDn */) && e.which === 0) {
				e.target.blur();
				deWindow.focus();
			}
		});
		// Add image from clipboard to file inputs on Ctrl+V
		el.addEventListener('paste', async e => {
			const files = e?.clipboardData?.files;
			for(const file of files) {
				const inputs = this.files._inputs;
				for(let i = 0, len = inputs.length; i < len; ++i) {
					const input = inputs[i];
					if(!input.hasFile) {
						await input.addUrlFile(URL.createObjectURL(file), file);
						break;
					}
				}
			}
		});
		// Make textarea resizer
		if(nav.isFirefox || nav.isWebkit) {
			el.addEventListener('mouseup', ({ target }) => {
				const s = target.style;
				const { width, height } = s;
				s.setProperty('width', width + 'px', 'important');
				s.setProperty('height', height + 'px', 'important');
				/* await */ CfgSaver.save('textaWidth', parseInt(width, 10),
					'textaHeight', parseInt(height, 10));
			});
			return;
		}
		$aEnd(el, '<div id="de-resizer-text"></div>').addEventListener('mousedown', {
			_el      : el,
			_elStyle : style,
			handleEvent(e) {
				switch(e.type) {
				case 'mousedown':
					['mousemove', 'mouseup'].forEach(e => docBody.addEventListener(e, this));
					e.preventDefault();
					return;
				case 'mousemove': {
					const cr = this._el.getBoundingClientRect();
					this._elStyle.setProperty('width', (e.clientX - cr.left) + 'px', 'important');
					this._elStyle.setProperty('height', (e.clientY - cr.top) + 'px', 'important');
					return;
				}
				default: // mouseup
					['mousemove', 'mouseup'].forEach(e => docBody.removeEventListener(e, this));
					/* await */ CfgSaver.save('textaWidth', parseInt(this._elStyle.width, 10),
						'textaHeight', parseInt(this._elStyle.height, 10));
				}
			}
		});
	}
	_makeHideableContainer() {
		(this.pForm = $add('<div id="de-pform" class="de-win-body"></div>'))
			.append(this.form || '', this.oeForm || '');
		const html = '<div class="de-parea"><div>[<a href="#"></a>]</div><hr></div>';
		this.pArea = [
			$bBegin(DelForm.first.el, html),
			$aEnd(aib._4chan ? $q('.board', DelForm.first.el) : DelForm.first.el, html)
		];
		this._pBtn = [this.pArea[0].firstChild, this.pArea[1].firstChild];
		this._pBtn[0].firstElementChild.onclick = e => this.showMainReply(false, e);
		this._pBtn[1].firstElementChild.onclick = e => this.showMainReply(true, e);
		this.qArea = $add(`<div style="display: none; ${ Cfg.replyWinX }; ${
			Cfg.replyWinY }; z-index: ${ ++topWinZ };" id="de-win-reply" class="${
			aib.cReply + (Cfg.replyWinDrag ? ' de-win' : ' de-win-inpost') }"></div>`);
		this.isBottom = Cfg.addPostForm === 1;
		this.setReply(false, !aib.t || Cfg.addPostForm > 1);
	}
	_makeWindow() {
		makeDraggable('reply', this.qArea, $aBegin(this.qArea, `<div class="de-win-head">
			<span class="de-win-title"></span>
			<span class="de-win-buttons">
				<svg class="de-win-btn-clear"><use xlink:href="#de-symbol-unavail"/></svg>
				<svg class="de-win-btn-toggle"><use xlink:href="#de-symbol-win-arrow"/></svg>
				<svg class="de-win-btn-close"><use xlink:href="#de-symbol-win-close"/></svg>
			</span>
		</div>
		<div class="de-resizer de-resizer-top"></div>
		<div class="de-resizer de-resizer-left"></div>
		<div class="de-resizer de-resizer-right"></div>
		<div class="de-resizer de-resizer-bottom"></div>`));
		const buttons = $q('.de-win-buttons', this.qArea);
		buttons.onmouseover = ({ target }) => {
			const el = target.parentNode;
			switch(nav.fixEventEl(target).classList[0]) {
			case 'de-win-btn-clear': el.title = Lng.clearForm[lang]; break;
			case 'de-win-btn-close': el.title = Lng.closeReply[lang]; break;
			case 'de-win-btn-toggle': el.title = Cfg.replyWinDrag ? Lng.underPost[lang] : Lng.makeDrag[lang];
			}
		};
		const [clearBtn, toggleBtn, closeBtn] = [...buttons.children];
		clearBtn.onclick = async () => {
			await CfgSaver.save('sageReply', 0);
			this.toggleSage();
			this.files.clearInputs();
			[this.txta, this.name, this.mail, this.subj, this.video, this.cap && this.cap.textEl].forEach(
				el => el && (el.value = ''));
		};
		toggleBtn.onclick = async () => {
			await toggleCfg('replyWinDrag');
			if(Cfg.replyWinDrag) {
				this.qArea.className = aib.cReply + ' de-win';
				updateWinZ(this.qArea.style);
			} else {
				this.qArea.className = aib.cReply + ' de-win-inpost';
				this.txta.focus();
			}
		};
		closeBtn.onclick = () => this.closeReply();
	}
	_setPlaceholder(val) {
		const el = val === 'cap' ? this.cap.textEl : this[val];
		if(el) {
			$toggleAttr(el, 'placeholder', Lng[val][lang], aib.multiFile || Cfg.fileInputs !== 2);
		}
	}
	_toggleQuickReply(tNum) {
		if(this.oeForm) {
			$q('input[name="oek_parent"]', this.oeForm)?.remove();
			if(tNum) {
				this.oeForm.insertAdjacentHTML('afterbegin',
					`<input type="hidden" value="${ tNum }" name="oek_parent">`);
			}
		}
		if(this.form) {
			if(aib.changeReplyMode && tNum !== this.tNum) {
				aib.changeReplyMode(this.form, tNum);
			}
			$q(`input[name="${ aib.formParent }"]`, this.form)?.remove();
			if(tNum) {
				this.form.insertAdjacentHTML('afterbegin',
					`<input type="hidden" name="${ aib.formParent }" value="${ tNum }">`);
			}
		}
	}
}
