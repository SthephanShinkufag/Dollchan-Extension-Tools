/* ==[ Panel.js ]=============================================================================================
                                                  MAIN PANEL
=========================================================================================================== */

const Panel = Object.create({
	isVidEnabled: false,
	initPanel(formEl) {
		const imgLen = $Q(aib.qPostImg, formEl).length;
		const isThr = aib.t;
		(pr?.pArea[0] || formEl).insertAdjacentHTML('beforebegin', `<div id="de-main">
			<div id="de-panel">
				<div id="de-panel-logo" title="${ Lng.panelBtn.attach[lang] }">
					<svg class="de-panel-logo-svg">
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
					(imgLen ? this._getButton('expimg') + this._getButton('maskimg') : '') +
					(!localData && !nav.isPresto ?
						(imgLen && !Cfg.preLoadImgs ? this._getButton('preimg') : '') +
						(isThr ? this._getButton('savethr') : '') : '') +
					(!localData && isThr ?
						this._getButton(Cfg.ajaxUpdThr && !aib.isArchived ? 'upd-on' : 'upd-off') +
						(!nav.isSafari ? this._getButton('audio-off') : '') : '') +
					(aib.hasCatalog ? this._getButton('catalog') : '') +
					this._getButton('enable') +
					(isThr && Thread.first ? `<span id="de-panel-info">
						<span id="de-panel-info-pcount" title="` +
							`${ Lng.panelBtn[Cfg.panelCounter !== 2 ? 'pcount' : 'pcountNotHid'][lang] }">` +
							`${ Thread.first.pcount }</span>
						<span id="de-panel-info-icount" title="${ Lng.panelBtn.imglen[lang] }">${
							imgLen }</span>
						<span id="de-panel-info-acount" title="${ Lng.panelBtn.posters[lang] }"></span>
					</span>` : '') }
				</span>
			</div>
			${ Cfg.disabled ? '' : '<div id="de-wrapper-popup"></div><hr style="clear: both;">' }
		</div>`);
		this._el = $id('de-panel');
		this._el.addEventListener('click', this, true);
		['mouseover', 'mouseout'].forEach(e => this._el.addEventListener(e, this));
		this._buttons = $id('de-panel-buttons');
		this.isNew = true;
	},
	removeMain() {
		this._el.removeEventListener('click', this, true);
		['mouseover', 'mouseout'].forEach(e => this._el.removeEventListener(e, this));
		delete this._pcountEl;
		delete this._icountEl;
		delete this._acountEl;
		$id('de-main').remove();
	},
	async handleEvent(e) {
		if('isTrusted' in e && !e.isTrusted) {
			return;
		}
		let el = nav.fixEventEl(e.target);
		el = el.tagName.toLowerCase() === 'svg' ? el.parentNode : el;
		switch(e.type) {
		case 'click':
			if (el.classList.contains('de-panel-button')) {
				e.preventDefault();
			}
			switch(el.id) {
			case 'de-panel-logo':
				if(Cfg.expandPanel && !$q('.de-win-active')) {
					$hide(this._buttons);
				}
				await toggleCfg('expandPanel');
				return;
			case 'de-panel-cfg': toggleWindow('cfg', false); return;
			case 'de-panel-hid': toggleWindow('hid', false); return;
			case 'de-panel-fav': toggleWindow('fav', false); return;
			case 'de-panel-vid':
				this.isVidEnabled = !this.isVidEnabled;
				toggleWindow('vid', false);
				return;
			case 'de-panel-refresh': deWindow.location.reload(); return;
			case 'de-panel-goup': scrollTo(0, 0); return;
			case 'de-panel-godown': scrollTo(0, docBody.scrollHeight || docBody.offsetHeight); return;
			case 'de-panel-expimg':
				el.classList.toggle('de-panel-button-active');
				isExpImg = !isExpImg;
				$del($q('.de-fullimg-center'));
				for(let post = Thread.first.op; post; post = post.next) {
					post.toggleImages(isExpImg, false);
				}
				return;
			case 'de-panel-preimg':
				el.classList.toggle('de-panel-button-active');
				isPreImg = !isPreImg;
				if(!e.ctrlKey) {
					for(const { el } of DelForm) {
						ContentLoader.preloadImages(el);
					}
				}
				return;
			case 'de-panel-maskimg':
				el.classList.toggle('de-panel-button-active');
				await toggleCfg('maskImgs');
				updateCSS();
				return;
			case 'de-panel-upd-on':
			case 'de-panel-upd-warn':
			case 'de-panel-upd-off':
				updater.toggle();
				return;
			case 'de-panel-audio-on':
			case 'de-panel-audio-off':
				if(updater.toggleAudio(0)) {
					updater.enableUpdater();
					el.id = 'de-panel-audio-on';
				} else {
					el.id = 'de-panel-audio-off';
				}
				$del($q('.de-menu'));
				return;
			case 'de-panel-savethr': return;
			case 'de-panel-enable':
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
			case 'de-panel-cfg': KeyEditListener.setTitle(el, 10); break;
			case 'de-panel-hid': KeyEditListener.setTitle(el, 7); break;
			case 'de-panel-fav': KeyEditListener.setTitle(el, 6); break;
			case 'de-panel-vid': KeyEditListener.setTitle(el, 18); break;
			case 'de-panel-goback': KeyEditListener.setTitle(el, 4); break;
			case 'de-panel-gonext': KeyEditListener.setTitle(el, 17); break;
			case 'de-panel-maskimg': KeyEditListener.setTitle(el, 9); break;
			case 'de-panel-refresh':
				if(aib.t) {
					return;
				}
				/* falls through */
			case 'de-panel-savethr':
			case 'de-panel-audio-off':
				if(this._menu?.parentEl === el) {
					return;
				}
				this._menuTO = setTimeout(() => {
					this._menu = addMenu(el);
					this._menu.onover = () => clearTimeout(this._hideTO);
					this._menu.onout = () => this._prepareToHide(null);
					this._menu.onremove = () => (this._menu = null);
				}, Cfg.linksOver);
			}
			return;
		default: // mouseout
			this._prepareToHide(nav.fixEventEl(e.relatedTarget));
			switch(el.id) {
			case 'de-panel-refresh':
			case 'de-panel-savethr':
			case 'de-panel-audio-off':
				clearTimeout(this._menuTO);
				this._menuTO = 0;
			}
		}
	},
	updateCounter(postCount, imgsCount, postersCount) {
		this._pcountEl.textContent = postCount;
		this._icountEl.textContent = imgsCount;
		this._acountEl.textContent = postersCount;
		this.isNew = false;
	},

	_el     : null,
	_hideTO : 0,
	_menu   : null,
	_menuTO : 0,
	get _acountEl() {
		const value = $id('de-panel-info-acount');
		Object.defineProperty(this, '_acountEl', { value, configurable: true });
		return value;
	},
	get _icountEl() {
		const value = $id('de-panel-info-icount');
		Object.defineProperty(this, '_icountEl', { value, configurable: true });
		return value;
	},
	get _pcountEl() {
		const value = $id('de-panel-info-pcount');
		Object.defineProperty(this, '_pcountEl', { value, configurable: true });
		return value;
	},
	_getButton(id) {
		let page, href, title, useId;
		switch(id) {
		case 'goback':
			page = Math.max(aib.page - 1, 0);
			href = aib.getPageUrl(aib.b, page);
			if(!aib.t) {
				title = Lng.panelBtn.gonext[lang].replace('%s', page);
			}
			useId = 'arrow';
			break;
		case 'gonext':
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
			href = aib.catalogUrl;
		}
		return `<a id="de-panel-${ id }" class="de-abtn de-panel-button" title="${
			title || Lng.panelBtn[id][lang] }" href="${ href || '#' }">
			<svg class="de-panel-svg">
			${ id !== 'audio-off' ? `
				<use xlink:href="#de-symbol-panel-${ useId || id }"/>` : `
				<use class="de-use-audio-off" xlink:href="#de-symbol-panel-audio-off"/>
				<use class="de-use-audio-on" xlink:href="#de-symbol-panel-audio-on"/>` }
			</svg>
		</a>`;
	},
	_prepareToHide(rt) {
		if(!Cfg.expandPanel && !$q('.de-win-active') &&
			(!rt || !this._el.contains(rt.farthestViewportElement || rt))
		) {
			this._hideTO = setTimeout(() => $hide(this._buttons), 500);
		}
	}
});
