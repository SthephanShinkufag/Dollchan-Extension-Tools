//============================================================================================================
//													IMAGES
//============================================================================================================

function genImgHash(data) {
	var i, j, l, c, t, u, g, buf = new Uint8Array(data[0]),
		oldw = data[1],
		oldh = data[2],
		tmp = oldw * oldh,
		newh = 8,
		neww = 8,
		levels = 3,
		areas = 256 / levels,
		values = 256 / (levels - 1),
		hash = 0;
	for(i = 0, j = 0; i < tmp; i++, j += 4) {
		buf[i] = buf[j] * 0.3 + buf[j + 1] * 0.59 + buf[j + 2] * 0.11;
	}
	for(i = 0; i < newh; i++) {
		for(j = 0; j < neww; j++) {
			tmp = i / (newh - 1) * (oldh - 1);
			l = Math.min(tmp | 0, oldh - 2);
			u = tmp - l;
			tmp = j / (neww - 1) * (oldw - 1);
			c = Math.min(tmp | 0, oldw - 2);
			t = tmp - c;
			hash = (hash << 4) + Math.min(values * (((buf[l * oldw + c] * ((1 - t) * (1 - u)) +
				buf[l * oldw + c + 1] * (t * (1 - u)) +
				buf[(l + 1) * oldw + c + 1] * (t * u) +
				buf[(l + 1) * oldw + c] * ((1 - t) * u)) / areas) | 0), 255);
			if(g = hash & 0xF0000000) {
				hash ^= g >>> 24;
			}
			hash &= ~g;
		}
	}
	return {hash: hash};
}

function ImageData(post, el, idx) {
	this.el = el;
	this.idx = idx;
	this.post = post;
}
ImageData.prototype = {
	expanded: false,
	getAdjacentImage: function(toUp) {
		var post = this.post,
			imgs = post.images;
		if(toUp ? this.idx === 0 : this.idx + 1 === imgs.length) {
			do {
				post = post.getAdjacentVisPost(toUp);
				if(!post) {
					post = toUp ? lastThr.last : firstThr.op;
					if(post.hidden || post.thr.hidden) {
						post = post.getAdjacentVisPost(toUp);
					}
				}
				imgs = post.images;
			} while(imgs.length === 0);
			return imgs[toUp ? imgs.length - 1 : 0];
		}
		return imgs[toUp ? this.idx - 1 : this.idx + 1];
	},
	get data() {
		var img = this.el,
			cnv = this._glob.canvas,
			w = cnv.width = img.naturalWidth,
			h = cnv.height = img.naturalHeight,
			ctx = cnv.getContext('2d');
		ctx.drawImage(img, 0, 0);
		return [ctx.getImageData(0, 0, w, h).data.buffer, w, h];
	},
	getHash: function(Fn) {
		if(this.hasOwnProperty('hash')) {
			Fn(this.hash);
		} else {
			this.callback = Fn;
			if(!this._processing) {
				var hash = this._maybeGetHash();
				if(hash !== null) {
					Fn(hash);
				}
			}
		}
	},
	get hash() {
		var hash;
		if(this._processing) {
			this._needToHide = true;
		} else if(aib.fch || this.el.complete) {
			hash = this._maybeGetHash(null);
			if(hash !== null) {
				return hash;
			}
		} else {
			this.el.onload = this.el.onerror = this._onload.bind(this);
		}
		this.post.hashImgsBusy++;
		return null;
	},
	get height() {
		var dat = aib.getImgSize(this.info);
		Object.defineProperties(this, {
			'width': { value: dat[0] },
			'height': { value: dat[1] }
		});
		return dat[1];
	},
	get info() {
		var el = $c(aib.cFileInfo, this.wrap),
			val = el ? el.textContent : '';
		Object.defineProperty(this, 'info', { value: val });
		return val;
	},
	get isImage() {
		var val = /\.jpe?g|\.png|\.gif|^blob:/i.test(this.src);
		Object.defineProperty(this, 'isImage', { value: val });
		return val;
	},
	get fullSrc() {
		var val = aib.getImgLink(this.el).href;
		Object.defineProperty(this, 'fullSrc', { value: val });
		return val;
	},
	get src() {
		var val = aib.getImgSrc(this.el);
		Object.defineProperty(this, 'src', { value: val });
		return val;
	},
	get weight() {
		var val = aib.getImgWeight(this.info);
		Object.defineProperty(this, 'weight', { value: val });
		return val;
	},
	get width() {
		var dat = aib.getImgSize(this.info);
		Object.defineProperties(this, {
			'width': { value: dat[0] },
			'height': { value: dat[1] }
		});
		return dat[0];
	},
	get wrap() {
		var val = aib.getImgWrap(this.el.parentNode);
		Object.defineProperty(this, 'wrap', { value: val });
		return val;
	},

	_glob: {
		get canvas() {
			var val = doc.createElement('canvas');
			Object.defineProperty(this, 'canvas', { value: val });
			return val;
		},
		get storage() {
			try {
				var val = JSON.parse(sessionStorage['de-imageshash']);
			} finally {
				if(!val) {
					val = {};
				}
				spells.addCompleteFunc(this._saveStorage.bind(this));
				Object.defineProperty(this, 'storage', { value: val });
				return val;
			}
		},
		get workers() {
			var val = new workerQueue(4, genImgHash, function(e) {});
			spells.addCompleteFunc(this._clearWorkers.bind(this));
			Object.defineProperty(this, 'workers', { value: val, configurable: true });
			return val;
		},

		_saveStorage: function() {
			sessionStorage['de-imageshash'] = JSON.stringify(this.storage);
		},
		_clearWorkers: function() {
			this.workers.clear();
			delete this.workers;
		},
	},
	_callback: null,
	_processing: false,
	_needToHide: false,
	_endLoad: function(hash) {
		this.post.hashImgsBusy--;
		if(this.post.hashHideFun !== null) {
			this.post.hashHideFun(hash);
		}
	},
	_maybeGetHash: function() {
		var data, val;
		if(this.src in this._glob.storage) {
			val = this._glob.storage[this.src];
		} else if(aib.fch) {
			downloadImgData(this.el.src, this._onload4chan.bind(this));
			this._callback = null;
			return null;
		} else if(this.el.naturalWidth + this.el.naturalHeight === 0) {
			val = -1;
		} else {
			data = this.data;
			this._glob.workers.run(data, [data[0]], this._wrkEnd.bind(this));
			this._callback = null;
			return null;
		}
		Object.defineProperty(this, 'hash', { value: val });
		return val;
	},
	_onload: function() {
		var hash = this._maybeGetHash(null);
		if(hash !== null) {
			this._endLoad(hash);
		}
	},
	_onload4chan: function(maybeData) {
		if(maybeData === null) {
			Object.defineProperty(this, 'hash', { value: -1 });
			this._endLoad(-1);
		} else {
			var buffer = maybeData.buffer,
				data = [buffer, this.el.naturalWidth, this.el.naturalHeight];
			this._glob.workers.run(data, [buffer], this._wrkEnd.bind(this));
		}
	},
	_wrkEnd: function(data) {
		var hash = data.hash;
		Object.defineProperty(this, 'hash', { value: hash });
		this._endLoad(hash);
		if(this.callback) {
			this.callback(hash);
			this.callback = null;
		}
		this._glob.storage[this.src] = hash;
	}
}

function ImgBtnsShowHider(btns) {
	this._btns = btns;
	this._btnsStyle = btns.style;
	btns.addEventListener('mouseover', this, false);
	btns.addEventListener('mouseout', this, false);
}
ImgBtnsShowHider.prototype = {
	_oldX: -1,
	_oldY: -1,
	init: function() {
		this._show();
		window.addEventListener('mousemove', this, false);
	},
	end: function() {
		this._hide();
		window.removeEventListener('mousemove', this, false);
		clearTimeout(this._hideTmt);
	},
	handleEvent: function(e) {
		switch(e.type) {
		case 'mousemove':
			var curX = e.clientX,
			    curY = e.clientY;
			if(this._oldX !== curX || this._oldY !== curY) {
				this._oldX = curX;
				this._oldY = curY;
				this._show();
			}
			break;
		case 'mouseover':
			if(!this._hidden) {
				clearTimeout(this._hideTmt);
				KeyEditListener.setTitle(this._btns.firstChild, 17);
				KeyEditListener.setTitle(this._btns.lastChild, 4);
			}
			break;
		case 'mouseout':
			this._setHideTmt();
		}
	},

	_hideTmt: 0,
	_hidden: true,
	_hide: function() {
		this._btnsStyle.display = 'none';
		this._hidden = true;
		this._oldX = this._oldY = -1;
	},
	_setHideTmt: function() {
		clearTimeout(this._hideTmt);
		this._hideTmt = setTimeout(this._hide.bind(this), 2000);
	},
	_show: function() {
		if(this._hidden) {
			this._btnsStyle.display = '';
			this._hidden = false;
			this._setHideTmt();
		}
	}
}

function ImageMover(img, clickFn) {
	this.el = img;
	this.elStyle = img.style;
	this.clickFn = clickFn;
	img.addEventListener(nav.Firefox ? 'DOMMouseScroll' : 'mousewheel', this, false);
	img.addEventListener('mousedown', this, false);
}
ImageMover.prototype = {
	_oldX: 0,
	_oldY: 0,
	moved: false,
	handleEvent: function(e) {
		if(Cfg['webmControl'] && (e.target.tagName === 'VIDEO' || this.clickFn) && e.clientY >
			(e.target.getBoundingClientRect().top + parseInt(e.target.style.height, 10) - 30)) { return; }
		switch(e.type) {
		case 'mousedown':
			this._oldX = e.clientX;
			this._oldY = e.clientY;
			doc.body.addEventListener('mousemove', this, false);
			doc.body.addEventListener('mouseup', this, false);
			break;
		case 'mousemove':
			var curX = e.clientX,
			    curY = e.clientY;
			if(curX !== this._oldX || curY !== this._oldY) {
				this.elStyle.left = parseInt(this.elStyle.left, 10) + curX - this._oldX + 'px';
				this.elStyle.top = parseInt(this.elStyle.top, 10) + curY - this._oldY + 'px';
				this._oldX = curX;
				this._oldY = curY;
				this.moved = true;
			}
			return;
		case 'mouseup':
			if(e.button === 1 && this.clickFn) {
				this.clickFn(this.el, e);
			}
			doc.body.removeEventListener('mousemove', this, false);
			doc.body.removeEventListener('mouseup', this, false);
			return;
		default: // wheel event
			var curX = e.clientX,
				curY = e.clientY,
				oldL = parseInt(this.elStyle.left, 10),
				oldT = parseInt(this.elStyle.top, 10),
				oldW = parseFloat(this.elStyle.width),
				oldH = parseFloat(this.elStyle.height),
				d = nav.Firefox ? -e.detail : e.wheelDelta,
				newW = oldW * (d > 0 ? 1.25 : 0.8),
				newH = oldH * (d > 0 ? 1.25 : 0.8);
			this.elStyle.width = newW + 'px';
			this.elStyle.height = newH + 'px';
			this.elStyle.left = parseInt(curX - (newW/oldW) * (curX - oldL), 10) + 'px';
			this.elStyle.top = parseInt(curY - (newH/oldH) * (curY - oldT), 10) + 'px';
		}
		$pd(e);
	}
};

function addImagesSearch(el) {
	for(var link, i = 0, els = $Q(aib.qImgLink, el), len = els.length; i < len; i++) {
		link = els[i];
		if(/google\.|tineye\.com|iqdb\.org/.test(link.href)) {
			$del(link);
			continue;
		}
		if(link.firstElementChild) {
			continue;
		}
		link.insertAdjacentHTML('beforebegin', '<span class="de-btn-src"></span>');
	}
}

function embedImagesLinks(el) {
	for(var a, link, i = 0, els = $Q(aib.qMsgImgLink, el); link = els[i++];) {
		if(link.parentNode.tagName === 'SMALL') {
			return;
		}
		a = link.cloneNode(false);
		a.target = '_blank';
		a.innerHTML = '<img class="de-img-pre" src="' + a.href + '">';
		$before(link, a);
	}
}

