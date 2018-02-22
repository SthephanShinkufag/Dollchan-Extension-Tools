/* ==[ Posts.js ]=============================================================================================
                                                    POSTS
=========================================================================================================== */

class AbstractPost {
	constructor(thr, num, isOp) {
		this.isOp = isOp;
		this.kid = null;
		this.num = num;
		this.ref = new RefMap(this);
		this.thr = thr;
		this._hasEvents = false;
		this._linkDelay = 0;
		this._menu = null;
		this._menuDelay = 0;
	}
	get hideBtn() {
		const value = this.btns.firstChild;
		Object.defineProperty(this, 'hideBtn', { value });
		return value;
	}
	get images() {
		const value = new PostImages(this);
		Object.defineProperty(this, 'images', { value });
		return value;
	}
	get mp3Obj() {
		const value = $bBegin(this.msg, '<div class="de-mp3"></div>');
		Object.defineProperty(this, 'mp3Obj', { value });
		return value;
	}
	get msg() {
		const value = $q(aib.qPostMsg, this.el);
		Object.defineProperty(this, 'msg', { value, configurable: true });
		return value;
	}
	get trunc() {
		let value = null;
		const el = aib.qTrunc && $q(aib.qTrunc, this.el);
		if(el && /long|full comment|gekürzt|слишком|длинн|мног|полн/i.test(el.textContent)) {
			value = el;
		}
		Object.defineProperty(this, 'trunc', { value, configurable: true });
		return value;
	}
	get videos() {
		const value = Cfg.addYouTube ? new Videos(this) : null;
		Object.defineProperty(this, 'videos', { value });
		return value;
	}
	addFuncs() {
		RefMap.upd(this, true);
		embedAudioLinks(this);
	}
	handleEvent(e) {
		let temp, el = fixEventEl(e.target);
		const { type } = e;
		const isOutEvent = type === 'mouseout';
		const isPview = this instanceof Pview;
		if(type === 'click') {
			switch(e.button) {
			case 0: break;
			case 1: e.stopPropagation();
				/* falls through */
			default: return;
			}
			if(this._menu) {
				this._menu.remove();
				this._menu = null;
			}
			switch(el.tagName) {
			case 'A':
				if(el.classList.contains('de-video-link')) {
					this.videos.clickLink(el, Cfg.addYouTube);
					$pd(e);
					return;
				}
				if((temp = el.firstElementChild) && temp.tagName === 'IMG') {
					el = temp;
				} else {
					temp = el.parentNode;
					if(temp === this.trunc) {
						this._getFullMsg(temp, false);
						$pd(e);
						e.stopPropagation();
					} else if(Cfg.insertNum && pr.form && (this._pref === temp || this._pref === el) &&
						!/Reply|Ответ/.test(el.textContent)
					) {
						$pd(e);
						e.stopPropagation();
						if(!Cfg.showRepBtn) {
							quotetxt = window.getSelection().toString();
							pr.showQuickReply(isPview ? Pview.topParent : this, this.num, !isPview, false);
							quotetxt = '';
						} else if(pr.isQuick || (aib.t && pr.isHidden)) {
							pr.showQuickReply(isPview ? Pview.topParent : this, this.num, false, true);
						} else if(aib.t) {
							const formText = pr.txta.value;
							const isOnNewLine = formText === '' || formText.slice(-1) === '\n';
							$txtInsert(pr.txta, `>>${ this.num }${ isOnNewLine ? '\n' : '' }`);
						} else {
							window.location.assign(el.href.replace(/#i/, '#'));
						}
					} else if((temp = el.textContent)[0] === '>' &&
						temp[1] === '>' && !temp[2].includes('/')
					) {
						const post = pByNum.get(+temp.match(/\d+/));
						if(post) {
							post.selectAndScrollTo();
						}
					}
					return;
				}
				/* falls through */
			case 'IMG':
				if(el.classList.contains('de-video-thumb')) {
					if(Cfg.addYouTube === 3) {
						const { videos } = this;
						videos.currentLink.classList.add('de-current');
						videos.setPlayer(videos.playerInfo, el.classList.contains('de-ytube'));
						$pd(e);
					}
				} else if(Cfg.expandImgs !== 0) {
					this._clickImage(el, e);
				}
				return;
			case 'OBJECT':
			case 'VIDEO':
				if(Cfg.expandImgs !== 0 && !ExpandableMedia.isControlClick(e)) {
					this._clickImage(el, e);
				}
				return;
			}
			if(aib.mak) {
				switch(el.className) {
				case 'fa fa-bolt':
				case 'fa fa-thumbs-down': el = el.parentNode;
					/* falls through */
				case 'like-icon':
				case 'dislike-icon':
				case 'like-caption':
				case 'dislike-caption':
				case 'like-count':
				case 'dislike-count': el = el.parentNode;
					/* falls through */
				case 'like-div':
				case 'dislike-div': {
					const task = el.className.split('-')[0];
					const num = el.id.match(/\d+/)[0];
					$ajax(`/makaba/likes.fcgi?task=${ task }&board=${ aib.b }&num=${ num }`).then(xhr => {
						const data = JSON.parse(xhr.responseText);
						if(data.Status !== 'OK') {
							$popup('err-2chlike', data.Reason);
							return;
						}
						el.classList.add(`${ task }-div-checked`);
						const countEl = $q(`.${ task }-count`, el);
						countEl.textContent = +countEl.textContent + 1;
					}, () => $popup('err-2chlike', Lng.noConnect[lang]));
				}
				}
				if(el.classList.contains('expand-large-comment')) {
					this._getFullMsg(el, false);
					$pd(e);
					e.stopPropagation();
				}
			}
			switch(el.classList[0]) {
			case 'de-btn-expthr': this.thr.loadPosts('all'); return;
			case 'de-btn-fav': this.thr.setFavorState(true, 'user'); return;
			case 'de-btn-fav-sel': this.thr.setFavorState(false, 'user'); return;
			case 'de-btn-hide':
			case 'de-btn-hide-user':
			case 'de-btn-unhide':
			case 'de-btn-unhide-user': this.setUserVisib(!this.hidden); return;
			case 'de-btn-rep':
				pr.showQuickReply(isPview ? Pview.topParent : this, this.num, !isPview, false);
				quotetxt = '';
				return;
			case 'de-btn-sage': Spells.add(9, '', false); return;
			case 'de-btn-stick': this.setSticky(true); return;
			case 'de-btn-stick-on': this.setSticky(false); return;
			}
			return;
		}
		if(!isOutEvent && Cfg.expandImgs &&
			el.tagName === 'IMG' &&
			!el.classList.contains('de-fullimg') &&
			(temp = this.images.getImageByEl(el)) &&
			(temp.isImage || temp.isVideo)
		) {
			el.title = Cfg.expandImgs === 1 ? Lng.expImgInline[lang] : Lng.expImgFull[lang];
		}
		if(!this._hasEvents) {
			this._hasEvents = true;
			this.el.addEventListener('click', this, true);
			this.el.addEventListener('mouseout', this, true);
		}
		switch(el.classList[0]) {
		case 'de-post-btns': el.removeAttribute('title'); return;
		case 'de-btn-rep':
			this.btns.title = Lng.replyToPost[lang];
			if(!isOutEvent) {
				quotetxt = window.getSelection().toString();
			}
			return;
		case 'de-btn-hide':
		case 'de-btn-hide-user':
		case 'de-btn-unhide':
		case 'de-btn-unhide-user':
			this.btns.title = Lng.togglePost[lang];
			if(Cfg.menuHiddBtn && !(this instanceof Pview)) {
				this._addMenu(el, isOutEvent, this._getMenuHide(el));
			}
			return;
		case 'de-btn-expthr':
			this.btns.title = Lng.expandThr[lang];
			if(!(this instanceof Pview)) {
				this._addMenu(el, isOutEvent, $join(Lng.selExpandThr[lang],
					'<span class="de-menu-item" info="thr-exp">', '</span>'));
			}
			return;
		case 'de-btn-fav': this.btns.title = Lng.addFav[lang]; return;
		case 'de-btn-fav-sel': this.btns.title = Lng.delFav[lang]; return;
		case 'de-btn-sage': this.btns.title = 'SAGE'; return;
		case 'de-btn-stick': this.btns.title = Lng.attachPview[lang]; return;
		case 'de-btn-src': this._addMenu(el, isOutEvent, AbstractPost._getMenuImgSrc(el)); return;
		default:
			if(!Cfg.linksNavig || el.tagName !== 'A' || el.lchecked) {
				return;
			}
			if(!el.textContent.startsWith('>>')) {
				el.lchecked = true;
				return;
			}
			// Don't use classList here, 'de-link-pref ' should be first
			el.className = 'de-link-pref ' + el.className;
			/* falls through */
		case 'de-link-ref':
		case 'de-link-pref':
			if(!Cfg.linksNavig) {
				return;
			}
			if(isOutEvent) { // We need to delete previews
				clearTimeout(this._linkDelay);
				if(!(aib.getPostOfEl(fixEventEl(e.relatedTarget)) instanceof Pview) && Pview.top) {
					Pview.top.markToDel(); // If cursor is not over one of previews - delete all previews
				} else if(this.kid) {
					this.kid.markToDel(); // If cursor is over any preview - delete its kids
				}
			} else { // We need to show a preview for this link
				this._linkDelay = setTimeout(() => (this.kid = Pview.show(this, el)), Cfg.linksOver);
			}
			$pd(e);
			e.stopPropagation();
		}
	}
	setFavBtn(state) {
		const el = $q(state ? '.de-btn-fav' : '.de-btn-fav-sel', this.btns);
		if(el) {
			el.setAttribute('class', state ? 'de-btn-fav-sel' : 'de-btn-fav');
		}
	}
	updateMsg(newMsg, sRunner) {
		let videoExt, videoLinks;
		const origMsg = aib.dobr ? this.msg.firstElementChild : this.msg;
		if(Cfg.addYouTube) {
			videoExt = $q('.de-video-ext', origMsg);
			videoLinks = $Q(':not(.de-video-ext) > .de-video-link', origMsg);
		}
		$replace(origMsg, newMsg);
		Object.defineProperties(this, {
			msg   : { configurable: true, value: newMsg },
			trunc : { configurable: true, value: null }
		});
		Post.Сontent.remove(this);
		if(Cfg.addYouTube) {
			this.videos.updatePost(videoLinks, $Q('a[href*="youtu"], a[href*="vimeo.com"]', newMsg), false);
			if(videoExt) {
				newMsg.appendChild(videoExt);
			}
		}
		this.addFuncs();
		sRunner.run(this);
		embedPostMsgImages(this.el);
		closePopup('load-fullmsg');
	}

	static _getMenuImgSrc(el) {
		const link = el.nextSibling;
		const p = encodeURIComponent(link.getAttribute('de-href') || link.href) +
			'" target="_blank">' + Lng.searchIn[lang];
		return `<a class="de-menu-item ${ [
			`de-src-google" href="https://www.google.com/searchbyimage?image_url=${ p }Google`,
			`de-src-yandex" href="http://yandex.ru/images/search?rpt=imageview&img_url=${ p }Yandex`,
			`de-src-tineye" href="http://tineye.com/search/?url=${ p }TinEye`,
			`de-src-saucenao" href="http://saucenao.com/search.php?url=${ p }SauceNAO`,
			`de-src-iqdb" href="http://iqdb.org/?url=${ p }IQDB`,
			`de-src-whatanime" href="http://whatanime.ga/?auto&url=${
				aib.iichan ? 'http://reho.st/' + p : p }WhatAnime`
		].join('</a><a class="de-menu-item ') }</a>`;
	}
	_addMenu(el, isOutEvent, html) {
		if(this.menu && this.menu.parentEl === el) {
			return;
		}
		if(isOutEvent) {
			clearTimeout(this._menuDelay);
		} else {
			this._menuDelay = setTimeout(() => this._showMenu(el, html), Cfg.linksOver);
		}
	}
	_clickImage(el, e) {
		const data = this.images.getImageByEl(el);
		if(!data || (!data.isImage && !data.isVideo)) {
			return;
		}
		data.expand((Cfg.expandImgs === 1) ^ e.ctrlKey, e);
		$pd(e);
		e.stopPropagation();
	}
	_getFullMsg(el, isInit) {
		if(aib.delTruncMsg) {
			aib.delTruncMsg(this, el, isInit);
			return;
		}
		if(!isInit) {
			$popup('load-fullmsg', Lng.loading[lang], true);
		}
		ajaxLoad(aib.getThrUrl(aib.b, this.tNum)).then(form => {
			const maybeSpells = new Maybe(SpellsRunner);
			if(this.isOp) {
				this.updateMsg(aib.fixHTML(doc.adoptNode($q(aib.qPostMsg, form))), maybeSpells.value);
				$del(el);
			} else {
				const els = $Q(aib.qRPost, form);
				for(let i = 0, len = els.length; i < len; i++) {
					if(this.num === aib.getPNum(els[i])) {
						this.updateMsg(
							aib.fixHTML(doc.adoptNode($q(aib.qPostMsg, els[i]))),
							maybeSpells.value);
						$del(el);
						break;
					}
				}
			}
			maybeSpells.end();
		}, emptyFn);
	}
	_showMenu(el, html) {
		if(this._menu) {
			this._menu.remove();
		}
		this._menu = new Menu(el, html, el => this._clickMenu(el), false);
		this._menu.onremove = () => (this._menu = null);
	}
}

class Post extends AbstractPost {
	constructor(el, thr, num, count, isOp, prev) {
		super(thr, num, isOp);
		this.count = count;
		this.deleted = false;
		this.el = el;
		this.hidden = false;
		this.next = null;
		this.omitted = false;
		this.prev = prev;
		this.spellHidden = false;
		this.userToggled = false;
		this.viewed = false;
		this._selRange = null;
		this._selText = '';
		if(prev) {
			prev.next = this;
		}
		pByEl.set(el, this);
		pByNum.set(num, this);
		if(MyPosts.has(num)) {
			this.el.classList.add('de-mypost');
		}
		const refEl = $q(aib.qPostRef, el);
		let html = `<span class="de-post-btns${ isOp ? '' : ' de-post-counter' }">` +
			'<svg class="de-btn-hide"><use class="de-btn-hide-use" xlink:href="#de-symbol-post-hide"/>' +
			'<use class="de-btn-unhide-use" xlink:href="#de-symbol-post-unhide"/></svg>' +
			'<svg class="de-btn-rep"><use xlink:href="#de-symbol-post-rep"/></svg>';
		this._pref = refEl;
		if(isOp) {
			if(!aib.t) {
				html += '<svg class="de-btn-expthr"><use xlink:href="#de-symbol-post-expthr"/></svg>';
			}
			html += '<svg class="de-btn-fav"><use xlink:href="#de-symbol-post-fav"/></svg>';
		}
		this.sage = aib.getSage(el);
		if(this.sage) {
			html += '<svg class="de-btn-sage"><use xlink:href="#de-symbol-post-sage"/></svg>';
		}
		this.btns = $aEnd(refEl, html + '</span>');
		if(Cfg.expandTrunc && this.trunc) {
			this._getFullMsg(this.trunc, true);
		}
		el.addEventListener('mouseover', this, true);
	}
	static addMark(postEl, forced) {
		if(!doc.hidden && !forced) {
			Post.clearMarks();
		} else {
			if(!Post.hasNew) {
				Post.hasNew = true;
				doc.addEventListener('click', Post.clearMarks, true);
			}
			postEl.classList.add('de-new-post');
		}
	}
	static clearMarks() {
		if(Post.hasNew) {
			Post.hasNew = false;
			$each($Q('.de-new-post'), el => el.classList.remove('de-new-post'));
			doc.removeEventListener('click', Post.clearMarks, true);
		}
	}
	static findSameText(pNum, isHidden, words, curPost) {
		const curWords = Post.getWrds(curPost.text);
		const len = curWords.length;
		let i = words.length;
		const olen = i;
		let _olen = i;
		let n = 0;
		if(len < olen * 0.4 || len > olen * 3) {
			return;
		}
		while(i--) {
			if(olen > 6 && words[i].length < 3) {
				_olen--;
				continue;
			}
			let j = len;
			while(j--) {
				if(curWords[j] === words[i] || words[i].match(/>>\d+/) && curWords[j].match(/>>\d+/)) {
					n++;
				}
			}
		}
		if(n < _olen * 0.4 || len > _olen * 3) {
			return;
		}
		if(isHidden) {
			if(curPost.spellHidden) {
				Post.Note.reset();
			} else {
				curPost.setVisib(false);
			}
			if(curPost.userToggled) {
				HiddenPosts.remove(curPost.num);
				curPost.userToggled = false;
			}
		} else {
			curPost.setUserVisib(true, true, 'similar to >>' + pNum);
		}
		return false;
	}
	static getWrds(text) {
		return text.replace(/\s+/g, ' ').replace(/[^a-zа-яё ]/ig, '').trim().substring(0, 800).split(' ');
	}
	static hideContent(headerEl, hideBtn, isUser, hide) {
		if(hide) {
			if(aib.t) {
				Thread.first.hidCounter++;
			}
			hideBtn.setAttribute('class', isUser ? 'de-btn-unhide-user' : 'de-btn-unhide');
			if(headerEl) {
				for(let el = headerEl.nextElementSibling; el; el = el.nextElementSibling) {
					el.classList.add('de-post-hiddencontent');
				}
			}
		} else {
			hideBtn.setAttribute('class', isUser ? 'de-btn-hide-user' : 'de-btn-hide');
			$each($Q('.de-post-hiddencontent', headerEl.parentNode),
				el => el.classList.remove('de-post-hiddencontent'));
		}
	}
	get banned() {
		const value = aib.getBanId(this.el);
		Object.defineProperty(this, 'banned', { value, writable: true });
		return value;
	}
	get bottom() {
		return (this.isOp && this.hidden ? this.thr.el.previousElementSibling : this.el)
			.getBoundingClientRect().bottom;
	}
	get headerEl() {
		return new Post.Сontent(this).headerEl;
	}
	get html() {
		return new Post.Сontent(this).html;
	}
	get nextInThread() {
		const post = this.next;
		return !post || post.count === 0 ? null : post;
	}
	get nextNotDeleted() {
		let post = this.nextInThread;
		while(post && post.deleted) {
			post = post.nextInThread;
		}
		return post;
	}
	get note() {
		const value = new Post.Note(this);
		Object.defineProperty(this, 'note', { value });
		return value;
	}
	get posterName() {
		return new Post.Сontent(this).posterName;
	}
	get posterTrip() {
		return new Post.Сontent(this).posterTrip;
	}
	get subj() {
		return new Post.Сontent(this).subj;
	}
	get text() {
		return new Post.Сontent(this).text;
	}
	get title() {
		return new Post.Сontent(this).title;
	}
	get tNum() {
		return this.thr.thrId;
	}
	get top() {
		return (this.isOp && this.hidden ? this.thr.el.previousElementSibling : this.el)
			.getBoundingClientRect().top;
	}
	get wrap() {
		return new Post.Сontent(this).wrap;
	}
	addFuncs() {
		super.addFuncs();
		if(isExpImg) {
			this.toggleImages(true, false);
		}
	}
	delete(removeEl) {
		if(removeEl) {
			$del(this.wrap);
			pByEl.delete(this.el);
			pByNum.delete(this.num);
			if(this.hidden) {
				this.ref.unhide();
			}
			RefMap.upd(this, false);
			if((this.prev.next = this.next)) {
				this.next.prev = this.prev;
			}
		} else {
			this.deleted = true;
			this.btns.classList.remove('de-post-counter');
			this.btns.classList.add('de-post-deleted');
			this.el.classList.add('de-post-removed');
			this.wrap.classList.add('de-wrap-removed');
			($q('input[type="checkbox"]', this.el) || {}).disabled = true;
		}
	}
	getAdjacentVisPost(toUp) {
		let post = toUp ? this.prev : this.next;
		while(post) {
			if(post.thr.hidden) {
				post = toUp ? post.thr.op.prev : post.thr.last.next;
			} else if(post.hidden || post.omitted) {
				post = toUp ? post.prev : post.next;
			} else {
				return post;
			}
		}
		return null;
	}
	hideContent(needToHide) {
		if(this.isOp) {
			if(!aib.t) {
				$toggle(this.thr.el, !needToHide);
			}
		} else {
			Post.hideContent(this.headerEl, this.hideBtn, this.userToggled, needToHide);
		}
	}
	select() {
		if(this.isOp) {
			if(this.hidden) {
				this.thr.el.previousElementSibling.classList.add('de-selected');
			}
			this.thr.el.classList.add('de-selected');
		} else {
			this.el.classList.add('de-selected');
		}
	}
	selectAndScrollTo(scrollNode = this.el) {
		scrollTo(0, window.pageYOffset + scrollNode.getBoundingClientRect().top -
			Post.sizing.wHeight / 2 + scrollNode.clientHeight / 2);
		if(HotKeys.enabled) {
			if(HotKeys.cPost) {
				HotKeys.cPost.unselect();
			}
			HotKeys.cPost = this;
			HotKeys.lastPageOffset = window.pageYOffset;
		} else {
			const el = $q('.de-selected');
			if(el) {
				el.unselect();
			}
		}
		this.select();
	}
	setUserVisib(hide, save = true, note = null) {
		this.userToggled = true;
		this.setVisib(hide, note);
		if(this.isOp || this.hidden === hide) {
			this.hideBtn.setAttribute('class', hide ? 'de-btn-unhide-user' : 'de-btn-hide-user');
		}
		if(save) {
			HiddenPosts.set(this.num, this.thr.num, hide);
			if(this.isOp) {
				if(hide) {
					HiddenThreads.set(this.num, this.num, this.title);
				} else {
					HiddenThreads.remove(this.num);
				}
			}
			locStorage['__de-post'] = JSON.stringify({
				hide,
				brd    : aib.b,
				num    : this.num,
				thrNum : this.thr.num,
				title  : this.isOp ? this.title : ''
			});
			locStorage.removeItem('__de-post');
		}
		if(hide) {
			this.ref.hide();
		} else {
			this.ref.unhide();
		}
	}
	setVisib(hide, note = null) {
		if(this.hidden === hide) {
			if(hide && note) {
				this.note.set(note);
			}
			return;
		}
		if(this.isOp) {
			this.thr.hidden = hide;
		} else {
			if(Cfg.delHiddPost === 1 || Cfg.delHiddPost === 2) {
				if(hide) {
					this.wrap.classList.add('de-hidden');
				} else {
					this.wrap.classList.remove('de-hidden');
				}
			} else {
				this._pref.onmouseover = this._pref.onmouseout = !hide ? null : e => {
					const yOffset = window.pageYOffset;
					this.hideContent(e.type === 'mouseout');
					scrollTo(window.pageXOffset, yOffset);
				};
			}
		}
		if(Cfg.strikeHidd) {
			setTimeout(() => this._strikePostNum(hide), 50);
		}
		if(hide) {
			this.note.set(note);
		} else {
			this.note.hide();
		}
		this.hidden = hide;
		this.hideContent(hide);
	}
	spellHide(note) {
		this.spellHidden = true;
		if(!this.userToggled) {
			this.setVisib(true, note);
			this.ref.hide();
		}
	}
	spellUnhide() {
		this.spellHidden = false;
		if(!this.userToggled) {
			this.setVisib(false);
			this.ref.unhide();
		}
	}
	toggleImages(expand = !this.images.expanded, isExpandVideos = true) {
		for(const image of this.images) {
			if((image.isImage || isExpandVideos && image.isVideo) && (image.expanded ^ expand)) {
				if(expand) {
					image.expand(true, null);
				} else {
					image.collapse(null);
				}
			}
		}
	}
	unselect() {
		if(this.isOp) {
			const el = $id('de-thr-hid-' + this.num);
			if(el) {
				el.classList.remove('de-selected');
			}
			this.thr.el.classList.remove('de-selected');
		} else {
			this.el.classList.remove('de-selected');
		}
	}

	_clickMenu(el) {
		const { hidden } = this;
		switch(el.getAttribute('info')) {
		case 'hide-sel': {
			let { startContainer: start, endContainer: end } = this._selRange;
			if(start.nodeType === 3) {
				start = start.parentNode;
			}
			if(end.nodeType === 3) {
				end = end.parentNode;
			}
			const inMsgSel = `${ aib.qPostMsg }, ${ aib.qPostMsg } *`;
			if((nav.matchesSelector(start, inMsgSel) && nav.matchesSelector(end, inMsgSel)) || (
				nav.matchesSelector(start, aib.qPostSubj) &&
				nav.matchesSelector(end, aib.qPostSubj)
			)) {
				if(this._selText.includes('\n')) {
					Spells.add(1 /* #exp */,
						`/${ quoteReg(this._selText).replace(/\r?\n/g, '\\n') }/`, false);
				} else {
					Spells.add(0 /* #words */, this._selText.toLowerCase(), false);
				}
			} else {
				dummy.innerHTML = '';
				dummy.appendChild(this._selRange.cloneContents());
				Spells.add(2 /* #exph */,
					`/${ quoteReg(dummy.innerHTML.replace(/^<[^>]+>|<[^>]+>$/g, '')) }/`, false);
			}
			return;
		}
		case 'hide-name': Spells.add(6 /* #name */, this.posterName, false); return;
		case 'hide-trip': Spells.add(7 /* #trip */, this.posterTrip, false); return;
		case 'hide-img': {
			const { weight: w, width: wi, height: h } = this.images.firstAttach;
			Spells.add(8 /* #img */, [0, [w, w], [wi, wi, h, h]], false);
			return;
		}
		case 'hide-imgn':
			Spells.add(3 /* #imgn */, `/${ quoteReg(this.images.firstAttach.name) }/`, false);
			return;
		case 'hide-ihash':
			ImagesHashStorage.getHash(this.images.firstAttach).then(hash => {
				if(hash !== -1) {
					Spells.add(4 /* #ihash */, hash, false);
				}
			});
			return;
		case 'hide-noimg': Spells.add(0x108 /* (#all & !#img) */, '', true); return;
		case 'hide-text': {
			const { num } = this;
			const words = Post.getWrds(this.text);
			for(let post = Thread.first.op; post; post = post.next) {
				Post.findSameText(num, hidden, words, post);
			}
			return;
		}
		case 'hide-notext': Spells.add(0x10B /* (#all & !#tlen) */, '', true); return;
		case 'hide-refs':
			if(hidden) {
				this.ref.unhide(true);
			} else {
				this.ref.hide(true);
			}
			this.setUserVisib(!hidden);
			return;
		case 'thr-exp': {
			const task = parseInt(el.textContent.match(/\d+/), 10);
			this.thr.loadPosts(!task ? 'all' : task === 10 ? 'more' : task);
		}
		}
	}
	_getMenuHide() {
		let str = '';
		const sel = window.getSelection();
		const ssel = sel.toString().trim();
		const getItem = name => `<span info="hide-${ name }" class="de-menu-item">${
			Lng.selHiderMenu[name][lang] }</span>`;
		if(ssel) {
			this._selText = ssel;
			this._selRange = sel.getRangeAt(0);
			str += getItem('sel');
		}
		if(this.posterName) {
			str += getItem('name');
		}
		if(this.posterTrip) {
			str += getItem('trip');
		}
		if(this.images.hasAttachments) {
			str += getItem('img');
			str += getItem('imgn');
			str += getItem('ihash');
		} else {
			str += getItem('noimg');
		}
		if(this.text) {
			str += getItem('text');
		} else {
			str += getItem('notext');
		}
		if(!Cfg.hideRefPsts && this.ref.hasMap) {
			str += getItem('refs');
		}
		return str;
	}
	_strikePostNum(isHide) {
		const { num } = this;
		if(isHide) {
			Post.hiddenNums.add(+num);
		} else {
			Post.hiddenNums.delete(+num);
		}
		$each($Q(`[de-form] a[href*="${ aib.anchor + num }"]`), isHide ? function(el) {
			el.classList.add('de-link-hid');
			if(Cfg.removeHidd && el.classList.contains('de-link-ref')) {
				const refmap = el.parentNode;
				if(!$q('.de-link-ref:not(.de-link-hid)', refmap)) {
					$hide(refmap);
				}
			}
		} : function(el) {
			el.classList.remove('de-link-hid');
			if(Cfg.removeHidd && el.classList.contains('de-link-ref')) {
				const refmap = el.parentNode;
				if($q('.de-link-ref:not(.de-link-hid)', refmap)) {
					$show(refmap);
				}
			}
		});
	}
}
Post.hasNew = false;
Post.hiddenNums = new Set();
Post.Сontent = class PostContent extends TemporaryContent {
	constructor(post) {
		super(post);
		if(this._inited) {
			return;
		}
		this._inited = true;
		this.el = post.el;
		this.post = post;
	}
	get headerEl() {
		const value = $q(aib.qPostHeader, this.el);
		Object.defineProperty(this, 'headerEl', { value });
		return value;
	}
	get html() {
		const value = this.el.outerHTML;
		Object.defineProperty(this, 'html', { value });
		return value;
	}
	get posterName() {
		const pName = $q(aib.qPostName, this.el);
		const value = pName ? pName.textContent.trim().replace(/\s/g, ' ') : '';
		Object.defineProperty(this, 'posterName', { value });
		return value;
	}
	get posterTrip() {
		const pTrip = $q(aib.qPostTrip, this.el);
		const value = pTrip ? pTrip.textContent : '';
		Object.defineProperty(this, 'posterTrip', { value });
		return value;
	}
	get subj() {
		const subj = $q(aib.qPostSubj, this.el);
		const value = subj ? subj.textContent : '';
		Object.defineProperty(this, 'subj', { value });
		return value;
	}
	get text() {
		const value = this.post.msg.innerHTML
			.replace(/<\/?(?:br|p|li)[^>]*?>/gi, '\n')
			.replace(/<[^>]+?>/g, '')
			.replace(/&gt;/g, '>')
			.replace(/&lt;/g, '<')
			.replace(/&nbsp;/g, '\u00A0').trim();
		Object.defineProperty(this, 'text', { value });
		return value;
	}
	get title() {
		const value = this.subj || this.text.substring(0, 70).replace(/\s+/g, ' ');
		Object.defineProperty(this, 'title', { value });
		return value;
	}
	get wrap() {
		const value = aib.getPostWrap(this.el, this.post.isOp);
		Object.defineProperty(this, 'wrap', { value });
		return value;
	}
};
Post.Note = class PostNote {
	constructor(post) {
		this.text = null;
		this._post = post;
		this.isHideThr = this._post.isOp && !aib.t; // Hide threads only on board
		if(!this.isHideThr) {
			// Create usual post note
			this._noteEl = this.textEl = $bEnd(post.btns, '<span class="de-post-note"></span>');
			return;
		}
		// Create a stub before the thread, that also hides thread by CSS
		this._noteEl = $bBegin(post.thr.el, `<div class="${ aib.cReply } de-thr-hid" id="de-thr-hid-${
			post.num }">${ Lng.hiddenThr[lang] }: <a href="#">№${ post.num }</a>
			<span class="de-thread-note"></span>
		</div>`);
		this._aEl = $q('a', this._noteEl);
		this.textEl = this._aEl.nextElementSibling;
	}
	hide() {
		if(this.isHideThr) {
			this._aEl.onmouseover = this._aEl.onmouseout = this._aEl.onclick = null;
		}
		$hide(this._noteEl);
	}
	reset() {
		this.text = null;
		if(this.isHideThr) {
			this.set(null);
		} else {
			this.hide();
		}
	}
	set(note) {
		this.text = note;
		let text;
		if(this.isHideThr) {
			this._aEl.onmouseover = this._aEl.onmouseout = e => this._post.hideContent(e.type === 'mouseout');
			this._aEl.onclick = e => {
				$pd(e);
				this._post.setUserVisib(!this._post.hidden);
			};
			text = (this._post.title ? `(${ this._post.title }) ` : '') +
				(note ? `[autohide: ${ note }]` : '');
		} else {
			text = note ? `autohide: ${ note }` : '';
		}
		this.textEl.textContent = text;
		$show(this._noteEl);
	}
};
Post.sizing = {
	get dPxRatio() {
		const value = window.devicePixelRatio || 1;
		Object.defineProperty(this, 'dPxRatio', { value });
		return value;
	},
	get wHeight() {
		const value = nav.viewportHeight();
		if(!this._enabled) {
			doc.defaultView.addEventListener('resize', this);
			this._enabled = true;
		}
		Object.defineProperties(this, {
			wHeight : { writable: true, configurable: true, value },
			wWidth  : { writable: true, configurable: true, value: nav.viewportWidth() }
		});
		return value;
	},
	get wWidth() {
		const value = nav.viewportWidth();
		if(!this._enabled) {
			doc.defaultView.addEventListener('resize', this);
			this._enabled = true;
		}
		Object.defineProperties(this, {
			wHeight : { writable: true, configurable: true, value: nav.viewportHeight() },
			wWidth  : { writable: true, configurable: true, value }
		});
		return value;
	},
	handleEvent() {
		this.wHeight = nav.viewportHeight();
		this.wWidth = nav.viewportWidth();
	},

	_enabled: false
};

class PostImages {
	constructor(post) {
		let first = null, last = null, els = $Q(aib.qPostImg, post.el);
		let hasAttachments = false;
		const filesMap = new Map();
		for(let i = 0, len = els.length; i < len; ++i) {
			const el = els[i];
			last = new Attachment(post, el, last);
			filesMap.set(el, last);
			hasAttachments = true;
			if(!first) {
				first = last;
			}
		}
		if(Cfg.addImgs) {
			els = $Q('.de-img-pre', post.el);
			for(let i = 0, len = els.length; i < len; ++i) {
				const el = els[i];
				last = new EmbeddedImage(post, el, last);
				filesMap.set(el, last);
				if(!first) {
					first = last;
				}
			}
		}
		this.first = first;
		this.last = last;
		this.hasAttachments = hasAttachments;
		this._map = filesMap;
	}
	get expanded() {
		for(let img = this.first; img; img = img.next) {
			if(img.expanded) {
				return true;
			}
		}
		return false;
	}
	get firstAttach() {
		return this.hasAttachments ? this.first : null;
	}
	getImageByEl(el) {
		return this._map.get(el);
	}
	[Symbol.iterator]() {
		return {
			_img: this.first,
			next() {
				const value = this._img;
				if(value) {
					this._img = value.next;
					return { value, done: false };
				}
				return { done: true };
			}
		};
	}
}
