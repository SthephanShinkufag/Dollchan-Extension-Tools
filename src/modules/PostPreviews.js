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
		this.board = link.pathname.match(/^\/?(.+\/)/)[1].replace(aib.res, '').replace(/\/$/, '');
		if(PviewsCache.has(this.board + tNum)) {
			post = PviewsCache.get(this.board + tNum).getPost(pNum);
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

		// Get post preview via ajax. Always use DOM parsing.
		this._loadPromise = ajaxPostsLoad(this.board, tNum, false, false)
			.then(pBuilder => this._onload(pBuilder), err => this._onerror(err));
	}
	static get topParent() {
		return Pview.top ? Pview.top.parent : null;
	}
	static showPview(parent, link) {
		const tNum = +link.pathname.match(/.+?\/[^\d]*(\d+)[^\d]/)?.[1] || aib.getPostOfEl(link).tNum;
		const pNum = +link.textContent.match(/\d+/g)?.[0] || tNum;
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
					$Q('.de-link-pview', pv.el).forEach(el => el.classList.remove('de-link-pview'));
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
		let vPost = AttachedImage.viewer?.data.post;
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
		let lastSticky = null;
		let pv = this;
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
			const el = nav.fixEventEl(e.relatedTarget);
			if(!el ||
				isOverEvent && (el.tagName.toLowerCase() !== 'a' || el.isNotRefLink) ||
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
		Pview._delTO = setTimeout(() => this.deleteNonSticky(), nav.isMobile ? 0 : Cfg.linksOut);
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
		$Q(`.de-btn-pview-hide[de-num="${ this.num }"]`).forEach(el => {
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
		$Q(`a[href*="${ num }"]`, el).forEach(
			el => el.textContent.startsWith('>>' + num) && el.classList.add('de-link-pview'));
	}
	_menuShowOverBtn(el, html) {
		super._menuShowOverBtn(el, html);
		this._menu.onover = () => this.mouseEnter();
		this._menu.onout = () => Pview.top.markToDel();
	}
	async _buildPview(post) {
		this.el?.remove();
		const { isOp, num } = this;
		const pv = this.el = post.el.cloneNode(true);
		pByEl.set(pv, this);
		const isMyPost = MyPosts.has(num);
		pv.className = `${ aib.cReply } de-pview${
			post.isViewed ? ' de-viewed' : '' }${ isMyPost ? ' de-mypost' : '' }` +
			`${ post.el.classList.contains('de-mypost-reply') ? ' de-mypost-reply' : '' }`;
		$show(pv);
		$Q('.de-post-hiddencontent', pv).forEach(el => el.classList.remove('de-post-hiddencontent'));
		if(Cfg.linksNavig) {
			Pview._markLink(pv, this.parent.num);
		}
		this._pref = $q(aib.qPostRef, pv);
		this._link.classList.add('de-link-parent');
		const isFav = isOp && (post.thr.isFav || (await readFavorites())[aib.host]?.[this.board]?.[num]);
		const isCached = post instanceof CacheItem;
		const postsCountHtml = (post.isDeleted ? ` de-post-counter-deleted">${ Lng.deleted[lang] }</span>` :
			`">${ isOp ? '(OP)' : post.count + +!(aib.JsonBuilder && isCached) }</span>`) +
			(isMyPost ? '<span class="de-post-counter-you">(You)</span>' : '');
		const pText = '<svg class="de-btn-reply"><use xlink:href="#de-symbol-post-reply"/></svg>' +
			(isOp ? `<svg class="${ isFav ? 'de-btn-fav-sel' : 'de-btn-fav' }">` +
				'<use xlink:href="#de-symbol-post-fav"></use></svg>' : '') +
			(post.sage ? '<svg class="de-btn-sage"><use xlink:href="#de-symbol-post-sage"/></svg>' : '') +
			'<svg class="de-btn-stick"><use xlink:href="#de-symbol-post-stick"/></svg>' +
			'<span class="de-post-counter' + postsCountHtml;
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
			const btnsEl = this.btns = $q('.de-post-btns', pv);
			$q('.de-post-counter', btnsEl)?.remove();
			if(post.isHidden) {
				btnsEl.classList.add('de-post-hide');
			}
			btnsEl.innerHTML = `<svg class="de-btn-${ post.isHidden ? 'unhide' : 'hide' }${
				post.userToggled ? '-user' : '' } de-btn-pview-hide" de-num="${ num }"><!--
				--><use class="de-btn-hide-use" xlink:href="#de-symbol-post-hide"/><!--
				--><use class="de-btn-unhide-use" xlink:href="#de-symbol-post-unhide"/></svg>${ pText }`;
			$delAll(`${ !aib.t && isOp ? aib.qOmitted + ', ' : '' }.de-fullimg-wrap`, pv);
			$Q(aib.qPostImg, pv).forEach(el => $show(el.parentNode));
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
				$Q('.de-img-embed', pv).forEach($show);
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
	_onload(pBuilder) {
		const { board } = this;
		const { num, tNum } = this.parent;
		const post = new PviewsCache(pBuilder, board, this.tNum).getPost(this.num);
		if(post && (aib.b !== board || !post.ref.hasMap || !post.ref.has(num))) {
			(post.ref.hasMap ? $q('.de-refmap', post.el) : $aEnd(post.msg, '<div class="de-refmap"></div>'))
				.insertAdjacentHTML('afterbegin', `<a class="de-link-backref" href="${
					aib.getThrUrl(board, tNum) + aib.anchor + num }">&gt;&gt;${
					aib.b === board ? '' : `/${ aib.b }/` }${ num }</a><span class="de-refcomma">, </span>`);
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
		const uId = 'de-movecss-' + Math.round(Math.random() * 1e12);
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
	_showPview(el) {
		['mouseover', 'mouseout'].forEach(e => el.addEventListener(e, this, true));
		this.thr.form.el.append(el);
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
	constructor(pBuilder, thrUrl, count) {
		this._pBuilder = pBuilder;
		this._thrUrl = thrUrl;
		this.count = count;
		this.isDeleted = false;
		this.isInited = false;
		this.isOp = count === 0;
		this.isViewed = false;
	}
	* refLinks() {
		yield* this._pBuilder.getRefLinks(this.count, this._thrUrl);
	}
	get msg() {
		const value = $q(aib.qPostMsg, this.el);
		Object.defineProperty(this, 'msg', { value });
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
		return new Post.Content(this).title;
	}
	get el() {
		const value = this.isOp ? this._pBuilder.getOpEl() : this._pBuilder.getPostEl(this.count - 1);
		Object.defineProperty(this, 'el', { value: doc.adoptNode(value) });
		return value;
	}
	get thr() {
		let value = null;
		if(this.isOp) {
			const postsCount = this._pBuilder.length;
			value = { lastNum: this._pBuilder.getPNum(postsCount - 1), postsCount };
			Object.defineProperty(value, 'title', { get: () => this.title });
		}
		Object.defineProperty(this, 'thr', { value });
		return value;
	}
}

class PviewsCache extends TemporaryContent {
	constructor(pBuilder, board, tNum) {
		super(board + tNum);
		if(this._isInited) {
			return;
		}
		this._isInited = true;
		const lPByNum = new Map();
		const thrUrl = aib.getThrUrl(board, tNum);
		lPByNum.set(tNum, new CacheItem(pBuilder, thrUrl, 0));
		for(let i = 0; i < pBuilder.length; ++i) {
			lPByNum.set(pBuilder.getPNum(i), new CacheItem(pBuilder, thrUrl, i + 1));
		}
		DelForm.tNums.add(tNum);
		this._b = board;
		this._posts = lPByNum;
		if(Cfg.linksNavig) {
			RefMap.gen(lPByNum);
		}
	}
	getPost(num) {
		const post = this._posts.get(num);
		if(post && !post.isInited) {
			if(this._b === aib.b && pByNum.has(num)) {
				post.ref.makeUnion(pByNum.get(num).ref);
			}
			if(post.ref.hasMap) {
				post.ref.initPostRef(post._thrUrl,
					Cfg.strikeHidd && Post.hiddenNums.size ? Post.hiddenNums : null);
			}
			post.isInited = true;
		}
		return post;
	}
}
PviewsCache.purgeSecs = 3e5;
