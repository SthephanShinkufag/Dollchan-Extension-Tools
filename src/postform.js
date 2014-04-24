//============================================================================================================
//													POSTFORM
//============================================================================================================

function PostForm(form, ignoreForm, init) {
	this.oeForm = $q('form[name="oeform"], form[action*="paint"]', doc);
	if(aib.abu && ($c('locked', form) || this.oeForm)) {
		this.form = null;
		if(this.oeForm) {
			this._init();
		}
		return;
	}
	if(!ignoreForm && !form) {
		if(this.oeForm) {
			ajaxLoad(aib.getThrdUrl(brd, aib.getTNum(dForm)), false, function(dc, xhr) {
				pr = new PostForm($q(aib.qPostForm, dc), true, init);
			}, function(eCode, eMsg, xhr) {
				pr = new PostForm(null, true, init);
			});
		} else {
			this.form = null;
		}
		return;
	}
	function $x(path, root) {
		return doc.evaluate(path, root, null, 8, null).singleNodeValue;
	}
	var p = './/tr[not(contains(@style,"none"))]//input[not(@type="hidden") and ';
	this.tNum = TNum;
	this.form = form;
	this.cap = $q('input[type="text"][name*="aptcha"], div[id*="captcha"]', form);
	this.txta = $q('tr:not([style*="none"]) textarea:not([style*="display:none"])', form);
	this.subm = $q('tr input[type="submit"]', form);
	this.file = $q('tr input[type="file"]', form);
	this.passw = $q('tr input[type="password"]', form);
	this.dpass = $q('input[type="password"], input[name="password"]', dForm);
	this.gothr = $x('.//tr[@id="trgetback"]|.//input[@type="radio" or @name="gotothread"]/ancestor::tr[1]', form);
	this.name = $x(p + '(@name="field1" or @name="name" or @name="internal_n" or @name="nya1" or @name="akane")]', form);
	this.mail = $x(p + (
			aib._410 ? '@name="sage"]' :
			'(@name="field2" or @name="em" or @name="sage" or @name="email" or @name="nabiki" or @name="dont_bump")]'
		), form);
	this.subj = $x(p + '(@name="field3" or @name="sub" or @name="subject" or @name="internal_s" or @name="nya3" or @name="kasumi")]', form);
	this.video = $q('tr input[name="video"], tr input[name="embed"]', form);
	if(init) {
		this._init();
	}
}
PostForm.setUserName = function() {
	var el = $q('input[info="nameValue"]', doc);
	if(el) {
		saveCfg('nameValue', el.value);
	}
	pr.name.value = Cfg['userName'] ? Cfg['nameValue'] : '';
};
PostForm.setUserPassw = function() {
	var el = $q('input[info="passwValue"]', doc);
	if(el) {
		saveCfg('passwValue', el.value);
	}
	(pr.dpass || {}).value = pr.passw.value = Cfg['passwValue'];
};
PostForm.eventFiles = function(tr) {
	$each($Q('input[type="file"]', tr), function(el) {
		el.addEventListener('change', PostForm.processInput, false);
	});
};
PostForm.processInput = function() {
	if(!this.haveBtns) {
		this.haveBtns = true;
		var delBtn = $new('button', {
			'class': 'de-file-util de-file-del',
			'text': Lng.clear[lang],
			'type': 'button'}, {
			'click': function(e) {
				$pd(e);
				if(aib.krau && this.parentNode.nextSibling) {
					var current = $q('input[type="file"]', this.parentNode).name.match(/\d/)[0];
					$each($Q('input[type="file"]', getAncestor(this, 'TR')), function(input, index) {
						if(index > current)
							input.name = "file_" + (index-1);
					});
					$del(this.parentNode);
					if($q('input[type="file"]', $id('files_parent').lastElementChild).value) {
						setTimeout(function(){PostForm.eventFiles($id('files_parent'));}, 100);
					}
				} else {
					pr.delFileUtils(this.parentNode, false);
					pr.file.addEventListener('change', PostForm.processInput, false);
				}
			}
		});
		if(aib.krau) {
			delBtn.addEventListener('focus', function() {
				if(this.parentNode.nextSibling) {
					this.setAttribute('onclick', 'window.fileCounter -= 1;' + ($q('input[type="file"]', $id('files_parent').lastElementChild).value ? 'updateFileFields();' : ''));
				}
			}, false);
		}
		$after(this, delBtn);

	} else if(this.imgFile) {
		this.imgFile = null;
		$del(this.nextSibling);
	}
	$del($c('de-file-rar', this.parentNode));
	PostForm.eventFiles(getAncestor(this, 'TR'));
	if(nav.noBlob || !/^image\/(?:png|jpeg)$/.test(this.files[0].type)) {
		return;
	}
	$after(this, $new('button', {
		'class': 'de-file-util de-file-rar',
		'text': Lng.addFile[lang],
		'title': Lng.helpAddFile[lang],
		'type': 'button'}, {
		'click': function(e) {
			$pd(e);
			var el = $id('de-input-rar') || doc.body.appendChild($new('input', {
					'id': 'de-input-rar',
					'type': 'file',
					'style': 'display: none;'
				}, null));
			el.onchange = function(inp, e) {
				$del(this);
				var file = e.target.files[0],
					fr = new FileReader();
				inp.insertAdjacentHTML('afterend', '<span class="de-file-util" style="margin: 0 5px;">' +
					'<span class="de-wait"></span>' + Lng.wait[lang] + '</span>');
				fr.onload = function(input, node, e) {
					if(input.nextSibling === node) {
						node.style.cssText = 'font-weight: bold; margin: 0 5px; cursor: default;';
						node.title = input.files[0].name + ' + ' + this.name;
						node.textContent = input.files[0].name.replace(/^.+\./, '') + ' + ' +
							this.name.replace(/^.+\./, '')
						input.imgFile = e.target.result;
					}
				}.bind(file, inp, inp.nextSibling);
				fr.readAsArrayBuffer(file);
			}.bind(this, $q('input[type="file"]', this.parentNode));
			el.click();
		}
	}));
};
PostForm.prototype = {
	isHidden: false,
	isQuick: false,
	isTopForm: false,
	lastQuickPNum: -1,
	pForm: null,
	pArea: [],
	qArea: null,
	addTextPanel: function() {
		var i, len, tag, html, btns, tPanel = $id('de-txt-panel');
		if(!Cfg['addTextBtns']) {
			$del(tPanel);
			return;
		}
		if(!tPanel) {
			tPanel = $new('span', {'id': 'de-txt-panel'}, {
				'click': this,
				'mouseover': this
			});
		}
		tPanel.style.cssFloat = Cfg['txtBtnsLoc'] ? 'none' : 'right';
		$after(Cfg['txtBtnsLoc'] ? $id('de-txt-resizer') || this.txta :
			aib._420 ? $c('popup', this.form) : this.subm, tPanel);
		for(html = '', i = 0, btns = aib.formButtons, len = btns['id'].length; i < len; ++i) {
			tag = btns['tag'][i];
			if(tag === '') {
				continue;
			}
			html += '<span id="de-btn-' + btns['id'][i] + '" de-title="' + Lng.txtBtn[i][lang] +
				'" de-tag="' + tag + '"' + (btns['bb'][i] ? 'de-bb' : '') + '>' + (
					Cfg['addTextBtns'] === 2 ?
						(i === 0 ? '[ ' : '') + '<a class="de-abtn" href="#">' + btns['val'][i] +
						'</a>' + (i === len - 1 ? ' ]' : ' / ') :
					Cfg['addTextBtns'] === 3 ?
						'<input type="button" value="' + btns['val'][i] + '" style="font-weight: bold;">' : ''
				) + '</span>';
		}
		tPanel.innerHTML = html;
	},
	delFileUtils: function(el, eventFiles) {
		$each($Q('.de-file-util', el), $del);
		$each($Q('input[type="file"]', el), function(node) {
			node.imgFile = null;
		});
		this._clearFileInput(el, eventFiles);
	},
	handleEvent: function(e) {
		var x, start, end, scrtop, title, id, txt, len, el = e.target;
		if(el.tagName !== 'SPAN') {
			el = el.parentNode;
		}
		id = el.id;
		if(id.startsWith('de-btn')) {
			if(e.type === 'mouseover') {
				if(id === 'de-btn-quote') {
					quotetxt = $txtSelect();
				}
				x = -1;
				if(keyNav) {
					switch(id.substr(7)) {
					case 'bold': x = 12; break;
					case 'italic': x = 13; break;
					case 'strike': x = 14; break;
					case 'spoil': x = 15; break;
					case 'code': x = 16; break;
					}
				}
				KeyEditListener.setTitle(el, x);
				return;
			}
			x = pr.txta;
			start = x.selectionStart;
			end = x.selectionEnd;
			if(id === 'de-btn-quote') {
				$txtInsert(x, '> ' + (start === end ? quotetxt : x.value.substring(start, end))
					.replace(/\n/gm, '\n> '));
			} else {
				scrtop = x.scrollTop;
				txt = this._wrapText(el.hasAttribute('de-bb'), el.getAttribute('de-tag'),
					x.value.substring(start, end));
				len = start + txt.length;
				x.value = x.value.substr(0, start) + txt + x.value.substr(end);
				x.setSelectionRange(len, len);
				x.focus();
				x.scrollTop = scrtop;
			}
			$pd(e);
			e.stopPropagation();
		}
	},
	get isVisible() {
		if(!this.isHidden && this.isTopForm && $q(':focus', this.pForm)) {
			var cr = this.pForm.getBoundingClientRect();
			return cr.bottom > 0 && cr.top < window.innerHeight;
		}
		return false;
	},
	get topCoord() {
		return this.pForm.getBoundingClientRect().top;
	},
	showQuickReply: function(post, pNum, closeReply) {
		var el, tNum = post.tNum;
		if(!this.isQuick) {
			this.isQuick = true;
			this.setReply(true, false);
			$t('a', this._pBtn[+this.isTopForm]).className =
				'de-abtn de-parea-btn-' + (TNum ? 'reply' : 'thrd');
			if(!TNum && !aib.kus && !aib.dobr) {
				if(this.oeForm) {
					$del($q('input[name="oek_parent"]', this.oeForm));
					this.oeForm.insertAdjacentHTML('afterbegin', '<input type="hidden" value="' +
						tNum + '" name="oek_parent">');
				}
				if(this.form) {
					$del($q('#thr_id, input[name="parent"]', this.form));
					this.form.insertAdjacentHTML('afterbegin',
						'<input type="hidden" id="thr_id" value="' + tNum + '" name="' + (
							aib.fch || aib.futa ? 'resto' :
							aib.tiny ? 'thread' :
							'parent'
						) + '">'
					);
				}
			}
		} else if(closeReply && !quotetxt && post.wrap.nextElementSibling === this.qArea) {
			this.closeQReply();
			return;
		}
		$after(post.wrap, this.qArea);
		if(!TNum) {
			this._toggleQuickReply(tNum);
		}
		if(!this.form) {
			return;
		}
		if(this._lastCapUpdate && ((!TNum && this.tNum !== tNum) || (Date.now() - this._lastCapUpdate > 3e5))) {
			this.tNum = tNum;
			this.refreshCapImg(false);
		}
		this.tNum = tNum;
		if(aib._420 && this.txta.value === 'Comment') {
			this.txta.value = '';
		}
		$txtInsert(this.txta, (this.txta.value === '' || this.txta.value.slice(-1) === '\n' ? '' : '\n') +
			(this.lastQuickPNum === pNum && this.txta.value.contains('>>' + pNum) ? '' : '>>' + pNum + '\n') +
			(quotetxt ? quotetxt.replace(/^\n|\n$/g, '').replace(/(^|\n)(.)/gm, '$1> $2') + '\n': ''));
		if(Cfg['addPostForm'] === 3) {
			el = $t('a', this.qArea.firstChild);
			el.href = aib.getThrdUrl(brd, tNum);
			el.textContent = '#' + tNum;
		}
		this.lastQuickPNum = pNum;
	},
	showMainReply: function(isTop, evt) {
		this.closeQReply();
		if(this.isTopForm === isTop) {
			this.pForm.style.display = this.isHidden ? '' : 'none';
			this.isHidden = !this.isHidden;
			this.updatePAreaBtns();
		} else {
			this.isTopForm = isTop;
			this.setReply(false, false);
		}
		if(evt) {
			$pd(evt);
		}
	},
	closeQReply: function() {
		if(this.isQuick) {
			this.isQuick = false;
			this.lastQuickPNum = -1;
			if(!TNum) {
				this._toggleQuickReply(0);
				$del($id('thr_id'));
			}
			this.setReply(false, !TNum || Cfg['addPostForm'] > 1);
		}
	},
	refreshCapImg: function(focus) {
		var src, img;
		if(aib.abu && (img = $id('captcha_div')) && img.hasAttribute('onclick')) {
			img.dispatchEvent(new CustomEvent('click', {
				'bubbles': true,
				'cancelable': true,
				'detail': {'isCustom': true, 'focus': focus}
			}));
			return;
		}
		if(!this.cap || (aib.krau && !$q('input[name="captcha_name"]', this.form).hasAttribute('value'))) {
			return;
		}
		img = this.recap ? $id('recaptcha_image') : $t('img', this.capTr);
		if(aib.dobr || aib.krau || aib.dvachnet || this.recap) {
			img.click();
		} else if(img) {
			src = img.getAttribute('src');
			if(aib.kus || aib.tinyIb) {
				src = src.replace(/\?[^?]+$|$/, (aib._410 ? '?board=' + brd + '&' : '?') + Math.random());
			} else {
				src = src.replace(/pl$/, 'pl?key=mainpage&amp;dummy=')
					.replace(/dummy=[\d\.]*/, 'dummy=' + Math.random());
				src = this.tNum ? src.replace(/mainpage|res\d+/, 'res' + this.tNum) :
					src.replace(/res\d+/, 'mainpage');
			}
			img.src = '';
			img.src = src;
		}
		this.cap.value = '';
		if(focus) {
			this.cap.focus();
		}
		if(this._lastCapUpdate) {
			this._lastCapUpdate = Date.now();
		}
	},
	setReply: function(quick, hide) {
		if(quick) {
			this.qArea.appendChild(this.pForm);
		} else {
			$after(this.pArea[+this.isTopForm], this.qArea);
			$after(this._pBtn[+this.isTopForm], this.pForm);
		}
		this.isHidden = hide;
		this.qArea.style.display = quick ? '' : 'none';
		this.pForm.style.display = hide ? 'none' : '';
		this.updatePAreaBtns();
	},
	updatePAreaBtns: function() {
		var txt = 'de-abtn de-parea-btn-',
			rep = TNum ? 'reply' : 'thrd';
		$t('a', this._pBtn[+this.isTopForm]).className = txt + (this.pForm.style.display === '' ? 'close' : rep);
		$t('a', this._pBtn[+!this.isTopForm]).className = txt + rep;
	},

	_lastCapUpdate: 0,
	_pBtn: [],
	_clearFileInput: function(el, eventFiles) {
		var cln = el.cloneNode(false);
		cln.innerHTML = el.innerHTML;
		el.parentNode.replaceChild(cln, el);
		if(eventFiles) {
			PostForm.eventFiles(cln);
		}
		this.file = $q('input[type="file"]', cln);
	},
	_init: function() {
		this.pForm = $New('div', {'id': 'de-pform'}, [this.form, this.oeForm]);
		var temp, el, btn = $New('div', {'class': 'de-' + (TNum ? 'make-reply' : 'create-thread')}, [
			$txt('['),
			$new('a', {'href': '#'}, null),
			$txt(']')
		]);
		$before(dForm, this.pArea[0] = $New('div', {'class': 'de-parea'}, [btn, doc.createElement('hr')]));
		this._pBtn[0] = btn;
		btn.firstElementChild.addEventListener('click', this.showMainReply.bind(this, false), true);
		btn = btn.cloneNode(true);
		btn.firstElementChild.addEventListener('click', this.showMainReply.bind(this, true), true);
		$after(aib.fch ? $c('board', dForm) : dForm, this.pArea[1] =
			$New('div', {'class': 'de-parea'}, [btn, doc.createElement('hr')]));
		this._pBtn[1] = btn;
		this.qArea = $add('<div id="de-qarea" class="' + aib.cReply + '" style="display: none;"></div>');
		this.isTopForm = Cfg['addPostForm'] !== 0;
		this.setReply(false, !TNum || Cfg['addPostForm'] > 1);
		if(Cfg['addPostForm'] === 3) {
			$append(this.qArea, [
				$add('<span id="de-qarea-target">' + Lng.replyTo[lang] + ' <a class="de-abtn"></a></span>'),
				$new('span', {'id': 'de-qarea-close', 'text': '\u2716'}, {'click': this.closeQReply.bind(this)})
			]);
		}
		if(aib.tire) {
			$each($Q('input[type="hidden"]', dForm), $del);
			dForm.appendChild($c('userdelete', doc.body));
			this.dpass = $q('input[type="password"]', dForm);
		}
		if(!this.form) {
			return;
		}
		this.form.style.display = 'inline-block';
		this.form.style.textAlign = 'left';
		if(nav.Firefox) {
			this.txta.addEventListener('mouseup', function() {
				saveCfg('textaWidth', parseInt(this.style.width, 10));
				saveCfg('textaHeight', parseInt(this.style.height, 10));
			}, false);
		} else {
			this.txta.insertAdjacentHTML('afterend', '<div id="de-txt-resizer"></div>');
			this.txta.nextSibling.addEventListener('mousedown', {
				el: this.txta,
				elStyle: this.txta.style,
				handleEvent: function(e) {
					switch(e.type) {
					case 'mousedown':
						doc.body.addEventListener('mousemove', this, false);
						doc.body.addEventListener('mouseup', this, false);
						$pd(e);
						return;
					case 'mousemove':
						var cr = this.el.getBoundingClientRect();
						this.elStyle.width = (e.pageX - cr.left - window.pageXOffset) + 'px';
						this.elStyle.height = (e.pageY - cr.top - window.pageYOffset) + 'px';
						return;
					default: // mouseup
						doc.body.removeEventListener('mousemove', this, false);
						doc.body.removeEventListener('mouseup', this, false);
						saveCfg('textaWidth', parseInt(this.elStyle.width, 10));
						saveCfg('textaHeight', parseInt(this.elStyle.height, 10));
					}
				}
			}, false);
		}
		if(aib.kus) {
			while(this.subm.nextSibling) {
				$del(this.subm.nextSibling);
			}
		}
		if(Cfg['addSageBtn'] && this.mail) {
			btn = $new('span', {'id': 'de-sagebtn'}, {'click': function(e) {
				e.stopPropagation();
				$pd(e);
				toggleCfg('sageReply');
				this._setSage();
			}.bind(this)});
			el = getAncestor(this.mail, 'LABEL') || this.mail;
			if(el.nextElementSibling || el.previousElementSibling) {
				$disp(el);
				$after(el, btn);
			} else {
				$disp(getAncestor(this.mail, 'TR'));
				$after(this.name || this.subm, btn);
			}
			this._setSage();
			if(aib.urup || aib._2chru) {
				while(btn.nextSibling) {
					$del(btn.nextSibling);
				}
			}
		}
		this.addTextPanel();
		this.txta.style.cssText = 'padding: 0; resize: both; width: ' +
			Cfg['textaWidth'] + 'px; height: ' + Cfg['textaHeight'] + 'px;';
		this.txta.addEventListener('keypress', function(e) {
			var code = e.charCode || e.keyCode;
			if((code === 33 || code === 34) && e.which === 0) {
				e.target.blur();
				window.focus();
			}
		}, false);
		if(!aib.tiny && !aib.nul) {
			this.subm.value = Lng.reply[lang];
		}
		this.subm.addEventListener('click', function(e) {
			var temp, val = this.txta.value,
				sVal = Cfg['signatValue'];
			if(aib._2chru && !aib.reqCaptcha) {
				GM_xmlhttpRequest({
					'method': 'GET',
					'url': '/' + brd + '/api/requires-captcha',
					'onreadystatechange': function(xhr) {
						if(xhr.readyState === 4 && xhr.status === 200) {
							aib.reqCaptcha = true;
							if(JSON.parse(xhr.responseText)['requires-captcha'] === '1') {
								$id('captcha_tr').style.display = 'table-row';
								$after(this.cap, $new('span', {
									'class': 'shortened',
									'style': 'margin: 0px 0.5em;',
									'text': 'проверить капчу'}, {
									'click': function() {
										GM_xmlhttpRequest({
											'method': 'POST',
											'url': '/' + brd + '/api/validate-captcha',
											'onreadystatechange': function(str) {
												if(str.readyState === 4 && str.status === 200) {
													if(JSON.parse(str.responseText)['status'] === 'ok') {
														this.innerHTML = 'можно постить';
													} else {
														this.innerHTML = 'неверная капча';
														setTimeout(function() {
															this.innerHTML = 'проверить капчу';
														}.bind(this), 1000);
													}
												}
											}.bind(this)
										})
									}
								}))
							} else {
								this.subm.click();
							}
						}
					}.bind(this)
				});
				$pd(e);
				return;
			}
			if(Cfg['warnSubjTrip'] && this.subj && /#.|##./.test(this.subj.value)) {
				$pd(e);
				$alert(Lng.subjHasTrip[lang], 'upload', false);
				return;
			}
			if(spells.haveOutreps) {
				val = spells.outReplace(val);
			}
			if(Cfg['userSignat'] && sVal) {
				val += '\n' + sVal;
			}
			if(this.tNum && pByNum[this.tNum].subj === 'Dollchan Extension Tools') {
				temp = '\n\n' + this._wrapText(aib.formButtons.bb[5], aib.formButtons.tag[5],
					'-'.repeat(50) + '\n' + nav.ua + '\nv' + version);
				if(!val.contains(temp)) {
					val += temp;
				}
			}
			this.txta.value = val;
			if(Cfg['ajaxReply']) {
				$alert(Lng.checking[lang], 'upload', true);
			}
			if(Cfg['favOnReply'] && this.tNum) {
				toggleFavorites(pByNum[this.tNum], $c('de-btn-fav', pByNum[this.tNum].btns));
			}
			if(this.video && (val = this.video.value) && (val = val.match(new YouTube().ytReg))) {
				this.video.value = aib.nul ? val[1] : 'http://www.youtube.com/watch?v=' + val[1];
			}
			if(this.isQuick) {
				$disp(this.pForm);
				$disp(this.qArea);
				$after(this._pBtn[+this.isTopForm], this.pForm);
			}
		}.bind(this), false);
		$each($Q('input[type="text"], input[type="file"]', this.form), function(node) {
			node.size = 30;
		});
		if(Cfg['noGoto'] && this.gothr) {
			$disp(this.gothr);
		}
		if(Cfg['noPassword'] && this.passw) {
			$disp(getAncestor(this.passw, 'TR'));
		}
		window.addEventListener('load', function() {
			if(Cfg['userName'] && this.name) {
				setTimeout(PostForm.setUserName, 1e3);
			}
			if(this.passw) {
				setTimeout(PostForm.setUserPassw, 1e3);
			}
		}.bind(this), false);
		if(this.cap) {
			if(aib.abu && (temp = $t('script', this.cap))) {
				$del(temp);
			}
			this.capTr = getAncestor(this.cap, 'TR');
			this.txta.addEventListener('focus', this._captchaInit.bind(this, this.capTr.innerHTML), false);
			if(this.file) {
				this.file.addEventListener('click', this._captchaInit.bind(this, this.capTr.innerHTML), false);
			}
			if(!aib.krau) {
				$disp(this.capTr);
			}
			this.capTr.innerHTML = '';
			this.cap = null;
		}
		if(Cfg['ajaxReply'] === 2) {
			if(aib.krau) {
				this.form.removeAttribute('onsubmit');
			}
			this.form.onsubmit = function(e) {
				$pd(e);
				if(aib.krau) {
					aib.addProgressTrack.click();
				}
				new html5Submit(this.form, this.subm, checkUpload);
			}.bind(this);
		} else if(Cfg['ajaxReply'] === 1) {
			this.form.target = 'de-iframe-pform';
			this.form.onsubmit = null;
		}
		if(this.file) {
			if('files' in this.file && this.file.files.length > 0) {
				this._clearFileInput(getAncestor(this.file, 'TR'), true);
			} else {
				PostForm.eventFiles(getAncestor(this.file, 'TR'));
			}
		}
	},
	_setSage: function() {
		var c = Cfg['sageReply'];
		$id('de-sagebtn').innerHTML = '&nbsp;' + (
			c ? '<span class="de-btn-sage"></span><b style="color: red;">SAGE</b>' : '<i>(no&nbsp;sage)</i>'
		);
		if(this.mail.type === 'text') {
			this.mail.value = c ? 'sage' : aib.fch ? 'noko' : '';
		} else {
			this.mail.checked = c;
		}
	},
	_toggleQuickReply: function(tNum) {
		if(this.oeForm) {
			$q('input[name="oek_parent"], input[name="replyto"]', this.oeForm).value = tNum;
		}
		if(this.form) {
			$q('#thr_id, input[name*="thread"]', this.form).value = tNum;
			if(aib.pony) {
				$q('input[name="quickreply"]', this.form).value = tNum || '';
			}
		}
	},
	_captchaInit: function(html) {
		if(this.capInited) {
			return;
		}
		this.capTr.innerHTML = html;
		this.cap = $q('input[type="text"][name*="aptcha"]:not([name="recaptcha_challenge_field"])', this.capTr);
		if(aib.iich || aib.abu) {
			$t('td', this.capTr).textContent = 'Капча';
		}
		if(aib.fch) {
			$script('loadRecaptcha()');
		}
		if(aib.tire) {
			$script('show_captcha()');
		}
		if(aib.krau) {
			aib.initCaptcha.click();
			$id('captcha_image').setAttribute('onclick',  'requestCaptcha(true);');
		}
		if(aib.dvachnet) {
			$script('get_captcha()');
		}
		setTimeout(this._captchaUpd.bind(this), 100);
	},
	_captchaUpd: function() {
		var img, a;
		if((this.recap = $id('recaptcha_response_field')) && (img = $id('recaptcha_image'))) {
			this.cap = this.recap;
			img.setAttribute('onclick', 'Recaptcha.reload()');
			img.style.cssText = 'width: 300px; cursor: pointer;';
		} else if(aib.fch) {
			setTimeout(this._captchaUpd.bind(this), 100);
			return;
		}
		this.capInited = true;
		this.cap.autocomplete = 'off';
		this.cap.onkeypress = (function() {
			var ru = 'йцукенгшщзхъфывапролджэячсмитьбюё',
				en = 'qwertyuiop[]asdfghjkl;\'zxcvbnm,.`';
			return function(e) {
				if(!Cfg['captchaLang'] || e.which === 0) {
					return;
				}
				var i, code = e.charCode || e.keyCode,
					chr = String.fromCharCode(code).toLowerCase();
				if(Cfg['captchaLang'] === 1) {
					if(code < 0x0410 || code > 0x04FF || (i = ru.indexOf(chr)) === -1) {
						return;
					}
					chr = en[i];
				} else {
					if(code < 0x0021 || code > 0x007A || (i = en.indexOf(chr)) === -1) {
						return;
					}
					chr = ru[i];
				}
				$pd(e);
				$txtInsert(e.target, chr);
			};
		})();
		if(aib.krau) {
			return;
		}
		if(aib.abu || aib.dobr || aib.dvachnet || this.recap || !(img = $q('img', this.capTr))) {
			$disp(this.capTr);
			return;
		}
		if(!aib.kus && !aib.tinyIb) {
			this._lastCapUpdate = Date.now();
			this.cap.onfocus = function() {
				if(this._lastCapUpdate && (Date.now() - this._lastCapUpdate > 3e5)) {
					this.refreshCapImg(false);
				}
			}.bind(this);
			if(!TNum && this.isQuick) {
				this.refreshCapImg(false);
			}
		}
		img.title = Lng.refresh[lang];
		img.alt = Lng.loading[lang];
		img.style.cssText = 'display: block; border: none; cursor: pointer;';
		img.onclick = this.refreshCapImg.bind(this, true);
		if((a = img.parentNode).tagName === 'A') {
			$after(a, img);
			$del(a);
		}
		$disp(this.capTr);
	},
	_wrapText: function(isBB, tag, text) {
		var m;
		if(isBB) {
			if(text.contains('\n')) {
				return '[' + tag + ']' + text + '[/' + tag + ']';
			}
			m = text.match(/^(\s*)(.*?)(\s*)$/);
			return m[1] + '[' + tag + ']' + m[2] + '[/' + tag + ']' + m[3];
		}
		for(var rv = '', i = 0, arr = text.split('\n'), len = arr.length; i < len; ++i) {
			m = arr[i].match(/^(\s*)(.*?)(\s*)$/);
			rv += '\n' + m[1] + (tag === '^H' ? m[2] + '^H'.repeat(m[2].length) :
				tag + m[2] + tag) + m[3];
		}
		return rv.slice(1);
	}
}

