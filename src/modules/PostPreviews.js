/* ==[ PostPreviews.js ]======================================================================================
                                                POST PREVIEWS
=========================================================================================================== */

class Pview extends AbstractPost {
	constructor(parent, link, pNum, tNum) {
		super(parent.thr, pNum, pNum === tNum);
		this.isSticky = false;
		this.parent = parent;
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
			this._showPost(post);
			return;
		}
		this._isCached = true;
		this._brd = link.pathname.match(/^\/?(.+\/)/)[1].replace(aib.res, '').replace(/\/$/, '');
		if(PviewsCache.has(this._brd + tNum)) {
			post = PviewsCache.get(this._brd + tNum).getPost(pNum);
			if(post) {
				this._showPost(post);
			} else {
				this._showPview(this.el = $add(`<div class="${ aib.cReply } de-pview-info de-pview">
					${ Lng.postNotFound[lang] }</div>`));
			}
			return;
		}
		this._showPview(this.el = $add(`<div class="${ aib.cReply } de-pview-info de-pview">
			<svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg>${ Lng.loading[lang] }</div>`));

		// Get post preview via ajax. Uses json if available.
		this._loadPromise = ajaxPostsLoad(this._brd, tNum, false).then(pBuilder => {
			if(!aib.JsonBuilder) {
				this._onload(pBuilder._form);
				return;
			}
			const html = [];
			for(let i = 0, len = pBuilder.length + 1; i < len; ++i) {
				html.push(pBuilder.getPostHTML(i - 1)); // pBuilder.getPostHTML(-1) is oppost
			}
			this._onload($add(`<div>${ aib.fixHTML(html.join('')) }</div>`));
		}, e => this._onerror(e));
	}
	static get topParent() {
		return Pview.top ? Pview.top.parent : null;
	}
	static show(parent, link) {
		const tNum = +(link.pathname.match(/.+?\/[^\d]*(\d+)/) || [0, aib.getPostOfEl(link).tNum])[1];
		const pNum = +(link.textContent.trim().match(/\d+$/) || [tNum])[0];
		const isTop = !(parent instanceof Pview);
		let pv = isTop ? Pview.top : parent.kid;
		clearTimeout(Pview._delTO);
		if(pv && pv.num === pNum) {
			if(pv.kid) {
				pv.kid.delete();
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
				pv.delete();
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
		if(parent.omitted) {
			pv.delete();
			return;
		}
		if(parent.thr.loadCount === 1 && !parent.el.contains(pv._link)) {
			const el = parent.ref.getElByNum(pv.num);
			if(el) {
				pv._link = el;
			} else {
				pv.delete();
				return;
			}
		}
		const cr = parent.hidden ? parent : pv._link.getBoundingClientRect();
		const diff = pv._isTop ?
			pv._offsetTop - window.pageYOffset - cr.bottom :
			pv._offsetTop + pv.el.offsetHeight - window.pageYOffset - cr.top;
		if(Math.abs(diff) > 1) {
			if(scroll) {
				scrollTo(window.pageXOffset, window.pageYOffset - diff);
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
	delete() {
		this.parent.kid = null;
		this._link.classList.remove('de-link-parent');
		if(Pview.top === this) {
			Pview.top = null;
		}
		if(this._loadPromise) {
			this._loadPromise.cancel();
			this._loadPromise = null;
		}
		let vPost = Attachment.viewer && Attachment.viewer.data.post;
		let pv = this;
		do {
			clearTimeout(pv._readDelay);
			if(vPost === pv) {
				Attachment.close();
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
			this.delete();
		} else if(lastSticky.kid) {
			lastSticky.kid.delete();
		}
	}
	handleEvent(e) {
		const pv = e.target;
		if(e.type === 'animationend' && pv.style.animationName) {
			pv.classList.remove('de-pview-anim');
			pv.style.cssText = this._newPos;
			this._newPos = null;
			$each($Q('.de-css-move', doc.head), $del);
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
				isOverEvent && (el.tagName !== 'A' || el.lchecked) ||
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
	setSticky(val) {
		this.stickBtn.setAttribute('class', val ? 'de-btn-stick-on' : 'de-btn-stick');
		this.isSticky = val;
	}
	setUserVisib() {
		const post = pByNum.get(this.num);
		post.setUserVisib(!post.hidden);
		Pview.updatePosition(true);
		$each($Q(`.de-btn-pview-hide[de-num="${ this.num }"]`), el => {
			if(post.hidden) {
				el.setAttribute('class', 'de-btn-unhide-user de-btn-pview-hide');
				el.parentNode.classList.add('de-post-hide');
			} else {
				el.setAttribute('class', 'de-btn-hide-user de-btn-pview-hide');
				el.parentNode.classList.remove('de-post-hide');
			}
		});
	}

	static _markLink(el, num) {
		$each($Q(`a[href*="${ num }"]`, el),
			el => el.textContent.startsWith('>>' + num) && el.classList.add('de-link-pview'));
	}
	_onerror(e) {
		if(!(e instanceof CancelError)) {
			this.el.innerHTML = (e instanceof AjaxError) && e.code === 404 ?
				Lng.postNotFound[lang] : getErrorMessage(e);
		}
	}
	_onload(form) {
		const b = this._brd;
		const { num } = this.parent;
		const post = new PviewsCache(doc.adoptNode(form), b, this.tNum).getPost(this.num);
		if(post && (aib.b !== b || !post.ref.hasMap || !post.ref.has(num))) {
			(post.ref.hasMap ? $q('.de-refmap', post.el) : $aEnd(post.msg, '<div class="de-refmap"></div>'))
				.insertAdjacentHTML('afterbegin', `<a class="de-link-ref" href="${
					aib.getThrUrl(b, this.parent.tNum) + aib.anchor + num }">&gt;&gt;${
					aib.b === b ? '' : `/${ aib.b }/` }${ num }</a><span class="de-refcomma">, </span>`);
		}
		if(post) {
			this._showPost(post);
		} else {
			this.el.innerHTML = Lng.postNotFound[lang];
		}
	}
	_setPosition(link, isAnim) {
		let oldCSS;
		const cr = link.getBoundingClientRect();
		const offX = cr.left + window.pageXOffset + cr.width / 2;
		const offY = cr.top;
		const bWidth = nav.viewportWidth();
		const isLeft = offX < bWidth / 2;
		const pv = this.el;
		const tmp = isLeft ? offX : offX - Math.min(parseInt(pv.offsetWidth, 10), offX - 10);
		const lmw = `max-width:${ bWidth - tmp - 10 }px; left:${ tmp }px;`;
		if(isAnim) {
			oldCSS = pv.style.cssText;
			pv.style.cssText = 'opacity: 0; ' + lmw;
		} else {
			pv.style.cssText = lmw;
		}
		let top = pv.offsetHeight;
		const isTop = offY + top + cr.height < nav.viewportHeight() || offY - top < 5;
		top = window.pageYOffset + (isTop ? offY + cr.height : offY - top);
		this._offsetTop = top;
		this._isLeft = isLeft;
		this._isTop = isTop;
		if(!isAnim) {
			pv.style.top = top + 'px';
			return;
		}
		const uId = 'de-movecss-' + Math.round(Math.random() * 1e3);
		$css(`@keyframes ${ uId } { to { ${ lmw } top:${ top }px; } }`).className = 'de-css-move';
		if(this._newPos) {
			pv.style.cssText = this._newPos;
			pv.removeEventListener('animationend', this);
		} else {
			pv.style.cssText = oldCSS;
		}
		this._newPos = `${ lmw } top:${ top }px;`;
		pv.addEventListener('animationend', this);
		pv.classList.add('de-pview-anim');
		pv.style.animationName = uId;
	}
	_showMenu(el, html) {
		super._showMenu(el, html);
		this._menu.onover = () => this.mouseEnter();
		this._menu.onout = () => this.markToDel();
	}
	_showPost(post) {
		if(this.el) {
			$del(this.el);
		}
		const pviewEl = this.el = post.el.cloneNode(true);
		const isMyPost = Cfg.markMyPosts && MyPosts.has(this.num);
		pByEl.set(pviewEl, this);
		pviewEl.className = `${ aib.cReply } de-pview${
			post.viewed ? ' de-viewed' : '' }${ isMyPost ? ' de-mypost' : '' }`;
		$show(pviewEl);
		$each($Q('.de-post-hiddencontent', pviewEl), el => el.classList.remove('de-post-hiddencontent'));
		if(Cfg.linksNavig) {
			Pview._markLink(pviewEl, this.parent.num);
		}
		this._pref = $q(aib.qPostRef, pviewEl);
		this._link.classList.add('de-link-parent');
		const pText = `<svg class="de-btn-rep"><use xlink:href="#de-symbol-post-rep"/></svg>${
			post.sage ? '<svg class="de-btn-sage"><use xlink:href="#de-symbol-post-sage"/></svg>' : ''
		}<svg class="de-btn-stick"><use xlink:href="#de-symbol-post-stick"/></svg>${
			post.deleted ? '' : `<span class="de-post-counter-pview">${
				post.isOp ? 'OP' : post.count + +!aib.JsonBuilder }${ isMyPost ? ' (You)' : '' }</span>` }`;
		if(post instanceof CacheItem) {
			this.btns = $aEnd(this._pref, `<span class="de-post-btns">${ pText }</span>`);
			embedAudioLinks(this);
			if(Cfg.addYouTube) {
				new VideosParser().parse(this).end();
			}
			embedPostMsgImages(pviewEl);
			processImgInfoLinks(pviewEl);
		} else {
			let el = this._pref.nextSibling;
			this.btns = el;
			this.isOp = post.isOp;
			el.classList.remove('de-post-counter');
			if(post.hidden) {
				el.classList.add('de-post-hide');
			}
			el.innerHTML = `<svg class="de-btn-${ post.hidden ? 'unhide' : 'hide' }${
				post.userToggled ? '-user' : '' } de-btn-pview-hide" de-num="${ this.num }"><!--
				--><use class="de-btn-hide-use" xlink:href="#de-symbol-post-hide"/><!--
				--><use class="de-btn-unhide-use" xlink:href="#de-symbol-post-unhide"/></svg>${ pText }`;
			$each($Q(`${ !aib.t && post.isOp ? aib.qOmitted + ', ' : '' }.de-fullimg-wrap, .de-fullimg-after`,
				pviewEl), $del);
			$each($Q(aib.qPostImg, pviewEl), el => $show(el.parentNode));
			el = $q('.de-link-parent', pviewEl);
			if(el) {
				el.classList.remove('de-link-parent');
			}
			if(Cfg.addYouTube && post.videos.hasLinks) {
				if(post.videos.playerInfo !== null) {
					Object.defineProperty(this, 'videos',
						{ value: new Videos(this, $q('.de-video-obj', pviewEl), post.videos.playerInfo) });
				}
				this.videos.updatePost($Q('.de-video-link', post.el), $Q('.de-video-link', pviewEl), true);
			}
			if(Cfg.addImgs) {
				$each($Q('.de-img-embed', pviewEl), $show);
			}
			if(Cfg.markViewed) {
				this._readDelay = setTimeout(post => {
					if(!post.viewed) {
						post.el.classList.add('de-viewed');
						post.viewed = true;
					}
					const arr = (sesStorage['de-viewed'] || '').split(',');
					arr.push(post.num);
					sesStorage['de-viewed'] = arr;
				}, post.text.length > 100 ? 2e3 : 500, post);
			}
		}
		pviewEl.addEventListener('click', this, true);
		this._showPview(pviewEl);
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
		this.deleted = false;
		this.isOp = count === 0;
		this.itemInited = false;
		this.viewed = false;
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
}

class PviewsCache extends TemporaryContent {
	constructor(form, b, tNum) {
		super(b + tNum);
		if(this._inited) {
			return;
		}
		this._inited = true;
		const pByNum = new Map();
		const thr = $q(aib.qThread, form) || form;
		const posts = $Q(aib.qRPost + ', ' + aib.qOPost, thr);
		for(let i = 0, len = posts.length; i < len; ++i) {
			const post = posts[i];
			pByNum.set(aib.getPNum(post), new CacheItem(post, i + 1));
		}
		pByNum.set(tNum, this._opObj = new CacheItem(aib.getOp(thr), 0));
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
		if(!post || post.itemInited) {
			return post;
		}
		if(num === this._tNum && this._b === aib.b && pByNum.has(this._tNum)) {
			post.ref.makeUnion(pByNum.get(this._tNum).ref);
		}
		post.el = aib.fixHTML(post.el);
		delete post.msg;
		if(post.ref.hasMap) {
			post.ref.init(this._tUrl, Cfg.strikeHidd && Post.hiddenNums.size !== 0 ? Post.hiddenNums : null);
		}
		post.itemInited = true;
		return post;
	}
}
PviewsCache.purgeSecs = 3e5;
