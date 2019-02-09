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
	if(!inf || inf.scriptHandler !== 'Greasemonkey' && inf.scriptHandler !== 'Violentmonkey' ||
		!deWindow.frames[0]
	) {
		return;
	}
	const deMainFuncFrame = frameEl => {
		const fDoc = frameEl.contentDocument;
		if(fDoc) {
			const deWindow = fDoc.defaultView;
			deMainFuncInner(
				deWindow,
				deWindow.opera && deWindow.opera.scriptStorage,
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
	if(!(docBody = doc.body) || !aib && !(aib = getImageBoard(checkDomains, true))) {
		return;
	}
	let formEl = $q(aib.qDForm + ', form[de-form]');
	if(!formEl) {
		runFrames();
		return;
	}
	if(docBody.classList.contains('de-runned') ||
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
	const [favObj] = await (dataPromise || readData());
	if(!Cfg.disabled && aib.init && aib.init() || !localData && docBody.classList.contains('de-mode-local')) {
		return;
	}
	docBody.classList.add('de-runned');
	Logger.log('Storage loading');
	addSVGIcons();
	if(Cfg.disabled) {
		Panel.initPanel(formEl);
		scriptCSS();
		return;
	}
	if('toJSON' in aProto) {
		delete aProto.toJSON;
	}
	initStorageEvent();
	DollchanAPI.initAPI();
	if(localData) {
		aib.prot = 'http:';
		aib.host = aib.dm;
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
			rp => saveCfg('timeRPattern', rp));
		Logger.log('Time correction');
	}
	MyPosts.readStorage();
	Logger.log('Read my posts');
	$hide(docBody);
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
		$show(docBody);
		return;
	}
	Logger.log('Parse delform');
	const storageName = `de-lastpcount-${ aib.b }-${ aib.t }`;
	if(aib.t && !!sesStorage[storageName] && (sesStorage[storageName] > Thread.first.pcount)) {
		sesStorage.removeItem(storageName);
		deWindow.location.reload();
	}
	pr = new PostForm($q(aib.qForm));
	Logger.log('Parse postform');
	if(Cfg.hotKeys) {
		HotKeys.enableHotKeys();
		Logger.log('Init keybinds');
	}
	initPage();
	Logger.log('Init page');
	Panel.initPanel(formEl);
	Logger.log('Add panel');
	DelForm.first.addStuff();
	readViewedPosts();
	scriptCSS();
	Logger.log('Apply CSS');
	$show(docBody);
	Logger.log('Display page');
	toggleInfinityScroll();
	Logger.log('Infinity scroll');
	const { firstThr } = DelForm.first;
	if(firstThr) {
		readPostsData(firstThr.op, favObj);
	}
	Logger.log('Hide posts');
	embedPostMsgImages(DelForm.first.el);
	Logger.log('Image-links');
	scrollPage();
	Logger.log('Scroll page');
	if(localData) {
		$each($Q('.de-post-removed'), el => {
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
		dataPromise = readData();
	}
	needScroll = true;
	doc.addEventListener('onwheel' in doc.defaultView ? 'wheel' : 'mousewheel', function wFunc(e) {
		needScroll = false;
		doc.removeEventListener(e.type, wFunc);
	});
	doc.addEventListener('DOMContentLoaded', () => runMain(false, dataPromise));
}

initMain();
