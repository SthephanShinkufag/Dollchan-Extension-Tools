/* ==[ RefMap.js ]============================================================================================
                                             REFERENCE LINKS MAP
=========================================================================================================== */

class RefMap {
	constructor(post) {
		this.hasMap = false;
		this._isHidden = false;
		this._isInited = false;
		this._post = post;
		this._set = new Set();
	}
	static gen(posts, thrURL) {
		const { tNums } = DelForm;
		for(const [pNum, post] of posts) {
			const links = $Q('a', post.msg);
			for(let lNum, i = 0, len = links.length; i < len; ++i) {
				const link = links[i];
				const tc = link.textContent;
				if(tc[0] !== '>' || tc[1] !== '>' || !(lNum = parseInt(tc.substr(2), 10))) {
					continue;
				}
				if(MyPosts.has(lNum)) {
					link.classList.add('de-ref-you');
					if(!MyPosts.has(pNum)) {
						post.el.classList.add('de-mypost-reply');
					}
				}
				if(!posts.has(lNum)) {
					continue;
				}
				const { ref } = posts.get(lNum);
				if(ref._isInited) {
					ref.addRefNum(post, pNum);
				} else {
					ref._set.add(pNum);
					ref.hasMap = true;
				}
				if(!aib.hasOPNum && tNums.has(lNum)) {
					link.classList.add('de-ref-op');
				}
				if(thrURL) {
					const url = link.getAttribute('href');
					if(url[0] === '#') {
						link.setAttribute('href', thrURL + url);
					}
				}
			}
		}
	}
	static initRefMap(form) {
		let post = form.firstThr && form.firstThr.op;
		if(post && Cfg.linksNavig) {
			this.gen(pByNum, '');
			const strNums = Cfg.strikeHidd && Post.hiddenNums.size ? Post.hiddenNums : null;
			for(; post; post = post.next) {
				if(post.ref.hasMap) {
					post.ref.initPostRef('', strNums);
				}
			}
		}
	}
	static updateRefMap(post, isAdd) {
		const pNum = post.num;
		const strNums = isAdd && Cfg.strikeHidd && Post.hiddenNums.size ? Post.hiddenNums : null;
		const links = $Q('a', post.msg);
		for(let lNum, i = 0, len = links.length; i < len; ++i) {
			const link = links[i];
			const tc = link.textContent;
			if(tc[0] !== '>' || tc[1] !== '>' || !(lNum = parseInt(tc.substr(2), 10))) {
				continue;
			}
			if(isAdd && MyPosts.has(lNum)) {
				link.classList.add('de-ref-you');
				if(!MyPosts.has(pNum)) {
					const postClass = post.el.classList;
					if(!postClass.contains('de-mypost-reply')) {
						postClass.add('de-mypost-reply');
						updater.refToYou(pNum);
					}
				}
			}
			if(!pByNum.has(lNum)) {
				continue;
			}
			const lPost = pByNum.get(lNum);
			if(!aib.t) {
				link.href = `#${ aib._4chan ? 'p' : '' }${ lNum }`;
			}
			if(!isAdd) {
				lPost.ref.removeLink(pNum);
				return;
			}
			if(strNums && strNums.has(lNum)) {
				link.classList.add('de-link-hid');
			}
			if(!aib.hasOPNum && DelForm.tNums.has(lNum)) {
				link.classList.add('de-ref-op');
			}
			lPost.ref.hasMap = true;
			lPost.ref.addRefNum(post, pNum, strNums && strNums.has(pNum));
		}
	}
	addRefNum(post, num, isHidden = null) {
		if(isHidden === null) {
			const strNums = Cfg.strikeHidd && Post.hiddenNums.size ? Post.hiddenNums : null;
			isHidden = strNums ? strNums.has(+num) : false;
		}
		if(!this._set.has(num)) {
			this._set.add(num);
			this._el.insertAdjacentHTML('beforeend', this._getHTML(num, '', isHidden));
			if(Cfg.hideRefPsts && this._post.isHidden) {
				post.setVisib(true, 'reference to >>' + num);
				post.ref.hideRef();
			}
		}
	}
	getElByNum(num) {
		return $q(`a[href$="${ num }"]`, this._el);
	}
	has(num) {
		return this._set.has(num);
	}
	hideRef(isForced = false) {
		if(!isForced && !Cfg.hideRefPsts || !this.hasMap || this._isHidden) {
			return;
		}
		this._isHidden = true;
		for(const num of this._set) {
			const post = pByNum.get(num);
			if(post && !post.isHidden) {
				if(isForced) {
					post.setUserVisib(true, true, 'reference to >>' + this._post.num);
					post.ref.hideRef(true);
				} else if(!post.userToggled) {
					post.setVisib(true, 'reference to >>' + this._post.num);
					post.ref.hideRef();
				}
			}
		}
	}
	initPostRef(tUrl, strNums) {
		let html = '';
		for(const num of this._set) {
			html += this._getHTML(num, tUrl, strNums && strNums.has(num));
		}
		this._createEl(html, false);
		this._isInited = true;
	}
	makeUnion(oRef) {
		this._set = new Set([...this._set, ...oRef._set].sort((a, b) => a - b));
	}
	removeLink(num) {
		this._set.delete(num);
		if(!this._set.size) {
			this.removeMap();
		} else {
			const el = this.getElByNum(num);
			if(el) {
				$del(el.nextSibling);
				el.remove();
			}
		}
	}
	removeMap() {
		this._set = new Set();
		this._el.remove();
		delete this._el;
		this.hasMap = false;
	}
	toggleRef(isHide, isForced) {
		if(isHide) {
			this.hideRef(isForced);
		} else {
			this.unhideRef(isForced);
		}
	}
	unhideRef(isForced = false) {
		if(this._isHidden && !this.hasMap) {
			return;
		}
		this._isHidden = false;
		for(const num of this._set) {
			const post = pByNum.get(num);
			if(post && post.isHidden && !post.spellHidden) {
				if(isForced) {
					post.setUserVisib(false);
					post.ref.unhideRef(true);
				} else if(!post.userToggled) {
					post.setVisib(false);
					post.ref.unhideRef();
				}
			}
		}
	}

	get _el() {
		let value = $q('.de-refmap', this._post.el);
		if(!value) {
			this._createEl('', this._post.isHidden);
			value = $q('.de-refmap', this._post.el);
		}
		Object.defineProperty(this, '_el', { value, configurable: true });
		return value;
	}
	_createEl(innerHTML, isHidden) {
		let el;
		const { msg } = this._post;
		const html = `<div class="de-refmap${
			isHidden ? ' de-post-hiddencontent' : '' }">${ innerHTML }</div>`;
		if(aib.dobrochan && (el = msg.nextElementSibling)) {
			el.insertAdjacentHTML('beforeend', html);
		} else {
			msg.insertAdjacentHTML('afterend', html);
		}
	}
	_getHTML(num, tUrl, isHidden) {
		return `<a href="${ tUrl }${ aib.anchor }${ num }" class="de-link-ref${
			isHidden ? ' de-link-hid' : '' }${ MyPosts.has(num) ? ' de-ref-you' : ''
		}">&gt;&gt;${ num }</a><span class="de-refcomma">, </span>`;
	}
}
