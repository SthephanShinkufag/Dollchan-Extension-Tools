//============================================================================================================
//												MAIN PANEL
//============================================================================================================

function pButton(id, href, hasHotkey) {
	return '<li><a id="de-btn-' + id + '" class="de-abtn" ' + (hasHotkey ? 'de-' : '') + 'title="' +
		Lng.panelBtn[id][lang] +'" href="' + href + '"></a></li>';
}

function addPanel() {
	var panel, evtObject, imgLen = $Q(aib.qThumbImages, dForm).length;
	(pr && pr.pArea[0] || dForm).insertAdjacentHTML('beforebegin',
		'<div id="de-main" lang="' + getThemeLang() + '">' +
			'<div class="de-content"></div>' +
			'<div id="de-panel">' +
				'<span id="de-btn-logo" title="' + Lng.panelBtn['attach'][lang] + '"></span>' +
				'<ul id="de-panel-btns"' + (Cfg['expandPanel'] ? '>' : ' style="display: none">') +
				(Cfg['disabled'] ? pButton('enable', '#', false) :
					pButton('settings', '#', true) +
					pButton('hidden', '#', true) +
					pButton('favor', '#', true) +
					(aib.arch ? '' :
						pButton('refresh', '#', false) +
						(!TNum && (pageNum === aib.firstPage) ? '' :
							pButton('goback', aib.getPageUrl(brd, pageNum - 1), true)) +
						(TNum || pageNum === aib.lastPage ? '' :
							pButton('gonext', aib.getPageUrl(brd, pageNum + 1), true))
					) + pButton('goup', '#', false) +
					pButton('godown', '#', false) +
					(imgLen === 0 ? '' :
						pButton('expimg', '#', false) +
						pButton('maskimg', '#', true) +
						(nav.Opera || nav.noBlob ? '' : 
							(Cfg['preLoadImgs'] ? '' : pButton('preimg', '#', false)) +
							(!TNum && !aib.arch ? '' : pButton('imgload', '#', false)))) +
					(!TNum ? '' :
						pButton(Cfg['ajaxUpdThr'] ? 'upd-on' : 'upd-off', '#', false) +
						(nav.Safari ? '' : pButton('audio-off', '#', false))) +
					(!aib.nul && !aib.abu && (!aib.fch || aib.arch) ? '' :
						pButton('catalog', '//' + aib.host + '/' + (aib.abu ?
							'makaba/makaba.fcgi?task=catalog&board=' + brd : brd + '/catalog.html'), false)) +
					pButton('enable', '#', false) +
					(!TNum && !aib.arch ? '' :
						'<div id="de-panel-info"><span title="' + Lng.panelBtn['counter'][lang] +
							'">' + firstThr.pcount + '/' + imgLen + '</span></div>')
				) +
				'</ul>' +
			'</div>' +
		(Cfg['disabled'] ? '' :
			'<div id="de-img-btns" style="display: none">' +
				'<div id="de-img-btn-next" de-title="' + Lng.nextImg[lang] + '"><div></div></div>' +
				'<div id="de-img-btn-prev" de-title="' + Lng.prevImg[lang] + '"><div></div></div></div>' +
			'<div id="de-alert"></div>' +
			'<hr style="clear: both;">'
		) +
		'</div>'
	);
	panel = $id('de-panel');
	evtObject = {
		attach: false,
		odelay: 0,
		panel: panel,
		handleEvent: function(e) {
			switch(e.type) {
			case 'click':
				switch(e.target.id) {
				case 'de-btn-logo':
					if(Cfg['expandPanel']) {
						this.panel.lastChild.style.display = 'none';
						this.attach = false;
					} else {
						this.attach = true;
					}
					toggleCfg('expandPanel');
					return;
				case 'de-btn-settings': this.attach = toggleContent('cfg', false); break;
				case 'de-btn-hidden': this.attach = toggleContent('hid', false); break;
				case 'de-btn-favor': this.attach = toggleContent('fav', false); break;
				case 'de-btn-refresh': window.location.reload(); break;
				case 'de-btn-goup': scrollTo(0, 0); break;
				case 'de-btn-godown': scrollTo(0, doc.body.scrollHeight || doc.body.offsetHeight); break;
				case 'de-btn-expimg':
					isExpImg = !isExpImg;
					$del($c('de-img-center', doc));
					for(var post = firstThr.op; post; post = post.next) {
						post.toggleImages(isExpImg);
					}
					break;
				case 'de-btn-preimg':
					isPreImg = !isPreImg;
					if(!e.ctrlKey) {
						preloadImages(null);
					}
				break;
				case 'de-btn-maskimg':
					toggleCfg('maskImgs');
					updateCSS();
					break;
				case 'de-btn-upd-on':
				case 'de-btn-upd-off':
				case 'de-btn-upd-warn':
					if(updater.enabled) {
						updater.disable();
					} else {
						updater.enable();
					}
					break;
				case 'de-btn-audio-on':
				case 'de-btn-audio-off':
					if(updater.toggleAudio(0)) {
						updater.enable();
						e.target.id = 'de-btn-audio-on';
					} else {
						e.target.id = 'de-btn-audio-off';
					}
					$del($c('de-menu', doc));
					break;
				case 'de-btn-imgload':
					if($id('de-alert-imgload')) {
						break;
					}
					if(Images_.preloading) {
						$alert(Lng.loading[lang], 'imgload', true);
						Images_.afterpreload = loadDocFiles.bind(null, true);
						Images_.progressId = 'imgload';
					} else {
						loadDocFiles(true);
					}
					break;
				case 'de-btn-enable':
					toggleCfg('disabled');
					window.location.reload();
					break;
				default: return;
				}
				$pd(e);
				return;
			case 'mouseover':
				if(!Cfg['expandPanel']) {
					clearTimeout(this.odelay);
					this.panel.lastChild.style.display = '';
				}
				switch(e.target.id) {
				case 'de-btn-settings': KeyEditListener.setTitle(e.target, 10); break;
				case 'de-btn-hidden': KeyEditListener.setTitle(e.target, 7); break;
				case 'de-btn-favor': KeyEditListener.setTitle(e.target, 6); break;
				case 'de-btn-goback': KeyEditListener.setTitle(e.target, 4); break;
				case 'de-btn-gonext': KeyEditListener.setTitle(e.target, 17); break;
				case 'de-btn-maskimg': KeyEditListener.setTitle(e.target, 9); break;
				case 'de-btn-refresh':
					if(TNum) {
						return;
					}
				case 'de-btn-audio-off': addMenu(e);
				}
				return;
			default: // mouseout
				if(!Cfg['expandPanel'] && !this.attach) {
					this.odelay = setTimeout(function(obj) {
						obj.panel.lastChild.style.display = 'none';
						obj.attach = false;
					}, 500, this);
				}
				switch(e.target.id) {
				case 'de-btn-refresh':
				case 'de-btn-audio-off': removeMenu(e); break;
				}
			}
		}
	};
	panel.addEventListener('click', evtObject, true);
	panel.addEventListener('mouseover', evtObject, false);
	panel.addEventListener('mouseout', evtObject, false);
}

function toggleContent(name, isUpd) {
	if(liteMode) {
		return false;
	}
	var remove, el = $c('de-content', doc),
		id = 'de-content-' + name;
	if(!el) {
		return false;
	}
	if(isUpd && el.id !== id) {
		return true;
	}
	remove = !isUpd && el.id === id;
	if(el.hasChildNodes() && Cfg['animation']) {
		nav.animEvent(el, function(node) {
			showContent(node, id, name, remove);
			id = name = remove = null;
		});
		el.className = 'de-content de-cfg-close';
		return !remove;
	} else {
		showContent(el, id, name, remove);
		return !remove;
	}
}

function addContentBlock(parent, title) {
	return parent.appendChild($New('div', {'class': 'de-content-block'}, [
		$new('input', {'type': 'checkbox'}, {'click': function() {
			var el, res = this.checked, i = 0, els = $Q('.de-entry > div > input', this.parentNode);
			for(; el = els[i++];) {
				el.checked = res;
			}
		}}),
		$new('b', {'text': title}, null)
	]));
}

function showContent(cont, id, name, remove) {
	var h, b, tNum, i, els, post, cln, block, temp, cfgTabId;
	if(name === 'cfg' && !remove && (temp = $q('.de-cfg-tab-back[selected="true"] > .de-cfg-tab', cont))) {
		cfgTabId = temp.getAttribute('info');
	}
	cont.innerHTML = cont.style.backgroundColor = '';
	if(remove) {
		cont.removeAttribute('id');
		return;
	}
	cont.id = id;
	if(name === 'cfg') {
		addSettings(cont, cfgTabId);
	} else if(Cfg['attachPanel']) {
		cont.style.backgroundColor = getComputedStyle(doc.body).getPropertyValue('background-color');
	}

	if(name === 'hid') {
		for(i = 0, els = $C('de-post-hid', dForm); post = els[i++];) {
			if(post.isOp) {
				continue;
			}
			(cln = post.cloneNode(true)).removeAttribute('id');
			cln.style.display = '';
			if(cln.classList.contains(aib.cRPost)) {
				cln.classList.add('de-cloned-post');
			} else {
				cln.className = aib.cReply + ' de-cloned-post';
			}
			cln.post = Object.create(cln.clone = post.post);
			cln.post.el = cln;
			cln.btn = $q('.de-btn-hide, .de-btn-hide-user', cln);
			cln.btn.parentNode.className = 'de-ppanel';
			cln.btn.onclick = function() {
				this.hideContent(this.hidden = !this.hidden);
			}.bind(cln);
			(block || (block = cont.appendChild(
				$add('<div class="de-content-block"><b>' + Lng.hiddenPosts[lang] + ':</b></div>')
			))).appendChild($New('div', {'class': 'de-entry'}, [cln]));
		}
		if(block) {
			$append(cont, [
				$btn(Lng.expandAll[lang], '', function() {
					$each($Q('.de-cloned-post', this.parentNode), function(el) {
						var post = el.post;
						post.hideContent(post.hidden = !post.hidden);
					});
					this.value = this.value === Lng.undo[lang] ? Lng.expandAll[lang] : Lng.undo[lang];
				}),
				$btn(Lng.save[lang], '', function() {
					$each($Q('.de-cloned-post', this.parentNode), function(date, el) {
						if(!el.post.hidden) {
							el.clone.setUserVisib(false, date, true);
						}
					}.bind(null, Date.now()));
					saveUserPosts();
				})
			]);
		} else {
			cont.appendChild($new('b', {'text': Lng.noHidPosts[lang]}, null));
		}
		$append(cont, [
			doc.createElement('hr'),
			$new('b', {'text': ($isEmpty(hThr) ? Lng.noHidThrds[lang] : Lng.hiddenThrds[lang] + ':')}, null)
		]);
		for(b in hThr) {
			if(!$isEmpty(hThr[b])) {
				block = addContentBlock(cont, '/' + b);
				for(tNum in hThr[b]) {
					block.insertAdjacentHTML('beforeend', '<div class="de-entry" info="' + b + ';' +
						tNum + '"><div class="' + aib.cReply + '"><input type="checkbox"><a href="' +
						aib.getThrdUrl(b, tNum) + '" target="_blank">№' + tNum + '</a> - ' +
						hThr[b][tNum] + '</div></div>');
				}
			}
		}
		$append(cont, [
			doc.createElement('hr'),
			addEditButton('hidden', hThr, true, function(data) {
				hThr = data;
				if(!(brd in hThr)) {
					hThr[brd] = {};
				}
				firstThr.updateHidden(hThr[brd]);
				saveHiddenThreads(true);
				localStorage['__de-threads'] = JSON.stringify(hThr);
				localStorage.removeItem('__de-threads');
			}),
			$btn(Lng.clear[lang], Lng.clrDeleted[lang], function() {
				$each($Q('.de-entry[info]', this.parentNode), function(el) {
					var arr = el.getAttribute('info').split(';');
					ajaxLoad(aib.getThrdUrl(arr[0], arr[1]), false, null, function(eCode, eMsg, xhr) {
						if(eCode === 404) {
							delete hThr[this[0]][this[1]];
							saveHiddenThreads(true);
						}
					}.bind(arr));
				});
			}),
			$btn(Lng.remove[lang], Lng.clrSelected[lang], function() {
				$each($Q('.de-entry[info]', this.parentNode), function(date, el) {
					var post, arr = el.getAttribute('info').split(';');
					if($t('input', el).checked) {
						if(arr[1] in pByNum) {
							pByNum[arr[1]].setUserVisib(false, date, true);
						} else {
							localStorage['__de-post'] = JSON.stringify({
								'brd': arr[0],
								'date': date,
								'isOp': true,
								'num': arr[1],
								'hide': false
							});
							localStorage.removeItem('__de-post');
						}
						delete hThr[arr[0]][arr[1]];
					}
				}.bind(null, Date.now()));
				saveHiddenThreads(true);
			})
		]);
	}

	if(name === 'fav') {
		readFavorites();
		for(h in Favor) {
			for(b in Favor[h]) {
				block = addContentBlock(cont, h + '/' + b);
				for(tNum in Favor[h][b]) {
					i = Favor[h][b][tNum];
					if(!i['url'].startsWith('http')) {
						i['url'] = (h === aib.host ? aib.prot + '//' : 'http://') + h + i['url'];
					}
					block.appendChild($New('div', {'class': 'de-entry', 'info': h + ';' + b + ';' + tNum}, [
						$New('div', {'class': aib.cReply}, [
							$add('<input type="checkbox">'),
							$new('span', {'class': 'de-btn-expthr'}, {'click': loadFavorThread}),
							$add('<a href="' + i['url'] + '">№' + tNum + '</a>'),
							$add('<span class="de-fav-title"> - ' + i['txt'] + '</span>'),
							$add('<span class="de-fav-inf-page"></span>'),
							$add('<span class="de-fav-inf-posts">[<span class="de-fav-inf-old">' +
								i['cnt'] + '</span>]</span>')
						])
					]));
				}
			}
		}
		cont.insertAdjacentHTML('afterbegin', '<b>' + (Lng[block ? 'favThrds' : 'noFavThrds'][lang]) + '</b>');
		$append(cont, [
			doc.createElement('hr'),
			addEditButton('favor', Favor, true, function(data) {
				Favor = data;
				setStored('DESU_Favorites', JSON.stringify(Favor));
				toggleContent('fav', true);
			}),
			$btn(Lng.info[lang], Lng.infoCount[lang], function() {
				$each($C('de-entry', doc), function(el) {
					var c, arr = el.getAttribute('info').split(';'),
						f = Favor[arr[0]][arr[1]][arr[2]];
					if(arr[0] !== aib.host) {
						return;
					}
					c = $c('de-fav-inf-posts', el).firstElementChild;
					c.className = 'de-wait';
					c.textContent = '';
					ajaxLoad(aib.getThrdUrl(arr[1], arr[2]), true, function(form, xhr) {
						var cnt = aib.getPosts(form).length + 1;
						c.textContent = cnt;
						if(cnt > f.cnt) {
							c.className = 'de-fav-inf-new';
							f.cnt = cnt;
							setStored('DESU_Favorites', JSON.stringify(Favor));
						} else {
							c.className = 'de-fav-inf-old';
						}
						c = f = null;
					}, function(eCode, eMsg, xhr) {
						c.textContent = getErrorMessage(eCode, eMsg);
						c.className = 'de-fav-inf-old';
						c = null;
					});
				});
			}),
			$btn(Lng.page[lang], Lng.infoPage[lang], function() {
				var i = 6,
					loaded = 0;
				$alert(Lng.loading[lang], 'load-pages', true);
				while(i--) {
					ajaxLoad(aib.getPageUrl(brd, i), true, function(idx, form, xhr) {
						for(var arr, el, len = this.length, i = 0; i < len; ++i) {
							arr = this[i].getAttribute('info').split(';');
							if(arr[0] === aib.host && arr[1] === brd) {
								el = $c('de-fav-inf-page', this[i]);
								if((new RegExp('(?:№|No.|>)\\s*' + arr[2] + '\\s*<'))
									.test(form.innerHTML))
								{
									el.innerHTML = '@' + idx;
								} else if(loaded === 5 && !el.textContent.contains('@')) {
									el.innerHTML = '@?';
								}
							}
						}
						if(loaded === 5) {
							closeAlert($id('de-alert-load-pages'));
						}
						loaded++;
					}.bind($C('de-entry', doc), i), function(eCode, eMsg, xhr) {
						if(loaded === 5) {
							closeAlert($id('de-alert-load-pages'));
						}
						loaded++;
					});
				}
			}),
			$btn(Lng.clear[lang], Lng.clrDeleted[lang], function() {
				$each($C('de-entry', doc), function(el) {
					var arr = el.getAttribute('info').split(';');
					ajaxLoad(Favor[arr[0]][arr[1]][arr[2]]['url'], false, null, function(eCode, eMsg, xhr) {
						if(eCode === 404) {
							removeFavorites(arr[0], arr[1], arr[2]);
							saveFavorites();
							arr = null;
						}
					});
				});
			}),
			$btn(Lng.remove[lang], Lng.clrSelected[lang], function() {
				$each($C('de-entry', doc), function(el) {
					var arr = el.getAttribute('info').split(';');
					if($t('input', el).checked) {
						removeFavorites(arr[0], arr[1], arr[2]);
					}
				});
				saveFavorites();
			})
		]);
	}

	if(Cfg['animation']) {
		cont.className = 'de-content de-cfg-open';
	}
}

