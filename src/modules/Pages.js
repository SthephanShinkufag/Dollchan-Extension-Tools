/* ==[ Pages.js ]=============================================================================================
                                                 PAGES LOADER
=========================================================================================================== */

var Pages = {
	add() {
		var pageNum = DelForm.last.pageNum + 1;
		if(this._adding || pageNum > aib.lastPage) {
			return;
		}
		this._adding = true;
		DelForm.last.el.insertAdjacentHTML('beforeend', '<div class="de-addpage-wait"><hr>' +
			'<svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg>' + Lng.loading[lang] + '</div>');
		MyPosts.purge();
		this._addPromise = ajaxLoad(aib.getPageUrl(aib.b, pageNum)).then(formEl => {
			var form = this._addForm(formEl, pageNum);
			if(!form.firstThr) {
				this._endAdding();
				this.add();
				return CancelablePromise.reject(new CancelError());
			}
			return this._updateForms(DelForm.last);
		}).then(() => this._endAdding()).catch(e => {
			if(!(e instanceof CancelError)) {
				$popup('add-page', getErrorMessage(e));
				this._endAdding();
			}
		});
	},
	async load(count) {
		$popup('load-pages', Lng.loading[lang], true);
		if(this._addPromise) {
			this._addPromise.cancel();
			this._endAdding();
		}
		PviewsCache.purge();
		isExpImg = false;
		pByEl = new Map();
		pByNum = new Map();
		Post.hiddenNums = new Set();
		if(Attachment.viewer) {
			Attachment.viewer.close(null);
			Attachment.viewer = null;
		}
		if(pr.isQuick) {
			pr.clearForm();
		}
		DelForm.tNums = new Set();
		for(var form of DelForm) {
			$each($Q('a[href^="blob:"]', form.el), a => URL.revokeObjectURL(a.href));
			$hide(form.el);
			if(form === DelForm.last) {
				break;
			}
			$del(form.el);
		}
		DelForm.first = DelForm.last;
		var len = Math.min(aib.lastPage + 1, aib.page + count);
		for(var i = aib.page; i < len; ++i) {
			try {
				var el = await ajaxLoad(aib.getPageUrl(aib.b, i));
				this._addForm(el, i);
			} catch(e) {
				$popup('load-pages', getErrorMessage(e));
			}
		}
		const { first } = DelForm;
		if(first !== DelForm.last) {
			DelForm.first = first.next;
			$del(first.el);
			await this._updateForms(DelForm.first);
			closePopup('load-pages');
		}
	},

	_adding     : false,
	_addPromise : null,
	_addForm(formEl, pageNum) {
		formEl = doc.adoptNode(formEl);
		$hide((formEl = aib.fixHTML(formEl)));
		$after(DelForm.last.el, formEl);
		var form = new DelForm(formEl, +pageNum, DelForm.last);
		DelForm.last = form;
		form.addStuff();
		if(pageNum !== aib.page && form.firstThr) {
			formEl.insertAdjacentHTML('afterbegin', `<div class="de-page-num">
				<center style="font-size: 2em">${ Lng.page[lang] } ${ pageNum }</center>
				<hr>
			</div>`);
		}
		$show(formEl);
		return form;
	},
	_endAdding() {
		$del($q('.de-addpage-wait'));
		this._adding = false;
		this._addPromise = null;
	},
	async _updateForms(newForm) {
		let fav = await getStoredObj('DESU_Favorites');
		readPostsData(newForm.firstThr.op, fav);
		if(pr.passw) {
			PostForm.setUserPassw();
		}
		if(HotKeys.enabled) {
			HotKeys.clear();
		}
	}
};

function toggleInfinityScroll() {
	if(!aib.t) {
		var evtName = 'onwheel' in doc.defaultView ? 'wheel' : 'mousewheel';
		if(Cfg.inftyScroll) {
			doc.defaultView.addEventListener(evtName, toggleInfinityScroll.onwheel);
		} else {
			doc.defaultView.removeEventListener(evtName, toggleInfinityScroll.onwheel);
		}
	}
}
toggleInfinityScroll.onwheel = e => {
	if((e.type === 'wheel' ? e.deltaY : -('wheelDeltaY' in e ? e.wheelDeltaY : e.wheelDelta)) > 0) {
		window.requestAnimationFrame(() => {
			if(Thread.last.bottom - 150 < Post.sizing.wHeight) {
				Pages.add();
			}
		});
	}
};
