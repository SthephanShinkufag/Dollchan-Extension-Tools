// ==UserScript==
// @name			Dollchan Extension Tools
// @version			12.9.19.0
// @namespace		http://www.freedollchan.org/scripts/*
// @author			Sthephan Shinkufag @ FreeDollChan
// @copyright		(C)2084, Bender Bending Rodriguez
// @description		Doing some profit for imageboards
// @icon			https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/stable/Icon.png
// @updateURL		https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/stable/Dollchan_Extension_Tools.meta.js
// @include			*
// ==/UserScript==

(function(scriptStorage) {
var defaultCfg = {
	'version':	'12.9.19.0',
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
	'hideRefPsts':	0,		// hide post with references to hidden posts
	'delHiddPost':	0,		// delete hidden posts
	'updThread':	1,		// update threads [0=off, 1=auto, 2=click+count, 3=click]
	'updThrDelay':	60,		//		threads update interval in sec
	'favIcoBlink':	1,		//		favicon blinking, if new posts detected
	'desktNotif':	0,		//		desktop notifications, if new posts detected
	'expandPosts':	2,		// expand shorted posts [0=off, 1=auto, 2=on click]
	'expandImgs':	2,		// expand images by click [0=off, 1=in post, 2=by center]
	'maskImgs':		0,		// mask images
	'preLoadImgs':	0,		// pre-load images
	'findRarJPEG':	0,		// 		detect rarJPEGs in images
	'showGIFs':		0,		// 		show animated GIFs in posts
	'noImgSpoil':	0,		// 		open image spoilers in posts
	'postBtnsTxt':	0,		// show post buttons as text
	'imgSrcBtns':	1,		// add image search buttons
	'noSpoilers':	1,		// open spoilers
	'noPostNames':	0,		// hide post names
	'noPostScrl':	1,		// no scroll in posts
	'keybNavig':	0,		// keyboard navigation
	'correctTime':	0,		// correct time in posts
	'timeOffset':	'',		//		offset in hours
	'timePattern':	'',		//		replace pattern
	'linksNavig':	2,		// navigation by >>links [0=off, 1=no map, 2=+refmap]
	'linksOver':	100,	//		delay appearance in ms
	'linksOut':		1500,	//		delay disappearance in ms
	'markViewed':	0,		//		mark viewed posts
	'strikeHidd':	0,		//		strike >>links to hidden posts
	'noNavigHidd':	0,		//		don't show previews for hidden posts
	'crossLinks':	0,		// replace http: to >>/b/links
	'insertNum':	1,		// insert >>link on postnumber click
	'addMP3':		1,		// mp3 player by links
	'addImgs':		1,		// add images by links
	'addYouTube':	3,		// YouTube links embedder [0=off, 1=onclick, 2=player, 3=preview+player, 4=only preview]
	'YTubeType':	0,		//		player type [0=flash, 1=HTML5 <iframe>, 2=HTML5 <video>]
	'YTubeWidth':	360,	//		player width
	'YTubeHeigh':	270,	//		player height
	'YTubeHD':		0,		//		hd video quality
	'YTubeTitles':	0,		//		convert links to titles
	'ajaxReply':	2,		// posting with AJAX (0=no, 1=iframe, 2=HTML5)
	'postSameImg':	1,		// 		ability to post same images
	'removeEXIF':	1,		// 		remove EXIF data from JPEGs
	'removeFName':	0,		// 		remove file name
	'addPostForm':	2,		// postform displayed [0=at top, 1=at bottom, 2=inline, 3=hanging]
	'noThrdForm':	1,		// hide thread-creating form
	'favOnReply':	1,		// add thread to favorites on reply
	'addSageBtn':	1,		// email field -> sage btn
	'saveSage':		1,		//		remember sage
	'sageReply':	0,		//		reply with sage
	'captchaLang':	1,		// language input in captcha [0=off, 1=en, 2=ru]
	'addTextBtns':	1,		// text format buttons [0=off, 1=graphics, 2=text, 3=usual]
	'txtBtnsLoc':	0,		//		located at [0=top, 1=bottom]
	'passwValue':	'',		// user password value
	'userName':		0,		// user name
	'nameValue':	'',		//		value
	'userSignat':	0,		// user signature
	'signatValue':	'',		//		value
	'noBoardRule':	1,		// hide board rules
	'noGoto':		1,		// hide goto field
	'noPassword':	1,		// hide password field
	'scriptStyle':	0,		// script style [0=glass black, 1=glass blue, 2=solid grey]
	'expandPanel':	0,		// show full main panel
	'attachPanel':	1,		// attach main panel
	'panelCounter':	1,		// posts/images counter in script panel
	'rePageTitle':	1,		// replace page title in threads
	'animation':	1,		// animation in script
	'closePopups':	0,		// auto-close popups
	'updScript':	1,		// check for script's update
	'scrUpdIntrv':	1,		// 		check interval in days (every val+1 day)
	'lastScrUpd':	0,		// 		last update check
	'textaWidth':	500,	// textarea width
	'textaHeight':	160		// textarea height
},

Lng = {
	cfg: {
		'hideBySpell':	['Заклинания: ', 'Magic spells: '],
		'hideByWipe':	['Анти-вайп детекторы ', 'Anti-wipe detectors '],
		'wipeSameLin':	['Повтор строк', 'Same lines'],
		'wipeSameWrd':	['Повтор слов', 'Same words'],
		'wipeLongWrd':	['Длинные слова', 'Long words'],
		'wipeSpecial':	['Спецсимволы', 'Special symbols'],
		'wipeCAPS':		['КАПС/реГисТР', 'CAPS/cAsE'],
		'wipeNumbers':	['Числа', 'Numbers'],
		'filterThrds':	['Применять фильтры к тредам', 'Apply filters to threads'],
		'menuHiddBtn':	['Дополнительное меню кнопок скрытия ', 'Additional menu of hide buttons'],
		'hideRefPsts':	['Скрывать ответы на скрытые посты*', 'Hide replies to hidden posts*'],
		'delHiddPost':	['Удалять скрытые посты', 'Delete hidden posts'],

		'updThread': {
			sel:		[['Откл.', 'Авто', 'Счет+клик', 'По клику'], ['Disable', 'Auto', 'Count+click', 'On click']],
			txt:		['подгрузка постов в треде ', 'loading posts in thread ']
		},
		'updThrDelay':	[' (сек)*', ' (sec)*'],
		'favIcoBlink':	['мигать фавиконом при новых постах*', 'Favicon blinking on new posts*'],
		'desktNotif':		['Уведомления на рабочем столе', 'Desktop notifications'],
		'expandPosts': {
			sel:		[['Откл.', 'Авто', 'По клику'], ['Disable', 'Auto', 'On click']],
			txt:		['загрузка сокращенных постов*', 'upload of shorted posts*']
		},
		'expandImgs': {
			sel:		[['Откл.', 'В посте', 'По центру'], ['Disable', 'In post', 'By center']],
			txt:		['раскрывать изображения ', 'expand images ']
		},
		'preLoadImgs':	['Предварительно загружать изображения*', 'Pre-load images*'],
		'findRarJPEG':	['Распознавать rarJPEG\'и в изображениях*', 'Detect rarJPEGs in images*'],
		'showGIFs':		['Анимировать GIFы в постах*', 'Animate GIFs in posts*'],
		'noImgSpoil':	['Раскрывать изображения-спойлеры*', 'Open spoiler-images*'],
		'postBtnsTxt':	['Кнопки постов в виде текста*', 'Show post buttons as text*'],
		'imgSrcBtns':	['Добавлять кнопки для поиска изображений*', 'Add image search buttons*'],
		'noSpoilers':	['Открывать спойлеры', 'Open spoilers'],
		'noPostNames':	['Скрывать имена в постах', 'Hide names in posts'],
		'noPostScrl':	['Без скролла в постах', 'No scroll in posts'],
		'keybNavig':	['Навигация с помощью клавиатуры* ', 'Navigation with keyboard* '],
		'correctTime':	['Корректировать время в постах* ', 'Correct time in posts* '],
		'timeOffset':	[' Разница во времени', ' Time difference'],
		'timePattern':	['Шаблон замены', 'Replace pattern'],

		'linksNavig': {
			sel:		[['Откл.', 'Без карты', 'С картой'], ['Disable', 'No map', 'With map']],
			txt:		['навигация по >>ссылкам* ', 'navigation by >>links* ']
		},
		'linksOver':	[' задержка появления (мс)', ' delay appearance (ms)'],
		'linksOut':		[' задержка пропадания (мс)', ' delay disappearance (ms)'],
		'markViewed':	['Отмечать просмотренные посты*', 'Mark viewed posts*'],
		'strikeHidd':	['Зачеркивать >>ссылки на скрытые посты', 'Strike >>links to hidden posts'],
		'noNavigHidd':	['Не отображать превью для скрытых постов', 'Don\'t show previews for hidden posts'],
		'crossLinks':	['Преобразовывать http:// в >>/b/ссылки*', 'Replace http:// with >>/b/links*'],
		'insertNum':	['Вставлять >>ссылку по клику на №поста*', 'Insert >>link on №postnumber click*'],
		'addMP3':		['Добавлять плейер к mp3-ссылкам* ', 'Add player to mp3-links* '],
		'addImgs':		['Загружать изображения к .jpg-, .png-, .gif-ссылкам*', 'Load images to .jpg-, .png-, .gif-links*'],
		'addYouTube': {
			sel:		[['Ничего', 'Плейер по клику', 'Авто плейер', 'Превью+плейер', 'Только превью'], ['Nothing', 'On click player', 'Auto player', 'Preview+player', 'Only preview']],
			txt:		['к YouTube-ссылкам* ', 'to YouTube-links* ']
		},
		'YTubeType': {
			sel:		[['Flash', 'HTML5 iframe', 'HTML5 video'], ['Flash', 'HTML5 iframe', 'HTML5 video']],
			txt:		[' ', ' ']
		},
		'YTubeHD':		['HD ', 'HD '],
		'YTubeTitles':	['Загружать названия к YouTube-ссылкам*', 'Load titles into YouTube-links*'],

		'ajaxReply':	{
			sel:		[['Откл.', 'Iframe', 'HTML5'], ['Disable', 'Iframe', 'HTML5']],
			txt:		['AJAX отправка постов*', 'posting with AJAX*']
		},
		'postSameImg':	['Возможность отправки одинаковых изображений', 'Ability to post same images'],
		'removeEXIF':	['Удалять EXIF-данные из JPEG-изображений', 'Remove EXIF-data from JPEG-images'],
		'removeFName':	['Удалять имя из отправляемых файлов', 'Remove name from uploaded files'],
		'addPostForm': {
			sel:		[['Сверху', 'Внизу', 'В постах', 'Отдельная'], ['At top', 'At bottom', 'Inline', 'Hanging']],
			txt:		['форма ответа в треде* ', 'reply form in thread* ']
		},
		'noThrdForm':	['Прятать форму создания треда', 'Hide thread creating form'],
		'favOnReply':	['Добавлять тред в избранное при ответе', 'Add thread to favorites on reply'],
		'addSageBtn':	['Sage вместо поля E-mail* ', 'Sage button instead of E-mail field* '],
		'saveSage':		['запоминать сажу', 'remember sage'],
		'captchaLang': {
			sel:		[['Откл.', 'Eng', 'Rus'], ['Disable', 'Eng', 'Rus']],
			txt:		['язык ввода капчи', 'language input in captcha']
		},
		'addTextBtns': {
			sel:		[['Откл.', 'Графич.', 'Упрощ.', 'Стандарт.'], ['Disable', 'As images', 'As text', 'Standard']],
			txt:		['кнопки форматирования текста ', 'text format buttons ']
		},
		'txtBtnsLoc':	['внизу', 'at bottom'],
		'userPassw':	[' Постоянный пароль', ' Fixed password'],
		'userName':		['Постоянное имя', 'Fixed name'],
		'userSignat':	['Постоянная подпись', 'Fixed signature'],
		'noBoardRule':	['правила ', 'rules '],
		'noGoto':		['поле goto ', 'goto field '],
		'noPassword':	['пароль', 'password'],

		'excludeList':	['Список адресов, запрещающих скрипт:', 'Address list, that excludes script'],
		'scriptStyle': {
			sel:		[['Glass black', 'Glass blue', 'Solid grey'], ['Glass black', 'Glass blue', 'Solid grey']],
			txt:		[' стиль скрипта', ' script style']
		},
		'attachPanel':	['Прикрепить главную панель ', 'Attach main panel '],
		'panelCounter':	['Счетчик постов/изображений в треде', 'Posts/images counter in thread'],
		'rePageTitle':	['Название треда в заголовке вкладки*', 'Thread name in page title*'],
		'animation':	['Включить анимацию в скрипте', 'Enable animation in script'],
		'closePopups':	['Автоматически закрывать уведомления', 'Close popups automatically'],
		'updScript':	['Включить авто-проверку на обновления', 'Enable Auto Update-сheck'],
		'scrUpdIntrv': {
			sel:		[['Каждый день', 'Каждые 2 дня', 'Каждую неделю', 'Каждые 2 недели', 'Каждый месяц'], ['Every day', 'Every 2 days', 'Every week', 'Every 2 week', 'Every month']],
			txt:		['Интервал проверки', 'Check interval']
		},

		'language': {
			sel:		[['Ru', 'En'], ['Ru', 'En']],
			txt:		['', '']
		}
	},

	txtBtn: {
		'bold':		['Жирный', 'Bold'],
		'italic':	['Наклонный', 'Italic'],
		'under':	['Подчеркнутый', 'Underlined'],
		'strike':	['Зачеркнутый', 'Strike'],
		'spoil':	['Спойлер', 'Spoiler'],
		'code':		['Код', 'Code'],
		'quote':	['Цитировать выделенное', 'Quote selected']
	},

	cfgTab: {
		'filters':	['Фильтры', 'Filters'],
		'posts':	['Посты', 'Posts'],
		'links':	['Ссылки', 'Links'],
		'form':		['Форма', 'Form'],
		'common':	['Общее', 'Common'],
		'info':		['Инфо', 'Info']
	},

	panelBtn: {
		'settings':	['Настройки', 'Settings'],
		'hidden':	['Скрытое', 'Hidden'],
		'favor':	['Избранное', 'Favorites'],
		'refresh':	['Обновить', 'Refresh'],
		'goback':	['Назад', 'Go back'],
		'gonext':	['Следующая', 'Next'],
		'goup':		['Наверх', 'To the top'],
		'godown':	['В конец', 'To the bottom'],
		'newthr':	['Создать тред', 'New thread'],
		'expimg':	['Раскрыть картинки', 'Expand images'],
		'maskimg':	['Маскировать картинки', 'Mask images'],
		'upd-on':	['Автообновление треда', 'Thread autoupdate'],
		'audio-off':['Звуковое оповещение о новых постах', 'Sound notification about new posts'],
		'catalog':	['Каталог', 'Catalog'],
		'counter':	['Постов/Изображений в треде', 'Posts/Images in thread']
	},

	selHiderMenu:	[
		['Скрывать выделенное', 'Скрывать изображение', 'Скрыв. схожие изобр.', 'Скрыть схожий текст'],
		['Hide selected text', 'Hide same images', 'Hide similar images', 'Hide similar text']
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
	thrNotFound:	['Тред недоступен (№', 'Thread is unavailable (№'],
	succDeleted:	['Пост(ы) удален(ы)!', 'Post(s) deleted!'],
	errDelete:		['Не могу удалить пост(ы):\n', 'Can\'t delete post(s):\n'],
	cTimeError:		['Неправильные настройки времени', 'Invalid time settings'],
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
	posts:			['Постов: ', 'Posts: '],
	total:			['Всего: ', 'Total: '],
	dontShow:		['Не отображать: ', 'Do not show: '],
	showMore:		['Показать подробнее', 'Show more'],
	loadGlobal:		['Загрузить глобальные настройки', 'Load global settings'],
	saveGlobal:		['Сохранить настройки как глобальные', 'Save settings as global'],
	resetCfg:		['Сбросить в настройки по умолчанию', 'Reset settings to defaults'],
	saveChanges:	['Сохранить внесенные изменения', 'Save your changes'],
	editInTxt:		['Правка в текстовом формате', 'Edit in text format'],
	infoCount:		['Обновить счетчики постов', 'Refresh posts counters'],
	infoPage:		['Проверить актуальность тредов (до 5 страницы)', 'Check for threads actuality (up to 5 page)'],
	clrDeleted:		['Очистить записи недоступных тредов', 'Clear notes of inaccessible threads'],
	clrSelected:	['Удалить выделенные записи', 'Remove selected notes'],
	hiddenPosts:	['Скрытые посты на странице', 'Hidden posts on page'],
	hiddenThrds:	['Скрытые треды', 'Hidden threads'],
	noHidPosts:		['На этой странице нет скрытых постов...', 'No hidden posts on this page...'],
	noHidThrds:		['Нет скрытых тредов...', 'No hidden threads...'],
	expandAll:		['Раскрыть все', 'Expand all'],
	noFavorites:	['Нет избранных тредов...', 'Favorites is empty...'],
	replies:		['Ответы:', 'Replies:'],
	postsOmitted:	['Пропущено ответов: ', 'Posts omitted: '],
	collapseThrd:	['Свернуть тред', 'Collapse thread'],
	deleted:		['удалён', 'deleted'],
	getNewPosts:	['Получить новые посты', 'Get new posts'],
	page:			['Страница', 'Page'],
	hiddenThrd:		['Скрытый тред:', 'Hidden thread:'],
	expandForm:		['Раскрыть форму', 'Expand form'],
	search:			['Искать в ', 'Search in '],
	reply:			['Ответ', 'Reply'],
	replyTo:		['Ответ в', 'Reply to'],
	wait:			['Ждите', 'Wait'],
	addRarJPEG:		['+ rarJPEG', '+ rarJPEG'],
	keyNavHelp:		[
		'На доске:\n"J" - тред ниже,\n"K" - тред выше,\n"N" - пост ниже,\n"M" - пост выше,\n"V" - вход в тред\n\nВ треде:\n"J" - пост ниже,\n"K" - пост выше,\n"V" - быстрый ответ',
		'On board:\n"J" - thread below,\n"K" - thread above,\n"N" - post below,\n"M" - post above,\n"V" - enter a thread\n\nIn thread:\n"J" - post below,\n"K" - post above,\n"V" - quick reply'
	],
	month:			[
		['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
		['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	],
	fullMonth:			[
		['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
		['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	],
	week:			[
		['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт'],
		['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	],
	conReset:		['Данное действие удалит все ваши настройки и закладки. Продолжить?', 'This will delete all your preferences and favourites. Continue?'],
	fileCorrupt:	['Файл повреждён: ', 'File is corrupted: '],
	debug:			['Отладка', 'Debug'],
	infoDebug:		['Информация для отладки', 'Information for debugging']
},

doc = window.document, aProto = Array.prototype,
Cfg, Favor, hThrds, Stat, pByNum = {}, Posts = [], Threads = [], sVis, uVis,
nav, aib, brd, res, TNum, pageNum, docExt, docTitle,
pr, dForm, oeForm, dummy, postWrapper,
Pviews = {deleted: [], ajaxed: {}, top: null, outDelay: null},
Favico = {href: '', delay: null, focused: false},
Audio = {enabled: false, el: null, repeat: false, running: false},
pSpells, tSpells, oSpells, spellsList, spellsHash,
oldTime, endTime, timeLog = '', dTime,
ajaxInterval, lang, hideTubeDelay, quotetxt = '', liteMode, isExpImg;


/*==============================================================================
									UTILITES
==============================================================================*/

function $x(path, root) {
	return doc.evaluate(path, root, null, 8, null).singleNodeValue;
}

function $xb(path, root) {
	return doc.evaluate(path, root, null, 3, null).booleanValue;
}

function $Q(path, root) {
	return root.querySelectorAll(path);
}

function $q(path, root) {
	return root.querySelector(path);
}

function $C(id, root) {
	return nav.Firefox ? root.getElementsByClassName(id) :
		root.querySelectorAll('.' + id);
}

function $c(id, root) {
	return root.getElementsByClassName(id)[0];
}

function $id(id) {
	return doc.getElementById(id);
}

function $T(id, root) {
	return root.getElementsByTagName(id);
}

function $t(id, root) {
	return root.getElementsByTagName(id)[0];
}

function $each(nodes, Fn) {
	aProto.forEach.call(nodes, Fn);
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

function $before(el, node) {
	el.parentNode.insertBefore(node, el);
}

function $after(el, node) {
	el.parentNode.insertBefore(node, el.nextSibling);
}

function $add(html) {
	dummy.innerHTML = html;
	return dummy.firstChild;
}

function $new(tag, attr, events) {
	var el = doc.createElement(tag);
	if(attr) {
		$attr(el, attr);
	}
	if(events) {
		$event(el, events);
	}
	return el;
}

function $New(tag, attr, nodes) {
	var el = $new(tag, attr, null);
	$append(el, nodes);
	return el;
}

function $txt(el) {
	return doc.createTextNode(el);
}

function $btn(val, ttl, Fn) {
	return $new('input', {'type': 'button', 'value': val, 'title': ttl}, {'click': Fn});
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

function $offset(el) {
	var box = el.getBoundingClientRect();
	return {
		top: Math.round(box.top + window.pageYOffset),
		left: Math.round(box.left + window.pageXOffset)
	};
}

function $getStyle(el, prop) {
	return getComputedStyle(el).getPropertyValue(prop);
}

function $focus(el) {
	window.scrollTo(0, $offset(el).top);
}

function $pd(e) {
	e.preventDefault();
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
	return (nav.Opera ? doc.getSelection() : window.getSelection()).toString();
}

function $toRegExp(str) {
	var t = str.match(/\/.*?[^\\]\/[ig]*/)[0],
		l = t.lastIndexOf('/');
	return new RegExp(t.substr(1, l - 1), t.substr(l + 1));
}

function $isEmpty(obj) {
	for(var i in obj) {
		if(obj.hasOwnProperty(i)) {
			return false;
		}
	}
	return true;
}

function $log(txt) {
	var newTime = Date.now();
	timeLog += txt + ': ' + (newTime - oldTime) + 'ms\n';
	oldTime = newTime;
}

function fixFunctions() {
	if(aib.hid) {
		window.setTimeout = function(Fn, num) {
			if(typeof Fn === 'function') {
				Fn.apply(null, aProto.slice.call(arguments, 2));
			}
			return 1;
		};
	}
	if(!String.prototype.contains) {
		String.prototype.contains = function(s) {
			return this.indexOf(s) !== -1;
		};
	}
	if(!window.GM_log) {
		window.GM_log = function(msg) {
			console.error(msg);
		};
	}
	if(!window.GM_xmlhttpRequest) {
		window.GM_xmlhttpRequest = function(obj) {
			var h, xhr = new window.XMLHttpRequest();
			if(obj['onreadystatechange']) {
				xhr.onreadystatechange = function() {
					obj['onreadystatechange'](xhr);
				};
			}
			xhr.onload = function() {
				if(obj['onload']) {
					obj['onload'](xhr);
				}
				xhr = obj = null;
			};
			xhr.open(obj['method'], obj['url'], true);
			xhr.setRequestHeader('Accept-Encoding', 'deflate, gzip, x-gzip');
			for(h in obj['headers']) {
				xhr.setRequestHeader(h, obj['headers'][h]);
			}
			xhr.send(null);
		};
	}
}

function addContentScript(text) {
	doc.head.appendChild($new('script', {'type': 'text/javascript', 'text': text}, null));
}

function getPost(el) {
	return $x('ancestor::*[@de-post]', el);
}

function getPostImages(el) {
	return el.querySelectorAll('.thumb, img[src*="thumb"], img[src*="/spoiler"], img[src^="blob:"]');
}

function getOmPosts(el) {
	var i = $q(aib.qOmitted, el);
	return i && (i = i.textContent) ? +(i.match(/\d+/) || [0])[0] : 0;
}

function getText(el) {
	return el.Text || (el.Text = el.msg.innerHTML
		.replace(/<\/?(?:br|p|li)[^>]*?>/gi,'\n')
		.replace(/<[^>]+?>/g,'')
		.replace(/&gt;/g, '>')
		.replace(/&lt;/g, '<')
		.trim());
}

function getImgWeight(post) {
	var inf = $c(aib.cFileInfo, post).textContent.match(/\d+[\.\d\smkк]*[bб]/i)[0],
		w = parseFloat(inf.match(/[\d\.]+/));
	if(/MB/.test(inf)) {
		w = w * 1e3;
	}
	if(/\d\s*B/.test(inf)) {
		w = (w / 1e3).toFixed(2);
	}
	return +w;
}

function getImgSize(post) {
	var m, el = $c(aib.cFileInfo, post);
	if(aib.brit) {
		m = el.onclick.toString().split('\', \'');
		return [+m[3], +m[4]];
	}
	m = el ? el.textContent.match(/\d+[x×]\d+/) : false;
	return m ? m[0].split(/[x×]/) : [null, null];
}

function fixBrd(b) {
	return '/' + b + (b ? '/' : '');
}

function getThrdUrl(h, b, tNum) {
	return '//' + h + fixBrd(b) + (
		/(?:^|\.)krautchan\.net$/.test(h) ? 'thread-' : 'res/'
	) + tNum + (
		/(?:^|\.)(?:dobrochan\.(?:ru|org)|tenhou\.ru)$/.test(h) ? '.xhtml' :
		/(?:^|\.)420chan\.org$/.test(h) ? '.php' :
		/(?:^|\.)2chan\.net$/.test(h) ? '.htm' :
		'.html'
	);
}

function getPageUrl(h, b, p) {
	return fixBrd(b) + (
		p > 0 ? (p + docExt) :
		/(?:^|\.)(?:dobrochan\.(?:ru|org)|tenhou\.ru)$/.test(h) ? 'index.xhtml' :
		''
	);
}

function getPrettyJSON(obj, indent) {
	var sJSON, iCount, isArr = obj instanceof Array;
	if(isArr) {
		if(obj.length == 0) {
			return '[]';
		}
		sJSON = '[';
	} else if($isEmpty(obj)) {
		return '{}';
	} else {
		sJSON = '{';
	}
	iCount = 0;
	nav.forEach(obj, function(key) {
		var val = this[key],
			type = typeof(val);
		if(type === 'function') {
			return;
		} else if(type === 'object') {
			type = val === null ? 'null' :
				val instanceof Array ? 'array' :
				val instanceof Date ? 'date' :
				val instanceof RegExp ? 'regex' :
				'object';
		}
		if(iCount > 0) {
			sJSON += ',';
		}
		sJSON += '\n' + indent + '    ' + (isArr ? '' : '"' + key + '"' + ': ') + (
			type === 'array' || type === 'object' ? getPrettyJSON(val, indent + '    ') :
			type === 'boolean' || type === 'number' ? val.toString() :
			type === 'string' ? '"' + val.replace(/"/g, '\\"') + '"' : type
		);
		iCount++;
	});
	return sJSON += '\n' + indent + (isArr ? ']' : '}');
}

function ELFHash(str) {
	for(var g, h = 0, i = 0, len = str.length; i < len; ++i) {
		h = (h << 4) + str.charCodeAt(i);
		if(g = h & 0xF0000000) {
			h ^= g >>> 24;
		}
		h &= ~g;
	}
	return h;
}


/*==============================================================================
								STORAGE / CONFIG
==============================================================================*/

function setCookie(id, value, life) {
	doc.cookie = escape(id) + '=' + escape(value) + ';expires=' +
		(new Date(Date.now() + life)).toGMTString() + ';path=/';
}

function getCookie(id) {
	var one, arr = doc.cookie.split('; '),
		i = arr.length;
	while(i--) {
		one = arr[i].split('=');
		if(one[0] === escape(id)) {
			return unescape(one[1]);
		}
	}
	return false;
}

function getStored(id) {
	return nav.isGM ? GM_getValue(id) :
		scriptStorage ? scriptStorage.getItem(id) :
		localStorage.getItem(id);
}

function setStored(id, value) {
	if(nav.isGM) {
		GM_setValue(id, value);
	} else if(scriptStorage) {
		scriptStorage.setItem(id, value);
	} else {
		localStorage.setItem(id, value);
	}
}

function getStoredObj(id, def) {
	try {
		return JSON.parse(getStored(id)) || def;
	} catch(e) {
		return def;
	}
}

function saveSpells(val) {
	spellsHash = ELFHash(val);
	spellsList = val.split('\n');
	setStored('DESU_Spells_' + aib.dm, JSON.stringify([spellsHash, spellsList]));
	initSpells();
}

function readSpells() {
	var arr, data = getStored('DESU_Spells_' + aib.dm);
	try {
		arr = JSON.parse(data);
		spellsHash = arr[0];
		spellsList = arr[1];
		initSpells();
	} catch(e) {
		saveSpells(data || '');
	}
}

/** @constructor */
function Config(cfg) {
	for(var key in cfg) {
		this[key] = cfg[key];
	}
}
Config.prototype = defaultCfg;

function parseCfg(id) {
	try {
		var rv = JSON.parse(getStored(id));
		if(rv['version']) {
			return new Config(rv);
		}
	} catch(e) {}
	return false;
}

function fixCfg(isGlob) {
	var rv = isGlob && parseCfg('DESU_GlobalCfg') || new Config({'version': defaultCfg['version']});
	rv['captchaLang'] = aib.ru ? 2 : 1;
	rv['language'] = navigator.language.contains('ru') ? 0 : 1;
	rv['timePattern'] = rv['timeOffset'] = '';
	rv['correctTime'] = 0;
	return rv;
}

function readCfg() {
	Cfg = parseCfg('DESU_Config_' + aib.dm) || fixCfg(nav.isGlobal);
	Cfg['version'] = defaultCfg['version'];
	if(nav.noBlob) {
		Cfg['preLoadImgs'] = 0;
	}
	if((nav.noBlob || nav.Safari) && Cfg['ajaxReply'] === 2) {
		Cfg['ajaxReply'] = 1;
	}
	if(!nav.Anim) {
		Cfg['animations'] = 0;
	}
	if(aib.fch || aib.abu) {
		Cfg['findRarJPEG'] = 0;
	}
	if(!nav.Firefox) {
		defaultCfg['favIcoBlink'] = 0;
	}
	if(!nav.WebKit) {
		Cfg['desktNotif'] = 0;
	}
	if(nav.Opera) {
		if(nav.Opera < 11.6 && Cfg['scriptStyle'] < 2) {
			Cfg['scriptStyle'] = 2;
		}
		if(nav.Opera < 12) {
			Cfg['YTubeTitles'] = 0;
		}
		if(Cfg['YTubeType'] === 2) {
			Cfg['YTubeType'] = 1;
		}
		Cfg['updScript'] = 0;
	}
	if(!Cfg['saveSage']) {
		Cfg['sageReply'] = 0;
	}
	if(!Cfg['passwValue']) {
		Cfg['passwValue'] = Math.round(Math.random() * 1e15).toString(32);
	}
	setStored('DESU_Config_' + aib.dm, JSON.stringify(Cfg));
	lang = Cfg['language'];
	Stat = getStoredObj('DESU_Stat_' + aib.dm, {'view': 0, 'op': 0, 'reply': 0});
	if(TNum) {
		Stat['view'] = +Stat['view'] + 1;
	}
	setStored('DESU_Stat_' + aib.dm, JSON.stringify(Stat));
	if(Cfg['correctTime']) {
		dTime = new dateTime(
			Cfg['timePattern'],
			Cfg['timeOffset'],
			lang,
			sessionStorage['timeRPattern'],
			sessionStorage['timeRPHash']
		);
	}
	if(aib.hana) {
		aib.hDTFix = new dateTime(
			'yyyy-nn-dd-hh-ii-ss',
			Cfg['timeOffset'] || 0,
			Cfg['correctTime'] ? lang : 1,
			'1_d _m _y (_w) _h:_i ',
			152203056
		);
	}
	if(Cfg['hideBySpell']) {
		readSpells();
	}
	aib.rep = aib.fch || aib.krau || dTime || (oSpells && oSpells.rep[0]) || Cfg['crossLinks'];
}

function saveCfg(id, val) {
	if(Cfg[id] !== val) {
		Cfg[id] = val;
		setStored('DESU_Config_' + aib.dm, JSON.stringify(Cfg));
	}
}

function toggleCfg(id) {
	saveCfg(id, !Cfg[id] ? 1 : 0);
}

function getHidCfg() {
	return !Cfg['hideByWipe'] ? 0 :
		Cfg['wipeSameLin'] | (Cfg['wipeSameWrd'] << 1) | (Cfg['wipeLongWrd'] << 2) |
			(Cfg['wipeCAPS'] << 3) | (Cfg['wipeSpecial'] << 4) | (Cfg['wipeNumbers'] << 5);
}

function readPostsVisib() {
	sVis = [];
	if(TNum) {
		var data = (sessionStorage['de-hidden'] || '').split(',');
		if(+data[0] === (Cfg['hideBySpell'] ? spellsHash : 0) && +data[1] === getHidCfg()) {
			sVis = data[2].split('');
			if(data = sessionStorage['de-deleted']) {
				data.split(',').forEach(function(dC) {
					sVis.splice(dC, 1);
				});
				delete sessionStorage['de-deleted'];
			}
		}
	}
	sVis.length = Posts.length;
	uVis = getStoredObj('DESU_Posts_' + aib.dm + '_' + brd, {});
	readHiddenThreads();
}

function savePostsVisib() {
	if(TNum) {
		sessionStorage['de-hidden'] = (Cfg['hideBySpell'] ? spellsHash + ',' : '0,') +
			getHidCfg() + ',' + sVis.join('');
	}
	toggleContent('hid', true);
}

function saveUserPostsVisib() {
	var minDate, str = JSON.stringify(uVis);
	if(str.length > 9000) {
		minDate = Date.now() - 5 * 24 * 3600 * 1000;
		nav.forEach(uVis, function(i) {
			if(uVis[i][1] < minDate) {
				delete uVis[i];
			}
		});
		str = JSON.stringify(uVis);
	}
	setStored('DESU_Posts_' + aib.dm + '_' + brd, str);
	toggleContent('hid', true);
}

function readHiddenThreads() {
	hThrds = getStoredObj('DESU_Threads_' + aib.dm, {});
}

function toggleHiddenThread(post, vis) {
	if(!hThrds[brd]) {
		hThrds[brd] = {};
	}
	if(vis === 0) {
		hThrds[brd][post.num] = post.tTitle;
	} else {
		delete hThrds[brd][post.num];
		if($isEmpty(hThrds[brd])) {
			delete hThrds[brd];
		}
	}
	setStored('DESU_Threads_' + aib.dm, JSON.stringify(hThrds));
}

function readFavorites() {
	Favor = getStoredObj('DESU_Favorites', {});
}

function saveFavorites(txt) {
	setStored('DESU_Favorites', txt);
	toggleContent('fav', true);
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
		($c('de-btn-fav-sel', pByNum[tNum].btns) || {}).className = 'de-btn-fav';
	}
}

function toggleFavorites(post, btn) {
	var h = aib.host,
		b = brd,
		tNum = post.num;
	if(!btn) {
		return;
	}
	readFavorites();
	if(Favor[h] && Favor[h][b] && Favor[h][b][tNum]) {
		removeFavorites(h, b, tNum);
		saveFavorites(JSON.stringify(Favor));
		return;
	}
	if(!Favor[h]) {
		Favor[h] = {};
	}
	if(!Favor[h][b]) {
		Favor[h][b] = {};
	}
	Favor[h][b][tNum] = {'cnt': post.thr.pCount + 1, 'txt': post.tTitle};
	btn.className = 'de-btn-fav-sel';
	saveFavorites(JSON.stringify(Favor));
}

function readViewedPosts() {
	var viewed = sessionStorage['de-viewed'];
	if(viewed) {
		viewed.split(',').forEach(function(pNum) {
			var post = pByNum[pNum];
			if(post) {
				nav.addClass(post, 'de-viewed');
				post.viewed = true;
			}
		});
	}
}

/*==============================================================================
									MAIN PANEL
==============================================================================*/

function pButton(id, click, href, over, out) {
	return $New('li', null, [
		$new('a', {
			'id': 'de-btn-' + id,
			'class': 'de-abtn',
			'title': Lng.panelBtn[id][lang],
			'href': href || '#',
			'onmouseout': out}, {
			'click': click,
			'mouseover': over
		})
	]);
}

function addPanel() {
	var imgLen = getPostImages(dForm).length;
	$before(dForm, $New('div', {'id': 'de-main', 'lang': getThemeLang()}, [
		$New('div', {'id': 'de-panel'}, [
			$new('span', {'id': 'de-btn-logo'}, {'click': function() {
				toggleCfg('expandPanel');
				updateCSS();
			}}),
			$New('ul', {'id': 'de-panel-btns'}, [
				pButton('settings', function(e) {
					$pd(e);
					toggleContent('cfg', false);
				}, null, null, null),
				pButton('hidden', function(e) {
					$pd(e);
					toggleContent('hid', false);
				}, null, null, null),
				pButton('favor', function(e) {
					$pd(e);
					toggleContent('fav', false);
				}, null, null, null),
				pButton('refresh', function(e) {
					$pd(e);
					window.location.reload();
				}, null, function() {
					if(!TNum) {
						selectAjaxPages();
					}
				}, 'de_delSelection(event)'),
				pButton(
					'goback', null,
					'//' + aib.host + getPageUrl(aib.host, brd, pageNum - 1),
					null, null
				),
				$if(!TNum, pButton(
					'gonext', null,
					'//' + aib.host + getPageUrl(aib.host, brd, pageNum + 1),
					null, null
				)),
				pButton('goup', function(e) {
					$pd(e);
					window.scrollTo(0, 0);
				}, null, null, null),
				pButton('godown', function(e) {
					$pd(e);
					window.scrollTo(0, doc.body.scrollHeight || doc.body.offsetHeight);
				}, null, null, null),
				$if(!TNum && (pr.on || oeForm), pButton('newthr', toggleMainReply, null, null, null)),
				$if(imgLen > 0, pButton('expimg', function(e) {
					$pd(e);
					Cfg['expandImgs'] = 1;
					isExpImg = !isExpImg;
					Posts.forEach(function(post) {
						expandAllPostImg(post, isExpImg);
					});
				}, null, null, null)),
				$if(pr.file || oeForm, pButton('maskimg', function(e) {
					$pd(e);
					toggleCfg('maskImgs');
					updateCSS();
				}, null, null, null)),
				$if(TNum && Cfg['updThread'] !== 3, pButton('upd-on', function(e) {
					$pd(e);
					if(ajaxInterval) {
						endPostsUpdate();
					} else {
						this.id = 'de-btn-upd-on';
						initThreadsUpdater();
					}
				}, null, null, null)),
				$if(!nav.Safari && TNum && Cfg['updThread'] === 1, pButton('audio-off', function(e) {
					$pd(e);
					toggleAudioNotif();
					Audio.repeat = false;
					this.id = Audio.enabled ? 'de-btn-audio-on' : 'de-btn-audio-off';
					$del($id('de-select'));
				}, null, selectAudioNotif, 'de_delSelection(event)')),
				$if(aib.nul, pButton('catalog', null, '//0chan.ru/' + brd + '/catalog.html', null, null))
			]),
			$if(TNum, $New('div', {'id': 'de-panel-info'}, [
				$new('span', {
					'title': Lng.panelBtn['counter'][lang],
					'text': Posts.length + '/' + imgLen
				}, null)
			]))
		]),
		$new('div', {'class': 'de-content'}, null),
		$new('div', {'id': 'de-alert'}, null),
		$new('hr', {'style': 'clear: both;'}, null)
	]));
}

function toggleContent(name, isUpd) {
	if(liteMode) {
		return;
	}
	var el = $c('de-content', doc),
		id = 'de-content-' + name;
	if(isUpd && el.id !== id) {
		return;
	}
	if(el.childElementCount && Cfg['animation']) {
		nav.animEvent(el, function(node) {
			showContent(node, id, name, isUpd);
			id = name = isUpd = null;
		});
		el.className = 'de-content de-cfg-close';
	} else {
		showContent(el, id, name, isUpd);
	}
}

function showContent(el, id, name, isUpd) {
	el.innerHTML = el.style.backgroundColor = '';
	if(!isUpd && el.id === id) {
		el.removeAttribute('id');
		return;
	}
	el.id = id;
	if(!Cfg['attachPanel']) {
		el.appendChild($new('hr', {'style': 'clear: both;'}, null));
	}
	if(name === 'cfg') {
		addSettings(el);
	} else {
		if(Cfg['attachPanel']) {
			el.style.backgroundColor = $getStyle(doc.body, 'background-color');
		}
		if(name === 'hid') {
			readHiddenThreads();
			addHiddenTable(el);
		}
		if(name === 'fav') {
			readFavorites();
			addFavoritesTable(el);
		}
	}
	if(Cfg['animation']) {
		el.className = 'de-content de-cfg-open';
	}
}


/*==============================================================================
								"SETTINGS" WINDOW
==============================================================================*/

function lBox(id, isBlock, Fn) {
	var el = $new('input', {'info': id, 'type': 'checkbox'}, {'click': function() {
		toggleCfg(this.getAttribute('info'));
		if(Fn) {
			Fn(this);
		}
	}});
	el.checked = Cfg[id];
	return $New('label', isBlock ? {'class': 'de-blockinp'} : null, [el, $txt(' ' + Lng.cfg[id][lang])]);
}

function inpTxt(id, size, Fn) {
	return $new('input', {'info': id, 'type': 'text', 'size': size, 'value': Cfg[id]}, {
		'keyup': Fn ? Fn : function() {
			saveCfg(this.getAttribute('info'), this.value);
		}
	});
}

function optSel(id, isBlock, Fn) {
	for(var i = 0, x = Lng.cfg[id], len = x.sel[lang].length, el, opt = []; i < len; i++) {
		opt[i] = '<option value="' + i + '">' + x.sel[lang][i] + '</option>';
	}
	(el = $event($add('<select info="' + id + '">' + opt.join('') + '</select>'), {
		'change': Fn ? Fn : function() {
			saveCfg(this.getAttribute('info'), this.selectedIndex);
		}
	})).selectedIndex = Cfg[id];
	return $New('label', isBlock ? {'class': 'de-blockinp'} : null, [el, $txt(' ' + x.txt[lang])]);
}

function cfgTab(name) {
	return $New('div', {'class': aib.cReply + ' de-cfg-tab-back', 'selected': false}, [
		$new('div', {'class': 'de-cfg-tab', 'text': Lng.cfgTab[name][lang], 'info': name}, {
			'click': function() {
				var el, id, pN = this.parentNode;
				if(pN.getAttribute('selected') === 'true') {
					return;
				}
				el = $c('de-cfg-body', doc);
				if(el) {
					el.className = 'de-cfg-unvis';
					$q('.de-cfg-tab-back[selected="true"]', doc).setAttribute('selected', false);
				}
				pN.setAttribute('selected', true);
				id = this.getAttribute('info');
				el = $id('de-cfg-' + id);
				if(!el) {
					$after($id('de-cfg-bar'), el =
						id === 'posts' ? getCfgPosts() :
						id === 'links' ? getCfgLinks() :
						id === 'form' ? getCfgForm() :
						id === 'common' ? getCfgCommon() :
						getCfgInfo()
					);
				}
				el.className = 'de-cfg-body';
				if(id === 'filters') {
					readSpells();
					$id('de-spell-edit').value = spellsList.join('\n');
				}
			}
		})
	]);
}

function getCfgFilters() {
	return $New('div', {'class': 'de-cfg-unvis', 'id': 'de-cfg-filters'}, [
		$New('div', null, [
			$New('span', {'id': 'de-spell-panel'}, [
				$new('a', {
					'text': Lng.add[lang],
					'href': '#',
					'class': 'de-abtn',
					'onmouseout': 'de_delSelection(event)'}, {
					'click': $pd,
					'mouseover': selectSpell
				}),
				$new('a', {'text': Lng.apply[lang], 'href': '#', 'class': 'de-abtn'}, {
					'click': function(e) {
						$pd(e);
						saveCfg('hideBySpell', 1);
						$q('input[info="hideBySpell"]', doc).checked = true;
						toggleSpells();
					}
				}),
				$new('a', {'text': Lng.clear[lang], 'href': '#', 'class': 'de-abtn'}, {
					'click': function(e) {
						$pd(e);
						$id('de-spell-edit').value = '';
						toggleSpells();
					}
				}),
				$new('a', {
					'text': '?',
					'target': '_blank',
					'href': '//www.freedollchan.org/scripts/spells',
					'class': 'de-abtn'
				}, null)
			]),
			lBox('hideBySpell', false, toggleSpells),
			$new('textarea', {'id': 'de-spell-edit', 'rows': 10, 'cols': 49}, null)
		]),
		lBox('hideByWipe', true, null),
		$New('div', {'id': 'de-cfg-wipe'}, [
			$New('div', null, [
				lBox('wipeSameLin', false, null),
				lBox('wipeSameWrd', false, null),
				lBox('wipeLongWrd', false, null)
			]),
			$New('div', null, [
				lBox('wipeSpecial', false, null),
				lBox('wipeCAPS', false, null),
				lBox('wipeNumbers', false, null)
			])
		]),
		lBox('filterThrds', true, null),
		lBox('menuHiddBtn', true, null),
		lBox('hideRefPsts', true, null),
		lBox('delHiddPost', true, function() {
			$each($C('de-post-hid', dForm), function(post) {
				$disp(aib.getWrap(post));
			});
			updateCSS();
		})
	]);
}

function getCfgPosts() {
	return $New('div', {'class': 'de-cfg-unvis', 'id': 'de-cfg-posts'}, [
		optSel('updThread', false, null),
		$New('label', null, [
			inpTxt('updThrDelay', 4, null),
			$txt(Lng.cfg['updThrDelay'][lang])
		]),
		$New('div', {'style': 'padding-left: 25px;'}, [
			lBox('favIcoBlink', true, null),
			$if(nav.WebKit, lBox('desktNotif', true, function() {
				if(Cfg['desktNotif']) {
					window.webkitNotifications.requestPermission();
				}
			}))
		]),
		optSel('expandPosts', true, null),
		optSel('expandImgs', true, null),
		$if(!nav.noBlob, lBox('preLoadImgs', true, null)),
		$if(!nav.noBlob, $New('div', {'style': 'padding-left: 25px;'}, [
			$if(aib.rJpeg, lBox('findRarJPEG', true, null)),
			lBox('showGIFs', true, null),
			lBox('noImgSpoil', true, null)
		])),
		lBox('postBtnsTxt', true, null),
		lBox('imgSrcBtns', true, null),
		lBox('noSpoilers', true, updateCSS),
		lBox('noPostNames', true, updateCSS),
		lBox('noPostScrl', true, updateCSS),
		$New('div', null, [
			lBox('keybNavig', false, null),
			$new('a', {'text': '?', 'href': '#', 'class': 'de-abtn'}, {'click': function(e) {
				$pd(e);
				$alert(Lng.keyNavHelp[lang], 'help-keybnavig', false);
			}})
		]),
		lBox('correctTime', true, dateTime.toggleSettings),
		$New('div', {'style': 'padding-left: 25px;'}, [
			$New('div', null, [
				inpTxt('timeOffset', 3, null),
				$txt(Lng.cfg['timeOffset'][lang])
			]),
			$New('div', null, [
				inpTxt('timePattern', 30, null),
				$txt(' '),
				$new('a', {'text': Lng.cfg['timePattern'][lang], 'href': '#', 'class': 'de-abtn'}, {
					'click': function(e) {
						$pd(e);
						$alert('"s" - second (one digit),\n"i" - minute (one digit),\n"h" - hour (one digit),\n"d" - day (one digit),\n"w" - week (string)\n"n" - month (one digit),\n"m" - month (string),\n"y" - year (one digit),\n"-" - any symbol\n"+" - any symbol except digits\n"?" - previous char may not be\n\nExamples:\n0chan.ru: "w+yyyy+m+dd+hh+ii+ss"\niichan.ru, 2ch.so: "w+dd+m+yyyy+hh+ii+ss"\ndobrochan.ru: "dd+m+?+?+?+?+?+yyyy++w++hh+ii-?s?s?"\n410chan.org: "dd+nn+yyyy++w++hh+ii+ss"\n4chan.org: "nn+dd+yy+w+hh+ii-?s?s?"\n4chon.net: "nn+dd+yy++w++hh+ii+ss"\nkrautchan.net: "yyyy+nn+dd+hh+ii+ss+--?-?-?-?-?"', 'help-correcttime', false);
					}
				})
			])
		])
	]);
}

function getCfgLinks() {
	return $New('div', {'class': 'de-cfg-unvis', 'id': 'de-cfg-links'}, [
		optSel('linksNavig', true, null),
		$New('div', {'style': 'padding-left: 25px;'}, [
			$New('div', null, [
				inpTxt('linksOver', 6, function() {
					saveCfg('linksOver', +this.value | 0);
				}),
				$txt(Lng.cfg['linksOver'][lang])
			]),
			$New('div', null, [
				inpTxt('linksOut', 6, function() {
					saveCfg('linksOut', +this.value | 0);
				}),
				$txt(Lng.cfg['linksOut'][lang])
			]),
			lBox('markViewed', true, null),
			lBox('strikeHidd', true, null),
			lBox('noNavigHidd', true, null)
		]),
		lBox('crossLinks', true, null),
		lBox('insertNum', true, null),
		lBox('addMP3', true, null),
		lBox('addImgs', true, null),
		optSel('addYouTube', true, null),
		$New('div', {'style': 'padding-left: 25px;'}, [
			$New('div', null, [
				optSel('YTubeType', false, null),
				inpTxt('YTubeWidth', 6, null),
				$txt('×'),
				inpTxt('YTubeHeigh', 6, null),
				$txt(' '),
				lBox('YTubeHD', false, null)
			]),
			$if(!(nav.Opera && nav.Opera < 12), lBox('YTubeTitles', false, null))
		])
	]);
}

function getCfgForm() {
	return $New('div', {'class': 'de-cfg-unvis', 'id': 'de-cfg-form'}, [
		optSel('ajaxReply', true, null),
		$if(!nav.Safari && !nav.noBlob, $New('div', {'style': 'padding-left: 25px;'}, [
			lBox('postSameImg', true, null),
			lBox('removeEXIF', true, null),
			lBox('removeFName', true, null)
		])),
		$if(pr.on, optSel('addPostForm', true, null)),
		$if(pr.on, lBox('noThrdForm', true, function() {
			if(!TNum) {
				$id('de-parea').style.display = Cfg['noThrdForm'] ? 'none' : '';
			}
		})),
		lBox('favOnReply', true, null),
		$if(pr.mail, $New('div', null, [
			lBox('addSageBtn', false, null),
			lBox('saveSage', false, null)
		])),
		optSel('captchaLang', true, null),
		$if(pr.on, $New('div', null, [
			optSel('addTextBtns', false, function() {
				saveCfg('addTextBtns', this.selectedIndex);
				addTextPanel();
			}),
			lBox('txtBtnsLoc', false, addTextPanel)
		])),
		$if(pr.passw, $New('div', null, [
			inpTxt('passwValue', 20, setUserPassw),
			$txt(Lng.cfg['userPassw'][lang])
		])),
		$if(pr.name, $New('div', null, [
			inpTxt('nameValue', 20, setUserName),
			lBox('userName', false, setUserName)
		])),
		$if(pr.txta, $New('div', null, [
			inpTxt('signatValue', 20, null),
			lBox('userSignat', false, null)
		])),
		$New('div', null, [
			$if(pr.on || oeForm, $txt(Lng.dontShow[lang])),
			lBox('noBoardRule', false, updateCSS),
			$if(pr.gothr, lBox('noGoto', false, function() {
				$disp(pr.gothr);
			})),
			$if(pr.passw, lBox('noPassword', false, function() {
				$disp(pr.passw.parentNode.parentNode);
			}))
		])
	]);
}

function getCfgCommon() {
	return $New('div', {'class': 'de-cfg-unvis', 'id': 'de-cfg-common'}, [
		$if(nav.isGlobal, $New('div', null, [
			$txt(Lng.cfg['excludeList'][lang]),
			$new('textarea', {'value': getStored('DESU_Exclude') || '', 'rows': 6, 'cols': 49}, {
				'keyup': function() {
					setStored('DESU_Exclude', this.value);
				}
			})
		])),
		optSel('scriptStyle', true, function() {
			saveCfg('scriptStyle', this.selectedIndex);
			$id('de-main').lang = getThemeLang();
		}),
		lBox('attachPanel', true, function() {
			toggleContent('cfg', false);
			updateCSS();
		}),
		lBox('panelCounter', true, updateCSS),
		lBox('rePageTitle', true, null),
		$if(nav.Anim, lBox('animation', true, null)),
		lBox('closePopups', true, null),
		$if(!nav.Opera, $New('div', null, [
			lBox('updScript', true, null),
			$New('div', {'id': 'de-upd-cont', 'style': 'padding: 2px 0 10px 25px;'}, [
				optSel('scrUpdIntrv', false, null),
				$btn(Lng.checkNow[lang], '', function() {
					var el = $id('de-updresult');
					el.innerHTML = '<span class="de-wait">' + Lng.checking[lang] + '</div>';
					checkForUpdates(true, function(html) {
						el.innerHTML = html;
					});
				})
			]),
			$new('div', {'id': 'de-updresult', 'style': 'font-size: 1.1em; text-align: center'}, null)
		]))
	]);
}

function getCfgInfo() {
	return $New('div', {'class': 'de-cfg-unvis', 'id': 'de-cfg-info'}, [
		$add('<span style="width: 179px;"><b>' + Lng.version[lang] + Cfg['version'] + '</b><br><br>' +
			Lng.storage[lang] + (
				nav.isGM ? 'Mozilla config' :
				scriptStorage ? 'Opera ScriptStorage' :
				'Local Storage'
			) + '<br>' + Lng.thrViewed[lang] + Stat['view'] + '<br>' +
			Lng.thrCreated[lang] + Stat['op'] + '<br>' + Lng.posts[lang] + Stat['reply'] + '</span>'),
		$add('<span style="padding-left: 7px; border-left: 1px solid grey;">' +
			timeLog.split('\n').join('<br>') + '<br>' + Lng.total[lang] + endTime + 'ms</span>'),
		$New('div', {'style': 'display: table;'}, [
			$add('<span style="display: table-cell; width: 100%;"><a href="//www.freedollchan.org/scripts/"' +
				' target="_blank">http://www.freedollchan.org/scripts</a></span>'),
			$attr($btn(Lng.debug[lang], Lng.infoDebug[lang], function() {
				var i, nCfg = new Config(Cfg),
					tl = timeLog.split('\n');
				tl[tl.length - 1] = Lng.total[lang] + endTime + 'ms';
				delete nCfg['nameValue'];
				delete nCfg['passwValue'];
				delete nCfg['signatValue'];
				delete nCfg['lastScrUpd'];
				for(i in nCfg) {
					if(nCfg[i] === defaultCfg[i]) {
						delete nCfg[i];
					}
				}
				$alert(Lng.infoDebug[lang] + ':<br /><textarea readonly rows="20" cols="75">' + getPrettyJSON({
					'version': defaultCfg['version'],
					'location': String(window.location),
					'nav': nav,
					'cfg': nCfg,
					'spells': spellsList,
					'perf': tl
				}, '') + '</textarea>', 'help-debug', false);
			}), {'style': 'display: table-cell;'})
		])
	]);
}

function addSettings(Set) {
	Set.appendChild($New('div', {'class': aib.cReply}, [
		$new('div', {'id': 'de-cfg-head', 'text': 'Dollchan Extension Tools'}, null),
		$New('div', {'id': 'de-cfg-bar'}, [
			cfgTab('filters'),
			cfgTab('posts'),
			cfgTab('links'),
			cfgTab('form'),
			cfgTab('common'),
			cfgTab('info')
		]),
		getCfgFilters(),
		$New('div', {'id': 'de-cfg-btns'}, [
			$New('span', {'style': 'float: right;'}, [
				optSel('language', false, function() {
					saveCfg('language', lang = this.selectedIndex);
					$del($id('de-main'));
					$del($id('de-css'));
					$del($id('de-css-dynamic'));
					scriptCSS();
					addPanel();
					toggleContent('cfg', false);
				}),
				$if(nav.isGlobal, $btn(Lng.load[lang], Lng.loadGlobal[lang], function() {
					if(parseCfg('DESU_GlobalCfg')) {
						setStored('DESU_Config_' + aib.dm, '');
						window.location.reload();
					} else {
						$alert(Lng.noGlobalCfg[lang], 'err-noglobalcfg', false);
					}
				})),
				$if(nav.isGlobal, $btn(Lng.save[lang], Lng.saveGlobal[lang], function() {
					setStored('DESU_GlobalCfg', JSON.stringify(Cfg));
					toggleContent('cfg', true);
				})),
				$btn(Lng.edit[lang], Lng.editInTxt[lang], function() {
					$disp($attr($t('textarea', this.parentNode.parentNode), {
						'value': getPrettyJSON(Cfg, '')
					}).parentNode);
				}),
				$btn(Lng.reset[lang], Lng.resetCfg[lang], function() {
					if(confirm(Lng.conReset[lang])) {
						setStored('DESU_Config_' + aib.dm, JSON.stringify(fixCfg(false)));
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
				$new('textarea', {'rows': 10, 'cols': 49}, null),
				$btn(Lng.save[lang], Lng.saveChanges[lang], function() {
					setStored('DESU_Config_' + aib.dm, this.previousSibling.value.trim().replace(/\t|\n/g, ''));
					window.location.reload();
				})
			])
		])
	]));
	$c('de-cfg-tab', Set).click();
}


/*==============================================================================
									"HIDDEN" WINDOW
==============================================================================*/

function contentBlock(parent, link) {
	return parent.appendChild($New('div', {'class': 'de-content-block'}, [
		$new('input', {'type': 'checkbox'}, {'click': function() {
			var res = this.checked;
			$each($Q('.de-entry > div > input', this.parentNode), function(el) {
				el.checked = res;
			});
			res = null;
		}}),
		link
	]));
}

function addHiddenTable(hid) {
	var b, tNum, block;
	$each($C('de-post-hid', dForm), function(post) {
		if(post.isOp) {
			return;
		}
		var cln = post.cloneNode(true);
		cln.removeAttribute('id');
		cln.style.display = '';
		cln.hide = true;
		cln.pst = post;
		cln.btn = $q('.de-btn-hide, .de-btn-lock', cln);
		cln.btn.parentNode.className = 'de-ppanel';
		cln.btn.onmouseover = cln.btn.onmouseout = null;
		cln.btn.onclick = function() {
			var pst = getPost(this);
			togglePostContent(pst, pst.hide = !pst.hide);
		};
		(block || (block = hid.appendChild($New('div', {'class': 'de-content-block'}, [
			$add('<b>' + Lng.hiddenPosts[lang] + ':</b>')
		])))).appendChild($New('div', {'class': 'de-entry'}, [cln]));
	});
	if(block) {
		$append(hid, [
			$btn(Lng.expandAll[lang], '', function() {
				$each($Q('.de-entry > [de-post]', this.parentNode), function(el) {
					togglePostContent(el, el.hide = !el.hide);
				});
				this.value = this.value == Lng.undo[lang] ? Lng.expandAll[lang] : Lng.undo[lang];
			}),
			$btn(Lng.save[lang], '', function() {
				$each($Q('.de-entry > [de-post]', this.parentNode), function(el) {
					if(!el.hide) {
						setUserPostVisib(el.pst, false);
					}
				});
				saveUserPostsVisib();
			})
		]);
	} else {
		hid.appendChild($add('<b>' + Lng.noHidPosts[lang] + '</b>'));
	}
	$append(hid, [
		$add('<hr />'),
		$add('<b>' + ($isEmpty(hThrds) ? Lng.noHidThrds[lang] : Lng.hiddenThrds[lang] + ':') + '</b>')
	]);
	if(!$isEmpty(hThrds)) {
		for(b in hThrds) {
			block = contentBlock(hid, $add('<b>' + b + '</b>'));
			for(tNum in hThrds[b]) {
				block.appendChild($New('div', {'class': 'de-entry', 'info': b + ';' + tNum}, [
					$New('div', {'class': aib.cReply}, [
						$new('input', {'type': 'checkbox'}, null),
						$add('<a href="' + getThrdUrl(aib.host, b, tNum) +
							'" target="_blank">№' + tNum + '</a>'),
						$txt(' - ' + hThrds[b][tNum])
					])
				]));
			}
		}
	}
	$append(hid, [
		$add('<hr />'),
		$btn(Lng.edit[lang], Lng.editInTxt[lang], function() {
			$disp($attr($t('textarea', this.parentNode), {'value': getPrettyJSON(hThrds, '')}).parentNode);
		}),
		$btn(Lng.remove[lang], Lng.clrSelected[lang], function() {
			$each($Q('.de-entry[info]', this.parentNode), function(el) {
				var i, arr = el.getAttribute('info').split(';'),
					b = arr[0],
					tNum = arr[1];
				if($t('input', el).checked) {
					if(pByNum[tNum]) {
						setUserPostVisib(pByNum[tNum], false);
					} else {
						delete hThrds[b][tNum];
					}
					if($isEmpty(hThrds[b])) {
						delete hThrds[b];
					}
				}
			});
			setStored('DESU_Threads_' + aib.dm, JSON.stringify(hThrds));
			saveUserPostsVisib();
		}),
		$New('div', {'style': 'display: none;'}, [
			$new('textarea', {'rows': 9, 'cols': 70}, null),
			$btn(Lng.save[lang], Lng.saveChanges[lang], function() {
				setStored('DESU_Threads_' + aib.dm, this.previousSibling.value.trim().replace(/\t|\n/, ''));
				window.location.reload();
			})
		])
	]);
}


/*==============================================================================
								"FAVORITES" WINDOW
==============================================================================*/

function addFavoritesTable(fav) {
	var h, b, tNum, block;
	for(h in Favor) {
		for(b in Favor[h]) {
			block = contentBlock(
				fav, $add('<a href="http://' + h + getPageUrl(h, b, 0) + '">' + h + '/' + b + '</a>')
			);
			for(tNum in Favor[h][b]) {
				block.appendChild($New('div', {'class': 'de-entry', 'info': h + ';' + b + ';' + tNum}, [
					$New('div', {'class': aib.cReply}, [
						$add('<input type="checkbox" />'),
						$new('span', {'class': 'de-btn-expthr'}, {'click': loadFavorThread}),
						$add('<a href="' + getThrdUrl(h, b, tNum) + '">№' + tNum + '</a>'),
						$add('<span class="de-fav-title"> - ' + Favor[h][b][tNum]['txt'] + '</span>'),
						$add('<span class="de-fav-inf-page"></span>'),
						$add('<span class="de-fav-inf-posts">[<span class="de-fav-inf-old">' +
							Favor[h][b][tNum]['cnt'] + '</span>]</span>')
					])
				]));
			}
		}
	}
	if(!fav.firstChild) {
		fav.appendChild($add('<b>' + Lng.noFavorites[lang] + '</b>'));
	}
	$append(fav, [
		doc.createElement('hr'),
		$btn(Lng.edit[lang], Lng.editInTxt[lang], function() {
			$disp($attr($t('textarea', this.parentNode), {'value': getPrettyJSON(Favor, '')}).parentNode);
		}),
		$btn(Lng.info[lang], Lng.infoCount[lang], function() {
			$each($C('de-entry', doc), function(el) {
				var c, arr = el.getAttribute('info').split(';');
				if(arr[0] !== aib.host) {
					return;
				}
				c = $attr($c('de-fav-inf-posts', el).firstElementChild, {'class': 'de-wait', 'text': ''});
				ajaxGetPosts(null, arr[1], arr[2], true, function(els, op, err) {
					var cnt = err ? err : els.length + 1;
					c.textContent = cnt;
					if(!err && cnt > Favor[arr[0]][arr[1]][arr[2]].cnt) {
						c.className = 'de-fav-inf-new';
						Favor[arr[0]][arr[1]][arr[2]].cnt = cnt;
						setStored('DESU_Favorites', JSON.stringify(Favor));
					} else {
						c.className = 'de-fav-inf-old';
					}
					c = arr = null;
				});
			});
		}),
		$btn(Lng.page[lang], Lng.infoPage[lang], function() {
			var i = 6,
				loaded = 0;
			$alert(Lng.loading[lang], 'load-pages', true);
			while(i--) {
				loadPage($add('<div></div>'), i, function(page, idx) {
					$each($C('de-entry', doc), function(el) {
						var arr = el.getAttribute('info').split(';');
						if(arr[0] !== aib.host || arr[1] !== brd) {
							return;
						}
						el = $c('de-fav-inf-page', el);
						if((new RegExp('(?:№|No.|>)\\s*' + arr[2] + '\\s*<')).test(page.innerHTML)) {
							el.innerHTML = '@' + idx;
						} else if(loaded === 5 && !el.textContent.contains('@')) {
							el.innerHTML = '@?';
						}
					});
					if(loaded === 5) {
						closeAlert($id('de-alert-load-pages'));
					}
					loaded++;
					page = idx = null;
				});
			}
		}),
		$btn(Lng.clear[lang], Lng.clrDeleted[lang], function() {
			$each($C('de-entry', doc), function(el) {
				var arr = el.getAttribute('info').split(';');
				if(nav.Opera && arr[0] !== aib.host) {
					return;
				}
				ajaxGetPosts(getThrdUrl(arr[0], arr[1], arr[2]), null, null, false, function(a, dc, err) {
					if(err) {
						removeFavorites(arr[0], arr[1], arr[2]);
						saveFavorites(JSON.stringify(Favor));
					}
					arr = null;
				});
			});
		}),
		$btn(Lng.remove[lang], Lng.clrSelected[lang], function() {
			$each($C('de-entry', doc), function(el) {
				var arr = el.getAttribute('info').split(';');
				if($t('input', el).checked) {
					removeFavorites(arr[0], arr[1], arr[2]);
				}
			});
			saveFavorites(JSON.stringify(Favor));
		}),
		$New('div', {'style': 'display: none;'}, [
			$new('textarea', {'rows': 9, 'cols': 70}, null),
			$btn(Lng.save[lang], Lng.saveChanges[lang], function() {
				saveFavorites(this.previousSibling.value.trim().replace(/\n|\r/, ''));
			})
		])
	]);
}


/*==============================================================================
								POPUP ALERT MESSAGES
==============================================================================*/

function closeAlert(el) {
	if(el) {
		el.closeTimeout = null;
		if(Cfg['animation']) {
			nav.animEvent(el, $del);
			nav.addClass(el, 'de-close');
		} else {
			$del(el);
		}
	}
}

function $alert(txt, id, wait) {
	var el = $id('de-alert-' + id),
		cMsg = 'de-alert-msg' + (wait ? ' de-wait' : ''),
		tBtn = wait ? '' : '× ';
	if(el) {
		$attr($t('div', el), {'class': cMsg}).innerHTML = txt.trim();
		$t('span', el).textContent = tBtn;
		clearTimeout(el.closeTimeout);
		if(Cfg['animation']) {
			nav.animEvent(el, function(node) {
				nav.remClass(node, 'de-blink');
			});
			nav.addClass(el, 'de-blink');
		}
	} else {
		el = $id('de-alert').appendChild($New('div', {'class': aib.cReply, 'id': 'de-alert-' + id}, [
			$new('span', {'class': 'de-alert-btn', 'text': tBtn}, {'click': function() {
				closeAlert(this.parentNode);
			}}),
			$add('<div class="' + cMsg + '">' + txt.trim() + '</div>')
		]));
		if(Cfg['animation']) {
			nav.animEvent(el, function(node) {
				nav.remClass(node, 'de-open');
			});
			nav.addClass(el, 'de-open');
		}
	}
	if(Cfg['closePopups'] && !wait && !id.contains('help')) {
		el.closeTimeout = setTimeout(closeAlert, 4e3, el);
	}
}


/*==============================================================================
								DROPDOWN SELECT MENUS
==============================================================================*/

function addSelMenu(el, fPanel, html) {
	var y, pos, pst = getPost(el);
	if(Cfg['attachPanel'] && fPanel) {
		pos = 'fixed';
		y = el.id === 'de-btn-refresh' || el.id === 'de-btn-audio-off' ?
			'bottom: 25' :
			'top: ' + (el.getBoundingClientRect().top + el.offsetHeight - (nav.Firefox ? .5 : 0));
	} else {
		pos = 'absolute';
		y = 'top: ' + ($offset(el).top + el.offsetHeight - (nav.Firefox ? .5 : 0));
	}
	doc.body.appendChild($event($add(
		'<div class="' + aib.cReply + '" id="de-select" style="position: ' + pos + '; ' + (
			el.className === 'de-btn-src' ?
				'left: ' + $offset(el).left :
				'right: ' + (doc.body.clientWidth - $offset(el).left - el.offsetWidth)
		) + 'px; ' + y + 'px;" onmouseout="de_delSelection(event)">' + html + '</div>'), {
		'mouseover': function() {
			if(pst) {
				markPviewToDel(pst, false);
			}
		}
	}));
	return $T('a', $id('de-select'));
}

function selectSpell(e) {
	$each(addSelMenu(
		e.target, true,
		'<div style="display: inline-block; border-right: 1px solid grey;"><a href="#">' +
			('#b/,#b/itt,#exp ,#exph ,#img ,#imgn ,#name ,#noimg,#notxt,#num ,')
				.split(',').join('</a><a href="#">') +
			'</a></div><div style="display: inline-block;"><a href="#">' +
			('#op,#outrep,#rep ,#sage,#skip ,#theme ,#tmax ,#trip,#video ')
				.split(',').join('</a><a href="#">') + '</a></div>'
	), function(a) {
		a.onclick = function(e) {
			var exp = this.textContent;
			$pd(e);
			if(exp === '#b/') {
				exp = '#' + brd + '/ ';
			} else if(exp === '#b/itt') {
				exp = '#' + brd + '/' + (TNum ? TNum + ' ': ' ');
			}
			$txtInsert($id('de-spell-edit'), exp);
		};
	});
}

function selectPostHider(post) {
	if(!Cfg['menuHiddBtn'] || (!Cfg['filterThrds'] && post.isOp)) {
		return;
	}
	var a = addSelMenu(
		post.btns.firstChild, false,
		'<a href="#">' + Lng.selHiderMenu[lang].join('</a><a href="#">') + '</a>'
	);
	a[1].onclick = function(e) {
		$pd(e);
		addSpell(
			post.img.length === 0 ?
				'#noimg' :
				'#img =' + getImgWeight(post) + '@' + getImgSize(post).join('x')
		);
	};
	a[2].onclick = function(e) {
		$pd(e);
		addSpell(post.img.length === 0 ? '#noimg' : '#ihash ' + getImgHash(post));
	};
	a[3].onclick = function(e) {
		$pd(e);
		hideBySameText(post);
	};
	(a = a[0]).onclick = function(e) {
		$pd(e);
		addSpell(quotetxt);
	};
	a.onmouseover = function() {
		quotetxt = $txtSelect().trim();
	};
}

function selectExpandThread(post) {
	$each(addSelMenu(
		$q('span:nth-child(3)', post.btns), false,
		'<a href="#">' + Lng.selExpandThrd[lang].join('</a><a href="#">') + '</a>'
	), function(a) {
		a.onclick = function(e) {
			$pd(e);
			loadThread(post, parseInt(this.textContent, 10), null);
		};
	});
}

function selectAjaxPages() {
	$each(addSelMenu(
		$id('de-btn-refresh'), true,
		'<a href="#">' + Lng.selAjaxPages[lang].join('</a><a href="#">') + '</a>'
	), function(a, j) {
		a.onclick = function(e) {
			$pd(e);
			loadPages(aProto.indexOf.call(this.parentNode.children, this) + 1);
		};
	});
}

function selectAudioNotif() {
	if(this.id !== 'de-btn-audio-off') {
		return;
	}
	$each(addSelMenu($id('de-btn-audio-off'), true,
		'<a href="#">' + Lng.selAudioNotif[lang].join('</a><a href="#">') + '</a>'
	), function(a, j) {
		a.onclick = function(e) {
			$pd(e);
			var i = aProto.indexOf.call(this.parentNode.children, this);
			Audio.repeat =
				i === 0 ? 3e4 :
				i === 1 ? 6e4 :
				i === 2 ? 12e4 :
				3e5;
			toggleAudioNotif();
			$id('de-btn-audio-off').id = 'de-btn-audio-on';
			$del(this.parentNode);
		};
	});
}

function selectImgSearch(node) {
	var p = node.nextSibling.href + '" target="_blank">' + Lng.search[lang],
		c = doc.body.getAttribute('de-image-search'),
		str = '';
	if(c) {
		c = c.split(';');
		c.forEach(function(el) {
			var info = el.split(',');
			str += '<a class="de-src' + info[0] + (!info[1] ?
				'" onclick="de_cImgSearch(event, \'' + info[0] + '\')" href="#" de-url="' :
				'" href="' + info[1]
			) + p + info[0] + '</a>';
		});
	}
	addSelMenu(
		node, false, '<a class="de-src-iqdb" href="//iqdb.org/?url=' + p + 'IQDB</a>' +
			'<a class="de-src-tineye" href="//tineye.com/search/?url=' + p + 'TinEye</a>' +
			'<a class="de-src-google" href="//google.ru/searchbyimage?image_url=' + p + 'Google</a>' +
			'<a class="de-src-saucenao" href="//saucenao.com/search.php?url=' + p + 'SauceNAO</a>' + str
	);
	str = null;
}


/*==============================================================================
								KEYBOARD NAVIGATION
==============================================================================*/

function initKeyNavig() {
	var pIndex, tIndex = 0,
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
			var post, mIdx = idx;
			while(posts[mIdx].hide || posts[mIdx].thr.hide) {
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
			if(idx = $c('de-selected', doc)) {
				nav.remClass(idx, 'de-selected');
			}
			if(post.isOp) {
				post = post.thr;
			}
			nav.addClass(post, 'de-selected');
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
		if(scrScroll) {
			scrScroll = false;
		} else {
			pScroll = true;
			tScroll = true;
		}
	};

	doc.addEventListener('keydown', function (e) {
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
		e.stopPropagation();
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
				GM_openInTab(getThrdUrl(aib.host, brd, Threads[curTh].num), false, true);
			} else {
				window.open(getThrdUrl(aib.host, brd, Threads[curTh].num), '_blank');
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
	}, true);
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
	return src.replace(/dummy=[\d\.]*/, 'dummy=' + Math.random());
}

function refreshCapImg(tNum) {
	var src, e, img = pr.recap ? $id('recaptcha_image') || pr.recap : $x(pr.tr + '//img', pr.cap);
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
	$id('de-sagebtn').innerHTML = '&nbsp;' + (
		c ? '<span class="de-btn-sage"></span><b style="color: red;">SAGE</b>' : '<i>(no&nbsp;sage)</i>'
	);
	if(pr.mail.type === 'text') {
		pr.mail.value = c ? 'sage' : aib.fch ? 'noko' : '';
	} else {
		pr.mail.checked = c;
	}
	if(aib.abu) {
		setCookie('email', c ? 'sage' : '', 1e5);
	}
}

function setUserName() {
	var el = $q('input[info="nameValue"]', doc);
	if(el) {
		saveCfg('nameValue', el.value);
	}
	pr.name.value = Cfg['userName'] ? Cfg['nameValue'] : '';
}

function setUserPassw() {
	var el = $q('input[info="passwValue"]', doc);
	if(el) {
		saveCfg('passwValue', el.value);
	}
	(pr.dpass || {}).value = pr.passw.value = Cfg['passwValue'];
}

function initPostform() {
	var pArea = $New('div', {'id': 'de-parea', 'style': 'text-align: center;'}, [
		$New('div', {'id': 'de-togglereply', 'style': 'display: none;'}, [
			$txt('['),
			$new('a', {'text': Lng.expandForm[lang], 'href': '#', 'class': 'de-abtn'}, {
				'click': toggleMainReply
			}),
			$txt(']')
		]),
		$New('div', {'id': 'de-pform'}, [pr.form, oeForm]),
		doc.createElement('hr')
	]);
	if(TNum && Cfg['addPostForm'] === 1) {
		$after(aib.fch ? $t('hr', dForm) : dForm, pArea);
	} else {
		$before(dForm, pArea);
	}
	if(TNum && Cfg['addPostForm'] > 1 || !TNum && Cfg['noThrdForm']) {
		$disp(pArea);
	}
	nav.insAfter(pArea, '<div id="de-qarea" class="' + aib.cReply + '" style="display: none;"></div>');
	if(Cfg['addPostForm'] === 3) {
		$append($id('de-qarea'), [
			$add('<span id="de-qarea-target">' + Lng.replyTo[lang] + ' <a class="de-abtn"></a></span>'),
			$new('span', {'id': 'de-qarea-close', 'text': '×'}, {'click': showMainReply})
		]);
	}
	if(pr.on) {
		doPostformChanges(null, null, null);
	} else if(oeForm) {
		ajaxGetPosts(null, brd, Posts[0].num, false, doPostformChanges);
	}
}

function addOperaTextResizer() {
	var resMove = function(e) {
			var p = $offset(pr.txta);
			pr.txta.style.width = e.pageX - p.left + 'px';
			pr.txta.style.height = e.pageY - p.top + 'px';
		},
		resStop = function() {
			$revent(doc.body, {'mousemove': resMove, 'mouseup': resStop});
			saveCfg('textaWidth', parseInt(pr.txta.style.width, 10));
			saveCfg('textaHeight', parseInt(pr.txta.style.height, 10));
		};
	$after(pr.txta, $new('div', {'id': 'de-txt-resizer'}, {'mousedown': function(e) {
		$pd(e);
		$event(doc.body, {'mousemove': resMove, 'mouseup': resStop});
	}}));
}

function eventFiles(tr) {
	$each($Q('input[type="file"]', tr), function(el) {
		$event(el, {'change': processInput});
	});
}

function delFileUtils(el) {
	$each($Q('.de-file-util', el), $del);
	$each($Q('input[type="file"]', el), function(node) {
		node.rarJPEG = null;
	});
}

function processInput() {
	if(!this.haveBtns) {
		this.haveBtns = true;
		$after(this, $attr($btn(Lng.clear[lang], null, function(e) {
			$pd(e);
			var el = this.parentNode;
			delFileUtils(el);
			$event(pr.file = $q('input[type="file"]', $html(el, el.innerHTML)), {'change': processInput});
		}), {'class': 'de-file-util de-file-del'}));
	} else if(this.rarJPEG) {
		this.rarJPEG = null;
		$del(this.nextSibling);
	}
	if(aib.rJpeg) {
		$del($c('de-file-rar', this.parentNode));
		if(/^image\/(?:png|jpeg)$/.test(this.files[0].type)) {
			$after(this, $attr($btn(Lng.addRarJPEG[lang], null, function(e) {
				$pd(e);
				var el = $id('de-file-rar') || doc.body.appendChild($new('input', {
						'id': 'de-file-rar',
						'type': 'file',
						'style': 'display: none'
					}, null)),
					inp = $q('input[type="file"]', this.parentNode),
					btn = this;
				el.onchange = function(e) {
					$del(btn);
					var file = this.files[0],
						fr = new FileReader(),
						node = $add('<span class="de-file-util" style="margin: 0 5px;">' +
							'<span class="de-wait"></span>' + Lng.wait[lang] + '</span>');
					$after(inp, node);
					fr.onload = function() {
						if(inp.nextSibling === node) {
							$attr(node, {
								'style': 'font-weight: bold; margin: 0 5px; cursor: default;',
								'title': inp.files[0].name + ' + ' + file.name,
								'text': 'rarJPEG'
							});
							inp.rarJPEG = this.result;
						}
						node = inp = file = null;
					};
					fr.readAsArrayBuffer(file);
					btn = null;
				};
				el.click();
			}), {'class': 'de-file-util de-file-rar'}));
		}
	}
	eventFiles($x(pr.tr, this));
}

function doPostformChanges(img, _img, el) {
	var sBtn;
	pr.form.style.display = 'inline-block';
	pr.form.style.textAlign = 'left';
	if(nav.Opera) {
		addOperaTextResizer();
	} else {
		$event(pr.txta, {'mouseup': function() {
			saveCfg('textaWidth', parseInt(this.style.width, 10));
			saveCfg('textaHeight', parseInt(this.style.height, 10));
		}});
	}
	addTextPanel();
	pr.txta.style.cssText = 'width: ' + Cfg['textaWidth'] + 'px; height: ' + Cfg['textaHeight'] + 'px;';
	$event(pr.txta, {'keypress': function(e) {
		var code = e.charCode || e.keyCode;
		if((code === 33 || code === 34) && e.which === 0) {
			e.target.blur();
			window.focus();
		}
	}});
	$event(pr.subm, {'click': function(e) {
		var val = pr.txta.value,
			sVal = Cfg['signatValue'];
		if(Cfg['hideBySpell'] && oSpells.outrep[0]) {
			val = replaceBySpells(oSpells.outrep, val);
		}
		if(Cfg['userSignat'] && sVal) {
			val += '\n' + sVal;
		}
		if(pr.tNum && ($c('filetitle', pByNum[pr.tNum]) || {}).textContent ===
			'Dollchan Extension Tools' && !/`\n`\-{50}`/.test(val)) {
			val += '\n\n`--------------------------------------------------`\n' +
				'`' + window.navigator.userAgent + '`\n`v' + Cfg['version'] + '`' +
				'\n`--------------------------------------------------`';
		}
		pr.txta.value = val;
		if(Cfg['ajaxReply']) {
			$alert(Lng.checking[lang], 'upload', true);
		}
		if(Cfg['favOnReply'] && pr.tNum) {
			toggleFavorites(pByNum[pr.tNum], $c('de-btn-fav', pByNum[pr.tNum].btns));
		}
		if(pr.tNum) {
			Stat['reply'] = +Stat['reply'] + 1;
		} else {
			Stat['op'] = +Stat['op'] + 1;
		}
		setStored('DESU_Stat_' + aib.dm, JSON.stringify(Stat));
		if(pr.video && (val = pr.video.value) && (val = val.match(getTubePattern()))) {
			pr.video.value = 'http://www.youtube.com/watch?v=' + val[1];
		}
		if(pr.isQuick) {
			$disp($id('de-qarea'));
			$after($id('de-togglereply'), $id('de-pform'));
		}
	}});
	$each($Q('input[type="text"], input[type="file"]', pr.form), function(node) {
		node.size = 30;
	});
	if(Cfg['noGoto'] && pr.gothr) {
		$disp(pr.gothr);
	}
	if(Cfg['noPassword'] && pr.passw) {
		$disp($x(pr.tr, pr.passw));
	}
	$event(window, {'load': function() {
		if(Cfg['userName'] && pr.name) {
			setTimeout(setUserName, 1e3);
		}
		if(pr.passw) {
			setTimeout(setUserPassw, 1e3);
		}
	}});
	if(pr.recap) {
		$attr(pr.subm, {'onclick': 'Recaptcha.focus_response_field = function() {}'});
		el = $id('recaptcha_image');
		if(el) {
			$attr(el, {'onclick': 'Recaptcha.reload()', 'style': 'width: 300px; cursor: pointer;'});
		}
	}
	if(pr.cap) {
		if(aib.abu) {
			setTimeout(function() {
				refreshCapImg(0);
				pr.cap.onclick = null;
			}, 50);
		}
		pr.cap.autocomplete = 'off';
		pr.cap.onfocus = null;
		pr.cap.onkeypress = function(e) {
			if(!Cfg['captchaLang'] || e.which === 0) {
				return;
			}
			var i, code = e.charCode || e.keyCode,
				chr = String.fromCharCode(code).toLowerCase(),
				ru = 'йцукенгшщзхъфывапролджэячсмитьбюё',
				en = 'qwertyuiop[]asdfghjkl;\'zxcvbnm,.`';
			if(Cfg['captchaLang'] === 1) {
				if(code < 0x0410 || code > 0x04FF || (i = ru.indexOf(chr)) === -1) {
					return;
				}
				chr = en[i];
			} else {
				if(code < 0x0021 || code > 0x007A || (i = en.indexOf(chr)) === -1) {
					return;
				}
				chr = ru[i];
			}
			$pd(e);
			$txtInsert(e.target, chr);
		};
		if(!aib.hana && !pr.recap) {
			img = aib.kus ? $q('a, img', $x(pr.tr, pr.cap)) : $x(pr.tr + '//img', pr.cap);
			_img = $new('img', {
				'alt': Lng.loading[lang],
				'title': Lng.refresh[lang],
				'style': 'display: block; border: none; cursor: pointer;'}, {
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
			setTimeout(function(i) {
				i.src = refreshCapSrc(
					aib._410 ? ('/faptcha.php?board=' + brd) :
						aib.hid ? ('/securimage/securimage_show.php?' + Math.random()) :
						aib.kus ? '/' + brd.substr(0, brd.indexOf('/') + 1) + 'captcha.php?' + Math.random()
						: (img ? img.src : '/' + brd + '/captcha.pl?key=mainpage&amp;dummy=' + Math.random()),
					TNum || 0
				);
			}, 50, _img);
		}
	}
	if(Cfg['addSageBtn'] && pr.mail) {
		sBtn = $new('span', {'id': 'de-sagebtn'}, {'click': function(e) {
			e.stopPropagation();
			$pd(e);
			toggleCfg('sageReply');
			doSageBtn();
		}});
		el = $x('ancestor::label', pr.mail) || pr.mail;
		if(el.nextElementSibling || el.previousElementSibling) {
			$disp(el);
			$after(el, sBtn);
		} else {
			$disp($x(pr.tr, pr.mail));
			$after(pr.name || pr.subm, sBtn);
		}
		setTimeout(doSageBtn, 0);
	}
	if(Cfg['ajaxReply'] === 2) {
			pr.form.onsubmit = function(e) {
				$pd(e);
				ajaxSubmit(new dataForm(pr.form, pr.subm), checkUpload);
			};
			dForm.onsubmit = $pd;
			$each($Q('input[type="submit"]', dForm), function(el) {
				el.onclick = function(e) {
					$pd(e);
					showMainReply();
					$alert(Lng.deleting[lang], 'deleting', true);
					ajaxSubmit(new dataForm(dForm, this), checkDelete);
				};
			});
			aib.rJpeg = !aib.abu && !aib.fch;
	} else if(Cfg['ajaxReply'] === 1) {
		$append($id('de-main'), [
			$add('<iframe id="de-iframe-pform" name="de-iframe-pform" src="about:blank"/>'),
			$add('<iframe id="de-iframe-dform" name="de-iframe-dform" src="about:blank"/>')
		]);
		$attr(pr.form, {'target': 'de-iframe-pform'}).onsubmit = null;
		$attr(dForm, {'target': 'de-iframe-dform'}).onsubmit = function() {
			showMainReply();
			$alert(Lng.deleting[lang], 'deleting', true);
		};
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


/*==============================================================================
							ONSUBMIT REPLY / DELETE CHECK
==============================================================================*/

function findSubmitError(dc) {
	if(!dc.body.firstChild || $q(aib.qDForm, dc)) {
		return '';
	}
	var err = '';
	$each($Q(
		aib.hana ? '.post-error, h2' :
		aib.kus ? 'h1, h2, div[style*="1.25em"]' :
		aib.fch ? '#errmsg' :
		aib.krau ? '.message_text' :
		aib._420 ? 'pre' :
		'h1, h2, font[size="5"]', dc
	), function(el) {
		err += el.innerHTML + '\n';
	});
	err = err.replace(/<a [^>]+>Назад.+|<br.+/, '');
	if(!err) {
		err = Lng.error[lang] + '\n' + dc.body.innerHTML;
	}
	if(/successful|uploaded|updating|обновл|удален[о\.]/i.test(err)) {
		return '';
	}
	return err.replace(/"/g, "'");
}

function endUpload() {
	closeAlert($id('de-alert-upload'));
	if(Cfg['updThread'] === 2) {
		infoNewPosts(null, 0);
	}
}

function checkUpload(err, url) {
	var tNum, file, qArea;
	if(err) {
		if(pr.isQuick) {
			$disp(qArea = $id('de-qarea'));
			qArea.appendChild($id('de-pform'));
		}
		if((aib.hana && /подтвердите, что вы человек/.test(err)) ||
			(pr.cap && /captch|капч|подтверж/i.test(err)))
		{
			pr.cap.value = '';
			pr.cap.focus();
			refreshCapImg(pr.tNum);
		}
		$alert(err, 'upload', false);
		return;
	}
	pr.txta.value = '';
	if(pr.file) {
		file = $x(pr.tr, pr.file);
		delFileUtils(file);
		file = $html(file, file.innerHTML);
		pr.file = $q('input[type="file"]', file);
		eventFiles(file);
	}
	if(pr.video) {
		pr.video.value = '';
	}
	if(tNum = pr.tNum) {
		showMainReply();
		if(TNum) {
			loadNewPosts(false, endUpload);
		} else {
			loadThread(pByNum[tNum], 5, endUpload);
		}
		if(pr.cap) {
			pr.cap.value = '';
			refreshCapImg(tNum);
		}
	} else {
		window.location = url;
	}
}

function getFinalURL(dc, iframe) {
	if(aib.fch) {
		return $t('meta', dc).content.match(/http:\/\/[^"]+/)[0];
	} else if(iframe) {
		return window.location;
	} else if($q(aib.qDForm, dc)) {
		var tNum, thr = $q('.thread, ' + aib.qThread, dc);
		if(thr) {
			tNum = thr.id.match('\\d+' + (aib._420 ? '$' : ''))[0];
		} else {
			thr = $q(aib.qTNum, dc);
			tNum = thr.value || thr.name.match(/\d+/)[0];
		}
		return getThrdUrl(aib.host, brd, tNum);
	} else {
		return '';
	}
}

function endDelete() {
	var el = $id('de-alert-deleting');
	if(el) {
		closeAlert(el);
		$alert(Lng.succDeleted[lang], 'deleted', false);
	}
}

function checkDelete(err, url) {
	var tNums = [];
	if(err) {
		$alert(Lng.errDelete[lang] + err, 'deleting', false);
	} else {
		$each($Q('[de-post] input:checked', dForm), !TNum ? function(el) {
			var tNum = getPost(el).thr.num;
			if(tNums.indexOf(tNum) === -1) {
				tNums.push(tNum);
			}
		} : function(el) { el.checked = false; });
		if(TNum) {
			loadNewPosts(false, endDelete);
		} else {
			tNums.forEach(function(tNum) {
				loadThread(pByNum[tNum], 5, endDelete);
			});
		}
	}
	tNums = null;
}

function ajaxSubmit(dF, Fn) {
	if(dF.error) {
		return;
	}
	if(dF.busy > 0) {
		setTimeout(ajaxSubmit, 200, dF, Fn);
		return;
	}
	var headers = {'Content-type': 'multipart/form-data; boundary=' + dF.boundary};
	if(nav.Firefox) {
		headers['Referer'] = '' + doc.location;
	}
	dF.data.push('--' + dF.boundary + '--\r\n');
	GM_xmlhttpRequest({
		'method': 'POST',
		'headers': headers,
		'data': nav.toBlob(dF.data, null),
		'url': nav.fixLink(dF.url),
		'onreadystatechange': function(xhr) {
			if(xhr.readyState !== 4) {
				return
			}
			if(xhr.status === 200) {
				var dc = nav.toDOM(xhr.responseText);
				Fn(findSubmitError(dc), getFinalURL(dc, false));
				Fn = null;
			} else {
				$alert(
					xhr.status === 0 ? Lng.noConnect[lang] : 'HTTP [' + xhr.status + '] ' + xhr.statusText,
					'upload', false
				);
			}
		}
	});
}

function initJpeg(img, dat) {
	img[0] = 0xFF; img[1] = 0xD8; img[2] = 0xFF; img[3] = 0xE0; img[4] = 0; img[5] = 0x10; img[6] = 0x4A;
	img[7] = 0x46; img[8] = 0x49; img[9] = 0x46; img[10] = 0; img[11] = 1; img[12] = 1; img[18] = 0; img[19] = 0;
	img[13] = dat[0]; img[14] = dat[1];
	img[15] = dat[2]; img[16] = dat[3];
	img[17] = dat[4];
}

function getExifData(exif, off, len) {
	var i, j, dE, tag, tgLen, xRes = 0,
		yRes = 0,
		resT = 0,
		Get16u = function(off) {
			return (exif[off + 1] << 8) | exif[off];
		},
		Get32u = function(off) {
			return (exif[off + 3] << 24) | (exif[off + 2] << 16) | (exif[off + 1] << 8) | exif[off];
		};
	if(String.fromCharCode(exif[off], exif[off + 1]) === 'MM') {
		Get16u = function(off) {
			return (exif[off] << 8) | exif[off + 1];
		};
		Get32u = function(off) {
			return (exif[off] << 24) | (exif[off + 1] << 16) | (exif[off + 2] << 8) | exif[off + 3];
		};
	}
	if(Get16u(off + 2) !== 0x2A) {
		exif = null;
		return [0, 0, 1, 0, 1];
	}
	i = Get32u(off + 4);
	if(i > len) {
		exif = null;
		return [0, 0, 1, 0, 1];
	}
	for(tgLen = Get16u(i += off), j = 0; j < tgLen; j++) {
		dE = i + 2 + 12 * j;
		tag = Get16u(dE);
		if(tag !== 0x011A && tag !== 0x011B && tag !== 0x0128) {
			continue;
		}
		if(tag === 0x0128) {
			resT = Get16u(dE + 8) - 1;
		} else {
			dE = Get32u(dE + 8);
			if(dE > len) {
				exif = null;
				return [0, 0, 1, 0, 1];
			}
			dE += off;
			if(tag === 0x11A) {
				xRes = +(Get32u(dE) / Get32u(dE + 4)).toFixed(0);
			} else {
				yRes = +(Get32u(dE) / Get32u(dE + 4)).toFixed(0);
			}
		}
	}
	xRes = xRes === 0 ? yRes : xRes;
	yRes = yRes === 0 ? xRes : yRes;
	exif = null;
	return [resT, xRes >> 8, xRes & 0xFF, yRes >> 8, yRes & 0xFF];
}

function getReplyImgData(arr, isForce) {
	var i = 0,
		j = 0,
		dat = new Uint8Array(arr),
		len = dat.length,
		out = 0,
		rExif = !!Cfg['removeEXIF'],
		jpgDat = false;
	if(!Cfg['postSameImg'] && !rExif && !isForce) {
		return [arr];
	}
	if(dat[0] === 0xFF && dat[1] === 0xD8) {
		while(i < len - 1) {
			findAgain: {
				if(dat[i] === 0xFF) {
					if(rExif) {
						if(dat[i + 1] === 0xE1 && dat[i + 4] === 0x45 && !jpgDat) {
							jpgDat = getExifData(dat, i + 10, (dat[i + 2] << 8) + dat[i + 3]);
						} else if(dat[i + 1] === 0xE0 && dat[i + 7] === 0x46 && !jpgDat) {
							jpgDat = [dat[i + 11], dat[i + 12], dat[i + 13], dat[i + 14]];
						}
						if((dat[i + 1] >> 4) === 0xE || dat[i + 1] === 0xFE) {
							i += 2 + (dat[i + 2] << 8) + dat[i + 3];
							break findAgain;
						}
					}
					if(dat[i + 1] === 0xD8) {
						out++;
					} else if(dat[i + 1] === 0xD9) {
						if(--out === 0) {
							dat[j] = dat[i];
							break;
						}
					}
				}
				if(j !== i) {
					dat[j] = dat[i];
				}
				i++;
				j++;
			}
		}
		j += 2;
		i += 2;
		if(j !== i) {
			dat[j - 1] = dat[i - 1];
			if(!isForce && len - j > 75) {
				for(; i < len; dat[j++] = dat[i++]) {};
			}
		} else if(j === len || (!isForce && len - j > 75)) {
			return [arr];
		}
		if(rExif) {
			initJpeg(out = new Uint8Array(len = j + 18), jpgDat);
			for(i = 2, j = 20; j < len; i++, j++) {
				out[j] = dat[i];
			}
			return [out];
		}
	} else if(dat[0] === 0x89 && dat[1] === 0x50) {
		for(; j < len - 7; j++) {
			if(dat[j] === 0x49 && dat[j + 1] === 0x45 && dat[j + 2] === 0x4E && dat[j + 3] === 0x44) {
				break;
			}
		}
		j += 8;
		if(j === len || (!isForce && len - j > 75)) {
			return [arr];
		}
	} else {
		return null;
	}
	return [new Uint8Array(arr, j)];
}

/** @constructor */
function dataForm(form, button) {
	this.boundary = '---------------------------' + Math.round(Math.random() * 1e11);
	this.data = [];
	this.busy = 0;
	this.error = false;
	this.url = form.action;
	$each($Q('input:not([type="submit"]), textarea, select', form), this.append.bind(this));
	this.append(button);
}

dataForm.prototype.append = function(el) {
	if(el.type === 'file') {
		if(el.files.length > 0) {
			var fName = el.files[0].name;
			this.data.push(
				'--' + this.boundary + '\r\n' + 'Content-Disposition: form-data; name="' +
				el.name + '"; filename="' + (!Cfg['removeFName'] ? fName : 
					' ' + fName.substring(fName.lastIndexOf('.'))
				) + '"\r\n' + 'Content-type: ' + el.files[0].type + '\r\n\r\n', null, '\r\n'
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
		var dat = getReplyImgData(this.result, !aib.rJpeg || !!el.rarJPEG);
		if(dat) {
			if(el.rarJPEG) {
				dat.push(el.rarJPEG);
			}
			if(Cfg['postSameImg']) {
				dat.push(String(Math.round(Math.random() * 1e6)));
			}
			dF.data[idx] = nav.toBlob(dat, null);
			dF.busy--;
		} else {
			dF.error = true;
			$alert(Lng.fileCorrupt[lang] + file.name, 'upload', false);
		}
		fr = dF = el = idx = file = null;
	};
	fr.readAsArrayBuffer(file);
	this.busy++;
};


/*==============================================================================
									QUICK REPLY
==============================================================================*/

function showQuickReply(post) {
	var tNum = post.thr.num,
		qArea = $id('de-qarea');
	pr.tNum = tNum;
	if(pr.isQuick) {
		if(aib.getWrap(post).nextElementSibling === qArea) {
			$disp(qArea);
			showMainReply();
			return;
		}
	} else {
		pr.isQuick = true;
		qArea.appendChild($id('de-pform'));
		$disp($id('de-togglereply'));
		if(!TNum && !aib.kus && !aib.hana) {
			$del($q('#thr_id, input[name="parent"]', pr.form));
			$before(
				pr.form.firstChild, 
				$add('<input type="hidden" id="thr_id" value="' + tNum + '" name="' + (
					aib.fch || aib.gazo ? 'resto' :
					aib.tiny ? 'thread' :
					'parent'
				) + '">')
			);
			if(oeForm) {
				$del($q('input[name="oek_parent"]', oeForm));
				$before(
					oeForm.firstChild,
					$add('<input type="hidden" value="' + tNum + '" name="oek_parent">')
				);
			}
		}
	}
	$after(aib.getWrap(post), qArea);
	qArea.style.display = '';
	if(!TNum) {
		toggleQuickReply(tNum);
		if(Cfg['noThrdForm']) {
			$id('de-parea').style.display = 'none';
		}
	}
	if(pr.cap && !pr.recap && !aib.kus) {
		refreshCapImg(tNum);
	}
	if(aib._420 && pr.txta.value === 'Comment') {
		pr.txta.value = '';
	}
	$txtInsert(pr.txta, '>>' + post.num + (quotetxt || '').replace(/(?:^|\n)(.)/gm, '\n> $1') + '\n');
	if(Cfg['addPostForm'] === 3) {
		$attr($t('a', $id('de-qarea-target')), {'href': getThrdUrl(aib.host, brd, tNum), 'text': '#' + tNum});
	}
}

function showMainReply() {
	if(pr.isQuick) {
		var el = $id('de-togglereply'),
			qArea = $id('de-qarea');
		pr.isQuick = false;
		if(!TNum) {
			toggleQuickReply(0);
			$del($id('thr_id'));
		}
		$disp(el);
		qArea.style.display = 'none';
		$after($id('de-parea'), qArea);
		$after(el, $id('de-pform'));
	}
}

function toggleQuickReply(tNum) {
	$q('#thr_id, input[name*="thread"]', pr.form).value = tNum;
	if(oeForm) {
		$q('input[name="oek_parent"], input[name="replyto"]', oeForm).value = tNum;
	}
	if(aib.pony) {
		$q('input[name="quickreply"]', pr.form).value = tNum || '';
	}
}

function toggleMainReply(e) {
	var pArea = $id('de-parea');
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
	if(/Reply|Ответ/.test(e.target.textContent)) {
		return;
	}
	e.stopPropagation();
	$pd(e);
	if(!TNum && Cfg['noThrdForm'] && !pr.isQuick) {
		$id('de-parea').style.display = '';
	}
	var pNum = getPost(e.target).num;
	if(TNum && Cfg['addPostForm'] > 1 && !pr.isQuick) {
		showQuickReply(pByNum[pNum]);
	} else {
		if(aib._420 && pr.txta.value === 'Comment') {
			pr.txta.value = '';
		}
		$txtInsert(pr.txta, '>>' + pNum);
	}
}


/*==============================================================================
								TEXT FORMATTING BUTTONS
==============================================================================*/

function addTextPanel() {
	if(!pr.txta) {
		return;
	}
	var bbBrds = aib.kus || aib.abu || aib.krau || aib._420 || aib.mlpg,
		tagTable = {
			'bold': [aib._420 ? '**' : bbBrds ? 'b' : '**', 'B'],
			'italic': [aib._420 ? '*' : bbBrds ? 'i' : '*', 'i'],
			'under': [bbBrds ? 'u' : '__', 'U'],
			'strike': [aib.mlpg ? '-' : bbBrds ? 's' : aib._410 ? '^^' : '', 'S'],
			'spoil': [aib.mlpg ? 's' : aib._420 ? '%' : bbBrds || aib.fch ? 'spoiler' : '%%', '%'],
			'code': [aib.mlpg ? 'c' : aib.krau ? 'aa' : aib._420 ? 'pre' : bbBrds ? 'code' : '`', 'C'],
			'quote': [,'&gt;']
		},
		txtBtn = function(id) {
			var x = pr.txta,
				btn = $id('de-btn-' + id),
				val = tagTable[id][1];
			if(!btn) {
				btn = $new('span', {'id': 'de-btn-' + id, 'title': Lng.txtBtn[id][lang]}, null);
				if(val !== '&gt;') {
					btn.onclick = function(e) {
						var tag1, tag2, j, len,
							start = x.selectionStart,
							end = x.selectionEnd,
							scrtop = x.scrollTop,
							text = x.value.substring(start, end).split('\n'),
							i = text.length,
							tag = tagTable[this.id.substring(7)][0];
						$pd(e);
						if(bbBrds || (aib.fch && tag === 'spoiler')) {
							tag1 = '[' + tag + ']';
							tag2 = '[/' + tag + ']';
						} else {
							tag1 = tag2 = tag;
						}
						while(i--) {
							if(!tag1) {
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
							start === end ? quotetxt : x.value.substring(start, end)
						).replace(/\n/gm, '\n> '));
					};
				}
				$id('de-txt-panel').appendChild(btn);
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
		Cfg['txtBtnsLoc'] ? $id('de-txt-resizer') || pr.txta :
			aib._420 ? $c('popup', pr.form) :
			pr.subm,
		$attr($id('de-txt-panel') || $new('span', {'id': 'de-txt-panel'}, null), {
			'lang': (!Cfg['addTextBtns'] ? 'en' : !Cfg['txtBtnsLoc'] ? 'ru' : '')
		})
	);
	txtBtn('bold')('italic');
	if(!aib._420) {
		txtBtn('under')('strike');
	}
	txtBtn('spoil')('code')('quote');
}


/*==============================================================================
									POST BUTTONS
==============================================================================*/

function addPostButtons(post) {
	var h, ref = $q(aib.qRef, post),
		html = '<span class="de-ppanel' + (post.isOp ? '-op' : '') + ' de-ppanel-cnt" info="' + post.num + '"><span class="de-btn-hide" onclick="de_hideClick(this)" onmouseover="de_hideOver(this)" onmouseout="de_btnOut(event)"></span>' + (pr.qButton || oeForm ? '<span class="de-btn-rep" onclick="de_qReplyClick(this)" onmouseover="de_qReplyOver(this)"></span>' : '');
	if(post.isOp) {
		h = aib.host;
		if(!TNum) {
			html += '<span class="de-btn-expthr" onclick="de_expandClick(this)" onmouseover="de_expandOver(this)" onmouseout="de_btnOut(event)"></span>';
		}
		if(Favor[h] && Favor[h][brd] && Favor[h][brd][post.num]) {
			html += '<span class="de-btn-fav-sel" onclick="de_favorClick(this)"></span>';
			Favor[h][brd][post.num].cnt = post.thr.pCount + 1;
		} else {
			html += '<span class="de-btn-fav" onclick="de_favorClick(this)"></span>';
		}
	}
	nav.insAfter(ref, html + (
		post.sage ? '<span class="de-btn-sage" title="SAGE" onclick="de_sageClick(this)"></span>' : ''
	) + '</span>');
	post.btns = ref.nextSibling;
	if(pr.on && Cfg['insertNum']) {
		if(aib.tinyIb || (aib.nul && TNum)) {
			$each($T('a', ref), function(el) {
				el.onclick = null;
			});
		}
		if(!aib.brit) {
			ref.onclick = insertRefLink;
		}
	}
}

/*==============================================================================
									CONTENT FEATURES
==============================================================================*/

function prepareCFeatures() {
	addContentScript(
		'function de_removeSel() {\
			var el = document.getElementById("de-select");\
			if(el) {\
				el.parentNode.removeChild(el);\
			}\
		}\
		function de_delSelection(e) {\
			if(e.relatedTarget && !document.evaluate("ancestor-or-self::div[@id=\'de-select\']", e.relatedTarget, null, 3, null).booleanValue) {\
				de_removeSel();\
			}\
		}\
		function de_btnOut(e) {\
			clearTimeout(e.target.de_overDelay);\
			de_delSelection(e);\
		}\
		function de_btnOver(el, data) {\
			el.de_overDelay = setTimeout(function(msg) {\
				window.postMessage(msg, "*");\
			}, ' + Cfg['linksOver'] + ', data);\
		}\
		function de_hideOver(el) {\
			de_btnOver(el, "A" + el.parentNode.getAttribute("info"));\
		}\
		function de_imgSOver(el) {\
			de_btnOver(el, "L" + el.getAttribute("de-id"));\
		}\
		function de_expandOver(el) {\
			de_btnOver(el, "B" + el.parentNode.getAttribute("info"));\
		}\
		function de_hideClick(el) {\
			window.postMessage("D" + el.parentNode.getAttribute("info"), "*");\
		}\
		function de_qReplyClick(el) {\
			window.postMessage("F" + el.parentNode.getAttribute("info"), "*");\
		}\
		function de_qReplyOver(el) {\
			window.postMessage("C" + el.parentNode.getAttribute("info"), "*");\
		}\
		function de_expandClick(el) {\
			window.postMessage("E" + el.parentNode.getAttribute("info"), "*");\
		}\
		function de_favorClick(el) {\
			window.postMessage("G" + el.parentNode.getAttribute("info"), "*");\
		}\
		function de_sageClick(el) {\
			window.postMessage("H" + el.parentNode.getAttribute("info"), "*");\
		}\
		function de_cImgSearch(e, name) {\
			e.preventDefault();\
			window.postMessage("_" + name + ";" + e.target.getAttribute("de-url"), "*");\
			de_removeSel();\
		}'
	);

	$event(window, {'message': function(e) {
		var temp, data = e.data.substring(1);
		switch(e.data[0]) {
		case 'A': selectPostHider(pByNum[+data]); return;
		case 'B': selectExpandThread(pByNum[+data]); return;
		case 'C': quotetxt = $txtSelect(); return;
		case 'D': togglePostVisib(pByNum[+data]); return;
		case 'E': loadThread(pByNum[+data], 1, null); return;
		case 'F': showQuickReply(pByNum[+data]); return;
		case 'G':
			temp = pByNum[+data];
			toggleFavorites(temp, $c('de-btn-fav', temp) || $c('de-btn-fav-sel', temp));
			return;
		case 'H': addSpell('#sage'); return;
		case 'I':
			$del($id('de-fav-wait'));
			$id('de-iframe-fav').style.height = data + 'px';
			return;
		case 'J':
			temp = data.split('$#$');
			if(temp[0] === 'de-iframe-pform') {
				checkUpload(temp[1], temp[2]);
			} else {
				checkDelete(temp[1], temp[2]);
			}
			$id(temp[0]).src = 'about:blank';
			return;
		case 'L': selectImgSearch($q('.de-btn-src[de-id="' + data + '"]', dForm)); return;
		}
	}});

	if(nav.noBlob) {
		return;
	}
	addContentScript('(function() {\
		"use strict";\
		window.addEventListener("message", function(e) {\
			var id = e.data[0],\
				data = e.data.substring(1);\
			if(id === "K") {\
				var mReqs = data === "all" ? 4 : 1, i = mReqs, rjw' +
				(Cfg['findRarJPEG'] ? '= []; while(i--) rjw.push(new Worker("' +
					window.URL.createObjectURL(nav.toBlob(['self.onmessage = ' + String(parsePostImg)], null))
				+ '"));' : ';') +
				'preloadImages(data, mReqs, rjw);\
				return;\
			}\
		});\
		var $x = function(path, root) {\
				return document.evaluate(path, root, null, 8, null).singleNodeValue;\
			},\
			toBlob = ' + String(nav.toBlob) + ',\
			getPostImages = ' + String(getPostImages) + ',\
			getPicWrap = ' + String(aib.getPicWrap) + ';\
		function preloadImages(pNum, mReqs, rjw) {\
			var len, el, cReq = 0, i = 0, arr = [],\
				bwrk = mReqs === 4 ? [0, 0, 0, 0] : [0],\
				loadFunc = function(idx) {\
					if(idx >= arr.length) {\
						if(cReq === 0) {\
							mReqs = cReq = i = arr = loadFunc = null;\
						}\
						return;\
					}\
					var xhr, url, type, eImg = ' + !!Cfg['noImgSpoil'] + ',\
						a = arr[idx];\
					if(!a || !(url = a.href)) {\
						loadFunc(i++);\
						return;\
					}\
					if(/\.gif$/i.test(url)) {\
						eImg |= ' + !!Cfg['showGIFs'] + ';\
						type = "image/gif";\
					} else if(/\.jpe?g$/i.test(url)) {\
						type = "image/jpeg";\
					} else if(/\.png$/i.test(url)) {\
						type = "image/png";\
					} else {\
						loadFunc(i++);\
						return;\
					}\
					if(cReq === mReqs) {\
						setTimeout(loadFunc, 500, idx);\
						return;\
					}\
					cReq++;\
					xhr = new XMLHttpRequest();\
					xhr.open("GET", url, true);\
					xhr.responseType = "arraybuffer";\
					xhr.onload = function() {\
						if(this.status == 200) {\
							a.download = url.substring(url.lastIndexOf("/") + 1);\
							var href = a.href = window.' + (nav.WebKit ? 'webkit' : '') +
								'URL.createObjectURL(toBlob([new Uint8Array(this.response)], type));\
							if(eImg) {\
								a.getElementsByTagName("img")[0].src = href;\
							}' + (Cfg['findRarJPEG'] ? 'parseRJ(a);' : '') +
							'cReq--; loadFunc(i++); a = eImg = url = type = null;\
						}\
					};\
					xhr.send(null);\
				}' + (Cfg['findRarJPEG'] ? ',\
				parseRJ = function(link) {\
					var wI = bwrk.indexOf(0), w;\
					if(wI === -1) {\
						setTimeout(parseRJ, 500, link);\
						return;\
					}\
					w = rjw[wI];\
					bwrk[wI] = 1;\
					w.onmessage = function(e) {\
						if(e.data) {\
							getPicWrap(link).querySelector(\'' + aib.qImgLink + '\').className += " de-archive";\
						}\
						bwrk[wI] = 0;\
						link = wI = null;\
					};\
					w.onerror = function(e) {\
						console.error("RARJPEG ERROR, line: " + e.lineno + " - " + e.message);\
						bwrk[wI] = 0;\
						link = wI = null;\
					};\
					w.postMessage(link.href);\
				};' : ';') +
			'el = getPostImages(pNum === "all" ? document : document.querySelector("[de-post=\'" + pNum + "\']"));\
			for(i = 0, len = el.length; i < len; i++) {\
				arr.push($x("ancestor::a[1]", el[i]));\
			}\
			for(i = 0; i < mReqs; i++) {\
				loadFunc(i);\
			}\
		}})()'
	);
}

/*==============================================================================
									TIME CORRECTION
==============================================================================*/

/** @constructor */
function dateTime(pattern, diff, dtLang, info, hash) {
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
	this.diff = parseInt(diff, 10);
	this.arrW = Lng.week[dtLang];
	this.arrM = Lng.month[dtLang];
	this.arrFM = Lng.fullMonth[dtLang];
	if(info && hash && ELFHash(info) === +hash) {
		this.inited = true;
		this.rPattern = info.substring(1);
		this.fullM = !!+info[0];
	}
}

dateTime.toggleSettings = function(el) {
	if(el.checked && (!/^[+-]\d{1,2}$/.test(Cfg['timeOffset']) || dateTime.checkPattern(Cfg['timePattern']))) {
		$alert(Lng.cTimeError[lang], 'err-correcttime', false);
		saveCfg('correctTime', 0);
		el.checked = false;
	}
};

dateTime.checkPattern = function(val) {
	return !val.contains('i') || !val.contains('h') || !val.contains('d') || !val.contains('y') ||
		!(val.contains('n') || val.contains('m')) ||
		/[^\?\-\+sihdmwny]|mm|ww|\?\?|([ihdny]\?)\1+/.test(val);
};

dateTime.prototype.init = function(txt) {
	if(this.inited || this.disabled) {
		return this;
	}
	var k, p, a, str, i = 1,
		j = 0,
		m = txt.match(new RegExp(this.regex));
	if(!m) {
		this.disabled = true;
		return this;
	}
	this.rPattern = '';
	str = m[0];
	while(a = m[i++]) {
		if((p = this.pattern[i - 2]) === 'm') {
			this.fullM = a.length > 3;
		}
		k = str.indexOf(a, j);
		this.rPattern += str.substring(j, k) + '_' + p;
		j = k + a.length;
	}
	sessionStorage['timeRPHash'] = ELFHash(sessionStorage['timeRPattern'] = (this.fullM ? '1' : '0') + this.rPattern);
	this.inited = true;
	return this;
};

dateTime.prototype.fix = function(txt) {
	if(this.disabled) {
		return txt;
	}
	var arrW = this.arrW,
		arrM = this.fullM ? this.arrFM : this.arrM,
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
					/^янв|^jan/i.test(a) ? 0 :
					/^фев|^feb/i.test(a) ? 1 :
					/^мар|^mar/i.test(a) ? 2 :
					/^апр|^apr/i.test(a) ? 3 :
					/^май|^may/i.test(a) ? 4 :
					/^июн|^jun/i.test(a) ? 5 :
					/^июл|^jul/i.test(a) ? 6 :
					/^авг|^aug/i.test(a) ? 7 :
					/^сен|^sep/i.test(a) ? 8 :
					/^окт|^oct/i.test(a) ? 9 :
					/^ноя|^nov/i.test(a) ? 10 :
					/^дек|^dec/i.test(a) && 11
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

function getTubeVideoLinks(id, Fn) {
	GM_xmlhttpRequest({'method': 'GET', 'url': 'https://www.youtube.com/watch?v=' + id, 'onload': function(xhr) {
		var i, group, len, el, result1, result2, src, url = [],
			sep1 = '%2C',
			sep2 = '%26',
			sep3 = '%3D',
			formats = xhr.responseText.match(/\"url_encoded_fmt_stream_map\":\s*\"([^\"]+)\"/);
		if(!formats) {
			Fn(false);
			Fn = null;
			return;
		}
		formats = formats[1];
		if(formats.contains(',')) {
			sep1 = ',';
			sep2 = formats.contains('&') ? '&' : '\\u0026';
			sep3 = '=';
		}
		for(i = 0, group = formats.split(sep1), len = group.length; i < len; i++) {
			el = group[i].split(sep2);
			if(el.length < 5) {
				continue;
			}
			result1 = el[0].split(sep3);
			if(result1.length < 2) {
				continue;
			}
			src = unescape(unescape(result1[1])).replace(/\\\//g, '/').replace(/\\u0026/g, '&');
			result2 = el[4].split(sep3);
			if(result2.length < 2) {
				continue;
			}
			if(src.toLowerCase().indexOf('http') === 0) {
				url[result2[1]] = src;
			}
		}
		Fn(url);
		Fn = null;
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
		time = (m[2] ? m[2] * 3600 : 0) + (m[3] ? m[3] * 60 : 0) + (m[4] ? +m[4] : 0);
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
		el.innerHTML = '<video poster="https://i.ytimg.com/vi/' + id + '/0.jpg" controls="controls" ' +
			'preload="none" src="' + src + (nav.Firefox && nav.Firefox < 14 ? '&' + Math.random() : '') +
			'" width="' + Cfg['YTubeWidth'] + '" height="' + Cfg['YTubeHeigh'] + '"></video>';
		if(time !== 0) {
			el.firstChild.onloadedmetadata = function() {
				this.currentTime = time;
				time = null;
			};
		}
	});
}

function addTubePreview(el, m) {
	el.innerHTML = '<a href="https://www.youtube.com/watch?v=' + m[1] + '" target="_blank">' +
		'<img src="https://i.ytimg.com/vi/' + m[1] + '/0.jpg" width="360" height="270" /></a>';
	if(Cfg['addYouTube'] === 3) {
		el.firstChild.onclick = function(e) {
			$pd(e);
			addTubePlayer(this.parentNode, m);
		};
	}
}

function getTubePattern() {
	return /^https?:\/\/(?:www\.)?youtu(?:be\.com\/(?:watch\?.*?v=|v\/|embed\/)|\.be\/)([^&#?]+).*?(?:t(?:ime)?=(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?)?$/;
}

function clickTubeLink(e) {
	var m = this.href.match(getTubePattern()),
		el = $c('de-ytube-obj', getPost(this));
	$pd(e);
	if($xb('*[contains(@src,"' + m[1] + '")]|video[contains(@poster,"' + m[1] + '")]', el)) {
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
	$each($Q('embed', post || dForm), function(el) {
		var src, pst, m = el.src.match(getTubePattern());
		if(!m) {
			return;
		}
		src = 'https://www.youtube.com/watch?v=' + m[1];
		if(m[4] || m[3] || m[2]) {
			src += '#t=' + (m[2] ? m[2] + 'h' : '') + (m[3] ? m[3] + 'm' : '') + (m[4] ? m[4] + 's' : '');
		}
		pst = post || getPost(el);
		(pst.msg || $q(aib.qMsg, pst)).appendChild($add('<p class="de-ytube-ext"><a href="' + src + '">' +
			src + '</a></p>'));
		$del(el.parentNode);
	});
	$each($Q('a[href*="youtu"]', post || dForm), function(link) {
		var pst, el, msg, prev, m = link.href.match(getTubePattern());
		if(!m) {
			return;
		}
		link.href = link.href.replace(/^http:/, 'https:');
		pst = post || getPost(link);
		if(!$c('de-ytube-obj', pst)) {
			el = $new('div', {'class': 'de-ytube-obj'}, null);
			if(Cfg['addYouTube'] > 2) {
				addTubePreview(el, m);
			} else if(Cfg['addYouTube'] === 2) {
				addTubePlayer(el, m);
			}
			msg = pst.msg || $q(aib.qMsg, pst);
			if(aib.krau) {
				msg = msg.parentNode;
				prev = msg.previousElementSibling;
				$before(prev.hasAttribute('style') ? prev : msg, el);
			} else {
				$before(msg, el);
			}
		}
		link.className = 'de-ytube-link';
		link.onclick = clickTubeLink;
		if(nav.Opera && nav.Opera < 12 || !Cfg['YTubeTitles']) {
			link.textContent = link.textContent.replace(/^http:/, 'https:');
			return;
		}
		GM_xmlhttpRequest({
			'method': 'GET',
			'url': 'https://gdata.youtube.com/feeds/api/videos/' + m[1] +
				'?alt=json&fields=title/text(),media:group/media:keywords',
			'onload': function(xhr) {
				try {
					var json = JSON.parse(xhr.responseText)['entry'],
						txt = json['title']['$t'];
					link.textContent = txt;
					if(Cfg['hideBySpell']) {
						for(var t, i = 0; t = oSpells.video[i]; i++) {
							if($toRegExp(t).test(txt)) {
								hidePost(pst, '#video ' + t);
								pst.ytHide = true;
								clearTimeout(hideTubeDelay);
								hideTubeDelay = setTimeout(savePostsVisib, 500);
								return;
							}
						}
					}
					link = pst = null;
				} catch(e) {}
			}
		});
	});
}

function hideByTube() {
	if(!Cfg['YTubeTitles']) {
		return;
	}
	$each($Q('a[href*="youtu"]', dForm), function(link) {
		for(var t, post, i = 0, val = link.textContent; t = oSpells.video[i++];) {
			if($toRegExp(t).test(val)) {
				post = getPost(link);
				hidePost(post, '#video ' + t);
				post.ytHide = true;
				return;
			}
		}
	});
}

function addLinkMP3(post) {
	if(!Cfg['addMP3']) {
		return;
	}
	$each($Q('a[href*=".mp3"]', post || dForm), function(link) {
		if(!(link.target === '_blank' || link.rel === 'nofollow')) {
			return;
		}
		var pst = post || getPost(link),
			el = $c('de-mp3', pst);
		if(!el) {
			el = $new('div', {'class': 'de-mp3'}, null);
			$before(pst.msg || $q(aib.qMsg, pst), el);
		}
		if(!$xb('.//object[contains(@FlashVars,"' + link.href + '")]', el)) {
			el.innerHTML += '<object data="//junglebook2007.narod.ru/audio/player.swf" type="application/x-shockwave-flash" wmode="transparent" width="220" height="16" FlashVars="playerID=1&amp;bg=0x808080&amp;leftbg=0xB3B3B3&amp;lefticon=0x000000&amp;rightbg=0x808080&amp;rightbghover=0x999999&amp;rightcon=0x000000&amp;righticonhover=0xffffff&amp;text=0xffffff&amp;slider=0x222222&amp;track=0xf5f5dc&amp;border=0x666666&amp;loader=0x7fc7ff&amp;loop=yes&amp;autostart=no&amp;soundFile=' + link.href + '" /><br>';
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
		$event(doc.body, {'mousemove': elMove, 'mouseup': elStop});
	};
}

function resizeImg(e) {
	var curX = e.clientX,
		curY = e.clientY,
		oldL = parseInt(this.style.left, 10),
		oldT = parseInt(this.style.top, 10),
		oldW = parseFloat(this.style.width || this.width),
		oldH = parseFloat(this.style.height || this.height),
		d = nav.Firefox ? -e.detail : e.wheelDelta,
		newW = oldW * (d > 0 ? 1.25 : 0.8),
		newH = oldH * (d > 0 ? 1.25 : 0.8);
	$pd(e);
	this.style.width = newW + 'px';
	this.style.height = newH + 'px';
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
		full = $c('de-img-full', a);
	if(full && isExp || !full && isExp === false) {
		return;
	}
	if(Cfg['expandImgs'] === 1 && !$xb('img[contains(@style,"fixed")]', a)) {
		$disp($t('img', a));
	}
	if(full) {
		if(full.moved) {
			full.moved = false;
		} else {
			$disp(full);
			setTimeout($del, 0, full);
		}
		return;
	}
	if(Cfg['expandImgs'] === 1) {
		scrW -= $offset(a).left + 25;
	} else {
		$del($c('de-img-center', doc));
	}
	if(fullW && fullH) {
		newW = fullW < scrW ? fullW : scrW;
		newH = newW * fullH / fullW;
		if(Cfg['expandImgs'] === 2 && newH > scrH) {
			newH = scrH;
			newW = newH * fullW / fullH;
		}
	}
	full = a.appendChild($add('<img class="de-img-full" src="' + a.href + '" alt="' + a.href +
		'" width="' + newW + '" height="' + newH + '"/>'));
	if(Cfg['expandImgs'] === 2) {
		nav.addClass(full, 'de-img-center');
		full.style.cssText = 'left: ' + (scrW - newW) / 2 + 'px; top: ' + (scrH - newH) / 2 + 'px;';
		full.addEventListener(nav.Firefox ? 'DOMMouseScroll' : 'mousewheel', resizeImg, false);
		makeMoveable(full);
	}
}

function eventLinkImg(el) {
	el.onclick = function(e) {
		if(Cfg['expandImgs'] && e.button !== 1) {
			$pd(e);
			addFullImg(this, this.firstChild.title.split('x'), null);
		}
	};
}

function addLinkImg(el) {
	if(!Cfg['addImgs']) {
		return;
	}
	for(var a, link, i = 0, els = $Q(
		aib.qMsg + ' a[href*=".jpg"], ' + aib.qMsg + ' a[href*=".png"], ' + aib.qMsg + ' a[href*=".gif"]', el
	), len = els.length; i < len; i++) {
		link = els[i];
		if(link.parentNode.tagName === 'SMALL') {
			return;
		}
		a = link.cloneNode(false);
		a.target = '_blank';
		$disp(a);
		a.appendChild($new('img', {'class': 'de-img-pre', 'src': a.href, 'alt': a.href}, {'load': function() {
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
		}}));
		eventLinkImg(a);
		$before(link, a);
	}
}

function addImgSearch(el) {
	if(!Cfg['imgSrcBtns']) {
		return;
	}
	for(var num = el.num || '', els = $Q(aib.qImgLink, el), i = els.length - 1, link; i >= 0; i--) {
		link = els[i];
		if(/google\.|tineye\.com|iqdb\.org/.test(link.href)) {
			$del(link);
			continue;
		}
		if(link.firstElementChild) {
			continue;
		}
		nav.insBefore(
			link, '<span de-id="' + num + i +
			'" class="de-btn-src" onmouseover="de_imgSOver(this)" onmouseout="de_btnOut(event)"></span>'
		);
	}
}

function expandPostImg(a, isExp) {
	if(/\.jpe?g|\.png|.\gif|^blob:/i.test(a.href)) {
		addFullImg(a, getImgSize(aib.getPicWrap(a)), isExp);
	}
}

function expandAllPostImg(post, isExp) {
	$each(post.img, function(img) {
		expandPostImg($x('ancestor::a[1]', img), isExp);
	});
}

function eventPostImg(post) {
	$each(post.img, function(img) {
		var a = $x('ancestor::a[1]', img);
		if(a) {
			img.onclick = null;
			if(aib.dfwk) {
				img.parentNode.onclick = null;
			}
			a.onclick = function(e) {
				if(e.button !== 1) {
					$pd(e);
					expandPostImg(this, null);
				}
			};
		}
	});
}

function parsePostImg(e) {
	var dat, i, j, len, xhr = new XMLHttpRequest();
	xhr.open('GET', e.data, false);
	xhr.responseType = 'arraybuffer';
	xhr.send();
	dat = new Uint8Array(xhr.response);
	len = dat.length;
	if(dat[0] === 0xFF && dat[1] === 0xD8) {
		for(i = 0, j = 0; i < len - 1; i++) {
			if(dat[i] === 0xFF) {
				if(dat[i + 1] === 0xD8) {
					j++;
				} else if(dat[i + 1] === 0xD9 && --j === 0) {
					i += 2;
					break;
				}
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
		self.postMessage(false);
		return;
	}
	if(i !== len && len - i > 60) {
		for(len = i + 50; i < len; i++) {
			if(
				(dat[i] === 0x37 && dat[i + 1] === 0x7A) ||
				(dat[i] === 0x50 && dat[i + 1] === 0x4B) ||
				(dat[i] === 0x52 && dat[i + 1] === 0x61)
			) {
				self.postMessage(true);
				return;
			}
		}
	}
	self.postMessage(false);
}


/*==============================================================================
								MAP OF >>REFLINKS
==============================================================================*/

function addRefMap(post) {
	var rM = '<div class="de-refmap">' + post.ref.join(', ').replace(/(\d+)/g,
			'<a href="#$1">&gt;&gt;$1</a>') + '</div>';
	try {
		nav.insAfter(post.msg, rM);
	} catch(e) {
		post.appendChild($add(rM));
	}
}

function genRefMap(pBn) {
	var refMap = [];
	nav.forEach(pBn, function(pNum) {
		for(var rNum, post, nodes = $T('a', this[pNum].msg), i = nodes.length - 1; i >= 0; i--) {
			if((rNum = nodes[i].textContent.match(/^>>(\d+)$/)) && (post = pBn[rNum[1]])) {
				if(!post.ref) {
					post.ref = [pNum];
					refMap.push(post);
				} else if(post.ref.indexOf(pNum) === -1) {
					post.ref.push(pNum);
				}
			}
		}
	});
	refMap.forEach(addRefMap);
	refMap = pBn = null;
}

function updRefMap(post) {
	var pNum, el, pst, pNums = [],
		nodes = $T('a', post.msg),
		i = nodes.length - 1;
	for(; i >= 0; i--) {
		if((pNum = nodes[i].textContent.match(/^>>(\d+)$/)) && pNums.indexOf(pNum = pNum[1]) === -1) {
			pNums.push(pNum);
		}
	}
	pNum = post.num;
	for(i = pNums.length - 1; i >= 0; i--) {
		if(!(pst = pByNum[pNums[i]])) {
			continue;
		}
		if(!pst.ref) {
			pst.ref = [pNum];
		} else if(pst.ref.indexOf(pNum) === -1) {
			pst.ref.push(pNum);
		}
		$del($c('de-refmap', pst));
		addRefMap(pst);
		eventRefLink($c('de-refmap', pst));
		if(Cfg['hideRefPsts'] && pst.hide) {
			hidePost(post, 'reference to >>' + pNums[i]);
		}
	}
}


/*==============================================================================
							ON >>REFLINKS POSTS PREVIEW
==============================================================================*/

function closePview(el) {
	if(Cfg['animation']) {
		nav.animEvent(el, $del);
		nav.addClass(el, 'de-pview-anim');
		el.style[nav.animName] = 'de-post-close-' + (el.aTop ? 't' : 'b') + (el.aLeft ? 'l' : 'r');
	} else {
		$del(el);
	}
}

function delPviews(el) {
	if(el) {
		if(el.parent) {
			el.parent.kid = null;
		} else {
			Pviews.top = null;
		}
		do {
			clearTimeout(el.readDelay);
			closePview(el);
		} while(el = el.kid);
	}
}

function markPviewToDel(el, delAll) {
	if(el) {
		clearTimeout(Pviews.outDelay);
		Pviews.outDelay = setTimeout(delPviews, Cfg['linksOut'], delAll ? el : el.kid);
	}
}

function PviewMoved() {
	if(this.style[nav.animName]) {
		nav.remClass(this, 'de-pview-anim');
		this.style.cssText = this.newPos;
		this.newPos = false;
		$each($C('de-css-move', doc.head), $del);
		this.removeEventListener(nav.animEnd, PviewMoved, false);
	}
}

function setPviewPosition(link, pView, isAnim) {
	if(pView.link === link) {
		return;
	}
	pView.link = link;
	var isTop, top, cr = link.getBoundingClientRect(),
		offX = cr.left + window.pageXOffset + link.offsetWidth / 2,
		offY = cr.top + window.pageYOffset,
		bWidth = doc.body.clientWidth,
		isLeft = offX < bWidth / 2,
		tmp = (isLeft ? (bWidth - offX) : offX) - 10,
		lmw = 'max-width:' + tmp + 'px; left:' + (isLeft ? offX : offX -
			Math.min(parseInt(pView.offsetWidth, 10), tmp)) + 'px;';
	if(isAnim) {
		tmp = pView.style.cssText;
		pView.style.cssText = 'opacity: 0; ' + lmw;
	} else {
		pView.style.cssText = lmw;
	}
	top = pView.offsetHeight;
	isTop = top + cr.top + link.offsetHeight < window.innerHeight || cr.top - top < 5;
	top = (isTop ? offY + link.offsetHeight : offY - top) + 'px';
	pView.aLeft = isLeft;
	pView.aTop = isTop;
	if(!Cfg['animation'] || !isAnim) {
		pView.style.top = top;
		return;
	}
	var uId = 'de-movecss-' + Math.round(Math.random() * 1e3);
	doc.head.appendChild($new('style', {
		'class': 'de-css-move',
		'type': 'text/css',
		'text': '@' + nav.cssFix + 'keyframes ' + uId + ' {to { ' + lmw + ' top:' + top + '; }}'
	}, null));
	if(pView.newPos) {
		pView.style.cssText = pView.newPos;
		pView.removeEventListener(nav.animEnd, PviewMoved, false);
	} else {
		pView.style.cssText = tmp;
	}
	pView.newPos = lmw + ' top:' + top + ';';
	pView.addEventListener(nav.animEnd, PviewMoved, false);
	nav.addClass(pView, 'de-pview-anim');
	pView.style[nav.animName] = uId;
}

function markRefMap(pView, pNum) {
	($c('de-pview-link', pView) || {}).className = '';
	($x('.//a[starts-with(text(),">>") and contains(text(),"' + pNum + '")]', pView) || {}).className =
		'de-pview-link';
}

function getPview(post, pNum, parent, link, txt) {
	clearTimeout(Pviews.outDelay);
	var pView, inDoc;
	if(post) {
		inDoc = post.ownerDocument === doc ;
		pView = inDoc ? post.cloneNode(true) : importPost(post);
		pView.setAttribute('de-post', null);
		pView.className = aib.cReply + ' de-pview' + (post.viewed ? ' de-viewed' : '');
		pView.style.display = '';
		if(aib._7ch) {
			pView.firstElementChild.style.cssText = 'max-width: 100%; margin: 0;';
			$del($c('doubledash', pView));
		}
		pView.num = pNum;
		$each($Q('.de-img-full, .de-ppanel, .de-ppanel-op', pView), $del);
		if(!inDoc) {
			addLinkMP3(pView);
			addLinkTube(pView);
			addLinkImg(pView);
			addImgSearch(pView);
		} else {
			if(Cfg['addYouTube']) {
				$each($C('de-ytube-link', pView), function(el) {
					el.onclick = clickTubeLink;
				});
				if(Cfg['addYouTube'] === 3) {
					$each($C('de-ytube-obj', pView), function(el) {
						addTubePreview(el, el.firstChild.href.match(getTubePattern()));
					});
				}
			}
			if(Cfg['addImgs']) {
				$each($C('de-img-pre', pView), function(el) {
					eventLinkImg(el.parentNode);
				});
			}
			if(Cfg['imgSrcBtns']) {
				$each($C('de-btn-src', pView), function(el) {
					el.setAttribute('de-id', 'pv' + el.getAttribute('de-id'));
				});
			}
		}
		$each(pView.img = getPostImages(pView), function(img) {
			img.style.display = '';
		});
		if(Cfg['expandImgs']) {
			eventPostImg(pView);
		}
		if(Cfg['linksNavig'] === 2) {
			markRefMap(pView, parent.num);
		}
		eventRefLink(pView);
		if(Cfg['markViewed']) {
			pView.readDelay = setTimeout(function(pst, num) {
				if(!pst.viewed) {
					nav.addClass(pst, 'de-viewed');
					pst.viewed = true;
				}
				var arr = (sessionStorage['de-viewed'] || '').split(',');
				arr.push(num);
				sessionStorage['de-viewed'] = arr;
			}, 2e3, post, pNum);
		}
	} else {
		if(!txt) {
			Pviews.deleted[pNum] = true;
		}
		pView = $add('<div class="' + aib.cReply + ' de-pview-info de-pview">' +
			(txt || Lng.postNotFound[lang]) + '</div>');
	}
	dForm.appendChild(pView);
	setPviewPosition(link, pView, false);
	pView.onmouseover = function() {
		markPviewToDel(this, false);
	};
	pView.onmouseout = function() {
		markPviewToDel(Pviews.top, true);
	};
	pView.pView = true;
	if(Pviews.top && parent.pView) {
		delPviews(parent.kid);
		pView.parent = parent;
		parent.kid = pView;
	} else {
		delPviews(Pviews.top);
		Pviews.top = pView;
	}
	if(Cfg['animation']) {
		nav.animEvent(pView, function(node) {
			nav.remClass(node, 'de-pview-anim');
			node.style[nav.animName] = '';
		});
		nav.addClass(pView, 'de-pview-anim');
		pView.style[nav.animName] = 'de-post-open-' + (pView.aTop ? 't' : 'b') + (pView.aLeft ? 'l' : 'r');
	}
	return pView;
}

function getAjaxPview(b, pNum, tNum) {
	if(!Pviews.ajaxed[b]) {
		return null;
	}
	var nodes, i, el = Pviews.ajaxed[b][pNum];
	if(b === brd || !el || el.aRep) {
		return el;
	}
	pNum = fixBrd(b) + res + tNum + (aib.tire ? '.html' : docExt);
	for(nodes = $T('a', el), i = nodes.length - 1; i >= 0; i--) {
		if(/^>>\d+$/.test(nodes[i].textContent)) {
			nodes[i].href = pNum;
		}
	}
	el.aRep = true;
	return el;
}

function showPview(link) {
	var b = link.pathname.match(/^\/?(.*?)\/?(?:res|thread-|index|\d+|$)/)[1],
		tNum = (link.pathname.match(/[^\/]+\/[^\d]*(\d+)/) || [,0])[1],
		pNum = (link.textContent.match(/\d+$/) || [tNum])[0],
		post = pByNum[pNum] || getAjaxPview(b, pNum, tNum),
		parent = getPost(link),
		el = parent.pView ? parent.kid : Pviews.top;
	if(Cfg['noNavigHidd'] && post && post.hide) {
		return;
	}
	if(Pviews.deleted[pNum]) {
		getPview(null, pNum, parent, link, Lng.postNotFound[lang]);
		return;
	}
	if(el && el.num === pNum) {
		markPviewToDel(el, false);
		delPviews(el.kid);
		setPviewPosition(link, el, true);
		markRefMap(el, parent.num);
		return;
	}
	if(post) {
		getPview(post, pNum, parent, link, null);
		return;
	}
	el = getPview(null, pNum, parent, link, '<span class="de-wait">' + Lng.loading[lang] + '</span>');
	Pviews.ajaxed[b] = [];
	ajaxGetPosts(null, b, tNum, true, function(els, op, err) {
		if(!err) {
			var pst, i = 0,
				len = els.length;
			op.isOp = true;
			op.msg = $q(aib.qMsg, op);
			Pviews.ajaxed[b][tNum] = op;
			for(; i < len; i++) {
				pst = els[i];
				pst.msg = $q(aib.qMsg, pst);
				Pviews.ajaxed[b][aib.getPNum(pst)] = pst;
			}
			genRefMap(Pviews.ajaxed[b]);
			if(el && el.parentNode) {
				getPview(getAjaxPview(b, pNum, tNum), pNum, parent, link, err);
			}
		}
		b = pNum = tNum = parent = el = null;
	});
}

function overRefLink() {
	if(this.textContent.length > 2) {
		this.overDelay = setTimeout(showPview, Cfg['linksOver'], this);
	}
}

function outRefLink() {
	clearTimeout(this.overDelay);
	markPviewToDel(Pviews.top, true);
}

function eventRefLink(el) {
	if(Cfg['linksNavig']) {
		var link, links = doc.evaluate('.//a[starts-with(text(),">>")]', el, null, 4, null);
		while(link = links.iterateNext()) {
			link.onmouseover = overRefLink;
			link.onmouseout = outRefLink;
		}
	}
}


/*==============================================================================
									AJAX FUNCTIONS
==============================================================================*/

function ajaxGetPosts(url, b, tNum, parse, Fn) {
	GM_xmlhttpRequest({
		'method': 'GET',
		'url': nav.fixLink(url || (fixBrd(b) + res + tNum + (aib.tire ? '.html' : docExt))),
		'onreadystatechange': function(xhr) {
			if(xhr.readyState !== 4) {
				return;
			}
			if(xhr.status === 200) {
				var dc = nav.toDOM(xhr.responseText);
				if(!pr.on && oeForm) {
					pr = getPostform(doc.importNode($q(aib.qPostForm, dc), true));
					$before(oeForm, pr.form);
				}
				if(parse) {
					parseDelform($q(aib.qDForm, dc), dc, function(thr) {
						Fn(aib.getPosts(thr), aib.getOp(thr, dc), null);
					});
				} else {
					Fn(null, dc, null);
				}
			} else {
				Fn(null, null, xhr.status === 0 ?
					Lng.noConnect[lang] :
					'HTTP [' + xhr.status + '] ' + xhr.statusText
				);
			}
			Fn = parse = dc = null;
		}
	});
}

function getJsonPosts(url, Fn) {
	GM_xmlhttpRequest({'method': 'GET', 'url': nav.fixLink(url), 'onreadystatechange': function(xhr) {
		if(xhr.readyState === 4) {
			if(xhr.status === 304) {
				closeAlert($id('de-alert-newposts'));
			} else {
				try {
					Fn(xhr.status, xhr.statusText, JSON.parse(xhr.responseText));
				} catch(e) {
					Fn(1, e.toString(), null);
				}
				Fn = null;
			}
		}
	}});
}

function importPost(post) {
	return replacePost(doc.importNode(post, true));
}

function addPostFunc(post) {
	if(Cfg['expandImgs']) {
		eventPostImg(post);
	}
	if(!post.hide) {
		doPostFilters(post);
	}
	updRefMap(post);
	eventRefLink(post);
	addLinkMP3(post);
	addLinkTube(post);
	addLinkImg(post);
	if(isExpImg) {
		expandAllPostImg(post, null);
	}
}

function newPost(thr, post, pNum, i) {
	var pst, el;
	processPost(post, pNum, thr, i);
	addPostButtons(post);
	if(Cfg['expandPosts'] && !TNum) {
		expandPost(post);
	}
	addPostFunc(post);
	addImgSearch(post);
	if(postWrapper && i !== 0) {
		pst = postWrapper.cloneNode(true);
		el = aib.getPosts(pst)[0];
		if(el) {
			el.parentNode.replaceChild(post, el);
		} else {
			pst = post;
		}
	} else {
		pst = post;
	}
	thr.appendChild(pst);
	if(Cfg['preLoadImgs']) {
		window.postMessage('K' + pNum, '*');
	}
	if(aib.tiny) {
		thr.appendChild(doc.createElement('br'));
	}
	return +!post.hide;
}

function processFullMsg(post) {
	if(aib.rep) {
		post.innerHTML = replaceString(post.innerHTML);
		post.img = getPostImages(post);
	}
	$each($Q('.de-ytube-obj', post), $del);
	addPostFunc(post);
}

function getFullPost(el, isFunc) {
	var	post = getPost(el),
		replaceFMsg = function(pst, pNum) {
			if(post.num === pNum) {
				$del(el);
				var ytube = $q('.de-ytube-ext', post.msg);
				post.msg.parentNode.replaceChild(doc.importNode($q(aib.qMsg, pst), true), post.msg);
				post.msg = $q(aib.qMsg, post);
				if(ytube) {
					post.msg.appendChild(ytube);
				}
				processFullMsg(post);
				el = post = null;
				throw null;
			}
		};
	if(aib.hana) {
		$del(el.nextSibling);
		$del(el.previousSibling);
		$del(el);
		post.msg.replaceChild($q('.alternate > div', post), post.msg.firstElementChild);
		if(isFunc) {
			processFullMsg(post);
		}
		return;
	}
	ajaxGetPosts(null, brd, post.thr.num, true, function(els, op, err) {
		if(!err) {
			try {
				replaceFMsg(op, aib.getTNum(op));
				$each(els, function(pst) {
					replaceFMsg(pst, aib.getPNum(pst));
				});
			} catch(e) {}
		}
		el = post = null;
	});
}

function expandPost(post) {
	if(post.hide) {
		return;
	}
	var el = $q(
			aib.krau ? 'p[id^="post_truncated"]' :
				aib.hana ? '.abbrev > span' :
				'.abbrev, .abbr, .omittedposts, .shortened',
			post
		);
	if(el && /long|full comment|gekürzt|слишком|длинн|мног|полная версия/i.test(el.textContent)) {
		if(Cfg['expandPosts'] === 1) {
			getFullPost(el, false);
		} else {
			$t('a', el).onclick = function(e) {
				$pd(e);
				getFullPost(this, true);
			};
		}
	}
}

function loadThread(op, last, Fn) {
	if(!Fn) {
		$alert(Lng.loading[lang], 'load-thr', true);
	}
	ajaxGetPosts(null, brd, op.num, true, function(els, newOp, err) {
		var i, impP, nEls, pCnt, thr = op.thr,
			len = els.length;
		if(err) {
			$alert(err, 'load-thr', false);
		} else {
			showMainReply();
			$del($id('de-select'));
			pCnt = thr.visPCnt || thr.pCount - getOmPosts(thr) + 1;
			thr.innerHTML = '';
			(impP = importPost(newOp)).isOp = true;
			newPost(thr, impP, aib.getTNum(newOp), 0);
			impP.tTitle = ($c(aib.cTitle, impP) || {}).textContent ||
				getText(impP).substring(0, 70).replace(/\s+/g, ' ');
			Threads[Threads.indexOf(op)] = impP;
			nav.insAfter(
				impP.btns, '<span>&nbsp;[<a href="' + getThrdUrl(aib.host, brd, impP.num) + '">' +
					Lng.reply[lang] + '</a>]</span>'
			);
			if(last === 1 || last >= len) {
				i = 0;
			} else {
				i = len - last;
				thr.visPCnt = last + 1;
				thr.appendChild($new('div', {
					'class': 'de-omitted',
					'text': Lng.postsOmitted[lang] + i
				}, null));
			}
			for(nEls = [impP]; i < len; i++) {
				newPost(thr, impP = importPost(els[i]), aib.getPNum(els[i]), i + 1);
				nEls.push(impP);
			}
			if(last > 5 || last === 1) {
				thr.appendChild(
					$add('<span>[<a href="#">' + Lng.collapseThrd[lang] + '</a>]</span>')
				).onclick = function(e) {
					$pd(e);
					loadThread(op, 5, null);
					op = null;
				};
			}
			aProto.splice.apply(Posts, [Posts.indexOf(op), pCnt].concat(nEls));
			thr.pCount = len + 1;
			closeAlert($id('de-alert-load-thr'));
		}
		$focus(op);
		if(Fn) {
			Fn();
		}
		last = Fn = null;
	});
}

function loadFavorThread() {
	var el = this.parentNode.parentNode,
		ifrm = $t('iframe', el),
		tNum = el.getAttribute('info').split(';')[2],
		cont = $c('de-content', doc);
	$del($id('de-fav-wait'));
	if(ifrm) {
		$del(ifrm);
		cont.style.overflowY = 'auto';
		return;
	}
	if((tNum = pByNum[tNum]) && !tNum.hide) {
		$focus(tNum);
		return;
	}
	$del($id('de-iframe-fav'));
	$c('de-content', doc).style.overflowY = 'scroll';
	$append(el, [
		$add('<iframe name="de-iframe-fav" id="de-iframe-fav" src="' + $t('a', el).href +
			'" scrolling="no" style="border: none; width: ' +
			(doc.body.clientWidth - 55) + 'px; height: 1px;" />'),
		$add('<div id="de-fav-wait" class="de-wait" style="font-size: 1.1em; text-align: center">' +
			Lng.loading[lang] + '</div>')
	]);
}

function loadPage(page, i, Fn) {
	ajaxGetPosts(getPageUrl(aib.host, brd, i), null, null, false, function(df, dc, err) {
		var el;
		df = doc.importNode($q(aib.qDForm, dc), true);
		while(el = df.firstChild) {
			page.appendChild(el);
		}
		Fn(replacePost(page), i);
		Fn = page = i = null;
	});
}

function loadPages(len) {
	$alert(Lng.loading[lang], 'load-pages', true);
	if(Cfg['preLoadImgs']) {
		$each($Q('a[href^="blob:"]', dForm), function(a) {
			window.URL.revokeObjectURL(a.href);
		});
	}
	var i = -1,
		page = dForm,
		pages = new Array(len),
		loaded = 1;
	dForm.innerHTML = '';
	Posts = [];
	Pviews.ajaxed = {};
	while(++i < len) {
		if(len > 1) {
			page = $new('div', {'id': 'de-page' + i}, null);
			$append(dForm, [
				$new('center', {'text': i + ' ' + Lng.page[lang], 'style': 'font-size: 2em;'}, null),
				doc.createElement('hr'),
				page
			]);
		}
		loadPage(page, i, function(page, idx) {
			pages[idx] = page;
			if(loaded === len) {
				pages.forEach(function(page) {
					tryToParse(page);
					removePageTrash(page);
				});
				Posts.forEach(addPostButtons);
				Posts.forEach(eventPostImg);
				Posts.forEach(expandPost);
				addLinkMP3(null);
				addLinkTube(null);
				addLinkImg(dForm);
				addImgSearch(dForm);
				genRefMap(pByNum);
				eventRefLink(dForm);
				readPostsVisib();
				setPostsVisib();
				if(isExpImg) {
					Posts.forEach(function(post) {
						expandAllPostImg(post, null);
					});
				}
				closeAlert($id('de-alert-load-pages'));
				window.postMessage('Kall', '*');
				loaded = pages = null;
			} else {
				loaded++;
			}
		});
	}
}

/*-------------------------------Threads updater------------------------------*/

function setUpdButtonState(state) {
	if(TNum && Cfg['updThread'] !== 3) {
		$q('a[id^="de-btn-upd"]', doc).id = 'de-btn-upd-' + state;
	}
}

function endPostsUpdate() {
	setUpdButtonState('off');
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
	if(Favico.focused) {
		Audio.running = false;
	} else {
		Audio.el.play()
		setTimeout(audioNotification, Audio.repeat);
		Audio.running = true;
	}
}

function desktopNotification(i) {
	if(window.webkitNotifications.checkPermission() !== 0) {
		return;
	}
	var notif = window.webkitNotifications.createNotification(
			'/favicon.ico', docTitle, Lng.unreadMsg[lang].replace(/%m/g, i)
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

function infoNewPosts(err, i) {
	if(err) {
		if(err !== Lng.noConnect[lang]) {
			$alert(Lng.thrNotFound[lang] + TNum + '): \n' + err, 'newposts', false);
			doc.title = '{' + err.match(/(?:\[)(\d+)(?:\])/)[1] + '} ' + doc.title;
			endPostsUpdate();
		} else {
			$alert(Lng.noConnect[lang], 'newposts', false);
			setUpdButtonState('warn');
		}
		return;
	}
	closeAlert($id('de-alert-newposts'));
	if(Cfg['updThread'] === 3) {
		return;
	}
	setUpdButtonState('on');
	if(Cfg['updThread'] === 1) {
		if(Favico.focused) {
			return;
		}
		i += +(doc.title.match(/^\[(\d+)\]/) || [, 0])[1];
	}
	if(Cfg['favIcoBlink'] && Favico.href) {
		clearInterval(Favico.delay);
		if(i > 0) {
			Favico.delay = setInterval(function() {
				var href = $xb('.//link[@href="' + Favico.href + '"]', doc.head) ? 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII=' : Favico.href;
				$each($Q('link[rel="shortcut icon"]', doc.head), $del);
				doc.head.appendChild($new('link', {'href': href, 'rel': 'shortcut icon'}, null));
			}, 800);
		}
	}
	doc.title = (i > 0 ? ' [' + i + '] ' : '') + docTitle;
	if(nav.WebKit && Cfg['desktNotif'] && i > 0) {
		desktopNotification(i);
	}
	if(Audio.enabled && !Audio.running && i > 0) {
		if(Audio.repeat) {
			audioNotification();
		} else {
			Audio.el.play()
		}
	}
}

function setHanaRating() {
	$event($q('input[type="button"]', doc), {'click': function() {
		setCookie('de-rating', $id('rating').value, 1e12);
	}});
}

function getHanaFile(file, id) {
	var name, src = file['src'],
		thumb = file['thumb'],
		thumbW = file['thumb_width'],
		thumbH = file['thumb_height'],
		size = file['size'],
		rating = file['rating'],
		maxRating = getCookie('de-rating') || 'r-15',
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
	return $add('<div class="file"><div class="fileinfo">Файл: <a href="/' + src + '" target="_blank">'
		+ name + '</a><br /><em>' + file['thumb'].substring(file['thumb'].lastIndexOf('.') + 1) + ', ' + (
			size < kb ? size + ' B'
			: size < mb ? (size / kb).toFixed(2) + ' KB'
			: size < gb ? (size / mb).toFixed(2) + ' MB'
			: (size / gb).toFixed(2) + ' GB'
		) + ', ' + file['metadata']['width'] + 'x' + file['metadata']['height'] +
		'</em><br /><a class="edit_ icon" href="/utils/image/edit/' + file['file_id'] + '/' + id +
		'"><img title="edit" alt="edit" src="/images/blank.png" /></a></div><a href="/' + src +
		'" target="_blank"><img class="thumb" src="/' + thumb + '" width="' + thumbW + '" height="' +
		thumbH + '" /></a></div>');
}

function getHanaPost(postJson) {
	var i, id = postJson['display_id'],
		files = postJson['files'],
		len = files.length,
		post = $new('td', {'id': 'reply' + id, 'class': 'reply', 'de-post': id}, null);
	post.innerHTML = '<a name="i' + id + '"></a><label><a class="delete icon"><input type="checkbox" id="delbox_' +
		id + '" class="delete_checkbox" value="' + postJson['post_id'] + '" id="' + id +
		'" /></a><span class="postername">' + postJson['name'] + '</span> ' + aib.hDTFix.fix(postJson['date']) +
		' </label><span class="reflink"><a onclick="Highlight(0, ' + id + ')" href="/' + brd +
		'/res/' + TNum + '.xhtml#i' + id + '">No.' + id + '</a></span><br />';
	for(i = 0; i < len; i++) {
		post.appendChild(getHanaFile(files[i], postJson['post_id']));
	}
	$append(post, [
		$if(len > 1, $new('div', {'style': 'clear: both;'}, null)),
		$add('<div class="postbody">' + postJson['message_html'] + '</div>'),
		$new('div', {'class': 'abbrev'}, null)
	]);
	return post;
}

function checkBan(el, node) {
	if(aib.qBan && !el.isBan) {
		var isBan = $q(aib.qBan, node);
		if(isBan) {
			if(!$q(aib.qBan, el)) {
				el.msg.appendChild(doc.importNode(isBan, true));
			}
			el.isBan = true;
		}
	}
}

function markDel(post) {
	if(!post.deleted) {
		var dd = sessionStorage['de-deleted'];
		sessionStorage['de-deleted'] = (dd ? dd + ',' : '') + post.count;
		post.deleted = true;
		nav.remClass(post.btns, 'de-ppanel-cnt');
		nav.addClass(post.btns, 'de-ppanel-del');
	}
}

function loadNewPosts(isInfo, Fn) {
	if(isInfo) {
		$alert(Lng.loading[lang], 'newposts', true);
	}
	if(aib.hana) {
		getJsonPosts(
			'//dobrochan.ru/api/thread/' + brd + '/' + TNum +
				'/new.json?message_html&new_format&last_post=' + Posts[Posts.length - 1].num,
			function(status, sText, json) {
				if(status !== 200 || json['error']) {
					infoNewPosts(status === 0 ? Lng.noConnect[lang] : (sText || json['message']), null);
				} else {
					var i, len, post,
						np = 0,
						el = (json['result'] || {})['posts'],
						thr = $c('de-thread', dForm);
					if(el && el.length > 0) {
						for(i = 0, len = el.length; i < len; i++) {
							post = replacePost(getHanaPost(el[i]));
							np += newPost(thr, post, el[i]['display_id'], thr.pCount + i);
							Posts.push(post);
						}
						thr.pCount += el.length;
					}
					infoNewPosts(null, np);
				}
				if(Fn) {
					Fn();
				}
				Fn = null;
			}
		);
		return;
	}
	ajaxGetPosts(null, brd, TNum, true, function(els, op, err) {
		if(err) {
			infoNewPosts(err, null);
			if(Fn) {
				Fn();
			}
			Fn = null;
			return;
		}
		var i, j, el, el_, pNum, np = 0,
			len = Posts.length,
			len_ = els.length,
			thr = $c('de-thread', dForm);
		checkBan(Posts[0], op);
		for(i = 1, j = 0; i < len || j < len_; i++, j++) {
			el = Posts[i];
			el_ = els[j];
			if(!el_) {
				markDel(el);
				continue;
			}
			pNum = aib.getPNum(el_);
			if(el) {
				if(el.num !== pNum) {
					markDel(el);
					j--;
					continue;
				}
				checkBan(el, el_);
			} else {
				np += newPost(thr, el = importPost(el_), pNum, i);
				Posts.push(el);
			}
		}
		infoNewPosts(err, np);
		thr.pCount = len;
		savePostsVisib();
		$id('de-panel-info').firstChild.textContent = i + '/' + getPostImages(dForm).length;
		if(Fn) {
			Fn();
		}
		Fn = null;
	});
}

function initThreadsUpdater() {
	if(Cfg['updThread'] === 1) {
		ajaxInterval = setInterval(function() {
			loadNewPosts(false, null);
		}, Cfg['updThrDelay']*1e3);
	} else if(Cfg['updThread'] === 2) {
		ajaxInterval = setInterval(function() {
			if(aib.hana) {
				getJsonPosts(
					'//dobrochan.ru/api/thread/' + brd + '/' + TNum + '.json?new_format',
					function(status, sText, json) {
						if(status !== 200 || json['error']) {
							infoNewPosts(status === 0 ? Lng.noConnect[lang] : (sText || json['message']), null);
						} else {
							infoNewPosts(null, json['result']['posts_count'] - Posts.length);
						}
					}
				);
			} else {
				ajaxGetPosts(null, brd, TNum, true, function(els, op, err) {
					infoNewPosts(err, els.length - Posts.length + 1);
				});
			}
		}, Cfg['updThrDelay']*1e3);
	}
}


/*==============================================================================
								POSTS/THREADS HIDERS
==============================================================================*/

function hideByRef(post) {
	if(!Cfg['hideRefPsts'] || !post.ref) {
		return;
	}
	post.ref.forEach(function(pNum) {
		var pst = pByNum[pNum];
		if(pst && !uVis[pNum]) {
			doHidePost(pst, 'reference to >>' + post.num);
		}
	});
	post = null;
}

function unhideByRef(post) {
	if(!Cfg['hideRefPsts'] || !post.ref) {
		return;
	}
	post.ref.forEach(function(pNum) {
		var pst = pByNum[pNum];
		if(pst && !uVis[pNum]) {
			if(sVis[pst.count] !== 0) {
				setPostVisib(pst, false, null);
			}
			unhideByRef(pst);
		}
	});
}

function doPostFilters(post) {
	if(!Cfg['filterThrds'] && post.isOp) {
		sVis[post.count] = 1;
		return;
	}
	var note = detectWipeText(getText(post)) || (Cfg['hideBySpell'] && checkSpells(post));
	if(note) {
		sVis[post.count] = 0;
		doHidePost(post, note);
	} else {
		sVis[post.count] = 1;
	}
}

function setPostsVisib() {
	for(var post, pNum, vis, i = Posts.length - 1; i >= 0; i--) {
		vis = sVis[i];
		post = Posts[i];
		if(uVis[pNum = post.num]) {
			if(post.isOp && !(hThrds[brd] && hThrds[brd][pNum] !== undefined)) {
				delete uVis[pNum];
				setStored('DESU_Posts_' + aib.dm + '_' + brd, JSON.stringify(uVis));
			} else {
				if(uVis[pNum][0] === 0) {
					setUserPostVisib(post, true);
				} else {
					post.btns.firstChild.className = 'de-btn-lock';
				}
			}
			if(vis === undefined) {
				sVis[i] = detectWipeText(getText(post)) || (Cfg['hideBySpell'] && checkSpells(post)) ? 0 : 1;
			}
			continue;
		}
		if(post.isOp) {
			if(hThrds[brd] && hThrds[brd][pNum] !== undefined) {
				sVis[i] = vis = '0';
			} else if(vis === '0') {
				vis = null;
			}
		}
		if(vis === '0') {
			doHidePost(post, null);
		} else if(vis !== '1') {
			doPostFilters(post);
		}
	}
}

function togglePostVisib(post) {
	setUserPostVisib(post, !post.hide);
	saveUserPostsVisib();
}

function togglePostContent(post, hide) {
	if(hide) {
		nav.addClass(post, 'de-post-hid');
	} else {
		nav.remClass(post, 'de-post-hid');
	}
}

function addPostNote(post, note) {
	if(note) {
		post.btns.appendChild($new('a', {
			'class': 'de-post-note de-abtn',
			'text': ' autohide: ' + note + ' ',
			'href': '#'}, {
			'click': function(e) {
				$pd(e);
				$del(this);
			}
		}));
	}
}

function setPostVisib(post, hide, note) {
	var el, pNum, thr = post.thr;
	togglePostContent(post, post.hide = hide);
	if(post.isOp) {
		thr.style.display = hide ? 'none' : '';
		thr.hide = hide;
		el = $id('de-thr-hid-' + (pNum = post.num));
		if(!hide && el) {
			$del(el);
			toggleHiddenThread(post, 1);
		}
		if(hide && !el) {
			el = $add('<div class="' + aib.cReply + ' de-thr-hid" id="de-thr-hid-' + pNum + '">' +
				Lng.hiddenThrd[lang] + ' <a href="#">№' + pNum + '</a><i> (' + (
					note ? 'autohide: ' + note : post.tTitle.replace(/</g, '&lt;').replace(/>/g, '&gt;')
				) + ')</i></div>');
			$t('a', el).onclick = function(e) {
				$pd(e);
				togglePostVisib(post);
			};
			$before(thr, el);
			toggleHiddenThread(post, 0);
		}
		return;
	}
	if(Cfg['delHiddPost']) {
		aib.getWrap(post).style.display = hide ? 'none' : '';
	} else {
		if(el = $c('de-post-note', post)) {
			if(!hide) {
				$del(el);
			} else if(note) {
				el.innerText = ' autohide: ' + note + ' ';
			}
		} else if(hide) {
			addPostNote(post, note);
		}
		el = $q(aib.qRef, post);
		el.onmouseover = hide && function() {
			togglePostContent(getPost(this), false);
		};
		el.onmouseout = hide && function() {
			togglePostContent(getPost(this), true);
		};
	}
	if(Cfg['strikeHidd']) {
		setTimeout($each, 0, $Q('a[href*="#' + post.num + '"]', dForm), function(el) {
			el.className = hide && 'de-ref-hid';
		});
	}
}

function doHidePost(post, note) {
	setPostVisib(post, true, note);
	hideByRef(post);
}

function hidePost(post, note) {
	if(post.noHide || uVis[post.num]) {
		return;
	}
	if(post.hide) {
		$del($c('de-post-note', post));
		addPostNote(post, note);
	} else {
		sVis[post.count] = 0;
		doHidePost(post, note);
	}
}

function unhidePost(post) {
	if(uVis[post.num]) {
		return;
	}
	var wn = detectWipeText(getText(post));
	if(wn) {
		hidePost(post, wn);
	} else {
		sVis[post.count] = 1;
		setPostVisib(post, false, null);
		unhideByRef(post);
		$del($c('de-post-note', post));
	}
}

function setUserPostVisib(post, hide) {
	var pNum = post.num;
	setPostVisib(post, hide, null);
	post.btns.firstChild.className = 'de-btn-lock';
	if(hide) {
		hideByRef(post);
	} else {
		unhideByRef(post);
	}
	if(!uVis[pNum]) {
		uVis[pNum] = new Array(2);
	}
	uVis[pNum][0] = +!hide;
	uVis[pNum][1] = Date.now();
}

/*--------------------------Hide posts with similar text----------------------*/

function getWrds(text) {
	return text.replace(/\s+/g, ' ').replace(/[^a-zа-яё ]/ig, '').substring(0, 800).split(' ');
}

function findSameText(post, oNum, oHid, oWords) {
	var j, words = getWrds(getText(post)),
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
	$del($c('de-post-note',  post));
	if(oHid) {
		if(sVis[post.count] !== 0) {
			setPostVisib(post, false, null);
		}
		if(uVis[i = post.num]) {
			delete uVis[i];
		}
	} else {
		setUserPostVisib(post, true);
		addPostNote(post, 'similar to >>' + oNum);
	}
}

function hideBySameText(post) {
	var wrds, hid, num, text = getText(post);
	if(text) {
		wrds = getWrds(text);
		num = post.num;
		hid = post.hide;
		Posts.forEach(function(target) {
			findSameText(target, num, hid, wrds);
		});
		saveUserPostsVisib();
	} else {
		addSpell('#notxt');
	}
	hid = num = wrds = null;
}

/*-------------------------Hide posts with similar images---------------------*/

function genImgHash(data, oldw, oldh) {
	var i, j, l, c, t, u, g, tmp = oldw * oldh,
		newh = 8,
		neww = 8,
		levels = 3,
		areas = 256 / levels,
		values = 256 / (levels - 1),
		hash = 0;
	for(i = 0, j = 0; i < tmp; i++, j += 4) {
		data[i] = data[j] * 0.3 + data[j + 1] * 0.59 + data[j + 2] * 0.11;
	}
	for(i = 0; i < newh; i++) {
		for(j = 0; j < neww; j++) {
			tmp = i / (newh - 1) * (oldh - 1);
			l = Math.min(tmp | 0, oldh - 2);
			u = tmp - l;
			tmp = j / (neww - 1) * (oldw - 1);
			c = Math.min(tmp | 0, oldw - 2);
			t = tmp - c;
			hash = (hash << 4) + Math.min(values * (((data[l * oldw + c] * ((1 - t) * (1 - u)) +
				data[l * oldw + c + 1] * (t * (1 - u)) +
				data[(l + 1) * oldw + c + 1] * (t * u) +
				data[(l + 1) * oldw + c] * ((1 - t) * u)) / areas) | 0), 255);
			if(g = hash & 0xF0000000) {
				hash ^= g >>> 24;
			}
			hash &= ~g;
		}
	}
	return hash;
}

function getImgHash(post) {
	var w, h, cnv, ctx, img = post.img[0];
	if(img.hash) {
		return img.hash;
	}
	cnv = $id('de-canvas') || doc.body.appendChild($new('canvas', {
		'id': 'de-canvas',
		'style': 'display: none;'
	}, null));
	w = cnv.width = img.width;
	h = cnv.height = img.height;
	ctx = cnv.getContext('2d');
	ctx.drawImage(img, 0, 0);
	return img.hash = genImgHash(ctx.getImageData(0, 0, w, h).data, w, h);
}

/*==============================================================================
								SPELLS AND EXPRESSIONS
==============================================================================*/

function getSpellObj() {
	return {
		words: [], exp: [], exph: [], ihash: [], img: [], imgn: [], name: [], theme: [], tmax: [],
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
			if(TNum) {
				continue;
			} else {
				Spells = tSpells;
				x = x.substr(4);
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
				if(!p[j].contains('-')) {
					p[j] += '-' + p[j];
				}
				t === '#num' ? oSpells.num.push(p[j]) : oSpells.skip.push(p[j]);
			}
		}
		t === '#rep' ? oSpells.rep.push(p) :
		t === '#exp' ? Spells.exp.push($toRegExp(p)) :
		t === '#exph' ? Spells.exph.push($toRegExp(p)) :
		t === '#ihash' ? Spells.ihash.push(+p) :
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
		t === '#video' && oSpells.video.push(p);
	}
}

function replaceBySpells(arr, txt) {
	var re, i = arr.length;
	while(i--) {
		re = $toRegExp(arr[i]);
		txt = txt.replace(re, arr[i].substr(re.toString().length + 1));
	}
	return txt;
}

function getImgSpell(imgW, imgH, imgK, exp) {
	if(!exp) {
		return false;
	}
	var x, expW, expH, s = exp.split('@'),
		stat = s[0][0],
		expK = s[0].substr(1).split('-');
	if(!expK[1]) {
		expK[1] = expK[0];
	}
	if(expK[0]) {
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
	var inf, i, t, _t, pTitle, pText, pName, pTrip, imgW, imgH, imgK;
	post.noHide = false;
	if(oSpells.skip[0] && TNum) {
		inf = post.count + 1;
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
	pText = getText(post);
	if(x.words[0]) {
		for(i = 0, inf = pText.toLowerCase(); t = x.words[i++];) {
			_t = t;
			t = t.toLowerCase();
			if(inf.contains(t) || pTitle.contains(t)) {
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
		for(i = 0, inf = pText; t = x.exp[i++];) {
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
			if(t[0] && pName.contains(t[0]) || t[1] && pTrip.contains(t[1])) {
				return '#name ' + _t;
			}
		}
	}
	if(post.img.length > 0) {
		if(x.ihash[0]) {
			for(i = 0, inf = getImgHash(post); t = x.ihash[i++];) {
				if(t === inf) {
					return '#ihash ' + t;
				}
			}
		}
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
			inf = $c(aib.cFileInfo, post);
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
		for(i = 0, inf = post.count + 1; t = oSpells.num[i++];) {
			_t = t;
			t = t.split('-');
			if(inf >= +t[0] && inf <= +t[1]) {
				return '#num ' + _t;
			}
		}
	}
	if(x.tmax[0]) {
		for(i = 0, inf = pText.replace(/\n/g, '').length; t = x.tmax[i++];) {
			if(inf >= t) {
				return '#tmax ' + t;
			}
		}
	}
	if(x.sage && post.sage) {
		return '#sage';
	}
	if(x.notxt && !pText) {
		return '#no text';
	}
	if(x.noimg && post.img.length === 0) {
		return '#no image';
	}
	return false;
}

function checkSpells(post) {
	return !TNum && post.isOp ?
		getSpells(tSpells, post) || getSpells(pSpells, post) : getSpells(pSpells, post);
}

function hideBySpells(post) {
	if(!Cfg['filterThrds'] && post.isOp) {
		return;
	}
	var exp = checkSpells(post);
	if(exp) {
		hidePost(post, exp.substring(0, 70));
	} else if(post.hide && post.noHide) {
		unhidePost(post);
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

function disableSpells() {
	Posts.forEach(function(post) {
		if(post.ytHide === true) {
			unhidePost(post);
			post.ytHide = false;
		} else if(checkSpells(post)) {
			unhidePost(post);
		}
	});
}

function toggleSpells() {
	var fld = $id('de-spell-edit'),
		val = fld.value = fld.value.replace(/[\r\n]+/g, '\n').replace(/^\n|\n$/g, ''),
		err = verifyRegExp(val);
	if(err || !val) {
		if(val) {
			$alert(Lng.error[lang] + ' ' + err, 'err-spell', false);
		} else {
			disableSpells();
			savePostsVisib();
			saveSpells('');
		}
		$q('input[info="hideBySpell"]', doc).checked = false;
		saveCfg('hideBySpell', 0);
	} else {
		disableSpells();
		saveSpells(val);
		if(Cfg['hideBySpell']) {
			Posts.forEach(hideBySpells);
			hideByTube();
		}
		savePostsVisib();
	}
}

function addSpell(spell) {
	var err, fld = $id('de-spell-edit'),
		val = fld && fld.value.replace(/[\r\n]+/g, '\n').replace(/^\n|\n$/g, '');
	if(!val) {
		if(!spellsList) {
			readSpells();
		}
		val = spellsList.join('\n');
	} else if(err = verifyRegExp(val)) {
		$alert(Lng.error[lang] + ' ' + err, 'err-spell', false);
		return;
	}
	if(('\n' + val).contains('\n' + spell)) {
		val = ('\n' + val).split('\n' + spell).join('').replace(/^\n|\n$/g, '');
	} else {
		val = !val ? spell : val + '\n' + spell;
	}
	if(fld) {
		fld.value = val;
		fld.previousSibling.firstChild.checked = !!val;
	}
	disableSpells();
	saveSpells(val);
	if(val) {
		saveCfg('hideBySpell', 1);
		Posts.forEach(hideBySpells);
		hideByTube();
	} else {
		saveCfg('hideBySpell', 0);
	}
	savePostsVisib();
}


/*==============================================================================
									WIPE DETECTORS
==============================================================================*/

function detectWipeText(txt) {
	if(!Cfg['hideByWipe']) {
		return false;
	}
	var arr, len, i, j, n, x, keys, pop, capsw, casew, _txt;
	if(Cfg['wipeSameLin']) {
		arr = txt.replace(/>/g, '').split(/\s*\n\s*/);
		if((len = arr.length) > 5) {
			arr.sort();
			for(i = 0, n = len / 4; i < len;) {
				x = arr[i];
				j = 0;
				while(arr[i++] === x) {
					j++;
				}
				if(j > 4 && j > n && x) {
					return 'same lines: "' + x.substr(0, 20) + '" x' + j;
				}
			}
		}
	}
	if(Cfg['wipeSameWrd']) {
		arr = txt.replace(/[\s\.\?\!,>]+/g, ' ').toUpperCase().split(' ');
		if((len = arr.length) > 3) {
			arr.sort();
			for(i = 0, n = len / 4, keys = 0, pop = 0; i < len; keys++) {
				x = arr[i];
				j = 0;
				while(arr[i++] === x) {
					j++;
				}
				if(len > 25) {
					if(j > pop && x.length > 2) {
						pop = j;
					}
					if(pop >= n) {
						return 'same words: "' + x.substr(0, 20) + '" x' + pop;
					}
				}
			}
			x = keys / len;
			if(x < 0.25) {
				return 'uniq words: ' + (x * 100).toFixed(0) + '%';
			}
		}
	}
	if(Cfg['wipeLongWrd']) {
		arr = txt.replace(/https*:\/\/.*?(\s|$)/g, '').replace(/[\s\.\?!,>:;-]+/g, ' ').split(' ');
		if(arr[0].length > 50 || ((len = arr.length) > 1 && arr.join('').length / len > 10)) {
			return 'long words';
		}
	}
	if(Cfg['wipeCAPS']) {
		arr = txt.replace(/[\s\.\?!;,-]+/g, ' ').trim().split(' ');
		if((len = arr.length) > 4) {
			for(i = 0, n = 0, capsw = 0, casew = 0; i < len; i++) {
				x = arr[i];
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
			if(capsw / n >= 0.3 && n > 4) {
				return 'CAPSLOCK: ' + capsw / arr.length * 100 + '%';
			} else if(casew / n >= 0.3 && n > 8) {
				return 'cAsE words: ' + casew / arr.length * 100 + '%';
			}
		}
	}
	if(Cfg['wipeSpecial']) {
		_txt = txt.replace(/\s+/g, '');
		if((len = _txt.length) > 30 &&
			(x = _txt.replace(/[0-9a-zа-я\.\?!,]/ig, '').length / len) > 0.4)
		{
			return 'specsymbols: ' + Math.round(x * 100) + '%';
		}
	}
	if(Cfg['wipeNumbers']) {
		_txt = txt.replace(/\s+/g, ' ').replace(/>>\d+|https*:\/\/.*?(?: |$)/g, '');
		if((len = _txt.length) > 30 && (x = (len - _txt.replace(/\d/g, '').length) / len) > 0.4) {
			return 'numbers: ' + Math.round(x * 100) + '%';
		}
	}
	return false;
}


/*==============================================================================
									SCRIPT CSS
==============================================================================*/

function getThemeLang() {
	return !Cfg['scriptStyle'] ? 'fr' :
		Cfg['scriptStyle'] === 1 ? 'en' :
		'de';
}

function scriptCSS() {
	$disp(dForm);
	var p, x = '',
		gif = function(id, src) {
			x += id + ' { background: url(data:image/gif;base64,' + src + ') no-repeat center !important; }';
		},
		cont = function(id, src) {
			x += id + ':before { content: ""; padding: 0 16px 0 0; margin: 0 4px; background: url(' + src + ') no-repeat center; }';
		};

	// Settings window
	x += '#de-content-cfg > div { float: left; border-radius: 10px 10px 0 0; width: auto; min-width: 0; padding: 0; margin: 5px 20px; overflow: hidden; }\
		#de-cfg-info > span { display: inline-block; vertical-align: top; }\
		#de-cfg-head { padding: 4px; border-radius: 10px 10px 0 0; color: #fff; text-align: center; font: bold 14px arial; cursor: default; }\
		#de-cfg-head:lang(en), #de-panel:lang(en) { background: linear-gradient(to bottom, #4b90df, #3d77be 5px, #376cb0 7px, #295591 13px, rgba(0,0,0,0) 13px), linear-gradient(to bottom, rgba(0,0,0,0) 12px, #183d77 13px, #1f4485 18px, #264c90 20px, #325f9e 25px); }\
		#de-cfg-head:lang(de), #de-panel:lang(de) { background: #777; }\
		#de-cfg-head:lang(fr), #de-panel:lang(fr) { background: linear-gradient(to bottom, #7b849b, #616b86 2px, #3a414f 13px, rgba(0,0,0,0) 13px), linear-gradient(to bottom, rgba(0,0,0,0) 12px, #121212 13px, #1f2740 25px); }\
		.de-cfg-body { width: 371px; min-height: 347px; padding: 11px 7px 7px; margin-top: -1px; font: 13px sans-serif; }\
		.de-cfg-body input[type="text"] { width: auto; }\
		.de-cfg-body input[value=">"] { width: 20px; }\
		.de-blockinp { display: block; }\
		.de-cfg-body, #de-cfg-btns { border: 1px solid #183d77; border-top: none; }\
		.de-cfg-body:lang(de), #de-cfg-btns:lang(de) { border-color: #444; }\
		#de-cfg-btns { padding: 7px 2px 2px; }\
		#de-cfg-bar { height: 25px; width: 100%; display: table; background-color: #1f2740; margin: 0; padding: 0; }\
		#de-cfg-bar:lang(en) { background-color: #325f9e; }\
		#de-cfg-bar:lang(de) { background-color: #777; }\
		.de-cfg-tab { padding: 4px 6px; border-radius: 4px 4px 0 0; font: bold 14px arial; text-align: center; cursor: default; }\
		.de-cfg-tab-back { display: table-cell !important; float: none !important; min-width: 0; padding: 0 !important; box-shadow: none !important; border: 1px solid #183d77 !important; border-radius: 4px 4px 0 0; opacity: 1; }\
		.de-cfg-tab-back:lang(de) { border-color: #444 !important; }\
		.de-cfg-tab-back:lang(fr) { border-color: #121421 !important; }\
		.de-cfg-tab-back[selected="true"] { border-bottom: none !important; }\
		.de-cfg-tab-back[selected="false"] > .de-cfg-tab { background-color: rgba(0,0,0,.2); }\
		.de-cfg-tab-back[selected="false"] > .de-cfg-tab:lang(en), .de-cfg-tab-back[selected="false"] > .de-cfg-tab:lang(fr) { background: linear-gradient(to bottom, rgba(132,132,132,.35) 0%, rgba(79,79,79,.35) 50%, rgba(40,40,40,.35) 50%, rgba(80,80,80,.35) 100%) !important; }\
		.de-cfg-tab-back[selected="false"] > .de-cfg-tab:hover { background-color: rgba(99,99,99,.2); }\
		.de-cfg-tab-back[selected="false"] > .de-cfg-tab:hover:lang(en), .de-cfg-tab-back[selected="false"] > .de-cfg-tab:hover:lang(fr)  { background: linear-gradient(to top, rgba(132,132,132,.35) 0%, rgba(79,79,79,.35) 50%, rgba(40,40,40,.35) 50%, rgba(80,80,80,.35) 100%) !important; }\
		.de-cfg-tab::' + (nav.Firefox ? '-moz-' : '') + 'selection { background: transparent; }\
		#de-spell-panel { float: right; }\
		#de-spell-panel > a { padding: 0 7px; text-align: center; }\
		#de-cfg-wipe { display: table; padding-left: 25px; }\
		#de-cfg-wipe > div { display: table-row; }\
		#de-cfg-wipe > div > label { display: table-cell; }\
		.de-cfg-unvis { display: none; }';

	// Main panel
	x += '#de-btn-logo { margin-right: 3px; }\
		#de-panel { height: 25px; z-index: 9999; border-radius: 15px 0 0 0; cursor: default;}\
		#de-panel-btns { display: inline-block; padding: 0 2px; margin: 0; height: 25px; border-left: 1px solid #8fbbed; }\
		#de-panel-btns:lang(de), #de-panel-info:lang(de) { border-color: #ccc; }\
		#de-panel-btns:lang(fr), #de-panel-info:lang(fr) { border-color: #616b86; }\
		#de-panel-btns > li { margin: 0 1px; padding: 0; }\
		#de-panel-btns > li, #de-panel-btns > li > a, #de-btn-logo { display: inline-block; width: 25px; height: 25px; }\
		#de-panel-btns:lang(en) > li, #de-panel-btns:lang(fr) > li  { transition: all 0.3s ease; }\
		#de-panel-btns:lang(en) > li:hover, #de-panel-btns:lang(fr) > li:hover { background-color: rgba(255,255,255,.15); box-shadow: 0 0 3px rgba(143,187,237,.5); }\
		#de-panel-btns:lang(de) > li > a { border-radius: 5px; }\
		#de-panel-btns:lang(de) > li > a:hover { width: 21px; height: 21px; border: 2px solid #444; }\
		#de-panel-info { display: inline-block; vertical-align: top; padding: 0 6px; height: 25px; border-left: 1px solid #8fbbed; color: #fff; font: 18px serif; }';
	p = 'R0lGODlhGQAZAIAAAPDw8P///yH5BAEAAAEALAAAAAAZABkAQA';
	gif('#de-btn-logo', p + 'I5jI+pywEPWoIIRomz3tN6K30ixZXM+HCgtjpk1rbmTNc0erHvLOt4vvj1KqnD8FQ0HIPCpbIJtB0KADs=');
	gif('#de-btn-settings', p + 'JAjI+pa+API0Mv1Ymz3hYuiQHHFYjcOZmlM3Jkw4aeAn7R/aL6zuu5VpH8aMJaKtZR2ZBEZnMJLM5kIqnP2csUAAA7');
	gif('#de-btn-hidden', p + 'I5jI+pa+CeHmRHgmCp3rxvO3WhMnomUqIXl2UmuLJSNJ/2jed4Tad96JLBbsEXLPbhFRc8lU8HTRQAADs=');
	gif('#de-btn-favor', p + 'IzjI+py+AMjZs02ovzobzb1wDaeIkkwp3dpLEoeMbynJmzG6fYysNh3+IFWbqPb3OkKRUFADs=');
	gif('#de-btn-refresh', p + 'JAjI+pe+AfHmRGLkuz3rzN+1HS2JWbhWlpVIXJ+roxSpr2jedOBIu0rKjxhEFgawcCqJBFZlPJIA6d0ZH01MtRCgA7');
	gif('#de-btn-goback', p + 'IrjI+pmwAMm4u02gud3lzjD4biJgbd6VVPybbua61lGqIoY98ZPcvwD4QUAAA7');
	gif('#de-btn-gonext', p + 'IrjI+pywjQonuy2iuf3lzjD4Zis0Xd6YnQyLbua61tSqJnbXcqHVLwD0QUAAA7');
	gif('#de-btn-goup', p + 'IsjI+pm+DvmDRw2ouzrbq9DmKcBpVfN4ZpyLYuCbgmaK7iydpw1OqZf+O9LgUAOw==');
	gif('#de-btn-godown', p + 'ItjI+pu+DA4ps02osznrq9DnZceIxkYILUd7bue6WhrLInLdokHq96tnI5YJoCADs=');
	gif('#de-btn-newthr', p + 'IyjI+pG+APQYMsWsuy3rzeLy2g05XcGJqqgmJiS63yTHtgLaPTY8Np4uO9gj0YbqM7bgoAOw==');
	gif('#de-btn-expimg', p + 'I9jI+pGwDn4GPL2Wep3rxXFEFel42mBE6kcYXqFqYnVc72jTPtS/KNr5OJOJMdq4diAXWvS065NNVwseehAAA7');
	gif('#de-btn-maskimg', p + 'JQjI+pGwD3TGxtJgezrKz7DzLYRlKj4qTqmoYuysbtgk02ZCG1Rkk53gvafq+i8QiSxTozIY7IcZJOl9PNBx1de1Sdldeslq7dJ9gsUq6QnwIAOw==');
	if(aib.nul) {
		gif('#de-btn-catalog', p + 'I2jI+pa+DhAHyRNYpltbz7j1Rixo0aCaaJOZ2SxbIwKTMxqub6zuu32wP9WsHPcFMs0XDJ5qEAADs=');
	}
	gif('#de-btn-audio-off', p + 'I7jI+pq+DO1psvQHOj3rxTik1dCIzmSZqfmGXIWlkiB6L2jedhPqOfCitVYolgKcUwyoQuSe3WwzV1kQIAOw==');
	gif('#de-btn-audio-on', p + 'JHjI+pq+AewJHs2WdoZLz7X11WRkEgNoHqimadOG7uAqOm+Y6atvb+D0TgfjHS6RIp8YQ1pbHRfA4n0eSTI7JqP8Wtahr0FAAAOw==');
	p = 'Dw8P///wAAACH5BAEAAAIALAAAAAAZABkAQAJElI+pe2EBoxOTNYmr3bz7OwHiCDzQh6bq06QSCUhcZMCmNrfrzvf+XsF1MpjhCSainBg0AbKkFCJko6g0MSGyftwuowAAOw==';
	gif('#de-btn-upd-on', 'R0lGODlhGQAZAJEAADL/Mv' + p);
	gif('#de-btn-upd-off', 'R0lGODlhGQAZAJEAAP8yMv' + p);
	gif('#de-btn-upd-warn', 'R0lGODlhGQAZAJEAAP/0Qf' + p);

	// Post buttons
	x += '.de-ppanel, .de-ppanel-op { margin-left: 4px; }\
		.de-btn-hide, .de-btn-lock, .de-btn-rep, .de-btn-expthr, .de-btn-fav, .de-btn-fav-sel, .de-btn-sage, .de-btn-src { display: inline-block; margin: 0 4px -2px 0 !important; cursor: pointer; ';
	if(!Cfg['postBtnsTxt']) {
		x += 'padding: 0 14px 14px 0; }';
		p = 'R0lGODlhDgAOAKIAAPDw8KCgoICAgEtLS////wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA4AQAM';
		gif('.de-btn-hide', p + '8SLLcS2MNQGsUMYi6uB5BKI5hFgojel5YBbDDNcmvpJLkcgLq1jcuSgPmgkUmlJgFAyqNmoEBJEatxggJADs=');
		gif('.de-post-hid .de-btn-hide', p + '5SLLcS2ONCcCMIoYdRBVcN4Qkp4ULmWVV20ZTM1SYBJbqvXmA3jk8IMzlgtVYFtkoNCENIJdolJAAADs=');
		gif('.de-btn-lock', p + 'zSLLcS2MNQGsUMQRRq9CYJo5iRp6Y1FHXcGFuzJjnuIjOBzYr0LS9FnAlrJEGkJhSSUgAADs=');
		gif('.de-btn-rep', p + '4SLLcS2MNQGsUMQRRwdLbAI5kpn1kKHUWdk3AcDFmOqKcJ5AOq0srX0QWpBAlIo3MNoDInlAZIQEAOw==');
		gif('.de-btn-expthr', p + '7SLLcS6MNACKLIQjKgcjCkI2DOAbYuHlnKFHWUl5dnKpfm2vd7iyUXywEk1gmnYrMlEEyUZCSdFoiJAAAOw==');
		gif('.de-btn-fav', p + '5SLLcS2MNQGsUl1XgRvhg+EWhQAllNG0WplLXqqIlDS7lWZvsJkm92Au2Aqg8gQFyhBxAlNCokpAAADs=');
		gif('.de-btn-fav-sel', 'R0lGODlhDgAOAKIAAP/hAKCgoICAgEtLS////wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA4AQAM5SLLcS2MNQGsUl1XgRvhg+EWhQAllNG0WplLXqqIlDS7lWZvsJkm92Au2Aqg8gQFyhBxAlNCokpAAADs=');
		gif('.de-btn-sage', 'R0lGODlhDgAOAJEAAPDw8EtLS////wAAACH5BAEAAAIALAAAAAAOAA4AQAIZVI55duDvFIKy2vluoJfrD4Yi5lWRwmhCAQA7');
		gif('.de-btn-src', p + '9SLLcS0MMQMesUoQg6PKbtFnDaI0a53VAml2ARcVSFC0WY6ecyy+hFajnWDVssyQtB5NhTs1mYAAhWa2EBAA7');
	} else {
		x += 'color: ' + $getStyle($t('a', doc), 'color') + '; font-size:14px; }\
			.de-btn-hide:after { content: "×"; }\
			.de-post-hid .de-btn-hide:after { content: "+"; }\
			.de-btn-lock:after { content: "■"; }\
			.de-btn-rep:after { content: "R"; }\
			.de-btn-expthr:after { content: "E"; }\
			.de-btn-fav:after { content: "F"; }\
			.de-btn-fav-sel:after { content: "[F]"; }\
			.de-btn-sage:after { content: "Sage!"; }\
			.de-btn-src:after { content: "[Sauce]"; }';
	}

	// Search images buttons
	cont('.de-src-google', '//google.ru/favicon.ico');
	cont('.de-src-tineye', '//tineye.com/favicon.ico');
	cont('.de-src-iqdb', '//iqdb.org/favicon.ico');
	cont('.de-src-saucenao', '//saucenao.com/favicon.ico');

	// Posts counter
	if(TNum) x += '.de-thread { counter-reset: i 1; }\
		.de-ppanel.de-ppanel-cnt:after { counter-increment: i 1; content: counter(i, decimal); vertical-align: 1px; color: #4f7942; font: italic bold 13px serif; cursor: default; }\
		.de-ppanel-del:after { content: "' + Lng.deleted[lang] + '"; color: #727579; font: italic bold 13px serif; cursor: default; }';

	// text format buttons
	x += '#de-txt-panel { display: block; height: 23px; font-weight: bold; cursor: pointer; }\
		#de-txt-panel > span:empty { display: inline-block; width: 27px; height: 23px }\
		#de-txt-panel:lang(en) { display: none; }\
		#de-txt-panel:lang(ru) { float: right; }';
	p = 'R0lGODlhFwAWAJEAAPDw8GRkZAAAAP///yH5BAEAAAMALAAAAAAXABYAQAJ';
	gif('#de-btn-bold:empty', p + 'T3IKpq4YAoZgR0KqqnfzipIUikFWc6ZHBwbQtG4zyonW2Vkb2iYOo8Ps8ZLOV69gYEkU5yQ7YUzqhzmgsOLXWnlRIc9PleX06rnbJ/KITDqTLUAAAOw==');
	gif('#de-btn-italic:empty', p + 'K3IKpq4YAYxRCSmUhzTfx3z3c9iEHg6JnAJYYSFpvRlXcLNUg3srBmgr+RL0MzxILsYpGzyepfEIjR43t5kResUQmtdpKOIQpQwEAOw==');
	gif('#de-btn-under:empty', p + 'V3IKpq4YAoRARzAoV3hzoDnoJNlGSWSEHw7JrEHILiVp1NlZXtKe5XiptPrFh4NVKHh9FI5NX60WIJ6ATZoVeaVnf8xSU4r7NMRYcFk6pzYRD2TIUAAA7');
	gif('#de-btn-strike:empty', p + 'S3IKpq4YAoRBR0qqqnVeD7IUaKHIecjCqmgbiu3jcfCbAjOfTZ0fmVnu8YIHW6lgUDkOkCo7Z8+2AmCiVqHTSgi6pZlrN3nJQ8TISO4cdyJWhAAA7');
	gif('#de-btn-spoil:empty', 'R0lGODlhFwAWAJEAAPDw8GRkZP///wAAACH5BAEAAAIALAAAAAAXABYAQAJBlIKpq4YAmHwxwYtzVrprXk0LhBziGZiBx44hur4kTIGsZ99fSk+mjrMAd7XerEg7xnpLIVM5JMaiFxc14WBiBQUAOw==');
	gif('#de-btn-code:empty', p + 'O3IKpq4YAoZgR0KpqnFxokH2iFm7eGCEHw7JrgI6L2F1YotloKek6iIvJAq+WkfgQinjKVLBS45CePSXzt6RaTjHmNjpNNm9aq6p4XBgKADs=');
	gif('#de-btn-quote:empty', p + 'L3IKpq4YAYxRUSKguvRzkDkZfWFlicDCqmgYhuGjVO74zlnQlnL98uwqiHr5ODbDxHSE7Y490wxF90eUkepoysRxrMVaUJBzClaEAADs=');

	// Show/close animation
	if(nav.Anim) {
		x += '@keyframes de-open {\
				0% { transform: translateY(-1500px); }\
				40% { transform: translateY(30px); }\
				70% { transform: translateY(-10px); }\
				100% { transform: translateY(0); }\
			}\
			@keyframes de-close {\
				0% { transform: translateY(0); }\
				20% { transform: translateY(20px); }\
				100% { transform: translateY(-4000px); }\
			}\
			@keyframes de-blink {\
				0%, 100% { transform: translateX(0); }\
				10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }\
				20%, 40%, 60%, 80% { transform: translateX(10px); }\
			}\
			@keyframes de-cfg-open { from { transform: translate(0,50%) scaleY(0); opacity: 0; } }\
			@keyframes de-cfg-close { to { transform: translate(0,50%) scaleY(0); opacity: 0; } }\
			@keyframes de-post-open-tl { from { transform: translate(-50%,-50%) scale(0); opacity: 0; } }\
			@keyframes de-post-open-bl { from { transform: translate(-50%,50%) scale(0); opacity: 0; } }\
			@keyframes de-post-open-tr { from { transform: translate(50%,-50%) scale(0); opacity: 0; } }\
			@keyframes de-post-open-br { from { transform: translate(50%,50%) scale(0); opacity: 0; } }\
			@keyframes de-post-close-tl { to { transform: translate(-50%,-50%) scale(0); opacity: 0; } }\
			@keyframes de-post-close-bl { to { transform: translate(-50%,50%) scale(0); opacity: 0; } }\
			@keyframes de-post-close-tr { to { transform: translate(50%,-50%) scale(0); opacity: 0; } }\
			@keyframes de-post-close-br { to { transform: translate(50%,50%) scale(0); opacity: 0; } }\
			.de-pview-anim { animation-duration: .2s; animation-timing-function: ease-in-out; animation-fill-mode: both; }\
			.de-open { animation: de-open .7s ease-out both; }\
			.de-close { animation: de-close .7s ease-in both; }\
			.de-blink { animation: de-blink .7s ease-in-out both; }\
			.de-cfg-open { animation: de-cfg-open .2s ease-out backwards; }\
			.de-cfg-close { animation: de-cfg-close .2s ease-in both; }';
	}

	// Embedders
	cont('.de-ytube-link', '//youtube.com/favicon.ico');
	x += '.de-img-pre, .de-img-full { display: block; margin: ' + (aib.krau ? 0 : '2px 10px') + '; border: none; outline: none; cursor: pointer; }\
		.de-img-full { float: left; }\
		.de-img-center { position: fixed; z-index: 9999; border: 1px solid black; }\
		.de-mp3, .de-ytube-obj { margin: 5px 20px; }\
		td > a + .de-ytube-obj { display: inline-block; }';

	// Other
	cont('.de-wait', 'data:image/gif;base64,R0lGODlhEAAQALMMAKqooJGOhp2bk7e1rZ2bkre1rJCPhqqon8PBudDOxXd1bISCef///wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAMACwAAAAAEAAQAAAET5DJyYyhmAZ7sxQEs1nMsmACGJKmSaVEOLXnK1PuBADepCiMg/DQ+/2GRI8RKOxJfpTCIJNIYArS6aRajWYZCASDa41Ow+Fx2YMWOyfpTAQAIfkEBQAADAAsAAAAABAAEAAABE6QyckEoZgKe7MEQMUxhoEd6FFdQWlOqTq15SlT9VQM3rQsjMKO5/n9hANixgjc9SQ/CgKRUSgw0ynFapVmGYkEg3v1gsPibg8tfk7CnggAIfkEBQAADAAsAAAAABAAEAAABE2QycnOoZjaA/IsRWV1goCBoMiUJTW8A0XMBPZmM4Ug3hQEjN2uZygahDyP0RBMEpmTRCKzWGCkUkq1SsFOFQrG1tr9gsPc3jnco4A9EQAh+QQFAAAMACwAAAAAEAAQAAAETpDJyUqhmFqbJ0LMIA7McWDfF5LmAVApOLUvLFMmlSTdJAiM3a73+wl5HYKSEET2lBSFIhMIYKRSimFriGIZiwWD2/WCw+Jt7xxeU9qZCAAh+QQFAAAMACwAAAAAEAAQAAAETZDJyRCimFqbZ0rVxgwF9n3hSJbeSQ2rCWIkpSjddBzMfee7nQ/XCfJ+OQYAQFksMgQBxumkEKLSCfVpMDCugqyW2w18xZmuwZycdDsRACH5BAUAAAwALAAAAAAQABAAAARNkMnJUqKYWpunUtXGIAj2feFIlt5JrWybkdSydNNQMLaND7pC79YBFnY+HENHMRgyhwPGaQhQotGm00oQMLBSLYPQ9QIASrLAq5x0OxEAIfkEBQAADAAsAAAAABAAEAAABE2QycmUopham+da1cYkCfZ94UiW3kmtbJuRlGF0E4Iwto3rut6tA9wFAjiJjkIgZAYDTLNJgUIpgqyAcTgwCuACJssAdL3gpLmbpLAzEQA7');
	x += '.de-abtn { text-decoration: none !important; outline: none; }\
		#de-alert { position: fixed; right: 0; top: 0; z-index: 9999; font: 14px arial; cursor: default; }\
		#de-alert > div { float: right; clear: both; width: auto; min-width: 0pt; padding: 10px; margin: 1px; border: 1px solid grey; white-space: pre-wrap; }\
		.de-alert-btn { display: inline-block; vertical-align: top; font-size: 150%; color: green; cursor: pointer; }\
		.de-alert-msg { display: inline-block; margin-top: .25em; }\
		.de-content { text-align: left; }\
		.de-content textarea { display: block; margin: 2px 0; font: 12px courier new; ' + (nav.Opera ? '' : 'resize: none !important; ') + '}\
		.de-content-block > a { color: inherit; font-weight: bold; }\
		#de-content-fav, #de-content-hid { font-size: 16px; padding: 10px; border: 1px solid gray; }\
		.de-entry { margin: 2px 0; }\
		.de-entry > :first-child { float: none !important; }\
		.de-entry > div > a { text-decoration: none; }\
		.de-fav-inf-posts, .de-fav-inf-page { float: right; margin-right: 5px; font: bold 16px serif; }\
		.de-fav-inf-old { color: #4f7942; }\
		.de-fav-inf-new { color: blue; }\
		.de-fav-title { margin-right: 15px; }\
		.de-omitted { color: grey; font-style: italic; }\
		.de-post-note { color: inherit; font: italic bold 12px serif; }\
		.de-ref-hid { text-decoration: line-through !important; }\
		.de-refmap { margin: 10px 4px 4px 4px; font-size: 70%; font-style: italic; }\
		.de-refmap:before { content: "' + Lng.replies[lang] + ' "; }\
		.de-refmap > a { text-decoration: none; }\
		#de-sagebtn { margin-right: 7px; cursor: pointer; }\
		#de-select { padding: 0 !important; margin: 0 !important; width: auto; min-width: 0; z-index: 9999; border: 1px solid grey;}\
		#de-select a { display: block; padding: 3px 10px; color: inherit; text-decoration: none; font: 13px arial; white-space: nowrap; }\
		#de-select a:hover { background-color: #222; color: #fff; }\
		.de-selected { ' + (nav.Opera ? 'border-left: 4px solid red; border-right: 4px solid red; }' : 'box-shadow: 6px 0 2px -2px red, -6px 0 2px -2px red; }') + '\
		#de-txt-resizer { display: inline-block !important; float: none !important; padding: 5px; margin: 0 0 -6px -12px; border-bottom: 2px solid #555; border-right: 2px solid #444; cursor: se-resize; }\
		.de-viewed { color: #888 !important; }\
		.de-pview { position: absolute; width: auto; min-width: 0; z-index: 9999; border: 1px solid grey; margin: 0 !important; display: block !important; }\
		.de-pview-info { padding: 3px 6px !important; }\
		.de-pview-link { font-weight: bold; }\
		.de-archive:after { content: ""; padding: 0 16px 3px 0; margin: 0 4px; background: url(data:image/gif;base64,R0lGODlhEAAQALMAAF82SsxdwQMEP6+zzRA872NmZQesBylPHYBBHP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAQARTMMlJaxqjiL2L51sGjCOCkGiBGWyLtC0KmPIoqUOg78i+ZwOCUOgpDIW3g3KJWC4t0ElBRqtdMr6AKRsA1qYy3JGgMR4xGpAAoRYkVDDWKx6NRgAAOw==) no-repeat center; }\
		#de-iframe-pform, #de-iframe-dform, small[id^="rfmap"], div[id^="preview"], div[id^="pstprev"], body > hr, .theader, .postarea { display: none !important; }';
	if(aib.kus) {
		x += '#newposts_get, .extrabtns, .ui-resizable-handle { display: none !important; }\
			.ui-wrapper { display: inline-block; width: auto !important; height: auto !important; padding: 0 !important; }';
	} else if(aib.mlpg) {
		x += '#de-pform > div, .mentioned, form > div[style="text-align: center;"], form > div[style="text-align: center;"] + hr { display: none !important; }';
	}
	if(aib.krau) {
		x += '.de-post-hid > div:not(.postheader), img[id^="translate_button"], img[src$="button-expand.gif"], img[src$="button-close.gif"], body > center > hr, h2, form > div:first-of-type > hr' + (liteMode ? ', div[id^="disclaimer"]' : '') + ' { display: none !important; }\
			div[id^="Wz"] { z-index: 10000 !important; }\
			.de-thr-hid { margin-bottom: ' + (!TNum ? '7' : '2') + 'px; }\
			.file_reply + .de-ytube-obj, .file_thread + .de-ytube-obj { margin: 5px 20px 5px 5px; float: left; }\
			.de-ytube-obj + div { clear: left; }';
	} else if(aib.fch) {
		x += '.de-spoiler { color: #000; background-color: #000; }\
			.de-post-hid > .file, .de-post-hid > blockquote, #mpostform, .navLinks, .postingMode { display: none !important; }';
	} else if(aib.tiny) {
		x += 'form, form table { margin: 0; }\
			.de-post-hid > .intro ~ *, .post-hover { display: none !important; }';
	} else if(aib._420) {
		x += '.de-post-hid > .replyheader ~ *, .opqrbtn, .qrbtn, .ignorebtn, .hidethread, noscript, #content > hr { display: none !important; }\
			.de-thr-hid { margin: 1em 0; }';
	} else {
		x+= '.de-post-hid > .de-ppanel ~ * { display: none !important; }'
		if(aib.abu) {
			x += '.ABU_refmap, .postpanel, #CommentToolbar, #usrFlds + tbody > tr:first-child, #postform > div:nth-child(2), #BottomNormalReply, body > center { display: none !important; }\
				#de-txt-panel { font-size: 16px !important; }\
				.de-abtn { transition: none; }';
		} else if(aib.nul) {
			x += '#postform nobr, .replieslist, #captcha_status, .de-thread span[style="float: right;"] { display: none !important; }\
				.ui-wrapper { position: static !important; margin: 0 !important; overflow: visible !important; }\
				.ui-resizable { display: inline !important; }';
		} else if(aib.hana) {
			x += '#hideinfotd, .reply_, .delete > img, .popup { display: none; }\
				.delete { background: none; }\
				.delete_checkbox { position: static !important; }\
				.file + .de-ytube-obj { float: left; margin: 5px 20px 5px 5px; }\
				.de-ytube-obj + div { clear: left; }';
		} else if(aib._7ch) {
			x += '.reply { background-color: ' + $getStyle(doc.body, 'background-color') + '; }';
		} else if(aib.gazo) {
			x += '.de-content, .de-cfg-body { font-family: arial; }\
				.ftbl { width: auto; margin: 0; }\
				.reply { background: #f0e0d6; }';
		} else if(aib.brit) {
			x += '.de-ppanel, .de-ppanel-op { float: left; margin-top: 0.45em; }\
				a + .threadlinktext { position: relative; top: 17px; }\
				.postthreadlinks, .pagethreadlinks, .pwpostblock { display: none; }\
				.de-btn-src { padding: 0px 10px 10px 0px !important; background-size: cover !important; }';
		} else if(aib.tinyIb) {
			x += 'br.clear { display: none !important; }';
		} else if(aib.pony) {
			x += '#bodywrap3 > hr, .blotter { display: none !important; }';
		}
	}
	if(liteMode) {
		x += 'body > :not(' + (aib.brit ? '.threadz' : 'form') + ') { display: none; }'
	}

	if(nav.Firefox < 16) {
		x = x.replace(/(transition|keyframes|transform|animation|linear-gradient)/g, nav.cssFix + '$1');
		if(!nav.Opera) {
			x = x.replace(/\(to bottom/g, '(top').replace(/\(to top/g, '(bottom');
		}
	}

	$append(doc.head, [
		$new('style', {'id': 'de-css', 'type': 'text/css', 'text': x}, null),
		$new('style', {'id': 'de-css-dynamic', 'type': 'text/css'}, null)
	]);
	x = gif = cont = null;
	updateCSS();
	$disp(dForm);
}

function updateCSS() {
	var x = '.de-content { ' + (!Cfg['attachPanel'] ? 'width: 100%;' : 'position: fixed; right: 0; bottom: 25px; z-index: 9999; max-height: 95%; overflow-x: visible; overflow-y: auto;') + ' }\
		#de-panel { ' + (!Cfg['attachPanel'] ? 'float: right; clear: both' : 'position: fixed; right: 0; bottom: 0;') + ' }';
	if(Cfg['addPostForm'] === 3) {
		x += '#de-qarea { position: fixed; right: 0; bottom: 25px; z-index: 9990; padding: 3px; border: 1px solid gray; }\
			#de-qarea-target { font-weight: bold; }\
			#de-qarea-close { float: right; color: green; font: bold 20px arial; cursor: pointer; }';
	} else {
		x += '#de-qarea { float: none; clear: left; width: 100%; padding: 3px 0 3px 3px; margin: 2px 0; }';
	}
	if(!Cfg['panelCounter']) {
		x += '#de-panel-info { display: none; }';
	}
	if(!Cfg['expandPanel']) {
		x += '#de-panel-btns, #de-panel-info { display: none; }';
	}
	if(Cfg['maskImgs']) {
		x+= '.de-img-pre, .de-ytube-obj, img[src*="spoiler"], img[src*="thumb"] { opacity: 0.07 !important; }\
			.de-img-pre:hover, .de-ytube-obj:hover, img[src*="spoiler"]:hover, img[src*="thumb"]:hover { opacity: 1 !important; }';
	}
	if(Cfg['delHiddPost']) {
		x += '.de-thr-hid, .de-thr-hid + div + br, .de-thr-hid + div + br + hr { display: none; }';
	}
	if(Cfg['noPostNames']) {
		x += '.commentpostername, .postername, .postertrip { display: none; }';
	}
	if(Cfg['noSpoilers']) {
		x += '.spoiler, .de-spoiler { background: #888 !important; color: #ccc !important; }';
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
	$id('de-css-dynamic').textContent = x;
}


/*==============================================================================
									SCRIPT UPDATING
==============================================================================*/

function checkForUpdates(isForce, Fn) {
	var day, temp = Cfg['scrUpdIntrv'];
	if(!isForce) {
		day = 2 * 1000 * 60 * 60 * 24;
		switch(temp) {
		case 0: temp = day; break;
		case 1: temp = day * 2; break;
		case 2: temp = day * 7; break;
		case 3: temp = day * 14; break;
		case 4:
		default: temp = day * 30; break;
		}
		if(Date.now() - +Cfg['lastScrUpd'] < temp) {
			return;
		}
	}
	GM_xmlhttpRequest({
		'method': 'GET',
		'url': 'https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/' +
			'master/Dollchan_Extension_Tools.meta.js',
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
					isUpd = false;
				if(!dVer) {
					if(isForce) {
						Fn('<div style="color: red; font-weigth: bold;">' + Lng.noConnect[lang] + '</div>');
					}
					return;
				}
				Cfg['lastScrUpd'] = Date.now();
				while(i < len) {
					if((+dVer[i] || 0) > (+cVer[i] || 0)) {
						isUpd = true;
						break;
					} else if((+dVer[i] || 0) < (+cVer[i] || 0)) {
						break;
					}
					i++;
				}
				if(isUpd) {
					Fn('<a style="color: blue; font-weight: bold;" href="' +
						'https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/' +
						'Dollchan_Extension_Tools.user.js">' + Lng.updAvail[lang] + '</a>');
				} else if(isForce) {
					Fn(Lng.haveLatest[lang]);
				}
			} else if(isForce) {
				Fn('<div style="color: red; font-weigth: bold;">' + Lng.noConnect[lang] + '</div>');
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
	if(!(window.localStorage && typeof localStorage === 'object' && window.sessionStorage)) {
		GM_log('WEBSTORAGE ERROR: please, enable webstorage!');
		return false;
	}
	getImageboard();
	switch(window.name) {
	case '': break;
	case 'de-iframe-pform':
	case 'de-iframe-dform':
		addContentScript((
			'window.top.postMessage("J' + window.name + '$#$' + findSubmitError(doc) + '$#$' + getFinalURL(doc, true) + '", "*");'
		).replace(/\n|\r/g, '\\n'));
		return false;
	case 'de-iframe-fav':
		var intvr = setInterval(function() {
			$del($id('de-fav-script'));
			doc.head.appendChild($new('script', {
				'id': 'de-fav-script',
				'type': 'text/javascript',
				'text': 'window.top.postMessage("I' + (doc.body.offsetHeight + 5) + '", "*");'
			}, null));
		}, 1500);
		$event(window, {'load': function() {
			setTimeout(function() {
				clearInterval(intvr);
				intvr = null;
			}, 3e4);
		}});
		liteMode = true;
		pr = {};
	}
	if(aib.hana && window.location.pathname === '/settings') {
		setHanaRating();
		return false;
	}
	if(!dForm || $id('de-panel')) {
		return false;
	}
	getNavigator();
	if((getStored('DESU_Exclude') || '').indexOf(aib.dm) !== -1) {
		return false;
	}
	return true;
}

function getNavigator() {
	var ua = window.navigator.userAgent;
	nav = {
		Firefox: +(ua.match(/mozilla.*? rv:(\d+)/i) || [,0])[1],
		Opera: window.opera ? +window.opera.version() : 0,
		WebKit: +(ua.match(/WebKit\/([\d.]+)/i) || [,0])[1]
	};
	nav.Safari = nav.WebKit && !/chrome/i.test(ua);
	nav.isGM = nav.Firefox && typeof GM_setValue === 'function';
	nav.isGlobal = nav.isGM || !!scriptStorage;
	nav.cssFix =
		nav.WebKit ? '-webkit-' :
		nav.Opera ? (nav.Opera < 12.5 ? '-o-' : '') :
		nav.Firefox < 16 ? '-moz-' : '';
	if(!nav.Opera || nav.Opera >= 12) {
		nav.Anim = true;
		nav.animName =
			nav.WebKit ? 'webkitAnimationName' :
			nav.Opera ? 'OAnimationName' :
			nav.Firefox < 16 ? 'MozAnimationName' :
			'animationName';
		nav.animEnd =
			nav.WebKit ? 'webkitAnimationEnd' :
			nav.Opera && nav.Opera < 12.5 ? 'oAnimationEnd' :
			'animationend';
		nav.animEvent = function(el, Fn) {
			el.addEventListener(nav.animEnd, function aEvent() {
				this.removeEventListener(nav.animEnd, aEvent, false);
				Fn(this);
				Fn = null;
			}, false);
		}
	}
	nav.visChange = nav.WebKit ? 'webkitvisibilitychange' : 'mozvisibilitychange';
	if(nav.Firefox > 14 || nav.WebKit >= 536.1) {
		nav.toBlob = function(arr, type) {
			return type ? new Blob(arr, {'type': type}) : new Blob(arr);
		};
	} else if(nav.Firefox > 5) {
		nav.toBlob = function(arr, type) {
			var i, j, len, len_, out, el, bb = new window.MozBlobBuilder();
			for(i = 0, len = arr.length; i < len; i++) {
				el = arr[i]
				if(el.buffer) {
					if(el.length !== el.buffer.byteLength) {
						out = new Uint8Array(len_ = el.length);
						for(j = 0; j < len_; j++) {
							out[j] = el[j];
						}
						bb.append(out.buffer);
					} else {
						bb.append(el.buffer);
					}
				} else {
					bb.append(el);
				}
			}
			return type ? bb.getBlob(type) : bb.getBlob();
		};
	} else {
		nav.noBlob = true;
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
			$before(el, $add(html));
		} :
		function(el, html) {
			el.insertAdjacentHTML('beforebegin', html);
		};
	nav.forEach = nav.WebKit || nav.Firefox ?
		function(obj, Fn) {
			Object.keys(obj).forEach(Fn, obj);
		} :
		function(obj, Fn) {
			for(var i in obj) {
				if(obj.hasOwnProperty(i)) {
					Fn.call(obj, i);
				}
			}
		};
	nav.fixLink = nav.Safari ?
		function(url) {
			return url[1] === '/' ? 'http:' + url :
				url[0] === '/' ? 'http://' + aib.host + url :
				url;
		} :
		function(url) {
			return url;
		};
	if(nav.WebKit) {
		window.URL = window.webkitURL;
	}
	nav.addClass = nav.Opera && nav.Opera < 11.5 ?
		function(el, cName) {
			el.className += ' ' + cName;
		} :
		function(el, cName) {
			el.classList.add(cName);
		};
	nav.remClass = nav.Opera && nav.Opera < 11.5 ?
		function(el, cName) {
			el.className = el.className.replace(new RegExp('(?:^| )' + cName, 'g'), '');
		} :
		function(el, cName) {
			el.classList.remove(cName);
		};
	nav.toDOM = nav.Firefox >= 12 ?
		function(html) {
			return new DOMParser().parseFromString(html, 'text/html');
		} :
		function(html) {
			var myDoc = doc.implementation.createHTMLDocument('');
			myDoc.documentElement.innerHTML = html;
			return myDoc;
		};
}

function getPage() {
	var url = (window.location.pathname || '')
		.match(/^(?:\/?(.*?)\/?)?(res\/|thread-)?(\d+|index|wakaba)?(\.(?:[xme]*html?|php))?$/);
	brd = url[1] || (aib.dfwk ? 'df' : '');
	res = aib.krau ? 'thread-' : 'res/';
	TNum = url[2] ? url[3] : false;
	pageNum = url[3] && !TNum ? +url[3] || 0 : 0;
	docExt = url[4] || (
		aib.gazo ? '.htm' :
		aib._420 ? '.php' :
		aib.fch ? '' :
		'.html'
	);
	Favico.href = ($q('head link[rel="shortcut icon"]', doc) || {}).href;
}

function getPostform(form) {
	if(!form || aib.abu && $c('locked', form)) {
		return {};
	}
	var tr = aib._7ch ? 'li' : 'tr',
		p = './/' + tr + '[not(contains(@style,"none"))]//input[not(@type="hidden") and ',
		recap = $q('#recaptcha_response_field', form);
	return {
		on: true,
		isQuick: false,
		qButton: !aib.tiny || !!TNum,
		tNum: TNum,
		form: form,
		tr: 'ancestor::' + tr + '[1]',
		recap: recap,
		cap: $q('input[name*="aptcha"]:not([name="recaptcha_challenge_field"])', form) || recap,
		txta: $q(tr + ':not([style*="none"]) textarea:not([style*="display:none"])', form),
		subm: $q(tr + ' input[type="submit"]', form),
		file: $q(tr + ' input[type="file"]', form),
		passw: $q(tr + ' input[type="password"]', form),
		dpass: $q('input[type="password"]', dForm),
		gothr: $x('.//tr[@id="trgetback"]|.//input[@type="radio" or @name="gotothread"]/ancestor::tr[1]', form),
		name: $x(p + '(@name="field1" or @name="name" or @name="internal_n" or @name="nya1" or @name="akane")]', form),
		mail: $x(p + (
			aib._410 ? '@name="sage"]' :
			'(@name="field2" or @name="em" or @name="sage" or @name="email" or @name="nabiki" or @name="dont_bump")]'
		), form),
		video: $q(tr + ' input[name="video"], ' + tr + ' input[name="embed"]', form)
	};
}

function getImageboard() {
	var h = window.location.hostname.match(
			/(?:(?:[^.]+\.)(?=org\.|net\.|com\.))?[^.]+\.[^.]+$|^\d+\.\d+\.\d+\.\d+$|localhost/
		)[0];
	aib = {
		kus: $xb('.//script[contains(@src,"kusaba")]', doc),
		hana: $xb('.//script[contains(@src,"hanabira")]', doc),
		tiny: $xb('.//form[@name="postcontrols"]', doc),
		abu: !!$id('LakeSettings'),
		waka: $xb('.//script[contains(@src,"wakaba")]|.//form[contains(@action,"wakaba.pl")]', doc)
	};
	switch(h) {
	case 'krautchan.net': aib.krau = true; break;
	case '2chan.net': aib.gazo = true; break;
	case 'britfa.gs': aib.brit = true; break;
	case '4chan.org': aib.fch = true; break;
	case '420chan.org': aib._420 = true; break;
	case '7chan.org': aib._7ch = true; break;
	case 'mlpg.co': aib.mlpg = true; break;
	}
	aib.qDForm = aib.brit ? '.threadz' :
		aib.hana || aib.krau ? 'form[action*="delete"]' :
		aib.tiny ? 'form[name="postcontrols"]' :
		aib.gazo ? 'form:nth-of-type(2)' :
		'#delform, form[name="delform"]';
	aib.qThread =
		$q('div[id*="_info"][style*="float"]', doc) ? 'div[id^="t"]:not([style])' :
		aib._420 ? '[id*="thread"]' :
		'[id^="thread"]' + (aib._7ch ? ':not(#thread_controls)' : '');
	aib.qTNum =
		aib.gazo || (aib.tiny && !aib.mlpg) ? 'input[type="checkbox"]' :
		aib.waka && !aib.abu || aib.brit ? 'a[name]' :
		false;
	dForm = $q(aib.qDForm, doc);
	if(!dForm) {
		return;
	}
	aib.dm = h;
	aib.host = window.location.hostname;
	aib.tinyIb = $xb('.//form[contains(@action,"imgboard.php?delete")]', doc);
	switch(h) {
	case '0chan.ru': aib.nul = true; break;
	case '410chan.ru': aib._410 = true; break;
	case 'hiddenchan.i2p': aib.hid = true; break;
	case '2--ch.ru': aib.tire = true; break;
	case 'dfwk.ru': aib.dfwk = true; break;
	case 'ponychan.net': aib.pony = true; break;
	}
	aib.ru = aib.hana || aib.tinyIb || aib.tire || h === '02ch.net';
	aib.cReply =
		aib.krau ? 'postreply' :
		aib.tiny ? 'post reply' :
		'reply';
	aib.cOPost =
		aib.kus ? 'postnode' :
		aib.fch ? 'op' :
		aib.mlpg ? 'opMain' :
		'oppost';
	aib.cThread = aib.krau ? 'thread_body' : 'thread';
	aib.qRef =
		aib.fch ? '.postInfo > :last-child' :
		aib.tiny ? '.intro > :last-child' :
		aib.krau ? '.postnumber' :
		aib.gazo ? '.del' :
		'.reflink';
	aib.qMsg =
		aib.hana ? '.postbody' :
		aib.tiny ? '.body' :
		aib._7ch ? '.message' :
		'blockquote';
	aib.cFileInfo =
		aib.fch ? 'fileText' :
		aib.krau || aib.tiny || aib.hana || aib.brit ? 'fileinfo' :
		'filesize';
	aib.qImgLink = aib.brit ? '.fileinfo' : aib.krau ? '.filename > a' : (
		(aib.gazo ? '' : '.' + aib.cFileInfo) + ' a[href$=".jpg"]' + (aib.nul ? ':first-child,' : ',') +
		(aib.gazo ? '' : '.' + aib.cFileInfo) + ' a[href$=".png"]' + (aib.nul ? ':first-child,' : ',') +
		(aib.gazo ? '' : '.' + aib.cFileInfo) + ' a[href$=".gif"]' + (aib.nul ? ':first-child' : '')
	);
	aib.qPostForm =
		aib.gazo ? 'form:nth-of-type(1)' :
		aib.fch || aib.tiny ? 'form[name="post"]' :
		'#postform';
	aib.cTitle =
		aib.krau ? 'postsubject' :
		aib.tiny || aib.fch ? 'subject' :
		aib.hana ? 'replytitle' :
		'filetitle';
	aib.qOmitted =
		aib.gazo ? 'font[color="#707070"]' :
		aib.krau ? '.omittedinfo' :
		aib.hana ? '.abbrev' :
		aib.fch ? '.summary.desktop' :
		'.omittedposts';
	aib.qBan =
		aib.krau ? '.ban_mark' :
		aib.fch ? 'strong[style="color: red;"]' :
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
		getPost;
	aib.getPosts =
		aib.gazo ? function(thr) {
			return $Q('td:nth-child(2)', thr);
		} :
		aib.tiny ? function(thr) {
			return $C('reply', thr);
		} :
		function(thr) {
			return $C(aib.cReply, thr);
		};
	aib.getOp =
		aib.brit ? function(thr, dc) {
			var el, post = $attr(dc.createElement('div'), {'style': 'clear: left;'}),
				op = $c('originalpost', thr);
			$after($c('postmenu', op), post);
			while((el = thr.firstChild).tagName !== 'TABLE') {
				$after(post, el);
				post = el;
			}
			post = dc.createElement('div');
			$before(thr.firstChild, post);
			while(el = op.firstChild) {
				post.appendChild(el);
			}
			$del($t('table', thr));
			return post;
		} :
		function(thr, dc) {
			var el, op, opEnd;
			op = $c(aib.cOPost, thr);
			if(op) {
				return op;
			}
			op = dc.createElement('div'),
			opEnd = $q(aib.qTable + ', div[id^="repl"]', thr);
			while((el = thr.firstChild) !== opEnd) {
				op.appendChild(el);
			}
			if(thr.childElementCount) {
				$before(thr.firstChild, op);
			} else {
				thr.appendChild(op);
			}
			return op;
		};
	aib.getTNum =
		(aib.kus && !aib._7ch) || aib.tinyIb ? function(op) {
			return $q('input[type="checkbox"]', op).value;
		} :
		aib.qTNum ? function(op) {
			return $q(aib.qTNum, op).name.match(/\d+/)[0];
		} :
		aib.krau ? function(op) {
			return op.parentNode.previousElementSibling.name;
		} :
		function(op) {
			return op.parentNode.id.match('\\d+' + (aib._420 ? '$' : ''))[0];
		};
	aib.getPNum = aib.gazo ?
		function(post) {
			return $t('input', post).name;
		} :
		function(post) {
			return post.id.match(/\d+/)[0];
		};
	aib.getSage =
		aib.fch ? function(post) {
			return !!$c('id_Heaven', post);
		} :
		aib.krau ? function(post) {
			return !!$c('sage', post);
		} :
		aib._410 ? function(post) {
			return $xb('.//span[@class="filetitle" and contains(text(),"' + unescape('%u21E9') + '")]', post);
		} :
		function(post) {
			var a = $q('a[href^="mailto:"], a[href="sage"]', post);
			return a && /sage/i.test(a.href);
		};
}

function processPost(post, pNum, thr, i) {
	post.thr = thr;
	post.count = i;
	post.msg = $q(aib.qMsg, post);
	post.img = getPostImages(post);
	post.sage = aib.getSage(post);
	post.setAttribute('de-post', pNum);
	pByNum[post.num = pNum] = post;
}

function parseDelform(el, dc, Fn) {
	var node, thr, pThr = false,
		thrds = $C(aib.cThread, el);
	$each($T('script', el), $del);
	if(Posts.length < 2) {
		aib.qTable = aib.fch || aib.mlpg ? $c('replyContainer', el) :
			aib.tire ? 'table:not(.postfiles)' :
			aib.brit ? 'div[id^="replies"] > table' :
			!aib.tiny && (aib.gazo || $q('td.' + aib.cReply, el)) ? 'table' :
			false;
		aib.getWrap =
			aib.fch || aib.mlpg ? function(post) {
				return post.parentNode;
			} :
			aib.qTable ? function(post) {
				return post.isOp ? post : $x('ancestor::table[1]', post);
			} :
			function(post) {
				return post;
			};
		if(aib.qTable) {
			if((postWrapper = aib.fch || aib.mlpg ? aib.qTable : $q(aib.qTable, el)) && dc !== doc) {
				postWrapper = doc.importNode(postWrapper, true);
			}
		}
	}
	if(thrds.length === 0) {
		thrds = $Q(aib.qThread, el);
		if(thrds.length === 0) {
			node = $t('hr', el).parentNode.firstChild;
			while(1) {
				thrds = dc.createElement('div');
				while(node && (thr = node.nextSibling) && thr.tagName !== 'HR') {
					thrds.appendChild(node);
					node = thr;
				}
				if(pThr) {
					$after(pThr, thrds);
				} else {
					$before(el.firstChild, thrds);
				}
				if(!node || !thr) {
					return;
				}
				if(thrds.childElementCount) {
					Fn(thrds);
				}
				pThr = thr;
				node = thr.nextSibling;
			}
		}
	}
	$each(thrds, Fn);
}

function tryToParse(node) {
	try {
		parseDelform(node, doc, function(thr) {
			if(aib._420 || aib.tiny) {
				$after(thr, thr.lastChild);
				$del($c('clear', thr));
			}
			var i, op = aib.getOp(thr, doc),
				els = aProto.slice.call(aib.getPosts(thr)),
				len = els.length;
			processPost(op, thr.num = aib.getTNum(op), thr, 0);
			op.isOp = true;
			op.tTitle = ($c(aib.cTitle, op) || {}).textContent || getText(op).substring(0, 70);
			for(i = 0; i < len; i++) {
				processPost(els[i], aib.getPNum(els[i]), thr, i + 1);
			}
			Posts.push(op);
			Threads.push(op);
			Posts = Posts.concat(els);
			nav.addClass(thr, 'de-thread');
			thr.pCount = len + getOmPosts(thr);
		});
	} catch(e) {
		GM_log('DELFORM ERROR:\n' + (nav.WebKit ? e.stack :
			e.name + ': ' + e.message + '\n' +
			(nav.Firefox ? e.stack.replace(/^([^@]*).*\/(.+)$/gm, function(str, fName, line) {
				return '    at ' + (fName ? fName + ' (' + line + ')' : line);
			}) : e.stack)
		));
		return false;
	}
	node.removeAttribute('id');
	return true;
}

function replaceString(txt) {
	if(dTime) {
		txt = dTime.init(txt).fix(txt, null);
	}
	if(aib.fch || aib.krau) {
		txt = txt.replace(/(^|>|\s|&gt;)(https*:\/\/.*?)(?=$|<|\s)/ig, '$1<a href="$2">$2</a>');
	}
	if(aib.fch && Cfg['noSpoilers']) {
		txt = txt.replace(/"spoiler">/g, '"de-spoiler">');
	}
	if(Cfg['hideBySpell'] && oSpells.rep[0]) {
		txt = replaceBySpells(oSpells.rep, txt);
	}
	if(Cfg['crossLinks']) {
		txt = txt.replace(
			new RegExp('>https?:\\/\\/[^\\/]*' + aib.dm +
				'\\/([a-z0-9]+)\\/(?:res\\/|thread-)(\\d+)(?:[^#<]+)?(?:#i?(\\d+))?<', 'g'),
			function(str, b, tNum, pNum) {
				return '>&gt;&gt;/' + b + '/' + (pNum || tNum) + '<';
			}
		);
	}
	return txt;
}

function replacePost(el) {
	if(aib.rep) {
		el.innerHTML = replaceString(el.innerHTML);
	}
	return el;
}

function replaceDelform() {
	nav.insBefore(dForm, replaceString(dForm.outerHTML || new XMLSerializer().serializeToString(dForm)));
	dForm.style.display = 'none';
	dForm.id = 'de-dform-old';
	dForm = dForm.previousSibling;
	$event(window, {'load': function() {
		$del($id('de-dform-old'));
	}});
}

function removePageTrash(el) {
	if(aib.abu) {
		var el_;
		if(TNum && (el = $c('de-thread', el).nextSibling)) {
			while(el_ = el.nextSibling) {
				$del(el);
				el = el_;
			}
			nav.insAfter(el, '<hr />');
		}
	} else if(aib.brit) {
		el = $C('reflink', el);
		for(var node, i = el.length - 1; i >= 0; i--) {
			node = el[i].firstChild;
			node.onclick = null;
			node.href = getThrdUrl(aib.host, brd, node.textContent);
			node.target = '_blank';
		}
	}
}

function onVis() {
	Favico.focused = true;
	if(Cfg['favIcoBlink'] && Favico.href) {
		clearInterval(Favico.delay);
		$each($Q('link[rel="shortcut icon"]', doc.head), $del);
		doc.head.appendChild($new('link', {'href': Favico.href, 'rel': 'shortcut icon'}, null));
	}
	if(Cfg['updThread'] === 1) {
		setTimeout(function() {
			doc.title = docTitle;
		}, 200);
	}
}

function initPage() {
	pr = getPostform($q(aib.qPostForm, doc));
	oeForm = $q('form[name="oeform"], form[action*="paint"]', doc);
	if(TNum) {
		if(Cfg['rePageTitle']) {
			docTitle = '/' + brd + ' - ' + pByNum[TNum].tTitle;
			doc.title = docTitle;
		} else {
			docTitle = doc.title;
		}
		if(nav.Firefox > 10 || nav.WebKit) {
			doc.addEventListener(nav.visChange, function() {
				if(doc.mozHidden || doc.webkitHidden) {
					Favico.focused = false;
				} else {
					onVis();
				}
			});
			Favico.focused = !(doc.mozHidden || doc.webkitHidden);
		} else {
			window.onblur = function() {
				Favico.focused = false;
			};
			window.onfocus = onVis;
			Favico.focused = false;
			$event(window, {'mousemove': function mouseMove() {
				Favico.focused = true;
				$revent(window, {'mousemove': mouseMove});
			}});
		}
		initThreadsUpdater();
		if(Cfg['updThread'] === 2 || Cfg['updThread'] === 3) {
			$after($c('de-thread', doc), $event($add(
				'<span>[<a href="#">' + Lng.getNewPosts[lang] + '</a>]</span>'), {
				'click': function(e) {
					$pd(e);
					loadNewPosts(true, function() { infoNewPosts(null, 0); });
				}
			}));
		}
	} else {
		setTimeout(window.scrollTo, 20, 0, 0);
	}
	if(Cfg['updScript']) {
		checkForUpdates(false, function(html) {
			$alert(html, 'updavail', false);
		});
	}
}


/*==============================================================================
										MAIN
==============================================================================*/

function doScript() {
	var initTime = oldTime = Date.now();
	if(!isCompatible()) {
		return;
	}
	dummy = doc.createElement('div');
	fixFunctions();
	getPage();
	$log('initBoard');
	readCfg();
	$log('readCfg');
	if(aib.rep) {
		replaceDelform();
		$log('replaceDelform');
	}
	if(!tryToParse(dForm)) {
		return;
	}
	$log('parseDelform');
	readFavorites();
	$log('readFavorites');
	if(Cfg['keybNavig']) {
		initKeyNavig();
		$log('initKeyNavig');
	}
	removePageTrash(dForm);
	if(!liteMode) {
		initPage();
		$log('initPage');
		addPanel();
		$log('addPanel');
		initPostform();
		$log('initPostform');
	}
	prepareCFeatures();
	if(Cfg['preLoadImgs']) {
		window.postMessage('Kall', '*');
	}
	Posts.forEach(addPostButtons);
	saveFavorites(JSON.stringify(Favor));
	$log('addPostButtons');
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
	readPostsVisib();
	if(Cfg['markViewed']) {
		readViewedPosts();
	}
	setPostsVisib();
	savePostsVisib();
	$log('readPosts');
	scriptCSS();
	$log('scriptCSS');
	endTime = Date.now() - initTime;
}

if(window.opera) {
	$event(doc, {'DOMContentLoaded': doScript});
} else doScript();

})(window.opera && window.opera.scriptStorage);