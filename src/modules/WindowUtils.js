/* ==[ WindowUtils.js ]=======================================================================================
                                                WINDOW: UTILS
=========================================================================================================== */

function updateWinZ(style) {
	if(style.zIndex < topWinZ) {
		style.zIndex = ++topWinZ;
	}
}

function makeDraggable(name, win, head) {
	head.addEventListener('mousedown', {
		_oldX   : 0,
		_oldY   : 0,
		_win    : win,
		_wStyle : win.style,
		_X      : 0,
		_Y      : 0,
		_Z      : 0,
		handleEvent(e) {
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
				docBody.addEventListener('mouseleave', this);
				docBody.addEventListener('mousemove', this);
				docBody.addEventListener('mouseup', this);
				$pd(e);
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
				docBody.removeEventListener('mouseleave', this);
				docBody.removeEventListener('mousemove', this);
				docBody.removeEventListener('mouseup', this);
				saveCfg(name + 'WinX', this._X);
				saveCfg(name + 'WinY', this._Y);
			}
		}
	});
}

class WinResizer {
	constructor(name, dir, cfgName, win, target) {
		this.name = name;
		this.dir = dir;
		this.cfgName = cfgName;
		this.vertical = dir === 'top' || dir === 'bottom';
		this.win = win;
		this.wStyle = this.win.style;
		this.tStyle = target.style;
		$q('.de-resizer-' + dir, win).addEventListener('mousedown', this);
	}
	handleEvent(e) {
		let val, x, y;
		const { wWidth: maxX, wHeight: maxY } = Post.sizing;
		const { width } = this.wStyle;
		const cr = this.win.getBoundingClientRect();
		const z = `; z-index: ${ this.wStyle.zIndex }${ width ? '; width:' + width : '' }`;
		switch(e.type) {
		case 'mousedown':
			if(this.win.classList.contains('de-win-fixed')) {
				x = 'right: 0';
				y = 'bottom: 25px';
			} else {
				x = Cfg[this.name + 'WinX'];
				y = Cfg[this.name + 'WinY'];
			}
			switch(this.dir) {
			case 'top': val = `${ x }; bottom: ${ maxY - cr.bottom }px${ z }`; break;
			case 'bottom': val = `${ x }; top: ${ cr.top }px${ z }`; break;
			case 'left': val = `right: ${ maxX - cr.right }px; ${ y + z }`; break;
			case 'right': val = `left: ${ cr.left }px; ${ y + z }`;
			}
			this.win.setAttribute('style', val);
			docBody.addEventListener('mousemove', this);
			docBody.addEventListener('mouseup', this);
			$pd(e);
			return;
		case 'mousemove':
			if(this.vertical) {
				val = e.clientY;
				this.tStyle.setProperty('height', Math.max(parseInt(this.tStyle.height, 10) + (
					this.dir === 'top' ? cr.top - (val < 20 ? 0 : val) :
					(val > maxY - 45 ? maxY - 25 : val) - cr.bottom
				), 90) + 'px', 'important');
			} else {
				val = e.clientX;
				this.tStyle.setProperty('width', Math.max(parseInt(this.tStyle.width, 10) + (
					this.dir === 'left' ? cr.left - (val < 20 ? 0 : val) :
					(val > maxX - 20 ? maxX : val) - cr.right
				), this.name === 'reply' ? 275 : 400) + 'px', 'important');
			}
			return;
		default: // mouseup
			docBody.removeEventListener('mousemove', this);
			docBody.removeEventListener('mouseup', this);
			saveCfg(this.cfgName, parseInt(this.vertical ? this.tStyle.height : this.tStyle.width, 10));
			if(this.win.classList.contains('de-win-fixed')) {
				this.win.setAttribute('style', 'right: 0; bottom: 25px' + z);
				return;
			}
			if(this.vertical) {
				saveCfg(this.name + 'WinY', cr.top < 1 ? 'top: 0' :
					cr.bottom > maxY - 26 ? 'bottom: 25px' : `top: ${ cr.top }px`);
			} else {
				saveCfg(this.name + 'WinX', cr.left < 1 ? 'left: 0' :
					cr.right > maxX - 1 ? 'right: 0' : `left: ${ cr.left }px`);
			}
			this.win.setAttribute('style', Cfg[this.name + 'WinX'] + '; ' + Cfg[this.name + 'WinY'] + z);
		}
	}
}

function toggleWindow(name, isUpd, data, noAnim) {
	let el, win = $id('de-win-' + name);
	const isActive = win && win.classList.contains('de-win-active');
	if(isUpd && !isActive) {
		return;
	}
	if(!win) {
		const winAttr = (Cfg[name + 'WinDrag'] ?
			`de-win" style="${ Cfg[name + 'WinX'] }; ${ Cfg[name + 'WinY'] }` :
			'de-win-fixed" style="right: 0; bottom: 25px'
		) + (name !== 'fav' ? '' : `; width: ${ Cfg.favWinWidth }px; `);
		win = $aBegin($id('de-main'), `<div id="de-win-${ name }" class="${ winAttr }; display: none;">
			<div class="de-win-head">
				<span class="de-win-title">
					${ name === 'cfg' ? 'Dollchan Extension Tools' : Lng.panelBtn[name][lang] }
				</span>
				<span class="de-win-buttons">
					<svg class="de-btn-toggle"><use xlink:href="#de-symbol-win-arrow"/></svg>
					<svg class="de-btn-close"><use xlink:href="#de-symbol-win-close"/></svg>
				</span>
			</div>
			<div class="de-win-body"></div>
			${ name !== 'fav' ? '' : `
				<div class="de-resizer de-resizer-left"></div>
				<div class="de-resizer de-resizer-right"></div>` }
		</div>`);
		const winBody = $q('.de-win-body', win);
		if(name === 'cfg') {
			winBody.className = 'de-win-body ' + aib.cReply;
		} else {
			setTimeout(() => {
				const backColor = getComputedStyle(docBody).getPropertyValue('background-color');
				winBody.style.backgroundColor = backColor !== 'transparent' ? backColor : '#EEE';
			}, 100);
		}
		if(name === 'fav') {
			new WinResizer('fav', 'left', 'favWinWidth', win, win);
			new WinResizer('fav', 'right', 'favWinWidth', win, win);
		}
		el = $q('.de-win-buttons', win);
		el.onmouseover = ({ target }) => {
			const el = target.parentNode;
			switch(fixEventEl(target).classList[0]) {
			case 'de-btn-close': el.title = Lng.closeWindow[lang]; break;
			case 'de-btn-toggle': el.title = Cfg[name + 'WinDrag'] ? Lng.toPanel[lang] : Lng.makeDrag[lang];
			}
		};
		el.lastElementChild.onclick = () => toggleWindow(name, false);
		el.firstElementChild.onclick = () => {
			toggleCfg(name + 'WinDrag');
			const isDrag = Cfg[name + 'WinDrag'];
			if(!isDrag) {
				const temp = $q('.de-win-active.de-win-fixed', win.parentNode);
				if(temp) {
					toggleWindow(temp.id.substr(7), false);
				}
			}
			win.classList.toggle('de-win', isDrag);
			win.classList.toggle('de-win-fixed', !isDrag);
			const { width } = win.style;
			win.style.cssText = `${ isDrag ? `${ Cfg[name + 'WinX'] }; ${ Cfg[name + 'WinY'] }` :
				'right: 0; bottom: 25px' }${ width ? '; width: ' + width : '' }`;
			updateWinZ(win.style);
		};
		makeDraggable(name, win, $q('.de-win-head', win));
	}
	updateWinZ(win.style);
	let isRemove = !isUpd && isActive;
	if(!isRemove && !win.classList.contains('de-win') &&
		(el = $q(`.de-win-active.de-win-fixed:not(#de-win-${ name })`, win.parentNode))
	) {
		toggleWindow(el.id.substr(7), false);
	}
	const isAnim = !noAnim && !isUpd && Cfg.animation;
	let body = $q('.de-win-body', win);
	if(isAnim && body.hasChildNodes()) {
		win.addEventListener('animationend', function aEvent(e) {
			e.target.removeEventListener('animationend', aEvent);
			showWindow(win, body, name, isRemove, data, Cfg.animation);
			win = body = name = isRemove = data = null;
		});
		win.classList.remove('de-win-open');
		win.classList.add('de-win-close');
	} else {
		showWindow(win, body, name, isRemove, data, isAnim);
	}
}

function showWindow(win, body, name, isRemove, data, isAnim) {
	body.innerHTML = '';
	win.classList.toggle('de-win-active', !isRemove);
	if(isRemove) {
		win.classList.remove('de-win-close');
		$hide(win);
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
			showFavoritesWindow(body, data);
			break;
		}
		readFavorites().then(favObj => {
			showFavoritesWindow(body, favObj);
			$show(win);
			if(isAnim) {
				win.classList.add('de-win-open');
			}
		});
		return;
	case 'cfg': CfgWindow.initCfgWindow(body); break;
	case 'hid': showHiddenWindow(body); break;
	case 'vid': showVideosWindow(body);
	}
	$show(win);
	if(isAnim) {
		win.classList.add('de-win-open');
	}
}
