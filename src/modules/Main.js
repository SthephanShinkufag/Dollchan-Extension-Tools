/* ==[ Main.js ]==============================================================================================
                                                     MAIN
=========================================================================================================== */

async function runMain(checkDomains, dataPromise) {
	Logger.initLogger();
	let formEl;
	if(!(docBody = doc.body) ||
		!aib && !(aib = getImageBoard(checkDomains, true)) ||
		!(formEl = $q(aib.qDForm + ', form[de-form]'))
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
	let favObj, oldMain;
	[excludeList, favObj] = await (dataPromise || readData());
	if((excludeList = excludeList || '').includes(aib.dm) ||
		!Cfg.disabled && aib.init && aib.init() ||
		!localData && docBody.classList.contains('de-mode-local') ||
		(oldMain = $id('de-main')) && $id('de-panel-buttons').children.length > 1
	) {
		return;
	}
	Logger.log('Storage loading');
	$del(oldMain);
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
		doc.defaultView.addEventListener('beforeunload',
			() => (sesStorage['de-scroll-' + aib.b + (aib.t || '')] = window.pageYOffset));
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
		DelForm.last = DelForm.first = new DelForm(formEl, aib.page, false);
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
		window.location.reload();
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

// START OF DOLLCHAN EXECUTION
if(/^(?:about|chrome|opera|res):$/i.test(window.location.protocol)) {
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
	dataPromise = readData();
}
needScroll = true;
doc.addEventListener('onwheel' in doc.defaultView ? 'wheel' : 'mousewheel', function wFunc(e) {
	needScroll = false;
	doc.removeEventListener(e.type, wFunc);
});
doc.addEventListener('DOMContentLoaded', () => runMain(false, dataPromise));
