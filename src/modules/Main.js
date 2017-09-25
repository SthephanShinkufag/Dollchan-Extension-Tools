/*==[ Main.js ]===============================================================================================
                                                     MAIN
============================================================================================================*/

async function runMain(checkDomains, cfgPromise) {
	Logger.init();
	docBody = doc.body;
	if(!docBody) {
		return;
	}
	if(!aib) {
		aib = getImageBoard(checkDomains, true);
	}
	let formEl = $q(aib.qDForm + ', form[de-form]');
	if(!formEl) {
		if(aib.observeContent) {
			aib.observeContent(checkDomains, cfgPromise);
		}
		return;
	}
	Logger.log('Imageboard check');
	if(!locStorage) {
		if(!checkStorage()) {
			return;
		}
		initNavFuncs();
	}
	const str = await getStored('DESU_Exclude');
	if(str == null) {
		// Greasemonkey very slow reads undefined values so store here an empty string
		setStored('DESU_Exclude', '');
	} else if(str.includes(aib.dm)) {
		return;
	}
	excludeList = str || '';
	if(!Cfg) {
		if(cfgPromise) {
			await cfgPromise;
		} else {
			await readCfg();
		}
	}
	Logger.log('Config loading');
	if(!Cfg.disabled && ((aib.init && aib.init()) || $id('de-panel'))) {
		return;
	}
	addSVGIcons();
	if(Cfg.disabled) {
		panel.init(formEl);
		scriptCSS();
		return;
	}
	initStorageEvent();
	DollchanAPI.init();
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
		doc.defaultView.addEventListener('beforeunload', function(e) {
			sesStorage['de-scroll-' + aib.b + aib.t] = window.pageYOffset;
		});
	}
	Logger.log('Init');
	if(Cfg.correctTime) {
		dTime = new DateTime(Cfg.timePattern, Cfg.timeRPattern, Cfg.timeOffset, lang,
		                     rp => saveCfg('timeRPattern', rp));
		Logger.log('Time correction');
	}
	MyPosts.read();
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
			throw 'No threads detected!';
		}
	} catch(e) {
		console.error('Delform parsing error:', getErrorMessage(e));
		$show(docBody);
		return;
	}
	Logger.log('Parse delform');
	const storageName = 'de-lastpcount-' + aib.b + '-' + aib.t;
	if(aib.t && !!sesStorage[storageName]) {
		if(sesStorage[storageName] > Thread.first.pcount) {
			sesStorage.removeItem(storageName);
			window.location.reload();
		}
	}
	pr = new PostForm($q(aib.qForm));
	Logger.log('Parse postform');
	if(Cfg.hotKeys) {
		HotKeys.enable();
		Logger.log('Init keybinds');
	}
	initPage();
	Logger.log('Init page');
	panel.init(formEl);
	Logger.log('Add panel');
	DelForm.first.addStuff();
	readViewedPosts();
	scriptCSS();
	Logger.log('Apply CSS');
	$show(docBody);
	Logger.log('Display page');
	toggleInfinityScroll();
	Logger.log('Infinity scroll');
	const firstThr = DelForm.first.firstThr;
	if(firstThr) {
		await readPostsData(firstThr.op);
	}
	Logger.log('Hide posts');
	scrollPage();
	Logger.log('Scroll page');
	if(localData) {
		$each($Q('.de-post-removed'), el => {
			const post = pByEl.get(el);
			if(post) {
				post.delete(false);
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
} else {
	let cfgPromise = null;
	if((aib = getImageBoard(true, false))) {
		if(!checkStorage()) {
			return;
		}
		initNavFuncs();
		cfgPromise = spawn(readCfg);
	}
	needScroll = true;
	doc.addEventListener('onwheel' in doc.defaultView ? 'wheel' : 'mousewheel', function wFunc(e) {
		needScroll = false;
		doc.removeEventListener(e.type, wFunc);
	});
	doc.addEventListener('DOMContentLoaded', () => runMain(false, cfgPromise));
}
