/* ==[ Main.js ]==============================================================================================
                                                     MAIN
=========================================================================================================== */

function runFrames() {
	let inf;
	if(typeof GM !== 'undefined') {
		inf = GM.info;
	} else {
		if(typeof GM_info === 'undefined') {
			return;
		}
		inf = GM_info;
	}
	if(!inf) {
		return;
	}
	const handlerName = inf.scriptHandler;
	if(handlerName !== 'Greasemonkey' && handlerName !== 'FireMonkey' || !deWindow.frames[0]) {
		return;
	}
	const deMainFuncFrame = frameEl => {
		const fDoc = frameEl.contentDocument;
		if(fDoc) {
			const deWindow = fDoc.defaultView;
			deMainFuncInner(
				deWindow,
				deWindow.opera?.scriptStorage,
				deWindow.FormData,
				(x, y) => deWindow.scrollTo(x, y),
				typeof localData === 'object' ? localData : null
			);
		}
	};
	for(let i = 0, len = deWindow.length; i < len; ++i) {
		const frameEl = deWindow.frames[i].frameElement;
		const fDoc = frameEl.contentDocument;
		if(fDoc) {
			if(String(fDoc.defaultView.location) === 'about:blank') {
				frameEl.onload = () => deMainFuncFrame(frameEl);
			} else if(fDoc.readyState === 'loading') {
				fDoc.addEventListener('DOMContentLoaded', () => deMainFuncFrame(frameEl));
			} else {
				deMainFuncFrame(frameEl);
			}
		}
	}
}

async function runMain(checkDomains, dataPromise) {
	Logger.initLogger();
	if(!doc.body || !aib && !(aib = getImageBoard(checkDomains, true))) {
		return;
	}
	let formEl = $q(aib.qDelForm + ', [de-form]');
	if(!formEl) {
		runFrames();
		return;
	}
	if(doc.body.classList.contains('de-runned') ||
		aib.observeContent && !aib.observeContent(checkDomains, dataPromise)
	) {
		return;
	}
	Logger.log('Imageboard check');
	if(!locStorage) {
		if(!checkStorage()) {
			return;
		}
		initNavFuncs();
	}
	const [favObj] = await (dataPromise || Promise.all([readFavorites(), readCfg()]));
	if(!Cfg.disabled && aib.init?.() || !localData && doc.body.classList.contains('de-mode-local')) {
		return;
	}
	doc.body.classList.add('de-runned');
	Logger.log('Storage loading');
	addSVGIcons();
	if(Cfg.disabled) {
		Panel.initPanel(formEl);
		scriptCSS();
		return;
	}
	if('toJSON' in Array.prototype) {
		delete Array.prototype.toJSON;
	}
	initStorageEvent();
	DollchanAPI.initAPI();
	if(localData) {
		aib.protocol = 'http:';
		aib.host = aib.domain;
		aib.b = localData.b;
		aib.t = localData.t;
		aib.docExt = '.html';
	} else {
		aib.parseURL();
	}
	if(aib.t || !Cfg.scrollToTop) {
		doc.defaultView.addEventListener('beforeunload', () => {
			sesStorage['de-scroll-' + aib.b + (aib.t || '')] = deWindow.pageYOffset;
		});
	}
	Logger.log('Init');
	if(Cfg.correctTime) {
		dTime = new DateTime(Cfg.timePattern, Cfg.timeRPattern, Cfg.timeOffset, lang,
			rp => CfgSaver.save('timeRPattern', rp));
		Logger.log('Time correction');
	}
	MyPosts.readStorage();
	Logger.log('Read my posts');
	$hide(doc.body);
	dummy = doc.createElement('div');
	formEl = aib.fixHTML(formEl, true);
	Logger.log('Replace delform');
	pByEl = new Map();
	pByNum = new Map();
	try {
		DelForm.last = DelForm.first = new DelForm(formEl, aib.page, null);
		if(!Thread.first) {
			console.error('No threads detected!');
		}
	} catch(err) {
		console.error('Delform parsing error:', getErrorMessage(err));
		$show(doc.body);
		return;
	}
	Logger.log('Parse delform');
	if(aib.t) {
		const storageName = `de-last-postscount-${ aib.b }-${ aib.t }`;
		if(sesStorage[storageName] > Thread.first.postsCount) {
			sesStorage.removeItem(storageName);
			deWindow.location.reload();
		}
	}
	postform = new PostForm($q(aib.qForm));
	Logger.log('Parse postform');
	if(Cfg.hotKeys) {
		HotKeys.enableHotKeys();
		Logger.log('Init keybinds');
	}
	initPage();
	Logger.log('Init page');
	Panel.initPanel(formEl);
	Logger.log('Add panel');
	embedPostMsgImages(DelForm.first.el);
	Logger.log('Image-links');
	DelForm.first.addStuff();
	readViewedPosts();
	scriptCSS();
	Logger.log('Apply CSS');
	$show(doc.body);
	Logger.log('Display page');
	Pages.toggleInfinityScroll();
	Logger.log('Infinity scroll');
	const { firstThr } = DelForm.first;
	if(firstThr) {
		readPostsData(firstThr.op, favObj);
	}
	Logger.log('Hide posts');
	scrollPage();
	Logger.log('Scroll page');
	if(localData) {
		$Q('.de-post-removed').forEach(el => {
			const post = pByEl.get(el);
			if(post) {
				post.deletePost(false);
			}
		});
		Logger.log('Local changings');
	}
	Logger.finish();
}

function initMain() {
	if(window.name === 'de-prohibited') {
		return;
	}
	if(doc.readyState !== 'loading') {
		needScroll = false;
		runMain(true, null);
		return;
	}
	let dataPromise = null;
	if((aib = getImageBoard(true, false))) {
		if(!checkStorage()) {
			return;
		}
		initNavFuncs();
		dataPromise = Promise.all([readFavorites(), readCfg()]);
	}
	needScroll = true;
	doc.addEventListener('onwheel' in doc.defaultView ? 'wheel' : 'mousewheel', function wFunc(e) {
		needScroll = false;
		doc.removeEventListener(e.type, wFunc);
	});
	doc.addEventListener('DOMContentLoaded', () => runMain(false, dataPromise));
}

initMain();
