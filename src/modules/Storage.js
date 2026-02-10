/* ==[ Storage.js ]===========================================================================================
                                                   STORAGE
=========================================================================================================== */

// Gets data from the global storage
async function getStored(id) {
	if(nav.hasNewGM) {
		return await GM.getValue(id);
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
	}
	return locStorage[id];
}

// Saves data into the global storage
function setStored(id, value) {
	if(nav.hasNewGM) {
		return GM.setValue(id, value);
	} else if(nav.hasOldGM) {
		GM_setValue(id, value);
	} else if(nav.hasWebStorage) {
		return new Promise(resolve => {
			const obj = {};
			obj[id] = value;
			chrome.storage.sync.set(obj, () => {
				if(chrome.runtime.lastError) {
					// Store into storage.local if the storage.sync limit is exceeded
					chrome.storage.local.set(obj, Function.prototype);
					chrome.storage.sync.remove(id, Function.prototype);
				} else {
					chrome.storage.local.remove(id, Function.prototype);
				}
				resolve();
			});
		});
	} else {
		locStorage[id] = value;
	}
	return null;
}

// Removes data from the global storage
function delStored(id) {
	if(nav.hasNewGM) {
		return GM.deleteValue(id);
	} else if(nav.hasOldGM) {
		GM_deleteValue(id);
	} else if(nav.hasWebStorage) {
		chrome.storage.sync.remove(id, Function.prototype);
	} else {
		locStorage.removeItem(id);
	}
}

// Receives and parses JSON data into an object
async function getStoredObj(id) {
	return JSON.parse(await getStored(id) || '{}') || {};
}

// == CONFIG DATA ============================================================================================

// Asynchronous saving of config. Fixes a race condition when saving from different browser tabs.
const CfgSaver = {
	// Saves enumerated options and values
	async save(...args) {
		let isChanged = false;
		for(let i = 0; i < args.length; i += 2) {
			const id = args[i];
			const val = args[i + 1];
			if(Cfg[id] !== val) {
				Cfg[id] = val;
				isChanged = true;
			}
		}
		if(isChanged) {
			await this.saveObj(aib.domain, loadedCfg => {
				for(let i = 0; i < args.length; i += 2) {
					loadedCfg[args[i]] = args[i + 1];
				}
				return loadedCfg;
			});
		}
	},
	// Saves all domain options as an object
	async saveObj(domain, fn) {
		if(this._isBusy) {
			await new Promise((resolve, reject) => {
				this._queue.push([domain, fn, resolve, reject]);
			});
			return;
		}
		this._isBusy = true;
		await this.saveObjHelper(domain, fn);
		if(this._queue.length > 0) {
			while(this._queue.length > 0) {
				const [[qDomain, qFn, resolve, reject]] = this._queue.splice(0, 1);
				try {
					await this.saveObjHelper(qDomain, qFn);
					resolve();
				} catch(err) {
					reject(err);
				}
			}
		}
		this._isBusy = false;
	},
	async saveObjHelper(domain, fn) {
		const val = await getStoredObj('DESU_Config');
		const res = fn(val[domain]);
		if(res) {
			val[domain] = res;
		} else {
			delete val[domain];
		}
		const rv = setStored('DESU_Config', JSON.stringify(val));
		// XXX: Violentmonkey bug. GM.setValue promise is not fulfilled.
		if(rv && !nav.isViolentmonkey) {
			await rv;
		}
	},

	_isBusy: false,
	_queue : []
};

// Toggles a particular config option (1|0)
async function toggleCfg(id) {
	await CfgSaver.save(id, +!Cfg[id]);
}

// Config initialization, checking for Dollchan update.
async function readCfg() {
	let obj;
	const val = await getStoredObj('DESU_Config');
	if(!(aib.domain in val) || $isEmpty(obj = val[aib.domain])) {
		const isGlobal = nav.hasGlobalStorage && !!val.global;
		obj = isGlobal ? val.global : {};
		if(isGlobal) {
			delete obj.correctTime;
			delete obj.captchaLang;
		}
	}
	const browserLang = String(navigator.language).toLowerCase();
	defaultCfg.language =
		browserLang.startsWith('ru') ? 0 :
		browserLang.startsWith('en') ? 1 :
		browserLang.startsWith('uk') ? 2 : defaultCfg.language;
	Cfg = Object.assign(Object.create(defaultCfg), obj);
	if(!Cfg.timeOffset) {
		Cfg.timeOffset = '+0';
	}
	if(!Cfg.timePattern) {
		Cfg.timePattern = aib.timePattern;
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
	if(nav.isWebExtension) {
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
	val[aib.domain] = Cfg;
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
		}, Function.prototype);
	}
}

// == POSTS DATA =============================================================================================

// Initialization of hidden and favorites. Run spells.
function readPostsData(firstPost, favObj) {
	let sVis = null;
	try {
		// Get hidden posts and threads from current session
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

	let updatedFav = null;
	const favBoardObj = favObj[aib.host]?.[aib.b] || {};
	const spellsHide = Cfg.hideBySpell;
	const maybeSpells = new Maybe(SpellsRunner);
	for(let post = firstPost; post; post = post.next) {
		const { num } = post;
		// Mark favorite threads, update favorites data
		if(post.isOp && (num in favBoardObj)) {
			let newCount = 0;
			let youCount = 0;
			post.toggleFavBtn(true);
			const { thr } = post;
			thr.isFav = true;
			const isThrActive = aib.t && !doc.hidden;
			const entry = favBoardObj[num];
			let _post = pByNum.get(+entry.last.match(/\d+/));
			if(_post) {
				while((_post = _post.nextInThread)) {
					if(Cfg.markNewPosts) {
						Post.addMark(_post.el, true);
					}
					if(!isThrActive) {
						newCount++;
						if(isPostRefToYou(_post.el)) {
							youCount++;
						}
					}
				}
			} else if(!aib.t) {
				newCount = entry.new + thr.postsCount - entry.cnt;
				_post = post;
				while((_post = _post.nextInThread)) {
					if(Cfg.markNewPosts) {
						Post.addMark(_post.el, true);
					}
					if(isPostRefToYou(_post.el)) {
						youCount++;
					}
				}
			}
			if(isThrActive) {
				entry.last = aib.anchor + thr.last.num;
			}
			updatedFav = [aib.host, aib.b, aib.t, [
				entry.cnt = thr.postsCount,
				entry.new = newCount,
				entry.you = youCount,
				thr.last.num
			], 'update'];
		}
		// Search existed posts in hidden posts data and apply spells
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
			maybeSpells.value.runSpells(post);
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
		$id('de-panel-info-posts').textContent = Thread.first.postsCount - Thread.first.hiddenCount;
	}
	if(updatedFav) {
		saveFavorites(favObj);
		// Updating Favorites: page is loaded
		sendStorageEvent('__de-favorites', updatedFav);
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
	if(data) { // Detecting the new created thread and adding it to Favorites.
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
		const hidThrLen = $Q('.de-thr-hid', firstPost.thr.form.el).length;
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
	sesStorage['de-viewed']?.split(',').forEach(pNum => {
		const post = pByNum.get(+pNum);
		if(post) {
			post.el.classList.add('de-viewed');
			post.isViewed = true;
		}
	});
}

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
				this._onAfterSave?.();
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
			// Updating Favorites: keep in sync with other tab
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
		case '__de-spells': (async () => {
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
			$hide(doc.body);
			if(data.data) {
				await Spells.setSpells(data.data, false);
				Cfg.spells = JSON.stringify(data.data);
				temp = $id('de-spell-txt');
				if(temp) {
					temp.value = Spells.list;
				}
			} else {
				SpellsRunner.unhideAll();
				await Spells.disableSpells();
				temp = $id('de-spell-txt');
				if(temp) {
					temp.value = '';
				}
			}
			$show(doc.body);
		})();
		}
	}, false);
}
