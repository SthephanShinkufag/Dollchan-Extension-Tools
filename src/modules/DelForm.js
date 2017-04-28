/*==[ DelForm.js ]============================================================================================
                                                   DELFORM
============================================================================================================*/

class DelForm {
	static [Symbol.iterator]() {
		return {
			_data: this.first,
			next() {
				var value = this._data;
				if(value) {
					this._data = value.next;
					return { value, done: false };
				}
				return { done: true };
			}
		};
	}
	static getThreads(formEl) {
		var threads = $Q(aib.qThread, formEl),
			len = threads.length;
		if(len === 0) {
			if(localData) {
				threads = $Q('div[de-thread]');
				len = threads.length;
			}
			if(len === 0) {
				threads = DelForm._parseClasslessThreads(formEl);
			}
		}
		return threads;
	}

	static _parseClasslessThreads(formEl) {
		var i, len, threads = [],
			fNodes = Array.from(formEl.childNodes),
			cThr = doc.createElement('div');
		for(i = 0, len = fNodes.length - 1; i < len; ++i) {
			var node = fNodes[i];
			if(node.tagName === 'HR') {
				formEl.insertBefore(cThr, node);
				if(!aib.tinyib) {
					formEl.insertBefore(cThr.lastElementChild, node);
				}
				var el = cThr.lastElementChild;
				if(el.tagName === 'BR') {
					formEl.insertBefore(el, node);
				}
				try {
					aib.getTNum(cThr);
					threads.push(cThr);
				} catch(e) {}
				cThr = doc.createElement('div');
			} else {
				cThr.appendChild(node);
			}
		}
		cThr.appendChild(fNodes[i]);
		formEl.appendChild(cThr);
		return threads;
	}
	constructor(formEl, pageNum, prev = null) {
		var thr = null;
		this.el = formEl;
		this.firstThr = null;
		this.lastThr = null;
		this.next = null;
		this.pageNum = pageNum;
		this.prev = prev;
		if(prev) {
			prev.next = this;
			thr = prev.lastThr;
		}
		formEl.setAttribute('de-form', '');
		formEl.removeAttribute('id');
		$each($Q('script', this.el), $del);
		var threads = DelForm.getThreads(this.el),
			len = threads.length;
		for(var i = 0; i < len; ++i) {
			var num = aib.getTNum(threads[i]);
			if(DelForm.tNums.has(num)) {
				var el = threads[i],
					thrNext = threads[i + 1],
					elNext = el.nextSibling;
				while(elNext && elNext !== thrNext) {
					$del(elNext);
					elNext = el.nextSibling;
				}
				$del(el);
				console.log('Repeated thread: ' + num);
			} else {
				DelForm.tNums.add(num);
				thr = new Thread(threads[i], num, thr, this);
				if(this.firstThr === null) {
					this.firstThr = thr;
				}
			}
		}
		if(this.firstThr === null) {
			if(prev) {
				this.lastThr = prev.lastThr;
			}
			return;
		}
		this.lastThr = thr;
	}
	get passEl() {
		var value = $q(aib.qDelPassw, this.el);
		Object.defineProperty(this, 'passEl', { value });
		return value;
	}
	addStuff() {
		var el = this.el;
		if(!localData) {
			if(Cfg.ajaxReply === 2) {
				el.onsubmit = $pd;
				var btn = $q(aib.qDelBut, el);
				if(btn) {
					btn.onclick = e => {
						$pd(e);
						pr.closeReply();
						$popup('delete', Lng.deleting[lang], true);
						spawn(html5Submit, el, e.target)
							.then(dc => checkDelete(dc), e => $popup('delete', getErrorMessage(e)));
					};
				}
			} else if(Cfg.ajaxReply === 1) {
				el.target = 'de-iframe-dform';
				el.onsubmit = function() {
					pr.closeReply();
					$popup('delete', Lng.deleting[lang], true);
				};
			}
		}
		Logger.log('Init AJAX');
		preloadImages(el);
		Logger.log('Preload images');
		embedMediaLinks(el);
		Logger.log('Audio links');
		if(Cfg.addYouTube) {
			new VideosParser().parse(el).end();
			Logger.log('Video links');
		}
		if(Cfg.addImgs) {
			embedImagesLinks(el);
			Logger.log('Image-links');
		}
		processImagesLinks(el);
		Logger.log('Image names');
		RefMap.init(this);
		Logger.log('Reflinks map');
	}
}
DelForm.tNums = new Set();
