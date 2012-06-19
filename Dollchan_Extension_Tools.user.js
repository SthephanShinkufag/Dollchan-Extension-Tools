// ==UserScript==
// @name			Dollchan Extension Tools
// @version			12.6.17.1
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
	'version':	'12.6.17.1',
	'language':		0,		// script language [0=ru, 1=en]
	'hideBySpell':	0,		// hide posts by spells
	'hideByWipe':	1,		// antiwipe detectors:
	'wipeSameLin':	1,		//		same lines
	'wipeSameWrd':	1,		//		same words
	'wipeLongWrd':	1,		//		long words
	'wipeSpecial':	0,		//		special symbols
	'wipeCAPS':		0,		//		cAsE, CAPS
	'wipeNumbers':	1,		//		numbers
	'filterThrds':	1,		// apply filters to threads
	'menuHiddBtn':	1,		// menu on hide button
	'viewHiddNum':	1,		// view hidden on postnumber
	'delHiddPost':	0,		// delete hidden posts [0=off, 1=merge, 2=full hide]
	'updThread':	1,		// update threads [0=off, 1=auto, 2=click+count, 3=click]
	'updThrIntrv':	2,		//		threads update interval
	'favIcoBlink':	1,		//		favicon blinking, if new posts detected
	'desktNotif':	0,		//		desktop notifications, if new posts detected
	'expandPosts':	2,		// expand shorted posts [0=off, 1=auto, 2=on click]
	'expandImgs':	2,		// expand images by click [0=off, 1=in post, 2=by center]
	'maskImgs':		0,		// mask images
	'preLoadImgs':	0,		// pre-load images
	'findRarJPEG':	0,		// detect rarJPEGs in images
	'postBtnsTxt':	0,		// show post buttons as text
	'imgSrcBtns':	1,		// add image search buttons
	'noSpoilers':	1,		// open spoilers
	'noPostNames':	0,		// hide post names
	'noPostScrl':	1,		// no scroll in posts
	'keybNavig':	0,		// keyboard navigation
	'correctTime':	0,		// correct time in posts
	'timeOffset':	'-2',	//		offset in hours
	'timePattern':	'',		//		replace pattern
	'linksNavig':	2,		// navigation by >>links [0=off, 1=no map, 2=+refmap]
	'linksOver':	'100',	//		delay appearance in ms
	'linksOut':		'1500',	//		delay disappearance in ms
	'markViewed':	0,		//		mark viewed posts
	'strikeHidd':	0,		//		strike >>links to hidden posts
	'noNavigHidd':	0,		//		don't show previews for hidden posts
	'insertNum':	1,		// insert >>link on postnumber click
	'addMP3':		1,		// mp3 player by links
	'addImgs':		1,		// add images by links
	'addYouTube':	3,		// YouTube links embedder [0=off, 1=onclick, 2=player, 3=preview+player, 4=only preview]
	'YTubeType':	0,		//		player type [0=flash, 1=HTML5 <iframe>, 2=HTML5 <video>]
	'YTubeWidth':	360,	//		player width
	'YTubeHeigh':	270,	//		player height
	'YTubeHD':		0,		//		hd video quality
	'YTubeTitles':	0,		//		convert links to titles
	'addPostForm':	2,		// postform displayed [0=at top, 1=at bottom, 2=hidden]
	'noThrdForm':	1,		// hide thread-creating form
	'favOnReply':	1,		// add thread to favorites on reply
	'checkReply':	1,		// reply without reload
	'postSameImg':	1,		// 		ability to post same images
	'removeEXIF':	1,		// 		remove EXIF data from JPEGs
	'addSageBtn':	1,		// email field -> sage btn
	'saveSage':		1,		//		remember sage
	'sageReply':	0,		//		reply with sage
	'captchaLang':	1,		// language input in captcha [0=off, 1=en, 2=ru]
	'addTextBtns':	1,		// text format buttons [0=off, 1=graphics, 2=text, 3=usual]
	'txtBtnsLoc':	0,		//		located at [0=top, 1=bottom]
	'userName':		0,		// user name
	'nameValue':	'',		//		value
	'userPassw':	0,		// user password
	'passwValue':	'',		//		value
	'userSignat':	0,		// user signature
	'signatValue':	'',		//		value
	'noBoardRule':	1,		// hide board rules
	'noGoto':		1,		// hide goto field
	'noPassword':	1,		// hide password field
	'scriptStyle':	0,		// script style [0=glass black, 1=glass blue, 2=gradient blue, 3=solid grey]
	'expandPanel':	0,		// show full main panel
	'attachPanel':	1,		// attach main panel
	'panelCounter':	1,		// posts/images counter in script panel
	'rePageTitle':	1,		// replace page title in threads
	'animation':	1,		// animation in script
	'closePopups':	0,		// auto-close popups
	'updScript':	1,		// check for script's update
	'scrUpdIntrv':	2,		// 		check interval in days (0=on page load)
	'betaScrUpd':	0,		// 		check for beta-version
	'lastScrUpd':	0,		// 		last update check
	'textaWidth':	540,	// textarea width
	'textaHeight':	140		// textarea height
},

Lng = {
	cfg: {
		hideBySpell:	['Заклинания: ', 'Magic spells: '],
		hideByWipe:		['Анти-вайп детекторы ', 'Anti-wipe detectors '],
		wipeSameLin:	['Повтор строк', 'Same lines'],
		wipeSameWrd:	['Повтор слов', 'Same words'],
		wipeLongWrd:	['Длинные слова', 'Long words'],
		wipeSpecial:	['Спецсимволы', 'Special symbols'],
		wipeCAPS:		['КАПС/реГисТР', 'CAPS/cAsE'],
		wipeNumbers:	['Числа', 'Numbers'],
		filterThrds:	['Применять фильтры к тредам', 'Apply filters to threads'],
		menuHiddBtn:	['Дополнительное меню кнопок скрытия ', 'Additional menu of hide buttons'],
		viewHiddNum:	['Просмотр скрытого по №поста*', 'View hidden on №postnumber*'],
		delHiddPost: {
			sel:		[['Не изменять', 'Объединять', 'Удалять'], ['Skip', 'Merge', 'Delete']],
			txt:		['скрытые посты', 'hidden posts']
		},

		updThread: {
			sel:		[['Откл.', 'Авто', 'Счет+клик', 'По клику'], ['Disable', 'Auto', 'Count+click', 'On click']],
			txt:		['подгрузка постов в треде ', 'loading posts in thread ']
		},
		updThrIntrv: {
			sel:		[[0.5, 1, 1.5, 2, 5, 15, 30], [0.5, 1, 1.5, 2, 5, 15, 30]],
			txt:		['(мин)*', '(min)*']
		},
		favIcoBlink:	['мигать фавиконом при новых постах*', 'Favicon blinking on new posts*'],
		desktNotif:		['Уведомления на рабочем столе', 'Desktop notifications'],
		expandPosts: {
			sel:		[['Откл.', 'Авто', 'По клику'], ['Disable', 'Auto', 'On click']],
			txt:		['загрузка сокращенных постов*', 'upload of shorted posts*']
		},
		expandImgs: {
			sel:		[['Откл.', 'В посте', 'По центру'], ['Disable', 'In post', 'By center']],
			txt:		['раскрывать изображения ', 'expand images ']
		},
		preLoadImgs:	['Предварительно загружать изображения*', 'Pre-load images*'],
		findRarJPEG:	['Распознавать rarJPEG\'и в изображениях*', 'Detect rarJPEGs in images*'],
		postBtnsTxt:	['Кнопки постов в виде текста*', 'Show post buttons as text*'],
		imgSrcBtns:		['Добавлять кнопки для поиска изображений*', 'Add image search buttons*'],
		noSpoilers:		['Открывать спойлеры', 'Open spoilers'],
		noPostNames:	['Скрывать имена в постах', 'Hide names in posts'],
		noPostScrl:		['Без скролла в постах', 'No scroll in posts'],
		keybNavig:		['Навигация с помощью клавиатуры* ', 'Navigation with keyboard* '],
		correctTime:	['Корректировать время в постах* ', 'Correct time in posts* '],
		timeOffset:		[' Разница во времени', ' Time difference'],
		timePattern:	['Шаблон замены', 'Replace pattern'],

		linksNavig: {
			sel:		[['Откл.', 'Без карты', 'С картой'], ['Disable', 'No map', 'With map']],
			txt:		['навигация по >>ссылкам* ', 'navigation by >>links* ']
		},
		linksOver:		[' задержка появления (мс)', ' delay appearance (ms)'],
		linksOut:		[' задержка пропадания (мс)', ' delay disappearance (ms)'],
		markViewed:		['Отмечать просмотренные посты*', 'Mark viewed posts*'],
		strikeHidd:		['Зачеркивать >>ссылки на скрытые посты', 'Strike >>links to hidden posts'],
		noNavigHidd:	['Не отображать превью для скрытых постов', 'Don\'t show previews for hidden posts'],
		insertNum:		['Вставлять >>ссылку по клику на №поста*', 'Insert >>link on №postnumber click*'],
		addMP3:			['Добавлять плейер к mp3-ссылкам* ', 'Add player to mp3-links* '],
		addImgs:		['Загружать изображения к .jpg-, .png-, .gif-ссылкам*', 'Load images to .jpg-, .png-, .gif-links*'],
		addYouTube: {
			sel:		[['Ничего', 'Плейер по клику', 'Авто плейер', 'Превью+плейер', 'Только превью'], ['Nothing', 'On click player', 'Auto player', 'Preview+player', 'Only preview']],
			txt:		['к YouTube-ссылкам* ', 'to YouTube-links* ']
		},
		YTubeType: {
			sel:		[['Flash', 'HTML5 iframe', 'HTML5 video'], ['Flash', 'HTML5 iframe', 'HTML5 video']],
			txt:		[' ', ' ']
		},
		YTubeHD:		['HD ', 'HD '],
		YTubeTitles:	['Загружать названия к YouTube-ссылкам*', 'Load titles into YouTube-links*'],

		addPostForm: {
			sel:		[['Сверху', 'Внизу', 'Скрытая'], ['At top', 'At bottom', 'Hidden']],
			txt:		['форма ответа в треде* ', 'reply form in thread* ']
		},
		noThrdForm:		['Прятать форму создания треда', 'Hide thread creating form'],
		favOnReply:		['Добавлять тред в избранное при ответе', 'Add thread to favorites on reply'],
		checkReply:		['Постить ответ без перезагрузки*', 'Posting reply without reload*'],
		postSameImg:	['Возможность отправки одинаковых изображений', 'Ability to post same images'],
		removeEXIF:		['Удалять EXIF-данные из JPEG-изображений', 'Remove EXIF-data from JPEG-images'],
		addSageBtn:		['Sage вместо поля E-mail* ', 'Sage button instead of E-mail field* '],
		saveSage:		['запоминать сажу', 'remember sage'],
		captchaLang: {
			sel:		[['Откл.', 'Eng', 'Rus'], ['Disable', 'Eng', 'Rus']],
			txt:		['язык ввода капчи', 'language input in captcha']
		},
		addTextBtns: {
			sel:		[['Откл.', 'Графич.', 'Упрощ.', 'Стандарт.'], ['Disable', 'As images', 'As text', 'Standard']],
			txt:		['кнопки форматирования текста ', 'text format buttons ']
		},
		txtBtnsLoc:		['внизу', 'at bottom'],
		userName:		['Постоянное имя', 'Fixed name'],
		userPassw:		['Постоянный пароль', 'Fixed password'],
		userSignat:		['Постоянная подпись', 'Fixed signature'],
		noBoardRule:	['правила ', 'rules '],
		noGoto:			['поле goto ', 'goto field '],
		noPassword:		['пароль', 'password'],

		scriptStyle: {
			sel:		[['Glass black', 'Glass blue', 'Gradient blue', 'Solid grey'], ['Glass black', 'Glass blue', 'Gradient blue', 'Solid grey']],
			txt:		[' стиль скрипта', ' script style']
		},
		attachPanel:	['Прикрепить главную панель ', 'Attach main panel '],
		panelCounter:	['Счетчик постов/изображений в треде', 'Posts/images counter in thread'],
		rePageTitle:	['Название треда в заголовке вкладки*', 'Thread name in page title*'],
		animation:		['Включить анимацию в скрипте', 'Enable animation in script'],
		closePopups:	['Автоматически закрывать уведомления', 'Close popups automatically'],
		updScript:		['Включить авто-проверку на обновления', 'Enable Auto Update-сheck'],
		scrUpdIntrv: {
			sel:		[['Всегда', 'Каждый день', 'Каждые 2 дня', 'Каждую неделю', 'Каждые 2 недели', 'Каждый месяц'], ['Always', 'Every day', 'Every 2 days', 'Every week', 'Every 2 week', 'Every month']],
			txt:		['Интервал проверки', 'Check interval']
		},
		betaScrUpd:	['Проверять обновления для beta-версии', 'Check updates for beta-version'],

		language: {
			sel:		[['Ru', 'En'], ['Ru', 'En']],
			txt:		['', '']
		}
	},

	txtBtn: {
		Bold:		['Жирный', 'Bold'],
		Italic:		['Наклонный', 'Italic'],
		Under:		['Подчеркнутый', 'Underlined'],
		Strike:		['Зачеркнутый', 'Strike'],
		Spoil:		['Спойлер', 'Spoiler'],
		Code:		['Код', 'Code'],
		Quote:		['Цитировать выделенное', 'Quote selected']
	},

	cfgTab: {
		Filters:	['Фильтры', 'Filters'],
		Posts:		['Посты', 'Posts'],
		Links:		['Ссылки', 'Links'],
		Form:		['Форма', 'Form'],
		Common:		['Общее', 'Common'],
		Info:		['Инфо', 'Info']
	},

	panelBtn: {
		Settings:	['Настройки', 'Settings'],
		Hidden:		['Скрытое', 'Hidden'],
		Favor:		['Избранное', 'Favorites'],
		Refresh:	['Обновить', 'Refresh'],
		GoBack:		['Назад', 'Go back'],
		GoNext:		['Следующая', 'Next'],
		GoUp:		['Наверх', 'To the top'],
		GoDown:		['В конец', 'To the bottom'],
		NewThr:		['Создать тред', 'New thread'],
		ExpImg:		['Раскрыть картинки', 'Expand images'],
		MaskImg:	['Маскировать картинки', 'Mask images'],
		UpdOn:		['Автообновление треда', 'Thread autoupdate'],
		AudioOff:	['Звуковое оповещение о новых постах', 'Sound notification about new posts'],
		Catalog:	['Каталог', 'Catalog'],
		counter:	['Постов/Изображений в треде', 'Posts/Images in thread']
	},

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
	selAudioNotif:	[
		['Каждые 30 сек.', 'Каждую минуту', 'Каждые 2 мин.', 'Каждые 5 мин.'],
		['Every 30 sec.', 'Every minute', 'Every 2 min.', 'Every 5 min.']
	],

	add:			['Добавить', 'Add'],
	apply:			['Применить', 'Apply'],
	clear:			['Очистить', 'Clear'],
	refresh:		['Обновить', 'Refresh'],
	load:			['Загрузить', 'Load'],
	save:			['Сохранить', 'Save'],
	edit:			['Правка', 'Edit'],
	reset:			['Сброс', 'Reset'],
	remove:			['Удалить', 'Remove'],
	info:			['Инфо', 'Info'],
	undo:			['Отмена', 'Undo'],
	loading:		['Загрузка...', 'Loading...'],
	checking:		['Проверка...', 'Checking...'],
	deleting:		['Удаление...', 'Deleting...'],
	error:			['Ошибка:', 'Error:'],
	noConnect:		['Ошибка подключения', 'Connection failed'],
	thrdNotFound:	['Тред недоступен (№', 'Thread is unavailable (№'],
	succDeleted:	['Пост(ы) удален(ы)!', 'Post(s) deleted!'],
	errDelete:		['Не могу удалить пост(ы)!', 'Can\'t delete post(s)!'],
	cTimeError:		['Неправильная разница во времени', 'Invalid time difference'],
	cookiesLimit:	['Превышен лимит cookies', 'Cookies limit overflow'],
	noGlobalCfg:	['Глобальные настройки не найдены', 'Global config not found'],
	postNotFound:	['Пост не найден', 'Post not found'],
	checkNow:		['Проверить сейчас', 'Check now'],
	updAvail:		['Доступно обновление!', 'Update available!'],
	haveLatest:		['У вас стоит самая последняя версия!', 'You have latest version!'],
	unreadMsg:		['В треде %m непрочитанных сообщений.', 'There are %m unreaded messages in thread.'],
	version:		['Версия: ', 'Version: '],
	storage:		['Хранение: ', 'Storage: '],
	thrViewed:		['Тредов просмотрено: ', 'Threads viewed: '],
	thrCreated:		['Тредов создано: ', 'Threads created: '],
	pstSended:		['Постов отправлено: ', 'Posts sended: '],
	total:			['Всего: ', 'Total: '],
	dontShow:		['Не отображать: ', 'Do not show: '],
	showMore:		['Показать подробнее', 'Show more'],
	loadGlobal:		['Загрузить глобальные настройки', 'Load global settings'],
	saveGlobal:		['Сохранить настройки как глобальные', 'Save settings as global'],
	resetCfg:		['Сбросить в настройки по умолчанию', 'Reset settings to defaults'],
	saveChanges:	['Сохранить внесенные изменения', 'Save your changes'],
	editInTxt:		['Правка в текстовом формате', 'Edit in text format'],
	infoCount:		['Обновить счетчики постов', 'Refresh posts counters'],
	clrDeleted:		['Очистить записи недоступных тредов', 'Clear notes of inaccessible threads'],
	clrSelected:	['Удалить выделенные записи', 'Remove selected notes'],
	hiddenPosts:	['Скрытые посты', 'Hidden posts'],
	hiddenThrds:	['Скрытые треды', 'Hidden threads'],
	onPage:			[' на странице', ' on page'],
	noHidThrds:		['Нет скрытых тредов...', 'No hidden threads...'],
	noHidOnPage:	['На этой странице нет скрытого...', 'Nothing to hide on this page...'],
	expandAll:		['Раскрыть все', 'Expand all'],
	noFavorites:	['Нет избранных тредов...', 'Favorites is empty...'],
	replies:		['Ответы:', 'Replies:'],
	postsOmitted:	['Пропущено ответов: ', 'Posts omitted: '],
	collapseThrd:	['Свернуть тред', 'Collapse thread'],
	deleted:		['удалён', 'deleted'],
	getNewPosts:	['Получить новые посты', 'Get new posts'],
	page:			[' страница', ' page'],
	hiddenThrd:		['Скрытый тред:', 'Hidden thread:'],
	expandForm:		['Раскрыть форму', 'Expand form'],
	search:			['Искать в ', 'Search in '],
	reply:			['Ответ', 'Reply'],
	wait:			['Ждите', 'Wait'],
	makeRjpeg:		['Сделать rarJPEG', 'Make rarJPEG'],
	keyNavHelp:		[
		'На доске:\n"J" - тред ниже,\n"K" - тред выше,\n"N" - пост ниже,\n"M" - пост выше,\n"V" - вход в тред\n\nВ треде:\n"J" - пост ниже,\n"K" - пост выше,\n"V" - быстрый ответ',
		'On board:\n"J" - thread below,\n"K" - thread above,\n"N" - post below,\n"M" - post above,\n"V" - enter a thread\n\nIn thread:\n"J" - post below,\n"K" - post above,\n"V" - quick reply'
	],
	month:			[
		['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
		['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	],
	week:			[
		['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт'],
		['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	],
	conReset: ['Данное действие удалит все ваши настройки и закладки. Продолжить?', 'This will delete all your preferences and favourites. Continue?'],
	fileCorrupt: ['Файл повреждён: ', 'File is corrupted: ']
},

doc = window.document,
storageLife = 5 * 24 * 3600 * 1000,
Cfg = {}, Favor = {}, hThrds = {}, Stat = {}, Posts = [], pByNum = [], Threads = [], Visib = [], Expires = [],
nav = {}, aib = {}, brd, res, TNum, pageNum, docExt, docTitle, favIcon,
pr = {}, dForm, oeForm, dummy, postWrapper = false, refMap = [],
Pviews = {deleted: [], ajaxed: {}},
Audio = {enabled: false, el: null, repeat: false, running: false},
pSpells = {}, tSpells = {}, oSpells = {}, spellsList = [],
oldTime, endTime, timeLog = '', dTime,
ajaxInterval, lCode, hideTubeDelay, quotetxt = '', liteMode = false, isExpImg = false;


/*==============================================================================
									UTILITES
==============================================================================*/

function $$X(path, root, dc) {
	return dc.evaluate(path, root, null, 7, null);
}

function $X(path, root) {
	return $$X(path, root, doc);
}

function $$x(path, root, dc) {
	return dc.evaluate(path, root, null, 8, null).singleNodeValue;
}

function $x(path, root) {
	return $$x(path, root, doc);
}

function $xb(path, root) {
	return doc.evaluate(path, root, null, 3, null).booleanValue;
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
		while(el = list.snapshotItem(i)) {
			fn(el, i++);
		}
	}
}

function $html(el, html) {
	var cln = el.cloneNode(false);
	cln.innerHTML = html;
	el.parentNode.replaceChild(cln, el);
	return cln;
}

function $attr(el, attr) {
	for(var key in attr) {
		key === 'text' ? el.textContent = attr[key] :
		key === 'value' ? el.value = attr[key] :
		el.setAttribute(key, attr[key]);
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

function $add(html) {
	dummy.innerHTML = html;
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

function $toDOM(html) {
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
	$$Del(path, root, doc);
}

function $offset(el) {
	var box = el.getBoundingClientRect();
	return {
		top: Math.round(box.top + window.pageYOffset),
		left: Math.round(box.left + window.pageXOffset)
	};
}

function $getStyle(el, prop) {
	return doc.defaultView && doc.defaultView.getComputedStyle ?
		doc.defaultView.getComputedStyle(el, '').getPropertyValue(prop) : '';
}

function $focus(el) {
	window.scrollTo(0, $offset(el).top);
}

function $pd(e) {
	e.preventDefault();
}

function $rnd() {
	return Math.round(Math.random() * 1e10).toString(10);
}

function $txtInsert(el, txt) {
	var scrtop = el.scrollTop,
		start = el.selectionStart;
	el.value = el.value.substr(0, start) + txt + el.value.substr(el.selectionEnd);
	el.setSelectionRange(start + txt.length, start + txt.length);
	el.focus();
	el.scrollTop = scrtop;
}

function $txtSelect() {
	return nav.Opera ? doc.getSelection() : window.getSelection().toString();
}

function $toRegExp(str) {
	var t = str.match(/\/.*?[^\\]\/[ig]*/)[0],
		l = t.lastIndexOf('/');
	return new RegExp(t.substr(1, l - 1), t.substr(l + 1));
}

function $isEmpty(obj) {
	for(var i in obj) {
		return false;
	}
	return true;
}

function $uneval(obj) {
	return unescape(JSON.stringify(obj).replace(/\\u/g, '%u'));
}

function $log(txt) {
	var newTime = Date.now();
	timeLog += txt + ': ' + (newTime - oldTime) + 'ms\n';
	oldTime = newTime;
}

function fixFunctions() {
	if(!('head' in doc)) {
		doc.head = $t('head', doc);
	}
	if(aib.hid) {
		window.setTimeout = function(fn, num) {
			if(typeof fn === 'function') {
				fn.apply(null, Array.prototype.slice.call(arguments, 2));
			}
			return 1;
		};
	}
	if(!('GM_log' in window)) {
		window.GM_log = function() {};
	}
	if(!('GM_xmlhttpRequest' in window)) {
		window.GM_xmlhttpRequest = function(obj) {
			var h, xhr = new window.XMLHttpRequest();
			if('onreadystatechange' in obj) {
				xhr.onreadystatechange = function() {
					obj.onreadystatechange(xhr);
				};
			}
			xhr.onload = function() {
				try{
					obj.onload(xhr);
				} catch(e) {}
				xhr = null;
			};
			xhr.open(obj.method, obj.url, true);
			xhr.setRequestHeader('Accept-Encoding', 'deflate, gzip, x-gzip');
			for(h in obj.headers) {
				xhr.setRequestHeader(h, obj[h]);
			}
			xhr.finalUrl = obj.url;
			xhr.send(null);
		};
	}
}

function addContentScript(text) {
	doc.head.appendChild($new('script', {
		'type': 'text/javascript',
		'text': text
	}, null));
}


/*==============================================================================
								STORAGE / CONFIG
==============================================================================*/

function setCookie(name, value, life) {
	if(name) {
		doc.cookie = escape(name) + '=' + escape(value) + ';expires=' +
			(new Date(Date.now() + life)).toGMTString() + ';path=/';
	}
}

function getCookie(name) {
	var one,
		arr = doc.cookie.split('; '),
		i = arr.length;
	while(i--) {
		one = arr[i].split('=');
		if(one[0] === escape(name)) {
			return unescape(one[1]);
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
	if(nav.isGM) {
		return GM_getValue(name);
	}
	if(nav.isScript) {
		return scriptStorage.getItem(name);
	}
	if(nav.isLocal) {
		return localStorage.getItem(name);
	}
	return getCookie(name);
}

function setStored(name, value) {
	if(nav.isGM) {
		GM_setValue(name, value);
	} else if(nav.isScript) {
		scriptStorage.setItem(name, value);
	} else if(nav.isLocal) {
		localStorage.setItem(name, value);
	} else {
		setCookie(name, value, storageLife);
	}
}

function getStoredObj(name, def) {
	try {
		return JSON.parse(getStored(name)) || def;
	} catch(e) {
		return def;
	}
}

function saveSpells(val) {
	spellsList = val.split('\n');
	setStored('DESU_Spells_' + aib.dm, val);
	initSpells();
}

/** @constructor */
function Config(cfg) {
    for(var key in cfg) {
        this[key] = cfg[key];
    }
}
Config.prototype = defaultCfg;

function parseCfg(cfStr) {
	try {
		var rv = JSON.parse(getStored(cfStr));
		if(rv['version']) {
			return new Config(rv);
		}
	} catch(e) {}
	return false;
}

function fixCfg(uGlob) {
	var rv = (uGlob && parseCfg('DESU_GlobalCfg')) || new Config({'version': defaultCfg['version']});
	rv['captchaLang'] = aib.hana || aib.tire || aib.vomb || aib.ment || aib.tinyIb ? 2 : 1;
	rv['timePattern'] = rv['timeOffset'] = '';
	rv['correctTime'] = 0;
	return rv;
}

function readCfg() {
	Cfg = parseCfg('DESU_Config_' + aib.dm) || fixCfg(nav.isGlobal);
	Cfg['version'] = defaultCfg['version'];
	if(nav.Opera && nav.Opera < 11.1 && Cfg['scriptStyle'] !== 2) {
		Cfg['scriptStyle'] = 2;
	}
	if(nav.Firefox < 6 && !nav.WebKit) {
		Cfg['preLoadImgs'] = 0;
	}
	if(aib.fch) {
		Cfg['findRarJPEG'] = 0;
	}
	if(!nav.Firefox) {
		Cfg['favIcoBlink'] = 0;
	}
	if(!nav.WebKit) {
		Cfg['desktNotif'] = 0;
	}
	if(nav.Opera && nav.Opera < 12) {
		Cfg['YTubeTitles'] = 0;
	}
	if(nav.Opera) {
		Cfg['updScript'] = 0;
	}
	if(!Cfg['saveSage']) {
		Cfg['sageReply'] = 0;
	}
	Cfg['linksOver'] = +Cfg['linksOver'];
	Cfg['linksOut'] = +Cfg['linksOut'];
	setStored('DESU_Config_' + aib.dm, $uneval(Cfg));
	lCode = Cfg['language'];
	Stat = getStoredObj('DESU_Stat_' + aib.dm, {view: 0, op: 0, reply: 0});
	if(TNum) {
		Stat.view = +Stat.view + 1;
	}
	setStored('DESU_Stat_' + aib.dm, $uneval(Stat));
	if(Cfg['correctTime']) {
		dTime = new dateTime(Cfg['timePattern'], Cfg['timeOffset']);
	}
	saveSpells(getStored('DESU_Spells_' + aib.dm) || '');
}

function saveCfg(name, val) {
	Cfg[name] = val;
	setStored('DESU_Config_' + aib.dm, $uneval(Cfg));
}

function toggleCfg(name) {
	saveCfg(name, !Cfg[name] ? 1 : 0);
}

function getVisib(pNum) {
	var key = nav.isCookie ? pByNum[pNum].Count : brd + pNum;
	return key in Visib ? Visib[key] : null;
}

function readPostsVisib() {
	var i, arr, data, currTime = Date.now();
	if(nav.isCookie) {
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
	Posts.forEach(function(post) {
		var pNum = post.Num;
		post.Vis = getVisib(pNum);
		if(post.isOp) {
			if(hThrds[brd] && (
				nav.isCookie && hThrds[brd].indexOf(pNum) >= 0
					|| !nav.isCookie && hThrds[brd][pNum] !== undefined
			)) {
				post.Vis = 0;
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
	if(nav.isCookie) {
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
	if(nav.isCookie) {
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
		if(escape(JSON.stringify(hThrds)).length > 4095) {
			hThrds[b].shift();
		}
	} else {
		if(!hThrds[b]) {
			hThrds[b] = {};
		}
		if(vis === 0) {
			hThrds[b][tNum] = post.dTitle;
		} else {
			delete hThrds[b][tNum];
			if($isEmpty(hThrds[b])) {
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
	if($isEmpty(Favor[h][b])) {
		delete Favor[h][b];
	}
	if($isEmpty(Favor[h])) {
		delete Favor[h];
	}
	if(pByNum[tNum]) {
		$x('.//span[starts-with(@class,"DESU_btnFav")]', pByNum[tNum].Btns).className = 'DESU_btnFav';
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
		txt: nav.isCookie ? post.dTitle.substring(0, 25) : post.dTitle
	};
	if(nav.isCookie && escape(JSON.stringify(Favor)).length > 4095) {
		$alert(Lng.cookiesLimit[lCode], 'CookieErr', false);
		delete Favor[h][b][tNum];
		return;
	}
	btn.className = 'DESU_btnFavSel';
	saveFavorites($uneval(Favor));
}

function markViewedPost(pNum) {
	var post = pByNum[pNum];
	if(post && post.className.indexOf('DESU_viewed') === -1) {
		post.className += ' DESU_viewed';
	}
}

function readViewedPosts() {
	if(Cfg['markViewed'] && nav.isSession) {
		(sessionStorage.viewedPosts || '').split(',').forEach(markViewedPost);
	}
}

function saveViewedPosts(pNum) {
	if(nav.isSession) {
		var arr = (sessionStorage.viewedPosts || '').split(',');
		arr.push(pNum);
		sessionStorage.viewedPosts = arr;
	}
}

/*==============================================================================
									MAIN PANEL
==============================================================================*/

function addPanel() {
	var imgLen = getImages(dForm).snapshotLength,
		pButton = function(id, click, href, over, out) {
			return $New('li', null, [
				$new('a', {
					'id': 'DESU_btn' + id,
					'class': 'DESU_aBtn',
					'title': Lng.panelBtn[id][lCode],
					'href': href || '#',
					'onmouseout': out}, {
					'click': click,
					'mouseover': over
				})
			]);
		};

	$before(dForm, [
		$new('div', {'style': 'clear:both;'}, null),
		$New('div', {'id': 'DESU_panel', 'lang': getThemeLang()}, [
			$new('span', {
				'id': 'DESU_btnLogo',
				'style': 'cursor: pointer'}, {
				'click': function(e) {
					toggleCfg('expandPanel');
					updateCSS();
				}
			}),
			$New('ul', {'id': 'DESU_panelBtns'}, [
				pButton('Settings', function(e) {
					$pd(e);
					toggleContent('Cfg', false);
				}, null, null, null),
				pButton('Hidden', function(e) {
					$pd(e);
					toggleContent('Hid', false);
				}, null, null, null),
				pButton('Favor', function(e) {
					$pd(e);
					toggleContent('Fav', false);
				}, null, null, null),
				pButton('Refresh', function(e) {
					$pd(e);
					window.location.reload();
				}, null, function() {
					if(!TNum) {
						selectAjaxPages();
					}
				}, 'DESU_delSelection(event)'),
				pButton(
					'GoBack', null,
					'//' + aib.host + getPageUrl(aib.host, brd, pageNum - 1),
					null, null
				),
				$if(!TNum, pButton(
					'GoNext', null,
					'//' + aib.host + getPageUrl(aib.host, brd, pageNum + 1),
					null, null
				)),
				pButton('GoUp', function(e) {
					$pd(e);
					window.scrollTo(0, 0);
				}, null, null, null),
				pButton('GoDown', function(e) {
					$pd(e);
					window.scrollTo(0, doc.body.scrollHeight || doc.body.offsetHeight);
				}, null, null, null),
				$if(!TNum && (pr.on || oeForm), pButton('NewThr', toggleMainReply, null, null, null)),
				$if(imgLen > 0, pButton('ExpImg', function(e) {
					$pd(e);
					Cfg['expandImgs'] = 1;
					isExpImg = !isExpImg;
					Posts.forEach(function(post) {
						expandAllPostImg(post, isExpImg);
					});
				}, null, null, null)),
				$if(pr.file || oeForm, pButton('MaskImg', function(e) {
					$pd(e);
					toggleCfg('maskImgs');
					updateCSS();
				}, null, null, null)),
				$if(TNum && Cfg['updThread'] !== 3, pButton('UpdOn', function(e) {
					$pd(e);
					if(ajaxInterval) {
						endPostsUpdate();
					} else {
						this.id = 'DESU_btnUpdOn';
						initThreadsUpdater();
					}
				}, null, null, null)),
				$if(!nav.Safari && (!nav.Firefox || nav.Firefox > 4) && TNum && Cfg['updThread'] === 1,
					pButton('AudioOff', function(e) {
						$pd(e);
						toggleAudioNotif();
						Audio.repeat = false;
						this.id = Audio.enabled ? 'DESU_btnAudioOn' : 'DESU_btnAudioOff';
						$del($id('DESU_select'));
					}, null, selectAudioNotif, 'DESU_delSelection(event)')
				),
				$if(aib.nul, pButton('Catalog', null, '//0chan.ru/' + brd + '/catalog.html', null, null))
			]),
			$if(TNum, $New('div', {'id': 'DESU_panelInfo'}, [
				$new('span', {
					'title': Lng.panelBtn.counter[lCode],
					'text': Posts.length + '/' + imgLen
				}, null)
			]))
		]),
		$new('div', {
			'class': 'DESU_content',
			'lang': getThemeLang()
		}, null),
		$new('div', {'id': 'DESU_alertBox'}, null),
		$new('hr', {'style': 'clear: both;'}, null)
	]);
}

function toggleContent(name, isUpd) {
	if(liteMode) {
		return;
	}
	var el = $c('DESU_content', doc),
		id = 'DESU_content' + name;
	if(!isUpd || el.id === id) {
		if(el.childElementCount && Cfg['animation'] && nav.Anim) {
			nav.animEvent(el, function(node) {
				showContent(node, id, name, isUpd);
				id = name = isUpd = null;
			});
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
	if(!Cfg['attachPanel']) {
		el.appendChild($new('hr', {'style': 'clear: both;'}, null));
	}
	if(name === 'Cfg') {
		addSettings();
	} else {
		el.appendChild($add('<table><tbody align="left" /></table>'));
		if(Cfg['attachPanel']) {
			$t('table', el).style.backgroundColor = $getStyle(doc.body, 'background-color');
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
	if(Cfg['animation'] && nav.Anim) {
		el.className = 'DESU_content DESU_cfgOpen';
	}
}


/*==============================================================================
								"SETTINGS" WINDOW
==============================================================================*/

function addSettings() {
	var lBox = function(name, fn) {
		var el = $new('input', {
			'type': 'checkbox',
			'id': 'DESU_' + name}, {
			'click': function() {
				toggleCfg(this.id.substring(5));
				if(fn) {
					fn();
				}
			}
		});
		el.checked = Cfg[name];
		return $New('label', null, [el, $txt(' ' + Lng.cfg[name][lCode])]);
	},

	divBox = function(name, fn) {
		return $New('div', null, [lBox(name, fn)]);
	},

	inpTxt = function(name, size, fn) {
		return $new('input', {
			'type': 'text',
			'id': 'DESU_' + name,
			'size': size,
			'value': Cfg[name]}, {
			'keyup': function() {
				saveCfg(this.id.substring(5), this.value.replace(/\|/g, ''));
				if(fn) {
					fn();
				}
			}
		});
	},

	optSel = function(name, fn) {
		for(var i = 0, x = Lng.cfg[name], len = x.sel[lCode].length, el, opt = []; i < len; i++) {
			opt[i] = '<option value="' + i + '">' + x.sel[lCode][i] + '</option>';
		}
		el = $event($add(
			'<select id="DESU_sel' + name + '">' + opt.join('') + '</select>'), {
			'change': (fn ? fn : function() {
				saveCfg(this.id.substring(8), this.selectedIndex);
			})
		});
		el.selectedIndex = Cfg[name];
		return $New('label', null, [el, $txt(' ' + x.txt[lCode])]);
	},

	cfgTab = function(id, el) {
		return $New('div', {'class': aib.pClass + ' DESU_cfgTabBack'}, [
			$new('div', {
				'class': 'DESU_cfgTab',
				'text': Lng.cfgTab[id][lCode]}, {
				'click': function() {
					openTab(this, el);
				}
			})
		]);
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
		tab.className = 'DESU_cfgTab_sel';
		if(el === cfgFilters) {
			spellsList = getStored('DESU_Spells_' + aib.dm).split('\n');
			initSpells();
			$id('DESU_spellEdit').value = spellsList.join('\n');
		}
	},

	cfgFilters = $New('div', {'class': 'DESU_cfgBody', 'id': 'DESU_cfgFilters'}, [
		$New('div', null, [
			$New('span', {'id': 'DESU_spellPanel'}, [
				$new('a', {
					'text': Lng.add[lCode],
					'href': '#',
					'class': 'DESU_aBtn',
					'onmouseout': 'DESU_delSelection(event)'}, {
					'click': $pd,
					'mouseover': selectSpell
				}),
				$new('a', {
					'text': Lng.apply[lCode],
					'href': '#',
					'class': 'DESU_aBtn'}, {
					'click': function(e) {
						$pd(e);
						applySpells('');
					}
				}),
				$new('a', {
					'text': Lng.clear[lCode],
					'href': '#',
					'class': 'DESU_aBtn'}, {
					'click': function(e) {
						$pd(e);
						$id('DESU_spellEdit').value = '';
						applySpells('');
					}
				}),
				$new('a', {
					'text': '?',
					'target': '_blank',
					'href': '//www.freedollchan.org/scripts/spells',
					'class': 'DESU_aBtn'
				}, null)
			]),
			lBox('hideBySpell', toggleSpells),
			$new('textarea', {
				'id': 'DESU_spellEdit',
				'rows': 10,
				'cols': 49
			}, null)
		]),
		$New('div', null, [
			lBox('hideByWipe', null),
			$btn('>', Lng.showMore[lCode], function() {
				$disp($id('DESU_cfgWipe'));
			})
		]),
		$New('div', {'id': 'DESU_cfgWipe', 'style': 'display: none; padding-left: 25px;'}, [
			divBox('wipeSameLin', null),
			divBox('wipeSameWrd', null),
			divBox('wipeLongWrd', null),
			divBox('wipeSpecial', null),
			divBox('wipeCAPS', null),
			divBox('wipeNumbers', null)
		]),
		divBox('filterThrds', null),
		divBox('menuHiddBtn', null),
		divBox('viewHiddNum', null),
		$New('div', null, [
			optSel('delHiddPost', function() {
				processHidden(this.selectedIndex, Cfg['delHiddPost']);
			})
		])
	]),

	cfgPosts = $New('div', {'class': 'DESU_cfgBody', 'id': 'DESU_cfgPosts'}, [
		$New('div', null, [
			optSel('updThread', null),
			optSel('updThrIntrv', null)
		]),
		$New('div', {'style': 'padding-left: 25px;'}, [
			divBox('favIcoBlink', null),
			$if(nav.WebKit, divBox('desktNotif', function() {
				if(Cfg['desktNotif']) {
					window.webkitNotifications.requestPermission();
				}
			}))
		]),
		$New('div', null, [optSel('expandPosts', null)]),
		$New('div', null, [optSel('expandImgs', null)]),
		$if(nav.isBlob, divBox('preLoadImgs', null)),
		$if(aib.rJpeg && nav.isBlob, $New('div', {'style': 'padding-left: 25px;'}, [
			lBox('findRarJPEG', null)
		])),
		divBox('postBtnsTxt', null),
		divBox('imgSrcBtns', null),
		divBox('noSpoilers', updateCSS),
		divBox('noPostNames', updateCSS),
		divBox('noPostScrl', updateCSS),
		$New('div', null, [
			lBox('keybNavig', null),
			$new('a', {
				'text': '?',
				'href': '#',
				'class': 'DESU_aBtn'}, {
				'click': function(e) {
					$pd(e);
					$alert(Lng.keyNavHelp[lCode], 'KNavHlp', false);
				}
			})
		]),
		$New('div', null, [lBox('correctTime', dateTime.toggleSettings)]),
		$New('div', {'style': 'padding-left: 25px;'}, [
			$New('div', null, [
				inpTxt('timeOffset', 3, null),
				$new('span', {text: Lng.cfg.timeOffset[lCode]}, null)
			]),
			$New('div', null, [
				inpTxt('timePattern', 30, null),
				$txt(' '),
				$new('a', {
					'text': Lng.cfg.timePattern[lCode],
					'href': '#',
					'class': 'DESU_aBtn'}, {
					'click': function(e) {
						$pd(e);
						$alert('"s" - second (one digit),\n"i" - minute (one digit),\n"h" - hour (one digit),\n"d" - day (one digit),\n"w" - week (string)\n"n" - month (one digit),\n"m" - month (string),\n"y" - year (one digit),\n"-" - any symbol\n"+" - any symbol except digits\n"?" - previous char may not be\n\nExamples:\n0chan.ru: "w+yyyy+m+dd+hh+ii+ss"\niichan.ru, 2ch.so: "w+dd+m+yyyy+hh+ii+ss"\ndobrochan.ru: "dd+m+?+?+?+?+?+yyyy++w++hh+ii-?s?s?"\n410chan.org: "dd+nn+yyyy++w++hh+ii+ss"\n4chan.org: "nn+dd+yy+w+hh+ii-?s?s?"\n4chon.net: "nn+dd+yy++w++hh+ii+ss"\nkrautchan.net: "yyyy+nn+dd+hh+ii+ss+--?-?-?-?-?"', 'TRepHlp', false);
					}
				})
			])
		])
	]),

	cfgLinks = $New('div', {'class': 'DESU_cfgBody', 'id': 'DESU_cfgLinks'}, [
		$New('div', null, [optSel('linksNavig', null)]),
		$New('div', {'style': 'padding-left: 25px;'}, [
			$New('div', null, [
				inpTxt('linksOver', 6, null),
				$txt(Lng.cfg.linksOver[lCode])
			]),
			$New('div', null, [
				inpTxt('linksOut', 6, null),
				$txt(Lng.cfg.linksOut[lCode])
			]),
			divBox('markViewed', null),
			divBox('strikeHidd', null),
			divBox('noNavigHidd', null)
		]),
		divBox('insertNum', null),
		divBox('addMP3', null),
		divBox('addImgs', null),
		$New('div', null, [optSel('addYouTube', null)]),
		$New('div', {'style': 'padding-left: 25px;'}, [
			$New('div', null, [
				optSel('YTubeType', null),
				inpTxt('YTubeWidth', 6, null),
				$txt('×'),
				inpTxt('YTubeHeigh', 6, null),
				$txt(' '),
				lBox('YTubeHD', null)
			]),
			$if(!(nav.Opera && nav.Opera < 12), lBox('YTubeTitles', null))
		])
	]),

	cfgForm = $New('div', {'class': 'DESU_cfgBody', 'id': 'DESU_cfgForm'}, [
		$if(pr.on, $New('div', null, [optSel('addPostForm', null)])),
		$if(pr.on, divBox('noThrdForm', function() {
			if(!TNum) {
				$id('DESU_parea').style.display = Cfg['noThrdForm'] ? 'none' : '';
			}
		})),
		divBox('favOnReply', null),
		divBox('checkReply', null),
		$if(nav.isH5Rep, $New('div', {'style': 'padding-left: 25px;'}, [
			divBox('postSameImg', null),
			divBox('removeEXIF', null)
		])),
		$if(pr.mail, $New('div', null, [
			lBox('addSageBtn', null),
			lBox('saveSage', null)
		])),
		$New('div', null, [optSel('captchaLang', null)]),
		$if(pr.on, $New('div', null, [
			optSel('addTextBtns', function() {
				saveCfg('addTextBtns', this.selectedIndex);
				addTextPanel();
			}),
			lBox('txtBtnsLoc', addTextPanel)
		])),
		$if(pr.name, $New('div', null, [
			inpTxt('nameValue', 20, setUserName),
			lBox('userName', setUserName)
		])),
		$if(pr.passw, $New('div', null, [
			inpTxt('passwValue', 20, setUserPassw),
			lBox('userPassw', setUserPassw)
		])),
		$if(pr.txta, $New('div', null, [
			inpTxt('signatValue', 20, null),
			lBox('userSignat', null)
		])),
		$New('div', null, [
			$if(pr.on || oeForm, $txt(Lng.dontShow[lCode])),
			lBox('noBoardRule', updateCSS),
			$if(pr.gothr, lBox('noGoto', function() {
				$disp(pr.gothr);
			})),
			$if(pr.passw, lBox('noPassword', function() {
				$disp(pr.passw.parentNode.parentNode);
			}))
		])
	]),

	cfgCommon = $New('div', {'class': 'DESU_cfgBody', 'id': 'DESU_cfgCommon'}, [
		$New('div', null, [
			optSel('scriptStyle', function() {
				saveCfg('scriptStyle', this.selectedIndex);
				$id('DESU_panel').lang = $c('DESU_content', doc).lang = getThemeLang();
			})
		]),
		divBox('attachPanel', function() {
			toggleContent('Cfg', false);
			updateCSS();
		}),
		divBox('panelCounter', updateCSS),
		divBox('rePageTitle', null),
		divBox('animation', null),
		divBox('closePopups', null),
		$if(!nav.Opera, $New('div', null, [
			divBox('updScript', null),
			$New('div', {'id': 'DESU_updCont', 'style': 'padding: 2px 0 10px 25px;'}, [
				optSel('scrUpdIntrv', function() {
					saveCfg('scrUpdIntrv', this.selectedIndex);
				}),
				divBox('betaScrUpd', null),
				$btn(Lng.checkNow[lCode], '', function() {
					var el = $id('DESU_updRes');
					el.innerHTML = '<span class="DESU_wait">' + Lng.checking[lCode] + '</div>';
					checkForUpdates(true, function(html) {
						el.innerHTML = html;
					});
				})
			]),
			$new('div', {
				'id': 'DESU_updRes',
				'style': 'font-size: 1.1em; text-align: center'
			}, null)
		]))
	]),

	cfgInfo = $New('div', {'class': 'DESU_cfgBody', 'id': 'DESU_cfgInfo'}, [
		$add('<div style="padding-left: 10px;"><div style="display: inline-block; vertical-align: top; width: 170px;"><b>' + Lng.version[lCode] + Cfg['version'] + '</b><br><br>' + Lng.storage[lCode] + (nav.isGM ? 'Mozilla config' : nav.isScript ? 'Opera ScriptStorage' : nav.isLocal ? 'Local Storage' : 'Cookies') + '<br>' + Lng.thrViewed[lCode] + Stat.view + '<br>' + Lng.thrCreated[lCode] + Stat.op + '<br>' + Lng.pstSended[lCode] + Stat.reply + '</div><div style="display: inline-block; vertical-align: top; padding-left: 17px; border-left: 1px solid grey;">' + timeLog.split('\n').join('<br>') + '<br>' + Lng.total[lCode] + endTime + 'ms</div><div style="text-align: center;"><a href="//www.freedollchan.org/scripts/" target="_blank">http://www.freedollchan.org/scripts/</a></div></div>')
	]);

	$id('DESU_contentCfg').appendChild($New('div', {'class': aib.pClass, 'id': 'DESU_cfgWindow'}, [
		$new('div', {
			'id': 'DESU_cfgHead',
			'text': 'Dollchan Extension Tools'
		}, null),
		$New('div', {'id': 'DESU_cfgBar'}, [
			cfgTab('Filters', cfgFilters),
			cfgTab('Posts', cfgPosts),
			cfgTab('Links', cfgLinks),
			cfgTab('Form', cfgForm),
			cfgTab('Common', cfgCommon),
			cfgTab('Info', cfgInfo)
		]),
		$New('div', {'id': 'DESU_cfgBtns'}, [
			$New('div', {'style': 'float: right;'}, [
				optSel('language', function() {
					saveCfg('language', this.selectedIndex);
					window.location.reload();
				}),
				$if(nav.isGlobal, $btn(Lng.load[lCode], Lng.loadGlobal[lCode], function() {
					if(parseCfg('DESU_GlobalCfg')) {
						setStored('DESU_Config_' + aib.dm, '');
						window.location.reload();
					} else {
						$alert(Lng.noGlobalCfg[lCode], 'ErrNoGCfg', false);
					}
				})),
				$if(nav.isGlobal, $btn(Lng.save[lCode], Lng.saveGlobal[lCode], function() {
					setStored('DESU_GlobalCfg', $uneval(Cfg));
					toggleContent('Cfg', true);
				})),
				$btn(Lng.edit[lCode], Lng.editInTxt[lCode], function() {
					$disp($attr($id('DESU_cfgEdit'), {
						'value': getStored('DESU_Config_' + aib.dm)
					}).parentNode);
				}),
				$btn(Lng.reset[lCode], Lng.resetCfg[lCode], function() {
					if(confirm(Lng.conReset[lCode])) {
						setStored('DESU_Config_' + aib.dm, $uneval(fixCfg(false)));
						setStored('DESU_Stat_' + aib.dm, '');
						setStored('DESU_Favorites', '');
						setStored('DESU_Threads_' + aib.dm, '');
						saveSpells('');
						window.location.reload();
					}
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
	]));
	openTab($c('DESU_cfgTab', doc), cfgFilters);
}


/*==============================================================================
									"HIDDEN" WINDOW
==============================================================================*/

function addHiddenTable() {
	var pp, cln, b, tNum, url,
		clones = [],
		tcnt = 0,
		pcnt = 0,
		table = $t('tbody', $id('DESU_contentHid'));
	Posts.forEach(function(post) {
		if(post.Vis !== 0) {
			return;
		}
		pp = !post.isOp;
		cln = $attr(($id('DESU_hidThr_' + post.Num) || post).cloneNode(true), {'id': ''});
		clones.push(cln);
		cln.style.display = '';
		cln.pst = post;
		cln.vis = 0;
		cln.btn = pp ? $c('DESU_btnUnhide', cln) : $x('.//a', cln);
		if(pp) {
			$rattr(cln.btn, 'onmouseover');
			$rattr(cln.btn, 'onmouseout');
		}
		cln.btn.onclick = (function(el) {
			return function() {
				el.vis = el.vis === 0 ? 1 : 0;
				if(!el.pst.isOp) {
					togglePost(el, el.vis);
				} else {
					el.nextElementSibling.style.display = el.vis === 1 ? '' : 'none';
				}
			}
		})(cln);
		$append(table, [
			$if(!pp && tcnt++ === 0 || pp && pcnt++ === 0, $New('tr', null, [
				$add('<b>' + (
					pp ? Lng.hiddenPosts[lCode] : Lng.hiddenThrds[lCode]
				) + Lng.onPage[lCode] + ':</b>')
			])),
			$New('tr', null, [
				cln,
				$if(!pp, $attr(post.cloneNode(true), {
					'style': 'display: none; padding-left: 15px; overflow: hidden; border: 1px solid grey;'
				}))
			])
		]);
	});
	if(pcnt + tcnt === 0) {
		table.insertRow(-1).appendChild($add('<b>' + Lng.noHidOnPage[lCode] + '</b>'));
	} else {
		$append(table.insertRow(-1), [
			$btn(Lng.expandAll[lCode], '', function() {
				var i;
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
				var i;
				for(i = 0; cln = clones[i++];) {
					if(cln.vis !== 0) {
						setPostVisib(cln.pst, 1);
					}
				}
				savePostsVisib();
			})
		]);
	}
	table.appendChild($New('tr', null, [
		$new('hr', null, null),
		$add('<b>' + ($isEmpty(hThrds) ? Lng.noHidThrds[lCode] : Lng.hiddenThrds[lCode]) + '</b>')
	]));
	if(!$isEmpty(hThrds)) {
		for(b in hThrds) {
			table.appendChild($New('tr', {'class': 'DESU_hidTHead', 'id': 'DESU_hidTHead_' + b}, [
				$new('input', {
					'type': 'checkbox'}, {
					'click': function() {
						var inp = this;
						$each($X(
							'.//tr[contains(@id,"_' + inp.parentNode.id.substr(14) + '|")]/div/input',
							$id('DESU_contentHid')
						), function(el) {
							el.checked = inp.checked;
						});
					}
				}),
				$add('<b>' + b + '</b>')
			]));
			for(tNum in hThrds[b]) {
				if(nav.isCookie) {
					tNum = hThrds[b][tNum];
				}
				url = getThrdUrl(aib.host, b, tNum);
				table.appendChild($New('tr', {'class': 'DESU_hidTData', 'id': 'DESU_hidTData_' + b + '|' + tNum}, [
					$New('div', {'class': aib.pClass}, [
						$new('input', {'type': 'checkbox'}, null),
						$add('<a href="' + url + '" target="_blank">№' + tNum + '</a>'),
						$if(!nav.isCookie, $txt(' - ' + hThrds[b][tNum]))
					])
				]));
			}
		}
	}
	$append(table, [
		$New('tr', null, [
			$btn(Lng.edit[lCode], Lng.editInTxt[lCode], function() {
				$disp($id('DESU_hidTEdit').parentNode);
			}),
			$btn(Lng.remove[lCode], Lng.clrSelected[lCode], function() {
				$each($X('.//tr[@class="DESU_hidTData"]', $id('DESU_contentHid')), function(el) {
					var i,
						arr = el.id.substr(14).split('|'),
						b = arr[0],
						tNum = arr[1];
					if($t('input', el).checked) {
						if(pByNum[tNum]) {
							setPostVisib(pByNum[tNum], 1);
						} else if(nav.isCookie) {
							i = hThrds[b].indexOf(tNum);
							if(i >= 0) {
								hThrds[b].splice(i, 1);
							}
						} else {
							Visib[b + tNum] = 1;
							delete hThrds[b][tNum];
						}
						if($isEmpty(hThrds[b])) {
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
	var h, b, tNum, list,
		table = $t('tbody', $id('DESU_contentFav'));
	for(h in Favor) {
		for(b in Favor[h]) {
			table.appendChild($New('tr', {'class': 'DESU_favHead', 'id': 'DESU_favHead_' + h + '|' + b}, [
				$new('input', {
					'type': 'checkbox'}, {
					'click': function() {
						var inp = this;
						$each($X(
							'.//tr[contains(@id,"_' + inp.parentNode.id.substr(13) + '|")]/div/input',
							$id('DESU_contentFav')
						), function(el) {
							el.checked = inp.checked;
						});
						inp = null;
					}
				}),
				$add('<a href="http://' + h + getPageUrl(h, b, 0) + '">' + h + '/' + b + '</a>')
			]));
			for(tNum in Favor[h][b]) {
				table.appendChild($New('tr', {'class': 'DESU_favData', 'id': 'DESU_favData_' + h + '|' + b + '|' + tNum}, [
					$New('div', {'class': aib.pClass}, [
						$new('input', {'type': 'checkbox'}, null),
						$new('span', {
							'class': 'DESU_btnExpthr'}, {
							'click': loadFavorThread
						}),
						$add('<a href="' + getThrdUrl(h, b, tNum) + '">№' + tNum + '</a>'),
						$txt(' - ' + Favor[h][b][tNum].txt),
						$add('<span class="DESU_favPCount">[<span>' + (Favor[h][b][tNum].cnt + 1) + '</span>]</span>')
					]),
					$new('div', {
						'id': tNum,
						'class': 'DESU_favThr',
						'style': 'display: none;'
					}, null)
				]));
			}
		}
	}
	if(!table.firstChild) {
		table.insertRow(-1).appendChild($add('<b>' + Lng.noFavorites[lCode] + '</b>'));
	}
	$append(table, [
		$New('tr', null, [
			$new('hr', null, null),
			$btn(Lng.edit[lCode], Lng.editInTxt[lCode], function() {
				$disp($id('DESU_favEdit').parentNode);
			}),
			$btn(Lng.info[lCode], Lng.infoCount[lCode], function() {
				$each($X('.//tr[@class="DESU_favData"]', $id('DESU_contentFav')), function(el) {
					var c,
						arr = el.id.substr(13).split('|'),
						cnt = 0;
					if(aib.host === arr[0]) {
						c = $t('span', $c('DESU_favPCount', el));
						$attr(c, {
							'class': 'DESU_wait',
							'text': ''
						});
						ajaxGetPosts(null, arr[1], arr[2], function() {
							cnt++;
						}, function(dc, err) {
							$attr(c, {
								'class': '',
								'text': err || cnt
							});
							if(!err) {
								Favor[arr[0]][arr[1]][arr[2]].cnt = cnt;
								setStored('DESU_Favorites', $uneval(Favor));
							}
							c = cnt = arr = null;
						});
					}
				});
			}),
			$btn(Lng.clear[lCode], Lng.clrDeleted[lCode], function() {
				$each($X('.//tr[@class="DESU_favData"]', $id('DESU_contentFav')), function(el) {
					var arr = el.id.substr(13).split('|');
					ajaxGetPosts(getThrdUrl(arr[0], arr[1], arr[2]), null, null, null, function(dc, err) {
						if(err) {
							removeFavorites(arr[0], arr[1], arr[2]);
							saveFavorites($uneval(Favor));
						}
						arr = null;
					});
				});
			}),
			$btn(Lng.remove[lCode], Lng.clrSelected[lCode], function() {
				$each($X('.//tr[@class="DESU_favData"]', $id('DESU_contentFav')), function(el) {
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

function showAlert(el) {
	if(!Cfg['animation']) {
		return;
	}
	if(nav.Anim) {
		el.oclassName = el.className;
		el.className += ' DESU_aOpen';
		return;
	}
	var i = 0,
		showing = setInterval(function() {
			if(!el || i++ > 8) {
				clearInterval(showing);
				showing = i = el = null;
				return;
			}
			var s = el.style;
			s.opacity = i / 10;
			s.paddingTop = (parseInt(s.paddingTop, 10) + 1) + 'px';
			s.paddingBottom = (parseInt(s.paddingBottom, 10) + 1) + 'px';
		}, 30);
	el.style.paddingTop = el.style.paddingBottom = '0px';
	el.style.opacity = 0;
}

function closeAlert(el) {
	if(!el) {
		return;
	}
	if(!Cfg['animation']) {
		$del(el);
		return;
	}
	if(nav.Anim) {
		nav.animEvent(el, function(node) {
			$del(node);
		});
		el.className = el.oclassName + ' DESU_aClose';
		return;
	}
	var i = 8,
		h = el.clientHeight - 18,
		closing = setInterval(function() {
			if(!el || i-- < 0) {
				clearInterval(closing);
				$del(el);
				closing = el = i = h = null;
				return;
			}
			var s = el.style,
				hh = parseInt(s.height, 10) - h / 10;
			s.opacity = i / 10;
			s.paddingTop = (parseInt(s.paddingTop, 10) - 1) + 'px';
			s.paddingBottom = (parseInt(s.paddingBottom, 10) - 1) + 'px';
			s.height = (hh < 0 ? 0 : hh) + 'px';
		}, 30);
	el.style.height = h + 'px';
}

function blinkAlert(el) {
	if(!Cfg['animation']) {
		return;
	}
	if(nav.Anim) {
		nav.animEvent(el, function(node) {
			node.className = node.oclassName;
		});
		el.className = el.oclassName + ' DESU_aBlink';
		return;
	}
	var i = 6,
		blinking = setInterval(function() {
			el.style.opacity = el.style.opacity !== '0' ? 0 : 0.9;
			if(i-- < 0) {
				clearInterval(blinking);
				el = i = null;
			}
		}, 80);
	el.style.opacity = 0.9;
}

function $alert(txt, id, wait) {
	var node,
		el = $id('DESU_alert' + id),
		cMsg = 'DESU_alertMsg' + (wait ? ' DESU_wait' : ''),
		tBtn = wait ? '' : '× ';
	if(el) {
		node = $t('div', el);
		node.innerHTML = txt.trim();
		node.className = cMsg;
		$t('span', el).textContent = tBtn;
		blinkAlert(el);
		return;
	}
	el = $New('div', {'class': aib.pClass, 'id': 'DESU_alert' + id}, [
		$new('span', {
			'class': 'DESU_alertBtn',
			'text': tBtn}, {
			'click': function() {
				closeAlert(this.parentNode);
			}
		}),
		$add('<div class="' + cMsg + '">' + txt.trim() + '</div>')
	]);
	showAlert($id('DESU_alertBox').appendChild(el));
	if(Cfg['closePopups'] && !wait) {
		setTimeout(closeAlert, 4e3, el);
	}
}


/*==============================================================================
								DROPDOWN SELECT MENUS
==============================================================================*/

function addSelMenu(el, fPanel, html) {
	var y, pos,
		pst = getPost(el);
	if(Cfg['attachPanel'] && fPanel) {
		pos = 'fixed';
		y = el.id === 'DESU_btnRefresh' || el.id === 'DESU_btnAudioOff' ?
			'bottom: 25' :
			'top: ' + (el.getBoundingClientRect().top + el.offsetHeight - (nav.Firefox ? .5 : 0));
	} else {
		pos = 'absolute';
		y = 'top: ' + ($offset(el).top + el.offsetHeight - (nav.Firefox ? .5 : 0));
	}
	doc.body.appendChild($event($add(
		'<div class="' + aib.pClass + '" id="DESU_select" style="position: ' + pos + '; ' + (
			el.className === 'DESU_btnSrc' ?
				'left: ' + $offset(el).left :
				'right: ' + (doc.body.clientWidth - $offset(el).left - el.offsetWidth)
		) + 'px; ' + y + 'px;" onmouseout="DESU_delSelection(event)">' + html + '</div>'), {
		'mouseover': function() {
			if(pst && pst.node) {
				markPviewToDel(pst.node, false);
			}
		}
	}));
	return $X('.//div[@id="DESU_select"]//a', doc);
}

function selectSpell(e) {
	$each(addSelMenu(
		e.target, true,
		'<div style="display: inline-block; border-right: 1px solid grey;"><a href="#">' +
			('#b/,#b/itt,#exp ,#exph ,#img ,#imgn ,#name ,#noimg,#notxt,#num ,')
				.split(',').join('</a><a href="#">') +
			'</a></div><div style="display: inline-block;"><a href="#">' +
			('#op,#outrep,#rep ,#sage,#skip ,#theme ,#tmax ,#trip,#video ,#vtag ')
				.split(',').join('</a><a href="#">') + '</a></div>'
	), function(a) {
		a.onclick = function(e) {
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
			$txtInsert($id('DESU_spellEdit'), exp);
		};
	});
}

function selectPostHider(post) {
	if(!Cfg['menuHiddBtn'] || !Cfg['filterThrds'] && post.isOp) {
		return;
	}
	var a = addSelMenu(
		post.Btns.firstChild, false,
		'<a href="#">' + Lng.selHiderMenu[lCode].join('</a><a href="#">') + '</a>'
	);
	a.snapshotItem(1).onclick = function(e) {
		$pd(e);
		applySpells(
			post.Img.snapshotLength === 0 ?
				'#noimg' :
				'#img =' + getImgWeight(post) + '@' + getImgSize(post).join('x')
		)
	};
	a.snapshotItem(2).onclick = function(e) {
		$pd(e);
		hideBySameText(post);
	};
	(a = a.snapshotItem(0)).onclick = function(e) {
		$pd(e);
		applySpells(quotetxt);
	};
	a.onmouseover = function() {
		quotetxt = $txtSelect().trim();
	};
}

function selectExpandThread(post) {
	$each(addSelMenu(
		$x('span[3]', post.Btns), false,
		'<a href="#">' + Lng.selExpandThrd[lCode].join('</a><a href="#">') + '</a>'
	), function(a) {
		a.onclick = function(e) {
			$pd(e);
			loadThread(post, parseInt(this.textContent, 10), null);
		};
	});
}

function selectAjaxPages() {
	$each(addSelMenu(
		$id('DESU_btnRefresh'), true,
		'<a href="#">' + Lng.selAjaxPages[lCode].join('</a><a href="#">') + '</a>'
	), function(a, i) {
		a.onclick = function(e) {
			$pd(e);
			loadPages(i + 1);
		};
	});
}

function selectAudioNotif() {
	if(this.id !== 'DESU_btnAudioOff') {
		return;
	}
	$each(addSelMenu($id('DESU_btnAudioOff'), true,
		'<a href="#">' + Lng.selAudioNotif[lCode].join('</a><a href="#">') + '</a>'
	), function(a, i) {
		a.onclick = function(e) {
			$pd(e);
			Audio.repeat = i === 0 ? 3e4 :
				i === 1 ? 6e4 :
				i === 2 ? 12e4 :
				3e5;
			toggleAudioNotif();
			$id('DESU_btnAudioOff').id = 'DESU_btnAudioOn';
			$del(this.parentNode);
		};
	});
}

function selectImgSearch() {
	var p = this.nextSibling.href + '" target="_blank">' + Lng.search[lCode];
	addSelMenu(
		this, false,
		'<a class="DESU_srcIqdb" href="//iqdb.org/?url=' + p + 'IQDB</a>' +
			'<a class="DESU_srcTineye" href="//tineye.com/search/?url=' + p + 'TinEye</a>' +
			'<a class="DESU_srcGoogle" href="//google.ru/searchbyimage?image_url=' + p + 'Google</a>' +
			'<a class="DESU_srcSaucenao" href="//saucenao.com/search.php?url=' + p + 'SauceNAO</a>'
	);
}


/*==============================================================================
								KEYBOARD NAVIGATION
==============================================================================*/

function initKeyNavig() {
	var pIndex,
		tIndex = 0,
		scrScroll = false,
		pScroll = true,
		tScroll = true,
		findCurrPost = function(posts) {
			for(var i = 0, scrolled = window.pageYOffset; i < posts.length; i++) {
				if($offset(posts[i]).top > scrolled) {
					return i - 1;
				}
			}
		},
		scrollToPost = function(posts, idx, dir, scroll, toTop) {
			var post,
				mIdx = idx;
			while(posts[mIdx].Vis === 0 || posts[mIdx].thr.Vis === 0) {
				mIdx += dir;
			}
			post = posts[mIdx];
			if(mIdx !== idx || scroll) {
				window.scrollTo(
					0, toTop ?
						$offset(post).top :
						$offset(post).top - window.innerHeight / 2 + post.clientHeight / 2
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
		},
		scrollDownToPost = function() {
			if(pIndex !== Posts.length - 1) {
				try {
					pIndex = scrollToPost(
						Posts, pIndex + 1, 1,
						Posts[pIndex + 1].isOp ||
							Posts[pIndex + 1].getBoundingClientRect().top > window.innerHeight / 2 -
								Posts[pIndex + 1].clientHeight / 2,
						false
					);
					pScroll = true;
				} catch(e) {}
			}
		},
		scrollUpToPost = function() {
			try {
				pIndex = scrollToPost(Posts, pIndex <= 0 ? 0 : pIndex - 1, -1, true, false);
				pScroll = true;
			} catch(e) {}
		};

	window.onscroll = function() {
		if(!scrScroll) {
			pScroll = true;
			tScroll = true;
		} else {
			scrScroll = false;
		}
	};

	doc.onkeydown = function (e) {
		var curTh = e.target.tagName,
			kc = e.keyCode;
		if(curTh === 'TEXTAREA' || (curTh === 'INPUT' && e.target.type === 'text')) {
			if(kc === 27) {
				e.target.blur();
			}
			return;
		}
		if(
			e.ctrlKey || e.altKey || e.shiftKey ||
			kc !== 74 && kc !== 75 && kc !== 77 && kc !== 78 && kc !== 86 && kc !== 116
		) {
			return;
		}
		if(kc === 116) {
			if(!TNum) {
				$pd(e);
				loadPages(1);
			}
			return;
		}
		$pd(e);
		if(tScroll) {
			pIndex = !pScroll ? Posts.indexOf(Threads[tIndex]) : findCurrPost(Posts);
		}
		if(!TNum && pScroll) {
			if((Posts[pIndex] || {}).isOp) {
				tIndex = curTh = Threads.indexOf(Posts[pIndex]);
			} else if(tScroll) {
				for(curTh = pIndex <= 0 ? 0 : pIndex; curTh > 0 && !Posts[curTh].isOp; curTh--) {}
				tIndex = curTh = Threads.indexOf(Posts[curTh]);
			} else {
				curTh = tIndex;
			}
		} else {
			curTh = tIndex;
		}
		pScroll = tScroll = false;
		if(kc === 86) {
			if(TNum) {
				showQuickReply(Posts[pIndex]);
			} else if(nav.Firefox) {
				GM_openInTab(getThrdUrl(aib.host, brd, Threads[curTh].Num), false, true);
			} else {
				window.open(getThrdUrl(aib.host, brd, Threads[curTh].Num), '_blank');
			}
			return;
		}
		scrScroll = true;
		if(kc === 75) {
			if(TNum) {
				scrollUpToPost();
			} else {
				try {
					tIndex = scrollToPost(Threads, tIndex <= 0 ? 0 : tIndex - 1, -1, true, true);
					tScroll = true;
				} catch(er) {}
			}
		} else if(kc === 74) {
			if(TNum) {
				scrollDownToPost();
			} else if(tIndex !== Threads.length - 1) {
				try {
					tIndex = scrollToPost(Threads, tIndex + 1, 1, true, true);
					tScroll = true;
				} catch(er) {}
			}
		} else if(!TNum && kc === 77) {
			scrollUpToPost();
		} else if(!TNum && kc === 78) {
			scrollDownToPost();
		}
	};
}


/*==============================================================================
								POSTFORM CHANGES
==============================================================================*/

function refreshCapSrc(src, tNum) {
	if(aib.kus || aib.tinyIb) {
		return src.replace(/\?[^?]+$|$/, (aib._410 ? '?board=' + brd + '&' : '?') + Math.random());
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
	var c = Cfg['sageReply'];
	$id('DESU_sageBtn').innerHTML = '&nbsp;' + (
		c ? '<span class="DESU_btnSage"></span><b style="color: red;">SAGE</b>' : '<i>(no&nbsp;sage)</i>'
	);
	if(pr.mail.type === 'text') {
		pr.mail.value = c ? 'sage' : aib.fch ? 'noko' : '';
	} else {
		pr.mail.checked = c;
	}
}

function setUserName() {
	saveCfg('nameValue', $id('DESU_nameValue').value.replace(/\|/g, ''));
	pr.name.value = $id('DESU_userName').checked ? Cfg['nameValue'] : '';
}

function setUserPassw() {
	var el = $id('DESU_passwValue');
	if(el) {
		saveCfg('passwValue', el.value.replace(/\|/g, ''));
	}
	(pr.dpass || {}).value = pr.passw.value = Cfg['userPassw'] ? Cfg['passwValue'] : $rnd().substring(0, 8);
}

function initPostform() {
	var pArea = $New('center', {'id': 'DESU_parea'}, [
		$New('div', {'id': 'DESU_toggleReply', 'style': 'display: none;'}, [
			$txt('['),
			$new('a', {
				'text': Lng.expandForm[lCode],
				'href': '#',
				'class': 'DESU_aBtn'}, {
				'click': toggleMainReply
			}),
			$txt(']')
		]),
		$New('div', {'id': 'DESU_pform'}, [pr.form, oeForm]),
		$new('hr', null, null)
	]);
	if(TNum && Cfg['addPostForm'] === 1) {
		$after(aib.fch ? $t('hr', dForm) : dForm, pArea);
	} else {
		$before(dForm, [pArea]);
	}
	if(TNum && Cfg['addPostForm'] === 2 || !TNum && Cfg['noThrdForm']) {
		$disp(pArea);
	}
	nav.insAfter(pArea, '<div id="DESU_qarea" class="' + aib.pClass + '" style="display: none;"></div>');
	if(pr.on) {
		doPostformChanges(null, null);
	} else if(oeForm) {
		ajaxGetPosts(null, brd, Posts[0].Num, null, doPostformChanges);
	}
}

function doPostformChanges(m, el) {
	var img, _img, sBtn,
		resMove = function(e) {
			var p = $offset(pr.txta);
			pr.txta.style.width = e.pageX - p.left + 'px';
			pr.txta.style.height = e.pageY - p.top + 'px';
		},
		resStop = function() {
			$revent(doc.body, {'mousemove': resMove, 'mouseup': resStop});
			saveCfg('textaWidth', parseInt(pr.txta.style.width, 10));
			saveCfg('textaHeight', parseInt(pr.txta.style.height, 10));
		};
	pr.form.style.display = 'inline-block';
	pr.form.style.textAlign = 'left';
	$after(pr.txta, $new('div', {
		'id': 'DESU_txtResizer'}, {
		'mousedown': function(e) {
			$pd(e);
			$event(doc.body, {
				'mousemove': resMove,
				'mouseup': resStop
			});
		}
	}));
	addTextPanel();
	pr.txta.style.cssText = 'width: ' + Cfg['textaWidth'] + 'px; height: ' + Cfg['textaHeight'] + 'px;';
	$event(pr.txta, {
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
			var val = pr.txta.value, sVal = Cfg['signatValue'];
			if(Cfg['hideBySpell'] && oSpells.outrep[0]) {
				val = doReplace(oSpells.outrep, val);
			}
			if(Cfg['userSignat'] && sVal !== '') {
				val += '\n' + sVal;
			}
			if(($x('.//span[@class="filetitle"]', pByNum[pr.tNum]) || {}).textContent ===
				'Dollchan Extension Tools' && !/`\n`\-{50}`$/.test(val)) {
				val += '\n\n`--------------------------------------------------`\n' +
					'`' + window.navigator.userAgent + '`\n`v' + Cfg['version'] + '`' +
					'\n`--------------------------------------------------`';
			}
			pr.txta.value = val;
			if(Cfg['checkReply']) {
				$alert(Lng.checking[lCode], 'Upload', true);
			}
			if(Cfg['favOnReply'] && pr.tNum) {
				toggleFavorites(pByNum[pr.tNum], $c('DESU_btnFav', pByNum[pr.tNum].Btns));
			}
			if(pr.tNum) {
				Stat.reply = +Stat.reply + 1;
			} else {
				Stat.op = +Stat.op + 1;
			}
			setStored('DESU_Stat_' + aib.dm, $uneval(Stat));
			if(pr.isQuick) {
				$disp($id('DESU_qarea'));
				$after($id('DESU_toggleReply'), $id('DESU_pform'));
			}
		}
	});
	$each($X('.//input[@type="text"]', pr.form), function(node) {
		node.size = 35;
	});
	if(Cfg['noGoto'] && pr.gothr) {
		$disp(pr.gothr);
	}
	if(Cfg['noPassword'] && pr.passw) {
		$disp($x(pr.tr, pr.passw));
	}
	if(Cfg['userName'] && pr.name) {
		setTimeout(function() {
			pr.name.value = Cfg['nameValue'];
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
				if(!Cfg['captchaLang'] || e.which === 0) {
					return;
				}
				if(Cfg['captchaLang'] === 1) {
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
				$txtInsert(e.target, chr);
			}
		});
		if(!aib.hana && !pr.recap) {
			img = aib.kus ? $x('.//a|.//img', $x(pr.tr, pr.cap)) : $x(pr.tr + '//img', pr.cap);
			_img = $new('img', {
				'alt': Lng.loading[lCode],
				'title': Lng.refresh[lCode],
				'style': 'display: block; border: none; cursor: pointer;',
				'src': refreshCapSrc(
					aib._410 ? ('/faptcha.php?board=' + brd) :
						aib.hid ? ('/securimage/securimage_show.php?' + Math.random()) :
						aib.kus ? '/' + brd.substr(0, brd.indexOf('/') + 1) + 'captcha.php?' + Math.random()
						: (img ? img.src : '/' + brd + '/captcha.pl?key=mainpage&amp;dummy=' + $rnd()),
					TNum || 0
				)}, {
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
	if(Cfg['addSageBtn'] && pr.mail) {
		sBtn = $new('span', {
			'id': 'DESU_sageBtn'}, {
			'click': function(e) {
				e.stopPropagation();
				$pd(e);
				toggleCfg('sageReply');
				doSageBtn();
			}
		});
		m = $x('ancestor::label', pr.mail) || pr.mail;
		if(m.nextElementSibling || m.previousElementSibling) {
			$disp(m);
			$after(m, sBtn);
		} else {
			$disp($x(pr.tr, pr.mail));
			$after(pr.name || pr.subm, sBtn);
		}
		setTimeout(doSageBtn, 0);
	}
	if(Cfg['checkReply']) {
		if(nav.isH5Rep) {
			pr.form.onsubmit = function(e) {
				$pd(e);
				setTimeout(ajaxSubmit, 1e3, pr.form, function(dc, url) {
					checkUpload(findError(dc), url);
				});
			};
			dForm.onsubmit = function(e) {
				$pd(e);
				$alert(Lng.deleting[lCode], 'Deleting', true);
				$each($X('.//input[@type="checkbox"]', dForm), function(node) {
					node.onclick = function() {
						return false;
					};
				});
				ajaxSubmit(dForm, checkDelete);
			};
			aib.rJpeg = !aib.abu && !aib.fch;
		} else {
			if(aib.nul) {
				pr.form.action = pr.form.action.replace(/https/, 'http');
			}
			nav.insAfter(
				$c('DESU_content', doc),
				'<iframe id="DESU_iframe" name="DESU_iframe" src="about:blank" />'
			);
			$rattr($attr(pr.form, {'target': 'DESU_iframe'}), 'onsubmit');
		}
	}
	if(pr.file) {
		eventFiles($x(pr.tr, pr.file));
	}
	if(aib.nul) {
		el = $id('posttypeindicator');
		if(el) {
			$del(el.parentNode);
		}
		pr.cap.style.cssText = 'display: block; float: left; margin-top: 1em;';
	}
}

function eventFiles(tr) {
	$each($X('.//input[@type="file"]', tr), function(el) {
		$event(el, {'change': processInput});
	});
}

function processInput() {
	if(!this.haveBtns) {
		this.haveBtns = true;
		$after(this, $event($add(
			'<button type="button" class="DESU_fileUtil">' + Lng.clear[lCode] + '</button>'), {
			'click': clearInput
		}));
	} else if(this.rarJPEG) {
		this.rarJPEG = null;
		$del(this.nextSibling);
	}
	if(aib.rJpeg) {
		$del($c('DESU_delFile', this.parentNode));
		if(/^image\/(?:png|jpeg)$/.test(this.files[0].type)) {
			$after(this.nextSibling, $event($add(
				'<button type="button" class="DESU_fileUtil DESU_delFile">' +
					Lng.makeRjpeg[lCode] + '</button>'), {
				'click': makeRarJPEG
			}));
		}
	}
	eventFiles($x(pr.tr, this));
}

function clearInput(e) {
	$pd(e);
	var pn = this.parentNode;
	delFileUtils(pn);
	pr.file = $x('input[@type="file"]', $html(pn, pn.innerHTML));
	$event(pr.file, {'change': processInput});
}

function makeRarJPEG(e) {
	$pd(e);
	var el = $id('DESU_arInput'),
		inp = $x('input[@type="file"]', this.parentNode),
		btn = this;
	if(!el) {
		el = doc.body.appendChild($new('input', {
			'id': 'DESU_arInput',
			'type': 'file',
			'style': 'display: none'
		}, null));
	}
	el.onchange = function(e) {
		$del(btn);
		readArch(inp, el.files[0]);
		btn = inp = el = null;
	};
	el.click();
}

function readArch(inp, file) {
	var fr = new FileReader(),
		el = $add(
			'<span class="DESU_fileUtil" style="margin: 0 5px;"><span class="DESU_wait"></span>' +
				Lng.wait[lCode] + '</span>'
		);
	$after(inp, el);
	fr.onload = function() {
		if(inp.nextSibling === el) {
			$attr(el, {
				'style': 'font-weight: bold; margin: 0 5px;',
				'title': inp.files[0].name + ' + ' + file.name,
				'text': 'RarJPEG'
			});
			inp.rarJPEG = this.result;
			el = inp = file = null;
		}
	};
	fr.readAsArrayBuffer(file);
}

function delFileUtils(el) {
	var els = el.getElementsByClassName('DESU_fileUtil'),
		i = els.length - 1;
	for(; i >= 0; i--) {
		$del(els[i]);
	}
	$each($X('.//input[@type="file"]', el), function(elm) {
		elm.rarJPEG = null;
	});
}


/*==============================================================================
							ONSUBMIT REPLY / DELETE CHECK
==============================================================================*/

function findError(dc) {
	var err = '',
		txt = '',
		xp =
			aib.hana && !dc.getElementById('delete_form') ? './/td[@class="post-error"]' :
			aib.krau && !$t('form', dc) ? './/td[starts-with(@class,"message_text")]' :
			aib.abu && !dc.getElementById('delform') ? './/font[@size="5"]' :
			'';
	if(dc.body.firstChild && (xp || !$t('form', dc))) {
		if(!xp) {
			xp =
				aib.kus ? './/h1|.//h2|.//div[contains(@style,"1.25em")]' :
				aib.fch ? './/table//font/b' :
				aib.gazo ? './/font[@size="5"]' :
				aib._420 ? './/pre' :
				'';
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
		txt = null;
		if(/обновл|successful!|uploaded!/i.test(err)) {
			err = '';
		}
	}
	return err;
}

function checkUpload(err, url) {
	var tNum, file,
		qArea = $id('DESU_qarea'),
		lFunc = function() {
			closeAlert($id('DESU_alertUpload'));
		};
	if(err !== '') {
		if(pr.isQuick) {
			$disp(qArea);
			qArea.appendChild($id('DESU_pform'));
		}
		if(aib.hana && /подтвердите, что вы человек/.test(err)) {
			pr.cap.value = '';
			pr.cap.focus();
			refreshCapImg(pr.tNum);
		}
		$alert(err, 'Upload', false);
		return;
	}
	pr.txta.value = '';
	if(pr.file) {
		file = $x(pr.tr, pr.file);
		delFileUtils(file);
		file = $html(file, file.innerHTML);
		pr.file = $x('.//input[@type="file"]', file);
		eventFiles(file);
	}
	if(pr.video) {
		pr.video.value = '';
	}
	if(pr.tNum) {
		tNum = pr.tNum;
		showMainReply();
		if(!TNum) {
			loadThread(pByNum[tNum], 5, lFunc);
		} else {
			loadNewPosts(false, lFunc);
		}
		if(pr.cap) {
			pr.cap.value = '';
			refreshCapImg(tNum);
		}
	} else {
		window.location = !aib.fch ? url : $t('meta', dc).content.match(/http:\/\/[^"]+/)[0];
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
			$alert(allDel ? Lng.succDeleted[lCode] : Lng.errDelete[lCode], 'Deleting', false);
			allDel = null;
		};
	if(TNum) {
		loadNewPosts(false, cbFunc);
	} else {
		//TODO: add !TNum delete checking
		cbFunc();
	}
}

function ajaxSubmit(form, fn) {
	var fd = new dataForm();
	$each($X('.//input[not(@type="submit")]|.//textarea|.//select', form), fd.append.bind(fd));
	fd.send(form.action, fn);
}

function toBlob(arr) {
	try {
		return new Blob(arr);
	} catch(e) {
		var bb = nav.Firefox ? new MozBlobBuilder() : new WebKitBlobBuilder(),
			i = 0,
			len = arr.length;
		while(i < len) {
			bb.append(arr[i++]);
		}
		return bb.getBlob();
	}
}

function processImage(arr, force) {
	var i = 0,
		j = 0,
		dat = new Uint8Array(arr),
		len = dat.length,
		out,
		rExif = !!Cfg['removeEXIF'];
	if(!Cfg['postSameImg'] && !rExif && !force) {
		return [arr];
	}
	if(dat[0] === 0xFF && dat[1] === 0xD8) {
		for(; i < len - 1; i++, j++) {
			if(dat[i] === 0xFF) {
				if(rExif && (dat[i + 1] >> 4) === 0xE && dat[i + 1] !== 0xE0) {
					i += 2 + (dat[i + 2] << 8) + dat[i + 3];
				} else if(dat[i + 1] === 0xD9) {
					dat[j] = dat[i];
					break;
				}
			}
			if(j !== i) {
				dat[j] = dat[i];
			}
		}
		j += 2;
		i += 2;
		if(j !== i) {
			dat[j - 1] = dat[i - 1];
			if(!force && len - j > 75) {
				for(; i < len; dat[j++] = dat[i++]);
			}
		} else if(j === len || (!force && len - j > 75)) {
			return [arr];
		}
	} else if(dat[0] === 0x89 && dat[1] === 0x50) {
		for(; j < len - 7; j++) {
			if(dat[j] === 0x49 && dat[j + 1] === 0x45 && dat[j + 2] === 0x4E && dat[j + 3] === 0x44) {
				j += 8;
				break;
			}
		}
		if(j === len || (!force && len - j > 75)) {
			return [arr];
		}
	} else {
		return null;
	}
	out = new Uint8Array(j);
	for(i = 0; i < j; i++) {
		out[i] = dat[i];
	}
	return [out.buffer];
}

/** @constructor */
function dataForm() {
	this.boundary = '---------------------------' + Math.round(Math.random() * 1e11);
	this.data = [];
	this.busy = 0;
	this.error = false;
}

dataForm.prototype.append = function(el) {
	if(el.type === 'file') {
		if(el.files.length > 0) {
			this.data.push(
				'--' + this.boundary + '\r\n' + 'Content-Disposition: form-data; name="' +
					el.name + '"; filename="' + el.files[0].name + '"\r\n' + 'Content-type: ' +
					el.files[0].type + '\r\n\r\n', null, '\r\n'
			);
			this.readFile(el, this.data.length - 2);
		}
	} else if(!(el.type === 'checkbox' && !el.checked)) {
		this.data.push(
			'--' + this.boundary + '\r\n' + 'Content-Disposition: form-data; name="' +
				el.name + '"\r\n\r\n' + el.value + '\r\n'
		);
	}
};

dataForm.prototype.readFile = function(el, idx) {
	var fr = new FileReader(),
		file = el.files[0],
		dF = this;
	if(!/^image\/(?:png|jpeg)$/.test(file.type)) {
		this.data[idx] = file;
		return;
	}
	fr.onload = function() {
		var dat = processImage(this.result, !aib.rJpeg || !!el.rarJPEG);
		if(!dat) {
			dF.error = true;
			$alert(Lng.fileCorrupt[lCode] + file.name, 'Upload', false);
		} else {
			if(el.rarJPEG) {
				dat.push(el.rarJPEG);
			}
			if(Cfg['postSameImg']) {
				dat.push(String(Math.round(Math.random() * 1e6)));
			}
			dF.data[idx] = toBlob(dat);
			dF.busy--;
		}
		fr = dF = el = idx = file = null;
	};
	fr.readAsArrayBuffer(file);
	this.busy++;
};

dataForm.prototype.send = function(url, fn) {
	if(this.error) {
		return;
	}
	if(this.busy > 0) {
		setTimeout(this.send.bind(this), 200, url, fn);
		return;
	}
	var headers = {'Content-type': 'multipart/form-data; boundary=' + this.boundary};
	if(nav.Firefox) {
		headers['Referer'] = '' + doc.location;
	}
	this.data.push('--' + this.boundary + '--\r\n');
	GM_xmlhttpRequest({
		'method': 'POST',
		'headers': headers,
		'data': toBlob(this.data),
		'url': nav.fixLink(url),
		'onreadystatechange': function(xhr) {
			if(xhr.readyState !== 4) {
				return
			}
			if(xhr.status === 200) {
				fn($toDOM(xhr.responseText), xhr.finalUrl);
				fn = null;
			} else {
				$alert(
					xhr.status === 0 ? Lng.noConnect[lCode] : 'HTTP [' + xhr.status + '] ' + xhr.statusText,
					'Upload', false
				);
			}
		}
	});
};


/*==============================================================================
									QUICK REPLY
==============================================================================*/

function showQuickReply(post) {
	var tNum = post.thr.Num,
		qArea = $id('DESU_qarea');
	pr.tNum = tNum;
	if(pr.isQuick) {
		if(aib.getWrap(post).nextElementSibling === qArea) {
			$disp(qArea);
			showMainReply();
			return;
		}
	} else {
		pr.isQuick = true;
		qArea.appendChild($id('DESU_pform'));
		$disp($id('DESU_toggleReply'));
		if(!TNum && !aib.kus && !aib.hana && !aib.ylil) {
			$del($x('.//input[@id="thr_id" or @name="parent"]', pr.form));
			$before(pr.form.firstChild, [
				$add('<input type="hidden" id="thr_id" value="' + tNum + '" name="' + (
					aib.fch || aib.gazo ? 'resto' :
					aib.tiny ? 'thread' :
					'parent'
				) + '">')
			]);
			if(oeForm) {
				$del($x('.//input[@name="oek_parent"]', oeForm));
				$before(oeForm.firstChild, [
					$add('<input type="hidden" value="' + tNum + '" name="oek_parent">')
				]);
			}
		}
	}
	$after(aib.getWrap(post), qArea);
	qArea.style.display = '';
	if(!TNum) {
		toggleQuickReply(tNum);
		if(Cfg['noThrdForm']) {
			$id('DESU_parea').style.display = 'none';
		}
	}
	if(pr.cap && !pr.recap && !aib.kus) {
		refreshCapImg(tNum);
	}
	if(aib._420 && pr.txta.value === 'Comment') {
		pr.txta.value = '';
	}
	$txtInsert(pr.txta, '>>' + post.Num + quotetxt.replace(/(?:^|\n)(.)/gm, '\n> $1') + '\n');
}

function showMainReply() {
	if(pr.isQuick) {
		var el = $id('DESU_toggleReply'),
			qArea = $id('DESU_qarea');
		pr.isQuick = false;
		if(!TNum) {
			toggleQuickReply(0);
			$del($x('.//input[@id="thr_id"]', pr.form));
		}
		$disp(el);
		qArea.style.display = 'none';
		$after($id('DESU_parea'), qArea);
		$after(el, $id('DESU_pform'));
	}
}

function toggleQuickReply(tNum) {
	$x('.//input[@id="thr_id" or contains(@name,"thread")]', pr.form).value = tNum;
	if(oeForm) {
		$x('.//input[@name="oek_parent" or @name="replyto"]', oeForm).value = tNum;
	}
	if(aib.pony) {
		$x('.//input[@name="quickreply"]', pr.form).value = tNum || '';
	}
}

function toggleMainReply(e) {
	var pArea = $id('DESU_parea');
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
		e.stopPropagation();
		$pd(e);
		if(!TNum && Cfg['noThrdForm'] && !pr.isQuick) {
			$id('DESU_parea').style.display = '';
		}
		if(TNum && Cfg['addPostForm'] === 2 && !pr.isQuick) {
			showQuickReply(pByNum[pNum]);
		} else {
			if(aib._420 && pr.txta.value === 'Comment') {
				pr.txta.value = '';
			}
			$txtInsert(pr.txta, '>>' + pNum);
		}
	}
}


/*==============================================================================
								TEXT FORMATTING BUTTONS
==============================================================================*/

function addTextPanel() {
	if(!pr.txta) {
		return;
	}
	var bbBrds = aib.kus || aib.abu || aib.krau || aib._420,
		tagTable = {
			'Bold': [aib._420 ? '**' : bbBrds ? 'b' : '**', 'B'],
			'Italic': [aib._420 ? '*' : bbBrds ? 'i' : '*', 'i'],
			'Under': [bbBrds ? 'u' : '__', 'U'],
			'Strike': [bbBrds ? 's' : aib._410 ? '^^' : '', 'S'],
			'Spoil': [aib._420 ? '%' : bbBrds || aib.fch ? 'spoiler' : '%%', '%'],
			'Code': [aib.krau ? 'aa' : aib._420 ? 'pre' : bbBrds ? 'code' : '`', 'C'],
			'Quote': [,'&gt;']
		},
		txtBtn = function(id) {
			var x = pr.txta,
				btn = $id('DESU_btn' + id),
				val = tagTable[id][1];
			if(!btn) {
				btn = $new('span', {'id': 'DESU_btn' + id, 'title': Lng.txtBtn[id][lCode]}, null);
				if(val !== '&gt;') {
					btn.onclick = function(e) {
						var tag1, tag2, j, len,
							start = x.selectionStart,
							end = x.selectionEnd,
							scrtop = x.scrollTop,
							text = x.value.substring(start, end).split('\n'),
							i = text.length,
							tag = tagTable[this.id.substring(8)][0];
						$pd(e);
						if(bbBrds || (aib.fch && tag === 'spoiler')) {
							tag1 = '[' + tag + ']';
							tag2 = '[/' + tag + ']';
						} else {
							tag1 = tag2 = tag;
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
					};
				} else {
					btn.onmouseover = function() {
						quotetxt = $txtSelect();
					};
					btn.onclick = function(e) {
						var start = x.selectionStart,
							end = x.selectionEnd;
						$pd(e);
						$txtInsert(x, '> ' + (
							start === end ? quotetxt: x.value.substring(start, end)
						).replace(/\n/gm, '\n> '));
					};
				}
				$id('DESU_txtPanel').appendChild(btn);
			}
			btn.innerHTML =
				Cfg['addTextBtns'] === 2 ? (
					(val === 'B' ? '[ ' : '') + '<a href="#">' + val + '</a>' + (val !== '&gt;' ? ' / ' : ' ]')
				) :
				Cfg['addTextBtns'] === 3 ?
					('<input type="button" value="' + val + '" style="font-weight: bold;" />') :
				'';
			return txtBtn;
		};
	$after(
		Cfg['txtBtnsLoc'] ? $id('DESU_txtResizer') :
			aib._420 ? $c('popup', pr.form) :
			pr.subm,
		$attr($id('DESU_txtPanel') || $new('span', {'id': 'DESU_txtPanel'}, null), {
			'lang': (!Cfg['addTextBtns'] ? 'en' : !Cfg['txtBtnsLoc'] ? 'ru' : '')
		})
	);
	txtBtn('Bold')('Italic');
	if(!aib._420) {
		txtBtn('Under')('Strike');
	}
	txtBtn('Spoil')('Code')('Quote');
}


/*==============================================================================
								FOR POSTS AND THREADS
==============================================================================*/

function getPost(el) {
	return $x('ancestor::*[contains(@class," DESU_post") or contains(@class," DESU_oppost")]', el);
}

function getImages(post) {
	return $X('.//img[@class="thumb" or contains(@src,"thumb") or contains(@src,"/spoiler") or starts-with(@src,"blob:")]', post);
}

function getTitle(post) {
	var title = $c(aib.cTitle, post);
	return title && title.textContent.trim() || post.Text.substring(0, 70).replace(/\s+/g, ' ');
}

function getText(el) {
	return (
		el.innerText ||
			el.innerHTML
				.replace(/<\/?(?:br|p|li)[^>]*?>/gi,'\n')
				.replace(/<[^>]+?>/g,'')
				.replace(/&gt;/g, '>')
				.replace(/&lt;/g, '<')
	).trim();
}

function getImgWeight(post) {
	var inf = aib.getImgInfo(post).textContent.match(/\d+[\.\d\s|m|k|к]*[b|б]/i)[0],
		w = parseFloat(inf.match(/[\d|\.]+/));
	if(/MB/.test(inf)) {
		w = w * 1e3;
	}
	if(/\d[\s]*B/.test(inf)) {
		w = (w / 1e3).toFixed(2);
	}
	return +w;
}

function getImgSize(post) {
	var el = aib.getImgInfo(post),
		m = el ? el.textContent.match(/\d+[x×]\d+/) : false;
	return m ? m[0].split(/[x×]/) : [null, null];
}

/*==============================================================================
									POST BUTTONS
==============================================================================*/

function prepareButtons() {
	addContentScript(
		'function DESU_hideClick(el) {\
			window.postMessage("D" + el.parentNode.id.substring(9), "*");\
		}\
		function DESU_hideOver(el) {\
			window.postMessage("A" + el.parentNode.id.substring(9), "*");\
		}\
		function DESU_delSelection(e) {\
			if(e.relatedTarget && !document.evaluate("ancestor-or-self::div[@id=\'DESU_select\']", e.relatedTarget, null, 3, null).booleanValue) {\
				var el = document.getElementById("DESU_select");\
				if(el) {\
					el.parentNode.removeChild(el);\
				}\
			}\
		}\
		function DESU_qReplyClick(el) {\
			window.postMessage("F" + el.parentNode.id.substring(9), "*");\
		}\
		function DESU_qReplyOver(el) {\
			window.postMessage("C" + el.parentNode.id.substring(9), "*");\
		}\
		function DESU_expandClick(el) {\
			window.postMessage("E" + el.parentNode.id.substring(9), "*");\
		}\
		function DESU_expandOver(el) {\
			window.postMessage("B" + el.parentNode.id.substring(9), "*");\
		}\
		function DESU_favorClick(el) {\
			window.postMessage("G" + el.parentNode.id.substring(9), "*");\
		}\
		function DESU_sageClick(el) {\
			window.postMessage("H" + el.parentNode.id.substring(9), "*");\
		}'
	);
	window.addEventListener('message', function(event) {
		var name = event.data[0],
			data = event.data.substring(1);
		if(name === "A") {
			selectPostHider(pByNum[+data]);
		} else if(name === "B") {
			selectExpandThread(pByNum[+data]);
		} else if(name === "C") {
			quotetxt = $txtSelect();
		} else if(name === "D") {
			togglePostVisib(pByNum[+data]);
		} else if(name === "E") {
			loadThread(pByNum[+data], 1, null);
		} else if(name === "F") {
			showQuickReply(pByNum[+data]);
		} else if(name === "G") {
			toggleFavorites(pByNum[+data], $c('DESU_btnFav', pByNum[+data]) || $c('DESU_btnFavSel', pByNum[+data]));
		} else if(name === "H") {
			applySpells('#sage');
		} else if(name === 'I') {
			data = data.split('|');
			name = $id(data[0]);
			$del(name.nextSibling);
			$c('DESU_content', doc).style.overflowY = 'scroll';
			name.style.height = (+data[1] + Math.sqrt(0.6 * data[1]) + 55) + 'px';
		} else if(name === 'J') {
			data = data.split('$#$');
			checkUpload(data[0], data[1]);
			$id('DESU_iframe').src = 'about:blank';
		}
	}, false);
}

function addPostButtons(post) {
	var h, ref = aib.getRef(post),
		html = '<span class="DESU_postPanel' + (post.isOp ? '_op' : '') + '" id="DESU_btns' + post.Num + '"><span class="DESU_btnHide" onclick="DESU_hideClick(this)" onmouseover="DESU_hideOver(this)" onmouseout="DESU_delSelection(event)"></span>' + (pr.on || oeForm ? '<span class="DESU_btnRep" onclick="DESU_qReplyClick(this)" onmouseover="DESU_qReplyOver(this)"></span>' : '');
	if(post.isOp) {
		h = aib.host;
		if(!TNum) {
			html += '<span class="DESU_btnExpthr" onclick="DESU_expandClick(this)" onmouseover="DESU_expandOver(this)" onmouseout="DESU_delSelection(event)"></span>';
		}
		if(Favor[h] && Favor[h][brd] && Favor[h][brd][post.Num]) {
			html += '<span class="DESU_btnFavSel" onclick="DESU_favorClick(this)"></span>';
			Favor[h][brd][post.Num].cnt = post.thr.pCount;
		} else {
			html += '<span class="DESU_btnFav" onclick="DESU_favorClick(this)"></span>';
		}
	}
	nav.insAfter(ref, html + (aib.getSage(post) ? '<span class="DESU_btnSage" title="SAGE" onclick="DESU_sageClick(this)"></span></span>' : '</span>'));
	post.Btns = ref.nextSibling;
	if(pr.on && Cfg['insertNum']) {
		if(aib.futr || (aib.nul && TNum)) {
			$each($X('a', ref), function(el) {
				el.onclick = null;
			});
		}
		if(!aib.brit) {
			ref.onclick = insertRefLink;
		}
	}
}

/*==============================================================================
									TIME CORRECTION
==============================================================================*/

/** @constructor */
function dateTime(pattern, timeDiff) {
	if(dateTime.checkPattern(pattern)) {
		this.disabled = true;
		return;
	}
	this.regex = pattern
		.replace(/(?:[sihdny]\?){2,}/g, function() {
			return '(?:' + arguments[0].replace(/\?/g, '') + ')?';
		})
		.replace(/\-/g, '[^<]')
		.replace(/\+/g, '[^0-9]')
		.replace(/([sihdny]+)/g, '($1)')
		.replace(/[sihdny]/g, '\\d')
		.replace(/m|w/g, '([a-zA-Zа-яА-Я]+)');
	this.pattern = pattern.replace(/[\?\-\+]+/g, '').replace(/([a-z])\1+/g, '$1');
	this.diff = parseInt(timeDiff, 10);
}

dateTime.toggleSettings = function() {
	var el = $id('DESU_correctTime');
	if(el.checked && (!/^[+-]\d{1,2}$/.test(Cfg['timeOffset']) || this.checkPattern(Cfg['timePattern']))) {
		$alert(Lng.cTimeError[lCode], 'TimeErr', false);
		saveCfg('correctTime', 0);
		el.checked = false;
	}
};

dateTime.checkPattern = function(val) {
	return /[^\?\-\+sihdmwny]|mm|ww/.test(val);
};

dateTime.prototype.init = function(txt) {
	if(this.inited || this.disabled) {
		return this;
	}
	var i = 1, j = 0, k, a, str,
		m = txt.match(new RegExp(this.regex));
	if(!m) {
		this.disabled = true;
		return this;
	}
	this.rPattern = '';
	str = m[0];
	while(a = m[i++]) {
		k = str.indexOf(a, j);
		this.rPattern += str.substring(j, k) + '_' + this.pattern[i - 2];
		j = k + a.length;
	}
	this.inited = true;
	return this;
};

dateTime.prototype.fix = function(txt) {
	if(this.disabled) {
		return txt;
	}
	var arrW = Lng.week[lCode],
		arrM = Lng.month[lCode],
		tPat = this.pattern,
		tRPat = this.rPattern,
		diff = this.diff,
		pad2 = function(num) {
			return num < 10 ? '0' + num : num;
		};
	txt = txt.replace(new RegExp(this.regex, 'g'), function() {
		var i, a, t, second, minute, hour, day, month, year, dtime;
		for(i = 1; i < 8; i++) {
			a = arguments[i];
			t = tPat[i - 1];
			t === 's' ? second = a :
			t === 'i' ? minute = a :
			t === 'h' ? hour = a :
			t === 'd' ? day = a :
			t === 'n' ? month = a - 1 :
			t === 'y' ? year = a :
			t === 'm' && (
				month =
					/янв|jan/i.test(a) ? 0 :
					/фев|feb/i.test(a) ? 1 :
					/мар|mar/i.test(a) ? 2 :
					/апр|apr/i.test(a) ? 3 :
					/май|may/i.test(a) ? 4 :
					/июн|jun/i.test(a) ? 5 :
					/июл|jul/i.test(a) ? 6 :
					/авг|aug/i.test(a) ? 7 :
					/сен|sep/i.test(a) ? 8 :
					/окт|oct/i.test(a) ? 9 :
					/ноя|nov/i.test(a) ? 10 :
					/дек|dec/i.test(a) && 11
			);
		}
		dtime = new Date(year.length === 2 ? '20' + year : year, month, day, hour, minute, second || 0);
		dtime.setHours(dtime.getHours() + diff);
		return tRPat
			.replace('_s', pad2(dtime.getSeconds()))
			.replace('_i', pad2(dtime.getMinutes()))
			.replace('_h', pad2(dtime.getHours()))
			.replace('_d', pad2(dtime.getDate()))
			.replace('_w', arrW[dtime.getDay()])
			.replace('_n', pad2(dtime.getMonth() + 1))
			.replace('_m', arrM[dtime.getMonth()])
			.replace('_y', year.length === 2 ? ('' + dtime.getFullYear()).substring(2) : dtime.getFullYear());
	});
	arrW = arrM = tPat = tRPat = diff = pad2 = null;
	return txt;
};


/*==============================================================================
							ON LINKS VIDEO / MP3 PLAYERS
==============================================================================*/

function getTubeVideoLinks(id, fn) {
	GM_xmlhttpRequest({'method': 'GET', 'url': 'https://www.youtube.com/watch?v=' + id, 'onload': function(xhr) {
		var i, group, len, elem, result1, result2, src,
			sep1 = '%2C',
			sep2 = '%26',
			sep3 = '%3D',
			url = [],
			formats = xhr.responseText.match(/\"url_encoded_fmt_stream_map\":\s*\"([^\"]+)\"/);
		if(!formats) {
			fn(false);
			fn = null;
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
		fn = null;
	}});
}

function addTubeEmbed(el, id, time) {
	var wh = ' width="' + Cfg['YTubeWidth'] + '" height="' + Cfg['YTubeHeigh'] + '" />';
	el.innerHTML = Cfg['YTubeType'] === 1 ?
		'<iframe type="text/html" src="https://www.youtube.com/embed/' + id +
			(Cfg['YTubeHD'] ? '?hd=1&' : '?') + 'start=' + time + '&html5=1" frameborder="0"' + wh :
		'<embed type="application/x-shockwave-flash" src="https://www.youtube.com/v/' + id +
			(Cfg['YTubeHD'] ? '?hd=1&' : '?') + 'start=' + time + '" wmode="transparent"' + wh;
}

function addTubePlayer(el, m) {
	var id = m[1],
		time = (m[2] ? m[2] * 3600 : 0) + (m[3] ? m[3] * 60 : 0) + (m[4] ? m[4] : 0);
	if(Cfg['YTubeType'] !== 2) {
		addTubeEmbed(el, id, time);
		return;
	}
	getTubeVideoLinks(id, function(url) {
		var src = url ? (!Cfg['YTubeHD'] ? url[43] : url[45] || url[44] || url[43]) : false;
		if(!src) {
			addTubeEmbed(el, id, time);
			return;
		}
		el.innerHTML = '<video poster="https://i.ytimg.com/vi/' + id +
			'/0.jpg" controls="controls" preload="none" src="' + src +
			(nav.Firefox && nav.Firefox < 14 ? '&' + Math.random() : '') +
			'" width="' + Cfg['YTubeWidth'] + '" height="' + Cfg['YTubeHeigh'] + '"></video>';
		el = el.firstChild;
		addTubeEmbed(el, id, time);
		if(time !== 0) {
			el.onloadedmetadata = function() {
				this.currentTime = time;
				time = null;
			};
		}
	});
}

function addTubePreview(el, m) {
	el.innerHTML = '<a href="https://www.youtube.com/watch?v=' + m[1] +
		'" target="_blank"><img src="https://i.ytimg.com/vi/' + m[1] +
		'/0.jpg" width="360" height="270" /></a>';
	el.firstChild.onclick = function(e) {
		if(Cfg['addYouTube'] !== 4) {
			$pd(e);
			addTubePlayer(this.parentNode, m);
		}
	};
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
	} else if(Cfg['addYouTube'] > 2 && !$xb('a[contains(@href,"' + m[1] + '")]', el)) {
		addTubePreview(el, m);
	} else {
		addTubePlayer(el, m);
	}
}

function addLinkTube(post) {
	if(!Cfg['addYouTube']) {
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
		var pst, el, msg, pWrap,
			m = link.href.match(getTubePattern());
		if(!m) {
			return;
		}
		link.href = link.href.replace(/^http:/, 'https:');
		pst = post || getPost(link);
		el = $c('DESU_ytObj', pst);
		if(!el) {
			el = $new('div', {'class': 'DESU_ytObj'}, null);
			if(Cfg['addYouTube'] > 2) {
				addTubePreview(el, m);
			} else if(Cfg['addYouTube'] === 2) {
				addTubePlayer(el, m);
			}
			msg = pst.Msg || aib.getMsg(pst);
			pWrap = aib.picWrap && $x('div[' + aib.picWrap + '][last()]', pst);
			if(pWrap) {
				$after(pWrap, el);
			} else if(msg) {
				$before(msg, [el]);
			} else {
				pst.appendChild(el);
			}
		}
		link.className = 'DESU_ytLink';
		link.onclick = clickTubeLink;
		if(!(nav.Opera && nav.Opera < 12) && Cfg['YTubeTitles']) {
			GM_xmlhttpRequest({
				'method': 'GET',
				'url': 'https://gdata.youtube.com/feeds/api/videos/' + m[1] +
					'?alt=json&fields=title/text(),media:group/media:keywords',
				'onload': function(xhr) {
					try {
						var json = JSON.parse(xhr.responseText)['entry'];
						filterTube(pst, link.textContent = json['title']['$t'],
							link.rel = json['media$group']['media$keywords']['$t'] + ',');
						link = pst = null;
					} catch(e) {}
				}
			});
		} else {
			link.textContent = link.textContent.replace(/^http:/, 'https:');
		}
	});
}

function filterTube(post, text, tags) {
	var t, i,
		fHide = (function(a) {
			return a ? hidePost : function(b, c) {};
		})(Cfg['hideBySpell'] === 1);
	for(i = 0; t = oSpells.video[i]; i++) {
		if($toRegExp(t).test(text)) {
			fHide(post, '#video ' + t);
			post.tHide = 1;
			clearTimeout(hideTubeDelay);
			hideTubeDelay = setTimeout(saveHiddenPosts, 500);
			return;
		}
	}
	for(i = 0; t = oSpells.vtag[i]; i++) {
		if(tags.indexOf(t) !== -1) {
			fHide(post, '#vtag ' + t.substring(0, t.length - 1));
			post.tHide = 1;
			clearTimeout(hideTubeDelay);
			hideTubeDelay = setTimeout(saveHiddenPosts, 500);
			return;
		}
	}
}

function unHideTube() {
	Posts.forEach(function(post) {
		if(post.tHide === 1) {
			unhidePost(post);
			post.tHide = 0;
		}
	});
}

function hideTube() {
	if(!Cfg['YTubeTitles']) {
		return;
	}
	$each($X('.//a[contains(@href,"youtu")]', dForm), function(link) {
		var i, t, post, val;
		for(i = 0, val = link.textContent; t = oSpells.video[i++];) {
			if($toRegExp(t).test(val)) {
				post = getPost(link);
				hidePost(post, '#video ' + t);
				post.tHide = 1;
				return
			}
		}
		for(i = 0, val = link.rel; t = oSpells.vtag[i++];) {
			if(val.indexOf(t) !== -1) {
				post = getPost(link);
				hidePost(post, '#vtag ' + t.substring(0, t.length - 1));
				post.tHide = 1;
				return
			}
		}
	});
}

function addLinkMP3(post) {
	if(!Cfg['addMP3']) {
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
			$html(el, el.innerHTML + '<object data="//junglebook2007.narod.ru/audio/player.swf" type="application/x-shockwave-flash" wmode="transparent" width="220" height="16" FlashVars="playerID=1&amp;bg=0x808080&amp;leftbg=0xB3B3B3&amp;lefticon=0x000000&amp;rightbg=0x808080&amp;rightbghover=0x999999&amp;rightcon=0x000000&amp;righticonhover=0xffffff&amp;text=0xffffff&amp;slider=0x222222&amp;track=0xf5f5dc&amp;border=0x666666&amp;loader=0x7fc7ff&amp;loop=yes&amp;autostart=no&amp;soundFile=' + link.href + '" /><br>');
		}
	});
}


/*==============================================================================
									IMAGES VIEWER
==============================================================================*/

function makeMoveable(el) {
	var elMove = function(e) {
			el.style.left = e.clientX - el.curX + 'px';
			el.style.top = e.clientY - el.curY + 'px';
			el.moved = true;
		},
		elStop = function() {
			$revent(doc.body, {'mousemove': elMove, 'mouseup': elStop});
		};
	el.onmousedown = function(e) {
		$pd(e);
		el.curX = e.clientX - parseInt(el.style.left, 10);
		el.curY = e.clientY - parseInt(el.style.top, 10);
		$event(doc.body, {
			'mousemove': elMove,
			'mouseup': elStop
		});
	};
}

function resizeImg(e) {
	var curX = e.clientX,
		curY = e.clientY,
		oldL = parseInt(this.style.left, 10),
		oldT = parseInt(this.style.top, 10),
		oldW = this.width,
		oldH = this.height,
		d = nav.Opera || nav.WebKit ? e.wheelDelta : -e.detail,
		newW = parseInt(this.width * (d > 0 ? 1.25 : 0.8), 10),
		newH = parseInt(this.height * (d > 0 ? 1.25 : 0.8), 10);
	$pd(e);
	this.width = newW;
	this.height = newH;
	this.style.left = parseInt(curX - (newW/oldW) * (curX - oldL), 10) + 'px';
	this.style.top = parseInt(curY - (newH/oldH) * (curY - oldT), 10) + 'px';
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
	if(Cfg['expandImgs'] === 1 && !$xb('img[contains(@style,"fixed")]', a)) {
		$disp($t('img', a));
	}
	if(full) {
		if(!full.moved) {
			$disp(full);
			setTimeout($del, 0, full);
		} else {
			full.moved = false;
		}
		return;
	}
	if(Cfg['expandImgs'] === 1) {
		scrW -= $offset(a).left + 25;
	} else {
		$del($c('DESU_cFullImg', doc));
	}
	if(fullW && fullH) {
		newW = fullW < scrW ? fullW : scrW;
		newH = newW * fullH / fullW;
		if(Cfg['expandImgs'] === 2 && newH > scrH) {
			newH = scrH;
			newW = newH * fullW / fullH;
		}
	}
	full = a.appendChild($add(
		'<img class="DESU_fullImg" src="' + a.href + '" alt="' + a.href + '" width="' + newW +
			'" height="' + newH + '"/>'
	));
	if(Cfg['expandImgs'] === 2) {
		full.className += ' DESU_cFullImg';
		full.style.cssText = 'left: ' + (scrW - newW) / 2 + 'px; top: ' + (scrH - newH) / 2 + 'px;';
		full.addEventListener(
			nav.Opera || nav.WebKit ? 'mousewheel' : 'DOMMouseScroll',
			resizeImg, false
		);
		makeMoveable(full);
	}
}

function addLinkImg(el) {
	if(!Cfg['addImgs']) {
		return;
	}
	$each($X(
		aib.xMsg + '//a[contains(@href,".jpg") or contains(@href,".png") or contains(@href,".gif")]',
		el
	), function(link) {
		if($xb('ancestor::small', link)) {
			return;
		}
		var a = link.cloneNode(false);
		a.target = '_blank';
		$disp(a);
		a.appendChild($new('img', {
			'class': 'DESU_preImg',
			'src': a.href,
			'alt': a.href}, {
			'load': function() {
				var fullW, fullH, k;
				$disp(this.parentNode);
				fullW = this.width;
				fullH = this.height;
				this.title = fullW + 'x' + fullH;
				if(fullW <= 200 && fullH <= 200) {
					return;
				}
				k = fullW/fullH;
				this.width = k < 1 ? 200 * k : 200;
				this.height = k < 1 ? 200 : 200/k;
			}
		}));
		a.onclick = function(e) {
			if(Cfg['expandImgs'] && e.button !== 1) {
				$pd(e);
				addFullImg(this, this.firstChild.title.split('x'), null);
			}
		};
		$before(link, [a]);
	});
}

function addImgSearch(el) {
	if(!Cfg['imgSrcBtns']) {
		return;
	}
	$each($X(aib.xImages, el), function(link) {
		if(/google\.|tineye\.com|iqdb\.org/.test(link.href)) {
			$del(link);
			return;
		}
		if(link.innerHTML.indexOf('<') !== -1) {
			return;
		}
		nav.insBefore(link, '<span class="DESU_btnSrc" onmouseout="DESU_delSelection(event)"></span>');
		link.previousSibling.onmouseover = selectImgSearch;
	});
}

function expandPostImg(a, post, isExp) {
	if(/\.jpe?g|\.png|.\gif|^blob:/i.test(a.href)) {
		addFullImg(a, getImgSize(aib.getPicWrap(a)), isExp);
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
				if(Cfg['expandImgs'] && e.button !== 1) {
					$pd(e);
					expandPostImg(this, post, null);
				}
			}, false);
		}
	});
}

function parseImg(a, ab) {
	if(!Cfg['findRarJPEG']) {
		return;
	}
	var dat = new Uint8Array(ab),
		i = 0,
		len = dat.length;
	if(dat[0] === 0xFF && dat[1] === 0xD8) {
		for(i = 0; i < len - 1; i++) {
			if(dat[i] === 0xFF && dat[i + 1] === 0xD9) {
				i += 2;
				break;
			}
		}
	} else if(dat[0] === 0x89 && dat[1] === 0x50) {
		for(i = 0; i < len - 7; i++) {
			if(dat[i] === 0x49 && dat[i + 1] === 0x45 && dat[i + 2] === 0x4E && dat[i + 3] === 0x44) {
				i += 8;
				break;
			}
		}
	} else {
		return;
	}
	if(i === len || len - i < 60) {
		return;
	}
	for(len = i + 50; i < len; i++) {
		if(
			(dat[i] === 0x37 && dat[i + 1] === 0x7A) ||
			(dat[i] === 0x50 && dat[i + 1] === 0x4B) ||
			(dat[i] === 0x52 && dat[i + 1] === 0x61)
		) {
			$x(aib.xImages, aib.getPicWrap(a)).className += ' DESU_archive';
			break;
		}
	}
}

function preloadImages(el) {
	if(!Cfg['preLoadImgs']) {
		return;
	}
	var mReqs = 4,
		cReq = 0,
		i = 0,
		arr = [],
		loadFunc = function(idx) {
			if(idx >= arr.length) {
				if(cReq === 0) {
					mReqs = cReq = i = arr = null;
				}
				return;
			}
			var req,
				eImg = nav.WebKit,
				a_ = arr[idx],
				a = a_.href;
			if(/\.gif$/i.test(a)) {
				eImg = true;
			} else if(!/\.(?:jpe?g|png)$/i.test(a)) {
				loadFunc(i++);
				return;
			}
			if(cReq === mReqs) {
				setTimeout(loadFunc, 200, idx);
				return;
			}
			cReq++;
			req = new XMLHttpRequest();
			req.open('GET', a, true);
			req.responseType = 'arraybuffer';
			req.onload = function(e) {
				if(this.status == 200) {
					a_.href = window.URL.createObjectURL(toBlob([this.response]));
					if(eImg) {
						$t('img', a_).src = a_.href;
					}
					parseImg(a_, this.response);
				}
				cReq--;
				loadFunc(i++);
			};
			req.send(null);
		};
	$each(getImages(el), function(img) {
		arr.push($x('ancestor::a[1]', img));
	});
	while(i < mReqs) {
		loadFunc(i++);
	}
}


/*==============================================================================
								MAP OF >>REFLINKS
==============================================================================*/

function getRefMap(pNum) {
	for(var rNum, els = this[pNum].Msg.getElementsByTagName('a'), i = els.length - 1; i >= 0; i--) {
		rNum = els[i].textContent.match(/^>>(\d+)$/);
		if(rNum) {
			rNum = rNum[1];
			if(refMap[rNum]) {
				if(refMap[rNum].indexOf(pNum) === -1) {
					refMap[rNum].push(pNum);
				}
			} else {
				refMap[rNum] = [pNum];
			}
		}
	}
}

function genRefMap(pBn) {
	refMap = [];
	nav.forEach(pBn, getRefMap);
	nav.forEach(refMap, function(pNum) {
		var post = pBn[pNum];
		if(post) {
			nav.insAfter(
				post.Msg,
				'<div class="DESU_refMap">' +
					this[pNum].join(', ').replace(/(\d+)/g, '<a href="#$1">&gt;&gt;$1</a>') + '</div>'
			);
		}
	});
}

function updRefMap(post) {
	refMap = [];
	getRefMap.call(pByNum, post.Num);
	nav.forEach(refMap, function(pNum) {
		var pst = pByNum[pNum], el;
		if(pst) {
			el = $c('DESU_refMap', pst);
			if(!el) {
				el = $new('div', {'class': 'DESU_refMap'}, null);
				$after(pst.Msg, el);
			} else {
				el.appendChild($txt(', '));
			}
			el.appendChild($add(this[pNum].join(', ').replace(/(\d+)/g, '<a href="#$1">&gt;&gt;$1</a>')));
			eventRefLink(el);
		}
	});
}


/*==============================================================================
							ON >>REFLINKS POSTS PREVIEW
==============================================================================*/

function closePview(el) {
	if(!Cfg['animation'] || !nav.Anim) {
		$del(el);
		return;
	}
	nav.animEvent(el, function(node) {
		$del(node);
	});
	el.style[nav.animName] = 'DESU_pClose' + (el.aTop ? 'T' : 'B') + (el.aLeft ? 'L' : 'R');
}

function delPviews(el) {
	if(!el) {
		return;
	}
	if(el.parent) {
		el.parent.kid = null;
	} else {
		Pviews.current = null;
	}
	do {
		clearTimeout(el.post.readDelay);
		closePview(el.post);
	} while(el = el.kid);
}

function markPviewToDel(el, delAll) {
	if(el) {
		clearTimeout(Pviews.outDelay);
		Pviews.outDelay = setTimeout(delPviews, Cfg['linksOut'], delAll ? el : el.kid);
	}
}

function setPviewPostion(link, pView, anim) {
	var left, uId,
		scrW = doc.body.clientWidth,
		scrH = window.innerHeight,
		x = $offset(link).left + link.offsetWidth/2,
		y = $offset(link).top,
		top = link.getBoundingClientRect().top + link.offsetHeight,
		width = 'auto',
		moved = function(e) {
			if(this.style[nav.animName]) {
				this.style.cssText = this.newPos;
				this.newPos = false;
				$Del('style[@class="DESU_moveCSS"]', doc.head);
				this.removeEventListener(nav.animEnd, moved, false);
			}
		};
	if(x < scrW / 2) {
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
	left += 'px';
	uId = pView.offsetHeight;
	if(top + uId < scrH - 10 || top - uId < 10) {
		top = (y + link.offsetHeight) + 'px';
		pView.aTop = true;
	} else {
		top = (y - uId) + 'px';
		pView.aTop = false;
	}
	if(left === pView.style.left && top === pView.style.top) {
		return;
	}
	if(!Cfg['animation'] || !anim) {
		pView.style.cssText = 'left: ' + left + '; top: ' + top + '; width: ' + width + ';'
		return;
	}
	uId = 'DESU_mCSS' + Math.round(Math.random() * 1e3);
	doc.head.appendChild($new('style', {
		'class': 'DESU_moveCSS',
		'type': 'text/css',
		'text': '@' + nav.cssFix + 'keyframes ' + uId + ' {\
			to { left: ' + left + '; top: ' + top + '; width: ' + width + '; }\
		}'
	}, null));
	if(pView.newPos) {
		pView.style.cssText = pView.newPos;
		pView.removeEventListener(nav.animEnd, moved, false);
	}
	pView.newPos = 'left: ' + left + '; top: ' + top + '; width: ' + width + ';';
	pView.addEventListener(nav.animEnd, moved, false);
	pView.style[nav.animName] = uId;
}

function markRefMap(pView, pNum) {
	($c('DESU_pPost', pView) || {}).className = '';
	($x('.//a[starts-with(text(),">>") and contains(text(),"' + pNum + '")]', pView) || {}).className =
		'DESU_pPost';
}

function getPview(post, pNum, parent, link, txt) {
	clearTimeout(Pviews.outDelay);
	var el, pView;
	if(!post) {
		if(!txt) {
			Pviews.deleted[pNum] = true;
		}
		pView = $add(
			'<div class="' + aib.pClass + ' DESU_info DESU_pView">' + txt || Lng.postNotFound[lCode] + '</div>'
		);
	} else {
		if(post.ownerDocument === doc) {
			pView = post.cloneNode(true);
		} else {
			pView = importPost(post);
			if(!post.isOp) {
				pView.className = aib.pClass + ' DESU_post';
			}
		}
		if(post.Vis === 0) {
			togglePost(pView, 1);
		}
		if(post.isOp) {
			pView.className = aib.pClass + ' DESU_post';
		}
		pView.className += ' DESU_pView';
		if(aib._7ch) {
			pView.firstElementChild.style.cssText = 'max-width: 100%; margin: 0;';
			$del($c('doubledash', pView));
		}
		pView.Num = pNum;
		$Del(
			'.//img[@class="DESU_preImg"]/ancestor::a|.//img[@class="DESU_fullImg"]|' +
				(Cfg['addYouTube'] !== 2 ? 'div[@class="DESU_ytObj"]|' : '') +
				'.//span[starts-with(@class,"DESU_postPanel") or @class="DESU_btnSrc"]',
			pView
		);
		if(!pByNum[pNum]) {
			addLinkMP3(pView);
		}
		if(!pByNum[pNum] || Cfg['addYouTube'] !== 2) {
			addLinkTube(pView);
		}
		pView.Img = getImages(pView);
		$each(pView.Img, function(img) {
			img.style.display = '';
		});
		eventPostImg(pView);
		addLinkImg(pView);
		addImgSearch(pView);
		if(Cfg['linksNavig'] === 2) {
			markRefMap(pView, parent.Num);
		}
		eventRefLink(pView);
		if(Cfg['markViewed']) {
			pView.readDelay = setTimeout(function(pN) {
				markViewedPost(pN);
				saveViewedPosts(pN);
			}, 2e3, pNum);
		}
	}
	el = pView.node = {parent: null, kid: null, post: pView};
	parent = parent.node;
	pView.style.display = '';
	dForm.appendChild(pView);
	setPviewPostion(link, pView, false);
	pView.onmouseover = function() {
		markPviewToDel(this.node, false);
	};
	pView.onmouseout = function() {
		markPviewToDel(Pviews.current, true);
	};
	if(Pviews.current && parent) {
		delPviews(parent.kid);
		el.parent = parent;
		parent.kid = el;
	} else {
		delPviews(Pviews.current);
		Pviews.current = el;
	}
	if(Cfg['animation'] && nav.Anim) {
		nav.animEvent(pView, function(node) {
			node.style[nav.animName] = '';
		});
		pView.style[nav.animName] = 'DESU_pOpen' + (pView.aTop ? 'T' : 'B') + (pView.aLeft ? 'L' : 'R');
	}
	return el;
}

function getAjaxPview(b, pNum) {
	var el, els, i;
	if(!Pviews.ajaxed[b]) {
		return null;
	}
	el = Pviews.ajaxed[b][pNum];
	if(b === brd || !el || el.aRep) {
		return el;
	}
	pNum = fixBrd(b) + res + el.thr.Num + (aib.tire ? '.html' : docExt);
	for(els = el.getElementsByTagName('a'), i = els.length - 1; i >= 0; i--) {
		if(/^>>\d+$/.test(els[i].textContent)) {
			els[i].href = pNum;
		}
	}
	el.aRep = true;
	return el;
}

function showPview(link) {
	var b = aib.ylil ?
			link['data-boardurl'] :
			link.pathname.match(/^\/?(.*?)\/?(?:res|thread-|index|\d+|$)/)[1],
		tNum = (link.pathname.match(/[^\/]+\/[^\d]*(\d+)/) || [,0])[1],
		pNum = (link.textContent.match(/\d+$/) || [tNum])[0],
		post = pByNum[pNum] || getAjaxPview(b, pNum),
		parent = getPost(link),
		el = parent.node ? parent.node.kid : Pviews.current;
	if(Cfg['noNavigHidd'] && post && post.Vis === 0) {
		return;
	}
	if(Pviews.deleted[pNum]) {
		getPview(null, pNum, parent, link, Lng.postNotFound[lCode]);
		return;
	}
	if(el && el.post.Num === pNum) {
		markPviewToDel(el, false);
		delPviews(el.kid);
		setPviewPostion(link, el.post, nav.Anim);
		markRefMap(el.post, parent.Num);
		return;
	}
	if(post) {
		getPview(post, pNum, parent, link, null);
		return;
	}
	el = getPview(null, pNum, parent, link, '<span class="DESU_wait">' + Lng.loading[lCode] + '</span>');
	Pviews.ajaxed[b] = [];
	ajaxGetPosts(null, b, tNum, function(dc, pst, thr, num, i) {
		pst.isOp = i === 0;
		pst.Msg = aib.getMsg(pst);
		Pviews.ajaxed[b][num] = pst;
	}, function(err) {
		genRefMap(Pviews.ajaxed[b]);
		if(el) {
			getPview(getAjaxPview(b, pNum), pNum, parent, link, err);
		}
		b = pNum = parent = el = null;
	});
}

function overRefLink() {
	if(this.textContent.length > 2) {
		this.overDelay = setTimeout(showPview, Cfg['linksOver'], this);
	}
}

function outRefLink() {
	clearTimeout(this.overDelay);
	markPviewToDel(Pviews.current, true);
}

function eventRefLink(el) {
	if(Cfg['linksNavig']) {
		$each($X('.//a[starts-with(text(),">>")]', el), function(link) {
			link.onmouseover = overRefLink;
			link.onmouseout = outRefLink;
		});
	}
}


/*==============================================================================
									AJAX FUNCTIONS
==============================================================================*/

function ajaxGetPosts(url, b, tNum, pFn, fFn) {
	GM_xmlhttpRequest({
		'method': 'GET',
		'url': nav.fixLink(url || (fixBrd(b) + res + tNum + (aib.tire ? '.html' : docExt))),
		'onreadystatechange': function(xhr) {
			var dc = null;
			if(xhr.readyState === 4) {
				if(xhr.status === 200) {
					dc = $toDOM(xhr.responseText);
					if(!pr.on && oeForm) {
						pr = getPostform(doc.importNode($$x('.//textarea/ancestor::form[1]', dc, dc), true));
						$before(oeForm, [pr.form]);
					}
					if(pFn) {
						try {
							parseDelform($$x(aib.xDForm, dc, dc), dc, pFn);
						} catch(e) {}
					}
					fFn(dc, null);
				} else {
					fFn(
						dc, xhr.status === 0 ?
							Lng.noConnect[lCode] :
							'HTTP [' + xhr.status + '] ' + xhr.statusText
					);
				}
				fFn = pFn = null;
			}
		}
	});
}

function getJSON(url, fn) {
	GM_xmlhttpRequest({'method': 'GET', 'url': nav.fixLink(url), 'onreadystatechange': function(xhr) {
		if(xhr.readyState === 4) {
			if(xhr.status === 304) {
				closeAlert($id('DESU_alertNewP'));
			} else {
				try {
					fn(xhr.status, xhr.statusText, JSON.parse(xhr.responseText));
				} catch(e) {
					fn(1, e.toString(), null);
				}
				fn = null;
			}
		}
	}});
}

function importPost(post) {
	var el = doc.importNode(post, true);
	replaceDelform(el);
	return el;
}

function insertPost(thr, post) {
	var pst, el;
	if(postWrapper && !post.isOp) {
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
	updRefMap(post);
	eventRefLink(post);
	addLinkMP3(post);
	addLinkTube(post);
	addLinkImg(post);
	addImgSearch(post);
	preloadImages(post);
	if(post.Vis === 0) {
		setPostVisib(post, 0);
	}
	if(Cfg['delHiddPost'] === 1) {
		mergeHidden(post);
	}
	if(isExpImg) {
		expandAllPostImg(post, null);
	}
}

function newPost(thr, post, num, i) {
	pushPost(doc, post, thr, num, i);
	post.Vis = getVisib(post.Num);
	addPostButtons(post);
	if(Cfg['expandImgs']) {
		eventPostImg(post);
	}
	if(Cfg['expandPosts'] && !TNum) {
		expandPost(post);
	}
	addPostFunc(post);
	insertPost(thr, post);
	if(aib.tiny) {
		thr.appendChild($new('br', null, null));
	}
}

function getFullMsg(el, addFunc) {
	var	post = getPost(el),
		tNum = post.thr.Num;
	if(aib.hana) {
		$del(el.nextSibling);
		$del(el.previousSibling);
		$del(el);
		post.Msg.replaceChild(
			$x('div[@class="postbody alternate"]', post).firstElementChild,
			post.Msg.firstElementChild
		);
		post.Text = getText(post.Msg);
		if(addFunc) {
			processFullMsg(post);
		}
		return;
	}
	ajaxGetPosts(null, brd, tNum, function(dc, pst, thr, num, i) {
		if(post.Num === num) {
			$del(el);
			post.Msg.parentNode.replaceChild(doc.importNode(aib.getMsg(pst), true), post.Msg);
			post.Msg = aib.getMsg(post);
			post.Text = getText(post.Msg);
			processFullMsg(post);
			el = post = null;
			throw '';
		}
	}, function(dc, err) {});
}

function processFullMsg(post) {
	replaceDelform(post);
	$Del('.//span[@class="DESU_btnSrc"]', post);
	addPostFunc(post);
}

function expandPost(post) {
	if(post.Vis === 0) {
		return;
	}
	var tNum = post.thr.Num,
		el = $x(
			aib.krau ? './/p[starts-with(@id,"post_truncated")]' :
				aib.hana ? './/div[@class="abbrev"]/span/a' :
				'.//div[@class="abbrev"]|.//span[@class="abbr" or @class="omittedposts" or @class="shortened"]',
			post
		);
	if(el && /long|full comment|gekürzt|слишком|длинн|мног|полная версия/i.test(el.textContent)) {
		if(Cfg['expandPosts'] === 1) {
			getFullMsg(el, false);
		} else {
			el.onclick = function(e) {
				$pd(e);
				getFullMsg(this, true);
			};
		}
	}
}

function loadThread(op, last, fn) {
	var psts = [], pNums = [];
	if(!fn) {
		$alert(Lng.loading[lCode], 'LoadThr', true);
	}
	ajaxGetPosts(null, brd, op.Num, function(dc, post, thr, num, j) {
		psts.push(importPost(post));
		pNums.push(num);
	}, function(dc, err) {
		var i, thr = op.thr;
		if(err) {
			$alert(err, 'LoadThr', false);
		} else {
			showMainReply();
			$del($id('DESU_select'));
			thr.innerHTML = '';
			op = psts[0];
			newPost(thr, op, pNums[0], 0);
			nav.insAfter(
				op.Btns, '<span>&nbsp;[<a href="' + getThrdUrl(aib.host, brd, op.Num) + '">' +
					Lng.reply[lCode] + '</a>]</span>'
			);
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
				newPost(thr, psts[i], pNums[i], i++);
			}
			if(last > 5 || last === 1) {
				thr.appendChild($add('<span>[<a href="#">' + Lng.collapseThrd[lCode] + '</a>]</span>'));
				thr.lastChild.onclick = function(e) {
					$pd(e);
					loadThread(op, 5, null);
					op = null;
				};
			}
			thr.pCount = psts.length;
			closeAlert($id('DESU_alertLoadThr'));
		}
		$focus(op);
		if(fn) {
			fn();
		}
		last = fn = psts = pNums = null;
	});
}

function loadFavorThread() {
	var el = this.parentNode.parentNode,
		favt = $c('DESU_favThr', el),
		tNum = el.id.substr(13).split('|')[2],
		name = 'DESU_favIframe' + $rnd();
	if(favt.style.display !== 'none') {
		$del(favt.firstChild);
		$disp(favt);
		if(!$c('DESU_favIframe', doc)) {
			$c('DESU_content', doc).style.overflowY = 'auto';
		}
		return;
	}
	if(pByNum[tNum] && pByNum[tNum].offsetHeight) {
		$focus(pByNum[tNum]);
		return;
	}
	$append(favt, [
		$new('iframe', {
			'id': name,
			'name': name,
			'class': 'DESU_favIframe',
			'src': this.nextElementSibling.href,
			'style': 'border: none; width: ' + (doc.body.clientWidth - 55) + 'px; height: 0px;'
		}, null),
		$add(
			'<div class="DESU_wait" style="font-size: 1.1em; text-align: center">' +
				Lng.loading[lCode] + '</div>'
		)
	]);
	$disp(favt);
}

function loadPage(page, p, last) {
	ajaxGetPosts(getPageUrl(aib.host, brd, p), null, null, null, function(dc, err) {
		var df = doc.importNode($$x(aib.xDForm, dc, dc), true), el;
		while(el = df.firstChild) {
			page.appendChild(el);
		}
		replaceDelform(page);
		parseDelform(page, doc, pushPost);
		preparePage(page);
		if(last) {
			Posts.forEach(addPostButtons);
			readPostsVisib();
			Posts.forEach(doPostFilters);
			if(Cfg['delHiddPost'] === 1) {
				Posts.forEach(mergeHidden);
			}
			Posts.forEach(eventPostImg);
			Posts.forEach(expandPost);
			addLinkMP3(null);
			addLinkTube(null);
			addLinkImg(dForm);
			addImgSearch(dForm);
			genRefMap(pByNum);
			eventRefLink(dForm);
			saveHiddenPosts();
			if(isExpImg) {
				Posts.forEach(function(post) {
					expandAllPostImg(post, null);
				});
			}
			closeAlert($id('DESU_alertLPages'));
			preloadImages(dForm);
		}
		page = last = null;
	});
}

function loadPages(len) {
	$alert(Lng.loading[lCode], 'LPages', true);
	var p = -1, page = dForm;
	dForm.innerHTML = '';
	Posts = [];
	Pviews.ajaxed = {};
	while(++p < len) {
		if(len > 1) {
			page = $new('div', {'id': 'DESU_page' + p}, null);
			$append(dForm, [
				$new('center', {
					'text': p + Lng.page[lCode],
					'style': 'font-size: 2em;'
				}, null),
				$new('hr', null, null),
				page
			]);
		}
		loadPage(page, p, p === len - 1);
	}
}

/*-------------------------------Threads updater------------------------------*/

function setUpdButtonState(state) {
	if(TNum && Cfg['updThread'] !== 3) {
		$x('.//a[starts-with(@id,"DESU_btnUpd")]', doc).id = 'DESU_btnUpd' + state;
	}
}

function endPostsUpdate() {
	setUpdButtonState('Off');
	clearInterval(ajaxInterval);
	ajaxInterval = undefined;
}

function toggleAudioNotif() {
	if(!Audio.el) {
		Audio.el = $new('audio', {
			'preload': 'auto',
			'src': 'https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/signal.ogg'
		}, null);
	}
	Audio.enabled = !Audio.enabled;
}

function audioNotification() {
	if(!doc.focused) {
		Audio.el.play()
		setTimeout(audioNotification, Audio.repeat);
		Audio.running = true;
	} else {
		Audio.running = false;
	}
}

function desktopNotification(count) {
	if(window.webkitNotifications.checkPermission() !== 0) {
		return;
	}
	var notif = window.webkitNotifications.createNotification(
			'/favicon.ico', docTitle, Lng.unreadMsg[lCode].replace(/%m/g, count)
		);
	notif.ondisplay = function() {
		setTimeout(function() {
			notif.cancel();
			notif = null;
		}, 8e3);
	};
	notif.onclick = function () {
		if(window.focus) {
			window.focus();
		}
		this.cancel();
	};
	notif.show();
}

function infoNewPosts(err, inf) {
	if(err) {
		if(err !== Lng.noConnect[lCode]) {
			$alert(Lng.thrdNotFound[lCode] + TNum + '): \n' + err, 'NewP', false);
			doc.title = '{' + err.match(/(?:\[)(\d+)(?:\])/)[1] + '} ' + doc.title;
			endPostsUpdate();
		} else {
			$alert(Lng.noConnect[lCode], 'NewP', false);
			setUpdButtonState('Warn');
		}
		return;
	}
	closeAlert($id('DESU_alertNewP'));
	if(Cfg['updThread'] === 3) {
		return;
	}
	setUpdButtonState('On');
	if(Cfg['updThread'] === 1) {
		if(doc.focused) {
			return;
		}
		inf += +(doc.title.match(/^\[(\d+)\]/) || [, 0])[1];
	}
	if(Cfg['favIcoBlink'] && favIcon) {
		clearInterval(favIcon.delay);
		if(inf > 0) {
			favIcon.delay = setInterval(function() {
				$Del('.//link[@rel="shortcut icon"]', doc.head);
				doc.head.appendChild($new('link', {
					'href': $xb('.//link[@href="' + favIcon + '"]', doc.head) ?
						'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJ' +
							'LR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglE' +
							'wCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII=' :
						favIcon,
					'rel': 'shortcut icon'
				}, null));
			}, 800);
		}
	}
	doc.title = (inf > 0 ? ' [' + inf + '] ' : '') + docTitle;
	if(nav.WebKit && Cfg['desktNotif'] && inf > 0) {
		desktopNotification(inf);
	}
	if(Audio.enabled && !Audio.running && inf > 0) {
		if(Audio.repeat) {
			audioNotification();
		} else {
			Audio.el.play()
		}
	}
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
		if(name.length > 17) {
			name = name.substring(0, 17) + '...';
		}
	}
	thumb =
		rating === 'r-18g' && maxRating !== 'r-18g' ? 'images/r-18g.png' :
		rating === 'r-18' && (maxRating !== 'r-18g' || maxRating !== 'r-18') ? 'images/r-18.png' :
		rating === 'r-15' && maxRating === 'sfw' ? 'images/r-15.png' :
		rating === 'illegal' ? 'images/illegal.png' :
		file['thumb'];
	if(thumb !== file['thumb']) {
		thumbW = 200;
		thumbH = 200;
	}
	return $add(
		'<div class="file"><div class="fileinfo">Файл: <a href="/' + src + '" target="_blank">' + name +
			'</a><br /><em>' + file['thumb'].substring(file['thumb'].lastIndexOf('.') + 1) + ', ' + (
				size < kb ? size + ' B'
				: size < mb ? (size / kb).toFixed(2) + ' KB'
				: size < gb ? (size / mb).toFixed(2) + ' MB'
				: (size / gb).toFixed(2) + ' GB'
			) + ', ' + file['metadata']['width'] + 'x' + file['metadata']['height'] +
			'</em><br /><a class="edit_ icon" href="/utils/image/edit/' + file['file_id'] + '/' + pId +
			'"><img title="edit" alt="edit" src="/images/blank.png" /></a></div><a href="/' + src +
			'" target="_blank"><img class="thumb" src="/' + thumb + '" width="' + thumbW + '" height="' +
			thumbH + '" /></a></div>'
	);
}

function getHanaPost(postJson) {
	var i,
		id = postJson['display_id'],
		files = postJson['files'],
		len = files.length,
		post = $new('td', {
			'id': 'reply' + id,
			'class': 'reply DESU_post'
		}, null),
		html = '<a name="i' + id + '"></a><label><a class="delete icon"><input type="checkbox" id="delbox_' +
			id + '" class="delete_checkbox" value="' + postJson['post_id'] + '" id="' + id +
			'" /></a><span class="postername">' + postJson['name'] + '</span> ' + postJson['date'] +
			' </label><span class="reflink"><a onclick="Highlight(0, ' + id + ')" href="/' + brd +
			'/res/' + TNum + '.xhtml#i' + id + '">No.' + id + '</a></span><br />';
	if(dTime) {
		if(!aib.hDTFix) {
			aib.hDTFix = new dateTime('yyyy-nn-dd-hh-ii-ss', Cfg['timeOffset']).init(postJson['date']);
		}
		html = aib.hDTFix.fix(html);
	}
	post.innerHTML = html;
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
	var i = 0,
		len = 0,
		thr = $x('.//div[contains(@class," DESU_thread")]', dForm);
	if(inf) {
		$alert(Lng.loading[lCode], 'NewP', true);
	}
	if(aib.hana) {
		getJSON(
			'//dobrochan.ru/api/thread/' + brd + '/' + TNum +
				'/new.json?message_html&new_format&last_post=' + Posts[Posts.length - 1].Num,
			function(status, sText, json) {
				if(status !== 200 || json['error']) {
					infoNewPosts(status === 0 ? Lng.noConnect[lCode] : (sText || json['message']), null);
				} else {
					var el = (json['result'] || {})['posts'], post;
					if(el && el.length > 0) {
						for(i = 0, len = el.length; i < len; i++) {
							post = getHanaPost(el[i]);
							replaceDelform(post);
							newPost(thr, post, el[i]['display_id'], thr.pCount + i);
						}
						thr.pCount += el.length;
					}
					infoNewPosts(null, el ? el.length : 0);
				}
				if(fn) {
					fn();
				}
				fn = i = len = thr = null;
			}
		);
		return;
	}
	ajaxGetPosts(null, brd, TNum, function(dc, post, thrd, num, j) {
		var el = Posts[i];
		while(el && el.Num !== num) {
			if(!el.isDel) {
				el.isDel = true;
				el.Btns.className += '_del';
			}
			el = Posts[++i];
		}
		if(!el) {
			newPost(thr, importPost(post), num, i);
			len++;
		} else if(aib.xBan && !el.isBan) {
			var isBan = $$x(aib.xBan, post, dc);
			if(isBan) {
				if(!$xb(aib.xBan, el)) {
					el.Msg.appendChild(doc.importNode(isBan, true));
				}
				el.isBan = true;
			}
		}
		i++;
	}, function(dc, err) {
		infoNewPosts(err, len);
		if(!err) {
			var el, del = Posts.length;
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
		fn = i = len = thr = null;
	});
}

function initThreadsUpdater() {
	var C = Cfg['updThrIntrv'],
		t = 6e4 * (C === 0 ? 0.5 : C === 1 ? 1 : C === 2 ? 1.5 : C === 3 ? 2 : C === 4 ? 5 : C === 5 ? 15 : 30);
	if(Cfg['updThread'] === 1) {
		ajaxInterval = setInterval(function() {
			loadNewPosts(false, null);
		}, t);
	} else if(Cfg['updThread'] === 2) {
		ajaxInterval = setInterval(function() {
			if(aib.hana) {
				getJSON(
					'//dobrochan.ru/api/thread/' + brd + '/' + TNum + '.json?new_format',
					function(status, sText, json) {
						if(status !== 200 || json['error']) {
							infoNewPosts(status === 0 ? Lng.noConnect[lCode] : (sText || json['message']), null);
						} else {
							infoNewPosts(null, json['result']['posts_count'] - Posts.length);
						}
					}
				);
			} else {
				var cnt = 0;
				ajaxGetPosts(null, brd, TNum, function() {
					cnt++;
				}, function(dc, err) {
					infoNewPosts(err, cnt - Posts.length);
					cnt = null;
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
	if(Cfg['hideBySpell']) {
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
	$each($X(
		'following-sibling::*' + (
			aib.abu ? '|preceding-sibling::*[following-sibling::span[@class="postername"]]' : ''
		), $c(
			aib.krau ? 'postheader' :
				aib.ylil ? 'postinfo' :
				aib.fch ? 'postInfo' :
				aib.tiny ? 'intro' :
				aib._420 ? 'replyheader' :
				'DESU_postPanel',
			post
		)
	), function(el) {
		el.style.display = vis === 0 ? 'none' : '';
	});
}

function applyPostVisib(post, vis, note) {
	var el,
		pNum = post.Num;
	if(vis === 0 && Cfg['delHiddPost'] !== 2) {
		el = aib.getRef(post);
		el.onmouseover = function() {
			if(post.Vis === 0) {
				togglePost(post, 1);
			}
		};
		el.onmouseout = function() {
			if(post.Vis === 0) {
				togglePost(post, 0);
			}
		};
	}
	if(post.isOp) {
		el = $id('DESU_hidThr_' + pNum);
		if(vis === 1 && el) {
			$del(el);
			toggleHiddenThread(post, 1);
		}
		if(vis === 0 && !el) {
			el = $add(
				'<div class="' + aib.pClass + '" id="DESU_hidThr_' + post.Num + '">' +
					Lng.hiddenThrd[lCode] + ' <a href="#">№' + pNum + '</a><i> (' + (
						note ? 'autohide: ' + note : post.dTitle.replace(/</g, '&lt;').replace(/>/g, '&gt;')
					) + ')</i></div>'
			);
			$t('a', el).onclick = function(e) {
				$pd(e);
				togglePostVisib(post);
			};
			$before(post.thr, [el]);
			toggleHiddenThread(post, 0);
			post.thr.Vis = vis;
		}
	} else if(Cfg['delHiddPost'] === 2) {
		(aib.getWrap(post) || post).style.display = vis === 0 ? 'none' : '';
	}
	if(!nav.isCookie) {
		Visib[brd + pNum] = vis;
		Expires[brd + pNum] = Date.now() + storageLife;
	} else if(TNum) {
		Visib[post.Count] = vis;
	}
	post.Vis = vis;
}

function setPostVisib(post, vis) {
	post.Btns.firstChild.className = vis === 0 ? 'DESU_btnUnhide' : 'DESU_btnHide';
	togglePost(post, vis);
	applyPostVisib(post, vis, false);
	if(Cfg['strikeHidd']) {
		setTimeout($each, 0, $X('.//a[contains(@href,"#' + post.Num + '")]', dForm), function(el) {
			el.className = vis === 0 ? 'DESU_refHid' : '';
		});
	}
}

function hidePost(post, note) {
	if(!post.noHide) {
		if(post.Vis !== 0) {
			post.Btns.appendChild($new('a', {
				'class': 'DESU_postNote DESU_aBtn',
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
	Posts.forEach(function(post) {
		if(post.Vis === 0) {
			setPostVisib(post, 0);
		}
	});
	savePostsVisib();
}

function mergeHidden(post) {
	if(post.Vis !== 0 || post.isOp) {
		return;
	}
	var next,
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
						unescape(hDiv.style.display === 'none' ? '%u25BC' : '%u25B2') +
						'[<i><a href="#">' + Lng.hiddenPosts[lCode] +
						'</a>:&nbsp;' + hDiv.childNodes.length + '</i>]';
					$disp(hDiv);
				}
			}),
			el
		]);
	}
	el.appendChild(post);
	next = post.nextElementSibling;
	if(!next || getVisib(next.Num) === 1) {
		el.previousElementSibling.innerHTML = unescape('%u25B2') + '[<i><a href="#">' +
			Lng.hiddenPosts[lCode] + '</a>:&nbsp;' + el.childNodes.length + '</i>]';
	}
}

function processHidden(newCfg, oldCfg) {
	if(newCfg === 2 || oldCfg === 2) {
		Posts.forEach(function(post) {
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
		Posts.forEach(mergeHidden);
	}
	saveCfg('delHiddPost', newCfg);
	updateCSS();
}

/*--------------------------Hide posts with similar text----------------------*/

function getWrds(post) {
	return post.Text
		.replace(/\s+/g, ' ')
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
	if(len < olen * 0.4 || len > olen * 3) {
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
	if(n < _olen * 0.4 || len > _olen * 3) {
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
		Posts.forEach(function(target) {
			findSameText(target, post.Num, vis, getWrds(post));
		});
		saveHiddenPosts();
	} else {
		applySpells('#notxt');
	}
	vis = null;
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
	oSpells = {rep: [], skip: [], num: [], outrep: [], video: [], vtag: []};
	for(i = 0; x = spellsList[i++];) {
		Spells = pSpells;
		x = x.toString();
		if(/^#(?:[^\s]+\/)?(?:\d+)? /.test(x)) {
			b = x.match(/^#([^\/]+)\//);
			n = x.match(/(\d+)\s/);
			if(
				TNum && b && n && b[1] === brd && n[1] === TNum ||
				TNum && !b && n && n[1] === TNum ||
				b && !n && b[1] === brd
			) {
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
		t === '#rep' ? oSpells.rep.push(p) :
		t === '#exp' ? Spells.exp.push($toRegExp(p)) :
		t === '#exph' ? Spells.exph.push($toRegExp(p)) :
		t === '#img' ? Spells.img.push(p) :
		t === '#imgn' ? Spells.imgn.push($toRegExp(p)) :
		t === '#name' ? Spells.name.push(p) :
		t === '#theme' ? Spells.theme.push($toRegExp(p)) :
		t === '#tmax' ? Spells.tmax.push(p) :
		t === '#sage' ? Spells.sage = true :
		t === '#notxt' ? Spells.notxt = true :
		t === '#noimg' ? Spells.noimg = true :
		t === '#trip' ? Spells.trip = true :
		t === '#outrep' ? oSpells.outrep.push(p) :
		t === '#video' ? oSpells.video.push(p) :
		t === '#vtag' && oSpells.vtag.push(p.toLowerCase() + ',');
	}
}

function doReplace(arr, txt) {
	var re,
		i = arr.length;
	while(i--) {
		re = $toRegExp(arr[i]);
		txt = txt.replace(re, arr[i].substr(re.toString().length + 1));
	}
	return txt;
}

function getImgSpell(imgW, imgH, imgK, exp) {
	if(exp === '') {
		return false;
	}
	var x, expW, expH,
		s = exp.split('@'),
		stat = s[0][0],
		expK = s[0].substr(1).split('-');
	if(!expK[1]) {
		expK[1] = expK[0];
	}
	if(expK[0] !== '') {
		if(
			(stat === '<' && imgK < +expK[0]) ||
			(stat === '>' && imgK > +expK[0]) ||
			(stat === '=' && imgK >= +expK[0] && imgK <= +expK[1])
		) {
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
		if(
			stat === '<' && imgW < +expW[0] && imgH < +expH[0] ||
			stat === '>' && imgW > +expW[0] && imgH > +expH[0] ||
			stat === '=' && imgW >= +expW[0] && imgW <= +expW[1] && imgH >= +expH[0] && imgH <= +expH[1]
		) {
			return 'image ' + exp;
		}
	}
	return false;
}

function getSpells(x, post) {
	var inf, i, t, _t, pTitle, pName, pTrip, imgW, imgH, imgK;
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
			_t = getImgSize(post);
			imgW = +_t[0];
			imgH = +_t[1];
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
	if(!Cfg['filterThrds'] && post.isOp) {
		return;
	}
	var exp = checkSpells(post);
	if(post.Vis === 0) {
		if(post.noHide) {
			unhidePost(post);
		}
	} else if(exp) {
		hidePost(post, exp.substring(0, 70));
	}
}

function verifyRegExp(txt) {
	txt = txt.split('\n');
	var t, rep,
		i = txt.length,
		re = /#exp |#exph |#rep |#outrep |#imgn |#video |#theme /;
	while(i--) {
		t = txt[i];
		rep = t.match(re);
		if(rep) {
			try {
				$toRegExp(t.substr(t.indexOf(rep)));
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
		if(Cfg['hideBySpell']) {
			Posts.forEach(hideBySpells);
			hideTube();
		} else {
			unHideTube();
			Posts.forEach(function(post) {
				if(checkSpells(post)) {
					unhidePost(post);
				}
			});
		}
		saveHiddenPosts();
	} else {
		if(wrong) {
			$alert(Lng.error[lCode] + ' ' + wrong, 'ErrSpell', false);
		}
		if(fld) {
			$id('DESU_hideBySpell').checked = false;
		}
		saveCfg('hideBySpell', 0);
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
		$alert(Lng.error[lCode] + ' ' + wrong, 'ErrSpell', false);
		return;
	}
	if(fld) {
		fld.value = val;
		$id('DESU_hideBySpell').checked = val !== '';
	}
	Posts.forEach(function(post) {
		if(checkSpells(post)) {
			unhidePost(post);
		}
	});
	unHideTube();
	saveSpells(val);
	if(val !== '') {
		saveCfg('hideBySpell', 1);
		Posts.forEach(hideBySpells);
		hideTube();
	} else {
		saveCfg('hideBySpell', 0);
	}
	saveHiddenPosts();
}


/*==============================================================================
									WIPE DETECTORS
==============================================================================*/

function detectWipe_sameLines(txt) {
	if(!Cfg['wipeSameLin']) {
		return false;
	}
	var i, j, n, x,
		lines = txt.replace(/> /g, '').split(/\s*\n\s*/),
		len = lines.length;
	if(len < 6) {
		return false;
	}
	lines.sort();
	for(i = 0, n = len / 4; i < len;) {
		x = lines[i];
		j = 0;
		while(lines[i++] === x) {
			j++;
		}
		if(j > 4 && j > n && x !== '') {
			return 'same lines: "' + x.substr(0, 20) + '" x' + j;
		}
	}
	return false;
}

function detectWipe_sameWords(txt) {
	if(!Cfg['wipeSameWrd']) {
		return false;
	}
	var i, j, n, x, keys, pop,
		words = txt.replace(/[\s\.\?\!,>]+/g, ' ').toUpperCase().split(' '),
		len = words.length;
	if(len < 4) {
		return false;
	}
	words.sort();
	for(i = 0, n = len / 4, keys = 0, pop = 0; i < len; keys++) {
		x = words[i];
		j = 0;
		while(words[i++] === x) {
			j++;
		}
		if(j > pop && x.length > 2) {
			pop = j;
		}
		if(len > 25 && pop >= n) {
			return 'same words: "' + x.substr(0, 20) + '" x' + pop;
		}
	}
	x = keys / len;
	return x < 0.25 ? ('uniq words: ' + (x * 100).toFixed(0) + '%') : false;
}

function detectWipe_longWords(txt) {
	if(!Cfg['wipeLongWrd']) {
		return false;
	}
	var i = 0,
		words = txt.replace(/https*:\/\/.*?(\s|$)/g, '').replace(/[\s\.\?!,>:;-]+/g, ' ').split(' '),
		len = words.length;
	return words[0].length > 50 || (len > 1 && words.join('').length / len > 10) ? 'long words' : false;
}

function detectWipe_caseWords(txt) {
	if(!Cfg['wipeCAPS']) {
		return false;
	}
	var i, n, x, capsw, casew,
		words = txt.replace(/[\s\.\?!;,-]+/g, ' ').trim().split(' '),
		len = words.length;
	if(len < 5) {
		return false;
	}
	for(i = 0, n = 0, capsw = 0, casew = 0; i < len; i++) {
		x = words[i];
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
	return (capsw / n >= 0.3 && n > 4) ? ('CAPSLOCK: ' + capsw / words.length * 100 + '%') :
		(casew / n >= 0.3 && n > 8) ? ('cAsE words: ' + casew / words.length * 100 + '%') :
		false;
}

function detectWipe_specSymbols(txt) {
	if(!Cfg['wipeSpecial']) {
		return false;
	}
	txt = txt.replace(/\s+/g, '');
	var len = txt.length,
		x = txt.replace(/[0-9a-zа-я\.\?!,]/ig, '').length / len;
	return len > 30 && x > 0.4 ? 'specsymbols: ' + parseInt(x * 100, 10) + '%' : false;
}

function detectWipe_numbers(txt) {
	if(!Cfg['wipeNumbers']) {
		return false;
	}
	txt = txt.replace(/\s+/g, ' ').replace(/>>\d+|https*:\/\/.*?(?:\s|$)/g, '');
	var len = txt.length,
		x = (len - txt.replace(/\d/g, '').length) / len;
	return len > 30 && x > 0.4 ? 'numbers: ' + parseInt(x * 100, 10) + '%' : false;
}

function detectWipe(post) {
	if(!Cfg['hideByWipe']) {
		return false;
	}
	return detectWipe_sameLines(post.Text) ||
		detectWipe_sameWords(post.Text) ||
		detectWipe_longWords(post.Text) ||
		detectWipe_caseWords(post.Text) ||
		detectWipe_specSymbols(post.Text) ||
		detectWipe_numbers(post.Text);
}

function hideByWipe(post) {
	if(!Cfg['filterThrds'] && post.isOp || post.Vis === 0 || post.Vis === 1) {
		return;
	}
	var note = detectWipe(post);
	if(note) {
		hidePost(post, note);
	} else {
		applyPostVisib(post, 1, false);
	}
}


/*==============================================================================
									SCRIPT CSS
==============================================================================*/

function getThemeLang() {
	return !Cfg['scriptStyle'] ? 'fr' :
		Cfg['scriptStyle'] === 1 ? 'en' :
		Cfg['scriptStyle'] === 2 ? 'ru' :
		'de';
}

function scriptCSS() {
	var x = '', p,
		gif = function(name, src) {
			x += name + ' { background: url(data:image/gif;base64,' + src + ') no-repeat center !important; }';
		},
		cont = function(name, src) {
			x += name + ':before { content: ""; padding: 0 16px 0 0; margin: 0 4px; background: url(' + src + ') no-repeat center; }';
		};

	// Settings window
	x += '#DESU_cfgWindow { float: left; border-radius: 10px 10px 0 0; width: auto; min-width: 0; padding: 0; margin: 5px 20px; overflow: hidden; }\
		#DESU_cfgHead { padding: 4px; border-radius: 10px 10px 0 0; color: #fff; text-align: center; font: bold 14px arial; cursor: default; }\
		#DESU_cfgHead:lang(en), #DESU_panel:lang(en) { background: linear-gradient(top, #4b90df, #3d77be 5px, #376cb0 7px, #295591 13px, rgba(0,0,0,0) 13px), linear-gradient(top, rgba(0,0,0,0) 12px, #183d77 13px, #1f4485 18px, #264c90 20px, #325f9e 25px); }\
		#DESU_cfgHead:lang(ru), #DESU_panel:lang(ru) { background: url("data:image/gif;base64,R0lGODlhAQAZAMQAABkqTSRDeRsxWBcoRh48axw4ZChOixs0Xi1WlihMhRkuUQwWJiBBcSpTkS9bmxAfNSdKgDJfoQ0YKRElQQ4bLRAjOgsWIg4fMQsVHgAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAAQAZAEAFFWDETJghUAhUAM/iNElAHMpQXZIVAgA7"); }\
		#DESU_cfgHead:lang(de), #DESU_panel:lang(de) { background: #777; }\
		#DESU_cfgHead:lang(fr), #DESU_panel:lang(fr) { background: linear-gradient(top, #7b849b, #616b86 2px, #3a414f 13px, rgba(0,0,0,0) 13px), linear-gradient(top, rgba(0,0,0,0) 12px, #121212 13px, #1f2740 25px); }\
		.DESU_cfgBody { min-width: 371px; min-height: 300px; padding: 11px 7px 7px; margin-top: -1px; font: 13px sans-serif; }\
		.DESU_cfgBody input[type="text"] { width: auto; }\
		.DESU_cfgBody input[value=">"] { width: 20px; }\
		.DESU_cfgBody, #DESU_cfgBtns { border: 1px solid #183d77; border-top: none; }\
		.DESU_cfgBody:lang(de), #DESU_cfgBtns:lang(de) { border-color: #444; }\
		#DESU_cfgBtns { padding: 7px 2px 2px; }\
		#DESU_cfgBar { height: 25px; width: 100%; display: table; background-color: #1f2740; }\
		#DESU_cfgBar:lang(en) { background-color: #325f9e; }\
		#DESU_cfgBar:lang(ru) { background-color: #0c1626; }\
		#DESU_cfgBar:lang(de) { background-color: #777; }\
		.DESU_cfgTab, .DESU_cfgTab_sel { padding: 4px 6px; border: 1px solid #183d77; border-radius: 4px 4px 0 0; font: bold 14px arial; text-align: center; cursor: default; }\
		.DESU_cfgTab:lang(de), .DESU_cfgTab_sel:lang(de) { border-color: #444; }\
		.DESU_cfgTab:lang(fr), .DESU_cfgTab_sel:lang(fr) { border-color: #121421; }\
		.DESU_cfgTab { background-color: rgba(0,0,0,.2); }\
		.DESU_cfgTab:lang(en), .DESU_cfgTab:lang(fr) { background: linear-gradient(top, rgba(132,132,132,.35) 0%, rgba(79,79,79,.35) 50%, rgba(40,40,40,.35) 50%, rgba(80,80,80,.35) 100%); }\
		.DESU_cfgTab:hover { background-color: rgba(99,99,99,.2); }\
		.DESU_cfgTab:hover:lang(en), .DESU_cfgTab:hover:lang(fr)  { background: linear-gradient(bottom, rgba(132,132,132,.35) 0%, rgba(79,79,79,.35) 50%, rgba(40,40,40,.35) 50%, rgba(80,80,80,.35) 100%); }\
		.DESU_cfgTab_sel { border-bottom: none; }\
		.DESU_cfgTabBack { display: table-cell !important; float: none !important; min-width: 0; padding: 0 !important; box-shadow: none !important; border: none !important; border-radius: 4px 4px 0 0; opacity: 1; }\
		#DESU_spellPanel { float: right; }\
		#DESU_spellPanel > a { padding: 0 7px; text-align: center; }';

	// Main panel
	x += '#DESU_btnLogo { margin-right: 3px; }\
		#DESU_panel { height: 25px; z-index: 9999; border-radius: 15px 0 0 0; cursor: default;}\
		#DESU_panelBtns { display: inline-block; padding: 0 2px; margin: 0; height: 25px; border-left: 1px solid #8fbbed; }\
		#DESU_panelBtns:lang(ru), #DESU_panelInfo:lang(ru) { border-color: #79c; }\
		#DESU_panelBtns:lang(de), #DESU_panelInfo:lang(de) { border-color: #ccc; }\
		#DESU_panelBtns:lang(fr), #DESU_panelInfo:lang(fr) { border-color: #616b86; }\
		#DESU_panelBtns > li { margin: 0 1px; }\
		#DESU_panelBtns > li, #DESU_panelBtns > li > a, #DESU_btnLogo { display: inline-block; width: 25px; height: 25px; }\
		#DESU_panelBtns:lang(en) > li, #DESU_panelBtns:lang(fr) > li  { transition: all 0.3s ease; }\
		#DESU_panelBtns:lang(en) > li:hover, #DESU_panelBtns:lang(fr) > li:hover { background-color: rgba(255,255,255,.15); box-shadow: 0 0 3px rgba(143,187,237,.5); }\
		#DESU_panelBtns:lang(ru) > li > a, #DESU_panelBtns:lang(de) > li > a { border-radius: 5px; }\
		#DESU_panelBtns:lang(ru) > li > a:hover { width: 21px; height: 21px; border: 2px solid #9be; }\
		#DESU_panelBtns:lang(de) > li > a:hover { width: 21px; height: 21px; border: 2px solid #444; }\
		#DESU_panelInfo { display: inline-block; vertical-align: top; padding: 0 6px; height: 25px; border-left: 1px solid #8fbbed; color: #fff; font: 18px serif; }';
	p = 'R0lGODlhGQAZAIAAAPDw8P///yH5BAEAAAEALAAAAAAZABkAQA';
	gif('#DESU_btnLogo', p + 'I5jI+pywEPWoIIRomz3tN6K30ixZXM+HCgtjpk1rbmTNc0erHvLOt4vvj1KqnD8FQ0HIPCpbIJtB0KADs=');
	gif('#DESU_btnSettings', p + 'JAjI+pa+API0Mv1Ymz3hYuiQHHFYjcOZmlM3Jkw4aeAn7R/aL6zuu5VpH8aMJaKtZR2ZBEZnMJLM5kIqnP2csUAAA7');
	gif('#DESU_btnHidden', p + 'I5jI+pa+CeHmRHgmCp3rxvO3WhMnomUqIXl2UmuLJSNJ/2jed4Tad96JLBbsEXLPbhFRc8lU8HTRQAADs=');
	gif('#DESU_btnFavor', p + 'IzjI+py+AMjZs02ovzobzb1wDaeIkkwp3dpLEoeMbynJmzG6fYysNh3+IFWbqPb3OkKRUFADs=');
	gif('#DESU_btnRefresh', p + 'JAjI+pe+AfHmRGLkuz3rzN+1HS2JWbhWlpVIXJ+roxSpr2jedOBIu0rKjxhEFgawcCqJBFZlPJIA6d0ZH01MtRCgA7');
	gif('#DESU_btnGoBack', p + 'IrjI+pmwAMm4u02gud3lzjD4biJgbd6VVPybbua61lGqIoY98ZPcvwD4QUAAA7');
	gif('#DESU_btnGoNext', p + 'IrjI+pywjQonuy2iuf3lzjD4Zis0Xd6YnQyLbua61tSqJnbXcqHVLwD0QUAAA7');
	gif('#DESU_btnGoUp', p + 'IsjI+pm+DvmDRw2ouzrbq9DmKcBpVfN4ZpyLYuCbgmaK7iydpw1OqZf+O9LgUAOw==');
	gif('#DESU_btnGoDown', p + 'ItjI+pu+DA4ps02osznrq9DnZceIxkYILUd7bue6WhrLInLdokHq96tnI5YJoCADs=');
	gif('#DESU_btnNewThr', p + 'IyjI+pG+APQYMsWsuy3rzeLy2g05XcGJqqgmJiS63yTHtgLaPTY8Np4uO9gj0YbqM7bgoAOw==');
	gif('#DESU_btnExpImg', p + 'I9jI+pGwDn4GPL2Wep3rxXFEFel42mBE6kcYXqFqYnVc72jTPtS/KNr5OJOJMdq4diAXWvS065NNVwseehAAA7');
	gif('#DESU_btnMaskImg', p + 'JQjI+pGwD3TGxtJgezrKz7DzLYRlKj4qTqmoYuysbtgk02ZCG1Rkk53gvafq+i8QiSxTozIY7IcZJOl9PNBx1de1Sdldeslq7dJ9gsUq6QnwIAOw==');
	if(aib.nul) {
		gif('#DESU_btnCatalog', p + 'I2jI+pa+DhAHyRNYpltbz7j1Rixo0aCaaJOZ2SxbIwKTMxqub6zuu32wP9WsHPcFMs0XDJ5qEAADs=');
	}
	p = 'iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAA';
	x += '#DESU_btnAudioOff { background: url(data:image/png;base64,' + p + 'DXSURBVHja5JY9CgIxEIW/yDba2IpY2FkIa2vlCSwFWxvxDLZWXsEbeAQ9gf0W2ngAu8VCG8GxieBPcM26swg7MIRkeDzmvSGJERG0o0QO8bckI2DmAzCentSBLVAFjEYnXWBvCU4acg2BDVC2+0vWJFNg+YvxgV1rQOioD4Cx4/yahmQFdDxwkkauSkoFvEjOniRS7GvF5EHS0PTkPiVzoO+o97IgQUQ+ZSgiR3mPOAH3lEnGR0AL2GlP1wFoA2stuV5z8SDZ17jAs/MJEANNzZex4L+V2wA+tr2XwRrZ6QAAAABJRU5ErkJggjk5OTczOQ==) no-repeat center !important; }';
	x += '#DESU_btnAudioOn { background: url(data:image/png;base64,' + p + 'HPSURBVHja7JbBS1RRFMZ/TyfHmsWAYA2h1MKECAwDwVrUom0KgtAqiCJdaKtAEF0pSERLN/kPuHFjbVqXa5EYxI20iSQIJylMUvpa9D25Tk/GqygtPPD4zvnOee+7l3vP4SWSOG6r4wTsvxV5CEzsk2sGngFn97CSYp6Lkr7pr+Uy8recGwn5GIFuSZv+yA9JjRk1uWARrbEi97XXKpLyQX5Q0idJBe9WkhZiREb1r1WqdnLXfNnxG8dXJZG4T0pAR8ZB9gNPMvh14DwwDBSAKWDGtS3ABvAdmAaepitZUpx99XsfHBd9HpI079yWz6czvcLnIq9xzthnHAd2gFWg19w8UARupiKbkSLpLFoFfgEPHL8Oat4b24/S8fXGFeCC/Y/GBFiz33QUkXQ3xYBrDPwG405doBxrv42XgEX7N4IFtNn/nIq0HHIXj4wvjb3AT/s9xnJ6S54D9zI+druGSNpDs8A139IRc11AGXhXq9s7JG3s0/FnJDVLKrl2xTkk3bE/dNCxUpK0XGOsDJh/4fiL40LMgEwkvQ1E1qsG5HVJY/Yfu2byMKMeSa8CoXxG/kqwiF0+F3mrBoEKcNmdXm3bwBwwGZLJ6d9KjP0ZAJniHRP/VIaIAAAAAElFTkSuQmCCODMzNDcw) no-repeat center !important; }';
	p = 'Dw8P///wAAACH5BAEAAAIALAAAAAAZABkAQAJElI+pe2EBoxOTNYmr3bz7OwHiCDzQh6bq06QSCUhcZMCmNrfrzvf+XsF1MpjhCSainBg0AbKkFCJko6g0MSGyftwuowAAOw==';
	gif('#DESU_btnUpdOn', 'R0lGODlhGQAZAJEAADL/Mv' + p);
	gif('#DESU_btnUpdOff', 'R0lGODlhGQAZAJEAAP8yMv' + p);
	gif('#DESU_btnUpdWarn', 'R0lGODlhGQAZAJEAAP/0Qf' + p);

	// Post buttons
	x += '.DESU_postPanel, .DESU_postPanel_op, .DESU_postPanel_del { margin-left: 4px; }\
		.DESU_btnHide, .DESU_btnUnhide, .DESU_btnRep, .DESU_btnExpthr, .DESU_btnFav, .DESU_btnFavSel, .DESU_btnSage, .DESU_btnSrc { display: inline-block; margin: 0 4px -2px 0 !important; cursor: pointer; ';
	if(!Cfg['postBtnsTxt']) {
		x += 'padding: 0 14px 14px 0; }';
		p = 'R0lGODlhDgAOAKIAAPDw8KCgoICAgEtLS////wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA4AQAM';
		gif('.DESU_btnHide', p + '8SLLcS2MNQGsUMYi6uB5BKI5hFgojel5YBbDDNcmvpJLkcgLq1jcuSgPmgkUmlJgFAyqNmoEBJEatxggJADs=');
		gif('.DESU_btnUnhide', p + '5SLLcS2ONCcCMIoYdRBVcN4Qkp4ULmWVV20ZTM1SYBJbqvXmA3jk8IMzlgtVYFtkoNCENIJdolJAAADs=');
		gif('.DESU_btnRep', p + '4SLLcS2MNQGsUMQRRwdLbAI5kpn1kKHUWdk3AcDFmOqKcJ5AOq0srX0QWpBAlIo3MNoDInlAZIQEAOw==');
		gif('.DESU_btnExpthr', p + '7SLLcS6MNACKLIQjKgcjCkI2DOAbYuHlnKFHWUl5dnKpfm2vd7iyUXywEk1gmnYrMlEEyUZCSdFoiJAAAOw==');
		gif('.DESU_btnFav', p + '5SLLcS2MNQGsUl1XgRvhg+EWhQAllNG0WplLXqqIlDS7lWZvsJkm92Au2Aqg8gQFyhBxAlNCokpAAADs=');
		gif('.DESU_btnFavSel', 'R0lGODlhDgAOAKIAAP/hAKCgoICAgEtLS////wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA4AQAM5SLLcS2MNQGsUl1XgRvhg+EWhQAllNG0WplLXqqIlDS7lWZvsJkm92Au2Aqg8gQFyhBxAlNCokpAAADs=');
		gif('.DESU_btnSage', 'R0lGODlhDgAOAJEAAPDw8EtLS////wAAACH5BAEAAAIALAAAAAAOAA4AQAIZVI55duDvFIKy2vluoJfrD4Yi5lWRwmhCAQA7');
		gif('.DESU_btnSrc', p + '9SLLcS0MMQMesUoQg6PKbtFnDaI0a53VAml2ARcVSFC0WY6ecyy+hFajnWDVssyQtB5NhTs1mYAAhWa2EBAA7');
	} else {
		x += 'color: ' + $getStyle($t('a', doc), 'color') + '; font-size:14px; }\
			.DESU_btnHide:after { content: "×"; }\
			.DESU_btnUnhide:after { content: "+"; }\
			.DESU_btnRep:after { content: "R"; }\
			.DESU_btnExpthr:after { content: "E"; }\
			.DESU_btnFav:after { content: "F"; }\
			.DESU_btnFavSel:after { content: "[F]"; }\
			.DESU_btnSage:after { content: "Sage!"; }\
			.DESU_btnSrc:after { content: "[Sauce]"; }';
	}

	// Search images buttons
	cont('.DESU_srcGoogle', '//google.ru/favicon.ico');
	cont('.DESU_srcTineye', '//tineye.com/favicon.ico');
	cont('.DESU_srcIqdb', '//iqdb.org/favicon.ico');
	cont('.DESU_srcSaucenao', '//saucenao.com/favicon.ico');

	// Posts counter
	if(TNum) x += '.DESU_thread { counter-reset: i 1; }\
		.DESU_postPanel:after { counter-increment: i 1; content: counter(i, decimal); vertical-align: 1px; color: #4f7942; font: italic bold 13px serif; cursor: default; }\
		.DESU_postPanel_del:after { content: "' + Lng.deleted[lCode] + '"; color: #727579; font: italic bold 13px serif; cursor: default; }';

	// text format buttons
	x += '#DESU_txtPanel { display: block; height: 23px; font-weight: bold; cursor: pointer; }\
		#DESU_txtPanel > span:empty { display: inline-block; width: 27px; height: 23px }\
		#DESU_txtPanel:lang(en) { display: none; }\
		#DESU_txtPanel:lang(ru) { float: right; }';
	p = 'R0lGODlhFwAWAJEAAPDw8GRkZAAAAP///yH5BAEAAAMALAAAAAAXABYAQAJ';
	gif('#DESU_btnBold:empty', p + 'T3IKpq4YAoZgR0KqqnfzipIUikFWc6ZHBwbQtG4zyonW2Vkb2iYOo8Ps8ZLOV69gYEkU5yQ7YUzqhzmgsOLXWnlRIc9PleX06rnbJ/KITDqTLUAAAOw==');
	gif('#DESU_btnItalic:empty', p + 'K3IKpq4YAYxRCSmUhzTfx3z3c9iEHg6JnAJYYSFpvRlXcLNUg3srBmgr+RL0MzxILsYpGzyepfEIjR43t5kResUQmtdpKOIQpQwEAOw==');
	gif('#DESU_btnUnder:empty', p + 'V3IKpq4YAoRARzAoV3hzoDnoJNlGSWSEHw7JrEHILiVp1NlZXtKe5XiptPrFh4NVKHh9FI5NX60WIJ6ATZoVeaVnf8xSU4r7NMRYcFk6pzYRD2TIUAAA7');
	gif('#DESU_btnStrike:empty', p + 'S3IKpq4YAoRBR0qqqnVeD7IUaKHIecjCqmgbiu3jcfCbAjOfTZ0fmVnu8YIHW6lgUDkOkCo7Z8+2AmCiVqHTSgi6pZlrN3nJQ8TISO4cdyJWhAAA7');
	gif('#DESU_btnSpoil:empty', 'R0lGODlhFwAWAJEAAPDw8GRkZP///wAAACH5BAEAAAIALAAAAAAXABYAQAJBlIKpq4YAmHwxwYtzVrprXk0LhBziGZiBx44hur4kTIGsZ99fSk+mjrMAd7XerEg7xnpLIVM5JMaiFxc14WBiBQUAOw==');
	gif('#DESU_btnCode:empty', p + 'O3IKpq4YAoZgR0KpqnFxokH2iFm7eGCEHw7JrgI6L2F1YotloKek6iIvJAq+WkfgQinjKVLBS45CePSXzt6RaTjHmNjpNNm9aq6p4XBgKADs=');
	gif('#DESU_btnQuote:empty', p + 'L3IKpq4YAYxRUSKguvRzkDkZfWFlicDCqmgYhuGjVO74zlnQlnL98uwqiHr5ODbDxHSE7Y490wxF90eUkepoysRxrMVaUJBzClaEAADs=');

	// Show/close animation
	if(nav.Anim) {
		x += '@keyframes DESU_aOpen {\
				0% { transform: translateY(-1500px); }\
				40% { transform: translateY(30px); }\
				70% { transform: translateY(-10px); }\
				100% { transform: translateY(0); }\
			}\
			@keyframes DESU_aClose {\
				0% { transform: translateY(0); }\
				20% { transform: translateY(20px); }\
				100% { transform: translateY(-4000px); }\
			}\
			@keyframes DESU_aBlink {\
				0%, 100% { transform: translateX(0); }\
				10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }\
				20%, 40%, 60%, 80% { transform: translateX(10px); }\
			}\
			@keyframes DESU_cfgOpen { from { transform: translate(0,50%) scaleY(0); opacity: 0; } }\
			@keyframes DESU_cfgClose { to { transform: translate(0,50%) scaleY(0); opacity: 0; } }\
			@keyframes DESU_pOpenTL { from { transform: translate(-50%,-50%) scale(0); opacity: 0; } }\
			@keyframes DESU_pOpenBL { from { transform: translate(-50%,50%) scale(0); opacity: 0; } }\
			@keyframes DESU_pOpenTR { from { transform: translate(50%,-50%) scale(0); opacity: 0; } }\
			@keyframes DESU_pOpenBR { from { transform: translate(50%,50%) scale(0); opacity: 0; } }\
			@keyframes DESU_pCloseTL { to { transform: translate(-50%,-50%) scale(0); opacity: 0; } }\
			@keyframes DESU_pCloseBL { to { transform: translate(-50%,50%) scale(0); opacity: 0; } }\
			@keyframes DESU_pCloseTR { to { transform: translate(50%,-50%) scale(0); opacity: 0; } }\
			@keyframes DESU_pCloseBR { to { transform: translate(50%,50%) scale(0); opacity: 0; } }\
			.DESU_pView { animation-duration: .2s; animation-timing-function: ease-in-out; animation-fill-mode: both; }\
			.DESU_aOpen { animation: DESU_aOpen .7s ease-out both; }\
			.DESU_aClose { animation: DESU_aClose .7s ease-in both; }\
			.DESU_aBlink { animation: DESU_aBlink .7s ease-in-out both; }\
			.DESU_cfgOpen { animation: DESU_cfgOpen .2s ease-out backwards; }\
			.DESU_cfgClose { animation: DESU_cfgClose .2s ease-in both; }';
	}

	// Embedders
	cont('.DESU_ytLink', '//youtube.com/favicon.ico');
	x += '.DESU_preImg, .DESU_fullImg { display: block; margin: ' + (aib.krau ? 0 : '2px 10px') + '; border: none; outline: none; cursor: pointer; }\
		.DESU_mp3, .DESU_ytObj { margin: 5px 20px; }\
		.DESU_post > a + .DESU_mp3, .DESU_post > a + .DESU_ytObj { display: inline-block; }\
		.DESU_ytObj > img { cursor: pointer; }';

	// Other
	cont('.DESU_wait', 'data:image/gif;base64,R0lGODlhEAAQALMMAKqooJGOhp2bk7e1rZ2bkre1rJCPhqqon8PBudDOxXd1bISCef///wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAMACwAAAAAEAAQAAAET5DJyYyhmAZ7sxQEs1nMsmACGJKmSaVEOLXnK1PuBADepCiMg/DQ+/2GRI8RKOxJfpTCIJNIYArS6aRajWYZCASDa41Ow+Fx2YMWOyfpTAQAIfkEBQAADAAsAAAAABAAEAAABE6QyckEoZgKe7MEQMUxhoEd6FFdQWlOqTq15SlT9VQM3rQsjMKO5/n9hANixgjc9SQ/CgKRUSgw0ynFapVmGYkEg3v1gsPibg8tfk7CnggAIfkEBQAADAAsAAAAABAAEAAABE2QycnOoZjaA/IsRWV1goCBoMiUJTW8A0XMBPZmM4Ug3hQEjN2uZygahDyP0RBMEpmTRCKzWGCkUkq1SsFOFQrG1tr9gsPc3jnco4A9EQAh+QQFAAAMACwAAAAAEAAQAAAETpDJyUqhmFqbJ0LMIA7McWDfF5LmAVApOLUvLFMmlSTdJAiM3a73+wl5HYKSEET2lBSFIhMIYKRSimFriGIZiwWD2/WCw+Jt7xxeU9qZCAAh+QQFAAAMACwAAAAAEAAQAAAETZDJyRCimFqbZ0rVxgwF9n3hSJbeSQ2rCWIkpSjddBzMfee7nQ/XCfJ+OQYAQFksMgQBxumkEKLSCfVpMDCugqyW2w18xZmuwZycdDsRACH5BAUAAAwALAAAAAAQABAAAARNkMnJUqKYWpunUtXGIAj2feFIlt5JrWybkdSydNNQMLaND7pC79YBFnY+HENHMRgyhwPGaQhQotGm00oQMLBSLYPQ9QIASrLAq5x0OxEAIfkEBQAADAAsAAAAABAAEAAABE2QycmUopham+da1cYkCfZ94UiW3kmtbJuRlGF0E4Iwto3rut6tA9wFAjiJjkIgZAYDTLNJgUIpgqyAcTgwCuACJssAdL3gpLmbpLAzEQA7');
	x += '.DESU_alertBtn { display: inline-block; vertical-align: top; font-size: 150%; color: green; cursor: pointer; }\
		.DESU_alertMsg { display: inline-block; margin-top: .25em; }\
		#DESU_alertBox { position: fixed; right: 0; top: 0; z-index: 9999; font: 14px arial; cursor: default; }\
		#DESU_alertBox > div { float: right; clear: both; width: auto; min-width: 0pt; padding: 10px; margin: 1px; border: 1px solid grey; white-space: pre-wrap; }\
		#DESU_cfgEdit, #DESU_favEdit, #DESU_hidTEdit, #DESU_spellEdit { display: block; margin: 2px 0; font: 12px courier new; }\
		.DESU_content { text-align: left; }\
		.DESU_content > table { font-size: 16px; }\
		.DESU_favData .DESU_thread { padding-left: 15px; border: 1px solid grey; }\
		.DESU_favData a, .DESU_hidTData a { text-decoration: none; }\
		.DESU_favHead a { color: inherit; font-weight: bold; }\
		.DESU_favPCount { float: right; margin: 0 5px 0 15px; font: bold 16px serif; }\
		.DESU_favPCount span { color: #4f7942; }\
		#DESU_iframe { display: none; width: 0px; height: 0px; border: none; }\
		.DESU_omitted { color: grey; font-style: italic; }\
		.DESU_postNote { color: inherit; font: italic bold 12px serif; }\
		#DESU_qarea { float: none; clear: left; width: 100%; padding: 3px 0 3px 3px; margin: 2px 0; }\
		.DESU_refHid { text-decoration: line-through !important; }\
		.DESU_refMap { margin: 10px 4px 4px 4px; font-size: 70%; font-style: italic; }\
		.DESU_refMap:before { content: "' + Lng.replies[lCode] + ' "; }\
		.DESU_refMap > a { text-decoration: none; }\
		#DESU_sageBtn { margin-right: 7px; cursor: pointer; }\
		#DESU_select { padding: 0 !important; margin: 0 !important; width: auto; min-width: 0; z-index: 9999; border: 1px solid grey;}\
		#DESU_select a { display: block; padding: 3px 10px; color: inherit; text-decoration: none; font: 13px arial; white-space: nowrap; }\
		#DESU_select a:hover { background-color: #222; color: #fff; }\
		.DESU_selected { ' + (nav.Opera ? 'border-left: 4px solid red; border-right: 4px solid red; }' : 'box-shadow: 6px 0 2px -2px red, -6px 0 2px -2px red; }') + '\
		#DESU_txtResizer { display: inline-block !important; float: none !important; padding: 5px; margin: 0 0 -' + (nav.Opera ? 8 : nav.WebKit ? 2 : 3) + 'px -12px; border-bottom: 2px solid #555; border-right: 2px solid #444; cursor: se-resize; }\
		.DESU_viewed { color: #888 !important; }\
		.DESU_post { width: auto; }\
		.DESU_aBtn { text-decoration: none !important; outline: none; }\
		.DESU_pPost { font-weight: bold; }\
		.DESU_info { padding: 3px 6px !important; }\
		.DESU_pView { position: absolute; width: auto; min-width: 0; z-index: 9999; border: 1px solid grey; }\
		.DESU_cFullImg { position: fixed; z-index: 9999; border: 1px solid black; }\
		.DESU_archive:after { content: ""; padding: 0 16px 3px 0; margin: 0 4px; background: url(data:image/gif;base64,R0lGODlhEAAQALMAAF82SsxdwQMEP6+zzRA872NmZQesBylPHYBBHP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAQARTMMlJaxqjiL2L51sGjCOCkGiBGWyLtC0KmPIoqUOg78i+ZwOCUOgpDIW3g3KJWC4t0ElBRqtdMr6AKRsA1qYy3JGgMR4xGpAAoRYkVDDWKx6NRgAAOw==) no-repeat center; }\
		small[id^="rfmap"], div[id^="preview"], div[id^="pstprev"] { display: none !important; }\
		textarea { resize: none !important; }';
	if(aib.kus) {
		x += '.extrabtns, .ui-resizable-handle, .DESU_oppost > a[onclick]:not([target]) { display: none !important; }\
			.ui-wrapper { display: inline-block; width: auto !important; height: auto !important; padding: 0 !important; }';
	}
	if(aib.nul) {
		x += '#newposts_get, #postform nobr, .replieslist, #captcha_status, .DESU_thread span[style="float: right;"] { display: none !important; }\
			.ui-wrapper { position: static !important; margin: 0 !important; overflow: visible !important; }\
			.ui-resizable { display: inline !important; }\
			.voiceplay { float: none; }';
	} else if(aib.hana) {
		x += '#hideinfotd, .reply_, .delete > img, .popup { display: none; }\
			.delete { background: none; }\
			.delete_checkbox { position: static !important; }\
			.file + .DESU_ytObj { float: left; margin: 5px 20px 5px 5px; display: block; }\
			.DESU_ytObj + div { clear: left; }';
	} else if(aib.abu) {
		x += '.ABU_refmap, .postpanel, #CommentToolbar, a[onclick^="window.open"],\
			#usrFlds + tbody > tr:first-child, #postform > div:nth-child(2),\
			#DESU_parea > hr, hr[style="clear: left;"] { display: none !important; }\
			#DESU_txtPanel { font-size: 16px !important; }\
			.DESU_aBtn { transition: none; }';
	} else if(aib.tiny) {
		x += 'form, form table { margin: 0; }\
			.post-hover { display: none !important; }';
	} else if(aib._7ch) {
		x += '.reply { background-color: ' + $getStyle(doc.body, 'background-color') + '; }';
	} else if(aib.gazo) {
		x += '.DESU_content, #DESU_cfgBody { font-family: arial; }\
			.ftbl { width: auto; margin: 0; }\
			.reply { background: #f0e0d6; }';
	} else if(aib.krau) {
		x += 'img[id^="translate_button"], img[src$="button-expand.gif"], img[src$="button-close.gif"]' + (liteMode ? ', div[id^="disclaimer"]' : '') + ' { display: none !important; }\
			div[id^="Wz"] { z-index: 10000 !important; }\
			div[id^="DESU_hidThr_"] { margin-bottom: ' + (!TNum ? '7' : '2') + 'px; }\
			.file_reply + .DESU_ytObj, .file_thread + .DESU_ytObj { float: left; margin: 5px 20px 5px 5px; display: block; }\
			.DESU_ytObj + div { clear: left; }';
	} else if(aib._420) {
		x += '.opqrbtn, .qrbtn, .ignorebtn, .hidethread, noscript { display: none; }\
			div[id^="DESU_hidThr_"] { margin: 1em 0; }';
	} else if(aib.brit) {
		x += '.DESU_postPanel, .DESU_postPanel_op { float: left; margin-top: 0.45em; }\
			a + .threadlinktext { position: relative; top: 17px; }\
			.postthreadlinks, .pagethreadlinks, .pwpostblock { display: none; }\
			.DESU_btnSrc { padding: 0px 10px 10px 0px !important; background-size: cover !important; }';
	} else if(aib.ylil) {
		x += '.threadbuttons, .expandall, .tooltip { display: none !important; }';
	} else if(aib.fch) {
		x += '.DESU_spoiler { color: #000; background-color: #000; }';
	}

	if(nav.Firefox && nav.Firefox < 4) {
		x = x.replace(/(border-radius|box-shadow|background-size)/g, '-moz-$1');
	}

	$append(doc.head, [
		$new('style', {
			'id': 'DESU_css',
			'type': 'text/css',
			'text': x.replace(/(linear-gradient|transition|keyframes|transform|animation)/g, nav.cssFix + '$1')
		}, null),
		$new('style', {
			'id': 'DESU_dynCss',
			'type': 'text/css'
		}, null)
	]);
	x = gif = cont = null;
	updateCSS();
	if(nav.WebKit) {
		$disp(dForm);
	}
}

function updateCSS() {
	var x = '#DESU_panel { ' + (!Cfg['attachPanel'] ? 'float: right;' : 'position: fixed; right: 0; bottom: 0;') + ' }\
		.DESU_content { ' + (!Cfg['attachPanel'] ? 'width: 100%;' : 'position: fixed; right: 0; bottom: 25px; z-index: 9999; max-height: 95%; overflow-x: visible; overflow-y: auto;') + ' }\
		.DESU_content > table { ' + (!Cfg['attachPanel'] ? 'margin: 5px 20px;' : 'padding: 5px 10px; border: 1px solid grey;') + ' }';
	if(!Cfg['panelCounter']) {
		x += '#DESU_panelInfo { display: none; }';
	}
	if(!Cfg['expandPanel']) {
		x += '#DESU_panelBtns, #DESU_panelInfo { display: none; }';
	}
	if(Cfg['maskImgs']) {
		x+= '.DESU_preImg, .DESU_ytObj, img[src*="spoiler"], img[src*="thumb"] { opacity: 0.07 !important; }\
			.DESU_preImg:hover, .DESU_ytObj:hover, img[src*="spoiler"]:hover, img[src*="thumb"]:hover { opacity: 1 !important; }';
	}
	if(Cfg['delHiddPost'] === 2) {
		x += 'div[id^=DESU_hidThr_], div[id^=DESU_hidThr_] + div + br, div[id^=DESU_hidThr_] + div + br + hr { display: none; }';
	}
	if(Cfg['noPostNames']) {
		x += '.commentpostername, .postername, .postertrip { display: none; }';
	}
	if(Cfg['noSpoilers']) {
		x += '.spoiler, .DESU_spoiler { background: #888 !important; color: #ccc !important; }';
	}
	if(Cfg['noPostScrl']) {
		x += 'blockquote, blockquote > p, .code_part { max-height: 100% !important; overflow: visible !important; }';
	}
	if(Cfg['noBoardRule']) {
		x += (aib.gazo ? '.chui' : '.rules, #rules, #rules_row') + ' { display: none; }';
	}
	if(aib.abu && Cfg['addYouTube']) {
		x += 'div[id^="post_video"] { display: none !important; }';
	}
	$id('DESU_dynCss').textContent = x;
}


/*==============================================================================
									SCRIPT UPDATING
==============================================================================*/

function checkForUpdates(force, fn) {
	var day = 2 * 1000 * 60 * 60 * 24,
		updInt =
			!Cfg['scrUpdIntrv'] ? 0 :
			Cfg['scrUpdIntrv'] === 1 ? day :
			Cfg['scrUpdIntrv'] === 2 ? day * 2 :
			Cfg['scrUpdIntrv'] === 3 ? day * 7 :
			Cfg['scrUpdIntrv'] === 4 ? day * 14 :
			Cfg['scrUpdIntrv'] === 5 && day * 30;
	if(!force && Date.now() - +Cfg['lastScrUpd'] < updInt) {
		return;
	}
	GM_xmlhttpRequest({
		'method': 'GET',
		'url': 'https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/' +
			(Cfg['betaScrUpd'] ? 'master' : 'stable') + '/Dollchan_Extension_Tools.meta.js',
		'headers': {'Content-Type': 'text/plain'},
		'onreadystatechange': function(xhr) {
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
				Cfg['lastScrUpd'] = Date.now();
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
						Cfg['betaScrUpd'] ?
							'https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/' +
								'Dollchan_Extension_Tools.user.js' :
							'https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/Versions'
					)+ '">' + Lng.updAvail[lCode] + '</a>');
				} else if(force) {
					fn(Lng.haveLatest[lCode]);
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
	getImageboard();
	getNavigator();
	if(/^DESU_iframe/.test(window.name)) {
		nav.postMsg(('window.top.postMessage("J' + findError(doc) + '$#$' + window.location + '", "*");').replace(/\n|\r/g, '\\n'));
		return false;
	}
	if(/^DESU_favIframe/.test(window.name)) {
		liteMode = true;
		nav.postMsg('window.top.postMessage("I' + window.name + '|' + doc.body.scrollHeight + '", "*");');
		$event(window, {
			'load': function(e) {
				setTimeout(nav.postMsg, 1E3, 'window.top.postMessage("I' + window.name + '|' + doc.body.scrollHeight + '", "*");');
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

function getNavigator() {
	var ua = window.navigator.userAgent, blb;
	nav.Firefox = +(ua.match(/mozilla.*? rv:(\d+)/i) || [,0])[1];
	nav.Opera = +(ua.match(/opera(?:.*version)?[ \/]([\d.]+)/i) || [,0])[1];
	nav.WebKit = +(ua.match(/WebKit\/(\d+)/i) || [,0])[1];
	nav.Safari = nav.WebKit && !/chrome/i.test(ua);
	nav.isGM = nav.Firefox && typeof GM_setValue === 'function';
	nav.isScript = nav.Opera && !!scriptStorage;
	nav.isLocal = window.localStorage && typeof localStorage === 'object';
	nav.isSession = window.sessionStorage && (sessionStorage.test = 1) === 1;
	nav.isCookie = !nav.isGM && !nav.isScript && !nav.isLocal;
	nav.isGlobal = nav.isGM || nav.isScript;
	nav.cssFix =
		nav.Firefox ? '-moz-' :
		nav.WebKit ? '-webkit-' :
		'-o-';
	if(nav.Firefox > 4 || nav.WebKit || nav.Opera > 11) {
		nav.Anim = true;
		nav.animName =
			nav.Firefox ? 'MozAnimationName' :
			nav.WebKit ? 'webkitAnimationName' :
			'OAnimationName';
		nav.animEnd =
			nav.WebKit ? 'webkitAnimationEnd' :
			nav.Opera ? 'oAnimationEnd' :
			'animationend';
		nav.animEvent = function(el, fn) {
			el.addEventListener(nav.animEnd, function aEvent(e) {
				this.removeEventListener(nav.animEnd, aEvent, false);
				fn(this);
			}, false);
		}
	}
	nav.isBlob = nav.Firefox > 6 || (!nav.Safari && nav.WebKit) || (nav.Safari && nav.WebKit > 536);
	nav.isH5Rep = nav.isBlob && !aib.nul && !aib.tiny;
	if(nav.WebKit) {
		window.URL = window.webkitURL;
	}
	nav.insAfter = nav.Firefox && nav.Firefox < 8 ?
		function(el, html) {
			$after(el, $add(html));
		} :
		function(el, html) {
			el.insertAdjacentHTML('afterend', html);
		};
	nav.insBefore = nav.Firefox && nav.Firefox < 8 ?
		function(el, html) {
			$before(el, [$add(html)]);
		} :
		function(el, html) {
			el.insertAdjacentHTML('beforebegin', html);
		};
	nav.forEach = nav.Opera || (nav.Firefox && nav.Firefox < 4) ?
		function(obj, fn) {
			for(var i in obj) {
				if(obj.hasOwnProperty(i)) {
					fn.call(obj, i);
				}
			}
		} :
		function(obj, fn) {
			Object.keys(obj).forEach(fn, obj);
		};
	nav.fixLink = nav.Safari ?
		function (link) {
			return link[1] === '/' ? 'http:' + link :
				link[0] === '/' ? 'http://' + aib.host + link :
				link;
		} :
		function(link) {
			return link;
		};
	nav.postMsg = nav.WebKit || nav.Opera ? addContentScript : eval;
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
			aib.gazo ? '.htm' :
			aib._420 ? '.php' :
			'.html'
		);
	}
	favIcon = ($x('.//head//link[@rel="shortcut icon"]', doc) || {}).href;
}

function fixBrd(b) {
	return '/' + (b === '' ? '' : b + '/');
}

function getThrdUrl(h, b, tNum) {
	return '//' + h + fixBrd(b) + (
		(h.indexOf('krautchan.net') + 1) ? 'thread-' :
		(h.indexOf('ylilauta.fi') + 1) ? '' :
		'res/'
	) + tNum + (
		/dobrochan|tenhou/.test(h) ? '.xhtml' :
		(h.indexOf('2chan.net') + 1) ? '.htm' :
		(h.indexOf('420chan.org') + 1) ? '.php' :
		(h.indexOf('ylilauta.fi') + 1) ? '' :
		'.html'
	);
}

function getPageUrl(h, b, p) {
	return (h.indexOf('ylilauta.fi') + 1) ?
		('/' + b + (p === 1 ? '/' : '-' + p)) :
		(fixBrd(b) + (
			p > 0 ? (p + docExt) :
			/dobrochan|tenhou/.test(h) ? ('index' + docExt) :
			''
		));
}

function getPostform(form) {
	if(!form) {
		return {};
	}
	var tr = aib._7ch ? 'li' : 'tr',
		pre = './/' + tr + '[not(contains(@style,"none"))]//input[not(@type="hidden") and ',
		recap = $x('.//input[@id="recaptcha_response_field"]', form);
	return {
		on: true,
		isQuick: false,
		tNum: TNum,
		form: form,
		tr: 'ancestor::' + tr + '[1]',
		recap: recap,
		cap: (aib.ylil ? null : ($x('.//input[contains(@name,"aptcha") and not(@name="recaptcha_challenge_field")]', form) || recap)),
		txta: $x('.//' + tr + '[not(contains(@style,"none"))]//textarea[not(contains(@style,"display:none"))]', form),
		subm: $x('.//' + tr + '//input[@type="submit"]', form),
		file: $x('.//' + tr + '//input[@type="file"]', form),
		passw: $x('.//' + tr + '//input[@type="password"]', form),
		dpass: $x('.//input[@type="password"]', dForm),
		gothr: $x('.//tr[@id="trgetback"]|.//input[@type="radio" or @name="gotothread"]/ancestor::tr[1]', form),
		name: $x(pre + '(@name="field1" or @name="name" or @name="internal_n" or @name="nya1" or @name="akane")]', form),
		mail: $x(pre + (
			aib._410 ? '@name="sage"]' :
			aib.futr ? '@name="denshimeru"]' :
			'(@name="field2" or @name="em" or @name="sage" or @name="email" or @name="nabiki" or @name="dont_bump")]'
		), form),
		video: $x('.//' + tr + '//input[@name="video" or @name="embed"]', form)
	};
}

function getImageboard() {
	var h = window.location.hostname.match(
			/(?:(?:[^.]+\.)(?=org\.|net\.|com\.))?[^.]+\.[^.]+$|^\d+\.\d+\.\d+\.\d+$|localhost/
		)[0];
	aib.dm = h;
	aib.hana = $xb('.//script[contains(@src,"hanabira")]', doc);
	aib.tiny = $xb('.//form[@name="postcontrols"]', doc);
	aib.krau = h === 'krautchan.net';
	aib.gazo = h === '2chan.net';
	aib.brit = h === 'britfa.gs';
	aib.ylil = h === 'ylilauta.fi' || h === 'ylilauta.org';
	aib.abu = !!$id('ABU_submitframe');
	aib.kus = $xb('.//script[contains(@src,"kusaba")]', doc);
	aib.fch = h === '4chan.org';
	aib._420 = h === '420chan.org';
	aib.xDForm = aib.brit ? './/div[@class="threadz"]' : './/form[' + (
		aib.hana || aib.krau || aib.ylil ? 'contains(@action,"delete")]' :
		aib.tiny ? '@name="postcontrols"]' :
		aib.gazo ? '2]' :
		'@id="delform" or @name="delform"]'
	);
	dForm = $x(aib.xDForm, doc);
	if(!dForm) {
		return;
	}
	aib.host = window.location.hostname;
	aib.waka = $xb('.//script[contains(@src,"wakaba")]|.//form[contains(@action,"wakaba.pl")]', doc);
	aib.tinyIb = $xb('.//form[contains(@action,"imgboard.php?delete")]', doc);
	aib.nul = h === '0chan.ru';
	aib._7ch = h === '7chan.org';
	aib._410 = h === '410chan.ru';
	aib.hid = h === 'hiddenchan.i2p';
	aib.tire = h === '2--ch.ru';
	aib.dfwk = h === 'dfwk.ru';
	aib.pony = h === 'ponychan.net';
	aib.vomb = h === 'vombatov.net';
	aib.ment = h === '02ch.net';
	aib.futr = h === '2chan.su';
	aib.pClass =
		aib.krau ? 'postreply' :
		aib.ylil ? ' answer' :
		aib.tiny || aib.fch ? 'post reply' :
		'reply';
	aib.opClass =
		aib.kus ? 'postnode' :
		aib.brit ? 'originalpost' :
		aib.fch ? 'op' :
		'oppost';
	aib.tClass = aib.krau ? 'thread_body' : 'thread';
	aib.xThreads = './/div[' + (
		$xb('.//div[contains(@id,"_info") and contains(@style,"float")]', doc) ?
			'starts-with(@id,"t") and not(contains(@id,"_info"))' :
		aib._420 ? 'contains(@id,"thread")' :
		'starts-with(@id,"thread")' + (aib._7ch ? 'and not(@id="thread_controls")' : '')
	) + ']';
	aib.xTNum =
		aib.gazo || aib.tiny ? './/input[@type="checkbox"]' :
		(aib.waka && !aib.abu) || aib.brit || aib.tinyIb ? './/a[@name]' :
		aib.kus && !aib._7ch ? 'a[@name][2]' :
		false;
	aib.xRef = aib.tiny ? './/p[@class="intro"]/a[@class="post_no"][2]' : false;
	aib.cRef =
		aib.krau || aib.ylil ? 'postnumber' :
		aib.gazo ? 'del' :
		'reflink';
	aib.xMsg =
		aib.hana ? './/div[@class="postbody"]' :
		aib.ylil ? './/div[@class="post"]' :
		aib.tiny ? './/p[@class="body"]' :
		aib._7ch ? './/p[@class="message"]' :
		'.//blockquote';
	aib.cMsg =
		aib.hana ? 'postbody' :
		aib.ylil ? 'post' :
		aib.tiny ? 'body' :
		aib._7ch ? 'message' :
		false;
	aib.xImages = aib.brit ? './/a[@class="fileinfo"]' : (
		aib.gazo ? '.' :
		aib.tiny || aib.ylil ? './/p[@class="fileinfo"]' :
		aib.hana ? './/div[starts-with(@class,"fileinfo")]' :
		'.//span[@class="' + (aib.krau ? 'filename' : aib.fch ? 'fileText' : 'filesize') + '"]'
	) + '//a[contains(@href,".jpg") or contains(@href,".png") or contains(@href,".gif")]' +
		(aib.nul ? '[1]' : '');
	aib.cTitle =
		aib.krau || aib.ylil ? 'postsubject' :
		aib.tiny || aib.fch ? 'subject' :
		aib.hana ? 'replytitle' :
		'filetitle';
	aib.cOmPosts =
		aib.krau ? 'omittedinfo' :
		aib.ylil ? 'omitted' :
		aib.hana ? 'abbrev' :
		aib.fch ? 'summary desktop' :
		'omittedposts';
	aib.xBan =
		aib.krau ? './/span[@class="ban_mark"]/ancestor::p' :
		aib.fch ? './/strong[@style="color: red;"]' :
		false;
	aib.picWrap =
		aib.krau ? '@class="file_thread" or @class="file_reply"' :
		aib.hana ? '@class="file"' :
		false;
	aib.getPicWrap =
		aib.hana ? function(el) {
			if(!el.previousElementSibling) {
				el = el.parentNode;
			}
			return el.parentNode;
		} :
		aib.krau ? function(el) {
			return el.parentNode;
		} :
		function(el) {
			return getPost(el);
		}
	aib.getMsg = aib.cMsg ?
		function(el) {
			return $c(aib.cMsg, el);
		} :
		function(el) {
			return $t('blockquote', el);
		};
	aib.getRef =
		aib.xRef ? function(el) {
			return $x(aib.xRef, el);
		} :
		aib.fch ? function(el) {
			return $c('postInfo', el).lastElementChild;
		} :
		function(el) {
			return $c(aib.cRef, el);
		};
	aib.getOp =
		(aib.abu || aib.hana || aib.kus || aib.fch) && $c(aib.opClass, doc) ? function(thr, dc) {
			return $c(aib.opClass, thr);
		} :
		aib.ylil ? function(thr, dc) {
			return thr.firstElementChild;
		} :
		aib.brit ? function(thr, dc) {
			var el,
				post = $$new('div', {'style': 'clear: left;'}, null, dc),
				op = $c(aib.opClass, thr);
			$after($c('postmenu', op), post);
			while((el = thr.firstChild).tagName !== 'TABLE') {
				$after(post, el);
				post = el;
			}
			post = $$new('div', null, null, dc);
			$before(thr.firstChild, [post]);
			while(el = op.firstChild) {
				post.appendChild(el);
			}
			$del($t('table', thr));
			return post;
		} :
		function(thr, dc) {
			var el,
				op = $$new('div', null, null, dc),
				opEnd = $$x(aib.xTable + '|div[starts-with(@id,"repl")]', thr, dc);
			while((el = thr.firstChild) !== opEnd) {
				op.appendChild(el);
			}
			if(thr.childElementCount) {
				$before(thr.firstChild, [op]);
			} else {
				thr.appendChild(op);
			}
			return op;
		};
	aib.getTNum =
		aib.xTNum ? function(op, dc) {
			return $$x(aib.xTNum, op, dc).name.match(/\d+/)[0];
		} :
		aib.krau ? function(op, dc) {
			return op.parentNode.previousElementSibling.name;
		} :
		function(op, dc) {
			return op.parentNode.id.match('\\d+' + (aib._420 ? '$' : ''))[0];
		};
	aib.getPNum = aib.gazo ?
		function(post) {
			return $t('input', post).name;
		} :
		function(post) {
			return post.id.match(/\d+/)[0];
		};
	aib.getOmPosts = aib.gazo ?
		function(el, dc) {
			return $$x('.//font[@color="#707070"]', el, dc);
		} :
		function(el, dc) {
			return $c(aib.cOmPosts, el);
		};
	aib.getSage =
		aib.krau ? function(post) {
			return !!$c('sage', post);
		} :
		aib._410 ? function(post) {
			return $xb('.//span[@class="filetitle" and contains(text(),"' + unescape('%u21E9') + '")]', post);
		} :
		function(post) {
			var a = $x('.//a[starts-with(@href,"mailto:") or @href="sage"]', post);
			return a && /sage/i.test(a.href);
		}
	aib.getImgInfo = aib.fch ?
		function(post) {
			return $c('fileText', post);
		} :
		function (post) {
			return $t('em', post) || $c('filesize', post) || $c('fileinfo', post);
		}
}

function pushPost(dc, post, thr, num, i) {
	post.thr = thr;
	post.Count = i;
	post.Text = getText(post.Msg = aib.getMsg(post));
	post.Img = getImages(post);
	if(i === 0) {
		post.isOp = true;
		post.className += ' DESU_oppost';
		post.dTitle = getTitle(post);
		Threads.push(post);
	} else {
		post.className += ' DESU_post';
	}
	pByNum[post.Num = num] = post;
	Posts.push(post);
}

function parseThread(node, dc, fn) {
	var el, tEl,
		pThr = false,
		thrds = node.getElementsByClassName(aib.tClass);
	if(thrds.length === 0) {
		thrds = $$X(aib.xThreads, node, dc);
		if(thrds.snapshotLength !== 0) {
			$each(thrds, fn);
		} else {
			el = $t('hr', node).parentNode.firstChild;
			while(1) {
				thrds = $$new('div', null, null, dc);
				while(el && (tEl = el.nextSibling) && tEl.tagName !== 'HR') {
					thrds.appendChild(el);
					el = tEl;
				}
				if(pThr) {
					$after(pThr, thrds);
				} else {
					$before(node.firstChild, [thrds]);
				}
				if(!el || !tEl) {
					return;
				}
				if(thrds.childElementCount) {
					fn(thrds);
				}
				pThr = tEl;
				el = tEl.nextSibling;
			}
		}
	} else {
		for(el = 0, tEl = thrds.length; el < tEl; el++) {
			fn(thrds[el]);
		}
	}
}

function parseDelform(node, dc, pFn) {
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
		aib.xPost = aib.fch ?
			'div[2]' :
			'.//td' + (aib.gazo ? '[2]' : '[contains(@class,"' + aib.pClass + '")]');
		aib.xTable = $t('table', node) ? (aib.tire ? 'table[not(@class="postfiles")]' : 'table') : false;
		aib.xWrap = aib.xTable ?
			'.//table/tbody/tr/td' + (aib.gazo ? '[2]' : '[contains(@class,"' + aib.pClass + '")]') :
			'.//div[contains(@class,"' + aib.pClass + '")]';
		aib.getWrap =
			aib.xTable ? function(post) {
				return post.isOp ? post : $x('ancestor::table[1]', post);
			} :
			aib.fch ? function(post) {
				return post.parentNode;
			} :
			function(post) {
				return post;
			};
		if(aib.xTable || aib.fch) {
			postWrapper = $$x(
				aib.brit ? './/div[starts-with(@id,"replies")]/table' :
					aib.fch ? './/div[@class="postContainer replyContainer"]' :
					'.//' + aib.xTable,
				node, dc
			);
			if(dc !== doc && postWrapper) {
				postWrapper = doc.importNode(postWrapper, true);
			}
		}
	}
	parseThread(node, dc, function(thr) {
		var i, len, psts, op = aib.getOp(thr, dc);
		pFn(dc, op, thr, aib.getTNum(op, dc), 0);
		if(!nav.Firefox || aib.gazo) {
			for(psts = $$X(aib.xWrap, thr, dc), len = 0; i = psts.snapshotItem(len);
				pFn(dc, i, thr, aib.getPNum(i), len + 1), len++);
		} else {
			psts = thr.getElementsByClassName(aib.pClass);
			for(i = 0, len = psts.length; i < len; i++) {
				pFn(dc, psts[i], thr, aib.getPNum(psts[i]), i + 1);
			}
		}
		if(dc === doc) {
			if(aib._420 || (aib.tiny && !TNum)) {
				$after(thr, thr.lastChild);
			}
			thr.className += ' DESU_thread';
			thr.Num = op.Num;
			if(!TNum) {
				thr.pCount = len +
					((i = aib.getOmPosts(thr, dc)) && (i = i.textContent) ? +(i.match(/\d+/) || [0])[0] : 0);
			}
		}
	});
	var el = pByNum[window.location.hash.substring(1)];
	if(window.location.hash && el) {
		$event(window, {
			'load': function() {
				setTimeout(function(e) {
					e.className += ' DESU_post';
				}, 1e3, el);
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
	if(!nav.WebKit) {
		$disp(dForm);
	}
	return true;
}

function replaceDelform(el) {
	if(aib.fch || aib.krau || dTime || Cfg['hideBySpell'] && oSpells.rep[0]) {
		var txt = el.innerHTML;
		if(dTime) {
			txt = dTime.init(txt).fix(txt, null);
		}
		if(aib.fch || aib.krau) {
			txt = txt.replace(/(^|>|\s|&gt;)(https*:\/\/.*?)(?=$|<|\s)/ig, '$1<a href="$2">$2</a>');
		}
		if(aib.fch && Cfg['noSpoilers']) {
			txt = txt.replace(/"spoiler">/g, '"DESU_spoiler">');
		}
		if(Cfg['hideBySpell'] && oSpells.rep[0]) {
			txt = doReplace(oSpells.rep, txt);
		}
		el.innerHTML = txt;
	}
}

function preparePage(node) {
	if(aib.krau) {
		$del($t('hr', node));
		$del($t('hr', node.previousElementSibling));
	} else if(aib.abu) {
		$del(node.nextElementSibling);
		$del(node.nextElementSibling);
		node = $c('DESU_thread', node);
		if(TNum && node) {
			$Del('following-sibling::node()', node);
			nav.insAfter(node, '<hr />');
		}
	} else if(aib.brit) {
		node = node.getElementsByClassName('reflink');
		for(var el, i = node.length - 1; i >= 0; i--) {
			el = node[i].firstChild;
			$rattr(el, 'onclick');
			el.href = getThrdUrl(aib.host, brd, el.textContent);
			el.target = '_blank';
		}
	} else if(aib.ylil) {
		node = $t('iframe', node);
		if(node) {
			$del(node.nextElementSibling);
			$del(node.nextElementSibling);
			$del(node);
		}
	}
}

function initUpdater() {
	pr = getPostform($x('.//textarea/ancestor::form[1]', doc));
	oeForm = $x('.//form[contains(@action,"paint") or @name="oeform"]', doc);
	if(!pr.mail) {
		aib.getSage = function(post) {
			return false;
		}
	}
	$Del('preceding-sibling::node()[preceding-sibling::*[descendant-or-self::*[' + (
		aib.fch ? 'self::div[@class="boardBanner"]' : 'self::div[@class="logo"]'
	) + ' or self::h1]]]', dForm);
	if(TNum) {
		var onhid = function() {
				doc.focused = false;
			},
			onvis = function() {
				doc.focused = true;
				if(Cfg['favIcoBlink'] && favIcon) {
					clearInterval(favIcon.delay);
					$Del('.//link[@rel="shortcut icon"]', doc.head);
					doc.head.appendChild($new('link', {
						'href': favIcon,
						'rel': 'shortcut icon'
					}, null));
				}
				if(Cfg['updThread'] === 1) {
					setTimeout(function() {
						doc.title = docTitle;
					}, 0);
				}
			};
		if(!Cfg['rePageTitle']) {
			docTitle = doc.title;
		} else {
			docTitle = '/' + brd + ' - ' + pByNum[TNum].dTitle;
			doc.title = docTitle;
		}
		if(nav.Firefox > 10) {
			doc.addEventListener('mozvisibilitychange', function(e) {
				if(doc.mozHidden) {
					onhid();
				} else {
					onvis();
				}
			}, false);
			doc.focused = !doc.mozHidden;
		} else {
			window.onblur = onhid;
			window.onfocus = onvis;
			doc.focused = false;
			$event(window, {'mousemove': function mouseMove(e) {
				doc.focused = true;
				window.removeEventListener('mousemove', mouseMove, false);
			}});
		}
		initThreadsUpdater();
		if(Cfg['updThread'] === 2 || Cfg['updThread'] === 3) {
			$after($x('.//div[contains(@class," DESU_thread")]', doc), $event($add(
				'<span id="DESU_getNewPosts">[<a href="#">' + Lng.getNewPosts[lCode] + '</a>]</span>'), {
				'click': function(e) {
					$pd(e);
					doc.title = docTitle;
					clearInterval(favIcon.delay);
					loadNewPosts(true, null);
				}
			}));
		}
	} else {
		setTimeout(window.scrollTo, 20, 0, 0);
	}
	if(Cfg['updScript']) {
		checkForUpdates(false, function(html) {
			$alert(html, 'UpdAvail', false);
		});
	}
}


/*==============================================================================
										MAIN
==============================================================================*/

function doScript() {
	if(!Date.now) {
		Date.now = function now() {
			return +(new Date);
		};
	}
	var initTime = Date.now();
	oldTime = initTime;
	if(!isCompatible()) {
		return;
	}
	dummy = $new('div', null, null);
	fixFunctions();
	getPage();
	$log('initBoard');
	readCfg();
	$log('readCfg');
	replaceDelform(dForm);
	$log('replaceDelform');
	if(!tryToParse()) {
		return;
	}
	$log('parseDelform');
	if(Cfg['keybNavig']) {
		initKeyNavig();
		$log('initKeyNavig');
	}
	preparePage(dForm);
	if(!liteMode) {
		initUpdater();
		$log('preparePage');
		addPanel();
		$log('addPanel');
		readFavorites();
		$log('readFavorites');
	}
	initPostform();
	$log('initPostform');
	prepareButtons();
	Posts.forEach(addPostButtons);
	saveFavorites($uneval(Favor));
	$log('addPostButtons');
	readPostsVisib();
	if(Cfg['markViewed']) {
		readViewedPosts();
	}
	$log('readPosts');
	Posts.forEach(doPostFilters);
	$log('doPostFilters');
	if(Cfg['delHiddPost'] === 1) {
		Posts.forEach(mergeHidden);
		$log('mergeHidden');
	}
	if(Cfg['expandImgs']) {
		Posts.forEach(eventPostImg);
		$log('eventPostImg');
	}
	if(Cfg['expandPosts'] && !TNum) {
		Posts.forEach(expandPost);
		$log('expandPost');
	}
	if(Cfg['addMP3']) {
		addLinkMP3(null);
		$log('addLinkMP3');
	}
	if(Cfg['addYouTube']) {
		addLinkTube(null);
		$log('addLinkTube');
	}
	if(Cfg['addImgs']) {
		addLinkImg(dForm);
		$log('addLinkImg');
	}
	if(Cfg['imgSrcBtns']) {
		addImgSearch(dForm);
		$log('addImgSearch');
	}
	if(Cfg['linksNavig'] === 2) {
		genRefMap(pByNum);
		$log('genRefMap');
	}
	if(Cfg['linksNavig']) {
		eventRefLink(dForm);
		$log('eventRefLink');
	}
	saveHiddenPosts();
	$log('saveHiddenPosts');
	scriptCSS();
	$log('scriptCSS');
	if(Cfg['preLoadImgs']) {
		preloadImages(dForm);
		$log('preloadImages');
	}
	endTime = Date.now() - initTime;
}

if(window.opera) $event(doc, {'DOMContentLoaded': doScript});
else doScript();
})(window.opera ? window.opera.scriptStorage : null);
