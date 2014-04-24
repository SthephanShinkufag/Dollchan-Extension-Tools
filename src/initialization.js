//============================================================================================================
//												INITIALIZATION
//============================================================================================================

function Initialization(checkDomains) {
	if(/^(?:about|chrome|opera|res)/i.test(window.location)) {
		return false;
	}
	if(!(window.localStorage && typeof localStorage === 'object' && window.sessionStorage)) {
		GM_log('WEBSTORAGE ERROR: please, enable webstorage!');
		return false;
	}
	var intrv, url;
	if(!aib) {
		aib = getImageBoard(checkDomains, true);
	}
	if(aib.init && aib.init()) {
		return false;
	}
	switch(window.name) {
	case '': break;
	case 'de-iframe-pform':
	case 'de-iframe-dform':
		$script((
			'window.top.postMessage("A' + window.name + '$#$' +
			getSubmitResponse(doc, true).join('$#$') + '", "*");'
		).replace(/\n|\r/g, '\\n'));
		return false;
	case 'de-iframe-fav':
		intrv = setInterval(function() {
			$script('window.top.postMessage("B' + (doc.body.offsetHeight + 5) + '", "*");');
		}, 1500);
		window.addEventListener('load', setTimeout.bind(window, clearInterval, 3e4, intrv), false);
		liteMode = true;
		pr = {};
	}
	dForm = $q(aib.qDForm, doc);
	if(!dForm || $id('de-panel')) {
		return false;
	}
	nav = getNavFuncs();

	window.addEventListener('storage', function(e) {
		var data, temp, post, val = e.newValue;
		if(!val) {
			return;
		}
		switch(e.key) {
		case '__de-post': {
			try {
				data = JSON.parse(val);
			} catch(e) {
				return;
			}
			temp = data['hide'];
			if(data['brd'] === brd && (post = pByNum[data['num']]) && (post.hidden ^ temp)) {
				post.setUserVisib(temp, data['date'], false);
			} else {
				if(!(data['brd'] in bUVis)) {
					bUVis[data['brd']] = {};
				}
				bUVis[data['brd']][data['num']] = [+!temp, data['date']];
			}
			if(data['isOp']) {
				if(!(data['brd'] in hThr)) {
					if(temp) {
						hThr[data['brd']] = {};
					} else {
						break;
					}
				}
				if(temp) {
					hThr[data['brd']][data['num']] = data['title'];
				} else {
					delete hThr[data['brd']][data['num']];
				}
			}
			break;
		}
		case '__de-threads': {
			try {
				hThr = JSON.parse(val);
			} catch(e) {
				return;
			}
			if(!(brd in hThr)) {
				hThr[brd] = {};
			}
			firstThr.updateHidden(hThr[brd]);
			break;
		}
		case '__de-spells': {
			try {
				data = JSON.parse(val);
			} catch(e) {
				return;
			}
			Cfg['hideBySpell'] = data['hide'];
			if(temp = $q('input[info="hideBySpell"]', doc)) {
				temp.checked = data['hide'];
			}
			doc.body.style.display = 'none';
			disableSpells();
			if(data['data']) {
				spells.setSpells(data['data'], false);
				if(temp = $id('de-spell-edit')) {
					temp.value = spells.list;
				}
			} else {
				if(data['data'] === '') {
					spells.disable();
					if(temp = $id('de-spell-edit')) {
						temp.value = '';
					}
					saveCfg('spells', '');
				}
				spells.enable = false;
			}
			doc.body.style.display = '';
		}
		default: return;
		}
		toggleContent('hid', true);
	}, false);

	url = (window.location.pathname || '').match(new RegExp(
		'^(?:\\/?([^\\.]*?)\\/?)?' + '(' + regQuote(aib.res) + ')?' +
		'(\\d+|index|wakaba|futaba)?' + '(\\.(?:[a-z]+))?(?:\\/|$)'
	));
	brd = url[1];
	TNum = url[2] ? url[3] :
		aib.futa ? +(window.location.search.match(/\d+/) || [false])[0] :
		false;
	pageNum = url[3] && !TNum ? +url[3] || aib.firstPage : aib.firstPage;
	if(!aib.hasOwnProperty('docExt') && url[4]) {
		aib.docExt = url[4];
	}
	dummy = doc.createElement('div');
	return true;
}

function parseThreadNodes(form, threads) {
	var el, i, len, node, fNodes = aProto.slice.call(form.childNodes),
		cThr = doc.createElement('div');
	for(i = 0, len = fNodes.length - 1; i < len; ++i) {
		node = fNodes[i];
		if(node.tagName === 'HR') {
			form.insertBefore(cThr, node);
			form.insertBefore(cThr.lastElementChild, node);
			el = cThr.lastElementChild;
			if(el.tagName === 'BR') {
				form.insertBefore(el, node);
			}
			threads.push(cThr);
			cThr = doc.createElement('div');
		} else {
			cThr.appendChild(node);
		}
	}
	cThr.appendChild(fNodes[i]);
	form.appendChild(cThr);
	return threads;
}

function parseDelform(node, thrds) {
	var i, lThr, len = thrds.length;
	$each($T('script', node), $del);
	if(len === 0) {
		Thread.parsed = true;
		thrds = parseThreadNodes(dForm, []);
		len = thrds.length;
	}
	if(len) {
		firstThr = lThr = new Thread(thrds[0], null);
	}
	for(i = 1; i < len; i++) {
		lThr = new Thread(thrds[i], lThr);
	}
	lastThr = lThr;
	node.setAttribute('de-form', '');
	node.removeAttribute('id');
	if(aib.abu && TNum) {
		lThr = firstThr.el;
		while((node = lThr.nextSibling) && node.tagName !== 'HR') {
			$del(node);
		}
	}
}

function replaceString(txt) {
	if(dTime) {
		txt = dTime.fix(txt);
	}
	if(aib.fch || aib.krau) {
		if(aib.fch) {
			txt = txt.replace(/<wbr>/g, '');
		}
		txt = txt.replace(/(^|>|\s|&gt;)(https*:\/\/.*?)(<\/a>)?(?=$|<|\s)/ig, function(x, a, b, c) {
			return c ? x : a + '<a href="' + b + '">' + b + '</a>';
		});
	}
	if(spells.haveReps) {
		txt = spells.replace(txt);
	}
	if(Cfg['crossLinks']) {
		txt = txt.replace(aib.reCrossLinks, function(str, b, tNum, pNum) {
			return '>&gt;&gt;/' + b + '/' + (pNum || tNum) + '<';
		});
	}
	return txt;
}

function replacePost(el) {
	if(aib.rep) {
		el.innerHTML = replaceString(el.innerHTML);
	}
	return el;
}

function replaceDelform() {
	if(liteMode) {
		doc.body.insertAdjacentHTML('afterbegin', dForm.outerHTML);
		dForm = doc.body.firstChild;
		window.addEventListener('load', function() {
			while(dForm.nextSibling) {
				$del(dForm.nextSibling);
			}
		}, false);
	} else if(aib.rep) {
		dForm.insertAdjacentHTML('beforebegin', replaceString(dForm.outerHTML));
		dForm.style.display = 'none';
		dForm.id = 'de-dform-old';
		dForm = dForm.previousSibling;
		window.addEventListener('load', function() {
			$del($id('de-dform-old'));
		}, false);
	}
}

function initDelformAjax() {
	var btn;
	if(Cfg['ajaxReply'] === 2) {
		dForm.onsubmit = $pd;
		if(btn = $q(aib.qDelBut, dForm)) {
			btn.onclick = function(e) {
				$pd(e);
				pr.closeQReply();
				$alert(Lng.deleting[lang], 'deleting', true);
				new html5Submit(dForm, e.target, checkDelete);
			};
		}
	} else if(Cfg['ajaxReply'] === 1) {
		dForm.insertAdjacentHTML('beforeend',
			'<iframe name="de-iframe-pform" src="about:blank" style="display: none;"></iframe>' +
			'<iframe name="de-iframe-dform" src="about:blank" style="display: none;"></iframe>'
		);
		dForm.target = 'de-iframe-dform';
		dForm.onsubmit = function() {
			pr.closeQReply();
			$alert(Lng.deleting[lang], 'deleting', true);
		};
	}
}

function initThreadUpdater(title, enableUpdate) {
	var delay, checked404, loadTO, audioRep, currentXHR, audioEl, stateButton, hasAudio,
		initDelay, favIntrv, favNorm, favHref, notifGranted, enabled = false,
		disabledByUser = true,
		inited = false,
		lastECode = 200,
		sendError = false,
		newPosts = 0,
		aPlayers = 0,
		focused = false;
	window.addEventListener('focus', onVis, false);
	window.addEventListener('blur', function() {
		focused = false;
		if(enabled) {
			firstThr.clearPostsMarks();
		}
	}, false);
	window.addEventListener('mousemove', function mouseMove() {
		window.removeEventListener('mousemove', mouseMove, false);
		onVis();
	}, false);

	if(enableUpdate) {
		init();
	}
	if(focused && Cfg['desktNotif'] && ('permission' in Notification)) {
		switch(Notification.permission.toLowerCase()) {
		case 'default': requestNotifPermission(); break;
		case 'denied': saveCfg('desktNotif', 0);
		}
	}

	function init() {
		audioEl = null;
		stateButton = null;
		hasAudio = false;
		initDelay = Cfg['updThrDelay'] * 1e3;
		favIntrv = 0;
		favNorm = notifGranted = inited = true;
		favHref = ($q('head link[rel="shortcut icon"]', doc) || {}).href;
		enable(true);
	}

	function enable(startLoading) {
		enabled = true;
		checked404 = false;
		newPosts = 0;
		delay = initDelay;
		if(startLoading) {
			loadTO = setTimeout(loadPostsFun, delay);
		}
	}

	function disable(byUser) {
		disabledByUser = byUser;
		if(enabled) {
			clearTimeout(loadTO);
			enabled = hasAudio = false;
			setState('off');
			var btn = $id('de-btn-audio-on');
			if(btn) {
				btn.id = 'de-btn-audio-off';
			}
		}
	}

	function toggleAudio(aRep) {
		if(!audioEl) {
			audioEl = $new('audio', {
				'preload': 'auto',
				'src': 'https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/signal.ogg'
			}, null);
		}
		audioRep = aRep;
		return hasAudio = !hasAudio;
	}

	function audioNotif() {
		if(focused) {
			hasAudio = false;
		} else {
			audioEl.play()
			setTimeout(audioNotif, audioRep);
			hasAudio = true;
		}
	}

	function requestNotifPermission() {
		notifGranted = false;
		Notification.requestPermission(function(state) {
			if(state.toLowerCase() === 'denied') {
				saveCfg('desktNotif', 0);
			} else {
				notifGranted = true;
			}
		});
	}

	function loadPostsFun() {
		currentXHR = firstThr.loadNew(onLoaded, true);
	}

	function forceLoadPosts() {
		if(currentXHR) {
			currentXHR.abort();
		}
		if(!enabled && !disabledByUser) {
			enable(false);
		} else {
			clearTimeout(loadTO);
			delay = initDelay;
		}
		loadPostsFun();
	}

	function onLoaded(eCode, eMsg, lPosts, xhr) {
		if(currentXHR !== xhr && eCode === 0) { // Loading aborted
			return;
		}
		currentXHR = null;
		infoLoadErrors(eCode, eMsg, -1);
		if(eCode !== 200 && eCode !== 304) {
			lastECode = eCode;
			if(!Cfg['noErrInTitle']) {
				updateTitle();
			}
			if(eCode !== 0 && Math.floor(eCode / 500) === 0) {
				if(eCode === 404 && !checked404) {
					checked404 = true;
				} else {
					updateTitle();
					disable(false);
					return;
				}
			}
			setState('warn');
			if(enabled) {
				loadTO = setTimeout(loadPostsFun, delay);
			}
			return;
		}
		if(lastECode !== 200) {
			lastECode = 200;
			setState('on');
			checked404 = false;
			if((focused || lPosts === 0) && !Cfg['noErrInTitle']) {
				updateTitle();
			}
		}
		if(!focused) {
			if(lPosts !== 0) {
				if(Cfg['favIcoBlink'] && favHref && newPosts === 0) {
					favIntrv = setInterval(function() {
						$del($q('link[rel="shortcut icon"]', doc.head));
						doc.head.insertAdjacentHTML('afterbegin', '<link rel="shortcut icon" href="' +
							(!favNorm ? favHref : 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAA' +
							'AQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVR' +
							'Ix2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII=') + '">');
						favNorm = !favNorm;
					}, 800);
				}
				newPosts += lPosts;
				updateTitle();
				if(Cfg['desktNotif'] && notifGranted) {
					var post = firstThr.last,
						imgs = post.images,
						notif = new Notification(aib.dm + '/' + brd + '/' + TNum + ': ' + newPosts +
							Lng.newPost[lang][lang !== 0 ? +(newPosts !== 1) : (newPosts % 10) > 4 ||
							(newPosts % 10) === 0 || (((newPosts % 100) / 10) | 0) === 1 ? 2 :
							(newPosts % 10) === 1 ? 0 : 1] + Lng.newPost[lang][3],
						{
							'body': post.text.substring(0, 250).replace(/\s+/g, ' '),
							'tag': aib.dm + brd + TNum,
							'icon': imgs.length === 0 ? favHref : imgs[0].src
						});
					notif.onshow = function() {
						setTimeout(this.close.bind(this), 12e3);
					};
					notif.onclick = function() {
						window.focus();
					};
					notif.onerror = function() {
						window.focus();
						requestNotifPermission();
					};
				}
				if(hasAudio) {
					if(audioRep) {
						audioNotif();
					} else {
						audioEl.play()
					}
				}
				delay = initDelay;
			} else if(delay !== 12e4) {
				delay = Math.min(delay + initDelay, 12e4);
			}
		}
		if(enabled) {
			loadTO = setTimeout(loadPostsFun, delay);
		}
	}

	function setState(state) {
		var btn = stateButton || (stateButton = $q('a[id^="de-btn-upd"]', doc));
		btn.id = 'de-btn-upd-' + state;
		btn.title = Lng.panelBtn['upd-' + (state === 'off' ? 'off' : 'on')][lang];
	}

	function onVis() {
		if(enabled) {
			if(Cfg['favIcoBlink'] && favHref) {
				clearInterval(favIntrv);
				favNorm = true;
				$del($q('link[rel="shortcut icon"]', doc.head));
				doc.head.insertAdjacentHTML('afterbegin', '<link rel="shortcut icon" href="' + favHref + '">');
			}
			newPosts = 0;
		}
		focused = true;
		sendError = false;
		setTimeout(function() {
			updateTitle();
			if(enabled) {
				forceLoadPosts();
			}
		}, 200);
	}

	function updateTitle() {
		doc.title = (aPlayers === 0 ? '' : '♫ ') +
			(sendError === true ? '{' + Lng.error[lang] + '} ' : '') +
			(lastECode === 200 ? '' : '{' + lastECode + '} ') +
			(newPosts === 0 ? '' : '[' + newPosts + '] ') + title;
	}

	function addPlayingTag() {
		aPlayers++;
		if(aPlayers === 1) {
			updateTitle();
		}
	}

	function removePlayingTag() {
		aPlayers = Math.max(aPlayers - 1, 0);
		if(aPlayers === 0) {
			updateTitle();
		}
	}

	function sendErrNotif() {
		if(Cfg['sendErrNotif'] && !focused) {
			sendError = true;
			updateTitle();
		}
	}

	return {
		get enabled() {
			return enabled;
		},
		get focused() {
			return focused;
		},
		forceLoad: forceLoadPosts,
		enable: function() {
			if(!inited) {
				init();
			} else if(!enabled) {
				enable(true);
			} else {
				return;
			}
			setState('on');
		},
		disable: function() {
			disable(true);
		},
		toggleAudio: toggleAudio,
		addPlayingTag: addPlayingTag,
		removePlayingTag: removePlayingTag,
		sendErrNotif: sendErrNotif
	};
}

function initPage() {
	if(Cfg['updScript']) {
		checkForUpdates(false, function(html) {
			$alert(html, 'updavail', false);
		});
	}
	if(TNum) {
		if(Cfg['rePageTitle']) {
			if(aib.abu) {
				window.addEventListener('load', function() {
					doc.title = '/' + brd + ' - ' + pByNum[TNum].title;
				}, false);
			}
			doc.title = '/' + brd + ' - ' + pByNum[TNum].title;
		}
		firstThr.el.insertAdjacentHTML('afterend',
			'<div id="de-updater-div">&gt;&gt; [<a class="de-abtn" id="de-updater-btn" href="#"></a>]</div>');
		firstThr.el.nextSibling.addEventListener('click', Thread.loadNewPosts, false);
	} else if(needScroll) {
		setTimeout(window.scrollTo, 20, 0, 0);
	}
	updater = initThreadUpdater(doc.title, TNum && Cfg['ajaxUpdThr']);
}

