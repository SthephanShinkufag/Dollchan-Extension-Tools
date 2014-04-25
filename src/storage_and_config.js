//============================================================================================================
//											STORAGE & CONFIG
//============================================================================================================

function getStored(id) {
	return nav.isGM ? GM_getValue(id) :
		nav.isSStorage ? scriptStorage.getItem(id) :
		localStorage.getItem(id);
}

function setStored(id, value) {
	if(nav.isGM) {
		GM_setValue(id, value);
	} else if(nav.isSStorage) {
		scriptStorage.setItem(id, value);
	} else {
		localStorage.setItem(id, value);
	}
}

function delStored(id) {
	if(nav.isGM) {
		GM_deleteValue(id);
	} else if(nav.isSStorage) {
		scriptStorage.removeItem(id);
	} else {
		localStorage.removeItem(id);
	}
}

function getStoredObj(id) {
	try {
		var data = JSON.parse(getStored(id));
	} finally {
		return data || {};
	}
}

function saveComCfg(dm, obj) {
	comCfg = getStoredObj('DESU_Config');
	if(obj) {
		comCfg[dm] = obj;
	} else {
		delete comCfg[dm];
	}
	setStored('DESU_Config', JSON.stringify(comCfg) || '');
}

function saveCfg(id, val) {
	if(Cfg[id] !== val) {
		Cfg[id] = val;
		saveComCfg(aib.dm, Cfg);
	}
}

function Config(obj) {
	for(var i in obj) {
		this[i] = obj[i];
	}
}
Config.prototype = defaultCfg;

function readCfg() {
	var obj;
	comCfg = getStoredObj('DESU_Config');
	if(!(aib.dm in comCfg) || $isEmpty(obj = comCfg[aib.dm])) {
		obj = nav.isGlobal ? comCfg['global'] || {} : {};
		obj['captchaLang'] = aib.ru ? 2 : 1;
		obj['correctTime'] = 0;
	}
	Cfg = new Config(obj);
	if(!Cfg['timeOffset']) {
		Cfg['timeOffset'] = '+0';
	}
	if(!Cfg['timePattern']) {
		Cfg['timePattern'] = aib.timePattern;
	}
	if(nav.noBlob) {
		Cfg['preLoadImgs'] = 0;
		if(Cfg['ajaxReply'] === 2) {
			Cfg['ajaxReply'] = 1;
		}
	}
	if(aib.tiny && Cfg['ajaxReply'] === 2) {
		Cfg['ajaxReply'] = 1;
	}
	if(!nav.Firefox) {
		defaultCfg['favIcoBlink'] = 0;
	}
	if(!('Notification' in window)) {
		Cfg['desktNotif'] = 0;
	}
	if(nav.Opera) {
		if(nav.oldOpera) {
			if(!nav.isGM) {
				Cfg['YTubeTitles'] = 0;
			}
			Cfg['animation'] = 0;
		}
		if(Cfg['YTubeType'] === 2) {
			Cfg['YTubeType'] = 1;
		}
		Cfg['preLoadImgs'] = 0;
		Cfg['findImgFile'] = 0;
		if(!nav.isGM) {
			Cfg['updScript'] = 0;
		}
	}
	if(Cfg['updThrDelay'] < 10) {
		Cfg['updThrDelay'] = 10;
	}
	if(!Cfg['saveSage']) {
		Cfg['sageReply'] = 0;
	}
	if(!Cfg['passwValue']) {
		Cfg['passwValue'] = Math.round(Math.random() * 1e15).toString(32);
	}
	if(!Cfg['stats']) {
		Cfg['stats'] = {'view': 0, 'op': 0, 'reply': 0};
	}
	if(TNum) {
		Cfg['stats']['view']++;
	}
	saveComCfg(aib.dm, Cfg);
	lang = Cfg['language'];
	if(Cfg['correctTime']) {
		dTime = new dateTime(Cfg['timePattern'], Cfg['timeRPattern'], Cfg['timeOffset'], lang, function(rp) {
			saveCfg('timeRPattern', rp);
		});
	}
	if(aib.dobr) {
		aib.hDTFix = new dateTime(
			'yyyy-nn-dd-hh-ii-ss',
			'_d _M _y (_w) _h:_i ',
			Cfg['timeOffset'] || 0,
			Cfg['correctTime'] ? lang : 1,
			null
		);
	}
}

function toggleCfg(id) {
	saveCfg(id, +!Cfg[id]);
}

function readPosts() {
	var data, str = TNum ? sessionStorage['de-hidden-' + brd + TNum] : null;
	if(typeof str === 'string') {
		data = str.split(',');
		if(data.length === 4 && +data[0] === (Cfg['hideBySpell'] ? spells.hash : 0) &&
			(data[1] in pByNum) && pByNum[data[1]].count === +data[2])
		{
			sVis = data[3].split('');
			return;
		}
	}
	sVis = [];
}

function readUserPosts() {
	bUVis = getStoredObj('DESU_Posts_' + aib.dm);
	uVis = bUVis[brd];
	if(!uVis) {
		bUVis[brd] = uVis = getStoredObj('DESU_Posts_' + aib.dm + '_' + brd);
		delStored('DESU_Posts_' + aib.dm + '_' + brd);
	}
	hThr = getStoredObj('DESU_Threads_' + aib.dm);
	if(!(brd in hThr)) {
		hThr[brd] = {};
	}
}

function savePosts() {
	if(TNum) {
		var lPost = firstThr.lastNotDeleted;
		sessionStorage['de-hidden-' + brd + TNum] = (Cfg['hideBySpell'] ? spells.hash : '0') +
			',' + lPost.num + ',' + lPost.count + ',' + sVis.join('');
	}
	saveHiddenThreads(false);
	toggleContent('hid', true);
}

function saveUserPosts() {
	var minDate, b, vis, key, str = JSON.stringify(bUVis);
	if(str.length > 1e6) {
		minDate = Date.now() - 5 * 24 * 3600 * 1000;
		for(b in bUVis) {
			if(bUVis.hasOwnProperty(b)) {
				vis = bUVis[b];
				for(key in vis) {
					if(vis.hasOwnProperty(key) && vis[key][1] < minDate) {
						delete vis[key];
					}
				}
			}
		}
		str = JSON.stringify(bUVis);
	}
	setStored('DESU_Posts_' + aib.dm, str);
	toggleContent('hid', true);
}

function saveHiddenThreads(updContent) {
	setStored('DESU_Threads_' + aib.dm, JSON.stringify(hThr));
	if(updContent) {
		toggleContent('hid', true);
	}
}

function readFavorites() {
	Favor = getStoredObj('DESU_Favorites');
}

function saveFavorites() {
	setStored('DESU_Favorites', JSON.stringify(Favor));
	toggleContent('fav', true);
}

function removeFavorites(h, b, tNum) {
	delete Favor[h][b][tNum];
	if($isEmpty(Favor[h][b])) {
		delete Favor[h][b];
	}
	if($isEmpty(Favor[h])) {
		delete Favor[h];
	}
	if(pByNum[tNum]) {
		($c('de-btn-fav-sel', pByNum[tNum].btns) || {}).className = 'de-btn-fav';
	}
}

function toggleFavorites(post, btn) {
	var h = aib.host,
		b = brd,
		tNum = post.num;
	if(!btn) {
		return;
	}
	readFavorites();
	if(Favor[h] && Favor[h][b] && Favor[h][b][tNum]) {
		removeFavorites(h, b, tNum);
		saveFavorites();
		return;
	}
	if(!Favor[h]) {
		Favor[h] = {};
	}
	if(!Favor[h][b]) {
		Favor[h][b] = {};
	}
	Favor[h][b][tNum] = {
		'cnt': post.thr.pcount,
		'txt': post.title,
		'url': aib.getThrdUrl(brd, tNum)
	};
	btn.className = 'de-btn-fav-sel';
	saveFavorites();
}

function readViewedPosts() {
	if(Cfg['markViewed']) {
		var data = sessionStorage['de-viewed'];
		if(data) {
			data.split(',').forEach(function(pNum) {
				var post = pByNum[pNum];
				if(post) {
					post.el.classList.add('de-viewed');
					post.viewed = true;
				}
			});
		}
	}
}

