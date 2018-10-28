/* ==[ MenuPopups.js ]========================================================================================
                                                POPUPS & MENU
=========================================================================================================== */

function closePopup(data) {
	const el = typeof data === 'string' ? $id('de-popup-' + data) : data;
	if(el) {
		el.closeTimeout = null;
		if(Cfg.animation) {
			$animate(el, 'de-close', true);
		} else {
			el.remove();
		}
	}
}

function $popup(id, txt, isWait = false) {
	let el = $id('de-popup-' + id);
	const buttonHTML = isWait ? '<svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg>' : '\u2716 ';
	if(el) {
		$q('div', el).innerHTML = txt.trim();
		$q('span', el).innerHTML = buttonHTML;
		if(!isWait && Cfg.animation) {
			$animate(el, 'de-blink');
		}
	} else {
		el = $bEnd($id('de-wrapper-popup'), `<div class="${ aib.cReply } de-popup" id="de-popup-${ id }">
			<span class="de-popup-btn">${ buttonHTML }</span>
			<div class="de-popup-msg">${ txt.trim() }</div>
		</div>`);
		el.onclick = e => {
			let el = fixEventEl(e.target);
			el = el.tagName.toLowerCase() === 'svg' ? el.parentNode : el;
			if(el.className === 'de-popup-btn') {
				closePopup(el.parentNode);
			}
		};
		if(Cfg.animation) {
			$animate(el, 'de-open');
		}
	}
	if(Cfg.closePopups && !isWait && !id.includes('edit') && !id.includes('cfg')) {
		el.closeTimeout = setTimeout(closePopup, 6e3, el);
	}
	return el.lastElementChild;
}

// Adds button that calls a popup with the text editor. Useful to edit settings.
function getEditButton(name, getDataFn, className = 'de-button') {
	return $btn(Lng.edit[lang], Lng.editInTxt[lang], () => getDataFn((val, isJSON, saveFn) => {
		// Create popup window with textarea.
		const el = $popup('edit-' + name,
			`<b>${ Lng.editor[name][lang] }</b><textarea class="de-editor"></textarea>`);
		const ta = el.lastChild;
		ta.value = isJSON ? JSON.stringify(val, null, '\t') : val;
		// "Save" button. If there a JSON data, parses and saves on success.
		el.appendChild($btn(Lng.save[lang], Lng.saveChanges[lang], !isJSON ? saveFn.bind(ta) : () => {
			let data;
			try {
				data = JSON.parse(ta.value.trim().replace(/[\n\r\t]/g, '') || '{}');
			} finally {
				if(!data) {
					$popup('err-invaliddata', Lng.invalidData[lang]);
					return;
				}
				saveFn(data);
				closePopup('edit-' + name);
				closePopup('err-invaliddata');
			}
		}));
	}), className);
}

class Menu {
	constructor(parentEl, html, clickFn, isFixed = true) {
		this.onout = null;
		this.onover = null;
		this.onremove = null;
		this._closeTO = 0;
		const el = $bEnd(docBody, `<div class="${ aib.cReply } de-menu" style="position: ${
			isFixed ? 'fixed' : 'absolute' }; left: 0px; top: 0px; visibility: hidden;">${ html }</div>`);
		const cr = parentEl.getBoundingClientRect();
		const { style, offsetWidth: w, offsetHeight: h } = el;
		style.left = (isFixed ? 0 : deWindow.pageXOffset) +
			(cr.left + w < Post.sizing.wWidth ? cr.left : cr.right - w) + 'px';
		style.top = (isFixed ? 0 : deWindow.pageYOffset) +
			(cr.bottom + h < Post.sizing.wHeight ? cr.bottom - 0.5 : cr.top - h + 0.5) + 'px';
		style.removeProperty('visibility');
		this._clickFn = clickFn;
		this._el = el;
		this.parentEl = parentEl;
		el.addEventListener('mouseover', this, true);
		el.addEventListener('mouseout', this, true);
		el.addEventListener('click', this);
		parentEl.addEventListener('mouseout', this);
	}
	static getMenuImgSrc(data) {
		let p;
		if(typeof data === 'string') {
			p = encodeURIComponent(data) + '" target="_blank">' + Lng.frameSearch[lang];
		} else {
			const link = data.nextSibling;
			p = encodeURIComponent(data.getAttribute('de-href') || link.getAttribute('de-href') ||
				link.href) + '" target="_blank">' + Lng.searchIn[lang];
		}
		return arrTags([
			`de-src-google" href="https://www.google.com/searchbyimage?image_url=${ p }Google`,
			`de-src-yandex" href="https://yandex.com/images/search?rpt=imageview&img_url=${ p }Yandex`,
			`de-src-tineye" href="https://tineye.com/search/?url=${ p }TinEye`,
			`de-src-saucenao" href="https://saucenao.com/search.php?url=${ p }SauceNAO`,
			`de-src-iqdb" href="https://iqdb.org/?url=${ p }IQDB`,
			`de-src-tracemoe" href="https://trace.moe/?auto&url=${ p }TraceMoe`
		], '<a class="de-menu-item ', '</a>');
	}
	handleEvent(e) {
		let isOverEvent = false;
		switch(e.type) {
		case 'click':
			if(e.target.classList.contains('de-menu-item')) {
				this.removeMenu();
				this._clickFn(e.target);
				if(!Cfg.expandPanel && !$q('.de-win-active')) {
					$hide($id('de-panel-buttons'));
				}
			}
			break;
		case 'mouseover': isOverEvent = true;
			/* falls through */
		case 'mouseout': {
			clearTimeout(this._closeTO);
			let rt = fixEventEl(e.relatedTarget);
			rt = rt && rt.farthestViewportElement || rt;
			if(!rt || (rt !== this._el && !this._el.contains(rt))) {
				if(isOverEvent) {
					if(this.onover) {
						this.onover();
					}
				} else if(!rt || (rt !== this.parentEl && !this.parentEl.contains(rt))) {
					this._closeTO = setTimeout(() => this.removeMenu(), 75);
					if(this.onout) {
						this.onout();
					}
				}
			}
		}
		}
	}
	removeMenu() {
		if(!this._el) {
			return;
		}
		if(this.onremove) {
			this.onremove();
		}
		this._el.removeEventListener('mouseover', this, true);
		this._el.removeEventListener('mouseout', this, true);
		this.parentEl.removeEventListener('mouseout', this);
		this._el.removeEventListener('click', this);
		$del(this._el);
		this._el = null;
	}
}

function addMenu(el) {
	const fn = a => arrTags(a, '<span class="de-menu-item">', '</span>');
	switch(el.id) {
	case 'de-btn-spell-add':
		return new Menu(el, `<div style="display: inline-block; border-right: 1px solid grey;">${
			fn('#words,#exp,#exph,#imgn,#ihash,#subj,#name,#trip,#img,#sage'.split(','))
		}</div><div style="display: inline-block;">${
			fn('#op,#tlen,#all,#video,#vauthor,#num,#wipe,#rep,#outrep,<br>'.split(',')) }</div>`,
		({ textContent: s }) => $txtInsert($id('de-spell-txt'), s +
			(!aib.t || s === '#op' || s === '#rep' || s === '#outrep' ? '' : `[${ aib.b },${ aib.t }]`) +
			(Spells.needArg[Spells.names.indexOf(s.substr(1))] ? '(' : '')));
	case 'de-panel-refresh':
		return new Menu(el, fn(Lng.selAjaxPages[lang]),
			el => Pages.loadPages(aProto.indexOf.call(el.parentNode.children, el) + 1));
	case 'de-panel-savethr':
		return new Menu(el, fn($q(aib.qPostImg, DelForm.first.el) ?
			Lng.selSaveThr[lang] : [Lng.selSaveThr[lang][0]]),
		el => {
			if($id('de-popup-savethr')) {
				return;
			}
			const imgOnly = !!aProto.indexOf.call(el.parentNode.children, el);
			if(ContentLoader.isLoading) {
				$popup('savethr', Lng.loading[lang], true);
				ContentLoader.afterFn = () => ContentLoader.downloadThread(imgOnly);
				ContentLoader.popupId = 'savethr';
			} else {
				ContentLoader.downloadThread(imgOnly);
			}
		});
	case 'de-panel-audio-off':
		return new Menu(el, fn(Lng.selAudioNotif[lang]), el => {
			updater.enableUpdater();
			updater.toggleAudio([3e4, 6e4, 12e4, 3e5][aProto.indexOf.call(el.parentNode.children, el)]);
			$id('de-panel-audio-off').id = 'de-panel-audio-on';
		});
	}
}
