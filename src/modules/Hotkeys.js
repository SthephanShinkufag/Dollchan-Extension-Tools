/* ==[ Hotkeys.js ]===========================================================================================
                                                   HOTKEYS
=========================================================================================================== */

const HotKeys = {
	cPost          : null,
	enabled        : false,
	gKeys          : null,
	lastPageOffset : 0,
	ntKeys         : null,
	tKeys          : null,
	version        : 7,
	clearCPost() {
		this.cPost = null;
		this.lastPageOffset = 0;
	},
	disableHotKeys() {
		if(this.enabled) {
			this.enabled = false;
			if(this.cPost) {
				this.cPost.unselect();
			}
			this.clearCPost();
			this.gKeys = this.ntKeys = this.tKeys = null;
			doc.removeEventListener('keydown', this, true);
		}
	},
	enableHotKeys() {
		if(!this.enabled) {
			this.enabled = true;
			this._paused = false;
			Promise.resolve(this.readKeys()).then(keys => {
				if(this.enabled) {
					[,, this.gKeys, this.ntKeys, this.tKeys] = keys;
					doc.addEventListener('keydown', this, true);
				}
			});
		}
	},
	getDefaultKeys: () => [HotKeys.version, nav.isFirefox, [
		// GLOBAL KEYS
		/* One post/thread above      */ 0x004B /* = K          */,
		/* One post/thread below      */ 0x004A /* = J          */,
		/* Reply or create thread     */ 0x0052 /* = R          */,
		/* Hide selected thread/post  */ 0x0048 /* = H          */,
		/* Open previous page/image   */ 0x1025 /* = Ctrl+Left  */,
		/* Send post (txt)            */ 0x900D /* = Ctrl+Enter */,
		/* Open/close "Favorites"     */ 0x4046 /* = Alt+F      */,
		/* Open/close "Hidden"        */ 0x4048 /* = Alt+H      */,
		/* Open/close panel           */ 0x0050 /* = P          */,
		/* Mask/unmask images         */ 0x0042 /* = B          */,
		/* Open/close "Settings"      */ 0x4053 /* = Alt+S      */,
		/* Expand current image       */ 0x0049 /* = I          */,
		/* Bold text                  */ 0xC042 /* = Alt+B      */,
		/* Italic text                */ 0xC049 /* = Alt+I      */,
		/* Strike text                */ 0xC054 /* = Alt+T      */,
		/* Spoiler text               */ 0xC050 /* = Alt+P      */,
		/* Code text                  */ 0xC043 /* = Alt+C      */,
		/* Open next page/image       */ 0x1027 /* = Ctrl+Right */,
		/* Open/close "Video"         */ 0x4056 /* = Alt+V      */
	], [// NON-THREAD KEYS
		/* One post above */ 0x004D /* = M */,
		/* One post below */ 0x004E /* = N */,
		/* Open thread    */ 0x0056 /* = V */,
		/* Expand thread  */ 0x0045 /* = E */
	], [// THREAD KEYS
		/* Update thread  */ 0x0055 /* = U */
	]],
	handleEvent(e) {
		if(this._paused || e.metaKey) {
			return;
		}
		let idx;
		const isThr = aib.t;
		const el = e.target;
		const tag = el.tagName;
		const kc = e.keyCode |
			(e.ctrlKey ? 0x1000 : 0) |
			(e.shiftKey ? 0x2000 : 0) |
			(e.altKey ? 0x4000 : 0) |
			(tag === 'TEXTAREA' ||
				tag === 'INPUT' && (el.type === 'text' || el.type === 'password') ? 0x8000 : 0);
		if(kc === 0x74 || kc === 0x8074) { // F5
			if(isThr || $id('de-popup-load-pages')) {
				return;
			}
			AttachedImage.closeImg();
			Pages.loadPages(+Cfg.loadPages);
		} else if(kc === 0x1B) { // ESC
			if(AttachedImage.viewer) {
				AttachedImage.closeImg();
				return;
			}
			if(this.cPost) {
				this.cPost.unselect();
				this.cPost = null;
			}
			if(isThr) {
				Post.clearMarks();
			}
			this.lastPageOffset = 0;
		} else if(kc === 0x801B) { // ESC (txt)
			el.blur();
		} else {
			let post;
			const globIdx = this.gKeys.indexOf(kc);
			switch(globIdx) {
			case 2: // Quick reply
				if(pr.form) {
					post = this.cPost || this._getFirstVisPost(false, true) || Thread.first.op;
					this.cPost = post;
					pr.showQuickReply(post, post.num, true, false);
					post.select();
				}
				break;
			case 3: // Hide selected thread/post
				post = this._getFirstVisPost(false, true) || this._getNextVisPost(null, true, false);
				if(post) {
					post.setUserVisib(!post.isHidden);
					this._scroll(post, false, post.isOp);
				}
				break;
			case 4: // Open previous page/image
				if(AttachedImage.viewer) {
					AttachedImage.viewer.navigate(false);
				} else if(isThr || aib.page !== aib.firstPage) {
					deWindow.location.pathname = aib.getPageUrl(aib.b, isThr ? 0 : aib.page - 1);
				}
				break;
			case 5: // Send post (txt)
				if(el !== pr.txta && el !== pr.cap.textEl) {
					return;
				}
				pr.subm.click();
				break;
			case 6: // Open/close "Favorites"
				toggleWindow('fav', false);
				break;
			case 7: // Open/close "Hidden"
				toggleWindow('hid', false);
				break;
			case 8: // Open/close panel
				$toggle($id('de-panel-buttons'));
				break;
			case 9: // Mask/unmask images
				toggleCfg('maskImgs');
				updateCSS();
				break;
			case 10: // Open/close "Settings"
				toggleWindow('cfg', false);
				break;
			case 11: // Expand current image
				post = this._getFirstVisPost(false, true) || this._getNextVisPost(null, true, false);
				if(post) {
					post.toggleImages();
				}
				break;
			case 12: // Bold text (txt)
				if(el !== pr.txta) {
					return;
				}
				$id('de-btn-bold').click();
				break;
			case 13: // Italic text (txt)
				if(el !== pr.txta) {
					return;
				}
				$id('de-btn-italic').click();
				break;
			case 14: // Strike text (txt)
				if(el !== pr.txta) {
					return;
				}
				$id('de-btn-strike').click();
				break;
			case 15: // Spoiler text (txt)
				if(el !== pr.txta) {
					return;
				}
				$id('de-btn-spoil').click();
				break;
			case 16: // Code text (txt)
				if(el !== pr.txta) {
					return;
				}
				$id('de-btn-code').click();
				break;
			case 17: // Open next page/image
				if(AttachedImage.viewer) {
					AttachedImage.viewer.navigate(true);
				} else if(!isThr) {
					const pageNum = DelForm.last.pageNum + 1;
					if(pageNum <= aib.lastPage) {
						deWindow.location.pathname = aib.getPageUrl(aib.b, pageNum);
					}
				}
				break;
			case 18: // Open/close "Videos"
				toggleWindow('vid', false);
				break;
			case -1:
				if(isThr) {
					idx = this.tKeys.indexOf(kc);
					if(idx === 0) { // Update thread
						updater.forceLoad(null);
						break;
					}
					return;
				}
				idx = this.ntKeys.indexOf(kc);
				if(idx === -1) {
					return;
				} else if(idx === 2) { // Open thread
					post = this._getFirstVisPost(false, true) || this._getNextVisPost(null, true, false);
					if(post) {
						if(typeof GM_openInTab === 'function') {
							GM_openInTab(aib.getThrUrl(aib.b, post.tNum), false, true);
						} else {
							deWindow.open(aib.getThrUrl(aib.b, post.tNum), '_blank');
						}
					}
					break;
				} else if(idx === 3) { // Expand/collapse thread
					post = this._getFirstVisPost(false, true) || this._getNextVisPost(null, true, false);
					if(post) {
						if(post.thr.loadCount !== 0 && post.thr.op.next.count === 1) {
							const nextThr = post.thr.nextNotHidden;
							post.thr.loadPosts(visPosts, !!nextThr);
							post = (nextThr || post.thr).op;
						} else {
							post.thr.loadPosts('all');
							post = post.thr.op;
						}
						scrollTo(deWindow.pageXOffset, deWindow.pageYOffset + post.top);
						if(this.cPost && this.cPost !== post) {
							this.cPost.unselect();
							this.cPost = post;
						}
					}
					break;
				}
				/* falls through */
			default: {
				const scrollToThr = !isThr && (globIdx === 0 || globIdx === 1);
				this._scroll(this._getFirstVisPost(scrollToThr, false),
					globIdx === 0 || idx === 0, scrollToThr);
			}
			}
		}
		e.stopPropagation();
		$pd(e);
	},
	pauseHotKeys() {
		this._paused = true;
	},
	async readKeys() {
		const str = await getStored('DESU_keys');
		if(!str) {
			return this.getDefaultKeys();
		}
		let keys;
		try {
			keys = JSON.parse(str);
		} finally {
			if(!keys) {
				return this.getDefaultKeys();
			}
			if(keys[0] !== this.version) {
				const tKeys = this.getDefaultKeys();
				switch(keys[0]) {
				case 1:
					keys[2][11] = tKeys[2][11];
					keys[4] = tKeys[4];
					/* falls through */
				case 2:
					keys[2][12] = tKeys[2][12];
					keys[2][13] = tKeys[2][13];
					keys[2][14] = tKeys[2][14];
					keys[2][15] = tKeys[2][15];
					keys[2][16] = tKeys[2][16];
					/* falls through */
				case 3:
					keys[2][17] = keys[3][3];
					keys[3][3] = keys[3].splice(4, 1)[0];
					/* falls through */
				case 4:
				case 5:
				case 6:
					keys[2][18] = tKeys[2][18];
				}
				keys[0] = this.version;
				setStored('DESU_keys', JSON.stringify(keys));
			}
			if(keys[1] ^ nav.isFirefox) {
				const mapFunc = nav.isFirefox ?
					key => key === 189 ? 173 : key === 187 ? 61 : key === 186 ? 59 : key :
					key => key === 173 ? 189 : key === 61 ? 187 : key === 59 ? 186 : key;
				keys[1] = nav.isFirefox;
				keys[2] = keys[2].map(mapFunc);
				keys[3] = keys[3].map(mapFunc);
				setStored('DESU_keys', JSON.stringify(keys));
			}
			return keys;
		}
	},
	resume(keys) {
		[,, this.gKeys, this.ntKeys, this.tKeys] = keys;
		this._paused = false;
	},

	_paused: false,
	_getNextVisPost(cPost, isOp, toUp) {
		if(isOp) {
			const thr = cPost ? toUp ? cPost.thr.prevNotHidden : cPost.thr.nextNotHidden :
				Thread.first.isHidden ? Thread.first.nextNotHidden : Thread.first;
			return thr ? thr.op : null;
		}
		return cPost ? cPost.getAdjacentVisPost(toUp) : Thread.first.isHidden ||
			Thread.first.op.isHidden ? Thread.first.op.getAdjacentVisPost(toUp) : Thread.first.op;
	},
	_getFirstVisPost(getThread, getFull) {
		if(this.lastPageOffset !== deWindow.pageYOffset) {
			let post = getThread ? Thread.first : Thread.first.op;
			while(post.top < 1) {
				const tPost = post.next;
				if(!tPost) {
					break;
				}
				post = tPost;
			}
			if(this.cPost) {
				this.cPost.unselect();
			}
			this.cPost = getThread ? getFull ? post.op : post.op.prev : getFull ? post : post.prev;
			this.lastPageOffset = deWindow.pageYOffset;
		}
		return this.cPost;
	},
	_scroll(post, toUp, toThread) {
		const next = this._getNextVisPost(post, toThread, toUp);
		if(!next) {
			if(!aib.t) {
				const pageNum = toUp ? DelForm.first.pageNum - 1 : DelForm.last.pageNum + 1;
				if(toUp ? pageNum >= aib.firstPage : pageNum <= aib.lastPage) {
					deWindow.location.pathname = aib.getPageUrl(aib.b, pageNum);
				}
			}
			return;
		}
		if(post) {
			post.unselect();
		}
		if(toThread) {
			next.el.scrollIntoView();
		} else {
			scrollTo(0, deWindow.pageYOffset + next.el.getBoundingClientRect().top -
				Post.sizing.wHeight / 2 + next.el.clientHeight / 2);
		}
		this.lastPageOffset = deWindow.pageYOffset;
		next.select();
		this.cPost = next;
	}
};

class KeyEditListener {
	constructor(popupEl, keys, allKeys) {
		this.cEl = null;
		this.cKey = -1;
		this.errorInput = false;
		const aInputs = [...$Q('.de-input-key', popupEl)];
		for(let i = 0, len = allKeys.length; i < len; ++i) {
			const k = allKeys[i];
			if(k !== 0) {
				for(let j = i + 1; j < len; ++j) {
					if(k === allKeys[j]) {
						aInputs[i].classList.add('de-input-error');
						aInputs[j].classList.add('de-input-error');
						break;
					}
				}
			}
		}
		this.popupEl = popupEl;
		this.keys = keys;
		this.initKeys = JSON.parse(JSON.stringify(keys));
		this.allKeys = allKeys;
		this.allInputs = aInputs;
		this.errCount = $Q('.de-input-error', popupEl).length;
		if(this.errCount !== 0) {
			this.saveButton.disabled = true;
		}
	}
	static getEditMarkup(keys) {
		const allKeys = [];
		return [allKeys, `${ Lng.hotKeyEdit[lang].join('')
			.replace(/%l/g, '<label class="de-block">')
			.replace(/%\/l/g, '</label>')
			.replace(/%i([2-4])([0-9]+)(t)?/g, (all, id1, id2, isText) => {
				const key = keys[+id1][+id2];
				allKeys.push(key);
				return `<input class="de-input-key" type="text" de-id1="${ id1 }" de-id2="${ id2 }` +
					`" size="16" value="${ KeyEditListener.getStrKey(key) }${
						isText ? '" de-text' : '"' } readonly>`;
			}) }<input type="button" id="de-keys-save" class="de-button" value="${ Lng.save[lang] }">` +
			`<input type="button" id="de-keys-reset" class="de-button" value="${ Lng.reset[lang] }">`];
	}
	static getStrKey(key) {
		return (key & 0x1000 ? 'Ctrl+' : '') +
			(key & 0x2000 ? 'Shift+' : '') +
			(key & 0x4000 ? 'Alt+' : '') +
			KeyEditListener.keyCodes[key & 0xFFF];
	}
	static setTitle(el, idx) {
		let title = el.getAttribute('de-title');
		if(!title) {
			title = el.getAttribute('title');
			el.setAttribute('de-title', title);
		}
		if(HotKeys.enabled && idx !== -1) {
			title += ` [${ KeyEditListener.getStrKey(HotKeys.gKeys[idx]) }]`;
		}
		el.title = title;
	}
	get saveButton() {
		const value = $id('de-keys-save');
		Object.defineProperty(this, 'saveButton', { value, configurable: true });
		return value;
	}
	handleEvent(e) {
		let key, el = e.target;
		switch(e.type) {
		case 'blur':
			if(HotKeys.enabled && this.errCount === 0) {
				HotKeys.resume(this.keys);
			}
			el.classList.remove('de-input-selected');
			this.cEl = null;
			return;
		case 'focus':
			if(HotKeys.enabled) {
				HotKeys.pauseHotKeys();
			}
			el.classList.add('de-input-selected');
			this.cEl = el;
			return;
		case 'click': {
			let keys;
			if(el.id === 'de-keys-reset') {
				this.keys = HotKeys.getDefaultKeys();
				this.initKeys = HotKeys.getDefaultKeys();
				if(HotKeys.enabled) {
					HotKeys.resume(this.keys);
				}
				[this.allKeys, this.popupEl.innerHTML] = KeyEditListener.getEditMarkup(this.keys);
				this.allInputs = [...$Q('.de-input-key', this.popupEl)];
				this.errCount = 0;
				delete this.saveButton;
				break;
			} else if(el.id === 'de-keys-save') {
				({ keys } = this);
				setStored('DESU_keys', JSON.stringify(keys));
			} else if(el.className === 'de-popup-btn') {
				keys = this.initKeys;
			} else {
				return;
			}
			if(HotKeys.enabled) {
				HotKeys.resume(keys);
			}
			closePopup('edit-hotkeys');
			break;
		}
		case 'keydown': {
			if(!this.cEl) {
				return;
			}
			key = e.keyCode;
			if(key === 0x1B || key === 0x2E) { // ESC, DEL
				this.cEl.value = '';
				this.cKey = 0;
				this.errorInput = false;
				break;
			}
			const keyStr = KeyEditListener.keyCodes[key];
			if(keyStr === undefined) {
				this.cKey = -1;
				return;
			}
			let str = '';
			if(e.ctrlKey) {
				str += 'Ctrl+';
			}
			if(e.shiftKey) {
				str += 'Shift+';
			}
			if(e.altKey) {
				str += 'Alt+';
			}
			if(key === 16 || key === 17 || key === 18) {
				this.errorInput = true;
				this.cKey = 0;
			} else {
				this.cKey = key | (e.ctrlKey ? 0x1000 : 0) | (e.shiftKey ? 0x2000 : 0) |
					(e.altKey ? 0x4000 : 0) | (this.cEl.hasAttribute('de-text') ? 0x8000 : 0);
				this.errorInput = false;
				str += keyStr;
			}
			this.cEl.value = str;
			break;
		}
		case 'keyup': {
			el = this.cEl;
			key = this.cKey;
			if(!el || key === -1) {
				return;
			}
			let rEl;
			const isError = el.classList.contains('de-input-error');
			if(!this.errorInput && key !== -1) {
				let idx = this.allInputs.indexOf(el);
				const oKey = this.allKeys[idx];
				if(oKey === key) {
					this.errorInput = false;
					break;
				}
				const rIdx = key === 0 ? -1 : this.allKeys.indexOf(key);
				this.allKeys[idx] = key;
				if(isError) {
					idx = this.allKeys.indexOf(oKey);
					if(idx !== -1 && this.allKeys.indexOf(oKey, idx + 1) === -1) {
						rEl = this.allInputs[idx];
						if(rEl.classList.contains('de-input-error')) {
							this.errCount--;
							rEl.classList.remove('de-input-error');
						}
					}
					if(rIdx === -1) {
						this.errCount--;
						el.classList.remove('de-input-error');
					}
				}
				if(rIdx === -1) {
					this.keys[+el.getAttribute('de-id1')][+el.getAttribute('de-id2')] = key;
					if(this.errCount === 0) {
						this.saveButton.disabled = false;
					}
					this.errorInput = false;
					break;
				}
				rEl = this.allInputs[rIdx];
				if(!rEl.classList.contains('de-input-error')) {
					this.errCount++;
					rEl.classList.add('de-input-error');
				}
			}
			if(!isError) {
				this.errCount++;
				el.classList.add('de-input-error');
			}
			if(this.errCount !== 0) {
				this.saveButton.disabled = true;
			}
		}
		}
		$pd(e);
	}
}
// Browsers have different codes for these keys (see HotKeys.readKeys):
//     Firefox - '-' - 173, '=' - 61, ';' - 59
//     Chrome/Opera: '-' - 189, '=' - 187, ';' - 186
/* eslint-disable comma-spacing, comma-style, no-sparse-arrays */
KeyEditListener.keyCodes = [
	'',,,,,,,,'Backspace','Tab',,,,'Enter',,,'Shift','Ctrl','Alt',/* Pause/Break */,/* Caps Lock */,,,,,,,
	/* Esc */,,,,,'Space',/* PgUp */,/* PgDn */,/* End */,/* Home */,'←','↑','→','↓',,,,,/* Insert */,
	/* Del */,,'0','1','2','3','4','5','6','7','8','9',,';',,'=',,,,'A','B','C','D','E','F','G','H','I','J',
	'K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',/* Left WIN */,/* Right WIN */,
	/* Select */,,,'Num 0','Num 1','Num 2','Num 3','Num 4','Num 5','Num 6','Num 7','Num 8','Num 9','Num *',
	'Num +',,'Num -','Num .','Num /',/* F1 */,/* F2 */,/* F3 */,/* F4 */,/* F5 */,/* F6 */,/* F7 */,/* F8 */,
	/* F9 */,/* F10 */,/* F11 */,/* F12 */,,,,,,,,,,,,,,,,,,,,,/* Num Lock */,/* Scroll Lock */,,,,,,,,,,,,,,,
	,,,,,,,,,,,,,'-',,,,,,,,,,,,,';','=',',','-','.','/','`',,,,,,,,,,,,,,,,,,,,,,,,,,,'[','\\',']',"'"
];
/* eslint-enable comma-spacing, comma-style, no-sparse-arrays */
