/* ==[ Storage.js ]===========================================================================================
                                                   STORAGE
=========================================================================================================== */

// Gets data from the global storage
async function getStored(id) {
	if(nav.hasNewGM) {
		const value = await GM.getValue(id);
		return value;
	} else if(nav.hasOldGM) {
		return GM_getValue(id);
	} else if(nav.hasWebStorage) {
		// Read storage.local first. If it not existed then read storage.sync
		return new Promise(resolve => chrome.storage.local.get(id, obj => {
			if(Object.keys(obj).length) {
				resolve(obj[id]);
			} else {
				chrome.storage.sync.get(id, obj => resolve(obj[id]));
			}
		}));
	} else if(nav.hasPrestoStorage) {
		return prestoStorage.getItem(id);
	}
	return locStorage[id];
}

// Saves data into the global storage
// FIXME: make async?
function setStored(id, value) {
	if(nav.hasNewGM) {
		return GM.setValue(id, value);
	} else if(nav.hasOldGM) {
		GM_setValue(id, value);
	} else if(nav.hasWebStorage) {
		return new Promise((resolve, _) => {
			const obj = {};
			obj[id] = value;
			chrome.storage.sync.set(obj, () => {
				if(chrome.runtime.lastError) {
					// Store into storage.local if the storage.sync limit is exceeded
					chrome.storage.local.set(obj, emptyFn);
					chrome.storage.sync.remove(id, emptyFn);
				} else {
					chrome.storage.local.remove(id, emptyFn);
				}
				resolve();
			});
		});
	} else if(nav.hasPrestoStorage) {
		prestoStorage.setItem(id, value);
	} else {
		locStorage[id] = value;
	}
	return null;
}

// Removes data from the global storage
// FIXME: make async?
function delStored(id) {
	if(nav.hasNewGM) {
		return GM.deleteValue(id);
	} else if(nav.hasOldGM) {
		GM_deleteValue(id);
	} else if(nav.hasWebStorage) {
		chrome.storage.sync.remove(id, emptyFn);
	} else if(nav.hasPrestoStorage) {
		prestoStorage.removeItem(id);
	} else {
		locStorage.removeItem(id);
	}
}

// Receives and parses JSON data into an object
async function getStoredObj(id) {
	return JSON.parse(await getStored(id) || '{}') || {};
}

// Replaces the domain config with an object. Removes the domain config, if there is no object.
async function saveCfgObj(dm, fn) {
	const val = await getStoredObj('DESU_Config');
	const res = fn(val[dm]);
	if(res) {
		val[dm] = res;
	} else {
		delete val[dm];
	}
	const rv = setStored('DESU_Config', JSON.stringify(val));
	if (rv) {
		await rv;
	}
}

// Saves the value for a particular config option
async function saveCfg(id, val) {
	if(Cfg[id] !== val) {
		Cfg[id] = val;
		await saveCfgObj(aib.dm, cfg => {
			cfg[id] = val;
			return cfg;
		});
	}
}

// Toggles a particular config option (1|0)
async function toggleCfg(id) {
	await saveCfg(id, +!Cfg[id]);
}

function readData() {
	return Promise.all([readFavorites(), readCfg()]);
}

// Config initialization, checking for Dollchan update.
async function readCfg() {
	let obj;
	const val = await getStoredObj('DESU_Config');
	if(!(aib.dm in val) || $isEmpty(obj = val[aib.dm])) {
		const isGlobal = nav.hasGlobalStorage && !!val.global;
		obj = isGlobal ? val.global : {};
		if(isGlobal) {
			delete obj.correctTime;
			delete obj.captchaLang;
		}
	}
	defaultCfg.captchaLang = aib.captchaLang;
	defaultCfg.language = +!String(navigator.language).toLowerCase().startsWith('ru');
	Cfg = Object.assign(Object.create(defaultCfg), obj);
	if(!Cfg.timeOffset) {
		Cfg.timeOffset = '+0';
	}
	if(!Cfg.timePattern) {
		Cfg.timePattern = aib.timePattern;
	}
	if(aib.dobrochan && !Cfg.useDobrAPI) {
		aib.JsonBuilder = null;
	}
	if(!('FormData' in deWindow)) {
		Cfg.ajaxPosting = 0;
	}
	if(!Cfg.ajaxPosting) {
		Cfg.fileInputs = 0;
	}
	if(!('Notification' in deWindow)) {
		Cfg.desktNotif = 0;
	}
	if(nav.isPresto) {
		Cfg.preLoadImgs = 0;
		Cfg.findImgFile = 0;
		if(!nav.hasOldGM) {
			Cfg.updDollchan = 0;
		}
		Cfg.fileInputs = 0;
	}
	if(nav.scriptHandler === 'WebExtension') {
		Cfg.updDollchan = 0;
	}
	if(Cfg.updThrDelay < 10) {
		Cfg.updThrDelay = 10;
	}
	if(!Cfg.addSageBtn || !Cfg.saveSage) {
		Cfg.sageReply = 0;
	}
	if(!Cfg.passwValue) {
		Cfg.passwValue = Math.round(Math.random() * 1e12).toString(32);
	}
	if(!Cfg.stats) {
		Cfg.stats = { view: 0, op: 0, reply: 0 };
	}
	lang = Cfg.language;
	val[aib.dm] = Cfg;
	if(val.commit !== commit && !localData) {
		if(doc.readyState === 'loading') {
			doc.addEventListener('DOMContentLoaded', () => setTimeout(showDonateMsg, 1e3));
		} else {
			setTimeout(showDonateMsg, 1e3);
		}
		val.commit = commit;
	}
	setStored('DESU_Config', JSON.stringify(val));
	if(Cfg.updDollchan && !localData) {
		checkForUpdates(false, val.lastUpd).then(html => {
			if(doc.readyState === 'loading') {
				doc.addEventListener('DOMContentLoaded', () => $popup('updavail', html));
			} else {
				$popup('updavail', html);
			}
		}, emptyFn);
	}
}

// Initialize of hidden and favorites. Run spells.
function readPostsData(firstPost, favObj) {
	let sVis = null;
	try {
		// Get hidden posts and threads that cached in current session
		const str = aib.t ? sesStorage['de-hidden-' + aib.b + aib.t] : null;
		if(str) {
			const json = JSON.parse(str);
			if(json.hash === (Cfg.hideBySpell ? Spells.hash : 0) &&
				pByNum.has(json.lastNum) && pByNum.get(json.lastNum).count === json.lastCount
			) {
				sVis = json.data?.[0] instanceof Array ? json.data : null;
			}
		}
	} catch(err) {
		sesStorage['de-hidden-' + aib.b + aib.t] = null;
	}
	if(!firstPost) {
		return;
	}
	let updateFav = null;
	const favBrd = favObj[aib.host]?.[aib.b] || {};
	const spellsHide = Cfg.hideBySpell;
	const maybeSpells = new Maybe(SpellsRunner);

	// Search existed posts in stored data
	for(let post = firstPost; post; post = post.next) {
		const { num } = post;
		// Mark favorite threads, update favorites data
		if(post.isOp && (num in favBrd)) {
			const entry = favBrd[num];
			const { thr } = post;
			post.toggleFavBtn(true);
			post.thr.isFav = true;
			if(aib.t) {
				entry.cnt = thr.pcount;
				entry.new = entry.you = 0;
				if(Cfg.markNewPosts && entry.last) {
					let lastPost = pByNum.get(+entry.last.match(/\d+/));
					if(lastPost) {
						// Mark all new posts after last viewed post
						while((lastPost = lastPost.next)) {
							Post.addMark(lastPost.el, true);
						}
					}
				}
				entry.last = aib.anchor + thr.last.num;
			} else {
				entry.new = thr.pcount - entry.cnt;
			}
			updateFav = [aib.host, aib.b, aib.t, [thr.pcount, thr.last.num], 'update'];
		}
		if(HiddenPosts.has(num)) {
			HiddenPosts.hideHidden(post, num);
			continue;
		}
		let hideData;
		if(post.isOp) {
			if(HiddenThreads.has(num)) {
				hideData = [true, null];
			} else if(spellsHide) {
				hideData = sVis?.[post.count];
			}
		} else if(spellsHide) {
			hideData = sVis?.[post.count];
		} else {
			continue;
		}
		if(!hideData) {
			maybeSpells.value.runSpells(post); // Apply spells if posts not hidden
		} else if(hideData[0]) {
			if(post.isHidden) {
				post.spellHidden = true;
			} else {
				post.spellHide(hideData[1]);
			}
		}
	}
	if(maybeSpells.hasValue) {
		maybeSpells.value.endSpells();
	}
	if(aib.t && Cfg.panelCounter === 2) {
		$id('de-panel-info-pcount').textContent = Thread.first.pcount - Thread.first.hidCounter;
	}
	if(updateFav) {
		saveFavorites(favObj);
		sendStorageEvent('__de-favorites', updateFav);
	}
	// After following a link from Favorites, we need to open Favorites again.
	const hasFavWinKey = sesStorage['de-fav-win'] === '1';
	if(hasFavWinKey || Cfg.favWinOn) {
		toggleWindow('fav', !!$q('#de-win-fav.de-win-active'), null, true);
		if(hasFavWinKey) {
			sesStorage.removeItem('de-fav-win');
		}
	}
	let data = sesStorage['de-fav-newthr'];
	if(data) { // Detecting the created new thread and adding it to Favorites.
		data = JSON.parse(data);
		const isTimeOut = !data.num && (Date.now() - data.date > 2e4);
		if(data.num === firstPost.num || !firstPost.next && !isTimeOut) {
			firstPost.thr.toggleFavState(true);
			sesStorage.removeItem('de-fav-newthr');
		} else if(isTimeOut) {
			sesStorage.removeItem('de-fav-newthr');
		}
	}
	if(Cfg.nextPageThr && DelForm.first === DelForm.last) {
		const hidThrEls = $Q('.de-thr-hid', firstPost.thr.form.el);
		const hidThrLen = hidThrEls.length;
		if(hidThrLen) {
			Pages.addPage(hidThrLen);
		}
	}
}

function readFavorites() {
	return getStoredObj('DESU_Favorites');
}

function saveFavorites(data) {
	setStored('DESU_Favorites', JSON.stringify(data));
}

// Get posts that were read by posts previews
function readViewedPosts() {
	if(!Cfg.markViewed) {
		return;
	}
	const data = sesStorage['de-viewed'];
	if(data) {
		data.split(',').forEach(pNum => {
			const post = pByNum.get(+pNum);
			if(post) {
				post.el.classList.add('de-viewed');
				post.isViewed = true;
			}
		});
	}
}

// HIDDEN AND MY POSTS STORAGE

class PostsStorage {
	constructor() {
		this.storageName = '';
		this.__cachedTime = null;
		this._cachedStorage = null;
		this._cacheTO = null;
		this._onReadNew = null;
		this._onAfterSave = null;
	}
	get(num) {
		const storage = this._readStorage()[aib.b];
		if(storage) {
			const val = storage[num];
			return val ? val[2] : null;
		}
		return null;
	}
	has(num) {
		const storage = this._readStorage()[aib.b];
		return storage ? $hasProp(storage, num) : false;
	}
	purge() {
		this._cacheTO = this.__cachedTime = this._cachedStorage = null;
	}
	removeStorage(num, board = aib.b) {
		const storage = this._readStorage(true);
		const bStorage = storage[board];
		if(bStorage && $hasProp(bStorage, num)) {
			delete bStorage[num];
			if($isEmpty(bStorage)) {
				delete storage[board];
			}
			this._saveStorage();
		}
	}
	set(num, thrNum, data = true) {
		const storage = this._readStorage(true);
		this._removeOldItems(storage);
		(storage[aib.b] || (storage[aib.b] = {}))[num] = [this._cachedTime, thrNum, data];
		this._saveStorage();
	}

	_removeOldItems(storage) {
		if(storage && storage.$count > 5e3) {
			const minDate = Date.now() - 5 * 24 * 3600 * 1e3;
			for(const board in storage) {
				if($hasProp(storage, board)) {
					const data = storage[board];
					for(const key in data) {
						if($hasProp(data, key) && data[key][0] < minDate) {
							delete data[key];
						}
					}
				}
			}
		}
	}
	get _cachedTime() {
		return this.__cachedTime || (this.__cachedTime = Date.now());
	}
	_readStorage(ignoreCache = false) {
		if(!ignoreCache && this._cachedStorage) {
			return this._cachedStorage;
		}
		const data = locStorage[this.storageName];
		let rv = {};
		if(data) {
			try {
				rv = this._cachedStorage = JSON.parse(data);
			} catch(err) {}
		}
		this._cachedStorage = rv;
		if(this._onReadNew) {
			this._onReadNew(rv);
		}
		return rv;
	}
	_saveStorage() {
		if(this._cacheTO === null) {
			this._cacheTO = setTimeout(() => {
				if(this._cachedStorage) {
					locStorage[this.storageName] = JSON.stringify(this._cachedStorage);
				}
				this.purge();
				if(this._onAfterSave) {
					this._onAfterSave();
				}
			}, 0);
		}
	}
}

const HiddenPosts = new class HiddenPostsClass extends PostsStorage {
	constructor() {
		super();
		this.storageName = 'de-posts';
	}
	hideHidden(post, num) {
		const uHideData = HiddenPosts.get(num);
		if(!uHideData && post.isOp && HiddenThreads.has(num)) {
			post.setUserVisib(true);
		} else {
			post.setUserVisib(!!uHideData, false);
		}
	}
}();

const HiddenThreads = new class HiddenThreadsClass extends PostsStorage {
	constructor() {
		super();
		this.storageName = 'de-threads';
	}
	getCount() {
		const storage = this._readStorage();
		let rv = 0;
		for(const board in storage) {
			if($hasProp(storage, board)) {
				rv += Object.keys(storage[board]).length;
			}
		}
		return rv;
	}
	getRawData() {
		return this._readStorage();
	}
	saveRawData(data) {
		locStorage[this.storageName] = JSON.stringify(data);
		this.purge();
	}
}();

const MyPosts = new class MyPostsClass extends PostsStorage {
	constructor() {
		super();
		this.storageName = 'de-myposts';
		this._cachedData = null;
		this._onReadNew = newStorage => {
			this._cachedData = newStorage[aib.b] ?
				new Set(Object.keys(newStorage[aib.b]).map(val => +val)) : new Set();
		};
		this._onAfterSave = () => sendStorageEvent('__de-mypost', 1);
	}
	has(num) {
		return this._cachedData.has(num);
	}
	update() {
		this.purge();
		for(const num of this._cachedData) {
			pByNum[num]?.changeMyMark(true);
		}
	}
	purge() {
		super.purge();
		this._cachedData = null;
		this._readStorage();
	}
	readStorage() {
		this._readStorage();
	}
	set(num, thrNum) {
		super.set(num, thrNum);
		this._cachedData.add(+num);
	}
}();

function sendStorageEvent(name, value) {
	locStorage[name] = typeof value === 'string' ? value : JSON.stringify(value);
	locStorage.removeItem(name);
}

function initStorageEvent() {
	doc.defaultView.addEventListener('storage', e => {
		let data, temp;
		let val = e.newValue;
		if(!val) {
			return;
		}
		switch(e.key) {
		case '__de-favorites': {
			try {
				data = JSON.parse(val);
			} catch(err) {
				return;
			}
			updateFavWindow(...data);
			return;
		}
		case '__de-mypost': MyPosts.update(); return;
		case '__de-webmvolume':
			val = +val || 0;
			Cfg.webmVolume = val;
			temp = $q('input[info="webmVolume"]');
			if(temp) {
				temp.value = val;
			}
			return;
		case '__de-post':
			(() => {
				try {
					data = JSON.parse(val);
				} catch(err) {
					return;
				}
				HiddenThreads.purge();
				HiddenPosts.purge();
				if(data.brd === aib.b) {
					let post = pByNum.get(data.num);
					if(post && (post.isHidden ^ data.hide)) {
						post.setUserVisib(data.hide, false);
					} else if((post = pByNum.get(data.thrNum))) {
						post.thr.userTouched.set(data.num, data.hide);
					}
				}
				toggleWindow('hid', true);
			})();
			return;
		case 'de-threads':
			HiddenThreads.purge();
			Thread.first.updateHidden(HiddenThreads.getRawData()[aib.b]);
			toggleWindow('hid', true);
			return;
		case '__de-spells': (() => {
			try {
				data = JSON.parse(val);
			} catch(err) {
				return;
			}
			Cfg.hideBySpell = +data.hide;
			temp = $q('input[info="hideBySpell"]');
			if(temp) {
				temp.checked = data.hide;
			}
			$hide(docBody);
			if(data.data) {
				Spells.setSpells(data.data, false);
				Cfg.spells = JSON.stringify(data.data);
				temp = $id('de-spell-txt');
				if(temp) {
					temp.value = Spells.list;
				}
			} else {
				SpellsRunner.unhideAll();
				Spells.disableSpells();
				temp = $id('de-spell-txt');
				if(temp) {
					temp.value = '';
				}
			}
			$show(docBody);
		})();
		}
	}, false);
}
