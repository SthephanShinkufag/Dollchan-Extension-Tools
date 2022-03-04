/* ==[ PostImages.js ]========================================================================================
                                                    IMAGES
               images expanding (in post / by center), navigate buttons, image-links embedding
=========================================================================================================== */

// Navigation buttons for expanding of images/videos by center
class ImagesNavigBtns {
	constructor(viewerObj) {
		const btns = $bEnd(docBody, `<div style="display: none;">
			<div id="de-img-btn-prev" class="de-img-btn" de-title="${ Lng.prevImg[lang] }">
				<svg><use xlink:href="#de-symbol-img-btn-arrow"/></svg></div>
			<div id="de-img-btn-next" class="de-img-btn" de-title="${ Lng.nextImg[lang] }">
				<svg><use xlink:href="#de-symbol-img-btn-arrow"/></svg></div>
			<div id="de-img-btn-auto" class="de-img-btn de-img-btn-none" title="${ Lng.autoPlayOn[lang] }">
				<svg><use xlink:href="#de-symbol-img-btn-auto"/></svg></div>
			<div id="de-img-btn-rotate" class="de-img-btn" title="${ Lng.rotateImg[lang] }">
				<svg><use xlink:href="#de-symbol-img-btn-rotate"/></svg></div></div>`);
		[this.prevBtn, this.nextBtn, this.autoBtn] = [...btns.children];
		this._btns = btns;
		this._btnsStyle = btns.style;
		this._hideTmt = 0;
		this._isHidden = true;
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
				this.showBtns();
			}
			return;
		}
		case 'mouseover':
			if(!this.hasEvents) {
				this.hasEvents = true;
				this._btns.addEventListener('mouseout', this);
				this._btns.addEventListener('click', this);
			}
			if(!this._isHidden) {
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
			case 'de-img-btn-next': viewer.navigate(true); return;
			case 'de-img-btn-prev': viewer.navigate(false); return;
			case 'de-img-btn-rotate': viewer.rotateView(true); return;
			case 'de-img-btn-auto':
				viewer.isAutoPlay = !viewer.isAutoPlay;
				this.autoBtn.title = viewer.isAutoPlay ? Lng.autoPlayOff[lang] : Lng.autoPlayOn[lang];
				viewer.toggleVideoLoop();
				parent.classList.toggle('de-img-btn-auto-on');
			}
		}
		}
	}
	hideBtns() {
		this._btnsStyle.display = 'none';
		this._isHidden = true;
		this._oldX = this._oldY = -1;
	}
	removeBtns() {
		this._btns.remove();
		doc.defaultView.removeEventListener('mousemove', this);
		clearTimeout(this._hideTmt);
	}
	showBtns() {
		if(this._isHidden) {
			this._btnsStyle.removeProperty('display');
			this._isHidden = false;
			this._setHideTmt();
		}
	}

	_setHideTmt() {
		clearTimeout(this._hideTmt);
		this._hideTmt = setTimeout(() => this.hideBtns(), 2e3);
	}
}

// Expanding of images/videos BY CENTER: resizing, moving, opening, closing
class ImagesViewer {
	constructor(data) {
		this.data = null;
		this.isAutoPlay = false;
		this._data = null;
		this._elStyle = null;
		this._fullEl = null;
		this._height = 0;
		this._minSize = 0;
		this._moved = false;
		this._oldL = 0;
		this._oldT = 0;
		this._oldX = 0;
		this._oldY = 0;
		this._parentEl = null;
		this._width = 0;
		this._showFullImg(data);
	}
	closeImgViewer(e) {
		if($hasProp(this, '_btns')) {
			this._btns.removeBtns();
		}
		this._removeFullImg(e);
	}
	handleEvent(e) {
		switch(e.type) {
		case 'mousedown':
			if(this.data.isVideo && ExpandableImage.isControlClick(e)) {
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
			if(this.data.isVideo && ExpandableImage.isControlClick(e) ||
				el.tagName !== 'IMG' &&
				el.tagName !== 'VIDEO' &&
				!el.classList.contains('de-fullimg-wrap') &&
				!el.classList.contains('de-fullimg-wrap-link') &&
				!el.classList.contains('de-fullimg-video-hack') &&
				el.className !== 'de-fullimg-load'
			) {
				return;
			}
			if(e.button === 0) {
				if(this._moved) {
					this._moved = false;
				} else {
					this.closeImgViewer(e);
					AttachedImage.viewer = null;
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
		e.preventDefault();
	}
	navigate(isForward, isVideoOnly = false) {
		let { data } = this;
		data.cancelWebmLoad(this._fullEl);
		do {
			data = data.getFollowImg(isForward);
		} while(data && (!data.isVideo && !data.isImage || isVideoOnly && data.isImage));
		if(data) {
			this.updateImgViewer(data, true, null);
			data.post.selectAndScrollTo(data.post.images.first.el);
		}
	}
	rotateView(isNextAngle) {
		if(isNextAngle) {
			this.data.rotate += this.data.rotate === 270 ? -270 : 90;
		}
		const angle = this.data.rotate;
		const isVert = angle === 90 || angle === 270;
		const img = $q('img, video', this._fullEl);
		img.style.transform = `rotate(${ angle }deg)${
			angle === 90 ? ' translateY(-100%)' : angle === 270 ? ' translateX(-100%)' : '' }`;
		img.classList.toggle('de-fullimg-rotated', isVert);
		img.style.height = `${ (isVert ? this._height / this._width : 1) * 100 }%`;
		if(this.data.isVideo && nav.firefoxVer >= 59) {
			img.previousElementSibling.style =
				(isVert ? 'width: calc(100% - 40px); height: 100%; ' : '') +
				(angle === 90 ? 'right: 0; ' : '') +
				(angle === 180 ? 'bottom: 0;' : '');
		}
		if(isNextAngle || angle !== 180) {
			this._rotateFullImg(this._fullEl);
		}
	}
	toggleVideoLoop() {
		if(this.data.isVideo) {
			$toggleAttr($q('video', this._fullEl), 'loop', '', !this.isAutoPlay);
		}
	}
	updateImgViewer(data, showButtons, e) {
		this._removeFullImg(e);
		this._showFullImg(data, showButtons);
	}

	get _btns() {
		const value = new ImagesNavigBtns(this);
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
	_removeFullImg(e) {
		const { data } = this;
		data.cancelWebmLoad(this._fullEl);
		if(data.inPview && data.post.isSticky) {
			data.post.toggleSticky(false);
		}
		this._parentEl.remove();
		if(e && data.inPview) {
			data.sendCloseEvent(e, false);
		}
	}
	_resizeFullImg(el) {
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
	_rotateFullImg(el) {
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
	_showFullImg(data) {
		const [width, height, minSize] = data.computeFullSize();
		this._fullEl = data.getFullImg(false, el => this._resizeFullImg(el), el => this._rotateFullImg(el));
		this._width = width;
		this._height = height;
		this._minSize = minSize ? minSize / this._zoomFactor : Cfg.minImgSize;
		this._oldL = (Post.sizing.wWidth - width) / 2 - 1;
		this._oldT = (Post.sizing.wHeight - height) / 2 - 1;
		const el = $add(`<div class="de-fullimg-center${
			data.isVideo ? ' de-fullimg-center-video' : '' }" style="top:${ this._oldT -
			(Cfg.imgInfoLink ? 11 : 0) - (nav.firefoxVer >= 59 && data.isVideo ? 10 : 0) }px; left:${
			this._oldL }px; width:${ width }px; height:${ height }px; display: block"></div>`);
		el.append(this._fullEl);
		if(data.isImage) {
			$aBegin(this._fullEl, `<a class="de-fullimg-wrap-link" href="${ data.src }"></a>`)
				.append($q('img', this._fullEl));
		}
		this._elStyle = el.style;
		this.data = data;
		this._parentEl = el;
		el.addEventListener('onwheel' in el ? 'wheel' : 'mousewheel', this, true);
		el.addEventListener('mousedown', this, true);
		el.addEventListener('click', this, true);
		data.srcBtnEvents(this);
		if(data.inPview && !data.post.isSticky) {
			data.post.toggleSticky(true);
		}
		const btns = this._btns;
		if(!data.inPview) {
			btns.showBtns();
			btns.autoBtn.classList.toggle('de-img-btn-none', !data.isVideo);
		} else if($hasProp(this, '_btns')) {
			btns.hideBtns();
		}
		data.post.thr.form.el.append(el);
		this.toggleVideoLoop();
		if(this.data.rotate) {
			this.rotateView(false);
		}
		data.checkForRedirect(this._fullEl);
	}
}

// Post image/video main initialization
class ExpandableImage {
	constructor(post, el, prev) {
		this.el = el;
		this.expanded = false;
		this.next = null;
		this.post = post;
		this.prev = prev;
		this.redirected = false;
		this.rotate = 0;
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
		const value = /(jpe?g|png|gif|webp)$/i.test(this.src) ||
			this.src.startsWith('blob:') && !this.el.hasAttribute('de-video');
		Object.defineProperty(this, 'isImage', { value });
		return value;
	}
	get isVideo() {
		const value = /(webm|mp4|m4v|ogv)(&|$)/i.test(this.src) ||
			this.src.startsWith('blob:') && this.el.hasAttribute('de-video');
		Object.defineProperty(this, 'isVideo', { value });
		return value;
	}
	get src() {
		const value = this._getImageSrc();
		Object.defineProperty(this, 'src', { value, configurable: true });
		return value;
	}
	get width() {
		return (this._size || [-1, -1])[0];
	}
	cancelWebmLoad(fullEl) {
		if(this.isVideo) {
			const videoEl = $q('video', fullEl);
			videoEl.pause();
			videoEl.removeAttribute('src');
			videoEl.load();
		}
		if(this._webmTitleLoad) {
			this._webmTitleLoad.cancelPromise();
			this._webmTitleLoad = null;
		}
	}
	checkForRedirect(fullEl) {
		if(!aib.getImgRedirectSrc || this.redirected) {
			return;
		}
		aib.getImgRedirectSrc(this.src).then(newSrc => {
			this.redirected = true;
			Object.defineProperty(this, 'src', { value: newSrc });
			$q('img, video', fullEl).src = this.el.src =
				this.el.parentNode.href = getImgNameLink(this.el).href = newSrc;
			if(!this.isVideo) {
				$q('a', fullEl).href = newSrc;
			}
		});
	}
	collapseImg(e) { // Collapse an image that expanded in post
		if(e && this.isVideo && ExpandableImage.isControlClick(e)) {
			return;
		}
		let fullImgTop;
		if(e) {
			fullImgTop = e.target.getBoundingClientRect().top;
		}
		this.cancelWebmLoad(this._fullEl);
		this.expanded = false;
		this._fullEl.remove();
		this._fullEl = null;
		$show(this.el.parentNode);
		(aib.hasPicWrap ? this._getImageParent : this.el.parentNode).nextSibling.remove();
		if(e) {
			e.preventDefault();
			if(this.inPview) {
				this.sendCloseEvent(e, true);
			}
			const origImgTop = this.el.getBoundingClientRect().top;
			if(fullImgTop < 0 || origImgTop < 0) {
				scrollTo(deWindow.pageXOffset, deWindow.pageYOffset + origImgTop);
			}
		}
	}
	computeFullSize() {
		if(!this._size) {
			if(this.isVideo) {
				return [0, 0, null];
			}
			const el = new Image();
			el.src = this.el.src;
			return [el.width, el.height, null];
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
				width = this.isVideo ? minSize : height * ar;
			}
		}
		const maxWidth = Post.sizing.wWidth - 2;
		const maxHeight = Post.sizing.wHeight -
			(Cfg.imgInfoLink ? 24 : 2) - (nav.firefoxVer >= 59 && this.isVideo ? 19 : 0);
		if(width > maxWidth || height > maxHeight) {
			const ar = width / height;
			if(ar > maxWidth / maxHeight) {
				width = maxWidth;
				height = width / ar;
			} else {
				height = maxHeight;
				width = height * ar;
			}
			if(width < minSize) {
				return [minSize, height, Math.max(width, height)];
			}
		}
		return [width, height, null];
	}
	expandImg(inPost, e) {
		if(e && !e.bubbles) {
			return;
		}
		if(!inPost) {
			const { viewer } = AttachedImage;
			if(!viewer) {
				AttachedImage.viewer = new ImagesViewer(this);
				return;
			}
			if(viewer.data === this) {
				viewer.closeImgViewer(e);
				AttachedImage.viewer = null;
				return;
			}
			viewer.updateImgViewer(this, e);
			return;
		}
		let origImgTop;
		if(e) {
			origImgTop = e.target.getBoundingClientRect().top;
		}
		this.expanded = true;
		const { el } = this;
		(aib.hasPicWrap ? this._getImageParent : el.parentNode).insertAdjacentHTML('afterend',
			'<div class="de-fullimg-after"></div>');
		this._fullEl = this.getFullImg(true, null, null);
		this._fullEl.addEventListener('click', e => this.collapseImg(e), true);
		this.srcBtnEvents(this);
		const parent = el.parentNode;
		$hide(parent);
		parent.after(this._fullEl);
		this.checkForRedirect(this._fullEl);
		if(e) {
			const fullImgTop = this._fullEl.getBoundingClientRect().top;
			if(fullImgTop < 0 || origImgTop < 0) {
				scrollTo(deWindow.pageXOffset, deWindow.pageYOffset + fullImgTop);
			}
		}
	}
	getFollowImg(isForward) {
		const nImage = isForward ? this.next : this.prev;
		if(nImage) {
			return nImage;
		}
		let imgs;
		let { post } = this;
		do {
			post = post.getAdjacentVisPost(!isForward);
			if(!post) {
				post = isForward ? Thread.first.op : Thread.last.last;
				if(post.isHidden || post.thr.isHidden) {
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
	getFullImg(inPost, onsizechange, onrotate) {
		let wrapEl, name, origSrc;
		const src = this._getImageSrc();
		const parent = this._getImageParent;
		if(this.el.className !== 'de-img-embed') {
			const nameEl = $q(aib.qImgNameLink, parent) || $q('a', parent);
			origSrc = nameEl.getAttribute('de-href') || nameEl.href;
			({ name } = this);
		} else {
			origSrc = parent.href;
			name = getFileName(origSrc);
		}
		const imgNameEl = (Cfg.imgSrcBtns ?
			'<svg class="de-btn-img"><use xlink:href="#de-symbol-post-img"></use></svg>' : '') +
			`<a class="de-fullimg-link" target="_blank" title="${
				Lng.openOriginal[lang] }" href="${ origSrc }">${ name }`;
		const wrapClass = `${ inPost ? ' de-fullimg-wrap-inpost' : ` de-fullimg-wrap-center${
			this._size ? '' : ' de-fullimg-wrap-nosize' }` }${
			this.isVideo ? ' de-fullimg-video' : '' }`;
		// Expand images: JPG, PNG, GIF, WEBP
		if(!this.isVideo) {
			const waitEl = !aib.getImgRedirectSrc && this._size ? '' :
				'<svg class="de-fullimg-load"><use xlink:href="#de-symbol-wait"/></svg>';
			wrapEl = $add(`<div class="de-fullimg-wrap${ wrapClass }">
				${ waitEl }
				<img class="de-fullimg" src="${ src }" alt="${ src }">
				<div class="de-fullimg-info">${ imgNameEl }</a></div>
			</div>`);
			const imgEl = $q('.de-fullimg', wrapEl);
			imgEl.onload = imgEl.onerror = ({ target: img }) => {
				if(!(img.naturalHeight + img.naturalWidth)) {
					if(!img.onceLoaded) {
						const { src } = img;
						img.src = src;
						img.onceLoaded = true;
					}
					return;
				}
				const { naturalWidth: newW, naturalHeight: newH } = img;
				const ar = this._size ? this._size[1] / this._size[0] : newH / newW;
				const isRotated = !img.scrollWidth ? false :
					img.scrollHeight / img.scrollWidth > 1 ? ar < 1 : ar > 1;
				if(!this._size || isRotated) {
					this._size = isRotated ? [newH, newW] : [newW, newH];
				}
				const parentEl = img.parentNode.parentNode;
				const waitEl = $q('.de-fullimg-load', parentEl);
				if(waitEl) {
					$hide(waitEl);
					parentEl.classList.remove('de-fullimg-wrap-nosize');
					if(onsizechange) {
						onsizechange(parentEl);
					}
				} else if(isRotated && onrotate) {
					onrotate(parentEl);
				}
			};
			DollchanAPI.notify('expandmedia', src);
			return wrapEl;
		}

		// Expand videos: WEBM, MP4
		// FIXME: handle null size videos
		const isWebm = getFileExt(origSrc) === 'webm';
		const needTitle = isWebm && Cfg.webmTitles;
		let inPostSize = '';
		if(inPost) {
			const [width, height] = this.computeFullSize();
			inPostSize = ` style="width: ${ width }px; height: ${ height }px;"`;
		}
		const hasTitle = needTitle && this.el.hasAttribute('de-metatitle');
		const title = hasTitle ? this.el.getAttribute('de-metatitle') : '';
		wrapEl = $add(`<div class="de-fullimg-wrap${ wrapClass }"${ inPostSize }>${
			nav.firefoxVer < 59 ? '' : '<div class="de-fullimg-video-hack"></div>' }
			<video src="${ src }" ` +
				`${ hasTitle && title ? `title="${ title }" ` : '' }loop autoplay ` +
				`${ Cfg.webmControl ? 'controls ' : '' }` +
				`${ Cfg.webmVolume === 0 ? 'muted ' : '' }></video>
			<div class="de-fullimg-info">${ imgNameEl }</a>
				<span class="de-fullimg-link de-webm-title">${ hasTitle && title ? title : '' }</span>
				${ needTitle && !hasTitle ? `<svg class="de-wait">
					<use xlink:href="#de-symbol-wait"/></svg>` : '' }
			</div>
		</div>`);
		const videoEl = $q('video', wrapEl);
		videoEl.volume = Cfg.webmVolume / 100;
		videoEl.addEventListener('ended', () => AttachedImage.viewer.navigate(true, true));
		videoEl.addEventListener('error', ({ target: el }) => {
			if(!el.onceLoaded) {
				el.load();
				el.onceLoaded = true;
			}
		});
		if(!this._size) {
			videoEl.addEventListener('loadedmetadata', ({ target: el }) => {
				this._size = [el.videoWidth, el.videoHeight];
				onsizechange(wrapEl);
			});
		}
		// Sync webm volume on all browser tabs
		setTimeout(() => videoEl.dispatchEvent(new CustomEvent('volumechange')), 150);
		videoEl.addEventListener('volumechange', ({ target: el, isTrusted }) => {
			const val = el.muted ? 0 : Math.round(el.volume * 100);
			if(isTrusted && val !== Cfg.webmVolume) {
				saveCfg('webmVolume', val);
				sendStorageEvent('__de-webmvolume', val);
			}
		});
		// MS Edge needs an external app with DollchanAPI to play webms
		if(nav.isMsEdge && isWebm && !DollchanAPI.hasListener('expandmedia')) {
			const href = 'https://github.com/Kagami/webmify/';
			$popup('err-expandmedia', `${ Lng.errMsEdgeWebm[lang] }:\n<a href="${
				href }" target="_blank">${ href }</a>`, false);
		}
		// Get webm title: load file and parse its metadata
		if(needTitle && !hasTitle) {
			this._webmTitleLoad = ContentLoader.loadImgData(videoEl.src, false).then(data => {
				$hide($q('.de-wait', wrapEl));
				if(!data) {
					return;
				}
				let str = '';
				let d = new WebmParser(data.buffer).getWebmData();
				if(!d) {
					return;
				}
				d = d[0];
				for(let i = 0, len = d.length; i < len; ++i) {
					// {Title tag = 0x7BA9}{Title length | 0x80}{Title string}{MuxingApp tag = 0x4D80}
					if(d[i] === 0x7B && d[i + 1] === 0xA9) {
						const titleLenPos = i + 2;
						const muxingAppPos = titleLenPos + (d[titleLenPos] & 0x7F) + 1;
						if(d[muxingAppPos] === 0x4D && d[muxingAppPos + 1] === 0x80) {
							for(let j = titleLenPos + 1; j < muxingAppPos; ++j) {
								str += String.fromCharCode(d[j]);
							}
							break;
						}
					}
				}
				const loadedTitle = decodeURIComponent(escape(str));
				this.el.setAttribute('de-metatitle', loadedTitle);
				if(str) {
					$q('.de-webm-title', wrapEl).textContent =
						videoEl.title = loadedTitle.replaceAll('.', ' ');
				}
			});
		}
		DollchanAPI.notify('expandmedia', src);
		return wrapEl;
	}
	sendCloseEvent(e, inPost) {
		let { post } = this;
		let cr = post.el.getBoundingClientRect();
		const x = e.pageX - deWindow.pageXOffset;
		const y = e.pageY - deWindow.pageYOffset;
		if(!inPost) {
			while(x > cr.right || x < cr.left || y > cr.bottom || y < cr.top) {
				post = post.parent;
				if(post && (post instanceof Pview)) {
					cr = post.el.getBoundingClientRect();
				} else {
					if(Pview.top) {
						Pview.top.markToDel();
					}
					return;
				}
			}
			post.mouseEnter();
		} else if(x > cr.right || y > cr.bottom && Pview.top) {
			Pview.top.markToDel();
		}
	}
	srcBtnEvents({ _fullEl }) {
		if(!Cfg.imgSrcBtns) {
			return;
		}
		const srcBtnEl = $q('.de-btn-img', _fullEl);
		srcBtnEl.addEventListener('mouseover', () => (srcBtnEl.odelay = setTimeout(() => {
			const menuHtml = !this.isVideo ? Menu.getMenuImg(srcBtnEl) :
				Menu.getMenuImg(srcBtnEl, true) + `<span class="de-menu-item de-menu-getframe">${
					Lng.getFrameLinks[lang] }</span>`;
			new Menu(srcBtnEl, menuHtml, !this.isVideo ? emptyFn : optiontEl => {
				if(!optiontEl.classList.contains('de-menu-getframe')) {
					return;
				}
				ContentLoader.getDataFromImg($q('video', _fullEl)).then(arr => {
					$popup('upload', Lng.sending[lang], true);
					const name = cutFileExt(this.name) + '.png';
					const blob = new Blob([arr], { type: 'image/png' });
					let formData;
					if(!nav.isChrome || nav.scriptHandler !== 'WebExtension') {
						formData = new FormData();
						formData.append('file', blob, name);
					}
					const ajaxParams = { data: formData || { arr, name }, method: 'POST' };
					const frameLinkHtml = `<a class="de-menu-item de-list" href="${
						deWindow.URL.createObjectURL(blob) }" download="${ name }" target="_blank">${
						Lng.saveFrame[lang] }</a>`;
					$ajax('https://tmp.saucenao.com/', ajaxParams, true).then(xhr => {
						let hostUrl;
						let errMsg = Lng.errSaucenao[lang];
						try {
							const obj = JSON.parse(xhr.responseText);
							if(obj.status === 'success') {
								hostUrl = obj.url ? Menu.getMenuImg(obj.url) : '';
							} else {
								errMsg += ':<br>' + obj.error_message;
							}
						} catch(err) {}
						$popup('upload', (hostUrl || errMsg) + frameLinkHtml);
					}, () => $popup('upload', Lng.errSaucenao[lang] + frameLinkHtml));
				}, emptyFn);
			});
		}, Cfg.linksOver)));
		srcBtnEl.addEventListener('mouseout', e => clearTimeout(e.target.odelay));
	}

	get _size() {
		const value = this._getImageSize();
		Object.defineProperty(this, '_size', { value, writable: true });
		return value;
	}
}

// Initialization of embedded image that added to the link in post message
class EmbeddedImage extends ExpandableImage {
	get _getImageParent() {
		const value = this.el.parentNode;
		Object.defineProperty(this, '_getImageParent', { value });
		return value;
	}
	_getImageSize() {
		return [this.el.naturalWidth, this.el.naturalHeight];
	}
	_getImageSrc() {
		return this.el.src;
	}
}

// Initialization of image/video that attached to the post
class AttachedImage extends ExpandableImage {
	static closeImg() {
		const { viewer } = AttachedImage;
		if(viewer) {
			viewer.closeImgViewer(null);
			AttachedImage.viewer = null;
		}
	}
	get info() {
		const value = aib.getImgInfo(this._getImageParent);
		Object.defineProperty(this, 'info', { value });
		return value;
	}
	get name() {
		const value = aib.getImgRealName(this._getImageParent).trim();
		Object.defineProperty(this, 'name', { value });
		return value;
	}
	get nameLink() {
		const value = $q(aib.qImgNameLink, this._getImageParent);
		Object.defineProperty(this, 'nameLink', { value });
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

	get _getImageParent() {
		const value = aib.getImgWrap(this.el);
		Object.defineProperty(this, '_getImageParent', { value });
		return value;
	}
	_getImageSize() {
		if(this.info) {
			const size = this.info.match(/(?:[\s(]|^)(\d+)\s?[x\u00D7]\s?(\d+)(?:[)\s,]|$)/);
			return size ? [size[1], size[2]] : null;
		}
		return null;
	}
	_getImageSrc() {
		// Donʼt use aib.getImgSrcLink(this.el).href
		// If #ihash spells enabled, Chrome reads href in ajaxed posts as empty -> image canʼt be expanded!
		return aib.getImgSrcLink(this.el).getAttribute('href');
	}
}
AttachedImage.viewer = null;

// A class that finds a set of images in a post
class PostImages {
	constructor(post) {
		let first = null;
		let last = null;
		let els = $Q(aib.qPostImg, post.el);
		let hasAttachments = false;
		const filesMap = new Map();
		for(let i = 0, len = els.length; i < len; ++i) {
			const el = els[i];
			last = new AttachedImage(post, el, last);
			filesMap.set(el, last);
			hasAttachments = true;
			if(!first) {
				first = last;
			}
		}
		if(Cfg.addImgs || localData) {
			els = $Q('.de-img-embed', post.el);
			for(let i = 0, len = els.length; i < len; ++i) {
				const el = els[i];
				last = new EmbeddedImage(post, el, last);
				filesMap.set(el, last);
				if(!first) {
					first = last;
				}
			}
		}
		this.first = first;
		this.last = last;
		this.hasAttachments = hasAttachments;
		this._map = filesMap;
	}
	get expanded() {
		for(let img = this.first; img; img = img.next) {
			if(img.expanded) {
				return true;
			}
		}
		return false;
	}
	get firstAttach() {
		return this.hasAttachments ? this.first : null;
	}
	getImageByEl(el) {
		return this._map.get(el);
	}
	[Symbol.iterator]() {
		return {
			_img: this.first,
			next() {
				const value = this._img;
				if(value) {
					this._img = value.next;
					return { value, done: false };
				}
				return { done: true };
			}
		};
	}
}

const ImagesHashStorage = Object.create({
	get getHash() {
		const value = this._getHashHelper.bind(this);
		Object.defineProperty(this, 'getHash', { value });
		return value;
	},
	endFn() {
		if($hasProp(this, '_storage')) {
			sesStorage['de-imageshash'] = JSON.stringify(this._storage);
		}
		if($hasProp(this, '_workers')) {
			this._workers.clearWorkers();
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
		} catch(err) {}
		if(!value) {
			value = {};
		}
		Object.defineProperty(this, '_storage', { value });
		return value;
	},
	get _workers() {
		const value = new WorkerPool(4, this._genImgHash, emptyFn);
		Object.defineProperty(this, '_workers', { value, configurable: true });
		return value;
	},
	_genImgHash: ([arrBuf, oldw, oldh]) => {
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
		for(let i = 0; i < newh; ++i) {
			for(let j = 0; j < neww; ++j) {
				let temp = i / (newh - 1) * (oldh - 1);
				const l = Math.min(temp | 0, oldh - 2);
				const u = temp - l;
				temp = j / (neww - 1) * (oldw - 1);
				const c = Math.min(temp | 0, oldw - 2);
				const t = temp - c;
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
	},
	async _getHashHelper({ el, src }) {
		if(src in this._storage) {
			return this._storage[src];
		}
		if(!el.complete) {
			await new Promise(resolve => el.addEventListener('load', () => resolve()));
		}
		el.removeAttribute('loading');
		if(el.naturalWidth + el.naturalHeight === 0) {
			return -1;
		}
		let data;
		let val = -1;
		const { naturalWidth: w, naturalHeight: h } = el;
		const cnv = this._canvas;
		cnv.width = w;
		cnv.height = h;
		const ctx = cnv.getContext('2d');
		ctx.drawImage(el, 0, 0);
		const { buffer } = ctx.getImageData(0, 0, w, h).data;
		if(buffer) {
			data = await new Promise(resolve =>
				this._workers.runWorker([buffer, w, h], [buffer], val => resolve(val)));
			if(data && ('hash' in data)) {
				val = data.hash;
			}
		}
		this._storage[src] = val;
		return val;
	}
});

function getImgNameLink(el) {
	return $q(aib.qImgNameLink, aib.getImgWrap(el));
}

function addImgButtons(link) {
	link.insertAdjacentHTML('beforebegin', '<svg class="de-btn-img">' +
		'<use xlink:href="#de-symbol-post-img"/></svg>');
}

// Adding features for info links of images
function processImgInfoLinks(parent, addSrc = Cfg.imgSrcBtns, imgNames = Cfg.imgNames) {
	if(addSrc || imgNames) {
		if(parent instanceof AbstractPost) {
			processPostImgInfoLinks(parent, addSrc, imgNames);
		} else {
			const posts = $Q(aib.qRPost + ', ' + aib.qOPost + ', .de-oppost', parent);
			for(let i = 0, len = posts.length; i < len; ++i) {
				processPostImgInfoLinks(pByEl.get(posts[i]), addSrc, imgNames);
			}
		}
	}
}

function processPostImgInfoLinks(post, addSrc, imgNames) {
	if(!post) {
		return;
	}
	for(const image of post.images) {
		const link = image.nameLink;
		if(!link) {
			return;
		}
		if(addSrc) {
			addImgButtons(link);
		}
		const { name } = image;
		if(!link.classList.contains('de-img-name')) {
			link.classList.add('de-img-name');
			link.title = name;
			link.setAttribute('download', name);
			link.setAttribute('de-href', link.href);
		}
		if(imgNames) {
			let ext;
			if(!(ext = link.getAttribute('de-img-ext'))) {
				ext = getFileExt(name) || getFileExt(getFileName(link.href));
				link.setAttribute('de-img-ext', ext);
				link.setAttribute('de-img-name-old', link.textContent);
			}
			link.textContent = imgNames === 2 ? ext : name;
		}
	}
}

// Adding image previews before links in post message
function embedPostMsgImages(el) {
	if(!Cfg.addImgs || localData) {
		return;
	}
	const els = $Q(aib.qMsgImgLink, el);
	for(let i = 0, len = els.length; i < len; ++i) {
		const link = els[i];
		const url = link.href;
		if(url.includes('?') || aib.getPostOfEl(link).hidden) {
			continue;
		}
		link.insertAdjacentHTML('beforebegin',
			`<a href="${ url }" target="_blank"><img class="de-img-embed" src="${ url }"></a><br>`);
		if(Cfg.imgSrcBtns) {
			addImgButtons(link);
		}
	}
}
