/* ==[ Panel.js ]=============================================================================================
                                                  MAIN PANEL
=========================================================================================================== */

const Panel = Object.create({
	isVidEnabled: false,
	initPanel(formEl) {
		const imgLen = $Q(aib.qPostImg, formEl).length;
		const isThr = aib.t;
		(pr && pr.pArea[0] || formEl).insertAdjacentHTML('beforebegin', `<div id="de-main">
			<div id="de-panel">
				<div id="de-panel-logo" title="${ Lng.panelBtn.attach[lang] }">
					<svg class="de-panel-logo-svg">
						<use xlink:href="#de-symbol-panel-logo"/>
					</svg>
				</div>
				<span id="de-panel-buttons"${ Cfg.expandPanel ? '' : ' style="display: none;"' }>
				${ Cfg.disabled ? this._getButton('enable') : this._getButton('cfg') +
					this._getButton('hid') +
					this._getButton('fav') +
					(!Cfg.addYouTube ? '' : this._getButton('vid')) +
					(localData ? '' :
						this._getButton('refresh') +
						(!isThr && (aib.page === aib.firstPage) ? '' : this._getButton('goback')) +
						(isThr || aib.page === aib.lastPage ? '' : this._getButton('gonext'))) +
					this._getButton('goup') +
					this._getButton('godown') +
					(imgLen === 0 ? '' :
						this._getButton('expimg') +
						this._getButton('maskimg')) +
					(nav.isPresto || localData ? '' :
						(imgLen === 0 || Cfg.preLoadImgs ? '' : this._getButton('preimg')) +
						(!isThr ? '' : this._getButton('savethr'))) +
					(!isThr || localData ? '' :
						this._getButton(Cfg.ajaxUpdThr && !aib.isArchived ? 'upd-on' : 'upd-off') +
						(nav.isSafari ? '' : this._getButton('audio-off'))) +
					(!aib.hasCatalog ? '' : this._getButton('catalog')) +
					this._getButton('enable') +
					(!isThr ? '' : `<span id="de-panel-info">
						<span id="de-panel-info-pcount" title="` +
							`${ Lng.panelBtn[Cfg.panelCounter !== 2 ? 'pcount' : 'pcountNotHid'][lang] }">` +
							`${ Thread.first.pcount }</span>
						<span id="de-panel-info-icount" title="${ Lng.panelBtn.imglen[lang] }">
							${ imgLen }</span>
						<span id="de-panel-info-acount" title="${ Lng.panelBtn.posters[lang] }"></span>
					</span>`) }
				</span>
			</div>
			${ Cfg.disabled ? '' : '<div id="de-wrapper-popup"></div><hr style="clear: both;">' }
		</div>`);
		this._el = $id('de-panel');
		this._el.addEventListener('click', this, true);
		this._el.addEventListener('mouseover', this);
		this._el.addEventListener('mouseout', this);
		this._buttons = $id('de-panel-buttons');
		this.isNew = true;
	},
	removeMain() {
		this._el.removeEventListener('click', this, true);
		this._el.removeEventListener('mouseover', this);
		this._el.removeEventListener('mouseout', this);
		delete this._pcountEl;
		delete this._icountEl;
		delete this._acountEl;
		$del($id('de-main'));
	},
	handleEvent(e) {
		if('isTrusted' in e && !e.isTrusted) {
			return;
		}
		let el = fixEventEl(e.target);
		if(el.tagName.toLowerCase() === 'svg') {
			el = el.parentNode;
		}
		switch(e.type) {
		case 'click':
			switch(el.id) {
			case 'de-panel-logo':
				if(Cfg.expandPanel && !$q('.de-win-active')) {
					$hide(this._buttons);
				}
				toggleCfg('expandPanel');
				return;
			case 'de-panel-cfg': toggleWindow('cfg', false); break;
			case 'de-panel-hid': toggleWindow('hid', false); break;
			case 'de-panel-fav': toggleWindow('fav', false); break;
			case 'de-panel-vid':
				toggleWindow('vid', false);
				this.isVidEnabled = !this.isVidEnabled;
				break;
			case 'de-panel-refresh': window.location.reload(); break;
			case 'de-panel-goup': scrollTo(0, 0); break;
			case 'de-panel-godown': scrollTo(0, docBody.scrollHeight || docBody.offsetHeight); break;
			case 'de-panel-expimg':
				isExpImg = !isExpImg;
				$del($q('.de-fullimg-center'));
				for(let post = Thread.first.op; post; post = post.next) {
					post.toggleImages(isExpImg, false);
				}
				break;
			case 'de-panel-preimg':
				isPreImg = !isPreImg;
				if(!e.ctrlKey) {
					for(const { el } of DelForm) {
						ContentLoader.preloadImages(el);
					}
				}
				break;
			case 'de-panel-maskimg':
				toggleCfg('maskImgs');
				updateCSS();
				break;
			case 'de-panel-upd-on':
			case 'de-panel-upd-warn':
			case 'de-panel-upd-off':
				updater.toggle();
				break;
			case 'de-panel-audio-on':
			case 'de-panel-audio-off':
				if(updater.toggleAudio(0)) {
					updater.enableUpdater();
					el.id = 'de-panel-audio-on';
				} else {
					el.id = 'de-panel-audio-off';
				}
				$del($q('.de-menu'));
				break;
			case 'de-panel-savethr': break;
			case 'de-panel-enable':
				toggleCfg('disabled');
				window.location.reload();
				break;
			default: return;
			}
			$pd(e);
			return;
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
				if(this._menu && this._menu.parentEl === el) {
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
			this._prepareToHide(fixEventEl(e.relatedTarget));
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
		// XXX nav.isPresto: keep in sync with updMachine._setUpdateStatus
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
