/* ==[ WindowSettings.js ]====================================================================================
                                               WINDOW: SETTINGS
=========================================================================================================== */

const CfgWindow = {
	initCfgWindow(body) {
		body.addEventListener('click', this);
		body.addEventListener('mouseover', this);
		body.addEventListener('mouseout', this);
		body.addEventListener('change', this);
		body.addEventListener('keyup', this);
		body.addEventListener('keydown', this);
		body.addEventListener('scroll', this);

		// Create tab bar and bottom buttons
		let div = $bEnd(body, `<div id="de-cfg-bar">${
			this._getTab('filters') +
			this._getTab('posts') +
			this._getTab('images') +
			this._getTab('links') +
			(pr.form || pr.oeForm ? this._getTab('form') : '') +
			this._getTab('common') +
			this._getTab('info')
		}</div><div id="de-cfg-buttons">${ this._getSel('language') }</div>`);

		// Open default or current tab
		this._clickTab(Cfg.cfgTab);

		// "Edit" button. Calls a popup with editor to edit Settings in JSON.
		div.appendChild(getEditButton('cfg', fn => fn(Cfg, true, data => {
			saveCfgObj(aib.dm, data);
			deWindow.location.reload();
		})));

		// "Global" button. Allows to save/load global settings.
		nav.hasGlobalStorage && div.appendChild($btn(Lng.global[lang], Lng.globalCfg[lang], () => {
			const el = $popup('cfg-global', `<b>${ Lng.globalCfg[lang] }:</b>`);
			// "Load" button. Applies global settings for current domain.
			$bEnd(el, `<div id="de-list"><input type="button" value="${
				Lng.load[lang] }"> ${ Lng.loadGlobal[lang] }</div>`
			).firstElementChild.onclick = () => getStoredObj('DESU_Config').then(data => {
				if(data && ('global' in data) && !$isEmpty(data.global)) {
					saveCfgObj(aib.dm, data.global);
					deWindow.location.reload();
				} else {
					$popup('err-noglobalcfg', Lng.noGlobalCfg[lang]);
				}
			});
			// "Save" button. Copies the domain settings into global.
			div = $bEnd(el, `<div id="de-list"><input type="button" value="${
				Lng.save[lang] }"> ${ Lng.saveGlobal[lang] }</div>`
			).firstElementChild.onclick = () => getStoredObj('DESU_Config').then(data => {
				const obj = {};
				const com = data[aib.dm];
				for(const i in com) {
					if(i !== 'correctTime' && i !== 'timePattern' && i !== 'userCSS' &&
						i !== 'userCSSTxt' && i !== 'stats' && com[i] !== defaultCfg[i]
					) {
						obj[i] = com[i];
					}
				}
				data.global = obj;
				saveCfgObj('global', data.global);
				toggleWindow('cfg', true);
			});
			el.insertAdjacentHTML('beforeend', `<hr><small>${ Lng.descrGlobal[lang] }</small>`);
		}));

		// "File" button. Allows to save and load settings/favorites/hidden/etc from file.
		!nav.isPresto && div.appendChild($btn(Lng.file[lang], Lng.fileImpExp[lang], () => {
			const list = this._getList([
				Lng.panelBtn.cfg[lang] + ' ' + Lng.allDomains[lang],
				Lng.panelBtn.fav[lang],
				Lng.hidPostThr[lang] + ` (${ aib.dm })`,
				Lng.myPosts[lang] + ` (${ aib.dm })`
			]);
			// Create popup with controls
			$popup('cfg-file', `<b>${ Lng.fileImpExp[lang] }:</b><hr><!--
				--><div class="de-list">${ Lng.fileToData[lang] }:<div class="de-depend"><!--
					--><input type="file" accept=".json" id="de-import-file"></div></div><hr><!--
				--><div class="de-list"><a id="de-export-file" href="#">${ Lng.dataToFile[lang] }:<!--
				--><div class="de-depend">${ list }</div></div>`);
			// Import data from a file to the storage
			$id('de-import-file').onchange = e => {
				const file = e.target.files[0];
				if(!file) {
					return;
				}
				readFile(file, true).then(({ data }) => {
					let obj;
					try {
						obj = JSON.parse(data);
					} catch(err) {
						$popup('err-invaliddata', Lng.invalidData[lang]);
						return;
					}
					const cfgObj = obj.settings;
					const favObj = obj.favorites;
					const dmObj = obj[aib.dm];
					const isOldCfg = !cfgObj && !favObj && !dmObj;
					if(isOldCfg) {
						setStored('DESU_Config', data);
					}
					if(cfgObj) {
						try {
							setStored('DESU_Config', JSON.stringify(cfgObj));
							setStored('DESU_keys', JSON.stringify(obj.hotkeys));
						} catch(err) {}
					}
					if(favObj) {
						saveRenewFavorites(favObj);
					}
					if(dmObj) {
						if(dmObj.posts) {
							locStorage['de-posts'] = JSON.stringify(dmObj.posts);
						}
						if(dmObj.threads) {
							locStorage['de-threads'] = JSON.stringify(dmObj.threads);
						}
						if(dmObj.myposts) {
							locStorage['de-myposts'] = JSON.stringify(dmObj.myposts);
						}
					}
					if(cfgObj || dmObj || isOldCfg) {
						$popup('cfg-file', Lng.updating[lang], true);
						deWindow.location.reload();
						return;
					}
					closePopup('cfg-file');
				});
			};

			// Export data from a storage to the file. The file will be named by date and type of storage.
			// For example, like "DE_20160727_1540_Cfg+Fav+domain.com(Hid+You).json".
			const expFile = $id('de-export-file');
			const els = $Q('input', expFile.nextElementSibling);
			els[0].checked = true;
			expFile.addEventListener('click', async e => {
				const name = [], nameDm = [], d = new Date();
				let val = [], valDm = [];
				for(let i = 0, len = els.length; i < len; ++i) {
					if(!els[i].checked) {
						continue;
					}
					switch(i) {
					case 0: name.push('Cfg'); {
						const cfgData = await Promise.all([getStored('DESU_Config'), getStored('DESU_keys')]);
						val.push(`"settings":${ cfgData[0] }`, `"hotkeys":${ cfgData[1] || '""' }`);
						break;
					}
					case 1: name.push('Fav');
						val.push(`"favorites":${ await getStored('DESU_Favorites') || '{}' }`);
						break;
					case 2: nameDm.push('Hid');
						valDm.push(`"posts":${ locStorage['de-posts'] || '{}' }`,
							`"threads":${ locStorage['de-threads'] || '{}' }`);
						break;
					case 3: nameDm.push('You');
						valDm.push(`"myposts":${ locStorage['de-myposts'] || '{}' }`);
					}
				}
				if((valDm = valDm.join(','))) {
					val.push(`"${ aib.dm }":{${ valDm }}`);
					name.push(`${ aib.dm } (${ nameDm.join('+') })`);
				}
				if((val = val.join(','))) {
					downloadBlob(new Blob([`{${ val }}`], { type: 'application/json' }),
						`DE_${ d.getFullYear() }${ pad2(d.getMonth() + 1) }${ pad2(d.getDate()) }_${
							pad2(d.getHours()) }${ pad2(d.getMinutes()) }_${ name.join('+') }.json`);
				}
				$pd(e);
			}, true);
		}));

		// "Clear" button. Allows to clear settings/favorites/hidden/etc optionally.
		div.appendChild($btn(Lng.reset[lang] + '…', Lng.resetCfg[lang], () => $popup(
			'cfg-reset',
			`<b>${ Lng.resetData[lang] }:</b><hr>` +
			`<div class="de-list"><b>${ aib.dm }:</b>${
				this._getList([Lng.panelBtn.cfg[lang], Lng.hidPostThr[lang], Lng.myPosts[lang]])
			}</div><hr>` +
			`<div class="de-list"><b>${ Lng.allDomains[lang] }:</b>${
				this._getList([Lng.panelBtn.cfg[lang], Lng.panelBtn.fav[lang]])
			}</div><hr>`
		).appendChild($btn(Lng.clear[lang], '', e => {
			const els = $Q('input[type="checkbox"]', e.target.parentNode);
			for(let i = 1, len = els.length; i < len; ++i) {
				if(!els[i].checked) {
					continue;
				}
				switch(i) {
				case 1:
					locStorage.removeItem('de-posts');
					locStorage.removeItem('de-threads');
					break;
				case 2: locStorage.removeItem('de-myposts'); break;
				case 4: delStored('DESU_Favorites');
				}
			}
			if(els[3].checked) {
				delStored('DESU_Config');
				delStored('DESU_keys');
			} else if(els[0].checked) {
				getStoredObj('DESU_Config').then(data => {
					delete data[aib.dm];
					setStored('DESU_Config', JSON.stringify(data));
					$popup('cfg-reset', Lng.updating[lang], true);
					deWindow.location.reload();
				});
				return;
			}
			$popup('cfg-reset', Lng.updating[lang], true);
			deWindow.location.reload();
		}))));
	},

	// Event handler for Setting window and its controls.
	handleEvent(e) {
		const { type, target: el } = e;
		const tag = el.tagName;
		if(type === 'click' && tag === 'DIV' && el.classList.contains('de-cfg-tab')) {
			const info = el.getAttribute('info');
			this._clickTab(info);
			saveCfg('cfgTab', info);
		}
		if(type === 'change' && tag === 'SELECT') {
			const info = el.getAttribute('info');
			saveCfg(info, el.selectedIndex);
			this._updateDependant();
			switch(info) {
			case 'language':
				lang = el.selectedIndex;
				Panel.removeMain();
				if(pr.form) {
					pr.addMarkupPanel();
					pr.setPlaceholders();
					pr.updateLanguage();
					aib.updateSubmitBtn(pr.subm);
					if(pr.files) {
						$each($Q('.de-file-img, .de-file-txt-input', pr.form),
							el => (el.title = Lng.youCanDrag[lang]));
					}
				}
				this._updateCSS();
				Panel.initPanel(DelForm.first.el);
				toggleWindow('cfg', false);
				break;
			case 'delHiddPost': {
				const isHide = Cfg.delHiddPost === 1 || Cfg.delHiddPost === 2;
				for(let post = Thread.first.op; post; post = post.next) {
					if(post.isHidden && !post.isOp) {
						post.wrap.classList.toggle('de-hidden', isHide);
					}
				}
				updateCSS();
				break;
			}
			case 'postBtnsCSS':
				updateCSS();
				if(nav.isPresto) {
					$q('.de-svg-icons').remove();
					addSVGIcons();
				}
				break;
			case 'thrBtns':
			case 'noSpoilers':
			case 'resizeImgs': updateCSS(); break;
			case 'expandImgs':
				updateCSS();
				AttachedImage.closeImg();
				break;
			case 'imgNames':
				if(Cfg.imgNames) {
					for(const { el } of DelForm) {
						processImgInfoLinks(el, 0, Cfg.imgNames);
					}
				} else {
					$each($Q('.de-img-name'), el => {
						el.classList.remove('de-img-name');
						el.textContent = decodeURIComponent(el.getAttribute('de-href').split('/').pop());
						el.removeAttribute('title');
						if(!isPreImg && !Cfg.preLoadImgs) {
							el.removeAttribute('download');
							el.removeAttribute('de-href');
						}
					});
				}
				updateCSS();
				break;
			case 'fileInputs':
				pr.files.changeMode();
				pr.setPlaceholders();
				updateCSS();
				break;
			case 'addPostForm':
				pr.isBottom = Cfg.addPostForm === 1;
				pr.setReply(false, !aib.t || Cfg.addPostForm > 1);
				break;
			case 'addTextBtns': pr.addMarkupPanel();
				/* falls through */
			case 'scriptStyle':
			case 'panelCounter': this._updateCSS();
			}
			return;
		}
		if(type === 'click' && tag === 'INPUT' && el.type === 'checkbox') {
			const info = el.getAttribute('info');
			toggleCfg(info);
			this._updateDependant();
			switch(info) {
			case 'expandTrunc':
			case 'showHideBtn':
			case 'showRepBtn':
			case 'noPostNames':
			case 'widePosts':
			case 'imgNavBtns':
			case 'strikeHidd':
			case 'removeHidd':
			case 'noBoardRule':
			case 'userCSS': updateCSS(); break;
			case 'hideBySpell': Spells.toggle(); break;
			case 'sortSpells':
				if(Cfg.sortSpells) {
					Spells.toggle();
				}
				break;
			case 'hideRefPsts':
				for(let post = Thread.first.op; post; post = post.next) {
					if(!Cfg.hideRefPsts) {
						post.ref.unhideRef();
					} else if(post.isHidden) {
						post.ref.hideRef();
					}
				}
				break;
			case 'ajaxUpdThr':
				if(aib.t) {
					if(Cfg.ajaxUpdThr) {
						updater.enableUpdater();
					} else {
						updater.disableUpdater();
					}
				}
				break;
			case 'updCount': updater.toggleCounter(Cfg.updCount); break;
			case 'desktNotif':
				if(Cfg.desktNotif) {
					Notification.requestPermission();
				}
				break;
			case 'markNewPosts': Post.clearMarks(); break;
			case 'useDobrAPI': aib.JsonBuilder = Cfg.useDobrAPI ? DobrochanPostsBuilder : null; break;
			case 'markMyPosts':
			case 'markMyLinks':
				if(!Cfg.markMyPosts && !Cfg.markMyLinks) {
					locStorage.removeItem('de-myposts');
					MyPosts.purge();
				}
				updateCSS();
				break;
			case 'correctTime': DateTime.toggleSettings(el); break;
			case 'imgInfoLink': {
				const img = $q('.de-fullimg-wrap');
				if(img) {
					img.click();
				}
				updateCSS();
				break;
			}
			case 'imgSrcBtns':
				if(Cfg.imgSrcBtns) {
					for(const { el } of DelForm) {
						processImgInfoLinks(el, 1, 0);
						$each($Q('.de-img-embed'), el => addImgSrcButtons(el.parentNode.nextSibling));
					}
				} else {
					$delAll('.de-btn-src');
				}
				break;
			case 'addSageBtn':
				PostForm.hideField($parent(pr.mail, 'LABEL') || pr.mail);
				setTimeout(() => pr.toggleSage(), 0);
				updateCSS();
				break;
			case 'altCaptcha': pr.cap.initCapPromise(); break;
			case 'txtBtnsLoc':
				pr.addMarkupPanel();
				updateCSS();
				break;
			case 'userName': PostForm.setUserName(); break;
			case 'noPassword': $toggle($qParent(pr.passw, aib.qFormTr)); break;
			case 'noName': PostForm.hideField(pr.name); break;
			case 'noSubj': PostForm.hideField(pr.subj); break;
			case 'inftyScroll': toggleInfinityScroll(); break;
			case 'hotKeys':
				if(Cfg.hotKeys) {
					HotKeys.enableHotKeys();
				} else {
					HotKeys.disableHotKeys();
				}
			}
			return;
		}
		if(type === 'click' && tag === 'INPUT' && el.type === 'button') {
			switch(el.id) {
			case 'de-cfg-button-pass':
				$q('input[info="passwValue"]').value = Math.round(Math.random() * 1e15).toString(32);
				PostForm.setUserPassw();
				break;
			case 'de-cfg-button-keys':
				$pd(e);
				if($id('de-popup-edit-hotkeys')) {
					return;
				}
				Promise.resolve(HotKeys.readKeys()).then(keys => {
					const temp = KeyEditListener.getEditMarkup(keys);
					const el = $popup('edit-hotkeys', temp[1]);
					const fn = new KeyEditListener(el, keys, temp[0]);
					el.addEventListener('focus', fn, true);
					el.addEventListener('blur', fn, true);
					el.addEventListener('click', fn, true);
					el.addEventListener('keydown', fn, true);
					el.addEventListener('keyup', fn, true);
				});
				break;
			case 'de-cfg-button-updnow':
				$popup('updavail', Lng.loading[lang], true);
				getStoredObj('DESU_Config')
					.then(data => checkForUpdates(true, data.lastUpd))
					.then(html => $popup('updavail', html), emptyFn);
				break;
			case 'de-cfg-button-debug': {
				const perf = {};
				const arr = Logger.getLogData(true);
				for(let i = 0, len = arr.length; i < len; ++i) {
					perf[arr[i][0]] = arr[i][1];
				}
				$popup('cfg-debug', Lng.infoDebug[lang] + ':<textarea readonly class="de-editor"></textarea>'
				).firstElementChild.value = JSON.stringify({
					version  : version + '.' + commit,
					location : String(deWindow.location),
					nav,
					Cfg,
					sSpells  : Spells.list.split('\n'),
					oSpells  : sesStorage[`de-spells-${ aib.b }${ aib.t || '' }`],
					perf
				}, (key, value) => {
					switch(key) {
					case 'stats':
					case 'nameValue':
					case 'passwValue':
					case 'ytApiKey': return void 0;
					}
					return key in defaultCfg && value === defaultCfg[key] ? void 0 : value;
				}, '\t');
			}
			}
		}
		if(type === 'keyup' && tag === 'INPUT' && el.type === 'text') {
			const info = el.getAttribute('info');
			switch(info) {
			case 'postBtnsBack': {
				const isCheck = checkCSSColor(el.value);
				el.classList.toggle('de-input-error', !isCheck);
				if(isCheck) {
					saveCfg('postBtnsBack', el.value);
					updateCSS();
				}
				break;
			}
			case 'minImgSize': saveCfg('minImgSize', Math.max(+el.value, 1)); break;
			case 'zoomFactor': saveCfg('zoomFactor', Math.min(Math.max(+el.value, 1), 100)); break;
			case 'webmVolume': {
				const val = Math.min(+el.value || 0, 100);
				saveCfg('webmVolume', val);
				sendStorageEvent('__de-webmvolume', val);
				break;
			}
			case 'minWebmWidth': saveCfg('minWebmWidth', Math.max(+el.value, Cfg.minImgSize)); break;
			case 'maskVisib':
				saveCfg('maskVisib', Math.min(+el.value || 0, 100));
				updateCSS();
				break;
			case 'linksOver': saveCfg('linksOver', +el.value | 0); break;
			case 'linksOut': saveCfg('linksOut', +el.value | 0); break;
			case 'ytApiKey': saveCfg('ytApiKey', el.value.trim()); break;
			case 'passwValue': PostForm.setUserPassw(); break;
			case 'nameValue': PostForm.setUserName(); break;
			default: saveCfg(info, el.value);
			}
			return;
		}
		if(tag === 'A') {
			if(el.id === 'de-btn-spell-add') {
				switch(e.type) {
				case 'click': $pd(e); break;
				case 'mouseover': el.odelay = setTimeout(() => addMenu(el), Cfg.linksOver); break;
				case 'mouseout': clearTimeout(el.odelay);
				}
				return;
			}
			if(type === 'click') {
				switch(el.id) {
				case 'de-btn-spell-apply':
					$pd(e);
					saveCfg('hideBySpell', 1);
					$q('input[info="hideBySpell"]').checked = true;
					Spells.toggle();
					break;
				case 'de-btn-spell-clear':
					$pd(e);
					$id('de-spell-txt').value = '';
					Spells.toggle();
				}
			}
			return;
		}
		if(tag === 'TEXTAREA' && el.id === 'de-spell-txt' && (type === 'keydown' || type === 'scroll')) {
			this._updateRowMeter(el);
		}
	},

	// Switch content in Settings by clicking on tab
	_clickTab(info) {
		const el = $q(`.de-cfg-tab[info="${ info }"]`);
		if(el.hasAttribute('selected')) {
			return;
		}
		const prefTab = $q('.de-cfg-body');
		if(prefTab) {
			prefTab.className = 'de-cfg-unvis';
			$q('.de-cfg-tab[selected]').removeAttribute('selected');
		}
		el.setAttribute('selected', '');
		const id = el.getAttribute('info');
		let newTab = $id('de-cfg-' + id);
		if(!newTab) {
			newTab = $aEnd($id('de-cfg-bar'),
				id === 'filters' ? this._getCfgFilters() :
				id === 'posts' ? this._getCfgPosts() :
				id === 'images' ? this._getCfgImages() :
				id === 'links' ? this._getCfgLinks() :
				id === 'form' ? this._getCfgForm() :
				id === 'common' ? this._getCfgCommon() :
				this._getCfgInfo());
			if(id === 'filters') {
				this._updateRowMeter($id('de-spell-txt'));
			}
			if(id === 'common') {
				// XXX: remove and make insertion in this._getCfgCommon()
				$after($q('input[info="userCSS"]').parentNode, getEditButton(
					'css',
					fn => fn(Cfg.userCSSTxt, false, function() {
						saveCfg('userCSSTxt', this.value);
						updateCSS();
						toggleWindow('cfg', true);
					}),
					'de-cfg-button'
				));
			}
		}
		newTab.className = 'de-cfg-body';
		if(id === 'filters') {
			$id('de-spell-txt').value = Spells.list;
		}
		this._updateDependant();

		// Updates all inputs according to config
		const els = $Q('.de-cfg-chkbox, .de-cfg-inptxt, .de-cfg-select', newTab.parentNode);
		for(let i = 0, len = els.length; i < len; ++i) {
			const el = els[i];
			const info = el.getAttribute('info');
			if(el.tagName === 'INPUT') {
				if(el.type === 'checkbox') {
					el.checked = !!Cfg[info];
				} else {
					el.value = Cfg[info];
				}
			} else {
				el.selectedIndex = Cfg[info];
			}
		}
	},

	// "Filters" tab
	_getCfgFilters() {
		return `<div id="de-cfg-filters" class="de-cfg-unvis">
			<div id="de-spell-panel">
				${ this._getBox('hideBySpell') }
				<a id="de-btn-spell-add" class="de-abtn de-spell-btn" href="#">${ Lng.add[lang] }</a>
				<a id="de-btn-spell-apply" class="de-abtn de-spell-btn" href="#">${ Lng.apply[lang] }</a>
				<a id="de-btn-spell-clear" class="de-abtn de-spell-btn" href="#">${ Lng.clear[lang] }</a>
				<a class="de-abtn de-spell-btn" href="${ gitWiki }Spells-` +
					`${ lang ? 'en' : 'ru' }" target="_blank">[?]</a>
			</div>
			<div id="de-spell-editor">
				<div id="de-spell-rowmeter"></div>
				<textarea id="de-spell-txt" wrap="off"></textarea>
			</div>
			${ this._getBox('sortSpells') }<br>
			${ this._getBox('menuHiddBtn') }<br>
			${ this._getBox('hideRefPsts') }<br>
			${ this._getBox('nextPageThr') }<br>
			${ this._getSel('delHiddPost') }
		</div>`;
	},

	// "Posts" tab
	_getCfgPosts() {
		return `<div id="de-cfg-posts" class="de-cfg-unvis">
			${ localData ? '' : `${ this._getBox('ajaxUpdThr') }
				${ this._getInp('updThrDelay') }
				<div class="de-depend">
					${ this._getBox('updCount') }<br>
					${ this._getBox('favIcoBlink') }<br>
					${ 'Notification' in deWindow ? this._getBox('desktNotif') + '<br>' : '' }
					${ this._getBox('noErrInTitle') }<br>
					${ this._getBox('markNewPosts') }<br>
					${ aib.dobrochan ? this._getBox('useDobrAPI') : '' }
				</div>` }
			${ this._getBox('markMyPosts') }<br>
			${ !localData ? `${ this._getBox('hideReplies') }<br>
				${ this._getBox('expandTrunc') }<br>` : '' }
			${ this._getBox('showHideBtn') }
			${ !localData ? this._getBox('showRepBtn') : '' }<br>
			${ this._getSel('postBtnsCSS') }
			${ this._getInp('postBtnsBack', false, 8) }<br>
			${ !localData ? this._getSel('thrBtns') : '' }<br>
			${ this._getSel('noSpoilers') }<br>
			${ this._getBox('noPostNames') }<br>
			${ this._getBox('widePosts') }<br>
			${ this._getBox('correctTime') }
			${ this._getInp('timeOffset', true, 1) }
			<a class="de-abtn" target="_blank" href="${ gitWiki }Settings-time-` +
				`${ lang ? 'en' : 'ru' }">[?]</a>
			<div class="de-depend">
				${ this._getInp('timePattern', true, 24) }<br>
				${ this._getInp('timeRPattern', true, 24) }
			</div>
		</div>`;
	},

	// "Images" tab
	_getCfgImages() {
		return `<div id="de-cfg-images" class="de-cfg-unvis">
			${ this._getSel('expandImgs') }<br>
			<div class="de-depend">
				${ this._getBox('imgNavBtns') }<br>
				${ this._getBox('imgInfoLink') }<br>
				${ this._getSel('resizeImgs') }<br>
				${ Post.sizing.dPxRatio > 1 ? this._getBox('resizeDPI') + '<br>' : '' }
				${ this._getInp('minImgSize') }<br>
				${ this._getInp('zoomFactor') }<br>
				${ this._getBox('webmControl') }<br>
				${ this._getBox('webmTitles') }<br>
				${ this._getInp('webmVolume') }<br>
				${ this._getInp('minWebmWidth') }
			</div>
			${ nav.isPresto ? '' : this._getSel('preLoadImgs') + '<br>' }
			${ nav.isPresto || aib._4chan ? '' : `<div class="de-depend">
				${ this._getBox('findImgFile') }
			</div>` }
			${ this._getSel('openImgs') }<br>
			${ this._getBox('imgSrcBtns') }<br>
			${ this._getSel('imgNames') }<br>
			${ this._getInp('maskVisib') }
		</div>`;
	},

	// "Links" tab
	_getCfgLinks() {
		return `<div id="de-cfg-links" class="de-cfg-unvis">
			${ this._getBox('linksNavig') }
			<div class="de-depend">
				${ this._getInp('linksOver') }
				${ this._getInp('linksOut') }<br>
				${ this._getBox('markViewed') }<br>
				${ this._getBox('strikeHidd') }
				<div class="de-depend">${ this._getBox('removeHidd') }</div>
				${ this._getBox('noNavigHidd') }
			</div>
			${ this._getBox('markMyLinks') }<br>
			${ this._getBox('crossLinks') }<br>
			${ this._getBox('decodeLinks') }<br>
			${ this._getBox('insertNum') }<br>
			${ !localData ? `${ this._getBox('addOPLink') }<br>
				${ this._getBox('addImgs') }<br>` : '' }
			<div>
				${ this._getBox('addMP3') }
				${ aib.prot === 'http:' ? this._getBox('addVocaroo') : '' }
			</div>
			${ this._getSel('embedYTube') }
			<div class="de-depend">
				${ this._getInp('YTubeWidth', false) }\u00D7
				${ this._getInp('YTubeHeigh', false) }(px)<br>
				${ this._getBox('YTubeTitles') }<br>
				${ this._getInp('ytApiKey', true, 25) }<br>
				${ this._getBox('addVimeo') }
			</div>
		</div>`;
	},

	// "Form" tab
	_getCfgForm() {
		return `<div id="de-cfg-form" class="de-cfg-unvis">
			${ this._getBox('ajaxPosting') }<br>
			${ pr.form ? `<div class="de-depend">
				${ this._getBox('postSameImg') }<br>
				${ this._getBox('removeEXIF') }<br>
				${ this._getSel('removeFName') }<br>
				${ this._getBox('sendErrNotif') }<br>
				${ this._getBox('scrAfterRep') }<br>
				${ pr.files && !nav.isPresto ? this._getSel('fileInputs') : '' }
			</div>` : '' }
			${ pr.form ? this._getSel('addPostForm') + '<br>' : '' }
			${ pr.txta ? this._getBox('spacedQuote') + '<br>' : '' }
			${ this._getBox('favOnReply') }<br>
			${ pr.subj ? this._getBox('warnSubjTrip') + '<br>' : '' }
			${ pr.mail ? `${ this._getBox('addSageBtn') }
				${ this._getBox('saveSage') }<br>` : '' }
			${ pr.cap ? `${ aib.hasAltCaptcha ? `${ this._getBox('altCaptcha') }<br>` : '' }
				${ this._getInp('capUpdTime') }<br>
				${ this._getSel('captchaLang') }<br>` : '' }
			${ pr.txta ? `${ this._getSel('addTextBtns') }
				${ !aib._4chan ? this._getBox('txtBtnsLoc') : '' }<br>` : '' }
			${ pr.passw ? `${ this._getInp('passwValue', true, 9) }<input type="button"` +
				` id="de-cfg-button-pass" class="de-cfg-button" value="${ Lng.change[lang] }"><br>` : '' }
			${ pr.name ? `${ this._getInp('nameValue', false, 9) }
				${ this._getBox('userName') }<br>` : '' }
			${ pr.rules || pr.passw || pr.name ? Lng.hide[lang] +
				(pr.rules ? this._getBox('noBoardRule') : '') +
				(pr.passw ? this._getBox('noPassword') : '') +
				(pr.name ? this._getBox('noName') : '') +
				(pr.subj ? this._getBox('noSubj') : '') : '' }
		</div>`;
	},

	// "Common" tab
	_getCfgCommon() {
		return `<div id="de-cfg-common" class="de-cfg-unvis">
			${ this._getSel('scriptStyle') }<br>
			${ this._getBox('userCSS') }
			<a href="${ gitWiki }css-tricks" class="de-abtn" target="_blank">[?]</a><br>
			${ this._getSel('panelCounter') }<br>
			${ this._getBox('rePageTitle') }<br>
			${ 'animation' in docBody.style ? this._getBox('animation') + '<br>' : '' }
			${ this._getBox('closePopups') }<br>
			${ !localData ? `${ this._getBox('inftyScroll') }<br>
				${ this._getBox('scrollToTop') }<br>` : '' }
			${ this._getBox('hotKeys') }
			<input type="button" id="de-cfg-button-keys" class="de-cfg-button" value="${ Lng.edit[lang] }">
			<div class="de-depend">${ this._getInp('loadPages') }</div>
		</div>`;
	},

	// "Info" tab
	_getCfgInfo() {
		const statsTable = this._getInfoTable([
			[Lng.thrViewed[lang], Cfg.stats.view],
			[Lng.thrCreated[lang], Cfg.stats.op],
			[Lng.thrHidden[lang], HiddenThreads.getCount()],
			[Lng.postsSent[lang], Cfg.stats.reply]
		], false);
		return `<div id="de-cfg-info" class="de-cfg-unvis">
			<div style="padding-bottom: 10px;">
				<a href="${ gitWiki }versions" target="_blank">v${ version }.${ commit }` +
					`${ nav.isESNext ? '.es6' : '' }</a> |
				<a href="https://dscript.me/" target="_blank">Homepage</a> |
				<a href="${ gitWiki }${ lang === 1 ? 'home-en/' : '' }" target="_blank">Github</a> |
				<input type="button" id="de-cfg-button-debug" value="` +
					`${ Lng.debug[lang] }" title="${ Lng.infoDebug[lang] }">
			</div>
			<div id="de-info-table">
				<div id="de-info-stats">${ statsTable }</div>
				<div id="de-info-log">${ this._getInfoTable(Logger.getLogData(false), true) }</div>
			</div>
			${ !nav.hasWebStorage && !nav.isPresto && !localData || nav.hasGMXHR ? `
				<div style="margin-top: 3px; text-align: center;">&gt;&gt;
					<input type="button" id="de-cfg-button-updnow" value="${ Lng.checkNow[lang] }">
				&lt;&lt;</div><br>
				${ this._getSel('updDollchan') }` : '' }
		</div>`;
	},

	// Creates a label with checkbox for option switching
	_getBox: id => `<label class="de-cfg-label">
		<input class="de-cfg-chkbox" info="${ id }" type="checkbox"> ${ Lng.cfg[id][lang] }</label>`,
	// Creates a table for Info tab
	_getInfoTable: (data, needMs) => data.map(val => `<div class="de-info-row">
		<span class="de-info-name">${ val[0] }</span>
		<span>${ val[1] + (needMs ? 'ms' : '') }</span></div>`).join(''),
	// Creates a text input for text option values
	_getInp(id, addText = true, size = 2) {
		const el = doc.createElement('div');
		el.appendChild($txt(Cfg[id])); // Escape HTML
		return `<label class="de-cfg-label">
		<input class="de-cfg-inptxt" info="${ id }" type="text" size="${ size }" value="${
		el.innerHTML }">${ addText && Lng.cfg[id] ? Lng.cfg[id][lang] : '' }</label>`;
	},
	// Creates a menu with a list of checkboxes. Uses for popup window.
	_getList : arr => arrTags(arr, '<label class="de-block"><input type="checkbox"> ', '</label>'),
	// Creates a select for multiple option values
	_getSel  : id => `<label class="de-cfg-label"><select class="de-cfg-select" info="${ id }">${
		Lng.cfg[id].sel[lang].map((val, i) => `<option value="${ i }">${ val }</option>`).join('')
	}</select> ${ Lng.cfg[id].txt[lang] } </label>`,
	// Creates a tab for tab bar
	_getTab: id => `<div class="${ aib.cReply } de-cfg-tab" info="${ id }">${ Lng.cfgTab[id][lang] }</div>`,
	// Switching the dependent inputs according to their parents
	_toggleDependant(state, arr) {
		let i = arr.length;
		const nState = !state;
		while(i--) {
			const el = $q(arr[i]);
			if(el) {
				el.disabled = nState;
			}
		}
	},
	_updateCSS() {
		$delAll('#de-css, #de-css-dynamic, #de-css-user', doc.head);
		scriptCSS();
	},
	_updateDependant() {
		const fn = this._toggleDependant;
		fn(Cfg.ajaxUpdThr, [
			'input[info="updThrDelay"]', 'input[info="updCount"]', 'input[info="favIcoBlink"]',
			'input[info="markNewPosts"]', 'input[info="desktNotif"]', 'input[info="noErrInTitle"]'
		]);
		fn(Cfg.postBtnsCSS === 2, ['input[info="postBtnsBack"]']);
		fn(Cfg.expandImgs, [
			'input[info="imgNavBtns"]', 'input[info="imgInfoLink"]', 'input[info="resizeDPI"]',
			'select[info="resizeImgs"]', 'input[info="minImgSize"]', 'input[info="zoomFactor"]',
			'input[info="webmControl"]', 'input[info="webmTitles"]', 'input[info="webmVolume"]',
			'input[info="minWebmWidth"]'
		]);
		fn(Cfg.preLoadImgs, ['input[info="findImgFile"]']);
		fn(Cfg.linksNavig, [
			'input[info="linksOver"]', 'input[info="linksOut"]', 'input[info="markViewed"]',
			'input[info="strikeHidd"]', 'input[info="noNavigHidd"]'
		]);
		fn(Cfg.strikeHidd && Cfg.linksNavig, ['input[info="removeHidd"]']);
		fn(Cfg.embedYTube, [
			'input[info="YTubeWidth"]', 'input[info="YTubeHeigh"]', 'input[info="YTubeTitles"]',
			'input[info="ytApiKey"]', 'input[info="addVimeo"]'
		]);
		fn(Cfg.YTubeTitles, ['input[info="ytApiKey"]']);
		fn(Cfg.ajaxPosting, [
			'input[info="postSameImg"]', 'input[info="removeEXIF"]', 'select[info="removeFName"]',
			'input[info="sendErrNotif"]', 'input[info="scrAfterRep"]', 'select[info="fileInputs"]'
		]);
		fn(Cfg.addSageBtn, ['input[info="saveSage"]']);
		fn(Cfg.addTextBtns, ['input[info="txtBtnsLoc"]']);
		fn(Cfg.hotKeys, ['input[info="loadPages"]']);
	},
	// Updates row counter in spells editor
	_updateRowMeter(node) {
		const top = node.scrollTop;
		const el = node.previousElementSibling;
		let num = el.numLines || 1;
		let i = 17;
		if(num - i < ((top / 12) | 0 + 1)) {
			let str = '';
			while(i--) {
				str += `${ num++ }<br>`;
			}
			el.insertAdjacentHTML('beforeend', str);
			el.numLines = num;
		}
		el.scrollTop = top;
	}
};
