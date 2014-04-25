//============================================================================================================
//													PREVIEW
//============================================================================================================

function Pview(parent, link, tNum, pNum) {
	var b, post = pByNum[pNum];
	if(Cfg['noNavigHidd'] && post && post.hidden) {
		return;
	}
	this.parent = parent;
	this._link = link;
	this.num = pNum;
	this.thr = parent.thr;
	Object.defineProperty(this, 'tNum', { value: tNum });
	if(post && (!post.isOp || !parent._isPview || !parent._loaded)) {
		this._showPost(post);
		return;
	}
	b = link.pathname.match(/^\/?(.+\/)/)[1].replace(aib.res, '').replace(/\/$/, '');
	if(post = this._cache && this._cache[b + tNum] && this._cache[b + tNum].getPost(pNum)) {
		this._loaded = true;
		this._showPost(post);
	} else {
		this._showText('<span class="de-wait">' + Lng.loading[lang] + '</span>');
		ajaxLoad(aib.getThrdUrl(b, tNum), true, this._onload.bind(this, b), this._onerror.bind(this));
	}
}
Pview.clearCache = function() {
	Pview.prototype._cache = {};
};
Pview.del = function(pv) {
	var el;
	if(!pv) {
		return;
	}
	pv.parent.kid = null;
	if(!pv.parent._isPview) {
		Pview.top = null;
	}
	do {
		clearTimeout(pv._readDelay);
		el = pv.el;
		if(Cfg['animation']) {
			nav.animEvent(el, $del);
			el.classList.add('de-pview-anim');
			el.style[nav.animName] = 'de-post-close-' + (el.aTop ? 't' : 'b') + (el.aLeft ? 'l' : 'r');
		} else {
			$del(el);
		}
	} while(pv = pv.kid);
};
Pview.getPview = function(el) {
	while(el && !el.classList.contains('de-pview')) {
		el = el.parentElement;
	}
	return el;
};
Pview.delTO = 0;
Pview.top = null;
Pview.prototype = Object.create(Post.prototype, {
	getTopParent: { value: function pvGetBoardParent() {
		var post = this.parent;
		while(post._isPview) {
			post = post.parent;
		}
		return post;
	} },
	markToDel: { value: function pvMarkToDel() {
		clearTimeout(Pview.delTO);
		Pview.delTO = setTimeout(Pview.del, Cfg['linksOut'], this);
	} },

	_isPview: { value: true },
	_loaded: { value: false, writable: true },
	_cache: { value: {}, writable: true },
	_readDelay: { value: 0, writable: true },
	_onerror: { value: function(eCode, eMsg, xhr) {
		Pview.del(this);
		this._showText(eCode === 404 ? Lng.postNotFound[lang] : getErrorMessage(eCode, eMsg));
	} },
	_onload: { value: function pvOnload(b, form, xhr) {
		var rm, parent = this.parent,
			parentNum = parent.num,
			cache = this._cache[b + this.tNum] = new PviewsCache(form, b, this.tNum),
			post = cache.getPost(this.num);
		if(post && (brd !== b || !post.hasRef || post.ref.indexOf(parentNum) === -1)) {
			if(post.hasRef) {
				rm = $c('de-refmap', post.el)
			} else {
				post.msg.insertAdjacentHTML('afterend', '<div class="de-refmap"></div>');
				rm = post.msg.nextSibling;
			}
			rm.insertAdjacentHTML('afterbegin', '<a class="de-reflink" href="' +
				aib.getThrdUrl(b, parent._isPview ? parent.tNum : parent.tNum) + aib.anchor +
				parentNum + '">&gt;&gt;' + (brd === b ? '' : '/' + brd + '/') + parentNum +
				'</a><span class="de-refcomma">, </span>');
		}
		if(parent.kid === this) {
			Pview.del(this);
			if(post) {
				this._loaded = true;
				this._showPost(post);
			} else {
				this._showText(Lng.postNotFound[lang]);
			}
		}
	} },
	_showPost: { value: function pvShowPost(post) {
		var btns, el = this.el = post.el.cloneNode(true),
			pText = '<span class="de-btn-rep"></span>' +
				(post.sage ? '<span class="de-btn-sage" title="SAGE"></span>' : '') +
				(post.deleted ? '' : '<span style="margin-right: 4px; vertical-align: 1px; color: #4f7942; ' +
				'font: bold 11px tahoma; cursor: default;">' + (post.isOp ? 'OP' : post.count + 1) + '</span>');
		el.post = this;
		el.className = aib.cReply + ' de-pview' + (post.viewed ? ' de-viewed' : '');
		el.style.display = '';
		if(Cfg['linksNavig'] === 2) {
			this._markLink(this.parent.num);
		}
		this._pref = $q(aib.qRef, el);
		if(post.inited) {
			this.btns = btns = $c('de-ppanel', el);
			this.isOp = post.isOp;
			btns.classList.remove('de-ppanel-cnt');
			if(post.hidden) {
				btns.classList.add('de-post-hid');
			}
			btns.innerHTML = '<span class="de-btn-hide' +
				(post.userToggled ? '-user' : '') + '"></span>' + pText;
			$each($Q((!TNum && post.isOp ? aib.qOmitted + ', ' : '') +
				'.de-img-full, .de-after-fimg', el), $del);
			$each($Q(aib.qThumbImages, el), function(el) {
				el.style.display = '';
			});
			if(post.hasYTube) {
				if(post.ytInfo !== null) {
					Object.defineProperty(this, 'ytObj', { value: $c('de-video-obj', el) });
					this.ytInfo = post.ytInfo;
				}
				new YouTube().updatePost(this, $C('de-video-link', post.el), $C('de-video-link', el), true);
			}
			if(Cfg['addImgs']) {
				$each($C('de-img-pre', el), function(el) {
					el.style.display = '';
				});
			}
			if(Cfg['markViewed']) {
				this._readDelay = setTimeout(function(pst) {
					if(!pst.viewed) {
						pst.el.classList.add('de-viewed');
						pst.viewed = true;
					}
					var arr = (sessionStorage['de-viewed'] || '').split(',');
					arr.push(pst.num);
					sessionStorage['de-viewed'] = arr;
				}, 2e3, post);
			}
		} else {
			this._pref.insertAdjacentHTML('afterend', '<span class="de-ppanel">' + pText + '</span');
			embedMP3Links(this);
			new YouTube().parseLinks(this);
			if(Cfg['addImgs']) {
				embedImagesLinks(el);
			}
			if(Cfg['imgSrcBtns']) {
				addImagesSearch(el);
			}
		}
		el.addEventListener('click', this, true);
		this._showPview(el);
	} },
	_showPview: { value: function pvShowPview(el, id) {
		if(this.parent._isPview) {
			Pview.del(this.parent.kid);
		} else {
			Pview.del(Pview.top);
			Pview.top = this;
		}
		this.parent.kid = this;
		el.addEventListener('mouseover', this, true);
		el.addEventListener('mouseout', this, true);
		(aib.arch ? doc.body : dForm).appendChild(el);
		setPviewPosition(this._link, el, false);
		if(Cfg['animation']) {
			nav.animEvent(el, function(node) {
				node.classList.remove('de-pview-anim');
				node.style[nav.animName] = '';
			});
			el.classList.add('de-pview-anim');
			el.style[nav.animName] = 'de-post-open-' + (el.aTop ? 't' : 'b') + (el.aLeft ? 'l' : 'r');
		}
	} },
	_showText: { value: function pvShowText(txt) {
		this._showPview(this.el = $add('<div class="' + aib.cReply + ' de-pview-info de-pview">' +
			txt + '</div>'));
	} },
});

function PviewsCache(form, b, tNum) {
	var i, len, post, pBn = {},
		pProto = Post.prototype,
		thr = $q(aib.qThread, form) || form,
		posts = aib.getPosts(thr);
	for(i = 0, len = posts.length; i < len; ++i) {
		post = posts[i];
		pBn[aib.getPNum(post)] = Object.create(pProto, {
			count: { value: i + 1 },
			el: { value: post, writable: true },
			inited: { value: false },
			pvInited: { value: false, writable: true }
		});
	}
	pBn[tNum] = this._opObj = Object.create(pProto, {
		inited: { value: false },
		isOp: { value: true },
		msg: { value: $q(aib.qMsg, thr), writable: true },
		ref: { value: [], writable: true }
	});
	this._brd = b;
	this._thr = thr;
	this._tNum = tNum;
	this._tUrl = aib.getThrdUrl(b, tNum);
	this._posts = pBn;
	if(Cfg['linksNavig'] === 2) {
		genRefMap(pBn, false, this._tUrl);
	}
}
PviewsCache.prototype = {
	getPost: function(num) {
		if(num === this._tNum) {
			return this._op;
		}
		var pst = this._posts[num];
		if(pst && !pst.pvInited) {
			pst.el = replacePost(pst.el);
			delete pst.msg;
			if(pst.hasRef) {
				addRefMap(pst, this._tUrl);
			}
			pst.pvInited = true;
		}
		return pst;
	},
	get _op() {
		var i, j, len, num, nRef, oRef, rRef, oOp, op = this._opObj;
		op.el = replacePost(aib.getOp(this._thr));
		op.msg = $q(aib.qMsg, op.el);
		if(this._brd === brd && (oOp = pByNum[this._tNum])) {
			oRef = op.ref;
			rRef = [];
			for(i = j = 0, nRef = oOp.ref, len = nRef.length; j < len; ++j) {
				num = nRef[j];
				if(oRef[i] === num) {
					i++;
				} else if(oRef.indexOf(num) !== -1) {
					continue;
				}
				rRef.push(num)
			}
			for(len = oRef.length; i < len; i++) {
				rRef.push(oRef[i]);
			}
			op.ref = rRef;
			if(rRef.length !== 0) {
				op.hasRef = true;
				addRefMap(op, this._tUrl);
			}
		} else if(op.hasRef) {
			addRefMap(op, this._tUrl);
		}
		Object.defineProperty(this, '_op', { value: op });
		return op;
	}
};

function PviewMoved() {
	if(this.style[nav.animName]) {
		this.classList.remove('de-pview-anim');
		this.style.cssText = this.newPos;
		this.newPos = false;
		$each($C('de-css-move', doc.head), $del);
		this.removeEventListener(nav.animEnd, PviewMoved, false);
	}
}

function animPVMove(pView, lmw, top, oldCSS) {
	var uId = 'de-movecss-' + Math.round(Math.random() * 1e3);
	$css('@' + nav.cssFix + 'keyframes ' + uId + ' {to { ' + lmw + ' top:' + top + '; }}').className =
		'de-css-move';
	if(pView.newPos) {
		pView.style.cssText = pView.newPos;
		pView.removeEventListener(nav.animEnd, PviewMoved, false);
	} else {
		pView.style.cssText = oldCSS;
	}
	pView.newPos = lmw + ' top:' + top + ';';
	pView.addEventListener(nav.animEnd, PviewMoved, false);
	pView.classList.add('de-pview-anim');
	pView.style[nav.animName] = uId;
}

function setPviewPosition(link, pView, animFun) {
	if(pView.link === link) {
		return;
	}
	pView.link = link;
	var isTop, top, oldCSS, cr = link.getBoundingClientRect(),
		offX = cr.left + window.pageXOffset + link.offsetWidth / 2,
		offY = cr.top + window.pageYOffset,
		bWidth = doc.documentElement.clientWidth,
		isLeft = offX < bWidth / 2,
		tmp = (isLeft ? offX : offX -
			Math.min(parseInt(pView.offsetWidth, 10), offX - 10)),
		lmw = 'max-width:' + (bWidth - tmp - 10) + 'px; left:' + tmp + 'px;';
	if(animFun) {
		oldCSS = pView.style.cssText;
		pView.style.cssText = 'opacity: 0; ' + lmw;
	} else {
		pView.style.cssText = lmw;
	}
	top = pView.offsetHeight;
	isTop = top + cr.top + link.offsetHeight < window.innerHeight || cr.top - top < 5;
	top = (isTop ? offY + link.offsetHeight : offY - top) + 'px';
	pView.aLeft = isLeft;
	pView.aTop = isTop;
	if(animFun) {
		animFun(pView, lmw, top, oldCSS);
	} else {
		pView.style.top = top;
	}
}

function addRefMap(post, tUrl) {
	var i, ref, len, bStr = '<a ' + aib.rLinkClick + ' href="' + tUrl + aib.anchor,
		str = '<div class="de-refmap">';
	for(i = 0, ref = post.ref, len = ref.length; i < len; ++i) {
		str += bStr + ref[i] + '" class="de-reflink">&gt;&gt;' + ref[i] +
			'</a><span class="de-refcomma">, </span>';
	}
	post.msg.insertAdjacentHTML('afterend', str + '</div>');
}

function genRefMap(posts, hideRefs, thrURL) {
	var tc, lNum, post, ref, i, len, links, url, pNum, opNums = Thread.tNums;
	for(pNum in posts) {
		for(i = 0, links = $T('a', posts[pNum].msg), len = links.length; i < len; ++i) {
			tc = links[i].textContent;
			if(tc[0] === '>' && tc[1] === '>' && (lNum = +tc.substr(2)) && (lNum in posts)) {
				post = posts[lNum];
				ref = post.ref;
				if(ref.indexOf(pNum) === -1) {
					ref.push(pNum);
					post.hasRef = true;
					if(hideRefs && post.hidden) {
						post = posts[pNum];
						post.setVisib(true);
						post.note = 'reference to >>' + lNum;
						post.hideRefs();
					}
				}
				if(opNums.indexOf(lNum) !== -1) {
					links[i].classList.add('de-opref');
				}
				if(thrURL) {
					url = links[i].getAttribute('href');
					if(url[0] === '#') {
						links[i].setAttribute('href', thrURL + url);
					}
				}
			}
		}
	}
}

function updRefMap(post, add) {
	var tc, ref, idx, link, lNum, lPost, i, len, links, pNum = post.num,
		strNums = add && Cfg['strikeHidd'] && Post.hiddenNums.length !== 0 ? Post.hiddenNums : null,
		opNums = add && Thread.tNums;
	for(i = 0, links = $T('a', post.msg), len = links.length; i < len; ++i) {
		link = links[i];
		tc = link.textContent;
		if(tc[0] === '>' && tc[1] === '>' && (lNum = +tc.substr(2)) && (lNum in pByNum)) {
			lPost = pByNum[lNum];
			if(!TNum) {
				link.href = '#' + (aib.fch ? 'p' : '') + lNum;
			}
			if(add) {
				if(strNums && strNums.lastIndexOf(lNum) !== -1) {
					link.classList.add('de-ref-hid');
				}
				if(opNums.indexOf(lNum) !== -1) {
					link.classList.add('de-opref');
				}
				if(lPost.ref.indexOf(pNum) === -1) {
					lPost.ref.push(pNum);
					post.hasRef = true;
					if(Cfg['hideRefPsts'] && lPost.hidden) {
						if(!post.hidden) {
							post.hideRefs();
						}
						post.setVisib(true);
						post.note = 'reference to >>' + lNum;
					}
				} else {
					continue;
				}
			} else if(lPost.hasRef) {
				ref = lPost.ref;
				idx = ref.indexOf(pNum);
				if(idx === -1) {
					continue;
				}
				ref.splice(idx, 1);
				if(ref.length === 0) {
					lPost.hasRef = false;
					$del($c('de-refmap', lPost.el));
					continue;
				}
			}
			$del($c('de-refmap', lPost.el));
			addRefMap(lPost, '');
		}
	}
}

