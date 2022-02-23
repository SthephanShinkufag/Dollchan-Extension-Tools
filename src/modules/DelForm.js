/* ==[ DelForm.js ]===========================================================================================
                                                   DELFORM
=========================================================================================================== */

class DelForm {
	constructor(formEl, pageNum, prev) {
		let thr = null;
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
		$delAll('script', this.el);
		const threads = DelForm.getThreads(this.el);
		for(let i = 0, len = threads.length; i < len; ++i) {
			const num = aib.getTNum(threads[i]);
			if(!DelForm.tNums.has(num)) {
				DelForm.tNums.add(num);
				thr = new Thread(threads[i], num, thr, this);
				if(this.firstThr === null) {
					this.firstThr = thr;
				}
				continue;
			}
			const el = threads[i];
			const thrNext = threads[i + 1];
			let elNext = el.nextSibling;
			while(elNext && elNext !== thrNext) {
				elNext.remove();
				elNext = el.nextSibling;
			}
			el.remove();
			console.log('Repeated thread: ' + num);
		}
		if(this.firstThr === null) {
			if(prev) {
				this.lastThr = prev.lastThr;
			}
			return;
		}
		this.lastThr = thr;
	}
	static getThreads(formEl) {
		let threads = $Q(aib.qThread, formEl);
		let len = threads.length;
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
	static [Symbol.iterator]() {
		return {
			_data: this.first,
			next() {
				const value = this._data;
				if(value) {
					this._data = value.next;
					return { value, done: false };
				}
				return { done: true };
			}
		};
	}

	static _parseClasslessThreads(formEl) {
		let i, len;
		let cThr = doc.createElement('div');
		const threads = [];
		const fNodes = [...formEl.childNodes];
		for(i = 0, len = fNodes.length - 1; i < len; ++i) {
			const el = fNodes[i];
			if(el.tagName === 'HR') {
				formEl.insertBefore(cThr, el);
				const lastEl = cThr.lastElementChild;
				if(lastEl.tagName === 'BR') {
					formEl.insertBefore(lastEl, el);
				}
				try {
					aib.getTNum(cThr);
					threads.push(cThr);
				} catch(err) {}
				cThr = doc.createElement('div');
			} else {
				cThr.appendChild(el);
			}
		}
		cThr.appendChild(fNodes[i]);
		formEl.appendChild(cThr);
		return threads;
	}
	get passEl() {
		const value = aib.qDelPassw ? $q(aib.qDelPassw, this.el) : null;
		Object.defineProperty(this, 'passEl', { value });
		return value;
	}
	addStuff() {
		const { el } = this;
		if(Cfg.ajaxPosting && !localData) {
			const delBtn = aib.qDelBut ? $q(aib.qDelBut, el) : null;
			if(delBtn) {
				el.onsubmit = e => e.preventDefault();
				delBtn.onclick = e => {
					e.preventDefault();
					pr.closeReply();
					$popup('delete', Lng.deleting[lang], true);
					html5Submit(el, e.target).then(checkDelete)
						.catch(err => $popup('delete', getErrorMessage(err)));
				};
			}
			Logger.log('Init AJAX');
		}
		ContentLoader.preloadImages(el);
		Logger.log('Preload images');
		embedAudioLinks(el);
		Logger.log('Audio links');
		if(Cfg.embedYTube) {
			new VideosParser().parse(el).endParser();
			Logger.log('Video links');
		}
		processImgInfoLinks(el);
		Logger.log('Image names');
		RefMap.initRefMap(this);
		Logger.log('Reflinks map');
	}
}
DelForm.tNums = new Set();
