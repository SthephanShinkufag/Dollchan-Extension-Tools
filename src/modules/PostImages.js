/* ==[ PostImages.js ]========================================================================================
                                                    IMAGES
               images expanding (in post / by center), navigate buttons, image-links embedding
=========================================================================================================== */

// Navigation buttons for expanding of images/videos by center
class ImagesNavigation {
	constructor(viewerObj) {
		const btns = $bEnd(docBody, `<div style="display: none;">
			<div id="de-img-btn-prev" class="de-img-btn" de-title="${ Lng.prevImg[lang] }">
				<svg><use xlink:href="#de-symbol-img-btn-arrow"/></svg></div>
			<div id="de-img-btn-next" class="de-img-btn" de-title="${ Lng.nextImg[lang] }">
				<svg><use xlink:href="#de-symbol-img-btn-arrow"/></svg></div>
			<div id="de-img-btn-auto" class="de-img-btn de-img-btn-none" title="${ Lng.autoPlayOn[lang] }">
				<svg><use xlink:href="#de-symbol-img-btn-auto"/></svg></div></div>`);
		[this.prevBtn, this.nextBtn, this.autoBtn] = [...btns.children];
		this._btns = btns;
		this._btnsStyle = btns.style;
		this._hidden = true;
		this._hideTmt = 0;
		this._oldX = -1;
		this._oldY = -1;
		this._viewer = viewerObj;
		doc.defaultView.addEventListener('mousemove', this);
		btns.addEventListener('mouseover', this);
	}
	handleEvent(e) {
		switch(e.type) {
		case 'mousemove': {
			const { clientX: curX, clientY: curY } = e;
			if(this._oldX !== curX || this._oldY !== curY) {
				this._oldX = curX;
				this._oldY = curY;
				this.show();
			}
			return;
		}
		case 'mouseover':
			if(!this.hasEvents) {
				this.hasEvents = true;
				this._btns.addEventListener('mouseout', this);
				this._btns.addEventListener('click', this);
			}
			if(!this._hidden) {
				clearTimeout(this._hideTmt);
				KeyEditListener.setTitle(this.prevBtn, 4);
				KeyEditListener.setTitle(this.nextBtn, 17);
			}
			return;
		case 'mouseout': this._setHideTmt(); return;
		case 'click': {
			const parent = e.target.parentNode;
			const viewer = this._viewer;
			switch(parent.id) {
			case 'de-img-btn-prev': viewer.navigate(false); return;
			case 'de-img-btn-next': viewer.navigate(true); return;
			case 'de-img-btn-auto':
				this.autoBtn.title = (viewer.isAutoPlay = !viewer.isAutoPlay) ?
					Lng.autoPlayOff[lang] : Lng.autoPlayOn[lang];
				viewer.toggleVideoLoop();
				parent.classList.toggle('de-img-btn-auto-on');
			}
		}
		}
	}
	hide() {
		this._btnsStyle.display = 'none';
		this._hidden = true;
		this._oldX = this._oldY = -1;
	}
	remove() {
		$del(this._btns);
		doc.defaultView.removeEventListener('mousemove', this);
		clearTimeout(this._hideTmt);
	}
	show() {
		if(this._hidden) {
			this._btnsStyle.removeProperty('display');
			this._hidden = false;
			this._setHideTmt();
		}
	}

	_setHideTmt() {
		clearTimeout(this._hideTmt);
		this._hideTmt = setTimeout(() => this.hide(), 2e3);
	}
}

// Expanding of images/videos BY CENTER: resizing, moving, opening, closing
class AttachmentViewer {
	constructor(data) {
		this.data = null;
		this.isAutoPlay = false;
		this._data = null;
		this._elStyle = null;
		this._fullEl = null;
		this._height = 0;
		this._minSize = 0;
		this._moved = false;
		this._obj = null;
		this._oldL = 0;
		this._oldT = 0;
		this._oldX = 0;
		this._oldY = 0;
		this._width = 0;
		this._show(data);
	}
	close(e) {
		if(this.hasOwnProperty('_btns')) {
			this._btns.remove();
		}
		this._remove(e);
	}
	handleEvent(e) {
		switch(e.type) {
		case 'mousedown':
			if(this.data.isVideo && ExpandableMedia.isControlClick(e)) {
				return;
			}
			this._oldX = e.clientX;
			this._oldY = e.clientY;
			docBody.addEventListener('mousemove', this, true);
			docBody.addEventListener('mouseup', this, true);
			break;
		case 'mousemove': {
			const { clientX: curX, clientY: curY } = e;
			if(curX !== this._oldX || curY !== this._oldY) {
				this._oldL = parseInt(this._elStyle.left, 10) + curX - this._oldX;
				this._elStyle.left = this._oldL + 'px';
				this._oldT = parseInt(this._elStyle.top, 10) + curY - this._oldY;
				this._elStyle.top = this._oldT + 'px';
				this._oldX = curX;
				this._oldY = curY;
				this._moved = true;
			}
			return;
		}
		case 'mouseup':
			docBody.removeEventListener('mousemove', this, true);
			docBody.removeEventListener('mouseup', this, true);
			return;
		case 'click': {
			const el = e.target;
			if(this.data.isVideo && ExpandableMedia.isControlClick(e) ||
				el.tagName !== 'IMG' &&
				el.tagName !== 'VIDEO' &&
				!el.classList.contains('de-fullimg-wrap') &&
				el.target.className !== 'de-fullimg-load'
			) {
				return;
			}
			if(e.button === 0) {
				if(this._moved) {
					this._moved = false;
				} else {
					this.close(e);
					Attachment.viewer = null;
				}
				e.stopPropagation();
				break;
			}
			return;
		}
		case 'mousewheel':
			this._handleWheelEvent(e.clientX, e.clientY,
				-1 / 40 * ('wheelDeltaY' in e ? e.wheelDeltaY : e.wheelDelta));
			break;
		default: // 'wheel' event
			this._handleWheelEvent(e.clientX, e.clientY, e.deltaY);
		}
		$pd(e);
	}
	navigate(isForward, isVideoOnly = false) {
		let { data } = this;
		data.cancelWebmLoad(this._fullEl);
		do {
			data = data.getFollow(isForward);
		} while(data && !data.isVideo && !data.isImage || isVideoOnly && data.isImage);
		if(data) {
			this.update(data, true, null);
			data.post.selectAndScrollTo(data.post.images.first.el);
		}
	}
	toggleVideoLoop() {
		if(this.data.isVideo) {
			const el = this._fullEl.firstElementChild;
			if(this.isAutoPlay) {
				el.removeAttribute('loop');
			} else {
				el.setAttribute('loop', '');
			}
		}
	}
	update(data, showButtons, e) {
		this._remove(e);
		this._show(data, showButtons);
	}

	get _btns() {
		const value = new ImagesNavigation(this);
		Object.defineProperty(this, '_btns', { value });
		return value;
	}
	get _zoomFactor() {
		const value = 1 + (Cfg.zoomFactor / 100);
		Object.defineProperty(this, '_zoomFactor', { value });
		return value;
	}
	_handleWheelEvent(clientX, clientY, delta) {
		if(delta === 0) {
			return;
		}
		let width, height;
		const { _width: oldW, _height: oldH } = this;
		if(delta > 0) {
			width = oldW / this._zoomFactor;
			height = oldH / this._zoomFactor;
			if(width <= this._minSize && height <= this._minSize) {
				return;
			}
		} else {
			width = oldW * this._zoomFactor;
			height = oldH * this._zoomFactor;
		}
		this._width = width;
		this._height = height;
		this._elStyle.width = width + 'px';
		this._elStyle.height = height + 'px';
		this._oldL = parseInt(clientX - (width / oldW) * (clientX - this._oldL), 10);
		this._elStyle.left = this._oldL + 'px';
		this._oldT = parseInt(clientY - (height / oldH) * (clientY - this._oldT), 10);
		this._elStyle.top = this._oldT + 'px';
	}
	_remove(e) {
		const { data } = this;
		data.cancelWebmLoad(this._fullEl);
		if(data.inPview && data.post.isSticky) {
			data.post.setSticky(false);
		}
		$del(this._obj);
		if(e && data.inPview) {
			data.sendCloseEvent(e, false);
		}
	}
	_resize(el) {
		if(el !== this._fullEl) {
			return;
		}
		let [width, height, minSize] = this.data.computeFullSize();
		this._minSize = minSize ? minSize / this._zoomFactor : Cfg.minImgSize;
		if(Post.sizing.wWidth - this._oldL - this._width < 5 ||
			Post.sizing.wHeight - this._oldT - this._height < 5
		) {
			return;
		}
		const cPointX = this._oldL + this._width / 2;
		const cPointY = this._oldT + this._height / 2;
		const maxWidth = (Post.sizing.wWidth - cPointX - 2) * 2;
		const maxHeight = (Post.sizing.wHeight - cPointY - 2) * 2;
		if(width > maxWidth || height > maxHeight) {
			const ar = width / height;
			if(ar > maxWidth / maxHeight) {
				width = maxWidth;
				height = width / ar;
			} else {
				height = maxHeight;
				width = height * ar;
			}
			if(minSize && width < minSize || height < minSize) {
				this._minSize = Math.max(width, height);
			}
		}
		this._width = width;
		this._height = height;
		this._elStyle.width = width + 'px';
		this._elStyle.height = height + 'px';
		this._elStyle.left = `${ this._oldL = parseInt(cPointX - width / 2, 10) }px`;
		this._elStyle.top = `${ this._oldT = parseInt(cPointY - height / 2, 10) }px`;
	}
	_rotate(el) {
		if(el !== this._fullEl) {
			return;
		}
		const { _width, _height } = this;
		this._width = _height;
		this._height = _width;
		this._elStyle.width = _height + 'px';
		this._elStyle.height = _width + 'px';
		const halfWidth = _width / 2;
		const halfHeight = _height / 2;
		this._elStyle.left = `${ this._oldL = parseInt(this._oldL + halfWidth - halfHeight, 10) }px`;
		this._elStyle.top = `${ this._oldT = parseInt(this._oldT + halfHeight - halfWidth, 10) }px`;
	}
	_show(data) {
		const [width, height, minSize] = data.computeFullSize();
		this._fullEl = data.getFullObject(false, el => this._resize(el), el => this._rotate(el));
		this._width = width;
		this._height = height;
		this._minSize = minSize ? minSize / this._zoomFactor : Cfg.minImgSize;
		this._oldL = (Post.sizing.wWidth - width) / 2 - 1;
		this._oldT = (Post.sizing.wHeight - height) / 2 - 1;
		const obj = $add(`<div class="de-fullimg-center" style="top:${
			this._oldT - (Cfg.imgInfoLink ? 11 : 0) }px; left:${
			this._oldL }px; width:${ width }px; height:${ height }px; display: block"></div>`);
		(data.isImage ? $aBegin(obj, `<a class="de-fullimg-wrap-link" href="${ data.src }"></a>`) : obj)
			.appendChild(this._fullEl);
		this._elStyle = obj.style;
		this.data = data;
		this._obj = obj;
		obj.addEventListener('onwheel' in obj ? 'wheel' : 'mousewheel', this, true);
		obj.addEventListener('mousedown', this, true);
		obj.addEventListener('click', this, true);
		if(data.inPview && !data.post.isSticky) {
			this.data.post.setSticky(true);
		}
		if(!data.inPview) {
			this._btns.show();
			if(data.isVideo) {
				this._btns.autoBtn.classList.remove('de-img-btn-none');
			} else {
				this._btns.autoBtn.classList.add('de-img-btn-none');
			}
		} else if(this.hasOwnProperty('_btns')) {
			this._btns.hide();
		}
		data.post.thr.form.el.appendChild(obj);
		this.toggleVideoLoop();
	}
}

// Post images/videos main initialization
class ExpandableMedia {
	constructor(post, el, prev) {
		this.el = el;
		this.expanded = false;
		this.next = null;
		this.post = post;
		this.prev = prev;
		this._fullEl = null;
		this._webmTitleLoad = null;
		if(prev) {
			prev.next = this;
		}
	}
	static isControlClick(e) {
		return Cfg.webmControl && e.clientY > (e.target.getBoundingClientRect().bottom - 40);
	}
	get height() {
		return (this._size || [-1, -1])[1];
	}
	get inPview() {
		const value = this.post instanceof Pview;
		Object.defineProperty(this, 'inPview', { value });
		return value;
	}
	get isImage() {
		const value = /\.jpe?g|\.png|\.gif/i.test(this.src) ||
			(this.src.startsWith('blob:') && !this.el.hasAttribute('de-video'));
		Object.defineProperty(this, 'isImage', { value });
		return value;
	}
	get isVideo() {
		const value = /\.(?:webm|mp4|ogv)(?:&|$)/i.test(this.src) ||
			(this.src.startsWith('blob:') && this.el.hasAttribute('de-video'));
		Object.defineProperty(this, 'isVideo', { value });
		return value;
	}
	get src() {
		const value = this._getImageSrc();
		Object.defineProperty(this, 'src', { value });
		return value;
	}
	get width() {
		return (this._size || [-1, -1])[0];
	}
	cancelWebmLoad(fullEl) {
		if(this.isVideo) {
			const videoEl = fullEl.firstElementChild;
			videoEl.pause();
			videoEl.removeAttribute('src');
			videoEl.load();
		}
		if(this._webmTitleLoad) {
			this._webmTitleLoad.cancel();
			this._webmTitleLoad = null;
		}
	}
	collapse(e) {
		if(e && this.isVideo && ExpandableMedia.isControlClick(e)) {
			return;
		}
		this.cancelWebmLoad(this._fullEl);
		this.expanded = false;
		$del(this._fullEl);
		this._fullEl = null;
		$show(this.el.parentNode);
		$del((aib.hasPicWrap ? this._getImageParent() : this.el.parentNode).nextSibling);
		if(e) {
			$pd(e);
			if(this.inPview) {
				this.sendCloseEvent(e, true);
			}
		}
	}
	computeFullSize() {
		if(!this._size) {
			return this._getThumbSize();
		}
		let [width, height] = this._size;
		if(Cfg.resizeDPI) {
			width /= Post.sizing.dPxRatio;
			height /= Post.sizing.dPxRatio;
		}
		const minSize = this.isVideo ? Math.max(Cfg.minImgSize, Cfg.minWebmWidth) : Cfg.minImgSize;
		if(width < minSize && height < minSize) {
			const ar = width / height;
			if(width > height) {
				width = minSize;
				height = width / ar;
			} else {
				height = minSize;
				width = height * ar;
			}
		}
		if(Cfg.resizeImgs) {
			const maxWidth = Post.sizing.wWidth - 2;
			const maxHeight = Post.sizing.wHeight - (Cfg.imgInfoLink ? 24 : 2);
			if(width > maxWidth || height > maxHeight) {
				const ar = width / height;
				if(ar > maxWidth / maxHeight) {
					width = maxWidth;
					height = width / ar;
				} else {
					height = maxHeight;
					width = height * ar;
				}
				if(width < minSize || height < minSize) {
					return [width, height, Math.max(width, height)];
				}
			}
		}
		return [width, height, null];
	}
	expand(inPost, e) {
		if(e && !e.bubbles) {
			return;
		}
		if(!inPost) {
			if(Attachment.viewer) {
				if(Attachment.viewer.data === this) {
					Attachment.viewer.close(e);
					Attachment.viewer = null;
					return;
				}
				Attachment.viewer.update(this, e);
			} else {
				Attachment.viewer = new AttachmentViewer(this);
			}
			return;
		}
		this.expanded = true;
		const { el } = this;
		(aib.hasPicWrap ? this._getImageParent() : el.parentNode).insertAdjacentHTML('afterend',
			'<div class="de-fullimg-after"></div>');
		this._fullEl = this.getFullObject(true, null, null);
		this._fullEl.addEventListener('click', e => this.collapse(e));
		$hide(el.parentNode);
		$after(el.parentNode, this._fullEl);
	}
	getFollow(isForward) {
		const nImage = isForward ? this.next : this.prev;
		if(nImage) {
			return nImage;
		}
		let imgs, { post } = this;
		do {
			post = post.getAdjacentVisPost(!isForward);
			if(!post) {
				post = isForward ? Thread.first.op : Thread.last.last;
				if(post.hidden || post.thr.hidden) {
					post = post.getAdjacentVisPost(!isForward);
					if(!post) {
						return null;
					}
				}
			}
			imgs = post.images;
		} while(imgs.first === null);
		return isForward ? imgs.first : imgs.last;
	}
	getFullObject(inPost, onsizechange, onrotate) {
		let wrapEl, name, origSrc;
		const { src } = this;
		const parent = this._getImageParent();
		if(this.el.className !== 'de-img-pre') {
			const nameEl = $q(aib.qImgNameLink, parent);
			origSrc = nameEl.getAttribute('de-href') || nameEl.href;
			({ name } = this);
		} else {
			origSrc = parent.href;
			name = origSrc.split('/').pop();
		}
		const imgNameEl = `<a class="de-fullimg-src" target="_blank" title="${
			Lng.openOriginal[lang] }" href="${ origSrc }">${ name }</a>`;
		const wrapClass = (inPost ? ' de-fullimg-wrap-inpost' :
			` de-fullimg-wrap-center${ this._size ? '' : ' de-fullimg-wrap-nosize' }`) +
			(this.isVideo ? ' de-fullimg-video' : '');
		// Expand images: JPG, PNG, GIF
		if(!this.isVideo) {
			const waitEl = inPost || this._size ? '' :
				'<svg class="de-fullimg-load"><use xlink:href="#de-symbol-wait"/></svg>';
			wrapEl = $add(`<div class="de-fullimg-wrap${ wrapClass }">
				${ waitEl }
				<img class="de-fullimg" src="${ src }" alt="${ src }">
				<div class="de-fullimg-info">${ imgNameEl }</div>
			</div>`);
			const img = $q('.de-fullimg', wrapEl);
			img.onload = img.onerror = ({ target }) => {
				if(target.naturalHeight + target.naturalWidth === 0) {
					if(!target.onceLoaded) {
						target.src = target.src;
						target.onceLoaded = true;
					}
					return;
				}
				const { naturalWidth: newW, naturalHeight: newH } = target;
				const ar = this._size ? this._size[1] / this._size[0] : newH / newW;
				const isExifRotated = target.scrollHeight / target.scrollWidth > 1 ? ar < 1 : ar > 1;
				if(!this._size || isExifRotated) {
					this._size = isExifRotated ? [newH, newW] : [newW, newH];
				}
				const el = target.previousElementSibling;
				if(el) {
					const p = el.parentNode;
					$hide(el);
					p.classList.remove('de-fullimg-wrap-nosize');
					if(onsizechange) {
						onsizechange(p);
					}
				} else if(isExifRotated && onrotate) {
					onrotate(target.parentNode);
				}
			};
			DollchanAPI.notify('expandmedia', src);
			return wrapEl;
		}

		// Expand videos: WEBM, MP4
		// FIXME: handle null size videos
		const isWebm = src.split('.').pop() === 'webm';
		const needTitle = isWebm && Cfg.webmTitles;
		let inPostSize = '';
		if(inPost) {
			const [width, height] = this.computeFullSize();
			inPostSize = ` style="width: ${ width }px; height: ${ height }px;"`;
		}
		wrapEl = $add(`<div class="de-fullimg-wrap${ wrapClass }"${ inPostSize }>
			<video style="width: inherit; height: inherit" src="${ src }" loop autoplay ` +
				`${ Cfg.webmControl ? 'controls ' : '' }` +
				`${ Cfg.webmVolume === 0 ? 'muted ' : '' }></video>
			<div class="de-fullimg-info">
				${ imgNameEl }
				${ needTitle ? '<svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg>' : '' }
			</div>
		</div>`);
		const videoEl = wrapEl.firstElementChild;
		videoEl.volume = Cfg.webmVolume / 100;
		videoEl.addEventListener('ended', () => Attachment.viewer.navigate(true, true));
		videoEl.addEventListener('error', ({ target }) => {
			if(!target.onceLoaded) {
				target.load();
				target.onceLoaded = true;
			}
		});
		// Sync webm volume on all browser tabs
		setTimeout(() => videoEl.dispatchEvent(new CustomEvent('volumechange')), 150);
		videoEl.addEventListener('volumechange', e => {
			const val = e.target.muted ? 0 : Math.round(e.target.volume * 100);
			if(e.isTrusted && val !== Cfg.webmVolume) {
				saveCfg('webmVolume', val);
				locStorage['__de-webmvolume'] = val;
				locStorage.removeItem('__de-webmvolume');
			}
		});
		// MS Edge needs an external app with DollchanAPI to play webms
		if(nav.isMsEdge && isWebm && !DollchanAPI.hasListener('expandmedia')) {
			const href = 'https://github.com/Kagami/webmify/';
			$popup('err-expandmedia', `${ Lng.errMsEdgeWebm[lang] }:\n<a href="${
				href }" target="_blank">${ href }</a>`, false);
		}
		// Get webm title: load file and parse its metadata
		if(needTitle) {
			this._webmTitleLoad = downloadImgData(videoEl.src, false).then(data => {
				$hide($q('.de-wait', wrapEl));
				if(!data) {
					return;
				}
				let title = '', d = (new WebmParser(data.buffer)).getData();
				if(!d) {
					return;
				}
				d = d[0];
				for(let i = 0, len = d.length; i < len; i++) {
					// Segment Info = 0x1549A966, segment title = 0x7BA9[length | 0x80]
					if(d[i] === 0x49 &&
						d[i + 1] === 0xA9 &&
						d[i + 2] === 0x66 &&
						d[i + 18] === 0x7B &&
						d[i + 19] === 0xA9
					) {
						i += 20;
						for(let end = (d[i++] & 0x7F) + i; i < end; i++) {
							title += String.fromCharCode(d[i]);
						}
						if(title) {
							$q('.de-fullimg-src', wrapEl).textContent +=
								` - ${ videoEl.title = decodeURIComponent(escape(title)) }`;
						}
						break;
					}
				}
			});
		}
		DollchanAPI.notify('expandmedia', src);
		return wrapEl;
	}
	sendCloseEvent(e, inPost) {
		let pv = this.post;
		let cr = pv.el.getBoundingClientRect();
		const x = e.pageX - window.pageXOffset;
		const y = e.pageY - window.pageYOffset;
		if(!inPost) {
			while(x > cr.right || x < cr.left || y > cr.bottom || y < cr.top) {
				pv = pv.parent;
				if(pv && (pv instanceof Pview)) {
					cr = pv.el.getBoundingClientRect();
				} else {
					if(Pview.top) {
						Pview.top.markToDel();
					}
					return;
				}
			}
			pv.mouseEnter();
		} else if(x > cr.right || y > cr.bottom && Pview.top) {
			Pview.top.markToDel();
		}
	}

	get _size() {
		const value = this._getImageSize();
		Object.defineProperty(this, '_size', { value, writable: true });
		return value;
	}
	_getThumbSize() {
		const iEl = new Image();
		iEl.src = this.el.src;
		return this.isVideo ? [iEl.width * 5, iEl.height * 5] : [iEl.width, iEl.height, null];
	}
}

// Initialization of embedded previews in post message
class EmbeddedImage extends ExpandableMedia {
	_getImageParent() {
		return this.el.parentNode;
	}
	_getImageSize() {
		return [this.el.naturalWidth, this.el.naturalHeight];
	}
	_getImageSrc() {
		return this.el.src;
	}
}

// Initialization of post attachment images/videos
class Attachment extends ExpandableMedia {
	static close() {
		if(Attachment.viewer) {
			Attachment.viewer.close(null);
			Attachment.viewer = null;
		}
	}
	get info() {
		const value = aib.getImgInfo(aib.getImgWrap(this.el));
		Object.defineProperty(this, 'info', { value });
		return value;
	}
	get name() {
		const value = aib.getImgRealName(aib.getImgWrap(this.el)).trim();
		Object.defineProperty(this, 'name', { value });
		return value;
	}
	get weight() {
		let value = 0;
		if(this.info) {
			const w = this.info.match(/(\d+(?:[.,]\d+)?)\s*([mмkк])?i?[bб]/i);
			const w1 = w[1].replace(',', '.');
			value = w[2] === 'M' ? (w1 * 1e3) | 0 : !w[2] ? Math.round(w1 / 1e3) : w1;
		}
		Object.defineProperty(this, 'weight', { value });
		return value;
	}

	_getImageParent() {
		return aib.getImgWrap(this.el);
	}
	_getImageSize() {
		if(this.info) {
			const size = this.info.match(/(?:[\s]|^)(\d+)\s?[x\u00D7]\s?(\d+)(?:[)\s,]|$)/);
			return size ? [size[1], size[2]] : null;
		}
		return null;
	}
	_getImageSrc() {
		// XXX: DON'T USE aib.getImgSrcLink(this.el).href
		// If #ihash spells enabled, Chrome reads href in ajaxed posts as empty -> image can't be expanded!
		return aib.getImgSrcLink(this.el).getAttribute('href');
	}
}
Attachment.viewer = null;

const ImagesHashStorage = Object.create({
	get getHash() {
		const value = this._getHashHelper.bind(this);
		Object.defineProperty(this, 'getHash', { value });
		return value;
	},
	endFn() {
		if(this.hasOwnProperty('_storage')) {
			sesStorage['de-imageshash'] = JSON.stringify(this._storage);
		}
		if(this.hasOwnProperty('_workers')) {
			this._workers.clear();
			delete this._workers;
		}
	},

	get _canvas() {
		const value = doc.createElement('canvas');
		Object.defineProperty(this, '_canvas', { value });
		return value;
	},
	get _storage() {
		let value = null;
		try {
			value = JSON.parse(sesStorage['de-imageshash']);
		} finally {
			if(!value) {
				value = {};
			}
			Object.defineProperty(this, '_storage', { value });
			return value;
		}
	},
	get _workers() {
		const value = new WorkerPool(4, genImgHash, emptyFn);
		Object.defineProperty(this, '_workers', { value, configurable: true });
		return value;
	},
	async _getHashHelper({ el, src }) {
		if(src in this._storage) {
			return this._storage[src];
		}
		if(!el.complete) {
			await new Promise(resolve => el.addEventListener('load', () => resolve()));
		}
		if(el.naturalWidth + el.naturalHeight === 0) {
			return -1;
		}
		let data, buffer, val = -1;
		const { naturalWidth: w, naturalHeight: h } = el;
		if(aib.fch) {
			const imgData = await downloadImgData(el.src);
			if(imgData) {
				({ buffer } = imgData);
			}
		} else {
			const cnv = this._canvas;
			cnv.width = w;
			cnv.height = h;
			const ctx = cnv.getContext('2d');
			ctx.drawImage(el, 0, 0);
			({ buffer } = ctx.getImageData(0, 0, w, h).data);
		}
		if(buffer) {
			data = await new Promise(resolve =>
				this._workers.run([buffer, w, h], [buffer], val => resolve(val)));
			if(data && ('hash' in data)) {
				val = data.hash;
			}
		}
		this._storage[src] = val;
		return val;
	}
});

// Adding features for info links of images
function processImgInfoLinks(el, addSrc = Cfg.imgSrcBtns, delNames = Cfg.delImgNames) {
	if(!addSrc && !delNames) {
		return;
	}
	const els = $Q(aib.qImgNameLink, el);
	for(let i = 0, len = els.length; i < len; i++) {
		const link = els[i];
		if(/google\.|tineye\.com|iqdb\.org/.test(link.href)) {
			$del(link);
			continue;
		}
		if(link.firstElementChild) {
			continue;
		}
		if(addSrc) {
			link.insertAdjacentHTML('beforebegin',
				'<svg class="de-btn-src"><use xlink:href="#de-symbol-post-src"/></svg>');
		}
		if(delNames) {
			link.classList.add('de-img-name');
			const text = link.textContent;
			link.textContent = text.split('.').pop();
			link.title = text;
		}
	}
}

// Adding image previews before links in post message
function embedPostMsgImages(el) {
	const els = $Q(aib.qMsgImgLink, el);
	for(let i = 0, len = els.length; i < len; ++i) {
		const link = els[i];
		const url = link.href;
		if(link.parentNode.tagName === 'SMALL' || url.includes('?')) {
			return;
		}
		const a = link.cloneNode(false);
		a.target = '_blank';
		a.innerHTML = `<img class="de-img-pre" src="${ url }">`;
		$before(link, a);
	}
}

function genImgHash([arrBuf, oldw, oldh]) {
	const buf = new Uint8Array(arrBuf);
	const size = oldw * oldh;
	for(let i = 0, j = 0; i < size; i++, j += 4) {
		buf[i] = buf[j] * 0.3 + buf[j + 1] * 0.59 + buf[j + 2] * 0.11;
	}
	const newh = 8;
	const neww = 8;
	const levels = 3;
	const areas = 256 / levels;
	const values = 256 / (levels - 1);
	let hash = 0;
	for(let i = 0; i < newh; i++) {
		for(let j = 0; j < neww; j++) {
			let tmp = i / (newh - 1) * (oldh - 1);
			const l = Math.min(tmp | 0, oldh - 2);
			const u = tmp - l;
			tmp = j / (neww - 1) * (oldw - 1);
			const c = Math.min(tmp | 0, oldw - 2);
			const t = tmp - c;
			hash = (hash << 4) + Math.min(values * (((buf[l * oldw + c] * ((1 - t) * (1 - u)) +
				buf[l * oldw + c + 1] * (t * (1 - u)) +
				buf[(l + 1) * oldw + c + 1] * (t * u) +
				buf[(l + 1) * oldw + c] * ((1 - t) * u)) / areas) | 0), 255);
			const g = hash & 0xF0000000;
			if(g) {
				hash ^= g >>> 24;
			}
			hash &= ~g;
		}
	}
	return { hash };
}
