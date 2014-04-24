//============================================================================================================
//													MAIN
//============================================================================================================

function addDelformStuff(isLog) {
	var pNum, post;
	preloadImages(null);
	isLog && (Cfg['preLoadImgs'] || Cfg['openImgs']) && $log('Preload images');
	embedMP3Links(null);
	isLog && Cfg['addMP3'] && $log('MP3 links');
	new YouTube().parseLinks(null);
	isLog && Cfg['addYouTube'] && $log('YouTube links');
	if(Cfg['addImgs']) {
		embedImagesLinks(dForm);
		isLog && $log('Image links');
	}
	if(Cfg['imgSrcBtns']) {
		addImagesSearch(dForm);
		isLog && $log('Sauce buttons');
	}
	if(Cfg['linksNavig'] === 2) {
		genRefMap(pByNum, !!Cfg['hideRefPsts'], '');
		for(pNum in pByNum) {
			post = pByNum[pNum];
			if(post.hasRef) {
				addRefMap(post, '');
			}
		}
		isLog && $log('Reflinks map');
	}
}

function doScript(checkDomains) {
	var initTime = oldTime = Date.now();
	if(!Initialization(checkDomains)) {
		return;
	}
	$log('Init');
	readCfg();
	if(Cfg['disabled']) {
		addPanel();
		scriptCSS();
		return;
	}
	spells = new Spells(!!Cfg['hideBySpell']);
	readFavorites();
	$log('Read config');
	$disp(doc.body);
	replaceDelform();
	$log('Replace delform');
	pr = new PostForm($q(aib.qPostForm, doc), false, !liteMode);
	pByNum = Object.create(null);
	try {
		parseDelform(dForm, $Q(aib.qThread, dForm));
	} catch(e) {
		GM_log('DELFORM ERROR:\n' + getPrettyErrorMessage(e));
		$disp(doc.body);
		return;
	}
	initDelformAjax();
	readViewedPosts();
	saveFavorites();
	$log('Parse delform');
	if(Cfg['keybNavig']) {
		keyNav = new KeyNavigation();
		$log('Init keybinds');
	}
	if(!liteMode) {
		initPage();
		$log('Init page');
		addPanel();
		$log('Add panel');
	}
	initMessageFunctions();
	addDelformStuff(true);
	scriptCSS();
	$disp(doc.body);
	$log('Apply CSS');
	readPosts();
	readUserPosts();
	checkPostsVisib();
	saveUserPosts();
	$log('Apply spells');
	timeLog.push(Lng.total[lang] + (Date.now() - initTime) + 'ms');
}

if(doc.readyState === 'interactive' || doc.readyState === 'complete') {
	needScroll = false;
	doScript(true);
} else {
	aib = getImageBoard(true, false);
	needScroll = true;
	doc.addEventListener(doc.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll", function wheelFunc(e) {
		needScroll = false;
		doc.removeEventListener(e.type, wheelFunc, false);
	}, false);
	doc.addEventListener('DOMContentLoaded', doScript.bind(null, false), false);
}

