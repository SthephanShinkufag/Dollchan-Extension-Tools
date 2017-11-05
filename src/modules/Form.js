/* ==[ Form.js ]==============================================================================================
                                                   POSTFORM
                 postform improving, quick reply window, markup text panel, sage button, etc
=========================================================================================================== */

function PostForm(form, oeForm = null, ignoreForm = false) {
	if(!ignoreForm && !form) {
		if(this.oeForm) {
			ajaxLoad(aib.getThrUrl(aib.b, Thread.first.num), false).then(loadedDoc => {
				const form = $q(aib.qForm, loadedDoc);
				const oeForm = $q('form[name="oeform"], form[action*="paint"]', loadedDoc);
				pr = new PostForm(form && doc.adoptNode(form), oeForm && doc.adoptNode(oeForm), true);
			}, () => {
				pr = new PostForm(null, null, true);
			});
		} else {
			this.form = null;
		}
		return;
	}
	this.tNum = aib.t;
	this.form = form;
	this.oeForm = oeForm || $q('form[name="oeform"], form[action*="paint"]');
	this.txta = $q('tr:not([style*="none"]) textarea:not([style*="display:none"])', form);
	this.subm = $q('tr input[type="submit"]', form);
	const fileEl = $q('tr input[type="file"]', form);
	if(fileEl) {
		if(aib.fixFileInputs) {
			aib.fixFileInputs($parent(fileEl, 'TD'));
		}
		this.files = new Files(this, $q('tr input[type="file"]', form));
		// We need to clear file inputs in case if session was restored.
		window.addEventListener('load', () => setTimeout(() => {
			if(!this.files.filesCount) {
				this.files.clear();
			}
		}, 0));
	}
	this.name = $q(aib.qFormName, form);
	this.mail = $q(aib.qFormMail, form);
	this.subj = $q(aib.qFormSubj, form);
	this.passw = $q(aib.qFormPassw, form);
	this.rules = $q(aib.qFormRules, form);
	this.video = $q('tr input[name="video"], tr input[name="embed"]', form);
	this.pForm = $add('<div id="de-pform" class="de-win-body"></div>');
	if(this.form) {
		this.pForm.appendChild(this.form);
	}
	if(this.oeForm) {
		this.pForm.appendChild(this.oeForm);
	}
	const html = '<div class="de-parea"><div>[<a href="#"></a>]</div><hr></div>';
	this.pArea = [
		$bBegin(DelForm.first.el, html),
		$aEnd(aib.fch ? $q('.board', DelForm.first.el) : DelForm.first.el, html)];
	this._pBtn = [this.pArea[0].firstChild, this.pArea[1].firstChild];
	this._pBtn[0].firstElementChild.onclick = e => this.showMainReply(false, e);
	this._pBtn[1].firstElementChild.onclick = e => this.showMainReply(true, e);
	this.qArea = $add('<div style="display: none; ' + Cfg.replyWinX + '; ' + Cfg.replyWinY +
		'; z-index: ' + (++topWinZ) + ';" id="de-win-reply" class="' + aib.cReply +
		(Cfg.replyWinDrag ? ' de-win' : ' de-win-inpost') + '"></div>');
	this.isBottom = Cfg.addPostForm === 1;
	this.setReply(false, !aib.t || Cfg.addPostForm > 1);
	makeDraggable('reply', this.qArea, $aBegin(this.qArea, `<div class="de-win-head">
		<span class="de-win-title"></span>
		<span class="de-win-buttons">
			<svg class="de-btn-clear"><use xlink:href="#de-symbol-unavail"/></svg>
			<svg class="de-btn-toggle"><use xlink:href="#de-symbol-win-arrow"/></svg>
			<svg class="de-btn-close"><use xlink:href="#de-symbol-win-close"/></svg>
		</span>
	</div>
	<div class="de-resizer de-resizer-top"></div>
	<div class="de-resizer de-resizer-left"></div>
	<div class="de-resizer de-resizer-right"></div>
	<div class="de-resizer de-resizer-bottom"></div>`));
	let el = $q('.de-win-buttons', this.qArea);
	el.onmouseover = e => {
		switch(fixEventEl(e.target).classList[0]) {
		case 'de-btn-clear': this.title = Lng.clearForm[lang]; break;
		case 'de-btn-close': this.title = Lng.closeReply[lang]; break;
		case 'de-btn-toggle': this.title = Cfg.replyWinDrag ? Lng.underPost[lang] : Lng.makeDrag[lang];
		}
	};
	(el = el.firstElementChild).onclick = () => {
		saveCfg('sageReply', 0);
		this._setSage();
		this.files.clear();
		[this.txta, this.name, this.mail, this.subj, this.video, this.cap && this.cap.textEl].forEach(
			node => {
				if(node) {
					node.value = '';
				}
			});
	};
	(el = el.nextElementSibling).onclick = () => {
		toggleCfg('replyWinDrag');
		if(Cfg.replyWinDrag) {
			this.qArea.className = aib.cReply + ' de-win';
			updateWinZ(this.qArea.style);
		} else {
			this.qArea.className = aib.cReply + ' de-win-inpost';
			this.txta.focus();
		}
	};
	el.nextElementSibling.onclick = () => this.closeReply();
	if(!this.form || !this.txta) {
		return;
	}
	new WinResizer('reply', 'top', 'textaHeight', this.qArea, this.txta);
	new WinResizer('reply', 'left', 'textaWidth', this.qArea, this.txta);
	new WinResizer('reply', 'right', 'textaWidth', this.qArea, this.txta);
	new WinResizer('reply', 'bottom', 'textaHeight', this.qArea, this.txta);
	this.addTextPanel();
	this.setPlaceholders();
	this.updateLanguage();
	this.form.style.display = 'inline-block';
	this.form.style.textAlign = 'left';
	if(nav.Firefox) {
		this.txta.addEventListener('mouseup', ({ target }) => {
			saveCfg('textaWidth', parseInt(target.style.width, 10));
			saveCfg('textaHeight', parseInt(target.style.height, 10));
		});
	} else {
		$aEnd(this.txta, '<div id="de-resizer-text"></div>').addEventListener('mousedown', {
			_el      : this.txta,
			_elStyle : this.txta.style,
			handleEvent(e) {
				switch(e.type) {
				case 'mousedown':
					docBody.addEventListener('mousemove', this);
					docBody.addEventListener('mouseup', this);
					$pd(e);
					return;
				case 'mousemove': {
					const cr = this._el.getBoundingClientRect();
					this._elStyle.width = (e.clientX - cr.left) + 'px';
					this._elStyle.height = (e.clientY - cr.top) + 'px';
					return;
				}
				default: // mouseup
					docBody.removeEventListener('mousemove', this);
					docBody.removeEventListener('mouseup', this);
					saveCfg('textaWidth', parseInt(this._elStyle.width, 10));
					saveCfg('textaHeight', parseInt(this._elStyle.height, 10));
				}
			}
		});
	}
	if(Cfg.addSageBtn && this.mail) {
		PostForm.hideField($parent(this.mail, 'LABEL') || this.mail);
		$aEnd(this.subm, '<svg id="de-sagebtn" class="de-btn-sage">' +
			'<use xlink:href="#de-symbol-post-sage"/></svg>'
		).onclick = e => {
			e.stopPropagation();
			$pd(e);
			toggleCfg('sageReply');
			this._setSage();
		};
		setTimeout(() => this._setSage(), 0);
	}
	this.txta.classList.add('de-textarea');
	this.txta.style.cssText = 'width: ' + Cfg.textaWidth + 'px; height: ' + Cfg.textaHeight + 'px;';
	this.txta.addEventListener('keypress', e => {
		const code = e.charCode || e.keyCode;
		if((code === 33 || code === 34) && e.which === 0) {
			e.target.blur();
			window.focus();
		}
	});
	this.txta.addEventListener('paste', e => {
		if('clipboardData' in e) {
			for(let item of e.clipboardData.items) {
				if(item.kind === 'file') {
					const inputs = this.files._inputs;
					for(let i = 0, len = inputs.length; i < len; ++i) {
						const input = inputs[i];
						if(!input.hasFile) {
							const file = item.getAsFile();
							input._addUrlFile(URL.createObjectURL(file), file);
							break;
						}
					}
				}
			}
		}
	});
	if(aib.dobr) {
		this.txta.removeAttribute('id');
	}
	this.subm.addEventListener('click', e => {
		if(Cfg.warnSubjTrip && this.subj && /#.|##./.test(this.subj.value)) {
			$pd(e);
			$popup('upload', Lng.subjHasTrip[lang]);
			return;
		}
		let val = this.txta.value;
		if(Spells.outreps) {
			val = Spells.outReplace(val);
		}
		if(this.tNum && pByNum.get(this.tNum).subj === 'Dollchan Extension Tools') {
			const temp = '\n\n' + this._wrapText(aib.markupTags[5],
				'-'.repeat(50) + '\n' + nav.ua + '\nv' + version + '.' + commit +
				(nav.isESNext ? '.es6' : '') + ' [' + nav.scriptInstall + ']')[1];
			if(!val.includes(temp)) {
				val += temp;
			}
		}
		this.txta.value = val;
		if(Cfg.ajaxPosting) {
			$popup('upload', Lng.checking[lang], true);
		}
		if(this.video && (val = this.video.value) && (val = val.match(Videos.ytReg))) {
			this.video.value = 'http://www.youtube.com/watch?v=' + val[1];
		}
		if(this.isQuick) {
			$hide(this.pForm);
			$hide(this.qArea);
			$after(this._pBtn[+this.isBottom], this.pForm);
		}
		updater.pause();
	});
	if(Cfg.noPassword && (el = this.passw)) {
		$hide($parent(el, 'TR'));
	}
	if(Cfg.noName && (el = this.name)) {
		PostForm.hideField(el);
	}
	if(Cfg.noSubj && (el = this.subj)) {
		PostForm.hideField(el);
	}
	window.addEventListener('load', () => {
		if(Cfg.userName && this.name) {
			setTimeout(PostForm.setUserName, 1e3);
		}
		if(this.passw) {
			setTimeout(PostForm.setUserPassw, 1e3);
		}
	});
	// Captcha initialization.
	// Delete/hide old captcha, add events for captcha showing.
	const capEl = $q('input[type="text"][name*="aptcha"], *[id*="captcha"], *[class*="captcha"]', form);
	if(capEl && !(aib.fch && doc.cookie.includes('pass_enabled'))) {
		this.cap = new Captcha(capEl, this.tNum);
		const updCapFn = () => {
			this.cap.addCaptcha();
			this.cap.updOutdated();
		};
		this.txta.addEventListener('focus', updCapFn);
		if(this.files) {
			this.files.onchange = updCapFn;
		}
		this.form.addEventListener('click', () => this.cap.addCaptcha(), true);
	} else {
		this.cap = null;
	}
	if(Cfg.ajaxPosting) {
		if(aib.qFormRedir && (el = $q(aib.qFormRedir, form))) {
			aib.disableRedirection(el);
		}
		this.form.onsubmit = e => {
			$pd(e);
			$popup('upload', Lng.sending[lang], true);
			html5Submit(this.form, this.subm, true)
				.then(checkUpload)
				.catch(e => $popup('upload', getErrorMessage(e)));
		};
	}
}
PostForm.hideField = function(el) {
	var next = el.nextElementSibling;
	$toggle(next && (next.style.display !== 'none') ||
		el.previousElementSibling ? el : $parent(el, 'TR'));
};
PostForm.setUserName = function() {
	var el = $q('input[info="nameValue"]');
	if(el) {
		saveCfg('nameValue', el.value);
	}
	pr.name.value = Cfg.userName ? Cfg.nameValue : '';
};
PostForm.setUserPassw = function() {
	var el = $q('input[info="passwValue"]');
	if(el) {
		saveCfg('passwValue', el.value);
	}
	var value = pr.passw.value = Cfg.passwValue;
	for(var form of DelForm) {
		(form.passEl || {}).value = value;
	}
};
PostForm.prototype = {
	isBottom      : false,
	isHidden      : false,
	isQuick       : false,
	lastQuickPNum : -1,
	pArea         : [],
	pForm         : null,
	qArea         : null,
	addTextPanel() {
		var id, val, btns, html = '', tPanel = $id('de-txt-panel');
		if(!Cfg.addTextBtns || (aib.fch && !$q('input[type="checkbox"][name="spoiler"]', this.form))) {
			$del(tPanel);
			return;
		}
		if(!tPanel) {
			tPanel = $add('<span id="de-txt-panel"></span>');
			tPanel.addEventListener('click', this);
			tPanel.addEventListener('mouseover', this);
		}
		tPanel.style.cssFloat = Cfg.txtBtnsLoc ? 'none' : 'right';
		$after(Cfg.txtBtnsLoc ? $id('de-resizer-text') || this.txta : this.subm, tPanel);
		id = ['bold', 'italic', 'under', 'strike', 'spoil', 'code', 'sup', 'sub'];
		val = ['B', 'i', 'U', 'S', '%', 'C', 'x\u00b2', 'x\u2082'];
		btns = aib.markupTags;
		for(var i = 0, len = btns.length; i < len; ++i) {
			if(btns[i] === '') {
				continue;
			}
			html += `<div id="de-btn-${ id[i] }" de-title="${ Lng.txtBtn[i][lang] }" de-tag="${ btns[i] }">${
				Cfg.addTextBtns === 2 ? (html === '' ? '[ ' : '') +
					'<a class="de-abtn" href="#">' + val[i] + '</a> / ' :
				Cfg.addTextBtns === 3 ? '<button type="button" style="font-weight: bold;">' +
					val[i] + '</button>' :
				`<svg><use xlink:href="#de-symbol-markup-${ id[i] }"/></svg>`
			}</div>`;
		}
		tPanel.innerHTML = html +
		`<div id="de-btn-quote" de-title="${ Lng.txtBtn[8][lang] }" de-tag="q">${
			Cfg.addTextBtns === 2 ? '<a class="de-abtn" href="#">&gt;</a> ]' :
			Cfg.addTextBtns === 3 ? '<button type="button" style="font-weight: bold;">&gt;</button>' :
			'<svg><use xlink:href="#de-symbol-markup-quote"/></svg>'
		}</span>`;
	},
	clearForm() {
		if(this.txta) {
			this.txta.value = '';
		}
		if(this.files) {
			this.files.clear();
		}
		if(this.video) {
			this.video.value = '';
		}
	},
	handleEvent(e) {
		var id, el = e.target;
		if(el.tagName !== 'SPAN') {
			el = el.parentNode;
		}
		id = el.id;
		if(id.startsWith('de-btn')) {
			var x;
			if(e.type === 'mouseover') {
				if(id === 'de-btn-quote') {
					quotetxt = window.getSelection().toString();
				}
				x = -1;
				if(HotKeys.enabled) {
					switch(id.substr(7)) {
					case 'bold': x = 12; break;
					case 'italic': x = 13; break;
					case 'strike': x = 14; break;
					case 'spoil': x = 15; break;
					case 'code': x = 16;
					}
				}
				KeyEditListener.setTitle(el, x);
				return;
			}
			x = pr.txta;
			var start = x.selectionStart,
				end = x.selectionEnd,
				q = Cfg.spacedQuote ? '> ' : '>';
			if(id === 'de-btn-quote') {
				$txtInsert(x, q + (start === end ? quotetxt : x.value.substring(start, end))
					.replace(/\n/gm, '\n' + q));
				quotetxt = '';
			} else {
				var scrtop = x.scrollTop,
					val = this._wrapText(el.getAttribute('de-tag'), x.value.substring(start, end)),
					len = start + val[0];
				x.value = x.value.substr(0, start) + val[1] + x.value.substr(end);
				x.setSelectionRange(len, len);
				x.focus();
				x.scrollTop = scrtop;
			}
			$pd(e);
			e.stopPropagation();
		}
	},
	get isVisible() {
		if(!this.isHidden && this.isBottom && $q(':focus', this.pForm)) {
			var cr = this.pForm.getBoundingClientRect();
			return cr.bottom > 0 && cr.top < nav.viewportHeight();
		}
		return false;
	},
	get top() {
		return this.pForm.getBoundingClientRect().top;
	},
	showQuickReply(post, pNum, closeReply, isNumClick) {
		if(!this.isQuick) {
			this.isQuick = true;
			this.setReply(true, false);
			$q('a', this._pBtn[+this.isBottom]).className =
				'de-abtn de-parea-btn-' + (aib.t ? 'reply' : 'thr');
		} else if(closeReply && !quotetxt && post.wrap.nextElementSibling === this.qArea) {
			this.closeReply();
			return;
		}
		$after(post.wrap, this.qArea);
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
		let temp = this.txta.value;
		if(!Cfg.addOPLink && !aib.t && post.isOp && !isNumClick) {
			this.txta.focus();
		} else {
			var isOnNewLine = temp === '' || temp.slice(-1) === '\n';
			$txtInsert(this.txta, (
				isNumClick ? '>>' + pNum + (isOnNewLine ? '\n' : '') :
				(isOnNewLine ? '' : '\n') +
					(this.lastQuickPNum === pNum && temp.includes('>>' + pNum) ? '' : '>>' + pNum + '\n')
			) + (quotetxt ? quotetxt.replace(/^\n|\n$/g, '')
					.replace(/(^|\n)(.)/gm, '$1>' + (Cfg.spacedQuote ? ' ' : '') + '$2') + '\n' : ''));
		}
		temp = pByNum.get(pNum).thr.op.title.trim();
		if(temp.length > 27) {
			temp = temp.substr(0, 30) + '\u2026';
		}
		$q('.de-win-title', this.qArea).textContent = temp || '#' + pNum;
		this.lastQuickPNum = pNum;
	},
	showMainReply(isBottom, evt) {
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
		if(evt) {
			$pd(evt);
		}
	},
	closeReply() {
		if(this.isQuick) {
			this.isQuick = false;
			this.lastQuickPNum = -1;
			if(!aib.t) {
				this._toggleQuickReply(false);
			}
			this.setReply(false, !aib.t || Cfg.addPostForm > 1);
		}
	},
	refreshCap(isErr = false) {
		if(this.cap) {
			this.cap.refreshCaptcha(isErr, isErr, this.tNum);
		}
	},
	setReply(isQuick, needToHide) {
		if(isQuick) {
			$after(this.qArea.firstChild, this.pForm);
		} else {
			$after(this.pArea[+this.isBottom], this.qArea);
			$after(this._pBtn[+this.isBottom], this.pForm);
		}
		this.isHidden = needToHide;
		$toggle(this.qArea, isQuick);
		$toggle(this.pForm, !needToHide);
		this.updatePAreaBtns();
	},
	setPlaceholders() {
		if(aib.kus || !aib.multiFile && Cfg.fileInputs === 2) {
			return;
		}
		this._setPlaceholder('name');
		this._setPlaceholder('subj');
		this._setPlaceholder('mail');
		this._setPlaceholder('video');
		if(this.cap) {
			this._setPlaceholder('cap');
		}
	},
	updateLanguage() {
		this.txta.title = Lng.pasteImage[lang];
		if(!aib.tiny) {
			this.subm.value = Lng.reply[lang];
		}
	},
	updatePAreaBtns() {
		var txt = 'de-abtn de-parea-btn-',
			rep = aib.t ? 'reply' : 'thr';
		$q('a', this._pBtn[+this.isBottom]).className = txt + (!this.pForm.style.display ? 'close' : rep);
		$q('a', this._pBtn[+!this.isBottom]).className = txt + rep;
	},

	_pBtn: [],
	_setSage() {
		var el = $id('de-sagebtn'),
			c = Cfg.sageReply;
		el.style.opacity = c ? '1' : '.3';
		el.title = c ? 'SAGE!' : Lng.noSage[lang];
		if(this.mail.type === 'text') {
			this.mail.value = c ? 'sage' : aib.fch ? 'noko' : '';
		} else {
			this.mail.checked = c;
		}
	},
	_toggleQuickReply(tNum) {
		if(this.oeForm) {
			$del($q('input[name="oek_parent"]', this.oeForm));
			if(tNum) {
				this.oeForm.insertAdjacentHTML('afterbegin',
					'<input type="hidden" value="' + tNum + '" name="oek_parent">');
			}
		}
		if(this.form) {
			if(aib.tiny) {
				if(tNum) {
					$del($q('input[name="page"]', this.form));
				} else if(!$q('input[name="page"]', this.form)) {
					$q('input[name="board"]', this.form).insertAdjacentHTML('afterend',
						'<input name="page" value="1" type="hidden">');
				}
			}
			$del($q(`input[name="${ aib.formParent }"]`, this.form));
			if(tNum) {
				this.form.insertAdjacentHTML('afterbegin',
					`<input type="hidden" name="${ aib.formParent }" value="${ tNum }">`);
			}
		}
	},
	_setPlaceholder(val) {
		var el = val === 'cap' ? this.cap.textEl : this[val];
		if(el) {
			if(aib.multiFile || Cfg.fileInputs !== 2) {
				el.placeholder = Lng[val][lang];
			} else {
				el.removeAttribute('placeholder');
			}
		}
	},
	_wrapText(tag, text) {
		var m, isBB = aib.markupBB;
		if(tag.startsWith('[')) {
			tag = tag.substr(1);
			isBB = true;
		}
		if(isBB) {
			var str;
			if(text.includes('\n')) {
				str = '[' + tag + ']' + text + '[/' + tag + ']';
				return [str.length, str];
			}
			m = text.match(/^(\s*)(.*?)(\s*)$/);
			str = m[1] + '[' + tag + ']' + m[2] + '[/' + tag + ']' + m[3];
			return [!m[2].length ? m[1].length + tag.length + 2 : str.length, str];
		}
		var rv = '', i = 0,
			arr = text.split('\n');
		for(var len = arr.length; i < len; ++i) {
			m = arr[i].match(/^(\s*)(.*?)(\s*)$/);
			rv += '\n' + m[1] + (tag === '^H' ? m[2] + '^H'.repeat(m[2].length) : tag + m[2] + tag) + m[3];
		}
		return [i === 1 && !m[2].length && tag !== '^H' ?
			m[1].length + tag.length :
			rv.length - 1, rv.slice(1)];
	}
};
