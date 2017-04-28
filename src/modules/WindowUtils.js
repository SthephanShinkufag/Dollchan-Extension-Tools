/*============================================================================================================
                                                WINDOW: UTILS
============================================================================================================*/

function updateWinZ(style) {
	if(style.zIndex < topWinZ) {
		style.zIndex = ++topWinZ;
	}
}

function makeDraggable(name, win, head) {
	head.addEventListener('mousedown', {
		_win: win,
		_wStyle: win.style,
		_oldX: 0,
		_oldY: 0,
		_X: 0,
		_Y: 0,
		_Z: 0,
		handleEvent(e) {
			if(!Cfg[name + 'WinDrag']) {
				return;
			}
			var curX = e.clientX,
				curY = e.clientY;
			switch(e.type) {
			case 'mousedown':
				this._oldX = curX;
				this._oldY = curY;
				this._X = Cfg[name + 'WinX'];
				this._Y = Cfg[name + 'WinY'];
				if(this._Z < topWinZ) {
					this._Z = this._wStyle.zIndex = ++topWinZ;
				}
				docBody.addEventListener('mousemove', this);
				docBody.addEventListener('mouseup', this);
				$pd(e);
				return;
			case 'mousemove':
				var maxX = Post.sizing.wWidth - this._win.offsetWidth,
					maxY = Post.sizing.wHeight - this._win.offsetHeight - 25,
					cr = this._win.getBoundingClientRect(),
					x = cr.left + curX - this._oldX,
					y = cr.top + curY - this._oldY;
				this._X = x >= maxX || curX > this._oldX && x > maxX - 20 ? 'right: 0' :
					x < 0 || curX < this._oldX && x < 20 ? 'left: 0' :
					'left: ' + x + 'px';
				this._Y = y >= maxY || curY > this._oldY && y > maxY - 20 ? 'bottom: 25px' :
					y < 0 || curY < this._oldY && y < 20 ? 'top: 0' :
					'top: ' + y + 'px';
				var width = this._wStyle.width;
				this._win.setAttribute('style', this._X + '; ' + this._Y +
					'; z-index: ' + this._Z + (width ? '; width: ' + width : ''));
				this._oldX = curX;
				this._oldY = curY;
				return;
			default: // mouseup
				docBody.removeEventListener('mousemove', this);
				docBody.removeEventListener('mouseup', this);
				saveCfg(name + 'WinX', this._X);
				saveCfg(name + 'WinY', this._Y);
			}
		}
	});
}

function WinResizer(name, dir, cfgName, win, target) {
	this.name = name;
	this.dir = dir;
	this.cfgName = cfgName;
	this.vertical = dir === 'top' || dir === 'bottom';
	this.win = win;
	this.wStyle = this.win.style;
	this.tStyle = target.style;
	$q('.de-resizer-' + dir, win).addEventListener('mousedown', this);
}
WinResizer.prototype = {
	handleEvent(e) {
		var val, x, y, cr = this.win.getBoundingClientRect(),
			maxX = Post.sizing.wWidth,
			maxY = Post.sizing.wHeight,
			width = this.wStyle.width,
			z = '; z-index: ' + this.wStyle.zIndex + (width ? '; width:' + width : '');
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
			case 'top': val = x + '; bottom: ' + (maxY - cr.bottom) + 'px' + z; break;
			case 'bottom': val = x + '; top: ' + cr.top + 'px' + z; break;
			case 'left': val = 'right: ' + (maxX - cr.right) + 'px; ' + y + z; break;
			case 'right': val = 'left: ' + cr.left + 'px; ' + y + z;
			}
			this.win.setAttribute('style', val);
			docBody.addEventListener('mousemove', this);
			docBody.addEventListener('mouseup', this);
			$pd(e);
			return;
		case 'mousemove':
			if(this.vertical) {
				val = e.clientY;
				this.tStyle.height = Math.max(
					parseInt(this.tStyle.height, 10) + (
						this.dir === 'top' ? cr.top - (val < 20 ? 0 : val) :
							(val > maxY - 45 ? maxY - 25 : val) - cr.bottom
				), 90) + 'px';
			} else {
				val = e.clientX;
				this.tStyle.width = Math.max(
					parseInt(this.tStyle.width, 10) + (
						this.dir === 'left' ? cr.left - (val < 20 ? 0 : val) :
							(val > maxX - 20 ? maxX : val) - cr.right
				), this.name === 'reply' ? 275 : 400) + 'px';
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
					cr.bottom > maxY - 26 ? 'bottom: 25px' : 'top: ' + cr.top + 'px');
			} else {
				saveCfg(this.name + 'WinX', cr.left < 1 ? 'left: 0' :
					cr.right > maxX - 1 ? 'right: 0' : 'left: ' + cr.left + 'px');
			}
			this.win.setAttribute('style', Cfg[this.name + 'WinX'] + '; ' + Cfg[this.name + 'WinY'] + z);
		}
	}
};

function toggleWindow(name, isUpd, data, noAnim) {
	var el, main = $id('de-main'),
		win = $id('de-win-' + name),
		isActive = win && win.classList.contains('de-win-active');
	if(isUpd && !isActive) {
		return;
	}
	if(!win) {
		var winAttr = (Cfg[name + 'WinDrag'] ?
			'de-win" style="' + Cfg[name + 'WinX'] + '; ' + Cfg[name + 'WinY'] :
			'de-win-fixed" style="right: 0; bottom: 25px'
		) + (name !== 'fav' ? '' : '; width: ' + Cfg.favWinWidth + 'px; ');
		var backColor = getComputedStyle(docBody).getPropertyValue('background-color');
		var bodyAttr = name === 'cfg' ? ' ' + aib.cReply : '" style="background-color: ' +
			(backColor !== 'transparent' ? backColor : '#EEE');
		win = $aBegin(main,
		`<div id="de-win-${ name }" class="${ winAttr }; display: none;">
			<div class="de-win-head">
				<span class="de-win-title">
					${ name === 'cfg' ? 'Dollchan Extension Tools' : Lng.panelBtn[name][lang] }
				</span>
				<span class="de-win-buttons">
					<svg class="de-btn-toggle"><use xlink:href="#de-symbol-win-arrow"/></svg>
					<svg class="de-btn-close"><use xlink:href="#de-symbol-win-close"/></svg>
				</span>
			</div>
			<div class="de-win-body${ bodyAttr }"></div>
			${ name !== 'fav' ? '' : `
				<div class="de-resizer de-resizer-left"></div>
				<div class="de-resizer de-resizer-right"></div>` }
		</div>`);
		if(name === 'fav') {
			new WinResizer('fav', 'left', 'favWinWidth', win, win);
			new WinResizer('fav', 'right', 'favWinWidth', win, win);
		}
		el = $q('.de-win-buttons', win);
		el.onmouseover = function(e) {
			switch(fixEventEl(e.target).classList[0]) {
			case 'de-btn-close': this.title = Lng.closeWindow[lang]; break;
			case 'de-btn-toggle': this.title =
				Cfg[name + 'WinDrag'] ? Lng.toPanel[lang] : Lng.makeDrag[lang];
			}
		};
		el.lastElementChild.onclick = () => toggleWindow(name, false);
		el.firstElementChild.onclick = e => {
			var width = win.style.width,
				w = width ? '; width: ' + width : '';
			toggleCfg(name + 'WinDrag');
			if(Cfg[name + 'WinDrag']) {
				win.classList.remove('de-win-fixed');
				win.classList.add('de-win');
				win.style.cssText = Cfg[name + 'WinX'] + '; ' + Cfg[name + 'WinY'] + w;
			} else {
				var temp = $q('.de-win-active.de-win-fixed', win.parentNode);
				if(temp) {
					toggleWindow(temp.id.substr(7), false);
				}
				win.classList.remove('de-win');
				win.classList.add('de-win-fixed');
				win.style.cssText = 'right: 0; bottom: 25px' + w;
			}
			updateWinZ(win.style);
		};
		makeDraggable(name, win, $q('.de-win-head', win));
	}
	updateWinZ(win.style);
	var remove = !isUpd && isActive;
	if(!remove && !win.classList.contains('de-win') &&
	  (el = $q('.de-win-active.de-win-fixed:not(#de-win-' + name + ')', win.parentNode)))
	{
		toggleWindow(el.id.substr(7), false);
	}
	var isAnim = !noAnim && !isUpd && Cfg.animation,
		body = $q('.de-win-body', win);
	if(isAnim && body.hasChildNodes()) {
		win.addEventListener('animationend', function aEvent() {
			this.removeEventListener('animationend', aEvent);
			showWindow(win, body, name, remove, data, Cfg.animation);
			win = body = name = remove = data = null;
		});
		win.classList.remove('de-win-open');
		win.classList.add('de-win-close');
	} else {
		showWindow(win, body, name, remove, data, isAnim);
	}
}

function showWindow(win, body, name, remove, data, isAnim) {
	body.innerHTML = '';
	if(remove) {
		win.classList.remove('de-win-active');
		win.classList.remove('de-win-close');
		$hide(win);
		if(!Cfg.expandPanel && !$q('.de-win-active')) {
			$hide($id('de-panel-buttons'));
		}
		return;
	}
	win.classList.add('de-win-active');
	if(!Cfg.expandPanel) {
		$show($id('de-panel-buttons'));
	}
	switch(name) {
	case 'fav':
		if(data) {
			showFavoritesWindow(body, data);
			break;
		}
		readFavorites().then(fav => {
			showFavoritesWindow(body, fav);
			$show(win);
			if(isAnim) {
				win.classList.add('de-win-open');
			}
		});
		return;
	case 'cfg': cfgWindow.init(body); break;
	case 'hid': showHiddenWindow(body); break;
	case 'vid': showVideosWindow(body);
	}
	$show(win);
	if(isAnim) {
		win.classList.add('de-win-open');
	}
}
