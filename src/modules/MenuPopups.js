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
	const html = `<span class="de-popup-btn">${
		isWait ? '<svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg>' : '\u2716 '
	}</span>${ txt.trim() }`;
	if(el) {
		el.innerHTML = html;
		if(!isWait && Cfg.animation) {
			$animate(el, 'de-blink');
		}
	} else {
		el = $bEnd($id('de-wrapper-popup'),
			`<div class="${ aib.cReply } de-popup" id="de-popup-${ id }">${ html }</div>`);
		el.onclick = e => {
			let el = nav.fixEventEl(e.target);
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
	return el;
}

// Adds button that calls a popup with the text editor. Useful to edit settings.
function getEditButton(name, getDataFn, className = 'de-button') {
	return $button(Lng.edit[lang], Lng.editInTxt[lang], () => getDataFn((val, isJSON, saveFn) => {
		// Create popup window with textarea.
		const el = $popup('edit-' + name,
			`<b>${ Lng.editor[name][lang] }</b><textarea class="de-editor"></textarea>`);
		const inputEl = el.lastChild;
		inputEl.value = isJSON ? JSON.stringify(val, null, '\t') : val;
		// "Save" button. If there a JSON data, parses and saves on success.
		el.append($button(Lng.save[lang], Lng.saveChanges[lang], !isJSON ? () => saveFn(inputEl) : () => {
			let data;
			try {
				data = JSON.parse(inputEl.value.trim().replace(/[\n\r\t]/g, '') || '{}');
			} catch(err) {}
			if(!data) {
				$popup('err-invaliddata', Lng.invalidData[lang]);
				return;
			}
			saveFn(data);
			closePopup('edit-' + name);
			closePopup('err-invaliddata');
		}));
	}), className);
}

class Menu {
	constructor(parentEl, html, clickFn, isFixed = true) {
		this.onout = null;
		this.onover = null;
		this.onremove = null;
		this._closeTO = 0;
		const el = $bEnd(doc.body, `<div class="${ aib.cReply } de-menu" style="position: ${
			isFixed ? 'fixed' : 'absolute' }; left: 0px; top: 0px; visibility: hidden;">${ html }</div>`);
		const cr = parentEl.getBoundingClientRect();
		const { style, offsetWidth: w, offsetHeight: h } = el;
		this.el = el;
		style.left = (isFixed ? 0 : deWindow.pageXOffset) +
			(cr.left + w < Post.sizing.wWidth || w > .8 * Post.sizing.wWidth ? cr.left : cr.right - w) + 'px';
		style.top = (isFixed ? 0 : deWindow.pageYOffset) +
			(cr.bottom + h < Post.sizing.wHeight ? cr.bottom - 0.5 : cr.top - h + 0.5) + 'px';
		style.removeProperty('visibility');
		this._clickFn = clickFn;
		this.parentEl = parentEl;
		['mouseover', 'mouseout'].forEach(e => el.addEventListener(e, this, true));
		el.addEventListener('click', this);
		parentEl.addEventListener('mouseout', this);
	}
	static addMenu(el) {
		const tags = a => arrTags(a, '<span class="de-menu-item">', '</span>');
		switch(el.id) {
		case 'de-btn-spell-add':
			return new Menu(el, `<div style="display: inline-block; border-right: 1px solid grey;">${
				tags('#words,#exp,#exph,#imgn,#ihash,#subj,#name,#trip,#img,#sage'.split(','))
			}</div><div style="display: inline-block;">${
				tags('#op,#tlen,#all,#video,#vauthor,#num,#wipe,#rep,#outrep,<br>'.split(',')) }</div>`,
			({ textContent: s }) => insertText($id('de-spell-txt'), s +
				(!aib.t || s === '#op' || s === '#rep' || s === '#outrep' ? '' : `[${ aib.b },${ aib.t }]`) +
				(Spells.needArg[Spells.names.indexOf(s.substr(1))] ? '(' : '')));
		case 'de-panel-refresh':
			return new Menu(el, tags(Lng.selAjaxPages[lang]),
				el => Pages.loadPages(Array.prototype.indexOf.call(el.parentNode.children, el) + 1));
		case 'de-panel-savethr':
			return new Menu(el, tags($q(aib.qPostImg, DelForm.first.el) ?
				Lng.selSaveThr[lang] : [Lng.selSaveThr[lang][0]]),
			el => {
				if($id('de-popup-savethr')) {
					return;
				}
				const imgOnly = !!Array.prototype.indexOf.call(el.parentNode.children, el);
				if(ContentLoader.isLoading) {
					$popup('savethr', Lng.loading[lang], true);
					ContentLoader.afterFn = () => ContentLoader.downloadThread(imgOnly);
					ContentLoader.popupId = 'savethr';
				} else {
					ContentLoader.downloadThread(imgOnly);
				}
			});
		case 'de-panel-audio-off':
			return new Menu(el, tags(Lng.selAudioNotif[lang]), el => {
				updater.enableUpdater();
				updater.toggleAudio(
					[3e4, 6e4, 12e4, 3e5][Array.prototype.indexOf.call(el.parentNode.children, el)]);
				$id('de-panel-audio-off').id = 'de-panel-audio-on';
			});
		}
	}
	static getMenuImg(data, isDlOnly = false) {
		let p;
		let dlLinks = '';
		if(typeof data === 'string') {
			p = encodeURIComponent(data) + '" target="_blank">' + Lng.frameSearch[lang];
		} else {
			const link = data.nextSibling;
			const { href } = link;
			const origSrc = link.getAttribute('de-href') || href;
			p = encodeURIComponent(origSrc) + '" target="_blank">' + Lng.searchIn[lang];
			const getDlLnk = (href, name, title, isAddExt) => {
				let ext;
				if(isAddExt) {
					ext = getFileExt(href);
					name += '.' + ext;
				} else {
					ext = getFileExt(name);
				}
				let nameShort = name;
				if(name.length > 20) {
					nameShort = name.substr(0, 20 - ext.length) + '\u2026' + ext;
				}
				const info = aib.domain !== href.match(/^(?:(?:blob:)?https?:\/\/)([^/]+)/)[1] ?
					' info="img-load"' : '';
				return `<a class="de-menu-item" href="${ href }" download="${ name }" title="${
					title }"${ info } target="_blank">${ Lng.saveAs[lang] } &quot;${ nameShort }&quot;</a>`;
			};
			const name = decodeURIComponent(getFileName(origSrc));
			const isFullImg = link.classList.contains('de-fullimg-link');
			const realName = isFullImg ? link.textContent :
				link.classList.contains('de-img-name') ? aib.getImgRealName(aib.getImgWrap(data)) : name;
			if(name !== realName) {
				dlLinks += getDlLnk(href, realName, Lng.origName[lang], false);
			}
			let webmTitle;
			if(isFullImg && (webmTitle = $q('.de-webm-title', link.parentNode)?.textContent)) {
				dlLinks += getDlLnk(href, webmTitle, Lng.metaName[lang], true);
			}
			dlLinks += getDlLnk(href, name, Lng.boardName[lang], false);
		}
		return dlLinks + (isDlOnly ? '' : arrTags([
			`de-src-google" href="https://lens.google.com/uploadbyurl?url=${ p }Google`,
			`de-src-yandex" href="https://yandex.com/images/search?rpt=imageview&url=${ p }Yandex`,
			`de-src-tineye" href="https://tineye.com/search/?url=${ p }TinEye`,
			`de-src-saucenao" href="https://saucenao.com/search.php?url=${ p }SauceNAO`,
			`de-src-iqdb" href="https://iqdb.org/?url=${ p }IQDB`,
			`de-src-tracemoe" href="https://trace.moe/?auto&url=${ p }TraceMoe`
		], '<a class="de-menu-item ', '</a>'));
	}
	handleEvent(e) {
		let isOverEvent = false;
		switch(e.type) {
		case 'click':
			if(e.target.classList.contains('de-menu-item')) {
				this.removeMenu();
				this._clickFn(e.target, e);
				if(!Cfg.expandPanel && !$q('.de-win-active')) {
					$hide($id('de-panel-buttons'));
				}
			}
			break;
		case 'mouseover': isOverEvent = true;
			/* falls through */
		case 'mouseout': {
			clearTimeout(this._closeTO);
			const targetEl = nav.fixEventEl(e.relatedTarget);
			if(!$contains(this.el, targetEl)) {
				if(isOverEvent) {
					this.onover?.();
				} else if(!$contains(this.parentEl, targetEl)) {
					this._closeTO = setTimeout(() => this.removeMenu(), 75);
					this.onout?.();
				}
			}
		}
		}
	}
	removeMenu() {
		if(!this.el) {
			return;
		}
		this.onremove?.();
		['mouseover', 'mouseout'].forEach(e => this.el.removeEventListener(e, this, true));
		this.parentEl.removeEventListener('mouseout', this);
		this.el.removeEventListener('click', this);
		this.el.remove();
		this.el = null;
	}
}
