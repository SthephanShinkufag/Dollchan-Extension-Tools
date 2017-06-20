/*==[ PostPreviews.js ]=======================================================================================
                                                POST PREVIEWS
============================================================================================================*/

class Pview extends AbstractPost {
	static get topParent() {
		return Pview.top ? Pview.top.parent : null;
	}
	static show(parent, link) {
		const tNum = +(link.pathname.match(/.+?\/[^\d]*(\d+)/) || [,aib.getPostOfEl(link).tNum])[1];
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
					$each($Q('.de-link-pview', pv.el), function(el) {
						el.classList.remove('de-link-pview');
					});
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
		const parent = pv.parent;
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
		const diff = pv._isTop ? pv._offsetTop - window.pageYOffset - cr.bottom
		                       : pv._offsetTop + pv.el.offsetHeight - window.pageYOffset - cr.top;
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
	static _markLink(el, num) {
		$each($Q('a[href*="' + num + '"]', el), function(el) {
			if(el.textContent.startsWith('>>' + num)) {
				el.classList.add('de-link-pview');
			}
		});
	}
	constructor(parent, link, pNum, tNum) {
		super(parent.thr, pNum, pNum === tNum);
		this._isCached = false;
		this._isLeft = false;
		this._isTop = false;
		this._link = link;
		this._newPos = null;
		this._offsetTop = 0;
		this._readDelay = 0;
		this.isSticky = false;
		this.parent = parent;
		this.tNum = tNum;
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
		this._loadPromise = ajaxPostsLoad(this._brd, tNum, false).then(
			pBuilder => {
				if(aib.jsonBuilder) {
					const html = [];
					for(let i = 0, len = pBuilder.length + 1; i < len; ++i) {
						html.push(pBuilder.getPostHTML(i - 1)); // pBuilder.getPostHTML(-1) is oppost
					}
					this._onload($add(`<div>${ aib.fixHTML(html.join('')) }</div>`));
				} else {
					this._onload(pBuilder._form);
				}
			},
			e => this._onerror(e));
	}
	get stickBtn() {
		var value = $q('.de-btn-stick', this.el);
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
		var vPost = Attachment.viewer && Attachment.viewer.data.post;
		var pv = this;
		do {
			clearTimeout(pv._readDelay);
			if(vPost === pv) {
				Attachment.viewer.close(null);
				Attachment.viewer = vPost = null;
			}
			var el = pv.el;
			pByEl.delete(el);
			if(Cfg.animation) {
				$animate(el, 'de-pview-anim', true);
				el.style.animationName = 'de-post-close-' + (this._isTop ? 't' : 'b') + (this._isLeft ? 'l' : 'r');
			} else {
				el.remove();
			}
		} while((pv = pv.kid));
	}
	deleteNonSticky() {
		var lastSticky = null, pv = this;
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
		var pv = e.target;
		if(e.type === 'animationend' && pv.style.animationName) {
			pv.classList.remove('de-pview-anim');
			pv.style.cssText = this._newPos;
			this._newPos = null;
			$each($Q('.de-css-move', doc.head), $del);
			pv.removeEventListener('animationend', this);
			return;
		}
		var isOverEvent = false;
		checkMouse: do {
			switch(e.type) {
			case 'mouseover': isOverEvent = true; break;
			case 'mouseout': break;
			default: break checkMouse;
			}
			var el = fixEventEl(e.relatedTarget);
			if(!el || (isOverEvent && (el.tagName !== 'A' || el.lchecked)) || (el !== this.el && !this.el.contains(el))) {
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
		var post = pByNum.get(this.num);
		post.setUserVisib(!post.hidden);
		Pview.updatePosition(true);
		$each($Q('.de-btn-pview-hide[de-num="' + this.num + '"]'), el => {
			if(post.hidden) {
				el.setAttribute('class', 'de-btn-unhide-user de-btn-pview-hide');
				el.parentNode.classList.add('de-post-hide');
			} else {
				el.setAttribute('class', 'de-btn-hide-user de-btn-pview-hide');
				el.parentNode.classList.remove('de-post-hide');
			}
		});
	}

	_onerror(e) {
		if(!(e instanceof CancelError)) {
			this.el.innerHTML = (e instanceof AjaxError) && e.code === 404 ?
				Lng.postNotFound[lang] : getErrorMessage(e);
		}
	}
	_onload(form) {
		var parentNum = this.parent.num,
			post = new PviewsCache(doc.adoptNode(form), this._brd, this.tNum).getPost(this.num);
		if(post && (aib.b !== this._brd || !post.ref.hasMap || !post.ref.has(parentNum))) {
			(post.ref.hasMap ? $q('.de-refmap', post.el) : $aEnd(post.msg, '<div class="de-refmap"></div>'))
				.insertAdjacentHTML('afterbegin', '<a class="de-link-ref" href="' +
					aib.getThrUrl(this._brd, this.parent.tNum) + aib.anchor +
					parentNum + '">&gt;&gt;' + (aib.b === this._brd ? '' : '/' + aib.b + '/') +
					parentNum + '</a><span class="de-refcomma">, </span>');
		}
		if(post) {
			this._showPost(post);
		} else {
			this.el.innerHTML = Lng.postNotFound[lang];
		}
	}
	_setPosition(link, isAnim) {
		var oldCSS, pv = this.el,
			cr = link.getBoundingClientRect(),
			offX = cr.left + window.pageXOffset + cr.width / 2,
			offY = cr.top,
			bWidth = nav.viewportWidth(),
			isLeft = offX < bWidth / 2,
			tmp = (isLeft ? offX : offX - Math.min(parseInt(pv.offsetWidth, 10), offX - 10)),
			lmw = 'max-width:' + (bWidth - tmp - 10) + 'px; left:' + tmp + 'px;';
		if(isAnim) {
			oldCSS = pv.style.cssText;
			pv.style.cssText = 'opacity: 0; ' + lmw;
		} else {
			pv.style.cssText = lmw;
		}
		var top = pv.offsetHeight,
			isTop = offY + top + cr.height < nav.viewportHeight() || offY - top < 5;
		top = window.pageYOffset + (isTop ? offY + cr.height : offY - top);
		this._offsetTop = top;
		this._isLeft = isLeft;
		this._isTop = isTop;
		if(!isAnim) {
			pv.style.top = top + 'px';
			return;
		}
		var uId = 'de-movecss-' + Math.round(Math.random() * 1e3);
		$css('@keyframes ' + uId + ' { to { ' + lmw + ' top:' + top + 'px; } }').className = 'de-css-move';
		if(this._newPos) {
			pv.style.cssText = this._newPos;
			pv.removeEventListener('animationend', this);
		} else {
			pv.style.cssText = oldCSS;
		}
		this._newPos = lmw + ' top:' + top + 'px;';
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
		var el = this.el = post.el.cloneNode(true),
			isMyPost = Cfg.markMyPosts && MyPosts.has(this.num),
			pText = '<svg class="de-btn-rep"><use xlink:href="#de-symbol-post-rep"/></svg>' +
				(post.sage ? '<svg class="de-btn-sage"><use xlink:href="#de-symbol-post-sage"/></svg>' : '') +
				'<svg class="de-btn-stick"><use xlink:href="#de-symbol-post-stick"/></svg>' +
				(post.deleted ? '' : '<span style="margin: 0 4px 0 2px; vertical-align: 1px; ' +
				'color: #4f7942; font: bold 11px tahoma; cursor: default;">' +
				(post.isOp ? 'OP' : post.count + 1) + (isMyPost ? ' (You)' : '') + '</span>');
		pByEl.set(el, this);
		el.className = aib.cReply + ' de-pview' +
			(post.viewed ? ' de-viewed' : '') + (isMyPost ? ' de-mypost' : '');
		$show(el);
		$each($Q('.de-post-hiddencontent', el), node => node.classList.remove('de-post-hiddencontent'));
		if(Cfg.linksNavig) {
			Pview._markLink(el, this.parent.num);
		}
		this._pref = $q(aib.qPostRef, el);
		this._link.classList.add('de-link-parent');
		if(post instanceof CacheItem) {
			this.btns = $aEnd(this._pref, '<span class="de-post-btns">' + pText + '</span');
			embedMediaLinks(this);
			if(Cfg.addYouTube) {
				new VideosParser().parse(this).end();
			}
			if(Cfg.addImgs) {
				embedImagesLinks(el);
			}
			processImagesLinks(el);
		} else {
			var node = this._pref.nextSibling;
			this.btns = node;
			this.isOp = post.isOp;
			node.classList.remove('de-post-counter');
			if(post.hidden) {
				node.classList.add('de-post-hide');
			}
			node.innerHTML = '<svg class="de-btn-' + (post.hidden ? 'unhide' : 'hide') +
				(post.userToggled ? '-user' : '') + ' de-btn-pview-hide" de-num="' + this.num + '">' +
				'<use class="de-btn-hide-use" xlink:href="#de-symbol-post-hide"/>' +
				'<use class="de-btn-unhide-use" xlink:href="#de-symbol-post-unhide"/></svg>' + pText;
			$each($Q((!aib.t && post.isOp ? aib.qOmitted + ', ' : '') +
				'.de-img-wrapper, .de-after-fimg', el), $del);
			$each($Q(aib.qPostImg, el), function(el) {
				$show(el.parentNode);
			});
			node = $q('.de-link-parent', el);
			if(node) {
				node.classList.remove('de-link-parent');
			}
			if(Cfg.addYouTube && post.videos.hasLinks) {
				if(post.videos.playerInfo !== null) {
					Object.defineProperty(this, 'videos', {
						value: new Videos(this, $q('.de-video-obj', el), post.videos.playerInfo)
					});
				}
				this.videos.updatePost($Q('.de-video-link', post.el), $Q('.de-video-link', el), true);
			}
			if(Cfg.addImgs) {
				$each($Q('.de-img-pre', el), $show);
			}
			if(Cfg.markViewed) {
				this._readDelay = setTimeout(function(pst) {
					if(!pst.viewed) {
						pst.el.classList.add('de-viewed');
						pst.viewed = true;
					}
					var arr = (sesStorage['de-viewed'] || '').split(',');
					arr.push(pst.num);
					sesStorage['de-viewed'] = arr;
				}, post.text.length > 100 ? 2e3 : 500, post);
			}
		}
		el.addEventListener('click', this, true);
		this._showPview(el);
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
			el.style.animationName = 'de-post-open-' + (this._isTop ? 't' : 'b') + (this._isLeft ? 'l' : 'r');
		}
	}
}
Pview.top = null;
Pview._delTO = null;

class CacheItem {
	constructor(el, count) {
		this.el = el;
		this.count = count;
		this.isOp = count === 0;
		this.itemInited = false;
		this.deleted = false;
		this.viewed = false;
	}
	get msg() {
		var value = $q(aib.qPostMsg, this.el);
		Object.defineProperty(this, 'msg', { configurable: true, value });
		return value;
	}
	get ref() {
		var value = new RefMap(this);
		Object.defineProperty(this, 'ref', { value });
		return value;
	}
	get sage() {
		var value = aib.getSage(this.el);
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
		var pBn = new Map(),
			thr = $q(aib.qThread, form) || form,
			posts = $Q(aib.qRPost + ', ' + aib.qOPost, thr);
		for(var i = 0, len = posts.length; i < len; ++i) {
			var post = posts[i];
			pBn.set(aib.getPNum(post), new CacheItem(post, i + 1));
		}
		pBn.set(tNum, this._opObj = new CacheItem(aib.getOp(thr), 0));
		this._b = b;
		this._tNum = tNum;
		this._tUrl = aib.getThrUrl(b, tNum);
		this._posts = pBn;
		if(Cfg.linksNavig) {
			RefMap.gen(pBn, this._tUrl);
		}
	}
	getPost(num) {
		var pst = this._posts.get(num);
		if(!pst || pst.itemInited) {
			return pst;
		}
		if(num === this._tNum) {
			if(this._b === aib.b && pByNum.has(this._tNum)) {
				pst.ref.makeUnion(pByNum.get(this._tNum).ref);
			}
		}
		pst.el = aib.fixHTML(pst.el);
		delete pst.msg;
		if(pst.ref.hasMap) {
			pst.ref.init(this._tUrl, Cfg.strikeHidd && Post.hiddenNums.size !== 0 ? Post.hiddenNums : null);
		}
		pst.itemInited = true;
		return pst;
	}
}
PviewsCache.purgeSecs = 3e5;
