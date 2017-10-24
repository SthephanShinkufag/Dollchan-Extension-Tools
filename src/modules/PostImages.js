/*==[ PostImages.js ]=========================================================================================
                                                    IMAGES
               images expanding (in post / by center), navigate buttons, image-links embedding
============================================================================================================*/

function ImgBtnsShowHider(nextFn, prevFn) {
	var btns = $bEnd(docBody, '<div style="display: none;">' +
		'<div id="de-img-btn-next" de-title="' + Lng.nextImg[lang] + '"></div>' +
		'<div id="de-img-btn-prev" de-title="' + Lng.prevImg[lang] + '"></div></div>');
	this._btns = btns;
	this._btnsStyle = btns.style;
	this._nextFn = nextFn;
	this._prevFn = prevFn;
	doc.defaultView.addEventListener('mousemove', this);
	btns.addEventListener('mouseover', this);
}
ImgBtnsShowHider.prototype = {
	handleEvent(e) {
		switch(e.type) {
		case 'mousemove':
			var curX = e.clientX,
				curY = e.clientY;
			if(this._oldX !== curX || this._oldY !== curY) {
				this._oldX = curX;
				this._oldY = curY;
				this.show();
			}
			return;
		case 'mouseover':
			if(!this.hasEvents) {
				this.hasEvents = true;
				this._btns.addEventListener('mouseout', this);
				this._btns.addEventListener('click', this);
			}
			if(!this._hidden) {
				clearTimeout(this._hideTmt);
				KeyEditListener.setTitle(this._btns.firstChild, 17);
				KeyEditListener.setTitle(this._btns.lastChild, 4);
			}
			return;
		case 'mouseout': this._setHideTmt(); return;
		case 'click':
			switch(e.target.id) {
			case 'de-img-btn-next': this._nextFn(); return;
			case 'de-img-btn-prev': this._prevFn();
			}
		}
	},
	hide() {
		this._btnsStyle.display = 'none';
		this._hidden = true;
		this._oldX = this._oldY = -1;
	},
	remove() {
		$del(this._btns);
		doc.defaultView.removeEventListener('mousemove', this);
		clearTimeout(this._hideTmt);
	},
	show() {
		if(this._hidden) {
			this._btnsStyle.removeProperty('display');
			this._hidden = false;
			this._setHideTmt();
		}
	},

	_hasEvents: false,
	_hideTmt: 0,
	_hidden: true,
	_oldX: -1,
	_oldY: -1,
	_setHideTmt() {
		clearTimeout(this._hideTmt);
		this._hideTmt = setTimeout(() => this.hide(), 2e3);
	}
};

function AttachmentViewer(data) {
	this._show(data);
}
AttachmentViewer.prototype = {
	data: null,
	close(e) {
		if(this.hasOwnProperty('_btns')) {
			this._btns.remove();
		}
		this._remove(e);
	},
	handleEvent(e) {
		switch(e.type) {
		case 'mousedown':
			if(this.data.isVideo && this.data.isControlClick(e)) {
				return;
			}
			this._oldX = e.clientX;
			this._oldY = e.clientY;
			docBody.addEventListener('mousemove', this, true);
			docBody.addEventListener('mouseup', this, true);
			break;
		case 'mousemove':
			var curX = e.clientX,
				curY = e.clientY;
			if(curX !== this._oldX || curY !== this._oldY) {
				this._elStyle.left = (this._oldL = parseInt(this._elStyle.left, 10) + curX - this._oldX) + 'px';
				this._elStyle.top = (this._oldT = parseInt(this._elStyle.top, 10) + curY - this._oldY) + 'px';
				this._oldX = curX;
				this._oldY = curY;
				this._moved = true;
			}
			return;
		case 'mouseup':
			docBody.removeEventListener('mousemove', this, true);
			docBody.removeEventListener('mouseup', this, true);
			return;
		case 'click':
			const el = e.target;
			if(this.data.isVideo && this.data.isControlClick(e) ||
			   el.tagName !== 'IMG' && el.tagName !== 'VIDEO' &&
			   !el.classList.contains('de-img-wrapper') && el.target.className !== 'de-img-load')
			{
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
		case 'mousewheel':
			this._handleWheelEvent(e.clientX, e.clientY,
				-1/40 * ('wheelDeltaY' in e ? e.wheelDeltaY : e.wheelDelta));
			break;
		default: // 'wheel' event
			this._handleWheelEvent(e.clientX, e.clientY, e.deltaY);
		}
		$pd(e);
	},
	navigate(isForward) {
		var data = this.data;
		data.cancelWebmLoad(this._fullEl);
		do {
			data = data.getFollow(isForward);
		} while(data && !data.isVideo && !data.isImage);
		if(data) {
			this.update(data, true, null);
			data.post.selectAndScrollTo(data.post.images.first.el);
		}
	},
	update(data, showButtons, e) {
		this._remove(e);
		this._show(data, showButtons);
	},

	_data: null,
	_elStyle: null,
	_fullEl: null,
	_obj: null,
	_oldL: 0,
	_oldT: 0,
	_height: 0,
	_width: 0,
	_oldX: 0,
	_oldY: 0,
	_minSize: 0,
	_moved: false,
	get _btns() {
		var val = new ImgBtnsShowHider(() => this.navigate(true), () => this.navigate(false));
		Object.defineProperty(this, '_btns', { value: val });
		return val;
	},
	get _zoomFactor() {
		var val = 1 + (Cfg.zoomFactor / 100);
		Object.defineProperty(this, '_zoomFactor', { value: val });
		return val;
	},
	_handleWheelEvent(clientX, clientY, delta) {
		if(delta === 0) {
			return;
		}
		var width, height, oldW = this._width,
			oldH = this._height;
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
		this._elStyle.left = (this._oldL = parseInt(clientX - (width / oldW) * (clientX - this._oldL), 10)) + 'px';
		this._elStyle.top = (this._oldT = parseInt(clientY - (height / oldH) * (clientY - this._oldT), 10)) + 'px';
	},
	_show(data) {
		var [width, height, minSize] = data.computeFullSize();
		this._fullEl = data.getFullObject(false, el => this._resize(el), el => this._rotate(el));
		if(data.isVideo && (width < Cfg.minWebmWidth)) {
			width = Cfg.minWebmWidth;
		}
		this._width = width;
		this._height = height;
		this._minSize = minSize ? minSize / this._zoomFactor : Cfg.minImgSize;
		this._oldL = (Post.sizing.wWidth - width) / 2 - 1;
		this._oldT = (Post.sizing.wHeight - height) / 2 - 1;
		var obj = $add('<div class="de-img-center" style="top:' +
			(this._oldT - 11 /* 1/2 of .de-img-full-info */) + 'px; left:' +
			this._oldL + 'px; width:' + width + 'px; height:' + height + 'px; display: block"></div>');
		if(data.isImage) {
			$aBegin(obj, '<a style="width: inherit; height: inherit;" href="' +
				data.src + '"></a>').appendChild(this._fullEl);
		} else {
			obj.appendChild(this._fullEl);
		}
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
		} else if(this.hasOwnProperty('_btns')) {
			this._btns.hide();
		}
		data.post.thr.form.el.appendChild(obj);
	},
	_remove(e) {
		const data = this.data;
		data.cancelWebmLoad(this._fullEl);
		if(data.inPview && data.post.isSticky) {
			data.post.setSticky(false);
		}
		$del(this._obj);
		if(e && data.inPview) {
			data.sendCloseEvent(e, false);
		}
	},
	_resize(el) {
		if(el !== this._fullEl) {
			return;
		}
		var [width, height, minSize] = this.data.computeFullSize();
		this._minSize = minSize ? minSize / this._zoomFactor : Cfg.minImgSize;
		if(Post.sizing.wWidth - this._oldL - this._width < 5 ||
		   Post.sizing.wHeight - this._oldT - this._height < 5)
		{
			return;
		}
		var cPointX = this._oldL + this._width / 2,
			cPointY = this._oldT + this._height / 2,
			maxWidth = (Post.sizing.wWidth - cPointX - 2) * 2,
			maxHeight = (Post.sizing.wHeight - cPointY - 2) * 2;
		if(width > maxWidth || height > maxHeight) {
			var ar = width / height;
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
		this._elStyle.left = (this._oldL = parseInt(cPointX - width / 2, 10)) + 'px';
		this._elStyle.top = (this._oldT = parseInt(cPointY - height / 2, 10)) + 'px';
	},
	_rotate(el) {
		if(el !== this._fullEl) {
			return;
		}
		const width = this._width;
		const height = this._height;
		this._width = height;
		this._height = width;
		this._elStyle.width = height + 'px';
		this._elStyle.height = width + 'px';
		const halfWidth = width / 2;
		const halfHeight = height / 2;
		this._elStyle.left = (this._oldL = parseInt(this._oldL + halfWidth - halfHeight, 10)) + 'px';
		this._elStyle.top = (this._oldT = parseInt(this._oldT + halfHeight - halfWidth, 10)) + 'px';
	}
};

class ExpandableMedia {
	constructor(post, el, prev) {
		this.post = post;
		this.el = el;
		this.prev = prev;
		this.next = null;
		this.expanded = false;
		this._fullEl = null;
		this._webmTitleLoad = null;
		if(prev) {
			prev.next = this;
		}
	}
	get height() {
		return (this._size || [-1, -1])[1];
	}
	get inPview() {
		var value = this.post instanceof Pview;
		Object.defineProperty(this, 'inPview', { value });
		return value;
	}
	get isImage() {
		var val = /\.jpe?g|\.png|\.gif/i.test(this.src) ||
			(this.src.startsWith('blob:') && !this.el.hasAttribute('de-video'));
		Object.defineProperty(this, 'isImage', { value: val });
		return val;
	}
	get isVideo() {
		var val = /\.(?:webm|mp4)(?:&|$)/i.test(this.src) ||
			(this.src.startsWith('blob:') && this.el.hasAttribute('de-video'));
		Object.defineProperty(this, 'isVideo', { value: val });
		return val;
	}
	get src() {
		var val = this._getImageSrc();
		Object.defineProperty(this, 'src', { value: val });
		return val;
	}
	get width() {
		return (this._size || [-1, -1])[0];
	}
	cancelWebmLoad(fullEl) {
		if(this.isVideo && fullEl.tagName === 'VIDEO') {
			fullEl.pause();
			fullEl.removeAttribute('src');
			fullEl.load();
		}
		if(this._webmTitleLoad) {
			this._webmTitleLoad.cancel();
			this._webmTitleLoad = null;
		}
	}
	collapse(e) {
		if(e && this.isVideo && this.isControlClick(e)) {
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
		let width = this._size[0];
		let height = this._size[1];
		if(Cfg.resizeDPI) {
			width /= Post.sizing.dPxRatio;
			height /= Post.sizing.dPxRatio;
		}
		const minSize = Cfg.minImgSize;
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
			const maxHeight = Post.sizing.wHeight - 24 /* height of .de-img-full-info + 2 */;
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
		var el = this.el;
		(aib.hasPicWrap ? this._getImageParent() : el.parentNode).insertAdjacentHTML('afterend',
			'<div class="de-after-fimg"></div>');
		this._fullEl = this.getFullObject(true, null, null);
		this._fullEl.addEventListener('click', e => this.collapse(e));
		$hide(el.parentNode);
		$after(el.parentNode, this._fullEl);
	}
	getFollow(isForward) {
		var nImage = isForward ? this.next : this.prev;
		if(nImage) {
			return nImage;
		}
		var imgs, post = this.post;
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
		let wrapEl, name, origSrc, src = this.src;
		const parent = this._getImageParent();
		if(this.el.className !== 'de-img-pre') {
			const nameEl = $q(aib.qImgNameLink, parent);
			origSrc = nameEl.getAttribute('de-href') || nameEl.href;
			name = this.name;
		} else {
			origSrc = parent.href;
			name = origSrc.split('/').pop();
		}
		// Expand images: JPG, PNG, GIF
		if(!this.isVideo) {
			wrapEl = $add(`<div class="de-img-wrapper${
					inPost ? ' de-img-wrapper-inpost' :
					!this._size ? ' de-img-wrapper-nosize' : '' }">
				${ !inPost && !this._size ?
					'<svg class="de-img-load"><use xlink:href="#de-symbol-wait"/></svg>' : '' }
				<img class="de-img-full" src="${ src }" alt="${ src }">
				<div class="de-img-full-info">
					<a class="de-img-full-src" target="_blank" title="${
						Lng.openOriginal[lang] }" href="${ origSrc }">${ name }</a>
				</div>
			</div>`);
			const img = $q('.de-img-full', wrapEl);
			img.onload = img.onerror = ({ target }) => {
				if(target.naturalHeight + target.naturalWidth === 0) {
					if(!target.onceLoaded) {
						target.src = target.src;
						target.onceLoaded = true;
					}
				} else {
					const newWidth = target.naturalWidth;
					const newHeight = target.naturalHeight;
					const ar = this._size ? this._size[1] / this._size[0] : newHeight / newWidth;
					const isExifRotated = target.scrollHeight / target.scrollWidth > 1 ? ar < 1 : ar > 1;
					if(!this._size || isExifRotated) {
						this._size = isExifRotated ? [newHeight, newWidth] : [newWidth, newHeight];
					}
					const el = target.previousElementSibling;
					if(el) {
						const p = el.parentNode;
						$hide(el);
						p.classList.remove('de-img-wrapper-nosize');
						if(onsizechange) {
							onsizechange(p);
						}
					} else if(isExifRotated && onrotate) {
						onrotate(target.parentNode);
					}
				}
			};
			DollchanAPI.notify('expandmedia', src);
			return wrapEl;
		}

		// Expand videos: WEBM, MP4
		// FIXME: handle null size videos
		if(aib.tiny) {
			src = src.replace(/^.*?\?v=|&.*?$/g, '');
		}
		const isWebm = src.split('.').pop() === 'webm';
		const needTitle = isWebm && Cfg.webmTitles;
		wrapEl = $add(`<div class="de-img-wrapper" style="width: inherit; height: inherit">
			<video style="width: inherit; height: inherit" src="${ src }" loop autoplay ${
				Cfg.webmControl ? 'controls ' : ''}${
				Cfg.webmVolume === 0 ? 'muted ' : ''}></video>
			<div class="de-img-full-info">
				<a class="de-img-full-src" target="_blank" title="${
					Lng.openOriginal[lang] }" href="${ origSrc }">${ name }</a>
				${ needTitle ? '<svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg>' : '' }
			</div>
		</div>`);
		const videoEl = $q('video', wrapEl);
		videoEl.volume = Cfg.webmVolume / 100;
		videoEl.addEventListener('error', function() {
			if(!this.onceLoaded) {
				this.load();
				this.onceLoaded = true;
			}
		});
		// Sync webm volume on all browser tabs
		setTimeout(() => videoEl.dispatchEvent(new CustomEvent('volumechange')), 150);
		videoEl.addEventListener('volumechange', function(e) {
			const val = this.muted ? 0 : Math.round(this.volume * 100);
			if(e.isTrusted && val !== Cfg.webmVolume) {
				saveCfg('webmVolume', val);
				locStorage['__de-webmvolume'] = val;
				locStorage.removeItem('__de-webmvolume');
			}
		});
		// MS Edge needs an external app with DollchanAPI to play webms
		if(nav.MsEdge && isWebm && !DollchanAPI.hasListener('expandmedia')) {
			const href = 'https://github.com/Kagami/webmify/';
			$popup('err-expandmedia', Lng.errMsEdgeWebm[lang] +
				`:\n<a href="${ href }" target="_blank">${ href }</a>`, false);
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
					if(d[i] === 0x49 && d[i + 1] === 0xA9 && d[i + 2] === 0x66 &&
					   d[i + 18] === 0x7B && d[i + 19] === 0xA9)
					{
						i += 20;
						for(let end = (d[i++] & 0x7F) + i; i < end; i++) {
							title += String.fromCharCode(d[i]);
						}
						if(title) {
							$q('.de-img-full-src', wrapEl).textContent +=
								' - ' + (videoEl.title = decodeURIComponent(escape(title)));
						}
						break;
					}
				}
			});
		}
		DollchanAPI.notify('expandmedia', src);
		return wrapEl;
	}
	isControlClick(e) {
		return Cfg.webmControl && e.clientY > (e.target.getBoundingClientRect().bottom - 40);
	}
	sendCloseEvent(e, inPost) {
		var pv = this.post,
			cr = pv.el.getBoundingClientRect(),
			x = e.pageX - window.pageXOffset,
			y = e.pageY - window.pageYOffset;
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
		var value = this._getImageSize();
		Object.defineProperty(this, '_size', { value, writable: true });
		return value;
	}
	_getThumbSize() {
		var iEl = new Image();
		iEl.src = this.el.src;
		return this.isVideo ? [iEl.width * 5, iEl.height * 5] : [iEl.width, iEl.height, null];
	}
}

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

class Attachment extends ExpandableMedia {
	get info() {
		const val = aib.getImgInfo(aib.getImgWrap(this.el));
		Object.defineProperty(this, 'info', { value: val });
		return val;
	}
	get weight() {
		let val = 0;
		if(this.info) {
			const w = this.info.match(/(\d+(?:[\.,]\d+)?)\s*([mмkк])?i?[bб]/i);
			const w1 = w[1].replace(',', '.');
			val = w[2] === 'M' ? (w1 * 1e3) | 0 : !w[2] ? Math.round(w1 / 1e3) : w1;
		}
		Object.defineProperty(this, 'weight', { value: val });
		return val;
	}
	get name() {
		const val = aib.getImgRealName(aib.getImgWrap(this.el)).trim();
		Object.defineProperty(this, 'name', { value: val });
		return val;
	}

	_getImageParent() {
		return aib.getImgWrap(this.el);
	}
	_getImageSize() {
		if(this.info) {
			var size = this.info.match(/(\d+)\s?[x\u00D7]\s?(\d+)/);
			return [size[1], size[2]];
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

var ImagesHashStorage = Object.create({
	endFn() {
		if(this.hasOwnProperty('_storage')) {
			sesStorage['de-imageshash'] = JSON.stringify(this._storage);
		}
		if(this.hasOwnProperty('_workers')) {
			this._workers.clear();
			delete this._workers;
		}
	},
	get getHash() {
		var val = this._getHashHelper.bind(this);
		Object.defineProperty(this, 'getHash', { value: val });
		return val;
	},

	_getHashHelper: async function(imgObj) {
		var el = imgObj.el,
			src = imgObj.src;
		if(src in this._storage) {
			return this._storage[src];
		}
		if(!el.complete) {
			await new Promise(resolve => el.addEventListener('load', () => resolve()));
		}
		if(el.naturalWidth + el.naturalHeight === 0) {
			return -1;
		}
		var data, buffer, val = -1,
			w = el.naturalWidth,
			h = el.naturalHeight;
		if(aib.fch) {
			var imgData = await downloadImgData(el.src);
			if(imgData) {
				buffer = imgData.buffer;
			}
		} else {
			var cnv = this._canvas;
			cnv.width = w;
			cnv.height = h;
			var ctx = cnv.getContext('2d');
			ctx.drawImage(el, 0, 0);
			buffer = ctx.getImageData(0, 0, w, h).data.buffer;
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
	},
	get _canvas() {
		var val = doc.createElement('canvas');
		Object.defineProperty(this, '_canvas', { value: val });
		return val;
	},
	get _storage() {
		var val = null;
		try {
			val = JSON.parse(sesStorage['de-imageshash']);
		} finally {
			if(!val) {
				val = {};
			}
			Object.defineProperty(this, '_storage', { value: val });
			return val;
		}
	},
	get _workers() {
		var val = new WorkerPool(4, genImgHash, emptyFn);
		Object.defineProperty(this, '_workers', { value: val, configurable: true });
		return val;
	}
});

function processImagesLinks(el, addSrc = Cfg.imgSrcBtns, delNames = Cfg.delImgNames) {
	if(!addSrc && !delNames) {
		return;
	}
	for(var i = 0, els = $Q(aib.qImgNameLink, el), len = els.length; i < len; i++) {
		var link = els[i];
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
			let text = link.textContent;
			link.textContent = text.split('.').pop();
			link.title = text;
		}
	}
}

function embedImagesLinks(el) {
	for(var i = 0, els = $Q(aib.qMsgImgLink, el), len = els.length; i < len; ++i) {
		var link = els[i], url = link.href;
		if(link.parentNode.tagName === 'SMALL' || url.includes('?')) {
			return;
		}
		var a = link.cloneNode(false);
		a.target = '_blank';
		a.innerHTML = '<img class="de-img-pre" src="' + url + '">';
		$before(link, a);
	}
}

function genImgHash(data) {
	const buf = new Uint8Array(data[0]);
	const oldw = data[1];
	const oldh = data[2];
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
	return { hash: hash };
}
