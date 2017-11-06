/* ==[ Threads.js ]===========================================================================================
                                                   THREADS
=========================================================================================================== */

class Thread {
	static get first() {
		return DelForm.first.firstThr;
	}
	static get last() {
		return DelForm.last.lastThr;
	}
	static removeSavedData() {
		// TODO: remove relevant spells, hidden posts and user posts
	}
	constructor(el, num, prev, form) {
		var els = $Q(aib.qRPost, el),
			len = els.length,
			omt = aib.t ? 1 : aib.getOmitted($q(aib.qOmitted, el), len);
		this.hasNew = false;
		this.hidden = false;
		this.hidCounter = 0;
		this.loadCount = 0;
		this.next = null;
		this.num = num;
		this.thrId = aib.thrId ? aib.thrId(el) : num;
		this.pcount = omt + len;
		this.el = el;
		this.prev = prev;
		this.form = form;
		this._lastModified = '';
		if(prev) {
			prev.next = this;
		}
		var lastPost = this.op = new Post(aib.getOp(el), this, num, 0, true, prev ? prev.last : null);
		pByEl.set(el, lastPost);
		for(var i = 0; i < len; i++) {
			var pEl = els[i];
			lastPost = new Post(pEl, this, aib.getPNum(pEl), omt + i, false, lastPost);
		}
		this.last = lastPost;
		el.style.counterReset = 'de-cnt ' + omt;
		el.setAttribute('de-thread', null);
		visPosts = Math.max(visPosts, len);
		if(aib.tiny) {
			var temp = el.lastChild;
			if(temp !== this.op.el) {
				$after(el, temp);
			}
			$del($q('.clear', el));
		}
		if(!aib.t) {
			this.btns = $bEnd(el, '<div class="de-thread-buttons">' +
				'<span class="de-thread-updater">[<a class="de-abtn" href="#"></a>]</span></div>');
			var updBtn = this.btns.firstChild;
			updBtn.onclick = e => {
				$pd(e);
				this.loadPosts('new');
			};
			if(Cfg.hideReplies) {
				var repBtn = $bEnd(this.btns,
					' <span class="de-replies-btn">[<a class="de-abtn" href="#"></a>]</span>');
				repBtn.onclick = e => {
					$pd(e);
					var nextCoord = !this.next || this.last.omitted ? null : this.next.top;
					this._toggleReplies(repBtn, updBtn);
					if(nextCoord) {
						scrollTo(window.pageXOffset, window.pageYOffset + this.next.top - nextCoord);
					}
				};
				this._toggleReplies(repBtn, updBtn);
			}
		}
	}
	get bottom() {
		return this.hidden ? this.op.bottom : this.last.bottom;
	}
	get lastNotDeleted() {
		var post = this.last;
		while(post.deleted) {
			post = post.prev;
		}
		return post;
	}
	get nextNotHidden() {
		for(var thr = this.next; thr && thr.hidden; thr = thr.next) /* empty */;
		return thr;
	}
	get prevNotHidden() {
		for(var thr = this.prev; thr && thr.hidden; thr = thr.prev) /* empty */;
		return thr;
	}
	get userTouched() {
		var value = new Map();
		Object.defineProperty(this, 'userTouched', { value });
		return value;
	}
	get top() {
		return this.op.top;
	}
	deletePost(post, delAll, removePost) {
		SpellsRunner.cachedData = null;
		let count = 0;
		do {
			if(removePost && this.last === post) {
				this.last = post.prev;
			}
			post.delete(removePost);
			post = post.nextNotDeleted;
			count++;
		} while(delAll && post);
		for(var tPost = post; tPost; tPost = tPost.nextInThread) {
			tPost.count -= count;
		}
		this.pcount -= count;
		return post;
	}
	/*
	* Thread loading via ajax.
	*   Calls from the list of threads, not in a thread.
	*   Adds posts to current thread accoring to task:
	* @param {String|Number} task
	*   'new'    - get new posts,
	*   'all'    - get all posts,
	*   'more'   - show 10 omitted posts + get new posts
	*   {number} - get last N posts
	* @param {Boolean} isSmartScroll - keeps the scroll position relative to the next thread.
	* @param {Boolean} isInformUser - shows a popup with waiting animation
	* @returns {Promise} - resolves with null, to chain with function when loading ends
	*/
	loadPosts(task, isSmartScroll = false, isInformUser = true) {
		if(isInformUser) {
			$popup('load-thr', Lng.loading[lang], true);
		}
		return ajaxPostsLoad(aib.b, this.thrId, false).then(
			pBuilder => this._loadFromBuilder(task, isSmartScroll, pBuilder),
			e => $popup('load-thr', getErrorMessage(e)));
	}
	/*
	* New posts loading via ajax.
	*  Calls by thread updater, by clicking on >>[Get new posts] button, and after sending a reply.
	*  Adds new posts to the end of current thread.
	*  @returns {Promise} - resolves with Object, { newCount: Number, locked: Boolean }
	*/
	loadNewPosts() {
		return ajaxPostsLoad(aib.b, this.thrId, true).then(
			pBuilder => pBuilder ? this._loadNewFromBuilder(pBuilder) : { newCount: 0, locked: false });
	}
	setFavorState(val, type) {
		this.op.setFavBtn(val);
		readFavorites().then(fav => {
			const b = aib.b;
			const h = aib.host;
			const num = this.thrId;
			if(val) {
				if(!fav[h]) {
					fav[h] = {};
				}
				if(!fav[h][b]) {
					fav[h][b] = {};
				}
				fav[h][b].url = aib.prot + '//' + aib.host + aib.getPageUrl(b, 0);
				fav[h][b][num] = {
					cnt  : this.pcount,
					new  : 0,
					you  : 0,
					txt  : this.op.title,
					url  : aib.getThrUrl(b, num),
					last : aib.anchor + this.last.num,
					type
				};
			} else {
				removeFavoriteEntry(fav, h, b, num);
			}
			saveFavorites(fav);
		});
	}
	updateHidden(data) {
		var thr = this;
		do {
			var realHid = data ? data.hasOwnProperty(thr.num) : false;
			if(thr.hidden ^ realHid) {
				if(realHid) {
					thr.op.setUserVisib(true, false);
					data[thr.num] = thr.op.title;
				} else if(thr.hidden) {
					thr.op.setUserVisib(false, false);
				}
			}
		} while((thr = thr.next));
	}

	_addPost(parent, el, i, prev, maybeVParser) {
		var post, num = aib.getPNum(el),
			wrap = doc.adoptNode(aib.getPostWrap(el, false));
		post = new Post(el, this, num, i, false, prev);
		parent.appendChild(wrap);
		if(aib.t && !doc.hidden && Cfg.animation) {
			$animate(post.el, 'de-post-new');
		}
		if(this.userTouched.has(num)) {
			post.setUserVisib(this.userTouched.get(num), false);
			this.userTouched.delete(num);
		}
		if(maybeVParser.value) {
			maybeVParser.value.parse(post);
		}
		processImagesLinks(el);
		post.addFuncs();
		preloadImages(post);
		if(aib.t && Cfg.markNewPosts) {
			Post.addMark(el, false);
		}
		return post;
	}
	_checkBans(pBuilder) {
		if(!aib.qBan) {
			return;
		}
		for(let [banId, bNum, bEl] of pBuilder.bannedPostsData()) {
			let post = bNum ? pByNum.get(bNum) : this.op;
			if(post && post.banned !== banId) {
				$del($q(aib.qBan, post.el));
				post.msg.appendChild(bEl);
				post.banned = banId;
			}
		}
	}
	_toggleReplies(repBtn, updBtn) {
		var isHide = !this.last.omitted;
		for(var i = 0, post = this.op; post !== this.last; i++) {
			post = post.next;
			if(isHide) {
				post.wrap.classList.add('de-hidden');
				post.omitted = true;
			} else {
				post.wrap.classList.remove('de-hidden');
				post.omitted = false;
			}
		}
		repBtn.firstElementChild.className = 'de-abtn ' + (isHide ? 'de-replies-show' : 'de-replies-hide');
		$toggle(updBtn, !isHide);
		var colBtn = $q('.de-thread-collapse', this.el);
		if(colBtn) {
			$toggle(colBtn, !isHide);
		}
		$del($q(aib.qOmitted + ', .de-omitted', this.el));
		i = this.pcount - 1 - (isHide ? 0 : i);
		if(i) {
			this.op.el.insertAdjacentHTML('afterend', '<span class="de-omitted">' + i + '</span> ');
		}
	}
	_importPosts(last, pBuilder, begin, end, maybeVParser, maybeSpells) {
		var fragm, newCount = end - begin,
			newVisCount = newCount,
			nums = [];
		if(aib.JsonBuilder && nav.hasTemplate) {
			let temp = document.createElement('template');
			let html = [];
			for(let i = begin; i < end; ++i) {
				html.push(pBuilder.getPostHTML(i));
				nums.push(pBuilder.getPNum(i));
			}
			temp.innerHTML = aib.fixHTML(html.join(''));
			fragm = temp.content;
			let posts = $Q(aib.qRPost, fragm);
			for(let i = 0, len = posts.length; i < len; ++i) {
				last = this._addPost(fragm, posts[i], begin + i + 1, last, maybeVParser);
				newVisCount -= maybeSpells.value.run(last);
			}
		} else {
			fragm = doc.createDocumentFragment();
			for(; begin < end; ++begin) {
				last = this._addPost(fragm, pBuilder.getPostEl(begin), begin + 1, last, maybeVParser);
				nums.push(last.num);
				newVisCount -= maybeSpells.value.run(last);
			}
		}
		return [newCount, newVisCount, fragm, last, nums];
	}
	_loadFromBuilder(last, smartScroll, pBuilder) {
		var nextCoord, maybeSpells = new Maybe(SpellsRunner),
			op = this.op,
			thrEl = this.el;
		if(smartScroll) {
			if(this.next) {
				nextCoord = this.next.top;
			} else {
				smartScroll = false;
			}
		}
		pr.closeReply();
		$del($q(aib.qOmitted + ', .de-omitted', thrEl));
		if(this.loadCount === 0) {
			if(op.trunc) {
				op.updateMsg(pBuilder.getOpMessage(), maybeSpells.value);
			}
			op.ref.removeMap();
		}
		this.loadCount++;
		this._parsePosts(pBuilder);
		var needToHide, needToOmit, needToShow, post = op.next,
			needRMUpdate = false,
			existed = this.pcount === 1 ? 0 : this.pcount - post.count;
		switch(last) {
		case 'new': // get new posts
			needToHide = $Q('.de-hidden', thrEl).length;
			needToOmit = needToHide + post.count - 1;
			needToShow = pBuilder.length - needToOmit;
			break;
		case 'all': // get all posts
			needToHide = needToOmit = 0;
			needToShow = pBuilder.length;
			break;
		case 'more': // show 10 omitted posts + get new posts
			needToHide = $Q('.de-hidden', thrEl).length - 10;
			needToOmit = Math.max(needToHide + post.count - 1, 0);
			needToHide = Math.max(needToHide, 0);
			needToShow = pBuilder.length - needToOmit;
			break;
		default: // get last posts
			needToHide = Math.max(existed - last, 0);
			needToOmit = Math.max(pBuilder.length - last, 0);
			needToShow = last;
		}
		if(needToHide) {
			while(existed-- !== needToShow) {
				post.wrap.classList.add('de-hidden');
				post.omitted = true;
				post = post.next;
			}
		} else {
			let nonExisted = pBuilder.length - existed,
				maybeVParser = new Maybe(Cfg.addYouTube ? VideosParser : null),
				iprv = this._importPosts(op, pBuilder,
					Math.max(0, nonExisted + existed - needToShow),
					nonExisted,
					maybeVParser,
					maybeSpells);
			let [,, fragm, last, nums] = iprv;
			maybeVParser.end();
			$after(op.wrap, fragm);
			DollchanAPI.notify('newpost', nums);
			last.next = post;
			if(post) {
				post.prev = last;
			}
			needRMUpdate = true;
			needToShow = Math.min(nonExisted + existed, needToShow);
		}
		while(existed-- !== 0) {
			if(post.trunc) {
				const newMsg = doc.adoptNode($q(aib.qPostMsg, pBuilder.getPostEl(post.count - 1)));
				post.updateMsg(aib.fixHTML(newMsg), maybeSpells.value);
			}
			if(post.omitted) {
				post.wrap.classList.remove('de-hidden');
				post.omitted = false;
			}
			if(needRMUpdate) {
				RefMap.upd(post, true);
			}
			post = post.next;
		}
		maybeSpells.end();
		thrEl.style.counterReset = 'de-cnt ' + (needToOmit - needToHide + 1);
		var btn = this.btns;
		if(btn !== thrEl.lastChild) {
			thrEl.appendChild(btn);
		}
		if(!$q('.de-thread-collapse', btn)) {
			$bEnd(btn, '<span class="de-thread-collapse"> [<a class="de-abtn" href="' +
				aib.getThrUrl(aib.b, this.thrId) + '"></a>]</span>'
			).onclick = e => {
				$pd(e);
				this.loadPosts(visPosts, true);
			};
		}
		if(needToShow > visPosts) {
			navPanel.addThr(this);
			btn.lastChild.style.display = 'initial';
		} else {
			navPanel.removeThr(this);
			$hide(btn.lastChild);
		}
		if(needToOmit > 0) {
			op.el.insertAdjacentHTML('afterend', '<div class="de-omitted">' + needToOmit + '</div>');
		}
		if(smartScroll) {
			scrollTo(window.pageXOffset, window.pageYOffset + this.next.top - nextCoord);
		}
		Pview.updatePosition(false);
		if(Cfg.hideReplies) {
			$q('.de-replies-btn', this.btns).firstElementChild.className = 'de-abtn de-replies-hide';
			if(Cfg.updThrBtns) {
				$show(btn.firstChild);
			}
		}
		closePopup('load-thr');
	}
	_loadNewFromBuilder(pBuilder) {
		var lastOffset = pr.isVisible ? pr.top : null,
			[newPosts, newVisPosts] = this._parsePosts(pBuilder);
		if(lastOffset !== null) {
			scrollTo(window.pageXOffset, window.pageYOffset + pr.top - lastOffset);
		}
		if(newPosts !== 0 || panel.isNew) {
			panel.updateCounter(
				pBuilder.length + 1 - this.hidCounter,
				$Q(aib.qPostImg, this.el).length,
				pBuilder.postersCount);
			Pview.updatePosition(true);
		}
		if(pBuilder.isClosed) {
			AjaxCache.clear();
			return { newCount: newVisPosts, locked: true };
		}
		return { newCount: newVisPosts, locked: false };
	}
	_parsePosts(pBuilder) {
		this._checkBans(pBuilder);
		var maybeSpells = new Maybe(SpellsRunner),
			newPosts = 0,
			newVisPosts = 0,
			len = pBuilder.length,
			post = this.lastNotDeleted,
			maybeVParser = new Maybe(Cfg.addYouTube ? VideosParser : null);
		if(post.count !== 0 && (
			aib.dobr || post.count > len || pBuilder.getPNum(post.count - 1) !== post.num
		)) {
			post = this.op.nextNotDeleted;
			var i, firstChangedPost = null;
			for(i = post.count - 1; i < len && post;) {
				if(post.num === pBuilder.getPNum(i)) {
					i++;
					post = post.nextNotDeleted;
					continue;
				}
				if(post.num > pBuilder.getPNum(i)) {
					if(!firstChangedPost) {
						firstChangedPost = post.prev;
					}
					var cnt = 0;
					do {
						cnt++;
						i++;
					} while(pBuilder.getPNum(i) < post.num);
					const res = this._importPosts(post.prev, pBuilder, i - cnt, i, maybeVParser, maybeSpells);
					newPosts += res[0];
					this.pcount += res[0];
					newVisPosts += res[1];
					$after(post.prev.wrap, res[2]);
					res[3].next = post;
					post.prev = res[3];
					DollchanAPI.notify('newpost', res[4]);
					for(var temp = post; temp; temp = temp.nextInThread) {
						temp.count += cnt;
					}
				} else {
					if(!firstChangedPost) {
						firstChangedPost = post;
					}
					post = this.deletePost(post, false, !aib.t);
				}
			}
			if(i === len && post) {
				this.deletePost(post, true, !aib.t);
			}
			if(firstChangedPost && maybeSpells.hasValue && maybeSpells.value.hasNumSpell) {
				for(post = firstChangedPost.nextInThread; post; post = post.nextInThread) {
					maybeSpells.value.run(post);
				}
			}
			if(newPosts !== 0) {
				for(post = firstChangedPost; post; post = post.nextInThread) {
					RefMap.upd(post, true);
				}
			}
		}
		if(len + 1 > this.pcount) {
			const res = this._importPosts(this.last, pBuilder, this.lastNotDeleted.count,
				len, maybeVParser, maybeSpells);
			newPosts += res[0];
			newVisPosts += res[1];
			this.el.appendChild(res[2]);
			this.last = res[3];
			DollchanAPI.notify('newpost', res[4]);
			this.pcount = len + 1;
		}
		readFavorites().then(fav => {
			var f = fav[aib.host];
			if(!f || !f[aib.b]) {
				return;
			}
			if((f = f[aib.b][this.op.num])) {
				var el = $q('#de-win-fav > .de-win-body');
				if(el && el.hasChildNodes()) {
					el = $q('.de-fav-current > .de-fav-entries > .de-entry[de-num="' +
						this.op.num + '"] .de-fav-inf-new', el);
					$hide(el);
					el.textContent = 0;
					el = el.nextElementSibling; // .de-fav-inf-old
					el.textContent = this.pcount;
				}
				f.cnt = this.pcount;
				f['new'] = 0;
				f.you = 0;
				f.last = aib.anchor + this.last.num;
				setStored('DESU_Favorites', JSON.stringify(fav));
			}
		});
		maybeVParser.end();
		maybeSpells.end();
		return [newPosts, newVisPosts];
	}
}

var navPanel = {
	addThr(thr) {
		this._thrs.add(thr.el);
		if(this._thrs.size === 1) {
			doc.defaultView.addEventListener('scroll', this);
		}
		if(!this._visible) {
			this._checkThreads();
		}
	},
	handleEvent(e) {
		switch(e.type) {
		case 'scroll': window.requestAnimationFrame(() => this._checkThreads()); break;
		case 'mouseover': this._expandCollapse(true, fixEventEl(e.relatedTarget)); break;
		case 'mouseout': this._expandCollapse(false, fixEventEl(e.relatedTarget)); break;
		case 'click': this._handleClick(e); break;
		}
	},
	init() {
		var el = $bEnd(docBody, `
		<div id="de-thr-navpanel" class="de-thr-navpanel-hidden" style="display: none;">
			<svg id="de-thr-navarrow"><use xlink:href="#de-symbol-nav-arrow"/></svg>
			<div id="de-thr-navup">
				<svg viewBox="0 0 24 24"><use xlink:href="#de-symbol-nav-up"/></svg>
			</div>
			<div id="de-thr-navdown">
				<svg viewBox="0 0 24 24"><use xlink:href="#de-symbol-nav-down"/></svg>
			</div>
		</div>`);
		el.addEventListener('mouseover', this, true);
		el.addEventListener('mouseout', this, true);
		el.addEventListener('click', this, true);
		this._el = el;
		this._thrs = new Set();
	},
	removeThr(thr) {
		this._thrs.delete(thr.el);
		if(this._thrs.size === 0) {
			$hide(this._el);
			this._currentThr = null;
			this._visible = false;
			doc.defaultView.removeEventListener('scroll', this);
		}
	},

	_currentThr : null,
	_el         : null,
	_showhideTO : 0,
	_thrs       : null,
	_visible    : false,
	_checkThreads() {
		var el = this._findCurrentThread();
		if(el) {
			if(!this._visible) {
				this._showHide(true);
			}
			this._currentThr = el;
		} else if(this._visible) {
			this._showHide(false);
		}
	},
	_findCurrentThread() {
		if('elementsFromPoint' in doc) {
			Object.defineProperty(this, '_findCurrentThread', { value() {
				return doc.elementsFromPoint(Post.sizing.wWidth / 2, Post.sizing.wHeight / 2)
					.find(el => this._thrs.has(el));
			} });
			return this._findCurrentThread();
		}
		Object.defineProperty(this, '_findCurrentThread', {	value() {
			var el = document.elementFromPoint(Post.sizing.wWidth / 2, Post.sizing.wHeight / 2);
			while(el) {
				if(this._thrs.has(el)) {
					return el;
				}
				el = el.parentElement;
			}
			return undefined;
		} });
		return this._findCurrentThread();
	},
	_handleClick(e) {
		var el = fixEventEl(e.target);
		if(el.tagName.toLowerCase() === 'svg') {
			el = el.parentNode;
		}
		switch(el.id) {
		case 'de-thr-navup':
			scrollTo(window.pageXOffset, window.pageYOffset +
				this._currentThr.getBoundingClientRect().top - 50);
			break;
		case 'de-thr-navdown':
			scrollTo(window.pageXOffset, window.pageYOffset +
				this._currentThr.getBoundingClientRect().bottom - Post.sizing.wHeight + 50);
			break;
		}
	},
	_expandCollapse(expand, rt) {
		if(!rt || !this._el.contains(rt.farthestViewportElement || rt)) {
			clearTimeout(this._showhideTO);
			this._showhideTO = setTimeout(
				expand ? () => this._el.classList.remove('de-thr-navpanel-hidden') :
				() => this._el.classList.add('de-thr-navpanel-hidden'),
				Cfg.linksOver);
		}
	},
	_showHide(show) {
		this._el.style.display = show ? 'initial' : 'none';
		this._visible = show;
	}
};
