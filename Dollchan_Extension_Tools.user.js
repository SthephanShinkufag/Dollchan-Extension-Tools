// ==UserScript==
// @name			Dollchan Extension Tools
// @version			12.2.8.1
// @namespace		http://www.freedollchan.org/scripts/*
// @author			Sthephan Shinkufag @ FreeDollChan
// @copyright		(C)2084, Bender Bending Rodriguez
// @description		Doing some profit for imageboards
// @icon			https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/raw/master/Icon.png
// @updateURL		https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/raw/master/Dollchan_Extension_Tools.meta.js
// @include			*
// ==/UserScript==

(function (scriptStorage) {
"use strict";  
var defaultCfg = {
	version:	'2012-02-08',
	lang:		0,		// script language [0=ru, 1=en]
	awipe:		1,		// antiwipe detectors:
	samel:		1,		//		same lines
	samew:		1,		//		same words
	specs:		0,		//		special symbols
	longp:		1,		//		long posts
	longw:		0,		//		long words
	nums:		1,		//		numbers
	caps:		0,		//		cAsE, CAPS
	spells:		0,		// hide posts by magic spells
	filthr:		1,		// filter threads
	menuhd:		1,		// menu on hide button
	viewhd:		1,		// view hidden on postnumber
	delhd:		0,		// delete hidden posts [0=off, 1=merge, 2=full hide]
	updthr:		1,		// update threads [0=off, 1=auto, 2=click+count, 3=click]
	updint:		2,		//		threads update interval
	updfav:		1,		//		favicon blinking, if new posts detected
	navig:		2,		// >>links navigation [0=off, 1=no map, 2=+refmap]
	navdel:		1,		//		delay [0=off, 1=on]
	navfix:		1,		//		previews placed by [0=mouse, 1=link]
	navmrk:		0,		//		mark viewed posts
	navhid:		0,		//		strike hidden posts in refmap
	expimg:		2,		// expand images by click [0=off, 1=in post, 2=by center]
	expost:		2,		// expand shorted posts [0=off, 1=auto, 2=on click]
	ctime:		0,		// correct time in posts
	ctmofs:		'-2',	//		offset
	ctmpat:		'',		//		pattern
	insnum:		1,		// insert >>link on postnumber click
	animp:		1,		// animated popups
	attach:		1,		// attach main panel
	icount:		1,		// show posts/images counter
	showmp:		0,		// show full main panel
	noname:		0,		// hide post names
	ospoil:		1,		// open spoilers
	noscrl:		1,		// hide scrollers in posts
	mp3:		1,		// mp3 player by links
	addimg:		1,		// add images by links
	ytube:		3,		// YouTube links embedder [0=off, 1=on click, 2=player, 3=preview+player, 4=only preview]
	ywidth:		360,	//		player height
	yheigh:		270,	//		player width
	yhdvid:		0,		//		hd video quality
	yptype:		0,		//		player type [0=flash, 1=HTML5 <iframe>, 2=HTML5 <video>]
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
};

var LngArray = {
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
	save:			['Сохранить', 'Save'],
	load:			['Загрузить', 'Load'],
	reset:			['Сброс', 'Reset'],
	version:		['Версия: ', 'Version: '],
	storage:		['\nХранение: ', '\nStorage: '],
	thrViewed:		['\n\nТредов просмотрено: ', '\n\nThreads viewed: '],
	thrCreated:		['\nТредов создано: ', '\nThreads created: '],
	pstSended:		['\nПостов отправлено: ', '\nPosts sended: '],
	total:			['\nВсего: ', '\nTotal: '],
	hiddenPosts:	['Скрытые посты', 'Hidden posts'],
	hiddenThrds:	['Скрытые треды', 'Hidden threads'],
	hiddenOnBoard:	['Скрытые треды этой доски', 'Hidden threads on this board'],
	onPage:			[' на странице', ' on page'],
	noHidOnBoard:	['На этой доске нет скрытых тредов', 'No hidden threads on this board'],
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
};

// Global vars
var Cfg = [], Lng = {}, Favor = {}, hThrds = {}, Stat = {};
var doc = document;
var Posts = [], oPosts = [], pByNum = [];
var Visib = [], Expires = [], refMap = [];
var pSpells = {}, tSpells = {}, oSpells = {}, spellsList = [];
var ajaxThrds = {}, ajaxPosts = [], ajaxInt;
var nav = {}, sav = {}, ch = {};
var kusaba, hanab, abu, tinyb, host, dm, brd, res, TNum, pageNum, docExt, pClass;
var cssFix, xDelForm, xPostRef, xPostMsg;
var pr = {}, dForm, oeForm, pArea, qArea, pPanel, opPanel, pView, dummy;
var quotetxt = '';
var docTitle, favIcon, favIconInt, isActiveTab = false, isExpImg = false;
var timePattern, timeRegex;
var oldTime, endTime, timeLog = '';
var stoargeLife = 5*24*3600*1000;
var homePage = 'http://www.freedollchan.org/scripts/';


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
	do el = el.nextSibling;
	while(el && el.nodeType != 1);
	return el;
}
function $prev(el) {
	do el = el.previousSibling;
	while(el && el.nodeType != 1);
	return el;
}
function $up(el, i) {
	i = i || 1;
	while(i--) el = el.parentNode;
	return el;
}
function $1(el) {
	return el.firstChild;
}
function $each(list, fn, dir) {
	if(!list) return;
	var k = list.snapshotLength;
	if(dir) for(var i = 0; i < k; i++) fn(list.snapshotItem(i), i);
	else while(k--) fn(list.snapshotItem(k), k);
}
function $html(el, htm) {
	var cln = el.cloneNode(false);
	cln.innerHTML = htm;
	el.parentNode.replaceChild(cln, el);
	return cln;
}
function $attr(el, attr) {
	for(var key in attr) {
		if(key == 'text') { el.textContent = attr[key]; continue; }
		if(key == 'value') { el.value = attr[key]; continue; }
		el.setAttribute(key, attr[key]);
	}
	return el;
}
function $event(el, events) {
	for(var key in events)
		el.addEventListener(key, events[key], false);
}
function $rattr(el, attr) {
	if(el.getAttribute(attr)) el.removeAttribute(attr);
	if(nav.Opera && el[attr]) el[attr] = '';
}
function $revent(el, events) {
	for(var key in events)
		el.removeEventListener(key, events[key], false);
}
function $append(el, nodes) {
	for(var i = 0, len = nodes.length; i < len; i++)
		if(nodes[i]) el.appendChild(nodes[i]);
}
function $before(el, nodes) {
	for(var i = 0, len = nodes.length; i < len; i++)
		if(nodes[i]) el.parentNode.insertBefore(nodes[i], el);
}
function $after(el, nodes) {
	var i = nodes.length;
	while(i--) if(nodes[i]) el.parentNode.insertBefore(nodes[i], el.nextSibling);
}
function $add(htm, events) {
	dummy.innerHTML = htm;
	var el = dummy.firstChild;
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
	return $new('input', {'type': 'button', 'value': val}, {'click': fn});
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
function $case(arr, def) {
	for(var i = 0, len = arr.length/2; i < len; i++)
		if(arr[i*2]) return arr[i*2 + 1];
	return def;
}
function $offset(el) {
	var box = el.getBoundingClientRect()
	return {
		top: Math.round(box.top + window.pageYOffset),
		left: Math.round(box.left + window.pageXOffset)
	}
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
	var scrtop = el.scrollTop;
	var start = el.selectionStart;
	var end = el.selectionEnd;
	el.value = el.value.substr(0, start) + text + el.value.substr(end);
	el.setSelectionRange(start + text.length, start + text.length);
	el.focus();
	el.scrollTop = scrtop;
}
function strToRegexp(str) {
	var t = str.match(/\/.*?[^\\]\/[ig]*/)[0];
	var l = t.lastIndexOf('/');
	return new RegExp(t.substr(1, l - 1), t.substr(l + 1));
}
function isEmptyObj(obj) {
	for(var i in obj)
		return false;
	return true;
}
String.prototype.trim = function() {
    var str = (this || '').replace(/^\s\s*/, ''), s = /\s/, i = str.length;
    while(s.test(str.charAt(--i)));
    return str.slice(0, i + 1);
};
function txtSelection() {
	return nav.Opera ? doc.getSelection() : window.getSelection().toString();
}
function $close(el) {
	if(!el) return;
	if(Cfg.animp == 0) { $del(el); return; }
	var h = el.clientHeight - 18;
	el.style.height = h + 'px';
	var i = 8;
	var closing = setInterval(function() {
		if(!el || i-- < 0) { clearInterval(closing); $del(el); return; }
		var s = el.style;
		s.opacity = i/10;
		s.paddingTop = parseInt(s.paddingTop) - 1 + 'px';
		s.paddingBottom = parseInt(s.paddingBottom) - 1 + 'px';
		var hh = parseInt(s.height) - h/10;
		s.height = (hh < 0 ? 0 : hh) + 'px';
	}, 35);
}
function $show(el) {
	var i = 0;
	if(Cfg.animp == 0) { el.style.opacity = 1; el.style.padding = '10px'; return; }
	var showing = setInterval(function() {
		if(!el || i++ > 8) { clearInterval(showing); return; }
		var s = el.style;
		s.opacity = i/10;
		s.paddingTop = parseInt(s.paddingTop) + 1 + 'px';
		s.paddingBottom = parseInt(s.paddingBottom) + 1 + 'px';
	}, 35);
}
function Log(txt) {
	var newTime = (new Date()).getTime();
	timeLog += txt + ': ' + (newTime - oldTime).toString() + 'ms\n';
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
	var arr = doc.cookie.split('; ');
	var i = arr.length;
	while(i--) {
		var one = arr[i].split('=');
		if(one[0] == escape(name)) return unescape(one[1]);
	}
	return false;
}

function turnCookies(name) {
	var data = getCookie('DESU_Cookies');
	var arr = data ? data.split('|') : [];
	arr[arr.length] = name;
	if(arr.length > 13) { setCookie(arr[0], '', 'delete'); arr.splice(0, 1); }
	setCookie('DESU_Cookies', arr.join('|'));
}

function getStored(name) {
	if(sav.GM) return GM_getValue(name);
	if(sav.script) return scriptStorage.getItem(name);
	if(sav.local) return localStorage.getItem(name);
	return getCookie(name);
}

function setStored(name, value) {
	if(sav.GM) { GM_setValue(name, value); return; }
	if(sav.script) { scriptStorage.setItem(name, value); return; }
	if(sav.local) { localStorage.setItem(name, value); return; }
	setCookie(name, value);
}

function getStoredObj(name, def) {
	try { return eval(getStored(name)) || def || {}; } catch(e) { return def || {}; }
}

function saveSpells(val) {
	spellsList = val.split('\n');
	setStored('DESU_Spells_' + dm, val);
	initSpells();
}

function fixGlobalCfg() {
	Cfg.forcap = (hanab || ch.tire || ch.vomb || ch.ment || ch._5ch) ? 2 : 1;
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

function readCfg() {
	var data = getStored('DESU_Config_' + dm);
	var global = false;
	if(sav.isGlobal && !isValidCfg(data)) { data = getStored('DESU_GlobalCfg'); global = true; }
	if(!isValidCfg(data)) setDefaultCfg();
	else Cfg = eval(data);
	for(var key in defaultCfg)
		if(Cfg[key] == null) Cfg[key] = defaultCfg[key];
	if(global) fixGlobalCfg();
	if(hanab) Cfg.updthr = Cfg.updfav = Cfg.expost = 0;
	if(nav.Chrome) Cfg.updfav = 0;
	if(Cfg.svsage == 0) Cfg.issage = 0;
	setStored('DESU_Config_' + dm, uneval(Cfg));
	for(var key in LngArray)
		Lng[key] = Cfg.lang == 0 ? LngArray[key][0] : LngArray[key][1];
	saveSpells(getStored('DESU_Spells_' + dm) || '');
	Stat = getStoredObj('DESU_Stat_' + dm, {view: 0, op: 0, reply: 0});
	if(TNum) Stat.view = parseInt(Stat.view) + 1;
	setStored('DESU_Stat_' + dm, uneval(Stat));
	if(Cfg.ctime) parseTimePattern();
}

function saveCfg(name, val) {
	Cfg[name] = val;
	setStored('DESU_Config_' + dm, uneval(Cfg));
}

function toggleCfg(name) {
	saveCfg(name, Cfg[name] == 0 ? 1 : 0);
}

function getVisib(pNum) {
	var key = !sav.cookie ? brd + pNum : pByNum[pNum].Count;
	if(key in Visib) return Visib[key];
	return null;
}

function readPostsVisib() {
	var data;
	var id = 'DESU_Posts_' + dm;
	if(!sav.cookie) {
		data = getStored(id);
		if(!data) return;
		var arr = data.split('-');
		var i = arr.length/3;
		while(i--)
			if((new Date()).getTime() < arr[i*3 + 2]) {
				Visib[arr[i*3]] = arr[i*3 + 1];
				Expires[arr[i*3]] = arr[i*3 + 2];
			} else setStored(id, arr.splice(i*3, 3).join('-'));
	} else if(TNum) {
		data = getStored(id + '_' + TNum);
		if(!data) return;
		for(var i = 0, len = data.length; i < len; i++)
			Visib[i + 2] = data[i];
	}
	forAll(function(post) { post.Vis = getVisib(post.Num); });
}

function savePostsVisib() {
	var id = 'DESU_Posts_' + dm;
	if(!sav.cookie) {
		var arr = [];
		for(var key in Visib) {
			if(!/^\d$/.test(Visib[key])) break;
			arr[arr.length] = key + '-' + Visib[key] + '-' + Expires[key];
		}
		setStored(id, arr.join('-'));
	} else if(TNum) {
		id += '_' + TNum;
		if(!getStored(id)) turnCookies(id);
		setStored(id, Visib.join(''));
	}
	toggleContent('hidd', true);
}

function readHiddenThreads() {
	hThrds = getStoredObj('DESU_Threads_' + dm);
}

function saveHiddenThreads(txt) {
	setStored('DESU_Threads_' + dm, txt || uneval(hThrds));
	toggleContent('hidd', true);
}

function toggleHiddenThread(post, vis) {
	if(post.Vis == vis) return;
	post.Vis = vis;
	var b = brd, tNum = parseInt(post.Num);
	if(sav.cookie) {
		if(!hThrds[b]) hThrds[b] = [];
		var i = hThrds[b].indexOf(tNum);
		if(i < 0) {
			if(vis == 0) hThrds[b].push(tNum);
			else hThrds[b].splice(i, 1);
		}
		if(encodeURIComponent(uneval(Favor)).length > 4095) hThrds[b].shift();
	} else {
		if(!hThrds[b]) hThrds[b] = {};
		if(vis == 0) hThrds[b][tNum] = getTitle(post).substring(0, 70);
		else {
			delete hThrds[b][tNum];
			if(isEmptyObj(hThrds[b])) delete hThrds[b];
		}
	}
	saveHiddenThreads();
}

function readFavorites() {
	Favor = getStoredObj('DESU_Favorites');
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
	if(!btn) return;
	readFavorites();
	var h = host, b = brd, tNum = post.Num;
	if(Favor[h] && Favor[h][b] && Favor[h][b][tNum]) removeFavorites(h, b, tNum);
	else {
		if(!Favor[h]) Favor[h] = {};
		if(!Favor[h][b]) Favor[h][b] = {};
		Favor[h][b][tNum] = {
			'cnt': getPstCount(getThread(post)),
			'txt': getTitle(post).substring(0, !sav.cookie ? 70 : 25)
		};
		if(sav.cookie && encodeURIComponent(uneval(Favor)).length > 4095)
			{ $alert(Lng.cookiesLimit); delete Favor[h][b][tNum]; return; }
		btn.className = 'DESU_icn_favset';
	}
	saveFavorites();
}

function markViewedPost(pNum) {
	var post = pByNum[pNum];
	if(post && (post.className).indexOf('viewed') == -1) post.className += ' viewed';
}

function readViewedPosts() {
	if(Cfg.navmrk == 0 || !sav.session) return;
	var arr = (sessionStorage.viewedPosts || '').split(',');
	for(var i in arr)
		markViewedPost(arr[i]);
}

function saveViewedPosts(pNum) {
	if(!sav.session) return;
	var arr = (sessionStorage.viewedPosts || '').split(',');
	arr.push(pNum);
	sessionStorage.viewedPosts = arr;
}

/*=============================================================================
							CONTROLS / COMMON CHANGES
=============================================================================*/

function addPanel() {
	var imgLen = getImages(dForm).snapshotLength;
	$before(dForm, [
		$new('div', {'style': 'clear:both'}),
		$New('div', [
			$new('a', {'id': 'DESU_btn_logo', 'href': '#'}, {
				'click': function(e) { $pD(e); toggleCfg('showmp'); scriptCSS(); }
			}),
			$New('div', [
				$new('a', {'id': 'DESU_btn_settings', 'title': Lng.settings, 'href': '#'}, {
					'click': function(e) { $pD(e); toggleContent('sett'); }
				}),
				$new('a', {'id': 'DESU_btn_hidden', 'title': Lng.hidden, 'href': '#'}, {
					'click': function(e) { $pD(e); toggleContent('hidd'); }
				}),
				$new('a', {'id': 'DESU_btn_favor', 'title': Lng.favorites, 'href': '#'}, {
					'click': function(e) { $pD(e); toggleContent('fav'); }
				}),
				$new('a', {'id': 'DESU_btn_refresh', 'title': Lng.refresh, 'href': '#'}, {
					'click': function(e) { $pD(e); window.location.reload(); },
					'mouseover': function() { if(!TNum) selectAjaxPages(); },
					'mouseout': removeSelMenu
				}),
				$new('a', {'id': 'DESU_btn_goback', 'title': Lng.goBack,
					'href': 'http://' + host + '/' + brd + '/'
						+ (pageNum > 1 ? ((pageNum - 1).toString() + docExt) : '')
				}),
				$if(!TNum, $new('a', {'id': 'DESU_btn_gonext', 'title': Lng.goNext,
					'href': 'http://' + host + '/' + brd + '/'
						+ (pageNum > 0 ? (pageNum + 1).toString() : 1) + docExt
				})),
				$new('a', {'id': 'DESU_btn_goup', 'title': Lng.goUp, 'href': '#'}, {
					'click': function(e) { $pD(e); window.scrollTo(0, 0); }
				}),
				$new('a', {'id': 'DESU_btn_godown', 'title': Lng.goDown, 'href': '#'}, {
					'click': function(e) { $pD(e); window.scrollTo(0, doc.body.offsetHeight); }
				}),
				$if(!TNum && (pr.on || oeForm), $new('a', {
					'id': 'DESU_btn_newthr', 'title': Lng.newThread, 'href': '#'}, {
					'click': toggleMainReply
				})),
				$if(imgLen > 0, $new('a', {
					'id': 'DESU_btn_expimg', 'title': Lng.expImages, 'href': '#'}, {
					'click': function(e) {
						$pD(e);
						Cfg.expimg = 1;
						isExpImg = !isExpImg;
						forAll(function(post) { expandAllPostImg(post, isExpImg); });
					}
				})),
				$if(pr.file || oeForm, $new('a', {
					'id': 'DESU_btn_maskimg', 'title': Lng.maskImages, 'href': '#'}, {
					'click': function(e) { $pD(e); toggleCfg('mask'); scriptCSS(); }
				})),
				$if(TNum && (Cfg.updthr == 1 || Cfg.updthr == 2), $new('a', {
					'id': 'DESU_btn_updon', 'title': Lng.autoupd, 'href': '#'}, {
					'click': function(e) {
						$pD(e);
						if(ajaxInt) endPostsUpdate();
						else { this.id = 'DESU_btn_updon'; initPostsUpdate(); }
					}
				})),
				$if(ch.nul, $new('a', {
					'id': 'DESU_btn_catalog',
					'title': Lng.goCatalog,
					'href': 'http://0chan.ru/' + brd +'/catalog.html',
					'target': '_blank'
				}))
			], {'id': 'DESU_panel_btns'}),
			$if(TNum, $New('div', [$new('span', {'title': Lng.postsImages,
				'text': parseInt(Posts.length + 1) + '/' + imgLen
			})], {'id': 'DESU_panel_info'}))
		], {'id': 'DESU_panel'}),
		$new('div', {'id': 'DESU_content'}),
		$new('div', {'id': 'DESU_alertbox'}),
		$new('hr', {'style': 'clear:both'})
	]);
}

function toggleContent(name, isUpd) {
	var el = $id('DESU_content');
	var id = 'DESU_content_' + name;
	if(isUpd && el.className != id) return;
	el.innerHTML = '';
	if(!isUpd && el.className == id) { el.className = 'DESU_content'; return; }
	el.className = id;
	if(Cfg.attach == 0) el.appendChild($new('hr', {'style': 'clear:both'}));
	if(name != 'sett') {
		el.appendChild($add('<table><tbody align="left"></tbody></table>'));
		if(Cfg.attach == 1)
			$t('table', el).style.backgroundColor = getStyle($t('body'), 'background-color');
		if(name == 'hidd') addHiddenTable();
		if(name == 'fav') addFavoritesTable();
	} else addSettings();
}

function addSettings() {
	spellsList = (getStored('DESU_Spells_' + dm) || '').split('\n');
	initSpells();
	var lBox = function(name, txt, fn, id) {
		var el = $new('input', {'type': 'checkbox'}, {
			'click': function() { toggleCfg(name); if(fn) fn(); }
		});
		el.checked = Cfg[name] == 1;
		if(id) el.id = id;
		return $New('label', [el, $txt(' ' + txt)]);
	};
	var divBox = function(name, txt, fn, id) {
		return $New('div', [lBox(name, txt, fn, id)]);
	};
	var inpTxt = function(name, size, fn) {
		return $new('input', {
			'type': 'text', 'id': 'DESU_' + name, 'size': size, 'value': Cfg[name]}, {
			'keyup': function() {
				saveCfg(name, $id('DESU_' + name).value.replace(/\|/g, ''));
				if(fn) fn(); 
			}
		})
	};
	var optSel = function(name, arr, txt, fn) {
		var opt = [];
		for(var i = 0; i < arr.length; i++)
			opt[i] = '<option value="' + i + '">' + arr[i] + '</option>';
		var el = $add('<select id="' + name + '_sel">' + opt.join('') + '</select>', {
			'change': (fn ? fn : function() { saveCfg(name, this.selectedIndex); })
		});
		el.selectedIndex = Cfg[name];
		return $New('label', [el, $txt(' ' + txt)]);
	};
	$append($id('DESU_content'), [
		$New('div', [
			$new('div', {'id': 'DESU_sett_head', 'text': 'Dollchan Extension Tools'}, {
				'click': function() { $alert('<div style="display:inline-block; vertical-align:top; padding:0 10px 0 0">' + Lng.version + Cfg.version + Lng.storage + $case([sav.GM, 'Mozilla config', sav.local, 'Local Storage', sav.script, 'Opera ScriptStorage'], 'Cookies') + Lng.thrViewed + Stat.view + Lng.thrCreated + Stat.op + Lng.pstSended + Stat.reply + '</div><div style="display:inline-block; vertical-align:top; padding:0 0 0 10px; border-left:1px solid grey">' + timeLog + Lng.total + endTime + 'ms</div><div><a href="' + homePage + '" target="_blank">' + homePage + '</a></div>'); }
			}),
			$new('div', {'class': pClass, 'id': 'DESU_sett_main'})
		], {'id': 'DESU_sett_body'})
	]);
	$append($id('DESU_sett_main'), [
		$New('div', [
			lBox('spells', Lng.spells, toggleSpells, 'DESU_spelledit_ch'),
			$New('span', [
				$new('a', {'text': Lng.add, 'href': '#'}, {
					'click': $pD,
					'mouseover': selectSpell,
					'mouseout': removeSelMenu
				}),
				$new('a', {'text': Lng.apply, 'href': '#'}, {
					'click': function(e) { $pD(e); applySpells(); }
				}),
				$new('a', {'text': Lng.clear, 'href': '#'}, {
					'click': function(e) { $pD(e); $id('DESU_spelledit').value = ''; applySpells(); }
				}),
				$new('a', {'text': '?', 'target': '_blank', 'href': homePage + 'spells'})
			], {'id': 'DESU_spellpanel'}),
			$new('textarea', {
				'id': 'DESU_spelledit', 'rows': 7, 'cols': 56, 'value': spellsList.join('\n')
			})
		]),
		$New('div', [
			lBox('awipe', Lng.antiWipe),
			$btn('>', function() { $disp($id('DESU_wipebox')); })
		]),
		$New('div', [
			divBox('samel', Lng.sameLines),
			divBox('samew', Lng.sameWords),
			divBox('specs', Lng.specSymbols),
			divBox('longp', Lng.longPosts),
			divBox('longw', Lng.longWords),
			divBox('nums', Lng.numbers),
			divBox('caps', Lng.caps)
		], {'id': 'DESU_wipebox', 'style': 'display:none; padding-left:15px'}),
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
			$if(!nav.Chrome, lBox('updfav', Lng.indication)),
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
		], {'id': 'DESU_pviewbox', 'style': 'display:none; padding-left:15px'}),
		$New('div', [optSel('expimg', Lng.selImgExpand, Lng.imgExpand)]),
		$if(!hanab, $New('div', [optSel('expost', Lng.selClickAuto, Lng.expandPosts)])),
		$New('div', [
			lBox('ctime', Lng.cTime, toggleTimeSettings, 'DESU_ctime'),
			$btn('>', function() { $disp($id('DESU_ctimebox')); })
		]),
		$New('div', [
			$New('div', [inpTxt('ctmofs', 3), $new('span', {'text': Lng.cTimeOffset})]),
			$New('div', [
				inpTxt('ctmpat', 30),
				$txt(' '),
				$new('a', {'text': Lng.cTimePattern, 'href': '#'}, {
					'click': function(e) { $pD(e); $alert('"s" - second (one digit),\n"i" - minute (one digit),\n"h" - hour (one digit),\n"d" - day (one digit),\n"n" - month (one digit),\n"m" - month (string),\n"y" - year (one digit),\n"-" - any symbol\n"?" - previous char may not be\n\nExamples:\niichan.ru: "----dd-m-yyyy-hh-ii-ss"\ndobrochan.ru: "dd-m-?-?-?-?-?-yyyy-------hh-ii-?s?s?"\n410chan.org: "dd-nn-yyyy-------hh-ii-ss"\n4chan.org: "nn-dd-yy-----hh-ii-?s?s?"\n4chon.net: "nn-dd-yy-------hh-ii-ss"\nkrautchan.net: "yyyy-nn-dd-hh-ii-ss"'); }
				})
			])
		], {'id': 'DESU_ctimebox', 'style': 'display:none; padding-left:15px'}),
		divBox('insnum', Lng.insertLink),
		divBox('animp', Lng.animatePopup),
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
		], {'id': 'DESU_ytubebox', 'style': 'display:none; padding-left:15px'}),
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
			$if(sav.isGlobal && isValidCfg(getStored('DESU_GlobalCfg')), $btn(Lng.load, function() {
				setStored('DESU_Config_' + dm, '');
				window.location.reload();
			})),
			$if(sav.isGlobal, $btn(Lng.save, function() {
				setStored('DESU_GlobalCfg', uneval(Cfg));
				toggleContent('sett', true);
			})),
			$btn(Lng.edit, function() {
				var el = $id('DESU_cfgedit');
				el.value = getStored('DESU_Config_' + dm);
				$disp($up(el));
			}),
			$btn(Lng.reset, function() {
				setDefaultCfg();
				setStored('DESU_Stat_' + dm, '');
				setStored('DESU_Favorites', '');
				setStored('DESU_Threads_' + dm, '');
				saveSpells('');
				window.location.reload();
			})
		], {'style': 'float:right'}),
		$new('br', {'style': 'clear:both'}),
		$New('div', [
			$new('textarea', {'id': 'DESU_cfgedit', 'rows': 10, 'cols': 56,
				'value': getStored('DESU_Config_' + dm)
			}),
			$btn(Lng.save, function() {
				setStored('DESU_Config_' + dm, $id('DESU_cfgedit').value.trim());
				window.location.reload();
			})
		], {'style': 'display:none'})
	]);
}

function addHiddenTable() {
	readHiddenThreads();
	var table = $x('.//div[@id="DESU_content"]//tbody');
	var clones = [], tcnt = 0, pcnt = 0;
	forAll(function(post) { if(post.Vis == 0) {
		var pp = !post.isOp;
		var cln = $attr(($id('DESU_hiddenthr_' + post.Num) || post).cloneNode(true), {'id': ''});
		clones.push(cln);
		cln.style.display = '';
		cln.pst = post;
		cln.vis = 0;
		$event($x(pp ? './/a[@class="DESU_icn_unhide"]' : './/a', cln), {
			'click': function(el) { return function(e) {
				$pD(e);
				el.vis = (el.vis == 0) ? 1 : 0;
				if(pp) togglePost(el, el.vis);
				else $next(el).style.display = el.vis == 1 ? '' : 'none';
			}}(cln)
		});
		if(Cfg.attach == 0) $event($x(xPostRef, cln) || $x('.//a', cln), {
			'mouseover': function(el) { return function() {
				if(el.vis == 0) {
					if(pp) togglePost(el, 1);
					else $next(el).style.display = '';
				}
			}}(cln),
			'mouseout': function(el) { return function() {
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
				'style': 'display:none; padding-left:15px; overflow:hidden; border:1px solid grey'
			}))])
		]);
		if(!pp) togglePost($next(cln), 1);
	}});
	if(pcnt + tcnt == 0) table.insertRow(-1).appendChild($add('<b>' + Lng.noHidOnPage + '</b>'));
	else $append(table.insertRow(-1), [
		$btn(Lng.expandAll, function() {
			if(this.value == Lng.expandAll) {
				this.value = Lng.undo;
				for(var cln, i = 0; cln = clones[i++];)
					setPostVisib(cln.pst, 1);
			} else {
				this.value = Lng.expandAll;
				for(var cln, i = 0; cln = clones[i++];)
					setPostVisib(cln.pst, cln.vis);
			}
		}),
		$btn(Lng.save, function() {
			for(var cln, i = 0; cln = clones[i++];)
				if(cln.vis != 0) setPostVisib(cln.pst, 1);
			savePostsVisib();
		}),
	]);
	table.insertRow(-1).appendChild($new('hr'));
	if(hThrds[brd]) {
		table.insertRow(-1).appendChild($add('<b>' + Lng.hiddenOnBoard + ':</b>'));
		for(var b in hThrds) for(var tNum in hThrds[b])
			$append(table, [$New('tr', [
				$New('div', [
					$new('input', {'type': 'checkbox'}),
					$add('<a href="' + getThrdUrl(host, b, tNum)
						+ '" target="_blank">№' + tNum + '</a>'
					),
					$if(!sav.cookie, $txt(' - ' + hThrds[b][tNum]))
				], {'class': pClass})
			], {'class': 'DESU_hthrdata', 'id': 'DESU_hthrdata_' + tNum})]);
	} else table.insertRow(-1).appendChild($add('<b>' + Lng.noHidOnBoard + '</b>'));
	$append(table, [
		$New('tr', [
			$btn(Lng.edit, function() { $disp($up($id('DESU_hthredit'))); }),
			$btn(Lng.remove, function() {
				$each($X('.//tr[@class="DESU_hthrdata"]', table), function(el) {
					if($t('input', el).checked) {
						var tNum = el.id.substr(14);
						unhideThread(pByNum[tNum]);
						delete hThrds[b][tNum];
						if(isEmptyObj(hThrds[b])) delete hThrds[b];
					}
				});
				saveHiddenThreads();
			})
		]),
		$New('tr', [
			$new('textarea', {'id': 'DESU_hthredit', 'rows': 9, 'cols': 70, 'value': uneval(hThrds)}),
			$btn(Lng.save, function() { saveHiddenThreads($id('DESU_hthredit').value); }),
		], {'style': 'display:none'})
	]);
	eventRefLink(table);
}

function addFavoritesTable() {
	readFavorites();
	var table = $x('.//div[@id="DESU_content"]//tbody');
	var cnt, txt, oldh, oldb;
	for(var h in Favor) for(var b in Favor[h]) for(var tNum in Favor[h][b]) {
		cnt = Favor[h][b][tNum].cnt;
		txt = Favor[h][b][tNum].txt;
		if(h != oldh || b != oldb) $append(table, [$New('tr', [
			$new('input', {'type': 'checkbox'}, {'click': function() {
				var inp = this;
				$each($X('.//tr[contains(@id,"_' + $up(inp).id.substr(13) + '|")]/div/input', table),
					function(el) { el.checked = inp.checked; }
				);
			}}),
			$add('<a href="http://' + h + '/' + b + '" target="_blank">' + h + '/' + b + '</a>')
		], {'class': 'DESU_favhead', 'id': 'DESU_favhead_' + h + '|' + b})]);
		oldh = h; oldb = b;
		$append(table, [$New('tr', [
			$New('div', [
				$new('input', {'type': 'checkbox'}),
				$if(h == host || sav.GM, $new('a', {'class': 'DESU_icn_expthr', 'href': '#"'}, {
					'click': loadFavorThread
				})),
				$add('<a href="' + getThrdUrl(h, b, tNum) + '" target="_blank">№' + tNum + '</a>'),
				$txt(' - ' + txt),
				$add('<span class="DESU_favpcount">[<span>' + cnt + '</span>]</span>')
			], {'class': pClass}),
			$new('div', {'id': tNum, 'class': 'thread', 'style': 'display:none'})
		], {'class': 'DESU_favdata', 'id': 'DESU_favdata_' + h + '|' + b + '|' + tNum})]);
	}
	if(!$1(table)) table.insertRow(-1).appendChild($add('<b>' + Lng.noFavorites + '</b>'));
	var list = $X('.//tr[@class="DESU_favdata"]', table);
	$append(table, [
		$New('tr', [
			$new('hr'),
			$btn(Lng.edit, function() { $disp($up($id('DESU_favoredit'))); }),
			$btn(Lng.info, function() {
				$each(list, function(el) {
					var arr = el.id.substr(13).split('|');
					if(host != arr[0]) return;
					var c = $x('.//span[@class="DESU_favpcount"]/span', el);
					$attr(c, {'class': 'DESU_icn_wait', 'text': ''});
					AJAX(null, arr[1], arr[2], function(err) {
						var cnt = err || ajaxThrds[arr[2]].keys.length;
						$attr(c, {'class': '', 'text': cnt});
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
					if($t('input', el).checked) {
						var arr = el.id.substr(13).split('|');
						removeFavorites(arr[0], arr[1], arr[2]);
					}
				});
				saveFavorites();
			})
		]),
		$New('tr', [
			$new('textarea', {'id': 'DESU_favoredit', 'rows': 9, 'cols': 70, 'value': uneval(Favor)}),
			$btn(Lng.save, function() { saveFavorites($id('DESU_favoredit').value); })
		], {'style': 'display:none'})
	]);
}

function $alert(txt, id) {
	var el, nid = 'DESU_alert';
	if(id) { nid += '_' + id; el = $id(nid); }
	if(!el) {
		el = $add('<div class="' + pClass + '" id="' + nid + '" style="opacity:0">' + (id == 'wait'
			? '<span class="DESU_icn_wait">&nbsp;</span>'
			: '<a href="#" style="display:inline-block; vertical-align:top; font-size:150%">× </a>')
			+ '<div style="display:inline-block; margin-top:4px"></div></div>'
		);
		$event($1(el), {'click': function(e) { $pD(e); $close($up(this)); }});
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
		'mouseout': removeSelMenu
	}));
	return $X('.//div[@id="DESU_select"]/a');
}

function selectSpell(e) {
	$each(addSelMenu(e.target, [
		'#b/', '#b/itt', '#exp ', '#exph ', '#img ', '#imgn ', '#name ', '#noimg', '#notxt',
		'#num ', '#op', '#outrep', '#rep ', '#sage', '#skip ', '#tmax ', '#trip']), function(a) {
			$event(a, {'click': function(e) {
				$pD(e);
				var exp = this.textContent;
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
	if(Cfg.menuhd == 0 || Cfg.filthr == 0 && post.isOp) return;
	var a = addSelMenu($1(post.Btns), Lng.selHiderMenu);
	$event(a.snapshotItem(0), {
		'click': function(e) { $pD(e); applySpells(quotetxt); },
		'mouseover': function() { quotetxt = txtSelection().trim(); }
	});
	$event(a.snapshotItem(1), {'click': function(e) {
		$pD(e);
		applySpells(post.Img.snapshotLength == 0
			? '#noimg' : '#img =' + getImgWeight(post) + '@' + getImgSize(post).join('x'))
	}});
	$event(a.snapshotItem(2), {'click': function(e) { $pD(e); hideBySameText(post); }});
}

function selectExpandThread(post) {
	$each(addSelMenu($x('a[3]', post.Btns), Lng.selExpandThrd), function(a) {
		$event(a, {'click': function(e) { $pD(e); loadThread(post, parseInt(this.textContent)); }});
	});
}

function selectAjaxPages() {
	$each(addSelMenu($id('DESU_btn_refresh'), Lng.selAjaxPages), function(a, i) {
		$event(a, {'click': function(e) { $pD(e); loadPages(i + 1); }});
	});
}

/*-------------------------------Changes in postform-------------------------*/

function refreshCapSrc(src, tNum) {
	if(kusaba || ch._5ch)
		src = src.replace(/\?[^?]+$|$/, (!ch._410 ? '?' : '?board=' + brd + '&') + Math.random());
	else {
		if(tNum > 0) src = src.replace(/mainpage|res\d+/ig, 'res' + tNum);
		src = src.replace(/dummy=\d*/, 'dummy=' + rand10());
	}
	return src;
}

function refreshCapImg(tNum) {
	var img = pr.recap ? $id('recaptcha_image') || pr.cap : $x(pr.tr + '//img', pr.cap);
	if(!hanab && !pr.recap) {
		var src = refreshCapSrc(img.getAttribute('src'), tNum);
		img.src = '';
		img.src = src;
	} else {
		var e = doc.createEvent('MouseEvents');
		e.initEvent('click', true, true);
		img.dispatchEvent(e);
	}
}

function doSageBtn() {
	var c = Cfg.issage == 1;
	$id('DESU_sagebtn').innerHTML = '&nbsp;' + (c
		? '<a class="DESU_icn_sage" href="#"></a><b style="color:red">SAGE</b>'
		: '<i>(no&nbsp;sage)</i>');
	if(pr.mail.type == 'text') pr.mail.value = c ? 'sage' : (ch.fch ? 'noko' : '');
	else pr.mail.checked = c;
}

function setUserName() {
	saveCfg('namval', $id('DESU_fixedname').value.replace(/\|/g, ''));
	pr.name.value = $id('DESU_fixedname_ch').checked ? Cfg.namval : '';
}

function setUserPassw() {
	var el = $id('DESU_fixedpass');
	if(el) saveCfg('pasval', el.value.replace(/\|/g, ''));
	var val = Cfg.passw == 1 ? Cfg.pasval : rand10().substring(0, 8);
	el = $X('.//input[@type="password"]').snapshotItem(1);
	if(el) el.value = val;
	pr.passw.value = val;
}

function doChanges() {
	if(TNum) {
		docTitle = '/' + brd + ' - ' + getTitle(oPosts[0]).substring(0, 77);
		doc.title = docTitle;
		$event(window, {
			'blur': function() { isActiveTab = false; },
			'focus': function() {
				isActiveTab = true;
				if(Cfg.updfav == 1 && favIcon) {
					clearInterval(favIconInt);
					var head = $t('head');
					$Del('.//link[@rel="shortcut icon"]', head);
					head.appendChild($new('link', {'href': favIcon, 'rel': 'shortcut icon'}));
				}
				if(Cfg.updthr == 1) setTimeout(function() { doc.title = docTitle; }, 0);
			}
		});
		initPostsUpdate();
		if(Cfg.updthr == 2 || Cfg.updthr == 3) $after($x('.//div[@class="thread"]'), [
			$add('<span id="DESU_getnewposts">[<a href="#">' + Lng.getNewPosts + '</a>]</span>', {
				'click': function(e) { $pD(e); loadNewPosts(true); }
			})
		]);
	} else window.scrollTo(0, 0);
	if(abu) {
		$Del('.//*[starts-with(@id,"ABU_")]|.//small[starts-with(@id,"rfmap")]', dForm);
		var el = $id('linkThreadUpdate');
		if(el) { $del(el.previousSibling); $del(el.nextSibling); $del(el); }
	} else $event(window, {'load': function() {
		setTimeout(function() {
			if(ch.nul) $Del('.//div[@class="replieslist"]', dForm);
			else $Del('.//small[starts-with(@id,"rfmap")]|.//i[@class="abbrev"]', dForm);
		}, 0);
	}});
	if(ch.fch && !TNum) $each($X('.//table[@class="pages"]//form'), function(el) {
		$next(el).appendChild($attr(el, {'style': 'margin-bottom:0'}));
		el.appendChild($prev(el));
	});
	qArea = $new('div', {'id': 'DESU_qarea', 'class': pClass, 'style': 'display:none'});
	pArea = $New('center', [
		$New('div', [
			$txt('['),
			$new('a', {'text': Lng.expandForm, 'href': '#'}, {'click': toggleMainReply}),
			$txt(']')
		], {'id': 'DESU_togglereply', 'style': 'display:none'}),
		$New('div', [pr.form, oeForm], {'id': 'DESU_pform'}),
		$new('hr')
	], {'id': 'DESU_parea'});
	if(TNum && Cfg.pform == 2 || !TNum && Cfg.tform == 1) $disp(pArea);
	if(TNum && Cfg.pform == 1) $after(!ch.fch ? dForm : $t('hr', dForm), [pArea]);
	else $before(dForm, [pArea]);
	if(pr.on) doPostformChanges();
	else if(oeForm) AJAX(null, brd, oPosts[0].Num, doPostformChanges);
}

function doPostformChanges() {
	if(!ch.fch && pr.subm.nextSibling) $delNx(pr.subm);
	$each($X('.//input[@type="text"]', pr.form), function(el) { el.size = 35; });
	$event(pr.subm, {'click': function(e) {
		if(Cfg.verify == 1) $alert(Lng.checking, 'wait');
		if(Cfg.addfav == 1 && pr.tNum)
			toggleFavorites(pByNum[pr.tNum], $x('a[@class="DESU_icn_favor"]', pByNum[pr.tNum].Btns));
		var txt = pr.txta.value;
		pr.txta.value = (Cfg.spells == 0 || !oSpells.outrep[0] ? txt : doReplace(oSpells.outrep, txt))
			+ (Cfg.sign == 1 && Cfg.sigval != '' ? '\n' + Cfg.sigval : '');
		if(pr.tNum) Stat.reply = parseInt(Stat.reply) + 1;
		else Stat.op = parseInt(Stat.op) + 1;
		setStored('DESU_Stat_' + dm, uneval(Stat));
		if(ch.nul && pr.isQuick) {
			$disp(qArea);
			$after($id('DESU_togglereply'), [$id('DESU_pform')]);
		} 
	}});
	addTextPanel();
	var el = pr.txta;
	el.style.cssText = 'width:' + Cfg.texw + 'px; height:' + Cfg.texh + 'px';
	$event(el, {'keypress': function(e) {
		var code = e.charCode || e.keyCode;
		if((code == 33 || code == 34) && e.which == 0) { e.target.blur(); window.focus(); }
	}});
	var resMove = function(e) {
		el.style.width = e.pageX - $offset(el).left + 'px';
		el.style.height = e.pageY - $offset(el).top + 'px';
	};
	var resStop = function() {
		$revent(doc.body, {'mousemove': resMove, 'mouseup': resStop});
		saveCfg('texw', parseInt(el.style.width));
		saveCfg('texh', parseInt(el.style.height));
	};
	$after(el, [$new('div', {'class': 'DESU_txtresizer'}, {'mousedown': function(e) {
		$pD(e); $event(doc.body, {'mousemove': resMove, 'mouseup': resStop});
	}})]);
	if(Cfg.nogoto == 1 && pr.gothr) $disp(pr.gothr);
	if(Cfg.nopass == 1 && pr.passw) $disp($x(pr.tr, pr.passw));
	if(Cfg.name == 1 && pr.name) setTimeout(function() { pr.name.value = Cfg.namval; }, 0);
	if(pr.passw) setTimeout(setUserPassw, 0);
	if(pr.recap) {
		$attr(pr.subm, {'onclick': 'Recaptcha.focus_response_field = function() {}'});
		el = $id('recaptcha_image');
		if(el) $attr(el, {'onclick': 'Recaptcha.reload()', 'style': 'width:300px; cursor:pointer'});
		el = $id('recaptcha_reload_btn');
		if(el) $disp($up(el));
	}
	if(pr.cap) {
		setTimeout(function() { if(abu) refreshCapImg(); $rattr(pr.cap, 'onclick'); }, 0);
		$rattr(pr.cap, 'onfocus');
		$rattr(pr.cap, 'onkeypress');
		$event($attr(pr.cap, {'autocomplete': 'off'}), {'keypress': function(e) {
			if(Cfg.forcap == 0 || e.which == 0) return;
			var code = e.charCode || e.keyCode;
			var ru = 'йцукенгшщзхъфывапролджэячсмитьбюё';
			var en = 'qwertyuiop[]asdfghjkl;\'zxcvbnm,.`';
			var chr = String.fromCharCode(code).toLowerCase();
			var i = en.length;
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
			var img = $x('.//a|.//img', $x(pr.tr, pr.cap));
			var src;
			if(kusaba) src = $case([
				ch._410, '/faptcha.php?board=' + brd,
				ch.hid, '/securimage/securimage_show.php?' + Math.random()
			], '/' + brd.substr(0, brd.indexOf('/') + 1) + 'captcha.php?' + Math.random());
			else {
				var img = $x(pr.tr + '//img', pr.cap);
				src = img ? img.src : '/' + brd + '/captcha.pl?key=mainpage&amp;dummy=' + rand10();
			}
			var _img = $new('img', {
				'alt': Lng.loading,
				'title': Lng.refresh,
				'style': 'display:block; border:none; cursor:pointer',
				'src': refreshCapSrc(src, TNum || 0)}, {
				'click': function() { refreshCapImg(TNum || 0); }
			});
			if(img) $up(img).replaceChild(_img, img);
			else { $delNx(pr.cap); $after(pr.cap, [_img]); }
		}
	}
	if(Cfg.sagebt == 1 && pr.mail) {
		var sageBtn = $new('span', {'id': 'DESU_sagebtn'}, {
			'click': function(e) { e.stopPropagation(); $pD(e); toggleCfg('issage'); doSageBtn(); }
		});
		var m = $x('ancestor::label', pr.mail) || pr.mail;
		if($next(m) || $prev(m)) { $disp(m); $after(m, [sageBtn]); }
		else { $disp($x(pr.tr, pr.mail)); $after(pr.name || pr.file, [sageBtn]); }
		setTimeout(doSageBtn, 0);
	}
	if(Cfg.verify == 1) {
		var load = nav.Opera ? 'DOMFrameContentLoaded' : 'load';
		$after($id('DESU_content'), [
			$add('<iframe name="DESU_iframe" id="DESU_iframe" src="about:blank" />', {
				load: function() { setTimeout(iframeLoad, 500); }
			}
		)]);
		$rattr($attr(pr.form, {'target': 'DESU_iframe'}), 'onsubmit');
		if(ch.nul) pr.form.action = 'http://www.0chan.ru/board.php?dir=b';
	}
}

/*------------------------------Onsubmit reply check-------------------------*/

function iframeLoad() {
	var frm = $id('DESU_iframe');
	try { frm = frm.contentDocument; if(!frm || !frm.body || !frm.body.innerHTML) return; }
	catch(e) { $close($id('DESU_alert_wait')); $alert('Iframe error:\n' + e); return; }
	var xp, err, path = frm.location.pathname;
	if(hanab && /error/.test(path)) xp = './/td[@class="post-error"]';
	if(ch.krau && path == '/post') xp = './/td[starts-with(@class,"message_text")]';
	if(abu && !frm.getElementById('delform')) xp = './/font[@size="5"]';
	if(xp || !$t('form', frm)) {
		var txt = '';
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
			var tNum = pr.tNum;
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
				+ $case([ch.fch || ch.gazo, 'resto', tinyb, 'thread'], 'parent') + '">'
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
	if(!pr.isQuick) return;
	pr.isQuick = false;
	if(!TNum) { toggleQuickReply(); $del($x('.//input[@id="thr_id"]', pr.form)); }
	var el = $id('DESU_togglereply');
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
	if(/Reply|Ответ/.test(e.target.textContent)) return;
	e.stopPropagation(); $pD(e);
	var pNum = getPost(e.target).id.match(/\d+/)
	if(!TNum && Cfg.tform == 1 && !pr.isQuick) pArea.style.display = '';
	if(TNum && Cfg.pform == 2 && !pr.isQuick) showQuickReply(pByNum[pNum]);
	else insertInto(pr.txta, '>>' + pNum);
}

/*----------------------------Text formatting buttons------------------------*/

function tfBtn(id, title, wktag, bbtag, val) {
	var x = pr.txta;
	var btn = $new('span', {'id': id, 'title': title});
	if(Cfg.txtbtn == 2)
		btn.innerHTML = '<a href="#">' + val + '</a>' + (val != '&gt;' ? ' / ' : '');
	if(Cfg.txtbtn == 3)
		btn.innerHTML = '<input type="button" value="' + val + '" style="font-weight:bold" />';
	if(val != '&gt;') $event(btn, {'click': function(e) {
		$pD(e);
		var tag1, tag2;
		if(kusaba || abu || ch.krau || ch.fch && wktag == '%%') {
			tag1 = '[' + bbtag + ']';
			tag2 = '[/' + bbtag + ']';
		} else tag1 = tag2 = wktag;
		var start = x.selectionStart, end = x.selectionEnd, scrtop = x.scrollTop;
		var text = x.value.substring(start, end).split('\n');
		var i = text.length;
		while(i--) {
			if(tag1 == '') {
				var j = text[i].trim().length;
				while(j--) tag2 += '^H';
			}
			var len = end + tag1.length + tag2.length;
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
		'mouseover': function() { quotetxt = txtSelection(); },
		'click': function(e) {
			$pD(e);
			var start = x.selectionStart, end = x.selectionEnd;
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
		tfBtn('DESU_btn_strike', Lng.strike, !ch._410 ? '' : '^^', 's', 'S'),
		tfBtn('DESU_btn_spoiler', Lng.spoiler, '%%', 'spoiler', '%'),
		tfBtn('DESU_btn_code', Lng.code, '`', !ch.krau ? 'code' : 'aa', 'C'),
		tfBtn('DESU_btn_quote', Lng.quote, '', '', '&gt;'),
		$if(Cfg.txtbtn == 2, $txt(' ]'))
	], {'id': 'DESU_textpanel'})]);
}

/*--------------------------------Time correction-----------------------------*/

function toggleTimeSettings() {
	var el = $id('DESU_ctime');
	if(el.checked && (!/^[+-][0-9]{1,2}$/.test(Cfg.ctmofs) || !parseTimePattern())) {
		$alert(Lng.cTimeError);
		saveCfg('ctime', 0);
		el.checked = false;
	}
}

function parseTimePattern() {
	if(/[^\?\-sihdmny]|mm/.test(Cfg.ctmpat)) return false;
	timeRegex = Cfg.ctmpat.replace(/\-/g, '[^<]').replace(
		/([sihdny]+)/g, '($1)').replace(/[sihdny]/g, '[0-9]').replace(/\m/g, '([a-zA-Zа-яА-Я]+)');
	timePattern = Cfg.ctmpat.replace(/[\?\-]+/g, '').replace(/([a-z])\1+/g, '$1');
	return true;
}

function fixTime(txt) {
	var arr = [];
	var a, t, second, minute, hour, day, month, year, dtime;
	return txt.replace(new RegExp(timeRegex, 'g'), function(str, a1, a2, a3, a4, a5, a6) {
		arr = [a1, a2, a3, a4, a5, a6];
		for(var i = 0; i < 6; i++) {
			a = arr[i];
			t = timePattern[i];
			if(t == 's') second = a;
			else if(t == 'i') minute = a;
			else if(t == 'h') hour = a;
			else if(t == 'd') day = a;
			else if(t == 'n') month = a - 1;
			else if(t == 'y') year = a;
			else if(t == 'm') {
				if(/янв|jan/i.test(a)) month = 0;
				else if(/фев|feb/i.test(a)) month = 1;
				else if(/мар|mar/i.test(a)) month = 2;
				else if(/апр|apr/i.test(a)) month = 3;
				else if(/май|may/i.test(a)) month = 4;
				else if(/июн|jun/i.test(a)) month = 5;
				else if(/июл|jul/i.test(a)) month = 6;
				else if(/авг|aug/i.test(a)) month = 7;
				else if(/сен|sep/i.test(a)) month = 8;
				else if(/окт|oct/i.test(a)) month = 9;
				else if(/ноя|nov/i.test(a)) month = 10;
				else if(/дек|dec/i.test(a)) month = 11;
			}
		}
		dtime = new Date(year.length == 2 ? '20' + year : year, month, day, hour, minute, second);
		dtime.setHours(dtime.getHours() + parseInt(Cfg.ctmofs));
		return dtime.toString().replace(/GMT.*$/, '');
	});
}

/*---------------------------Append CSS for elements-------------------------*/

function scriptCSS() {
	var x = [];
	var gif = function(nm, src) { x.push(nm + ' {background:url(data:image/gif;base64,' + src + ') no-repeat center !important}') }
	var pre = 'background:url( data:image/gif;base64,R0lGODlhAQAZAMQAABkqTSRDeRsxWBcoRh48axw4ZChOixs0Xi1WlihMhRkuUQwWJiBBcSpTkS9bmxAfNSdKgDJfoQ0YKRElQQ4bLRAjOgsWIg4fMQsVHgAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAAQAZAEAFFWDETJghUAhUAM/iNElAHMpQXZIVAgA7); ';
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
		.DESU_txtresizer {display:inline-block !important; float:none !important; padding:5px; margin:0 0 -' + (nav.Opera ? 8 : (nav.Chrome ? 2 : 5)) + 'px -11px; border-bottom:2px solid #555; border-right:2px solid #444; cursor:se-resize}\
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
	x.push(Cfg.attach == 0
		? '#DESU_content {width:100%}\
		#DESU_content > table {margin:5px 20px; font-size:16px}\
		#DESU_panel {float:right}\
		#DESU_btn_godown, #DESU_btn_goup {display:none}'
		: '#DESU_content {position:fixed; right:0; bottom:25px; z-index:9999; max-height:95%; overflow:auto}\
		#DESU_content > table {padding:5px 10px; border:1px solid grey; font-size:16px}\
		#DESU_panel {position:fixed; right:0; bottom:0}'
	);
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
	if(!$id('DESU_css')) {
		$t('head').appendChild($new('style', {'id': 'DESU_css', 'type': 'text/css', 'text': x.join(' ')}));
		if(nav.Chrome) $disp(dForm);
	} else $id('DESU_css').textContent = x.join(' ');
}

/*=============================================================================
							FOR POSTS AND THREADS
=============================================================================*/

function forPosts(fn) {
	for(var post, i = 0; post = Posts[i++];)
		fn(post);
}

function forAll(fn) {
	forPosts(fn);
	for(var post, i = 0; post = oPosts[i++];)
		fn(post);
}

function getThread(el) {
	return $x('ancestor::div[@class="thread"]', el);
}

function getPost(el) {
	return $x('ancestor::*[starts-with(@id,"post-") or starts-with(@id,"oppost-")'
		+ ' or starts-with(@id,"DESU_preview_")]', el);
}

function getPstCount(thrd) {
	var count = $X('.//table[starts-with(@id,"post-")]'
		+ '|.//div[starts-with(@id,"post-")]', thrd).snapshotLength + 1;
	var om = $x($case([
		hanab, './/div[@class="abbrev"]',
		ch.krau, './/span[@class="omittedinfo"]',
		ch.gazo, './/font[@color="#707070"]'
	], './/span[@class="omittedposts"]|.//div[@class="DESU_omitted"]'), thrd);
	if(om) om = om.textContent;
	if(om) count += parseInt(om.match(/\d+/)[0]);
	return count;
}

function getTitle(post) {
	var t = $x('.//span[@class="filetitle" or @class="replytitle" or @class="postsubject"'
		+ ' or @class="subject"]', post);
	if(t) t = t.textContent.trim();
	if(!t || t == '') t = post.Text.trim();
	return t.replace(/\s+/g, ' ');
}

function getImages(post) {
	return $X('.//img[@class="thumb" or contains(@src,"thumb") or contains(@src,"/spoiler")]', post);
}

function getImgInfo(post) {
	return $x('.//em|.//span[@class="filesize"]|.//node()[@class="fileinfo"]', post);
}

function getImgWeight(post) {
	var inf = getImgInfo(post).textContent.match(/\d+[\.\d\s|m|k|к]*[b|б]/i)[0];
	var w = parseFloat(inf.match(/[\d|\.]+/));
	if(/MB/.test(inf)) w = w*1000;
	if(/\d[\s]*B/.test(inf)) w = (w/1000).toFixed(2);
	return w;
}

function getImgSize(post) {
	var el = getImgInfo(post)
	return el ? el.textContent.match(/\d+[x×]\d+/)[0].split(/[x×]/) : [null, null];
}

function getText(el) {
	var n = el.nodeName;
	if(n == '#text') return el.data;
	if(n == 'BR') return '\n';
	var t = [];
	if(n == 'P' || n == 'BLOCKQUOTE' || n == 'LI') t[t.length] = '\n';
	var arr = el.childNodes;
	for(var x, i = 0; x = arr[i++];)
		t[t.length] = getText(x);
	return t.join('');
}

function isSage(post) {
	if(!pr.mail) return false;
	if(hanab) return $xb('.//img[@alt="Сажа"]', post);
	else if(ch.krau) return $xb('.//span[@class="sage"]', post);
	else if(ch._410) return $xb('.//span[@class="filetitle" and contains(text(),"'
		+ unescape('%u21E9') + '")]', post);
	else {
		var a = $x('.//a[starts-with(@href,"mailto:") or @href="sage"]', post);
		return a && /sage/i.test(a.href);
	}
	return false;
}

/*-------------------------------Post buttons--------------------------------*/

function addPostButtons(post) {
	post.Btns = (!post.isOp ? pPanel : opPanel).cloneNode(true);
	var el = post.Btns.firstChild;
	$event(el, {
		'click': function(e) { $pD(e); togglePostVisib(post); },
		'mouseover': function() { selectPostHider(post); },
		'mouseout': removeSelMenu
	});
	if(pr.on || oeForm) {
		el = el.nextSibling;
		$event(el, {
			'click': function(e) { $pD(e); showQuickReply(post); },
			'mouseover': function() { quotetxt = txtSelection(); }
		});
	}
	if(post.isOp){
		if(!TNum) {
			el = el.nextSibling;
			$event(el, {
				'click': function(e) { $pD(e); loadThread(post, 1); },
				'mouseover': function() { selectExpandThread(post); },
				'mouseout': removeSelMenu
			});
		}
		el = el.nextSibling;
		$event(el, {'click': function(e) { $pD(e); toggleFavorites(post, this); }});
		var h = host, b = brd, tNum = parseInt(post.Num);
		if(Favor[h] && Favor[h][b] && Favor[h][b][tNum]) {
			el.className = 'DESU_icn_favset';
			Favor[h][b][tNum].cnt = getPstCount(getThread(post));
			setStored('DESU_Favorites', uneval(Favor));
		}
		if(hThrds[b])
			if(sav.cookie && hThrds[b].indexOf(tNum) >= 0 || !sav.cookie && hThrds[b][tNum]) {
				hideThread(post);
				post.Vis = 0;
			}
	}
	if(isSage(post))
		post.Btns.appendChild($new('a', {'class': 'DESU_icn_sage', 'title': 'SAGE', 'href': '#'}, {
			'click': function(e) { $pD(e); applySpells('#sage'); }
		}));
	var ref = $x(xPostRef, post);
	$after(ref, [post.Btns]);
	if(pr.on && Cfg.insnum == 1) {
		if(ch.nul || ch.futr) $each($X('.//a', ref), function(el) { $rattr(el, 'onclick'); });
		$event(ref, {'click': insertRefLink});
	}
	if(Cfg.viewhd == 1) $event(ref, {
		'mouseover': function() { if(post.Vis == 0) togglePost(post, 1); },
		'mouseout': function() { if(post.Vis == 0) togglePost(post, 0); }
	}); 
}

/*----------------------------HTML links players-----------------------------*/

function getTubeVideoLinks(id, fn) {
	id = 'http://www.youtube.com/watch?v=' + id;
	GM_xmlhttpRequest({method: 'GET', url: id, onload: function(xhr) {
		var formats = xhr.responseText.match(/\"url_encoded_fmt_stream_map\":\s*\"([^\"]+)\"/);
		if(!formats) { fn(null); return; }
		formats = formats[1];
		var sep1 = '%2C', sep2 = '%26', sep3 = '%3D';
		if(formats.indexOf(',') > -1) { 
			sep1 = ','; 
			sep2 = formats.indexOf('&') > -1 ? '&' : '\\u0026'; 
			sep3 = '=';
		}
		var url = [];
		var group = formats.split(sep1);
		var elem, result1, result2, src, itag;
		for(var i = 0; i < group.length; i++) {
			elem = group[i].split(sep2);
			if(elem.length < 5) continue;
			result1 = elem[0].split(sep3);
			if(result1.length < 2) continue;
			src = unescape(unescape(result1[1])).replace(/\\\//g, '/').replace(/\\u0026/g, '&');
			result2 = elem[4].split(sep3);
			if(result2.length < 2) continue;    
			itag = result2[1];
			if(src.toLowerCase().indexOf('http') == 0) url[itag] = src;
		}
		fn(url);
	}});
}

function addTubeEmbed(el, id) {
	var wh = ' width="' + Cfg.ywidth + '" height="' + Cfg.yheigh + '" />';
	el.innerHTML = Cfg.yptype == 1
		? '<iframe type="text/html" src="http://www.youtube.com/embed/'
			+ id + (Cfg.yhdvid == 1 ? '?hd=1&' : '?') + 'html5=1" frameborder="0"' + wh
		: '<embed type="application/x-shockwave-flash" src="http://www.youtube.com/v/'
			+ id + (Cfg.yhdvid == 1 ? '?hd=1' : '') + '" wmode="transparent"' + wh;
}

function addTubePlayer(el, id) {
	if(Cfg.yptype != 2) addTubeEmbed(el, id);
	else getTubeVideoLinks(id, function(url) {
		var src = url ? (Cfg.yhdvid == 0 ? url[43] : url[45] || url[44] || url[43]) : null;
		if(!src) addTubeEmbed(el, id);
		else el.innerHTML = '<video poster="http://i.ytimg.com/vi/' + id + '/0.jpg" '
			+ 'controls="controls" preload="none" src="' + src + '&' + Math.random()
			+ '" width="' + Cfg.ywidth + '" height="' + Cfg.yheigh + '" />';
	});
}

function addTubePreview(el, id) {
	el.innerHTML = '<a href="http://www.youtube.com/watch?v=' + id + '" target="_blank">'
		+ '<img src="http://i.ytimg.com/vi/' + id + '/0.jpg" width="360" height="270" /></a>';
	$event($1(el), {'click': function(e) {
		if(Cfg.ytube != 4) { $pD(e); addTubePlayer($up(this), id); }
	}});
}

function clickTubeLink(e) {
	$pD(e);
	var el = $x('.//div[@class="DESU_ytube"]', getPost(this));
	var pattern = /http:\/\/(?:www\.)?youtu(?:be\.com\/(?:watch\?v=|v\/)|\.be\/)([^&]+).*$/;
	var id = this.href.match(pattern)[1];
	if($xb('node()[contains(@src,"' + id + '")]|video[contains(@poster,"' + id + '")]', el))
		el.innerHTML = '';
	else if(Cfg.ytube > 2 && !$xb('a[contains(@href,"' + id + '")]', el)) addTubePreview(el, id);
	else addTubePlayer(el, id);
}

function addLinkTube(post) {
	if(Cfg.ytube == 0) return;
	var pattern = /http:\/\/(?:www\.)?youtu(?:be\.com\/(?:watch\?v=|v\/)|\.be\/)([^&]+).*$/;
	$each($X('.//embed', post || dForm), function(el) {
		if(!pattern.test(el.src)) return;
		var src = 'http://www.youtube.com/watch?v=' + el.src.match(pattern)[1];
		$x(xPostMsg, post || getPost(el)).appendChild(
			$add('<p><a href="' + src + '">' + src + '</a></p>')
		);
		$del($up(el));
	});
	$each($X('.//a[contains(@href,"youtu")]', post || dForm), function(link) {
		if(!pattern.test(link.href)) return;
		var id = link.href.match(pattern)[1];
		var pst = post || getPost(link);
		var el = $x('.//div[@class="DESU_ytube"]', pst);
		if(!el) {
			el = $new('div', {'class': 'DESU_ytube'});
			if(Cfg.ytube > 2) addTubePreview(el, id);
			else if(Cfg.ytube == 2) addTubePlayer(el, id);
			var msg = pst.Msg || $x(xPostMsg, pst);
			if(msg) $before(msg, [el]);
			else pst.appendChild(el);
		}
		link.className = 'DESU_ytlink';
		$event(link, {'click': clickTubeLink});
		if(!nav.Opera && Cfg.ytitle == 1) GM_xmlhttpRequest({
			method: 'GET',
			url: 'https://gdata.youtube.com/feeds/api/videos/' + id
				+ '?alt=json&fields=title/text(),yt:noembed,app:control/yt:state/@reasonCode',
			onload: function(xhr) { link.textContent = JSON.parse(xhr.responseText).entry.title.$t; }
		});
	}, true);
}

function addLinkMP3(post) {
	if(Cfg.mp3 == 0) return;
	$each($X('.//a[contains(@href,".mp3")]', post || dForm), function(link) {
		if(!(link.target == '_blank' || link.rel == 'nofollow')) return;
		var src = link.href;
		var pst = post || getPost(link);
		var el = $x('.//div[@class="DESU_mp3"]', pst);
		if(!el) {
			el = $new('div', {'class': 'DESU_mp3'});
			var msg = pst.Msg || $x(xPostMsg, pst);
			if(msg) $before(msg, [el]);
			else pst.appendChild(el);
		}
		if(!$xb('.//object[contains(@FlashVars,"' + src + '")]', el))
			$html(el, el.innerHTML + '<object data="http://junglebook2007.narod.ru/audio/player.swf" type="application/x-shockwave-flash" wmode="transparent" width="220" height="16"  FlashVars="playerID=1&amp;bg=0x808080&amp;leftbg=0xB3B3B3&amp;lefticon=0x000000&amp;rightbg=0x808080&amp;rightbghover=0x999999&amp;rightcon=0x000000&amp;righticonhover=0xffffff&amp;text=0xffffff&amp;slider=0x222222&amp;track=0xf5f5dc&amp;border=0x666666&amp;loader=0x7fc7ff&amp;loop=yes&amp;autostart=no&amp;soundFile=' + src + '"></object><br>');
	}, true);
}

/*-----------------------------Image view functions--------------------------*/

function makeMoveable(el) {
	var elMove = function(e) {
		el.style.left = e.clientX - el.curX  + 'px';
		el.style.top = e.clientY - el.curY + 'px';
		el.moved = true;
	};
	var elStop = function() { $revent(doc.body, {'mousemove': elMove, 'mouseup': elStop}); };
	$event(el, {'mousedown': function(e) {
		$pD(e);
		el.curX = e.clientX - parseInt(el.style.left);
		el.curY = e.clientY - parseInt(el.style.top);
		$event(doc.body, {'mousemove': elMove, 'mouseup': elStop});
	}});
}

function resizeImg(e) {
	$pD(e);
	var curX = e.clientX;
	var curY = e.clientY;
	var oldL = parseInt(this.style.left);
	var oldT = parseInt(this.style.top);
	var oldW = this.width;
	var oldH = this.height;
	var d = nav.Opera || nav.Chrome ? e.wheelDelta : -e.detail;
	var newW = parseInt(this.width*(d > 0 ? 1.25 : 0.8));
	var newH = parseInt(this.height*(d > 0 ? 1.25 : 0.8));
	this.width = newW;
	this.height = newH;
	this.style.left = parseInt(curX - (newW/oldW)*(curX - oldL)) + 'px';
	this.style.top = parseInt(curY - (newH/oldH)*(curY - oldT)) + 'px';
}

function addFullImg(a, fullW, fullH, isExp) {
	var full = $x('.//img[@class="DESU_fullimg"]', a);
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
	var scrW = doc.body.clientWidth, scrH = window.innerHeight;
	if(Cfg.expimg == 1) scrW -= $offset(a).left + 25;
	var newW = '', newH = '';
	if(fullW && fullH) {
		newW = fullW < scrW ? fullW : scrW;
		newH = newW*fullH/fullW;
		if(Cfg.expimg == 2 && newH > scrH) { newH = scrH; newW = newH*fullW/fullH; }
	}
	a.appendChild($attr(full, {
		'class': 'DESU_fullimg',
		'src': a.href, 'alt': a.href, 'width': newW, 'height': newH,
		'style': (Cfg.expimg == 2 ? 'position:fixed; z-index:5000; border:1px solid black; left:'
			+ parseInt((scrW - newW)/2) + 'px; top:' + parseInt((scrH - newH)/2) + 'px' : '')
	}));
}

function addLinkImg(post) {
	if(Cfg.addimg == 0) return;
	var list = $X(xPostMsg + '//a[contains(@href,".jpg") or contains(@href,".png")'
		+ ' or contains(@href,".gif")]', post || dForm);
	$each(list, function(link) {
		if($xb('ancestor::small', link)) return;
		var a = link.cloneNode(false);
		a.target = '_blank';
		$disp(a);
		a.appendChild($new('img', {'class': 'DESU_preimg', 'src': a.href, 'alt': a.href}, {
			'load': function() {
				$disp(a);
				var fullW = this.width;
				var fullH = this.height;
				this.title = fullW + 'x' + fullH;
				if(fullW <= 200 && fullH <= 200) return;
				var k = fullW/fullH;
				this.width = k < 1 ? 200*k : 200;
				this.height = k < 1 ? 200 : 200/k;
			}
		}));
		$event(a, {'click': function(e) {
			if(Cfg.expimg != 0 && e.button != 1) {
				$pD(e);
				var sz = $1(this).title.split('x');
				addFullImg(this, parseInt(sz[0]), parseInt(sz[1]));
			}
		}});
		$before(link, [a, $new('br')]);
	});
}

function expandPostImg(a, post, isExp) {
	if(!/\.jpg|\.jpeg|\.png|.\gif/i.test(a.href)) return;
	var sz = getImgSize(post.Img.snapshotLength > 1
		? $x('ancestor::node()[self::div or self::td][1]', a) : post);
	addFullImg(a, parseInt(sz[0]), parseInt(sz[1]), isExp);
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
	if(!refMap[rNum]) refMap[rNum] = [];
	if((',' + refMap[rNum].toString() + ',').indexOf(',' + pNum + ',') < 0) refMap[rNum].push(pNum);
}

function showRefMap(post, rNum, isUpd) {
	if(typeof refMap[rNum] !== 'object' || !post) return;
	var txt = refMap[rNum].toString().replace(/(\d+)/g, ' <a href="#$1">&gt;&gt;$1</a>');
	var el = $if(isUpd, $x('.//div[@class="DESU_refmap"]', post));
	if(!el) {
		var msg = post.Msg || $x(xPostMsg, post);
		if(!msg) return;
		el = $add('<div class="DESU_refmap">' + txt + '</div>');
		eventRefLink(el);
		$after(msg, [el]);
	} else eventRefLink($html(el, txt));
}

function addRefMap(post) {
	if(Cfg.navig != 2) return;
	$each($X('.//a[starts-with(text(),">>")]', (post ? post.Msg : dForm)), function(link) {
		if(/\//.test(link.textContent)) return;
		var rNum = (link.hash || link.pathname.substring(link.pathname.lastIndexOf('/'))).match(/\d+/);
		var pst = post || getPost(link);
		if(pByNum[rNum] && pst) getRefMap(pst.id.match(/\d+/), rNum);
	}, true);
	for(var rNum in refMap)
		showRefMap(pByNum[rNum], rNum, Boolean(post));
}

/*----------------------->>RefLinks posts preview functions------------------*/

function delPostPreview() {
	if(pView) $delNx(pView);
	else {
		var xp = './/div[starts-with(@id,"DESU_preview")]';
		var cln = $x(xp);
		if(cln) clearTimeout(cln.marker);
		$Del(xp);
	}
}

function checkPostPreview(e) {
	if(Cfg.navdel == 1) {
		clearTimeout(pView.close);
		pView.close = setTimeout(delPostPreview, 1000);
	}
	pView = $x('ancestor-or-self::div[starts-with(@id,"DESU_preview")]', e.relatedTarget);
	if(Cfg.navdel == 0) delPostPreview();
}

function funcPostPreview(post, parentId, msg) {
	if(!pView) return;
	if(!post) { pView.innerHTML = msg; return; }
	pView.innerHTML = ($x('.//td[@class="' + pClass + '"]', post) || post).innerHTML;
	$Del('.//img[@class="DESU_preimg"]/ancestor::a|.//img[@class="DESU_fullimg"]'
		+ '|.//div[@class="DESU_refmap" or @class="DESU_ytube" or @class="DESU_mp3"]', pView);
	eventRefLink(pView);
	addLinkTube(pView);
	pView.Img = getImages(pView);
	$each(pView.Img, function(img) { img.style.display = ''; });
	eventPostImg(pView);
	addLinkImg(pView);
	if(Cfg.navig == 2) {
		showRefMap(pView, pView.id.match(/\d+/), false);
		var el = $x('.//a[starts-with(text(),">>") and contains(text(),"' + parentId + '")]', pView);
		if(el) el.style.fontWeight = 'bold';
	}
}

function showPostPreview(e) {
	if(Cfg.navig == 0 || /^>>$/.test(this.textContent)) return;
	setTimeout(function() {
		$del($x('.//div[starts-with(@id,"preview") or starts-with(@id,"pstprev")]'));
	}, 0);
	var path = this.pathname;
	var b = path.match(/^\/*(.*?)\/*(?:res|thread-|$)/)[1];
	var tNum = path.match(/[^\/]+\/(.*?)$/)[1].match(/\d+/);
	var pNum = this.hash.match(/\d+/) || tNum;
	var x, y;
	var scrW = doc.body.clientWidth, scrH = window.innerHeight;
	if(Cfg.navfix == 0 || Cfg.attach == 1 && $xb('ancestor::div[@id="DESU_content"]', e.target)) {
		x = e.clientX + window.pageXOffset + 2;
		y = e.clientY + window.pageYOffset;
	} else {
		x = $offset(this).left + this.offsetWidth/2;
		y = $offset(this).top;
		if(e.clientY < scrH*0.75) y += this.offsetHeight;
	}
	pView = $new('div', {
		'id': 'DESU_preview_' + pNum,
		'class': pClass,
		'style': 'position:absolute; width:auto; min-width:0; z-index:9999; border:1px solid grey; '
			+ (x < scrW/2 ? 'left:' + x : 'right:' + parseInt(scrW - x + 2)) + 'px; '
			+ (e.clientY < scrH*0.75 ? 'top:' + y : 'bottom:' + parseInt(scrH - y - 4)) + 'px'}, {
		'mouseout': checkPostPreview,
		'mouseover': function() { if(!pView) pView = this; }
	});
	var parent = getPost(e.target);
	var parentId = parent ? parent.id.match(/\d+/) : null;
	var post = pByNum[pNum] || ajaxPosts[pNum];
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
		pView.marker = setTimeout(function() { markViewedPost(pNum); saveViewedPosts(pNum); }, 2000);
}

function eventRefLink(el) {
	if(Cfg.navig != 0) $each($X('.//a[starts-with(text(),">>")]', el || dForm), function(link) {
		$rattr(link, 'onmouseover');
		$rattr(link, 'onmouseout');
		$event(link, {'mouseover': showPostPreview, 'mouseout': checkPostPreview});
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
	var form = !hanab
		? $x(xDelForm, $up($add(html))) : $up($add('<div class="thread">' + html + '</div>'));
	parseDelform(form);
	$each($X('.//div[@class="thread"]', form), function(thrd) {
		var tNum = thrd.id.match(/\d+/);
		ajaxThrds[tNum] = {keys: []};
		var list = $X('.//node()[starts-with(@id,"post-") or starts-with(@id,"oppost-")]'
			+ '[self::table or self::div]', thrd);
		$each(list, function(post, i) {
			var pNum = post.id.match(/\d+/);
			ajaxThrds[tNum].keys.push(pNum);
			ajaxPosts[pNum] = post;
			if(i == 0 && kusaba) {
				var om = $x('.//span[@class="omittedposts"]', thrd);
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
		else url = '/' + (b == '' ? '': b + '/') + res + tNum + (!ch.tire ? docExt : '.html');
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
	post.Text = getText(post.Msg).trim();
	doPostFilters(post);
	if(post.Vis == 0) setPostVisib(post, 0);
	if(Cfg.delhd == 1) mergeHidden(post);
	addRefMap(post);
	eventRefLink(post.Msg);
	addLinkMP3(post);
	addLinkTube(post);
	addLinkImg(post);
	if(isExpImg) expandAllPostImg(post);
}

function newPost(thr, tNum, i, isDel) {
	var pNum = ajaxThrds[tNum].keys[i];
	var post = ajaxPosts[pNum];
	if(i == 0) oPosts[oPosts.length] = post;
	else Posts[Posts.length] = post;
	if(isDel) post.isDel = true;
	pByNum[pNum] = post;
	post.Num = pNum;
	post.Count = i + 1;
	if(!(sav.cookie && !TNum)) post.Vis = getVisib(pNum);
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
	if(post.Vis == 0) return;
	var a = $x(!ch.krau
		? './/div[@class="abbrev"]|.//span[@class="abbr" or @class="omittedposts" or @class="shortened"]'
		: './/p[starts-with(@id,"post_truncated")]', post);
	if(!a || !(/long|full comment|gekürzt|слишком|длинн|мног/i.test(a.textContent))) return;
	var tNum = getThread(post).id.match(/\d+/);
	if(Cfg.expost == 1) getFullMsg(post, tNum, a);
	else $event(a, {'click': function(e) { $pD(e); getFullMsg(post, tNum, e.target); }});
}

function expandThread(thr, tNum, last, isDel) {
	var len = ajaxThrds[tNum].keys.length;
	if(last != 1) last = len - last;
	if(last <= 0) last = 1;
	if(last > 1) thr.appendChild($new('div', {'class': 'DESU_omitted',
		'text': Lng.postsOmitted + parseInt(last - 1)
	}));
	for(var i = last; i < len; i++)
		newPost(thr, tNum, i, isDel);
	if(!sav.cookie) saveHiddenPosts();
	$close($id('DESU_alert_wait'));
}

function loadThread(post, last) {
	$alert(Lng.loading, 'wait');
	var tNum = post.Num;
	AJAX(null, brd, tNum, function(err) {
		if(err) { $close($id('DESU_alert_wait')); $alert(err); }
		else {
			$delNx(post.Msg);
			$delNx(post);
			if(ch.krau) $del($x('.//span[@class="omittedinfo"]', post));
			expandThread($up(post), tNum, last);
			$focus(pByNum[tNum]);
			if(last > 5 || last == 1) $up(post).appendChild($add(
				'<span>[<a href="#">' + Lng.collapseThrd + '</a>]</span>', {
				'click': function(e) { $pD(e); loadThread(post, 5); }
			}));
		}
	});
}

function loadFavorThread(e) {
	$pD(e);
	var el = $up(this, 2);
	var thr = $x('.//div[@class="thread"]', el);
	if(thr.style.display != 'none') { $disp(thr); thr.innerHTML = ''; return; }
	var arr = el.id.substr(13).split('|');
	var url = $if(arr[0] != host, $next(this).href);
	var b = arr[1];
	var tNum = arr[2];
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
	if(err) return false;
	var j = 1, del = 0;
	for(var i = 0, len = Posts.length; i < len; i++) {
		var post = Posts[i];
		if(ajaxThrds[TNum].keys[j] != parseInt(post.Num)) {
			if(!post.isDel) post.Btns.className += '_del';
			post.isDel = true;
		} else if(!post.isDel) j++;
		if(post.isDel) del++;
	}
	return del;
}

function setUpdButtonState(state) {
	if(Cfg.updthr != 3) $x('.//a[starts-with(@id,"DESU_btn_upd")]').id = 'DESU_btn_upd' + state;
}

function endPostsUpdate() {
	setUpdButtonState('off');
	clearInterval(ajaxInt);
	ajaxInt = undefined;
}

function infoNewPosts(err, del) {
	if(err) {
		if(err == Lng.noConnect) { $alert(Lng.noConnect, 'warn'); setUpdButtonState('warn'); }
		else {
			$alert(Lng.thrdNotFound + TNum + '): \n' + err);
			doc.title = '{' + err.match(/(?:\[)(\d+)(?:\])/)[1] + '} ' + doc.title;
			endPostsUpdate();
		}
		return;
	}
	if(Cfg.updthr == 3) return;
	setUpdButtonState('on');
	$close($id('DESU_alert_warn'));
	var inf = parseInt(ajaxThrds[TNum].keys.length - Posts.length + del - 1);
	if(Cfg.updthr == 1) {
		if(isActiveTab) return;
		var old = doc.title.match(/^\[\d+\]/);
		if(old) inf += parseInt(old[0].match(/\d+/));
	}
	if(Cfg.updfav == 1 && favIcon) {
		clearInterval(favIconInt);
		if(inf > 0) favIconInt = setInterval(function() {
			var head = $t('head');
			var href = $xb('.//link[@href="' + favIcon + '"]', head)
				? 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T'
					+ '///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAc'
					+ 'ACBAAAeaR9cIAAAAASUVORK5CYII='
				: favIcon;
			$Del('.//link[@rel="shortcut icon"]', head);
			head.appendChild($new('link', {'href': href, 'rel': 'shortcut icon'}));
		}, 800);
	}
	doc.title = (inf > 0 ? ' [' + inf + '] ' : '') + docTitle;
}

function loadNewPosts(inf) {
	if(inf) $alert(Lng.loading, 'wait');
	AJAX(null, brd, TNum, function(err) {
		var del = getDelPosts(err);
		if(!inf) infoNewPosts(err, del);
		if(!err) {
			var len = ajaxThrds[TNum].keys.length;
			for(var i = Posts.length - del + 1; i < len; i++)
				newPost($x('.//div[@class="thread"]', dForm), TNum, i);
			saveHiddenPosts();
			$1($id('DESU_panel_info')).textContent = len + '/' + getImages(dForm).snapshotLength;
		}
		if(inf) { $close($id('DESU_alert_wait')); infoNewPosts(err, del); }
	}, true);
}

function initPostsUpdate() {
	var C = Cfg.updint;
	var t = $case([C == 0, 0.5, C == 1, 1, C == 2, 1.5, C == 3, 2, C == 4, 5, C == 5, 15], 30)*60000;
	if(Cfg.updthr == 1) ajaxInt = setInterval(function() { loadNewPosts(); }, t);
	if(Cfg.updthr == 2) ajaxInt = setInterval(function() {
		AJAX(null, brd, TNum, function(err) { infoNewPosts(err, getDelPosts(err)); }, true);
	}, t);
}

function loadPages(len) {
	$alert(Lng.loading, 'wait');
	dForm.innerHTML = '';
	Posts = []; oPosts = []; refMap = []; ajaxThrds = {}; ajaxPosts = [];
	for(var p = 0; p < len; p++) {
		$append(dForm, [
			$new('center', {'text': p + Lng.page, 'style': 'font-size:2em'}),
			$new('hr'),
			$new('div', {'id': 'DESU_page' + p})
		]);
		var url = '/' + (brd == '' ? '' : brd + '/')
			+ (p > 0 ? p + docExt : (hanab ? 'index' + docExt : ''));
		AJAX(url, brd, null, function(p, len) { return function() {
			var page = $id('DESU_page' + p);
			for(var tNum in ajaxThrds) {
				var thr = $new('div', {'class': 'thread', 'id': 'thread-' + tNum});
				$append(page, [thr, $new('br', {'clear': 'left'}), $new('hr')]);
				for(var i = 0, pLen = ajaxThrds[tNum].keys.length; i < pLen; i++)
					newPost(thr, tNum, i);
				delete ajaxThrds[tNum];
			}
			if(!sav.cookie) saveHiddenPosts();
			readHiddenThreads();
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

function hideThread(post, note) {
	if(post.Vis == 0) return;
	togglePost(post, 0);
	var x = $add('<div class="' + pClass + '" id="DESU_hiddenthr_' + post.Num + '">'
		+ Lng.hiddenThrd + ' <a href="#">№' + post.Num + '</a><i> ('
		+ (!note ? getTitle(post).substring(0, 70) : 'autohide: ' + note) + ')</i></div>'
	);
	$event($t('a', x), {'click': function(e) { $pD(e); unhideThread(post); }});
	$before($up(post), [x]);
	if(Cfg.delhd == 2) { $disp(x); $disp($next($next(x))); $disp($next($next($next(x)))); }
}

function unhideThread(post) {
	if(post.Vis == 1) return;
	togglePost(post, 1);
	toggleHiddenThread(post, 1);
	$del($id('DESU_hiddenthr_' + post.Num));
}

function applyPostVisib(post, vis) {
	if(!sav.cookie) {
		Visib[brd + post.Num] = vis;
		Expires[brd + post.Num] = (new Date()).getTime() + stoargeLife;
	} else Visib[post.Count] = vis;
	post.Vis = vis;
	if(Cfg.delhd == 2) post.style.display = (vis == 0) ? 'none' : '';
}

function setPostVisib(post, vis) {
	if(post.isOp) {
		if(vis == 0) hideThread(post);
		else unhideThread(post);
	} else {
		$1(post.Btns).className = (vis == 0) ? 'DESU_icn_unhide' : 'DESU_icn_hide';
		togglePost(post, vis);
		applyPostVisib(post, vis);
		if(Cfg.navhid == 1) setTimeout(function() {
			$each($X('.//a[contains(@href,"#' + post.Num + '")]', dForm),
				function(el) { el.className = vis == 0 ? 'DESU_refhid' : ''; }
			)
		}, 0);
	}
}

function togglePostVisib(post) {
	if(post.isOp) { hideThread(post); toggleHiddenThread(post, 0); }
	else { post.Vis = (post.Vis == 1) ? 0 : 1; setPostVisib(post, post.Vis); savePostsVisib(); }
}

function hidePost(post, note) {
	if(post.noHide) return;
	if(!post.isOp) {
		if(post.Vis != 0) post.Btns.appendChild($new('a', {
			'class': 'DESU_postnote', 'text': ' autohide: ' + note + ' ', 'href': '#'}, {
			'click': function(e) { $pD(e); $del(this); }
		}));
		applyPostVisib(post, 0);
	} else if(Cfg.filthr == 1) { hideThread(post, note); toggleHiddenThread(post, 0); }
}

function unhidePost(post) {
	if(!post.isOp) {
		if(detectWipe(post)) return;
		setPostVisib(post, 1);
		$del($x('.//a[@class="DESU_postnote"]', post));
		hideByWipe(post);
	} else if(Cfg.filthr == 1) unhideThread(post);
}

function saveHiddenPosts() {
	forPosts(function(post) { if(post.Vis == 0) setPostVisib(post, 0); });
	savePostsVisib();
}

function togglePost(post, vis) {
	if(post.isOp) $disp(getThread(post));
	$each($X('following-sibling::*', $x($case([
		ch.krau, './/div[@class="postheader"]',
		tinyb, './/p[@class="intro"]'
	], './/span[starts-with(@class,"DESU_postpanel")]'), post)), function(el) {
		el.style.display = (vis == 0) ? 'none' : '';
	});
}

function mergeHidden(post) {
	if(post.Vis != 0) return;
	var el = $prev(post);
	if(!el) return;
	if(!/merged/.test(el.id)) {
		el = $new('span', {'id': 'DESU_merged_' + post.Num, 'style': 'display:none'});
		$before(post, [$new('span', {'style': 'display:; cursor:pointer'}, {'click': function(e) {
			$pD(e);
			var hDiv = $id('DESU_merged_' + post.Num);
			$prev(hDiv).innerHTML = 
				(hDiv.style.display == 'none' ? unescape('%u25BC') : unescape('%u25B2'))
				+ '[<i><a href="#">' + Lng.hiddenPosts + '</a>:&nbsp;'
				+ hDiv.childNodes.length + '</i>]';
			$disp(hDiv);
		}}), el]);
	}
	el.appendChild(post);
	var next = $next(post);
	if(!next || getVisib(next.id.match(/\d+/)) == 1)
		$prev(el).innerHTML = unescape('%u25B2') + '[<i><a href="#">'
			+ Lng.hiddenPosts + '</a>:&nbsp;' + el.childNodes.length + '</i>]';
}

function processHidden(newCfg, oldCfg) {
	if(newCfg == 2 || oldCfg == 2) {
		forPosts(function(post) { if(post.Vis == 0) $disp(post); });
		if(Cfg.filthr == 1) $each($X('.//span[starts-with(@id,"DESU_hiddenthr")]'), function(x) {
			$disp(x);
			$disp($next($next(x))); $disp($next($next($next(x))));
		});
	}
	if(oldCfg == 1) $each($X('.//span[starts-with(@id,"DESU_merged")]'), function(el) {
		var px = el.childNodes;
		var i = px.length;
		while(i--) $after(el, [px[i]]);
		$del($prev(el));
		$del(el);
	});
	if(newCfg == 1) forAll(mergeHidden);
	saveCfg('delhd', newCfg);
}

/*----------------------Hide/change posts by expressions---------------------*/

function getSpellObj() {
	return {
		words: [], exp: [], exph: [], img: [], imgn: [], name: [], tmax: [],
		sage: false, notxt: false, noimg: false, trip: false
	};
}

function initSpells() {
	pSpells = new getSpellObj();
	tSpells = new getSpellObj();
	oSpells = {rep: [], skip: [], num: [], outrep: []};
	var i = spellsList.length;
	var x, t, b, n;
	var Spells = {};
	while(i--) {
		Spells = pSpells;
		x = spellsList[i].toString();
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
		if(TNum) {
			if(t == '#skip') {
				var s = x.substr(6).split(', ');
				var j = s.length;
				while(j--) {
					if(s[j].indexOf('-') < 0) s[j] += '-' + s[j];
					oSpells.skip.push(s[j]);
				}
			}
			if(t == '#num') {
				var s = x.substr(5).split(', ');
				var j = s.length;
				while(j--) {
					if(s[j].indexOf('-') < 0) s[j] += '-' + s[j];
					oSpells.num.push(s[j]);
				}
			}
		}
		if(t == '#rep') oSpells.rep.push(x.substr(5));
		if(t == '#exp') Spells.exp.push(strToRegexp(x.substr(5)));
		if(t == '#exph') Spells.exph.push(strToRegexp(x.substr(6)));
		if(t == '#img') Spells.img.push(x.substr(5));
		if(t == '#imgn') Spells.imgn.push(strToRegexp(x.substr(6)));
		if(t == '#name') Spells.name.push(x.substr(6));
		if(t == '#tmax') Spells.tmax.push(x.substr(6));
		if(t == '#sage') Spells.sage = true;
		if(t == '#notxt') Spells.notxt = true;
		if(t == '#noimg') Spells.noimg = true;
		if(t == '#trip') Spells.trip = true;
		if(t == '#outrep') oSpells.outrep.push(x.substr(8));
	}
}

function doReplace(arr, txt) {
	var i = arr.length;
	while(i--) {
		var re = strToRegexp(arr[i]);
		txt = txt.replace(re, arr[i].substr(re.toString().length + 1));
	}
	return txt;
}

function getImgSpell(imgW, imgH, imgK, exp) {
	if(exp == '') return false;
	var s = exp.split('@');
	var stat = s[0].substring(0, 1);
	var expK = s[0].substring(1);
	if(expK != '') {
		if(stat == '<' && imgK < expK || stat == '>' && imgK > expK || stat == '=' && imgK == expK)
			{ if(!s[1]) return 'image ' + exp; }
		else return false;
	}
	if(s[1]) {
		var x = s[1].split(/[x×]/);
		var expW = x[0], expH = x[1];
		if(stat == '<' && imgW < expW && imgH < expH ||
			stat == '>' && imgW > expW && imgH > expH ||
			stat == '=' && imgW == expW && imgH == expH)
			return 'image ' + exp;
	}
	return false;
}

function getSpells(x, post) {
	var pName, pTrip, pTitle, inf, t, i;
	post.noHide = false;
	if(oSpells.skip[0] && TNum) {
		inf = post.Count;
		i = oSpells.skip.length;
		while(i--) {
			t = oSpells.skip[i].split('-');
			if(inf >= parseInt(t[0]) && inf <= parseInt(t[1])) { post.noHide = true; return false; }
		}
	}
	if(x.words[0]) {
		pTitle = $x('.//span[@class="replytitle" or @class="filetitle"]', post);
		pTitle = pTitle ? pTitle.textContent.toLowerCase() : '';
		inf = post.Text.toLowerCase();
		i = x.words.length;
		while(i--) {
			t = x.words[i].toLowerCase();
			if(inf.indexOf(t) > -1 || pTitle.indexOf(t) > -1) return x.words[i];
		}
	}
	if(x.name[0] || x.trip) {
		pName = $x('.//span[@class="commentpostername" or @class="postername"]', post);
		pTrip = $x('.//span[@class="postertrip"]', post);
	}
	if(x.trip && pTrip) return '#trip';
	if(x.name[0]) {
		pName = pName ? pName.textContent : '';
		pTrip = pTrip ? pTrip.textContent : '';
		i = x.name.length;
		while(i--) {
			t = x.name[i].split(/!+/);
			if(t[0] != '' && pName.indexOf(t[0]) > -1 || t[1] != '' && pTrip.indexOf(t[1]) > -1)
				return '#name' + x.name[i];
		}
	}
	if(x.exp[0]) {
		inf = post.Text;
		i = x.exp.length;
		while(i--) if(inf.match(x.exp[i])) return '#exp ' + x.exp[i].toString();
	}
	if(x.exph[0]) {
		inf = post.innerHTML;
		i = x.exph.length;
		while(i--) if(inf.match(x.exph[i])) return '#exph ' + x.exph[i].toString();
	}
	if(post.Img.snapshotLength > 0) {
		if(x.img[0]) {
			var sz = getImgSize(post);
			var imgW = parseInt(sz[0]), imgH = parseInt(sz[1]);
			var imgK = getImgWeight(post);
			i = x.img.length;
			while(i--) if(getImgSpell(imgW, imgH, imgK, x.img[i])) return '#img ' + x.img[i];
		}
		if(x.imgn[0]) {
			inf = getImgInfo(post);
			if(inf) {
				inf = inf.textContent;
				i = x.imgn.length;
				while(i--) if(inf.match(x.imgn[i])) return '#imgn ' + x.imgn[i];
			}
		}
	}
	if(oSpells.num[0]) {
		inf = post.Count;
		i = oSpells.num.length;
		while(i--) {
			t = oSpells.num[i].split('-');
			if(inf >= parseInt(t[0]) && inf <= parseInt(t[1])) return '#num ' + oSpells.num[i];
		}
	}
	if(x.tmax[0]) {
		inf = post.Text.replace(/\n/g, '').length;
		i = x.tmax.length;
		while(i--) if(inf >= x.tmax[i]) return '#tmax ' + x.tmax[i];
	}
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
	var exp = checkSpells(post);
	if(post.Vis == 0) { if(post.noHide) unhidePost(post); } 
	else if(exp) hidePost(post, exp.substring(0, 70));
}

function verifyRegExp(txt) {
	txt = txt.split('\n');
	var i = txt.length;
	var re = /#exp |#exph |#rep |#outrep |#imgn /;
	while(i--) {
		var t = txt[i];
		var rep = t.match(re);
		if(rep) try { strToRegexp(t.substr(t.indexOf(rep))); } catch(e) { return t; }
	}
	return null;
}

function toggleSpells() {
	var fld = $id('DESU_spelledit');
	var val =
		(fld ? fld.value : spellsList.join('\n')).replace(/[\r\n]+/g, '\n').replace(/^\n|\n$/g, '');
	var wrong = verifyRegExp(val);
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
	var fld = $id('DESU_spelledit');
	var val = fld ? fld.value : spellsList.join('\n');
	if(txt) {
		if(txt.trim() == '') return;
		if(TNum) txt = '#' + brd + '/' + TNum + ' ' + txt;
		toggleSpells();
		var nval = '\n' + val;
		var ntxt = '\n' + txt;
		val = nval.indexOf(ntxt) > -1 ? nval.split(ntxt).join('') : val + ntxt;
	}
	val = val.replace(/[\r\n]+/g, '\n').replace(/^\n|\n$/g, '');
	var wrong = verifyRegExp(val);
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
	return post.Text.replace(/\s+/g, ' ').replace(/[\?\.\\\/\+\*\$\^\(\)\|\{\}\[\]!@#%_=:;<,-]/g, ''
	).substring(0, 800).split(' ');
}

function hideBySameText(post) {
	if(post.Text == '') applySpells('#notxt');
	else {
		var vis = post.Vis;
		forAll(function(target) { findSameText(target, post, vis, getWrds(post)); });
		saveHiddenPosts();
	}
}

function findSameText(post, origPost, origVis, origWords) {
	var words = getWrds(post);
	var origLen = origWords.length;
	if(words.length > origLen*2.5 || words.length < origLen*0.5) return;
	var matchCount = 0;
	var i = origWords.length;
	while(i--) {
		if(origWords.length > 6 && origWords[i].length < 3) { origLen--; continue; }
		var j = words.length;
		while(j--)
			if(words[j] == origWords[i] || origWords[i].match(/>>\d+/) && words[j].match(/>>\d+/))
				matchCount++;
	}
	if(!(matchCount >= origLen*0.5 && words.length < origLen*2.5)) return;
	$del($x('.//a[@class="DESU_postnote"]', post));
	if(origVis != 0) hidePost(post, 'similar to >>' + origPost.Num);
	else unhidePost(post);
}

/*--------------------------------Wipe detectors-----------------------------*/

function detectWipe(post) {
	if(Cfg.awipe == 0) return false;
	var detectors = [
		detectWipe_sameLines,
		detectWipe_sameWords,
		detectWipe_specSymbols,
		detectWipe_longColumn,
		detectWipe_longWords,
		detectWipe_numbers,
		detectWipe_caseWords
	];
	for(var i = 0; i < detectors.length; i++) {
		var detect = detectors[i](post.Text);
		if(detect) return detect;
	}
	return false;
}

function hideByWipe(post) {
	if(post.Vis == 0 || post.Vis == 1) return;
	var note = detectWipe(post);
	if(note) hidePost(post, note);
	else applyPostVisib(post, 1);
}

function detectWipe_sameLines(txt) {
	if(Cfg.samel == 0) return false;
	var lines = txt.replace(/> /g, '').split(/[\s]*[\n][\s]*/);
	var len = lines.length;
	if(len < 5) return false;
	var arr = [], n = 0;
	for(var i = 0; i < len; i++) {
		var w = lines[i];
		if(w.length > 0) {
			if(arr[w]) arr[w]++;
			else arr[w] = 1;
			n++;
		}
	}
	for(var x in arr)
		if(arr[x] > n/4 && arr[x] >= 5)
			return 'same lines: "' + x.substr(0, 20) + '" x' + parseInt(arr[x] + 1);
	return false;
}

function detectWipe_sameWords(txt) {
	if(Cfg.samew == 0) return false;
	txt = txt.replace(/[\s\.\?\!,>]+/g, ' ').toUpperCase();
	var words = txt.split(' ');
	var len = words.length;
	if(len <= 13) return false;
	var arr = [], n = 0;
	for(var i = 0; i < len; i++) {
		var w = words[i];
		if(w.length > 1) {
			if(arr[w]) arr[w]++;
			else arr[w] = 1;
			n++;
		}
	}
	if(n <= 10) return false;
	var keys = 0, pop = '', mpop = -1;
	for(var x in arr) {
		keys++;
		if(arr[x] > mpop) { mpop = arr[x]; pop = x; }
		if(n > 25 && arr[x] > n/3.5) return 'same words: "' + x.substr(0, 20) + '" x' + arr[x];
	}
	pop = pop.substr(0, 20);
	if(n > 80 && keys <= 20 || n/keys > 7) return 'same words: "' + pop + '" x' + mpop;
	return false;
}

function detectWipe_specSymbols(txt) {
	if(Cfg.specs == 0) return false;
	txt = txt.replace(/\s+/g, '');
	var all = txt; 
	txt = txt.replace(/[0-9a-zа-я\.\?!,]/ig, '');
	var proc = txt.length/all.length;
	if(all.length > 30 && proc > 0.4) return 'specsymbols: ' + parseInt(proc*100) + '%';
	return false;
}

function detectWipe_longColumn(txt) {
	if(Cfg.longp == 0) return false;
	var n = 0;
	var rows = txt.split(/[\s]*[\n][\s]*/);
	var len = rows.length;
	if(len > 50) return 'long text x' + len;
	for(var i = 0; i < len; i++) {
		if(rows[i].length < 9) n++;
		else return false;
	}
	if(n > 5) return 'columns x' + n;
	return false;
}

function detectWipe_longWords(txt) {
	if(Cfg.longw == 0) return false;
	txt = txt.replace(/(https*:\/\/.*?)(\s|$)/g, '').replace(/[\s\.\?!,>:;-]+/g, ' ');
	var words = txt.split(' ');
	var n = 0, all = '', lng = '';
	for(var i = 0, len = words.length; i < len; i++)
		if(words[i].length > 1) {
			n++;
			all += words[i];
			lng = words[i].length > lng.length ? words[i] : lng;
		}
	if(n == 1 && lng.length > 70 || n > 1 && all.length/n > 12)
		return 'long words: "' + lng.substr(0, 20) + '.."';
	return false;
}

function detectWipe_numbers(txt) {
	if(Cfg.nums == 0) return false;;
	txt = txt.replace(/\s+/g, ' ').replace(/((>>\d+)+|https*:\/\/.*?)(\s|$)/g, '');
	var len = txt.length;
	var proc = (len - txt.replace(/[0-9]/g, '').length)/len;
	if(len > 30 && proc > 0.4) return 'numbers: ' + parseInt(proc*100) + '%';
	return false;
}

function detectWipe_caseWords(txt) {
	if(Cfg.caps == 0) return false;
	txt = txt.replace(/[\s+\.\?!,-]+/g, ' ');
	var words = txt.split(' ');
	var len = words.length;
	if(len <= 4) return false;
	var n = 0, all = 0, caps = 0;
	for(var i = 0; i < len; i++) {
		if(words[i].length < 5) continue;
		all++;
		var word = words[i];
		var up = word.toUpperCase();
		var lw = word.toLowerCase();
		var upc = 0, lwc = 0;
		var cap = word.match(/[a-zа-я]/ig);
		if(cap) {
			cap = cap.toString().trim();
			if(cap != '' && cap.toUpperCase() == cap) caps++;
		}
		for(var j = 0; j < word.length; j++) {
			if(up.charAt(j) == lw.charAt(j)) continue;
			if(word.charAt(j) == up.charAt(j)) upc++;
			else if(word.charAt(j) == lw.charAt(j)) lwc++;
		}
		var min = upc < lwc ? upc : lwc;
		if(min >= 2 && lwc + upc >= 5) n++;
	}
	if(n/all >= 0.3 && all > 8) return 'cAsE words: ' + parseInt(n/len*100) + '%';
	if(caps/all >= 0.3 && all > 5) return 'CAPSLOCK';
	return false;
}


/*=============================================================================
								INITIALIZATION
=============================================================================*/

function replyForm(f) {
	if(!f) return;
	this.on = true;
	this.isQuick = false;
	this.tNum = TNum;
	this.form = f;
	var tr = ch._7ch ? 'li' : 'tr';
	this.tr = 'ancestor::' + tr + '[1]';
	this.recap = $x('.//input[@id="recaptcha_response_field"]', f);
	this.cap = $x('.//input[contains(@name,"aptcha") and not(@name="recaptcha_challenge_field")]', f) || this.recap;
	this.txta = $x('.//' + tr + '//textarea' + (ch.krau ? '[@name="internal_t"]' : '[last()]'), f);
	this.subm = $x('.//' + tr + '//input[@type="submit"]', f);
	this.file = $x('.//' + tr + '//input[@type="file"]', f);
	this.passw = $x('.//' + tr + '//input[@type="password"]', f);
	this.gothr = $x('.//tr[@id="trgetback"]|.//input[@type="radio" or @name="gotothread"]/ancestor::tr[1]', f);
	var pre = './/' + tr + '[not(contains(@style,"none"))]//input[not(@type="hidden") and ';
	this.name = $x(pre + '(@name="field1" or @name="name" or @name="internal_n" or @name="nya1" or @name="akane")]', f);
	this.mail = $x(pre + $case([
		ch._410, '@name="sage"]',
		ch.futr, '@name="denshimeru"]'
	], '(@name="field2" or @name="em" or @name="sage" or @name="email" or @name="nabiki" or @name="dont_bump")]'), f);
}

function getThrdUrl(h, b, tNum) {
	return 'http://' + h + '/' + b + '/' + (/krautchan\.net/.test(h) ? 'thread-' : 'res/')
		+ tNum + (/dobrochan\./.test(h) ? '.xhtml' : (/2chan\.net/.test(h) ? '.htm' : '.html'));
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
	xDelForm = './/form[' + $case([
		hanab || ch.krau, 'contains(@action,"delete")]',
		tinyb, '@name="postcontrols"]',
		ch.gazo, '2]'
	], '@id="delform" or @name="delform"]');
	dForm = $x(xDelForm);
	if(!dForm || $id('DESU_panel')) return false;
	if(ch.hid) setTimeout = function(fn) { fn(); };
	fixDomain();
	fixUneval();
	fixGM();
	var ua = window.navigator.userAgent;
	nav = {
		Firefox: /firefox|minefield|icecat/i.test(ua),
		Opera: /opera/i.test(ua),
		Chrome: /chrome/i.test(ua)
	};
	var gs = nav.Firefox && GM_setValue != null;
	var ss = nav.Opera && scriptStorage != null;
	var ls = false;
	try { ls = typeof localStorage === 'object' && localStorage != null; } catch(e) {}
	var se = false;
	try { se = typeof sessionStorage === 'object' && (sessionStorage.test = 1); } catch(e) {}
	sav = {
		GM: gs,
		script: ss,
		cookie: !ls && !ss && !gs,
		local: ls && !ss && !gs,
		session: se,
		isGlobal: gs || ss
	};
	var url = window.location.pathname || '';
	var a = url.match(/^\/?(?:(.*?)\/*)?(res\/|thread-)?(\d+|index)?(\.[xme]*html?)?$/);
	brd = a[1] || (ch.dfwk ? 'df' : '');
	res = ch.krau ? 'thread-' : 'res/';
	TNum = a[2] ? a[3] : false;
	pageNum = a[3] && !TNum ? parseInt(a[3]) || 0 : 0;
	docExt = a[4] || (ch.gazo ? '.htm' : '.html');
	favIcon = $x('.//head//link[@rel="shortcut icon"]');
	if(favIcon) favIcon = favIcon.href;
	pClass = $case([ch.krau, 'postreply', tinyb, 'post reply'], 'reply');
	xPostRef = $case([
		tinyb, './/a[@class="post_no"][2]',
		ch.krau, './/span[@class="postnumber"]',
		ch.fch, './/span[starts-with(@id,"no")]',
		ch.sib, './/span[@class="reflink" or @class="filesize"]',
		ch.gazo, './/a[@class="del"]'
	], './/span[@class="reflink"]');
	xPostMsg = $case([
		hanab, './/div[@class="postbody"]',
		tinyb, './/p[@class="body"]',
		ch._7ch, './/p[@class="message"]'
	], './/blockquote');
	cssFix = $case([nav.Firefox, '-moz-', nav.Chrome, '-webkit-'], '');
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
	$Del('.//script', node);
	var it = $xb('div[contains(@id,"_info") and contains(@style,"float")]', node);
	var threads = $X('.//div[' + $case([
		it, 'starts-with(@id,"t") and not(contains(@id,"_info"))',
		ch.sib, 'not(@*)',
		ch._7ch, 'starts-with(@id,"thread") and not(@id="thread_controls")',
		tinyb, 'starts-with(@id,"thread") and @itemid'
	], 'starts-with(@id,"thread")') + ']', node);
	if(threads.snapshotLength == 0) {
		var br = !ch.gazo ? 'br[@*]' : 'div[@style="clear:left"]'
		$each($X('.//hr/preceding-sibling::' + br, node), function(el) {
			var thrd = $new('div', {'class': 'thread'});
			var list = $X('preceding-sibling::node()[not(self::div[@class="thread"] '
				+ 'or self::hr or self::' + br + ')]', el);
			$each(list, function(el) { thrd.appendChild(el); }, nav.Firefox);
			$before(el, [thrd]);
		}, true);
		threads = $X('.//div[@class="thread"]', node);
	}
	var table = 'table' +
		$case([ch.fch, '[not(@class="exif")]', ch.tire, '[not(@class="postfiles")]'], '');
	$each(threads, function(thr) {
		if(tinyb) $after(thr, [$new('hr')]);
		var tNum;
		if(!(tinyb || ch.fch || ch.gazo)) {
			var a = $x('.//a[@name]' + (kusaba ? '[2]' : ''), thr);
			tNum = a ? a.name : thr.id.match(/\d+/);
		} else tNum = $x('.//input[@type="checkbox"]', thr).name.match(/\d+/);
		$attr(thr, {'id': 'thread-' + tNum, 'class': 'thread'});
		if(ch.krau) thr = $x('div[@class="thread_body"]', thr);
		var op = $new('div', {'id': 'oppost-' + tNum});
		var opEnd = $x(table + '|div[descendant::table]|div[starts-with(@id,"repl")]', thr);
		var list = opEnd ? $X('preceding-sibling::node()', opEnd) : $X('node()', thr);
		$each(list, function(el) { op.appendChild(el); }, !opEnd || nav.Firefox);
		if(opEnd) {
			$each($X('.//' + table + '|.//div[@class="' + pClass + '"]', thr), function(el) {
				el.id = 'post-' + (el.id || el.getElementsByTagName('td')[1].id
					|| el.getElementsByTagName('input')[0].name).match(/\d+/);
			});
			$before($1(thr), [op]);
		} else thr.appendChild(op);
	});
	if(ch.fch || ch.krau || Cfg.ctime && timeRegex || Cfg.spells == 1 && oSpells.rep[0]) {
		var txt = node.innerHTML;
		if(ch.fch || ch.krau)
			txt = txt.replace(/(^|>|\s)(https*:\/\/.*?)($|<|\s)/ig, '$1<a href="$2">$2</a>$3');
		if(Cfg.ctime && timeRegex) txt = fixTime(txt);
		if(Cfg.spells == 1 && oSpells.rep[0]) txt = doReplace(oSpells.rep, txt);
		node.innerHTML = txt;
	}
}

function initDelform() {
	dForm.id = '';
	$disp(dForm);
	try { parseDelform(dForm); } catch(e) { $disp(dForm); return false; }
	if(!nav.Chrome) $disp(dForm);
	return true;
}

function initPosts() {
	pPanel = $New('span', [
		$new('a', {'class': 'DESU_icn_hide', 'href': '#'}),
		$if(pr.on || oeForm, $new('a', {'class': 'DESU_icn_rep', 'href': '#'}))
	], {'class': 'DESU_postpanel'});
	opPanel = pPanel.cloneNode(true);
	opPanel.className += '_op';
	$append(opPanel, [
		$if(!TNum, $new('a', {'class': 'DESU_icn_expthr', 'href': '#'})),
		$new('a', {'class': 'DESU_icn_favor', 'href': '#'})
	]);
	$each($X('.//table[starts-with(@id,"post-")]|.//div[starts-with(@id,"post-")]', dForm),
		function(post, i) { Posts[i] = post; post.isOp = false; post.Count = i + 2; }
	);
	$each($X('.//div[starts-with(@id,"oppost-")]', dForm),
		function(post, i) { oPosts[i] = post; post.isOp = true; post.Count = 1; }
	);
	forAll(function(post) {
		post.Msg = $x(xPostMsg, post);
		post.Num = post.id.match(/\d+/);
		post.Text = getText(post.Msg).trim();
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
	if(!initBoard()) return;		Log('initBoard');
	readCfg();						Log('readCfg');
	if(!initDelform()) return;		Log('initDelform');
	initPosts();					Log('initPosts');
	readPostsVisib();
	readHiddenThreads();
	readFavorites();
	readViewedPosts();				Log('readData');
	addPanel();						Log('addPanel');
	doChanges();					Log('doChanges');
	forAll(addPostButtons);			Log('addPostButtons');
	eventRefLink();					Log('eventRefLink');
	addRefMap();					Log('addRefMap');
	forAll(doPostFilters);			Log('doPostFilters');
	saveHiddenPosts();				Log('saveHiddenPosts');
	if(Cfg.delhd == 1)
		{ forPosts(mergeHidden);	Log('mergeHidden'); }
	if(Cfg.expimg != 0)
		{ forAll(eventPostImg);		Log('eventPostImg'); }
	if(Cfg.expost != 0 && !TNum)
		{ forAll(expandPost);		Log('expandPost'); }
	addLinkMP3();					Log('addLinkMP3');
	addLinkTube();					Log('addLinkTube');
	addLinkImg();					Log('addLinkImg');
	scriptCSS();					Log('scriptCSS');
	endTime = oldTime - initTime;
}

if(window.opera) $event(doc, {'DOMContentLoaded': doScript});
else doScript();
})(window.opera ? window.opera.scriptStorage : null);
