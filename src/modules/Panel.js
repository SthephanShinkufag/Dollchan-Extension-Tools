/* ==[ Panel.js ]=============================================================================================
                                                  MAIN PANEL
=========================================================================================================== */

const Panel = Object.create({
	isVidEnabled: false,
	mainEl      : null,
	initPanel(formEl) {
		const filesCount = $Q(aib.qPostImg, formEl).length;
		const isThr = aib.t;
		this.mainEl = $bBegin(formEl, `<div id="de-main-container" class="de-runned-${
			nav.isInPage ? 'inpage' : 'userscript' }">
			<div id="de-panel">
				<div id="de-panel-btn-logo" class="de-panel-btn" title="${ Lng.panelBtn.attach[lang] }">
					<svg class="de-panel-svg">
						<use xlink:href="#de-symbol-panel-logo"/>
					</svg>
				</div>
				<span id="de-panel-buttons"${ !Cfg.expandPanel ? ' style="display: none;"' : '' }>
				${ Cfg.disabled ? this._getButton('enable') : this._getButton('cfg') +
					this._getButton('hid') +
					this._getButton('fav') +
					(Cfg.embedYTube ? this._getButton('vid') : '') +
					(!localData ?
						this._getButton('refresh') +
						(isThr || aib.page !== aib.firstPage ? this._getButton('goback') : '') +
						(!isThr && aib.page !== aib.lastPage ? this._getButton('gonext') : '') : '') +
					this._getButton('goup') +
					this._getButton('godown') +
					(filesCount ? this._getButton('expimg') +
						this._getButton('maskimg', Cfg.maskImgs ? 'de-panel-btn-active' : '') : '') +
					(!localData ?
						(filesCount && !Cfg.preLoadImgs ? this._getButton('preimg') : '') +
						(isThr ? this._getButton('savethr') : '') : '') +
					(!localData && isThr ?
						this._getButton(Cfg.ajaxUpdThr && !aib.isArchived ? 'upd-on' : 'upd-off') +
						(!nav.isSafari ? this._getButton('audio-off') : '') : '') +
					(aib.hasCatalog ? this._getButton('catalog') : '') +
					this._getButton('enable') +
					(isThr && Thread.first ? `<span id="de-panel-info">
						<span id="de-panel-info-posts" title="${
						Lng.panelBtn[Cfg.panelCounter !== 2 ? 'postsCount' : 'postsNotHid'][lang]
						}">${ Thread.first.postsCount }</span>
						<span id="de-panel-info-files" title="${ Lng.panelBtn.filesCount[lang] }">${
							filesCount }</span>
						<span id="de-panel-info-posters" title="${ Lng.panelBtn.postersCount[lang] }">${
							aib.postersCount }</span>
					</span>` : '') }
				</span>
			</div>
			${ Cfg.disabled ? '' : '<div id="de-wrapper-popup"></div>' }
		</div>`);
		this._el = $q('#de-panel', this.mainEl);
		this._el.addEventListener('click', this, true);
		if(!nav.isMobile) {
			['mouseover', 'mouseout'].forEach(e => this._el.addEventListener(e, this));
		}
		this._buttons = $q('#de-panel-buttons', this.mainEl);
	},
	removeMain() {
		this._el.removeEventListener('click', this, true);
		if(!nav.isMobile) {
			['mouseover', 'mouseout'].forEach(e => this._el.removeEventListener(e, this));
		}
		delete this._postsCountEl;
		delete this._filesCountEl;
		delete this._postersCountEl;
		this.mainEl.remove();
	},
	async handleEvent(e) {
		if(nav.isInPage) {
			if(!Panel.mainEl) {
				return;
			}
		} else if(nav.hasInPageDE) {
			// Removing a Dollchan copy that may be already embedded on the page
			$Q('#de-main, #de-main-container:not(.de-runned-userscript)').forEach(
				el => el !== this.mainEl && el?.remove());
		}
		if('isTrusted' in e && !e.isTrusted) {
			return;
		}
		let el = e.target;
		el = el.tagName.toLowerCase() === 'svg' ? el.parentNode : el;
		switch(e.type) {
		case 'click':
			if(el.tagName.toLowerCase() === 'a') {
				return;
			}
			e.preventDefault();
			switch(el.id) {
			case 'de-panel-btn-logo':
				if(Cfg.expandPanel) {
					if(!$q('.de-win-opened', this.mainEl)) {
						$hide(this._buttons);
					}
				} else {
					$show(this._buttons);
				}
				await toggleCfg('expandPanel');
				return;
			case 'de-panel-btn-cfg': toggleWindow('cfg', false); return;
			case 'de-panel-btn-hid': toggleWindow('hid', false); return;
			case 'de-panel-btn-fav': toggleWindow('fav', false); return;
			case 'de-panel-btn-vid':
				this.isVidEnabled = !this.isVidEnabled;
				toggleWindow('vid', false);
				return;
			case 'de-panel-btn-refresh':
				if(nav.isMobile && !aib.t) {
					this._menuToggleClickBtn(el);
				} else {
					deWindow.location.reload();
				}
				return;
			case 'de-panel-btn-goup': scrollTo(0, 0); return;
			case 'de-panel-btn-godown': scrollTo(0, doc.body.scrollHeight || doc.body.offsetHeight); return;
			case 'de-panel-btn-expimg':
				el.classList.toggle('de-panel-btn-active');
				isExpImg = !isExpImg;
				$q('.de-fullimg-center')?.remove();
				for(let post = Thread.first.op; post; post = post.next) {
					post.toggleImages(isExpImg, false);
				}
				return;
			case 'de-panel-btn-preimg':
				el.classList.toggle('de-panel-btn-active');
				isPreImg = !isPreImg;
				if(!e.ctrlKey) {
					for(const { el } of DelForm) {
						ContentLoader.preloadImages(el);
					}
				}
				return;
			case 'de-panel-btn-maskimg':
				el.classList.toggle('de-panel-btn-active');
				await toggleCfg('maskImgs');
				updateCSS();
				return;
			case 'de-panel-btn-upd-on':
			case 'de-panel-btn-upd-warn':
			case 'de-panel-btn-upd-off':
				updater.toggle();
				return;
			case 'de-panel-btn-audio-on':
				if(nav.isMobile) {
					updater.toggleAudio(0);
					el.id = 'de-panel-btn-audio-off';
					return;
				}
				/* falls through */
			case 'de-panel-btn-audio-off': {
				if(nav.isMobile) {
					this._menuToggleClickBtn(el);
					return;
				} else if(updater.toggleAudio(0)) {
					updater.enableUpdater();
					el.id = 'de-panel-btn-audio-on';
				} else {
					el.id = 'de-panel-btn-audio-off';
				}
				if(this._menu) {
					this._menu.removeMenu();
					this._menu = null;
				}
				return;
			}
			case 'de-panel-btn-savethr':
				if(nav.isMobile) {
					this._menuToggleClickBtn(el);
				}
				return;
			case 'de-panel-btn-enable':
				await toggleCfg('disabled');
				deWindow.location.reload();
				return;
			default: return;
			}
		case 'mouseover':
			if(!Cfg.expandPanel) {
				clearTimeout(this._hideTO);
				$show(this._buttons);
			}
			switch(el.id) {
			case 'de-panel-btn-cfg': KeyEditListener.setTitle(el, 10); break;
			case 'de-panel-btn-hid': KeyEditListener.setTitle(el, 7); break;
			case 'de-panel-btn-fav': KeyEditListener.setTitle(el, 6); break;
			case 'de-panel-btn-vid': KeyEditListener.setTitle(el, 18); break;
			case 'de-panel-btn-goback': KeyEditListener.setTitle(el, 4); break;
			case 'de-panel-btn-gonext': KeyEditListener.setTitle(el, 17); break;
			case 'de-panel-btn-maskimg': KeyEditListener.setTitle(el, 9); break;
			case 'de-panel-btn-refresh':
				if(aib.t) {
					return;
				}
				/* falls through */
			case 'de-panel-btn-savethr':
			case 'de-panel-btn-audio-off': {
				if(this._menu?.parentEl === el) {
					return;
				}
				this._menuTO = setTimeout(() => {
					this._menu = Menu.addMenu(el);
					this._menu.onover = () => clearTimeout(this._hideTO);
					this._menu.onout = () => this._setHideTimeout(null);
					this._menu.onremove = () => (this._menu = null);
				}, Cfg.linksOver);
			}
			}
			return;
		default: // mouseout
			this._setHideTimeout(e.relatedTarget);
			switch(el.id) {
			case 'de-panel-btn-refresh':
			case 'de-panel-btn-savethr':
			case 'de-panel-btn-audio-off': clearTimeout(this._menuTO);
			}
		}
	},
	updateCounter(postCount, filesCount, postersCount) {
		this._postsCountEl.textContent = postCount;
		this._filesCountEl.textContent = filesCount;
		this._postersCountEl.textContent = postersCount;
		aib.updateCounters?.(postCount, filesCount, postersCount);
	},

	_el    : null,
	_hideTO: null,
	_menu  : null,
	_menuTO: null,
	get _filesCountEl() {
		const value = $q('#de-panel-info-files', this.mainEl);
		Object.defineProperty(this, '_filesCountEl', { value, configurable: true });
		return value;
	},
	get _postersCountEl() {
		const value = $q('#de-panel-info-posters', this.mainEl);
		Object.defineProperty(this, '_postersCountEl', { value, configurable: true });
		return value;
	},
	get _postsCountEl() {
		const value = $q('#de-panel-info-posts', this.mainEl);
		Object.defineProperty(this, '_postsCountEl', { value, configurable: true });
		return value;
	},
	_getButton(id, className) {
		let page, href, title, useId;
		let tag = 'button';
		switch(id) {
		case 'goback':
			tag = 'a';
			page = Math.max(aib.page - 1, 0);
			href = aib.getPageUrl(aib.b, page);
			if(!aib.t) {
				title = Lng.panelBtn.gonext[lang].replace('%s', page);
			}
			useId = 'arrow';
			break;
		case 'gonext':
			tag = 'a';
			page = aib.page + 1;
			href = aib.getPageUrl(aib.b, page);
			title = Lng.panelBtn.gonext[lang].replace('%s', page);
			/* falls through */
		case 'goup':
		case 'godown':
			useId = 'arrow';
			break;
		case 'upd-on':
		case 'upd-off':
			useId = 'upd';
			break;
		case 'catalog':
			tag = 'a';
			href = aib.catalogUrl;
		}
		return `<${ tag } id="de-panel-btn-${ id }" class="de-abtn de-panel-btn${
			className ? ' ' + className : '' }" title="${ title || Lng.panelBtn[id][lang] }" ${
			href ? 'href="' + href + '"' : '' }>
			<svg class="de-panel-svg">
			${ id !== 'audio-off' ? `
				<use xlink:href="#de-symbol-panel-${ useId || id }"/>` : `
				<use class="de-use-audio-off" xlink:href="#de-symbol-panel-audio-off"/>
				<use class="de-use-audio-on" xlink:href="#de-symbol-panel-audio-on"/>` }
			</svg>
		</${ tag }>`;
	},
	_menuToggleClickBtn(buttonEl) {
		if(this._menu?.el && this._menu.parentEl === buttonEl) {
			this._menu.removeMenu();
			this._menu = null;
			return;
		}
		this._menu = Menu.addMenu(buttonEl);
	},
	_setHideTimeout(targetEl) {
		if(!Cfg.expandPanel && !$q('.de-win-opened', this.mainEl) && !$contains(this._el, targetEl)) {
			this._hideTO = setTimeout(() => $hide(this._buttons), 500);
		}
	}
});
