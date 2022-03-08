// ==UserScript==
// @name            Dollchan Extension Tools
// @version         21.7.6.0
// @namespace       http://www.freedollchan.org/scripts/*
// @author          Sthephan Shinkufag @ FreeDollChan
// @copyright       © Dollchan Extension Team. See the LICENSE file for license rights and limitations (MIT).
// @description     Doing some profit for imageboards
// @icon            https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Icon.png
// @updateURL       https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.meta.js
// @nocompat        Chrome
// @run-at          document-start
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_deleteValue
// @grant           GM_openInTab
// @grant           GM_xmlhttpRequest
// @grant           GM.getValue
// @grant           GM.setValue
// @grant           GM.deleteValue
// @grant           GM.xmlHttpRequest
// @grant           unsafeWindow
// @include         *
// ==/UserScript==

/* eslint indent: ["error", "tab", { "flatTernaryExpressions": true, "outerIIFEBody": 0 }] */

(function deMainFuncInner(deWindow, prestoStorage, FormData, scrollTo, localData) {
'use strict';

const version = '21.7.6.0';
const commit = 'ff8841e';

/* ==[ DefaultCfg.js ]========================================================================================
                                                DEFAULT CONFIG
=========================================================================================================== */

const defaultCfg = {
	disabled     : 0,    // Dollchan enabled by default
	language     : 0,    // Dollchan language [0=ru, 1=en]
	hideBySpell  : 1,    // hide posts by spells
	spells       : null, // user defined spells
	sortSpells   : 0,    // sort spells and remove duplicates
	hideRefPsts  : 0,    // hide replies to hidden posts
	nextPageThr  : 0,    // load threads from next pages instead of hidden
	delHiddPost  : 0,    // remove placeholders [0=off, 1=all, 2=posts only, 3=threads only]
	ajaxUpdThr   : 1,    // threads updater
	updThrDelay  : 20,   //    update interval (sec)
	updCount     : 1,    //    show countdown to thread update
	favIcoBlink  : 0,    //    blink the favicon on new posts
	desktNotif   : 0,    //    desktop notifications for new posts
	markNewPosts : 1,    //    highlight new posts with color
	useDobrAPI   : 1,    //    dobrochan: use json API
	markMyPosts  : 1,    // highlight my own posts
	expandTrunc  : 0,    // auto-expand truncated posts
	widePosts    : 0,    // stretch posts to screen width
	limitPostMsg : 2000, // limit text width in posts nessages
	showHideBtn  : 1,    // show "Hide" buttons [0=off, 1=with menu, 2=no menu]
	showRepBtn   : 1,    // show "Quick reply" buttons [0=off, 1=with menu, 2=no menu]
	postBtnsCSS  : 2,    // post buttons style [0=simple, 1=gradient grey, 2=custom]
	postBtnsBack : '#8c8c8c', //    custom background color
	thrBtns      : 1,    /* additional buttons under threads
		[0=off, 1=all, 2=all (on board), 3='New posts' on board] */
	noSpoilers   : 1,    // text spoilers expansion [0=off, 1=grey, 2=native]
	noPostNames  : 0,    // hide poster names
	correctTime  : 0,    // time correction in posts
	timeOffset   : '+0', //    time offset (h)
	timePattern  : '',   //    search pattern
	timeRPattern : '',   //    replace pattern
	expandImgs   : 2,    // expand images on click [0=off, 1=in post, 2=by center]
	imgNavBtns   : 1,    //    add buttons to navigate images
	imgInfoLink  : 1,    //    show name under expanded image
	resizeDPI    : 0,    //    donʼt upscale images on high DPI displays
	resizeImgs   : 1,    //    resize large images to fit screen [0=off', '1=by width', '2=width+height]
	minImgSize   : 100,  //    minimal size for expanded images (px)
	zoomFactor   : 25,   //    images zoom sensibility [1-100%]
	webmControl  : 1,    //    show control bar for WebM
	webmTitles   : 0,    //    load titles from WebM metadata
	webmVolume   : 100,  //    default volume for WebM [0-100%]
	minWebmWidth : 320,  //    minimal width for WebM (px)
	preLoadImgs  : 0,    // preload images [0=off, 1=all, 2=non-WebM]
	findImgFile  : 0,    //    detect embedded files in images
	openImgs     : 0,    // replace thumbs with original images [0=off, 1=all, 2=GIFs only, 3=non-GIFs]
	imgSrcBtns   : 1,    // add "Search" buttons for images
	imgNames     : 0,    // image names in links [0=off, 1=original, 2=hide]
	maskImgs     : 0,    // NSFW mode
	maskVisib    : 7,    // image opacity in NSFW mode [0-100%]
	linksNavig   : 1,    // posts navigation by >>links
	linksOver    : 100,  //    delay appearance (ms)
	linksOut     : 1500, //    delay disappearance (ms)
	markViewed   : 0,    //    mark viewed posts
	strikeHidd   : 0,    //    strike >>links to hidden posts
	removeHidd   : 0,    //        also remove from reply maps
	noNavigHidd  : 0,    //    donʼt show previews for hidden posts
	markMyLinks  : 1,    // mark links to my posts with (You)
	crossLinks   : 0,    // replace http:// with >>/b/links*
	decodeLinks  : 0,    // decode %D0%A5%D1 in links
	insertNum    : 1,    // insert >>link on №postnumber click*
	addOPLink    : 0,    // insert >>link when replying to OP on board
	addImgs      : 0,    // load images to jpg/png/gif links*
	addMP3       : 1,    // embed mp3 links
	addVocaroo   : 1,    // embed Vocaroo links
	embedYTube   : 1,    // embed YouTube links [0=off, 1=preview+player, 2=onclick]
	YTubeWidth   : 360,  //    player width (px)
	YTubeHeigh   : 270,  //    player height (px)
	YTubeTitles  : 0,    //    load titles for YouTube links
	ytApiKey     : '',   //    YouTube API key
	addVimeo     : 1,    //    embed Vimeo links
	ajaxPosting  : 1,    // posting without refresh
	postSameImg  : 1,    //    ability to post duplicate images
	removeEXIF   : 1,    //    remove EXIF from JPEG
	removeFName  : 0,    //    clear file names [0=off, 1=empty, 2=unixtime, 3=unixtime-random]
	sendErrNotif : 1,    //    inform in title about post send error
	scrAfterRep  : 0,    //    scroll to bottom after reply
	fileInputs   : 2,    //    enhanced file attachment field  [0=off, 1=simple, 2=preview]
	addPostForm  : 2,    // reply form display in thread [0=at top, 1=at bottom, 2=hidden]
	spacedQuote  : 1,    // insert a space when quoting "> "
	favOnReply   : 1,    // add thread to favorites after reply
	warnSubjTrip : 0,    // warn about a tripcode in "Subject" field
	addSageBtn   : 1,    // replace "Email" with Sage button
	saveSage     : 1,    //    remember sage
	sageReply    : 0,    //    reply with sage
	altCaptcha   : 0,    // use alternative captcha (if available)
	capUpdTime   : 300,  // captcha update interval (sec)
	captchaLang  : 1,    // forced captcha input language [0=off, 1=en, 2=ru]
	addTextBtns  : 1,    // text markup buttons [0=off, 1=graphics, 2=text, 3=usual]
	txtBtnsLoc   : 1,    //    located at [0=top, 1=bottom]
	userPassw    : 1,    // user password
	passwValue   : '',   //    value
	userName     : 0,    // user name
	nameValue    : '',   //    value
	noBoardRule  : 0,    // hide board rules
	noPassword   : 1,    // hide form "Password" field
	noName       : 0,    // hide form "Name" field
	noSubj       : 0,    // hide form "Subject" field
	scriptStyle  : 0,    /* Dollchan style
		[0=Gradient darkblue, 1=gradient blue, 2=solid grey, 3=transparent blue, 4=square dark] */
	userCSS      : 0,    // user CSS
	userCSSTxt   : '',   //    css text
	expandPanel  : 0,    // show full main panel
	animation    : 1,    // CSS3 animation
	hotKeys      : 1,    // hotkeys
	loadPages    : 1,    //    number of pages that are loaded on F5
	panelCounter : 1,    // panel counter for posts/images [0=off, 1=all posts, 2=except hidden]
	hideReplies  : 0,    // show only op-posts in threads list
	rePageTitle  : 1,    // show thread title in the page tab
	inftyScroll  : 1,    // infinite scrolling for pages
	scrollToTop  : 0,    // always scroll to top in the threads list
	saveScroll   : 1,    // remember the scroll position in threads
	favThrOrder  : 0,    /* threads sorting order in the Favorites window
		[0=by opnum, 1=by opnum (desc), 2=by adding, 3=by adding (desc)] */
	favWinOn     : 0,    // always open the Favorites window
	closePopups  : 0,    // close popups automatically
	updDollchan  : 2,    // Check for Dollchan updates [0=off, 1=per day, 2=2days, 3=week, 4=2weeks, 5=month]
	textaWidth   : 300,  // textarea width (px)
	textaHeight  : 115,  // textarea height (px)
	replyWinDrag : 0,          // draggable "Quick Reply" form
	replyWinX    : 'right: 0', //    "Quick Reply" form X position
	replyWinY    : 'top: 0',   //    "Quick Reply" form Y position
	cfgTab       : 'filters',  // remembered tab in "Settings" window
	cfgWinDrag   : 0,          // draggable "Settings" window
	cfgWinX      : 'right: 0', //    "Settings" window X position
	cfgWinY      : 'top: 0',   //    "Settings" window Y position
	hidWinDrag   : 0,          // draggable "Hidden" window
	hidWinX      : 'right: 0', //    "Hidden" window X position
	hidWinY      : 'top: 0',   //    "Hidden" window Y position
	favWinDrag   : 0,          // draggable "Favorites" window
	favWinX      : 'right: 0', //    "Favorites" window X position
	favWinY      : 'top: 0',   //    "Favorites" window Y position
	favWinWidth  : 500,        //    "Favorites" window width (px)
	vidWinDrag   : 0,          // draggable "Video" window
	vidWinX      : 'right: 0', //    "Video" window X position
	vidWinY      : 'top: 0'    //    "Video" window Y position
};

/* ==[ Localization.js ]======================================================================================
                                                 LOCALIZATION
=========================================================================================================== */

const Lng = {
	// "Settings" window: tab names
	cfgTab: {
		filters : ['Фильтры', 'Filters', 'Фільтри'],
		posts   : ['Посты', 'Posts', 'Пости'],
		images  : ['Картинки', 'Images', 'Зображ.'],
		links   : ['Ссылки', 'Links', 'Посил.'],
		form    : ['Форма', 'Form', 'Форма'],
		common  : ['Общее', 'Common', 'Спільне'],
		info    : ['Инфо', 'Info', 'Інфо']
	},
	// "Settings" window: options
	cfg: {
		language: {
			sel : [['Ru', 'En', 'Ua'], ['Ru', 'En', 'Ua'], ['Ru', 'En', 'Ua']],
			txt : ['', '', '']
		},

		// "Filters" tab
		hideBySpell: [
			'Спеллы: ',
			'Magic spells: ',
			'Спелли: '],
		sortSpells: [
			'Сортировать спеллы и удалять дубликаты',
			'Sort spells and remove duplicates',
			'Сортувати спелли та видаляти дублікати'],
		hideRefPsts: [
			'Скрывать ответы на скрытые посты',
			'Hide replies to hidden posts',
			'Ховати відповіді на сховані пости'],
		nextPageThr: [
			'Скрытые треды - загружать со следующих страниц',
			'Load threads from next pages instead of hidden',
			'Сховані треди - брати з наступних сторінок'],
		delHiddPost: {
			sel: [
				['Откл.', 'Всё', 'Только посты', 'Только треды'],
				['Disable', 'All', 'Posts only', 'Threads only'],
				['Вимк.', 'Все', 'Лише пости', 'Лише треди']],
			txt: [
				'Удалять скрытое',
				'Remove placeholders',
				'Видаляти сховане']
		},

		// "Posts" tab
		ajaxUpdThr: [
			'Апдейтер тредов ',
			'Threads updater ',
			'Оновлювач тредів '],
		updThrDelay: [
			'(сек)',
			'(sec)',
			'(сек)'],
		updCount: [
			'Обратный счетчик обновления треда',
			'Show countdown to thread update',
			'Зворотній відлік оновлення треду'],
		favIcoBlink: [
			'Мигать фавиконом при появлении новых постов',
			'Blink the favicon on new posts',
			'Блимати фавіконом в разі появи нових постів'],
		desktNotif: [
			'Уведомлять о новых постах на рабочем столе',
			'Desktop notifications for new posts',
			'Повідомляти про нові пости на стільниці'],
		markNewPosts: [
			'Выделять цветом новые посты',
			'Highlight new posts with color',
			'Виділяти кольором нові пости'],
		useDobrAPI: [
			'dobrochan: использовать JSON API',
			'dobrochan: use JSON API',
			'dobrochan: використовувати JSON API'],
		markMyPosts: [
			'Выделять цветом мои посты',
			'Highlight my own posts',
			'Виділяти кольором мої пости'],
		expandTrunc: [
			'Авторазворот сокращенных постов*',
			'Autoexpand truncated posts*',
			'Авторозгортання скорочених постів*'],
		widePosts: [
			'Растягивать посты по ширине экрана',
			'Stretch posts to page width',
			'Розтягувати пости на ширину екрану'],
		limitPostMsg: [
			'Ограничение ширины текста в постах (px)',
			'Limit text width in posts messages (px)',
			'Обмеження ширини тексту в постах (px)'
		],
		thrBtns: {
			sel: [
				['Откл.', 'Все', 'Все (на доске)', '"Новые посты" на доске'],
				['Disable', 'All', 'All (on board)', '"New posts" on board'],
				['Вимк.', 'Всі', 'Всі (на дошці)', '"Нові пости" на дошці']],
			txt: [
				'Кнопки под тредами',
				'Buttons under threads',
				'Кнопки під тредами']
		},
		showHideBtn: {
			sel: [
				['Откл.', 'С меню', 'Без меню'],
				['Disable', 'With menu', 'No menu'],
				['Вимк.', 'Із меню', 'Без меню']],
			txt: [
				'Кнопки "Скрыть пост/тред"',
				'"Hide post/thread" buttons',
				'Кнопки "Сховати пост/тред"']
		},
		showRepBtn: {
			sel: [
				['Откл.', 'С меню', 'Без меню'],
				['Disable', 'With menu', 'No menu'],
				['Вимк.', 'Із меню', 'Без меню']],
			txt: [
				'Кнопки "Ответить на пост/тред"',
				'"Reply to post/thread" buttons',
				'Кнопки "Відповісти на пост/тред"']
		},
		postBtnsCSS: {
			sel: [
				['Упрощенные', 'Серый градиент', 'Настраиваемые'],
				['Simple', 'Gradient grey', 'Custom'],
				['Спрощені', 'Сірий градієнт', 'Користувацькі']],
			txt: [
				'Кнопки постов ',
				'Post buttons ',
				'Кнопки постів ']
		},
		noSpoilers: {
			sel: [
				['Откл.', 'Серое', 'Родное'],
				['Disable', 'Grey', 'Native'],
				['Вимк.', 'Сіре', 'Рідне']],
			txt: [
				'Раскрытие текстовых спойлеров',
				'Text spoilers expansion',
				'Розкриття текстових спойлерів']
		},
		noPostNames: [
			'Скрывать имена в постах',
			'Hide poster names',
			'Ховати імена в постах'],
		correctTime: [
			'Коррекция времени в постах* ',
			'Time correction in posts* ',
			'Корекція часу в постах* '],
		timeOffset: [
			'разница (ч) ',
			'time offset (h) ',
			'різниця (год) '],
		timePattern: [
			'Шаблон поиска',
			'Search pattern',
			'Шаблон пошуку'],
		timeRPattern: [
			'Шаблон замены',
			'Replace pattern',
			'Шаблон заміни'],

		// "Images" tab
		expandImgs: {
			sel: [
				['Откл.', 'В посте', 'По центру'],
				['Disable', 'In post', 'By center'],
				['Вимк.', 'В пості', 'По центру']],
			txt: [
				'Раскрывать картинки по клику',
				'Expand images on click',
				'Розгортати зображення по кліку']
		},
		imgNavBtns: [
			'Добавлять кнопки навигации по картинкам',
			'Add buttons to navigate images',
			'Додавати кнопки навігації по зображеннях'],
		imgInfoLink: [
			'Имя файла под раскрытой картинкой',
			'Show file name under expanded image',
			'Імʼя файлу під розкритим зображенням'],
		resizeDPI: [
			'Не растягивать на дисплеях с высоким DPI',
			'Donʼt upscale images on high DPI displays',
			'Не розтягувати на дисплеях з високим DPI'],
		resizeImgs: {
			sel: [
				['Откл.', 'По ширине', 'Шир.+выс.'],
				['Disable', 'By width', 'Width+Height'],
				['Вимк.', 'По ширині', 'Шир.+выс.']],
			txt: [
				'Уменьшать при раскрытии в посте',
				'Fit to screen for expanding in post',
				'Зменшувати при розкритті в пості']
		},
		minImgSize: [
			'Миним. размер раскрытых картинок (px)',
			'Minimal size for expanded images (px)',
			'Мінім. розмір розгорнутих зображень (px)'],
		zoomFactor: [
			'Чувствительность зума картинок [1-100%]',
			'Images zoom sensibility [1-100%]',
			'Чутливість зуму зображень [1-100%]'],
		webmControl: [
			'Показывать контрол-бар для WebM',
			'Show control bar for WebM',
			'Показувати смугу керування для WebM'],
		webmTitles: [
			'Получать названия WebM из метаданных',
			'Load titles from WebM metadata',
			'Отримувати назви WebM з метаданих'],
		webmVolume: [
			'Громкость WebM по умолчанию [0-100%]',
			'Default volume for WebM [0-100%]',
			'Гучність WebM по замовчуванню [0-100%]'],
		minWebmWidth: [
			'Минимальная ширина WebM (px)',
			'Minimal width for WebM (px)',
			'Мінімальна ширина WebM (px)'],
		preLoadImgs: {
			sel: [
				['Откл.', 'Все', 'Без WebM'],
				['Disable', 'All', 'Non-WebM'],
				['Вимк.', 'Всі', 'Крім WebM']],
			txt: [
				'Предварительно загружать картинки*',
				'Preload images*',
				'Наперед завантажувати зображення*']
		},
		findImgFile: [
			'Распознавать файлы, встроенные в картинках*',
			'Detect embedded files in images*',
			'Розпізнавати файли, що вбудовані в зображення*'],
		openImgs: {
			sel: [
				['Откл.', 'Все подряд', 'Только GIF', 'Кроме GIF'],
				['Disable', 'All types', 'Only GIF', 'Non-GIF'],
				['Вимк.', 'Всі', 'Лише GIF', 'Крім GIF']],
			txt: [
				'Заменять тамбнейлы на оригиналы*',
				'Replace thumbnails with original images*',
				'Замінювати зображення на оригінали*']
		},
		imgSrcBtns: [
			'Добавлять кнопки "Поиск" для картинок',
			'Add "Search" buttons for images',
			'Додавати кнопки "Пошук" для зображень'],
		imgNames: {
			sel: [
				['Не изменять', 'Настоящие (сокр.)', 'Скрывать', 'Настоящие (полные)'],
				['Donʼt change', 'Original (trunc.)', 'Hide', 'Original (full)'],
				['Не змінювати', 'Справжні (скороч.)', 'Ховати', 'Справжні (повні)']],
			txt: [
				'имена картинок',
				'filenames',
				'імена зображень']
		},
		maskVisib: [
			'Видимость для NSFW-картинок [0-100%]',
			'Visibility for NSFW images [0-100%]',
			'Видимість для NSFW-зображень [0-100%]'],

		// "Links" tab
		linksNavig: [
			'Навигация постов по >>ссылкам* ',
			'Posts navigation by >>links* ',
			'Навігація постів по >>посиланнях* '],
		linksOver: [
			'Появление ',
			'Appearance ',
			'Поява '],
		linksOut: [
			'Пропадание (мс)',
			'Disappearance (ms)',
			'Зникнення (мс)'],
		markViewed: [
			'Помечать просмотренные посты',
			'Mark viewed posts',
			'Позначати переглянуті пости'],
		strikeHidd: [
			'Зачеркивать >>ссылки на скрытые посты',
			'Strike >>links to hidden posts',
			'Закреслювати >>посилання на сховані пости'],
		removeHidd: [
			'Также удалять из обратных >>ссылок',
			'Also remove from >>backlinks',
			'Також видаляти із зворотніх >>посилань'],
		noNavigHidd: [
			'Не отображать превью для скрытых постов',
			'Donʼt show previews for hidden posts',
			'Не показувати превʼю до cхованих постів'],
		markMyLinks: [
			'Помечать ссылки на мои посты как (You)',
			'Mark links to my posts with (You)',
			'Позначати посилання на мої пости як (You)'],
		crossLinks: [
			'Заменять http:// на >>/b/ссылки*',
			'Replace http:// with >>/b/links*',
			'Замінювати https:// на >>/b/посилання*'],
		decodeLinks: [
			'Декодировать %D0%A5%D1 в ссылках*',
			'Decode %D0%A5%D1 in links*',
			'Декодувати %D0%A5%D1 в посиланнях*'],
		insertNum: [
			'Вставлять >>ссылку по клику на №поста*',
			'Insert >>link on №postnumber click*',
			'Вставляти >>посилання на клік по №посту*'],
		addOPLink: [
			'>>ссылка при ответе на OP в списке тредов',
			'Insert >>link when replying to OP on threads list',
			'>>посилання при відповіді на OP у списці тредів'],
		addImgs: [
			'Загружать картинки к jpg/png/gif ссылкам*',
			'Load images for jpg/png/gif links*',
			'Додавати зображення до jpg/png/gif посилань*'],
		addMP3: [
			'Плеер к mp3 ссылкам* ',
			'Player for mp3 links* ',
			'Плеєр до mp3 посилань* '],
		addVocaroo: [
			'к Vocaroo ссылкам*',
			'for Vocaroo links*',
			'до Vocaroo посилань*'],
		addVimeo: [
			'Добавлять плеер к Vimeo ссылкам*',
			'Add player for Vimeo links*',
			'Додавати плеєр до Vimeo посилань*'],
		embedYTube: {
			sel: [
				['Ничего', 'Превью+плеер', 'Плеер по клику'],
				['Nothing', 'Preview+player', 'On click player'],
				['Нічого', 'Превʼю+плеєр', 'Плеєр по кліку']],
			txt: [
				'к YouTube ссылкам* ',
				'for YouTube links* ',
				'до YouTube посилань* ']
		},
		YTubeTitles: [
			'Загружать названия к YouTube ссылкам*',
			'Load titles for YouTube links*',
			'Отримувати назви до YouTube посилань*'],
		ytApiKey: [
			'Ключ YT API*',
			'YT API Key*',
			'Ключ YT API*'],

		// "Form" tab
		ajaxPosting: [
			'Отправка постов без перезагрузки*',
			'Posting without page refresh*',
			'Постування без оновлення сторінки*'],
		postSameImg: [
			'Возможность отправки одинаковых картинок',
			'Ability to post duplicate images',
			'Можливість надсилання однакових зображень'],
		removeEXIF: [
			'Удалять EXIF из JPEG ',
			'Remove EXIF from JPEG ',
			'Видаляти EXIF з JPEG '],
		removeFName: {
			sel: [
				['Не изменять', 'Удалять', 'Unixtime', 'Unixtime-random'],
				['Donʼt change', 'Clear', 'Unixtime', 'Unixtime-random'],
				['Не змінювати', 'Видаляти', 'Unixtime', 'Unixtime-random']],
			txt: [
				'имена файлов',
				'file names',
				'імена файлів']
		},
		sendErrNotif: [
			'Оповещать в заголовке об ошибке отправки',
			'Inform in title about post send error',
			'Сповіщати в заголовку про помилку надсилання'],
		scrAfterRep: [
			'Перемещаться в конец треда после отправки',
			'Scroll to bottom after reply',
			'Гортати в кінець треду після надсилання'],
		fileInputs: {
			sel: [
				['Откл.', 'Упрощ.', 'Превью'],
				['Disable', 'Simple', 'Preview'],
				['Вимкн.', 'Спрощене', 'Превʼю']],
			txt: [
				'Улучшенное поле добавления файлов',
				'Enhanced file attachment field',
				'Покращене поле додавання файлів']
		},
		addPostForm: {
			sel: [
				['Сверху', 'Внизу', 'Скрытая'],
				['At top', 'At bottom', 'Hidden'],
				['Вгорі', 'Знизу', 'Прихована']],
			txt: [
				'Форма ответа в треде',
				'Reply form display in thread',
				'Форма відповіді в треді']
		},
		spacedQuote: [
			'Вставлять пробел при цитировании "> "',
			'Insert a space when quoting "> "',
			'Вставляти пробіл при цитуванні "> "'],
		favOnReply: [
			'Добавлять тред в "Избранное" после ответа',
			'Add thread to "Favorites" after reply',
			'Додавати тред в "Вибране" після відповіді'],
		warnSubjTrip: [
			'Оповещать о трипкоде в поле "Тема"',
			'Warn about a tripcode in "Subject" field',
			'Сповіщувати про трипкод в полі "Тема"'],
		addSageBtn: [
			'Кнопка Sage вместо поля "Email" ',
			'Replace "Email" with Sage button ',
			'Кнопка Sage замість "E-mail" '],
		saveSage: [
			'Помнить сажу',
			'Remember sage',
			'Памʼятати сажу'],
		altCaptcha: [
			'Использовать альтернативную капчу',
			'Use alternative captcha',
			'Використовувати альтернативну капчу'],
		capUpdTime: [
			'Интервал обновления капчи (сек)',
			'Captcha update interval (sec)',
			'Інтервал оновлення капчі (сек)'],
		captchaLang: {
			sel: [
				['Откл.', 'Eng', 'Rus'],
				['Disable', 'Eng', 'Rus'],
				['Вимк.', 'Eng', 'Ukr']],
			txt: [
				'Принудительный язык ввода капчи',
				'Forced captcha input language',
				'Примусова мова вводу капчі']
		},
		addTextBtns: {
			sel: [
				['Откл.', 'Графические', 'Упрощённые', 'Стандартные'],
				['Disable', 'As images', 'As text', 'Standard'],
				['Вимк.', 'Графічні', 'Спрощені', 'Стандартні']],
			txt: [
				'Кнопки разметки текста ',
				'Text markup buttons ',
				'Кнопки розмітки тексту ']
		},
		txtBtnsLoc: [
			'Внизу',
			'At bottom',
			'Знизу'],
		userPassw: [
			'Постоянный пароль',
			'Fixed password',
			'Постійний пароль'],
		userName: [
			'Постоянное имя',
			'Fixed name',
			'Постійне імʼя'],
		noBoardRule: [
			'Правила ',
			'Rules ',
			'Правила '],
		noPassword: [
			'Пароль ',
			'Password ',
			'Пароль '],
		noName: [
			'Имя ',
			'Name ',
			'Імʼя '],
		noSubj: [
			'Тему',
			'Subject',
			'Тему'],

		// "Common" tab
		scriptStyle: {
			sel: [
				['Gradient darkblue', 'Gradient blue', 'Solid grey', 'Transparent blue', 'Square dark'],
				['Gradient darkblue', 'Gradient blue', 'Solid grey', 'Transparent blue', 'Square dark'],
				['Gradient darkblue', 'Gradient blue', 'Solid grey', 'Transparent blue', 'Square dark']],
			txt: [
				'Стиль Dollchan',
				'Dollchan style',
				'Стиль Dollchan']
		},
		userCSS: [
			'Пользовательский CSS',
			'User CSS',
			'Користувацький CSS'],
		animation: [
			'CSS3 анимация',
			'CSS3 animation',
			'CSS3 анімація'],
		hotKeys: [
			'Горячие клавиши',
			'Hotkeys',
			'Гарячі клавіші'],
		loadPages: [
			'Количество страниц, загружаемых по F5',
			'Number of pages that are loaded on F5 ',
			'Кількість сторінок, що завантажуються по F5'],
		panelCounter: {
			sel: [
				['Откл.', 'Все посты', 'Без скрытых'],
				['Disabled', 'All posts', 'Except hidden'],
				['Вимкн.', 'Усі пости', 'Крім схованих']],
			txt: [
				'Счетчик постов/картинок в треде',
				'Сounter for posts/images in thread',
				'Лічильник постів/зображень в треді']
		},
		rePageTitle: [
			'Название треда в заголовке вкладки*',
			'Show thread title in the page tab*',
			'Назва треду в заголовку вкладки*'],
		inftyScroll: [
			'Бесконечная прокрутка страниц',
			'Infinite scrolling for pages',
			'Нескінченна прокрутка сторінок'],
		hideReplies: [
			'Показывать только OP в списке тредов*',
			'Show only OP in threads list*',
			'Показувати лише OP в списку тредів*'],
		scrollToTop: [
			'Всегда перемещаться вверх в списке тредов',
			'Always scroll to top in the threads list',
			'Завжди гортати догори в списку тредів'],
		saveScroll: [
			'Запоминать позицию скролла в тредах',
			'Remember the scroll position in threads',
			'Пам`ятати позицію скролла в тредах'],
		favThrOrder: {
			sel: [
				['По номеру', 'По номеру (убыв)', 'По добавлению', 'По добавлению (убыв)'],
				['By number', 'By number (desc)', 'By adding', 'By adding (desc)'],
				['За номером', 'За номером (зменш)', 'По додаванню', 'По додаванню (зменш)']],
			txt: [
				'Сортировка в Избранном',
				'Sorting in Favorites',
				'Сортування в Вибраному']
		},
		favWinOn: [
			'Всегда открывать окно Избранное',
			'Always open the Favorites window',
			'Завжди відкривати вікно Вибране'],
		closePopups: [
			'Автоматически закрывать уведомления',
			'Close popups automatically',
			'Автоматично закривати сповіщення'],
		updDollchan: {
			sel: [
				['Откл.', 'Каждый день', 'Каждые 2 дня', 'Каждую неделю', 'Каждые 2 недели', 'Каждый месяц'],
				['Disable', 'Every day', 'Every 2 days', 'Every week', 'Every 2 weeks', 'Every month'],
				['Вимкн.', 'Щодня', 'Кожні 2 дні', 'Щотижня', 'Кожні 2 тижні', 'Щомісяця']],
			txt: [
				'Проверять обновления Dollchan',
				'Check for Dollchan updates',
				'Перевіряти оновлення Dollchan']
		}
	},

	// Main panel buttons: tooltips
	panelBtn: {
		attach: [
			'Прикрепить/Открепить панель',
			'Attach/Detach panel',
			'Закріпити/відкріпити панель'],
		cfg: [
			'Настройки',
			'Settings',
			'Налаштування'],
		hid: [
			'Скрытое',
			'Hidden',
			'Сховане'],
		fav: [
			'Избранное',
			'Favorites',
			'Вибране'],
		vid: [
			'Ссылки на видео',
			'Video links',
			'Посилання на відео'],
		refresh: [
			'Обновить',
			'Refresh',
			'Оновити'],
		goback: [
			'Назад на доску',
			'Return to board',
			'Назад до дошки'],
		gonext: [
			'На %s страницу',
			'Go to page %s',
			'До %s сторінки'],
		goup: [
			'В начало страницы',
			'Scroll to top',
			'Прогорнути догори'],
		godown: [
			'В конец страницы',
			'Scroll to bottom',
			'Прогорнути донизу'],
		expimg: [
			'Раскрыть все картинки',
			'Expand all images',
			'Розгорнути всі зображення'],
		maskimg: [
			'Режим NSFW',
			'NSFW mode',
			'Режим NSFW'],
		preimg: [
			'Предзагрузить картинки\r\n([Ctrl+Click] только для новых постов)',
			'Preload images\r\n([Ctrl+Click] for new posts only)',
			'Наперед завантажити зображення\r\n([Ctrl+Click] лише для нових постів)'],
		savethr: [
			'Сохранить на диск',
			'Save to disk',
			'Зберегти на диск'],
		'upd-on': [
			'Выключить автообновление треда',
			'Disable thread updater',
			'Вимкнути оновлювач треду'],
		'upd-off': [
			'Включить автообновление треда',
			'Enable thread updater',
			'Увімкнути оновлювач треду'],
		'audio-off': [
			'Звуковое оповещение о новых постах',
			'Sound notification about new posts',
			'Звукове сповіщення про нові пости'],
		catalog: [
			'Перейти в каталог',
			'Go to catalog',
			'Перейти до каталогу'],
		enable: [
			'Включить/выключить Dollchan',
			'Turn on/off the Dollchan',
			'Увімкнути/вимкнути Dollchan'],
		pcount: [
			'Постов в треде',
			'Posts in thread',
			'Постів у треді'],
		pcountNotHid: [
			'Постов в треде (без скрытых)',
			'Posts in thread (without hidden)',
			'Постів у треді (крім схованих)'],
		imglen: [
			'Картинок в треде',
			'Images in thread',
			'Зображень у треді'],
		posters: [
			'Постящих в треде',
			'Posters in thread',
			'Постувачів у треді']
	},

	// Post buttons: tooltips
	togglePost: [
		'Скрыть/Раскрыть пост',
		'Hide/Unhide post',
		'Сховати/показати пост'],
	toggleThr: [
		'Скрыть/Раскрыть тред',
		'Hide/Unhide thread',
		'Сховати/показати тред'],
	replyToPost: [
		'Ответить на пост',
		'Reply to post',
		'Відповісти на пост'],
	replyToThr: [
		'Ответить в тред',
		'Reply to thread',
		'Відповісти в тред'],
	expandThr: [
		'Развернуть тред',
		'Expand thread',
		'Розгорнути тред'],
	addFav: [
		'Добавить тред в Избранное',
		'Add thread to Favorites',
		'Додати тред в Вибране'],
	delFav: [
		'Убрать тред из Избранного',
		'Remove thread from Favorites',
		'Прибрати тред з Вибраного'],
	attachPview: [
		'Закрепить превью',
		'Attach preview',
		'Закріпити превʼю'],

	// Windows buttons: tooltips
	closeWindow: [
		'Закрыть окно',
		'Close window',
		'Закрити вікно'],
	closeReply: [
		'Закрыть форму',
		'Close form',
		'Закрити форму'],
	toPanel: [
		'Закрепить на панели',
		'Attach to panel',
		'Закріпити на панелі'],
	makeDrag: [
		'Сделать перетаскиваемым окном',
		'Make draggable window',
		'Зробити перетягуваним вікном'],
	underPost: [
		'Разместить форму после поста',
		'Move form under post',
		'Розмістити форму після посту'],
	clearForm: [
		'Очистить форму',
		'Clear form',
		'Очистити форму'],

	// Markup buttons: tooltips
	txtBtn: [
		['Жирный', 'Bold', 'Жирний'],
		['Курсив', 'Italic', 'Курсив'],
		['Подчеркнутый', 'Underlined', 'Підкреслений'],
		['Зачеркнутый', 'Strike', 'Закреслений'],
		['Спойлер', 'Spoiler', 'Спойлер'],
		['Код', 'Code', 'Код'],
		['Верхний индекс', 'Superscript', 'Верхній індекс'],
		['Нижний индекс', 'Subscript', 'Нижній індекс'],
		['Цитировать выделенное', 'Quote selected', 'Цитувати виділене']],

	// Drop-down menus: options
	selHiderMenu: { // "Hide" post button
		sel: [
			'Скрывать выделенное',
			'Hide selected text',
			'Ховати виділене'],
		name: [
			'Скрывать по имени',
			'Hide by name',
			'Ховати по імені'],
		trip: [
			'Скрывать по трипкоду',
			'Hide by tripcode',
			'Ховати по тріпкоду'],
		img: [
			'Скрывать по размеру картинки',
			'Hide by image size',
			'Ховати по розміру зображення'],
		imgn: [
			'Скрывать по имени картинки',
			'Hide by image name',
			'Ховати по імені зображення'],
		ihash: [
			'Скрывать схожие картинки',
			'Hide by similar images',
			'Ховати подібні зображення'],
		noimg: [
			'Скрывать без картинок',
			'Hide without images',
			'Ховати без зображень'],
		notext: [
			'Скрывать без текста',
			'Hide without text',
			'Ховати без тексту'],
		text: [
			'Скрыть схожий текст',
			'Hide similar text',
			'Сховати схожий текст'],
		refs: [
			'Скрыть с ответами',
			'Hide with replies',
			'Сховати з відповідями'],
		refsonly: [
			'Скрывать ответы',
			'Hide replies',
			'Ховати відповіді']
	},
	selExpandThr: [ // "Expand thread" post button
		['+10 постов', 'Последние 30', 'Последние 50', 'Последние 100', 'Весь тред'],
		['+10 posts', 'Last 30 posts', 'Last 50 posts', 'Last 100 posts', 'Entire thread'],
		['+10 постів', 'Останні 30', 'Останні 50', 'Останні 100', 'Весь тред']],
	selAjaxPages: [ // "Refresh" panel button
		['1 страница', '2 страницы', '3 страницы', '4 страницы', '5 страниц'],
		['1 page', '2 pages', '3 pages', '4 pages', '5 pages'],
		['1 сторінка', '2 сторінки', '3 сторінки', '4 сторінки', '5 сторінок']],
	selSaveThr: [ // "Save to disk" panel button
		['Скачать весь тред', 'Скачать картинки'],
		['Download thread', 'Download images'],
		['Завантажити весь тред', 'Завантажити зображення']],
	selAudioNotif: [ // "Sound notification" panel button
		['Каждые 30 сек.', 'Каждую минуту', 'Каждые 2 мин.', 'Каждые 5 мин.'],
		['Every 30 sec.', 'Every minute', 'Every 2 min.', 'Every 5 min.'],
		['Кожні 30 сек.', 'Щохвилини', 'Кожні 2 хв.', 'Кожні 5 хв.']],
	reportPost: [
		'Жалоба на пост',
		'Report post',
		'Скарга на пост'],
	reportThr: [
		'Жалоба на тред',
		'Report thread',
		'Скарга на тред'],
	markMyPost: [
		'Пометить пост как мой',
		'Mark post as mine',
		'Відмітити пост як мій'
	],
	deleteMyPost: [
		'Убрать из моих постов',
		'Delete from my posts',
		'Прибрати з моїх постів'
	],

	// Sauce search for images and video frames
	saveAs: [
		'Сохр. как ',
		'Save as ',
		'Збер. як '],
	origName: [
		'Оригинальное имя',
		'Original name',
		'Оригінальне імʼя'],
	metaName: [
		'Имя из метаданных',
		'Name from metadata',
		'Імʼя з метаданих'],
	boardName: [
		'Имя, присвоенное доской',
		'Name assigned by the board',
		'Імʼя, присвоєне дошкою'],
	searchIn: [
		'Искать в ',
		'Search in ',
		'Шукати в '],
	frameSearch: [
		'Поиск кадра в ',
		'Frame search in ',
		'Пошук кадру в '],
	gotoResults: [
		'Перейти к результатам поиска',
		'Go to search results',
		'Перейти до результатів пошуку'],
	getFrameLinks: [
		'Получить ссылки для поиска этого кадра',
		'Get links to search this frame',
		'Отримати посилання для пошуку цього кадру'],
	saveFrame: [
		'Сохранить полученный кадр',
		'Save the received frame',
		'Зберегти отриманий кадр'],
	errSaucenao: [
		'Ошибка: не могу загрузить на saucenao.com',
		'Error: canʼt load to saucenao.com',
		'Помилка: не можу завантажити на saucenao.com'],

	// Hotkeys editor
	hotKeyEdit: [[
		// Ru
		'%l%i24 – предыдущая страница/картинка%/l',
		'%l%i217 – следующая страница/картинка%/l',
		'%l%i21 – тред (на доске)/пост (в треде) ниже%/l',
		'%l%i20 – тред (на доске)/пост (в треде) выше%/l',
		'%l%i31 – пост (на доске) ниже%/l',
		'%l%i30 – пост (на доске) выше%/l',
		'%l%i23 – скрыть пост/тред%/l',
		'%l%i32 – перейти в тред%/l',
		'%l%i33 – развернуть тред%/l',
		'%l%i211 – раскрыть картинку в посте%/l',
		'%l%i22 – быстрый ответ%/l',
		'%l%i25t – отправить пост%/l',
		'%l%i210 – открыть/закрыть "Настройки"%/l',
		'%l%i26 – открыть/закрыть "Избранное"%/l',
		'%l%i27 – открыть/закрыть "Скрытое"%/l',
		'%l%i218 – открыть/закрыть "Видео"%/l',
		'%l%i28 – открыть/закрыть панель%/l',
		'%l%i29 – вкл./выкл. режим NSFW%/l',
		'%l%i40 – обновить тред (в треде)%/l',
		'%l%i212t – жирный%/l',
		'%l%i213t – курсив%/l',
		'%l%i214t – зачеркнутый%/l',
		'%l%i215t – спойлер%/l',
		'%l%i216t – код%/l'], [
		// En
		'%l%i24 – previous page/image%/l',
		'%l%i217 – next page/image%/l',
		'%l%i21 – thread (on board)/post (in thread) below%/l',
		'%l%i20 – thread (on board)/post (in thread) above%/l',
		'%l%i31 – on board post below%/l',
		'%l%i30 – on board post above%/l',
		'%l%i23 – hide post/thread%/l',
		'%l%i32 – go to thread%/l',
		'%l%i33 – expand thread%/l',
		'%l%i211 – expand postʼs images%/l',
		'%l%i22 – quick reply%/l',
		'%l%i25t – send post%/l',
		'%l%i210 – open/close "Settings"%/l',
		'%l%i26 – open/close "Favorites"%/l',
		'%l%i27 – open/close "Hidden"%/l',
		'%l%i218 – open/close "Videos"%/l',
		'%l%i28 – open/close main panel%/l',
		'%l%i29 – toggle NSFW mode%/l',
		'%l%i40 – update thread%/l',
		'%l%i212t – bold%/l',
		'%l%i213t – italic%/l',
		'%l%i214t – strike%/l',
		'%l%i215t – spoiler%/l',
		'%l%i216t – code%/l'], [
		// Ua
		'%l%i24 – попередня сторінка/зображення%/l',
		'%l%i217 – наступна сторінка/зображення%/l',
		'%l%i21 – тред (на дошці)/пост (в треді) нижче%/l',
		'%l%i20 – тред (на дошці)/пост (в треді) вище%/l',
		'%l%i31 – пост (на дошці) нижче%/l',
		'%l%i30 – пост (на дошці) вище%/l',
		'%l%i23 – приховати пост/тред%/l',
		'%l%i32 – перейти в тред%/l',
		'%l%i33 – розгорнути тред%/l',
		'%l%i211 – розгорнути зображення в пості%/l',
		'%l%i22 – швидка відповідь%/l',
		'%l%i25t – відправити пост%/l',
		'%l%i210 – відкрити/закрити "Налаштування"%/l',
		'%l%i26 – відкрити/закрити "Вибране"%/l',
		'%l%i27 – відкрити/закрити "Сховане"%/l',
		'%l%i218 – відкрити/закрити "Посилання на відео"%/l',
		'%l%i28 – відкрити/закрити панель%/l',
		'%l%i29 – увімкнути/вимкнути режим NSFW%/l',
		'%l%i40 – оновити тред (в треді)%/l',
		'%l%i212t – жирний%/l',
		'%l%i213t – курсив%/l',
		'%l%i214t – закреслений%/l',
		'%l%i215t – спойлер%/l',
		'%l%i216t – код%/l']],

	// Time correction in posts
	cTimeError: [
		'Неправильные настройки времени',
		'Invalid time settings',
		'Неправильні налаштування часу'],
	month: [
		['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
		['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		['січ', 'лют', 'бер', 'кві', 'тра', 'чер', 'лип', 'сер', 'вер', 'жов', 'лис', 'гру']],
	fullMonth: [
		['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
			'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
		['January', 'February', 'March', 'April', 'May', 'June',
			'July', 'August', 'September', 'October', 'November', 'December'],
		['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня',
			'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня']],
	week: [
		['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт'],
		['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		['Нед', 'Пон', 'Вів', 'Сер', 'Чет', 'Птн', 'Сбт']],
	monthDict: {
		/* eslint-disable */
		янв: 0, фев: 1, мар: 2, апр: 3, май: 4, мая: 4, июн: 5, июл: 6, авг: 7, сен: 8, окт: 9, ноя: 10, дек: 11,
		jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
		січ: 0, лют: 1, бер: 2, кві: 3, тра: 4, чер: 5, лип: 6, сер: 7, вер: 8, жов: 9, лис: 10, гру: 11
		/* eslint-enable */
	},

	// Spells: popups
	seSyntaxErr: [
		'синтаксическая ошибка в аргументе спелла: #%s',
		'syntax error in argument of spell: #%s',
		'синтаксична помилка в аргументі спеллу: #%s'],
	seUnknown: [
		'неизвестный спелл: #%s',
		'unknown spell: #%s',
		'невідомий спелл: #%s'],
	seMissOp: [
		'пропущен оператор',
		'missing operator',
		'пропущено оператор'],
	seMissArg: [
		'пропущен аргумент спелла: #%s',
		'missing argument of spell: #%s',
		'пропущено аргумент спеллу: #%s'],
	seMissSpell: [
		'пропущен спелл',
		'missing spell',
		'пропущено спелл'],
	seErrRegex: [
		'синтаксическая ошибка в регулярном выражении: %s',
		'syntax error in regular expression: %s',
		'синтаксична помилка в регулярному виразі: %s'],
	seUnexpChar: [
		'неожиданный символ: %s',
		'unexpected character: %s',
		'неочікуваний символ: %s'],
	seMissClBkt: [
		'пропущена закрывающая скобка',
		'missing \')\' in expression',
		'пропущено закривну дужку'],
	seRepsInParens: [
		'спелл #%s не должен располагаться в скобках',
		'spell #%s shouldnʼt be inside parentheses',
		'спелл #%s не може бути в дужках'],
	seOpInReps: [
		'недопустимо использовать оператор %s со спеллами #rep и #outrep',
		'donʼt use operator %s with spells #rep & #outrep',
		'неприпустимо використовувати оператор %s зі спеллами #rep и #outrep'],
	seRow: [
		' (строка ',
		' (row ',
		' (рядок '],
	seCol: [
		', столбец ',
		', column ',
		', стовпчик '],

	// Data editor
	editInTxt: [
		'Правка в текстовом формате',
		'Edit in text format',
		'Правка в текстовому форматі'],
	editor: {
		cfg: [
			'Редактирование настроек',
			'Edit settings',
			'Редагування налаштувань'],
		hidden: [
			'Редактирование скрытых тредов',
			'Edit hidden threads',
			'Редагування схованих тредів'],
		favor: [
			'Редактирование избранного',
			'Edit favorites',
			'Редагування вибраного'],
		css: [
			'Редактирование CSS',
			'Edit CSS',
			'Редагування CSS']
	},

	// Settings import/export/clearing
	fileImpExp: [
		'Импорт/экспорт настроек в файл',
		'Import/export config to file',
		'Імпорт/експорт налаштувань до файлу'],
	fileToData: [
		'Загрузить данные из файла',
		'Load data from a file',
		'Завантажити дані з файла'],
	dataToFile: [
		'Получить файл</a> с данными',
		'Get the file</a> with data',
		'Отримати файл</a> з даними'],
	globalCfg: [
		'Глобальные настройки',
		'Global config',
		'Глобальні налаштування'],
	loadGlobal: [
		'и применить к этому домену',
		'and apply to this domain',
		'і застосувати до цього домену'],
	saveGlobal: [
		'текущие настройки как глобальные',
		'current config as global',
		'поточні налаштування як глобальні'],
	descrGlobal: [
		'Глобальные настройки применяются по умолчанию<br>при первом посещении других доменов',
		'Global config is applied by default<br>on the first visit of other domains',
		'Глобальні налаштування застосовуються по замовчуванню<br>під час першого відвідання інших доменів'],
	resetCfg: [
		'Сбросить в настройки по умолчанию',
		'Reset config to defaults',
		'Скинути в налаштування по замовчуванню'],
	resetData: [
		'Очистить выбранные данные',
		'Reset selected data',
		'Очистити обрані дані'],
	allDomains: [
		'для всех доменов',
		'for all domains',
		'для всіх доменів'],
	delEntries: [
		'Удалить выбранные записи',
		'Delete selected entries',
		'Видалити обрані записи'],
	saveChanges: [
		'Сохранить внесенные изменения',
		'Save your changes',
		'Зберегти внесені зміни'],
	hidPostThr: [
		'Скрытые посты и треды',
		'Hidden posts and threads',
		'Сховані пости та треди'],
	myPosts: [
		'Мои посты',
		'My posts',
		'Мої пости'],

	// Settings window: Common/Info tab
	checkNow: [
		'Проверить сейчас',
		'Check now',
		'Перевірити зараз'],
	updAvail: [
		'Доступно обновление Dollchan: %s',
		'Dollchan update available: %s!',
		'Доступне оновлення Dollchan: %s'],
	newCommitsAvail: [
		'Обнаружены новые исправления: %s',
		'New fixes detected: %s',
		'Виявлено нові виправлення: %s'],
	changeLog: [
		'Список изменений',
		'List of changes',
		'Список змін'],
	haveLatestStable: [
		'Ваша версия %s является последней из стабильных.',
		'Your %s version is the latest from stable versions.',
		'Ваша версія %s є останньою зі стабільних.'],
	haveLatestCommit: [
		'Ваша версия %s содержит последние исправления.',
		'Your %s version contains all the latest fixes.',
		'Ваша версія %s містить всі останні виправлення.'],
	thrViewed: [
		'Тредов посещено',
		'Threads visited',
		'Тредів відвідано'],
	thrCreated: [
		'Тредов создано',
		'Threads created',
		'Тредів створено'],
	thrHidden: [
		'Тредов скрыто',
		'Threads hidden',
		'Тредів сховано'],
	postsSent: [
		'Постов отправлено',
		'Posts sent',
		'Постів надіслано'],
	total: [
		'Всего',
		'Total',
		'Всього'],
	debug: [
		'Отладка',
		'Debug',
		'Відлагодження'],
	infoDebug: [
		'Информация для отладки',
		'Information for debugging',
		'Інформація для відлагодження'],

	// Favorites window: tooltips
	infoCount: [
		'Обновить счетчики постов',
		'Refresh posts counters',
		'Оновити лічильники постів'],
	infoPage: [
		'Проверить положение тредов (до 10-й страницы)',
		'Check for threads position (up to 10th page)',
		'Перевірити актуальність тредів (до 10 сторінки)'],
	clrDeleted: [
		'Очистить недоступные (404) треды',
		'Clear inaccessible (404) threads',
		'Очистити недоступні (404) треди'],
	oldPosts: [
		'Постов при последнем посещении',
		'Posts at the last visit',
		'Постів під час останнього відвідування'],
	newPosts: [
		'Количество новых постов',
		'Number of new posts',
		'Кількість нових постів'],
	myPostsRep: [
		'Ответов на ваши посты',
		'Replies to your posts',
		'Відповідей на ваші пости'],
	thrPage: [
		'Тред на @странице',
		'Thread on @page',
		'Тред на @сторінці'],
	goToThread: [
		'Перейти к треду',
		'Go to the thread',
		'Перейти до треду'],
	goToBoard: [
		'Перейти к доске',
		'Go to the board',
		'Перейти до дошки'],
	toggleEntries: [
		'Скрыть/раскрыть записи',
		'Hide/expand entries',
		'Сховати/розкрити записи'],

	// Video links: tooltips
	hideLnkList: [
		'Скрыть/Показать список ссылок',
		'Hide/Unhide list of links',
		'Сховати/показати перелік посилань'],
	expandVideo: [
		'Развернуть/Свернуть видео',
		'Expand/Collapse video',
		'Розгорнути/згорнути відео'],
	prevVideo: [
		'Предыдущее видео',
		'Previous video',
		'Попереднє відео'],
	nextVideo: [
		'Следующее видео',
		'Next video',
		'Наступне відео'],
	duration: [
		'Продолжительность: ',
		'Duration: ',
		'Тривалість: '],
	published: [
		'опубликовано: ',
		'published: ',
		'опубліковано: '],
	author: [
		'Автор: ',
		'Author: ',
		'Автор: '],
	views: [
		'просмотров: ',
		'views: ',
		'переглядів: '],

	// Postform file inputs: tooltips
	pasteImage: [
		'Ctrl+V - вставить картинку из буфера',
		'Ctrl+V - paste an image from clipboard',
		'Ctrl+V - додати зображення з буферу'],
	dropFileHere: [
		'Бросьте сюда файл(ы) или ссылку',
		'Drop file(s) or link here',
		'Киньте сюди файл(и) чи посилання'],
	youCanDrag: [
		'Можно перетаскивать картинки и ссылки на файлы\r\nпрямо со страницы или других сайтов',
		'You can drag images and file links\r\ndirectly from the page or other sites',
		'Можна перетягувати зображення чи посилання на файли\r\nбезпосередньо зі сторінки чи інших сайтів'],
	removeFile: [
		'Удалить файл',
		'Remove file',
		'Видалити файл'],
	renameFile: [
		'Переименовать файл',
		'Rename file',
		'Перейменувати файл'],
	spoilFile: [
		'Спойлер',
		'Spoiler',
		'Спойлер'],
	addManually: [
		'Ввести ссылку на файл вручную',
		'Enter a link to the file manually',
		'Ввести посилання на файл вручну'],
	enterTheLink: [
		'Введите ссылку и нажмите \'+\'',
		'Enter the link and click \'+\'',
		'Введіть посилання та натисніть \'+\''],
	helpAddFile: [
		'Встроить ogg/rar/zip/7z в картинку',
		'Embed ogg/rar/zip/7z into the image',
		'Вбудувати ogg/rar/zip/7z в зображення'],

	// Post images: tooltips
	expImgInline: [
		'[Click] открыть в посте, [Ctrl+Click] по центру',
		'[Click] expand in post, [Ctrl+Click] by center',
		'[Click] розгорнути в пості, [Ctrl+Click] в центрі'],
	expImgFull: [
		'[Click] открыть по центру, [Ctrl+Click] в посте',
		'[Click] expand by center, [Ctrl+Click] in post',
		'[Click] розгорнути в центрі, [Ctrl+Click] в пості'],
	nextImg: [
		'Следующая картинка',
		'Next image',
		'Наступне зображення'],
	prevImg: [
		'Предыдущая картинка',
		'Previous image',
		'Попереднє зображення'],
	rotateImg: [
		'Повернуть вправо',
		'Rotate right',
		'Повернути вправо'],
	autoPlayOn: [
		'Автоматически воспроизводить следующее видео',
		'Automatically play the next video',
		'Автоматично відтворювати наступне відео'],
	autoPlayOff: [
		'Отключить автовоспроизведение',
		'Disable autoplay',
		'Відключити автовідтворення'],
	downloadFile: [
		'Скачать содержащийся в картинке файл',
		'Download embedded file from the image',
		'Завантажити файл, що міститься в зображенні'],
	openOriginal: [
		'Открыть оригинал в новой вкладке',
		'Open the original image in new tab',
		'Відкрити оригінал в новій вкладці'],

	// Threads/images download: popups
	loadImage: [
		'Загружаются картинки',
		'Loading images',
		'Завантажуються зображення'],
	loadFile: [
		'Загружаются файлы',
		'Loading files',
		'Завантажуються файли'],
	cantLoad: [
		'Не могу загрузить',
		'Canʼt load',
		'Не можу завантажити'],
	willSavePview: [
		'Будет сохранено превью',
		'Thumbnail will be saved',
		'Буде збережено превʼю'],
	loadErrors: [
		'Во время загрузки произошли ошибки:',
		'An error occurred during the loading:',
		'Під час завантаження сталися помилки:'],

	// Ajax: popups
	succDeleted: [
		'Успешно удалено!',
		'Succesfully deleted!',
		'Успішно видалено!'],
	succReported: [
		'Жалоба успешно отправлена',
		'Succesfully reported',
		'Скарга успішно відправлена'],
	errDelete: [
		'Не могу удалить',
		'Canʼt delete',
		'Не можу видалити'],
	fileCorrupt: [
		'Файл повреждён',
		'File is corrupt',
		'Файл пошкоджено'],
	errCorruptData: [
		'Ошибка: сервер отправил повреждённые данные',
		'Error: server sent corrupted data',
		'Помилка: сервер надіслав пошкоджені дані'],
	noConnect: [
		'Ошибка подключения',
		'Connection failed',
		'Помилка зʼєднання'],
	thrNotFound: [
		'Тред недоступен',
		'Thread is unavailable',
		'Тред недоступний'],
	thrClosed: [
		'Тред закрыт',
		'Thread is closed',
		'Тред закрито'],
	thrArchived: [
		'Тред в архиве',
		'Thread is archived',
		'Тред заархівовано'],
	stormWallCheck: [
		'Проверка StormWall защиты от DDoS атак...',
		'Checking for the StormWall DDoS protection...',
		'Перевірка StormWall захисту від DDoS атак...'],
	stormWallErr: [
		'Пожалуйста, решите капчу StormWall защиты',
		'Please resolve the StormWall protection captcha',
		'Будь ласка, вирішіть капчу StormWall захисту'],

	// Other warnings
	internalError: [
		'Внутренняя ошибка:\n',
		'Internal error:\n',
		'Внутрішня помилка:\n'],
	postNotFound: [
		'Пост не найден',
		'Post not found',
		'Пост не знайдено'],
	noHidThr: [
		'Нет скрытых тредов…',
		'No hidden threads…',
		'Немає схованих постів…'],
	noFavThr: [
		'Нет избранных тредов…',
		'Favorites is empty…',
		'Немає вибраних тредів…'],
	noVideoLinks: [
		'Нет ссылок на видео…',
		'No video links…',
		'Немає посилань на відео…'],
	invalidData: [
		'Некорректный формат данных',
		'Incorrect data format',
		'Некоректний формат даних'],
	noGlobalCfg: [
		'Глобальные настройки не найдены',
		'Global config not found',
		'Глобальні налаштування не знайдено'],
	subjHasTrip: [
		'Поле "Тема" содержит трипкод!',
		'"Subject" field contains a tripcode!',
		'Поле "Тема" містить трипкод!'],
	errMsEdgeWebm: [
		'Загрузите скрипт для воспроизведения WebM (VP9/Opus)',
		'Please load a script to play WebM (VP9/Opus)',
		'Завантажте скрипт для відтворення WebM (VP9/Opus)'],
	errFormLoad: [
		'Не удаётся загрузить форму ответа',
		'Canʼt load the reply form',
		'Не вдалося завантажити форму відповіді'
	],

	// Single words
	second    : ['с', 's', 'с'],
	sizeByte  : [' Байт', ' Byte', ' Байт'],
	sizeKByte : [' КБ', ' KB', ' КБ'],
	sizeMByte : [' МБ', ' MB', ' МБ'],
	sizeGByte : [' ГБ', ' GB', ' ГБ'],
	name      : ['Имя', 'Name', 'Імʼя'],
	subj      : ['Тема', 'Subject', 'Тема'],
	mail      : ['Почта', 'Email', 'Пошта'],
	video     : ['Видео', 'Video', 'Відео'],
	cap       : ['Капча', 'Captcha', 'Капча'],
	add       : ['Добавить', 'Add', 'Додати'],
	apply     : ['Применить', 'Apply', 'Застосувати'],
	cancel    : ['Отмена', 'Cancel', 'Скасувати'],
	clear     : ['Очистить', 'Clear', 'Очистити'],
	refresh   : ['Обновить', 'Refresh', 'Оновити'],
	save      : ['Сохранить', 'Save', 'Зберегти'],
	load      : ['Загрузить', 'Load', 'Завантажити'],
	edit      : ['Правка', 'Edit', 'Правка'],
	file      : ['Файл', 'File', 'Файл'],
	global    : ['Глобальные', 'Global', 'Глобальні'],
	reset     : ['Сброс', 'Reset', 'Скинути'],
	remove    : ['Удалить', 'Remove', 'Видалити'],
	change    : ['Сменить', 'Change', 'Змінити'],
	page      : ['Страница', 'Page', 'Сторінка'],
	reply     : ['Ответ', 'Reply', 'Відповідь'],
	replies   : ['Ответы:', 'Replies:', 'Відповіді:'],
	makeReply : ['Ответить', 'Reply', 'Відповісти'],
	error     : ['Ошибка', 'Error', 'Помилка'],
	loading   : ['Загрузка…', 'Loading…', 'Завантаження…'],
	sending   : ['Отправка…', 'Sending…', 'Надсилання…'],
	checking  : ['Проверка…', 'Checking…', 'Перевірка…'],
	updating  : ['Обновление…', 'Updating…', 'Оновлення…'],
	deleting  : ['Удаление…', 'Deleting…', 'Видалення…'],
	deleted   : ['удалён', 'deleted', 'видалено'],
	hide      : ['Скрыть: ', 'Hide: ', 'Сховати: '],

	// Miscellaneous
	hidePosts: [
		'Скрыть посты',
		'Hide posts',
		'Сховати пости'],
	showPosts: [
		'Показать посты',
		'Show posts',
		'Показати пости'],
	getNewPosts: [
		'Получить новые посты',
		'Get new posts',
		'Отримати нові пости'],
	makeThr: [
		'Создать тред',
		'Create thread',
		'Створити тред'],
	collapseThr: [
		'Свернуть тред',
		'Collapse thread',
		'Згорнути тред'],
	hiddenThr: [
		'Скрытый тред',
		'Hidden thread',
		'Схований тред'],
	hideForm: [
		'Скрыть форму',
		'Hide form',
		'Сховати форму'],
	enableSage: [
		'Нажмите, чтобы включить сажу',
		'Click to enable sage',
		'Натисніть, щоб увімкнути сажу'],
	disableSage: [
		'САЖА включена! Нажмите, чтобы отключить',
		'SAGE enabled! Click to disable',
		'САЖА ввімкнена! Натисніть, щоб вимкнути'],
	postsOmitted: [
		'Пропущено ответов: ',
		'Posts omitted: ',
		'Пропущено відповідей: '],
	newPost: [
		['новый пост', 'новых поста', 'новых постов'],
		['new post', 'new posts', 'new posts'],
		['новий пост', 'нових пости', 'нових постів']],
	youReplies: [
		['ответ Вам', 'ответа Вам', 'ответов Вам'],
		['reply to You', 'replies to You', 'replies to You'],
		['відповідь Вам', 'відповіді Вам', 'відповідей Вам']],
	latestPost: [
		'Последний пост',
		'Latest post',
		'Останній пост'],
	donateMsg: [
		'<b>Спасибо за использование Dollchan Extension!</b><br>Вы можете поддержать проект пожертвованием',
		'<b>Thank You for using Dollchan Extension!</b><br>You can support the project by donating',
		'<b>Дякуємо за використання Dollchan Extension!</b><br>Ви можете підтримати проект пожертвою'],
	firefoxAddon: [
		'Firefox аддон</a> доступен!',
		'Firefox add-on</a> is available!',
		'Firefox аддон</a> доступний!']
};

/* ==[ GlobalVars.js ]== */

const doc = deWindow.document;
const emptyFn = Function.prototype;
const aProto = Array.prototype;
const gitWiki = 'https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/';
const gitRaw = 'https://raw.githubusercontent.com/SthephanShinkufag/Dollchan-Extension-Tools/master/';

let aib, Cfg, docBody, dTime, dummy, isExpImg, isPreImg, lang, locStorage, nav, needScroll, pByEl, pByNum, pr,
	sesStorage, updater;
let quotedText = '';
let visPosts = 2;
let topWinZ = 10;

/* ==[ Utils.js ]=============================================================================================
                                                    UTILS
=========================================================================================================== */

// DOM SEARCH

const $id = id => doc.getElementById(id);

const $q = (path, root = docBody) => root.querySelector(path);

const $Q = (path, root = docBody) => root.querySelectorAll(path);

const $match = (parent, ...rules) =>
	parent.split(', ').map(val => val + rules.join(', ' + val)).join(', ');

// DOM MODIFIERS

function $bBegin(sibling, html) {
	sibling.insertAdjacentHTML('beforebegin', html);
	return sibling.previousSibling;
}

function $aBegin(parent, html) {
	parent.insertAdjacentHTML('afterbegin', html);
	return parent.firstChild;
}

function $bEnd(parent, html) {
	parent.insertAdjacentHTML('beforeend', html);
	return parent.lastChild;
}

function $aEnd(sibling, html) {
	sibling.insertAdjacentHTML('afterend', html);
	return sibling.nextSibling;
}

function $replace(el, html) {
	el.insertAdjacentHTML('afterend', html);
	el.remove();
}

function $del(el) {
	el?.remove();
}

function $delAll(path, root = docBody) {
	root.querySelectorAll(path, root).forEach(el => el.remove());
}

function $add(html) {
	dummy.innerHTML = html;
	return dummy.firstElementChild;
}

function $button(value, title, fn, className = 'de-button') {
	const el = $add(`<input type="button" class="${ className }" value="${ value }" title="${ title }">`);
	el.addEventListener('click', fn);
	return el;
}

function $script(text) {
	const el = doc.createElement('script'); // We canʼt insert scripts directly as html
	el.type = 'text/javascript';
	el.textContent = text;
	doc.head.append(el);
	el.remove();
}

function $css(text) {
	if(nav.isSafari && !('flex' in docBody.style)) {
		text = text.replace(/(transform|transition|flex|align-items)/g, ' -webkit-$1');
	}
	return $bEnd(doc.head, `<style type="text/css">${ text }</style>`);
}

function $createDoc(html) {
	const myDoc = doc.implementation.createHTMLDocument('');
	myDoc.documentElement.innerHTML = html;
	return myDoc;
}

// CSS AND ATTRIBUTES

function $show(el) {
	el.style.removeProperty('display');
}

function $hide(el) {
	el.style.display = 'none';
}

function $toggle(el, needToShow = el.style.display) {
	if(needToShow) {
		el.style.removeProperty('display');
	} else {
		el.style.display = 'none';
	}
}

function $toggleAttr(el, name, value, isAdd) {
	if(isAdd) {
		el.setAttribute(name, value);
	} else {
		el.removeAttribute(name);
	}
}

function $animate(el, cName, isRemove = false) {
	el.addEventListener('animationend', function aEvent() {
		el.removeEventListener('animationend', aEvent);
		if(isRemove) {
			el.remove();
		} else {
			el.classList.remove(cName);
		}
	});
	el.classList.add(cName);
}

// OBJECT

const $hasProp = (obj, i) => Object.prototype.hasOwnProperty.call(obj, i);

function $isEmpty(obj) {
	for(const i in obj) {
		if($hasProp(obj, i)) {
			return false;
		}
	}
	return true;
}

// REGEXP

// Prepares a string to be used as a new RegExp argument
const escapeRegExp = str => (str + '').replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');

// Converts a string into regular expression
function strToRegExp(str, notGlobal) {
	const l = str.lastIndexOf('/');
	const flags = str.substr(l + 1);
	return new RegExp(str.substr(1, l - 1), notGlobal ? flags.replace('g', '') : flags);
}

// OTHER UTILS

const pad2 = i => i < 10 ? '0' + i : i;

const arrTags = (arr, start, end) => start + arr.join(end + start) + end;

const fixBrd = board => '/' + (board ? board + '/' : '');

const getFileName = url => url.substring(url.lastIndexOf('/') + 1);

const getFileExt = url => url.substring(url.lastIndexOf('.') + 1);

const cutFileExt = fileName => fileName.substring(0, fileName.lastIndexOf('.'));

// Converts bytes into KB/MB/GB
const prettifySize = val =>
	val > 512 * 1024 * 1024 ? (val / (1024 ** 3)).toFixed(2) + Lng.sizeGByte[lang] :
	val > 512 * 1024 ? (val / (1024 ** 2)).toFixed(2) + Lng.sizeMByte[lang] :
	val > 512 ? (val / 1024).toFixed(2) + Lng.sizeKByte[lang] :
	val.toFixed(2) + Lng.sizeByte[lang];

// Inserts the text at the cursor into an input field
function insertText(el, txt) {
	const { scrollTop, selectionStart: start } = el;
	el.value = el.value.substr(0, start) + txt + el.value.substr(el.selectionEnd);
	el.setSelectionRange(start + txt.length, start + txt.length);
	el.focus();
	el.scrollTop = scrollTop;
}

// Gets the error stack trace
function getErrorMessage(err) {
	if(err instanceof AjaxError) {
		return err.toString();
	}
	if(typeof err === 'string') {
		return err;
	}
	const { stack, name, message } = err;
	return Lng.internalError[lang] + (
		!stack ? `${ name }: ${ message }` :
		nav.isWebkit ? stack : `${ name }: ${ message }\n${ !nav.isFirefox ? stack : stack.replace(
			/^([^@]*).*\/(.+)$/gm,
			(str, fName, line) => `    at ${ fName ? `${ fName } (${ line })` : line }`
		) }`
	);
}

// Reads File into data
async function readFile(file, asText) {
	return new Promise(resolve => {
		const fr = new FileReader();
		fr.onload = e => resolve({ data: e.target.result });
		if(asText) {
			fr.readAsText(file);
		} else {
			fr.readAsArrayBuffer(file);
		}
	});
}

// Gets mime type depending on file name
function getFileMime(url) {
	const dotIdx = url.lastIndexOf('.') + 1;
	switch(dotIdx && url.substr(dotIdx).toLowerCase()) {
	case 'gif': return 'image/gif';
	case 'jpeg':
	case 'jpg': return 'image/jpeg';
	case 'mp4':
	case 'm4v': return 'video/mp4';
	case 'ogv': return 'video/ogv';
	case 'png': return 'image/png';
	case 'webm': return 'video/webm';
	case 'webp': return 'image/webp';
	default: return '';
	}
}

// Uploads files stored in a Blob
function downloadBlob(blob, name) {
	const url = nav.isMsEdge ? navigator.msSaveOrOpenBlob(blob, name) : deWindow.URL.createObjectURL(blob);
	const link = $bEnd(docBody, `<a href="${ url }" download="${ name }"></a>`);
	link.click();
	setTimeout(() => {
		deWindow.URL.revokeObjectURL(url);
		link.remove();
	}, 2e5);
}

// Checks if the color entered by the user is correct
function checkCSSColor(color) {
	if(!color || color === 'inherit' || color === 'currentColor') {
		return false;
	}
	if(color === 'transparent') {
		return true;
	}
	const image = doc.createElement('img');
	image.style.color = 'rgb(0, 0, 0)';
	image.style.color = color;
	if(image.style.color !== 'rgb(0, 0, 0)') {
		return true;
	}
	image.style.color = 'rgb(255, 255, 255)';
	image.style.color = color;
	return image.style.color !== 'rgb(255, 255, 255)';
}

// Donation message after Dollchan update
function showDonateMsg() {
	const font = ' style="font: 13px monospace; color: green;"';
	$popup('donate', Lng.donateMsg[lang] + ':<br style="margin-bottom: 8px;">' +
		'<div class="de-logo"><svg><use xlink:href="#de-symbol-panel-logo"/></svg></div>' +
		'<div style="display: inline-block;"><b><i>Yandex.Money</i></b><br>' +
		`<span class="de-list de-depend"><i${
			font }>410012122418236</i></span><br><b><i>WebMoney</i></b><br>` +
		`<span class="de-list de-depend">WMZ &ndash; <i${ font }>Z100197626370</i></span><br>` +
		`<span class="de-list de-depend">WMR &ndash; <i${ font }>R266614957054</i></span><br>` +
		`<span class="de-list de-depend">WMU &ndash; <i${ font }>U142375546253</i></span><br>` +
		`<b><i>Bitcoin</i></b><br><span class="de-list de-depend">P2PKH &ndash; <i${
			font }>15xEo7BVQ3zjztJqKSRVhTq3tt3rNSHFpC</i></span><br>` +
		`<span class="de-list de-depend">P2SH &ndash; <i${
			font }>3AhNPPpvtxQoFCLXk5e9Hzh6Ex9h7EoNzq</i></span></div>` +
		(nav.firefoxVer >= 56 && nav.scriptHandler !== 'WebExtension' ?
			`<br><br>New: <a href="https://addons.mozilla.org/${ lang === 1 ? 'en-US' : 'ru' }` +
			'/firefox/addon/dollchan-extension/" target="_blank">' + Lng.firefoxAddon[lang] : ''));
}

// Allows to record the duration of code execution
const Logger = {
	finish() {
		this._finished = true;
		this._marks.push(['LoggerFinish', Date.now()]);
	},
	getLogData(isFull) {
		const marks = this._marks;
		const timeLog = [];
		let duration;
		let i = 1;
		let lastExtra = 0;
		for(let len = marks.length - 1; i < len; ++i) {
			duration = marks[i][1] - marks[i - 1][1] + lastExtra;
			if(isFull || duration > 1) {
				lastExtra = 0;
				timeLog.push([marks[i][0], duration]);
			} else { // Ignore logs equal to 0ms
				lastExtra = duration;
			}
		}
		timeLog.push([Lng.total[lang], marks[i][1] - marks[0][1]]);
		return timeLog;
	},
	initLogger() {
		this._marks.push(['LoggerInit', Date.now()]);
	},
	log(text) {
		if(!this._finished) {
			this._marks.push([text, Date.now()]);
		}
	},

	_finished : false,
	_marks    : []
};

// Some async operations should be cancelable, to ignore all the chaining callbacks of promises.
// Cancellation is supposed to flow through a graph of promise dependencies. When a promise is cancelled, it
// will propagate to the farthest pending promises and reject them with the cancel reason CancelError.
function CancelError() {}
class CancelablePromise {
	constructor(resolver, cancelFn) {
		this._promise = new Promise((resolve, reject) => {
			this._reject = reject;
			resolver(value => {
				resolve(value);
				this._isResolved = true;
			}, reason => {
				reject(reason);
				this._isResolved = true;
			});
		});
		this._cancelFn = cancelFn;
		this._isResolved = false;
	}
	static reject(val) {
		return new CancelablePromise((res, rej) => rej(val));
	}
	static resolve(val) {
		return new CancelablePromise(res => res(val));
	}
	cancelPromise() {
		this._reject(new CancelError());
		if(!this._isResolved && this._cancelFn) {
			this._cancelFn();
		}
	}
	catch(eb) {
		return this.then(undefined, eb);
	}
	then(cb, eb) {
		const children = [];
		const wrap = fn => (...args) => {
			const child = fn(...args);
			if(child instanceof CancelablePromise) {
				children.push(child);
			}
			return child;
		};
		return new CancelablePromise(
			resolve => resolve(this._promise.then(cb && wrap(cb), eb && wrap(eb))), () => {
				for(const child of children) {
					child.cancelPromise();
				}
				this.cancelPromise();
			});
	}
}

class Maybe {
	constructor(Ctor/* , ...args */) {
		this._ctor = Ctor;
		// this._args = args;
		this.hasValue = false;
	}
	get value() {
		const Ctor = this._ctor;
		this.hasValue = !!Ctor;
		const value = Ctor ? new Ctor(/* ...this._args */) : null;
		Object.defineProperty(this, 'value', { value });
		return value;
	}
}

class TemporaryContent {
	constructor(key) {
		const oClass = /* new.target */this.constructor; // https://github.com/babel/babel/issues/1088
		if(oClass.purgeTO) {
			clearTimeout(oClass.purgeTO);
		}
		oClass.purgeTO = setTimeout(() => oClass.purge(), oClass.purgeSecs);
		if(oClass.data) {
			const rv = oClass.data.get(key);
			if(rv) {
				return rv;
			}
		} else {
			oClass.data = new Map();
		}
		oClass.data.set(key, this);
	}
	static get(key) {
		return this.data ? this.data.get(key) : null;
	}
	static has(key) {
		return this.data ? this.data.has(key) : false;
	}
	static purge() {
		if(this.purgeTO) {
			clearTimeout(this.purgeTO);
			this.purgeTO = null;
		}
		this.data = null;
	}
	static removeTempData(key) {
		if(this.data) {
			this.data.delete(key);
		}
	}
}
TemporaryContent.purgeSecs = 6e4;

class TasksPool {
	constructor(tasksCount, taskFunc, endFn) {
		this.array = [];
		this.running = 0;
		this.num = 1;
		this.func = taskFunc;
		this.endFn = endFn;
		this.max = tasksCount;
		this.completed = this.paused = this.stopped = false;
	}
	completeTasks() {
		if(!this.stopped) {
			if(!this.array.length && this.running === 0) {
				this.endFn();
			} else {
				this.completed = true;
			}
		}
	}
	pauseTasks() {
		this.paused = true;
	}
	runTask(data) {
		if(!this.stopped) {
			if(this.paused || this.running === this.max) {
				this.array.push(data);
			} else {
				this._runTask(data);
				this.running++;
			}
		}
	}
	stopTasks() {
		this.stopped = true;
		this.endFn();
	}

	_continueTasks() {
		if(!this.stopped) {
			this.paused = false;
			if(!this.array.length) {
				if(this.completed) {
					this.endFn();
				}
				return;
			}
			while(this.array.length && this.running !== this.max) {
				this._runTask(this.array.shift());
				this.running++;
			}
		}
	}
	_endTask() {
		if(!this.stopped) {
			if(!this.paused && this.array.length) {
				this._runTask(this.array.shift());
				return;
			}
			this.running--;
			if(!this.paused && this.completed && this.running === 0) {
				this.endFn();
			}
		}
	}
	_runTask(data) {
		this.func(this.num++, data).then(() => this._endTask(), err => {
			if(err instanceof TasksPool.PauseError) {
				this.pauseTasks();
				if(err.duration !== -1) {
					setTimeout(() => this._continueTasks(), err.duration);
				}
			} else {
				this._endTask();
				throw err;
			}
		});
	}
}
TasksPool.PauseError = function(duration) {
	this.name = 'TasksPool.PauseError';
	this.duration = duration;
};

class WorkerPool {
	constructor(mReqs, wrkFn, errFn) {
		if(!nav.hasWorker) {
			this.runWorker = (data, transferObjs, fn) => fn(wrkFn(data));
			return;
		}
		const url = deWindow.URL.createObjectURL(new Blob([`self.onmessage = function(e) {
			var info = (${ String(wrkFn) })(e.data);
			if(info.data) {
				self.postMessage(info, [info.data]);
			} else {
				self.postMessage(info);
			}
		}`], { type: 'text/javascript' }));
		this._pool = new TasksPool(mReqs, (num, data) => this._createWorker(num, data), null);
		this._freeWorkers = [];
		this._url = url;
		this._errFn = errFn;
		while(mReqs--) {
			this._freeWorkers.push(new Worker(url));
		}
	}
	clearWorkers() {
		deWindow.URL.revokeObjectURL(this._url);
		this._freeWorkers.forEach(w => w.terminate());
		this._freeWorkers = [];
	}
	runWorker(data, transferObjs, fn) {
		this._pool.runTask([data, transferObjs, fn]);
	}

	_createWorker(num, data) {
		return new Promise(resolve => {
			const worker = this._freeWorkers.pop();
			const [sendData, transferObjs, fn] = data;
			worker.onmessage = e => {
				fn(e.data);
				this._freeWorkers.push(worker);
				resolve();
			};
			worker.onerror = err => {
				resolve();
				this._freeWorkers.push(worker);
				this._errFn(err);
			};
			worker.postMessage(sendData, transferObjs);
		});
	}
}

class TarBuilder {
	constructor() {
		this._data = [];
	}
	addFile(filepath, input) {
		let i;
		let checksum = 0;
		const fileSize = input.length;
		const header = new Uint8Array(512);
		const nameLen = Math.min(filepath.length, 100);
		for(i = 0; i < nameLen; ++i) {
			header[i] = filepath.charCodeAt(i) & 0xFF;
		}
		TarBuilder._padSet(header, 100, '100777', 8); // fileMode
		TarBuilder._padSet(header, 108, '0', 8); // uid
		TarBuilder._padSet(header, 116, '0', 8); // gid
		TarBuilder._padSet(header, 124, fileSize.toString(8), 13); // fileSize
		TarBuilder._padSet(header, 136, Math.floor(Date.now() / 1e3).toString(8), 12); // mtime
		TarBuilder._padSet(header, 148, '        ', 8); // checksum
		// type ('0')
		header[156] = 0x30;
		for(i = 0; i < 157; ++i) {
			checksum += header[i];
		}
		// checksum
		TarBuilder._padSet(header, 148, checksum.toString(8), 8);
		this._data.push(header, input);
		if((i = Math.ceil(fileSize / 512) * 512 - fileSize) !== 0) {
			this._data.push(new Uint8Array(i));
		}
	}
	addString(filepath, str) {
		const sDat = unescape(encodeURIComponent(str));
		this.addFile(filepath, new Uint8Array(sDat.length).map((val, i) => sDat.charCodeAt(i) & 0xFF));
	}
	get() {
		this._data.push(new Uint8Array(1024));
		return new Blob(this._data, { type: 'application/x-tar' });
	}

	static _padSet(data, offset, num, len) {
		let i = 0;
		const nLen = num.length;
		len -= 2;
		while(nLen < len) {
			data[offset++] = 0x20; // ' '
			len--;
		}
		while(i < nLen) {
			data[offset++] = num.charCodeAt(i++);
		}
		data[offset] = 0x20; // ' '
	}
}

class WebmParser {
	constructor(data) {
		let offset = 0;
		const dv = nav.getUnsafeDataView(data);
		const len = dv.byteLength;
		const el = new WebmParser.Element(dv, len, 0);
		const voids = [];
		const EBMLId = 0x1A45DFA3;
		const segmentId = 0x18538067;
		const voidId = 0xEC;
		this.voidId = voidId;
		error: do {
			if(el.error || el.id !== EBMLId) {
				break;
			}
			this.EBML = el;
			offset += el.headSize + el.size;
			while(true) {
				const el = new WebmParser.Element(dv, len, offset);
				if(el.error) {
					break error;
				}
				if(el.id === segmentId) {
					this.segment = el;
					break; // Ignore everything after first segment
				} else if(el.id === voidId) {
					voids.push(el);
				} else {
					break error;
				}
				offset += el.headSize + el.size;
			}
			this.voids = voids;
			this.data = data;
			this.length = len;
			this.rv = [null];
			this.error = false;
			return;
		} while(false);
		this.error = true;
	}
	addWebmData(data) {
		if(this.error || !data) {
			return this;
		}
		const size = typeof data === 'string' ? data.length : data.byteLength;
		if(size > 127) {
			this.error = true;
			return;
		}
		this.rv.push(new Uint8Array([this.voidId, 0x80 | size]), data);
		return this;
	}
	getWebmData() {
		if(this.error) {
			return null;
		}
		this.rv[0] = nav.getUnsafeUint8Array(this.data, 0, this.segment.endOffset);
		return this.rv;
	}
}
WebmParser.Element = function(elData, dataLength, offset) {
	this.error = false;
	this.id = 0;
	if(offset + 4 >= dataLength) {
		return;
	}
	let num = elData.getUint32(offset);
	let leadZeroes = Math.clz32(num);
	if(leadZeroes > 3) {
		this.error = true;
		return;
	}
	offset += leadZeroes + 1;
	if(offset >= dataLength) {
		this.error = true;
		return;
	}
	this.id = num >>> (8 * (3 - leadZeroes));
	this.headSize = leadZeroes + 1;
	num = elData.getUint32(offset);
	leadZeroes = Math.clz32(num);
	let size = num & (0xFFFFFFFF >>> (leadZeroes + 1));
	if(leadZeroes > 3) {
		const shift = 8 * (7 - leadZeroes);
		if(size >>> shift !== 0 || offset + 4 > dataLength) {
			this.error = true;
			return; // We cannot handle webm-files with size greater than 4Gb :(
		}
		size = (size << (32 - shift)) | (elData.getUint32(offset + 4) >>> shift);
	} else {
		size >>>= 8 * (3 - leadZeroes);
	}
	this.headSize += leadZeroes + 1;
	offset += leadZeroes + 1;
	if(offset + size > dataLength) {
		this.error = true;
		return;
	}
	this.data = elData;
	this.offset = offset;
	this.endOffset = offset + size;
	this.size = size;
};

/* ==[ Storage.js ]===========================================================================================
                                                   STORAGE
=========================================================================================================== */

// Gets data from the global storage
async function getStored(id) {
	if(nav.hasNewGM) {
		const value = await GM.getValue(id);
		return value;
	} else if(nav.hasOldGM) {
		return GM_getValue(id);
	} else if(nav.hasWebStorage) {
		// Read storage.local first. If it not existed then read storage.sync
		return new Promise(resolve => chrome.storage.local.get(id, obj => {
			if(Object.keys(obj).length) {
				resolve(obj[id]);
			} else {
				chrome.storage.sync.get(id, obj => resolve(obj[id]));
			}
		}));
	} else if(nav.hasPrestoStorage) {
		return prestoStorage.getItem(id);
	}
	return locStorage[id];
}

// Saves data into the global storage
// FIXME: make async?
function setStored(id, value) {
	if(nav.hasNewGM) {
		return GM.setValue(id, value);
	} else if(nav.hasOldGM) {
		GM_setValue(id, value);
	} else if(nav.hasWebStorage) {
		const obj = {};
		obj[id] = value;
		chrome.storage.sync.set(obj, () => {
			if(chrome.runtime.lastError) {
				// Store into storage.local if the storage.sync limit is exceeded
				chrome.storage.local.set(obj, emptyFn);
				chrome.storage.sync.remove(id, emptyFn);
			} else {
				chrome.storage.local.remove(id, emptyFn);
			}
		});
	} else if(nav.hasPrestoStorage) {
		prestoStorage.setItem(id, value);
	} else {
		locStorage[id] = value;
	}
}

// Removes data from the global storage
// FIXME: make async?
function delStored(id) {
	if(nav.hasNewGM) {
		return GM.deleteValue(id);
	} else if(nav.hasOldGM) {
		GM_deleteValue(id);
	} else if(nav.hasWebStorage) {
		chrome.storage.sync.remove(id, emptyFn);
	} else if(nav.hasPrestoStorage) {
		prestoStorage.removeItem(id);
	} else {
		locStorage.removeItem(id);
	}
}

// Receives and parses JSON data into an object
async function getStoredObj(id) {
	return JSON.parse(await getStored(id) || '{}') || {};
}

// Replaces the domain config with an object. Removes the domain config, if there is no object.
function saveCfgObj(dm, obj) {
	getStoredObj('DESU_Config').then(val => {
		if(obj) {
			val[dm] = obj;
		} else {
			delete val[dm];
		}
		setStored('DESU_Config', JSON.stringify(val));
	});
}

// Saves the value for a particular config option
function saveCfg(id, val) {
	if(Cfg[id] !== val) {
		Cfg[id] = val;
		saveCfgObj(aib.dm, Cfg);
	}
}

// Toggles a particular config option (1|0)
function toggleCfg(id) {
	saveCfg(id, +!Cfg[id]);
}

function readData() {
	return Promise.all([readFavorites(), readCfg()]);
}

// Config initialization, checking for Dollchan update.
async function readCfg() {
	let obj;
	const val = await getStoredObj('DESU_Config');
	if(!(aib.dm in val) || $isEmpty(obj = val[aib.dm])) {
		const isGlobal = nav.hasGlobalStorage && !!val.global;
		obj = isGlobal ? val.global : {};
		if(isGlobal) {
			delete obj.correctTime;
			delete obj.captchaLang;
		}
	}
	defaultCfg.captchaLang = aib.captchaLang;
	defaultCfg.language = +!String(navigator.language).toLowerCase().startsWith('ru');
	Cfg = Object.assign(Object.create(defaultCfg), obj);
	if(!Cfg.timeOffset) {
		Cfg.timeOffset = '+0';
	}
	if(!Cfg.timePattern) {
		Cfg.timePattern = aib.timePattern;
	}
	if(aib.prot !== 'http:') { // Vocaroo doesnʼt support https
		Cfg.addVocaroo = 0;
	}
	if(aib.dobrochan && !Cfg.useDobrAPI) {
		aib.JsonBuilder = null;
	}
	if(!('FormData' in deWindow)) {
		Cfg.ajaxPosting = 0;
	}
	if(!Cfg.ajaxPosting) {
		Cfg.fileInputs = 0;
	}
	if(!('Notification' in deWindow)) {
		Cfg.desktNotif = 0;
	}
	if(nav.isPresto) {
		Cfg.preLoadImgs = 0;
		Cfg.findImgFile = 0;
		if(!nav.hasOldGM) {
			Cfg.updDollchan = 0;
		}
		Cfg.fileInputs = 0;
	}
	if(nav.scriptHandler === 'WebExtension') {
		Cfg.updDollchan = 0;
	}
	if(Cfg.updThrDelay < 10) {
		Cfg.updThrDelay = 10;
	}
	if(!Cfg.addSageBtn || !Cfg.saveSage) {
		Cfg.sageReply = 0;
	}
	if(!Cfg.passwValue) {
		Cfg.passwValue = Math.round(Math.random() * 1e12).toString(32);
	}
	if(!Cfg.stats) {
		Cfg.stats = { view: 0, op: 0, reply: 0 };
	}
	if(Cfg.addYouTube !== undefined) {
		Cfg.embedYTube = Cfg.addYouTube === 0 ? 0 : Cfg.addYouTube === 1 ? 2 : 1;
		delete Cfg.addYouTube;
	}
	lang = Cfg.language;
	if(val.commit !== commit && !localData) {
		if(doc.readyState === 'loading') {
			doc.addEventListener('DOMContentLoaded', () => setTimeout(showDonateMsg, 1e3));
		} else {
			setTimeout(showDonateMsg, 1e3);
		}
		val.commit = commit;
	}
	setStored('DESU_Config', JSON.stringify(val));
	if(Cfg.updDollchan && !localData) {
		checkForUpdates(false, val.lastUpd).then(html => {
			if(doc.readyState === 'loading') {
				doc.addEventListener('DOMContentLoaded', () => $popup('updavail', html));
			} else {
				$popup('updavail', html);
			}
		}, emptyFn);
	}
}

// Initialize of hidden and favorites. Run spells.
function readPostsData(firstPost, favObj) {
	let sVis = null;
	try {
		// Get hidden posts and threads that cached in current session
		const str = aib.t ? sesStorage['de-hidden-' + aib.b + aib.t] : null;
		if(str) {
			const json = JSON.parse(str);
			if(json.hash === (Cfg.hideBySpell ? Spells.hash : 0) &&
				pByNum.has(json.lastNum) && pByNum.get(json.lastNum).count === json.lastCount
			) {
				sVis = json.data?.[0] instanceof Array ? json.data : null;
			}
		}
	} catch(err) {
		sesStorage['de-hidden-' + aib.b + aib.t] = null;
	}
	if(!firstPost) {
		return;
	}
	let updateFav = null;
	const favBrd = favObj[aib.host]?.[aib.b] || {};
	const spellsHide = Cfg.hideBySpell;
	const maybeSpells = new Maybe(SpellsRunner);

	// Search existed posts in stored data
	for(let post = firstPost; post; post = post.next) {
		const { num } = post;
		// Mark favorite threads, update favorites data
		if(post.isOp && (num in favBrd)) {
			const entry = favBrd[num];
			const { thr } = post;
			post.toggleFavBtn(true);
			post.thr.isFav = true;
			if(aib.t) {
				entry.cnt = thr.pcount;
				entry.new = entry.you = 0;
				if(Cfg.markNewPosts && entry.last) {
					let lastPost = pByNum.get(+entry.last.match(/\d+/));
					if(lastPost) {
						// Mark all new posts after last viewed post
						while((lastPost = lastPost.next)) {
							Post.addMark(lastPost.el, true);
						}
					}
				}
				entry.last = aib.anchor + thr.last.num;
			} else {
				entry.new = thr.pcount - entry.cnt;
			}
			updateFav = [aib.host, aib.b, aib.t, [thr.pcount, thr.last.num], 'update'];
		}
		if(HiddenPosts.has(num)) {
			HiddenPosts.hideHidden(post, num);
			continue;
		}
		let hideData;
		if(post.isOp) {
			if(HiddenThreads.has(num)) {
				hideData = [true, null];
			} else if(spellsHide) {
				hideData = sVis?.[post.count];
			}
		} else if(spellsHide) {
			hideData = sVis?.[post.count];
		} else {
			continue;
		}
		if(!hideData) {
			maybeSpells.value.runSpells(post); // Apply spells if posts not hidden
		} else if(hideData[0]) {
			if(post.isHidden) {
				post.spellHidden = true;
			} else {
				post.spellHide(hideData[1]);
			}
		}
	}
	if(maybeSpells.hasValue) {
		maybeSpells.value.endSpells();
	}
	if(aib.t && Cfg.panelCounter === 2) {
		$id('de-panel-info-pcount').textContent = Thread.first.pcount - Thread.first.hidCounter;
	}
	if(updateFav) {
		saveFavorites(favObj);
		sendStorageEvent('__de-favorites', updateFav);
	}
	// After following a link from Favorites, we need to open Favorites again.
	const hasFavWinKey = sesStorage['de-fav-win'] === '1';
	if(hasFavWinKey || Cfg.favWinOn) {
		toggleWindow('fav', !!$q('#de-win-fav.de-win-active'), null, true);
		if(hasFavWinKey) {
			sesStorage.removeItem('de-fav-win');
		}
	}
	let data = sesStorage['de-fav-newthr'];
	if(data) { // Detecting the created new thread and adding it to Favorites.
		data = JSON.parse(data);
		const isTimeOut = !data.num && (Date.now() - data.date > 2e4);
		if(data.num === firstPost.num || !firstPost.next && !isTimeOut) {
			firstPost.thr.toggleFavState(true);
			sesStorage.removeItem('de-fav-newthr');
		} else if(isTimeOut) {
			sesStorage.removeItem('de-fav-newthr');
		}
	}
	if(Cfg.nextPageThr && DelForm.first === DelForm.last) {
		const hidThrEls = $Q('.de-thr-hid', firstPost.thr.form.el);
		const hidThrLen = hidThrEls.length;
		if(hidThrLen) {
			Pages.addPage(hidThrLen);
		}
	}
}

function readFavorites() {
	return getStoredObj('DESU_Favorites');
}

function saveFavorites(data) {
	setStored('DESU_Favorites', JSON.stringify(data));
}

// Get posts that were read by posts previews
function readViewedPosts() {
	if(!Cfg.markViewed) {
		return;
	}
	const data = sesStorage['de-viewed'];
	if(data) {
		data.split(',').forEach(pNum => {
			const post = pByNum.get(+pNum);
			if(post) {
				post.el.classList.add('de-viewed');
				post.isViewed = true;
			}
		});
	}
}

// HIDDEN AND MY POSTS STORAGE

class PostsStorage {
	constructor() {
		this.storageName = '';
		this.__cachedTime = null;
		this._cachedStorage = null;
		this._cacheTO = null;
	}
	get(num) {
		const storage = this._readStorage()[aib.b];
		if(storage) {
			const val = storage[num];
			return val ? val[2] : null;
		}
		return null;
	}
	has(num) {
		const storage = this._readStorage()[aib.b];
		return storage ? $hasProp(storage, num) : false;
	}
	purge() {
		this._cacheTO = this.__cachedTime = this._cachedStorage = null;
	}
	removeStorage(num, board = aib.b) {
		const storage = this._readStorage();
		const bStorage = storage[board];
		if(bStorage && $hasProp(bStorage, num)) {
			delete bStorage[num];
			if($isEmpty(bStorage)) {
				delete storage[board];
			}
			this._saveStorage();
		}
	}
	set(num, thrNum, data = true) {
		const storage = this._readStorage();
		if(storage && storage.$count > 5e3) {
			const minDate = Date.now() - 5 * 24 * 3600 * 1e3;
			for(const board in storage) {
				if($hasProp(storage, board)) {
					const data = storage[board];
					for(const key in data) {
						if($hasProp(data, key) && data[key][0] < minDate) {
							delete data[key];
						}
					}
				}
			}
		}
		(storage[aib.b] || (storage[aib.b] = {}))[num] = [this._cachedTime, thrNum, data];
		this._saveStorage();
	}

	static _migrateOld(newName, oldName) {
		if($hasProp(locStorage, oldName)) {
			locStorage[newName] = locStorage[oldName];
			locStorage.removeItem(oldName);
		}
	}
	get _cachedTime() {
		return this.__cachedTime || (this.__cachedTime = Date.now());
	}
	_readStorage() {
		if(this._cachedStorage) {
			return this._cachedStorage;
		}
		const data = locStorage[this.storageName];
		if(data) {
			try {
				return (this._cachedStorage = JSON.parse(data));
			} catch(err) {}
		}
		return (this._cachedStorage = {});
	}
	_saveStorage() {
		if(this._cacheTO === null) {
			this._cacheTO = setTimeout(() => {
				if(this._cachedStorage) {
					locStorage[this.storageName] = JSON.stringify(this._cachedStorage);
				}
				this.purge();
			}, 0);
		}
	}
}

const HiddenPosts = new class HiddenPostsClass extends PostsStorage {
	constructor() {
		super();
		this.storageName = 'de-posts';
	}
	hideHidden(post, num) {
		const uHideData = HiddenPosts.get(num);
		if(!uHideData && post.isOp && HiddenThreads.has(num)) {
			post.setUserVisib(true);
		} else {
			post.setUserVisib(!!uHideData, false);
		}
	}

	_readStorage() {
		PostsStorage._migrateOld(this.storageName, 'de-threads-new'); // Old storage has wrong name
		return super._readStorage();
	}
}();

const HiddenThreads = new class HiddenThreadsClass extends PostsStorage {
	constructor() {
		super();
		this.storageName = 'de-threads';
	}
	getCount() {
		const storage = this._readStorage();
		let rv = 0;
		for(const board in storage) {
			if($hasProp(storage, board)) {
				rv += Object.keys(storage[board]).length;
			}
		}
		return rv;
	}
	getRawData() {
		return this._readStorage();
	}
	saveRawData(data) {
		locStorage[this.storageName] = JSON.stringify(data);
		this.purge();
	}

	_readStorage() {
		PostsStorage._migrateOld(this.storageName, ''); // Old storage has wrong name
		return super._readStorage();
	}
}();

const MyPosts = new class MyPostsClass extends PostsStorage {
	constructor() {
		super();
		this.storageName = 'de-myposts';
		this._cachedData = null;
	}
	has(num) {
		return this._cachedData.has(num);
	}
	purge() {
		super.purge();
		this._cachedData = null;
		this._readStorage();
	}
	readStorage() {
		this._readStorage();
	}
	set(num, thrNum) {
		super.set(num, thrNum);
		this._cachedData.add(+num);
		sendStorageEvent('__de-mypost', 1);
	}

	_readStorage() {
		if(this._cachedData && this._cachedStorage) {
			return this._cachedStorage;
		}
		PostsStorage._migrateOld(this.storageName, 'de-myposts-new');
		const rv = super._readStorage();
		this._cachedData = rv[aib.b] ? new Set(Object.keys(rv[aib.b]).map(val => +val)) : new Set();
		return rv;
	}
}();

function sendStorageEvent(name, value) {
	locStorage[name] = typeof value === 'string' ? value : JSON.stringify(value);
	locStorage.removeItem(name);
}

function initStorageEvent() {
	doc.defaultView.addEventListener('storage', e => {
		let data, temp;
		let val = e.newValue;
		if(!val) {
			return;
		}
		switch(e.key) {
		case '__de-favorites': {
			try {
				data = JSON.parse(val);
			} catch(err) {
				return;
			}
			updateFavWindow(...data);
			return;
		}
		case '__de-mypost': MyPosts.purge(); return;
		case '__de-webmvolume':
			val = +val || 0;
			Cfg.webmVolume = val;
			temp = $q('input[info="webmVolume"]');
			if(temp) {
				temp.value = val;
			}
			return;
		case '__de-post':
			(() => {
				try {
					data = JSON.parse(val);
				} catch(err) {
					return;
				}
				HiddenThreads.purge();
				HiddenPosts.purge();
				if(data.brd === aib.b) {
					let post = pByNum.get(data.num);
					if(post && (post.isHidden ^ data.hide)) {
						post.setUserVisib(data.hide, false);
					} else if((post = pByNum.get(data.thrNum))) {
						post.thr.userTouched.set(data.num, data.hide);
					}
				}
				toggleWindow('hid', true);
			})();
			return;
		case 'de-threads':
			HiddenThreads.purge();
			Thread.first.updateHidden(HiddenThreads.getRawData()[aib.b]);
			toggleWindow('hid', true);
			return;
		case '__de-spells': (() => {
			try {
				data = JSON.parse(val);
			} catch(err) {
				return;
			}
			Cfg.hideBySpell = +data.hide;
			temp = $q('input[info="hideBySpell"]');
			if(temp) {
				temp.checked = data.hide;
			}
			$hide(docBody);
			if(data.data) {
				Spells.setSpells(data.data, false);
				Cfg.spells = JSON.stringify(data.data);
				temp = $id('de-spell-txt');
				if(temp) {
					temp.value = Spells.list;
				}
			} else {
				SpellsRunner.unhideAll();
				Spells.disableSpells();
				temp = $id('de-spell-txt');
				if(temp) {
					temp.value = '';
				}
			}
			$show(docBody);
		})();
		}
	});
}

/* ==[ Panel.js ]=============================================================================================
                                                  MAIN PANEL
=========================================================================================================== */

const Panel = Object.create({
	isVidEnabled: false,
	initPanel(formEl) {
		const imgLen = $Q(aib.qPostImg, formEl).length;
		const isThr = aib.t;
		(pr?.pArea[0] || formEl).insertAdjacentHTML('beforebegin', `<div id="de-main">
			<div id="de-panel">
				<div id="de-panel-logo" title="${ Lng.panelBtn.attach[lang] }">
					<svg class="de-panel-logo-svg">
						<use xlink:href="#de-symbol-panel-logo"/>
					</svg>
				</div>
				<span id="de-panel-buttons"${ !Cfg.expandPanel ? ' style="display: none;"' : '' }>
				${ Cfg.disabled ? this._getButton('enable') : this._getButton('cfg') +
					this._getButton('hid') +
					this._getButton('fav') +
					(Cfg.embedYTube ? this._getButton('vid') : '') +
					(!localData ?
						this._getButton('refresh') +
						(isThr || aib.page !== aib.firstPage ? this._getButton('goback') : '') +
						(!isThr && aib.page !== aib.lastPage ? this._getButton('gonext') : '') : '') +
					this._getButton('goup') +
					this._getButton('godown') +
					(imgLen ? this._getButton('expimg') + this._getButton('maskimg') : '') +
					(!localData && !nav.isPresto ?
						(imgLen && !Cfg.preLoadImgs ? this._getButton('preimg') : '') +
						(isThr ? this._getButton('savethr') : '') : '') +
					(!localData && isThr ?
						this._getButton(Cfg.ajaxUpdThr && !aib.isArchived ? 'upd-on' : 'upd-off') +
						(!nav.isSafari ? this._getButton('audio-off') : '') : '') +
					(aib.hasCatalog ? this._getButton('catalog') : '') +
					this._getButton('enable') +
					(isThr && Thread.first ? `<span id="de-panel-info">
						<span id="de-panel-info-pcount" title="` +
							`${ Lng.panelBtn[Cfg.panelCounter !== 2 ? 'pcount' : 'pcountNotHid'][lang] }">` +
							`${ Thread.first.pcount }</span>
						<span id="de-panel-info-icount" title="${ Lng.panelBtn.imglen[lang] }">${
							imgLen }</span>
						<span id="de-panel-info-acount" title="${ Lng.panelBtn.posters[lang] }"></span>
					</span>` : '') }
				</span>
			</div>
			${ Cfg.disabled ? '' : '<div id="de-wrapper-popup"></div><hr style="clear: both;">' }
		</div>`);
		this._el = $id('de-panel');
		this._el.addEventListener('click', this, true);
		['mouseover', 'mouseout'].forEach(e => this._el.addEventListener(e, this));
		this._buttons = $id('de-panel-buttons');
		this.isNew = true;
	},
	removeMain() {
		this._el.removeEventListener('click', this, true);
		['mouseover', 'mouseout'].forEach(e => this._el.removeEventListener(e, this));
		delete this._pcountEl;
		delete this._icountEl;
		delete this._acountEl;
		$id('de-main').remove();
	},
	handleEvent(e) {
		if('isTrusted' in e && !e.isTrusted) {
			return;
		}
		let el = nav.fixEventEl(e.target);
		el = el.tagName.toLowerCase() === 'svg' ? el.parentNode : el;
		switch(e.type) {
		case 'click':
			switch(el.id) {
			case 'de-panel-logo':
				if(Cfg.expandPanel && !$q('.de-win-active')) {
					$hide(this._buttons);
				}
				toggleCfg('expandPanel');
				return;
			case 'de-panel-cfg': toggleWindow('cfg', false); break;
			case 'de-panel-hid': toggleWindow('hid', false); break;
			case 'de-panel-fav': toggleWindow('fav', false); break;
			case 'de-panel-vid':
				this.isVidEnabled = !this.isVidEnabled;
				toggleWindow('vid', false);
				break;
			case 'de-panel-refresh': deWindow.location.reload(); break;
			case 'de-panel-goup': scrollTo(0, 0); break;
			case 'de-panel-godown': scrollTo(0, docBody.scrollHeight || docBody.offsetHeight); break;
			case 'de-panel-expimg':
				el.classList.toggle('de-panel-button-active');
				isExpImg = !isExpImg;
				$del($q('.de-fullimg-center'));
				for(let post = Thread.first.op; post; post = post.next) {
					post.toggleImages(isExpImg, false);
				}
				break;
			case 'de-panel-preimg':
				el.classList.toggle('de-panel-button-active');
				isPreImg = !isPreImg;
				if(!e.ctrlKey) {
					for(const { el } of DelForm) {
						ContentLoader.preloadImages(el);
					}
				}
				break;
			case 'de-panel-maskimg':
				el.classList.toggle('de-panel-button-active');
				toggleCfg('maskImgs');
				updateCSS();
				break;
			case 'de-panel-upd-on':
			case 'de-panel-upd-warn':
			case 'de-panel-upd-off':
				updater.toggle();
				break;
			case 'de-panel-audio-on':
			case 'de-panel-audio-off':
				if(updater.toggleAudio(0)) {
					updater.enableUpdater();
					el.id = 'de-panel-audio-on';
				} else {
					el.id = 'de-panel-audio-off';
				}
				$del($q('.de-menu'));
				break;
			case 'de-panel-savethr': break;
			case 'de-panel-enable':
				toggleCfg('disabled');
				deWindow.location.reload();
				break;
			default: return;
			}
			e.preventDefault();
			return;
		case 'mouseover':
			if(!Cfg.expandPanel) {
				clearTimeout(this._hideTO);
				$show(this._buttons);
			}
			switch(el.id) {
			case 'de-panel-cfg': KeyEditListener.setTitle(el, 10); break;
			case 'de-panel-hid': KeyEditListener.setTitle(el, 7); break;
			case 'de-panel-fav': KeyEditListener.setTitle(el, 6); break;
			case 'de-panel-vid': KeyEditListener.setTitle(el, 18); break;
			case 'de-panel-goback': KeyEditListener.setTitle(el, 4); break;
			case 'de-panel-gonext': KeyEditListener.setTitle(el, 17); break;
			case 'de-panel-maskimg': KeyEditListener.setTitle(el, 9); break;
			case 'de-panel-refresh':
				if(aib.t) {
					return;
				}
				/* falls through */
			case 'de-panel-savethr':
			case 'de-panel-audio-off':
				if(this._menu?.parentEl === el) {
					return;
				}
				this._menuTO = setTimeout(() => {
					this._menu = addMenu(el);
					this._menu.onover = () => clearTimeout(this._hideTO);
					this._menu.onout = () => this._prepareToHide(null);
					this._menu.onremove = () => (this._menu = null);
				}, Cfg.linksOver);
			}
			return;
		default: // mouseout
			this._prepareToHide(nav.fixEventEl(e.relatedTarget));
			switch(el.id) {
			case 'de-panel-refresh':
			case 'de-panel-savethr':
			case 'de-panel-audio-off':
				clearTimeout(this._menuTO);
				this._menuTO = 0;
			}
		}
	},
	updateCounter(postCount, imgsCount, postersCount) {
		this._pcountEl.textContent = postCount;
		this._icountEl.textContent = imgsCount;
		this._acountEl.textContent = postersCount;
		this.isNew = false;
	},

	_el     : null,
	_hideTO : 0,
	_menu   : null,
	_menuTO : 0,
	get _acountEl() {
		const value = $id('de-panel-info-acount');
		Object.defineProperty(this, '_acountEl', { value, configurable: true });
		return value;
	},
	get _icountEl() {
		const value = $id('de-panel-info-icount');
		Object.defineProperty(this, '_icountEl', { value, configurable: true });
		return value;
	},
	get _pcountEl() {
		const value = $id('de-panel-info-pcount');
		Object.defineProperty(this, '_pcountEl', { value, configurable: true });
		return value;
	},
	_getButton(id) {
		let page, href, title, useId;
		switch(id) {
		case 'goback':
			page = Math.max(aib.page - 1, 0);
			href = aib.getPageUrl(aib.b, page);
			if(!aib.t) {
				title = Lng.panelBtn.gonext[lang].replace('%s', page);
			}
			useId = 'arrow';
			break;
		case 'gonext':
			page = aib.page + 1;
			href = aib.getPageUrl(aib.b, page);
			title = Lng.panelBtn.gonext[lang].replace('%s', page);
			/* falls through */
		case 'goup':
		case 'godown':
			useId = 'arrow';
			break;
		case 'upd-on':
		case 'upd-off':
			useId = 'upd';
			break;
		case 'catalog':
			href = aib.catalogUrl;
		}
		return `<a id="de-panel-${ id }" class="de-abtn de-panel-button" title="${
			title || Lng.panelBtn[id][lang] }" href="${ href || '#' }">
			<svg class="de-panel-svg">
			${ id !== 'audio-off' ? `
				<use xlink:href="#de-symbol-panel-${ useId || id }"/>` : `
				<use class="de-use-audio-off" xlink:href="#de-symbol-panel-audio-off"/>
				<use class="de-use-audio-on" xlink:href="#de-symbol-panel-audio-on"/>` }
			</svg>
		</a>`;
	},
	_prepareToHide(rt) {
		if(!Cfg.expandPanel && !$q('.de-win-active') &&
			(!rt || !this._el.contains(rt.farthestViewportElement || rt))
		) {
			this._hideTO = setTimeout(() => $hide(this._buttons), 500);
		}
	}
});

/* ==[ WindowUtils.js ]=======================================================================================
                                                WINDOW: UTILS
=========================================================================================================== */

function updateWinZ(style) {
	if(style.zIndex < topWinZ) {
		style.zIndex = ++topWinZ;
	}
}

function makeDraggable(name, win, head) {
	head.addEventListener('mousedown', {
		_oldX   : 0,
		_oldY   : 0,
		_win    : win,
		_wStyle : win.style,
		_X      : 0,
		_Y      : 0,
		_Z      : 0,
		handleEvent(e) {
			if(!Cfg[name + 'WinDrag']) {
				return;
			}
			const { clientX: curX, clientY: curY } = e;
			switch(e.type) {
			case 'mousedown':
				this._oldX = curX;
				this._oldY = curY;
				this._X = Cfg[name + 'WinX'];
				this._Y = Cfg[name + 'WinY'];
				if(this._Z < topWinZ) {
					this._Z = this._wStyle.zIndex = ++topWinZ;
				}
				['mouseleave', 'mousemove', 'mouseup'].forEach(e => docBody.addEventListener(e, this));
				e.preventDefault();
				return;
			case 'mousemove': {
				const maxX = Post.sizing.wWidth - this._win.offsetWidth;
				const maxY = Post.sizing.wHeight - this._win.offsetHeight - 25;
				const cr = this._win.getBoundingClientRect();
				const x = cr.left + curX - this._oldX;
				const y = cr.top + curY - this._oldY;
				this._X = x >= maxX || curX > this._oldX && x > maxX - 20 ? 'right: 0' :
					x < 0 || curX < this._oldX && x < 20 ? 'left: 0' :
					`left: ${ x }px`;
				this._Y = y >= maxY || curY > this._oldY && y > maxY - 20 ? 'bottom: 25px' :
					y < 0 || curY < this._oldY && y < 20 ? 'top: 0' :
					`top: ${ y }px`;
				const { width } = this._wStyle;
				this._win.setAttribute('style', `${ this._X }; ${ this._Y }; z-index: ${ this._Z }${
					width ? '; width: ' + width : '' }`);
				this._oldX = curX;
				this._oldY = curY;
				return;
			}
			case 'mouseleave':
			case 'mouseup':
				['mouseleave', 'mousemove', 'mouseup'].forEach(e => docBody.removeEventListener(e, this));
				saveCfg(name + 'WinX', this._X);
				saveCfg(name + 'WinY', this._Y);
			}
		}
	});
}

class WinResizer {
	constructor(name, dir, cfgName, win, target) {
		this.name = name;
		this.dir = dir;
		this.cfgName = cfgName;
		this.vertical = dir === 'top' || dir === 'bottom';
		this.win = win;
		this.wStyle = this.win.style;
		this.tStyle = target.style;
		$q('.de-resizer-' + dir, win).addEventListener('mousedown', this);
	}
	handleEvent(e) {
		let val, x, y;
		const { wWidth: maxX, wHeight: maxY } = Post.sizing;
		const { width } = this.wStyle;
		const cr = this.win.getBoundingClientRect();
		const z = `; z-index: ${ this.wStyle.zIndex }${ width ? '; width:' + width : '' }`;
		switch(e.type) {
		case 'mousedown':
			if(this.win.classList.contains('de-win-fixed')) {
				x = 'right: 0';
				y = 'bottom: 25px';
			} else {
				x = Cfg[this.name + 'WinX'];
				y = Cfg[this.name + 'WinY'];
			}
			switch(this.dir) {
			case 'top': val = `${ x }; bottom: ${ maxY - cr.bottom }px${ z }`; break;
			case 'bottom': val = `${ x }; top: ${ cr.top }px${ z }`; break;
			case 'left': val = `right: ${ maxX - cr.right }px; ${ y + z }`; break;
			case 'right': val = `left: ${ cr.left }px; ${ y + z }`;
			}
			this.win.setAttribute('style', val);
			['mousemove', 'mouseup'].forEach(e => docBody.addEventListener(e, this));
			e.preventDefault();
			return;
		case 'mousemove':
			if(this.vertical) {
				val = e.clientY;
				this.tStyle.setProperty('height', Math.max(parseInt(this.tStyle.height, 10) + (
					this.dir === 'top' ? cr.top - (val < 20 ? 0 : val) :
					(val > maxY - 45 ? maxY - 25 : val) - cr.bottom
				), 90) + 'px', 'important');
			} else {
				val = e.clientX;
				this.tStyle.setProperty('width', Math.max(parseInt(this.tStyle.width, 10) + (
					this.dir === 'left' ? cr.left - (val < 20 ? 0 : val) :
					(val > maxX - 20 ? maxX : val) - cr.right
				), this.name === 'reply' ? 275 : 400) + 'px', 'important');
			}
			return;
		default: // mouseup
			['mousemove', 'mouseup'].forEach(e => docBody.removeEventListener(e, this));
			saveCfg(this.cfgName, parseInt(this.vertical ? this.tStyle.height : this.tStyle.width, 10));
			if(this.win.classList.contains('de-win-fixed')) {
				this.win.setAttribute('style', 'right: 0; bottom: 25px' + z);
				return;
			}
			if(this.vertical) {
				saveCfg(this.name + 'WinY', cr.top < 1 ? 'top: 0' :
					cr.bottom > maxY - 26 ? 'bottom: 25px' : `top: ${ cr.top }px`);
			} else {
				saveCfg(this.name + 'WinX', cr.left < 1 ? 'left: 0' :
					cr.right > maxX - 1 ? 'right: 0' : `left: ${ cr.left }px`);
			}
			this.win.setAttribute('style', Cfg[this.name + 'WinX'] + '; ' + Cfg[this.name + 'WinY'] + z);
		}
	}
}

function toggleWindow(name, isUpdate, data, noAnim) {
	let el;
	let win = $id('de-win-' + name);
	const isActive = win?.classList.contains('de-win-active');
	if(isUpdate && !isActive) {
		return;
	}
	if(!win) {
		const winAttr = (Cfg[name + 'WinDrag'] ?
			`de-win" style="${ Cfg[name + 'WinX'] }; ${ Cfg[name + 'WinY'] }` :
			'de-win-fixed" style="right: 0; bottom: 25px'
		) + (name !== 'fav' ? '' : `; width: ${ Cfg.favWinWidth }px; `);
		win = $aBegin($id('de-main'), `<div id="de-win-${ name }" class="${ winAttr }; display: none;">
			<div class="de-win-head">
				<span class="de-win-title">
					${ name === 'cfg' ? 'Dollchan Extension Tools' : Lng.panelBtn[name][lang] }
				</span>
				<span class="de-win-buttons">
					<svg class="de-win-btn-toggle"><use xlink:href="#de-symbol-win-arrow"/></svg>
					<svg class="de-win-btn-close"><use xlink:href="#de-symbol-win-close"/></svg>
				</span>
			</div>
			<div class="de-win-body"></div>
			${ name !== 'fav' ? '' : `
				<div class="de-resizer de-resizer-left"></div>
				<div class="de-resizer de-resizer-right"></div>` }
		</div>`);
		const winBody = $q('.de-win-body', win);
		if(name === 'cfg') {
			winBody.className = 'de-win-body ' + aib.cReply;
		} else {
			setTimeout(() => {
				const backColor = getComputedStyle(docBody).getPropertyValue('background-color');
				winBody.style.backgroundColor = backColor !== 'transparent' ? backColor : '#EEE';
			}, 100);
		}
		if(name === 'fav') {
			new WinResizer('fav', 'left', 'favWinWidth', win, win);
			new WinResizer('fav', 'right', 'favWinWidth', win, win);
		}
		el = $q('.de-win-buttons', win);
		el.onmouseover = e => {
			const el = nav.fixEventEl(e.target);
			const parent = el.parentNode;
			switch(el.classList[0]) {
			case 'de-win-btn-close': parent.title = Lng.closeWindow[lang]; break;
			case 'de-win-btn-toggle':
				parent.title = Cfg[name + 'WinDrag'] ? Lng.toPanel[lang] : Lng.makeDrag[lang];
			}
		};
		el.lastElementChild.onclick = () => toggleWindow(name, false);
		$q('.de-win-btn-toggle', el).onclick = () => {
			toggleCfg(name + 'WinDrag');
			const isDrag = Cfg[name + 'WinDrag'];
			if(!isDrag) {
				const temp = $q('.de-win-active.de-win-fixed', win.parentNode);
				if(temp) {
					toggleWindow(temp.id.substr(7), false);
				}
			}
			win.classList.toggle('de-win', isDrag);
			win.classList.toggle('de-win-fixed', !isDrag);
			const { width } = win.style;
			win.style.cssText = `${ isDrag ? `${ Cfg[name + 'WinX'] }; ${ Cfg[name + 'WinY'] }` :
				'right: 0; bottom: 25px' }${ width ? '; width: ' + width : '' }`;
			updateWinZ(win.style);
		};
		makeDraggable(name, win, $q('.de-win-head', win));
	}
	updateWinZ(win.style);
	let isRemove = !isUpdate && isActive;
	if(!isRemove && !win.classList.contains('de-win') &&
		(el = $q(`.de-win-active.de-win-fixed:not(#de-win-${ name })`, win.parentNode))
	) {
		toggleWindow(el.id.substr(7), false);
	}
	const isAnim = !noAnim && !isUpdate && Cfg.animation;
	let body = $q('.de-win-body', win);
	if(isAnim && body.hasChildNodes()) {
		win.addEventListener('animationend', function aEvent(e) {
			e.target.removeEventListener('animationend', aEvent);
			showWindow(win, body, name, isRemove, data, Cfg.animation);
			win = body = name = isRemove = data = null;
		});
		win.classList.remove('de-win-open');
		win.classList.add('de-win-close');
	} else {
		showWindow(win, body, name, isRemove, data, isAnim);
	}
}

function showWindow(win, body, name, isRemove, data, isAnim) {
	body.innerHTML = '';
	win.classList.toggle('de-win-active', !isRemove);
	if(isRemove) {
		win.classList.remove('de-win-close');
		$hide(win);
		if(!Cfg.expandPanel && !$q('.de-win-active')) {
			$hide($id('de-panel-buttons'));
		}
		return;
	}
	if(!Cfg.expandPanel) {
		$show($id('de-panel-buttons'));
	}
	switch(name) {
	case 'fav':
		if(data) {
			showFavoritesWindow(body, data);
			break;
		}
		readFavorites().then(favObj => {
			showFavoritesWindow(body, favObj);
			$show(win);
			if(isAnim) {
				win.classList.add('de-win-open');
			}
		});
		return;
	case 'cfg': CfgWindow.initCfgWindow(body); break;
	case 'hid': showHiddenWindow(body); break;
	case 'vid': showVideosWindow(body);
	}
	$show(win);
	if(isAnim) {
		win.classList.add('de-win-open');
	}
}

/* ==[ WindowVidHid.js ]======================================================================================
                                        WINDOW: VIDEOS, HIDDEN THREADS
=========================================================================================================== */

function showVideosWindow(body) {
	const els = $Q('.de-video-link');
	if(!els.length) {
		body.innerHTML = `<b>${ Lng.noVideoLinks[lang] }</b>`;
		return;
	}
	// EXCLUDED FROM FIREFOX EXTENSION - START
	if(!$id('de-ytube-api')) {
		// YouTube APT script. We canʼt insert scripts directly as html.
		const script = doc.createElement('script');
		script.type = 'text/javascript';
		script.src = aib.prot + '//www.youtube.com/player_api';
		script.id = 'de-ytube-api';
		doc.head.append(script);
	}
	// EXCLUDED FROM FIREFOX EXTENSION - END
	body.innerHTML = `<div de-disableautoplay class="de-video-obj"></div>
	<div id="de-video-buttons">
		<a class="de-abtn" id="de-video-btn-prev" href="#" title="${ Lng.prevVideo[lang] }">&#x25C0;</a>
		<a class="de-abtn" id="de-video-btn-resize" href="#" title="${ Lng.expandVideo[lang] }"></a>
		<a class="de-abtn" id="de-video-btn-next" href="#" title="${ Lng.nextVideo[lang] }">&#x25B6;</a>
		<a class="de-abtn" id="de-video-btn-hide" href="#" title="${ Lng.hideLnkList[lang] }">&#x25B2;</a>
	</div>`;
	const linkList = $add(`<div id="de-video-list" style="max-width: ${
		+Cfg.YTubeWidth + 40 }px; max-height: ${
		nav.viewportHeight() * 0.92 - +Cfg.YTubeHeigh - 82 }px;"></div>`);

	// EXCLUDED FROM FIREFOX EXTENSION - START
	// A script to detect the end of current video playback, and auto play next. Uses YouTube API.
	// The first video should not start automatically!
	const script = doc.createElement('script');
	script.type = 'text/javascript';
	script.textContent = `(function() {
		if('YT' in window && 'Player' in window.YT) {
			onYouTubePlayerAPIReady();
		} else {
			window.onYouTubePlayerAPIReady = onYouTubePlayerAPIReady;
		}
		function onYouTubePlayerAPIReady() {
			window.de_addVideoEvents =
				addEvents.bind(document.querySelector('#de-win-vid > .de-win-body > .de-video-obj'));
			window.de_addVideoEvents();
		}
		function addEvents() {
			var autoplay = true;
			if(this.hasAttribute('de-disableautoplay')) {
				autoplay = false;
				this.removeAttribute('de-disableautoplay');
			}
			new YT.Player(this.firstChild, { events: {
				'onError': gotoNextVideo,
				'onReady': autoplay ? function(e) {
					e.target.playVideo();
				} : Function.prototype,
				'onStateChange': function(e) {
					if(e.data === 0) {
						gotoNextVideo();
					}
				}
			}});
		}
		function gotoNextVideo() {
			document.getElementById("de-video-btn-next").click();
		}
	})();`;
	body.append(script);
	// EXCLUDED FROM FIREFOX EXTENSION - END

	// Events for control buttons
	body.addEventListener('click', {
		linkList,
		currentLink : null,
		listHidden  : false,
		player      : body.firstElementChild,
		playerInfo  : null,
		handleEvent(e) {
			const el = e.target;
			if(el.classList.contains('de-abtn')) {
				let node;
				switch(el.id) {
				case 'de-video-btn-hide': { // Fold/unfold list of links
					const isHide = this.listHidden = !this.listHidden;
					$toggle(this.linkList, !isHide);
					el.textContent = isHide ? '\u25BC' : '\u25B2';
					break;
				}
				case 'de-video-btn-prev': // Play previous video
					node = this.currentLink.parentNode;
					node = node.previousElementSibling || node.parentNode.lastElementChild;
					node.lastElementChild.click();
					break;
				case 'de-video-btn-next': // Play next video
					node = this.currentLink.parentNode;
					node = node.nextElementSibling || node.parentNode.firstElementChild;
					node.lastElementChild.click();
					break;
				case 'de-video-btn-resize': { // Expand/collapse video player
					const exp = this.player.className === 'de-video-obj';
					this.player.className = exp ? 'de-video-obj de-video-expanded' : 'de-video-obj';
					this.linkList.style.maxWidth = `${ exp ? 894 : +Cfg.YTubeWidth + 40 }px`;
					this.linkList.style.maxHeight = `${ nav.viewportHeight() * 0.92 -
						(exp ? 562 : +Cfg.YTubeHeigh + 82) }px`;
				}
				}
				e.preventDefault();
				return;
			} else if(!el.classList.contains('de-video-link')) { // Clicking on ">" before link
				// Go to post that contains this link
				pByNum.get(+el.getAttribute('de-num')).selectAndScrollTo();
				return;
			}
			const info = el.videoInfo;
			if(this.playerInfo !== info) { // Prevents same link clicking
				// Mark new link as a current and add player for it
				if(this.currentLink) {
					this.currentLink.classList.remove('de-current');
				}
				this.currentLink = el;
				el.classList.add('de-current');
				Videos.addPlayer(this, info, el.classList.contains('de-ytube'), true);
			}
			e.preventDefault();
		}
	}, true);

	// Copy all video links into videos list
	for(let i = 0, len = els.length; i < len; ++i) {
		updateVideoList(linkList, els[i], aib.getPostOfEl(els[i]).num);
	}
	body.append(linkList);
	$q('.de-video-link', linkList).click();
}

function updateVideoList(parent, link, num) {
	const el = link.cloneNode(true);
	el.videoInfo = link.videoInfo;
	el.classList.remove('de-current');
	el.setAttribute('onclick', 'window.de_addVideoEvents && window.de_addVideoEvents();');
	$bEnd(parent, `<div class="de-entry ${ aib.cReply }">
		<a class="de-video-refpost" title=">>${ num }" de-num="${ num }">&gt;&gt;</a>
	</div>`).append(el);
}

// HIDDEN THREADS WINDOW
function showHiddenWindow(body) {
	const boards = HiddenThreads.getRawData();
	const hasThreads = !$isEmpty(boards);
	if(hasThreads) {
		// Generate DOM for the list of hidden threads
		for(const board in boards) {
			if(!$hasProp(boards, board)) {
				continue;
			}
			const threads = boards[board];
			if($isEmpty(threads)) {
				continue;
			}
			const block = $bEnd(body,
				`<div class="de-fold-block"><input type="checkbox"><b>/${ board }</b></div>`);
			block.firstChild.onclick =
				e => $Q('.de-entry > input', block).forEach(el => (el.checked = e.target.checked));
			for(const tNum in threads) {
				if($hasProp(threads, tNum)) {
					block.insertAdjacentHTML('beforeend',
						`<div class="de-entry ${ aib.cReply }" info="${ board };${ tNum }">
							<input type="checkbox">
							<a href="${ aib.getThrUrl(board, tNum) }" target="_blank">${ tNum }</a>
							<div class="de-entry-title">- ${ threads[tNum][2] }</div>
						</div>`);
				}
			}
		}
	}
	$bEnd(body, (!hasThreads ? `<center><b>${ Lng.noHidThr[lang] }</b></center>` : '') +
		'<div id="de-hid-buttons"></div>'
	).append(
		// "Edit" button. Calls a popup with editor to edit Hidden in JSON.
		getEditButton('hidden', fn => fn(HiddenThreads.getRawData(), true, data => {
			HiddenThreads.saveRawData(data);
			Thread.first.updateHidden(data[aib.b]);
			toggleWindow('hid', true);
		})),
		// "Clear" button. Allows to clear 404'd threads.
		$button(Lng.clear[lang], Lng.clrDeleted[lang], async e => {
			// Sequentially load threads, and remove inaccessible
			const els = $Q('.de-entry[info]', e.target.parentNode.parentNode);
			for(let i = 0, len = els.length; i < len; ++i) {
				const [board, tNum] = els[i].getAttribute('info').split(';');
				await $ajax(aib.getThrUrl(board, tNum)).catch(err => {
					if(err.code === 404) {
						HiddenThreads.removeStorage(tNum, board);
						HiddenPosts.removeStorage(tNum, board);
					}
				});
			}
			toggleWindow('hid', true);
		}),
		// "Delete" button. Allows to delete selected threads
		$button(Lng.remove[lang], Lng.delEntries[lang], () => {
			$Q('.de-entry[info]', body).forEach(el => {
				if(!$q('input', el).checked) {
					return;
				}
				const [board, tNum] = el.getAttribute('info').split(';');
				const num = +tNum;
				if(pByNum.has(num)) {
					pByNum.get(num).setUserVisib(false);
				} else {
					sendStorageEvent('__de-post', { brd: board, num, hide: false, thrNum: num });
				}
				HiddenThreads.removeStorage(num, board);
				HiddenPosts.set(num, num, false); // Actually unhide thread by its oppost
			});
			toggleWindow('hid', true);
		})
	);
}

/* ==[ WindowFavorites.js ]===================================================================================
                                              WINDOW: FAVORITES
=========================================================================================================== */

function saveRenewFavorites(favObj) {
	saveFavorites(favObj);
	toggleWindow('fav', true, favObj);
}

function removeFavEntry(favObj, host, board, num) {
	const entry = favObj[host]?.[board];
	if(entry?.[num]) {
		delete entry[num];
		if(!(Object.keys(entry).length - +$hasProp(entry, 'url') - +$hasProp(entry, 'hide'))) {
			delete favObj[host][board];
			if($isEmpty(favObj[host])) {
				delete favObj[host];
			}
		}
	}
}

function toggleThrFavBtn(host, board, num, isEnable) {
	if(host === aib.host && board === aib.b && pByNum.has(num)) {
		const post = pByNum.get(num);
		post.toggleFavBtn(isEnable);
		post.thr.isFav = isEnable;
	}
}

function updateFavorites(num, value, mode) {
	readFavorites().then(favObj => {
		const entry = favObj[aib.host]?.[aib.b]?.[num];
		if(!entry) {
			return;
		}
		let isUpdate = false;
		switch(mode) {
		case 'error':
			if(entry.err !== value) {
				isUpdate = true;
			}
			entry.err = value;
			break;
		case 'update':
			if(entry.cnt !== value[0]) {
				isUpdate = true;
			}
			entry.cnt = value[0];
			entry.new = entry.you = 0;
			entry.last = aib.anchor + value[1];
		}
		if(isUpdate) {
			const data = [aib.host, aib.b, num, value, mode];
			updateFavWindow(...data);
			saveFavorites(favObj);
			sendStorageEvent('__de-favorites', data);
		}
	});
}

function updateFavWindow(host, board, num, value, mode) {
	if(mode === 'add' || mode === 'delete') {
		toggleThrFavBtn(host, board, num, mode === 'add');
		toggleWindow('fav', true, value);
		return;
	}
	const winEl = $q('#de-win-fav > .de-win-body');
	if(!winEl?.hasChildNodes()) {
		return;
	}
	const el = $q(`.de-entry[de-host="${
		host }"][de-board="${ board }"][de-num="${ num }"] > .de-fav-inf`, winEl);
	if(!el) {
		return;
	}
	const [iconEl, youEl, newEl, oldEl] = [...el.children];
	$hide(youEl);
	$hide(newEl);
	if(mode === 'error') {
		iconEl.firstElementChild.setAttribute('class', 'de-fav-inf-icon de-fav-unavail');
		iconEl.title = value;
		return;
	}
	youEl.textContent = 0;
	newEl.textContent = 0;
	oldEl.textContent = value[0];
}

// Delete previously marked entries from Favorites
function cleanFavorites() {
	const els = $Q('.de-entry[de-removed]');
	const len = els.length;
	if(!len) {
		return;
	}
	readFavorites().then(favObj => {
		for(let i = 0; i < len; ++i) {
			const el = els[i];
			const host = el.getAttribute('de-host');
			const board = el.getAttribute('de-board');
			const num = +el.getAttribute('de-num');
			removeFavEntry(favObj, host, board, num);
			toggleThrFavBtn(host, board, num, false);
		}
		saveRenewFavorites(favObj);
	});
}

function showFavoritesWindow(body, favObj) {
	let html = '';
	// Create the list of favorite threads
	for(const host in favObj) {
		if(!$hasProp(favObj, host)) {
			continue;
		}
		const boards = favObj[host];
		for(const board in boards) {
			if(!$hasProp(boards, board)) {
				continue;
			}
			const threads = boards[board];
			const hb = `de-host="${ host }" de-board="${ board }"`;
			const delBtn = `<span class="de-fav-del-btn">
				<svg><use xlink:href="#de-symbol-win-close"></use></svg>
			</span>`;
			let tNums;
			const tArr = Object.entries(threads);
			switch(Cfg.favThrOrder) {
			case 0: tNums = tArr; break;
			case 1: tNums = tArr.reverse(); break;
			case 2: tNums = tArr.sort((a, b) => (a[1].time || 0) - (b[1].time || 0)); break;
			case 3: tNums = tArr.sort((a, b) => (b[1].time || 0) - (a[1].time || 0));
			}
			let innerHtml = '';
			for(let i = 0, len = tNums.length; i < len; ++i) {
				const tNum = tNums[i][0];
				if(tNum === 'url' || tNum === 'hide') {
					continue;
				}
				const entry = threads[tNum];
				// Generate DOM for separate entry
				const favLinkHref = entry.url + (
					!entry.last ? '' :
					entry.last.startsWith('#') ? entry.last :
					host === aib.host ? aib.anchor + entry.last : '');
				const favInfIwrapTitle = !entry.err ? '' :
					entry.err === 'Closed' ? `title="${ Lng.thrClosed[lang] }"` : `title="${ entry.err }"`;
				const favInfIconClass = !entry.err ? '' :
					entry.err === 'Closed' || entry.err === 'Archived' ? 'de-fav-closed' : 'de-fav-unavail';
				const favInfYouDisp = entry.you ? '' : ' style="display: none;"';
				const favInfNewDisp = entry.new ? '' : ' style="display: none;"';
				innerHtml += `<div class="de-entry ${ aib.cReply }" ${
					hb } de-num="${ tNum }" de-url="${ entry.url }">
					${ delBtn }
					<a class="de-fav-link" title="${ Lng.goToThread[lang] }"` +
						` href="${ favLinkHref }" rel="noreferrer">${ tNum }</a>
					<div class="de-entry-title">- ${ entry.txt }</div>
					<div class="de-fav-inf">
						<span class="de-fav-inf-iwrap" ${ favInfIwrapTitle }>
							<svg class="de-fav-inf-icon ${ favInfIconClass }">
								<use class="de-fav-closed-use" xlink:href="#de-symbol-closed"/>
								<use class="de-fav-unavail-use" xlink:href="#de-symbol-unavail"/>
								<use class="de-fav-wait-use" xlink:href="#de-symbol-wait"/>
							</svg>
						</span>
						<span class="de-fav-inf-you" title="${ Lng.myPostsRep[lang] }"${ favInfYouDisp }>
							${ entry.you || 0 }</span>
						<span class="de-fav-inf-new" title="${ Lng.newPosts[lang] }"${ favInfNewDisp }>
							${ entry.new || 0 }</span>
						<span class="de-fav-inf-old" title="${ Lng.oldPosts[lang] }">${ entry.cnt }</span>
						<span class="de-fav-inf-page" title="${ Lng.thrPage[lang] }"></span>
					</div>
				</div>`;
			}
			if(!innerHtml) {
				continue;
			}
			const isHide = threads.hide === undefined ? host !== aib.host : threads.hide;
			// Building a foldable block for specific board
			html += `<div class="de-fold-block${
				host === aib.host && board === aib.b ? ' de-fav-current' : '' }">
				<div class="de-fav-header">
					${ delBtn }
					<a class="de-fav-header-link" title="${ Lng.goToBoard[lang] }"` +
						` href="${ threads.url }" rel="noreferrer">${ host }/${ board }</a>
					<a class="de-abtn de-fav-header-btn" title="${ Lng.toggleEntries[lang] }"` +
						` href="#">${ isHide ? '&#x25BC;' : '&#x25B2;' }</a>
				</div>
				<div class="de-fav-entries${ isHide ? ' de-fav-entries-hide' : '' }" ${ hb }>
					${ innerHtml }
				</div>
			</div>`;
		}
	}

	// Appending DOM and events
	if(html) {
		$bEnd(body, `<div class="de-fav-table">${ html }</div>`).addEventListener('click', e => {
			let el = nav.fixEventEl(e.target);
			let parentEl = el.parentNode;
			if(el.tagName.toLowerCase() === 'svg') {
				el = parentEl;
				parentEl = parentEl.parentNode;
			}
			switch(el.className) {
			case 'de-fav-link':
				sesStorage['de-fav-win'] = '1'; // Favorites will open again after following a link
				// We need to scroll to last seen post after following a link,
				// remembering of scroll position is no longer needed
				sesStorage.removeItem('de-scroll-' +
					parentEl.getAttribute('de-board') + (parentEl.getAttribute('de-num') || ''));
				break;
			case 'de-fav-del-btn': {
				const wasChecked = el.getAttribute('de-checked') === '';
				const toggleFn = btnEl => $toggleAttr(btnEl, 'de-checked', '', !wasChecked);
				toggleFn(el);
				if(parentEl.className === 'de-fav-header') {
					// Select/unselect all checkboxes in board block
					const entriesEl = parentEl.nextElementSibling;
					$Q('.de-fav-del-btn', entriesEl).forEach(toggleFn);
					if(!wasChecked && entriesEl.classList.contains('de-fav-entries-hide')) {
						entriesEl.classList.remove('de-fav-entries-hide');
					}
				}
				const isShowDelBtns = !!$q('.de-entry > .de-fav-del-btn[de-checked]', body);
				$toggle($id('de-fav-buttons'), !isShowDelBtns);
				$toggle($id('de-fav-del-confirm'), isShowDelBtns);
				break;
			}
			case 'de-abtn de-fav-header-btn': {
				const entriesEl = parentEl.nextElementSibling;
				const isHide = !entriesEl.classList.contains('de-fav-entries-hide');
				el.innerHTML = isHide ? '&#x25BC' : '&#x25B2';
				favObj[entriesEl.getAttribute('de-host')][entriesEl.getAttribute('de-board')].hide = isHide;
				saveFavorites(favObj);
				e.preventDefault();
				entriesEl.classList.toggle('de-fav-entries-hide');
			}
			}
		});
	} else {
		body.insertAdjacentHTML('beforeend', `<center><b>${ Lng.noFavThr[lang] }</b></center>`);
	}

	const btns = $bEnd(body, '<div id="de-fav-buttons"></div>');
	btns.append(
		// "Edit" button. Calls a popup with editor to edit Favorites in JSON.
		getEditButton('favor', fn => readFavorites().then(favObj => fn(favObj, true, saveRenewFavorites))),

		// "Refresh" button. Updates counters of new posts for each thread entry.
		$button(Lng.refresh[lang], Lng.infoCount[lang], async () => {
			const favObj = await readFavorites();
			if(!favObj[aib.host]) {
				return;
			}
			let isUpdate = false;
			let last404 = false;
			const myposts = JSON.parse(locStorage['de-myposts'] || '{}');
			const els = $Q('.de-entry');
			for(let i = 0, len = els.length; i < len; ++i) {
				const el = els[i];
				const host = el.getAttribute('de-host');
				const board = el.getAttribute('de-board');
				const num = el.getAttribute('de-num');
				const entry = favObj[host][board][num];
				// Updating doesnʼt works for other domains because of different posts structure
				// Updating is not needed in closed threads
				if(host !== aib.host || entry.err === 'Closed' || entry.err === 'Archived') {
					continue;
				}
				const [titleEl, youEl, countEl] = [...el.lastElementChild.children];
				const iconEl = titleEl.firstElementChild;
				// setAttribute for class is used because of SVG (for correct work in some browsers)
				iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-wait');
				titleEl.title = Lng.updating[lang];
				let form, isArchived;
				try {
					if(!aib.hasArchive) {
						form = await ajaxLoad(aib.getThrUrl(board, num));
					} else {
						[form, isArchived] = await ajaxLoad(aib.getThrUrl(board, num), true, false, true);
					}
					last404 = false;
				} catch(err) {
					if((err instanceof AjaxError) && err.code === 404) { // Check for 404 error twice
						if(last404) {
							Thread.removeSavedData(board, num); // Not working yet
						} else {
							last404 = true;
							--i; // Repeat this cycle again
							continue;
						}
					}
					last404 = false;
					$hide(countEl);
					$hide(youEl);
					iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-unavail');
					entry.err = titleEl.title = getErrorMessage(err);
					isUpdate = true;
					continue;
				}
				if(aib.qClosed && $q(aib.qClosed, form)) { // Check for closed thread
					iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-closed');
					titleEl.title = Lng.thrClosed[lang];
					entry.err = 'Closed';
					isUpdate = true;
				} else if(isArchived) {
					iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-closed');
					titleEl.title = Lng.thrArchived[lang];
					entry.err = 'Archived';
					isUpdate = true;
				} else {
					// Thread is available and not closed
					iconEl.setAttribute('class', 'de-fav-inf-icon');
					titleEl.removeAttribute('title');
					if(entry.err) { // Cancel error status if existed
						delete entry.err;
						isUpdate = true;
					}
				}
				// Updating a counter of new posts
				const posts = $Q(aib.qPost, form);
				const cnt = posts.length + 1 - entry.cnt;
				countEl.textContent = cnt;
				if(cnt === 0) {
					$hide(countEl); // Hide counter if no new posts
					$hide(youEl);
				} else {
					$show(countEl);
					entry.new = cnt;
					isUpdate = true;
					// Check for replies to my posts
					if(myposts?.[board]) {
						entry.you = 0;
						for(let j = 0; j < cnt; ++j) {
							const links = $Q(aib.qPostMsg.split(', ').join(' a, ') + ' a',
								posts[posts.length - 1 - j]);
							for(let a = 0, len = links.length; a < len; ++a) {
								const tc = links[a].textContent;
								if(tc[0] === '>' && tc[1] === '>' && myposts[board][tc.substr(2)]) {
									entry.you++;
								}
							}
						}
						if(entry.you) {
							youEl.textContent = entry.you;
							$show(youEl);
						}
					}
				}
			}
			AjaxCache.clearCache();
			if(isUpdate) {
				saveFavorites(favObj);
			}
		}),

		// "Page" button. Shows on which page every thread is existed.
		$button(Lng.page[lang], Lng.infoPage[lang], async () => {
			const els = $Q('.de-fav-current > .de-fav-entries > .de-entry');
			const len = els.length;
			if(!len) { // Cancel if no existed entries
				return;
			}
			$popup('load-pages', Lng.loading[lang], true);
			// Create indexed array of entries and "waiting" SVG icon for each entry
			const thrInfo = [];
			for(let i = 0; i < len; ++i) {
				const el = els[i];
				const iconEl = $q('.de-fav-inf-icon', el);
				const titleEl = iconEl.parentNode;
				thrInfo.push({
					found     : false,
					num       : +el.getAttribute('de-num'),
					pageEl    : $q('.de-fav-inf-page', el),
					iconClass : iconEl.getAttribute('class'),
					iconEl,
					iconTitle : titleEl.getAttribute('title'),
					titleEl
				});
				iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-wait');
				titleEl.title = Lng.updating[lang];
			}
			// Sequentially load pages and search for favorites threads
			// We cannot know a count of pages while in the thread
			const endPage = (aib.lastPage || 10) + 1; // Check up to 10 page, if we donʼt know
			let infoLoaded = 0;
			const updateInf = (inf, page) => {
				inf.iconEl.setAttribute('class', inf.iconClass);
				$toggleAttr(inf.titleEl, 'title', inf.iconTitle, inf.iconTitle);
				inf.pageEl.textContent = '@' + page;
			};
			for(let page = 0; page < endPage; ++page) {
				const tNums = new Set();
				try {
					const form = await ajaxLoad(aib.getPageUrl(aib.b, page));
					const els = DelForm.getThreads(form);
					for(let i = 0, len = els.length; i < len; ++i) {
						tNums.add(aib.getTNum(els[i]));
					}
				} catch(err) {
					continue;
				}
				// Search for threads on current page
				for(let i = 0; i < len; ++i) {
					const inf = thrInfo[i];
					if(tNums.has(inf.num)) {
						updateInf(inf, page);
						inf.found = true;
						infoLoaded++;
					}
				}
				if(infoLoaded === len) { // Stop pages loading when all favorite threads checked
					break;
				}
			}
			// Process missed threads that not found
			for(let i = 0; i < len; ++i) {
				const inf = thrInfo[i];
				if(!inf.found) {
					updateInf(inf, '?');
				}
			}
			closePopup('load-pages');
		}),

		// "Clear" button. Allows to clear 404'd threads.
		$button(Lng.clear[lang], Lng.clrDeleted[lang], async () => {
			// Sequentially load threads, and remove inaccessible
			let last404 = false;
			const els = $Q('.de-entry');
			const parent = $q('.de-fav-table');
			parent.classList.add('de-fav-table-unfold');
			for(let i = 0, len = els.length; i < len; ++i) {
				const el = els[i];
				const iconEl = $q('.de-fav-inf-icon', el);
				const titleEl = iconEl.parentNode;
				iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-wait');
				titleEl.title = Lng.updating[lang];
				await $ajax(el.getAttribute('de-url'), null, true).then(xhr => {
					switch(el.getAttribute('de-host')) { // Makaba doesnʼt return 404
					case '2ch.hk':
					case '2ch.pm': {
						const dc = $createDoc(xhr.responseText);
						if(dc && $q('.message-title', dc)) {
							throw new AjaxError(404, 'Error');
						}
					}
					}
					iconEl.setAttribute('class', 'de-fav-inf-icon');
					titleEl.removeAttribute('title');
					last404 = false;
				}).catch(err => {
					if(err.code === 404) { // Check for 404 error twice
						if(!last404) {
							last404 = true;
							--i; // Repeat this cycle again
							return;
						}
						Thread.removeSavedData(el.getAttribute('de-board'), // Not working yet
							+el.getAttribute('de-num'));
						el.setAttribute('de-removed', ''); // Mark an entry as deleted
					}
					iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-unavail');
					titleEl.title = getErrorMessage(err);
					last404 = false;
				});
			}
			cleanFavorites(); // Delete marked entries
			parent.classList.remove('de-fav-table-unfold');
		})
	);

	// Deletion confirm/cancel buttons
	const delBtns = $bEnd(body, '<div id="de-fav-del-confirm" style="display: none;"></div>');
	delBtns.append(
		$button(Lng.remove[lang], Lng.delEntries[lang], () => {
			$Q('.de-entry > .de-fav-del-btn[de-checked]', body).forEach(
				el => el.parentNode.setAttribute('de-removed', ''));
			cleanFavorites(); // Delete marked entries
			$show(btns);
			$hide(delBtns);
		}),
		$button(Lng.cancel[lang], '', () => {
			$Q('.de-fav-del-btn', body).forEach(el => el.removeAttribute('de-checked'));
			$show(btns);
			$hide(delBtns);
		})
	);
}

/* ==[ WindowSettings.js ]====================================================================================
                                               WINDOW: SETTINGS
=========================================================================================================== */

const CfgWindow = {
	initCfgWindow(body) {
		['click', 'mouseover', 'mouseout', 'change', 'keyup', 'keydown', 'scroll'].forEach(
			e => body.addEventListener(e, this));

		// Create tab bar and bottom buttons
		let div = $bEnd(body, `<div id="de-cfg-bar">${
			this._getTab('filters') +
			this._getTab('posts') +
			this._getTab('images') +
			this._getTab('links') +
			(pr.form || pr.oeForm ? this._getTab('form') : '') +
			this._getTab('common') +
			this._getTab('info')
		}</div><div id="de-cfg-buttons">${ this._getSel('language') }</div>`);

		// Open default or current tab
		this._clickTab(Cfg.cfgTab);

		div.append(
			// "Edit" button. Calls a popup with editor to edit Settings in JSON.
			getEditButton('cfg', fn => fn(Cfg, true, data => {
				saveCfgObj(aib.dm, data);
				deWindow.location.reload();
			})),

			// "Global" button. Allows to save/load global settings.
			nav.hasGlobalStorage ? $button(Lng.global[lang], Lng.globalCfg[lang], () => {
				const el = $popup('cfg-global', `<b>${ Lng.globalCfg[lang] }:</b>`);
				// "Load" button. Applies global settings for current domain.
				$bEnd(el, `<div id="de-list"><input type="button" value="${
					Lng.load[lang] }"> ${ Lng.loadGlobal[lang] }</div>`
				).firstElementChild.onclick = () => getStoredObj('DESU_Config').then(data => {
					if(data && ('global' in data) && !$isEmpty(data.global)) {
						saveCfgObj(aib.dm, data.global);
						deWindow.location.reload();
					} else {
						$popup('err-noglobalcfg', Lng.noGlobalCfg[lang]);
					}
				});
				// "Save" button. Copies the domain settings into global.
				div = $bEnd(el, `<div id="de-list"><input type="button" value="${
					Lng.save[lang] }"> ${ Lng.saveGlobal[lang] }</div>`
				).firstElementChild.onclick = () => getStoredObj('DESU_Config').then(data => {
					const obj = {};
					const com = data[aib.dm];
					for(const i in com) {
						if(i !== 'correctTime' && i !== 'timePattern' && i !== 'userCSS' &&
							i !== 'userCSSTxt' && i !== 'stats' && com[i] !== defaultCfg[i]
						) {
							obj[i] = com[i];
						}
					}
					data.global = obj;
					saveCfgObj('global', data.global);
					toggleWindow('cfg', true);
				});
				el.insertAdjacentHTML('beforeend', `<hr><small>${ Lng.descrGlobal[lang] }</small>`);
			}) : '',

			// "File" button. Allows to save and load settings/favorites/hidden/etc from file.
			!nav.isPresto ? $button(Lng.file[lang], Lng.fileImpExp[lang], () => {
				const list = this._getList([
					Lng.panelBtn.cfg[lang] + ' ' + Lng.allDomains[lang],
					Lng.panelBtn.fav[lang],
					Lng.hidPostThr[lang] + ` (${ aib.dm })`,
					Lng.myPosts[lang] + ` (${ aib.dm })`
				]);
				// Create popup with controls
				$popup('cfg-file', `<b>${ Lng.fileImpExp[lang] }:</b><hr><!--
					--><div class="de-list">${ Lng.fileToData[lang] }:<div class="de-depend"><!--
						--><input type="file" accept=".json" id="de-import-file"></div></div><hr><!--
					--><div class="de-list"><a id="de-export-file" href="#">${ Lng.dataToFile[lang] }:<!--
					--><div class="de-depend">${ list }</div></div>`);
				// Import data from a file to the storage
				$id('de-import-file').onchange = e => {
					const file = e.target.files[0];
					if(!file) {
						return;
					}
					readFile(file, true).then(({ data }) => {
						let obj;
						try {
							obj = JSON.parse(data);
						} catch(err) {
							$popup('err-invaliddata', Lng.invalidData[lang]);
							return;
						}
						const { settings: cfgObj, favorites: favObj, [aib.dm]: dmObj } = obj;
						const isOldCfg = !cfgObj && !favObj && !dmObj;
						if(isOldCfg) {
							setStored('DESU_Config', data);
						}
						if(cfgObj) {
							try {
								setStored('DESU_Config', JSON.stringify(cfgObj));
								setStored('DESU_keys', JSON.stringify(obj.hotkeys));
							} catch(err) {}
						}
						if(favObj) {
							saveRenewFavorites(favObj);
						}
						if(dmObj) {
							if(dmObj.posts) {
								locStorage['de-posts'] = JSON.stringify(dmObj.posts);
							}
							if(dmObj.threads) {
								locStorage['de-threads'] = JSON.stringify(dmObj.threads);
							}
							if(dmObj.myposts) {
								locStorage['de-myposts'] = JSON.stringify(dmObj.myposts);
							}
						}
						if(cfgObj || dmObj || isOldCfg) {
							$popup('cfg-file', Lng.updating[lang], true);
							deWindow.location.reload();
							return;
						}
						closePopup('cfg-file');
					});
				};

				// Export data from a storage to the file. The file will be named by date and type of storage.
				// For example, like "DE_20160727_1540_Cfg+Fav+domain.com(Hid+You).json".
				const expFile = $id('de-export-file');
				const els = $Q('input', expFile.nextElementSibling);
				els[0].checked = true;
				expFile.addEventListener('click', async e => {
					const name = [];
					const nameDm = [];
					const d = new Date();
					let val = [];
					let valDm = [];
					for(let i = 0, len = els.length; i < len; ++i) {
						if(!els[i].checked) {
							continue;
						}
						switch(i) {
						case 0: name.push('Cfg'); {
							const cfgData = await Promise.all(
								[getStored('DESU_Config'), getStored('DESU_keys')]);
							val.push(`"settings":${ cfgData[0] }`, `"hotkeys":${ cfgData[1] || '""' }`);
							break;
						}
						case 1: name.push('Fav');
							val.push(`"favorites":${ await getStored('DESU_Favorites') || '{}' }`);
							break;
						case 2: nameDm.push('Hid');
							valDm.push(`"posts":${ locStorage['de-posts'] || '{}' }`,
								`"threads":${ locStorage['de-threads'] || '{}' }`);
							break;
						case 3: nameDm.push('You');
							valDm.push(`"myposts":${ locStorage['de-myposts'] || '{}' }`);
						}
					}
					if((valDm = valDm.join(','))) {
						val.push(`"${ aib.dm }":{${ valDm }}`);
						name.push(`${ aib.dm } (${ nameDm.join('+') })`);
					}
					if((val = val.join(','))) {
						downloadBlob(new Blob([`{${ val }}`], { type: 'application/json' }),
							`DE_${ d.getFullYear() }${ pad2(d.getMonth() + 1) }${ pad2(d.getDate()) }_${
								pad2(d.getHours()) }${ pad2(d.getMinutes()) }_${ name.join('+') }.json`);
					}
					e.preventDefault();
				}, true);
			}) : '',

			// "Clear" button. Allows to clear settings/favorites/hidden/etc optionally.
			$button(Lng.reset[lang] + '…', Lng.resetCfg[lang], () => $popup(
				'cfg-reset',
				`<b>${ Lng.resetData[lang] }:</b><hr>` +
				`<div class="de-list"><b>${ aib.dm }:</b>${
					this._getList([Lng.panelBtn.cfg[lang], Lng.hidPostThr[lang], Lng.myPosts[lang]])
				}</div><hr>` +
				`<div class="de-list"><b>${ Lng.allDomains[lang] }:</b>${
					this._getList([Lng.panelBtn.cfg[lang], Lng.panelBtn.fav[lang]])
				}</div><hr>`
			).append($button(Lng.clear[lang], '', e => {
				const els = $Q('input[type="checkbox"]', e.target.parentNode);
				for(let i = 1, len = els.length; i < len; ++i) {
					if(!els[i].checked) {
						continue;
					}
					switch(i) {
					case 1:
						locStorage.removeItem('de-posts');
						locStorage.removeItem('de-threads');
						break;
					case 2: locStorage.removeItem('de-myposts'); break;
					case 4: delStored('DESU_Favorites');
					}
				}
				if(els[3].checked) {
					delStored('DESU_Config');
					delStored('DESU_keys');
				} else if(els[0].checked) {
					getStoredObj('DESU_Config').then(data => {
						delete data[aib.dm];
						setStored('DESU_Config', JSON.stringify(data));
						$popup('cfg-reset', Lng.updating[lang], true);
						deWindow.location.reload();
					});
					return;
				}
				$popup('cfg-reset', Lng.updating[lang], true);
				deWindow.location.reload();
			})))
		);
	},

	// Event handler for Setting window and its controls.
	handleEvent(e) {
		const { type, target: el } = e;
		const tag = el.tagName;
		if(type === 'click' && tag === 'DIV' && el.classList.contains('de-cfg-tab')) {
			const info = el.getAttribute('info');
			this._clickTab(info);
			saveCfg('cfgTab', info);
		}
		if(type === 'change' && tag === 'SELECT') {
			const info = el.getAttribute('info');
			saveCfg(info, el.selectedIndex);
			this._updateDependant();
			switch(info) {
			case 'language':
				lang = el.selectedIndex;
				Panel.removeMain();
				if(pr.form) {
					pr.addMarkupPanel();
					pr.setPlaceholders();
					pr.updateLanguage();
					aib.updateSubmitBtn(pr.subm);
					if(pr.files) {
						$Q('.de-file-img, .de-file-txt-input', pr.form).forEach(
							el => (el.title = Lng.youCanDrag[lang]));
					}
				}
				this._updateCSS();
				Panel.initPanel(DelForm.first.el);
				toggleWindow('cfg', false);
				break;
			case 'delHiddPost': {
				const isHide = Cfg.delHiddPost === 1 || Cfg.delHiddPost === 2;
				for(let post = Thread.first.op; post; post = post.next) {
					if(post.isHidden && !post.isOp) {
						post.wrap.classList.toggle('de-hidden', isHide);
					}
				}
				updateCSS();
				break;
			}
			case 'postBtnsCSS':
				updateCSS();
				if(nav.isPresto) {
					$q('.de-svg-icons').remove();
					addSVGIcons();
				}
				break;
			case 'thrBtns':
			case 'noSpoilers':
			case 'resizeImgs': updateCSS(); break;
			case 'expandImgs':
				updateCSS();
				AttachedImage.closeImg();
				break;
			case 'imgNames':
				if(Cfg.imgNames) {
					for(const { el } of DelForm) {
						processImgInfoLinks(el, 0, Cfg.imgNames);
					}
				} else {
					$Q('.de-img-name').forEach(el => (el.textContent = el.getAttribute('de-img-name-old')));
				}
				updateCSS();
				break;
			case 'fileInputs':
				pr.files.changeMode();
				pr.setPlaceholders();
				updateCSS();
				break;
			case 'addPostForm':
				pr.isBottom = Cfg.addPostForm === 1;
				pr.setReply(false, !aib.t || Cfg.addPostForm > 1);
				break;
			case 'addTextBtns': pr.addMarkupPanel();
				/* falls through */
			case 'scriptStyle':
			case 'panelCounter': this._updateCSS(); break;
			case 'favThrOrder':
				readFavorites().then(favObj => {
					const body = $q('#de-win-fav > .de-win-body');
					body.innerHTML = '';
					showFavoritesWindow(body, favObj);
				});
			}
			return;
		}
		if(type === 'click' && tag === 'INPUT' && el.type === 'checkbox') {
			const info = el.getAttribute('info');
			toggleCfg(info);
			this._updateDependant();
			switch(info) {
			case 'expandTrunc':
			case 'widePosts':
			case 'showHideBtn':
			case 'showRepBtn':
			case 'noPostNames':
			case 'imgNavBtns':
			case 'strikeHidd':
			case 'removeHidd':
			case 'noBoardRule':
			case 'userCSS': updateCSS(); break;
			case 'hideBySpell': Spells.toggle(); break;
			case 'sortSpells':
				if(Cfg.sortSpells) {
					Spells.toggle();
				}
				break;
			case 'hideRefPsts':
				for(let post = Thread.first.op; post; post = post.next) {
					if(!Cfg.hideRefPsts) {
						post.ref.unhideRef();
					} else if(post.isHidden) {
						post.ref.hideRef();
					}
				}
				break;
			case 'ajaxUpdThr':
				if(aib.t) {
					if(Cfg.ajaxUpdThr) {
						updater.enableUpdater();
					} else {
						updater.disableUpdater();
					}
				}
				break;
			case 'updCount': updater.toggleCounter(Cfg.updCount); break;
			case 'desktNotif':
				if(Cfg.desktNotif) {
					Notification.requestPermission();
				}
				break;
			case 'markNewPosts': Post.clearMarks(); break;
			case 'useDobrAPI': aib.JsonBuilder = Cfg.useDobrAPI ? DobrochanPostsBuilder : null; break;
			case 'markMyPosts':
			case 'markMyLinks':
				if(!Cfg.markMyPosts && !Cfg.markMyLinks) {
					locStorage.removeItem('de-myposts');
					MyPosts.purge();
				}
				updateCSS();
				break;
			case 'correctTime': DateTime.toggleSettings(el); break;
			case 'imgInfoLink': {
				const img = $q('.de-fullimg-wrap');
				if(img) {
					img.click();
				}
				updateCSS();
				break;
			}
			case 'imgSrcBtns':
				if(Cfg.imgSrcBtns) {
					for(const { el } of DelForm) {
						processImgInfoLinks(el, 1, 0);
						$Q('.de-img-embed').forEach(
							el => addImgButtons(el.parentNode.nextSibling.nextSibling));
					}
				} else {
					$delAll('.de-btn-img');
				}
				break;
			case 'addSageBtn':
				PostForm.hideField(pr.mail.closest('label') || pr.mail);
				setTimeout(() => pr.toggleSage(), 0);
				updateCSS();
				break;
			case 'altCaptcha': pr.cap.initCapPromise(); break;
			case 'txtBtnsLoc':
				pr.addMarkupPanel();
				updateCSS();
				break;
			case 'userPassw': PostForm.setUserPassw(); break;
			case 'userName': PostForm.setUserName(); break;
			case 'noPassword': $toggle(pr.passw.closest(aib.qFormTr)); break;
			case 'noName': PostForm.hideField(pr.name); break;
			case 'noSubj': PostForm.hideField(pr.subj); break;
			case 'inftyScroll': toggleInfinityScroll(); break;
			case 'hotKeys':
				if(Cfg.hotKeys) {
					HotKeys.enableHotKeys();
				} else {
					HotKeys.disableHotKeys();
				}
			}
			return;
		}
		if(type === 'click' && tag === 'INPUT' && el.type === 'button') {
			switch(el.id) {
			case 'de-cfg-button-pass':
				$q('input[info="passwValue"]').value = Math.round(Math.random() * 1e12).toString(32);
				PostForm.setUserPassw();
				break;
			case 'de-cfg-button-keys':
				e.preventDefault();
				if($id('de-popup-edit-hotkeys')) {
					return;
				}
				Promise.resolve(HotKeys.readKeys()).then(keys => {
					const temp = KeyEditListener.getEditMarkup(keys);
					const el = $popup('edit-hotkeys', temp[1]);
					const fn = new KeyEditListener(el, keys, temp[0]);
					['focus', 'blur', 'click', 'keydown', 'keyup'].forEach(
						e => el.addEventListener(e, fn, true));
				});
				break;
			case 'de-cfg-button-updnow':
				$popup('updavail', Lng.loading[lang], true);
				getStoredObj('DESU_Config')
					.then(data => checkForUpdates(true, data.lastUpd))
					.then(html => $popup('updavail', html), emptyFn);
				break;
			case 'de-cfg-button-donate': showDonateMsg(); break;
			case 'de-cfg-button-debug': {
				const perf = {};
				const arr = Logger.getLogData(true);
				for(let i = 0, len = arr.length; i < len; ++i) {
					perf[arr[i][0]] = arr[i][1];
				}
				$popup('cfg-debug', Lng.infoDebug[lang] + ':<textarea readonly class="de-editor"></textarea>'
				).firstElementChild.value = JSON.stringify({
					version  : version + '.' + commit,
					location : String(deWindow.location),
					nav,
					Cfg,
					sSpells  : Spells.list.split('\n'),
					oSpells  : sesStorage[`de-spells-${ aib.b }${ aib.t || '' }`],
					perf
				}, (key, value) => {
					switch(key) {
					case 'stats':
					case 'nameValue':
					case 'passwValue':
					case 'ytApiKey': return undefined;
					}
					return key in defaultCfg && value === defaultCfg[key] ? undefined : value;
				}, '\t');
			}
			}
		}
		if(type === 'keyup' && tag === 'INPUT' && el.type === 'text') {
			const info = el.getAttribute('info');
			switch(info) {
			case 'postBtnsBack': {
				const isCheck = checkCSSColor(el.value);
				el.classList.toggle('de-input-error', !isCheck);
				if(isCheck) {
					saveCfg('postBtnsBack', el.value);
					updateCSS();
				}
				break;
			}
			case 'limitPostMsg':
				saveCfg('limitPostMsg', Math.max(+el.value || 0, 50));
				updateCSS();
				break;
			case 'minImgSize': saveCfg('minImgSize', Math.max(+el.value, 1)); break;
			case 'zoomFactor': saveCfg('zoomFactor', Math.min(Math.max(+el.value, 1), 100)); break;
			case 'webmVolume': {
				const val = Math.min(+el.value || 0, 100);
				saveCfg('webmVolume', val);
				sendStorageEvent('__de-webmvolume', val);
				break;
			}
			case 'minWebmWidth': saveCfg('minWebmWidth', Math.max(+el.value, Cfg.minImgSize)); break;
			case 'maskVisib':
				saveCfg('maskVisib', Math.min(+el.value || 0, 100));
				updateCSS();
				break;
			case 'linksOver': saveCfg('linksOver', +el.value | 0); break;
			case 'linksOut': saveCfg('linksOut', +el.value | 0); break;
			case 'ytApiKey': saveCfg('ytApiKey', el.value.trim()); break;
			case 'passwValue': PostForm.setUserPassw(); break;
			case 'nameValue': PostForm.setUserName(); break;
			default: saveCfg(info, el.value);
			}
			return;
		}
		if(tag === 'A') {
			if(el.id === 'de-btn-spell-add') {
				switch(e.type) {
				case 'click': e.preventDefault(); break;
				case 'mouseover': el.odelay = setTimeout(() => addMenu(el), Cfg.linksOver); break;
				case 'mouseout': clearTimeout(el.odelay);
				}
				return;
			}
			if(type === 'click') {
				switch(el.id) {
				case 'de-btn-spell-apply':
					e.preventDefault();
					saveCfg('hideBySpell', 1);
					$q('input[info="hideBySpell"]').checked = true;
					Spells.toggle();
					break;
				case 'de-btn-spell-clear':
					e.preventDefault();
					if(!confirm(Lng.clear[lang] + '?')) {
						return;
					}
					$id('de-spell-txt').value = '';
					Spells.toggle();
				}
			}
			return;
		}
		if(tag === 'TEXTAREA' && el.id === 'de-spell-txt' && (type === 'keydown' || type === 'scroll')) {
			this._updateRowMeter(el);
		}
	},

	// Switch content in Settings by clicking on tab
	_clickTab(info) {
		const el = $q(`.de-cfg-tab[info="${ info }"]`);
		if(el.hasAttribute('selected')) {
			return;
		}
		const prefTab = $q('.de-cfg-body');
		if(prefTab) {
			prefTab.className = 'de-cfg-unvis';
			$q('.de-cfg-tab[selected]').removeAttribute('selected');
		}
		el.setAttribute('selected', '');
		const id = el.getAttribute('info');
		let newTab = $id('de-cfg-' + id);
		if(!newTab) {
			newTab = $aEnd($id('de-cfg-bar'),
				id === 'filters' ? this._getCfgFilters() :
				id === 'posts' ? this._getCfgPosts() :
				id === 'images' ? this._getCfgImages() :
				id === 'links' ? this._getCfgLinks() :
				id === 'form' ? this._getCfgForm() :
				id === 'common' ? this._getCfgCommon() :
				this._getCfgInfo());
			if(id === 'filters') {
				this._updateRowMeter($id('de-spell-txt'));
			}
			if(id === 'common') {
				// XXX: remove and make insertion in this._getCfgCommon()
				$q('input[info="userCSS"]').parentNode.after(getEditButton(
					'css',
					fn => fn(Cfg.userCSSTxt, false, inputEl => {
						saveCfg('userCSSTxt', inputEl.value);
						updateCSS();
						toggleWindow('cfg', true);
					}),
					'de-cfg-button'
				));
			}
		}
		newTab.className = 'de-cfg-body';
		if(id === 'filters') {
			$id('de-spell-txt').value = Spells.list;
		}
		this._updateDependant();

		// Updates all inputs according to config
		const els = $Q('.de-cfg-chkbox, .de-cfg-inptxt, .de-cfg-select', newTab.parentNode);
		for(let i = 0, len = els.length; i < len; ++i) {
			const el = els[i];
			const info = el.getAttribute('info');
			if(el.tagName === 'INPUT') {
				if(el.type === 'checkbox') {
					el.checked = !!Cfg[info];
				} else {
					el.value = Cfg[info];
				}
			} else {
				el.selectedIndex = Cfg[info];
			}
		}
	},

	// "Filters" tab
	_getCfgFilters() {
		return `<div id="de-cfg-filters" class="de-cfg-unvis">
			<div id="de-spell-panel">
				${ this._getBox('hideBySpell') }
				<a id="de-btn-spell-add" class="de-abtn de-spell-btn" href="#">${ Lng.add[lang] }</a>
				<a id="de-btn-spell-apply" class="de-abtn de-spell-btn" href="#">${ Lng.apply[lang] }</a>
				<a id="de-btn-spell-clear" class="de-abtn de-spell-btn" href="#">${ Lng.clear[lang] }</a>
				<a class="de-abtn de-spell-btn" href="${ gitWiki }Spells-` +
					`${ lang ? 'en' : 'ru' }" target="_blank">[?]</a>
			</div>
			<div id="de-spell-editor">
				<div id="de-spell-rowmeter"></div>
				<textarea id="de-spell-txt" wrap="off"></textarea>
			</div>
			${ this._getBox('sortSpells') }<br>
			${ this._getBox('hideRefPsts') }<br>
			${ this._getBox('nextPageThr') }<br>
			${ this._getSel('delHiddPost') }
		</div>`;
	},

	// "Posts" tab
	_getCfgPosts() {
		return `<div id="de-cfg-posts" class="de-cfg-unvis">
			${ localData ? '' : `${ this._getBox('ajaxUpdThr') }
				${ this._getInp('updThrDelay') }
				<div class="de-depend">
					${ this._getBox('updCount') }<br>
					${ this._getBox('favIcoBlink') }<br>
					${ 'Notification' in deWindow ? this._getBox('desktNotif') + '<br>' : '' }
					${ this._getBox('markNewPosts') }<br>
					${ aib.dobrochan ? this._getBox('useDobrAPI') : '' }
				</div>` }
			${ this._getBox('markMyPosts') }<br>
			${ !localData ? `${ this._getBox('expandTrunc') }<br>` : '' }
			${ this._getBox('widePosts') }<br>
			${ this._getInp('limitPostMsg', true, 5) }<br>
			${ this._getSel('showHideBtn') }<br>
			${ !localData ? this._getSel('showRepBtn') : '' }<br>
			${ this._getSel('postBtnsCSS') }
			${ this._getInp('postBtnsBack', false, 8) }<br>
			${ !localData ? this._getSel('thrBtns') : '' }<br>
			${ this._getSel('noSpoilers') }<br>
			${ this._getBox('noPostNames') }<br>
			${ this._getBox('correctTime') }
			${ this._getInp('timeOffset', true, 1) }
			<a class="de-abtn" target="_blank" href="${ gitWiki }Settings-time-` +
				`${ lang ? 'en' : 'ru' }">[?]</a>
			<div class="de-depend">
				${ this._getInp('timePattern', true, 24) }<br>
				${ this._getInp('timeRPattern', true, 24) }
			</div>
		</div>`;
	},

	// "Images" tab
	_getCfgImages() {
		return `<div id="de-cfg-images" class="de-cfg-unvis">
			${ this._getSel('expandImgs') }<br>
			<div class="de-depend">
				${ this._getBox('imgNavBtns') }<br>
				${ this._getBox('imgInfoLink') }<br>
				${ this._getSel('resizeImgs') }<br>
				${ Post.sizing.dPxRatio > 1 ? this._getBox('resizeDPI') + '<br>' : '' }
				${ this._getInp('minImgSize') }<br>
				${ this._getInp('zoomFactor') }<br>
				${ this._getBox('webmControl') }<br>
				${ this._getBox('webmTitles') }<br>
				${ this._getInp('webmVolume') }<br>
				${ this._getInp('minWebmWidth') }
			</div>
			${ nav.isPresto ? '' : this._getSel('preLoadImgs') + '<br>' }
			${ nav.isPresto || aib._4chan ? '' : `<div class="de-depend">
				${ this._getBox('findImgFile') }
			</div>` }
			${ this._getSel('openImgs') }<br>
			${ this._getBox('imgSrcBtns') }<br>
			${ this._getSel('imgNames') }<br>
			${ this._getInp('maskVisib') }
		</div>`;
	},

	// "Links" tab
	_getCfgLinks() {
		return `<div id="de-cfg-links" class="de-cfg-unvis">
			${ this._getBox('linksNavig') }
			<div class="de-depend">
				${ this._getInp('linksOver') }
				${ this._getInp('linksOut') }<br>
				${ this._getBox('markViewed') }<br>
				${ this._getBox('strikeHidd') }
				<div class="de-depend">${ this._getBox('removeHidd') }</div>
				${ this._getBox('noNavigHidd') }
			</div>
			${ this._getBox('markMyLinks') }<br>
			${ this._getBox('crossLinks') }<br>
			${ this._getBox('decodeLinks') }<br>
			${ this._getBox('insertNum') }<br>
			${ !localData ? `${ this._getBox('addOPLink') }<br>
				${ this._getBox('addImgs') }<br>` : '' }
			<div>
				${ this._getBox('addMP3') }
				${ aib.prot === 'http:' ? this._getBox('addVocaroo') : '' }
			</div>
			${ this._getSel('embedYTube') }
			<div class="de-depend">
				${ this._getInp('YTubeWidth', false) }\u00D7
				${ this._getInp('YTubeHeigh', false) }(px)<br>
				${ this._getBox('YTubeTitles') }<br>
				${ this._getInp('ytApiKey', true, 25) }<br>
				${ this._getBox('addVimeo') }
			</div>
		</div>`;
	},

	// "Form" tab
	_getCfgForm() {
		return `<div id="de-cfg-form" class="de-cfg-unvis">
			${ this._getBox('ajaxPosting') }<br>
			${ pr.form ? `<div class="de-depend">
				${ this._getBox('postSameImg') }<br>
				${ this._getBox('removeEXIF') }<br>
				${ this._getSel('removeFName') }<br>
				${ this._getBox('sendErrNotif') }<br>
				${ this._getBox('scrAfterRep') }<br>
				${ pr.files && !nav.isPresto ? this._getSel('fileInputs') : '' }
			</div>` : '' }
			${ pr.form ? this._getSel('addPostForm') + '<br>' : '' }
			${ pr.txta ? this._getBox('spacedQuote') + '<br>' : '' }
			${ this._getBox('favOnReply') }<br>
			${ pr.subj ? this._getBox('warnSubjTrip') + '<br>' : '' }
			${ pr.mail ? `${ this._getBox('addSageBtn') }
				${ this._getBox('saveSage') }<br>` : '' }
			${ pr.cap ? `${ aib.hasAltCaptcha ? `${ this._getBox('altCaptcha') }<br>` : '' }
				${ this._getInp('capUpdTime') }<br>
				${ this._getSel('captchaLang') }<br>` : '' }
			${ pr.txta ? `${ this._getSel('addTextBtns') }
				${ !aib._4chan ? this._getBox('txtBtnsLoc') : '' }<br>` : '' }
			${ pr.passw ? `${ this._getInp('passwValue', false, 9) }
				${ this._getBox('userPassw') }<input type="button"` +
				` id="de-cfg-button-pass" class="de-cfg-button" value="${ Lng.change[lang] }"><br>` : '' }
			${ pr.name ? `${ this._getInp('nameValue', false, 9) }
				${ this._getBox('userName') }<br>` : '' }
			${ pr.rules || pr.passw || pr.name ? Lng.hide[lang] +
				(pr.rules ? this._getBox('noBoardRule') : '') +
				(pr.passw ? this._getBox('noPassword') : '') +
				(pr.name ? this._getBox('noName') : '') +
				(pr.subj ? this._getBox('noSubj') : '') : '' }
		</div>`;
	},

	// "Common" tab
	_getCfgCommon() {
		return `<div id="de-cfg-common" class="de-cfg-unvis">
			${ this._getSel('scriptStyle') }<br>
			${ this._getBox('userCSS') }
			<a href="${ gitWiki }css-tricks" class="de-abtn" target="_blank">[?]</a><br>
			${ 'animation' in docBody.style ? this._getBox('animation') + '<br>' : '' }
			${ this._getBox('hotKeys') }
			<input type="button" id="de-cfg-button-keys" class="de-cfg-button" value="${ Lng.edit[lang] }">
			<div class="de-depend">${ this._getInp('loadPages') }</div>
			${ this._getSel('panelCounter') }<br>
			${ this._getBox('rePageTitle') }<br>
			${ !localData ? `${ this._getBox('inftyScroll') }<br>
				${ this._getBox('hideReplies') }<br>
				${ this._getBox('scrollToTop') }<br>` : '' }
			${ this._getBox('saveScroll') }<br>
			${ this._getSel('favThrOrder') }<br>
			${ this._getBox('favWinOn') }<br>
			${ this._getBox('closePopups') }
		</div>`;
	},

	// "Info" tab
	_getCfgInfo() {
		const statsTable = this._getInfoTable([
			[Lng.thrViewed[lang], Cfg.stats.view],
			[Lng.thrCreated[lang], Cfg.stats.op],
			[Lng.thrHidden[lang], HiddenThreads.getCount()],
			[Lng.postsSent[lang], Cfg.stats.reply]
		], false);
		return `<div id="de-cfg-info" class="de-cfg-unvis">
			<div style="padding-bottom: 10px;">
				<a href="${ gitWiki }versions" target="_blank">v${ version }.${ commit }` +
					`${ nav.isESNext ? '.es6' : '' }</a> |
				<a href="https://dollchan.net/" target="_blank">Homepage</a> |
				<a href="${ gitWiki }${ lang === 1 ? 'home-en/' : '' }" target="_blank">Github</a> |
				<input type="button" id="de-cfg-button-debug" value="` +
					`${ Lng.debug[lang] }" title="${ Lng.infoDebug[lang] }">
			</div>
			<div id="de-info-table">
				<div id="de-info-stats">${ statsTable }</div>
				<div id="de-info-log">${ this._getInfoTable(Logger.getLogData(false), true) }</div>
			</div>
			${ !nav.hasWebStorage && !nav.isPresto && !localData || nav.hasGMXHR ? `
				${ this._getSel('updDollchan') }
				<div style="margin-top: 3px; text-align: center;">&gt;&gt;
					<input type="button" id="de-cfg-button-updnow" value="${ Lng.checkNow[lang] }">
					<input type="button" id="de-cfg-button-donate" value="Donate">
				&lt;&lt;</div>` : `<div style="margin-top: 3px; text-align: center;">&gt;&gt;
					<input type="button" id="de-cfg-button-donate" value="Donate">
				&lt;&lt;</div>` }
		</div>`;
	},

	// Creates a label with checkbox for option switching
	_getBox: id => `<label class="de-cfg-label">
		<input class="de-cfg-chkbox" info="${ id }" type="checkbox"> ${ Lng.cfg[id][lang] }</label>`,
	// Creates a table for Info tab
	_getInfoTable: (data, needMs) => data.map(val => `<div class="de-info-row">
		<span class="de-info-name">${ val[0] }</span>
		<span>${ val[1] + (needMs ? 'ms' : '') }</span></div>`).join(''),
	// Creates a text input for text option values
	_getInp(id, addText = true, size = 2) {
		const el = doc.createElement('div');
		el.append(Cfg[id]); // Escape HTML
		return `<label class="de-cfg-label">
		<input class="de-cfg-inptxt" info="${ id }" type="text" size="${ size }" value="${
		el.innerHTML }">${ addText && Lng.cfg[id] ? Lng.cfg[id][lang] : '' }</label>`;
	},
	// Creates a menu with a list of checkboxes. Uses for popup window.
	_getList : arr => arrTags(arr, '<label class="de-block"><input type="checkbox"> ', '</label>'),
	// Creates a select for multiple option values
	_getSel  : id => `<label class="de-cfg-label"><select class="de-cfg-select" info="${ id }">${
		Lng.cfg[id].sel[lang].map((val, i) => `<option value="${ i }">${ val }</option>`).join('')
	}</select> ${ Lng.cfg[id].txt[lang] } </label>`,
	// Creates a tab for tab bar
	_getTab: id => `<div class="${ aib.cReply } de-cfg-tab" info="${ id }">${ Lng.cfgTab[id][lang] }</div>`,
	// Switching the dependent inputs according to their parents
	_toggleDependant(state, arr) {
		let i = arr.length;
		const nState = !state;
		while(i--) {
			const el = $q(arr[i]);
			if(el) {
				el.disabled = nState;
			}
		}
	},
	_updateCSS() {
		$delAll('#de-css, #de-css-dynamic, #de-css-user', doc.head);
		scriptCSS();
	},
	_updateDependant() {
		const fn = this._toggleDependant;
		fn(Cfg.ajaxUpdThr, [
			'input[info="updThrDelay"]', 'input[info="updCount"]', 'input[info="favIcoBlink"]',
			'input[info="markNewPosts"]', 'input[info="desktNotif"]'
		]);
		fn(Cfg.postBtnsCSS === 2, ['input[info="postBtnsBack"]']);
		fn(Cfg.expandImgs, [
			'input[info="imgNavBtns"]', 'input[info="imgInfoLink"]', 'input[info="resizeDPI"]',
			'select[info="resizeImgs"]', 'input[info="minImgSize"]', 'input[info="zoomFactor"]',
			'input[info="webmControl"]', 'input[info="webmTitles"]', 'input[info="webmVolume"]',
			'input[info="minWebmWidth"]'
		]);
		fn(Cfg.preLoadImgs, ['input[info="findImgFile"]']);
		fn(Cfg.linksNavig, [
			'input[info="linksOver"]', 'input[info="linksOut"]', 'input[info="markViewed"]',
			'input[info="strikeHidd"]', 'input[info="noNavigHidd"]'
		]);
		fn(Cfg.strikeHidd && Cfg.linksNavig, ['input[info="removeHidd"]']);
		fn(Cfg.embedYTube, [
			'input[info="YTubeWidth"]', 'input[info="YTubeHeigh"]', 'input[info="YTubeTitles"]',
			'input[info="ytApiKey"]', 'input[info="addVimeo"]'
		]);
		fn(Cfg.YTubeTitles, ['input[info="ytApiKey"]']);
		fn(Cfg.ajaxPosting, [
			'input[info="postSameImg"]', 'input[info="removeEXIF"]', 'select[info="removeFName"]',
			'input[info="sendErrNotif"]', 'input[info="scrAfterRep"]', 'select[info="fileInputs"]'
		]);
		fn(Cfg.addSageBtn, ['input[info="saveSage"]']);
		fn(Cfg.addTextBtns, ['input[info="txtBtnsLoc"]']);
		fn(Cfg.hotKeys, ['input[info="loadPages"]']);
	},
	// Updates row counter in spells editor
	_updateRowMeter(node) {
		const top = node.scrollTop;
		const el = node.previousElementSibling;
		let num = el.numLines || 1;
		let i = 19;
		if(num - i < ((top / 12) | 0 + 1)) {
			let str = '';
			while(i--) {
				str += `${ num++ }<br>`;
			}
			el.insertAdjacentHTML('beforeend', str);
			el.numLines = num;
		}
		el.scrollTop = top;
	}
};

/* ==[ MenuPopups.js ]========================================================================================
                                                POPUPS & MENU
=========================================================================================================== */

function closePopup(data) {
	const el = typeof data === 'string' ? $id('de-popup-' + data) : data;
	if(el) {
		el.closeTimeout = null;
		if(Cfg.animation) {
			$animate(el, 'de-close', true);
		} else {
			el.remove();
		}
	}
}

function $popup(id, txt, isWait = false) {
	let el = $id('de-popup-' + id);
	const buttonHTML = isWait ? '<svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg>' : '\u2716 ';
	if(el) {
		$q('div', el).innerHTML = txt.trim();
		$q('span', el).innerHTML = buttonHTML;
		if(!isWait && Cfg.animation) {
			$animate(el, 'de-blink');
		}
	} else {
		el = $bEnd($id('de-wrapper-popup'), `<div class="${ aib.cReply } de-popup" id="de-popup-${ id }">
			<span class="de-popup-btn">${ buttonHTML }</span>
			<div class="de-popup-msg">${ txt.trim() }</div>
		</div>`);
		el.onclick = e => {
			let el = nav.fixEventEl(e.target);
			el = el.tagName.toLowerCase() === 'svg' ? el.parentNode : el;
			if(el.className === 'de-popup-btn') {
				closePopup(el.parentNode);
			}
		};
		if(Cfg.animation) {
			$animate(el, 'de-open');
		}
	}
	if(Cfg.closePopups && !isWait && !id.includes('edit') && !id.includes('cfg')) {
		el.closeTimeout = setTimeout(closePopup, 6e3, el);
	}
	return el.lastElementChild;
}

// Adds button that calls a popup with the text editor. Useful to edit settings.
function getEditButton(name, getDataFn, className = 'de-button') {
	return $button(Lng.edit[lang], Lng.editInTxt[lang], () => getDataFn((val, isJSON, saveFn) => {
		// Create popup window with textarea.
		const el = $popup('edit-' + name,
			`<b>${ Lng.editor[name][lang] }</b><textarea class="de-editor"></textarea>`);
		const inputEl = el.lastChild;
		inputEl.value = isJSON ? JSON.stringify(val, null, '\t') : val;
		// "Save" button. If there a JSON data, parses and saves on success.
		el.append($button(Lng.save[lang], Lng.saveChanges[lang], !isJSON ? () => saveFn(inputEl) : () => {
			let data;
			try {
				data = JSON.parse(inputEl.value.trim().replace(/[\n\r\t]/g, '') || '{}');
			} catch(err) {}
			if(!data) {
				$popup('err-invaliddata', Lng.invalidData[lang]);
				return;
			}
			saveFn(data);
			closePopup('edit-' + name);
			closePopup('err-invaliddata');
		}));
	}), className);
}

class Menu {
	constructor(parentEl, html, clickFn, isFixed = true) {
		this.onout = null;
		this.onover = null;
		this.onremove = null;
		this._closeTO = 0;
		const el = $bEnd(docBody, `<div class="${ aib.cReply } de-menu" style="position: ${
			isFixed ? 'fixed' : 'absolute' }; left: 0px; top: 0px; visibility: hidden;">${ html }</div>`);
		const cr = parentEl.getBoundingClientRect();
		const { style, offsetWidth: w, offsetHeight: h } = el;
		style.left = (isFixed ? 0 : deWindow.pageXOffset) +
			(cr.left + w < Post.sizing.wWidth ? cr.left : cr.right - w) + 'px';
		style.top = (isFixed ? 0 : deWindow.pageYOffset) +
			(cr.bottom + h < Post.sizing.wHeight ? cr.bottom - 0.5 : cr.top - h + 0.5) + 'px';
		style.removeProperty('visibility');
		this._clickFn = clickFn;
		this._el = el;
		this.parentEl = parentEl;
		['mouseover', 'mouseout'].forEach(e => el.addEventListener(e, this, true));
		el.addEventListener('click', this);
		parentEl.addEventListener('mouseout', this);
	}
	static getMenuImg(data, isDlOnly = false) {
		let p;
		let dlLinks = '';
		if(typeof data === 'string') {
			p = encodeURIComponent(data) + '" target="_blank">' + Lng.frameSearch[lang];
		} else {
			const link = data.nextSibling;
			const { href } = link;
			const origSrc = link.getAttribute('de-href') || href;
			p = encodeURIComponent(origSrc) + '" target="_blank">' + Lng.searchIn[lang];
			const getDlLnk = (href, name, title, isAddExt) => {
				let ext;
				if(isAddExt) {
					ext = getFileExt(href);
					name += '.' + ext;
				} else {
					ext = getFileExt(name);
				}
				let nameShort = name;
				if(name.length > 20) {
					nameShort = name.substr(0, 20 - ext.length) + '\u2026' + ext;
				}
				const info = aib.dm !== href.match(/^(?:https?:\/\/)([^/]+)/)[1] ? ' info="img-load"' : '';
				return `<a class="de-menu-item" href="${ href }" download="${ name }" title="${
					title }"${ info } target="_blank">${ Lng.saveAs[lang] } &quot;${ nameShort }&quot;</a>`;
			};
			const name = decodeURIComponent(getFileName(origSrc));
			const isFullImg = link.classList.contains('de-fullimg-link');
			const realName = isFullImg ? link.textContent :
				link.classList.contains('de-img-name') ? aib.getImgRealName(aib.getImgWrap(data)) : name;
			if(name !== realName) {
				dlLinks += getDlLnk(href, realName, Lng.origName[lang], false);
			}
			let webmTitle;
			if(isFullImg && (webmTitle = link.nextElementSibling) && (webmTitle = webmTitle.textContent)) {
				dlLinks += getDlLnk(href, webmTitle, Lng.metaName[lang], true);
			}
			dlLinks += getDlLnk(href, name, Lng.boardName[lang], false);
		}
		if(aib.kohlchan) {
			p = p.replace('kohlchanagb7ih5g.onion', 'kohlchan.net')
				.replace('kohlchanvwpfx6hthoti5fvqsjxgcwm3tmddvpduph5fqntv5affzfqd.onion', 'kohlchan.net');
		}
		return dlLinks + (isDlOnly ? '' : arrTags([
			`de-src-google" href="https://www.google.com/searchbyimage?image_url=${ p }Google`,
			`de-src-yandex" href="https://yandex.com/images/search?rpt=imageview&url=${ p }Yandex`,
			`de-src-tineye" href="https://tineye.com/search/?url=${ p }TinEye`,
			`de-src-saucenao" href="https://saucenao.com/search.php?url=${ p }SauceNAO`,
			`de-src-iqdb" href="https://iqdb.org/?url=${ p }IQDB`,
			`de-src-tracemoe" href="https://trace.moe/?auto&url=${ p }TraceMoe`
		], '<a class="de-menu-item ', '</a>'));
	}
	handleEvent(e) {
		let isOverEvent = false;
		switch(e.type) {
		case 'click':
			if(e.target.classList.contains('de-menu-item')) {
				this.removeMenu();
				this._clickFn(e.target, e);
				if(!Cfg.expandPanel && !$q('.de-win-active')) {
					$hide($id('de-panel-buttons'));
				}
			}
			break;
		case 'mouseover': isOverEvent = true;
			/* falls through */
		case 'mouseout': {
			clearTimeout(this._closeTO);
			let rt = nav.fixEventEl(e.relatedTarget);
			rt = rt?.farthestViewportElement || rt;
			if(!rt || (rt !== this._el && !this._el.contains(rt))) {
				if(isOverEvent) {
					if(this.onover) {
						this.onover();
					}
				} else if(!rt || (rt !== this.parentEl && !this.parentEl.contains(rt))) {
					this._closeTO = setTimeout(() => this.removeMenu(), 75);
					if(this.onout) {
						this.onout();
					}
				}
			}
		}
		}
	}
	removeMenu() {
		if(!this._el) {
			return;
		}
		if(this.onremove) {
			this.onremove();
		}
		['mouseover', 'mouseout'].forEach(e => this._el.removeEventListener(e, this, true));
		this.parentEl.removeEventListener('mouseout', this);
		this._el.removeEventListener('click', this);
		this._el.remove();
		this._el = null;
	}
}

function addMenu(el) {
	const fn = a => arrTags(a, '<span class="de-menu-item">', '</span>');
	switch(el.id) {
	case 'de-btn-spell-add':
		return new Menu(el, `<div style="display: inline-block; border-right: 1px solid grey;">${
			fn('#words,#exp,#exph,#imgn,#ihash,#subj,#name,#trip,#img,#sage'.split(','))
		}</div><div style="display: inline-block;">${
			fn('#op,#tlen,#all,#video,#vauthor,#num,#wipe,#rep,#outrep,<br>'.split(',')) }</div>`,
		({ textContent: s }) => insertText($id('de-spell-txt'), s +
			(!aib.t || s === '#op' || s === '#rep' || s === '#outrep' ? '' : `[${ aib.b },${ aib.t }]`) +
			(Spells.needArg[Spells.names.indexOf(s.substr(1))] ? '(' : '')));
	case 'de-panel-refresh':
		return new Menu(el, fn(Lng.selAjaxPages[lang]),
			el => Pages.loadPages(aProto.indexOf.call(el.parentNode.children, el) + 1));
	case 'de-panel-savethr':
		return new Menu(el, fn($q(aib.qPostImg, DelForm.first.el) ?
			Lng.selSaveThr[lang] : [Lng.selSaveThr[lang][0]]),
		el => {
			if($id('de-popup-savethr')) {
				return;
			}
			const imgOnly = !!aProto.indexOf.call(el.parentNode.children, el);
			if(ContentLoader.isLoading) {
				$popup('savethr', Lng.loading[lang], true);
				ContentLoader.afterFn = () => ContentLoader.downloadThread(imgOnly);
				ContentLoader.popupId = 'savethr';
			} else {
				ContentLoader.downloadThread(imgOnly);
			}
		});
	case 'de-panel-audio-off':
		return new Menu(el, fn(Lng.selAudioNotif[lang]), el => {
			updater.enableUpdater();
			updater.toggleAudio([3e4, 6e4, 12e4, 3e5][aProto.indexOf.call(el.parentNode.children, el)]);
			$id('de-panel-audio-off').id = 'de-panel-audio-on';
		});
	}
}

/* ==[ Hotkeys.js ]===========================================================================================
                                                   HOTKEYS
=========================================================================================================== */

const HotKeys = {
	cPost          : null,
	enabled        : false,
	gKeys          : null,
	lastPageOffset : 0,
	ntKeys         : null,
	tKeys          : null,
	version        : 7,
	clearCPost() {
		this.cPost = null;
		this.lastPageOffset = 0;
	},
	disableHotKeys() {
		if(this.enabled) {
			this.enabled = false;
			if(this.cPost) {
				this.cPost.unselect();
			}
			this.clearCPost();
			this.gKeys = this.ntKeys = this.tKeys = null;
			doc.removeEventListener('keydown', this, true);
		}
	},
	enableHotKeys() {
		if(!this.enabled) {
			this.enabled = true;
			this._paused = false;
			Promise.resolve(this.readKeys()).then(keys => {
				if(this.enabled) {
					[,, this.gKeys, this.ntKeys, this.tKeys] = keys;
					doc.addEventListener('keydown', this, true);
				}
			});
		}
	},
	getDefaultKeys: () => [HotKeys.version, nav.isFirefox, [
		// GLOBAL KEYS
		/* One post/thread above      */ 0x004B /* = K          */,
		/* One post/thread below      */ 0x004A /* = J          */,
		/* Reply or create thread     */ 0x0052 /* = R          */,
		/* Hide selected thread/post  */ 0x0048 /* = H          */,
		/* Open previous page/image   */ 0x1025 /* = Ctrl+Left  */,
		/* Send post (txt)            */ 0x900D /* = Ctrl+Enter */,
		/* Open/close "Favorites"     */ 0x4046 /* = Alt+F      */,
		/* Open/close "Hidden"        */ 0x4048 /* = Alt+H      */,
		/* Open/close panel           */ 0x0050 /* = P          */,
		/* Mask/unmask images         */ 0x0042 /* = B          */,
		/* Open/close "Settings"      */ 0x4053 /* = Alt+S      */,
		/* Expand current image       */ 0x0049 /* = I          */,
		/* Bold text                  */ 0xC042 /* = Alt+B      */,
		/* Italic text                */ 0xC049 /* = Alt+I      */,
		/* Strike text                */ 0xC054 /* = Alt+T      */,
		/* Spoiler text               */ 0xC050 /* = Alt+P      */,
		/* Code text                  */ 0xC043 /* = Alt+C      */,
		/* Open next page/image       */ 0x1027 /* = Ctrl+Right */,
		/* Open/close "Video"         */ 0x4056 /* = Alt+V      */
	], [// NON-THREAD KEYS
		/* One post above */ 0x004D /* = M */,
		/* One post below */ 0x004E /* = N */,
		/* Open thread    */ 0x0056 /* = V */,
		/* Expand thread  */ 0x0045 /* = E */
	], [// THREAD KEYS
		/* Update thread  */ 0x0055 /* = U */
	]],
	handleEvent(e) {
		if(this._paused || e.metaKey) {
			return;
		}
		let idx;
		const isThr = aib.t;
		const el = e.target;
		const tag = el.tagName;
		const kc = e.keyCode |
			(e.ctrlKey ? 0x1000 : 0) |
			(e.shiftKey ? 0x2000 : 0) |
			(e.altKey ? 0x4000 : 0) |
			(tag === 'TEXTAREA' ||
				tag === 'INPUT' && (el.type === 'text' || el.type === 'password') ? 0x8000 : 0);
		if(kc === 0x74 || kc === 0x8074) { // F5
			if(isThr || $id('de-popup-load-pages')) {
				return;
			}
			AttachedImage.closeImg();
			Pages.loadPages(+Cfg.loadPages);
		} else if(kc === 0x1B) { // ESC
			if(AttachedImage.viewer) {
				AttachedImage.closeImg();
				return;
			}
			if(this.cPost) {
				this.cPost.unselect();
				this.cPost = null;
			}
			if(isThr) {
				Post.clearMarks();
			}
			this.lastPageOffset = 0;
		} else if(kc === 0x801B) { // ESC (txt)
			el.blur();
		} else {
			let post;
			const globIdx = this.gKeys.indexOf(kc);
			switch(globIdx) {
			case 2: // Quick reply
				if(pr.form) {
					post = this.cPost || this._getFirstVisPost(false, true) || Thread.first.op;
					this.cPost = post;
					pr.showQuickReply(post, post.num, true, false);
					post.select();
				}
				break;
			case 3: // Hide selected thread/post
				post = this._getFirstVisPost(false, true) || this._getNextVisPost(null, true, false);
				if(post) {
					post.setUserVisib(!post.isHidden);
					this._scroll(post, false, post.isOp);
				}
				break;
			case 4: // Open previous page/image
				if(AttachedImage.viewer) {
					AttachedImage.viewer.navigate(false);
				} else if(isThr || aib.page !== aib.firstPage) {
					deWindow.location.pathname = aib.getPageUrl(aib.b, isThr ? 0 : aib.page - 1);
				}
				break;
			case 5: // Send post (txt)
				if(el !== pr.txta && el !== pr.cap.textEl) {
					return;
				}
				pr.subm.click();
				break;
			case 6: // Open/close "Favorites"
				toggleWindow('fav', false);
				break;
			case 7: // Open/close "Hidden"
				toggleWindow('hid', false);
				break;
			case 8: // Open/close panel
				$toggle($id('de-panel-buttons'));
				break;
			case 9: // Mask/unmask images
				toggleCfg('maskImgs');
				updateCSS();
				break;
			case 10: // Open/close "Settings"
				toggleWindow('cfg', false);
				break;
			case 11: // Expand current image
				post = this._getFirstVisPost(false, true) || this._getNextVisPost(null, true, false);
				if(post) {
					post.toggleImages();
				}
				break;
			case 12: // Bold text (txt)
				if(el !== pr.txta) {
					return;
				}
				$id('de-btn-bold').click();
				break;
			case 13: // Italic text (txt)
				if(el !== pr.txta) {
					return;
				}
				$id('de-btn-italic').click();
				break;
			case 14: // Strike text (txt)
				if(el !== pr.txta) {
					return;
				}
				$id('de-btn-strike').click();
				break;
			case 15: // Spoiler text (txt)
				if(el !== pr.txta) {
					return;
				}
				$id('de-btn-spoil').click();
				break;
			case 16: // Code text (txt)
				if(el !== pr.txta) {
					return;
				}
				$id('de-btn-code').click();
				break;
			case 17: // Open next page/image
				if(AttachedImage.viewer) {
					AttachedImage.viewer.navigate(true);
				} else if(!isThr) {
					const pageNum = DelForm.last.pageNum + 1;
					if(pageNum <= aib.lastPage) {
						deWindow.location.pathname = aib.getPageUrl(aib.b, pageNum);
					}
				}
				break;
			case 18: // Open/close "Videos"
				toggleWindow('vid', false);
				break;
			case -1:
				if(isThr) {
					idx = this.tKeys.indexOf(kc);
					if(idx === 0) { // Update thread
						updater.forceLoad(null);
						break;
					}
					return;
				}
				idx = this.ntKeys.indexOf(kc);
				if(idx === -1) {
					return;
				} else if(idx === 2) { // Open thread
					post = this._getFirstVisPost(false, true) || this._getNextVisPost(null, true, false);
					if(post) {
						if(typeof GM_openInTab === 'function') {
							GM_openInTab(aib.getThrUrl(aib.b, post.tNum), false, true);
						} else {
							deWindow.open(aib.getThrUrl(aib.b, post.tNum), '_blank');
						}
					}
					break;
				} else if(idx === 3) { // Expand/collapse thread
					post = this._getFirstVisPost(false, true) || this._getNextVisPost(null, true, false);
					if(post) {
						if(post.thr.loadCount !== 0 && post.thr.op.next.count === 1) {
							const nextThr = post.thr.nextNotHidden;
							post.thr.loadPosts(visPosts, !!nextThr);
							post = (nextThr || post.thr).op;
						} else {
							post.thr.loadPosts('all');
							post = post.thr.op;
						}
						scrollTo(deWindow.pageXOffset, deWindow.pageYOffset + post.top);
						if(this.cPost && this.cPost !== post) {
							this.cPost.unselect();
							this.cPost = post;
						}
					}
					break;
				}
				/* falls through */
			default: {
				const scrollToThr = !isThr && (globIdx === 0 || globIdx === 1);
				this._scroll(this._getFirstVisPost(scrollToThr, false),
					globIdx === 0 || idx === 0, scrollToThr);
			}
			}
		}
		e.preventDefault();
		e.stopPropagation();
	},
	pauseHotKeys() {
		this._paused = true;
	},
	async readKeys() {
		const str = await getStored('DESU_keys');
		if(!str) {
			return this.getDefaultKeys();
		}
		let keys;
		try {
			keys = JSON.parse(str);
		} catch(err) {}
		if(!keys) {
			return this.getDefaultKeys();
		}
		if(keys[0] !== this.version) {
			const tKeys = this.getDefaultKeys();
			switch(keys[0]) {
			case 1:
				keys[2][11] = tKeys[2][11];
				keys[4] = tKeys[4];
				/* falls through */
			case 2:
				keys[2][12] = tKeys[2][12];
				keys[2][13] = tKeys[2][13];
				keys[2][14] = tKeys[2][14];
				keys[2][15] = tKeys[2][15];
				keys[2][16] = tKeys[2][16];
				/* falls through */
			case 3:
				keys[2][17] = keys[3][3];
				keys[3][3] = keys[3].splice(4, 1)[0];
				/* falls through */
			case 4:
			case 5:
			case 6:
				keys[2][18] = tKeys[2][18];
			}
			keys[0] = this.version;
			setStored('DESU_keys', JSON.stringify(keys));
		}
		if(keys[1] ^ nav.isFirefox) {
			const mapFunc = nav.isFirefox ?
				key => key === 189 ? 173 : key === 187 ? 61 : key === 186 ? 59 : key :
				key => key === 173 ? 189 : key === 61 ? 187 : key === 59 ? 186 : key;
			keys[1] = nav.isFirefox;
			keys[2] = keys[2].map(mapFunc);
			keys[3] = keys[3].map(mapFunc);
			setStored('DESU_keys', JSON.stringify(keys));
		}
		return keys;
	},
	resume(keys) {
		[,, this.gKeys, this.ntKeys, this.tKeys] = keys;
		this._paused = false;
	},

	_paused: false,
	_getNextVisPost(cPost, isOp, toUp) {
		if(isOp) {
			const thr = cPost ? toUp ? cPost.thr.prevNotHidden : cPost.thr.nextNotHidden :
				Thread.first.isHidden ? Thread.first.nextNotHidden : Thread.first;
			return thr ? thr.op : null;
		}
		return cPost ? cPost.getAdjacentVisPost(toUp) : Thread.first.isHidden ||
			Thread.first.op.isHidden ? Thread.first.op.getAdjacentVisPost(toUp) : Thread.first.op;
	},
	_getFirstVisPost(getThread, getFull) {
		if(this.lastPageOffset !== deWindow.pageYOffset) {
			let post = getThread ? Thread.first : Thread.first.op;
			while(post.top < 1) {
				const tPost = post.next;
				if(!tPost) {
					break;
				}
				post = tPost;
			}
			if(this.cPost) {
				this.cPost.unselect();
			}
			this.cPost = getThread ? getFull ? post.op : post.op.prev : getFull ? post : post.prev;
			this.lastPageOffset = deWindow.pageYOffset;
		}
		return this.cPost;
	},
	_scroll(post, toUp, toThread) {
		const next = this._getNextVisPost(post, toThread, toUp);
		if(!next) {
			if(!aib.t) {
				const pageNum = toUp ? DelForm.first.pageNum - 1 : DelForm.last.pageNum + 1;
				if(toUp ? pageNum >= aib.firstPage : pageNum <= aib.lastPage) {
					deWindow.location.pathname = aib.getPageUrl(aib.b, pageNum);
				}
			}
			return;
		}
		if(post) {
			post.unselect();
		}
		if(toThread) {
			next.el.scrollIntoView();
		} else {
			scrollTo(0, deWindow.pageYOffset + next.el.getBoundingClientRect().top -
				Post.sizing.wHeight / 2 + next.el.clientHeight / 2);
		}
		this.lastPageOffset = deWindow.pageYOffset;
		next.select();
		this.cPost = next;
	}
};

class KeyEditListener {
	constructor(popupEl, keys, allKeys) {
		this.cEl = null;
		this.cKey = -1;
		this.errorInput = false;
		const aInputs = [...$Q('.de-input-key', popupEl)];
		for(let i = 0, len = allKeys.length; i < len; ++i) {
			const k = allKeys[i];
			if(k !== 0) {
				for(let j = i + 1; j < len; ++j) {
					if(k === allKeys[j]) {
						aInputs[i].classList.add('de-input-error');
						aInputs[j].classList.add('de-input-error');
						break;
					}
				}
			}
		}
		this.popupEl = popupEl;
		this.keys = keys;
		this.initKeys = JSON.parse(JSON.stringify(keys));
		this.allKeys = allKeys;
		this.allInputs = aInputs;
		this.errCount = $Q('.de-input-error', popupEl).length;
		if(this.errCount !== 0) {
			this.saveButton.disabled = true;
		}
	}
	static getEditMarkup(keys) {
		const allKeys = [];
		return [allKeys, `${ Lng.hotKeyEdit[lang].join('')
			.replace(/%l/g, '<label class="de-block">')
			.replace(/%\/l/g, '</label>')
			.replace(/%i([2-4])([0-9]+)(t)?/g, (all, id1, id2, isText) => {
				const key = keys[+id1][+id2];
				allKeys.push(key);
				return `<input class="de-input-key" type="text" de-id1="${ id1 }" de-id2="${ id2 }` +
					`" size="16" value="${ KeyEditListener.getStrKey(key) }${
						isText ? '" de-text' : '"' } readonly>`;
			}) }<input type="button" id="de-keys-save" class="de-button" value="${ Lng.save[lang] }">` +
			`<input type="button" id="de-keys-reset" class="de-button" value="${ Lng.reset[lang] }">`];
	}
	static getStrKey(key) {
		return (key & 0x1000 ? 'Ctrl+' : '') +
			(key & 0x2000 ? 'Shift+' : '') +
			(key & 0x4000 ? 'Alt+' : '') +
			KeyEditListener.keyCodes[key & 0xFFF];
	}
	static setTitle(el, idx) {
		let title = el.getAttribute('de-title');
		if(!title) {
			title = el.getAttribute('title');
			el.setAttribute('de-title', title);
		}
		if(HotKeys.enabled && idx !== -1) {
			title += ` [${ KeyEditListener.getStrKey(HotKeys.gKeys[idx]) }]`;
		}
		el.title = title;
	}
	get saveButton() {
		const value = $id('de-keys-save');
		Object.defineProperty(this, 'saveButton', { value, configurable: true });
		return value;
	}
	handleEvent(e) {
		let key;
		let el = e.target;
		switch(e.type) {
		case 'blur':
			if(HotKeys.enabled && this.errCount === 0) {
				HotKeys.resume(this.keys);
			}
			el.classList.remove('de-input-selected');
			this.cEl = null;
			return;
		case 'focus':
			if(HotKeys.enabled) {
				HotKeys.pauseHotKeys();
			}
			el.classList.add('de-input-selected');
			this.cEl = el;
			return;
		case 'click': {
			let keys;
			if(el.id === 'de-keys-reset') {
				this.keys = HotKeys.getDefaultKeys();
				this.initKeys = HotKeys.getDefaultKeys();
				if(HotKeys.enabled) {
					HotKeys.resume(this.keys);
				}
				[this.allKeys, this.popupEl.innerHTML] = KeyEditListener.getEditMarkup(this.keys);
				this.allInputs = [...$Q('.de-input-key', this.popupEl)];
				this.errCount = 0;
				delete this.saveButton;
				break;
			} else if(el.id === 'de-keys-save') {
				({ keys } = this);
				setStored('DESU_keys', JSON.stringify(keys));
			} else if(el.className === 'de-popup-btn') {
				keys = this.initKeys;
			} else {
				return;
			}
			if(HotKeys.enabled) {
				HotKeys.resume(keys);
			}
			closePopup('edit-hotkeys');
			break;
		}
		case 'keydown': {
			if(!this.cEl) {
				return;
			}
			key = e.keyCode;
			if(key === 0x1B || key === 0x2E) { // ESC, DEL
				this.cEl.value = '';
				this.cKey = 0;
				this.errorInput = false;
				break;
			}
			const keyStr = KeyEditListener.keyCodes[key];
			if(typeof keyStr === 'undefined') {
				this.cKey = -1;
				return;
			}
			let str = '';
			if(e.ctrlKey) {
				str += 'Ctrl+';
			}
			if(e.shiftKey) {
				str += 'Shift+';
			}
			if(e.altKey) {
				str += 'Alt+';
			}
			if(key === 16 || key === 17 || key === 18) {
				this.errorInput = true;
				this.cKey = 0;
			} else {
				this.cKey = key | (e.ctrlKey ? 0x1000 : 0) | (e.shiftKey ? 0x2000 : 0) |
					(e.altKey ? 0x4000 : 0) | (this.cEl.hasAttribute('de-text') ? 0x8000 : 0);
				this.errorInput = false;
				str += keyStr;
			}
			this.cEl.value = str;
			break;
		}
		case 'keyup': {
			el = this.cEl;
			key = this.cKey;
			if(!el || key === -1) {
				return;
			}
			let rEl;
			const isError = el.classList.contains('de-input-error');
			if(!this.errorInput && key !== -1) {
				let idx = this.allInputs.indexOf(el);
				const oKey = this.allKeys[idx];
				if(oKey === key) {
					this.errorInput = false;
					break;
				}
				const rIdx = key === 0 ? -1 : this.allKeys.indexOf(key);
				this.allKeys[idx] = key;
				if(isError) {
					idx = this.allKeys.indexOf(oKey);
					if(idx !== -1 && this.allKeys.indexOf(oKey, idx + 1) === -1) {
						rEl = this.allInputs[idx];
						if(rEl.classList.contains('de-input-error')) {
							this.errCount--;
							rEl.classList.remove('de-input-error');
						}
					}
					if(rIdx === -1) {
						this.errCount--;
						el.classList.remove('de-input-error');
					}
				}
				if(rIdx === -1) {
					this.keys[+el.getAttribute('de-id1')][+el.getAttribute('de-id2')] = key;
					if(this.errCount === 0) {
						this.saveButton.disabled = false;
					}
					this.errorInput = false;
					break;
				}
				rEl = this.allInputs[rIdx];
				if(!rEl.classList.contains('de-input-error')) {
					this.errCount++;
					rEl.classList.add('de-input-error');
				}
			}
			if(!isError) {
				this.errCount++;
				el.classList.add('de-input-error');
			}
			if(this.errCount !== 0) {
				this.saveButton.disabled = true;
			}
		}
		}
		e.preventDefault();
	}
}
// Browsers have different codes for these keys (see HotKeys.readKeys):
//    Firefox - '-' - 173, '=' - 61, ';' - 59
//    Chrome/Opera: '-' - 189, '=' - 187, ';' - 186
/* eslint-disable comma-spacing, comma-style, no-sparse-arrays */
KeyEditListener.keyCodes = [
	'',,,,,,,,'Backspace','Tab',,,,'Enter',,,'Shift','Ctrl','Alt',/* Pause/Break */,/* Caps Lock */,,,,,,,
	/* Esc */,,,,,'Space',/* PgUp */,/* PgDn */,/* End */,/* Home */,'←','↑','→','↓',,,,,/* Insert */,
	/* Del */,,'0','1','2','3','4','5','6','7','8','9',,';',,'=',,,,'A','B','C','D','E','F','G','H','I','J',
	'K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',/* Left WIN */,/* Right WIN */,
	/* Select */,,,'Num 0','Num 1','Num 2','Num 3','Num 4','Num 5','Num 6','Num 7','Num 8','Num 9','Num *',
	'Num +',,'Num -','Num .','Num /',/* F1 */,/* F2 */,/* F3 */,/* F4 */,/* F5 */,/* F6 */,/* F7 */,/* F8 */,
	/* F9 */,/* F10 */,/* F11 */,/* F12 */,,,,,,,,,,,,,,,,,,,,,/* Num Lock */,/* Scroll Lock */,,,,,,,,,,,,,,,
	,,,,,,,,,,,,,'-',,,,,,,,,,,,,';','=',',','-','.','/','`',,,,,,,,,,,,,,,,,,,,,,,,,,,'[','\\',']','\''
];
/* eslint-enable comma-spacing, comma-style, no-sparse-arrays */

/* ==[ ContentLoad.js ]=======================================================================================
                                             CONTENT DOWNLOADING
                     images/video preloading, rarjpeg detecting, thread/images downloading
=========================================================================================================== */

const ContentLoader = {
	afterFn   : null,
	isLoading : false,
	popupId   : null,
	downloadThread(imgOnly) {
		let progress, counter;
		let current = 1;
		let warnings = '';
		let tar = new TarBuilder();
		const dc = imgOnly ? doc : doc.documentElement.cloneNode(true);
		let els = [...$Q(aib.qPostImg, $q('[de-form]', dc))];
		let count = els.length;
		const delSymbols = (str, r = '') => str.replace(/[\\/:*?"<>|]/g, r);
		this._thrPool = new TasksPool(4, (num, data) => this.loadImgData(data[0]).then(imgData => {
			const [url, fName, el, parentLink] = data;
			let safeName = delSymbols(fName, '_');
			progress.value = counter.innerHTML = current++;
			if(parentLink) {
				let thumbName = safeName.replace(/\.[a-z]+$/, '.png');
				if(imgOnly) {
					thumbName = 'thumb-' + thumbName;
				} else {
					thumbName = 'thumbs/' + thumbName;
					safeName = imgData ? 'images/' + safeName : thumbName;
					parentLink.href = getImgNameLink(el).href = safeName;
				}
				if(imgData) {
					tar.addFile(safeName, imgData);
				} else {
					warnings += `<br>${ Lng.cantLoad[lang] } <a href="${ url }">${ url }</a>` +
						`<br>${ Lng.willSavePview[lang] }`;
					$popup('err-files', Lng.loadErrors[lang] + warnings);
					if(imgOnly) {
						return this.getDataFromImg(el).then(data => tar.addFile(thumbName, data), emptyFn);
					}
				}
				return imgOnly ? null : this.getDataFromImg(el).then(data => {
					el.src = thumbName;
					tar.addFile(thumbName, data);
				}, () => (el.src = safeName));
			} else if(imgData?.length) {
				tar.addFile(el.href = el.src = 'data/' + safeName, imgData);
			} else {
				$del(el);
			}
		}), () => {
			const docName = `${ aib.dm }-${ delSymbols(aib.b) }-${ aib.t }`;
			if(!imgOnly) {
				$q('head', dc).insertAdjacentHTML('beforeend',
					'<script type="text/javascript" src="data/dollscript.js" charset="utf-8"></script>');
				const dcBody = $q('body', dc);
				dcBody.classList.remove('de-runned');
				dcBody.classList.add('de-mode-local');
				$delAll('#de-css, #de-css-dynamic, #de-css-user', dc);
				tar.addString('data/dollscript.js', `${ nav.isESNext ?
					`(${ String(deMainFuncInner) })(window, null, null, (x, y) => window.scrollTo(x, y), ` :
					`(${ String(/* global deMainFuncOuter */ deMainFuncOuter) })(`
				}${ JSON.stringify({ dm: aib.dm, b: aib.b, t: aib.t }) });`);
				const dt = doc.doctype;
				tar.addString(docName + '.html', '<!DOCTYPE ' + dt.name +
					(dt.publicId ? ` PUBLIC "${ dt.publicId }"` : dt.systemId ? ' SYSTEM' : '') +
					(dt.systemId ? ` "${ dt.systemId }"` : '') + '>' + dc.outerHTML);
			}
			const title = delSymbols(Thread.first.op.title.trim());
			downloadBlob(tar.get(), `${ docName }${ imgOnly ? '-images' : '' }${
				title ? ' - ' + title : '' }.tar`);
			closePopup('load-files');
			this._thrPool = tar = warnings = count = current = imgOnly = progress = counter = null;
		});
		els.forEach(el => {
			const parentLink = el.closest('a');
			if(parentLink) {
				const url = parentLink.href;
				this._thrPool.runTask(
					[url, parentLink.getAttribute('download') || getFileName(url), el, parentLink]);
			}
		});
		if(!imgOnly) {
			$delAll('.de-btn-img, #de-main, .de-parea, .de-post-btns, .de-refmap, .de-thr-buttons, ' +
				'.de-video-obj, #de-win-reply, link[rel="alternate stylesheet"], script, ' + aib.qForm, dc);
			$Q('a', dc).forEach(el => {
				let num;
				const tc = el.textContent;
				if(tc[0] === '>' && tc[1] === '>' && (num = +tc.substr(2)) && pByNum.has(num)) {
					el.href = aib.anchor + num;
					if(!el.classList.contains('de-link-postref')) {
						el.className = 'de-link-postref ' + el.className;
					}
				} else {
					el.href = aib.getAbsLink(el.href);
				}
			});
			$Q(aib.qPost, dc).forEach((el, i) => el.setAttribute('de-num', i ? aib.getPNum(el) : aib.t));
			const files = [];
			const urlRegex = new RegExp(`^\\/\\/?|^https?:\\/\\/([^\\/]*\\.)?${
				escapeRegExp(aib._4chan ? '4cdn.org' : aib.dm) }\\/`, 'i');
			$Q('link, *[src]', dc).forEach(el => {
				if(els.indexOf(el) !== -1) {
					return;
				}
				let url = el.tagName === 'LINK' ? el.href : el.src;
				if(!urlRegex.test(url)) {
					el.remove();
					return;
				}
				let fName = delSymbols(getFileName(url), '_').toLowerCase();
				if(files.indexOf(fName) !== -1) {
					let temp = url.lastIndexOf('.');
					const ext = url.substring(temp);
					url = url.substring(0, temp);
					fName = cutFileExt(fName);
					for(let i = 0; ; ++i) {
						temp = `${ fName }(${ i })${ ext }`;
						if(files.indexOf(temp) === -1) {
							break;
						}
					}
					fName = temp;
				}
				files.push(fName);
				this._thrPool.runTask([url, fName, el, null]);
				count++;
			});
		}
		$popup('load-files', `${ imgOnly ? Lng.loadImage[lang] : Lng.loadFile[lang] }:<br><progress ` +
			`id="de-loadprogress" value="0" max="${ count }"></progress> <span>1</span>/${ count }`, true);
		progress = $id('de-loadprogress');
		counter = progress.nextElementSibling;
		this._thrPool.completeTasks();
		els = null;
	},
	getDataFromCanvas: el =>
		new Uint8Array(atob(el.toDataURL('image/png').split(',')[1]).split('').map(a => a.charCodeAt())),
	getDataFromImg(el) {
		if(el.getAttribute('loading') === 'lazy') {
			return this.loadImgData(el.src);
		}
		try {
			const cnv = this._canvas || (this._canvas = doc.createElement('canvas'));
			cnv.width = el.width || el.videoWidth;
			cnv.height = el.height || el.videoHeight;
			cnv.getContext('2d').drawImage(el, 0, 0);
			return Promise.resolve(this.getDataFromCanvas(cnv));
		} catch(err) {
			return this.loadImgData(el.src);
		}
	},
	loadImgData: (url, repeatOnError = true) => $ajax(
		url, { responseType: 'arraybuffer' }, !url.startsWith('blob')
	).then(xhr => {
		if('response' in xhr) {
			try {
				return nav.getUnsafeUint8Array(xhr.response);
			} catch(err) {}
		}
		const txt = xhr.responseText;
		return new Uint8Array(txt.length).map((val, i) => txt.charCodeAt(i) & 0xFF);
	}, err => err.code !== 404 && repeatOnError ? ContentLoader.loadImgData(url, false) : null),
	preloadImages(data) {
		if(!Cfg.preLoadImgs && !Cfg.openImgs && !isPreImg) {
			return;
		}
		let preloadPool;
		const isPost = data instanceof AbstractPost;
		const els = $Q(aib.qPostImg, isPost ? data.el : data);
		const len = els.length;
		if(isPreImg || Cfg.preLoadImgs) {
			let cImg = 1;
			const mReqs = isPost ? 1 : 4;
			const rarJpgFinder = (isPreImg || Cfg.findImgFile) && new WorkerPool(mReqs, this._detectImgFile,
				err => console.error('File detector error:', `line: ${ err.lineno } - ${ err.message }`));
			preloadPool = new TasksPool(mReqs, (num, data) => this.loadImgData(data[0]).then(imageData => {
				const [url, parentLink, iType, isRepToOrig, el, isVideo] = data;
				if(imageData) {
					const fName = decodeURIComponent(getFileName(url));
					const nameLink = getImgNameLink(el);
					parentLink.setAttribute('download', fName);
					if(!Cfg.imgNames) {
						nameLink.setAttribute('download', fName);
						nameLink.setAttribute('de-href', nameLink.href);
					}
					parentLink.href = nameLink.href =
						deWindow.URL.createObjectURL(new Blob([imageData], { type: iType }));
					if(isVideo) {
						el.setAttribute('de-video', '');
					}
					if(isRepToOrig) {
						el.src = parentLink.href;
					}
					if(rarJpgFinder) {
						rarJpgFinder.runWorker(imageData.buffer, [imageData.buffer],
							info => this._addImgFileIcon(nameLink, fName, info));
					}
				}
				if(this.popupId) {
					$popup(this.popupId, `${ Lng.loadImage[lang] }: ${ cImg }/${ len }`, true);
				}
				cImg++;
			}), () => {
				this.isLoading = false;
				if(this.afterFn) {
					this.afterFn();
					this.afterFn = this.popupId = null;
				}
				if(rarJpgFinder) {
					rarJpgFinder.clearWorkers();
				}
			});
			this.isLoading = true;
		}
		for(let i = 0; i < len; ++i) {
			const imgEl = els[i];
			const parentLink = imgEl.closest('a');
			if(!parentLink) {
				continue;
			}
			let isRepToOrig = !!Cfg.openImgs;
			const url = aib.getImgSrcLink(imgEl).getAttribute('href');
			const type = getFileMime(url);
			const isVideo = type && (type === 'video/webm' || type === 'video/mp4' || type === 'video/ogv');
			if(!type || isVideo && Cfg.preLoadImgs === 2) {
				continue;
			} else if($q('img[src*="/spoiler"]', parentLink)) {
				isRepToOrig = false;
			} else if(type === 'image/gif') {
				isRepToOrig &= Cfg.openImgs !== 3;
			} else {
				if(isVideo) {
					isRepToOrig = false;
				}
				isRepToOrig &= Cfg.openImgs !== 2;
			}
			if(preloadPool) {
				preloadPool.runTask([url, parentLink, type, isRepToOrig, imgEl, isVideo]);
			} else if(isRepToOrig) {
				imgEl.src = url;
			}
		}
		if(preloadPool) {
			preloadPool.completeTasks();
		}
	},

	_canvas  : null,
	_thrPool : null,
	_addImgFileIcon(nameLink, fName, info) {
		const { type } = info;
		if(typeof type === 'undefined') {
			return;
		}
		const ext = ['7z', 'zip', 'rar', 'ogg', 'mp3'][type];
		nameLink.insertAdjacentHTML('afterend', `<a href="${ deWindow.URL.createObjectURL(
			new Blob([nav.getUnsafeUint8Array(info.data, info.idx)], {
				type: [
					'application/x-7z-compressed',
					'application/zip',
					'application/x-rar-compressed',
					'audio/ogg',
					'audio/mpeg'][type]
			})
		) }" class="de-img-${ type > 2 ? 'audio' : 'arch' }" title="${
			Lng.downloadFile[lang] }" download="${ cutFileExt(fName) }.${ ext }">.${ ext }</a>`);
	},
	// Finds built-in files in jpg and png
	_detectImgFile: arrBuf => {
		let i, j;
		const dat = new Uint8Array(arrBuf);
		let len = dat.length;
		/* JPG [ff d8 ff e0] = [яШяа] */
		if(dat[0] === 0xFF && dat[1] === 0xD8) {
			for(i = 0, j = 0; i < len - 1; ++i) {
				if(dat[i] === 0xFF) {
					/* Built-in JPG */
					if(dat[i + 1] === 0xD8) {
						j++;
					/* JPG end [ff d9] */
					} else if(dat[i + 1] === 0xD9 && --j === 0) {
						i += 2;
						break;
					}
				}
			}
		/* PNG [89 50 4e 47] = [‰PNG] */
		} else if(dat[0] === 0x89 && dat[1] === 0x50) {
			for(i = 0; i < len - 7; ++i) {
				/* PNG end [49 45 4e 44 ae 42 60 82] */
				if(dat[i] === 0x49 && dat[i + 1] === 0x45 && dat[i + 2] === 0x4E && dat[i + 3] === 0x44) {
					i += 8;
					break;
				}
			}
		} else {
			return {};
		}
		if(i === len || len - i <= 60) { // Ignore small files (<60 bytes)
			return {};
		}
		for(len = i + 90; i < len; ++i) {
			/* 7Z [37 7a bc af] = [7zјЇ] */
			if(dat[i] === 0x37 && dat[i + 1] === 0x7A && dat[i + 2] === 0xBC) {
				return { type: 0, idx: i, data: arrBuf };
			/* ZIP [50 4b 03 04] = [PK..] */
			} else if(dat[i] === 0x50 && dat[i + 1] === 0x4B && dat[i + 2] === 0x03) {
				return { type: 1, idx: i, data: arrBuf };
			/* RAR [52 61 72 21] = [Rar!] */
			} else if(dat[i] === 0x52 && dat[i + 1] === 0x61 && dat[i + 2] === 0x72) {
				return { type: 2, idx: i, data: arrBuf };
			/* OGG [4f 67 67 53] = [OggS] */
			} else if(dat[i] === 0x4F && dat[i + 1] === 0x67 && dat[i + 2] === 0x67) {
				return { type: 3, idx: i, data: arrBuf };
			/* MP3 [0x49 0x44 0x33] = [ID3] */
			} else if(dat[i] === 0x49 && dat[i + 1] === 0x44 && dat[i + 2] === 0x33) {
				return { type: 4, idx: i, data: arrBuf };
			}
		}
		return {};
	}
};

/* ==[ TimeCorrection.js ]====================================================================================
                                               TIME CORRECTION
=========================================================================================================== */

class DateTime {
	constructor(pattern, rPattern, diff, dtLang, onRPat) {
		this.pad2 = pad2;
		this.genDateTime = null;
		this.onRPat = null;
		if(DateTime.checkPattern(pattern)) {
			this.disabled = true;
			return;
		}
		this.regex = pattern
			.replace(/(?:[sihdny]\?){2,}/g, str => `(?:${ str.replace(/\?/g, '') })?`)
			.replace(/-/g, '[^<]')
			.replace(/\+/g, '[^0-9<]')
			.replace(/([sihdny]+)/g, '($1)')
			.replace(/[sihdny]/g, '\\d')
			.replace(/m|w/g, '([a-zA-Zа-яА-Я]+)');
		this.pattern = pattern.replace(/[?\-+]+/g, '').replace(/([a-z])\1+/g, '$1');
		this.diff = parseInt(diff, 10);
		this.arrW = Lng.week[dtLang];
		this.arrM = Lng.month[dtLang];
		this.arrFM = Lng.fullMonth[dtLang];
		if(rPattern) {
			this.genDateTime = this.genRFunc(rPattern);
		} else {
			this.onRPat = onRPat;
		}
	}
	static checkPattern(val) {
		return !val.includes('i') || !val.includes('h') || !val.includes('d') ||
			!val.includes('y') || !(val.includes('n') || val.includes('m')) ||
			/[^?\-+sihdmwny]|mm|ww|\?\?|([ihdny]\?)\1+/.test(val);
	}
	static toggleSettings(el) {
		if(el.checked && (!/^[+-]\d{1,2}$/.test(Cfg.timeOffset) || DateTime.checkPattern(Cfg.timePattern))) {
			$popup('err-correcttime', Lng.cTimeError[lang]);
			saveCfg('correctTime', 0);
			el.checked = false;
		}
	}
	genRFunc(rPattern) {
		return dtime => rPattern.replace('_o', (this.diff < 0 ? '' : '+') + this.diff)
			.replace('_s', () => this.pad2(dtime.getSeconds()))
			.replace('_i', () => this.pad2(dtime.getMinutes()))
			.replace('_h', () => this.pad2(dtime.getHours()))
			.replace('_d', () => this.pad2(dtime.getDate()))
			.replace('_w', () => this.arrW[dtime.getDay()])
			.replace('_n', () => this.pad2(dtime.getMonth() + 1))
			.replace('_m', () => this.arrM[dtime.getMonth()])
			.replace('_M', () => this.arrFM[dtime.getMonth()])
			.replace('_y', () => ('' + dtime.getFullYear()).substring(2))
			.replace('_Y', () => dtime.getFullYear());
	}
	getRPattern(txt) {
		const m = txt.match(new RegExp(this.regex));
		if(!m) {
			this.disabled = true;
			return false;
		}
		let rPattern = '';
		for(let i = 1, len = m.length, j = 0, str = m[0]; i < len;) {
			const a = m[i++];
			if(!a) {
				continue;
			}
			let p = this.pattern[i - 2];
			if((p === 'm' || p === 'y') && a.length > 3) {
				p = p.toUpperCase();
			}
			const k = str.indexOf(a, j);
			rPattern += str.substring(j, k) + '_' + p;
			j = k + a.length;
		}
		if(this.onRPat) {
			this.onRPat(rPattern);
		}
		this.genDateTime = this.genRFunc(rPattern);
		return true;
	}
	fix(txt) {
		if(this.disabled || (!this.genDateTime && !this.getRPattern(txt))) {
			return txt;
		}
		return txt.replace(new RegExp(this.regex, 'g'), (str, ...args) => {
			let second, minute, hour, day, month, year;
			for(let i = 0; i < 7; ++i) {
				const a = args[i];
				switch(this.pattern[i]) {
				case 's': second = a; break;
				case 'i': minute = a; break;
				case 'h': hour = a; break;
				case 'd': day = a; break;
				case 'n': month = a - 1; break;
				case 'y': year = a; break;
				case 'm': month = Lng.monthDict[a.slice(0, 3).toLowerCase()] || 0; break;
				}
			}
			const dtime = new Date(year.length === 2 ? '20' + year :
				year, month, day, hour, minute, second || 0);
			dtime.setHours(dtime.getHours() + this.diff);
			return this.genDateTime(dtime);
		});
	}
}

/* ==[ Players.js ]===========================================================================================
                                          PLAYERS / LINKS EMBEDDERS
                                youtube, vimeo, mp3, vocaroo embedding players
=========================================================================================================== */

class Videos {
	constructor(post, player = null, playerInfo = null) {
		this.currentLink = null;
		this.hasLinks = false;
		this.linksCount = 0;
		this.loadedLinksCount = 0;
		this.playerInfo = null;
		this.post = post;
		this.titleLoadFn = null;
		this.vData = [[], []];
		if(player && playerInfo) {
			Object.defineProperty(this, 'player', { value: player });
			this.playerInfo = playerInfo;
		}
	}
	static addPlayer(obj, m, isYtube, enableJsapi = false) {
		const el = obj.player;
		obj.playerInfo = m;
		let txt;
		if(isYtube) {
			const list = m[0].match(/list=[^&#]+/);
			txt = `<iframe class="de-video-player" src="https://www.youtube.com/embed/${ m[1] }?start=` +
				((m[2] ? m[2] * 3600 : 0) + (m[3] ? m[3] * 60 : 0) + (m[4] ? +m[4] : 0)) +
				(enableJsapi ? '&enablejsapi=1' : Cfg.embedYTube === 1 ? '&autoplay=1' : '') +
				(list ? '&' + list[0] : '') + '" frameborder="0" allowfullscreen></iframe>';
		} else {
			const id = m[1] + (m[2] ? m[2] : '');
			txt = `<iframe class="de-video-player" src="${ aib.prot }//player.vimeo.com/video/${ id }${
				Cfg.embedYTube === 1 ? '?autoplay=1' : ''
			}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`;
		}
		el.innerHTML = txt + (enableJsapi ? '' :
			`<span class="de-video-resizer" title="${ Lng.expandVideo[lang] }"></span>`);
		$show(el);
		if(!enableJsapi) {
			el.lastChild.onclick = e => e.target.parentNode.classList.toggle('de-video-expanded');
		}
	}
	static setLinkData(link, data, isCloned = false) {
		const [title, author, views, publ, duration] = data;
		if(Panel.isVidEnabled && !isCloned) {
			const clonedLink = $q(`.de-entry > .de-video-link[href="${ link.href }"]:not(title)`);
			if(clonedLink) {
				Videos.setLinkData(clonedLink, data, true);
			}
		}
		link.textContent = title;
		link.classList.add('de-video-title');
		link.setAttribute('de-author', author);
		link.title = (duration ? Lng.duration[lang] + duration : '') +
			(publ ? `, ${ Lng.published[lang] + publ }\n` : '') +
			Lng.author[lang] + author + (views ? ', ' + Lng.views[lang] + views : '');
	}
	get player() {
		const { post } = this;
		const value = aib.insertYtPlayer(post.msg, `<div class="de-video-obj${
			post.images.hasAttachments && !post.isOp ? ' de-video-obj-inline' : '' }"></div>`);
		Object.defineProperty(this, 'player', { value });
		return value;
	}
	addLink(m, loader, link, isYtube) {
		this.hasLinks = true;
		this.linksCount++;
		if(this.playerInfo === null) {
			if(Cfg.embedYTube === 1) {
				this._addThumb(m, isYtube);
			}
		} else if(!link && $q(`.de-video-link[href*="${ m[1] }"]`, this.post.msg)) {
			return;
		}
		let dataObj;
		if(loader && (dataObj = Videos._global.vData[+!isYtube][m[1]])) {
			this.vData[+!isYtube].push(dataObj);
		}
		let time = '';
		[time, m[2], m[3], m[4]] = Videos._fixTime(m[4], m[3], m[2]);
		if(link) {
			link.href = link.href.replace(/^http:/, 'https:');
			if(time) {
				link.setAttribute('de-time', time);
			}
			link.className = `de-video-link ${ isYtube ? 'de-ytube' : 'de-vimeo' }`;
		} else {
			const src = isYtube ?
				`${ aib.prot }//www.youtube.com/watch?v=${ m[1] }${ time ? '#t=' + time : '' }` :
				`${ aib.prot }//vimeo.com/${ m[1] }`;
			link = $bEnd(this.post.msg, `<p class="de-video-ext"><a class="de-video-link ${
				isYtube ? 'de-ytube' : 'de-vimeo' }${ time ? '" de-time="' + time : ''
			}" href="${ src }">${ dataObj ? '' : src }</a></p>`).firstChild;
		}
		if(dataObj) {
			Videos.setLinkData(link, dataObj);
		}
		if(this.playerInfo === null || this.playerInfo === m) {
			this.currentLink = link;
		}
		link.videoInfo = m;
		let vidListEl;
		if(Panel.isVidEnabled && (vidListEl = $id('de-video-list'))) {
			updateVideoList(vidListEl, link, this.post.num);
		}
		if(loader && !dataObj) {
			loader.runTask([link, isYtube, this, m[1]]);
		}
	}
	clickLink(el, mode) {
		const m = el.videoInfo;
		if(this.playerInfo !== m) {
			this.currentLink.classList.remove('de-current');
			this.currentLink = el;
			if(mode === 1) {
				this._addThumb(m, el.classList.contains('de-ytube'));
			} else {
				el.classList.add('de-current');
				this.setPlayer(m, el.classList.contains('de-ytube'));
			}
			return;
		}
		if(mode === 1) {
			if($q('.de-video-thumb', this.player)) {
				el.classList.add('de-current');
				this.setPlayer(m, el.classList.contains('de-ytube'));
			} else {
				el.classList.remove('de-current');
				this._addThumb(m, el.classList.contains('de-ytube'));
			}
		} else {
			el.classList.remove('de-current');
			$hide(this.player);
			this.player.innerHTML = '';
			this.playerInfo = null;
		}
	}
	setPlayer(m, isYtube) {
		Videos.addPlayer(this, m, isYtube);
	}
	toggleFloatedThumb(linkEl, isOutEvent) {
		let el = $id('de-video-thumb-floated');
		if(isOutEvent) {
			$del(el);
			return;
		}
		if(!el) {
			el = $bEnd(docBody, `<img id="de-video-thumb-floated" src="https://i.ytimg.com/vi/${
				linkEl.videoInfo[1] }/0.jpg">`);
		}
		const cr = linkEl.getBoundingClientRect();
		const pvHeight = Cfg.YTubeHeigh;
		const isTop = cr.top + cr.height + pvHeight < nav.viewportHeight();
		el.style.cssText = `position: absolute; left: ${ deWindow.pageXOffset + cr.left }px; top: ${
			deWindow.pageYOffset + (isTop ? cr.top + cr.height : cr.top - pvHeight) }px; width: ${
			Cfg.YTubeWidth }px; height: ${ pvHeight }px; z-index: 9999;`;
	}
	updatePost(oldLinks, newLinks, cloned) {
		const loader = !cloned && Videos._getTitlesLoader();
		let j = 0;
		for(let i = 0, len = newLinks.length; i < len; ++i) {
			const el = newLinks[i];
			const link = oldLinks[j];
			if(link?.classList.contains('de-current')) {
				this.currentLink = el;
			}
			if(cloned) {
				el.videoInfo = link.videoInfo;
				j++;
			} else {
				const m = el.href.match(Videos.ytReg);
				if(m) {
					this.addLink(m, loader, el, true);
					j++;
				}
			}
		}
		this.currentLink = this.currentLink || newLinks[0];
		if(loader) {
			loader.completeTasks();
		}
	}

	static _fixTime(seconds = 0, minutes = 0, hours = 0) {
		if(seconds >= 60) {
			minutes += Math.floor(seconds / 60);
			seconds %= 60;
		}
		if(minutes >= 60) {
			hours += Math.floor(seconds / 60);
			minutes %= 60;
		}
		return [
			(hours ? hours + 'h' : '') +
			(minutes ? minutes + 'm' : '') +
			(seconds ? seconds + 's' : ''),
			hours, minutes, seconds
		];
	}
	static _getTitlesLoader() {
		return Cfg.YTubeTitles && new TasksPool(4, (num, info) => {
			const [, isYtube,, id] = info;
			if(isYtube) {
				return Cfg.ytApiKey ? Videos._getYTInfoAPI(info, num, id) :
					Videos._getYTInfoOembed(info, num, id);
			}
			return $ajax(`${ aib.prot }//vimeo.com/api/v2/video/${ id }.json`, null, true).then(xhr => {
				const entry = JSON.parse(xhr.responseText)[0];
				return Videos._titlesLoaderHelper(
					info, num,
					entry.title,
					entry.user_name,
					entry.stats_number_of_plays,
					/(.*)\s(.*)?/.exec(entry.upload_date)[1],
					Videos._fixTime(entry.duration)[0]);
			}).catch(() => Videos._titlesLoaderHelper(info, num));
		}, () => (sesStorage['de-videos-data2'] = JSON.stringify(Videos._global.vData)));
	}
	static _getYTInfoAPI(info, num, id) {
		return $ajax(
			`https://www.googleapis.com/youtube/v3/videos?key=${ Cfg.ytApiKey }&id=${ id }` +
			'&part=snippet,statistics,contentDetails&fields=items/snippet/title,items/snippet/publishedAt,' +
			'items/snippet/channelTitle,items/statistics/viewCount,items/contentDetails/duration',
			null, true
		).then(xhr => {
			const items = JSON.parse(xhr.responseText).items[0];
			return Videos._titlesLoaderHelper(
				info, num,
				items.snippet.title,
				items.snippet.channelTitle,
				items.statistics.viewCount,
				items.snippet.publishedAt.substr(0, 10),
				items.contentDetails.duration.substr(2).toLowerCase());
		}).catch(() => Videos._getYTInfoOembed(info, num, id));
	}
	static _getYTInfoOembed(info, num, id) {
		const canSendCORS = nav.hasGMXHR || nav.canUseFetch;
		return (canSendCORS ?
			$ajax(`https://www.youtube.com/oembed?url=http%3A//youtube.com/watch%3Fv%3D${
				id }&format=json`, null, true) :
			$ajax(`https://noembed.com/embed?url=http%3A//youtube.com/watch%3Fv%3D${ id }&callback=?`)
		).then(xhr => {
			const res = xhr.responseText;
			const json = JSON.parse(canSendCORS ? res : res.replace(/^[^{]+|\)$/g, ''));
			return Videos._titlesLoaderHelper(info, num, json.title, json.author_name, null, null, null);
		}).catch(() => Videos._titlesLoaderHelper(info, num));
	}
	static _titlesLoaderHelper([link, isYtube, videoObj, id], num, ...data) {
		if(data.length) {
			Videos.setLinkData(link, data);
			Videos._global.vData[+!isYtube][id] = data;
			videoObj.vData[+!isYtube].push(data);
			if(videoObj.titleLoadFn) {
				videoObj.titleLoadFn(data);
			}
		}
		videoObj.loadedLinksCount++;
		// Wait for 3 sec every 30 links
		if(num % 30 === 0) {
			return Promise.reject(new TasksPool.PauseError(3e3));
		}
		return new Promise(resolve => setTimeout(resolve, 250));
	}
	_addThumb(m, isYtube) {
		const el = this.player;
		this.playerInfo = m;
		el.classList.remove('de-video-expanded');
		$show(el);
		const str = `<a class="de-video-player" href="${ aib.prot }`;
		if(isYtube) {
			el.innerHTML = `${ str }//www.youtube.com/watch?v=${ m[1] }" target="_blank">` +
				`<img class="de-video-thumb de-ytube" src="https://i.ytimg.com/vi/${ m[1] }/0.jpg"></a>`;
			return;
		}
		el.innerHTML = `${ str }//vimeo.com/${ m[1] }" target="_blank">` +
			'<img class="de-video-thumb de-vimeo" src=""></a>';
		$ajax(`${ aib.prot }//vimeo.com/api/v2/video/${ m[1] }.json`, null, true).then(xhr => {
			el.firstChild.firstChild.setAttribute('src', JSON.parse(xhr.responseText)[0].thumbnail_large);
		}).catch(emptyFn);
	}
}
Videos.ytReg =
	/^https?:\/\/(?:www\.|m\.)?youtu(?:be\.com\/(?:watch\?.*?v=|v\/|embed\/)|\.be\/)([a-zA-Z0-9-_]+).*?(?:t(?:ime)?=(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?)?$/;
Videos.vimReg =
	/^https?:\/\/(?:www\.)?vimeo\.com\/(?:[^?]+\?clip_id=|.*?\/)?(\d+).*?(#t=\d+)?$/;
Videos._global = {
	get vData() {
		let value;
		try {
			value = Cfg.YTubeTitles ? JSON.parse(sesStorage['de-videos-data2'] || '[{}, {}]') : [{}, {}];
		} catch(err) {
			value = [{}, {}];
		}
		Object.defineProperty(this, 'vData', { value });
		return value;
	}
};

class VideosParser {
	constructor() {
		this._loader = Videos._getTitlesLoader();
	}
	endParser() {
		if(this._loader) {
			this._loader.completeTasks();
		}
	}
	parse(data) {
		const isPost = data instanceof AbstractPost;
		const loader = this._loader;
		VideosParser._parserHelper('a[href*="youtu"]', data, loader, isPost, true, Videos.ytReg);
		if(Cfg.addVimeo) {
			VideosParser._parserHelper('a[href*="vimeo.com"]', data, loader, isPost, false, Videos.vimReg);
		}
		const vids = aib.fixVideo(isPost, data);
		for(let i = 0, len = vids.length; i < len; ++i) {
			const [post, m, isYtube] = vids[i];
			if(post) {
				post.videos.addLink(m, loader, null, isYtube);
			}
		}
		return this;
	}

	static _parserHelper(qPath, data, loader, isPost, isYtube, reg) {
		const links = $Q(qPath, isPost ? data.el : data);
		for(let i = 0, len = links.length; i < len; ++i) {
			const link = links[i];
			const m = link.href.match(reg);
			if(m) {
				const mPost = isPost ? data : aib.getPostOfEl(link);
				if(mPost) {
					mPost.videos.addLink(m, loader, link, isYtube);
				}
			}
		}
	}
}

// Embed .mp3 and Vocaroo links
function embedAudioLinks(data) {
	const isPost = data instanceof AbstractPost;
	if(Cfg.addMP3) {
		const els = $Q('a[href*=".mp3"], a[href*=".opus"]', isPost ? data.el : data);
		for(let i = 0, len = els.length; i < len; ++i) {
			const link = els[i];
			if((link.target !== '_blank' && link.rel !== 'nofollow') ||
				!link.pathname.includes('.mp3') && !link.pathname.includes('.opus')
			) {
				continue;
			}
			const src = link.href;
			const el = (isPost ? data : aib.getPostOfEl(link)).mp3Obj;
			if(nav.canPlayMP3) {
				if(!$q(`audio[src="${ src }"]`, el)) {
					el.insertAdjacentHTML('beforeend',
						`<p><audio src="${ src }" preload="none" controls></audio></p>`);
				}
			// Flash plugin for old browsers that not support HTML5 audio
			} else if(!$q(`object[FlashVars*="${ src }"]`, el)) {
				el.insertAdjacentHTML('beforeend', '<object data="' +
					'http://junglebook2007.narod.ru/audio/player.swf" type="application/x-shockwave-flash" ' +
					'wmode="transparent" width="220" height="16" FlashVars="playerID=1&amp;' +
					'bg=0x808080&amp;leftbg=0xB3B3B3&amp;lefticon=0x000000&amp;rightbg=0x808080&amp;' +
					'rightbghover=0x999999&amp;rightcon=0x000000&amp;righticonhover=0xffffff&amp;' +
					'text=0xffffff&amp;slider=0x222222&amp;track=0xf5f5dc&amp;border=0x666666&amp;' +
					`loader=0x7fc7ff&amp;loop=yes&amp;autostart=no&amp;soundFile=${ src }"><br>`);
			}
		}
	}
	if(Cfg.addVocaroo) {
		const els = $Q('a[href*="vocaroo.com"]', isPost ? data.el : data);
		for(let i = 0, len = els.length; i < len; ++i) {
			const link = els[i];
			const el = link.previousSibling;
			if(!el || el.className !== 'de-vocaroo') { // Donʼt embed already embedded links
				link.insertAdjacentHTML('beforebegin', `<div class="de-vocaroo">
					<embed src="http://vocaroo.com/player.swf?playMediaID=${ getFileName(link.href) }` +
						`" width="148" height="44" wmode="transparent" type="application/x-shockwave-flash">
				</div>`);
			}
		}
	}
}

/* ==[ Ajax.js ]==============================================================================================
                                                AJAX FUNCTIONS
=========================================================================================================== */

// Main AJAX util
function $ajax(url, params = null, isCORS = false) {
	let resolve, reject, cancelFn;
	const needTO = params ? params.useTimeout : false;
	const WAITING_TIME = 5e3;
	if(((isCORS ? !nav.hasGMXHR : !nav.canUseNativeXHR) || aib.hasRefererErr && nav.canUseFetch) &&
		(nav.canUseFetchBlob || !url.startsWith('blob'))
	) {
		if(!params) {
			params = {};
		}
		params.referrer =
			doc.referrer.startsWith(aib.prot + '//' + aib.host) ? doc.referrer : deWindow.location;
		params.referrerPolicy = 'unsafe-url';
		if(params.data) {
			params.body = params.data;
			delete params.data;
		}
		if(isCORS) {
			params.mode = 'cors';
		}
		url = aib.getAbsLink(url);
		// Chrome-extension: avoid CORS in content script. Sending data to background.js
		if(isCORS && nav.isChrome && nav.scriptHandler === 'WebExtension') {
			if(params.body) {
				// Converting image as Uint8Array to text data for sending in POST request from background.js
				let textData = '';
				const arrData = params.body.arr;
				for(let i = 0, len = arrData.length; i < len; ++i) {
					textData += String.fromCharCode(arrData[i]);
				}
				params.body.arr = textData;
			}
			chrome.runtime.sendMessage({ 'de-messsage': 'corsRequest', url, params }, res => {
				const { answer } = res;
				if(res.isError || !aib.isAjaxStatusOK(res.status)) {
					reject(res.statusText ?
						new AjaxError(res.status, res.statusText) : getErrorMessage(answer));
					return;
				}
				const obj = {};
				switch(params.responseType) {
				case 'arraybuffer':
				case 'blob': { // Converting text data from the background.js response to arraybuffer/blob
					const buf = new ArrayBuffer(answer.length);
					const bufView = new Uint8Array(buf);
					for(let i = 0, len = answer.length; i < len; ++i) {
						bufView[i] = answer.charCodeAt(i);
					}
					obj.response = params.responseType === 'blob' ? new Blob([buf]) : buf;
					break;
				}
				default: obj.responseText = answer;
				}
				resolve(obj);
			});
		} else {
			const controller = new AbortController();
			params.signal = controller.signal;
			const loadTO = needTO && setTimeout(() => {
				reject(AjaxError.Timeout);
				try {
					controller.abort();
				} catch(err) {}
			}, WAITING_TIME);
			cancelFn = () => {
				if(needTO) {
					clearTimeout(loadTO);
				}
				controller.abort();
			};
			fetch(url, params).then(async res => {
				if(!aib.isAjaxStatusOK(res.status)) {
					reject(new AjaxError(res.status, res.statusText));
					return;
				}
				switch(params.responseType) {
				case 'arraybuffer': res.response = await res.arrayBuffer(); break;
				case 'blob': res.response = await res.blob(); break;
				default: res.responseText = await res.text();
				}
				resolve(res);
			}).catch(err => reject(getErrorMessage(err)));
		}
	} else if((isCORS || !nav.canUseNativeXHR) && nav.hasGMXHR) {
		let gmxhr;
		const timeoutFn = () => {
			reject(AjaxError.Timeout);
			try {
				gmxhr.abort();
			} catch(err) {}
		};
		let loadTO = needTO && setTimeout(timeoutFn, WAITING_TIME);
		const obj = {
			method : params?.method || 'GET',
			url    : nav.isSafari ? aib.getAbsLink(url) : url,
			onreadystatechange(e) {
				if(needTO) {
					clearTimeout(loadTO);
				}
				if(e.readyState === 4) {
					if(aib.isAjaxStatusOK(e.status)) {
						resolve(e);
					} else {
						reject(new AjaxError(e.status, e.statusText));
					}
				} else if(needTO) {
					loadTO = setTimeout(timeoutFn, WAITING_TIME);
				}
			}
		};
		if(params) {
			if(params.onprogress) {
				obj.upload = { onprogress: params.onprogress };
				delete params.onprogress;
			}
			delete params.method;
			Object.assign(obj, params);
		}
		if(nav.hasNewGM) {
			GM.xmlHttpRequest(obj);
			cancelFn = emptyFn; // GreaseMonkey 4 cannot cancel xhr's
		} else {
			gmxhr = GM_xmlhttpRequest(obj);
			cancelFn = () => {
				if(needTO) {
					clearTimeout(loadTO);
				}
				try {
					gmxhr.abort();
				} catch(err) {}
			};
		}
	} else if(nav.canUseNativeXHR) {
		const xhr = new XMLHttpRequest();
		const timeoutFn = () => {
			reject(AjaxError.Timeout);
			xhr.abort();
		};
		let loadTO = needTO && setTimeout(timeoutFn, WAITING_TIME);
		if(params?.onprogress) {
			xhr.upload.onprogress = params.onprogress;
		}
		if(aib._4chan) {
			xhr.withCredentials = true;
		}
		xhr.onreadystatechange = ({ target }) => {
			if(needTO) {
				clearTimeout(loadTO);
			}
			if(target.readyState === 4) {
				if(aib.isAjaxStatusOK(target.status)) {
					resolve(target);
				} else {
					reject(new AjaxError(target.status, target.statusText));
				}
			} else if(needTO) {
				loadTO = setTimeout(timeoutFn, WAITING_TIME);
			}
		};
		try {
			xhr.open(params?.method || 'GET', aib.getAbsLink(url), true);
			if(params) {
				if(params.responseType) {
					xhr.responseType = params.responseType;
				}
				const { headers } = params;
				if(headers) {
					for(const header in headers) {
						if($hasProp(headers, header)) {
							xhr.setRequestHeader(header, headers[header]);
						}
					}
				}
			}
			xhr.send(params?.data || null);
			cancelFn = () => {
				if(needTO) {
					clearTimeout(loadTO);
				}
				xhr.abort();
			};
		} catch(err) {
			clearTimeout(loadTO);
			nav.canUseNativeXHR = false;
			return $ajax(url, params);
		}
	} else {
		reject(new AjaxError(0, 'Ajax error: Canʼt send any type of request.'));
	}
	return new CancelablePromise((res, rej) => {
		resolve = res;
		reject = rej;
	}, cancelFn);
}

class AjaxError {
	constructor(code, message) {
		this.code = code;
		this.message = message;
	}
	toString() {
		return this.code <= 0 ?
			String(this.message || Lng.noConnect[lang]) :
			`HTTP [${ this.code }] ${ this.message }`;
	}
}
AjaxError.Success = new AjaxError(200, 'OK');
AjaxError.Locked = new AjaxError(-1, { toString: () => Lng.thrClosed[lang] });
AjaxError.Timeout = new AjaxError(0, { toString: () => Lng.noConnect[lang] + ' (timeout)' });

const AjaxCache = {
	clearCache() {
		this._data = new Map();
	},
	fixURL: url => `${ url }${ url.includes('?') ? '&' : '?' }nocache=${ Math.random() }`,
	runCachedAjax(url, useCache) {
		const { hasCacheControl, params } = this._data.get(url) || {};
		const ajaxURL = hasCacheControl === false ? this.fixURL(url) : url;
		return $ajax(ajaxURL, useCache && params || { useTimeout: true }, aib._4chan).then(xhr =>
			this.saveData(url, xhr) ? xhr : $ajax(this.fixURL(url), useCache && params, aib._4chan));
	},
	saveData(url, xhr) {
		let ETag = null;
		let LastModified = null;
		let i = 0;
		let hasCacheControl = false;
		let headers = 'getAllResponseHeaders' in xhr ? xhr.getAllResponseHeaders() : xhr.responseHeaders;
		headers = headers ? /* usual xhr */ headers.split('\r\n') : /* fetch */ xhr.headers;
		for(const idx in headers) {
			if(!$hasProp(headers, idx)) {
				continue;
			}
			let header = headers[idx];
			if(typeof header === 'string') { // usual xhr
				const сIdx = header.indexOf(':');
				if(сIdx === -1) {
					continue;
				}
				const name = header.substring(0, сIdx);
				const value = header.substring(сIdx + 2, header.length);
				header = [name, value];
			}
			const hName = header[0].toLowerCase();
			let matched = true;
			switch(hName) {
			case 'cache-control': hasCacheControl = true; break;
			case 'last-modified': LastModified = header[1]; break;
			case 'etag': ETag = header[1]; break;
			default: matched = false;
			}
			if(matched && ++i === 3) {
				break;
			}
		}
		headers = null;
		if(ETag || LastModified) {
			headers = {};
			if(ETag) {
				headers['If-None-Match'] = ETag;
			}
			if(LastModified) {
				headers['If-Modified-Since'] = LastModified;
			}
		}
		const hasUrl = this._data.has(url);
		this._data.set(url, {
			hasCacheControl,
			params: headers ? { headers, useTimeout: true } : { useTimeout: true }
		});
		return hasUrl || hasCacheControl;
	},

	_data: new Map()
};

function getAjaxResponseEl(text, needForm) {
	return !text.includes('</html>') ? null :
		needForm ? $q(aib.qDelForm, $createDoc(text)) : $createDoc(text);
}

function ajaxLoad(url, needForm = true, useCache = false, checkArch = false) {
	return AjaxCache.runCachedAjax(url, useCache).then(xhr => {
		const fnResult = el => !el ? CancelablePromise.reject(new AjaxError(0, Lng.errCorruptData[lang])) :
			checkArch ? [el, (xhr.responseURL || '').includes('/arch/')] : el;
		const text = xhr.responseText;
		const el = getAjaxResponseEl(text, needForm);
		return aib.stormWallFixAjax ? aib.stormWallFixAjax(url, text, el, needForm, fnResult) : fnResult(el);
	}, err => err.code === 304 ? null : CancelablePromise.reject(err));
}

function ajaxPostsLoad(board, tNum, useCache, useJson = true) {
	if(useJson && aib.JsonBuilder) {
		return AjaxCache.runCachedAjax(aib.getJsonApiUrl(board, tNum), useCache).then(xhr => {
			try {
				return new aib.JsonBuilder(JSON.parse(xhr.responseText), board);
			} catch(err) {
				if(err instanceof AjaxError) {
					return CancelablePromise.reject(err);
				}
				console.warn(`API error: ${ err }. Switching to DOM parsing!`);
				aib.JsonBuilder = null;
				return ajaxPostsLoad(board, tNum, useCache);
			}
		}, err => err.code === 304 ? null : CancelablePromise.reject(err));
	}
	return aib.hasArchive ?
		ajaxLoad(aib.getThrUrl(board, tNum), true, useCache, true)
			.then(data => data?.[0] ? new DOMPostsBuilder(data[0], data[1]) : null) :
		ajaxLoad(aib.getThrUrl(board, tNum), true, useCache)
			.then(form => form ? new DOMPostsBuilder(form) : null);
}

function infoLoadErrors(err, showError = true) {
	const isAjax = err instanceof AjaxError;
	const eCode = isAjax ? err.code : 0;
	if(eCode === 200) {
		closePopup('newposts');
	} else if(isAjax && eCode === 0) {
		$popup('newposts', err.message ? String(err.message) :
			`${ Lng.noConnect[lang] }: \n${ getErrorMessage(err) }`);
	} else {
		$popup('newposts', `${ Lng.thrNotFound[lang] } (№${ aib.t }): \n${ getErrorMessage(err) }`);
		if(showError) {
			doc.title = `{${ eCode }} ${ doc.title }`;
		}
	}
}

/* ==[ Pages.js ]=============================================================================================
                                                 PAGES LOADER
=========================================================================================================== */

const Pages = {
	addPage(needThreads = 0, pageNum = DelForm.last.pageNum + 1) {
		if(this._isAdding || pageNum > aib.lastPage || needThreads && pageNum > 4) {
			return;
		}
		this._isAdding = true;
		DelForm.last.el.insertAdjacentHTML('beforeend',
			`<div class="de-addpage-wait"><hr><center style="font-size: 1.5em"><svg class="de-wait">
				<use xlink:href="#de-symbol-wait"/></svg>${ Lng.loading[lang] }</center></div>`);
		MyPosts.purge();
		this._addingPromise = ajaxLoad(aib.getPageUrl(aib.b, pageNum)).then(async formEl => {
			const newForm = this._addForm(formEl, pageNum);
			if(newForm.firstThr) {
				if(!needThreads) {
					return this._updateForms(DelForm.last);
				}
				$hide(newForm.el);
				await this._updateForms(DelForm.last);
				const firstForm = DelForm.first;
				let thr = newForm.firstThr;
				do {
					if(thr.isHidden) {
						DelForm.tNums.delete(thr.num);
					} else {
						const oldLastThr = firstForm.lastThr;
						oldLastThr.el.after(thr.el);
						newForm.firstThr = thr.next;
						thr.prev = oldLastThr;
						thr.form = firstForm;
						firstForm.lastThr = oldLastThr.next = thr;
						needThreads--;
					}
					thr = thr.next;
				} while(needThreads && thr);
				DelForm.last = firstForm;
				firstForm.next = firstForm.lastThr.next = null;
				newForm.el.remove();
				this._endAdding();
				if(needThreads) {
					this.addPage(needThreads, pageNum + 1);
				}
				return CancelablePromise.reject(new CancelError());
			}
			this._endAdding();
			this.addPage();
			return CancelablePromise.reject(new CancelError());
		}).then(() => this._endAdding()).catch(err => {
			if(!(err instanceof CancelError)) {
				$popup('add-page', getErrorMessage(err));
				this._endAdding();
			}
		});
	},
	async loadPages(count) {
		$popup('load-pages', Lng.loading[lang], true);
		if(this._addingPromise) {
			this._addingPromise.cancelPromise();
			this._endAdding();
		}
		PviewsCache.purge();
		isExpImg = false;
		pByEl = new Map();
		pByNum = new Map();
		Post.hiddenNums = new Set();
		AttachedImage.closeImg();
		if(pr.isQuick) {
			pr.clearForm();
		}
		DelForm.tNums = new Set();
		for(const form of DelForm) {
			$Q('a[href^="blob:"]', form.el).forEach(el => URL.revokeObjectURL(el.href));
			$hide(form.el);
			if(form === DelForm.last) {
				break;
			}
			form.el.remove();
		}
		DelForm.first = DelForm.last;
		for(let i = aib.page, len = Math.min(aib.lastPage + 1, aib.page + count); i < len; ++i) {
			try {
				this._addForm(await ajaxLoad(aib.getPageUrl(aib.b, i)), i);
			} catch(err) {
				$popup('load-pages', getErrorMessage(err));
			}
		}
		const { first } = DelForm;
		if(first !== DelForm.last) {
			DelForm.first = first.next;
			first.el.remove();
			await this._updateForms(DelForm.first);
			closePopup('load-pages');
		}
	},

	_isAdding      : false,
	_addingPromise : null,
	_addForm(formEl, pageNum) {
		formEl = doc.adoptNode(formEl);
		$hide(formEl = aib.fixHTML(formEl));
		DelForm.last.el.after(formEl);
		const form = new DelForm(formEl, +pageNum, DelForm.last);
		DelForm.last = form;
		form.addStuff();
		if(pageNum !== aib.page && form.firstThr) {
			formEl.insertAdjacentHTML('afterbegin', `<div class="de-page-num">
				<center style="font-size: 2em">${ Lng.page[lang] } ${ pageNum }</center><hr></div>`);
		}
		$show(formEl);
		return form;
	},
	_endAdding() {
		$q('.de-addpage-wait').remove();
		this._isAdding = false;
		this._addingPromise = null;
	},
	async _updateForms(newForm) {
		readPostsData(newForm.firstThr.op, await readFavorites());
		if(pr.passw) {
			PostForm.setUserPassw();
		}
		embedPostMsgImages(newForm.el);
		if(HotKeys.enabled) {
			HotKeys.clearCPost();
		}
	}
};

function toggleInfinityScroll() {
	if(!aib.t) {
		doc.defaultView[Cfg.inftyScroll ? 'addEventListener' : 'removeEventListener'](
			'onwheel' in doc.defaultView ? 'wheel' : 'mousewheel', toggleInfinityScroll.onwheel);
	}
}
toggleInfinityScroll.onwheel = e => {
	if((e.type === 'wheel' ? e.deltaY : -('wheelDeltaY' in e ? e.wheelDeltaY : e.wheelDelta)) > 0) {
		deWindow.requestAnimationFrame(() => {
			if(Thread.last.bottom - 150 < Post.sizing.wHeight) {
				Pages.addPage();
			}
		});
	}
};

/* ==[ Spells.js ]============================================================================================
                                                    SPELLS
=========================================================================================================== */

const Spells = Object.create({
	hash: null,
	get hiders() {
		this._initSpells();
		return this.hiders;
	},
	get list() {
		if(Cfg.spells === null) {
			return '#wipe(samelines,samewords,longwords,symbols,numbers,whitespace)';
		}
		let data;
		try {
			data = JSON.parse(Cfg.spells);
		} catch(err) {
			return '';
		}
		const [, s, reps, oreps] = data;
		let str = s ? this._decompileSpells(s, '')[0].join('\n') : '';
		if(reps || oreps) {
			if(str) {
				str += '\n\n';
			}
			if(reps) {
				for(const rep of reps) {
					str += this._decompileRep(rep, false) + '\n';
				}
			}
			if(oreps) {
				for(const orep of oreps) {
					str += this._decompileRep(orep, true) + '\n';
				}
			}
			str = str.substr(0, str.length - 1);
		}
		return str;
	},
	get names() {
		return [
			'words', 'exp', 'exph', 'imgn', 'ihash', 'subj', 'name', 'trip', 'img', 'sage', 'op', 'tlen',
			'all', 'video', 'wipe', 'num', 'vauthor', '//'
		];
	},
	get needArg() {
		return [
			/* words */ true, /* exp */ true, /* exph */ true, /* imgn */ true, /* ihash */ true,
			/* subj */ false, /* name */ true, /* trip */ false, /* img */ false, /* sage */ false,
			/* op */ false, /* tlen */ false, /* all */ false, /* video */ false, /* wipe */ false,
			/* num */ true, /* vauthor */ true, /* // */ false
		];
	},
	get outreps() {
		this._initSpells();
		return this.outreps;
	},
	get reps() {
		this._initSpells();
		return this.reps;
	},
	addSpell(type, arg, isNeg) {
		const fld = $id('de-spell-txt');
		const val = fld?.value;
		const chk = $q('input[info="hideBySpell"]');
		let spells = val && this.parseText(val);
		if(!val || spells) {
			if(!spells) {
				try {
					spells = JSON.parse(Cfg.spells);
				} catch(err) {}
				spells = spells || [Date.now(), [], null, null];
			}
			let idx;
			let isAdded = true;
			const scope = aib.t ? [aib.b, aib.t] : null;
			if(spells[1]) {
				const sScope = String(scope);
				const sArg = String(arg);
				spells[1].some(scope && isNeg ? (spell, i) => {
					let data;
					if(spell[0] === 0xFF &&
						((data = spell[1]) instanceof Array) &&
						data.length === 2 &&
						data[0][0] === 0x20C &&
						data[1][0] === type &&
						data[1][2] == null &&
						String(data[1][1]) === sArg &&
						String(data[0][2]) === sScope
					) {
						idx = i;
						return true;
					}
					return (spell[0] & 0x200) !== 0;
				} : (spell, i) => {
					if(spell[0] === type && String(spell[1]) === sArg && String(spell[2]) === sScope) {
						idx = i;
						return true;
					}
					return (spell[0] & 0x200) !== 0;
				});
			} else {
				spells[1] = [];
			}
			if(typeof idx === 'undefined') {
				if(scope && isNeg) {
					spells[1].unshift([0xFF, [[0x20C, '', scope], [type, arg, undefined]], undefined]);
				} else {
					spells[1].unshift([type, arg, scope]);
				}
			} else if(Cfg.hideBySpell) {
				if(spells[1].length === 1) {
					spells[1] = null;
				} else {
					spells[1].splice(idx, 1);
				}
				isAdded = false;
			}
			if(isAdded) {
				saveCfg('hideBySpell', 1);
				if(chk) {
					chk.checked = true;
				}
			} else if(!spells[1] && !spells[2] && !spells[3]) {
				saveCfg('hideBySpell', 0);
				if(chk) {
					chk.checked = false;
				}
			}
			saveCfg('spells', JSON.stringify(spells));
			this.setSpells(spells, true);
			if(fld) {
				fld.value = this.list;
			}
			Pview.updatePosition(true);
			return;
		}
		if(chk) {
			chk.checked = false;
		}
	},
	decompileSpell(type, neg, val, scope, wipeMsg = null) {
		let spell = (neg ? '!#' : '#') + this.names[type] +
			(scope ? `[${ scope[0] }${ scope[1] ? `,${ scope[1] === -1 ? '' : scope[1] }` : '' }]` : '');
		if(!val) {
			return spell;
		}
		switch(type) {
		case 8: // #img
			return spell + '(' + (val[0] === 2 ? '>' : val[0] === 1 ? '<' : '=') +
				(val[1] ? val[1][0] + (val[1][1] === val[1][0] ? '' : '-' + val[1][1]) : '') +
				(val[2] ? '@' + val[2][0] + (val[2][0] === val[2][1] ? '' : '-' + val[2][1]) + 'x' +
				val[2][2] + (val[2][2] === val[2][3] ? '' : '-' + val[2][3]) : '') + ')';
		case 14: { // #wipe
			if(val === 0x3F && !wipeMsg) {
				return spell;
			}
			const [msgBit, msgData] = wipeMsg || [];
			const names = [];
			const bits = {
				1  : 'samelines',
				2  : 'samewords',
				4  : 'longwords',
				8  : 'symbols',
				16 : 'capslock',
				32 : 'numbers',
				64 : 'whitespace'
			};
			for(const bit in bits) {
				if(+bit !== msgBit && (val & +bit)) {
					names.push(bits[bit]);
				}
			}
			if(msgBit) {
				names.push(bits[msgBit].toUpperCase() + (msgData ? ': ' + msgData : ''));
			}
			return `${ spell }(${ names.join(',') })`;
		}
		case 11: // #tlen
		case 15: { // #num
			let temp_;
			let temp = val[1].length - 1;
			if(temp !== -1) {
				for(temp_ = []; temp >= 0; --temp) {
					temp_.push(val[1][temp][0] + '-' + val[1][temp][1]);
				}
				temp_.reverse();
			}
			spell += '(';
			if(val[0].length) {
				spell += val[0].join(',') + (temp_ ? ',' : '');
			}
			if(temp_) {
				spell += temp_.join(',');
			}
			return spell + ')';
		}
		case 0: // #words
		case 6: // #name
		case 7: // #trip
		case 16: // #vauthor
			return `${ spell }(${ val.replace(/([)\\])/g, '\\$1').replace(/\n/g, '\\n') })`;
		case 17: // // comment
			return '//' + String(val);
		default: return `${ spell }(${ String(val) })`;
		}
	},
	disableSpells() {
		const value = null;
		const configurable = true;
		Object.defineProperties(this, {
			hiders  : { configurable, value },
			outreps : { configurable, value },
			reps    : { configurable, value }
		});
		saveCfg('hideBySpell', 0);
	},
	outReplace(txt) {
		for(const orep of this.outreps) {
			txt = txt.replace(orep[0], orep[1]);
		}
		return txt;
	},
	parseText(text) {
		const codeGen = new SpellsCodegen(text);
		const data = codeGen.generate();
		if(codeGen.hasError) {
			$popup('err-spell', Lng.error[lang] + ': ' + codeGen.errorSpell);
		} else if(data) {
			if(data[0] && Cfg.sortSpells) {
				this._sort(data[0]);
			}
			return [Date.now(), ...data];
		}
		return null;
	},
	replace(txt) {
		for(const rep of this.reps) {
			txt = txt.replace(rep[0], rep[1]);
		}
		return txt;
	},
	setSpells(spells, sync) {
		if(sync) {
			this._sync(spells);
		}
		if(!Cfg.hideBySpell) {
			SpellsRunner.unhideAll();
			this.disableSpells();
			return;
		}
		this._optimize(spells);
		if(this.hiders) {
			const sRunner = new SpellsRunner();
			for(let post = Thread.first.op; post; post = post.next) {
				sRunner.runSpells(post);
			}
			sRunner.endSpells();
		} else {
			SpellsRunner.unhideAll();
		}
	},
	toggle() {
		let spells;
		const fld = $id('de-spell-txt');
		const val = fld.value;
		if(val && (spells = this.parseText(val))) {
			closePopup('err-spell');
			this.setSpells(spells, true);
			saveCfg('spells', JSON.stringify(spells));
			fld.value = this.list;
		} else {
			if(!val) {
				closePopup('err-spell');
				SpellsRunner.unhideAll();
				this.disableSpells();
				saveCfg('spells', JSON.stringify([Date.now(), null, null, null]));
				sendStorageEvent('__de-spells', '{ hide: false, data: null }');
			}
			$q('input[info="hideBySpell"]').checked = false;
		}
	},

	_decompileRep(rep, isOrep) {
		return (isOrep ? '#outrep' : '#rep') +
			(rep[0] ? `[${ rep[0] }${ rep[1] ? `,${ rep[1] === -1 ? '' : rep[1] }` : '' }]` : '') +
			`(${ rep[2] },${ rep[3].replace(/([)\\])/g, '\\$1').replace(/\n/g, '\\n') })`;
	},
	_decompileSpells(scope, indent) {
		const dScope = [];
		let hScope = false;
		for(let i = 0, j = 0, len = scope.length; i < len; ++i, ++j) {
			const spell = scope[i];
			const type = spell[0] & 0xFF;
			if(type === 0xFF) {
				hScope = true;
				const temp = this._decompileSpells(spell[1], indent + '    ');
				if(temp[1]) {
					const str = `${ spell[0] & 0x100 ? '!(\n' : '(\n' }${ indent }    ` +
						`${ temp[0].join(`\n${ indent }    `) }\n${ indent })`;
					if(j === 0) {
						dScope[0] = str;
					} else {
						dScope[--j] += ' ' + str;
					}
				} else {
					dScope[j] = `${ spell[0] & 0x100 ? '!(' : '(' }${ temp[0].join(' ') })`;
				}
			} else if(type === 17) {
				dScope[j] = '//' + spell[1];
			} else {
				dScope[j] = this.decompileSpell(type, spell[0] & 0x100, spell[1], spell[2]);
			}
			let k = i + 1;
			while(k < len && (scope[k][0] & 0xFF) === 17) { // Skip comments at the end
				k++;
			}
			if(k !== len && type !== 17) {
				dScope[j] += spell[0] & 0x200 ? ' &' : ' |';
			}
		}
		return [dScope, dScope.length > 2 || hScope];
	},
	_initSpells() {
		if(!Cfg.hideBySpell) {
			const value = null;
			const configurable = true;
			Object.defineProperties(this, {
				hiders  : { configurable, value },
				outreps : { configurable, value },
				reps    : { configurable, value }
			});
			return;
		}
		let spells, data;
		try {
			spells = JSON.parse(Cfg.spells);
			data = JSON.parse(sesStorage[`de-spells-${ aib.b }${ aib.t || '' }`]);
		} catch(err) {}
		if(data && spells && data[0] === spells[0]) {
			this.hash = data[0];
			this._setData(data[1], data[2], data[3]);
			return;
		}
		if(spells) {
			this._optimize(spells);
		} else {
			this.disableSpells();
		}
	},
	_initHiders(data) {
		if(data) {
			for(const item of data) {
				const val = item[1];
				if(val) {
					switch(item[0] & 0xFF) {
					case 1:
					case 2:
					case 3:
					case 5:
					case 13: item[1] = strToRegExp(val, true); break;
					case 0xFF: this._initHiders(val);
					}
				}
			}
		}
		return data;
	},
	_initReps(data) {
		if(data) {
			for(const item of data) {
				item[0] = strToRegExp(item[0], false);
			}
		}
		return data;
	},
	_optimize(data) {
		const arr = [
			data[1] ? this._optimizeSpells(data[1]) : null,
			data[2] ? this._optimizeReps(data[2]) : null,
			data[3] ? this._optimizeReps(data[3]) : null
		];
		sesStorage[`de-spells-${ aib.b }${ aib.t || '' }`] = JSON.stringify([data[0], ...arr]);
		this.hash = data[0];
		this._setData(...arr);
	},
	_optimizeReps(data) {
		const rv = [];
		for(const [r0, r1, r2, r3] of data) {
			if(!r0 || (r0 === aib.b && (r1 === -1 ? !aib.t : !r1 || +r1 === aib.t))) {
				rv.push([r2, r3]);
			}
		}
		return !rv.length ? null : rv;
	},
	_optimizeSpells(spells) {
		let neg;
		let lastSpell = -1;
		let newSpells = [];
		for(let i = 0, len = spells.length; i < len; ++i) {
			let j;
			const spell = spells[i];
			let flags = spell[0];
			const type = flags & 0xFF;
			neg = (flags & 0x100) !== 0;
			if(type === 0xFF) {
				const parensSpells = this._optimizeSpells(spell[1]);
				if(parensSpells) {
					if(parensSpells.length !== 1) {
						newSpells.push([flags, parensSpells]);
						lastSpell++;
						continue;
					} else if((parensSpells[0][0] & 0xFF) !== 12) {
						newSpells.push([(parensSpells[0][0] | (flags & 0x200)) ^ (flags & 0x100),
							parensSpells[0][1]]);
						lastSpell++;
						continue;
					}
					flags = parensSpells[0][0];
					neg = !(neg ^ ((flags & 0x100) !== 0));
				}
			} else {
				const scope = spell[2];
				if(!scope || (
					scope[0] === aib.b &&
					(scope[1] === -1 ? !aib.t : !scope[1] || +scope[1] === aib.t)
				)) {
					if(type === 12) {
						neg = !neg;
					} else {
						newSpells.push([flags, spell[1]]);
						lastSpell++;
						continue;
					}
				}
			}
			for(j = lastSpell; j >= 0 && (((newSpells[j][0] & 0x200) !== 0) ^ neg); --j) /* empty */;
			if(j !== lastSpell) {
				newSpells = newSpells.slice(0, j + 1);
				lastSpell = j;
			}
			if(neg && j !== -1) {
				newSpells[j][0] &= 0x1FF;
			}
			if(((flags & 0x200) !== 0) ^ neg) {
				break;
			}
		}
		return lastSpell === -1 ? neg ? [[12, '']] : null : newSpells;
	},
	_setData(hiders, reps, outreps) {
		const configurable = true;
		Object.defineProperties(this, {
			hiders  : { configurable, value: this._initHiders(hiders) },
			outreps : { configurable, value: this._initReps(outreps) },
			reps    : { configurable, value: this._initReps(reps) }
		});
	},
	_sort(sp) {
		// Wraps AND-spells with brackets for proper sorting
		for(let i = 0, len = sp.length - 1; i < len; ++i) {
			if(sp[i][0] > 0x200) {
				const temp = [0xFF, []];
				do {
					temp[1].push(sp.splice(i, 1)[0]);
					len--;
				} while(sp[i][0] > 0x200);
				temp[1].push(sp.splice(i, 1)[0]);
				sp.splice(i, 0, temp);
			}
		}
		sp = sp.sort();
		for(let i = 0, len = sp.length - 1; i < len; ++i) {
			// Removes duplicates and weaker spells
			const j = i + 1;
			if(sp[i][0] === sp[j][0] &&
				sp[i][1] <= sp[j][1] &&
				sp[i][1] >= sp[j][1] &&
				(sp[i][2] === null || // Stronger spell with 3 parameters
					sp[i][2] === undefined || // Equal spells with 2 parameters
					(sp[i][2] <= sp[j][2] && sp[i][2] >= sp[j][2]))
			) { // Equal spells with 3 parameters
				sp.splice(j, 1);
				i--;
				len--;
			// Moves brackets to the end of the list
			} else if(sp[i][0] === 0xFF) {
				sp.push(sp.splice(i, 1)[0]);
				i--;
				len--;
			}
		}
	},
	_sync(data) {
		sendStorageEvent('__de-spells', { hide: !!Cfg.hideBySpell, data });
	}
});

class SpellsCodegen {
	constructor(sList) {
		this.TYPE_UNKNOWN = 0;
		this.TYPE_ANDOR = 1;
		this.TYPE_NOT = 2;
		this.TYPE_SPELL = 3;
		this.TYPE_PARENTHESES = 4;
		this.TYPE_REPLACER = 5;
		this.hasError = false;
		this._col = 1;
		this._errMsg = '';
		this._errMsgArg = null;
		this._line = 1;
		this._sList = sList;
	}
	get errorSpell() {
		return !this.hasError ? '' :
			(this._errMsgArg ? this._errMsg.replace('%s', this._errMsgArg) : this._errMsg) +
			Lng.seRow[lang] + this._line + Lng.seCol[lang] + this._col + ')';
	}
	generate() {
		return this._sList ? this._generate(this._sList, false) : null;
	}

	static _getScope(str) {
		const m = str.match(/^\[([a-z0-9/]+)(?:(,)|,(\s*[0-9]+))?\]/);
		return m ? [m[0].length, [m[1], m[3] ? +m[3] : m[2] ? -1 : false]] : null;
	}
	static _getText(str, haveBracket) {
		if(haveBracket && (str[0] !== '(')) {
			return [0, ''];
		}
		let rv = '';
		for(let i = haveBracket ? 1 : 0, len = str.length; i < len; ++i) {
			const ch = str[i];
			if(ch === '\\') {
				if(i === len - 1) {
					return null;
				}
				switch(str[i + 1]) {
				case 'n': rv += '\n'; break;
				case '\\': rv += '\\'; break;
				case ')': rv += ')'; break;
				default: return null;
				}
				++i;
			} else if(ch === ')') {
				return [i + 1, rv];
			} else {
				rv += ch;
			}
		}
		return null;
	}
	_generate(sList, inParens) {
		const spellsArr = [];
		let reps = [];
		let outreps = [];
		let lastType = this.TYPE_UNKNOWN;
		let hasReps = false;
		for(let i = 0, len = sList.length; i < len; i++, this._col++) {
			let res;
			switch(sList[i]) {
			case '\n':
				this._line++;
				this._col = 0;
				/* falls through */
			case '\r':
			case ' ': continue;
			case '#': {
				let name = '';
				i++;
				const colStart = this._col;
				this._col++;
				while((sList[i] >= 'a' && sList[i] <= 'z') || (sList[i] >= 'A' && sList[i] <= 'Z')) {
					name += sList[i].toLowerCase();
					i++;
					this._col++;
				}
				if(name === '') {
					this._setError(Lng.seUnknown[lang], sList[i].replace(/[\r\n]/, ''));
					return null;
				} else if(name === 'rep' || name === 'outrep') {
					if(!hasReps) {
						if(inParens) {
							this._col -= 1 + name.length;
							this._setError(Lng.seRepsInParens[lang], '#' + name);
							return null;
						}
						if(lastType === this.TYPE_ANDOR || lastType === this.TYPE_NOT) {
							i -= 1 + name.length;
							this._col -= 1 + name.length;
							lookBack:
							while(i >= 0) {
								switch(sList[i]) {
								case '\n': {
									i--;
									this._line--;
									let j = 0;
									while(j <= i && sList[i - j] !== '\n') {
										j++;
									}
									this._col = j;
									break;
								}
								case '\r':
								case ' ':
								case '#':
									i--;
									this._col--;
									break;
								default:
									break lookBack;
								}
							}
							this._setError(Lng.seOpInReps[lang], sList[i]);
							return null;
						}
						hasReps = true;
					}
					res = this._doRep(name, sList.substr(i));
					if(!res) {
						return null;
					}
					(name === 'rep' ? reps : outreps).push(res[1]);
					i += res[0] - 1;
					this._col += res[0] - 1;
					lastType = this.TYPE_REPLACER;
				} else {
					if(lastType === this.TYPE_SPELL || lastType === this.TYPE_PARENTHESES) {
						this._col = colStart;
						this._setError(Lng.seMissOp[lang], null);
						return null;
					}
					res = this._doSpell(name, sList.substr(i), lastType === this.TYPE_NOT);
					if(!res) {
						return null;
					}
					i += res[0] - 1;
					this._col += res[0] - 1;
					spellsArr.push(res[1]);
					lastType = this.TYPE_SPELL;
				}
				break;
			}
			case '(':
				if(hasReps) {
					this._setError(Lng.seUnexpChar[lang], '(');
					return null;
				}
				if(lastType === this.TYPE_SPELL || lastType === this.TYPE_PARENTHESES) {
					this._setError(Lng.seMissOp[lang], null);
					return null;
				}
				res = this._generate(sList.substr(i + 1), true);
				if(!res) {
					return null;
				}
				i += res[0] + 1;
				spellsArr.push([lastType === this.TYPE_NOT ? 0x1FF : 0xFF, res[1]]);
				lastType = this.TYPE_PARENTHESES;
				break;
			case '|':
			case '&':
				if(hasReps) {
					this._setError(Lng.seUnexpChar[lang], sList[i]);
					return null;
				}
				if(lastType !== this.TYPE_SPELL && lastType !== this.TYPE_PARENTHESES) {
					this._setError(Lng.seMissSpell[lang], null);
					return null;
				}
				if(sList[i] === '&') {
					spellsArr[spellsArr.length - 1][0] |= 0x200;
				}
				lastType = this.TYPE_ANDOR;
				break;
			case '!':
				if(hasReps) {
					this._setError(Lng.seUnexpChar[lang], '!');
					return null;
				}
				if(lastType !== this.TYPE_ANDOR && lastType !== this.TYPE_UNKNOWN) {
					this._setError(Lng.seMissOp[lang], null);
					return null;
				}
				lastType = this.TYPE_NOT;
				break;
			case '/': {
				i++;
				this._col++;
				if(sList[i] === '/') {
					let text = '';
					while(i + 1 < len && sList[i + 1] !== '\n' && sList[i + 1] !== '\r') {
						i++;
						this._col++;
						text += sList[i];
					}
					spellsArr.push([17, text]);
				} else {
					this._setError(Lng.seUnexpChar[lang], '/');
					return null;
				}
				break;
			}
			case ')':
				if(hasReps) {
					this._setError(Lng.seUnexpChar[lang], ')');
					return null;
				}
				if(lastType === this.TYPE_ANDOR || lastType === this.TYPE_NOT) {
					this._setError(Lng.seMissSpell[lang], null);
					return null;
				}
				if(inParens) {
					return [i, spellsArr];
				}
				/* falls through */
			default:
				this._setError(Lng.seUnexpChar[lang], sList[i]);
				return null;
			}
		}
		if(inParens) {
			this._setError(Lng.seMissClBkt[lang], null);
			return null;
		}
		if(lastType !== this.TYPE_SPELL &&
			lastType !== this.TYPE_PARENTHESES &&
			lastType !== this.TYPE_REPLACER
		) {
			this._setError(Lng.seMissSpell[lang], null);
			return null;
		}
		if(!reps.length) {
			reps = false;
		}
		if(!outreps.length) {
			outreps = false;
		}
		return [spellsArr, reps, outreps];
	}
	_getRegex(str, haveComma) {
		const m = str.match(/^\((\/.*?[^\\]\/[igm]*)(?:\)|\s*(,))/);
		if(!m || haveComma !== Boolean(m[2])) {
			return null;
		}
		const val = m[1];
		try {
			strToRegExp(val, true);
		} catch(err) {
			this._col++;
			this._setError(Lng.seErrRegex[lang], val);
			return null;
		}
		return [m[0].length, val];
	}
	_doRep(name, str) {
		let scope = SpellsCodegen._getScope(str);
		if(scope) {
			str = str.substring(scope[0]);
		} else {
			scope = [0, ['', '']];
		}
		if(str[0] !== '(' || str[1] === ')') {
			this._setError(Lng.seMissArg[lang], name);
			return null;
		}
		const regex = this._getRegex(str, true);
		if(regex) {
			str = str.substring(regex[0]);
			if(str[0] === ')') {
				return [regex[0] + scope[0] + 1, [scope[1][0], scope[1][1], regex[1], '']];
			}
			const val = SpellsCodegen._getText(str, false);
			if(val) {
				return [val[0] + regex[0] + scope[0], [scope[1][0], scope[1][1], regex[1], val[1]]];
			}
		}
		if(!this.hasError) {
			this._setError(Lng.seSyntaxErr[lang], name);
		}
		return null;
	}
	_doSpell(name, str, isNeg) {
		let m;
		let i = 0;
		const spellIdx = Spells.names.indexOf(name);
		if(spellIdx === -1) {
			this._col -= name.length + 1;
			this._setError(Lng.seUnknown[lang], name);
			return null;
		}
		let scope = SpellsCodegen._getScope(str);
		if(scope) {
			i += scope[0];
			str = str.substring(scope[0]);
			scope = scope[1];
		}
		const spellType = isNeg ? spellIdx | 0x100 : spellIdx;
		if(str[0] !== '(' || str[1] === ')') {
			if(Spells.needArg[spellIdx]) {
				this._setError(Lng.seMissArg[lang], name);
				return null;
			}
			return [str[0] === '(' ? i + 2 : i, [spellType, spellIdx === 14 ? 0x3F : '', scope]];
		}
		switch(spellIdx) {
		case 0: // #words
		case 6: // #name
		case 7: // #trip
		case 9: // #sage
		case 10: // #op
		case 12: // #all
		case 16: // #vauthor
			m = SpellsCodegen._getText(str, true);
			if(m) {
				return [i + m[0], [spellType, spellIdx === 0 ? m[1].toLowerCase() : m[1], scope]];
			}
			break;
		case 1: // #exp
		case 2: // #exph
		case 3: // #imgn
		case 5: // #subj
		case 13: // #video
			m = this._getRegex(str, false);
			if(m) {
				return [i + m[0], [spellType, m[1], scope]];
			}
			break;
		case 4: // #ihash
			m = str.match(/^\((\d+)\)/);
			if(!isNaN(+m[1])) {
				return [i + m[0].length, [spellType, +m[1], scope]];
			}
			break;
		case 8: // #img
			m = str.match(/^\(([><=])(?:(\d+(?:\.\d+)?)(?:-(\d+(?:\.\d+)?))?)?(?:@(\d+)(?:-(\d+))?x(\d+)(?:-(\d+))?)?\)/);
			if(m && (m[2] || m[4])) {
				return [i + m[0].length, [spellType, [
					m[1] === '=' ? 0 : m[1] === '<' ? 1 : 2,
					m[2] && [+m[2], m[3] ? +m[3] : +m[2]],
					m[4] && [+m[4], m[5] ? +m[5] : +m[4], +m[6], m[7] ? +m[7] : +m[6]]
				], scope]];
			}
			break;
		case 14: // #wipe
			m = str.match(/^\(([a-z, ]+)\)/);
			if(m) {
				let val = 0;
				const arr = m[1].split(/, */);
				for(let i = 0, len = arr.length; i < len; ++i) {
					switch(arr[i]) {
					case 'samelines': val |= 1; break;
					case 'samewords': val |= 2; break;
					case 'longwords': val |= 4; break;
					case 'symbols': val |= 8; break;
					case 'capslock': val |= 16; break;
					case 'numbers': val |= 32; break;
					case 'whitespace': val |= 64; break;
					default: val = -1;
					}
				}
				if(val !== -1) {
					return [i + m[0].length, [spellType, val, scope]];
				}
			}
			break;
		case 11: // #tlen
		case 15: { // #num
			m = str.match(/^\(([\d-, ]+)\)/);
			if(m) {
				let val;
				m[1].split(/, */).forEach(function(v) {
					if(v.includes('-')) {
						const nums = v.split('-');
						nums[0] = +nums[0];
						nums[1] = +nums[1];
						this[1].push(nums);
					} else {
						this[0].push(+v);
					}
				}, val = [[], []]);
				return [i + m[0].length, [spellType, val, scope]];
			}
			break;
		}
		}
		if(!this.hasError) {
			this._setError(Lng.seSyntaxErr[lang], name);
		}
		return null;
	}
	_setError(msg, arg) {
		this.hasError = true;
		this._errMsg = msg;
		this._errMsgArg = arg;
	}
}

class SpellsRunner {
	constructor() {
		this.hasNumSpell = false;
		this._endPromise = null;
		this._spells = Spells.hiders;
		if(!this._spells) {
			this.runSpells = SpellsRunner._unhidePost;
			SpellsRunner.cachedData = null;
		}
	}
	static unhideAll() {
		if(aib.t) {
			sesStorage['de-hidden-' + aib.b + aib.t] = null;
		}
		for(let post = Thread.first.op; post; post = post.next) {
			if(post.spellHidden) {
				post.spellUnhide();
			}
		}
	}
	endSpells() {
		if(this._endPromise) {
			this._endPromise.then(() => this._savePostsHelper());
		} else {
			this._savePostsHelper();
		}
	}
	runSpells(post) {
		let res = new SpellsInterpreter(post, this._spells).runInterpreter();
		if(res instanceof Promise) {
			res = res.then(val => this._checkRes(post, val));
			this._endPromise = this._endPromise ? this._endPromise.then(() => res) : res;
			return 0;
		}
		return this._checkRes(post, res);
	}

	static _unhidePost(post) {
		if(post.spellHidden) {
			post.spellUnhide();
			if(SpellsRunner.cachedData && !post.isDeleted) {
				SpellsRunner.cachedData[post.count] = [false, null];
			}
		}
		return 0;
	}
	_checkRes(post, [hasNumSpell, val, msg]) {
		this.hasNumSpell |= hasNumSpell;
		if(val) {
			post.spellHide(msg);
			if(SpellsRunner.cachedData && !post.isDeleted) {
				SpellsRunner.cachedData[post.count] = [true, msg];
			}
			return 1;
		}
		return SpellsRunner._unhidePost(post);
	}
	_savePostsHelper() {
		if(this._spells) {
			if(aib.t) {
				const lPost = Thread.first.lastNotDeleted;
				let data = null;
				if(Spells.hiders) {
					if(SpellsRunner.cachedData) {
						data = SpellsRunner.cachedData;
					} else {
						data = [];
						for(let post = Thread.first.op; post; post = post.nextNotDeleted) {
							data.push(post.spellHidden ? [true, Post.Note.text] : [false, null]);
						}
						SpellsRunner.cachedData = data;
					}
				}
				sesStorage['de-hidden-' + aib.b + aib.t] = !data ? null : JSON.stringify({
					hash      : Cfg.hideBySpell ? Spells.hash : 0,
					lastCount : lPost.count,
					lastNum   : lPost.num,
					data
				});
			}
			toggleWindow('hid', true);
		}
		ImagesHashStorage.endFn();
	}
}
SpellsRunner.cachedData = null;

class SpellsInterpreter {
	constructor(post, spells) {
		this.hasNumSpell = false;
		this._ctx = [spells.length, spells, 0, false];
		this._deep = 0;
		this._lastTSpells = [];
		this._post = post;
		this._triggeredSpellsStack = [this._lastTSpells];
		this._wipeMsg = null;
	}
	runInterpreter() {
		let rv, stopCheck;
		let isNegScope = this._ctx.pop();
		let i = this._ctx.pop();
		let scope = this._ctx.pop();
		let len = this._ctx.pop();
		while(true) {
			if(i < len) {
				const type = scope[i][0] & 0xFF;
				if(type === 0xFF) {
					this._deep++;
					this._ctx.push(len, scope, i, isNegScope);
					isNegScope = !!(((scope[i][0] & 0x100) !== 0) ^ isNegScope);
					scope = scope[i][1];
					len = scope.length;
					i = 0;
					this._lastTSpells = [];
					this._triggeredSpellsStack.push(this._lastTSpells);
					continue;
				} else if(type === 17) {
					i++;
					continue;
				}
				const val = this._runSpell(type, scope[i][1]);
				if(val instanceof Promise) {
					this._ctx.push(len, scope, ++i, isNegScope);
					return val.then(v => this._asyncContinue(v));
				}
				[rv, stopCheck] = this._checkRes(scope[i], val, isNegScope);
				if(!stopCheck) {
					i++;
					continue;
				}
			}
			if(this._deep !== 0) {
				this._deep--;
				isNegScope = this._ctx.pop();
				i = this._ctx.pop();
				scope = this._ctx.pop();
				len = this._ctx.pop();
				if(((scope[i][0] & 0x200) === 0) ^ rv) {
					i++;
					this._triggeredSpellsStack.pop();
					this._lastTSpells = this._triggeredSpellsStack[this._triggeredSpellsStack.length - 1];
					continue;
				}
			}
			return [this.hasNumSpell, rv, rv ? this._getMsg() : null];
		}
	}

	static _tlenNumHelper(val, num) {
		for(let arr = val[0], i = arr.length - 1; i >= 0; --i) {
			if(arr[i] === num) {
				return true;
			}
		}
		for(let arr = val[1], i = arr.length - 1; i >= 0; --i) {
			if(num >= arr[i][0] && num <= arr[i][1]) {
				return true;
			}
		}
		return false;
	}
	_asyncContinue(val) {
		const cl = this._ctx.length;
		const spell = this._ctx[cl - 3][this._ctx[cl - 2] - 1];
		const [rv, stopCheck] = this._checkRes(spell, val, this._ctx[cl - 1]);
		return stopCheck ? [this.hasNumSpell, rv, rv ? this._getMsg() : null] : this.runInterpreter();
	}
	_checkRes(spell, val, isNegScope) {
		const flags = spell[0];
		const isAndSpell = ((flags & 0x200) !== 0) ^ isNegScope;
		const isNegSpell = ((flags & 0x100) !== 0) ^ isNegScope;
		if(isNegSpell ^ val) {
			this._lastTSpells.push([isNegSpell, spell, (spell[0] & 0xFF) === 14 ? this._wipeMsg : null]);
			return [true, !isAndSpell];
		}
		this._lastTSpells.length = 0;
		return [false, isAndSpell];
	}
	_getMsg() {
		const rv = [];
		for(const spellEls of this._triggeredSpellsStack) {
			for(const [isNeg, spell, wipeMsg] of spellEls) {
				rv.push(Spells.decompileSpell(spell[0] & 0xFF, isNeg, spell[1], spell[2], wipeMsg));
			}
		}
		return rv.join(' & ');
	}
	_runSpell(spellId, val) {
		switch(spellId) {
		case 0: return this._words(val);
		case 1: return this._exp(val);
		case 2: return this._exph(val);
		case 3: return this._imgn(val);
		case 4: return this._ihash(val);
		case 5: return this._subj(val);
		case 6: return this._name(val);
		case 7: return this._trip(val);
		case 8: return this._img(val);
		case 9: return this._sage(val);
		case 10: return this._op(val);
		case 11: return this._tlen(val);
		case 12: return this._all(val);
		case 13: return this._video(val);
		case 14: return this._wipe(val);
		case 15:
			this.hasNumSpell = true;
			return this._num(val);
		case 16: return this._vauthor(val);
		}
	}

	_all() {
		return true;
	}
	_exp(val) {
		return val.test(this._post.text);
	}
	_exph(val) {
		return val.test(this._post.html);
	}
	async _ihash(val) {
		for(const image of this._post.images) {
			if((image instanceof AttachedImage) && await ImagesHashStorage.getHash(image) === val) {
				return true;
			}
		}
		return false;
	}
	_img(val) {
		const { images } = this._post;
		const [compareRule, weightVals, sizeVals] = val;
		if(!val) {
			return images.hasAttachments;
		}
		for(const image of images) {
			if(!(image instanceof AttachedImage)) {
				continue;
			}
			if(weightVals) {
				const w = image.weight;
				let isHide;
				switch(compareRule) {
				case 0: isHide = w >= weightVals[0] && w <= weightVals[1]; break;
				case 1: isHide = w < weightVals[0]; break;
				case 2: isHide = w > weightVals[0]; break;
				}
				if(!isHide) {
					continue;
				} else if(!sizeVals) {
					return true;
				}
			}
			if(sizeVals) {
				const { height: h, width: w } = image;
				switch(compareRule) {
				case 0:
					if(w >= sizeVals[0] && w <= sizeVals[1] && h >= sizeVals[2] && h <= sizeVals[3]) {
						return true;
					}
					break;
				case 1:
					if(w < sizeVals[0] && h < sizeVals[3]) {
						return true;
					}
					break;
				case 2:
					if(w > sizeVals[0] && h > sizeVals[3]) {
						return true;
					}
				}
			}
		}
		return false;
	}
	_imgn(val) {
		for(const image of this._post.images) {
			if((image instanceof AttachedImage) && val.test(image.name)) {
				return true;
			}
		}
		return false;
	}
	_name(val) {
		const pName = this._post.posterName;
		return pName ? !val || pName.includes(val) : false;
	}
	_num(val) {
		return SpellsInterpreter._tlenNumHelper(val, this._post.count + 1);
	}
	_op() {
		return this._post.isOp;
	}
	_sage() {
		return this._post.sage;
	}
	_subj(val) {
		const pSubj = this._post.subj;
		return pSubj ? !val || val.test(pSubj) : false;
	}
	_tlen(val) {
		const text = this._post.text.replace(/\s+(?=\s)|\n/g, '');
		return !val ? !!text : SpellsInterpreter._tlenNumHelper(val, text.length);
	}
	_trip(val) {
		const pTrip = this._post.posterTrip;
		return pTrip ? !val || pTrip.includes(val) : false;
	}
	_vauthor(val) {
		return this._videoVauthor(val, true);
	}
	_video(val) {
		return this._videoVauthor(val, false);
	}
	_videoVauthor(val, isAuthorSpell) {
		const { videos } = this._post;
		if(!val) {
			return !!videos.hasLinks;
		}
		if(!videos.hasLinks || !Cfg.YTubeTitles) {
			return false;
		}
		for(const siteData of videos.vData) {
			for(const data of siteData) {
				if(isAuthorSpell ? val === data[1] : val.test(data[0])) {
					return true;
				}
			}
		}
		if(videos.linksCount === videos.loadedLinksCount) {
			return false;
		}
		return new Promise(resolve => (videos.titleLoadFn = data => {
			if(isAuthorSpell ? val === data[1] : val.test(data[0])) {
				resolve(true);
			} else if(videos.linksCount === videos.loadedLinksCount) {
				resolve(false);
			} else {
				return;
			}
			videos.titleLoadFn = null;
		}));
	}
	_wipe(val) {
		let arr, len, x;
		const txt = this._post.text;
		// (1 << 0): samelines
		if(val & 1) {
			arr = txt.replaceAll('>', '').split(/\s*\n\s*/);
			if((len = arr.length) > 5) {
				arr.sort();
				for(let i = 0, n = len / 4; i < len;) {
					x = arr[i];
					let j = 0;
					while(arr[i++] === x) {
						j++;
					}
					if(j > 4 && j > n && x) {
						this._wipeMsg = [1, `"${ x.substr(0, 20) }" x${ j + 1 }`];
						return true;
					}
				}
			}
		}
		// (1 << 1): samewords
		if(val & 2) {
			arr = txt.replace(/[\s.?!,>]+/g, ' ').toUpperCase().split(' ');
			if((len = arr.length) > 3) {
				arr.sort();
				let keys = 0;
				let pop = 0;
				for(let i = 0, n = len / 4; i < len; keys++) {
					x = arr[i];
					let j = 0;
					while(arr[i++] === x) {
						j++;
					}
					if(len > 25) {
						if(j > pop && x.length > 2) {
							pop = j;
						}
						if(pop >= n) {
							this._wipeMsg = [2, `same "${ x.substr(0, 20) }" x${ pop + 1 }`];
							return true;
						}
					}
				}
				x = keys / len;
				if(x < 0.25) {
					this._wipeMsg = [2, `uniq ${ (x * 100).toFixed(0) }%`];
					return true;
				}
			}
		}
		// (1 << 2): longwords
		if(val & 4) {
			arr = txt.replace(/https*:\/\/.*?(\s|$)/g, '').replace(/[\s.?!,>:;-]+/g, ' ').split(' ');
			if(arr[0].length > 50 || ((len = arr.length) > 1 && arr.join('').length / len > 10)) {
				this._wipeMsg = [4, null];
				return true;
			}
		}
		// (1 << 3): symbols
		if(val & 8) {
			const _txt = txt.replace(/\s+/g, '');
			if((len = _txt.length) > 30 && (x = _txt.replace(/[0-9a-zа-я.?!,]/ig, '').length / len) > 0.4) {
				this._wipeMsg = [8, `${ (x * 100).toFixed(0) }%`];
				return true;
			}
		}
		// (1 << 4): capslock
		if(val & 16) {
			arr = txt.replace(/[\s.?!;,-]+/g, ' ').trim().split(' ');
			if((len = arr.length) > 4) {
				let n = 0;
				let capsw = 0;
				let casew = 0;
				for(let i = 0; i < len; ++i) {
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
					this._wipeMsg = [16, `CAPS ${ capsw / arr.length * 100 }%`];
					return true;
				} else if(casew / n >= 0.3 && n > 8) {
					this._wipeMsg = [16, `cAsE ${ casew / arr.length * 100 }%`];
					return true;
				}
			}
		}
		// (1 << 5): numbers
		if(val & 32) {
			const _txt = txt.replace(/\s+/g, ' ').replace(/>>\d+|https*:\/\/.*?(?: |$)/g, '');
			if((len = _txt.length) > 30 && (x = (len - _txt.replace(/\d/g, '').length) / len) > 0.4) {
				this._wipeMsg = [32, `${ Math.round(x * 100) }%`];
				return true;
			}
		}
		// (1 << 5): whitespace
		if(val & 64) {
			if(/(?:\n\s*){10}/i.test(txt)) {
				this._wipeMsg = [64, null];
				return true;
			}
		}
		return false;
	}
	_words(val) {
		return this._post.text.toLowerCase().includes(val) || this._post.subj.toLowerCase().includes(val);
	}
}

/* ==[ Form.js ]==============================================================================================
                                                   POSTFORM
                 postform improving, quick reply window, markup text panel, sage button, etc
=========================================================================================================== */

class PostForm {
	constructor(form, oeForm = null, ignoreForm = false) {
		this.isBottom = false;
		this.isHidden = false;
		this.isQuick = false;
		this.lastQuickPNum = -1;
		this.pArea = [];
		this.pForm = null;
		this.qArea = null;
		this._pBtn = [];
		const qOeForm = 'form[name="oeform"], form[action*="paint"]';
		this.oeForm = oeForm || $q(qOeForm);
		if(!ignoreForm && !form) {
			if(this.oeForm) {
				ajaxLoad(aib.getThrUrl(aib.b, Thread.first.num), false).then(loadedDoc => {
					const form = $q(aib.qForm, loadedDoc);
					const oeForm = $q(qOeForm, loadedDoc);
					pr = new PostForm(form && doc.adoptNode(form), oeForm && doc.adoptNode(oeForm), true);
				}, () => (pr = new PostForm(null, null, true)));
			} else {
				this.form = null;
			}
			return;
		}
		this.tNum = aib.t;
		this.form = form;
		this.files = null;
		this.txta = $q(aib.qFormTxta, form);
		this.subm = $q(aib.qFormSubm, form);
		this.name = $q(aib.qFormName, form);
		this.mail = $q(aib.qFormMail, form);
		this.subj = $q(aib.qFormSubj, form);
		this.passw = $q(aib.qFormPassw, form);
		this.rules = $q(aib.qFormRules, form);
		this.video = $q('tr input[name="video"], tr input[name="embed"]', form);
		this._initFileInputs();
		this._makeHideableContainer();
		this._makeWindow();
		if(!form || !this.txta) {
			return;
		}
		form.style.display = 'inline-block';
		form.style.textAlign = 'left';
		const { qArea, txta } = this;
		new WinResizer('reply', 'top', 'textaHeight', qArea, txta);
		new WinResizer('reply', 'left', 'textaWidth', qArea, txta);
		new WinResizer('reply', 'right', 'textaWidth', qArea, txta);
		new WinResizer('reply', 'bottom', 'textaHeight', qArea, txta);
		this._initTextarea();
		this.addMarkupPanel();
		this.setPlaceholders();
		this.updateLanguage();
		this._initCaptcha();
		this._initSubmit();
		if(Cfg.ajaxPosting) {
			this._initAjaxPosting();
		}
		if(Cfg.addSageBtn && this.mail) {
			PostForm.hideField(this.mail.closest('label') || this.mail);
			setTimeout(() => this.toggleSage(), 0);
		}
		if(Cfg.noPassword && this.passw) {
			$hide(this.passw.closest(aib.qFormTr));
		}
		if(Cfg.noName && this.name) {
			PostForm.hideField(this.name);
		}
		if(Cfg.noSubj && this.subj) {
			PostForm.hideField(this.subj);
		}
		if(Cfg.userName && this.name) {
			setTimeout(PostForm.setUserName, 0);
		}
		if(this.passw) {
			setTimeout(PostForm.setUserPassw, 0);
		}
	}
	static hideField(el) {
		const next = el.nextElementSibling;
		$toggle(next && (next.style.display !== 'none') ||
			el.previousElementSibling ? el : el.closest(aib.qFormTr));
	}
	static setUserName() {
		const el = $q('input[info="nameValue"]');
		if(el) {
			saveCfg('nameValue', el.value);
		}
		pr.name.value = Cfg.userName ? Cfg.nameValue : '';
	}
	static setUserPassw() {
		if(!Cfg.userPassw) {
			return;
		}
		const el = $q('input[info="passwValue"]');
		if(el) {
			saveCfg('passwValue', el.value);
		}
		const value = pr.passw.value = Cfg.passwValue;
		for(const { passEl } of DelForm) {
			if(passEl) {
				passEl.value = value;
			}
		}
	}
	get isVisible() {
		if(!this.isHidden && this.isBottom && $q(':focus', this.pForm)) {
			const cr = this.pForm.getBoundingClientRect();
			return cr.bottom > 0 && cr.top < nav.viewportHeight();
		}
		return false;
	}
	get sageBtn() {
		const value = $aEnd(this.subm, '<span id="de-sagebtn"><svg class="de-btn-sage">' +
			'<use xlink:href="#de-symbol-post-sage"/></svg></span>');
		value.onclick = () => {
			toggleCfg('sageReply');
			this.toggleSage();
		};
		Object.defineProperty(this, 'sageBtn', { value });
		return value;
	}
	get top() {
		return this.pForm.getBoundingClientRect().top;
	}
	addMarkupPanel() {
		let el = $id('de-txt-panel');
		if(!Cfg.addTextBtns) {
			$del(el);
			return;
		}
		if(!el) {
			el = $add('<span id="de-txt-panel"></span>');
			['click', 'mouseover'].forEach(e => el.addEventListener(e, this));
		}
		el.style.cssFloat = Cfg.txtBtnsLoc ? 'none' : 'right';
		(Cfg.txtBtnsLoc ? $id('de-resizer-text') || this.txta : this.subm).after(el);
		const id = ['bold', 'italic', 'under', 'strike', 'spoil', 'code', 'sup', 'sub'];
		const val = ['B', 'i', 'U', 'S', '%', 'C', 'x\u00b2', 'x\u2082'];
		const mode = Cfg.addTextBtns;
		let html = '';
		for(let i = 0, len = aib.markupTags.length; i < len; ++i) {
			const tag = aib.markupTags[i];
			if(tag) {
				html += `<div id="de-btn-${ id[i] }" de-title="${ Lng.txtBtn[i][lang] }" de-tag="${ tag }">${
					mode === 2 ? `${ !html ? '[' : '' }&nbsp;<a class="de-abtn" href="#">${ val[i] }</a> /` :
					mode === 3 ? `<button type="button" style="font-weight: bold;">${ val[i] }</button>` :
					`<svg><use xlink:href="#de-symbol-markup-${ id[i] }"/></svg>`
				}</div>`;
			}
		}
		el.innerHTML = `${ html }<div id="de-btn-quote" de-title="${ Lng.txtBtn[8][lang] }" de-tag="q">${
			mode === 2 ? '&nbsp;<a class="de-abtn" href="#">&gt;</a> ]' :
			mode === 3 ? '<button type="button" style="font-weight: bold;">&gt;</button>' :
			'<svg><use xlink:href="#de-symbol-markup-quote"/></svg>'
		}</span>`;
	}
	clearForm() {
		if(this.txta) {
			this.txta.value = '';
		}
		if(this.files) {
			this.files.clearInputs();
		}
		if(this.video) {
			this.video.value = '';
		}
	}
	closeReply() {
		if(this.isQuick) {
			this.isQuick = false;
			this.lastQuickPNum = -1;
			if(!aib.t) {
				this._toggleQuickReply(false);
				this.tNum = false;
			}
			this.setReply(false, !aib.t || Cfg.addPostForm > 1);
		}
	}
	handleEvent(e) {
		let el = e.target;
		if(el.tagName !== 'DIV') {
			el = el.parentNode;
		}
		const { id } = el;
		if(!id.startsWith('de-btn')) {
			return;
		}
		if(e.type === 'mouseover') {
			if(id === 'de-btn-quote') {
				quotedText = deWindow.getSelection().toString();
			}
			let key = -1;
			if(HotKeys.enabled) {
				switch(id.substr(7)) {
				case 'bold': key = 12; break;
				case 'italic': key = 13; break;
				case 'strike': key = 14; break;
				case 'spoil': key = 15; break;
				case 'code': key = 16;
				}
			}
			KeyEditListener.setTitle(el, key);
			return;
		}
		const txtaEl = pr.txta;
		const { selectionStart: start, selectionEnd: end } = txtaEl;
		const quote = Cfg.spacedQuote ? '> ' : '>';
		if(id === 'de-btn-quote') {
			insertText(txtaEl, quote + (start === end ? quotedText : txtaEl.value.substring(start, end))
				.replace(/^[\r\n]|[\r\n]+$/g, '').replace(/\n/gm, '\n' + quote) + (quotedText ? '\n' : ''));
			quotedText = '';
		} else {
			const { scrtop } = txtaEl;
			const val = PostForm._wrapText(el.getAttribute('de-tag'), txtaEl.value.substring(start, end));
			const len = start + val[0];
			txtaEl.value = txtaEl.value.substr(0, start) + val[1] + txtaEl.value.substr(end);
			txtaEl.setSelectionRange(len, len);
			txtaEl.focus();
			txtaEl.scrollTop = scrtop;
		}
		e.preventDefault();
		e.stopPropagation();
	}
	refreshCap(isErr = false) {
		if(this.cap) {
			this.cap.refreshCaptcha(isErr, isErr, this.tNum);
		}
	}
	setPlaceholders() {
		if(aib.formHeaders || !aib.multiFile && Cfg.fileInputs === 2) {
			return;
		}
		this._setPlaceholder('name');
		this._setPlaceholder('subj');
		this._setPlaceholder('mail');
		this._setPlaceholder('video');
		if(this.cap) {
			this._setPlaceholder('cap');
		}
	}
	setReply(isQuick, needToHide) {
		if(isQuick) {
			this.qArea.firstChild.after(this.pForm);
		} else {
			this.pArea[+this.isBottom].after(this.qArea);
			this._pBtn[+this.isBottom].after(this.pForm);
		}
		this.isHidden = needToHide;
		$toggle(this.qArea, isQuick);
		$toggle(this.pForm, !needToHide);
		this.updatePAreaBtns();
	}
	showMainReply(isBottom, e) {
		this.closeReply();
		if(!aib.t) {
			this.tNum = false;
			this.refreshCap();
		}
		if(this.isBottom === isBottom) {
			$toggle(this.pForm, this.isHidden);
			this.isHidden = !this.isHidden;
			this.updatePAreaBtns();
		} else {
			this.isBottom = isBottom;
			this.setReply(false, false);
		}
		if(e) {
			e.preventDefault();
		}
	}
	showQuickReply(post, pNum, isCloseReply, isNumClick, isNoLink = false) {
		if(!this.isQuick) {
			this.isQuick = true;
			this.setReply(true, false);
			$q('a', this._pBtn[+this.isBottom]).className =
				`de-abtn de-parea-btn-${ aib.t ? 'reply' : 'thr' }`;
		} else if(isCloseReply && !quotedText && post.wrap.nextElementSibling === this.qArea) {
			this.closeReply();
			return;
		}
		post.wrap.after(this.qArea);
		if(this.qArea.classList.contains('de-win')) {
			updateWinZ(this.qArea.style);
		}
		const qNum = post.thr.num;
		if(!aib.t) {
			this._toggleQuickReply(qNum);
		}
		if(!this.form) {
			return;
		}
		if(!aib.t && this.tNum !== qNum) {
			this.tNum = qNum;
			this.refreshCap();
		}
		this.tNum = qNum;
		const txt = this.txta.value;
		const isOnNewLine = txt === '' || txt.slice(-1) === '\n';
		const link = isNoLink || post.isOp && !Cfg.addOPLink && !aib.t && !isNumClick ? '' :
			isNumClick ? `>>${ pNum }${ isOnNewLine ? '\n' : '' }` :
			(isOnNewLine ? '' : '\n') +
				(this.lastQuickPNum === pNum && txt.includes('>>' + pNum) ? '' : `>>${ pNum }\n`);
		const quote = !quotedText ? '' : `${ quotedText.replace(/^[\r\n]|[\r\n]+$/g, '')
			.replace(/(^|\n)(.)/gm, `$1>${ Cfg.spacedQuote ? ' ' : '' }$2`) }\n`;
		insertText(this.txta, link + quote);
		const winTitle = post.thr.op.title.trim();
		$q('.de-win-title', this.qArea).textContent =
			(winTitle.length < 28 ? winTitle : `${ winTitle.substr(0, 30) }\u2026`) || `#${ pNum }`;
		this.lastQuickPNum = pNum;
	}
	toggleSage() {
		if(!Cfg.addSageBtn || !this.mail) {
			return;
		}
		const isSage = Cfg.sageReply;
		this.sageBtn.style.opacity = isSage ? '1' : '.3';
		this.sageBtn.title = isSage ? Lng.disableSage[lang] : Lng.enableSage[lang];
		if(this.mail.type === 'text') {
			this.mail.value = isSage ? 'sage' : aib._4chan ? 'noko' : '';
		} else {
			this.mail.checked = isSage;
		}
	}
	updateLanguage() {
		this.txta.title = Lng.pasteImage[lang];
		aib.updateSubmitBtn(this.subm);
	}
	updatePAreaBtns() {
		const txt = 'de-abtn de-parea-btn-';
		const rep = aib.t ? 'reply' : 'thr';
		$q('a', this._pBtn[+this.isBottom]).className = txt + (!this.pForm.style.display ? 'close' : rep);
		$q('a', this._pBtn[+!this.isBottom]).className = txt + rep;
	}

	static _wrapText(tag, text) {
		let isBB = aib.markupBB;
		if(tag.startsWith('[')) {
			tag = tag.substr(1);
			isBB = true;
		}
		if(isBB) {
			if(text.includes('\n')) {
				const str = `[${ tag }]${ text }[/${ tag }]`;
				return [str.length, str];
			}
			const m = text.match(/^(\s*)(.*?)(\s*)$/);
			const str = `${ m[1] }[${ tag }]${ m[2] }[/${ tag }]${ m[3] }`;
			return [!m[2].length ? m[1].length + tag.length + 2 : str.length, str];
		}
		let m;
		let rv = '';
		let i = 0;
		const arr = text.split('\n');
		for(let len = arr.length; i < len; ++i) {
			m = arr[i].match(/^(\s*)(.*?)(\s*)$/);
			rv += '\n' + m[1] + (tag === '^H' ? m[2] + '^H'.repeat(m[2].length) : tag + m[2] + tag) + m[3];
		}
		return [i === 1 && !m[2].length && tag !== '^H' ?
			m[1].length + tag.length :
			rv.length - 1, rv.slice(1)];
	}
	_initAjaxPosting() {
		let el;
		if(aib.qFormRedir && (el = $q(aib.qFormRedir, this.form))) {
			aib.disableRedirection(el);
		}
		this.form.onsubmit = e => {
			e.preventDefault();
			$popup('upload', Lng.sending[lang], true);
			html5Submit(this.form, this.subm, true).then(checkUpload)
				.catch(err => $popup('upload', getErrorMessage(err)));
		};
	}
	_initCaptcha() {
		const capEl =
			$q('input[type="text"][name*="aptcha"], *[id*="captcha"], *[class*="captcha"]', this.form);
		if(!capEl) {
			this.cap = null;
			return;
		}
		this.cap = new Captcha(capEl, this.tNum);
		const updCapFn = () => {
			this.cap.addCaptcha();
			this.cap.updateOutdated();
		};
		this.txta.addEventListener('focus', updCapFn);
		if(this.files) {
			this.files.onchange = updCapFn;
		}
		this.form.addEventListener('click', () => this.cap.addCaptcha(), true);
	}
	_initFileInputs() {
		const fileEl = $q(aib.qFormFile, this.form);
		if(!fileEl) {
			return;
		}
		if(aib.fixFileInputs) {
			aib.fixFileInputs(fileEl.closest(aib.qFormTd));
		}
		this.files = new Files(this, $q(aib.qFormFile, this.form));
		// We need to clear file inputs in case if session was restored.
		deWindow.addEventListener('load',
			() => setTimeout(() => !this.files.filesCount && this.files.clearInputs(), 0));
	}
	_initSubmit() {
		this.subm.addEventListener('click', e => {
			if(Cfg.warnSubjTrip && this.subj && /#.|##./.test(this.subj.value)) {
				e.preventDefault();
				$popup('upload', Lng.subjHasTrip[lang]);
				return;
			}
			let val = this.txta.value;
			if(Spells.outreps) {
				val = Spells.outReplace(val);
			}
			if(this.tNum && pByNum.get(this.tNum).subj === 'Dollchan Extension Tools') {
				const temp = `\n\n${ PostForm._wrapText(aib.markupTags[5],
					`${ '-'.repeat(50) }\n${ nav.ua }\nv${ version }.${ commit }${
						nav.isESNext ? '.es6' : '' } [${ nav.scriptHandler }]`
				)[1] }`;
				if(!val.includes(temp)) {
					val += temp;
				}
			}
			this.txta.value = val;
			this.toggleSage();
			if(Cfg.ajaxPosting) {
				$popup('upload', Lng.checking[lang], true);
			}
			if(this.video && (val = this.video.value) && (val = val.match(Videos.ytReg))) {
				this.video.value = 'http://www.youtube.com/watch?v=' + val[1];
			}
			if(this.isQuick) {
				$hide(this.pForm);
				$hide(this.qArea);
				this._pBtn[+this.isBottom].after(this.pForm);
			}
			updater.pauseUpdater();
		});
	}
	_initTextarea() {
		const el = this.txta;
		if(aib.dobrochan) {
			el.removeAttribute('id');
		}
		el.classList.add('de-textarea');
		const { style } = el;
		style.setProperty('width', Cfg.textaWidth + 'px', 'important');
		style.setProperty('height', Cfg.textaHeight + 'px', 'important');
		// Allow to scroll page on PgUp/PgDn
		el.addEventListener('keypress', e => {
			const code = e.charCode || e.keyCode;
			if((code === 33 /* PgUp */ || code === 34 /* PgDn */) && e.which === 0) {
				e.target.blur();
				deWindow.focus();
			}
		});
		// Add image from clipboard to file inputs on Ctrl+V
		el.addEventListener('paste', async e => {
			const files = e?.clipboardData?.files;
			for(const file of files) {
				const inputs = this.files._inputs;
				for(let i = 0, len = inputs.length; i < len; ++i) {
					const input = inputs[i];
					if(!input.hasFile) {
						await input.addUrlFile(URL.createObjectURL(file), file);
						break;
					}
				}
			}
		});
		// Make textarea resizer
		if(nav.isFirefox || nav.isWebkit) {
			el.addEventListener('mouseup', ({ target }) => {
				const s = target.style;
				const { width, height } = s;
				s.setProperty('width', width + 'px', 'important');
				s.setProperty('height', height + 'px', 'important');
				saveCfg('textaWidth', parseInt(width, 10));
				saveCfg('textaHeight', parseInt(height, 10));
			});
			return;
		}
		$aEnd(el, '<div id="de-resizer-text"></div>').addEventListener('mousedown', {
			_el      : el,
			_elStyle : style,
			handleEvent(e) {
				switch(e.type) {
				case 'mousedown':
					['mousemove', 'mouseup'].forEach(e => docBody.addEventListener(e, this));
					e.preventDefault();
					return;
				case 'mousemove': {
					const cr = this._el.getBoundingClientRect();
					this._elStyle.setProperty('width', (e.clientX - cr.left) + 'px', 'important');
					this._elStyle.setProperty('height', (e.clientY - cr.top) + 'px', 'important');
					return;
				}
				default: // mouseup
					['mousemove', 'mouseup'].forEach(e => docBody.removeEventListener(e, this));
					saveCfg('textaWidth', parseInt(this._elStyle.width, 10));
					saveCfg('textaHeight', parseInt(this._elStyle.height, 10));
				}
			}
		});
	}
	_makeHideableContainer() {
		(this.pForm = $add('<div id="de-pform" class="de-win-body"></div>'))
			.append(this.form || '', this.oeForm || '');
		const html = '<div class="de-parea"><div>[<a href="#"></a>]</div><hr></div>';
		this.pArea = [
			$bBegin(DelForm.first.el, html),
			$aEnd(aib._4chan ? $q('.board', DelForm.first.el) : DelForm.first.el, html)
		];
		this._pBtn = [this.pArea[0].firstChild, this.pArea[1].firstChild];
		this._pBtn[0].firstElementChild.onclick = e => this.showMainReply(false, e);
		this._pBtn[1].firstElementChild.onclick = e => this.showMainReply(true, e);
		this.qArea = $add(`<div style="display: none; ${ Cfg.replyWinX }; ${
			Cfg.replyWinY }; z-index: ${ ++topWinZ };" id="de-win-reply" class="${
			aib.cReply + (Cfg.replyWinDrag ? ' de-win' : ' de-win-inpost') }"></div>`);
		this.isBottom = Cfg.addPostForm === 1;
		this.setReply(false, !aib.t || Cfg.addPostForm > 1);
	}
	_makeWindow() {
		makeDraggable('reply', this.qArea, $aBegin(this.qArea, `<div class="de-win-head">
			<span class="de-win-title"></span>
			<span class="de-win-buttons">
				<svg class="de-win-btn-clear"><use xlink:href="#de-symbol-unavail"/></svg>
				<svg class="de-win-btn-toggle"><use xlink:href="#de-symbol-win-arrow"/></svg>
				<svg class="de-win-btn-close"><use xlink:href="#de-symbol-win-close"/></svg>
			</span>
		</div>
		<div class="de-resizer de-resizer-top"></div>
		<div class="de-resizer de-resizer-left"></div>
		<div class="de-resizer de-resizer-right"></div>
		<div class="de-resizer de-resizer-bottom"></div>`));
		const buttons = $q('.de-win-buttons', this.qArea);
		buttons.onmouseover = ({ target }) => {
			const el = target.parentNode;
			switch(nav.fixEventEl(target).classList[0]) {
			case 'de-win-btn-clear': el.title = Lng.clearForm[lang]; break;
			case 'de-win-btn-close': el.title = Lng.closeReply[lang]; break;
			case 'de-win-btn-toggle': el.title = Cfg.replyWinDrag ? Lng.underPost[lang] : Lng.makeDrag[lang];
			}
		};
		const [clearBtn, toggleBtn, closeBtn] = [...buttons.children];
		clearBtn.onclick = () => {
			saveCfg('sageReply', 0);
			this.toggleSage();
			this.files.clearInputs();
			[this.txta, this.name, this.mail, this.subj, this.video, this.cap && this.cap.textEl].forEach(
				el => el && (el.value = ''));
		};
		toggleBtn.onclick = () => {
			toggleCfg('replyWinDrag');
			if(Cfg.replyWinDrag) {
				this.qArea.className = aib.cReply + ' de-win';
				updateWinZ(this.qArea.style);
			} else {
				this.qArea.className = aib.cReply + ' de-win-inpost';
				this.txta.focus();
			}
		};
		closeBtn.onclick = () => this.closeReply();
	}
	_setPlaceholder(val) {
		const el = val === 'cap' ? this.cap.textEl : this[val];
		if(el) {
			$toggleAttr(el, 'placeholder', Lng[val][lang], aib.multiFile || Cfg.fileInputs !== 2);
		}
	}
	_toggleQuickReply(tNum) {
		if(this.oeForm) {
			$del($q('input[name="oek_parent"]', this.oeForm));
			if(tNum) {
				this.oeForm.insertAdjacentHTML('afterbegin',
					`<input type="hidden" value="${ tNum }" name="oek_parent">`);
			}
		}
		if(this.form) {
			if(aib.changeReplyMode && tNum !== this.tNum) {
				aib.changeReplyMode(this.form, tNum);
			}
			$del($q(`input[name="${ aib.formParent }"]`, this.form));
			if(tNum) {
				this.form.insertAdjacentHTML('afterbegin',
					`<input type="hidden" name="${ aib.formParent }" value="${ tNum }">`);
			}
		}
	}
}

/* ==[ FormSubmit.js ]========================================================================================
                                                    SUBMIT
    postform/delform html5/iframe submit, images and webms parsing, duplicate files posting, EXIF clearing
=========================================================================================================== */

function getSubmitError(dc) {
	if(!dc.body?.hasChildNodes() || $q(aib.qDelForm, dc)) {
		return null;
	}
	const err = [...$Q(aib.qError, dc)].map(str => str.innerHTML + '\n').join('')
		.replace(/<a [^>]+>Назад.+|<br.+/, '') || dc.body.innerHTML;
	return aib.isIgnoreError(err) ? null : err;
}

function checkUpload(data) {
	let error = null;
	let postNum = null;
	const isDocument = data instanceof HTMLDocument;
	if(aib.getSubmitData) {
		if(aib.jsonSubmit) {
			if(aib.captchaAfterSubmit?.(data)) {
				return;
			}
			const _data = (isDocument ? data.body.textContent : data).trim();
			try {
				data = JSON.parse(_data);
			} catch(err) {
				error = getSubmitError(_data);
			}
		}
		if(!error) {
			({ error, postNum } = aib.getSubmitData(data));
		}
	} else {
		error = getSubmitError(data);
	}
	if(error) {
		if(pr.isQuick) {
			pr.setReply(true, false);
		}
		if(/[cf]aptch|капч|подтвер|verifi/i.test(error)) {
			pr.refreshCap(true);
		}
		$popup('upload', error.toString());
		updater.sendErrNotif();
		updater.continueUpdater();
		DollchanAPI.notify('submitform', { success: false, error });
		return;
	}
	const { tNum } = pr;
	if((Cfg.markMyPosts || Cfg.markMyLinks) && postNum) {
		MyPosts.set(postNum, tNum || postNum);
	}
	if(Cfg.favOnReply && !Cfg.sageReply) {
		if(tNum) {
			const { thr } = pByNum.get(tNum);
			if(!thr.isFav) {
				thr.toggleFavState(true);
			}
		} else {
			sesStorage['de-fav-newthr'] = JSON.stringify({ num: postNum, date: Date.now() });
		}
	}
	pr.clearForm();
	DollchanAPI.notify('submitform', { success: true, num: postNum });
	Cfg.stats[tNum ? 'reply' : 'op']++;
	saveCfgObj(aib.dm, Cfg);
	if(!tNum) {
		if(postNum) {
			deWindow.location.assign(aib.getThrUrl(aib.b, postNum));
		} else if(isDocument) {
			const dForm = $q(aib.qDelForm, data);
			if(dForm) {
				deWindow.location.assign(aib.getThrUrl(aib.b, aib.getTNum(dForm)));
			}
		}
		return;
	}
	if(aib.t) {
		Post.clearMarks();
		Thread.first.loadNewPosts().then(() => AjaxError.Success, err => err).then(err => {
			infoLoadErrors(err);
			if(Cfg.scrAfterRep) {
				scrollTo(0, deWindow.pageYOffset + Thread.first.last.el.getBoundingClientRect().top);
			}
			updater.continueUpdater(true);
			closePopup('upload');
		});
	} else {
		pByNum.get(tNum).thr.loadPosts('new', false, false).then(() => closePopup('upload'));
	}
	pr.closeReply();
	pr.refreshCap();
}

async function checkDelete(data) {
	const err = getSubmitError(data instanceof HTMLDocument ? data : $createDoc(data));
	if(err) {
		$popup('delete', Lng.errDelete[lang] + ':\n' + err);
		updater.sendErrNotif();
		return;
	}
	const els = $Q(`[de-form] ${ aib.qPost.split(', ').join(' input:checked, [de-form] ') } input:checked`);
	const threads = new Set();
	const isThr = aib.t;
	for(let i = 0, len = els.length; i < len; ++i) {
		const el = els[i];
		el.checked = false;
		if(!isThr) {
			threads.add(aib.getPostOfEl(el).thr);
		}
	}
	if(isThr) {
		Post.clearMarks();
		await Thread.first.loadNewPosts().catch(err => infoLoadErrors(err));
	} else {
		await Promise.all([...threads].map(thr => thr.loadPosts('new', false, false)));
	}
	$popup('delete', Lng.succDeleted[lang]);
}

// https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
function isFormElDisabled(el) {
	switch(el.tagName.toLowerCase()) {
	case 'button':
	case 'input':
	case 'select':
	case 'textarea':
		if(el.hasAttribute('disabled')) {
			return true;
		}
		/* falls through */
	default:
		if(nav.matchesSelector(el, 'fieldset[disabled] > :not(legend):not(:first-of-type) *')) {
			return true;
		}
	}
	return false;
}

// https://html.spec.whatwg.org/multipage/forms.html#constructing-form-data-set
function* getFormElements(form, submitter) {
	const controls = $Q('button, input, keygen, object, select, textarea', form);
	const fixName = name => name ? name.replace(/([^\r])\n|\r([^\n])/g, '$1\r\n$2') : '';

	constructSet:
	for(let i = 0, len = controls.length; i < len; ++i) {
		const field = controls[i];
		const tagName = field.tagName.toLowerCase();
		const type = field.getAttribute('type');
		const name = field.getAttribute('name');
		if(field.closest('datalist') || isFormElDisabled(field) ||
			field !== submitter && (
				tagName === 'button' ||
				tagName === 'input' && (type === 'submit' || type === 'reset' || type === 'button')
			) ||
			tagName === 'input' && (
				type === 'checkbox' && !field.checked ||
				type === 'radio' && !field.checked ||
				type === 'image' && !name
			) ||
			tagName === 'object'
		) {
			continue;
		}
		if(tagName === 'select') {
			const options = $Q('select > option, select > optgrout > option', field);
			for(let j = 0, jlen = options.length; j < jlen; ++j) {
				const option = options[j];
				if(option.selected && !isFormElDisabled(option)) {
					yield { type, el: field, name: fixName(name), value: option.value };
				}
			}
		} else if(tagName === 'input') {
			switch(type) {
			case 'image': throw new Error('input[type="image"] is not supported');
			case 'checkbox':
			case 'radio':
				yield { type, el: field, name: fixName(name), value: field.value || 'on' };
				continue constructSet;
			case 'file': {
				let img;
				if(field.files.length) {
					const { files } = field;
					for(let j = 0, jlen = files.length; j < jlen; ++j) {
						yield { name, type, el: field, value: files[j] };
					}
				} else if(field.obj && (img = field.obj.imgFile)) {
					yield {
						name,
						type,
						el    : field,
						value : new File([img.data], img.name, { type: img.type })
					};
				} else {
					yield {
						el    : field,
						name  : fixName(name),
						type  : 'application/octet-stream',
						value : new File([''], '')
					};
				}
				continue constructSet;
			}
			}
		}
		if(type === 'textarea') {
			yield { type, el: field, name: name || '', value: field.value };
		} else {
			yield { type, el: field, name: fixName(name), value: field.value };
		}
		const dirname = field.getAttribute('dirname');
		if(dirname) {
			yield {
				el    : field,
				name  : fixName(dirname),
				type  : 'direction',
				value : nav.matchesSelector(field, ':dir(rtl)') ? 'rtl' : 'ltr'
			};
		}
	}
}

function getUploadFunc() {
	$popup('upload', Lng.sending[lang] +
		'<br><progress id="de-uploadprogress" value="0" max="1" style="display: none; width: 200px;">' +
		'</progress><div style="display: none; font: bold 12px arial;">' +
		'<span></span> / <span></span> (<span></span>)</div>', true);
	let isInited = false;
	const beginTime = Date.now();
	const progress = $id('de-uploadprogress');
	const counterWrap = progress.nextElementSibling;
	const [counterEl, totalEl, speedEl] = [...counterWrap.children];
	return ({ total, loaded: i }) => {
		if(!isInited) {
			progress.setAttribute('max', total);
			$show(progress);
			totalEl.textContent = prettifySize(total);
			$show(counterWrap);
			isInited = true;
		}
		progress.value = i;
		counterEl.textContent = prettifySize(i);
		speedEl.textContent = `${ prettifySize(1e3 * i / (Date.now() - beginTime)) }/${ Lng.second[lang] }`;
	};
}

async function html5Submit(form, submitter, needProgress = false) {
	const data = new FormData();
	let hasFiles = false;
	for(const { name, value, type, el } of getFormElements(form, submitter)) {
		let val = value;
		if(name === 'de-file-txt') {
			continue;
		}
		if(type === 'file') {
			hasFiles = true;
			const fileName = value.name;
			const newFileName = !Cfg.removeFName || el.obj?.imgFile?.isConstName ? fileName : (
				Cfg.removeFName === 1 ? '' :
				// 5 years = 5*365*24*60*60*1e3 = 15768e7
				Date.now() - (Cfg.removeFName === 2 ? 0 : Math.round(Math.random() * 15768e7))
			) + '.' + getFileExt(fileName);
			const mime = value.type;
			if((Cfg.postSameImg || Cfg.removeEXIF) && (
				mime === 'image/jpeg' ||
				mime === 'image/png' ||
				mime === 'image/gif' ||
				mime === 'video/webm' && !aib.makaba)
			) {
				const cleanData = cleanFile((await readFile(value)).data, el.obj ? el.obj.extraFile : null);
				if(!cleanData) {
					return Promise.reject(new Error(Lng.fileCorrupt[lang] + ': ' + fileName));
				}
				val = new File(cleanData, newFileName, { type: mime });
			} else if(Cfg.removeFName) {
				val = new File([value], newFileName, { type: mime });
			}
		}
		data.append(name, val);
	}
	if(aib.sendHTML5Post) {
		return aib.sendHTML5Post(form, data, needProgress, hasFiles);
	}
	const ajaxParams = { data, method: 'POST' };
	if(needProgress && hasFiles) {
		ajaxParams.onprogress = getUploadFunc();
	}
	const url = form.action;
	return $ajax(url, ajaxParams).then(({ responseText: text }) => aib.jsonSubmit ? text :
		aib.stormWallFixSubmit ? aib.stormWallFixSubmit(url, text, ajaxParams) : $createDoc(text)
	).catch(err => Promise.reject(err));
}

function cleanFile(data, extraData) {
	const img = nav.getUnsafeUint8Array(data);
	const rand = Cfg.postSameImg && String(Math.round(Math.random() * 1e6));
	const rv = extraData ?
		rand ? [img, extraData, rand] : [img, extraData] :
		rand ? [img, rand] : [img];
	const rExif = !!Cfg.removeEXIF;
	if(!rand && !rExif && !extraData) {
		return rv;
	}
	let i, len, val, lIdx, jpgDat;
	const subarray = (begin, end) => nav.getUnsafeUint8Array(data, begin, end - begin);
	// JPG
	if(img[0] === 0xFF && img[1] === 0xD8) {
		let deep = 1;
		for(i = 2, len = img.length - 1, val = [null, null], lIdx = 2, jpgDat = null; i < len;) {
			if(img[i] === 0xFF) {
				if(rExif) {
					// Remove exif data
					if(!jpgDat && deep === 1) {
						if(img[i + 1] === 0xE1 && img[i + 4] === 0x45) {
							jpgDat = readExif(data, i + 10, (img[i + 2] << 8) + img[i + 3]);
						} else if(img[i + 1] === 0xE0 && img[i + 7] === 0x46 &&
							(img[i + 2] !== 0 || img[i + 3] >= 0x0E || img[i + 15] !== 0xFF)
						) {
							jpgDat = subarray(i + 11, i + 16);
						}
					}
					if(((img[i + 1] >> 4) === 0xE && img[i + 1] !== 0xEE) || img[i + 1] === 0xFE) {
						if(lIdx !== i) {
							val.push(subarray(lIdx, i));
						}
						i += 2 + (img[i + 2] << 8) + img[i + 3];
						lIdx = i;
						continue;
					}
				} else if(img[i + 1] === 0xD8) { // Jpg start marker [0xFFD8]
					deep++;
					i++;
					continue;
				}
				if(img[i + 1] === 0xD9 && --deep === 0) { // Jpg end marker [0xFFD9]
					break;
				}
			}
			i++;
		}
		i += 2;
		if(!extraData && len - i > 75) {
			i = len;
		}
		if(lIdx === 2) {
			// Remove data after the end marker
			if(i !== len) {
				rv[0] = nav.getUnsafeUint8Array(data, 0, i);
			}
			return rv;
		}
		val[0] = new Uint8Array([0xFF, 0xD8, 0xFF, 0xE0, 0, 0x0E, 0x4A, 0x46, 0x49, 0x46, 0, 1, 1]);
		val[1] = jpgDat || new Uint8Array([0, 0, 1, 0, 1]);
		val.push(subarray(lIdx, i));
		if(extraData) {
			val.push(extraData);
		}
		if(rand) {
			val.push(rand);
		}
		return val;
	}
	// PNG
	if(img[0] === 0x89 && img[1] === 0x50) {
		// Search for end marker [0x49454e44]
		for(i = 0, len = img.length - 7; i < len && (
			img[i] !== 0x49 ||
			img[i + 1] !== 0x45 ||
			img[i + 2] !== 0x4E ||
			img[i + 3] !== 0x44
		); ++i) /* empty */;
		i += 8;
		// Remove data after the end marker
		if(i !== len && (extraData || len - i <= 75)) {
			rv[0] = nav.getUnsafeUint8Array(data, 0, i);
		}
		return rv;
	}
	// GIF
	if(img[0] === 0x47 && img[1] === 0x49 && img[2] === 0x46) {
		// Search for last frame end marker [0x003B]
		i = len = img.length;
		while(i && img[--i - 1] !== 0x00 && img[i] !== 0x3B) /* empty */;
		// Remove data after the end marker
		if(++i !== len) {
			rv[0] = nav.getUnsafeUint8Array(data, 0, i);
		}
		return rv;
	}
	// WEBM
	if(img[0] === 0x1a && img[1] === 0x45 && img[2] === 0xDF && img[3] === 0xA3) {
		return new WebmParser(data).addWebmData(rand).getWebmData();
	}
	return null;
}

function readExif(data, off, len) {
	let xRes = 0;
	let yRes = 0;
	let resT = 0;
	const dv = nav.getUnsafeDataView(data, off);
	const le = String.fromCharCode(dv.getUint8(0), dv.getUint8(1)) !== 'MM';
	if(dv.getUint16(2, le) !== 0x2A) {
		return null;
	}
	const i = dv.getUint32(4, le);
	if(i > len) {
		return null;
	}
	for(let j = 0, tgLen = dv.getUint16(i, le); j < tgLen; ++j) {
		let dE = i + 2 + 12 * j;
		const tag = dv.getUint16(dE, le);
		if(tag === 0x0128) {
			resT = dv.getUint16(dE + 8, le) - 1;
		} else if(tag === 0x011A || tag === 0x011B) {
			dE = dv.getUint32(dE + 8, le);
			if(dE > len) {
				return null;
			}
			if(tag === 0x11A) {
				xRes = Math.round(dv.getUint32(dE, le) / dv.getUint32(dE + 4, le));
			} else {
				yRes = Math.round(dv.getUint32(dE, le) / dv.getUint32(dE + 4, le));
			}
		}
	}
	xRes = xRes || yRes;
	yRes = yRes || xRes;
	return new Uint8Array([resT & 0xFF, xRes >> 8, xRes & 0xFF, yRes >> 8, yRes & 0xFF]);
}

/* ==[ FormFile.js ]==========================================================================================
                                                 FILE INPUTS
                 image/video files in postform: preview, adding by url, drag-n-drop, deleting
=========================================================================================================== */

class Files {
	constructor(form, fileEl) {
		this.filesCount = 0;
		this.fileTr = fileEl.closest(aib.qFormTr);
		this.onchange = null;
		this._form = form;
		this._inputs = [];
		const els = $Q('input[type="file"]', this.fileTr);
		for(let i = 0, len = els.length; i < len; ++i) {
			this._inputs.push(new FileInput(this, els[i]));
		}
		this._files = [];
		this.hideEmpty();
	}
	get rarInput() {
		const value = $bEnd(docBody, '<input type="file" style="display: none;">');
		Object.defineProperty(this, 'rarInput', { value });
		return value;
	}
	get thumbsEl() {
		let value;
		if(aib.multiFile) {
			value = $aEnd(this.fileTr, '<div id="de-file-area"></div>');
		} else {
			value = this._form.txta.closest(aib.qFormTd).previousElementSibling;
			value.innerHTML = `<div style="display: none;">${ value.innerHTML }</div><div></div>`;
			value = value.lastChild;
		}
		Object.defineProperty(this, 'thumbsEl', { value });
		return value;
	}
	changeMode() {
		const isThumbMode = Cfg.fileInputs === 2;
		for(const inp of this._inputs) {
			inp.changeMode(isThumbMode);
		}
		this.hideEmpty();
	}
	clearInputs() {
		for(const inp of this._inputs) {
			inp.clearInp();
		}
		this.hideEmpty();
	}
	hideEmpty() {
		for(let els = this._inputs, i = els.length - 1; i > 0; --i) {
			const inp = els[i];
			if(inp.hasFile) {
				break;
			} else if(els[i - 1].hasFile) {
				inp.showInp();
				break;
			}
			inp.hideInp();
		}
	}
}

class FileInput {
	constructor(parent, el) {
		this.extraFile = null;
		this.hasFile = false;
		this.imgFile = null;
		this._input = el;
		this._isTxtEditable = false;
		this._isTxtEditName = false;
		this._mediaEl = null;
		this._parent = parent;
		this._rarMsg = null;
		this._spoilEl = $q(aib.qFormSpoiler, el.parentNode);
		this._thumb = null;
		this._utils = $add(`<div class="de-file-utils">
			<span class="de-file-btn-rar" title="${ Lng.helpAddFile[lang] }" style="display: none;">
				<svg><use xlink:href="#de-symbol-file-rar"/></svg></span>
			<input class="de-file-spoil" type="checkbox" title="` +
				`${ Lng.spoilFile[lang] }" style="display: none;">
			<span class="de-file-btn-txt" title="${ Lng.addManually[lang] }">
				<svg><use xlink:href="#de-symbol-file-txt"/></svg></span>
			<span class="de-file-btn-ren" title="${ Lng.renameFile[lang] }" style="display: none;">
				<svg><use xlink:href="#de-symbol-file-ren"/></svg></span>
			<span class="de-file-btn-del" title="${ Lng.removeFile[lang] }" style="display: none;">
				<svg><use xlink:href="#de-symbol-file-del"/></svg></span>
		</div>`);
		[this._btnRar, this._btnSpoil, this._btnTxt, this._btnRen, this._btnDel] = [...this._utils.children];
		this._utils.addEventListener('click', this);
		this._txtWrap = $add(`<span class="de-file-txt-wrap">
			<input type="text" name="de-file-txt" class="de-file-txt-input de-file-txt-noedit" title="` +
				`${ Lng.youCanDrag[lang] }" placeholder="${ Lng.dropFileHere[lang] }">
			<input type="button" class="de-file-txt-add" value="+" title="` +
				`${ Lng.add[lang] }" style="display: none;"></span>`);
		[this._txtInput, this._txtAddBtn] = [...this._txtWrap.children];
		this._txtWrap.addEventListener('click', this);
		this._toggleDragEvents(this._txtWrap, true);
		el.obj = this;
		el.classList.add('de-file-input');
		el.addEventListener('change', this);
		if(el.files?.[0]) {
			this._removeFile();
		}
		if(Cfg.fileInputs) {
			$hide(el);
			if(aib.multiFile) {
				this._input.setAttribute('multiple', true);
			}
		}
		if(FileInput._isThumbMode) {
			this._initThumbs();
		} else {
			this._input.before(this._txtWrap);
			this._input.after(this._utils);
		}
	}
	async addUrlFile(url, file = null) {
		if(!url) {
			return Promise.reject(new Error('URL is null'));
		}
		$popup('file-loading', Lng.loading[lang], true);
		return await ContentLoader.loadImgData(url, false).then(data => {
			if(file) {
				deWindow.URL.revokeObjectURL(url);
			}
			if(!data) {
				$popup('file-loading', Lng.cantLoad[lang] + ' URL: ' + url);
				return;
			}
			closePopup('file-loading');
			this._isTxtEditable = this._isTxtEditName = false;
			let name = file?.name || getFileName(url);
			const type = file?.type || getFileMime(name);
			if(!type || name.includes('?')) {
				let ext;
				switch((data[0] << 8) | data[1]) {
				case 0xFFD8: ext = 'jpg'; break;
				case 0x8950: ext = 'png'; break;
				case 0x4749: ext = 'gif'; break;
				case 0x1A45: ext = 'webm'; break;
				default: ext = '';
				}
				if(ext) {
					name = name.split('?').shift() + '.' + ext;
				}
			}
			this.imgFile = { data: data.buffer, name, type: type || getFileMime(name) };
			if(!file) {
				file = new Blob([data], { type: this.imgFile.type });
				file.name = name;
			}
			this._parent._files[this._parent._inputs.indexOf(this)] = file;
			DollchanAPI.notify('filechange', this._parent._files);
			if(FileInput._isThumbMode) {
				$hide(this._txtWrap);
			}
			this._onFileChange(true);
		});
	}
	changeMode(showThumbs) {
		$toggle(this._input, !Cfg.fileInputs);
		$toggleAttr(this._input, 'multiple', true, aib.multiFile && Cfg.fileInputs);
		$toggle(this._btnRen, Cfg.fileInputs && this.hasFile);
		if(!(showThumbs ^ !!this._thumb)) {
			return;
		}
		if(showThumbs) {
			this._initThumbs();
			return;
		}
		this._input.before(this._txtWrap);
		this._input.after(this._utils);
		$del($q('de-file-txt-area'));
		$show(this._parent.fileTr);
		$show(this._txtWrap);
		if(this._mediaEl) {
			deWindow.URL.revokeObjectURL(this._mediaEl.src);
		}
		this._toggleDragEvents(this._thumb, false);
		$del(this._thumb);
		this._thumb = this._mediaEl = null;
	}
	clearInp() {
		if(FileInput._isThumbMode) {
			this._thumb.classList.add('de-file-off');
			if(this._mediaEl) {
				deWindow.URL.revokeObjectURL(this._mediaEl.src);
				this._mediaEl.parentNode.title = Lng.youCanDrag[lang];
				this._mediaEl.remove();
				this._mediaEl = null;
			}
		}
		if(this._btnDel) {
			this._toggleDelBtn(false);
			$hide(this._btnSpoil);
			if(this._spoilEl) {
				this._spoilEl.checked = this._btnSpoil.checked = false;
			}
			$hide(this._btnRar);
			$hide(this._txtAddBtn);
			$del(this._rarMsg);
			if(FileInput._isThumbMode) {
				$hide(this._txtWrap);
			}
			this._txtInput.value = '';
			this._txtInput.classList.add('de-file-txt-noedit');
			this._txtInput.placeholder = Lng.dropFileHere[lang];
		}
		this.extraFile = this.imgFile = null;
		this._isTxtEditable = this._isTxtEditName = false;
		this._changeFilesCount(-1);
		this._removeFile();
	}
	handleEvent(e) {
		const el = e.target;
		const thumb = this._thumb;
		const isThumb = el === thumb || el.className === 'de-file-img';
		switch(e.type) {
		case 'change': {
			const inpArray = this._parent._inputs;
			const curInpIdx = inpArray.indexOf(this);
			const filesLen = el.files.length;
			if(filesLen > 1) {
				const allowedLen = Math.min(filesLen, inpArray.length - curInpIdx);
				let j = allowedLen;
				for(let i = 0; i < allowedLen; ++i) {
					FileInput._readDroppedFile(inpArray[curInpIdx + i], el.files[i]).then(() => {
						if(!--j) { // Clear original file input after all allowed files will be read.
							this._removeFileHelper();
						}
					});
					this._parent._files[curInpIdx + i] = el.files[i];
				}
			} else {
				if(filesLen > 0) {
					setTimeout(() => this._onFileChange(false), 20);
					this._parent._files[curInpIdx] = el.files[0];
				} else {
					this.clearInp();
					delete this._parent._files[curInpIdx];
				}
			}
			DollchanAPI.notify('filechange', this._parent._files);
			break;
		}
		case 'click': {
			const parent = el.parentNode;
			if(isThumb) {
				this._input.click();
			} else if(parent === this._btnDel) {
				this.clearInp();
				this._parent.hideEmpty();
				delete this._parent._files[this._parent._inputs.indexOf(this)];
				DollchanAPI.notify('filechange', this._parent._files);
			} else if(parent === this._btnRar) {
				this._addRarJpeg();
			} else if(parent === this._btnRen) {
				const isShow = this._isTxtEditName = !this._isTxtEditName;
				this._isTxtEditable = !this._isTxtEditable;
				if(FileInput._isThumbMode) {
					$toggle(this._txtWrap, isShow);
				}
				$toggle(this._txtAddBtn, isShow);
				this._txtInput.classList.toggle('de-file-txt-noedit', !isShow);
				if(isShow) {
					this._txtInput.focus();
				}
			} else if(parent === this._btnTxt) {
				this._toggleDelBtn(this._isTxtEditable = true);
				$show(this._txtAddBtn);
				if(FileInput._isThumbMode) {
					$toggle(this._txtWrap);
				}
				this._txtInput.classList.remove('de-file-txt-noedit');
				this._txtInput.placeholder = Lng.enterTheLink[lang];
				this._txtInput.focus();
			} else if(el === this._btnSpoil) {
				this._spoilEl.checked = this._btnSpoil.checked;
				return;
			} else if(el === this._txtAddBtn) {
				if(this._isTxtEditName) {
					if(FileInput._isThumbMode) {
						$hide(this._txtWrap);
					}
					$hide(this._txtAddBtn);
					this._txtInput.classList.add('de-file-txt-noedit');
					this._isTxtEditable = this._isTxtEditName = false;
					const newName = this._txtInput.value;
					if(!newName) {
						this._txtInput.value = this.imgFile ? this.imgFile.name : this._input.files[0].name;
						return;
					}
					if(this.imgFile) {
						this.imgFile.isConstName = true;
						this.imgFile.name = newName;
						if(FileInput._isThumbMode) {
							this._addThumbTitle(newName, this.imgFile.data.byteLength);
						}
						return;
					}
					const file = this._input.files[0];
					readFile(file).then(({ data }) => {
						this.imgFile = { data, name: newName, type: file.type, isConstName: true };
						this._removeFileHelper(); // Clear the original file
						if(FileInput._isThumbMode) {
							this._addThumbTitle(newName, data.byteLength);
						}
					});
					return;
				} else {
					this.addUrlFile(this._txtInput.value);
				}
			} else if(el === this._txtInput && !this._isTxtEditable) {
				this._input.click();
				this._txtInput.blur();
			}
			break;
		}
		case 'dragenter':
			if(isThumb) {
				thumb.classList.add('de-file-drag');
			}
			return;
		case 'dragleave':
			if(isThumb && el.classList.contains('de-file-img')) {
				thumb.classList.remove('de-file-drag');
			}
			return;
		case 'drop': {
			const dt = e.dataTransfer;
			if(!isThumb && el !== this._txtInput) {
				return;
			}
			const filesLen = dt.files.length;
			if(filesLen) {
				const inpArray = this._parent._inputs;
				const inpLen = inpArray.length;
				for(let i = inpArray.indexOf(this), j = 0; i < inpLen && j < filesLen; ++i, ++j) {
					FileInput._readDroppedFile(inpArray[i], dt.files[j]);
					this._parent._files[i] = dt.files[j];
				}
				DollchanAPI.notify('filechange', this._parent._files);
			} else {
				this.addUrlFile(dt.getData('text/plain'));
			}
			if(FileInput._isThumbMode) {
				setTimeout(() => thumb.classList.remove('de-file-drag'), 10);
			}
		}
		}
		e.preventDefault();
		e.stopPropagation();
	}
	hideInp() {
		if(FileInput._isThumbMode) {
			this._toggleDelBtn(false);
			$hide(this._thumb);
			$hide(this._txtWrap);
		}
		$hide(this._wrap);
	}
	showInp() {
		if(FileInput._isThumbMode) {
			$show(this._thumb);
		}
		$show(this._wrap);
	}

	static get _isThumbMode() {
		return Cfg.fileInputs === 2;
	}
	static _readDroppedFile(inputObj, file) {
		return readFile(file).then(({ data }) => {
			inputObj.imgFile = { data, name: file.name, type: file.type };
			inputObj.showInp();
			inputObj._onFileChange(true);
		});
	}
	get _wrap() {
		return aib.multiFile ? this._input.parentNode : this._input;
	}
	_addNewThumb(fileData, fileName, fileType, fileSize) {
		let el = this._thumb;
		el.classList.remove('de-file-off');
		el = el.firstChild.firstChild;
		el.title = `${ fileName }, ${ (fileSize / 1024).toFixed(2) }KB`;
		this._mediaEl = el = $aBegin(el, fileType.startsWith('video/') ?
			'<video class="de-file-img" loop autoplay muted src=""></video>' :
			'<img class="de-file-img" src="">');
		el.src = deWindow.URL.createObjectURL(new Blob([fileData]));
		if((el = el.nextSibling)) {
			deWindow.URL.revokeObjectURL(el.src);
			el.remove();
		}
	}
	_addRarJpeg() {
		const el = this._parent.rarInput;
		el.onchange = e => {
			$hide(this._btnRar);
			const myBtn = this._rarMsg = $aBegin(this._utils,
				'<span><svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg></span>');
			const file = e.target.files[0];
			readFile(file).then(({ data }) => {
				if(this._rarMsg === myBtn) {
					myBtn.className = 'de-file-rarmsg';
					const origFileName = this.imgFile ? this.imgFile.name : this._input.files[0].name;
					myBtn.title = origFileName + ' + ' + file.name;
					myBtn.textContent = getFileExt(origFileName) + ' + ' + getFileExt(file.name);
					this.extraFile = data;
				}
			});
		};
		el.click();
	}
	_addThumbTitle(name, size) {
		this._thumb.firstChild.firstChild.title = `${ name }, ${ (size / 1024).toFixed(2) }KB`;
	}
	_changeFilesCount(val) {
		this._parent.filesCount = Math.max(this._parent.filesCount + val, 0);
		if(aib.dobrochan) {
			$id('post_files_count').value = this._parent.filesCount + 1;
		}
	}
	_initThumbs() {
		const { fileTr } = this._parent;
		$hide(fileTr);
		$hide(this._txtWrap);
		const isTr = fileTr.tagName === 'TR';
		const txtArea = $q('.de-file-txt-area') || $bBegin(fileTr, isTr ?
			'<tr class="de-file-txt-area"><td class="postblock"></td><td></td></tr>' :
			'<div class="de-file-txt-area"></div>');
		(isTr ? txtArea.lastChild : txtArea).append(this._txtWrap);
		this._thumb = $bEnd(this._parent.thumbsEl,
			`<div class="de-file de-file-off"><div class="de-file-img"><div class="de-file-img" title="${
				Lng.youCanDrag[lang] }"></div></div></div>`);
		['click', 'dragenter'].forEach(e => this._thumb.addEventListener(e, this));
		this._thumb.append(this._utils);
		this._toggleDragEvents(this._thumb, true);
		if(this.hasFile) {
			this._showFileThumb();
		}
	}
	_onFileChange(hasImgFile) {
		this._txtInput.value = hasImgFile ? this.imgFile.name : this._input.files[0].name;
		if(!hasImgFile) {
			this.imgFile = null;
		}
		if(this._parent.onchange) {
			this._parent.onchange();
		}
		if(FileInput._isThumbMode) {
			this._showFileThumb();
		}
		if(this.hasFile) {
			this.extraFile = null;
		} else {
			this.hasFile = true;
			this._changeFilesCount(+1);
			this._toggleDelBtn(true);
			$hide(this._txtAddBtn);
			if(FileInput._isThumbMode) {
				$hide(this._txtWrap);
			}
			if(this._spoilEl) {
				this._btnSpoil.checked = this._spoilEl.checked;
				$show(this._btnSpoil);
			}
			this._txtInput.classList.add('de-file-txt-noedit');
			this._txtInput.placeholder = Lng.dropFileHere[lang];
		}
		this._parent.hideEmpty();
		if(!nav.isPresto && !aib._4chan &&
			/^image\/(?:png|jpeg)$/.test(hasImgFile ? this.imgFile.type : this._input.files[0].type)
		) {
			$del(this._rarMsg);
			$show(this._btnRar);
		}
	}
	_removeFile() {
		this._removeFileHelper();
		this.hasFile = false;
		if(this._parent._files) {
			delete this._parent._files[this._parent._inputs.indexOf(this)];
		}
	}
	_removeFileHelper() {
		const oldEl = this._input;
		const newEl = $aEnd(oldEl, oldEl.outerHTML);
		oldEl.removeEventListener('change', this);
		newEl.addEventListener('change', this);
		newEl.obj = this;
		this._input = newEl;
		oldEl.remove();
	}
	_showFileThumb() {
		const { imgFile } = this;
		if(imgFile) {
			this._addNewThumb(imgFile.data, imgFile.name, imgFile.type, imgFile.data.byteLength);
			return;
		}
		const file = this._input.files[0];
		if(file) {
			readFile(file).then(({ data }) => {
				if(this._input.files[0] === file) {
					this._addNewThumb(data, file.name, file.type, file.size);
				}
			});
		}
	}
	_toggleDelBtn(isShow) {
		$toggle(this._btnDel, isShow);
		$toggle(this._btnRen, Cfg.fileInputs && isShow && this.hasFile);
		$toggle(this._btnTxt, !isShow);
	}
	_toggleDragEvents(el, isAdd) {
		const name = isAdd ? 'addEventListener' : 'removeEventListener';
		el[name]('dragover', e => e.preventDefault());
		['dragenter', 'dragleave', 'drop'].forEach(e => el[name](e, this));
	}
}

/* ==[ FormCaptcha.js ]=======================================================================================
                                                    CAPTCHA
=========================================================================================================== */

class Captcha {
	constructor(el, initNum) {
		this.hasCaptcha = true;
		this.textEl = null;
		this.tNum = initNum;
		this.parentEl = nav.matchesSelector(el, aib.qFormTr) ? el : aib.getCapParent(el);
		this.isAdded = false;
		this.isSubmitWait = false;
		this._isRecap = !aib._02ch && !!$q('[id*="recaptcha"], [class*="recaptcha"]', this.parentEl);
		this._lastUpdate = null;
		this.originHTML = this.parentEl.innerHTML;
		$hide(this.parentEl);
		if(!this._isRecap) {
			this.parentEl.innerHTML = '';
		}
	}
	addCaptcha() {
		if(this.isAdded) { // Run this function only once
			return;
		}
		this.isAdded = true;
		if(!this._isRecap) {
			this.parentEl.innerHTML = this.originHTML;
			this.textEl = $q('input[type="text"][name*="aptcha"]', this.parentEl);
		} else {
			const el = $q('#g-recaptcha, .g-recaptcha');
			$replace(el, `<div id="g-recaptcha" class="g-recaptcha" data-sitekey="${
				el.getAttribute('data-sitekey') }"></div>`);
		}
		this.initCapPromise();
	}
	handleEvent(e) {
		switch(e.type) {
		case 'keypress': {
			if(!Cfg.captchaLang || e.which === 0) {
				return;
			}
			const ruUa = 'йцукенгшщзхъїфыівапролджэєячсмитьбюёґ';
			const en = 'qwertyuiop[]]assdfghjkl;\'\'zxcvbnm,.`\\';
			const code = e.charCode || e.keyCode;
			let i;
			let chr = String.fromCharCode(code).toLowerCase();
			if(Cfg.captchaLang === 1) {
				if(code < 0x0410 || code > 0x04FF || (i = ruUa.indexOf(chr)) === -1) {
					return;
				}
				chr = en[i];
			} else {
				if(code < 0x0021 || code > 0x007A || (i = en.indexOf(chr)) === -1) {
					return;
				}
				chr = ruUa[i];
			}
			insertText(e.target, chr);
			break;
		}
		case 'focus': this.updateOutdated();
		}
		e.preventDefault();
		e.stopPropagation();
	}
	initCapPromise() {
		const initPromise = aib.captchaInit ? aib.captchaInit(this) : null;
		if(initPromise) {
			initPromise.then(() => this.showCaptcha(), err => {
				if(err instanceof AjaxError) {
					this._setUpdateError(err);
				} else {
					this.hasCaptcha = false;
				}
			});
		} else if(this.hasCaptcha) {
			this.showCaptcha(true);
		}
	}
	initImage(img) {
		img.title = Lng.refresh[lang];
		img.alt = Lng.loading[lang];
		img.style.cssText = 'vertical-align: text-bottom; border: none; cursor: pointer;';
		img.onclick = () => this.refreshCaptcha(true);
	}
	initTextEl() {
		this.textEl.autocomplete = 'off';
		if(!aib.formHeaders && (aib.multiFile || Cfg.fileInputs !== 2)) {
			this.textEl.placeholder = Lng.cap[lang];
		}
		['keypress', 'focus'].forEach(e => this.textEl.addEventListener(e, this));
		this.textEl.onkeypress = null;
		this.textEl.onfocus = null;
	}
	showCaptcha(isUpdateImage = false) {
		if(!this.textEl) {
			$show(this.parentEl);
			if(aib.captchaUpdate) {
				aib.captchaUpdate(this, false);
			} else if(this._isRecap) {
				this._updateRecap();
			}
			return;
		}
		this.initTextEl();
		let img;
		if(this._isRecap || !(img = $q('img', this.parentEl))) {
			$show(this.parentEl);
			return;
		}
		this.initImage(img);
		const a = img.parentNode;
		if(a.tagName === 'A') {
			a.replaceWith(img);
		}
		if(isUpdateImage) {
			this.refreshCaptcha(false);
		} else {
			this._lastUpdate = Date.now();
		}
		$show(this.parentEl);
	}
	refreshCaptcha(isFocus, isErr = false, tNum = this.tNum) {
		if(!this.isAdded || tNum !== this.tNum) {
			this.tNum = tNum;
			this.isAdded = false;
			this.hasCaptcha = true;
			this.textEl = null;
			$hide(this.parentEl);
			this.addCaptcha();
			return;
		} else if(!this.hasCaptcha && !isErr) {
			return;
		}
		this._lastUpdate = Date.now();
		if(aib.captchaUpdate) {
			const updatePromise = aib.captchaUpdate(this, isErr);
			if(updatePromise) {
				updatePromise.then(() => this._updateTextEl(isFocus), err => this._setUpdateError(err));
			}
		} else if(this._isRecap) {
			this._updateRecap();
		} else if(this.textEl) {
			this._updateTextEl(isFocus);
			const img = $q('img', this.parentEl);
			if(!img) {
				return;
			}
			if(!aib.getCaptchaSrc) {
				img.click();
				return;
			}
			const src = img.getAttribute('src');
			if(!src) {
				return;
			}
			const newSrc = aib.getCaptchaSrc(src, tNum);
			img.src = '';
			img.src = newSrc;
			if(aib.stormWallFixCaptcha) {
				aib.stormWallFixCaptcha(newSrc, img);
			}
		}
	}
	updateHelper(url, fn) {
		if(aib._capUpdPromise) {
			aib._capUpdPromise.cancelPromise();
		}
		return (aib._capUpdPromise = $ajax(url).then(xhr => {
			aib._capUpdPromise = null;
			fn(xhr);
		}, err => {
			if(!(err instanceof CancelError)) {
				aib._capUpdPromise = null;
				return CancelablePromise.reject(err);
			}
		}));
	}
	updateOutdated() {
		if(this._lastUpdate && (Date.now() - this._lastUpdate > Cfg.capUpdTime * 1e3)) {
			this.refreshCaptcha(false);
		}
	}

	_setUpdateError(e) {
		if(e) {
			this.parentEl = e.toString();
			this.isAdded = false;
			this.parentEl.onclick = () => {
				this.parentEl.onclick = null;
				this.addCaptcha();
			};
			$show(this.parentEl);
		}
	}
	_updateRecap() {
		// EXCLUDED FROM FIREFOX EXTENSION - START
		const script = doc.createElement('script');
		script.type = 'text/javascript';
		script.src = aib.prot + '//www.google.com/recaptcha/api.js';
		doc.head.append(script);
		setTimeout(() => script.remove(), 1e5);
		// EXCLUDED FROM FIREFOX EXTENSION - END
	}
	_updateTextEl(isFocus) {
		if(this.textEl) {
			this.textEl.value = '';
			if(isFocus) {
				this.textEl.focus();
			}
		}
	}
}

/* ==[ Posts.js ]=============================================================================================
                                                    POSTS
=========================================================================================================== */

class AbstractPost {
	constructor(thr, num, isOp) {
		this.isOp = isOp;
		this.kid = null;
		this.num = num;
		this.ref = new RefMap(this);
		this.thr = thr;
		this._hasEvents = false;
		this._linkDelay = 0;
		this._menu = null;
		this._menuDelay = 0;
	}
	get btnFav() {
		const value = $q('.de-btn-fav, .de-btn-fav-sel', this.btns);
		Object.defineProperty(this, 'btnFav', { value });
		return value;
	}
	get btnHide() {
		const value = this.btns.firstChild;
		Object.defineProperty(this, 'btnHide', { value });
		return value;
	}
	get images() {
		const value = new PostImages(this);
		Object.defineProperty(this, 'images', { value });
		return value;
	}
	get mp3Obj() {
		const value = $bBegin(this.msg, '<div class="de-mp3"></div>');
		Object.defineProperty(this, 'mp3Obj', { value });
		return value;
	}
	* refLinks() {
		const links = $Q('a', this.msg);
		for(let lNum, i = 0, len = links.length; i < len; ++i) {
			const link = links[i];
			const tc = link.textContent;
			if(tc[0] !== '>' || tc[1] !== '>' || !(lNum = parseInt(tc.substr(2), 10))) {
				continue;
			}
			yield [link, lNum];
		}
	}
	get msg() {
		const value = $q(aib.qPostMsg, this.el);
		Object.defineProperty(this, 'msg', { value, configurable: true });
		return value;
	}
	get trunc() {
		let value = null;
		const el = aib.qTrunc && $q(aib.qTrunc, this.el);
		if(el && /long|full comment|gekürzt|слишком|длинн|мног|полн/i.test(el.textContent)) {
			value = el;
		}
		Object.defineProperty(this, 'trunc', { value, configurable: true });
		return value;
	}
	get videos() {
		const value = Cfg.embedYTube ? new Videos(this) : null;
		Object.defineProperty(this, 'videos', { value });
		return value;
	}
	addFuncs() {
		RefMap.updateRefMap(this, true);
		embedAudioLinks(this);
	}
	handleEvent(e) {
		let temp;
		let el = nav.fixEventEl(e.target);
		const { type } = e;
		const isOutEvent = type === 'mouseout';
		const isPview = this instanceof Pview;
		if(type === 'click') {
			switch(e.button) {
			case 0: break;
			case 1: e.stopPropagation(); // Skip the click on wheel button
				/* falls through */
			default: return;
			}
			if(this._menu) { // Hide the dropdown menu after the click on its option
				this._menu.removeMenu();
				this._menu = null;
			}
			switch(el.tagName) {
			case 'A':
				// Click on YouTube link - show/hide player or thumbnail
				if(el.classList.contains('de-video-link')) {
					this.videos.clickLink(el, Cfg.embedYTube);
					e.preventDefault();
					return;
				}
				// Check if the link is not an image container
				if(!(temp = el.firstElementChild) || temp.tagName !== 'IMG') {
					temp = el.parentNode;
					if(temp === this.trunc) { // Click on "truncated message" link
						this._getFullMsg(temp, false);
						e.preventDefault();
						e.stopPropagation();
					} else if(Cfg.insertNum && pr.form && (this._pref === temp || this._pref === el) &&
						!/Reply|Ответ/.test(el.textContent)
					) { // Click on post number link - show quick reply or redirect with an #anchor
						e.preventDefault();
						e.stopPropagation();
						if(!Cfg.showRepBtn) {
							quotedText = deWindow.getSelection().toString();
							pr.showQuickReply(isPview ? Pview.topParent : this, this.num, !isPview, false);
							quotedText = '';
						} else if(pr.isQuick || aib.t && pr.isHidden) {
							pr.showQuickReply(isPview ? Pview.topParent : this, this.num, false, true);
						} else if(aib.t) {
							const formText = pr.txta.value;
							const isOnNewLine = formText === '' || formText.slice(-1) === '\n';
							insertText(pr.txta, `>>${ this.num }${ isOnNewLine ? '\n' : '' }`);
						} else {
							deWindow.location.assign(el.href.replace(/#i/, '#'));
						}
					} else if((temp = el.textContent)[0] === '>' &&
						temp[1] === '>' && !temp[2].includes('/')
					) { // Click on >>link - scroll to the referenced post
						const post = pByNum.get(+temp.match(/\d+/));
						if(post) {
							post.selectAndScrollTo();
						}
					}
					return;
				}
				el = temp; // The link is an image container
				/* falls through */
			case 'IMG': // Click on attached image - expand/collapse
				if(el.classList.contains('de-video-thumb')) {
					if(Cfg.embedYTube === 1) {
						const { videos } = this;
						videos.currentLink.classList.add('de-current');
						videos.setPlayer(videos.playerInfo, el.classList.contains('de-ytube'));
						e.preventDefault();
					}
				} else if(Cfg.expandImgs !== 0) {
					this._clickImage(el, e);
				}
				return;
			case 'OBJECT':
			case 'VIDEO': // Click on attached video - expand/collapse
				if(Cfg.expandImgs !== 0 && !ExpandableImage.isControlClick(e)) {
					this._clickImage(el, e);
				}
				return;
			}
			if(aib.makaba) {
				// Makaba: Click on like/dislike elements
				let c = el.classList;
				if(c.contains('post__rate') || c[0] === 'like-div' || c[0] === 'dislike-div' ||
					(temp = el.parentNode) && (
						(c = temp.classList).contains('post__rate') ||
						c[0] === 'like-div' ||
						c[0] === 'dislike-div') ||
					(temp = temp.parentNode) && (
						(c = temp.className) === 'like-div' ||
						c === 'dislike-div')
				) {
					const task = temp.id.split('-')[0];
					const num = +temp.id.match(/\d+/);
					$ajax(`/api/${ task }?board=${ aib.b }&num=${ num }`).then(xhr => {
						const obj = JSON.parse(xhr.responseText);
						if(obj.Status !== 'OK') {
							$popup('err-2chlike', obj.Reason);
							return;
						}
						temp.classList.add(`${ task }-div-checked`, `post__rate_${ task }d`);
						const countEl = $q(`.${ task }-count, #${ task }-count${ num }`, temp);
						countEl.textContent = +countEl.textContent + 1;
					}, () => $popup('err-2chlike', Lng.noConnect[lang]));
				}
				// Makaba: Click on "truncated message" link
				if(el.classList.contains('expand-large-comment')) {
					this._getFullMsg(el, false);
					e.preventDefault();
					e.stopPropagation();
				}
			}
			// Click on post buttons
			switch(el.classList[0]) {
			case 'de-btn-expthr': this.thr.loadPosts('all'); return;
			case 'de-btn-fav': this.thr.toggleFavState(true, isPview ? this : null); return;
			case 'de-btn-fav-sel': this.thr.toggleFavState(false, isPview ? this : null); return;
			case 'de-btn-hide':
			case 'de-btn-hide-user':
			case 'de-btn-unhide':
			case 'de-btn-unhide-user': this.setUserVisib(!this.isHidden); return;
			case 'de-btn-img':
				quotedText = aib.getImgRealName(aib.getImgWrap(el));
				pr.showQuickReply(isPview ? Pview.topParent : this, this.num, !isPview, false);
				return;
			case 'de-btn-reply':
				pr.showQuickReply(isPview ? Pview.topParent : this, this.num, !isPview, false);
				quotedText = '';
				return;
			case 'de-btn-sage': Spells.addSpell(9, '', false); return;
			case 'de-btn-stick': this.toggleSticky(true); return;
			case 'de-btn-stick-on': this.toggleSticky(false); return;
			}
			return;
		}
		if(!this._hasEvents) {
			this._hasEvents = true;
			['click', 'mouseout'].forEach(e => this.el.addEventListener(e, this, true));
		}
		// Mouseover/mouseout on YouTube links
		if(el.classList.contains('de-video-link')) {
			if(aib.makaba && !el.videoInfo) {
				const origMsg = this.msg.firstChild;
				this.videos.updatePost($Q('.de-video-link', origMsg),
					$Q('.de-video-link', origMsg.nextSibling), true);
			}
			if(Cfg.embedYTube === 2) {
				this.videos.toggleFloatedThumb(el, isOutEvent);
			}
		}
		// Mouseover/mouseout on attached images/videos - update title
		if(!isOutEvent && Cfg.expandImgs && el.tagName === 'IMG' && !el.classList.contains('de-fullimg') &&
			(temp = this.images.getImageByEl(el)) && (temp.isImage || temp.isVideo)
		) {
			el.title = Cfg.expandImgs === 1 ? Lng.expImgInline[lang] : Lng.expImgFull[lang];
		}
		// Mouseover/mouseout on post buttons - update title, add/delete dropdown menu
		switch(el.classList[0]) {
		case 'de-btn-expthr':
			this.btns.title = Lng.expandThr[lang];
			this._addMenu(el, isOutEvent, arrTags(Lng.selExpandThr[lang],
				'<span class="de-menu-item" info="thr-exp">', '</span>'));
			return;
		case 'de-btn-fav': this.btns.title = Lng.addFav[lang]; return;
		case 'de-btn-fav-sel': this.btns.title = Lng.delFav[lang]; return;
		case 'de-btn-hide':
		case 'de-btn-hide-user':
		case 'de-btn-unhide':
		case 'de-btn-unhide-user':
			this.btns.title = this.isOp ? Lng.toggleThr[lang] : Lng.togglePost[lang];
			if(Cfg.showHideBtn === 1) {
				this._addMenu(el, isOutEvent,
					(this instanceof Pview ? pByNum.get(this.num) : this)._getMenuHide());
			}
			return;
		case 'de-btn-img':
			if(el.parentNode.className !== 'de-fullimg-info') {
				this._addMenu(el, isOutEvent, Menu.getMenuImg(el));
			}
			return;
		case 'de-btn-reply': {
			const title = this.btns.title = this.isOp ? Lng.replyToThr[lang] : Lng.replyToPost[lang];
			if(Cfg.showRepBtn === 1) {
				if(!isOutEvent) {
					quotedText = deWindow.getSelection().toString();
				}
				this._addMenu(el, isOutEvent,
					`<span class="de-menu-item" info="post-reply">${ title }</span>` +
					(aib.reportForm ? `<span class="de-menu-item" info="post-report">${
						this.num === this.thr.num ? Lng.reportThr[lang] : Lng.reportPost[lang] }</span>` : ''
					) +
					(Cfg.markMyPosts || Cfg.markMyLinks ? `<span class="de-menu-item" info="post-markmy">${
						MyPosts.has(this.num) ? Lng.deleteMyPost[lang] : Lng.markMyPost[lang] }</span>` : ''
					));
			}
			return;
		}
		case 'de-btn-sage': this.btns.title = 'SAGE'; return;
		case 'de-btn-stick': this.btns.title = Lng.attachPview[lang]; return;
		case 'de-post-btns': el.removeAttribute('title'); return;
		// Mouseover/mouseout on >>links - show/delete post previews
		default:
			if(!Cfg.linksNavig || el.tagName !== 'A' || el.isNotRefLink) {
				return;
			}
			if(!el.textContent.startsWith('>>')) {
				el.isNotRefLink = true;
				return;
			}
			// Donʼt use classList here, 'de-link-postref ' should be first
			el.className = 'de-link-postref ' + el.className;
			/* falls through */
		case 'de-link-backref':
		case 'de-link-postref':
			if(!Cfg.linksNavig) {
				return;
			}
			if(isOutEvent) { // Mouseout - We need to delete previews
				clearTimeout(this._linkDelay);
				if(!(aib.getPostOfEl(nav.fixEventEl(e.relatedTarget)) instanceof Pview) && Pview.top) {
					Pview.top.markToDel(); // If cursor is not over one of previews - delete all previews
				} else if(this.kid) {
					this.kid.markToDel(); // If cursor is over any preview - delete its kids
				}
			} else { // Mouseover - we need to show a preview for this link
				this._linkDelay = setTimeout(() => (this.kid = Pview.showPview(this, el)), Cfg.linksOver);
			}
			e.preventDefault();
			e.stopPropagation();
		}
	}
	toggleFavBtn(isEnable) {
		const elClass = isEnable ? 'de-btn-fav-sel' : 'de-btn-fav';
		if(this.btnFav) {
			this.btnFav.setAttribute('class', elClass);
		}
		if(this.thr.btnFav) {
			this.thr.btnFav.setAttribute('class', elClass);
		}
	}
	updateMsg(newMsg, sRunner) {
		let videoExt, videoLinks;
		const origMsg = aib.dobrochan ? this.msg.firstElementChild : this.msg;
		if(Cfg.embedYTube) {
			videoExt = $q('.de-video-ext', origMsg);
			videoLinks = $Q(':not(.de-video-ext) > .de-video-link', origMsg);
		}
		origMsg.replaceWith(newMsg);
		Object.defineProperties(this, {
			msg   : { configurable: true, value: newMsg },
			trunc : { configurable: true, value: null }
		});
		Post.Сontent.removeTempData(this);
		if(Cfg.embedYTube) {
			this.videos.updatePost(videoLinks, $Q('a[href*="youtu"], a[href*="vimeo.com"]', newMsg), false);
			if(videoExt) {
				newMsg.append(videoExt);
			}
		}
		this.addFuncs();
		sRunner.runSpells(this);
		embedPostMsgImages(this.el);
		if(this.isHidden) {
			this.hideContent(this.isHidden);
		}
		closePopup('load-fullmsg');
	}

	_addMenu(el, isOutEvent, html) {
		if(!this.menu || this.menu.parentEl !== el) {
			if(isOutEvent) {
				clearTimeout(this._menuDelay);
			} else {
				this._menuDelay = setTimeout(() => this._showMenu(el, html), Cfg.linksOver);
			}
		}
	}
	_clickImage(el, e) {
		const image = this.images.getImageByEl(el);
		if(!image || (!image.isImage && !image.isVideo)) {
			return;
		}
		image.expandImg((Cfg.expandImgs === 1) ^ e.ctrlKey, e);
		e.preventDefault();
		e.stopPropagation();
	}
	_clickMenu(el, e) {
		const isHide = !this.isHidden;
		const { num } = this;
		switch(el.getAttribute('info')) {
		case 'hide-sel': {
			let { startContainer: start, endContainer: end } = this._selRange;
			if(start.nodeType === 3) {
				start = start.parentNode;
			}
			if(end.nodeType === 3) {
				end = end.parentNode;
			}
			const inMsgSel = `${ aib.qPostMsg }, ${ aib.qPostMsg } *`;
			if((nav.matchesSelector(start, inMsgSel) && nav.matchesSelector(end, inMsgSel)) || (
				nav.matchesSelector(start, aib.qPostSubj) &&
				nav.matchesSelector(end, aib.qPostSubj)
			)) {
				if(this._selText.includes('\n')) {
					Spells.addSpell(1 /* #exp */,
						`/${ escapeRegExp(this._selText).replace(/\r?\n/g, '\\n') }/`, false);
				} else {
					Spells.addSpell(0 /* #words */, this._selText.toLowerCase(), false);
				}
			} else {
				dummy.innerHTML = '';
				dummy.append(this._selRange.cloneContents());
				Spells.addSpell(2 /* #exph */,
					`/${ escapeRegExp(dummy.innerHTML.replace(/^<[^>]+>|<[^>]+>$/g, '')) }/`, false);
			}
			return;
		}
		case 'hide-name': Spells.addSpell(6 /* #name */, this.posterName, false); return;
		case 'hide-trip': Spells.addSpell(7 /* #trip */, this.posterTrip, false); return;
		case 'hide-img': {
			const { weight: w, width: wi, height: h } = this.images.firstAttach;
			Spells.addSpell(8 /* #img */, [0, [w, w], [wi, wi, h, h]], false);
			return;
		}
		case 'hide-imgn':
			Spells.addSpell(3 /* #imgn */, `/${ escapeRegExp(this.images.firstAttach.name) }/`, false);
			return;
		case 'hide-ihash':
			ImagesHashStorage.getHash(this.images.firstAttach).then(hash => {
				if(hash !== -1) {
					Spells.addSpell(4 /* #ihash */, hash, false);
				}
			});
			return;
		case 'hide-noimg': Spells.addSpell(0x108 /* (#all & !#img) */, '', true); return;
		case 'hide-text': {
			const words = Post.getWrds(this.text);
			for(let post = Thread.first.op; post; post = post.next) {
				Post.findSameText(num, !isHide, words, post);
			}
			return;
		}
		case 'hide-notext': Spells.addSpell(0x10B /* (#all & !#tlen) */, '', true); return;
		case 'hide-refs':
			this.ref.toggleRef(isHide, true);
			this.setUserVisib(isHide);
			return;
		case 'hide-refsonly': Spells.addSpell(0 /* #words */, '>>' + num, false); return;
		case 'img-load': {
			$popup('file-loading', Lng.loading[lang], true);
			const url = el.href;
			ContentLoader.loadImgData(url, false).then(data => {
				if(!data) {
					$popup('file-loading', Lng.cantLoad[lang] + ' URL: ' + url);
					return;
				}
				closePopup('file-loading');
				downloadBlob(new Blob([data], { type: getFileMime(url) }), el.getAttribute('download'));
			});
			e.preventDefault();
			return;
		}
		case 'post-markmy': {
			const isAdd = !MyPosts.has(num);
			if(isAdd) {
				MyPosts.set(num, this.thr.num);
			} else {
				MyPosts.removeStorage(num);
			}
			this.el.classList.toggle('de-mypost', isAdd);
			$Q(`[de-form] ${ aib.qPostMsg } a[href$="${ aib.anchor + num }"]`).forEach(el => {
				const post = aib.getPostOfEl(el);
				if(post.el !== this.el) {
					el.classList.toggle('de-ref-you', isAdd);
					post.el.classList.toggle('de-mypost-reply', isAdd);
				}
			});
			return;
		}
		case 'post-reply': {
			const isPview = this instanceof Pview;
			pr.showQuickReply(isPview ? Pview.topParent : this, num, !isPview, false);
			quotedText = '';
			return;
		}
		case 'post-report': aib.reportForm(num, this.thr.num); return;
		case 'thr-exp': {
			const task = +el.textContent.match(/\d+/);
			this.thr.loadPosts(!task ? 'all' : task === 10 ? 'more' : task);
		}
		}
	}
	_getFullMsg(truncEl, isInit) {
		if(aib.deleteTruncMsg) {
			aib.deleteTruncMsg(this, truncEl, isInit);
			return;
		}
		if(!isInit) {
			$popup('load-fullmsg', Lng.loading[lang], true);
		}
		ajaxLoad(aib.getThrUrl(aib.b, this.tNum)).then(form => {
			let sourceEl;
			const maybeSpells = new Maybe(SpellsRunner);
			if(this.isOp) {
				sourceEl = form;
			} else {
				const posts = $Q(aib.qPost, form);
				for(let i = 0, len = posts.length; i < len; ++i) {
					const post = posts[i];
					if(this.num === aib.getPNum(post)) {
						sourceEl = post;
						break;
					}
				}
			}
			if(sourceEl) {
				this.updateMsg(aib.fixHTML(doc.adoptNode($q(aib.qPostMsg, sourceEl))), maybeSpells.value);
				truncEl.remove();
			}
			if(maybeSpells.hasValue) {
				maybeSpells.value.endSpells();
			}
		}, emptyFn);
	}
	_showMenu(el, html) {
		if(this._menu) {
			this._menu.removeMenu();
		}
		this._menu = new Menu(el, html, (el, e) =>
			(this instanceof Pview ? pByNum.get(this.num) || this : this)._clickMenu(el, e), false);
		this._menu.onremove = () => (this._menu = null);
	}
}

class Post extends AbstractPost {
	constructor(el, thr, num, count, isOp, prev) {
		super(thr, num, isOp);
		this.count = count;
		this.el = el;
		this.isDeleted = false;
		this.isHidden = false;
		this.isOmitted = false;
		this.isViewed = false;
		this.next = null;
		this.prev = prev;
		this.spellHidden = false;
		this.userToggled = false;
		this._selRange = null;
		this._selText = '';
		if(prev) {
			prev.next = this;
		}
		pByEl.set(el, this);
		pByNum.set(num, this);
		let isMyPost = MyPosts.has(num);
		if(isMyPost) {
			this.el.classList.add('de-mypost');
		} else if(localData && this.el.classList.contains('de-mypost')) {
			MyPosts.set(num, thr.num);
			isMyPost = true;
		}
		el.classList.add(isOp ? 'de-oppost' : 'de-reply');
		this.sage = aib.getSage(el);
		this.btns = $aEnd(this._pref = $q(aib.qPostRef, el),
			'<span class="de-post-btns">' + Post.getPostBtns(isOp, aib.t) +
			(this.sage ? '<svg class="de-btn-sage"><use xlink:href="#de-symbol-post-sage"/></svg>' : '') +
			(isOp ? '' : `<span class="de-post-counter">${ count + 1 }</span>`) +
			(isMyPost ? '<span class="de-post-counter-you">(You)</span>' : '') + '</span>');
		this.counterEl = isOp ? null : $q('.de-post-counter', this.btns);
		if(Cfg.expandTrunc && this.trunc) {
			this._getFullMsg(this.trunc, true);
		}
		el.addEventListener('mouseover', this, true);
	}
	static addMark(postEl, forced) {
		if(!doc.hidden && !forced) {
			Post.clearMarks();
		} else {
			if(!Post.hasNew) {
				Post.hasNew = true;
				doc.addEventListener('click', Post.clearMarks, true);
			}
			postEl.classList.add('de-new-post');
		}
	}
	static clearMarks() {
		if(Post.hasNew) {
			Post.hasNew = false;
			$Q('.de-new-post').forEach(el => el.classList.remove('de-new-post'));
			doc.removeEventListener('click', Post.clearMarks, true);
		}
	}
	static getPostBtns(isOp, noExpThr) {
		return '<svg class="de-btn-hide"><use class="de-btn-hide-use" xlink:href="#de-symbol-post-hide"/>' +
			'<use class="de-btn-unhide-use" xlink:href="#de-symbol-post-unhide"/></svg>' +
			'<svg class="de-btn-reply"><use xlink:href="#de-symbol-post-reply"/></svg>' + (isOp ?
			(noExpThr ? '' : '<svg class="de-btn-expthr"><use xlink:href="#de-symbol-post-expthr"/></svg>') +
				'<svg class="de-btn-fav"><use xlink:href="#de-symbol-post-fav"/></svg>' : '');
	}
	static findSameText(pNum, isHidden, words, curPost) {
		const curWords = Post.getWrds(curPost.text);
		const len = curWords.length;
		let i = words.length;
		const olen = i;
		let _olen = i;
		let n = 0;
		if(len < olen * 0.4 || len > olen * 3) {
			return;
		}
		while(i--) {
			if(olen > 6 && words[i].length < 3) {
				_olen--;
				continue;
			}
			let j = len;
			while(j--) {
				if(curWords[j] === words[i] || words[i].match(/>>\d+/) && curWords[j].match(/>>\d+/)) {
					n++;
				}
			}
		}
		if(n < _olen * 0.4 || len > _olen * 3) {
			return;
		}
		if(isHidden) {
			if(curPost.spellHidden) {
				Post.Note.reset();
			} else {
				curPost.setVisib(false);
			}
			if(curPost.userToggled) {
				HiddenPosts.removeStorage(curPost.num);
				curPost.userToggled = false;
			}
		} else {
			curPost.setUserVisib(true, true, 'similar to >>' + pNum);
		}
		return false;
	}
	static getWrds(text) {
		return text.replace(/\s+/g, ' ').replace(/[^a-zа-яё ]/ig, '').trim().substring(0, 800).split(' ');
	}
	static hideContent(headerEl, btnHide, isUser, isHide) {
		if(!isHide) {
			btnHide.setAttribute('class', isUser ? 'de-btn-hide-user' : 'de-btn-hide');
			$Q('.de-post-hiddencontent', headerEl.parentNode).forEach(
				el => el.classList.remove('de-post-hiddencontent'));
			return;
		}
		if(aib.t) {
			Thread.first.hidCounter++;
		}
		btnHide.setAttribute('class', isUser ? 'de-btn-unhide-user' : 'de-btn-unhide');
		if(headerEl) {
			for(let el = headerEl.nextElementSibling; el; el = el.nextElementSibling) {
				el.classList.add('de-post-hiddencontent');
			}
		}
	}
	get banned() {
		const value = aib.getBanId(this.el);
		Object.defineProperty(this, 'banned', { value, writable: true });
		return value;
	}
	get bottom() {
		return (this.isOp && this.isHidden ? this.thr.el.previousElementSibling : this.el)
			.getBoundingClientRect().bottom;
	}
	get headerEl() {
		return new Post.Сontent(this).headerEl;
	}
	get html() {
		return new Post.Сontent(this).html;
	}
	get nextInThread() {
		const post = this.next;
		return !post || post.count === 0 ? null : post;
	}
	get nextNotDeleted() {
		let post = this.nextInThread;
		while(post?.isDeleted) {
			post = post.nextInThread;
		}
		return post;
	}
	get note() {
		const value = new Post.Note(this);
		Object.defineProperty(this, 'note', { value });
		return value;
	}
	get posterName() {
		return new Post.Сontent(this).posterName;
	}
	get posterTrip() {
		return new Post.Сontent(this).posterTrip;
	}
	get subj() {
		return new Post.Сontent(this).subj;
	}
	get text() {
		return new Post.Сontent(this).text;
	}
	get title() {
		return new Post.Сontent(this).title;
	}
	get tNum() {
		return this.thr.num;
	}
	get top() {
		return (this.isOp && this.isHidden ? this.thr.el.previousElementSibling : this.el)
			.getBoundingClientRect().top;
	}
	get wrap() {
		return new Post.Сontent(this).wrap;
	}
	addFuncs() {
		super.addFuncs();
		if(isExpImg) {
			this.toggleImages(true, false);
		}
	}
	deleteCounter() {
		this.isDeleted = true;
		this.counterEl.textContent = Lng.deleted[lang];
		this.counterEl.classList.add('de-post-counter-deleted');
		this.el.classList.add('de-post-removed');
		this.wrap.classList.add('de-wrap-removed');
	}
	deletePost(isRemovePost) {
		if(isRemovePost) {
			this.wrap.remove();
			pByEl.delete(this.el);
			pByNum.delete(this.num);
			if(this.isHidden) {
				this.ref.unhideRef();
			}
			RefMap.updateRefMap(this, false);
			if((this.prev.next = this.next)) {
				this.next.prev = this.prev;
			}
			return;
		}
		this.deleteCounter();
		($q('input[type="checkbox"]', this.el) || {}).disabled = true;
	}
	getAdjacentVisPost(toUp) {
		let post = toUp ? this.prev : this.next;
		while(post) {
			if(post.thr.isHidden) {
				post = toUp ? post.thr.op.prev : post.thr.last.next;
			} else if(post.isHidden || post.isOmitted) {
				post = toUp ? post.prev : post.next;
			} else {
				return post;
			}
		}
		return null;
	}
	hideContent(needToHide) {
		if(this.isOp) {
			if(!aib.t) {
				$toggle(this.thr.el, !needToHide);
				$toggle(this.thr.btns, !needToHide);
			}
		} else {
			Post.hideContent(this.headerEl, this.btnHide, this.userToggled, needToHide);
		}
	}
	select() {
		if(this.isOp) {
			if(this.isHidden) {
				this.thr.el.previousElementSibling.classList.add('de-selected');
			}
			this.thr.el.classList.add('de-selected');
		} else {
			this.el.classList.add('de-selected');
		}
	}
	selectAndScrollTo(scrollNode = this.el) {
		scrollTo(0, deWindow.pageYOffset + scrollNode.getBoundingClientRect().top -
			Post.sizing.wHeight / 2 + scrollNode.clientHeight / 2);
		if(HotKeys.enabled) {
			if(HotKeys.cPost) {
				HotKeys.cPost.unselect();
			}
			HotKeys.cPost = this;
			HotKeys.lastPageOffset = deWindow.pageYOffset;
		} else {
			$q('.de-selected')?.unselect();
		}
		this.select();
	}
	setUserVisib(isHide, isSave = true, note = null) {
		this.userToggled = true;
		this.setVisib(isHide, note);
		if(this.isOp || this.isHidden === isHide) {
			const hideClass = isHide ? 'de-btn-unhide-user' : 'de-btn-hide-user';
			this.btnHide.setAttribute('class', hideClass);
			if(this.isOp) {
				this.thr.btnHide.setAttribute('class', hideClass);
			}
		}
		if(isSave) {
			const { num } = this;
			HiddenPosts.set(num, this.thr.num, isHide);
			if(this.isOp) {
				if(isHide) {
					HiddenThreads.set(num, num, this.title);
				} else {
					HiddenThreads.removeStorage(num);
				}
			}
			sendStorageEvent('__de-post', {
				hide   : isHide,
				brd    : aib.b,
				num,
				thrNum : this.thr.num,
				title  : this.isOp ? this.title : ''
			});
		}
		this.ref.toggleRef(isHide, false);
	}
	setVisib(isHide, note = null) {
		if(this.isHidden === isHide) {
			if(isHide && note) {
				this.note.set(note);
			}
			return;
		}
		if(this.isOp) {
			this.thr.isHidden = isHide;
		} else {
			if(Cfg.delHiddPost === 1 || Cfg.delHiddPost === 2) {
				this.wrap.classList.toggle('de-hidden', isHide);
			} else {
				this._pref.onmouseover = this._pref.onmouseout = !isHide ? null : e => {
					const yOffset = deWindow.pageYOffset;
					this.hideContent(e.type === 'mouseout');
					scrollTo(deWindow.pageXOffset, yOffset);
				};
			}
		}
		if(Cfg.strikeHidd) {
			setTimeout(() => this._strikePostNum(isHide), 50);
		}
		if(isHide) {
			this.note.set(note);
		} else {
			this.note.hideNote();
		}
		this.hideContent(this.isHidden = isHide);
	}
	spellHide(note) {
		this.spellHidden = true;
		if(!this.userToggled) {
			this.setVisib(true, note);
			this.ref.hideRef();
		}
	}
	spellUnhide() {
		this.spellHidden = false;
		if(!this.userToggled) {
			this.setVisib(false);
			this.ref.unhideRef();
		}
	}
	toggleImages(isExpand = !this.images.expanded, isExpandVideos = true) {
		for(const image of this.images) {
			if((image.isImage || isExpandVideos && image.isVideo) && (image.expanded ^ isExpand)) {
				if(isExpand) {
					image.expandImg(true, null);
				} else {
					image.collapseImg(null);
				}
			}
		}
	}
	unselect() {
		if(this.isOp) {
			$id('de-thr-hid-' + this.num)?.classList.remove('de-selected');
			this.thr.el.classList.remove('de-selected');
		} else {
			this.el.classList.remove('de-selected');
		}
	}

	_getMenuHide() {
		const item = name => `<span info="hide-${ name }" class="de-menu-item">${
			Lng.selHiderMenu[name][lang] }</span>`;
		const sel = deWindow.getSelection();
		const ssel = sel.toString().trim();
		if(ssel) {
			this._selText = ssel;
			this._selRange = sel.getRangeAt(0);
		}
		return `${ ssel ? item('sel') : '' }${
			this.posterName ? item('name') : '' }${
			this.posterTrip ? item('trip') : '' }${
			this.images.hasAttachments ? item('img') + item('imgn') + item('ihash') : item('noimg') }${
			this.text ? item('text') : item('notext') }${
			!Cfg.hideRefPsts && this.ref.hasMap ? item('refs') : '' }${
			item('refsonly') }`;
	}
	_strikePostNum(isHide) {
		const { num } = this;
		if(isHide) {
			Post.hiddenNums.add(+num);
		} else {
			Post.hiddenNums.delete(+num);
		}
		$Q(`[de-form] a[href$="${ aib.anchor + num }"]`).forEach(el => {
			el.classList.toggle('de-link-hid', isHide);
			if(Cfg.removeHidd && el.classList.contains('de-link-backref')) {
				const refMapEl = el.parentNode;
				if(isHide === !$q('.de-link-backref:not(.de-link-hid)', refMapEl)) {
					$toggle(refMapEl, !isHide);
				}
			}
		});
	}
}
Post.hasNew = false;
Post.hiddenNums = new Set();
Post.Сontent = class PostContent extends TemporaryContent {
	constructor(post) {
		super(post);
		if(this._isInited) {
			return;
		}
		this._isInited = true;
		this.el = post.el;
		this.post = post;
	}
	get headerEl() {
		const value = $q(aib.qPostHeader, this.el);
		Object.defineProperty(this, 'headerEl', { value });
		return value;
	}
	get html() {
		const value = this.el.outerHTML;
		Object.defineProperty(this, 'html', { value });
		return value;
	}
	get posterName() {
		const pName = $q(aib.qPostName, this.el);
		const value = pName ? pName.textContent.trim().replace(/\s/g, ' ') : '';
		Object.defineProperty(this, 'posterName', { value });
		return value;
	}
	get posterTrip() {
		const pTrip = $q(aib.qPostTrip, this.el);
		const value = pTrip ? pTrip.textContent : '';
		Object.defineProperty(this, 'posterTrip', { value });
		return value;
	}
	get subj() {
		const subj = $q(aib.qPostSubj, this.el);
		const value = subj ? subj.textContent : '';
		Object.defineProperty(this, 'subj', { value });
		return value;
	}
	get text() {
		const value = this.post.msg.innerHTML
			.replace(/<\/?(?:br|p|li)[^>]*?>/gi, '\n')
			.replace(/<[^>]+?>/g, '')
			.replaceAll('&gt;', '>')
			.replaceAll('&lt;', '<')
			.replaceAll('&nbsp;', '\u00A0').trim();
		Object.defineProperty(this, 'text', { value });
		return value;
	}
	get title() {
		const value = this.subj || this.text.substring(0, 70).replace(/\s+/g, ' ');
		Object.defineProperty(this, 'title', { value });
		return value;
	}
	get wrap() {
		const value = aib.getPostWrap(this.el, this.post.isOp);
		Object.defineProperty(this, 'wrap', { value });
		return value;
	}
};
Post.Note = class PostNote {
	constructor(post) {
		this.text = null;
		this._post = post;
		this.isHideThr = this._post.isOp && !aib.t; // Hide threads only on board
		if(!this.isHideThr) {
			// Create usual post note
			this._noteEl = this.textEl = $bEnd(post.btns, '<span class="de-post-note"></span>');
			return;
		}
		// Create a stub before the thread, that also hides thread by CSS
		this._noteEl = $bBegin(post.thr.el, `<div class="${ aib.cReply } de-thr-hid" id="de-thr-hid-${
			post.num }">${ Lng.hiddenThr[lang] }: <a href="#">№${ post.num }</a>
			<span class="de-thread-note"></span>
		</div>`);
		this._aEl = $q('a', this._noteEl);
		this.textEl = this._aEl.nextElementSibling;
	}
	hideNote() {
		if(this.isHideThr) {
			this._aEl.onmouseover = this._aEl.onmouseout = this._aEl.onclick = null;
		}
		$hide(this._noteEl);
	}
	reset() {
		this.text = null;
		if(this.isHideThr) {
			this.set(null);
		} else {
			this.hideNote();
		}
	}
	set(note) {
		this.text = note;
		let text;
		if(this.isHideThr) {
			this._aEl.onmouseover = this._aEl.onmouseout = e => this._post.hideContent(e.type === 'mouseout');
			this._aEl.onclick = e => {
				e.preventDefault();
				this._post.setUserVisib(!this._post.isHidden);
			};
			text = (this._post.title ? `(${ this._post.title }) ` : '') +
				(note ? `[autohide: ${ note }]` : '');
		} else {
			text = note ? `autohide: ${ note }` : '';
		}
		this.textEl.textContent = text;
		$show(this._noteEl);
	}
};
Post.sizing = {
	get dPxRatio() {
		const value = deWindow.devicePixelRatio || 1;
		Object.defineProperty(this, 'dPxRatio', { value });
		return value;
	},
	get wHeight() {
		const value = nav.viewportHeight();
		if(!this._enabled) {
			doc.defaultView.addEventListener('resize', this);
			this._enabled = true;
		}
		Object.defineProperties(this, {
			wHeight : { writable: true, configurable: true, value },
			wWidth  : { writable: true, configurable: true, value: nav.viewportWidth() }
		});
		return value;
	},
	get wWidth() {
		const value = nav.viewportWidth();
		if(!this._enabled) {
			doc.defaultView.addEventListener('resize', this);
			this._enabled = true;
		}
		Object.defineProperties(this, {
			wHeight : { writable: true, configurable: true, value: nav.viewportHeight() },
			wWidth  : { writable: true, configurable: true, value }
		});
		return value;
	},
	handleEvent() {
		this.wHeight = nav.viewportHeight();
		this.wWidth = nav.viewportWidth();
	},

	_enabled: false
};

/* ==[ PostPreviews.js ]======================================================================================
                                                POST PREVIEWS
=========================================================================================================== */

class Pview extends AbstractPost {
	constructor(parent, link, pNum, tNum) {
		super(parent.thr, pNum, pNum === tNum);
		this.isSticky = false;
		this.parent = parent;
		this.remoteThr = null;
		this.tNum = tNum;
		this._isCached = false;
		this._isLeft = false;
		this._isTop = false;
		this._link = link;
		this._newPos = null;
		this._offsetTop = 0;
		this._readDelay = 0;
		let post = pByNum.get(pNum);
		if(post && (!post.isOp || !(parent instanceof Pview) || !parent._isCached)) {
			this._buildPview(post);
			return;
		}
		this._isCached = true;
		this.board = link.pathname.match(/^\/?(.+\/)/)[1].replace(aib.res, '').replace(/\/$/, '');
		if(PviewsCache.has(this.board + tNum)) {
			post = PviewsCache.get(this.board + tNum).getPost(pNum);
			if(post) {
				this._buildPview(post);
			} else {
				this._showPview(this.el = $add(`<div class="${ aib.cReply } de-pview-info de-pview">
					${ Lng.postNotFound[lang] }</div>`));
			}
			return;
		}
		this._showPview(this.el = $add(`<div class="${ aib.cReply } de-pview-info de-pview">
			<svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg>${ Lng.loading[lang] }</div>`));

		// Get post preview via ajax. Always use DOM parsing.
		this._loadPromise = ajaxPostsLoad(this.board, tNum, false, false)
			.then(pBuilder => this._onload(pBuilder), err => this._onerror(err));
	}
	static get topParent() {
		return Pview.top ? Pview.top.parent : null;
	}
	static showPview(parent, link) {
		const tNum = +(link.pathname.match(/.+?\/[^\d]*(\d+)/) || [0, aib.getPostOfEl(link).tNum])[1];
		let pNum = link.textContent.match(/\d+/g);
		pNum = pNum ? +pNum.pop() : tNum;
		const isTop = !(parent instanceof Pview);
		let pv = isTop ? Pview.top : parent.kid;
		clearTimeout(Pview._delTO);
		if(pv && pv.num === pNum) {
			if(pv.kid) {
				pv.kid.deletePview();
			}
			if(pv._link !== link) {
				// If cursor hovers new link with the same number - move old preview here
				pv._setPosition(link, Cfg.animation);
				pv._link.classList.remove('de-link-parent');
				link.classList.add('de-link-parent');
				pv._link = link;
				if(pv.parent.num !== parent.num) {
					$Q('.de-link-pview', pv.el).forEach(el => el.classList.remove('de-link-pview'));
					Pview._markLink(pv.el, parent.num);
				}
			}
			pv.parent = parent;
		} else if(!Cfg.noNavigHidd || !pByNum.has(pNum) || !pByNum.get(pNum).hidden) {
			// Show new preview under new link
			if(pv) {
				pv.deletePview();
			}
			pv = new Pview(parent, link, pNum, tNum);
			if(isTop) {
				Pview.top = pv;
			}
		} else {
			return null;
		}
		return pv;
	}
	static updatePosition(scroll) {
		let pv = Pview.top;
		if(!pv) {
			return;
		}
		const { parent } = pv;
		if(parent.isOmitted) {
			pv.deletePview();
			return;
		}
		if(parent.thr.loadCount === 1 && !parent.el.contains(pv._link)) {
			const el = parent.ref.getElByNum(pv.num);
			if(!el) {
				pv.deletePview();
				return;
			}
			pv._link = el;
		}
		const cr = parent.isHidden ? parent : pv._link.getBoundingClientRect();
		const diff = pv._isTop ?
			pv._offsetTop - deWindow.pageYOffset - cr.bottom :
			pv._offsetTop + pv.el.offsetHeight - deWindow.pageYOffset - cr.top;
		if(Math.abs(diff) > 1) {
			if(scroll) {
				scrollTo(deWindow.pageXOffset, deWindow.pageYOffset - diff);
			}
			do {
				pv._offsetTop -= diff;
				pv.el.style.top = Math.max(pv._offsetTop, 0) + 'px';
			} while((pv = pv.kid));
		}
	}
	get stickBtn() {
		const value = $q('.de-btn-stick', this.el);
		Object.defineProperty(this, 'stickBtn', { value });
		return value;
	}
	deletePview() {
		this.parent.kid = null;
		this._link.classList.remove('de-link-parent');
		if(Pview.top === this) {
			Pview.top = null;
		}
		if(this._loadPromise) {
			this._loadPromise.cancelPromise();
			this._loadPromise = null;
		}
		let vPost = AttachedImage.viewer?.data.post;
		let pv = this;
		do {
			clearTimeout(pv._readDelay);
			if(vPost === pv) {
				AttachedImage.closeImg();
				vPost = null;
			}
			const { el } = pv;
			pByEl.delete(el);
			if(Cfg.animation) {
				$animate(el, 'de-pview-anim', true);
				el.style.animationName =
					`de-post-close-${ this._isTop ? 't' : 'b' }${ this._isLeft ? 'l' : 'r' }`;
			} else {
				el.remove();
			}
		} while((pv = pv.kid));
	}
	deleteNonSticky() {
		let lastSticky = null;
		let pv = this;
		do {
			if(pv.isSticky) {
				lastSticky = pv;
			}
		} while((pv = pv.kid));
		if(!lastSticky) {
			this.deletePview();
		} else if(lastSticky.kid) {
			lastSticky.kid.deletePview();
		}
	}
	handleEvent(e) {
		const pv = e.target;
		if(e.type === 'animationend' && pv.style.animationName) {
			pv.classList.remove('de-pview-anim');
			pv.style.cssText = this._newPos;
			this._newPos = null;
			$delAll('.de-css-move', doc.head);
			pv.removeEventListener('animationend', this);
			return;
		}
		let isOverEvent = false;
		checkMouse: do {
			switch(e.type) {
			case 'mouseover': isOverEvent = true; break;
			case 'mouseout': break;
			default: break checkMouse;
			}
			const el = nav.fixEventEl(e.relatedTarget);
			if(!el ||
				isOverEvent && (el.tagName !== 'A' || el.isNotRefLink) ||
				el !== this.el && !this.el.contains(el)
			) {
				if(isOverEvent) {
					this.mouseEnter();
				} else if(Pview.top) {
					Pview.top.markToDel();
				}
			}
		} while(false);
		if(!this.loading) {
			super.handleEvent(e);
		}
	}
	markToDel() {
		clearTimeout(Pview._delTO);
		Pview._delTO = setTimeout(() => this.deleteNonSticky(), Cfg.linksOut);
	}
	mouseEnter() {
		if(this.kid) {
			this.kid.markToDel();
		} else {
			clearTimeout(Pview._delTO);
		}
	}
	setUserVisib() {
		const post = pByNum.get(this.num);
		const isHide = post.isHidden;
		post.setUserVisib(!isHide);
		Pview.updatePosition(true);
		$Q(`.de-btn-pview-hide[de-num="${ this.num }"]`).forEach(el => {
			el.setAttribute('class',
				`${ isHide ? 'de-btn-hide-user' : 'de-btn-unhide-user' } de-btn-pview-hide`);
			el.parentNode.classList.toggle('de-post-hide', !isHide);
		});
	}
	toggleSticky(isEnabled) {
		this.stickBtn.setAttribute('class', isEnabled ? 'de-btn-stick-on' : 'de-btn-stick');
		this.isSticky = isEnabled;
	}

	static _markLink(el, num) {
		$Q(`a[href*="${ num }"]`, el).forEach(
			el => el.textContent.startsWith('>>' + num) && el.classList.add('de-link-pview'));
	}
	async _buildPview(post) {
		$del(this.el);
		const { num } = this;
		const pv = this.el = post.el.cloneNode(true);
		pByEl.set(pv, this);
		const isMyPost = MyPosts.has(num);
		pv.className = `${ aib.cReply } de-pview${
			post.isViewed ? ' de-viewed' : '' }${ isMyPost ? ' de-mypost' : '' }` +
			`${ post.el.classList.contains('de-mypost-reply') ? ' de-mypost-reply' : '' }`;
		$show(pv);
		$Q('.de-post-hiddencontent', pv).forEach(el => el.classList.remove('de-post-hiddencontent'));
		if(Cfg.linksNavig) {
			Pview._markLink(pv, this.parent.num);
		}
		this._pref = $q(aib.qPostRef, pv);
		this._link.classList.add('de-link-parent');
		const { isOp } = this;
		const isFav = isOp && (post.thr.isFav || (await readFavorites())[aib.host]?.[this.board]?.[num]);
		const isCached = post instanceof CacheItem;
		const pCountHtml = (post.isDeleted ? ` de-post-counter-deleted">${ Lng.deleted[lang] }</span>` :
			`">${ isOp ? '(OP)' : post.count + +!(aib.JsonBuilder && isCached) }</span>`) +
			(isMyPost ? '<span class="de-post-counter-you">(You)</span>' : '');
		const pText = '<svg class="de-btn-reply"><use xlink:href="#de-symbol-post-reply"/></svg>' +
			(isOp ? `<svg class="${ isFav ? 'de-btn-fav-sel' : 'de-btn-fav' }">` +
				'<use xlink:href="#de-symbol-post-fav"></use></svg>' : '') +
			(post.sage ? '<svg class="de-btn-sage"><use xlink:href="#de-symbol-post-sage"/></svg>' : '') +
			'<svg class="de-btn-stick"><use xlink:href="#de-symbol-post-stick"/></svg>' +
			'<span class="de-post-counter' + pCountHtml;
		if(isCached) {
			if(isOp) {
				this.remoteThr = post.thr;
			}
			this.btns = $aEnd(this._pref, `<span class="de-post-btns">${ pText }</span>`);
			embedAudioLinks(this);
			if(Cfg.embedYTube) {
				new VideosParser().parse(this).endParser();
			}
			embedPostMsgImages(pv);
			processImgInfoLinks(this);
		} else {
			const btnsEl = this.btns = $q('.de-post-btns', pv);
			$del($q('.de-post-counter', btnsEl));
			if(post.isHidden) {
				btnsEl.classList.add('de-post-hide');
			}
			btnsEl.innerHTML = `<svg class="de-btn-${ post.isHidden ? 'unhide' : 'hide' }${
				post.userToggled ? '-user' : '' } de-btn-pview-hide" de-num="${ num }"><!--
				--><use class="de-btn-hide-use" xlink:href="#de-symbol-post-hide"/><!--
				--><use class="de-btn-unhide-use" xlink:href="#de-symbol-post-unhide"/></svg>${ pText }`;
			$delAll(`${ !aib.t && isOp ? aib.qOmitted + ', ' : '' }.de-fullimg-wrap, .de-fullimg-after`, pv);
			$Q(aib.qPostImg, pv).forEach(el => $show(el.parentNode));
			const link = $q('.de-link-parent', pv);
			if(link) {
				link.classList.remove('de-link-parent');
			}
			if(Cfg.embedYTube && post.videos.hasLinks) {
				if(post.videos.playerInfo !== null) {
					Object.defineProperty(this, 'videos',
						{ value: new Videos(this, $q('.de-video-obj', pv), post.videos.playerInfo) });
				}
				this.videos.updatePost($Q('.de-video-link', post.el), $Q('.de-video-link', pv), true);
			}
			if(Cfg.addImgs) {
				$Q('.de-img-embed', pv).forEach($show);
			}
			if(Cfg.markViewed) {
				this._readDelay = setTimeout(post => {
					if(!post.isViewed) {
						post.el.classList.add('de-viewed');
						post.isViewed = true;
					}
					const arr = (sesStorage['de-viewed'] || '').split(',');
					arr.push(post.num);
					sesStorage['de-viewed'] = arr;
				}, post.text.length > 100 ? 2e3 : 500, post);
			}
		}
		pv.addEventListener('click', this, true);
		this._showPview(pv);
	}
	_onerror(err) {
		if(!(err instanceof CancelError)) {
			this.el.innerHTML = (err instanceof AjaxError) && err.code === 404 ?
				Lng.postNotFound[lang] : getErrorMessage(err);
		}
	}
	_onload(pBuilder) {
		const { board } = this;
		const { num, tNum } = this.parent;
		const post = new PviewsCache(pBuilder, board, this.tNum).getPost(this.num);
		if(post && (aib.b !== board || !post.ref.hasMap || !post.ref.has(num))) {
			(post.ref.hasMap ? $q('.de-refmap', post.el) : $aEnd(post.msg, '<div class="de-refmap"></div>'))
				.insertAdjacentHTML('afterbegin', `<a class="de-link-backref" href="${
					aib.getThrUrl(board, tNum) + aib.anchor + num }">&gt;&gt;${
					aib.b === board ? '' : `/${ aib.b }/` }${ num }</a><span class="de-refcomma">, </span>`);
		}
		if(post) {
			this._buildPview(post);
		} else {
			this.el.innerHTML = Lng.postNotFound[lang];
		}
	}
	_setPosition(link, isAnim) {
		let oldCSS;
		const cr = link.getBoundingClientRect();
		const offX = cr.left + deWindow.pageXOffset + cr.width / 2;
		const offY = cr.top;
		const bWidth = nav.viewportWidth();
		const isLeft = offX < bWidth / 2;
		const pv = this.el;
		const temp = isLeft ? offX : offX - Math.min(parseInt(pv.offsetWidth, 10), offX - 10);
		const lmw = `max-width:${ bWidth - temp - 10 }px; left:${ temp }px;`;
		const { style } = pv;
		if(isAnim) {
			oldCSS = style.cssText;
		}
		style.cssText = (isAnim ? 'opacity: 0; ' : '') + lmw;
		let top = pv.offsetHeight;
		const isTop = offY + top + cr.height < nav.viewportHeight() || offY - top < 5;
		top = deWindow.pageYOffset + (isTop ? offY + cr.height : offY - top);
		this._offsetTop = top;
		this._isLeft = isLeft;
		this._isTop = isTop;
		if(!isAnim) {
			style.top = top + 'px';
			return;
		}
		const uId = 'de-movecss-' + Math.round(Math.random() * 1e3);
		$css(`@keyframes ${ uId } { to { ${ lmw } top:${ top }px; } }`).className = 'de-css-move';
		if(this._newPos) {
			style.cssText = this._newPos;
			pv.removeEventListener('animationend', this);
		} else {
			style.cssText = oldCSS;
		}
		this._newPos = `${ lmw } top:${ top }px;`;
		pv.addEventListener('animationend', this);
		pv.classList.add('de-pview-anim');
		style.animationName = uId;
	}
	_showMenu(el, html) {
		super._showMenu(el, html);
		this._menu.onover = () => this.mouseEnter();
		this._menu.onout = () => Pview.top.markToDel();
	}
	_showPview(el) {
		['mouseover', 'mouseout'].forEach(e => el.addEventListener(e, this, true));
		this.thr.form.el.append(el);
		this._setPosition(this._link, false);
		if(Cfg.animation) {
			el.addEventListener('animationend', function aEvent() {
				el.removeEventListener('animationend', aEvent);
				el.classList.remove('de-pview-anim');
				el.style.animationName = '';
			});
			el.classList.add('de-pview-anim');
			el.style.animationName = `de-post-open-${ this._isTop ? 't' : 'b' }${ this._isLeft ? 'l' : 'r' }`;
		}
	}
}
Pview.top = null;
Pview._delTO = null;

class CacheItem {
	constructor(pBuilder, thrUrl, count) {
		this._pBuilder = pBuilder;
		this._thrUrl = thrUrl;
		this.count = count;
		this.isDeleted = false;
		this.isInited = false;
		this.isOp = count === 0;
		this.isViewed = false;
	}
	* refLinks() {
		yield* this._pBuilder.getRefLinks(this.count, this._thrUrl);
	}
	get msg() {
		const value = $q(aib.qPostMsg, this.el);
		Object.defineProperty(this, 'msg', { value });
		return value;
	}
	get ref() {
		const value = new RefMap(this);
		Object.defineProperty(this, 'ref', { value });
		return value;
	}
	get sage() {
		const value = aib.getSage(this.el);
		Object.defineProperty(this, 'sage', { value });
		return value;
	}
	get title() {
		return new Post.Сontent(this).title;
	}
	get el() {
		const value = this.isOp ? this._pBuilder.getOpEl() : this._pBuilder.getPostEl(this.count - 1);
		Object.defineProperty(this, 'el', { value: doc.adoptNode(value) });
		return value;
	}
	get thr() {
		let value = null;
		if(this.isOp) {
			const pcount = this._pBuilder.length;
			value = { lastNum: this._pBuilder.getPNum(pcount - 1), pcount };
			Object.defineProperty(value, 'title', { get: () => this.title });
		}
		Object.defineProperty(this, 'thr', { value });
		return value;
	}
}

class PviewsCache extends TemporaryContent {
	constructor(pBuilder, board, tNum) {
		super(board + tNum);
		if(this._isInited) {
			return;
		}
		this._isInited = true;
		const lPByNum = new Map();
		const thrUrl = aib.getThrUrl(board, tNum);
		lPByNum.set(tNum, new CacheItem(pBuilder, thrUrl, 0));
		for(let i = 0; i < pBuilder.length; ++i) {
			lPByNum.set(pBuilder.getPNum(i), new CacheItem(pBuilder, thrUrl, i + 1));
		}
		DelForm.tNums.add(tNum);
		this._b = board;
		this._posts = lPByNum;
		if(Cfg.linksNavig) {
			RefMap.gen(lPByNum);
		}
	}
	getPost(num) {
		const post = this._posts.get(num);
		if(post && !post.isInited) {
			if(this._b === aib.b && pByNum.has(num)) {
				post.ref.makeUnion(pByNum.get(num).ref);
			}
			if(post.ref.hasMap) {
				post.ref.initPostRef(post._thrUrl,
					Cfg.strikeHidd && Post.hiddenNums.size ? Post.hiddenNums : null);
			}
			post.isInited = true;
		}
		return post;
	}
}
PviewsCache.purgeSecs = 3e5;

/* ==[ PostImages.js ]========================================================================================
                                                    IMAGES
               images expanding (in post / by center), navigate buttons, image-links embedding
=========================================================================================================== */

// Navigation buttons for expanding of images/videos by center
class ImagesNavigBtns {
	constructor(viewerObj) {
		const btns = $bEnd(docBody, `<div style="display: none;">
			<div id="de-img-btn-prev" class="de-img-btn" de-title="${ Lng.prevImg[lang] }">
				<svg><use xlink:href="#de-symbol-img-btn-arrow"/></svg></div>
			<div id="de-img-btn-next" class="de-img-btn" de-title="${ Lng.nextImg[lang] }">
				<svg><use xlink:href="#de-symbol-img-btn-arrow"/></svg></div>
			<div id="de-img-btn-auto" class="de-img-btn de-img-btn-none" title="${ Lng.autoPlayOn[lang] }">
				<svg><use xlink:href="#de-symbol-img-btn-auto"/></svg></div>
			<div id="de-img-btn-rotate" class="de-img-btn" title="${ Lng.rotateImg[lang] }">
				<svg><use xlink:href="#de-symbol-img-btn-rotate"/></svg></div></div>`);
		[this.prevBtn, this.nextBtn, this.autoBtn] = [...btns.children];
		this._btns = btns;
		this._btnsStyle = btns.style;
		this._hideTmt = 0;
		this._isHidden = true;
		this._oldX = -1;
		this._oldY = -1;
		this._viewer = viewerObj;
		doc.defaultView.addEventListener('mousemove', this);
		btns.addEventListener('mouseover', this);
	}
	handleEvent(e) {
		switch(e.type) {
		case 'mousemove': {
			const { clientX: curX, clientY: curY } = e;
			if(this._oldX !== curX || this._oldY !== curY) {
				this._oldX = curX;
				this._oldY = curY;
				this.showBtns();
			}
			return;
		}
		case 'mouseover':
			if(!this.hasEvents) {
				this.hasEvents = true;
				['mouseout', 'click'].forEach(e => this._btns.addEventListener(e, this));
			}
			if(!this._isHidden) {
				clearTimeout(this._hideTmt);
				KeyEditListener.setTitle(this.prevBtn, 4);
				KeyEditListener.setTitle(this.nextBtn, 17);
			}
			return;
		case 'mouseout': this._setHideTmt(); return;
		case 'click': {
			const parent = e.target.parentNode;
			const viewer = this._viewer;
			switch(parent.id) {
			case 'de-img-btn-next': viewer.navigate(true); return;
			case 'de-img-btn-prev': viewer.navigate(false); return;
			case 'de-img-btn-rotate': viewer.rotateView(true); return;
			case 'de-img-btn-auto':
				viewer.isAutoPlay = !viewer.isAutoPlay;
				this.autoBtn.title = viewer.isAutoPlay ? Lng.autoPlayOff[lang] : Lng.autoPlayOn[lang];
				viewer.toggleVideoLoop();
				parent.classList.toggle('de-img-btn-auto-on');
			}
		}
		}
	}
	hideBtns() {
		this._btnsStyle.display = 'none';
		this._isHidden = true;
		this._oldX = this._oldY = -1;
	}
	removeBtns() {
		this._btns.remove();
		doc.defaultView.removeEventListener('mousemove', this);
		clearTimeout(this._hideTmt);
	}
	showBtns() {
		if(this._isHidden) {
			this._btnsStyle.removeProperty('display');
			this._isHidden = false;
			this._setHideTmt();
		}
	}

	_setHideTmt() {
		clearTimeout(this._hideTmt);
		this._hideTmt = setTimeout(() => this.hideBtns(), 2e3);
	}
}

// Expanding of images/videos BY CENTER: resizing, moving, opening, closing
class ImagesViewer {
	constructor(data) {
		this.data = null;
		this.isAutoPlay = false;
		this._data = null;
		this._elStyle = null;
		this._fullEl = null;
		this._height = 0;
		this._minSize = 0;
		this._moved = false;
		this._oldL = 0;
		this._oldT = 0;
		this._oldX = 0;
		this._oldY = 0;
		this._parentEl = null;
		this._width = 0;
		this._showFullImg(data);
	}
	closeImgViewer(e) {
		if($hasProp(this, '_btns')) {
			this._btns.removeBtns();
		}
		this._removeFullImg(e);
	}
	handleEvent(e) {
		switch(e.type) {
		case 'mousedown':
			if(this.data.isVideo && ExpandableImage.isControlClick(e)) {
				return;
			}
			this._oldX = e.clientX;
			this._oldY = e.clientY;
			['mousemove', 'mouseup'].forEach(e => docBody.addEventListener(e, this, true));
			break;
		case 'mousemove': {
			const { clientX: curX, clientY: curY } = e;
			if(curX !== this._oldX || curY !== this._oldY) {
				this._oldL = parseInt(this._elStyle.left, 10) + curX - this._oldX;
				this._elStyle.left = this._oldL + 'px';
				this._oldT = parseInt(this._elStyle.top, 10) + curY - this._oldY;
				this._elStyle.top = this._oldT + 'px';
				this._oldX = curX;
				this._oldY = curY;
				this._moved = true;
			}
			return;
		}
		case 'mouseup':
			['mousemove', 'mouseup'].forEach(e => docBody.removeEventListener(e, this, true));
			return;
		case 'click': {
			const el = e.target;
			if(this.data.isVideo && ExpandableImage.isControlClick(e) ||
				el.tagName !== 'IMG' &&
				el.tagName !== 'VIDEO' &&
				!el.classList.contains('de-fullimg-wrap') &&
				!el.classList.contains('de-fullimg-wrap-link') &&
				!el.classList.contains('de-fullimg-video-hack') &&
				el.className !== 'de-fullimg-load'
			) {
				return;
			}
			if(e.button === 0) {
				if(this._moved) {
					this._moved = false;
				} else {
					this.closeImgViewer(e);
					AttachedImage.viewer = null;
				}
				e.stopPropagation();
				break;
			}
			return;
		}
		case 'mousewheel':
			this._handleWheelEvent(e.clientX, e.clientY,
				-1 / 40 * ('wheelDeltaY' in e ? e.wheelDeltaY : e.wheelDelta));
			break;
		default: // 'wheel' event
			this._handleWheelEvent(e.clientX, e.clientY, e.deltaY);
		}
		e.preventDefault();
	}
	navigate(isForward, isVideoOnly = false) {
		let { data } = this;
		data.cancelWebmLoad(this._fullEl);
		do {
			data = data.getFollowImg(isForward);
		} while(data && (!data.isVideo && !data.isImage || isVideoOnly && data.isImage));
		if(data) {
			this.updateImgViewer(data, true, null);
			data.post.selectAndScrollTo(data.post.images.first.el);
		}
	}
	rotateView(isNextAngle) {
		if(isNextAngle) {
			this.data.rotate += this.data.rotate === 270 ? -270 : 90;
		}
		const angle = this.data.rotate;
		const isVert = angle === 90 || angle === 270;
		const img = $q('img, video', this._fullEl);
		img.style.transform = `rotate(${ angle }deg)${
			angle === 90 ? ' translateY(-100%)' : angle === 270 ? ' translateX(-100%)' : '' }`;
		img.classList.toggle('de-fullimg-rotated', isVert);
		img.style.height = `${ (isVert ? this._height / this._width : 1) * 100 }%`;
		if(this.data.isVideo && nav.firefoxVer >= 59) {
			img.previousElementSibling.style =
				(isVert ? 'width: calc(100% - 40px); height: 100%; ' : '') +
				(angle === 90 ? 'right: 0; ' : '') +
				(angle === 180 ? 'bottom: 0;' : '');
		}
		if(isNextAngle || angle !== 180) {
			this._rotateFullImg(this._fullEl);
		}
	}
	toggleVideoLoop() {
		if(this.data.isVideo) {
			$toggleAttr($q('video', this._fullEl), 'loop', '', !this.isAutoPlay);
		}
	}
	updateImgViewer(data, showButtons, e) {
		this._removeFullImg(e);
		this._showFullImg(data, showButtons);
	}

	get _btns() {
		const value = new ImagesNavigBtns(this);
		Object.defineProperty(this, '_btns', { value });
		return value;
	}
	get _zoomFactor() {
		const value = 1 + (Cfg.zoomFactor / 100);
		Object.defineProperty(this, '_zoomFactor', { value });
		return value;
	}
	_handleWheelEvent(clientX, clientY, delta) {
		if(delta === 0) {
			return;
		}
		let width, height;
		const { _width: oldW, _height: oldH } = this;
		if(delta > 0) {
			width = oldW / this._zoomFactor;
			height = oldH / this._zoomFactor;
			if(width <= this._minSize && height <= this._minSize) {
				return;
			}
		} else {
			width = oldW * this._zoomFactor;
			height = oldH * this._zoomFactor;
		}
		this._width = width;
		this._height = height;
		this._elStyle.width = width + 'px';
		this._elStyle.height = height + 'px';
		this._oldL = parseInt(clientX - (width / oldW) * (clientX - this._oldL), 10);
		this._elStyle.left = this._oldL + 'px';
		this._oldT = parseInt(clientY - (height / oldH) * (clientY - this._oldT), 10);
		this._elStyle.top = this._oldT + 'px';
	}
	_removeFullImg(e) {
		const { data } = this;
		data.cancelWebmLoad(this._fullEl);
		if(data.inPview && data.post.isSticky) {
			data.post.toggleSticky(false);
		}
		this._parentEl.remove();
		if(e && data.inPview) {
			data.sendCloseEvent(e, false);
		}
	}
	_resizeFullImg(el) {
		if(el !== this._fullEl) {
			return;
		}
		let [width, height, minSize] = this.data.computeFullSize();
		this._minSize = minSize ? minSize / this._zoomFactor : Cfg.minImgSize;
		if(Post.sizing.wWidth - this._oldL - this._width < 5 ||
			Post.sizing.wHeight - this._oldT - this._height < 5
		) {
			return;
		}
		const cPointX = this._oldL + this._width / 2;
		const cPointY = this._oldT + this._height / 2;
		const maxWidth = (Post.sizing.wWidth - cPointX - 2) * 2;
		const maxHeight = (Post.sizing.wHeight - cPointY - 2) * 2;
		if(width > maxWidth || height > maxHeight) {
			const ar = width / height;
			if(ar > maxWidth / maxHeight) {
				width = maxWidth;
				height = width / ar;
			} else {
				height = maxHeight;
				width = height * ar;
			}
			if(minSize && width < minSize || height < minSize) {
				this._minSize = Math.max(width, height);
			}
		}
		this._width = width;
		this._height = height;
		this._elStyle.width = width + 'px';
		this._elStyle.height = height + 'px';
		this._elStyle.left = `${ this._oldL = parseInt(cPointX - width / 2, 10) }px`;
		this._elStyle.top = `${ this._oldT = parseInt(cPointY - height / 2, 10) }px`;
	}
	_rotateFullImg(el) {
		if(el !== this._fullEl) {
			return;
		}
		const { _width, _height } = this;
		this._width = _height;
		this._height = _width;
		this._elStyle.width = _height + 'px';
		this._elStyle.height = _width + 'px';
		const halfWidth = _width / 2;
		const halfHeight = _height / 2;
		this._elStyle.left = `${ this._oldL = parseInt(this._oldL + halfWidth - halfHeight, 10) }px`;
		this._elStyle.top = `${ this._oldT = parseInt(this._oldT + halfHeight - halfWidth, 10) }px`;
	}
	_showFullImg(data) {
		const [width, height, minSize] = data.computeFullSize();
		this._fullEl = data.getFullImg(false, el => this._resizeFullImg(el), el => this._rotateFullImg(el));
		this._width = width;
		this._height = height;
		this._minSize = minSize ? minSize / this._zoomFactor : Cfg.minImgSize;
		this._oldL = (Post.sizing.wWidth - width) / 2 - 1;
		this._oldT = (Post.sizing.wHeight - height) / 2 - 1;
		const el = $add(`<div class="de-fullimg-center${
			data.isVideo ? ' de-fullimg-center-video' : '' }" style="top:${ this._oldT -
			(Cfg.imgInfoLink ? 11 : 0) - (nav.firefoxVer >= 59 && data.isVideo ? 10 : 0) }px; left:${
			this._oldL }px; width:${ width }px; height:${ height }px; display: block"></div>`);
		el.append(this._fullEl);
		if(data.isImage) {
			$aBegin(this._fullEl, `<a class="de-fullimg-wrap-link" href="${ data.src }"></a>`)
				.append($q('img', this._fullEl));
		}
		this._elStyle = el.style;
		this.data = data;
		this._parentEl = el;
		['onwheel' in el ? 'wheel' : 'mousewheel', 'mousedown', 'click'].forEach(
			e => el.addEventListener(e, this, true));
		data.srcBtnEvents(this);
		if(data.inPview && !data.post.isSticky) {
			data.post.toggleSticky(true);
		}
		const btns = this._btns;
		if(!data.inPview) {
			btns.showBtns();
			btns.autoBtn.classList.toggle('de-img-btn-none', !data.isVideo);
		} else if($hasProp(this, '_btns')) {
			btns.hideBtns();
		}
		data.post.thr.form.el.append(el);
		this.toggleVideoLoop();
		if(this.data.rotate) {
			this.rotateView(false);
		}
		data.checkForRedirect(this._fullEl);
	}
}

// Post image/video main initialization
class ExpandableImage {
	constructor(post, el, prev) {
		this.el = el;
		this.expanded = false;
		this.next = null;
		this.post = post;
		this.prev = prev;
		this.redirected = false;
		this.rotate = 0;
		this._fullEl = null;
		this._webmTitleLoad = null;
		if(prev) {
			prev.next = this;
		}
	}
	static isControlClick(e) {
		return Cfg.webmControl && e.clientY > (e.target.getBoundingClientRect().bottom - 40);
	}
	get height() {
		return (this._size || [-1, -1])[1];
	}
	get inPview() {
		const value = this.post instanceof Pview;
		Object.defineProperty(this, 'inPview', { value });
		return value;
	}
	get isImage() {
		const value = /(jpe?g|png|gif|webp)$/i.test(this.src) ||
			this.src.startsWith('blob:') && !this.el.hasAttribute('de-video');
		Object.defineProperty(this, 'isImage', { value });
		return value;
	}
	get isVideo() {
		const value = /(webm|mp4|m4v|ogv)(&|$)/i.test(this.src) ||
			this.src.startsWith('blob:') && this.el.hasAttribute('de-video');
		Object.defineProperty(this, 'isVideo', { value });
		return value;
	}
	get src() {
		const value = this._getImageSrc();
		Object.defineProperty(this, 'src', { value, configurable: true });
		return value;
	}
	get width() {
		return (this._size || [-1, -1])[0];
	}
	cancelWebmLoad(fullEl) {
		if(this.isVideo) {
			const videoEl = $q('video', fullEl);
			videoEl.pause();
			videoEl.removeAttribute('src');
			videoEl.load();
		}
		if(this._webmTitleLoad) {
			this._webmTitleLoad.cancelPromise();
			this._webmTitleLoad = null;
		}
	}
	checkForRedirect(fullEl) {
		if(!aib.getImgRedirectSrc || this.redirected) {
			return;
		}
		aib.getImgRedirectSrc(this.src).then(newSrc => {
			this.redirected = true;
			Object.defineProperty(this, 'src', { value: newSrc });
			$q('img, video', fullEl).src = this.el.src =
				this.el.parentNode.href = getImgNameLink(this.el).href = newSrc;
			if(!this.isVideo) {
				$q('a', fullEl).href = newSrc;
			}
		});
	}
	collapseImg(e) { // Collapse an image that expanded in post
		if(e && this.isVideo && ExpandableImage.isControlClick(e)) {
			return;
		}
		let fullImgTop;
		if(e) {
			fullImgTop = e.target.getBoundingClientRect().top;
		}
		this.cancelWebmLoad(this._fullEl);
		this.expanded = false;
		this._fullEl.remove();
		this._fullEl = null;
		$show(this.el.parentNode);
		(aib.hasPicWrap ? this._getImageParent : this.el.parentNode).nextSibling.remove();
		if(e) {
			e.preventDefault();
			if(this.inPview) {
				this.sendCloseEvent(e, true);
			}
			const origImgTop = this.el.getBoundingClientRect().top;
			if(fullImgTop < 0 || origImgTop < 0) {
				scrollTo(deWindow.pageXOffset, deWindow.pageYOffset + origImgTop);
			}
		}
	}
	computeFullSize() {
		if(!this._size) {
			if(this.isVideo) {
				return [0, 0, null];
			}
			const el = new Image();
			el.src = this.el.src;
			return [el.width, el.height, null];
		}
		let [width, height] = this._size;
		if(Cfg.resizeDPI) {
			width /= Post.sizing.dPxRatio;
			height /= Post.sizing.dPxRatio;
		}
		const minSize = this.isVideo ? Math.max(Cfg.minImgSize, Cfg.minWebmWidth) : Cfg.minImgSize;
		if(width < minSize && height < minSize) {
			const ar = width / height;
			if(width > height) {
				width = minSize;
				height = width / ar;
			} else {
				height = minSize;
				width = this.isVideo ? minSize : height * ar;
			}
		}
		const maxWidth = Post.sizing.wWidth - 2;
		const maxHeight = Post.sizing.wHeight -
			(Cfg.imgInfoLink ? 24 : 2) - (nav.firefoxVer >= 59 && this.isVideo ? 19 : 0);
		if(width > maxWidth || height > maxHeight) {
			const ar = width / height;
			if(ar > maxWidth / maxHeight) {
				width = maxWidth;
				height = width / ar;
			} else {
				height = maxHeight;
				width = height * ar;
			}
			if(width < minSize) {
				return [minSize, height, Math.max(width, height)];
			}
		}
		return [width, height, null];
	}
	expandImg(inPost, e) {
		if(e && !e.bubbles) {
			return;
		}
		if(!inPost) {
			const { viewer } = AttachedImage;
			if(!viewer) {
				AttachedImage.viewer = new ImagesViewer(this);
				return;
			}
			if(viewer.data === this) {
				viewer.closeImgViewer(e);
				AttachedImage.viewer = null;
				return;
			}
			viewer.updateImgViewer(this, e);
			return;
		}
		let origImgTop;
		if(e) {
			origImgTop = e.target.getBoundingClientRect().top;
		}
		this.expanded = true;
		const { el } = this;
		(aib.hasPicWrap ? this._getImageParent : el.parentNode).insertAdjacentHTML('afterend',
			'<div class="de-fullimg-after"></div>');
		this._fullEl = this.getFullImg(true, null, null);
		this._fullEl.addEventListener('click', e => this.collapseImg(e), true);
		this.srcBtnEvents(this);
		const parent = el.parentNode;
		$hide(parent);
		parent.after(this._fullEl);
		this.checkForRedirect(this._fullEl);
		if(e) {
			const fullImgTop = this._fullEl.getBoundingClientRect().top;
			if(fullImgTop < 0 || origImgTop < 0) {
				scrollTo(deWindow.pageXOffset, deWindow.pageYOffset + fullImgTop);
			}
		}
	}
	getFollowImg(isForward) {
		const nImage = isForward ? this.next : this.prev;
		if(nImage) {
			return nImage;
		}
		let imgs;
		let { post } = this;
		do {
			post = post.getAdjacentVisPost(!isForward);
			if(!post) {
				post = isForward ? Thread.first.op : Thread.last.last;
				if(post.isHidden || post.thr.isHidden) {
					post = post.getAdjacentVisPost(!isForward);
					if(!post) {
						return null;
					}
				}
			}
			imgs = post.images;
		} while(imgs.first === null);
		return isForward ? imgs.first : imgs.last;
	}
	getFullImg(inPost, onsizechange, onrotate) {
		let wrapEl, name, origSrc;
		const src = this._getImageSrc();
		const parent = this._getImageParent;
		if(this.el.className !== 'de-img-embed') {
			const nameEl = $q(aib.qImgNameLink, parent) || $q('a', parent);
			origSrc = nameEl.getAttribute('de-href') || nameEl.href;
			({ name } = this);
		} else {
			origSrc = parent.href;
			name = getFileName(origSrc);
		}
		const imgNameEl = (Cfg.imgSrcBtns ?
			'<svg class="de-btn-img"><use xlink:href="#de-symbol-post-img"></use></svg>' : '') +
			`<a class="de-fullimg-link" target="_blank" title="${
				Lng.openOriginal[lang] }" href="${ origSrc }">${ name }`;
		const wrapClass = `${ inPost ? ' de-fullimg-wrap-inpost' : ` de-fullimg-wrap-center${
			this._size ? '' : ' de-fullimg-wrap-nosize' }` }${
			this.isVideo ? ' de-fullimg-video' : '' }`;
		// Expand images: JPG, PNG, GIF, WEBP
		if(!this.isVideo) {
			const waitEl = !aib.getImgRedirectSrc && this._size ? '' :
				'<svg class="de-fullimg-load"><use xlink:href="#de-symbol-wait"/></svg>';
			wrapEl = $add(`<div class="de-fullimg-wrap${ wrapClass }">
				${ waitEl }
				<img class="de-fullimg" src="${ src }" alt="${ src }">
				<div class="de-fullimg-info">${ imgNameEl }</a></div>
			</div>`);
			const imgEl = $q('.de-fullimg', wrapEl);
			imgEl.onload = imgEl.onerror = ({ target: img }) => {
				if(!(img.naturalHeight + img.naturalWidth)) {
					if(!img.onceLoaded) {
						const { src } = img;
						img.src = src;
						img.onceLoaded = true;
					}
					return;
				}
				const { naturalWidth: newW, naturalHeight: newH } = img;
				const ar = this._size ? this._size[1] / this._size[0] : newH / newW;
				const isRotated = !img.scrollWidth ? false :
					img.scrollHeight / img.scrollWidth > 1 ? ar < 1 : ar > 1;
				if(!this._size || isRotated) {
					this._size = isRotated ? [newH, newW] : [newW, newH];
				}
				const parentEl = img.parentNode.parentNode;
				const waitEl = $q('.de-fullimg-load', parentEl);
				if(waitEl) {
					$hide(waitEl);
					parentEl.classList.remove('de-fullimg-wrap-nosize');
					if(onsizechange) {
						onsizechange(parentEl);
					}
				} else if(isRotated && onrotate) {
					onrotate(parentEl);
				}
			};
			DollchanAPI.notify('expandmedia', src);
			return wrapEl;
		}

		// Expand videos: WEBM, MP4
		// FIXME: handle null size videos
		const isWebm = getFileExt(origSrc) === 'webm';
		const needTitle = isWebm && Cfg.webmTitles;
		let inPostSize = '';
		if(inPost) {
			const [width, height] = this.computeFullSize();
			inPostSize = ` style="width: ${ width }px; height: ${ height }px;"`;
		}
		const hasTitle = needTitle && this.el.hasAttribute('de-metatitle');
		const title = hasTitle ? this.el.getAttribute('de-metatitle') : '';
		wrapEl = $add(`<div class="de-fullimg-wrap${ wrapClass }"${ inPostSize }>${
			nav.firefoxVer < 59 ? '' : '<div class="de-fullimg-video-hack"></div>' }
			<video src="${ src }" ` +
				`${ hasTitle && title ? `title="${ title }" ` : '' }loop autoplay ` +
				`${ Cfg.webmControl ? 'controls ' : '' }` +
				`${ Cfg.webmVolume === 0 ? 'muted ' : '' }></video>
			<div class="de-fullimg-info">${ imgNameEl }</a>
				<span class="de-fullimg-link de-webm-title">${ hasTitle && title ? title : '' }</span>
				${ needTitle && !hasTitle ? `<svg class="de-wait">
					<use xlink:href="#de-symbol-wait"/></svg>` : '' }
			</div>
		</div>`);
		const videoEl = $q('video', wrapEl);
		videoEl.volume = Cfg.webmVolume / 100;
		videoEl.addEventListener('ended', () => AttachedImage.viewer.navigate(true, true));
		videoEl.addEventListener('error', ({ target: el }) => {
			if(!el.onceLoaded) {
				el.load();
				el.onceLoaded = true;
			}
		});
		if(!this._size) {
			videoEl.addEventListener('loadedmetadata', ({ target: el }) => {
				this._size = [el.videoWidth, el.videoHeight];
				onsizechange(wrapEl);
			});
		}
		// Sync webm volume on all browser tabs
		setTimeout(() => videoEl.dispatchEvent(new CustomEvent('volumechange')), 150);
		videoEl.addEventListener('volumechange', ({ target: el, isTrusted }) => {
			const val = el.muted ? 0 : Math.round(el.volume * 100);
			if(isTrusted && val !== Cfg.webmVolume) {
				saveCfg('webmVolume', val);
				sendStorageEvent('__de-webmvolume', val);
			}
		});
		// MS Edge needs an external app with DollchanAPI to play webms
		if(nav.isMsEdge && isWebm && !DollchanAPI.hasListener('expandmedia')) {
			const href = 'https://github.com/Kagami/webmify/';
			$popup('err-expandmedia', `${ Lng.errMsEdgeWebm[lang] }:\n<a href="${
				href }" target="_blank">${ href }</a>`, false);
		}
		// Get webm title: load file and parse its metadata
		if(needTitle && !hasTitle) {
			this._webmTitleLoad = ContentLoader.loadImgData(videoEl.src, false).then(data => {
				$hide($q('.de-wait', wrapEl));
				if(!data) {
					return;
				}
				let str = '';
				let d = new WebmParser(data.buffer).getWebmData();
				if(!d) {
					return;
				}
				d = d[0];
				for(let i = 0, len = d.length; i < len; ++i) {
					// {Title tag = 0x7BA9}{Title length | 0x80}{Title string}{MuxingApp tag = 0x4D80}
					if(d[i] === 0x7B && d[i + 1] === 0xA9) {
						const titleLenPos = i + 2;
						const muxingAppPos = titleLenPos + (d[titleLenPos] & 0x7F) + 1;
						if(d[muxingAppPos] === 0x4D && d[muxingAppPos + 1] === 0x80) {
							for(let j = titleLenPos + 1; j < muxingAppPos; ++j) {
								str += String.fromCharCode(d[j]);
							}
							break;
						}
					}
				}
				const loadedTitle = decodeURIComponent(escape(str));
				this.el.setAttribute('de-metatitle', loadedTitle);
				if(str) {
					$q('.de-webm-title', wrapEl).textContent =
						videoEl.title = loadedTitle.replaceAll('.', ' ');
				}
			});
		}
		DollchanAPI.notify('expandmedia', src);
		return wrapEl;
	}
	sendCloseEvent(e, inPost) {
		let { post } = this;
		let cr = post.el.getBoundingClientRect();
		const x = e.pageX - deWindow.pageXOffset;
		const y = e.pageY - deWindow.pageYOffset;
		if(!inPost) {
			while(x > cr.right || x < cr.left || y > cr.bottom || y < cr.top) {
				post = post.parent;
				if(post && (post instanceof Pview)) {
					cr = post.el.getBoundingClientRect();
				} else {
					if(Pview.top) {
						Pview.top.markToDel();
					}
					return;
				}
			}
			post.mouseEnter();
		} else if(x > cr.right || y > cr.bottom && Pview.top) {
			Pview.top.markToDel();
		}
	}
	srcBtnEvents({ _fullEl }) {
		if(!Cfg.imgSrcBtns) {
			return;
		}
		const srcBtnEl = $q('.de-btn-img', _fullEl);
		srcBtnEl.addEventListener('mouseover', () => (srcBtnEl.odelay = setTimeout(() => {
			const menuHtml = !this.isVideo ? Menu.getMenuImg(srcBtnEl) :
				Menu.getMenuImg(srcBtnEl, true) + `<span class="de-menu-item de-menu-getframe">${
					Lng.getFrameLinks[lang] }</span>`;
			new Menu(srcBtnEl, menuHtml, !this.isVideo ? emptyFn : optiontEl => {
				if(!optiontEl.classList.contains('de-menu-getframe')) {
					return;
				}
				ContentLoader.getDataFromImg($q('video', _fullEl)).then(arr => {
					$popup('upload', Lng.sending[lang], true);
					const name = cutFileExt(this.name) + '.png';
					const blob = new Blob([arr], { type: 'image/png' });
					let formData;
					if(!nav.isChrome || nav.scriptHandler !== 'WebExtension') {
						formData = new FormData();
						formData.append('file', blob, name);
					}
					const ajaxParams = { data: formData || { arr, name }, method: 'POST' };
					const frameLinkHtml = `<a class="de-menu-item de-list" href="${
						deWindow.URL.createObjectURL(blob) }" download="${ name }" target="_blank">${
						Lng.saveFrame[lang] }</a>`;
					$ajax('https://tmp.saucenao.com/', ajaxParams, true).then(xhr => {
						let hostUrl;
						let errMsg = Lng.errSaucenao[lang];
						try {
							const obj = JSON.parse(xhr.responseText);
							if(obj.status === 'success') {
								hostUrl = obj.url ? Menu.getMenuImg(obj.url) : '';
							} else {
								errMsg += ':<br>' + obj.error_message;
							}
						} catch(err) {}
						$popup('upload', (hostUrl || errMsg) + frameLinkHtml);
					}, () => $popup('upload', Lng.errSaucenao[lang] + frameLinkHtml));
				}, emptyFn);
			});
		}, Cfg.linksOver)));
		srcBtnEl.addEventListener('mouseout', e => clearTimeout(e.target.odelay));
	}

	get _size() {
		const value = this._getImageSize();
		Object.defineProperty(this, '_size', { value, writable: true });
		return value;
	}
}

// Initialization of embedded image that added to the link in post message
class EmbeddedImage extends ExpandableImage {
	get _getImageParent() {
		const value = this.el.parentNode;
		Object.defineProperty(this, '_getImageParent', { value });
		return value;
	}
	_getImageSize() {
		return [this.el.naturalWidth, this.el.naturalHeight];
	}
	_getImageSrc() {
		return this.el.src;
	}
}

// Initialization of image/video that attached to the post
class AttachedImage extends ExpandableImage {
	static closeImg() {
		const { viewer } = AttachedImage;
		if(viewer) {
			viewer.closeImgViewer(null);
			AttachedImage.viewer = null;
		}
	}
	get info() {
		const value = aib.getImgInfo(this._getImageParent);
		Object.defineProperty(this, 'info', { value });
		return value;
	}
	get name() {
		const value = aib.getImgRealName(this._getImageParent).trim();
		Object.defineProperty(this, 'name', { value });
		return value;
	}
	get nameLink() {
		const value = $q(aib.qImgNameLink, this._getImageParent);
		Object.defineProperty(this, 'nameLink', { value });
		return value;
	}
	get weight() {
		let value = 0;
		if(this.info) {
			const w = this.info.match(/(\d+(?:[.,]\d+)?)\s*([mмkк])?i?[bб]/i);
			const w1 = w[1].replace(',', '.');
			value = w[2] === 'M' ? (w1 * 1e3) | 0 : !w[2] ? Math.round(w1 / 1e3) : w1;
		}
		Object.defineProperty(this, 'weight', { value });
		return value;
	}

	get _getImageParent() {
		const value = aib.getImgWrap(this.el);
		Object.defineProperty(this, '_getImageParent', { value });
		return value;
	}
	_getImageSize() {
		if(this.info) {
			const size = this.info.match(/(?:[\s(]|^)(\d+)\s?[x\u00D7]\s?(\d+)(?:[)\s,]|$)/);
			return size ? [size[1], size[2]] : null;
		}
		return null;
	}
	_getImageSrc() {
		// Donʼt use aib.getImgSrcLink(this.el).href
		// If #ihash spells enabled, Chrome reads href in ajaxed posts as empty -> image canʼt be expanded!
		return aib.getImgSrcLink(this.el).getAttribute('href');
	}
}
AttachedImage.viewer = null;

// A class that finds a set of images in a post
class PostImages {
	constructor(post) {
		let first = null;
		let last = null;
		let els = $Q(aib.qPostImg, post.el);
		let hasAttachments = false;
		const filesMap = new Map();
		for(let i = 0, len = els.length; i < len; ++i) {
			const el = els[i];
			last = new AttachedImage(post, el, last);
			filesMap.set(el, last);
			hasAttachments = true;
			if(!first) {
				first = last;
			}
		}
		if(Cfg.addImgs || localData) {
			els = $Q('.de-img-embed', post.el);
			for(let i = 0, len = els.length; i < len; ++i) {
				const el = els[i];
				last = new EmbeddedImage(post, el, last);
				filesMap.set(el, last);
				if(!first) {
					first = last;
				}
			}
		}
		this.first = first;
		this.last = last;
		this.hasAttachments = hasAttachments;
		this._map = filesMap;
	}
	get expanded() {
		for(let img = this.first; img; img = img.next) {
			if(img.expanded) {
				return true;
			}
		}
		return false;
	}
	get firstAttach() {
		return this.hasAttachments ? this.first : null;
	}
	getImageByEl(el) {
		return this._map.get(el);
	}
	[Symbol.iterator]() {
		return {
			_img: this.first,
			next() {
				const value = this._img;
				if(value) {
					this._img = value.next;
					return { value, done: false };
				}
				return { done: true };
			}
		};
	}
}

const ImagesHashStorage = Object.create({
	get getHash() {
		const value = this._getHashHelper.bind(this);
		Object.defineProperty(this, 'getHash', { value });
		return value;
	},
	endFn() {
		if($hasProp(this, '_storage')) {
			sesStorage['de-imageshash'] = JSON.stringify(this._storage);
		}
		if($hasProp(this, '_workers')) {
			this._workers.clearWorkers();
			delete this._workers;
		}
	},

	get _canvas() {
		const value = doc.createElement('canvas');
		Object.defineProperty(this, '_canvas', { value });
		return value;
	},
	get _storage() {
		let value = null;
		try {
			value = JSON.parse(sesStorage['de-imageshash']);
		} catch(err) {}
		if(!value) {
			value = {};
		}
		Object.defineProperty(this, '_storage', { value });
		return value;
	},
	get _workers() {
		const value = new WorkerPool(4, this._genImgHash, emptyFn);
		Object.defineProperty(this, '_workers', { value, configurable: true });
		return value;
	},
	_genImgHash: ([arrBuf, oldw, oldh]) => {
		const buf = new Uint8Array(arrBuf);
		const size = oldw * oldh;
		for(let i = 0, j = 0; i < size; i++, j += 4) {
			buf[i] = buf[j] * 0.3 + buf[j + 1] * 0.59 + buf[j + 2] * 0.11;
		}
		const newh = 8;
		const neww = 8;
		const levels = 3;
		const areas = 256 / levels;
		const values = 256 / (levels - 1);
		let hash = 0;
		for(let i = 0; i < newh; ++i) {
			for(let j = 0; j < neww; ++j) {
				let temp = i / (newh - 1) * (oldh - 1);
				const l = Math.min(temp | 0, oldh - 2);
				const u = temp - l;
				temp = j / (neww - 1) * (oldw - 1);
				const c = Math.min(temp | 0, oldw - 2);
				const t = temp - c;
				hash = (hash << 4) + Math.min(values * (((buf[l * oldw + c] * ((1 - t) * (1 - u)) +
					buf[l * oldw + c + 1] * (t * (1 - u)) +
					buf[(l + 1) * oldw + c + 1] * (t * u) +
					buf[(l + 1) * oldw + c] * ((1 - t) * u)) / areas) | 0), 255);
				const g = hash & 0xF0000000;
				if(g) {
					hash ^= g >>> 24;
				}
				hash &= ~g;
			}
		}
		return { hash };
	},
	async _getHashHelper({ el, src }) {
		if(src in this._storage) {
			return this._storage[src];
		}
		if(!el.complete) {
			await new Promise(resolve => el.addEventListener('load', () => resolve()));
		}
		el.removeAttribute('loading');
		if(el.naturalWidth + el.naturalHeight === 0) {
			return -1;
		}
		let data;
		let val = -1;
		const { naturalWidth: w, naturalHeight: h } = el;
		const cnv = this._canvas;
		cnv.width = w;
		cnv.height = h;
		const ctx = cnv.getContext('2d');
		ctx.drawImage(el, 0, 0);
		const { buffer } = ctx.getImageData(0, 0, w, h).data;
		if(buffer) {
			data = await new Promise(resolve =>
				this._workers.runWorker([buffer, w, h], [buffer], val => resolve(val)));
			if(data && ('hash' in data)) {
				val = data.hash;
			}
		}
		this._storage[src] = val;
		return val;
	}
});

function getImgNameLink(el) {
	return $q(aib.qImgNameLink, aib.getImgWrap(el));
}

function addImgButtons(link) {
	link.insertAdjacentHTML('beforebegin', '<svg class="de-btn-img">' +
		'<use xlink:href="#de-symbol-post-img"/></svg>');
}

// Adding features for info links of images
function processImgInfoLinks(parent, addSrc = Cfg.imgSrcBtns, imgNames = Cfg.imgNames) {
	if(addSrc || imgNames) {
		if(parent instanceof AbstractPost) {
			processPostImgInfoLinks(parent, addSrc, imgNames);
		} else {
			const posts = $Q(aib.qPost + ', ' + aib.qOPost + ', .de-oppost', parent);
			for(let i = 0, len = posts.length; i < len; ++i) {
				processPostImgInfoLinks(pByEl.get(posts[i]), addSrc, imgNames);
			}
		}
	}
}

function processPostImgInfoLinks(post, addSrc, imgNames) {
	if(!post) {
		return;
	}
	for(const image of post.images) {
		const link = image.nameLink;
		if(!link) {
			return;
		}
		if(addSrc) {
			addImgButtons(link);
		}
		const { name } = image;
		if(!link.classList.contains('de-img-name')) {
			link.classList.add('de-img-name');
			link.title = name;
			link.setAttribute('download', name);
			link.setAttribute('de-href', link.href);
		}
		if(imgNames) {
			let ext;
			if(!(ext = link.getAttribute('de-img-ext'))) {
				ext = getFileExt(name) || getFileExt(getFileName(link.href));
				link.setAttribute('de-img-ext', ext);
				link.setAttribute('de-img-name-old', link.textContent);
			}
			link.textContent = imgNames === 2 ? ext : name;
		}
	}
}

// Adding image previews before links in post message
function embedPostMsgImages(el) {
	if(!Cfg.addImgs || localData) {
		return;
	}
	const els = $Q(aib.qMsgImgLink, el);
	for(let i = 0, len = els.length; i < len; ++i) {
		const link = els[i];
		const url = link.href;
		if(url.includes('?') || aib.getPostOfEl(link).hidden) {
			continue;
		}
		link.insertAdjacentHTML('beforebegin',
			`<a href="${ url }" target="_blank"><img class="de-img-embed" src="${ url }"></a><br>`);
		if(Cfg.imgSrcBtns) {
			addImgButtons(link);
		}
	}
}

/* ==[ PostBuilders.js ]======================================================================================
                                          BUILDERS FOR LOADED POSTS
=========================================================================================================== */

class DOMPostsBuilder {
	constructor(form, isArchived) {
		this._form = form;
		this._posts = $Q(aib.qPost, form);
		this.length = this._posts.length;
		this.postersCount = '';
		this._isArchived = isArchived;
	}
	get isClosed() {
		return aib.qClosed && !!$q(aib.qClosed, this._form) || this._isArchived;
	}
	getOpMessage() {
		return aib.fixHTML(doc.adoptNode($q(aib.qPostMsg, this._form)));
	}
	getPNum(i) {
		return aib.getPNum(this._posts[i]);
	}
	getOpEl() {
		return aib.fixHTML(aib.getOp($q(aib.qThread, this._form) || this._form));
	}
	getPostEl(i) {
		return aib.fixHTML(this._posts[i]);
	}
	* getRefLinks(i, thrUrl) { // i === 0 - OP-post
		const msg = i === 0 ? $q(aib.qPostMsg, this._form) : $q(aib.qPostMsg, this._posts[i - 1]);
		const links = $Q('a', msg);
		for(let i = 0, len = links.length; i < len; ++i) {
			const link = links[i];
			const tc = link.textContent;
			if(tc[0] === '>' && tc[1] === '>') {
				const lNum = parseInt(tc.substr(2), 10);
				if(lNum) {
					yield [link, lNum];
					const url = link.getAttribute('href');
					if(url[0] === '#') {
						link.setAttribute('href', thrUrl + url);
					}
				}
			}
		}
	}
	* bannedPostsData() {
		const banEls = $Q(aib.qBan, this._form);
		for(let i = 0, len = banEls.length; i < len; ++i) {
			const banEl = banEls[i];
			const postEl = aib.getPostElOfEl(banEl);
			yield [1, postEl ? aib.getPNum(postEl) : null, doc.adoptNode(banEl)];
		}
	}
}

class _4chanPostsBuilder {
	constructor(json, board) {
		this._posts = json.posts;
		this._board = board;
		this.length = json.posts.length - 1;
		this.postersCount = this._posts[0].unique_ips;
		this._colorIDs = [];
	}
	static fixFileName(name, maxLength) {
		const decodedName = name.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#039;', '\'')
			.replaceAll('&lt;', '<').replaceAll('&gt;', '>');
		return decodedName.length <= maxLength ? { isFixed: false, name } : {
			isFixed : true,
			name    : decodedName.slice(0, 25).replaceAll('&', '&amp;').replaceAll('"', '&quot;')
				.replaceAll('\'', '&#039;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
		};
	}
	get isClosed() {
		return !!(this._posts[0].closed || this._posts[0].archived);
	}
	getOpMessage() {
		const { no, com } = this._posts[0];
		return $add(aib.fixHTML(`<blockquote class="postMessage" id="m${ no }"> ${ com }</blockquote>`));
	}
	getPNum(i) {
		return this._posts[i + 1].no;
	}
	getOpEl() {
		return this.getPostEl(-1);
	}
	getPostEl(i) {
		return $add(aib.fixHTML(this.getPostHTML(i))).lastElementChild;
	}
	getPostHTML(i) {
		const data = this._posts[i + 1];
		const num = data.no;
		const board = this._board;
		const _icon = id => `//s.4cdn.org/image/${ id }${
			deWindow.devicePixelRatio < 2 ? '.gif' : '@2x.gif' }`;

		// --- FILE ---
		let fileHTML = '';
		if(data.filedeleted) {
			fileHTML = `<div id="f${ num }" class="file"><span class="fileThumb">
				<img src="${ _icon('filedeleted-res') }" class="fileDeletedRes" alt="File deleted.">
			</span></div>`;
		} else if(typeof data.filename === 'string') {
			let { name, isFixed: needTitle } = _4chanPostsBuilder.fixFileName(data.filename, 30);
			name += data.ext;
			if(!data.tn_w && !data.tn_h && data.ext === '.gif') {
				data.tn_w = data.w;
				data.tn_h = data.h;
			}
			const isSpoiler = data.spoiler;
			if(isSpoiler) {
				name = 'Spoiler Image';
				data.tn_w = data.tn_h = 100;
				needTitle = false;
			}
			const size = prettifySize(data.fsize);
			const fileTextTitle = isSpoiler ? ` title="${ data.filename + data.ext }"` : '';
			const aHref = needTitle ? `title="${ data.filename + data.ext }"` : '';
			const imgSrc = isSpoiler ? '//s.4cdn.org/image/spoiler.png' :
				`//i.4cdn.org/${ board }/${ data.tim }s.jpg`;
			fileHTML = `<div class="file" id="f${ num }">
				<div class="fileText" id="fT${ num }"${ fileTextTitle }>File:
					<a href="//i.4cdn.org/${ board }/${ data.tim +
						data.ext }" ${ aHref } target="_blank">${ name }</a>
					(${ size }, ${ data.ext === '.pdf' ? 'PDF' : data.w + 'x' + data.h })
				</div>
				<a class="fileThumb ${ isSpoiler ? 'imgspoiler' : '' }" href="//i.4cdn.org/${ board }/` +
					`${ data.tim + data.ext }" target="_blank">
					<img src="${ imgSrc }" alt="${ size }" data-md5="` +
						`${ data.md5 }" style="height: ${ data.tn_h }px; width: ${ data.tn_w }px;">
					<div data-tip="" data-tip-cb="mShowFull" class="mFileInfo mobile">
						${ size } ${ data.ext.substr(1).toUpperCase() }
					</div>
				</a>
			</div>`;
		}

		// --- CAPCODE ---
		let highlight = '';
		let ccBy = '';
		let cc = data.capcode;
		switch(cc) {
		case 'admin_highlight':
			highlight = ' highlightPost';
			cc = 'admin';
			/* falls through */
		case 'admin': ccBy = 'Administrators'; break;
		case 'mod': ccBy = 'Moderators'; break;
		case 'developer': ccBy = 'Developers'; break;
		case 'manager': ccBy = 'Managers'; break;
		case 'founder': ccBy = 'Founder';
		}
		let ccName = '';
		let ccText = '';
		let ccImg = '';
		let ccClass = '';
		if(cc) {
			ccName = cc[0].toUpperCase() + cc.slice(1);
			ccText = `<strong class="capcode hand id_${ cc === 'founder' ? 'admin' : cc }` +
				`" title="Highlight posts by ${ ccBy }">## ${ ccName }</strong>`;
			ccImg = `<img src="${ _icon(cc + 'icon') }" alt="${
				ccName } Icon." title="This user is 4chan ${ ccName }." class="identityIcon">`;
			ccClass = 'capcode' + (cc === 'founder' ? 'Admin' : ccName);
		}

		// --- POST ---
		const { id, name = '' } = data;
		const nameEl = `<span class="name">${ name }</span>`;
		const mobNameEl = name.length <= 30 ? nameEl :
			`<span class="name" data-tip data-tip-cb="mShowFull">${ name.substring(30) }(…)</span>`;
		const tripEl = `${ data.trip ? `<span class="postertrip">${ data.trip }</span>` : '' }`;
		const cID = id ? this._colorIDs[id] || this._computeIDColor(id) : null;
		const posteruidEl = id && !data.capcode ? `<span class="posteruid id_${ id }` +
			`">(ID: <span class="hand" title="Highlight posts by this ID" style="background-color: rgb(${
				cID[0] }, ${ cID[1] }, ${ cID[2] }); color: ${ cID[3] ? 'black' : 'white' };">${
				id }</span>)</span>` : '';
		const flagEl = (data.country ? `<span title="${ data.country_name }" class="flag flag-${
			data.country.toLowerCase() }"></span>` : '') +
			(data.board_flag ? `<span title="${ data.flag_name }" class="bfl bfl-${
				data.board_flag.toLowerCase() }"></span>` : '');
		const emailEl = data.email ? `<a href="mailto:${
			data.email.replaceAll(' ', '%20') }" class="useremail">` : '';
		const replyEl = `<a href="#p${ num }" title="Link to this post">No.</a><a href="javascript:quote('${
			num }');" title="Reply to this post">${ num }</a>`;
		const subjEl = `<span class="subject">${ data.sub || '' }</span>`;
		return `<div class="postContainer replyContainer" id="pc${ num }">
			<div class="sideArrows" id="sa${ num }">&gt;&gt;</div>
			<div id="p${ num }" class="post ${ i === -1 ? 'op' : 'reply' } ${ highlight }">
				<div class="postInfoM mobile" id="pim${ num }">
					<span class="nameBlock ${ ccClass }">
						${ mobNameEl }
						${ tripEl }
						${ ccText }
						${ ccImg }
						${ posteruidEl }
						${ flagEl }<br>
						${ subjEl }
					</span>
					<span class="dateTime postNum" data-utc="${ data.time }">${ data.now } ${ replyEl }</span>
				</div>
				<div class="postInfo desktop" id="pi${ num }">
					<input name="${ num }" value="delete" type="checkbox">
					${ subjEl }
					<span class="nameBlock ${ ccClass }">
						${ emailEl }
							${ nameEl }
							${ tripEl }
							${ ccText }
						${ data.email ? '</a>' : '' }
						${ ccImg }
						${ posteruidEl }
						${ flagEl }
					</span>
					<span class="dateTime" data-utc="${ data.time }">${ data.now }</span>
					<span class="postNum desktop">${ replyEl }</span>
				</div>
				${ fileHTML }
				<blockquote class="postMessage" id="m${ num }"> ${ data.com || '' }</blockquote>
			</div>
		</div>`;
	}
	* bannedPostsData() {}

	_computeIDColor(text) {
		let hash = 0;
		for(let i = 0, len = text.length; i < len; ++i) {
			hash = (hash << 5) - hash + text.charCodeAt(i);
		}
		const r = hash >> 24 & 255;
		const g = hash >> 16 & 255;
		const b = hash >> 8 & 255;
		const value = this._colorIDs[text] = [r, g, b, 0.299 * r + 0.587 * g + 0.114 * b > 125];
		return value;
	}
}
_4chanPostsBuilder._customSpoiler = new Map();

class DobrochanPostsBuilder {
	constructor(json, board) {
		if(json.error) {
			throw new AjaxError(0, `API error: ${ json.error.message }`);
		}
		this._json = json.result;
		this._board = board;
		this._posts = json.result.threads[0].posts;
		this.length = this._posts.length - 1;
		this.postersCount = '';
	}
	get isClosed() {
		return !!this._json.threads[0].archived;
	}
	getOpMessage() {
		return $add(aib.fixHTML(`<div class="postbody"> ${ this._posts[0].message_html }</div>`));
	}
	getPNum(i) {
		return this._posts[i + 1].display_id;
	}
	getOpEl() {
		return this.getPostEl(-1);
	}
	getPostEl(i) {
		const el = $add(aib.fixHTML(this.getPostHTML(i)));
		if(i === -1) {
			return el;
		}
		return el.firstElementChild.firstElementChild.lastElementChild;
	}
	getPostHTML(i) {
		const data = this._posts[i + 1];
		const num = data.display_id;
		const board = this._board;
		const multiFile = data.files.length > 1;

		// --- FILE ---
		let filesHTML = '';
		for(const { file_id, metadata, rating, size, src, thumb, thumb_height, thumb_width } of data.files) {
			let fileName, fullFileName;
			let th = thumb;
			let thumbW = 200;
			let thumbH = 200;
			const ext = getFileExt(src);
			if(board === 'b' || board === 'rf') {
				fileName = fullFileName = getFileName(th);
			} else {
				fileName = fullFileName = getFileName(src);
				if(multiFile && fileName.length > 20) {
					fileName = fileName.substr(0, 20 - ext.length) + '(…)' + ext;
				}
			}
			const maxRating = 'r15'; // FIXME: read from settings
			if(rating === 'r-18g' && maxRating !== 'r-18g') {
				th = 'images/r-18g.png';
			} else if(rating === 'r-18' && (maxRating !== 'r-18g' || maxRating !== 'r-18')) {
				th = 'images/r-18.png';
			} else if(rating === 'r-15' && maxRating === 'sfw') {
				th = 'images/r-15.png';
			} else if(rating === 'illegal') {
				th = 'images/illegal.png';
			} else {
				thumbW = thumb_width;
				thumbH = thumb_height;
			}
			const fileInfo = `<div class="fileinfo${ multiFile ? ' limited' : '' }">Файл:
				<a href="/${ src }" title="${ fullFileName }" target="_blank">${ fileName }</a><br>
				<em>${ ext }, ${ prettifySize(size) }, ${ metadata.width }x${ metadata.height }
				</em>${ multiFile ? '' : ' - Нажмите на картинку для увеличения' }<br>
				<a class="edit_ icon" href="/utils/image/edit/${ file_id }/${ num }">
					<img title="edit" alt="edit" src="/images/blank.png">
				</a>
			</div>`;
			filesHTML += `${ multiFile ? '' : fileInfo }
			<div id="file_${ num }_${ file_id }" class="file">${ multiFile ? fileInfo : '' }
				<a href="/${ src }" target="_blank">
					<img class="thumb" src="/${ th }" width="${ thumbW }" height="${ thumbH }">
				</a>
			</div>`;
		}

		// --- POST ---
		const date = data.date.replace(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/,
			(all, y, mo, d, h, m, s) => {
				const dt = new Date(y, +mo - 1, d, h, m, s);
				return `${ pad2(dt.getDate()) } ${ Lng.fullMonth[1][dt.getMonth()] } ${ dt.getFullYear()
				} (${ Lng.week[1][dt.getDay()] }) ${ pad2(dt.getHours()) }:${ pad2(dt.getMinutes()) }`;
			});
		const isOp = i === -1;
		return `${ isOp ? `<div id="post_${ num }" class="oppost post">` :
			`<table id="post_${ num }" class="replypost post"><tbody><tr>
			<td class="doubledash">&gt;&gt;</td>
			<td class="reply" id="reply${ num }">` }
				<a name="i${ num }"></a>
				<label>
					<input name="${ num }" value="${ data.thread_id }" ` +
						`class="delete_checkbox" id="delbox_${ num }" type="checkbox">
					${ data.subject ? `<span class="replytitle">${ data.subject }</span>` : '' }
					<span class="postername">${ data.name || 'Анонимус' }</span> ${ date }
				</label>
				<span class="reflink">
					<a href="/${ board }/res/${ data.thread_id }.xhtml#i${ num }"> No.${ num }</a>
				</span><br>
				${ filesHTML }
				${ multiFile ? '<div style="clear: both;"></div>' : '' }
				<div class="postbody"> ${ data.message_html }</div>
			${ isOp ? '</div>' : '</td></tr></tbody></table>' }`;
	}
	* bannedPostsData() {}
}

class MakabaPostsBuilder {
	constructor(json, board) {
		if(json.Error) {
			throw new AjaxError(0, `API error: ${ json.Error } (${ json.Code })`);
		}
		this._json = json;
		this._board = board;
		this._posts = json.threads[0].posts;
		this.length = aib._2channel ? json.counter_posts - 1 : json.posts_count;
		this.postersCount = json.unique_posters;
	}
	get isClosed() {
		return this._json.is_closed;
	}
	getOpMessage() {
		return $add(aib.fixHTML(this._getPostMsg(this._posts[0])));
	}
	getPNum(i) {
		return this._posts[i + 1].num;
	}
	getOpEl() {
		return this.getPostEl(-1);
	}
	getPostEl(i) {
		return $add(aib.fixHTML(this.getPostHTML(i))).firstElementChild;
	}
	getPostHTML(i) {
		const data = this._posts[i + 1];
		const { num } = data;
		const board = this._board;
		const isNew = this._isNew;
		const p = isNew ? 'post__' : '';
		const _switch = (val, obj) => val in obj ? obj[val] : obj['@@default'];

		// --- FILE ---
		let filesHTML = '';
		if(data.files?.length) {
			filesHTML = `<div class="${ isNew ? 'post__images post__images_type_' : 'images images-' }${
				data.files.length === 1 ? 'single' : 'multi' }">`;
			for(const file of data.files) {
				const imgId = num + '-' + file.md5;
				const { fullname = file.name, displayname: dispName = file.name } = file;
				const isVideo = file.type === 6 || file.type === 10;
				const imgClass = isNew ?
					`post__file-preview${ isVideo ? ' post__file-webm' : '' }${
						data.nsfw ? ' post__file-nsfw' : '' }` :
					`img preview${ isVideo ? ' webm-file' : '' }`;
				filesHTML += `<figure class="${ p }image">
					<figcaption class="${ p }file-attr">
						<a id="title-${ imgId }" class="desktop" target="_blank" href="` +
							`${ file.type === 100 /* is sticker */ ? file.install : file.path }"` +
							`${ dispName === fullname ? '' : ` title="${ fullname }"` }>${ dispName }</a>
						<span class="${ isNew ? 'post__filezise' : 'filesize' }">(${ file.size }Кб, ` +
							`${ file.width }x${ file.height }${ isVideo ? ', ' + file.duration : '' })</span>
					</figcaption>
					<div id="exlink-${ imgId }"${ isNew ? '' : 'class="image-link"' }>
						<a ${ isNew ? 'class="post__image-link" ' : '' }href="${ file.path }">
							<img class="${ imgClass }" src="${ file.thumbnail }" alt="${ file.width }x` +
								`${ file.height }" width="${ file.tn_width }" height="${ file.tn_height }">
						</a>
					</div>
				</figure>`;
			}
			filesHTML += '</div>';
		}

		// --- POST ---
		const emailEl = data.email ?
			`<a href="${ data.email }" class="${ isNew ? 'post__' : 'post-' }email">${ data.name }</a>` :
			`<span class="${ isNew ? 'post__anon' : 'ananimas' }">${ data.name }</span>`;
		const tripEl = !data.trip ? '' : `<span class="${ _switch(data.trip, {
			'!!%adm%!!'        : `${ p }adm">## ${ aib._2channel ? 'Admin' : 'Abu' } ##`,
			'!!%mod%!!'        : `${ p }mod">## Mod ##`,
			'!!%Inquisitor%!!' : `${ p }inquisitor">## Applejack ##`,
			'!!%coder%!!'      : `${ p }mod">## Кодер ##`,
			'!!%curunir%!!'    : `${ p }mod">## Curunir ##`,
			'@@default'        :
				`${ data.trip_style ? data.trip_style : isNew ? 'post__trip' : 'postertrip' }">` + data.trip
		}) }</span>`;
		const refHref = `/${ board }/res/${ parseInt(data.parent) || num }.html#${ num }`;
		let rate = '';
		if(this._hasLikes) {
			const likes = `<div id="like-div${ num }" class="${ isNew ?
				`post__detailpart post__rate post__rate_type_like" title="Мне это нравится">
					<svg xmlns="http://www.w3.org/2000/svg" class="post__rate-icon icon">
						<use xlink:href="#icon__thunder"></use></svg>` :
				'like-div"> <span class="like-icon"> <i class="fa fa-bolt"></i></span>'
			} <span id="like-count${ num }"${ isNew ? '' : 'class="like-count"' }>`;
			const dislikes = likes.replaceAll('like', 'dislike').replace('icon__thunder', 'icon__thumbdown');
			rate = `${ likes }${ data.likes || 0 }</span></div>
				${ dislikes }${ data.dislikes || 0 }</span></div>`;
		}
		const isOp =  i === -1;
		const wrapClass = !isNew ? 'post-wrapper' : isOp ? 'thread__oppost' : 'thread__post';
		const timeReflink = `<span class="${ isNew ? 'post__time' : 'posttime' }">${ data.date }</span>
			<span class="${ isNew ? 'post__detailpart' : 'reflink' }">` +
				`<a id="${ num }" ${ isNew ? 'class="post__reflink" ' : '' }href="${ refHref }">` +
					`${ aib._2channel ? 'No.' : '№' }</a>` +
				`<a class="${ isNew ? 'post__reflink ' : '' }postbtn-reply-href" href="${ refHref }"` +
					` name="${ num }">${ num }</a>
			</span>`;
		return `<div id="post-${ num }" class="${ wrapClass }">
			<div class="post ${ isNew ? 'post_type_' : '' }${ isOp ? 'oppost' : 'reply' }` +
				`${ filesHTML ? ' post_withimg' : '' }" id="post-body-${ num }" data-num="${ num }">
				<div id="post-details-${ num }" class="${ isNew ? 'post__details' : 'post-details' }">
					<input type="checkbox" name="delete" value="${ num }">
					${ !data.subject ? '' : `<span class="${ isNew ? 'post__' : 'post-' }title">` +
						`${ data.subject + (data.tags ? ` /${ data.tags }/` : '') }</span>` }
					${ emailEl }
					${ data.icon ? `<span class="${ isNew ? 'post__' : 'post-' }icon">` +
						`${ data.icon }</span>` : '' }
					${ tripEl }
					${ data.op === 1 ? `<span class="${ p }ophui"># OP</span>&nbsp;` : '' }
					${ isNew ? timeReflink : `<span class="posttime-reflink">
						${ timeReflink }
					</span>` }
					${ rate }
				</div>
				${ filesHTML }
				${ this._getPostMsg(data) }
			</div>
		</div>`;
	}
	* bannedPostsData() {
		const p = this._isNew ? 'post__' : '';
		for(const { banned, num } of this._posts) {
			switch(banned) {
			case 1:
				yield [1, num, $add(`<span class="${ p }pomyanem">(Автор этого поста был забанен.)</span>`)];
				break;
			case 2:
				yield [2, num, $add(`<span class="${ p }pomyanem">` +
					'(Автор этого поста был предупрежден.)</span>')];
				break;
			}
		}
	}

	get _hasLikes() {
		const value = !!$q('.like-div, .post__rate');
		Object.defineProperty(this, '_hasLikes', { value });
		return value;
	}
	get _isNew() {
		const value = !!$q('.post_type_oppost');
		Object.defineProperty(this, '_isNew', { value });
		return value;
	}
	_getPostMsg(data) {
		const _switch = (val, obj) => val in obj ? obj[val] : obj['@@default'];
		const comment = data.comment.replace(/<script /ig, '<!--<textarea ')
			.replace(/<\/script>/ig, '</textarea>-->');
		const p = this._isNew ? 'post__' : '';
		const tag = aib._2channel ? 'blockquote' : 'article';
		return `<${ tag } id="m${ data.num }" class="${ this._isNew ? 'post__' : 'post-' }message">` +
			`${ comment }${ _switch(data.banned, {
				1           : `<br><span class="${ p }pomyanem">(Автор этого поста был забанен.)</span>`,
				2           : `<br><span class="${ p }pomyanem">(Автор этого поста был предупрежден.)</span>`,
				'@@default' : ''
			}) }</${ tag }>`;
	}
}

/* ==[ RefMap.js ]============================================================================================
                                             REFERENCE LINKS MAP
=========================================================================================================== */

class RefMap {
	constructor(post) {
		this.hasMap = false;
		this._isHidden = false;
		this._isInited = false;
		this._post = post;
		this._set = new Set();
	}
	static gen(posts) {
		const { tNums } = DelForm;
		for(const [pNum, post] of posts) {
			for(const [link, lNum] of post.refLinks()) { // link might be from another document
				if(MyPosts.has(lNum)) {
					link.classList.add('de-ref-you');
					if(!MyPosts.has(pNum) && (post instanceof AbstractPost)) {
						post.el.classList.add('de-mypost-reply');
					}
				}
				if(!aib.hasOPNum && tNums.has(lNum)) {
					link.classList.add('de-ref-op');
				}
				if(!posts.has(lNum)) {
					continue;
				}
				const { ref } = posts.get(lNum);
				if(ref._isInited) {
					ref.addRefNum(post, pNum);
				} else {
					ref._set.add(pNum);
					ref.hasMap = true;
				}
			}
		}
	}
	static initRefMap(form) {
		let post = form.firstThr?.op;
		if(post && Cfg.linksNavig) {
			this.gen(pByNum);
			const strNums = Cfg.strikeHidd && Post.hiddenNums.size ? Post.hiddenNums : null;
			for(; post; post = post.next) {
				if(post.ref.hasMap) {
					post.ref.initPostRef('', strNums);
				}
			}
		}
	}
	static updateRefMap(post, isAdd) {
		const pNum = post.num;
		const strNums = isAdd && Cfg.strikeHidd && Post.hiddenNums.size ? Post.hiddenNums : null;
		const links = $Q('a', post.msg);
		for(let lNum, i = 0, len = links.length; i < len; ++i) {
			const link = links[i];
			const tc = link.textContent;
			if(tc[0] !== '>' || tc[1] !== '>' || !(lNum = parseInt(tc.substr(2), 10))) {
				continue;
			}
			if(isAdd && MyPosts.has(lNum)) {
				link.classList.add('de-ref-you');
				if(!MyPosts.has(pNum)) {
					const postClass = post.el.classList;
					if(!postClass.contains('de-mypost-reply')) {
						postClass.add('de-mypost-reply');
						updater.refToYou(pNum);
					}
				}
			}
			if(!pByNum.has(lNum)) {
				continue;
			}
			const lPost = pByNum.get(lNum);
			if(!aib.t) {
				link.href = `#${ aib._4chan ? 'p' : '' }${ lNum }`;
			}
			if(!isAdd) {
				lPost.ref.removeLink(pNum);
				return;
			}
			if(strNums?.has(lNum)) {
				link.classList.add('de-link-hid');
			}
			if(!aib.hasOPNum && DelForm.tNums.has(lNum)) {
				link.classList.add('de-ref-op');
			}
			lPost.ref.hasMap = true;
			lPost.ref.addRefNum(post, pNum, strNums?.has(pNum));
		}
	}
	addRefNum(post, num, isHidden = null) {
		if(isHidden === null) {
			const strNums = Cfg.strikeHidd && Post.hiddenNums.size ? Post.hiddenNums : null;
			isHidden = strNums ? strNums.has(+num) : false;
		}
		if(!this._set.has(num)) {
			this._set.add(num);
			this._el.insertAdjacentHTML('beforeend', this._getHTML(num, '', isHidden));
			if(Cfg.hideRefPsts && this._post.isHidden && (post instanceof Post)) {
				post.setVisib(true, 'reference to >>' + num);
				post.ref.hideRef();
			}
		}
	}
	getElByNum(num) {
		return $q(`a[href$="${ num }"]`, this._el);
	}
	has(num) {
		return this._set.has(num);
	}
	hideRef(isForced = false) {
		if(!isForced && !Cfg.hideRefPsts || !this.hasMap || this._isHidden) {
			return;
		}
		this._isHidden = true;
		for(const num of this._set) {
			const post = pByNum.get(num);
			if(post && !post.isHidden) {
				if(isForced) {
					post.setUserVisib(true, true, 'reference to >>' + this._post.num);
					post.ref.hideRef(true);
				} else if(!post.userToggled) {
					post.setVisib(true, 'reference to >>' + this._post.num);
					post.ref.hideRef();
				}
			}
		}
	}
	initPostRef(tUrl, strNums) {
		let html = '';
		for(const num of this._set) {
			html += this._getHTML(num, tUrl, strNums?.has(num));
		}
		this._createEl(html, false);
		this._isInited = true;
	}
	makeUnion(oRef) {
		this._set = new Set([...this._set, ...oRef._set].sort((a, b) => a - b));
	}
	removeLink(num) {
		this._set.delete(num);
		if(!this._set.size) {
			this.removeMap();
		} else {
			const el = this.getElByNum(num);
			if(el) {
				$del(el.nextSibling);
				el.remove();
			}
		}
	}
	removeMap() {
		this._set = new Set();
		this._el.remove();
		delete this._el;
		this.hasMap = false;
	}
	toggleRef(isHide, isForced) {
		if(isHide) {
			this.hideRef(isForced);
		} else {
			this.unhideRef(isForced);
		}
	}
	unhideRef(isForced = false) {
		if(this._isHidden && !this.hasMap) {
			return;
		}
		this._isHidden = false;
		for(const num of this._set) {
			const post = pByNum.get(num);
			if(post && post.isHidden && !post.spellHidden) {
				if(isForced) {
					post.setUserVisib(false);
					post.ref.unhideRef(true);
				} else if(!post.userToggled) {
					post.setVisib(false);
					post.ref.unhideRef();
				}
			}
		}
	}

	get _el() {
		let value = $q('.de-refmap', this._post.el);
		if(!value) {
			this._createEl('', this._post.isHidden);
			value = $q('.de-refmap', this._post.el);
		}
		Object.defineProperty(this, '_el', { value, configurable: true });
		return value;
	}
	_createEl(innerHTML, isHidden) {
		let el;
		const { msg } = this._post;
		const html = `<div class="de-refmap${
			isHidden ? ' de-post-hiddencontent' : '' }">${ innerHTML }</div>`;
		if(aib.dobrochan && (el = msg.nextElementSibling)) {
			el.insertAdjacentHTML('beforeend', html);
		} else {
			msg.insertAdjacentHTML('afterend', html);
		}
	}
	_getHTML(num, tUrl, isHidden) {
		return `<a href="${ tUrl }${ aib.anchor }${ num }" class="de-link-backref${
			isHidden ? ' de-link-hid' : '' }${ MyPosts.has(num) ? ' de-ref-you' : ''
		}">&gt;&gt;${ num }</a><span class="de-refcomma">, </span>`;
	}
}

/* ==[ Threads.js ]===========================================================================================
                                                   THREADS
=========================================================================================================== */

class Thread {
	constructor(el, num, prev, form) {
		this.hasNew = false;
		this.hidCounter = 0;
		this.isFav = false;
		this.isHidden = false;
		this.loadCount = 0;
		this.next = null;
		this.num = num;
		const els = $Q(aib.qPost, el);
		const len = els.length;
		const omt = aib.t ? 1 : aib.getOmitted($q(aib.qOmitted, el), len);
		this.pcount = omt + len;
		this.el = el;
		this.prev = prev;
		this.form = form;
		this._lastModified = '';
		if(prev) {
			prev.next = this;
		}
		let lastPost = this.op = new Post(aib.getOp(el), this, num, 0, true, prev ? prev.last : null);
		pByEl.set(el, lastPost);
		for(let i = 0; i < len; ++i) {
			const pEl = els[i];
			lastPost = new Post(pEl, this, aib.getPNum(pEl), omt + i, false, lastPost);
		}
		this.last = lastPost;
		el.setAttribute('de-thread', null);
		visPosts = Math.max(visPosts, len);
		if(localData) {
			return;
		}
		this.btns = $bEnd(el, `<div class="de-thr-buttons">${ Post.getPostBtns(true, true) }
			<span class="de-thr-updater">[<a class="de-thr-updater-link de-abtn" href="#"></a>` +
			(!aib.t ? ']</span>' : '<span id="de-updater-count" style="display: none;"></span>]</span>') +
			'</div>');
		['click', 'mouseover'].forEach(e => this.btns.addEventListener(e, this));
		[this.btnHide,, this.btnFav, this.btnUpd] = [...this.btns.children];
		if(!aib.t && Cfg.hideReplies) {
			this.btnReplies = $bEnd(this.btns,
				' <span class="de-btn-replies">[<a class="de-abtn" href="#"></a>]</span>');
			this._toggleReplies();
		}
	}
	static get first() {
		return DelForm.first.firstThr;
	}
	static get last() {
		return DelForm.last.lastThr;
	}
	static removeSavedData() {
		// TODO: remove relevant spells, hidden posts and user posts
	}
	get bottom() {
		return this.isHidden || Cfg.hideReplies ? this.op.bottom : this.last.bottom;
	}
	get lastNotDeleted() {
		let post = this.last;
		while(post.isDeleted) {
			post = post.prev;
		}
		return post;
	}
	get nextNotHidden() {
		let thr;
		for(thr = this.next; thr?.isHidden; thr = thr.next) /* empty */;
		return thr;
	}
	get prevNotHidden() {
		let thr;
		for(thr = this.prev; thr?.isHidden; thr = thr.prev) /* empty */;
		return thr;
	}
	get top() {
		return this.op.top;
	}
	get userTouched() {
		const value = new Map();
		Object.defineProperty(this, 'userTouched', { value });
		return value;
	}
	deletePosts(post, delAll, isRemovePost) {
		SpellsRunner.cachedData = null;
		let count = 0;
		do {
			if(isRemovePost && this.last === post) {
				this.last = post.prev;
			}
			post.deletePost(isRemovePost);
			post = post.nextNotDeleted;
			count++;
		} while(delAll && post);
		for(let tPost = post; tPost; tPost = tPost.nextInThread) {
			if(!tPost.isDeleted) {
				tPost.count -= count;
				tPost.counterEl.textContent = tPost.count + 1;
			}
		}
		this.pcount -= count;
		return post;
	}
	handleEvent(e) {
		e.preventDefault();
		const el = nav.fixEventEl(e.target);
		const elClass = el.classList[0];
		const nextThr = this.next;
		let oldCoord = false;
		if(e.type === 'click') {
			switch(elClass) {
			case 'de-btn-fav': this.toggleFavState(true); break;
			case 'de-btn-fav-sel': this.toggleFavState(false); break;
			case 'de-btn-hide':
			case 'de-btn-hide-user':
			case 'de-btn-unhide-user':
				oldCoord = nextThr?.top;
				this.op.setUserVisib(!this.isHidden);
				break;
			case 'de-btn-reply': pr.showQuickReply(this.last, this.num, false, false, true); break;
			case 'de-btn-replies':
			case 'de-replies-show':
			case 'de-replies-hide':
				oldCoord = !nextThr || this.last.isOmitted ? null : nextThr.top;
				this._toggleReplies();
				break;
			case 'de-thr-collapse':
			case 'de-thr-collapse-link': this.loadPosts(visPosts, true); break;
			case 'de-thr-updater':
			case 'de-thr-updater-link':
				if(aib.t) {
					updater.forceLoad();
				} else {
					this.loadPosts('new');
				}
			}
			if(oldCoord) {
				scrollTo(deWindow.pageXOffset, deWindow.pageYOffset + nextThr.top - oldCoord);
			}
		} else if(e.type === 'mouseover') {
			switch(el.classList[0]) {
			case 'de-btn-reply':
				this.btns.title = Lng.replyToThr[lang];
				quotedText = deWindow.getSelection().toString();
				return;
			case 'de-btn-hide':
			case 'de-btn-hide-user':
			case 'de-btn-unhide':
			case 'de-btn-unhide-user': this.btns.title = Lng.toggleThr[lang]; return;
			case 'de-btn-fav': this.btns.title = Lng.addFav[lang]; return;
			case 'de-btn-fav-sel': this.btns.title = Lng.delFav[lang]; return;
			default: this.btns.removeAttribute('title');
			}
		}
	}
	/*
	* Thread loading via ajax.
	*   Calls from the list of threads, not in a thread.
	*   Adds posts to current thread accoring to task:
	* @param {String|Number} task
	*   'new'    - get new posts,
	*   'all'    - get all posts,
	*   'more'   - show 10 omitted posts + get new posts
	*   {number} - get last N posts
	* @param {Boolean} isSmartScroll - keeps the scroll position relative to the next thread.
	* @param {Boolean} isInformUser - shows a popup with waiting animation
	* @returns {Promise} - resolves with null, to chain with function when loading ends
	*/
	loadPosts(task, isSmartScroll = false, isInformUser = true) {
		if(isInformUser) {
			$popup('load-thr', Lng.loading[lang], true);
		}
		return ajaxPostsLoad(aib.b, this.num, false).then(
			pBuilder => this._loadFromBuilder(task, isSmartScroll, pBuilder),
			err => $popup('load-thr', getErrorMessage(err)));
	}
	/*
	* New posts loading via ajax.
	*  Calls by thread updater, by clicking on >>[Get new posts] button, and after sending a reply.
	*  Adds new posts to the end of current thread.
	*  @returns {Promise} - resolves with Object, { newCount: Number, locked: Boolean }
	*/
	loadNewPosts() {
		return ajaxPostsLoad(aib.b, this.num, true)
			.then(pBuilder => pBuilder ? this._loadNewFromBuilder(pBuilder) : { newCount: 0, locked: false });
	}
	toggleFavState(isEnable, preview = null) {
		let host, board, num, cnt, txt, last;
		if(preview) {
			preview.toggleFavBtn(isEnable);
		}
		if(!preview || preview.num === this.num) { // Oppost or usual preview
			this.op.toggleFavBtn(isEnable);
			this.isFav = isEnable;
			({ host, b: board } = aib);
			({ num } = this);
			cnt = this.pcount;
			txt = this.op.title;
			last = aib.anchor + this.last.num;
		} else { // Loaded preview for oppost in remote thread
			({ host } = aib);
			({ board, num } = preview);
			cnt = preview.remoteThr.pcount;
			txt = preview.remoteThr.title;
			last = aib.anchor + preview.remoteThr.lastNum;
		}
		readFavorites().then(favObj => {
			if(isEnable) {
				let entry = favObj[host] || (favObj[host] = {});
				entry = entry[board] || (entry[board] = {});
				entry.url = aib.prot + '//' + aib.host + aib.getPageUrl(board, 0);
				const url = aib.getThrUrl(board, num);
				entry[num] = { cnt, new: 0, you: 0, txt, url, last, time: Date.now() };
			} else {
				removeFavEntry(favObj, host, board, num);
			}
			sendStorageEvent('__de-favorites', [host, board, num, favObj, isEnable ? 'add' : 'delete']);
			saveRenewFavorites(favObj);
		});
	}
	updateHidden(data) {
		let thr = this;
		do {
			const realHid = data ? $hasProp(data, thr.num) : false;
			if(thr.isHidden ^ realHid) {
				if(realHid) {
					thr.op.setUserVisib(true, false);
					data[thr.num] = thr.op.title;
				} else if(thr.isHidden) {
					thr.op.setUserVisib(false, false);
				}
			}
		} while((thr = thr.next));
	}

	_addPost(parent, el, i, prev, maybeVParser) {
		const num = aib.getPNum(el);
		const wrap = doc.adoptNode(aib.getPostWrap(el, false));
		const post = new Post(el, this, num, i, false, prev);
		parent.append(wrap);
		if(aib.t && !doc.hidden && Cfg.animation) {
			$animate(el, 'de-post-new');
		}
		if(this.userTouched.has(num)) {
			post.setUserVisib(this.userTouched.get(num), false);
			this.userTouched.delete(num);
		} else if(HiddenPosts.has(num)) {
			HiddenPosts.hideHidden(post, num);
		}
		if(maybeVParser.value) {
			maybeVParser.value.parse(post);
		}
		processImgInfoLinks(post);
		post.addFuncs();
		ContentLoader.preloadImages(post);
		if(aib.t && Cfg.markNewPosts) {
			Post.addMark(el, false);
		}
		if(aib.fixKCUnixFilenames && post.images.hasAttachments) {
			aib.fixKCUnixFilenames(post);
		}
		return post;
	}
	_checkBans(pBuilder) {
		if(!aib.qBan) {
			return;
		}
		for(const [banId, bNum, bEl] of pBuilder.bannedPostsData()) {
			const post = bNum ? pByNum.get(bNum) : this.op;
			if(post && post.banned !== banId) {
				$del($q(aib.qBan, post.el));
				post.msg.append(bEl);
				post.banned = banId;
			}
		}
	}
	_importPosts(last, pBuilder, begin, end, maybeVParser, maybeSpells) {
		const nums = [];
		const newCount = end - begin;
		let newVisCount = newCount;
		let fragm;
		if(aib.JsonBuilder && nav.hasTemplate) {
			const html = [];
			for(let i = begin; i < end; ++i) {
				html.push(pBuilder.getPostHTML(i));
				nums.push(pBuilder.getPNum(i));
			}
			const temp = doc.createElement('template');
			temp.innerHTML = aib.fixHTML(html.join(''));
			fragm = temp.content;
			const posts = $Q(aib.qPost, fragm);
			for(let i = 0, len = posts.length; i < len; ++i) {
				last = this._addPost(fragm, posts[i], begin + i + 1, last, maybeVParser);
				newVisCount -= maybeSpells.value.runSpells(last);
				embedPostMsgImages(last.el);
			}
		} else {
			fragm = doc.createDocumentFragment();
			for(; begin < end; ++begin) {
				last = this._addPost(fragm, pBuilder.getPostEl(begin), begin + 1, last, maybeVParser);
				nums.push(last.num);
				newVisCount -= maybeSpells.value.runSpells(last);
				embedPostMsgImages(last.el);
			}
		}
		return [newCount, newVisCount, fragm, last, nums];
	}
	_loadFromBuilder(last, smartScroll, pBuilder) {
		let nextCoord;
		const maybeSpells = new Maybe(SpellsRunner);
		if(smartScroll) {
			if(this.next) {
				nextCoord = this.next.top;
			} else {
				smartScroll = false;
			}
		}
		const { op, el: thrEl } = this;
		$del($q(aib.qOmitted + ', .de-omitted', thrEl));
		if(this.loadCount === 0) {
			if(op.trunc) {
				op.updateMsg(pBuilder.getOpMessage(), maybeSpells.value);
			}
			op.ref.removeMap();
		}
		this.loadCount++;
		this._parsePosts(pBuilder);
		let needToHide, needToOmit, needToShow;
		let post = op.next;
		let needRMUpdate = false;
		const hasPosts = post && this.pcount > 1;
		let existed = hasPosts ? this.pcount - post.count : 0;
		switch(last) {
		case 'new': // get new posts
			needToHide = $Q('.de-hidden', thrEl).length;
			needToOmit = hasPosts ? needToHide + post.count - 1 : 0;
			needToShow = pBuilder.length - needToOmit;
			break;
		case 'all': // get all posts
			needToHide = needToOmit = 0;
			needToShow = pBuilder.length;
			break;
		case 'more': // show 10 omitted posts + get new posts
			needToHide = $Q('.de-hidden', thrEl).length - 10;
			needToOmit = Math.max(hasPosts ? needToHide + post.count - 1 : 0, 0);
			needToHide = Math.max(needToHide, 0);
			needToShow = pBuilder.length - needToOmit;
			break;
		default: // get last posts
			needToHide = Math.max(existed - last, 0);
			needToOmit = Math.max(pBuilder.length - last, 0);
			needToShow = last;
		}
		if(needToHide) {
			while(existed-- !== needToShow) {
				post.wrap.classList.add('de-hidden');
				post.isOmitted = true;
				post = post.next;
			}
		} else {
			const nonExisted = pBuilder.length - existed;
			const maybeVParser = new Maybe(Cfg.embedYTube ? VideosParser : null);
			const [,, fragm, last, nums] = this._importPosts(
				op, pBuilder,
				Math.max(0, nonExisted + existed - needToShow),
				nonExisted,
				maybeVParser,
				maybeSpells);
			if(maybeVParser.hasValue) {
				maybeVParser.value.endParser();
			}
			op.wrap.after(fragm);
			DollchanAPI.notify('newpost', nums);
			last.next = post;
			if(post) {
				post.prev = last;
			}
			needRMUpdate = true;
			needToShow = Math.min(nonExisted + existed, needToShow);
		}
		while(existed-- !== 0) {
			if(post.trunc) {
				const newMsg = doc.adoptNode($q(aib.qPostMsg, pBuilder.getPostEl(post.count - 1)));
				post.updateMsg(aib.fixHTML(newMsg), maybeSpells.value);
			}
			if(post.isOmitted) {
				post.wrap.classList.remove('de-hidden');
				post.isOmitted = false;
			}
			if(needRMUpdate) {
				RefMap.updateRefMap(post, true);
			}
			post = post.next;
		}
		if(maybeSpells.hasValue) {
			maybeSpells.value.endSpells();
		}
		const btns = this._moveBtnsToEnd();
		if(!$q('.de-thr-collapse', btns)) {
			btns.insertAdjacentHTML('beforeend',
				`<span class="de-thr-collapse"> [<a class="de-thr-collapse-link de-abtn" href="${
					aib.getThrUrl(aib.b, this.num) }"></a>]</span>`);
		}
		if(needToShow > visPosts) {
			thrNavPanel.addThr(this);
			btns.lastChild.style.display = 'initial';
		} else {
			thrNavPanel.removeThr(this);
			$hide(btns.lastChild);
		}
		if(needToOmit > 0) {
			op.el.insertAdjacentHTML('afterend', `<div class="de-omitted">${ needToOmit }</div>`);
		}
		if(smartScroll) {
			scrollTo(deWindow.pageXOffset, deWindow.pageYOffset + this.next.top - nextCoord);
		}
		Pview.updatePosition(false);
		if(Cfg.hideReplies) {
			this.btnReplies.firstElementChild.className = 'de-replies-hide de-abtn';
			if(Cfg.updThrBtns) {
				$show(this.btnUpd);
			}
		}
		closePopup('load-thr');
	}
	_loadNewFromBuilder(pBuilder) {
		const lastOffset = pr.isVisible ? pr.top : null;
		const [newPosts, newVisPosts] = this._parsePosts(pBuilder);
		this._moveBtnsToEnd();
		if(lastOffset !== null) {
			scrollTo(deWindow.pageXOffset, deWindow.pageYOffset + pr.top - lastOffset);
		}
		if(newPosts !== 0 || Panel.isNew) {
			Panel.updateCounter(
				pBuilder.length + 1 - (Cfg.panelCounter === 2 ? this.hidCounter : 0),
				$Q(`.de-reply:not(.de-post-removed) ${
					aib.qPostImg }, .de-oppost ${ aib.qPostImg }`, this.el).length,
				pBuilder.postersCount);
			Pview.updatePosition(true);
		}
		if(pBuilder.isClosed) {
			AjaxCache.clearCache();
		}
		return { newCount: newVisPosts, locked: pBuilder.isClosed };
	}
	_moveBtnsToEnd() {
		const { btns, el } = this;
		if(btns !== el.lastChild) {
			el.append(btns);
		}
		return btns;
	}
	_parsePosts(pBuilder) {
		this._checkBans(pBuilder);
		let newPosts = 0;
		let newVisPosts = 0;
		let post = this.lastNotDeleted;
		const len = pBuilder.length;
		const maybeSpells = new Maybe(SpellsRunner);
		const maybeVParser = new Maybe(Cfg.embedYTube ? VideosParser : null);
		const { count } = post;
		if(count !== 0 && (aib.dobrochan || count > len || pBuilder.getPNum(count - 1) !== post.num)) {
			post = this.op.nextNotDeleted;
			let i = post.count - 1;
			let firstChangedPost = null;
			for(; i < len && post;) {
				const { num, prev } = post;
				const iNum = pBuilder.getPNum(i);
				if(num === iNum) {
					i++;
					post = post.nextNotDeleted;
					continue;
				}
				if(num <= iNum) {
					if(!firstChangedPost) {
						firstChangedPost = post;
					}
					post = this.deletePosts(post, false, !aib.t);
					continue;
				}
				if(!firstChangedPost) {
					firstChangedPost = prev;
				}
				let cnt = 0;
				do {
					cnt++;
					i++;
				} while(pBuilder.getPNum(i) < num);
				const res = this._importPosts(prev, pBuilder, i - cnt, i, maybeVParser, maybeSpells);
				newPosts += res[0];
				this.pcount += res[0];
				newVisPosts += res[1];
				prev.wrap.after(res[2]);
				res[3].next = post;
				post.prev = res[3];
				DollchanAPI.notify('newpost', res[4]);
				for(let temp = post; temp; temp = temp.nextInThread) {
					temp.count += cnt;
				}
			}
			if(i === len && post) {
				this.deletePosts(post, true, !aib.t);
			}
			if(firstChangedPost && maybeSpells.hasValue && maybeSpells.value.hasNumSpell) {
				for(post = firstChangedPost.nextInThread; post; post = post.nextInThread) {
					maybeSpells.value.runSpells(post);
				}
			}
			if(newPosts !== 0) {
				for(post = firstChangedPost; post; post = post.nextInThread) {
					RefMap.updateRefMap(post, true);
				}
			}
		}
		if(len + 1 > this.pcount) {
			const res = this._importPosts(this.last, pBuilder, this.lastNotDeleted.count,
				len, maybeVParser, maybeSpells);
			newPosts += res[0];
			newVisPosts += res[1];
			(aib.qPostsParent ? $q(aib.qPostsParent, this.el) : this.el).append(res[2]);
			this.last = res[3];
			DollchanAPI.notify('newpost', res[4]);
			this.pcount = len + 1;
		}
		updateFavorites(this.op.num, [this.pcount, this.last.num], 'update');
		if(maybeVParser.hasValue) {
			maybeVParser.value.endParser();
		}
		if(maybeSpells.hasValue) {
			maybeSpells.value.endSpells();
		}
		return [newPosts, newVisPosts];
	}
	_toggleReplies() {
		const isHide = !this.last.isOmitted;
		let post = this.op;
		let i = 0;
		for(; post !== this.last; ++i) {
			(post = post.next).isOmitted = isHide;
			post.wrap.classList.toggle('de-hidden', isHide);
		}
		this.btnReplies.firstElementChild.className =
			`${ isHide ? 'de-replies-show' : 'de-replies-hide' } de-abtn`;
		this.btns.children.forEach(el => el !== this.btnReplies && $toggle(el, !isHide));
		$del($q(aib.qOmitted + ', .de-omitted', this.el));
		i = this.pcount - 1 - (isHide ? 0 : i);
		if(i) {
			this.op.el.insertAdjacentHTML('afterend', `<span class="de-omitted">${ i }</span> `);
		}
	}
}

const thrNavPanel = {
	addThr(thr) {
		this._thrs.add(thr.el);
		if(this._thrs.size === 1) {
			doc.defaultView.addEventListener('scroll', this);
		}
		if(!this._visible) {
			this._checkThreads();
		}
	},
	handleEvent(e) {
		switch(e.type) {
		case 'scroll': deWindow.requestAnimationFrame(() => this._checkThreads()); break;
		case 'mouseover': this._expandCollapse(true, nav.fixEventEl(e.relatedTarget)); break;
		case 'mouseout': this._expandCollapse(false, nav.fixEventEl(e.relatedTarget)); break;
		case 'click': this._handleClick(e); break;
		}
	},
	initThrNav() {
		const el = $bEnd(docBody, `
		<div id="de-thr-navpanel" class="de-thr-navpanel-hidden" style="display: none;">
			<svg id="de-thr-navarrow"><use xlink:href="#de-symbol-thr-nav-arrow"/></svg>
			<div id="de-thr-navup">
				<svg viewBox="0 0 24 24"><use xlink:href="#de-symbol-thr-nav-up"/></svg>
			</div>
			<div id="de-thr-navdown">
				<svg viewBox="0 0 24 24"><use xlink:href="#de-symbol-thr-nav-down"/></svg>
			</div>
		</div>`);
		['mouseover', 'mouseout', 'click'].forEach(e => el.addEventListener(e, this, true));
		this._el = el;
		this._thrs = new Set();
	},
	removeThr(thr) {
		this._thrs.delete(thr.el);
		if(!this._thrs.size) {
			$hide(this._el);
			this._currentThr = null;
			this._visible = false;
			doc.defaultView.removeEventListener('scroll', this);
		}
	},

	_currentThr : null,
	_el         : null,
	_toggleTO   : 0,
	_thrs       : null,
	_visible    : false,
	_checkThreads() {
		const el = this._findCurrentThread();
		if(el) {
			if(!this._visible) {
				this._toggleNavPanel(false);
			}
			this._currentThr = el;
		} else if(this._visible) {
			this._toggleNavPanel(true);
		}
	},
	_expandCollapse(isExpand, rt) {
		if(!rt || !this._el.contains(rt.farthestViewportElement || rt)) {
			clearTimeout(this._toggleTO);
			this._toggleTO = setTimeout(() => this._el.classList.toggle('de-thr-navpanel-hidden', !isExpand),
				Cfg.linksOver);
		}
	},
	_findCurrentThread() {
		Object.defineProperty(this, '_findCurrentThread', {
			value: 'elementsFromPoint' in doc ?
				() => doc.elementsFromPoint(Post.sizing.wWidth / 2, Post.sizing.wHeight / 2)
					.find(el => this._thrs.has(el)) :
				() => {
					let el = doc.elementFromPoint(Post.sizing.wWidth / 2, Post.sizing.wHeight / 2);
					while(el) {
						if(this._thrs.has(el)) {
							return el;
						}
						el = el.parentElement;
					}
					return undefined;
				}
		});
		return this._findCurrentThread();
	},
	_handleClick(e) {
		const el = nav.fixEventEl(e.target);
		switch((el.tagName.toLowerCase() === 'svg' ? el.parentNode : el).id) {
		case 'de-thr-navup':
			scrollTo(deWindow.pageXOffset, deWindow.pageYOffset +
				this._currentThr.getBoundingClientRect().top - 50);
			break;
		case 'de-thr-navdown':
			scrollTo(deWindow.pageXOffset, deWindow.pageYOffset +
				this._currentThr.getBoundingClientRect().bottom - Post.sizing.wHeight + 50);
			break;
		}
	},
	_toggleNavPanel(isHide) {
		this._el.style.display = isHide ? 'none' : 'initial';
		this._visible = !isHide;
	}
};

/* ==[ ThreadUpdater.js ]=====================================================================================
                                                THREAD UPDATER
=========================================================================================================== */

function initThreadUpdater(title, enableUpdate) {
	let focusLoadTime;
	let disabledByUser = true;
	let enabled = false;
	let repliesToYou = new Set();
	let lastECode = 200;
	let newPosts = 0;
	let paused = false;
	let sendError = false;
	const storageName = `de-lastpcount-${ aib.b }-${ aib.t }`;

	const audio = {
		enabled  : false,
		repeatMS : 0,
		disableAudio() {
			this.stopAudio();
			this.enabled = false;
			const btn = $id('de-panel-audio-on');
			if(btn) {
				btn.id = 'de-panel-audio-off';
			}
		},
		playAudio() {
			this.stopAudio();
			if(this.repeatMS === 0) {
				this._el.play();
				return;
			}
			this._playInterval = setInterval(() => this._el.play(), this.repeatMS);
		},
		stopAudio() {
			if(this._playInterval) {
				clearInterval(this._playInterval);
				this._playInterval = null;
			}
		},

		get _el() {
			const value = doc.createElement('audio');
			value.setAttribute('preload', 'auto');
			value.src = gitRaw + 'signal.ogg';
			Object.defineProperty(this, '_el', { value });
			return value;
		}
	};

	const counter = {
		count(delayMS, useCounter, callback) {
			if(!this._enabled || !useCounter) {
				this._countingTO = setTimeout(() => {
					this._countingTO = null;
					callback();
				}, delayMS);
				return;
			}
			let seconds = delayMS / 1e3;
			this._set(seconds);
			this._countingIV = setInterval(() => {
				seconds--;
				if(seconds === 0) {
					this._stopCounter();
					callback();
				} else {
					this._set(seconds);
				}
			}, 1e3);
		},
		disableCounter() {
			this._enabled = false;
			this._stopCounter();
			$hide(this._el);
		},
		enableCounter() {
			this._enabled = true;
			$show(this._el);
		},
		setWait() {
			this._stopCounter();
			if(this._enabled) {
				this._el.innerHTML = '<svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg>';
			}
		},

		_countingTO : null,
		_countingIV : null,
		_enabled    : false,
		get _el() {
			const value = $id('de-updater-count');
			Object.defineProperty(this, '_el', { value });
			return value;
		},
		_set(seconds) {
			this._el.innerHTML = seconds;
		},
		_stopCounter() {
			if(this._countingIV) {
				clearInterval(this._countingIV);
				this._countingIV = null;
			}
			if(this._countingTO) {
				clearTimeout(this._countingTO);
				this._countingTO = null;
			}
		}
	};

	const favicon = {
		get canBlink() {
			return Cfg.favIcoBlink && !!this.originalIcon;
		},
		get originalIcon() {
			return this._iconEl ? this._iconEl.href : null;
		},
		initIcons() {
			if(this._isInited) {
				return;
			}
			this._isInited = true;
			const icon = new Image();
			icon.onload = e => {
				try {
					this._initIconsHelper(e.target);
				} catch(err) {
					console.warn('Icon error:', err);
				}
			};
			if(aib._4chan) {
				// Due to CORS we cannot apply href to icon.src directly
				$ajax(this._iconEl.href, { responseType: 'blob' }, true).then(xhr => {
					icon.src = 'response' in xhr ?
						deWindow.URL.createObjectURL(xhr.response) : '/favicon.ico';
				});
				return;
			}
			icon.src = this._iconEl.href;
		},
		startBlink(isError) {
			const iconUrl = !this._hasIcons ? this._emptyIcon :
				isError ? this._iconError :
				repliesToYou.size ? this._getIconYou(newPosts) : this._getIconNew(newPosts);
			if(this._blinkInterv) {
				if(this._currentIcon === iconUrl) {
					return;
				}
				clearInterval(this._blinkInterv);
			}
			this._currentIcon = iconUrl;
			this._blinkInterv = setInterval(() => {
				this._isOrigIcon = !this._isOrigIcon;
				this._setIcon(this._isOrigIcon ? this.originalIcon : this._currentIcon);
			}, this._blinkMS);
		},
		stopBlink() {
			if(this._blinkInterv) {
				clearInterval(this._blinkInterv);
				this._blinkInterv = null;
			}
			if(!this._isOrigIcon) {
				this._setIcon(this.originalIcon);
				this._isOrigIcon = true;
			}
		},
		updateIcon(isError) {
			if(!isError && !newPosts) {
				this._setIcon(this.originalIcon);
			} else if(this._hasIcons) {
				this._setIcon(isError ? this._iconError :
					repliesToYou.size ? this._getIconYou(newPosts) : this._getIconNew(newPosts));
			}
		},

		_blinkInterv : null,
		_blinkMS     : 800,
		_currentIcon : null,
		_emptyIcon   : 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
		_getIconNew  : () => null,
		_getIconYou  : () => null,
		_hasIcons    : false,
		_iconError   : null,
		_iconsNew    : [],
		_iconsYou    : [],
		_isInited    : false,
		_isOrigIcon  : true,
		get _iconEl() {
			const el = $q('link[rel="shortcut icon"]', doc.head) ||
				$bEnd(doc.head, '<link href="/favicon.ico" rel="shortcut icon"/>');
			Object.defineProperties(this, {
				_iconEl      : { value: el, writable: true },
				originalIcon : { value: el.href }
			});
			return el;
		},
		_drawCanvCircle(ctx, strokeColor, fillColor, scale) {
			ctx.beginPath();
			ctx.arc(10.5 * scale, 10.5 * scale, 5 * scale, 0, 2 * Math.PI);
			ctx.fillStyle = fillColor;
			ctx.fill();
			ctx.lineWidth = 1;
			ctx.strokeStyle = strokeColor;
			ctx.stroke();
		},
		_drawCanvLines(ctx, line1, line2, color, width, scale) {
			ctx.beginPath();
			ctx.strokeStyle = color;
			ctx.lineWidth = width * scale;
			ctx.moveTo(line1[0] * scale, line1[1] * scale);
			ctx.lineTo(line1[2] * scale, line1[3] * scale);
			ctx.moveTo(line2[0] * scale, line2[1] * scale);
			ctx.lineTo(line2[2] * scale, line2[3] * scale);
			ctx.stroke();
		},
		_drawIconsNewYou(ctx, canvas, id, iconCircle, scale) {
			ctx.putImageData(iconCircle, 0, 0);
			ctx.fillStyle = '#fff';
			if(id) {
				ctx.font = `bold ${ 12 * scale }px Arial`;
				ctx.fillText(id, 7 * scale, 15 * scale);
			} else {
				ctx.fillRect(6 * scale, 9 * scale, 2 * scale, 3 * scale);
				ctx.fillRect(9.5 * scale, 9 * scale, 2 * scale, 3 * scale);
				ctx.fillRect(13 * scale, 9 * scale, 2 * scale, 3 * scale);
			}
			return canvas.toDataURL('image/png');
		},
		_initIconsHelper(icon) {
			const canvas = doc.createElement('canvas');
			const ctx = canvas.getContext('2d');
			const wh = Math.max(icon.naturalHeight, 16 * (deWindow.devicePixelRatio || 1));
			const scale = wh / 16;
			canvas.width = canvas.height = wh;
			ctx.drawImage(icon, 0, 0, wh, wh);
			const original = ctx.getImageData(0, 0, wh, wh);
			// Error (red cross)
			this._drawCanvLines(ctx, [15, 15, 7, 7], [7, 15, 15, 7], '#780000', 3, scale);
			this._drawCanvLines(ctx, [14.5, 14.5, 7.5, 7.5], [7.5, 14.5, 14.5, 7.5], '#fa2020', 1.5, scale);
			this._iconError = canvas.toDataURL('image/png');
			// New posts (green circle)
			ctx.putImageData(original, 0, 0);
			this._drawCanvCircle(ctx, '#174f1d', '#00a000', scale);
			const iconNewCircle = ctx.getImageData(0, 0, wh, wh);
			// Replies to you (blue circle)
			ctx.putImageData(original, 0, 0);
			this._drawCanvCircle(ctx, '#122091', '#1b6df5', scale);
			const iconYouCircle = ctx.getImageData(0, 0, wh, wh);
			this._getIconNew = newPosts => {
				const id = newPosts < 10 ? newPosts : 0;
				return this._iconsNew[id] || (this._iconsNew[id] =
					this._drawIconsNewYou(ctx, canvas, id, iconNewCircle, scale));
			};
			this._getIconYou = newPosts => {
				const id = newPosts < 10 ? newPosts : 0;
				return this._iconsYou[id] || (this._iconsYou[id] =
					this._drawIconsNewYou(ctx, canvas, id, iconYouCircle, scale));
			};
			this._hasIcons = true;
		},
		_setIcon(iconUrl) {
			this._iconEl.remove();
			this._iconEl = $aBegin(doc.head, `<link rel="shortcut icon" href="${ iconUrl }">`);
		}
	};

	const notification = {
		get canShow() {
			return Cfg.desktNotif && this._granted;
		},
		checkPermission() {
			if(Cfg.desktNotif && ('permission' in Notification)) {
				switch(Notification.permission.toLowerCase()) {
				case 'default': this._requestPermission(); break;
				case 'denied': saveCfg('desktNotif', 0);
				}
			}
		},
		closeNotif() {
			if(this._notifEl) {
				this._notifEl.close();
				this._notifEl = null;
			}
		},
		showNotif() {
			const lngQuantity = num => {
				const new10 = num % 10;
				return lang === 1 ? +(num !== 1) :
					new10 > 4 || new10 === 0 || (((num % 100) / 10) | 0) === 1 ? 2 :
					new10 === 1 ? 0 : 1;
			};
			const post = Thread.first.last;
			const toYou = repliesToYou.size;
			const notif = new Notification(`${ aib.dm }/${ aib.b }/${ aib.t }: ${ newPosts } ${
				Lng.newPost[lang][lngQuantity(newPosts)] }. ${
				toYou ? `${ toYou } ${ Lng.youReplies[lang][lngQuantity(toYou)] }.` : '' }`,
			{
				body : Lng.latestPost[lang] + ':\n' + post.text.substring(0, 250).replace(/\s+/g, ' '),
				icon : post.images.firstAttach ? post.images.firstAttach.src : favicon.originalIcon,
				tag  : aib.dm + aib.b + aib.t
			});
			notif.onshow = () => setTimeout(() => notif === this._notifEl && this.closeNotif(), 12e3);
			notif.onclick = () => deWindow.focus();
			notif.onerror = () => {
				deWindow.focus();
				this._requestPermission();
			};
			this._notifEl = notif;
		},

		_closeTO : null,
		_granted : true,
		_notifEl : null,
		_requestPermission() {
			this._granted = false;
			Notification.requestPermission(state => {
				if(state.toLowerCase() === 'denied') {
					saveCfg('desktNotif', 0);
				} else {
					this._granted = true;
				}
			});
		}
	};

	const updMachine = {
		start(needSleep = false, loadOnce = false) {
			if(this._state !== -1) {
				this.stopUpdater(false);
			}
			this._state = 0;
			this._loadOnce = loadOnce;
			this._delay = this._initDelay = Cfg.updThrDelay * 1e3;
			if(!loadOnce) {
				this._setUpdateStatus('on');
			}
			this._makeStep(needSleep);
		},
		stopUpdater(updateStatus = true) {
			if(this._state !== -1) {
				this._state = -1;
				if(this._loadPromise) {
					this._loadPromise.cancelPromise();
					this._loadPromise = null;
				}
				counter.setWait();
				if(updateStatus) {
					this._setUpdateStatus('off');
				}
			}
		},

		_delay       : 0,
		_initDelay   : 0,
		_loadOnce    : false,
		_loadPromise : null,
		_seconds     : 0,
		_state       : -1,
		get _panelButton() {
			const value = $q('a[id^="de-panel-upd"]');
			if(value) {
				Object.defineProperty(this, '_panelButton', { value });
			}
			return value;
		},
		_handleNewPosts(lPosts, err) {
			if(err instanceof CancelError) {
				return;
			}
			infoLoadErrors(err, false);
			const eCode = err instanceof AjaxError ? err.code : 0;
			if(eCode !== 200 && eCode !== 304) {
				if(doc.hidden && favicon.canBlink) {
					favicon.startBlink(true);
				}
				if(eCode === -1 || (eCode === 404 && lastECode === 404)) {
					Thread.removeSavedData(aib.b, aib.t); // Not working yet
					updateTitle(eCode);
					disableUpdater();
				} else {
					this._setUpdateStatus('warn');
					updateTitle(eCode);
					this._makeStep();
				}
				lastECode = eCode;
				updateFavorites(aib.t, getErrorMessage(err), 'error');
				return;
			}
			if(lastECode !== 200) {
				favicon.stopBlink();
				this._setUpdateStatus('on');
				updateTitle(eCode);
			}
			lastECode = eCode;
			if(doc.hidden) {
				if(lPosts !== 0) {
					newPosts += lPosts;
					updateTitle();
					if(favicon.canBlink) {
						favicon.startBlink(false);
					}
					if(notification.canShow) {
						notification.showNotif();
					}
					if(audio.enabled) {
						audio.playAudio();
					}
					sesStorage[storageName] = Thread.first.pcount;
					this._delay = this._initDelay;
				} else if(this._delay !== 12e4) {
					this._delay = Math.min(this._delay + this._initDelay, 12e4);
				}
			}
			this._makeStep();
		},
		_makeStep(needSleep = true) {
			while(true) {
				switch(this._state) {
				case 0:
					if(needSleep) {
						this._state = 1;
						counter.count(this._delay, !doc.hidden, () => this._makeStep());
						return;
					}
					/* falls through */
				case 1:
					counter.setWait();
					this._state = 2;
					this._loadPromise = Thread.first.loadNewPosts().then(
						({ newCount, locked }) =>
							this._handleNewPosts(newCount, locked ? AjaxError.Locked : AjaxError.Success),
						err => this._handleNewPosts(0, err));
					return;
				case 2:
					this._loadPromise = null;
					if(this._loadOnce) {
						this._state = -1;
						return;
					}
					this._state = 0;
					break;
				default:
					console.error('Invalid thread updater state:', this._state, new Error().stack);
					return;
				}
			}
		},
		_setUpdateStatus(status) {
			if(this._panelButton) {
				this._panelButton.id = 'de-panel-upd-' + status;
				this._panelButton.title = Lng.panelBtn[`upd-${ status === 'off' ? 'off' : 'on' }`][lang];
				if(nav.isPresto) {
					this._panelButton.innerHTML =
						'<svg class="de-panel-svg"><use xlink:href="#de-symbol-panel-upd"/></svg>';
				}
			}
		}
	};

	function enableUpdater() {
		enabled = true;
		disabledByUser = paused = false;
		repliesToYou = new Set();
		newPosts = 0;
		focusLoadTime = -1e4;
		notification.checkPermission();
		if(Cfg.updCount) {
			counter.enableCounter();
		}
		favicon.initIcons();
	}

	function disableUpdater() {
		if(enabled) {
			audio.disableAudio();
			counter.disableCounter();
			updMachine.stopUpdater();
			enabled = false;
		}
	}

	function forceLoadPosts() {
		if(enabled && paused) {
			return;
		}
		if(!enabled && !disabledByUser) {
			enableUpdater();
		}
		updMachine.start(false, !enabled);
	}

	function updateTitle(eCode = lastECode) {
		doc.title = (sendError === true ? `{${ Lng.error[lang] }} ` : '') +
			(eCode <= 0 || eCode === 200 ? '' : `{${ eCode }} `) +
			(newPosts ? `[${ newPosts }] ` : '') + title;
		favicon.updateIcon(eCode !== 200 && eCode !== 304);
	}

	doc.addEventListener('visibilitychange', e => {
		if(!doc.hidden) {
			const focusTime = e.timeStamp;
			favicon.stopBlink();
			audio.stopAudio();
			notification.closeNotif();
			newPosts = 0;
			repliesToYou = new Set();
			sendError = false;
			setTimeout(() => {
				updateTitle();
				if(enabled && focusTime - focusLoadTime > 1e4) {
					focusLoadTime = focusTime;
					forceLoadPosts();
				}
			}, 200);
		} else if(Thread.first) {
			Post.clearMarks();
		}
	});
	if(enableUpdate) {
		enableUpdater();
		updMachine.start(true);
	}

	return {
		continueUpdater(needSleep = false) {
			if(enabled && paused) {
				updMachine.start(needSleep);
				paused = false;
			}
		},
		disableUpdater() {
			disabledByUser = true;
			disableUpdater();
		},
		enableUpdater() {
			if(!enabled) {
				enableUpdater();
				updMachine.start();
			}
		},
		forceLoad(e) {
			if(e) {
				e.preventDefault();
			}
			Post.clearMarks();
			if(enabled && paused) {
				return;
			}
			$popup('newposts', Lng.loading[lang], true);
			forceLoadPosts();
		},
		pauseUpdater() {
			if(enabled && !paused) {
				updMachine.stopUpdater();
				paused = true;
			}
		},
		refToYou(pNum) {
			if(doc.hidden) {
				repliesToYou.add(pNum);
			}
		},
		toggle() {
			if(enabled) {
				this.disableUpdater();
			} else {
				this.enableUpdater();
			}
		},
		toggleAudio(repeatMS) {
			if(audio.enabled) {
				audio.stopAudio();
				return (audio.enabled = false);
			}
			audio.repeatMS = repeatMS;
			return (audio.enabled = true);
		},
		toggleCounter(enableCnt) {
			if(enableCnt) {
				counter.enableCounter();
				counter.setWait();
			} else {
				counter.disableCounter();
			}
			forceLoadPosts();
		},
		sendErrNotif() {
			if(Cfg.sendErrNotif && doc.hidden) {
				sendError = true;
				updateTitle();
			}
		}
	};
}

/* ==[ DelForm.js ]===========================================================================================
                                                   DELFORM
=========================================================================================================== */

class DelForm {
	constructor(formEl, pageNum, prev) {
		let thr = null;
		this.el = formEl;
		this.firstThr = null;
		this.lastThr = null;
		this.next = null;
		this.pageNum = pageNum;
		this.prev = prev;
		if(prev) {
			prev.next = this;
			thr = prev.lastThr;
		}
		formEl.setAttribute('de-form', '');
		formEl.removeAttribute('id');
		$delAll('script', this.el);
		const threads = DelForm.getThreads(this.el);
		for(let i = 0, len = threads.length; i < len; ++i) {
			const num = aib.getTNum(threads[i]);
			if(!DelForm.tNums.has(num)) {
				DelForm.tNums.add(num);
				thr = new Thread(threads[i], num, thr, this);
				if(this.firstThr === null) {
					this.firstThr = thr;
				}
				continue;
			}
			const el = threads[i];
			const thrNext = threads[i + 1];
			let elNext = el.nextSibling;
			while(elNext && elNext !== thrNext) {
				elNext.remove();
				elNext = el.nextSibling;
			}
			el.remove();
			console.log('Repeated thread: ' + num);
		}
		if(this.firstThr === null) {
			if(prev) {
				this.lastThr = prev.lastThr;
			}
			return;
		}
		this.lastThr = thr;
	}
	static getThreads(formEl) {
		let threads = $Q(aib.qThread, formEl);
		let len = threads.length;
		if(len === 0) {
			if(localData) {
				threads = $Q('div[de-thread]');
				len = threads.length;
			}
			if(len === 0) {
				threads = DelForm._parseClasslessThreads(formEl);
			}
		}
		return threads;
	}
	static [Symbol.iterator]() {
		return {
			_data: this.first,
			next() {
				const value = this._data;
				if(value) {
					this._data = value.next;
					return { value, done: false };
				}
				return { done: true };
			}
		};
	}

	static _parseClasslessThreads(formEl) {
		let i, len;
		let cThr = doc.createElement('div');
		const threads = [];
		const fNodes = [...formEl.childNodes];
		for(i = 0, len = fNodes.length - 1; i < len; ++i) {
			const el = fNodes[i];
			if(el.tagName === 'HR') {
				el.before(cThr);
				const lastEl = cThr.lastElementChild;
				if(lastEl.tagName === 'BR') {
					el.before(lastEl);
				}
				try {
					aib.getTNum(cThr);
					threads.push(cThr);
				} catch(err) {}
				cThr = doc.createElement('div');
			} else {
				cThr.append(el);
			}
		}
		cThr.append(fNodes[i]);
		formEl.append(cThr);
		return threads;
	}
	get passEl() {
		const value = aib.qDelPassw ? $q(aib.qDelPassw, this.el) : null;
		Object.defineProperty(this, 'passEl', { value });
		return value;
	}
	addStuff() {
		const { el } = this;
		if(Cfg.ajaxPosting && !localData) {
			const delBtn = aib.qDelBtn ? $q(aib.qDelBtn, el) : null;
			if(delBtn) {
				el.onsubmit = e => e.preventDefault();
				delBtn.onclick = e => {
					e.preventDefault();
					pr.closeReply();
					$popup('delete', Lng.deleting[lang], true);
					html5Submit(el, e.target).then(checkDelete)
						.catch(err => $popup('delete', getErrorMessage(err)));
				};
			}
			Logger.log('Init AJAX');
		}
		ContentLoader.preloadImages(el);
		Logger.log('Preload images');
		embedAudioLinks(el);
		Logger.log('Audio links');
		if(Cfg.embedYTube) {
			new VideosParser().parse(el).endParser();
			Logger.log('Video links');
		}
		processImgInfoLinks(el);
		Logger.log('Image names');
		RefMap.initRefMap(this);
		Logger.log('Reflinks map');
	}
}
DelForm.tNums = new Set();

/* ==[ Browser.js ]===========================================================================================
                                      BROWSER DETECTORS AND DEPENDENCIES
=========================================================================================================== */

function checkStorage() {
	try {
		locStorage = deWindow.localStorage;
		sesStorage = deWindow.sessionStorage;
		sesStorage['de-test'] = 1;
	} catch(err) {
		if(typeof unsafeWindow !== 'undefined') {
			locStorage = unsafeWindow.localStorage;
			sesStorage = unsafeWindow.sessionStorage;
		}
	}
	if(!(locStorage && (typeof locStorage === 'object') && sesStorage)) {
		console.error('Webstorage error: please, enable webstorage!');
		return false;
	}
	return true;
}

// Browser identification and browser-specific hacks
function initNavFuncs() {
	const ua = navigator.userAgent;
	const isFirefox = ua.includes('Gecko/');
	const isWebkit = ua.includes('WebKit/');
	const isChrome = isWebkit && ua.includes('Chrome/');
	const isSafari = isWebkit && !isChrome;
	const hasPrestoStorage = !!prestoStorage && !ua.includes('Opera Mobi');
	const canUseFetch = 'AbortController' in deWindow; // Firefox 57+, Chrome 66+, Safari 11.1+
	const hasNewGM = typeof GM !== 'undefined' && typeof GM.xmlHttpRequest === 'function';
	let hasGMXHR, hasOldGM, hasWebStorage, scriptHandler;
	if(hasNewGM) {
		const inf = GM.info;
		const handlerName = inf ? inf.scriptHandler : '';
		if(handlerName === 'FireMonkey') {
			hasGMXHR = false;
			hasOldGM = true;
		} else {
			hasGMXHR = typeof GM.xmlHttpRequest === 'function';
			hasOldGM = false;
		}
		hasWebStorage = false;
		scriptHandler = inf ? handlerName + ' ' + inf.version : 'Greasemonkey';
	} else {
		hasGMXHR = typeof GM_xmlhttpRequest === 'function';
		try {
			hasOldGM = (typeof GM_setValue === 'function') &&
				(!isChrome || !GM_setValue.toString().includes('not supported'));
		} catch(err) {
			hasOldGM = err.message === 'Permission denied to access property "toString"'; // Chrome
		}
		hasWebStorage = !hasOldGM && (isFirefox || ('chrome' in deWindow)) &&
			(typeof chrome === 'object') && !!chrome && !!chrome.storage;
		scriptHandler = hasWebStorage ? 'WebExtension' :
			typeof GM_info === 'undefined' ? isFirefox ? 'Scriptish' : 'Unknown' :
			GM_info.scriptHandler ? `${ GM_info.scriptHandler } ${ GM_info.version }` :
			isFirefox ? 'Greasemonkey' : 'Unknown';
	}
	if(!('requestAnimationFrame' in deWindow)) { // XXX: Opera Presto
		deWindow.requestAnimationFrame = fn => setTimeout(fn, 0);
	}
	let needFileHack = false;
	try {
		new File([''], '');
		if(isFirefox || isSafari) {
			needFileHack = !FormData.prototype.get;
		}
	} catch(err) {
		needFileHack = true;
	}
	if(needFileHack && FormData) { // XXX: Firefox < 39, Chrome < 50, Safari < 11 - FormData hack
		const OrigFormData = FormData;
		const origAppend = FormData.prototype.append;
		FormData = function FormData(form) {
			const rv = form ? new OrigFormData(form) : new OrigFormData();
			rv.append = function append(name, value, fileName = null) {
				if(value instanceof Blob && 'name' in value && fileName === null) {
					return origAppend.call(this, name, value, value.name);
				}
				return origAppend.apply(this, [name, value, fileName]);
			};
			return rv;
		};
		deWindow.File = function File(arr, name) {
			const rv = new Blob(arr);
			rv.name = name;
			return rv;
		};
	}
	nav = {
		canUseFetch,
		canUseFetchBlob  : canUseFetch && !(isChrome && scriptHandler === 'WebExtension'),
		canUseNativeXHR  : true,
		firefoxVer       : isFirefox ? +(ua.match(/Firefox\/(\d+)/) || [0, 0])[1] : 0,
		hasGlobalStorage : hasOldGM || hasNewGM || hasWebStorage || hasPrestoStorage,
		hasGMXHR,
		hasNewGM,
		hasOldGM,
		hasPrestoStorage,
		hasWebStorage,
		isChrome,
		isESNext         : typeof deMainFuncOuter === 'undefined',
		isFirefox,
		isMsEdge         : ua.includes('Edge/'),
		isPresto         : !!deWindow.opera,
		isSafari,
		isWebkit,
		scriptHandler,
		ua               : navigator.userAgent + (isFirefox ? ` [${ navigator.buildID }]` : ''),

		get canPlayMP3() {
			const value = !!new Audio().canPlayType('audio/mpeg;');
			Object.defineProperty(this, 'canPlayMP3', { value });
			return value;
		},
		get hasTemplate() {
			const value = 'content' in doc.createElement('template');
			Object.defineProperty(this, 'hasTemplate', { value });
			return value;
		},
		get hasWorker() {
			let value = false;
			try {
				value = 'Worker' in deWindow && 'URL' in deWindow;
			} catch(err) {}
			if(value && this.isFirefox) {
				value = this.firefoxVer >= 40;
			}
			Object.defineProperty(this, 'hasWorker', { value });
			return value;
		},
		get matchesSelector() {
			const dE = doc.documentElement;
			const func = dE.matches || dE.mozMatchesSelector ||
				dE.webkitMatchesSelector || dE.oMatchesSelector;
			const value = (el, sel) => func.call(el, sel);
			Object.defineProperty(this, 'matchesSelector', { value });
			return value;
		},
		get viewportHeight() {
			const value = doc.compatMode && doc.compatMode === 'CSS1Compat' ?
				() => doc.documentElement.clientHeight : () => docBody.clientHeight;
			Object.defineProperty(this, 'viewportHeight', { value });
			return value;
		},
		get viewportWidth() {
			const value = doc.compatMode && doc.compatMode === 'CSS1Compat' ?
				() => doc.documentElement.clientWidth : () => docBody.clientWidth;
			Object.defineProperty(this, 'viewportWidth', { value });
			return value;
		},
		// XXX: Opera Presto - hack for SVG events
		get fixEventEl() {
			const value = !nav.isPresto ? el => el : el => el?.correspondingUseElement?.ownerSVGElement || el;
			Object.defineProperty(this, 'fixEventEl', { value });
			return value;
		},
		// XXX: Firefox + old Greasemonkey - hack to prevent
		//    'Accessing TypedArray data over Xrays is slow, and forbidden' errors
		getUnsafeUint8Array(data, i, len) {
			let Ctor = Uint8Array;
			if(nav.isFirefox && nav.hasOldGM) {
				try {
					if(!(new Uint8Array(data) instanceof Uint8Array)) {
						Ctor = unsafeWindow.Uint8Array;
					}
				} catch(err) {
					Ctor = unsafeWindow.Uint8Array;
				}
			}
			switch(arguments.length) {
			case 1: return new Ctor(data);
			case 2: return new Ctor(data, i);
			case 3: return new Ctor(data, i, len);
			}
			throw new Error();
		},
		getUnsafeDataView(data, offset) { // XXX: Firefox + old Greasemonkey
			const value = new DataView(data, offset || 0);
			return nav.isFirefox && nav.hasOldGM && !(value instanceof DataView) ?
				new unsafeWindow.DataView(data, offset || 0) : value;
		}
	};
}

/* ==[ BoardDefaults.js ]=====================================================================================
                                             IMAGEBOARD DEFAULTS
=========================================================================================================== */

class BaseBoard {
	constructor(prot, dm) {
		// Imageboard-specific booleans
		this._02ch = false;
		this._2channel = false;
		this._4chan = false;
		this.dobrochan = false;
		this.kohlchan = false;
		this.makaba = false;

		// Query paths
		this.cReply = 'reply';
		this.qBan = null;
		this.qClosed = null;
		this.qDelBtn = 'input[type="submit"]';
		this.qDelForm = '#delform, form[name="delform"]';
		this.qDelPassw = 'input[type="password"], input[name="password"]';
		this.qError = 'h1, h2, font[size="5"]';
		this.qForm = '#postform';
		this.qFormFile = 'tr input[type="file"]';
		this.qFormPassw = 'tr input[type="password"]';
		this.qFormRedir = 'input[name="postredir"][value="1"]';
		this.qFormRules = '.rules, #rules';
		this.qFormSpoiler = 'input[type="checkbox"][name="spoiler"]'; // Ernstchan
		this.qFormSubm = 'tr input[type="submit"]';
		this.qFormTd = 'td';
		this.qFormTr = 'tr';
		this.qFormTxta = 'tr:not([style*="none"]) textarea:not([style*="display:none"])'; // Makaba
		this.qImgInfo = '.filesize';
		this.qOmitted = '.omittedposts';
		this.qOPost = '.oppost';
		this.qOPostEnd = 'form > table, div > table, div[id^="repl"]';
		this.qPages = 'table[border="1"] > tbody > tr > td:nth-child(2) > a:last-of-type';
		this.qPost = '.reply';
		this.qPostHeader = '.de-post-btns';
		this.qPostImg = '.thumb, .ca_thumb, img[src*="thumb"], img[src*="/spoiler"], img[src^="blob:"]';
		this.qPostMsg = 'blockquote';
		this.qPostName = '.postername, .commentpostername';
		this.qPostSubj = '.filetitle';
		this.qPostTrip = '.postertrip';
		this.qPostRef = '.reflink';
		this.qPostsParent = null;
		this.qTrunc = '.abbrev, .abbr, .shortened';

		// Other propertioes
		this.anchor = '#';
		this.b = '';
		this.dm = dm;
		this.docExt = null;
		this.firstPage = 0;
		this.formHeaders = false;
		this.formParent = 'parent';
		this.hasAltCaptcha = false;
		this.hasArchive = false;
		this.hasCatalog = false;
		this.hasOPNum = false;
		this.hasPicWrap = false;
		this.hasRefererErr = false;
		this.hasTextLinks = false;
		this.host = deWindow.location.hostname;
		this.JsonBuilder = null;
		this.jsonSubmit = false;
		this.markupBB = false;
		this.multiFile = false;
		this.page = 0;
		this.prot = prot;
		this.res = 'res/';
		this.ru = false;
		this.t = false;
		this.timePattern = 'w+dd+m+yyyy+hh+ii+ss';
	}
	get qFormMail() {
		return $match('tr:not([style*="none"]) input:not([type="hidden"]):not([style*="none"])',
			'[name="email"]', '[name="em"]', '[name="field2"]', '[name="sage"]');
	}
	get qFormName() {
		return $match('tr:not([style*="none"]) input:not([type="hidden"]):not([style*="none"])',
			'[name="name"]', '[name="field1"]');
	}
	get qFormSubj() {
		return $match('tr:not([style*="none"]) input:not([type="hidden"]):not([style*="none"])',
			'[name="subject"]', '[name="field3"]');
	}
	get qImgNameLink() {
		const value = $match(this.qImgInfo.split(', ').join(' a, ') + ' a',
			'[href$=".jpg"]', '[href$=".jpeg"]', '[href$=".png"]', '[href$=".gif"]', '[href$=".webm"]',
			'[href$=".webp"]', '[href$=".mp4"]', '[href$=".m4v"]', '[href$=".ogv"]', '[href$=".apng"]',
			', [href^="blob:"]');
		Object.defineProperty(this, 'qImgNameLink', { value });
		return value;
	}
	get qMsgImgLink() { // Sets here only
		const value = $match(this.qPostMsg.split(', ').join(' a, ') + ' a',
			'[href$=".jpg"]', '[href$=".jpeg"]', '[href$=".png"]', '[href$=".gif"]');
		Object.defineProperty(this, 'qMsgImgLink', { value });
		return value;
	}
	get qThread() {
		const value = $q('.thread') ? '.thread' : '[id^="thread"]';
		Object.defineProperty(this, 'qThread', { value });
		return value;
	}
	get captchaAfterSubmit() { // Kohlchan
		return null;
	}
	get captchaInit() {
		return null;
	}
	get captchaLang() { // _410chan
		return this.ru ? 2 : 1;
	}
	get captchaUpdate() {
		return null;
	}
	get catalogUrl() { // Iichan
		return `${ this.prot }//${ this.host }/${ this.b }/catalog.html`;
	}
	get changeReplyMode() {
		return null;
	}
	get css() {
		return '';
	}
	get deleteTruncMsg() {
		return null;
	}
	get fixDeadLinks() { // _4chan
		return null;
	}
	get fixHTMLHelper() {
		return null;
	}
	get fixFileInputs() {
		return null;
	}
	get fixKCUnixFilenames() { // Kohlchan
		return null;
	}
	get getImgRedirectSrc() { // Archived
		return null;
	}
	get getSubmitData() {
		return null;
	}
	get isArchived() {
		return false;
	}
	get lastPage() { // Makaba
		const el = $q(this.qPages);
		let value = el && +aProto.pop.call(el.textContent.match(/\d+/g) || []) || 0;
		if(this.page === value + 1) {
			value++;
		}
		Object.defineProperty(this, 'lastPage', { value });
		return value;
	}
	get markupTags() {
		return this.markupBB ? ['b', 'i', 'u', 's', 'spoiler', 'code'] : ['**', '*', '', '^H', '%%', '`'];
	}
	get observeContent() { // Makaba
		return null;
	}
	get reCrossLinks() { // Sets here only
		const value = new RegExp(`>https?:\\/\\/[^\\/]*${ this.dm }\\/([a-z0-9]+)\\/${
			escapeRegExp(this.res) }(\\d+)(?:[^#<]+)?(?:#i?(\\d+))?<`, 'g');
		Object.defineProperty(this, 'reCrossLinks', { value });
		return value;
	}
	get reportForm() {
		return null;
	}
	get sendHTML5Post() { // Lynxchan
		return null;
	}
	get stormWallFixAjax() { // Iichan
		return null;
	}
	get stormWallFixCaptcha() { // Iichan
		return null;
	}
	get stormWallFixSubmit() { // Iichan
		return null;
	}
	get stormWallHelper() { // Iichan
		return null;
	}
	disableRedirection(el) { // Dobrochan
		$hide(el.closest(aib.qFormTr));
		el.checked = true;
	}
	fixHTML(data, isForm = false) {
		if(!(dTime || Spells.reps || Cfg.crossLinks || Cfg.decodeLinks ||
			this.fixHTMLHelper || this.fixDeadLinks || this.hasTextLinks)
		) {
			return data;
		}
		let str;
		if(typeof data === 'string') {
			str = data;
		} else if(isForm) {
			data.id = 'de-dform-old';
			str = data.outerHTML;
		} else {
			str = data.innerHTML;
		}
		if(dTime) {
			str = dTime.fix(str);
		}
		if(this.fixHTMLHelper) {
			str = this.fixHTMLHelper(str);
		}
		if(this.fixDeadLinks) {
			str = this.fixDeadLinks(str);
		}
		if(this.hasTextLinks) {
			str = str.replace(/(^|>|\s|&gt;)(https*:\/\/[^"<>]*?)(<\/a>)?(?=$|<|\s)/ig,
				(x, a, b, c) => c ? x : `${ a }<a rel="noreferrer" href="${ b }">${ b }</a>`);
		}
		if(Spells.reps) {
			str = Spells.replace(str);
		}
		if(Cfg.crossLinks) {
			str = str.replace(aib.reCrossLinks,
				(_, board, tNum, pNum) => `>&gt;&gt;/${ board }/${ pNum || tNum }<`);
		}
		if(Cfg.decodeLinks) {
			str = str.replace(/>https?:\/\/[^<]+</ig, match => {
				try {
					return decodeURI(match);
				} catch(err) {}
				return match;
			});
		}
		if(typeof data === 'string') {
			return str;
		}
		if(isForm) {
			const newForm = $bBegin(data, str);
			$hide(data);
			deWindow.addEventListener('load', () => $del($id('de-dform-old')));
			return newForm;
		}
		data.innerHTML = str;
		return data;
	}
	fixVideo(isPost, data) {
		const videos = [];
		const els = $Q('embed, object, iframe', isPost ? data.el : data);
		for(let i = 0, len = els.length; i < len; ++i) {
			const el = els[i];
			const src = el.src || el.data;
			if(!src) {
				continue;
			}
			let m = src.match(Videos.ytReg);
			if(m) {
				videos.push([isPost ? data : this.getPostOfEl(el), m, true]);
				$del(el);
			}
			if(Cfg.addVimeo && (m = src.match(Videos.vimReg))) {
				videos.push([isPost ? data : this.getPostOfEl(el), m, false]);
				$del(el);
			}
		}
		return videos;
	}
	getAbsLink(url) { // Sets here only
		return (url[1] === '/' ? this.prot : url[0] === '/' ? this.prot + '//' + this.host : '') + url;
	}
	getBanId(postEl) { // Makaba
		return this.qBan && $q(this.qBan, postEl) ? 1 : 0;
	}
	getCapParent(el) {
		return el.closest(this.qFormTr);
	}
	getCaptchaSrc(src, tNum) {
		const temp = src.replace(/pl$/, 'pl?key=mainpage&amp;dummy=')
			.replace(/dummy=[\d.]*/, 'dummy=' + Math.random());
		return tNum ? temp.replace(/mainpage|res\d+/, 'res' + tNum) : temp.replace(/res\d+/, 'mainpage');
	}
	getImgInfo(wrap) {
		const el = $q(this.qImgInfo, wrap);
		return el ? el.textContent : '';
	}
	getImgRealName(wrap) {
		const el = $q(this.qImgNameLink, wrap);
		return el ? el.title || el.textContent : '';
	}
	getImgSrcLink(img) {
		return img.closest('a');
	}
	getImgWrap(img) {
		return (img.closest('a') || img).parentNode;
	}
	getJsonApiUrl() {}
	getOmitted(el) {
		return +(el && (el.textContent || '').match(/\d+/)) + 1;
	}
	getOp(thr) { // Arhivach
		let op = localData ? $q('.de-oppost', thr) : $q(this.qOPost, thr);
		if(op) {
			return op;
		}
		op = thr.ownerDocument.createElement('div');
		op.classList.add('de-oppost');
		let el;
		const opEnd = $q(this.qOPostEnd, thr);
		while((el = thr.firstChild) && (el !== opEnd)) {
			op.append(el);
		}
		thr.prepend(op);
		return op;
	}
	getPageUrl(board, page) {
		return fixBrd(board) + (page > 0 ? page + this.docExt : '');
	}
	getPNum(post) {
		return +post.id.match(/\d+/);
	}
	getPostElOfEl(el) {
		const sel = this.qPost + ', [de-thread], .de-pview';
		while(el && !nav.matchesSelector(el, sel)) {
			el = el.parentElement;
		}
		return el;
	}
	getPostOfEl(el) { // Sets here only
		return pByEl.get(this.getPostElOfEl(el));
	}
	getPostWrap(el, isOp) {
		if(isOp) {
			return el;
		}
		Object.defineProperty(this, 'getPostWrap',
			{ value: el.tagName === 'TD' ? (el, isOp) => isOp ? el : el.closest('table') : el => el });
		return this.getPostWrap(el, isOp);
	}
	getSage(post) {
		if($q('.sage', post)) {
			return true;
		}
		const el = $q('a[href^="mailto:"], a[href="sage"]', post);
		return !!el && /sage/i.test(el.href);
	}
	getThrUrl(board, tNum) { // Arhivach
		return this.prot + '//' + this.host + fixBrd(board) + this.res + tNum + this.docExt;
	}
	getTNum(thr) {
		return +$q('input[type="checkbox"]', thr).value;
	}
	insertYtPlayer(msg, playerHtml) { // Dobrochan
		return $bBegin(msg, playerHtml);
	}
	isAjaxStatusOK(status) {
		return status === 200 || status === 206;
	}
	isIgnoreError(txt) { // Lynxchan
		return /successful|uploaded|updating|post deleted|post created|обновл|удален[о.]/i.test(txt);
	}
	parseURL() {
		const url = (deWindow.location.pathname || '').replace(/^[/]+/, '').replace(/[/]+/g, '/');
		if(url.match(this.res)) { // We are in thread
			const temp = url.split(this.res);
			this.b = temp[0].replace(/\/$/, '');
			this.t = +temp[1].match(/^[^\d]?\d+/)[0];
			this.page = this.firstPage;
		} else { // We are on board
			const temp = url.match(/\/?(\d+)[^/]*?$/);
			this.page = +temp?.[1] || this.firstPage;
			this.b = url.replace(temp && this.page ? temp[0] : /\/(?:[^/]+\.[a-z]+)?$/, '');
		}
		if(this.docExt === null) {
			this.docExt = (url.match(/\.[a-z]+$/) || ['.html'])[0];
		}
	}
	updateSubmitBtn(el) {
		el.value = Lng.reply[lang];
	}
}

/* ==[ BoardDetector.js ]=====================================================================================
                                             IMAGEBOARD DETECTOR
=========================================================================================================== */

function getImageBoard(checkDomains, checkEngines) {
	const ibDomains = {};
	const ibEngines = [];

	// ENGINES
	ibEngines.push(['form[action$="wakaba.pl"]', BaseBoard]);

	class Kusaba extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);
			this.qError = 'h1, h2, div[style*="1.25em"]';
			this.qFormRedir = 'input[name="redirecttothread"][value="1"]';

			this.formHeaders = true;
			this.formParent = 'replythread';
			this.markupBB = true;
		}
		get css() {
			return `.extrabtns > a, .extrabtns > span, #newposts_get, .replymode,
					.ui-resizable-handle, blockquote + a { display: none !important; }
				.ui-wrapper { display: inline-block; width: auto !important;
					height: auto !important; padding: 0 !important; }`;
		}
		getCaptchaSrc(src) {
			return src.replace(/\?[^?]+$|$/, '?' + Math.random());
		}
		getImgRealName(wrap) {
			const el = $q('.filesize', wrap);
			if(el) {
				const info = el.textContent.split(',');
				if(info.length > 2) {
					return info.pop().replace(')', '');
				}
			}
			return super.getImgRealName(wrap);
		}
		init() {
			const el = $id('posttypeindicator');
			if(el) {
				[el.previousSibling, el.nextSibling, el].forEach($del);
			}
			return false;
		}
	}
	ibEngines.push(['script[src*="kusaba"]', Kusaba], ['form#delform[action$="/board.php"]', Kusaba]);

	class Tinyboard extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);

			this.cReply = 'post reply';
			this.qClosed = '.fa-lock';
			this.qDelForm = 'form[name*="postcontrols"]';
			this.qForm = 'form[name="post"]';
			this.qFormPassw = 'input[name="password"]:not([type="hidden"])';
			this.qFormRedir = null;
			this.qImgInfo = '.fileinfo';
			this.qOmitted = '.omitted';
			this.qOPostEnd = '.post.reply';
			this.qPages = '.pages';
			this.qPostHeader = '.intro';
			this.qPostMsg = '.body';
			this.qPostName = '.name';
			this.qPostRef = '.post_no + a';
			this.qPostSubj = '.subject';
			this.qPostTrip = '.trip';
			this.qTrunc = '.toolong';

			this.firstPage = 1;
			this.formParent = 'thread';
			this.hasCatalog = true;
			this.hasRefererErr = true;
			this.jsonSubmit = true;
			this.timePattern = 'nn+dd+yy++w++hh+ii+ss';
			this._origInputs = null;
		}
		get qImgNameLink() {
			return 'p.fileinfo > a:first-of-type';
		}
		get css() {
			return `.banner, .hide-thread-link, .mentioned,
					.post-hover { display: none !important; }
				div.post.reply:not(.de-entry):not(.de-cfg-tab):not(.de-win-body) {
					float: left !important; clear: left; display: block; }
				${ Cfg.imgNames ? `.postfilename, .unimportant > a[download] { display: none }
					.fileinfo > .unimportant { white-space: nowrap; }` : '' }`;
		}
		get markupTags() {
			return ['\'\'\'', '\'\'', '__', '~~', '**', '[code'];
		}
		async changeReplyMode(form, tNum) {
			if(!this._origInputs && !$q('input[name="hash"]', form)) {
				// Board without antibot protection
				pr.subm.value = Lng.reply[lang];
				const pageInp = $q('input[name="page"]', form);
				if(tNum) {
					$del(pageInp);
				} else if(!pageInp) {
					form.insertAdjacentHTML('beforeend', '<input name="page" value="1" type="hidden">');
				}
				return;
			}
			const query = 'div[style="display:none"], input[style="display:none"], ' +
				'span[style="display:none"], textarea[style="display:none"], ' +
				'input[type="hidden"]:not(.de-input-hidden)';
			if(!$q('input[name="thread"]', form)) {
				// Switching from the thread creation to post reply mode occurs. Saving the original fields.
				this._origInputs = [doc.createElement('div'), pr.subm.value];
				$Q(query, form).forEach(el => this._origInputs[0].append(el));
			} else if(!tNum) {
				// Switching from the post reply to thread creation occurs. Restoring the original fields.
				pr.subm.value = this._origInputs[1];
				$delAll(query, form);
				form.insertAdjacentHTML('beforeend', this._origInputs[0].innerHTML);
				this._origInputs = null;
				return;
			}
			// Post reply mode. Loading a thread with a form that contains the correct hidden fields.
			const errFn = () => {
				$popup('load-form', Lng.errFormLoad[lang]);
				pr.closeReply();
			};
			$popup('load-form', Lng.loading[lang], true);
			await ajaxLoad(aib.getThrUrl(this.b, tNum), false).then(loadedDoc => {
				const loadedForm = $q(this.qForm, loadedDoc);
				if(!loadedForm) {
					errFn();
					return;
				}
				pr.subm.value = $q(this.qFormSubm, loadedDoc).value;
				$delAll(query, form);
				$Q(query, loadedForm).forEach(el => form.append(doc.adoptNode(el)));
				closePopup('load-form');
			}, errFn);
		}
		fixHTML(data, isForm) {
			const formEl = super.fixHTML(data, isForm);
			$Q('br.clear', formEl).forEach(brEl => {
				const hr = brEl.nextElementSibling;
				if(hr && hr.tagName === 'HR') {
					brEl.parentNode.after(hr);
				}
				brEl.remove();
			});
			return formEl;
		}
		fixVideo(isPost, data) {
			return Array.from($Q('.video-container, #ytplayer', isPost ? data.el : data), el => {
				const value = [isPost ? data : this.getPostOfEl(el), el.id === 'ytplayer' ?
					el.src.match(Videos.ytReg) : ['', el.getAttribute('data-video')], true];
				el.remove();
				return value;
			});
		}
		getImgRealName(wrap) {
			const el = $q('.postfilename', wrap) ||
				$q('.unimportant > a[download]', wrap) || $q(this.qImgNameLink, wrap);
			return el.title || el.textContent;
		}
		getPageUrl(board, page) {
			return page > 1 ? fixBrd(board) + page + this.docExt : fixBrd(board);
		}
		getSubmitData({ error, id }) {
			return { error, postNum: id && +id };
		}
		getTNum(thr) {
			return +$q('input[type="checkbox"]', thr).name.match(/\d+/);
		}
		init() {
			$script('window.FormData = void 0;');
			const formEl = $q('form[name="post"]');
			if(formEl) {
				formEl.insertAdjacentHTML('beforeend',
					'<input class="de-input-hidden" name="json_response" value="1" type="hidden">');
			}
			return false;
		}
		isAjaxStatusOK(status) {
			return status === 200 || status === 206 || status === 400;
		}
		updateSubmitBtn() {}
	}
	ibEngines.push(['form[name*="postcontrols"]', Tinyboard]);

	class Vichan extends Tinyboard {
		constructor(prot, dm) {
			super(prot, dm);

			this.qDelPassw = '#password';
			this.qPostImg = '.post-image[alt]:not(.deleted)';

			this.multiFile = true;
		}
		get css() {
			return `${ super.css }
				#expand-all-images, #expand-all-images + .unimportant, .fileinfo > span[style*="nowrap;"],
					.post-btn, small, .watchThread { display: none !important; }
				body { padding: 0 5px !important; }
				.boardlist { z-index: 1 !important; }
				.fileinfo { width: 240px; }
				.multifile { width: auto !important; }`;
		}
		fixFileInputs(el) {
			el.innerHTML = Array.from({ length: 5 }, (val, i) =>
				`<div${ i ? ' style="display: none;"' : '' }>` +
				`<input type="file" name="file${ i ? i + 1 : '' }"></div>`
			).join('');
		}
		fixHTMLHelper(str) {
			return str.replace(/"\/player\.php\?v=([^&]+)&[^"]+"/g, '"$1"');
		}
		init() {
			super.init();
			if(locStorage.file_dragdrop !== 'false') {
				locStorage.file_dragdrop = false;
				deWindow.location.reload();
				return true;
			}
			$script('highlightReply = Function.prototype;');
			setTimeout(() => $del($id('updater')), 0);
			const textarea = $id('body');
			if(textarea) {
				textarea.removeAttribute('id');
			}
			return false;
		}
	}
	ibEngines.push(['tr#upload', Vichan]);

	class TinyIB extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);

			this.qError = 'body[align=center] div, div[style="margin-top: 50px;"]';
			this.qPostImg = 'img.thumb, video.thumb';
			this.qPostMsg = '.message';
		}
		get css() {
			return '.replymode { display: none; }';
		}
		fixHTMLHelper(str) {
			return str.replace(/="\.\.\//g, `="/${ this.b }/`);
		}
		getCaptchaSrc(src) {
			return src.replace(/\?[^?]+$|$/, '?' + Math.random());
		}
		getImgWrap(img) {
			return img.parentNode.parentNode.parentNode;
		}
		getImgRealName(wrap) {
			const el = $q('.filesize', wrap);
			if(el) {
				const info = el.textContent.split(',');
				if(info.length > 2) {
					return info.pop().replace(')', '');
				}
			}
			return super.getImgRealName(wrap);
		}
		init() {
			defaultCfg.addTextBtns = 0;
			$Q('.message > .omittedposts').forEach(
				el => $replace(el, '<span class="abbrev">Post too long. <a href="#">Click to view.</a>'));
			return false;
		}
	}
	ibEngines.push(['form[action$="imgboard.php?delete"]', TinyIB]);

	class newTinyIB extends TinyIB {
		constructor(prot, dm) {
			super(prot, dm);

			this.hasCatalog = true;
			this.markupBB = true;
			this.multiFile = true;
			this.timePattern = 'yy+nn+dd+w+hh+ii+ss';
		}
		get fixHTMLHelper() {
			return null;
		}
		fixFileInputs(el) {
			const str = '><input type="file" name="file[]"></div>';
			el.innerHTML = '<div' + str + ('<div style="display: none;"' + str).repeat(3);
		}
		getImgRealName(wrap) {
			return $q('.filesize > a', wrap).textContent;
		}
		init() {
			return false;
		}
	}
	ibEngines.push(['body.tinyib', newTinyIB]);

	class Lynxchan extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);

			this.cReply = 'innerPost';
			this.qDelBtn = '#deleteFormButton';
			this.qDelForm = 'form[action$="contentActions.js"]';
			this.qError = '#errorLabel, #labelMessage';
			this.qForm = '.form-post, form[action$="newThread.js"], form[action$="replyThread.js"]';
			this.qFormPassw = 'input[name="password"]';
			this.qFormRules = '.form-post > .small';
			this.qFormSubm = '#formButton, #de-postform-submit';
			this.qImgInfo = '.uploadDetails';
			this.qOmitted = '.labelOmission';
			this.qOPost = '.innerOP';
			this.qOPostEnd = '.divPosts';
			this.qPages = '#divPages';
			this.qPost = '.innerPost, .markedPost';
			this.qPostHeader = '.postInfo, .de-post-btns';
			this.qPostImg = '.imgLink > img, img[src*="/.media/"]';
			this.qPostMsg = '.divMessage';
			this.qPostRef = '.linkQuote';
			this.qPostSubj = '.labelSubject';
			this.qPostsParent = '.divPosts';
			this.qTrunc = '.contentOmissionIndicator';

			this.firstPage = 1;
			this.formParent = 'threadId';
			this.hasCatalog = true;
			this.jsonSubmit = true;
			this.multiFile = true;

			this._hasNewAPI = false;
		}
		get qImgNameLink() {
			return '.originalNameLink';
		}
		get qThread() {
			return '.opCell';
		}
		get css() {
			return `.de-video-link + div[style="display: inline;"] > .embedButton, .de-parea > hr,
					.divRefresh, #jsButton, .hideButton, .nameLink, #newPostFieldset, .panelBacklinks,
					.quoteTooltip, body > div[style^="display: inline;"] { display: none !important; }
				.divPosts { margin: 0 0; }
				#formButton { display: initial !important; }
				.form-post button, .form-post input, .form-post img { width: initial; }`;
		}
		get markupTags() {
			return ['\'\'\'', '\'\'', '__', '~~', '**', '[code'];
		}
		captchaUpdate() {
			$script('reloadCaptcha();');
			return null;
		}
		changeReplyMode(form, tNum) {
			const action = form.getAttribute('action');
			form.setAttribute('action', tNum ? action.replace('newThread', 'replyThread') :
				action.replace('replyThread', 'newThread'));
		}
		fixFileInputs(el) {
			const str = '><input name="files" type="file"></div>';
			const maxEl = $id('labelMaxFiles');
			el.innerHTML = '<div' + str +
				('<div style="display: none;"' + str).repeat((maxEl ? +maxEl.textContent : 3) - 1);
		}
		getCapParent() {
			return $id('captchaDiv');
		}
		getImgRealName(wrap) {
			return $q('.originalNameLink', wrap).textContent;
		}
		getImgSrcLink(img) {
			return $q('.originalNameLink', this.getImgWrap(img));
		}
		getImgWrap(img) {
			return img.closest('figure');
		}
		getPageUrl(board, page) {
			return fixBrd(board) + (page > 1 ? page + this.docExt : 'index.html');
		}
		getPNum(post) {
			return +$q('.deletionCheckBox', post).name.split('-')[2];
		}
		getPostWrap(el, isOp) {
			return isOp ? el : el.parentNode;
		}
		getSubmitData({ status, data }) {
			return {
				error   : status === 'error' ? data : null,
				postNum : status === 'ok' ? +data : null
			};
		}
		getTNum(thr) {
			return +$q('.deletionCheckBox', thr).name.split('-')[1];
		}
		init() {
			$script(`if("autoRefresh" in window) {
					clearInterval(refreshTimer);
				}
				if("thread" in window) {
					if(thread.refreshTimer) {
						clearInterval(thread.refreshTimer);
						Object.defineProperty(thread, "startTimer",
							{ value: Function.prototype, writable: false, configurable: false });
					}
					Object.defineProperty(thread, "changeRefresh",
						{ value: Function.prototype, writable: false, configurable: false });
				}`);
			const submEl = $id('formButton');
			if(submEl) {
				this._hasNewAPI = true;
				$replace(submEl, `<button id="de-postform-submit" type="submit">${
					submEl.innerHTML }</button>`);
			}
			const formEl = $q(this.qForm);
			if(formEl && !$q('td', formEl)) {
				const table = $aBegin($q(this.qForm), '<table><tbody></tbody></table>').firstChild;
				const els = $Q('#captchaDiv, #divUpload, #fieldEmail, #fieldMessage, #fieldName,' +
					' #fieldPostingPassword, #fieldSubject');
				for(let i = 0, len = els.length; i < len; ++i) {
					$bEnd(table, '<tr><th></th><td></td></tr>').lastChild.append(els[i]);
				}
			}
			return false;
		}
		isAjaxStatusOK(status) {
			return status === 200 || status === 206 || status === 400 || status === 500;
		}
		isIgnoreError(txt) {
			try {
				const obj = JSON.parse(txt);
				if(obj.status === 'ok' && obj.data && (obj.data.removedThreads || obj.data.removedPosts)) {
					return true;
				}
			} catch(err) {}
			return false;
		}
		async sendHTML5Post(form, data, needProgress, hasFiles) {
			let ajaxParams;
			if(this._hasNewAPI) {
				ajaxParams = { data, method: 'POST' };
			} else {
				const getBase64 = async file => new Promise((resolve, reject) => {
					const reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = () => resolve(reader.result);
					reader.onerror = err => reject(err);
				});
				const getCookies = () => {
					const obj = {};
					const cookies = doc.cookie.split(';');
					for(let i = 0, len = cookies.length; i < len; ++i) {
						const parts = cookies[i].split('=');
						obj[parts.shift().trim()] = decodeURI(parts.join('='));
					}
					return obj;
				};
				const dataObj = { files: [] };
				const files = [];
				data.forEach(async (value, key) => {
					if(key !== 'files') {
						dataObj[key] = value;
					} else {
						files.push(value);
					}
				});
				for(let i = 0, len = files.length; i < len; ++i) {
					const file = files[i];
					if(file.type) {
						dataObj.files.push({
							content: `data:${ file.type };base64,${
								await getBase64(file).then(data => data.split(',')[1]) }`,
							name    : file.name,
							spoiler : false
						});
					}
				}
				const cookieObj = getCookies();
				ajaxParams = {
					data: JSON.stringify({
						captchaId  : cookieObj.captchaid,
						bypassId   : cookieObj.bypass,
						parameters : dataObj,
						auth       : { login: cookieObj.login, hash: cookieObj.hash }
					}),
					headers : { 'Content-Type': 'application/x-www-form-urlencoded' },
					method  : 'POST'
				};
			}
			if(needProgress && hasFiles) {
				ajaxParams.onprogress = getUploadFunc();
			}
			const task = getFileName(form.attributes.action.value);
			const url = this._hasNewAPI ? `/${ task }?json=1` : '/.api/' + task.replace('.js', '');
			return $ajax(url, ajaxParams).then(xhr => xhr.responseText).catch(err => Promise.reject(err));
		}
		updateSubmitBtn(el) {
			el.textContent = Lng.reply[lang];
		}
	}
	ibEngines.push(['form[action$="contentActions.js"]', Lynxchan]);

	class FoolFuuka extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);

			this.cReply = 'post_wrapper';
			this.qDelForm = '#main';
			this.qImgInfo = '.post_file_metadata, .thread_image_box > .post_file';
			this.qOmitted = '.omitted_text';
			this.qOPostEnd = '.posts';
			this.qPages = '.paginate > ul > li:nth-last-child(3)';
			this.qPost = '.post[id]';
			this.qPostHeader = 'header';
			this.qPostImg = '.post_image, .thread_image';
			this.qPostMsg = '.text';
			this.qPostRef = '.post_data > a[data-function="quote"]';
			this.qPostSubj = '.post_title';
			this.qPostsParent = '.posts';

			this.docExt = '';
			this.firstPage = 1;
			this.res = 'thread/';
		}
		get qImgNameLink() {
			return '.post_file_filename';
		}
		get qThread() {
			return '.thread[id]';
		}
		get css() {
			return `.backlink_list { display: none !important; }
				.de-oppost > .thread_image_box { float: left; margin: 0 20px 10px 15px; text-align: center;
					color: #bfbfbf; font-size: .8em; line-height: 150%; }`;
		}
		get isArchived() {
			return true;
		}
		fixHTMLHelper(str) {
			return str.replace(/\/#(\d+)"/g, '#$1"').replace(/\/post\/(\d+)\/"/g, '/#$1"');
		}
		getImgWrap(img) {
			return img.parentNode.parentNode.parentNode;
		}
		getPageUrl(board, page) {
			return fixBrd(board) + (page > 1 ? `page/${ page }/` : '');
		}
		getTNum(thr) {
			return +thr.getAttribute('data-thread-num');
		}
		init() {
			defaultCfg.ajaxUpdThr = 0;
			const el = $q('.search_box');
			if(el) {
				docBody.append(el);
			}
			return false;
		}
		parseURL() {
			super.parseURL();
			this.page = +(this.b.match(/\/page\/(\d+)/) || [1, 1])[1];
			this.b = this.b.replace(/\/page\/\d+/, '');
		}
	}
	ibEngines.push(['meta[name="generator"][content^="FoolFuuka"]', FoolFuuka]);

	// DOMAINS
	class _02ch extends Kusaba {
		constructor(prot, dm) {
			super(prot, dm);
			this._02ch = true;

			this.hasCatalog = true;
			this._capUpdPromise = null;
		}
		captchaUpdate(cap) {
			return cap.updateHelper('/captcha_update.php', xhr => {
				cap.parentEl.innerHTML = xhr.responseText;
				cap.textEl = $id('recaptcha_response_field');
				cap.initImage($q('img', cap.parentEl));
				cap.initTextEl();
			});
		}
	}
	ibDomains['02ch.su'] = _02ch;

	class _0chan extends Kusaba {
		constructor(prot, dm) {
			super(prot, dm);

			this.qDelForm = '#delform_instant';
			this.qPostHeader = '.posthead';

			this.formHeaders = false;
			this.hasCatalog = true;
			this.multiFile = true;
			this.ru = true;
		}
		get captchaInit() {
			$script(`Captcha.init(); Captcha.initForm(document.getElementById("postform"));`);
			return null;
		}
		get captchaUpdate() {
			$script('var captchaTimeout = 29.5;Captcha.state = "init";');
			return null;
		}
		get css() {
			return `.content > hr, .embed-wrap, .extrabtns, .postbutt { display: none; }
				form { position: initial; }`;
		}
		fixFileInputs(el) {
			const str = '><input type="file" name="file"></div>';
			el.innerHTML = '<div' + str + ('<div style="display: none;"' + str).repeat(3);
		}
		getTNum(thr) {
			return +thr.getAttribute('data-threadid');
		}
	}
	ibDomains['2.0-chan.ru'] = _0chan;

	class _2__ch extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);

			this.qOPostEnd = 'table:not(.postfiles)';
			this.qPages = 'table[border="1"] td > a:last-of-type';
			this.qPostImg = 'img.thumb';

			this.docExt = '.html';
			this.hasPicWrap = true;
			this.jsonSubmit = true;
			this.markupBB = true;
			this.multiFile = true;
			this.ru = true;
		}
		get qThread() {
			return '.threadz';
		}
		get captchaInit() {
			$id('captchadiv').innerHTML =
				`<img src="${ this.getCaptchaSrc() }" style="vertical-align: bottom;" id="imgcaptcha">`;
			return null;
		}
		get css() {
			return '#fastload, .rfmap, span[id$="_display"] { display: none; }';
		}
		fixFileInputs(el) {
			const str = '><input type="file" name="file"></div>';
			el.innerHTML = '<div' + str + ('<div style="display: none;"' + str).repeat(3);
		}
		fixHTMLHelper(str) {
			return str.replaceAll('data-original="/', 'src="/');
		}
		getCaptchaSrc() {
			return `/${ this.b }/captcha.fpl?${ Math.random() }`;
		}
		getImgWrap(img) {
			return img.parentNode.parentNode.parentNode;
		}
		getOmitted(el, len) {
			let txt;
			return el && (txt = el.textContent) ? +txt.match(/\d+/) - len : 1;
		}
		getPageUrl(board, page) {
			return `${ fixBrd(board) }${ page > 0 ? page : 0 }.memhtml`;
		}
		getSubmitData(json) {
			let error = null;
			let postNum = null;
			if(json.post) {
				postNum = +json.post;
			} else {
				error = Lng.error[lang];
				if(json.error) {
					error += ': ' + json.error.text;
				}
			}
			return { error, postNum };
		}
		init() {
			const btnEl = $q('#postform input[type="button"]');
			if(btnEl) {
				$replace(btnEl, '<input type="submit" value="Отправить">');
			}
			const delFormEl = $q(this.qDelForm);
			$delAll('input[type="hidden"]', delFormEl);
			delFormEl.append($q('.userdelete'));
			return false;
		}
	}
	ibDomains['2--ch.ru'] = ibDomains['2-ch.su'] = _2__ch;

	class /* _2ch */ Makaba extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);
			this.makaba = true;

			this.cReply = 'de-reply-class';
			this.qBan = '.post__pomyanem';
			this.qClosed = '.sticky-img[src$="locked.png"]';
			this.qDelForm = '#posts-form';
			this.qFormFile = '.postform__raw.filer input[type="file"]';
			this.qFormRedir = null;
			this.qFormRules = '.rules';
			this.qFormSubm = '#submit';
			this.qFormTd = '.postform__raw';
			this.qFormTr = '.postform__raw';
			this.qFormTxta = '#shampoo';
			this.qImgInfo = '.post__file-attr';
			this.qOmitted = '.thread__missed';
			this.qOPost = '.post_type_oppost';
			this.qPost = '.post_type_reply[data-num]';
			this.qPostHeader = '.post__details';
			this.qPostImg = '.post__file-preview';
			this.qPostMsg = '.post__message';
			this.qPostName = '.post__anon, .post__email';
			this.qPostRef = '.post__reflink:nth-child(2)';
			this.qPostSubj = '.post__title';
			this.qTrunc = null;

			this.formParent = 'thread';
			this.hasAltCaptcha = true;
			this.hasArchive = true;
			this.hasCatalog = true;
			this.hasOPNum = true;
			this.hasPicWrap = true;
			this.JsonBuilder = MakabaPostsBuilder;
			this.jsonSubmit = true;
			this.markupBB = true;
			this.multiFile = true;
			this.timePattern = 'dd+nn+yy+w+hh+ii+ss';
			this._capUpdPromise = null;
		}
		get qFormMail() {
			return 'input[name="email"]';
		}
		get qFormName() {
			return 'input[name="name"]';
		}
		get qFormSubj() {
			return 'input[name="subject"]';
		}
		get qImgNameLink() {
			return '.file-attr > .desktop, .post__file-attr > .desktop';
		}
		get css() {
			return `.js-post-findimg, .js-post-saveimg, .media-expand-button, .media-thumbnail, .newpost,
					.post__btn:not(.icon_type_active), .post__number, .post__refmap, .postform-hr,
					.thread-nav > :not(.search) { display: none !important; }
				#down-nav-arrow, #up-nav-arrow { z-index: 0; }
				.postform__raw_flex { flex-direction: column; align-items: flex-start; }
				.de-pview > .post__details { margin-left: 4px; }
				.de-reply-class { background: var(--theme_default_postbg);
					border: 1px solid var(--theme_default_border); border-radius: 3px; }
				.oekaki-height, .oekaki-width { width: 36px !important; }
				.post_type_reply { max-width: 100%; }
				.postform { width: auto; }
				.postform__sticker-btn, .postform__sticker-prev { bottom: ` +
					`${ !Cfg.txtBtnsLoc || !Cfg.addTextBtns ? 3 :
					Cfg.addTextBtns === 1 ? 28 : Cfg.addTextBtns === 2 ? 19 : 25 }px !important; }
				${ Cfg.addSageBtn ? `.options__box[onclick="ToggleSage()"]
					{ display: none !important; }` : '' }
				${ Cfg.addTextBtns ? '.js-postform-mu { display: none; }' : '' }
				${ Cfg.expandTrunc ? `.expand-large-comment,
					div[id^="shrinked-post"] { display: none !important; }
					div[id^="original-post"] { display: block !important; }` : '' }
				${ Cfg.imgNames === 2 ? `.post__filezise { display: inline !important; }
					.post__file-attr { margin-bottom: 1px; }` : '' }
				${ Cfg.noSpoilers ? '.spoiler::after { width: 0; }' : '' }`;
		}
		get isArchived() {
			return this.b.includes('/arch');
		}
		get lastPage() {
			const els = $Q('.pager > a:not([class])');
			const value = els ? els.length : 1;
			Object.defineProperty(this, 'lastPage', { value });
			return value;
		}
		get markupTags() {
			return ['B', 'I', 'U', 'S', 'SPOILER', '', 'SUP', 'SUB'];
		}
		get reportForm() {
			const value = (pNum, tNum) => ($q('input[type="button"]', $popup(
				'edit-report',
				`<input name="comment" value="" placeholder="${
					pNum === tNum ? Lng.reportThr[lang] : Lng.reportPost[lang]
				}" type="text"> <input value="OK" type="button">`)
			).onclick = e => {
				const inpEl = e.target.previousElementSibling;
				if(!inpEl.value) {
					inpEl.classList.add('de-input-error');
					return;
				}
				const formData = new FormData();
				formData.append('task', 'report');
				formData.append('board', this.b);
				formData.append('thread', tNum);
				formData.append('posts', pNum);
				formData.append('comment', inpEl.value);
				closePopup('edit-report');
				$popup('report', Lng.sending[lang], true);
				$ajax('/makaba/makaba.fcgi?json=1', { method: 'POST', data: formData }).then(xhr => {
					let obj;
					try {
						obj = JSON.parse(xhr.responseText);
					} catch(err) {}
					$popup('report', !obj ? Lng.error[lang] + ': ' + xhr.responseText :
						(obj.message || Lng.succReported[lang]) + ': ' + obj.message_title);
				});
			});
			Object.defineProperty(this, 'reportForm', { value });
			return value;
		}
		captchaInit(cap) {
			const box = $q('.captcha-box, .captcha');
			if(Cfg.altCaptcha) {
				box.innerHTML = `<div id="captcha-widget-main"></div>
					<input name="captcha_type" value="recaptcha" type="hidden">`;
				return null;
			}
			const img = box.firstChild;
			if(!img || img.tagName !== 'IMG') {
				box.innerHTML = `<img>
					<input name="2chcaptcha_value" maxlength="6" type="text" style="display: block;">
					<input name="2chcaptcha_id" type="hidden">`;
				const [img, inp] = [...box.children];
				img.onclick = () => this.updateCaptcha(cap);
				inp.tabIndex = 999;
				cap.textEl = inp;
			}
			return null;
		}
		captchaUpdate(cap) {
			const url = `/api/captcha/${ Cfg.altCaptcha ? 'recaptcha' : '2chcaptcha' }/id`;
			return cap.updateHelper(url, xhr => {
				const box = $q('.captcha-box, .captcha');
				let data = xhr.responseText;
				try {
					data = JSON.parse(data);
				} catch(err) {}
				if(cap.isSubmitWait && data.result !== 1) {
					pr.subm.click();
				}
				switch(data.result) {
				case 0: box.textContent = 'Пасскод недействителен. Перелогиньтесь.'; break;
				case 2: box.textContent = 'Вы - пасскодобоярин.'; break;
				case 3: return CancelablePromise.reject(new CancelError()); // Captcha is disabled
				case 1: // Captcha is enabled
					if(!Cfg.altCaptcha) {
						if(!cap.isSubmitWait) {
							const img = box.firstChild;
							img.src = '';
							img.src = `/api/captcha/2chcaptcha/show?id=${ data.id }`;
							box.lastChild.value = data.id;
							break;
						}
						$q('.captcha__key').value = data.id;
						$script($id('captcha-widget').hasChildNodes() ?
							`grecaptcha.reset(deCapWidget);
							grecaptcha.execute(deCapWidget);` :
							`deCapWidget = grecaptcha.render('captcha-widget', {
								sitekey : '${ data.id }',
								theme   : 'light',
								size    : 'invisible',
								callback: function() {
									var el = document.getElementById('captcha-widget-main');
									el.innerHTML = '<input type="hidden" name="g-recaptcha-response">';
									el.firstChild.value = grecaptcha.getResponse();
									document.getElementById('submit').click();
								}
							});
							grecaptcha.execute(deCapWidget);`);
						break;
					} else if(data.type === 'recaptcha') {
						$q('.captcha__key').value = data.id;
						if(!$id('captcha-widget-main').hasChildNodes()) {
							$script(`globRecapWidget = grecaptcha.render('captcha-widget-main', { sitekey: "${
								data.id }" });`);
						} else {
							$script('grecaptcha.reset(globRecapWidget);');
						}
						break;
					}
					/* falls through */
				default: box.innerHTML = data;
				}
			});
		}
		deleteTruncMsg(post, el) {
			el.previousSibling.remove();
			$show(el.previousSibling);
			el.remove();
		}
		fixFileInputs(el) {
			el.innerHTML = Array.from({ length: 8 }, (val, i) =>
				`<div${ i ? ' style="display: none;"' : '' }><input type="file" name="formimages[]"></div>`
			).join('');
		}
		getBanId(postEl) {
			const el = $q(this.qBan, postEl);
			return !el ? 0 : el.textContent.includes('предупрежден') ? 2 : 1;
		}
		getImgWrap(img) {
			return img.closest('figure');
		}
		getJsonApiUrl(board, tNum) {
			return `/${ board }/res/${ tNum }.json`;
		}
		getPNum(post) {
			return +post.getAttribute('data-num');
		}
		getPostWrap(el) {
			return el.parentNode;
		}
		getSage(post) {
			this.getSage = !$q('span[id^="id_tag_"]') ? super.getSage : post => {
				return !$q('span[id^="id_tag_"], .post__ophui', post);
			};
			return this.getSage(post);
		}
		getSubmitData(json) {
			let error = null;
			let postNum = null;
			if(json.Status === 'OK') {
				postNum = +json.Num;
			} else if(json.Status === 'Redirect') {
				postNum = +json.Target;
			} else {
				error = Lng.error[lang] + ': ' + json.Reason;
			}
			return { error, postNum };
		}
		init() {
			if($q('section.posts')) { // Old Makaba engine
				this.cReply = 'post reply';
				this.qBan = '.pomyanem';
				this.qFormFile = 'tr input[type="file"]';
				this.qFormRules = '.rules-area';
				this.qFormTd = 'td';
				this.qFormTr = 'tr';
				this.qImgInfo = '.file-attr';
				this.qOmitted = '.mess-post';
				this.qOPost = '.oppost';
				this.qPost = '.post.reply[data-num]';
				this.qPostHeader = '.post-details';
				this.qPostImg = '.preview';
				this.qPostMsg = '.post-message';
				this.qPostName = '.ananimas, .post-email';
				this.qPostRef = '.reflink';
				this.qPostSubj = '.post-title';
				this.hasArchive = false;
				const { css } = this;
				Object.defineProperty(this, 'css', {
					configurable : true,
					get          : () => `${ css }
						#ABU-alert-wait, .ABU-refmap, .fa-media-icon, .kupi-passcode-suka, .logo + hr,
						.media-expand-button, #media-thumbnail, .message-byte-len, .nav-arrows, .norm-reply,
						.postform-hr, .postpanel > :not(img), .posts > hr, .reflink::before,
						.thread-nav > :not(.search), .toolbar-area { display: none !important; }
						${ Cfg.addSageBtn ? `.box[onclick="ToggleSage()"] {
							display: none !important; }` : '' }
						${ Cfg.imgNames === 2 ? `.filesize { display: inline !important; }
							.file-attr { margin-bottom: 1px; }` : '' }`
				});
			} else {
				const infEl = $q('.postform .filer__limits');
				const optEl = $q('.postform .options');
				if(infEl && optEl) {
					optEl.append(infEl);
				}
			}
			$script(`(function() {
				function fixGlobalFunc(name) {
					Object.defineProperty(window, name,
						{ value: Function.prototype, writable: false, configurable: false });
				}
				fixGlobalFunc("$alert");
				fixGlobalFunc("autorefresh_start"); // Old makaba only
				fixGlobalFunc("linkremover");
				fixGlobalFunc("Media");
				fixGlobalFunc("MExpandMedia");
				MExpandMedia.close = Function.prototype;
				window.FormData = void 0;
				$(function() { $(window).off(); });
			})();`);
			$Q('.autorefresh').forEach(el => {
				const inpEl = $q('input', el);
				if(inpEl.checked) {
					inpEl.click();
				}
				el.remove();
			});
			const el = $id('shampoo');
			if(el) {
				el.tabIndex = 1;
			}
			return false;
		}
		observeContent(checkDomains, dataPromise) {
			if($q('#posts-form > .thread, form[de-form] > .thread')) {
				return true;
			}
			const initObserver = new MutationObserver(mutations => {
				if(mutations[0].addedNodes[0]?.className === 'thread') {
					initObserver.disconnect();
					runMain(checkDomains, dataPromise);
				}
			});
			const el = $q('#posts-form, form[de-form]');
			if(el) {
				initObserver.observe(el, { childList: true });
			}
			return false;
		}
	}
	ibDomains['2ch.hk'] = ibDomains['2ch.life'] = Makaba;

	class _2chan extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);

			this.qDelForm = 'form:not([enctype])';
			this.qForm = '#fm';
			this.qFormRedir = null;
			this.qFormRules = '.chui';
			this.qOmitted = 'font[color="#707070"]';
			this.qPost = 'td:nth-child(2)';
			this.qPostImg = 'a[href$=".jpg"] > img, a[href$=".png"] > img, a[href$=".gif"] > img';
			this.qPostRef = '.del';

			this.docExt = '.htm';
			this.formParent = 'resto';
		}
		get qImgNameLink() {
			return 'a[href$=".jpg"], a[href$=".png"], a[href$=".gif"]';
		}
		get qThread() {
			return '.thre';
		}
		get css() {
			return `.ftbl { width: auto; margin: 0; }
				.reply { background: #f0e0d6; }
				span { font-size: inherit; }`;
		}
		getPageUrl(board, page) {
			return fixBrd(board) + (page > 0 ? page + this.docExt : 'futaba.htm');
		}
		getPNum(post) {
			return +$q('input', post).name;
		}
		getPostElOfEl(el) {
			while(el && el.tagName !== 'TD' && !el.hasAttribute('de-thread')) {
				el = el.parentElement;
			}
			return el;
		}
		getTNum(thr) {
			return +$q('input[type="checkbox"]', thr).name.match(/\d+/);
		}
		init() {
			$del($q('base', doc.head)); // <base> is not compartible with SVG
			return false;
		}
	}
	ibDomains['2chan.net'] = _2chan;

	class _2channel extends Makaba {
		constructor(prot, dm) {
			super(prot, dm);
			this._2channel = true;

			this.hasAltCaptcha = false;
		}
		get reportForm() {
			return null;
		}
		captchaInit(cap) {
			return this.captchaUpdate(cap);
		}
		captchaUpdate(cap) {
			const url = `/api/captcha/service_id?board=${ this.b }&thread=` + pr.tNum;
			return cap.updateHelper(url, xhr => {
				const box = $q('.captcha');
				let data = xhr.responseText;
				try {
					data = JSON.parse(data);
				} catch(err) {}
				switch(data.result) {
				case 1: { // Captcha is enabled
					const el = $q('.captcha__image');
					const img = $q('img', el) || $aBegin(el, '<img>');
					img.src = '';
					img.src = `/api/captcha/image/${ data.id }`;
					$q('input[name="captcha_id"]').value = data.id;
					break;
				}
				case 2: return CancelablePromise.reject(new CancelError()); // Captcha is disabled
				case 3: box.innerHTML = 'Вам больше не нужно вводить капчу.'; break;
				default: box.innerHTML = data;
				}
				$show(box);
				box.removeAttribute('hidden');
				cap.textEl.tabIndex = 999;
			});
		}
		fixFileInputs(el) {
			el.innerHTML = Array.from({ length: 4 }, (val, i) =>
				`<div${ i ? ' style="display: none;"' : '' }><input type="file" name="formimages[]"></div>`
			).join('');
		}
		fixHTMLHelper(str) {
			return str.replace(/src="[^>]+" data-src="/g, 'src="');
		}
		getCapParent() {
			return $q('.captcha');
		}
		init() {
			super.init();
			this.qFormFile = 'input[name="formimages[]"]';
			this.qFormTd = 'div[class^="freply__"]';
			this.qFormTr = 'div[class^="freply__"]';
			const { css } = this;
			Object.defineProperty(this, 'css', {
				configurable : true,
				get          : () => `${ css }
					#AlertBox, .postform__checkbox.first, .postform__header, .refmap, #youtube-thumb-float
						{ display: none !important; }
					.de-win-open:not(#de-win-cfg) > .de-win-body { background-color: #eee !important; }
					.preview.lazy { opacity: 1; }`
			});
			let el = $q('.captcha');
			if(el) {
				$q('.freply__files-and-captcha').before(el);
			}
			el = $id('postform');
			if(el) {
				el.setAttribute('action', el.getAttribute('action') + '?json=1');
			}
			return false;
		}
	}
	ibDomains['2channel.moe'] = ibDomains['2channel5xx5xchx.onion'] = _2channel;

	class _2chRip extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);

			this.jsonSubmit = true;
			this.ru = true;

			this._capUpdPromise = null;
		}
		get css() {
			return `small[id^="rfmap_"], #submit_button, .qreply_btn { display: none; }
				#subject + div { display: inline !important; }
				.replypage .reply .reflink::before { content: "" }`;
		}
		captchaUpdate(cap) {
			return cap.updateHelper('/cgi/captcha?task=get_id', ({ responseText: id }) => {
				$id('imgcaptcha').src = '/cgi/captcha?task=get_image&id=' + id;
				$id('captchaid').value = id;
			});
		}
		getSubmitData(json) {
			return {
				error   : json.message ? json.message_title + ': ' + json.message : null,
				postNum : json.num ? +json.num : null
			};
		}
		init() {
			$script('postFormSubmit = Function.prototype;');
			$id('postform').insertAdjacentHTML('beforeend', '<input type="hidden" name="json" value="1">');
			return false;
		}
	}
	ibDomains['2ch.rip'] = ibDomains['dva-ch.net'] = _2chRip;

	class _410chan extends Kusaba {
		constructor(prot, dm) {
			super(prot, dm);

			this.qFormRedir = 'input#noko';
			this.qPages = '.pgstbl > table > tbody > tr > td:nth-child(2)';

			this.hasCatalog = true;
			this.markupBB = false;
			this.ru = true;
			this.timePattern = 'dd+nn+yyyy++w++hh+ii+ss';
			this._capUpdPromise = null;
		}
		get captchaLang() {
			return 0;
		}
		get css() {
			return `${ super.css }
				#resizer { display: none; }
				form > span { margin-top: 5px; }
				.de-thr-hid { display: inherit; }
				.reflink::after { content: none !important; }
				.spoiler-image:hover::after { content: none !important; }
				.topmenu { z-index: 1; }`;
		}
		get markupTags() {
			return ['**', '*', '__', '^^', '%%', '`'];
		}
		captchaUpdate(cap) {
			return cap.updateHelper(`/api_adaptive.php?board=${ this.b }`, xhr => {
				if(xhr.responseText === '1') {
					cap.textEl.disabled = true;
					setTimeout(() => (cap.textEl.value = 'проезд оплачен'), 0);
					return;
				}
				cap.textEl.disabled = false;
				cap.textEl.value = '';
				const img = $q('img', cap.parentEl);
				const src = img.getAttribute('src');
				img.src = '';
				img.src = this.getCaptchaSrc(src);
			});
		}
		getCaptchaSrc(src) {
			return src.replace(/\?[^?]+$|$/, `?board=${ aib.b }&${ Math.random() }`);
		}
		getSage(post) {
			return !!$q('.filetitle', post)?.textContent.includes('\u21E9');
		}
	}
	ibDomains['410chan.org'] = _410chan;

	class _4chan extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);
			this._4chan = true;

			this.cReply = 'post reply';
			this.qBan = 'strong[style="color: red;"]';
			this.qClosed = '.archivedIcon';
			this.qDelBtn = '.deleteform > input[type="submit"]';
			this.qError = '#errmsg';
			this.qForm = 'form[name="post"]';
			this.qFormRedir = null;
			this.qImgInfo = '.fileText';
			this.qOmitted = '.summary.desktop';
			this.qOPost = '.op';
			this.qOPostEnd = '.replyContainer';
			this.qPages = '.pagelist > .pages:not(.cataloglink) > a:last-of-type';
			this.qPostHeader = '.postInfo';
			this.qPostImg = '.fileThumb > img:not(.fileDeletedRes)';
			this.qPostName = '.name';
			this.qPostRef = '.postInfo > .postNum';
			this.qPostSubj = '.subject';

			this.anchor = '#p';
			this.docExt = '';
			this.firstPage = 1;
			this.formParent = 'resto';
			this.hasCatalog = true;
			this.hasTextLinks = true;
			this.JsonBuilder = _4chanPostsBuilder;
			this.res = 'thread/';
			this.timePattern = 'nn+dd+yy+w+hh+ii-?s?s?';
		}
		get qFormSubj() {
			return 'input[name="sub"]';
		}
		get qImgNameLink() {
			return '.fileText > a';
		}
		get captchaUpdate() {
			let value = null;
			if($id('captchaFormPart')) {
				value = cap => {
					const container = $id('t-root');
					if(!container) {
						cap.hasCaptcha = false;
						return;
					}
					$replace(container, '<div id="t-root"></div>');
					$script('initTCaptcha();');
					setTimeout(() => {
						cap.textEl = $id('t-resp');
						cap.textEl.tabIndex = 999;
						cap.initTextEl();
					}, 1e3);
					return null;
				};
			}
			Object.defineProperty(this, 'captchaUpdate', { value });
			return value;
		}
		get css() {
			return `.backlink, #blotter, .de-file-utils + .desktop, .extButton, hr.desktop, .navLinks,
					.postMenuBtn, #togglePostFormLink { display: none !important; }
				#bottomReportBtn { display: initial !important; }
				#g-recaptcha { height: initial; }
				.postForm { display: table !important; width: auto !important; }
				textarea { margin-right: 0 !important; }
				${ Cfg.widePosts ? '.sideArrows { display: none; }' : '' }`;
		}
		get markupTags() {
			return ['', '', '', '', $q('input[type="checkbox"][name="spoiler"]') ? '[spoiler' : '',
				this.b === 'g' ? '[code' : ''];
		}
		fixDeadLinks(str) {
			return str.replace(/<span class="deadlink">&gt;&gt;(\d+)<\/span>/g,
				'<a class="de-ref-del deadlink" href="#p$1">&gt;&gt;$1</a>');
		}
		fixHTMLHelper(str) {
			return str.replace(/<span>([^<]+)(?:<\/?wbr>)?([^<]+)<\/span> \[<a [^>]+>Embed<\/a>\]/g, '$1$2')
				.replace(/<\/?wbr>/g, '').replace(/( \(OP\)| →)<\/a/g, '</a');
		}
		fixVideo() {
			return [];
		}
		getImgInfo(wrap) {
			const el = $q(this.qImgInfo, wrap);
			return el ? el.lastChild.textContent : '';
		}
		getImgRealName(wrap) {
			const el = $q(this.qImgNameLink, wrap);
			return el ? el.title || el.parentNode.title || el.textContent : '';
		}
		getJsonApiUrl(board, tNum) {
			return `//a.4cdn.org/${ board }/thread/${ tNum }.json`;
		}
		getImgWrap(img) {
			return img.parentNode.parentNode;
		}
		getPageUrl(board, page) {
			return fixBrd(board) + (page > 1 ? page : '');
		}
		getPostWrap(el) {
			return el.parentNode;
		}
		getSage(post) {
			return !!$q('.id_Heaven, .useremail[href^="mailto:sage"]', post);
		}
		getSubmitData(dc) {
			let error = null;
			let postNum = null;
			const errEl = $q('#errmsg', dc);
			if(errEl) {
				error = errEl.innerHTML;
			} else {
				try {
					postNum = +$q('h1', dc).nextSibling.textContent.match(/no:(\d+)/)[1];
				} catch(err) {}
			}
			return { error, postNum };
		}
		getTNum(thr) {
			return +$q('input[type="checkbox"]', thr).name.match(/\d+/);
		}
		init() {
			Cfg.findImgFile = 0;
			Cfg.txtBtnsLoc = 0;
			$id('styleSelector')?.setAttribute('onchange', 'setActiveStyleSheet(this.value);');
			return false;
		}
	}
	ibDomains['4chan.org'] = ibDomains['4channel.org'] = _4chan;

	class Archived extends FoolFuuka {
		getImgRedirectSrc(url) {
			return $ajax(url).then(xhr => xhr.responseText.match(/<meta[^>]+url=([^"]+)">/)[1]);
		}
	}
	ibDomains['archived.moe'] = Archived;

	class Arhivach extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);

			this.cReply = 'post';
			this.qDelBtn = null;
			this.qDelForm = 'body > .container-fluid';
			this.qDelPassw = null;
			this.qPost = '.post[postid]:not([postid=""])';
			this.qPostHeader = '.post_head';
			this.qPostImg = '.post_image > img';
			this.qPostMsg = '.post_comment_body';
			this.qPostRef = '.post_id, .post_head > b';
			this.qPostSubj = '.post_subject';

			this.docExt = '';
			this.hasOPNum = true;
			this.res = 'thread/';
		}
		get qImgNameLink() {
			return '.img_filename';
		}
		get qThread() {
			return '.thread_inner';
		}
		get css() {
			return `.media-expand-button, .post_replies, .post_num, .poster_sage { display: none !important; }
				.navbar-fixed-top, .thread_header_fixed { z-index: 5 !important; }
				.post { overflow-x: auto !important; }
				.thread_inner img.de-fullimg { max-width: 100% !important; max-height: 100% !important; }`;
		}
		get isArchived() {
			return true;
		}
		fixHTML(data, isForm) {
			const formEl = super.fixHTML(data, isForm);
			const links = $Q('.expand_image', formEl);
			for(let i = 0, len = links.length; i < len; ++i) {
				const link = links[i];
				const href = link.getAttribute('onclick').match(/(?:https?:\/|\/storage)[^']+/);
				if(href) {
					link.href = href[0];
					link.removeAttribute('onclick');
				}
			}
			return formEl;
		}
		getImgInfo(wrap) {
			return wrap.title;
		}
		getImgWrap(img) {
			return img.closest('a').parentNode;
		}
		getOp(el) {
			return $q('.post:first-child', el);
		}
		getPNum(post) {
			return +post.getAttribute('postid');
		}
		getSage(post) {
			return !!$q('.poster_sage', post);
		}
		getThrUrl() {
			return $q('link[rel="canonical"]', doc.head).href;
		}
		getTNum(thr) {
			return this.getPNum(this.getOp(thr));
		}
		init() {
			defaultCfg.ajaxUpdThr = 0;
			setTimeout(() => {
				const delPosts = $Q('.post_deleted');
				for(let i = 0, len = delPosts.length; i < len; ++i) {
					const post = pByNum.get(this.getPNum(delPosts[i]));
					if(post) {
						post.thr.deletePosts(post, false, false);
					}
				}
				$css(`.post { background-color: ${
					getComputedStyle($q('.post')).getPropertyValue('background-color') } !important; }`);
			}, 500);
			return false;
		}
	}
	ibDomains['arhivach.ng'] = ibDomains['arhivachovtj2jrp.onion'] = Arhivach;

	class CrystalCafe extends Tinyboard {
		constructor(prot, dm) {
			super(prot, dm);

			this.qPost = '.post.reply';
		}
		get qImgNameLink() {
			return '.fileinfo > a[title]';
		}
		getImgInfo(wrap) {
			return $q(this.qImgNameLink, wrap).title;
		}
		getTNum(thr) {
			return +thr.id.match(/\d+/);
		}
	}
	ibDomains['crystal.cafe'] = CrystalCafe;

	class Dobrochan extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);
			this.dobrochan = true;

			this.qClosed = 'img[src="/images/locked.png"]';
			this.qDelForm = 'form[action*="delete"]';
			this.qError = '.post-error, h2';
			this.qFormRedir = 'select[name="goto"]';
			this.qImgInfo = '.fileinfo';
			this.qOmitted = '.abbrev > span:last-of-type';
			this.qPages = '.pages > tbody > tr > td';
			this.qPostMsg = '.postbody';
			this.qPostSubj = '.replytitle';
			this.qTrunc = '.abbrev > span:first-of-type';

			this.anchor = '#i';
			this.formParent = 'thread_id';
			this.hasPicWrap = true;
			this.JsonBuilder = DobrochanPostsBuilder;
			this.multiFile = true;
			this.ru = true;
			this.timePattern = 'dd+m+?+?+?+?+?+yyyy++w++hh+ii-?s?s?';
		}
		get css() {
			return `.de-video-obj-inline { margin-left: 5px; }
				.delete > img, .popup, .reply_, .search_google, .search_iqdb { display: none; }
				.delete { background: none; }
				.delete_checkbox { position: static !important; }`;
		}
		captchaInit(cap) {
			if(!cap.textEl) {
				$hide($q('img', cap.parentEl));
				$show(cap.parentEl);
			}
			return null;
		}
		captchaUpdate(cap, isErr) {
			const img = $q('img', cap.parentEl);
			if(!img) {
				return null;
			}
			if(cap.textEl) {
				const src = img.getAttribute('src').split('/').slice(0, -1).join('/') +
					`/${ Date.now() }.png`;
				img.src = '';
				img.src = src;
				cap.textEl.value = '';
			} else if(isErr) {
				const el = img.parentNode;
				el.innerHTML = '';
				el.append(img);
				img.insertAdjacentHTML('afterend', '<br><input placeholder="Капча" autocomplete="off"' +
					' id="captcha" name="captcha" size="35" type="text">');
				$show(img);
				cap.isAdded = false;
				cap.originHTML = cap.parentEl.innerHTML;
				cap.addCaptcha();
			}
			return null;
		}
		deleteTruncMsg(post, el, isInit) {
			[el.previousSibling, el.nextSibling, el].forEach($del);
			if(isInit) {
				post.msg.firstElementChild.replaceWith($q('.alternate > div', post.el));
			} else {
				const sRunner = new SpellsRunner();
				post.updateMsg($q('.alternate > div', post.el), sRunner);
				sRunner.endSpells();
			}
		}
		disableRedirection(el) {
			$hide(el.closest('tr'));
			el.selectedIndex = 1;
		}
		fixFileInputs(el) {
			$Q('input[type="file"]', el).forEach(el => el.removeAttribute('onchange'));
			el.firstElementChild.value = 1;
		}
		getImgSrcLink(img) {
			// There can be a censored <img> without <a> parent
			const el = img.parentNode;
			return el.tagName === 'A' ? el :
				$q('.fileinfo > a', img.previousElementSibling ? el : el.parentNode);
		}
		getImgWrap(img) {
			const el = img.parentNode;
			return el.tagName === 'A' ? (el.previousElementSibling ? el : el.parentNode).parentNode :
				img.previousElementSibling ? el : el.parentNode;
		}
		getJsonApiUrl(board, tNum) {
			return `/api/thread/${ board }/${ tNum }/all.json?new_format&message_html&board`;
		}
		getOmitted(el) {
			while(el) {
				const m = el.textContent.match(/(\d+) posts are omitted/);
				if(m) {
					return +m[1] + 1;
				}
				el = el.previousElementSibling;
			}
			return 1;
		}
		getPageUrl(board, page) {
			return fixBrd(board) + (page > 0 ? page + this.docExt : 'index.xhtml');
		}
		getTNum(thr) {
			return +$q('a[name]', thr).name.match(/\d+/);
		}
		init() {
			if(deWindow.location.pathname === '/settings') {
				$q('input[type="button"]').addEventListener('click',
					() => readCfg().then(() => saveCfg('__hanarating', $id('rating').value)));
				return true;
			}
			$script('UploadProgress = Function.prototype;');
			$id('postform')?.append($q('.rules'));
			return false;
		}
		insertYtPlayer(msg, playerHtml) {
			const prev = msg.previousElementSibling;
			return $bBegin(prev.tagName === 'BR' ? prev : msg, playerHtml);
		}
	}
	ibDomains['dobrochan.com'] = ibDomains['dobrochan.org'] = ibDomains['dobrochan.ru'] = Dobrochan;

	class Endchan extends Lynxchan {
		constructor(prot, dm) {
			super(prot, dm);

			this.qTrunc = '.contentOmissionIndicator > p';
		}
		get css() {
			return `${ super.css }
				.bottomNav, .delLink, #expandAll, .hidePost, .hideThread, .linkLast50,
					.linkPreview, #modeBanner, .watchButton { display: none !important; }
				#de-main, .de-pview { font-size: 75%; }`;
		}
		init() {
			super.init();
			$Q('.imgLink > img[src^="/.youtube/"]').forEach(el => $del(el.closest('figure')));
			$Q('.youtube_wrapper').forEach(el => {
				const src = $q('a', el).href;
				$del($bBegin(el, `<a href="${ src }">${ src }</a>`).nextSibling);
			});
			return false;
		}
	}
	ibDomains['endchan.net'] = Endchan;

	class Ernstchan extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);

			this.cReply = 'post';
			this.qError = '.error > .info';
			this.qFormRedir = 'input[name="gb2"][value="thread"]';
			this.qFormSpoiler = 'input[type="checkbox"][name="spoilered"]';
			this.qOPost = '.thread_OP';
			this.qPages = '.pagelist > li:nth-last-child(2)';
			this.qPost = '.thread_reply';
			this.qPostHeader = '.post_head';
			this.qPostMsg = '.text';
			this.qPostSubj = '.subject';
			this.qPostTrip = '.tripcode';
			this.qTrunc = '.tldr';

			this.docExt = '';
			this.firstPage = 1;
			this.markupBB = true;
			this.multiFile = true;
			this.res = 'thread/';
		}
		get qImgNameLink() {
			return '.filename > a';
		}
		get css() {
			return `.content > hr, .de-parea > hr, .de-pview > .doubledash, .sage { display: none !important }
				.de-pview > .post { margin-left: 0; border: none; }
				#de-win-reply { float:left; margin-left:2em }`;
		}
		fixFileInputs(el) {
			const str = `><input name="file" type="file">
				<input type="hidden" name="spoilered" value="0">
				<input type="checkbox" name="spoilered" value="1"></div>`;
			el.innerHTML = '<div' + str + ('<div style="display: none;"' + str).repeat(3);
		}
		getImgWrap(img) {
			return img.parentNode.parentNode.parentNode;
		}
		getPageUrl(board, page) {
			return page > 1 ? fixBrd(board) + 'page/' + page : fixBrd(board);
		}
		getPostElOfEl(el) {
			while(el && !nav.matchesSelector(el, '.post')) {
				el = el.parentElement;
			}
			return el.parentNode;
		}
	}
	ibDomains['ernstchan.xyz'] = Ernstchan;

	class Gensokyo extends Kusaba {
		constructor(prot, dm) {
			super(prot, dm);

			this.hasRefererErr = true;
		}
	}
	ibDomains['gensokyo.4otaku.org'] = Gensokyo;

	class Iichan extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);

			this.hasArchive = true;
			this.hasCatalog = true;
		}
		get qFormMail() {
			return 'input[name="nya2"]';
		}
		get qFormName() {
			return 'td > input[name="nya1"]';
		}
		get qFormSubj() {
			return 'input[name="nya3"]';
		}
		get catalogUrl() {
			return `${ this.prot }//${ this.host }/${ this.b }/catalogue.html`;
		}
		get css() {
			return `${ !this.t ? '' : 'hr + #de-main { margin-top: -32px; } .logo { margin-bottom: 14px; }' }
			.iichan-hide-thread-btn, .iichan-quick-reply-btn, .postnum { display: none; }
			.replypage div[id^="thread"] span.reflink::after { content: none; }`;
		}
		get isArchived() {
			return this.b.includes('/arch');
		}
		stormWallFixAjax(url, text, el, needForm, fnResult) {
			return this.stormWallHelper(url, text, () => fnResult(el),
				frText => fnResult(getAjaxResponseEl(frText, needForm)));
		}
		stormWallFixCaptcha(url, img) {
			img.onload = img.onerror = () => {
				if(!(img.naturalHeight + img.naturalWidth)) {
					this.stormWallHelper(url, null, emptyFn, () => {
						img.src = '';
						img.src = url;
					});
				}
			};
		}
		stormWallFixSubmit(url, text, ajaxParams) {
			return this.stormWallHelper(url, text, () => $createDoc(text),
				() => $ajax(url, ajaxParams).then(xhr => $createDoc(xhr.responseText)));
		}
		stormWallHelper(url, text, fnOK, fnRes) {
			const stormWallTxt = '<script src="https://static.stormwall.pro/';
			if(text !== null && !text.includes(stormWallTxt)) {
				return fnOK();
			}
			return new Promise((resolve, reject) => {
				let loadCounter = 0;
				$popup('err-stormwall', `<div>${ Lng.stormWallCheck[lang] }</div>` +
					`<iframe id="de-stormwall" name="de-prohibited" src="${
						url }" width="500" height="500" style="display: none;"></iframe>`);
				const frEl = $id('de-stormwall');
				frEl.onload = () => {
					if(loadCounter++ < 1) {
						return;
					}
					const frText = frEl.contentWindow.document.documentElement.outerHTML;
					if(frText.includes(stormWallTxt)) {
						$show(frEl);
						reject(new AjaxError(0, Lng.stormWallErr[lang]));
						return;
					}
					closePopup('err-stormwall');
					resolve(fnRes(frText));
				};
			});
		}
		getImgRealName(wrap) {
			return $q('.filesize > em', wrap).textContent.split(',')[2] || super.getImgRealName(wrap);
		}
		init() {
			defaultCfg.addSageBtn = 0;
			$script('highlight = Function.prototype;');
			let el = $q(this.qFormSpoiler);
			if(el) {
				$hide(el = el.parentNode);
				$del(el.previousSibling);
			}
			return false;
		}
	}
	ibDomains['iichan.hk'] = Iichan;

	class Kohlchan extends Lynxchan {
		constructor(prot, dm) {
			super(prot, dm);
			this.kohlchan = true;

			this.qFormRules = '#rules_row';
			this.qPostImg = '.imgLink > img, .de-img-link > img';

			this.hasTextLinks = true;
			this.markupBB = true;
			this.timePattern = 'yyyy+nn+dd+hh+ii+ss';
		}
		get css() {
			return `${ super.css }
				.extraMenuButton, #postingForm, .sage { display: none; }`;
		}
		get fixKCUnixFilenames() {
			let value = null;
			if(locStorage.unixFilenames === 'true') {
				value = post => {
					const containerEl = $q('div.panelUploads', post.el);
					const imgLinks = $Q('a.imgLink:not(.unixLink)', containerEl);
					let timetext = new Date(containerEl.parentElement.parentElement
						.querySelectorAll('span.labelCreated')[0].textContent.replaceAll('-', '/')).getTime();
					timetext = timetext + timetext % 999;
					for(let j = 0; j < imgLinks.length; j++) {
						const imgLink = imgLinks[j];
						const parentEl = imgLink.parentElement;
						imgLink.href += '/' + timetext +
							(j === 0 && imgLinks.length === 1 ? '.' : '-' + j + '.') +
							$q('a.originalNameLink', parentEl.nodeName === 'SPAN' ?
								parentEl.parentElement : parentEl).title.split('.').pop();
						imgLink.classList.add('unixLink');
					}
				};
			}
			Object.defineProperty(this, 'fixKCUnixFilenames', { value });
			return value;
		}
		get markupTags() {
			return ['b', 'i', 'u', 's', 'spoiler', 'code'];
		}
		sendHTML5Post(form, data, needProgress, hasFiles) {
			const oekakiEl = $id('wPaint');
			if(oekakiEl?.hasChildNodes() && oekakiEl.style.display !== 'none') {
				hasFiles = true;
				const mime = { type: 'image/png' };
				const files = [new File([
					new Blob([ContentLoader.getDataFromCanvas($q('.wPaint-canvas', oekakiEl))], mime)
				], 'oekaki.png', mime), ...data.getAll('files').slice(0, -1)];
				data.delete('files');
				for(const file of files) {
					data.append('files', file);
				}
			}
			return super.sendHTML5Post(form, data, needProgress, hasFiles);
		}
		captchaAfterSubmit(data) {
			if(data !== '{"status":"bypassable"}') {
				return false;
			}
			$popup('upload', `<div>Tor / VPN / Proxy detected</div><!--
				--><div>You need a block bypass to post</div><!--
				--><div><img src="/captcha.js?d=${ new Date().toString() }" class="captchaImage"` +
					` title="Click to reload" onclick="captchaUtils.reloadCaptcha();"><!--
				--></div><div><!--
					--><input type="button" class="modalOkButton" value="Send"><!--
					--><input type="text" class="modalAnswer"><!--
				--></div>`).style.cssText = 'text-align: center;';
			const submitEl = $q('.modalOkButton');
			const inputEl = $q('.modalAnswer');
			submitEl.onclick = () => {
				$popup('captcha', Lng.sending[lang], true);
				const formData = new FormData();
				formData.append('captcha', inputEl.value.trim());
				$ajax('/renewBypass.js?json=1', { data: formData, method: 'POST' }).then(xhr => {
					const obj = JSON.parse(xhr.responseText);
					switch(obj.status) {
					case 'ok':
					case 'finish':
						closePopup('captcha');
						$popup('upload', 'OK! You may now post.');
						return;
					case 'hashcash':
						closePopup('captcha');
						$popup('upload', '<a target="_blank" href=' +
							'"/addon.js/hashcash/?action=get">Click here to activate your bypass.</a>');
						return;
					default: $popup('captcha', obj.data || xhr.responseText);
					}
				}, () => $popup('captcha', Lng.noConnect[lang]));
			};
			inputEl.onkeydown = e => {
				if(e.key === 'Enter') {
					submitEl.click();
					e.preventDefault();
				}
			};
			if(pr.isQuick) {
				pr.setReply(true, false);
			}
			updater.sendErrNotif();
			updater.continueUpdater();
			return true;
		}
		getImgRealName(wrap) {
			return $q('.originalNameLink', wrap).title;
		}
		getSage(post) {
			return $q('.sage', post).hasChildNodes();
		}
		init() {
			if(!this.host.includes('nocsp.') && this.host.includes('kohlchan.net')) {
				deWindow.location.assign(deWindow.location.href
					.replace(/(www\.)?kohlchan\.net/, 'nocsp.kohlchan.net'));
				return true;
			}
			if(locStorage.autoRefreshMode !== 'false' || locStorage.convertLocalTimes !== 'false') {
				locStorage.autoRefreshMode = false;
				locStorage.convertLocalTimes = false;
				deWindow.location.reload();
				return true;
			}
			$Q('.imgLink').forEach(el => (el.className = 'de-img-link'));
			return super.init();
		}
	}
	ibDomains['kohlchan.net'] = ibDomains['kohlchan.top'] = ibDomains['kohlchanagb7ih5g.onion'] =
		ibDomains['kohlchanvwpfx6hthoti5fvqsjxgcwm3tmddvpduph5fqntv5affzfqd.onion'] =
		ibDomains['kohlkanal.net'] = Kohlchan;

	class Kropyvach extends Vichan {
		constructor(prot, dm) {
			super(prot, dm);

			this.markupBB = true;
		}
		get css() {
			return super.css + (this.t ? '' : '\r\n.de-btn-reply { display: none !important; }');
		}
		get markupTags() {
			return ['b', 'i', 'u', 's', 'spoiler', 'code'];
		}
	}
	ibDomains['kropyva.ch'] = Kropyvach;

	class Lainchan extends Vichan {
		constructor(prot, dm) {
			super(prot, dm);

			this.qOPost = '.op';
		}
		get css() {
			return `${ super.css }
				.sidearrows { display: none !important; }
				.bar { z-index: 1; }
				${ Cfg.imgNames ? '.details > a { display: none; }' : '' }`;
		}
		getImgRealName(wrap) {
			return $q('.details > a, .postfilename', wrap).textContent;
		}
		init() {
			super.init();
			$Q('.files + .post.op').forEach(el => el.prepend(el.previousElementSibling));
			return false;
		}
	}
	ibDomains['lainchan.org'] = Lainchan;

	class Niuchan extends Kusaba {
		get css() {
			return `${ super.css }
				.replybacklinks, .resize { display: none; }`;
		}
	}
	ibDomains['niuchan.org'] = Niuchan;

	class Nowere extends BaseBoard {
		get markupTags() {
			return ['**', '***', '', '^H', '', ''];
		}
		init() {
			$script('highlight = Function.prototype;');
			return false;
		}
	}
	ibDomains['nowere.net'] = Nowere;

	class Ponyach extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);

			this.qBan = 'font[color="#FF0000"]';
			this.qImgInfo = '.filesize[style="display: inline;"]';

			this.formParent = 'replythread';
			this.jsonSubmit = true;
			this.multiFile = true;
		}
		get qImgNameLink() {
			return 'a:first-of-type';
		}
		getImgInfo(wrap) {
			return wrap.textContent;
		}
		getImgRealName(wrap) {
			return $q('.mobile_filename_hide', wrap).textContent;
		}
		getImgWrap(img) {
			return $id('fs_' + img.alt);
		}
		getPNum(post) {
			return +post.getAttribute('data-num');
		}
		getSubmitData({ error, id }) {
			return { error, postNum: id && +id };
		}
		init() {
			const el = $id('postform');
			if(el) {
				el.setAttribute('action', el.getAttribute('action') + '?json=1');
			}
			defaultCfg.postSameImg = 0;
			defaultCfg.removeEXIF = 0;
			return false;
		}
	}
	ibDomains['ponyach.ru'] = Ponyach;

	class Ponychan extends Tinyboard {
		constructor(prot, dm) {
			super(prot, dm);

			this.qOPost = '.opContainer';

			this.jsonSubmit = false;
		}
		get css() {
			return `${ super.css }
				.mature_thread { display: block !important; }
				.mature_warning { display: none; }
				${ Cfg.imgNames ? '.post-filename { display: none; }' : '' }`;
		}
		getImgRealName(wrap) {
			return $q('.post-filename', wrap).textContent;
		}
		init() {
			super.init();
			$Q('img[data-mature-src]').forEach(el => (el.src = el.getAttribute('data-mature-src')));
			return false;
		}
	}
	ibDomains['ponychan.net'] = Ponychan;

	class Rfch extends Vichan {
		get css() {
			return `${ super.css }
				#coll-hide, #coll-show { display: none; }
				form[name="post"], form[name="post"] > table > tbody > tr:first-child
					{ display: block !important; }`;
		}
	}
	ibDomains['rfch.rocks'] = Rfch;

	class Synch extends Tinyboard {
		constructor(prot, dm) {
			super(prot, dm);

			this.qImgInfo = '.unimportant';
			this.qPages = '.pagination';

			this.markupBB = true;
		}
		get qImgNameLink() {
			return '.file-info > a';
		}
		get css() {
			return `${ super.css }
				.fa-sort { display: none; }
				time::after { content: none; }`;
		}
		get markupTags() {
			return ['b', 'i', 'u', 's', 'spoiler', 'code', 'sup', 'sub'];
		}
		init() {
			const val = '{ "simpleNavbar": true }';
			if(locStorage.settings !== val) {
				locStorage.settings = val;
				deWindow.location.reload();
				return true;
			}
			super.init();
			defaultCfg.timePattern = 'w+dd+m+yyyy+hh+ii+ss';
			defaultCfg.timeOffset = 4;
			defaultCfg.correctTime = 1;
			return false;
		}
		fixHTML(data, isForm) {
			const formEl = super.fixHTML(data, isForm);
			const els = $Q('.btn-group', formEl);
			for(let i = 0, len = els.length; i < len; ++i) {
				els[i].replaceWith($q('a', els[i]));
			}
			return formEl;
		}
	}
	ibDomains['syn-ch.ru'] = ibDomains['syn-ch.com'] = ibDomains['syn-ch.com.ua'] =
		ibDomains['syn-ch.org'] = Synch;

	class Warosu extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);

			this.qDelForm = '.content';
			this.qForm = '.subreply';
			this.qPostRef = '.js';
			this.qImgInfo = 'span';
			this.qOPost = 'div[itemscope]';

			this.res = 'thread/';
		}
		get css() {
			return '.quoted-by { display: none !important; }';
		}
		getTNum(thr) {
			return +$q('div[itemscope]', thr).id.match(/\d+/);
		}
		fixHTMLHelper(str) {
			return str.replace(/\/post\/(\d+)"/g, '/#$1"');
		}
	}
	ibDomains['warosu.org'] = Warosu;

	const wLoc = deWindow.location;
	const prot = wLoc.protocol;
	let dm = localData?.dm;
	if(checkDomains) {
		if(!dm) {
			const ibKeys = Object.keys(ibDomains);
			let i = ibKeys.length;
			const host = wLoc.hostname.toLowerCase();
			while(i--) {
				dm = ibKeys[i];
				if(host === dm || host.endsWith('.' + dm)) {
					return new ibDomains[dm](prot, dm);
				}
			}
		} else if(dm in ibDomains) {
			return new ibDomains[dm](prot, dm);
		}
	}
	if(!dm) {
		dm = wLoc.hostname;
	}
	if(!dm || !checkEngines) {
		return null;
	}
	dm = dm.match(/(?:(?:[^.]+\.)(?=org\.|net\.|com\.))?[^.]+\.[^.]+$|^\d+\.\d+\.\d+\.\d+$|localhost/)[0];
	for(let i = ibEngines.length - 1; i >= 0; --i) {
		const [path, Ctor] = ibEngines[i];
		if($q(path, doc)) {
			return new Ctor(prot, dm);
		}
	}
	return null;
}

/* ==[ Misc.js ]==============================================================================================
                                                MISCELLANEOUS
=========================================================================================================== */

// You can use Dollchan API listeners in Your external scripts and apps
// More info: https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/dollchan-api
const DollchanAPI = {
	initAPI() {
		this.hasListeners = false;
		if(!('MessageChannel' in deWindow)) {
			return;
		}
		const channel = new MessageChannel();
		this.port = channel.port1;
		this.port.onmessage = this._handleMessage;
		this.activeListeners = new Set();
		const port = channel.port2;
		doc.defaultView.addEventListener('message', e => {
			if(e.data === 'de-request-api-message') {
				this.hasListeners = true;
				doc.defaultView.postMessage('de-answer-api-message', '*', [port]);
			}
		});
	},
	hasListener: name => DollchanAPI.hasListeners && DollchanAPI.activeListeners.has(name),
	notify(name, data) {
		if(this.hasListener(name)) {
			this.port.postMessage({ name, data });
		}
	},

	_handleMessage({ data: arg }) {
		if(!arg?.name) {
			return;
		}
		let rv = null;
		const { name, data } = arg;
		switch(name.toLowerCase()) {
		case 'registerapi':
			if(data) {
				rv = {};
				for(const aName of data) {
					rv[aName] = DollchanAPI._register(aName.toLowerCase());
				}
			}
			break;
		}
		DollchanAPI.port.postMessage({ name, data: rv });
	},
	_register(name) {
		switch(name) {
		case 'expandmedia':
		case 'filechange':
		case 'newpost':
		case 'submitform': break;
		default: return false;
		}
		this.activeListeners.add(name);
		return true;
	}
};

// Checking for Dollchan updates from github
function checkForUpdates(isManual, lastUpdateTime) {
	if(!isManual) {
		if(Date.now() - +lastUpdateTime < [0, 1, 2, 7, 14, 30][Cfg.updDollchan] * 1e3 * 60 * 60 * 24) {
			return Promise.reject(new Error('Itʼs not time for an update yet'));
		}
	}
	return $ajax(
		gitRaw + 'src/modules/Wrap.js', { 'Content-Type': 'text/plain' }, true
	).then(({ responseText }) => {
		const v = responseText.match(/const version = '([0-9.]+)';/);
		const remoteVer = v?.[1]?.split('.');
		if(!remoteVer) {
			return Promise.reject(new Error('Canʼt get remote version'));
		}
		const currentVer = version.split('.');
		const src = `${ gitRaw }${ nav.isESNext ? 'src/' : '' }Dollchan_Extension_Tools.${
			nav.isESNext ? 'es6.' : '' }user.js`;
		saveCfgObj('lastUpd', Date.now());
		const link = `<a style="color: blue; font-weight: bold;" href="${ src }">`;
		const chLogLink = `<a target="_blank" href="${ gitWiki }${
			lang === 1 ? 'versions-en' : 'versions' }">\r\n${ Lng.changeLog[lang] }<a>`;
		for(let i = 0, len = Math.max(currentVer.length, remoteVer.length); i < len; ++i) {
			if((+remoteVer[i] || 0) > (+currentVer[i] || 0)) {
				return `${ link }${ Lng.updAvail[lang].replace('%s', v[1]) }</a>${ chLogLink }`;
			} else if((+remoteVer[i] || 0) < (+currentVer[i] || 0)) {
				break;
			}
		}
		if(isManual) {
			const c = responseText.match(/const commit = '([0-9abcdef]+)';/)[1];
			const vc = version + '.' + c;
			return c === commit ? Lng.haveLatestCommit[lang].replace('%s', vc) :
				`${ Lng.haveLatestStable[lang].replace('%s', version) }\r\n${
					Lng.newCommitsAvail[lang].replace('%s', `${ link }${ vc }</a>${ chLogLink }`) }`;
		}
		return Promise.reject(new Error());
	}, () => isManual ? `<div style="color: red; font-weigth: bold;">${
		Lng.noConnect[lang] }</div>` : Promise.reject(new Error(Lng.noConnect[lang]))
	);
}

function initPage() {
	if(aib.t) {
		if(Cfg.rePageTitle && Thread.first) {
			doc.title = `/${ aib.b } - ${ Thread.first.op.title }`;
		}
		if(!localData) {
			Cfg.stats.view++;
			saveCfgObj(aib.dm, Cfg);
		}
	} else {
		thrNavPanel.initThrNav();
	}
	if(!localData) {
		updater = initThreadUpdater(doc.title, aib.t && Cfg.ajaxUpdThr && !aib.isArchived);
	}
}

function scrollPage() {
	if(!aib.t && Cfg.scrollToTop) {
		scrollTo(0, 1);
		return;
	}
	setTimeout(() => {
		let post, num;
		const { hash } = deWindow.location;
		if(hash && (num = hash.match(/#[ip]?(\d+)$/)) &&
			(num = +num[1]) && (post = pByNum.get(num)) && !post.isOp
		) {
			post.selectAndScrollTo();
			return;
		}
		const id = 'de-scroll-' + aib.b + (aib.t || '');
		const val = +sesStorage[id];
		if(val && needScroll && Cfg.saveScroll) {
			scrollTo(0, val);
			sesStorage.removeItem(id);
		}
	}, 0);
}

/* ==[ SvgIcons.js ]==========================================================================================
                                                  SVG ICONS
=========================================================================================================== */

/* eslint-disable max-len */

function addSVGIcons() {
	docBody.insertAdjacentHTML('beforeend', `
	<div id="de-svg-icons">
	<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
	<defs>
		<linearGradient id="de-btn-back-gradient" x1="50%" y1="0%" y2="100%" x2="50%">
			<stop offset="0%" stop-color="#A0A0A0"/>
			<stop offset="50%" stop-color="#505050"/>
			<stop offset="100%" stop-color="#A0A0A0"/>
		</linearGradient>
		<linearGradient id="de-file-del-gradient" x1="50%" y1="10%" x2="50%" y2="90%">
			<stop offset="0" stop-color="#fbd"/>
			<stop offset="50%" stop-color="#f30"/>
		</linearGradient>
	</defs>

	<!-- POST ICONS -->
	<symbol viewBox="0 0 16 16" id="de-symbol-post-back">
		<path class="de-post-btns-back" d="M4 1Q1 1 1 4v8q0 3 3 3h8q3 0 3-3V4q0-3-3-3z"/>
	</symbol>
	<symbol viewBox="0 0 16 16" id="de-symbol-post-hide">
		<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>
		<path class="de-svg-stroke" stroke-width="2.5" d="M4.5 11.5l7-7M11.5 11.5l-7-7"/>
	</symbol>
	<symbol viewBox="0 0 16 16" id="de-symbol-post-unhide">
		<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>
		<path class="de-svg-stroke" stroke-width="2" d="M8 4v8M4 8h8"/>
	</symbol>
	<symbol viewBox="0 0 16 16" id="de-symbol-post-reply">
		<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>
		<path class="de-svg-fill" d="M5 11c0 .8.6 1.2 1.3.7l5-3c.6-.4.6-1 0-1.5l-5-3C5.6 4 5 4.3 5 5v6z"/>
	</symbol>
	<symbol viewBox="0 0 16 16" id="de-symbol-post-expthr">
		<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>
		<path class="de-svg-fill" d="M4.5 6L8 3l3.5 3H9.25v4h2.25L8 13l-3.5-3h2.25V6z"/>
	</symbol>
	<symbol viewBox="0 0 16 16" id="de-symbol-post-fav">
		<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>
		<path class="de-svg-fill" d="M8 3l1.5 3 3.5.5-2.5 2.2 1 3.8-3.5-2-3.5 2 1-3.8L3 6.5 6.5 6 8 3z"/>
	</symbol>
	<symbol viewBox="0 0 16 16" id="de-symbol-post-stick">
		<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>
		<path class="de-svg-fill" d="M5 5h6v6H5z"/>
	</symbol>
	<symbol viewBox="0 0 16 16" id="de-symbol-post-sage">
		<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>
		<path class="de-svg-fill" d="M4 9h8l-4 4.5zm2-6h4v1H6zm0 2h4v1H6zm0 2h4v1H6z"/>
	</symbol>
	<symbol viewBox="0 0 16 16" id="de-symbol-post-img">
		<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>
		<circle class="de-svg-stroke" stroke-width="2" cx="7" cy="7" r="2.5"/>
		<path class="de-svg-stroke" stroke-width="2" d="M9 9l3 3"/>
	</symbol>

	<!-- FILE ICONS -->
	<symbol viewBox="0 0 16 16" id="de-symbol-file-del">
		<path fill="url(#de-file-del-gradient)" stroke="#ca2900" d="M4 1.3l4 4 4-4L14.8 4l-4 4 4 4-2.8 2.8-4-4-4 4L1.3 12l4-4-4-4L4 1.3z"/>
	</symbol>
	<symbol viewBox="0 0 16 16" width="16" height="16" id="de-symbol-file-rar">
		<path stroke="#07ac07" stroke-width="2" d="M3 13h13"/>
		<path stroke="#03043f" stroke-width="4" d="M3 10h13"/>
		<path stroke="#cc5dc1" stroke-width="2" d="M3 7h13"/>
		<path fill="#ccd0db" d="M3 14l-3-3V3l3 3v8z"/>
		<path fill="#666" d="M3 5L0 2v1l3 3V5zm0 3L0 5v1l3 3V8zm0 3L0 8v1l3 3v-1zm0 3l-3-3v1l3 3v-1z"/>
		<path stroke="#103cef" stroke-width="2" d="M3 10h13"/>
		<path stroke="#294f1d" d="M3 14.5h13"/>
		<path fill="#994a95" d="M13 2H0l3 3h13l-3-3z"/>
		<path stroke="#7C467a" d="M3 5.5h13"/>
		<path stroke="#513400" stroke-width="2" d="M9.5 15V5"/>
		<path fill="#513400" d="M10.5 5l-3-3h-2l3 3h2z"/>
		<path stroke="#ceab00" stroke-width="4" d="M7 10h5"/>
		<path fill="none" stroke="#222" d="M8.5 9v1.5h2V9"/>
	</symbol>
	<symbol viewBox="0 0 16 16" id="de-symbol-file-ren">
		<circle fill="#ffe888" stroke="#333" stroke-width=".75" cx="6" cy="14" r="1.5"/>
		<circle fill="#ffe888" stroke="#333" stroke-width=".75" cx="10" cy="14" r="1.5"/>
		<circle fill="#ffe888" stroke="#333" stroke-width=".75" cx="14" cy="14" r="1.5"/>
		<path fill="#fcb45e" stroke="#3a2200" stroke-width=".75" d="M2 8L9.5.5l1.8 1.8-7.5 7.5L2 8z"/>
		<path fill="#ff8a33" stroke="#3a2200" stroke-width=".75" d="M3.8 9.8l7.5-7.5L13 4l-7.5 7.5-1.7-1.7z"/>
		<path fill="#ffe888" stroke="#333" stroke-width=".75" d="M2 8l-.5.5L1 9v3.5h3.5l1-1-1.7-1.7L2 8z"/>
		<path stroke="#333" d="M1 12.5L2.5 11"/>
	</symbol>
	<symbol viewBox="0 0 16 16" id="de-symbol-file-txt">
		<circle fill="#2cabe1" cx="8" cy="8" r="7.5"/>
		<line stroke="#fff" stroke-width="2" x1="8" y1="3" x2="8" y2="13"/>
		<line stroke="#fff" stroke-width="2" x1="3" y1="8" x2="13" y2="8"/>
	</symbol>

	<!-- WINDOW ICONS -->
	<symbol viewBox="0 0 16 16" id="de-symbol-win-arrow">
		<path class="de-svg-stroke" stroke-width="3.5" d="M8 13V6"/>
		<path class="de-svg-fill"  d="M3.5 7h9L8 2.5 3.5 7z"/>
	</symbol>
	<symbol viewBox="0 0 16 16" id="de-symbol-win-close">
		<path class="de-svg-stroke" stroke-width="2.5" d="M3.5 3.5l9 9m-9 0l9-9"/>
	</symbol>

	<!-- THREAD NAVIGATION ICONS -->
	<symbol viewBox="0 0 7 7" id="de-symbol-thr-nav-arrow">
		<path class="de-svg-fill" d="M6 3.5L2 0v7z"/>
	</symbol>
	<symbol viewBox="0 0 24 24" id="de-symbol-thr-nav-up">
		<path class="de-svg-stroke" stroke-width="3" d="M3 22.5l9-9 9 9M3 13.5l9-9 9 9"/>
	</symbol>
	<symbol viewBox="0 0 24 24" id="de-symbol-thr-nav-down">
		<path class="de-svg-stroke" stroke-width="3" d="M3 11.5l9 9 9-9M3 2.5l9 9 9-9"/>
	</symbol>

	<!-- IMAGE BUTTON ICONS -->
	<symbol viewBox="0 0 32 32" id="de-symbol-img-btn-arrow">
		<path class="de-svg-stroke" stroke-width="8" d="M0 16h20"/>
		<path class="de-svg-stroke" stroke-width="9" d="M13 3l16 16M13 29l16-16"/>
	</symbol>
	<symbol viewBox="0 0 32 32" id="de-symbol-img-btn-auto">
		<path class="de-svg-fill" d="M13.2 26.6c-3.1 2.4-5.9.5-5.9-3.3V8.7c0-3.8 2.8-5.6 6.1-3.3l12.5 7.1c3.1 1.9 3.1 5.2 0 7.1 0-.1-12.7 7-12.7 7z"/>
	</symbol>
	<symbol viewBox="0 0 32 32" id="de-symbol-img-btn-rotate">
		<path class="de-svg-stroke" stroke-width="7" d="M16 4c6.6 0 12 5.4 12 12s-5.4 12-12 12S4 22.6 4 16"/>
		<path class="de-svg-fill" d="M13.5 19.2L0 27V11.4z"/>
	</symbol>

	<!-- MAIN PANEL -->
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-logo">
		<path class="de-svg-fill" d="M22 5h-10v16h4v-14h6z"/>
		<path class="de-svg-stroke" stroke-width="3" d="M22 20.5H12c-2.8 0-5.7 0-5.7-4s2.8-4 5.7-4H21"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-cfg">
		<circle class="de-svg-stroke" stroke-width="3" cx="12.5" cy="12.5" r="6"/>
		<path class="de-svg-stroke" stroke-width="3" d="M12.5 6.5v-3M18.5 12.5h3M12.5 18.5v3M6.5 12.5h-3M16.7 8.3L19 6M16.7 16.7L19 19M8.3 16.7L6 19M8.3 8.3L6 6"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-hid">
		<path class="de-svg-stroke" stroke-width="4" d="M6 19L19 6M6 6l13 13"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-fav">
		<path class="de-svg-fill" d="M12.5 3.5l2.5 6 6.5.5-5 4.2 2 6.8-6-4-6 4 2-6.8-5-4.2 6.5-.5 2.5-6z"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-vid">
		<path class="de-svg-fill" d="M12.5 4a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zm-1 13c-1.3 1-2.5.2-2.5-1.4V9.4C9 7.8 10.2 7 11.6 8l5.3 3c1.3.8 1.3 2.2 0 3l-5.4 3z"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-refresh">
		<path class="de-svg-fill" d="M14 4v4.3a4.5 4.5 0 1 1-3 0V4a8.5 8.5 0 1 0 3 0z"/>
		<path class="de-svg-fill" d="M13 11V4h7"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-arrow">
		<path class="de-svg-stroke" stroke-width="5" d="M4 12.5h12"/>
		<path class="de-svg-fill" d="M14 19V6l7 6.5"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-expimg">
		<path class="de-svg-stroke" stroke-width="2" d="M20 18c0 1-1 2-2 2H7c-1 0-2-1-2-2V7c0-1 1-2 2-2h11c1 0 2 1 2 2v11z"/>
		<path stroke-width="3" d="M8 12.5h9"/>
		<path d="M10 8v9l-5-4.5M15 17V8l5 4.5"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-maskimg">
		<path class="de-svg-stroke" stroke-width="2" d="M20 18c0 1-1 2-2 2H7c-1 0-2-1-2-2V7c0-1 1-2 2-2h11c1 0 2 1 2 2v11z"/>
		<path d="M5 20L20 5M5 15.5L15.5 5M5 11l6-6M20 9.5L9.5 20M20 14l-6 6"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-preimg">
		<path class="de-svg-stroke" stroke-width="2" d="M20 18c0 1-1 2-2 2H7c-1 0-2-1-2-2V7c0-1 1-2 2-2h11c1 0 2 1 2 2v11z"/>
		<path stroke-width="3" d="M12.5 17V9"/>
		<path d="M8 15h9l-4.5 5"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-savethr">
		<path class="de-svg-fill" d="M18 4h-1v6H8V4H6C5 4 4 5 4 6v13c0 1 1 2 2 2h13c1 0 2-1 2-2V7l-3-3zM6 20v-8h13v8H6z"/>
		<path class="de-svg-stroke" stroke-width="3" d="M13.5 9V4"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-upd">
		<circle cx="12.5" cy="10.8" r="4"/>
		<path class="de-svg-stroke" stroke-width="2" stroke-linejoin="round" d="M4.5 12q8-10,16 0q-8 10,-16 0z"/>
		<path class="de-svg-stroke" d="M11 7L9.8 5M14 7l1.2-2M11 17l-1.2 2m4.2-2l1.2 2M7 8.5L5.3 6.8M7 15.5l-1.7 1.7M18 8.5l1.7-1.7M18 15.5l1.7 1.7"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-audio-off">
		<path class="de-svg-fill" d="M13 21V4L8 9H4v7h4l5 5z"/>
		<path class="de-svg-stroke" stroke-width="2" d="M15 9.5l6 6m0-6l-6 6"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-audio-on">
		<path class="de-svg-fill" d="M13 21V4L8 9H4v7h4z"/>
		<path class="de-svg-stroke" stroke-width="2" d="M15.5 7.5c1.7 3.3 1.7 6.7 0 10m3-12.5c3 5 3 10 0 15"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-catalog">
		<path class="de-svg-fill" d="M5 5h3v3H5zm12 0h3v3h-3zm-4 0h3v3h-3zM9 5h3v3H9zM5 9h3v3H5zm12 0h3v3h-3zm-4 0h3v3h-3zM9 9h3v3H9zm-4 4h3v3H5zm12 0h3v3h-3zm-4 0h3v3h-3zm-4 0h3v3H9zm-4 4h3v3H5zm12 0h3v3h-3zm-4 0h3v3h-3zm-4 0h3v3H9z"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-enable">
		<path class="de-svg-stroke" stroke-width="3" d="M12.5 4v8"/>
		<path class="de-svg-fill" d="M16 4.8v4a5 5 0 0 1-3.5 8.7A5 5 0 0 1 9 9V4.7a8.5 8.5 0 1 0 7 0z"/>
	</symbol>

	<!-- MARKUP BUTTONS -->
	<symbol viewBox="0 0 23 22" id="de-symbol-markup-back">
		<path class="de-markup-back" stroke-width="2" d="M6 1q-5 0,-5 5v10q0 5,5 5h11q5 0,5 -5v-10q0 -5,-5-5z"/>
	</symbol>
	<symbol viewBox="0 0 23 22" id="de-symbol-markup-bold">
		<use xlink:href="#de-symbol-markup-back"/>
		<text x="5.5" y="17" style="font-family: sans-serif; font-size: 17px; font-weight: 800;">B</text>
	</symbol>
	<symbol viewBox="0 0 23 22" id="de-symbol-markup-italic">
		<use xlink:href="#de-symbol-markup-back"/>
		<text x="8" y="17" style="font-family: sans-serif; font-size: 17px; font-weight: 600; font-style: italic;">i</text>
	</symbol>
	<symbol viewBox="0 0 23 22" id="de-symbol-markup-under">
		<use xlink:href="#de-symbol-markup-back"/>
		<text x="6" y="15" width="20" style="font-family: sans-serif; font-size: 17px; font-weight: 600;">u</text>
		<path stroke="#444" stroke-width="1.5" d="M6 17H17.5"/>
	</symbol>
	<symbol viewBox="0 0 23 22" id="de-symbol-markup-strike">
		<use xlink:href="#de-symbol-markup-back"/>
		<text x="4" y="17" style="font-family: sans-serif; font-size: 22px; font-weight: 600; font-style: italic;">s</text>
		<path stroke="#444" d="M4 11H19"/>
	</symbol>
	<symbol viewBox="0 0 23 22" id="de-symbol-markup-spoil">
		<use xlink:href="#de-symbol-markup-back"/>
		<path stroke="#666" stroke-width="10" d="M4 11H19"/>
	</symbol>
	<symbol viewBox="0 0 23 22" id="de-symbol-markup-code">
		<use xlink:href="#de-symbol-markup-back"/>
		<text x="5" y="17" style="font-family: 'Lucida Console', monospace; font-size: 18px; font-weight: 600;">C</text>
	</symbol>
	<symbol viewBox="0 0 23 22" id="de-symbol-markup-sup">
		<use xlink:href="#de-symbol-markup-back"/>
		<text x="4" y="15" style="font-family: sans-serif; font-size: 16px; font-weight: 600;">x</text>
		<text x="14" y="10" style="font-family: sans-serif; font-size: 8px; font-weight: 600;">2</text>
	</symbol>
	<symbol viewBox="0 0 23 22" id="de-symbol-markup-sub">
		<use xlink:href="#de-symbol-markup-back"/>
		<text x="4" y="15" style="font-family: sans-serif; font-size: 16px; font-weight: 600;">x</text>
		<text x="14" y="17" style="font-family: sans-serif; font-size: 8px; font-weight: 600;">2</text>
	</symbol>
	<symbol viewBox="0 0 23 22" id="de-symbol-markup-quote">
		<use xlink:href="#de-symbol-markup-back"/>
		<text x="6" y="18" style="font-family: sans-serif; font-size: 20px; font-weight: 600;">&gt;</text>
	</symbol>

	<!-- OTHER -->
	<symbol viewBox="0 0 16 16" id="de-symbol-wait">
		<circle fill="#929087" cx="8" cy="2" r="2"/>
		<circle fill="#C5C2BA" cx="8" cy="14" r="2"/>
		<circle fill="#ACAAA0" cx="2" cy="8" r="2"/>
		<circle fill="#79766C" cx="14" cy="8" r="2"/>
		<circle fill="#D2CFC6" cx="12.25" cy="12.25" r="2"/>
		<circle fill="#9F9C93" cx="3.75" cy="3.75" r="2"/>
		<circle fill="#B9B6AE" cx="3.75" cy="12.25" r="2"/>
		<circle fill="#868379" cx="12.25" cy="3.75" r="2"/>
	</symbol>
	<symbol viewBox="0 0 16 16" id="de-symbol-closed">
		<image display="inline" width="16" height="16" xlink:href="data:image/gif;base64,R0lGODlhEAAQAKIAAP3rqPPOd+y6V+WmN+Dg4M7OzmZmZv///yH5BAEAAAcALAAAAAAQABAAAANCeLrWvZARUqqJkjiLj9FMcWHf6IldGZqM4zqRAcw0zXpAoO/6LfeNnS8XcAhjAIHSoFwim0wockCtUodWq+/1UiQAADs="/>
	</symbol>
	<symbol viewBox="0 0 16 16" id="de-symbol-unavail">
		<circle class="de-svg-stroke" fill="none" stroke-width="2" cx="8" cy="8" r="5"/>
		<path class="de-svg-stroke" stroke-width="2" d="M4 4l8 8"/>
	</symbol>
	</svg>
	</div>`);
}

/* eslint-enable max-len */

/* ==[ Css.js ]===============================================================================================
                                                     CSS
=========================================================================================================== */

/* eslint-disable max-len */

function scriptCSS() {
	const cont = (id, src) => `${ id }::before { content: ""; display: inline-block; vertical-align: -3px; padding: 16px 16px 0 0; margin-right: 4px; background: url(${ src }) no-repeat center; background-size: contain; }`;

	let x = `
	/* Main panel */
	#de-panel { position: fixed; right: 0; bottom: 0; z-index: 9999; border-radius: 15px 0 0 0; cursor: default; display: flex; min-height: 25px; color: #F5F5F5; }
	#de-panel-logo { flex: none; margin: auto 3px auto 0; cursor: pointer; }
	#de-panel-buttons { flex: 0 1 auto; display: flex; flex-flow: row wrap; align-items: center; padding: 0 0 0 2px; margin: 0; border-left: 1px solid #616b86; }
	.de-panel-button { display: block; flex: none; margin: 0 1px; padding: 0; transition: all .3s ease; }
	.de-panel-button-active { stroke: #32ff32 !important; fill: #32ff32 !important; }
	a.de-panel-button, a.de-panel-button:hover { color: inherit !important; }
	.de-panel-svg, #de-panel-logo, .de-panel-logo-svg, .de-panel-button { width: 25px; height: 25px; }
	#de-panel-expimg, #de-panel-maskimg, #de-panel-preimg { stroke: currentColor; fill: currentColor; }
	#de-panel-goback { transform: rotate(180deg); will-change: transform; }
	#de-panel-godown { transform: rotate(90deg); will-change: transform; }
	#de-panel-goup { transform: rotate(-90deg); will-change: transform; }
	#de-panel-upd-on { fill: #32ff32; }
	#de-panel-upd-warn { fill: #fff441; }
	#de-panel-upd-off { fill: #ff3232; }
	#de-panel-audio-on > .de-panel-svg > .de-use-audio-off, #de-panel-audio-off > .de-panel-svg > .de-use-audio-on { display: none; }
	#de-panel-info { display: flex; flex: none; padding: 0 6px; margin-left: 2px; border-left: 1px solid #616b86; font: 18px serif; }
	#de-panel-info-icount::before, #de-panel-info-acount:not(:empty)::before { content: "/"; }
	#de-svg-icons, #de-svg-icons > svg { height: 0; width: 0; position: fixed; }
	.de-svg-fill { stroke: none; fill: currentColor; }
	.de-svg-stroke { stroke: currentColor; fill: none; }
	use { fill: inherit; pointer-events: none; }

	/* Panel theme */
	.de-img-btn, #de-panel, .de-win-head ${ [
		/* Gradient darkblue */
		'{ background: linear-gradient(to bottom, #7b849b, #616b86 8%, #3a414f 52%, rgba(0,0,0,0) 52%), linear-gradient(to bottom, rgba(0,0,0,0) 48%, #121212 52%, #1f2740 100%); }',
		/* Gradient blue */
		`{ background: linear-gradient(to bottom, #4b90df, #3d77be 20%, #376cb0 28%, #295591 52%, rgba(0,0,0,0) 52%), linear-gradient(to bottom, rgba(0,0,0,0) 48%, #183d77 52%, #1f4485 72%, #264c90 80%, #325f9e 100%); }
		#de-panel-buttons, #de-panel-info { border-color: #8fbbed; }`,
		/* Solid grey */
		`{ background-color: #777; }
		#de-panel-buttons, #de-panel-info { border-color: #ccc; }
		.de-panel-svg:hover { border: 2px solid #444; border-radius: 5px; box-sizing: border-box; transition: none; }`,
		/* Transparent blue */
		'{ background-color: rgba(0,20,80,.72); }',
		/* Square dark */
		`{ background: none; background-color: #333; border-radius: 0 !important; }
		#de-win-reply.de-win { border-radius: 0 !important; }
		#de-panel-buttons, #de-panel-info { border-color: #666; }`
	][Cfg.scriptStyle] }
	.de-logo { background: linear-gradient(to bottom, #7b849b, #616b86 8%, #3a414f 52%, rgba(0,0,0,0) 52%), linear-gradient(to bottom, rgba(0,0,0,0) 48%, #121212 52%, #1f2740 100%); }
	${ Cfg.scriptStyle === 2 ?
		'.de-panel-svg:hover { border: 2px solid #444; border-radius: 5px; box-sizing: border-box; transition: none; }' :
		'.de-panel-button:hover { background-color: rgba(255,255,255,.15); box-shadow: 0 0 3px rgba(143,187,237,.5); }' }\r\n`;

	if(Cfg.disabled) {
		$css(x).id = 'de-css';
		return;
	}

	x += `
	/* Windows */
	.de-win .de-win-btn-toggle { transform: rotate(180deg); }
	.de-resizer { position: absolute; }
	.de-resizer-bottom { height: 6px; bottom: -3px; left: 0; right: 0; cursor: ns-resize; }
	.de-resizer-left { width: 6px; top: 0px; bottom: 0px; left: -3px; cursor: ew-resize; }
	.de-resizer-right { width: 6px; top: 0px; bottom: 0px; right: -3px; cursor: ew-resize; }
	.de-resizer-top { height: 6px; top: -3px; left: 0; right: 0; cursor: ns-resize; }
	.de-win > .de-win-head { cursor: move; }
	.de-win-buttons { position: absolute; right: 0; margin: 0 2px 0 0; font-size: 0; cursor: pointer; }
	.de-win-buttons > svg { transition: background .3s ease, box-shadow .3s ease; }
	.de-win-buttons > svg:hover { background-color: rgba(255,255,255,.2); box-shadow: 0 0 2px rgba(255,255,255,.4); }
	.de-win-inpost > .de-win-head > .de-win-buttons > svg:hover { background-color: rgba(64,64,64,.15); box-shadow: 0 0 2px rgba(64,64,64,.3); }
	#de-win-cfg { width: 355px; }
	#de-win-cfg, #de-win-fav, #de-win-hid, #de-win-vid { position: fixed; max-height: 92%; overflow-x: hidden; overflow-y: auto; }
	#de-win-cfg > .de-win-body { float: none; display: block; width: auto; min-width: 0; max-width: 100% !important; padding: 0 !important; margin: 0 !important; border: none; }
	#de-win-fav > .de-win-body, #de-win-hid > .de-win-body, #de-win-vid > .de-win-body { padding: 6px; border: 1px solid gray; }
	#de-win-hid { max-width: 60%; }
	#de-win-vid > .de-win-body { display: flex; flex-direction: column; align-items: center; }
	#de-win-vid .de-entry { white-space: normal; }
	.de-win-head { position: relative; padding: 2px; border-radius: 10px 10px 0 0; color: #F5F5F5; font: bold 14px/16px arial; text-align: center; cursor: default; }

	/* Settings window */
	.de-block { display: block; }
	#de-btn-spell-add { margin-left: auto; }
	#de-cfg-bar { display: flex; margin: 0; padding: 0; }
	.de-cfg-body { min-height: 354px; padding: 9px 7px 7px; margin-top: -1px; font: 13px/15px arial !important; -moz-box-sizing: content-box; box-sizing: content-box; }
	.de-cfg-body, #de-cfg-buttons { border: 1px solid #183d77; border-top: none; }
	.de-cfg-button { padding: 0 ${ nav.isFirefox ? '2' : '4' }px !important; margin: 0 4px; height: 21px; font: 12px arial !important; }
	#de-cfg-button-debug { padding: 0 2px; font: 13px/15px arial; }
	#de-cfg-buttons { display: flex; align-items: center; padding: 3px; }
	#de-cfg-buttons > label { flex: 1 0 auto; }
	.de-cfg-chkbox { ${ nav.isPresto ? '' : 'vertical-align: -1px !important; ' }margin: 2px 1px !important; }
	#de-cfg-info { display: flex; flex-direction: column; }
	input[type="text"].de-cfg-inptxt { width: auto; height: auto; min-height: 0; padding: 0 2px !important; margin: 1px 4px 1px 0 !important; font: 13px arial !important; border-width: 1px; }
	.de-cfg-inptxt, .de-cfg-label, .de-cfg-select { display: inline; width: auto; height: auto !important; font: 13px/15px arial !important; }
	.de-cfg-label { padding: 0; margin: 0; }
	.de-cfg-select { padding: 0 2px; margin: 1px 0; font: 13px arial !important; float: none; appearance: auto; }
	.de-cfg-tab { flex: 1 0 auto; display: block !important; margin: 0 !important; float: none !important; width: auto !important; min-width: 0 !important; padding: 4px 0 !important; box-shadow: none !important; border: 1px solid #444 !important; border-radius: 4px 4px 0 0 !important; opacity: 1; font: bold 12px arial; text-align: center; cursor: default; background-image: linear-gradient(to bottom, rgba(132,132,132,.35) 0%, rgba(79,79,79,.35) 50%, rgba(40,40,40,.35) 50%, rgba(80,80,80,.35) 100%) !important; }
	.de-cfg-tab:hover { background-image: linear-gradient(to top, rgba(132,132,132,.35) 0%, rgba(79,79,79,.35) 50%, rgba(40,40,40,.35) 50%, rgba(80,80,80,.35) 100%) !important; }
	.de-cfg-tab[selected], .de-cfg-tab[selected]:hover { background-image: none !important; border-bottom: none !important; }
	.de-cfg-tab::${ nav.isFirefox ? '-moz-' : '' }selection { background: transparent; }
	.de-cfg-unvis { display: none !important; }
	.de-depend { padding-left: 17px; }
	#de-info-log, #de-info-stats { width: 100%; padding: 0px 7px; }
	#de-info-log { overflow-y: auto; border-left: 1px solid grey; }
	.de-info-name { flex: 1 0 auto; }
	.de-info-row { display: flex; }
	#de-info-table { display: flex; flex: 1 0 auto; }
	.de-spell-btn { padding: 0 4px; }
	#de-spell-editor { display: flex; align-items: stretch; height: 256px; padding: 2px 0; }
	#de-spell-panel { display: flex; }
	#de-spell-txt { padding: 2px !important; margin: 0; width: 100%; min-width: 0; border: none !important; outline: none !important; font: 12px courier new; ${ nav.isPresto ? '' : 'resize: none !important; ' }}
	#de-spell-rowmeter { padding: 2px 3px 0 0; overflow: hidden; min-width: 2em; background-color: #616b86; text-align: right; color: #fff; font: 12px courier new; }
	#de-win-cfg.de-win-fixed { z-index: 10001 !important; }

	/* Settings window theme */
	${ [/* Gradient darkblue */
		`#de-cfg-bar { background-color: #1f2740; }
		.de-cfg-tab { border-color: #121421 !important; }`,
		/* Gradient blue */
		`#de-cfg-bar { background-color: #325f9e; }
		.de-cfg-tab { border-color: #183d77 !important; }`,
		/* Solid grey */
		`#de-cfg-bar, #de-spell-rowmeter { background-color: #777; }
		.de-cfg-body, #de-cfg-buttons { border-color: #444; }`,
		/* Transparent blue */
		`#de-cfg-bar { background-color: rgba(0,20,80,.72); }
		.de-cfg-tab { border-color: #001450 !important; }`,
		/* Square dark */
		`#de-cfg-bar { background-color: #222; }
		.de-cfg-body, #de-cfg-buttons { border-color: #666; }`
	][Cfg.scriptStyle] }

	/* Favorites window */
	.de-entry { display: flex !important; align-items: center; float: none !important; padding: 0 !important; margin: 1px 0 !important; min-width: 0 !important; border: none !important; font-size: 13px; overflow: hidden !important; white-space: nowrap; }
	.de-entry-title { flex: auto; padding-left: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
	#de-fav-buttons, #de-hid-buttons, #de-fav-del-confirm { padding-top: 6px; }
	.de-fav-entries { border-top: 1px solid rgba(80,80,80,.3); }
	.de-fav-entries-hide, .de-fav-inf-icon:not(.de-fav-closed):not(.de-fav-unavail):not(.de-fav-wait), .de-fav-closed > .de-fav-unavail-use, .de-fav-closed > .de-fav-wait-use, .de-fav-unavail > .de-fav-closed-use, .de-fav-unavail > .de-fav-wait-use, .de-fav-wait > .de-fav-closed-use, .de-fav-wait > .de-fav-unavail-use { display: none; }
	.de-fav-del-btn { margin-left: 2px; cursor: pointer; }
	.de-fav-del-btn > svg { width: 12px; height: 12px; opacity: 0.65; vertical-align: -2px; }
	.de-fav-del-btn[de-checked] > svg { color: red; background-color: rgba(255,0,0,.2); border-radius: 7px; opacity: 1; }
	.de-fav-header { display: flex; cursor: pointer; font-size: 13px; }
	.de-fav-header-btn { flex: 1 0 auto; margin-right: 2px; font-size: 11px; color: inherit; text-align: right; opacity: 0.65; }
	.de-fav-header-link { margin-left: 2px; color: inherit; font-weight: bold; text-decoration: none; outline: none; }
	.de-fav-inf { flex: none; padding: 0 4px 0 10px; font: bold 14px serif; cursor: default; }
	.de-fav-inf-icon, .de-fav-inf-iwrap  { width: 16px; height: 16px; }
	.de-fav-inf-icon { margin-bottom: -3px; }
	.de-fav-inf-new { color: #424f79; }
	.de-fav-inf-new::after { content: " +"; }
	.de-fav-inf-old { color: #4f7942; }
	.de-fav-inf-you { padding: 0 4px; margin-right: 4px; border-radius: 3px; color: #fff; background-color: #424f79; opacity: 0.65; }
	.de-fav-link { flex: none; margin-left: 2px; text-decoration: none; border: none; }
	.de-fav-table-unfold > .de-fold-block > .de-fav-entries { display: initial !important; }
	.de-fav-unavail { color: #cf4436; }
	.de-fold-block { border: 1px solid rgba(120,120,120,.8); border-radius: 2px; }
	.de-fold-block:not(:first-child) { border-top: none; }

	/* Post panel */
	.de-btn-hide > .de-btn-unhide-use, .de-btn-hide-user > .de-btn-unhide-use, .de-btn-unhide > .de-btn-hide-use, .de-btn-unhide-user > .de-btn-hide-use { display: none; }
	.de-btn-expthr, .de-btn-fav, .de-btn-fav-sel, .de-btn-hide, .de-btn-hide-user, .de-btn-img, .de-btn-reply, .de-btn-sage, .de-btn-stick, .de-btn-stick-on, .de-btn-unhide, .de-btn-unhide-user, .de-win-btn-clear, .de-win-btn-close, .de-win-btn-toggle { margin: 0 2px -3px 0 !important; cursor: pointer; width: 16px; height: 16px; }${
	!pr.form && !pr.oeForm ? '.de-btn-reply { display: none; }' : '' }
	.de-post-btns { margin-left: 4px; }
	.de-post-btns-back { fill: inherit; stroke: none; }
	.de-post-note:not(:empty) { color: inherit; margin: 0 4px; vertical-align: 1px; font: italic bold 12px serif; }
	.de-thread-note { font-style: italic; }

	/* Sauce buttons */
	${ cont('.de-src-google', 'data:image/gif;base64,R0lGODlhEAAQAMQAAIy0+tHh/gJc8Qlh8UyM9H2r9/3///7//x+OfACSJy+mTZHQos3Te////f///v3HAP+uAPzWjvWTWeUTAPSdl/79/f////39/f///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABgALAAAAAAQABAAAAVuICaKh2Eax6hih+W+bqoaLjXdE+UaY2vhwInrInLhdBYbDEOL3GBQS4X2gEiiUBoEAhMIBl6CpaHlvrxocaO1XUQBgsLYxUgkot7AGONS2N0WCwgCYhZFfXaJCQguDiMvC34JCoCOKlgvK49QKyEAOw==') }
	${ cont('.de-src-yandex', 'data:image/gif;base64,R0lGODlhEAAQAMQAAP////v7+/r5+fb29vHx8eLi4tnZ2dTU1NDQ0MvLy8fHx8TExPzJv/immvlXRvq0re4UEdeGhtbFxcnJyby8vKampm5ubv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABcALAAAAAAQABAAAAVx4CWOZCkOQKqq5uoCQhnMQuPcc2CQuc3YuQBJQHQ8BA8HkUgYDZ6Qx+ABeVoVIoL2RmhAtODmpUD23iDkdEFkaBsiEAfE3a6IDngJJALH4ycjCIJyCXCCgiQJhXuLigl2IwqSk5QUJRQLmZqaFiaeniEAOw==') }
	${ cont('.de-src-tineye', 'data:image/gif;base64,R0lGODlhEAAQAMQAAP///wAAAAwOEhg4UDZ7skGNxkuf3Vycxx4nLerw9DlSX2FnanO21Epxg4LO62KOnpXj+ZGcmb7CvbZ6RfxmAIxBCzsGAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABcALAAAAAAQABAAAAWlYGIUZGGc6HgkxzSRozIgdHMUx0NR5hH8v8VjeFsoDAyFpcKcQByMnIGgYDAikmxkOLQWqNAGQhAQLBC/BgSXC0QivwgAgFbjHLQ5XDKXBBRrBA80WAABRgkJPwxfDw2HCYYBfHABDSQMDgoIEgs/ZgoPDmuYEFEHmQ6jT5ckBKirEE8HCgEWJQe5ZwJjQBYRBwQMsk8RFgJkP04sVrHGNAEVEAAhADs=') }
	${ cont('.de-src-saucenao', 'data:image/gif;base64,R0lGODlhEAAQAIAAAP///wAAACwAAAAAEAAQAAACJ4yPacDtvpQCkU1KT0P75i49mbSAZACd6HN2pmbBI7pe9K1+4q5KBQA7') }
	${ cont('.de-src-iqdb', 'data:image/gif;base64,R0lGODlhEAAQAMQAAP//////AP8A//8AAAD//wD/AAAA/wAAANx/hV1ISW9YWvLOd/u0T+WlTNaqcKdtMv/r1mxML7OCVoxtUbmmlfPRuKKGeHpcTvK3nEEvKGpRTCcbGU48OYVua3tkYv///yH5BAEAAB8ALAAAAAAQABAAAAW4INV5ZDcmibM0iVJRnukpmnJJDdNwnDWSk4vCNMnpGJXfwqHReDQJTuTxmEhmqoTFEtRsNhltRTFZTBKUl2IzAmeE2csFA8kcKADLl5NgSDgaGRYAFVYQABkRgAxnGhcdEJEVhxYSDhwNEQkaEhSRGBgIGBUOGBwXERkcExyeFaGjr4E8qgcHDpKgkQpRGhwZYA4Vw6CvPBOpwD0ODlMSoxcJOQ8ZyhccBxkSkRRFDw4SD1/jF5MQIQA7') }
	${ cont('.de-src-tracemoe', 'data:image/gif;base64,R0lGODlhEAAPALMAAAAAAP///9fY18HBwTg4ODw1No6PjoFnZhoBAXNGRf/V1KmRkf///wAAAAAAAAAAACH5BAEAAAwALAAAAAAQAA8AAAQ5EMhJq7046w0I9hMhBAIoiSQ4BiS1tgQrg7EceIM8UDm7S4aBwRIcYgoFjmSxQHASCkWCc6gelJkIADs=') }

	/* Posts counter */
	.de-post-counter { margin: 0 4px 0 2px; vertical-align: 1px; font: bold 11px tahoma; color: #4f7942; cursor: default; }
	.de-post-counter-deleted { color: #727579; }
	.de-post-counter-you { vertical-align: 1px; font: bold 11px tahoma; color: #505a7a; cursor: default; }

	/* Text markup buttons */
	.de-markup-back { fill: #f0f0f0; stroke: #808080; }
	#de-txt-panel { display: block; font-weight: bold; cursor: pointer; }
	#de-txt-panel > div { display: inline-block; }
	#de-txt-panel > div > svg { width: 23px; height: 22px; margin: 0 1px; }\r\n`;

	if('animation' in docBody.style) {
		x += `
		/* Show/hide animation */
		@keyframes de-open { 0% { transform: translateY(-100%); } 100% { transform: translateY(0); } }
		@keyframes de-close { 0% { transform: translateY(0); } 100% { transform: translateY(-100%); } }
		@keyframes de-blink {
			0%, 100% { transform: translateX(0); }
			10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
			20%, 40%, 60%, 80% { transform: translateX(10px); }
		}
		@keyframes de-post-open-tl { from { transform: translate(-50%,-50%) scale(0); opacity: 0; } }
		@keyframes de-post-open-bl { from { transform: translate(-50%,50%) scale(0); opacity: 0; } }
		@keyframes de-post-open-tr { from { transform: translate(50%,-50%) scale(0); opacity: 0; } }
		@keyframes de-post-open-br { from { transform: translate(50%,50%) scale(0); opacity: 0; } }
		@keyframes de-post-close-tl { to { transform: translate(-50%,-50%) scale(0); opacity: 0; } }
		@keyframes de-post-close-bl { to { transform: translate(-50%,50%) scale(0); opacity: 0; } }
		@keyframes de-post-close-tr { to { transform: translate(50%,-50%) scale(0); opacity: 0; } }
		@keyframes de-post-close-br { to { transform: translate(50%,50%) scale(0); opacity: 0; } }
		@keyframes de-post-new { from { transform: translate(0,-50%) scaleY(0); opacity: 0; } }
		@keyframes de-win-open { from { transform: translate(0,50%) scaleY(0); opacity: 0; } }
		@keyframes de-win-close { to { transform: translate(0,50%) scaleY(0); opacity: 0; } }
		.de-pview-anim { animation-duration: .2s; animation-timing-function: ease-in-out; animation-fill-mode: both; }
		.de-open { animation: de-open .15s ease-out both; }
		.de-close { animation: de-close .15s ease-in both; }
		.de-blink { animation: de-blink .7s ease-in-out both; }
		.de-post-new { animation: de-post-new .2s ease-out both; }
		.de-win-open { animation: de-win-open .2s ease-out backwards; }
		.de-win-close { animation: de-win-close .2s ease-in both; }\r\n`;
	} else {
		Cfg.animation = 0;
	}

	let p = Math.max(Cfg.minImgSize || 0, 50);
	x += `
	/* Full images */
	.de-img-embed, .de-fullimg { border: none; outline: none; cursor: pointer; image-orientation: from-image; }
	.de-img-embed { max-width: 200px; max-height: 200px; }
	.de-fullimg { display: block; }
	.de-fullimg, .de-fullimg-wrap-link { flex: 0 0 auto; transition: none !important; max-width: none; max-height: none; }
	.de-fullimg-after { clear: left; }
	.de-fullimg-center { position: fixed; margin: 0 !important; z-index: 9999; background-color: #ccc; border: 1px solid black !important; -moz-box-sizing: content-box; box-sizing: content-box; }
	.de-fullimg-info { position: absolute; bottom: -22px; left: 50%; padding: 1px 4px; transform: translateX(-50%); background-color: rgba(64,64,64,.8); white-space: nowrap; line-height: 17px; }
	.de-fullimg-info > .de-btn-img { color: #fff; }
	.de-fullimg-link { float: none !important; display: inline-block; font: bold 12px tahoma; color: #fff !important; text-decoration: none; outline: none; }
	.de-fullimg-link:hover { color: #fff !important; background: rgba(64,64,64,.6); }
	.de-fullimg-load { position: absolute; z-index: 2; width: 50px; height: 50px; top: 50%; left: 50%; margin: -25px; }
	.de-fullimg-rotated { transform-origin: top left; width: auto !important; max-width: none !important; }
	.de-fullimg-video-hack { width: 100%; height: calc(100% - 40px); position: absolute; z-index: 1; cursor: pointer; }
	.de-fullimg-wrap { position: relative; margin-bottom: 24px; }
	.de-fullimg-wrap-center, .de-fullimg-wrap-link, .de-fullimg-video > video { width: 100%; height: 100%; max-height: 100%; }
	.de-fullimg-wrap-center > .de-fullimg-wrap-link > .de-fullimg { height: 100%; }
	.de-fullimg-wrap-inpost { min-width: ${ p }px; min-height: ${ p }px; float: left; ${ aib.multiFile ? '' : 'margin: 2px 5px; -moz-box-sizing: border-box; box-sizing: border-box; ' } }
	.de-fullimg-wrap-nosize > .de-fullimg-wrap-link > .de-fullimg { opacity: 0.3; }
	.de-img-btn { position: fixed; top: 50%; z-index: 10000; height: 36px; width: 36px; border-radius: 10px 0 0 10px; color: #f0f0f0; cursor: pointer; }
	.de-img-btn > svg { height: 32px; width: 32px; margin: 2px; }
	#de-img-btn-auto { right: 0; margin-top: 58px; }
	.de-img-btn-auto-on { color: #ffe100; }
	#de-img-btn-next { right: 0; margin-top: -18px; }
	.de-img-btn-none { display: none; }
	#de-img-btn-prev { left: 0; margin-top: -18px; transform: scaleX(-1); }
	#de-img-btn-rotate { right: 0; margin-top: 20px; }
	.de-webm-title { color: #ffe100 !important; }

	/* Embedders */
	${ cont('.de-video-link.de-ytube', 'https://youtube.com/favicon.ico') }
	${ cont('.de-video-link.de-vimeo', 'https://vimeo.com/favicon.ico') }
	${ cont('.de-img-arch', 'data:image/gif;base64,R0lGODlhEAAQALMAAF82SsxdwQMEP6+zzRA872NmZQesBylPHYBBHP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAQARTMMlJaxqjiL2L51sGjCOCkGiBGWyLtC0KmPIoqUOg78i+ZwOCUOgpDIW3g3KJWC4t0ElBRqtdMr6AKRsA1qYy3JGgMR4xGpAAoRYkVDDWKx6NRgAAOw==') }
	${ cont('.de-img-audio', 'data:image/gif;base64,R0lGODlhEAAQAKIAAGya4wFLukKG4oq3802i7Bqy9P///wAAACH5BAEAAAYALAAAAAAQABAAQANBaLrcHsMN4QQYhE01OoCcQIyOYQGooKpV1GwNuAwAa9RkqTPpWqGj0YTSELg0RIYM+TjOkgba0sOaAEbGBW7HTQAAOw==') }
	.de-current::after { content: " \u25CF"; }
	.de-img-arch, .de-img-audio { margin-left: 4px; color: inherit; text-decoration: none; font-weight: bold; }
	.de-mp3 { margin: 5px 20px; }
	.de-video-obj { margin: 5px 20px; white-space: nowrap; }
	.de-video-obj-inline { display: inline-block; }
	#de-video-btn-resize { padding: 0 14px 8px 0; margin: 0 8px; border: 2px solid; border-radius: 2px; }
	#de-video-btn-hide, #de-video-btn-prev { margin-left: auto; }
	#de-video-buttons { display: flex; margin-bottom: 2px; align-items: center; width: 100%; line-height: 16px; }
	#de-video-buttons > a:not(:hover) { color: inherit; }
	.de-video-expanded { width: 854px !important; height: 480px !important; }
	#de-video-list { padding: 0 0 4px; overflow-y: auto; width: 100%; }
	.de-video-refpost { margin: 0 3px; color: inherit; text-decoration: none; cursor: pointer; }
	.de-video-resizer::after { content: "\u2795"; margin: 0 -15px 0 3px; vertical-align: 6px; color: #000; font-size: 12px; cursor: pointer; }
	.de-video-player, .de-video-thumb { width: 100%; height: 100%; }
	a.de-video-player { display: inline-block; position: relative; border-spacing: 0; border: none; }
	a.de-video-player::after { content: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAWCAQAAACMYb/JAAAArklEQVR4AYXSr05CYRjA4cPGxjRosTijdvNJzmD1CrwAvQWugASNwGg0MoErOIVCPCMx0hmBMaAA4mPX8/2rT/i+9/1lPu0M3MtCN1OAvS+NEFkDmHqoJwcAbHzUkb9n7C5FqLynCAzdpAhLrynCRc9VnEDpKUWYpUmZIlt5nBQeY889amvGPj33HBvdt45WbAELeWyNP/qu/8dwBrDyVp9UBRi5DYXZdTLxEs77F5bCVAHlDJ1UAAAAAElFTkSuQmCC"); position: absolute;top: 50%; left: 50%; padding: 12px 24px; margin: -22px 0 0 -32px; background-color: rgba(255,0,0,.4); border-radius: 8px; line-height: 0; }
	a.de-video-player:hover::after { background-color: rgba(255,0,0,.7); }
	.de-video-title[de-time]::after { content: " [" attr(de-time) "]"; color: red; }
	.de-video-title[de-time].de-current::after { content: " [" attr(de-time) "] \u25CF"; color: red; }
	.de-vocaroo > embed { display: inline-block; }
	video { background: black; }

	/* File inputs */
	.de-file { display: inline-block; vertical-align: top; margin: 1px; height: ${ p = aib.multiFile ? 90 : 130 }px; width: ${ p }px; text-align: center; background-color: rgba(96,96,96,.15); border: 1px dashed grey; }
	.de-file > .de-file-img > div { display: flex; justify-content: center; align-items: center; height: ${ p }px; cursor: pointer; }
	.de-file > .de-file-utils { display: none; height: 18px; margin-top: -20px; padding: 1px 0; background: rgba(64,64,64,.6); position: relative; -moz-box-sizing: initial; box-sizing: initial; }
	.de-file > .de-file-utils > .de-file-rarmsg { display: block; position: absolute; bottom: 20px; width: 100%; margin: 0; background: rgba(64,64,64,.6); color: #fff; }
	#de-file-area { margin-top: 1px; width: 275px; min-width: 100%; max-width: 100%; overflow-x: auto; overflow-y: hidden; white-space: nowrap; }
	.de-file-drag { background: rgba(96,96,96,.8); border: 1px solid grey; opacity: .7; }
	.de-file:hover:not(.de-file-drag) > .de-file-utils { display: block !important; }
	img.de-file-img, video.de-file-img { max-width: ${ p }px; max-height: ${ p }px; }
	.de-file-input { max-width: 300px; }
	.de-file-input + .de-file-utils { margin-left: 4px; }
	.de-file-off > .de-file-img > div::after { content: "${ Lng.dropFileHere[lang] }"; display: block; width: 80px; margin: 0 auto; font: 11px arial; opacity: .8; white-space: initial; }
	.de-file-rarmsg { margin: 0 2px; vertical-align: 4px; font: bold 11px tahoma; cursor: default; }
	.de-file-btn-del, .de-file-btn-rar, .de-file-btn-ren, .de-file-btn-txt { margin: 0 1px; cursor: pointer; }
	.de-file-btn-del > svg, .de-file-btn-rar > svg, .de-file-btn-ren > svg, .de-file-btn-txt > svg { width: 16px; height: 16px; }
	.de-file-spoil { margin: 0 3px; vertical-align: 1px; }
	.de-file-txt-add { font-weight: bold; width: 21px; padding: 0 !important; }
	.de-file-txt-input { border: 1px solid #9c9c9c; padding: 2px; font: 12px/16px sans-serif; }
	.de-file-txt-noedit { background: rgba(255,255,255,.5); cursor: pointer; }
	.de-file-utils { display: inline-block; float: none; vertical-align: -3px; }

	/* Reply form */
	.de-parea { text-align: center; }
	.de-parea-btn-close::after { content: "${ Lng.hideForm[lang] }"; }
	.de-parea-btn-thr::after { content: "${ Lng.makeThr[lang] }"; }
	.de-parea-btn-reply::after { content: "${ Lng.makeReply[lang] }"; }
	#de-pform > form { padding: 0; margin: 0; border: none; }
	#de-resizer-text { display: inline-block !important; float: none !important; padding: 5px; margin: ${ nav.isPresto ? '-2px -10px' : '0 0 -2px -10px' }; border-bottom: 2px solid #666; border-right: 2px solid #666; cursor: se-resize; }
	.de-win-inpost { float: none; clear: left; display: inline-block; width: auto; padding: 3px; margin: 2px 0; }
	.de-win-inpost > .de-resizer { display: none; }
	.de-win-inpost > .de-win-head { background: none; color: inherit; }
	#de-win-reply { width: auto !important; min-width: 0; padding: 0 !important; border: none !important; }
	#de-win-reply.de-win { position: fixed !important; padding: 0 !important; margin: 0 !important; border-radius: 10px 10px 0 0; }
	#de-win-reply.de-win > .de-win-body { padding: 2px 2px 0 1px; border: 1px solid gray; }
	#de-win-reply.de-win .de-textarea { min-width: 98% !important; resize: none !important; }
	#de-win-reply.de-win #de-resizer-text { display: none !important; }
	#de-sagebtn { display: inline-block; margin: 3px 4px 0 4px !important; cursor: pointer; }
	.de-textarea { display: inline-block; padding: 3px !important; min-width: 275px !important; min-height: 90px !important; resize: both; transition: none !important; }

	/* Thread navigation */
	#de-thr-navarrow { display: none; position: absolute; top: 50%; left: 34px; transform: translateY(-50%); width: 7px; height: 7px; }
	#de-thr-navpanel { color: #F5F5F5; height: 98px; width: 41px; position: fixed; top: 50%; left: 0px; padding: 0; margin: -49px 0 0; background: #777; border: 1px solid #525252; border-left: none; border-radius: 0 5px 5px 0; cursor: pointer; z-index: 1000; }
	.de-thr-navpanel-hidden { opacity: .7; margin-left: -34px !important; }
	.de-thr-navpanel-hidden > #de-thr-navarrow { display: initial; }
	#de-thr-navup { padding: 12px 9px 13px 8px; border-radius: 0 5px 0 0; }
	#de-thr-navdown { padding: 13px 9px 12px 8px; border-radius: 0 0 5px 0; }
	#de-thr-navup, #de-thr-navdown { width: 41px; height: 49px; -moz-box-sizing: border-box; box-sizing: border-box; }
	:not(.de-thr-navpanel-hidden) > #de-thr-navup:hover, :not(.de-thr-navpanel-hidden) > #de-thr-navdown:hover { background: #555; }

	/* Other */
	.de-abtn { text-decoration: none !important; outline: none; }
	.de-button { flex: none; padding: 0 ${ nav.isFirefox ? 2 : 4 }px !important; margin: 1px 2px; height: 24px; font: 13px arial; }
	.de-editor { display: block; font: 12px courier new; width: 619px; height: 337px; tab-size: 4; -moz-tab-size: 4; -o-tab-size: 4; }
	.de-hidden { float: left; overflow: hidden !important; margin: 0 !important; padding: 0 !important; border: none !important; width: 0 !important; height: 0 !important; display: inline !important; }
	.de-input-key { padding: 0 2px !important; margin: 0 !important; font: 13px/15px arial !important; }
	input[type="text"].de-input-selected { background: rgba(255,255,150,0.4) !important }
	.de-link-backref { text-decoration: none; }
	.de-link-parent { outline: 1px dotted !important; }
	.de-link-pview { font-weight: bold; }
	.de-list { padding-top: 4px; }
	.de-list::before { content: "\u25CF"; margin-right: 4px; }
	.de-logo { display: inline-block; margin-right: 10px; fill: inherit; color: #F5F5F5; border-radius: 80px 0 0 0; }
	.de-logo > svg { width: 144px; height: 144px; }
	.de-menu { padding: 0 !important; margin: 0 !important; width: auto !important; min-width: 0 !important; z-index: 10002; border: 1px solid grey !important; text-align: left; }
	.de-menu-item { display: block; padding: 3px 10px; color: inherit; text-decoration: none; font: 13px arial; white-space: nowrap; cursor: pointer; }
	.de-menu-item:hover { background-color: #222; color: #fff; }
	.de-omitted { color: grey; }
	.de-omitted::before { content: "${ Lng.postsOmitted[lang] }"; }
	.de-popup { overflow: visible !important; clear: both !important; width: auto !important; min-width: 0pt !important; padding: 8px !important; margin: 1px !important; border: 1px solid grey !important; display: block !important; float: right !important; max-width: initial !important; }
	.de-popup-btn { display: inline-block; vertical-align: top; color: green; cursor: pointer; line-height: 1.15; }
	.de-popup-msg { display: inline-block; white-space: pre-wrap; }
	.de-popup-msg > hr { margin: 0 !important; }
	.de-post-hiddencontent { display: none !important; }
	.de-pview { position: absolute; width: auto; min-width: 0; z-index: 9999; border: 1px solid grey !important; margin: 0 !important; display: block !important; }
	.de-pview-info { padding: 3px 6px !important; }
	.de-ref-del::after { content: " (Del)"; }
	.de-ref-op::after { content: " (OP)"; }
	.de-refcomma:last-child { display: none; }
	.de-refmap { margin: 10px 4px 4px 4px; font-size: 75%; font-style: italic; }
	.de-refmap::before { content: "${ Lng.replies[lang] } "; }
	.de-replies-hide::after { content: "${ Lng.hidePosts[lang] }"; }
	.de-replies-show::after { content: "${ Lng.showPosts[lang] }"; }
	.de-thr-buttons { clear: left; margin-top: 5px; }
	${ aib.t ? '.de-thr-buttons > .de-btn-reply { display: none; }' : '' }
	.de-thr-collapse-link::after { content: "${ Lng.collapseThr[lang] }"; }
	.de-thr-hid { display: block; padding: 2px; }
	.de-thr-updater-link::after { content: "${ Lng.getNewPosts[lang] }"; }
	#de-updater-count::before { content: ": "; }
	.de-viewed { color: #747488 !important; }
	.de-wait, .de-fav-wait , .de-fullimg-load { animation: de-wait-anim 1s linear infinite; }
	.de-wait { margin: 0 2px -3px 0 !important; width: 16px; height: 16px; }
	#de-wrapper-popup { overflow-x: hidden !important; overflow-y: auto !important; -moz-box-sizing: border-box; box-sizing: border-box; max-height: 100vh; position: fixed; right: 0; top: 0; z-index: 9999; font: 14px arial; cursor: default; }
	@keyframes de-wait-anim { to { transform: rotate(360deg); } }
	form > hr { clear: both }`;

	$css(x).id = 'de-css';
	$css('').id = 'de-css-dynamic';
	$css('').id = 'de-css-user';
	updateCSS();
}

function updateCSS() {
	const x = `
	.de-video-obj { width: ${ Cfg.YTubeWidth }px; height: ${ Cfg.YTubeHeigh }px; }
	.de-new-post { ${ nav.isPresto ?
		'border-left: 4px solid rgba(107,134,97,.7); border-right: 4px solid rgba(107,134,97,.7)' :
		'box-shadow: 6px 0 2px -2px rgba(107,134,97,.8), -6px 0 2px -2px rgba(107,134,97,.8)' } !important; }
	.de-selected, .de-input-error { ${ nav.isPresto ?
		'border-left: 4px solid rgba(220,0,0,.7); border-right: 4px solid rgba(220,0,0,.7)' :
		'box-shadow: 6px 0 2px -2px rgba(220,0,0,.8), -6px 0 2px -2px rgba(220,0,0,.8)' } !important; }
	${ Cfg.markMyPosts ?
		`.de-mypost { ${ nav.isPresto ?
			'border-left: 4px solid rgba(97,107,134,.7); border-right: 4px solid rgba(97,107,134,.7)' :
			'box-shadow: 6px 0 2px -2px rgba(97,107,134,.8), -6px 0 2px -2px rgba(97,107,134,.8)'
		} !important; }
		.de-mypost-reply:not(.de-pview) { position: relative; }
		.de-mypost-reply::before { content: ""; position: absolute; top: -0; bottom: 0; left: -1px; border-left: 5px dotted rgba(97,107,134,.8) !important; }` : '' }
	${ Cfg.markMyLinks ?
		`.de-ref-del.de-ref-you::after { content: " (Del)(You)"; }
			.de-ref-op.de-ref-you::after { content: " (OP)(You)"; }
			.de-ref-you::after { content: " (You)"; }` :
		'.de-post-counter-you { display: none; }' }
	${ Cfg.postBtnsCSS === 0 ?
		`.de-btn-expthr, .de-btn-fav, .de-btn-hide, .de-btn-img, .de-btn-reply, .de-btn-stick, .de-btn-unhide { fill: rgba(0,0,0,0); color: currentColor; }
			.de-btn-fav-sel, .de-btn-hide-user, .de-btn-sage, .de-btn-stick-on, .de-btn-unhide-user { fill: rgba(0,0,0,0); color: #F00; }` :
		`.de-btn-expthr, .de-btn-fav, .de-btn-hide, .de-btn-img, .de-btn-reply, .de-btn-sage, .de-btn-stick, .de-btn-unhide { color: #F5F5F5; }
			.de-btn-expthr, .de-btn-fav, .de-btn-fav-sel, .de-btn-hide, .de-btn-hide-user, .de-btn-img, .de-btn-reply, .de-btn-stick, .de-btn-stick-on, .de-btn-unhide, .de-btn-unhide-user { fill: ${ Cfg.postBtnsCSS === 1 && !nav.isPresto ? 'url(#de-btn-back-gradient)' : Cfg.postBtnsBack }; }
			.de-btn-fav-sel { color: #FFE100; }
			.de-btn-hide-user { color: #BFFFBF; }
			.de-btn-sage { fill: #4B4B4B; }
			.de-btn-stick-on { color: #BFFFBF; }
			.de-btn-unhide-user { color: #FFBFBF; }` }
	.de-fullimg-wrap-inpost > .de-fullimg { ${ Cfg.resizeImgs ?
		`max-width: 100%;${ Cfg.resizeImgs === 2 ? ' max-height: 96vh' : '' }` :
		'width: auto' }; }
	${ Cfg.maskImgs ?
		`${ aib.qPostImg }, .de-img-embed, .de-video-obj { opacity: ${ Cfg.maskVisib / 100 } !important; }
			${ aib.qPostImg.split(', ').join(':hover, ') }:hover, .de-img-embed:hover, .de-video-obj:hover { opacity: 1 !important; }
			.de-video-obj:not(.de-video-obj-inline) { clear: both; }` : '' }
	${ Cfg.imgNames === 1 ? '.de-img-name { max-width: 165px; overflow: hidden; }' : '' }
	${ Cfg.imgNames === 1 || Cfg.imgNames === 3 ?
		'.de-img-name { display: inline-block; white-space: nowrap; vertical-align: bottom; text-overflow: ellipsis; }' :
		Cfg.imgNames === 2 ? '.de-img-name { text-decoration: none !important; text-transform: capitalize; }' : '' }
	${ Cfg.widePosts ? '.de-reply { float: none; width: 99.9%; margin-left: 0; }' : '' }
	${ aib.qPostMsg } { max-width: ${ Cfg.limitPostMsg }px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; }
	${ Cfg.strikeHidd ? '.de-link-hid { text-decoration: line-through !important; }' : '' }
	${ Cfg.noSpoilers === 1 ?
		`.spoiler, s { color: #F5F5F5 !important; background-color: #888 !important; }
			.spoiler > a, s > a:not(:hover) { color: #F5F5F5 !important; background-color: #888 !important; }` : '' }
	${ Cfg.noSpoilers === 2 ?
		`.spoiler, s { color: inherit !important; }
			.spoiler > a, s > a:not(:hover) { color: inherit !important; }` : '' }
	${ Cfg.addSageBtn ? '' : '#de-sagebtn, ' }
	${ Cfg.delHiddPost === 1 || Cfg.delHiddPost === 3 ?
		'.de-thr-hid, .de-thr-hid + div + br, .de-thr-hid + div + hr, .de-thr-hid + div + br + hr, .de-thr-hid + div + div + hr, ' :
		'.de-thr-hid:not([style="display: none;"]) + div + br, ' }
	${ Cfg.imgNavBtns ? '' : '.de-img-btn, ' }
	${ Cfg.imgInfoLink ? '' : '.de-fullimg-info, ' }
	${ Cfg.noPostNames ? `${ aib.qPostName }, ${ aib.qPostTrip }, ` : '' }
	${ Cfg.noBoardRule ? `${ aib.qFormRules }, ` : '' }
	${ Cfg.panelCounter ? '' : '#de-panel-info, ' }
	${ Cfg.removeHidd ? '.de-link-backref.de-link-hid, .de-link-backref.de-link-hid + .de-refcomma, ' : '' }
	${ Cfg.showHideBtn ? '' : '.de-btn-hide, ' }
	${ Cfg.showRepBtn ? '' : '.de-btn-reply, ' }
	${ Cfg.thrBtns || aib.t ? '' : '.de-thr-updater, ' }
	${ Cfg.thrBtns === 1 || Cfg.thrBtns === 2 && !aib.t ? '' : '.de-thr-buttons > svg, ' }
	${ Cfg.ajaxPosting ? '' : '.de-file-btn-rar, .de-file-btn-txt, ' }
	${ Cfg.fileInputs ? '' : '.de-file-txt-wrap, .de-file-btn-txt, ' }
	${ !aib.formHeaders && (aib.multiFile || Cfg.fileInputs !== 2) ?
		'#de-pform form > table > tbody > tr > td:not([colspan]):first-child, #de-pform form > table > tbody > tr > th:first-child, ' : '' }body > hr, .postarea, .theader { display: none !important; }\r\n`;
	$id('de-css-dynamic').textContent = (x + aib.css).replace(/[\r\n\t]+/g, '\r\n\t');
	$id('de-css-user').textContent = Cfg.userCSS ? Cfg.userCSSTxt : '';
}

/* eslint-enable max-len */

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
	if(!(docBody = doc.body) || !aib && !(aib = getImageBoard(checkDomains, true))) {
		return;
	}
	let formEl = $q(aib.qDelForm + ', form[de-form]');
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
	if(!Cfg.disabled && aib.init?.() || !localData && docBody.classList.contains('de-mode-local')) {
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
	if(aib.t) {
		const storageName = `de-lastpcount-${ aib.b }-${ aib.t }`;
		if(sesStorage[storageName] > Thread.first.pcount) {
			sesStorage.removeItem(storageName);
			deWindow.location.reload();
		}
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
	embedPostMsgImages(DelForm.first.el);
	Logger.log('Image-links');
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

/* ==[ Tail ]== */
}(
	window,
	window.opera?.scriptStorage,
	window.FormData,
	(x, y) => window.scrollTo(x, y),
	/* global localData */ typeof localData === 'object' ? localData : null
));
