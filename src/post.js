//============================================================================================================
//													POST
//============================================================================================================

function Post(el, thr, num, count, isOp, prev) {
	var h, ref, html;
	this.count = count;
	this.el = el;
	this.isOp = isOp;
	this.num = num;
	this._pref = ref = $q(aib.qRef, el);
	this.prev = prev;
	this.thr = thr;
	if(prev) {
		prev.next = this;
	}
	el.post = this;
	html = '<span class="de-ppanel ' + (isOp ? '' : 'de-ppanel-cnt') +
		'"><span class="de-btn-hide"></span><span class="de-btn-rep"></span>';
	if(isOp) {
		if(!TNum && !aib.arch) {
			html += '<span class="de-btn-expthr"></span>';
		}
		h = aib.host;
		if(Favor[h] && Favor[h][brd] && Favor[h][brd][num]) {
			html += '<span class="de-btn-fav-sel"></span>';
			Favor[h][brd][num]['cnt'] = thr.pcount;
		} else {
			html += '<span class="de-btn-fav"></span>';
		}
	}
	ref.insertAdjacentHTML('afterend', html + (
		this.sage ? '<span class="de-btn-sage" title="SAGE"></span>' : ''
	) + '</span>');
	this.btns = ref.nextSibling;
	if(Cfg['expandPosts'] === 1 && this.trunc) {
		this._getFull(this.trunc, true);
	}
	el.addEventListener('click', this, true);
	el.addEventListener('mouseover', this, true);
	el.addEventListener('mouseout', this, true);
}
Post.hiddenNums = [];
Post.getWrds = function(text) {
	return text.replace(/\s+/g, ' ').replace(/[^a-zа-яё ]/ig, '').substring(0, 800).split(' ');
};
Post.findSameText = function(oNum, oHid, oWords, date, post) {
	var j, words = Post.getWrds(post.text),
		len = words.length,
		i = oWords.length,
		olen = i,
		_olen = i,
		n = 0;
	if(len < olen * 0.4 || len > olen * 3) {
		return;
	}
	while(i--) {
		if(olen > 6 && oWords[i].length < 3) {
			_olen--;
			continue;
		}
		j = len;
		while(j--) {
			if(words[j] === oWords[i] || oWords[i].match(/>>\d+/) && words[j].match(/>>\d+/)) {
				n++;
			}
		}
	}
	if(n < _olen * 0.4 || len > _olen * 3) {
		return;
	}
	if(oHid) {
		post.note = '';
		if(!post.spellHidden) {
			post.setVisib(false);
		}
		if(post.userToggled) {
			delete uVis[post.num];
			post.userToggled = false;
		}
	} else {
		post.setUserVisib(true, date, true);
		post.note = 'similar to >>' + oNum;
	}
	return false;
};
Post.sizing = {
	get wHeight() {
		var val = window.innerHeight;
		if(!this._enabled) {
			window.addEventListener('resize', this, false);
			this._enabled = true;
		}
		Object.defineProperty(this, 'wHeight', { writable: true, value: val });
		return val;
	},
	get wWidth() {
		var val = doc.documentElement.clientWidth;
		if(!this._enabled) {
			window.addEventListener('resize', this, false);
			this._enabled = true;
		}
		Object.defineProperty(this, 'wWidth', { writable: true, value: val });
		return val;
	},
	getOffset: function(el) {
		return el.getBoundingClientRect().left + window.pageXOffset;
	},
	getCachedOffset: function(pCount, el) {
		if(pCount === 0) {
			return this._opOffset === -1 ? this._opOffset = this.getOffset(el) : this._opOffset;
		}
		if(pCount > 4) {
			return this._pOffset === -1 ? this._pOffset = this.getOffset(el) : this._pOffset;
		}
		return this.getOffset(el);
	},
	handleEvent: function() {
		this.wHeight = window.innerHeight;
		this.wWidth = doc.documentElement.clientWidth;
	},

	_enabled: false,
	_opOffset: -1,
	_pOffset: -1
};
Post.prototype = {
	banned: false,
	deleted: false,
	hasRef: false,
	hasYTube: false,
	hidden: false,
	hashHideFun: null,
	hashImgsBusy: 0,
	imagesExpanded: false,
	inited: true,
	kid: null,
	next: null,
	omitted: false,
	parent: null,
	prev: null,
	spellHidden: false,
	userToggled: false,
	viewed: false,
	ytHideFun: null,
	ytInfo: null,
	ytLinksLoading: 0,
	addFuncs: function() {
		updRefMap(this, true);
		embedMP3Links(this);
		if(Cfg['addImgs']) {
			embedImagesLinks(this.el);
		}
		if(isExpImg) {
			this.toggleImages(true);
		}
	},
	handleEvent: function(e) {
		var temp, el = e.target,
			type = e.type;
		if(type === 'click') {
			if(e.button !== 0) {
				return;
			}
			switch(el.tagName) {
			case 'IMG':
				if(el.classList.contains('de-video-thumb')) {
					if(Cfg['addYouTube'] === 3) {
						this.ytLink.classList.add('de-current');
						new YouTube().addPlayer(this.ytObj, this.ytInfo, el.classList.contains('de-ytube'));
						$pd(e);
					}
				} else if(Cfg['expandImgs'] !== 0) {
					this._clickImage(el, e);
				}
				return;
			case 'VIDEO':
				if(Cfg['expandImgs'] !== 0 && !(Cfg['webmControl'] && e.clientY >
					(el.getBoundingClientRect().top + parseInt(el.style.height, 10) - 30)))
				{
					this._clickImage(el, e);
				}
				return;
			case 'A':
				if(el.classList.contains('de-video-link')) {
					var m = el.ytInfo;
					if(this.ytInfo === m) {
						if(Cfg['addYouTube'] === 3) {
							if($c('de-video-thumb', this.ytObj)) {
								el.classList.add('de-current');
								new YouTube().addPlayer(this.ytObj, this.ytInfo = m, el.classList.contains('de-ytube'));
							} else {
								el.classList.remove('de-current');
								new YouTube().addThumb(this.ytObj, this.ytInfo = m, el.classList.contains('de-ytube'));
							}
						} else {
							el.classList.remove('de-current');
							this.ytObj.innerHTML = '';
							this.ytInfo = null;
						}
					} else if(Cfg['addYouTube'] > 2) {
						this.ytLink.classList.remove('de-current');
						this.ytLink = el;
						new YouTube().addThumb(this.ytObj, this.ytInfo = m, el.classList.contains('de-ytube'));
					} else {
						this.ytLink.classList.remove('de-current');
						this.ytLink = el;
						el.classList.add('de-current');
						new YouTube().addPlayer(this.ytObj, this.ytInfo = m, el.classList.contains('de-ytube'));
					}
					$pd(e);
				} else {
					temp = el.parentNode;
					if(temp === this.trunc) {
						this._getFull(temp, false);
						$pd(e);
						e.stopPropagation();
					} else if(Cfg['insertNum'] && pr.form && temp === this._pref &&
						!/Reply|Ответ/.test(el.textContent))
					{
						if(TNum && Cfg['addPostForm'] > 1 && !pr.isQuick) {
							pr.showQuickReply(this, this.num, true);
						} else {
							if(aib._420 && pr.txta.value === 'Comment') {
								pr.txta.value = '';
							}
							$txtInsert(pr.txta, '>>' + this.num);
						}
						$pd(e);
						e.stopPropagation();
					}
				}
				return;
			}
			switch(el.className) {
			case 'de-btn-expthr':
				this.thr.load(1, false, null);
				$del(this._menu);
				this._menu = null;
				return;
			case 'de-btn-fav':
			case 'de-btn-fav-sel':
				toggleFavorites(this, el);
				return;
			case 'de-btn-hide':
			case 'de-btn-hide-user':
				if(this._isPview) {
					pByNum[this.num].toggleUserVisib();
					this.btns.firstChild.className = 'de-btn-hide-user';
					if(pByNum[this.num].hidden) {
						this.btns.classList.add('de-post-hid');
					} else {
						this.btns.classList.remove('de-post-hid');
					}
				} else {
					this.toggleUserVisib();
				}
				$del(this._menu);
				this._menu = null;
				return;
			case 'de-btn-rep':
				pr.showQuickReply(this._isPview ? this.getTopParent() : this, this.num, !this._isPview);
				return;
			case 'de-btn-sage':
				addSpell(9, '', false);
				return;
			}
			if(el.classList[0] === 'de-menu-item') {
				this._clickMenu(el);
			}
			return;
		}
		switch(el.classList[0]) {
		case 'de-reflink':
		case 'de-preflink':
			if(Cfg['linksNavig']) {
				if(type === 'mouseover') {
					clearTimeout(Pview.delTO);
					this._linkDelay = setTimeout(this._addPview.bind(this, el), Cfg['linksOver']);
				} else {
					this._eventRefLinkOut(e);
				}
				$pd(e);
				e.stopPropagation();
			}
			return;
		case 'de-btn-hide':
		case 'de-btn-hide-user':
			if(type === 'mouseover') {
				this._menuDelay = setTimeout(this._addMenu.bind(this, el, 'hide'), Cfg['linksOver']);
			} else {
				this._closeMenu(e.relatedTarget);
			}
			return;
		case 'de-btn-rep':
			if(type === 'mouseover') {
				quotetxt = $txtSelect();
			}
			return;
		case 'de-btn-expthr':
			if(type === 'mouseover') {
				this._menuDelay = setTimeout(this._addMenu.bind(this, el, 'expand'), Cfg['linksOver']);
			} else {
				this._closeMenu(e.relatedTarget);
			}
			return;
		case 'de-btn-src':
			if(type === 'mouseover') {
				this._menuDelay = setTimeout(this._addMenu.bind(this, el, 'imgsrc'), Cfg['linksOver']);
			} else {
				this._closeMenu(e.relatedTarget);
			}
			break;
		case 'de-menu':
		case 'de-menu-item':
			if(type === 'mouseover') {
				clearTimeout(this._menuDelay);
			} else {
				this._closeMenu(e.relatedTarget);
			}
			return;
		}
		if(Cfg['linksNavig'] && el.tagName === 'A' && !el.lchecked) {
			if(el.textContent.startsWith('>>')) {
				el.className = 'de-preflink ' + el.className;
				clearTimeout(Pview.delTO);
				this._linkDelay = setTimeout(this._addPview.bind(this, el), Cfg['linksOver']);
				$pd(e);
				e.stopPropagation();
			} else {
				el.lchecked = true;
			}
			return;
		}
		if(this._isPview) {
			if(type === 'mouseout') {
				temp = e.relatedTarget;
				if(Pview.top && (!temp || (!Pview.getPview(temp) && !temp.classList.contains('de-imgmenu')))) {
					Pview.top.markToDel();
				}
			} else {
				temp = Pview.getPview(e.relatedTarget);
				if(!temp || temp.post !== this) {
					if(this.kid) {
						this.kid.markToDel();
					} else {
						clearTimeout(Pview.delTO);
					}
				}
			}
		}
	},
	hideRefs: function() {
		if(!Cfg['hideRefPsts'] || !this.hasRef) {
			return;
		}
		this.ref.forEach(function(num) {
			var pst = pByNum[num];
			if(pst && !pst.userToggled) {
				pst.setVisib(true);
				pst.note = 'reference to >>' + this.num;
				pst.hideRefs();
			}
		}, this);
	},
	getAdjacentVisPost: function(toUp) {
		var post = toUp ? this.prev : this.next;
		while(post) {
			if(post.thr.hidden) {
				post = toUp ? post.thr.op.prev : post.thr.last.next;
			} else if(post.hidden || post.omitted) {
				post = toUp ? post.prev : post.next
			} else {
				return post;
			}
		}
		return null;
	},
	get html() {
		var val = this.el.innerHTML;
		Object.defineProperty(this, 'html', { configurable: true,  value: val });
		return val;
	},
	get images() {
		var i, len, el, els = $Q(aib.qThumbImages, this.el),
			imgs = [];
		for(i = 0, len = els.length; i < len; i++) {
			el = els[i];
			el.imgIdx = i;
			imgs[i] = new ImageData(this, el, i);
		}
		Object.defineProperty(this, 'images', { value: imgs });
		return imgs;
	},
	get mp3Obj() {
		var val = $new('div', {'class': 'de-mp3'}, null);
		$before(this.msg, val);
		Object.defineProperty(this, 'mp3Obj', { value: val });
		return val;
	},
	get msg() {
		var val = $q(aib.qMsg, this.el);
		Object.defineProperty(this, 'msg', { configurable: true, value: val });
		return val;
	},
	get nextInThread() {
		var post = this.next;
		return !post || post.count === 0 ? null : post;
	},
	get nextNotDeleted() {
		var post = this.nextInThread;
		while(post && post.deleted) {
			post = post.nextInThread;
		}
		return post;
	},
	set note(val) {
		if(this.isOp) {
			this.noteEl.textContent = val ? '(autohide: ' + val + ')' : '(' + this.title + ')';
		} else if(!Cfg['delHiddPost']) {
			this.noteEl.textContent = val ? 'autohide: ' + val : '';
		}
	},
	get noteEl() {
		var val;
		if(this.isOp) {
			val = this.thr.el.previousElementSibling.lastChild;
		} else {
			this.btns.insertAdjacentHTML('beforeend', '<span class="de-post-note"></span>');
			val = this.btns.lastChild;
		}
		Object.defineProperty(this, 'noteEl', { value: val });
		return val;
	},
	get posterName() {
		var pName = $q(aib.qName, this.el), val = pName ? pName.textContent : '';
		Object.defineProperty(this, 'posterName', { value: val });
		return val;
	},
	get posterTrip() {
		var pTrip = $c(aib.cTrip, this.el), val = pTrip ? pTrip.textContent : '';
		Object.defineProperty(this, 'posterTrip', { value: val });
		return val;
	},
	get ref() {
		var val = [];
		Object.defineProperty(this, 'ref', { configurable: true, value: val });
		return val;
	},
	get sage() {
		var val = aib.getSage(this.el);
		Object.defineProperty(this, 'sage', { value: val });
		return val;
	},
	select: function() {
		if(this.isOp) {
			if(this.hidden) {
				this.thr.el.previousElementSibling.classList.add('de-selected');
			}
			this.thr.el.classList.add('de-selected');
		} else {
			this.el.classList.add('de-selected');
		}
	},
	setUserVisib: function(hide, date, sync) {
		this.setVisib(hide);
		this.btns.firstChild.className = 'de-btn-hide-user';
		this.userToggled = true;
		if(hide) {
			this.note = '';
			this.hideRefs();
		} else {
			this.unhideRefs();
		}
		uVis[this.num] = [+!hide, date];
		if(sync) {
			localStorage['__de-post'] = JSON.stringify({
				'brd': brd,
				'date': date,
				'isOp': this.isOp,
				'num': this.num,
				'hide': hide,
				'title': this.isOp ? this.title : ''
			});
			localStorage.removeItem('__de-post');
		}
	},
	setVisib: function(hide) {
		var el, tEl;
		if(this.hidden === hide) {
			return;
		}
		if(this.isOp) {
			this.hidden = this.thr.hidden = hide;
			tEl = this.thr.el;
			tEl.style.display = hide ? 'none' : '';
			el = $id('de-thr-hid-' + this.num);
			if(el) {
				el.style.display = hide ? '' : 'none';
			} else {
				tEl.insertAdjacentHTML('beforebegin', '<div class="' + aib.cReply +
					' de-thr-hid" id="de-thr-hid-' + this.num + '">' + Lng.hiddenThrd[lang] +
					' <a href="#">№' + this.num + '</a> <span class="de-thread-note"></span></div>');
				el = $t('a', tEl.previousSibling);
				el.onclick = el.onmouseover = el.onmouseout = function(e) {
					switch(e.type) {
					case 'click':
						this.toggleUserVisib();
						$pd(e);
						return;
					case 'mouseover': this.thr.el.style.display = ''; return;
					default: // mouseout
						if(this.hidden) {
							this.thr.el.style.display = 'none';
						}
					}
				}.bind(this);
			}
			return;
		}
		if(Cfg['delHiddPost']) {
			if(hide) {
				this.wrap.classList.add('de-hidden');
				this.wrap.insertAdjacentHTML('beforebegin',
					'<span style="counter-increment: de-cnt 1;"></span>');
			} else if(this.hidden) {
				this.wrap.classList.remove('de-hidden');
				$del(this.wrap.previousSibling);
			}
		} else {
			if(!hide) {
				this.note = '';
			}
			this._pref.onmouseover = this._pref.onmouseout = hide && function(e) {
				this.hideContent(e.type === 'mouseout');
			}.bind(this);
		}
		this.hidden = hide;
		this.hideContent(hide);
		if(Cfg['strikeHidd']) {
			setTimeout(this._strikePostNum.bind(this, hide), 50);
		}
	},
	spellHide: function(note) {
		this.spellHidden = true;
		if(!this.userToggled) {
			if(TNum && !this.deleted) {
				sVis[this.count] = 0;
			}
			if(!this.hidden) {
				this.hideRefs();
			}
			this.setVisib(true);
			this.note = note;
		}
	},
	spellUnhide: function() {
		this.spellHidden = false;
		if(!this.userToggled) {
			if(TNum && !this.deleted) {
				sVis[this.count] = 1;
			}
			this.setVisib(false);
			this.unhideRefs();
		}
	},
	get subj() {
		var subj = $c(aib.cSubj, this.el), val = subj ? subj.textContent : '';
		Object.defineProperty(this, 'subj', { value: val });
		return val;
	},
	get text() {
		var val = this.msg.innerHTML
			.replace(/<\/?(?:br|p|li)[^>]*?>/gi,'\n')
			.replace(/<[^>]+?>/g,'')
			.replace(/&gt;/g, '>')
			.replace(/&lt;/g, '<')
			.replace(/&nbsp;/g, '\u00A0')
			.trim();
		Object.defineProperty(this, 'text', { configurable: true, value: val });
		return val;
	},
	get title() {
		var val = this.subj || this.text.substring(0, 70).replace(/\s+/g, ' ')
		Object.defineProperty(this, 'title', { value: val });
		return val;
	},
	get tNum() {
		return this.thr.num;
	},
	hideContent: function(hide) {
		if(hide) {
			this.el.classList.add('de-post-hid');
		} else {
			this.el.classList.remove('de-post-hid');
		}
	},
	toggleImages: function(expand) {
		for(var dat, i = 0, imgs = this.images, len = imgs.length; i < len; ++i) {
			dat = imgs[i];
			if(dat.isImage && (dat.expanded ^ expand)) {
				if(expand) {
					this._addFullImage(dat.el, dat, true);
				} else {
					this._removeFullImage(null, dat.el.parentNode.nextSibling, dat.el, dat);
				}
			}
		}
		this.imagesExpanded = expand;
	},
	toggleUserVisib: function() {
		var isOp = this.isOp,
			hide = !this.hidden,
			date = Date.now();
		this.setUserVisib(hide, date, true);
		if(isOp) {
			if(hide) {
				hThr[brd][this.num] = this.title;
			} else {
				delete hThr[brd][this.num];
			}
			saveHiddenThreads(false);
		}
		saveUserPosts();
	},
	get topCoord() {
		var el = this.isOp && this.hidden ? this.thr.el.previousElementSibling : this.el;
		return el.getBoundingClientRect().top;
	},
	get trunc() {
		var el = $q(aib.qTrunc, this.el), val = null;
		if(el && /long|full comment|gekürzt|слишком|длинн|мног|полная версия/i.test(el.textContent)) {
			val = el;
		}
		Object.defineProperty(this, 'trunc', { configurable: true, value: val });
		return val;
	},
	unhideRefs: function() {
		if(!Cfg['hideRefPsts'] || !this.hasRef) {
			return;
		}
		this.ref.forEach(function(num) {
			var pst = pByNum[num];
			if(pst && pst.hidden && !pst.userToggled && !pst.spellHidden) {
				pst.setVisib(false);
				pst.unhideRefs();
			}
		});
	},
	unselect: function() {
		if(this.isOp) {
			var el = $id('de-thr-hid-' + this.num);
			if(el) {
				el.classList.remove('de-selected');
			}
			this.thr.el.classList.remove('de-selected');
		} else {
			this.el.classList.remove('de-selected');
		}
	},
	updateMsg: function(newMsg) {
		var origMsg = aib.dobr ? this.msg.firstElementChild : this.msg,
			ytExt = $c('de-video-ext', origMsg),
			ytLinks = $Q(':not(.de-video-ext) > .de-video-link', origMsg);
		origMsg.parentNode.replaceChild(newMsg, origMsg);
		Object.defineProperties(this, {
			'msg': { configurable: true, value: newMsg },
			'trunc': { configurable: true, value: null }
		});
		delete this.html;
		delete this.text;
		new YouTube().updatePost(this, ytLinks, $Q('a[href*="youtu"]', newMsg), false);
		if(ytExt) {
			newMsg.appendChild(ytExt);
		}
		this.addFuncs();
		spells.check(this);
		closeAlert($id('de-alert-load-fullmsg'));
	},
	get wrap() {
		var val = aib.getWrap(this.el, this.isOp);
		Object.defineProperty(this, 'wrap', { value: val });
		return val;
	},
	get ytData() {
		var val = [];
		Object.defineProperty(this, 'ytData', { value: val });
		return val;
	},
	get ytObj() {
		var msg, prev, val = $new('div', {'class': 'de-video-obj'}, null);
		if(aib.krau) {
			msg = this.msg.parentNode;
			prev = msg.previousElementSibling;
			$before(prev.hasAttribute('style') ? prev : msg, val);
		} else {
			$before(this.msg, val);
		}
		Object.defineProperty(this, 'ytObj', { value: val });
		return val;
	},

	_isPview: false,
	_linkDelay: 0,
	_menu: null,
	_menuDelay: 0,
	_pref: null,
	_selRange: null,
	_selText: '',
	_addFullImage: function(el, data, inPost) {
		var btns, newW, newH, scrH, img, scrW = Post.sizing.wWidth,
			clickFn = null;
		if(inPost) {
			(aib.hasPicWrap ? data.wrap : el.parentNode).insertAdjacentHTML('afterend',
				'<div class="de-after-fimg"></div>');
			if(this.hidden) {
				this.hideContent(false);
				scrW -= this._getOffset(el);
				this.hideContent(true);
			} else {
				scrW -= this._getOffset(el);
			}
			el.style.display = 'none';
		} else {
			$del($c('de-img-center', doc));
		}
		newW = !Cfg['resizeImgs'] || data.width < (scrW - 5) ? data.width : scrW - 5;
		newH = newW * data.height / data.width;
		if(inPost) {
			data.expanded = true;
		} else {
			scrH = Post.sizing.wHeight;
			if(Cfg['resizeImgs'] && newH > scrH) {
				newH = scrH - 2;
				newW = newH * data.width / data.height;
			}
		}
		if(/\.webm/.test(data.info)) {
			if(nav.canPlayWebm) {
				img = $add('<video class="de-img-full" src="' + data.fullSrc +
					'" loop autoplay ' + (Cfg['webmControl'] ? 'controls ' : '') +
					'style="width: ' + newW + 'px; height: ' + newH + 'px;"></video>');
				img.oncanplay = function() {
					this.volume = Cfg['webmVolume'] / 100;
				};
				img.onerror = function() {
					if(!this.onceLoaded) {
						this.load();
						this.onceLoaded = true;
					}
				};
				img.onvolumechange = function() {
					saveCfg('webmVolume', Math.round(this.volume * 100));
				};
			} else {
				img = $add('<object class="de-img-full" data="' + data.fullSrc +'" type="video/quicktime" ' +
					'style="width: ' + newW + 'px; height: ' + (Cfg['webmControl'] ? newH + 16 : newH) + 'px;">' +
					'<param name="pluginurl" value="http://www.apple.com/quicktime/download/" />' +
					'<param name="controller" value="' + (Cfg['webmControl'] ? 'true' : 'false') + '" />' +
					'<param name="autoplay" value="true" />' +
					'<param name="scale" value="tofit" />' +
					'<param name="volume" value="' + Math.round(Cfg['webmVolume'] * 2.55) + '" />' +
					'<param name="wmode" value="transparent" /></object>');
					if(inPost) {
						img.mover = new ImageMover(img, this._clickImage.bind(this));
					} else {
						clickFn = this._clickImage.bind(this);
					}
			}
		} else {
			img = $add('<img class="de-img-full" src="' + data.fullSrc + '" alt="' + data.fullSrc +
				'" style="width: ' + newW + 'px; height: ' + newH + 'px;">');
			img.onload = img.onerror = function(e) {
				if(this.naturalHeight + this.naturalWidth === 0 && !this.onceLoaded) {
					this.src = this.src;
					this.onceLoaded = true;
				}
			};
		}
		$after(el.parentNode, img);
		if(!inPost) {
			img.classList.add('de-img-center');
			img.style.left = ((scrW - newW) / 2 - 1) + 'px';
			img.style.top = ((scrH - newH) / 2 - 1) + 'px';
			img.mover = new ImageMover(img, clickFn);
			btns = $id('de-img-btns');
			if(this._isPview) {
				btns.style.display = 'none';
			} else {
				btns.firstChild.onclick = this._navigateImages.bind(this, true);
				btns.lastChild.onclick = this._navigateImages.bind(this, false);
				btns.showhider = btns.showhider || new ImgBtnsShowHider(btns);
				btns.showhider.init();
			}
		}
	},
	_addMenu: function(el, type) {
		var html, cr = el.getBoundingClientRect(),
			isLeft = false,
			className = 'de-menu ' + aib.cReply,
			xOffset = window.pageXOffset;
		switch(type) {
		case 'hide':
			if(!Cfg['menuHiddBtn']) {
				return;
			}
			html = this._addMenuHide();
			break;
		case 'expand':
			html = '<span class="de-menu-item" info="thr-exp">' + Lng.selExpandThrd[lang]
				.join('</span><span class="de-menu-item" info="thr-exp">') + '</span>';
			break;
		case 'imgsrc':
			isLeft = true;
			className += ' de-imgmenu';
			html = this._addMenuImgSrc(el);
			break;
		}
		doc.body.insertAdjacentHTML('beforeend', '<div class="' + className +
			'" style="position: absolute; ' + (
				isLeft ? 'left: ' + (cr.left + xOffset) :
					'right: ' + (doc.documentElement.clientWidth - cr.right - xOffset)
			) + 'px; top: ' + (window.pageYOffset + cr.bottom) + 'px;">' + html + '</div>');
		if(this._menu) {
			clearTimeout(this._menuDelay);
			$del(this._menu);
		}
		this._menu = doc.body.lastChild;
		this._menu.addEventListener('click', this, false);
		this._menu.addEventListener('mouseover', this, false);
		this._menu.addEventListener('mouseout', this, false);
	},
	_addMenuHide: function() {
		var sel, ssel, str = '', addItem = function(name) {
				str += '<span info="spell-' + name + '" class="de-menu-item">' +
					Lng.selHiderMenu[name][lang] + '</span>';
			};
		sel = nav.Opera ? doc.getSelection() : window.getSelection();
		if(ssel = sel.toString()) {
			this._selText = ssel;
			this._selRange = sel.getRangeAt(0);
			addItem('sel');
		}
		if(this.posterName) {
			addItem('name');
		}
		if(this.posterTrip) {
			addItem('trip');
		}
		if(this.images.length === 0) {
			addItem('noimg');
		} else {
			addItem('img');
			addItem('ihash');
		}
		if(this.text) {
			addItem('text');
		} else {
			addItem('notext');
		}
		return str;
	},
	_addMenuImgSrc: function(el) {
		var p = el.nextSibling.href + '" target="_blank">' + Lng.search[lang],
			c = doc.body.getAttribute('de-image-search'),
			str = '';
		if(c) {
			c = c.split(';');
			c.forEach(function(el) {
				var info = el.split(',');
				str += '<a class="de-src' + info[0] + (!info[1] ?
					'" onclick="de_isearch(event, \'' + info[0] + '\')" de-url="' :
					'" href="' + info[1]
				) + p + info[0] + '</a>';
			});
		}
		return '<a class="de-menu-item de-imgmenu de-src-iqdb" href="http://iqdb.org/?url=' + p + 'IQDB</a>' +
			'<a class="de-menu-item de-imgmenu de-src-tineye" href="http://tineye.com/search/?url=' + p + 'TinEye</a>' +
			'<a class="de-menu-item de-imgmenu de-src-google" href="http://google.com/searchbyimage?image_url=' + p + 'Google</a>' +
			'<a class="de-menu-item de-imgmenu de-src-saucenao" href="http://saucenao.com/search.php?url=' + p + 'SauceNAO</a>' + str;
	},
	_addPview: function(link) {
		var tNum = (link.pathname.match(/.+?\/[^\d]*(\d+)/) || [,0])[1],
			pNum = (link.textContent.trim().match(/\d+$/) || [tNum])[0],
			pv = this._isPview ? this.kid : Pview.top;
		if(pv && pv.num === pNum) {
			Pview.del(pv.kid);
			setPviewPosition(link, pv.el, Cfg['animation'] && animPVMove);
			if(pv.parent.num !== this.num) {
				$each($C('de-pview-link', pv.el), function(el) {
					el.classList.remove('de-pview-link');
				});
				pv._markLink(this.num);
			}
			this.kid = pv;
			pv.parent = this;
		} else {
			this.kid = new Pview(this, link, tNum, pNum);
		}
	},
	_clickImage: function(el, e) {
		var data, iEl, mover, inPost = (Cfg['expandImgs'] === 1) ^ e.ctrlKey;
		switch(el.className) {
		case 'de-img-full de-img-center':
			mover = el.mover;
			if(mover.moved) {
				mover.moved = false;
				break;
			}
			el.mover = null;
			if(!this._isPview) {
				$id('de-img-btns').showhider.end();
			}
		case 'de-img-full':
			iEl = el.previousSibling.firstElementChild;
			this._removeFullImage(e, el, iEl, this.images[iEl.imgIdx] || iEl.data);
			break;
		case 'de-img-pre':
			if(!(data = el.data)) {
				iEl = new Image();
				iEl.src = el.src;
				data = el.data = {
					expanded: false,
					isImage: true,
					width: iEl.width,
					height: iEl.height,
					fullSrc: el.src
				};
			}
			break;
		case 'thumb':
		case 'ca_thumb':
			data = this.images[el.imgIdx];
			break;
		default:
			data = this.images;
			if(el.imgIdx === undefined) {
				return;
			}
			data = data[el.imgIdx];
		}
		if(data && data.isImage) {
			if(!inPost && (iEl = $c('de-img-center', el.parentNode.parentNode))) {
				$del(iEl);
				if(!this._isPview) {
					$id('de-img-btns').showhider.end();
				}
			} else {
				this._addFullImage(el, data, inPost);
			}
		}
		$pd(e);
		e.stopPropagation();
	},
	_clickMenu: function(el) {
		$del(this._menu);
		this._menu = null;
		switch(el.getAttribute('info')) {
		case 'spell-sel':
			var start = this._selRange.startContainer,
				end = this._selRange.endContainer;
			if(start.nodeType === 3) {
				start = start.parentNode;
			}
			if(end.nodeType === 3) {
				end = end.parentNode;
			}
			if((nav.matchesSelector(start, aib.qMsg + ' *') && nav.matchesSelector(end, aib.qMsg + ' *')) ||
				(nav.matchesSelector(start, '.' + aib.cSubj) && nav.matchesSelector(end, '.' + aib.cSubj))
			) {
				if(this._selText.contains('\n')) {
					addSpell(1 /* #exp */, '/' +
						regQuote(this._selText).replace(/\r?\n/g, '\\n') + '/', false);
				} else {
					addSpell(0 /* #words */, this._selText.replace(/\)/g, '\\)').toLowerCase(), false);
				}
			} else {
				dummy.innerHTML = '';
				dummy.appendChild(this._selRange.cloneContents());
				addSpell(2 /* #exph */, '/' +
					regQuote(dummy.innerHTML.replace(/^<[^>]+>|<[^>]+>$/g, '')) + '/', false);
			}
			return;
		case 'spell-name': addSpell(6 /* #name */, this.posterName.replace(/\)/g, '\\)'), false); return;
		case 'spell-trip': addSpell(7 /* #trip */, this.posterTrip.replace(/\)/g, '\\)'), false); return;
		case 'spell-img':
			var img = this.images[0],
				w = img.weight,
				wi = img.width,
				h = img.height;
			addSpell(8 /* #img */, [0, [w, w], [wi, wi, h, h]], false);
			return;
		case 'spell-ihash':
			this.images[0].getHash(function(hash) {
				addSpell(4 /* #ihash */, hash, false);
			});
			return;
		case 'spell-noimg': addSpell(0x108 /* (#all & !#img) */, '', true); return;
		case 'spell-text':
			var num = this.num,
				hidden = this.hidden,
				wrds = Post.getWrds(this.text),
				time = Date.now();
			for(var post = firstThr.op; post; post = post.next) {
				Post.findSameText(num, hidden, wrds, time, post);
			}
			saveUserPosts();
			return;
		case 'spell-notext': addSpell(0x10B /* (#all & !#tlen) */, '', true); return;
		case 'thr-exp': this.thr.load(parseInt(el.textContent, 10), false, null); return;
		}
	},
	_closeMenu: function(rt) {
		clearTimeout(this._menuDelay);
		if(this._menu && (!rt || rt.className !== 'de-menu-item')) {
			this._menuDelay = setTimeout(function() {
				$del(this._menu);
				this._menu = null;
			}.bind(this), 75);
		}
	},
	_eventRefLinkOut: function(e) {
		var rt = e.relatedTarget,
			pv = Pview.getPview(rt);
		clearTimeout(this._linkDelay);
		if(!rt || !pv) {
			if(Pview.top) {
				Pview.top.markToDel();
			}
		} else if(pv.post === this && this.kid && rt.className !== 'de-reflink') {
			this.kid.markToDel();
		}
	},
	_getFull: function(node, isInit) {
		if(aib.dobr) {
			$del(node.nextSibling);
			$del(node.previousSibling);
			$del(node);
			if(isInit) {
				this.msg.replaceChild($q('.alternate > div', this.el), this.msg.firstElementChild);
			} else {
				this.updateMsg($q('.alternate > div', this.el));
			}
			return;
		}
		if(!isInit) {
			$alert(Lng.loading[lang], 'load-fullmsg', true);
		}
		ajaxLoad(aib.getThrdUrl(brd, this.tNum), true, function(node, form, xhr) {
			if(this.isOp) {
				this.updateMsg(replacePost($q(aib.qMsg, form)));
				$del(node);
			} else {
				for(var i = 0, els = aib.getPosts(form), len = els.length; i < len; i++) {
					if(this.num === aib.getPNum(els[i])) {
						this.updateMsg(replacePost($q(aib.qMsg, els[i])));
						$del(node);
						return;
					}
				}
			}
		}.bind(this, node), null);
	},
	_getOffset: function(el) {
		return this._isPview ? Post.sizing.getOffset(el) : Post.sizing.getCachedOffset(this.count, el);
	},
	_markLink: function(pNum) {
		$each($Q('a[href*="' + pNum + '"]', this.el), function(num, el) {
			if(el.textContent === '>>' + num) {
				el.classList.add('de-pview-link');
			}
		}.bind(null, pNum));
	},
	_navigateImages: function(isNext) {
		var el = $c('de-img-full', doc),
			iEl = el.previousSibling.firstElementChild,
			data = this.images[iEl.imgIdx];
		this._removeFullImage(null, el, iEl, data);
		data = data.getAdjacentImage(!isNext);
		data.post._addFullImage(data.el, data, false);
	},
	_removeFullImage: function(e, full, thumb, data) {
		var pv, cr, x, y, inPost = data.expanded;
		data.expanded = false;
		if(nav.Firefox && this._isPview) {
			cr = this.el.getBoundingClientRect();
			x = e.pageX;
			y = e.pageY;
			if(!inPost) {
				pv = this;
				while(x > cr.right || x < cr.left || y > cr.bottom || y < cr.top) {
					if(pv = pv.parent) {
						cr = pv.el.getBoundingClientRect();
					} else {
						if(Pview.top) {
							Pview.top.markToDel();
						}
						$del(full);
						return;
					}
				}
				if(pv.kid) {
					pv.kid.markToDel();
				}
			} else if(x > cr.right || y > cr.bottom && Pview.top) {
				Pview.top.markToDel();
			}
		}
		$del(full);
		if(inPost) {
			thumb.style.display = '';
			$del((aib.hasPicWrap ? data.wrap : thumb.parentNode).nextSibling);
		}
	},
	_strikePostNum: function(isHide) {
		var idx, num = this.num;
		if(isHide) {
			Post.hiddenNums.push(+num);
		} else {
			idx = Post.hiddenNums.indexOf(+num);
			if(idx !== -1) {
				Post.hiddenNums.splice(idx, 1);
			}
		}
		$each($Q('a[href*="#' + num + '"]', dForm), isHide ? function(el) {
			el.classList.add('de-ref-hid');
		} : function(el) {
			el.classList.remove('de-ref-hid');
		});
	}
}

