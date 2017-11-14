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
		el = $id('de-wrapper-popup').appendChild($add(`
		<div class="${ aib.cReply } de-popup" id="de-popup-${ id }">
			<span class="de-popup-btn">${ buttonHTML }</span>
			<div class="de-popup-msg">${ txt.trim() }</div>
		</div>`));
		el.onclick = ({ target }) => {
			let el = fixEventEl(target);
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
	return $btn(Lng.edit[lang], Lng.editInTxt[lang], () => getDataFn(function(val, isJSON, saveFn) {
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
		style.left = (isFixed ? 0 : window.pageXOffset) +
			(cr.left + w < Post.sizing.wWidth ? cr.left : cr.right - w) + 'px';
		style.top = (isFixed ? 0 : window.pageYOffset) +
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
	handleEvent(e) {
		let isOverEvent = false;
		const el = e.target;
		switch(e.type) {
		case 'click':
			if(el.className === 'de-menu-item') {
				this.remove();
				this._clickFn(el);
				if(!Cfg.expandPanel && !$q('.de-win-active')) {
					$hide($id('de-panel-buttons'));
				}
			}
			break;
		case 'mouseover': isOverEvent = true;
			/* falls through */
		case 'mouseout':
			clearTimeout(this._closeTO);
			let rt = fixEventEl(e.relatedTarget);
			rt = rt && rt.farthestViewportElement || rt;
			if(!rt || (rt !== this._el && !this._el.contains(rt))) {
				if(isOverEvent) {
					if(this.onover) {
						this.onover();
					}
				} else if(!rt || (rt !== this.parentEl && !this.parentEl.contains(rt))) {
					this._closeTO = setTimeout(() => this.remove(), 75);
					if(this.onout) {
						this.onout();
					}
				}
			}
		}
	}
	remove() {
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
	const fn = a => $join(a, '<span class="de-menu-item">', '</span>');
	switch(el.id) {
	case 'de-btn-spell-add':
		return new Menu(el, `<div style="display: inline-block; border-right: 1px solid grey;">${
			fn(('#words,#exp,#exph,#imgn,#ihash,#subj,#name,#trip,#img,#sage').split(','))
		}</div><div style="display: inline-block;">${
			fn(('#op,#tlen,#all,#video,#vauthor,#num,#wipe,#rep,#outrep,<br>').split(',')) }</div>`,
		function(el) {
			const exp = el.textContent;
			$txtInsert($id('de-spell-txt'), exp +
				(!aib.t || exp === '#op' || exp === '#rep' || exp === '#outrep' ? '' :
					`[${ aib.b },${ aib.t }]`) +
				(Spells.needArg[Spells.names.indexOf(exp.substr(1))] ? '(' : ''));
		});
	case 'de-panel-refresh':
		return new Menu(el, fn(Lng.selAjaxPages[lang]), function(el) {
			Pages.load(aProto.indexOf.call(el.parentNode.children, el) + 1);
		});
	case 'de-panel-savethr':
		return new Menu(el, fn($q(aib.qPostImg, DelForm.first.el) ?
			Lng.selSaveThr[lang] : [Lng.selSaveThr[lang][0]]),
		function(el) {
			if(!$id('de-popup-savethr')) {
				const imgOnly = !!aProto.indexOf.call(el.parentNode.children, el);
				if(Images_.preloading) {
					$popup('savethr', Lng.loading[lang], true);
					Images_.afterpreload = () => loadDocFiles(imgOnly);
					Images_.progressId = 'savethr';
				} else {
					loadDocFiles(imgOnly);
				}
			}
		});
	case 'de-panel-audio-off':
		return new Menu(el, fn(Lng.selAudioNotif[lang]), function(el) {
			const i = aProto.indexOf.call(el.parentNode.children, el);
			updater.enable();
			updater.toggleAudio(i === 0 ? 3e4 : i === 1 ? 6e4 : i === 2 ? 12e4 : 3e5);
			$id('de-panel-audio-off').id = 'de-panel-audio-on';
		});
	}
}
