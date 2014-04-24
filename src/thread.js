//============================================================================================================
//													THREAD
//============================================================================================================

function Thread(el, prev) {
	if(aib._420 || aib.tiny) {
		$after(el, el.lastChild);
		$del($c('clear', el));
	}
	var i, pEl, lastPost,
		els = aib.getPosts(el),
		len = els.length,
		num = aib.getTNum(el),
		omt = TNum ? 1 : aib.getOmitted($q(aib.qOmitted, el), len);
	this.num = num;
	Thread.tNums.push(+num);
	this.pcount = omt + len;
	pByNum[num] = lastPost = this.op = el.post = new Post(aib.getOp(el), this, num, 0, true,
		prev ? prev.last : null);
	for(i = 0; i < len; i++) {
		num = aib.getPNum(pEl = els[i]);
		pByNum[num] = lastPost = new Post(pEl, this, num, omt + i, false, lastPost);
	}
	this.last = lastPost;
	el.style.counterReset = 'de-cnt ' + omt;
	el.removeAttribute('id');
	el.setAttribute('de-thread', null);
	visPosts = Math.max(visPosts, len);
	this.el = el;
	this.prev = prev;
	if(prev) {
		prev.next = this;
	}
}
Thread.parsed = false;
Thread.loadNewPosts = function(e) {
	if(e) {
		$pd(e);
	}
	$alert(Lng.loading[lang], 'newposts', true);
	firstThr.clearPostsMarks();
	updater.forceLoad();
};
Thread.tNums = [];
Thread.prototype = {
	hasNew: false,
	hidden: false,
	loadedOnce: false,
	next: null,
	get lastNotDeleted() {
		var post = this.last;
		while(post.deleted) {
			post = post.prev;
		}
		return post;
	},
	get nextNotHidden() {
		for(var thr = this.next; thr && thr.hidden; thr = thr.next) {}
		return thr;
	},
	get prevNotHidden() {
		for(var thr = this.prev; thr && thr.hidden; thr = thr.prev) {}
		return thr;
	},
	clearPostsMarks: function() {
		if(this.hasNew) {
			this.hasNew = false;
			$each($Q('.de-new-post', this.el), function(el) {
				el.classList.remove('de-new-post');
			});
		}
	},
	load: function(last, smartScroll, Fn) {
		if(!Fn) {
			$alert(Lng.loading[lang], 'load-thr', true);
		}
		ajaxLoad(aib.getThrdUrl(brd, this.num), true, function threadOnload(last, smartScroll, Fn, form, xhr) {
			var nextCoord, els = aib.getPosts(form),
				op = this.op,
				thrEl = this.el,
				expEl = $c('de-expand', thrEl),
				nOmt = last === 1 ? 0 : Math.max(els.length - last, 0);
			if(smartScroll) {
				if(this.next) {
					nextCoord = this.next.topCoord;
				} else {
					smartScroll = false;
				}
			}
			pr.closeQReply();
			$del($q(aib.qOmitted + ', .de-omitted', thrEl));
			if(!this.loadedOnce) {
				if(op.trunc) {
					op.updateMsg(replacePost($q(aib.qMsg, form)));
				}
				delete op.ref;
				this.loadedOnce = true;
			}
			this._checkBans(op, form);
			this._parsePosts(els);
			thrEl.style.counterReset = 'de-cnt ' + (nOmt + 1);
			if(this._processExpandThread(els, last === 1 ? els.length : last)) {
				$del(expEl);
			} else if(!expEl) {
				thrEl.insertAdjacentHTML('beforeend', '<span class="de-expand">[<a href="' +
					aib.getThrdUrl(brd, this.num) + aib.anchor + this.last.num + '">' +
					Lng['collapseThrd'][lang] + '</a>]</span>');
				thrEl.lastChild.onclick = function(e) {
					$pd(e);
					this.load(visPosts, true, null);
				}.bind(this);
			} else if(expEl !== thrEl.lastChild) {
				thrEl.appendChild(expEl);
			}
			if(nOmt !== 0) {
				op.el.insertAdjacentHTML('afterend', '<div class="de-omitted">' + nOmt + '</div>');
			}
			if(smartScroll) {
				scrollTo(pageXOffset, pageYOffset - (nextCoord - this.next.topCoord));
			}
			closeAlert($id('de-alert-load-thr'));
			Fn && Fn();
		}.bind(this, last, smartScroll, Fn), function(eCode, eMsg, xhr) {
			$alert(getErrorMessage(eCode, eMsg), 'load-thr', false);
			if(typeof this === 'function') {
				this();
			}
		}.bind(Fn));
	},
	loadNew: function(Fn, useAPI) {
		if(aib.dobr && useAPI) {
			return getJsonPosts('/api/thread/' + brd + '/' + TNum +
				'/new.json?message_html&new_format&last_post=' + this.last.num,
				function parseNewPosts(status, sText, json, xhr) {
					if(status !== 200 || json['error']) {
						Fn(status, sText || json['message'], 0, xhr);
					} else {
						var i, lastOffset, pCount, fragm, last, temp, el = (json['result'] || {})['posts'],
							len = el ? el.length : 0,
							np = len;
						if(len > 0) {
							fragm = doc.createDocumentFragment();
							pCount = this.pcount;
							last = this.last;
							for(i = 0; i < len; i++) {
								temp = getHanaPost(el[i]);
								last = this._addPost(fragm, el[i]['display_id'].toString(),
									replacePost(temp[1]), temp[0], pCount + i, last);
								np -= spells.check(last)
							}
							spells.end(savePosts);
							this.last = last;
							lastOffset = pr.isVisible ? pr.topCoord : null;
							this.el.appendChild(fragm);
							if(lastOffset !== null) {
								scrollTo(pageXOffset, pageYOffset - (lastOffset - pr.topCoord));
							}
							this.pcount = pCount + len;
						}
						Fn(200, '', np, xhr);
						Fn = null;
					}
				}.bind(this)
			);
		}
		return ajaxLoad(aib.getThrdUrl(brd, TNum), true, function parseNewPosts(form, xhr) {
			this._checkBans(firstThr.op, form);
			var lastOffset = pr.isVisible ? pr.topCoord : null,
				info = this._parsePosts(aib.getPosts(form));
			if(lastOffset !== null) {
				scrollTo(pageXOffset, pageYOffset - (lastOffset - pr.topCoord));
			}
			Fn(200, '', info[1], xhr);
			if(info[0] !== 0) {
				$id('de-panel-info').firstChild.textContent = this.pcount + '/' +
					$Q(aib.qThumbImages, dForm).length;
			}
			Fn = null;
		}.bind(this), function(eCode, eMsg, xhr) {
			Fn(eCode, eMsg, 0, xhr);
			Fn = null;
		});
	},
	get topCoord() {
		return this.op.topCoord;
	},
	updateHidden: function(data) {
		var realHid, date = Date.now(),
			thr = this;
		do {
			realHid = thr.num in data;
			if(thr.hidden ^ realHid) {
				if(realHid) {
					thr.op.setUserVisib(true, date, false);
					data[thr.num] = thr.op.title;
				} else if(thr.hidden) {
					thr.op.setUserVisib(false, date, false);
				}
			}
		} while(thr = thr.next);
	},

	_addPost: function(parent, num, el, wrap, i, prev) {
		var post = new Post(el, this, num, i, false, prev);
		pByNum[num] = post;
		Object.defineProperty(post, 'wrap', { value: wrap });
		parent.appendChild(wrap);
		if(TNum && Cfg['animation']) {
			nav.animEvent(post.el, function(node) {
				node.classList.remove('de-post-new');
			});
			post.el.classList.add('de-post-new');
		}
		new YouTube().parseLinks(post);
		if(Cfg['imgSrcBtns']) {
			addImagesSearch(el);
		}
		post.addFuncs();
		preloadImages(el);
		if(TNum && Cfg['markNewPosts']) {
			if(updater.focused) {
				this.clearPostsMarks();
			} else {
				this.hasNew = true;
				el.classList.add('de-new-post');
			}
		}
		return post;
	},
	_checkBans: function(op, thrNode) {
		var pEl, bEl, post, i, bEls, len;
		if(aib.qBan) {
			for(i = 0, bEls = $Q(aib.qBan, thrNode), len = bEls.length; i < len; ++i) {
				bEl = bEls[i];
				pEl = aib.getPostEl(bEl);
				post = pEl ? pByNum[aib.getPNum(pEl)] : op;
				if(post && !post.banned) {
					if(!$q(aib.qBan, post.el)) {
						post.msg.appendChild(bEl);
					}
					post.banned = true;
				}
			}
		}
	},
	_deletePosts: function(post, delAll, pNum) {
		var tPost, idx = post.count, count = 0;
		do {
			if(TNum) {
				post.deleted = true;
				post.btns.classList.remove('de-ppanel-cnt');
				post.btns.classList.add('de-ppanel-del');
				($q('input[type="checkbox"]', post.el) || {}).disabled = true;
			} else {
				$del(post.wrap);
				delete pByNum[post.num];
				if(post.hidden) {
					post.unhideRefs();
				}
				updRefMap(post, false);
				if(post.prev.next = post.next) {
					post.next.prev = post.prev;
				}
				if(this.last === post) {
					this.last = post.prev;
				}
			}
			post = post.nextNotDeleted;
			count++;
		} while(post && (delAll || post.num !== pNum));
		if(!spells.hasNumSpell) {
			sVis.splice(idx, count);
		}
		for(tPost = post; tPost; tPost = tPost.nextInThread) {
			tPost.count -= count;
		}
		this.pcount -= count;
		return post;
	},
	_parsePosts: function(nPosts) {
		var i, fragm, el, firstDelPost, saveSpells = false,
			newPosts = 0,
			newVisPosts = 0,
			len = nPosts.length,
			post = this.lastNotDeleted;
		if(post.count !== 0 && (post.count > len || aib.getPNum(nPosts[post.count - 1]) !== post.num)) {
			firstDelPost = null;
			post = this.op.nextNotDeleted;
			for(i = post.count - 1; i <= len && post; ) {
				if(i === len || post.num !== aib.getPNum(nPosts[i])) {
					if(!firstDelPost) {
						firstDelPost = post;
					}
					post = this._deletePosts(post, i === len, i === len ? '' : aib.getPNum(nPosts[i]));
				} else {
					i++;
					post = post.nextNotDeleted;
				}
			}
			if(firstDelPost && spells.hasNumSpell) {
				disableSpells();
				for(post = firstDelPost.nextInThread; post; post = post.nextInThread) {
					spells.check(post);
				}
				saveSpells = true;
			}
		}
		if(len + 1 > this.pcount) {
			fragm = doc.createDocumentFragment();
			post = this.last;
			newPosts = newVisPosts = 1 + len - this.pcount;
			for(i = this.lastNotDeleted.count; i < len; ++i) {
				el = nPosts[i];
				post = this._addPost(fragm, aib.getPNum(el), replacePost(el),
					aib.getWrap(el, false), i + 1, post);
				newVisPosts -= spells.check(post);
			}
			this.el.appendChild(fragm);
			this.last = post;
			this.pcount = len + 1;
			saveSpells = true;
		}
		if(saveSpells) {
			spells.end(savePosts);
		}
		return [newPosts, newVisPosts];
	},
	_processExpandThread: function(nPosts, num) {
		var i, fragm, el, tPost, len, needRMUpdate, post = this.op.next,
			vPosts = this.pcount === 1 ? 0 : this.last.count - post.count + 1;
		if(vPosts > num) {
			while(vPosts-- !== num) {
				post.wrap.classList.add('de-hidden');
				post.omitted = true;
				post = post.next;
			}
			needRMUpdate = false;
		} else if(vPosts < num) {
			fragm = doc.createDocumentFragment();
			tPost = this.op;
			len = nPosts.length;
			for(i = Math.max(0, len - num), len -= vPosts; i < len; ++i) {
				el = nPosts[i];
				tPost = this._addPost(fragm, aib.getPNum(el), replacePost(el),
					aib.getWrap(el, false), i + 1, tPost);
				spells.check(tPost);
			}
			$after(this.op.el, fragm);
			tPost.next = post;
			post.prev = tPost;
			needRMUpdate = true;
			num = Math.min(len + vPosts, num);
		} else {
			return num <= visPosts;
		}
		while(vPosts-- !== 0) {
			if(post.trunc) {
				post.updateMsg(replacePost($q(aib.qMsg, nPosts[post.count - 1])));
			}
			if(post.omitted) {
				post.wrap.classList.remove('de-hidden');
				post.omitted = false;
			}
			if(needRMUpdate) {
				updRefMap(post, true);
			}
			post = post.next;
		}
		return num <= visPosts;
	}
};

