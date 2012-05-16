// ==UserScript==
// @name			Dollchan Extension Tools
// @version			12.5.15.2
// @namespace		http://www.freedollchan.org/scripts/*
// @author			Sthephan Shinkufag @ FreeDollChan
// @copyright		(C)2084, Bender Bending Rodriguez
// @description		Doing some profit for imageboards
// @icon			https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/stable/Icon.png
// @updateURL		https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/stable/Dollchan_Extension_Tools.meta.js
// @include			*
// ==/UserScript==

(function (scriptStorage) {
'use strict';
var defaultCfg = {
	'version':	'12.5.15.1',
	'lang':		0,		// script language [0=ru, 1=en]
	'sstyle':	1,		// script elements style [0=glass blue, 1=gradient blue, 2=solid grey]
	'spells':	0,		// hide posts by magic spells
	'awipe':	1,		// antiwipe detectors:
	'samel':	1,		//		same lines
	'samew':	1,		//		same words
	'longp':	1,		//		long posts
	'longw':	0,		//		long words
	'caps':		0,		//		cAsE, CAPS
	'specs':	0,		//		special symbols
	'nums':		1,		//		numbers
	'menuhd':	1,		// menu on hide button
	'viewhd':	1,		// view hidden on postnumber
	'delhd':	0,		// delete hidden posts [0=off, 1=merge, 2=full hide]
	'filthr':	1,		// filter threads
	'updthr':	1,		// update threads [0=off, 1=auto, 2=click+count, 3=click]
	'updint':	2,		//		threads update interval
	'updfav':	1,		//		favicon blinking, if new posts detected
	'navig':	2,		// >>links navigation [0=off, 1=no map, 2=+refmap]
	'navdel':	'1000',	//		delay in ms
	'navmrk':	0,		//		mark viewed posts
	'navhid':	0,		//		strike hidden posts in refmap
	'navdis':	0,		//		don't show hidden posts
	'expimg':	2,		// expand images by click [0=off, 1=in post, 2=by center]
	'expost':	2,		// expand shorted posts [0=off, 1=auto, 2=on click]
	'ctime':	0,		// correct time in posts
	'ctmofs':	'-2',	//		offset
	'ctmpat':	'',		//		pattern
	'insnum':	1,		// insert >>link on postnumber click
	'animp':	1,		// animation in script
	'aclose':	0,		// auto-close popups
	'rtitle':	1,		// replace page title in threads
	'attach':	1,		// attach main panel
	'icount':	1,		// show posts/images counter
	'showmp':	0,		// show full main panel
	'ospoil':	1,		// open spoilers
	'noname':	0,		// hide post names
	'noscrl':	1,		// hide scrollers in posts
	'mp3':		1,		// mp3 player by links
	'addimg':	1,		// add images by links
	'imgsrc':	1,		// image search
	'ytube':	3,		// YouTube links embedder [0=off, 1=onclick, 2=player, 3=preview+player, 4=only preview]
	'yptype':	0,		//		player type [0=flash, 1=HTML5 <iframe>, 2=HTML5 <video>]
	'ywidth':	360,	//		player width
	'yheigh':	270,	//		player height
	'yhdvid':	0,		//		hd video quality
	'ytitle':	0,		//		convert links to titles
	'verify':	1,		// reply without reload (verify on submit)
	'addfav':	1,		// add thread to favorites on reply
	'keynav':	0,		// keyboard navigation
	'sagebt':	1,		// email field -> sage btn
	'svsage':	1,		//		remember sage
	'issage':	0,		//		reply with sage
	'pform':	2,		// postform is [0=at top, 1=at bottom, 2=hidden]
	'tform':	1,		// hide thread-creating form
	'forcap':	1,		// language input in captcha [0=off, 1=en, 2=ru]
	'txtbtn':	1,		// text format buttons [0=off, 1=graph, 2=text, 3=usual]
	'txtpos':	0,		//		position at [0=top, 1=bottom]
	'name':		0,		// user name
	'namval':	'',		//		value
	'passw':	0,		// user password
	'pasval':	'',		//		value
	'sign':		0,		// user signature
	'sigval':	'',		//		value
	'norule':	1,		// hide board rules
	'nogoto':	1,		// hide goto field
	'nopass':	1,		// hide password field
	'mask':		0,		// mask images
	'texw':		530,	// textarea width
	'texh':		140,	// textarea height
	'enupd':	1,		// check for script's update
	'betaupd':	0,		// 		check for beta-version
	'lupdchk':	0,		// 		last update check
	'supdint':	2,		// 		update interval in days (0=on page load)
	'pimgs':	0,		// preload images
	'rExif':	0,		// remove EXIF data from JPEGs
	'sImgs':	1		// ability to post same images
},

Lng = {
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
	filterThreads:	['Применять фильтры к тредам', 'Apply filters to threads'],
	hiderMenu:		['Дополнительное меню кнопок скрытия ', 'Additional menu of hide buttons'],
	viewHidden:		['Просмотр скрытого по №поста*', 'View hidden on №postnumber*'],
	threadUpd:		['подгрузка треда* T=', 'thread update* T='],
	selThreadUpd:	[
		['Откл.', 'Авто', 'Счет+клик', 'По клику'],
		['Disable', 'Auto', 'Count+click', 'On click']
	],
	indication:		['индикация*', 'indication*'],
	navigation:		['навигация по >>ссылкам* ', 'navigation by >>links* '],
	selNavigation:	[
		['Откл.', 'Без карты', 'С картой'],
		['Disable', 'No map', 'With map']
	],
	delayPreview:	[' задержка пропадания (мс)', ' delay disappearance (ms)'],
	markViewed:		['Отмечать просмотренные посты*', 'Mark viewed posts*'],
	hidRefmap:		['Зачеркивать >>ссылки на скрытые посты*', 'Strike >>links to hidden posts*'],
	disHidPview:	['Не отображать превью для скрытых постов', 'Don\'t show previews for hidden posts'],
	expandPosts:	['загрузка сокращенных постов*', 'upload of shorted posts*'],
	selClickAuto:	[
		['Откл.', 'Авто', 'По клику'],
		['Disable', 'Auto', 'On click']
	],
	scriptStyle:	[' стиль скрипта', ' script style'],
	insertLink:		['Вставлять >>ссылку по клику на №поста*', 'Insert >>link on №postnumber click*'],
	animation:		['Включить анимацию в скрипте', 'Enable animation in script'],
	autoClose:		['Автоматически закрывать уведомления', 'Close popups automatically'],
	replaceTitle:	['Название треда в заголовке вкладки*', 'Thread name in page title*'],
	attachPanel:	['Прикрепить главную панель ', 'Attach main panel '],
	showImgCount:	['Счетчик постов/изображений в треде', 'Posts/images counter in thread'],
	imgExpand:		['раскрывать изображения ', 'expand images '],
	selImgExpand:	[
		['Откл.', 'В посте', 'По центру'],
		['Disable', 'In post', 'By center']
	],
	hideNames:		['Скрывать имена в постах', 'Hide names in posts'],
	openSpoilers:	['Открывать спойлеры', 'Open spoilers'],
	noScroll:		['Без скролла в постах', 'No scroll in posts'],
	mp3Embed:		['Добавлять плейер к mp3-ссылкам* ', 'Add player to mp3-links* '],
	imgEmbed:		[
		'Загружать изображения к .jpg-, .png-, .gif-ссылкам*',
		'Load images to .jpg-, .png-, .gif-links*'
	],
	YTembed:		['к YouTube-ссылкам* ', 'to YouTube-links* '],
	selYTembed:	[
		['Ничего', 'Плейер по клику', 'Авто плейер', 'Превью+плейер', 'Только превью'],
		['Nothing', 'On click player', 'Auto player', 'Preview+player', 'Only preview']
	],
	YTtitle:		['Загружать названия к YouTube-ссылкам*', 'Load titles into YouTube-links*'],
	replyCheck:		[
		'Постить без перезагрузки (проверять ответ при отправке)*',
		'Posting without reload (check reply on submit)*'
	],
	addToFav:		['Добавлять тред в избранное при ответе', 'Add thread to favorites on reply'],
	mailToSage:		['Sage вместо поля E-mail* ', 'Sage button instead of E-mail field* '],
	saveSage:		['запоминать сажу', 'remember sage'],
	replyForm:		['форма ответа в треде* ', 'reply form in thread* '],
	noThrForm:		['Прятать форму создания треда', 'Hide thread creating form'],
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
	storage:		['Хранение: ', 'Storage: '],
	thrViewed:		['Тредов просмотрено: ', 'Threads viewed: '],
	thrCreated:		['Тредов создано: ', 'Threads created: '],
	pstSended:		['Постов отправлено: ', 'Posts sended: '],
	total:			['Всего: ', 'Total: '],
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
	deleting:		['Удаление...', 'Deleting...'],
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
	cTimePattern:	['Шаблон замены', 'Replace pattern'],
	succDeleted:	['Пост(ы) удален(ы)!', 'Post(s) deleted!'],
	errDelete:		['Не могу удалить пост(ы)!', 'Can\'t delete post(s)!'],
	keyNavig:		['Навигация с помощью клавиатуры* ', 'Navigation with keyboard* '],
	keyNavHelp:		['На доске:\n"J" - тред ниже,\n"K" - тред выше,\n"N" - пост ниже,\n"M" - пост выше,\n"V" - вход в тред\n\nВ треде:\n"J" - пост ниже,\n"K" - пост выше,\n"V" - быстрый ответ', 'On board:\n"J" - thread below,\n"K" - thread above,\n"N" - post below,\n"M" - post above,\n"V" - enter a thread\n\nIn thread:\n"J" - post below,\n"K" - post above,\n"V" - quick reply'],
	search:			['Искать в ', 'Search in '],
	imgSearch:		['Добавлять кнопки для поиска изображений*', 'Add image search buttons*'],
	filters:		['Фильтры', 'Filters'],
	posts:			['Посты', 'Posts'],
	links:			['Ссылки', 'Links'],
	form:			['Форма', 'Form'],
	common:			['Общее', 'Common'],
	showMore:		['Показать подробнее', 'Show more'],
	loadGlobal:		['Загрузить глобальные настройки', 'Load global settings'],
	saveGlobal:		['Сохранить настройки как глобальные', 'Save settings as global'],
	editCfg:		['Редактировать настройки в текстовом формате', 'Edit settings in text format'],
	resetCfg:		['Сбросить в настройки по умолчанию', 'Reset settings to defaults'],
	saveChanges:	['Сохранить внесенные изменения', 'Save your changes'],
	editNotes:		['Правка в текстовом формате', 'Edit notes in text format'],
	infoCount:		['Обновить счетчики постов', 'Refresh posts counters'],
	clrDeleted:		['Очистить записи недоступных тредов', 'Clear notes of inaccessible threads'],
	clrSelected:	['Удалить выделенные записи', 'Remove selected notes'],
	upd:	{
		select:		[
			['Всегда', 'Каждый день', 'Каждые 2 дня', 'Каждую неделю', 'Каждые 2 недели', 'Каждый месяц'],
			['Always', 'Every day', 'Every 2 days', 'Every week', 'Every 2 week', 'Every month']
		],
		interval:	['Интервал проверки', 'Check interval'],
		enable:		['Включить авто-проверку на обновления', 'Enable Auto Update-сheck'],
		beta:		['Проверять обновления для beta-версии', 'Check updates for beta-version'],
		checkNow:	['Проверить сейчас', 'Check now'],
		available:	['Доступно обновление!', 'Update available!'],
		haveLatest:	['У вас стоит самая последняя версия!', 'You have latest version!']
	},
	pImages:		['Предварительно загружать изображения*', 'Preload images*'],
	remExif:		['Удалять EXIF-данные из JPEG-изображений', 'Remove EXIF-data from JPEG-images'],
	sameImgs:		['Возможность отправки одинаковых изображений', 'Ability to post same images'],
	reply:			['Ответ', 'Reply']
},

doc = window.document, Cfg = {}, lCode, Favor = {}, hThrds = {}, Stat = {}, Posts = [], pByNum = [], Visib = [], Expires = [], refMap = [], pSpells = {}, tSpells = {}, oSpells = {}, spellsList = [], ajPviews = {}, ajaxInt, nav = {}, sav = {}, aib = {}, brd, res, TNum, pageNum, docExt, pr = {}, dForm, oeForm, pArea, qArea, pPanel, opPanel, curView = null, pViewTimeout, pDel = {}, dummy, quotetxt = '', docTitle, favIcon, favIconTimeout, isExpImg = false, timePattern, timeRegex, oldTime, endTime, timeLog = '', tubeHidTimeout, tByCnt = [], cPIndex, cTIndex = 0, scrScroll = false, scrollP = true, scrollT = true, kIgnore = false, postWrapper = false, storageLife = 5*24*3600*1000, liteMode = false;


/*==============================================================================
									UTILITES
==============================================================================*/

function $$X(path, root, dc) {
	return dc.evaluate(path, root || dc, null, 7, null);
}

function $X(path, root) {
	return $$X(path, root, doc);
}

function $$x(path, root, dc) {
	return dc.evaluate(path, root || dc, null, 8, null).singleNodeValue;
}

function $x(path, root) {
	return $$x(path, root, doc);
}

function $$xb(path, root, dc) {
	return dc.evaluate(path, root || dc, null, 3, null).booleanValue;
}

function $xb(path, root) {
	return $$xb(path, root, doc);
}

function $c(id, root) {
	return root.getElementsByClassName(id)[0];
}

function $id(id) {
	return doc.getElementById(id);
}

function $t(id, root) {
	return root.getElementsByTagName(id)[0];
}

function $each(list, fn) {
	var i = 0, el;
	if(list) {
		while(el = list.snapshotItem(i++)) {
			fn(el, i - 1);
		}
	}
}

function $html(el, htm) {
	var cln = el.cloneNode(false);
	cln.innerHTML = htm;
	el.parentNode.replaceChild(cln, el);
	return cln;
}

function $attr(el, attr) {
	for(var key in attr) {
		key === 'text' ? el.textContent = attr[key]
		: key === 'value' ? el.value = attr[key]
		: el.setAttribute(key, attr[key]);
	}
	return el;
}

function $event(el, events) {
	for(var key in events) {
		el.addEventListener(key, events[key], false);
	}
	return el;
}

function $rattr(el, attr) {
	if(el.getAttribute(attr)) {
		el.removeAttribute(attr);
	}
	if(nav.Opera && el[attr]) {
		el[attr] = '';
	}
}

function $revent(el, events) {
	for(var key in events) {
		el.removeEventListener(key, events[key], false);
	}
}

function $append(el, nodes) {
	for(var i = 0, len = nodes.length; i < len; i++) {
		if(nodes[i]) {
			el.appendChild(nodes[i]);
		}
	}
}

function $before(el, nodes) {
	for(var i = 0, len = nodes.length; i < len; i++) {
		if(nodes[i]) {
			el.parentNode.insertBefore(nodes[i], el);
		}
	}
}

function $after(el, node) {
	el.parentNode.insertBefore(node, el.nextSibling);
}

function $add(htm) {
	dummy.innerHTML = htm;
	return dummy.firstChild;
}

function $$new(tag, attr, events, dc) {
	var el = dc.createElement(tag);
	if(attr) {
		$attr(el, attr);
	}
	if(events) {
		$event(el, events);
	}
	return el;
}

function $new(tag, attr, events) {
	return $$new(tag, attr, events, doc);
}

function $New(tag, attr, nodes) {
	var el = $new(tag, attr, null);
	$append(el, nodes);
	return el;
}

function $txt(el) {
	return doc.createTextNode(el);
}

function $btn(val, ttl, fn) {
	return $new('input', {
		'type': 'button',
		'value': val,
		'title': ttl}, {
		'click': fn
	});
}

function $if(cond, el) {
	return cond ? el : null;
}

function $disp(el) {
	el.style.display = el.style.display === 'none' ? '' : 'none';
}

function $del(el) {
	if(el) {
		el.parentNode.removeChild(el);
	}
}

function $$Del(path, root, dc) {
	$each($$X(path, root, dc), function(el) {
		$del(el);
	});
}

function $Del(path, root) {
	$$Del(path, root, doc)
}

function $offset(el) {
	var box = el.getBoundingClientRect();
	return {
		top: Math.round(box.top + window.pageYOffset),
		left: Math.round(box.left + window.pageXOffset)
	};
}

function getStyle(el, prop) {
	return doc.defaultView && doc.defaultView.getComputedStyle
		? doc.defaultView.getComputedStyle(el, '').getPropertyValue(prop)
		: '';
}

function $focus(el) {
	window.scrollTo(0, $offset(el).top);
}

function $pd(e) {
	e.preventDefault();
}

function $rnd() {
	return Math.round(Math.random()*1e10).toString(10);
}

function insertInto(el, txt) {
	var scrtop = el.scrollTop,
		start = el.selectionStart,
		end = el.selectionEnd;
	el.value = el.value.substr(0, start) + txt + el.value.substr(end);
	el.setSelectionRange(start + txt.length, start + txt.length);
	el.focus();
	el.scrollTop = scrtop;
}

function txtSelection() {
	return nav.Opera ? doc.getSelection() : window.getSelection().toString();
}

function strToRegexp(str) {
	var t = str.match(/\/.*?[^\\]\/[ig]*/)[0],
		l = t.lastIndexOf('/');
	return new RegExp(t.substr(1, l - 1), t.substr(l + 1));
}

function isEmptyObj(obj) {
	for(var i in obj) {
		return false;
	}
	return true;
}

function $uneval(obj) {
	return unescape(uneval(obj).replace(/\\u/g, '%u'));
}

function HTMLtoDOM(html) {
	var myDoc, el, first;
	try {
		myDoc = (new DOMParser()).parseFromString(html, 'text/html');
	} catch (e) {}
	if(!myDoc || !myDoc.body) {
		myDoc = doc.implementation.createHTMLDocument('');
		el = myDoc.documentElement;
		el.innerHTML = html;
		first = el.firstElementChild;
		if(el.childElementCount === 1 && first.localName.toLowerCase() === 'html') {
			myDoc.replaceChild(first, el);
		}
	}
	return myDoc;
}

function Log(txt) {
	var newTime = (new Date()).getTime();
	timeLog += txt + ': ' + (newTime - oldTime) + 'ms\n';
	oldTime = newTime;
}

function fixFunctions() {
	if(!('head' in doc)) {
		doc.head = $t('head', doc);
	}
	if(aib.hid) {
		window.setTimeout = function(fn, num) {
			if(typeof fn === 'function') fn();
			return 1;
		};
	}
	if(!String.prototype.trim) {
		String.prototype.trim = function () {
			var str = this.replace(/^\s\s*/, ''),
				s = /\s/,
				i = str.length;
			while(s.test(str.charAt(--i))) {}
			return str.slice(0, i + 1);
		};
	}
	if(typeof uneval !== 'function') {
		(function(){var f=[],g={"\t":"t","\n":"n","\u000b":"v","\u000c":"f","\r":"\r","'":"'",'"':'"',"\\":"\\"},h=function(b){if(b in g)return"\\"+g[b];var c=b.charCodeAt(0);return c<32?"\\x0"+c.toString(16):c<127?"\\"+b:c<256?"\\x"+c.toString(16):c<4096?"\\u0"+c.toString(16):"\\u"+c.toString(16)},i=function(b){return b.toString()},j={"boolean":i,number:i,string:function(b){return"'"+b.toString().replace(/[\x00-\x1F\'\"\\\u007F-\uFFFF]/g,h)+"'"},undefined:function(){return"undefined"},"function":i}, k=function(b,c){var a=[],d;for(d in b)b.hasOwnProperty(d)&&(a[a.length]=uneval(d)+":"+uneval(b[d],1));return c?"{"+a.toString()+"}":"({"+a.toString()+"})"},uneval_set=function(b,c,a){f[f.length]=[b,c];j[c]=a||k};uneval_set(Array,"array",function(b){for(var c=[],a=0,d=b.length;a<d;a++)c[a]=uneval(b[a]);return"["+String(c)+"]"});uneval_set(RegExp,"regexp",i);uneval_set(Date,"date",function(b){return"(new Date("+b.valueOf()+"))"});window.uneval=function(b,c){var a;if(b===void 0)a="undefined";else if(b===null)a= "null";else{a:if(a=typeof b,a=="object"){a=0;for(var d=f.length;a<d;a++)if(b instanceof f[a][0]){a=f[a][1];break a}a="object"}a=(j[a]||k)(b,c)}return a}})();
	}
	if(!('GM_log' in window)) {
		window.GM_log = function() {};
	}
	if(!('GM_xmlhttpRequest' in window)) {
		window.GM_xmlhttpRequest = function(obj) {
			var xhr = new window.XMLHttpRequest();
			xhr.onreadystatechange = function() {
				xhr.responseHeaders = xhr.getAllResponseHeaders();
				obj.onreadystatechange(xhr);
			};
			xhr.onload = function() {
				try{
					xhr.responseHeaders = xhr.getAllResponseHeaders();
					obj.onload(xhr);
				} catch(e) {}
			};
			xhr.open(obj.method, obj.url, true);
			xhr.setRequestHeader('Accept-Encoding', 'deflate, gzip, x-gzip');
			for(var h in obj.headers) {
				xhr.setRequestHeader(h, obj[h]);
			}
			xhr.finalUrl = obj.url;
			xhr.send(null);
		};
	}
}


/*==============================================================================
								STORAGE / CONFIG
==============================================================================*/

function setCookie(name, value, life) {
	if(name) {
		doc.cookie = escape(name) + '=' + escape(value) + ';expires='
			+ (new Date((new Date()).getTime() + life)).toGMTString() + ';path=/';
	}
}

function getCookie(name) {
	var one,
		arr = doc.cookie.split('; '),
		i = arr.length;
	while(i--) {
		one = arr[i].split('='); {
			if(one[0] === escape(name)) {
				return unescape(one[1]);
			}
		}
	}
	return false;
}

function turnCookies(name) {
	var data = getCookie('DESU_Cookies'),
		arr = data ? data.split('|') : [];
	arr[arr.length] = name;
	if(arr.length > 13) {
		setCookie(arr[0], '', -10);
		arr.splice(0, 1);
	}
	setCookie('DESU_Cookies', arr.join('|'), storageLife);
}

function getStored(name) {
	if(sav.GM) {
		return GM_getValue(name);
	}
	if(sav.script) {
		return scriptStorage.getItem(name);
	}
	if(sav.local) {
		return localStorage.getItem(name);
	}
	return getCookie(name);
}

function setStored(name, value) {
	if(sav.GM) {
		GM_setValue(name, value);
	} else if(sav.script) {
		scriptStorage.setItem(name, value);
	} else if(sav.local) {
		localStorage.setItem(name, value);
	} else {
		setCookie(name, value, storageLife);
	}
}

function getStoredObj(name, def) {
	try {
		return eval(getStored(name)) || def;
	} catch(e) {
		return def;
	}
}

function saveSpells(val) {
	spellsList = val.split('\n');
	setStored('DESU_Spells_' + aib.dm, val);
	initSpells();
}

function fixGlobalCfg() {
	Cfg['forcap'] = aib.hana || aib.tire || aib.vomb || aib.ment || aib.tinyIb ? 2 : 1;
}

function setDefaultCfg() {
	Cfg = defaultCfg;
	fixGlobalCfg();
	setStored('DESU_Config_' + aib.dm, $uneval(defaultCfg));
}

function isValidCfg(data) {
	try {
		if(eval(data).version) {
			return true;
		}
	} catch(e) {}
	return false;
}

function readCfg() {
	var key,
		global = false,
		data = getStored('DESU_Config_' + aib.dm);
	if(sav.isGlobal && !isValidCfg(data)) {
		data = getStored('DESU_GlobalCfg');
		global = true;
	}
	if(isValidCfg(data)) {
		Cfg = eval(data);
		Cfg['version'] = defaultCfg['version'];
		for(key in defaultCfg) {
			if(Cfg[key] === undefined) {
				Cfg[key] = defaultCfg[key];
			}
		}
	} else {
		setDefaultCfg();
	}
	if(global) {
		fixGlobalCfg();
	}
	if(nav.Opera && nav.Opera < 11.1 && Cfg['sstyle'] === 0) {
		Cfg['sstyle'] = 1;
	}
	if(nav.Firefox < 6 && !nav.Chrome) {
		Cfg['pimgs'] = 0;
	}
	if(!aib.abu) {
		Cfg['noscrl'] = 0;
	}
	if(!nav.Firefox) {
		Cfg['updfav'] = 0;
	}
	if(nav.Opera) {
		Cfg['ytitle'] = 0;
		Cfg['enupd'] = 0;
	}
	if(Cfg['svsage'] === 0) {
		Cfg['issage'] = 0;
	}
	setStored('DESU_Config_' + aib.dm, $uneval(Cfg));
	lCode = Cfg['lang'];
	Stat = getStoredObj('DESU_Stat_' + aib.dm, {view: 0, op: 0, reply: 0});
	if(TNum) {
		Stat.view = +Stat.view + 1;
	}
	setStored('DESU_Stat_' + aib.dm, $uneval(Stat));
	if(Cfg['ctime']) {
		parseTimePattern();
	}
	saveSpells(getStored('DESU_Spells_' + aib.dm) || '');
}

function saveCfg(name, val) {
	Cfg[name] = val;
	setStored('DESU_Config_' + aib.dm, $uneval(Cfg));
}

function toggleCfg(name) {
	saveCfg(name, Cfg[name] === 0 ? 1 : 0);
}

function getVisib(pNum) {
	var key = sav.cookie ? pByNum[pNum].Count : brd + pNum;
	return key in Visib ? Visib[key] : null;
}

function readPostsVisib() {
	var i, arr, data,
		currTime = (new Date()).getTime();
	if(sav.cookie) {
		if(TNum) {
			data = getStored('DESU_Posts_' + aib.dm + '_' + TNum);
			if(data) {
				i = data.length;
				while(i--) {
					Visib[i] = +data[i];
				}
			}
		}
	} else {
		data = getStored('DESU_Posts_' + aib.dm);
		if(data) {
			arr = data.split('-');
			i = arr.length;
			while((i -= 3) >= 0) {
				if(currTime < +arr[i + 2]) {
					Visib[arr[i]] = +arr[i + 1];
					Expires[arr[i]] = +arr[i + 2];
				}
			}
		}
	}
	readHiddenThreads();
	forEachPost(function(post) {
		var pNum = post.Num;
		post.Vis = getVisib(pNum);
		if(post.isOp) {
			if(hThrds[brd] && (sav.cookie && hThrds[brd].indexOf(pNum) >= 0
				|| !sav.cookie && hThrds[brd][pNum] !== undefined)) {
				setPostVisib(post, 0);
			} else if(post.Vis === 0) {
				Visib[brd + pNum] = null;
				post.Vis = null;
			}
		}
	});
}

function savePostsVisib() {
	var key,
		arr = [],
		id = 'DESU_Posts_' + aib.dm;
	if(sav.cookie) {
		if(TNum) {
			id += '_' + TNum;
			if(!getStored(id)) {
				turnCookies(id);
			}
			setStored(id, Visib.join(''));
		}
	} else {
		for(key in Visib) {
			if(!/^\d$/.test(Visib[key])) {
				break;
			}
			arr[arr.length] = key + '-' + Visib[key] + '-' + Expires[key];
		}
		setStored(id, arr.join('-'));
	}
	toggleContent('Hid', true);
}

function readHiddenThreads() {
	hThrds = getStoredObj('DESU_Threads_' + aib.dm, {});
}

function saveHiddenThreads(txt) {
	setStored('DESU_Threads_' + aib.dm, txt);
}

function toggleHiddenThread(post, vis) {
	var i,
		b = brd,
		tNum = post.Num;
	if(sav.cookie) {
		if(!hThrds[b]) {
			hThrds[b] = [];
		}
		i = hThrds[b].indexOf(tNum);
		if(vis === 0 && i < 0) {
			hThrds[b].push(tNum);
		}
		if(vis === 1 && i >= 0) {
			hThrds[b].splice(i, 1);
		}
		if(escape(uneval(hThrds)).length > 4095) {
			hThrds[b].shift();
		}
	} else {
		if(!hThrds[b]) {
			hThrds[b] = {};
		}
		if(vis === 0) {
			hThrds[b][tNum] = post.thr.dTitle;
		} else {
			delete hThrds[b][tNum];
			if(isEmptyObj(hThrds[b])) {
				delete hThrds[b];
			}
		}
	}
	saveHiddenThreads($uneval(hThrds));
}

function readFavorites() {
	Favor = getStoredObj('DESU_Favorites', {});
}

function saveFavorites(txt) {
	setStored('DESU_Favorites', txt);
	toggleContent('Fav', true);
}

function removeFavorites(h, b, tNum) {
	delete Favor[h][b][tNum];
	if(isEmptyObj(Favor[h][b])) {
		delete Favor[h][b];
	}
	if(isEmptyObj(Favor[h])) {
		delete Favor[h];
	}
	if(pByNum[tNum]) {
		$x('.//a[starts-with(@class,"DESU_btnFav")]', pByNum[tNum].Btns).className = 'DESU_btnFav';
	}
}

function toggleFavorites(post, btn) {
	var h = aib.host,
		b = brd,
		tNum = post.Num;
	if(!btn) {
		return;
	}
	readFavorites();
	if(Favor[h] && Favor[h][b] && Favor[h][b][tNum]) {
		removeFavorites(h, b, tNum);
		saveFavorites($uneval(Favor));
		return;
	}
	if(!Favor[h]) {
		Favor[h] = {};
	}
	if(!Favor[h][b]) {
		Favor[h][b] = {};
	}
	Favor[h][b][tNum] = {
		cnt: post.thr.pCount,
		txt: sav.cookie ? post.thr.dTitle.substring(0, 25) : post.thr.dTitle
	};
	if(sav.cookie && escape(uneval(Favor)).length > 4095) {
		$alert(Lng.cookiesLimit[lCode], '');
		delete Favor[h][b][tNum];
		return;
	}
	btn.className = 'DESU_btnFavSel';
	saveFavorites($uneval(Favor));
}

function markViewedPost(pNum) {
	var post = pByNum[pNum];
	if(post && (post.className).indexOf('DESU_viewed') < 0) {
		post.className += ' DESU_viewed';
	}
}

function readViewedPosts() {
	var arr, i;
	if(Cfg['navmrk'] !== 0 && sav.session) {
		arr = (sessionStorage.viewedPosts || '').split(',');
		for(i in arr) {
			markViewedPost(arr[i]);
		}
	}
}

function saveViewedPosts(pNum) {
	var arr;
	if(sav.session) {
		arr = (sessionStorage.viewedPosts || '').split(',');
		arr.push(pNum);
		sessionStorage.viewedPosts = arr;
	}
}

/*==============================================================================
									MAIN PANEL
==============================================================================*/

function addPanel() {
	var imgLen = getImages(dForm).snapshotLength,
		pButton = function(bName, bTitle, bClick, bHref, bOver, bOut) {
			return $New('li', null, [
				$new('a', {
					'id': 'DESU_btn' + bName,
					'title': bTitle,
					'href': bHref ? bHref : '#'
				}, {
					'click': bClick,
					'mouseover': bOver,
					'mouseout': bOut
				})
			]);
		};

	$before(dForm, [
		$new('div', {'style': 'clear: both;'}, null),
		$New('div', {'id': 'DESU_panel'}, [
			$new('a', {
				'id': 'DESU_btnLogo',
				'href': '#'}, {
				'click': function(e) {
					$pd(e);
					toggleCfg('showmp');
					scriptCSS();
				}
			}),
			$New('ul', {'id': 'DESU_panelBtns'}, [
				pButton('Settings', Lng.settings[lCode], function(e) {
					$pd(e);
					toggleContent('Cfg', false);
				}, null, null, null),
				pButton('Hidden', Lng.hidden[lCode], function(e) {
					$pd(e);
					toggleContent('Hid', false);
				}, null, null, null),
				pButton('Favor', Lng.favorites[lCode], function(e) {
					$pd(e);
					toggleContent('Fav', false);
				}, null, null, null),
				pButton('Refresh', Lng.refresh[lCode], function(e) {
					$pd(e);
					window.location.reload();
				}, null, function() {
					if(!TNum) {
						selectAjaxPages();
					}
				}, removeSelMenu),
				pButton('Goback', Lng.goBack[lCode], null,
					'http://' + aib.host + getPageUrl(pageNum - 1), null, null
				),
				$if(!TNum, pButton('Gonext', Lng.goNext[lCode], null,
					'http://' + aib.host + getPageUrl(pageNum + 1), null, null
				)),
				pButton('Goup', Lng.goUp[lCode], function(e) {
					$pd(e);
					window.scrollTo(0, 0);
				}, null, null, null),
				pButton('Godown', Lng.goDown[lCode], function(e) {
					$pd(e);
					window.scrollTo(0, doc.body.scrollHeight || doc.body.offsetHeight);
				}, null, null, null),
				$if(!TNum && (pr.on || oeForm), pButton('Newthr', Lng.newThread[lCode], toggleMainReply, null, null, null)),
				$if(imgLen > 0, pButton('Expimg', Lng.expImages[lCode], function(e) {
					$pd(e);
					Cfg['expimg'] = 1;
					isExpImg = !isExpImg;
					forEachPost(function(post) {
						expandAllPostImg(post, isExpImg);
					});
				}, null, null, null)),
				$if(pr.file || oeForm, pButton('Maskimg', Lng.maskImages[lCode], function(e) {
					$pd(e);
					toggleCfg('mask');
					scriptCSS();
				}, null, null, null)),
				$if(TNum && Cfg['updthr'] !== 3, pButton('UpdOn', Lng.autoupd[lCode], function(e) {
					$pd(e);
					if(ajaxInt) {
						endPostsUpdate();
					} else {
						this.id = 'DESU_btnUpdOn';
						initThreadsUpdater();
					}
				}, null, null, null)),
				$if(aib.nul,
					pButton('Catalog', Lng.goCatalog[lCode], null, 'http://0chan.ru/' + brd + '/catalog.html', null, null)
				)
			]),
			$if(TNum, $New('div', {'id': 'DESU_panelInfo'}, [
				$new('span', {
					'title': Lng.postsImages[lCode],
					'text': Posts.length + '/' + imgLen
				}, null)
			]))
		]),
		$new('div', {'class': 'DESU_content'}, null),
		$new('div', {'id': 'DESU_alertBox'}, null),
		$new('hr', {'style': 'clear: both;'}, null)
	]);
}

function toggleContent(name, isUpd) {
	if(liteMode) {
		return;
	}
	var el, id,
		fn = function(e) {
			showContent(el, id, name, isUpd);
			this.removeEventListener(nav.aEvent, fn, false);
		};
	el = $c('DESU_content', doc);
	id = 'DESU_content' + name;
	if(!isUpd || el.id === id) {
		if(el.childElementCount && Cfg['animp'] !== 0 && nav.Anim) {
			el.addEventListener(nav.aEvent, fn, false);
			el.className = 'DESU_content DESU_cfgClose';
		} else {
			showContent(el, id, name, isUpd);
		}
	}
}

function showContent(el, id, name, isUpd) {
	el.innerHTML = '';
	if(!isUpd && el.id === id) {
		el.id = '';
		return;
	}
	el.id = id;
	if(Cfg['attach'] === 0) {
		el.appendChild($new('hr', {'style': 'clear: both;'}, null));
	}
	if(name === 'Cfg') {
		addSettings();
	} else {
		el.appendChild($add('<table><tbody align="left"></tbody></table>'));
		if(Cfg['attach'] !== 0) {
			$t('table', el).style.backgroundColor = getStyle(doc.body, 'background-color');
		}
		if(name === 'Hid') {
			readHiddenThreads();
			addHiddenTable();
		}
		if(name === 'Fav') {
			readFavorites();
			addFavoritesTable();
		}
	}
	if(Cfg['animp'] !== 0 && nav.Anim) {
		el.className = 'DESU_content DESU_cfgOpen DESU_aOpened';
	}
}


/*==============================================================================
								"SETTINGS" WINDOW
==============================================================================*/

function addSettings() {
	var lBox = function(name, txt, fn, id) {
		var el = $new('input', {
			'type': 'checkbox'}, {
			'click': function() {
				toggleCfg(name);
				if(fn) {
					fn();
				}
			}
		});
		el.checked = Cfg[name] !== 0;
		if(id !== '') {
			el.id = id;
		}
		return $New('label', null, [el, $txt(' ' + txt)]);
	},
	
	divBox = function(name, txt, fn) {
		return $New('div', null, [lBox(name, txt, fn, '')]);
	},
	
	inpTxt = function(name, size, fn) {
		return $new('input', {
			'type': 'text',
			'id': 'DESU_' + name,
			'size': size,
			'value': Cfg[name]}, {
			'keyup': function() {
				saveCfg(name, $id('DESU_' + name).value.replace(/\|/g, ''));
				if(fn) {
					fn();
				}
			}
		})
	},
	
	optSel = function(name, arr, txt, fn) {
		for(var i = 0, len = arr.length, el, opt = []; i < len; i++) {
			opt[i] = '<option value="' + i + '">' + arr[i] + '</option>';
		}
		el = $event($add('<select id="' + name + '_sel">' + opt.join('') + '</select>'), {
			'change': (fn ? fn : function() {
				saveCfg(name, this.selectedIndex);
			})
		});
		el.selectedIndex = Cfg[name];
		return $New('label', null, [el, $txt(' ' + txt)]);
	}, 
	
	cfgTab = function(txt, el) {
		return $New('div', {'class': aib.pClass + ' DESU_cfgTabBack'}, [
			$new('div', {
				'class': 'DESU_cfgTab',
				'text': txt}, {
				'click': function() {
					openTab(this, el);
				}
			})
		])
	},
	
	openTab = function(tab, el) {
		if(tab.className == 'DESU_cfgTab_sel') {
			return;
		}
		var oldEl = $c('DESU_cfgBody', doc);
		if(oldEl) {
			oldEl.parentNode.replaceChild(el, oldEl);
			$c('DESU_cfgTab_sel', doc).className = 'DESU_cfgTab';
		} else {
			$after($id('DESU_cfgBar'), el);
		}
		if(Cfg['keynav'] !== 0) {
			addEvents(el);
		}
		tab.className = 'DESU_cfgTab_sel';
		if(el === cfgFilters) {
			spellsList = getStored('DESU_Spells_' + aib.dm).split('\n');
			initSpells();
			$id('DESU_spellEdit').value = spellsList.join('\n');
		}
	},
	
	cfgFilters = $New('div', {
		'class': 'DESU_cfgBody',
		'id': 'DESU_cfgFilters'
	}, [
		$New('div', null, [
			$New('span', {'id': 'DESU_spellPanel'}, [
				$new('a', {
					'text': Lng.add[lCode],
					'href': '#'}, {
					'click': $pd,
					'mouseover': selectSpell,
					'mouseout': removeSelMenu
				}),
				$new('a', {
					'text': Lng.apply[lCode],
					'href': '#'}, {
					'click': function(e) {
						$pd(e);
						applySpells('');
					}
				}),
				$new('a', {
					'text': Lng.clear[lCode],
					'href': '#'}, {
					'click': function(e) {
						$pd(e);
						$id('DESU_spellEdit').value = '';
						applySpells('');
					}
				}),
				$new('a', {
					'text': '?',
					'target': '_blank',
					'href': 'http://www.freedollchan.org/scripts/spells'
				}, null)
			]),
			lBox('spells', Lng.spells[lCode], toggleSpells, 'DESU_spellChk'),
			$new('textarea', {
				'id': 'DESU_spellEdit',
				'rows': 7,
				'cols': 55
			}, null)
		]),
		$New('div', null, [
			lBox('awipe', Lng.antiWipe[lCode], null, ''),
			$btn('>', Lng.showMore[lCode], function() {
				$disp($id('DESU_cfgWipe'));
			})
		]),
		$New('div', {
			'id': 'DESU_cfgWipe',
			'style': 'display: none; padding-left: 25px;'
		}, [
			divBox('samel', Lng.sameLines[lCode], null),
			divBox('samew', Lng.sameWords[lCode], null),
			divBox('longp', Lng.longPosts[lCode], null),
			divBox('longw', Lng.longWords[lCode], null),
			divBox('caps', Lng.caps[lCode], null),
			divBox('specs', Lng.specSymbols[lCode], null),
			divBox('nums', Lng.numbers[lCode], null)
		]),
		divBox('filthr', Lng.filterThreads[lCode], null),
		divBox('menuhd', Lng.hiderMenu[lCode], null),
		divBox('viewhd', Lng.viewHidden[lCode], null),
		$New('div', null, [
			optSel('delhd', Lng.selHiddenPosts[lCode], Lng.hiddenPosts[lCode], function() {
				processHidden(this.selectedIndex, Cfg['delhd']);
			})
		])
	]),
	
	cfgPosts = $New('div', {
		'class': 'DESU_cfgBody',
		'id': 'DESU_cfgPosts'
	}, [
		$New('div', null, [
			optSel('updthr', Lng.selThreadUpd[lCode], Lng.threadUpd[lCode], null),
			optSel('updint', [0.5, 1, 1.5, 2, 5, 15, 30], 'min* ', null),
			$if(nav.Firefox, lBox('updfav', Lng.indication[lCode], null, ''))
		]),
		$New('div', null, [
			optSel('expost', Lng.selClickAuto[lCode], Lng.expandPosts[lCode], null)
		]),
		$New('div', null, [
			optSel('expimg', Lng.selImgExpand[lCode], Lng.imgExpand[lCode], null)
		]),
		$if(nav.Firefox >= 6 || nav.Chrome, divBox('pimgs', Lng.pImages[lCode], null)),
		divBox('imgsrc', Lng.imgSearch[lCode], null),
		divBox('ospoil', Lng.openSpoilers[lCode], scriptCSS),
		divBox('noname', Lng.hideNames[lCode], scriptCSS),
		$if(aib.abu, lBox('noscrl', Lng.noScroll[lCode], scriptCSS, '')),
		$New('div', null, [
			lBox('keynav', Lng.keyNavig[lCode], null, ''),
			$new('a', {
				'text': '?',
				'href': '#'}, {
				'click': function(e) {
					$pd(e);
					$alert(Lng.keyNavHelp[lCode], '');
				}
			})
		]),
		$New('div', null, [
			lBox('ctime', Lng.cTime[lCode], toggleTimeSettings, 'DESU_ctime')
		]),
		$New('div', {'style': 'padding-left: 25px;'}, [
			$New('div', null, [
				inpTxt('ctmofs', 3, null),
				$new('span', {text: Lng.cTimeOffset[lCode]}, null)
			]),
			$New('div', null, [
				inpTxt('ctmpat', 30, null),
				$txt(' '),
				$new('a', {
					'text': Lng.cTimePattern[lCode],
					'href': '#'}, {
					'click': function(e) {
						$pd(e);
						$alert('"s" - second (one digit),\n"i" - minute (one digit),\n"h" - hour (one digit),\n"d" - day (one digit),\n"n" - month (one digit),\n"m" - month (string),\n"y" - year (one digit),\n"-" - any symbol\n"+" - any symbol except digits\n"?" - previous char may not be\n\nExamples:\n0chan.ru: "++++yyyy+m+dd+hh+ii+ss"\niichan.ru, 2ch.so: "++++dd+m+yyyy+hh+ii+ss"\ndobrochan.ru: "dd+m+?+?+?+?+?+yyyy+++++++hh+ii+?s?s?"\n410chan.org: "dd+nn+yyyy+++++++hh+ii+ss"\n4chan.org: "nn+dd+yy+++++hh+ii+?s?s?"\n4chon.net: "nn+dd+yy+++++++hh+ii+ss"\nkrautchan.net: "yyyy+nn+dd+hh+ii+ss+--?-?-?-?-?"', '');
					}
				})
			])
		])
	]),
	
	cfgLinks = $New('div', {
		'class': 'DESU_cfgBody',
		'id': 'DESU_cfgLinks'
	}, [
		$New('div', null, [
			optSel('navig', Lng.selNavigation[lCode], Lng.navigation[lCode], null)
		]),
		$New('div', {'style': 'padding-left: 25px;'}, [
			$New('div', null, [
				inpTxt('navdel', 8, null),
				$txt(Lng.delayPreview[lCode])
			]),
			divBox('navmrk', Lng.markViewed[lCode], null),
			divBox('navhid', Lng.hidRefmap[lCode], null),
			divBox('navdis', Lng.disHidPview[lCode], null)
		]),
		divBox('insnum', Lng.insertLink[lCode], null),
		divBox('mp3', Lng.mp3Embed[lCode], null),
		divBox('addimg', Lng.imgEmbed[lCode], null),
		$New('div', null, [
			optSel('ytube', Lng.selYTembed[lCode], Lng.YTembed[lCode], null)
		]),
		$New('div', {'style': 'padding-left: 25px;'}, [
			$New('div', null, [
				optSel('yptype', nav.Opera
					? ['Flash', 'HTML5 iframe']
					: ['Flash', 'HTML5 iframe', 'HTML5 video'], ' ', null
				),
				inpTxt('ywidth', 6, null),
				$txt('×'),
				inpTxt('yheigh', 6, null), $txt(' '),
				lBox('yhdvid', 'HD ', null, '')
			]),
			$if(!nav.Opera, lBox('ytitle', Lng.YTtitle[lCode], null, ''))
		])
	]),
	
	cfgForm = $New('div', {
		'class': 'DESU_cfgBody',
		'id': 'DESU_cfgForm'
	}, [
		$if(pr.on, $New('div', null, [
			optSel('pform', Lng.selReplyForm[lCode], Lng.replyForm[lCode], null)
		])),
		$if(pr.on, divBox('tform', Lng.noThrForm[lCode], function() {
			if(!TNum) {
				pArea.style.display = Cfg['tform'] ? 'none' : '';
			}
		})),
		divBox('verify', Lng.replyCheck[lCode], null),
		$if(!aib.nul && !aib.tiny && nav.h5Rep, divBox('sImgs', Lng.sameImgs[lCode], null)),
		$if(!aib.nul && !aib.tiny && nav.h5Rep, divBox('rExif', Lng.remExif[lCode], null)),
		divBox('addfav', Lng.addToFav[lCode], null),
		$if(pr.mail, $New('div', null, [
			lBox('sagebt', Lng.mailToSage[lCode], null, ''),
			lBox('svsage', Lng.saveSage[lCode], null, '')
		])),
		$New('div', null, [
			optSel('forcap', Lng.selCapInput[lCode], Lng.capInput[lCode], null)
		]),
		$if(pr.on, $New('div', null, [
			optSel('txtbtn', Lng.selFormatBtns[lCode], Lng.formatBtns[lCode], function() {
				saveCfg('txtbtn', this.selectedIndex);
				addTextPanel();
				scriptCSS();
			}),
			lBox('txtpos', Lng.atBottom[lCode], scriptCSS, '')
		])),
		$if(pr.name, $New('div', null, [
			inpTxt('namval', 20, setUserName),
			lBox('name', Lng.fixedName[lCode], setUserName, 'DESU_fixNameChk')
		])),
		$if(pr.passw, $New('div', null, [
			inpTxt('pasval', 20, setUserPassw),
			lBox('passw', Lng.fixedPass[lCode], setUserPassw, 'DESU_fixPassChk')
		])),
		$if(pr.txta, $New('div', null, [
			inpTxt('sigval', 20, null),
			lBox('sign', Lng.fixedSign[lCode], null, '')
		])),
		$New('div', null, [
			$if(pr.on || oeForm, $txt(Lng.dontShow[lCode])),
			lBox('norule', Lng.rules[lCode], scriptCSS, ''),
			$if(pr.gothr, lBox('nogoto', Lng.gotoField[lCode], function() {
				$disp(pr.gothr);
			}, '')),
			$if(pr.passw, lBox('nopass', Lng.passw[lCode], function() {
				$disp(pr.passw.parentNode.parentNode);
			}, ''))
		])
	]),
	
	cfgCommon = $New('div', {
		'class': 'DESU_cfgBody',
		'id': 'DESU_cfgCommon'
	}, [
		$New('div', null, [
			optSel('sstyle',
				['Glass blue', 'Gradient blue', 'Solid grey'],
				Lng.scriptStyle[lCode], function() {
					saveCfg('sstyle', this.selectedIndex);
					scriptCSS();
				}
			)
		]),
		divBox('attach', Lng.attachPanel[lCode], function() {
			toggleContent('Cfg', false);
			scriptCSS();
		}),
		divBox('icount', Lng.showImgCount[lCode], scriptCSS),
		divBox('rtitle', Lng.replaceTitle[lCode], null),
		divBox('animp', Lng.animation[lCode], null),
		divBox('aclose', Lng.autoClose[lCode], null),
		$if(!nav.Opera, $New('div', null, [
			divBox('enupd', Lng.upd.enable[lCode], null),
			$New('div', {'id': 'DESU_updCont', 'style': 'padding: 2px 0 10px 25px;'}, [
				optSel('supdint', Lng.upd.select[lCode], Lng.upd.interval[lCode], function() {
					saveCfg('supdint', this.selectedIndex);
				}),
				divBox('betaupd', Lng.upd.beta[lCode], null),
				$btn(Lng.upd.checkNow[lCode], '', function() {
					var el = $id('DESU_updRes');
					el.innerHTML = '<div id="DESU_updRes_check">' + Lng.checking[lCode] + '</div>';
					checkForUpdates(true, function(html) {
						el.innerHTML = html;
					});
				})
			]),
			$new('div', {'id': 'DESU_updRes', 'style': 'font-size: 1.1em; text-align: center'}, null)
		]))
	]),
	
	cfgInfo = $New('div', {
		'class': 'DESU_cfgBody',
		'id': 'DESU_cfgInfo'
	}, [
		$add('<div style="padding-left: 10px;"><div style="display: inline-block; vertical-align: top; width: 200px;"><b>' + Lng.version[lCode] + Cfg['version'] + '</b><br><br>' + Lng.storage[lCode] + (sav.GM ? 'Mozilla config' : sav.script ? 'Opera ScriptStorage' : sav.local ? 'Local Storage' : 'Cookies') + '<br>' + Lng.thrViewed[lCode] + Stat.view + '<br>' + Lng.thrCreated[lCode] + Stat.op + '<br>' + Lng.pstSended[lCode] + Stat.reply + '</div><div style="display: inline-block; vertical-align: top; padding-left: 17px; border-left: 1px solid grey;">' + timeLog.split('\n').join('<br>') + '<br>' + Lng.total[lCode] + endTime + 'ms</div><div style="text-align: center;"><a href="http://www.freedollchan.org/scripts/" target="_blank">http://www.freedollchan.org/scripts/</a></div></div>')
	]);
	
	$append($id('DESU_contentCfg'), [
		$New('div', {
			'class': aib.pClass,
			'id': 'DESU_cfgWindow'
		}, [
			$new('div', {
				'id': 'DESU_cfgHead',
				'text': 'Dollchan Extension Tools'
			}, null),
			$New('div', {'id': 'DESU_cfgBar'}, [
				cfgTab(Lng.filters[lCode], cfgFilters),
				cfgTab(Lng.posts[lCode], cfgPosts),
				cfgTab(Lng.links[lCode], cfgLinks),
				cfgTab(Lng.form[lCode], cfgForm),
				cfgTab(Lng.common[lCode], cfgCommon),
				cfgTab(Lng.info[lCode], cfgInfo)
			]),
			$New('div', {'id': 'DESU_cfgBtns'}, [
				$New('div', {'style': 'float: right;'}, [
					optSel('lang', ['Ru', 'En'], '', function() {
						saveCfg('lang', this.selectedIndex);
						window.location.reload();
					}),
					$if(sav.isGlobal, $btn(Lng.load[lCode], Lng.loadGlobal[lCode], function() {
						if(isValidCfg(getStored('DESU_GlobalCfg'))) {
							setStored('DESU_Config_' + aib.dm, '');
							window.location.reload();
						} else {
							$alert(Lng.noGlobalCfg[lCode], '');
						}
					})),
					$if(sav.isGlobal, $btn(Lng.save[lCode], Lng.saveGlobal[lCode], function() {
						setStored('DESU_GlobalCfg', $uneval(Cfg));
						toggleContent('Cfg', true);
					})),
					$btn(Lng.edit[lCode], Lng.editCfg[lCode], function() {
						$disp($attr($id('DESU_cfgEdit'), {
							'value': getStored('DESU_Config_' + aib.dm)
						}).parentNode);
					}),
					$btn(Lng.reset[lCode], Lng.resetCfg[lCode], function() {
						setDefaultCfg();
						setStored('DESU_Stat_' + aib.dm, '');
						setStored('DESU_Favorites', '');
						setStored('DESU_Threads_' + aib.dm, '');
						saveSpells('');
						window.location.reload();
					})
				]),
				$new('br', {'style': 'clear: both;'}, null),
				$New('div', {'style': 'display: none;'}, [
					$new('textarea', {
						'id': 'DESU_cfgEdit',
						'rows': 10,
						'cols': 56,
						'value': ''
					}, null),
					$btn(Lng.save[lCode], Lng.saveChanges[lCode], function() {
						setStored('DESU_Config_' + aib.dm, $id('DESU_cfgEdit').value.trim());
						window.location.reload();
					})
				])
			])
		])
	]);
	openTab($c('DESU_cfgTab', doc), cfgFilters);
}


/*==============================================================================
									"HIDDEN" WINDOW
==============================================================================*/

function addHiddenTable() {
	var pp, cln, i, b, tNum, url,
		clones = [],
		tcnt = 0,
		pcnt = 0,
		table = $t('tbody', $id('DESU_contentHid'));
	forEachPost(function(post) {
		if(post.Vis !== 0) {
			return;
		}
		pp = !post.isOp;
		cln = $attr(($id('DESU_hidThr_' + post.Num) || post).cloneNode(true), {'id': ''});
		clones.push(cln);
		cln.style.display = '';
		cln.pst = post;
		cln.vis = 0;
		$event(pp ? $c('DESU_btnUnhide', doc) : $x('.//a', cln), {
			'click': function(el) {
				return function(e) {
					$pd(e);
					el.vis = el.vis === 0 ? 1 : 0;
					if(pp) {
						togglePost(el, el.vis);
					} else {
						el.nextElementSibling.style.display = el.vis === 1 ? '' : 'none';
					}
				}
			}(cln)
		});
		if(Cfg['attach'] === 0) {
			$event(aib.getRef(cln) || $x('.//a', cln), {
				'mouseover': function(el) {
					return function() {
						if(el.vis === 0) {
							if(pp) {
								togglePost(el, 1);
							} else {
								el.nextElementSibling.style.display = '';
							}
						}
					}
				}(cln),
				'mouseout': function(el) {
					return function() {
						if(el.vis === 0) {
							if(pp) {
								togglePost(el, 0);
							} else {
								el.nextElementSibling.style.display = 'none';
							}
						}
					}
				}(cln)
			});
		}
		$append(table, [
			$if(!pp && tcnt++ === 0 || pp && pcnt++ === 0, $New('tr', null, [
				$add('<b>' + (pp ? Lng.hiddenPosts[lCode] : Lng.hiddenThrds[lCode]) + Lng.onPage[lCode] + ':</b>')
			])),
			$New('tr', null, [
				cln,
				$if(!pp, $attr(post.cloneNode(true), {
					'style': 'display: none; padding-left: 15px; overflow: hidden; border: 1px solid grey;'
				}))
			])
		]);
		if(!pp) {
			togglePost(cln.nextElementSibling, 1);
		}
	});
	if(pcnt + tcnt === 0) {
		table.insertRow(-1).appendChild($add('<b>' + Lng.noHidOnPage[lCode] + '</b>'));
	} else {
		$append(table.insertRow(-1), [
			$btn(Lng.expandAll[lCode], '', function() {
				if(this.value === Lng.expandAll[lCode]) {
					this.value = Lng.undo[lCode];
					for(i = 0; cln = clones[i++];) {
						setPostVisib(cln.pst, 1);
					}
				} else {
					this.value = Lng.expandAll[lCode];
					for(i = 0; cln = clones[i++];) {
						setPostVisib(cln.pst, cln.vis);
					}
				}
			}),
			$btn(Lng.save[lCode], '', function() {
				for(i = 0; cln = clones[i++];) {
					if(cln.vis !== 0) {
						setPostVisib(cln.pst, 1);
					}
				}
				savePostsVisib();
			})
		]);
	}
	$append(table, [
		$New('tr', null, [
			$new('hr', null, null),
			$add('<b>' + (isEmptyObj(hThrds) ? Lng.noHidThrds[lCode] : Lng.hiddenThrds[lCode]) + '</b>')
		])
	]);
	if(!isEmptyObj(hThrds)) {
		for(b in hThrds) {
			$append(table, [
				$New('tr', {
					'class': 'DESU_hidTHead',
					'id': 'DESU_hidTHead_' + b
				}, [
					$new('input', {
						'type': 'checkbox'}, {
						'click': function() {
							var inp = this;
							$each($X(
								'.//tr[contains(@id,"_' + inp.parentNode.id.substr(14) + '|")]/div/input',
								table
							), function(el) {
								el.checked = inp.checked;
							});
						}
					}),
					$add('<b>' + b + '</b>')
				])
			]);
			for(tNum in hThrds[b]) {
				if(sav.cookie) {
					tNum = hThrds[b][tNum];
				}
				url = getThrdUrl(aib.host, b, tNum);
				$append(table, [
					$New('tr', {
						'class': 'DESU_hidTData',
						'id': 'DESU_hidTData_' + b + '|' + tNum
					}, [
						$New('div', {'class': aib.pClass}, [
							$new('input', {'type': 'checkbox'}, null),
							$add('<a href="' + url + '" target="_blank">№' + tNum + '</a>'),
							$if(!sav.cookie, $txt(' - ' + hThrds[b][tNum]))
						])
					])
				]);
			}
		}
	}
	$append(table, [
		$New('tr', null, [
			$btn(Lng.edit[lCode], Lng.editNotes[lCode], function() {
				$disp($id('DESU_hidTEdit').parentNode);
			}),
			$btn(Lng.remove[lCode], Lng.clrSelected[lCode], function() {
				$each($X('.//tr[@class="DESU_hidTData"]', table), function(el) {
					var i,
						arr = el.id.substr(14).split('|'),
						b = arr[0],
						tNum = arr[1];
					if($t('input', el).checked) {
						if(pByNum[tNum]) {
							setPostVisib(pByNum[tNum], 1);
						} else if(sav.cookie) {
							i = hThrds[b].indexOf(tNum);
							if(i >= 0) {
								hThrds[b].splice(i, 1);
							}
						} else {
							Visib[b + tNum] = 1;
							delete hThrds[b][tNum];
						}
						if(isEmptyObj(hThrds[b])) {
							delete hThrds[b];
						}
					}
				});
				setStored('DESU_Threads_' + aib.dm, $uneval(hThrds));
				savePostsVisib();
			})
		]),
		$New('tr', {'style': 'display: none;'}, [
			$new('textarea', {
				'id': 'DESU_hidTEdit',
				'rows': 9,
				'cols': 70,
				'value': $uneval(hThrds)
			}, null),
			$btn(Lng.save[lCode], Lng.saveChanges[lCode], function() {
				saveHiddenThreads($id('DESU_hidTEdit').value);
			})
		])
	]);
	eventRefLink(table);
}


/*==============================================================================
								"FAVORITES" WINDOW
==============================================================================*/

function addFavoritesTable() {
	var h, b, tNum, url, fav, list,
		table = $t('tbody', $id('DESU_contentFav'));
	for(h in Favor) {
		for(b in Favor[h]) {
			$append(table, [
				$New('tr', {
					'class': 'DESU_favHead',
					'id': 'DESU_favHead_' + h + '|' + b
				}, [
					$new('input', {
						'type': 'checkbox'}, {
						'click': function() {
							var inp = this;
							$each($X(
								'.//tr[contains(@id,"_' + inp.parentNode.id.substr(13) + '|")]/div/input',
								table
							), function(el) {
								el.checked = inp.checked;
							});
						}
					}),
					$add('<a href="http://' + h + '/' + b + '" target="_blank">' + h + '/' + b + '</a>')
				])
			]);
			for(tNum in Favor[h][b]) {
				url = getThrdUrl(h, b, tNum);
				fav = Favor[h][b][tNum];
				$append(table, [
					$New('tr', {
						'class': 'DESU_favData',
						'id': 'DESU_favData_' + h + '|' + b + '|' + tNum
					}, [
						$New('div', {'class': aib.pClass}, [
							$new('input', {'type': 'checkbox'}, null),
							$new('a', {
								'class': 'DESU_btnExpthr',
								'href': '#"'}, {
								'click': loadFavorThread
							}),
							$add('<a href="' + url + '" target="_blank">№' + tNum + '</a>'),
							$txt(' - ' + fav.txt),
							$add('<span class="DESU_favPCount">[<span>' + fav.cnt + '</span>]</span>')
						]),
						$new('div', {
							'id': tNum,
							'class': 'DESU_favThr',
							'style': 'display: none;'
						}, null)
					])
				]);
			}
		}
	}
	if(!table.firstChild) {
		table.insertRow(-1).appendChild($add('<b>' + Lng.noFavorites[lCode] + '</b>'));
	}
	list = $X('.//tr[@class="DESU_favData"]', table);
	$append(table, [
		$New('tr', null, [
			$new('hr', null, null),
			$btn(Lng.edit[lCode], Lng.editNotes[lCode], function() {
				$disp($id('DESU_favEdit').parentNode);
			}),
			$btn(Lng.info[lCode], Lng.infoCount[lCode], function() {
				$each(list, function(el) {
					var c,
						arr = el.id.substr(13).split('|'),
						cnt = 0;
					if(aib.host === arr[0]) {
						c = $t('span', $c('DESU_favPCount', el));
						$attr(c, {
							'class': 'DESU_icnWait',
							'text': ''
						});
						ajaxGetPosts(null, arr[1], arr[2], function(dc, post, j) {
							cnt++;
						}, function(err) {
							$attr(c, {
								'class': '',
								'text': err || cnt
							});
							if(!err) {
								Favor[arr[0]][arr[1]][arr[2]].cnt = cnt;
								setStored('DESU_Favorites', $uneval(Favor));
							}
						});
					}
				});
			}),
			$btn(Lng.clear[lCode], Lng.clrDeleted[lCode], function() {
				$each(list, function(el) {
					var arr = el.id.substr(13).split('|');
					ajaxGetPosts(getThrdUrl(arr[0], arr[1], arr[2]), null, null, null, function(err) {
						if(err) {
							removeFavorites(arr[0], arr[1], arr[2]);
							saveFavorites($uneval(Favor));
						}
					});
				});
			}),
			$btn(Lng.remove[lCode], Lng.clrSelected[lCode], function() {
				$each(list, function(el) {
					var arr = el.id.substr(13).split('|');
					if($t('input', el).checked) {
						removeFavorites(arr[0], arr[1], arr[2]);
					}
				});
				saveFavorites($uneval(Favor));
			})
		]),
		$New('tr', {'style': 'display: none;'}, [
			$new('textarea', {
				'id': 'DESU_favEdit',
				'rows': 9,
				'cols': 70,
				'value': $uneval(Favor)
			}, null),
			$btn(Lng.save[lCode], Lng.saveChanges[lCode], function() {
				saveFavorites($id('DESU_favEdit').value);
			})
		])
	]);
}


/*==============================================================================
								POPUP ALERT MESSAGES
==============================================================================*/

function $show(el) {
	var i, showing;
	if(Cfg['animp'] === 0) {
		el.style.opacity = 1;
		return;
	}
	if(nav.Anim) {
		el.oclassName = el.className;
		el.className += ' DESU_aOpen DESU_aOpened';
		return;
	}
	i = 0;
	showing = setInterval(function() {
		var s;
		if(!el || i++ > 8) {
			clearInterval(showing);
			return;
		}
		s = el.style;
		s.opacity = i/10;
		s.paddingTop = parseInt(s.paddingTop, 10) + 1 + 'px';
		s.paddingBottom = parseInt(s.paddingBottom, 10) + 1 + 'px';
	}, 25);
}

function $close(el) {
	var i, h, closing;
	if(!el) {
		return;
	}
	if(Cfg['animp'] === 0) {
		$del(el);
		return;
	}
	if(nav.Anim) {
		el.addEventListener(nav.aEvent, function() {
			$del(el);
		}, false);
		el.className = el.oclassName + ' DESU_aClose';
		return;
	}
	i = 8;
	h = el.clientHeight - 18;
	el.style.height = h + 'px';
	closing = setInterval(function() {
		var s, hh;
		if(!el || i-- < 0) {
			clearInterval(closing);
			$del(el);
			return;
		}
		s = el.style;
		hh = parseInt(s.height, 10) - h/10;
		s.opacity = i/10;
		s.paddingTop = parseInt(s.paddingTop, 10) - 1 + 'px';
		s.paddingBottom = parseInt(s.paddingBottom, 10) - 1 + 'px';
		s.height = (hh < 0 ? 0 : hh) + 'px';
	}, 25);
}

function $alert(txt, id) {
	var el,
		nid = 'DESU_alert';
	if(id !== '') {
		nid += id;
		el = $id(nid);
	}
	if(el) {
		$c(nid, el).innerHTML = txt.trim();
	} else {
		el = $New('div', {
			'class': aib.pClass,
			'id': nid,
			'style': 'opacity: 0;'
		}, [
			$if(id !== 'Wait', $new('a', {
				'href': '#',
				'style': 'display: inline-block; vertical-align: top; font-size: 150%;',
				'text': '× '}, {
				'click': function(e) {
					$pd(e);
					$close(this.parentNode);
				}
			})),
			$add('<div class="' + nid + '" style="display: inline-block;">'
				+ txt.trim() + '</div>')
		]);
	}
	$show($id('DESU_alertBox').appendChild(el));
	if(Cfg['aclose'] !== 0 && id !== 'Wait') {
		setTimeout(function() {
			$close(el);
		}, 4e3);
	}
}


/*==============================================================================
								DROPDOWN SELECT MENUS
==============================================================================*/

function removeSelMenu(e) {
	if(!$xb('ancestor-or-self::div[@id="DESU_select"]', e.relatedTarget)) {
		$del($id('DESU_select'));
	}
}

function addSelMenu(el, fPanel, html) {
	var y, pos,
		pst = getPost(el),
		x = el.className === 'DESU_btnSrc'
			? 'left: ' + $offset(el).left
			: 'right: ' + (doc.body.clientWidth - $offset(el).left - el.offsetWidth);
	if(Cfg['attach'] !== 0 && fPanel) {
		pos = 'fixed';
		y = el.id === 'DESU_btnRefresh'
			? 'bottom: 25'
			: 'top: ' + (el.getBoundingClientRect().top + el.offsetHeight);
	} else {
		pos = 'absolute';
		y = 'top: ' + ($offset(el).top + el.offsetHeight);
	}
	doc.body.appendChild($event($add(
		'<div class="' + aib.pClass + '" id="DESU_select" style="position: ' + pos
			+ '; width: auto; min-width: 0; ' + x + 'px; ' + y
			+ 'px; z-index: 9999; padding: 2px 5px; border: 1px solid grey;">' + html + '</div>'
	), {
		'mouseout': removeSelMenu,
		'mouseover': function() {
			if(pst && pst.node) {
				markPost(pst.node, false);
			}
		}
	}));
	return $X('.//div[@id="DESU_select"]//a', doc);
}

function selectSpell(e) {
	$each(addSelMenu(
		e.target,
		true,
		'<div style="display: inline-block; border-right: 1px solid grey;"><a href="#">'
			+ ('#b/,#b/itt,#exp ,#exph ,#img ,#imgn ,#name ,#noimg,#notxt,#num ,').split(',')
				.join('</a><a href="#">') + '</a></div><div style="display: inline-block;"><a href="#">'
			+ ('#op,#outrep,#rep ,#sage,#skip ,#theme ,#tmax ,#trip,#video ').split(',')
				.join('</a><a href="#">') + '</a></div>'
	), function(a) {
		$event(a, {
			'click': function(e) {
				var exp = this.textContent;
				$pd(e);
				if(exp === '#b/') {
					exp = '#' + brd + '/ ';
				}
				if(exp === '#b/itt') {
					if(TNum) {
						exp = '#' + brd + '/' + TNum + ' ';
					} else {
						return;
					}
				}
				insertInto($id('DESU_spellEdit'), exp);
			}
		});
	});
}

function selectPostHider(post) {
	if(Cfg['menuhd'] === 0 || Cfg['filthr'] === 0 && post.isOp) {
		return;
	}
	var a = addSelMenu(post.Btns.firstChild, false, '<a href="#">' + Lng.selHiderMenu[lCode].join('</a><a href="#">') + '</a>');
	$event(a.snapshotItem(0), {
		'click': function(e) {
			$pd(e);
			applySpells(quotetxt);
		},
		'mouseover': function() {
			quotetxt = txtSelection().trim();
		}
	});
	$event(a.snapshotItem(1), {
		'click': function(e) {
			$pd(e);
			applySpells(post.Img.snapshotLength === 0
				? '#noimg'
				: '#img =' + getImgWeight(post) + '@' + getImgSize(post).join('x')
			)
		}
	});
	$event(a.snapshotItem(2), {
		'click': function(e) {
			$pd(e);
			hideBySameText(post);
		}
	});
}

function selectExpandThread(post) {
	$each(addSelMenu(
		$x('a[3]', post.Btns),
		false,
		'<a href="#">' + Lng.selExpandThrd[lCode].join('</a><a href="#">') + '</a>'
	), function(a) {
		$event(a, {
			'click': function(e) {
				$pd(e);
				loadThread(post, parseInt(this.textContent, 10), null);
			}
		});
	});
}

function selectAjaxPages() {
	$each(addSelMenu(
		$id('DESU_btnRefresh'),
		true,
		'<a href="#">' + Lng.selAjaxPages[lCode].join('</a><a href="#">') + '</a>'
	), function(a, i) {
		$event(a, {
			'click': function(e) {
				$pd(e);
				loadPages(i + 1);
			}
		});
	});
}

function selectImgSearch(btn, href) {
	addSelMenu(btn, false,
		'<a class="DESU_srcIqdb" href="http://iqdb.org/?url=' + href
			+ '" target="_blank">' + Lng.search[lCode] + 'IQDB</a>'
		+ '<a class="DESU_srcTineye" href="http://tineye.com/search/?url=' + href
			+ '" target="_blank">' + Lng.search[lCode] + 'TinEye</a>'
		+ '<a class="DESU_srcGoogle" href="http://google.ru/searchbyimage?image_url=' + href
			+ '" target="_blank">' + Lng.search[lCode] + 'Google</a>'
		+ '<a class="DESU_srcSaucenao" href="http://saucenao.com/search.php?url=' + href
			+ '" target="_blank">' + Lng.search[lCode] + 'SauceNAO</a>'
	);
}


/*==============================================================================
								KEYBOARD NAVIGATION
==============================================================================*/

function addEvents(node) {
	$each($X('.//input[@type="text" or @type="password"]|.//textarea', node), function(el) {
		el.onfocus = function() {
			kIgnore = true;
		};
		el.onblur = function() {
			kIgnore = false;
		};
	});
}

function initKeyNavig() {
	var eT;
	if(!aib.nul) {
		addEvents(pr.form);
	} else {
		pr.form.addEventListener(nav.Opera ? 'DOMAttrModified' : 'DOMSubtreeModified', function(e) {
			if(eT) {
				clearTimeout(eT);
			}
			eT = setTimeout(function() {
				addEvents(pr.form);
			}, 200);
		}, false);
	}
	addEvents(dForm);
	window.onscroll = function() {
		if(!scrScroll) {
			scrollP = true;
			scrollT = true;
		} else {
			scrScroll = false;
		}
	};
	doc.onkeydown = function (e) {
		var curTh,
			kc = e.keyCode;
		if(kIgnore || e.ctrlKey || e.altKey || e.shiftKey 
			|| (kc !== 74 && kc !== 75 && kc !== 77 && kc !== 78 && kc !== 86)) {
			return;
		}
		$pd(e);
		if(scrollT) {
			cPIndex = !scrollP ? Posts.indexOf(tByCnt[cTIndex]) : findCurrPost(Posts);
		}
		if(!TNum && scrollP) {
			if((Posts[cPIndex] || {}).isOp) {
				cTIndex = curTh = tByCnt.indexOf(Posts[cPIndex]);
			} else if(scrollT) {
				for(curTh = cPIndex <= 0 ? 0 : cPIndex; curTh > 0 && !Posts[curTh].isOp; curTh--) {}
				cTIndex = curTh = tByCnt.indexOf(Posts[curTh]);
			} else {
				curTh = cTIndex;
			}
		} else {
			curTh = cTIndex;
		}
		scrollP = scrollT = false;
		if(kc === 86) {
			if(TNum) {
				showQuickReply(Posts[cPIndex]);
			} else if(nav.Firefox) {
				GM_openInTab(getThrdUrl(aib.host, brd, tByCnt[curTh].Num), false, true);
			} else {
				window.open(getThrdUrl(aib.host, brd, tByCnt[curTh].Num), '_blank');
			}
			return;
		}
		scrScroll = true;
		if(kc === 75) {
			if(TNum) {
				scrollUpToPost();
			} else {
				try {
					cTIndex = scrollToPost(tByCnt, cTIndex <= 0 ? 0 : cTIndex - 1, -1, true, true);
					scrollT = true;
				} catch(er) {}
			}
		} else if(kc === 74) {
			if(TNum) {
				scrollDownToPost();
			} else if(cTIndex !== tByCnt.length - 1) {
				try {
					cTIndex = scrollToPost(tByCnt, cTIndex + 1, 1, true, true);
					scrollT = true;
				} catch(er) {}
			}
		} else if(!TNum && kc === 77) {
			scrollUpToPost();
		} else if(!TNum && kc === 78) {
			scrollDownToPost();
		}
	};
}

function findCurrPost(posts) {
	for(var i = 0, scrolled = window.pageYOffset; i < posts.length; i++) {
		if($offset(posts[i]).top > scrolled) {
			return i - 1;
		}
	}
}

function scrollDownToPost() {
	if(cPIndex !== Posts.length - 1) {
		try {
			cPIndex = scrollToPost(Posts, cPIndex + 1, 1, Posts[cPIndex + 1].isOp
				|| Posts[cPIndex + 1].getBoundingClientRect().top > window.innerHeight/2
					- Posts[cPIndex + 1].clientHeight/2, false);
			scrollP = true;
		} catch(e) {}
	}
}

function scrollUpToPost() {
	try {
		cPIndex = scrollToPost(Posts, cPIndex <= 0 ? 0 : cPIndex - 1, -1, true, false);
		scrollP = true;
	} catch(e) {}
}

function scrollToPost(posts, idx, dir, scroll, toTop) {
	var post,
		mIdx = idx;
	while(posts[mIdx].Vis === 0 || posts[mIdx].thr.Vis === 0) {
		mIdx += dir;
	}
	post = posts[mIdx];
	if(mIdx !== idx || scroll) {
		window.scrollTo(0, toTop
			? $offset(post).top
			: $offset(post).top - window.innerHeight/2 + post.clientHeight/2
		);
	}
	idx = $c('DESU_selected', doc);
	if(idx) {
		idx.className = idx.oldClassName;
	}
	if(post.isOp) {
		post = post.thr;
	}
	post.oldClassName = post.className;
	post.className += ' DESU_selected';
	return mIdx;
}


/*==============================================================================
								POSTFORM CHANGES
==============================================================================*/

function refreshCapSrc(src, tNum) {
	if(aib.kus || aib.tinyIb) {
		return src.replace(/\?[^?]+$|$/, (aib._410 ? '?board=' + brd + '&' : '?') + Math.random())
	}
	if(tNum > 0) {
		src = src.replace(/mainpage|res\d+/ig, 'res' + tNum);
	}
	return src.replace(/dummy=\d*/, 'dummy=' + $rnd());
}

function refreshCapImg(tNum) {
	var src, e,
		img = pr.recap ? $id('recaptcha_image') || pr.recap : $x(pr.tr + '//img', pr.cap);
	if(aib.hana || pr.recap) {
		e = doc.createEvent('MouseEvents');
		e.initEvent('click', true, true);
		img.dispatchEvent(e);
	} else {
		src = refreshCapSrc(img.getAttribute('src'), tNum);
		img.src = '';
		img.src = src;
	}
}

function doSageBtn() {
	var c = Cfg['issage'] !== 0;
	$id('DESU_sageBtn').innerHTML = '&nbsp;' + (c
		? '<a class="DESU_btnSage" href="#"></a><b style="color: red;">SAGE</b>'
		: '<i>(no&nbsp;sage)</i>'
	);
	if(pr.mail.type === 'text') {
		pr.mail.value = c ? 'sage' : aib.fch ? 'noko' : '';
	} else {
		pr.mail.checked = c;
	}
}

function setUserName() {
	saveCfg('namval', $id('DESU_fixName').value.replace(/\|/g, ''));
	pr.name.value = $id('DESU_fixNameChk').checked ? Cfg['namval'] : '';
}

function setUserPassw() {
	var val,
		el = $id('DESU_pasval');
	if(el) {
		saveCfg('pasval', el.value.replace(/\|/g, ''));
	}
	val = Cfg['passw'] !== 0 ? Cfg['pasval'] : $rnd().substring(0, 8);
	el = $x('.//input[@type="password"]', dForm);
	if(el) {
		el.value = val;
	}
	pr.passw.value = val;
}

function initPostform() {
	qArea = $new('div', {
		'id': 'DESU_qarea',
		'class': aib.pClass,
		'style': 'display: none;'
	}, null);
	pArea = $New('center', {'id': 'DESU_parea'}, [
		$New('div', {
			'id': 'DESU_toggleReply',
			'style': 'display: none;'
		}, [
			$txt('['),
			$new('a', {
				'text': Lng.expandForm[lCode], href: '#'}, {
				'click': toggleMainReply
			}),
			$txt(']')
		]),
		$New('div', {'id': 'DESU_pform'}, [pr.form, oeForm]),
		$new('hr', null, null)
	]);
	if(TNum && Cfg['pform'] === 2 || !TNum && Cfg['tform'] !== 0) {
		$disp(pArea);
	}
	if(TNum && Cfg['pform'] === 1) {
		$after(aib.fch ? $t('hr', dForm) : dForm, pArea);
	} else {
		$before(dForm, [pArea]);
	}
	if(pr.on) {
		doPostformChanges(null);
	} else if(oeForm) {
		ajaxGetPosts(null, brd, Posts[0].Num, null, doPostformChanges);
	}
}

function doPostformChanges(a) {
	var img, src, _img, sageBtn, m, load,
		el = pr.txta,
		resMove = function(e) {
			el.style.width = e.pageX - $offset(el).left + 'px';
			el.style.height = e.pageY - $offset(el).top + 'px';
		},
		resStop = function() {
			$revent(doc.body, {'mousemove': resMove, 'mouseup': resStop});
			saveCfg('texw', parseInt(el.style.width, 10));
			saveCfg('texh', parseInt(el.style.height, 10));
		};
	pr.form.style.display = 'inline-block';
	pr.form.style.textAlign = 'left';
	addTextPanel();
	$after(el, $new('div', {
		'id': 'DESU_txtResizer'}, {
		'mousedown': function(e) {
			$pd(e);
			$event(doc.body, {
				'mousemove': resMove,
				'mouseup': resStop
			});
		}
	}));
	el.style.cssText = 'width: ' + Cfg['texw'] + 'px; height: ' + Cfg['texh'] + 'px;';
	$event(el, {
		'keypress': function(e) {
			var code = e.charCode || e.keyCode;
			if((code === 33 || code === 34) && e.which === 0) {
				e.target.blur();
				window.focus();
			}
		}
	});
	$event(pr.subm, {
		'click': function(e) {
			var txt = pr.txta.value;
			pr.txta.value =
				(Cfg['spells'] === 0 || !oSpells.outrep[0] ? txt : doReplace(oSpells.outrep, txt))
				+ (Cfg['sign'] !== 0 && Cfg['sigval'] !== '' ? '\n' + Cfg['sigval'] : '');
			if(Cfg['verify'] !== 0) {
				$close($id('DESU_alertUpErr'));
				$alert(Lng.checking[lCode], 'Wait');
			}
			if(Cfg['addfav'] !== 0 && pr.tNum) {
				toggleFavorites(pByNum[pr.tNum], $c('DESU_btnFav', pByNum[pr.tNum].Btns));
			}
			if(pr.tNum) {
				Stat.reply = +Stat.reply + 1;
			} else {
				Stat.op = +Stat.op + 1;
			}
			setStored('DESU_Stat_' + aib.dm, $uneval(Stat));
			if(aib.nul && pr.isQuick) {
				$disp(qArea);
				$after($id('DESU_toggleReply'), $id('DESU_pform'));
			}
		}
	});
	$each($X('.//input[@type="text"]', pr.form), function(el) {
		el.size = 35;
	});
	if(Cfg['nogoto'] !== 0 && pr.gothr) {
		$disp(pr.gothr);
	}
	if(Cfg['nopass'] !== 0 && pr.passw) {
		$disp($x(pr.tr, pr.passw));
	}
	if(Cfg['name'] !== 0 && pr.name) {
		setTimeout(function() {
			pr.name.value = Cfg['namval'];
		}, 0);
	}
	if(pr.passw) {
		setTimeout(setUserPassw, 0);
	}
	if(pr.recap) {
		$attr(pr.subm, {'onclick': 'Recaptcha.focus_response_field = function() {}'});
		el = $id('recaptcha_image');
		if(el) {
			$attr(el, {
				'onclick': 'Recaptcha.reload()',
				'style': 'width: 300px; cursor: pointer;'
			});
		}
		el = $id('recaptcha_reload_btn');
		if(el) {
			$disp(el.parentNode);
		}
	}
	if(pr.cap) {
		setTimeout(function() {
			if(aib.abu) {
				refreshCapImg(0);
				$rattr(pr.cap, 'onclick');
			}
		}, 0);
		$rattr(pr.cap, 'onfocus');
		$rattr(pr.cap, 'onkeypress');
		$event($attr(pr.cap, {
			'autocomplete': 'off'}), {
			'keypress': function(e) {
				var code = e.charCode || e.keyCode,
					chr = String.fromCharCode(code).toLowerCase(),
					ru = 'йцукенгшщзхъфывапролджэячсмитьбюё',
					en = 'qwertyuiop[]asdfghjkl;\'zxcvbnm,.`',
					i = en.length;
				if(Cfg['forcap'] === 0 || e.which === 0) {
					return;
				}
				if(Cfg['forcap'] === 1) {
					if(code < 0x0410 || code > 0x04FF) {
						return;
					}
					while(i--) {
						if(chr === ru[i]) {
							chr = en[i];
						}
					}
				} else {
					if(code < 0x0021 || code > 0x007A) {
						return;
					}
					while(i--) {
						if(chr === en[i]) {
							chr = ru[i];
						}
					}
				}
				$pd(e);
				insertInto(e.target, chr);
			}
		});
		if(!aib.hana && !pr.recap) {
			if(aib.kus) {
				img = $x('.//a|.//img', $x(pr.tr, pr.cap));
				src =
					aib._410 ? ('/faptcha.php?board=' + brd)
					: aib.hid ? ('/securimage/securimage_show.php?' + Math.random())
					: '/' + brd.substr(0, brd.indexOf('/') + 1) + 'captcha.php?' + Math.random();
			} else {
				img = $x(pr.tr + '//img', pr.cap);
				src = img ? img.src : '/' + brd + '/captcha.pl?key=mainpage&amp;dummy=' + $rnd();
			}
			_img = $new('img', {
				'alt': Lng.loading[lCode],
				'title': Lng.refresh[lCode],
				'style': 'display: block; border: none; cursor: pointer;',
				'src': refreshCapSrc(src, TNum || 0)}, {
				'click': function() {
					refreshCapImg(TNum || 0);
				}
			});
			if(img) {
				img.parentNode.replaceChild(_img, img);
			} else {
				while(pr.cap.nextSibling) {
					$del(pr.cap.nextSibling);
				}
				$after(pr.cap, _img);
			}
		}
	}
	if(Cfg['sagebt'] !== 0 && pr.mail) {
		sageBtn = $new('span', {
			'id': 'DESU_sageBtn'}, {
			'click': function(e) {
				e.stopPropagation();
				$pd(e);
				toggleCfg('issage');
				doSageBtn();
			}
		});
		m = $x('ancestor::label', pr.mail) || pr.mail;
		if(m.nextElementSibling || m.previousElementSibling) {
			$disp(m);
			$after(m, sageBtn);
		} else {
			$disp($x(pr.tr, pr.mail));
			$after(pr.name || pr.subm, sageBtn);
		}
		setTimeout(doSageBtn, 0);
	}
	if(Cfg['verify'] !== 0) {
		if(!aib.nul && !aib.tiny && nav.h5Rep) {
			pr.form.onsubmit = function(e) {
				$pd(e);
				setTimeout(function() {
					prepareData(pr.form, function(by, data) {
						ajaxCheckSubmit(pr.form, by, data, checkUpload);
					});
				}, 1e3);
			};
			dForm.onsubmit = function(e) {
				$pd(e);
				$alert(Lng.deleting[lCode], 'Wait');
				$each($X('.//input[@type="checkbox"]', dForm), function(el) {
					el.onclick = function() {
						return false;
					}
				});
				prepareData(dForm, function(by, data) {
					ajaxCheckSubmit(dForm, by, data, checkDelete);
				});
			};
		} else {
			if(aib.nul) {
				pr.form.action = pr.form.action.replace(/https/, 'http');
			}
			load = nav.Opera ? 'DOMFrameContentLoaded' : 'load';
			$after($c('DESU_content', doc), $event($add(
				'<iframe name="DESU_iframe" id="DESU_iframe" src="about:blank" />'
			), {
				load: function() {
					setTimeout(iframeCheckSubmit, 500);
				}
			}));
			$rattr($attr(pr.form, {'target': 'DESU_iframe'}), 'onsubmit');
		}
	}
}


/*==============================================================================
							ONSUBMIT REPLY / DELETE CHECK
==============================================================================*/

function ajaxCheckSubmit(form, by, data, fn) {
	var headers = {'Content-type': 'multipart/form-data; boundary=' + by};
	if(nav.Firefox) {
		headers['Referer'] = '' + doc.location;
	}
	GM_xmlhttpRequest({
		'method': form.method,
		'headers': headers,
		'data': data,
		'url': form.action,
		'onreadystatechange': function(xhr) {
			if(xhr.readyState === 4) {
				if(xhr.status === 200) {
					fn(HTMLtoDOM(xhr.responseText), xhr.finalUrl);
				} else {
					$close($id('DESU_alertWait'));
					$alert(xhr.status === 0 ? Lng.noConnect[lCode] : 'HTTP [' + xhr.status + '] ' + xhr.statusText, '');
				}
			}
		}
	});
}

function iframeCheckSubmit() {
	var frm = $id('DESU_iframe');
	try {
		frm = frm.contentDocument;
		if(!frm || !frm.body || !frm.body.innerHTML) {
			return;
		}
	} catch(e) {
		$close($id('DESU_alertWait'));
		$alert('Iframe load error:\n' + e, '');
		return;
	}
	checkUpload(frm, '' + frm.location);
	frm.location.replace('about:blank');
}

function checkUpload(dc, url) {
	var err, tNum,
		txt = '',
		pathname = url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/)[5],
		xp =
			aib.hana && /error/.test(pathname) ? './/td[@class="post-error"]'
			: aib.krau && pathname === '/post' ? './/td[starts-with(@class,"message_text")]'
			: aib.abu && !dc.getElementById('delform') ? './/font[@size="5"]'
			: '';
	if(xp || !$t('form', dc)) {
		if(!xp) {
			xp =
				aib.kus ? './/h1|.//h2|.//div[contains(@style,"1.25em")]'
				: aib.fch ? './/table//font/b'
				: aib.gazo ? './/font[@size="5"]'
				: aib._420 ? './/pre'
				: '';
		}
		if(xp) {
			$each(dc.evaluate(xp, dc, null, 6, null), function(el) {
				txt += el.innerHTML + '\n';
			});
		} else {
			xp = $t('h2', dc) || $t('h1', dc);
			if(xp) {
				txt = xp.innerHTML.replace(/<br.*/i, '');
			}
		}
		err = txt !== '' ? txt : Lng.error[lCode] + '\n' + dc.body.innerHTML;
		if(/обновл|successful!|uploaded!/i.test(err)) {
			err = undefined;
		}
	}
	if(err) {
		if(aib.nul && pr.isQuick) {
			$disp(qArea);
			qArea.appendChild($id('DESU_pform'));
		}
		$close($id('DESU_alertWait'));
		$alert(err, 'UpErr');
	} else {
		pr.txta.value = '';
		if(pr.file) {
			err = pr.file.parentNode;
			pr.file = $x('input[@type="file"]', $html(err, err.innerHTML));
		}
		if(pr.video) {
			pr.video.value = '';
		}
		if(pr.tNum) {
			tNum = pr.tNum;
			showMainReply();
			if(!TNum) {
				loadThread(pByNum[tNum], 5, null);
			} else {
				loadNewPosts(true, null);
			}
			if(pr.cap) {
				pr.cap.value = '';
				refreshCapImg(tNum);
			}
		} else {
			window.location = !aib.fch ? url : $t('meta', dc).content.match(/http:\/\/[^"]+/)[0];
		}
	}
}

function checkDelete(dc, url) {
	var allDel = true,
		cbFunc = function() {
			$each($X('.//input[@type="checkbox"]', dForm), function(el) {
				if(el.checked && !getPost(el).isDel) {
					allDel = false;
				}
				el.checked = false; el.onclick = null;
			});
			$alert(allDel ? Lng.succDeleted[lCode] : Lng.errDelete[lCode], '');
		};
	if(pr.tNum) {
		if(!TNum) {
			loadThread(pByNum[pr.tNum], 5, cbFunc);
		} else {
			loadNewPosts(true, cbFunc);
		}
	} else {
		$close($id('DESU_alertWait'));
	}
}

function prepareData(form, fn) {
	var fd = new dataForm(),
		done = false,
		ready = 0,
		rNeeded = 0,
		i = 0,
		arr = [],
		cb = function() {
			if(done && ready === rNeeded) {
				for(ready = i, i = 0; i < ready; i++) {
					if(arr[i]) {
						fd.append(arr[i].name, arr[i].val, arr[i].type, arr[i].fName, arr[i].fType);
					}
				}
				fd.getResult(fn);
			}
		};
	$each($X('.//input[not(@type="submit")]|.//textarea|.//select', form), function(el) {
		if(el.type === 'file') {
			if(el.files.length > 0) {
				prepareFiles(el.files[0], function(idx, blob, name, type) {
					if(blob != null) {
						arr[idx] = {name: el.name, type: el.type, val: blob, fName: name, fType: type};
					}
					ready++;
					cb();
				}, i);
				rNeeded++;
			}
		} else if(!(el.type === 'checkbox' && !el.checked)) {
			arr[i] = {name: el.name, type: el.type, val: el.value};
		}
		i++;
	});
	done = true;
	cb();
}

function arrToBlob(arr) {
	if(nav.Firefox < 13) {
		var bb = nav.Firefox ? new MozBlobBuilder() : new WebKitBlobBuilder(),
			i = 0, len = arr.length;
		for(; i < len; i++) {
			bb.append(arr[i]);
		}
		return bb.getBlob();
	} else {
		return new Blob(arr);
	}
}

/** @constructor */
function dataForm() {
	this.boundary = '---------------------------' + Math.round(Math.random() * 100000000000);
	this.data = [];
}

dataForm.prototype.append = function(name, val, type, fileName, fileType) {
	var data = '--' + this.boundary + '\r\n' +
		'Content-Disposition: form-data; name="' + name + '"';
	if(type === 'file') {
		data += '; filename="' + fileName + '"\r\n' + 
			'Content-type: ' + fileType + '\r\n\r\n';
	} else {
		data += '\r\n\r\n';
	}
	this.data.push(data, val, '\r\n');
};

dataForm.prototype.getResult = function(fn) {
	var arr = this.data;
	arr.push('--' + this.boundary + '--\r\n');
	fn(this.boundary, arrToBlob(arr));
};

function removeExif(dat) {
	dat = new Uint8Array(dat);
	var i = 0,
		j = 0,
		len = dat.length - 1,
		out;
	for(; i < len; i++, j++) {
		if(dat[i] === 0xFF && (dat[i + 1] >> 4) === 0xE && dat[i + 1] !== 0xE0) {
			i += 1 + (dat[i + 2] << 8) + dat[i + 3];
			j--;
		} else if(j !== i){
			dat[j] = dat[i];
		}
	}
	if(j !== i){
		dat[j++] = dat[i];
	}
	out = new Uint8Array(j);
	for(i = 0; i < j; i++) {
		out[i] = dat[i];
	}
	return out.buffer;
}

function prepareFiles(file, fn, i) {
	var fr = new FileReader();
	if(!/^image\/(?:png|jpeg)$/.test(file.type)) {
		fn(i, file, file.name, file.type);
		return;
	}
	fr.readAsArrayBuffer(file);
	fr.onload = function() {
		var dat;
		if(Cfg['rExif'] !== 0 && file.type === 'image/jpeg') {
			dat = removeExif(this.result);
		} else {
			dat = this.result;
		}
		fn(i, Cfg['sImgs'] !== 0 ? arrToBlob([dat, String(Math.round(Math.random()*1e6))]) : dat, file.name, file.type);
	};
}


/*==============================================================================
									QUICK REPLY
==============================================================================*/

function showQuickReply(post) {
	var tNum = post.thr.Num;
	pr.isQuick = true;
	pr.tNum = tNum;
	if(qArea.hasChildNodes()) {
		if(aib.getWrap(post).nextElementSibling === qArea) {
			$disp(qArea);
			showMainReply();
			return;
		}
	} else {
		qArea.appendChild($id('DESU_pform'));
		$disp($id('DESU_toggleReply'));
		$disp(qArea);
		if(!TNum && !aib.kus && !aib.hana && !aib.ylil) {
			$del($x('.//input[@id="thr_id" or @name="parent"]', pr.form));
			$before(pr.form.firstChild, [
				$add('<input type="hidden" id="thr_id" value="' + tNum + '" name="' + (
					aib.fch || aib.gazo ? 'resto'
					: aib.tiny ? 'thread'
					: 'parent'
				) + '">')
			]);
		}
	}
	$after(aib.getWrap(post), qArea);
	if(!TNum && Cfg['tform'] !== 0) {
		pArea.style.display = 'none';
	}
	qArea.style.display = 'block';
	if(pr.cap && !pr.recap && !aib.kus) {
		refreshCapImg(tNum);
	}
	if(!TNum) {
		toggleQuickReply(tNum);
	}
	if(aib._420 && pr.txta.value === 'Comment') {
		pr.txta.value = '';
	}
	insertInto(pr.txta, '>>' + post.Num + quotetxt.replace(/(^|\n)(.)/gm, '\n>$2') + '\n');
}

function showMainReply() {
	var el = $id('DESU_toggleReply');
	if(pr.isQuick) {
		pr.isQuick = false;
		if(!TNum) {
			toggleQuickReply(0);
			$del($x('.//input[@id="thr_id"]', pr.form));
		}
		$disp(el);
		qArea.style.display = 'none';
		$after(el, $id('DESU_pform'));
	}
}

function toggleQuickReply(tNum) {
	$x('.//input[@id="thr_id" or contains(@name,"thread")]', pr.form).value = tNum;
	if(aib.pony) {
		$x('.//input[@name="quickreply"]', pr.form).value = tNum || '';
	}
}

function toggleMainReply(e) {
	$pd(e);
	if(pr.isQuick) {
		pArea.style.display = '';
		showMainReply();
	} else {
		$disp(pArea);
	}
	$focus(pArea);
}

function insertRefLink(e) {
	var pNum = getPost(e.target).Num;
	if(!/Reply|Ответ/.test(e.target.textContent)) {
		e.stopPropagation(); $pd(e);
		if(!TNum && Cfg['tform'] !== 0 && !pr.isQuick) {
			pArea.style.display = '';
		}
		if(TNum && Cfg['pform'] === 2 && !pr.isQuick) {
			showQuickReply(pByNum[pNum]);
		} else {
			if(aib._420 && pr.txta.value === 'Comment') {
				pr.txta.value = '';
			}
			insertInto(pr.txta, '>>' + pNum);
		}
	}
}


/*==============================================================================
								TEXT FORMATTING BUTTONS
==============================================================================*/

function tfBtn(id, title, wktag, bbtag, val) {
	var x = pr.txta,
		btn = $new('span', {'id': id, 'title': title}, null);
	if(Cfg['txtbtn'] === 2) {
		btn.innerHTML = '<a href="#">' + val + '</a>' + (val !== '&gt;' ? ' / ' : '');
	}
	if(Cfg['txtbtn'] === 3) {
		btn.innerHTML = '<input type="button" value="' + val + '" style="font-weight: bold;" />';
	}
	if(val !== '&gt;') {
		$event(btn, {
			'click': function(e) {
				var tag1, tag2, j, len,
					start = x.selectionStart,
					end = x.selectionEnd,
					scrtop = x.scrollTop,
					text = x.value.substring(start, end).split('\n'),
					i = text.length;
				$pd(e);
				if(aib.kus || aib.abu || aib.krau || aib._420 || aib.fch && wktag === '%%') {
					tag1 = '[' + bbtag + ']';
					tag2 = '[/' + bbtag + ']';
				} else {
					tag1 = tag2 = wktag;
				}
				while(i--) {
					if(tag1 === '') {
						j = text[i].trim().length;
						while(j--) {
							tag2 += '^H';
						}
					}
					len = end + tag1.length + tag2.length;
					if(text[i].match(/^\s+/)) {
						tag1 = text[i].match(/^\s+/)[0] + tag1;
					}
					if(text[i].match(/\s+$/)) {
						tag2 += text[i].match(/\s+$/)[0];
					}
					text[i] = tag1 + text[i].trim() + tag2;
				}
				x.value = x.value.substr(0, start) + text.join('\n') + x.value.substr(end);
				x.setSelectionRange(len, len);
				x.focus();
				x.scrollTop = scrtop;
			}
		});
	} else {
		$event(btn, {
			'mouseover': function() {
				quotetxt = txtSelection();
			},
			'click': function(e) {
				var start = x.selectionStart,
					end = x.selectionEnd;
				$pd(e);
				insertInto(x,
					'> ' + (start === end ? quotetxt: x.value.substring(start, end)).replace(/\n/gm, '\n> ')
				);
			}
		});
	}
	return btn;
}

function addTextPanel() {
	$del($id('DESU_txtPanel'));
	if(Cfg['txtbtn'] !== 0 && pr.txta) {
		$after(aib._420 ? $c('popup', pr.form) : pr.subm, $New('span', {'id': 'DESU_txtPanel'}, [
			$txt(unescape('%u00A0')),
			$if(Cfg['txtbtn'] === 2, $txt('[ ')),
			tfBtn('DESU_btnBold', Lng.bold[lCode], '**', aib._420 ? '**' : 'b', 'B'),
			tfBtn('DESU_btnItalic', Lng.italic[lCode], '*', aib._420 ? '*' : 'i', 'i'),
			$if(!aib._420, tfBtn('DESU_btnUnder', Lng.underlined[lCode], '__', 'u', 'U')),
			$if(!aib._420, tfBtn('DESU_btnStrike', Lng.strike[lCode], aib._410 ? '^^' : '', 's', 'S')),
			tfBtn('DESU_btnSpoiler', Lng.spoiler[lCode], '%%', aib._420 ? '%' : 'spoiler', '%'),
			tfBtn('DESU_btnCode', Lng.code[lCode], '`', aib.krau ? 'aa' : aib._420 ? 'pre' : 'code', 'C'),
			tfBtn('DESU_btnQuote', Lng.quote[lCode], '', '', '&gt;'),
			$if(Cfg['txtbtn'] === 2, $txt(' ]'))
		]));
	}
}


/*==============================================================================
								FOR POSTS AND THREADS
==============================================================================*/

function forEachPost(fn) {
	for(var post, i = 0; post = Posts[i++];) {
		fn(post);
	}
}

function getPost(el) {
	return $x('ancestor::*[contains(@class," DESU_post") or contains(@class," DESU_oppost")]', el);
}

function getImages(post) {
	return $X('.//img[@class="thumb" or contains(@src,"thumb") or contains(@src,"/spoiler")]', post);
}

function getText(el) {
	return (el.innerText
		|| el.innerHTML.replace(/<\/?(?:br|p|li)[^>]*?>/gi,'\n')
			.replace(/<[^>]+?>/g,'').replace(/&gt;/g, '>').replace(/&lt;/g, '<')
	).trim();
}

function getImgWeight(post) {
	var inf = aib.getImgInfo(post).textContent.match(/\d+[\.\d\s|m|k|к]*[b|б]/i)[0],
		w = parseFloat(inf.match(/[\d|\.]+/));
	if(/MB/.test(inf)) {
		w = w*1e3;
	}
	if(/\d[\s]*B/.test(inf)) {
		w = (w/1e3).toFixed(2);
	}
	return +w;
}

function getImgSize(post) {
	var el = aib.getImgInfo(post),
		m = el ? el.textContent.match(/\d+[x×]\d+/) : false;
	return m ? m[0].split(/[x×]/) : [null, null];
}

/*--------------------------------Post buttons--------------------------------*/

function addPostButtons(post) {
	var el, h,
		ref = aib.getRef(post);
	post.Btns = (!post.isOp ? pPanel : opPanel).cloneNode(true);
	el = post.Btns.firstChild;
	$event(el, {
		'click': function(e) {
			$pd(e);
			togglePostVisib(post);
		},
		'mouseover': function() {
			selectPostHider(post);
		},
		'mouseout': removeSelMenu
	});
	if(pr.on || oeForm) {
		el = el.nextSibling;
		$event(el, {
			'click': function(e) {
				$pd(e);
				showQuickReply(post);
			},
			'mouseover': function() {
				quotetxt = txtSelection();
			}
		});
	}
	if(post.isOp){
		if(!TNum) {
			el = el.nextSibling;
			$event(el, {
				'click': function(e) {
					$pd(e);
					loadThread(post, 1, null);
				},
				'mouseover': function() {
					selectExpandThread(post);
				},
				'mouseout': removeSelMenu
			});
		}
		el = el.nextSibling;
		$event(el, {
			'click': function(e) {
				$pd(e);
				toggleFavorites(post, this);
			}
		});
		h = aib.host;
		if(Favor[h] && Favor[h][brd] && Favor[h][brd][post.Num]) {
			el.className = 'DESU_btnFavSel';
			Favor[h][brd][post.Num].cnt = post.thr.pCount + 1;
			setStored('DESU_Favorites', $uneval(Favor));
		}
	}
	if(aib.getSage(post)) {
		post.Btns.appendChild($new('a', {
			'class': 'DESU_btnSage',
			'title': 'SAGE',
			'href': '#'}, {
			'click': function(e) {
				$pd(e);
				applySpells('#sage');
			}
		}));
	}
	$after(ref, post.Btns);
	if(pr.on && Cfg['insnum'] !== 0) {
		if(aib.nul || aib.futr) {
			$each($X('.//a', ref), function(el) {
				$rattr(el, 'onclick');
			});
		}
		if(!aib.brit) $event(ref, {'click': insertRefLink});
	}
	if(Cfg['viewhd'] !== 0) {
		$event(ref, {
			'mouseover': function() {
				if(post.Vis === 0) {
					togglePost(post, 1);
				}
			},
			'mouseout': function() {
				if(post.Vis === 0) {
					togglePost(post, 0);
				}
			}
		});
	}
}

/*---------------------------------Time correction-----------------------------*/

function toggleTimeSettings() {
	var el = $id('DESU_ctime');
	if(el.checked && (!/^[+-]\d{1,2}$/.test(Cfg['ctmofs']) || !parseTimePattern())) {
		$alert(Lng.cTimeError[lCode], '');
		saveCfg('ctime', 0);
		el.checked = false;
	}
}

function parseTimePattern() {
	if(/[^\?\-\+sihdmny]|mm/.test(Cfg['ctmpat'])) {
		return false;
	}
	timeRegex = Cfg['ctmpat'].replace(/\-/g, '[^<]').replace(/\+/g, '[^0-9]').replace(/([sihdny]+)/g, '($1)')
		.replace(/[sihdny]/g, '\\d').replace(/\m/g, '([a-zA-Zа-яА-Я]+)');
	timePattern = Cfg['ctmpat'].replace(/[\?\-\+]+/g, '').replace(/([a-z])\1+/g, '$1');
	return true;
}

function fixTime(txt) {
	var a, t, second, minute, hour, day, month, year, dtime;
	return txt.replace(new RegExp(timeRegex, 'g'), function(str, a1, a2, a3, a4, a5, a6) {
		for(var i = 0, arr = [a1, a2, a3, a4, a5, a6]; i < 6; i++) {
			a = arr[i];
			t = timePattern[i];
			t === 's' ? second = a
			: t === 'i' ? minute = a
			: t === 'h' ? hour = a
			: t === 'd' ? day = a
			: t === 'n' ? month = a - 1
			: t === 'y' ? year = a
			: t === 'm' && (month =
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
		dtime = new Date(year.length === 2 ? '20' + year : year, month, day, hour, minute, second);
		dtime.setHours(dtime.getHours() + parseInt(Cfg['ctmofs'], 10));
		return dtime.toString().replace(/GMT.*$/, '');
	});
}


/*==============================================================================
							ON LINKS VIDEO / MP3 PLAYERS
==============================================================================*/

function getTubeVideoLinks(id, fn) {
	id = 'http://www.youtube.com/watch?v=' + id;
	GM_xmlhttpRequest({method: 'GET', url: id, onload: function(xhr) {
		var i, group, len, elem, result1, result2, src,
			sep1 = '%2C',
			sep2 = '%26',
			sep3 = '%3D',
			url = [],
			formats = xhr.responseText.match(/\"url_encoded_fmt_stream_map\":\s*\"([^\"]+)\"/);
		if(!formats) {
			fn(false);
			return;
		}
		formats = formats[1];
		if(formats.indexOf(',') >= 0) {
			sep1 = ',';
			sep2 = formats.indexOf('&') >= 0 ? '&' : '\\u0026';
			sep3 = '=';
		}
		for(i = 0, group = formats.split(sep1), len = group.length; i < len; i++) {
			elem = group[i].split(sep2);
			if(elem.length < 5) {
				continue;
			}
			result1 = elem[0].split(sep3);
			if(result1.length < 2) {
				continue;
			}
			src = unescape(unescape(result1[1])).replace(/\\\//g, '/').replace(/\\u0026/g, '&');
			result2 = elem[4].split(sep3);
			if(result2.length < 2) {
				continue;
			}
			if(src.toLowerCase().indexOf('http') === 0) {
				url[result2[1]] = src;
			}
		}
		fn(url);
	}});
}

function addTubeEmbed(el, id, time) {
	var wh = ' width="' + Cfg['ywidth'] + '" height="' + Cfg['yheigh'] + '" />';
	el.innerHTML = Cfg['yptype'] === 1
		? '<iframe type="text/html" src="https://www.youtube.com/embed/' + id
			+ (Cfg['yhdvid'] !== 0 ? '?hd=1&' : '?') + 'start=' + time + '&html5=1" frameborder="0"' + wh
		: '<embed type="application/x-shockwave-flash" src="https://www.youtube.com/v/' + id
			+ (Cfg['yhdvid'] !== 0 ? '?hd=1&' : '?') + 'start=' + time + '" wmode="transparent"' + wh;
}

function addTubePlayer(el, m) {
	var id = m[1],
		time = (m[2] ? m[2] * 3600 : 0) + (m[3] ? m[3] * 60 : 0) + (m[4] ? m[4] : 0);
	if(Cfg['yptype'] !== 2) {
		addTubeEmbed(el, id, time);
		return;
	}
	getTubeVideoLinks(id, function(url) {
		var src = url ? (Cfg['yhdvid'] === 0 ? url[43] : url[45] || url[44] || url[43]) : false;
		if(!src) {
			addTubeEmbed(el, id, time);
			return;
		}
		el.innerHTML = '<video poster="https://i.ytimg.com/vi/' + id
			+ '/0.jpg" controls="controls" preload="none" src="' + src
			+ (nav.Firefox && nav.Firefox < 14 ? '&' + Math.random() : '')
			+ '" width="' + Cfg['ywidth'] + '" height="' + Cfg['yheigh'] + '"></video>';
		el = el.firstChild;
		addTubeEmbed(el, id, time);
		if(time !== 0) {
			$event(el, {
				'loadedmetadata': function() {
					this.currentTime = time;
				}
			});
		}
	});
}

function addTubePreview(el, m) {
	el.innerHTML = '<a href="https://www.youtube.com/watch?v=' + m[1]
		+ '" target="_blank"><img src="https://i.ytimg.com/vi/' + m[1]
		+ '/0.jpg" width="360" height="270" /></a>';
	$event(el.firstChild, {
		'click': function(e) {
			if(Cfg['ytube'] !== 4) {
				$pd(e);
				addTubePlayer(this.parentNode, m);
			}
		}
	});
}

function getTubePattern() {
	return /^https?:\/\/(?:www\.)?youtu(?:be\.com\/(?:watch\?.*?v=|v\/|embed\/)|\.be\/)([^&#?]+).*?(?:t(?:ime)?=(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?)?$/;
}

function clickTubeLink(e) {
	var m = this.href.match(getTubePattern()),
		el = $c('DESU_ytObj', getPost(this));
	$pd(e);
	if($xb('node()[contains(@src,"' + m[1] + '")]|video[contains(@poster,"' + m[1] + '")]', el)) {
		el.innerHTML = '';
	} else if(Cfg['ytube'] > 2 && !$xb('a[contains(@href,"' + m[1] + '")]', el)) {
		addTubePreview(el, m);
	} else {
		addTubePlayer(el, m);
	}
}

function addLinkTube(post) {
	if(Cfg['ytube'] === 0) {
		return;
	}
	$each($X('.//embed', post || dForm), function(el) {
		var src,
			m = el.src.match(getTubePattern());
		if(!m) {
			return;
		}
		src = 'https://www.youtube.com/watch?v=' + m[1];
		if(m[4] || m[3] || m[2]) {
			src += '#t=' + (m[2] ? m[2] + 'h' : '') + (m[3] ? m[3] + 'm' : '') + (m[4] ? m[4] + 's' : '');
		}
		aib.getMsg(post || getPost(el)).appendChild($add('<p><a href="' + src + '">' + src + '</a></p>'));
		$del(el.parentNode);
	});
	$each($X('.//a[contains(@href,"youtu")]', post || dForm), function(link) {
		var pst, el, msg,
			m = link.href.match(getTubePattern());
		if(!m) {
			return;
		}
		link.href = link.href.replace(/^http:/, 'https:');
		pst = post || getPost(link);
		el = $c('DESU_ytObj', pst);
		if(!el) {
			el = $new('div', {'class': 'DESU_ytObj'}, null);
			if(Cfg['ytube'] > 2) {
				addTubePreview(el, m);
			} else if(Cfg['ytube'] === 2) {
				addTubePlayer(el, m);
			}
			msg = pst.Msg || aib.getMsg(pst);
			if(aib.krau) {
				$after($x('div[@class="file_thread" or @class="file_reply"][last()]', pst)
					|| $c('postheader', pst), el);
			} else if(msg) {
				$before(msg, [el]);
			} else {
				pst.appendChild(el);
			}
		}
		link.className = 'DESU_ytLink';
		$event(link, {'click': clickTubeLink});
		if(!nav.Opera && Cfg['ytitle'] !== 0) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'https://gdata.youtube.com/feeds/api/videos/' + m[1]
					+ '?alt=json&fields=title/text(),yt:noembed,app:control/yt:state/@reasonCode',
				onload: function(xhr) {
					try {
						link.textContent = JSON.parse(xhr.responseText)['entry']['title']['$t'];
						filterTextTube(pst, link.textContent);
					} catch(e) {}
				}
			});
		} else {
			link.textContent = link.textContent.replace(/^http:/, 'https:');
		}
	});
}

function filterTextTube(post, text) {
	var t,
		i = 0,
		fHide = (function(a) {
			return a ? hidePost : function(b, c) {};
		})(Cfg['spells'] === 1);
	for(;t = oSpells.video[i++];) {
		if(strToRegexp(t).test(text)) {
			fHide(post, '#video ' + t);
			post.tHide = 1;
			if(tubeHidTimeout) {
				clearTimeout(tubeHidTimeout);
			}
			tubeHidTimeout = setTimeout(saveHiddenPosts, 500);
			return;
		}
	}
}

function unHideTextTube() {
	forEachPost(function(post) {
		if(post.tHide === 1) {
			unhidePost(post);
			post.tHide = 0;
		}
	});
}

function hideTextTube() {
	if(Cfg['ytitle'] === 0) {
		return;
	}
	$each($X('.//a[contains(@href,"youtu")]', dForm), function(link) {
		for(var i = 0, t, post; t = oSpells.video[i++];) {
			if(strToRegexp(t).test(link.textContent)) {
				post = getPost(link);
				hidePost(post, '#video ' + t);
				post.tHide = 1;
				break;
			}
		}
	});
}

function addLinkMP3(post) {
	if(Cfg['mp3'] === 0) {
		return;
	}
	$each($X('.//a[contains(@href,".mp3")]', post || dForm), function(link) {
		var pst, el, msg;
		if(!(link.target === '_blank' || link.rel === 'nofollow')) {
			return;
		}
		pst = post || getPost(link);
		el = $c('DESU_mp3', pst);
		if(!el) {
			el = $new('div', {'class': 'DESU_mp3'}, null);
			msg = pst.Msg || aib.getMsg(pst);
			if(msg) {
				$before(msg, [el]);
			} else {
				pst.appendChild(el);
			}
		}
		if(!$xb('.//object[contains(@FlashVars,"' + link.href + '")]', el)) {
			$html(el, el.innerHTML + '<object data="http://junglebook2007.narod.ru/audio/player.swf" type="application/x-shockwave-flash" wmode="transparent" width="220" height="16"  FlashVars="playerID=1&amp;bg=0x808080&amp;leftbg=0xB3B3B3&amp;lefticon=0x000000&amp;rightbg=0x808080&amp;rightbghover=0x999999&amp;rightcon=0x000000&amp;righticonhover=0xffffff&amp;text=0xffffff&amp;slider=0x222222&amp;track=0xf5f5dc&amp;border=0x666666&amp;loader=0x7fc7ff&amp;loop=yes&amp;autostart=no&amp;soundFile=' + link.href + '"></object><br>');
		}
	});
}


/*==============================================================================
									IMAGES VIEWER
==============================================================================*/

function makeMoveable(el) {
	var elMove = function(e) {
			el.style.left = e.clientX - el.curX  + 'px';
			el.style.top = e.clientY - el.curY + 'px';
			el.moved = true;
		},
		elStop = function() {
			$revent(doc.body, {'mousemove': elMove, 'mouseup': elStop});
		};
	$event(el, {
		'mousedown': function(e) {
			$pd(e);
			el.curX = e.clientX - parseInt(el.style.left, 10);
			el.curY = e.clientY - parseInt(el.style.top, 10);
			$event(doc.body, {
				'mousemove': elMove,
				'mouseup': elStop
			});
		}
	});
}

function resizeImg(e) {
	var curX = e.clientX,
		curY = e.clientY,
		oldL = parseInt(this.style.left, 10),
		oldT = parseInt(this.style.top, 10),
		oldW = this.width,
		oldH = this.height,
		d = nav.Opera || nav.Chrome ? e.wheelDelta : -e.detail,
		newW = parseInt(this.width*(d > 0 ? 1.25 : 0.8), 10),
		newH = parseInt(this.height*(d > 0 ? 1.25 : 0.8), 10);
	$pd(e);
	this.width = newW;
	this.height = newH;
	this.style.left = parseInt(curX - (newW/oldW)*(curX - oldL), 10) + 'px';
	this.style.top = parseInt(curY - (newH/oldH)*(curY - oldT), 10) + 'px';
}

function addFullImg(a, sz, isExp) {
	var newW = '',
		newH = '',
		fullW = +sz[0],
		fullH = +sz[1],
		scrW = doc.body.clientWidth,
		scrH = window.innerHeight,
		full = $c('DESU_fullImg', a);
	if(full && isExp || !full && isExp === false) {
		return;
	}
	if(Cfg['expimg'] === 1 && !$xb('img[contains(@style,"fixed")]', a)) {
		$disp($t('img', a));
	}
	if(full) {
		if(!full.moved) {
			$disp(full);
			setTimeout(function() {
				$del(full);
			}, 0);
		} else {
			full.moved = false;
		}
		return;
	}
	full = $new('img', null, null);
	if(Cfg['expimg'] === 2) {
		$del($c('DESU_fullImg', doc));
		full.addEventListener(nav.Opera || nav.Chrome ? 'mousewheel' : 'DOMMouseScroll', resizeImg, false);
		makeMoveable(full);
	}
	if(Cfg['expimg'] === 1) {
		scrW -= $offset(a).left + 25;
	}
	if(fullW && fullH) {
		newW = fullW < scrW ? fullW : scrW;
		newH = newW*fullH/fullW;
		if(Cfg['expimg'] === 2 && newH > scrH) {
			newH = scrH;
			newW = newH*fullW/fullH;
		}
	}
	a.appendChild($attr(full, {
		'class': 'DESU_fullImg',
		'src': a.href,
		'alt': a.href,
		'width': newW,
		'height': newH,
		'style': (Cfg['expimg'] === 2
			? 'position: fixed; z-index: 9999; border: 1px solid black; left: '
				+ parseInt((scrW - newW)/2, 10) + 'px; top: ' + parseInt((scrH - newH)/2, 10) + 'px;'
			: ''
		)
	}));
}

function addLinkImg(el, addBr) {
	if(Cfg['addimg'] === 0) {
		return;
	}
	$each($X(
		aib.xMsg + '//a[contains(@href,".jpg") or contains(@href,".png") or contains(@href,".gif")]',
		el
	), function(link) {
		var a;
		if($xb('ancestor::small', link)) {
			return;
		}
		a = link.cloneNode(false);
		a.target = '_blank';
		$disp(a);
		a.appendChild($new('img', {
			'class': 'DESU_preImg',
			'src': a.href,
			'alt': a.href}, {
			'load': function() {
				var fullW, fullH, k;
				$disp(a);
				fullW = this.width;
				fullH = this.height;
				this.title = fullW + 'x' + fullH;
				if(fullW <= 200 && fullH <= 200) {
					return;
				}
				k = fullW/fullH;
				this.width = k < 1 ? 200*k : 200;
				this.height = k < 1 ? 200 : 200/k;
			}
		}));
		$event(a, {
			'click': function(e) {
				if(Cfg['expimg'] !== 0 && e.button !== 1) {
					$pd(e);
					addFullImg(this, this.firstChild.title.split('x'), null);
				}
			}
		});
		$before(link, [a, $if(addBr, $new('br', null, null))]);
	});
}

function addImgSearch(el) {
	if(!Cfg['imgsrc']) {
		return;
	}
	$each($X(aib.xImages, el), function(link) {
		if(/google\.|tineye\.com|iqdb\.org/.test(link.href)) {
			$del(link);
			return;
		}
		if(link.innerHTML.indexOf('<') >= 0) {
			return;
		}
		$before(link, [
			$new('a', {
				'class': 'DESU_btnSrc'}, {
				'mouseover': function() {
					selectImgSearch(this, escape(link.href));
				},
				'mouseout': removeSelMenu
			})
		]);
	});
}

function expandPostImg(a, post, isExp) {
	if(/\.jpe?g|\.png|.\gif|^blob:/i.test(a.href)) {
		addFullImg(a, getImgSize(
			post.Img.snapshotLength > 1 ? $x('ancestor::node()[self::div or self::td][1]', a) : post
		), isExp);
	}
}

function expandAllPostImg(post, isExp) {
	$each(post.Img, function(img) {
		expandPostImg($x('ancestor::a[1]', img), post, isExp);
	});
}

function eventPostImg(post) {
	$each(post.Img, function(img) {
		var a = $x('ancestor::a[1]', img);
		if(a) {
			$rattr(a, 'onclick');
			$rattr(img, 'onclick');
			if(aib.dfwk) {
				$rattr(img.parentNode, 'onclick');
			}
			a.addEventListener('click', function(e) {
				if(Cfg['expimg'] !== 0 && e.button !== 1) {
					$pd(e);
					expandPostImg(this, post, null);
				}
			}, false);
		}
	});
}

function preloadImages(el) {
	var mReqs = 4, 
		cReq = 0,
		i = 0,
		aA = [],
		rType = nav.Firefox ? 'blob' : 'arraybuffer';
	$each(getImages(el), function(img) {
		aA.push($x('ancestor::a[1]', img));
	});
	function loadFunc(idx) {
		if(idx >= aA.length) {
			return;
		}
		var req, bb,
			type = 'image/',
			a_ = aA[idx],
			a = a_.href;
		if(/\.jpe?g$/i.test(a)) {
			type += 'jpeg';
		} else if(/\.png$/i.test(a)) {
			type += 'png';
		} else if(/\.gif$/i.test(a)) {
			type += 'gif';
		} else {
			loadFunc(i++);
			return;
		}
		if(cReq === mReqs) {
			setTimeout(function() { loadFunc(idx); }, 200);
			return;
		}
		cReq++;
		req = new XMLHttpRequest();
		req.open('GET', a, true);
		req.responseType = rType;
		req.onload = function(e) {
			if (this.status == 200) {
				if(nav.Firefox) {
					a_.href = window.URL.createObjectURL(this.response);
				} else {
					bb = new WebKitBlobBuilder();
					bb.append(this.response);
					a_.href = window.webkitURL.createObjectURL(bb.getBlob(type));
				}
			}
			cReq--;
			loadFunc(i++);
		};
		req.send(null);
	}
	while(i < mReqs) {
		loadFunc(i++);
	}
}


/*==============================================================================
								MAP OF >>REFLINKS
==============================================================================*/

function getRefMap(pNum, rNum) {
	if(refMap[rNum]) {
		if(refMap[rNum].indexOf(pNum) < 0) {
			refMap[rNum].push(pNum);
		}
	} else {
		refMap[rNum] = [pNum];
	}
}

function showRefMap(post, rNum, uEv) {
	var el, msg, txt;
	if(typeof refMap[rNum] !== 'object' || !post) {
		return;
	}
	el = $c('DESU_refMap', post);
	txt = refMap[rNum].join(',').replace(/(\d+)/g, ' <a href="#$1">&gt;&gt;$1</a>');
	if(!el) {
		msg = post.Msg || aib.getMsg(post);
		if(!msg) {
			return;
		}
		el = $add('<div class="DESU_refMap">' + txt + '</div>');
		if(uEv) {
			eventRefLink(el);
		}
		$after(msg, el);
	} else {
		eventRefLink($html(el, txt));
	}
}

function addRefMap(post, uEv) {
	var rNum, pst;
	if(Cfg['navig'] !== 2) {
		return;
	}
	$each($X((!post ? aib.xMsg : '.') + '//a[starts-with(text(),">>")]', post ? post.Msg : dForm), function(link) {
		if(/\//.test(link.textContent)) {
			return;
		}
		rNum = (link.hash || link.textContent || link.pathname.substring(link.pathname.lastIndexOf('/')))
			.match(/\d+/)[0];
		pst = post || getPost(link);
		if(pByNum[rNum] && pst) {
			getRefMap(pst.Num, rNum);
		}
	});
	for(rNum in refMap) {
		showRefMap(pByNum[rNum], rNum, uEv);
	}
}


/*==============================================================================
							ON >>REFLINKS POSTS PREVIEW
==============================================================================*/

function addNode(parent, pView, e) {
	var el = pView.node = {parent: null, kid: null, lastkid: null, post: pView};
	parent = parent.node;
	pView.style.display = '';
	dForm.appendChild(pView);
	setPreviewPostion(e, pView, false);
	$event(pView, {
		'mouseover': function() {
			markPost(this.node, false);
		},
		'mouseout': markDelete
	});
	if(curView && parent) {
		if(parent.kid) {
			deleteNodes(parent.kid);
		}
		el.parent = parent;
		curView.lastkid = parent.kid = el;
	} else {
		deleteNodes(curView);
		curView = el;
	}
	markPost(el, false);
	showPreview(pView);
	return el;
}

function markDelete() {
	if(curView) {
		markPost(curView.lastkid || curView, true);
	}
}

function markPost(el, forDel) {
	if(el) {
		clearTimeout(pViewTimeout);
		do {
			el.forDel = forDel;
		} while(el = el.parent);
		pViewTimeout = setTimeout(function() {
			for(el = curView; el; el = el.kid) {
				if(el.forDel) {
					return deleteNodes(el);
				}
			}
		}, +Cfg['navdel']);
	}
}

function deleteNodes(el) {
	var lk;
	if(!el) {
		return;
	}
	lk = curView.lastkid || curView;
	if(el.parent) {
		el.parent.kid = null;
		curView.lastkid = el.parent;
	} else {
		curView = null;
	}
	do {
		clearTimeout(lk.post.marker);
		closePreview(lk.post);
	} while((lk = lk.parent) !== el.parent && lk);
}

function waitForAnim(pView, fn) {
	var it;
	if(!pView.inUse) {
		fn();
		return;
	}
	it = setInterval(function() {
		if(!pView.inUse) {
			fn();
			clearInterval(it);
		}
	}, 20);
}

function showPreview(el) {
	if(Cfg['animp'] === 0 || !nav.Anim) {
		el.style.opacity = 1;
		return;
	}
	waitForAnim(el, function() {
		el.oclassName = el.className;
		el.className += ' DESU_pOpen DESU_aOpened DESU_pOpen' +
			(el.aTop ? 'T' : 'B') + (el.aLeft ? 'L' : 'R');
	});
}

function closePreview(el) {
	if(Cfg['animp'] === 0 || !nav.Anim) {
		$del(el);
		return;
	}
	waitForAnim(el, function() {
		el.addEventListener(nav.aEvent, function() {
			$del(el);
		}, false);
		el.className = el.oclassName + ' DESU_pClose DESU_pClose' +
			(el.aTop ? 'T' : 'B') + (el.aLeft ? 'L' : 'R');
	});
}

function setPreviewPostion(e, pView, anim) {
	var scrW = doc.body.clientWidth,
		scrH = window.innerHeight,
		x = $offset(e.target).left + e.target.offsetWidth/2,
		y = $offset(e.target).top,
		left,
		top = e.target.getBoundingClientRect().top + e.target.offsetHeight, width = 'auto',
		uId,
		setPos = function() {
			pView.style.left = left;
			pView.style.top = top;
		},
		getNum = function(s) {
			return +s.substring(0, s.length - 2);
		};
	if(x < scrW/2) {
		left = x;
		pView.aLeft = true;
		if(left + pView.offsetWidth >= scrW - 10) {
			width = (scrW - left - 10) + 'px';
		}
	} else {
		left = x - pView.offsetWidth;
		pView.aLeft = false;
		if(left < 10) {
			left = '10';
			width = (x - 10) + 'px';
		}
	}
	left += 'px'; pView.style.width = width; uId = pView.offsetHeight;
	if(top + uId < scrH - 10 || top - uId < 10) {
		top = (y + e.target.offsetHeight) + 'px';
		pView.aTop = true;
	} else {
		top = (y - uId) + 'px';
		pView.aTop = false;
	}
	if(Cfg['animp'] === 0 || !anim || aib.hid) {
		setPos();
		return;
	}
	waitForAnim(pView, function() {
		if(left === pView.style.left && top === pView.style.top) {
			return;
		}
		pView.inUse = true;
		uId = 'DESU_mCSS' + Math.round(Math.random()*1e3);
		doc.head.appendChild($new('style', {
			'id': uId,
			'type': 'text/css',
			'text':
				'@' + nav.aCFix + 'keyframes ' + uId + ' {\
					from { left: ' + pView.style.left + '; top: ' + pView.style.top + '; }\
					to { left: ' + left + '; top: ' + top + '; }\
				}\
				.' + uId + ' { ' + nav.aCFix + 'animation-name: ' + uId + '; ' + nav.aCFix + 'animation-duration: ' +
				(Math.log(Math.sqrt(Math.pow(getNum(left) - getNum(pView.style.left), 2)
					+ Math.pow(getNum(top) - getNum(pView.style.top), 2))) / 22) + 's; ' +
				nav.aCFix + 'animation-timing-function: ease-in-out; opacity: 1 !important; }'
		}, null));
		pView.addEventListener(nav.aEvent, function() {
			pView.inUse = false;
			$del($id(uId));
		}, false);
		pView.className = pView.oclassName + ' DESU_aOpened ' + uId;
		setPos();
	});
}

function markRefMap(pView, pNum) {
	($c('DESU_pPost', pView) || {}).className = '';
	($x('.//a[starts-with(text(),">>") and contains(text(),"' + pNum + '")]', pView) || {}).className =
		'DESU_pPost';
}

function funcPostPreview(post, pNum, parent, e, txt) {
	var el, pView;
	if(!post) {
		if(!txt) {
			pDel[pNum] = true;
		}
		return addNode(parent, $add(
			'<div class="' + aib.pClass + ' DESU_info DESU_pView">' + txt || Lng.postNotFound[lCode] +'</div>'
		), e);
	}
	pView = post.cloneNode(true);
	if(post.Vis === 0) {
		togglePost(pView, 1);
	}
	pView.className += ' DESU_post DESU_pView ' + aib.pClass;
	if(aib._7ch) {
		pView.firstElementChild.style.cssText = 'max-width: 100%; margin: 0;';
		$del($c('doubledash', pView));
	}
	pView.Num = pNum;
	$Del(
		'.//img[@class="DESU_preImg"]/ancestor::a|.//img[@class="DESU_fullImg"]|.//div[@class="DESU_refMap"'
			+ (Cfg['ytube'] !== 2 ? 'or @class="DESU_ytObj"' : '')
			+ ']|.//span[starts-with(@class,"DESU_postPanel")]|.//a[@class="DESU_btnSrc"]',
		pView
	);
	addPostButtons(pView);
	if(!pByNum[pNum]) {
		addLinkMP3(pView);
	}
	if(!pByNum[pNum] || Cfg['ytube'] !== 2) {
		addLinkTube(pView);
	}
	pView.Img = getImages(pView);
	$each(pView.Img, function(img) {
		img.style.display = '';
	});
	eventPostImg(pView);
	addLinkImg(pView, false);
	addImgSearch(pView);
	if(Cfg['navig'] === 2) {
		showRefMap(pView, pNum, null);
		markRefMap(pView, parent.Num);
	}
	eventRefLink(pView);
	if(Cfg['navmrk'] !== 0) {
		pView.marker = setTimeout(function() {
			markViewedPost(pNum);
			saveViewedPosts(pNum);
		}, 2e3);
	}
	return addNode(parent, pView, e);
}

function showPostPreview(e) {
	var b = aib.ylil
		? this['data-boardurl']
		: this.pathname.match(/^\/?(.*?)\/?(?:res|thread-|index|\d+|$)/)[1],
		tNum = (this.pathname.match(/[^\/]+\/[^\d]*(\d+)/) || [,0])[1],
		pNum = (this.textContent.match(/\d+$/) || [tNum])[0],
		post = pByNum[pNum] || importPreview(b, pNum),
		parent = getPost(e.target),
		el = parent.node ? parent.node.kid : curView;
	if(Cfg['navig'] === 0 || /^>>$/.test(this.textContent) || (Cfg['navdis'] === 1 && post && post.Vis === 0)) {
		return;
	}
	setTimeout(function() {
		$del($x('.//div[starts-with(@id,"preview") or starts-with(@id,"pstprev")]', doc));
	}, 0);
	if(pDel[pNum]) {
		funcPostPreview(null, pNum, parent, e, Lng.postNotFound[lCode]);
		return;
	}
	if(el && el.post.Num === pNum) {
		markPost(el, false);
		deleteNodes(el.kid);
		setPreviewPostion(e, el.post, true);
		markRefMap(el.post, parent.Num);
		return;
	}
	if(post) {
		funcPostPreview(post, pNum, parent, e, '');
		return;
	}
	el = funcPostPreview(null, pNum, parent, e, '<span class="DESU_icnWait">&nbsp;</span>' + Lng.loading[lCode]);
	ajaxGetPosts(null, b, tNum, function(dc, pst, i) {
		post = pst.Num;
		ajPviews[b][post] = pst;
		$each($$X(aib.xMsg + '//a[starts-with(text(),">>")]', pst, dc), function(link) {
			getRefMap(post, link.textContent.match(/\d+/)[0]);
		});
	}, function(err) {
		if(el && !el.forDel) {
			funcPostPreview(importPreview(b, pNum), pNum, parent, e, err);
		}
	});
}

function eventRefLink(el) {
	if(Cfg['navig'] === 0) {
		return;
	}
	var list = $X('.//a[starts-with(text(),">>")]', el),
		clear =
			aib.tiny || aib.ylil ? function(link) {
				var lnk = link.cloneNode(true);
				link.parentNode.replaceChild(lnk, link);
				return lnk;
			}
			: (list.snapshotItem(0) || {}).onmouseover ? function(link) {
				$rattr(link, 'onmouseover');
				$rattr(link, 'onmouseout');
				return link;
			}
			: function(link) {
				return link;
			},
		fn = function() {
			$each(list, function(link) {
				$event(clear(link), {
					'mouseover': showPostPreview,
					'mouseout': markDelete
				});
			});
		};
	if(aib.ylil) {
		setTimeout(fn, 0);
	} else {
		fn();
	}
}


/*==============================================================================
									AJAX FUNCTIONS
==============================================================================*/

function parseHTMLdata(html, b, tNum, pFn) {
	var dc;
	if(!pr.on && oeForm) {
		pr = getPostform($x('.//textarea/ancestor::form[1]', $add(html).parentNode));
		$before($id('DESU_pform').firstChild, [pr.form]);
	}
	if(pFn) {
		try {
			dc = HTMLtoDOM(aib.hana
				? '<html><head></head><body><div id="' + tNum + '" class="thread">' + html + '</div></body></html>'
				: html
			);
			parseDelform(!aib.hana ? $$x(aib.xDForm, dc, dc) : dc, dc, function(post, i) {
				pFn(dc, post, i);
			});
		} catch(e) {}
	}
}

function ajaxGetPosts(url, b, tNum, pFn, fFn) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: url || (fixBrd(b) + res + tNum + (aib.tire ? '.html' : docExt)),
		onreadystatechange: function(xhr) {
			if(xhr.readyState === 4) {
				if(xhr.status === 200) {
					parseHTMLdata(xhr.responseText, b, tNum, pFn);
					fFn();
				} else {
					fFn(xhr.status === 0 ? Lng.noConnect[lCode] : 'HTTP [' + xhr.status + '] ' + xhr.statusText);
				}
			}
		}
	});
}

function getJSON(url, ifmodsince, fn) {
	GM_xmlhttpRequest({
		method: 'GET',
		headers: ifmodsince ? {'If-Modified-Since': ifmodsince} : null,
		url: url,
		onreadystatechange: function(xhr) {
			if(xhr.readyState === 4 && xhr.status !== 304) {
				try {
					fn(xhr.status, xhr.statusText,
						(xhr.responseHeaders.match(/Last-Modified: ([^\n\r]+)/) || {})[1],
						JSON.parse(xhr.responseText)
					);
				} catch(e) {
					fn(1, e.toString(), null, null);
				}
			}
		}
	});
}

function importPreview(b, pNum) {
	if(!ajPviews[b]) {
		ajPviews[b] = {};
	}
	var el = ajPviews[b][pNum];
	if(el && el.ownerDocument !== doc) {
		el = importPost(el);
	}
	return el;
}

function importPost(post) {
	var el = doc.importNode(post, true);
	el.Num = post.Num;
	replaceDelform(el);
	return el;
}

function insertPost(thr, post) {
	var pst, el;
	if(postWrapper && post.Count !== 0) {
		pst = postWrapper.cloneNode(true);
		el = $x(aib.xPost, pst);
		if(el) {
			el.parentNode.replaceChild(post, el);
		} else {
			pst = post;
		}
	} else {
		pst = post;
	}
	thr.appendChild(pst);
}

function addPostFunc(post) {
	doPostFilters(post);
	addRefMap(post, true);
	eventRefLink(post);
	addLinkMP3(post);
	addLinkTube(post);
	addLinkImg(post, true);
	addImgSearch(post);
	if(Cfg['pimgs'] !== 0) {
		preloadImages(post);
	}
	if(post.Vis === 0) {
		setPostVisib(post, 0);
	}
	if(Cfg['delhd'] === 1) {
		mergeHidden(post);
	}
	if(isExpImg) {
		expandAllPostImg(post, null);
	}
}

function newPost(thr, post, i) {
	pushPost(post, i);
	post.Vis = getVisib(post.Num);
	post.thr = thr;
	addPostButtons(post);
	if(Cfg['expimg'] !== 0) {
		eventPostImg(post);
	}
	if(Cfg['expost'] !== 0 && !TNum) {
		expandPost(post);
	}
	addPostFunc(post);
	insertPost(thr, post);
	if(aib.tiny) {
		thr.appendChild($new('br', null, null));
	}
}

function getFullMsg(post, tNum, a, addFunc) {
	var msg = post.Msg;
	if(aib.hana) {
		$del(a.nextSibling);
		$del(a.previousSibling);
		$del(a);
		msg.replaceChild(
			$x('div[@class="postbody alternate"]', post).firstElementChild,
			msg.firstElementChild
		);
		post.Text = getText(msg);
		if(addFunc) {
			processFullMsg(post);
		}
		return;
	}
	ajaxGetPosts(null, brd, tNum, function(dc, pst, i) {
		if(pst.Num === post.Num) {
			$del(a);
			msg.parentNode.replaceChild(doc.importNode(aib.getMsg(pst), true), msg);
			post.Msg = aib.getMsg(post);
			post.Text = getText(post.Msg);
			processFullMsg(post);
			throw '';
		}
	}, function(err) {});
}

function processFullMsg(post) {
	replaceDelform(post);
	$Del('.//a[@class="DESU_btnSrc"]', post);
	addPostFunc(post);
}

function expandPost(post) {
	if(post.Vis === 0) {
		return;
	}
	var tNum = post.thr.Num,
		el = $x(aib.krau
			? './/p[starts-with(@id,"post_truncated")]'
			: aib.hana ? './/div[@class="abbrev"]/span/a'
			: './/div[@class="abbrev"]|.//span[@class="abbr" or @class="omittedposts" or @class="shortened"]',
			post
		);
	if(el && /long|full comment|gekürzt|слишком|длинн|мног|полная версия/i.test(el.textContent)) {
		if(Cfg['expost'] === 1) {
			getFullMsg(post, tNum, el, false);
		} else {
			$rattr(el, 'onclick');
			$event(el, {
				'click': function(e) {
					$pd(e);
					getFullMsg(post, tNum, e.target, true);
				}
			});
		}
	}
}

function loadThread(post, last, fn) {
	var i,
		psts = [],
		thr = post.thr;
	$alert(Lng.loading[lCode], 'Wait');
	ajaxGetPosts(null, brd, post.Num, function(dc, post, j) {
		psts.push(importPost(post));
	}, function(err) {
		$close($id('DESU_alertWait'));
		if(err) {
			$alert(err, '');
		} else {
			i = post.parentNode;
			thr = i.cloneNode(false);
			i.parentNode.replaceChild(thr, i);
			post = psts[0];
			newPost(thr, post, 0);
			$after(post.Btns, $add('<span>&nbsp;[<a href="' + getThrdUrl(aib.host, brd, post.Num) + '">'
				+ Lng.reply[lCode] + '</a>]</span>'))
			if(last === 1 || last >= psts.length - 1) {
				i = 1;
			} else {
				i = psts.length - last;
				thr.appendChild($new('div', {
					'class': 'DESU_omitted',
					'text': Lng.postsOmitted[lCode] + (psts.length - last - 1)
				}, null));
			}
			while(i < psts.length) {
				newPost(thr, psts[i], i++);
			}
			if(last > 5 || last === 1) {
				thr.appendChild($event($add(
					'<span>[<a href="#">' + Lng.collapseThrd[lCode] + '</a>]</span>'
				), {
					'click': function(e) {
						$pd(e);
						loadThread(post, 5, null);
				}}));
			}
			thr.pCount = psts.length;
		}
		$focus(post);
		if(fn) {
			fn();
		}
	});
}

function loadFavorThread(e) {
	var el = this.parentNode.parentNode,
		favt = $c('DESU_favThr', el),
		url = this.nextElementSibling.href,
		tNum = el.id.substr(13).split('|')[2];
	$pd(e);
	if(favt.style.display !== 'none') {
		while(favt.firstChild) {
			$del(favt.firstChild);
		}
		$disp(favt);
		$del($c('DESU_favIframe', doc));
		return;
	}
	if(pByNum[tNum] && pByNum[tNum].offsetHeight) {
		$focus(pByNum[tNum]);
		return;
	}
	window.onmessage = function(e) {
		$c('DESU_alertWait', favt).style.display = 'none';
		favt = $c('DESU_favIframe', favt);
		favt.style.height = e.data + 'px';
	}
	$append(favt, [
		$new('iframe', {
			'name': 'DESU_favIframe',
			'class': 'DESU_favIframe',
			'src': url,
			'style': 'border: none; width: ' + (doc.body.clientWidth - 55) + 'px; height: 0px;'
		}, null),
		$add('<div class="DESU_alertWait" style="font-size: 1.1em; text-align: center">' + Lng.loading[lCode] + '</div>')
	]);
	$disp(favt);
}

function loadPage(p, tClass, len) {
	var thr, page;
	$append(dForm, [
		$new('center', {
			'text': p + Lng.page[lCode],
			'style': 'font-size: 2em;'
		}, null),
		$new('hr', null, null),
		page = $new('div', {'id': 'DESU_page' + p}, null)
	]);
	ajaxGetPosts(getPageUrl(p), null, null, function(dc, post, i) {
		if(i === 0) {
			thr = $new('div', {'class': tClass}, null);
			thr.Num = post.Num;
			$append(page, [
				thr,
				$new('br', {'clear': 'left'}, null),
				$new('hr', null, null)
			]);
		}
		newPost(thr, importPost(post), i);
	}, function(err) {
		if(p === len - 1) {
			$close($id('DESU_alertWait'));
			savePostsVisib();
			readHiddenThreads();
		}
	});
}

function loadPages(len) {
	var p,
		tClass = $c('DESU_thread', dForm).className;
	$alert(Lng.loading[lCode], 'Wait');
	dForm.innerHTML = '';
	for(p = 0, Posts = [], refMap = []; p < len; p++) {
		loadPage(p, tClass, len);
	}
}

/*-------------------------------Threads updater------------------------------*/

function setUpdButtonState(state) {
	if(TNum && Cfg['updthr'] !== 3) {
		$x('.//a[starts-with(@id,"DESU_btnUpd")]', doc).id = 'DESU_btnUpd' + state;
	}
}

function endPostsUpdate() {
	setUpdButtonState('Off');
	clearInterval(ajaxInt);
	ajaxInt = undefined;
}

function infoNewPosts(err, inf) {
	var old;
	if(err) {
		if(err !== Lng.noConnect[lCode]) {
			$alert(Lng.thrdNotFound[lCode] + TNum + '): \n' + err, '');
			doc.title = '{' + err.match(/(?:\[)(\d+)(?:\])/)[1] + '} ' + doc.title;
			endPostsUpdate();
		} else {
			$alert(Lng.noConnect[lCode], 'Warn');
			setUpdButtonState('Warn');
		}
		return;
	}
	if(Cfg['updthr'] === 3) {
		return;
	}
	setUpdButtonState('On');
	$close($id('DESU_alertWarn'));
	if(Cfg['updthr'] === 1) {
		if(doc.body.className === 'focused') {
			return;
		}
		old = doc.title.match(/^\[(\d+)\]/);
		if(old) {
			inf += +old[1];
		}
	}
	if(Cfg['updfav'] !== 0 && favIcon) {
		clearInterval(favIconTimeout);
		if(inf > 0) {
			favIconTimeout = setInterval(function() {
				var href = $xb('.//link[@href="' + favIcon + '"]', doc.head)
						? 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T//'
							+ '/////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBA'
							+ 'AAeaR9cIAAAAASUVORK5CYII='
						: favIcon;
				$Del('.//link[@rel="shortcut icon"]', doc.head);
				doc.head.appendChild($new('link', {
					'href': href,
					'rel': 'shortcut icon'
				}, null));
			}, 800);
		}
	}
	doc.title = (inf > 0 ? ' [' + inf + '] ' : '') + docTitle;
}

function setHanaRating() {
	$event($x('.//input[@type="button"]', doc), {
		'click': function(e) {
			setCookie('DESU_rating', $id('rating').value, 1e12);
		}
	});
}

function getHanaFile(file, pId) {
	var name,
		src = file['src'],
		thumb = file['thumb'],
		thumbW = file['thumb_width'],
		thumbH = file['thumb_height'],
		size = file['size'],
		rating = file['rating'],
		maxRating = getCookie('DESU_rating') || 'r-15',
		kb = 1024,
		mb = 1048576,
		gb = 1073741824;
	if(brd === 'b' || brd === 'rf') {
		name = thumb.substring(thumb.lastIndexOf("/") + 1);
	} else {
		name = src.substring(src.lastIndexOf("/") + 1);
		if(name.length > 17)
		name = name.substring(0, 17) + '...';
	}
	if(rating === 'r-18g' && maxRating !== "r-18g") {
		thumb = "images/r-18g.png";
	} else if(rating === 'r-18' && (maxRating !== 'r-18g' || maxRating !== 'r-18')) {
		thumb = "images/r-18.png";
	} else if(rating === 'r-15' && maxRating === 'sfw') {
		thumb = "images/r-15.png";
	} else if(rating === 'illegal') {
		thumb = "images/illegal.png";
	}
	if(thumb !== file['thumb']) {
		thumbW = 200;
		thumbH = 200;
	}
	return $New('div', {'class': 'file'}, [
		$New('div', {'class': 'fileinfo'}, [
			$txt('Файл: '),
			$new('a', {
				'href': '/' + src,
				'target': '_blank',
				'text': name
			}, null),
			$new('br', null, null),
			$new('em', {
				'text': file['thumb'].substring(file['thumb'].lastIndexOf('.') + 1) + ', ' + (
					size < kb ? size + ' B'
					: size < mb ? (size / kb).toFixed(2) + ' KB'
					: size < gb ? (size / mb).toFixed(2) + ' MB'
					: (size / gb).toFixed(2) + ' GB'
				) + ', ' + file['metadata']['width'] + 'x' + file['metadata']['height']
			}, null),
			$new('br', null, null),
			$New('a', {
				'class': 'edit_ icon',
				'href': '/utils/image/edit/' + file['file_id'] + '/' + pId
			}, [
				$new('img', {
					'title': 'edit',
					'alt': 'edit',
					'src': '/images/blank.png'
				}, null)
			])
		]),
		$New('a', {
			'href': '/' + src,
			'target': '_blank'
		}, [
			$new('img', {
				'class': 'thumb',
				'src': '/' + thumb,
				'width': thumbW,
				'height': thumbH
			}, null)
		])
	]);
}

function getHanaPost(postJson) {
	var i,
		id = postJson['display_id'],
		files = postJson['files'],
		len = files.length,
		post = $New('td', {
			'id': 'reply' + id,
			'class': 'reply DESU_post'
		}, [
			$new('a', {'name': 'i' + id}, null),
			$New('label', null, [
				$New('a', {'class': 'delete icon'}, [
					$new('input', {
						'type': 'checkbox',
						'id': 'delbox_' + id,
						'class': 'delete_checkbox',
						'value': postJson['post_id'],
						'name': id
					}, null),
					$new('img', {
						'alt': 'Удалить',
						'title': 'Mark to delete',
						'src': '/images/blank.png'
					}, null)
				]),
				$new('span', {
					'class': 'postername',
					'text': postJson['name']
				}, null),
				$txt(' ' + postJson['date'].replace(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/,
					function(str, y, mo, d, h, m, s) {
						var dtime = new Date(y, mo - 1, d, h, m, s);
						if(Cfg['ctime'] && timeRegex) {
							dtime.setHours(dtime.getHours() + parseInt(Cfg['ctmofs'], 10));
						}
						return dtime.toString().replace(/GMT.*$/, '');
					}
				) + ' ')
			]),
			$New('span', {'class': 'reflink'}, [
				$new('a', {
					'onclick': 'Highlight(0, ' + id + ')',
					'href': '/' + brd + '/res/' + TNum + '.xhtml#i' + id,
					'text': 'No.' + id
				}, null)
			]),
			$new('br', null, null)
		]);
	
	for(i = 0; i < len; i++) {
		post.appendChild(getHanaFile(files[i], id));
	}
	$append(post, [
		$if(len > 1, $new('div', {'style': 'clear: both;'}, null)),
		$add('<div class="postbody">' + postJson['message_html'] + '</div>'),
		$new('div', {'class': 'abbrev'}, null)
	]);
	return post;
}

function loadNewPosts(inf, fn) {
	var el, del, 
		i = 0,
		len = 0,
		thr = $x('.//div[contains(@class," DESU_thread")]', dForm);
	if(inf) {
		$alert(Lng.loading[lCode], 'Wait');
	}
	if(aib.hana) {
		getJSON('http://dobrochan.ru/api/thread/' + brd + '/' + TNum
			+ '/new.json?message_html&new_format&last_post=' + Posts[Posts.length - 1].Num,
			aib.modSince, function(status, sText, lmod, json) {
				if(status !== 200 || json['error']) {
					if(inf) {
						$close($id('DESU_alertWait'));
					}
					infoNewPosts(status === 0 ? Lng.noConnect[lCode] : (sText || json['message']), null);
				} else {
					aib.modSince = lmod;
					el = (json['result'] || {})['posts'];
					if(el && el.length > 0) {
						for(i = 0, len = el.length; i < len; i++) {
							del = getHanaPost(el[i]);
							replaceDelform(del);
							del.Num = el[i]['display_id'];
							newPost(thr, del, thr.pCount + i);
						}
						thr.pCount += el.length;
					}
					if(inf) {
						$close($id('DESU_alertWait'));
					}
					infoNewPosts(null, el ? el.length : 0);
				}
				if(fn) {
					fn();
				}
			}
		);
		return;
	}
	ajaxGetPosts(null, brd, TNum, function(dc, post, j) {
		el = Posts[i];
		while(el && el.Num !== post.Num) {
			if(!el.isDel) {
				el.isDel = true;
				el.Btns.className += '_del';
			}
			el = Posts[++i];
		}
		if(!el) {
			newPost(thr, importPost(post), i);
			len++;
		} else if(aib.xBan && !el.isBan) {
			del = $$x(aib.xBan, post, dc);
			if(del) {
				if(!$xb(aib.xBan, el)) {
					el.Msg.appendChild(doc.importNode(del, true));
				}
				el.isBan = true;
			}
		}
		i++;
	}, function(err) {
		if(inf) {
			$close($id('DESU_alertWait'));
		}
		infoNewPosts(err, len);
		if(!err) {
			del = Posts.length;
			while(i < del) {
				el = Posts[i++];
				if(!el.isDel) {
					el.isDel = true;
					el.Btns.className += '_del';
				}
			}
			thr.pCount = i - 1;
			savePostsVisib();
			$id('DESU_panelInfo').firstChild.textContent = i + '/' + getImages(dForm).snapshotLength;
		}
		if(fn) {
			fn();
		}
	});
}

function initThreadsUpdater() {
	var C = Cfg['updint'],
		t = 6e4*(C === 0 ? 0.5 : C === 1 ? 1 : C === 2 ? 1.5 : C === 3 ? 2 : C === 4 ? 5 : C === 5 ? 15 : 30);
	if(Cfg['updthr'] === 1) {
		ajaxInt = setInterval(function() {
			loadNewPosts(false, null);
		}, t);
	} else if(Cfg['updthr'] === 2) {
		ajaxInt = setInterval(function() {
			var cnt = 0;
			if(aib.hana) {
				getJSON('http://dobrochan.ru/api/thread/' + brd + '/' + TNum + '.json?new_format',
					aib.modSince, function(status, sText, lmod, json) {
						if(status !== 200 || json['error']) {
							infoNewPosts(status === 0 ? Lng.noConnect[lCode] : (sText || json['message']), null);
						} else {
							aib.modSince = lmod;
							infoNewPosts(null, json['result']['posts_count'] - Posts.length);
						}
					}
				);
			} else {
				ajaxGetPosts(null, brd, TNum, function(dc, pst, i) {
					cnt++;
				}, function(err) {
					infoNewPosts(err, cnt - Posts.length);
				});
			}
		}, t);
	}
}


/*==============================================================================
								POSTS/THREADS HIDERS
==============================================================================*/

function doPostFilters(post) {
	hideByWipe(post);
	if(Cfg['spells'] !== 0) {
		hideBySpells(post);
	}
}

function togglePostVisib(post) {
	setPostVisib(post, post.Vis !== 0 ? 0 : 1);
	savePostsVisib();
}

function togglePost(post, vis) {
	if(post.isOp) {
		post.thr.style.display = vis === 0 ? 'none' : '';
		return;
	}
	$each($X('following-sibling::*', $c(
		aib.krau ? 'postheader'
		: aib.ylil ? 'postinfo'
		: aib.fch ? 'postInfo'
		: aib.tiny ? 'intro'
		: aib._420 ? 'replyheader'
		: 'DESU_postPanel',
		post
	)), function(el) {
		el.style.display = vis === 0 ? 'none' : '';
	});
}

function applyPostVisib(post, vis, note) {
	var el,
		pNum = post.Num;
	if(post.isOp) {
		el = $id('DESU_hidThr_' + pNum);
		if(vis === 1 && el) {
			$del(el);
			toggleHiddenThread(post, 1);
		}
		if(vis === 0 && !el) {
			el = $add(
				'<div class="' + aib.pClass + '" id="DESU_hidThr_' + post.Num + '">'
					+ Lng.hiddenThrd[lCode] + ' <a href="#">№' + pNum + '</a><i> ('
					+ (note !== '' ? 'autohide: ' + note : post.thr.dTitle) + ')</i></div>'
			);
			$event($t('a', el), {
				'click': function(e) {
					$pd(e);
					togglePostVisib(post);
				}
			});
			$before(post.thr, [el]);
			toggleHiddenThread(post, 0);
			post.thr.Vis = vis;
		}
	} else if(Cfg['delhd'] === 2) {
		aib.getWrap(post).style.display = vis === 0 ? 'none' : '';
	}
	if(!sav.cookie) {
		Visib[brd + pNum] = vis;
		Expires[brd + pNum] = (new Date()).getTime() + storageLife;
	} else if(TNum) {
		Visib[post.Count] = vis;
	}
	post.Vis = vis;
}

function setPostVisib(post, vis) {
	post.Btns.firstChild.className = vis === 0 ? 'DESU_btnUnhide' : 'DESU_btnHide';
	togglePost(post, vis);
	applyPostVisib(post, vis, '');
	if(Cfg['navhid'] !== 0) {
		setTimeout(function() {
			$each($X('.//a[contains(@href,"#' + post.Num + '")]', dForm), function(el) {
				el.className = vis === 0 ? 'DESU_refHid' : '';
			});
		}, 0);
	}
}

function hidePost(post, note) {
	if(!post.noHide) {
		if(post.Vis !== 0) {
			post.Btns.appendChild($new('a', {
				'class': 'DESU_postNote',
				'text': ' autohide: ' + note + ' ',
				'href': '#'}, {
				'click': function(e) {
					$pd(e);
					$del(this);
				}
			}));
		}
		applyPostVisib(post, 0, note);
	}
}

function unhidePost(post) {
	if(!detectWipe(post)) {
		setPostVisib(post, 1);
		$del($c('DESU_postNote', post));
		hideByWipe(post);
	}
}

function saveHiddenPosts() {
	forEachPost(function(post) {
		if(post.Vis === 0) {
			setPostVisib(post, 0);
		}
	});
	savePostsVisib();
}

function mergeHidden(post) {
	var el, next;
	if(post.Vis !== 0 || post.isOp) {
		return;
	}
	el = post.previousElementSibling;
	if(!el) {
		return;
	}
	if(!/merged/.test(el.id)) {
		el = $new('span', {
			'id': 'DESU_merged_' + post.Num,
			'style': 'display: none;'
		}, null);
		$before(post, [
			$new('span', {
				'style': 'display: ; cursor: pointer;'}, {
				'click': function(e) {
					var hDiv = $id('DESU_merged_' + post.Num);
					$pd(e);
					hDiv.previousElementSibling.innerHTML =
						unescape(hDiv.style.display === 'none' ? '%u25BC' : '%u25B2') + '[<i><a href="#">'
						+ Lng.hiddenPosts[lCode] + '</a>:&nbsp;' + hDiv.childNodes.length + '</i>]';
					$disp(hDiv);
				}
			}),
			el
		]);
	}
	el.appendChild(post);
	next = post.nextElementSibling;
	if(!next || getVisib(next.Num) === 1) {
		el.previousElementSibling.innerHTML =
			unescape('%u25B2') + '[<i><a href="#">' + Lng.hiddenPosts[lCode] + '</a>:&nbsp;'
			+ el.childNodes.length + '</i>]';
	}
}

function processHidden(newCfg, oldCfg) {
	if(newCfg === 2 || oldCfg === 2) {
		forEachPost(function(post) {
			if(post.Vis === 0 && !post.isOp) {
				$disp(aib.getWrap(post));
			}
		});
	}
	if(oldCfg === 1) {
		$each($X('.//span[starts-with(@id,"DESU_merged")]', doc), function(el) {
			var px = el.childNodes,
				i = px.length;
			while(i--) {
				$after(el, px[i]);
			}
			$del(el.previousElementSibling);
			$del(el);
		});
	}
	if(newCfg === 1) {
		forEachPost(mergeHidden);
	}
	saveCfg('delhd', newCfg);
	scriptCSS();
}

/*--------------------------Hide posts with similar text----------------------*/

function getWrds(post) {
	return post.Text.replace(/\s+/g, ' ')
		.replace(/[\?\.\\\/\+\*\$\^\(\)\|\{\}\[\]!@#%_=:;<,-]/g, '')
		.substring(0, 800).split(' ');
}

function findSameText(post, oNum, oVis, oWords) {
	var j,
		words = getWrds(post),
		len = words.length,
		i = oWords.length,
		olen = i,
		_olen = i,
		n = 0;
	if(len < olen*0.4 || len > olen*3) {
		return;
	}
	while(i--) {
		if(olen > 6 && oWords[i].length < 3) {
			_olen--;
			continue;
		}
		j = len;
		while(j--) {
			if(words[j] === oWords[i] || oWords[i].match(/>>\d+/) && words[j].match(/>>\d+/)) {
				n++;
			}
		}
	}
	if(n < _olen*0.4 || len > _olen*3) {
		return;
	}
	$del($c('DESU_postNote', post));
	if(oVis !== 0) {
		hidePost(post, 'similar to >>' + oNum);
	} else {
		unhidePost(post);
	}
}

function hideBySameText(post) {
	var vis = post.Vis;
	if(post.Text !== '') {
		forEachPost(function(target) {
			findSameText(target, post.Num, vis, getWrds(post));
		});
		saveHiddenPosts();
	} else {
		applySpells('#notxt');
	}
}


/*==============================================================================
								SPELLS AND EXPRESSIONS
==============================================================================*/

function getSpellObj() {
	return {
		words: [], exp: [], exph: [], img: [], imgn: [], name: [], theme: [], tmax: [],
		sage: false, notxt: false, noimg: false, trip: false
	};
}

function initSpells() {
	var i, x, b, n, t, p, j, Spells;
	pSpells = getSpellObj();
	tSpells = getSpellObj();
	oSpells = {rep: [], skip: [], num: [], outrep: [], video: []};
	for(i = 0; x = spellsList[i++];) {
		Spells = pSpells;
		x = x.toString();
		if(/^#(?:[^\s]+\/)?(?:\d+)? /.test(x)) {
			b = x.match(/^#([^\/]+)\//);
			n = x.match(/(\d+)\s/);
			if(TNum && b && n && b[1] === brd && n[1] === TNum
				|| TNum && !b && n && n[1] === TNum || b && !n && b[1] === brd) {
				x = x.replace(/^#[^\s]+ /, '');
			} else {
				continue;
			}
		}
		if(/^#op /.test(x)) {
			if(!TNum) {
				Spells = tSpells;
				x = x.substr(4);
			} else {
				continue;
			}
		}
		if(!/^#/.test(x)) {
			Spells.words.push(x);
			continue;
		}
		t = x.split(' ')[0];
		p = x.replace(/^#[^\s]+ /, '');
		if(TNum && (t === '#skip' || t === '#num')) {
			p = p.split(', ');
			j = p.length;
			while(j--) {
				if(p[j].indexOf('-') < 0) {
					p[j] += '-' + p[j];
				}
				t === '#num' ? oSpells.num.push(p[j]) : oSpells.skip.push(p[j]);
			}
		}
		t === '#rep' ? oSpells.rep.push(p)
		: t === '#exp' ? Spells.exp.push(strToRegexp(p))
		: t === '#exph' ? Spells.exph.push(strToRegexp(p))
		: t === '#img' ? Spells.img.push(p)
		: t === '#imgn' ? Spells.imgn.push(strToRegexp(p))
		: t === '#name' ? Spells.name.push(p)
		: t === '#theme' ? Spells.theme.push(strToRegexp(p))
		: t === '#tmax' ? Spells.tmax.push(p)
		: t === '#sage' ? Spells.sage = true
		: t === '#notxt' ? Spells.notxt = true
		: t === '#noimg' ? Spells.noimg = true
		: t === '#trip' ? Spells.trip = true
		: t === '#outrep' ? oSpells.outrep.push(p)
		: t === '#video' && oSpells.video.push(p);
	}
}

function doReplace(arr, txt) {
	var re,
		i = arr.length;
	while(i--) {
		re = strToRegexp(arr[i]);
		txt = txt.replace(re, arr[i].substr(re.toString().length + 1));
	}
	return txt;
}

function getImgSpell(imgW, imgH, imgK, exp) {
	var s, stat, expK, x, expW, expH;
	if(exp === '') {
		return false;
	}
	s = exp.split('@');
	stat = s[0][0];
	expK = s[0].substr(1).split('-');
	if(!expK[1]) {
		expK[1] = expK[0];
	}
	if(expK[0] !== '') {
		if((stat === '<' && imgK < +expK[0])
			|| (stat === '>' && imgK > +expK[0])
			|| (stat === '=' && imgK >= +expK[0] && imgK <= +expK[1])) {
			if(!s[1]) {
				return 'image ' + exp;
			}
		} else {
			return false;
		}
	}
	if(s[1]) {
		x = s[1].split(/[x×]/);
		expW = x[0].split('-');
		expH = x[1].split('-');
		if(!expW[1]) {
			expW[1] = expW[0];
		}
		if(!expH[1]) {
			expH[1] = expH[0];
		}
		if((stat === '<' && imgW < +expW[0] && imgH < +expH[0])
			|| (stat === '>' && imgW > +expW[0] && imgH > +expH[0])
			|| (stat === '=' && imgW >= +expW[0] && imgW <= +expW[1]
				&& imgH >= +expH[0] && imgH <= +expH[1])) {
			return 'image ' + exp;
		}
	}
	return false;
}

function getSpells(x, post) {
	var inf, i, t, _t, pTitle, pName, pTrip, sz, imgW, imgH, imgK;
	post.noHide = false;
	if(oSpells.skip[0] && TNum) {
		inf = post.Count + 1;
		for(i = 0; t = oSpells.skip[i++];) {
			t = t.split('-');
			if(inf >= +t[0] && inf <= +t[1]) {
				post.noHide = true;
				return false;
			}
		}
	}
	if(x.words[0] || x.theme[0]) {
		pTitle = $c('replytitle', post) || $c('filetitle', post);
		pTitle = pTitle ? pTitle.textContent.toLowerCase() : '';
	}
	if(x.words[0]) {
		for(i = 0, inf = post.Text.toLowerCase(); t = x.words[i++];) {
			_t = t;
			t = t.toLowerCase();
			if(inf.indexOf(t) >= 0 || pTitle.indexOf(t) >= 0) {
				return _t;
			}
		}
	}
	if(x.theme[0]) {
		for(i = 0; t = x.theme[i++];) {
			if(t.test(pTitle)) {
				return '#theme ' + t.toString();
			}
		}
	}
	if(x.exp[0]) {
		for(i = 0, inf = post.Text; t = x.exp[i++];) {
			if(t.test(inf)) {
				return '#exp ' + t.toString();
			}
		}
	}
	if(x.exph[0]) {
		for(i = 0, inf = post.innerHTML; t = x.exph[i++];) {
			if(t.test(inf)) {
				return '#exph ' + t.toString();
			}
		}
	}
	if(x.name[0] || x.trip) {
		pName = $c('commentpostername', post) || $c('postername', post);
		pTrip = $c('postertrip', post);
	}
	if(x.trip && pTrip) {
		return '#trip';
	}
	if(x.name[0]) {
		pName = pName ? pName.textContent : '';
		pTrip = pTrip ? pTrip.textContent : '';
		for(i = 0; t = x.name[i++];) {
			_t = t;
			t = t.split(/!+/);
			if(t[0] !== '' && pName.indexOf(t[0]) >= 0 || t[1] !== '' && pTrip.indexOf(t[1]) >= 0) {
				return '#name ' + _t;
			}
		}
	}
	if(post.Img.snapshotLength > 0) {
		if(x.img[0]) {
			sz = getImgSize(post);
			imgW = +sz[0];
			imgH = +sz[1];
			imgK = getImgWeight(post);
			for(i = 0; t = x.img[i++];) {
				if(getImgSpell(imgW, imgH, imgK, t)) {
					return '#img ' + t;
				}
			}
		}
		if(x.imgn[0]) {
			inf = aib.getImgInfo(post);
			if(inf) {
				for(i = 0, inf = inf.textContent; t = x.imgn[i++];) {
					if(t.test(inf)) {
						return '#imgn ' + t;
					}
				}
			}
		}
	}
	if(oSpells.num[0]) {
		for(i = 0, inf = post.Count + 1; t = oSpells.num[i++];) {
			_t = t;
			t = t.split('-');
			if(inf >= +t[0] && inf <= +t[1]) {
				return '#num ' + _t;
			}
		}
	}
	if(x.tmax[0]) {
		for(i = 0, inf = post.Text.replace(/\n/g, '').length; t = x.tmax[i++];) {
			if(inf >= t) {
				return '#tmax ' + t;
			}
		}
	}
	if(x.sage && aib.getSage(post)) {
		return '#sage';
	}
	if(x.notxt && post.Text === '') {
		return '#no text';
	}
	if(x.noimg && post.Img.snapshotLength === 0) {
		return '#no image';
	}
	return false;
}

function checkSpells(post) {
	if(!TNum && post.isOp) {
		return getSpells(tSpells, post) || getSpells(pSpells, post);
	}
	return getSpells(pSpells, post);
}

function hideBySpells(post) {
	var exp;
	if(Cfg['filthr'] === 0 && post.isOp) {
		return;
	}
	exp = checkSpells(post);
	if(post.Vis === 0) {
		if(post.noHide) {
			unhidePost(post);
		}
	} else if(exp) {
		hidePost(post, exp.substring(0, 70));
	}
}

function verifyRegExp(txt) {
	var i, t, rep,
		re = /#exp |#exph |#rep |#outrep |#imgn |#video |#theme /;
	txt = txt.split('\n');
	i = txt.length;
	while(i--) {
		t = txt[i];
		rep = t.match(re);
		if(rep) {
			try {
				strToRegexp(t.substr(t.indexOf(rep)));
			} catch(e) {
				return t;
			}
		}
	}
	return false;
}

function toggleSpells() {
	var fld = $id('DESU_spellEdit'),
		val = (fld ? fld.value : spellsList.join('\n')).replace(/[\r\n]+/g, '\n').replace(/^\n|\n$/g, ''),
		wrong = verifyRegExp(val);
	if(!wrong) {
		saveSpells(val);
	}
	if(val !== '' && !wrong) {
		if(fld) {
			fld.value = val;
		}
		if(Cfg['spells'] !== 0) {
			forEachPost(hideBySpells);
			hideTextTube();
		} else {
			unHideTextTube();
			forEachPost(function(post) {
				if(checkSpells(post)) {
					unhidePost(post);
				}
			})
		}
		saveHiddenPosts();
	} else {
		if(wrong) {
			$alert(Lng.error[lCode] + ' ' + wrong, '');
		}
		if(fld) {
			$id('DESU_spellChk').checked = false;
		}
		saveCfg('spells', 0);
	}
}

function applySpells(txt) {
	var nval, ntxt, wrong,
		fld = $id('DESU_spellEdit'),
		val = fld ? fld.value : spellsList.join('\n');
	if(txt !== '') {
		if(txt.trim() === '') {
			return;
		}
		if(TNum) {
			txt = '#' + brd + '/' + TNum + ' ' + txt;
		}
		toggleSpells();
		nval = '\n' + val;
		ntxt = '\n' + txt;
		val = nval.indexOf(ntxt) >= 0 ? nval.split(ntxt).join('') : val + ntxt;
	}
	val = val.replace(/[\r\n]+/g, '\n').replace(/^\n|\n$/g, '');
	wrong = verifyRegExp(val);
	if(wrong) {
		$alert(Lng.error[lCode] + ' ' + wrong, '');
		return;
	}
	if(fld) {
		fld.value = val;
		$id('DESU_spellChk').checked = val !== '';
	}
	forEachPost(function(post) {
		if(checkSpells(post)) {
			unhidePost(post);
		}
	})
	unHideTextTube();
	saveSpells(val);
	if(val !== '') {
		saveCfg('spells', 1);
		forEachPost(hideBySpells);
		hideTextTube();
	} else {
		saveCfg('spells', 0);
	}
	saveHiddenPosts();
}


/*==============================================================================
									WIPE DETECTORS
==============================================================================*/

function detectWipe_sameLines(txt) {
	var lines, i, x,
		arr = [],
		n = 0;
	if(Cfg['samel'] === 0) {
		return false;
	}
	lines = txt.replace(/> /g, '').split(/\s*\n\s*/);
	i = lines.length;
	if(i < 6) {
		return false;
	}
	while(i--) {
		x = lines[i];
		if(x.length === 0) {
			continue;
		}
		if(arr[x]) {
			arr[x]++;
		} else {
			arr[x] = 1;
		}
		n++;
	}
	n = n/4;
	for(x in arr) {
		if(arr[x] > n && arr[x] > 4) {
			return 'same lines: "' + x.substr(0, 20) + '" x' + (arr[x] + 1);
		}
	}
	return false;
}

function detectWipe_sameWords(txt) {
	var words, i, x,
		arr = [],
		n = 0,
		keys = 0,
		pop = '',
		mpop = -1;
	if(Cfg['samew'] === 0) {
		return false;
	}
	words = txt.replace(/[\s\.\?\!,>]+/g, ' ').toUpperCase().split(' ');
	i = words.length;
	if(i <= 13) {
		return false;
	}
	while(i--) {
		x = words[i];
		if(x.length < 2) {
			continue;
		}
		if(arr[x]) {
			arr[x]++;
		} else {
			arr[x] = 1;
		}
		n++;
	}
	if(n < 10) {
		return false;
	}
	for(x in arr) {
		keys++;
		if(arr[x] > mpop) {
			mpop = arr[x];
			pop = x;
		}
		if(n > 25 && arr[x] > n/3.5) {
			return 'same words: "' + x.substr(0, 20) + '" x' + arr[x];
		}
	}
	return n > 80 && keys <= 20 || n/keys > 7
		? 'same words: "' + pop.substr(0, 20) + '" x' + mpop
		: false;
}

function detectWipe_longColumn(txt) {
	var rows, i,
		n = 0;
	if(Cfg['longp'] === 0) {
		return false;
	}
	rows = txt.split(/\s*\n\s*/);
	i = rows.length;
	if(i > 50) {
		return 'long text x' + i;
	}
	while(i--) {
		if(rows[i].length < 9) {
			n++;
		} else {
			return false;
		}
	}
	return n > 5 ? 'columns x' + n : false;
}

function detectWipe_longWords(txt) {
	var words, i, x,
		all = '',
		longest = '',
		n = 0;
	if(Cfg['longw'] === 0) {
		return false;
	}
	words = txt.replace(/https*:\/\/.*?(\s|$)/g, '').replace(/[\s\.\?!,>:;-]+/g, ' ').split(' ');
	i = words.length;
	while(i--) {
		x = words[i];
		if(x.length < 2) {
			continue;
		}
		all += x;
		longest = x.length > longest.length ? x : longest;
		n++;
	}
	return n === 1 && longest.length > 70 || n > 1 && all.length/n > 12
		? 'long words: "' + longest.substr(0, 20) + '.."'
		: false;
}

function detectWipe_caseWords(txt) {
	var words, i, x,
		capsw = 0,
		casew = 0,
		n = 0;
	if(Cfg['caps'] === 0) {
		return false;
	}
	words = txt.replace(/[\s\.\?!;,-]+/g, ' ').trim().split(' ');
	if(words.length < 5) {
		return false;
	}
	for(i = 0; x = words[i++];) {
		if((x.match(/[a-zа-я]/ig) || []).length < 5) {
			continue;
		}
		if((x.match(/[A-ZА-Я]/g) || []).length > 2) {
			casew++;
		}
		if(x === x.toUpperCase()) {
			capsw++;
		}
		n++;
	}
	return (capsw/n >= 0.3 && n > 4) ? ('CAPSLOCK: ' + parseInt(capsw/words.length*100, 10) + '%')
		: (casew/n >= 0.3 && n > 8) ? ('cAsE words: ' + parseInt(casew/words.length*100, 10) + '%')
		: false;
}

function detectWipe_specSymbols(txt) {
	var len, proc;
	if(Cfg['specs'] === 0) {
		return false;
	}
	txt = txt.replace(/\s+/g, '');
	len = txt.length;
	proc = txt.replace(/[0-9a-zа-я\.\?!,]/ig, '').length/len;
	return len > 30 && proc > 0.4 ? 'specsymbols: ' + parseInt(proc*100, 10) + '%' : false;
}

function detectWipe_numbers(txt) {
	var len, proc;
	if(Cfg['nums'] === 0) {
		return false;
	}
	txt = txt.replace(/\s+/g, ' ').replace(/((>>\d+)+|https*:\/\/.*?)(\s|$)/g, '');
	len = txt.length;
	proc = (len - txt.replace(/\d/g, '').length)/len;
	return len > 30 && proc > 0.4 ? 'numbers: ' + parseInt(proc*100, 10) + '%' : false;
}

function detectWipe(post) {
	var arr, i, x;
	if(Cfg['awipe'] === 0) {
		return false;
	}
	arr = [
		detectWipe_sameLines,
		detectWipe_sameWords,
		detectWipe_longColumn,
		detectWipe_longWords,
		detectWipe_caseWords,
		detectWipe_specSymbols,
		detectWipe_numbers
	];
	for(i = 0; i < 7; i++) {
		x = arr[i](post.Text);
		if(x) {
			return x;
		}
	}
	return false;
}

function hideByWipe(post) {
	var note;
	if(Cfg['filthr'] === 0 && post.isOp || post.Vis === 0 || post.Vis === 1) {
		return;
	}
	note = detectWipe(post);
	if(note) {
		hidePost(post, note);
	} else {
		applyPostVisib(post, 1, '');
	}
}


/*==============================================================================
									SCRIPT CSS
==============================================================================*/

function scriptCSS() {
	var x = [],
		p = 'background: ' + (Cfg['sstyle'] === 0
			? nav.aCFix + 'linear-gradient(top, #4b90df 0%, #3d77be 20%, #376cb0 25%, #295591 50%, #183d77 50%, #1f4485 75%, #264c90 85%, #325f9e 100%)'
			: Cfg['sstyle'] === 1 ?
				'url( data:image/gif;base64,R0lGODlhAQAZAMQAABkqTSRDeRsxWBcoRh48axw4ZChOixs0Xi1WlihMhRkuUQwWJiBBcSpTkS9bmxAfNSdKgDJfoQ0YKRElQQ4bLRAjOgsWIg4fMQsVHgAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAAQAZAEAFFWDETJghUAhUAM/iNElAHMpQXZIVAgA7)'
			: '#777'
		) + '; ',
		gif = function(nm, src) {
			x.push(nm + ' { background: url(data:image/gif;base64,' + src + ') no-repeat center !important; }');
		};

	// Settings window
	x.push(
		'#DESU_cfgWindow { float: left; ' + nav.cFix + 'border-radius: 10px 10px 0 0; width: auto; min-width: 0; padding: 0; margin: 5px 20px; overflow: hidden; }\
		#DESU_cfgHead { padding: ' + (Cfg['sstyle'] === 1 ? '3' : '5') + 'px; border-radius: 10px 10px 0 0; ' + p + 'color: #fff; text-align: center; font: bold 14px arial; cursor: default; }\
		.DESU_cfgBody { min-width: 412px; min-height: 250px; padding: 11px 7px 7px; margin-top: -1px; font: 13px sans-serif; }\
		.DESU_cfgBody input[type="text"] { width: auto; }\
		.DESU_cfgBody input[value=">"] { width: 20px; }\
		.DESU_cfgBody, #DESU_cfgBtns { border: 1px solid #183d77; border-top: none; }\
		#DESU_cfgBtns { padding: 7px 2px 2px; }\
		#DESU_cfgBar { height: 25px; width: 100%; display: table; background-color: ' + (Cfg['sstyle'] === 0 ? '#325f9e;' : Cfg['sstyle'] === 1 ? '#0c1626; padding-top: 3px;' : '#777;') + ' }\
		.DESU_cfgTab, .DESU_cfgTab_sel { padding: 4px 9px; border: 1px solid #183d77; ' + nav.cFix + 'border-radius: 4px 4px 0 0; font: bold 14px arial; text-align: center; cursor: default; }\
		.DESU_cfgTab { ' + (Cfg['sstyle'] === 0 ? 'background: ' + nav.aCFix + 'linear-gradient(top, rgba(132,132,132,.35) 0%, rgba(110,110,110,.35) 20%, rgba(100,100,100,.35) 25%, rgba(79,79,79,.35) 50%, rgba(58,58,58,.35) 50%, rgba(68,68,68,.35) 75%, rgba(74,74,74,.35) 85%, rgba(90,90,90,.35) 100%);' : 'background-color: rgba(0,0,0,.2);') + ' }\
		.DESU_cfgTab:hover { ' + (Cfg['sstyle'] === 0 ? 'background: ' + nav.aCFix + 'linear-gradient(top, rgba(90,90,90,.35) 0%, rgba(74,74,74,.35) 15%, rgba(68,68,68,.35) 25%, rgba(58,58,58,.35) 50%, rgba(79,79,79,.35) 50%, rgba(100,100,100,.35) 75%, rgba(110,110,110,.35) 80%, rgba(132,132,132,.35) 100%);' : 'background-color: rgba(99,99,99,.2);') + ' }\
		.DESU_cfgTab_sel { border-bottom: none; }\
		.DESU_cfgTabBack { display: table-cell !important; float: none !important; min-width: 0; padding: 0 !important; ' + nav.cFix + 'box-shadow: none !important; border: none !important; ' + nav.cFix + 'border-radius: 4px 4px 0 0; opacity: 1; }\
		#DESU_spellPanel { float: right; }\
		#DESU_spellPanel a { padding: 0 7px; text-align: center; }'
	);

	// Main panel
	x.push(
		'#DESU_panel { ' + (Cfg['attach'] === 0 ? 'float: right;' : 'position: fixed; right: 0; bottom: 0;') + ' height: 25px; z-index: 9999; ' + p + nav.cFix + 'border-radius: 15px 0 0 0; cursor: default;}\
		#DESU_panelBtns { display: inline-block; padding: 0; margin: 0; border-left: 1px solid ' + (Cfg['sstyle'] === 0 ? '#8fbbed' : Cfg['sstyle'] === 1 ? '#79c' : '#ccc') + '; }\
		#DESU_btnLogo { margin-right: 4px; }\
		#DESU_panelInfo { display: inline-block; height: 25px; vertical-align: top; padding: 2px 4px 0 6px; border-left: 1px solid ' + (Cfg['sstyle'] === 0 ? '#8fbbed' : Cfg['sstyle'] === 1 ? '#79c' : '#ccc') + '; color: #fff; font: 18px serif; }'
	);
	if(Cfg['sstyle'] === 0) {
		x.push(
			'#DESU_panelBtns > li { margin: 0 1px; ' + nav.aCFix + 'transition: all 0.3s ease; }\
			#DESU_panelBtns > li:hover { background-color: rgba(255,255,255,.15); ' + nav.cFix + 'box-shadow: 0 0 3px rgba(143,187,237,.5); }\
			#DESU_panelBtns > li, #DESU_panelBtns > li > a, #DESU_btnLogo { display: inline-block; width: 25px; height: 25px; }'
		);
	} else {
		x.push(
			'#DESU_panelBtns > li > a { margin: 0 1px; ' + nav.cFix + 'border-radius: 5px; }\
			#DESU_panelBtns > li > a:hover { padding: 0 21px 21px 0 !important; border: 2px solid ' + (Cfg['sstyle'] === 1 ? '#9be' : '#444') + ' }\
			#DESU_panelBtns > li, #DESU_panelBtns > li > a, #DESU_btnLogo { display: inline-block; }\
			#DESU_panelBtns > li > a, #DESU_btnLogo { padding: 0 25px 25px 0; }'
		);
	}

	if(Cfg['icount'] === 0) {
		x.push('#DESU_panelInfo { display: none; }');
	}
	if(Cfg['showmp'] === 0) {
		x.push('#DESU_panelBtns, #DESU_panelInfo { display: none; }');
	}
	p = 'R0lGODlhGQAZAIAAAPDw8P///yH5BAEAAAEALAAAAAAZABkAQA';
	gif('#DESU_btnLogo', p + 'I5jI+pywEPWoIIRomz3tN6K30ixZXM+HCgtjpk1rbmTNc0erHvLOt4vvj1KqnD8FQ0HIPCpbIJtB0KADs=');
	gif('#DESU_btnSettings', p + 'JAjI+pa+API0Mv1Ymz3hYuiQHHFYjcOZmlM3Jkw4aeAn7R/aL6zuu5VpH8aMJaKtZR2ZBEZnMJLM5kIqnP2csUAAA7');
	gif('#DESU_btnHidden', p + 'I5jI+pa+CeHmRHgmCp3rxvO3WhMnomUqIXl2UmuLJSNJ/2jed4Tad96JLBbsEXLPbhFRc8lU8HTRQAADs=');
	gif('#DESU_btnFavor', p + 'IzjI+py+AMjZs02ovzobzb1wDaeIkkwp3dpLEoeMbynJmzG6fYysNh3+IFWbqPb3OkKRUFADs=');
	gif('#DESU_btnRefresh', p + 'JAjI+pe+AfHmRGLkuz3rzN+1HS2JWbhWlpVIXJ+roxSpr2jedOBIu0rKjxhEFgawcCqJBFZlPJIA6d0ZH01MtRCgA7');
	gif('#DESU_btnGoback', p + 'IrjI+pmwAMm4u02gud3lzjD4biJgbd6VVPybbua61lGqIoY98ZPcvwD4QUAAA7');
	gif('#DESU_btnGonext', p + 'IrjI+pywjQonuy2iuf3lzjD4Zis0Xd6YnQyLbua61tSqJnbXcqHVLwD0QUAAA7');
	gif('#DESU_btnGoup', p + 'IsjI+pm+DvmDRw2ouzrbq9DmKcBpVfN4ZpyLYuCbgmaK7iydpw1OqZf+O9LgUAOw==');
	gif('#DESU_btnGodown', p + 'ItjI+pu+DA4ps02osznrq9DnZceIxkYILUd7bue6WhrLInLdokHq96tnI5YJoCADs=');
	gif('#DESU_btnNewthr', p + 'IyjI+pG+APQYMsWsuy3rzeLy2g05XcGJqqgmJiS63yTHtgLaPTY8Np4uO9gj0YbqM7bgoAOw==');
	gif('#DESU_btnExpimg', p + 'I9jI+pGwDn4GPL2Wep3rxXFEFel42mBE6kcYXqFqYnVc72jTPtS/KNr5OJOJMdq4diAXWvS065NNVwseehAAA7');
	gif('#DESU_btnMaskimg', p + 'JQjI+pGwD3TGxtJgezrKz7DzLYRlKj4qTqmoYuysbtgk02ZCG1Rkk53gvafq+i8QiSxTozIY7IcZJOl9PNBx1de1Sdldeslq7dJ9gsUq6QnwIAOw==');
	if(aib.nul) {
		gif('#DESU_btnCatalog', p + 'I2jI+pa+DhAHyRNYpltbz7j1Rixo0aCaaJOZ2SxbIwKTMxqub6zuu32wP9WsHPcFMs0XDJ5qEAADs=');
	}
	p = 'Dw8P///wAAACH5BAEAAAIALAAAAAAZABkAQAJElI+pe2EBoxOTNYmr3bz7OwHiCDzQh6bq06QSCUhcZMCmNrfrzvf+XsF1MpjhCSainBg0AbKkFCJko6g0MSGyftwuowAAOw==';
	gif('#DESU_btnUpdOn', 'R0lGODlhGQAZAJEAADL/Mv' + p);
	gif('#DESU_btnUpdOff', 'R0lGODlhGQAZAJEAAP8yMv' + p);
	gif('#DESU_btnUpdWarn', 'R0lGODlhGQAZAJEAAP/0Qf' + p);

	// Post buttons
	x.push(
		'a[class^="DESU_btn"] { display: inline-block; padding: 0 14px 14px 0; margin: 0 4px -2px 0 !important; }\
		span[class^="DESU_postPanel"] { margin-left: 4px; font-weight: bold; }'
	);
	p = 'R0lGODlhDgAOAKIAAPDw8KCgoICAgEtLS////wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA4AQAM';
	gif('.DESU_btnHide', p + '8SLLcS2MNQGsUMYi6uB5BKI5hFgojel5YBbDDNcmvpJLkcgLq1jcuSgPmgkUmlJgFAyqNmoEBJEatxggJADs=');
	gif('.DESU_btnUnhide', p + '5SLLcS2ONCcCMIoYdRBVcN4Qkp4ULmWVV20ZTM1SYBJbqvXmA3jk8IMzlgtVYFtkoNCENIJdolJAAADs=');
	gif('.DESU_btnRep', p + '4SLLcS2MNQGsUMQRRwdLbAI5kpn1kKHUWdk3AcDFmOqKcJ5AOq0srX0QWpBAlIo3MNoDInlAZIQEAOw==');
	gif('.DESU_btnExpthr', p + '7SLLcS6MNACKLIQjKgcjCkI2DOAbYuHlnKFHWUl5dnKpfm2vd7iyUXywEk1gmnYrMlEEyUZCSdFoiJAAAOw==');
	gif('.DESU_btnFav', p + '5SLLcS2MNQGsUl1XgRvhg+EWhQAllNG0WplLXqqIlDS7lWZvsJkm92Au2Aqg8gQFyhBxAlNCokpAAADs=');
	gif('.DESU_btnFavSel', 'R0lGODlhDgAOAKIAAP/hAKCgoICAgEtLS////wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA4AQAM5SLLcS2MNQGsUl1XgRvhg+EWhQAllNG0WplLXqqIlDS7lWZvsJkm92Au2Aqg8gQFyhBxAlNCokpAAADs=');
	gif('.DESU_btnSage', 'R0lGODlhDgAOAJEAAPDw8EtLS////wAAACH5BAEAAAIALAAAAAAOAA4AQAIZVI55duDvFIKy2vluoJfrD4Yi5lWRwmhCAQA7');

	// Search images buttons
	x.push(
		'.DESU_btnSrc { padding: 0 16px 0 0; background: url(data:image/gif;base64,R0lGODlhDgAOAKIAAPDw8KCgoICAgEtLS////wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA4AQAM9SLLcS0MMQMesUoQg6PKbtFnDaI0a53VAml2ARcVSFC0WY6ecyy+hFajnWDVssyQtB5NhTs1mYAAhWa2EBAA7) no-repeat; cursor: pointer; }\
		a[class^=DESU_src]:before { content: ""; padding: 0 16px 0 0; margin: 0 4px; }\
		.DESU_srcGoogle:before { background: url(http://google.ru/favicon.ico); }\
		.DESU_srcTineye:before { background: url(http://tineye.com/favicon.ico); }\
		.DESU_srcIqdb:before { background: url(http://iqdb.org/favicon.ico); ' + nav.cFix + 'background-size: cover; }\
		.DESU_srcSaucenao:before { background: url(http://saucenao.com/favicon.ico); }'
	);

	// Posts counter
	if(TNum) x.push(
		'form div.DESU_thread { counter-reset: i 1; }\
		form div.DESU_thread .DESU_postPanel:after { counter-increment: i 1; content: counter(i, decimal); vertical-align: 1px; color: #4f7942; font: italic bold 13px serif; cursor: default; }\
		form div.DESU_thread .DESU_postPanel_del:after { content: "' + Lng.deleted[lCode] + '"; color: #727579; font: italic bold 13px serif; cursor: default; }'
	);

	// text format buttons
	x.push('#DESU_txtPanel { display: ' + (Cfg['txtpos'] === 0 ? 'inline' : 'block') + '; font-weight: bold; cursor: pointer; }');
	if(Cfg['txtbtn'] === 1) {
		x.push('#DESU_txtPanel span { padding: 4px 27px 4px 0; }');
		p = 'R0lGODlhFwAWAJEAAPDw8GRkZAAAAP///yH5BAEAAAMALAAAAAAXABYAQAJ';
		gif('#DESU_btnBold', p + 'T3IKpq4YAoZgR0KqqnfzipIUikFWc6ZHBwbQtG4zyonW2Vkb2iYOo8Ps8ZLOV69gYEkU5yQ7YUzqhzmgsOLXWnlRIc9PleX06rnbJ/KITDqTLUAAAOw==');
		gif('#DESU_btnItalic', p + 'K3IKpq4YAYxRCSmUhzTfx3z3c9iEHg6JnAJYYSFpvRlXcLNUg3srBmgr+RL0MzxILsYpGzyepfEIjR43t5kResUQmtdpKOIQpQwEAOw==');
		gif('#DESU_btnUnder', p + 'V3IKpq4YAoRARzAoV3hzoDnoJNlGSWSEHw7JrEHILiVp1NlZXtKe5XiptPrFh4NVKHh9FI5NX60WIJ6ATZoVeaVnf8xSU4r7NMRYcFk6pzYRD2TIUAAA7');
		gif('#DESU_btnStrike', p + 'S3IKpq4YAoRBR0qqqnVeD7IUaKHIecjCqmgbiu3jcfCbAjOfTZ0fmVnu8YIHW6lgUDkOkCo7Z8+2AmCiVqHTSgi6pZlrN3nJQ8TISO4cdyJWhAAA7');
		gif('#DESU_btnSpoiler', 'R0lGODlhFwAWAJEAAPDw8GRkZP///wAAACH5BAEAAAIALAAAAAAXABYAQAJBlIKpq4YAmHwxwYtzVrprXk0LhBziGZiBx44hur4kTIGsZ99fSk+mjrMAd7XerEg7xnpLIVM5JMaiFxc14WBiBQUAOw==');
		gif('#DESU_btnCode', p + 'O3IKpq4YAoZgR0KpqnFxokH2iFm7eGCEHw7JrgI6L2F1YotloKek6iIvJAq+WkfgQinjKVLBS45CePSXzt6RaTjHmNjpNNm9aq6p4XBgKADs=');
		gif('#DESU_btnQuote', p + 'L3IKpq4YAYxRUSKguvRzkDkZfWFlicDCqmgYhuGjVO74zlnQlnL98uwqiHr5ODbDxHSE7Y490wxF90eUkepoysRxrMVaUJBzClaEAADs=');
	}

	// Show/close animation
	if(nav.Anim) {
		x.push(
			'@' + nav.aCFix + 'keyframes DESU_aOpen {\
				0% { ' + nav.aCFix + 'transform: translateY(-1500px); opacity: 0; }\
				40% { ' + nav.aCFix + 'transform: translateY(30px); opacity: 1; }\
				70% { ' + nav.aCFix + 'transform: translateY(-10px); }\
				100% { ' + nav.aCFix + 'transform: translateY(0); }\
			}\
			@' + nav.aCFix + 'keyframes DESU_aClose {\
				0% { ' + nav.aCFix + 'transform: translateY(0); opacity: 1; }\
				20% { ' + nav.aCFix + 'transform: translateY(20px); }\
				100% { ' + nav.aCFix + 'transform: translateY(-4000px);  opacity: 0; }\
			}\
			@' + nav.aCFix + 'keyframes DESU_cfgOpen { from { ' + nav.aCFix + 'transform: translate(0,50%) scaleY(0); opacity: 0; } to { opacity: 1; } }\
			@' + nav.aCFix + 'keyframes DESU_cfgClose { from { opacity: 1; } to { ' + nav.aCFix + 'transform: translate(0,50%) scaleY(0); opacity: 0; } }\
			@' + nav.aCFix + 'keyframes DESU_pOpenTL { from { ' + nav.aCFix + 'transform: translate(-50%,-50%) scale(0); opacity: 0; } to { opacity: 1; } }\
			@' + nav.aCFix + 'keyframes DESU_pOpenBL { from { ' + nav.aCFix + 'transform: translate(-50%,50%) scale(0); opacity: 0; } to { opacity: 1; } }\
			@' + nav.aCFix + 'keyframes DESU_pOpenTR { from { ' + nav.aCFix + 'transform: translate(50%,-50%) scale(0); opacity: 0; } to { opacity: 1; } }\
			@' + nav.aCFix + 'keyframes DESU_pOpenBR { from { ' + nav.aCFix + 'transform: translate(50%,50%) scale(0); opacity: 0; } to { opacity: 1; } }\
			@' + nav.aCFix + 'keyframes DESU_pCloseTL { from { opacity: 1; } to { ' + nav.aCFix + 'transform: translate(-50%,-50%) scale(0); opacity: 0; } }\
			@' + nav.aCFix + 'keyframes DESU_pCloseBL { from { opacity: 1; } to { ' + nav.aCFix + 'transform: translate(-50%,50%) scale(0); opacity: 0; } }\
			@' + nav.aCFix + 'keyframes DESU_pCloseTR { from { opacity: 1; } to { ' + nav.aCFix + 'transform: translate(50%,-50%) scale(0); opacity: 0; } }\
			@' + nav.aCFix + 'keyframes DESU_pCloseBR { from { opacity: 1; } to { ' + nav.aCFix + 'transform: translate(50%,50%) scale(0); opacity: 0; } }\
			.DESU_aOpen { ' + nav.aCFix + 'animation-name: DESU_aOpen; ' + nav.aCFix + 'animation-duration: 0.7s; ' + nav.aCFix + 'animation-timing-function: ease-out; }\
			.DESU_aClose { ' + nav.aCFix + 'animation-name: DESU_aClose; ' + nav.aCFix + 'animation-duration: 0.7s; ' + nav.aCFix + 'animation-timing-function: ease-in; }\
			.DESU_pView { ' + nav.aCFix + 'animation-duration: 0.2s; }\
			.DESU_pOpen { ' + nav.aCFix + 'animation-timing-function: ease-out; }\
			.DESU_pOpenTL { ' + nav.aCFix + 'animation-name: DESU_pOpenTL; }\
			.DESU_pOpenBL { ' + nav.aCFix + 'animation-name: DESU_pOpenBL; }\
			.DESU_pOpenTR { ' + nav.aCFix + 'animation-name: DESU_pOpenTR; }\
			.DESU_pOpenBR { ' + nav.aCFix + 'animation-name: DESU_pOpenBR; }\
			.DESU_pClose { ' + nav.aCFix + 'animation-timing-function: ease-in; }\
			.DESU_pCloseTL { ' + nav.aCFix + 'animation-name: DESU_pCloseTL; }\
			.DESU_pCloseBL { ' + nav.aCFix + 'animation-name: DESU_pCloseBL; }\
			.DESU_pCloseTR { ' + nav.aCFix + 'animation-name: DESU_pCloseTR; }\
			.DESU_pCloseBR { ' + nav.aCFix + 'animation-name: DESU_pCloseBR; }\
			.DESU_cfgOpen { ' + nav.aCFix + 'animation-name: DESU_cfgOpen; ' + nav.aCFix + 'animation-duration: 0.2s; ' + nav.aCFix + 'animation-timing-function: ease-out; }\
			.DESU_cfgClose { ' + nav.aCFix + 'animation-name: DESU_cfgClose; ' + nav.aCFix + 'animation-duration: 0.2s; ' + nav.aCFix + 'animation-timing-function: ease-in; }\
			.DESU_aOpened { opacity: 1 !important; }'
		);
	}

	// Embedders
	x.push(
		'.DESU_preImg, .DESU_fullImg { display: block; margin: ' + (aib.krau ? 0 : '2px 10px') + '; border: none; outline: none; cursor: pointer; }\
		.DESU_mp3, .DESU_ytObj { margin: 5px 20px; }\
		.DESU_post a + .DESU_mp3, .DESU_post a + .DESU_ytObj { display: inline; }\
		.DESU_ytLink:before { content: ""; padding: 0 16px 0 0; margin: 0 4px; background: url(http://youtube.com/favicon.ico) no-repeat; }\
		.DESU_ytObj > img { cursor: pointer; }'
	);
	if(Cfg['mask'] !== 0) {
		x.push(
			'.DESU_preImg, .DESU_ytObj, img[src*="spoiler"], img[src*="thumb"] { opacity: 0.07 !important; }\
			.DESU_preImg:hover, .DESU_ytObj:hover, img[src*="spoiler"]:hover, img[src*="thumb"]:hover { opacity: 1 !important; }'
		);
	}

	// Other
	x.push(
		'.DESU_alertWait:before, .DESU_icnWait, #DESU_updRes_check:before { content: " "; padding: 0 16px 16px 0; background: url( data:image/gif;base64,R0lGODlhEAAQALMMAKqooJGOhp2bk7e1rZ2bkre1rJCPhqqon8PBudDOxXd1bISCef///wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAMACwAAAAAEAAQAAAET5DJyYyhmAZ7sxQEs1nMsmACGJKmSaVEOLXnK1PuBADepCiMg/DQ+/2GRI8RKOxJfpTCIJNIYArS6aRajWYZCASDa41Ow+Fx2YMWOyfpTAQAIfkEBQAADAAsAAAAABAAEAAABE6QyckEoZgKe7MEQMUxhoEd6FFdQWlOqTq15SlT9VQM3rQsjMKO5/n9hANixgjc9SQ/CgKRUSgw0ynFapVmGYkEg3v1gsPibg8tfk7CnggAIfkEBQAADAAsAAAAABAAEAAABE2QycnOoZjaA/IsRWV1goCBoMiUJTW8A0XMBPZmM4Ug3hQEjN2uZygahDyP0RBMEpmTRCKzWGCkUkq1SsFOFQrG1tr9gsPc3jnco4A9EQAh+QQFAAAMACwAAAAAEAAQAAAETpDJyUqhmFqbJ0LMIA7McWDfF5LmAVApOLUvLFMmlSTdJAiM3a73+wl5HYKSEET2lBSFIhMIYKRSimFriGIZiwWD2/WCw+Jt7xxeU9qZCAAh+QQFAAAMACwAAAAAEAAQAAAETZDJyRCimFqbZ0rVxgwF9n3hSJbeSQ2rCWIkpSjddBzMfee7nQ/XCfJ+OQYAQFksMgQBxumkEKLSCfVpMDCugqyW2w18xZmuwZycdDsRACH5BAUAAAwALAAAAAAQABAAAARNkMnJUqKYWpunUtXGIAj2feFIlt5JrWybkdSydNNQMLaND7pC79YBFnY+HENHMRgyhwPGaQhQotGm00oQMLBSLYPQ9QIASrLAq5x0OxEAIfkEBQAADAAsAAAAABAAEAAABE2QycmUopham+da1cYkCfZ94UiW3kmtbJuRlGF0E4Iwto3rut6tA9wFAjiJjkIgZAYDTLNJgUIpgqyAcTgwCuACJssAdL3gpLmbpLAzEQA7) no-repeat; }\
		#DESU_alertBox { position: fixed; right: 0; top: 0; z-index: 9999; font: 14px arial; cursor: default; }\
		#DESU_alertBox > div { float: right; clear: both; width: auto; min-width: 0pt; padding: 10px; margin: 1px; border: 1px solid grey; white-space: pre-wrap; }\
		#DESU_cfgEdit, #DESU_favEdit, #DESU_hidTEdit, #DESU_spellEdit { display: block; margin: 2px 0; font: 12px courier new; }\
		.DESU_content { ' + (Cfg['attach'] === 0 ? 'width: 100%;' : 'position: fixed; right: 0; bottom: 25px; z-index: 9999; max-height: 95%; overflow: auto;') + ' text-align: left; }\
		.DESU_content > table { ' + (Cfg['attach'] === 0 ? 'margin: 5px 20px; font-size: 16px;' : 'padding: 5px 10px; border: 1px solid grey; font-size: 16px;') + ' }\
		.DESU_favData .DESU_thread { padding-left: 15px; border: 1px solid grey; }\
		.DESU_favData a, .DESU_hidTData a { text-decoration: none; }\
		.DESU_favHead a { color: inherit; font-weight: bold; }\
		.DESU_favPCount { float: right; margin: 0 5px 0 15px; font: bold 16px serif; }\
		.DESU_favPCount span { color: #4f7942; }\
		#DESU_iframe { display: none; width: 0px; height: 0px; border: none; }\
		.DESU_omitted { color: grey; font-style: italic; }\
		.DESU_postNote { color: inherit; font-size: 12px; font-style: italic; }\
		#DESU_qarea { float: none; clear: left; width: 100%; padding: 3px 0 3px 3px; margin: 2px 0; }\
		.DESU_refHid { text-decoration: line-through !important; }\
		.DESU_refMap { margin: 10px 4px 4px 4px; font-size: 70%; font-style: italic; }\
		.DESU_refMap:before { content: "' + Lng.replies[lCode] + ' "; }\
		.DESU_refMap a { text-decoration: none; }\
		#DESU_sageBtn { cursor: pointer; }\
		#DESU_select { padding: 0 !important; margin: 0 !important; }\
		#DESU_select a { display: block; padding: 3px 10px; color: inherit; text-decoration: none; font: 13px arial; white-space: nowrap; }\
		#DESU_select a:hover { background-color: ' + (Cfg['sstyle'] === 0 ? '#1b345e' : '#444') + '; color: #fff; }\
		.DESU_selected { ' + (nav.Opera ? 'border-left: 4px solid red; border-right: 4px solid red; }' : nav.cFix + 'box-shadow: 6px 0 2px -2px red, -6px 0 2px -2px red; }') + '\
		#DESU_txtResizer { display: inline-block !important; float: none !important; padding: 5px; margin: 0 0 -' + (nav.Opera ? 8 : nav.Chrome ? 2 : 3) + 'px -12px; border-bottom: 2px solid #555; border-right: 2px solid #444; cursor: se-resize; }\
		.DESU_viewed, .DESU_viewed .reply { color: #888 !important; }\
		.reply { width: auto; }\
		a[href="#"] { text-decoration: none !important; outline: none; }\
		.DESU_pPost { font-weight: bold; }\
		.DESU_info { padding: 3px 6px !important; }\
		.DESU_pView { position: absolute; width: auto; min-width: 0; z-index: 9999; opacity: 0; border: 1px solid grey; }\
		small[id^="rfmap"] { display: none !important; }'
	);
	if(Cfg['delhd'] === 2) {
		x.push('div[id^=DESU_hidThr_], div[id^=DESU_hidThr_] + div + br, div[id^=DESU_hidThr_] + div + br + hr { display: none; }');
	}
	if(Cfg['noname'] !== 0) {
		x.push('.commentpostername, .postername, .postertrip { display: none; }');
	}
	if(Cfg['ospoil'] !== 0) {
		x.push('.spoiler { background: #888 !important; color: #ccc !important; }');
	}
	if(Cfg['noscrl'] !== 0) {
		x.push('blockquote { max-height: 100% !important; overflow: visible !important; }');
	}
	if(Cfg['norule'] !== 0) {
		x.push((aib.gazo ? '.chui' : '.rules, #rules, #rules_row') + ' { display: none; }');
	}
	if(aib.kus) {
		x.push(
			'.extrabtns, .ui-resizable-handle, .DESU_oppost > a[onclick]:not([target]) { display: none !important; }\
			.ui-wrapper { display: inline-block; width: auto !important; height: auto !important; padding: 0 !important; }'
		);
	}
	if(aib.hana) {
		x.push(
			'#hideinfotd, .reply_, .delete > img { display: none; }\
			.delete_checkbox { position: static !important; }'
		);
	}
	if(aib.abu) {
		x.push(
			'.ABU_refmap, .postpanel, .highslide, a[onclick^="window.open"]' +
				(Cfg['ytube'] === 0 ? '' : ', div[id^="post_video"]') + ' { display: none !important; }\
			a[id^="DESU_"] { -moz-transition: none; -o-transition: none; -webkit-transition: none; transition: none; }'
		);
	}
	if(aib.tiny) {
		x.push('form, form table { margin: 0; }');
	}
	if(aib.nul) {
		x.push(
			'#newposts_get, #postform nobr, .replieslist, .DESU_thread span[style="float: right;"] { display: none !important; }\
			.voiceplay { float: none; }'
		);
	}
	if(aib._7ch) {
		x.push('.reply { background-color: ' + getStyle(doc.body, 'background-color') + '; }');
	}
	if(aib.gazo) {
		x.push(
			'.DESU_content, #DESU_cfgBody { font-family: arial; }\
			.ftbl { width: auto; margin: 0; }\
			.reply { background: #f0e0d6; }'
		);
	}
	if(aib.krau) {
		x.push(
			'img[id^="translate_button"]' + (liteMode ? ', div[id^="disclaimer"]' : '') + ' { display: none !important; }\
			div[id^="Wz"] { z-index: 10000 !important; }\
			div[id^="DESU_hidThr_"] { margin-bottom: ' + (!TNum ? '7' : '2') + 'px; }\
			.file_reply + .DESU_ytObj { float: left; margin: 5px 20px 5px 5px; }\
			.DESU_ytObj + div:not(.file_reply) { clear: both; }'
		);
	}
	if(aib._420) {
		x.push(
			'.opqrbtn, .qrbtn, .ignorebtn, .hidethread, noscript { display: none; }\
			div[id^="DESU_hidThr_"] { margin: 1em 0; }'
		);
	}
	if(aib.brit) {
		x.push(
			'.DESU_postPanel, .DESU_postPanel_op { float: left; margin-top: 0.4em; }\
			.postthreadlinks, .pagethreadlinks, .pwpostblock { display: none; }\
			.DESU_btnSrc { padding: 0px 10px 10px 0px !important; ' + nav.cFix + 'background-size: cover; }'
		);
	}
	if(aib.ylil) {
		x.push('.threadbuttons, .expandall { display: none; }');
	}

	if(!$id('DESU_css')) {
		doc.head.appendChild($new('style', {
			'id': 'DESU_css',
			'type': 'text/css',
			'text': x.join(' ')
		}, null));
		if(nav.Chrome) {
			$disp(dForm);
		}
	} else {
		$id('DESU_css').textContent = x.join(' ');
	}
}


/*==============================================================================
									SCRIPT UPDATING
==============================================================================*/

function checkForUpdates(force, fn) {
	var t = +(new Date()).getTime(),
		day = 2*1000*60*60*24,
		updInt =
			Cfg['supdint'] === 0 ? 0 
			: Cfg['supdint'] === 1 ? day
			: Cfg['supdint'] === 2 ? day*2
			: Cfg['supdint'] === 3 ? day*7
			: Cfg['supdint'] === 4 ? day*14
			: Cfg['supdint'] === 5 && day*30;
	if(!force && t - +Cfg['lupdchk'] < updInt) {
		return;
	}
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/' 
			+ (Cfg['betaupd'] ? 'master' : 'stable') + '/Dollchan_Extension_Tools.meta.js',
		headers: {
			'Content-Type': 'text/plain'
		},
		onreadystatechange: function(xhr) {
			if(xhr.readyState !== 4) {
				return;
			}
			if(xhr.status === 200) {
				var dVer = xhr.responseText.match(/@version\s+([0-9.]+)/)[1].split('.'),
					cVer = Cfg['version'].split('.'),
					len = cVer.length > dVer.length ? cVer.length : dVer.length,
					i = 0,
					upd = false;
				if(!dVer) {
					if(force) {
						fn('<div style="color: red; font-weigth: bold;">' + Lng.noConnect[lCode] + '</div>');
					}
					return;
				}
				Cfg['lupdchk'] = t;
				while(i < len) {
					if((+dVer[i] || 0) > (+cVer[i] || 0)) {
						upd = true;
						break;
					} else if((+dVer[i] || 0) < (+cVer[i] || 0)) {
						break;
					}
					i++;
				}
				if(upd) {
					fn('<a style="color: blue; font-weight: bold;" href="' + (
						Cfg['betaupd']
							? 'https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/'
								+ 'master/Dollchan_Extension_Tools.user.js'
							: 'https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/Versions'
					)+ '">' + Lng.upd.available[lCode] + '</a>');
				} else if(force) {
					fn(Lng.upd.haveLatest[lCode]);
				}
			} else if(force) {
				fn('<div style="color: red; font-weigth: bold;">' + Lng.noConnect[lCode] + '</div>');
			}
		}
	});
}


/*==============================================================================
									INITIALIZATION
==============================================================================*/

function isCompatible() {
	if(/^(?:about|chrome|opera|res)/i.test(window.location)) {
		return false;
	}
	aib = getImageboard(window.location.hostname, doc);
	if(/DESU_iframe/.test(window.name)) {
		fixDomain();
		return false;
	}
	if(/DESU_favIframe/.test(window.name)) {
		liteMode = true;
		$event(window, {
			'load': function(e) {
				window.top.postMessage('' + (document.body.offsetHeight + 20), '*');
			}
		});
	}
	if(aib.hana && window.location.pathname === '/settings') {
		setHanaRating();
		return false;
	}
	if(!dForm || $id('DESU_panel')) {
		return false;
	}
	return true;
}

function fixDomain() {
	try {
		doc.domain = aib.dm;
	} catch(e) {
		aib.dm = doc.domain;
	}
}

function getNavigator() {
	var gs, ss, ls, se,
		ua = window.navigator.userAgent;
	nav = {
		Firefox: +(ua.match(/mozilla.*? rv:(\d+)/i) || [0, 0])[1],
		Opera: +(ua.match(/opera(?:.*version)?[ \/]([\d.]+)/i) || [0, 0])[1],
		Chrome: /chrome/i.test(ua)
	};
	gs = nav.Firefox && typeof GM_setValue === 'function';
	ss = nav.Opera && !!scriptStorage;
	ls = 'localStorage' in window && typeof localStorage === 'object';
	se = 'sessionStorage' in window && (sessionStorage.test = 1) === 1;
	sav = {
		GM: !!gs,
		script: ss,
		local: ls,
		cookie: !ls && !ss && !gs,
		session: se,
		isGlobal: gs || ss
	};
	nav.cFix =
		(nav.Firefox && nav.Firefox < 4) ? '-moz-'
		: nav.Chrome ? '-webkit-'
		: '';
	if(nav.Firefox > 4 || nav.Chrome || nav.Opera >= 12) {
		nav.Anim = true;
		nav.aCFix =
			nav.Firefox ? '-moz-'
			: nav.Chrome ? '-webkit-'
			: nav.Opera ? '-o-'
			: '';
		nav.aEvent =
			(nav.Firefox || nav.Opera) ? 'animationend'
			: nav.Chrome ? 'webkitAnimationEnd'
			: '';
	}
	nav.h5Rep = nav.Firefox > 6 || nav.Chrome;
}

function getPage() {
	var url = (window.location.pathname || '');
	if(aib.ylil) {
		url = url.match(/^\/?(.*?)\/(\d+)?$/);
		brd = url[1].split('-')[0];
		res = '';
		TNum = url[2];
		pageNum = +url[1].split('-')[1] || 1;
		docExt = '';
	} else {
		url = url.match(/^(?:\/?(.*?)\/?)?(res\/|thread-)?(\d+|index|wakaba)?(\.(?:[xme]*html?|php))?$/);
		brd = url[1] || (aib.dfwk ? 'df' : '');
		res = aib.krau ? 'thread-' : 'res/';
		TNum = url[2] ? url[3] : false;
		pageNum = url[3] && !TNum ? +url[3] || 0 : 0;
		docExt = url[4] || (
			aib.gazo ? '.htm'
			: aib._420 ? '.php'
			: '.html'
		);
	}
	favIcon = ($x('.//head//link[@rel="shortcut icon"]', doc) || {}).href;
}

function fixBrd(b) {
	return '/' + (b === '' ? '' : b + '/');
}

function getThrdUrl(h, b, tNum) {
	return 'http://' + h + fixBrd(b)
		+ (
			(h.indexOf('krautchan.net') + 1) ? 'thread-'
			: (h.indexOf('ylilauta.fi') + 1) ? ''
			: 'res/'
		) + tNum + (
			(h.indexOf('dobrochan.') + 1) ? '.xhtml'
			: (h.indexOf('2chan.net') + 1) ? '.htm'
			: (h.indexOf('420chan.org') + 1) ? '.php'
			: (h.indexOf('ylilauta.fi') + 1) ? ''
			: '.html'
		);
}

function getPageUrl(p) {
	return aib.ylil
		? ('/' + brd + (p === 1 ? '/' : '-' + p))
		: (fixBrd(brd) + (
			p > 0 ? (p + docExt)
			: aib.hana ? ('index' + docExt)
			: ''
		));
}

function getPostform(form) {
	var obj = {},
		tr = aib._7ch ? 'li' : 'tr',
		pre = './/' + tr + '[not(contains(@style,"none"))]//input[not(@type="hidden") and ';
	if(!form) {
		return obj;
	}
	obj.on = true;
	obj.isQuick = false;
	obj.tNum = TNum;
	obj.form = form;
	obj.tr = 'ancestor::' + tr + '[1]';
	obj.recap = $x('.//input[@id="recaptcha_response_field"]', form);
	if(!aib.ylil) {
		obj.cap = $x('.//input[contains(@name,"aptcha") and not(@name="recaptcha_challenge_field")]', form) || obj.recap;
	}
	obj.txta = $x('.//' + tr + '[not(contains(@style,"none"))]//textarea[not(contains(@style,"none"))]', form);
	obj.subm = $x('.//' + tr + '//input[@type="submit"]', form);
	obj.file = $x('.//' + tr + '//input[@type="file"]', form);
	obj.passw = $x('.//' + tr + '//input[@type="password"]', form);
	obj.gothr = $x('.//tr[@id="trgetback"]|.//input[@type="radio" or @name="gotothread"]/ancestor::tr[1]', form);
	obj.name = $x(pre + '(@name="field1" or @name="name" or @name="internal_n" or @name="nya1" or @name="akane")]', form);
	obj.mail = $x(pre + (
		aib._410 ? '@name="sage"]'
		: aib.futr ? '@name="denshimeru"]'
		: '(@name="field2" or @name="em" or @name="sage" '
			+ 'or @name="email" or @name="nabiki" or @name="dont_bump")]'
	), form);
	obj.video = $x('.//' + tr + '//input[@name="video" or @name="embed"]', form);
	return obj;
}

function getImageboard(host, dc) {
	var obj = {},
		h = host.match(/(?:(?:[^.]+\.)(?=org\.|net\.|com\.))?[^.]+\.[^.]+$|^\d+\.\d+\.\d+\.\d+$|localhost/)[0];
	obj.dm = h;
	obj.hana = $$xb('.//script[contains(@src,"hanabira")]', dc, dc);
	obj.tiny = $$xb('.//form[@name="postcontrols"]', dc, dc);
	obj.krau = h === 'krautchan.net';
	obj.gazo = h === '2chan.net';
	obj.brit = h === 'britfa.gs';
	obj.ylil = h === 'ylilauta.fi';
	obj.xDForm = obj.brit ? './/div[@class="threadz"]' : './/form[' + (
		obj.hana || obj.krau || obj.ylil ? 'contains(@action,"delete")]'
		: obj.tiny ? '@name="postcontrols"]'
		: obj.gazo ? '2]'
		: '@id="delform" or @name="delform"]'
	);
	dForm = $x(obj.xDForm, doc);
	if(dc === doc && !dForm) {
		return obj;
	}
	obj.host = host;
	obj.waka = $$xb('.//script[contains(@src,"wakaba")]|.//form[contains(@action,"wakaba.pl")]', dc, dc);
	obj.tinyIb = $$xb('.//form[contains(@action,"imgboard.php?delete")]', dc, dc);
	obj.kus = $$xb('.//script[contains(@src,"kusaba")]', dc, dc);
	obj.abu = $$xb('.//script[contains(@src,"wakaba_new.js")]', dc, dc);
	obj.fch = h === '4chan.org';
	obj.nul = h === '0chan.ru';
	obj._7ch = h === '7chan.org';
	obj._410 = h === '410chan.ru';
	obj.hid = h === 'hiddenchan.i2p';
	obj.tire = h === '2--ch.ru';
	obj.dfwk = h === 'dfwk.ru';
	obj.pony = h === 'ponychan.net';
	obj.vomb = h === 'vombatov.net';
	obj.ment = h === '02ch.net';
	obj.futr = h === '2chan.su';
	obj._420 = h === '420chan.org';
	obj.pClass =
		obj.krau ? 'postreply'
		: obj.ylil ? 'answer'
		: obj.tiny || obj.fch ? 'post reply'
		: 'reply';
	obj.opClass =
		obj.kus ? 'postnode'
		: obj.brit ? 'originalpost'
		: obj.fch ? 'post op'
		: 'oppost';
	obj.tClass = obj.krau ? 'thread_body' : 'thread';
	obj.xThreads = './/div[' + (
		$$xb('.//div[contains(@id,"_info") and contains(@style,"float")]', dc, dc)
			? 'starts-with(@id,"t") and not(contains(@id,"_info"))'
		: obj._420 ? 'contains(@id,"thread")'
		: 'starts-with(@id,"thread")' + (obj._7ch ? 'and not(@id="thread_controls")' : '')
	) + ']';
	obj.xTNum =
		obj.gazo || obj.tiny ? './/input[@type="checkbox"]'
		: (obj.waka && !obj.abu) || obj.brit || obj.tinyIb ? './/a[@name]'
		: obj.kus && !obj._7ch ? 'a[@name][2]'
		: false;
	obj.xRef = obj.tiny ? './/p[@class="intro"]/a[@class="post_no"][2]' : false;
	obj.cRef =
		obj.krau || obj.ylil ? 'postnumber'
		: obj.gazo ? 'del'
		: 'reflink';
	obj.xMsg =
		obj.hana ? './/div[@class="postbody"]'
		: obj.ylil ? './/div[@class="post"]'
		: obj.tiny ? './/p[@class="body"]'
		: obj._7ch ? './/p[@class="message"]'
		: './/blockquote';
	obj.cMsg =
		obj.hana ? 'postbody'
		: obj.ylil ? 'post'
		: obj.tiny ? 'body'
		: obj._7ch ? 'message'
		: false;
	obj.xImages = obj.brit ? './/a[@class="fileinfo"]' : (
		obj.gazo ? '.'
		: obj.tiny || obj.ylil ? './/p[@class="fileinfo"]'
		: obj.hana ? './/div[starts-with(@class,"fileinfo")]'
		: './/span[@class="' + (obj.krau ? 'filename' : obj.fch ? 'fileText' : 'filesize') + '"]'
	) + '//a[contains(@href,".jpg") or contains(@href,".png") or contains(@href,".gif")]'
		+ (obj.nul ? '[1]' : '');
	obj.cTitle =
		obj.krau || obj.ylil ? 'postsubject'
		: obj.tiny || obj.fch ? 'subject'
		: obj.hana ? 'replytitle'
		: 'filetitle';
	obj.cOmPosts =
		obj.krau ? 'omittedinfo'
		: obj.ylil ? 'omitted'
		: obj.hana ? 'abbrev'
		: obj.fch ? 'summary desktop'
		: 'omittedposts';
	obj.xBan =
		obj.krau ? './/span[@class="ban_mark"]/ancestor::p'
		: obj.fch ? './/strong[@style="color: red;"]'
		: false;
	obj.getMsg = obj.cMsg
		? function(el) {
			return $c(obj.cMsg, el);
		}
		: function(el) {
			return $t('blockquote', el);
		};
	obj.getRef =
		obj.xRef ? function(el) {
			return $x(obj.xRef, el);
		}
		: obj.fch ? function(el) {
			return $c('postInfo', el).lastElementChild;
		}
		: function(el) {
			return $c(obj.cRef, el);
		};
	obj.getOp =
		(obj.abu || obj.hana || obj.kus) && $c(obj.opClass, doc) ? function(thr, dc) {
			return $c(obj.opClass, thr);
		}
		: obj.fch ? function(thr, dc) {
			return $c('opContainer', thr);
		}
		: obj.ylil ? function(thr, dc) {
			return thr.firstElementChild;
		}
		: obj.brit ? function(thr, dc) {
			var el,
				post = $new('br', null, null),
				op = $c(obj.opClass, thr);
			$before($t('blockquote', op), [$new('div', null, null), post]);
			while((el = thr.firstChild).tagName !== 'TABLE') {
				$after(post, el);
				post = el;
			}
			el = $new('div', null, null);
			$before(thr.firstChild, [el]);
			$each($$X('node()', op, dc), function(e) {
				el.appendChild(e);
			});
			$del($t('table', thr));
			return el;
		}
		: function(thr, dc) {
			var i,
				op = $$new('div', null, null, dc),
				opEnd = $$x(obj.xTable + '|div[starts-with(@id,"repl")]', thr, dc);
			while((i = thr.firstChild) !== opEnd) {
				op.appendChild(i);
			}
			if(thr.childElementCount) {
				$before(thr.firstChild, [op]);
			} else {
				thr.appendChild(op);
			}
			return op;
		};
	obj.getTNum =
		obj.xTNum ? function(op, dc) {
			return $$x(obj.xTNum, op, dc).name.match(/\d+/)[0];
		}
		: obj.krau ? function(op, dc) {
			return op.parentNode.previousElementSibling.name;
		}
		: function(op, dc) {
			return op.parentNode.id.match('\\d+' + (obj._420 ? '$' : ''))[0];
		};
	obj.getPNum = obj.gazo
		? function(post) {
			return $t('input', post).name;
		}
		: function(post) {
			return post.id.match(/\d+/)[0];
		};
	obj.getOmPosts = obj.gazo
		? function(el, dc) {
			return $$x('.//font[@color="#707070"]', el, dc);
		}
		: function(el) {
			return $c(obj.cOmPosts, el);
		};
	obj.getSage =
		obj.krau ? function(post) {
			return !!$c('sage', post);
		}
		: obj._410 ? function(post) {
			return $xb('.//span[@class="filetitle" and contains(text(),"' + unescape('%u21E9') + '")]', post);
		}
		: function(post) {
			var a = $x('.//a[starts-with(@href,"mailto:") or @href="sage"]', post);
			return a && /sage/i.test(a.href);
		}
	obj.getImgInfo = obj.fch
		? function(post) {
			return $c('fileText', post);
		}
		: function (post) {
			return $t('em', post) || $c('filesize', post) || $c('fileinfo', post);
		}
	return obj;
}

function pushPost(post, i) {
	Posts.push(post);
	post.isOp = i === 0;
	post.Count = i;
	post.Msg = aib.getMsg(post);
	post.Text = getText(post.Msg);
	post.Img = getImages(post);
	pByNum[post.Num] = post;
	if(i === 0) {
		tByCnt.push(post);
	}
}

function processPost(post, thr, pFn, i) {
	post.thr = thr;
	post.className += ' DESU_post';
	post.Num = aib.getPNum(post);
	pFn(post, i + 1);
}

function parseThread(node, dc, fn) {
	var el, tEl,
		pThr = false,
		threads = node.getElementsByClassName(aib.tClass);
	if(threads.length === 0) {
		threads = $$X(aib.xThreads, node, dc);
		if(threads.snapshotLength !== 0) {
			$each(threads, fn);
		} else {
			el = $t('hr', node).parentNode.firstChild;
			while(1) {
				threads = $$new('div', null, null, dc);
				while(el && (tEl = el.nextSibling) && tEl.tagName !== 'HR') {
					threads.appendChild(el);
					el = tEl;
				}
				if(pThr) {
					$after(pThr, threads);
				} else {
					$before(node.firstChild, [threads]);
				}
				if(!el || !tEl) {
					return;
				}
				if(threads.childElementCount) {
					fn(threads);
				}
				pThr = tEl;
				el = tEl.nextSibling;
			}
		}
	} else {
		for(el = 0, tEl = threads.length; el < tEl; el++) {
			fn(threads[el]);
		}
	}
}

function parseDelform(node, dc, pFn) {
	var el;
	$$Del('.//script', node, dc);
	if(aib.ylil) {
		$$Del('.//a[@data-embedcode]', node, dc);
		$each($$X('.//div[@class="postinfo"]', node, dc), function(el) {
			if(el.previousElementSibling) {
				$before(el.parentNode.firstChild, [el]);
			}
		});
	}
	if(Posts.length < 2) {
		aib.xPost = aib.fch
			? 'div[2]'
			: './/td' + (aib.gazo ? '[2]' : '[contains(@class,"' + aib.pClass + '")]');
		aib.xTable = $t('table', node)
			? (aib.tire ? 'table[not(@class="postfiles")]' : 'table')
			: false;
		aib.xWrap = aib.xTable
			? './/table/tbody/tr/td' + (aib.gazo ? '[2]' : '[contains(@class,"' + aib.pClass + '")]')
			: './/div[contains(@class,"' + aib.pClass + '")]';
		aib.getWrap =
			aib.xTable ? function(post) { return $x('ancestor::table[1]', post) || post; }
			: aib.fch ? function(post) { return post.parentNode; }
			: function(post) { return post; };
		if(aib.xTable || aib.fch) {
			postWrapper = $$x(
				aib.brit ? './/div[starts-with(@id,"replies")]/table'
				: aib.fch ? './/div[@class="postContainer replyContainer"]'
				: './/' + aib.xTable, node, dc);
			if(dc !== doc && postWrapper) {
				postWrapper = doc.importNode(postWrapper, true);
			}
		}
	}
	parseThread(node, dc, function(thr) {
		var op, i, len, psts;
		if(aib._420 || (aib.tiny && !TNum)) {
			$after(thr, thr.lastChild);
		}
		op = aib.getOp(thr, dc);
		thr.className += ' DESU_thread';
		op.className += ' DESU_oppost';
		op.Num = thr.Num = aib.getTNum(op, dc);
		op.thr = thr;
		pFn(op, 0);
		if(!nav.Firefox || aib.gazo) {
			thr.pCount = 0;
			$each($$X(aib.xWrap, thr, dc), function(el) {
				processPost(el, thr, pFn, thr.pCount++);
			});
		} else {
			psts = thr.getElementsByClassName(aib.pClass);
			thr.pCount = psts.length;
			for(i = 0, len = psts.length; i < len; i++) {
				processPost(psts[i], thr, pFn, i);
			}
		}
		if(dc === doc) {
			if(!TNum) {
				thr.pCount += (i = aib.getOmPosts(thr, dc)) && (i = i.textContent)
					? +(i.match(/\d+/) || [0])[0]
					: 0;
			}
			thr.dTitle = ((i = $c(aib.cTitle, op)) && i.textContent.trim() || op.Text)
				.substring(0, 70).replace(/\s+/g, ' ').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		}
	});
	el = pByNum[window.location.hash.substring(1)];
	if(window.location.hash && el) {
		$event(window, {
			'load': function() {
				setTimeout(function() {
					el.className += ' DESU_post';
				}, 1e3);
			}
		});
	}
	if(liteMode) {
		$$Del('preceding-sibling::node()|following-sibling::node()', dForm, dc);
	}
	return node;
}

function tryToParse() {
	dForm.id = '';
	$disp(dForm);
	try {
		parseDelform(dForm, doc, pushPost);
	} catch(e) {
		$disp(dForm);
		return false;
	}
	if(!nav.Chrome) {
		$disp(dForm);
	}
	return true;
}

function replaceDelform(el) {
	var txt;
	if(aib.fch || aib.krau || Cfg['ctime'] && timeRegex || Cfg['spells'] !== 0 && oSpells.rep[0]) {
		txt = el.innerHTML;
		if(Cfg['ctime'] && timeRegex) {
			txt = fixTime(txt);
		}
		if(aib.fch || aib.krau) {
			txt = txt.replace(/(^|>|\s|&gt;)(https*:\/\/.*?)(?=$|<|\s)/ig, '$1<a href="$2">$2</a>');
		}
		if(Cfg['spells'] !== 0 && oSpells.rep[0]) {
			txt = doReplace(oSpells.rep, txt);
		}
		el.innerHTML = txt;
	}
}

function preparePage() {
	var el;
	pr = getPostform($x('.//textarea/ancestor::form[1]', doc));
	oeForm = $x('.//form[contains(@action,"paint") or @name="oeform"]', doc);
	if(!pr.mail) {
		aib.getSage = function(post) {
			return false;
		}
	}
	$Del('preceding-sibling::node()[preceding-sibling::*[descendant-or-self::*[' + (
		aib.abu ? 'self::form' 
		: aib.fch ? 'self::div[@class="boardBanner"]'
		: 'self::div[@class="logo"]'
	) + ' or self::h1]]]', dForm);
	if(aib.krau) {
		$del($t('hr', dForm));
		$del($t('hr', dForm.previousElementSibling));
	}
	pPanel = $New('span', {'class': 'DESU_postPanel'}, [
		$new('a', {
			'class': 'DESU_btnHide',
			'href': '#'
		}, null),
		$if(pr.on || oeForm, $new('a', {
			'class': 'DESU_btnRep',
			'href': '#'
		}, null))
	]);
	opPanel = pPanel.cloneNode(true);
	opPanel.className += '_op';
	$append(opPanel, [
		$if(!TNum, $new('a', {
			'class': 'DESU_btnExpthr',
			'href': '#'
		}, null)),
		$new('a', {
			'class': 'DESU_btnFav',
			'href': '#'
		}, null)
	]);
	if(TNum) {
		if(Cfg['rtitle'] === 0) {
			docTitle = doc.title;
		} else {
			docTitle = '/' + brd + ' - ' + pByNum[TNum].thr.dTitle;
			doc.title = docTitle;
		}
		window.onblur = function() {
			doc.body.className = 'blurred';
		};
		window.onfocus = function() {
			doc.body.className = 'focused';
			if(Cfg['updfav'] !== 0 && favIcon) {
				clearInterval(favIconTimeout);
				$Del('.//link[@rel="shortcut icon"]', doc.head);
				doc.head.appendChild($new('link', {
					'href': favIcon,
					'rel': 'shortcut icon'
				}, null));
			}
			if(Cfg['updthr'] === 1) {
				setTimeout(function() {
					doc.title = docTitle;
				}, 0);
			}
		};
	} else {
		setTimeout(function() {
			window.scrollTo(0, 0);
		}, 50);
	}
	if(aib.abu) {
		el = $c('DESU_thread', dForm);
		if(TNum && el) {
			$Del('following-sibling::node()', el);
			$after(el, $new('hr', null, null));
		}
		$del($x('.//input[@name="makewatermark"]', pr.form));
		if(!TNum) {
			$del(dForm.nextElementSibling);
			$del(dForm.nextElementSibling);
		}
	} else if(aib.brit) {
		$each($X('.//span[@class="reflink"]', dForm), function(el) {
			var a = el.firstChild;
			$rattr(a, 'onclick');
			a.href = getThrdUrl(aib.host, brd, a.textContent);
			a.target = '_blank';
		});
	} else if(aib.ylil) {
		el = $t('iframe', dForm);
		if(el) {
			$del(el.nextElementSibling);
			$del(el.nextElementSibling);
			$del(el);
		}
	}
	if(TNum) {
		initThreadsUpdater();
		if(Cfg['updthr'] === 2 || Cfg['updthr'] === 3) {
			$after($x('.//div[contains(@class," DESU_thread")]', doc), $event($add(
				'<span id="DESU_getNewPosts">[<a href="#">' + Lng.getNewPosts[lCode] + '</a>]</span>'
			), {
				'click': function(e) {
					$pd(e);
					doc.title = docTitle;
					clearInterval(favIconTimeout);
					loadNewPosts(true, null);
				}
			}));
		}
	}
	if(Cfg['enupd'] !== 0) {
		checkForUpdates(false, function(html) {
			$alert(html, '');
		});
	}
}


/*==============================================================================
										MAIN
==============================================================================*/

function doScript() {
	var initTime = (new Date()).getTime();
	oldTime = initTime;
	if(!isCompatible()) {
		return;
	}
	dummy = $new('div', null, null);
	fixDomain();
	fixFunctions();
	getNavigator();
	getPage();
	Log('initBoard');
	readCfg();
	Log('readCfg');
	replaceDelform(dForm);
	Log('replaceDelform');
	if(!tryToParse()) {
		return;
	}
	Log('parseDelform');
	if(Cfg['keynav'] !== 0) {
		initKeyNavig();
		Log('initKeyNavig');
	}
	preparePage();
	Log('preparePage');
	if(!liteMode) {
		addPanel();
		Log('addPanel');
		readFavorites();
		Log('readFavorites');
	}
	initPostform();
	Log('initPostform');
	forEachPost(addPostButtons);
	Log('addPostButtons');
	readPostsVisib();
	if(Cfg['navmrk'] !== 0) {
		readViewedPosts();
	}
	Log('readPosts');
	forEachPost(doPostFilters);
	Log('doPostFilters');
	if(Cfg['delhd'] === 1) {
		forEachPost(mergeHidden);
		Log('mergeHidden');
	}
	if(Cfg['expimg'] !== 0) {
		forEachPost(eventPostImg);
		Log('eventPostImg');
	}
	if(Cfg['expost'] !== 0 && !TNum) {
		forEachPost(expandPost);
		Log('expandPost');
	}
	if(Cfg['mp3'] !== 0) {
		addLinkMP3(null);
		Log('addLinkMP3');
	}
	if(Cfg['ytube'] !== 0) {
		addLinkTube(null);
		Log('addLinkTube');
	}
	if(Cfg['addimg'] !== 0) {
		addLinkImg(dForm, true);
		Log('addLinkImg');
	}
	if(Cfg['pimgs'] !== 0) {
		preloadImages(dForm);
		Log('preloadImages');
	}
	if(Cfg['imgsrc'] !== 0) {
		addImgSearch(dForm);
		Log('addImgSearch');
	}
	if(Cfg['navig'] === 2) {
		addRefMap(null, false);
		Log('addRefMap');
	}
	if(Cfg['navig'] !== 0) {
		eventRefLink(dForm);
		Log('eventRefLink');
	}
	saveHiddenPosts();
	Log('saveHiddenPosts');
	scriptCSS();
	Log('scriptCSS');
	endTime = (new Date()).getTime() - initTime;
}

if(window.opera) $event(doc, {'DOMContentLoaded': doScript});
else doScript();
})(window.opera ? window.opera.scriptStorage : null);
