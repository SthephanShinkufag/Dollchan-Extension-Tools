/* ==[ WindowUtils.js ]=======================================================================================
                                                WINDOW: UTILS
=========================================================================================================== */

function updateWinZ(winEl) {
	const { style } = winEl;
	if(style.zIndex < topWinZ) {
		style.zIndex = ++topWinZ;
	}
}

function makeDraggable(name, winEl, headEl) {
	headEl.addEventListener('mousedown', {
		_oldX   : 0,
		_oldY   : 0,
		_win    : winEl,
		_wStyle : winEl.style,
		_X      : 0,
		_Y      : 0,
		_Z      : 0,
		async handleEvent(e) {
			if(!Cfg[name + 'WinDrag']) {
				return;
			}
			const { clientX: curX, clientY: curY } = e;
			switch(e.type) {
			case 'mousedown':
				this._oldX = curX;
				this._oldY = curY;
				this._X = Cfg[name + 'WinX'];
				this._Y = Cfg[name + 'WinY'];
				if(this._Z < topWinZ) {
					this._Z = this._wStyle.zIndex = ++topWinZ;
				}
				['mouseleave', 'mousemove', 'mouseup'].forEach(e => doc.body.addEventListener(e, this));
				e.preventDefault();
				return;
			case 'mousemove': {
				const maxX = Post.sizing.wWidth - this._win.offsetWidth;
				const maxY = Post.sizing.wHeight - this._win.offsetHeight - 25;
				const cr = this._win.getBoundingClientRect();
				const x = cr.left + curX - this._oldX;
				const y = cr.top + curY - this._oldY;
				this._X = x >= maxX || curX > this._oldX && x > maxX - 20 ? 'right: 0' :
					x < 0 || curX < this._oldX && x < 20 ? 'left: 0' :
					`left: ${ x }px`;
				this._Y = y >= maxY || curY > this._oldY && y > maxY - 20 ? 'bottom: 25px' :
					y < 0 || curY < this._oldY && y < 20 ? 'top: 0' :
					`top: ${ y }px`;
				const { width } = this._wStyle;
				this._win.setAttribute('style', `${ this._X }; ${ this._Y }; z-index: ${ this._Z }${
					width ? '; width: ' + width : '' }`);
				this._oldX = curX;
				this._oldY = curY;
				return;
			}
			case 'mouseleave':
			case 'mouseup':
				['mouseleave', 'mousemove', 'mouseup'].forEach(e => doc.body.removeEventListener(e, this));
				await CfgSaver.save(name + 'WinX', this._X, name + 'WinY', this._Y);
			}
		}
	});
}

class WinResizer {
	constructor(name, direction, cfgName, winEl, targetEl) {
		this.name = name;
		this.direction = direction;
		this.cfgName = cfgName;
		this.vertical = direction === 'top' || direction === 'bottom';
		this.winEl = winEl;
		this.wStyle = this.winEl.style;
		this.tStyle = targetEl.style;
		$q('.de-resizer-' + direction, winEl).addEventListener('mousedown', this);
	}
	async handleEvent(e) {
		let val, x, y;
		const { wWidth: maxX, wHeight: maxY } = Post.sizing;
		const { width } = this.wStyle;
		const cr = this.winEl.getBoundingClientRect();
		const z = `; z-index: ${ this.wStyle.zIndex }${ width ? '; width:' + width : '' }`;
		switch(e.type) {
		case 'mousedown':
			if(this.winEl.classList.contains('de-win-fixed')) {
				x = 'right: 0';
				y = 'bottom: 25px';
			} else {
				x = Cfg[this.name + 'WinX'];
				y = Cfg[this.name + 'WinY'];
			}
			switch(this.direction) {
			case 'top': val = `${ x }; bottom: ${ maxY - cr.bottom }px${ z }`; break;
			case 'bottom': val = `${ x }; top: ${ cr.top }px${ z }`; break;
			case 'left': val = `right: ${ maxX - cr.right }px; ${ y + z }`; break;
			case 'right': val = `left: ${ cr.left }px; ${ y + z }`;
			}
			this.winEl.setAttribute('style', val);
			['mousemove', 'mouseup'].forEach(e => doc.body.addEventListener(e, this));
			e.preventDefault();
			return;
		case 'mousemove':
			if(this.vertical) {
				val = e.clientY;
				this.tStyle.setProperty('height', Math.max(parseInt(this.tStyle.height, 10) + (
					this.direction === 'top' ? cr.top - (val < 20 ? 0 : val) :
					(val > maxY - 45 ? maxY - 25 : val) - cr.bottom
				), 90) + 'px', 'important');
			} else {
				val = e.clientX;
				this.tStyle.setProperty('width', Math.max(parseInt(this.tStyle.width, 10) + (
					this.direction === 'left' ? cr.left - (val < 20 ? 0 : val) :
					(val > maxX - 20 ? maxX : val) - cr.right
				), this.name === 'reply' ? 275 : 400) + 'px', 'important');
			}
			return;
		default: // mouseup
			['mousemove', 'mouseup'].forEach(e => doc.body.removeEventListener(e, this));
			await CfgSaver.save(this.cfgName,
				parseInt(this.vertical ? this.tStyle.height : this.tStyle.width, 10));
			if(this.winEl.classList.contains('de-win-fixed')) {
				this.winEl.setAttribute('style', 'right: 0; bottom: 25px' + z);
				return;
			}
			if(this.vertical) {
				await CfgSaver.save(this.name + 'WinY', cr.top < 1 ? 'top: 0' :
					cr.bottom > maxY - 26 ? 'bottom: 25px' : `top: ${ cr.top }px`);
			} else {
				await CfgSaver.save(this.name + 'WinX', cr.left < 1 ? 'left: 0' :
					cr.right > maxX - 1 ? 'right: 0' : `left: ${ cr.left }px`);
			}
			this.winEl.setAttribute('style', Cfg[this.name + 'WinX'] + '; ' + Cfg[this.name + 'WinY'] + z);
		}
	}
}

function toggleWindow(name, isUpdate, data, noAnim) {
	let el;
	let winEl = $id('de-win-' + name);
	const isActive = winEl?.classList.contains('de-win-active');
	if(isUpdate && !isActive) {
		return;
	}
	if(!winEl) {
		const winAttr = (Cfg[name + 'WinDrag'] ?
			`de-win" style="${ Cfg[name + 'WinX'] }; ${ Cfg[name + 'WinY'] }` :
			'de-win-fixed" style="right: 0; bottom: 25px'
		) + (name !== 'fav' ? '' : `; width: ${ Cfg.favWinWidth }px; `);
		winEl = $aBegin($id('de-main'), `<div id="de-win-${ name }" class="${ winAttr }; display: none;">
			<div class="de-win-head">
				<span class="de-win-title">
					${ name === 'cfg' ? 'Dollchan Extension Tools' : Lng.panelBtn[name][lang] }
				</span>
				<span class="de-win-buttons">
					<svg class="de-win-btn-toggle"><use xlink:href="#de-symbol-win-arrow"/></svg>
					<svg class="de-win-btn-close"><use xlink:href="#de-symbol-win-close"/></svg>
				</span>
			</div>
			<div class="de-win-body"></div>
			${ name !== 'fav' ? '' : `
				<div class="de-resizer de-resizer-left"></div>
				<div class="de-resizer de-resizer-right"></div>` }
		</div>`);
		const winBody = $q('.de-win-body', winEl);
		if(name === 'cfg') {
			winBody.className = 'de-win-body ' + aib.cReply;
		} else {
			setTimeout(() => {
				const backColor = getComputedStyle(doc.body).getPropertyValue('background-color');
				winBody.style.backgroundColor = backColor !== 'transparent' ? backColor : '#EEE';
			}, 100);
		}
		if(name === 'fav') {
			new WinResizer('fav', 'left', 'favWinWidth', winEl, winEl);
			new WinResizer('fav', 'right', 'favWinWidth', winEl, winEl);
		}
		el = $q('.de-win-buttons', winEl);
		el.onmouseover = e => {
			const el = e.target;
			switch(el.classList[0]) {
			case 'de-win-btn-close': el.parentNode.title = Lng.closeWindow[lang]; break;
			case 'de-win-btn-toggle':
				el.parentNode.title = Cfg[name + 'WinDrag'] ? Lng.toPanel[lang] : Lng.makeDrag[lang];
			}
		};
		el.lastElementChild.onclick = () => toggleWindow(name, false);
		$q('.de-win-btn-toggle', el).onclick = async () => {
			await toggleCfg(name + 'WinDrag');
			const isDrag = Cfg[name + 'WinDrag'];
			if(!isDrag) {
				const temp = $q('.de-win-active.de-win-fixed', winEl.parentNode);
				if(temp) {
					toggleWindow(temp.id.substr(7), false);
				}
			}
			winEl.classList.toggle('de-win', isDrag);
			winEl.classList.toggle('de-win-fixed', !isDrag);
			const { width } = winEl.style;
			winEl.style.cssText = `${ isDrag ? `${ Cfg[name + 'WinX'] }; ${ Cfg[name + 'WinY'] }` :
				'right: 0; bottom: 25px' }${ width ? '; width: ' + width : '' }`;
			updateWinZ(winEl);
		};
		makeDraggable(name, winEl, $q('.de-win-head', winEl));
	}
	updateWinZ(winEl);
	let isRemove = !isUpdate && isActive;
	if(!isRemove && !winEl.classList.contains('de-win') &&
		(el = $q(`.de-win-active.de-win-fixed:not(#de-win-${ name })`, winEl.parentNode))
	) {
		toggleWindow(el.id.substr(7), false);
	}
	const isAnim = !noAnim && !isUpdate && Cfg.animation;
	let winBody = $q('.de-win-body', winEl);
	if(isAnim && winBody.hasChildNodes()) {
		winEl.addEventListener('animationend', function aEvent(e) {
			e.target.removeEventListener('animationend', aEvent);
			showWindow(winEl, winBody, name, isRemove, data, Cfg.animation);
			winEl = winBody = name = isRemove = data = null;
		});
		winEl.classList.remove('de-win-open');
		winEl.classList.add('de-win-close');
	} else {
		showWindow(winEl, winBody, name, isRemove, data, isAnim);
	}
}

function showWindow(winEl, winBody, name, isRemove, data, isAnim) {
	winBody.innerHTML = '';
	winEl.classList.toggle('de-win-active', !isRemove);
	if(isRemove) {
		winEl.classList.remove('de-win-close');
		$hide(winEl);
		if(!Cfg.expandPanel && !$q('.de-win-active')) {
			$hide($id('de-panel-buttons'));
		}
		return;
	}
	if(!Cfg.expandPanel) {
		$show($id('de-panel-buttons'));
	}
	switch(name) {
	case 'fav':
		if(data) {
			showFavoritesWindow(winBody, data);
			break;
		}
		readFavorites().then(favObj => {
			showFavoritesWindow(winBody, favObj);
			$show(winEl);
			if(isAnim) {
				winEl.classList.add('de-win-open');
			}
		});
		return;
	case 'cfg': CfgWindow.initCfgWindow(winBody); break;
	case 'hid': showHiddenWindow(winBody); break;
	case 'vid': showVideosWindow(winBody);
	}
	$show(winEl);
	if(isAnim) {
		winEl.classList.add('de-win-open');
	}
}
