/* ==[ Pages.js ]=============================================================================================
                                                 PAGES LOADER
=========================================================================================================== */

const Pages = {
	addPage(needThreads = 0, pageNum = DelForm.last.pageNum + 1) {
		if(this._isAdding || pageNum > aib.lastPage || needThreads && pageNum > 4) {
			return;
		}
		this._isAdding = true;
		DelForm.last.el.insertAdjacentHTML('beforeend',
			`<div class="de-addpage-wait"><hr><center style="font-size: 1.5em"><svg class="de-wait">
				<use xlink:href="#de-symbol-wait"/></svg>${ Lng.loading[lang] }</center></div>`);
		MyPosts.purge();
		this._addingPromise = ajaxLoad(aib.getPageUrl(aib.b, pageNum)).then(async formEl => {
			const newForm = this._addForm(formEl, pageNum);
			if(newForm.firstThr) {
				if(!needThreads) {
					return this._updateForms(DelForm.last);
				}
				$hide(newForm.el);
				await this._updateForms(DelForm.last);
				const firstForm = DelForm.first;
				let thr = newForm.firstThr;
				do {
					if(thr.isHidden) {
						DelForm.tNums.delete(thr.num);
					} else {
						const oldLastThr = firstForm.lastThr;
						oldLastThr.el.after(thr.el);
						newForm.firstThr = thr.next;
						thr.prev = oldLastThr;
						thr.form = firstForm;
						firstForm.lastThr = oldLastThr.next = thr;
						needThreads--;
					}
					thr = thr.next;
				} while(needThreads && thr);
				DelForm.last = firstForm;
				firstForm.next = firstForm.lastThr.next = null;
				newForm.el.remove();
				this._endAdding();
				if(needThreads) {
					this.addPage(needThreads, pageNum + 1);
				}
				return CancelablePromise.reject(new CancelError());
			}
			this._endAdding();
			this.addPage();
			return CancelablePromise.reject(new CancelError());
		}).then(() => this._endAdding()).catch(err => {
			if(!(err instanceof CancelError)) {
				$popup('add-page', getErrorMessage(err));
				this._endAdding();
			}
		});
	},
	handleEvent(e) {
		let needLoad = false;
		switch(e.type) {
		case 'mousewheel': needLoad = -('wheelDeltaY' in e ? e.wheelDeltaY : e.wheelDelta) > 0; break;
		case 'touchmove': needLoad = this._scrollY > e.touches[0].clientY; break; // Swipe down
		case 'touchstart': this._scrollY = e.touches[0].clientY; break;
		case 'wheel': needLoad = e.deltaY; break;
		}
		if(needLoad) {
			deWindow.requestAnimationFrame(() => {
				if(Thread.last.bottom - 150 < Post.sizing.wHeight) {
					Pages.addPage();
				}
			});
		}
	},
	async loadPages(count) {
		$popup('load-pages', Lng.loading[lang], true);
		if(this._addingPromise) {
			this._addingPromise.cancelPromise();
			this._endAdding();
		}
		PviewsCache.purge();
		isExpImg = false;
		pByEl = new Map();
		pByNum = new Map();
		Post.hiddenNums = new Set();
		AttachedImage.closeImg();
		if(postform.isQuick) {
			postform.clearForm();
		}
		DelForm.tNums = new Set();
		for(const form of DelForm) {
			$Q('a[href^="blob:"]', form.el).forEach(el => URL.revokeObjectURL(el.href));
			$hide(form.el);
			if(form === DelForm.last) {
				break;
			}
			form.el.remove();
		}
		DelForm.first = DelForm.last;
		for(let i = aib.page, len = Math.min(aib.lastPage + 1, aib.page + count); i < len; ++i) {
			try {
				this._addForm(await ajaxLoad(aib.getPageUrl(aib.b, i)), i);
			} catch(err) {
				$popup('load-pages', getErrorMessage(err));
			}
		}
		const { first } = DelForm;
		if(first !== DelForm.last) {
			DelForm.first = first.next;
			first.el.remove();
			await this._updateForms(DelForm.first);
			closePopup('load-pages');
		}
	},
	toggleInfinityScroll() {
		if(aib.t) {
			return;
		}
		if(nav.isMobile) {
			['touchmove', 'touchstart'].forEach(e =>
				doc.defaultView[Cfg.inftyScroll ? 'addEventListener' : 'removeEventListener'](e, this));
		} else {
			doc.defaultView[Cfg.inftyScroll ? 'addEventListener' : 'removeEventListener'](
				'onwheel' in doc.defaultView ? 'wheel' : 'mousewheel', this);
		}
	},

	_addingPromise : null,
	_isAdding      : false,
	_scrollY       : 0,
	_addForm(formEl, pageNum) {
		formEl = doc.adoptNode(formEl);
		$hide(formEl = aib.fixHTML(formEl));
		DelForm.last.el.after(formEl);
		const form = new DelForm(formEl, +pageNum, DelForm.last);
		DelForm.last = form;
		form.addStuff();
		if(pageNum !== aib.page && form.firstThr) {
			formEl.insertAdjacentHTML('afterbegin', `<div class="de-page-num">
				<center style="font-size: 2em">${ Lng.page[lang] } ${ pageNum }</center><hr></div>`);
		}
		$show(formEl);
		return form;
	},
	_endAdding() {
		$q('.de-addpage-wait').remove();
		this._isAdding = false;
		this._addingPromise = null;
	},
	async _updateForms(newForm) {
		readPostsData(newForm.firstThr.op, await readFavorites());
		if(postform.passw) {
			await PostForm.setUserPassw();
		}
		embedPostMsgImages(newForm.el);
		if(HotKeys.enabled) {
			HotKeys.clearCPost();
		}
	}
};
