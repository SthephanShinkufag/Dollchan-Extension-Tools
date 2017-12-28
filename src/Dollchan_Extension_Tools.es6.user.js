// ==UserScript==
// @name            Dollchan Extension Tools
// @version         17.10.24.0
// @namespace       http://www.freedollchan.org/scripts/*
// @author          Sthephan Shinkufag @ FreeDollChan
// @copyright       © Dollchan Extension Team. See the LICENSE file for license rights and limitations (MIT).
// @description     Doing some profit for imageboards
// @icon            https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Icon.png
// @updateURL       https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.meta.js
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
// @nocompat        Chrome
// ==/UserScript==

/* eslint indent: ["error", "tab", {
	"flatTernaryExpressions": true,
	"outerIIFEBody": 0
}], no-var: "error" *//* , prefer-template: "error" */

(function deMainFuncInner(scriptStorage, FormData, scrollTo, localData) {
'use strict';

const version = '17.10.24.0';
const commit = 'e410a9b';

/* ==[ DefaultCfg.js ]========================================================================================
                                                DEFAULT CONFIG
=========================================================================================================== */

const defaultCfg = {
	disabled     : 0,    // Dollchan enabled by default
	language     : 0,    // Dollchan language [0=ru, 1=en]
	hideBySpell  : 1,    // hide posts by spells
	spells       : null, // user defined spells
	sortSpells   : 0,    // sort spells and remove duplicates
	menuHiddBtn  : 1,    // extra options for "Hide" buttons
	hideRefPsts  : 0,    // hide replies to hidden posts
	delHiddPost  : 0,    // remove placeholders [0=off, 1=all, 2=posts only, 3=threads only]
	ajaxUpdThr   : 1,    // threads updater
	updThrDelay  : 20,   //    update interval (sec)
	updCount     : 1,    //    show countdown to thread update
	favIcoBlink  : 0,    //    blink the favicon on new posts
	desktNotif   : 0,    //    desktop notifications for new posts
	noErrInTitle : 0,    //    don't show error code in title (except 404)
	markNewPosts : 1,    //    highlight new posts with color
	useDobrAPI   : 1,    //    dobrochan: use json API
	markMyPosts  : 1,    // highlight my own posts
	hideReplies  : 0,    // show only op-posts in threads list
	expandTrunc  : 0,    // auto-expand truncated posts
	updThrBtns   : 1,    // show "Get new posts" buttons in threads list
	showHideBtn  : 1,    // show "Hide" buttons
	showRepBtn   : 1,    // show "Quick reply" buttons
	postBtnsCSS  : 1,    // post buttons style [0=simple, 1=gradient grey, 2=custom]
	postBtnsBack : '#8c8c8c', //    custom background color
	noSpoilers   : 1,    // text spoilers expansion [0=off, 1=grey, 2=native]
	noPostNames  : 0,    // hide poster names
	widePosts    : 0,    // stretch posts to screen width
	correctTime  : 0,    // time correction in posts
	timeOffset   : '+0', //    time offset (h)
	timePattern  : '',   //    search pattern
	timeRPattern : '',   //    replace pattern
	expandImgs   : 2,    // expand images on click [0=off, 1=in post, 2=by center]
	imgNavBtns   : 1,    //    add buttons to navigate images
	imgInfoLink  : 1,    //    show name under expanded image
	resizeDPI    : 0,    //    don't upscale images on high DPI displays
	resizeImgs   : 1,    //    resize large images to fit screen
	minImgSize   : 100,  //    minimal size for expanded images (px)
	zoomFactor   : 25,   //    images zoom sensibility [1-100%]
	webmControl  : 1,    //    show control bar for WebM
	webmTitles   : 0,    //    load titles from WebM metadata
	webmVolume   : 100,  //    default volume for WebM [0-100%]
	minWebmWidth : 320,  //    minimal width for WebM (px)
	preLoadImgs  : 0,    // preload images
	findImgFile  : 0,    //    detect embedded files in images
	openImgs     : 0,    // replace thumbs with original images [0=off, 1=all, 2=GIFs only, 3=non-GIFs]
	imgSrcBtns   : 1,    // add "Search" buttons for images
	delImgNames  : 0,    // hide filenames
	maskImgs     : 0,    // NSFW mode
	maskVisib    : 7,    // image opacity in NSFW mode [0-100%]
	linksNavig   : 1,    // posts navigation by >>links
	linksOver    : 100,  //    delay appearance (ms)
	linksOut     : 1500, //    delay disappearance (ms)
	markViewed   : 0,    //    mark viewed posts
	strikeHidd   : 0,    //    strike >>links to hidden posts
	removeHidd   : 0,    //        also remove from reply maps
	noNavigHidd  : 0,    //    don't show previews for hidden posts
	markMyLinks  : 1,    // mark links to my posts with (You)
	crossLinks   : 0,    // replace http:// with >>/b/links*
	decodeLinks  : 0,    // decode %D0%A5%D1 in links
	insertNum    : 1,    // insert >>link on №postnumber click*
	addOPLink    : 0,    // insert >>link when replying to OP on board
	addImgs      : 0,    // load images to jpg/png/gif links*
	addMP3       : 1,    // embed mp3 links
	addVocaroo   : 1,    // embed Vocaroo links
	addYouTube   : 3,    // embed YouTube links [0=off, 1=onclick, 2=player, 3=preview+player, 4=preview]
	YTubeType    : 0,    //    player type [0=flash, 1=HTML5]
	YTubeWidth   : 360,  //    player width (px)
	YTubeHeigh   : 270,  //    player height (px)
	YTubeTitles  : 0,    //    load titles for YouTube links
	ytApiKey     : '',   //    YouTube API key
	addVimeo     : 1,    //    embed Vimeo links
	ajaxPosting  : 1,    // posting without refresh
	postSameImg  : 1,    //    ability to post duplicate images
	removeEXIF   : 1,    //    remove EXIF from JPEG
	removeFName  : 0,    //    clear file names
	sendErrNotif : 1,    //    inform in title about post send error
	scrAfterRep  : 0,    //    scroll to bottom after reply
	fileInputs   : 2,    //    enhanced file attachment field  [0=off, 1=simple, 2=preview]
	addPostForm  : 2,    // reply form display in thread [0=at top, 1=at bottom, 2=hidden]
	spacedQuote  : 1,    // insert a space when quoting "> "
	favOnReply   : 1,    // add thread to favorites after reply
	warnSubjTrip : 0,    // warn about a tripcode in "Subject" field
	addSageBtn   : 1,    // replace "Email" with Sage button
	saveSage     : 1,    // remember sage
	sageReply    : 0,    //    reply with sage
	cap4chanAlt  : 1,    // 4chan: use alternative captcha
	capUpdTime   : 300,  // captcha update interval (sec)
	captchaLang  : 1,    // forced captcha input language [0=off, 1=en, 2=ru]
	addTextBtns  : 1,    // text markup buttons [0=off, 1=graphics, 2=text, 3=usual]
	txtBtnsLoc   : 1,    //    located at [0=top, 1=bottom]
	passwValue   : '',   // user password value
	userName     : 0,    // user name
	nameValue    : '',   //    value
	noBoardRule  : 1,    // hide board rules
	noPassword   : 1,    // hide form "Password" field
	noName       : 0,    // hide form "Name" field
	noSubj       : 0,    // hide form "Subject" field
	scriptStyle  : 0,    /* Dollchan style
		[0=Gradient darkblue, 1=gradient blue, 2=solid grey, 3=transparent blue, 4=square dark] */
	userCSS      : 0,    // user CSS
	userCSSTxt   : '',   //    css text
	expandPanel  : 0,    // show full main panel
	panelCounter : 1,    // panel counter for posts/images [0=off, 1=all posts, 2=except hidden]
	rePageTitle  : 1,    // show thread title in the page tab
	animation    : 1,    // CSS3 animation
	closePopups  : 0,    // close popups automatically
	inftyScroll  : 1,    // infinite scrolling for pages
	scrollToTop  : 0,    // always scroll to top in the threads list
	hotKeys      : 1,    // hotkeys
	loadPages    : 1,    //    number of pages that are loaded on F5
	updScript    : 1,    // auto check for Dollchan updates
	scrUpdIntrv  : 1,    //    interval in days (every val+1 day)
	turnOff      : 0,    // enable Dollchan only on this site
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
		menuHiddBtn: [
			'Дополнительное меню для кнопок "Скрыть"',
			'Extra options for "Hide" buttons',
			'Додаткове меню для кнопок "Сховати"'],
		hideRefPsts: [
			'Скрывать ответы на скрытые посты',
			'Hide replies to hidden posts',
			'Ховати відповіді на сховані пости'],
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
		noErrInTitle: [
			'Не показывать номер ошибки в заголовке',
			'Donʼt show error code in pageʼs title',
			'Не показувати номер помилки в заголовку'],
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
		hideReplies: [
			'Показывать только OP в списке тредов*',
			'Show only OP in threads list*',
			'Показувати лише OP в списку тредів*'],
		expandTrunc: [
			'Авторазворот сокращенных постов*',
			'Autoexpand truncated posts*',
			'Авторозгортання скорочених постів*'],
		updThrBtns: [
			'Кнопки "Получить новые посты" в списке тредов',
			'Show "Get new posts" buttons in threads list',
			'Кнопки "Отримати нові пости" у списку тредів'],
		showHideBtn: [
			'Кнопки "Скрыть" ',
			'Show "Hide" buttons ',
			'Кнопки "Сховати" '],
		showRepBtn: [
			'Кнопки "Быстрый ответ"',
			'Show "Quick reply" buttons',
			'Кнопки "Швидка відповідь"'],
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
		widePosts: [
			'Растягивать посты по ширине экрана',
			'Stretch posts to page width',
			'Розтягувати пости на ширину екрану'],
		hotKeys: [
			'Горячие клавиши',
			'Hotkeys',
			'Гарячі клавіші'],
		loadPages: [
			'Количество страниц, загружаемых по F5',
			'Number of pages that are loaded on F5 ',
			'Кількість сторінок, що завантажуються по F5'],
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
		resizeImgs: [
			'Умещать большие картинки в экран',
			'Resize large images to fit screen',
			'Вміщувати великі зображення в екран'],
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
		preLoadImgs: [
			'Предварительно загружать картинки*',
			'Preload images*',
			'Наперед завантажувати зображення *'],
		findImgFile: [
			'Распознавать файлы, встроенные в картинках*',
			'Detect embedded files in images*',
			'Розпізнавати файли, що вбудовані в зображення*'],
		openImgs: {
			sel: [
				['Откл.', 'Все подряд', 'Только GIF', 'Кроме GIF'],
				['Disable', 'All types', 'Only GIF', 'Non-GIF'],
				['Вимк.', 'Всі', 'Лише GIF', 'Окрім GIF']],
			txt: [
				'Заменять картинки на оригиналы*',
				'Replace thumbnails with original images*',
				'Замінювати зображення на оригінали*']
		},
		imgSrcBtns: [
			'Добавлять кнопки "Поиск" для картинок',
			'Add "Search" buttons for images',
			'Додавати кнопки "Пошук" для зображень'],
		delImgNames: [
			'Скрывать имена картинок',
			'Hide filenames',
			'Ховати імена зображень'],
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
		addYouTube: {
			sel: [
				['Ничего', 'Плеер по клику', 'Авто плеер', 'Превью+плеер', 'Только превью'],
				['Nothing', 'On click player', 'Auto player', 'Preview+player', 'Only preview'],
				['Нічого', 'Плеєр по кліку', 'Авто плеєр', 'Превʼю+плеєр', 'Тільки превʼю']],
			txt: [
				'к YouTube ссылкам* ',
				'for YouTube links* ',
				'до YouTube посилань* ']
		},
		YTubeType: {
			sel : [['Flash', 'HTML5'], ['Flash', 'HTML5'], ['Flash', 'HTML5']],
			txt : ['', '', '']
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
		removeFName: [
			'Очищать имена файлов',
			'Clear file names',
			'Видаляти імена файлів'],
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
		cap4chanAlt: [
			'4chan: альтернативная капча*',
			'4chan: use alternative captcha*',
			'4chan: альтернативна капча*'],
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
		animation: [
			'CSS3 анимация',
			'CSS3 animation',
			'CSS3 анімація'],
		closePopups: [
			'Автоматически закрывать уведомления',
			'Close popups automatically',
			'Автоматично закривати сповіщення'],
		inftyScroll: [
			'Бесконечная прокрутка страниц',
			'Infinite scrolling for pages',
			'Нескінченна прокрутка сторінок'],
		scrollToTop: [
			'Всегда перемещаться вверх в списке тредов',
			'Always scroll to top in the threads list',
			'Завжди гортати догори в списку тредів'],
		updScript: [
			'Автоматически проверять обновления Dollchan',
			'Auto check for Dollchan updates',
			'Автоматично перевіряти оновлення Dollchan'],
		scrUpdIntrv: {
			sel: [
				['Каждый день', 'Каждые 2 дня', 'Каждую неделю', 'Каждые 2 недели', 'Каждый месяц'],
				['Every day', 'Every 2 days', 'Every week', 'Every 2 weeks', 'Every month'],
				['Щодня', 'Кожні 2 дні', 'Щотижня', 'Кожні 2 тижні', 'Щомісяця']],
			txt: ['', '', '']
		},
		excludeList: [
			'Не запускать Dollchan на:',
			'Prevent Dollchan launch on:',
			'Не запускати Dollchan на:'],
		turnOff: [
			'Запускать Dollchan только на этом сайте',
			'Run Dollchan only on this site',
			'Запускати Dollchan лише на цьому сайті']
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
	replyToPost: [
		'Ответить на пост',
		'Reply to post',
		'Відповісти на пост'],
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
	searchIn: [
		'Искать в ',
		'Search in ',
		'Шукати в '],

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
			'Hide with answers',
			'Сховати з відповідями']
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
		'синтаксическая ошибка в аргументе спелла: %s',
		'syntax error in argument of spell: %s',
		'синтаксична помилка в аргументі спеллу: %s'],
	seUnknown: [
		'неизвестный спелл: %s',
		'unknown spell: %s',
		'невідомий спелл: %s'],
	seMissOp: [
		'пропущен оператор',
		'missing operator',
		'пропущено оператор'],
	seMissArg: [
		'пропущен аргумент спелла: %s',
		'missing argument of spell: %s',
		'пропущено аргумент спеллу: %s'],
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
		"missing ')' in expression",
		'пропущено закривну дужку'],
	seRepsInParens: [
		'спелл %s не должен располагаться в скобках',
		'spell %s shouldnʼt be inside parentheses',
		'спелл %s не може бути в дужках'],
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
		'Выбрать и удалить записи',
		'Select and delete entries',
		'Обрати та видалити записи'],
	saveChanges: [
		'Сохранить внесенные изменения',
		'Save your changes',
		'Зберегти внесені зміни'],
	hiddenPosts: [
		'Скрытые посты',
		'Hidden posts',
		'Сховані пости'],
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
	spoilFile: [
		'Спойлер',
		'Spoiler',
		'Спойлер'],
	addManually: [
		'Ввести ссылку на файл вручную',
		'Enter a link to the file manually',
		'Ввести посилання на файл вручну'],
	enterTheLink: [
		"Введите ссылку и нажмите '+'",
		"Enter the link and click '+'",
		"Введіть посилання та натисніть '+'"],
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
	deletion  : ['Удаление…', 'Deletion…', 'Видалення…'],
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
	noSage: [
		'Без сажи',
		'No sage',
		'Без сажі'],
	postsOmitted: [
		'Пропущено ответов: ',
		'Posts omitted: ',
		'Пропущено відповідей: '],
	newPost: [
		['новый пост', 'новых поста', 'новых постов', 'Последний'],
		['new post', 'new posts', 'new posts', 'Latest'],
		['новий пост', 'нових пости', 'нових постів', 'Останній']]
};

/* ==[ GlobalVars.js ]== */

const doc = window.document;
const emptyFn = Function.prototype;
const aProto = Array.prototype;
const Images_ = { preloading: false, afterpreload: null, progressId: null, canvas: null };
const gitWiki = 'https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/';
const gitRaw = 'https://raw.githubusercontent.com/SthephanShinkufag/Dollchan-Extension-Tools/master/';

let docBody, locStorage, sesStorage, Cfg, pByEl, pByNum, aib, nav, updater,
	dTime, pr, dummy, lang, isExpImg, isPreImg, needScroll, excludeList;
let quotetxt = '';
let nativeXHRworks = true;
let visPosts = 2;
let topWinZ = 0;

/* ==[ Utils.js ]=============================================================================================
                                                    UTILS
=========================================================================================================== */

// DOM SEARCH

const $Q = (path, root = docBody) => root.querySelectorAll(path);

const $q = (path, root = docBody) => root.querySelector(path);

const $id = id => doc.getElementById(id);

const $each = (els, cb) => aProto.forEach.call(els, cb);

function $parent(el, tagName) {
	do {
		el = el.parentElement;
	} while(el && el.tagName !== tagName);
	return el;
}

// DOM MODIFIERS

function $before(el, node) {
	el.parentNode.insertBefore(node, el);
}

function $after(el, node) {
	const next = el.nextSibling;
	if(next) {
		el.parentNode.insertBefore(node, next);
	} else {
		el.parentNode.appendChild(node);
	}
}

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

function $replace(origEl, newEl) {
	if(typeof newEl === 'string') {
		origEl.insertAdjacentHTML('afterend', newEl);
		origEl.remove();
	} else {
		origEl.parentNode.replaceChild(newEl, origEl);
	}
}

function $del(el) {
	if(el) {
		el.remove();
	}
}

function $add(html) {
	dummy.innerHTML = html;
	return dummy.firstElementChild;
}

const $txt = el => doc.createTextNode(el);

// TODO: Get rid of this function and paste buttons in html
function $btn(val, ttl, fn, className = 'de-button') {
	const el = doc.createElement('input');
	el.type = 'button';
	el.className = className;
	el.value = val;
	el.title = ttl;
	el.addEventListener('click', fn);
	return el;
}

function $script(text) {
	// We can't insert scripts directly as html
	const el = doc.createElement('script');
	el.type = 'text/javascript';
	el.textContent = text;
	$del(doc.head.appendChild(el));
}

function $css(text) {
	if(nav.isSafari && !('flex' in docBody.style)) {
		text = text.replace(/(transform|transition|flex|align-items)/g, ' -webkit-$1');
	}
	return $bEnd(doc.head, `<style type="text/css">${ text }</style>`);
}

function $DOM(html) {
	const myDoc = doc.implementation.createHTMLDocument('');
	myDoc.documentElement.innerHTML = html;
	return myDoc;
}

// CSS UTILS

function $toggle(el, needToShow = el.style.display) {
	if(needToShow) {
		el.style.removeProperty('display');
	} else {
		el.style.display = 'none';
	}
}

function $show(el) {
	el.style.removeProperty('display');
}

function $hide(el) {
	el.style.display = 'none';
}

function $animate(el, cName, remove = false) {
	el.addEventListener('animationend', function aEvent() {
		el.removeEventListener('animationend', aEvent);
		if(remove) {
			el.remove();
		} else {
			el.classList.remove(cName);
		}
	});
	el.classList.add(cName);
}

// Checks the validity of the user inputted color
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

// OTHER UTILS

const pad2 = i => (i < 10 ? '0' : '') + i;

const $join = (arr, start, end) => start + arr.join(end + start) + end;

const fixBrd = b => `/${ b }${ b ? '/' : '' }`;

const getAbsLink = url => (
	url[1] === '/' ? aib.prot + url :
	url[0] === '/' ? aib.prot + '//' + aib.host + url : url
);

// Prepares a string to be used as a new RegExp argument
const quoteReg = str => (str + '').replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');

// Converts a string to a regular expression
function toRegExp(str, noG) {
	const l = str.lastIndexOf('/');
	const flags = str.substr(l + 1);
	return new RegExp(str.substr(1, l - 1), noG ? flags.replace('g', '') : flags);
}

function escapeHTML(html) {
	const el = doc.createElement('div');
	el.appendChild($txt(html));
	return el.innerHTML;
}

function $pd(e) {
	e.preventDefault();
}

function $isEmpty(obj) {
	for(const i in obj) {
		if(obj.hasOwnProperty(i)) {
			return false;
		}
	}
	return true;
}

function $txtInsert(el, txt) {
	const scrtop = el.scrollTop;
	const start = el.selectionStart;
	el.value = el.value.substr(0, start) + txt + el.value.substr(el.selectionEnd);
	el.setSelectionRange(start + txt.length, start + txt.length);
	el.focus();
	el.scrollTop = scrtop;
}

// XXX: SVG events hack for Opera Presto
function fixEventEl(el) {
	if(el && nav.Presto) {
		const svg = el.correspondingUseElement;
		if(svg) {
			el = svg.ownerSVGElement;
		}
	}
	return el;
}

// Allows to record the duration of code execution
const Logger = {
	finish() {
		this._finished = true;
		this._marks.push(['LoggerFinish', Date.now()]);
	},
	getData(full) {
		const marks = this._marks;
		const timeLog = [];
		let duration, i = 1;
		let lastExtra = 0;
		for(let len = marks.length - 1; i < len; ++i) {
			duration = marks[i][1] - marks[i - 1][1] + lastExtra;
			// Ignore logs equal to 0ms
			if(full || duration > 1) {
				lastExtra = 0;
				timeLog.push([marks[i][0], duration]);
			} else {
				lastExtra = duration;
			}
		}
		duration = marks[i][1] - marks[0][1];
		timeLog.push([Lng.total[lang], duration]);
		return timeLog;
	},
	init() {
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

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

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
	cancel() {
		this._reject(new CancelError());
		if(!this._isResolved && this._cancelFn) {
			this._cancelFn();
		}
	}
	catch(eb) {
		return this.then(void 0, eb);
	}
	then(cb, eb) {
		const children = [];
		const wrap = fn => function(...args) {
			const child = fn(...args);
			if(child instanceof CancelablePromise) {
				children.push(child);
			}
			return child;
		};
		return new CancelablePromise(
			resolve => resolve(this._promise.then(cb && wrap(cb), eb && wrap(eb))),
			() => {
				for(const child of children) {
					child.cancel();
				}
				this.cancel();
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
	end() {
		if(this.hasValue) {
			this.value.end();
		}
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
	static remove(key) {
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
	complete() {
		if(!this.stopped) {
			if(this.array.length === 0 && this.running === 0) {
				this.endFn();
			} else {
				this.completed = true;
			}
		}
	}
	continue() {
		if(!this.stopped) {
			this.paused = false;
			if(this.array.length === 0) {
				if(this.completed) {
					this.endFn();
				}
				return;
			}
			while(this.array.length !== 0 && this.running !== this.max) {
				this._run(this.array.shift());
				this.running++;
			}
		}
	}
	pause() {
		this.paused = true;
	}
	run(data) {
		if(!this.stopped) {
			if(this.paused || this.running === this.max) {
				this.array.push(data);
			} else {
				this._run(data);
				this.running++;
			}
		}
	}
	stop() {
		this.stopped = true;
		this.endFn();
	}

	_end() {
		if(!this.stopped) {
			if(!this.paused && this.array.length !== 0) {
				this._run(this.array.shift());
				return;
			}
			this.running--;
			if(!this.paused && this.completed && this.running === 0) {
				this.endFn();
			}
		}
	}
	_run(data) {
		this.func(this.num++, data).then(() => this._end(), e => {
			if(e instanceof TasksPool.PauseError) {
				this.pause();
				if(e.duration !== -1) {
					setTimeout(() => this.continue(), e.duration);
				}
			} else {
				this._end();
				throw e;
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
			this.run = (data, transferObjs, fn) => fn(wrkFn(data));
			return;
		}
		const url = window.URL.createObjectURL(new Blob([`self.onmessage = function(e) {
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
	clear() {
		window.URL.revokeObjectURL(this._url);
		this._freeWorkers.forEach(w => w.terminate());
		this._freeWorkers = [];
	}
	run(data, transferObjs, fn) {
		this._pool.run([data, transferObjs, fn]);
	}

	_createWorker(num, data) {
		return new Promise(resolve => {
			const w = this._freeWorkers.pop();
			const [sendData, transferObjs, fn] = data;
			w.onmessage = e => {
				fn(e.data);
				this._freeWorkers.push(w);
				resolve();
			};
			w.onerror = err => {
				resolve();
				this._freeWorkers.push(w);
				this._errFn(err);
			};
			w.postMessage(sendData, transferObjs);
		});
	}
}

class TarBuilder {
	constructor() {
		this._data = [];
	}
	addFile(filepath, input) {
		let i, checksum = 0;
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
		TarBuilder._padSet(header, 136, Math.floor(Date.now() / 1000).toString(8), 12); // mtime
		TarBuilder._padSet(header, 148, '        ', 8); // checksum
		// type ('0')
		header[156] = 0x30;
		for(i = 0; i < 157; i++) {
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
		const len = sDat.length;
		const data = new Uint8Array(len);
		for(let i = 0; i < len; ++i) {
			data[i] = sDat.charCodeAt(i) & 0xFF;
		}
		this.addFile(filepath, data);
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
	addData(data) {
		if(this.error || !data) {
			return this;
		}
		const size = (typeof data === 'string') ? data.length : data.byteLength;
		if(size > 127) {
			this.error = true;
			return;
		}
		this.rv.push(new Uint8Array([this.voidId, 0x80 | size]), data);
		return this;
	}
	getData() {
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

function getErrorMessage(e) {
	if(e instanceof AjaxError) {
		return e.toString();
	}
	if(typeof e === 'string') {
		return e;
	}
	return Lng.internalError[lang] + (
		!e.stack ? `${ e.name }: ${ e.message }` :
		nav.isWebkit ? e.stack : `${ e.name }: ${ e.message }\n${ !nav.isFirefox ? e.stack : e.stack.replace(
			/^([^@]*).*\/(.+)$/gm,
			(str, fName, line) => `    at ${ fName ? `${ fName } (${ line })` : line }`
		) }`
	);
}

// https://html.spec.whatwg.org/multipage/forms.html#constructing-form-data-set
function * getFormElements(form, submitter) {
	const controls = $Q('button, input, keygen, object, select, textarea', form);
	const fixName = name => name ? name.replace(/([^\r])\n|\r([^\n])/g, '$1\r\n$2') : '';

	constructSet:
	for(let i = 0, len = controls.length; i < len; ++i) {
		const field = controls[i];
		const tagName = field.tagName.toLowerCase();
		const type = field.getAttribute('type');
		const name = field.getAttribute('name');
		if($parent(field, 'DATALIST', form) || isFormElDisabled(field) ||
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
				if(field.files.length > 0) {
					const { files } = field;
					for(let j = 0, jlen = files.length; j < jlen; ++j) {
						yield { name, type, el: field, value: files[j] };
					}
				} else if(field.obj && (img = field.obj.imgFile)) {
					yield {
						name,
						type,
						el    : field,
						value : new File([img[0]], img[1], { type: img[2] })
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
				value : (nav.matchesSelector(field, ':dir(rtl)') ? 'rtl' : 'ltr')
			};
		}
	}
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

function prettifySize(val) {
	if(val > 512 * 1024 * 1024) {
		return (val / (1024 * 1024 * 1024)).toFixed(2) + Lng.sizeGByte[lang];
	}
	if(val > 512 * 1024) {
		return (val / (1024 * 1024)).toFixed(2) + Lng.sizeMByte[lang];
	}
	if(val > 512) {
		return (val / (1024)).toFixed(2) + Lng.sizeKByte[lang];
	}
	return val.toFixed(2) + Lng.sizeByte[lang];
}

function getFileType(url) {
	return /\.jpe?g$/i.test(url) ? 'image/jpeg' :
		/\.png$/i.test(url) ? 'image/png' :
		/\.gif$/i.test(url) ? 'image/gif' :
		/\.webm$/i.test(url) ? 'video/webm' : '';
}

function downloadBlob(blob, name) {
	const url = nav.MsEdge ? navigator.msSaveOrOpenBlob(blob, name) : window.URL.createObjectURL(blob);
	const link = docBody.appendChild($add(`<a href="${ url }" download="${ name }"></a>`));
	link.click();
	setTimeout(() => {
		window.URL.revokeObjectURL(url);
		$del(link);
	}, 2e5);
}

/* ==[ Storage.js ]===========================================================================================
                                                   STORAGE
=========================================================================================================== */

// Gets data from the global storage
async function getStored(id) {
	if(nav.isNewGM) {
		const value = await GM.getValue(id);
		return value;
	} else if(nav.isGM) {
		return GM_getValue(id);
	} else if(nav.isChromeStorage) {
		// Read storage.local first. If it not existed then read storage.sync
		const value = await new Promise(resolve => chrome.storage.local.get(id, function(obj) {
			if(Object.keys(obj).length) {
				resolve(obj[id]);
			} else {
				chrome.storage.sync.get(id, function(obj) {
					resolve(obj[id]);
				});
			}
		}));
		return value;
	} else if(nav.isScriptStorage) { // Opera Presto only
		return scriptStorage.getItem(id);
	}
	return locStorage[id];
}

// Saves data into the global storage
// FIXME: make async?
function setStored(id, value) {
	if(nav.isNewGM) {
		return GM.setValue(id, value);
	} else if(nav.isGM) {
		GM_setValue(id, value);
	} else if(nav.isChromeStorage) {
		const obj = {};
		obj[id] = value;
		chrome.storage.sync.set(obj, function() {
			if(chrome.runtime.lastError) {
				// Store into storage.local if the storage.sync limit is exceeded
				chrome.storage.local.set(obj, emptyFn);
				chrome.storage.sync.remove(id, emptyFn);
			} else {
				chrome.storage.local.remove(id, emptyFn);
			}
		});
	} else if(nav.isScriptStorage) { // Opera Presto only
		scriptStorage.setItem(id, value);
	} else {
		locStorage[id] = value;
	}
}

// Removes data from the global storage
// FIXME: make async?
function delStored(id) {
	if(nav.isNewGM) {
		return GM.deleteValue(id);
	} else if(nav.isGM) {
		GM_deleteValue(id);
	} else if(nav.isChromeStorage) {
		chrome.storage.sync.remove(id, emptyFn);
	} else if(nav.isScriptStorage) {
		scriptStorage.removeItem(id);
	} else {
		locStorage.removeItem(id);
	}
}

// Receives and parses JSON data into an object
async function getStoredObj(id) {
	return JSON.parse((await getStored(id)) || '{}') || {};
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
	return Promise.all([getStored('DESU_Exclude'), readFavorites(), readCfg()]);
}

// Config initialization, checking for Dollchan update.
async function readCfg() {
	let obj;
	const val = await getStoredObj('DESU_Config');
	if(!(aib.dm in val) || $isEmpty(obj = val[aib.dm])) {
		const hasGlobal = nav.isGlobal && !!val.global;
		obj = hasGlobal ? val.global : {};
		if(hasGlobal) {
			delete obj.correctTime;
			delete obj.captchaLang;
		}
	}
	defaultCfg.captchaLang = aib.capLang;
	defaultCfg.language = +!String(navigator.language).toLowerCase().startsWith('ru');
	Cfg = Object.assign(Object.create(defaultCfg), obj);
	if(!Cfg.timeOffset) {
		Cfg.timeOffset = '+0';
	}
	if(!Cfg.timePattern) {
		Cfg.timePattern = aib.timePattern;
	}
	if(aib.prot !== 'http:') { // Vocaroo doesn't support https
		Cfg.addVocaroo = 0;
	}
	if(aib.dobr && !Cfg.useDobrAPI) {
		aib.JsonBuilder = null;
	}
	if(!('FormData' in window)) {
		Cfg.ajaxPosting = 0;
	}
	if(!('Notification' in window)) {
		Cfg.desktNotif = 0;
	}
	if(nav.Presto) {
		if(Cfg.YTubeType === 2) {
			Cfg.YTubeType = 1;
		}
		Cfg.preLoadImgs = 0;
		Cfg.findImgFile = 0;
		if(!nav.isGM) {
			Cfg.updScript = 0;
		}
		Cfg.fileInputs = 0;
	}
	if(nav.isChromeStorage) {
		Cfg.updScript = 0;
	}
	if(Cfg.updThrDelay < 10) {
		Cfg.updThrDelay = 10;
	}
	if(!Cfg.saveSage) {
		Cfg.sageReply = 0;
	}
	if(!Cfg.passwValue) {
		Cfg.passwValue = Math.round(Math.random() * 1e15).toString(32);
	}
	if(!Cfg.stats) {
		Cfg.stats = { view: 0, op: 0, reply: 0 };
	}
	setStored('DESU_Config', JSON.stringify(val));
	lang = Cfg.language;
	if(Cfg.updScript) {
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
function readPostsData(firstPost, fav) {
	let sVis = null;
	try {
		// Get hidden posts and threads that cached in current session
		const str = aib.t ? sesStorage['de-hidden-' + aib.b + aib.t] : null;
		if(str) {
			const json = JSON.parse(str);
			if(json.hash === (Cfg.hideBySpell ? Spells.hash : 0) &&
				pByNum.has(json.lastNum) && pByNum.get(json.lastNum).count === json.lastCount
			) {
				sVis = json.data && json.data[0] instanceof Array ? json.data : null;
			}
		}
	} catch(e) {
		sesStorage['de-hidden-' + aib.b + aib.t] = null;
	}
	if(!firstPost) {
		return;
	}
	let updateFav = false;
	const favBrd = (aib.host in fav) && (aib.b in fav[aib.host]) ? fav[aib.host][aib.b] : {};
	const spellsHide = Cfg.hideBySpell;
	const maybeSpells = new Maybe(SpellsRunner);

	// Search existed posts in stored data
	for(let post = firstPost; post; post = post.next) {
		const { num } = post;
		// Mark favorite threads, update favorites data
		if(post.isOp && (num in favBrd)) {
			const f = favBrd[num];
			const { thr } = post;
			post.setFavBtn(true);
			if(aib.t) {
				f.cnt = thr.pcount;
				f.new = 0;
				f.you = 0;
				if(Cfg.markNewPosts && f.last) {
					let lastPost = pByNum.get(+f.last.match(/\d+/));
					if(lastPost) {
						// Mark all new posts after last viewed post
						while((lastPost = lastPost.next)) {
							Post.addMark(lastPost.el, true);
						}
					}
				}
				f.last = aib.anchor + thr.last.num;
			} else {
				f.new = thr.pcount - f.cnt;
			}
			updateFav = true;
		}
		// Hide hidden posts and threads
		if(HiddenPosts.has(num)) {
			const uHideData = HiddenPosts.get(num);
			if(!uHideData && post.isOp && HiddenThreads.has(num)) {
				post.setUserVisib(true);
			} else {
				post.setUserVisib(uHideData, false);
			}
			continue;
		}
		let hideData;
		if(post.isOp) {
			if(HiddenThreads.has(num)) {
				hideData = [true, null];
			} else if(spellsHide) {
				hideData = sVis && sVis[post.count];
			}
		} else if(spellsHide) {
			hideData = sVis && sVis[post.count];
		} else {
			continue;
		}
		if(!hideData) {
			maybeSpells.value.run(post); // Apply spells if posts not hidden
		} else if(hideData[0]) {
			if(post.hidden) {
				post.spellHidden = true;
			} else {
				post.spellHide(hideData[1]);
			}
		}
	}
	maybeSpells.end();
	if(Cfg.panelCounter === 2) {
		$id('de-panel-info-pcount').textContent = Thread.first.pcount - Thread.first.hidCounter;
	}
	if(updateFav) {
		setStored('DESU_Favorites', JSON.stringify(fav));
	}
	// After following a link from Favorites, we need to open Favorites again.
	if(sesStorage['de-win-fav'] === '1') {
		toggleWindow('fav', false, null, true);
		sesStorage.removeItem('de-win-fav');
	}
}

function readFavorites() {
	return getStoredObj('DESU_Favorites');
}

function saveFavorites(fav) {
	setStored('DESU_Favorites', JSON.stringify(fav));
	toggleWindow('fav', true, fav);
}

function removeFavoriteEntry(fav, h, b, num) {
	if((h in fav) && (b in fav[h]) && (num in fav[h][b])) {
		delete fav[h][b][num];
		if(fav[h][b].hasOwnProperty('url') && Object.keys(fav[h][b]).length === 1) {
			delete fav[h][b];
			if($isEmpty(fav[h])) {
				delete fav[h];
			}
		}
	}
}

// Get posts that were read by posts previews
function readViewedPosts() {
	if(!Cfg.markViewed) {
		const data = sesStorage['de-viewed'];
		if(data) {
			data.split(',').forEach(function(pNum) {
				const post = pByNum.get(+pNum);
				if(post) {
					post.el.classList.add('de-viewed');
					post.viewed = true;
				}
			});
		}
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
		return storage ? storage.hasOwnProperty(num) : false;
	}
	purge() {
		this._cacheTO = this.__cachedTime = this._cachedStorage = null;
	}
	remove(num, board = aib.b) {
		const storage = this._readStorage();
		const bStorage = storage[board];
		if(bStorage && bStorage.hasOwnProperty(num)) {
			delete bStorage[num];
			if($isEmpty(bStorage)) {
				delete storage[board];
			}
			this._saveStorage();
		}
	}
	set(num, thrNum, data = true) {
		const storage = this._readStorage();
		if(storage && storage.$count > 5000) {
			const minDate = Date.now() - 5 * 24 * 3600 * 1000;
			for(const b in storage) {
				if(storage.hasOwnProperty(b)) {
					const data = storage[b];
					for(const key in data) {
						if(data.hasOwnProperty(key) && data[key][0] < minDate) {
							delete data[key];
						}
					}
				}
			}
		}
		if(!storage[aib.b]) {
			storage[aib.b] = {};
		}
		storage[aib.b][num] = [this._cachedTime, thrNum, data];
		this._saveStorage();
	}

	static _migrateOld(newName, oldName) {
		if(locStorage.hasOwnProperty(oldName)) {
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
			} catch(e) {}
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

const HiddenPosts = new (class HiddenPostsClass extends PostsStorage {
	constructor() {
		super();
		this.storageName = 'de-posts';
	}
	_readStorage() {
		PostsStorage._migrateOld(this.storageName, 'de-threads-new'); // Old storage has wrong name
		return super._readStorage();
	}
})();

const HiddenThreads = new (class HiddenThreadsClass extends PostsStorage {
	constructor() {
		super();
		this.storageName = 'de-threads';
	}
	getCount() {
		const storage = this._readStorage();
		let rv = 0;
		for(const b in storage) {
			rv += Object.keys(storage[b]).length;
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
})();

const MyPosts = new (class MyPostsClass extends PostsStorage {
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
	read() {
		this._readStorage();
	}
	set(num, thrNum) {
		super.set(num, thrNum);
		this._cachedData.add(+num);
		locStorage['__de-mypost'] = 1; // Synchronize my post with other tabs
		locStorage.removeItem('__de-mypost');
	}

	_readStorage() {
		if(this._cachedData && this._cachedStorage) {
			return this._cachedStorage;
		}
		PostsStorage._migrateOld(this.storageName, 'de-myposts-new');
		const rv = super._readStorage();
		this._cachedData = rv[aib.b] ? new Set(Object.keys(rv[aib.b]).map(_ => +_)) : new Set();
		return rv;
	}
})();

function initStorageEvent() {
	doc.defaultView.addEventListener('storage', e => {
		let data, temp, val = e.newValue;
		if(!val) {
			return;
		}
		switch(e.key) {
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
					if(post && (post.hidden ^ data.hide)) {
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
				Spells.disable();
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

const Panel = {
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
	init(formEl) {
		const imgLen = $Q(aib.qPostImg, formEl).length;
		const isThr = aib.t;
		(pr && pr.pArea[0] || formEl).insertAdjacentHTML('beforebegin', `<div id="de-main">
			<div id="de-panel">
				<div id="de-panel-logo" title="${ Lng.panelBtn.attach[lang] }">
					<svg class="de-panel-logo-svg">
						<use xlink:href="#de-symbol-panel-logo"/>
					</svg>
				</div>
				<span id="de-panel-buttons"${ Cfg.expandPanel ? '' : ' style="display: none;"' }>
				${ Cfg.disabled ? this._getButton('enable') : (this._getButton('cfg') +
					this._getButton('hid') +
					this._getButton('fav') +
					(!Cfg.addYouTube ? '' : this._getButton('vid')) +
					(localData ? '' :
						this._getButton('refresh') +
						(!isThr && (aib.page === aib.firstPage) ? '' : this._getButton('goback')) +
						(isThr || aib.page === aib.lastPage ? '' : this._getButton('gonext'))) +
					this._getButton('goup') +
					this._getButton('godown') +
					(imgLen === 0 ? '' :
						this._getButton('expimg') +
						this._getButton('maskimg')) +
					(nav.Presto || localData ? '' :
						(imgLen === 0 || Cfg.preLoadImgs ? '' : this._getButton('preimg')) +
						(!isThr ? '' : this._getButton('savethr'))) +
					(!isThr || localData ? '' :
						this._getButton(Cfg.ajaxUpdThr && !aib.isArchived ? 'upd-on' : 'upd-off') +
						(nav.isSafari ? '' : this._getButton('audio-off'))) +
					(!aib.hasCatalog ? '' : this._getButton('catalog')) +
					this._getButton('enable') +
					(!isThr ? '' : `<span id="de-panel-info">
						<span id="de-panel-info-pcount" title="` +
							`${ Lng.panelBtn[Cfg.panelCounter !== 2 ? 'pcount' : 'pcountNotHid'][lang] }">` +
							`${ Thread.first.pcount }</span>
						<span id="de-panel-info-icount" title="${ Lng.panelBtn.imglen[lang] }">
							${ imgLen }</span>
						<span id="de-panel-info-acount" title="${ Lng.panelBtn.posters[lang] }"></span>
					</span>`)) }
				</span>
			</div>
			${ Cfg.disabled ? '' : '<div id="de-wrapper-popup"></div><hr style="clear: both;">' }
		</div>`);
		this._el = $id('de-panel');
		this._el.addEventListener('click', this, true);
		this._el.addEventListener('mouseover', this);
		this._el.addEventListener('mouseout', this);
		this._buttons = $id('de-panel-buttons');
		this.isNew = true;
	},
	remove() {
		this._el.removeEventListener('click', this, true);
		this._el.removeEventListener('mouseover', this);
		this._el.removeEventListener('mouseout', this);
		delete this._pcountEl;
		delete this._icountEl;
		delete this._acountEl;
		$del($id('de-main'));
	},
	handleEvent(e) {
		if('isTrusted' in e && !e.isTrusted) {
			return;
		}
		let el = fixEventEl(e.target);
		if(el.tagName.toLowerCase() === 'svg') {
			el = el.parentNode;
		}
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
			case 'de-panel-vid': toggleWindow('vid', false); break;
			case 'de-panel-refresh': window.location.reload(); break;
			case 'de-panel-goup': scrollTo(0, 0); break;
			case 'de-panel-godown': scrollTo(0, docBody.scrollHeight || docBody.offsetHeight); break;
			case 'de-panel-expimg':
				isExpImg = !isExpImg;
				$del($q('.de-fullimg-center'));
				for(let post = Thread.first.op; post; post = post.next) {
					post.toggleImages(isExpImg);
				}
				break;
			case 'de-panel-preimg':
				isPreImg = !isPreImg;
				if(!e.ctrlKey) {
					for(const { el } of DelForm) {
						preloadImages(el);
					}
				}
				break;
			case 'de-panel-maskimg':
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
					updater.enable();
					el.id = 'de-panel-audio-on';
				} else {
					el.id = 'de-panel-audio-off';
				}
				$del($q('.de-menu'));
				break;
			case 'de-panel-savethr': break;
			case 'de-panel-enable':
				toggleCfg('disabled');
				window.location.reload();
				break;
			default: return;
			}
			$pd(e);
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
				if(this._menu && this._menu.parentEl === el) {
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
			this._prepareToHide(fixEventEl(e.relatedTarget));
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
		// XXX nav.Presto: keep in sync with updMachine._setUpdateStatus
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
};

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
				docBody.addEventListener('mousemove', this);
				docBody.addEventListener('mouseup', this);
				$pd(e);
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
			default: // mouseup
				docBody.removeEventListener('mousemove', this);
				docBody.removeEventListener('mouseup', this);
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
			docBody.addEventListener('mousemove', this);
			docBody.addEventListener('mouseup', this);
			$pd(e);
			return;
		case 'mousemove':
			if(this.vertical) {
				val = e.clientY;
				this.tStyle.height = Math.max(parseInt(this.tStyle.height, 10) + (
					this.dir === 'top' ? cr.top - (val < 20 ? 0 : val) :
					(val > maxY - 45 ? maxY - 25 : val) - cr.bottom
				), 90) + 'px';
			} else {
				val = e.clientX;
				this.tStyle.width = Math.max(parseInt(this.tStyle.width, 10) + (
					this.dir === 'left' ? cr.left - (val < 20 ? 0 : val) :
					(val > maxX - 20 ? maxX : val) - cr.right
				), this.name === 'reply' ? 275 : 400) + 'px';
			}
			return;
		default: // mouseup
			docBody.removeEventListener('mousemove', this);
			docBody.removeEventListener('mouseup', this);
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

function toggleWindow(name, isUpd, data, noAnim) {
	let el, win = $id('de-win-' + name);
	const isActive = win && win.classList.contains('de-win-active');
	if(isUpd && !isActive) {
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
					<svg class="de-btn-toggle"><use xlink:href="#de-symbol-win-arrow"/></svg>
					<svg class="de-btn-close"><use xlink:href="#de-symbol-win-close"/></svg>
				</span>
			</div>
			<div class="de-win-body"></div>
			${ name !== 'fav' ? '' : `
				<div class="de-resizer de-resizer-left"></div>
				<div class="de-resizer de-resizer-right"></div>` }
		</div>`);
		setTimeout(() => {
			const el = $q('.de-win-body', win);
			if(name === 'cfg') {
				el.className = 'de-win-body ' + aib.cReply;
			} else {
				const backColor = getComputedStyle(docBody).getPropertyValue('background-color');
				el.style.backgroundColor = backColor !== 'transparent' ? backColor : '#EEE';
			}
		}, 0);
		if(name === 'fav') {
			new WinResizer('fav', 'left', 'favWinWidth', win, win);
			new WinResizer('fav', 'right', 'favWinWidth', win, win);
		}
		el = $q('.de-win-buttons', win);
		el.onmouseover = ({ target }) => {
			const el = target.parentNode;
			switch(fixEventEl(target).classList[0]) {
			case 'de-btn-close': el.title = Lng.closeWindow[lang]; break;
			case 'de-btn-toggle': el.title = Cfg[name + 'WinDrag'] ? Lng.toPanel[lang] : Lng.makeDrag[lang];
			}
		};
		el.lastElementChild.onclick = () => toggleWindow(name, false);
		el.firstElementChild.onclick = () => {
			const { width } = win.style;
			const w = width ? '; width: ' + width : '';
			toggleCfg(name + 'WinDrag');
			if(Cfg[name + 'WinDrag']) {
				win.classList.remove('de-win-fixed');
				win.classList.add('de-win');
				win.style.cssText = Cfg[name + 'WinX'] + '; ' + Cfg[name + 'WinY'] + w;
			} else {
				const temp = $q('.de-win-active.de-win-fixed', win.parentNode);
				if(temp) {
					toggleWindow(temp.id.substr(7), false);
				}
				win.classList.remove('de-win');
				win.classList.add('de-win-fixed');
				win.style.cssText = 'right: 0; bottom: 25px' + w;
			}
			updateWinZ(win.style);
		};
		makeDraggable(name, win, $q('.de-win-head', win));
	}
	updateWinZ(win.style);
	let remove = !isUpd && isActive;
	if(!remove && !win.classList.contains('de-win') &&
		(el = $q(`.de-win-active.de-win-fixed:not(#de-win-${ name })`, win.parentNode))
	) {
		toggleWindow(el.id.substr(7), false);
	}
	const isAnim = !noAnim && !isUpd && Cfg.animation;
	let body = $q('.de-win-body', win);
	if(isAnim && body.hasChildNodes()) {
		win.addEventListener('animationend', function aEvent(e) {
			e.target.removeEventListener('animationend', aEvent);
			showWindow(win, body, name, remove, data, Cfg.animation);
			win = body = name = remove = data = null;
		});
		win.classList.remove('de-win-open');
		win.classList.add('de-win-close');
	} else {
		showWindow(win, body, name, remove, data, isAnim);
	}
}

function showWindow(win, body, name, remove, data, isAnim) {
	body.innerHTML = '';
	if(remove) {
		win.classList.remove('de-win-active');
		win.classList.remove('de-win-close');
		$hide(win);
		if(!Cfg.expandPanel && !$q('.de-win-active')) {
			$hide($id('de-panel-buttons'));
		}
		return;
	}
	win.classList.add('de-win-active');
	if(!Cfg.expandPanel) {
		$show($id('de-panel-buttons'));
	}
	switch(name) {
	case 'fav':
		if(data) {
			showFavoritesWindow(body, data);
			break;
		}
		readFavorites().then(fav => {
			showFavoritesWindow(body, fav);
			$show(win);
			if(isAnim) {
				win.classList.add('de-win-open');
			}
		});
		return;
	case 'cfg': CfgWindow.init(body); break;
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
	if(!$id('de-ytube-api')) {
		// YouTube APT script. We can't insert scripts directly as html.
		const script = doc.createElement('script');
		script.type = 'text/javascript';
		script.src = aib.prot + '//www.youtube.com/player_api';
		doc.head.appendChild(script).id = 'de-ytube-api';
	}
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
	body.appendChild(script);

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
				switch(e.target.id) {
				case 'de-video-btn-hide': // Fold/unfold list of links
					if((this.listHidden = !this.listHidden)) {
						$hide(this.linkList);
						e.target.textContent = '\u25BC';
					} else {
						$show(this.linkList);
						e.target.textContent = '\u25B2';
					}
					break;
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
				$pd(e);
				return;
			} else if(!el.classList.contains('de-video-link')) { // Clicking on ">" before link
				// Go to post that contains this link
				pByNum.get(+e.target.getAttribute('de-num')).selectAndScrollTo();
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
				this.playerInfo = info;
				Videos.addPlayer(this.player, info, el.classList.contains('de-ytube'), true);
			}
			$pd(e);
		}
	}, true);

	// Copy all video links into videos list
	for(let i = 0, len = els.length; i < len; ++i) {
		const el = els[i].cloneNode(true);
		const { num } = aib.getPostOfEl(els[i]);
		el.videoInfo = els[i].videoInfo;
		$bEnd(linkList, `<div class="de-entry ${ aib.cReply }">
			<a class="de-video-refpost" title=">>${ num }" de-num="${ num }">&gt;</a>
		</div>`).appendChild(el).classList.remove('de-current');
		el.setAttribute('onclick', 'window.de_addVideoEvents && window.de_addVideoEvents();');
	}
	body.appendChild(linkList);
	$q('.de-video-link', linkList).click();
}

// HIDDEN THREADS WINDOW
function showHiddenWindow(body) {
	const hThr = HiddenThreads.getRawData();
	const hasThreads = !$isEmpty(hThr);
	if(hasThreads) {
		// Generate DOM for the list of hidden threads
		for(const b in hThr) {
			if($isEmpty(hThr[b])) {
				continue;
			}
			const block = $bEnd(body,
				`<div class="de-fold-block"><input type="checkbox"><b>/${ b }</b></div>`);
			block.firstChild.onclick =
				e => $each($Q('.de-entry > input', block), el => (el.checked = e.target.checked));
			for(const tNum in hThr[b]) {
				$bEnd(block, `<div class="de-entry ${ aib.cReply }" info="${ b };${ tNum }">
					<input type="checkbox">
					<a href="${ aib.getThrUrl(b, tNum) }" target="_blank">${ tNum }</a>
					<div class="de-entry-title">- ${ hThr[b][tNum][2] }</div>
				</div>`);
			}
		}
	}
	$bEnd(body, hasThreads ? '<hr>' : `<center><b>${ Lng.noHidThr[lang] }</b></center><hr>`);

	// "Edit" button. Calls a popup with editor to edit Hidden in JSON.
	body.appendChild(getEditButton('hidden', fn => fn(HiddenThreads.getRawData(), true, data => {
		HiddenThreads.saveRawData(data);
		Thread.first.updateHidden(data[aib.b]);
		toggleWindow('hid', true);
	})));

	// "Clear" button. Allows to clear 404'd threads.
	body.appendChild($btn(Lng.clear[lang], Lng.clrDeleted[lang], async function(e) {
		// Sequentially load threads, and remove inaccessible
		const els = $Q('.de-entry[info]', e.target.parentNode);
		for(let i = 0, len = els.length; i < len; ++i) {
			const [b, tNum] = els[i].getAttribute('info').split(';');
			try {
				await $ajax(aib.getThrUrl(b, tNum));
			} catch(e) {
				if(e.code === 404) {
					HiddenThreads.remove(tNum, b); // Remove thread from threads storage
					HiddenPosts.remove(tNum, b); // Remove oppost from posts storage
				}
			}
		}
		toggleWindow('hid', true);
	}));

	// "Delete" button. Allows to delete selected threads
	body.appendChild($btn(Lng.remove[lang], Lng.delEntries[lang], () => {
		$each($Q('.de-entry[info]', body), el => {
			if(!$q('input', el).checked) {
				return;
			}
			const [brd, tNum] = el.getAttribute('info').split(';');
			const num = +tNum;
			if(pByNum.has(num)) {
				pByNum.get(num).setUserVisib(false);
			} else {
				// Synchronize current hidden thread in other tabs
				// Storage event listeners are loacted at initStorageEvent()
				locStorage['__de-post'] = JSON.stringify({ brd, num, hide: false, thrNum: num });
				locStorage.removeItem('__de-post');
			}
			HiddenThreads.remove(num, brd); // Remove thread from hidden threads storage
			HiddenPosts.set(num, num, false); // Actually unhide thread by its oppost
		});
		toggleWindow('hid', true);
	}));
}

/* ==[ WindowFavorites.js ]===================================================================================
                                              WINDOW: FAVORITES
=========================================================================================================== */

// Delete previously marked entries from Favorites
function cleanFavorites() {
	const els = $Q('.de-entry[de-removed]');
	const len = els.length;
	if(!len) {
		return;
	}
	readFavorites().then(data => {
		for(let i = 0; i < len; ++i) {
			const el = els[i];
			const h = el.getAttribute('de-host');
			const b = el.getAttribute('de-board');
			const num = +el.getAttribute('de-num');
			removeFavoriteEntry(data, h, b, num);
			// If there existed thread then switch its fav button
			if(h === aib.host && b === aib.b && pByNum.has(num)) {
				pByNum.get(num).thr.op.setFavBtn(false);
			}
		}
		saveFavorites(data);
	});
}

function showFavoritesWindow(body, data) {
	let html = '';
	// Create the list of favorite threads
	for(const h in data) {
		for(const b in data[h]) {
			const d = data[h][b];
			let innerHtml = '';
			for(const tNum in d) {
				if(tNum === 'url') { // Ignore keys with board url's
					continue;
				}
				const t = d[tNum];
				if(!t.url.startsWith('http')) { // XXX: compatibility with older versions
					t.url = (h === aib.host ? aib.prot + '//' : 'http://') + h + t.url;
				}

				// Generate DOM for separate entry
				const favLinkHref = t.url + (
					!t.last ? '' :
					t.last.startsWith('#') ? t.last :
					h === aib.host ? aib.anchor + t.last : '');
				const favInfIwrapTitle = !t.err ? '' :
					t.err === 'Closed' ? `title="${ Lng.thrClosed[lang] }"` : `title="${ t.err }"`;
				const favInfIconClass = !t.err ? '' :
					t.err === 'Closed' || t.err === 'Archived' ? 'de-fav-closed' : 'de-fav-unavail';
				const favInfYouDisp = t.you ? '' : ' style="display: none;"';
				const favInfNewDisp = t.new ? '' : ' style="display: none;"';
				innerHtml += `<div class="de-entry ${ aib.cReply }" de-host="${ h }" de-board="${
					b }" de-num="${ tNum }" de-url="${ t.url }">
					<input class="de-fav-switch" type="checkbox">
					<a class="de-fav-link" href="${ favLinkHref }" rel="noreferrer">${ tNum }</a>
					<div class="de-entry-title">- ${ t.txt }</div>
					<div class="de-fav-inf">
						<span class="de-fav-inf-iwrap" ${ favInfIwrapTitle }>
							<svg class="de-fav-inf-icon ${ favInfIconClass }">
								<use class="de-fav-closed-use" xlink:href="#de-symbol-closed"/>
								<use class="de-fav-unavail-use" xlink:href="#de-symbol-unavail"/>
								<use class="de-fav-wait-use" xlink:href="#de-symbol-wait"/>
							</svg>
						</span>
						<span class="de-fav-inf-you" title="${ Lng.myPostsRep[lang] }"${ favInfYouDisp }>
							${ t.you || 0 }</span>
						<span class="de-fav-inf-new" title="${ Lng.newPosts[lang] }"${ favInfNewDisp }>
							${ t.new || 0 }</span>
						<span class="de-fav-inf-old" title="${ Lng.oldPosts[lang] }">${ t.cnt }</span>
						<span class="de-fav-inf-page" title="${ Lng.thrPage[lang] }"></span>
					</div>
				</div>`;
			}
			if(!innerHtml) {
				continue;
			}
			// Building a foldable block for specific board
			html += `<div class="de-fold-block${ h === aib.host && b === aib.b ? ' de-fav-current' : '' }">
				<div class="de-fav-header">
					<input class="de-fav-header-switch" type="checkbox">
					<a class="de-fav-header-link" href="${ d.url }" rel="noreferrer">${ h }/${ b }</a>
				</div>
				<div class="de-fav-entries"${ h === aib.host ? ' de-opened' : ' style="display: none;"' }>
					${ innerHtml }
				</div>
			</div>`;
		}
	}

	// Appending DOM and events
	if(html) {
		$bEnd(body, `<div class="de-fav-table">${ html }</div>`).addEventListener('click', e => {
			let el = e.target;
			switch(el.className) {
			case 'de-fav-link':
				sesStorage['de-win-fav'] = '1'; // Favorites will open again after following a link
				el = el.parentNode;
				// We need to scroll to last seen post after following a link,
				// remembering of scroll position is no longer needed
				sesStorage.removeItem('de-scroll-' + el.getAttribute('de-board') + el.getAttribute('de-num'));
				break;
			case 'de-fav-header-switch': {
				const { checked } = el;
				// Select/unselect all checkboxes in board block
				el = el.parentNode.nextElementSibling;
				$each($Q('.de-entry > input', el), checkBox => (checkBox.checked = checked));
				if(!checked || el.hasAttribute('de-opened')) {
					return;
				}
				break;
			}
			case 'de-fav-header-link':
				el = el.parentNode.nextElementSibling;
				$pd(e); // TODO: remove and make it possible to follow a board link
				break;
			default: return;
			}
			// Fold/unfold the board block
			if(el.hasAttribute('de-opened')) {
				el.style.display = 'none';
				el.removeAttribute('de-opened');
			} else {
				el.removeAttribute('style');
				el.setAttribute('de-opened', '');
			}
		});
	} else {
		$bEnd(body, `<center><b>${ Lng.noFavThr[lang] }</b></center>`);
	}

	let div = $bEnd(body, '<hr><div id="de-fav-buttons"></div>');

	// "Edit" button. Calls a popup with editor to edit Favorites in JSON.
	div.appendChild(getEditButton('favor',
		fn => readFavorites().then(data => fn(data, true, saveFavorites))));

	// "Refresh" button. Updates counters of new posts for each thread entry.
	div.appendChild($btn(Lng.refresh[lang], Lng.infoCount[lang], async function() {
		const fav = await getStoredObj('DESU_Favorites');
		if(!fav[aib.host]) {
			return;
		}
		let isUpdate = false;
		let last404 = false;
		const myposts = JSON.parse(locStorage['de-myposts'] || '{}');
		const els = $Q('.de-entry');
		for(let i = 0, len = els.length; i < len; ++i) {
			const el = els[i];
			const host = el.getAttribute('de-host');
			const b = el.getAttribute('de-board');
			const num = el.getAttribute('de-num');
			const f = fav[host][b][num];
			// Updating doesn't works for other domains because of different posts structure
			// Updating is not needed in closed threads
			if(host !== aib.host || f.err === 'Closed' || f.err === 'Archived') {
				continue;
			}
			const countEl = $q('.de-fav-inf-new', el);
			const youEl = countEl.previousElementSibling;
			const iconEl = $q('.de-fav-inf-icon', el);
			const titleEl = iconEl.parentNode;
			// setAttribute for class is used because of SVG (for correct work in some browsers)
			iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-wait');
			titleEl.title = Lng.updating[lang];
			let form, isArchived;
			try {
				if(!aib.iichan) {
					form = await ajaxLoad(aib.getThrUrl(b, num));
				} else {
					[form, isArchived] = await ajaxLoad(aib.getThrUrl(b, num), true, false, aib.iichan);
				}
				last404 = false;
			} catch(e) {
				if((e instanceof AjaxError) && e.code === 404) { // Check for 404 error twice
					if(last404) {
						Thread.removeSavedData(b, num); // Doesn't work. Not done now.
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
				f.err = titleEl.title = getErrorMessage(e);
				isUpdate = true;
				continue;
			}
			if(aib.qClosed && $q(aib.qClosed, form)) { // Check for closed thread
				iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-closed');
				titleEl.title = Lng.thrClosed[lang];
				f.err = 'Closed';
				isUpdate = true;
			} else if(isArchived) { // Moves archived threads into b/arch (iichan only)
				iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-closed');
				titleEl.title = Lng.thrArchived[lang];
				f.err = 'Archived';
				const bArch = b + '/arch';
				if(!fav[host][bArch]) {
					fav[host][bArch] = { url: fav[host][b].url + 'arch/' };
				}
				fav[host][bArch][num] = Object.assign({}, f);
				removeFavoriteEntry(fav, host, b, num);
				isUpdate = true;
			} else {
				// Thread is available and not closed
				iconEl.setAttribute('class', 'de-fav-inf-icon');
				titleEl.removeAttribute('title');
				if(f.err) { // Cancel error status if existed
					delete f.err;
					isUpdate = true;
				}
			}
			// Updating a counter of new posts
			const posts = $Q(aib.qRPost, form);
			const cnt = posts.length + 1 - f.cnt;
			countEl.textContent = cnt;
			if(cnt === 0) {
				$hide(countEl); // Hide counter if no new posts
				$hide(youEl);
			} else {
				$show(countEl);
				f.new = cnt;
				isUpdate = true;
				// Check for replies to my posts
				if(myposts && myposts[b]) {
					f.you = 0;
					for(let j = 0; j < cnt; ++j) {
						const links = $Q(aib.qPostMsg + ' a', posts[posts.length - 1 - j]);
						for(let a = 0, len = links.length; a < len; ++a) {
							const tc = links[a].textContent;
							if(tc[0] === '>' && tc[1] === '>' && myposts[b][tc.substr(2)]) {
								f.you++;
							}
						}
					}
					if(f.you) {
						youEl.textContent = f.you;
						$show(youEl);
					}
				}
			}
		}
		AjaxCache.clear();
		if(isUpdate) {
			setStored('DESU_Favorites', JSON.stringify(fav));
		}
	}));

	// "Page" button. Shows on which page every thread is existed.
	div.appendChild($btn(Lng.page[lang], Lng.infoPage[lang], async function() {
		const els = $Q('.de-fav-current > .de-fav-entries > .de-entry');
		const len = els.length;
		const thrInfo = [];
		if(!len) { // Cancel if no existed entries
			return;
		}
		$popup('load-pages', Lng.loading[lang], true);
		// Create indexed array of entries and "waiting" SVG icon for each entry
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
		const endPage = (aib.lastPage || 10) + 1; // Check up to 10 page, if we don't know
		let infoLoaded = 0;
		for(let page = 0; page < endPage; ++page) {
			let tNums;
			try {
				const form = await ajaxLoad(aib.getPageUrl(aib.b, page));
				tNums = new Set(Array.from(DelForm.getThreads(form), thrEl => aib.getTNum(thrEl)));
			} catch(e) {
				continue;
			}
			// Search for threads on current page
			for(let i = 0; i < len; ++i) {
				const pInfo = thrInfo[i];
				if(tNums.has(pInfo.num)) { // Check for matched thread numbers
					// Restore old icon and title status
					pInfo.iconEl.setAttribute('class', pInfo.iconClass);
					if(pInfo.iconTitle) {
						pInfo.titleEl.setAttribute('title', pInfo.iconTitle);
					} else {
						pInfo.titleEl.removeAttribute('title');
					}
					pInfo.pageEl.textContent = '@' + page; // Shows page counter for current entry
					pInfo.found = true;
					infoLoaded++;
				}
			}
			if(infoLoaded === len) { // Stop pages loading when all favorite threads checked
				break;
			}
		}
		// Process missed threads that not found
		for(let i = 0; i < len; ++i) {
			const { found, pageEl, iconClass, iconEl, iconTitle, titleEl } = thrInfo[i];
			if(!found) {
				// Restore old icon and title status
				iconEl.setAttribute('class', iconClass);
				if(iconTitle) {
					titleEl.setAttribute('title', iconTitle);
				} else {
					titleEl.removeAttribute('title');
				}
				pageEl.textContent = '@?'; // Indicates that thread not found
			}
		}
		closePopup('load-pages');
	}));

	// "Clear" button. Allows to clear 404'd threads.
	div.appendChild($btn(Lng.clear[lang], Lng.clrDeleted[lang], async function() {
		// Sequentially load threads, and remove inaccessible
		let last404 = false;
		const els = $Q('.de-entry'), len = els.length;
		for(let i = 0; i < len; ++i) {
			const el = els[i];
			const iconEl = $q('.de-fav-inf-icon', el);
			const titleEl = iconEl.parentNode;
			iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-wait');
			titleEl.title = Lng.updating[lang];
			try {
				await $ajax(el.getAttribute('de-url'), null, false);
				iconEl.setAttribute('class', 'de-fav-inf-icon');
				titleEl.removeAttribute('title');
			} catch(e) {
				if(e.code === 404) { // Check for 404 error twice
					if(last404) {
						Thread.removeSavedData(el.getAttribute('de-board'), // Doesn't work. Not done now.
							+el.getAttribute('de-num'));
						el.setAttribute('de-removed', ''); // Mark an entry as deleted
					} else {
						last404 = true;
						--i; // Repeat this cycle again
						continue;
					}
				}
				iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-unavail');
				titleEl.title = getErrorMessage(e);
			}
			last404 = false;
		}
		cleanFavorites(); // Delete marked entries
	}));

	// "Deleting…" button. Hides all control buttons, shows "Apply" and "Cancel" buttons
	div.appendChild($btn(Lng.deletion[lang], Lng.delEntries[lang], () => body.classList.add('de-fav-del')));
	div = $bEnd(body, '<div id="de-fav-delbuttons"></div>');

	// "Apply" button, depends to "Deleting…"
	div.appendChild($btn(Lng.apply[lang], Lng.delEntries[lang], () => {
		$each($Q('.de-entry > input[type="checkbox"]', body), el => { // Mark checked entries as deleted
			if(el.checked) {
				el.parentNode.setAttribute('de-removed', '');
			}
		});
		cleanFavorites(); // Delete marked entries
		body.classList.remove('de-fav-del'); // Show all control buttons
	}));

	// "Cancel" button, depends to "Deleting…"
	div.appendChild($btn(Lng.cancel[lang], '', () => {
		$each($Q('input[type="checkbox"]', body), el => (el.checked = false)); // Unselect all checkboxes
		body.classList.remove('de-fav-del'); // Show all control buttons
	}));
}

/* ==[ WindowSettings.js ]====================================================================================
                                               WINDOW: SETTINGS
=========================================================================================================== */

const CfgWindow = {
	init(body) {
		body.addEventListener('click', this);
		body.addEventListener('mouseover', this);
		body.addEventListener('mouseout', this);
		body.addEventListener('change', this);
		body.addEventListener('keyup', this);
		body.addEventListener('keydown', this);
		body.addEventListener('scroll', this);

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

		// "Edit" button. Calls a popup with editor to edit Settings in JSON.
		div.appendChild(getEditButton('cfg', fn => fn(Cfg, true, data => {
			saveCfgObj(aib.dm, data);
			window.location.reload();
		})));

		// "Global" button. Allows to save/load global settings.
		nav.isGlobal && div.appendChild($btn(Lng.global[lang], Lng.globalCfg[lang], function() {
			const el = $popup('cfg-global', `<b>${ Lng.globalCfg[lang] }:</b>`);
			// "Load" button. Applies global settings for current domain.
			$bEnd(el, `<div id="de-list"><input type="button" value="${
				Lng.load[lang] }"> ${ Lng.loadGlobal[lang] }</div>`
			).firstElementChild.onclick = () => getStoredObj('DESU_Config').then(data => {
				if(data && ('global' in data) && !$isEmpty(data.global)) {
					saveCfgObj(aib.dm, data.global);
					window.location.reload();
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
		}));

		// "File" button. Allows to save and load settings/favorites/hidden/etc from file.
		!nav.Presto && div.appendChild($btn(Lng.file[lang], Lng.fileImpExp[lang], () => {
			// Create popup with controls
			$popup('cfg-file', `<b>${ Lng.fileImpExp[lang] }:</b><hr>` +
				`<div class="de-list">${ Lng.fileToData[lang] }:<div class="de-cfg-depend">` +
					'<input type="file" accept=".json" id="de-import-file"></div></div><hr>' +
				'<div class="de-list"><a id="de-export-file" href="#">' +
					Lng.dataToFile[lang] + ':<div class="de-cfg-depend">' + this._getList([
					Lng.panelBtn.cfg[lang] + ' ' + Lng.allDomains[lang],
					Lng.panelBtn.fav[lang],
					Lng.hidPostThr[lang] + ` (${ aib.dm })`,
					Lng.myPosts[lang] + ` (${ aib.dm })`
				]) + '</div></div>');

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
					} catch(e) {
						$popup('err-invaliddata', Lng.invalidData[lang]);
						return;
					}
					const cfgObj = obj.settings;
					const favObj = obj.favorites;
					const dmObj = obj[aib.dm];
					const isOldCfg = !cfgObj && !favObj && !dmObj;
					if(isOldCfg) {
						setStored('DESU_Config', data);
					}
					if(cfgObj) {
						try {
							setStored('DESU_Config', JSON.stringify(cfgObj));
							setStored('DESU_keys', JSON.stringify(obj.hotkeys));
							setStored('DESU_Exclude', obj.exclude);
						} catch(e) {}
					}
					if(favObj) {
						saveFavorites(favObj);
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
						window.location.reload();
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
				const name = [], nameDm = [], d = new Date();
				let val = [], valDm = [];
				for(let i = 0, len = els.length; i < len; ++i) {
					if(!els[i].checked) {
						continue;
					}
					switch(i) {
					case 0: name.push('Cfg'); {
						const cfgData = await Promise.all([
							getStored('DESU_Config'),
							getStored('DESU_keys'),
							getStored('DESU_Exclude')
						]);
						val.push(`"settings":${ cfgData[0] }`,
							`"hotkeys":${ cfgData[1] || '""' }`,
							`"exclude":"${ cfgData[2] || '' }"`);
						break;
					}
					case 1: name.push('Fav');
						val.push(`"favorites":${ (await getStored('DESU_Favorites')) || '{}' }`);
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
				$pd(e);
			}, true);
		}));

		// "Clear" button. Allows to clear settings/favorites/hidden/etc optionally.
		div.appendChild($btn(Lng.reset[lang] + '…', Lng.resetCfg[lang], () => $popup(
			'cfg-reset',
			`<b>${ Lng.resetData[lang] }:</b><hr>` +
			`<div class="de-list"><b>${ aib.dm }:</b>${
				this._getList([Lng.panelBtn.cfg[lang], Lng.hidPostThr[lang], Lng.myPosts[lang]])
			}</div><hr>` +
			`<div class="de-list"><b>${ Lng.allDomains[lang] }:</b>${
				this._getList([Lng.panelBtn.cfg[lang], Lng.panelBtn.fav[lang]])
			}</div><hr>`
		).appendChild($btn(Lng.clear[lang], '', ({ target }) => {
			const els = $Q('input[type="checkbox"]', target.parentNode);
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
				delStored('DESU_Exclude');
			} else if(els[0].checked) {
				getStoredObj('DESU_Config').then(data => {
					delete data[aib.dm];
					setStored('DESU_Config', JSON.stringify(data));
					$popup('cfg-reset', Lng.updating[lang], true);
					window.location.reload();
				});
				return;
			}
			$popup('cfg-reset', Lng.updating[lang], true);
			window.location.reload();
		}))));
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
				Panel.remove();
				if(pr.form) {
					pr.addMarkupPanel();
					pr.setPlaceholders();
					pr.updateLanguage();
					if(pr.files) {
						$each($Q('.de-file-img, .de-file-txt-input', pr.form),
							el => (el.title = Lng.youCanDrag[lang]));
					}
				}
				this._updateCSS();
				Panel.init(DelForm.first.el);
				toggleWindow('cfg', false);
				break;
			case 'delHiddPost': {
				const isHide = Cfg.delHiddPost === 1 || Cfg.delHiddPost === 2;
				for(let post = Thread.first.op; post; post = post.next) {
					if(post.hidden && !post.isOp) {
						if(isHide) {
							post.wrap.classList.add('de-hidden');
						} else {
							post.wrap.classList.remove('de-hidden');
						}
					}
				}
				updateCSS();
				break;
			}
			case 'postBtnsCSS':
				updateCSS();
				if(nav.Presto) {
					$del($q('.de-svg-icons'));
					addSVGIcons();
				}
				break;
			case 'noSpoilers': updateCSS(); break;
			case 'expandImgs':
				updateCSS();
				if(Attachment.viewer) {
					Attachment.viewer.close();
				}
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
			case 'addTextBtns': pr.addMarkupPanel(); break;
			case 'scriptStyle': this._updateCSS();
			}
			return;
		}
		if(type === 'click' && tag === 'INPUT' && el.type === 'checkbox') {
			const info = el.getAttribute('info');
			toggleCfg(info);
			this._updateDependant();
			switch(info) {
			case 'expandTrunc':
			case 'updThrBtns':
			case 'showHideBtn':
			case 'showRepBtn':
			case 'noPostNames':
			case 'widePosts':
			case 'imgNavBtns':
			case 'resizeImgs':
			case 'strikeHidd':
			case 'removeHidd':
			case 'noBoardRule':
			case 'panelCounter':
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
						post.ref.unhide();
					} else if(post.hidden) {
						post.ref.hide();
					}
				}
				break;
			case 'ajaxUpdThr':
				if(aib.t) {
					if(Cfg.ajaxUpdThr) {
						updater.enable();
					} else {
						updater.disable();
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
				if(!Cfg.markMyPosts && !Cfg.markMyLinks) {
					locStorage.removeItem('de-myposts');
					MyPosts.purge();
				}
				updateCSS();
				break;
			case 'correctTime': DateTime.toggleSettings(); break;
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
						processImagesLinks(el, 1, 0);
					}
				} else {
					$each($Q('.de-btn-src'), el => el.remove());
				}
				break;
			case 'delImgNames':
				if(Cfg.delImgNames) {
					for(const { el } of DelForm) {
						processImagesLinks(el, 0, 1);
					}
				} else {
					$each($Q('.de-img-name'), link => {
						link.classList.remove('de-img-name');
						link.textContent = link.title;
						link.removeAttribute('title');
					});
				}
				updateCSS();
				break;
			case 'markMyLinks':
				if(!Cfg.markMyPosts && !Cfg.markMyLinks) {
					locStorage.removeItem('de-myposts');
					MyPosts.purge();
				}
				updateCSS();
				break;
			case 'addSageBtn':
				PostForm.hideField($parent(pr.mail, 'LABEL') || pr.mail);
				updateCSS();
				break;
			case 'txtBtnsLoc': pr.addMarkupPanel(); break;
			case 'userName': PostForm.setUserName(); break;
			case 'noPassword': $toggle($parent(pr.passw, 'TR')); break;
			case 'noName': PostForm.hideField(pr.name); break;
			case 'noSubj': PostForm.hideField(pr.subj); break;
			case 'inftyScroll': toggleInfinityScroll(); break;
			case 'hotKeys':
				if(Cfg.hotKeys) {
					HotKeys.enable();
				} else {
					HotKeys.disable();
				}
				break;
			case 'turnOff': getStoredObj('DESU_Config').then(data => {
				for(const dm in data) {
					if(dm !== aib.dm && dm !== 'global' && dm !== 'lastUpd') {
						data[dm].disabled = Cfg.turnOff;
					}
				}
				data[aib.dm].turnOff = Cfg.turnOff;
				setStored('DESU_Config', JSON.stringify(data));
			});
			}
			return;
		}
		if(type === 'click' && tag === 'INPUT' && el.type === 'button') {
			switch(el.id) {
			case 'de-cfg-btn-pass':
				$q('input[info="passwValue"]').value = Math.round(Math.random() * 1e15).toString(32);
				PostForm.setUserPassw();
				break;
			case 'de-cfg-btn-keys':
				$pd(e);
				if($id('de-popup-edit-hotkeys')) {
					return;
				}
				Promise.resolve(HotKeys.readKeys()).then(keys => {
					const temp = KeyEditListener.getEditMarkup(keys);
					const el = $popup('edit-hotkeys', temp[1]);
					const fn = new KeyEditListener(el, keys, temp[0]);
					el.addEventListener('focus', fn, true);
					el.addEventListener('blur', fn, true);
					el.addEventListener('click', fn, true);
					el.addEventListener('keydown', fn, true);
					el.addEventListener('keyup', fn, true);
				});
				break;
			case 'de-cfg-btn-updnow':
				$popup('updavail', Lng.loading[lang], true);
				getStoredObj('DESU_Config')
					.then(data => checkForUpdates(true, data.lastUpd))
					.then(html => $popup('updavail', html), emptyFn);
				break;
			case 'de-cfg-btn-debug':
				$popup('cfg-debug', Lng.infoDebug[lang] + ':<textarea readonly class="de-editor"></textarea>'
				).firstElementChild.value = JSON.stringify({
					version  : version + '.' + commit,
					location : String(window.location),
					nav,
					Cfg,
					sSpells  : Spells.list.split('\n'),
					oSpells  : sesStorage[`de-spells-${ aib.b }${ aib.t || '' }`],
					perf     : Logger.getData(true)
				}, function(key, value) {
					switch(key) {
					case 'stats':
					case 'nameValue':
					case 'passwValue':
					case 'ytApiKey': return void 0;
					}
					return key in defaultCfg && value === defaultCfg[key] ? void 0 : value;
				}, '\t');
			}
		}
		if(type === 'keyup' && tag === 'INPUT' && el.type === 'text') {
			const info = el.getAttribute('info');
			switch(info) {
			case 'postBtnsBack':
				if(checkCSSColor(el.value)) {
					el.classList.remove('de-error-input');
					saveCfg('postBtnsBack', el.value);
					updateCSS();
				} else {
					el.classList.add('de-error-input');
				}
				break;
			case 'minImgSize': saveCfg('minImgSize', Math.max(+el.value, 1)); break;
			case 'zoomFactor': saveCfg('zoomFactor', Math.min(Math.max(+el.value, 1), 100)); break;
			case 'webmVolume': {
				const val = Math.min(+el.value || 0, 100);
				saveCfg('webmVolume', val);
				locStorage['__de-webmvolume'] = val;
				locStorage.removeItem('__de-webmvolume');
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
			case 'excludeList': setStored('DESU_Exclude', (excludeList = el.value)); break;
			default: saveCfg(info, el.value);
			}
			return;
		}
		if(tag === 'A') {
			if(el.id === 'de-btn-spell-add') {
				switch(e.type) {
				case 'click': $pd(e); break;
				case 'mouseover': el.odelay = setTimeout(() => addMenu(el), Cfg.linksOver); break;
				case 'mouseout': clearTimeout(el.odelay);
				}
				return;
			}
			if(type === 'click') {
				switch(el.id) {
				case 'de-btn-spell-apply':
					$pd(e);
					saveCfg('hideBySpell', 1);
					$q('input[info="hideBySpell"]').checked = true;
					Spells.toggle();
					break;
				case 'de-btn-spell-clear':
					$pd(e);
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
				$after($q('input[info="userCSS"]').parentNode, getEditButton(
					'css',
					fn => fn(Cfg.userCSSTxt, false, function() {
						saveCfg('userCSSTxt', this.value);
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
					el.value = info !== 'excludeList' ? Cfg[info] : excludeList;
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
			${ this._getBox('menuHiddBtn') }<br>
			${ this._getBox('hideRefPsts') }<br>
			${ this._getSel('delHiddPost') }
		</div>`;
	},

	// "Posts" tab
	_getCfgPosts() {
		return `<div id="de-cfg-posts" class="de-cfg-unvis">
			${ localData ? '' : `${ this._getBox('ajaxUpdThr') }
				${ this._getInp('updThrDelay') }
				<div class="de-cfg-depend">
					${ this._getBox('updCount') }<br>
					${ this._getBox('favIcoBlink') }<br>
					${ 'Notification' in window ? this._getBox('desktNotif') + '<br>' : '' }
					${ this._getBox('noErrInTitle') }<br>
					${ this._getBox('markNewPosts') }<br>
					${ aib.dobr ? this._getBox('useDobrAPI') : '' }
				</div>` }
			${ aib.jsonSubmit || aib.fch ? this._getBox('markMyPosts') + '<br>' : '' }
			${ this._getBox('hideReplies') }<br>
			${ this._getBox('expandTrunc') }<br>
			${ this._getBox('updThrBtns') }<br>
			${ this._getBox('showHideBtn') }
			${ this._getBox('showRepBtn') }<br>
			${ this._getSel('postBtnsCSS') }
			${ this._getInp('postBtnsBack', false, 8) }<br>
			${ this._getSel('noSpoilers') }<br>
			${ this._getBox('noPostNames') }<br>
			${ this._getBox('widePosts') }<br>
			${ this._getBox('correctTime') }
			${ this._getInp('timeOffset') }
			<a class="de-abtn" target="_blank" href="${ gitWiki }Settings-time-` +
				`${ lang ? 'en' : 'ru' }">[?]</a>
			<div class="de-cfg-depend">
				${ this._getInp('timePattern', true, 24) }<br>
				${ this._getInp('timeRPattern', true, 24) }
			</div>
		</div>`;
	},

	// "Images" tab
	_getCfgImages() {
		return `<div id="de-cfg-images" class="de-cfg-unvis">
			${ this._getSel('expandImgs') }<br>
			<div class="de-cfg-depend">
				${ this._getBox('imgNavBtns') }<br>
				${ this._getBox('imgInfoLink') }<br>
				${ this._getBox('resizeImgs') }<br>
				${ Post.sizing.dPxRatio > 1 ? this._getBox('resizeDPI') + '<br>' : '' }
				${ this._getInp('minImgSize') }<br>
				${ this._getInp('zoomFactor') }<br>
				${ this._getBox('webmControl') }<br>
				${ this._getBox('webmTitles') }<br>
				${ this._getInp('webmVolume') }<br>
				${ this._getInp('minWebmWidth') }
			</div>
			${ nav.Presto ? '' : this._getBox('preLoadImgs') + '<br>' }
			${ nav.Presto || aib.fch ? '' : `<div class="de-cfg-depend">
				${ this._getBox('findImgFile') }
			</div>` }
			${ this._getSel('openImgs') }<br>
			${ this._getBox('imgSrcBtns') }<br>
			${ this._getBox('delImgNames') }<br>
			${ this._getInp('maskVisib') }
		</div>`;
	},

	// "Links" tab
	_getCfgLinks() {
		return `<div id="de-cfg-links" class="de-cfg-unvis">
			${ this._getBox('linksNavig') }
			<div class="de-cfg-depend">
				${ this._getInp('linksOver') }
				${ this._getInp('linksOut') }<br>
				${ this._getBox('markViewed') }<br>
				${ this._getBox('strikeHidd') }
				<div class="de-cfg-depend">${ this._getBox('removeHidd') }</div>
				${ this._getBox('noNavigHidd') }
			</div>
			${ aib.jsonSubmit || aib.fch ? this._getBox('markMyLinks') + '<br>' : '' }
			${ this._getBox('crossLinks') }<br>
			${ this._getBox('decodeLinks') }<br>
			${ this._getBox('insertNum') }<br>
			${ this._getBox('addOPLink') }<br>
			${ this._getBox('addImgs') }<br>
			<div>
				${ this._getBox('addMP3') }
				${ aib.prot === 'http:' ? this._getBox('addVocaroo') : '' }
			</div>
			${ this._getSel('addYouTube') }
			<div class="de-cfg-depend">
				${ this._getSel('YTubeType') }
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
			${ pr.form ? `<div class="de-cfg-depend">
				${ this._getBox('postSameImg') }<br>
				${ this._getBox('removeEXIF') }
				${ this._getBox('removeFName') }<br>
				${ this._getBox('sendErrNotif') }<br>
				${ this._getBox('scrAfterRep') }<br>
				${ pr.files && !nav.Presto ? this._getSel('fileInputs') : '' }
			</div>` : '' }
			${ pr.form ? this._getSel('addPostForm') + '<br>' : '' }
			${ pr.txta ? this._getBox('spacedQuote') + '<br>' : '' }
			${ this._getBox('favOnReply') }<br>
			${ pr.subj ? this._getBox('warnSubjTrip') + '<br>' : '' }
			${ pr.mail ? `${ this._getBox('addSageBtn') }
				${ this._getBox('saveSage') }<br>` : '' }
			${ pr.cap ? `${ aib.fch ? `${ this._getBox('cap4chanAlt') }<br>` : '' }
				${ this._getInp('capUpdTime') }<br>
				${ this._getSel('captchaLang') }<br>` : '' }
			${ pr.txta ? `${ this._getSel('addTextBtns') }
				${ this._getBox('txtBtnsLoc') }<br>` : '' }
			${ pr.passw ? `${ this._getInp('passwValue', true, 9) }<input type="button" id="de-cfg-btn-pass` +
				`" class="de-cfg-button" value="${ Lng.change[lang] }"><br>` : '' }
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
			${ this._getSel('panelCounter') }<br>
			${ this._getBox('rePageTitle') }<br>
			${ 'animation' in docBody.style ? this._getBox('animation') + '<br>' : '' }
			${ this._getBox('closePopups') }<br>
			${ this._getBox('inftyScroll') }<br>
			${ this._getBox('scrollToTop') }<br>
			${ this._getBox('hotKeys') }
			<input type="button" id="de-cfg-btn-keys" class="de-cfg-button" value="${ Lng.edit[lang] }">
			<div class="de-cfg-depend">${ this._getInp('loadPages') }</div>
			${ !nav.isChromeStorage && !nav.Presto || nav.hasGMXHR ? `${ this._getBox('updScript') }
				<div class="de-cfg-depend">
					${ this._getSel('scrUpdIntrv') }
					<input type="button" id="de-cfg-btn-updnow" class="de-cfg-button" value="` +
						`${ Lng.checkNow[lang] }">
				</div>` : '' }
			${ nav.isGlobal ? `${ Lng.cfg.excludeList[lang] }
				<input type="text" info="excludeList" class="de-cfg-inptxt" style="display: block;` +
				` width: 80%;" placeholder="4chan.org, 8ch.net, …">${ this._getBox('turnOff') }` : '' }
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
					`${ nav.isESNext ? '.es6' : '' }</a>&nbsp;|&nbsp;
				<a href="http://www.freedollchan.org/scripts/" target="_blank">Freedollchan</a>&nbsp;|&nbsp;
				<a href="${ gitWiki }${ lang ? 'home-en/' : '' }" target="_blank">Github</a>
			</div>
			<div id="de-info-table">
				<div id="de-info-stats">${ statsTable }</div>
				<div id="de-info-log">${ this._getInfoTable(Logger.getData(false), true) }</div>
			</div>
			<input type="button" id="de-cfg-btn-debug" value="` +
				`${ Lng.debug[lang] }" title="${ Lng.infoDebug[lang] }">
		</div>`;
	},

	// Creates a label with checkbox for option switching
	_getBox(id) {
		return `<label class="de-cfg-label">
			<input class="de-cfg-chkbox" info="${ id }" type="checkbox"> ${ Lng.cfg[id][lang] }
		</label>`;
	},
	// Creates a table for Info tab
	_getInfoTable(data, needMs) {
		return data.map(data => `<div class="de-info-row">
			<span class="de-info-name">${ data[0] }</span>
			<span>${ data[1] + (needMs ? 'ms' : '') }</span>
		</div>`).join('');
	},
	// Creates a text input for text option values
	_getInp(id, addText = true, size = 2) {
		return `<label class="de-cfg-label">
			<input class="de-cfg-inptxt" info="${ id }" type="text" size="${ size }" value="` +
				`${ escapeHTML(Cfg[id]) }">${ addText && Lng.cfg[id] ? Lng.cfg[id][lang] : '' }</label>`;
	},
	// Creates a menu with a list of checkboxes. Uses for popup window.
	_getList(a) {
		return $join(a, '<label class="de-block"><input type="checkbox"> ', '</label>');
	},
	// Creates a select for multiple option values
	_getSel(id) {
		const x = Lng.cfg[id];
		const opt = [];
		for(let i = 0, len = x.sel[lang].length; i < len; ++i) {
			opt.push('<option value="', i, '">', x.sel[lang][i], '</option>');
		}
		return `<label class="de-cfg-label">
			<select class="de-cfg-select" info="${ id }">${ opt.join('') }</select> ${ x.txt[lang] }
		</label>`;
	},
	// Creates a tab for tab bar
	_getTab(name) {
		return `<div class="${ aib.cReply } de-cfg-tab" info="${ name }">${ Lng.cfgTab[name][lang] }</div>`;
	},
	// Switching dependent checkboxes according to their parents
	_toggleBox(state, arr) {
		let i = arr.length;
		const nState = !state;
		while(i--) {
			($q(arr[i]) || {}).disabled = nState;
		}
	},
	_updateCSS() {
		$each($Q('#de-css, #de-css-dynamic, #de-css-user', doc.head), $del);
		scriptCSS();
	},
	_updateDependant() {
		this._toggleBox(Cfg.ajaxUpdThr, [
			'input[info="updThrDelay"]', 'input[info="updCount"]', 'input[info="favIcoBlink"]',
			'input[info="markNewPosts"]', 'input[info="desktNotif"]', 'input[info="noErrInTitle"]'
		]);
		this._toggleBox(Cfg.postBtnsCSS === 2, ['input[info="postBtnsBack"]']);
		this._toggleBox(Cfg.expandImgs, [
			'input[info="imgNavBtns"]', 'input[info="imgInfoLink"]', 'input[info="resizeDPI"]',
			'input[info="resizeImgs"]', 'input[info="minImgSize"]', 'input[info="zoomFactor"]',
			'input[info="webmControl"]', 'input[info="webmTitles"]', 'input[info="webmVolume"]',
			'input[info="minWebmWidth"]'
		]);
		this._toggleBox(Cfg.preLoadImgs, ['input[info="findImgFile"]']);
		this._toggleBox(Cfg.linksNavig, [
			'input[info="linksOver"]', 'input[info="linksOut"]', 'input[info="markViewed"]',
			'input[info="strikeHidd"]', 'input[info="noNavigHidd"]'
		]);
		this._toggleBox(Cfg.strikeHidd && Cfg.linksNavig, ['input[info="removeHidd"]']);
		this._toggleBox(Cfg.addYouTube && Cfg.addYouTube !== 4, [
			'select[info="YTubeType"]', 'input[info="addVimeo"]'
		]);
		this._toggleBox(Cfg.addYouTube, [
			'input[info="YTubeWidth"]', 'input[info="YTubeHeigh"]', 'input[info="YTubeTitles"]',
			'input[info="ytApiKey"]'
		]);
		this._toggleBox(Cfg.YTubeTitles, ['input[info="ytApiKey"]']);
		this._toggleBox(Cfg.ajaxPosting, [
			'input[info="postSameImg"]', 'input[info="removeEXIF"]', 'input[info="removeFName"]',
			'input[info="sendErrNotif"]', 'input[info="scrAfterRep"]', 'select[info="fileInputs"]'
		]);
		this._toggleBox(Cfg.addTextBtns, ['input[info="txtBtnsLoc"]']);
		this._toggleBox(Cfg.updScript, ['select[info="scrUpdIntrv"]']);
		this._toggleBox(Cfg.hotKeys, ['input[info="loadPages"]']);
	},
	// Updates row counter in spells editor
	_updateRowMeter(node) {
		const top = node.scrollTop;
		const el = node.previousElementSibling;
		let num = el.numLines || 1;
		let i = 17;
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
		el = $id('de-wrapper-popup').appendChild($add(`
		<div class="${ aib.cReply } de-popup" id="de-popup-${ id }">
			<span class="de-popup-btn">${ buttonHTML }</span>
			<div class="de-popup-msg">${ txt.trim() }</div>
		</div>`));
		el.onclick = ({ target }) => {
			let el = fixEventEl(target);
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
	return $btn(Lng.edit[lang], Lng.editInTxt[lang], () => getDataFn(function(val, isJSON, saveFn) {
		// Create popup window with textarea.
		const el = $popup('edit-' + name,
			`<b>${ Lng.editor[name][lang] }</b><textarea class="de-editor"></textarea>`);
		const ta = el.lastChild;
		ta.value = isJSON ? JSON.stringify(val, null, '\t') : val;
		// "Save" button. If there a JSON data, parses and saves on success.
		el.appendChild($btn(Lng.save[lang], Lng.saveChanges[lang], !isJSON ? saveFn.bind(ta) : () => {
			let data;
			try {
				data = JSON.parse(ta.value.trim().replace(/[\n\r\t]/g, '') || '{}');
			} finally {
				if(!data) {
					$popup('err-invaliddata', Lng.invalidData[lang]);
					return;
				}
				saveFn(data);
				closePopup('edit-' + name);
				closePopup('err-invaliddata');
			}
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
		style.left = (isFixed ? 0 : window.pageXOffset) +
			(cr.left + w < Post.sizing.wWidth ? cr.left : cr.right - w) + 'px';
		style.top = (isFixed ? 0 : window.pageYOffset) +
			(cr.bottom + h < Post.sizing.wHeight ? cr.bottom - 0.5 : cr.top - h + 0.5) + 'px';
		style.removeProperty('visibility');
		this._clickFn = clickFn;
		this._el = el;
		this.parentEl = parentEl;
		el.addEventListener('mouseover', this, true);
		el.addEventListener('mouseout', this, true);
		el.addEventListener('click', this);
		parentEl.addEventListener('mouseout', this);
	}
	handleEvent(e) {
		let isOverEvent = false;
		switch(e.type) {
		case 'click':
			if(e.target.className === 'de-menu-item') {
				this.remove();
				this._clickFn(e.target);
				if(!Cfg.expandPanel && !$q('.de-win-active')) {
					$hide($id('de-panel-buttons'));
				}
			}
			break;
		case 'mouseover': isOverEvent = true;
			/* falls through */
		case 'mouseout': {
			clearTimeout(this._closeTO);
			let rt = fixEventEl(e.relatedTarget);
			rt = rt && rt.farthestViewportElement || rt;
			if(!rt || (rt !== this._el && !this._el.contains(rt))) {
				if(isOverEvent) {
					if(this.onover) {
						this.onover();
					}
				} else if(!rt || (rt !== this.parentEl && !this.parentEl.contains(rt))) {
					this._closeTO = setTimeout(() => this.remove(), 75);
					if(this.onout) {
						this.onout();
					}
				}
			}
		}
		}
	}
	remove() {
		if(!this._el) {
			return;
		}
		if(this.onremove) {
			this.onremove();
		}
		this._el.removeEventListener('mouseover', this, true);
		this._el.removeEventListener('mouseout', this, true);
		this.parentEl.removeEventListener('mouseout', this);
		this._el.removeEventListener('click', this);
		$del(this._el);
		this._el = null;
	}
}

function addMenu(el) {
	const fn = a => $join(a, '<span class="de-menu-item">', '</span>');
	switch(el.id) {
	case 'de-btn-spell-add':
		return new Menu(el, `<div style="display: inline-block; border-right: 1px solid grey;">${
			fn(('#words,#exp,#exph,#imgn,#ihash,#subj,#name,#trip,#img,#sage').split(','))
		}</div><div style="display: inline-block;">${
			fn(('#op,#tlen,#all,#video,#vauthor,#num,#wipe,#rep,#outrep,<br>').split(',')) }</div>`,
		function(el) {
			const exp = el.textContent;
			$txtInsert($id('de-spell-txt'), exp +
				(!aib.t || exp === '#op' || exp === '#rep' || exp === '#outrep' ? '' :
					`[${ aib.b },${ aib.t }]`) +
				(Spells.needArg[Spells.names.indexOf(exp.substr(1))] ? '(' : ''));
		});
	case 'de-panel-refresh':
		return new Menu(el, fn(Lng.selAjaxPages[lang]), function(el) {
			Pages.load(aProto.indexOf.call(el.parentNode.children, el) + 1);
		});
	case 'de-panel-savethr':
		return new Menu(el, fn($q(aib.qPostImg, DelForm.first.el) ?
			Lng.selSaveThr[lang] : [Lng.selSaveThr[lang][0]]),
		function(el) {
			if(!$id('de-popup-savethr')) {
				const imgOnly = !!aProto.indexOf.call(el.parentNode.children, el);
				if(Images_.preloading) {
					$popup('savethr', Lng.loading[lang], true);
					Images_.afterpreload = () => loadDocFiles(imgOnly);
					Images_.progressId = 'savethr';
				} else {
					loadDocFiles(imgOnly);
				}
			}
		});
	case 'de-panel-audio-off':
		return new Menu(el, fn(Lng.selAudioNotif[lang]), function(el) {
			const i = aProto.indexOf.call(el.parentNode.children, el);
			updater.enable();
			updater.toggleAudio(i === 0 ? 3e4 : i === 1 ? 6e4 : i === 2 ? 12e4 : 3e5);
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
	clear() {
		this.cPost = null;
		this.lastPageOffset = 0;
	},
	disable() {
		if(this.enabled) {
			this.enabled = false;
			if(this.cPost) {
				this.cPost.unselect();
			}
			this.clear();
			this.gKeys = this.ntKeys = this.tKeys = null;
			doc.removeEventListener('keydown', this, true);
		}
	},
	enable() {
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
	getDefaultKeys() {
		const globKeys = [
			/* One post/thread above      */ 0x004B /* = K          */,
			/* One post/thread below      */ 0x004A /* = J          */,
			/* Reply or create thread     */ 0x0052 /* = R          */,
			/* Hide selected thread/post  */ 0x0048 /* = H          */,
			/* Open previous page/picture */ 0x1025 /* = Ctrl+Left  */,
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
			/* Open next page/picture     */ 0x1027 /* = Ctrl+Right */,
			/* Open/close "Video"         */ 0x4056 /* = Alt+V      */
		];
		const nonThrKeys = [
			/* One post above */ 0x004D /* = M */,
			/* One post below */ 0x004E /* = N */,
			/* Open thread    */ 0x0056 /* = V */,
			/* Expand thread  */ 0x0045 /* = E */
		];
		const thrKeys = [
			/* Update thread  */ 0x0055 /* = U */
		];
		return [this.version, nav.isFirefox, globKeys, nonThrKeys, thrKeys];
	},
	handleEvent(e) {
		if(this._paused || e.metaKey) {
			return;
		}
		let idx;
		const isThr = aib.t;
		const tag = e.target.tagName;
		const kc = e.keyCode | (e.ctrlKey ? 0x1000 : 0) |
			(e.shiftKey ? 0x2000 : 0) | (e.altKey ? 0x4000 : 0) | (
				tag === 'TEXTAREA' || (tag === 'INPUT' &&
				(e.target.type === 'text' || e.target.type === 'password')) ? 0x8000 : 0);
		if(kc === 0x74 || kc === 0x8074) { // F5
			if(isThr || $id('de-popup-load-pages')) {
				return;
			}
			if(Attachment.viewer) {
				Attachment.viewer.close(null);
				Attachment.viewer = null;
			}
			Pages.load(+Cfg.loadPages);
		} else if(kc === 0x1B) { // ESC
			if(Attachment.viewer) {
				Attachment.viewer.close(null);
				Attachment.viewer = null;
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
			e.target.blur();
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
					post.setUserVisib(!post.hidden);
					this._scroll(post, false, post.isOp);
				}
				break;
			case 4: // Open previous page/picture
				if(Attachment.viewer) {
					Attachment.viewer.navigate(false);
				} else if(isThr || aib.page !== aib.firstPage) {
					window.location.pathname = aib.getPageUrl(aib.b, isThr ? 0 : aib.page - 1);
				}
				break;
			case 5: // Send post (txt)
				if(e.target !== pr.txta && e.target !== pr.cap.textEl) {
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
				if(e.target !== pr.txta) {
					return;
				}
				$id('de-btn-bold').click();
				break;
			case 13: // Italic text (txt)
				if(e.target !== pr.txta) {
					return;
				}
				$id('de-btn-italic').click();
				break;
			case 14: // Strike text (txt)
				if(e.target !== pr.txta) {
					return;
				}
				$id('de-btn-strike').click();
				break;
			case 15: // Spoiler text (txt)
				if(e.target !== pr.txta) {
					return;
				}
				$id('de-btn-spoil').click();
				break;
			case 16: // Code text (txt)
				if(e.target !== pr.txta) {
					return;
				}
				$id('de-btn-code').click();
				break;
			case 17: // Open next page/picture
				if(Attachment.viewer) {
					Attachment.viewer.navigate(true);
				} else if(!isThr) {
					const pageNum = DelForm.last.pageNum + 1;
					if(pageNum <= aib.lastPage) {
						window.location.pathname = aib.getPageUrl(aib.b, pageNum);
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
							window.open(aib.getThrUrl(aib.b, post.tNum), '_blank');
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
						scrollTo(window.pageXOffset, window.pageYOffset + post.top);
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
		e.stopPropagation();
		$pd(e);
	},
	pause() {
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
		} finally {
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
				const mapFunc = nav.isFirefox ? function mapFuncFF(key) {
					switch(key) {
					case 189: return 173;
					case 187: return 61;
					case 186: return 59;
					default: return key;
					}
				} : function mapFuncNonFF(key) {
					switch(key) {
					case 173: return 189;
					case 61: return 187;
					case 59: return 186;
					default: return key;
					}
				};
				keys[1] = nav.isFirefox;
				keys[2] = keys[2].map(mapFunc);
				keys[3] = keys[3].map(mapFunc);
				setStored('DESU_keys', JSON.stringify(keys));
			}
			return keys;
		}
	},
	resume(keys) {
		[,, this.gKeys, this.ntKeys, this.tKeys] = keys;
		this._paused = false;
	},

	_paused: false,
	_getNextVisPost(cPost, isOp, toUp) {
		if(isOp) {
			const thr = cPost ? toUp ? cPost.thr.prevNotHidden : cPost.thr.nextNotHidden :
				Thread.first.hidden ? Thread.first.nextNotHidden : Thread.first;
			return thr ? thr.op : null;
		}
		return cPost ? cPost.getAdjacentVisPost(toUp) : Thread.first.hidden ||
			Thread.first.op.hidden ? Thread.first.op.getAdjacentVisPost(toUp) : Thread.first.op;
	},
	_getFirstVisPost(getThread, getFull) {
		if(this.lastPageOffset !== window.pageYOffset) {
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
			this.lastPageOffset = window.pageYOffset;
		}
		return this.cPost;
	},
	_scroll(post, toUp, toThread) {
		const next = this._getNextVisPost(post, toThread, toUp);
		if(!next) {
			if(!aib.t) {
				const pageNum = toUp ? DelForm.first.pageNum - 1 : DelForm.last.pageNum + 1;
				if((toUp ? pageNum >= aib.firstPage : pageNum <= aib.lastPage)) {
					window.location.pathname = aib.getPageUrl(aib.b, pageNum);
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
			scrollTo(0, window.pageYOffset + next.el.getBoundingClientRect().top -
				Post.sizing.wHeight / 2 + next.el.clientHeight / 2);
		}
		this.lastPageOffset = window.pageYOffset;
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
						aInputs[i].classList.add('de-error-input');
						aInputs[j].classList.add('de-error-input');
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
		this.errCount = $Q('.de-error-input', popupEl).length;
		if(this.errCount !== 0) {
			this.saveButton.disabled = true;
		}
	}
	static getEditMarkup(keys) {
		const allKeys = [];
		return [allKeys, `${ Lng.hotKeyEdit[lang].join('')
			.replace(/%l/g, '<label class="de-block">')
			.replace(/%\/l/g, '</label>')
			.replace(/%i([2-4])([0-9]+)(t)?/g, function(all, id1, id2, isText) {
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
		let key, el = e.target;
		switch(e.type) {
		case 'blur':
			if(HotKeys.enabled && this.errCount === 0) {
				HotKeys.resume(this.keys);
			}
			this.cEl = null;
			return;
		case 'focus':
			if(HotKeys.enabled) {
				HotKeys.pause();
			}
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
			if(keyStr === undefined) {
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
			const isError = el.classList.contains('de-error-input');
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
						if(rEl.classList.contains('de-error-input')) {
							this.errCount--;
							rEl.classList.remove('de-error-input');
						}
					}
					if(rIdx === -1) {
						this.errCount--;
						el.classList.remove('de-error-input');
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
				if(!rEl.classList.contains('de-error-input')) {
					this.errCount++;
					rEl.classList.add('de-error-input');
				}
			}
			if(!isError) {
				this.errCount++;
				el.classList.add('de-error-input');
			}
			if(this.errCount !== 0) {
				this.saveButton.disabled = true;
			}
		}
		}
		$pd(e);
	}
}
// Browsers have different codes for these keys (see HotKeys.readKeys):
//     Firefox - '-' - 173, '=' - 61, ';' - 59
//     Chrome/Opera: '-' - 189, '=' - 187, ';' - 186
/* eslint-disable comma-spacing, comma-style, no-sparse-arrays */
KeyEditListener.keyCodes = [
	'',,,,,,,,'Backspace','Tab',,,,'Enter',,,'Shift','Ctrl','Alt',/* Pause/Break */,/* Caps Lock */,,,,,,,
	/* Esc */,,,,,'Space',/* PgUp */,/* PgDn */,/* End */,/* Home */,'←','↑','→','↓',,,,,/* Insert */,
	/* Del */,,'0','1','2','3','4','5','6','7','8','9',,';',,'=',,,,'A','B','C','D','E','F','G','H','I','J',
	'K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',/* Left WIN */,/* Right WIN */,
	/* Select */,,,'Num 0','Num 1','Num 2','Num 3','Num 4','Num 5','Num 6','Num 7','Num 8','Num 9','Num *',
	'Num +',,'Num -','Num .','Num /',/* F1 */,/* F2 */,/* F3 */,/* F4 */,/* F5 */,/* F6 */,/* F7 */,/* F8 */,
	/* F9 */,/* F10 */,/* F11 */,/* F12 */,,,,,,,,,,,,,,,,,,,,,/* Num Lock */,/* Scroll Lock */,,,,,,,,,,,,,,,
	,,,,,,,,,,,,,'-',,,,,,,,,,,,,';','=',',','-','.','/','`',,,,,,,,,,,,,,,,,,,,,,,,,,,'[','\\',']',"'"
];
/* eslint-enable comma-spacing, comma-style, no-sparse-arrays */

/* ==[ ContentLoad.js ]=======================================================================================
                                             CONTENT DOWNLOADING
                      images/webm preloading, rarjpeg detecting, thread/images downloading
=========================================================================================================== */

function detectImgFile(ab) {
	let i, j;
	const dat = new Uint8Array(ab);
	let len = dat.length;
	/* JPG [ff d8 ff e0] = [яШяа] */
	if(dat[0] === 0xFF && dat[1] === 0xD8) {
		for(i = 0, j = 0; i < len - 1; i++) {
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
		for(i = 0; i < len - 7; i++) {
			/* PNG end [49 45 4e 44 ae 42 60 82] */
			if(dat[i] === 0x49 && dat[i + 1] === 0x45 && dat[i + 2] === 0x4E && dat[i + 3] === 0x44) {
				i += 8;
				break;
			}
		}
	} else {
		return {};
	}
	/* Ignore small files */
	if(i !== len && len - i > 60) {
		for(len = i + 90; i < len; i++) {
			/* 7Z [37 7a bc af] = [7zјЇ] */
			if(dat[i] === 0x37 && dat[i + 1] === 0x7A && dat[i + 2] === 0xBC) {
				return { type: 0, idx: i, data: ab };
			/* ZIP [50 4b 03 04] = [PK..] */
			} else if(dat[i] === 0x50 && dat[i + 1] === 0x4B && dat[i + 2] === 0x03) {
				return { type: 1, idx: i, data: ab };
			/* RAR [52 61 72 21] = [Rar!] */
			} else if(dat[i] === 0x52 && dat[i + 1] === 0x61 && dat[i + 2] === 0x72) {
				return { type: 2, idx: i, data: ab };
			/* OGG [4f 67 67 53] = [OggS] */
			} else if(dat[i] === 0x4F && dat[i + 1] === 0x67 && dat[i + 2] === 0x67) {
				return { type: 3, idx: i, data: ab };
			/* MP3 [0x49 0x44 0x33] = [ID3] */
			} else if(dat[i] === 0x49 && dat[i + 1] === 0x44 && dat[i + 2] === 0x33) {
				return { type: 4, idx: i, data: ab };
			}
		}
	}
	return {};
}

function addImgFileIcon(nameLink, fName, info) {
	const { type } = info;
	if(typeof type === 'undefined') {
		return;
	}
	let app, ext;
	if(type === 2) {
		app = 'application/x-rar-compressed';
		ext = 'rar';
	} else if(type === 1) {
		app = 'application/zip';
		ext = 'zip';
	} else if(type === 0) {
		app = 'application/x-7z-compressed';
		ext = '7z';
	} else if(type === 3) {
		app = 'audio/ogg';
		ext = 'ogg';
	} else {
		app = 'audio/mpeg';
		ext = 'mp3';
	}
	nameLink.insertAdjacentHTML('afterend', `<a href="${ window.URL.createObjectURL(
		new Blob([nav.getUnsafeUint8Array(info.data, info.idx)], { type: app })
	) }" class="de-img-${ type > 2 ? 'audio' : 'arch' }" title="${ Lng.downloadFile[lang] }" download="${
		fName.substring(0, fName.lastIndexOf('.')) }.${ ext }">.${ ext }'</a>`);
}

function downloadImgData(url, repeatOnError = true) {
	return $ajax(url, {
		responseType     : 'arraybuffer',
		overrideMimeType : 'text/plain; charset=x-user-defined'
	}, url.startsWith('blob')).then(xhr => {
		if(xhr.status === 0 && xhr.responseType === 'arraybuffer') {
			return new Uint8Array(xhr.response);
		}
		if('response' in xhr) {
			try {
				return nav.getUnsafeUint8Array(xhr.response);
			} catch(e) {}
		}
		const txt = xhr.responseText;
		const rv = new Uint8Array(txt.length);
		for(let i = 0, len = txt.length; i < len; ++i) {
			rv[i] = txt.charCodeAt(i) & 0xFF;
		}
		return rv;
	}, err => err.code !== 404 && repeatOnError ? downloadImgData(url, false) : null);
}

function preloadImages(data) {
	if(!Cfg.preLoadImgs && !Cfg.openImgs && !isPreImg) {
		return;
	}
	let pool;
	const isPost = data instanceof AbstractPost;
	const els = $Q(aib.qPostImg, isPost ? data.el : data);
	const len = els.length;
	if(isPreImg || Cfg.preLoadImgs) {
		let cImg = 1;
		const mReqs = isPost ? 1 : 4;
		const rjf = (isPreImg || Cfg.findImgFile) && new WorkerPool(mReqs, detectImgFile,
			e => console.error('File detector error:', `line: ${ e.lineno } - ${ e.message }`));
		pool = new TasksPool(mReqs, (num, data) => downloadImgData(data[0]).then(imageData => {
			const [url, imgLink, iType, nExp, el] = data;
			if(imageData) {
				const fName = url.substring(url.lastIndexOf('/') + 1);
				const nameLink = $q(aib.qImgNameLink, aib.getImgWrap(el));
				imgLink.setAttribute('download', fName);
				nameLink.setAttribute('download', fName);
				nameLink.setAttribute('de-href', nameLink.href);
				imgLink.href = nameLink.href =
					window.URL.createObjectURL(new Blob([imageData], { type: iType }));
				if(iType === 'video/webm') {
					el.setAttribute('de-video', '');
				}
				if(nExp) {
					el.src = imgLink.href;
				}
				if(rjf) {
					rjf.run(imageData.buffer, [imageData.buffer],
						info => addImgFileIcon(nameLink, fName, info));
				}
			}
			if(Images_.progressId) {
				$popup(Images_.progressId, `${ Lng.loadImage[lang] }: ${ cImg }/${ len }`, true);
			}
			cImg++;
		}), function() {
			Images_.preloading = false;
			if(Images_.afterpreload) {
				Images_.afterpreload();
				Images_.afterpreload = Images_.progressId = null;
			}
			if(rjf) {
				rjf.clear();
			}
		});
		Images_.preloading = true;
	}
	for(let i = 0; i < len; ++i) {
		let el = els[i];
		const imgLink = $parent(el = els[i], 'A');
		if(!imgLink) {
			continue;
		}
		let nExp = !!Cfg.openImgs;
		const url = imgLink.href;
		const iType = getFileType(url);
		if(!iType) {
			continue;
		} else if(iType === 'image/gif') {
			nExp &= Cfg.openImgs !== 3;
		} else {
			if(iType === 'video/webm') {
				nExp = false;
			}
			nExp &= Cfg.openImgs !== 2;
		}
		if(pool) {
			pool.run([url, imgLink, iType, nExp, el]);
		} else if(nExp) {
			el.src = url; // !
		}
	}
	if(pool) {
		pool.complete();
	}
}

function getDataFromImg(el) {
	try {
		const cnv = Images_.canvas || (Images_.canvas = doc.createElement('canvas'));
		cnv.width = el.width;
		cnv.height = el.height;
		cnv.getContext('2d').drawImage(el, 0, 0);
		return Promise.resolve(new Uint8Array(atob(cnv.toDataURL('image/png').split(',')[1])
			.split('').map(a => a.charCodeAt())));
	} catch(e) {
		return downloadImgData(el.src);
	}
}

function loadDocFiles(imgOnly) {
	let progress, counter, count = 0,
		current = 1,
		warnings = '',
		tar = new TarBuilder();
	const dc = imgOnly ? doc : doc.documentElement.cloneNode(true);
	Images_.pool = new TasksPool(4, (num, data) => downloadImgData(data[0]).then(imgData => {
		const [url, fName, el, imgLink] = data;
		let safeName = fName.replace(/[\\/:*?"<>|]/g, '_');
		progress.value = counter.innerHTML = current++;
		if(imgLink) {
			let thumbName = safeName.replace(/\.[a-z]+$/, '.png');
			if(imgOnly) {
				thumbName = 'thumb-' + thumbName;
			} else {
				thumbName = 'thumbs/' + thumbName;
				safeName = imgData ? 'images/' + safeName : thumbName;
				imgLink.href = $q('a[de-href], ' + aib.qImgNameLink, aib.getImgWrap(el)).href = safeName;
			}
			if(imgData) {
				tar.addFile(safeName, imgData);
			} else {
				warnings += `<br>${ Lng.cantLoad[lang] } <a href="${ url }">${ url }</a>` +
					`<br>${ Lng.willSavePview[lang] }`;
				$popup('err-files', Lng.loadErrors[lang] + warnings);
				if(imgOnly) {
					return getDataFromImg(el).then(data => tar.addFile(thumbName, data), emptyFn);
				}
			}
			return imgOnly ? null : getDataFromImg(el).then(data => {
				el.src = thumbName;
				tar.addFile(thumbName, data);
			}, () => (el.src = safeName));
		} else if(imgData && imgData.length > 0) {
			tar.addFile(el.href = el.src = 'data/' + safeName, imgData);
		} else {
			$del(el);
		}
	}), function() {
		const docName = `${ aib.dm }-${ aib.b.replace(/[\\/:*?"<>|]/g, '') }-${ aib.t }`;
		if(!imgOnly) {
			$q('head', dc).insertAdjacentHTML('beforeend',
				'<script type="text/javascript" src="data/dollscript.js" charset="utf-8"></script>');
			$each($Q('#de-css, #de-css-dynamic, #de-css-user', dc), $del);
			let scriptStr;
			const localData = JSON.stringify({ dm: aib.dm, b: aib.b, t: aib.t });
			if(nav.isESNext) {
				scriptStr = `(${ String(deMainFuncInner) })(null, null, (x, y) => window.scrollTo(x, y), ${
					localData });`;
			} else {
				/* global deMainFuncOuter */
				scriptStr = `(${ String(deMainFuncOuter) })(${ localData });`;
			}
			tar.addString('data/dollscript.js', scriptStr);
			const dt = doc.doctype;
			tar.addString(docName + '.html', '<!DOCTYPE ' + dt.name +
				(dt.publicId ? ' PUBLIC "' + dt.publicId + '"' : dt.systemId ? ' SYSTEM' : '') +
				(dt.systemId ? ' "' + dt.systemId + '"' : '') + '>' + dc.outerHTML);
		}
		downloadBlob(tar.get(), docName + (imgOnly ? '-images.tar' : '.tar'));
		$del($id('de-popup-load-files'));
		Images_.pool = tar = warnings = count = current = imgOnly = progress = counter = null;
	});
	let els = [...$Q(aib.qPostImg, $q('[de-form]', dc))];
	count += els.length;
	els.forEach(function(el) {
		const imgLink = $parent(el, 'A');
		if(imgLink) {
			let url = imgLink.href;
			if(aib.tiny) {
				url = url.replace(/^.*?\?v=|&.*?$/g, '');
			}
			Images_.pool.run([url, imgLink.getAttribute('download') ||
				url.substring(url.lastIndexOf('/') + 1), el, imgLink]);
		}
	});
	if(!imgOnly) {
		$each($Q('#de-main, .de-parea, .de-post-btns, .de-btn-src, ' +
			'.de-refmap, .de-thread-buttons, .de-video-obj, #de-win-reply, ' +
			'link[rel="alternate stylesheet"], script, ' + aib.qForm, dc), $del);
		$each($Q('a', dc), function(el) {
			let num;
			const tc = el.textContent;
			if(tc[0] === '>' && tc[1] === '>' && (num = +tc.substr(2)) && pByNum.has(num)) {
				el.href = aib.anchor + num;
				if(!el.classList.contains('de-link-pref')) {
					el.className = 'de-link-pref ' + el.className;
				}
			} else {
				el.href = getAbsLink(el.href);
			}
		});
		$each($Q(aib.qRPost, dc), function(post, i) {
			post.setAttribute('de-num', i === 0 ? aib.t : aib.getPNum(post));
		});
		const files = [];
		const urlRegex = new RegExp(`^\\/\\/?|^https?:\\/\\/([^\\/]*\\.)?${
			quoteReg(aib.fch ? '4cdn.org' : aib.dm) }\\/`, 'i');
		$each($Q('link, *[src]', dc), function(el) {
			if(els.indexOf(el) !== -1) {
				return;
			}
			let url = el.tagName === 'LINK' ? el.href : el.src;
			if(!urlRegex.test(url)) {
				$del(el);
				return;
			}
			let fName = url.substring(url.lastIndexOf('/') + 1).replace(/[\\/:*?"<>|]/g, '_').toLowerCase();
			if(files.indexOf(fName) !== -1) {
				let temp = url.lastIndexOf('.');
				const ext = url.substring(temp);
				url = url.substring(0, temp);
				fName = fName.substring(0, fName.lastIndexOf('.'));
				for(let i = 0; ; ++i) {
					temp = `${ fName }(${ i })${ ext }`;
					if(files.indexOf(temp) === -1) {
						break;
					}
				}
				fName = temp;
			}
			files.push(fName);
			Images_.pool.run([url, fName, el, null]);
			count++;
		});
	}
	$popup('load-files', `${ imgOnly ? Lng.loadImage[lang] : Lng.loadFile[lang] }:<br>` +
		`<progress id="de-loadprogress" value="0" max="${ count }"></progress> <span>1</span>/${
			count }`, true);
	progress = $id('de-loadprogress');
	counter = progress.nextElementSibling;
	Images_.pool.complete();
	els = null;
}

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
		return new Function('dtime', `return '${
			rPattern.replace('_o', (this.diff < 0 ? '' : '+') + this.diff)
				.replace('_s', "' + this.pad2(dtime.getSeconds()) + '")
				.replace('_i', "' + this.pad2(dtime.getMinutes()) + '")
				.replace('_h', "' + this.pad2(dtime.getHours()) + '")
				.replace('_d', "' + this.pad2(dtime.getDate()) + '")
				.replace('_w', "' + this.arrW[dtime.getDay()] + '")
				.replace('_n', "' + this.pad2(dtime.getMonth() + 1) + '")
				.replace('_m', "' + this.arrM[dtime.getMonth()] + '")
				.replace('_M', "' + this.arrFM[dtime.getMonth()] + '")
				.replace('_y', "' + ('' + dtime.getFullYear()).substring(2) + '")
				.replace('_Y', "' + dtime.getFullYear() + '") }';`);
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
	static addPlayer(el, m, isYtube, enableJsapi = false) {
		let txt;
		if(isYtube) {
			const list = m[0].match(/list=[^&#]+/);
			txt = `<iframe class="de-video-player" src="https://www.youtube.com/embed/${ m[1] }?start=` +
				(m[2] ? m[2] * 3600 : 0) + (m[3] ? m[3] * 60 : 0) + (m[4] ? +m[4] : 0) +
				(enableJsapi ? '&enablejsapi=1' : Cfg.addYouTube === 3 ? '&autoplay=1' : '') +
				(list ? '&' + list[0] : '') + (Cfg.YTubeType === 1 ?
					'&html5=1" type="text/html"' : '" type="application/x-shockwave-flash"') +
				' frameborder="0" allowfullscreen="1"></iframe>';
		} else {
			const id = m[1] + (m[2] ? m[2] : '');
			txt = Cfg.YTubeType === 1 ?
				`<iframe class="de-video-player" src="${ aib.prot }//player.vimeo.com/video/${ id }${
					Cfg.addYouTube === 3 ? '?autoplay=1' : ''
				}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>` :
				'<embed class="de-video-player" type="application/x-shockwave-flash" src="' + aib.prot +
					'//vimeo.com/moogaloop.swf?clip_id=' + id + (Cfg.addYouTube === 3 ? '&autoplay=1' : '') +
					'&server=vimeo.com&color=00adef&fullscreen=1" ' +
					'allowscriptaccess="always" allowfullscreen="true"></embed>';
		}
		el.innerHTML = txt + (enableJsapi ? '' :
			`<span class="de-video-resizer" title="${ Lng.expandVideo[lang] }"></span>`);
		$show(el);
		if(!enableJsapi) {
			el.lastChild.onclick = ({ target }) => target.parentNode.classList.toggle('de-video-expanded');
		}
	}
	static setLinkData(link, [title, author, views, publ, duration]) {
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
			if(Cfg.addYouTube === 2) {
				this.addPlayer(m, isYtube);
			} else if(Cfg.addYouTube > 2) {
				this._addThumb(m, isYtube);
			}
		} else if(!link && $q(`.de-video-link[href*="${ m[1] }"]`, this.post.msg)) {
			return;
		}
		let dataObj;
		if(loader && (dataObj = Videos._global.vData[isYtube ? 0 : 1][m[1]])) {
			this.vData[isYtube ? 0 : 1].push(dataObj);
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
		if(loader && !dataObj) {
			loader.run([link, isYtube, this, m[1]]);
		}
	}
	addPlayer(m, isYtube) {
		this.playerInfo = m;
		Videos.addPlayer(this.player, m, isYtube);
	}
	clickLink(el, mode) {
		const m = el.videoInfo;
		if(this.playerInfo !== m) {
			this.currentLink.classList.remove('de-current');
			this.currentLink = el;
			if(mode > 2) {
				this._addThumb(m, el.classList.contains('de-ytube'));
			} else {
				el.classList.add('de-current');
				this.addPlayer(m, el.classList.contains('de-ytube'));
			}
			return;
		}
		if(mode === 3) {
			if($q('.de-video-thumb', this.player)) {
				el.classList.add('de-current');
				this.addPlayer(m, el.classList.contains('de-ytube'));
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
	updatePost(oldLinks, newLinks, cloned) {
		const loader = !cloned && Videos._getTitlesLoader();
		let j = 0;
		for(let i = 0, len = newLinks.length; i < len; ++i) {
			const el = newLinks[i];
			const link = oldLinks[j];
			if(link && link.classList.contains('de-current')) {
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
			loader.complete();
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
		return Cfg.YTubeTitles && new TasksPool(4, function(num, info) {
			const [, isYtube,, id] = info;
			if(isYtube) {
				if(Cfg.ytApiKey) {
					return Videos._getYTInfoAPI(info, num, id);
				} else {
					return Videos._getYTInfoOembed(info, num, id);
				}
			}
			return $ajax(`${ aib.prot }//vimeo.com/api/v2/video/${ id }.json`, null, false).then(xhr => {
				const entry = JSON.parse(xhr.responseText)[0];
				return Videos._titlesLoaderHelper(
					info, num,
					entry.title,
					entry.user_name,
					entry.stats_number_of_plays,
					(/(.*)\s(.*)?/.exec(entry.upload_date))[1],
					Videos._fixTime(entry.duration)[0]);
			}).catch(() => Videos._titlesLoaderHelper(info, num));
		}, () => (sesStorage['de-videos-data2'] = JSON.stringify(Videos._global.vData)));
	}
	static _getYTInfoAPI(info, num, id) {
		return $ajax(
			`https://www.googleapis.com/youtube/v3/videos?key=${ Cfg.ytApiKey }&id=${ id }` +
			'&part=snippet,statistics,contentDetails&fields=items/snippet/title,items/snippet/publishedAt,' +
			'items/snippet/channelTitle,items/statistics/viewCount,items/contentDetails/duration',
			null, false
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
		return (nav.hasGMXHR ?
			$ajax(`https://www.youtube.com/oembed?url=http%3A//youtube.com/watch%3Fv%3D${ id }&format=json`,
				null, false) :
			$ajax(`https://noembed.com/embed?url=http%3A//youtube.com/watch%3Fv%3D${ id }&callback=?`)
		).then(xhr => {
			const res = xhr.responseText;
			const json = JSON.parse(nav.hasGMXHR ? res : res.replace(/^[^{]+|\)$/g, ''));
			return Videos._titlesLoaderHelper(info, num, json.title, json.author_name, null, null, null);
		}).catch(() => Videos._titlesLoaderHelper(info, num));
	}
	static _titlesLoaderHelper([link, isYtube, videoObj, id], num, ...data) {
		if(data.length !== 0) {
			Videos.setLinkData(link, data);
			Videos._global.vData[isYtube ? 0 : 1][id] = data;
			videoObj.vData[isYtube ? 0 : 1].push(data);
			if(videoObj.titleLoadFn) {
				videoObj.titleLoadFn(data);
			}
		}
		videoObj.loadedLinksCount++;
		// Wait for 3 sec every 30 links
		if(num % 30 === 0) {
			return Promise.reject(new TasksPool.PauseError(3e3));
		}
		return sleep(250);
	}
	_addThumb(m, isYtube) {
		const el = this.player;
		this.playerInfo = m;
		$show(el);
		const str = `<a class="de-video-player" href="${ aib.prot }`;
		if(isYtube) {
			el.innerHTML = `${ str }//www.youtube.com/watch?v=${ m[1] }" target="_blank">` +
				`<img class="de-video-thumb de-ytube" src="https://i.ytimg.com/vi/${ m[1] }/0.jpg"></a>`;
			return;
		}
		el.innerHTML = `${ str }//vimeo.com/${ m[1] }" target="_blank">` +
			'<img class="de-video-thumb de-vimeo" src=""></a>';
		$ajax(`${ aib.prot }//vimeo.com/api/v2/video/${ m[1] }.json`, null, false).then(xhr => {
			try {
				el.firstChild.firstChild.setAttribute('src', JSON.parse(xhr.responseText)[0].thumbnail_large);
			} catch(e) {}
		});
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
			sesStorage.removeItem('de-videos-data1');
			value = Cfg.YTubeTitles ? JSON.parse(sesStorage['de-videos-data2'] || '[{}, {}]') : [{}, {}];
		} catch(e) {
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
	end() {
		if(this._loader) {
			this._loader.complete();
		}
	}
	parse(data) {
		const isPost = data instanceof AbstractPost;
		const loader = this._loader;
		let links = $Q('a[href*="youtu"]', isPost ? data.el : data);
		for(let i = 0, len = links.length; i < len; ++i) {
			const link = links[i];
			const m = link.href.match(Videos.ytReg);
			if(m) {
				const mPost = isPost ? data : aib.getPostOfEl(link);
				if(mPost) {
					mPost.videos.addLink(m, loader, link, true);
				}
			}
		}
		if(Cfg.addVimeo) {
			links = $Q('a[href*="vimeo.com"]', isPost ? data.el : data);
			for(let i = 0, len = links.length; i < len; ++i) {
				const link = links[i];
				const m = link.href.match(Videos.vimReg);
				if(m) {
					const mPost = isPost ? data : aib.getPostOfEl(link);
					if(mPost) {
						mPost.videos.addLink(m, loader, link, false);
					}
				}
			}
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
}

// Embed .mp3 and Vocaroo links
function embedMediaLinks(data) {
	const isPost = data instanceof AbstractPost;
	if(Cfg.addMP3) {
		const els = $Q('a[href*=".mp3"]', isPost ? data.el : data);
		for(let i = 0, len = els.length; i < len; ++i) {
			const link = els[i];
			if((link.target !== '_blank' && link.rel !== 'nofollow') || !link.pathname.includes('.mp3')) {
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
			if(!el || el.className !== 'de-vocaroo') { // Don't embed already embedded links
				link.insertAdjacentHTML('beforebegin', `<div class="de-vocaroo">
					<embed src="http://vocaroo.com/player.swf?playMediaID=${ link.href.split('/').pop() }` +
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
function $ajax(url, params = null, useNative = nativeXHRworks) {
	let resolve, reject, cancelFn;
	const needTO = params ? params.useTimeout : false;
	if(!useNative && nav.hasGMXHR) {
		let gmxhr;
		const toFunc = () => {
			reject(AjaxError.Timeout);
			try {
				gmxhr.abort();
			} catch(e) {}
		};
		let loadTO = needTO && setTimeout(toFunc, 5e3);
		const obj = {
			method : (params && params.method) || 'GET',
			url    : nav.fixLink(url),
			onreadystatechange(e) {
				if(needTO) {
					clearTimeout(loadTO);
				}
				if(e.readyState === 4) {
					if(e.status === 200 || aib.tiny && e.status === 400) {
						resolve(e);
					} else {
						reject(new AjaxError(e.status, e.statusText));
					}
				} else if(needTO) {
					loadTO = setTimeout(toFunc, 5e3);
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
		// TODO: GreaseMonkey 4.0alpha cannot cancel xhr's
		if(nav.isNewGM) {
			GM.xmlHttpRequest(obj);
			cancelFn = emptyFn;
		} else {
			gmxhr = GM_xmlhttpRequest(obj);
			cancelFn = () => {
				if(needTO) {
					clearTimeout(loadTO);
				}
				try {
					gmxhr.abort();
				} catch(e) {}
			};
		}
	} else {
		const xhr = new XMLHttpRequest();
		const toFunc = () => {
			reject(AjaxError.Timeout);
			xhr.abort();
		};
		let loadTO = needTO && setTimeout(toFunc, 5e3);
		if(params && params.onprogress) {
			xhr.upload.onprogress = params.onprogress;
		}
		xhr.onreadystatechange = ({ target }) => {
			if(needTO) {
				clearTimeout(loadTO);
			}
			if(target.readyState === 4) {
				if(target.status === 200 ||
					(aib.tiny && target.status === 400) ||
					(target.status === 0 && target.responseType === 'arraybuffer')
				) {
					resolve(target);
				} else {
					reject(new AjaxError(target.status, target.statusText));
				}
			} else if(needTO) {
				loadTO = setTimeout(toFunc, 5e3);
			}
		};
		try {
			xhr.open((params && params.method) || 'GET', (
				url[1] === '/' ? aib.prot :
				url[0] === '/' ? aib.prot + '//' + aib.host : ''
			) + url, true);
			if(params) {
				if(params.responseType) {
					xhr.responseType = params.responseType;
				}
				const { headers } = params;
				if(headers) {
					for(const h in headers) {
						if(headers.hasOwnProperty(h)) {
							xhr.setRequestHeader(h, headers[h]);
						}
					}
				}
			}
			xhr.send(params && params.data || null);
			cancelFn = () => {
				if(needTO) {
					clearTimeout(loadTO);
				}
				xhr.abort();
			};
		} catch(e) {
			clearTimeout(loadTO);
			nativeXHRworks = false;
			return $ajax(url, params, false);
		}
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
AjaxError.Locked = new AjaxError(-1, {
	toString() {
		return Lng.thrClosed[lang];
	}
});
AjaxError.Timeout = new AjaxError(0, {
	toString() {
		return Lng.noConnect[lang] + ' (timeout)';
	}
});

const AjaxCache = {
	fixURL(url) {
		return `${ url }${ url.includes('?') ? '&' : '?' }nocache=${ Math.random() }`;
	},
	clear() {
		this._data = new Map();
	},
	runCachedAjax(url, useCache) {
		const { hasCacheControl, params } = this._data.get(url) || {};
		const ajaxURL = hasCacheControl === false ? this.fixURL(url) : url;
		return $ajax(ajaxURL, useCache && params || { useTimeout: true }).then(xhr =>
			this.saveData(url, xhr) ? xhr : $ajax(this.fixURL(url), useCache && params)
		);
	},
	saveData(url, xhr) {
		let ETag = null;
		let LastModified = null;
		let i = 0;
		let hasCacheControl = false;
		const ajaxHeaders = 'getAllResponseHeaders' in xhr ?
			xhr.getAllResponseHeaders() :
			xhr.responseHeaders;
		for(const header of ajaxHeaders.split('\r\n')) {
			const lHeader = header.toLowerCase();
			if(lHeader.startsWith('cache-control: ')) {
				hasCacheControl = true;
				i++;
			} else if(lHeader.startsWith('last-modified: ')) {
				LastModified = header.substr(15);
				i++;
			} else if(lHeader.startsWith('etag: ')) {
				ETag = header.substr(6);
				i++;
			}
			if(i === 3) {
				break;
			}
		}
		let headers = null;
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

function ajaxLoad(url, returnForm = true, useCache = false, checkArch = false) {
	return AjaxCache.runCachedAjax(url, useCache).then(xhr => {
		let el;
		const text = xhr.responseText;
		if(text.includes('</html>')) {
			el = returnForm ? $q(aib.qDForm, $DOM(text)) : $DOM(text);
		}
		return el ? (!checkArch ? el : [el, (xhr.responseURL || '').includes('/arch/')]) :
			CancelablePromise.reject(new AjaxError(0, Lng.errCorruptData[lang]));
	}, err => err.code === 304 ? null : CancelablePromise.reject(err));
}

function ajaxPostsLoad(brd, tNum, useCache) {
	if(aib.JsonBuilder) {
		return AjaxCache.runCachedAjax(aib.getJsonApiUrl(brd, tNum), useCache).then(xhr => {
			try {
				return new aib.JsonBuilder(JSON.parse(xhr.responseText), brd);
			} catch(e) {
				if(e instanceof AjaxError) {
					return CancelablePromise.reject(e);
				}
				console.warn(`API error: ${ e }. Switching to DOM parsing!`);
				aib.JsonBuilder = null;
				return ajaxPostsLoad(brd, tNum, useCache);
			}
		}, e => e.code === 304 ? null : CancelablePromise.reject(e));
	}
	return aib.iichan ?
		ajaxLoad(aib.getThrUrl(brd, tNum), true, useCache, true)
			.then(data => data && data[0] ? new DOMPostsBuilder(data[0], data[1]) : null) :
		ajaxLoad(aib.getThrUrl(brd, tNum), true, useCache)
			.then(form => form ? new DOMPostsBuilder(form) : null);
}

function infoLoadErrors(e, showError = true) {
	const isAjax = e instanceof AjaxError;
	const eCode = isAjax ? e.code : 0;
	if(eCode === 200) {
		closePopup('newposts');
	} else if(isAjax && eCode === 0) {
		$popup('newposts', e.message ? String(e.message) : Lng.noConnect[lang]);
	} else {
		$popup('newposts', ` (№${ Lng.thrNotFound[lang] }${ aib.t }): \n${ getErrorMessage(e) }`);
		if(showError) {
			doc.title = `{${ eCode }} ${ doc.title }`;
		}
	}
}

/* ==[ Pages.js ]=============================================================================================
                                                 PAGES LOADER
=========================================================================================================== */

const Pages = {
	add() {
		const pageNum = DelForm.last.pageNum + 1;
		if(this._adding || pageNum > aib.lastPage) {
			return;
		}
		this._adding = true;
		DelForm.last.el.insertAdjacentHTML('beforeend', '<div class="de-addpage-wait"><hr>' +
			`<svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg>${ Lng.loading[lang] }</div>`);
		MyPosts.purge();
		this._addPromise = ajaxLoad(aib.getPageUrl(aib.b, pageNum)).then(formEl => {
			if(!this._addForm(formEl, pageNum).firstThr) {
				this._endAdding();
				this.add();
				return CancelablePromise.reject(new CancelError());
			}
			return this._updateForms(DelForm.last);
		}).then(() => this._endAdding()).catch(e => {
			if(!(e instanceof CancelError)) {
				$popup('add-page', getErrorMessage(e));
				this._endAdding();
			}
		});
	},
	async load(count) {
		$popup('load-pages', Lng.loading[lang], true);
		if(this._addPromise) {
			this._addPromise.cancel();
			this._endAdding();
		}
		PviewsCache.purge();
		isExpImg = false;
		pByEl = new Map();
		pByNum = new Map();
		Post.hiddenNums = new Set();
		if(Attachment.viewer) {
			Attachment.viewer.close(null);
			Attachment.viewer = null;
		}
		if(pr.isQuick) {
			pr.clearForm();
		}
		DelForm.tNums = new Set();
		for(const form of DelForm) {
			$each($Q('a[href^="blob:"]', form.el), a => URL.revokeObjectURL(a.href));
			$hide(form.el);
			if(form === DelForm.last) {
				break;
			}
			$del(form.el);
		}
		DelForm.first = DelForm.last;
		for(let i = aib.page, len = Math.min(aib.lastPage + 1, aib.page + count); i < len; ++i) {
			try {
				this._addForm((await ajaxLoad(aib.getPageUrl(aib.b, i))), i);
			} catch(e) {
				$popup('load-pages', getErrorMessage(e));
			}
		}
		const { first } = DelForm;
		if(first !== DelForm.last) {
			DelForm.first = first.next;
			$del(first.el);
			await this._updateForms(DelForm.first);
			closePopup('load-pages');
		}
	},

	_adding     : false,
	_addPromise : null,
	_addForm(formEl, pageNum) {
		formEl = doc.adoptNode(formEl);
		$hide((formEl = aib.fixHTML(formEl)));
		$after(DelForm.last.el, formEl);
		const form = new DelForm(formEl, +pageNum, DelForm.last);
		DelForm.last = form;
		form.addStuff();
		if(pageNum !== aib.page && form.firstThr) {
			formEl.insertAdjacentHTML('afterbegin', `<div class="de-page-num">
				<center style="font-size: 2em">${ Lng.page[lang] } ${ pageNum }</center>
				<hr>
			</div>`);
		}
		$show(formEl);
		return form;
	},
	_endAdding() {
		$del($q('.de-addpage-wait'));
		this._adding = false;
		this._addPromise = null;
	},
	async _updateForms(newForm) {
		readPostsData(newForm.firstThr.op, (await getStoredObj('DESU_Favorites')));
		if(pr.passw) {
			PostForm.setUserPassw();
		}
		if(HotKeys.enabled) {
			HotKeys.clear();
		}
	}
};

function toggleInfinityScroll() {
	if(!aib.t) {
		const evtName = 'onwheel' in doc.defaultView ? 'wheel' : 'mousewheel';
		if(Cfg.inftyScroll) {
			doc.defaultView.addEventListener(evtName, toggleInfinityScroll.onwheel);
		} else {
			doc.defaultView.removeEventListener(evtName, toggleInfinityScroll.onwheel);
		}
	}
}
toggleInfinityScroll.onwheel = e => {
	if((e.type === 'wheel' ? e.deltaY : -('wheelDeltaY' in e ? e.wheelDeltaY : e.wheelDelta)) > 0) {
		window.requestAnimationFrame(() => {
			if(Thread.last.bottom - 150 < Post.sizing.wHeight) {
				Pages.add();
			}
		});
	}
};

/* ==[ Spells.js ]============================================================================================
                                                    SPELLS
=========================================================================================================== */

const Spells = {
	hash: null,
	get hiders() {
		this._init();
		return this.hiders;
	},
	get list() {
		if(Cfg.spells === null) {
			return '#wipe(samelines,samewords,longwords,symbols,numbers,whitespace)';
		}
		let data;
		try {
			data = JSON.parse(Cfg.spells);
		} catch(e) {
			return '';
		}
		const [, s, reps, oreps] = data;
		let str = s ? this._decompileScope(s, '')[0].join('\n') : '';
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
			'all', 'video', 'wipe', 'num', 'vauthor'
		];
	},
	get needArg() {
		return [
			/* words */ true, /* exp */ true, /* exph */ true, /* imgn */ true, /* ihash */ true,
			/* subj */ false, /* name */ true, /* trip */ false, /* img */ false, /* sage */ false,
			/* op */ false, /* tlen */ false, /* all */ false, /* video */ false, /* wipe */ false,
			/* num */ true, /* vauthor */ true
		];
	},
	get outreps() {
		this._init();
		return this.outreps;
	},
	get reps() {
		this._init();
		return this.reps;
	},
	add(type, arg, isNeg) {
		const fld = $id('de-spell-txt');
		const val = fld && fld.value;
		const chk = $q('input[info="hideBySpell"]');
		let spells = val && this.parseText(val);
		if(!val || spells) {
			if(!spells) {
				try {
					spells = JSON.parse(Cfg.spells);
				} catch(e) {}
				spells = spells || [Date.now(), [], null, null];
			}
			let idx, isAdded = true;
			const scope = aib.t ? [aib.b, aib.t] : null;
			if(spells[1]) {
				const sScope = String(scope);
				const sArg = String(arg);
				spells[1].some(scope && isNeg ? function(spell, i) {
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
				} : function(spell, i) {
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
					spells[1].unshift([0xFF, [[0x20C, '', scope], [type, arg, void 0]], void 0]);
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
		// #img
		if(type === 8) {
			return spell + '(' + (val[0] === 2 ? '>' : val[0] === 1 ? '<' : '=') +
				(val[1] ? val[1][0] + (val[1][1] === val[1][0] ? '' : '-' + val[1][1]) : '') +
				(val[2] ? '@' + val[2][0] + (val[2][0] === val[2][1] ? '' : '-' + val[2][1]) + 'x' +
				val[2][2] + (val[2][2] === val[2][3] ? '' : '-' + val[2][3]) : '') + ')';
		// #wipe
		} else if(type === 14) {
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
				if(+bit !== msgBit) {
					if(val & +bit) {
						names.push(bits[bit]);
					}
				}
			}
			if(msgBit) {
				names.push(bits[msgBit].toUpperCase() + (msgData ? ': ' + msgData : ''));
			}
			return `${ spell }(${ names.join(',') })`;
		// #num, #tlen
		} else if(type === 15 || type === 11) {
			let temp_, temp = val[1].length - 1;
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
		// #words, #name, #trip, #vauthor
		} else if(type === 0 || type === 6 || type === 7 || type === 16) {
			return `${ spell }(${ val.replace(/([)\\])/g, '\\$1').replace(/\n/g, '\\n') })`;
		} else {
			return `${ spell }(${ String(val) })`;
		}
	},
	disable() {
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
			$popup('err-spell', Lng.error[lang] + ': ' + codeGen.error);
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
			this.disable();
			return;
		}
		this._optimize(spells);
		if(this.hiders) {
			const sRunner = new SpellsRunner();
			for(let post = Thread.first.op; post; post = post.next) {
				sRunner.run(post);
			}
			sRunner.end();
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
				this.disable();
				saveCfg('spells', JSON.stringify([Date.now(), null, null, null]));
				locStorage['__de-spells'] = '{"hide": false, "data": null}';
				locStorage.removeItem('__de-spells');
			}
			$q('input[info="hideBySpell"]').checked = false;
		}
	},

	_decompileRep(rep, isOrep) {
		return `${ isOrep ? '#outrep' : '#rep' }` +
			`${ rep[0] ? `[${ rep[0] }${ rep[1] ? `,${ rep[1] === -1 ? '' : rep[1] }` : '' }]` : '' }` +
			`${ rep[2] },${ rep[3].replace(/([)\\])/g, '\\$1').replace(/\n/g, '\\n') }`;
	},
	_decompileScope(scope, indent) {
		const dScope = [];
		let hScope = false;
		for(let i = 0, j = 0, len = scope.length; i < len; i++, j++) {
			const spell = scope[i];
			const type = spell[0] & 0xFF;
			if(type === 0xFF) {
				hScope = true;
				const temp = this._decompileScope(spell[1], indent + '    ');
				if(temp[1]) {
					const str = `${ (spell[0] & 0x100) ? '!(\n' : '(\n' }${ indent }    ` +
						`${ temp[0].join(`\n${ indent }    `) }\n${ indent })`;
					if(j === 0) {
						dScope[0] = str;
					} else {
						dScope[--j] += ' ' + str;
					}
				} else {
					dScope[j] = `${ (spell[0] & 0x100) ? '!(' : '(' }${ temp[0].join(' ') })`;
				}
			} else {
				dScope[j] = this.decompileSpell(type, spell[0] & 0x100, spell[1], spell[2]);
			}
			if(i !== len - 1) {
				dScope[j] += (spell[0] & 0x200) ? ' &' : ' |';
			}
		}
		return [dScope, dScope.length > 2 || hScope];
	},
	_init() {
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
		} catch(e) {}
		if(data && spells && data[0] === spells[0]) {
			this.hash = data[0];
			this._setData(data[1], data[2], data[3]);
			return;
		}
		if(spells) {
			this._optimize(spells);
		} else {
			this.disable();
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
					case 13: item[1] = toRegExp(val, true); break;
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
				item[0] = toRegExp(item[0], false);
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
		let neg, lastSpell = -1;
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
					(scope[1] === -1 ? !aib.t : (!scope[1] || +scope[1] === aib.t))
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
		for(let i = 0, len = sp.length - 1; i < len; i++) {
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
		for(let i = 0, len = sp.length - 1; i < len; i++) {
			// Removes duplicates and weaker spells
			const j = i + 1;
			if(sp[i][0] === sp[j][0] &&
				sp[i][1] <= sp[j][1] &&
				sp[i][1] >= sp[j][1] && (
					sp[i][2] === null || // Stronger spell with 3 parameters
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
		locStorage['__de-spells'] = JSON.stringify({ hide: !!Cfg.hideBySpell, data });
		locStorage.removeItem('__de-spells');
	}
};

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
	get error() {
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
				this._col++;
				while((sList[i] >= 'a' && sList[i] <= 'z') || (sList[i] >= 'A' && sList[i] <= 'Z')) {
					name += sList[i].toLowerCase();
					i++;
					this._col++;
				}
				if(name === 'rep' || name === 'outrep') {
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
								case '\n':
								case '\r':
								case ' ':
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
			toRegExp(val, true);
		} catch(e) {
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
		this._setError(Lng.seSyntaxErr[lang], name);
		return null;
	}
	_doSpell(name, str, isNeg) {
		let m, val, scope = null, i = 0;
		const spellIdx = Spells.names.indexOf(name);
		if(spellIdx === -1) {
			this._setError(Lng.seUnknown[lang], name);
			return null;
		}
		let temp = SpellsCodegen._getScope(str);
		if(temp) {
			i += temp[0];
			str = str.substring(temp[0]);
			scope = temp[1];
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
		// #ihash
		case 4:
			m = str.match(/^\((\d+)\)/);
			if(+m[1] === +m[1]) {
				return [i + m[0].length, [spellType, +m[1], scope]];
			}
			break;
		// #img
		case 8:
			m = str.match(/^\(([><=])(?:(\d+(?:\.\d+)?)(?:-(\d+(?:\.\d+)?))?)?(?:@(\d+)(?:-(\d+))?x(\d+)(?:-(\d+))?)?\)/);
			if(m && (m[2] || m[4])) {
				return [i + m[0].length, [spellType, [
					m[1] === '=' ? 0 : m[1] === '<' ? 1 : 2,
					m[2] && [+m[2], m[3] ? +m[3] : +m[2]],
					m[4] && [+m[4], m[5] ? +m[5] : +m[4], +m[6], m[7] ? +m[7] : +m[6]]
				], scope]];
			}
			break;
		// #wipe
		case 14:
			m = str.match(/^\(([a-z, ]+)\)/);
			if(m) {
				val = m[1].split(/, */).reduce(function(val, str) {
					switch(str) {
					case 'samelines': return (val |= 1);
					case 'samewords': return (val |= 2);
					case 'longwords': return (val |= 4);
					case 'symbols': return (val |= 8);
					case 'capslock': return (val |= 16);
					case 'numbers': return (val |= 32);
					case 'whitespace': return (val |= 64);
					default: return -1;
					}
				}, 0);
				if(val !== -1) {
					return [i + m[0].length, [spellType, val, scope]];
				}
			}
			break;
		// #tlen, #num
		case 11:
		case 15:
			m = str.match(/^\(([\d-, ]+)\)/);
			if(m) {
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
		// #exp, #exph, #imgn, #subj, #video
		case 1:
		case 2:
		case 3:
		case 5:
		case 13:
			temp = this._getRegex(str, false);
			if(temp) {
				return [i + temp[0], [spellType, temp[1], scope]];
			}
			break;
		// #sage, #op, #all, #trip, #name, #words, #vauthor
		default:
			temp = SpellsCodegen._getText(str, true);
			if(temp) {
				return [i + temp[0], [spellType, spellIdx === 0 ? temp[1].toLowerCase() : temp[1], scope]];
			}
		}
		this._setError(Lng.seSyntaxErr[lang], name);
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
			this.run = SpellsRunner._unhidePost;
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
	end() {
		if(this._endPromise) {
			this._endPromise.then(() => this._savePostsHelper());
		} else {
			this._savePostsHelper();
		}
	}
	run(post) {
		let res = (new SpellsInterpreter(post, this._spells)).run();
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
			if(SpellsRunner.cachedData && !post.deleted) {
				SpellsRunner.cachedData[post.count] = [false, null];
			}
		}
		return 0;
	}
	_checkRes(post, [hasNumSpell, val, msg]) {
		this.hasNumSpell |= hasNumSpell;
		if(val) {
			post.spellHide(msg);
			if(SpellsRunner.cachedData && !post.deleted) {
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
	run() {
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

	static _tlenNum_helper(val, num) {
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
		return stopCheck ? [this.hasNumSpell, rv, rv ? this._getMsg() : null] : this.run();
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
			if((image instanceof Attachment) && (await ImagesHashStorage.getHash(image)) === val) {
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
			if(!(image instanceof Attachment)) {
				continue;
			}
			if(weightVals) {
				const w = image.weight;
				let hide;
				switch(compareRule) {
				case 0: hide = w >= weightVals[0] && w <= weightVals[1]; break;
				case 1: hide = w < weightVals[0]; break;
				case 2: hide = w > weightVals[0]; break;
				}
				if(!hide) {
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
			if((image instanceof Attachment) && val.test(image.name)) {
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
		return SpellsInterpreter._tlenNum_helper(val, this._post.count + 1);
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
		return !val ? !!text : SpellsInterpreter._tlenNum_helper(val, text.length);
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
			arr = txt.replace(/>/g, '').split(/\s*\n\s*/);
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
				for(let i = 0; i < len; i++) {
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
		this.txta = $q('tr:not([style*="none"]) textarea:not([style*="display:none"])', form);
		this.subm = $q('tr input[type="submit"]', form);
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
			this._makeSageBtn();
		}
		if(Cfg.noPassword && this.passw) {
			$hide($parent(this.passw, 'TR'));
		}
		if(Cfg.noName && this.name) {
			PostForm.hideField(this.name);
		}
		if(Cfg.noSubj && this.subj) {
			PostForm.hideField(this.subj);
		}
		window.addEventListener('load', () => {
			if(Cfg.userName && this.name) {
				setTimeout(PostForm.setUserName, 1e3);
			}
			if(this.passw) {
				setTimeout(PostForm.setUserPassw, 1e3);
			}
		});
	}
	static hideField(el) {
		const next = el.nextElementSibling;
		$toggle(next && (next.style.display !== 'none') || el.previousElementSibling ?
			el : $parent(el, 'TR'));
	}
	static setUserName() {
		const el = $q('input[info="nameValue"]');
		if(el) {
			saveCfg('nameValue', el.value);
		}
		pr.name.value = Cfg.userName ? Cfg.nameValue : '';
	}
	static setUserPassw() {
		const el = $q('input[info="passwValue"]');
		if(el) {
			saveCfg('passwValue', el.value);
		}
		const value = pr.passw.value = Cfg.passwValue;
		for(const { passEl = {} } of DelForm) {
			passEl.value = value;
		}
	}
	get isVisible() {
		if(!this.isHidden && this.isBottom && $q(':focus', this.pForm)) {
			const cr = this.pForm.getBoundingClientRect();
			return cr.bottom > 0 && cr.top < nav.viewportHeight();
		}
		return false;
	}
	get top() {
		return this.pForm.getBoundingClientRect().top;
	}
	addMarkupPanel() {
		let el = $id('de-txt-panel');
		if(!Cfg.addTextBtns || (aib.fch && !$q('input[type="checkbox"][name="spoiler"]', this.form))) {
			$del(el);
			return;
		}
		if(!el) {
			el = $add('<span id="de-txt-panel"></span>');
			el.addEventListener('click', this);
			el.addEventListener('mouseover', this);
		}
		el.style.cssFloat = Cfg.txtBtnsLoc ? 'none' : 'right';
		$after(Cfg.txtBtnsLoc ? $id('de-resizer-text') || this.txta : this.subm, el);
		const id = ['bold', 'italic', 'under', 'strike', 'spoil', 'code', 'sup', 'sub'];
		const val = ['B', 'i', 'U', 'S', '%', 'C', 'x\u00b2', 'x\u2082'];
		const btns = aib.markupTags;
		const mode = Cfg.addTextBtns;
		let html = '';
		for(let i = 0, len = btns.length; i < len; ++i) {
			if(btns[i] === '') {
				continue;
			}
			html += `<div id="de-btn-${ id[i] }" de-title="${ Lng.txtBtn[i][lang] }" de-tag="${ btns[i] }">${
				mode === 2 ? `${ html === '' ? '[ ' : '' }<a class="de-abtn" href="#">${ val[i] }</a> / ` :
				mode === 3 ? `<button type="button" style="font-weight: bold;">${ val[i] }</button>` :
				`<svg><use xlink:href="#de-symbol-markup-${ id[i] }"/></svg>`
			}</div>`;
		}
		el.innerHTML = `${ html }<div id="de-btn-quote" de-title="${ Lng.txtBtn[8][lang] }" de-tag="q">${
			mode === 2 ? '<a class="de-abtn" href="#">&gt;</a> ]' :
			mode === 3 ? '<button type="button" style="font-weight: bold;">&gt;</button>' :
			'<svg><use xlink:href="#de-symbol-markup-quote"/></svg>'
		}</span>`;
	}
	clearForm() {
		if(this.txta) {
			this.txta.value = '';
		}
		if(this.files) {
			this.files.clear();
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
			}
			this.setReply(false, !aib.t || Cfg.addPostForm > 1);
		}
	}
	handleEvent(e) {
		let el = e.target;
		if(el.tagName !== 'SPAN') {
			el = el.parentNode;
		}
		const { id } = el;
		if(!id.startsWith('de-btn')) {
			return;
		}
		if(e.type === 'mouseover') {
			if(id === 'de-btn-quote') {
				quotetxt = window.getSelection().toString();
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
			$txtInsert(txtaEl, quote + (start === end ? quotetxt : txtaEl.value.substring(start, end))
				.replace(/\n/gm, '\n' + quote));
			quotetxt = '';
		} else {
			const { scrtop } = txtaEl;
			const val = PostForm._wrapText(el.getAttribute('de-tag'), txtaEl.value.substring(start, end));
			const len = start + val[0];
			txtaEl.value = txtaEl.value.substr(0, start) + val[1] + txtaEl.value.substr(end);
			txtaEl.setSelectionRange(len, len);
			txtaEl.focus();
			txtaEl.scrollTop = scrtop;
		}
		$pd(e);
		e.stopPropagation();
	}
	refreshCap(isErr = false) {
		if(this.cap) {
			this.cap.refreshCaptcha(isErr, isErr, this.tNum);
		}
	}
	setPlaceholders() {
		if(aib.kus || !aib.multiFile && Cfg.fileInputs === 2) {
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
			$after(this.qArea.firstChild, this.pForm);
		} else {
			$after(this.pArea[+this.isBottom], this.qArea);
			$after(this._pBtn[+this.isBottom], this.pForm);
		}
		this.isHidden = needToHide;
		$toggle(this.qArea, isQuick);
		$toggle(this.pForm, !needToHide);
		this.updatePAreaBtns();
	}
	showMainReply(isBottom, evt) {
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
		if(evt) {
			$pd(evt);
		}
	}
	showQuickReply(post, pNum, closeReply, isNumClick) {
		if(!this.isQuick) {
			this.isQuick = true;
			this.setReply(true, false);
			$q('a', this._pBtn[+this.isBottom]).className =
				`de-abtn de-parea-btn-${ aib.t ? 'reply' : 'thr' }`;
		} else if(closeReply && !quotetxt && post.wrap.nextElementSibling === this.qArea) {
			this.closeReply();
			return;
		}
		$after(post.wrap, this.qArea);
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
		let temp = this.txta.value;
		if(!Cfg.addOPLink && !aib.t && post.isOp && !isNumClick) {
			this.txta.focus();
		} else {
			const isOnNewLine = temp === '' || temp.slice(-1) === '\n';
			$txtInsert(this.txta, (
				isNumClick ? `>>${ pNum }${ isOnNewLine ? '\n' : '' }` :
				(isOnNewLine ? '' : '\n') +
					(this.lastQuickPNum === pNum && temp.includes('>>' + pNum) ? '' : `>>${ pNum }\n`)
			) + (quotetxt ? `${ quotetxt.replace(/^\n|\n$/g, '')
					.replace(/(^|\n)(.)/gm, `$1>${ Cfg.spacedQuote ? ' ' : '' }$2`) }\n` : ''));
		}
		temp = pByNum.get(pNum).thr.op.title.trim();
		if(temp.length > 27) {
			temp = `${ temp.substr(0, 30) }\u2026`;
		}
		$q('.de-win-title', this.qArea).textContent = temp || `#${ pNum }`;
		this.lastQuickPNum = pNum;
	}
	updateLanguage() {
		this.txta.title = Lng.pasteImage[lang];
		if(!aib.tiny) {
			this.subm.value = Lng.reply[lang];
		}
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
		let m, rv = '', i = 0;
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
			$pd(e);
			$popup('upload', Lng.sending[lang], true);
			html5Submit(this.form, this.subm, true).then(checkUpload)
				.catch(e => $popup('upload', getErrorMessage(e)));
		};
	}
	_initCaptcha() {
		const capEl =
			$q('input[type="text"][name*="aptcha"], *[id*="captcha"], *[class*="captcha"]', this.form);
		if(!capEl || aib.fch && doc.cookie.includes('pass_enabled')) {
			this.cap = null;
			return;
		}
		this.cap = new Captcha(capEl, this.tNum);
		const updCapFn = () => {
			this.cap.addCaptcha();
			this.cap.updOutdated();
		};
		this.txta.addEventListener('focus', updCapFn);
		if(this.files) {
			this.files.onchange = updCapFn;
		}
		this.form.addEventListener('click', () => this.cap.addCaptcha(), true);
	}
	_initFileInputs() {
		const fileEl = $q('tr input[type="file"]', this.form);
		if(!fileEl) {
			return;
		}
		if(aib.fixFileInputs) {
			aib.fixFileInputs($parent(fileEl, 'TD'));
		}
		this.files = new Files(this, $q('tr input[type="file"]', this.form));
		// We need to clear file inputs in case if session was restored.
		window.addEventListener('load', () => setTimeout(() => {
			if(!this.files.filesCount) {
				this.files.clear();
			}
		}, 0));
	}
	_initSubmit() {
		this.subm.addEventListener('click', e => {
			if(Cfg.warnSubjTrip && this.subj && /#.|##./.test(this.subj.value)) {
				$pd(e);
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
						nav.isESNext ? '.es6' : '' } [${ nav.scriptInstall }]`
				)[1] }`;
				if(!val.includes(temp)) {
					val += temp;
				}
			}
			this.txta.value = val;
			if(Cfg.ajaxPosting) {
				$popup('upload', Lng.checking[lang], true);
			}
			if(this.video && (val = this.video.value) && (val = val.match(Videos.ytReg))) {
				this.video.value = 'http://www.youtube.com/watch?v=' + val[1];
			}
			if(this.isQuick) {
				$hide(this.pForm);
				$hide(this.qArea);
				$after(this._pBtn[+this.isBottom], this.pForm);
			}
			updater.pause();
		});
	}
	_initTextarea() {
		const el = this.txta;
		if(aib.dobr) {
			el.removeAttribute('id');
		}
		el.classList.add('de-textarea');
		el.style.cssText = `width: ${ Cfg.textaWidth }px; height: ${ Cfg.textaHeight }px;`;
		// Allow to scroll page on PgUp/PgDn
		el.addEventListener('keypress', e => {
			const code = e.charCode || e.keyCode;
			if((code === 33 /* PgUp */ || code === 34 /* PgDn */) && e.which === 0) {
				e.target.blur();
				window.focus();
			}
		});
		// Add image from clipboard to file inputs on Ctrl+V
		el.addEventListener('paste', e => {
			if('clipboardData' in e) {
				for(const item of e.clipboardData.items) {
					if(item.kind === 'file') {
						const inputs = this.files._inputs;
						for(let i = 0, len = inputs.length; i < len; ++i) {
							const input = inputs[i];
							if(!input.hasFile) {
								const file = item.getAsFile();
								input._addUrlFile(URL.createObjectURL(file), file);
								break;
							}
						}
					}
				}
			}
		});
		// Make textarea resizer
		if(nav.isFirefox) {
			el.addEventListener('mouseup', ({ target }) => {
				saveCfg('textaWidth', parseInt(target.style.width, 10));
				saveCfg('textaHeight', parseInt(target.style.height, 10));
			});
			return;
		}
		$aEnd(el, '<div id="de-resizer-text"></div>').addEventListener('mousedown', {
			_el      : el,
			_elStyle : el.style,
			handleEvent(e) {
				switch(e.type) {
				case 'mousedown':
					docBody.addEventListener('mousemove', this);
					docBody.addEventListener('mouseup', this);
					$pd(e);
					return;
				case 'mousemove': {
					const cr = this._el.getBoundingClientRect();
					this._elStyle.width = `${ e.clientX - cr.left }px`;
					this._elStyle.height = `${ e.clientY - cr.top }px`;
					return;
				}
				default: // mouseup
					docBody.removeEventListener('mousemove', this);
					docBody.removeEventListener('mouseup', this);
					saveCfg('textaWidth', parseInt(this._elStyle.width, 10));
					saveCfg('textaHeight', parseInt(this._elStyle.height, 10));
				}
			}
		});
	}
	_makeHideableContainer() {
		this.pForm = $add('<div id="de-pform" class="de-win-body"></div>');
		if(this.form) {
			this.pForm.appendChild(this.form);
		}
		if(this.oeForm) {
			this.pForm.appendChild(this.oeForm);
		}
		const html = '<div class="de-parea"><div>[<a href="#"></a>]</div><hr></div>';
		this.pArea = [
			$bBegin(DelForm.first.el, html),
			$aEnd(aib.fch ? $q('.board', DelForm.first.el) : DelForm.first.el, html)
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
	_makeSageBtn() {
		PostForm.hideField($parent(this.mail, 'LABEL') || this.mail);
		$aEnd(this.subm, '<svg id="de-sagebtn" class="de-btn-sage">' +
			'<use xlink:href="#de-symbol-post-sage"/></svg>'
		).onclick = e => {
			e.stopPropagation();
			$pd(e);
			toggleCfg('sageReply');
			this._setSage();
		};
		setTimeout(() => this._setSage(), 0);
	}
	_makeWindow() {
		makeDraggable('reply', this.qArea, $aBegin(this.qArea, `<div class="de-win-head">
			<span class="de-win-title"></span>
			<span class="de-win-buttons">
				<svg class="de-btn-clear"><use xlink:href="#de-symbol-unavail"/></svg>
				<svg class="de-btn-toggle"><use xlink:href="#de-symbol-win-arrow"/></svg>
				<svg class="de-btn-close"><use xlink:href="#de-symbol-win-close"/></svg>
			</span>
		</div>
		<div class="de-resizer de-resizer-top"></div>
		<div class="de-resizer de-resizer-left"></div>
		<div class="de-resizer de-resizer-right"></div>
		<div class="de-resizer de-resizer-bottom"></div>`));
		const buttons = $q('.de-win-buttons', this.qArea);
		buttons.onmouseover = ({ target }) => {
			const el = target.parentNode;
			switch(fixEventEl(target).classList[0]) {
			case 'de-btn-clear': el.title = Lng.clearForm[lang]; break;
			case 'de-btn-close': el.title = Lng.closeReply[lang]; break;
			case 'de-btn-toggle': el.title = Cfg.replyWinDrag ? Lng.underPost[lang] : Lng.makeDrag[lang];
			}
		};
		const [clearBtn, toggleBtn, closeBtn] = [...buttons.children];
		clearBtn.onclick = () => {
			saveCfg('sageReply', 0);
			this._setSage();
			this.files.clear();
			[this.txta, this.name, this.mail, this.subj, this.video, this.cap && this.cap.textEl].forEach(
				node => {
					if(node) {
						node.value = '';
					}
				});
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
			if(aib.multiFile || Cfg.fileInputs !== 2) {
				el.placeholder = Lng[val][lang];
			} else {
				el.removeAttribute('placeholder');
			}
		}
	}
	_setSage() {
		const el = $id('de-sagebtn');
		const c = Cfg.sageReply;
		el.style.opacity = c ? '1' : '.3';
		el.title = c ? 'SAGE!' : Lng.noSage[lang];
		if(this.mail.type === 'text') {
			this.mail.value = c ? 'sage' : aib.fch ? 'noko' : '';
		} else {
			this.mail.checked = c;
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
			if(aib.tiny) {
				if(tNum) {
					$del($q('input[name="page"]', this.form));
				} else if(!$q('input[name="page"]', this.form)) {
					$q('input[name="board"]', this.form).insertAdjacentHTML('afterend',
						'<input name="page" value="1" type="hidden">');
				}
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
	if(!dc.body.hasChildNodes() || $q(aib.qDForm, dc)) {
		return null;
	}
	let err = '';
	const els = $Q(aib.qError, dc);
	for(let i = 0, len = els.length; i < len; ++i) {
		err += els[i].innerHTML + '\n';
	}
	err = err.replace(/<a [^>]+>Назад.+|<br.+/, '') || Lng.error[lang] + ':\n' + dc.body.innerHTML;
	return /successful|uploaded|updating|post deleted|обновл|удален[о.]/i.test(err) ? null : err;
}

function getUploadFunc() {
	$popup('upload', Lng.sending[lang] +
		'<br><progress id="de-uploadprogress" value="0" max="1" style="display: none; width: 200px;">' +
		'</progress><div style="display: none; font: bold 12px arial;">' +
		'<span></span> / <span></span> (<span></span>)</div>', true);
	let inited = false;
	const beginTime = Date.now();
	const progress = $id('de-uploadprogress');
	const counterWrap = progress.nextElementSibling;
	const [counterEl, totalEl, speedEl] = [...counterWrap.children];
	return function({ total, loaded: i }) {
		if(!inited) {
			progress.setAttribute('max', total);
			$show(progress);
			totalEl.textContent = prettifySize(total);
			$show(counterWrap);
			inited = true;
		}
		progress.value = i;
		counterEl.textContent = prettifySize(i);
		speedEl.textContent = `${ prettifySize(1e3 * i / (Date.now() - beginTime)) }/${ Lng.second[lang] }`;
	};
}

function checkUpload(data) {
	let error = null;
	let postNum = null;
	const isDocument = data instanceof HTMLDocument;
	if(aib.getSubmitData) {
		if(aib.jsonSubmit) {
			if(aib._8ch && data.substring(0, 16) === '{"captcha":true|') {
				$ajax('/dnsbls_bypass_popup.php').then(xhr => {
					$popup('upload', xhr.responseText).style.cssText =
						'width: 350px; text-align: center;';
					$id('captcha_pop_submit').onclick = function() {
						$id('captcha_message_box').innerHTML =
							'<svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg>';
						const formData = new FormData();
						formData.append('captcha_text', $q('.captcha_text').value);
						formData.append('captcha_cookie', $q('.captcha_cookie').value);
						$ajax('/dnsbls_bypass_popup.php', { method: 'POST', data: formData }).then(xhr => {
							const data = JSON.parse(xhr.responseText);
							if(data.status === 1) {
								$popup('upload', data.message);
							} else {
								$id('captcha_message_box').innerHTML = data.message;
								$id('captcha_objects').innerHTML = data.new_captcha;
							}
						});
					};
					if(pr.isQuick) {
						pr.setReply(true, false);
					}
					updater.sendErrNotif();
					updater.continue();
				});
				return;
			}
			try {
				data = JSON.parse(isDocument ? data.body.textContent : data);
			} catch(e) {
				error = getErrorMessage(e);
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
		$popup('upload', error);
		updater.sendErrNotif();
		updater.continue();
		DollchanAPI.notify('submitform', { success: false, error });
		return;
	}
	const { tNum } = pr;
	if((Cfg.markMyPosts || Cfg.markMyLinks) && postNum) {
		MyPosts.set(postNum, tNum || postNum);
	}
	if(Cfg.favOnReply && tNum && !$q('.de-btn-fav-sel', pByNum.get(tNum).el)) {
		pByNum.get(tNum).thr.setFavorState(true, 'onreply');
	}
	pr.clearForm();
	DollchanAPI.notify('submitform', { success: true, num: postNum });
	Cfg.stats[tNum ? 'reply' : 'op']++;
	saveCfgObj(aib.dm, Cfg);
	if(!tNum) {
		if(postNum) {
			window.location.assign(aib.getThrUrl(aib.b, postNum));
		} else if(isDocument) {
			const dForm = $q(aib.qDForm, data);
			if(dForm) {
				window.location.assign(aib.getThrUrl(aib.b, aib.getTNum(dForm)));
			}
		}
		return;
	}
	if(aib.t) {
		Post.clearMarks();
		Thread.first.loadNewPosts().then(() => AjaxError.Success, e => e).then(e => {
			infoLoadErrors(e);
			if(Cfg.scrAfterRep) {
				scrollTo(0, window.pageYOffset + Thread.first.last.el.getBoundingClientRect().top);
			}
			updater.continue(true);
			closePopup('upload');
		});
	} else {
		pByNum.get(tNum).thr.loadPosts(visPosts, false, false).then(() => closePopup('upload'));
	}
	pr.closeReply();
	pr.refreshCap();
}

async function checkDelete(data) {
	const err = getSubmitError(data instanceof HTMLDocument ? data : $DOM(data));
	if(err) {
		$popup('delete', Lng.errDelete[lang] + ':\n' + err);
		updater.sendErrNotif();
		return;
	}
	const els = $Q(`[de-form] ${ aib.qRPost } input:checked`);
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
		try {
			await Thread.first.loadNewPosts();
		} catch(e) {
			infoLoadErrors(e);
		}
	} else {
		await Promise.all(Array.from(threads, thr => thr.loadPosts(visPosts, false, false)));
	}
	$popup('delete', Lng.succDeleted[lang]);
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
			const newFileName = Cfg.removeFName ?
				' ' + fileName.substring(fileName.lastIndexOf('.')) : fileName;
			if((Cfg.postSameImg || Cfg.removeEXIF) && (
				value.type === 'image/jpeg' ||
				value.type === 'image/png' ||
				value.type === 'video/webm' && !aib.mak)
			) {
				const cleanData = cleanFile((await readFile(value)).data, el.obj ? el.obj.extraFile : null);
				if(!cleanData) {
					return Promise.reject(new Error(Lng.fileCorrupt[lang] + ': ' + fileName));
				}
				val = new File(cleanData, newFileName);
			} else if(Cfg.removeFName) {
				val = new File([value], newFileName);
			}
		}
		data.append(name, val);
	}
	const ajaxParams = { data, method: 'POST' };
	if(needProgress && hasFiles) {
		ajaxParams.onprogress = getUploadFunc();
	}
	try {
		const xhr = await $ajax(form.action, ajaxParams);
		return aib.jsonSubmit ? xhr.responseText : $DOM(xhr.responseText);
	} catch(err) {
		return Promise.reject(err);
	}
}

async function readFile(file, asText = false) {
	return new Promise(resolve => {
		const fr = new FileReader();
		// XXX: firefox hack to prevent 'XrayWrapper denied access to property "then"' errors
		fr.onload = e => resolve({ data: e.target.result });
		if(asText) {
			fr.readAsText(file);
		} else {
			fr.readAsArrayBuffer(file);
		}
	});
}

function cleanFile(data, extraData) {
	const img = nav.getUnsafeUint8Array(data);
	const rand = Cfg.postSameImg && String(Math.round(Math.random() * 1e6));
	const rv = extraData ?
		(rand ? [img, extraData, rand] : [img, extraData]) :
		(rand ? [img, rand] : [img]);
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
				} else if(img[i + 1] === 0xD8) {
					deep++;
					i++;
					continue;
				}
				if(img[i + 1] === 0xD9 && --deep === 0) {
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
		for(i = 0, len = img.length - 7; i < len && (
			img[i] !== 0x49 ||
			img[i + 1] !== 0x45 ||
			img[i + 2] !== 0x4E ||
			img[i + 3] !== 0x44
		); i++) /* empty */;
		i += 8;
		if(i !== len && (extraData || len - i <= 75)) {
			rv[0] = nav.getUnsafeUint8Array(data, 0, i);
		}
		return rv;
	}
	// WEBM
	if(img[0] === 0x1a && img[1] === 0x45 && img[2] === 0xDF && img[3] === 0xA3) {
		return new WebmParser(data).addData(rand).getData();
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
	for(let j = 0, tgLen = dv.getUint16(i, le); j < tgLen; j++) {
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
                 image/webm files in postform: preview, adding by url, drag-n-drop, deleting
=========================================================================================================== */

class Files {
	constructor(form, fileEl) {
		this.filesCount = 0;
		this.fileTd = $parent(fileEl, 'TD');
		this.onchange = null;
		this._form = form;
		const inputs = [];
		const els = $Q('input[type="file"]', this.fileTd);
		for(let i = 0, len = els.length; i < len; ++i) {
			inputs.push(new FileInput(this, els[i]));
		}
		this._inputs = inputs;
		this._files = [];
		this.hide();
	}
	get rarInput() {
		const value = $bEnd(docBody, '<input type="file" style="display: none;">');
		Object.defineProperty(this, 'rarInput', { value });
		return value;
	}
	get thumbsEl() {
		let value;
		if(aib.multiFile) {
			value = $add('<tr><td></td><td><div id="de-file-area"></div></td></tr>');
			$after(this.fileTd.parentNode, value);
		} else {
			value = $q(aib.tiny ? 'th' : 'td', $parent(this._form.txta, 'TR'));
			value.innerHTML = `<div style="display: none;">${ value.innerHTML }</div><div></div>`;
			value = value.lastChild;
		}
		Object.defineProperty(this, 'thumbsEl', { value });
		return value;
	}
	changeMode() {
		const cfg = Cfg.fileInputs === 2 && Cfg.ajaxPosting;
		for(const inp of this._inputs) {
			inp.changeMode(cfg);
		}
		this.hide();
	}
	clear() {
		for(const inp of this._inputs) {
			inp.clear();
		}
		this.hide();
	}
	hide() {
		for(let els = this._inputs, i = els.length - 1; i > 0; --i) {
			const inp = els[i];
			if(inp.hasFile) {
				break;
			} else if(els[i - 1].hasFile) {
				inp.show();
				break;
			}
			inp.hide();
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
		this._mediaEl = null;
		this._parent = parent;
		this._rarMsg = null;
		this._spoilEl = $q('input[type="checkbox"][name="spoiler"]', el.parentNode);
		this._thumb = null;
		this._utils = $add(`<div class="de-file-utils">
			<div class="de-file-btn-rar" title="${ Lng.helpAddFile[lang] }" style="display: none;"></div>
			<input class="de-file-spoil" type="checkbox" title="` +
				`${ Lng.spoilFile[lang] }" style="display: none;">
			<div class="de-file-btn-txt" title="${ Lng.addManually[lang] }"></div>
			<div class="de-file-btn-del" title="${ Lng.removeFile[lang] }" style="display: none;"></div>
		</div>`);
		[this._btnRarJpg, this._btnSpoil, this._btnTxt, this._btnDel] = [...this._utils.children];
		this._utils.addEventListener('click', this);
		this._txtWrap = $add(`<span class="de-file-txt-wrap">
			<input type="text" name="de-file-txt" class="de-file-txt-input de-file-txt-noedit" title="` +
				`${ Lng.youCanDrag[lang] }" placeholder="${ Lng.dropFileHere[lang] }">
			<input type="button" class="de-file-txt-add" value="+" title="` +
				`${ Lng.add[lang] }" style="display: none;"></span>`);
		[this._txtInput, this._txtAddBtn] = [...this._txtWrap.children];
		this._txtWrap.addEventListener('click', this);
		this._toggleDragEvents(this._txtWrap, true);
		if(Cfg.ajaxPosting) {
			$hide(el);
		}
		el.obj = this;
		el.classList.add('de-file-input');
		el.addEventListener('change', this);
		if(el.files && el.files[0]) {
			this._removeFile();
		}
		if(FileInput._isThumb) {
			this._initThumbs();
		} else {
			if(Cfg.fileInputs === 1 && Cfg.ajaxPosting) {
				$before(el, this._txtWrap);
			}
			$after(el, this._utils);
		}
	}
	changeMode(showThumbs) {
		if(!(showThumbs ^ !!this._thumb)) {
			return;
		}
		if(showThumbs) {
			this._initThumbs();
			return;
		}
		const el = this._txtWrap.parentNode.parentNode;
		$before(this._input, this._txtWrap);
		$after(this._input, this._utils);
		$del(el);
		$show(this._parent.fileTd.parentNode);
		$show(this._txtWrap);
		if(this._mediaEl) {
			window.URL.revokeObjectURL(this._mediaEl.src);
		}
		this._toggleDragEvents(this._thumb, false);
		$del(this._thumb);
		this._thumb = this._mediaEl = null;
	}
	clear() {
		if(FileInput._isThumb) {
			this._thumb.classList.add('de-file-off');
			if(this._mediaEl) {
				window.URL.revokeObjectURL(this._mediaEl.src);
				this._mediaEl.parentNode.title = Lng.youCanDrag[lang];
				$del(this._mediaEl);
				this._mediaEl = null;
			}
		}
		if(this._btnDel) {
			this._showDelBtn(false);
			$hide(this._btnSpoil);
			$hide(this._btnRarJpg);
			$hide(this._txtAddBtn);
			$del(this._rarMsg);
			if(FileInput._isThumb) {
				$hide(this._txtWrap);
			}
			this._txtInput.value = '';
			this._txtInput.classList.add('de-file-txt-noedit');
			this._txtInput.placeholder = Lng.dropFileHere[lang];
		}
		this.extraFile = this.imgFile = null;
		this._isTxtEditable = false;
		this._changeFilesCount(-1);
		this._removeFile();
	}
	handleEvent(e) {
		const el = e.target;
		const thumb = this._thumb;
		const isThumb = el === thumb || el.className === 'de-file-img';
		switch(e.type) {
		case 'change': {
			setTimeout(() => this._onFileChange(false), 20);
			const index = this._parent._inputs.indexOf(this);
			if(el.files.length > 0) {
				this._parent._files[index] = el.files[0];
			} else {
				delete this._parent._files[index];
			}
			DollchanAPI.notify('filechange', this._parent._files);
			return;
		}
		case 'click':
			if(isThumb) {
				this._input.click();
			} else if(el === this._btnDel) {
				this.clear();
				this._parent.hide();
				delete this._parent._files[this._parent._inputs.indexOf(this)];
				DollchanAPI.notify('filechange', this._parent._files);
			} else if(el === this._btnSpoil) {
				this._spoilEl.checked = this._btnSpoil.checked;
				return;
			} else if(el === this._btnRarJpg) {
				this._addRarJpeg();
			} else if(el === this._btnTxt) {
				this._showDelBtn((this._isTxtEditable = true));
				$show(this._txtAddBtn);
				if(FileInput._isThumb) {
					$toggle(this._txtWrap);
				}
				this._txtInput.classList.remove('de-file-txt-noedit');
				this._txtInput.placeholder = Lng.enterTheLink[lang];
				this._txtInput.focus();
			} else if(el === this._txtAddBtn) {
				this._addUrlFile(this._txtInput.value);
			} else if(el === this._txtInput && !this._isTxtEditable) {
				this._input.click();
				this._txtInput.blur();
			}
			e.stopPropagation();
			$pd(e);
			return;
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
				this._addUrlFile(dt.getData('text/plain'));
			}
			setTimeout(() => thumb.classList.remove('de-file-drag'), 10);
			e.stopPropagation();
			$pd(e);
		}
		}
	}
	hide() {
		if(FileInput._isThumb) {
			this._showDelBtn(false);
			$hide(this._thumb);
			$hide(this._txtWrap);
		}
		$hide(this._wrap);
	}
	show() {
		if(FileInput._isThumb) {
			$show(this._thumb);
		}
		$show(this._wrap);
	}

	static get _isThumb() {
		return Cfg.fileInputs === 2 && Cfg.ajaxPosting;
	}
	static _readDroppedFile(input, file) {
		readFile(file).then(({ data }) => {
			input.imgFile = [data, file.name, file.type];
			input.show();
			input._onFileChange(true);
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
		el.src = window.URL.createObjectURL(new Blob([fileData]));
		if((el = el.nextSibling)) {
			window.URL.revokeObjectURL(el.src);
			$del(el);
		}
	}
	_addRarJpeg() {
		const el = this._parent.rarInput;
		el.onchange = ({ target }) => {
			$hide(this._btnRarJpg);
			const myBtn = this._rarMsg = $aBegin(this._utils,
				'<span><svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg></span>');
			const file = target.files[0];
			readFile(file).then(({ data }) => {
				if(this._rarMsg === myBtn) {
					myBtn.className = 'de-file-rarmsg';
					const origFileName = this.imgFile ? this.imgFile[1] : this._input.files[0].name;
					myBtn.title = origFileName + ' + ' + file.name;
					myBtn.textContent = origFileName.split('.').pop() + ' + ' + file.name.split('.').pop();
					this.extraFile = data;
				}
			});
		};
		el.click();
	}
	_addUrlFile(url, file = null) {
		if(!url) {
			return Promise.reject(new Error('URL is null'));
		}
		$popup('file-loading', Lng.loading[lang], true);
		return downloadImgData(url, false).then(data => {
			if(file) {
				window.URL.revokeObjectURL(url);
			}
			if(!data) {
				$popup('file-loading', Lng.cantLoad[lang] + ' URL: ' + url);
				return;
			}
			closePopup('file-loading');
			this._isTxtEditable = false;
			let name = file ? file.name : url.split('/').pop();
			const type = file && file.type || getFileType(name);
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
			this.imgFile = [data.buffer, name, type || getFileType(name)];
			if(!file) {
				file = new Blob([data], { type: this.imgFile[2] });
				file.name = name;
			}
			this._parent._files[this._parent._inputs.indexOf(this)] = file;
			DollchanAPI.notify('filechange', this._parent._files);
			if(FileInput._isThumb) {
				$hide(this._txtWrap);
			}
			this._onFileChange(true);
		});
	}
	_changeFilesCount(val) {
		this._parent.filesCount = Math.max(this._parent.filesCount + val, 0);
		if(aib.dobr) {
			this._parent.fileTd.firstElementChild.value = this._parent.filesCount + 1;
		}
	}
	_initThumbs() {
		const fileTr = this._parent.fileTd.parentNode;
		$hide(fileTr);
		$hide(this._txtWrap);
		($q('.de-file-txt-area') || $bBegin(fileTr, `<tr class="de-file-txt-area">
			<td class="postblock"></td><td></td></tr>`)).lastChild.appendChild(this._txtWrap);
		this._thumb = $bEnd(this._parent.thumbsEl,
			`<div class="de-file de-file-off"><div class="de-file-img"><div class="de-file-img" title="${
				Lng.youCanDrag[lang] }"></div></div></div>`);
		this._thumb.addEventListener('click', this);
		this._thumb.addEventListener('dragenter', this);
		this._thumb.appendChild(this._utils);
		this._toggleDragEvents(this._thumb, true);
		if(this.hasFile) {
			this._showPviewImage();
		}
	}
	_onFileChange(hasImgFile) {
		this._txtInput.value = hasImgFile ? this.imgFile[1] : this._input.files[0].name;
		if(!hasImgFile) {
			this.imgFile = null;
		}
		if(this._parent.onchange) {
			this._parent.onchange();
		}
		if(FileInput._isThumb) {
			this._showPviewImage();
		}
		if(this.hasFile) {
			this.extraFile = null;
		} else {
			this.hasFile = true;
			this._changeFilesCount(+1);
			this._showDelBtn(true);
			$hide(this._txtAddBtn);
			if(FileInput._isThumb) {
				$hide(this._txtWrap);
			}
			if(this._spoilEl) {
				this._btnSpoil.checked = this._spoilEl.checked;
				$show(this._btnSpoil);
			}
			this._txtInput.classList.add('de-file-txt-noedit');
			this._txtInput.placeholder = Lng.dropFileHere[lang];
		}
		this._parent.hide();
		if(!nav.Presto && !aib.fch &&
			/^image\/(?:png|jpeg)$/.test(hasImgFile ? this.imgFile[2] : this._input.files[0].type)
		) {
			$del(this._rarMsg);
			$show(this._btnRarJpg);
		}
	}
	_removeFile() {
		const oldEl = this._input;
		const newEl = $aEnd(oldEl, oldEl.outerHTML);
		oldEl.removeEventListener('change', this);
		newEl.addEventListener('change', this);
		newEl.obj = this;
		this._input = newEl;
		$del(oldEl);
		this.hasFile = false;
		delete this._parent._files[this._parent._inputs.indexOf(this)];
	}
	_showDelBtn(isShow) {
		$toggle(this._btnDel, isShow);
		$toggle(this._btnTxt, !isShow);
	}
	_showPviewImage() {
		const { imgFile } = this;
		if(imgFile) {
			this._addNewThumb(...imgFile, imgFile[0].byteLength);
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
	_toggleDragEvents(el, add) {
		const name = add ? 'addEventListener' : 'removeEventListener';
		el[name]('dragover', $pd);
		el[name]('dragenter', this);
		el[name]('dragleave', this);
		el[name]('drop', this);
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
		this.parentEl = el.tagName === 'TR' ? el : $parent(el, 'TR');
		this.isAdded = false;
		this._isRecap = !!$q('[id*="recaptcha"], [class*="recaptcha"]', this.parentEl);
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
		} else if(this._isOldRecap()) {
			this.textEl = $id('recaptcha_response_field');
		} else {
			const el = $q(`#g-recaptcha, .g-recaptcha${ aib.fch ? ', #qrCaptchaContainerAlt' : '' }`);
			$replace(el, `<div id="g-recaptcha" class="g-recaptcha" data-sitekey="${
				el.getAttribute('data-sitekey') }"></div>`);
		}
		const initPromise = aib.initCaptcha ? aib.initCaptcha(this) : null;
		if(initPromise) {
			initPromise.then(() => this.showCaptcha(), e => {
				if(e instanceof AjaxError) {
					this._setUpdateError(e);
				} else {
					this.hasCaptcha = false;
				}
			});
		} else if(this.hasCaptcha) {
			this.showCaptcha(true);
		}
	}
	handleEvent(e) {
		switch(e.type) {
		case 'keypress': {
			if(!Cfg.captchaLang || e.which === 0) {
				return;
			}
			const ruUa = 'йцукенгшщзхъїфыівапролджэєячсмитьбюёґ';
			const en = "qwertyuiop[]]assdfghjkl;''zxcvbnm,.`\\";
			const code = e.charCode || e.keyCode;
			let i, chr = String.fromCharCode(code).toLowerCase();
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
			$txtInsert(e.target, chr);
			break;
		}
		case 'focus': this.updOutdated();
		}
		$pd(e);
		e.stopPropagation();
	}
	initImage(img) {
		img.title = Lng.refresh[lang];
		img.alt = Lng.loading[lang];
		img.style.cssText = 'vertical-align: text-bottom; border: none; cursor: pointer;';
		img.onclick = () => this.refreshCaptcha(true);
	}
	initTextEl() {
		this.textEl.autocomplete = 'off';
		if(!aib.kus && (aib.multiFile || Cfg.fileInputs !== 2)) {
			this.textEl.placeholder = Lng.cap[lang];
		}
		this.textEl.addEventListener('keypress', this);
		this.textEl.onkeypress = null;
		this.textEl.addEventListener('focus', this);
		this.textEl.onfocus = null;
	}
	showCaptcha(isUpdateImage = false) {
		if(!this.textEl) {
			$show(this.parentEl);
			if(aib.updateCaptcha) {
				aib.updateCaptcha(this, false);
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
			$replace(a, img);
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
		if(aib.updateCaptcha) {
			const updatePromise = aib.updateCaptcha(this, isErr);
			if(updatePromise) {
				updatePromise.then(() => this._updateTextEl(isFocus), e => this._setUpdateError(e));
			}
		} else if(this._isRecap) {
			this._updateRecap();
		} else if(this.textEl) {
			this._updateTextEl(isFocus);
			const img = $q('img', this.parentEl);
			if(!img) {
				return;
			}
			if(aib.getCaptchaSrc) {
				const src = img.getAttribute('src');
				if(src) {
					img.src = '';
					img.src = aib.getCaptchaSrc(src, tNum);
				}
			} else {
				img.click();
			}
		}
	}
	updateHelper(url, fn) {
		if(aib._capUpdPromise) {
			aib._capUpdPromise.cancel();
		}
		return (aib._capUpdPromise = $ajax(url).then(xhr => {
			aib._capUpdPromise = null;
			fn(xhr);
		}, e => {
			if(!(e instanceof CancelError)) {
				aib._capUpdPromise = null;
				return CancelablePromise.reject(e);
			}
		}));
	}
	updOutdated() {
		if(this._lastUpdate && (Date.now() - this._lastUpdate > Cfg.capUpdTime * 1e3)) {
			this.refreshCaptcha(false);
		}
	}

	_isOldRecap() {
		return !!$id('recaptcha_widget_div') || aib.fch && Cfg.cap4chanAlt && pr.tNum;
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
		if(this._isOldRecap()) {
			$script('Recaptcha.reload()');
		} else {
			const script = doc.createElement('script');
			script.type = 'text/javascript';
			script.src = aib.prot + '//www.google.com/recaptcha/api.js';
			doc.head.appendChild(script);
			setTimeout(() => $del(script), 1e5);
		}
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
	get hideBtn() {
		const value = this.btns.firstChild;
		Object.defineProperty(this, 'hideBtn', { value });
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
		const value = Cfg.addYouTube ? new Videos(this) : null;
		Object.defineProperty(this, 'videos', { value });
		return value;
	}
	addFuncs() {
		RefMap.upd(this, true);
		embedMediaLinks(this);
		if(Cfg.addImgs) {
			embedImagesLinks(this.el);
		}
	}
	handleEvent(e) {
		let temp, el = fixEventEl(e.target);
		const { type } = e;
		const isOutEvent = type === 'mouseout';
		const isPview = this instanceof Pview;
		if(type === 'click') {
			switch(e.button) {
			case 0: break;
			case 1: e.stopPropagation();
				/* falls through */
			default: return;
			}
			if(this._menu) {
				this._menu.remove();
				this._menu = null;
			}
			switch(el.tagName) {
			case 'A':
				if(el.classList.contains('de-video-link')) {
					this.videos.clickLink(el, Cfg.addYouTube);
					$pd(e);
					return;
				}
				if((temp = el.firstElementChild) && temp.tagName === 'IMG') {
					el = temp;
				} else {
					temp = el.parentNode;
					if(temp === this.trunc) {
						this._getFullMsg(temp, false);
						$pd(e);
						e.stopPropagation();
					} else if(Cfg.insertNum && pr.form &&
						this._pref === (aib.tiny ? el : temp) &&
						!/Reply|Ответ/.test(el.textContent)
					) {
						$pd(e);
						e.stopPropagation();
						if(!Cfg.showRepBtn) {
							quotetxt = window.getSelection().toString();
							pr.showQuickReply(isPview ? Pview.topParent : this, this.num, !isPview, false);
							quotetxt = '';
						} else if(pr.isQuick || (aib.t && pr.isHidden)) {
							pr.showQuickReply(isPview ? Pview.topParent : this, this.num, false, true);
						} else if(aib.t) {
							const formText = pr.txta.value;
							const isOnNewLine = formText === '' || formText.slice(-1) === '\n';
							$txtInsert(pr.txta, `>>${ this.num }${ isOnNewLine ? '\n' : '' }`);
						} else {
							window.location = el.href.replace(/#i/, '#');
						}
					} else if((temp = el.textContent)[0] === '>' &&
						temp[1] === '>' && !temp[2].includes('/')
					) {
						const post = pByNum.get(+temp.match(/\d+/));
						if(post) {
							post.selectAndScrollTo();
						}
					}
					return;
				}
				/* falls through */
			case 'IMG':
				if(el.classList.contains('de-video-thumb')) {
					if(Cfg.addYouTube === 3) {
						const { videos } = this;
						videos.currentLink.classList.add('de-current');
						videos.addPlayer(videos.playerInfo, el.classList.contains('de-ytube'));
						$pd(e);
					}
				} else if(Cfg.expandImgs !== 0) {
					this._clickImage(el, e);
				}
				return;
			case 'OBJECT':
			case 'VIDEO':
				if(Cfg.expandImgs !== 0 && !(
					Cfg.webmControl &&
					e.clientY > (el.getBoundingClientRect().top + parseInt(el.style.height, 10) - 30)
				)) {
					this._clickImage(el, e);
				}
				return;
			}
			if(aib.mak && el.classList.contains('expand-large-comment')) {
				this._getFullMsg(el, false);
				$pd(e);
				e.stopPropagation();
			}
			switch(el.classList[0]) {
			case 'de-btn-expthr': this.thr.loadPosts('all'); return;
			case 'de-btn-fav': this.thr.setFavorState(true, 'user'); return;
			case 'de-btn-fav-sel': this.thr.setFavorState(false, 'user'); return;
			case 'de-btn-hide':
			case 'de-btn-hide-user':
			case 'de-btn-unhide':
			case 'de-btn-unhide-user': this.setUserVisib(!this.hidden); return;
			case 'de-btn-rep':
				pr.showQuickReply(isPview ? Pview.topParent : this, this.num, !isPview, false);
				quotetxt = '';
				return;
			case 'de-btn-sage': Spells.add(9, '', false); return;
			case 'de-btn-stick': this.setSticky(true); return;
			case 'de-btn-stick-on': this.setSticky(false); return;
			}
			return;
		}
		if(!isOutEvent && Cfg.expandImgs &&
			el.tagName === 'IMG' &&
			!el.classList.contains('de-fullimg') &&
			(temp = this.images.getImageByEl(el)) &&
			(temp.isImage || temp.isVideo)
		) {
			el.title = Cfg.expandImgs === 1 ? Lng.expImgInline[lang] : Lng.expImgFull[lang];
		}
		if(!this._hasEvents) {
			this._hasEvents = true;
			this.el.addEventListener('click', this, true);
			this.el.addEventListener('mouseout', this, true);
		}
		switch(el.classList[0]) {
		case 'de-post-btns': el.removeAttribute('title'); return;
		case 'de-btn-rep':
			this.btns.title = Lng.replyToPost[lang];
			if(!isOutEvent) {
				quotetxt = window.getSelection().toString();
			}
			return;
		case 'de-btn-hide':
		case 'de-btn-hide-user':
		case 'de-btn-unhide':
		case 'de-btn-unhide-user':
			this.btns.title = Lng.togglePost[lang];
			if(Cfg.menuHiddBtn && !(this instanceof Pview)) {
				this._addMenu(el, isOutEvent, this._getMenuHide(el));
			}
			return;
		case 'de-btn-expthr':
			this.btns.title = Lng.expandThr[lang];
			if(!(this instanceof Pview)) {
				this._addMenu(el, isOutEvent, $join(Lng.selExpandThr[lang],
					'<span class="de-menu-item" info="thr-exp">', '</span>'));
			}
			return;
		case 'de-btn-fav': this.btns.title = Lng.addFav[lang]; return;
		case 'de-btn-fav-sel': this.btns.title = Lng.delFav[lang]; return;
		case 'de-btn-sage': this.btns.title = 'SAGE'; return;
		case 'de-btn-stick': this.btns.title = Lng.attachPview[lang]; return;
		case 'de-btn-src': this._addMenu(el, isOutEvent, AbstractPost._getMenuImgSrc(el)); return;
		default:
			if(!Cfg.linksNavig || el.tagName !== 'A' || el.lchecked) {
				return;
			}
			if(!el.textContent.startsWith('>>')) {
				el.lchecked = true;
				return;
			}
			// Don't use classList here, 'de-link-pref ' should be first
			el.className = 'de-link-pref ' + el.className;
			/* falls through */
		case 'de-link-ref':
		case 'de-link-pref':
			if(!Cfg.linksNavig) {
				return;
			}
			if(isOutEvent) { // We need to delete previews
				clearTimeout(this._linkDelay);
				if(!(aib.getPostOfEl(fixEventEl(e.relatedTarget)) instanceof Pview) && Pview.top) {
					Pview.top.markToDel(); // If cursor is not over one of previews - delete all previews
				} else if(this.kid) {
					this.kid.markToDel(); // If cursor is over any preview - delete its kids
				}
			} else { // We need to show a preview for this link
				this._linkDelay = setTimeout(() => (this.kid = Pview.show(this, el)), Cfg.linksOver);
			}
			$pd(e);
			e.stopPropagation();
		}
	}
	setFavBtn(state) {
		const el = $q(state ? '.de-btn-fav' : '.de-btn-fav-sel', this.btns);
		if(el) {
			el.setAttribute('class', state ? 'de-btn-fav-sel' : 'de-btn-fav');
		}
	}
	updateMsg(newMsg, sRunner) {
		let videoExt, videoLinks;
		const origMsg = aib.dobr ? this.msg.firstElementChild : this.msg;
		if(Cfg.addYouTube) {
			videoExt = $q('.de-video-ext', origMsg);
			videoLinks = $Q(':not(.de-video-ext) > .de-video-link', origMsg);
		}
		$replace(origMsg, newMsg);
		Object.defineProperties(this, {
			msg   : { configurable: true, value: newMsg },
			trunc : { configurable: true, value: null }
		});
		Post.Сontent.remove(this);
		if(Cfg.addYouTube) {
			this.videos.updatePost(videoLinks, $Q('a[href*="youtu"], a[href*="vimeo.com"]', newMsg), false);
			if(videoExt) {
				newMsg.appendChild(videoExt);
			}
		}
		this.addFuncs();
		sRunner.run(this);
		closePopup('load-fullmsg');
	}

	static _getMenuImgSrc(el) {
		const link = el.nextSibling;
		const p = encodeURIComponent(link.getAttribute('de-href') || link.href) +
			'" target="_blank">' + Lng.searchIn[lang];
		return `<a class="de-menu-item ${ [
			`de-src-google" href="https://www.google.com/searchbyimage?image_url=${ p }Google`,
			`de-src-yandex" href="http://yandex.ru/images/search?rpt=imageview&img_url=${ p }Yandex`,
			`de-src-tineye" href="http://tineye.com/search/?url=${ p }TinEye`,
			`de-src-saucenao" href="http://saucenao.com/search.php?url=${ p }SauceNAO`,
			`de-src-iqdb" href="http://iqdb.org/?url=${ p }IQDB`,
			`de-src-whatanime" href="http://whatanime.ga/?auto&url=${
				aib.iichan ? 'http://reho.st/' + p : p }WhatAnime`
		].join('</a><a class="de-menu-item ') }</a>`;
	}
	_addMenu(el, isOutEvent, html) {
		if(this.menu && this.menu.parentEl === el) {
			return;
		}
		if(isOutEvent) {
			clearTimeout(this._menuDelay);
		} else {
			this._menuDelay = setTimeout(() => this._showMenu(el, html), Cfg.linksOver);
		}
	}
	_clickImage(el, e) {
		const data = this.images.getImageByEl(el);
		if(!data || (!data.isImage && !data.isVideo)) {
			return;
		}
		data.expand((Cfg.expandImgs === 1) ^ e.ctrlKey, e);
		$pd(e);
		e.stopPropagation();
	}
	_getFullMsg(el, isInit) {
		if(aib.delTruncMsg) {
			aib.delTruncMsg(this, el, isInit);
			return;
		}
		if(!isInit) {
			$popup('load-fullmsg', Lng.loading[lang], true);
		}
		ajaxLoad(aib.getThrUrl(aib.b, this.tNum)).then(form => {
			const maybeSpells = new Maybe(SpellsRunner);
			if(this.isOp) {
				this.updateMsg(aib.fixHTML(doc.adoptNode($q(aib.qPostMsg, form))), maybeSpells.value);
				$del(el);
			} else {
				const els = $Q(aib.qRPost, form);
				for(let i = 0, len = els.length; i < len; i++) {
					if(this.num === aib.getPNum(els[i])) {
						this.updateMsg(
							aib.fixHTML(doc.adoptNode($q(aib.qPostMsg, els[i]))),
							maybeSpells.value);
						$del(el);
						break;
					}
				}
			}
			maybeSpells.end();
		}, emptyFn);
	}
	_showMenu(el, html) {
		if(this._menu) {
			this._menu.remove();
		}
		this._menu = new Menu(el, html, el => this._clickMenu(el), false);
		this._menu.onremove = () => (this._menu = null);
	}
}

class Post extends AbstractPost {
	constructor(el, thr, num, count, isOp, prev) {
		super(thr, num, isOp);
		this.count = count;
		this.deleted = false;
		this.el = el;
		this.hidden = false;
		this.next = null;
		this.omitted = false;
		this.prev = prev;
		this.spellHidden = false;
		this.userToggled = false;
		this.viewed = false;
		this._selRange = null;
		this._selText = '';
		if(prev) {
			prev.next = this;
		}
		pByEl.set(el, this);
		pByNum.set(num, this);
		if(MyPosts.has(num)) {
			this.el.classList.add('de-mypost');
		}
		const refEl = $q(aib.qPostRef, el);
		let html = `<span class="de-post-btns${ isOp ? '' : ' de-post-counter' }">` +
			'<svg class="de-btn-hide"><use class="de-btn-hide-use" xlink:href="#de-symbol-post-hide"/>' +
			'<use class="de-btn-unhide-use" xlink:href="#de-symbol-post-unhide"/></svg>' +
			'<svg class="de-btn-rep"><use xlink:href="#de-symbol-post-rep"/></svg>';
		this._pref = refEl;
		if(isOp) {
			if(!aib.t) {
				html += '<svg class="de-btn-expthr"><use xlink:href="#de-symbol-post-expthr"/></svg>';
			}
			html += '<svg class="de-btn-fav"><use xlink:href="#de-symbol-post-fav"/></svg>';
		}
		this.sage = aib.getSage(el);
		if(this.sage) {
			html += '<svg class="de-btn-sage"><use xlink:href="#de-symbol-post-sage"/></svg>';
		}
		this.btns = $aEnd(refEl, html + '</span>');
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
			$each($Q('.de-new-post'), el => el.classList.remove('de-new-post'));
			doc.removeEventListener('click', Post.clearMarks, true);
		}
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
				HiddenPosts.remove(curPost.num);
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
	static hideContent(headerEl, hideBtn, isUser, hide) {
		if(hide) {
			if(aib.t) {
				Thread.first.hidCounter++;
			}
			hideBtn.setAttribute('class', isUser ? 'de-btn-unhide-user' : 'de-btn-unhide');
			if(headerEl) {
				for(let el = headerEl.nextElementSibling; el; el = el.nextElementSibling) {
					el.classList.add('de-post-hiddencontent');
				}
			}
		} else {
			hideBtn.setAttribute('class', isUser ? 'de-btn-hide-user' : 'de-btn-hide');
			$each($Q('.de-post-hiddencontent', headerEl.parentNode),
				el => el.classList.remove('de-post-hiddencontent'));
		}
	}
	get banned() {
		const value = aib.getBanId(this.el);
		Object.defineProperty(this, 'banned', { value, writable: true });
		return value;
	}
	get bottom() {
		return (this.isOp && this.hidden ? this.thr.el.previousElementSibling : this.el)
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
		while(post && post.deleted) {
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
		return this.thr.thrId;
	}
	get top() {
		return (this.isOp && this.hidden ? this.thr.el.previousElementSibling : this.el)
			.getBoundingClientRect().top;
	}
	get wrap() {
		return new Post.Сontent(this).wrap;
	}
	addFuncs() {
		super.addFuncs();
		if(isExpImg) {
			this.toggleImages(true);
		}
	}
	delete(removeEl) {
		if(removeEl) {
			$del(this.wrap);
			pByEl.delete(this.el);
			pByNum.delete(this.num);
			if(this.hidden) {
				this.ref.unhide();
			}
			RefMap.upd(this, false);
			if((this.prev.next = this.next)) {
				this.next.prev = this.prev;
			}
		} else {
			this.deleted = true;
			this.btns.classList.remove('de-post-counter');
			this.btns.classList.add('de-post-deleted');
			this.el.classList.add('de-post-removed');
			this.wrap.classList.add('de-wrap-removed');
			($q('input[type="checkbox"]', this.el) || {}).disabled = true;
		}
	}
	getAdjacentVisPost(toUp) {
		let post = toUp ? this.prev : this.next;
		while(post) {
			if(post.thr.hidden) {
				post = toUp ? post.thr.op.prev : post.thr.last.next;
			} else if(post.hidden || post.omitted) {
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
			}
		} else {
			Post.hideContent(this.headerEl, this.hideBtn, this.userToggled, needToHide);
		}
	}
	select() {
		if(this.isOp) {
			if(this.hidden) {
				this.thr.el.previousElementSibling.classList.add('de-selected');
			}
			this.thr.el.classList.add('de-selected');
		} else {
			this.el.classList.add('de-selected');
		}
	}
	selectAndScrollTo(scrollNode = this.el) {
		scrollTo(0, window.pageYOffset + scrollNode.getBoundingClientRect().top -
			Post.sizing.wHeight / 2 + scrollNode.clientHeight / 2);
		if(HotKeys.enabled) {
			if(HotKeys.cPost) {
				HotKeys.cPost.unselect();
			}
			HotKeys.cPost = this;
			HotKeys.lastPageOffset = window.pageYOffset;
		} else {
			const el = $q('.de-selected');
			if(el) {
				el.unselect();
			}
		}
		this.select();
	}
	setUserVisib(hide, save = true, note = null) {
		this.userToggled = true;
		this.setVisib(hide, note);
		if(this.isOp || this.hidden === hide) {
			this.hideBtn.setAttribute('class', hide ? 'de-btn-unhide-user' : 'de-btn-hide-user');
		}
		if(save) {
			HiddenPosts.set(this.num, this.thr.num, hide);
			if(this.isOp) {
				if(hide) {
					HiddenThreads.set(this.num, this.num, this.title);
				} else {
					HiddenThreads.remove(this.num);
				}
			}
			locStorage['__de-post'] = JSON.stringify({
				hide,
				brd    : aib.b,
				num    : this.num,
				thrNum : this.thr.num,
				title  : this.isOp ? this.title : ''
			});
			locStorage.removeItem('__de-post');
		}
		if(hide) {
			this.ref.hide();
		} else {
			this.ref.unhide();
		}
	}
	setVisib(hide, note = null) {
		if(this.hidden === hide) {
			if(hide && note) {
				this.note.set(note);
			}
			return;
		}
		if(this.isOp) {
			this.thr.hidden = hide;
		} else {
			if(Cfg.delHiddPost === 1 || Cfg.delHiddPost === 2) {
				if(hide) {
					this.wrap.classList.add('de-hidden');
				} else {
					this.wrap.classList.remove('de-hidden');
				}
			} else {
				this._pref.onmouseover = this._pref.onmouseout = !hide ? null : e => {
					const yOffset = window.pageYOffset;
					this.hideContent(e.type === 'mouseout');
					scrollTo(window.pageXOffset, yOffset);
				};
			}
		}
		if(Cfg.strikeHidd) {
			setTimeout(() => this._strikePostNum(hide), 50);
		}
		if(hide) {
			this.note.set(note);
		} else {
			this.note.hide();
		}
		this.hidden = hide;
		this.hideContent(hide);
	}
	spellHide(note) {
		this.spellHidden = true;
		if(!this.userToggled) {
			this.setVisib(true, note);
			this.ref.hide();
		}
	}
	spellUnhide() {
		this.spellHidden = false;
		if(!this.userToggled) {
			this.setVisib(false);
			this.ref.unhide();
		}
	}
	toggleImages(expand = !this.images.expanded) {
		for(const image of this.images) {
			if(image.isImage && (image.expanded ^ expand)) {
				if(expand) {
					image.expand(true, null);
				} else {
					image.collapse(null);
				}
			}
		}
	}
	unselect() {
		if(this.isOp) {
			const el = $id('de-thr-hid-' + this.num);
			if(el) {
				el.classList.remove('de-selected');
			}
			this.thr.el.classList.remove('de-selected');
		} else {
			this.el.classList.remove('de-selected');
		}
	}

	_clickMenu(el) {
		const { hidden } = this;
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
					Spells.add(1 /* #exp */,
						`/${ quoteReg(this._selText).replace(/\r?\n/g, '\\n') }/`, false);
				} else {
					Spells.add(0 /* #words */, this._selText.toLowerCase(), false);
				}
			} else {
				dummy.innerHTML = '';
				dummy.appendChild(this._selRange.cloneContents());
				Spells.add(2 /* #exph */,
					`/${ quoteReg(dummy.innerHTML.replace(/^<[^>]+>|<[^>]+>$/g, '')) }/`, false);
			}
			return;
		}
		case 'hide-name': Spells.add(6 /* #name */, this.posterName, false); return;
		case 'hide-trip': Spells.add(7 /* #trip */, this.posterTrip, false); return;
		case 'hide-img': {
			const { weight: w, width: wi, height: h } = this.images.firstAttach;
			Spells.add(8 /* #img */, [0, [w, w], [wi, wi, h, h]], false);
			return;
		}
		case 'hide-imgn':
			Spells.add(3 /* #imgn */, `/${ quoteReg(this.images.firstAttach.name) }/`, false);
			return;
		case 'hide-ihash':
			ImagesHashStorage.getHash(this.images.firstAttach).then(hash => {
				if(hash !== -1) {
					Spells.add(4 /* #ihash */, hash, false);
				}
			});
			return;
		case 'hide-noimg': Spells.add(0x108 /* (#all & !#img) */, '', true); return;
		case 'hide-text': {
			const { num } = this;
			const words = Post.getWrds(this.text);
			for(let post = Thread.first.op; post; post = post.next) {
				Post.findSameText(num, hidden, words, post);
			}
			return;
		}
		case 'hide-notext': Spells.add(0x10B /* (#all & !#tlen) */, '', true); return;
		case 'hide-refs':
			if(hidden) {
				this.ref.unhide(true);
			} else {
				this.ref.hide(true);
			}
			this.setUserVisib(!hidden);
			return;
		case 'thr-exp': {
			const task = parseInt(el.textContent.match(/\d+/), 10);
			this.thr.loadPosts(!task ? 'all' : task === 10 ? 'more' : task);
		}
		}
	}
	_getMenuHide() {
		let str = '';
		const sel = window.getSelection();
		const ssel = sel.toString().trim();
		const getItem = name => `<span info="hide-${ name }" class="de-menu-item">${
			Lng.selHiderMenu[name][lang] }</span>`;
		if(ssel) {
			this._selText = ssel;
			this._selRange = sel.getRangeAt(0);
			str += getItem('sel');
		}
		if(this.posterName) {
			str += getItem('name');
		}
		if(this.posterTrip) {
			str += getItem('trip');
		}
		if(this.images.hasAttachments) {
			str += getItem('img');
			str += getItem('imgn');
			str += getItem('ihash');
		} else {
			str += getItem('noimg');
		}
		if(this.text) {
			str += getItem('text');
		} else {
			str += getItem('notext');
		}
		if(!Cfg.hideRefPsts && this.ref.hasMap) {
			str += getItem('refs');
		}
		return str;
	}
	_strikePostNum(isHide) {
		const { num } = this;
		if(isHide) {
			Post.hiddenNums.add(+num);
		} else {
			Post.hiddenNums.delete(+num);
		}
		$each($Q(`[de-form] a[href*="${ aib.anchor + num }"]`), isHide ? function(el) {
			el.classList.add('de-link-hid');
			if(Cfg.removeHidd && el.classList.contains('de-link-ref')) {
				const refmap = el.parentNode;
				if(!$q('.de-link-ref:not(.de-link-hid)', refmap)) {
					$hide(refmap);
				}
			}
		} : function(el) {
			el.classList.remove('de-link-hid');
			if(Cfg.removeHidd && el.classList.contains('de-link-ref')) {
				const refmap = el.parentNode;
				if($q('.de-link-ref:not(.de-link-hid)', refmap)) {
					$show(refmap);
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
		if(this._inited) {
			return;
		}
		this._inited = true;
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
			.replace(/&gt;/g, '>')
			.replace(/&lt;/g, '<')
			.replace(/&nbsp;/g, '\u00A0').trim();
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
	hide() {
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
			this.hide();
		}
	}
	set(note) {
		this.text = note;
		let text;
		if(this.isHideThr) {
			this._aEl.onmouseover = this._aEl.onmouseout = e => this._post.hideContent(e.type === 'mouseout');
			this._aEl.onclick = e => {
				$pd(e);
				this._post.setUserVisib(!this._post.hidden);
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
		const value = window.devicePixelRatio || 1;
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

class PostImages {
	constructor(post) {
		let first = null, last = null, els = $Q(aib.qPostImg, post.el);
		let hasAttachments = false;
		const filesMap = new Map();
		for(let i = 0, len = els.length; i < len; ++i) {
			const el = els[i];
			last = new Attachment(post, el, last);
			filesMap.set(el, last);
			hasAttachments = true;
			if(!first) {
				first = last;
			}
		}
		if(Cfg.addImgs) {
			els = $Q('.de-img-pre', post.el);
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

/* ==[ PostPreviews.js ]======================================================================================
                                                POST PREVIEWS
=========================================================================================================== */

class Pview extends AbstractPost {
	constructor(parent, link, pNum, tNum) {
		super(parent.thr, pNum, pNum === tNum);
		this.isSticky = false;
		this.parent = parent;
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
			this._showPost(post);
			return;
		}
		this._isCached = true;
		this._brd = link.pathname.match(/^\/?(.+\/)/)[1].replace(aib.res, '').replace(/\/$/, '');
		if(PviewsCache.has(this._brd + tNum)) {
			post = PviewsCache.get(this._brd + tNum).getPost(pNum);
			if(post) {
				this._showPost(post);
			} else {
				this._showPview(this.el = $add(`<div class="${ aib.cReply } de-pview-info de-pview">
					${ Lng.postNotFound[lang] }</div>`));
			}
			return;
		}
		this._showPview(this.el = $add(`<div class="${ aib.cReply } de-pview-info de-pview">
			<svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg>${ Lng.loading[lang] }</div>`));

		// Get post preview via ajax. Uses json if available.
		this._loadPromise = ajaxPostsLoad(this._brd, tNum, false).then(
			pBuilder => {
				if(aib.JsonBuilder) {
					const html = [];
					for(let i = 0, len = pBuilder.length + 1; i < len; ++i) {
						html.push(pBuilder.getPostHTML(i - 1)); // pBuilder.getPostHTML(-1) is oppost
					}
					this._onload($add(`<div>${ aib.fixHTML(html.join('')) }</div>`));
				} else {
					this._onload(pBuilder._form);
				}
			},
			e => this._onerror(e));
	}
	static get topParent() {
		return Pview.top ? Pview.top.parent : null;
	}
	static show(parent, link) {
		const tNum = +(link.pathname.match(/.+?\/[^\d]*(\d+)/) || [0, aib.getPostOfEl(link).tNum])[1];
		const pNum = +(link.textContent.trim().match(/\d+$/) || [tNum])[0];
		const isTop = !(parent instanceof Pview);
		let pv = isTop ? Pview.top : parent.kid;
		clearTimeout(Pview._delTO);
		if(pv && pv.num === pNum) {
			if(pv.kid) {
				pv.kid.delete();
			}
			if(pv._link !== link) {
				// If cursor hovers new link with the same number - move old preview here
				pv._setPosition(link, Cfg.animation);
				pv._link.classList.remove('de-link-parent');
				link.classList.add('de-link-parent');
				pv._link = link;
				if(pv.parent.num !== parent.num) {
					$each($Q('.de-link-pview', pv.el), function(el) {
						el.classList.remove('de-link-pview');
					});
					Pview._markLink(pv.el, parent.num);
				}
			}
			pv.parent = parent;
		} else if(!Cfg.noNavigHidd || !pByNum.has(pNum) || !pByNum.get(pNum).hidden) {
			// Show new preview under new link
			if(pv) {
				pv.delete();
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
		if(parent.omitted) {
			pv.delete();
			return;
		}
		if(parent.thr.loadCount === 1 && !parent.el.contains(pv._link)) {
			const el = parent.ref.getElByNum(pv.num);
			if(el) {
				pv._link = el;
			} else {
				pv.delete();
				return;
			}
		}
		const cr = parent.hidden ? parent : pv._link.getBoundingClientRect();
		const diff = pv._isTop ?
			pv._offsetTop - window.pageYOffset - cr.bottom :
			pv._offsetTop + pv.el.offsetHeight - window.pageYOffset - cr.top;
		if(Math.abs(diff) > 1) {
			if(scroll) {
				scrollTo(window.pageXOffset, window.pageYOffset - diff);
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
	delete() {
		this.parent.kid = null;
		this._link.classList.remove('de-link-parent');
		if(Pview.top === this) {
			Pview.top = null;
		}
		if(this._loadPromise) {
			this._loadPromise.cancel();
			this._loadPromise = null;
		}
		let vPost = Attachment.viewer && Attachment.viewer.data.post;
		let pv = this;
		do {
			clearTimeout(pv._readDelay);
			if(vPost === pv) {
				Attachment.viewer.close(null);
				Attachment.viewer = vPost = null;
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
		let lastSticky = null, pv = this;
		do {
			if(pv.isSticky) {
				lastSticky = pv;
			}
		} while((pv = pv.kid));
		if(!lastSticky) {
			this.delete();
		} else if(lastSticky.kid) {
			lastSticky.kid.delete();
		}
	}
	handleEvent(e) {
		const pv = e.target;
		if(e.type === 'animationend' && pv.style.animationName) {
			pv.classList.remove('de-pview-anim');
			pv.style.cssText = this._newPos;
			this._newPos = null;
			$each($Q('.de-css-move', doc.head), $del);
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
			const el = fixEventEl(e.relatedTarget);
			if(!el ||
				isOverEvent && (el.tagName !== 'A' || el.lchecked) ||
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
	setSticky(val) {
		this.stickBtn.setAttribute('class', val ? 'de-btn-stick-on' : 'de-btn-stick');
		this.isSticky = val;
	}
	setUserVisib() {
		const post = pByNum.get(this.num);
		post.setUserVisib(!post.hidden);
		Pview.updatePosition(true);
		$each($Q(`.de-btn-pview-hide[de-num="${ this.num }"]`), el => {
			if(post.hidden) {
				el.setAttribute('class', 'de-btn-unhide-user de-btn-pview-hide');
				el.parentNode.classList.add('de-post-hide');
			} else {
				el.setAttribute('class', 'de-btn-hide-user de-btn-pview-hide');
				el.parentNode.classList.remove('de-post-hide');
			}
		});
	}

	static _markLink(el, num) {
		$each($Q(`a[href*="${ num }"]`, el), function(el) {
			if(el.textContent.startsWith('>>' + num)) {
				el.classList.add('de-link-pview');
			}
		});
	}
	_onerror(e) {
		if(!(e instanceof CancelError)) {
			this.el.innerHTML = (e instanceof AjaxError) && e.code === 404 ?
				Lng.postNotFound[lang] : getErrorMessage(e);
		}
	}
	_onload(form) {
		const b = this._brd;
		const { num } = this.parent;
		const post = new PviewsCache(doc.adoptNode(form), b, this.tNum).getPost(this.num);
		if(post && (aib.b !== b || !post.ref.hasMap || !post.ref.has(num))) {
			(post.ref.hasMap ? $q('.de-refmap', post.el) : $aEnd(post.msg, '<div class="de-refmap"></div>'))
				.insertAdjacentHTML('afterbegin', `<a class="de-link-ref" href="${
					aib.getThrUrl(b, this.parent.tNum) + aib.anchor + num }">&gt;&gt;${
					aib.b === b ? '' : `/${ aib.b }/` }${ num }</a><span class="de-refcomma">, </span>`);
		}
		if(post) {
			this._showPost(post);
		} else {
			this.el.innerHTML = Lng.postNotFound[lang];
		}
	}
	_setPosition(link, isAnim) {
		let oldCSS;
		const cr = link.getBoundingClientRect();
		const offX = cr.left + window.pageXOffset + cr.width / 2;
		const offY = cr.top;
		const bWidth = nav.viewportWidth();
		const isLeft = offX < bWidth / 2;
		const pv = this.el;
		const tmp = (isLeft ? offX : offX - Math.min(parseInt(pv.offsetWidth, 10), offX - 10));
		const lmw = `max-width:${ bWidth - tmp - 10 }px; left:${ tmp }px;`;
		if(isAnim) {
			oldCSS = pv.style.cssText;
			pv.style.cssText = 'opacity: 0; ' + lmw;
		} else {
			pv.style.cssText = lmw;
		}
		let top = pv.offsetHeight;
		const isTop = offY + top + cr.height < nav.viewportHeight() || offY - top < 5;
		top = window.pageYOffset + (isTop ? offY + cr.height : offY - top);
		this._offsetTop = top;
		this._isLeft = isLeft;
		this._isTop = isTop;
		if(!isAnim) {
			pv.style.top = top + 'px';
			return;
		}
		const uId = 'de-movecss-' + Math.round(Math.random() * 1e3);
		$css(`@keyframes ${ uId } { to { ${ lmw } top:${ top }px; } }`).className = 'de-css-move';
		if(this._newPos) {
			pv.style.cssText = this._newPos;
			pv.removeEventListener('animationend', this);
		} else {
			pv.style.cssText = oldCSS;
		}
		this._newPos = `${ lmw } top:${ top }px;`;
		pv.addEventListener('animationend', this);
		pv.classList.add('de-pview-anim');
		pv.style.animationName = uId;
	}
	_showMenu(el, html) {
		super._showMenu(el, html);
		this._menu.onover = () => this.mouseEnter();
		this._menu.onout = () => this.markToDel();
	}
	_showPost(post) {
		if(this.el) {
			$del(this.el);
		}
		const pviewEl = this.el = post.el.cloneNode(true);
		const isMyPost = Cfg.markMyPosts && MyPosts.has(this.num);
		pByEl.set(pviewEl, this);
		pviewEl.className = `${ aib.cReply } de-pview${
			post.viewed ? ' de-viewed' : '' }${ isMyPost ? ' de-mypost' : '' }`;
		$show(pviewEl);
		$each($Q('.de-post-hiddencontent', pviewEl), node => node.classList.remove('de-post-hiddencontent'));
		if(Cfg.linksNavig) {
			Pview._markLink(pviewEl, this.parent.num);
		}
		this._pref = $q(aib.qPostRef, pviewEl);
		this._link.classList.add('de-link-parent');
		const pText = `<svg class="de-btn-rep"><use xlink:href="#de-symbol-post-rep"/></svg>${
			post.sage ? '<svg class="de-btn-sage"><use xlink:href="#de-symbol-post-sage"/></svg>' : ''
		}<svg class="de-btn-stick"><use xlink:href="#de-symbol-post-stick"/></svg>${
			post.deleted ? '' : `<span class="de-post-counter-pview">${
				post.isOp ? 'OP' : post.count + +!aib.JsonBuilder }${ isMyPost ? ' (You)' : '' }</span>` }`;
		if(post instanceof CacheItem) {
			this.btns = $aEnd(this._pref, `<span class="de-post-btns">${ pText }</span>`);
			embedMediaLinks(this);
			if(Cfg.addYouTube) {
				new VideosParser().parse(this).end();
			}
			if(Cfg.addImgs) {
				embedImagesLinks(pviewEl);
			}
			processImagesLinks(pviewEl);
		} else {
			let el = this._pref.nextSibling;
			this.btns = el;
			this.isOp = post.isOp;
			el.classList.remove('de-post-counter');
			if(post.hidden) {
				el.classList.add('de-post-hide');
			}
			el.innerHTML = `<svg class="de-btn-${ post.hidden ? 'unhide' : 'hide' }${
				post.userToggled ? '-user' : '' } de-btn-pview-hide" de-num="${ this.num }"><!--
				--><use class="de-btn-hide-use" xlink:href="#de-symbol-post-hide"/><!--
				--><use class="de-btn-unhide-use" xlink:href="#de-symbol-post-unhide"/></svg>${ pText }`;
			$each($Q(`${ !aib.t && post.isOp ? aib.qOmitted + ', ' : '' }.de-fullimg-wrap, .de-fullimg-after`,
				pviewEl), $del);
			$each($Q(aib.qPostImg, pviewEl), img => $show(img.parentNode));
			el = $q('.de-link-parent', pviewEl);
			if(el) {
				el.classList.remove('de-link-parent');
			}
			if(Cfg.addYouTube && post.videos.hasLinks) {
				if(post.videos.playerInfo !== null) {
					Object.defineProperty(this, 'videos',
						{ value: new Videos(this, $q('.de-video-obj', pviewEl), post.videos.playerInfo) });
				}
				this.videos.updatePost($Q('.de-video-link', post.el), $Q('.de-video-link', pviewEl), true);
			}
			if(Cfg.addImgs) {
				$each($Q('.de-img-pre', pviewEl), $show);
			}
			if(Cfg.markViewed) {
				this._readDelay = setTimeout(function(post) {
					if(!post.viewed) {
						post.el.classList.add('de-viewed');
						post.viewed = true;
					}
					const arr = (sesStorage['de-viewed'] || '').split(',');
					arr.push(post.num);
					sesStorage['de-viewed'] = arr;
				}, post.text.length > 100 ? 2e3 : 500, post);
			}
		}
		pviewEl.addEventListener('click', this, true);
		this._showPview(pviewEl);
	}
	_showPview(el) {
		el.addEventListener('mouseover', this, true);
		el.addEventListener('mouseout', this, true);
		this.thr.form.el.appendChild(el);
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
	constructor(el, count) {
		this.count = count;
		this.el = el;
		this.deleted = false;
		this.isOp = count === 0;
		this.itemInited = false;
		this.viewed = false;
	}
	get msg() {
		const value = $q(aib.qPostMsg, this.el);
		Object.defineProperty(this, 'msg', { value, configurable: true });
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
}

class PviewsCache extends TemporaryContent {
	constructor(form, b, tNum) {
		super(b + tNum);
		if(this._inited) {
			return;
		}
		this._inited = true;
		const pByNum = new Map();
		const thr = $q(aib.qThread, form) || form;
		const posts = $Q(aib.qRPost + ', ' + aib.qOPost, thr);
		for(let i = 0, len = posts.length; i < len; ++i) {
			const post = posts[i];
			pByNum.set(aib.getPNum(post), new CacheItem(post, i + 1));
		}
		pByNum.set(tNum, this._opObj = new CacheItem(aib.getOp(thr), 0));
		this._b = b;
		this._tNum = tNum;
		this._tUrl = aib.getThrUrl(b, tNum);
		this._posts = pByNum;
		if(Cfg.linksNavig) {
			RefMap.gen(pByNum, this._tUrl);
		}
	}
	getPost(num) {
		const post = this._posts.get(num);
		if(!post || post.itemInited) {
			return post;
		}
		if(num === this._tNum && this._b === aib.b && pByNum.has(this._tNum)) {
			post.ref.makeUnion(pByNum.get(this._tNum).ref);
		}
		post.el = aib.fixHTML(post.el);
		delete post.msg;
		if(post.ref.hasMap) {
			post.ref.init(this._tUrl, Cfg.strikeHidd && Post.hiddenNums.size !== 0 ? Post.hiddenNums : null);
		}
		post.itemInited = true;
		return post;
	}
}
PviewsCache.purgeSecs = 3e5;

/* ==[ PostImages.js ]========================================================================================
                                                    IMAGES
               images expanding (in post / by center), navigate buttons, image-links embedding
=========================================================================================================== */

class ImgBtnsShowHider {
	constructor(nextFn, prevFn) {
		const btns = $bEnd(docBody, '<div style="display: none;">' +
			`<div id="de-img-btn-next" de-title="${ Lng.nextImg[lang] }"></div>` +
			`<div id="de-img-btn-prev" de-title="${ Lng.prevImg[lang] }"></div></div>`);
		this._btns = btns;
		this._btnsStyle = btns.style;
		this._hasEvents = false;
		this._hidden = true;
		this._hideTmt = 0;
		this._nextFn = nextFn;
		this._oldX = -1;
		this._oldY = -1;
		this._prevFn = prevFn;
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
				this.show();
			}
			return;
		}
		case 'mouseover':
			if(!this.hasEvents) {
				this.hasEvents = true;
				this._btns.addEventListener('mouseout', this);
				this._btns.addEventListener('click', this);
			}
			if(!this._hidden) {
				clearTimeout(this._hideTmt);
				KeyEditListener.setTitle(this._btns.firstChild, 17);
				KeyEditListener.setTitle(this._btns.lastChild, 4);
			}
			return;
		case 'mouseout': this._setHideTmt(); return;
		case 'click':
			switch(e.target.id) {
			case 'de-img-btn-next': this._nextFn(); return;
			case 'de-img-btn-prev': this._prevFn();
			}
		}
	}
	hide() {
		this._btnsStyle.display = 'none';
		this._hidden = true;
		this._oldX = this._oldY = -1;
	}
	remove() {
		$del(this._btns);
		doc.defaultView.removeEventListener('mousemove', this);
		clearTimeout(this._hideTmt);
	}
	show() {
		if(this._hidden) {
			this._btnsStyle.removeProperty('display');
			this._hidden = false;
			this._setHideTmt();
		}
	}

	_setHideTmt() {
		clearTimeout(this._hideTmt);
		this._hideTmt = setTimeout(() => this.hide(), 2e3);
	}
}

class AttachmentViewer {
	constructor(data) {
		this.data = null;
		this._data = null;
		this._elStyle = null;
		this._fullEl = null;
		this._height = 0;
		this._minSize = 0;
		this._moved = false;
		this._obj = null;
		this._oldL = 0;
		this._oldT = 0;
		this._oldX = 0;
		this._oldY = 0;
		this._width = 0;
		this._show(data);
	}
	close(e) {
		if(this.hasOwnProperty('_btns')) {
			this._btns.remove();
		}
		this._remove(e);
	}
	handleEvent(e) {
		switch(e.type) {
		case 'mousedown':
			if(this.data.isVideo && ExpandableMedia.isControlClick(e)) {
				return;
			}
			this._oldX = e.clientX;
			this._oldY = e.clientY;
			docBody.addEventListener('mousemove', this, true);
			docBody.addEventListener('mouseup', this, true);
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
			docBody.removeEventListener('mousemove', this, true);
			docBody.removeEventListener('mouseup', this, true);
			return;
		case 'click': {
			const el = e.target;
			if(this.data.isVideo && ExpandableMedia.isControlClick(e) ||
				el.tagName !== 'IMG' &&
				el.tagName !== 'VIDEO' &&
				!el.classList.contains('de-fullimg-wrap') &&
				el.target.className !== 'de-fullimg-load'
			) {
				return;
			}
			if(e.button === 0) {
				if(this._moved) {
					this._moved = false;
				} else {
					this.close(e);
					Attachment.viewer = null;
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
		$pd(e);
	}
	navigate(isForward) {
		let { data } = this;
		data.cancelWebmLoad(this._fullEl);
		do {
			data = data.getFollow(isForward);
		} while(data && !data.isVideo && !data.isImage);
		if(data) {
			this.update(data, true, null);
			data.post.selectAndScrollTo(data.post.images.first.el);
		}
	}
	update(data, showButtons, e) {
		this._remove(e);
		this._show(data, showButtons);
	}

	get _btns() {
		const value = new ImgBtnsShowHider(() => this.navigate(true), () => this.navigate(false));
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
	_show(data) {
		let [width, height, minSize] = data.computeFullSize();
		this._fullEl = data.getFullObject(false, el => this._resize(el), el => this._rotate(el));
		if(data.isVideo && (width < Cfg.minWebmWidth)) {
			width = Cfg.minWebmWidth;
		}
		this._width = width;
		this._height = height;
		this._minSize = minSize ? minSize / this._zoomFactor : Cfg.minImgSize;
		this._oldL = (Post.sizing.wWidth - width) / 2 - 1;
		this._oldT = (Post.sizing.wHeight - height) / 2 - 1;
		const obj = $add(`<div class="de-fullimg-center" style="top:${
			this._oldT - (Cfg.imgInfoLink ? 11 : 0) }px; left:${
			this._oldL }px; width:${ width }px; height:${ height }px; display: block"></div>`);
		(data.isImage ? $aBegin(obj, `<a class="de-fullimg-wrap-link" href="${ data.src }"></a>`) : obj)
			.appendChild(this._fullEl);
		this._elStyle = obj.style;
		this.data = data;
		this._obj = obj;
		obj.addEventListener('onwheel' in obj ? 'wheel' : 'mousewheel', this, true);
		obj.addEventListener('mousedown', this, true);
		obj.addEventListener('click', this, true);
		if(data.inPview && !data.post.isSticky) {
			this.data.post.setSticky(true);
		}
		if(!data.inPview) {
			this._btns.show();
		} else if(this.hasOwnProperty('_btns')) {
			this._btns.hide();
		}
		data.post.thr.form.el.appendChild(obj);
	}
	_remove(e) {
		const { data } = this;
		data.cancelWebmLoad(this._fullEl);
		if(data.inPview && data.post.isSticky) {
			data.post.setSticky(false);
		}
		$del(this._obj);
		if(e && data.inPview) {
			data.sendCloseEvent(e, false);
		}
	}
	_resize(el) {
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
		this._elStyle.left = (this._oldL = parseInt(cPointX - width / 2, 10)) + 'px';
		this._elStyle.top = (this._oldT = parseInt(cPointY - height / 2, 10)) + 'px';
	}
	_rotate(el) {
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
		this._elStyle.left = (this._oldL = parseInt(this._oldL + halfWidth - halfHeight, 10)) + 'px';
		this._elStyle.top = (this._oldT = parseInt(this._oldT + halfHeight - halfWidth, 10)) + 'px';
	}
}

class ExpandableMedia {
	constructor(post, el, prev) {
		this.el = el;
		this.expanded = false;
		this.next = null;
		this.post = post;
		this.prev = prev;
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
		const value = /\.jpe?g|\.png|\.gif/i.test(this.src) ||
			(this.src.startsWith('blob:') && !this.el.hasAttribute('de-video'));
		Object.defineProperty(this, 'isImage', { value });
		return value;
	}
	get isVideo() {
		const value = /\.(?:webm|mp4)(?:&|$)/i.test(this.src) ||
			(this.src.startsWith('blob:') && this.el.hasAttribute('de-video'));
		Object.defineProperty(this, 'isVideo', { value });
		return value;
	}
	get src() {
		const value = this._getImageSrc();
		Object.defineProperty(this, 'src', { value });
		return value;
	}
	get width() {
		return (this._size || [-1, -1])[0];
	}
	cancelWebmLoad(fullEl) {
		if(this.isVideo) {
			const videoEl = fullEl.firstElementChild;
			videoEl.pause();
			videoEl.removeAttribute('src');
			videoEl.load();
		}
		if(this._webmTitleLoad) {
			this._webmTitleLoad.cancel();
			this._webmTitleLoad = null;
		}
	}
	collapse(e) {
		if(e && this.isVideo && ExpandableMedia.isControlClick(e)) {
			return;
		}
		this.cancelWebmLoad(this._fullEl);
		this.expanded = false;
		$del(this._fullEl);
		this._fullEl = null;
		$show(this.el.parentNode);
		$del((aib.hasPicWrap ? this._getImageParent() : this.el.parentNode).nextSibling);
		if(e) {
			$pd(e);
			if(this.inPview) {
				this.sendCloseEvent(e, true);
			}
		}
	}
	computeFullSize() {
		if(!this._size) {
			return this._getThumbSize();
		}
		let [width, height] = this._size;
		if(Cfg.resizeDPI) {
			width /= Post.sizing.dPxRatio;
			height /= Post.sizing.dPxRatio;
		}
		const minSize = Cfg.minImgSize;
		if(width < minSize && height < minSize) {
			const ar = width / height;
			if(width > height) {
				width = minSize;
				height = width / ar;
			} else {
				height = minSize;
				width = height * ar;
			}
		}
		if(Cfg.resizeImgs) {
			const maxWidth = Post.sizing.wWidth - 2;
			const maxHeight = Post.sizing.wHeight - (Cfg.imgInfoLink ? 24 : 2);
			if(width > maxWidth || height > maxHeight) {
				const ar = width / height;
				if(ar > maxWidth / maxHeight) {
					width = maxWidth;
					height = width / ar;
				} else {
					height = maxHeight;
					width = height * ar;
				}
				if(width < minSize || height < minSize) {
					return [width, height, Math.max(width, height)];
				}
			}
		}
		return [width, height, null];
	}
	expand(inPost, e) {
		if(e && !e.bubbles) {
			return;
		}
		if(!inPost) {
			if(Attachment.viewer) {
				if(Attachment.viewer.data === this) {
					Attachment.viewer.close(e);
					Attachment.viewer = null;
					return;
				}
				Attachment.viewer.update(this, e);
			} else {
				Attachment.viewer = new AttachmentViewer(this);
			}
			return;
		}
		this.expanded = true;
		const { el } = this;
		(aib.hasPicWrap ? this._getImageParent() : el.parentNode).insertAdjacentHTML('afterend',
			'<div class="de-fullimg-after"></div>');
		this._fullEl = this.getFullObject(true, null, null);
		this._fullEl.addEventListener('click', e => this.collapse(e));
		$hide(el.parentNode);
		$after(el.parentNode, this._fullEl);
	}
	getFollow(isForward) {
		const nImage = isForward ? this.next : this.prev;
		if(nImage) {
			return nImage;
		}
		let imgs, { post } = this;
		do {
			post = post.getAdjacentVisPost(!isForward);
			if(!post) {
				post = isForward ? Thread.first.op : Thread.last.last;
				if(post.hidden || post.thr.hidden) {
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
	getFullObject(inPost, onsizechange, onrotate) {
		let wrapEl, name, origSrc, { src } = this;
		const parent = this._getImageParent();
		if(this.el.className !== 'de-img-pre') {
			const nameEl = $q(aib.qImgNameLink, parent);
			origSrc = nameEl.getAttribute('de-href') || nameEl.href;
			({ name } = this);
		} else {
			origSrc = parent.href;
			name = origSrc.split('/').pop();
		}
		const imgNameEl = `<a class="de-fullimg-src" target="_blank" title="${
			Lng.openOriginal[lang] }" href="${ origSrc }">${ name }</a>`;
		const wrapClass = inPost ? ' de-fullimg-wrap-inpost' :
			` de-fullimg-wrap-center${ this._size ? '' : ' de-fullimg-wrap-nosize' }`;
		// Expand images: JPG, PNG, GIF
		if(!this.isVideo) {
			const waitEl = inPost || this._size ? '' :
				'<svg class="de-fullimg-load"><use xlink:href="#de-symbol-wait"/></svg>';
			wrapEl = $add(`<div class="de-fullimg-wrap${ wrapClass }">
				${ waitEl }
				<img class="de-fullimg" src="${ src }" alt="${ src }">
				<div class="de-fullimg-info">${ imgNameEl }</div>
			</div>`);
			const img = $q('.de-fullimg', wrapEl);
			img.onload = img.onerror = ({ target }) => {
				if(target.naturalHeight + target.naturalWidth === 0) {
					if(!target.onceLoaded) {
						target.src = target.src;
						target.onceLoaded = true;
					}
					return;
				}
				const { naturalWidth: newW, naturalHeight: newH } = target;
				const ar = this._size ? this._size[1] / this._size[0] : newH / newW;
				const isExifRotated = target.scrollHeight / target.scrollWidth > 1 ? ar < 1 : ar > 1;
				if(!this._size || isExifRotated) {
					this._size = isExifRotated ? [newH, newW] : [newW, newH];
				}
				const el = target.previousElementSibling;
				if(el) {
					const p = el.parentNode;
					$hide(el);
					p.classList.remove('de-fullimg-wrap-nosize');
					if(onsizechange) {
						onsizechange(p);
					}
				} else if(isExifRotated && onrotate) {
					onrotate(target.parentNode);
				}
			};
			DollchanAPI.notify('expandmedia', src);
			return wrapEl;
		}

		// Expand videos: WEBM, MP4
		// FIXME: handle null size videos
		if(aib.tiny) {
			src = src.replace(/^.*?\?v=|&.*?$/g, '');
		}
		const isWebm = src.split('.').pop() === 'webm';
		const needTitle = isWebm && Cfg.webmTitles;
		wrapEl = $add(`<div class="de-fullimg-wrap${ wrapClass }">
			<video style="width: inherit; height: inherit" src="${ src }" loop autoplay ` +
				`${ Cfg.webmControl ? 'controls ' : '' }` +
				`${ Cfg.webmVolume === 0 ? 'muted ' : '' }></video>
			<div class="de-fullimg-info">
				${ imgNameEl }
				${ needTitle ? '<svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg>' : '' }
			</div>
		</div>`);
		const videoEl = wrapEl.firstElementChild;
		videoEl.volume = Cfg.webmVolume / 100;
		videoEl.addEventListener('error', ({ target }) => {
			if(!target.onceLoaded) {
				target.load();
				target.onceLoaded = true;
			}
		});
		// Sync webm volume on all browser tabs
		setTimeout(() => videoEl.dispatchEvent(new CustomEvent('volumechange')), 150);
		videoEl.addEventListener('volumechange', e => {
			const val = e.target.muted ? 0 : Math.round(e.target.volume * 100);
			if(e.isTrusted && val !== Cfg.webmVolume) {
				saveCfg('webmVolume', val);
				locStorage['__de-webmvolume'] = val;
				locStorage.removeItem('__de-webmvolume');
			}
		});
		// MS Edge needs an external app with DollchanAPI to play webms
		if(nav.MsEdge && isWebm && !DollchanAPI.hasListener('expandmedia')) {
			const href = 'https://github.com/Kagami/webmify/';
			$popup('err-expandmedia', `${ Lng.errMsEdgeWebm[lang] }:\n<a href="${
				href }" target="_blank">${ href }</a>`, false);
		}
		// Get webm title: load file and parse its metadata
		if(needTitle) {
			this._webmTitleLoad = downloadImgData(videoEl.src, false).then(data => {
				$hide($q('.de-wait', wrapEl));
				if(!data) {
					return;
				}
				let title = '', d = (new WebmParser(data.buffer)).getData();
				if(!d) {
					return;
				}
				d = d[0];
				for(let i = 0, len = d.length; i < len; i++) {
					// Segment Info = 0x1549A966, segment title = 0x7BA9[length | 0x80]
					if(d[i] === 0x49 &&
						d[i + 1] === 0xA9 &&
						d[i + 2] === 0x66 &&
						d[i + 18] === 0x7B &&
						d[i + 19] === 0xA9
					) {
						i += 20;
						for(let end = (d[i++] & 0x7F) + i; i < end; i++) {
							title += String.fromCharCode(d[i]);
						}
						if(title) {
							$q('.de-fullimg-src', wrapEl).textContent +=
								` - ${ videoEl.title = decodeURIComponent(escape(title)) }`;
						}
						break;
					}
				}
			});
		}
		DollchanAPI.notify('expandmedia', src);
		return wrapEl;
	}
	sendCloseEvent(e, inPost) {
		let pv = this.post;
		let cr = pv.el.getBoundingClientRect();
		const x = e.pageX - window.pageXOffset;
		const y = e.pageY - window.pageYOffset;
		if(!inPost) {
			while(x > cr.right || x < cr.left || y > cr.bottom || y < cr.top) {
				pv = pv.parent;
				if(pv && (pv instanceof Pview)) {
					cr = pv.el.getBoundingClientRect();
				} else {
					if(Pview.top) {
						Pview.top.markToDel();
					}
					return;
				}
			}
			pv.mouseEnter();
		} else if(x > cr.right || y > cr.bottom && Pview.top) {
			Pview.top.markToDel();
		}
	}

	get _size() {
		const value = this._getImageSize();
		Object.defineProperty(this, '_size', { value, writable: true });
		return value;
	}
	_getThumbSize() {
		const iEl = new Image();
		iEl.src = this.el.src;
		return this.isVideo ? [iEl.width * 5, iEl.height * 5] : [iEl.width, iEl.height, null];
	}
}

class EmbeddedImage extends ExpandableMedia {
	_getImageParent() {
		return this.el.parentNode;
	}
	_getImageSize() {
		return [this.el.naturalWidth, this.el.naturalHeight];
	}
	_getImageSrc() {
		return this.el.src;
	}
}

class Attachment extends ExpandableMedia {
	get info() {
		const value = aib.getImgInfo(aib.getImgWrap(this.el));
		Object.defineProperty(this, 'info', { value });
		return value;
	}
	get name() {
		const value = aib.getImgRealName(aib.getImgWrap(this.el)).trim();
		Object.defineProperty(this, 'name', { value });
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

	_getImageParent() {
		return aib.getImgWrap(this.el);
	}
	_getImageSize() {
		if(this.info) {
			const size = this.info.match(/(?:[\s]|^)(\d+)\s?[x\u00D7]\s?(\d+)(?:[)\s,]|$)/);
			return [size[1], size[2]];
		}
		return null;
	}
	_getImageSrc() {
		// XXX: DON'T USE aib.getImgSrcLink(this.el).href
		// If #ihash spells enabled, Chrome reads href in ajaxed posts as empty -> image can't be expanded!
		return aib.getImgSrcLink(this.el).getAttribute('href');
	}
}
Attachment.viewer = null;

const ImagesHashStorage = {
	get getHash() {
		const value = this._getHashHelper.bind(this);
		Object.defineProperty(this, 'getHash', { value });
		return value;
	},
	endFn() {
		if(this.hasOwnProperty('_storage')) {
			sesStorage['de-imageshash'] = JSON.stringify(this._storage);
		}
		if(this.hasOwnProperty('_workers')) {
			this._workers.clear();
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
		} finally {
			if(!value) {
				value = {};
			}
			Object.defineProperty(this, '_storage', { value });
			return value;
		}
	},
	get _workers() {
		const value = new WorkerPool(4, genImgHash, emptyFn);
		Object.defineProperty(this, '_workers', { value, configurable: true });
		return value;
	},
	async _getHashHelper({ el, src }) {
		if(src in this._storage) {
			return this._storage[src];
		}
		if(!el.complete) {
			await new Promise(resolve => el.addEventListener('load', () => resolve()));
		}
		if(el.naturalWidth + el.naturalHeight === 0) {
			return -1;
		}
		let data, buffer, val = -1;
		const { naturalWidth: w, naturalHeight: h } = el;
		if(aib.fch) {
			const imgData = await downloadImgData(el.src);
			if(imgData) {
				({ buffer } = imgData);
			}
		} else {
			const cnv = this._canvas;
			cnv.width = w;
			cnv.height = h;
			const ctx = cnv.getContext('2d');
			ctx.drawImage(el, 0, 0);
			({ buffer } = ctx.getImageData(0, 0, w, h).data);
		}
		if(buffer) {
			data = await new Promise(resolve =>
				this._workers.run([buffer, w, h], [buffer], val => resolve(val)));
			if(data && ('hash' in data)) {
				val = data.hash;
			}
		}
		this._storage[src] = val;
		return val;
	}
};

function processImagesLinks(el, addSrc = Cfg.imgSrcBtns, delNames = Cfg.delImgNames) {
	if(!addSrc && !delNames) {
		return;
	}
	const els = $Q(aib.qImgNameLink, el);
	for(let i = 0, len = els.length; i < len; i++) {
		const link = els[i];
		if(/google\.|tineye\.com|iqdb\.org/.test(link.href)) {
			$del(link);
			continue;
		}
		if(link.firstElementChild) {
			continue;
		}
		if(addSrc) {
			link.insertAdjacentHTML('beforebegin',
				'<svg class="de-btn-src"><use xlink:href="#de-symbol-post-src"/></svg>');
		}
		if(delNames) {
			link.classList.add('de-img-name');
			const text = link.textContent;
			link.textContent = text.split('.').pop();
			link.title = text;
		}
	}
}

function embedImagesLinks(el) {
	const els = $Q(aib.qMsgImgLink, el);
	for(let i = 0, len = els.length; i < len; ++i) {
		const link = els[i];
		const url = link.href;
		if(link.parentNode.tagName === 'SMALL' || url.includes('?')) {
			return;
		}
		const a = link.cloneNode(false);
		a.target = '_blank';
		a.innerHTML = `<img class="de-img-pre" src="${ url }">`;
		$before(link, a);
	}
}

function genImgHash([arrBuf, oldw, oldh]) {
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
	for(let i = 0; i < newh; i++) {
		for(let j = 0; j < neww; j++) {
			let tmp = i / (newh - 1) * (oldh - 1);
			const l = Math.min(tmp | 0, oldh - 2);
			const u = tmp - l;
			tmp = j / (neww - 1) * (oldw - 1);
			const c = Math.min(tmp | 0, oldw - 2);
			const t = tmp - c;
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
}

/* ==[ PostBuilders.js ]======================================================================================
                                          BUILDERS FOR LOADED POSTS
=========================================================================================================== */

class DOMPostsBuilder {
	constructor(form, isArchived) {
		this._form = form;
		this._posts = $Q(aib.qRPost, form);
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
	getPostEl(i) {
		return aib.fixHTML(this._posts[i]);
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
	constructor(json, brd) {
		this._posts = json.posts;
		this._brd = brd;
		this.length = json.posts.length - 1;
		this.postersCount = this._posts[0].unique_ips;
		if(this._posts[0].custom_spoiler) {
			_4chanPostsBuilder._setCustomSpoiler(brd, this._posts[0].custom_spoiler);
		}
	}
	static fixFileName(name, maxLength) {
		const decodedName = name.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'")
			.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
		return decodedName.length <= maxLength ? { isFixed: false, name } : {
			isFixed : true,
			name    : decodedName.slice(0, 25).replace(/&/g, '&amp;').replace(/"/g, '&quot;')
				.replace(/'/g, '&#039;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
		};
	}
	static _setCustomSpoiler(board, val) {
		if(!_4chanPostsBuilder._customSpoiler[board] && (val = parseInt(val))) {
			let spoilerEl;
			if(board === aib.brd && (spoilerEl = $q('.imgspoiler'))) {
				_4chanPostsBuilder._customSpoiler.set(board,
					spoilerEl.firstChild.src.match(/spoiler(-[a-z0-9]+)\.png$/)[1]);
			}
		} else {
			_4chanPostsBuilder._customSpoiler.set(board, '-' + board + (Math.floor(Math.random() * val) + 1));
		}
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
	getPostEl(i) {
		return $add(aib.fixHTML(this.getPostHTML(i))).lastElementChild;
	}
	getPostHTML(i) {
		const data = this._posts[i + 1];
		const num = data.no;
		const brd = this._brd;
		const _icon = id => `//s.4cdn.org/image/${ id }${ window.devicePixelRatio < 2 ? '.gif' : '@2x.gif' }`;

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
			const isSpoiler = data.spoiler && !Cfg.noSpoilers;
			if(isSpoiler) {
				name = 'Spoiler Image';
				data.tn_w = data.tn_h = 100;
				needTitle = false;
			}
			const size = prettifySize(data.fsize);
			const fileTextTitle = isSpoiler ? ` title="${ data.filename + data.ext }"` : '';
			const aHref = needTitle ? `title="${ data.filename + data.ext }"` : '';
			const imgSrc = isSpoiler ?
				`//s.4cdn.org/image/spoiler${ _4chanPostsBuilder._customSpoiler.get(brd) || '' }.png` :
				`//i.4cdn.org/${ brd }/${ data.tim }s.jpg`;
			fileHTML = `<div class="file" id="f${ num }">
				<div class="fileText" id="fT${ num }"${ fileTextTitle }>File:
					<a href="//i.4cdn.org/${ brd }/${ data.tim +
						data.ext }" ${ aHref } target="_blank">${ name }</a>
					(${ size }, ${ data.ext === '.pdf' ? 'PDF' : data.w + 'x' + data.h })
				</div>
				<a class="fileThumb ${ isSpoiler ? 'imgSpoiler' : '' }" href="//i.4cdn.org/${ brd }/` +
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
		let highlight = '', capcodeText = '', capcodeClass = '', capcodeImg = '';
		switch(data.capcode) {
		case 'admin_highlight':
			highlight = ' highlightPost';
			/* falls through */
		case 'admin':
			capcodeText = '<strong class="capcode hand id_admin" ' +
				'title="Highlight posts by Administrators">## Admin</strong>';
			capcodeClass = 'capcodeAdmin';
			capcodeImg = `<img src="${ _icon('adminicon') }" alt="This user is a 4chan Administrator." ` +
				'title="This user is a 4chan Administrator." class="identityIcon">';
			break;
		case 'mod':
			capcodeText = '<strong class="capcode hand id_mod" ' +
				'title="Highlight posts by Moderators">## Mod</strong>';
			capcodeClass = 'capcodeMod';
			capcodeImg = `<img src="${ _icon('modicon') }" alt="This user is a 4chan Moderator." ` +
				'title="This user is a 4chan Moderator." class="identityIcon">';
			break;
		case 'developer':
			capcodeText = '<strong class="capcode hand id_developer" ' +
				'title="Highlight posts by Developers">## Developer</strong>';
			capcodeClass = 'capcodeDeveloper';
			capcodeImg = `<img src="${ _icon('developericon') }" alt="This user is a 4chan Developer." ` +
				'title="This user is a 4chan Developer." class="identityIcon">';
			break;
		case 'manager':
			capcodeText = '<strong class="capcode hand id_manager" ' +
				'title="Highlight posts by Managers">## Manager</strong>';
			capcodeClass = 'capcodeManager';
			capcodeImg = `<img src="${ _icon('managericon') }" alt="This user is a 4chan Manager." ` +
				'title="This user is a 4chan Manager." class="identityIcon">';
			break;
		case 'founder':
			capcodeText = '<strong class="capcode hand id_admin" ' +
				'title="Highlight posts by the Founder">## Founder</strong>';
			capcodeClass = ' capcodeAdmin';
			capcodeImg = `<img src="${ _icon('foundericon') }" alt="This user is 4chan's Founder." ` +
				'title="This user is 4chan\'s Founder." class="identityIcon">';
		}

		// --- POST ---
		const { name = '' } = data;
		const nameEl = `<span class="name">${ name }</span>`;
		const mobNameEl = name.length <= 30 ? nameEl :
			`<span class="name" data-tip data-tip-cb="mShowFull">${ name.substring(30) }(…)</span>`;
		const tripEl = `${ data.trip ? `<span class="postertrip">${ data.trip }</span>` : '' }`;
		const posteruidEl = data.id && !data.capcode ? `<span class="posteruid id_${ data.id }` +
			`">(ID: <span class="hand" title="Highlight posts by this ID">${ data.id }</span>)</span>` : '';
		const flagEl = data.country ? `<span title="${ data.country_name }" class="flag flag-${
			data.country.toLowerCase() }"></span>` : '';
		const emailEl = data.email ? `<a href="mailto:${
			data.email.replace(/ /g, '%20') }" class="useremail">` : '';
		const replyEl = `<a href="#p${ num }" title="Link to this post">No.</a><a href="javascript:quote('${
			num }');" title="Reply to this post">${ num }</a>`;
		const subjEl = `<span class="subject">${ data.sub || '' }</span>`;
		return `<div class="postContainer replyContainer" id="pc${ num }">
			<div class="sideArrows" id="sa${ num }">&gt;&gt;</div>
			<div id="p${ num }" class="post ${ i === -1 ? 'op' : 'reply' } ${ highlight }">
				<div class="postInfoM mobile" id="pim${ num }">
					<span class="nameBlock ${ capcodeClass }">
						${ mobNameEl }
						${ tripEl }
						${ capcodeText }
						${ capcodeImg }
						${ posteruidEl }
						${ flagEl }<br>
						${ subjEl }
					</span>
					<span class="dateTime postNum" data-utc="${ data.time }">${ data.now } ${ replyEl }</span>
				</div>
				<div class="postInfo desktop" id="pi${ num }">
					<input name="${ num }" value="delete" type="checkbox">
					${ subjEl }
					<span class="nameBlock ${ capcodeClass }">
						${ emailEl }
							${ nameEl }
							${ tripEl }
							${ capcodeText }
						${ data.email ? '</a>' : '' }
						${ capcodeImg }
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
}
_4chanPostsBuilder._customSpoiler = new Map();

class DobrochanPostsBuilder {
	constructor(json, brd) {
		if(json.error) {
			throw new AjaxError(0, `API error: ${ json.error.message }`);
		}
		this._json = json.result;
		this._brd = brd;
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
	getPostEl(i) {
		return $add(aib.fixHTML(this.getPostHTML(i))).firstChild.firstChild.lastElementChild;
	}
	getPostHTML(i) {
		const data = this._posts[i + 1];
		const num = data.display_id;
		const brd = this._brd;
		const multiFile = data.files.length > 1;

		// --- FILE ---
		let filesHTML = '';
		for(const { file_id, metadata, rating, size, src, thumb, thumb_height, thumb_width } of data.files) {
			let fileName, fullFileName, th = thumb;
			let thumbW = 200;
			let thumbH = 200;
			const ext = src.split('.').pop();
			if(brd === 'b' || brd === 'rf') {
				fileName = fullFileName = th.split('/').pop();
			} else {
				fileName = fullFileName = src.split('/').pop();
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
			(_, y, mo, d, h, m, s) => {
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
					<a href="/${ brd }/res/${ data.thread_id }.xhtml#i${ num }"> No.${ num }</a>
				</span><br>
				${ filesHTML }
				${ multiFile ? '<div style="clear: both;"></div>' : '' }
				<div class="postbody"> ${ data.message_html }</div>
			${ isOp ? '</div>' : '</td></tr></tbody></table>' }`;
	}
	* bannedPostsData() {}
}

class MakabaPostsBuilder {
	constructor(json, brd) {
		if(json.Error) {
			throw new AjaxError(0, `API error: ${ json.Error } (${ json.Code })`);
		}
		this._json = json;
		this._brd = brd;
		this._posts = json.threads[0].posts;
		this.length = json.posts_count;
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
	getPostEl(i) {
		return $add(aib.fixHTML(this.getPostHTML(i))).firstElementChild;
	}
	getPostHTML(i) {
		const data = this._posts[i + 1];
		const { num } = data;
		const brd = this._brd;
		const _switch = (val, obj) => val in obj ? obj[val] : obj['@@default'];

		// --- FILE ---
		let filesHTML = '';
		if(data.files && data.files.length !== 0) {
			filesHTML = `<div class="images images-${ data.files.length === 1 ? 'single' : 'multi' }">`;
			for(const file of data.files) {
				const imgId = num + '-' + file.md5;
				const { fullname = file.name, displayname: dispName = file.name } = file;
				const isWebm = fullname.substr(-5) === '.webm';
				filesHTML += `<figure class="image">
					<figcaption class="file-attr">
						<a id="title-${ imgId }" class="desktop" target="_blank" href="${ file.path }"` +
							`${	dispName === fullname ? '' : ` title="${ fullname }"` }>${ dispName }</a>
						<span class="filesize">(${ file.size }Кб, ${ file.width }x${ file.height }` +
							`${ isWebm ? ', ' + file.duration : '' })</span>
					</figcaption>
					<div id="exlink-${ imgId }" class="image-link">
						<a href="${ file.path }">
							<img class="img preview${ isWebm ? ' webm-file' : '' }" src="` +
								`${ file.thumbnail }" alt="${ file.size }" width="` +
								`${ file.tn_width }" height="${ file.tn_height }">
						</a>
					</div>
				</figure>`;
			}
			filesHTML += '</div>';
		} else if(data.video) {
			filesHTML = `<div class="images">
				<div style="float: left; margin: 5px; margin-right:10px">${ data.video }</div>
			</div>`;
		}

		// --- POST ---
		const emailEl = data.email ?
			`<a href="${ data.email }" class="post-email">${ data.name }</a>` :
			`<span class="ananimas">${ data.name }</span>`;
		const tripEl = !data.trip ? '' : _switch(data.trip, {
			'!!%adm%!!'        : 'adm">## Abu ##',
			'!!%mod%!!'        : 'mod">## Mod ##',
			'!!%Inquisitor%!!' : 'inquisitor">## Applejack ##',
			'!!%coder%!!'      : 'mod">## Кодер ##',
			'@@default'        : 'postertrip">' + data.trip
		});
		const refHref = `/${ brd }/res/${ parseInt(data.parent) || num }.html#${ num }`;
		return `<div id="post-${ num }" class="post-wrapper">
			<div class="post ${ i === -1 ? 'oppost' : 'reply' }" id="post-body-${ num }" data-num="${ num }">
				<div id="post-details-${ num }" class="post-details">
					<input type="checkbox" name="delete" value="${ num }">
					${ !data.subject ? '' : `<span class="post-title">${ data.subject +
						(data.tags ? ` /${ data.tags }/` : '') }</span>` }
					${ emailEl }
					${ data.icon ? `<span class="post-icon">${ data.icon }</span>` : '' }
					<span class="${ tripEl }</span>
					${ data.op === 1 ? '<span class="ophui"># OP</span>&nbsp;' : '' }
					<span class="posttime-reflink">
						<span class="posttime">${ data.date }&nbsp;</span>
						<span class="reflink">
							<a href="${ refHref }">№</a>` +
							`<a href="${ refHref }" class="postbtn-reply-href" name="${ num }">${ num }</a>
						</span>
					</span>
					${ this._brd === 'po' ? `<div id="like-div${ num }" class="like-div">
							<span class="like-icon"><i class="fa fa-bolt"></i></span>
							<span class="like-caption">Двачую</span>
							<span id="like-count${ num }" class="like-count">${ data.likes || '' }</span>
						</div>
						<div id="dislike-div${ num }" class="dislike-div">
							<span class="dislike-icon"><i class="fa fa-thumbs-down"></i></span>
							<span class="dislike-caption">RRRAGE!</span>
							<span id="dislike-count${ num }" class="dislike-count">
								${ data.dislikes || '' }</span>
						</div>` : '' }
				</div>
				${ filesHTML }
				${ this._getPostMsg(data) }
			</div>
		</div>`;
	}
	* bannedPostsData() {
		for(const { banned, num } of this._posts) {
			switch(banned) {
			case 1:
				yield [1, num, $add('<span class="pomyanem">' +
					'(Автор этого поста был забанен. Помянем.)</span>')];
				break;
			case 2:
				yield [2, num, $add('<span class="pomyanem">' +
					'(Автор этого поста был предупрежден.)</span>')];
				break;
			}
		}
	}

	_getPostMsg(data) {
		const _switch = (val, obj) => val in obj ? obj[val] : obj['@@default'];
		const comment = data.comment.replace(/<script /ig, '<!--<textarea ')
			.replace(/<\/script>/ig, '</textarea>-->');
		return `<blockquote id="m${ data.num }" class="post-message">${ comment }${ _switch(
			data.banned, {
				1           : '<br><span class="pomyanem">(Автор этого поста был забанен. Помянем.)</span>',
				2           : '<br><span class="pomyanem">(Автор этого поста был предупрежден.)</span>',
				'@@default' : ''
			}) }
		</blockquote>`;
	}
}

class _0chanPostsBuilder {
	constructor(json) {
		if(json.error) {
			throw new AjaxError(0, `API error: ${ json.message }`);
		}
		this._json = json;
		this._posts = json.posts;
		this.length = json.posts.length - 1;
		this.postersCount = '';
	}
	getOpMessage() {
		return $add(aib.fixHTML(`<div class="post-body-message"><div> ${
			this._posts[0].message }</div></div>`));
	}
	getPNum(i) {
		return +this._posts[i + 1].id; // Must return a Number, not a String!
	}
	getPostEl(i) {
		return $add(aib.fixHTML(this.getPostHTML(i)));
	}
	getPostHTML(i) {
		let filesHTML = '';
		const isOp = i === -1;
		const data = this._posts[i + 1];
		const { id: num, boardDir: brd, parentId: parId } = data;
		if(data.attachments.length) {
			filesHTML += '<div class="post-attachments">';
			for(const { images } of data.attachments) {
				const { original: orig, thumb_200px: thumb200, thumb_400px: thumb400 } = images;
				filesHTML += `<figure class="post-img"><span>
					<figcaption>
						<span class="pull-left">${ orig.width }x${ orig.height }, ${ orig.size_kb }Кб</span>
					</figcaption>
					<a href="${ orig.url }" target="_blank"><img src="${ thumb200.url }" srcset="` +
						`${ thumb400.url } 2x" class="post-img-thumbnail" style="width: ` +
						`${ thumb200.width }px; height: ${ thumb200.height }px;"></a>
				</span></figure>`;
			}
			filesHTML += '</div>';
		}

		// --- POST ---
		const d = new Date(data.date * 1e3);
		const date = `${ d.getFullYear() }-${ pad2(d.getMonth() + 1) }-${ pad2(d.getDate()) } ${
			pad2(d.getHours()) }:${ pad2(d.getMinutes()) }:${ pad2(d.getSeconds()) }`;
		const postParentEl = parId === this._json.posts[0].id ? '' :
			`<div class="post-parent"><a data-post="${ parId }" href="/${ brd }/${
				data.threadId }#${ parId }">&gt;&gt;${ parId }</a></div>`;
		return `<div><div class="block post${ isOp ? ' post-op' : '' }">
			<div class="post-header">
				<a name="${ num }"></a>
				<span class="post-id">
					<a href="/${ brd }" class="router-link-active">/${ brd }/</a>
					${ isOp ? `<span>— ${ this._json.thread.board.name } —</span>` : '' }
					<a href="/${ brd }/${ data.threadId + (isOp ? '' : '#' + num) }">#${ num }</a>
				</span>
				<span class="pull-right">
					<span class="post-thread-options"></span>
					<span class="post-date">${ date }</span>
				</span>
			</div>
			<div class="post-body${ data.attachments.length > 1 ? '' : ' post-inline-attachment' }">
				${ filesHTML }
				<div class="post-body-message">
					${ postParentEl }
					<div> ${ data.messageHtml || '' }</div>
				</div>
			</div>
			<div class="post-footer"></div>
		</div></div>`;
	}
}

/* ==[ RefMap.js ]============================================================================================
                                             REFERENCE LINKS MAP
=========================================================================================================== */

class RefMap {
	constructor(post) {
		this.hasMap = false;
		this._hidden = false;
		this._inited = false;
		this._post = post;
		this._set = new Set();
	}
	static gen(posts, thrURL) {
		const { tNums } = DelForm;
		for(const [pNum, post] of posts) {
			const links = $Q('a', post.msg);
			for(let lNum, i = 0, len = links.length; i < len; ++i) {
				const link = links[i];
				const tc = link.textContent;
				if(tc[0] !== '>' || tc[1] !== '>' || !(lNum = parseInt(tc.substr(2), 10))) {
					continue;
				}
				if(MyPosts.has(lNum)) {
					link.classList.add('de-ref-my');
					post.el.classList.add('de-reply-post');
				}
				if(!posts.has(lNum)) {
					continue;
				}
				const { ref } = posts.get(lNum);
				if(ref._inited) {
					ref.add(post, pNum);
				} else {
					ref._set.add(pNum);
					ref.hasMap = true;
				}
				if(!aib.hasOPNum && tNums.has(lNum)) {
					link.classList.add('de-ref-op');
				}
				if(thrURL) {
					const url = link.getAttribute('href');
					if(url[0] === '#') {
						link.setAttribute('href', thrURL + url);
					}
				}
			}
		}
	}
	static init(form) {
		let post = form.firstThr && form.firstThr.op;
		if(post && Cfg.linksNavig) {
			this.gen(pByNum, '');
			const strNums = Cfg.strikeHidd && Post.hiddenNums.size !== 0 ? Post.hiddenNums : null;
			for(; post; post = post.next) {
				if(post.ref.hasMap) {
					post.ref.init('', strNums);
				}
			}
		}
	}
	static upd(post, isAdd) {
		const pNum = post.num;
		const strNums = isAdd && Cfg.strikeHidd && Post.hiddenNums.size !== 0 ? Post.hiddenNums : null;
		const links = $Q('a', post.msg);
		for(let lNum, i = 0, len = links.length; i < len; ++i) {
			const link = links[i];
			const tc = link.textContent;
			if(tc[0] !== '>' || tc[1] !== '>' || !(lNum = parseInt(tc.substr(2), 10))) {
				continue;
			}
			if(isAdd && MyPosts.has(lNum)) {
				link.classList.add('de-ref-my');
				post.el.classList.add('de-reply-post');
				updater.refToYou();
			}
			if(!pByNum.has(lNum)) {
				continue;
			}
			const lPost = pByNum.get(lNum);
			if(!aib.t) {
				link.href = `#${ aib.fch ? 'p' : '' }${ lNum }`;
			}
			if(!isAdd) {
				lPost.ref.remove(pNum);
				return;
			}
			if(strNums && strNums.has(lNum)) {
				link.classList.add('de-link-hid');
			}
			if(!aib.hasOPNum && DelForm.tNums.has(lNum)) {
				link.classList.add('de-ref-op');
			}
			lPost.ref.add(post, pNum, strNums && strNums.has(pNum));
		}
	}
	add(post, num, isHidden = null) {
		if(isHidden === null) {
			const strNums = Cfg.strikeHidd && Post.hiddenNums.size !== 0 ? Post.hiddenNums : null;
			isHidden = strNums ? strNums.has(+num) : false;
		}
		if(!this._set.has(num)) {
			this._set.add(num);
			this._el.insertAdjacentHTML('beforeend', this._getHTML(num, '', isHidden));
			if(Cfg.hideRefPsts && this._post.hidden) {
				post.setVisib(true, 'reference to >>' + num);
				post.ref.hide();
			}
		}
	}
	getElByNum(num) {
		return $q(`a[href$="${ num }"]`, this._el);
	}
	has(num) {
		return this._set.has(num);
	}
	hide(isForced = false) {
		if(!isForced && !Cfg.hideRefPsts || !this.hasMap || this._hidden) {
			return;
		}
		this._hidden = true;
		for(const num of this._set) {
			const post = pByNum.get(num);
			if(post && !post.hidden) {
				if(isForced) {
					post.setUserVisib(true, true, 'reference to >>' + this._post.num);
					post.ref.hide(true);
				} else if(!post.userToggled) {
					post.setVisib(true, 'reference to >>' + this._post.num);
					post.ref.hide();
				}
			}
		}
	}
	init(tUrl, strNums) {
		let html = '';
		for(const num of this._set) {
			html += this._getHTML(num, tUrl, strNums && strNums.has(num));
		}
		this._createEl(html, false);
		this._inited = true;
	}
	makeUnion(oRef) {
		this._set = new Set([...this._set, ...oRef._set].sort((a, b) => a - b));
	}
	remove(num) {
		this._set.delete(num);
		if(this._set.size === 0) {
			this.removeMap();
		} else {
			const el = this.getElByNum(num);
			if(el) {
				$del(el.nextSibling);
				$del(el);
			}
		}
	}
	removeMap() {
		this._set = new Set();
		$del(this._el);
		delete this._el;
		this.hasMap = false;
	}
	unhide(isForced = false) {
		if(this._hidden && !this.hasMap) {
			return;
		}
		this._hidden = false;
		for(const num of this._set) {
			const post = pByNum.get(num);
			if(post && post.hidden && !post.spellHidden) {
				if(isForced) {
					post.setUserVisib(false);
					post.ref.unhide(true);
				} else if(!post.userToggled) {
					post.setVisib(false);
					post.ref.unhide();
				}
			}
		}
	}

	get _el() {
		let value = $q('.de-refmap', this._post.el);
		if(!value) {
			this._createEl('', this._post.hidden);
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
		if(aib.dobr && (el = msg.nextElementSibling)) {
			el.insertAdjacentHTML('beforeend', html);
		} else {
			msg.insertAdjacentHTML('afterend', html);
		}
	}
	_getHTML(num, tUrl, isHidden) {
		return `<a href="${ tUrl }${ aib.anchor }${ num }" class="de-link-ref${
			isHidden ? ' de-link-hid' : '' }${ MyPosts.has(num) ? ' de-ref-my' : ''
		}">&gt;&gt;${ num }</a><span class="de-refcomma">, </span>`;
	}
}

/* eslint-disable no-var *//* , prefer-template */

/* ==[ Threads.js ]===========================================================================================
                                                   THREADS
=========================================================================================================== */

class Thread {
	static get first() {
		return DelForm.first.firstThr;
	}
	static get last() {
		return DelForm.last.lastThr;
	}
	static removeSavedData() {
		// TODO: remove relevant spells, hidden posts and user posts
	}
	constructor(el, num, prev, form) {
		var els = $Q(aib.qRPost, el),
			len = els.length,
			omt = aib.t ? 1 : aib.getOmitted($q(aib.qOmitted, el), len);
		this.hasNew = false;
		this.hidden = false;
		this.hidCounter = 0;
		this.loadCount = 0;
		this.next = null;
		this.num = num;
		this.thrId = aib.thrId ? aib.thrId(el) : num;
		this.pcount = omt + len;
		this.el = el;
		this.prev = prev;
		this.form = form;
		this._lastModified = '';
		if(prev) {
			prev.next = this;
		}
		var lastPost = this.op = new Post(aib.getOp(el), this, num, 0, true, prev ? prev.last : null);
		pByEl.set(el, lastPost);
		for(var i = 0; i < len; i++) {
			var pEl = els[i];
			lastPost = new Post(pEl, this, aib.getPNum(pEl), omt + i, false, lastPost);
		}
		this.last = lastPost;
		el.style.counterReset = 'de-cnt ' + omt;
		el.setAttribute('de-thread', null);
		visPosts = Math.max(visPosts, len);
		if(aib.tiny) {
			var temp = el.lastChild;
			if(temp !== this.op.el) {
				$after(el, temp);
			}
			$del($q('.clear', el));
		}
		if(!aib.t) {
			this.btns = $bEnd(el, '<div class="de-thread-buttons">' +
				'<span class="de-thread-updater">[<a class="de-abtn" href="#"></a>]</span></div>');
			var updBtn = this.btns.firstChild;
			updBtn.onclick = e => {
				$pd(e);
				this.loadPosts('new');
			};
			if(Cfg.hideReplies) {
				var repBtn = $bEnd(this.btns,
					' <span class="de-replies-btn">[<a class="de-abtn" href="#"></a>]</span>');
				repBtn.onclick = e => {
					$pd(e);
					var nextCoord = !this.next || this.last.omitted ? null : this.next.top;
					this._toggleReplies(repBtn, updBtn);
					if(nextCoord) {
						scrollTo(window.pageXOffset, window.pageYOffset + this.next.top - nextCoord);
					}
				};
				this._toggleReplies(repBtn, updBtn);
			}
		}
	}
	get bottom() {
		return this.hidden ? this.op.bottom : this.last.bottom;
	}
	get lastNotDeleted() {
		let post = this.last;
		while(post.deleted) {
			post = post.prev;
		}
		return post;
	}
	get nextNotHidden() {
		let thr;
		for(thr = this.next; thr && thr.hidden; thr = thr.next) /* empty */;
		return thr;
	}
	get prevNotHidden() {
		let thr;
		for(thr = this.prev; thr && thr.hidden; thr = thr.prev) /* empty */;
		return thr;
	}
	get userTouched() {
		const value = new Map();
		Object.defineProperty(this, 'userTouched', { value });
		return value;
	}
	get top() {
		return this.op.top;
	}
	deletePost(post, delAll, removePost) {
		SpellsRunner.cachedData = null;
		let count = 0;
		do {
			if(removePost && this.last === post) {
				this.last = post.prev;
			}
			post.delete(removePost);
			post = post.nextNotDeleted;
			count++;
		} while(delAll && post);
		for(let tPost = post; tPost; tPost = tPost.nextInThread) {
			tPost.count -= count;
		}
		this.pcount -= count;
		return post;
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
		return ajaxPostsLoad(aib.b, this.thrId, false).then(
			pBuilder => this._loadFromBuilder(task, isSmartScroll, pBuilder),
			e => $popup('load-thr', getErrorMessage(e)));
	}
	/*
	* New posts loading via ajax.
	*  Calls by thread updater, by clicking on >>[Get new posts] button, and after sending a reply.
	*  Adds new posts to the end of current thread.
	*  @returns {Promise} - resolves with Object, { newCount: Number, locked: Boolean }
	*/
	loadNewPosts() {
		return ajaxPostsLoad(aib.b, this.thrId, true).then(
			pBuilder => pBuilder ? this._loadNewFromBuilder(pBuilder) : { newCount: 0, locked: false });
	}
	setFavorState(val, type) {
		this.op.setFavBtn(val);
		readFavorites().then(fav => {
			const { b, host: h } = aib;
			const num = this.thrId;
			if(val) {
				if(!fav[h]) {
					fav[h] = {};
				}
				if(!fav[h][b]) {
					fav[h][b] = {};
				}
				fav[h][b].url = aib.prot + '//' + aib.host + aib.getPageUrl(b, 0);
				fav[h][b][num] = {
					cnt  : this.pcount,
					new  : 0,
					you  : 0,
					txt  : this.op.title,
					url  : aib.getThrUrl(b, num),
					last : aib.anchor + this.last.num,
					type
				};
			} else {
				removeFavoriteEntry(fav, h, b, num);
			}
			saveFavorites(fav);
		});
	}
	updateHidden(data) {
		var thr = this;
		do {
			var realHid = data ? data.hasOwnProperty(thr.num) : false;
			if(thr.hidden ^ realHid) {
				if(realHid) {
					thr.op.setUserVisib(true, false);
					data[thr.num] = thr.op.title;
				} else if(thr.hidden) {
					thr.op.setUserVisib(false, false);
				}
			}
		} while((thr = thr.next));
	}

	_addPost(parent, el, i, prev, maybeVParser) {
		var post, num = aib.getPNum(el),
			wrap = doc.adoptNode(aib.getPostWrap(el, false));
		post = new Post(el, this, num, i, false, prev);
		parent.appendChild(wrap);
		if(aib.t && !doc.hidden && Cfg.animation) {
			$animate(post.el, 'de-post-new');
		}
		if(this.userTouched.has(num)) {
			post.setUserVisib(this.userTouched.get(num), false);
			this.userTouched.delete(num);
		}
		if(maybeVParser.value) {
			maybeVParser.value.parse(post);
		}
		processImagesLinks(el);
		post.addFuncs();
		preloadImages(post);
		if(aib.t && Cfg.markNewPosts) {
			Post.addMark(el, false);
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
				post.msg.appendChild(bEl);
				post.banned = banId;
			}
		}
	}
	_toggleReplies(repBtn, updBtn) {
		var isHide = !this.last.omitted;
		for(var i = 0, post = this.op; post !== this.last; i++) {
			post = post.next;
			if(isHide) {
				post.wrap.classList.add('de-hidden');
				post.omitted = true;
			} else {
				post.wrap.classList.remove('de-hidden');
				post.omitted = false;
			}
		}
		repBtn.firstElementChild.className = 'de-abtn ' + (isHide ? 'de-replies-show' : 'de-replies-hide');
		$toggle(updBtn, !isHide);
		var colBtn = $q('.de-thread-collapse', this.el);
		if(colBtn) {
			$toggle(colBtn, !isHide);
		}
		$del($q(aib.qOmitted + ', .de-omitted', this.el));
		i = this.pcount - 1 - (isHide ? 0 : i);
		if(i) {
			this.op.el.insertAdjacentHTML('afterend', '<span class="de-omitted">' + i + '</span> ');
		}
	}
	_importPosts(last, pBuilder, begin, end, maybeVParser, maybeSpells) {
		var fragm, newCount = end - begin,
			newVisCount = newCount,
			nums = [];
		if(aib.JsonBuilder && nav.hasTemplate) {
			const html = [];
			for(let i = begin; i < end; ++i) {
				html.push(pBuilder.getPostHTML(i));
				nums.push(pBuilder.getPNum(i));
			}
			const temp = document.createElement('template');
			temp.innerHTML = aib.fixHTML(html.join(''));
			fragm = temp.content;
			const posts = $Q(aib.qRPost, fragm);
			for(let i = 0, len = posts.length; i < len; ++i) {
				last = this._addPost(fragm, posts[i], begin + i + 1, last, maybeVParser);
				newVisCount -= maybeSpells.value.run(last);
			}
		} else {
			fragm = doc.createDocumentFragment();
			for(; begin < end; ++begin) {
				last = this._addPost(fragm, pBuilder.getPostEl(begin), begin + 1, last, maybeVParser);
				nums.push(last.num);
				newVisCount -= maybeSpells.value.run(last);
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
		pr.closeReply();
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
		var needToHide, needToOmit, needToShow, post = op.next,
			needRMUpdate = false,
			existed = this.pcount === 1 ? 0 : this.pcount - post.count;
		switch(last) {
		case 'new': // get new posts
			needToHide = $Q('.de-hidden', thrEl).length;
			needToOmit = needToHide + post.count - 1;
			needToShow = pBuilder.length - needToOmit;
			break;
		case 'all': // get all posts
			needToHide = needToOmit = 0;
			needToShow = pBuilder.length;
			break;
		case 'more': // show 10 omitted posts + get new posts
			needToHide = $Q('.de-hidden', thrEl).length - 10;
			needToOmit = Math.max(needToHide + post.count - 1, 0);
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
				post.omitted = true;
				post = post.next;
			}
		} else {
			const nonExisted = pBuilder.length - existed;
			const maybeVParser = new Maybe(Cfg.addYouTube ? VideosParser : null);
			const [,, fragm, last, nums] = this._importPosts(
				op, pBuilder,
				Math.max(0, nonExisted + existed - needToShow),
				nonExisted,
				maybeVParser,
				maybeSpells);
			maybeVParser.end();
			$after(op.wrap, fragm);
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
			if(post.omitted) {
				post.wrap.classList.remove('de-hidden');
				post.omitted = false;
			}
			if(needRMUpdate) {
				RefMap.upd(post, true);
			}
			post = post.next;
		}
		maybeSpells.end();
		thrEl.style.counterReset = 'de-cnt ' + (needToOmit - needToHide + 1);
		var btn = this.btns;
		if(btn !== thrEl.lastChild) {
			thrEl.appendChild(btn);
		}
		if(!$q('.de-thread-collapse', btn)) {
			$bEnd(btn, '<span class="de-thread-collapse"> [<a class="de-abtn" href="' +
				aib.getThrUrl(aib.b, this.thrId) + '"></a>]</span>'
			).onclick = e => {
				$pd(e);
				this.loadPosts(visPosts, true);
			};
		}
		if(needToShow > visPosts) {
			navPanel.addThr(this);
			btn.lastChild.style.display = 'initial';
		} else {
			navPanel.removeThr(this);
			$hide(btn.lastChild);
		}
		if(needToOmit > 0) {
			op.el.insertAdjacentHTML('afterend', '<div class="de-omitted">' + needToOmit + '</div>');
		}
		if(smartScroll) {
			scrollTo(window.pageXOffset, window.pageYOffset + this.next.top - nextCoord);
		}
		Pview.updatePosition(false);
		if(Cfg.hideReplies) {
			$q('.de-replies-btn', this.btns).firstElementChild.className = 'de-abtn de-replies-hide';
			if(Cfg.updThrBtns) {
				$show(btn.firstChild);
			}
		}
		closePopup('load-thr');
	}
	_loadNewFromBuilder(pBuilder) {
		var lastOffset = pr.isVisible ? pr.top : null,
			[newPosts, newVisPosts] = this._parsePosts(pBuilder);
		if(lastOffset !== null) {
			scrollTo(window.pageXOffset, window.pageYOffset + pr.top - lastOffset);
		}
		if(newPosts !== 0 || Panel.isNew) {
			Panel.updateCounter(
				pBuilder.length + 1 - this.hidCounter,
				$Q(aib.qPostImg, this.el).length,
				pBuilder.postersCount);
			Pview.updatePosition(true);
		}
		if(pBuilder.isClosed) {
			AjaxCache.clear();
			return { newCount: newVisPosts, locked: true };
		}
		return { newCount: newVisPosts, locked: false };
	}
	_parsePosts(pBuilder) {
		this._checkBans(pBuilder);
		var maybeSpells = new Maybe(SpellsRunner),
			newPosts = 0,
			newVisPosts = 0,
			len = pBuilder.length,
			post = this.lastNotDeleted,
			maybeVParser = new Maybe(Cfg.addYouTube ? VideosParser : null);
		if(post.count !== 0 && (
			aib.dobr || post.count > len || pBuilder.getPNum(post.count - 1) !== post.num
		)) {
			post = this.op.nextNotDeleted;
			var i, firstChangedPost = null;
			for(i = post.count - 1; i < len && post;) {
				if(post.num === pBuilder.getPNum(i)) {
					i++;
					post = post.nextNotDeleted;
					continue;
				}
				if(post.num > pBuilder.getPNum(i)) {
					if(!firstChangedPost) {
						firstChangedPost = post.prev;
					}
					var cnt = 0;
					do {
						cnt++;
						i++;
					} while(pBuilder.getPNum(i) < post.num);
					const res = this._importPosts(post.prev, pBuilder, i - cnt, i, maybeVParser, maybeSpells);
					newPosts += res[0];
					this.pcount += res[0];
					newVisPosts += res[1];
					$after(post.prev.wrap, res[2]);
					res[3].next = post;
					post.prev = res[3];
					DollchanAPI.notify('newpost', res[4]);
					for(var temp = post; temp; temp = temp.nextInThread) {
						temp.count += cnt;
					}
				} else {
					if(!firstChangedPost) {
						firstChangedPost = post;
					}
					post = this.deletePost(post, false, !aib.t);
				}
			}
			if(i === len && post) {
				this.deletePost(post, true, !aib.t);
			}
			if(firstChangedPost && maybeSpells.hasValue && maybeSpells.value.hasNumSpell) {
				for(post = firstChangedPost.nextInThread; post; post = post.nextInThread) {
					maybeSpells.value.run(post);
				}
			}
			if(newPosts !== 0) {
				for(post = firstChangedPost; post; post = post.nextInThread) {
					RefMap.upd(post, true);
				}
			}
		}
		if(len + 1 > this.pcount) {
			const res = this._importPosts(this.last, pBuilder, this.lastNotDeleted.count,
				len, maybeVParser, maybeSpells);
			newPosts += res[0];
			newVisPosts += res[1];
			this.el.appendChild(res[2]);
			this.last = res[3];
			DollchanAPI.notify('newpost', res[4]);
			this.pcount = len + 1;
		}
		readFavorites().then(fav => {
			var f = fav[aib.host];
			if(!f || !f[aib.b]) {
				return;
			}
			if((f = f[aib.b][this.op.num])) {
				var el = $q('#de-win-fav > .de-win-body');
				if(el && el.hasChildNodes()) {
					el = $q('.de-fav-current > .de-fav-entries > .de-entry[de-num="' +
						this.op.num + '"] .de-fav-inf-new', el);
					$hide(el);
					el.textContent = 0;
					el = el.nextElementSibling; // .de-fav-inf-old
					el.textContent = this.pcount;
				}
				f.cnt = this.pcount;
				f.new = 0;
				f.you = 0;
				f.last = aib.anchor + this.last.num;
				setStored('DESU_Favorites', JSON.stringify(fav));
			}
		});
		maybeVParser.end();
		maybeSpells.end();
		return [newPosts, newVisPosts];
	}
}

var navPanel = {
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
		case 'scroll': window.requestAnimationFrame(() => this._checkThreads()); break;
		case 'mouseover': this._expandCollapse(true, fixEventEl(e.relatedTarget)); break;
		case 'mouseout': this._expandCollapse(false, fixEventEl(e.relatedTarget)); break;
		case 'click': this._handleClick(e); break;
		}
	},
	init() {
		var el = $bEnd(docBody, `
		<div id="de-thr-navpanel" class="de-thr-navpanel-hidden" style="display: none;">
			<svg id="de-thr-navarrow"><use xlink:href="#de-symbol-nav-arrow"/></svg>
			<div id="de-thr-navup">
				<svg viewBox="0 0 24 24"><use xlink:href="#de-symbol-nav-up"/></svg>
			</div>
			<div id="de-thr-navdown">
				<svg viewBox="0 0 24 24"><use xlink:href="#de-symbol-nav-down"/></svg>
			</div>
		</div>`);
		el.addEventListener('mouseover', this, true);
		el.addEventListener('mouseout', this, true);
		el.addEventListener('click', this, true);
		this._el = el;
		this._thrs = new Set();
	},
	removeThr(thr) {
		this._thrs.delete(thr.el);
		if(this._thrs.size === 0) {
			$hide(this._el);
			this._currentThr = null;
			this._visible = false;
			doc.defaultView.removeEventListener('scroll', this);
		}
	},

	_currentThr : null,
	_el         : null,
	_showhideTO : 0,
	_thrs       : null,
	_visible    : false,
	_checkThreads() {
		var el = this._findCurrentThread();
		if(el) {
			if(!this._visible) {
				this._showHide(true);
			}
			this._currentThr = el;
		} else if(this._visible) {
			this._showHide(false);
		}
	},
	_findCurrentThread() {
		if('elementsFromPoint' in doc) {
			Object.defineProperty(this, '_findCurrentThread', {
				value() {
					return doc.elementsFromPoint(Post.sizing.wWidth / 2, Post.sizing.wHeight / 2)
						.find(el => this._thrs.has(el));
				}
			});
			return this._findCurrentThread();
		}
		Object.defineProperty(this, '_findCurrentThread', {
			value() {
				var el = document.elementFromPoint(Post.sizing.wWidth / 2, Post.sizing.wHeight / 2);
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
		var el = fixEventEl(e.target);
		if(el.tagName.toLowerCase() === 'svg') {
			el = el.parentNode;
		}
		switch(el.id) {
		case 'de-thr-navup':
			scrollTo(window.pageXOffset, window.pageYOffset +
				this._currentThr.getBoundingClientRect().top - 50);
			break;
		case 'de-thr-navdown':
			scrollTo(window.pageXOffset, window.pageYOffset +
				this._currentThr.getBoundingClientRect().bottom - Post.sizing.wHeight + 50);
			break;
		}
	},
	_expandCollapse(expand, rt) {
		if(!rt || !this._el.contains(rt.farthestViewportElement || rt)) {
			clearTimeout(this._showhideTO);
			this._showhideTO = setTimeout(
				expand ? () => this._el.classList.remove('de-thr-navpanel-hidden') :
				() => this._el.classList.add('de-thr-navpanel-hidden'),
				Cfg.linksOver);
		}
	},
	_showHide(show) {
		this._el.style.display = show ? 'initial' : 'none';
		this._visible = show;
	}
};

/* ==[ ThreadUpdater.js ]=====================================================================================
                                                THREAD UPDATER
=========================================================================================================== */

function initThreadUpdater(title, enableUpdate) {
	var focusLoadTime, paused = false,
		enabled = false,
		disabledByUser = true,
		lastECode = 200,
		sendError = false,
		newPosts = 0,
		hasYouRefs = false,
		storageName = 'de-lastpcount-' + aib.b + '-' + aib.t;

	var audio = {
		enabled  : false,
		repeatMS : 0,
		disable() {
			this.stop();
			this.enabled = false;
			const btn = $id('de-panel-audio-on');
			if(btn) {
				btn.id = 'de-panel-audio-off';
			}
		},
		play() {
			this.stop();
			if(this.repeatMS === 0) {
				this._el.play();
				return;
			}
			this._playInterval = setInterval(() => this._el.play(), this.repeatMS);
		},
		stop() {
			if(this._playInterval) {
				clearInterval(this._playInterval);
				this._playInterval = null;
			}
		},

		get _el() {
			const val = doc.createElement('audio');
			val.setAttribute('preload', 'auto');
			val.src = gitRaw + 'signal.ogg';
			Object.defineProperty(this, '_el', { val });
			return val;
		}
	};

	var counter = {
		enable() {
			this._enabled = true;
			$show(this._el);
		},
		disable() {
			this._enabled = false;
			this._stop();
			$hide(this._el);
		},
		count(delayMS, useCounter, callback) {
			if(this._enabled && useCounter) {
				var seconds = delayMS / 1000;
				this._set(seconds);
				this._countingIV = setInterval(() => {
					seconds--;
					if(seconds === 0) {
						this._stop();
						callback();
					} else {
						this._set(seconds);
					}
				}, 1000);
			} else {
				this._countingTO = setTimeout(() => {
					this._countingTO = null;
					callback();
				}, delayMS);
			}
		},
		setWait() {
			this._stop();
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
		_stop() {
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

	var favicon = {
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
			var icon = new Image();
			icon.onload = e => {
				try {
					this._initIconsHelper(e.target);
				} catch(err) {
					console.warn('Icon error:', err);
				}
			};
			if(aib.fch) {
				// Due to CORS we cannot apply href to icon.src directly
				$ajax(this._iconEl.href, { responseType: 'blob' }, false).then(xhr => {
					icon.src = 'response' in xhr ?
						window.URL.createObjectURL(xhr.response) : '/favicon.ico';
				}, emptyFn);
				return;
			}
			icon.src = this._iconEl.href;
		},
		updateIcon(isError) {
			if(!isError && !newPosts) {
				this._setIcon(this.originalIcon);
			} else if(this._hasIcons) {
				this._setIcon(isError ? this._iconError : hasYouRefs ? this._iconYou : this._iconNew);
			}
		},
		startBlinkNew() {
			if(this._hasIcons) {
				this._startBlink(hasYouRefs ? this._iconYou : this._iconNew);
			} else {
				this._startBlink(this._emptyIcon);
			}
		},
		startBlinkError() {
			this._startBlink(this._hasIcons ? this._iconError : this._emptyIcon);
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

		_blinkInterv : null,
		_blinkMS     : 800,
		_currentIcon : null,
		_emptyIcon   : 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
		_hasIcons    : false,
		_iconError   : null,
		_iconNew     : null,
		_iconYou     : null,
		_isInited    : false,
		_isOrigIcon  : true,
		get _iconEl() {
			var el = $q('link[rel="shortcut icon"]', doc.head) ||
				$bEnd(doc.head, '<link href="/favicon.ico" rel="shortcut icon"/>');
			Object.defineProperties(this, {
				_iconEl      : { value: el, writable: true },
				originalIcon : { value: el.href }
			});
			return el;
		},
		_initIconsHelper(icon) {
			function drawLines(ctx, line1, line2, color, width, scaleFactor) {
				ctx.beginPath();
				ctx.strokeStyle = color;
				ctx.lineWidth = width * scaleFactor;
				ctx.moveTo(line1[0] * scaleFactor, line1[1] * scaleFactor);
				ctx.lineTo(line1[2] * scaleFactor, line1[3] * scaleFactor);
				ctx.moveTo(line2[0] * scaleFactor, line2[1] * scaleFactor);
				ctx.lineTo(line2[2] * scaleFactor, line2[3] * scaleFactor);
				ctx.stroke();
			}
			var canvas = doc.createElement('canvas'),
				ctx = canvas.getContext('2d'),
				wh = Math.max(icon.naturalHeight, 16 * (window.devicePixelRatio || 1)),
				scale = wh / 16;
			canvas.width = canvas.height = wh;
			ctx.drawImage(icon, 0, 0, wh, wh);
			var original = ctx.getImageData(0, 0, wh, wh);
			drawLines(ctx, [15, 15, 7, 7], [7, 15, 15, 7], '#780000', 3, scale);
			drawLines(ctx, [14.5, 14.5, 7.5, 7.5], [7.5, 14.5, 14.5, 7.5], '#fa2020', 1.5, scale);
			this._iconError = canvas.toDataURL('image/png');
			ctx.putImageData(original, 0, 0);
			drawLines(ctx, [6, 11, 16, 11], [11, 6, 11, 16], '#1c5f23', 4, scale);
			drawLines(ctx, [7, 11, 15, 11], [11, 7, 11, 15], '#00f51b', 2, scale);
			this._iconNew = canvas.toDataURL('image/png');
			ctx.putImageData(original, 0, 0);
			drawLines(ctx, [6, 11, 16, 11], [11, 6, 11, 16], '#122091', 4, scale);
			drawLines(ctx, [7, 11, 15, 11], [11, 7, 11, 15], '#1b6df5', 2, scale);
			this._iconYou = canvas.toDataURL('image/png');
			this._hasIcons = true;
		},
		_setIcon(iconUrl) {
			$del(this._iconEl);
			this._iconEl = $aBegin(doc.head, '<link rel="shortcut icon" href="' + iconUrl + '">');
		},
		_startBlink(iconUrl) {
			if(this._blinkInterv) {
				if(this._currentIcon === iconUrl) {
					return;
				}
				clearInterval(this._blinkInterv);
			}
			this._currentIcon = iconUrl;
			this._blinkInterv = setInterval(() => {
				this._setIcon(this._isOrigIcon ? this._currentIcon : this.originalIcon);
				this._isOrigIcon = !this._isOrigIcon;
			}, this._blinkMS);
		}
	};

	var notification = {
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

		show() {
			const new10 = newPosts % 10;
			const quantity = lang !== 0 ? +(newPosts !== 1) :
				new10 > 4 || new10 === 0 || (((newPosts % 100) / 10) | 0) === 1 ? 2 :
				new10 === 1 ? 0 : 1;
			const post = Thread.first.last;
			const notif = new Notification(`${ aib.dm }/${ aib.b }/${ aib.t }: ${ newPosts } ${
				Lng.newPost[lang][quantity] }. ${ Lng.newPost[lang][3] }:`,
			{
				body : post.text.substring(0, 250).replace(/\s+/g, ' '),
				icon : post.images.firstAttach ? post.images.firstAttach.src : favicon.originalIcon,
				tag  : aib.dm + aib.b + aib.t
			});
			notif.onshow = () => setTimeout(() => {
				if(notif === this._notifEl) {
					this.close();
				}
			}, 12e3);
			notif.onclick = () => window.focus();
			notif.onerror = () => {
				window.focus();
				this._requestPermission();
			};
			this._notifEl = notif;
		},
		close() {
			if(this._notifEl) {
				this._notifEl.close();
				this._notifEl = null;
			}
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

	var updMachine = {
		start(needSleep = false, loadOnce = false) {
			if(this._state !== -1) {
				this.stop(false);
			}
			this._state = 0;
			this._loadOnce = loadOnce;
			this._delay = this._initDelay = Cfg.updThrDelay * 1e3;
			if(!loadOnce) {
				this._setUpdateStatus('on');
			}
			this._makeStep(needSleep);
		},
		stop(updateStatus = true) {
			if(this._state !== -1) {
				this._state = -1;
				if(this._loadPromise) {
					this._loadPromise.cancel();
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

		_handleNewPosts(lPosts, error) {
			if(error instanceof CancelError) {
				return;
			}
			infoLoadErrors(error, false);
			var eCode = (error instanceof AjaxError) ? error.code : 0;
			if(eCode !== 200 && eCode !== 304) {
				if(doc.hidden && favicon.canBlink) {
					favicon.startBlinkError();
				}
				if(eCode === -1 || (eCode === 404 && lastECode === 404)) {
					Thread.removeSavedData(aib.b, aib.t);
					updateTitle(eCode);
					disableUpdater();
				} else {
					this._setUpdateStatus('warn');
					if(!Cfg.noErrInTitle) {
						updateTitle(eCode);
					}
					this._makeStep();
				}
				lastECode = eCode;
				return;
			}
			if(lastECode !== 200) {
				favicon.stopBlink();
				this._setUpdateStatus('on');
				if(!Cfg.noErrInTitle) {
					updateTitle(eCode);
				}
			}
			lastECode = eCode;
			if(doc.hidden) {
				if(lPosts !== 0) {
					newPosts += lPosts;
					updateTitle();
					if(favicon.canBlink) {
						favicon.startBlinkNew();
					}
					if(notification.canShow) {
						notification.show();
					}
					if(audio.enabled) {
						audio.play();
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
						e => this._handleNewPosts(0, e));
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
				this._panelButton.title = Lng.panelBtn['upd-' + (status === 'off' ? 'off' : 'on')][lang];
				if(nav.Presto) {
					this._panelButton.innerHTML =
						'<svg class="de-panel-svg"><use xlink:href="#de-symbol-panel-upd"/></svg>';
				}
			}
		}
	};

	function enableUpdater() {
		enabled = true;
		disabledByUser = paused = hasYouRefs = false;
		newPosts = 0;
		focusLoadTime = -1e4;
		notification.checkPermission();
		if(Cfg.updCount) {
			counter.enable();
		}
		favicon.initIcons();
	}

	function disableUpdater() {
		if(enabled) {
			audio.disable();
			counter.disable();
			updMachine.stop();
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
		doc.title = (sendError === true ? '{' + Lng.error[lang] + '} ' : '') +
			(eCode <= 0 || eCode === 200 ? '' : '{' + eCode + '} ') +
			(newPosts === 0 ? '' : '[' + newPosts + '] ') + title;
		favicon.updateIcon(eCode !== 200 && eCode !== 304);
	}

	doc.addEventListener('visibilitychange', e => {
		if(!doc.hidden) {
			var focusTime = e.timeStamp;
			favicon.stopBlink();
			audio.stop();
			notification.close();
			newPosts = 0;
			hasYouRefs = false;
			sendError = false;
			setTimeout(function() {
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
		enable() {
			if(!enabled) {
				enableUpdater();
				updMachine.start();
			}
		},
		disable() {
			disabledByUser = true;
			disableUpdater();
		},
		toggle() {
			if(enabled) {
				this.disable();
			} else {
				this.enable();
			}
		},
		forceLoad(e) {
			if(e) {
				$pd(e);
			}
			Post.clearMarks();
			if(enabled && paused) {
				return;
			}
			$popup('newposts', Lng.loading[lang], true);
			forceLoadPosts();
		},
		pause() {
			if(enabled && !paused) {
				updMachine.stop();
				paused = true;
			}
		},
		continue(needSleep = false) {
			if(enabled && paused) {
				updMachine.start(needSleep);
				paused = false;
			}
		},
		toggleAudio(repeatMS) {
			if(audio.enabled) {
				audio.stop();
				return (audio.enabled = false);
			}
			audio.repeatMS = repeatMS;
			return (audio.enabled = true);
		},
		toggleCounter(enableCnt) {
			if(enableCnt) {
				counter.enable();
				counter.setWait();
			} else {
				counter.disable();
			}
			forceLoadPosts();
		},
		sendErrNotif() {
			if(Cfg.sendErrNotif && doc.hidden) {
				sendError = true;
				updateTitle();
			}
		},
		refToYou() {
			if(doc.hidden) {
				hasYouRefs = true;
			}
		}
	};
}

/* ==[ DelForm.js ]===========================================================================================
                                                   DELFORM
=========================================================================================================== */

class DelForm {
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
	static getThreads(formEl) {
		var threads = $Q(aib.qThread, formEl),
			len = threads.length;
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

	static _parseClasslessThreads(formEl) {
		let i, len, cThr = doc.createElement('div');
		const threads = [];
		const fNodes = [...formEl.childNodes];
		for(i = 0, len = fNodes.length - 1; i < len; ++i) {
			const node = fNodes[i];
			if(node.tagName === 'HR') {
				formEl.insertBefore(cThr, node);
				if(!aib.tinyib) {
					formEl.insertBefore(cThr.lastElementChild, node);
				}
				const el = cThr.lastElementChild;
				if(el.tagName === 'BR') {
					formEl.insertBefore(el, node);
				}
				try {
					aib.getTNum(cThr);
					threads.push(cThr);
				} catch(e) {}
				cThr = doc.createElement('div');
			} else {
				cThr.appendChild(node);
			}
		}
		cThr.appendChild(fNodes[i]);
		formEl.appendChild(cThr);
		return threads;
	}
	constructor(formEl, pageNum, prev = null) {
		var thr = null;
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
		$each($Q('script', this.el), $del);
		var threads = DelForm.getThreads(this.el),
			len = threads.length;
		for(var i = 0; i < len; ++i) {
			var num = aib.getTNum(threads[i]);
			if(DelForm.tNums.has(num)) {
				var el = threads[i],
					thrNext = threads[i + 1],
					elNext = el.nextSibling;
				while(elNext && elNext !== thrNext) {
					$del(elNext);
					elNext = el.nextSibling;
				}
				$del(el);
				console.log('Repeated thread: ' + num);
			} else {
				DelForm.tNums.add(num);
				thr = new Thread(threads[i], num, thr, this);
				if(this.firstThr === null) {
					this.firstThr = thr;
				}
			}
		}
		if(this.firstThr === null) {
			if(prev) {
				this.lastThr = prev.lastThr;
			}
			return;
		}
		this.lastThr = thr;
	}
	get passEl() {
		const value = $q(aib.qDelPassw, this.el);
		Object.defineProperty(this, 'passEl', { value });
		return value;
	}
	addStuff() {
		const { el } = this;
		if(!localData && Cfg.ajaxPosting) {
			el.onsubmit = $pd;
			const btn = $q(aib.qDelBut, el);
			if(btn) {
				btn.onclick = e => {
					$pd(e);
					pr.closeReply();
					$popup('delete', Lng.deleting[lang], true);
					html5Submit(el, e.target).then(checkDelete).catch(
						e => $popup('delete', getErrorMessage(e)));
				};
			}
		}
		Logger.log('Init AJAX');
		preloadImages(el);
		Logger.log('Preload images');
		embedMediaLinks(el);
		Logger.log('Audio links');
		if(Cfg.addYouTube) {
			new VideosParser().parse(el).end();
			Logger.log('Video links');
		}
		if(Cfg.addImgs) {
			embedImagesLinks(el);
			Logger.log('Image-links');
		}
		processImagesLinks(el);
		Logger.log('Image names');
		RefMap.init(this);
		Logger.log('Reflinks map');
	}
}
DelForm.tNums = new Set();

/* ==[ Browser.js ]===========================================================================================
                                      BROWSER DETECTORS AND DEPENDENCIES
=========================================================================================================== */

function checkStorage() {
	try {
		locStorage = window.localStorage;
		sesStorage = window.sessionStorage;
		sesStorage['__de-test'] = 1;
	} catch(e) {
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
	const isChromeStorage = (typeof chrome === 'object') && !!chrome && !!chrome.storage;
	const isScriptStorage = !!scriptStorage && !ua.includes('Opera Mobi');
	const isNewGM = /* global GM */ typeof GM !== 'undefined' && typeof GM.xmlHttpRequest === 'function';
	let isGM = false;
	if(!isNewGM) {
		try {
			isGM = (typeof GM_setValue === 'function') &&
				(!isChrome || !GM_setValue.toString().includes('not supported'));
		} catch(e) {
			isGM = e.message === 'Permission denied to access property "toString"';
		}
	}
	if(!('requestAnimationFrame' in window)) { // XXX: nav.Presto
		window.requestAnimationFrame = fn => setTimeout(fn, 0);
	}
	if(!('remove' in Element.prototype)) { // XXX: nav.Presto
		Element.prototype.remove = function() {
			if(this.parentNode) {
				this.parentNode.removeChild(this);
			}
		};
	}
	let needFileHack = false;
	try {
		new File([''], '');
		if(isFirefox || isSafari) {
			needFileHack = !FormData.prototype.get;
		}
	} catch(e) {
		needFileHack = true;
	}
	if(needFileHack && FormData) {
		const OrigFormData = FormData;
		const origAppend = FormData.prototype.append;
		FormData = function FormData(form) {
			const rv = form ? new OrigFormData(form) : new OrigFormData();
			rv.append = function append(name, value, fileName = null) {
				if(value instanceof Blob && 'name' in value && fileName === null) {
					return origAppend.call(this, name, value, value.name);
				}
				return origAppend.apply(this, arguments);
			};
			return rv;
		};
		window.File = function File(arr, name) {
			const rv = new Blob(arr);
			rv.name = name;
			return rv;
		};
	}
	if('toJSON' in aProto) {
		delete aProto.toJSON;
	}
	nav = {
		get ua() {
			return navigator.userAgent + (this.isFirefox ? ' [' + navigator.buildID + ']' : '');
		},
		isFirefox,
		isWebkit,
		isChrome,
		isSafari,
		isGM,
		isNewGM,
		isChromeStorage,
		isScriptStorage,
		Presto   : !!window.opera,
		MsEdge   : ua.includes('Edge/'),
		isGlobal : isGM || isNewGM || isChromeStorage || isScriptStorage,
		hasGMXHR : (typeof GM_xmlhttpRequest === 'function') ||
			isNewGM && (typeof GM.xmlHttpRequest === 'function'),
		get isESNext() {
			return typeof deMainFuncOuter === 'undefined';
		},
		get scriptInstall() {
			if(this.isNewGM) {
				return GM.info ? `${ GM.info.scriptHandler } ${ GM.info.version }` : 'Greasemonkey';
			}
			if(this.isFirefox) {
				return typeof GM_info !== 'undefined' ? GM_info.scriptHandler || 'Greasemonkey' : 'Scriptish';
			}
			return isChromeStorage ? 'WebExtension' : isGM ? 'Monkey' : 'Native userscript';
		},
		cssMatches(leftSel, ...rules) {
			return leftSel + rules.join(', ' + leftSel);
		},
		fixLink: isSafari ? getAbsLink : function fixLink(url) {
			return url;
		},
		get hasTemplate() {
			const value = 'content' in document.createElement('template');
			Object.defineProperty(this, 'hasTemplate', { value });
			return value;
		},
		get hasWorker() {
			let value = false;
			try {
				value = 'Worker' in window && 'URL' in window;
			} catch(e) {}
			if(value && this.isFirefox) {
				value = +(navigator.userAgent.match(/rv:(\d{2,})\./) || [])[1] >= 40;
			}
			Object.defineProperty(this, 'hasWorker', { value });
			return value;
		},
		get canPlayMP3() {
			const value = !!new Audio().canPlayType('audio/mpeg;');
			Object.defineProperty(this, 'canPlayMP3', { value });
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
			const value = document.compatMode && document.compatMode === 'CSS1Compat' ?
				() => doc.documentElement.clientHeight : () => docBody.clientHeight;
			Object.defineProperty(this, 'viewportHeight', { value });
			return value;
		},
		get viewportWidth() {
			const value = document.compatMode && document.compatMode === 'CSS1Compat' ?
				() => doc.documentElement.clientWidth : () => docBody.clientWidth;
			Object.defineProperty(this, 'viewportWidth', { value });
			return value;
		},
		// Workaround for old greasemonkeys
		getUnsafeUint8Array(data, i, len) {
			let Ctor = Uint8Array;
			if(!nav.isNewGM && nav.isFirefox) {
				try {
					if(!(new Uint8Array(data) instanceof Uint8Array)) {
						Ctor = unsafeWindow.Uint8Array;
					}
				} catch(e) {
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
		getUnsafeDataView(data, offset) {
			const rv = new DataView(data, offset || 0);
			return nav.isNewGM || !nav.isFirefox || (rv instanceof DataView) ?
				rv : new unsafeWindow.DataView(data, offset || 0);
		}
	};
}

/* ==[ BoardDefaults.js ]=====================================================================================
                                             IMAGEBOARD DEFAULTS
=========================================================================================================== */

class BaseBoard {
	constructor(prot, dm) {
		// Query paths
		this.cReply = 'reply';
		this.qBan = null;
		this.qClosed = null;
		this.qDelBut = 'input[type="submit"]'; // Differs _4chanOrg only
		this.qDelPassw = 'input[type="password"], input[name="password"]'; // Differs Vichan only
		this.qDForm = '#delform, form[name="delform"]';
		this.qError = 'h1, h2, font[size="5"]';
		this.qForm = '#postform';
		this.qFormPassw = 'tr input[type="password"]'; // Differs Tinyboard only
		this.qFormRedir = 'input[name="postredir"][value="1"]';
		this.qFormRules = '.rules, #rules';
		this.qImgInfo = '.filesize';
		this.qOmitted = '.omittedposts';
		this.qOPost = '.oppost';
		this.qPages = 'table[border="1"] > tbody > tr > td:nth-child(2) > a:last-of-type';
		this.qPostHeader = '.de-post-btns';
		this.qPostImg = '.thumb, .ca_thumb, img[src*="thumb"], img[src*="/spoiler"], img[src^="blob:"]';
		this.qPostMsg = 'blockquote';
		this.qPostName = '.postername, .commentpostername';
		this.qPostSubj = '.filetitle';
		this.qPostTrip = '.postertrip';
		this.qPostRef = '.reflink';
		this.qRPost = '.reply';
		this.qTrunc = '.abbrev, .abbr, .shortened';

		this.anchor = '#';
		this.b = '';
		this.dm = dm;
		this.docExt = null;
		this.firstPage = 0;
		this.formParent = 'parent';
		this.hasCatalog = false;
		this.hasOPNum = false; // Sets in Makaba only
		this.hasPicWrap = false;
		this.hasTextLinks = false;
		this.host = window.location.hostname;
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

		this._qTable = 'form > table, div > table, div[id^="repl"]';
	}
	get qFormMail() {
		return nav.cssMatches('tr:not([style*="none"]) input:not([type="hidden"]):not([style*="none"])',
			'[name="email"]', '[name="em"]', '[name="field2"]', '[name="sage"]');
	}
	get qFormName() {
		return nav.cssMatches('tr:not([style*="none"]) input:not([type="hidden"]):not([style*="none"])',
			'[name="name"]', '[name="field1"]');
	}
	get qFormSubj() {
		return nav.cssMatches('tr:not([style*="none"]) input:not([type="hidden"]):not([style*="none"])',
			'[name="subject"]', '[name="field3"]');
	}
	get qImgNameLink() {
		const value = nav.cssMatches(this.qImgInfo + ' a',
			'[href$=".jpg"]', '[href$=".jpeg"]', '[href$=".png"]', '[href$=".gif"]',
			'[href$=".webm"]', '[href$=".mp4"]', '[href$=".apng"]', ', [href^="blob:"]');
		Object.defineProperty(this, 'qImgNameLink', { value });
		return value;
	}
	get qMsgImgLink() { // Sets here only
		const value = nav.cssMatches(this.qPostMsg + ' a', '[href$=".jpg"]', '[href$=".jpeg"]',
			'[href$=".png"]', '[href$=".gif"]');
		Object.defineProperty(this, 'qMsgImgLink', { value });
		return value;
	}
	get qThread() {
		const value = $q('.thread') ? '.thread' : '[id^="thread"]';
		Object.defineProperty(this, 'qThread', { value });
		return value;
	}
	get capLang() { // Differs _410chanOrg only
		return this.ru ? 2 : 1;
	}
	get catalogUrl() {
		return this.prot + '//' + this.host + '/' + this.b + '/catalog.html';
	}
	get css() {
		return '';
	}
	get delTruncMsg() {
		return null;
	}
	get fixDeadLinks() {
		return null;
	}
	get fixHTMLHelper() {
		return null;
	}
	get fixFileInputs() {
		return null;
	}
	get getSubmitData() {
		return null;
	}
	get initCaptcha() {
		return null;
	}
	get isArchived() {
		return false;
	}
	get lastPage() { // Differs Makaba only
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
	get observeContent() { // Differs _0chanHk only
		return null;
	}
	get reCrossLinks() { // Sets here only
		const value = new RegExp(`>https?:\\/\\/[^\\/]*${ this.dm }\\/([a-z0-9]+)\\/` +
			quoteReg(this.res) + '(\\d+)(?:[^#<]+)?(?:#i?(\\d+))?<', 'g');
		Object.defineProperty(this, 'reCrossLinks', { value });
		return value;
	}
	get thrId() { // Differs _0chanHk only
		return null;
	}
	get updateCaptcha() {
		return null;
	}
	disableRedirection(el) { // Differs Dobrochan only
		$hide($parent(el, 'TR'));
		el.checked = true;
	}
	fixHTML(data, isForm = false) {
		if(!(dTime || Spells.reps || Cfg.crossLinks || Cfg.decodeLinks ||
			this.fixHTMLHelper || this.fixDeadLinks || this.hasTextLinks)
		) {
			return data;
		}
		var str;
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
				(x, a, b, c) => c ? x : a + '<a rel="noreferrer" href="' + b + '">' + b + '</a>');
		}
		if(Spells.reps) {
			str = Spells.replace(str);
		}
		if(Cfg.crossLinks) {
			str = str.replace(aib.reCrossLinks,
				(str, b, tNum, pNum) => '>&gt;&gt;/' + b + '/' + (pNum || tNum) + '<');
		}
		if(Cfg.decodeLinks) {
			str = str.replace(/>https?:\/\/[^<]+</ig, function(match) {
				try {
					return decodeURI(match);
				} catch(e) {}
				return match;
			});
		}
		if(typeof data === 'string') {
			return str;
		}
		if(isForm) {
			const newForm = $bBegin(data, str);
			$hide(data);
			window.addEventListener('load', () => $del($id('de-dform-old')));
			return newForm;
		}
		data.innerHTML = str;
		return data;
	}
	fixVideo(isPost, data) {
		var videos = [],
			els = $Q('embed, object, iframe', isPost ? data.el : data);
		for(var i = 0, len = els.length; i < len; ++i) {
			var m, el = els[i],
				src = el.src || el.data;
			if(src) {
				if((m = src.match(Videos.ytReg))) {
					videos.push([isPost ? data : this.getPostOfEl(el), m, true]);
					$del(el);
				}
				if(Cfg.addVimeo && (m = src.match(Videos.vimReg))) {
					videos.push([isPost ? data : this.getPostOfEl(el), m, false]);
					$del(el);
				}
			}
		}
		return videos;
	}
	getBanId(postEl) { // Differs Makaba only
		return this.qBan && $q(this.qBan, postEl) ? 1 : 0;
	}
	getCaptchaSrc(src, tNum) {
		const tmp = src.replace(/pl$/, 'pl?key=mainpage&amp;dummy=')
			.replace(/dummy=[\d.]*/, 'dummy=' + Math.random());
		return tNum ? tmp.replace(/mainpage|res\d+/, 'res' + tNum) : tmp.replace(/res\d+/, 'mainpage');
	}
	getImgInfo(wrap) {
		const el = $q(this.qImgInfo, wrap);
		return el ? el.textContent : '';
	}
	getImgRealName(wrap) {
		return $q(this.qImgNameLink, wrap)[Cfg.delImgNames ? 'title' : 'textContent'];
	}
	getImgSrcLink(img) {
		return $parent(img, 'A');
	}
	getImgWrap(img) {
		return $parent(img, 'A').parentNode;
	}
	getJsonApiUrl() {}
	getOmitted(el) {
		var txt;
		return el && (txt = el.textContent) ? +(txt.match(/\d+/) || [0])[0] + 1 : 1;
	}
	getOp(thr) { // Differs Arhivach only
		var op = localData ? $q('div[de-oppost]', thr) : $q(this.qOPost, thr);
		if(op) {
			return op;
		}
		op = thr.ownerDocument.createElement('div');
		op.setAttribute('de-oppost', '');
		var el, opEnd = $q(this._qTable, thr);
		while((el = thr.firstChild) && (el !== opEnd)) {
			op.appendChild(el);
		}
		if(thr.hasChildNodes()) {
			thr.insertBefore(op, thr.firstChild);
		} else {
			thr.appendChild(op);
		}
		return op;
	}
	getPageUrl(b, p) {
		return fixBrd(b) + (p > 0 ? p + this.docExt : '');
	}
	getPNum(post) {
		return +post.id.match(/\d+/)[0]; // Must return a Number, not a String!
	}
	getPostElOfEl(el) {
		var sel = this.qRPost + ', [de-thread]';
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
		if(el.tagName === 'TD') {
			Object.defineProperty(this, 'getPostWrap', {
				value(el, isOp) {
					return isOp ? el : $parent(el, 'TABLE');
				}
			});
		} else {
			Object.defineProperty(this, 'getPostWrap', {
				value(el) {
					return el;
				}
			});
		}
		return this.getPostWrap(el, isOp);
	}
	getSage(post) {
		var a = $q('a[href^="mailto:"], a[href="sage"]', post);
		return !!a && /sage/i.test(a.href);
	}
	getThrUrl(b, tNum) { // Differs Arhivach only
		return this.prot + '//' + this.host + fixBrd(b) + this.res + tNum + this.docExt;
	}
	getTNum(op) {
		return +$q('input[type="checkbox"]', op).value;
	}
	insertYtPlayer(msg, playerHtml) {
		return $bBegin(msg, playerHtml);
	}
	parseURL() {
		const url = (window.location.pathname || '').replace(/^\//, '');
		if(url.match(this.res)) { // We are in thread
			const temp = url.split(this.res);
			this.b = temp[0].replace(/\/$/, '');
			this.t = +temp[1].match(/^\d+/)[0];
			this.page = this.firstPage;
		} else { // We are on board
			const temp = url.match(/\/?(\d+)[^/]*?$/);
			this.page = temp && +temp[1] || this.firstPage;
			this.b = url.replace(temp && this.page ? temp[0] : /\/(?:[^/]+\.[a-z]+)?$/, '');
		}
		if(this.docExt === null) {
			this.docExt = (url.match(/\.[a-z]+$/) || ['.html'])[0];
		}
	}
}

/* ==[ BoardDetector.js ]=====================================================================================
                                             IMAGEBOARD DETECTOR
=========================================================================================================== */

function getImageBoard(checkDomains, checkEngines) {
	var ibDomains = {};
	var ibEngines = [];

	// ENGINES
	class Makaba extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);
			this.mak = true;

			this.cReply = 'post reply';
			this.qBan = '.pomyanem';
			this.qClosed = '.sticky-img[src$="locked.png"]';
			this.qDForm = '#posts-form';
			this.qFormRedir = null;
			this.qFormRules = '.rules-area';
			this.qImgInfo = '.file-attr';
			this.qOmitted = '.mess-post';
			this.qPostHeader = '.post-details';
			this.qPostImg = '.preview';
			this.qPostMsg = '.post-message';
			this.qPostName = '.ananimas, .post-email';
			this.qPostSubj = '.post-title';
			this.qRPost = '.post.reply[data-num]';
			this.qTrunc = null;

			this.formParent = 'thread';
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
		get qImgNameLink() {
			return '.file-attr > .desktop';
		}
		get css() {
			return `#ABU-alert-wait, .ABU-refmap, .box[onclick="ToggleSage()"], .fa-media-icon,
					img[alt="webm file"], .kupi-passcode-suka, .logo + hr, .media-expand-button,
					#media-thumbnail, .message-byte-len, .nav-arrows, .news, .norm-reply, .postform-hr,
					.postpanel > :not(img), .posts > hr, .prerekl-hr, .reflink::before, .thread-nav,
					.toolbar-area, .top-user-boards + hr { display: none !important; }
				.captcha-image > img { cursor: pointer; }
				#de-txt-panel { font-size: 16px !important; }
				.mess-post { display: block; }
				.oekaki-height, .oekaki-width { width: 36px !important; }
				.post.reply .post-message { max-height: initial !important; }
				.tmp_postform { width: auto; }
				.de-win-inpost { position: static !important; }
				${ Cfg.expandTrunc ? `.expand-large-comment,
					div[id^="shrinked-post"] { display: none !important; }
					div[id^="original-post"] { display: block !important; }` : '' }
				${ Cfg.delImgNames ? `.filesize { display: inline !important; }
					.file-attr { margin-bottom: 1px; }` : '' }
				${ Cfg.expandImgs ? '#fullscreen-container { display: none !important; }' : '' }
				${ Cfg.txtBtnsLoc ? `.message-sticker-btn, .message-sticker-preview {
					bottom: 25px !important; }` : '' }`;
		}
		get lastPage() {
			const els = $Q('.pager > a:not([class])');
			const value = els ? els.length : 1;
			Object.defineProperty(this, 'lastPage', { value });
			return value;
		}
		get markupTags() {
			return ['B', 'I', 'U', 'S', 'SPOILER', 'CODE', 'SUP', 'SUB'];
		}
		delTruncMsg(post, el) {
			$del(el.previousSibling);
			$show(el.previousSibling);
			$del(el);
		}
		fixFileInputs(el) {
			let str = '';
			for(let i = 0; i < 8; ++i) {
				str += `<div${ i ? ' style="display: none;"' : ''
				}><input type="file" name="image${ i + 1 }"></div>`;
			}
			el.innerHTML = str;
		}
		getBanId(postEl) {
			var el = $q(this.qBan, postEl);
			if(!el) {
				return 0;
			}
			return el.textContent.includes('предупрежден') ? 2 : 1;
		}
		getImgWrap(img) {
			return img.parentNode.parentNode.parentNode;
		}
		getJsonApiUrl(brd, tNum) {
			return `/${ brd }/res/${ tNum }.json`;
		}
		getPNum(post) {
			return +post.getAttribute('data-num');
		}
		getPostWrap(el) {
			return el.parentNode;
		}
		getSage(post) {
			if($q('.ananimas > span[id^="id_tag_"], .post-email > span[id^="id_tag_"]')) {
				this.getSage = function(post) {
					var name = $q(this.qPostName, post);
					return name ? name.childElementCount === 0 && !$q('.ophui', post) : false;
				};
			} else {
				this.getSage = super.getSage;
			}
			return this.getSage(post);
		}
		getSubmitData(json) {
			var error = null, postNum = null;
			if(json.Status === 'OK') {
				postNum = +json.Num;
			} else if(json.Status === 'Redirect') {
				postNum = +json.Target;
			} else {
				error = Lng.error[lang] + ':\n' + json.Reason;
			}
			return { error, postNum };
		}
		init() {
			$script(`(function() {
				var emptyFn = Function.prototype;
				function fixGlobalFunc(name) {
					Object.defineProperty(window, name,
						{ value: emptyFn, writable: false, configurable: false });
				}
				fixGlobalFunc("$alert");
				fixGlobalFunc("autorefresh_start");
				fixGlobalFunc("linkremover");
				fixGlobalFunc("scrollTo");
				window.FormData = void 0;
				$(function() { $(window).off(); });
			})();`);
			$each($Q('.autorefresh'), $del);
			var el = $q('td > .anoniconsselectlist');
			if(el) {
				$q('.option-area > td:last-child').appendChild(el);
			}
			if((el = $q('.search'))) {
				let node = $q('.adminbar__menu, .menu');
				if(node && (node = node.firstChild)) {
					$before(node, el);
				}
			}
			if((el = $id('shampoo'))) {
				el.tabIndex = 1;
			}
			$del($id('favorites-box'));
			return false;
		}
		initCaptcha(cap) {
			if(cap.textEl) {
				cap.textEl.tabIndex = 999;
			}
			return this.updateCaptcha(cap);
		}
		updateCaptcha(cap) {
			let type;
			try {
				type = JSON.parse(locStorage.store).other.captcha_provider || '2chaptcha';
			} catch(e) {
				type = '2chaptcha';
			}
			const url = cap.textEl ? `/api/captcha/${ type }/id?board=${ this.b }&thread=` + pr.tNum :
				'/api/captcha/recaptcha/id';
			return cap.updateHelper(url, xhr => {
				const box = $q('.captcha-box', cap.parentEl);
				let data = xhr.responseText;
				try {
					data = JSON.parse(data);
				} catch(e) {}
				switch(data.result) {
				case 0:
					box.innerHTML = 'Пасс-код не действителен. <a href="#" id="renew-pass-btn">Обновить</a>';
					break;
				case 2:
					box.textContent = 'Вам не нужно вводить капчу, у вас введен пасс-код.';
					break;
				case 3: return CancelablePromise.reject(); // Captcha is disabled
				case 1: // Captcha is enabled
					if(data.type === 'recaptcha') {
						$q('.captcha-key').value = data.id;
						if(!$id('captcha-widget-main').hasChildNodes()) {
							$script(`deCapWidget = grecaptcha.render('captcha-widget-main',
								{ sitekey: "${ data.id }" });`);
						} else {
							$script('grecaptcha.reset(deCapWidget);');
						}
						break;
					} else if(type === '2chaptcha') {
						// Get old captcha image
						const src = `/api/captcha/${ type }/image/` + data.id;
						let image = $id('de-image-captcha');
						if(image) {
							image.src = '';
							image.src = src;
						} else {
							image = $q('.captcha-image', cap.parentEl);
							image.innerHTML = `<img id="de-image-captcha" src="${ src }">`;
							cap.initImage(image.firstChild);
						}
						$q('input[name="2chaptcha_id"]', cap.parentEl).value = data.id;
						break;
					}
					/* falls through */
				default: box.innerHTML = data;
				}
			});
		}
	}
	ibEngines.push(['body.makaba', Makaba]);
	ibDomains['2ch.hk'] = Makaba;
	ibDomains['2ch.pm'] = Makaba;

	class Tinyboard extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);
			this.tiny = true;

			this.cReply = 'post reply';
			this.qClosed = '.fa-lock';
			this.qDForm = 'form[name*="postcontrols"]';
			this.qForm = 'form[name="post"]';
			this.qFormPassw = 'input[name="password"]';
			this.qFormRedir = null;
			this.qImgInfo = '.fileinfo';
			this.qOmitted = '.omitted';
			this.qPages = '.pages > a:nth-last-of-type(2)';
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
			this.jsonSubmit = true;
			this.timePattern = 'nn+dd+yy++w++hh+ii+ss';

			this._qTable = '.post.reply';
		}
		get qImgNameLink() {
			return 'p.fileinfo > a:first-of-type';
		}
		get css() {
			return `.banner, ${ this.t ? '' : '.de-btn-rep,' } .hide-thread-link, .mentioned,
					.post-hover { display: none !important; }
				div.post.reply:not(.de-entry):not(.de-cfg-tab):not(.de-win-body) {
					float: left !important; clear: left; display: block; }`;
		}
		get markupTags() {
			return ["'''", "''", '__', '~~', '**', '[code'];
		}
		fixVideo(isPost, data) {
			var videos = [],
				els = $Q('.video-container, #ytplayer', isPost ? data.el : data);
			for(var i = 0, len = els.length; i < len; ++i) {
				var el = els[i];
				videos.push([isPost ? data : this.getPostOfEl(el), el.id === 'ytplayer' ?
					el.src.match(Videos.ytReg) : ['', el.getAttribute('data-video')], true]);
				$del(el);
			}
			return videos;
		}
		getImgRealName(wrap) {
			return $q('.postfilename, .unimportant > a', wrap).textContent;
		}
		getPageUrl(b, p) {
			return p > 1 ? fixBrd(b) + p + this.docExt : fixBrd(b);
		}
		getSubmitData(json) {
			return { error: json.error, postNum: json.id && +json.id };
		}
		getTNum(op) {
			return +$q('input[type="checkbox"]', op).name.match(/\d+/)[0];
		}
		init() {
			$script('window.FormData = void 0');
			var form = $q('form[name="post"]');
			if(form) {
				form.insertAdjacentHTML('beforeend', '<input name="json_response" value="1" type="hidden">');
			}
			return false;
		}
	}
	ibEngines.push(['form[name*="postcontrols"]', Tinyboard]);

	class Vichan extends Tinyboard {
		constructor(prot, dm) {
			super(prot, dm);

			this.qDelPassw = '#password';
			this.qPostImg = '.post-image';

			this.multiFile = true;
		}
		get css() {
			return super.css + `.boardlist { position: static !important; }
				body { padding: 0 5px !important; }
				.fileinfo { width: 250px; }
				.multifile { width: auto !important; }
				#expand-all-images, #expand-all-images + .unimportant, .post-btn, small {
					display: none !important; }`;
		}
		fixFileInputs(el) {
			let str = '';
			for(let i = 0; i < 5; ++i) {
				str += `<div${ i ? ' style="display: none;"' : ''
				}><input type="file" name="file${ i ? i + 1 : '' }"></div>`;
			}
			el.innerHTML = str;
		}
		init() {
			super.init();
			if(locStorage.file_dragdrop !== 'false') {
				locStorage.file_dragdrop = false;
				window.location.reload();
				return true;
			}
			$script('highlightReply = Function.prototype');
			setTimeout(() => $del($id('updater')), 0);
			const textarea = $id('body');
			if(textarea) {
				textarea.removeAttribute('id');
			}
			// #upload can contain hidden field, we must to save it from deletion
			const el = $q('#upload > td > input:not([name="file"])');
			if(el) {
				$q(this.qForm).appendChild(el);
			}
			return false;
		}
	}
	ibEngines.push(['tr#upload', Vichan]);

	class Kusaba extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);
			this.kus = true;

			this.qError = 'h1, h2, div[style*="1.25em"]';
			this.qFormRedir = 'input[name="redirecttothread"][value="1"]';

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
		init() {
			var el = $id('posttypeindicator');
			if(el) {
				[el.previousSibling, el.nextSibling, el].forEach($del);
			}
		}
	}
	ibEngines.push(['script[src*="kusaba"]', Kusaba], ['form#delform[action$="/board.php"]', Kusaba]);

	class TinyIB extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);
			this.tinyib = true;

			this.qError = 'body[align=center] div, div[style="margin-top: 50px;"]';
			this.qPostMsg = '.message';
		}
		get css() {
			return '.replymode { display: none; }';
		}
		fixHTMLHelper(str) {
			return str.replace(/="\.\.\//g, `="/${ this.b }/`);
		}
		getImgWrap(img) {
			return img.parentNode.parentNode.parentNode;
		}
		init() {
			$each($Q('.message > .omittedposts'),
				el => $replace(el, '<span class="abbrev">Post too long. <a href="#">Click to view.</a>'));
			return false;
		}
	}
	ibEngines.push(['form[action$="imgboard.php?delete"]', TinyIB]);

	// DOMAINS
	class _0chanHk extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);

			this.cReply = 'block post';
			this.qDForm = '#content > div > .threads-scroll-spy + div, .threads > div:first-of-type';
			this.qForm = '.reply-form';
			this.qImgInfo = 'figcaption';
			this.qOmitted = 'div[style="margin-left: 25px; font-weight: bold;"]';
			this.qOPost = '.post-op';
			this.qPostHeader = '.post-header';
			this.qPostImg = '.post-img-thumbnail';
			this.qPostMsg = '.post-body-message';
			this.qPostRef = '.post-id';
			this.qRPost = '.block.post:not(.post-op)';

			this.docExt = '';
			this.JsonBuilder = _0chanPostsBuilder;
			this.res = '';
		}
		get qThread() {
			return 'div[style="margin-top: 20px; margin-bottom: 40px;"] > div, .thread > div';
		}
		get css() {
			return `.post-embed, .post-replied-by, .post-referenced-by { display: none; }
				.de-post-btns { float: right; }
				#de-main { z-index: 1; position: relative; }
				#de-main > hr { display: none; }
				.de-pview { margin-left: -250px !important; }
				label { font-weight: initial; }
				hr { margin: 4px; border-top: 1px solid #bbb; }`;
		}
		getImgWrap(img) {
			return img.parentNode.parentNode.parentNode;
		}
		getJsonApiUrl(brd, num) {
			return '/api/thread?thread=' + num;
		}
		getPNum(post) {
			return +$q('a[name]', post).name;
		}
		getPostWrap(el) {
			return el.parentNode;
		}
		getTNum(op) {
			return +$q('a[name]', op).name;
		}
		init() {
			defaultCfg.postBtnsCSS = 0;
			$del($q('base', doc.head)); // <base> is not compartible with SVG
			$each($Q('a[data-post]'), el => (el.href =
				$q('.post-id > a:nth-of-type(2)', el.parentNode.parentNode.parentNode.previousElementSibling)
					.href.split('#')[0] + '#' + el.getAttribute('data-post')));
			return false;
		}
		observeContent(checkDomains, dataPromise) {
			const initObserver = new MutationObserver(mutations => {
				const el = mutations[0].addedNodes[0];
				if(el && el.id === 'app') {
					initObserver.disconnect();
					doc.defaultView.addEventListener('message', ({ data }) => {
						if(data !== '0chan-content-done') {
							return;
						}
						if(updater) {
							updater.disable();
						}
						DelForm.tNums = new Set();
						$each($Q('#de-css, #de-css-dynamic, #de-css-user, #de-svg-icons, #de-thr-navpanel',
							doc), $del);
						runMain(checkDomains, dataPromise);
					});
					$script(`window.app.$bus.on('refreshContentDone',
						() => document.defaultView.postMessage('0chan-content-done', '*'))`);
				}
			});
			initObserver.observe(docBody, { childList: true });
		}
		parseURL() {
			const url = (window.location.pathname || '').replace(/^\//, '');
			const temp = url.split('/');
			this.b = temp[0];
			this.t = temp[1] ? +temp[1].match(/^\d+/)[0] : 0;
			this.page = 0;
		}
		thrId(op) {
			return $q('.post-id > a:nth-of-type(2)', op).href.match(/\d+$/)[0];
		}
	}
	ibDomains['0chan.hk'] = _0chanHk;

	class _02chNet extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);

			this.qFormRedir = 'input[name="gb2"][value="thread"]';

			this.ru = true;
			this.timePattern = 'yyyy+nn+dd++w++hh+ii+ss';
		}
		getImgWrap(img) {
			return img.parentNode.parentNode.parentNode;
		}
	}
	ibDomains['02ch.net'] = _02chNet;

	class _02chSu extends Kusaba {
		constructor(prot, dm) {
			super(prot, dm);

			this.hasCatalog = true;

			this._capUpdPromise = null;
		}
		updateCaptcha(cap) {
			return cap.updateHelper('/captcha_update.php', xhr => {
				cap.parentEl.innerHTML = xhr.responseText;
				cap.textEl = $id('recaptcha_response_field');
				cap.initImage($q('img', cap.parentEl));
				cap.initTextEl();
			});
		}
	}
	ibDomains['02ch.su'] = _02chSu;

	class _2chan extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);

			this.qDForm = 'form:not([enctype])';
			this.qForm = 'form[enctype]';
			this.qFormRedir = null;
			this.qFormRules = '.chui';
			this.qOmitted = 'font[color="#707070"]';
			this.qPostImg = 'a[href$=".jpg"] > img, a[href$=".png"] > img, a[href$=".gif"] > img';
			this.qPostRef = '.del';
			this.qRPost = 'td:nth-child(2)';

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
		getPageUrl(b, p) {
			return fixBrd(b) + (p > 0 ? p + this.docExt : 'futaba.htm');
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
		getTNum(op) {
			return +$q('input[type="checkbox"]', op).name.match(/\d+/)[0];
		}
		init() {
			$del($q('base', doc.head)); // <base> is not compartible with SVG
			return false;
		}
	}
	ibDomains['2chan.net'] = _2chan;

	class _2chRip extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);

			this.ru = true;

			this._capUpdPromise = null;
		}
		init() {
			var el = $id('submit_button');
			if(el) {
				$del(el.previousElementSibling);
				$replace(el, '<input type="submit" id="submit" name="submit" value="Ответ">');
			}
			return false;
		}
		updateCaptcha(cap) {
			return cap.updateHelper('/cgi/captcha?task=get_id', xhr => {
				const id = xhr.responseText;
				$id('imgcaptcha').src = '/cgi/captcha?task=get_image&id=' + id;
				$id('captchaid').value = id;
			});
		}
	}
	ibDomains['2ch.rip'] = _2chRip;
	ibDomains['dva-ch.com'] = _2chRip;

	class _2chRu extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);

			this.qPages = 'table[border="1"] td > a:last-of-type';

			this.docExt = '.html';
			this.hasPicWrap = true;
			this.jsonSubmit = true;
			this.markupBB = true;
			this.multiFile = true;
			this.ru = true;

			this._qTable = 'table:not(.postfiles)';
		}
		get qThread() {
			return '.threadz';
		}
		get css() {
			return 'span[id$="_display"], #fastload { display: none; }';
		}
		get initCaptcha() {
			$id('captchadiv').innerHTML = '<img src="' + this.getCaptchaSrc() +
				'" style="vertical-align: bottom;" id="imgcaptcha">';
			return null;
		}
		fixFileInputs(el) {
			const str = '><input type="file" name="file"></div>';
			el.innerHTML = '<div' + str + ('<div style="display: none;"' + str).repeat(3);
		}
		fixHTMLHelper(str) {
			return str.replace(/data-original="\//g, 'src="/');
		}
		getCaptchaSrc() {
			return '/' + this.b + '/captcha.fpl?' + Math.random();
		}
		getImgWrap(img) {
			return img.parentNode.parentNode.parentNode;
		}
		getOmitted(el, len) {
			var txt;
			return el && (txt = el.textContent) ? +(txt.match(/\d+/) || [0])[0] - len : 1;
		}
		getPageUrl(b, p) {
			return fixBrd(b) + (p > 0 ? p : 0) + '.memhtml';
		}
		getSubmitData(json) {
			var error, postNum;
			if(json.post) {
				postNum = +json.post;
			} else {
				error = Lng.error[lang];
				if(json.error) {
					error += ':\n' + json.error.text;
				}
			}
			return { error, postNum };
		}
		init() {
			var el = $q('#postform input[type="button"]');
			if(el) {
				$replace(el, '<input type="submit" value="Отправить">');
			}
			el = $q(this.qDForm);
			$each($Q('input[type="hidden"]', el), $del);
			el.appendChild($q('.userdelete'));
			return false;
		}
	}
	ibDomains['2--ch.ru'] = _2chRu;
	ibDomains['2-ch.su'] = _2chRu;

	class _410chanOrg extends Kusaba {
		constructor(prot, dm) {
			super(prot, dm);

			this.qFormRedir = 'input#noko';
			this.qPages = '.pgstbl > table > tbody > tr > td:nth-child(2)';

			this.ru = true;
			this.hasCatalog = true;
			this.markupBB = false;
			this.timePattern = 'dd+nn+yyyy++w++hh+ii+ss';

			this._capUpdPromise = null;
		}
		get capLang() {
			return 0;
		}
		get css() {
			return super.css + `body { margin: 0 }
				#resizer { display: none; }
				.topmenu { position: static; }
				.de-thr-hid { display: inherit; }
				form > span { margin-top: 5px; }
				form > .de-thread-buttons { float: left; } `;
		}
		get markupTags() {
			return ['**', '*', '__', '^^', '%%', '`'];
		}
		fixHTML(data, isForm) {
			const el = super.fixHTML(data, isForm);
			// Move [ Back ] link outside of thread div,
			// so this will prevent new posts from being appended after that link
			if(aib.t) {
				try {
					const backBtn = $q(`${ this.qThread } > span[style]`, el);
					if(backBtn) {
						const modBtn = $q('a[accesskey="m"]', el);
						$after(backBtn.parentElement, backBtn);
						[modBtn.previousSibling, modBtn, modBtn.nextSibling].forEach(
							elm => $after(backBtn.lastChild, elm));
					}
				} catch(e) {}
			}
			return el;
		}
		getCaptchaSrc(src) {
			return src.replace(/\?[^?]+$|$/, '?board=' + aib.b + '&' + Math.random());
		}
		getSage(post) {
			var el = $q('.filetitle', post);
			return el && el.textContent.includes('\u21E9');
		}
		init() {
			super.init();
			// Workaround for "OK bug" #921
			$bEnd(docBody, '<span id="faptcha_input" style="display: none"></span>');
			// Workaround for "JSON.stringify bug" #1107
			delete Array.prototype.toJSON;
		}
		updateCaptcha(cap) {
			return cap.updateHelper(`/api_adaptive.php?board=${ this.b }`, xhr => {
				if(xhr.responseText === '1') {
					cap.textEl.disabled = true;
					setTimeout(() => (cap.textEl.value = 'проезд оплачен'), 0);
				} else {
					cap.textEl.disabled = false;
					cap.textEl.value = '';
					const img = $q('img', cap.parentEl);
					const src = img.getAttribute('src');
					img.src = '';
					img.src = this.getCaptchaSrc(src);
				}
			});
		}
	}
	ibDomains['410chan.org'] = _410chanOrg;

	class _4chanOrg extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);
			this.fch = true;

			this.cReply = 'post reply';
			this.qBan = 'strong[style="color: red;"]';
			this.qClosed = '.archivedIcon';
			this.qDelBut = '.deleteform > input[type="submit"]';
			this.qError = '#errmsg';
			this.qForm = 'form[name="post"]';
			this.qFormRedir = null;
			this.qImgInfo = '.fileText';
			this.qOmitted = '.summary.desktop';
			this.qOPost = '.op';
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

			this._qTable = '.replyContainer';
		}
		get qFormSubj() {
			return 'input[name="sub"]';
		}
		get qImgNameLink() {
			return '.fileText > a';
		}
		get css() {
			return `.backlink, #blotter, .extButton, hr.desktop, .navLinks, .postMenuBtn,
					#togglePostFormLink { display: none !important; }
				#bottomReportBtn { display: initial !important; }
				.postForm { display: table !important; width: auto !important; }
				textarea { margin-right: 0 !important; }
				${ Cfg.widePosts ? '.sideArrows { display: none; }' : '' }`;
		}
		get markupTags() {
			return ['', '', '', '', '[spoiler'];
		}
		get updateCaptcha() {
			let value = null;
			const tr = $id('captchaFormPart');
			if(tr) {
				const capClick = $bEnd(docBody, '<div onclick="initRecaptcha();"></div>');
				const altCapClick = $bEnd(docBody, '<div onclick="QR.initCaptchaAlt();"></div>');
				const waitForReload = () => setTimeout(function() {
					const input = $id('recaptcha_response_field');
					if(input) {
						input.tabIndex = 5;
					} else {
						waitForReload();
					}
				}, 1e3);
				value = function() {
					if(!Cfg.cap4chanAlt || !pr.tNum) {
						$replace($q('#g-recaptcha, #qrCaptchaContainerAlt'), '<div id="g-recaptcha"></div>');
						capClick.click();
						tr.removeAttribute('onclick');
						return null;
					}
					const container = $id('qrCaptchaContainerAlt');
					if(container) {
						container.click();
						return null;
					}
					$replace($id('g-recaptcha'), '<div id="qrCaptchaContainerAlt"></div>');
					altCapClick.click();
					tr.setAttribute('onclick', "if(event.target.tagName !== 'INPUT') Recaptcha.reload();");
					waitForReload();
					return null;
				};
			}
			Object.defineProperty(this, 'updateCaptcha', { value });
			return value;
		}
		fixDeadLinks(str) {
			return str.replace(/<span class="deadlink">&gt;&gt;(\d+)<\/span>/g,
				'<a class="de-ref-del" href="#p$1">&gt;&gt;$1</a>');
		}
		fixHTMLHelper(str) {
			return str.replace(/<\/?wbr>/g, '').replace(/ \(OP\)<\/a/g, '</a');
		}
		getImgInfo(wrap) {
			const el = $q(this.qImgInfo, wrap);
			return el ? el.lastChild.textContent : '';
		}
		getJsonApiUrl(brd, tNum) {
			return `//a.4cdn.org/${ brd }/thread/${ tNum }.json`;
		}
		getImgWrap(img) {
			return img.parentNode.parentNode;
		}
		getPageUrl(b, p) {
			return fixBrd(b) + (p > 1 ? p : '');
		}
		getPostWrap(el) {
			return el.parentNode;
		}
		getSage(post) {
			return !!$q('.id_Heaven, .useremail[href^="mailto:sage"]', post);
		}
		getSubmitData(data) {
			var error = null, postNum = null, errEl = $q('#errmsg', data);
			if(errEl) {
				error = errEl.textContent;
			} else {
				try {
					postNum = +$q('h1', data).nextSibling.textContent.match(/no:(\d+)/)[1];
				} catch(e) {}
			}
			return { error, postNum };
		}
		getTNum(op) {
			return +$q('input[type="checkbox"]', op).name.match(/\d+/)[0];
		}
		init() {
			Cfg.findImgFile = 0;
			const el = $id('styleSelector');
			if(el) {
				el.setAttribute('onchange', 'setActiveStyleSheet(this.value);');
			}
			return false;
		}
	}
	ibDomains['4chan.org'] = _4chanOrg;

	class _8chNet extends Vichan {
		constructor(prot, dm) {
			super(prot, dm);
			this._8ch = true;

			this._capUpdPromise = null;
		}
		get css() {
			return super.css + '#post-moderation-fields { display: initial !important; }';
		}
		initCaptcha(cap) {
			$q('td', cap.parentEl).innerHTML =
				'<input placeholder="' + Lng.cap[lang] + '" class="captcha_text" type="text" ' +
					'name="captcha_text" size="25" maxlength="8" autocomplete="off">' +
				'<input class="captcha_cookie" name="captcha_cookie" type="hidden">' +
				'<div class="captcha_html"></div>';
			cap.textEl = $q('.captcha_text', cap.parentEl);
			return this.updateCaptcha(cap, true);
		}
		updateCaptcha(cap) {
			return cap.updateHelper(
				'/8chan-captcha/entrypoint.php?mode=get&extra=abcdefghijklmnopqrstuvwxyz',
				xhr => {
					const obj = JSON.parse(xhr.responseText);
					$q('.captcha_cookie', cap.parentEl).value = obj.cookie;
					$q('.captcha_html', cap.parentEl).innerHTML = obj.captchahtml;
					const img = $q('img', cap.parentEl);
					if(img) {
						cap.initImage(img);
					}
				});
		}
	}
	ibDomains['8ch.net'] = _8chNet;
	ibDomains['oxwugzccvk3dk6tj.onion'] = _8chNet;

	class _55chan extends _8chNet {
		constructor(prot, dm) {
			super(prot, dm);
			this._8ch = null;

			this.qFormRules = '.regras';
		}
		get qThread() {
			return 'div[data-board]';
		}
	}
	ibDomains['55chan.org'] = _55chan;

	class _7chanOrg extends BaseBoard {
		init() {
			return true;
		}
	}
	ibDomains['7chan.org'] = _7chanOrg;

	class Arhivach extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);

			this.cReply = 'post';
			this.qDForm = 'body > .container-fluid';
			this.qPostHeader = '.post_head';
			this.qPostImg = '.post_image > img';
			this.qPostMsg = '.post_comment_body';
			this.qPostRef = '.post_id, .post_head > b';
			this.qPostSubj = '.post_subject';
			this.qRPost = '.post:not(:first-child):not([postid=""])';

			this.docExt = '';
			this.res = 'thread/';
		}
		get qImgNameLink() {
			return '.img_filename';
		}
		get qThread() {
			return '.thread_inner';
		}
		get css() {
			return `.de-cfg-inptxt, .de-cfg-label, .de-cfg-select { display: inline; width: auto;
					height: auto !important; font: 13px/15px arial !important; }
				.de-cfg-label.de-block { display: block; }
				.post_replies, .post_num, .poster_sage, .post[postid=""] { display: none !important; }
				.post { overflow-x: auto !important; }`;
		}
		get isArchived() {
			return true;
		}
		fixHTML(data, isForm) {
			const el = super.fixHTML(data, isForm);
			try {
				const els = $Q('.expand_image', el);
				for(let i = 0, tLen = els.length; i < tLen; ++i) {
					els[i].href = els[i].getAttribute('onclick').match(/http:\/[^']+/)[0];
				}
			} catch(e) {}
			return el;
		}
		getImgInfo(wrap) {
			const data = wrap.firstElementChild.getAttribute('onclick').match(/'([1-9]\d*)','([1-9]\d*)'/);
			return data ? `${ data[1] }x${ data[2] }, 0Kb` : null;
		}
		getImgWrap(img) {
			return $parent(img, 'A').parentNode;
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
		getTNum(el) {
			return +this.getOp(el).getAttribute('postid');
		}
		init() {
			defaultCfg.ajaxUpdThr = 0;
			setTimeout(function() {
				var delPosts = $Q('.post[postid=""]');
				for(var i = 0, len = delPosts.length; i < len; ++i) {
					try {
						var post = pByNum.get(+$q('blockquote', delPosts[i]).getAttribute('id').substring(1));
						if(post) {
							post.deleted = true;
							post.btns.classList.remove('de-post-counter');
							post.btns.classList.add('de-post-deleted');
							post.wrap.classList.add('de-post-removed');
						}
					} catch(e) {}
				}
			}, 0);
			return false;
		}
	}
	ibDomains['arhivach.org'] = Arhivach;

	class Brchan extends Vichan {
		constructor(prot, dm) {
			super(prot, dm);
			this.brchan = true;

			this.qPostTrip = '.poster_id';

			this.markupBB = true;
		}
		get css() {
			return super.css + `input[name="embed"] { width: 100% !important; }
				#upload_embed > td > .unimportant.hint { display: none; }
				.reflink::after { content: "" !important; }`;
		}
		get markupTags() {
			return ['b', 'i', 'u', 's', 'spoiler', 'code'];
		}
		getImgWrap(img) {
			return img.parentNode.parentNode.parentNode;
		}
		getSage(post) {
			return !!$q('.sage', post);
		}
		init() {
			super.init();
			defaultCfg.timePattern = 'dd+nn+yy+++++hh+ii+ss';
			defaultCfg.timeRPattern = '_d/_n/_y(_w)_h:_i:_s';
			if(Cfg.ajaxUpdThr) {
				locStorage.auto_thread_update = false;
			}
			const el = $id('upload_embed');
			const el2 = $id('upload');
			if(el && el2) {
				$after(el2, el);
			}
			return false;
		}
	}
	ibDomains['brchan.org'] = Brchan;
	ibDomains['brchanansdnhvvnm.onion'] = Brchan;
	ibDomains['lolifox.org'] = Brchan;

	class Diochan extends Kusaba {
		constructor(prot, dm) {
			super(prot, dm);

			this.multiFile = true;
		}
		get css() {
			return super.css + '.resize, .postblock { display: none; }';
		}
		fixFileInputs(el) {
			const str = '><input type="file" name="imagefile[]"></div>';
			el.innerHTML = '<div' + str + ('<div style="display: none;"' + str).repeat(2);
			$each($Q('.file2, .file3, .fileurl1, .fileurl2, .fileurl3'), $del);
		}
	}
	ibDomains['diochan.com'] = Diochan;

	class Dobrochan extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);
			this.dobr = true;

			this.qClosed = 'img[src="/images/locked.png"]';
			this.qDForm = 'form[action*="delete"]';
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
		delTruncMsg(post, el, isInit) {
			[el.previousSibling, el.nextSibling, el].forEach($del);
			if(isInit) {
				$replace(post.msg.firstElementChild, $q('.alternate > div', post.el));
			} else {
				const sRunner = new SpellsRunner();
				post.updateMsg($q('.alternate > div', post.el), sRunner);
				sRunner.end();
			}
		}
		disableRedirection(el) {
			$hide($parent(el, 'TR'));
			el.selectedIndex = 1;
		}
		fixFileInputs(el) {
			$each($Q('input[type="file"]', el), input => input.removeAttribute('onchange'));
			el.firstElementChild.value = 1;
		}
		getImgSrcLink(img) {
			// There are can be censored <img> that may not have <a> containers
			const el = img.parentNode;
			return el.tagName === 'A' ? el :
				$q('.fileinfo > a', img.previousElementSibling ? el : el.parentNode);
		}
		getImgWrap(img) {
			const el = img.parentNode;
			return el.tagName === 'A' ? (el.previousElementSibling ? el : el.parentNode).parentNode :
				img.previousElementSibling ? el : el.parentNode;
		}
		getJsonApiUrl(brd, tNum) {
			return `/api/thread/${ brd }/${ tNum }/all.json?new_format&message_html&board`;
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
		getPageUrl(b, p) {
			return fixBrd(b) + (p > 0 ? p + this.docExt : 'index.xhtml');
		}
		getTNum(op) {
			return +$q('a[name]', op).name.match(/\d+/)[0];
		}
		init() {
			if(window.location.pathname === '/settings') {
				$q('input[type="button"]').addEventListener('click',
					() => readCfg().then(() => saveCfg('__hanarating', $id('rating').value)));
				return true;
			}
			$script('window.UploadProgress = Function.prototype');
			var el = $id('postform');
			if(el) {
				el.appendChild($q('.rules'));
			}
			return false;
		}
		initCaptcha(cap) {
			if(!cap.textEl) {
				$hide($q('img', cap.parentEl));
				$show(cap.parentEl);
			}
			return null;
		}
		insertYtPlayer(msg, playerHtml) {
			var prev = msg.previousElementSibling;
			return $bBegin(prev.tagName === 'BR' ? prev : msg, playerHtml);
		}
		updateCaptcha(cap, isErr) {
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
				el.appendChild(img);
				img.insertAdjacentHTML('afterend', '<br><input placeholder="Капча" autocomplete="off"' +
					' id="captcha" name="captcha" size="35" type="text">');
				$show(img);
				cap.isAdded = false;
				cap.originHTML = cap.parentEl.innerHTML;
				cap.addCaptcha();
			}
			return null;
		}
	}
	ibDomains['dobrochan.com'] = Dobrochan;
	ibDomains['dobrochan.org'] = Dobrochan;
	ibDomains['dobrochan.ru'] = Dobrochan;

	class Ernstchan extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);

			this.cReply = 'post';
			this.qError = '.error';
			this.qFormRedir = 'input[name="gb2"][value="thread"]';
			this.qOPost = '.thread_OP';
			this.qPages = '.pagelist > li:nth-last-child(2)';
			this.qPostHeader = '.post_head';
			this.qPostMsg = '.text';
			this.qPostSubj = '.subject';
			this.qPostTrip = '.tripcode';
			this.qRPost = '.thread_reply';
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
			return `.content > hr, .de-parea > hr, .de-pview > .doubledash { display: none !important }
				.de-pview > .post { margin-left: 0; border: none; }
				#de-win-reply { float:left; margin-left:2em }
				${ Cfg.widePosts ? `.doubledash { display: none; }
					.thread_reply { float: none; }` : '' }`;
		}
		fixFileInputs(el) {
			const str = '><input name="file" type="file"></div>';
			el.innerHTML = '<div' + str + ('<div style="display: none;"' + str).repeat(3);
		}
		getImgWrap(img) {
			return img.parentNode.parentNode.parentNode;
		}
		getPageUrl(b, p) {
			return p > 1 ? fixBrd(b) + 'page/' + p : fixBrd(b);
		}
		getPostElOfEl(el) {
			while(el && !nav.matchesSelector(el, '.post')) {
				el = el.parentElement;
			}
			return el.parentNode;
		}
		getSage(post) {
			return !!$q('.sage', post);
		}
	}
	ibDomains['ernstchan.com'] = Ernstchan;
	// ibEngines.push(['head > link[href*="phutaba.css"]', Ernstchan]);

	class Nulldvachin extends Ernstchan {
		fixFileInputs(el) {
			const str = '><input name="file" type="file"></div>';
			el.innerHTML = '<div' + str + ('<div style="display: none;"' + str).repeat(
				/* global maxfiles */ typeof maxfiles !== 'undefined' ? maxfiles - 1 : 3);
		}
		get markupTags() {
			return ['b', 'i', 'u', 's', 'spoiler', 'code', 'sup', 'sub'];
		}
		get qFormMail() {
			return 'input[name="nya2"]';
		}
		init() {
			let locSettings;
			try {
				locSettings = JSON.parse(locStorage.getItem('settings'));
			} catch(e) {
				return false;
			}
			if(locSettings && locSettings.turnOffAll !== 1) {
				locSettings.turnOffAll = 1;
				locStorage.setItem('settings', JSON.stringify(locSettings));
				window.location.reload();
				return true;
			}
			return false;
		}
	}
	ibDomains['02ch.in'] = Nulldvachin;
	ibDomains['buttflaps.pp.ua'] = Nulldvachin;

	class Ichan extends Kusaba {
		init() {
			super.init();
			var el = $q('div[id^="thread"]');
			if(el) {
				let node;
				while((node = el.nextElementSibling) && node.tagName === 'TABLE') {
					el.appendChild(node);
				}
			}
		}
	}
	ibDomains['ichan.net'] = Ichan;

	class Iichan extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);
			this.iichan = true;

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
			return this.prot + '//' + this.host + '/' + this.b + '/catalogue.html';
		}
		get css() {
			return `${ !this.t ? '' : '#de-main { margin-top: -37px; } .logo { margin-bottom: 14px; }' }
			.iichan-hide-thread-btn { display: none; }
			.replypage div[id^="thread"] span.reflink::after { content: none; }`;
		}
		get isArchived() {
			return this.b.includes('/arch');
		}
		init() {
			defaultCfg.addSageBtn = 0;
			$script('highlight = Function.prototype');
			return false;
		}
	}
	ibDomains['iichan.hk'] = Iichan;

	class Krautchan extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);
			this.krau = true;

			this.cReply = 'postreply';
			this.qBan = '.ban_mark';
			this.qClosed = 'img[src="/images/locked.gif"]';
			this.qDForm = 'form[action*="delete"]';
			this.qError = '.message_text';
			this.qFormRedir = 'input#forward_thread';
			this.qFormRules = '#rules_row';
			this.qImgInfo = '.fileinfo';
			this.qOmitted = '.omittedinfo';
			this.qPages = 'table[border="1"] > tbody > tr > td > a:nth-last-child(2) + a';
			this.qPostHeader = '.postheader';
			this.qPostImg = 'img[id^="thumbnail_"]';
			this.qPostRef = '.postnumber';
			this.qPostSubj = '.postsubject';
			this.qRPost = '.postreply';
			this.qTrunc = 'p[id^="post_truncated"]';

			this.hasCatalog = true;
			this.hasPicWrap = true;
			this.hasTextLinks = true;
			this.markupBB = true;
			this.multiFile = true;
			this.res = 'thread-';
			this.timePattern = 'yyyy+nn+dd+hh+ii+ss+--?-?-?-?-?';
		}
		get qFormName() {
			return 'input[name="internal_n"]';
		}
		get qFormSubj() {
			return 'input[name="internal_s"]';
		}
		get qImgNameLink() {
			return '.filename > a';
		}
		get qThread() {
			return '.thread_body';
		}
		get catalogUrl() {
			return this.prot + '//' + this.host + '/catalog/' + this.b;
		}
		get css() {
			return `img[src$="button-expand.gif"], img[src$="button-close.gif"], body > center > hr,
					form > div:first-of-type > hr, h2, .sage { display: none; }
				.de-thr-hid { float: none; }
				.de-video-obj-inline { margin-left: 5px; }
				div[id^="Wz"] { z-index: 10000 !important; }
				form[action="/paint"] > select { width: 105px; }
				form[action="/paint"] > input[type="text"] { width: 24px !important; }`;
		}
		get markupTags() {
			return ['b', 'i', 'u', 's', 'spoiler', 'aa'];
		}
		fixDeadLinks(str) {
			return str.replace(/<span class="invalidquotelink">&gt;&gt;(\d+)<\/span>/g,
				'<a class="de-ref-del" href="#$1">&gt;&gt;$1</a>');
		}
		fixFileInputs(el) {
			let str = '';
			for(let i = 0; i < 4; ++i) {
				str += `<div${ i ? ' style="display: none;"' : '' }>` +
					`<input type="file" name="file_${ i }" tabindex="7"></div>`;
			}
			el.innerHTML = str;
			el.removeAttribute('id');
		}
		fixHTMLHelper(str) {
			return str.replace(/href="(#\d+)"/g, 'href="/' + aib.b + '/thread-' + aib.t + '.html$1"');
		}
		getImgWrap(img) {
			return img.parentNode.parentNode;
		}
		getSage(post) {
			return !!$q('.sage', post);
		}
		getTNum(op) {
			return +$q('input[type="checkbox"]', op).name.match(/\d+/)[0];
		}
		init() {
			$script('highlightPost = Function.prototype');
			return false;
		}
		initCaptcha(cap) {
			cap.hasCaptcha = false;
			const scripts = $Q('script:not([src])', doc);
			for(let i = 0, len = scripts.length; i < len; ++i) {
				const m = scripts[i].textContent.match(/var boardRequiresCaptcha = ([a-z]+);/);
				if(m) {
					if(m[1] === 'true') {
						cap.hasCaptcha = true;
					}
					break;
				}
			}
			return null;
		}
		insertYtPlayer(msg, playerHtml) {
			var pMsg = msg.parentNode,
				prev = pMsg.previousElementSibling;
			return $bBegin(prev.hasAttribute('style') ? prev : pMsg, playerHtml);
		}
		parseURL() {
			super.parseURL();
			if(this.b.startsWith('board/')) {
				this.b = this.b.substr(6);
			}
		}
		updateCaptcha(cap, isErr) {
			if(isErr && !cap.hasCaptcha) {
				cap.hasCaptcha = true;
				cap.showCaptcha();
			}
			let sessionId = null;
			const { cookie } = doc;
			if(cookie.includes('desuchan.session')) {
				for(const c of cookie.split(';')) {
					const m = c.match(/^\s*desuchan\.session=(.*)$/);
					if(m) {
						sessionId = unescape(m[1].replace(/\+/g, ' '));
						break;
					}
				}
			}
			const id = this.b + (pr.tNum ? pr.tNum : '') + (sessionId ? '-' + sessionId : '') +
				'-' + new Date().getTime() + '-' + Math.round(1e8 * Math.random());
			const img = $q('img', cap.parentEl);
			img.src = '';
			img.src = '/captcha?id=' + id;
			$q('input[name="captcha_name"]', cap.parentEl).value = id;
			return null;
		}
	}
	ibDomains['krautchan.net'] = Krautchan;

	class Kropyvach extends Vichan {
		constructor(prot, dm) {
			super(prot, dm);

			this.markupBB = true;
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
			return super.css + `.sidearrows { display: none !important; }
				.bar { position: static; }`;
		}
		init() {
			super.init();
			$each($Q('.files + .post.op'), el => el.insertBefore(el.previousElementSibling, el.firstChild));
			return false;
		}
	}
	ibDomains['lainchan.org'] = Lainchan;

	class Niuchan extends Kusaba {
		get css() {
			return super.css + '.resize { display: none; }';
		}
	}
	ibDomains['niuchan.org'] = Niuchan;

	class Nowere extends BaseBoard {
		get markupTags() {
			return ['**', '***', '', '^H', '', ''];
		}
		init() {
			$script('highlight = Function.prototype');
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
			return '.filesize > a:first-of-type';
		}
		getImgRealName(wrap) {
			return $q('.filesize[style="display: inline;"] > .mobile_filename_hide', wrap).textContent;
		}
		getImgWrap(img) {
			return img.parentNode.parentNode.parentNode.parentNode;
		}
		getPNum(post) {
			return +post.getAttribute('data-num');
		}
		getSubmitData(json) {
			return { error: json.error, postNum: json.id && +json.id };
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
	ibDomains['ponyach.cf'] = Ponyach;
	ibDomains['ponyach.ga'] = Ponyach;
	ibDomains['ponyach.gq'] = Ponyach;
	ibDomains['ponyach.ml'] = Ponyach;
	ibDomains['ponyach.ru'] = Ponyach;
	ibDomains['ponyach.tk'] = Ponyach;
	ibDomains['cafe-asylum.cf'] = Ponyach;
	ibDomains['cafe-bb.cf'] = Ponyach;
	ibDomains['cafe-bb.ga'] = Ponyach;
	ibDomains['cafe-bb.gq'] = Ponyach;
	ibDomains['cafe-bb.ml'] = Ponyach;
	ibDomains['cafe-bb.tk'] = Ponyach;

	class Ponychan extends Tinyboard {
		constructor(prot, dm) {
			super(prot, dm);

			this.qOPost = '.opContainer';
		}
		get css() {
			return super.css + `.mature_thread { display: block !important; }
				.mature_warning { display: none; }`;
		}
		init() {
			super.init();
			$each($Q('img[data-mature-src]'), function(el) {
				el.src = el.getAttribute('data-mature-src');
			});
			return false;
		}
	}
	ibDomains['ponychan.net'] = Ponychan;

	class Synch extends Tinyboard {
		constructor(prot, dm) {
			super(prot, dm);

			this.qImgInfo = '.unimportant';

			this.markupBB = true;
		}
		get qImgNameLink() {
			return '.file-info > .btn-group > .btn-xs > a';
		}
		get css() {
			return super.css + `.fa-sort { display: none; }
				time::after { content: none; }`;
		}
		get markupTags() {
			return ['b', 'i', 'u', 's', 'spoiler', 'code', 'sup', 'sub'];
		}
		init() {
			var val = '{"simpleNavbar":true}';
			if(locStorage.settings !== val) {
				locStorage.settings = val;
				window.location.reload();
				return true;
			}
			super.init();
			defaultCfg.timePattern = 'w+dd+m+yyyy+hh+ii+ss';
			defaultCfg.timeOffset = 4;
			defaultCfg.correctTime = 1;
			return false;
		}
	}
	ibDomains['syn-ch.ru'] = Synch;
	ibDomains['syn-ch.com'] = Synch;
	ibDomains['syn-ch.org'] = Synch;

	const prot = window.location.protocol;
	let dm = localData && localData.dm;
	if(checkDomains) {
		if(!dm) {
			const ibKeys = Object.keys(ibDomains);
			let i = ibKeys.length;
			const host = window.location.hostname.toLowerCase();
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
	dm = window.location.hostname;
	if(!dm) {
		return null;
	}
	dm = dm.match(/(?:(?:[^.]+\.)(?=org\.|net\.|com\.))?[^.]+\.[^.]+$|^\d+\.\d+\.\d+\.\d+$|localhost/)[0];
	if(checkEngines) {
		for(var i = ibEngines.length - 1; i >= 0; --i) {
			var [path, Ctor] = ibEngines[i];
			if($q(path, doc)) {
				return new Ctor(prot, dm);
			}
		}
		return new BaseBoard(prot, dm);
	}
	return null;
}

/* ==[ Misc.js ]==============================================================================================
                                                MISCELLANEOUS
=========================================================================================================== */

// You can use Dollchan API listeners in Your external scripts and apps
// More info: https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/dollchan-api
const DollchanAPI = {
	init() {
		this.hasListeners = false;
		if(!('MessageChannel' in window)) {
			return;
		}
		const channel = new MessageChannel();
		this.port = channel.port1;
		this.port.onmessage = this._handleMessage;
		this.activeListeners = new Set();
		const port = channel.port2;
		doc.defaultView.addEventListener('message', ({ data }) => {
			if(data === 'de-request-api-message') {
				this.hasListeners = true;
				document.defaultView.postMessage('de-answer-api-message', '*', [port]);
			}
		});
	},
	hasListener(name) {
		return this.hasListeners && this.activeListeners.has(name);
	},
	notify(name, data) {
		if(this.hasListener(name)) {
			this.port.postMessage({ name, data });
		}
	},

	_handleMessage({ data: arg }) {
		if(!arg || !arg.name) {
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
		if(Date.now() - +lastUpdateTime < [1, 2, 7, 14, 30][Cfg.scrUpdIntrv] * 1000 * 60 * 60 * 24) {
			return Promise.reject();
		}
	}
	return $ajax(
		gitRaw + 'src/modules/Wrap.js', { 'Content-Type': 'text/plain' }, false
	).then(xhr => {
		const v = xhr.responseText.match(/const version = '([0-9.]+)';/);
		const remoteVer = v && v[1] ? v[1].split('.') : null;
		if(remoteVer) {
			const currentVer = version.split('.');
			const src = `${ gitRaw }${ nav.isESNext ? 'src/' : '' }Dollchan_Extension_Tools.${
				nav.isESNext ? 'es6.' : '' }user.js`;
			saveCfgObj('lastUpd', Date.now());
			const link = `<a style="color: blue; font-weight: bold;" href="${ src }">`;
			for(let i = 0, len = Math.max(currentVer.length, remoteVer.length); i < len; ++i) {
				if((+remoteVer[i] || 0) > (+currentVer[i] || 0)) {
					return `${ link }${ Lng.updAvail[lang].replace('%s', v[1]) }</a>`;
				} else if((+remoteVer[i] || 0) < (+currentVer[i] || 0)) {
					break;
				}
			}
			if(isManual) {
				const c = xhr.responseText.match(/const commit = '([0-9abcdef]+)';/)[1];
				const vc = version + '.' + c;
				return c === commit ?
					Lng.haveLatestCommit[lang].replace('%s', vc) :
					`${ Lng.haveLatestStable[lang].replace('%s', version) }\n${
						Lng.newCommitsAvail[lang].replace('%s', `${ link }${ vc }</a>`) }`;
			}
		}
		return Promise.reject();
	}, () => !isManual ? Promise.reject() :
		`<div style="color: red; font-weigth: bold;">${ Lng.noConnect[lang] }</div>`
	);
}

function initPage() {
	if(aib.t) {
		if(Cfg.rePageTitle) {
			doc.title = '/' + aib.b + ' - ' + Thread.first.op.title;
		}
		if(!localData) {
			Cfg.stats.view++;
			saveCfgObj(aib.dm, Cfg);
			Thread.first.el.insertAdjacentHTML('afterend', '<div class="de-thread-buttons">' +
				'<span class="de-thread-updater">[<a class="de-abtn" href="#"></a>' +
				'<span id="de-updater-count" style="display: none;"></span>]</span>' +
				(aib.mak ? '[<a class="de-abtn" href="#" onclick="UnbanShow();">Реквест разбана</a>]' : '') +
				'</div>');
		}
	} else {
		navPanel.init();
	}
	if(!localData) {
		updater = initThreadUpdater(doc.title, aib.t && Cfg.ajaxUpdThr && !aib.isArchived);
		if(aib.t) {
			Thread.first.el.nextSibling.firstChild.firstElementChild
				.addEventListener('click', updater.forceLoad);
		}
	}
}

function scrollPage() {
	if(!aib.t && Cfg.scrollToTop) {
		if(doc.hidden || needScroll) {
			scrollTo(0, 1);
		}
		return;
	}
	if(!needScroll) {
		return;
	}
	setTimeout(function() {
		const val = +sesStorage['de-scroll-' + aib.b + aib.t];
		if(val) {
			scrollTo(0, val);
			sesStorage.removeItem('de-scroll-' + aib.b + aib.t);
		} else {
			let post, num;
			const { hash } = window.location;
			if(hash && (num = hash.match(/#[ip]?(\d+)$/)) &&
				(num = +num[1]) && (post = pByNum.get(num)) && !post.isOp
			) {
				post.selectAndScrollTo();
			}
		}
	}, 0);
}

/* ==[ SvgIcons.js ]==========================================================================================
                                                  SVG ICONS
=========================================================================================================== */

/* eslint-disable max-len */

function addSVGIcons() {
	docBody.insertAdjacentHTML('beforeend', `
	<div id="de-svg-icons" style="height: 0; width: 0; position: fixed;">
	<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
	<defs>
		<linearGradient id="de-btn-back-gradient" x1="50%" y1="0%" y2="100%" x2="50%">
			<stop offset="0%" stop-color="#A0A0A0"/>
			<stop offset="50%" stop-color="#505050"/>
			<stop offset="100%" stop-color="#A0A0A0"/>
		</linearGradient>
	</defs>

	<!-- POST ICONS -->
	<symbol viewBox="0 0 16 16" id="de-symbol-post-back">
		<path class="de-post-btns-back" d="M4 1q-3 0,-3 3v8q0 3,3 3h8q3 0,3 -3v-8q0 -3,-3-3z"/>
	</symbol>
	<symbol viewBox="0 0 16 16" id="de-symbol-post-hide">
		<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>
		<line class="de-svg-stroke" stroke-width="2.5" x1="4.5" y1="11.5" x2="11.5" y2="4.5"/>
		<line class="de-svg-stroke" stroke-width="2.5" x1="11.5" y1="11.5" x2="4.5" y2="4.5"/>
	</symbol>
	<symbol viewBox="0 0 16 16" id="de-symbol-post-unhide">
		<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>
		<line class="de-svg-stroke" stroke-width="2" x1="8" y1="4" x2="8" y2="12"/>
		<line class="de-svg-stroke" stroke-width="2" x1="4" y1="8" x2="12" y2="8"/>
	</symbol>
	<symbol viewBox="0 0 16 16" id="de-symbol-post-rep">
		<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>
		<path class="de-svg-fill" d="M5 11c0 .8.6 1.2 1.3.7l5-3c.6-.4.6-1 0-1.5l-5-3C5.6 4 5 4.3 5 5v6z"/>
	</symbol>
	<symbol viewBox="0 0 16 16" id="de-symbol-post-expthr">
		<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>
		<path class="de-svg-fill" d="M4.5 6L8 3l3.5 3H9.25v4h2.25L8 13 4.5 10h2.25V6z"/>
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
		<path class="de-svg-fill" d="M4 9h8l-4 4.5zM6 3h4v1h-4zM6 5h4v1h-4zM6 7h4v1h-4z"/>
	</symbol>
	<symbol viewBox="0 0 16 16" id="de-symbol-post-src">
		<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>
		<circle class="de-svg-stroke" cx="7" cy="7" r="2.5" stroke-width="2"/>
		<line class="de-svg-stroke" stroke-width="2" x1="9" y1="9" x2="12" y2="12"/>
	</symbol>

	<!-- WINDOW ICONS -->
	<symbol viewBox="0 0 16 16" id="de-symbol-win-arrow">
		<path class="de-svg-stroke" stroke-width="3.5" d="M8 13V6"/>
		<path class="de-svg-fill"  d="M3.5 7h9L8 2.5 3.5 7z"/>
	</symbol>
	<symbol viewBox="0 0 16 16" id="de-symbol-win-close">
		<path class="de-svg-stroke" stroke-width="2.5" d="M3.5 3.5l9 9m-9 0l9-9"/>
	</symbol>

	<!-- NAVIGATION PANEL ICONS -->
	<symbol viewBox="0 0 7 7" id="de-symbol-nav-arrow">
		<path class="de-svg-fill" d="M6 3.5L2 0v7z"/>
	</symbol>
	<symbol viewBox="0 0 24 24" id="de-symbol-nav-up">
		<path class="de-svg-stroke" stroke-width="3" stroke-miterlimit="10" d="M3 22.5l9-9 9 9M3 13.5l9-9 9 9"/>
	</symbol>
	<symbol viewBox="0 0 24 24" id="de-symbol-nav-down">
		<path class="de-svg-stroke" stroke-width="3" stroke-miterlimit="10" d="M3 11.5l9 9 9-9M3 2.5l9 9 9-9"/>
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
		<path class="de-svg-stroke" stroke-width="3" d="M8 12.5h9"/>
		<path class="de-svg-fill" d="M10 8v9l-5-4.5M15 17V8l5 4.5"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-maskimg">
		<path class="de-svg-stroke" stroke-width="2" d="M20 18c0 1-1 2-2 2H7c-1 0-2-1-2-2V7c0-1 1-2 2-2h11c1 0 2 1 2 2v11z"/>
		<path class="de-svg-stroke" d="M5 20L20 5M5 15.5L15.5 5M5 11l6-6M20 9.5L9.5 20M20 14l-6 6"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-preimg">
		<path class="de-svg-stroke" stroke-width="2" d="M20 18c0 1-1 2-2 2H7c-1 0-2-1-2-2V7c0-1 1-2 2-2h11c1 0 2 1 2 2v11z"/>
		<path class="de-svg-stroke" stroke-width="3" d="M12.5 17V9"/>
		<path class="de-svg-fill" d="M8 15h9l-4.5 5"/>
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
	const cont = (id, src) => id + `::before { content: ""; display: inline-block; vertical-align: -3px; padding: 16px 16px 0 0; margin-right: 4px; background: url(${ src }) no-repeat center; background-size: contain; }`;
	const gif = (id, src) => id + ` { background-image: url(data:image/gif;base64,${ src }); background-repeat: no-repeat; background-position: center; }`;

	// Main panel
	let p, x = `#de-panel { position: fixed; right: 0; bottom: 0; z-index: 9999; border-radius: 15px 0 0 0; cursor: default; display: flex; min-height: 25px; color: #F5F5F5; }
	#de-panel-logo { flex: none; margin: auto 3px auto 0; cursor: pointer; }
	#de-panel-buttons { flex: 0 1 auto; display: flex; flex-flow: row wrap; align-items: center; padding: 0 0 0 2px; margin: 0; border-left: 1px solid #616b86; }
	.de-panel-button { display: block; flex: none; margin: 0 1px; padding: 0; transition: all .3s ease; }
	a.de-panel-button, a.de-panel-button:hover { color: inherit !important; }
	.de-panel-svg, #de-panel-logo, .de-panel-logo-svg, .de-panel-button { width: 25px; height: 25px; }
	#de-panel-goback { transform: rotate(180deg); will-change: transform; }
	#de-panel-godown { transform: rotate(90deg); will-change: transform; }
	#de-panel-goup { transform: rotate(-90deg); will-change: transform; }
	#de-panel-upd-on { fill: #32ff32; }
	#de-panel-upd-warn { fill: #fff441; }
	#de-panel-upd-off { fill: #ff3232; }
	#de-panel-audio-on > .de-panel-svg > .de-use-audio-off, #de-panel-audio-off > .de-panel-svg > .de-use-audio-on { display: none; }
	#de-panel-info { display: flex; flex: none; padding: 0 6px; margin-left: 2px; border-left: 1px solid #616b86; font: 18px serif; }
	#de-panel-info-icount::before, #de-panel-info-acount:not(:empty)::before { content: "/"; }
	.de-svg-stroke { stroke: currentColor; fill: none; }
	.de-svg-fill { stroke: none; fill: currentColor; }
	use { fill: inherit; pointer-events: none; }`;

	switch(Cfg.scriptStyle) {
	case 0: // Gradient darkblue
		x += '#de-panel, .de-win-head { background: linear-gradient(to bottom, #7b849b, #616b86 8%, #3a414f 52%, rgba(0,0,0,0) 52%), linear-gradient(to bottom, rgba(0,0,0,0) 48%, #121212 52%, #1f2740 100%); }';
		break;
	case 1: // gradient blue
		x += `#de-panel, .de-win-head { background: linear-gradient(to bottom, #4b90df, #3d77be 20%, #376cb0 28%, #295591 52%, rgba(0,0,0,0) 52%), linear-gradient(to bottom, rgba(0,0,0,0) 48%, #183d77 52%, #1f4485 72%, #264c90 80%, #325f9e 100%); }
			#de-panel-buttons, #de-panel-info { border-color: #8fbbed; }`;
		break;
	case 2: // solid grey
		x += `#de-panel, .de-win-head { background-color: #777; }
			#de-panel-buttons, #de-panel-info { border-color: #ccc; }
			.de-panel-svg:hover { border: 2px solid #444; border-radius: 5px; box-sizing: border-box; transition: none; }`;
		break;
	case 3: // transparent blue
		x += '#de-panel, .de-win-head { background-color: rgba(0,20,80,.72); }';
		break;
	case 4: // square dark
		x += `#de-panel, .de-win-head { background: none; background-color: #333; border-radius: 0 !important; }
			#de-win-reply.de-win { border-radius: 0 !important; }
			#de-panel-buttons, #de-panel-info { border-color: #666; }`;
	}
	if(Cfg.scriptStyle === 2) {
		x += '.de-panel-svg:hover { border: 2px solid #444; border-radius: 5px; box-sizing: border-box; transition: none; }';
	} else {
		x += '.de-panel-button:hover { background-color: rgba(255,255,255,.15); box-shadow: 0 0 3px rgba(143,187,237,.5); }';
	}

	if(Cfg.disabled) {
		$css(x).id = 'de-css';
		return;
	}

	// Windows
	x += `.de-win .de-btn-toggle { transform: rotate(180deg); }
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
	#de-win-cfg > .de-win-body { float: none; display: block; width: auto; min-width: 0; max-width: 100% !important; padding: 0; margin: 0 !important; border: none; }
	#de-win-fav > .de-win-body, #de-win-hid > .de-win-body, #de-win-vid > .de-win-body { padding: 9px; border: 1px solid gray; }
	#de-win-hid { max-width: 60%; }
	#de-win-vid > .de-win-body { display: flex; flex-direction: column; align-items: center; }
	#de-win-vid .de-entry { white-space: normal; }
	.de-win-head { position: relative; padding: 2px; border-radius: 10px 10px 0 0; color: #F5F5F5; font: bold 14px/16px arial; text-align: center; cursor: default; }` +

	// Settings window
	`.de-block { display: block; }
	#de-btn-spell-add { margin-left: auto; }
	#de-cfg-bar { display: flex; margin: 0; padding: 0; }
	.de-cfg-body { min-height: 328px; padding: 9px 7px 7px; margin-top: -1px; font: 13px/15px arial !important; box-sizing: content-box; -moz-box-sizing: content-box; }
	.de-cfg-body, #de-cfg-buttons { border: 1px solid #183d77; border-top: none; }
	.de-cfg-button { padding: 0 ${ nav.isFirefox ? '2' : '4' }px !important; margin: 0 4px; height: 21px; font: 12px arial !important; }
	#de-cfg-buttons { display: flex; align-items: center; padding: 3px; }
	#de-cfg-buttons > label { flex: 1 0 auto; }
	.de-cfg-chkbox { ${ nav.Presto ? '' : 'vertical-align: -1px !important; ' }margin: 2px 1px !important; }
	.de-cfg-depend { padding-left: 17px; }
	.de-cfg-inptxt { width: auto; padding: 0 2px !important; margin: 1px 4px 1px 0 !important; font: 13px arial !important; }
	.de-cfg-label { padding: 0; margin: 0; }
	.de-cfg-select { padding: 0 2px; margin: 1px 0; font: 13px arial !important; }
	.de-cfg-tab { flex: 1 0 auto; display: block !important; margin: 0 !important; float: none !important; width: auto !important; min-width: 0 !important; padding: 4px 0 !important; box-shadow: none !important; border: 1px solid #444 !important; border-radius: 4px 4px 0 0 !important; opacity: 1; font: bold 12px arial; text-align: center; cursor: default; background-image: linear-gradient(to bottom, rgba(132,132,132,.35) 0%, rgba(79,79,79,.35) 50%, rgba(40,40,40,.35) 50%, rgba(80,80,80,.35) 100%) !important; }
	.de-cfg-tab:hover { background-image: linear-gradient(to top, rgba(132,132,132,.35) 0%, rgba(79,79,79,.35) 50%, rgba(40,40,40,.35) 50%, rgba(80,80,80,.35) 100%) !important; }
	.de-cfg-tab[selected], .de-cfg-tab[selected]:hover { background-image: none !important; border-bottom: none !important; }
	.de-cfg-tab::${ nav.isFirefox ? '-moz-' : '' }selection { background: transparent; }
	.de-cfg-unvis { display: none; }
	#de-info-log, #de-info-stats { width: 100%; padding: 0px 7px; }
	#de-info-log { overflow-y: auto; border-left: 1px solid grey; }
	.de-info-name { flex: 1 0 auto; }
	.de-info-row { display: flex; }
	#de-info-table { display: flex; height: 267px; }
	.de-spell-btn { padding: 0 4px; }
	#de-spell-editor { display: flex; align-items: stretch; height: 235px; padding: 2px 0; }
	#de-spell-panel { display: flex; }
	#de-spell-txt { padding: 2px !important; margin: 0; width: 100%; min-width: 0; border: none !important; outline: none !important; font: 12px courier new; ${ nav.Presto ? '' : 'resize: none !important; ' }}
	#de-spell-rowmeter { padding: 2px 3px 0 0; overflow: hidden; min-width: 2em; background-color: #616b86; text-align: right; color: #fff; font: 12px courier new; }`;

	switch(Cfg.scriptStyle) {
	case 0: // Gradient darkblue
		x += `#de-cfg-bar { background-color: #1f2740; }
			.de-cfg-tab { border-color: #121421 !important; }`;
		break;
	case 1: // gradient blue
		x += `#de-cfg-bar { background-color: #325f9e; }
			.de-cfg-tab { border-color: #183d77 !important; }`;
		break;
	case 2: // solid grey
		x += `#de-cfg-bar, #de-spell-rowmeter { background-color: #777; }
			.de-cfg-body, #de-cfg-buttons { border-color: #444; }`;
		break;
	case 3: // transparent blue
		x += `#de-cfg-bar { background-color: rgba(0,20,80,.72); }
			.de-cfg-tab { border-color: #001450 !important; }`;
		break;
	case 4: // square dark
		x += `#de-cfg-bar { background-color: #222; }
			.de-cfg-body, #de-cfg-buttons { border-color: #666; }`;
	}

	// Post panel
	x += `.de-post-btns { margin-left: 4px; }
	.de-post-btns-back { fill: inherit; stroke: none; }
	.de-post-note:not(:empty) { color: inherit; margin: 0 4px; vertical-align: 1px; font: italic bold 12px serif; }
	.de-thread-note { font-style: italic; }
	.de-btn-hide > .de-btn-unhide-use, .de-btn-unhide > .de-btn-hide-use, .de-btn-hide-user > .de-btn-unhide-use, .de-btn-unhide-user > .de-btn-hide-use { display: none; }
	.de-btn-clear, .de-btn-close, .de-btn-expthr, .de-btn-fav, .de-btn-fav-sel, .de-btn-hide, .de-btn-hide-user, .de-btn-unhide, .de-btn-unhide-user, .de-btn-rep, .de-btn-sage, .de-btn-src, .de-btn-stick, .de-btn-stick-on, .de-btn-toggle { margin: 0 2px -3px 0 !important; cursor: pointer; width: 16px; height: 16px; }
	${ !pr.form && !pr.oeForm ? '.de-btn-rep { display: none; }' : '' }` +

	// Sauce buttons
	cont('.de-src-google', 'https://google.com/favicon.ico') +
	cont('.de-src-yandex', 'https://yandex.ru/favicon.ico') +
	cont('.de-src-tineye', 'https://tineye.com/favicon.ico') +
	cont('.de-src-saucenao', 'https://saucenao.com/favicon.ico') +
	cont('.de-src-iqdb', '//iqdb.org/favicon.ico') +
	cont('.de-src-whatanime', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAMAAADarb8dAAAAWlBMVEX////29fbT1NOOj44dGx0SEhIHCAfX2NfQ0NDBwcGztLOwsbA7Ozs4ODgeHh7/2Nf/1dTMsbGpkZGWZWRyRUQ8NTYoIyMZAAAAAAAGBASBaGeBZ2Z2XVtmTUw2fryxAAAAGHRSTlP+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v4W3wyUAAAAZElEQVQI152OSQ6AMBRCadU6zxN1uP81/Y2NSY0r2fBgA+BL/wrbWEcewEqrrHa5zpSuCJMC0IY0WiA1iJW4ikkPYCFeUlQKFASTKI8SyTc8s8sc/rBDvwbF1LVjUJzbftjv6xfbkBHGT8GSnQAAAABJRU5ErkJggg==') +

	// Posts counter
	`.de-post-counter::after, .de-post-counter-pview, .de-post-deleted::after { margin: 0 4px 0 2px; vertical-align: 1px;  font: bold 11px tahoma; cursor: default; }
	.de-post-counter::after { counter-increment: de-cnt 1; content: counter(de-cnt); color: #4f7942; }
	.de-post-counter-pview { color: #4f7942; }
	.de-post-deleted::after { content: "${ Lng.deleted[lang] }"; color: #727579; }` +

	// Text markup buttons
	`#de-txt-panel { display: block; font-weight: bold; cursor: pointer; }
	#de-txt-panel > div { display: inline-block; }
	#de-txt-panel > div > svg { width: 23px; height: 22px; margin: 0 2px; }
	.de-markup-back { fill: #f0f0f0; stroke: #808080; }`;

	// Show/close animation
	if('animation' in docBody.style) {
		x += `@keyframes de-open { 0% { transform: translateY(-100%); } 100% { transform: translateY(0); } }
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
		.de-win-close { animation: de-win-close .2s ease-in both; }`;
	} else {
		Cfg.animation = 0;
	}

	// Full images
	p = Math.max(Cfg.minImgSize || 0, 50);
	x += `.de-img-pre, .de-fullimg { display: block; border: none; outline: none; cursor: pointer; image-orientation: from-image; }
	.de-img-pre { max-width: 200px; max-height: 200px; }
	.de-fullimg-after { clear: left; }
	.de-fullimg-center { position: fixed; margin: 0 !important; z-index: 9999; background-color: #ccc; border: 1px solid black !important; box-sizing: content-box; -moz-box-sizing: content-box; }
	.de-fullimg-info { text-align: center; }
	.de-fullimg-load { position: absolute; z-index: 2; width: 50px; height: 50px; top: 50%; left: 50%; margin: -25px; }
	.de-fullimg-src { float: none !important; display: inline-block; padding: 2px 4px; margin: 2px 0 2px -1px; background: rgba(64,64,64,.8); font: bold 12px tahoma; color: #fff  !important; text-decoration: none; outline: none; }
	.de-fullimg-src:hover { color: #fff !important; background: rgba(64,64,64,.6); }
	.de-fullimg-wrap-center, .de-fullimg-wrap-center > .de-fullimg, .de-fullimg-wrap-link { width: inherit; height: inherit; }
	.de-fullimg-wrap-inpost { min-width: ${ p }px; min-height: ${ p }px; float: left; ${ aib.multiFile ? '' : 'padding: 2px 5px; -moz-box-sizing: border-box; box-sizing: border-box; ' } }
	.de-fullimg-wrap-nosize > .de-fullimg { opacity: .3; }
	#de-img-btn-next, #de-img-btn-prev { position: fixed; top: 50%; z-index: 10000; height: 36px; width: 36px; margin-top: -18px; background-repeat: no-repeat; background-position: center; background-color: black; cursor: pointer; }
	#de-img-btn-next { background-image: url(data:image/gif;base64,R0lGODlhIAAgAIAAAPDw8P///yH5BAEAAAEALAAAAAAgACAAQAJPjI8JkO1vlpzS0YvzhUdX/nigR2ZgSJ6IqY5Uy5UwJK/l/eI6A9etP1N8grQhUbg5RlLKAJD4DAJ3uCX1isU4s6xZ9PR1iY7j5nZibixgBQA7); right: 0; border-radius: 10px 0 0 10px; }
	#de-img-btn-prev { background-image: url(data:image/gif;base64,R0lGODlhIAAgAIAAAPDw8P///yH5BAEAAAEALAAAAAAgACAAQAJOjI8JkO24ooxPzYvzfJrWf3Rg2JUYVI4qea1g6zZmPLvmDeM6Y4mxU/v1eEKOpziUIA1BW+rXXEVVu6o1dQ1mNcnTckp7In3LAKyMchUAADs=); left: 0; border-radius: 0 10px 10px 0; }` +

	// Embedders
	cont('.de-video-link.de-ytube', 'https://youtube.com/favicon.ico') +
	cont('.de-video-link.de-vimeo', 'https://vimeo.com/favicon.ico') +
	cont('.de-img-arch', 'data:image/gif;base64,R0lGODlhEAAQALMAAF82SsxdwQMEP6+zzRA872NmZQesBylPHYBBHP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAQARTMMlJaxqjiL2L51sGjCOCkGiBGWyLtC0KmPIoqUOg78i+ZwOCUOgpDIW3g3KJWC4t0ElBRqtdMr6AKRsA1qYy3JGgMR4xGpAAoRYkVDDWKx6NRgAAOw==') +
	cont('.de-img-audio', 'data:image/gif;base64,R0lGODlhEAAQAKIAAGya4wFLukKG4oq3802i7Bqy9P///wAAACH5BAEAAAYALAAAAAAQABAAQANBaLrcHsMN4QQYhE01OoCcQIyOYQGooKpV1GwNuAwAa9RkqTPpWqGj0YTSELg0RIYM+TjOkgba0sOaAEbGBW7HTQAAOw==') +
	`.de-current::after { content: " \u25CF"; }
	.de-img-arch, .de-img-audio { margin-left: 4px; color: inherit; text-decoration: none; font-weight: bold; }
	.de-mp3 { margin: 5px 20px; }
	.de-video-obj { margin: 5px 20px; white-space: nowrap; }
	.de-video-obj-inline { display: inline-block; }
	#de-video-btn-resize { padding: 0 14px 8px 0; margin: 0 8px; border: 2px solid; border-radius: 2px; }
	#de-video-btn-hide, #de-video-btn-prev { margin-left: auto; }
	#de-video-buttons { display: flex; align-items: center; width: 100%; line-height: 16px; }
	.de-video-expanded { width: 854px !important; height: 480px !important; }
	#de-video-list { padding: 0 0 4px; overflow-y: auto; width: 100%; }
	.de-video-refpost { margin: 0 3px; text-decoration: none; cursor: pointer; }
	.de-video-resizer::after { content: "\u2795"; margin: 0 -15px 0 3px; vertical-align: 6px; color: #000; font-size: 12px; cursor: pointer; }
	.de-video-player, .de-video-thumb { width: 100%; height: 100%; }
	a.de-video-player { display: inline-block; position: relative; border-spacing: 0; border: none; }
	a.de-video-player::after { content: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAWCAQAAACMYb/JAAAArklEQVR4AYXSr05CYRjA4cPGxjRosTijdvNJzmD1CrwAvQWugASNwGg0MoErOIVCPCMx0hmBMaAA4mPX8/2rT/i+9/1lPu0M3MtCN1OAvS+NEFkDmHqoJwcAbHzUkb9n7C5FqLynCAzdpAhLrynCRc9VnEDpKUWYpUmZIlt5nBQeY889amvGPj33HBvdt45WbAELeWyNP/qu/8dwBrDyVp9UBRi5DYXZdTLxEs77F5bCVAHlDJ1UAAAAAElFTkSuQmCC"); position: absolute;top: 50%; left: 50%; padding: 12px 24px; margin: -22px 0 0 -32px; background-color: rgba(255,0,0,.4); border-radius: 8px; line-height: 0; }
	a.de-video-player:hover::after { background-color: rgba(255,0,0,.7); }
	.de-video-title[de-time]::after { content: " [" attr(de-time) "]"; color: red; }
	.de-vocaroo > embed { display: inline-block; }
	video { background: black; }` +

	// File inputs
	`.de-file { display: inline-block; vertical-align: top; margin: 1px; height: ${ p = aib.multiFile ? 90 : 130 }px; width: ${ p }px; text-align: center; background-color: rgba(96,96,96,.15); border: 1px dashed grey; }
	.de-file > .de-file-img { display: table; width: 100%; height: 100%; cursor: pointer; }
	.de-file > .de-file-img > div { display: table-cell; vertical-align: middle; }
	.de-file > .de-file-utils { display: none; height: 16px; margin-top: -18px; padding: 1px 0; background: rgba(64,64,64,.6); position: relative; }
	.de-file > .de-file-utils > .de-file-rarmsg { color: #fff; }
	#de-file-area { border-spacing: 0; margin-top: 1px; width: 275px; min-width: 100%; max-width: 100%; overflow-x: auto; overflow-y: hidden; white-space: nowrap; }
	.de-file-drag { background: rgba(96,96,96,.8); border: 1px solid grey; opacity: .7; }
	.de-file:hover:not(.de-file-drag) > .de-file-utils { display: block !important; }
	img.de-file-img, video.de-file-img { max-width: ${ p - 4 }px; max-height: ${ p - 4 }px; }
	.de-file-input { max-width: 300px; }
	.de-file-input + .de-file-utils { margin-left: 4px; }
	.de-file-off > .de-file-img > div::after { content: "${ Lng.dropFileHere[lang] }"; display: block; width: 80px; margin: 0 auto; font: 11px arial; opacity: .8; white-space: initial; }
	.de-file-rarmsg { margin: 0 2px; vertical-align: 4px; font: bold 11px tahoma; cursor: default; }
	.de-file-btn-del, .de-file-btn-rar, .de-file-btn-txt { display: inline-block; margin: 0 1px; padding: 0 16px 16px 0; cursor: pointer; }
	.de-file-spoil { margin: 0 3px; vertical-align: 1px; }
	.de-file-txt-add { font-weight: bold; width: 21px; padding: 0 !important; }
	.de-file-txt-input { border: 1px solid #9c9c9c; padding: 2px; font: 12px/16px sans-serif; }
	.de-file-txt-noedit { background: rgba(255,255,255,.5); cursor: pointer; }
	.de-file-utils { display: inline-block; float: none; vertical-align: -2px; }` +
	gif('.de-file-btn-del', 'R0lGODlhEAAQALMOAP8zAMopAJMAAP/M//+DIP8pAP86Av9MDP9sFP9zHv9aC/9gFf9+HJsAAP///wAAACH5BAEAAA4ALAAAAAAQABAAAARU0MlJKw3B4hrGyFP3hQNBjE5nooLJMF/3msIkJAmCeDpeU4LFQkFUCH8VwWHJRHIM0CiIMwBYryhS4XotZDuFLUAg6LLC1l/5imykgW+gU0K22C0RADs=') +
	gif('.de-file-btn-rar', 'R0lGODlhEAAQALMAAF82SsxdwQMEP6+zzRA872NmZQesBylPHYBBHP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAQARTMMlJaxqjiL2L51sGjCOCkGiBGWyLtC0KmPIoqUOg78i+ZwOCUOgpDIW3g3KJWC4t0ElBRqtdMr6AKRsA1qYy3JGgMR4xGpAAoRYkVDDWKx6NRgAAOw==') +
	gif('.de-file-btn-txt', 'R0lGODlhEAAQAJEAACyr4e/19////wAAACH5BAEAAAIALAAAAAAQABAAAAIrlI+pwK3WokMyBEmjxbBeLgEbKFrmyXTn+nXaF7nNGMslZ9NpFu4L/ggeCgA7') +

	// Post reply
	`.de-parea { text-align: center; }
	.de-parea-btn-close::after { content: "${ Lng.hideForm[lang] }"; }
	.de-parea-btn-thr::after { content: "${ Lng.makeThr[lang] }"; }
	.de-parea-btn-reply::after { content: "${ Lng.makeReply[lang] }"; }
	#de-pform > form { padding: 0; margin: 0; border: none; }
	#de-pform input[type="text"], #de-pform input[type="file"] { width: 200px; }
	#de-resizer-text { display: inline-block !important; float: none !important; padding: 5px; margin: ${ nav.Presto ? '-2px -10px' : '0 0 -2px -10px' }; vertical-align: bottom; border-bottom: 2px solid #666; border-right: 2px solid #666; cursor: se-resize; }
	.de-win-inpost { float: none; clear: left; display: inline-block; width: auto; padding: 3px; margin: 2px 0; }
	.de-win-inpost > .de-resizer { display: none; }
	.de-win-inpost > .de-win-head { background: none; color: inherit; }
	#de-win-reply { width: auto !important; min-width: 0; padding: 0 !important; border: none !important; }
	#de-win-reply.de-win { position: fixed !important; padding: 0 !important; margin: 0 !important; border-radius: 10px 10px 0 0; }
	#de-win-reply.de-win > .de-win-body { padding: 2px 2px 0 1px; border: 1px solid gray; }
	#de-win-reply.de-win .de-textarea { min-width: 98% !important; resize: none !important; }
	#de-win-reply.de-win #de-resizer-text { display: none !important; }
	#de-sagebtn { margin: 4px !important; vertical-align: top; cursor: pointer; }
	.de-textarea { display: inline-block; padding: 3px !important; min-width: 275px !important; min-height: 90px !important; resize: both; transition: none !important; }` +

	// Favorites window
	`.de-fav-del > #de-fav-buttons { display: none; }
	.de-fav-del > #de-fav-delbuttons { display: block !important; }
	.de-fav-del .de-fav-header-switch, .de-fav-del .de-fav-switch { display: block !important; margin: 2px 0 2px 4px !important; flex: none; }
	#de-fav-delbuttons { display: none; }
	.de-fav-header-switch, .de-fav-switch { display: none; }
	.de-fav-header { margin-top: 0; margin-bottom: 0; padding: 1px 0; display: flex; }
	.de-fav-entries { border-top: 1px solid rgba(80,80,80,.3); }
	.de-fav-header-link { margin-left: 4px; color: inherit; font-weight: bold; font-size: 14px; flex: auto; text-decoration: none; outline: none; }
	.de-entry { display: flex !important; align-items: center; float: none !important; padding: 0 !important; margin: 2px 0 !important; border: none !important; font-size: 14px; overflow: hidden !important; white-space: nowrap; }
	.de-fav-link { flex: none; margin-left: 4px; text-decoration: none; border: none; }
	.de-entry-title { flex: auto; padding-left: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
	.de-fav-inf { flex: none; padding: 0 4px 0 10px; font: bold 14px serif; cursor: default; }
	.de-fav-inf-icon, .de-fav-inf-iwrap  { width: 16px; height: 16px; }
	.de-fav-inf-icon { margin-bottom: -3px; }
	.de-fav-inf-icon:not(.de-fav-closed):not(.de-fav-unavail):not(.de-fav-wait), .de-fav-closed > .de-fav-unavail-use, .de-fav-closed > .de-fav-wait-use, .de-fav-unavail > .de-fav-closed-use, .de-fav-unavail > .de-fav-wait-use, .de-fav-wait > .de-fav-closed-use, .de-fav-wait > .de-fav-unavail-use { display: none; }
	.de-fav-inf-new { color: #424f79; }
	.de-fav-inf-new::after { content: " +"; }
	.de-fav-inf-old { color: #4f7942; }
	.de-fav-inf-you { padding: 0 4px; margin-right: 4px; border-radius: 3px; color: #fff; background-color: #424f79; opacity: 0.65; }
	.de-fav-unavail { color: #cf4436; }
	.de-fold-block { border: 1px solid rgba(120,120,120,.8); border-radius: 2px; }
	.de-fold-block:not(:first-child) { border-top: none; }` +

	// Thread nav
	`#de-thr-navpanel { color: #F5F5F5; height: 98px; width: 41px; position: fixed; top: 50%; left: 0px; padding: 0; margin: -49px 0 0; background: #777; border: 1px solid #525252; border-left: none; border-radius: 0 5px 5px 0; cursor: pointer; z-index: 1000; }
	.de-thr-navpanel-hidden { opacity: .7; margin-left: -34px !important; }
	#de-thr-navarrow { display: none; position: absolute; top: 50%; left: 34px; transform: translateY(-50%); width: 7px; height: 7px; }
	.de-thr-navpanel-hidden > #de-thr-navarrow { display: initial; }
	#de-thr-navup { padding: 12px 9px 13px 8px; border-radius: 0 5px 0 0; }
	#de-thr-navdown { padding: 13px 9px 12px 8px; border-radius: 0 0 5px 0; }
	#de-thr-navup, #de-thr-navdown { width: 41px; height: 49px; -moz-box-sizing: border-box; box-sizing: border-box; }
	:not(.de-thr-navpanel-hidden) > #de-thr-navup:hover, :not(.de-thr-navpanel-hidden) > #de-thr-navdown:hover { background: #555; }` +

	// Other
	`@keyframes de-wait-anim { to { transform: rotate(360deg); } }
	.de-wait, .de-fav-wait , .de-fullimg-load { animation: de-wait-anim 1s linear infinite; }
	.de-wait { margin: 0 2px -3px 0 !important; width: 16px; height: 16px; }
	.de-abtn { text-decoration: none !important; outline: none; }
	#de-wrapper-popup { overflow-x: hidden !important; overflow-y: auto !important; -moz-box-sizing: border-box; box-sizing: border-box; max-height: 100vh; position: fixed; right: 0; top: 0; z-index: 9999; font: 14px arial; cursor: default; }
	.de-popup { overflow: visible !important; clear: both !important; width: auto !important; min-width: 0pt !important; padding: 8px !important; margin: 1px !important; border: 1px solid grey !important; display: block !important; float: right !important; max-width: initial !important; }
	.de-popup-btn { display: inline-block; vertical-align: top; color: green; cursor: pointer; line-height: 1.15; }
	.de-popup-msg { display: inline-block; white-space: pre-wrap; }
	.de-button { flex: none; padding: 0 ${ nav.isFirefox ? 2 : 4 }px !important; margin: 1px 2px; height: 24px; font: 13px arial; }
	.de-editor { display: block; font: 12px courier new; width: 619px; height: 337px; tab-size: 4; -moz-tab-size: 4; -o-tab-size: 4; }
	.de-hidden { float: left; overflow: hidden !important; margin: 0 !important; padding: 0 !important; border: none !important; width: 0 !important; height: 0 !important; display: inline !important; }
	.de-input-key { padding: 0 2px !important; margin: 0 !important; font: 13px/15px arial !important; }
	.de-link-parent { outline: 1px dotted !important; }
	.de-link-pview { font-weight: bold; }
	.de-link-ref { text-decoration: none; }
	.de-list { padding-top: 4px; }
	.de-list::before { content: "\u25CF"; margin-right: 4px; }
	.de-menu { padding: 0 !important; margin: 0 !important; width: auto !important; min-width: 0 !important; z-index: 9999; border: 1px solid grey !important; }
	.de-menu-item { display: block; padding: 3px 10px; color: inherit; text-decoration: none; font: 13px arial; white-space: nowrap; cursor: pointer; }
	.de-menu-item:hover { background-color: #222; color: #fff; }
	.de-omitted { color: grey; }
	.de-omitted::before { content: "${ Lng.postsOmitted[lang] }"; }
	.de-post-hiddencontent { display: none !important; }
	.de-pview { position: absolute; width: auto; min-width: 0; z-index: 9999; border: 1px solid grey !important; margin: 0 !important; display: block !important; }
	.de-pview-info { padding: 3px 6px !important; }
	.de-ref-op::after { content: " (OP)"; }
	.de-ref-del::after { content: " (Del)"; }
	.de-refmap { margin: 10px 4px 4px 4px; font-size: 75%; font-style: italic; }
	.de-refmap::before { content: "${ Lng.replies[lang] } "; }
	.de-refcomma:last-child { display: none; }
	.de-replies-hide::after { content: "${ Lng.hidePosts[lang] }"; }
	.de-replies-show::after { content: "${ Lng.showPosts[lang] }"; }
	.de-thread-buttons { clear: left; margin-top: 5px; }
	.de-thread-collapse > a::after { content: "${ Lng.collapseThr[lang] }"; }
	.de-thread-updater > a::after { content: "${ Lng.getNewPosts[lang] }"; }
	#de-updater-count::before { content: ": "; }
	.de-viewed { color: #747488 !important; }
	form > hr { clear: both }`;

	$css(x).id = 'de-css';
	$css('').id = 'de-css-dynamic';
	$css('').id = 'de-css-user';
	updateCSS();
}

function updateCSS() {
	const str = `.de-video-obj { width: ${ Cfg.YTubeWidth }px; height: ${ Cfg.YTubeHeigh }px; }
	.de-new-post { ${ nav.Presto ?
		'border-left: 4px solid rgba(107,134,97,.7); border-right: 4px solid rgba(107,134,97,.7)' :
		'box-shadow: 6px 0 2px -2px rgba(107,134,97,.8), -6px 0 2px -2px rgba(107,134,97,.8)' }; }
	.de-selected, .de-error-input { ${ nav.Presto ?
		'border-left: 4px solid rgba(220,0,0,.7); border-right: 4px solid rgba(220,0,0,.7)' :
		'box-shadow: 6px 0 2px -2px rgba(220,0,0,.8), -6px 0 2px -2px rgba(220,0,0,.8)' }; }
	${ Cfg.markMyPosts ? `.de-mypost { ${ nav.Presto ?
		'border-left: 4px solid rgba(97,107,134,.7); border-right: 4px solid rgba(97,107,134,.7)' :
		'box-shadow: 6px 0 2px -2px rgba(97,107,134,.8), -6px 0 2px -2px rgba(97,107,134,.8)' }; }
		.de-mypost .de-post-counter::after { content: counter(de-cnt) " (You)"; }
		.de-mypost .de-post-deleted::after { content: "${ Lng.deleted[lang] } (You)"; }` : '' }
	${ Cfg.markMyLinks ? `.de-ref-my::after { content: " (You)"; }
		.de-ref-del.de-ref-my::after { content: " (Del)(You)"; }
		.de-ref-op.de-ref-my::after { content: " (OP)(You)"; }` : '' }
	${ Cfg.postBtnsCSS === 0 ?
		`.de-btn-fav, .de-btn-stick, .de-btn-expthr, .de-btn-rep, .de-btn-hide, .de-btn-unhide, .de-btn-src { fill: rgba(0,0,0,0); color: currentColor; }
		.de-btn-fav-sel, .de-btn-stick-on, .de-btn-sage, .de-btn-hide-user, .de-btn-unhide-user { fill: rgba(0,0,0,0); color: #F00; }` :
		`.de-btn-hide, .de-btn-unhide, .de-btn-src, .de-btn-sage, .de-btn-fav, .de-btn-stick, .de-btn-expthr, .de-btn-rep { color: #F5F5F5; }
		.de-btn-hide-user { color: #BFFFBF; }
		.de-btn-unhide-user { color: #FFBFBF; }
		.de-btn-fav-sel { color: #FFE100; }
		.de-btn-stick-on { color: #BFFFBF; }
		.de-btn-sage { fill: #4B4B4B; }
		.de-btn-expthr, .de-btn-fav, .de-btn-fav-sel, .de-btn-hide, .de-btn-hide-user,
		.de-btn-unhide, .de-btn-unhide-user, .de-btn-rep, .de-btn-src, .de-btn-stick,
		.de-btn-stick-on { fill: ${ Cfg.postBtnsCSS === 1 && !nav.Presto ? 'url(#de-btn-back-gradient)' : Cfg.postBtnsBack }; }` }
	${ Cfg.hideReplies || Cfg.updThrBtns ? '.de-thread-buttons::before { content: ">> "; }' : '' }
	.de-fullimg-wrap-inpost > .de-fullimg { width: ${ Cfg.resizeImgs ? '100%' : 'auto' }; }
	${ Cfg.maskImgs ? aib.qPostImg + `, .de-img-pre, .de-video-obj { opacity: ${ Cfg.maskVisib / 100 } !important; }
		${ aib.qPostImg.split(', ').join(':hover, ') }:hover, .de-img-pre:hover, .de-video-obj:hover { opacity: 1 !important; }
		.de-video-obj:not(.de-video-obj-inline) { clear: both; }` : '' }
	${ Cfg.delImgNames ? '.de-img-name { text-transform: capitalize; text-decoration: none; }' : '' }
	${ Cfg.widePosts ? `.${ aib.cReply.replace(/\s/, '.') }:not(.de-pview) { float: none; width: 99.9%; margin-left: 0; }` : '' }
	${ Cfg.strikeHidd ? '.de-link-hid { text-decoration: line-through !important; }' : '' }
	${ Cfg.noSpoilers === 1 ?
		`.spoiler, s { color: #F5F5F5 !important; background-color: #888 !important; }
		.spoiler > a, s > a:not(:hover) { color: #F5F5F5 !important; background-color: #888 !important; }` :
		Cfg.noSpoilers === 2 ?
			`.spoiler, s { color: inherit !important; }
			.spoiler > a, s > a:not(:hover) { color: inherit !important; }` : '' }
	${ Cfg.fileInputs ? '' : '.de-file-input { display: inline !important; }' }
	${ Cfg.addSageBtn ? '' : '#de-sagebtn, ' }
	${ Cfg.delHiddPost === 1 || Cfg.delHiddPost === 3 ? '.de-thr-hid, .de-thr-hid + div + hr, .de-thr-hid + div + br, .de-thr-hid + div + br + hr, .de-thr-hid + div + div + hr, ' : ''	}
	${ Cfg.imgNavBtns ? '' : '#de-img-btn-next, #de-img-btn-prev, ' }
	${ Cfg.imgInfoLink ? '' : '.de-fullimg-info, ' }
	${ Cfg.noPostNames ? aib.qPostName + ', ' + aib.qPostTrip + ', ' : '' }
	${ Cfg.noBoardRule ? aib.qFormRules + ', ' : '' }
	${ Cfg.panelCounter ? '' : '#de-panel-info, ' }
	${ Cfg.removeHidd ? '.de-link-ref.de-link-hid, .de-link-ref.de-link-hid + .de-refcomma, ' : '' }
	${ Cfg.showHideBtn ? '' : '.de-btn-hide, ' }
	${ Cfg.showRepBtn ? '' : '.de-btn-rep, ' }
	${ Cfg.updThrBtns || aib.t ? '' : '.de-thread-updater, ' }
	${ Cfg.ajaxPosting ? '' : '.de-file-btn-rar, .de-file-btn-txt, ' }
	${ Cfg.fileInputs ? '' : '.de-file-txt-wrap, .de-file-btn-txt, ' }
	${ aib.kus || !aib.multiFile && Cfg.fileInputs === 2 ? '' : '#de-pform form > table > tbody > tr > td:not([colspan]):first-child, #de-pform form > table > tbody > tr > th:first-child, ' }
		body > hr, .postarea, small[id^="rfmap"], .theader { display: none !important; }`;
	$id('de-css-dynamic').textContent = str + '\n' + aib.css;
	$id('de-css-user').textContent = Cfg.userCSS ? Cfg.userCSSTxt : '';
}

/* ==[ Main.js ]==============================================================================================
                                                     MAIN
=========================================================================================================== */

async function runMain(checkDomains, dataPromise) {
	Logger.init();
	docBody = doc.body;
	if(!docBody) {
		return;
	}
	if(!aib) {
		aib = getImageBoard(checkDomains, true);
		if(!aib) {
			return;
		}
	}
	let formEl = $q(aib.qDForm + ', form[de-form]');
	if(!formEl) {
		if(aib.observeContent) {
			aib.observeContent(checkDomains, dataPromise);
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
	let eList, fav;
	if(dataPromise) {
		[eList, fav] = await dataPromise;
	} else {
		[eList, fav] = await readData();
	}
	if(eList && eList.includes(aib.dm)) {
		return;
	}
	excludeList = eList || '';
	Logger.log('Data loading');
	if(!Cfg.disabled && ((aib.init && aib.init()) || $id('de-panel'))) {
		return;
	}
	addSVGIcons();
	if(Cfg.disabled) {
		Panel.init(formEl);
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
		doc.defaultView.addEventListener('beforeunload',
			() => (sesStorage['de-scroll-' + aib.b + aib.t] = window.pageYOffset));
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
			console.error('No threads detected!');
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
	Panel.init(formEl);
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
		readPostsData(firstThr.op, fav);
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

/* ==[ Tail ]== */
}(
	window.opera && window.opera.scriptStorage,
	window.FormData,
	(x, y) => window.scrollTo(x, y),
	/* global localData */ typeof localData === 'object' ? localData : null
));
