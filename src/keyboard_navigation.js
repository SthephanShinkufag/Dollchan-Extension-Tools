//============================================================================================================
//											KEYBOARD NAVIGATION
//============================================================================================================

function KeyNavigation() {
	var keys = KeyNavigation.readKeys();
	this.cPost = null;
	this.enabled = true;
	this.lastPage = pageNum;
	this.lastPageOffset = 0;
	this.gKeys = keys[2];
	this.ntKeys = keys[3];
	this.tKeys = keys[4];
	doc.addEventListener('keydown', this, true);
}
KeyNavigation.version = 4;
KeyNavigation.readKeys = function() {
	var tKeys, keys, str = getStored('DESU_keys');
	if(!str) {
		return KeyNavigation.getDefaultKeys();
	}
	try {
		keys = JSON.parse(str);
	} finally {
		if(!keys) {
			return KeyNavigation.getDefaultKeys();
		}
		if(keys[0] !== KeyNavigation.version) {
			tKeys = KeyNavigation.getDefaultKeys();
			switch(keys[0]) {
			case 1:
				keys[2][11] = tKeys[2][11];
				keys[4] = tKeys[4];
			case 2:
				keys[2][12] = tKeys[2][12];
				keys[2][13] = tKeys[2][13];
				keys[2][14] = tKeys[2][14];
				keys[2][15] = tKeys[2][15];
				keys[2][16] = tKeys[2][16];
			case 3:
				keys[2][17] = keys[3][3];
				keys[3][3] = keys[3].splice(4, 1)[0];
			}
			keys[0] = KeyNavigation.version;
			setStored('DESU_keys', JSON.stringify(keys));
		}
		if(keys[1] ^ !!nav.Firefox) {
			var mapFunc = nav.Firefox ? function mapFuncFF(key) {
				switch(key) {
				case 189: return 173;
				case 187: return 61;
				case 186: return 59;
				default: return key;
				}
			} : function mapFuncNonFF(key) {
				switch(key) {
				case 173: return 189;
				case 61: return 187;
				case 59: return 186;
				default: return key;
				}
			};
			keys[1] = !!nav.Firefox;
			keys[2] = keys[2].map(mapFunc);
			keys[3] = keys[3].map(mapFunc);
			setStored('DESU_keys', JSON.stringify(keys));
		}
		return keys;
	}
};
KeyNavigation.getDefaultKeys = function() {
	var isFirefox = !!nav.Firefox;
	var globKeys = [
		/* One post/thread above      */ 0x004B /* = K          */,
		/* One post/thread below      */ 0x004A /* = J          */,
		/* Reply or create thread     */ 0x0052 /* = R          */,
		/* Hide selected thread/post  */ 0x0048 /* = H          */,
		/* Open previous page/picture */ 0x1025 /* = Ctrl+Left  */,
		/* Send post (txt)            */ 0xC00D /* = Alt+Enter  */,
		/* Open/close favorites posts */ 0x4046 /* = Alt+F      */,
		/* Open/close hidden posts    */ 0x4048 /* = Alt+H      */,
		/* Open/close panel           */ 0x0050 /* = P          */,
		/* Mask/unmask images         */ 0x0042 /* = B          */,
		/* Open/close settings        */ 0x4053 /* = Alt+S      */,
		/* Expand current image       */ 0x0049 /* = I          */,
		/* Bold text                  */ 0xC042 /* = Alt+B      */,
		/* Italic text                */ 0xC049 /* = Alt+I      */,
		/* Strike text                */ 0xC054 /* = Alt+T      */,
		/* Spoiler text               */ 0xC050 /* = Alt+P      */,
		/* Code text                  */ 0xC043 /* = Alt+C      */,
		/* Open next page/picture     */ 0x1027 /* = Ctrl+Right */
	];
	var nonThrKeys = [
		/* One post above */ 0x004D /* = M */,
		/* One post below */ 0x004E /* = N */,
		/* Open thread    */ 0x0056 /* = V */,
		/* Expand thread  */ 0x0045 /* = E */
	];
	var thrKeys = [
		/* Update thread  */ 0x0055 /* = U */
	];
	return [KeyNavigation.version, isFirefox, globKeys, nonThrKeys, thrKeys];
};
KeyNavigation.prototype = {
	paused: false,
	clear: function(lastPage) {
		this.cPost = null;
		this.lastPage = lastPage;
		this.lastPageOffset = 0;
	},
	disable: function() {
		if(this.enabled) {
			if(this.cPost) {
				this.cPost.unselect();
			}
			doc.removeEventListener('keydown', this, true);
			this.enabled = false;
		}
	},
	enable: function() {
		if(!this.enabled) {
			this.clear(pageNum);
			doc.addEventListener('keydown', this, true);
			this.enabled = true;
		}
	},
	handleEvent: function(e) {
		if(this.paused) {
			return;
		}
		var temp, post, scrollToThread, globIdx, idx, curTh = e.target.tagName,
			kc = e.keyCode | (e.ctrlKey ? 0x1000 : 0) | (e.shiftKey ? 0x2000 : 0) |
				(e.altKey ? 0x4000 : 0) | (curTh === 'TEXTAREA' ||
				(curTh === 'INPUT' && e.target.type === 'text') ? 0x8000 : 0);
		if(kc === 0x74 || kc === 0x8074) { // F5
			if(TNum) {
				return;
			}
			if(temp = this._fullImage) {
				temp.click();
			}
			loadPages(+Cfg['loadPages']);
		} else if(kc === 0x1B) { // ESC
			if(temp = this._fullImage) {
				temp.click();
				return;
			}
			if(this.cPost) {
				this.cPost.unselect();
				this.cPost = null;
			}
			if(TNum) {
				firstThr.clearPostsMarks();
			}
			this.lastPageOffset = 0;
		} else if(kc === 0x801B) { // ESC (txt)
			e.target.blur();
		} else {
			globIdx = this.gKeys.indexOf(kc);
			switch(globIdx) {
			case 2: // Reply or create thread
				if(pr.form) {
					if(!this.cPost && TNum && Cfg['addPostForm'] === 3) {
						this.cPost = firstThr.op;
					}
					if(this.cPost) {
						pr.showQuickReply(this.cPost, this.cPost.num, true);
					} else {
						pr.showMainReply(Cfg['addPostForm'] === 1, null);
					}
				}
				break;
			case 3: // Hide selected thread/post
				post = this._getFirstVisPost(false, true) || this._getNextVisPost(null, true, false);
				if(post) {
					post.toggleUserVisib();
					this._scroll(post, false, post.isOp);
				}
				break;
			case 4: // Open previous page/picture
				if(this._fullImage) {
					$id('de-img-btn-prev').click();
				} else if(TNum || pageNum !== aib.firstPage) {
					window.location.pathname = aib.getPageUrl(brd, TNum ? 0 : pageNum - 1);
				}
				break;
			case 5: // Send post (txt)
				if(e.target !== pr.txta && e.target !== pr.cap) {
					return;
				}
				pr.subm.click();
				break;
			case 6: // Open/close favorites posts
				toggleContent('fav', false);
				break;
			case 7: // Open/close hidden posts
				toggleContent('hid', false);
				break;
			case 8: // Open/close panel
				$disp($id('de-panel').lastChild);
				break;
			case 9: // Mask/unmask images
				toggleCfg('maskImgs');
				updateCSS();
				break;
			case 10: // Open/close settings
				toggleContent('cfg', false);
				break;
			case 11: // Expand current image
				post = this._getFirstVisPost(false, true) || this._getNextVisPost(null, true, false);
				if(post) {
					post.toggleImages(!post.imagesExpanded);
				}
				break;
			case 12: // Bold text (txt)
				if(e.target !== pr.txta) {
					return;
				}
				$id('de-btn-bold').click();
				break;
			case 13: // Italic text (txt)
				if(e.target !== pr.txta) {
					return;
				}
				$id('de-btn-italic').click();
				break;
			case 14: // Strike text (txt)
				if(e.target !== pr.txta) {
					return;
				}
				$id('de-btn-strike').click();
				break;
			case 15: // Spoiler text (txt)
				if(e.target !== pr.txta) {
					return;
				}
				$id('de-btn-spoil').click();
				break;
			case 16: // Code text (txt)
				if(e.target !== pr.txta) {
					return;
				}
				$id('de-btn-code').click();
				break;
			case 17: // Open next page/picture
				if(this._fullImage) {
					$id('de-img-btn-next').click();
				} else if(!TNum && this.lastPage !== aib.lastPage) {
					window.location.pathname = aib.getPageUrl(brd, this.lastPage + 1);
				}
				break;
			case -1:
				if(TNum) {
					idx = this.tKeys.indexOf(kc);
					if(idx === 0) { // Update thread
						Thread.loadNewPosts(null);
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
						if(nav.Firefox) {
							GM_openInTab(aib.getThrdUrl(brd, post.tNum), false, true);
						} else {
							window.open(aib.getThrdUrl(brd, post.tNum), '_blank');
						}
					}
					break;
				} else if(idx === 3) { // Expand/collapse thread
					post = this._getFirstVisPost(false, true) || this._getNextVisPost(null, true, false);
					if(post) {
						if(post.thr.loadedOnce && post.thr.op.next.count === 1) {
							temp = post.thr.nextNotHidden;
							post.thr.load(visPosts, !!temp, null);
							post = (temp || post.thr).op;
						} else {
							post.thr.load(1, false, null);
							post = post.thr.op;
						}
						scrollTo(0, pageYOffset + post.topCoord);
						if(this.cPost && this.cPost !== post) {
							this.cPost.unselect();
							this.cPost = post;
						}
					}
					break;
				}
			default:
				scrollToThread = !TNum && (globIdx === 0 || globIdx === 1);
				this._scroll(this._getFirstVisPost(scrollToThread, false), globIdx === 0 || idx === 0,
					scrollToThread);
			}
		}
		e.stopPropagation();
		$pd(e);
	},
	pause: function() {
		this.paused = true;
	},
	resume: function(keys) {
		this.gKeys = keys[2];
		this.ntKeys = keys[3];
		this.tKeys = keys[4];
		this.paused = false;
	},

	get _fullImage() {
		return $c('de-img-full de-img-center', doc);
	},
	_getFirstVisPost: function(getThread, getFull) {
		var post, tPost;
		if(this.lastPageOffset !== pageYOffset) {
			post = getThread ? firstThr : firstThr.op;
			while(post.topCoord < 1) {
				tPost = post.next;
				if(!tPost) {
					break;
				}
				post = tPost;
			}
			if(this.cPost) {
				this.cPost.unselect();
			}
			this.cPost = getThread ? getFull ? post.op : post.op.prev : getFull ? post : post.prev;
			this.lastPageOffset = pageYOffset;
		}
		return this.cPost;
	},
	_getNextVisPost: function(cPost, isOp, toUp) {
		var thr;
		if(isOp) {
			thr = cPost ? toUp ? cPost.thr.prevNotHidden : cPost.thr.nextNotHidden :
				firstThr.hidden ? firstThr.nextNotHidden : firstThr;
			return thr ? thr.op : null;
		}
		return cPost ? cPost.getAdjacentVisPost(toUp) : firstTht.hidden ||
			firstThr.op.hidden ? firstThr.op.getAdjacentVisPost(toUp) : firstThr.op;
	},
	_scroll: function(post, toUp, toThread) {
		var next = this._getNextVisPost(post, toThread, toUp);
		if(!next) {
			if(!TNum && (toUp ? pageNum > aib.firstPage : this.lastPage < aib.lastPage)) {
				window.location.pathname = aib.getPageUrl(brd, toUp ? pageNum - 1 : this.lastPage + 1);
			}
			return;
		}
		if(post) {
			post.unselect();
		}
		if(toThread) {
			next.el.scrollIntoView();
		} else {
			scrollTo(0, pageYOffset + next.el.getBoundingClientRect().top -
				Post.sizing.wHeight / 2 + next.el.clientHeight / 2);
		}
		this.lastPageOffset = pageYOffset;
		next.select();
		this.cPost = next;
	}
}

function KeyEditListener(alertEl, keys, allKeys) {
	var j, k, i, len, aInputs = aProto.slice.call($C('de-input-key', alertEl));
	for(i = 0, len = allKeys.length; i < len; ++i) {
		k = allKeys[i];
		if(k !== 0) {
			for(j = i + 1; j < len; ++j) {
				if(k === allKeys[j]) {
					aInputs[i].classList.add('de-error-key');
					aInputs[j].classList.add('de-error-key');
					break;
				}
			}
		}
	}
	this.aEl = alertEl;
	this.keys = keys;
	this.initKeys = JSON.parse(JSON.stringify(keys));
	this.allKeys = allKeys;
	this.allInputs = aInputs;
	this.errCount = $C('de-error-key', alertEl).length;
	if(this.errCount !== 0) {
		this.saveButton.disabled = true;
	}
}
// Browsers have different codes for these keys (see KeyNavigation.readKeys):
//		Firefox - '-' - 173, '=' - 61, ';' - 59
//		Chrome/Opera: '-' - 189, '=' - 187, ';' - 186
KeyEditListener.keyCodes = ['',,,,,,,,'Backspace',/* Tab */,,,,'Enter',,,'Shift','Ctrl','Alt',
	/* Pause/Break */,/* Caps Lock */,,,,,,,/* Escape */,,,,,'Space',/* Page Up */,
	/* Page Down */,/* End */,/* Home */,'←','↑','→','↓',,,,,/* Insert */,/* Delete */,,'0','1','2',
	'3','4','5','6','7','8','9',,';',,'=',,,,'A','B','C','D','E','F','G','H','I','J','K','L','M',
	'N','O','P','Q','R','S','T','U','V','W','X','Y','Z',/* Left WIN Key */,/* Right WIN Key */,
	/* Select key */,,,'Numpad 0','Numpad 1','Numpad 2','Numpad 3','Numpad 4','Numpad 5','Numpad 6',
	'Numpad 7','Numpad 8','Numpad 9','Numpad *','Numpad +',,'Numpad -','Numpad .','Numpad /',
	/* F1 */,/* F2 */,/* F3 */,/* F4 */,/* F5 */,/* F6 */,/* F7 */,/* F8 */,/* F9 */,/* F10 */,
	/* F11 */,/* F12 */,,,,,,,,,,,,,,,,,,,,,/* Num Lock */,/* Scroll Lock */,,,,,,,,,,,,,,,,,,,,,,,,
	,,,,'-',,,,,,,,,,,,,';','=',',','-','.','/','`',,,,,,,,,,,,,,,,,,,,,,,,,,,'[','\\',']','\''
];
KeyEditListener.getStrKey = function(key) {
	var str = '';
	if(key & 0x1000) {
		str += 'Ctrl+';
	}
	if(key & 0x2000) {
		str += 'Shift+';
	}
	if(key & 0x4000) {
		str += 'Alt+';
	}
	str += KeyEditListener.keyCodes[key & 0xFFF];
	return str;
};
KeyEditListener.getEditMarkup = function(keys) {
	var allKeys = [];
	var html = Lng.keyNavEdit[lang]
		.replace(/%l/g, '<label class="de-block">')
		.replace(/%\/l/g, '</label>')
		.replace(/%i([2-4])([0-9]+)(t)?/g, function(aKeys, all, id1, id2, isText) {
			var key = this[+id1][+id2];
			aKeys.push(key);
			return '<input class="de-input-key" type="text" de-id1="' + id1 + '" de-id2="' + id2 +
				'" size="26" value="' + KeyEditListener.getStrKey(key) +
				(isText ? '" de-text' : '"' ) + ' readonly></input>';
		}.bind(keys, allKeys)) +
	'<input type="button" id="de-keys-save" value="' + Lng.save[lang] + '"></input>' +
	'<input type="button" id="de-keys-reset" value="' + Lng.reset[lang] + '"></input>';
	return [allKeys, html];
};
KeyEditListener.setTitle = function(el, idx) {
	var title = el.getAttribute('de-title');
	if(keyNav && idx !== -1) {
		title += ' [' + KeyEditListener.getStrKey(keyNav.gKeys[idx]) + ']';
	}
	el.title = title;
};
KeyEditListener.prototype = {
	cEl: null,
	cKey: -1,
	errorInput: false,
	get saveButton() {
		var val = $id('de-keys-save');
		Object.defineProperty(this, 'saveButton', { value: val, configurable: true });
		return val;
	},
	handleEvent: function(e) {
		var key, keyStr, keys, str, id, temp, el = e.target;
		switch(e.type) {
		case 'blur':
			if(keyNav && this.errCount === 0) {
				keyNav.resume(this.keys);
			}
			this.cEl = null;
			return;
		case 'focus':
			if(keyNav) {
				keyNav.pause();
			}
			this.cEl = el;
			return;
		case 'click':
			if(el.id === 'de-keys-reset') {
				this.keys = KeyNavigation.getDefaultKeys();
				this.initKeys = KeyNavigation.getDefaultKeys();
				if(keyNav) {
					keyNav.resume(this.keys);
				}
				temp = KeyEditListener.getEditMarkup(this.keys);
				this.allKeys = temp[0];
				$c('de-alert-msg', this.aEl).innerHTML = temp[1];
				this.allInputs = aProto.slice.call($C('de-input-key', this.aEl));
				this.errCount = 0;
				delete this.saveButton;
				break;
			} else if(el.id === 'de-keys-save') {
				keys = this.keys;
				setStored('DESU_keys', JSON.stringify(keys));
			} else if(el.className === 'de-alert-btn') {
				keys = this.initKeys;
			} else {
				return;
			}
			if(keyNav) {
				keyNav.resume(keys);
			}
			closeAlert($id('de-alert-edit-keybnavig'));
			break;
		case 'keydown':
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
			keyStr = KeyEditListener.keyCodes[key];
			if(keyStr == null) {
				this.cKey = -1;
				return;
			}
			str = '';
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
			} else {
				this.cKey = key | (e.ctrlKey ? 0x1000 : 0) | (e.shiftKey ? 0x2000 : 0) |
					(e.altKey ? 0x4000 : 0) | (this.cEl.hasAttribute('de-text') ? 0x8000 : 0);
				this.errorInput = false;
				str += keyStr;
			}
			this.cEl.value = str;
			break;
		case 'keyup':
			var idx, rIdx, oKey, rEl, isError, el = this.cEl,
				key = this.cKey;
			if(!el || key === -1) {
				return;
			}
			isError = el.classList.contains('de-error-key');
			if(!this.errorInput && key !== -1) {
				idx = this.allInputs.indexOf(el);
				oKey = this.allKeys[idx];
				if(oKey === key) {
					this.errorInput = false;
					break;
				}
				rIdx = key === 0 ? -1 : this.allKeys.indexOf(key);
				this.allKeys[idx] = key;
				if(isError) {
					idx = this.allKeys.indexOf(oKey);
					if(idx !== -1 && this.allKeys.indexOf(oKey, idx + 1) === -1) {
						rEl = this.allInputs[idx];
						if(rEl.classList.contains('de-error-key')) {
							this.errCount--;
							rEl.classList.remove('de-error-key');
						}
					}
					if(rIdx === -1) {
						this.errCount--;
						el.classList.remove('de-error-key');
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
				if(!rEl.classList.contains('de-error-key')) {
					this.errCount++;
					rEl.classList.add('de-error-key');
				}
			}
			if(!isError) {
				this.errCount++;
				el.classList.add('de-error-key');
			}
			if(this.errCount !== 0) {
				this.saveButton.disabled = true;
			}
		}
		$pd(e);
	}
};

