// ==UserScript==
// @name			Dollchan Extension Tools
// @version			12.2.21.0
// @namespace		http://www.freedollchan.org/scripts/*
// @author			Sthephan Shinkufag @ FreeDollChan
// @copyright		(C)2084, Bender Bending Rodriguez
// @description		Doing some profit for imageboards
// @icon			https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/raw/master/Icon.png
// @updateURL		https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/raw/master/Dollchan_Extension_Tools.meta.js
// @include			*
// ==/UserScript==

(function (scriptStorage) {
var defaultCfg = {
	version:	'2012-02-21',
	lang:		0,		// script language [0=ru, 1=en]
	spells:		0,		// hide posts by magic spells
	awipe:		1,		// antiwipe detectors:
	samel:		1,		//		same lines
	samew:		1,		//		same words
	longp:		1,		//		long posts
	longw:		0,		//		long words
	caps:		0,		//		cAsE, CAPS
	specs:		0,		//		special symbols
	nums:		1,		//		numbers
	menuhd:		1,		// menu on hide button
	viewhd:		1,		// view hidden on postnumber
	delhd:		0,		// delete hidden posts [0=off, 1=merge, 2=full hide]
	filthr:		1,		// filter threads
	updthr:		1,		// update threads [0=off, 1=auto, 2=click+count, 3=click]
	updint:		2,		//		threads update interval
	updfav:		1,		//		favicon blinking, if new posts detected
	navig:		2,		// >>links navigation [0=off, 1=no map, 2=+refmap]
	navfix:		1,		//		previews placed by [0=mouse, 1=link]
	navdel:		1,		//		delay [0=off, 1=on]
	navmrk:		0,		//		mark viewed posts
	navhid:		0,		//		strike hidden posts in refmap
	expimg:		2,		// expand images by click [0=off, 1=in post, 2=by center]
	expost:		2,		// expand shorted posts [0=off, 1=auto, 2=on click]
	ctime:		0,		// correct time in posts
	ctmofs:		'-2',	//		offset
	ctmpat:		'',		//		pattern
	insnum:		1,		// insert >>link on postnumber click
	animp:		1,		// animated popups
	rtitle:		1,		// replace page title in threads
	attach:		1,		// attach main panel
	icount:		1,		// show posts/images counter
	showmp:		0,		// show full main panel
	ospoil:		1,		// open spoilers
	noname:		0,		// hide post names
	noscrl:		1,		// hide scrollers in posts
	mp3:		1,		// mp3 player by links
	addimg:		1,		// add images by links
	ytube:		3,		// YouTube links embedder [0=off, 1=on click, 2=player, 3=preview+player, 4=only preview]
	yptype:		0,		//		player type [0=flash, 1=HTML5 <iframe>, 2=HTML5 <video>]
	ywidth:		360,	//		player width
	yheigh:		270,	//		player height
	yhdvid:		0,		//		hd video quality
	ytitle:		0,		//		convert links to titles
	verify:		1,		// reply without reload (verify on submit)
	addfav:		1,		// add thread to favorites on reply
	sagebt:		1,		// email field -> sage btn
	svsage:		1,		//		remember sage
	issage:		0,		//		reply with sage
	pform:		2,		// postform is [0=at top, 1=at bottom, 2=hidden]
	tform:		1,		// hide thread-creating form
	forcap:		1,		// language input in captcha [0=off, 1=en, 2=ru]
	txtbtn:		1,		// text format buttons [0=off, 1=graph, 2=text, 3=usual]
	txtpos:		0,		//		position at [0=top, 1=bottom]
	name:		0,		// user name
	namval:		'',		//		value
	passw:		0,		// user password
	pasval:		'',		//		value
	sign:		0,		// user signature
	sigval:		'',		//		value
	norule:		1,		// hide board rules
	nogoto:		1,		// hide goto field
	nopass:		1,		// hide password field
	mask:		0,		// mask images
	texw:		530,	// textarea width
	texh:		140		// textarea height
},

LngArray = {
	cookiesLimit:	['Превышен лимит cookies', 'Cookies limit overflow'],
	settings:		['Настройки', 'Settings'],
	hidden:			['Скрытое', 'Hidden'],
	favorites:		['Избранное', 'Favorites'],
	refresh:		['Обновить', 'Refresh'],
	newThread:		['Создать тред', 'New thread'],
	goBack:			['Назад', 'Go back'],
	goNext:			['Следующая', 'Next'],
	goUp:			['Наверх', 'To the top'],
	goDown:			['В конец', 'To the bottom'],
	expImages:		['Раскрыть картинки', 'Expand images'],
	maskImages:		['Маскировать картинки', 'Mask images'],
	autoupd:		['Автообновление треда', 'Thread autoupdate'],
	postsImages:	['Постов/Изображений в треде', 'Posts/Images in thread'],
	antiWipe:		['Анти-вайп детекторы ', 'Anti-wipe detectors '],
	sameLines:		['Повтор строк', 'Same lines'],
	sameWords:		['Повтор слов', 'Same words'],
	specSymbols:	['Спецсимволы', 'Special symbols'],
	longPosts:		['Длинные посты', 'Long posts'],
	longWords:		['Длинные слова', 'Long words'],
	numbers:		['Числа', 'Numbers'],
	caps:			['КАПС/реГисТР', 'CAPS/cAsE'],
	spells:			['Заклинания: ', 'Magic spells: '],
	add:			['Добавить', 'Add'],
	apply:			['Применить', 'Apply'],
	clear:			['Очистить', 'Clear'],
	selHiddenPosts:	[
		['Не изменять', 'Объединять', 'Удалять'],
		['Skip', 'Merge', 'Delete']
	],
	filterThreads:	['Фильтровать треды', 'Filter threads'],
	hiderMenu:		['Меню кнопки скрытия ', 'Hider menu '],
	viewHidden:		['Просмотр скрытого по №поста*', 'View hidden on №postnumber*'],
	threadUpd:		['подгрузка треда* T=', 'thread update* T='],
	selThreadUpd:	[
		['Откл.', 'Авто', 'Счет+клик', 'По клику'],
		['Disable', 'Auto', 'Count+click', 'On click']
	],
	indication:		['индикация*', 'indication*'],
	navigation:		['навигация >>ссылок* ', '>>links navigation* '],
	selNavigation:	[
		['Откл.', 'Без карты', 'С картой'],
		['Disable', 'No map', 'With map']
	],
	fixedPreview:	['Фиксировать превью под ссылкой', 'Fixed preview under link'],
	delayPreview:	['Задержка пропадания превью', 'Delay disappearance'],
	markViewed:		['Отмечать просмотренные посты*', 'Mark viewed posts*'],
	hidRefmap:		['Зачеркивать >>ссылки на скрытые посты*', 'Strike >>links to hidden posts*'],
	expandPosts:	['загрузка сокращенных постов*', 'upload of shorted posts*'],
	selClickAuto:	[
		['Откл.', 'Авто', 'По клику'],
		['Disable', 'Auto', 'On click']
	],
	insertLink:		[
		'Вставлять >>ссылку по клику на №поста*',
		'Insert >>link on №postnumber click*'
	],
	animatePopup:	['Анимировать всплывающие уведомления', 'Animate popup messages'],
	replaceTitle:	['Заменять title страницы в тредах*', 'Replace page title in threads*'],
	attachPanel:	['Прикрепить главную панель ', 'Attach main panel '],
	showImgCount:	['Счетчик постов/изображений', 'Posts/images counter'],
	imgExpand:		['раскрывать изображения ', 'expand images '],
	selImgExpand:	[
		['Откл.', 'В посте', 'По центру'],
		['Disable', 'In post', 'By center']
	],
	hideNames:		['Скрывать имена ', 'Hide names '],
	openSpoilers:	['Открыть спойлеры ', 'Open spoilers '],
	noScroll:		['Без скролла', 'No scroll'],
	mp3Embed:		['Плейер к mp3 ссылкам* ', 'MP3-links embedder* '],
	imgEmbed:		['Превью картинок по ссылкам*', 'Image-links embedder*'],
	YTembed:		['к YouTube ссылкам* ', 'to YouTube links* '],
	selYTembed:	[
		['Ничего', 'Плейер по клику', 'Авто плейер', 'Превью+плейер', 'Только превью'],
		['Nothing', 'On click player', 'Auto player', 'Preview+player', 'Only preview']
	],
	YTtitle:		['Загружать название к ссылкам*', 'Load video title to links*'],
	replyCheck:		[
		'Постить без перезагрузки (проверять ответ)*',
		'Reply without reload (check on submit)*'
	],
	addToFav:		['Добавлять в избранное при ответе', 'Add thread to favorites on reply'],
	mailToSage:		['Sage вместо поля E-mail* ', 'Sage button instead of E-mail field* '],
	saveSage:		['запоминать сажу', 'remember sage'],
	replyForm:		['форма ответа в треде* ', 'reply form in thread* '],
	noThrForm:		['Прятать форму на доске', 'Hide form on board'],
	selReplyForm:   [
		['Сверху', 'Внизу', 'Скрытая'],
		['At top', 'At bottom', 'Hidden']
	],
	capInput:		['язык ввода капчи', 'language input in captcha'],
	selCapInput:	[
		['Откл.', 'Eng', 'Rus'],
		['Disable', 'Eng', 'Rus']
	],
	formatBtns:		['кнопки форматирования текста ', 'text format buttons '],
	selFormatBtns:	[
		['Откл.', 'Графич.', 'Упрощ.', 'Стандарт.'],
		['Disable', 'As images', 'As text', 'Standard']
	],
	atBottom:		['внизу', 'at bottom'],
	fixedName:		['Постоянное имя', 'Fixed name'],
	fixedPass:		['Постоянный пароль', 'Fixed password'],
	fixedSign:		['Постоянная подпись', 'Fixed signature'],
	dontShow:		['Не отображать: ', 'Do not show: '],
	rules:			['правила ', 'rules '],
	gotoField:		['поле goto ', 'goto field '],
	passw:			['пароль', 'password'],
	noGlobalCfg:	['Глобальные настройки не найдены', 'Global config not found'],
	save:			['Сохранить', 'Save'],
	load:			['Загрузить', 'Load'],
	reset:			['Сброс', 'Reset'],
	version:		['Версия: ', 'Version: '],
	storage:		['\nХранение: ', '\nStorage: '],
	thrViewed:		['\n\nТредов просмотрено: ', '\n\nThreads viewed: '],
	thrCreated:		['\nТредов создано: ', '\nThreads created: '],
	pstSended:		['\nПостов отправлено: ', '\nPosts sended: '],
	hiddenPosts:	['Скрытые посты', 'Hidden posts'],
	hiddenThrds:	['Скрытые треды', 'Hidden threads'],
	onPage:			[' на странице', ' on page'],
	noHidThrds:		['Нет скрытых тредов...', 'No hidden threads...'],
	noHidOnPage:	['На этой странице нет скрытого...', 'Nothing to hide on this page...'],
	expandAll:		['Раскрыть все', 'Expand all'],
	undo:			['Вернуть назад', 'Undo'],
	noFavorites:	['Нет избранных тредов...', 'Favorites is empty...'],
	remove:			['Удалить', 'Remove'],
	edit:			['Правка', 'Edit'],
	info:			['Инфо', 'Info'],
	selHiderMenu:	[
		['Скрывать выделенное', 'Скрывать изображение', 'Скрыть схожий текст'],
		['Hide selected text', 'Hide same images', 'Hide similar text']
	],
	selExpandThrd:	[
		['5 постов', '15 постов', '30 постов', '50 постов', '100 постов'],
		['5 posts', '15 posts', '30 posts', '50 posts', '100 posts']
	],
	selAjaxPages:	[
		['1 страница', '2 страницы', '3 страницы', '4 страницы', '5 страниц'],
		['1 page', '2 pages', '3 pages', '4 pages', '5 pages']
	],
	loading:		['Загрузка...', 'Loading...'],
	checking:		['Проверка...', 'Checking...'],
	error:			['Ошибка:', 'Error:'],
	bold:			['Жирный', 'Bold'],
	italic:			['Наклонный', 'Italic'],
	underlined:		['Подчеркнутый', 'Underlined'],
	strike:			['Зачеркнутый', 'Strike'],
	spoiler:		['Спойлер', 'Spoiler'],
	code:			['Код', 'Code'],
	quote:			['Цитировать выделенное', 'Quote selected'],
	replies:		['Ответы:', 'Replies:'],
	postNotFound:	['Пост не найден', 'Post not found'],
	noConnect:		['Ошибка подключения', 'Connection failed'],
	postsOmitted:	['Пропущено ответов: ', 'Posts omitted: '],
	collapseThrd:	['Свернуть тред', 'Collapse thread'],
	deleted:		['удалён', 'deleted'],
	thrdNotFound:	['Тред недоступен (№', 'Thread is unavailable (№'],
	getNewPosts:	['Получить новые посты', 'Get new posts'],
	page:			[' страница', ' page'],
	hiddenThrd:		['Скрытый тред:', 'Hidden thread:'],
	expandForm:		['Раскрыть форму', 'Expand form'],
	goCatalog:		['Каталог', 'Catalog'],
	cTime:			['Корректировать время в постах* ', 'Correct time in posts* '],
	cTimeError:		['Неправильная разница во времени', 'Invalid time difference'],
	cTimeOffset:	[' Разница во времени', ' Time difference'],
	cTimePattern:	['Шаблон замены', 'Replace pattern']
},

doc = document,
Cfg = {}, Lng = {}, Favor = {}, hThrds = {}, Stat = {},
Posts = [], pByNum = [], Visib = [], Expires = [], refMap = [],
pSpells = {}, tSpells = {}, oSpells = {}, spellsList = [],
ajaxThrds = {}, ajaxPosts = [], ajaxInt,
nav = {}, sav = {}, ch = {},
kusaba, hanab, abu, tinyb, host, dm, brd, res, TNum, pageNum, docExt, pClass,
cssFix, xDelForm, xPostRef, xPostMsg,
pr = {}, dForm, oeForm, pArea, qArea, pPanel, opPanel, pView, dummy,
quotetxt = '',
docTitle, favIcon, favIconInt, isActiveTab = false, isExpImg = false,
timePattern, timeRegex,
oldTime, timeLog = '',
stoargeLife = 5*24*3600*1000,
homePage = 'http://www.freedollchan.org/scripts/';


/*=============================================================================
									UTILS
=============================================================================*/

function $X(path, root) {
	return doc.evaluate(path, root || doc, null, 6, null);
}
function $x(path, root) {
	return doc.evaluate(path, root || doc, null, 8, null).singleNodeValue;
}
function $xb(path, root) {
	return doc.evaluate(path, root || doc, null, 3, null).booleanValue;
}
function $id(id) {
	return doc.getElementById(id);
}
function $t(id, root) {
	return (root || doc).getElementsByTagName(id)[0];
}
function $next(el) {
	while((el = el.nextSibling) && el.nodeType != 1);
	return el;
}
function $prev(el) {
	while((el = el.previousSibling) && el.nodeType != 1);
	return el;
}
function $up(el, i) {
	for(i = i || 1; i--;) el = el.parentNode;
	return el;
}
function $1(el) {
	return el.firstChild;
}
function $each(list, fn, dir) {
	var i, el;
	if(!list) return;
	if(dir) for(i = 0; el = list.snapshotItem(i++);) fn(el, i - 1);
	else for(i = list.snapshotLength - 1; el = list.snapshotItem(i--);) fn(el, i + 1);
}
function $html(el, htm) {
	var cln = el.cloneNode(false);
	cln.innerHTML = htm;
	el.parentNode.replaceChild(cln, el);
	return cln;
}
function $attr(el, attr) {
	for(var key in attr)
		key == 'Class' ? el.className = attr[key]
		: key == 'text' ? el.textContent = attr[key]
		: key == 'value' ? el.value = attr[key]
		: el.setAttribute(key, attr[key]);
	return el;
}
function $event(el, events) {
	for(var key in events) el.addEventListener(key, events[key], false);
}
function $rattr(el, attr) {
	if(el.getAttribute(attr)) el.removeAttribute(attr);
	if(nav.Opera && el[attr]) el[attr] = '';
}
function $revent(el, events) {
	for(var key in events) el.removeEventListener(key, events[key], false);
}
function $append(el, nodes) {
	for(var i = 0, len = nodes.length; i < len; i++) if(nodes[i]) el.appendChild(nodes[i]);
}
function $before(el, nodes) {
	for(var i = 0, len = nodes.length; i < len; i++)
		if(nodes[i]) el.parentNode.insertBefore(nodes[i], el);
}
function $after(el, nodes) {
	for(var i = nodes.length; i--;)
		if(nodes[i]) el.parentNode.insertBefore(nodes[i], el.nextSibling);
}
function $add(htm, events) {
	var el;
	dummy.innerHTML = htm;
	el = dummy.firstChild;
	if(events) $event(el, events);
	return el;
}
function $new(tag, attr, events) {
	var el = doc.createElement(tag);
	if(attr) $attr(el, attr);
	if(events) $event(el, events);
	return el;
}
function $New(tag, nodes, attr, events) {
	var el = $new(tag, attr, events);
	$append(el, nodes);
	return el;
}
function $txt(el) {
	return doc.createTextNode(el);
}
function $btn(val, fn) {
	return $new('input', {type: 'button', value: val}, {click: fn});
}
function $if(cond, el) {
	return cond ? el : null;
}
function $disp(el) {
	el.style.display = el.style.display == 'none' ? '' : 'none';
}
function $del(el) {
	if(el) el.parentNode.removeChild(el);
}
function $Del(path, root) {
	$each($X(path, root), function(el) { $del(el); });
}
function $delNx(el) {
	while(el.nextSibling) $del(el.nextSibling);
}
function $offset(el) {
	var box = el.getBoundingClientRect();
	return {
		top: Math.round(box.top + window.pageYOffset),
		left: Math.round(box.left + window.pageXOffset)
	};
}
function getStyle(el, prop) {
	if(doc.defaultView && doc.defaultView.getComputedStyle)
		return doc.defaultView.getComputedStyle(el, '').getPropertyValue(prop);
	return '';
}
function $focus(el) {
	window.scrollTo(0, $offset(el).top);
}
function $pD(e) {
	e.preventDefault();
}
function rand10() {
	return Math.floor(Math.random()*1e10).toString(10);
}
function insertInto(el, text) {
	var scrtop = el.scrollTop, start = el.selectionStart, end = el.selectionEnd;
	el.value = el.value.substr(0, start) + text + el.value.substr(end);
	el.setSelectionRange(start + text.length, start + text.length);
	el.focus();
	el.scrollTop = scrtop;
}
function strToRegexp(str) {
	var t = str.match(/\/.*?[^\\]\/[ig]*/)[0], l = t.lastIndexOf('/');
	return new RegExp(t.substr(1, l - 1), t.substr(l + 1));
}
function isEmptyObj(obj) {
	for(var i in obj) return false;
	return true;
}
if(!String.prototype.trim) {
	String.prototype.trim = function () {
		var str = this.replace(/^\s\s*/, ''), s = /\s/, i = str.length;
		while(s.test(str.charAt(--i)));
		return str.slice(0, i + 1);
	};
}
function txtSelection() {
	return nav.Opera ? doc.getSelection() : window.getSelection().toString();
}
function $close(el) {
	var h, closing, i = 8;
	if(Cfg.animp == 0) $del(el);
	if(!el) return;
	h = el.clientHeight - 18;
	el.style.height = h + 'px';
	closing = setInterval(function() {
		var s, hh;
		if(!el || i-- < 0) { clearInterval(closing); $del(el); return; }
		s = el.style;
		hh = parseInt(s.height) - h/10;
		s.opacity = i/10;
		s.paddingTop = parseInt(s.paddingTop) - 1 + 'px';
		s.paddingBottom = parseInt(s.paddingBottom) - 1 + 'px';
		s.height = (hh < 0 ? 0 : hh) + 'px';
	}, 35);
}
function $show(el) {
	var showing, i = 0;
	if(Cfg.animp == 0) { el.style.opacity = 1; el.style.padding = '10px'; return; }
	showing = setInterval(function() {
		var s;
		if(!el || i++ > 8) { clearInterval(showing); return; }
		s = el.style;
		s.opacity = i/10;
		s.paddingTop = parseInt(s.paddingTop) + 1 + 'px';
		s.paddingBottom = parseInt(s.paddingBottom) + 1 + 'px';
	}, 35);
}
function Log(txt) {
	var newTime = (new Date()).getTime();
	if(txt) timeLog += txt + ': ' + (newTime - oldTime).toString() + 'ms\n';
	oldTime = newTime;
}

/*=============================================================================
								STORAGE / CONFIG
=============================================================================*/

function setCookie(name, value, life) {
	if(name) doc.cookie = escape(name) + '=' + escape(value) + ';expires=' 
		+ (new Date((new Date()).getTime()
		+ (life == 'delete' ? -10 : stoargeLife))).toGMTString() + ';path=/';
}

function getCookie(name) {
	var one, arr = doc.cookie.split('; '), i = arr.length;
	while(i--) { one = arr[i].split('='); if(one[0] == escape(name)) return unescape(one[1]); }
	return false;
}

function turnCookies(name) {
	var data = getCookie('DESU_Cookies'), arr = data ? data.split('|') : [];
	arr[arr.length] = name;
	if(arr.length > 13) { setCookie(arr[0], '', 'delete'); arr.splice(0, 1); }
	setCookie('DESU_Cookies', arr.join('|'));
}

function getStored(name, fn) {
	setTimeout(function() {
		if(sav.GM) fn(GM_getValue(name));
		else if(sav.script) fn(scriptStorage.getItem(name));
		else if(sav.local) fn(localStorage.getItem(name));
		else fn(getCookie(name));
	}, 0);
}

function setStored(name, value) {
	setTimeout(function() {
		if(sav.GM) GM_setValue(name, value);
		else if(sav.script) scriptStorage.setItem(name, value);
		else if(sav.local) localStorage.setItem(name, value);
		else setCookie(name, value);
	}, 0);
}

function getStoredObj(name, def, fn) {
	try { getStored(name, function(data) { fn(eval(data) || def); }); } catch(e) { fn(def); }
}

function saveSpells(val) {
	spellsList = val.split('\n');
	setStored('DESU_Spells_' + dm, val);
	initSpells();
}

function fixGlobalCfg() {
	Cfg.forcap = hanab || ch.tire || ch.vomb || ch.ment || ch._5ch ? 2 : 1;
}

function setDefaultCfg() {
	Cfg = defaultCfg;
	fixGlobalCfg();
	setStored('DESU_Config_' + dm, uneval(defaultCfg));
}

function isValidCfg(data) {
	try { if(eval(data).version) return true; } catch(e) {}
	return false;
}

function readCfg(fn) {
	var global = false,
	onRead = function(data) {
		var key;
		if(!isValidCfg(data)) setDefaultCfg();
		else Cfg = eval(data);
		Cfg.version = defaultCfg.version;
		for(key in defaultCfg) if(Cfg[key] == null) Cfg[key] = defaultCfg[key];
		if(global) fixGlobalCfg();
		if(hanab) Cfg.updthr = Cfg.updfav = Cfg.expost = 0;
		if(nav.Chrome) Cfg.updfav = 0;
		if(Cfg.svsage == 0) Cfg.issage = 0;
		setStored('DESU_Config_' + dm, uneval(Cfg));
		for(key in LngArray) Lng[key] = Cfg.lang == 0 ? LngArray[key][0] : LngArray[key][1];
		getStoredObj('DESU_Stat_' + dm, {view: 0, op: 0, reply: 0}, function(obj) {
			Stat = obj;
			if(TNum) Stat.view = parseInt(Stat.view) + 1;
			setStored('DESU_Stat_' + dm, uneval(Stat));
		});
		if(Cfg.ctime) parseTimePattern();
		getStored('DESU_Spells_' + dm, function(data) { saveSpells(data || ''); fn(); });
	};
	getStored('DESU_Config_' + dm, function(data) {
		if(!sav.isGlobal || isValidCfg(data)) onRead(data);
		else getStored('DESU_GlobalCfg', function(data) { global = true; onRead(data); });
	});
}

function saveCfg(name, val) {
	Cfg[name] = val;
	setStored('DESU_Config_' + dm, uneval(Cfg));
}

function toggleCfg(name) {
	saveCfg(name, Cfg[name] == 0 ? 1 : 0);
}

function getVisib(pNum) {
	var key = sav.cookie ? pByNum[pNum].Count : brd + pNum;
	return key in Visib ? Visib[key] : null;
}

function readPostsVisib(fn) {
	var onRead = function() {
		forAll(function(post) {
			var pNum = parseInt(post.Num);
			post.Vis = getVisib(pNum);
			if(post.isOp) {
				if(hThrds[brd] && (sav.cookie && hThrds[brd].indexOf(pNum) > -1
					|| !sav.cookie && hThrds[brd][pNum] !== undefined))
					setPostVisib(post, 0);
				else if(post.Vis == 0) { Visib[brd + pNum] = null; post.Vis = null; }
			}
		});
		fn();
	};
	if(!sav.cookie)
		getStored('DESU_Posts_' + dm, function(data) {
			var i, arr, currTime = (new Date()).getTime();
			if(data) {
				arr = data.split('-');
				i = arr.length;
				while((i -= 3) >= 0)
					if(currTime < arr[i + 2]) {
						Visib[arr[i]] = arr[i + 1];
						Expires[arr[i]] = arr[i + 2];
					}
			}
			readHiddenThreads(onRead);
		});
	else if(TNum)
		getStored('DESU_Posts_' + dm + '_' + TNum, function(data) {
			var i;
			if(data) { i = data.length; while(i--) Visib[i] = data[i]; }
			readHiddenThreads(onRead);
		});
	else readHiddenThreads(onRead);
}

function savePostsVisib() {
	var key, arr = [], id = 'DESU_Posts_' + dm;
	if(!sav.cookie) {
		for(key in Visib) {
			if(!/^\d$/.test(Visib[key])) break;
			arr[arr.length] = key + '-' + Visib[key] + '-' + Expires[key];
		}
		setStored(id, arr.join('-'));
	} else if(TNum) {
		id += '_' + TNum;
		getStored(id, function(data) {
			if(!data) turnCookies(id);
			setStored(id, Visib.join(''));
		});
	}
	toggleContent('hidd', true);
}

function readHiddenThreads(fn) {
	getStoredObj('DESU_Threads_' + dm, {}, function(data) {hThrds = data; fn(); });
}

function saveHiddenThreads(txt) {
	setStored('DESU_Threads_' + dm, txt || uneval(hThrds));
}

function toggleHiddenThread(post, vis) {
	var i, b = brd, tNum = parseInt(post.Num);
	if(sav.cookie) {
		if(!hThrds[b]) hThrds[b] = [];
		i = hThrds[b].indexOf(tNum);
		if(vis == 0 && i < 0) hThrds[b].push(tNum);
		if(vis == 1 && i >= 0) hThrds[b].splice(i, 1);
		if(encodeURIComponent(uneval(Favor)).length > 4095) hThrds[b].shift();
	} else {
		if(!hThrds[b]) hThrds[b] = {};
		if(vis == 0) hThrds[b][tNum] = getTitle(post).substring(0, 70);
		else { delete hThrds[b][tNum]; if(isEmptyObj(hThrds[b])) delete hThrds[b]; }
	}
	saveHiddenThreads();
}

function readFavorites(fn) {
	getStoredObj('DESU_Favorites', {}, function(data) {Favor = data; fn(); });
}

function saveFavorites(txt) {
	setStored('DESU_Favorites', txt || uneval(Favor));
	toggleContent('fav', true);
}

function removeFavorites(h, b, tNum) {
	delete Favor[h][b][tNum];
	if(isEmptyObj(Favor[h][b])) delete Favor[h][b];
	if(isEmptyObj(Favor[h])) delete Favor[h];
	if(pByNum[tNum]) $x('.//a[starts-with(@class,"DESU_icn_fav")]', pByNum[tNum].Btns).className
		= 'DESU_icn_favor';
}

function toggleFavorites(post, btn) {
	var h = host, b = brd, tNum = post.Num;
	if(!btn) return;
	readFavorites(function() {
		if(Favor[h] && Favor[h][b] && Favor[h][b][tNum]) removeFavorites(h, b, tNum);
		else {
			if(!Favor[h]) Favor[h] = {};
			if(!Favor[h][b]) Favor[h][b] = {};
			Favor[h][b][tNum] = {
				cnt: getPstCount(getThread(post)),
				txt: getTitle(post).substring(0, sav.cookie ? 25 : 70)
			};
			if(sav.cookie && encodeURIComponent(uneval(Favor)).length > 4095)
				{ $alert(Lng.cookiesLimit); delete Favor[h][b][tNum]; return; }
			btn.className = 'DESU_icn_favset';
		}
		saveFavorites();
	});
}

function markViewedPost(pNum) {
	var post = pByNum[pNum];
	if(post && (post.className).indexOf('viewed') < 0) post.className += ' viewed';
}

function readViewedPosts() {
	var arr, i;
	if(Cfg.navmrk == 0 || !sav.session) return;
	arr = (sessionStorage.viewedPosts || '').split(',');
	for(i in arr) markViewedPost(arr[i]);
}

function saveViewedPosts(pNum) {
	var arr;
	if(!sav.session) return;
	arr = (sessionStorage.viewedPosts || '').split(',');
	arr.push(pNum);
	sessionStorage.viewedPosts = arr;
}

/*=============================================================================
							CONTROLS / COMMON CHANGES
=============================================================================*/

function addPanel() {
	var imgLen = getImages(dForm).snapshotLength;
	$before(dForm, [
		$new('div', {style: 'clear:both'}),
		$New('div', [
			$new('a', {id: 'DESU_btn_logo', href: '#'}, {
				click: function(e) { $pD(e); toggleCfg('showmp'); scriptCSS(); }
			}),
			$New('div', [
				$new('a', {id: 'DESU_btn_settings', title: Lng.settings, href: '#'}, {
					click: function(e) { $pD(e); toggleContent('sett'); }
				}),
				$new('a', {id: 'DESU_btn_hidden', title: Lng.hidden, href: '#'}, {
					click: function(e) { $pD(e); toggleContent('hidd'); }
				}),
				$new('a', {id: 'DESU_btn_favor', title: Lng.favorites, href: '#'}, {
					click: function(e) { $pD(e); toggleContent('fav'); }
				}),
				$new('a', {id: 'DESU_btn_refresh', title: Lng.refresh, href: '#'}, {
					click: function(e) { $pD(e); window.location.reload(); },
					mouseover: function() { if(!TNum) selectAjaxPages(); },
					mouseout: removeSelMenu
				}),
				$new('a', {
					id: 'DESU_btn_goback', title: Lng.goBack, href: 'http://' + host + '/' + brd
						+ '/' + (pageNum > 1 ? (pageNum - 1).toString() + docExt : '')
				}),
				$if(!TNum, $new('a', {
					id: 'DESU_btn_gonext', title: Lng.goNext, href: 'http://' + host + '/' + brd
						+ '/' + (pageNum > 0 ? (pageNum + 1).toString() : 1) + docExt
				})),
				$new('a', {id: 'DESU_btn_goup', title: Lng.goUp, href: '#'}, {
					click: function(e) { $pD(e); window.scrollTo(0, 0); }
				}),
				$new('a', {id: 'DESU_btn_godown', title: Lng.goDown, href: '#'}, {
					click: function(e) {
						$pD(e);
						window.scrollTo(0, doc.body.scrollHeight || doc.body.offsetHeight);
					}
				}),
				$if(!TNum && (pr.on || oeForm), $new('a', {
					id: 'DESU_btn_newthr', title: Lng.newThread, href: '#'}, {
					click: toggleMainReply
				})),
				$if(imgLen > 0, $new('a', {
					id: 'DESU_btn_expimg', title: Lng.expImages, href: '#'}, {
					click: function(e) {
						$pD(e);
						Cfg.expimg = 1;
						isExpImg = !isExpImg;
						forAll(function(post) { expandAllPostImg(post, isExpImg); });
					}
				})),
				$if(pr.file || oeForm, $new('a', {
					id: 'DESU_btn_maskimg', title: Lng.maskImages, href: '#'}, {
					click: function(e) { $pD(e); toggleCfg('mask'); scriptCSS(); }
				})),
				$if(TNum && Cfg.updthr != 3, $new('a', {
					id: 'DESU_btn_updon', title: Lng.autoupd, href: '#'}, {
					click: function(e) {
						$pD(e);
						if(ajaxInt) endPostsUpdate();
						else { this.id = 'DESU_btn_updon'; initPostsUpdate(); }
					}
				})),
				$if(ch.nul, $new('a', {
					id: 'DESU_btn_catalog', title: Lng.goCatalog, target: '_blank',
					href: 'http://0chan.ru/' + brd +'/catalog.html'
				}))
			], {id: 'DESU_panel_btns'}),
			$if(TNum, $New('div', [$new('span', {
				title: Lng.postsImages, text: Posts.length + '/' + imgLen
			})], {id: 'DESU_panel_info'}))
		], {id: 'DESU_panel'}),
		$new('div', {id: 'DESU_content'}),
		$new('div', {id: 'DESU_alertbox'}),
		$new('hr', {style: 'clear:both'})
	]);
}

function toggleContent(name, isUpd) {
	var el = $id('DESU_content'), id = 'DESU_content_' + name;
	if(isUpd && el.className != id) return;
	el.innerHTML = '';
	if(!isUpd && el.className == id) { el.className = 'DESU_content'; return; }
	el.className = id;
	if(Cfg.attach == 0) el.appendChild($new('hr', {style: 'clear:both'}));
	if(name != 'sett') {
		el.appendChild($add('<table><tbody align="left"></tbody></table>'));
		if(Cfg.attach == 1)
			$t('table', el).style.backgroundColor = getStyle($t('body'), 'background-color');
		if(name == 'hidd') readHiddenThreads(addHiddenTable);
		if(name == 'fav') readFavorites(addFavoritesTable);
	} else getStored('DESU_Spells_' + dm, function(data) {
		spellsList = data.split('\n');
		initSpells();
		addSettings();
		$id('DESU_spelledit').value = data;
	});
}

function addSettings() {
	var lBox = function(name, txt, fn, id) {
			var el = $new('input', {type: 'checkbox'}, {
				click: function() { toggleCfg(name); if(fn) fn(); }
			});
			el.checked = Cfg[name] == 1;
			if(id) el.id = id;
			return $New('label', [el, $txt(' ' + txt)]);
		},
		divBox = function(name, txt, fn, id) {
			return $New('div', [lBox(name, txt, fn, id)]);
		},
		inpTxt = function(name, size, fn) {
			return $new('input', {
				type: 'text', id: 'DESU_' + name, size: size, value: Cfg[name]}, {keyup: function() {
					saveCfg(name, $id('DESU_' + name).value.replace(/\|/g, ''));
					if(fn) fn(); 
				}
			})
		},
		optSel = function(name, arr, txt, fn) {
			for(var i = 0, len = arr.length, el, opt = []; i < len; i++)
				opt[i] = '<option value="' + i + '">' + arr[i] + '</option>';
			el = $add('<select id="' + name + '_sel">' + opt.join('') + '</select>', {
				change: (fn ? fn : function() { saveCfg(name, this.selectedIndex); })
			});
			el.selectedIndex = Cfg[name];
			return $New('label', [el, $txt(' ' + txt)]);
		};
	$append($id('DESU_content'), [
		$New('div', [
			$new('div', {id: 'DESU_sett_head', text: 'Dollchan Extension Tools'}, {
				click: function() { $alert('<div style="display:inline-block; vertical-align:top; padding:0 10px 0 0">' + Lng.version + Cfg.version + Lng.storage + (sav.GM ? 'Mozilla config' : sav.local ? 'Local Storage' : sav.script ? 'Opera ScriptStorage' : 'Cookies') + Lng.thrViewed + Stat.view + Lng.thrCreated + Stat.op + Lng.pstSended + Stat.reply + '</div><div style="display:inline-block; vertical-align:top; padding:0 0 0 10px; border-left:1px solid grey">' + timeLog + '</div><div><a href="' + homePage + '" target="_blank">' + homePage + '</a></div>'); }
			}),
			$new('div', {Class: pClass, id: 'DESU_sett_main'})
		], {id: 'DESU_sett_body'})
	]);
	$append($id('DESU_sett_main'), [
		$New('div', [
			lBox('spells', Lng.spells, toggleSpells, 'DESU_spelledit_ch'),
			$New('span', [
				$new('a', {text: Lng.add, href: '#'}, {
					click: $pD,
					mouseover: selectSpell,
					mouseout: removeSelMenu
				}),
				$new('a', {text: Lng.apply, href: '#'}, {
					click: function(e) { $pD(e); applySpells(); }
				}),
				$new('a', {text: Lng.clear, href: '#'}, {
					click: function(e) { $pD(e); $id('DESU_spelledit').value = ''; applySpells(); }
				}),
				$new('a', {text: '?', target: '_blank', href: homePage + 'spells'})
			], {id: 'DESU_spellpanel'}),
			$new('textarea', {id: 'DESU_spelledit', rows: 7, cols: 56})
		]),
		$New('div', [
			lBox('awipe', Lng.antiWipe),
			$btn('>', function() { $disp($id('DESU_wipebox')); })
		]),
		$New('div', [
			divBox('samel', Lng.sameLines),
			divBox('samew', Lng.sameWords),
			divBox('longp', Lng.longPosts),
			divBox('longw', Lng.longWords),
			divBox('caps', Lng.caps),
			divBox('specs', Lng.specSymbols),
			divBox('nums', Lng.numbers)
		], {id: 'DESU_wipebox', style: 'display:none; padding-left:15px'}),
		$New('div', [lBox('menuhd', Lng.hiderMenu), lBox('viewhd', Lng.viewHidden)]),
		$New('div', [
			optSel('delhd', Lng.selHiddenPosts, Lng.hiddenPosts, function() {
				processHidden(this.selectedIndex, Cfg.delhd);
			}),
			lBox('filthr', Lng.filterThreads)
		]),
		$new('hr'),
		$if(!hanab, $New('div', [
			optSel('updthr', Lng.selThreadUpd, Lng.threadUpd),
			optSel('updint', [0.5, 1, 1.5, 2, 5, 15, 30], 'min* '),
			$if(!nav.Chrome, lBox('updfav', Lng.indication))
		])),
		$New('div', [
			optSel('navig', Lng.selNavigation, Lng.navigation),
			$btn('>', function() { $disp($id('DESU_pviewbox')); })
		]),
		$New('div', [
			divBox('navfix', Lng.fixedPreview),
			divBox('navdel', Lng.delayPreview),
			divBox('navmrk', Lng.markViewed),
			divBox('navhid', Lng.hidRefmap)
		], {id: 'DESU_pviewbox', style: 'display:none; padding-left:15px'}),
		$New('div', [optSel('expimg', Lng.selImgExpand, Lng.imgExpand)]),
		$if(!hanab, $New('div', [optSel('expost', Lng.selClickAuto, Lng.expandPosts)])),
		$New('div', [
			lBox('ctime', Lng.cTime, toggleTimeSettings, 'DESU_ctime'),
			$btn('>', function() { $disp($id('DESU_ctimebox')); })
		]),
		$New('div', [
			$New('div', [inpTxt('ctmofs', 3), $new('span', {text: Lng.cTimeOffset})]),
			$New('div', [
				inpTxt('ctmpat', 30),
				$txt(' '),
				$new('a', {text: Lng.cTimePattern, href: '#'}, {
					click: function(e) { $pD(e); $alert('"s" - second (one digit),\n"i" - minute (one digit),\n"h" - hour (one digit),\n"d" - day (one digit),\n"n" - month (one digit),\n"m" - month (string),\n"y" - year (one digit),\n"-" - any symbol\n"?" - previous char may not be\n\nExamples:\n0chan.ru: "----yyyy-m-dd-hh-ii-ss"\niichan.ru: "----dd-m-yyyy-hh-ii-ss"\ndobrochan.ru: "dd-m-?-?-?-?-?-yyyy-------hh-ii-?s?s?"\n410chan.org: "dd-nn-yyyy-------hh-ii-ss"\n4chan.org: "nn-dd-yy-----hh-ii-?s?s?"\n4chon.net: "nn-dd-yy-------hh-ii-ss"\nkrautchan.net: "yyyy-nn-dd-hh-ii-ss---?-?-?-?-?"'); }
				})
			])
		], {id: 'DESU_ctimebox', style: 'display:none; padding-left:15px'}),
		divBox('insnum', Lng.insertLink),
		divBox('animp', Lng.animatePopup),
		divBox('rtitle', Lng.replaceTitle),
		$New('div', [
			lBox('attach', Lng.attachPanel, function() { toggleContent('sett'); scriptCSS(); }),
			lBox('icount', Lng.showImgCount, scriptCSS)
		]),
		$New('div', [
			lBox('ospoil', Lng.openSpoilers, scriptCSS),
			lBox('noname', Lng.hideNames, scriptCSS),
			$if(abu, lBox('noscrl', Lng.noScroll, scriptCSS))
		]),
		$New('div', [lBox('mp3', Lng.mp3Embed), lBox('addimg', Lng.imgEmbed)]),
		$New('div', [
			optSel('ytube', Lng.selYTembed, Lng.YTembed),
			$btn('>', function() { $disp($id('DESU_ytubebox')); })
		]),
		$New('div', [
			$New('div', [
				optSel('yptype', !nav.Opera 
					? ['Flash', 'HTML5 iframe', 'HTML5 video'] : ['Flash', 'HTML5 iframe'], ' '),
				inpTxt('ywidth', 6), $txt('×'), inpTxt('yheigh', 6), $txt(' '),
				lBox('yhdvid', 'HD ')
			]),
			$if(!nav.Opera, lBox('ytitle', Lng.YTtitle))
		], {id: 'DESU_ytubebox', style: 'display:none; padding-left:15px'}),
		$new('hr'),
		divBox('verify', Lng.replyCheck),
		divBox('addfav', Lng.addToFav),
		$if(pr.mail, $New('div', [lBox('sagebt', Lng.mailToSage), lBox('svsage', Lng.saveSage)])),
		$if(pr.on, $New('div', [
			optSel('pform', Lng.selReplyForm, Lng.replyForm),
			lBox('tform', Lng.noThrForm, function() {
				if(!TNum) pArea.style.display = Cfg.tform ? 'none' : '';
			})
		])),
		$New('div', [optSel('forcap', Lng.selCapInput, Lng.capInput)]),
		$if(pr.on, $New('div', [
			optSel('txtbtn', Lng.selFormatBtns, Lng.formatBtns, function() {
				saveCfg('txtbtn', this.selectedIndex);
				addTextPanel();
				scriptCSS();
			}),
			lBox('txtpos', Lng.atBottom, scriptCSS)
		])),
		$if(pr.name, $New('div', [
			inpTxt('namval', 20, setUserName),
			lBox('name', Lng.fixedName, setUserName, 'DESU_fixedname_ch')
		])),
		$if(pr.passw, $New('div', [
			inpTxt('pasval', 20, setUserPassw),
			lBox('passw', Lng.fixedPass, setUserPassw, 'DESU_fixedpass_ch')
		])),
		$if(pr.txta, $New('div', [inpTxt('sigval', 20), lBox('sign', Lng.fixedSign)])),
		$New('div', [
			$if(pr.on || oeForm, $txt(Lng.dontShow)),
			lBox('norule', Lng.rules, scriptCSS),
			$if(pr.gothr, lBox('nogoto', Lng.gotoField, function() { $disp(pr.gothr); })),
			$if(pr.passw, lBox('nopass', Lng.passw, function() { $disp($up(pr.passw, 2)); }))
		]),
		$new('hr'),
		$New('div', [
			optSel('lang', ['Ru', 'En'], '', function() {
				saveCfg('lang', this.selectedIndex);
				window.location.reload();
			}),
			$if(sav.isGlobal, $btn(Lng.load, function() {
				getStored('DESU_GlobalCfg', function(data) {
					if(isValidCfg(data)) {
						setStored('DESU_Config_' + dm, '');
						window.location.reload();
					} else $alert(Lng.noGlobalCfg);
				});
			})),
			$if(sav.isGlobal, $btn(Lng.save, function() {
				setStored('DESU_GlobalCfg', uneval(Cfg));
				toggleContent('sett', true);
			})),
			$btn(Lng.edit, function() {
				getStored('DESU_Config_' + dm, function(val) {
					$disp($up($attr($id('DESU_cfgedit'), {value: val})));
				});
			}),
			$btn(Lng.reset, function() {
				setDefaultCfg();
				setStored('DESU_Stat_' + dm, '');
				setStored('DESU_Favorites', '');
				setStored('DESU_Threads_' + dm, '');
				saveSpells('');
				window.location.reload();
			})
		], {style: 'float:right'}),
		$new('br', {style: 'clear:both'}),
		$New('div', [
			$new('textarea', {
				id: 'DESU_cfgedit', rows: 10, cols: 56, value: ''
			}),
			$btn(Lng.save, function() {
				setStored('DESU_Config_' + dm, $id('DESU_cfgedit').value.trim());
				window.location.reload();
			})
		], {style: 'display:none'})
	]);
}

function addHiddenTable() {
	var cln, i, b, tNum, url, clones = [], tcnt = 0, pcnt = 0,
		table = $x('.//div[@id="DESU_content"]//tbody');
	forAll(function(post) { if(post.Vis == 0) {
		var pp = !post.isOp;
		cln = $attr(($id('DESU_hiddenthr_' + post.Num) || post).cloneNode(true), {id: ''});
		clones.push(cln);
		cln.style.display = '';
		cln.pst = post;
		cln.vis = 0;
		$event($x(pp ? './/a[@class="DESU_icn_unhide"]' : './/a', cln), {
			click: function(el) { return function(e) {
				$pD(e);
				el.vis = el.vis == 0 ? 1 : 0;
				if(pp) togglePost(el, el.vis);
				else $next(el).style.display = el.vis == 1 ? '' : 'none';
			}}(cln)
		});
		if(Cfg.attach == 0) $event($x(xPostRef, cln) || $x('.//a', cln), {
			mouseover: function(el) { return function() {
				if(el.vis == 0) {
					if(pp) togglePost(el, 1);
					else $next(el).style.display = '';
				}
			}}(cln),
			mouseout: function(el) { return function() {
				if(el.vis == 0) {
					if(pp) togglePost(el, 0);
					else $next(el).style.display = 'none';
				}
			}}(cln)
		});
		$append(table, [
			$if(!pp && tcnt++ == 0 || pp && pcnt++ == 0, $New('tr', [
				$add('<b>' + (pp ? Lng.hiddenPosts : Lng.hiddenThrds) + Lng.onPage + ':</b>')
			])),
			$New('tr', [cln, $if(!pp, $attr(post.cloneNode(true), {
				style: 'display:none; padding-left:15px; overflow:hidden; border:1px solid grey'
			}))])
		]);
		if(!pp) togglePost($next(cln), 1);
	}});
	if(pcnt + tcnt == 0) table.insertRow(-1).appendChild($add('<b>' + Lng.noHidOnPage + '</b>'));
	else $append(table.insertRow(-1), [
		$btn(Lng.expandAll, function() {
			if(this.value == Lng.expandAll) {
				this.value = Lng.undo;
				for(i = 0; cln = clones[i++];) setPostVisib(cln.pst, 1);
			} else {
				this.value = Lng.expandAll;
				for(i = 0; cln = clones[i++];) setPostVisib(cln.pst, cln.vis);
			}
		}),
		$btn(Lng.save, function() {
			for(i = 0; cln = clones[i++];) if(cln.vis != 0) setPostVisib(cln.pst, 1);
			savePostsVisib();
		})
	]);
	$append(table, [$New('tr', [
		$new('hr'),
		$add('<b>' + (isEmptyObj(hThrds) ? Lng.noHidThrds : Lng.hiddenThrds) + '</b>')
	])]);
	if(!isEmptyObj(hThrds)) for(b in hThrds) {
		$append(table, [$New('tr', [
			$new('input', {type: 'checkbox'}, {click: function() {
				var inp = this;
				$each($X('.//tr[contains(@id,"_' + $up(inp).id.substr(14) + '|")]/div/input', table),
					function(el) { el.checked = inp.checked; }
				);
			}}),
			$add('<b>' + b + '</b>')
		], {Class: 'DESU_hthrhead', id: 'DESU_hthrhead_' + b})]);
		for(tNum in hThrds[b]) {
			if(sav.cookie) tNum = hThrds[b][tNum];
			url = getThrdUrl(host, b, tNum);
			$append(table, [$New('tr', [
				$New('div', [
					$new('input', {type: 'checkbox'}),
					$add('<a href="' + url + '" target="_blank">№' + tNum + '</a>'),
					$if(!sav.cookie, $txt(' - ' + hThrds[b][tNum]))
				], {Class: pClass})
			], {Class: 'DESU_hthrdata', id: 'DESU_hthrdata_' + b + '|' + tNum})]);
		}
	}
	$append(table, [
		$New('tr', [
			$btn(Lng.edit, function() { $disp($up($id('DESU_hthredit'))); }),
			$btn(Lng.remove, function() {
				$each($X('.//tr[@class="DESU_hthrdata"]', table), function(el) {
					var i, arr = el.id.substr(14).split('|'), b = arr[0], tNum = parseInt(arr[1]);
					if(!$t('input', el).checked) return;
					if(pByNum[tNum]) setPostVisib(pByNum[tNum], 1);
					else if(sav.cookie) {
						i = hThrds[b].indexOf(tNum);
						if(i >= 0) hThrds[b].splice(i, 1);
					} else { Visib[b + tNum] = 1; delete hThrds[b][tNum]; }
					if(isEmptyObj(hThrds[b])) delete hThrds[b];
				});
				setStored('DESU_Threads_' + dm, uneval(hThrds));
				savePostsVisib();
			})
		]),
		$New('tr', [
			$new('textarea', {id: 'DESU_hthredit', rows: 9, cols: 70, value: uneval(hThrds)}),
			$btn(Lng.save, function() { saveHiddenThreads($id('DESU_hthredit').value); })
		], {style: 'display:none'})
	]);
	eventRefLink(table);
}

function addFavoritesTable() {
	var h, b, tNum, url, fav, list, table = $x('.//div[@id="DESU_content"]//tbody');
	for(h in Favor) for(b in Favor[h]) {
		$append(table, [$New('tr', [
			$new('input', {type: 'checkbox'}, {click: function() {
				var inp = this;
				$each($X('.//tr[contains(@id,"_' + $up(inp).id.substr(13) + '|")]/div/input', table),
					function(el) { el.checked = inp.checked; }
				);
			}}),
			$add('<a href="http://' + h + '/' + b + '" target="_blank">' + h + '/' + b + '</a>')
		], {Class: 'DESU_favhead', id: 'DESU_favhead_' + h + '|' + b})]);
		for(tNum in Favor[h][b]) {
			url = getThrdUrl(h, b, tNum);
			fav = Favor[h][b][tNum];
			$append(table, [$New('tr', [
				$New('div', [
					$new('input', {type: 'checkbox'}),
					$if(h == host || sav.GM, $new('a', {Class: 'DESU_icn_expthr', href: '#"'}, {
						click: loadFavorThread
					})),
					$add('<a href="' + url + '" target="_blank">№' + tNum + '</a>'),
					$txt(' - ' + fav.txt),
					$add('<span class="DESU_favpcount">[<span>' + fav.cnt + '</span>]</span>')
				], {Class: pClass}),
				$new('div', {id: tNum, Class: 'thread', style: 'display:none'})
			], {Class: 'DESU_favdata', id: 'DESU_favdata_' + h + '|' + b + '|' + tNum})]);
		}
	}
	if(!$1(table)) table.insertRow(-1).appendChild($add('<b>' + Lng.noFavorites + '</b>'));
	list = $X('.//tr[@class="DESU_favdata"]', table);
	$append(table, [
		$New('tr', [
			$new('hr'),
			$btn(Lng.edit, function() { $disp($up($id('DESU_favoredit'))); }),
			$btn(Lng.info, function() {
				$each(list, function(el) {
					var c, arr = el.id.substr(13).split('|');
					if(host != arr[0]) return;
					c = $x('.//span[@class="DESU_favpcount"]/span', el);
					$attr(c, {Class: 'DESU_icn_wait', text: ''});
					AJAX(null, arr[1], arr[2], function(err) {
						var cnt = err || ajaxThrds[arr[2]].keys.length;
						$attr(c, {Class: '', text: cnt});
						if(!err) {
							Favor[arr[0]][arr[1]][arr[2]].cnt = cnt;
							setStored('DESU_Favorites', uneval(Favor));
						}
					});
				});
			}),
			$btn(Lng.clear, function() {
				$each(list, function(el) {
					var arr = el.id.substr(13).split('|');
					AJAX(getThrdUrl(arr[0], arr[1], arr[2]), null, null, function(err) {
						if(!err) return;
						removeFavorites(arr[0], arr[1], arr[2]);
						saveFavorites();
					});
				});
			}),
			$btn(Lng.remove, function() {
				$each(list, function(el) {
					var arr = el.id.substr(13).split('|');
					if($t('input', el).checked) removeFavorites(arr[0], arr[1], arr[2]);
				});
				saveFavorites();
			})
		]),
		$New('tr', [
			$new('textarea', {id: 'DESU_favoredit', rows: 9, cols: 70, value: uneval(Favor)}),
			$btn(Lng.save, function() { saveFavorites($id('DESU_favoredit').value); })
		], {style: 'display:none'})
	]);
}

function $alert(txt, id) {
	var el, nid = 'DESU_alert';
	if(id) { nid += '_' + id; el = $id(nid); }
	if(!el) {
		el = $add('<div class="' + pClass + '" id="' + nid + '" style="opacity:0">' + (
			id == 'wait' ? '<span class="DESU_icn_wait">&nbsp;</span>'
			: '<a href="#" style="display:inline-block; vertical-align:top; font-size:150%">× </a>'
		) + '<div style="display:inline-block; margin-top:4px"></div></div>');
		$event($1(el), {click: function(e) { $pD(e); $close($up(this)); }});
		$show($id('DESU_alertbox').appendChild(el));
	}
	$html($next($1(el)), txt.trim());
}

/*-----------------------------Dropdown select menus-------------------------*/

function removeSelMenu(e) {
	if(!$xb('ancestor-or-self::div[@id="DESU_select"]', e.relatedTarget)) $del($id('DESU_select'));
}

function addSelMenu(el, arr) {
	var x, y, pos;
	x = 'right:' + (doc.body.clientWidth - $offset(el).left - el.offsetWidth).toString();
	if(Cfg.attach == 1 && $xb('ancestor::div[@id="DESU_content" or @id="DESU_panel"]', el)) {
		pos = 'fixed';
		if(el.id == 'DESU_btn_refresh') y = 'bottom:25';
		else y = 'top:' + (el.getBoundingClientRect().top + el.offsetHeight).toString();
	} else {
		pos = 'absolute';
		y = 'top:' + ($offset(el).top + el.offsetHeight).toString();
	}
	doc.body.appendChild($add('<div class="' + pClass + '" id="DESU_select" style="position:' + pos
		+ '; width:auto; min-width:0; ' + x + 'px; ' + y + 'px; z-index:9999; padding:2px 5px;'
		+ ' border:1px solid grey"><a href="#">' + arr.join('</a><a href="#">') + '</a></div>', {
		mouseout: removeSelMenu
	}));
	return $X('.//div[@id="DESU_select"]/a');
}

function selectSpell(e) {
	$each(addSelMenu(e.target, ('#b/,#b/itt,#exp ,#exph ,#img ,#imgn ,#name ,#noimg,#notxt,#num ,'
		+ '#op,#outrep,#rep ,#sage,#skip ,#tmax ,#trip').split(',')), function(a) {
			$event(a, {click: function(e) {
				var exp = this.textContent;
				$pD(e);
				if(exp == '#b/') exp = '#' + brd + '/ ';
				if(exp == '#b/itt') {
					if(TNum) exp = '#' + brd + '/' + TNum + ' ';
					else return;
				}
				insertInto($id('DESU_spelledit'), exp);
			}});
		}
	);
}

function selectPostHider(post) {
	var a;
	if(Cfg.menuhd == 0 || Cfg.filthr == 0 && post.isOp) return;
	a = addSelMenu($1(post.Btns), Lng.selHiderMenu);
	$event(a.snapshotItem(0), {
		click: function(e) { $pD(e); applySpells(quotetxt); },
		mouseover: function() { quotetxt = txtSelection().trim(); }
	});
	$event(a.snapshotItem(1), {click: function(e) {
		$pD(e);
		applySpells(post.Img.snapshotLength == 0
			? '#noimg' : '#img =' + getImgWeight(post) + '@' + getImgSize(post).join('x'))
	}});
	$event(a.snapshotItem(2), {click: function(e) { $pD(e); hideBySameText(post); }});
}

function selectExpandThread(post) {
	$each(addSelMenu($x('a[3]', post.Btns), Lng.selExpandThrd), function(a) {
		$event(a, {click: function(e) { $pD(e); loadThread(post, parseInt(this.textContent)); }});
	});
}

function selectAjaxPages() {
	$each(addSelMenu($id('DESU_btn_refresh'), Lng.selAjaxPages), function(a, i) {
		$event(a, {click: function(e) { $pD(e); loadPages(i + 1); }});
	});
}

/*-------------------------------Changes in postform-------------------------*/

function refreshCapSrc(src, tNum) {
	if(kusaba || ch._5ch)
		src = src.replace(/\?[^?]+$|$/, (ch._410 ? '?board=' + brd + '&' : '?') + Math.random());
	else {
		if(tNum > 0) src = src.replace(/mainpage|res\d+/ig, 'res' + tNum);
		src = src.replace(/dummy=\d*/, 'dummy=' + rand10());
	}
	return src;
}

function refreshCapImg(tNum) {
	var src, e, img = pr.recap ? $id('recaptcha_image') || pr.cap : $x(pr.tr + '//img', pr.cap);
	if(!hanab && !pr.recap) {
		src = refreshCapSrc(img.getAttribute('src'), tNum);
		img.src = '';
		img.src = src;
	} else {
		e = doc.createEvent('MouseEvents');
		e.initEvent('click', true, true);
		img.dispatchEvent(e);
	}
}

function doSageBtn() {
	var c = Cfg.issage == 1;
	$id('DESU_sagebtn').innerHTML = '&nbsp;' + (
		c ? '<a class="DESU_icn_sage" href="#"></a><b style="color:red">SAGE</b>'
		: '<i>(no&nbsp;sage)</i>'
	);
	if(pr.mail.type == 'text') pr.mail.value = c ? 'sage' : ch.fch ? 'noko' : '';
	else pr.mail.checked = c;
}

function setUserName() {
	saveCfg('namval', $id('DESU_fixedname').value.replace(/\|/g, ''));
	pr.name.value = $id('DESU_fixedname_ch').checked ? Cfg.namval : '';
}

function setUserPassw() {
	var val, el = $id('DESU_fixedpass');
	if(el) saveCfg('pasval', el.value.replace(/\|/g, ''));
	val = Cfg.passw == 1 ? Cfg.pasval : rand10().substring(0, 8);
	el = $X('.//input[@type="password"]').snapshotItem(1);
	if(el) el.value = val;
	pr.passw.value = val;
}

function doChanges() {
	var el;
	if(TNum) {
		if(Cfg.rtitle == 1) {
			docTitle = '/' + brd + ' - ' + getTitle(pByNum[TNum]).substring(0, 70);
			doc.title = docTitle;
		} else docTitle = doc.title;
		$event(window, {
			blur: function() { isActiveTab = false; },
			focus: function() {
				isActiveTab = true;
				if(Cfg.updfav == 1 && favIcon) {
					clearInterval(favIconInt);
					$Del('.//link[@rel="shortcut icon"]', $t('head'));
					$t('head').appendChild($new('link', {href: favIcon, rel: 'shortcut icon'}));
				}
				if(Cfg.updthr == 1) setTimeout(function() { doc.title = docTitle; }, 0);
			}
		});
		initPostsUpdate();
		if(Cfg.updthr == 2 || Cfg.updthr == 3) $after($x('.//div[@class="thread"]'), [
			$add('<span id="DESU_getnewposts">[<a href="#">' + Lng.getNewPosts + '</a>]</span>', {
				click: function(e) { $pD(e); loadNewPosts(true); }
			})
		]);
	} else window.scrollTo(0, 0);
	if(abu) {
		$Del('.//*[starts-with(@id,"ABU_")]|.//small[starts-with(@id,"rfmap")]', dForm);
		el = $id('linkThreadUpdate');
		if(el) { $del(el.previousSibling); $del(el.nextSibling); $del(el); }
	} else $event(window, {load: function() {
		setTimeout(function() {
			if(ch.nul) $Del('.//div[@class="replieslist"]', dForm);
			else $Del('.//small[starts-with(@id,"rfmap")]|.//i[@class="abbrev"]', dForm);
		}, 0);
	}});
	if(ch.fch && !TNum) $each($X('.//table[@class="pages"]//form'), function(el) {
		$next(el).appendChild($attr(el, {style: 'margin-bottom:0'}));
		el.appendChild($prev(el));
	});
	qArea = $new('div', {id: 'DESU_qarea', Class: pClass, style: 'display:none'});
	pArea = $New('center', [
		$New('div', [
			$txt('['),
			$new('a', {text: Lng.expandForm, href: '#'}, {click: toggleMainReply}),
			$txt(']')
		], {id: 'DESU_togglereply', style: 'display:none'}),
		$New('div', [pr.form, oeForm], {id: 'DESU_pform'}),
		$new('hr')
	], {id: 'DESU_parea'});
	if(TNum && Cfg.pform == 2 || !TNum && Cfg.tform == 1) $disp(pArea);
	if(TNum && Cfg.pform == 1) $after(ch.fch ? $t('hr', dForm) : dForm, [pArea]);
	else $before(dForm, [pArea]);
	if(pr.on) doPostformChanges();
	else if(oeForm) AJAX(null, brd, Posts[0].Num, doPostformChanges);
}

function doPostformChanges() {
	var img, src, _img, sageBtn, m, load, el = pr.txta,
		resMove = function(e) {
			el.style.width = e.pageX - $offset(el).left + 'px';
			el.style.height = e.pageY - $offset(el).top + 'px';
		},
		resStop = function() {
			$revent(doc.body, {mousemove: resMove, mouseup: resStop});
			saveCfg('texw', parseInt(el.style.width));
			saveCfg('texh', parseInt(el.style.height));
		};
	if(!ch.fch && pr.subm.nextSibling) $delNx(pr.subm);
	addTextPanel();
	$after(el, [$new('div', {Class: 'DESU_txtresizer'}, {mousedown: function(e) {
		$pD(e); $event(doc.body, {mousemove: resMove, mouseup: resStop});
	}})]);
	el.style.cssText = 'width:' + Cfg.texw + 'px; height:' + Cfg.texh + 'px';
	$event(el, {keypress: function(e) {
		var code = e.charCode || e.keyCode;
		if((code == 33 || code == 34) && e.which == 0) { e.target.blur(); window.focus(); }
	}});
	$event(pr.subm, {click: function(e) {
		var txt = pr.txta.value;
		pr.txta.value =
			(Cfg.spells == 0 || !oSpells.outrep[0] ? txt : doReplace(oSpells.outrep, txt))
			+ (Cfg.sign == 1 && Cfg.sigval != '' ? '\n' + Cfg.sigval : '');
		if(Cfg.verify == 1) $alert(Lng.checking, 'wait');
		if(Cfg.addfav == 1 && pr.tNum)
			toggleFavorites(pByNum[pr.tNum], $x('a[@class="DESU_icn_favor"]', pByNum[pr.tNum].Btns));
		if(pr.tNum) Stat.reply = parseInt(Stat.reply) + 1;
		else Stat.op = parseInt(Stat.op) + 1;
		setStored('DESU_Stat_' + dm, uneval(Stat));
		if(ch.nul && pr.isQuick) {
			$disp(qArea);
			$after($id('DESU_togglereply'), [$id('DESU_pform')]);
		} 
	}});
	$each($X('.//input[@type="text"]', pr.form), function(el) { el.size = 35; });
	if(Cfg.nogoto == 1 && pr.gothr) $disp(pr.gothr);
	if(Cfg.nopass == 1 && pr.passw) $disp($x(pr.tr, pr.passw));
	if(Cfg.name == 1 && pr.name) setTimeout(function() { pr.name.value = Cfg.namval; }, 0);
	if(pr.passw) setTimeout(setUserPassw, 0);
	if(pr.recap) {
		$attr(pr.subm, {onclick: 'Recaptcha.focus_response_field = function() {}'});
		el = $id('recaptcha_image');
		if(el) $attr(el, {onclick: 'Recaptcha.reload()', style: 'width:300px; cursor:pointer'});
		el = $id('recaptcha_reload_btn');
		if(el) $disp($up(el));
	}
	if(pr.cap) {
		setTimeout(function() { if(abu) refreshCapImg(); $rattr(pr.cap, 'onclick'); }, 0);
		$rattr(pr.cap, 'onfocus');
		$rattr(pr.cap, 'onkeypress');
		$event($attr(pr.cap, {autocomplete: 'off'}), {keypress: function(e) {
			var code = e.charCode || e.keyCode,
				chr = String.fromCharCode(code).toLowerCase(),
				ru = 'йцукенгшщзхъфывапролджэячсмитьбюё',
				en = 'qwertyuiop[]asdfghjkl;\'zxcvbnm,.`',
				i = en.length;
			if(Cfg.forcap == 0 || e.which == 0) return;
			if(Cfg.forcap == 1) {
				if(code < 0x0410 || code > 0x04FF) return;
				while(i--) if(chr == ru[i]) chr = en[i];
			} else {
				if(code < 0x0021 || code > 0x007A) return;
				while(i--) if(chr == en[i]) chr = ru[i];
			}
			$pD(e);
			insertInto(e.target, chr);
		}});
		if(!hanab && !pr.recap) {
			if(kusaba) {
				img = $x('.//a|.//img', $x(pr.tr, pr.cap));
				src =
					ch._410 ? ('/faptcha.php?board=' + brd)
					: ch.hid ? ('/securimage/securimage_show.php?' + Math.random())
					: '/' + brd.substr(0, brd.indexOf('/') + 1) + 'captcha.php?' + Math.random();
			} else {
				img = $x(pr.tr + '//img', pr.cap);
				src = img ? img.src : '/' + brd + '/captcha.pl?key=mainpage&amp;dummy=' + rand10();
			}
			_img = $new('img', {
				alt: Lng.loading,
				title: Lng.refresh,
				style: 'display:block; border:none; cursor:pointer',
				src: refreshCapSrc(src, TNum || 0)}, {
				click: function() { refreshCapImg(TNum || 0); }
			});
			if(img) $up(img).replaceChild(_img, img);
			else { $delNx(pr.cap); $after(pr.cap, [_img]); }
		}
	}
	if(Cfg.sagebt == 1 && pr.mail) {
		sageBtn = $new('span', {id: 'DESU_sagebtn'}, {
			click: function(e) { e.stopPropagation(); $pD(e); toggleCfg('issage'); doSageBtn(); }
		});
		m = $x('ancestor::label', pr.mail) || pr.mail;
		if($next(m) || $prev(m)) { $disp(m); $after(m, [sageBtn]); }
		else { $disp($x(pr.tr, pr.mail)); $after(pr.name || pr.file, [sageBtn]); }
		setTimeout(doSageBtn, 0);
	}
	if(Cfg.verify == 1) {
		load = nav.Opera ? 'DOMFrameContentLoaded' : 'load';
		$after($id('DESU_content'), [
			$add('<iframe name="DESU_iframe" id="DESU_iframe" src="about:blank" />', {
				load: function() { setTimeout(iframeLoad, 500); }
			}
		)]);
		$rattr($attr(pr.form, {target: 'DESU_iframe'}), 'onsubmit');
	}
}

/*------------------------------Onsubmit reply check-------------------------*/

function iframeLoad() {
	var xp, err, tNum, txt = '', frm = $id('DESU_iframe');
	try { frm = frm.contentDocument; if(!frm || !frm.body || !frm.body.innerHTML) return; }
	catch(e) { $close($id('DESU_alert_wait')); $alert('Iframe error:\n' + e); return; }
	if(hanab && /error/.test(frm.location.pathname)) xp = './/td[@class="post-error"]';
	if(ch.krau && frm.location.pathname == '/post') xp = './/td[starts-with(@class,"message_text")]';
	if(abu && !frm.getElementById('delform')) xp = './/font[@size="5"]';
	if(xp || !$t('form', frm)) {
		if(kusaba) xp = './/h1|.//h2|.//div[contains(@style,"1.25em")]';
		if(ch.fch) xp = './/table//font/b';
		if(ch.gazo) xp = './/font[@size="5"]';
		if(xp) $each(frm.evaluate(xp, frm, null, 6, null), function(el) {
			txt += el.innerHTML + '\n';
		});
		else {
			xp = $t('h2', frm) || $t('h1', frm);
			if(xp) txt = xp.innerHTML.replace(/<br.*/i, '');
		}
		err = txt !== '' ? txt : Lng.error + '\n' + frm.body.innerHTML;
		if(/обновл|successful!|uploaded!/i.test(err)) err = undefined;
	}
	if(!err) {
		pr.txta.value = '';
		if(pr.file) pr.file = $x('.//input[@type="file"]',
			$html($x(pr.tr, pr.file), $x(pr.tr, pr.file).innerHTML));
		if(pr.tNum) {
			tNum = pr.tNum;
			showMainReply();
			if(!TNum) loadThread(pByNum[tNum], 5);
			else loadNewPosts(true);
			if(pr.cap) { pr.cap.value = ''; refreshCapImg(tNum); }
		} else window.location = !ch.fch
			? frm.location : $t('meta', frm).content.match(/http:\/\/[^"]+/)[0];
	} else {
		if(ch.nul && pr.isQuick) { $disp(qArea); qArea.appendChild($id('DESU_pform')); }
		$close($id('DESU_alert_wait'));
		$alert(err);
	}
	frm.location.replace('about:blank');
}

/*-----------------------------Quick Reply under post------------------------*/

function showQuickReply(post) {
	var tNum = getThread(post).id.match(/\d+/);
	pr.isQuick = true;
	pr.tNum = tNum;
	if(!qArea.hasChildNodes()) {
		qArea.appendChild($id('DESU_pform'));
		$disp($id('DESU_togglereply'));
		$disp(qArea);
		if(!TNum && !kusaba && !hanab) {
			$del($x('.//input[@id="thr_id" or @name="parent"]', pr.form));
			$before($1(pr.form), [$add(
				'<input type="hidden" id="thr_id" value="' + tNum + '" name="'
				+ (ch.fch || ch.gazo ? 'resto' : tinyb ? 'thread' : 'parent') + '">'
			)]);
		}
	} else if($next(post) == qArea) { $disp(qArea); return; }
	$after(post, [qArea]);
	if(!TNum && Cfg.tform == 1) pArea.style.display = 'none';
	qArea.style.display = 'block';
	pr.form.style.width = '100%';
	if(pr.cap && !pr.recap && !kusaba) refreshCapImg(tNum);
	if(!TNum) toggleQuickReply(tNum);
	insertInto(pr.txta, '>>' + post.Num + quotetxt.replace(/(^|\n)(.)/gm, '\n>$2') + '\n');
}

function showMainReply() {
	var el = $id('DESU_togglereply');
	if(!pr.isQuick) return;
	pr.isQuick = false;
	if(!TNum) { toggleQuickReply(); $del($x('.//input[@id="thr_id"]', pr.form)); }
	$disp(el);
	qArea.style.display = 'none';
	$after(el, [$id('DESU_pform')]);
}

function toggleQuickReply(tNum) {
	$x('.//input[@id="thr_id" or @name="thread_id" or @name="replythread"]', pr.form).value = tNum || 0;
	if(ch.pony) $x('.//input[@name="quickreply"]', pr.form).value = tNum || '';
}

function toggleMainReply(e) {
	$pD(e);
	if(pr.isQuick) { pArea.style.display = ''; showMainReply(); }
	else $disp(pArea);
	$focus(pArea);
}

function insertRefLink(e) {
	var pNum = getPost(e.target).id.match(/\d+/);
	if(/Reply|Ответ/.test(e.target.textContent)) return;
	e.stopPropagation(); $pD(e);
	if(!TNum && Cfg.tform == 1 && !pr.isQuick) pArea.style.display = '';
	if(TNum && Cfg.pform == 2 && !pr.isQuick) showQuickReply(pByNum[pNum]);
	else insertInto(pr.txta, '>>' + pNum);
}

/*----------------------------Text formatting buttons------------------------*/

function tfBtn(id, title, wktag, bbtag, val) {
	var x = pr.txta, btn = $new('span', {id: id, title: title});
	if(Cfg.txtbtn == 2)
		btn.innerHTML = '<a href="#">' + val + '</a>' + (val != '&gt;' ? ' / ' : '');
	if(Cfg.txtbtn == 3)
		btn.innerHTML = '<input type="button" value="' + val + '" style="font-weight:bold" />';
	if(val != '&gt;') $event(btn, {click: function(e) {
		var tag1, tag2, j, len,
			start = x.selectionStart, end = x.selectionEnd, scrtop = x.scrollTop,
			text = x.value.substring(start, end).split('\n'),
			i = text.length;
		$pD(e);
		if(kusaba || abu || ch.krau || ch.fch && wktag == '%%') {
			tag1 = '[' + bbtag + ']';
			tag2 = '[/' + bbtag + ']';
		} else tag1 = tag2 = wktag;
		while(i--) {
			if(tag1 == '') { j = text[i].trim().length; while(j--) tag2 += '^H'; }
			len = end + tag1.length + tag2.length;
			if(text[i].match(/^\s+/)) tag1 = text[i].match(/^\s+/)[0] + tag1;
			if(text[i].match(/\s+$/)) tag2 += text[i].match(/\s+$/)[0];
			text[i] = tag1 + text[i].trim() + tag2;
		}
		x.value = x.value.substr(0, start) + text.join('\n') + x.value.substr(end);
		x.setSelectionRange(len, len);
		x.focus();
		x.scrollTop = scrtop;
	}});
	else $event(btn, {
		mouseover: function() { quotetxt = txtSelection(); },
		click: function(e) {
			var start = x.selectionStart, end = x.selectionEnd;
			$pD(e);
			insertInto(x, '> ' + (start == end
				? quotetxt : x.value.substring(start, end)).replace(/\n/gm, '\n> '));
		}
	});
	return btn;
}

function addTextPanel() {
	$del($id('DESU_textpanel'));
	if(Cfg.txtbtn == 0 || !pr.txta) return;
	$after(pr.subm, [$New('span', [
		$txt(unescape('%u00A0')),
		$if(Cfg.txtbtn == 2, $txt('[ ')),
		tfBtn('DESU_btn_bold', Lng.bold, '**', 'b', 'B'),
		tfBtn('DESU_btn_italic', Lng.italic, '*', 'i', 'i'),
		tfBtn('DESU_btn_under', Lng.underlined, '__', 'u', 'U'),
		tfBtn('DESU_btn_strike', Lng.strike, ch._410 ? '^^' : '', 's', 'S'),
		tfBtn('DESU_btn_spoiler', Lng.spoiler, '%%', 'spoiler', '%'),
		tfBtn('DESU_btn_code', Lng.code, '`', ch.krau ? 'aa' : 'code', 'C'),
		tfBtn('DESU_btn_quote', Lng.quote, '', '', '&gt;'),
		$if(Cfg.txtbtn == 2, $txt(' ]'))
	], {id: 'DESU_textpanel'})]);
}

/*--------------------------------Time correction-----------------------------*/

function toggleTimeSettings() {
	var el = $id('DESU_ctime');
	if(el.checked && (!/^[+-]\d{1,2}$/.test(Cfg.ctmofs) || !parseTimePattern())) {
		$alert(Lng.cTimeError);
		saveCfg('ctime', 0);
		el.checked = false;
	}
}

function parseTimePattern() {
	if(/[^\?\-sihdmny]|mm/.test(Cfg.ctmpat)) return false;
	timeRegex = Cfg.ctmpat.replace(/\-/g, '[^<]').replace(
		/([sihdny]+)/g, '($1)').replace(/[sihdny]/g, '\\d').replace(/\m/g, '([a-zA-Zа-яА-Я]+)');
	timePattern = Cfg.ctmpat.replace(/[\?\-]+/g, '').replace(/([a-z])\1+/g, '$1');
	return true;
}

function fixTime(txt) {
	var a, t, second, minute, hour, day, month, year, dtime;
	return txt.replace(new RegExp(timeRegex, 'g'), function(str, a1, a2, a3, a4, a5, a6) {
		for(var i = 0, arr = [a1, a2, a3, a4, a5, a6]; i < 6; i++) {
			a = arr[i];
			t = timePattern[i];
			t == 's' ? second = a
			: t == 'i' ? minute = a
			: t == 'h' ? hour = a
			: t == 'd' ? day = a
			: t == 'n' ? month = a - 1
			: t == 'y' ? year = a
			: t == 'm' && (month = 
				/янв|jan/i.test(a) ? 0
				: /фев|feb/i.test(a) ? 1
				: /мар|mar/i.test(a) ? 2
				: /апр|apr/i.test(a) ? 3
				: /май|may/i.test(a) ? 4
				: /июн|jun/i.test(a) ? 5
				: /июл|jul/i.test(a) ? 6
				: /авг|aug/i.test(a) ? 7
				: /сен|sep/i.test(a) ? 8
				: /окт|oct/i.test(a) ? 9
				: /ноя|nov/i.test(a) ? 10
				: /дек|dec/i.test(a) && 11
			);
		}
		dtime = new Date(year.length == 2 ? '20' + year : year, month, day, hour, minute, second);
		dtime.setHours(dtime.getHours() + parseInt(Cfg.ctmofs));
		return dtime.toString().replace(/GMT.*$/, '');
	});
}

/*---------------------------Append CSS for elements-------------------------*/

function scriptCSS() {
	var x = [],
		gif = function(nm, src) { x.push(nm + ' {background:url(data:image/gif;base64,' + src + ') no-repeat center !important}') },
		pre = 'background:url( data:image/gif;base64,R0lGODlhAQAZAMQAABkqTSRDeRsxWBcoRh48axw4ZChOixs0Xi1WlihMhRkuUQwWJiBBcSpTkS9bmxAfNSdKgDJfoQ0YKRElQQ4bLRAjOgsWIg4fMQsVHgAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAAQAZAEAFFWDETJghUAhUAM/iNElAHMpQXZIVAgA7); ';
	x.push(
		'#DESU_alertbox {position:fixed; right:0; top:0; z-index:9999; font:14px arial; cursor:default}\
		#DESU_alertbox > div {float:right; clear:both; width:auto; min-width:0pt; padding:10px; margin:1px; border:1px solid grey; white-space:pre-wrap}\
		#DESU_cfgedit, #DESU_favoredit, #DESU_hthredit, #DESU_spelledit {display:block; margin:2px 0; font:12px courier new}\
		#DESU_content {text-align:left}\
		#DESU_iframe {display:none; width:0px; height:0px; border:none}\
		#DESU_panel {height:25px; z-index:9999; ' + pre + cssFix + 'border-radius:15px 0 0 0; cursor:default}\
		#DESU_panel a {display:inline-block; padding:0 25px 25px 0; margin:0 1px 0 1px; border:none; ' + cssFix + 'border-radius:5px}\
		#DESU_panel_btns {display:inline-block; padding:0 3px; margin-left:4px; border-left:1px solid #79c}\
		#DESU_panel_btns a:hover {padding:0 21px 21px 0 !important; border:2px solid #9be}\
		#DESU_panel_info {display:inline-block; height:25px; vertical-align:top; padding:2px 4px 0 6px; border-left:1px solid #79c; color:#fff; font:18px serif}\
		#DESU_sett_body {float:left; width:auto; min-width:0; padding:0; margin:5px 20px; overflow:hidden}\
		#DESU_sett_head {padding:3px; ' + pre + cssFix + 'border-radius:10px 10px 0 0; color:#fff; text-align:center; font:bold 14px arial; cursor:pointer}\
		#DESU_sett_main {padding:7px; margin:0; border:1px solid grey; font:13px sans-serif}\
		#DESU_sett_main input[value=">"] {width:20px}\
		#DESU_select {padding:0 !important; margin:0 !important}\
		#DESU_select a {display:block; padding:3px 10px; color:inherit; font:13px arial; white-space:nowrap}\
		#DESU_select a:hover {background-color:#1b345e; color: #fff}\
		#DESU_spellpanel {margin:0 0 0 40px}\
		#DESU_spellpanel a {padding:0 10px; text-align:center}\
		#DESU_sagebtn {cursor:pointer}\
		#DESU_textpanel {display:' + (Cfg.txtpos == 0 ? 'inline' : 'block') + '; font-weight:bold; cursor:pointer}\
		#DESU_qarea {float:none; clear:left; width:100%; padding:3px 0 3px 3px; margin:2px 0}\
		.DESU_favdata .thread {padding-left:15px; border:1px solid grey}\
		.DESU_favdata a, .DESU_hthrdata a {text-decoration:none}\
		.DESU_favhead a {color:inherit; font-weight:bold}\
		.DESU_favpcount {float:right; margin:0 5px 0 15px; font:bold 16px serif}\
		.DESU_favpcount span {color:#4f7942}\
		.DESU_txtresizer {display:inline-block !important; float:none !important; padding:5px; margin:0 0 -' + (nav.Opera ? 8 : nav.Chrome ? 2 : 5) + 'px -11px; border-bottom:2px solid #555; border-right:2px solid #444; cursor:se-resize}\
		.DESU_icn_wait {padding:0 16px 16px 0; background:url( data:image/gif;base64,R0lGODlhEAAQALMMAKqooJGOhp2bk7e1rZ2bkre1rJCPhqqon8PBudDOxXd1bISCef///wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAMACwAAAAAEAAQAAAET5DJyYyhmAZ7sxQEs1nMsmACGJKmSaVEOLXnK1PuBADepCiMg/DQ+/2GRI8RKOxJfpTCIJNIYArS6aRajWYZCASDa41Ow+Fx2YMWOyfpTAQAIfkEBQAADAAsAAAAABAAEAAABE6QyckEoZgKe7MEQMUxhoEd6FFdQWlOqTq15SlT9VQM3rQsjMKO5/n9hANixgjc9SQ/CgKRUSgw0ynFapVmGYkEg3v1gsPibg8tfk7CnggAIfkEBQAADAAsAAAAABAAEAAABE2QycnOoZjaA/IsRWV1goCBoMiUJTW8A0XMBPZmM4Ug3hQEjN2uZygahDyP0RBMEpmTRCKzWGCkUkq1SsFOFQrG1tr9gsPc3jnco4A9EQAh+QQFAAAMACwAAAAAEAAQAAAETpDJyUqhmFqbJ0LMIA7McWDfF5LmAVApOLUvLFMmlSTdJAiM3a73+wl5HYKSEET2lBSFIhMIYKRSimFriGIZiwWD2/WCw+Jt7xxeU9qZCAAh+QQFAAAMACwAAAAAEAAQAAAETZDJyRCimFqbZ0rVxgwF9n3hSJbeSQ2rCWIkpSjddBzMfee7nQ/XCfJ+OQYAQFksMgQBxumkEKLSCfVpMDCugqyW2w18xZmuwZycdDsRACH5BAUAAAwALAAAAAAQABAAAARNkMnJUqKYWpunUtXGIAj2feFIlt5JrWybkdSydNNQMLaND7pC79YBFnY+HENHMRgyhwPGaQhQotGm00oQMLBSLYPQ9QIASrLAq5x0OxEAIfkEBQAADAAsAAAAABAAEAAABE2QycmUopham+da1cYkCfZ94UiW3kmtbJuRlGF0E4Iwto3rut6tA9wFAjiJjkIgZAYDTLNJgUIpgqyAcTgwCuACJssAdL3gpLmbpLAzEQA7) no-repeat}\
		.DESU_mp3, .DESU_ytube {margin:5px 20px}\
		.DESU_omitted {color:grey; font-style:italic}\
		.DESU_postnote {color:inherit; font-size:12px; font-style:italic}\
		.DESU_preimg, .DESU_fullimg {display:block; margin:' + (ch.krau ? 0 : '2px 10px') + '; border:none; outline:none; cursor:pointer}\
		.DESU_refhid {text-decoration:line-through !important}\
		.DESU_refmap {margin:10px 4px 4px 4px; font-size:70%; font-style:italic}\
		.DESU_refmap:before {content:"' + Lng.replies + '"}\
		.DESU_refmap a {text-decoration:none}\
		.DESU_ytlink:before {content:""; padding:0 16px 0 0; margin:0 4px; background:url( data:image/gif;base64,R0lGODlhEAAQAJEAAP8pDf///wAAAP///yH5BAEAAAMALAAAAAAQABAAQAI4XHShywML4pN0oYQynIH7qAjiMWrMiW7d+ihtR8Vya6bnpdVWWI7bHIPBJEMZ6/giJiEQBzA2KAAAOw== ) no-repeat}\
		.DESU_ytube > img {cursor:pointer}\
		.reply {width:auto}\
		a[href="#"] {text-decoration:none !important; outline:none}\
		a[class^="DESU_icn"] {margin:0 4px -1px 0 !important}\
		span[class^="DESU_postpanel"] {margin-left:4px; font-weight:bold}\
		td[id^="reply"] a + .DESU_mp3, td[id^="reply"] a + .DESU_ytube {display:inline}'
	);
	pre = 'R0lGODlhGQAZAIAAAPDw8P///yH5BAEAAAEALAAAAAAZABkAQA';
	gif('#DESU_btn_logo', pre + 'I5jI+pywEPWoIIRomz3tN6K30ixZXM+HCgtjpk1rbmTNc0erHvLOt4vvj1KqnD8FQ0HIPCpbIJtB0KADs=');
	gif('#DESU_btn_settings', pre + 'JAjI+pa+API0Mv1Ymz3hYuiQHHFYjcOZmlM3Jkw4aeAn7R/aL6zuu5VpH8aMJaKtZR2ZBEZnMJLM5kIqnP2csUAAA7');
	gif('#DESU_btn_hidden', pre + 'I5jI+pa+CeHmRHgmCp3rxvO3WhMnomUqIXl2UmuLJSNJ/2jed4Tad96JLBbsEXLPbhFRc8lU8HTRQAADs=');
	gif('#DESU_btn_favor', pre + 'IzjI+py+AMjZs02ovzobzb1wDaeIkkwp3dpLEoeMbynJmzG6fYysNh3+IFWbqPb3OkKRUFADs=');
	gif('#DESU_btn_refresh', pre + 'JAjI+pe+AfHmRGLkuz3rzN+1HS2JWbhWlpVIXJ+roxSpr2jedOBIu0rKjxhEFgawcCqJBFZlPJIA6d0ZH01MtRCgA7');
	gif('#DESU_btn_goback', pre + 'IrjI+pmwAMm4u02gud3lzjD4biJgbd6VVPybbua61lGqIoY98ZPcvwD4QUAAA7');
	gif('#DESU_btn_gonext', pre + 'IrjI+pywjQonuy2iuf3lzjD4Zis0Xd6YnQyLbua61tSqJnbXcqHVLwD0QUAAA7');
	gif('#DESU_btn_goup', pre + 'IsjI+pm+DvmDRw2ouzrbq9DmKcBpVfN4ZpyLYuCbgmaK7iydpw1OqZf+O9LgUAOw==');
	gif('#DESU_btn_godown', pre + 'ItjI+pu+DA4ps02osznrq9DnZceIxkYILUd7bue6WhrLInLdokHq96tnI5YJoCADs=');
	gif('#DESU_btn_newthr', pre + 'IyjI+pG+APQYMsWsuy3rzeLy2g05XcGJqqgmJiS63yTHtgLaPTY8Np4uO9gj0YbqM7bgoAOw==');
	gif('#DESU_btn_expimg', pre + 'I9jI+pGwDn4GPL2Wep3rxXFEFel42mBE6kcYXqFqYnVc72jTPtS/KNr5OJOJMdq4diAXWvS065NNVwseehAAA7');
	gif('#DESU_btn_maskimg', pre + 'JQjI+pGwD3TGxtJgezrKz7DzLYRlKj4qTqmoYuysbtgk02ZCG1Rkk53gvafq+i8QiSxTozIY7IcZJOl9PNBx1de1Sdldeslq7dJ9gsUq6QnwIAOw==');
	pre = 'Dw8P///wAAACH5BAEAAAIALAAAAAAZABkAQAJElI+pe2EBoxOTNYmr3bz7OwHiCDzQh6bq06QSCUhcZMCmNrfrzvf+XsF1MpjhCSainBg0AbKkFCJko6g0MSGyftwuowAAOw==';
	gif('#DESU_btn_updon','R0lGODlhGQAZAJEAADL/Mv' + pre);
	gif('#DESU_btn_updoff','R0lGODlhGQAZAJEAAP8yMv' + pre);
	gif('#DESU_btn_updwarn','R0lGODlhGQAZAJEAAP/0Qf' + pre);
	if(TNum) x.push(
		'form div.thread {counter-reset:i 1}\
		form div.thread .DESU_postpanel:after {counter-increment:i 1; content:counter(i, decimal); vertical-align:1px; color:#4f7942; font:italic bold 13px serif; cursor:default}\
		form div.thread .DESU_postpanel_del:after {content:"' + Lng.deleted + '"; color:#727579; font:italic bold 13px serif; cursor:default}'
	);
	x.push('a[class^="DESU_icn"] {display:inline-block; padding:0 14px 14px 0}');
	pre = 'R0lGODlhDgAOAKIAAPDw8KCgoICAgEtLS////wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA4AQAM';
	gif('.DESU_icn_hide', pre + '8SLLcS2MNQGsUMYi6uB5BKI5hFgojel5YBbDDNcmvpJLkcgLq1jcuSgPmgkUmlJgFAyqNmoEBJEatxggJADs=');
	gif('.DESU_icn_unhide', pre + '5SLLcS2ONCcCMIoYdRBVcN4Qkp4ULmWVV20ZTM1SYBJbqvXmA3jk8IMzlgtVYFtkoNCENIJdolJAAADs=');
	gif('.DESU_icn_rep', pre + '4SLLcS2MNQGsUMQRRwdLbAI5kpn1kKHUWdk3AcDFmOqKcJ5AOq0srX0QWpBAlIo3MNoDInlAZIQEAOw==');
	gif('.DESU_icn_expthr', pre + '7SLLcS6MNACKLIQjKgcjCkI2DOAbYuHlnKFHWUl5dnKpfm2vd7iyUXywEk1gmnYrMlEEyUZCSdFoiJAAAOw==');
	gif('.DESU_icn_favor', pre + '5SLLcS2MNQGsUl1XgRvhg+EWhQAllNG0WplLXqqIlDS7lWZvsJkm92Au2Aqg8gQFyhBxAlNCokpAAADs=');
	gif('.DESU_icn_favset', 'R0lGODlhDgAOAKIAAP/hAKCgoICAgEtLS////wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA4AQAM5SLLcS2MNQGsUl1XgRvhg+EWhQAllNG0WplLXqqIlDS7lWZvsJkm92Au2Aqg8gQFyhBxAlNCokpAAADs=');
	gif('.DESU_icn_sage','R0lGODlhDgAOAJEAAPDw8EtLS////wAAACH5BAEAAAIALAAAAAAOAA4AQAIZVI55duDvFIKy2vluoJfrD4Yi5lWRwmhCAQA7');
	if(Cfg.txtbtn == 1) {
		x.push('#DESU_textpanel span {padding:4px 27px 4px 0}');
		pre = 'R0lGODlhFwAWAJEAAPDw8GRkZAAAAP///yH5BAEAAAMALAAAAAAXABYAQAJ';
		gif('#DESU_btn_bold', pre + 'T3IKpq4YAoZgR0KqqnfzipIUikFWc6ZHBwbQtG4zyonW2Vkb2iYOo8Ps8ZLOV69gYEkU5yQ7YUzqhzmgsOLXWnlRIc9PleX06rnbJ/KITDqTLUAAAOw==');
		gif('#DESU_btn_italic', pre + 'K3IKpq4YAYxRCSmUhzTfx3z3c9iEHg6JnAJYYSFpvRlXcLNUg3srBmgr+RL0MzxILsYpGzyepfEIjR43t5kResUQmtdpKOIQpQwEAOw==');
		gif('#DESU_btn_under', pre + 'V3IKpq4YAoRARzAoV3hzoDnoJNlGSWSEHw7JrEHILiVp1NlZXtKe5XiptPrFh4NVKHh9FI5NX60WIJ6ATZoVeaVnf8xSU4r7NMRYcFk6pzYRD2TIUAAA7');
		gif('#DESU_btn_strike', pre + 'S3IKpq4YAoRBR0qqqnVeD7IUaKHIecjCqmgbiu3jcfCbAjOfTZ0fmVnu8YIHW6lgUDkOkCo7Z8+2AmCiVqHTSgi6pZlrN3nJQ8TISO4cdyJWhAAA7');
		gif('#DESU_btn_spoiler', 'R0lGODlhFwAWAJEAAPDw8GRkZP///wAAACH5BAEAAAIALAAAAAAXABYAQAJBlIKpq4YAmHwxwYtzVrprXk0LhBziGZiBx44hur4kTIGsZ99fSk+mjrMAd7XerEg7xnpLIVM5JMaiFxc14WBiBQUAOw==');
		gif('#DESU_btn_code', pre + 'O3IKpq4YAoZgR0KpqnFxokH2iFm7eGCEHw7JrgI6L2F1YotloKek6iIvJAq+WkfgQinjKVLBS45CePSXzt6RaTjHmNjpNNm9aq6p4XBgKADs=');
		gif('#DESU_btn_quote', pre + 'L3IKpq4YAYxRUSKguvRzkDkZfWFlicDCqmgYhuGjVO74zlnQlnL98uwqiHr5ODbDxHSE7Y490wxF90eUkepoysRxrMVaUJBzClaEAADs=');
	}
	x.push(
		Cfg.attach == 0 ? '#DESU_content {width:100%}\
			#DESU_content > table {margin:5px 20px; font-size:16px}\
			#DESU_panel {float:right}\
			#DESU_btn_godown, #DESU_btn_goup {display:none}'
		: '#DESU_content {position:fixed; right:0; bottom:25px; z-index:9999; max-height:95%; overflow:auto}\
			#DESU_content > table {padding:5px 10px; border:1px solid grey; font-size:16px}\
			#DESU_panel {position:fixed; right:0; bottom:0}'
	);
	if(Cfg.delhd == 2) x.push('div[id^=DESU_hiddenthr_], div[id^=DESU_hiddenthr_] + div + br, div[id^=DESU_hiddenthr_] + div + br + hr {display:none}');
	if(Cfg.navmrk == 1) x.push('.viewed, .viewed .reply {color:#888 !important}');
	if(Cfg.icount == 0) x.push('#DESU_panel_info {display:none}');
	if(Cfg.showmp == 0) x.push('#DESU_panel_btns, #DESU_panel_info {display:none}');
	if(Cfg.noname == 1) x.push('.commentpostername, .postername, .postertrip {display:none}');
	if(Cfg.ospoil == 1) x.push('.spoiler {background:#888 !important; color:#CCC !important}');
	if(Cfg.noscrl == 1) x.push('blockquote {max-height:100% !important; overflow:visible !important}');
	if(Cfg.norule == 1) x.push((ch.gazo ? '.chui' : '.rules, #rules, #rules_row') + ' {display:none}');
	if(Cfg.mask == 1) x.push(
		'.DESU_preimg, .DESU_ytube, img[src*="spoiler"], img[src*="thumb"] {opacity:0.07 !important}\
		.DESU_preimg:hover, .DESU_ytube:hover, img[src*="spoiler"]:hover, img[src*="thumb"]:hover {opacity:1 !important}'
	);
	if(kusaba) x.push(
		'.extrabtns, .ui-resizable-handle, div[id*=oppost] > a[onclick]:not([target]) {display:none !important}\
		.ui-wrapper {display:inline-block; width:auto !important; height:auto !important; padding:0 !important}'
	);
	if(hanab) x.push('#hideinfotd, .reply_ {display:none}');
	if(abu) x.push('.postbtn_exp, .postbtn_hide, .postbtn_rep {display:none}');
	if(tinyb) x.push('form, form table {margin:0}');
	if(ch.nul) {
		gif('#DESU_btn_catalog','R0lGODlhGQAZAIAAAPDw8P///yH5BAEAAAEALAAAAAAZABkAQAI2jI+pa+DhAHyRNYpltbz7j1Rixo0aCaaJOZ2SxbIwKTMxqub6zuu32wP9WsHPcFMs0XDJ5qEAADs=');
		x.push(
			'#newposts_get, #postform nobr, .thread span[style="float: right;"] {display:none}\
			.voiceplay {float:none}'
		);
	}
	if(ch._7ch) x.push('.reply {background-color:' + getStyle($t('body'), 'background-color') + '}');
	if(ch.gazo) x.push(
		'#DESU_content, #DESU_sett_main {font-family:arial}\
		.ftbl {width:auto; margin:0}\
		.reply {background: #f0e0d6}'
	);
	if(ch.krau) x.push('div[id^="Wz"] {z-index:10000 !important;}\
		div[id^="DESU_hiddenthr_"] {margin-bottom:' + (!TNum ? '7' : '2') + 'px;}');
	if(!$id('DESU_css')) {
		$t('head').appendChild($new('style', {id: 'DESU_css', type: 'text/css', text: x.join(' ')}));
		if(nav.Chrome) $disp(dForm);
	} else $id('DESU_css').textContent = x.join(' ');
}

/*=============================================================================
							FOR POSTS AND THREADS
=============================================================================*/

function forAll(fn) {
	for(var post, i = 0; post = Posts[i++];) fn(post);
}

function getThread(el) {
	return $x('ancestor::div[@class="thread"]', el);
}

function getPost(el) {
	return $x('ancestor::*[starts-with(@id,"post-") or starts-with(@id,"oppost-")'
		+ ' or starts-with(@id,"DESU_preview_")]', el);
}

function getPstCount(thrd) {
	var om = $x(
			hanab ? './/div[@class="abbrev"]'
			: ch.krau ? './/span[@class="omittedinfo"]'
			: ch.gazo ? './/font[@color="#707070"]'
			: './/span[@class="omittedposts"]|.//div[@class="DESU_omitted"]'
		, thrd);
	return $X('.//table[starts-with(@id,"post-")]'
		+ '|.//div[starts-with(@id,"post-")]', thrd).snapshotLength + 1
		+ (om && (om = om.textContent) ? parseInt(om.match(/\d+/)[0]) : 0);
}

function getTitle(post) {
	var t = $x('.//span[@class="filetitle" or @class="replytitle" or @class="postsubject"'
		+ ' or @class="subject"]', post);
	return (t && t.textContent.trim() || post.Text).replace(/\s+/g, ' ')
}

function getImages(post) {
	return $X('.//img[@class="thumb" or contains(@src,"thumb") or contains(@src,"/spoiler")]', post);
}

function getImgInfo(post) {
	return $x('.//em|.//span[@class="filesize"]|.//node()[@class="fileinfo"]', post);
}

function getImgWeight(post) {
	var inf = getImgInfo(post).textContent.match(/\d+[\.\d\s|m|k|к]*[b|б]/i)[0],
		w = parseFloat(inf.match(/[\d|\.]+/));
	if(/MB/.test(inf)) w = w*1e3;
	if(/\d[\s]*B/.test(inf)) w = (w/1e3).toFixed(2);
	return w;
}

function getImgSize(post) {
	var el = getImgInfo(post), m = el ? el.textContent.match(/\d+[x×]\d+/) : false;
	return m ? m[0].split(/[x×]/) : [null, null];
}

function isSage(post) {
	var a;
	return !pr.mail ? false
		: hanab ? $xb('.//img[@alt="Сажа"]', post)
		: ch.krau ? $xb('.//span[@class="sage"]', post)
		: ch._410 ? $xb('.//span[@class="filetitle" and contains(text(),"'
			+ unescape('%u21E9') + '")]', post)
		: (a = $x('.//a[starts-with(@href,"mailto:") or @href="sage"]', post))
			&& /sage/i.test(a.href);
}

/*-------------------------------Post buttons--------------------------------*/

function addPostButtons(post) {
	var el, tNum, ref = $x(xPostRef, post);
	post.Btns = (!post.isOp ? pPanel : opPanel).cloneNode(true);
	el = post.Btns.firstChild;
	$event(el, {
		click: function(e) { $pD(e); togglePostVisib(post); },
		mouseover: function() { selectPostHider(post); },
		mouseout: removeSelMenu
	});
	if(pr.on || oeForm) {
		el = el.nextSibling;
		$event(el, {
			click: function(e) { $pD(e); showQuickReply(post); },
			mouseover: function() { quotetxt = txtSelection(); }
		});
	}
	if(post.isOp){
		if(!TNum) {
			el = el.nextSibling;
			$event(el, {
				click: function(e) { $pD(e); loadThread(post, 1); },
				mouseover: function() { selectExpandThread(post); },
				mouseout: removeSelMenu
			});
		}
		el = el.nextSibling;
		$event(el, {click: function(e) { $pD(e); toggleFavorites(post, this); }});
		tNum = parseInt(post.Num);
		if(Favor[host] && Favor[host][brd] && Favor[host][brd][tNum]) {
			el.className = 'DESU_icn_favset';
			Favor[host][brd][tNum].cnt = getPstCount(getThread(post));
			setStored('DESU_Favorites', uneval(Favor));
		}
	}
	if(isSage(post))
		post.Btns.appendChild($new('a', {Class: 'DESU_icn_sage', title: 'SAGE', href: '#'}, {
			click: function(e) { $pD(e); applySpells('#sage'); }
		}));
	$after(ref, [post.Btns]);
	if(pr.on && Cfg.insnum == 1) {
		if(ch.nul || ch.futr) $each($X('.//a', ref), function(el) { $rattr(el, 'onclick'); });
		$event(ref, {click: insertRefLink});
	}
	if(Cfg.viewhd == 1) $event(ref, {
		mouseover: function() { if(post.Vis == 0) togglePost(post, 1); },
		mouseout: function() { if(post.Vis == 0) togglePost(post, 0); }
	});
}

/*----------------------------HTML links players-----------------------------*/

function getTubeVideoLinks(id, fn) {
	id = 'http://www.youtube.com/watch?v=' + id;
	GM_xmlhttpRequest({method: 'GET', url: id, onload: function(xhr) {
		var i, group, len, elem, result1, result2, src,
			sep1 = '%2C', sep2 = '%26', sep3 = '%3D', url = [],
			formats = xhr.responseText.match(/\"url_encoded_fmt_stream_map\":\s*\"([^\"]+)\"/);
		if(!formats) { fn(false); return; }
		formats = formats[1];
		if(formats.indexOf(',') > -1) { 
			sep1 = ',';
			sep2 = formats.indexOf('&') > -1 ? '&' : '\\u0026';
			sep3 = '=';
		}
		for(i = 0, group = formats.split(sep1), len = group.length; i < len; i++) {
			elem = group[i].split(sep2);
			if(elem.length < 5) continue;
			result1 = elem[0].split(sep3);
			if(result1.length < 2) continue;
			src = unescape(unescape(result1[1])).replace(/\\\//g, '/').replace(/\\u0026/g, '&');
			result2 = elem[4].split(sep3);
			if(result2.length < 2) continue;
			if(src.toLowerCase().indexOf('http') == 0) url[result2[1]] = src;
		}
		fn(url);
	}});
}

function addTubeEmbed(el, id, time) {
	var wh = ' width="' + Cfg.ywidth + '" height="' + Cfg.yheigh + '" />';
	el.innerHTML =
		Cfg.yptype == 1 ? '<iframe type="text/html" src="http://www.youtube.com/embed/' + id 
			+ (Cfg.yhdvid == 1 ? '?hd=1&' : '?') + 'start=' + time + '&html5=1" frameborder="0"' + wh
		: '<embed type="application/x-shockwave-flash" src="http://www.youtube.com/v/' + id
			+ (Cfg.yhdvid == 1 ? '?hd=1&' : '?') + 'start=' + time + '" wmode="transparent"' + wh;
}

function addTubePlayer(el, m) {
	var id = m[1], time = (m[2] ? m[2] * 3600 : 0) + (m[3] ? m[3] * 60 : 0) + (m[4] ? m[4] : 0);
	if(Cfg.yptype != 2) addTubeEmbed(el, id, time);
	else getTubeVideoLinks(id, function(url) {
		var src = url ? (Cfg.yhdvid == 0 ? url[43] : url[45] || url[44] || url[43]) : false;
		if(!src) addTubeEmbed(el, id, time);
		else {
			el.innerHTML = '<video poster="http://i.ytimg.com/vi/' + id + '/0.jpg" '
				+ 'controls="controls" preload="none" src="' + src + '&' + Math.random()
				+ '" width="' + Cfg.ywidth + '" height="' + Cfg.yheigh + '" />';
			if(time != 0) $event($x('.//video', el), {
				'loadedmetadata': function() { this.currentTime = time; }
			});
		}
	});
}

function addTubePreview(el, m) {
	el.innerHTML = '<a href="http://www.youtube.com/watch?v=' + m[1] + '" target="_blank">'
		+ '<img src="http://i.ytimg.com/vi/' + m[1] + '/0.jpg" width="360" height="270" /></a>';
	$event($1(el), {click: function(e) {
		if(Cfg.ytube != 4) { $pD(e); addTubePlayer($up(this), m); }
	}});
}

function getTubePattern() {
	return /https?:\/\/(?:www\.)?youtu(?:be\.com\/(?:watch\?.*?v=|v\/)|\.be\/)([^&#?]+).*?(?:t(?:ime)?=(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?)?$/;
}

function clickTubeLink(e) {
	var m = this.href.match(getTubePattern()),
		el = $x('.//div[@class="DESU_ytube"]', getPost(this));
	$pD(e);
	if($xb('node()[contains(@src,"' + m[1] + '")]|video[contains(@poster,"' + m[1] + '")]', el))
		el.innerHTML = '';
	else if(Cfg.ytube > 2 && !$xb('a[contains(@href,"' + m[1] + '")]', el)) addTubePreview(el, m);
	else addTubePlayer(el, m);
}

function addLinkTube(post) {
	if(Cfg.ytube == 0) return;
	$each($X('.//embed', post || dForm), function(el) {
		var src, m = el.src.match(getTubePattern());
		if(!m) return;
		src = 'http://www.youtube.com/watch?v=' + m[1];
		if(m[4] || m[3] || m[2]) src += '#t=' + (m[2] ? m[2] + 'h' : '') + (m[3] ? m[3] + 'm' : '')
			+ (m[4] ? m[4] + 's' : '');
		$x(xPostMsg, post || getPost(el)).appendChild(
			$add('<p><a href="' + src + '">' + src + '</a></p>')
		);
		$del($up(el));
	});
	$each($X('.//a[contains(@href,"youtu")]', post || dForm), function(link) {
		var pst, el, msg, m = link.href.match(getTubePattern());
		if(!m) return;
		pst = post || getPost(link);
		el = $x('.//div[@class="DESU_ytube"]', pst);
		if(!el) {
			el = $new('div', {Class: 'DESU_ytube'});
			if(Cfg.ytube > 2) addTubePreview(el, m);
			else if(Cfg.ytube == 2) addTubePlayer(el, m);
			msg = pst.Msg || $x(xPostMsg, pst);
			if(msg) $before(msg, [el]);
			else pst.appendChild(el);
		}
		link.className = 'DESU_ytlink';
		$event(link, {click: clickTubeLink});
		if(!nav.Opera && Cfg.ytitle == 1) GM_xmlhttpRequest({
			method: 'GET',
			url: 'https://gdata.youtube.com/feeds/api/videos/' + m[1]
				+ '?alt=json&fields=title/text(),yt:noembed,app:control/yt:state/@reasonCode',
			onload: function(xhr) {
				try { link.textContent = JSON.parse(xhr.responseText).entry.title.$t; } catch(e) {};
			}
		});
	}, true);
}

function addLinkMP3(post) {
	if(Cfg.mp3 == 0) return;
	$each($X('.//a[contains(@href,".mp3")]', post || dForm), function(link) {
		var pst, el, msg;
		if(!(link.target == '_blank' || link.rel == 'nofollow')) return;
		pst = post || getPost(link);
		el = $x('.//div[@class="DESU_mp3"]', pst);
		if(!el) {
			el = $new('div', {Class: 'DESU_mp3'});
			msg = pst.Msg || $x(xPostMsg, pst);
			if(msg) $before(msg, [el]);
			else pst.appendChild(el);
		}
		if(!$xb('.//object[contains(@FlashVars,"' + link.href + '")]', el))
			$html(el, el.innerHTML + '<object data="http://junglebook2007.narod.ru/audio/player.swf" type="application/x-shockwave-flash" wmode="transparent" width="220" height="16"  FlashVars="playerID=1&amp;bg=0x808080&amp;leftbg=0xB3B3B3&amp;lefticon=0x000000&amp;rightbg=0x808080&amp;rightbghover=0x999999&amp;rightcon=0x000000&amp;righticonhover=0xffffff&amp;text=0xffffff&amp;slider=0x222222&amp;track=0xf5f5dc&amp;border=0x666666&amp;loader=0x7fc7ff&amp;loop=yes&amp;autostart=no&amp;soundFile=' + link.href + '"></object><br>');
	}, true);
}

/*-----------------------------Image view functions--------------------------*/

function makeMoveable(el) {
	var elMove = function(e) {
			el.style.left = e.clientX - el.curX  + 'px';
			el.style.top = e.clientY - el.curY + 'px';
			el.moved = true;
		}, elStop = function() { $revent(doc.body, {mousemove: elMove, mouseup: elStop}); };
	$event(el, {mousedown: function(e) {
		$pD(e);
		el.curX = e.clientX - parseInt(el.style.left);
		el.curY = e.clientY - parseInt(el.style.top);
		$event(doc.body, {mousemove: elMove, mouseup: elStop});
	}});
}

function resizeImg(e) {
	var curX = e.clientX, curY = e.clientY,
		oldL = parseInt(this.style.left), oldT = parseInt(this.style.top),
		oldW = this.width, oldH = this.height,
		d = nav.Opera || nav.Chrome ? e.wheelDelta : -e.detail,
		newW = parseInt(this.width*(d > 0 ? 1.25 : 0.8)),
		newH = parseInt(this.height*(d > 0 ? 1.25 : 0.8));
	$pD(e);
	this.width = newW;
	this.height = newH;
	this.style.left = parseInt(curX - (newW/oldW)*(curX - oldL)) + 'px';
	this.style.top = parseInt(curY - (newH/oldH)*(curY - oldT)) + 'px';
}

function addFullImg(a, sz, isExp) {
	var newW = '', newH = '',
		fullW = parseInt(sz[0]), fullH = parseInt(sz[1]),
		scrW = doc.body.clientWidth, scrH = window.innerHeight,
		full = $x('.//img[@class="DESU_fullimg"]', a);
	if(full && isExp || !full && isExp === false) return;
	if(Cfg.expimg == 1 && !$xb('img[contains(@style,"fixed")]', a)) $disp($t('img', a));
	if(full) {
		if(!full.moved) { $disp(full); setTimeout(function() { $del(full); }, 0); }
		else full.moved = false;
		return;
	}
	full = $new('img');
	if(Cfg.expimg == 2) {
		$del($x('.//img[@class="DESU_fullimg"]'));
		full.addEventListener(
			nav.Opera || nav.Chrome ? 'mousewheel' : 'DOMMouseScroll', resizeImg, false
		);
		makeMoveable(full);
	}
	if(Cfg.expimg == 1) scrW -= $offset(a).left + 25;
	if(fullW && fullH) {
		newW = fullW < scrW ? fullW : scrW;
		newH = newW*fullH/fullW;
		if(Cfg.expimg == 2 && newH > scrH) { newH = scrH; newW = newH*fullW/fullH; }
	}
	a.appendChild($attr(full, {
		Class: 'DESU_fullimg',
		src: a.href, alt: a.href, width: newW, height: newH,
		style: (Cfg.expimg == 2 ? 'position:fixed; z-index:5000; border:1px solid black; left:'
			+ parseInt((scrW - newW)/2) + 'px; top:' + parseInt((scrH - newH)/2) + 'px' : '')
	}));
}

function addLinkImg(post) {
	if(Cfg.addimg == 0) return;
	$each($X(xPostMsg + '//a[contains(@href,".jpg") or contains(@href,".png")'
		+ ' or contains(@href,".gif")]', post || dForm), function(link) {
		var a;
		if($xb('ancestor::small', link)) return;
		a = link.cloneNode(false);
		a.target = '_blank';
		$disp(a);
		a.appendChild($new('img', {Class: 'DESU_preimg', src: a.href, alt: a.href}, {
			load: function() {
				var fullW, fullH, k;
				$disp(a);
				fullW = this.width;
				fullH = this.height;
				this.title = fullW + 'x' + fullH;
				if(fullW <= 200 && fullH <= 200) return;
				k = fullW/fullH;
				this.width = k < 1 ? 200*k : 200;
				this.height = k < 1 ? 200 : 200/k;
			}
		}));
		$event(a, {click: function(e) {
			if(Cfg.expimg != 0 && e.button != 1) {
				$pD(e);
				addFullImg(this, $1(this).title.split('x'));
			}
		}});
		$before(link, [a, $new('br')]);
	});
}

function expandPostImg(a, post, isExp) {
	if(!/\.jpg|\.jpeg|\.png|.\gif/i.test(a.href)) return;
	addFullImg(a, getImgSize(
		post.Img.snapshotLength > 1 ? $x('ancestor::node()[self::div or self::td][1]', a) : post
	), isExp);
}

function expandAllPostImg(post, isExp) {
	$each(post.Img, function(img) { expandPostImg($x('ancestor::a[1]', img), post, isExp); });
}

function eventPostImg(post) {
	$each(post.Img, function(img) {
		var a = $x('ancestor::a[1]', img);
		if(a) {
			$rattr(a, 'onclick');
			$rattr(img, 'onclick');
			if(ch.dfwk) $rattr($up(img), 'onclick');
			a.addEventListener('click', function(e) {
				if(Cfg.expimg != 0 && e.button != 1) { $pD(e); expandPostImg(this, post); }
			}, false);
		}
	});
}

/*--------------------------->>RefLinks map functions------------------------*/

function getRefMap(pNum, rNum) {
	if(!refMap[rNum]) refMap[rNum] = [pNum];
	else if(refMap[rNum].indexOf(pNum) === -1) refMap[rNum].push(pNum);
}

function showRefMap(post, rNum) {
	var el, msg, txt;
	if(!refMap[rNum] || !post) return;
	el = $x('.//div[@class="DESU_refmap"]', post);
	txt = refMap[rNum].toString().replace(/(\d+)/g, ' <a href="#$1">&gt;&gt;$1</a>');
	if(!el) {
		msg = post.Msg || $x(xPostMsg, post);
		if(!msg) return;
		$after(msg, [$add('<div class="DESU_refmap">' + txt + '</div>')]);
	} else el.innerHTML = txt;
}

function addRefMap(post) {
	var rNum, pst;
	if(Cfg.navig !== 2) return;
	$each($X('.//a[starts-with(text(),">>")]', post ? post.Msg : dForm), function(link) {
		if(/\//.test(link.textContent)) return;
		rNum = (link.hash || link.pathname.substring(link.pathname.lastIndexOf('/'))).match(/\d+/);
		pst = post || getPost(link);
		if(pByNum[rNum] && pst) getRefMap(pst.id.match(/\d+/), rNum);
	}, true);
	for(rNum in refMap) showRefMap(pByNum[rNum], rNum);
}

/*----------------------->>RefLinks posts preview functions------------------*/

function delPostPreview() {
	var xp, cln;
	if(pView) $delNx(pView);
	else {
		xp = './/div[starts-with(@id,"DESU_preview")]';
		cln = $x(xp);
		if(cln) clearTimeout(cln.marker);
		$Del(xp);
	}
}

function checkPostPreview(e) {
	if(Cfg.navdel == 1 && pView) {
		clearTimeout(pView.close);
		pView.close = setTimeout(delPostPreview, 1e3);
	}
	pView = $x('ancestor-or-self::div[starts-with(@id,"DESU_preview")]', e.relatedTarget);
	if(Cfg.navdel == 0) delPostPreview();
}

function funcPostPreview(post, parentId, msg) {
	var el;
	if(!pView) return;
	if(!post) { pView.innerHTML = msg; return; }
	pView.innerHTML = ($x('.//td[@class="' + pClass + '"]', post) || post).innerHTML;
	$Del('.//img[@class="DESU_preimg"]/ancestor::a|.//img[@class="DESU_fullimg"]'
		+ '|.//div[@class="DESU_refmap" or @class="DESU_ytube" or @class="DESU_mp3"]', pView);
	addLinkTube(pView);
	pView.Img = getImages(pView);
	$each(pView.Img, function(img) { img.style.display = ''; });
	eventPostImg(pView);
	addLinkImg(pView);
	if(Cfg.navig == 2) {
		showRefMap(pView, pView.id.match(/\d+/));
		el = $x('.//a[starts-with(text(),">>") and contains(text(),"' + parentId + '")]', pView);
		if(el) el.style.fontWeight = 'bold';
	}
	eventRefLink(pView);
}

function showPostPreview(e) {
	var x, y,
		b = this.pathname.match(/^\/*(.*?)\/*(?:res|thread-|$)/)[1],
		tNum = this.pathname.match(/[^\/]+\/(.*?)$/)[1].match(/\d+/),
		pNum = this.hash.match(/\d+/) || tNum,
		scrW = doc.body.clientWidth, scrH = window.innerHeight,
		parent = getPost(e.target),
		parentId = parent ? parent.id.match(/\d+/) : null,
		post = pByNum[pNum] || ajaxPosts[pNum];
	if(Cfg.navig == 0 || /^>>$/.test(this.textContent)) return;
	setTimeout(function() {
		$del($x('.//div[starts-with(@id,"preview") or starts-with(@id,"pstprev")]'));
	}, 0);
	if(Cfg.navfix == 0 || Cfg.attach == 1 && $xb('ancestor::div[@id="DESU_content"]', e.target)) {
		x = e.clientX + window.pageXOffset + 2;
		y = e.clientY + window.pageYOffset;
	} else {
		x = $offset(this).left + this.offsetWidth/2;
		y = $offset(this).top;
		if(e.clientY < scrH*0.8) y += this.offsetHeight;
	}
	pView = $new('div', {
		id: 'DESU_preview_' + pNum,
		Class: pClass,
		style: 'position:absolute; width:auto; min-width:0; z-index:9999; border:1px solid grey; '
			+ (x < scrW/2 ? 'left:' + x : 'right:' + parseInt(scrW - x + 2)) + 'px; '
			+ (e.clientY < scrH*0.8 ? 'top:' + y : 'bottom:' + parseInt(scrH - y - 4)) + 'px'}, {
		mouseout: checkPostPreview,
		mouseover: function() { if(!pView) pView = this; }
	});
	if(post) {
		funcPostPreview(post, parentId);
		if(post.Vis == 0) togglePost(pView);
	} else {
		funcPostPreview(null, null, '<span class="DESU_icn_wait">&nbsp;</span>' + Lng.loading);
		AJAX(null, b, tNum, function(err) {
			funcPostPreview(ajaxPosts[pNum], parentId, err || Lng.postNotFound);
		});
	}
	$del($id(pView.id));
	dForm.appendChild(pView);
	if(Cfg.navmrk == 1)
		pView.marker = setTimeout(function() { markViewedPost(pNum); saveViewedPosts(pNum); }, 2e3);
}

function eventRefLink(el) {
	if(Cfg.navig != 0) $each($X('.//a[starts-with(text(),">>")]', el || dForm), function(link) {
		$rattr(link, 'onmouseover');
		$rattr(link, 'onmouseout');
		$event(link, {mouseover: showPostPreview, mouseout: checkPostPreview});
	});
}


/*=============================================================================
								AJAX FUNCTIONS
=============================================================================*/

function parseHTMLdata(html) {
	if(!pr.on && oeForm) {
		pr = new replyForm($x('.//textarea/ancestor::form[1]', $up($add(html))));
		$before($1($id('DESU_pform')), [pr.form]);
	}
	$each($X('.//div[@class="thread"]', parseDelform(
			!hanab ? $x(xDelForm, $up($add(html)))
			: $up($add('<div class="thread">' + html + '</div>'))
		)), function(thrd) {
		var tNum = thrd.id.match(/\d+/);
		ajaxThrds[tNum] = {keys: []};
		$each($X('.//node()[starts-with(@id,"post-") or starts-with(@id,"oppost-")]'
			+ '[self::table or self::div]', thrd), function(post, i) {
			var om, pNum = post.id.match(/\d+/);
			ajaxThrds[tNum].keys.push(pNum);
			ajaxPosts[pNum] = post;
			if(i == 0 && kusaba) {
				om = $x('.//span[@class="omittedposts"]', thrd);
				if(om) post.appendChild(om);
			}
			$each($X(xPostMsg + '//a[starts-with(text(),">>")]', post), function(link) {
				getRefMap(pNum, link.textContent.match(/\d+/));
			});
		}, true);
	}, true);
}

function AJAX(url, b, tNum, fn) {
	if(!url) {
		if(hanab) url = '/api/thread/expand/' + b + '/' + tNum;
		else url = '/' + (b == '' ? '': b + '/') + res + tNum + (ch.tire ? '.html' : docExt);
	}
	GM_xmlhttpRequest({method: 'GET', url: url, onreadystatechange: function(xhr) {
		if(xhr.readyState != 4) return;
		if(xhr.status == 200) {
			if(!/^https?:\/\//.test(url)) parseHTMLdata(xhr.responseText);
			else ajaxPosts[0] = xhr.responseText;
			fn();
		}
		else if(xhr.status == 0) fn(Lng.noConnect);
		else fn('HTTP [' + xhr.status + '] ' + xhr.statusText);
	}});
}

function addPostFunc(post) {
	post.Text = post.Msg.textContent.trim();
	doPostFilters(post);
	addRefMap(post);
	eventRefLink(post);
	addLinkMP3(post);
	addLinkTube(post);
	addLinkImg(post);
	if(post.Vis == 0) setPostVisib(post, 0);
	if(Cfg.delhd == 1) mergeHidden(post);
	if(isExpImg) expandAllPostImg(post);
}

function newPost(thr, tNum, i, isDel) {
	var pNum = ajaxThrds[tNum].keys[i], post = ajaxPosts[pNum];
	Posts[Posts.length] = post;
	if(isDel) post.isDel = true;
	pByNum[pNum] = post;
	post.Num = pNum;
	post.Count = i;
	post.Vis = getVisib(pNum);
	post.Msg = $x(xPostMsg, post);
	post.Img = getImages(post);
	post.isOp = i == 0;
	addPostButtons(post);
	if(Cfg.expimg != 0) eventPostImg(post);
	addPostFunc(post);
	if(Cfg.expost != 0 && !TNum) expandPost(post);
	thr.appendChild(post);
	if(tinyb) thr.appendChild($new('br'));
	return post;
}

function getFullMsg(post, tNum, a) {
	AJAX(null, brd, tNum, function(err) {
		if(err) return;
		$del(a);
		post.Msg = $html(post.Msg, $x(xPostMsg, ajaxPosts[post.Num]).innerHTML);
		addPostFunc(post);
	});
}

function expandPost(post) {
	var a, tNum;
	if(post.Vis == 0) return;
	a = $x(ch.krau ? './/p[starts-with(@id,"post_truncated")]' : './/div[@class="abbrev"]|'
			+ './/span[@class="abbr" or @class="omittedposts" or @class="shortened"]', post);
	if(!a || !(/long|full comment|gekürzt|слишком|длинн|мног/i.test(a.textContent))) return;
	tNum = getThread(post).id.match(/\d+/);
	if(Cfg.expost == 1) getFullMsg(post, tNum, a);
	else $event(a, {click: function(e) { $pD(e); getFullMsg(post, tNum, e.target); }});
}

function expandThread(thr, tNum, last, isDel) {
	var i, len = ajaxThrds[tNum].keys.length;
	if(last != 1) last = len - last;
	if(last <= 0) last = 1;
	if(last > 1) thr.appendChild($new('div', {
		Class: 'DESU_omitted', text: Lng.postsOmitted + parseInt(last - 1)
	}));
	for(i = last; i < len; i++) newPost(thr, tNum, i, isDel);
	savePostsVisib();
	$close($id('DESU_alert_wait'));
}

function loadThread(post, last) {
	$alert(Lng.loading, 'wait');
	AJAX(null, brd, post.Num, function(err) {
		if(err) { $close($id('DESU_alert_wait')); $alert(err); }
		else {
			$delNx(post.Msg);
			$delNx(post);
			if(ch.krau) $del($x('.//span[@class="omittedinfo"]', post));
			expandThread($up(post), post.Num, last);
			$focus(pByNum[post.Num]);
			if(last > 5 || last == 1) $up(post).appendChild($add(
				'<span>[<a href="#">' + Lng.collapseThrd + '</a>]</span>', {
				click: function(e) { $pD(e); loadThread(post, 5); }
			}));
		}
	});
}

function loadFavorThread(e) {
	var el = $up(this, 2),
		thr = $x('.//div[@class="thread"]', el),
		arr = el.id.substr(13).split('|'),
		url = $if(arr[0] != host, $next(this).href),
		b = arr[1],
		tNum = arr[2];
	$pD(e);
	if(thr.style.display != 'none') { $disp(thr); thr.innerHTML = ''; return; }
	if(pByNum[tNum] && pByNum[tNum].offsetHeight) { $focus(pByNum[tNum]); return; }
	$alert(Lng.loading, 'wait');
	AJAX(url, b, tNum, function(err) {
		if(err) { $close($id('DESU_alert_wait')); $alert(err); return; }
		if(url && /^http:\/\//.test(url)) {
			thr.innerHTML = ajaxPosts[0].split(/<form[^>]+del[^>]+>/)[1].split('</form>'
				)[0].replace(/(href="|src=")([^h][^"]+)/g, '$1http://' + url.split('/')[2] + '$2');
			$close($id('DESU_alert_wait'));
		} else {
			newPost(thr, tNum, 0);
			expandThread(thr, tNum, 5, true);
			$x('.//tr[@id="DESU_favdata_' + host + '|' + b + '|' + tNum
				+ '"]//span[@class="DESU_favpcount"]/span').textContent = getPstCount(thr);
			setStored('DESU_Favorites', uneval(Favor));
		}
		$disp(thr);
	});
}

function getDelPosts(err) {
	var j = 0, del = 0;
	if(err) return false;
	forAll(function(post) {
		if(ajaxThrds[TNum].keys[j] != parseInt(post.Num)) {
			if(!post.isDel) post.Btns.className += '_del';
			post.isDel = true;
		} else if(!post.isDel) j++;
		if(post.isDel) del++;
	});
	return del;
}

function setUpdButtonState(state) {
	if(TNum && Cfg.updthr != 3) $x('.//a[starts-with(@id,"DESU_btn_upd")]').id = 'DESU_btn_upd' + state;
}

function endPostsUpdate() {
	setUpdButtonState('off');
	clearInterval(ajaxInt);
	ajaxInt = undefined;
}

function infoNewPosts(err, del) {
	var inf, old;
	if(err) {
		if(err != Lng.noConnect) {
			$alert(Lng.thrdNotFound + TNum + '): \n' + err);
			doc.title = '{' + err.match(/(?:\[)(\d+)(?:\])/)[1] + '} ' + doc.title;
			endPostsUpdate();
		} else { $alert(Lng.noConnect, 'warn'); setUpdButtonState('warn'); }
		return;
	}
	if(Cfg.updthr == 3) return;
	setUpdButtonState('on');
	$close($id('DESU_alert_warn'));
	inf = parseInt(ajaxThrds[TNum].keys.length - Posts.length + del);
	if(Cfg.updthr == 1) {
		if(isActiveTab) return;
		old = doc.title.match(/^\[\d+\]/);
		if(old) inf += parseInt(old[0].match(/\d+/));
	}
	if(Cfg.updfav == 1 && favIcon) {
		clearInterval(favIconInt);
		if(inf > 0) favIconInt = setInterval(function() {
			var head = $t('head'),
				href = $xb('.//link[@href="' + favIcon + '"]', head)
					? 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJ'
						+ 'LR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglE'
						+ 'wCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII='
					: favIcon;
			$Del('.//link[@rel="shortcut icon"]', head);
			head.appendChild($new('link', {href: href, rel: 'shortcut icon'}));
		}, 800);
	}
	doc.title = (inf > 0 ? ' [' + inf + '] ' : '') + docTitle;
}

function loadNewPosts(inf) {
	if(inf) $alert(Lng.loading, 'wait');
	AJAX(null, brd, TNum, function(err) {
		var i, len, del = getDelPosts(err);
		if(!inf) infoNewPosts(err, del);
		if(!err) {
			for(i = Posts.length - del, len = ajaxThrds[TNum].keys.length; i < len; i++)
				newPost($x('.//div[@class="thread"]', dForm), TNum, i);
			savePostsVisib();
			$1($id('DESU_panel_info')).textContent = len + '/' + getImages(dForm).snapshotLength;
		}
		if(inf) { $close($id('DESU_alert_wait')); infoNewPosts(err, del); }
	}, true);
}

function initPostsUpdate() {
	var C = Cfg.updint,
		t = 6e4*(C == 0 ? 0.5 : C == 1 ? 1 : C == 2 ? 1.5 : C == 3 ? 2 : C == 4 ? 5 : C == 5 ? 15 : 30);
	if(Cfg.updthr == 1) ajaxInt = setInterval(function() { loadNewPosts(); }, t);
	if(Cfg.updthr == 2) ajaxInt = setInterval(function() {
		AJAX(null, brd, TNum, function(err) { infoNewPosts(err, getDelPosts(err)); }, true);
	}, t);
}

function loadPages(len) {
	var p, url;
	$alert(Lng.loading, 'wait');
	dForm.innerHTML = '';
	for(p = 0, Posts = [], refMap = [], ajaxThrds = {}, ajaxPosts = []; p < len; p++) {
		$append(dForm, [
			$new('center', {text: p + Lng.page, style: 'font-size:2em'}),
			$new('hr'),
			$new('div', {id: 'DESU_page' + p})
		]);
		url = '/' + (brd == '' ? '' : brd + '/')
			+ (p > 0 ? p + docExt : hanab ? 'index' + docExt : '');
		AJAX(url, brd, null, function(p, len) { return function() {
			var tNum, thr, i, pLen, page = $id('DESU_page' + p);
			for(tNum in ajaxThrds) {
				thr = $new('div', {Class: 'thread', id: 'thread-' + tNum});
				$append(page, [thr, $new('br', {clear: 'left'}), $new('hr')]);
				for(i = 0, pLen = ajaxThrds[tNum].keys.length; i < pLen; i++) newPost(thr, tNum, i);
				delete ajaxThrds[tNum];
			}
			savePostsVisib();
			readHiddenThreads(function() {});
			if(p == len - 1) $close($id('DESU_alert_wait'));
		}}(p, len));
	}
}


/*=============================================================================
								HIDERS / FILTERS
=============================================================================*/

function doPostFilters(post) {
	hideByWipe(post);
	if(Cfg.spells == 1) hideBySpells(post);
}

function togglePostVisib(post) {
	post.Vis = post.Vis == 1 ? 0 : 1;
	setPostVisib(post, post.Vis);
	savePostsVisib();
}

function togglePost(post, vis) {
	if(post.isOp)
		if(!ch.krau) getThread(post).style.display = vis == 0 ? 'none' : '';
		else $x('.//div[@class="thread_body"]', getThread(post)).style.display = vis == 0 ? 'none' : '';
	$each($X('following-sibling::*', $x(
		ch.krau ? './/div[@class="postheader"]'
		: tinyb ? './/p[@class="intro"]'
		: './/span[starts-with(@class,"DESU_postpanel")]'
	, post)), function(el) { el.style.display = vis == 0 ? 'none' : ''; });
}

function applyPostVisib(post, vis, note) {
	var el, pNum = post.Num;
	if(post.isOp) {
		el = $id('DESU_hiddenthr_' + pNum);
		if(vis == 1 && el) { $del(el); toggleHiddenThread(post, 1); }
		if(vis == 0 && !el) {
			el = $add('<div class="' + pClass + '" id="DESU_hiddenthr_' + post.Num + '">'
				+ Lng.hiddenThrd + ' <a href="#">№' + pNum + '</a><i> ('
				+ (note ? 'autohide: ' + note : getTitle(post).substring(0, 70)) + ')</i></div>'
			);
			$event($t('a', el), {click: function(e) { $pD(e); togglePostVisib(post); }});
			$before($up(post), [el]);
			toggleHiddenThread(post, 0);
		}
	} else if(Cfg.delhd == 2) post.style.display = vis == 0 ? 'none' : '';
	if(!sav.cookie) {
		Visib[brd + pNum] = vis;
		Expires[brd + pNum] = (new Date()).getTime() + stoargeLife;
	} else if(TNum) Visib[post.Count] = vis;
	post.Vis = vis;
}

function setPostVisib(post, vis) {
	$1(post.Btns).className = vis == 0 ? 'DESU_icn_unhide' : 'DESU_icn_hide';
	togglePost(post, vis);
	applyPostVisib(post, vis);
	if(Cfg.navhid == 1) setTimeout(function() {
		$each($X('.//a[contains(@href,"#' + post.Num + '")]', dForm), function(el) {
			el.className = vis == 0 ? 'DESU_refhid' : '';
		});
	}, 0);
}

function hidePost(post, note) {
	if(post.noHide) return;
	if(post.Vis != 0) post.Btns.appendChild($new('a', {
		Class: 'DESU_postnote', text: ' autohide: ' + note + ' ', href: '#'}, {
		click: function(e) { $pD(e); $del(this); }
	}));
	applyPostVisib(post, 0, note);
}

function unhidePost(post) {
	if(detectWipe(post)) return;
	setPostVisib(post, 1);
	$del($x('.//a[@class="DESU_postnote"]', post));
	hideByWipe(post);
}

function saveHiddenPosts() {
	forAll(function(post) { if(post.Vis == 0) setPostVisib(post, 0); });
	savePostsVisib();
}

function mergeHidden(post) {
	var el, next;
	if(post.Vis != 0 || post.isOp) return;
	el = $prev(post);
	if(!el) return;
	if(!/merged/.test(el.id)) {
		el = $new('span', {id: 'DESU_merged_' + post.Num, style: 'display:none'});
		$before(post, [$new('span', {style: 'display:; cursor:pointer'}, {click: function(e) {
			var hDiv = $id('DESU_merged_' + post.Num);
			$pD(e);
			$prev(hDiv).innerHTML =
				unescape(hDiv.style.display == 'none' ? '%u25BC' : '%u25B2') + '[<i><a href="#">'
					+ Lng.hiddenPosts + '</a>:&nbsp;' + hDiv.childNodes.length + '</i>]';
			$disp(hDiv);
		}}), el]);
	}
	el.appendChild(post);
	next = $next(post);
	if(!next || getVisib(next.id.match(/\d+/)) == 1)
		$prev(el).innerHTML = unescape('%u25B2') + '[<i><a href="#">'
			+ Lng.hiddenPosts + '</a>:&nbsp;' + el.childNodes.length + '</i>]';
}

function processHidden(newCfg, oldCfg) {
	if(newCfg == 2 || oldCfg == 2)
		forAll(function(post) { if(post.Vis == 0 && !post.isOp) $disp(post); });
	if(oldCfg == 1) $each($X('.//span[starts-with(@id,"DESU_merged")]'), function(el) {
		var px = el.childNodes, i = px.length;
		while(i--) $after(el, [px[i]]);
		$del($prev(el));
		$del(el);
	});
	if(newCfg == 1) forAll(mergeHidden);
	saveCfg('delhd', newCfg);
	scriptCSS();
}

/*----------------------Hide/change posts by expressions---------------------*/

function getSpellObj() {
	return {
		words: [], exp: [], exph: [], img: [], imgn: [], name: [], tmax: [],
		sage: false, notxt: false, noimg: false, trip: false
	};
}

function initSpells() {
	var i, x, b, n, t, p, j, Spells;
	pSpells = new getSpellObj();
	tSpells = new getSpellObj();
	oSpells = {rep: [], skip: [], num: [], outrep: []};
	for(i = 0; x = spellsList[i++];) {
		Spells = pSpells;
		x = x.toString();
		if(/^#(?:[^\s]+\/)?(?:\d+)? /.test(x)) {
			b = x.match(/^#([^\/]+)\//);
			n = x.match(/(\d+)\s/);
			if(TNum && b && n && b[1] == brd && n[1] == TNum
				|| TNum && !b && n && n[1] == TNum || b && !n && b[1] == brd)
				x = x.replace(/^#[^\s]+ /, '');
			else continue;
		}
		if(/^#op /.test(x)) {
			if(!TNum) { Spells = tSpells; x = x.substr(4); }
			else continue;
		}
		if(!/^#/.test(x)) { Spells.words.push(x); continue; }
		t = x.split(' ')[0];
		p = x.replace(/^#[^\s]+ /, '');
		if(TNum && (t == '#skip' || t == '#num')) {
			p = p.split(', ');
			j = p.length;
			while(j--) {
				if(p[j].indexOf('-') < 0) p[j] += '-' + p[j];
				t == '#num' ? oSpells.num.push(p[j]) : oSpells.skip.push(p[j]);
			}
		}
		t == '#rep' ? oSpells.rep.push(p)
		: t == '#exp' ? Spells.exp.push(strToRegexp(p))
		: t == '#exph' ? Spells.exph.push(strToRegexp(p))
		: t == '#img' ? Spells.img.push(p)
		: t == '#imgn' ? Spells.imgn.push(strToRegexp(p))
		: t == '#name' ? Spells.name.push(p)
		: t == '#tmax' ? Spells.tmax.push(p)
		: t == '#sage' ? Spells.sage = true
		: t == '#notxt' ? Spells.notxt = true
		: t == '#noimg' ? Spells.noimg = true
		: t == '#trip' ? Spells.trip = true
		: t == '#outrep' && oSpells.outrep.push(p);
	}
}

function doReplace(arr, txt) {
	var re, i = arr.length;
	while(i--) {
		re = strToRegexp(arr[i]);
		txt = txt.replace(re, arr[i].substr(re.toString().length + 1));
	}
	return txt;
}

function getImgSpell(imgW, imgH, imgK, exp) {
	var s, stat, expK, x, expW;
	if(exp == '') return false;
	s = exp.split('@');
	stat = s[0][0];
	expK = s[0].substr(1);
	if(expK != '') {
		if(stat == '<' && imgK < expK || stat == '>' && imgK > expK || stat == '=' && imgK == expK)
			{ if(!s[1]) return 'image ' + exp; }
		else return false;
	}
	if(s[1]) {
		x = s[1].split(/[x×]/);
		expW = x[0];
		expH = x[1];
		if(stat == '<' && imgW < expW && imgH < expH ||
			stat == '>' && imgW > expW && imgH > expH ||
			stat == '=' && imgW == expW && imgH == expH)
			return 'image ' + exp;
	}
	return false;
}

function getSpells(x, post) {
	var inf, i, t, _t, pTitle, pName, pTrip, sz, imgW, imgH, imgK;
	post.noHide = false;
	if(oSpells.skip[0] && TNum) {
		inf = post.Count;
		for(i = 0; t = oSpells.skip[i++];) {
			t = t.split('-');
			if(inf >= parseInt(t[0]) && inf <= parseInt(t[1])) { post.noHide = true; return false; }
		}
	}
	if(x.words[0]) {
		pTitle = $x('.//span[@class="replytitle" or @class="filetitle"]', post);
		pTitle = pTitle ? pTitle.textContent.toLowerCase() : '';
		for(i = 0, inf = post.Text.toLowerCase(); t = x.words[i++];) {
			_t = t;
			t = t.toLowerCase();
			if(inf.indexOf(t) > -1 || pTitle.indexOf(t) > -1) return _t;
		}
	}
	if(x.exp[0])
		for(i = 0, inf = post.Text; t = x.exp[i++];)
			if(t.test(inf)) return '#exp ' + t.toString();
	if(x.exph[0])
		for(i = 0, inf = post.innerHTML; t = x.exph[i++];)
			if(t.test(inf)) return '#exph ' + t.toString();
	if(x.name[0] || x.trip) {
		pName = $x('.//span[@class="commentpostername" or @class="postername"]', post);
		pTrip = $x('.//span[@class="postertrip"]', post);
	}
	if(x.trip && pTrip) return '#trip';
	if(x.name[0]) {
		pName = pName ? pName.textContent : '';
		pTrip = pTrip ? pTrip.textContent : '';
		for(i = 0; t = x.name[i++];) {
			_t = t;
			t = t.split(/!+/);
			if(t[0] != '' && pName.indexOf(t[0]) > -1 || t[1] != '' && pTrip.indexOf(t[1]) > -1)
				return '#name ' + _t;
		}
	}
	if(post.Img.snapshotLength > 0) {
		if(x.img[0]) {
			sz = getImgSize(post);
			imgW = parseInt(sz[0]);
			imgH = parseInt(sz[1]);
			imgK = getImgWeight(post);
			for(i = 0; t = x.img[i++];) if(getImgSpell(imgW, imgH, imgK, t)) return '#img ' + t;
		}
		if(x.imgn[0]) {
			inf = getImgInfo(post);
			if(inf)
				for(i = 0, inf = inf.textContent; t = x.imgn[i++];)
					if(t.test(inf)) return '#imgn ' + t;
		}
	}
	if(oSpells.num[0])
		for(i = 0, inf = post.Count; t = oSpells.num[i++];) {
			_t = t;
			t = t.split('-');
			if(inf >= parseInt(t[0]) && inf <= parseInt(t[1])) return '#num ' + _t;
		}
	if(x.tmax[0])
		for(i = 0, inf = post.Text.replace(/\n/g, '').length; t = x.tmax[i++];)
			if(inf >= t) return '#tmax ' + t;
	if(x.sage && isSage(post)) return '#sage';
	if(x.notxt && post.Text == '') return '#no text';
	if(x.noimg && post.Img.snapshotLength == 0) return '#no image';
	return false;
}

function checkSpells(post) {
	if(!TNum && post.isOp) return getSpells(tSpells, post) || getSpells(pSpells, post);
	return getSpells(pSpells, post);
}

function hideBySpells(post) {
	var exp;
	if(Cfg.filthr == 0 && post.isOp) return;
	exp = checkSpells(post);
	if(post.Vis == 0) { if(post.noHide) unhidePost(post); } 
	else if(exp) hidePost(post, exp.substring(0, 70));
}

function verifyRegExp(txt) {
	var i, t, rep, re = /#exp |#exph |#rep |#outrep |#imgn /;
	txt = txt.split('\n');
	i = txt.length;
	while(i--) {
		t = txt[i];
		rep = t.match(re);
		if(rep) try { strToRegexp(t.substr(t.indexOf(rep))); } catch(e) { return t; }
	}
	return null;
}

function toggleSpells() {
	var fld = $id('DESU_spelledit'),
		val = (fld ? fld.value : spellsList.join('\n')).replace(
			/[\r\n]+/g, '\n').replace(/^\n|\n$/g, ''),
		wrong = verifyRegExp(val);
	if(!wrong) saveSpells(val);
	if(val != '' && !wrong) {
		if(fld) fld.value = val;
		if(Cfg.spells == 1) forAll(hideBySpells);
		else forAll(function(post) { if(checkSpells(post)) unhidePost(post); })
		saveHiddenPosts();
	} else {
		if(wrong) $alert(Lng.error + ' ' + wrong);
		if(fld) $id('DESU_spelledit_ch').checked = false;
		saveCfg('spells', 0);
	}
}

function applySpells(txt) {
	var nval, ntxt, wrong,
		fld = $id('DESU_spelledit'), val = fld ? fld.value : spellsList.join('\n');
	if(txt) {
		if(txt.trim() == '') return;
		if(TNum) txt = '#' + brd + '/' + TNum + ' ' + txt;
		toggleSpells();
		nval = '\n' + val;
		ntxt = '\n' + txt;
		val = nval.indexOf(ntxt) > -1 ? nval.split(ntxt).join('') : val + ntxt;
	}
	val = val.replace(/[\r\n]+/g, '\n').replace(/^\n|\n$/g, '');
	wrong = verifyRegExp(val);
	if(wrong) { $alert(Lng.error + ' ' + wrong); return; }
	if(fld) { fld.value = val; $id('DESU_spelledit_ch').checked = val != ''; }
	forAll(function(post) { if(checkSpells(post)) unhidePost(post); })
	saveSpells(val);
	if(val != '') { saveCfg('spells', 1); forAll(hideBySpells); }
	else saveCfg('spells', 0);
	saveHiddenPosts();
}

/*-------------------------Hide posts with similar text----------------------*/

function getWrds(post) {
	return post.Text.replace(/\s+/g, ' ').replace(
		/[\?\.\\\/\+\*\$\^\(\)\|\{\}\[\]!@#%_=:;<,-]/g, '').substring(0, 800).split(' ');
}

function findSameText(post, oNum, oVis, oWords) {
	var words = getWrds(post), len = words.length, i = oWords.length, olen = i, _olen = i, j, n = 0;
	if(len < olen*0.4 || len > olen*3) return;
	while(i--) {
		if(olen > 6 && oWords[i].length < 3) { _olen--; continue; }
		j = len;
		while(j--)
			if(words[j] == oWords[i] || oWords[i].match(/>>\d+/) && words[j].match(/>>\d+/)) n++;
	}
	if(n < _olen*0.4 || len > _olen*3) return;
	$del($x('.//a[@class="DESU_postnote"]', post));
	if(oVis != 0) hidePost(post, 'similar to >>' + oNum);
	else unhidePost(post);
}

function hideBySameText(post) {
	var vis = post.Vis;
	if(post.Text != '') {
		forAll(function(target) { findSameText(target, post.Num, vis, getWrds(post)); });
		saveHiddenPosts();
	} else applySpells('#notxt');
}

/*--------------------------------Wipe detectors-----------------------------*/

function detectWipe_sameLines(txt) {
	var lines, i, x, arr = [], n = 0;
	if(Cfg.samel == 0) return false;
	lines = txt.replace(/> /g, '').split(/\s*\n\s*/);
	i = lines.length;
	if(i < 6) return false;
	while(i--) {
		x = lines[i];
		if(x.length == 0)  continue;
		if(arr[x]) arr[x]++;
		else arr[x] = 1;
		n++;
	}
	n = n/4;
	for(x in arr)
		if(arr[x] > n && arr[x] > 4)
			return 'same lines: "' + x.substr(0, 20) + '" x' + parseInt(arr[x] + 1);
	return false;
}

function detectWipe_sameWords(txt) {
	var words, i, x, arr = [], n = 0, keys = 0, pop = '', mpop = -1;
	if(Cfg.samew == 0) return false;
	words = txt.replace(/[\s\.\?\!,>]+/g, ' ').toUpperCase().split(' ');
	i = words.length;
	if(i <= 13) return false;
	while(i--) {
		x = words[i];
		if(x.length < 2) continue;
		if(arr[x]) arr[x]++;
		else arr[x] = 1;
		n++;
	}
	if(n < 10) return false;
	for(x in arr) {
		keys++;
		if(arr[x] > mpop) { mpop = arr[x]; pop = x; }
		if(n > 25 && arr[x] > n/3.5) return 'same words: "' + x.substr(0, 20) + '" x' + arr[x];
	}
	return n > 80 && keys <= 20 || n/keys > 7
		? 'same words: "' + pop.substr(0, 20) + '" x' + mpop : false;
}

function detectWipe_longColumn(txt) {
	var rows, i, n = 0;
	if(Cfg.longp == 0) return false;
	rows = txt.split(/\s*\n\s*/);
	i = rows.length;
	if(i > 50) return 'long text x' + i;
	while(i--)
		if(rows[i].length < 9) n++;
		else return false;
	return n > 5 ? 'columns x' + n : false;
}

function detectWipe_longWords(txt) {
	var words, i, x, all = '', longest = '', n = 0;
	if(Cfg.longw == 0) return false;
	words = txt.replace(/https*:\/\/.*?(\s|$)/g, '').replace(/[\s\.\?!,>:;-]+/g, ' ').split(' ');
	i = words.length;
	while(i--) {
		x = words[i];
		if(x.length < 2) continue;
		all += x;
		longest = x.length > longest.length ? x : longest;
		n++;
	}
	return n == 1 && longest.length > 70 || n > 1 && all.length/n > 12
		? 'long words: "' + longest.substr(0, 20) + '.."' : false;
}

function detectWipe_caseWords(txt) {
	var words, i, x, cap, up, lw, upc, lwc, j, capsw = 0, casew = 0, n = 0;
	if(Cfg.caps == 0) return false;
	words = txt.replace(/[\s+\.\?!,-]+/g, ' ').split(' ');
	i = words.length;
	if(i <= 4) return false;
	while(i--) {
		x = words[i];
		if(x.length < 5) continue;
		cap = x.match(/[a-zа-я]/ig);
		if(cap) {
			cap = cap.toString().trim();
			if(cap != '' && cap.toUpperCase() == cap) capsw++;
		}
		up = x.toUpperCase();
		lw = x.toLowerCase();
		upc = 0;
		lwc = 0;
		j = x.length;
		while(j--) {
			if(up.charAt(j) == lw.charAt(j)) continue;
			if(x.charAt(j) == up.charAt(j)) upc++;
			else if(x.charAt(j) == lw.charAt(j)) lwc++;
		}
		if((upc < lwc ? upc : lwc) >= 2 && lwc + upc >= 5) casew++;
		n++;
	}
	return (casew/n >= 0.3 && n > 8) ? ('cAsE words: ' + parseInt(casew/words.length*100) + '%')
		: (capsw/n >= 0.3 && n > 5) ? 'CAPSLOCK'
		: false;
}

function detectWipe_specSymbols(txt) {
	var len, proc;
	if(Cfg.specs == 0) return false;
	txt = txt.replace(/\s+/g, '');
	len = txt.length;
	proc = txt.replace(/[0-9a-zа-я\.\?!,]/ig, '').length/len;
	return len > 30 && proc > 0.4 ? 'specsymbols: ' + parseInt(proc*100) + '%' : false;
}

function detectWipe_numbers(txt) {
	var len, proc;
	if(Cfg.nums == 0) return false;;
	txt = txt.replace(/\s+/g, ' ').replace(/((>>\d+)+|https*:\/\/.*?)(\s|$)/g, '');
	len = txt.length;
	proc = (len - txt.replace(/\d/g, '').length)/len;
	return len > 30 && proc > 0.4 ? 'numbers: ' + parseInt(proc*100) + '%' : false;
}

function detectWipe(post) {
	var arr, i, x;
	if(Cfg.awipe == 0) return false;
	arr = [
		detectWipe_sameLines,
		detectWipe_sameWords,
		detectWipe_longColumn,
		detectWipe_longWords,
		detectWipe_caseWords,
		detectWipe_specSymbols,
		detectWipe_numbers
	];
	for(i = 0; i < 7; i++) { x = arr[i](post.Text); if(x) return x; }
	return false;
}

function hideByWipe(post) {
	var note;
	if(Cfg.filthr == 0 && post.isOp || post.Vis == 0 || post.Vis == 1) return;
	note = detectWipe(post);
	if(note) hidePost(post, note);
	else applyPostVisib(post, 1);
}


/*=============================================================================
								INITIALIZATION
=============================================================================*/

function replyForm(f) {
	var tr = ch._7ch ? 'li' : 'tr',
		pre = './/' + tr + '[not(contains(@style,"none"))]//input[not(@type="hidden") and ';
	if(!f) return;
	this.on = true;
	this.isQuick = false;
	this.tNum = TNum;
	this.form = f;
	this.tr = 'ancestor::' + tr + '[1]';
	this.recap = $x('.//input[@id="recaptcha_response_field"]', f);
	this.cap = $x('.//input[contains(@name,"aptcha") and not(@name="recaptcha_challenge_field")]', f) || this.recap;
	this.txta = $x('.//' + tr + '//textarea' + (ch.krau ? '[@name="internal_t"]' : '[last()]'), f);
	this.subm = $x('.//' + tr + '//input[@type="submit"]', f);
	this.file = $x('.//' + tr + '//input[@type="file"]', f);
	this.passw = $x('.//' + tr + '//input[@type="password"]', f);
	this.gothr = $x('.//tr[@id="trgetback"]|.//input[@type="radio" or @name="gotothread"]/ancestor::tr[1]', f);
	this.name = $x(pre + '(@name="field1" or @name="name" or @name="internal_n" or @name="nya1" or @name="akane")]', f);
	this.mail = $x(pre + (
		ch._410 ? '@name="sage"]'
		: ch.futr ? '@name="denshimeru"]'
		: '(@name="field2" or @name="em" or @name="sage" or @name="email" or @name="nabiki" or @name="dont_bump")]'
	), f);
}

function getThrdUrl(h, b, tNum) {
	return 'http://' + h + '/' + b + '/' + (/krautchan\.net/.test(h) ? 'thread-' : 'res/')
		+ tNum + (/dobrochan\./.test(h) ? '.xhtml' : /2chan\.net/.test(h) ? '.htm' : '.html');
}

function fixDomain() {
	try { doc.domain = dm; } catch(e) { dm = doc.domain; }
}

function fixUneval() {
	try{eval("uneval")}catch(e){var f=[],g={"\t":"t","\n":"n","\u000b":"v","\u000c":"f","\r":"\r","'":"'",'"':'"',"\\":"\\"},h=function(b){if(b in g)return"\\"+g[b];var c=b.charCodeAt(0);return c<32?"\\x0"+c.toString(16):c<127?"\\"+b:c<256?"\\x"+c.toString(16):c<4096?"\\u0"+c.toString(16):"\\u"+c.toString(16)},i=function(b){return b.toString()},j={"boolean":i,number:i,string:function(b){return"'"+b.toString().replace(/[\x00-\x1F\'\"\\\u007F-\uFFFF]/g,h)+"'"},undefined:function(){return"undefined"},"function":i}, k=function(b,c){var a=[],d;for(d in b)b.hasOwnProperty(d)&&(a[a.length]=uneval(d)+":"+uneval(b[d],1));return c?"{"+a.toString()+"}":"({"+a.toString()+"})"},uneval_set=function(b,c,a){f[f.length]=[b,c];j[c]=a||k};uneval_set(Array,"array",function(b){for(var c=[],a=0,d=b.length;a<d;a++)c[a]=uneval(b[a]);return"["+String(c)+"]"});uneval_set(RegExp,"regexp",i);uneval_set(Date,"date",function(b){return"(new Date("+b.valueOf()+"))"});window.uneval=function(b,c){var a;if(b===void 0)a="undefined";else if(b===null)a= "null";else{a:if(a=typeof b,a=="object"){a=0;for(var d=f.length;a<d;a++)if(b instanceof f[a][0]){a=f[a][1];break a}a="object"}a=(j[a]||k)(b,c)}return a}};
}

function fixGM() {
	try { GM_log; } catch(e) { GM_log = function() {} }
	try { GM_xmlhttpRequest; }
	catch(e) {
		GM_xmlhttpRequest = function(obj) {
			var xhr = new window.XMLHttpRequest();
			xhr.onreadystatechange = function() { obj.onreadystatechange(xhr); };
			xhr.onload = function() { obj.onload(xhr); };
			xhr.open(obj.method, obj.url, true);
			xhr.setRequestHeader('Accept-Encoding', 'deflate, gzip, x-gzip');
			xhr.send(false);
		};
	}
}

function initBoard() {
	var ua, gs, ss, url, ls = false, se = false;
	if(window.location == 'about:blank') return false;
	host = window.location.hostname;
	dm = host.match(/(?:(?:[^.]+\.)(?=org\.|net\.|com\.))?[^.]+\.[^.]+$|localhost/)[0];
	ch = {
		krau:	dm == 'krautchan.net',
		fch:	dm == '4chan.org',
		gazo:	dm == '2chan.net',
		nul:	dm == '0chan.ru',
		_7ch:	dm == '7chan.org',
		_410:	dm == '410chan.ru',
		sib:	dm == 'sibirchan.ru',
		_5ch:	dm == '5channel.net',
		hid:	dm == 'hiddenchan.i2p',
		tire:	dm == '2--ch.ru',
		dfwk:	dm == 'dfwk.ru',
		pony:	dm == 'ponychan.net',
		vomb:	dm == 'vombatov.net',
		ment:	dm == '02ch.org' || dm == '02ch.net',
		futr:	dm == '2chan.su'
	};
	kusaba = $xb('.//script[contains(@src,"kusaba")]');
	hanab = $xb('.//script[contains(@src,"hanabira")]');
	abu = $xb('.//script[contains(@src,"wakaba_new.js")]');
	tinyb = $xb('.//p[@class="unimportant"]/a[@href="http://tinyboard.org/"]');
	if(/DESU_iframe/.test(window.name)) { fixDomain(); return false; }
	xDelForm = './/form[' + (
		hanab || ch.krau ? 'contains(@action,"delete")]'
		: tinyb ? '@name="postcontrols"]'
		: ch.gazo ? '2]'
		: '@id="delform" or @name="delform"]'
	);
	dForm = $x(xDelForm);
	if(!dForm || $id('DESU_panel')) return false;
	if(ch.hid) setTimeout = function(fn) { fn(); };
	fixDomain();
	fixUneval();
	fixGM();
	ua = window.navigator.userAgent;
	nav = {
		Firefox: /firefox|minefield|icecat/i.test(ua),
		Opera: /opera/i.test(ua),
		Chrome: /chrome/i.test(ua)
	};
	gs = nav.Firefox && GM_setValue != null;
	ss = nav.Opera && scriptStorage != null;
	try { ls = typeof localStorage === 'object' && localStorage != null; } catch(e) {}
	try { se = typeof sessionStorage === 'object' && (sessionStorage.test = 1); } catch(e) {}
	sav = {
		GM: gs,
		script: ss,
		cookie: !ls && !ss && !gs,
		local: ls && !ss && !gs,
		session: se,
		isGlobal: gs || ss
	};
	url = (window.location.pathname || '').match(
		/^\/?(?:(.*?)\/*)?(res\/|thread-)?(\d+|index)?(\.[xme]*html?)?$/);
	brd = url[1] || (ch.dfwk ? 'df' : '');
	res = ch.krau ? 'thread-' : 'res/';
	TNum = url[2] ? url[3] : false;
	pageNum = url[3] && !TNum ? parseInt(url[3]) || 0 : 0;
	docExt = url[4] || (ch.gazo ? '.htm' : '.html');
	favIcon = $x('.//head//link[@rel="shortcut icon"]');
	if(favIcon) favIcon = favIcon.href;
	pClass = ch.krau ? 'postreply' : tinyb ? 'post reply' : 'reply';
	xPostRef =
		tinyb ? './/a[@class="post_no"][2]'
		: ch.krau ? './/span[@class="postnumber"]'
		: ch.fch ? './/span[starts-with(@id,"no")]'
		: ch.sib ? './/span[@class="reflink" or @class="filesize"]'
		: ch.gazo ? './/a[@class="del"]'
		: './/span[@class="reflink"]';
	xPostMsg =
		hanab ? './/div[@class="postbody"]'
		: tinyb ? './/p[@class="body"]'
		: ch._7ch ? './/p[@class="message"]'
		: './/blockquote';
	cssFix = nav.Firefox ? '-moz-' : nav.Chrome ? '-webkit-' : '';
	dummy = $new('div');
	pr = new replyForm($x('.//textarea/ancestor::form[1]'));
	oeForm = $x('.//form[contains(@action,"paint") or @name="oeform"]');
	$Del('preceding-sibling::node()' + (ch.fch ? '[not(self::center)]' : '')
		+ '[preceding-sibling::*[descendant-or-self::*['
		+ (abu ? 'self::form' : 'self::div[@class="logo"]') + ' or self::h1]]]', dForm);
	if(ch.krau) { $del($t('hr', dForm)); $del($t('hr', $prev(dForm))); }
	return true;
}

function parseDelform(node) {
	var br = ch.gazo ? 'div[@style="clear:left"]' : 'br[@*]',
		table = 
			ch.fch ? 'table[not(@class="exif")]'
			: ch.tire ? 'table[not(@class="postfiles")]'
			: 'table',
		threads = $X('.//div[' + (
			$xb('div[contains(@id,"_info") and contains(@style,"float")]', node)
				? 'starts-with(@id,"t") and not(contains(@id,"_info"))'
			: ch.sib ? 'not(@*)'
			: ch._7ch ? 'starts-with(@id,"thread") and not(@id="thread_controls")'
			: tinyb ? 'starts-with(@id,"thread") and @itemid'
			: 'starts-with(@id,"thread")'
		) + ']', node);
	$Del('.//script', node);
	if(threads.snapshotLength == 0) {
		$each($X('.//hr/preceding-sibling::' + br, node), function(el) {
			var thr = $new('div', {Class: 'thread'});
			$each($X('preceding-sibling::node()[not(self::div[@class="thread"] or self::hr '
				+ 'or self::' + br + ')]', el), function(el) { thr.appendChild(el); }, nav.Firefox);
			$before(el, [thr]);
		}, true);
		threads = $X('.//div[@class="thread"]', node);
	}
	$each(threads, function(thr) {
		var a, tNum, op, opEnd;
		if(tinyb) $after(thr, [$new('hr')]);
		if(!tinyb && !ch.fch && !ch.gazo) {
			a = $x('.//a[@name]' + (kusaba ? '[2]' : ''), thr);
			tNum = a ? a.name : thr.id.match(/\d+/);
		} else tNum = $x('.//input[@type="checkbox"]', thr).name.match(/\d+/);
		$attr(thr, {id: 'thread-' + tNum, Class: 'thread'});
		if(ch.krau) thr = $x('div[@class="thread_body"]', thr);
		op = $new('div', {id: 'oppost-' + tNum});
		opEnd = $x(table + '|div[descendant::table]|div[starts-with(@id,"repl")]', thr);
		$each(opEnd ? $X('preceding-sibling::node()', opEnd) : $X('node()', thr),
			function(el) { op.appendChild(el); }, !opEnd || nav.Firefox);
		if(opEnd) {
			$each($X('.//' + table + '|.//div[@class="' + pClass + '"]', thr), function(el) {
				el.id = 'post-' + (el.id || el.getElementsByTagName('td')[1].id
					|| el.getElementsByTagName('input')[0].name).match(/\d+/);
			});
			$before($1(thr), [op]);
		} else thr.appendChild(op);
	});
	if(node != dForm) replaceDelform(node);
	return node;
}

function replaceDelform(node) {
	var txt;
	if(ch.fch || ch.krau || Cfg.ctime && timeRegex || Cfg.spells == 1 && oSpells.rep[0]) {
		txt = node.innerHTML;
		if(Cfg.ctime && timeRegex) txt = fixTime(txt);
		if(ch.fch || ch.krau)
			txt = txt.replace(/(^|>|\s|&gt;)(https*:\/\/.*?)(?=$|<|\s)/ig, '$1<a href="$2">$2</a>');
		if(Cfg.spells == 1 && oSpells.rep[0]) txt = doReplace(oSpells.rep, txt);
		node.innerHTML = txt;
	}
}

function initDelform() {
	dForm.id = '';
	try { $disp(parseDelform(dForm)); } catch(e) { return false; }
	if(!nav.Chrome) $disp(dForm);
	return true;
}

function initPosts() {
	pPanel = $New('span', [
		$new('a', {Class: 'DESU_icn_hide', href: '#'}),
		$if(pr.on || oeForm, $new('a', {Class: 'DESU_icn_rep', href: '#'}))
	], {Class: 'DESU_postpanel'});
	opPanel = pPanel.cloneNode(true);
	opPanel.className += '_op';
	$append(opPanel, [
		$if(!TNum, $new('a', {Class: 'DESU_icn_expthr', href: '#'})),
		$new('a', {Class: 'DESU_icn_favor', href: '#'})
	]);
	$each($X('.//div[starts-with(@id,"oppost-")]', dForm),
		function(post, i) { Posts[Posts.length] = post; post.isOp = true; post.Count = 0; }
	, true);
	$each($X('.//table[starts-with(@id,"post-")]|.//div[starts-with(@id,"post-")]', dForm),
		function(post, i) { Posts[Posts.length] = post; post.isOp = false; post.Count = i + 1; }
	, true);
	forAll(function(post) {
		post.Msg = $x(xPostMsg, post);
		post.Num = post.id.match(/\d+/);
		post.Text = post.Msg.textContent.trim();
		post.Img = getImages(post);
		pByNum[post.Num] = post;
	});
}


/*=============================================================================
									MAIN
=============================================================================*/

function doScript() {
	var initTime = (new Date()).getTime();
	oldTime = initTime;
	if(!initBoard()) return;
	Log('initBoard');
	if(!initDelform()) return;
	Log('initDelform');
	readCfg(function() {
		Log();
		replaceDelform(dForm);
		Log('replaceDelform');
		initPosts();
		Log('initPosts');
		addPanel();
		Log('addPanel');
		readFavorites(function() {
			Log();
			doChanges();
			Log('doChanges');
			forAll(addPostButtons);
			Log('addPostButtons');
		});
		readPostsVisib(function() {
			Log();
			readViewedPosts();
			if(Cfg.navmrk != 0) Log('readViewedPosts');
			forAll(doPostFilters);
			Log('doPostFilters');
			if(Cfg.delhd == 1) { forAll(mergeHidden); Log('mergeHidden'); }
			if(Cfg.expimg != 0) { forAll(eventPostImg); Log('eventPostImg'); }
			if(Cfg.expost != 0 && !TNum) { forAll(expandPost); Log('expandPost'); }
			addLinkMP3();
			if(Cfg.mp3 != 0) Log('addLinkMP3');
			addLinkTube();
			if(Cfg.ytube != 0) Log('addLinkTube');
			addLinkImg();
			if(Cfg.addimg != 0) Log('addLinkImg');
			saveHiddenPosts();
			Log('saveHiddenPosts');
		});
		addRefMap();
		if(Cfg.navig === 2) Log('addRefMap');
		eventRefLink();
		if(Cfg.navig != 0) Log('eventRefLink');
		scriptCSS();
		Log('scriptCSS');
	});
}

if(window.opera) $event(doc, {DOMContentLoaded: doScript});
else doScript();
})(window.opera ? window.opera.scriptStorage : null);