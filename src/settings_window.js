//============================================================================================================
//											SETTINGS WINDOW
//============================================================================================================

function fixSettings() {
	function toggleBox(state, arr) {
		var i = arr.length,
			nState = !state;
		while(i--) {
			($q(arr[i], doc) || {}).disabled = nState;
		}
	}
	toggleBox(Cfg['ajaxUpdThr'], [
		'input[info="noErrInTitle"]',
		'input[info="favIcoBlink"]',
		'input[info="markNewPosts"]',
		'input[info="desktNotif"]'
	]);
	toggleBox(Cfg['expandImgs'], [
		'input[info="resizeImgs"]', 'input[info="webmControl"]', 'input[info="webmVolume"]'
	]);
	toggleBox(Cfg['preLoadImgs'], ['input[info="findImgFile"]']);
	toggleBox(Cfg['openImgs'], ['input[info="openGIFs"]']);
	toggleBox(Cfg['linksNavig'], [
		'input[info="linksOver"]',
		'input[info="linksOut"]',
		'input[info="markViewed"]',
		'input[info="strikeHidd"]',
		'input[info="noNavigHidd"]'
	]);
	toggleBox(Cfg['addYouTube'] && Cfg['addYouTube'] !== 4, [
		'select[info="YTubeType"]', 'input[info="YTubeHD"]', 'input[info="addVimeo"]'
	]);
	toggleBox(Cfg['addYouTube'], [
		'input[info="YTubeWidth"]', 'input[info="YTubeHeigh"]', 'input[info="YTubeTitles"]'
	]);
	toggleBox(Cfg['ajaxReply'], ['input[info="sendErrNotif"]']);
	toggleBox(Cfg['ajaxReply'] === 2, [
		'input[info="postSameImg"]', 'input[info="removeEXIF"]', 'input[info="removeFName"]'
	]);
	toggleBox(Cfg['addTextBtns'], ['input[info="txtBtnsLoc"]']);
	toggleBox(Cfg['updScript'], ['select[info="scrUpdIntrv"]']);
	toggleBox(Cfg['keybNavig'], ['input[info="loadPages"]']);
}

function lBox(id, isBlock, Fn) {
	var el = $new('input', {'info': id, 'type': 'checkbox'}, {'click': function() {
		toggleCfg(this.getAttribute('info'));
		fixSettings();
		if(Fn) {
			Fn(this);
		}
	}});
	el.checked = Cfg[id];
	return $New('label', isBlock ? {'class': 'de-block'} : null, [el, $txt(' ' + Lng.cfg[id][lang])]);
}

function inpTxt(id, size, Fn) {
	return $new('input', {'info': id, 'type': 'text', 'size': size, 'value': Cfg[id]}, {
		'keyup': Fn ? Fn : function() {
			saveCfg(this.getAttribute('info'), this.value);
		}
	});
}

function optSel(id, isBlock, Fn) {
	for(var i = 0, x = Lng.cfg[id], len = x.sel[lang].length, el, opt = ''; i < len; i++) {
		opt += '<option value="' + i + '">' + x.sel[lang][i] + '</option>';
	}
	el = $add('<select info="' + id + '">' + opt + '</select>');
	el.addEventListener('change', Fn || function() {
		saveCfg(this.getAttribute('info'), this.selectedIndex);
		fixSettings();
	}, false);
	el.selectedIndex = Cfg[id];
	return $New('label', isBlock ? {'class': 'de-block'} : null, [el, $txt(' ' + x.txt[lang])]);
}

function cfgTab(name) {
	return $New('div', {'class': aib.cReply + ' de-cfg-tab-back', 'selected': false}, [$new('div', {
		'class': 'de-cfg-tab',
		'text': Lng.cfgTab[name][lang],
		'info': name}, {
		'click': function() {
			var el, id, pN = this.parentNode;
			if(pN.getAttribute('selected') === 'true') {
				return;
			}
			if(el = $c('de-cfg-body', doc)) {
				el.className = 'de-cfg-unvis';
				$q('.de-cfg-tab-back[selected="true"]', doc).setAttribute('selected', false);
			}
			pN.setAttribute('selected', true);
			if(!(el = $id('de-cfg-' + (id = this.getAttribute('info'))))) {
				$after($id('de-cfg-bar'), el =
					id === 'filters' ? getCfgFilters() :
					id === 'posts' ? getCfgPosts() :
					id === 'images' ? getCfgImages() :
					id === 'links' ? getCfgLinks() :
					id === 'form' ? getCfgForm() :
					id === 'common' ? getCfgCommon() :
					getCfgInfo()
				);
				if(id === 'filters') {
					updRowMeter.call($id('de-spell-edit'));
				}
			}
			el.className = 'de-cfg-body';
			if(id === 'filters') {
				$id('de-spell-edit').value = spells.list;
			}
			fixSettings();
		}
	})]);
}

function updRowMeter() {
	var str, top = this.scrollTop,
		el = this.parentNode.previousSibling.firstChild,
		num = el.numLines || 1,
		i = 15;
	if(num - i < ((top / 12) | 0 + 1)) {
		str = '';
		while(i--) {
			str += num++ + '<br>';
		}
		el.insertAdjacentHTML('beforeend', str);
		el.numLines = num;
	}
	el.scrollTop = top;
}

function getCfgFilters() {
	return $New('div', {'class': 'de-cfg-unvis', 'id': 'de-cfg-filters'}, [
		lBox('hideBySpell', false, toggleSpells),
		$New('div', {'id': 'de-spell-panel'}, [
			$new('a', {
				'id': 'de-btn-addspell',
				'text': Lng.add[lang],
				'href': '#',
				'class': 'de-abtn'}, {
				'click': $pd,
				'mouseover': addMenu,
				'mouseout': removeMenu
			}),
			$new('a', {'text': Lng.apply[lang], 'href': '#', 'class': 'de-abtn'}, {'click': function(e) {
				$pd(e);
				saveCfg('hideBySpell', 1);
				$q('input[info="hideBySpell"]', doc).checked = true;
				toggleSpells();
			}}),
			$new('a', {'text': Lng.clear[lang], 'href': '#', 'class': 'de-abtn'}, {'click': function(e) {
				$pd(e);
				$id('de-spell-edit').value = '';
				toggleSpells();
			}}),
			$add('<a href="https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/Spells-' +
				(lang ? 'en' : 'ru') + '" class="de-abtn" target="_blank">[?]</a>')
		]),
		$New('div', {'id': 'de-spell-div'}, [
			$add('<div><div id="de-spell-rowmeter"></div></div>'),
			$New('div', null, [$new('textarea', {'id': 'de-spell-edit', 'wrap': 'off'}, {
				'keydown': updRowMeter,
				'scroll': updRowMeter
			})])
		]),
		lBox('sortSpells', true, function() {
			if (Cfg['sortSpells']) {
				toggleSpells();
			}
		}),
		lBox('menuHiddBtn', true, null),
		lBox('hideRefPsts', true, null),
		lBox('delHiddPost', true, function() {
			$each($C('de-post-hid', dForm), function(el) {
				var wrap = el.post.wrap,
					hide = !wrap.classList.contains('de-hidden');
				if(hide) {
					wrap.insertAdjacentHTML('beforebegin',
						'<span style="counter-increment: de-cnt 1;"></span>');
				} else {
					$del(wrap.previousSibling);
				}
				wrap.classList.toggle('de-hidden');
			});
			updateCSS();
		})
	]);
}

function getCfgPosts() {
	return $New('div', {'class': 'de-cfg-unvis', 'id': 'de-cfg-posts'}, [
		lBox('ajaxUpdThr', false, TNum ? function() {
			if(Cfg['ajaxUpdThr']) {
				updater.enable();
			} else {
				updater.disable();
			}
		} : null),
		$New('label', null, [
			inpTxt('updThrDelay', 4, null),
			$txt(Lng.cfg['updThrDelay'][lang])
		]),
		$New('div', {'class': 'de-cfg-depend'}, [
			lBox('noErrInTitle', true, null),
			lBox('favIcoBlink', true, null),
			lBox('markNewPosts', true, function() {
				firstThr.clearPostsMarks();
			}),
			$if('Notification' in window, lBox('desktNotif', true, function() {
				if(Cfg['desktNotif']) {
					Notification.requestPermission();
				}
			}))
		]),
		optSel('expandPosts', true, null),
		optSel('postBtnsCSS', true, null),
		lBox('noSpoilers', true, updateCSS),
		lBox('noPostNames', true, updateCSS),
		lBox('noPostScrl', true, updateCSS),
		$New('div', null, [
			lBox('correctTime', false, dateTime.toggleSettings),
			$add('<a href="https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/Settings-time-' +
				(lang ? 'en' : 'ru') + '" class="de-abtn" target="_blank">[?]</a>')
		]),
		$New('div', {'class': 'de-cfg-depend'}, [
			$New('div', null, [
				inpTxt('timeOffset', 3, null),
				$txt(Lng.cfg['timeOffset'][lang])
			]),
			$New('div', null, [
				inpTxt('timePattern', 30, null),
				$txt(Lng.cfg['timePattern'][lang])
			]),
			$New('div', null, [
				inpTxt('timeRPattern', 30, null),
				$txt(Lng.cfg['timeRPattern'][lang])
			])
		])
	]);
}

function getCfgImages() {
	return $New('div', {'class': 'de-cfg-unvis', 'id': 'de-cfg-images'}, [
		optSel('expandImgs', true, null),
		$New('div', {'style': 'padding-left: 25px;'}, [
			lBox('resizeImgs', true, null),
			lBox('webmControl', true, null),
			inpTxt('webmVolume', 6, function() {
				var val = +this.value;
				saveCfg('webmVolume', val < 100 ? val : 100);
			}),
			$txt(Lng.cfg['webmVolume'][lang])
		]),
		$if(!nav.noBlob && !nav.Opera, lBox('preLoadImgs', true, null)),
		$if(!nav.noBlob && !nav.Opera, $New('div', {'class': 'de-cfg-depend'}, [
			lBox('findImgFile', true, null)
		])),
		lBox('openImgs', true, null),
		$New('div', {'class': 'de-cfg-depend'}, [ lBox('openGIFs', false, null)]),
		lBox('imgSrcBtns', true, null)
	]);
}

function getCfgLinks() {
	return $New('div', {'class': 'de-cfg-unvis', 'id': 'de-cfg-links'}, [
		optSel('linksNavig', true, null),
		$New('div', {'class': 'de-cfg-depend'}, [
			$New('div', null, [
				inpTxt('linksOver', 6, function() {
					saveCfg('linksOver', +this.value | 0);
				}),
				$txt(Lng.cfg['linksOver'][lang])
			]),
			$New('div', null, [
				inpTxt('linksOut', 6, function() {
					saveCfg('linksOut', +this.value | 0);
				}),
				$txt(Lng.cfg['linksOut'][lang])
			]),
			lBox('markViewed', true, null),
			lBox('strikeHidd', true, null),
			lBox('noNavigHidd', true, null)
		]),
		lBox('crossLinks', true, null),
		lBox('insertNum', true, null),
		lBox('addMP3', true, null),
		lBox('addImgs', true, null),
		optSel('addYouTube', true, null),
		$New('div', {'class': 'de-cfg-depend'}, [
			$New('div', null, [
				optSel('YTubeType', false, null),
				inpTxt('YTubeWidth', 6, null),
				$txt('×'),
				inpTxt('YTubeHeigh', 6, null),
				$txt(' '),
				lBox('YTubeHD', false, null)
			]),
			$if(!nav.oldOpera || nav.isGM, lBox('YTubeTitles', false, null)),
			lBox('addVimeo', true, null)
		])
	]);
}

function getCfgForm() {
	return $New('div', {'class': 'de-cfg-unvis', 'id': 'de-cfg-form'}, [
		optSel('ajaxReply', true, null),
		$if(pr.form && !nav.noBlob, $New('div', {'class': 'de-cfg-depend'}, [
			lBox('postSameImg', true, null),
			lBox('removeEXIF', true, null),
			lBox('removeFName', true, null),
			lBox('sendErrNotif', true, null)
		])),
		$if(pr.form, optSel('addPostForm', true, null)),
		$if(pr.form, lBox('scrAfterRep', true, null)),
		lBox('favOnReply', true, null),
		$if(pr.mail, $New('div', null, [
			lBox('addSageBtn', false, null),
			lBox('saveSage', false, null)
		])),
		$if(pr.subj, lBox('warnSubjTrip', false, null)),
		$if(pr.capTr, optSel('captchaLang', true, null)),
		$if(pr.txta, $New('div', null, [
			optSel('addTextBtns', false, function() {
				saveCfg('addTextBtns', this.selectedIndex);
				pr.addTextPanel();
			}),
			lBox('txtBtnsLoc', false, pr.addTextPanel.bind(pr))
		])),
		$if(pr.passw, $New('div', null, [
			inpTxt('passwValue', 20, PostForm.setUserPassw),
			$txt(Lng.cfg['userPassw'][lang]),
			$btn(Lng.change[lang], '', function() {
				$q('input[info="passwValue"]', doc).value = Math.round(Math.random() * 1e15).toString(32);
				PostForm.setUserPassw();
			})
		])),
		$if(pr.name, $New('div', null, [
			inpTxt('nameValue', 20, PostForm.setUserName),
			lBox('userName', false, PostForm.setUserName)
		])),
		$if(pr.txta, $New('div', null, [
			inpTxt('signatValue', 20, null),
			lBox('userSignat', false, null)
		])),
		$New('div', null, [
			$txt(Lng.dontShow[lang]),
			lBox('noBoardRule', false, updateCSS),
			$if(pr.gothr, lBox('noGoto', false, function() {
				$disp(pr.gothr);
			})),
			$if(pr.passw, lBox('noPassword', false, function() {
				$disp(pr.passw.parentNode.parentNode);
			}))
		])
	]);
}

function getCfgCommon() {
	return $New('div', {'class': 'de-cfg-unvis', 'id': 'de-cfg-common'}, [
		optSel('scriptStyle', true, function() {
			saveCfg('scriptStyle', this.selectedIndex);
			$id('de-main').lang = getThemeLang();
		}),
		$New('div', null, [
			lBox('userCSS', false, updateCSS),
			addEditButton('css', Cfg['userCSSTxt'], false, function() {
				saveCfg('userCSSTxt', this.value);
				updateCSS();
				toggleContent('cfg', true);
			})
		]),
		lBox('attachPanel', true, function() {
			toggleContent('cfg', false);
			updateCSS();
		}),
		lBox('panelCounter', true, updateCSS),
		lBox('rePageTitle', true, null),
		$if(nav.Anim, lBox('animation', true, null)),
		lBox('closePopups', true, null),
		$New('div', null, [
			lBox('keybNavig', false, function() {
				if(Cfg['keybNavig']) {
					if(keyNav) {
						keyNav.enable();
					} else {
						keyNav = new KeyNavigation();
					}
				} else if(keyNav) {
					keyNav.disable();
				}
			}),
			$btn(Lng.edit[lang], '', function(e) {
				$pd(e);
				if($id('de-alert-edit-keybnavig')) {
					return;
				}
				var aEl, evtListener, keys = KeyNavigation.readKeys(),
					temp = KeyEditListener.getEditMarkup(keys);
				$alert(temp[1], 'edit-keybnavig', false);
				aEl = $id('de-alert-edit-keybnavig');
				evtListener = new KeyEditListener(aEl, keys, temp[0]);
				aEl.addEventListener('focus', evtListener, true);
				aEl.addEventListener('blur', evtListener, true);
				aEl.addEventListener('click', evtListener, true);
				aEl.addEventListener('keydown', evtListener, true);
				aEl.addEventListener('keyup', evtListener, true);
			})
		]),
		$New('div', {'class': 'de-cfg-depend'}, [
			inpTxt('loadPages', 4, null),
			$txt(Lng.cfg['loadPages'][lang])
		]),
		$if(!nav.Opera || nav.isGM, $New('div', null, [
			lBox('updScript', true, null),
			$New('div', {'class': 'de-cfg-depend'}, [
				optSel('scrUpdIntrv', false, null),
				$btn(Lng.checkNow[lang], '', function() {
					var el = $id('de-cfg-updresult');
					el.innerHTML = '<span class="de-wait">' + Lng.checking[lang] + '</div>';
					checkForUpdates(true, function(html) {
						el.innerHTML = html;
					});
				})
			]),
			$new('div', {'id': 'de-cfg-updresult'}, null)
		]))
	]);
}

function getCfgInfo() {
	var getHiddenThrCount = function () {
		var b, tNum, count = 0;
		for(b in hThr) {
			for(tNum in hThr[b]) {
				count++;
			}
		}
		return count;
	}
	return $New('div', {'class': 'de-cfg-unvis', 'id': 'de-cfg-info'}, [
		$add('<div style="padding-bottom: 10px;">' +
			'<a href="https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/versions" ' +
			'target="_blank">v' + version + '</a>&nbsp;|&nbsp;' +
			'<a href="http://www.freedollchan.org/scripts/" target="_blank">Freedollchan</a>&nbsp;|&nbsp;' +
			'<a href="https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/' +
			(lang ? 'home-en/' : '') + '" target="_blank">Github</a></div>'),
		$add('<div><div style="display: inline-block; vertical-align: top; width: 186px; height: 235px;">' +
			Lng.thrViewed[lang] + Cfg['stats']['view'] + '<br>' +
			Lng.thrCreated[lang] + Cfg['stats']['op'] + '<br>' +
			Lng.thrHidden[lang] + getHiddenThrCount() + '<br>' +
			Lng.postsSent[lang] + Cfg['stats']['reply'] + '</div>' +
			'<div style="display: inline-block; padding-left: 7px; height: 235px; ' +
			'border-left: 1px solid grey;">' + timeLog.join('<br>') + '</div></div>'),
		$btn(Lng.debug[lang], Lng.infoDebug[lang], function() {
			$alert(Lng.infoDebug[lang] +
				':<textarea readonly id="de-debug-info" class="de-editor"></textarea>', 'help-debug', false);
			$id('de-debug-info').value = JSON.stringify({
				'version': version,
				'location': String(window.location),
				'nav': nav,
				'cfg': Cfg,
				'sSpells': spells.list.split('\n'),
				'oSpells': sessionStorage['de-spells-' + brd + TNum],
				'perf': timeLog
			}, function(key, value) {
				if(key in defaultCfg) {
					if(value === defaultCfg[key] || key === 'nameValue' || key === 'passwValue' ||
						key === 'signatValue')
					{
						return void 0;
					}
				}
				return key === 'stats' ? void 0 : value;
			}, '\t');
		})
	]);
}

function addEditButton(name, val, isJSON, Fn) {
	return $btn(Lng.edit[lang], Lng.editInTxt[lang], function() {
		var ta = $new('textarea', {
			'class': 'de-editor',
			'value': isJSON ? JSON.stringify(val, null, '\t') : val
		}, null);
		$alert('', 'edit-' + name, false);
		$append($c('de-alert-msg', $id('de-alert-edit-' + name)), [
			$txt(Lng.editor[name][lang]),
			ta,
			$btn(Lng.save[lang], Lng.saveChanges[lang], isJSON ? function(fun, aName) {
				var data;
				try {
					data = JSON.parse(this.value.trim().replace(/[\n\r\t]/g, '') || '{}');
				} finally {
					if(data) {
						fun(data);
						closeAlert($id('de-alert-edit-' + aName));
						closeAlert($id('de-alert-err-invaliddata'));
					} else {
						$alert(Lng.invalidData[lang], 'err-invaliddata', false);
					}
				}
			}.bind(ta, Fn, name) : Fn.bind(ta))
		]);
	});
}

function addSettings(Set, id) {
	Set.appendChild($New('div', {'class': aib.cReply}, [
		$new('div', {'id': 'de-cfg-head', 'text': 'Dollchan Extension Tools'}, null),
		$New('div', {'id': 'de-cfg-bar'}, [
			cfgTab('filters'),
			cfgTab('posts'),
			cfgTab('images'),
			cfgTab('links'),
			$if(pr.form || pr.oeForm, cfgTab('form')),
			cfgTab('common'),
			cfgTab('info')
		]),
		$New('div', {'id': 'de-cfg-btns'}, [
			optSel('language', false, function() {
				saveCfg('language', lang = this.selectedIndex);
				$del($id('de-main'));
				$del($id('de-css'));
				$del($id('de-css-dynamic'));
				scriptCSS();
				addPanel();
				toggleContent('cfg', false);
			}),
			$New('div', {'style': 'float: right;'}, [
				addEditButton('cfg', Cfg, true, function(data) {
					saveComCfg(aib.dm, data);
				}),
				$if(nav.isGlobal, $btn(Lng.load[lang], Lng.loadGlobal[lang], function() {
					if(('global' in comCfg) && !$isEmpty(comCfg['global'])) {
						saveComCfg(aib.dm, null);
						window.location.reload();
					} else {
						$alert(Lng.noGlobalCfg[lang], 'err-noglobalcfg', false);
					}
				})),
				$if(nav.isGlobal, $btn(Lng.save[lang], Lng.saveGlobal[lang], function() {
					var i, obj = {},
						com = comCfg[aib.dm];
					for(i in com) {
						if(com[i] !== defaultCfg[i] && i !== 'stats') {
							obj[i] = com[i];
						}
					}
					saveComCfg('global', obj);
					toggleContent('cfg', true);
				})),
				$btn(Lng.reset[lang], Lng.resetCfg[lang], function() {
					if(confirm(Lng.conReset[lang])) {
						delStored('DESU_Config');
						delStored('DESU_Favorites');
						delStored('DESU_Threads');
						delStored('DESU_keys');
						window.location.reload();
					}
				})
			]),
			$new('div', {'style': 'clear: both;'}, null)
		])
	]));
	$q('.de-cfg-tab[info="' + (id || 'filters') + '"]', Set).click();
}

