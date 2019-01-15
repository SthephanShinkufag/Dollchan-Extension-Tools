/* ==[ PostPreviews.js ]======================================================================================
                                                POST PREVIEWS
=========================================================================================================== */

class Pview extends AbstractPost {
	constructor(parent, link, pNum, tNum) {
		super(parent.thr, pNum, pNum === tNum);
		this.isSticky = false;
		this.parent = parent;
		this.remoteThr = null;
		this.tNum = tNum;
		this._isCached = false;
		this._isLeft = false;
		this._isTop = false;
		this._link = link;
		this._newPos = null;
		this._offsetTop = 0;
		this._readDelay = 0;
		let post = pByNum.get(pNum);
		if(post && (!post.isOp || !(parent instanceof Pview) || !parent._isCached)) {
			this._buildPview(post);
			return;
		}
		this._isCached = true;
		this.brd = link.pathname.match(/^\/?(.+\/)/)[1].replace(aib.res, '').replace(/\/$/, '');
		if(PviewsCache.has(this.brd + tNum)) {
			post = PviewsCache.get(this.brd + tNum).getPost(pNum);
			if(post) {
				this._buildPview(post);
			} else {
				this._showPview(this.el = $add(`<div class="${ aib.cReply } de-pview-info de-pview">
					${ Lng.postNotFound[lang] }</div>`));
			}
			return;
		}
		this._showPview(this.el = $add(`<div class="${ aib.cReply } de-pview-info de-pview">
			<svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg>${ Lng.loading[lang] }</div>`));

		// Get post preview via ajax. Uses json if available.
		this._loadPromise = ajaxPostsLoad(this.brd, tNum, false).then(pBuilder => {
			if(!aib.JsonBuilder) {
				this._onload(pBuilder._form);
				return;
			}
			const html = [];
			for(let i = 0, len = pBuilder.length + 1; i < len; ++i) {
				html.push(pBuilder.getPostHTML(i - 1)); // pBuilder.getPostHTML(-1) is oppost
			}
			this._onload($add(`<div>${ aib.fixHTML(html.join('')) }</div>`));
		}, err => this._onerror(err));
	}
	static get topParent() {
		return Pview.top ? Pview.top.parent : null;
	}
	static showPview(parent, link) {
		const tNum = +(link.pathname.match(/.+?\/[^\d]*(\d+)/) || [0, aib.getPostOfEl(link).tNum])[1];
		const pNum = +(link.textContent.trim().match(/\d+$/) || [tNum]);
		const isTop = !(parent instanceof Pview);
		let pv = isTop ? Pview.top : parent.kid;
		clearTimeout(Pview._delTO);
		if(pv && pv.num === pNum) {
			if(pv.kid) {
				pv.kid.deletePview();
			}
			if(pv._link !== link) {
				// If cursor hovers new link with the same number - move old preview here
				pv._setPosition(link, Cfg.animation);
				pv._link.classList.remove('de-link-parent');
				link.classList.add('de-link-parent');
				pv._link = link;
				if(pv.parent.num !== parent.num) {
					$each($Q('.de-link-pview', pv.el), el => el.classList.remove('de-link-pview'));
					Pview._markLink(pv.el, parent.num);
				}
			}
			pv.parent = parent;
		} else if(!Cfg.noNavigHidd || !pByNum.has(pNum) || !pByNum.get(pNum).hidden) {
			// Show new preview under new link
			if(pv) {
				pv.deletePview();
			}
			pv = new Pview(parent, link, pNum, tNum);
			if(isTop) {
				Pview.top = pv;
			}
		} else {
			return null;
		}
		return pv;
	}
	static updatePosition(scroll) {
		let pv = Pview.top;
		if(!pv) {
			return;
		}
		const { parent } = pv;
		if(parent.isOmitted) {
			pv.deletePview();
			return;
		}
		if(parent.thr.loadCount === 1 && !parent.el.contains(pv._link)) {
			const el = parent.ref.getElByNum(pv.num);
			if(!el) {
				pv.deletePview();
				return;
			}
			pv._link = el;
		}
		const cr = parent.isHidden ? parent : pv._link.getBoundingClientRect();
		const diff = pv._isTop ?
			pv._offsetTop - deWindow.pageYOffset - cr.bottom :
			pv._offsetTop + pv.el.offsetHeight - deWindow.pageYOffset - cr.top;
		if(Math.abs(diff) > 1) {
			if(scroll) {
				scrollTo(deWindow.pageXOffset, deWindow.pageYOffset - diff);
			}
			do {
				pv._offsetTop -= diff;
				pv.el.style.top = Math.max(pv._offsetTop, 0) + 'px';
			} while((pv = pv.kid));
		}
	}
	get stickBtn() {
		const value = $q('.de-btn-stick', this.el);
		Object.defineProperty(this, 'stickBtn', { value });
		return value;
	}
	deletePview() {
		this.parent.kid = null;
		this._link.classList.remove('de-link-parent');
		if(Pview.top === this) {
			Pview.top = null;
		}
		if(this._loadPromise) {
			this._loadPromise.cancelPromise();
			this._loadPromise = null;
		}
		let vPost = AttachedImage.viewer && AttachedImage.viewer.data.post;
		let pv = this;
		do {
			clearTimeout(pv._readDelay);
			if(vPost === pv) {
				AttachedImage.closeImg();
				vPost = null;
			}
			const { el } = pv;
			pByEl.delete(el);
			if(Cfg.animation) {
				$animate(el, 'de-pview-anim', true);
				el.style.animationName =
					`de-post-close-${ this._isTop ? 't' : 'b' }${ this._isLeft ? 'l' : 'r' }`;
			} else {
				el.remove();
			}
		} while((pv = pv.kid));
	}
	deleteNonSticky() {
		let lastSticky = null, pv = this;
		do {
			if(pv.isSticky) {
				lastSticky = pv;
			}
		} while((pv = pv.kid));
		if(!lastSticky) {
			this.deletePview();
		} else if(lastSticky.kid) {
			lastSticky.kid.deletePview();
		}
	}
	handleEvent(e) {
		const pv = e.target;
		if(e.type === 'animationend' && pv.style.animationName) {
			pv.classList.remove('de-pview-anim');
			pv.style.cssText = this._newPos;
			this._newPos = null;
			$delAll('.de-css-move', doc.head);
			pv.removeEventListener('animationend', this);
			return;
		}
		let isOverEvent = false;
		checkMouse: do {
			switch(e.type) {
			case 'mouseover': isOverEvent = true; break;
			case 'mouseout': break;
			default: break checkMouse;
			}
			const el = fixEventEl(e.relatedTarget);
			if(!el ||
				isOverEvent && (el.tagName !== 'A' || el.isNotRefLink) ||
				el !== this.el && !this.el.contains(el)
			) {
				if(isOverEvent) {
					this.mouseEnter();
				} else if(Pview.top) {
					Pview.top.markToDel();
				}
			}
		} while(false);
		if(!this.loading) {
			super.handleEvent(e);
		}
	}
	markToDel() {
		clearTimeout(Pview._delTO);
		Pview._delTO = setTimeout(() => this.deleteNonSticky(), Cfg.linksOut);
	}
	mouseEnter() {
		if(this.kid) {
			this.kid.markToDel();
		} else {
			clearTimeout(Pview._delTO);
		}
	}
	setUserVisib() {
		const post = pByNum.get(this.num);
		const isHide = post.isHidden;
		post.setUserVisib(!isHide);
		Pview.updatePosition(true);
		$each($Q(`.de-btn-pview-hide[de-num="${ this.num }"]`), el => {
			el.setAttribute('class',
				`${ isHide ? 'de-btn-hide-user' : 'de-btn-unhide-user' } de-btn-pview-hide`);
			el.parentNode.classList.toggle('de-post-hide', !isHide);
		});
	}
	toggleSticky(isEnabled) {
		this.stickBtn.setAttribute('class', isEnabled ? 'de-btn-stick-on' : 'de-btn-stick');
		this.isSticky = isEnabled;
	}

	static _markLink(el, num) {
		$each($Q(`a[href*="${ num }"]`, el),
			el => el.textContent.startsWith('>>' + num) && el.classList.add('de-link-pview'));
	}
	async _buildPview(post) {
		$del(this.el);
		const { num } = this;
		const pv = this.el = post.el.cloneNode(true);
		pByEl.set(pv, this);
		const isMyPost = MyPosts.has(num);
		pv.className = `${ aib.cReply } de-pview${
			post.isViewed ? ' de-viewed' : '' }${ isMyPost ? ' de-mypost' : '' }` +
			`${ post.el.classList.contains('de-mypost-reply') ? ' de-mypost-reply' : '' }`;
		$show(pv);
		$each($Q('.de-post-hiddencontent', pv), el => el.classList.remove('de-post-hiddencontent'));
		if(Cfg.linksNavig) {
			Pview._markLink(pv, this.parent.num);
		}
		this._pref = $q(aib.qPostRef, pv);
		this._link.classList.add('de-link-parent');
		const { isOp } = this;
		let f;
		const isFav = isOp && (post.thr.isFav ||
			((f = (await readFavorites())[aib.host]) && (f = f[this.brd]) && (num in f)));
		const isCached = post instanceof CacheItem;
		const pCountHtml = (post.isDeleted ? ` de-post-counter-deleted">${ Lng.deleted[lang] }</span>` :
			`">${ isOp ? '(OP)' : post.count + +!(aib.JsonBuilder && isCached) }</span>`) +
			(isMyPost ? '<span class="de-post-counter-you">(You)</span>' : '');
		const pText = '<svg class="de-btn-reply"><use xlink:href="#de-symbol-post-reply"/></svg>' +
			(isOp ? `<svg class="${ isFav ? 'de-btn-fav-sel' : 'de-btn-fav' }">` +
				'<use xlink:href="#de-symbol-post-fav"></use></svg>' : '') +
			(post.sage ? '<svg class="de-btn-sage"><use xlink:href="#de-symbol-post-sage"/></svg>' : '') +
			'<svg class="de-btn-stick"><use xlink:href="#de-symbol-post-stick"/></svg>' +
			'<span class="de-post-counter' + pCountHtml;
		if(isCached) {
			if(isOp) {
				this.remoteThr = post.thr;
			}
			this.btns = $aEnd(this._pref, `<span class="de-post-btns">${ pText }</span>`);
			embedAudioLinks(this);
			if(Cfg.embedYTube) {
				new VideosParser().parse(this).endParser();
			}
			embedPostMsgImages(pv);
			processImgInfoLinks(this);
		} else {
			const btnsEl = this.btns = this._pref.nextSibling;
			$del($q('.de-post-counter', btnsEl));
			if(post.isHidden) {
				btnsEl.classList.add('de-post-hide');
			}
			btnsEl.innerHTML = `<svg class="de-btn-${ post.isHidden ? 'unhide' : 'hide' }${
				post.userToggled ? '-user' : '' } de-btn-pview-hide" de-num="${ num }"><!--
				--><use class="de-btn-hide-use" xlink:href="#de-symbol-post-hide"/><!--
				--><use class="de-btn-unhide-use" xlink:href="#de-symbol-post-unhide"/></svg>${ pText }`;
			$delAll(`${ !aib.t && isOp ? aib.qOmitted + ', ' : '' }.de-fullimg-wrap, .de-fullimg-after`, pv);
			$each($Q(aib.qPostImg, pv), el => $show(el.parentNode));
			const link = $q('.de-link-parent', pv);
			if(link) {
				link.classList.remove('de-link-parent');
			}
			if(Cfg.embedYTube && post.videos.hasLinks) {
				if(post.videos.playerInfo !== null) {
					Object.defineProperty(this, 'videos',
						{ value: new Videos(this, $q('.de-video-obj', pv), post.videos.playerInfo) });
				}
				this.videos.updatePost($Q('.de-video-link', post.el), $Q('.de-video-link', pv), true);
			}
			if(Cfg.addImgs) {
				$each($Q('.de-img-embed', pv), $show);
			}
			if(Cfg.markViewed) {
				this._readDelay = setTimeout(post => {
					if(!post.isViewed) {
						post.el.classList.add('de-viewed');
						post.isViewed = true;
					}
					const arr = (sesStorage['de-viewed'] || '').split(',');
					arr.push(post.num);
					sesStorage['de-viewed'] = arr;
				}, post.text.length > 100 ? 2e3 : 500, post);
			}
		}
		pv.addEventListener('click', this, true);
		this._showPview(pv);
	}
	_onerror(err) {
		if(!(err instanceof CancelError)) {
			this.el.innerHTML = (err instanceof AjaxError) && err.code === 404 ?
				Lng.postNotFound[lang] : getErrorMessage(err);
		}
	}
	_onload(form) {
		const b = this.brd;
		const { num } = this.parent;
		const post = new PviewsCache(doc.adoptNode(form), b, this.tNum).getPost(this.num);
		if(post && (aib.b !== b || !post.ref.hasMap || !post.ref.has(num))) {
			(post.ref.hasMap ? $q('.de-refmap', post.el) : $aEnd(post.msg, '<div class="de-refmap"></div>'))
				.insertAdjacentHTML('afterbegin', `<a class="de-link-backref" href="${
					aib.getThrUrl(b, this.parent.tNum) + aib.anchor + num }">&gt;&gt;${
					aib.b === b ? '' : `/${ aib.b }/` }${ num }</a><span class="de-refcomma">, </span>`);
		}
		if(post) {
			this._buildPview(post);
		} else {
			this.el.innerHTML = Lng.postNotFound[lang];
		}
	}
	_setPosition(link, isAnim) {
		let oldCSS;
		const cr = link.getBoundingClientRect();
		const offX = cr.left + deWindow.pageXOffset + cr.width / 2;
		const offY = cr.top;
		const bWidth = nav.viewportWidth();
		const isLeft = offX < bWidth / 2;
		const pv = this.el;
		const temp = isLeft ? offX : offX - Math.min(parseInt(pv.offsetWidth, 10), offX - 10);
		const lmw = `max-width:${ bWidth - temp - 10 }px; left:${ temp }px;`;
		const { style } = pv;
		if(isAnim) {
			oldCSS = style.cssText;
		}
		style.cssText = (isAnim ? 'opacity: 0; ' : '') + lmw;
		let top = pv.offsetHeight;
		const isTop = offY + top + cr.height < nav.viewportHeight() || offY - top < 5;
		top = deWindow.pageYOffset + (isTop ? offY + cr.height : offY - top);
		this._offsetTop = top;
		this._isLeft = isLeft;
		this._isTop = isTop;
		if(!isAnim) {
			style.top = top + 'px';
			return;
		}
		const uId = 'de-movecss-' + Math.round(Math.random() * 1e3);
		$css(`@keyframes ${ uId } { to { ${ lmw } top:${ top }px; } }`).className = 'de-css-move';
		if(this._newPos) {
			style.cssText = this._newPos;
			pv.removeEventListener('animationend', this);
		} else {
			style.cssText = oldCSS;
		}
		this._newPos = `${ lmw } top:${ top }px;`;
		pv.addEventListener('animationend', this);
		pv.classList.add('de-pview-anim');
		style.animationName = uId;
	}
	_showMenu(el, html) {
		super._showMenu(el, html);
		this._menu.onover = () => this.mouseEnter();
		this._menu.onout = () => Pview.top.markToDel();
	}
	_showPview(el) {
		el.addEventListener('mouseover', this, true);
		el.addEventListener('mouseout', this, true);
		this.thr.form.el.appendChild(el);
		this._setPosition(this._link, false);
		if(Cfg.animation) {
			el.addEventListener('animationend', function aEvent() {
				el.removeEventListener('animationend', aEvent);
				el.classList.remove('de-pview-anim');
				el.style.animationName = '';
			});
			el.classList.add('de-pview-anim');
			el.style.animationName = `de-post-open-${ this._isTop ? 't' : 'b' }${ this._isLeft ? 'l' : 'r' }`;
		}
	}
}
Pview.top = null;
Pview._delTO = null;

class CacheItem {
	constructor(el, count) {
		this.count = count;
		this.el = el;
		this.isDeleted = false;
		this.isInited = false;
		this.isOp = count === 0;
		this.isViewed = false;
	}
	get msg() {
		const value = $q(aib.qPostMsg, this.el);
		Object.defineProperty(this, 'msg', { value, configurable: true });
		return value;
	}
	get ref() {
		const value = new RefMap(this);
		Object.defineProperty(this, 'ref', { value });
		return value;
	}
	get sage() {
		const value = aib.getSage(this.el);
		Object.defineProperty(this, 'sage', { value });
		return value;
	}
	get title() {
		return new Post.Сontent(this).title;
	}
}

class PviewsCache extends TemporaryContent {
	constructor(form, b, tNum) {
		super(b + tNum);
		if(this._isInited) {
			return;
		}
		this._isInited = true;
		const pByNum = new Map();
		const thr = $q(aib.qThread, form) || form;
		const posts = $Q(aib.qRPost + ', ' + aib.qOPost, thr);
		const pcount = posts.length;
		for(let i = 0; i < pcount; ++i) {
			const post = posts[i];
			pByNum.set(aib.getPNum(post), new CacheItem(post, i + 1));
		}
		this._opObj = new CacheItem(aib.getOp(thr), 0);
		this._opObj.thr = { lastNum: aib.getPNum(posts[pcount - 1]), pcount, title: this._opObj.title };
		pByNum.set(tNum, this._opObj);
		this._b = b;
		this._tNum = tNum;
		this._tUrl = aib.getThrUrl(b, tNum);
		this._posts = pByNum;
		if(Cfg.linksNavig) {
			RefMap.gen(pByNum, this._tUrl);
		}
	}
	getPost(num) {
		const post = this._posts.get(num);
		if(!post || post.isInited) {
			return post;
		}
		if(num === this._tNum && this._b === aib.b && pByNum.has(this._tNum)) {
			post.ref.makeUnion(pByNum.get(this._tNum).ref);
		}
		post.el = aib.fixHTML(post.el);
		delete post.msg;
		if(post.ref.hasMap) {
			post.ref.initPostRef(this._tUrl, Cfg.strikeHidd && Post.hiddenNums.size ? Post.hiddenNums : null);
		}
		post.isInited = true;
		return post;
	}
}
PviewsCache.purgeSecs = 3e5;
