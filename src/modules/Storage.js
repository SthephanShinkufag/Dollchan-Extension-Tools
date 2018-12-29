/* ==[ Storage.js ]===========================================================================================
                                                   STORAGE
=========================================================================================================== */

// Gets data from the global storage
async function getStored(id) {
	if(nav.isNewGM) {
		const value = await GM.getValue(id);
		return value;
	} else if(nav.isGM) {
		return GM_getValue(id);
	} else if(nav.isChromeStorage) {
		// Read storage.local first. If it not existed then read storage.sync
		const value = await new Promise(resolve => chrome.storage.local.get(id, obj => {
			if(Object.keys(obj).length) {
				resolve(obj[id]);
			} else {
				chrome.storage.sync.get(id, obj => resolve(obj[id]));
			}
		}));
		return value;
	} else if(nav.isScriptStorage) { // Opera Presto only
		return scriptStorage.getItem(id);
	}
	return locStorage[id];
}

// Saves data into the global storage
// FIXME: make async?
function setStored(id, value) {
	if(nav.isNewGM) {
		return GM.setValue(id, value);
	} else if(nav.isGM) {
		GM_setValue(id, value);
	} else if(nav.isChromeStorage) {
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
		});
	} else if(nav.isScriptStorage) { // Opera Presto only
		scriptStorage.setItem(id, value);
	} else {
		locStorage[id] = value;
	}
}

// Removes data from the global storage
// FIXME: make async?
function delStored(id) {
	if(nav.isNewGM) {
		return GM.deleteValue(id);
	} else if(nav.isGM) {
		GM_deleteValue(id);
	} else if(nav.isChromeStorage) {
		chrome.storage.sync.remove(id, emptyFn);
	} else if(nav.isScriptStorage) {
		scriptStorage.removeItem(id);
	} else {
		locStorage.removeItem(id);
	}
}

// Receives and parses JSON data into an object
async function getStoredObj(id) {
	return JSON.parse(await getStored(id) || '{}') || {};
}

// Replaces the domain config with an object. Removes the domain config, if there is no object.
function saveCfgObj(dm, obj) {
	getStoredObj('DESU_Config').then(val => {
		if(obj) {
			val[dm] = obj;
		} else {
			delete val[dm];
		}
		setStored('DESU_Config', JSON.stringify(val));
	});
}

// Saves the value for a particular config option
function saveCfg(id, val) {
	if(Cfg[id] !== val) {
		Cfg[id] = val;
		saveCfgObj(aib.dm, Cfg);
	}
}

// Toggles a particular config option (1|0)
function toggleCfg(id) {
	saveCfg(id, +!Cfg[id]);
}

function readData() {
	return Promise.all([getStored('DESU_Exclude'), readFavorites(), readCfg()]);
}

// Config initialization, checking for Dollchan update.
async function readCfg() {
	let obj;
	const val = await getStoredObj('DESU_Config');
	if(!(aib.dm in val) || $isEmpty(obj = val[aib.dm])) {
		const hasGlobal = nav.isGlobal && !!val.global;
		obj = hasGlobal ? val.global : {};
		if(hasGlobal) {
			delete obj.correctTime;
			delete obj.captchaLang;
		}
	}
	defaultCfg.captchaLang = aib.capLang;
	defaultCfg.language = +!String(navigator.language).toLowerCase().startsWith('ru');
	Cfg = Object.assign(Object.create(defaultCfg), obj);
	if(!Cfg.timeOffset) {
		Cfg.timeOffset = '+0';
	}
	if(!Cfg.timePattern) {
		Cfg.timePattern = aib.timePattern;
	}
	if(aib.prot !== 'http:') { // Vocaroo doesn't support https
		Cfg.addVocaroo = 0;
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
		if(!nav.isGM) {
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
		Cfg.passwValue = Math.round(Math.random() * 1e15).toString(32);
	}
	if(!Cfg.stats) {
		Cfg.stats = { view: 0, op: 0, reply: 0 };
	}
	if(Cfg.addYouTube !== undefined) {
		Cfg.embedYTube = Cfg.addYouTube === 0 ? 0 : Cfg.addYouTube === 1 ? 2 : 1;
		delete Cfg.addYouTube;
	}
	lang = Cfg.language;
	if(val.commit !== commit && !localData) {
		const font = ' style="font: 13px monospace; color: green;"';
		const donateMsg = Lng.donateMsg[lang] + ':<br style="margin-bottom: 8px;">' +
			'<div class="de-logo"><svg><use xlink:href="#de-symbol-panel-logo"/></svg></div>' +
			'<div style="display: inline-block;"><b><i>WebMoney</i></b><br>' +
			`<span class="de-list de-depend">WMZ &ndash; <i${ font }>Z100197626370</i></span><br>` +
			`<span class="de-list de-depend">WMR &ndash; <i${ font }>R266614957054</i></span><br>` +
			`<span class="de-list de-depend">WMU &ndash; <i${ font }>U142375546253</i></span><br>` +
			`<b><i>Bitcoin</i></b><br><span class="de-list de-depend">P2PKH &ndash; <i${
				font }>15xEo7BVQ3zjztJqKSRVhTq3tt3rNSHFpC</i></span><br>` +
			`<span class="de-list de-depend">P2SH &ndash; <i${
				font }>3AhNPPpvtxQoFCLXk5e9Hzh6Ex9h7EoNzq</i></span></div>`;
		const popupFn = () => $popup('donate', donateMsg);
		if(doc.readyState === 'loading') {
			doc.addEventListener('DOMContentLoaded', () => setTimeout(popupFn, 1e3));
		} else {
			setTimeout(popupFn, 1e3);
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
				sVis = json.data && json.data[0] instanceof Array ? json.data : null;
			}
		}
	} catch(err) {
		sesStorage['de-hidden-' + aib.b + aib.t] = null;
	}
	if(!firstPost) {
		return;
	}
	let updateFav = false;
	const favBrd = (aib.host in favObj) && (aib.b in favObj[aib.host]) ? favObj[aib.host][aib.b] : {};
	const spellsHide = Cfg.hideBySpell;
	const maybeSpells = new Maybe(SpellsRunner);

	// Search existed posts in stored data
	for(let post = firstPost; post; post = post.next) {
		const { num } = post;
		// Mark favorite threads, update favorites data
		if(post.isOp && (num in favBrd)) {
			const f = favBrd[num];
			const { thr } = post;
			post.toggleFavBtn(true);
			post.thr.isFav = true;
			if(aib.t) {
				f.cnt = thr.pcount;
				f.new = f.you = 0;
				if(Cfg.markNewPosts && f.last) {
					let lastPost = pByNum.get(+f.last.match(/\d+/));
					if(lastPost) {
						// Mark all new posts after last viewed post
						while((lastPost = lastPost.next)) {
							Post.addMark(lastPost.el, true);
						}
					}
				}
				f.last = aib.anchor + thr.last.num;
			} else {
				f.new = thr.pcount - f.cnt;
			}
			updateFav = true;
		}
		// Hide hidden posts and threads
		if(HiddenPosts.has(num)) {
			const uHideData = HiddenPosts.get(num);
			if(!uHideData && post.isOp && HiddenThreads.has(num)) {
				post.setUserVisib(true);
			} else {
				post.setUserVisib(!!uHideData, false);
			}
			continue;
		}
		let hideData;
		if(post.isOp) {
			if(HiddenThreads.has(num)) {
				hideData = [true, null];
			} else if(spellsHide) {
				hideData = sVis && sVis[post.count];
			}
		} else if(spellsHide) {
			hideData = sVis && sVis[post.count];
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
	}
	// After following a link from Favorites, we need to open Favorites again.
	if(sesStorage['de-fav-win'] === '1') {
		toggleWindow('fav', false, null, true);
		sesStorage.removeItem('de-fav-win');
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
		return storage ? storage.hasOwnProperty(num) : false;
	}
	purge() {
		this._cacheTO = this.__cachedTime = this._cachedStorage = null;
	}
	removeStorage(num, board = aib.b) {
		const storage = this._readStorage();
		const bStorage = storage[board];
		if(bStorage && bStorage.hasOwnProperty(num)) {
			delete bStorage[num];
			if($isEmpty(bStorage)) {
				delete storage[board];
			}
			this._saveStorage();
		}
	}
	set(num, thrNum, data = true) {
		const storage = this._readStorage();
		if(storage && storage.$count > 5e3) {
			const minDate = Date.now() - 5 * 24 * 3600 * 1e3;
			for(const b in storage) {
				if(storage.hasOwnProperty(b)) {
					const data = storage[b];
					for(const key in data) {
						if(data.hasOwnProperty(key) && data[key][0] < minDate) {
							delete data[key];
						}
					}
				}
			}
		}
		(storage[aib.b] || (storage[aib.b] = {}))[num] = [this._cachedTime, thrNum, data];
		this._saveStorage();
	}

	static _migrateOld(newName, oldName) {
		if(locStorage.hasOwnProperty(oldName)) {
			locStorage[newName] = locStorage[oldName];
			locStorage.removeItem(oldName);
		}
	}
	get _cachedTime() {
		return this.__cachedTime || (this.__cachedTime = Date.now());
	}
	_readStorage() {
		if(this._cachedStorage) {
			return this._cachedStorage;
		}
		const data = locStorage[this.storageName];
		if(data) {
			try {
				return (this._cachedStorage = JSON.parse(data));
			} catch(err) {}
		}
		return (this._cachedStorage = {});
	}
	_saveStorage() {
		if(this._cacheTO === null) {
			this._cacheTO = setTimeout(() => {
				if(this._cachedStorage) {
					locStorage[this.storageName] = JSON.stringify(this._cachedStorage);
				}
				this.purge();
			}, 0);
		}
	}
}

const HiddenPosts = new class HiddenPostsClass extends PostsStorage {
	constructor() {
		super();
		this.storageName = 'de-posts';
	}
	_readStorage() {
		PostsStorage._migrateOld(this.storageName, 'de-threads-new'); // Old storage has wrong name
		return super._readStorage();
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
		for(const b in storage) {
			rv += Object.keys(storage[b]).length;
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

	_readStorage() {
		PostsStorage._migrateOld(this.storageName, ''); // Old storage has wrong name
		return super._readStorage();
	}
}();

const MyPosts = new class MyPostsClass extends PostsStorage {
	constructor() {
		super();
		this.storageName = 'de-myposts';
		this._cachedData = null;
	}
	has(num) {
		return this._cachedData.has(num);
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
		sendStorageEvent('__de-mypost', 1);
	}

	_readStorage() {
		if(this._cachedData && this._cachedStorage) {
			return this._cachedStorage;
		}
		PostsStorage._migrateOld(this.storageName, 'de-myposts-new');
		const rv = super._readStorage();
		this._cachedData = rv[aib.b] ? new Set(Object.keys(rv[aib.b]).map(val => +val)) : new Set();
		return rv;
	}
}();

function sendStorageEvent(name, value) {
	locStorage[name] = typeof value === 'string' ? value : JSON.stringify(value);
	locStorage.removeItem(name);
}

function initStorageEvent() {
	doc.defaultView.addEventListener('storage', e => {
		let data, temp, val = e.newValue;
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
		case '__de-mypost': MyPosts.purge(); return;
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
	});
}
