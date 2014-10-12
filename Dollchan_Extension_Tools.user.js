// ==UserScript==
// @name            Dollchan Extension Tools
// @version         14.10.11.0
// @namespace       http://www.freedollchan.org/scripts/*
// @author          Sthephan Shinkufag @ FreeDollChan
// @copyright       (C)2084, Bender Bending Rodriguez
// @description     Doing some profit for imageboards
// @icon            https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Icon.png
// @updateURL       https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.meta.js
// @run-at          document-start
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_deleteValue
// @grant           GM_openInTab
// @grant           GM_xmlhttpRequest
// @grant           unsafeWindow
// @include         *
// ==/UserScript==

// Copyright (c) 2014 Dollchan Extension Tools Team. See the LICENSE file for license rights and limitations (MIT).

(function de_main_func(scriptStorage) {
'use strict';

var version = '14.10.11.0',
defaultCfg = {
	'disabled':         0,      // script enabled by default
	'language':         0,      // script language [0=ru, 1=en]
	'hideBySpell':      1,      // hide posts by spells
	'spells':           '',     // user defined spells
	'sortSpells':       0,      // sort spells when applying
	'menuHiddBtn':      1,      // menu on hide button
	'hideRefPsts':      0,      // hide post with references to hidden posts
	'delHiddPost':      0,      // delete hidden posts
	'ajaxUpdThr':       1,      // auto update threads
	'updThrDelay':      60,     //    threads update interval in sec
	'noErrInTitle':     0,      //    don't show error number in title except 404
	'favIcoBlink':      0,      //    favicon blinking, if new posts detected
	'markNewPosts':     1,      //    new posts marking on page focus
	'desktNotif':       0,      //    desktop notifications, if new posts detected
	'expandPosts':      2,      // expand shorted posts [0=off, 1=auto, 2=on click]
	'postBtnsCSS':      2,      // post buttons style [0=text, 1=classic, 2=solid grey]
	'noSpoilers':       1,      // open spoilers
	'noPostNames':      0,      // hide post names
	'noPostScrl':       1,      // no scroll in posts
	'correctTime':      0,      // correct time in posts
	'timeOffset':       '+0',   //    offset in hours
	'timePattern':      '',     //    find pattern
	'timeRPattern':     '',     //    replace pattern
	'expandImgs':       2,      // expand images by click [0=off, 1=in post, 2=by center]
	'imgNavBtns':       1,      //    add image navigation for full images
	'resizeDPI':        0,      //    honor dpi settings
	'resizeImgs':       1,      //    resize large images
	'minImgSize':       100,    //    minimal image's size
	'zoomFactor':       25,     //    zoom images by this factor on every wheel event
	'webmControl':      1,      //    control bar fow webm files
	'webmVolume':       100,    //    default volume for webm files
	'maskImgs':         0,      // mask images
	'preLoadImgs':      0,      // pre-load images
	'findImgFile':      0,      //    detect built-in files in images
	'openImgs':         0,      // open images in posts
	'openGIFs':         0,      //    open only GIFs in posts
	'imgSrcBtns':       1,      // add image search buttons
	'linksNavig':       2,      // navigation by >>links [0=off, 1=no map, 2=+refmap]
	'linksOver':        100,    //    delay appearance in ms
	'linksOut':         1500,   //    delay disappearance in ms
	'markViewed':       0,      //    mark viewed posts
	'strikeHidd':       0,      //    strike >>links to hidden posts
	'noNavigHidd':      0,      //    don't show previews for hidden posts
	'crossLinks':       0,      // replace http: to >>/b/links
	'insertNum':        1,      // insert >>link on postnumber click
	'addMP3':           1,      // embed mp3 links
	'addImgs':          0,      // embed links to images
	'addYouTube':       3,      // embed YouTube links [0=off, 1=onclick, 2=player, 3=preview+player, 4=only preview]
	'YTubeType':        0,      //    player type [0=flash, 1=HTML5]
	'YTubeWidth':       360,    //    player width
	'YTubeHeigh':       270,    //    player height
	'YTubeHD':          0,      //    hd video quality
	'YTubeTitles':      0,      //    convert links to titles
	'addVimeo':         1,      //    embed vimeo links
	'ajaxReply':        2,      // posting with AJAX (0=no, 1=iframe, 2=HTML5)
	'postSameImg':      1,      //    ability to post same images
	'removeEXIF':       1,      //    remove EXIF data from JPEGs
	'removeFName':      0,      //    remove file name
	'sendErrNotif':     1,      //    inform about post send error if page is blurred
	'scrAfterRep':      0,      //    scroll to the bottom after reply
	'addPostForm':      2,      // postform displayed [0=at top, 1=at bottom, 2=hidden]
	'hangQReply':       1,      // quick reply type [0=inline, 1=hanging]
	'favOnReply':       1,      // add thread to favorites on reply
	'warnSubjTrip':     0,      // warn if subject field contains tripcode
	'fileThumb':        1,      // file preview area instead of file button
	'addSageBtn':       1,      // email field -> sage button
	'saveSage':         1,      // remember sage
	'sageReply':        0,      //    reply with sage
	'captchaLang':      1,      // language input in captcha [0=off, 1=en, 2=ru]
	'addTextBtns':      1,      // text format buttons [0=off, 1=graphics, 2=text, 3=usual]
	'txtBtnsLoc':       1,      //    located at [0=top, 1=bottom]
	'passwValue':       '',     // user password value
	'userName':         0,      // user name
	'nameValue':        '',     //    value
	'noBoardRule':      1,      // hide board rules
	'noGoto':           1,      // hide goto field
	'noPassword':       1,      // hide password field
	'scriptStyle':      0,      // script style [0=glass black, 1=glass blue, 2=solid grey]
	'userCSS':          0,      // user style
	'userCSSTxt':       '',     //    css text
	'expandPanel':      0,      // show full main panel
	'attachPanel':      1,      // attach main panel
	'panelCounter':     1,      // posts/images counter in script panel
	'rePageTitle':      1,      // replace page title in threads
	'animation':        1,      // CSS3 animation in script
	'closePopups':      0,      // auto-close popups
	'hotKeys':          1,      // enable hotkeys
	'loadPages':        1,      //    number of pages that are loaded on F5
	'updScript':        1,      // check for script's update
	'scrUpdIntrv':      1,      //    check interval in days (every val+1 day)
	'turnOff':          0,      // enable script only for this site
	'textaWidth':       300,    // textarea size
	'textaHeight':      115,
	'qreplyRight':      0,      // hanging quick reply position
	'qreplyBottom':     25
},

Lng = {
	cfg: {
		'hideBySpell':  ['Заклинания: ', 'Magic spells: '],
		'sortSpells':   ['Сортировать спеллы и удалять дубликаты', 'Sort spells and delete duplicates'],
		'menuHiddBtn':  ['Дополнительное меню кнопок скрытия ', 'Additional menu of hide buttons'],
		'hideRefPsts':  ['Скрывать ответы на скрытые посты*', 'Hide replies to hidden posts*'],
		'delHiddPost':  ['Удалять скрытые посты', 'Delete hidden posts'],

		'ajaxUpdThr':   ['AJAX обновление треда ', 'AJAX thread update '],
		'updThrDelay':  [' (сек)', ' (sec)'],
		'noErrInTitle': ['Не показывать номер ошибки в заголовке', 'Don\'t show error number in title'],
		'favIcoBlink':  ['Мигать фавиконом при новых постах', 'Favicon blinking on new posts'],
		'markNewPosts': ['Выделять новые посты при переключении на тред', 'Mark new posts on page focus'],
		'desktNotif':   ['Уведомления на рабочем столе', 'Desktop notifications'],
		'expandPosts': {
			sel:        [['Откл.', 'Авто', 'По клику'], ['Disable', 'Auto', 'On click']],
			txt:        ['AJAX загрузка сокращенных постов*', 'AJAX upload of shorted posts*']
		},
		'postBtnsCSS': {
			sel:        [['Text', 'Classic', 'Solid grey'], ['Text', 'Classic', 'Solid grey']],
			txt:        ['Стиль кнопок постов*', 'Post buttons style*']
		},
		'noSpoilers':   ['Открывать текстовые спойлеры', 'Open text spoilers'],
		'noPostNames':  ['Скрывать имена в постах', 'Hide names in posts'],
		'noPostScrl':   ['Без скролла в постах', 'No scroll in posts'],
		'hotKeys':      ['Горячие клавиши ', 'Keyboard hotkeys '],
		'loadPages':    [' Количество страниц, загружаемых по F5', ' Number of pages that are loaded on F5 '],
		'correctTime':  ['Корректировать время в постах* ', 'Correct time in posts* '],
		'timeOffset':   [' Разница во времени', ' Time difference'],
		'timePattern':  [' Шаблон поиска', ' Find pattern'],
		'timeRPattern': [' Шаблон замены', ' Replace pattern'],

		'expandImgs': {
			sel:        [['Откл.', 'В посте', 'По центру'], ['Disable', 'In post', 'By center']],
			txt:        ['раскрывать картинки по клику', 'expand images on click']
		},
		'imgNavBtns':   ['Добавлять кнопки навигации по картинкам', 'Add buttons for images navigation'],
		'resizeDPI':    ['Отображать картинки пиксель в пиксель', 'Don\'t upscale images on retina displays'],
		'resizeImgs':   ['Уменьшать в экран большие картинки', 'Resize large images to fit screen'],
		'minImgSize':   [' Минимальный размер картинок (px)', ' Minimal image\'s size (px)'],
		'zoomFactor':   [' Чувствительность зума картинок [1-100]', ' Sensibility of the images zoom [1-100]'],
		'webmControl':  ['Показывать контрол-бар для webm-файлов', 'Show control bar for webm files'],
		'webmVolume':   [' Громкость webm-файлов [0-100]', ' Default volume for webm files [0-100]'],
		'preLoadImgs':  ['Предварительно загружать картинки*', 'Pre-load images*'],
		'findImgFile':  ['Распознавать встроенные файлы в картинках*', 'Detect built-in files in images*'],
		'openImgs':     ['Скачивать полные версии картинок*', 'Download full version of images*'],
		'openGIFs':     ['Скачивать только GIFы*', 'Download GIFs only*'],
		'imgSrcBtns':   ['Добавлять кнопки для поиска картинок*', 'Add image search buttons*'],

		'linksNavig': {
			sel:        [['Откл.', 'Без карты', 'С картой'], ['Disable', 'No map', 'With map']],
			txt:        ['навигация по >>ссылкам* ', 'navigation by >>links* ']
		},
		'linksOver':    [' задержка появления (мс)', ' delay appearance (ms)'],
		'linksOut':     [' задержка пропадания (мс)', ' delay disappearance (ms)'],
		'markViewed':   ['Отмечать просмотренные посты*', 'Mark viewed posts*'],
		'strikeHidd':   ['Зачеркивать >>ссылки на скрытые посты', 'Strike >>links to hidden posts'],
		'noNavigHidd':  ['Не отображать превью для скрытых постов', 'Don\'t show previews for hidden posts'],
		'crossLinks':   ['Преобразовывать http:// в >>/b/ссылки*', 'Replace http:// with >>/b/links*'],
		'insertNum':    ['Вставлять >>ссылку по клику на №поста*', 'Insert >>link on №postnumber click*'],
		'addMP3':       ['Добавлять плеер к mp3 ссылкам* ', 'Add player to mp3 links* '],
		'addVimeo':     ['Добавлять плеер к Vimeo ссылкам* ', 'Add player to Vimeo links* '],
		'addImgs':      ['Загружать картинки к jpg, png, gif ссылкам*', 'Load images to jpg, png, gif links*'],
		'addYouTube': {
			sel:        [
				['Ничего', 'Плеер по клику', 'Авто плеер', 'Превью+плеер', 'Только превью'],
				['Nothing', 'On click player', 'Auto player', 'Preview+player', 'Only preview']
			],
			txt:        ['к YouTube-ссылкам* ', 'to YouTube-links* ']
		},
		'YTubeType': {
			sel:        [['Flash', 'HTML5'], ['Flash', 'HTML5']],
			txt:        ['', '']
		},
		'YTubeHD':      ['HD ', 'HD '],
		'YTubeTitles':  ['Загружать названия к YouTube-ссылкам*', 'Load titles into YouTube-links*'],

		'ajaxReply': {
			sel:        [['Откл.', 'Iframe', 'HTML5'], ['Disable', 'Iframe', 'HTML5']],
			txt:        ['AJAX отправка постов*', 'posting with AJAX*']
		},
		'postSameImg':  ['Возможность отправки одинаковых картинок', 'Ability to post same images'],
		'removeEXIF':   ['Удалять EXIF из JPEG ', 'Remove EXIF from JPEG '],
		'removeFName':  ['Удалять имя из файлов', 'Clear file names'],
		'sendErrNotif': ['Оповещать в заголовке об ошибке отправки поста', 'Inform in title about post send error'],
		'scrAfterRep':  ['Перемещаться в конец треда после отправки', 'Scroll to the bottom after reply'],
		'addPostForm': {
			sel:        [['Сверху', 'Внизу', 'Скрытая'], ['At top', 'At bottom', 'Hidden']],
			txt:        ['форма ответа в треде', 'reply form in thread']
		},
		'favOnReply':   ['Добавлять тред в избранное при ответе', 'Add thread to favorites on reply'],
		'warnSubjTrip': ['Предупреждать при наличии трип-кода в поле "Тема"', 'Warn if "Subject" field contains trip-code'],
		'fileThumb':    ['Область превью картинок вместо кнопки "Файл"', 'File thumbnail area instead of "File" button'],
		'addSageBtn':   ['Кнопка Sage вместо "E-mail"* ', 'Sage button instead of "E-mail"* '],
		'saveSage':     ['запоминать сажу', 'remember sage'],
		'captchaLang': {
			sel:        [['Откл.', 'Eng', 'Rus'], ['Disable', 'Eng', 'Rus']],
			txt:        ['язык ввода капчи', 'language input in captcha']
		},
		'addTextBtns': {
			sel:        [['Откл.', 'Графич.', 'Упрощ.', 'Стандарт.'], ['Disable', 'As images', 'As text', 'Standard']],
			txt:        ['кнопки форматирования текста ', 'text format buttons ']
		},
		'txtBtnsLoc':   ['внизу', 'at bottom'],
		'userPassw':    [' Постоянный пароль ', ' Fixed password '],
		'userName':     ['Постоянное имя', 'Fixed name'],
		'noBoardRule':  ['правила', 'rules'],
		'noGoto':       ['поле goto', 'goto field'],
		'noPassword':   ['пароль', 'password'],

		'scriptStyle': {
			sel:        [['Glass black', 'Glass blue', 'Solid grey'], ['Glass black', 'Glass blue', 'Solid grey']],
			txt:        ['стиль скрипта', 'script style']
		},
		'userCSS':      ['Пользовательский CSS ', 'User CSS '],
		'attachPanel':  ['Прикрепить главную панель', 'Attach main panel'],
		'panelCounter': ['Счетчик постов/картинок на главной панели', 'Counter of posts/images on main panel'],
		'rePageTitle':  ['Название треда в заголовке вкладки*', 'Thread title in page tab*'],
		'animation':    ['CSS3 анимация в скрипте', 'CSS3 animation in script'],
		'closePopups':  ['Автоматически закрывать уведомления', 'Close popups automatically'],
		'updScript':    ['Автоматически проверять обновления скрипта', 'Check for script update automatically'],
		'turnOff':      ['Включать скрипт только на этом сайте', 'Enable script only on this site'],
		'scrUpdIntrv': {
			sel:        [
				['Каждый день', 'Каждые 2 дня', 'Каждую неделю', 'Каждые 2 недели', 'Каждый месяц'],
				['Every day', 'Every 2 days', 'Every week', 'Every 2 week', 'Every month']
			],
			txt:        ['', '']
		},

		'language': {
			sel:        [['Ru', 'En'], ['Ru', 'En']],
			txt:        ['', '']
		}
	},

	txtBtn: [
		['Жирный', 'Bold'],
		['Наклонный', 'Italic'],
		['Подчеркнутый', 'Underlined'],
		['Зачеркнутый', 'Strike'],
		['Спойлер', 'Spoiler'],
		['Код', 'Code'],
		['Верхний индекс', 'Superscript'],
		['Нижний индекс', 'Subscript'],
		['Цитировать выделенное', 'Quote selected']
	],

	cfgTab: {
		'filters':      ['Фильтры', 'Filters'],
		'posts':        ['Посты', 'Posts'],
		'images':       ['Картинки', 'Images'],
		'links':        ['Ссылки', 'Links'],
		'form':         ['Форма', 'Form'],
		'common':       ['Общее', 'Common'],
		'info':         ['Инфо', 'Info']
	},

	panelBtn: {
		'attach':       ['Прикрепить/Открепить', 'Attach/Detach'],
		'settings':     ['Настройки', 'Settings'],
		'hidden':       ['Скрытое', 'Hidden'],
		'favor':        ['Избранное', 'Favorites'],
		'video':        ['Видео-ссылки', 'Video links'],
		'refresh':      ['Обновить', 'Refresh'],
		'goback':       ['Назад', 'Go back'],
		'gonext':       ['Следующая', 'Next'],
		'goup':         ['Наверх', 'To the top'],
		'godown':       ['В конец', 'To the bottom'],
		'expimg':       ['Раскрыть картинки', 'Expand images'],
		'preimg':       [
			'Предзагрузка картинок ([Ctrl+Click] только для новых постов)',
			'Preload images ([Ctrl+Click] for new posts only)'
		],
		'maskimg':      ['Маскировать картинки', 'Mask images'],
		'upd-on':       ['Выключить автообновление треда', 'Disable thread autoupdate'],
		'upd-off':      ['Включить автообновление треда', 'Enable thread autoupdate'],
		'audio-off':    ['Звуковое оповещение о новых постах', 'Sound notification about new posts'],
		'catalog':      ['Каталог', 'Catalog'],
		'counter':      ['Постов/картинок в треде', 'Posts/Images in thread'],
		'savethr':      ['Сохранить на диск', 'Save to disk'],
		'enable':       ['Включить/выключить скрипт', 'Turn on/off the script']
	},

	selHiderMenu: {
		'sel':          ['Скрывать выделенное', 'Hide selected text'],
		'name':         ['Скрывать имя', 'Hide name'],
		'trip':         ['Скрывать трип-код', 'Hide with trip-code'],
		'img':          ['Скрывать картинку', 'Hide with image'],
		'ihash':        ['Скрывать схожие картинки', 'Hide similar images'],
		'text':         ['Скрыть схожий текст', 'Hide similar text'],
		'noimg':        ['Скрывать без картинок', 'Hide without images'],
		'notext':       ['Скрывать без текста', 'Hide without text']
	},
	selExpandThr: [
		['5 постов', '15 постов', '30 постов', '50 постов', '100 постов'],
		['5 posts', '15 posts', '30 posts', '50 posts', '100 posts']
	],
	selAjaxPages: [
		['1 страница', '2 страницы', '3 страницы', '4 страницы', '5 страниц'],
		['1 page', '2 pages', '3 pages', '4 pages', '5 pages']
	],
	selSaveThr: [
		['Скачать весь тред', 'Скачать картинки'],
		['Download thread', 'Download images']
	],
	selAudioNotif: [
		['Каждые 30 сек.', 'Каждую минуту', 'Каждые 2 мин.', 'Каждые 5 мин.'],
		['Every 30 sec.', 'Every minute', 'Every 2 min.', 'Every 5 min.']
	],

	hotKeyEdit: [[
		'%l%i24 – предыдущая страница/картинка%/l',
		'%l%i217 – следующая страница/картинка%/l',
		'%l%i23 – скрыть текущий пост/тред%/l',
		'%l%i33 – раскрыть текущий тред%/l',
		'%l%i22 – быстрый ответ%/l',
		'%l%i25t – отправить пост%/l',
		'%l%i21 – тред (на доске)/пост (в треде) ниже%/l',
		'%l%i20 – тред (на доске)/пост (в треде) выше%/l',
		'%l%i31 – пост (на доске) ниже%/l',
		'%l%i30 – пост (на доске) выше%/l',
		'%l%i32 – открыть тред%/l',
		'%l%i210 – открыть/закрыть настройки%/l',
		'%l%i26 – открыть/закрыть избранное%/l',
		'%l%i27 – открыть/закрыть скрытые посты%/l',
		'%l%i28 – открыть/закрыть панель%/l',
		'%l%i29 – включить/выключить маскировку картинок%/l',
		'%l%i40 – обновить тред%/l',
		'%l%i211 – раскрыть картинку в текущем посте%/l',
		'%l%i212t – жирный%/l',
		'%l%i213t – курсив%/l',
		'%l%i214t – зачеркнутый%/l',
		'%l%i215t – спойлер%/l',
		'%l%i216t – код%/l'], [
		'%l%i24 – previous page/image%/l',
		'%l%i217 – next page/image%/l',
		'%l%i23 – hide current post/thread%/l',
		'%l%i33 – expand current thread%/l',
		'%l%i22 – quick reply%/l',
		'%l%i25t – send post%/l',
		'%l%i21 – thread (on board)/post (in thread) below%/l',
		'%l%i20 – thread (on board)/post (in thread) above%/l',
		'%l%i31 – on board post below%/l',
		'%l%i30 – on board post above%/l',
		'%l%i32 – open thread%/l',
		'%l%i210 – open/close Settings%/l',
		'%l%i26 – open/close Favorites%/l',
		'%l%i27 – open/close Hidden Posts Table%/l',
		'%l%i28 – open/close the main panel%/l',
		'%l%i29 – turn on/off masking images%/l',
		'%l%i40 – update thread%/l',
		'%l%i211 – expand current post\'s images%/l',
		'%l%i212t – bold%/l',
		'%l%i213t – italic%/l',
		'%l%i214t – strike%/l',
		'%l%i215t – spoiler%/l',
		'%l%i216t – code%/l'
	]],

	month: [
		['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
		['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	],
	fullMonth: [
		['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
		['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	],
	week: [
		['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт'],
		['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	],

	editor: {
		cfg:        ['Редактирование настроек:', 'Edit settings:'],
		hidden:     ['Редактирование скрытых тредов:', 'Edit hidden threads:'],
		favor:      ['Редактирование избранного:', 'Edit favorites:'],
		css:        ['Редактирование CSS', 'Edit CSS']
	},

	newPost: [
		[' новый пост', ' новых поста', ' новых постов', '. Последний:'],
		[' new post', ' new posts', ' new posts', '. Latest: ']
	],

	add:            ['Добавить', 'Add'],
	apply:          ['Применить', 'Apply'],
	clear:          ['Очистить', 'Clear'],
	refresh:        ['Обновить', 'Refresh'],
	load:           ['Загрузить', 'Load'],
	save:           ['Сохранить', 'Save'],
	edit:           ['Правка', 'Edit'],
	reset:          ['Сброс', 'Reset'],
	remove:         ['Удалить', 'Remove'],
	info:           ['Инфо', 'Info'],
	undo:           ['Отмена', 'Undo'],
	change:         ['Сменить', 'Change'],
	reply:          ['Ответ', 'Reply'],
	loading:        ['Загрузка...', 'Loading...'],
	checking:       ['Проверка...', 'Checking...'],
	deleting:       ['Удаление...', 'Deleting...'],
	error:          ['Ошибка', 'Error'],
	noConnect:      ['Ошибка подключения', 'Connection failed'],
	thrNotFound:    ['Тред недоступен (№', 'Thread is unavailable (№'],
	succDeleted:    ['Успешно удалено!', 'Succesfully deleted!'],
	errDelete:      ['Не могу удалить:\n', 'Can\'t delete:\n'],
	cTimeError:     ['Неправильные настройки времени', 'Invalid time settings'],
	noGlobalCfg:    ['Глобальные настройки не найдены', 'Global config not found'],
	postNotFound:   ['Пост не найден', 'Post not found'],
	dontShow:       ['Скрыть: ', 'Hide: '],
	checkNow:       ['Проверить сейчас', 'Check now'],
	updAvail:       ['Доступно обновление!', 'Update available!'],
	haveLatest:     ['У вас стоит самая последняя версия!', 'You have latest version!'],
	storage:        ['Хранение: ', 'Storage: '],
	thrViewed:      ['Тредов просмотрено: ', 'Threads viewed: '],
	thrCreated:     ['Тредов создано: ', 'Threads created: '],
	thrHidden:      ['Тредов скрыто: ', 'Threads hidden: '],
	postsSent:      ['Постов отправлено: ', 'Posts sent: '],
	total:          ['Всего: ', 'Total: '],
	debug:          ['Отладка', 'Debug'],
	infoDebug:      ['Информация для отладки', 'Information for debugging'],
	loadGlobal:     ['Загрузить глобальные настройки', 'Load global settings'],
	saveGlobal:     ['Сохранить настройки как глобальные', 'Save settings as global'],
	editInTxt:      ['Правка в текстовом формате', 'Edit in text format'],
	resetCfg:       ['Сбросить в настройки по умолчанию', 'Reset settings to defaults'],
	conReset: [
		'Данное действие удалит все ваши настройки и закладки. Продолжить?',
		'This will delete all your preferences and favourites. Continue?'
	],
	clrSelected:    ['Удалить выделенные записи', 'Remove selected notes'],
	saveChanges:    ['Сохранить внесенные изменения', 'Save your changes'],
	infoCount:      ['Обновить счетчики постов', 'Refresh posts counters'],
	infoPage:       ['Проверить актуальность тредов (до 5 страницы)', 'Check for threads actuality (up to 5 page)'],
	clrDeleted:     ['Очистить недоступные (404) треды', 'Clear inaccessible (404) threads'],
	oldPosts:       ['Постов при последнем посещении', 'Posts at the last visit'],
	newPosts:       ['Количество новых постов', 'Number of new posts'],
	thrPage:        ['Тред на @странице', 'Thread on @page'],
	findThrd:       ['Найти/Загрузить тред', 'Find/Load thread'],
	hiddenPosts:    ['Скрытые посты на странице', 'Hidden posts on the page'],
	hiddenThrds:    ['Скрытые треды', 'Hidden threads'],
	noHidPosts:     ['На этой странице нет скрытых постов...', 'No hidden posts on this page...'],
	noHidThrds:     ['Нет скрытых тредов...', 'No hidden threads...'],
	expandAll:      ['Раскрыть все', 'Expand all'],
	invalidData:    ['Некорректный формат данных', 'Incorrect data format'],
	favThrds:       ['Избранные треды:', 'Favorite threads:'],
	noFavThrds:     ['Нет избранных тредов...', 'Favorites is empty...'],
	noVideoLinks:   ['Нет ссылок на видео...', 'No video links...'],
	hideLnkList:    ['Скрыть/Показать список ссылок', 'Hide/Unhide list of links'],
	prevVideo:      ['Предыдущее видео', 'Previous video'],
	nextVideo:      ['Следующее видео', 'Next video'],
	toggleQReply:   ['Поместить под пост / Открепить', 'Move under post / Unattach'],
	closeQReply:    ['Закрыть форму', 'Close form'],
	replies:        ['Ответы:', 'Replies:'],
	postsOmitted:   ['Пропущено ответов: ', 'Posts omitted: '],
	collapseThrd:   ['Свернуть тред', 'Collapse thread'],
	deleted:        ['удалён', 'deleted'],
	getNewPosts:    ['Получить новые посты', 'Get new posts'],
	page:           ['Страница', 'Page'],
	hiddenThrd:     ['Скрытый тред:', 'Hidden thread:'],
	makeThrd:       ['Создать тред', 'Create thread'],
	makeReply:      ['Ответить', 'Make reply'],
	hideForm:       ['Скрыть форму', 'Hide form'],
	search:         ['Искать в ', 'Search in '],
	wait:           ['Ждите', 'Wait'],
	noFile:         ['Нет файла', 'No file'],
	clickToAdd:     ['Выберите, либо перетащите файл', 'Select or drag and drop file'],
	removeFile:     ['Удалить файл', 'Remove file'],
	helpAddFile:    ['Встроить .ogg, .rar, .zip или .7z в картинку', 'Pack .ogg, .rar, .zip or .7z into image'],
	downloadFile:   ['Скачать содержащийся в картинке файл', 'Download existing file from image'],
	fileCorrupt:    ['Файл повреждён: ', 'File is corrupted: '],
	subjHasTrip:    ['Поле "Тема" содержит трипкод', '"Subject" field contains a tripcode'],
	loadImage:      ['Загружаются картинки: ', 'Loading images: '],
	loadFile:       ['Загружаются файлы: ', 'Loading files: '],
	cantLoad:       ['Не могу загрузить ', 'Can\'t load '],
	willSavePview:  ['Будет сохранено превью', 'Thumbnail will be saved'],
	loadErrors:     ['Во время загрузки произошли ошибки:', 'An error occurred during the loading:'],
	errCorruptData: ['Ошибка: сервер отправил повреждённые данные', 'Error: server sent corrupted data'],
	expImgInline:   ['[Click] открыть в посте, [Ctrl+Click] в центре', '[Click] expand in post, [Ctrl+Click] by center'],
	expImgFull:     ['[Click] открыть в центре, [Ctrl+Click] в посте', '[Click] expand by center, [Ctrl+Click] in post'],
	nextImg:        ['Следующая картинка', 'Next image'],
	prevImg:        ['Предыдущая картинка', 'Previous image'],
	togglePost:     ['Скрыть/Раскрыть пост', 'Hide/Unhide post'],
	replyToPost:    ['Ответить на пост', 'Reply to post'],
	expandThrd:     ['Раскрыть весь тред', 'Expand all thread'],
	addFav:         ['Добавить тред в Избранное', 'Add thread to Favorites'],
	delFav:         ['Убрать тред из Избранного', 'Remove thread from Favorites'],
	attachPview:    ['Закрепить превью', 'Attach preview'],
	author:         ['автор: ', 'author: '],
	views:          ['просмотров: ', 'views: '],
	published:      ['опубликовано: ', 'published: '],

	seSyntaxErr:    ['синтаксическая ошибка в аргументе спелла: %s', 'syntax error in argument of spell: %s'],
	seUnknown:      ['неизвестный спелл: %s', 'unknown spell: %s'],
	seMissOp:       ['пропущен оператор', 'missing operator'],
	seMissArg:      ['пропущен аргумент спелла: %s', 'missing argument of spell: %s'],
	seMissSpell:    ['пропущен спелл', 'missing spell'],
	seErrRegex:     ['синтаксическая ошибка в регулярном выражении: %s', 'syntax error in regular expression: %s'],
	seUnexpChar:    ['неожиданный символ: %s', 'unexpected character: %s'],
	seMissClBkt:    ['пропущена закрывающаяся скобка', 'missing ) in parenthetical'],
	seRepsInParens: ['спелл $s не должен располагаться в скобках', 'spell %s shouldn\'t be in parens'],
	seOpInReps:     [
		'недопустимо использовать оператор %s со спеллами #rep и #outrep',
		'don\'t use operator %s with spells #rep & #outrep'
	],
	seRow:          [' (строка ', ' (row '],
	seCol:          [', столбец ', ', column ']
},

doc = window.document, aProto = Array.prototype, locStorage, sesStorage,
Cfg, comCfg, hThr, pByNum, sVis, bUVis, needScroll,
aib, nav, brd, TNum, pageNum, updater, hKeys, firstThr, lastThr, visPosts = 2, dTime,
YouTube, WebmParser, Logger,
pr, dForm, dummy, spells,
Images_ = {preloading: false, afterpreload: null, progressId: null, canvas: null},
ajaxInterval, lang, quotetxt = '', liteMode, localRun, isExpImg, isPreImg, chromeCssUpd,
$each = Function.prototype.call.bind(aProto.forEach),
emptyFn = function () {};


// UTILS
// ===========================================================================================================

function $Q(path, root) {
	return root.querySelectorAll(path);
}

function $q(path, root) {
	return root.querySelector(path);
}

function $C(id, root) {
	return root.getElementsByClassName(id);
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

function $parent(el, tagName) {
	do {
		el = el.parentElement;
	} while (el && el.tagName !== tagName);
	return el;
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
	var key, el = doc.createElement(tag);
	if (attr) {
		for (key in attr) {
			if (key === 'text') {
				el.textContent = attr[key];
			} else if (key === 'value') {
				el.value = attr[key];
			} else if (attr.hasOwnProperty(key)) {
				el.setAttribute(key, attr[key]);
			}
		}
	}
	if (events) {
		for (key in events) {
			if (events.hasOwnProperty(key)) {
				el.addEventListener(key, events[key], false);
			}
		}
	}
	return el;
}

function $New(tag, attr, nodes) {
	var el = $new(tag, attr, null);
	for (var i = 0, len = nodes.length; i < len; i++) {
		if (nodes[i]) {
			el.appendChild(nodes[i]);
		}
	}
	return el;
}

function $txt(el) {
	return doc.createTextNode(el);
}

function $btn(val, ttl, Fn) {
	return $new('input', {'type': 'button', 'value': val, 'title': ttl}, {'click': Fn});
}

function $script(text) {
	$del(doc.head.appendChild($new('script', {'type': 'text/javascript', 'text': text}, null)));
}

function $css(text) {
	return doc.head.appendChild($new('style', {'type': 'text/css', 'text': text}, null));
}

function $if(cond, el) {
	return cond ? el : null;
}

function $disp(el) {
	el.style.display = el.style.display === 'none' ? '' : 'none';
}

function $del(el) {
	if (el) {
		el.parentNode.removeChild(el);
	}
}

function $DOM(html) {
	var myDoc = doc.implementation.createHTMLDocument('');
	myDoc.documentElement.innerHTML = html;
	return myDoc;
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
	return (nav.Presto ? doc.getSelection() : window.getSelection()).toString();
}

function $isEmpty(obj) {
	for (var i in obj) {
		if (obj.hasOwnProperty(i)) {
			return false;
		}
	}
	return true;
}

Logger = new function () {
	var instance, oldTime, initTime, timeLog;
	function LoggerSingleton() {
		if (instance) {
			return instance;
		}
		instance = this;
	}
	LoggerSingleton.prototype = {
		finish: function () {
			timeLog.push(Lng.total[lang] + (Date.now() - initTime) + 'ms');
		},
		get: function () {
			return timeLog;
		},
		init: function () {
			oldTime = initTime = Date.now();
			timeLog = [];
		},
		log: function realLog(text) {
			var newTime = Date.now(),
				time = newTime - oldTime;
			if (time > 1) {
				timeLog.push(text + ': ' + time + 'ms');
				oldTime = newTime;
			}
		}
	};
	return LoggerSingleton;
};

function $xhr(obj) {
	var h, xhr = new XMLHttpRequest();
	if (obj.onreadystatechange) {
		xhr.onreadystatechange = obj.onreadystatechange.bind(window, xhr);
	}
	if (obj.onload) {
		xhr.onload = obj.onload.bind(window, xhr);
	}
	xhr.open(obj.method, obj.url, true);
	if (obj.responseType) {
		xhr.responseType = obj.responseType;
	}
	for (h in obj.headers) {
		xhr.setRequestHeader(h, obj.headers[h]);
	}
	xhr.send(obj.data || null);
	return xhr;
}

function $queue(maxNum, Fn, endFn) {
	this.array = [];
	this.length = this.index = this.running = 0;
	this.num = 1;
	this.fn = Fn;
	this.endFn = endFn;
	this.max = maxNum;
	this.freeSlots = [];
	while (maxNum--) {
		this.freeSlots.push(maxNum);
	}
	this.completed = this.paused = false;
}
$queue.prototype = {
	run: function (data) {
		if (this.paused || this.running === this.max) {
			this.array.push(data);
			this.length++;
		} else {
			this.fn(this.freeSlots.pop(), this.num++, data);
			this.running++;
		}
	},
	end: function (qIdx) {
		if (!this.paused && this.index < this.length) {
			this.fn(qIdx, this.num++, this.array[this.index++]);
			return;
		}
		this.running--;
		this.freeSlots.push(qIdx);
		if (!this.paused && this.completed && this.running === 0) {
			this.endFn();
		}
	},
	complete: function () {
		if (this.index >= this.length && this.running === 0) {
			this.endFn();
		} else {
			this.completed = true;
		}
	},
	pause: function () {
		this.paused = true;
	},
	'continue': function () {
		this.paused = false;
		if (this.index >= this.length) {
			if (this.completed) {
				this.endFn();
			}
			return;
		}
		while (this.index < this.length && this.running !== this.max) {
			this.fn(this.freeSlots.pop(), this.num++, this.array[this.index++]);
			this.running++;
		}
	}
};

function $tar() {
	this._data = [];
}
$tar.prototype = {
	addFile: function (filepath, input) {
		var i, checksum, nameLen, fileSize = input.length,
			header = new Uint8Array(512);
		for (i = 0, nameLen = Math.min(filepath.length, 100); i < nameLen; ++i) {
			header[i] = filepath.charCodeAt(i) & 0xFF;
		}
		// fileMode
		this._padSet(header, 100, '100777', 8);
		// uid
		this._padSet(header, 108, '0', 8);
		// gid
		this._padSet(header, 116, '0', 8);
		// fileSize
		this._padSet(header, 124, fileSize.toString(8), 13);
		// mtime
		this._padSet(header, 136, Math.floor(Date.now() / 1000).toString(8), 12);
		// checksum
		this._padSet(header, 148, '        ', 8);
		// type ('0')
		header[156] = 0x30;
		for (i = checksum = 0; i < 157; i++) {
			checksum += header[i];
		}
		// checksum
		this._padSet(header, 148, checksum.toString(8), 8);
		this._data.push(header);
		this._data.push(input);
		if ((i = Math.ceil(fileSize / 512) * 512 - fileSize) !== 0) {
			this._data.push(new Uint8Array(i));
		}
	},
	addString: function (filepath, str) {
		var i, len, data, sDat = unescape(encodeURIComponent(str));
		for (i = 0, len = sDat.length, data = new Uint8Array(len); i < len; ++i) {
			data[i] = sDat.charCodeAt(i) & 0xFF;
		}
		this.addFile(filepath, data);
	},
	get: function () {
		this._data.push(new Uint8Array(1024));
		return new Blob(this._data, {'type': 'application/x-tar'});
	},

	_padSet: function (data, offset, num, len) {
		var i = 0, nLen = num.length;
		len -= 2;
		while (nLen < len) {
			data[offset++] = 0x20; // ' '
			len--;
		}
		while (i < nLen) {
			data[offset++] = num.charCodeAt(i++);
		}
		data[offset] = 0x20; // ' '
	}
};

function $workers(source, count) {
	var i, wrk, wUrl;
	if (nav.Firefox) {
		wUrl = 'data:text/javascript,' + source;
		wrk = unsafeWindow.Worker;
	} else {
		wUrl = window.URL.createObjectURL(new Blob([source], {'type': 'text/javascript'}));
		this.url = wUrl;
		wrk = Worker;
	}
	for (i = 0; i < count; ++i) {
		this[i] = new wrk(wUrl);
	}
}
$workers.prototype = {
	url: null,
	clear: function () {
		if (this.url !== null) {
			window.URL.revokeObjectURL(this.url);
		}
	}
};

function regQuote(str) {
	return (str + '').replace(/([.?*+^$[\]\\(){}|\-])/g, '\\$1');
}

function fixBrd(b) {
	return '/' + b + (b ? '/' : '');
}

function getAbsLink(url) {
	return url[1] === '/' ? aib.prot + url :
		url[0] === '/' ? aib.prot + '//' + aib.host + url : url;
}

function getErrorMessage(eCode, eMsg) {
	return eCode === 0 ? eMsg || Lng.noConnect[lang] : 'HTTP [' + eCode + '] ' + eMsg;
}

function getPrettyErrorMessage(e) {
	return e.stack ? (nav.WebKit ? e.stack :
			e.name + ': ' + e.message + '\n' +
			(nav.Firefox ? e.stack.replace(/^([^@]*).*\/(.+)$/gm, function (str, fName, line) {
				return '    at ' + (fName ? fName + ' (' + line + ')' : line);
			}) : e.stack)
		) : e.name + ': ' + e.message;
}

function toRegExp(str, noG) {
	var l = str.lastIndexOf('/'),
		flags = str.substr(l + 1);
	return new RegExp(str.substr(1, l - 1), noG ? flags.replace('g', '') : flags);
}

function setImageSize(size, idx, nVal) {
	size[idx] = nVal;
	if (idx === 0) {
		size[1] = nVal / size[2];
	} else {
		size[0] = nVal * size[2];
	}
}

function resizeImage(size, minSize, maxSize) {
	var idx = size[2] > 1 ? 1 : 0;
	if (+size[idx] < +minSize) {
		setImageSize(size, idx, minSize);
	}
	if (maxSize) {
		idx = size[2] > maxSize[2] ? 0 : 1;
		if (+size[idx] > +maxSize[idx]) {
			setImageSize(size, idx, +maxSize[idx]);
		}
	}
	return size;
}


// STORAGE
// ===========================================================================================================

function getStored(id, Fn) {
	if (nav.isGM) {
		Fn(GM_getValue(id));
	} else if (nav.isChromeStorage) {
		chrome.storage.local.get(id, function (obj) {
			if (Object.keys(obj).length) {
				// console.log('Read local ' + id);
				Fn(obj[id]);
			} else {
				chrome.storage.sync.get(id, function (obj) {
					// console.log('Read sync ' + id);
					Fn(obj[id]);
				});
			}
		});
	} else if (nav.isScriptStorage) {
		Fn(scriptStorage.getItem(id));
	} else {
		Fn(locStorage.getItem(id));
	}
}

function setStored(id, value) {
	if (nav.isGM) {
		GM_setValue(id, value);
	} else if (nav.isChromeStorage) {
		var obj = {};
		obj[id] = value;
		if (value.toString().length < 4095) {
			chrome.storage.sync.set(obj, emptyFn);
			chrome.storage.local.remove(id, emptyFn);
		} else {
			chrome.storage.local.set(obj, emptyFn);
			chrome.storage.sync.remove(id, emptyFn);
		}
	} else if (nav.isScriptStorage) {
		scriptStorage.setItem(id, value);
	} else {
		locStorage.setItem(id, value);
	}
}

function delStored(id) {
	if (nav.isGM) {
		GM_deleteValue(id);
	} else if (nav.isChromeStorage) {
		chrome.storage.sync.remove(id, emptyFn);
	} else if (nav.isScriptStorage) {
		scriptStorage.removeItem(id);
	} else {
		locStorage.removeItem(id);
	}
}

function getStoredObj(id, Fn) {
	getStored(id, function (Fn, val) {
		var data;
		try {
			data = JSON.parse(val || '{}');
		} finally {
			Fn(data || {});
		}
	}.bind(null, Fn));
}

function saveComCfg(dm, obj) {
	getStoredObj('DESU_Config', function (dm, obj, val) {
		comCfg = val;
		if (obj) {
			comCfg[dm] = obj;
		} else {
			delete comCfg[dm];
		}
		setStored('DESU_Config', JSON.stringify(comCfg) || '');
	}.bind(null, dm, obj));
}

function saveCfg(id, val) {
	if (Cfg[id] !== val) {
		Cfg[id] = val;
		saveComCfg(aib.dm, Cfg);
	}
}

function Config(obj) {
	for (var i in obj) {
		this[i] = obj[i];
	}
}
Config.prototype = defaultCfg;

function readCfg(Fn) {
	getStoredObj('DESU_Config', function (Fn, val) {
		var obj;
		comCfg = val;
		if (!(aib.dm in comCfg) || $isEmpty(obj = comCfg[aib.dm])) {
			if (nav.isChromeStorage && (obj = locStorage.getItem('DESU_Config'))) {
				obj = JSON.parse(obj)[aib.dm];
				locStorage.removeItem('DESU_Config');
			} else {
				obj = nav.isGlobal ? comCfg.global || {} : {};
			}
			obj.captchaLang = aib.ru ? 2 : 1;
			obj.correctTime = 0;
		}
		Cfg = new Config(obj);
		if (!Cfg.timeOffset) {
			Cfg.timeOffset = '+0';
		}
		if (!Cfg.timePattern) {
			Cfg.timePattern = aib.timePattern;
		}
		if ((nav.Opera11 || aib.fch || aib.tiny) && Cfg.ajaxReply === 2) {
			Cfg.ajaxReply = 1;
		}
		if (aib.tiny) {
			Cfg.fileThumb = 0;
		}
		if (!('Notification' in window)) {
			Cfg.desktNotif = 0;
		}
		if (nav.Presto) {
			if (nav.Opera11) {
				if (!nav.isGM) {
					Cfg.YTubeTitles = 0;
				}
				Cfg.animation = 0;
			}
			if (Cfg.YTubeType === 2) {
				Cfg.YTubeType = 1;
			}
			Cfg.preLoadImgs = 0;
			Cfg.findImgFile = 0;
			if (!nav.isGM) {
				Cfg.updScript = 0;
			}
			Cfg.fileThumb = 0;
		}
		if (nav.isChromeStorage) {
			Cfg.updScript = 0;
		}
		if (Cfg.updThrDelay < 10) {
			Cfg.updThrDelay = 10;
		}
		if (!Cfg.saveSage) {
			Cfg.sageReply = 0;
		}
		if (!Cfg.passwValue) {
			Cfg.passwValue = Math.round(Math.random() * 1e15).toString(32);
		}
		if (!Cfg.stats) {
			Cfg.stats = {'view': 0, 'op': 0, 'reply': 0};
		}
		if (TNum) {
			Cfg.stats.view++;
		}
		if (aib.dobr) {
			aib.hDTFix = new dateTime(
				'yyyy-nn-dd-hh-ii-ss',
				'_d _M _Y (_w) _h:_i ',
				Cfg.timeOffset || 0,
				Cfg.correctTime ? lang : 1,
				null
			);
		}
		if (aib.synch) {
			Cfg.timePattern = 'w+dd+m+yyyy+hh+ii+ss';
			Cfg.timeOffset = 4;
			Cfg.correctTime = 1;
		}
		saveComCfg(aib.dm, Cfg);
		lang = Cfg.language;
		if (Cfg.correctTime) {
			dTime = new dateTime(Cfg.timePattern, Cfg.timeRPattern, Cfg.timeOffset, lang, function (rp) {
				saveCfg('timeRPattern', rp);
			});
		}
		Fn();
	}.bind(null, Fn));
}

function toggleCfg(id) {
	saveCfg(id, +!Cfg[id]);
}

function readPosts() {
	var data, str = TNum ? sesStorage['de-hidden-' + brd + TNum] : null;
	if (typeof str === 'string') {
		data = str.split(',');
		if (data.length === 4 && +data[0] === (Cfg.hideBySpell ? spells.hash : 0) &&
			(data[1] in pByNum) && pByNum[data[1]].count === +data[2])
		{
			sVis = data[3].split('');
			return;
		}
	}
	sVis = [];
}

function readUserPosts() {
	getStoredObj('DESU_Posts_' + aib.dm, function (val) {
		bUVis = val;
		getStoredObj('DESU_Threads_' + aib.dm, function (val) {
			hThr = val;
			if (nav.isChromeStorage && (val = locStorage.getItem('DESU_Posts_' + aib.dm))) {
				bUVis = JSON.parse(val);
				val = locStorage.getItem('DESU_Threads_' + aib.dm);
				hThr = JSON.parse(val);
				locStorage.removeItem('DESU_Posts_' + aib.dm);
				locStorage.removeItem('DESU_Threads_' + aib.dm);
			}
			var uVis, vis, num, post, date = Date.now(),
				update = false;
			if (brd in bUVis) {
				uVis = bUVis[brd];
			} else {
				uVis = bUVis[brd] = {};
			}
			if (!(brd in hThr)) {
				hThr[brd] = {};
			}
			if (!firstThr) {
				return;
			}
			for (post = firstThr.op; post; post = post.next) {
				num = post.num;
				if (num in uVis) {
					if (post.isOp) {
						uVis[num][0] = +!(num in hThr[brd]);
					}
					if (uVis[num][0] === 0) {
						post.setUserVisib(true, date, false);
					} else {
						uVis[num][1] = date;
						post.btns.firstChild.className = 'de-btn-hide-user';
						post.userToggled = true;
					}
				} else {
					vis = sVis[post.count];
					if (post.isOp) {
						if (num in hThr[brd]) {
							vis = '0';
						} else if (vis === '0') {
							vis = null;
						}
					}
					if (vis === '0') {
						if (!post.hidden) {
							post.setVisib(true);
							post.hideRefs();
						}
						post.spellHidden = true;
					} else if (vis !== '1') {
						spells.check(post);
					}
				}
			}
			spells.end(savePosts);
			if (update) {
				bUVis[brd] = uVis;
				saveUserPosts(false);
			}
		});
	});
}

function savePosts() {
	if (TNum) {
		var lPost = firstThr.lastNotDeleted;
		sesStorage['de-hidden-' + brd + TNum] = (Cfg.hideBySpell ? spells.hash : '0') +
			',' + lPost.num + ',' + lPost.count + ',' + sVis.join('');
	}
	saveHiddenThreads(false);
	toggleContent('hid', true);
}

function saveUserPosts(clear) {
	var minDate, b, vis, key, str = JSON.stringify(bUVis);
	if (clear && str.length > 1e6) {
		minDate = Date.now() - 5 * 24 * 3600 * 1000;
		for (b in bUVis) {
			if (bUVis.hasOwnProperty(b)) {
				vis = bUVis[b];
				for (key in vis) {
					if (vis.hasOwnProperty(key) && vis[key][1] < minDate) {
						delete vis[key];
					}
				}
			}
		}
		str = JSON.stringify(bUVis);
	}
	setStored('DESU_Posts_' + aib.dm, str);
	toggleContent('hid', true);
}

function saveHiddenThreads(updContent) {
	setStored('DESU_Threads_' + aib.dm, JSON.stringify(hThr));
	if (updContent) {
		toggleContent('hid', true);
	}
}

function readFavoritesPosts() {
	getStoredObj('DESU_Favorites', function (fav) {
		var thr, temp, num, update = false;
		if (nav.isChromeStorage && (temp = locStorage.getItem('DESU_Favorites'))) {
			temp = JSON.parse(temp);
			locStorage.removeItem('DESU_Favorites');
			if ($isEmpty(temp)) {
				return;
			}
			temp = temp[aib.host];
			fav[aib.host] = temp;
			temp = temp[brd];
		} else {
			if (!(aib.host in fav)) {
				return;
			}
			temp = fav[aib.host];
			if (!(brd in temp)) {
				return;
			}
			temp = temp[brd];
		}
		for (thr = firstThr; thr; thr = thr.next) {
			if ((num = thr.num) in temp) {
				thr.setFavBtn(true);
				if (TNum) {
					temp[num].cnt = thr.pcount;
					temp[num]['new'] = 0;
				} else {
					temp[num]['new'] = thr.pcount - temp[num].cnt;
				}
				update = true;
			}
		}
		if (update) {
			saveFavorites(fav);
		}
	});
}

function saveFavorites(fav) {
	setStored('DESU_Favorites', JSON.stringify(fav));
	toggleContent('fav', true, fav);
}

function removeFavoriteEntry(fav, h, b, num, clearPage) {
	function _isEmpty(f) {
		for (var i in f) {
			if (i !== 'url' && f.hasOwnProperty(i)) {
				return false;
			}
		}
		return true;
	}
	if ((h in fav) && (b in fav[h]) && (num in fav[h][b])) {
		delete fav[h][b][num];
		if (_isEmpty(fav[h][b])) {
			delete fav[h][b];
			if ($isEmpty(fav[h])) {
				delete fav[h];
			}
		}
	}
	if (clearPage && h === aib.host && b === brd && (num in pByNum)) {
		pByNum[num].thr.setFavBtn(false);
	}
}

function readViewedPosts() {
	if (Cfg.markViewed) {
		var data = sesStorage['de-viewed'];
		if (data) {
			data.split(',').forEach(function (pNum) {
				var post = pByNum[pNum];
				if (post) {
					post.el.classList.add('de-viewed');
					post.viewed = true;
				}
			});
		}
	}
}


// PANEL
// ===========================================================================================================

function pButton(id, href, hasHotkey) {
	return '<li><a id="de-btn-' + id + '" class="de-abtn" ' + (hasHotkey ? 'de-' : '') + 'title="' +
		Lng.panelBtn[id][lang] +'" href="' + href + '"></a></li>';
}

function addPanel() {
	var panel, evtObject, imgLen = $Q(aib.qThumbImages, dForm).length;
	(pr && pr.pArea[0] || dForm).insertAdjacentHTML('beforebegin',
		'<div id="de-main-" lang="' + getThemeLang() + '">' +
			'<div id="de-panel">' +
				'<span id="de-btn-logo" title="' + Lng.panelBtn.attach[lang] + '"></span>' +
				'<ul id="de-panel-btns"' + (Cfg.expandPanel ? '>' : ' style="display: none">') +
				(Cfg.disabled ? pButton('enable', '#', false) :
					pButton('settings', '#', true) +
					pButton('hidden', '#', true) +
					pButton('favor', '#', true) +
					(!Cfg.addYouTube ? '' : pButton('video', '#', false)) +
					(aib.arch || localRun ? '' :
						pButton('refresh', '#', false) +
						(!TNum && (pageNum === aib.firstPage) ? '' :
							pButton('goback', aib.getPageUrl(brd, pageNum - 1), true)) +
						(TNum || pageNum === aib.lastPage ? '' :
							pButton('gonext', aib.getPageUrl(brd, pageNum + 1), true))
					) + pButton('goup', '#', false) +
					pButton('godown', '#', false) +
					(imgLen === 0 ? '' :
						pButton('expimg', '#', false) +
						pButton('maskimg', '#', true) +
						(nav.Presto || localRun ? '' : 
							(Cfg.preLoadImgs ? '' : pButton('preimg', '#', false)) +
							(!TNum && !aib.arch ? '' : pButton('savethr', '#', false)))) +
					(!TNum || localRun ? '' :
						pButton(Cfg.ajaxUpdThr ? 'upd-on' : 'upd-off', '#', false) +
						(nav.Safari ? '' : pButton('audio-off', '#', false))) +
					(!aib.abu && !aib.mak && (!aib.fch || aib.arch) ? '' :
						pButton('catalog', aib.prot + '//' + aib.host + '/' + (aib.mak ?
							'makaba/makaba.fcgi?task=catalog&board=' + brd : brd + '/catalog.html'), false)) +
					pButton('enable', '#', false) +
					(!TNum && !aib.arch ? '' :
						'<span id="de-panel-info" title="' + Lng.panelBtn.counter[lang] + '">' +
						firstThr.pcount + '/' + imgLen + '</span>')
				) +
				'</ul>' +
			'</div><div class="de-content"></div>' +
		(Cfg.disabled ? '' : '<div id="de-alert"></div><hr style="clear: both;">') +
		'</div>'
	);
	panel = $id('de-panel');
	evtObject = {
		attach: false,
		odelay: 0,
		panel: panel,
		handleEvent: function (e) {
			switch (e.type) {
			case 'click':
				switch (e.target.id) {
				case 'de-btn-logo':
					if (Cfg.expandPanel) {
						this.panel.lastChild.style.display = 'none';
						this.attach = false;
					} else {
						this.attach = true;
					}
					toggleCfg('expandPanel');
					return;
				case 'de-btn-settings': this.attach = toggleContent('cfg', false); break;
				case 'de-btn-hidden': this.attach = toggleContent('hid', false); break;
				case 'de-btn-favor': this.attach = toggleContent('fav', false); break;
				case 'de-btn-video': this.attach = toggleContent('vid', false); break;
				case 'de-btn-refresh': window.location.reload(); break;
				case 'de-btn-goup': scrollTo(0, 0); break;
				case 'de-btn-godown': scrollTo(0, doc.body.scrollHeight || doc.body.offsetHeight); break;
				case 'de-btn-expimg':
					isExpImg = !isExpImg;
					$del($c('de-img-center', doc));
					for (var post = firstThr.op; post; post = post.next) {
						post.toggleImages(isExpImg);
					}
					break;
				case 'de-btn-preimg':
					isPreImg = !isPreImg;
					if (!e.ctrlKey) {
						preloadImages(null);
					}
				break;
				case 'de-btn-maskimg':
					toggleCfg('maskImgs');
					updateCSS();
					break;
				case 'de-btn-upd-on':
				case 'de-btn-upd-off':
				case 'de-btn-upd-warn':
					if (updater.enabled) {
						updater.disable();
					} else {
						updater.enable();
					}
					break;
				case 'de-btn-audio-on':
				case 'de-btn-audio-off':
					if (updater.toggleAudio(0)) {
						updater.enable();
						e.target.id = 'de-btn-audio-on';
					} else {
						e.target.id = 'de-btn-audio-off';
					}
					$del($c('de-menu', doc));
					break;
				case 'de-btn-savethr': break;
				case 'de-btn-enable':
					toggleCfg('disabled');
					window.location.reload();
					break;
				default: return;
				}
				$pd(e);
				return;
			case 'mouseover':
				if (!Cfg.expandPanel) {
					clearTimeout(this.odelay);
					this.panel.lastChild.style.display = '';
				}
				switch (e.target.id) {
				case 'de-btn-settings': KeyEditListener.setTitle(e.target, 10); break;
				case 'de-btn-hidden': KeyEditListener.setTitle(e.target, 7); break;
				case 'de-btn-favor': KeyEditListener.setTitle(e.target, 6); break;
				case 'de-btn-goback': KeyEditListener.setTitle(e.target, 4); break;
				case 'de-btn-gonext': KeyEditListener.setTitle(e.target, 17); break;
				case 'de-btn-maskimg': KeyEditListener.setTitle(e.target, 9); break;
				case 'de-btn-refresh':
					if (TNum) {
						return;
					}
				case 'de-btn-savethr':
				case 'de-btn-audio-off': addMenu(e);
				}
				return;
			default: // mouseout
				if (!Cfg.expandPanel && !this.attach) {
					this.odelay = setTimeout(function (obj) {
						obj.panel.lastChild.style.display = 'none';
						obj.attach = false;
					}, 500, this);
				}
				switch (e.target.id) {
				case 'de-btn-refresh':
				case 'de-btn-savethr':
				case 'de-btn-audio-off': removeMenu(e); break;
				}
			}
		}
	};
	panel.addEventListener('click', evtObject, true);
	panel.addEventListener('mouseover', evtObject, false);
	panel.addEventListener('mouseout', evtObject, false);
}

function toggleContent(name, isUpd, data) {
	if (liteMode) {
		return false;
	}
	var remove, el = $c('de-content', doc),
		id = 'de-content-' + name;
	if (!el) {
		return false;
	}
	if (isUpd && el.id !== id) {
		return true;
	}
	remove = !isUpd && el.id === id;
	if (el.hasChildNodes() && Cfg.animation) {
		nav.animEvent(el, function (node) {
			showContent(node, id, name, remove, data);
			id = name = remove = data = null;
		});
		el.className = 'de-content de-cfg-close';
		return !remove;
	} else {
		showContent(el, id, name, remove, data);
		return !remove;
	}
}

function addContentBlock(parent, title) {
	return parent.appendChild($New('div', {'class': 'de-content-block'}, [
		$new('input', {'type': 'checkbox'}, {'click': function () {
			var el, res = this.checked, i = 0, els = $Q('.de-entry > input', this.parentNode);
			for (; el = els[i++];) {
				el.checked = res;
			}
		}}),
		title
	]));
}

function showContent(cont, id, name, remove, data) {
	var tNum, i, b, els, el, post, cln, block, temp, cfgTabId;
	if (name === 'cfg' && !remove && (temp = $q('.de-cfg-tab-back[selected="true"] > .de-cfg-tab', cont))) {
		cfgTabId = temp.getAttribute('info');
	}
	cont.innerHTML = cont.style.backgroundColor = '';
	if (remove) {
		cont.removeAttribute('id');
		return;
	}
	cont.id = id;
	if (name === 'cfg') {
		addSettings(cont, cfgTabId);
	} else if (Cfg.attachPanel) {
		cont.style.backgroundColor = getComputedStyle(doc.body).getPropertyValue('background-color');
	}

	if (name === 'fav') {
		if (data) {
			showFavoriteTable(cont, data);
		} else {
			// TODO: show load message
			getStoredObj('DESU_Favorites', function (fav) {
				showFavoriteTable(this, fav);
			}.bind(cont));
		}
		return;
	}

	if (name === 'hid') {
		for (i = 0, els = $C('de-post-hide', dForm); post = els[i++];) {
			if (post.isOp) {
				continue;
			}
			(cln = post.cloneNode(true)).removeAttribute('id');
			cln.style.display = '';
			if (cln.classList.contains(aib.cRPost)) {
				cln.classList.add('de-cloned-post');
			} else {
				cln.className = aib.cReply + ' de-cloned-post';
			}
			cln.post = Object.create(cln.clone = post.post);
			cln.post.el = cln;
			cln.btn = $q('.de-btn-hide, .de-btn-hide-user', cln);
			cln.btn.parentNode.className = 'de-post-btns';
			cln.btn.onclick = function () { // doesn't work properly. TODO: Fix
				this.hideContent(this.hidden = !this.hidden);
			}.bind(cln);
			(block || (block = cont.appendChild(
				$add('<div class="de-content-block"><b>' + Lng.hiddenPosts[lang] + ':</b></div>')
			))).appendChild($New('div', {'class': 'de-entry'}, [cln]));
		}
		if (block) {
			cont.appendChild($btn(Lng.expandAll[lang], '', function () {
				$each($Q('.de-cloned-post', this.parentNode), function (el) {
					var post = el.post;
					post.hideContent(post.hidden = !post.hidden);
				});
				this.value = this.value === Lng.undo[lang] ? Lng.expandAll[lang] : Lng.undo[lang];
			}));
			cont.appendChild($btn(Lng.save[lang], '', function () {
				$each($Q('.de-cloned-post', this.parentNode), function (date, el) {
					if (!el.post.hidden) {
						el.clone.setUserVisib(false, date, true);
					}
				}.bind(null, Date.now()));
				saveUserPosts(true);
			}));
		} else {
			cont.insertAdjacentHTML('beforeend', '<b>' + Lng.noHidPosts[lang] + '</b>');
		}
		cont.insertAdjacentHTML('beforeend', '<hr><b>' + 
			($isEmpty(hThr) ? Lng.noHidThrds[lang] : Lng.hiddenThrds[lang] + ':') + '</b>');
		for (b in hThr) {
			if (!$isEmpty(hThr[b])) {
				block = addContentBlock(cont, $new('b', {'text': '/' + b}, null));
				for (tNum in hThr[b]) {
					block.insertAdjacentHTML('beforeend', '<div class="de-entry ' + aib.cReply +
						'" info="' + b + ';' + tNum + '"><input type="checkbox"><a href="' +
						aib.getThrdUrl(b, tNum) + '" target="_blank">№' + tNum + '</a> - ' +
						hThr[b][tNum] + '</div>');
				}
			}
		}
		cont.insertAdjacentHTML('beforeend', '<hr>');
		cont.appendChild(addEditButton('hidden', function (Fn) {
			Fn(hThr, true, function (data) {
				hThr = data;
				if (!(brd in hThr)) {
					hThr[brd] = {};
				}
				firstThr.updateHidden(hThr[brd]);
				saveHiddenThreads(true);
				locStorage['__de-threads'] = JSON.stringify(hThr);
				locStorage.removeItem('__de-threads');
			});
		}));
		cont.appendChild($btn(Lng.clear[lang], Lng.clrDeleted[lang], function () {
			$each($Q('.de-entry[info]', this.parentNode), function (el) {
				var arr = el.getAttribute('info').split(';');
				ajaxLoad(aib.getThrdUrl(arr[0], arr[1]), false, null, function (eCode, eMsg, xhr) {
					if (eCode === 404) {
						delete hThr[this[0]][this[1]];
						saveHiddenThreads(true);
					}
				}.bind(arr));
			});
		}));
		cont.appendChild($btn(Lng.remove[lang], Lng.clrSelected[lang], function () {
			$each($Q('.de-entry[info]', this.parentNode), function (date, el) {
				var post, arr = el.getAttribute('info').split(';');
				if ($t('input', el).checked) {
					if (arr[1] in pByNum) {
						pByNum[arr[1]].setUserVisib(false, date, true);
					} else {
						locStorage['__de-post'] = JSON.stringify({
							'brd': arr[0],
							'date': date,
							'isOp': true,
							'num': arr[1],
							'hide': false
						});
						locStorage.removeItem('__de-post');
					}
					delete hThr[arr[0]][arr[1]];
				}
			}.bind(null, Date.now()));
			saveHiddenThreads(true);
		}));
	}

	if (name === 'vid') {
		els = $C('de-video-link', dForm);
		if (els.length) {
			!$id('de-ytube-api') && doc.head.appendChild(
				$new('script', {'id': 'de-ytube-api', 'src': aib.prot + '//www.youtube.com/player_api'}, null));
			cont.insertAdjacentHTML('beforeend', '<div class="de-video-obj"></div><center>' +
				'<a class="de-abtn" id="de-video-btn-prev" href="#" title="' + Lng.prevVideo[lang] +
				'">&#x25C0;</a> <a class="de-abtn" id="de-video-btn-hide" href="#" title="' + Lng.hideLnkList[lang] +
				'">&#x25B2;</a> <a class="de-abtn" id="de-video-btn-next" href="#" title="' + Lng.nextVideo[lang] +
				'">&#x25B6;</a></center><div id="de-video-list"></div>');
			post = {};
			post.ytInfo = null;
			post.ytObj = cont.firstChild;
			post.msg = cont.lastChild;
			post.el = cont;
			post.ytObj.nextSibling.onclick = function (e) {
				$pd(e);
				var node;
				switch (e.target.id) {
				case 'de-video-btn-hide':
					node = this.el.lastChild;
					if (node.style.display === 'none') {
						node.style.display = '';
						e.target.textContent = '\u25B2';
					} else {
						node.style.display = 'none';
						e.target.textContent = '\u25BC';
					}
					return;
				case 'de-video-btn-prev':
					node = this.ytLink.parentNode,
					(node.previousSibling || node.parentNode.lastChild).firstChild.click();
					break;
				case 'de-video-btn-next':
					node = this.ytLink.parentNode,
					(node.nextSibling || node.parentNode.firstChild).firstChild.click();
				}
			}.bind(post);
			post.msg.onclick = function (e) {
				$pd(e);
				var c = e.target.classList;
				if (!c.contains('de-video-link')) {
					return;
				}
				if (c.contains('de-current')) {
					post.ytInfo = null;
				}
				new YouTube().clickLink(this, e.target, 2);
				if (!c.contains('de-ytube')) {
					return;
				}
				this.ytObj.firstChild.id = 'de-ytplayer';
				$script(
					'if ("YT" in window && "Player" in window.YT) {\
						initPlayer();\
					}\
					function onYouTubePlayerAPIReady() {\
						initPlayer();\
					}\
					function initPlayer() {\
						var ytplayer = new YT.Player("de-ytplayer", { events: {\
							"onError": gotoNextVideo,\
							"onReady": function (e) {\
								' + (post.firstCall ? '' : 'e.target.playVideo();') + '\
							},\
							"onStateChange": function (e) {\
								if (e.data === 0) {\
									gotoNextVideo();\
								}\
							}\
						}});\
					}\
					function gotoNextVideo() {\
						document.getElementById("de-video-btn-next").click();\
					}'
				);
				post.firstCall = false;
			}.bind(post);
			temp = new YouTube();
			for (i = 0; el = els[i++];) {
				el = el.cloneNode(true);
				post.msg.insertAdjacentHTML('beforeend', '<div class="de-entry ' + aib.cReply + '"></div>');
				post.msg.lastChild.appendChild(el);
				b = el.classList.contains('de-ytube');
				el.ytInfo = el.href.match(b ? temp.ytReg : temp.vimReg);
				if (i === 1) {
					post.ytLink = el;
					post.firstCall = true;
					el.click();
				} else {
					el.classList.remove('de-current');
				}
			}
		} else {
			cont.insertAdjacentHTML('beforeend', '<b>' + Lng.noVideoLinks[lang] + '</b>');
		}
	}

	if (Cfg.animation) {
		cont.className = 'de-content de-cfg-open';
	}
}

function clearFavoriteTable() {
	var els = $Q('.de-entry[de-removed]', doc),
		len = els.length;
	if (len > 0) {
		getStoredObj('DESU_Favorites', function (fav) {
			for (var el, i = 0; i < len; ++i) {
				el = els[i];
				removeFavoriteEntry(fav, el.getAttribute('de-host'), el.getAttribute('de-board'),
					el.getAttribute('de-num'), true);
			}
			saveFavorites(fav);
		});
	}
}

function showFavoriteTable(cont, data) {
	var h, b, i, block, tNum;
	for (h in data) {
		for (b in data[h]) {
			i = data[h][b];
			block = addContentBlock(cont, i.url ?
				$new('a', {'href': i.url, 'text': h + '/' + b}, null) :
				$new('b', {'text': h + '/' + b}, null));
			if (h === aib.host && b === brd) {
				block.classList.add('de-fav-current');
			}
			for (tNum in data[h][b]) {
				if (tNum === 'url') {
					continue;
				}
				i = data[h][b][tNum];
				if (!i.url.startsWith('http')) {
					i.url = (h === aib.host ? aib.prot + '//' : 'http://') + h + i.url;
				}
				block.insertAdjacentHTML('beforeend', '<div class="de-entry ' + aib.cReply +
					'" de-host="' + h + '" de-board="' + b + '" de-num="' + tNum + '" de-url="' + i.url +
					'"><input type="checkbox"><span class="de-btn-expthr" title="' + Lng.findThrd[lang] +
					'"></span><a href="' + i.url + '">№' + tNum + '</a><span class="de-fav-title"> - ' +
					i.txt + '</span><span class="de-fav-inf-posts">[<span class="de-fav-inf-old" title="' +
					Lng.oldPosts[lang] + '">' + i.cnt + '</span>] <span class="de-fav-inf-new" title="' +
					Lng.newPosts[lang] + '"' + (i['new'] ? '>' : ' style="display: none;">') +
					(i['new'] || 0) + '</span> <span class="de-fav-inf-page" title="' +
					Lng.thrPage[lang] + '"></span></span></div>');
				block.lastChild.firstChild.nextSibling.onclick = loadFavorThread;
			}
		}
	}
	cont.insertAdjacentHTML('afterbegin', '<b>' + (Lng[block ? 'favThrds' : 'noFavThrds'][lang]) + '</b>');
	cont.insertAdjacentHTML('beforeend', '<hr>');
	cont.appendChild(addEditButton('favor', function (Fn) {
		getStoredObj('DESU_Favorites', function (Fn, val) {
			Fn(val, true, saveFavorites);
		}.bind(null, Fn));
	}));
	cont.appendChild($btn(Lng.refresh[lang], Lng.infoCount[lang], function () {
		getStoredObj('DESU_Favorites', function (fav) {
			var i, els, len, update = false;
			var queue = new $queue(4, function (qIdx, num, el) {
				var c, host = el.getAttribute('de-host'),
					b = el.getAttribute('de-board'),
					num = el.getAttribute('de-num'),
					f = fav[host][b][num];
				if (host !== aib.host) {
					queue.end(qIdx);
					return;
				}
				el = $c('de-fav-inf-new', el);
				el.style.display = '';
				el.textContent = '';
				el.className = 'de-wait';
				ajaxLoad(aib.getThrdUrl(b, num), true, function (form, xhr) {
					var cnt = aib.getPosts(form).length + 1 - this.previousElementSibling.textContent;
					this.textContent = cnt;
					this.className = 'de-fav-inf-new';
					if (cnt === 0) {
						this.style.display = 'none';
					} else {
						f['new'] = cnt;
						update = true;
					}
					queue.end(qIdx);
					f = qIdx = null;
				}.bind(el), function (eCode, eMsg, xhr) {
					this.textContent = getErrorMessage(eCode, eMsg);
					this.classList.remove('de-wait');
					queue.end(qIdx);
					qIdx = null;
				}.bind(el));
			}, function () {
				if (update) {
					setStored('DESU_Favorites', JSON.stringify(fav));
				}
				fav = queue = update = null;
			});
			for (i = 0, els = $C('de-entry', doc), len = els.length; i < len; ++i) {
				queue.run(els[i]);
			}
			queue.complete();
		});
	}));
	cont.appendChild($btn(Lng.page[lang], Lng.infoPage[lang], function () {
		var els = $C('de-entry', doc),
			i = 6,
			loaded = 0;
		$alert(Lng.loading[lang], 'load-pages', true);
		while (i--) {
			ajaxLoad(aib.getPageUrl(brd, i), true, function (idx, form, xhr) {
				for (var inf, el, len = this.length, i = 0; i < len; ++i) {
					el = this[i];
					if (el.getAttribute('de-host') === aib.host && el.getAttribute('de-board') === brd) {
						inf = $c('de-fav-inf-page', el);
						if ((new RegExp('(?:№|No.|>)\\s*' + el.getAttribute('de-num') + '\\s*<'))
							.test(form.innerHTML))
						{
							inf.innerHTML = '@' + idx;
						} else if (loaded === 5 && !inf.textContent.contains('@')) {
							inf.innerHTML = '@?';
						}
					}
				}
				if (loaded === 5) {
					closeAlert($id('de-alert-load-pages'));
				}
				loaded++;
			}.bind(els, i), function (eCode, eMsg, xhr) {
				if (loaded === 5) {
					closeAlert($id('de-alert-load-pages'));
				}
				loaded++;
			});
		}
	}));
	cont.appendChild($btn(Lng.clear[lang], Lng.clrDeleted[lang], function () {
		var i, len, els, queue = new $queue(4, function (qIdx, num, el) {
			var node = $c('de-fav-inf-page', el);
			node.classList.add('de-wait');
			ajaxLoad(el.getAttribute('de-url'), false, function () {
				this.classList.remove('de-wait');
				queue.end(qIdx);
				qIdx = null;
			}.bind(node), function (eCode, eMsg, xhr) {
				if (eCode === 404) {
					this.textContent = getErrorMessage(eCode, eMsg);
					this.classList.remove('de-wait');
					el.setAttribute('de-removed', '');
				}
				queue.end(qIdx);
				qIdx = el = null;
			}.bind(node));
		}, function () {
			queue = null;
			clearFavoriteTable();
		});
		for (i = 0, els = $C('de-entry', doc), len = els.length; i < len; ++i) {
			queue.run(els[i]);
		}
		queue.complete();
	}));
	cont.appendChild($btn(Lng.remove[lang], Lng.clrSelected[lang], function () {
		$each($C('de-entry', doc), function (el) {
			if ($t('input', el).checked) {
				el.setAttribute('de-removed', '');
			}
		});
		clearFavoriteTable();
	}));
	if (Cfg.animation) {
		cont.className = 'de-content de-cfg-open';
	}
}


// SETTINGS
// ===========================================================================================================

function fixSettings() {
	function toggleBox(state, arr) {
		var i = arr.length,
			nState = !state;
		while (i--) {
			($q(arr[i], doc) || {}).disabled = nState;
		}
	}
	toggleBox(Cfg.ajaxUpdThr, [
		'input[info="noErrInTitle"]', 'input[info="favIcoBlink"]',
		'input[info="markNewPosts"]', 'input[info="desktNotif"]'
	]);
	toggleBox(Cfg.expandImgs, [
		'input[info="imgNavBtns"]', 'input[info="resizeDPI"]', 'input[info="resizeImgs"]',
		'input[info="minImgSize"]', 'input[info="zoomFactor"]',
		'input[info="webmControl"]', 'input[info="webmVolume"]'
	]);
	toggleBox(Cfg.preLoadImgs, ['input[info="findImgFile"]']);
	toggleBox(Cfg.openImgs, ['input[info="openGIFs"]']);
	toggleBox(Cfg.linksNavig, [
		'input[info="linksOver"]', 'input[info="linksOut"]', 'input[info="markViewed"]',
		'input[info="strikeHidd"]', 'input[info="noNavigHidd"]'
	]);
	toggleBox(Cfg.addYouTube && Cfg.addYouTube !== 4, [
		'select[info="YTubeType"]', 'input[info="YTubeHD"]', 'input[info="addVimeo"]'
	]);
	toggleBox(Cfg.addYouTube, [
		'input[info="YTubeWidth"]', 'input[info="YTubeHeigh"]', 'input[info="YTubeTitles"]'
	]);
	toggleBox(Cfg.ajaxReply, ['input[info="sendErrNotif"]', 'input[info="scrAfterRep"]']);
	toggleBox(Cfg.ajaxReply === 2, [
		'input[info="postSameImg"]', 'input[info="removeEXIF"]', 'input[info="removeFName"]'
	]);
	toggleBox(Cfg.addTextBtns, ['input[info="txtBtnsLoc"]']);
	toggleBox(Cfg.updScript, ['select[info="scrUpdIntrv"]']);
	toggleBox(Cfg.hotKeys, ['input[info="loadPages"]']);
}

function lBox(id, isBlock, Fn) {
	var el = $new('input', {'info': id, 'type': 'checkbox'}, {'click': function () {
		toggleCfg(this.getAttribute('info'));
		fixSettings();
		if (Fn) {
			Fn(this);
		}
	}});
	el.checked = Cfg[id];
	return $New('label', isBlock ? {'class': 'de-block'} : null, [el, $txt(' ' + Lng.cfg[id][lang])]);
}

function inpTxt(id, size, Fn) {
	return $new('input', {'info': id, 'type': 'text', 'size': size, 'value': Cfg[id]}, {
		'keyup': Fn ? Fn : function () {
			saveCfg(this.getAttribute('info'), this.value);
		}
	});
}

function optSel(id, isBlock, Fn) {
	for (var i = 0, x = Lng.cfg[id], len = x.sel[lang].length, el, opt = ''; i < len; i++) {
		opt += '<option value="' + i + '">' + x.sel[lang][i] + '</option>';
	}
	el = $add('<select info="' + id + '">' + opt + '</select>');
	el.addEventListener('change', Fn || function () {
		saveCfg(this.getAttribute('info'), this.selectedIndex);
		fixSettings();
	}, false);
	el.selectedIndex = Cfg[id];
	return $New('label', isBlock ? {'class': 'de-block'} : null, [el, $txt(' ' + x.txt[lang])]);
}

function cfgTab(name) {
	return $New('div', {'class': aib.cReply + ' de-cfg-tab-back', 'selected': false}, [$new('div', {
		'class': 'de-cfg-tab',
		'text': Lng.cfgTab[name][lang],
		'info': name}, {
		'click': function () {
			var el, id, pN = this.parentNode;
			if (pN.getAttribute('selected') === 'true') {
				return;
			}
			if (el = $c('de-cfg-body', doc)) {
				el.className = 'de-cfg-unvis';
				$q('.de-cfg-tab-back[selected="true"]', doc).setAttribute('selected', false);
			}
			pN.setAttribute('selected', true);
			if (!(el = $id('de-cfg-' + (id = this.getAttribute('info'))))) {
				$after($id('de-cfg-bar'), el =
					id === 'filters' ? getCfgFilters() :
					id === 'posts' ? getCfgPosts() :
					id === 'images' ? getCfgImages() :
					id === 'links' ? getCfgLinks() :
					id === 'form' ? getCfgForm() :
					id === 'common' ? getCfgCommon() :
					getCfgInfo()
				);
				if (id === 'filters') {
					updRowMeter.call($id('de-spell-edit'));
				}
			}
			el.className = 'de-cfg-body';
			if (id === 'filters') {
				$id('de-spell-edit').value = spells.list;
			}
			fixSettings();
		}
	})]);
}

function updRowMeter() {
	var str, top = this.scrollTop,
		el = this.parentNode.previousSibling.firstChild,
		num = el.numLines || 1,
		i = 15;
	if (num - i < ((top / 12) | 0 + 1)) {
		str = '';
		while (i--) {
			str += num++ + '<br>';
		}
		el.insertAdjacentHTML('beforeend', str);
		el.numLines = num;
	}
	el.scrollTop = top;
}

function getCfgFilters() {
	return $New('div', {'class': 'de-cfg-unvis', 'id': 'de-cfg-filters'}, [
		lBox('hideBySpell', false, toggleSpells),
		$New('div', {'id': 'de-spell-panel'}, [
			$new('a', {
				'id': 'de-btn-addspell',
				'text': Lng.add[lang],
				'href': '#',
				'class': 'de-abtn'}, {
				'click': $pd,
				'mouseover': addMenu,
				'mouseout': removeMenu
			}),
			$new('a', {'text': Lng.apply[lang], 'href': '#', 'class': 'de-abtn'}, {'click': function (e) {
				$pd(e);
				saveCfg('hideBySpell', 1);
				$q('input[info="hideBySpell"]', doc).checked = true;
				toggleSpells();
			}}),
			$new('a', {'text': Lng.clear[lang], 'href': '#', 'class': 'de-abtn'}, {'click': function (e) {
				$pd(e);
				$id('de-spell-edit').value = '';
				toggleSpells();
			}}),
			$add('<a href="https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/Spells-' +
				(lang ? 'en' : 'ru') + '" class="de-abtn" target="_blank">[?]</a>')
		]),
		$New('div', {'id': 'de-spell-div'}, [
			$add('<div><div id="de-spell-rowmeter"></div></div>'),
			$New('div', null, [$new('textarea', {'id': 'de-spell-edit', 'wrap': 'off'}, {
				'keydown': updRowMeter,
				'scroll': updRowMeter
			})])
		]),
		lBox('sortSpells', true, function () {
			if (Cfg.sortSpells) {
				toggleSpells();
			}
		}),
		lBox('menuHiddBtn', true, null),
		lBox('hideRefPsts', true, null),
		lBox('delHiddPost', true, function () {
			$each($C('de-post-hide', dForm), function (el) {
				var wrap = el.post.wrap,
					hide = !wrap.classList.contains('de-hidden');
				if (hide) {
					wrap.insertAdjacentHTML('beforebegin',
						'<span style="counter-increment: de-cnt 1;"></span>');
				} else {
					$del(wrap.previousSibling);
				}
				wrap.classList.toggle('de-hidden');
			});
			updateCSS();
		})
	]);
}

function getCfgPosts() {
	return $New('div', {'class': 'de-cfg-unvis', 'id': 'de-cfg-posts'}, [
		lBox('ajaxUpdThr', false, TNum ? function () {
			if (Cfg.ajaxUpdThr) {
				updater.enable();
			} else {
				updater.disable();
			}
		} : null),
		$New('label', null, [
			inpTxt('updThrDelay', 2, null),
			$txt(Lng.cfg.updThrDelay[lang])
		]),
		$New('div', {'class': 'de-cfg-depend'}, [
			lBox('noErrInTitle', true, null),
			lBox('favIcoBlink', true, null),
			lBox('markNewPosts', true, function () {
				firstThr.clearPostsMarks();
			}),
			$if('Notification' in window, lBox('desktNotif', true, function () {
				if (Cfg.desktNotif) {
					Notification.requestPermission();
				}
			}))
		]),
		optSel('expandPosts', true, null),
		optSel('postBtnsCSS', true, null),
		lBox('noSpoilers', true, updateCSS),
		lBox('noPostNames', true, updateCSS),
		lBox('noPostScrl', true, updateCSS),
		$New('div', null, [
			lBox('correctTime', false, dateTime.toggleSettings),
			$add('<a href="https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/Settings-time-' +
				(lang ? 'en' : 'ru') + '" class="de-abtn" target="_blank">[?]</a>')
		]),
		$New('div', {'class': 'de-cfg-depend'}, [
			$New('div', null, [
				inpTxt('timeOffset', 2, null),
				$txt(Lng.cfg.timeOffset[lang])
			]),
			$New('div', null, [
				inpTxt('timePattern', 25, null),
				$txt(Lng.cfg.timePattern[lang])
			]),
			$New('div', null, [
				inpTxt('timeRPattern', 25, null),
				$txt(Lng.cfg.timeRPattern[lang])
			])
		])
	]);
}

function getCfgImages() {
	return $New('div', {'class': 'de-cfg-unvis', 'id': 'de-cfg-images'}, [
		optSel('expandImgs', true, null),
		$New('div', {'style': 'padding-left: 25px;'}, [
			lBox('imgNavBtns', true, updateCSS),
			lBox('resizeImgs', true, null),
			$if(Post.sizing.dPxRatio > 1, lBox('resizeDPI', true, null)),
			$New('div', null, [
				inpTxt('minImgSize', 4, function () {
					saveCfg('minImgSize', Math.max(+this.value, 1));
				}),
				$txt(Lng.cfg.minImgSize[lang])
			]),
			inpTxt('zoomFactor', 4, function () {
				saveCfg('zoomFactor', Math.min(Math.max(+this.value, 1), 100));
			}),
			$txt(Lng.cfg.zoomFactor[lang]),
			lBox('webmControl', true, null),
			$New('div', null, [
				inpTxt('webmVolume', 4, function () {
					saveCfg('webmVolume', Math.min(+this.value, 100));
				}),
				$txt(Lng.cfg.webmVolume[lang])
			])
		]),
		$if(!nav.Presto, lBox('preLoadImgs', true, null)),
		$if(!nav.Presto, $New('div', {'class': 'de-cfg-depend'}, [
			lBox('findImgFile', true, null)
		])),
		lBox('openImgs', true, null),
		$New('div', {'class': 'de-cfg-depend'}, [ lBox('openGIFs', false, null)]),
		lBox('imgSrcBtns', true, null)
	]);
}

function getCfgLinks() {
	return $New('div', {'class': 'de-cfg-unvis', 'id': 'de-cfg-links'}, [
		optSel('linksNavig', true, null),
		$New('div', {'class': 'de-cfg-depend'}, [
			$New('div', null, [
				inpTxt('linksOver', 4, function () {
					saveCfg('linksOver', +this.value | 0);
				}),
				$txt(Lng.cfg.linksOver[lang])
			]),
			$New('div', null, [
				inpTxt('linksOut', 4, function () {
					saveCfg('linksOut', +this.value | 0);
				}),
				$txt(Lng.cfg.linksOut[lang])
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
		$New('div', {'class': 'de-cfg-depend'}, [
			$New('div', null, [
				optSel('YTubeType', false, null),
				inpTxt('YTubeWidth', 4, null),
				$txt('×'),
				inpTxt('YTubeHeigh', 4, null),
				$txt(' '),
				lBox('YTubeHD', false, null)
			]),
			$if(!nav.Opera11 || nav.isGM, lBox('YTubeTitles', false, null)),
			lBox('addVimeo', true, null)
		])
	]);
}

function getCfgForm() {
	return $New('div', {'class': 'de-cfg-unvis', 'id': 'de-cfg-form'}, [
		optSel('ajaxReply', true, null),
		$if(pr.form, $New('div', {'class': 'de-cfg-depend'}, [
			$if(!nav.Opera11, $New('div', null, [
				lBox('postSameImg', true, null),
				lBox('removeEXIF', false, null),
				lBox('removeFName', false, null),
				lBox('sendErrNotif', true, null)
			])),
			lBox('scrAfterRep', true, null)
		])),
		$if(pr.form, optSel('addPostForm', true, function() {
			saveCfg('addPostForm', this.selectedIndex);
			pr.isTopForm = Cfg.addPostForm !== 0;
			pr.setReply(false, !TNum || Cfg.addPostForm > 1);
		})),
		lBox('favOnReply', true, null),
		$if(pr.subj, lBox('warnSubjTrip', false, null)),
		$if(pr.file && !nav.Presto, lBox('fileThumb', true, function () {
			for (var inp = pr.fileObj; true; inp = inp.next) {
				inp.updateUtils();
				if (!inp.next) {
					break;
				}
			}
			if (inp.empty) {
				inp.hideInputs();
			}
		})),
		$if(!aib.mak && pr.mail, $New('div', null, [
			lBox('addSageBtn', false, null),
			lBox('saveSage', false, null)
		])),
		$if(pr.capTr, optSel('captchaLang', true, null)),
		$if(pr.txta, $New('div', null, [
			optSel('addTextBtns', false, function () {
				saveCfg('addTextBtns', this.selectedIndex);
				pr.addTextPanel();
			}),
			lBox('txtBtnsLoc', false, pr.addTextPanel.bind(pr))
		])),
		$if(pr.passw, $New('div', null, [
			inpTxt('passwValue', 15, PostForm.setUserPassw),
			$txt(Lng.cfg.userPassw[lang]),
			$btn(Lng.change[lang], '', function () {
				$q('input[info="passwValue"]', doc).value = Math.round(Math.random() * 1e15).toString(32);
				PostForm.setUserPassw();
			})
		])),
		$if(pr.name, $New('div', null, [
			inpTxt('nameValue', 15, PostForm.setUserName),
			lBox('userName', false, PostForm.setUserName)
		])),
		$New('div', null, [
			$txt(Lng.dontShow[lang]),
			lBox('noBoardRule', false, updateCSS),
			$if(pr.gothr, lBox('noGoto', false, function () {
				$disp(pr.gothr);
			})),
			$if(pr.passw, lBox('noPassword', false, function () {
				$disp(pr.passw.parentNode.parentNode);
			}))
		])
	]);
}

function getCfgCommon() {
	return $New('div', {'class': 'de-cfg-unvis', 'id': 'de-cfg-common'}, [
		optSel('scriptStyle', true, function () {
			saveCfg('scriptStyle', this.selectedIndex);
			var lang = getThemeLang();
			$id('de-main-').lang = lang;
			$id('de-qarea').lang = lang;
		}),
		$New('div', null, [
			lBox('userCSS', false, updateCSS),
			addEditButton('css', function (Fn) {
				Fn(Cfg.userCSSTxt, false, function () {
					saveCfg('userCSSTxt', this.value);
					updateCSS();
					toggleContent('cfg', true);
				});
			})
		]),
		lBox('attachPanel', true, function () {
			toggleContent('cfg', false);
			updateCSS();
		}),
		lBox('panelCounter', true, updateCSS),
		lBox('rePageTitle', true, null),
		$if(nav.Anim, lBox('animation', true, null)),
		lBox('closePopups', true, null),
		$New('div', null, [
			lBox('hotKeys', false, function () {
				if (Cfg.hotKeys) {
					if (hKeys) {
						hKeys.enable();
					} else {
						hKeys = new HotKeys();
					}
				} else if (hKeys) {
					hKeys.disable();
				}
			}),
			$btn(Lng.edit[lang], '', function (e) {
				$pd(e);
				if ($id('de-alert-edit-hotkeys')) {
					return;
				}
				HotKeys.readKeys(function (keys) {
					var aEl, evtListener, temp = KeyEditListener.getEditMarkup(keys);
					$alert(temp[1], 'edit-hotkeys', false);
					aEl = $id('de-alert-edit-hotkeys');
					evtListener = new KeyEditListener(aEl, keys, temp[0]);
					aEl.addEventListener('focus', evtListener, true);
					aEl.addEventListener('blur', evtListener, true);
					aEl.addEventListener('click', evtListener, true);
					aEl.addEventListener('keydown', evtListener, true);
					aEl.addEventListener('keyup', evtListener, true);
				});
			})
		]),
		$New('div', {'class': 'de-cfg-depend'}, [
			inpTxt('loadPages', 2, null),
			$txt(Lng.cfg.loadPages[lang])
		]),
		$if(!nav.isChromeStorage && !nav.Presto || nav.isGM, $New('div', null, [
			lBox('updScript', true, null),
			$New('div', {'class': 'de-cfg-depend'}, [
				optSel('scrUpdIntrv', false, null),
				$btn(Lng.checkNow[lang], '', function () {
					$alert(Lng.loading[lang], 'updavail', true);
					checkForUpdates(true, function (html) {
						$alert(html, 'updavail', false);
					});
				})
			])
		])),
		lBox('turnOff', true, function () {
			for (var dm in comCfg) {
				if (dm !== aib.dm && dm !== 'global' && dm !== 'lastUpd') {
					comCfg[dm].disabled = Cfg.turnOff;
				}
			}
			setStored('DESU_Config', JSON.stringify(comCfg) || '');
		})
	]);
}

function getCfgInfo() {
	function getHiddenThrCount() {
		var b, tNum, count = 0;
		for (b in hThr) {
			for (tNum in hThr[b]) {
				count++;
			}
		}
		return count;
	}
	return $New('div', {'class': 'de-cfg-unvis', 'id': 'de-cfg-info'}, [
		$add('<div style="padding-bottom: 10px;">' +
			'<a href="https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/versions" ' +
			'target="_blank">v' + version + '</a>&nbsp;|&nbsp;' +
			'<a href="http://www.freedollchan.org/scripts/" target="_blank">Freedollchan</a>&nbsp;|&nbsp;' +
			'<a href="https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/' +
			(lang ? 'home-en/' : '') + '" target="_blank">Github</a></div>'),
		$add('<div><div style="display: inline-block; vertical-align: top; width: 186px; height: 230px;">' +
			Lng.thrViewed[lang] + Cfg.stats.view + '<br>' +
			Lng.thrCreated[lang] + Cfg.stats.op + '<br>' +
			Lng.thrHidden[lang] + getHiddenThrCount() + '<br>' +
			Lng.postsSent[lang] + Cfg.stats.reply + '</div>' +
			'<div style="display: inline-block; padding-left: 7px; height: 230px; ' +
			'border-left: 1px solid grey;">' + new Logger().get().join('<br>') + '</div></div>'),
		$btn(Lng.debug[lang], Lng.infoDebug[lang], function () {
			$alert(Lng.infoDebug[lang] +
				':<textarea readonly id="de-debug-info" class="de-editor"></textarea>', 'help-debug', false);
			$id('de-debug-info').value = JSON.stringify({
				'version': version,
				'location': String(window.location),
				'nav': nav,
				'cfg': Cfg,
				'sSpells': spells.list.split('\n'),
				'oSpells': sesStorage['de-spells-' + brd + TNum],
				'perf': new Logger().get()
			}, function (key, value) {
				if (key in defaultCfg) {
					if (value === defaultCfg[key] || key === 'nameValue' || key === 'passwValue') {
						return void 0;
					}
				}
				return key === 'stats' ? void 0 : value;
			}, '\t');
		})
	]);
}

function addEditButton(name, getDataFn) {
	return $btn(Lng.edit[lang], Lng.editInTxt[lang], function (getData) {
		getData(function (val, isJSON, saveFn) {
			var el, ta = $new('textarea', {
				'class': 'de-editor',
				'value': isJSON ? JSON.stringify(val, null, '\t') : val
			}, null);
			$alert('', 'edit-' + name, false);
			el = $c('de-alert-msg', $id('de-alert-edit-' + name));
			el.appendChild($txt(Lng.editor[name][lang]));
			el.appendChild(ta);
			el.appendChild($btn(Lng.save[lang], Lng.saveChanges[lang], isJSON ? function (fun) {
				var data;
				try {
					data = JSON.parse(this.value.trim().replace(/[\n\r\t]/g, '') || '{}');
				} finally {
					if (data) {
						fun(data);
						closeAlert($id('de-alert-edit-' + name));
						closeAlert($id('de-alert-err-invaliddata'));
					} else {
						$alert(Lng.invalidData[lang], 'err-invaliddata', false);
					}
				}
			}.bind(ta, saveFn) : saveFn.bind(ta)));
		});
	}.bind(null, getDataFn));
}

function addSettings(Set, id) {
	Set.appendChild($New('div', {'class': aib.cReply}, [
		$new('div', {'class': 'de-cfg-head', 'text': 'Dollchan Extension Tools'}, null),
		$New('div', {'id': 'de-cfg-bar'}, [
			cfgTab('filters'),
			cfgTab('posts'),
			cfgTab('images'),
			cfgTab('links'),
			$if(pr.form || pr.oeForm, cfgTab('form')),
			cfgTab('common'),
			cfgTab('info')
		]),
		$New('div', {'id': 'de-cfg-btns'}, [
			optSel('language', false, function () {
				saveCfg('language', lang = this.selectedIndex);
				$del($id('de-main-'));
				$del($id('de-css'));
				$del($id('de-css-dynamic'));
				scriptCSS();
				addPanel();
				toggleContent('cfg', false);
			}),
			$New('div', {'style': 'float: right;'}, [
				addEditButton('cfg', function (Fn) {
					Fn(Cfg, true, function (data) {
						saveComCfg(aib.dm, data);
						window.location.reload();
					});
				}),
				$if(nav.isGlobal, $btn(Lng.load[lang], Lng.loadGlobal[lang], function () {
					if (('global' in comCfg) && !$isEmpty(comCfg.global)) {
						saveComCfg(aib.dm, null);
						window.location.reload();
					} else {
						$alert(Lng.noGlobalCfg[lang], 'err-noglobalcfg', false);
					}
				})),
				$if(nav.isGlobal, $btn(Lng.save[lang], Lng.saveGlobal[lang], function () {
					var i, obj = {},
						com = comCfg[aib.dm];
					for (i in com) {
						if (com[i] !== defaultCfg[i] && i !== 'stats') {
							obj[i] = com[i];
						}
					}
					saveComCfg('global', obj);
					toggleContent('cfg', true);
				})),
				$btn(Lng.reset[lang], Lng.resetCfg[lang], function () {
					if (confirm(Lng.conReset[lang])) {
						delStored('DESU_Config');
						delStored('DESU_Favorites');
						delStored('DESU_Posts_' + aib.dm);
						delStored('DESU_Threads_' + aib.dm);
						delStored('DESU_keys');
						window.location.reload();
					}
				})
			]),
			$new('div', {'style': 'clear: both;'}, null)
		])
	]));
	$q('.de-cfg-tab[info="' + (id || 'filters') + '"]', Set).click();
}


// MENU & POPUP
// ===========================================================================================================

function closeAlert(el) {
	if (el) {
		el.closeTimeout = null;
		if (Cfg.animation) {
			nav.animEvent(el, function (node) {
				var p = node && node.parentNode;
				if (p) {
					p.removeChild(node);
				}
			});
			el.classList.add('de-close');
		} else {
			$del(el);
		}
	}
}

function $alert(txt, id, wait) {
	var node, el = $id('de-alert-' + id),
		cBtn = 'de-alert-btn' + (wait ? ' de-wait' : ''),
		tBtn = wait ? '' : '\u2716 ';
	if (el) {
		$t('div', el).innerHTML = txt.trim();
		node = $t('span', el);
		node.className = cBtn;
		node.textContent = tBtn;
		clearTimeout(el.closeTimeout);
		if (!wait && Cfg.animation) {
			nav.animEvent(el, function (node) {
				node.classList.remove('de-blink');
			});
			el.classList.add('de-blink');
		}
	} else {
		el = $id('de-alert').appendChild($New('div', {'class': aib.cReply, 'id': 'de-alert-' + id}, [
			$new('span', {'class': cBtn, 'text': tBtn}, {'click': function () {
				closeAlert(this.parentNode);
			}}),
			$add('<div class="de-alert-msg">' + txt.trim() + '</div>')
		]));
		if (Cfg.animation) {
			nav.animEvent(el, function (node) {
				node.classList.remove('de-open');
			});
			el.classList.add('de-open');
		}
	}
	if (Cfg.closePopups && !wait && !id.contains('help') && !id.contains('edit')) {
		el.closeTimeout = setTimeout(closeAlert, 4e3, el);
	}
}

function showMenu(el, html, inPanel, onclick) {
	var y, pos, menu, cr = el.getBoundingClientRect();
	if (Cfg.attachPanel && inPanel) {
		pos = 'fixed';
		y = 'bottom: 25';
	} else {
		pos = 'absolute';
		y = 'top: ' + (window.pageYOffset + cr.bottom);
	}
	doc.body.insertAdjacentHTML('beforeend', '<div class="' + aib.cReply + ' de-menu" style="position: ' +
		pos + '; right: ' + (doc.documentElement.clientWidth - cr.right - window.pageXOffset) +
		'px; ' + y + 'px;">' + html + '</div>');
	menu = doc.body.lastChild;
	menu.addEventListener('mouseover', function (e) {
		clearTimeout(e.currentTarget.odelay);
	}, true);
	menu.addEventListener('mouseout', removeMenu, true);
	menu.addEventListener('click', function (e) {
		var el = e.target;
		if (el.className === 'de-menu-item') {
			setTimeout(this, 10, el);
			do {
				el = el.parentElement;
			} while (!el.classList.contains('de-menu'));
			$del(el);
		}
	}.bind(onclick), false);
}

function addMenu(e) {
	e.target.odelay = setTimeout(function (el) {
		switch (el.id) {
		case 'de-btn-addspell': addSpellMenu(el); return;
		case 'de-btn-refresh': addAjaxPagesMenu(el); return;
		case 'de-btn-savethr': addSaveThreadMenu(el); return;
		case 'de-btn-audio-off': addAudioNotifMenu(el); return;
		}
	}, Cfg.linksOver, e.target);
}

function removeMenu(e) {
	var el = $c('de-menu', doc),
		rt = e.relatedTarget;
	clearTimeout(e.target.odelay);
	if (el && (!rt || (rt !== el && !el.contains(rt)))) {
		el.odelay = setTimeout($del, 75, el);
	}
}

function addSpellMenu(el) {
	showMenu(el, '<div style="display: inline-block; border-right: 1px solid grey;">' +
		'<span class="de-menu-item">' + ('#words,#exp,#exph,#imgn,#ihash,#subj,#name,#trip,#img,<br>')
			.split(',').join('</span><span class="de-menu-item">') +
		'</span></div><div style="display: inline-block;"><span class="de-menu-item">' +
		('#sage,#op,#tlen,#all,#video,#vauthor,#num,#wipe,#rep,#outrep')
			.split(',').join('</span><span class="de-menu-item">') + '</span></div>', false,
	function (el) {
		var exp = el.textContent,
			idx = Spells.names.indexOf(exp.substr(1));
		$txtInsert($id('de-spell-edit'), exp + (
			TNum && exp !== '#op' && exp !== '#rep' && exp !== '#outrep' ? '[' + brd + ',' + TNum + ']' : ''
		) + (Spells.needArg[idx] ? '(' : ''));
	});
}

function addAjaxPagesMenu(el) {
	showMenu(el, '<span class="de-menu-item">' +
		Lng.selAjaxPages[lang].join('</span><span class="de-menu-item">') + '</span>', true,
	function (el) {
		loadPages(aProto.indexOf.call(el.parentNode.children, el) + 1);
	});
}

function addSaveThreadMenu(el) {
	showMenu(el, '<span class="de-menu-item">' +
		Lng.selSaveThr[lang].join('</span><span class="de-menu-item">') + '</span>', true,
	function (el) {
		if (!$id('de-alert-savethr')) {
			var imgOnly = !!aProto.indexOf.call(el.parentNode.children, el);
			if (Images_.preloading) {
				$alert(Lng.loading[lang], 'savethr', true);
				Images_.afterpreload = loadDocFiles.bind(null, imgOnly);
				Images_.progressId = 'savethr';
			} else {
				loadDocFiles(imgOnly);
			}
		}
	});
}

function addAudioNotifMenu(el) {
	showMenu(el, '<span class="de-menu-item">' +
		Lng.selAudioNotif[lang].join('</span><span class="de-menu-item">') + '</span>', true,
	function (el) {
		var i = aProto.indexOf.call(el.parentNode.children, el);
		updater.enable();
		updater.toggleAudio(i === 0 ? 3e4 : i === 1 ? 6e4 : i === 2 ? 12e4 : 3e5);
		$id('de-btn-audio-off').id = 'de-btn-audio-on';
	});
}


// HOTKEYS
// ===========================================================================================================

function HotKeys() {
	HotKeys.readKeys(this._init.bind(this));
}
HotKeys.version = 6;
HotKeys.readKeys = function (Fn) {
	getStored('DESU_keys', function (str) {
		var tKeys, keys;
		if (!str) {
			this(HotKeys.getDefaultKeys());
			return;
		}
		try {
			keys = JSON.parse(str);
		} finally {
			if (!keys) {
				this(HotKeys.getDefaultKeys());
				return;
			}
			if (keys[0] !== HotKeys.version) {
				tKeys = HotKeys.getDefaultKeys();
				switch (keys[0]) {
				case 1:
					keys[2][11] = tKeys[2][11];
					keys[4] = tKeys[4];
				case 2:
					keys[2][12] = tKeys[2][12];
					keys[2][13] = tKeys[2][13];
					keys[2][14] = tKeys[2][14];
					keys[2][15] = tKeys[2][15];
					keys[2][16] = tKeys[2][16];
				case 3:
					keys[2][17] = keys[3][3];
					keys[3][3] = keys[3].splice(4, 1)[0];
				case 4:
				case 5:
					if (keys[2][18]) {
						delete keys[2][18];
					}
				}
				keys[0] = HotKeys.version;
				setStored('DESU_keys', JSON.stringify(keys));
			}
			if (keys[1] ^ !!nav.Firefox) {
				var mapFunc = nav.Firefox ? function mapFuncFF(key) {
					switch (key) {
					case 189: return 173;
					case 187: return 61;
					case 186: return 59;
					default: return key;
					}
				} : function mapFuncNonFF(key) {
					switch (key) {
					case 173: return 189;
					case 61: return 187;
					case 59: return 186;
					default: return key;
					}
				};
				keys[1] = !!nav.Firefox;
				keys[2] = keys[2].map(mapFunc);
				keys[3] = keys[3].map(mapFunc);
				setStored('DESU_keys', JSON.stringify(keys));
			}
			this(keys);
		}
	}.bind(Fn));
};
HotKeys.getDefaultKeys = function () {
	var isFirefox = !!nav.Firefox;
	var globKeys = [
		/* One post/thread above      */ 0x004B /* = K          */,
		/* One post/thread below      */ 0x004A /* = J          */,
		/* Reply or create thread     */ 0x0052 /* = R          */,
		/* Hide selected thread/post  */ 0x0048 /* = H          */,
		/* Open previous page/picture */ 0x1025 /* = Ctrl+Left  */,
		/* Send post (txt)            */ 0xC00D /* = Alt+Enter  */,
		/* Open/close favorites posts */ 0x4046 /* = Alt+F      */,
		/* Open/close hidden posts    */ 0x4048 /* = Alt+H      */,
		/* Open/close panel           */ 0x0050 /* = P          */,
		/* Mask/unmask images         */ 0x0042 /* = B          */,
		/* Open/close settings        */ 0x4053 /* = Alt+S      */,
		/* Expand current image       */ 0x0049 /* = I          */,
		/* Bold text                  */ 0xC042 /* = Alt+B      */,
		/* Italic text                */ 0xC049 /* = Alt+I      */,
		/* Strike text                */ 0xC054 /* = Alt+T      */,
		/* Spoiler text               */ 0xC050 /* = Alt+P      */,
		/* Code text                  */ 0xC043 /* = Alt+C      */,
		/* Open next page/picture     */ 0x1027 /* = Ctrl+Right */
	];
	var nonThrKeys = [
		/* One post above */ 0x004D /* = M */,
		/* One post below */ 0x004E /* = N */,
		/* Open thread    */ 0x0056 /* = V */,
		/* Expand thread  */ 0x0045 /* = E */
	];
	var thrKeys = [
		/* Update thread  */ 0x0055 /* = U */
	];
	return [HotKeys.version, isFirefox, globKeys, nonThrKeys, thrKeys];
};
HotKeys.prototype = {
	cPost: null,
	enabled: false,
	gKeys: null,
	lastPage: 0,
	lastPageOffset: 0,
	ntKeys: null,
	paused: false,
	tKeys: null,
	clear: function (lastPage) {
		this.cPost = null;
		this.lastPage = lastPage;
		this.lastPageOffset = 0;
	},
	disable: function () {
		if (this.enabled) {
			if (this.cPost) {
				this.cPost.unselect();
			}
			doc.removeEventListener('keydown', this, true);
			this.enabled = false;
		}
	},
	enable: function () {
		if (!this.enabled) {
			this.clear(pageNum);
			doc.addEventListener('keydown', this, true);
			this.enabled = true;
		}
	},
	handleEvent: function (e) {
		if (this.paused) {
			return;
		}
		var temp, post, scrollToThread, globIdx, idx, curTh = e.target.tagName,
			kc = e.keyCode | (e.ctrlKey ? 0x1000 : 0) | (e.shiftKey ? 0x2000 : 0) |
				(e.altKey ? 0x4000 : 0) | (curTh === 'TEXTAREA' ||
				(curTh === 'INPUT' && e.target.type === 'text') ? 0x8000 : 0);
		if (kc === 0x74 || kc === 0x8074) { // F5
			if (TNum || $id('de-alert-load-pages')) {
				return;
			}
			if (Attachment.viewer) {
				Attachment.viewer.close(null);
				Attachment.viewer = null;
			}
			loadPages(+Cfg.loadPages);
		} else if (kc === 0x1B) { // ESC
			if (Attachment.viewer) {
				Attachment.viewer.close(null);
				Attachment.viewer = null;
				return;
			}
			if (this.cPost) {
				this.cPost.unselect();
				this.cPost = null;
			}
			if (TNum) {
				firstThr.clearPostsMarks();
			}
			this.lastPageOffset = 0;
		} else if (kc === 0x801B) { // ESC (txt)
			e.target.blur();
		} else {
			globIdx = this.gKeys.indexOf(kc);
			switch (globIdx) {
			case 2: // Quick reply
				if (pr.form) {
					post = this.cPost || this._getFirstVisPost(false, true) || firstThr.op;
					this.cPost = post;
					pr.showQuickReply(post, post.num, true, false);
					post.select();
				}
				break;
			case 3: // Hide selected thread/post
				post = this._getFirstVisPost(false, true) || this._getNextVisPost(null, true, false);
				if (post) {
					post.toggleUserVisib();
					this._scroll(post, false, post.isOp);
				}
				break;
			case 4: // Open previous page/picture
				if (Attachment.viewer) {
					Attachment.viewer.navigate(false);
				} else if (TNum || pageNum !== aib.firstPage) {
					window.location.pathname = aib.getPageUrl(brd, TNum ? 0 : pageNum - 1);
				}
				break;
			case 5: // Send post (txt)
				if (e.target !== pr.txta && e.target !== pr.cap) {
					return;
				}
				pr.subm.click();
				break;
			case 6: // Open/close favorites posts
				toggleContent('fav', false);
				break;
			case 7: // Open/close hidden posts
				toggleContent('hid', false);
				break;
			case 8: // Open/close panel
				$disp($id('de-panel').lastChild);
				break;
			case 9: // Mask/unmask images
				toggleCfg('maskImgs');
				updateCSS();
				break;
			case 10: // Open/close settings
				toggleContent('cfg', false);
				break;
			case 11: // Expand current image
				post = this._getFirstVisPost(false, true) || this._getNextVisPost(null, true, false);
				if (post) {
					post.toggleImages(!post.imagesExpanded);
				}
				break;
			case 12: // Bold text (txt)
				if (e.target !== pr.txta) {
					return;
				}
				$id('de-btn-bold').click();
				break;
			case 13: // Italic text (txt)
				if (e.target !== pr.txta) {
					return;
				}
				$id('de-btn-italic').click();
				break;
			case 14: // Strike text (txt)
				if (e.target !== pr.txta) {
					return;
				}
				$id('de-btn-strike').click();
				break;
			case 15: // Spoiler text (txt)
				if (e.target !== pr.txta) {
					return;
				}
				$id('de-btn-spoil').click();
				break;
			case 16: // Code text (txt)
				if (e.target !== pr.txta) {
					return;
				}
				$id('de-btn-code').click();
				break;
			case 17: // Open next page/picture
				if (Attachment.viewer) {
					Attachment.viewer.navigate(true);
				} else if (!TNum && this.lastPage !== aib.lastPage) {
					window.location.pathname = aib.getPageUrl(brd, this.lastPage + 1);
				}
				break;
			case -1:
				if (TNum) {
					idx = this.tKeys.indexOf(kc);
					if (idx === 0) { // Update thread
						Thread.loadNewPosts(null);
						break;
					}
					return;
				}
				idx = this.ntKeys.indexOf(kc);
				if (idx === -1) {
					return;
				} else if (idx === 2) { // Open thread
					post = this._getFirstVisPost(false, true) || this._getNextVisPost(null, true, false);
					if (post) {
						if (nav.Firefox) {
							GM_openInTab(aib.getThrdUrl(brd, post.tNum), false, true);
						} else {
							window.open(aib.getThrdUrl(brd, post.tNum), '_blank');
						}
					}
					break;
				} else if (idx === 3) { // Expand/collapse thread
					post = this._getFirstVisPost(false, true) || this._getNextVisPost(null, true, false);
					if (post) {
						if (post.thr.loadedOnce && post.thr.op.next.count === 1) {
							temp = post.thr.nextNotHidden;
							post.thr.load(visPosts, !!temp, null);
							post = (temp || post.thr).op;
						} else {
							post.thr.load(1, false, null);
							post = post.thr.op;
						}
						scrollTo(0, pageYOffset + post.topCoord);
						if (this.cPost && this.cPost !== post) {
							this.cPost.unselect();
							this.cPost = post;
						}
					}
					break;
				}
			default:
				scrollToThread = !TNum && (globIdx === 0 || globIdx === 1);
				this._scroll(this._getFirstVisPost(scrollToThread, false), globIdx === 0 || idx === 0,
					scrollToThread);
			}
		}
		e.stopPropagation();
		$pd(e);
	},
	pause: function () {
		this.paused = true;
	},
	resume: function (keys) {
		this.gKeys = keys[2];
		this.ntKeys = keys[3];
		this.tKeys = keys[4];
		this.paused = false;
	},

	_getFirstVisPost: function (getThread, getFull) {
		var post, tPost;
		if (this.lastPageOffset !== pageYOffset) {
			post = getThread ? firstThr : firstThr.op;
			while (post.topCoord < 1) {
				tPost = post.next;
				if (!tPost) {
					break;
				}
				post = tPost;
			}
			if (this.cPost) {
				this.cPost.unselect();
			}
			this.cPost = getThread ? getFull ? post.op : post.op.prev : getFull ? post : post.prev;
			this.lastPageOffset = pageYOffset;
		}
		return this.cPost;
	},
	_getNextVisPost: function (cPost, isOp, toUp) {
		var thr;
		if (isOp) {
			thr = cPost ? toUp ? cPost.thr.prevNotHidden : cPost.thr.nextNotHidden :
				firstThr.hidden ? firstThr.nextNotHidden : firstThr;
			return thr ? thr.op : null;
		}
		return cPost ? cPost.getAdjacentVisPost(toUp) : firstThr.hidden ||
			firstThr.op.hidden ? firstThr.op.getAdjacentVisPost(toUp) : firstThr.op;
	},
	_init: function (keys) {
		this.enabled = true;
		this.lastPage = pageNum;
		this.gKeys = keys[2];
		this.ntKeys = keys[3];
		this.tKeys = keys[4];
		doc.addEventListener('keydown', this, true);
	},
	_scroll: function (post, toUp, toThread) {
		var next = this._getNextVisPost(post, toThread, toUp);
		if (!next) {
			if (!TNum && (toUp ? pageNum > aib.firstPage : this.lastPage < aib.lastPage)) {
				window.location.pathname = aib.getPageUrl(brd, toUp ? pageNum - 1 : this.lastPage + 1);
			}
			return;
		}
		if (post) {
			post.unselect();
		}
		if (toThread) {
			next.el.scrollIntoView();
		} else {
			scrollTo(0, pageYOffset + next.el.getBoundingClientRect().top -
				Post.sizing.wHeight / 2 + next.el.clientHeight / 2);
		}
		this.lastPageOffset = pageYOffset;
		next.select();
		this.cPost = next;
	}
}

function KeyEditListener(alertEl, keys, allKeys) {
	var j, k, i, len, aInputs = aProto.slice.call($C('de-input-key', alertEl));
	for (i = 0, len = allKeys.length; i < len; ++i) {
		k = allKeys[i];
		if (k !== 0) {
			for (j = i + 1; j < len; ++j) {
				if (k === allKeys[j]) {
					aInputs[i].classList.add('de-error-key');
					aInputs[j].classList.add('de-error-key');
					break;
				}
			}
		}
	}
	this.aEl = alertEl;
	this.keys = keys;
	this.initKeys = JSON.parse(JSON.stringify(keys));
	this.allKeys = allKeys;
	this.allInputs = aInputs;
	this.errCount = $C('de-error-key', alertEl).length;
	if (this.errCount !== 0) {
		this.saveButton.disabled = true;
	}
}
// Browsers have different codes for these keys (see HotKeys.readKeys):
//     Firefox - '-' - 173, '=' - 61, ';' - 59
//     Chrome/Opera: '-' - 189, '=' - 187, ';' - 186
KeyEditListener.keyCodes = ['',,,,,,,,'Backspace','Tab',,,,'Enter',,,'Shift','Ctrl','Alt',
	/* Pause/Break */,/* Caps Lock */,,,,,,,/* Escape */,,,,,'Space',/* Page Up */,
	/* Page Down */,/* End */,/* Home */,'←','↑','→','↓',,,,,/* Insert */,/* Delete */,,'0','1','2',
	'3','4','5','6','7','8','9',,';',,'=',,,,'A','B','C','D','E','F','G','H','I','J','K','L','M',
	'N','O','P','Q','R','S','T','U','V','W','X','Y','Z',/* Left WIN Key */,/* Right WIN Key */,
	/* Select key */,,,'Numpad 0','Numpad 1','Numpad 2','Numpad 3','Numpad 4','Numpad 5','Numpad 6',
	'Numpad 7','Numpad 8','Numpad 9','Numpad *','Numpad +',,'Numpad -','Numpad .','Numpad /',
	/* F1 */,/* F2 */,/* F3 */,/* F4 */,/* F5 */,/* F6 */,/* F7 */,/* F8 */,/* F9 */,/* F10 */,
	/* F11 */,/* F12 */,,,,,,,,,,,,,,,,,,,,,/* Num Lock */,/* Scroll Lock */,,,,,,,,,,,,,,,,,,,,,,,,
	,,,,'-',,,,,,,,,,,,,';','=',',','-','.','/','`',,,,,,,,,,,,,,,,,,,,,,,,,,,'[','\\',']','\''
];
KeyEditListener.getStrKey = function (key) {
	var str = '';
	if (key & 0x1000) {
		str += 'Ctrl+';
	}
	if (key & 0x2000) {
		str += 'Shift+';
	}
	if (key & 0x4000) {
		str += 'Alt+';
	}
	str += KeyEditListener.keyCodes[key & 0xFFF];
	return str;
};
KeyEditListener.getEditMarkup = function (keys) {
	var allKeys = [];
	var html = Lng.hotKeyEdit[lang].join('')
		.replace(/%l/g, '<label class="de-block">')
		.replace(/%\/l/g, '</label>')
		.replace(/%i([2-4])([0-9]+)(t)?/g, function (aKeys, all, id1, id2, isText) {
			var key = this[+id1][+id2];
			aKeys.push(key);
			return '<input class="de-input-key" type="text" de-id1="' + id1 + '" de-id2="' + id2 +
				'" size="26" value="' + KeyEditListener.getStrKey(key) +
				(isText ? '" de-text' : '"' ) + ' readonly></input>';
		}.bind(keys, allKeys)) +
	'<input type="button" id="de-keys-save" value="' + Lng.save[lang] + '"></input>' +
	'<input type="button" id="de-keys-reset" value="' + Lng.reset[lang] + '"></input>';
	return [allKeys, html];
};
KeyEditListener.setTitle = function (el, idx) {
	var title = el.getAttribute('de-title');
	if (hKeys && idx !== -1) {
		title += ' [' + KeyEditListener.getStrKey(hKeys.gKeys[idx]) + ']';
	}
	el.title = title;
};
KeyEditListener.prototype = {
	cEl: null,
	cKey: -1,
	errorInput: false,
	get saveButton() {
		var val = $id('de-keys-save');
		Object.defineProperty(this, 'saveButton', { value: val, configurable: true });
		return val;
	},
	handleEvent: function (e) {
		var key, keyStr, keys, str, id, temp, el = e.target;
		switch (e.type) {
		case 'blur':
			if (hKeys && this.errCount === 0) {
				hKeys.resume(this.keys);
			}
			this.cEl = null;
			return;
		case 'focus':
			if (hKeys) {
				hKeys.pause();
			}
			this.cEl = el;
			return;
		case 'click':
			if (el.id === 'de-keys-reset') {
				this.keys = HotKeys.getDefaultKeys();
				this.initKeys = HotKeys.getDefaultKeys();
				if (hKeys) {
					hKeys.resume(this.keys);
				}
				temp = KeyEditListener.getEditMarkup(this.keys);
				this.allKeys = temp[0];
				$c('de-alert-msg', this.aEl).innerHTML = temp[1];
				this.allInputs = aProto.slice.call($C('de-input-key', this.aEl));
				this.errCount = 0;
				delete this.saveButton;
				break;
			} else if (el.id === 'de-keys-save') {
				keys = this.keys;
				setStored('DESU_keys', JSON.stringify(keys));
			} else if (el.className === 'de-alert-btn') {
				keys = this.initKeys;
			} else {
				return;
			}
			if (hKeys) {
				hKeys.resume(keys);
			}
			closeAlert($id('de-alert-edit-hotkeys'));
			break;
		case 'keydown':
			if (!this.cEl) {
				return;
			}
			key = e.keyCode;
			if (key === 0x1B || key === 0x2E) { // ESC, DEL
				this.cEl.value = '';
				this.cKey = 0;
				this.errorInput = false;
				break;
			}
			keyStr = KeyEditListener.keyCodes[key];
			if (keyStr == null) {
				this.cKey = -1;
				return;
			}
			str = '';
			if (e.ctrlKey) {
				str += 'Ctrl+';
			}
			if (e.shiftKey) {
				str += 'Shift+';
			}
			if (e.altKey) {
				str += 'Alt+';
			}
			if (key === 16 || key === 17 || key === 18) {
				this.errorInput = true;
			} else {
				this.cKey = key | (e.ctrlKey ? 0x1000 : 0) | (e.shiftKey ? 0x2000 : 0) |
					(e.altKey ? 0x4000 : 0) | (this.cEl.hasAttribute('de-text') ? 0x8000 : 0);
				this.errorInput = false;
				str += keyStr;
			}
			this.cEl.value = str;
			break;
		case 'keyup':
			var idx, rIdx, oKey, rEl, isError, el = this.cEl,
				key = this.cKey;
			if (!el || key === -1) {
				return;
			}
			isError = el.classList.contains('de-error-key');
			if (!this.errorInput && key !== -1) {
				idx = this.allInputs.indexOf(el);
				oKey = this.allKeys[idx];
				if (oKey === key) {
					this.errorInput = false;
					break;
				}
				rIdx = key === 0 ? -1 : this.allKeys.indexOf(key);
				this.allKeys[idx] = key;
				if (isError) {
					idx = this.allKeys.indexOf(oKey);
					if (idx !== -1 && this.allKeys.indexOf(oKey, idx + 1) === -1) {
						rEl = this.allInputs[idx];
						if (rEl.classList.contains('de-error-key')) {
							this.errCount--;
							rEl.classList.remove('de-error-key');
						}
					}
					if (rIdx === -1) {
						this.errCount--;
						el.classList.remove('de-error-key');
					}
				}
				if (rIdx === -1) {
					this.keys[+el.getAttribute('de-id1')][+el.getAttribute('de-id2')] = key;
					if (this.errCount === 0) {
						this.saveButton.disabled = false;
					}
					this.errorInput = false;
					break;
				}
				rEl = this.allInputs[rIdx];
				if (!rEl.classList.contains('de-error-key')) {
					this.errCount++;
					rEl.classList.add('de-error-key');
				}
			}
			if (!isError) {
				this.errCount++;
				el.classList.add('de-error-key');
			}
			if (this.errCount !== 0) {
				this.saveButton.disabled = true;
			}
		}
		$pd(e);
	}
};


// CONTENT FEATURES
// ===========================================================================================================

function initMessageFunctions() {
	window.addEventListener('message', function (e) {
		var temp, data = e.data.substring(1);
		switch (e.data[0]) {
		case 'A':
			if (data.substr(10, 5) === 'pform') {
				checkUpload($DOM(data.substr(15)));
				$q('iframe[name="de-iframe-pform"]', doc).src = 'about:blank';
			} else {
				checkDelete($DOM(data.substr(15)));
				$q('iframe[name="de-iframe-dform"]', doc).src = 'about:blank';
			}
			return;
		case 'B':
			closeAlert($id('de-alert-load-favthr'));
			$id('de-iframe-fav').style.height = data + 'px';
			return;
		}
	}, false);
}

function detectImgFile(ab) {
	var i, j, dat = new Uint8Array(ab),
		len = dat.length;
	/* JPG [ff d8 ff e0] = [яШяа] */
	if (dat[0] === 0xFF && dat[1] === 0xD8) {
		for (i = 0, j = 0; i < len - 1; i++) {
			if (dat[i] === 0xFF) {
				/* Built-in JPG */
				if (dat[i + 1] === 0xD8) {
					j++;
				/* JPG end [ff d9] */
				} else if (dat[i + 1] === 0xD9 && --j === 0) {
					i += 2;
					break;
				}
			}
		}
	/* PNG [89 50 4e 47] = [‰PNG] */
	} else if (dat[0] === 0x89 && dat[1] === 0x50) {
		for (i = 0; i < len - 7; i++) {
			/* PNG end [49 45 4e 44 ae 42 60 82] */
			if (dat[i] === 0x49 && dat[i + 1] === 0x45 && dat[i + 2] === 0x4E && dat[i + 3] === 0x44) {
				i += 8;
				break;
			}
		}
	} else {
		return {};
	}
	/* Ignore small files */
	if (i !== len && len - i > 60) {
		for (len = i + 90; i < len; i++) {
			/* 7Z [37 7a bc af] = [7zјЇ] */
			if (dat[i] === 0x37 && dat[i + 1] === 0x7A && dat[i + 2] === 0xBC) {
				return {'type': 0, 'idx': i, 'data': ab};
			/* ZIP [50 4b 03 04] = [PK..] */
			} else if (dat[i] === 0x50 && dat[i + 1] === 0x4B && dat[i + 2] === 0x03) {
				return {'type': 1, 'idx': i, 'data': ab};
			/* RAR [52 61 72 21] = [Rar!] */
			} else if (dat[i] === 0x52 && dat[i + 1] === 0x61 && dat[i + 2] === 0x72) {
				return {'type': 2, 'idx': i, 'data': ab};
			/* OGG [4f 67 67 53] = [OggS] */
			} else if (dat[i] === 0x4F && dat[i + 1] === 0x67 && dat[i + 2] === 0x67) {
				return {'type': 3, 'idx': i, 'data': ab};
			/* MP3 [0x49 0x44 0x33] = [ID3] */
			} else if (dat[i] === 0x49 && dat[i + 1] === 0x44 && dat[i + 2] === 0x33) {
				return {'type': 4, 'idx': i, 'data': ab};
			}
		}
	}
	return {};
}

function workerQueue(mReqs, wrkFn, errFn) {
	if (!nav.hasWorker) {
		this.run = this._runSync.bind(wrkFn);
		return;
	}
	this.queue = new $queue(mReqs, this._createWrk.bind(this), null);
	this.run = this._runWrk;
	this.wrks = new $workers('self.onmessage = function (e) {\
		var info = (' + String(wrkFn) + ')(e.data[1]);\
		if (info.data) {\
			self.postMessage([e.data[0], info], [info.data]);\
		} else {\
			self.postMessage([e.data[0], info]);\
		}\
	}', mReqs);
	this.errFn = errFn;
}
workerQueue.prototype = {
	_runSync: function (data, transferObjs, Fn) {
		Fn(this(data));
	},
	onMess: function (Fn, e) {
		this.queue.end(e.data[0]);
		Fn(e.data[1]);
	},
	onErr: function (qIdx, e) {
		this.queue.end(qIdx);
		this.errFn(e);
	},
	_runWrk: function (data, transObjs, Fn) {
		this.queue.run([data, transObjs, this.onMess.bind(this, Fn)]);
	},
	_createWrk: function (qIdx, num, data) {
		var w = this.wrks[qIdx];
		w.onmessage = data[2];
		w.onerror = this.onErr.bind(this, qIdx);
		w.postMessage([qIdx, data[0]], data[1]);
	},
	clear: function () {
		this.wrks && this.wrks.clear();
		this.wrks = null;
	}
};

function addImgFileIcon(fName, info) {
	var app, ext, type = info.type;
	if (typeof type !== 'undefined') {
		if (type === 2) {
			app = 'application/x-rar-compressed';
			ext = 'rar';
		} else if (type === 1) {
			app = 'application/zip';
			ext = 'zip';
		} else if (type === 0) {
			app = 'application/x-7z-compressed';
			ext = '7z';
		} else if (type === 3) {
			app = 'audio/ogg';
			ext = 'ogg';
		} else {
			app = 'audio/mpeg';
			ext = 'mp3';
		}
		this.insertAdjacentHTML('afterend', '<a href="' + window.URL.createObjectURL(
				new Blob([new Uint8Array(info.data).subarray(info.idx)], {'type': app})
			) + '" class="de-img-' + (type > 2 ? 'audio' : 'arch') + '" title="' + Lng.downloadFile[lang] +
			'" download="' + fName.substring(0, fName.lastIndexOf('.')) + '.' + ext + '">.' + ext + '</a>'
		);
	}
}

function downloadImgData(url, Fn) {
	downloadObjInfo(Fn, {
		'method': 'GET',
		'url': url,
		'onreadystatechange': function onDownloaded(url, e) {
			if (e.readyState !== 4) {
				return;
			}
			var isAb = e.responseType === 'arraybuffer';
			if (e.status === 0 && isAb) {
				Fn(new Uint8Array(e.response));
			} else if (e.status !== 200) {
				if (e.status === 404 || !url) {
					Fn(null);
				} else {
					downloadObjInfo(Fn, {
						'method': 'GET',
						'url': url,
						'onreadystatechange': onDownloaded.bind(null, null)
					});
				}
			} else if (isAb) {
				Fn(new Uint8Array(e.response));
			} else {
				for (var len, i = 0, txt = e.responseText, rv = new Uint8Array(len = txt.length); i < len; ++i) {
					rv[i] = txt.charCodeAt(i) & 0xFF;
				}
				Fn(rv);
			}
		}.bind(null, url)
	});
}

function downloadObjInfo(Fn, obj) {
	if (aib.fch && nav.Firefox && !obj.url.startsWith('blob')) {
		obj.overrideMimeType = 'text/plain; charset=x-user-defined';
		GM_xmlhttpRequest(obj);
	} else {
		obj.responseType = 'arraybuffer';
		try {
			$xhr(obj);
		} catch(e) {
			Fn(null);
		}
	}
}

function preloadImages(post) {
	if (!Cfg.preLoadImgs && !Cfg.openImgs && !isPreImg) {
		return;
	}
	var lnk, url, iType, nExp, el, i, len, els, queue, mReqs = post ? 1 : 4, cImg = 1,
		rjf = (isPreImg || Cfg.findImgFile) && new workerQueue(mReqs, detectImgFile, function (e) {
			console.error("FILE DETECTOR ERROR, line: " + e.lineno + " - " + e.message);
		});
	if (isPreImg || Cfg.preLoadImgs) {
		queue = new $queue(mReqs, function (qIdx, num, dat) {
			downloadImgData(dat[0], function (idx, data) {
				if (data) {
					var a = this[1],
						fName = this[0].substring(this[0].lastIndexOf("/") + 1),
						aEl = $q(aib.qImgLink, aib.getImgWrap(a));
					aEl.setAttribute('download', fName);
					a.href = window.URL.createObjectURL(new Blob([data], {'type': this[2]}));
					a.setAttribute('de-name', fName);
					if (this[2] === 'video/webm') {
						this[4].setAttribute('de-video', '');
					}
					if (this[3]) {
						this[4].src = a.href;
					}
					if (rjf) {
						rjf.run(data.buffer, [data.buffer], addImgFileIcon.bind(aEl, fName));
					}
				}
				queue.end(idx);
				if (Images_.progressId) {
					$alert(Lng.loadImage[lang] + cImg + '/' + len, Images_.progressId, true);
				}
				cImg++;
			}.bind(dat, qIdx));
		}, function () {
			Images_.preloading = false;
			if (Images_.afterpreload) {
				Images_.afterpreload();
				Images_.afterpreload = Images_.progressId = null;
			}
			rjf && rjf.clear();
			rjf = queue = cImg = len = null;
		});
		Images_.preloading = true;
	}
	for (i = 0, els = $Q(aib.qThumbImages, post || dForm), len = els.length; i < len; i++) {
		if (lnk = $parent(el = els[i], 'A')) {
			url = lnk.href;
			nExp = !!Cfg.openImgs;
			if (/\.gif$/i.test(url)) {
				iType = 'image/gif';
			} else {
				if (/\.jpe?g$/i.test(url)) {
					iType = 'image/jpeg';
				} else if (/\.png$/i.test(url)) {
					iType = 'image/png';
				} else if (/\.webm$/i.test(url)) {
					iType = 'video/webm';
					nExp = false;
				} else {
					continue;
				}
				nExp &= !Cfg.openGIFs;
			}
			if (queue) {
				queue.run([url, lnk, iType, nExp, el]);
			} else if (nExp) {
				el.src = url; // !
			}
		}
	}
	queue && queue.complete();
}

function getDataFromImg(img) {
	var cnv = Images_.canvas || (Images_.canvas = doc.createElement('canvas'));
	cnv.width = img.width;
	cnv.height = img.height;
	cnv.getContext('2d').drawImage(img, 0, 0);
	return new Uint8Array(atob(cnv.toDataURL("image/png").split(',')[1]).split('').map(function (a) {
		return a.charCodeAt();
	}));
}

function loadDocFiles(imgOnly) {
	var els, files, progress, counter, count = 0,
		current = 1,
		warnings = '',
		tar = new $tar(),
		dc = imgOnly ? doc : doc.documentElement.cloneNode(true);
	Images_.queue = new $queue(4, function (qIdx, num, dat) {
		downloadImgData(dat[0], function (idx, data) {
			var name = this[1].replace(/[\\\/:*?"<>|]/g, '_'), el = this[2];
			progress.value = current;
			counter.innerHTML = current;
			current++;
			if (this[3]) {
				if (!data) {
					warnings += '<br>' + Lng.cantLoad[lang] + '<a href="' + this[0] + '">' +
						this[0] + '</a><br>' + Lng.willSavePview[lang];
					$alert(Lng.loadErrors[lang] + warnings, 'floadwarn', false);
					name = 'thumb-' + name.replace(/\.[a-z]+$/, '.png');
					data = getDataFromImg(this[2]);
				}
				if (!imgOnly) {
					el.classList.add('de-thumb');
					el.src = this[3].href =
						$q(aib.qImgLink, aib.getImgWrap(this[3])).href =
						name = 'images/' + name;
				}
				tar.addFile(name, data);
			} else if (data && data.length > 0) {
				tar.addFile(el.href = el.src = 'data/' + name, data);
			} else {
				$del(el);
			}
			Images_.queue.end(idx);
		}.bind(dat, qIdx));
	}, function () {
		var u, a, dt, name = aib.dm + '-' + brd.replace(/[\\\/:*?"<>|]/g, '') + '-' + TNum;
		if (!imgOnly) {
			dt = doc.doctype;
			$t('head', dc).insertAdjacentHTML('beforeend',
				'<script type="text/javascript" src="data/dollscript.js"></script>');
			tar.addString('data/dollscript.js', '(' + String(de_main_func) + ')(null, true);');
			tar.addString(
				name + '.html', '<!DOCTYPE ' + dt.name +
				(dt.publicId ? ' PUBLIC "' + dt.publicId + '"' : dt.systemId ? ' SYSTEM' : '') +
				(dt.systemId ? ' "' + dt.systemId + '"' : '') + '>' + dc.outerHTML
			);
		}
		u = window.URL.createObjectURL(tar.get());
		a = $new('a', {'href': u, 'download': name + (imgOnly ? '-images.tar' : '.tar')}, null);
		doc.body.appendChild(a);
		a.click();
		setTimeout(function (el, url) {
			window.URL.revokeObjectURL(url);
			$del(el);
		}, 0, a, u);
		$del($id('de-alert-filesload'));
		Images_.queue = tar = warnings = count = current = imgOnly = progress = counter = null;
	});
	els = aProto.slice.call($Q(aib.qThumbImages, $q('[de-form]', dc)));
	count += els.length;
	els.forEach(function (el) {
		var lnk, url;
		if (lnk = $parent(el, 'A')) {
			url = lnk.href;
			if (aib.tiny) {
				url = url.replace(/^.*?\?v=|&.*?$/g, '');
			}
			Images_.queue.run([url, lnk.getAttribute('de-name') ||
				url.substring(url.lastIndexOf("/") + 1), el, lnk]);
		}
	});
	if (!imgOnly) {
		files = [];
		$each($Q('#de-main, #de-main-, .de-parea, .de-post-btns, #de-qarea, .de-refmap, #de-updater-div, .de-video-obj,' +
			' link[rel="alternate stylesheet"], script, ' + aib.qPostForm, dc), $del);
		$each($T('a', dc), function (el) {
			var num, tc = el.textContent;
			if (tc[0] === '>' && tc[1] === '>' && (num = +tc.substr(2)) && (num in pByNum)) {
				el.href = aib.anchor + num;
			} else {
				el.href = getAbsLink(el.href);
			}
			if (!el.classList.contains('de-preflink')) {
				el.className = 'de-preflink ' + el.className;
			}
		});
		$each($Q('.' + aib.cRPost, dc), function (post, i) {
			post.setAttribute('de-num', i === 0 ? TNum : aib.getPNum(post));
		});
		$each($Q('link, *[src]', dc), function (el) {
			if (els.indexOf(el) !== -1) {
				return;
			}
			var temp, i, ext, name, url = el.tagName === 'LINK' ? el.href : el.src;
			if (!this.test(url)) {
				$del(el);
				return;
			}
			name = url.substring(url.lastIndexOf("/") + 1).replace(/[\\\/:*?"<>|]/g, '_')
				.toLowerCase();
			if (files.indexOf(name) !== -1) {
				temp = url.lastIndexOf('.');
				ext = url.substring(temp);
				url = url.substring(0, temp);
				name = name.substring(0, name.lastIndexOf('.'));
				for (i = 0; ; ++i) {
					temp = name + '(' + i + ')' + ext;
					if (files.indexOf(temp) === -1) {
						break;
					}
				}
				name = temp;
			}
			files.push(name);
			Images_.queue.run([url, name, el, null]);
			count++;
		}.bind(new RegExp('^\\/\\/?|^https?:\\/\\/([^\\/]*\.)?' + regQuote(aib.dm) + '\\/', 'i')));
	}
	$alert((imgOnly ? Lng.loadImage[lang] : Lng.loadFile[lang]) +
		'<br><progress id="de-loadprogress" value="0" max="' + count + '"></progress> <span>1</span>/' +
		count, 'filesload', true);
	progress = $id('de-loadprogress');
	counter = progress.nextElementSibling;
	Images_.queue.complete();
	els = null;
}


// TIME CORRECTION
// ===========================================================================================================

function dateTime(pattern, rPattern, diff, dtLang, onRPat) {
	if (dateTime.checkPattern(pattern)) {
		this.disabled = true;
		return;
	}
	this.regex = pattern
		.replace(/(?:[sihdny]\?){2,}/g, function () {
			return '(?:' + arguments[0].replace(/\?/g, '') + ')?';
		})
		.replace(/\-/g, '[^<]')
		.replace(/\+/g, '[^0-9]')
		.replace(/([sihdny]+)/g, '($1)')
		.replace(/[sihdny]/g, '\\d')
		.replace(/m|w/g, '([a-zA-Zа-яА-Я]+)');
	this.pattern = pattern.replace(/[\?\-\+]+/g, '').replace(/([a-z])\1+/g, '$1');
	this.diff = parseInt(diff, 10);
	this.sDiff = (this.diff < 0 ? '' : '+') + this.diff;
	this.arrW = Lng.week[dtLang];
	this.arrM = Lng.month[dtLang];
	this.arrFM = Lng.fullMonth[dtLang];
	this.rPattern = rPattern;
	this.onRPat = onRPat;
}
dateTime.toggleSettings = function (el) {
	if (el.checked && (!/^[+-]\d{1,2}$/.test(Cfg.timeOffset) || dateTime.checkPattern(Cfg.timePattern))) {
		$alert(Lng.cTimeError[lang], 'err-correcttime', false);
		saveCfg('correctTime', 0);
		el.checked = false;
	}
};
dateTime.checkPattern = function (val) {
	return !val.contains('i') || !val.contains('h') || !val.contains('d') || !val.contains('y') ||
		!(val.contains('n') || val.contains('m')) ||
		/[^\?\-\+sihdmwny]|mm|ww|\?\?|([ihdny]\?)\1+/.test(val);
};
dateTime.prototype = {
	getRPattern: function (txt) {
		var k, p, a, str, i = 1,
			j = 0,
			m = txt.match(new RegExp(this.regex));
		if (!m) {
			this.disabled = true;
			return false;
		}
		this.rPattern = '';
		str = m[0];
		while (a = m[i++]) {
			p = this.pattern[i - 2];
			if ((p === 'm' || p === 'y') && a.length > 3) {
				p = p.toUpperCase();
			}
			k = str.indexOf(a, j);
			this.rPattern += str.substring(j, k) + '_' + p;
			j = k + a.length;
		}
		this.onRPat && this.onRPat(this.rPattern);
		return true;
	},
	pad2: function (num) {
		return num < 10 ? '0' + num : num;
	},
	fix: function (txt) {
		if (this.disabled || (!this.rPattern && !this.getRPattern(txt))) {
			return txt;
		}
		return txt.replace(new RegExp(this.regex, 'g'), function () {
			var i, a, t, second, minute, hour, day, month, year, dtime;
			for (i = 1; i < 8; i++) {
				a = arguments[i];
				t = this.pattern[i - 1];
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
			dtime.setHours(dtime.getHours() + this.diff);
			return this.rPattern
				.replace('_o', this.sDiff)
				.replace('_s', this.pad2(dtime.getSeconds()))
				.replace('_i', this.pad2(dtime.getMinutes()))
				.replace('_h', this.pad2(dtime.getHours()))
				.replace('_d', this.pad2(dtime.getDate()))
				.replace('_w', this.arrW[dtime.getDay()])
				.replace('_n', this.pad2(dtime.getMonth() + 1))
				.replace('_m', this.arrM[dtime.getMonth()])
				.replace('_M', this.arrFM[dtime.getMonth()])
				.replace('_y', ('' + dtime.getFullYear()).substring(2))
				.replace('_Y', dtime.getFullYear());
		}.bind(this));
	}
};


// PLAYER
// ===========================================================================================================

YouTube = new function () {
	var instance, vData, embedType, videoType, width, height, isHD, loadTitles;

	function addThumb(el, m, isYtube) {
		var wh = ' width="' + width + '" height="' + height + '"></a>';
		if (isYtube) {
			el.innerHTML = '<a href="' + aib.prot + '//www.youtube.com/watch?v=' + m[1] + '" target="_blank">' +
				'<img class="de-video-thumb de-ytube" src="https://i.ytimg.com/vi/' + m[1] + '/0.jpg"' + wh;
		} else {
			el.innerHTML = '<a href="' + aib.prot + '//vimeo.com/' + m[1] + '" target="_blank">' +
				'<img class="de-video-thumb de-vimeo" src=""' + wh;
			GM_xmlhttpRequest({
				'method': 'GET',
				'url': aib.prot + '//vimeo.com/api/v2/video/' + m[1] + '.json',
				'onload': function (xhr){
					this.setAttribute('src', JSON.parse(xhr.responseText)[0].thumbnail_large);
				}.bind(el.firstChild.firstChild)
			});
		}
	}

	function addPlayer(el, m, isYtube) {
		var time, list, id = m[1],
			wh = ' width="' + width + '" height="' + height + '">';
		if (isYtube) {
			time = (m[2] ? m[2] * 3600 : 0) + (m[3] ? m[3] * 60 : 0) + (m[4] ? +m[4] : 0);
			list = m[0].match(/list=[^&#]+/);
			el.innerHTML = '<iframe frameborder="0" allowfullscreen="1" src="' + aib.prot + '//www.youtube.com/embed/' +
				id + '?' + (el.parentNode.id === 'de-content-vid' ? 'enablejsapi=1&' : '') +
				(isHD ? 'hd=1&' : '') + (list ? list[0] + '&' : '') + 'start=' + time + (videoType === 1 ?
					'&html5=1&rel=0" type="text/html"' : '" type="application/x-shockwave-flash"') + wh;
		} else {
			time = m[2] ? m[2] : '';
			el.innerHTML = videoType === 1 ?
				'<iframe src="' + aib.prot + '//player.vimeo.com/video/' + id + time +
					'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen' + wh :
				'<embed type="application/x-shockwave-flash" src="' + aib.prot + '//vimeo.com/moogaloop.swf' +
					'?clip_id=' + id + time + '&server=vimeo.com&color=00adef&fullscreen=1" ' +
					'allowscriptaccess="always" allowfullscreen="true"' + wh;
		}
	}

	function addLink(post, m, loader, link, isYtube) {
		var msg, src, time, dataObj;
		if (!post) {
			return;
		}
		post.hasYTube = true;
		if (post.ytInfo === null) {
			if (embedType === 2) {
				addPlayer(post.ytObj, post.ytInfo = m, isYtube);
			} else if (embedType > 2) {
				addThumb(post.ytObj, post.ytInfo = m, isYtube);
			}
		} else if (!link && $q('.de-video-link[href*="' + m[1] + '"]', post.msg)) {
			return;
		}
		if (loader && (dataObj = vData[m[1]])) {
			post.ytData.push(dataObj);
		}
		if (m[4] || m[3] || m[2]) {
			if (m[4] >= 60) {
				m[3] = (m[3] || 0) + Math.floor(m[4] / 60);
				m[4] %= 60;
			}
			if (m[3] >= 60) {
				m[2] = (m[2] || 0) + Math.floor(m[3] / 60);
				m[3] %= 60;
			}
			time = (m[2] ? m[2] + 'h' : '') + (m[3] ? m[3] + 'm' : '') + (m[4] ? m[4] + 's' : '');
		}
		if (link) {
			link.href = link.href.replace(/^http:/, 'https:');
			if (time) {
				link.setAttribute('de-time', time);
			}
			if (dataObj) {
				link.textContent = dataObj[0];
				link.className = 'de-video-link de-ytube de-video-title';
				link.setAttribute('de-author', dataObj[1]);
				link.title = Lng.author[lang] + dataObj[1] + ', ' +
					Lng.views[lang] + dataObj[2] + ', ' + Lng.published[lang] + dataObj[3];
			} else {
				link.className = 'de-video-link ' + (isYtube ? 'de-ytube' : 'de-vimeo');
				if (!isYtube && Cfg.YTubeTitles) {
					getVimeoTitle(link, m);
				}
			}
		} else {
			src = isYtube ? aib.prot + '//www.youtube.com/watch?v=' + m[1] + (time ? '#t=' + time : '')
				: aib.prot + '//vimeo.com/' + m[1];
			post.msg.insertAdjacentHTML('beforeend',
				'<p class="de-video-ext"><a class="de-video-link ' + (isYtube ? 'de-ytube' : 'de-vimeo') +
					(dataObj ? ' de-video-title" title="' + Lng.author[lang] + dataObj[1] + ', ' +
						Lng.views[lang] + dataObj[2] + ', ' + Lng.published[lang] + dataObj[3] +
						'" de-author="' + dataObj[1] : '') + (time ? '" de-time="' + time : '') +
					'" href="' + src + '">' + (dataObj ? dataObj[0] : src) + '</a></p>');
			link = post.msg.lastChild.firstChild;
		}
		if (!post.ytInfo || post.ytInfo === m) {
			post.ytLink = link;
		}
		link.ytInfo = m;
		if (loader && !dataObj) {
			post.ytLinksLoading++;
			loader.run([post, link, m[1]]);
		}
	}

	function clickLink(post, el, mode) {
		var m = el.ytInfo;
		if (post.ytInfo === m) {
			if (mode === 3) {
				if ($c('de-video-thumb', post.ytObj)) {
					el.classList.add('de-current');
					addPlayer(post.ytObj, post.ytInfo = m, el.classList.contains('de-ytube'));
				} else {
					el.classList.remove('de-current');
					addThumb(post.ytObj, post.ytInfo = m, el.classList.contains('de-ytube'));
				}
			} else {
				el.classList.remove('de-current');
				post.ytObj.innerHTML = '';
				post.ytInfo = null;
			}
		} else if (mode > 2) {
			post.ytLink.classList.remove('de-current');
			post.ytLink = el;
			addThumb(post.ytObj, post.ytInfo = m, el.classList.contains('de-ytube'));
		} else {
			post.ytLink.classList.remove('de-current');
			post.ytLink = el;
			el.classList.add('de-current');
			addPlayer(post.ytObj, post.ytInfo = m, el.classList.contains('de-ytube'));
		}
	}

	function getVimeoTitle(link, m) {
		GM_xmlhttpRequest({
			'method': 'GET',
			'url': aib.prot + '//vimeo.com/api/v2/video/' + m[1] + '.json',
			'onload': function (xhr) {
				var json = JSON.parse(xhr.responseText)[0],
					date = new RegExp (/(.*)\s(.*)?/).exec(json["upload_date"]);
				link.textContent = json["title"];
				link.title = Lng.author[lang] + json["user_name"] + ', ' +
					Lng.views[lang] + json["stats_number_of_plays"] + ', ' + Lng.published[lang] + date[1];
			}
		});
	}

	function getYtubeTitleLoader() {
		var queueEnd, queue = new $queue(4, function (qIdx, num, data) {
			if (num % 30 === 0) {
				queue.pause();
				setTimeout(queue.continue.bind(queue), 3e3);
			}
			GM_xmlhttpRequest({
				'method': 'GET',
				'url': aib.prot + '//gdata.youtube.com/feeds/api/videos/' + data[2] +
					'?alt=json&fields=title/text(),author/name,yt:statistics/@viewCount,published',
				'onreadystatechange': function (idx, xhr) {
					if (xhr.readyState !== 4) {
						return;
					}
					var entry, title, author, views, publ, data, post = this[0], link = this[1];
					try {
						if (xhr.status === 200) {
							entry = JSON.parse(xhr.responseText).entry;
							title = entry.title.$t;
							author = entry.author[0].name.$t;
							views = entry.yt$statistics.viewCount;
							publ = entry.published.$t.substr(0, 10);
						}
					} finally {
						if (title) {
							link.textContent = title;
							link.setAttribute('de-author', author);
							link.classList.add('de-video-title');
							link.title = Lng.author[lang] + author + ', ' + Lng.views[lang] + views + ', ' +
								Lng.published[lang] + publ;
							vData[this[2]] = data = [title, author, views, publ];
							post.ytData.push(data);
							post.ytLinksLoading--;
							if (post.ytHideFun !== null) {
								post.ytHideFun(data);
							}
						}
						setTimeout(queueEnd, 250, idx);
					}
				}.bind(data, qIdx)
			});
		}, function () {
			sesStorage['de-ytube-data'] = JSON.stringify(vData);
			queue = queueEnd = null;
		});
		queueEnd = queue.end.bind(queue);
		return queue;
	}

	function YouTubeSingleton() {
		if (instance) {
			return instance;
		}
		instance = this;
		embedType = Cfg.addYouTube;
		if (embedType === 0) {
			this.parseLinks = emptyFn;
			this.updatePost = emptyFn;
		}
		loadTitles = Cfg.YTubeTitles;
		if (loadTitles) {
			vData = JSON.parse(sesStorage['de-ytube-data'] || '{}');
		}
		videoType = Cfg.YTubeType;
		width = Cfg.YTubeWidth;
		height = Cfg.YTubeHeigh;
		isHD = Cfg.YTubeHD;
	}
	YouTubeSingleton.prototype = {
		embedType: embedType,
		ytReg: /^https?:\/\/(?:www\.|m\.)?youtu(?:be\.com\/(?:watch\?.*?v=|v\/|embed\/)|\.be\/)([a-zA-Z0-9-_]+).*?(?:t(?:ime)?=(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?)?$/,
		vimReg: /^https?:\/\/(?:www\.)?vimeo\.com\/(?:[^\?]+\?clip_id=|.*?\/)?(\d+).*?(#t=\d+)?$/,
		vData: vData,

		addPlayer: addPlayer,
		addLink: addLink,
		clickLink: clickLink,
		parseLinks: function (post) {
			var i, len, els, el, src, m, embedTube = [],
				loader = loadTitles && getYtubeTitleLoader();
			for (i = 0, els = $Q('embed, object, iframe', post ? post.el : dForm), len = els.length; i < len; ++i) {
				el = els[i];
				src = el.src || el.data;
				if (m = src.match(this.ytReg)) {
					embedTube.push(post || aib.getPostEl(el).post, m, true);
					$del(el);
				}
				if (Cfg.addVimeo && (m = src.match(this.vimReg))) {
					embedTube.push(post || aib.getPostEl(el).post, m, false);
					$del(el);
				}
			}
			for (i = 0, els = $Q('a[href*="youtu"]', post ? post.el : dForm), len = els.length; i < len; ++i) {
				el = els[i];
				if (m = el.href.match(this.ytReg)) {
					addLink(post || aib.getPostEl(el).post, m, loader, el, true);
				}
			}
			if (Cfg.addVimeo) {
				for (i = 0, els = $Q('a[href*="vimeo.com"]', post ? post.el : dForm), len = els.length; i < len; ++i) {
					el = els[i];
					if (m = el.href.match(this.vimReg)) {
						addLink(post || aib.getPostEl(el).post, m, null, el, false);
					}
				}
			}
			for (i = 0, len = embedTube.length; i < len; i += 3) {
				addLink(embedTube[i], embedTube[i + 1], loader, null, embedTube[i + 2]);
			}
			loader && loader.complete();
		},
		updatePost: function (post, oldLinks, newLinks, cloned) {
			var i, j, el, link, m, loader = !cloned && loadTitles && getYtubeTitleLoader(),
				len = newLinks.length;
			for (i = 0, j = 0; i < len; i++) {
				el = newLinks[i];
				link = oldLinks[j];
				if (link && link.classList.contains('de-current')) {
					post.ytLink = el;
				}
				if (cloned) {
					el.ytInfo = link.ytInfo;
					j++;
				} else if (m = el.href.match(this.ytReg)) {
					addLink(post, m, loader, el, true);
					j++;
				}
			}
			post.ytLink = post.ytLink || newLinks[0];
			loader && loader.complete();
		}
	};

	return YouTubeSingleton;
};

function embedMP3Links(post) {
	var el, link, src, i, els, len;
	if (!Cfg.addMP3) {
		return;
	}
	for (i = 0, els = $Q('a[href*=".mp3"]', post ? post.el : dForm), len = els.length; i < len; ++i) {
		link = els[i];
		if (link.target !== '_blank' && link.rel !== 'nofollow') {
			continue;
		}
		src = link.href;
		el = (post || aib.getPostEl(link).post).mp3Obj;
		if (nav.canPlayMP3) {
			if (!$q('audio[src="' + src + '"]', el)) {
				el.insertAdjacentHTML('beforeend',
					'<p><audio src="' + src + '" preload="none" controls></audio></p>');
				link = el.lastChild.firstChild;
				link.addEventListener('play', updater.addPlayingTag, false);
				link.addEventListener('pause', updater.removePlayingTag, false);
			}
		} else if (!$q('object[FlashVars*="' + src + '"]', el)) {
			el.insertAdjacentHTML('beforeend', '<object data="http://junglebook2007.narod.ru/audio/player.swf" type="application/x-shockwave-flash" wmode="transparent" width="220" height="16" FlashVars="playerID=1&amp;bg=0x808080&amp;leftbg=0xB3B3B3&amp;lefticon=0x000000&amp;rightbg=0x808080&amp;rightbghover=0x999999&amp;rightcon=0x000000&amp;righticonhover=0xffffff&amp;text=0xffffff&amp;slider=0x222222&amp;track=0xf5f5dc&amp;border=0x666666&amp;loader=0x7fc7ff&amp;loop=yes&amp;autostart=no&amp;soundFile=' + src + '"><br>');
		}
	}
}


// AJAX
// ===========================================================================================================

function ajaxLoad(url, loadForm, Fn, errFn) {
	return GM_xmlhttpRequest({
		'method': 'GET',
		'url': nav.fixLink(url),
		'onreadystatechange': function (xhr) {
			if (xhr.readyState !== 4) {
				return;
			}
			if (xhr.status !== 200) {
				if (errFn) {
					errFn(xhr.status, xhr.statusText, this);
				}
			} else if (Fn) {
				do {
					var el, text = xhr.responseText;
					if ((aib.futa ? /<!--gz-->$/ : /<\/html?>[\s\n\r]*$/).test(text)) {
						el = $DOM(text);
						if (!loadForm || (el = $q(aib.qDForm, el))) {
							Fn(el, this);
							break;
						}
					}
					if (errFn) {
						errFn(0, Lng.errCorruptData[lang], this);
					}
				} while (false);
			}
			loadForm = Fn = errFn = null;
		}
	});;
}

function getJsonPosts(url, Fn) {
	GM_xmlhttpRequest({
		'method': 'GET',
		'url': nav.fixLink(url),
		'onreadystatechange': function (xhr) {
			if (xhr.readyState !== 4) {
				return;
			}
			if (xhr.status === 304) {
				closeAlert($id('de-alert-newposts'));
			} else {
				try {
					var json = JSON.parse(xhr.responseText);
				} catch(e) {
					Fn(1, e.toString(), null, this);
				} finally {
					if (json) {
						Fn(xhr.status, xhr.statusText, json, this);
					}
					Fn = null;
				}
			}
		}
	});
}

function loadFavorThread() {
	var post, el = this.parentNode,
		ifrm = $t('iframe', el),
		cont = $c('de-content', doc);
	if (ifrm) {
		$del(ifrm);
		cont.style.overflowY = 'auto';
		return;
	}
	if ((post = pByNum[el.getAttribute('de-num')]) && !post.hidden) {
		scrollTo(0, pageYOffset + post.el.getBoundingClientRect().top);
		return;
	}
	$del($id('de-iframe-fav'));
	$c('de-content', doc).style.overflowY = 'scroll';
	$alert(Lng.loading[lang], 'load-favthr', true);
	el.insertAdjacentHTML('beforeend', '<iframe name="de-iframe-fav" id="de-iframe-fav" src="' +
		$t('a', el).href + '" scrolling="no" style="display: block; border: none; width: ' +
		(doc.documentElement.clientWidth - 55) + 'px; height: 1px;">');
}

function loadPages(count) {
	var fun, i = pageNum,
		len = Math.min(aib.lastPage + 1, i + count),
		pages = [],
		loaded = 1;
	count = len - i;

	function onLoadOrError(idx, eCodeOrForm, eMsgOrXhr, maybeXhr) {
		if (typeof eCodeOrForm === 'number') {
			pages[idx] = $add('<div><center style="font-size: 2em">' +
				getErrorMessage(eCodeOrForm, eMsgOrXhr) + '</center><hr></div>');
		} else {
			pages[idx] = replacePost(eCodeOrForm);
		}
		if (loaded === count) {
			var el, df, j, parseThrs = Thread.parsed,
				threads = parseThrs ? [] : null;
			for (j in pages) {
				if (!pages.hasOwnProperty(j)) {
					continue;
				}
				if (j != pageNum) {
					dForm.insertAdjacentHTML('beforeend', '<center style="font-size: 2em">' +
						Lng.page[lang] + ' ' + j + '</center><hr>');
				}
				df = pages[j];
				if (parseThrs) {
					threads = parseThreadNodes(df, threads);
				}
				while (el = df.firstChild) {
					dForm.appendChild(el);
				}
			}
			if (!parseThrs) {
				threads = $Q(aib.qThread, dForm);
			}
			do {
				if (threads.length !== 0) {
					try {
						parseDelform(dForm, threads);
					} catch(e) {
						$alert(getPrettyErrorMessage(e), 'load-pages', true);
						break;
					}
					initDelformAjax();
					addDelformStuff(false);
					readUserPosts();
					readFavoritesPosts();
					$each($Q('input[type="password"]', dForm), function (pEl) {
						pr.dpass = pEl;
						pEl.value = Cfg.passwValue;
					});
					if (hKeys) {
						hKeys.clear(pageNum + count - 1);
					}
				}
				closeAlert($id('de-alert-load-pages'));
			} while (false);
			dForm.style.display = '';
			loaded = pages = count = null;
		} else {
			loaded++;
		}
	}

	$alert(Lng.loading[lang], 'load-pages', true);
	$each($Q('a[href^="blob:"]', dForm), function (a) {
		window.URL.revokeObjectURL(a.href);
	});
	Pview.clearCache();
	isExpImg = false;
	pByNum = Object.create(null);
	Thread.tNums = [];
	Post.hiddenNums = [];
	if (Attachment.viewer) {
		Attachment.viewer.close(null);
		Attachment.viewer = null;
	}
	dForm.style.display = 'none';
	dForm.innerHTML = '';
	if (pr.isQuick) {
		if (pr.file) {
			pr.delFilesUtils();
		}
		pr.txta.value = '';
	}
	while (i < len) {
		fun = onLoadOrError.bind(null, i);
		ajaxLoad(aib.getPageUrl(brd, i++), true, fun, fun);
	}
}

function infoLoadErrors(eCode, eMsg, newPosts) {
	if (eCode === 200 || eCode === 304) {
		closeAlert($id('de-alert-newposts'));
	} else if (eCode === 0) {
		$alert(eMsg || Lng.noConnect[lang], 'newposts', false);
	} else {
		$alert(Lng.thrNotFound[lang] + TNum + '): \n' + getErrorMessage(eCode, eMsg), 'newposts', false);
		if (newPosts !== -1) {
			doc.title = '{' + eCode + '} ' + doc.title;
		}
	}
}


// SPELLS
// ===========================================================================================================

function Spells(read) {
	if (read) {
		this._read(true);
	} else {
		this.disable(false);
	}
}
Spells.names = [
	'words', 'exp', 'exph', 'imgn', 'ihash', 'subj', 'name', 'trip', 'img', 'sage', 'op', 'tlen',
	'all', 'video', 'wipe', 'num', 'vauthor'
];
Spells.needArg = [
	/* words */ true, /* exp */ true, /* exph */ true, /* imgn */ true, /* ihash */ true,
	/* subj */ false, /* name */ true, /* trip */ false, /* img */ false, /* sage */ false,
	/* op */ false, /* tlen */ false, /* all */ false, /* video */ false, /* wipe */ false,
	/* num */ true, /* vauthor */ true
];
Spells.decompileSpell = function (type, neg, val, scope) {
	var temp, temp_, spell = (neg ? '!#' : '#') + Spells.names[type] + (scope ? '[' +
		scope[0] + (scope[1] ? ',' + (scope[1] === -1 ? '' : scope[1]) : '') + ']' : '');
	if (!val) {
		return spell;
	}
	// #img
	if (type === 8) {
		return spell + '(' + (val[0] === 2 ? '>' : val[0] === 1 ? '<' : '=') +
			(val[1] ? val[1][0] + (val[1][1] === val[1][0] ? '' : '-' + val[1][1]) : '') +
			(val[2] ? '@' + val[2][0] + (val[2][0] === val[2][1] ? '' : '-' + val[2][1]) + 'x' +
			val[2][2] + (val[2][2] === val[2][3] ? '' : '-' + val[2][3]) : '') + ')';
	}
	// #wipe
	else if (type === 14) {
		if (val === 0x3F) {
			return spell;
		}
		temp = [];
		(val & 1) && temp.push('samelines');
		(val & 2) && temp.push('samewords');
		(val & 4) && temp.push('longwords');
		(val & 8) && temp.push('symbols');
		(val & 16) && temp.push('capslock');
		(val & 32) && temp.push('numbers');
		(val & 64) && temp.push('whitespace');
		return spell + '(' + temp.join(',') + ')';
	}
	// #num, #tlen
	else if (type === 15 || type === 11) {
		if ((temp = val[1].length - 1) !== -1) {
			for (temp_ = []; temp >= 0; temp--) {
				temp_.push(val[1][temp][0] + '-' + val[1][temp][1]);
			}
			temp_.reverse();
		}
		spell += '(';
		if (val[0].length !== 0) {
			spell += val[0].join(',') + (temp_ ? ',' : '');
		}
		if (temp_) {
			spell += temp_.join(',');
		}
		return spell + ')';
	}
	// #words, #name, #trip, #vauthor
	else if (type === 0 || type === 6 || type === 7 || type === 16) {
		return spell + '(' + val.replace(/\)/g, '\\)') + ')';
	} else {
		return spell + '(' + String(val) + ')';
	}
};
Spells.prototype = {
	_optimizeSpells: function (spells) {
		var i, j, len, flags, type, spell, scope, neg, parensSpells, lastSpell = -1,
			newSpells = [];
		for (i = 0, len = spells.length; i < len; ++i) {
			spell = spells[i];
			flags = spell[0];
			type = flags & 0xFF;
			neg = (flags & 0x100) !== 0;
			if (type === 0xFF) {
				parensSpells = this._optimizeSpells(spell[1]);
				if (parensSpells) {
					if (parensSpells.length !== 1) {
						newSpells.push([flags, parensSpells]);
						lastSpell++;
						continue;
					} else if ((parensSpells[0][0] & 0xFF) !== 12) {
						newSpells.push([(parensSpells[0][0] | (flags & 0x200)) ^ (flags & 0x100),
							parensSpells[0][1]]);
						lastSpell++;
						continue;
					}
					flags = parensSpells[0][0];
					neg = !(neg ^ ((flags & 0x100) !== 0));
				}
			} else {
				scope = spell[2];
				if (!scope || (scope[0] === brd &&
					(scope[1] === -1 ? !TNum : (!scope[1] || scope[1] === TNum))))
				{
					if (type === 12) {
						neg = !neg;
					} else {
						newSpells.push([flags, spell[1]]);
						lastSpell++;
						continue;
					}
				}
			}
			for (j = lastSpell; j >= 0 && (((newSpells[j][0] & 0x200) !== 0) ^ neg); --j) {}
			if (j !== lastSpell) {
				newSpells = newSpells.slice(0, j + 1);
				lastSpell = j;
			}
			if (neg && j !== -1) {
				newSpells[j][0] &= 0x1FF;
			}
			if (((flags & 0x200) !== 0) ^ neg) {
				break;
			}
		}
		return lastSpell === -1 ? neg ? [[12, '']] : null : newSpells;
	},
	_initSpells: function (data) {
		if (data) {
			data.forEach(function initExps(item) {
				var val = item[1];
				if (val) {
					switch (item[0] & 0xFF) {
					case 1:
					case 2:
					case 3:
					case 5:
					case 13: item[1] = toRegExp(val, true); break;
					case 0xFF: val.forEach(initExps);
					}
				}
			});
		}
		return data;
	},
	_decompileScope: function (scope, indent) {
		var spell, type, temp, str, dScope = [], hScope = false, i = 0, j = 0, len = scope.length;
		for (; i < len; i++, j++) {
			spell = scope[i];
			type = spell[0] & 0xFF;
			if (type === 0xFF) {
				hScope = true;
				temp = this._decompileScope(spell[1], indent + '    ');
				if (temp[1]) {
					str = ((spell[0] & 0x100) ? '!(\n' : '(\n') + indent + '    ' +
						temp[0].join('\n' + indent + '    ') + '\n' + indent + ')';
					if (j === 0) {
						dScope[0] = str;
					} else {
						dScope[--j] += ' ' + str;
					}
				} else {
					dScope[j] = ((spell[0] & 0x100) ? '!(' : '(') + temp[0].join(' ') + ')';
				}
			} else {
				dScope[j] = Spells.decompileSpell(type, spell[0] & 0x100, spell[1], spell[2]);
			}
			if (i !== len - 1) {
				dScope[j] += (spell[0] & 0x200) ? ' &' : ' |';
			}
		}
		return [dScope, dScope.length > 2 || hScope];
	},
	_decompileSpells: function () {
		var str, reps, oreps, data = this._data;
		if (!data) {
			this._read(false);
			if (!(data = this._data)) {
				return this._list = '';
			}
		}
		str = data[1] ? this._decompileScope(data[1], '')[0].join('\n') : '';
		reps = data[2];
		oreps = data[3];
		if (reps || oreps) {
			if (str) {
				str += '\n\n';
			}
			reps && reps.forEach(function (rep) {
				str += this._decompileRep(rep, false) + '\n';
			}.bind(this));
			oreps && oreps.forEach(function (orep) {
				str += this._decompileRep(orep, true) + '\n';
			}.bind(this));
			str = str.substr(0, str.length - 1);
		}
		this._data = null;
		return this._list = str;
	},
	_decompileRep: function (rep, isOrep) {
		return (isOrep ? '#outrep' : '#rep') +
			(rep[0] ? '[' + rep[0] + (rep[1] ? ',' + (rep[1] === -1 ? '' : rep[1]) : '') + ']' : '') +
			'(' + rep[2] + ',' + rep[3].replace(/\)/g, '\\)') + ')';
	},
	_optimizeReps: function (data) {
		if (data) {
			var nData = [];
			data.forEach(function (temp) {
				if (!temp[0] || (temp[0] === brd && (temp[1] === -1 ? !TNum : !temp[1] || temp[1] === TNum))) {
					nData.push([temp[2], temp[3]]);
				}
			});
			return nData.length === 0 ? false : nData;
		}
		return false;
	},
	_initReps: function (data) {
		if (data) {
			for (var i = data.length - 1; i >= 0; i--) {
				data[i][0] = toRegExp(data[i][0], false);
			}
		}
		return data;
	},
	_init: function (spells, reps, outreps) {
		this._spells = this._initSpells(spells);
		this._sLength = spells && spells.length;
		this._reps = this._initReps(reps);
		this._outreps = this._initReps(outreps);
		this.enable = !!this._spells;
		this.haveReps = !!reps;
		this.haveOutreps = !!outreps;
	},
	_read: function (init) {
		var spells, data;
		try {
			spells = JSON.parse(Cfg.spells);
			data = JSON.parse(sesStorage['de-spells-' + brd + TNum]);
		} catch(e) {}
		if (data && spells && data[0] === spells[0]) {
			this._data = spells;
			if (init) {
				this.hash = data[0];
				this._init(data[1], data[2], data[3]);
			}
			return;
		}
		if (!spells) {
			spells = this.parseText('#wipe(samelines,samewords,longwords,numbers,whitespace)');
		}
		if (init) {
			this.update(spells, false, false);
		} else {
			this._data = spells;
		}
	},
	_asyncSpellComplete: function (interp) {
		this.hasNumSpell |= interp.hasNumSpell;
		this._asyncJobs--;
		this.end(null);
	},
	_asyncJobs: 0,
	_completeFns: [],
	_hasComplFns: false,
	_data: null,
	_list: '',

	hash: 0,
	hasNumSpell: false,
	enable: false,
	get list() {
		return this._list || this._decompileSpells();
	},
	addCompleteFunc: function (Fn) {
		this._completeFns.push(Fn);
		this._hasComplFns = true;
	},
	parseText: function (str) {
		var codeGen = new SpellsCodegen(str),
			data = codeGen.generate();
		if (codeGen.hasError) {
			$alert(Lng.error[lang] + ': ' + codeGen.error, 'help-err-spell', false);
		} else if (data) {
			if (data[0] && Cfg.sortSpells) {
				this.sort(data[0]);
			}
			return [Date.now(), data[0], data[1], data[2]];
		}
		return null;
	},
	sort: function (sp) {
		// Wraps AND-spells with brackets for proper sorting
		for (var i = 0, len = sp.length-1; i < len; i++) {
			if (sp[i][0] > 0x200) {
				var temp = [0xFF, []];
				do {
					temp[1].push(sp.splice(i, 1)[0]);
					len--;
				} while (sp[i][0] > 0x200);
				temp[1].push(sp.splice(i, 1)[0]);
				sp.splice(i, 0, temp);
			}
		}
		sp = sp.sort();
		for (var i = 0, len = sp.length-1; i < len; i++) {
			// Removes duplicates and weaker spells
			if (sp[i][0] === sp[i+1][0] && sp[i][1] <= sp[i+1][1] && sp[i][1] >= sp[i+1][1] &&
			  (sp[i][2] === null || // Stronger spell with 3 parameters
			   sp[i][2] === undefined || // Equal spells with 2 parameters
			  (sp[i][2] <= sp[i+1][2] && sp[i][2] >= sp[i+1][2])))
			{ // Equal spells with 3 parameters
				sp.splice(i+1, 1);
				i--;
				len--;
			// Moves brackets to the end of the list
			} else if (sp[i][0] === 0xFF) {
				sp.push(sp.splice(i, 1)[0]);
				i--;
				len--;
			}
		}
	},
	update: function (data, sync, isHide) {
		var spells = data[1] ? this._optimizeSpells(data[1]) : false,
			reps = this._optimizeReps(data[2]),
			outreps = this._optimizeReps(data[3]);
		saveCfg('spells', JSON.stringify(data));
		sesStorage['de-spells-' + brd + TNum] = JSON.stringify([data[0], spells, reps, outreps]);
		this._data = data;
		this._list = '';
		this.hash = data[0];
		if (sync) {
			locStorage['__de-spells'] = JSON.stringify({
				'hide': (!!this.list && !!isHide),
				'data': data
			});
			locStorage.removeItem('__de-spells');
		}
		this._init(spells, reps, outreps);
	},
	setSpells: function (spells, sync) {
		this.update(spells, sync, Cfg.hideBySpell);
		if (Cfg.hideBySpell) {
			for (var post = firstThr.op; post; post = post.next) {
				this.check(post);
			}
			this.end(savePosts);
		} else {
			this.enable = false;
		}
	},
	disable: function (sync) {
		this.enable = false;
		this._list = '';
		this._data = null;
		this.haveReps = this.haveOutreps = false;
		saveCfg('hideBySpell', false);
	},
	end: function (Fn) {
		if (this._asyncJobs === 0) {
			Fn && Fn();
			if (this._hasComplFns) {
				for (var i = 0, len = this._completeFns.length; i < len; ++i) {
					this._completeFns[i]();
				}
				this._completeFns = [];
				this._hasComplFns = false;
			}
		} else if (Fn) {
			this.addCompleteFunc(Fn);
		}
	},
	check: function (post) {
		if (!this.enable) {
			return 0;
		}
		var interp = new SpellsInterpreter(post, this._spells, this._sLength);
		if (interp.run()) {
			this.hasNumSpell |= interp.hasNumSpell;
			return interp.postHidden ? 1 : 0;
		}
		interp.setEndFn(this._asyncSpellComplete.bind(this));
		this._asyncJobs++;
		return 0;
	},
	replace: function (txt) {
		for (var i = 0, len = this._reps.length; i < len; i++) {
			txt = txt.replace(this._reps[i][0], this._reps[i][1]);
		}
		return txt;
	},
	outReplace: function (txt) {
		for (var i = 0, len = this._outreps.length; i < len; i++) {
			txt = txt.replace(this._outreps[i][0], this._outreps[i][1]);
		}
		return txt;
	},
	addSpell: function (type, arg, scope, isNeg, spells) {
		if (!spells) {
			if (!this._data) {
				this._read(false);
			}
			spells = this._data || [Date.now(), [], false, false];
		}
		var idx, sScope = String(scope),
			sArg = String(arg);
		if (spells[1]) {
			spells[1].some(scope && isNeg ? function (spell, i) {
				var data;
				if (spell[0] === 0xFF && ((data = spell[1]) instanceof Array) && data.length === 2 &&
					data[0][0] === 0x20C && data[1][0] === type && data[1][2] == null &&
					String(data[1][1]) === sArg && String(data[0][2]) === sScope)
				{
					idx = i;
					return true;
				}
				return (spell[0] & 0x200) !== 0;
			} : function (spell, i) {
				if (spell[0] === type && String(spell[1]) === sArg && String(spell[2]) === sScope) {
					idx = i;
					return true;
				}
				return (spell[0] & 0x200) !== 0;
			});
		} else {
			spells[1] = [];
		}
		if (typeof idx !== 'undefined') {
			spells[1].splice(idx, 1);
		} else if (scope && isNeg) {
			spells[1].splice(0, 0, [0xFF, [[0x20C, '', scope], [type, arg, void 0]], void 0]);
		} else {
			spells[1].splice(0, 0, [type, arg, scope]);
		}
		this.update(spells, true, true);
		idx = null;
	}
};

function SpellsCodegen(sList) {
	this._line = 1;
	this._col = 1;
	this._sList = sList;
	this.hasError = false;
}
SpellsCodegen.prototype = {
	TYPE_UNKNOWN: 0,
	TYPE_ANDOR: 1,
	TYPE_NOT: 2,
	TYPE_SPELL: 3,
	TYPE_PARENTHESES: 4,
	TYPE_REPLACER: 5,

	generate: function () {
		return this._sList ? this._generate(this._sList, false) : null;
	},
	get error() {
		if (!this.hasError) {
			return '';
		}
		return (this._errMsgArg ? this._errMsg.replace('%s', this._errMsgArg) : this._errMsg) +
			Lng.seRow[lang] + this._line + Lng.seCol[lang] + this._col + ')';
	},

	_errMsg: '',
	_errMsgArg: null,
	_generate: function (sList, inParens) {
		var res, name, i = 0,
			len = sList.length,
			spells = [],
			reps = [],
			outreps = [],
			lastType = this.TYPE_UNKNOWN,
			hasReps = false;
		for (; i < len; i++, this._col++) {
			switch (sList[i]) {
			case '\n':
				this._line++;
				this._col = 0;
			case '\r':
			case ' ': continue;
			case '#':
				name = '';
				i++;
				this._col++;
				while ((sList[i] >= 'a' && sList[i] <= 'z') || (sList[i] >= 'A' && sList[i] <= 'Z')) {
					name += sList[i].toLowerCase();
					i++;
					this._col++;
				}
				if (name === 'rep' || name === 'outrep') {
					if (!hasReps) {
						if (inParens) {
							this._col -= 1 + name.length;
							this._setError(Lng.seRepsInParens[lang], '#' + name);
							return null;
						}
						if (lastType === this.TYPE_ANDOR || lastType === this.TYPE_NOT) {
							i -= 1 + name.length;
							this._col -= 1 + name.length;
							lookBack:
							while (i >= 0) {
								switch (sList[i]) {
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
					if (!res) {
						return null;
					}
					if (name === 'rep') {
						reps.push(res[1]);
					} else {
						outreps.push(res[1]);
					}
					i += res[0] - 1;
					this._col += res[0] - 1;
					lastType = this.TYPE_REPLACER;
				} else {
					if (lastType === this.TYPE_SPELL || lastType === this.TYPE_PARENTHESES) {
						this._setError(Lng.seMissOp[lang], null);
						return null;
					}
					res = this._doSpell(name, sList.substr(i), lastType === this.TYPE_NOT)
					if (!res) {
						return null;
					}
					i += res[0] - 1;
					this._col += res[0] - 1;
					spells.push(res[1]);
					lastType = this.TYPE_SPELL;
				}
				break;
			case '(':
				if (hasReps) {
					this._setError(Lng.seUnexpChar[lang], '(');
					return null;
				}
				if (lastType === this.TYPE_SPELL || lastType === this.TYPE_PARENTHESES) {
					this._setError(Lng.seMissOp[lang], null);
					return null;
				}
				res = this._generate(sList.substr(i + 1), true);
				if (!res) {
					return null;
				}
				i += res[0] + 1;
				spells.push([lastType === this.TYPE_NOT ? 0x1FF : 0xFF, res[1]]);
				lastType = this.TYPE_PARENTHESES;
				break;
			case '|':
			case '&':
				if (hasReps) {
					this._setError(Lng.seUnexpChar[lang], sList[i]);
					return null;
				}
				if (lastType !== this.TYPE_SPELL && lastType !== this.TYPE_PARENTHESES) {
					this._setError(Lng.seMissSpell[lang], null);
					return null;
				}
				if (sList[i] === '&') {
					spells[spells.length - 1][0] |= 0x200;
				}
				lastType = this.TYPE_ANDOR;
				break;
			case '!':
				if (hasReps) {
					this._setError(Lng.seUnexpChar[lang], '!');
					return null;
				}
				if (lastType !== this.TYPE_ANDOR && lastType !== this.TYPE_UNKNOWN) {
					this._setError(Lng.seMissOp[lang], null);
					return null;
				}
				lastType = this.TYPE_NOT;
				break;
			case ')':
				if (hasReps) {
					this._setError(Lng.seUnexpChar[lang], ')');
					return null;
				}
				if (lastType === this.TYPE_ANDOR || lastType === this.TYPE_NOT) {
					this._setError(Lng.seMissSpell[lang], null);
					return null;
				}
				if (inParens) {
					return [i, spells];
				}
			default:
				this._setError(Lng.seUnexpChar[lang], sList[i]);
				return null;
			}
		}
		if (inParens) {
			this._setError(Lng.seMissClBkt[lang], null);
			return null;
		}
		if (lastType !== this.TYPE_SPELL && lastType !== this.TYPE_PARENTHESES &&
		   lastType !== this.TYPE_REPLACER)
		{
			this._setError(Lng.seMissSpell[lang], null);
			return null;
		}
		if (reps.length === 0) {
			reps = false;
		}
		if (outreps.length === 0) {
			outreps = false;
		}
		return [spells, reps, outreps];
	},
	_getScope: function (str) {
		var scope, m = str.match(/^\[([a-z0-9\/]+)(?:(,)|,(\s*[0-9]+))?\]/);
		if (m) {
			return [m[0].length, [m[1], m[3] ? m[3] : m[2] ? -1 : false]];
		}
		return null;
	},
	_getRegex: function (str, haveComma) {
		var val, m = str.match(/^\((\/.*?[^\\]\/[igm]*)(?:\)|\s*(,))/);
		if (m) {
			if (haveComma !== !!m[2]) {
				return null;
			}
			val = m[1];
			try {
				toRegExp(val, true);
			} catch(e) {
				this._setError(Lng.seErrRegex[lang], val);
				return null;
			}
			return [m[0].length, val];
		}
		return null;
	},
	_getText: function (str, haveBracket) {
		var m = str.match(/^(\()?(.*?[^\\])\)/);
		if (m) {
			if (haveBracket !== !!m[1]) {
				return null;
			}
			return [m[0].length, m[2].replace(/\\\)/g, ')')];
		}
		return null;
	},
	_doRep: function (name, str) {
		var regex, val, scope = this._getScope(str);
		if (scope) {
			str = str.substring(scope[0]);
		} else {
			scope = [0, ['', '']];
		}
		regex = this._getRegex(str, true);
		if (regex) {
			str = str.substring(regex[0]);
			if (str[0] === ')') {
				return [regex[0] + scope[0] + 1, [scope[1][0], scope[1][1], regex[1], '']];
			}
			val = this._getText(str, false);
			if (val) {
				return [val[0] + regex[0] + scope[0], [scope[1][0], scope[1][1], regex[1], val[1]]];
			}
		}
		this._setError(Lng.seSyntaxErr[lang], name);
		return null;
	},
	_doSpell: function (name, str, isNeg) {
		var scope, m, spellType, val, temp, i = 0,
			scope = null,
			spellIdx = Spells.names.indexOf(name);
		if (spellIdx === -1) {
			this._setError(Lng.seUnknown[lang], name);
			return null;
		}
		temp = this._getScope(str);
		if (temp) {
			i += temp[0];
			str = str.substring(temp[0]);
			scope = temp[1];
		}
		spellType = isNeg ? spellIdx | 0x100 : spellIdx;
		if (str[0] !== '(' || str[1] === ')') {
			if (Spells.needArg[spellIdx]) {
				this._setError(Lng.seMissArg[lang], name);
				return null;
			}
			return [str[0] === '(' ? i + 2 : i, [spellType, spellIdx === 14 ? 0x3F : '', scope]];
		}
		switch (spellIdx) {
		// #ihash
		case 4:
			m = str.match(/^\((\d+)\)/);
			if (+m[1] === +m[1]) {
				return [i + m[0].length, [spellType, +m[1], scope]];
			}
			break;
		// #img
		case 8:
			m = str.match(/^\(([><=])(?:(\d+(?:\.\d+)?)(?:-(\d+(?:\.\d+)?))?)?(?:@(\d+)(?:-(\d+))?x(\d+)(?:-(\d+))?)?\)/);
			if (m && (m[2] || m[4])) {
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
			if (m) {
				val = m[1].split(/, */).reduce(function (val, str) {
					switch (str) {
					case 'samelines': return val |= 1;
					case 'samewords': return val |= 2;
					case 'longwords': return val |= 4;
					case 'symbols': return val |= 8;
					case 'capslock': return val |= 16;
					case 'numbers': return val |= 32;
					case 'whitespace': return val |= 64;
					default: return -1;
					}
				}, 0);
				if (val !== -1) {
					return [i + m[0].length, [spellType, val, scope]];
				}
			}
			break;
		// #tlen, #num
		case 11:
		case 15:
			m = str.match(/^\(([\d-, ]+)\)/);
			if (m) {
				m[1].split(/, */).forEach(function (v) {
					if (v.contains('-')) {
						var nums = v.split('-');
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
			if (temp) {
				return [i + temp[0], [spellType, temp[1], scope]];
			}
			break;
		// #sage, #op, #all, #trip, #name, #words, #vauthor
		default:
			temp = this._getText(str, true);
			if (temp) {
				return [i + temp[0], [spellType, spellIdx === 0 ? temp[1].toLowerCase() : temp[1], scope]];
			}
		}
		this._setError(Lng.seSyntaxErr[lang], name);
		return null;
	},
	_setError: function (msg, arg) {
		this.hasError = true;
		this._errMsg = msg;
		this._errMsgArg = arg;
	}
};

function SpellsInterpreter(post, spells, length) {
	this._post = post;
	this._ctx = [length, spells, 0];
	this._deep = 0;
}
SpellsInterpreter.prototype = {
	hasNumSpell: false,
	postHidden: false,
	run: function () {
		var rv, type, val, i = this._ctx.pop(),
			scope = this._ctx.pop(),
			len = this._ctx.pop();
		while (true) {
			if (i < len) {
				type = scope[i][0] & 0xFF;
				if (type === 0xFF) {
					this._deep++;
					this._ctx.push(len, scope, i);
					scope = scope[i][1];
					len = scope.length;
					i = 0;
					continue;
				}
				val = this._runSpell(type, scope[i][1]);
				if (this._asyncWait) {
					this._ctx.push(len, scope, i, scope[i][0]);
					return false;
				}
				rv = this._checkRes(scope[i][0], val);
				if (rv === null) {
					i++;
					continue;
				}
				this._lastSpellIdx = i;
			} else {
				this._lastSpellIdx = i -= 1;
				rv = false;
			}
			if (this._deep !== 0) {
				this._deep--;
				i = this._ctx.pop();
				scope = this._ctx.pop();
				len = this._ctx.pop();
				rv = this._checkRes(scope[i][0], rv);
				if (rv === null) {
					i++;
					continue;
				}
			}
			if (rv) {
				this._post.spellHide(this._getMsg(scope[i]));
				this.postHidden = true;
			} else if (!this._post.deleted) {
				sVis[this._post.count] = 1;
			}
			return true;
		}
	},
	setEndFn: function (Fn) {
		this._endFn = Fn;
	},

	_asyncWait: false,
	_endFn: null,
	_lastSpellIdx: 0,
	_wipeMsg: '',
	_asyncContinue: function (val) {
		this._asyncWait = false;
		var temp, rv = this._checkRes(this._ctx.pop(), val);
		if (rv === null) {
			if (!this.run()) {
				return;
			}
		} else if (rv) {
			temp = this._ctx.pop();
			this._post.spellHide(this._getMsg(this._ctx.pop()[temp - 1]));
			this.postHidden = true;
		} else if (!this._post.deleted) {
			sVis[this._post.count] = 1;
		}
		if (this._endFn) {
			this._endFn(this);
		}
	},
	_checkRes: function (flags, val) {
		if ((flags & 0x100) !== 0) {
			val = !val;
		}
		if ((flags & 0x200) !== 0) {
			if (!val) {
				return false;
			}
		} else if (val) {
			return true;
		}
		return null;
	},
	_getMsg: function (spell) {
		var neg = spell[0] & 0x100,
			type = spell[0] & 0xFF,
			val = spell[1];
		if (type === 0xFF) {
			return this._getMsg(val[this._lastSpellIdx]);
		}
		if (type === 14) {
			return (neg ? '!#wipe' : '#wipe') + (Spells._lastWipeMsg ? ': ' + Spells._lastWipeMsg : '');
		} else {
			return Spells.decompileSpell(type, neg, val, spell[2]);
		}
	},
	_runSpell: function (spellId, val) {
		switch (spellId) {
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
	},
	_words: function (val) {
		return this._post.text.toLowerCase().contains(val) || this._post.subj.toLowerCase().contains(val);
	},
	_exp: function (val) {
		return val.test(this._post.text);
	},
	_exph: function (val) {
		return val.test(this._post.html);
	},
	_imgn: function (val) {
		for (var i = 0, imgs = this._post.images, len = imgs.length; i < len; ++i) {
			if (val.test(imgs[i].info)) {
				return true;
			}
		}
		return false;
	},
	_ihash: function (val) {
		for (var i = 0, imgs = this._post.images, len = imgs.length; i < len; ++i) {
			if (imgs[i].hash === val) {
				return true;
			}
		}
		if (this._post.hashImgsBusy === 0) {
			return false;
		}
		this._post.hashHideFun = this._ihash_helper.bind(this, val);
		this._asyncWait = true;
		return false;
	},
	_ihash_helper: function (val, hash) {
		if (val === hash) {
			this._post.hashHideFun = null;
			this._asyncContinue(true);
		} else if (this._post.hashImgsBusy === 0) {
			this.hashHideFun = null;
			this._asyncContinue(false);
		}
	},
	_subj: function (val) {
		var pSubj = this._post.subj;
		return pSubj ? !val || val.test(pSubj) : false;
	},
	_name: function (val) {
		var pName = this._post.posterName;
		return pName ? !val || pName.contains(val) : false;
	},
	_trip: function (val) {
		var pTrip = this._post.posterTrip;
		return pTrip ? !val || pTrip.contains(val) : false;
	},
	_img: function (val) {
		var temp, w, h, hide, img, i, imgs = this._post.images,
			len = imgs.length;
		if (!val) {
			return len !== 0;
		}
		for (i = 0; i < len; ++i) {
			img = imgs[i];
			if (temp = val[1]) {
				w = img.weight;
				switch (val[0]) {
				case 0: hide = w >= temp[0] && w <= temp[1]; break;
				case 1: hide = w < temp[0]; break;
				case 2: hide = w > temp[0];
				}
				if (!hide) {
					continue;
				} else if (!val[2]) {
					return true;
				}
			}
			if (temp = val[2]) {
				w = img.width;
				h = img.height;
				switch (val[0]) {
				case 0:
					if (w >= temp[0] && w <= temp[1] && h >= temp[2] && h <= temp[3]) {
						return true
					}
					break;
				case 1:
					if (w < temp[0] && h < temp[3]) {
						return true
					}
					break;
				case 2:
					if (w > temp[0] && h > temp[3]) {
						return true
					}
				}
			}
		}
		return false;
	},
	_sage: function (val) {
		return this._post.sage;
	},
	_op: function (val) {
		return this._post.isOp;
	},
	_tlen: function (val) {
		var text = this._post.text;
		return !val ? !!text : this._tlenNum_helper(val, text.replace(/\n/g, '').length);
	},
	_all: function (val) {
		return true;
	},
	_video: function (val) {
		return this._videoVauthor(val, false);
	},
	_wipe: function (val) {
		var arr, len, i, j, n, x, keys, pop, capsw, casew, _txt, txt = this._post.text;
		// (1 << 0): samelines
		if (val & 1) {
			arr = txt.replace(/>/g, '').split(/\s*\n\s*/);
			if ((len = arr.length) > 5) {
				arr.sort();
				for (i = 0, n = len / 4; i < len;) {
					x = arr[i];
					j = 0;
					while (arr[i++] === x) {
						j++;
					}
					if (j > 4 && j > n && x) {
						this._wipeMsg = 'same lines: "' + x.substr(0, 20) + '" x' + (j + 1);
						return true;
					}
				}
			}
		}
		// (1 << 1): samewords
		if (val & 2) {
			arr = txt.replace(/[\s\.\?\!,>]+/g, ' ').toUpperCase().split(' ');
			if ((len = arr.length) > 3) {
				arr.sort();
				for (i = 0, n = len / 4, keys = 0, pop = 0; i < len; keys++) {
					x = arr[i];
					j = 0;
					while (arr[i++] === x) {
						j++;
					}
					if (len > 25) {
						if (j > pop && x.length > 2) {
							pop = j;
						}
						if (pop >= n) {
							this._wipeMsg = 'same words: "' + x.substr(0, 20) + '" x' + (pop + 1);
							return true;
						}
					}
				}
				x = keys / len;
				if (x < 0.25) {
					this._wipeMsg = 'uniq words: ' + (x * 100).toFixed(0) + '%';
					return true;
				}
			}
		}
		// (1 << 2): longwords
		if (val & 4) {
			arr = txt.replace(/https*:\/\/.*?(\s|$)/g, '').replace(/[\s\.\?!,>:;-]+/g, ' ').split(' ');
			if (arr[0].length > 50 || ((len = arr.length) > 1 && arr.join('').length / len > 10)) {
				this._wipeMsg = 'long words';
				return true;
			}
		}
		// (1 << 3): symbols
		if (val & 8) {
			_txt = txt.replace(/\s+/g, '');
			if ((len = _txt.length) > 30 &&
				(x = _txt.replace(/[0-9a-zа-я\.\?!,]/ig, '').length / len) > 0.4)
			{
				this._wipeMsg = 'specsymbols: ' + (x * 100).toFixed(0) + '%';
				return true;
			}
		}
		// (1 << 4): capslock
		if (val & 16) {
			arr = txt.replace(/[\s\.\?!;,-]+/g, ' ').trim().split(' ');
			if ((len = arr.length) > 4) {
				for (i = 0, n = 0, capsw = 0, casew = 0; i < len; i++) {
					x = arr[i];
					if ((x.match(/[a-zа-я]/ig) || []).length < 5) {
						continue;
					}
					if ((x.match(/[A-ZА-Я]/g) || []).length > 2) {
						casew++;
					}
					if (x === x.toUpperCase()) {
						capsw++;
					}
					n++;
				}
				if (capsw / n >= 0.3 && n > 4) {
					this._wipeMsg = 'CAPSLOCK: ' + capsw / arr.length * 100 + '%';
					return true;
				} else if (casew / n >= 0.3 && n > 8) {
					this._wipeMsg = 'cAsE words: ' + casew / arr.length * 100 + '%';
					return true;
				}
			}
		}
		// (1 << 5): numbers
		if (val & 32) {
			_txt = txt.replace(/\s+/g, ' ').replace(/>>\d+|https*:\/\/.*?(?: |$)/g, '');
			if ((len = _txt.length) > 30 && (x = (len - _txt.replace(/\d/g, '').length) / len) > 0.4) {
				this._wipeMsg = 'numbers: ' + Math.round(x * 100) + '%';
				return true;
			}
		}
		// (1 << 5): whitespace
		if (val & 64) {
			if (/(?:\n\s*){5}/i.test(txt)) {
				this._wipeMsg = 'whitespace';
				return true;
			}
		}
		return false;
	},
	_num: function (val) {
		return this._tlenNum_helper(val, this._post.count + 1);
	},
	_tlenNum_helper: function (val, num) {
		var i, arr;
		for (arr = val[0], i = arr.length - 1; i >= 0; --i) {
			if (arr[i] === num) {
				return true;
			}
		}
		for (arr = val[1], i = arr.length - 1; i >= 0; --i) {
			if (num >= arr[i][0] && num <= arr[i][1]) {
				return true;
			}
		}
		return false;
	},
	_vauthor: function (val) {
		return this._videoVauthor(val, true);
	},
	_videoVauthor: function (val, isAuthorSpell) {
		if (!val) {
			return !!this._post.hasYTube;
		}
		if (!this._post.hasYTube || !Cfg.YTubeTitles) {
			return false;
		}
		var i, data, len;
		for (i = 0, data = this._post.ytData, len = data.length; i < len; ++i) {
			if (isAuthorSpell ? val === data[i][1] : val.test(data[i][0])) {
				return true;
			}
		}
		if (this._post.ytLinksLoading === 0) {
			return false;
		}
		this._post.ytHideFun = this._videoVauthor_helper.bind(this, isAuthorSpell, val);
		this._asyncWait = true;
		return false;
	},
	_videoVauthor_helper: function (isAuthorSpell, val, data) {
		if (isAuthorSpell ? val === data[1] : val.test(data[0])) {
			this._post.ytHideFun = null;
			this._asyncContinue(true);
		} else if (this._post.ytLinksLoading === 0) {
			this._post.ytHideFun = null;
			this._asyncContinue(false);
		}
	}
}

function disableSpells() {
	closeAlert($id('de-alert-help-err-spell'));
	if (spells.enable) {
		sVis = TNum ? '1'.repeat(firstThr.pcount).split('') : [];
		for (var post = firstThr.op; post; post = post.next) {
			if (post.spellHidden && !post.userToggled) {
				post.spellUnhide();
			}
		}
	}
}

function toggleSpells() {
	var temp, fld = $id('de-spell-edit'),
		val = fld.value;
	if (val && (temp = spells.parseText(val))) {
		disableSpells();
		spells.setSpells(temp, true);
		fld.value = spells.list;
	} else {
		if (val) {
			locStorage['__de-spells'] = '{"hide": false, "data": null}';
		} else {
			disableSpells();
			spells.disable();
			saveCfg('spells', '');
			locStorage['__de-spells'] = '{"hide": false, "data": ""}';
		}
		locStorage.removeItem('__de-spells');
		$q('input[info="hideBySpell"]', doc).checked = spells.enable = false;
	}
}

function addSpell(type, arg, isNeg) {
	var temp, fld = $id('de-spell-edit'),
		val = fld && fld.value,
		chk = $q('input[info="hideBySpell"]', doc);
	if (!val || (temp = spells.parseText(val))) {
		disableSpells();
		spells.addSpell(type, arg, TNum ? [brd, TNum] : null, isNeg, temp);
		val = spells.list;
		saveCfg('hideBySpell', !!val);
		if (val) {
			for (var post = firstThr.op; post; post = post.next) {
				spells.check(post);
			}
			spells.end(savePosts);
		} else {
			saveCfg('spells', '');
			spells.enable = false;
		}
		if (fld) {
			chk.checked = !!(fld.value = val);
		}
		return;
	}
	spells.enable = false;
	if (chk) {
		chk.checked = false;
	}
}


// POSTFORM
// ===========================================================================================================

function PostForm(form, ignoreForm, init, dc) {
	this.oeForm = $q('form[name="oeform"], form[action*="paint"]', dc);
	if (!ignoreForm && !form) {
		if (this.oeForm) {
			ajaxLoad(aib.getThrdUrl(brd, aib.getTNum(dForm)), false, function (dc, xhr) {
				pr = new PostForm($q(aib.qPostForm, dc), true, init, dc);
			}, function (eCode, eMsg, xhr) {
				pr = new PostForm(null, true, init, dc);
			});
		} else {
			this.form = null;
		}
		return;
	}
	function $x(path, root) {
		return dc.evaluate(path, root, null, 8, null).singleNodeValue;
	}
	var p = './/tr[not(contains(@style,"none"))]//input[not(@type="hidden") and ';
	this.tNum = TNum;
	this.form = form;
	this.cap = $q('input[type="text"][name*="aptcha"], div[id*="captcha"]', form);
	this.txta = $q('tr:not([style*="none"]) textarea:not([style*="display:none"])', form);
	this.subm = $q('tr input[type="submit"]', form);
	this.file = $q('tr input[type="file"]', form);
	if (this.file) {
		this.fileTd = $parent(this.file, 'TD');
	}
	this.passw = $q('tr input[type="password"]', form);
	this.dpass = $q('input[type="password"], input[name="password"]', dForm);
	this.name = $x(p + '(@name="field1" or @name="name" or @name="internal_n" or @name="nya1" or @name="akane")]', form);
	this.mail = $x(p + (
			aib._410 ? '@name="sage"]' :
			'(@name="field2" or @name="em" or @name="sage" or @name="email" or @name="nabiki" or @name="dont_bump")]'
		), form);
	this.subj = $x(p + '(@name="field3" or @name="sub" or @name="subject" or @name="internal_s" or @name="nya3" or @name="kasumi")]', form);
	this.video = $q('tr input[name="video"], tr input[name="embed"]', form);
	this.gothr = aib.qPostRedir && (p = $q(aib.qPostRedir, form)) && $parent(p, 'TR');
	if (init) {
		this._init();
	}
}
PostForm.setUserName = function () {
	var el = $q('input[info="nameValue"]', doc);
	if (el) {
		saveCfg('nameValue', el.value);
	}
	pr.name.value = Cfg.userName ? Cfg.nameValue : '';
};
PostForm.setUserPassw = function () {
	var el = $q('input[info="passwValue"]', doc);
	if (el) {
		saveCfg('passwValue', el.value);
	}
	(pr.dpass || {}).value = pr.passw.value = Cfg.passwValue;
};
PostForm.prototype = {
	fileObj: null,
	isHidden: false,
	isQuick: false,
	isTopForm: false,
	lastQuickPNum: -1,
	pForm: null,
	pArea: [],
	qArea: null,
	get fileImageTD() {
		var val = $t(aib.tiny ? 'th' : 'td', $parent(this.txta, 'TR'));
		val.innerHTML = '';
		Object.defineProperty(this, 'fileImageTD', { value: val });
		return val;
	},
	get rarInput() {
		var val = doc.body.appendChild($new('input', {'type': 'file', 'style': 'display: none;'}, null))
		Object.defineProperty(this, 'rarInput', { value: val });
		return val;
	},
	addTextPanel: function () {
		var i, len, tag, html, btns, tPanel = $id('de-txt-panel');
		if (!Cfg.addTextBtns) {
			$del(tPanel);
			return;
		}
		if (!tPanel) {
			tPanel = $new('span', {'id': 'de-txt-panel'}, {
				'click': this,
				'mouseover': this
			});
		}
		tPanel.style.cssFloat = Cfg.txtBtnsLoc ? 'none' : 'right';
		$after(Cfg.txtBtnsLoc ? $id('de-txt-resizer') || this.txta :
			aib._420 ? $c('popup', this.form) : this.subm, tPanel);
		for (html = '', i = 0, btns = aib.formButtons, len = btns.id.length; i < len; ++i) {
			tag = btns.tag[i];
			if (tag === '') {
				continue;
			}
			html += '<span id="de-btn-' + btns.id[i] + '" de-title="' + Lng.txtBtn[i][lang] +
				'" de-tag="' + tag + '"' + (btns.bb[i] ? 'de-bb' : '') + '>' + (
					Cfg.addTextBtns === 2 ?
						(i === 0 ? '[ ' : '') + '<a class="de-abtn" href="#">' + btns.val[i] +
						'</a>' + (i === len - 1 ? ' ]' : ' / ') :
					Cfg.addTextBtns === 3 ?
						'<input type="button" value="' + btns.val[i] + '" style="font-weight: bold;">' : ''
				) + '</span>';
		}
		tPanel.innerHTML = html;
	},
	delFilesUtils: function () {
		for (var inp = this.fileObj; inp; inp = inp.next) {
			inp.delUtils();
		}
	},
	eventFiles: function (clear) {
		var i, len, inp, els, el, last = null;
		for (i = 0, els = $Q('input[type="file"]', this.fileTd), len = els.length; i < len; ++i) {
			el = els[i];
			inp = el.obj;
			if (inp) {
				inp.prev = last;
				if (last) {
					last.next = inp;
				}
				last = inp;
			} else {
				el.obj = last = new FileInput(this, el, last);
				last.init(false);
				if (clear && el.files && el.files.length !== 0) {
					last.clear();
				}
			}
		}
		this.fileObj = els[0].obj;
	},
	handleEvent: function (e) {
		var x, start, end, scrtop, id, len, val, el = e.target;
		if (el.tagName !== 'SPAN') {
			el = el.parentNode;
		}
		id = el.id;
		if (id.startsWith('de-btn')) {
			if (e.type === 'mouseover') {
				if (id === 'de-btn-quote') {
					quotetxt = $txtSelect();
				}
				x = -1;
				if (hKeys) {
					switch (id.substr(7)) {
					case 'bold': x = 12; break;
					case 'italic': x = 13; break;
					case 'strike': x = 14; break;
					case 'spoil': x = 15; break;
					case 'code': x = 16; break;
					}
				}
				KeyEditListener.setTitle(el, x);
				return;
			}
			x = pr.txta;
			start = x.selectionStart;
			end = x.selectionEnd;
			if (id === 'de-btn-quote') {
				$txtInsert(x, '> ' + (start === end ? quotetxt : x.value.substring(start, end))
					.replace(/\n/gm, '\n> '));
			} else {
				scrtop = x.scrollTop;
				val = this._wrapText(el.hasAttribute('de-bb'), el.getAttribute('de-tag'),
					x.value.substring(start, end));
				len = start + val[0];
				x.value = x.value.substr(0, start) + val[1] + x.value.substr(end);
				x.setSelectionRange(len, len);
				x.focus();
				x.scrollTop = scrtop;
			}
			$pd(e);
			e.stopPropagation();
		}
	},
	get isVisible() {
		if (!this.isHidden && this.isTopForm && $q(':focus', this.pForm)) {
			var cr = this.pForm.getBoundingClientRect();
			return cr.bottom > 0 && cr.top < window.innerHeight;
		}
		return false;
	},
	get topCoord() {
		return this.pForm.getBoundingClientRect().top;
	},
	showQuickReply: function (post, pNum, closeReply, isNumClick) {
		var temp, tNum = post.tNum;
		if (!this.isQuick) {
			this.isQuick = true;
			this.setReply(true, false);
			$t('a', this._pBtn[+this.isTopForm]).className =
				'de-abtn de-parea-btn-' + (TNum ? 'reply' : 'thrd');
			if (!TNum && !aib.kus && !aib.dobr && !aib.mak) {
				if (this.oeForm) {
					$del($q('input[name="oek_parent"]', this.oeForm));
					this.oeForm.insertAdjacentHTML('afterbegin', '<input type="hidden" value="' +
						tNum + '" name="oek_parent">');
				}
				if (this.form) {
					$del($q('#thr_id, input[name="parent"]', this.form));
					this.form.insertAdjacentHTML('afterbegin',
						'<input type="hidden" id="thr_id" value="' + tNum + '" name="' + (
							aib.fch || aib.futa ? 'resto' :
							aib.tiny ? 'thread' :
							'parent'
						) + '">'
					);
				}
			}
		} else if (closeReply && !quotetxt && post.wrap.nextElementSibling === this.qArea) {
			this.closeQReply();
			return;
		}
		$after(post.wrap, this.qArea);
		if (!TNum) {
			this._toggleQuickReply(tNum);
		}
		if (!this.form) {
			return;
		}
		if (this._lastCapUpdate && ((!TNum && this.tNum !== tNum) || (Date.now() - this._lastCapUpdate > 3e5))) {
			this.tNum = tNum;
			this.refreshCapImg(false);
		}
		this.tNum = tNum;
		if (aib._420 && this.txta.value === 'Comment') {
			this.txta.value = '';
		}
		temp = this.txta.value;
		if (!TNum && post.isOp && !isNumClick) {
			this.txta.focus();
		} else {
			$txtInsert(this.txta, (
				isNumClick ? '>>' + pNum :
					(temp !== '' && temp.slice(-1) !== '\n' ? '\n' : '') +
					(this.lastQuickPNum === pNum && temp.contains('>>' + pNum) ? '' : '>>' + pNum + '\n')) +
				(quotetxt ? quotetxt.replace(/^\n|\n$/g, '').replace(/(^|\n)(.)/gm, '$1> $2') + '\n': ''));
		}
		temp = pByNum[pNum].thr.op.title;
		if (temp.length > 30) {
			temp = temp.substr(0, 30) + '\u2026';
		}
		this.qArea.firstChild.firstChild.textContent = temp || '#' + pNum;
		this.lastQuickPNum = pNum;
	},
	showMainReply: function (isTop, evt) {
		this.closeQReply();
		if (this.isTopForm === isTop) {
			this.pForm.style.display = this.isHidden ? '' : 'none';
			this.isHidden = !this.isHidden;
			this.updatePAreaBtns();
		} else {
			this.isTopForm = isTop;
			this.setReply(false, false);
		}
		if (evt) {
			$pd(evt);
		}
	},
	closeQReply: function () {
		if (this.isQuick) {
			this.isQuick = false;
			this.lastQuickPNum = -1;
			if (!TNum) {
				this._toggleQuickReply(0);
				$del($id('thr_id'));
			}
			this.setReply(false, !TNum || Cfg.addPostForm > 1);
		}
	},
	refreshCapImg: function (focus) {
		var src, img;
		if (aib.abu && (img = $id('captcha_div')) && img.hasAttribute('onclick')) {
			src = {'isCustom': true, 'focus': focus};
				img.dispatchEvent(new CustomEvent('click', {
					'bubbles': true,
					'cancelable': true,
					'detail': (nav.Firefox ? cloneInto(src, document.defaultView) : src)
				}));
			return;
		}
		if (aib.mak) {
			aib.updateCaptcha(focus);
		} else {
			if (!this.cap || (aib.krau && !$q('input[name="captcha_name"]', this.form).hasAttribute('value'))) {
				return;
			}
			img = this.recap ? $id('recaptcha_image') : $t('img', this.capTr);
			if (aib.dobr || aib.krau || aib.dvachnet || this.recap) {
				img.click();
			} else if (img) {
				src = img.getAttribute('src');
				if (aib.tire) {
					src = '/' + brd + '/captcha.fpl?' + Math.random();
				} else if (aib.kus || aib.tinyIb) {
					src = src.replace(/\?[^?]+$|$/, (aib._410 ? '?board=' + brd + '&' : '?') + Math.random());
				} else {
					src = src.replace(/pl$/, 'pl?key=mainpage&amp;dummy=')
						.replace(/dummy=[\d\.]*/, 'dummy=' + Math.random());
					src = this.tNum ? src.replace(/mainpage|res\d+/, 'res' + this.tNum) :
						src.replace(/res\d+/, 'mainpage');
				}
				img.src = '';
				img.src = src;
			}
		}
		this.cap.value = '';
		if (focus) {
			this.cap.focus();
		}
		if (this._lastCapUpdate) {
			this._lastCapUpdate = Date.now();
		}
	},
	setReply: function (quick, hide) {
		if (quick) {
			this.qArea.appendChild(this.pForm);
		} else {
			$after(this.pArea[+this.isTopForm], this.qArea);
			$after(this._pBtn[+this.isTopForm], this.pForm);
		}
		this.isHidden = hide;
		this.qArea.style.display = quick ? '' : 'none';
		this.pForm.style.display = hide ? 'none' : '';
		this.updatePAreaBtns();
	},
	updatePAreaBtns: function () {
		var txt = 'de-abtn de-parea-btn-',
			rep = TNum ? 'reply' : 'thrd';
		$t('a', this._pBtn[+this.isTopForm]).className = txt + (this.pForm.style.display === '' ? 'close' : rep);
		$t('a', this._pBtn[+!this.isTopForm]).className = txt + rep;
	},

	_lastCapUpdate: 0,
	_pBtn: [],
	_init: function () {
		var btn, el;
		this.pForm = $New('div', {'id': 'de-pform'}, [this.form, this.oeForm]);
		dForm.insertAdjacentHTML('beforebegin', '<div class="de-parea"><div>[<a href="#"></a>]</div><hr></div>');
		this.pArea[0] = dForm.previousSibling;
		this._pBtn[0] = this.pArea[0].firstChild;
		this._pBtn[0].firstElementChild.onclick = this.showMainReply.bind(this, false);
		el = aib.fch ? $c('board', dForm) : dForm;
		el.insertAdjacentHTML('afterend', '<div class="de-parea"><div>[<a href="#"></a>]</div><hr></div>');
		this.pArea[1] = el.nextSibling;
		this._pBtn[1] = this.pArea[1].firstChild;
		this._pBtn[1].firstElementChild.onclick = this.showMainReply.bind(this, true);
		this.qArea = $add('<div style="display: none;" id="de-qarea" class="' + aib.cReply +
			(Cfg.hangQReply ? ' de-qarea-hanging' : ' de-qarea-inline') + '"></div>');
		this.isTopForm = Cfg.addPostForm !== 0;
		this.setReply(false, !TNum || Cfg.addPostForm > 1);
		el = this.qArea;
		el.style.right = Cfg.qreplyRight + 'px';
		el.style.bottom = Cfg.qreplyBottom + 'px';
		el.lang = getThemeLang();
		el.insertAdjacentHTML('beforeend',
			'<div' + (Cfg.hangQReply ? ' class="de-cfg-head"' : '') + '><span id="de-qarea-target"' +
			(Cfg.hangQReply ? '': ' style="display: none;"') + '></span><span id="de-qarea-utils">' +
			'<span id="de-qarea-toggle" title="' + Lng.toggleQReply[lang] + '">\u2750</span>' +
			'<span id="de-qarea-close" title="' + Lng.closeQReply[lang] + '">\u2716</span></span></div>');
		el = el.firstChild;
		el.addEventListener('mousedown', {
			_el: this.qArea,
			_elStyle: this.qArea.style,
			_oldX: 0,
			_oldY: 0,
			handleEvent: function (e) {
				if (!Cfg.hangQReply) {
					return;
				}
				var right, bottom, curX = e.clientX,
					curY = e.clientY;
				switch (e.type) {
				case 'mousedown':
					this._oldX = curX;
					this._oldY = curY;
					doc.body.addEventListener('mousemove', this, false);
					doc.body.addEventListener('mouseup', this, false);
					$pd(e);
					return;
				case 'mousemove':
					right = parseInt(this._elStyle.right, 10) - curX + this._oldX;
					bottom = parseInt(this._elStyle.bottom, 10) - curY + this._oldY;
					this._elStyle.right = (right < 0 ? 0 :
						Math.min(right, Post.sizing.wWidth - this._el.offsetWidth)) + 'px';
					this._elStyle.bottom = (bottom < 25 ? 25 :
						Math.min(bottom, Post.sizing.wHeight - this._el.offsetHeight)) + 'px';
					this._oldX = curX;
					this._oldY = curY;
					return;
				default: // mouseup
					doc.body.removeEventListener('mousemove', this, false);
					doc.body.removeEventListener('mouseup', this, false);
					saveCfg('qreplyRight', parseInt(this._elStyle.right, 10));
					saveCfg('qreplyBottom', parseInt(this._elStyle.bottom, 10));
				}
			}
		}, false);
		el = el.lastChild;
		el.firstChild.onclick = function() {
			var node = this.qArea;
			toggleCfg('hangQReply')
			if (Cfg.hangQReply) {
				node.className = aib.cReply + ' de-qarea-hanging';
				node = node.firstChild;
				node.className = 'de-cfg-head';
				node.firstChild.style.display = '';
			} else {
				node.className = aib.cReply + ' de-qarea-inline';
				node = node.firstChild;
				node.removeAttribute('class');
				node.firstChild.style.display = 'none';
				this.txta.focus();
			}
		}.bind(this);
		el.lastChild.onclick = this.closeQReply.bind(this);
		if (aib.tire) {
			$each($Q('input[type="hidden"]', dForm), $del);
			dForm.appendChild($c('userdelete', doc.body));
			this.dpass = $q('input[type="password"]', dForm);
		}
		if (!this.form || !this.txta) {
			return;
		}
		aib.disableRedirection(this.form);
		this.form.style.display = 'inline-block';
		this.form.style.textAlign = 'left';
		if (nav.Firefox) {
			this.txta.addEventListener('mouseup', function () {
				saveCfg('textaWidth', parseInt(this.style.width, 10));
				saveCfg('textaHeight', parseInt(this.style.height, 10));
			}, false);
		} else {
			this.txta.insertAdjacentHTML('afterend', '<div id="de-txt-resizer"></div>');
			this.txta.nextSibling.addEventListener('mousedown', {
				el: this.txta,
				elStyle: this.txta.style,
				handleEvent: function (e) {
					switch (e.type) {
					case 'mousedown':
						doc.body.addEventListener('mousemove', this, false);
						doc.body.addEventListener('mouseup', this, false);
						$pd(e);
						return;
					case 'mousemove':
						var cr = this.el.getBoundingClientRect();
						this.elStyle.width = (e.pageX - cr.left - window.pageXOffset) + 'px';
						this.elStyle.height = (e.pageY - cr.top - window.pageYOffset) + 'px';
						return;
					default: // mouseup
						doc.body.removeEventListener('mousemove', this, false);
						doc.body.removeEventListener('mouseup', this, false);
						saveCfg('textaWidth', parseInt(this.elStyle.width, 10));
						saveCfg('textaHeight', parseInt(this.elStyle.height, 10));
					}
				}
			}, false);
		}
		if (aib.kus) {
			while (this.subm.nextSibling) {
				$del(this.subm.nextSibling);
			}
		}
		if (Cfg.addSageBtn && this.mail) {
			btn = $new('span', {'id': 'de-sagebtn'}, {'click': function (e) {
				e.stopPropagation();
				$pd(e);
				toggleCfg('sageReply');
				this._setSage();
			}.bind(this)});
			el = $parent(this.mail, 'LABEL') || this.mail;
			if (el.nextElementSibling || el.previousElementSibling) {
				el.style.display = 'none';
				$after(this.subm, btn);
			} else {
				$parent(this.mail, 'TR').style.display = 'none';
				$after(this.name || this.subm, btn);
			}
			setTimeout(this._setSage.bind(this), 0);
			if (aib._2chru) {
				while (btn.nextSibling) {
					$del(btn.nextSibling);
				}
			}
		}
		this.addTextPanel();
		this.txta.style.cssText = 'display: inline-block; padding: 0; resize: both; width: ' +
			Cfg.textaWidth + 'px; height: ' + Cfg.textaHeight + 'px; min-width: 0;';
		this.txta.addEventListener('keypress', function (e) {
			var code = e.charCode || e.keyCode;
			if ((code === 33 || code === 34) && e.which === 0) {
				e.target.blur();
				window.focus();
			}
		}, false);
		if (!aib.tiny) {
			this.subm.value = Lng.reply[lang];
		}
		this.subm.addEventListener('click', function (e) {
			var temp, val = this.txta.value;
			if (aib._2chru && !aib.reqCaptcha) {
				GM_xmlhttpRequest({
					'method': 'GET',
					'url': '/' + brd + '/api/requires-captcha',
					'onreadystatechange': function (xhr) {
						if (xhr.readyState !== 4 || xhr.status !== 200) {
							return;
						}
						aib.reqCaptcha = true;
						if (JSON.parse(xhr.responseText)['requires-captcha'] !== '1') {
							this.subm.click();
							return;
						}
						$id('captcha_tr').style.display = 'table-row';
						$id('captchaimage').src = '/' + brd + '/captcha?' + Math.random();
						$after(this.cap, $new('span', {
							'class': 'shortened',
							'style': 'margin: 0px 0.5em;',
							'text': 'проверить капчу'}, {
							'click': function () { GM_xmlhttpRequest({
								'method': 'POST',
								'url': '/' + brd + '/api/validate-captcha',
								'onreadystatechange': function (str) {
									if (str.readyState === 4 && str.status === 200) {
										if (JSON.parse(str.responseText).status === 'ok') {
											this.innerHTML = 'можно постить';
										} else {
											this.innerHTML = 'неверная капча';
											setTimeout(function (el) {
												el.innerHTML = 'проверить капчу';
											}, 1000, this);
										}
									}
								}.bind(this)
							}) }
						}))
					}.bind(this)
				});
				$pd(e);
				return;
			}
			if (Cfg.warnSubjTrip && this.subj && /#.|##./.test(this.subj.value)) {
				$pd(e);
				$alert(Lng.subjHasTrip[lang], 'upload', false);
				return;
			}
			if (spells.haveOutreps) {
				val = spells.outReplace(val);
			}
			if (this.tNum && pByNum[this.tNum].subj === 'Dollchan Extension Tools') {
				temp = '\n\n' + this._wrapText(aib.formButtons.bb[5], aib.formButtons.tag[5],
					'-'.repeat(50) + '\n' + nav.ua + '\nv' + version + ' [' + nav.scriptInstall + ']')[1];
				if (!val.contains(temp)) {
					val += temp;
				}
			}
			this.txta.value = val;
			if (Cfg.ajaxReply) {
				$alert(Lng.checking[lang], 'upload', true);
			}
			if (Cfg.favOnReply && this.tNum) {
				pByNum[this.tNum].thr.setFavorState(true);
			}
			if (this.video && (val = this.video.value) && (val = val.match(new YouTube().ytReg))) {
				this.video.value = 'http://www.youtube.com/watch?v=' + val[1];
			}
			if (this.isQuick) {
				this.pForm.style.display = 'none';
				this.qArea.style.display = 'none';
				$after(this._pBtn[+this.isTopForm], this.pForm);
			}
		}.bind(this), false);
		$each($Q('input[type="text"], input[type="file"]', this.form), function (node) {
			node.size = 30;
		});
		if (Cfg.noGoto && this.gothr) {
			this.gothr.style.display = 'none';
		}
		if (Cfg.noPassword && this.passw) {
			$parent(this.passw, 'TR').style.display = 'none';
		}
		window.addEventListener('load', function () {
			if (Cfg.userName && this.name) {
				setTimeout(PostForm.setUserName, 1e3);
			}
			if (this.passw) {
				setTimeout(PostForm.setUserPassw, 1e3);
			}
		}.bind(this), false);
		if (this.cap) {
			if (!(aib.fch && doc.cookie.indexOf('pass_enabled=1') > -1)) {
				this.capTr = $parent(this.cap, 'TR');
				this.txta.addEventListener('focus', this._captchaInit.bind(this, this.capTr.innerHTML), false);
				if (this.file) {
					this.file.addEventListener('click', this._captchaInit.bind(this, this.capTr.innerHTML), false);
				}
				if (!aib.krau) {
					this.capTr.style.display = 'none';
				}
				this.capTr.innerHTML = '';
			}
			this.cap = null;
		}
		if (Cfg.ajaxReply === 2) {
			if (aib.krau) {
				this.form.removeAttribute('onsubmit');
			}
			setTimeout(function () {
				this.form.onsubmit = function (e) {
					$pd(e);
					if (aib.krau) {
						aib.addProgressTrack.click();
					}
					if (aib._2chru) {
						doc.body.insertAdjacentHTML('beforeend', '<iframe class="ninja" id="csstest" src="/' +
							brd + '/csstest.foo"></iframe>');
						doc.body.lastChild.onload = function (e) {
							$del(e.target);
							new html5Submit(this.form, this.subm, checkUpload);
						}.bind(this);
						return;
					}
					new html5Submit(this.form, this.subm, checkUpload);
				}.bind(this);
			}.bind(this), 0);
		} else if (Cfg.ajaxReply === 1) {
			this.form.target = 'de-iframe-pform';
			this.form.onsubmit = null;
		}
		if (el = this.file) {
			aib.fixFileInputs(el);
			this.eventFiles(true);
		}
	},
	_setSage: function () {
		var c = Cfg.sageReply;
		$id('de-sagebtn').innerHTML = '&nbsp;' + (
			c ? '<span class="de-btn-sage"></span><b style="color: red;">SAGE</b>' :
				'<span>(no&nbsp;sage)</span>'
		);
		if (this.mail.type === 'text') {
			this.mail.value = c ? 'sage' : aib.fch ? 'noko' : '';
		} else {
			this.mail.checked = c;
		}
	},
	_toggleQuickReply: function (tNum) {
		if (this.oeForm) {
			$q('input[name="oek_parent"], input[name="replyto"]', this.oeForm).value = tNum;
		}
		if (this.form) {
			$q('#thr_id, input[name*="thread"]', this.form).value = tNum;
			if (aib.pony) {
				$q('input[name="quickreply"]', this.form).value = tNum || '';
			}
		}
	},
	_captchaInit: function (html) {
		if (this.capInited) {
			return;
		}
		this.capTr.innerHTML = html;
		this.cap = $q('input[type="text"][name*="aptcha"]:not([name="recaptcha_challenge_field"])', this.capTr);
		if (aib.fch) {
			$script('loadRecaptcha()');
		}
		if (aib.tire) {
			$script('show_captcha()');
		}
		if (aib.krau) {
			aib.initCaptcha.click();
			$id('captcha_image').setAttribute('onclick',  'requestCaptcha(true);');
		}
		if (aib.dvachnet) {
			$script('get_captcha()');
		}
		if (aib.mak) {
			aib.updateCaptcha(false);
			pr.txta.tabIndex = 999;
			this.capInited = true;
			return;
		}
		setTimeout(this._captchaUpd.bind(this), 100);
	},
	_captchaUpd: function () {
		var img, a;
		if ((this.recap = $id('recaptcha_response_field')) && (img = $id('recaptcha_image'))) {
			this.cap = this.recap;
			img.setAttribute('onclick', 'Recaptcha.reload()');
			img.style.cssText = 'width: 300px; cursor: pointer;';
		} else if (aib.fch) {
			setTimeout(this._captchaUpd.bind(this), 100);
			return;
		}
		this.capInited = true;
		this.cap.autocomplete = 'off';
		this.cap.onkeypress = (function () {
			var ru = 'йцукенгшщзхъфывапролджэячсмитьбюё',
				en = 'qwertyuiop[]asdfghjkl;\'zxcvbnm,.`';
			return function (e) {
				if (!Cfg.captchaLang || e.which === 0) {
					return;
				}
				var i, code = e.charCode || e.keyCode,
					chr = String.fromCharCode(code).toLowerCase();
				if (Cfg.captchaLang === 1) {
					if (code < 0x0410 || code > 0x04FF || (i = ru.indexOf(chr)) === -1) {
						return;
					}
					chr = en[i];
				} else {
					if (code < 0x0021 || code > 0x007A || (i = en.indexOf(chr)) === -1) {
						return;
					}
					chr = ru[i];
				}
				$pd(e);
				$txtInsert(e.target, chr);
			};
		})();
		if (aib.krau) {
			return;
		}
		if (aib.abu || aib.dobr || aib.dvachnet || this.recap || !(img = $q('img', this.capTr))) {
			this.capTr.style.display = '';
			return;
		}
		if (!aib.kus && !aib.tinyIb) {
			this._lastCapUpdate = Date.now();
			this.cap.onfocus = function () {
				if (this._lastCapUpdate && (Date.now() - this._lastCapUpdate > 3e5)) {
					this.refreshCapImg(false);
				}
			}.bind(this);
			if (!TNum && this.isQuick) {
				this.refreshCapImg(false);
			}
		}
		img.title = Lng.refresh[lang];
		img.alt = Lng.loading[lang];
		img.style.cssText = 'vertical-align: bottom; border: none; cursor: pointer;';
		img.onclick = this.refreshCapImg.bind(this, true);
		if ((a = img.parentNode).tagName === 'A') {
			$after(a, img);
			$del(a);
		}
		this.capTr.style.display = '';
	},
	_wrapText: function (isBB, tag, text) {
		var str, m;
		if (isBB) {
			if (text.contains('\n')) {
				str = '[' + tag + ']' + text + '[/' + tag + ']';
				return [str.length, str];
			}
			m = text.match(/^(\s*)(.*?)(\s*)$/);
			str = m[1] + '[' + tag + ']' + m[2] + '[/' + tag + ']' + m[3];
			return [m[2].length === 0 ? m[1].length + tag.length + 2 : str.length, str];
		}
		for (var rv = '', i = 0, arr = text.split('\n'), len = arr.length; i < len; ++i) {
			m = arr[i].match(/^(\s*)(.*?)(\s*)$/);
			rv += '\n' + m[1] + (tag === '^H' ? m[2] + '^H'.repeat(m[2].length) :
				tag + m[2] + tag) + m[3];
		}
		return [i === 1 && m[2].length === 0 && tag !== '^H' ? m[1].length + tag.length :
			rv.length - 1, rv.slice(1)];
	}
}

function FileInput(form, el, prev) {
	this.el = el;
	this.place = el.parentNode;
	this.form = form;
	this.prev = prev;
	if (prev) {
		prev.next = this;
	}
}
FileInput.prototype = {
	empty: true,
	next: null,
	imgFile: null,
	thumb: null,
	clear: function () {
		var newEl, form = this.form,
			oldEl = this.el;
		oldEl.insertAdjacentHTML('afterend', oldEl.outerHTML);
		newEl = this.el.nextSibling;
		newEl.obj = this;
		newEl.addEventListener('change', this, false);
		if (form.file === oldEl) {
			form.file = newEl;
		}
		this.el = newEl;
		$del(oldEl);
		this.empty = true;
		this.hideInputs();
	},
	delUtils: function () {
		var mParent;
		if (Cfg.fileThumb) {
			this.thumb.classList.add('de-file-off');
			if (this._mediaEl) {
				window.URL.revokeObjectURL(this._mediaEl.src);
				mParent = this._mediaEl.parentNode;
				mParent.title = Lng.clickToAdd[lang];
				$del(this._mediaEl);
				this._mediaEl = null;
			}
		}
		$del(this._delUtil);
		$del(this._rjUtil);
		this.imgFile = this._delUtil = this._rjUtil = null;
		this._changeFilesCount(-1);
		this.clear();
	},
	updateUtils: function () {
		this.init(true);
		if (this._delUtil) {
			$after(this._buttonsPlace, this._delUtil);
		}
		if (this._rjUtil) {
			$after(this._buttonsPlace, this._rjUtil);
		}
	},
	handleEvent: function (e) {
		switch (e.type) {
		case 'change': this._onFileChange(); break;
		case 'click':
			if (e.target === this._delUtil) {
				this.delUtils();
			} else if (e.target === this._rjUtil) {
				this._addRarJpeg();
			} else if (e.target.className === 'de-file-img') {
				this.el.click();
			}
			e.stopPropagation();
			$pd(e);
			break;
		case 'dragover':
			this.thumb.classList.add('de-file-drag');
			$after(this.thumb, this.el);
			break;
		case 'dragleave':
		case 'drop':
			setTimeout(function () {
				this.thumb.classList.remove('de-file-drag');
				var el = this.place.firstChild;
				if (el) {
					$before(el, this.el);
				} else {
					this.place.appendChild(this.el);
				}
			}.bind(this), 10);
			break;
		case 'mouseover': this.thumb.classList.add('de-file-hover'); break;
		case 'mouseout': this.thumb.classList.remove('de-file-hover');
		}
	},
	hideInputs: function () {
		var hideThumbs = Cfg.fileThumb, inp = this.next;
		while (inp && inp.empty) {
			inp = inp.next;
		}
		if (!inp) {
			inp = this;
			while (inp.prev && inp.prev.empty) {
				inp = inp.prev;
			}
			while (inp = inp.next) {
				if (hideThumbs) {
					inp.thumb.style.display = 'none';
				} else {
					inp._wrap.style.display = 'none';
				}
			}
		}
	},
	init: function (update) {
		var imgTD;
		if (Cfg.fileThumb) {
			this.form.fileTd.parentNode.style.display = 'none';
			imgTD = this.form.fileImageTD;
			imgTD.insertAdjacentHTML('beforeend', '<div class="de-file de-file-off"><div class="de-file-img">' +
				'<div class="de-file-img" title="' + Lng.clickToAdd[lang] + '"></div></div></div>');
			this.thumb = imgTD.lastChild;
			this.thumb.addEventListener('mouseover', this, false);
			this.thumb.addEventListener('mouseout', this, false);
			this.thumb.addEventListener('click', this, false);
			this.thumb.addEventListener('dragover', this, false);
			this.el.addEventListener('dragleave', this, false);
			this.el.addEventListener('drop', this, false);
			if (update) {
				this._showPviewImage();
			} else if (this.prev) {
				this.thumb.style.display = 'none';
			}
		} else if (update) {
			this._wrap.style.display = '';
			this.form.fileTd.parentNode.style.display = '';
			if (this._mediaE) {
				window.URL.revokeObjectURL(this._mediaE.src);
			}
			$del(this.thumb);
			this.thumb = this._mediaEl = null;
		}
		if (!update) {
			this.el.addEventListener('change', this, false);
		}
	},

	_mediaEl: null,
	_delUtil: null,
	_rjUtil: null,
	get _buttonsPlace() {
		return Cfg.fileThumb ? this.thumb.firstChild : this.el;
	},
	get _wrap() {
		return aib.getFileWrap(this.el);
	},
	_addRarJpeg: function () {
		var el = this.form.rarInput;
		el.onchange = function (e) {
			$del(this._rjUtil);
			var file = e.target.files[0],
				fr = new FileReader(),
				btnsPlace = this._buttonsPlace;
			btnsPlace.insertAdjacentHTML('afterend',
				'<span><span class="de-wait"></span>' + Lng.wait[lang] + '</span>');
			this._rjUtil = btnsPlace.nextSibling;
			fr.onload = function (file, node, e) {
				if (this._buttonsPlace.nextSibling === node) {
					node.className = 'de-file-rarmsg de-file-utils';
					node.title = this.el.files[0].name + ' + ' + file.name;
					node.textContent = this.el.files[0].name.replace(/^.+\./, '') + ' + ' +
						file.name.replace(/^.+\./, '')
					this.imgFile = e.target.result;
				}
			}.bind(this, file, btnsPlace.nextSibling);
			fr.readAsArrayBuffer(file);
		}.bind(this);
		el.click();
	},
	_changeFilesCount: function (val) {
		if (aib.dobr) {
			var el = this.form.fileTd.firstElementChild,
				val = +el.value + val;
			el.value = val < 1 ? 1 : val;
		}
	},
	_onFileChange: function () {
		if (Cfg.fileThumb) {
			this._showPviewImage();
		} else {
			this.form.eventFiles(false);
		}
		if (this.empty) {
			this.empty = false;
			this._changeFilesCount(+1);
			$after(this._buttonsPlace, this._delUtil = $new('span', {
				'class': 'de-file-del de-file-utils',
				'title': Lng.removeFile[lang]}, {
				'click': this
			}));
		} else if (this.imgFile) {
			this.imgFile = null;
		}
		if (this.next) {
			if (Cfg.fileThumb) {
				this.next.thumb.style.display = '';
			} else {
				this.next._wrap.style.display = '';
			}
		}
		if (aib.fch || nav.Presto || !/^image\/(?:png|jpeg)$/.test(this.el.files[0].type)) {
			return;
		}
		if (this._rjUtil) {
			$del(this._rjUtil);
			this._rjUtil = null;
		}
		$after(this._buttonsPlace, this._rjUtil = $new('span', {
			'class': 'de-file-rar de-file-utils',
			'title': Lng.helpAddFile[lang]}, {
			'click': this
		}));
	},
	_showPviewImage: function () {
		var fr, files = this.el.files;
		if (files && files[0]) {
			fr = new FileReader();
			fr.onload = function (e) {
				this.form.eventFiles(false);
				var file = this.el.files[0],
					thumb = this.thumb;
				if (this.empty) {
					return;
				}
				thumb.classList.remove('de-file-off');
				thumb = thumb.firstChild.firstChild;
				thumb.title = file.name + ', ' + (file.size/1024).toFixed(2) + 'KB';
				thumb.insertAdjacentHTML('afterbegin', file.type === 'video/webm' ?
					'<video class="de-file-img" loop autoplay muted src=""></video>' :
					'<img class="de-file-img" src="">');
				this._mediaEl = thumb = thumb.firstChild;
				thumb.src = window.URL.createObjectURL(new Blob([e.target.result]));
				thumb = thumb.nextSibling;
				if (thumb) {
					window.URL.revokeObjectURL(thumb.src);
					$del(thumb);
				}
			}.bind(this);
			fr.readAsArrayBuffer(files[0]);
		}
	}
}


// SUBMIT
// ===========================================================================================================

function getSubmitError(dc) {
	var i, els, el, err = '', form = $q(aib.qDForm, dc);
	if (dc.body.hasChildNodes() && !form) {
		for (i = 0, els = $Q(aib.qError, dc); el = els[i++];) {
			err += el.innerHTML + '\n';
		}
		if (!(err = err.replace(/<a [^>]+>Назад.+|<br.+/, ''))) {
			err = Lng.error[lang] + ':\n' + dc.body.innerHTML;
		}
		err = /:null|successful|uploaded|updating|обновл|удален[о\.]/i.test(err) ? '' : err.replace(/"/g, "'");
	}
	return err;
}

function checkUpload(dc) {
	if (aib.krau) {
		pr.form.action = pr.form.action.split('?')[0];
		$id('postform_row_progress').style.display = 'none';
		aib.btnZeroLUTime.click();
	}
	var el, err = getSubmitError(dc);
	if (err) {
		if (pr.isQuick) {
			pr.setReply(true, false);
		}
		if (/captch|капч|подтвер|verifizie/i.test(err)) {
			pr.refreshCapImg(true);
		}
		$alert(err, 'upload', false);
		updater.sendErrNotif();
		return;
	}
	pr.txta.value = '';
	if (pr.file) {
		pr.delFilesUtils();
	}
	if (pr.video) {
		pr.video.value = '';
	}
	Cfg.stats[pr.tNum ? 'reply' : 'op']++;
	saveComCfg(aib.dm, Cfg);
	if (!pr.tNum) {
		window.location = aib.getThrdUrl(brd, aib.getTNum($q(aib.qDForm, dc)));
		return;
	}
	el = !aib.tiny && !aib.kus &&
		(aib.qPostRedir === null || $q(aib.qPostRedir, dc)) ? $q(aib.qDForm, dc) : null;
	if (TNum) {
		firstThr.clearPostsMarks();
		if (el) {
			firstThr.loadNewFromForm(el);
			closeAlert($id('de-alert-upload'));
			if (Cfg.scrAfterRep) {
				scrollTo(0, pageYOffset + firstThr.last.el.getBoundingClientRect().top);
			}
		} else {
			firstThr.loadNew(function (eCode, eMsg, np, xhr) {
				infoLoadErrors(eCode, eMsg, 0);
				closeAlert($id('de-alert-upload'));
				if (Cfg.scrAfterRep) {
					scrollTo(0, pageYOffset + firstThr.last.el.getBoundingClientRect().top);
				}
			}, true);
		}
	} else {
		if (el) {
			pByNum[pr.tNum].thr.loadFromForm(visPosts, false, el);
			closeAlert($id('de-alert-upload'));
		} else {
			pByNum[pr.tNum].thr.load(visPosts, false, closeAlert.bind(window, $id('de-alert-upload')));
		}
	}
	pr.closeQReply();
	pr.refreshCapImg(false);
}

function endDelete() {
	var el = $id('de-alert-deleting');
	if (el) {
		closeAlert(el);
		$alert(Lng.succDeleted[lang], 'deleted', false);
	}
}

function checkDelete(dc) {
	var el, i, els, len, post, tNums, num, err = getSubmitError(dc);
	if (err) {
		$alert(Lng.errDelete[lang] + err, 'deleting', false);
		updater.sendErrNotif();
		return;
	}
	tNums = [];
	num = (doc.location.hash.match(/\d+/) || [null])[0];
	if (num && (post = pByNum[num])) {
		if (!post.isOp) {
			post.el.className = aib.cReply;
		}
		doc.location.hash = '';
	}
	for (i = 0, els = $Q('.' + aib.cRPost + ' input:checked', dForm), len = els.length; i < len; ++i) {
		el = els[i];
		el.checked = false;
		if (!TNum && tNums.indexOf(num = aib.getPostEl(el).post.tNum) === -1) {
			tNums.push(num);
		}
	}
	if (TNum) {
		firstThr.clearPostsMarks();
		firstThr.loadNew(function (eCode, eMsg, np, xhr) {
			infoLoadErrors(eCode, eMsg, 0);
			endDelete();
		}, false);
	} else {
		tNums.forEach(function (tNum) {
			pByNum[tNum].thr.load(visPosts, false, endDelete);
		});
	}
}

function html5Submit(form, button, fn) {
	this.boundary = '---------------------------' + Math.round(Math.random() * 1e11);
	this.data = [];
	this.busy = 0;
	this.error = false;
	this.url = form.action;
	this.fn = fn;
	$each($Q('input:not([type="submit"]):not([type="button"]), textarea, select', form),
		this.append.bind(this));
	this.append(button);
	this.submit();
}
html5Submit.prototype = {
	append: function (el) {
		var file, fName, idx, fr,
			pre = '--' + this.boundary + '\r\nContent-Disposition: form-data; name="' + el.name + '"';
		if (el.type === 'file' && el.files.length > 0) {
			file = el.files[0];
			fName = file.name;
			this.data.push(pre + '; filename="' + (
				!Cfg.removeFName ? fName : ' ' + fName.substring(fName.lastIndexOf('.'))
			) + '"\r\nContent-type: ' + file.type + '\r\n\r\n', null, '\r\n');
			idx = this.data.length - 2;
			if (!/^image\/(?:png|jpeg)$|^video\/webm$/.test(file.type)) {
				this.data[idx] = file;
				return;
			}
			fr = new FileReader();
			fr.onload = function (name, e) {
				var dat = this.clearImage(e.target.result, el.obj.imgFile,
					Cfg.postSameImg && String(Math.round(Math.random() * 1e6)));
				if (dat) {
					this.data[idx] = new Blob(dat);
					this.busy--;
					this.submit();
				} else {
					this.error = true;
					$alert(Lng.fileCorrupt[lang] + name, 'upload', false);
				}
			}.bind(this, fName);
			fr.readAsArrayBuffer(file);
			this.busy++;
		} else if ((el.type !== 'checkbox' && el.type !== 'radio') || el.checked) {
			this.data.push(pre + '\r\n\r\n' + el.value + '\r\n');
		}
	},
	submit: function () {
		if (this.error || this.busy !== 0) {
			return;
		}
		this.data.push('--' + this.boundary + '--\r\n');
		$xhr({
			'method': 'POST',
			'headers': {'Content-type': 'multipart/form-data; boundary=' + this.boundary},
			'data': new Blob(this.data),
			'url': nav.fixLink(this.url),
			'onreadystatechange': function (xhr) {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						this($DOM(xhr.responseText));
					} else {
						$alert(xhr.status === 0 ? Lng.noConnect[lang] :
							'HTTP [' + xhr.status + '] ' + xhr.statusText, 'upload', false);
					}
				}
			}.bind(this.fn)
		});
	},
	readExif: function (data, off, len) {
		var i, j, dE, tag, tgLen, xRes = 0,
			yRes = 0,
			resT = 0,
			dv = nav.getUnsafeDataView(data, off),
			le = String.fromCharCode(dv.getUint8(0), dv.getUint8(1)) !== 'MM';
		if (dv.getUint16(2, le) !== 0x2A) {
			return null;
		}
		i = dv.getUint32(4, le);
		if (i > len) {
			return null;
		}
		for (tgLen = dv.getUint16(i, le), j = 0; j < tgLen; j++) {
			tag = dv.getUint16(dE = i + 2 + 12 * j, le);
			if (tag === 0x0128) {
				resT = dv.getUint16(dE + 8, le) - 1;
			} else if (tag === 0x011A || tag === 0x011B) {
				dE = dv.getUint32(dE + 8, le);
				if (dE > len) {
					return null;
				}
				if (tag === 0x11A) {
					xRes = Math.round(dv.getUint32(dE, le) / dv.getUint32(dE + 4, le));
				} else {
					yRes = Math.round(dv.getUint32(dE, le) / dv.getUint32(dE + 4, le));
				}
			}
		}
		xRes = xRes || yRes;
		yRes = yRes || xRes;
		return new Uint8Array([resT & 0xFF, xRes >> 8, xRes & 0xFF, yRes >> 8, yRes & 0xFF]);
	},
	clearImage: function (data, extraData, rand) {
		var tmp, i, len, deep, val, lIdx, jpgDat, img = nav.getUnsafeUint8Array(data),
			rExif = !!Cfg.removeEXIF,
			rv = extraData ? rand ? [img, extraData, rand] : [img, extraData] : rand ?
				[img, rand] : [img];
		if (!Cfg.postSameImg && !rExif && !extraData) {
			return rv;
		}
		// JPG
		if (img[0] === 0xFF && img[1] === 0xD8) {
			for (i = 2, deep = 1, len = img.length - 1, val = [null, null], lIdx = 2, jpgDat = null; i < len; ) {
				if (img[i] === 0xFF) {
					if (rExif) {
						if (!jpgDat && deep === 1) {
							if (img[i + 1] === 0xE1 && img[i + 4] === 0x45) {
								jpgDat = this.readExif(data, i + 10, (img[i + 2] << 8) + img[i + 3]);
							} else if (img[i + 1] === 0xE0 && img[i + 7] === 0x46 &&
							          (img[i + 2] !== 0 || img[i + 3] >= 0x0E ||
							          img[i + 15] !== 0xFF))
							{
								jpgDat = img.subarray(i + 11, i + 16);
							}
						}
						if ((img[i + 1] >> 4) === 0xE || img[i + 1] === 0xFE) {
							if (lIdx !== i) {
								val.push(img.subarray(lIdx, i));
							}
							i += 2 + (img[i + 2] << 8) + img[i + 3];
							lIdx = i;
							continue;
						}
					} else if (img[i + 1] === 0xD8) {
						deep++;
						i++;
						continue;
					}
					if (img[i + 1] === 0xD9 && --deep === 0) {
						break;
					}
				}
				i++;
			}
			i += 2;
			if (!extraData && len - i > 75) {
				i = len;
			}
			if (lIdx === 2) {
				if (i !== len) {
					rv[0] = nav.getUnsafeUint8Array(data, 0, i);
				}
				return rv;
			}
			val[0] = new Uint8Array([0xFF, 0xD8, 0xFF, 0xE0, 0, 0x0E, 0x4A, 0x46, 0x49, 0x46, 0, 1, 1]);
			val[1] = jpgDat || new Uint8Array([0, 0, 1, 0, 1]);
			val.push(img.subarray(lIdx, i));
			if (extraData) {
				val.push(extraData);
			}
			if (rand) {
				val.push(rand);
			}
			return val;
		}
		// PNG
		if (img[0] === 0x89 && img[1] === 0x50) {
			for (i = 0, len = img.length - 7; i < len && (img[i] !== 0x49 ||
				img[i + 1] !== 0x45 || img[i + 2] !== 0x4E || img[i + 3] !== 0x44); i++) {}
			i += 8;
			if (i !== len && (extraData || len - i <= 75)) {
				rv[0] = nav.getUnsafeUint8Array(data, 0, i);
			}
			return rv;
		}
		// WEBM
		if (img[0] === 0x1a && img[1] === 0x45 && img[2] === 0xDF && img[3] === 0xA3) {
			return new WebmParser(data).addData(rand).getData();
		}
		return null;
	}
};

WebmParser = function (data) {
	var EBMLId = 0x1A45DFA3,
		segmentId = 0x18538067,
		voidId = 0xEC;
	function WebmElement(elData, dataLength, offset) {
		var num, clz, id, size, headSize = 0;
		if (offset + 4 >= dataLength) {
			return;
		}
		num = elData.getUint32(offset);
		clz = Math.clz32(num);
		if (clz > 3) {
			this.error = true;
			return;
		}
		id = num >>> (8 * (3 - clz));
		headSize += clz + 1;
		offset += clz + 1;
		if (offset + 4 >= dataLength) {
			this.error = true;
			return;
		}
		num = elData.getUint32(offset);
		clz = Math.clz32(num);
		if (clz > 3) {
			if ((num & (0xFFFFFFFF >>> (clz + 1))) !== 0) {
				this.error = true;
				return; // We cannot handle webm-files with size greater than 4Gb :(
			}
			if (offset + 8 >= dataLength) {
				this.error = true;
				return;
			}
			headSize += 4;
			offset += 4;
			num = elData.getUint32(offset);
			clz -= 4;
		}
		size = num >>> (8 * (3 - clz));
		headSize += clz + 1;
		offset += clz + 1;
		if (offset + size > dataLength) {
			this.error = true;
			return;
		}
		this.data = elData;
		this.offset = offset;
		this.endOffset = offset + size;
		this.id = id;
		this.headSize = headSize;
		this.size = size;
	}
	WebmElement.prototype = {
		error: false,
		id: 0
	};

	function Parser(data) {
		var dv = nav.getUnsafeDataView(data),
			len = dv.byteLength,
			el = new WebmElement(dv, len, 0),
			offset = 0,
			voids = [];
		error: do {
			if (el.error || el.id !== EBMLId) {
				break;
			}
			this.EBML = el;
			offset += el.headSize + el.size;
			while (true) {
				el = new WebmElement(dv, len, offset);
				if (el.error) {
					break error;
				}
				if (el.id === segmentId) {
					this.segment = el;
					break; // Ignore everything after first segment
				} else if (el.id === voidId) {
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
		} while (false);
		this.error = true;
	}
	Parser.prototype = {
		addData: function (data) {
			if (this.error || !data) {
				return this;
			}
			var size = typeof data === 'string' ? data.length : data.byteLength;
			if (size > 127) {
				this.error = true;
				return;
			}
			this.rv.push(new Uint8Array([voidId, 0x80 | size]), data);
			return this;
		},
		getData: function () {
			if (this.error) {
				return null;
			}
			var len = this.segment.endOffset;
			this.rv[0] = nav.getUnsafeUint8Array(this.data, 0, len);
			return this.rv;
		}
	};

	WebmParser = Parser;
	return new Parser(data);
}


// IMAGES
// ===========================================================================================================

function genImgHash(data) {
	var i, j, l, c, t, u, g, buf = new Uint8Array(data[0]),
		oldw = data[1],
		oldh = data[2],
		tmp = oldw * oldh,
		newh = 8,
		neww = 8,
		levels = 3,
		areas = 256 / levels,
		values = 256 / (levels - 1),
		hash = 0;
	for (i = 0, j = 0; i < tmp; i++, j += 4) {
		buf[i] = buf[j] * 0.3 + buf[j + 1] * 0.59 + buf[j + 2] * 0.11;
	}
	for (i = 0; i < newh; i++) {
		for (j = 0; j < neww; j++) {
			tmp = i / (newh - 1) * (oldh - 1);
			l = Math.min(tmp | 0, oldh - 2);
			u = tmp - l;
			tmp = j / (neww - 1) * (oldw - 1);
			c = Math.min(tmp | 0, oldw - 2);
			t = tmp - c;
			hash = (hash << 4) + Math.min(values * (((buf[l * oldw + c] * ((1 - t) * (1 - u)) +
				buf[l * oldw + c + 1] * (t * (1 - u)) +
				buf[(l + 1) * oldw + c + 1] * (t * u) +
				buf[(l + 1) * oldw + c] * ((1 - t) * u)) / areas) | 0), 255);
			if (g = hash & 0xF0000000) {
				hash ^= g >>> 24;
			}
			hash &= ~g;
		}
	}
	return {hash: hash};
}
function ImgBtnsShowHider(nextFn, prevFn) {
	dForm.insertAdjacentHTML('beforeend', '<div style="display: none;">' +
		'<div id="de-img-btn-next" de-title="' + Lng.nextImg[lang] + '"><div></div></div>' +
		'<div id="de-img-btn-prev" de-title="' + Lng.prevImg[lang] + '"><div></div></div></div>');
	var btns = dForm.lastChild;
	this._btns = btns;
	this._btnsStyle = btns.style;
	this._nextFn = nextFn;
	this._prevFn = prevFn;
	window.addEventListener('mousemove', this, false);
	btns.addEventListener('mouseover', this, false);
}
ImgBtnsShowHider.prototype = {
	handleEvent: function (e) {
		switch (e.type) {
		case 'mousemove':
			var curX = e.clientX,
				curY = e.clientY;
			if (this._oldX !== curX || this._oldY !== curY) {
				this._oldX = curX;
				this._oldY = curY;
				this.show();
			}
			break;
		case 'mouseover':
			if (!this.hasEvents) {
				this.hasEvents = true;
				this._btns.addEventListener('mouseout', this, false);
				this._btns.addEventListener('click', this, false);
			}
			if (!this._hidden) {
				clearTimeout(this._hideTmt);
				KeyEditListener.setTitle(this._btns.firstChild, 17);
				KeyEditListener.setTitle(this._btns.lastChild, 4);
			}
			break;
		case 'mouseout':
			this._setHideTmt();
			break;
		case 'click':
			switch (e.target.parentNode.id) {
			case 'de-img-btn-next': this._nextFn(); return;
			case 'de-img-btn-prev': this._prevFn(); return;
			default: return;
			}
		}
	},
	hide: function () {
		this._btnsStyle.display = 'none';
		this._hidden = true;
		this._oldX = this._oldY = -1;
	},
	remove: function () {
		$del(this._btns);
		window.removeEventListener('mousemove', this, false);
		clearTimeout(this._hideTmt);
	},
	show: function () {
		if (this._hidden) {
			this._btnsStyle.display = '';
			this._hidden = false;
			this._setHideTmt();
		}
	},

	_hasEvents: false,
	_hideTmt: 0,
	_hidden: true,
	_oldX: -1,
	_oldY: -1,
	_setHideTmt: function () {
		clearTimeout(this._hideTmt);
		this._hideTmt = setTimeout(this.hide.bind(this), 2000);
	}
};

function AttachmentViewer(data) {
	this._show(data);
}
AttachmentViewer.prototype = {
	data: null,
	close: function (e) {
		if (this.hasOwnProperty('_btns')) {
			this._btns.remove();
		}
		this._remove(e);
	},
	handleEvent: function (e) {
		var temp, isOverEvent = false;
		switch (e.type) {
		case 'mousedown':
			if (this.data.isVideo && this.data.isControlClick(e, this._elStyle.height)) {
				return;
			}
			this._oldX = e.clientX;
			this._oldY = e.clientY;
			doc.body.addEventListener('mousemove', this, true);
			doc.body.addEventListener('mouseup', this, true);
			break;
		case 'mousemove':
			var curX = e.clientX,
				curY = e.clientY;
			if (curX !== this._oldX || curY !== this._oldY) {
				this._elStyle.left = (this._oldL = parseInt(this._elStyle.left, 10) + curX - this._oldX) + 'px';
				this._elStyle.top = (this._oldT = parseInt(this._elStyle.top, 10) + curY - this._oldY) + 'px';
				this._oldX = curX;
				this._oldY = curY;
				this._moved = true;
			}
			return;
		case 'mouseup':
			doc.body.removeEventListener('mousemove', this, true);
			doc.body.removeEventListener('mouseup', this, true);
			return;
		case 'click':
			if (this.data.isVideo && this.data.isControlClick(e, this._elStyle.height)) {
				return;
			}
			if (e.button === 0) {
				if (this._moved) {
					this._moved = false;
				} else {
					this.close(e);
					Attachment.viewer = null;
				}
				e.stopPropagation();
				break;
			}
			return;
		case 'mouseover': isOverEvent = true;
		case 'mouseout':
			temp = e.relatedTarget;
			if (!temp || (temp !== this._obj && !this._obj.contains(temp))) {
				if (isOverEvent) {
					Pview.mouseEnter(this.data.post);
				} else if (Pview.top && this.data.post.el !== temp && !this.data.post.el.contains(temp)) {
					Pview.top.markToDel();
				}
			}
			return;
		default: // wheel event
			var tmp, curX = e.clientX,
				curY = e.clientY,
				oldW = this._curW,
				oldH = this._curH,
				d = nav.Firefox ? -e.detail : nav.Presto ? e.wheelDelta : e.wheelDeltaY,
				width = d > 0 ? oldW * this._zoomFactor : oldW / this._zoomFactor,
				height = d > 0 ? oldH * this._zoomFactor : oldH / this._zoomFactor;
			if (d < 0) {
				tmp = resizeImage([width, height, this._ar], this._minSize, this._maxSize);
				width = tmp[0];
				height = tmp[1];
			}
			this._curW = width;
			this._curH = height;
			this._elStyle.width = width + 'px';
			this._elStyle.height = height + 'px';
			this._elStyle.left = (this._oldL = parseInt(curX - (width/oldW) * (curX - this._oldL), 10)) + 'px';
			this._elStyle.top = (this._oldT = parseInt(curY - (height/oldH) * (curY - this._oldT), 10)) + 'px';
		}
		$pd(e);
	},
	navigate: function (isForward) {
		var data = this.data;
		do {
			data = this._navigateHelper(data, isForward);
		} while (!data.isVideo && !data.isImage);
		this.update(data, null);
	},
	update: function (data, showButtons, e) {
		this._remove(e);
		this._show(data, showButtons);
	},

	_ar: 0,
	_data: null,
	_elStyle: null,
	_fullEl: null,
	_obj: null,
	_oldL: 0,
	_oldT: 0,
	_curH: 0,
	_curW: 0,
	_oldX: 0,
	_oldY: 0,
	_maxSize: null,
	_minSize: 0,
	_moved: false,
	get _btns() {
		var val = new ImgBtnsShowHider(this.navigate.bind(this, true), this.navigate.bind(this, false));
		Object.defineProperty(this, '_btns', { value: val });
		return val;
	},
	get _zoomFactor() {
		var val = 1 + (Cfg.zoomFactor / 100);
		Object.defineProperty(this, '_zoomFactor', { value: val });
		return val;
	},
	_getHolder: function (el, data) {
		var obj, html, size = data.computeFullSize(false),
			screenWidth = Post.sizing.wWidth,
			screenHeight = Post.sizing.wHeight,
			minSize = Cfg.minImgSize,
			ar = size[0] / size[1];
		this._ar = ar;
		this._curW = size[0];
		this._curH = size[1];
		if(minSize * ar > screenWidth) {
			minSize = Math.floor(screenWidth / ar);
		}
		if(minSize / ar > screenHeight) {
			minSize = Math.floor(screenHeight * ar);
		}
		this._minSize = minSize;
		this._maxSize = !size[2] ? null :
			minSize > (size[2][2] > 1 ? size[2][0]: size[2][1]) ? size[2] : null;
		this._oldL = (screenWidth - size[0]) / 2 - 1;
		this._oldT = (screenHeight - size[1]) / 2 - 1;
		html = '<div class="de-img-center" style="top:' + this._oldT + 'px; left:' +
			this._oldL + 'px; width:' + size[0] + 'px; height:' + size[1] + 'px; display: block"></div>';
		obj = $add(html);
		if (data.isImage) {
			obj.insertAdjacentHTML('afterbegin', '<a href="' + data.src + '"></a>');
			obj.firstChild.appendChild(el);
		} else {
			obj.appendChild(el);
		}
		return obj;
	},
	_navigateHelper: function (data, isForward) {
		var post = data.post,
			imgs = post.allImages;
		if (isForward ? data.idx + 1 === imgs.length : data.idx === 0) {
			do {
				post = post.getAdjacentVisPost(!isForward);
				if (!post) {
					post = isForward ? firstThr.op : lastThr.last;
					if (post.hidden || post.thr.hidden) {
						post = post.getAdjacentVisPost(!isForward);
					}
				}
				imgs = post.allImages;
			} while (imgs.length === 0);
			return imgs[isForward ? 0 : imgs.length - 1];
		}
		return imgs[isForward ? data.idx + 1 : data.idx - 1]
	},
	_show: function (data) {
		var el = data.getFullObject(),
			obj = this._getHolder(el, data),
			style = obj.style;
		this._elStyle = style;
		this.data = data;
		this._fullEl = el;
		this._obj = obj;
		obj.addEventListener(nav.Firefox ? 'DOMMouseScroll' : 'mousewheel', this, true);
		obj.addEventListener('mousedown', this, true);
		obj.addEventListener('click', this, true);
		if (data.inPview) {
			obj.addEventListener('mouseover', this, true);
			obj.addEventListener('mouseout', this, true);
		}
		if (!data.inPview) {
			this._btns.show();
		} else if (this.hasOwnProperty('_btns')) {
			this._btns.hide();
		}
		dForm.appendChild(obj);
	},
	_remove: function (e) {
		if (this.data.isVideo && this._fullEl.tagName === 'VIDEO') {
			this._fullEl.pause();
			this._fullEl.src = '';
		}
		this._obj.style.display = 'none';
		setTimeout($del, 0, this._obj);
		if (e && this.data.inPview) {
			this.data.sendCloseEvent(e, false);
		}
	}
};

function IAttachmentData() {}
IAttachmentData.prototype = {
	expanded: false,
	get inPview() {
		var val = this.post.isPview;
		Object.defineProperty(this, 'inPview', { value: val });
		return val;
	},
	get isImage() {
		var val = /\.jpe?g|\.png|\.gif/i.test(this.src) ||
			(this.src.startsWith('blob:') && !this.el.hasAttribute('de-video'));
		Object.defineProperty(this, 'isImage', { value: val });
		return val;
	},
	get isVideo() {
		var val = /\.webm(?:&|$)/i.test(this.src) ||
			(this.src.startsWith('blob:') && this.el.hasAttribute('de-video'));
		Object.defineProperty(this, 'isVideo', { value: val });
		return val;
	},
	get height() {
		var dat = this._getImageSize();
		Object.defineProperties(this, {
			'width': { value: dat[0] },
			'height': { value: dat[1] }
		});
		return dat[1];
	},
	get src() {
		var val = this._getImageSrc();
		Object.defineProperty(this, 'src', { value: val });
		return val;
	},
	get width() {
		var dat = this._getImageSize();
		Object.defineProperties(this, {
			'width': { value: dat[0] },
			'height': { value: dat[1] }
		});
		return dat[0];
	},
	collapse: function (e) {
		if (!this.isVideo || !this.isControlClick(e, this._fullEl.style.height)) {
			this.expanded = false;
			$del(this._fullEl);
			this._fullEl = null;
			this.el.parentNode.style.display = '';
			$del((aib.hasPicWrap ? this._getImageParent() : this.el.parentNode).nextSibling);
			if (e && this.inPview) {
				this.sendCloseEvent(e, true);
			}
			return true;
		}
		return false;
	},
	computeFullSize: function (inPost) {
		var maxWidth, maxHeight, maxSize, temp, width = this.width,
			height = this.height;
		if (Cfg.resizeDPI) {
			width /= Post.sizing.dPxRatio;
			height /= Post.sizing.dPxRatio;
		}
		if (Cfg.resizeImgs) {
			if (inPost) {
				maxSize = [Post.sizing.wWidth - this._offset - 3, Number.MAX_SAFE_INTEGER, 0];
			} else {
				maxWidth = Post.sizing.wWidth - 2;
				maxHeight = Post.sizing.wHeight - 2;
				maxSize = [maxWidth, maxHeight, maxWidth / maxHeight];
			}
		} else {
			maxSize = null;
		}
		temp = resizeImage([width, height, width / height], Cfg.minImgSize, maxSize);
		return [temp[0], temp[1], maxSize];
	},
	expand: function (inPost, e) {
		var size, el = this.el;
		if (!inPost) {
			if (Attachment.viewer) {
				if (Attachment.viewer.data === this) {
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
		(aib.hasPicWrap ? this._getImageParent() : el.parentNode).insertAdjacentHTML('afterend',
			'<div class="de-after-fimg"></div>');
		size = this.computeFullSize(inPost);
		el.parentNode.style.display = 'none';
		this._fullEl = this.getFullObject();
		this._fullEl.className = 'de-img-full';
		this._fullEl.style.width = size[0] + 'px';
		this._fullEl.style.height = size[1] + 'px';
		$after(el.parentNode, this._fullEl);
	},
	getFullObject: function () {
		var obj, src = this.src;
		if (this.isVideo) {
			if (aib.tiny) {
				src = src.replace(/^.*?\?v=|&.*?$/g, '');
			}
			if (nav.canPlayWebm) {
				obj = $add('<video style="width: 100%; height: 100%" src="' + src +
					'" loop autoplay ' + (Cfg.webmControl ? 'controls ' : '') +
					(Cfg.webmVolume === 0 ? 'muted ' : '') + '></video>');
				if (Cfg.webmVolume !== 0) {
					obj.oncanplay = function () {
						this.volume = Cfg.webmVolume / 100;
					};
				}
				obj.onerror = function () {
					if (!this.onceLoaded) {
						this.load();
						this.onceLoaded = true;
					}
				};
				obj.onvolumechange = function () {
					saveCfg('webmVolume', Math.round(this.volume * 100));
				};
			} else {
				obj = $add('<object style="width: 100%; height: 100%" data="' + src + '" type="video/quicktime">' +
					'<param name="pluginurl" value="http://www.apple.com/quicktime/download/" />' +
					'<param name="controller" value="' + (Cfg.webmControl ? 'true' : 'false') + '" />' +
					'<param name="autoplay" value="true" />' +
					'<param name="scale" value="tofit" />' +
					'<param name="volume" value="' + Math.round(Cfg.webmVolume * 2.55) + '" />' +
					'<param name="wmode" value="transparent" /></object>');
			}
		} else {
			obj = $add('<img style="width: 100%; height: 100%" src="' + src + '" alt="' + src + '"></a>');
			obj.onload = obj.onerror = function (e) {
				if (this.naturalHeight + this.naturalWidth === 0 && !this.onceLoaded) {
					this.src = this.src;
					this.onceLoaded = true;
				}
			};
		}
		return obj;
	},
	isControlClick: function (e, styleHeight) {
		return Cfg.webmControl && e.clientY >
			(e.target.getBoundingClientRect().top + parseInt(styleHeight, 10) - 30);
	},
	sendCloseEvent: function (e, inPost) {
		var pv = this.post,
			cr = pv.el.getBoundingClientRect(),
			x = e.pageX - pageXOffset,
			y = e.pageY - pageYOffset;
		if (!inPost) {
			while (x > cr.right || x < cr.left || y > cr.bottom || y < cr.top) {
				if (pv = pv.parent) {
					cr = pv.el.getBoundingClientRect();
				} else {
					if (Pview.top) {
						Pview.top.markToDel();
					}
					return;
				}
			}
			if (pv.kid) {
				pv.kid.markToDel();
			} else {
				clearTimeout(Pview.delTO);
			}
		} else if (x > cr.right || y > cr.bottom && Pview.top) {
			Pview.top.markToDel();
		}
	},

	_fullEl: null,
	get _offset() {
		var val = -1;
		if (this._useCache) {
			val = this._glob._offset;
		}
		if (val === -1) {
			if (this.post.hidden) {
				this.post.hideContent(false);
				val = this.el.getBoundingClientRect().left + window.pageXOffset;
				this.post.hideContent(true);
			} else {
				val = this.el.getBoundingClientRect().left + window.pageXOffset;
			}
			if (this._useCache) {
				this._glob._offset = val;
			}
		}
		Object.defineProperty(this, '_offset', { value: val });
		return val;
	}
};

function EmbeddedImage(post, el, idx) {
	this.post = post;
	this.el = el;
	this.idx = idx;
}
EmbeddedImage.prototype = Object.create(IAttachmentData.prototype, {
	_useCache: { value: false },
	_getImageSize: { value: function () {
		var iEl = new Image();
		iEl.src = this.el.src;
		return [iEl.width, iEl.height];
	} },
	_getImageSrc: { value: function () {
		return this.el.src;
	} },
	_getImageParent: { value: function () {
		return this.el.parentNode;
	} }
});

function Attachment(post, el, idx) {
	this.post = post;
	this.el = el;
	this.idx = idx;
}
Attachment.viewer = null;
Attachment.prototype = Object.create(IAttachmentData.prototype, {
	data: { get: function () {
		var img = this.el,
			cnv = this._glob.canvas,
			w = cnv.width = img.naturalWidth,
			h = cnv.height = img.naturalHeight,
			ctx = cnv.getContext('2d');
		ctx.drawImage(img, 0, 0);
		return [ctx.getImageData(0, 0, w, h).data.buffer, w, h];
	} },
	hash: { configurable: true, get: function () {
		var hash;
		if (this._processing) {
			this._needToHide = true;
		} else if (aib.fch || this.el.complete) {
			hash = this._maybeGetHash(null);
			if (hash !== null) {
				return hash;
			}
		} else {
			this.el.onload = this.el.onerror = this._onload.bind(this);
		}
		this.post.hashImgsBusy++;
		return null;
	} },
	info: { configurable: true, get: function () {
		var el = $c(aib.cFileInfo, aib.getImgWrap(this.el.parentNode)),
			val = el ? el.textContent : '';
		Object.defineProperty(this, 'info', { value: val });
		return val;
	} },
	weight: { configurable: true, get: function () {
		var val = aib.getImgWeight(this.info);
		Object.defineProperty(this, 'weight', { value: val });
		return val;
	} },
	getHash: { value: function atGetHash(Fn) {
		if (this.hasOwnProperty('hash')) {
			Fn(this.hash);
		} else {
			this.callback = Fn;
			if (!this._processing) {
				var hash = this._maybeGetHash();
				if (hash !== null) {
					Fn(hash);
				}
			}
		}
	} },

	_glob: { value: {
		get canvas() {
			var val = doc.createElement('canvas');
			Object.defineProperty(this, 'canvas', { value: val });
			return val;
		},
		get storage() {
			try {
				var val = JSON.parse(sesStorage['de-imageshash']);
			} finally {
				if (!val) {
					val = {};
				}
				spells.addCompleteFunc(this._saveStorage.bind(this));
				Object.defineProperty(this, 'storage', { value: val });
				return val;
			}
		},
		get workers() {
			var val = new workerQueue(4, genImgHash, function (e) {});
			spells.addCompleteFunc(this._clearWorkers.bind(this));
			Object.defineProperty(this, 'workers', { value: val, configurable: true });
			return val;
		},

		_expAttach: null,
		_offset: -1,
		_saveStorage: function () {
			sesStorage['de-imageshash'] = JSON.stringify(this.storage);
		},
		_clearWorkers: function () {
			this.workers.clear();
			delete this.workers;
		}
	} },
	_callback: { writable: true, value: null },
	_processing: { writable: true, value: false },
	_needToHide: { writable: true, value: false },
	_useCache: { configurable: true, get: function () {
		var val = !this.inPview && !this.post.isOp && !this.post.prev.omitted && !this.post.prev.isOp && this.post.count > 4;
		Object.defineProperty(this, '_useCache', { value: val });
		return val;
	} },
	_getImageSize: { value: function atGetImgSize() {
		return aib.getImgSize(this.info);
	} },
	_getImageSrc: { value: function atGetImageSrc() {
		return aib.getImgLink(this.el).href;
	} },
	_getImageParent: { value: function atGetImageWrap() {
		return aib.getImgParent(this.el.parentNode);
	} },
	_endLoad: { value: function atEndLoad(hash) {
		this.post.hashImgsBusy--;
		if (this.post.hashHideFun !== null) {
			this.post.hashHideFun(hash);
		}
	} },
	_maybeGetHash: { value: function atMaybeGetHash() {
		var data, val;
		if (this.src in this._glob.storage) {
			val = this._glob.storage[this.src];
		} else if (aib.fch) {
			downloadImgData(this.el.src, this._onload4chan.bind(this));
			this._callback = null;
			return null;
		} else if (this.el.naturalWidth + this.el.naturalHeight === 0) {
			val = -1;
		} else {
			data = this.data;
			this._glob.workers.run(data, [data[0]], this._wrkEnd.bind(this));
			this._callback = null;
			return null;
		}
		Object.defineProperty(this, 'hash', { value: val });
		return val;
	} },
	_onload: { value: function atOnLoad() {
		var hash = this._maybeGetHash(null);
		if (hash !== null) {
			this._endLoad(hash);
		}
	} },
	_onload4chan: { value: function atOnload4chan(maybeData) {
		if (maybeData === null) {
			Object.defineProperty(this, 'hash', { value: -1 });
			this._endLoad(-1);
		} else {
			var buffer = maybeData.buffer,
				data = [buffer, this.el.naturalWidth, this.el.naturalHeight];
			this._glob.workers.run(data, [buffer], this._wrkEnd.bind(this));
		}
	} },
	_wrkEnd: { value: function atWrkEnd(data) {
		var hash = data.hash;
		Object.defineProperty(this, 'hash', { value: hash });
		this._endLoad(hash);
		if (this.callback) {
			this.callback(hash);
			this.callback = null;
		}
		this._glob.storage[this.src] = hash;
	} }
});

function addImagesSearch(el) {
	for (var link, i = 0, els = $Q(aib.qImgLink, el), len = els.length; i < len; i++) {
		link = els[i];
		if (/google\.|tineye\.com|iqdb\.org/.test(link.href)) {
			$del(link);
			continue;
		}
		if (link.firstElementChild) {
			continue;
		}
		link.insertAdjacentHTML('beforebegin', '<span class="de-btn-src" de-menu="imgsrc"></span>');
	}
}

function embedImagesLinks(el) {
	for (var a, link, i = 0, els = $Q(aib.qMsgImgLink, el); link = els[i++];) {
		if (link.parentNode.tagName === 'SMALL') {
			return;
		}
		a = link.cloneNode(false);
		a.target = '_blank';
		a.innerHTML = '<img class="de-img-pre" src="' + a.href + '">';
		$before(link, a);
	}
}


// POSTS
// ===========================================================================================================

function Post(el, thr, num, count, isOp, prev) {
	var refEl, html;
	this.count = count;
	this.el = el;
	this.isOp = isOp;
	this.num = num;
	this._pref = refEl = $q(aib.qRef, el);
	this.prev = prev;
	this.thr = thr;
	this.ref = [];
	if (prev) {
		prev.next = this;
	}
	el.post = this;
	html = '<span class="de-post-btns' + (isOp ? '' : ' de-post-counter') +
		'"><span class="de-btn-hide" de-menu="hide"></span><span class="de-btn-rep"></span>';
	if (isOp) {
		if (!TNum && !aib.arch) {
			html += '<span class="de-btn-expthr" de-menu="expand"></span>';
		}
		html += '<span class="de-btn-fav" title="' + Lng.addFav[lang] + '"></span>';
	}
	if (this.sage = aib.getSage(el)) {
		html += '<span class="de-btn-sage" title="SAGE"></span>';
	}
	// html += '<span class="de-btn-udolil" style="font-weight: bold; color: red; cursor: pointer;">[УДОЛИЛ!!11]</span>';
	refEl.insertAdjacentHTML('afterend', html + '</span>');
	this.btns = refEl.nextSibling;
	if (Cfg.expandPosts === 1 && this.trunc) {
		this._getFull(this.trunc, true);
	}
	el.addEventListener('mouseover', this, true);
}
Post.hiddenNums = [];
Post.getWrds = function (text) {
	return text.replace(/\s+/g, ' ').replace(/[^a-zа-яё ]/ig, '').substring(0, 800).split(' ');
};
Post.findSameText = function (oNum, oHid, oWords, date, post) {
	var j, words = Post.getWrds(post.text),
		len = words.length,
		i = oWords.length,
		olen = i,
		_olen = i,
		n = 0;
	if (len < olen * 0.4 || len > olen * 3) {
		return;
	}
	while (i--) {
		if (olen > 6 && oWords[i].length < 3) {
			_olen--;
			continue;
		}
		j = len;
		while (j--) {
			if (words[j] === oWords[i] || oWords[i].match(/>>\d+/) && words[j].match(/>>\d+/)) {
				n++;
			}
		}
	}
	if (n < _olen * 0.4 || len > _olen * 3) {
		return;
	}
	if (oHid) {
		post.note = '';
		if (!post.spellHidden) {
			post.setVisib(false);
		}
		if (post.userToggled) {
			delete bUVis[brd][post.num];
			post.userToggled = false;
		}
	} else {
		post.setUserVisib(true, date, true);
		post.note = 'similar to >>' + oNum;
	}
	return false;
};
Post.sizing = {
	get dPxRatio() {
		var val = window.devicePixelRatio || 1;
		Object.defineProperty(this, 'dPxRatio', { value: val });
		return val;
	},
	get wHeight() {
		var val = window.innerHeight;
		if (!this._enabled) {
			window.addEventListener('resize', this, false);
			this._enabled = true;
		}
		Object.defineProperties(this, {
			'wWidth': { writable: true, configurable: true, value: doc.documentElement.clientWidth },
			'wHeight': { writable: true, configurable: true, value: val }
		});
		return val;
	},
	get wWidth() {
		var val = doc.documentElement.clientWidth;
		if (!this._enabled) {
			window.addEventListener('resize', this, false);
			this._enabled = true;
		}
		Object.defineProperties(this, {
			'wWidth': { writable: true, configurable: true, value: val },
			'wHeight': { writable: true, configurable: true, value: window.innerHeight }
		});
		return val;
	},
	handleEvent: function () {
		this.wHeight = window.innerHeight;
		this.wWidth = doc.documentElement.clientWidth;
	},

	_enabled: false
};
Post.prototype = {
	banned: false,
	deleted: false,
	hasRef: false,
	hasYTube: false,
	hidden: false,
	hashHideFun: null,
	hashImgsBusy: 0,
	imagesExpanded: false,
	inited: true,
	isPview: false,
	kid: null,
	next: null,
	omitted: false,
	parent: null,
	prev: null,
	spellHidden: false,
	sticked: false,
	userToggled: false,
	viewed: false,
	ytHideFun: null,
	ytInfo: null,
	ytLinksLoading: 0,
	addFuncs: function () {
		updRefMap(this, true);
		embedMP3Links(this);
		if (Cfg.addImgs) {
			embedImagesLinks(this.el);
		}
		if (isExpImg) {
			this.toggleImages(true);
		}
	},
	handleEvent: function (e) {
		var temp, el = e.target,
			type = e.type,
			isOutEvent = type === 'mouseout';
		if (type === 'click') {
			if (e.button !== 0) {
				return;
			}
			switch (el.tagName) {
			case 'IMG':
				if (el.classList.contains('de-video-thumb')) {
					if (Cfg.addYouTube === 3) {
						this.ytLink.classList.add('de-current');
						new YouTube().addPlayer(this.ytObj, this.ytInfo, el.classList.contains('de-ytube'));
						$pd(e);
					}
				} else if (Cfg.expandImgs !== 0) {
					this._clickImage(el, e);
				}
				return;
			case 'VIDEO':
				if (Cfg.expandImgs !== 0 && !(Cfg.webmControl && e.clientY >
					(el.getBoundingClientRect().top + parseInt(el.style.height, 10) - 30)))
				{
					this._clickImage(el, e);
				}
				return;
			case 'A':
				if (el.classList.contains('de-video-link')) {
					new YouTube().clickLink(this, el, Cfg.addYouTube);
					$pd(e);
				} else {
					temp = el.parentNode;
					if (temp === this.trunc) {
						this._getFull(temp, false);
						$pd(e);
						e.stopPropagation();
					} else if (Cfg.insertNum && pr.form && temp === this._pref &&
						!/Reply|Ответ/.test(el.textContent))
					{
						$pd(e);
						e.stopPropagation();
						if (pr.isQuick || (TNum && pr.isHidden)) {
							pr.showQuickReply(this, this.num, false, true);
						} else if (TNum) {
							$txtInsert(pr.txta, '>>' + this.num);
						} else {
							window.location = el.href.replace(/#i/, '#');
						}
					}
				}
				return;
			}
			switch (el.className) {
			case 'de-btn-expthr':
				this.thr.load(1, false, null);
				$del(this._menu);
				this._menu = null;
				return;
			case 'de-btn-fav': this.thr.setFavorState(true); return;
			case 'de-btn-fav-sel': this.thr.setFavorState(false); return;
			case 'de-btn-hide':
			case 'de-btn-hide-user':
				if (this.isPview) {
					pByNum[this.num].toggleUserVisib();
					this.btns.firstChild.className = 'de-btn-hide-user';
					if (pByNum[this.num].hidden) {
						this.btns.classList.add('de-post-hide');
					} else {
						this.btns.classList.remove('de-post-hide');
					}
				} else {
					this.toggleUserVisib();
				}
				$del(this._menu);
				this._menu = null;
				return;
			case 'de-btn-rep':
				pr.showQuickReply(this.isPview ? this.getTopParent() : this, this.num, !this.isPview, false);
				return;
			case 'de-btn-sage':
				addSpell(9, '', false);
				return;
			case 'de-btn-stick':
			case 'de-btn-stick-on':
				el.className = this.sticked ? 'de-btn-stick' : 'de-btn-stick-on';
				this.sticked = !this.sticked;
				return;
			case 'de-btn-udolil':
				this.thr.deletePost(this, false, true);
				return;
			}
			if (el.classList[0] === 'de-menu-item') {
				this._clickMenu(el);
			}
			return;
		}
		if (type === 'mouseover' && Cfg.expandImgs && !el.classList.contains('de-img-full') && this.allImages &&
			el.imgIdx !== undefined && (temp = this.allImages[el.imgIdx]) && (temp.isImage || temp.isVideo))
		{
			el.title = Cfg.expandImgs === 1 ? Lng.expImgInline[lang] : Lng.expImgFull[lang];
		}
		if (!this._hasEvents) {
			this._hasEvents = true;
			this.el.addEventListener('click', this, true);
			this.el.addEventListener('mouseout', this, true);
		} else if (this.isPview && isOutEvent) {
			this._handleMouseEvents(e.relatedTarget, false);
		}
		switch (el.classList[0]) {
		case 'de-btn-expthr':
		case 'de-btn-hide':
		case 'de-btn-hide-user':
			this._addButtonTitle(el);
		case 'de-btn-src':
			if (isOutEvent) {
				this._closeMenu(e.relatedTarget);
			} else {
				this._menuDelay = setTimeout(this._addMenu.bind(this, el), Cfg.linksOver);
			}
			return;
		case 'de-btn-rep':
			this._addButtonTitle(el);
			if (!isOutEvent) {
				quotetxt = $txtSelect();
			}
			return;
		case 'de-menu':
		case 'de-menu-item':
			if (isOutEvent) {
				this._closeMenu(e.relatedTarget);
			} else {
				clearTimeout(this._menuDelay);
			}
			return;
		default:
			if (!Cfg.linksNavig || el.tagName !== 'A' || el.lchecked) {
				if (this.isPview && !isOutEvent) {
					this._handleMouseEvents(e.relatedTarget, true);
				}
				return;
			}
			if (!el.textContent.startsWith('>>')) {
				el.lchecked = true;
				return;
			}
			// Don't use classList here, 'de-preflink ' should be first
			el.className = 'de-preflink ' + el.className;
			// fall through
		case 'de-reflink':
		case 'de-preflink':
			if (Cfg.linksNavig) {
				if (isOutEvent) {
					clearTimeout(this._linkDelay);
					if (this.kid) {
						this.kid.markToDel();
					} else if (!this.isPview && Pview.top) {
						Pview.top.markToDel();
					}
				} else {
					clearTimeout(Pview.delTO);
					this._linkDelay = setTimeout(this._addPview.bind(this, el), Cfg.linksOver);
				}
				$pd(e);
				e.stopPropagation();
			}
		}
	},
	hideContent: function (hide) {
		if (hide) {
			this.el.classList.add('de-post-hide');
		} else {
			this.el.classList.remove('de-post-hide');
		}
		if (nav.Chrome) {
			if (hide) {
				this.el.classList.remove('de-post-unhide');
			} else {
				this.el.classList.add('de-post-unhide');
			}
			if (!chromeCssUpd) {
				chromeCssUpd = setTimeout(function () {
					doc.head.insertAdjacentHTML('beforeend',
						'<style id="de-csshide" type="text/css">\
							.de-post-hide > ' + aib.qHide + ' { display: none !important; }\
							.de-post-unhide > ' + aib.qHide + ' { display: !important; }\
						</style>');
					$del(doc.head.lastChild);
					chromeCssUpd = null;
				}, 200);
			}
		}
	},
	hideRefs: function () {
		if (!Cfg.hideRefPsts || !this.hasRef) {
			return;
		}
		this.ref.forEach(function (num) {
			var pst = pByNum[num];
			if (pst && !pst.userToggled) {
				pst.setVisib(true);
				pst.note = 'reference to >>' + this.num;
				pst.hideRefs();
			}
		}, this);
	},
	getAdjacentVisPost: function (toUp) {
		var post = toUp ? this.prev : this.next;
		while (post) {
			if (post.thr.hidden) {
				post = toUp ? post.thr.op.prev : post.thr.last.next;
			} else if (post.hidden || post.omitted) {
				post = toUp ? post.prev : post.next
			} else {
				return post;
			}
		}
		return null;
	},
	get html() {
		var val = this.el.innerHTML;
		Object.defineProperty(this, 'html', { configurable: true,  value: val });
		return val;
	},
	get images() {
		var i, len, el, els = $Q(aib.qThumbImages, this.el),
			imgs = [];
		for (i = 0, len = els.length; i < len; ++i) {
			el = els[i];
			el.imgIdx = i;
			imgs.push(new Attachment(this, el, i));
		}
		Object.defineProperty(this, 'images', { value: imgs });
		return imgs;
	},
	get allImages() {
		var i, len, el, els, val = this.images.slice(),
			allIdx = val.length;
		if (Cfg.addImgs) {
			for (i = 0, els = $C('de-img-pre', this.el), len = els.length; i < len; ++i, ++allIdx) {
				el = els[i];
				el.imgIdx = allIdx;
				val.push(new EmbeddedImage(this, el, allIdx));
			}
		}
		Object.defineProperty(this, 'allImages', { value: val });
		return val;
	},
	get mp3Obj() {
		var val = $new('div', {'class': 'de-mp3'}, null);
		$before(this.msg, val);
		Object.defineProperty(this, 'mp3Obj', { value: val });
		return val;
	},
	get msg() {
		var val = $q(aib.qMsg, this.el);
		Object.defineProperty(this, 'msg', { configurable: true, value: val });
		return val;
	},
	get nextInThread() {
		var post = this.next;
		return !post || post.count === 0 ? null : post;
	},
	get nextNotDeleted() {
		var post = this.nextInThread;
		while (post && post.deleted) {
			post = post.nextInThread;
		}
		return post;
	},
	set note(val) {
		if (this.isOp) {
			this.noteEl.textContent = val ? '(autohide: ' + val + ')' : '(' + this.title + ')';
		} else if (!Cfg.delHiddPost) {
			this.noteEl.textContent = val ? 'autohide: ' + val : '';
		}
	},
	get noteEl() {
		var val;
		if (this.isOp) {
			val = this.thr.el.previousElementSibling.lastChild;
		} else {
			this.btns.insertAdjacentHTML('beforeend', '<span class="de-post-note"></span>');
			val = this.btns.lastChild;
		}
		Object.defineProperty(this, 'noteEl', { value: val });
		return val;
	},
	get posterName() {
		var pName = $q(aib.qName, this.el), val = pName ? pName.textContent : '';
		Object.defineProperty(this, 'posterName', { value: val });
		return val;
	},
	get posterTrip() {
		var pTrip = $c(aib.cTrip, this.el), val = pTrip ? pTrip.textContent : '';
		Object.defineProperty(this, 'posterTrip', { value: val });
		return val;
	},
	select: function () {
		if (this.isOp) {
			if (this.hidden) {
				this.thr.el.previousElementSibling.classList.add('de-selected');
			}
			this.thr.el.classList.add('de-selected');
		} else {
			this.el.classList.add('de-selected');
		}
	},
	setUserVisib: function (hide, date, sync) {
		this.setVisib(hide);
		this.btns.firstChild.className = 'de-btn-hide-user';
		this.userToggled = true;
		if (hide) {
			this.note = '';
			this.hideRefs();
		} else {
			this.unhideRefs();
		}
		bUVis[brd][this.num] = [+!hide, date];
		if (sync) {
			locStorage['__de-post'] = JSON.stringify({
				'brd': brd,
				'date': date,
				'isOp': this.isOp,
				'num': this.num,
				'hide': hide,
				'title': this.isOp ? this.title : ''
			});
			locStorage.removeItem('__de-post');
		}
	},
	setVisib: function (hide) {
		var el, tEl;
		if (this.hidden === hide) {
			return;
		}
		if (this.isOp) {
			this.hidden = this.thr.hidden = hide;
			tEl = this.thr.el;
			tEl.style.display = hide ? 'none' : '';
			el = $id('de-thr-hid-' + this.num);
			if (el) {
				el.style.display = hide ? '' : 'none';
			} else {
				tEl.insertAdjacentHTML('beforebegin', '<div class="' + aib.cReply +
					' de-thr-hid" id="de-thr-hid-' + this.num + '">' + Lng.hiddenThrd[lang] +
					' <a href="#">№' + this.num + '</a> <span class="de-thread-note"></span></div>');
				el = $t('a', tEl.previousSibling);
				el.onclick = el.onmouseover = el.onmouseout = function (e) {
					switch (e.type) {
					case 'click':
						this.toggleUserVisib();
						$pd(e);
						return;
					case 'mouseover': this.thr.el.style.display = ''; return;
					default: // mouseout
						if (this.hidden) {
							this.thr.el.style.display = 'none';
						}
					}
				}.bind(this);
			}
			return;
		}
		if (Cfg.delHiddPost) {
			if (hide) {
				this.wrap.classList.add('de-hidden');
				this.wrap.insertAdjacentHTML('beforebegin',
					'<span style="counter-increment: de-cnt 1;"></span>');
			} else if (this.hidden) {
				this.wrap.classList.remove('de-hidden');
				$del(this.wrap.previousSibling);
			}
		} else {
			if (!hide) {
				this.note = '';
			}
			this._pref.onmouseover = this._pref.onmouseout = hide && function (e) {
				this.hideContent(e.type === 'mouseout');
			}.bind(this);
		}
		this.hidden = hide;
		this.hideContent(hide);
		if (Cfg.strikeHidd) {
			setTimeout(this._strikePostNum.bind(this, hide), 50);
		}
	},
	spellHide: function (note) {
		this.spellHidden = true;
		if (!this.userToggled) {
			if (TNum && !this.deleted) {
				sVis[this.count] = 0;
			}
			if (!this.hidden) {
				this.hideRefs();
			}
			this.setVisib(true);
			this.note = note;
		}
	},
	spellUnhide: function () {
		this.spellHidden = false;
		if (!this.userToggled) {
			if (TNum && !this.deleted) {
				sVis[this.count] = 1;
			}
			this.setVisib(false);
			this.unhideRefs();
		}
	},
	get subj() {
		var subj = $c(aib.cSubj, this.el), val = subj ? subj.textContent : '';
		Object.defineProperty(this, 'subj', { value: val });
		return val;
	},
	get text() {
		var val = this.msg.innerHTML
			.replace(/<\/?(?:br|p|li)[^>]*?>/gi,'\n')
			.replace(/<[^>]+?>/g,'')
			.replace(/&gt;/g, '>')
			.replace(/&lt;/g, '<')
			.replace(/&nbsp;/g, '\u00A0')
			.trim();
		Object.defineProperty(this, 'text', { configurable: true, value: val });
		return val;
	},
	get title() {
		var val = this.subj || this.text.substring(0, 70).replace(/\s+/g, ' ')
		Object.defineProperty(this, 'title', { value: val });
		return val;
	},
	get tNum() {
		return this.thr.num;
	},
	toggleImages: function (expand) {
		for (var dat, i = 0, imgs = this.allImages, len = imgs.length; i < len; ++i) {
			dat = imgs[i];
			if (dat.isImage && (dat.expanded ^ expand)) {
				if (expand) {
					dat.expand(true, null);
				} else {
					dat.collapse(null);
				}
			}
		}
		this.imagesExpanded = expand;
	},
	toggleUserVisib: function () {
		var isOp = this.isOp,
			hide = !this.hidden,
			date = Date.now();
		this.setUserVisib(hide, date, true);
		if (isOp) {
			if (hide) {
				hThr[brd][this.num] = this.title;
			} else {
				delete hThr[brd][this.num];
			}
			saveHiddenThreads(false);
		}
		saveUserPosts(true);
	},
	get topCoord() {
		var el = this.isOp && this.hidden ? this.thr.el.previousElementSibling : this.el;
		return el.getBoundingClientRect().top;
	},
	get trunc() {
		var el = aib.qTrunc && $q(aib.qTrunc, this.el), val = null;
		if (el && /long|full comment|gekürzt|слишком|длинн|мног|полная версия/i.test(el.textContent)) {
			val = el;
		}
		Object.defineProperty(this, 'trunc', { configurable: true, value: val });
		return val;
	},
	unhideRefs: function () {
		if (!Cfg.hideRefPsts || !this.hasRef) {
			return;
		}
		this.ref.forEach(function (num) {
			var pst = pByNum[num];
			if (pst && pst.hidden && !pst.userToggled && !pst.spellHidden) {
				pst.setVisib(false);
				pst.unhideRefs();
			}
		});
	},
	unselect: function () {
		if (this.isOp) {
			var el = $id('de-thr-hid-' + this.num);
			if (el) {
				el.classList.remove('de-selected');
			}
			this.thr.el.classList.remove('de-selected');
		} else {
			this.el.classList.remove('de-selected');
		}
	},
	updateMsg: function (newMsg) {
		var origMsg = aib.dobr ? this.msg.firstElementChild : this.msg,
			ytExt = $c('de-video-ext', origMsg),
			ytLinks = $Q(':not(.de-video-ext) > .de-video-link', origMsg);
		origMsg.parentNode.replaceChild(newMsg, origMsg);
		Object.defineProperties(this, {
			'msg': { configurable: true, value: newMsg },
			'trunc': { configurable: true, value: null }
		});
		delete this.html;
		delete this.text;
		new YouTube().updatePost(this, ytLinks, $Q('a[href*="youtu"]', newMsg), false);
		if (ytExt) {
			newMsg.appendChild(ytExt);
		}
		this.addFuncs();
		spells.check(this);
		closeAlert($id('de-alert-load-fullmsg'));
	},
	get wrap() {
		var val = aib.getWrap(this.el, this.isOp);
		Object.defineProperty(this, 'wrap', { value: val });
		return val;
	},
	get ytData() {
		var val = [];
		Object.defineProperty(this, 'ytData', { value: val });
		return val;
	},
	get ytObj() {
		var val = aib.insertYtPlayer(this.msg, '<div class="de-video-obj"></div>');
		Object.defineProperty(this, 'ytObj', { value: val });
		return val;
	},

	_hasEvents: false,
	_linkDelay: 0,
	_menu: null,
	_menuDelay: 0,
	_selRange: null,
	_selText: '',
	_addButtonTitle: function (el) {
		if (el.hasTitle) {
			return;
		}
		el.hasTitle = true;
		switch (el.className) {
		case 'de-btn-hide':
		case 'de-btn-hide-user':
			el.title = Lng.togglePost[lang];
			return;
		case 'de-btn-expthr':
			el.title = Lng.expandThrd[lang];
			return;
		case 'de-btn-rep':
			el.title = Lng.replyToPost[lang];
			return;
		}
	},
	_addMenu: function (el) {
		var html, cr = el.getBoundingClientRect(),
			isLeft = false,
			className = 'de-menu ' + aib.cReply,
			xOffset = window.pageXOffset;
		switch (el.getAttribute('de-menu')) {
		case 'hide':
			if (!Cfg.menuHiddBtn) {
				return;
			}
			html = this._addMenuHide();
			break;
		case 'expand':
			html = '<span class="de-menu-item" info="thr-exp">' + Lng.selExpandThr[lang]
				.join('</span><span class="de-menu-item" info="thr-exp">') + '</span>';
			break;
		case 'imgsrc':
			isLeft = true;
			className += ' de-imgmenu';
			html = this._addMenuImgSrc(el);
			break;
		}
		doc.body.insertAdjacentHTML('beforeend', '<div class="' + className +
			'" style="position: absolute; ' + (
			isLeft ? 'left: ' + (cr.left + xOffset) :
				'right: ' + (doc.documentElement.clientWidth - cr.right - xOffset)
			) + 'px; top: ' + (window.pageYOffset + cr.bottom) + 'px;">' + html + '</div>');
		if (this._menu) {
			clearTimeout(this._menuDelay);
			$del(this._menu);
		}
		this._menu = doc.body.lastChild;
		this._menu.addEventListener('click', this, false);
		this._menu.addEventListener('mouseover', this, false);
		this._menu.addEventListener('mouseout', this, false);
	},
	_addMenuHide: function () {
		var sel, ssel, str = '', addItem = function (name) {
			str += '<span info="spell-' + name + '" class="de-menu-item">' +
				Lng.selHiderMenu[name][lang] + '</span>';
		};
		sel = nav.Presto ? doc.getSelection() : window.getSelection();
		if (ssel = sel.toString()) {
			this._selText = ssel;
			this._selRange = sel.getRangeAt(0);
			addItem('sel');
		}
		if (this.posterName) {
			addItem('name');
		}
		if (this.posterTrip) {
			addItem('trip');
		}
		if (this.images.length === 0) {
			addItem('noimg');
		} else {
			addItem('img');
			addItem('ihash');
		}
		if (this.text) {
			addItem('text');
		} else {
			addItem('notext');
		}
		return str;
	},
	_addMenuImgSrc: function (el) {
		var p = el.nextSibling.href + '" target="_blank">' + Lng.search[lang],
			c = doc.body.getAttribute('de-image-search'),
			str = '';
		if (c) {
			c = c.split(';');
			c.forEach(function (el) {
				var info = el.split(',');
				str += '<a class="de-src' + info[0] + (!info[1] ?
					'" onclick="de_isearch(event, \'' + info[0] + '\')" de-url="' :
					'" href="' + info[1]
					) + p + info[0] + '</a>';
			});
		}
		return '<a class="de-menu-item de-imgmenu de-src-iqdb" href="http://iqdb.org/?url=' + p + 'IQDB</a>' +
			'<a class="de-menu-item de-imgmenu de-src-tineye" href="http://tineye.com/search/?url=' + p + 'TinEye</a>' +
			'<a class="de-menu-item de-imgmenu de-src-google" href="http://google.com/searchbyimage?image_url=' + p + 'Google</a>' +
			'<a class="de-menu-item de-imgmenu de-src-saucenao" href="http://saucenao.com/search.php?url=' + p + 'SauceNAO</a>' + str;
	},
	_addPview: function (link) {
		var tNum = (link.pathname.match(/.+?\/[^\d]*(\d+)/) || [,0])[1],
			pNum = (link.textContent.trim().match(/\d+$/) || [tNum])[0],
			pv = this.isPview ? this.kid : Pview.top;
		if (pv && pv.num === pNum) {
			Pview.del(pv.kid);
			setPviewPosition(link, pv.el, Cfg.animation && animPVMove);
			if (pv.parent.num !== this.num) {
				$each($C('de-pview-link', pv.el), function (el) {
					el.classList.remove('de-pview-link');
				});
				pv._markLink(this.num);
			}
			this.kid = pv;
			pv.parent = this;
		} else if (!Cfg.noNavigHidd || !pByNum[pNum] || !pByNum[pNum].hidden) {
			this.kid = new Pview(this, link, tNum, pNum);
		}
	},
	_clickImage: function (el, e) {
		// We need to get allImages getter before imgIdx property, do not remove allImgs var
		var data, allImgs = this.allImages;
		if (el.classList.contains('de-img-full')) {
			if (!allImgs[el.previousSibling.firstElementChild.imgIdx].collapse(e)) {
				return;
			}
		} else if (el.imgIdx === undefined || !(data = allImgs[el.imgIdx]) || !(data.isImage || data.isVideo)) {
			return;
		} else {
			data.expand((Cfg.expandImgs === 1) ^ e.ctrlKey, e);
		}
		$pd(e);
		e.stopPropagation();
	},
	_clickMenu: function (el) {
		$del(this._menu);
		this._menu = null;
		switch (el.getAttribute('info')) {
		case 'spell-sel':
			var start = this._selRange.startContainer,
				end = this._selRange.endContainer;
			if (start.nodeType === 3) {
				start = start.parentNode;
			}
			if (end.nodeType === 3) {
				end = end.parentNode;
			}
			if ((nav.matchesSelector(start, aib.qMsg + ' *') && nav.matchesSelector(end, aib.qMsg + ' *')) ||
				(nav.matchesSelector(start, '.' + aib.cSubj) && nav.matchesSelector(end, '.' + aib.cSubj))
				) {
				if (this._selText.contains('\n')) {
					addSpell(1 /* #exp */, '/' +
						regQuote(this._selText).replace(/\r?\n/g, '\\n') + '/', false);
				} else {
					addSpell(0 /* #words */, this._selText.replace(/\)/g, '\\)').toLowerCase(), false);
				}
			} else {
				dummy.innerHTML = '';
				dummy.appendChild(this._selRange.cloneContents());
				addSpell(2 /* #exph */, '/' +
					regQuote(dummy.innerHTML.replace(/^<[^>]+>|<[^>]+>$/g, '')) + '/', false);
			}
			return;
		case 'spell-name': addSpell(6 /* #name */, this.posterName.replace(/\)/g, '\\)'), false); return;
		case 'spell-trip': addSpell(7 /* #trip */, this.posterTrip.replace(/\)/g, '\\)'), false); return;
		case 'spell-img':
			var img = this.images[0],
				w = img.weight,
				wi = img.width,
				h = img.height;
			addSpell(8 /* #img */, [0, [w, w], [wi, wi, h, h]], false);
			return;
		case 'spell-ihash':
			this.images[0].getHash(function (hash) {
				addSpell(4 /* #ihash */, hash, false);
			});
			return;
		case 'spell-noimg': addSpell(0x108 /* (#all & !#img) */, '', true); return;
		case 'spell-text':
			var num = this.num,
				hidden = this.hidden,
				wrds = Post.getWrds(this.text),
				time = Date.now();
			for (var post = firstThr.op; post; post = post.next) {
				Post.findSameText(num, hidden, wrds, time, post);
			}
			saveUserPosts(true);
			return;
		case 'spell-notext': addSpell(0x10B /* (#all & !#tlen) */, '', true); return;
		case 'thr-exp': this.thr.load(parseInt(el.textContent, 10), false, null); return;
		}
	},
	_closeMenu: function (rt) {
		clearTimeout(this._menuDelay);
		if (this._menu && (!rt || rt.className !== 'de-menu-item')) {
			this._menuDelay = setTimeout(function () {
				$del(this._menu);
				this._menu = null;
			}.bind(this), 75);
		}
	},
	_getFull: function (node, isInit) {
		if (aib.dobr) {
			$del(node.nextSibling);
			$del(node.previousSibling);
			$del(node);
			if (isInit) {
				this.msg.replaceChild($q('.alternate > div', this.el), this.msg.firstElementChild);
			} else {
				this.updateMsg($q('.alternate > div', this.el));
			}
			return;
		}
		if (!isInit) {
			$alert(Lng.loading[lang], 'load-fullmsg', true);
		}
		ajaxLoad(aib.getThrdUrl(brd, this.tNum), true, function (node, form, xhr) {
			if (this.isOp) {
				this.updateMsg(replacePost($q(aib.qMsg, form)));
				$del(node);
			} else {
				for (var i = 0, els = aib.getPosts(form), len = els.length; i < len; i++) {
					if (this.num === aib.getPNum(els[i])) {
						this.updateMsg(replacePost($q(aib.qMsg, els[i])));
						$del(node);
						return;
					}
				}
			}
		}.bind(this, node), null);
	},
	_markLink: function (pNum) {
		$each($Q('a[href*="' + pNum + '"]', this.el), function (num, el) {
			if (el.textContent === '>>' + num) {
				el.classList.add('de-pview-link');
			}
		}.bind(null, pNum));
	},
	_strikePostNum: function (isHide) {
		var idx, num = this.num;
		if (isHide) {
			Post.hiddenNums.push(+num);
		} else {
			idx = Post.hiddenNums.indexOf(+num);
			if (idx !== -1) {
				Post.hiddenNums.splice(idx, 1);
			}
		}
		$each($Q('a[href*="#' + num + '"]', dForm), isHide ? function (el) {
			el.classList.add('de-ref-hid');
		} : function (el) {
			el.classList.remove('de-ref-hid');
		});
	}
};


// PREVIEWS
// ===========================================================================================================

function Pview(parent, link, tNum, pNum) {
	var b, post = pByNum[pNum];
	this.parent = parent;
	this._link = link;
	this.num = pNum;
	this.thr = parent.thr;
	Object.defineProperty(this, 'tNum', { value: tNum });
	if (post && (!post.isOp || !parent.isPview || !parent._loaded)) {
		this._showPost(post);
		return;
	}
	b = link.pathname.match(/^\/?(.+\/)/)[1].replace(aib.res, '').replace(/\/$/, '');
	if (post = this._cache && this._cache[b + tNum] && this._cache[b + tNum].getPost(pNum)) {
		this._loaded = true;
		this._showPost(post);
	} else {
		this._showText('<span class="de-wait">' + Lng.loading[lang] + '</span>');
		ajaxLoad(aib.getThrdUrl(b, tNum), true, this._onload.bind(this, b), this._onerror.bind(this));
	}
}
Pview.clearCache = function () {
	Pview.prototype._cache = {};
};
Pview.del = function (pv) {
	if (!pv) {
		return;
	}
	var el, vPost = Attachment.viewer && Attachment.viewer.data.post;
	pv.parent.kid = null;
	if (!pv.parent.isPview) {
		Pview.top = null;
	}
	do {
		clearTimeout(pv._readDelay);
		if (vPost === pv) {
			Attachment.viewer.close(null);
			Attachment.viewer = vPost = null;
		}
		el = pv.el;
		if (Cfg.animation) {
			nav.animEvent(el, $del);
			el.classList.add('de-pview-anim');
			el.style[nav.animName] = 'de-post-close-' + (el.aTop ? 't' : 'b') + (el.aLeft ? 'l' : 'r');
		} else {
			$del(el);
		}
	} while (pv = pv.kid);
};
Pview.mouseEnter = function (post) {
	if (post.kid) {
		post.kid.markToDel();
	} else {
		clearTimeout(Pview.delTO);
	}
};
Pview.delTO = 0;
Pview.top = null;
Pview.prototype = Object.create(Post.prototype, {
	isPview: { value: true },
	getTopParent: { value: function pvGetBoardParent() {
		var post = this.parent;
		while (post.isPview) {
			post = post.parent;
		}
		return post;
	} },
	markToDel: { value: function pvMarkToDel() {
		clearTimeout(Pview.delTO);
		var lastSticked, el = this;
		do {
			if (el.sticked) {
				lastSticked = el;
			}
		} while (el = el.kid);
		if (!lastSticked || lastSticked.kid) {
			Pview.delTO = setTimeout(Pview.del, Cfg.linksOut, lastSticked ? lastSticked.kid : this);
		}
	} },

	_loaded: { value: false, writable: true },
	_cache: { value: {}, writable: true },
	_readDelay: { value: 0, writable: true },
	_handleMouseEvents: { value: function pvHandleMouseEvents(el, isOverEvent) {
		if (!el || (el !== this.el && !this.el.contains(el))) {
			if (isOverEvent) {
				Pview.mouseEnter(this);
			} else if (Pview.top && (!this._menu || (this._menu !== el && !this._menu.contains(el)))) {
				Pview.top.markToDel();
			}
		}
	} },
	_onerror: { value: function (eCode, eMsg, xhr) {
		Pview.del(this);
		this._showText(eCode === 404 ? Lng.postNotFound[lang] : getErrorMessage(eCode, eMsg));
	} },
	_onload: { value: function pvOnload(b, form, xhr) {
		var rm, parent = this.parent,
			parentNum = parent.num,
			cache = this._cache[b + this.tNum] = new PviewsCache(form, b, this.tNum),
			post = cache.getPost(this.num);
		if (post && (brd !== b || !post.hasRef || post.ref.indexOf(parentNum) === -1)) {
			if (post.hasRef) {
				rm = $c('de-refmap', post.el)
			} else {
				post.msg.insertAdjacentHTML('afterend', '<div class="de-refmap"></div>');
				rm = post.msg.nextSibling;
			}
			rm.insertAdjacentHTML('afterbegin', '<a class="de-reflink" href="' +
				aib.getThrdUrl(b, parent.tNum) + aib.anchor +
				parentNum + '">&gt;&gt;' + (brd === b ? '' : '/' + brd + '/') + parentNum +
				'</a><span class="de-refcomma">, </span>');
		}
		if (parent.kid === this) {
			Pview.del(this);
			if (post) {
				this._loaded = true;
				this._showPost(post);
			} else {
				this._showText(Lng.postNotFound[lang]);
			}
		}
	} },
	_showPost: { value: function pvShowPost(post) {
		var btns, el = this.el = post.el.cloneNode(true),
			pText = '<span class="de-btn-rep" title="' + Lng.replyToPost[lang] + '"></span>' +
				(post.sage ? '<span class="de-btn-sage" title="SAGE"></span>' : '') +
				'<span class="de-btn-stick" title="' + Lng.attachPview[lang] + '"></span>' +
				(post.deleted ? '' : '<span style="margin-right: 4px; vertical-align: 1px; color: #4f7942; ' +
				'font: bold 11px tahoma; cursor: default;">' + (post.isOp ? 'OP' : post.count + 1) + '</span>');
		el.post = this;
		el.className = aib.cReply + ' de-pview' + (post.viewed ? ' de-viewed' : '');
		el.style.display = '';
		if (Cfg.linksNavig === 2) {
			this._markLink(this.parent.num);
		}
		this._pref = $q(aib.qRef, el);
		if (post.inited) {
			this.btns = btns = $c('de-post-btns', el);
			this.isOp = post.isOp;
			btns.classList.remove('de-post-counter');
			if (post.hidden) {
				btns.classList.add('de-post-hide');
			}
			btns.innerHTML = '<span class="de-btn-hide' + (post.userToggled ? '-user' : '') + 
				'" de-menu="hide" title="' + Lng.togglePost[lang] + '"></span>' + pText;
			$each($Q((!TNum && post.isOp ? aib.qOmitted + ', ' : '') +
				'.de-img-full, .de-after-fimg', el), $del);
			$each($Q(aib.qThumbImages, el), function (el) {
				el.parentNode.style.display = '';
			});
			if (post.hasYTube) {
				if (post.ytInfo !== null) {
					Object.defineProperty(this, 'ytObj', { value: $c('de-video-obj', el) });
					this.ytInfo = post.ytInfo;
				}
				new YouTube().updatePost(this, $C('de-video-link', post.el), $C('de-video-link', el), true);
			}
			if (Cfg.addImgs) {
				$each($C('de-img-pre', el), function (el) {
					el.style.display = '';
				});
			}
			if (Cfg.markViewed) {
				this._readDelay = setTimeout(function (pst) {
					if (!pst.viewed) {
						pst.el.classList.add('de-viewed');
						pst.viewed = true;
					}
					var arr = (sesStorage['de-viewed'] || '').split(',');
					arr.push(pst.num);
					sesStorage['de-viewed'] = arr;
				}, post.text.length > 100 ? 2e3 : 500, post);
			}
		} else {
			this._pref.insertAdjacentHTML('afterend', '<span class="de-post-btns">' + pText + '</span');
			embedMP3Links(this);
			new YouTube().parseLinks(this);
			if (Cfg.addImgs) {
				embedImagesLinks(el);
			}
			if (Cfg.imgSrcBtns) {
				addImagesSearch(el);
			}
		}
		el.addEventListener('click', this, true);
		this._showPview(el);
	} },
	_showPview: { value: function pvShowPview(el, id) {
		if (this.parent.isPview) {
			Pview.del(this.parent.kid);
		} else {
			Pview.del(Pview.top);
			Pview.top = this;
		}
		this.parent.kid = this;
		el.addEventListener('mouseover', this, true);
		el.addEventListener('mouseout', this, true);
		(aib.arch ? doc.body : dForm).appendChild(el);
		setPviewPosition(this._link, el, false);
		if (Cfg.animation) {
			nav.animEvent(el, function (node) {
				node.classList.remove('de-pview-anim');
				node.style[nav.animName] = '';
			});
			el.classList.add('de-pview-anim');
			el.style[nav.animName] = 'de-post-open-' + (el.aTop ? 't' : 'b') + (el.aLeft ? 'l' : 'r');
		}
	} },
	_showText: { value: function pvShowText(txt) {
		this._showPview(this.el = $add('<div class="' + aib.cReply + ' de-pview-info de-pview">' +
			txt + '</div>'));
	} },
});

function PviewsCache(form, b, tNum) {
	var i, len, post, pBn = {},
		pProto = Post.prototype,
		thr = $q(aib.qThread, form) || form,
		posts = aib.getPosts(thr);
	for (i = 0, len = posts.length; i < len; ++i) {
		post = posts[i];
		pBn[aib.getPNum(post)] = Object.create(pProto, {
			count: { value: i + 1 },
			el: { value: post, writable: true },
			inited: { value: false },
			pvInited: { value: false, writable: true },
			ref: { value: [], writable: true }
		});
	}
	pBn[tNum] = this._opObj = Object.create(pProto, {
		inited: { value: false },
		isOp: { value: true },
		msg: { value: $q(aib.qMsg, thr), writable: true },
		ref: { value: [], writable: true }
	});
	this._brd = b;
	this._thr = thr;
	this._tNum = tNum;
	this._tUrl = aib.getThrdUrl(b, tNum);
	this._posts = pBn;
	if (Cfg.linksNavig === 2) {
		genRefMap(pBn, this._tUrl);
	}
}
PviewsCache.prototype = {
	getPost: function (num) {
		if (num === this._tNum) {
			return this._op;
		}
		var pst = this._posts[num];
		if (pst && !pst.pvInited) {
			pst.el = replacePost(pst.el);
			delete pst.msg;
			if (pst.hasRef) {
				addRefMap(pst, this._tUrl);
			}
			pst.pvInited = true;
		}
		return pst;
	},
	get _op() {
		var i, j, len, num, nRef, oRef, rRef, oOp, op = this._opObj;
		op.el = replacePost(aib.getOp(this._thr));
		op.msg = $q(aib.qMsg, op.el);
		if (this._brd === brd && (oOp = pByNum[this._tNum])) {
			oRef = op.ref;
			rRef = [];
			for (i = j = 0, nRef = oOp.ref, len = nRef.length; j < len; ++j) {
				num = nRef[j];
				if (oRef[i] === num) {
					i++;
				} else if (oRef.indexOf(num) !== -1) {
					continue;
				}
				rRef.push(num)
			}
			for (len = oRef.length; i < len; i++) {
				rRef.push(oRef[i]);
			}
			op.ref = rRef;
			if (rRef.length !== 0) {
				op.hasRef = true;
				addRefMap(op, this._tUrl);
			}
		} else if (op.hasRef) {
			addRefMap(op, this._tUrl);
		}
		Object.defineProperty(this, '_op', { value: op });
		return op;
	}
};

function PviewMoved() {
	if (this.style[nav.animName]) {
		this.classList.remove('de-pview-anim');
		this.style.cssText = this.newPos;
		this.newPos = false;
		$each($C('de-css-move', doc.head), $del);
		this.removeEventListener(nav.animEnd, PviewMoved, false);
	}
}

function animPVMove(pView, lmw, top, oldCSS) {
	var uId = 'de-movecss-' + Math.round(Math.random() * 1e3);
	$css('@' + nav.cssFix + 'keyframes ' + uId + ' {to { ' + lmw + ' top:' + top + '; }}').className =
		'de-css-move';
	if (pView.newPos) {
		pView.style.cssText = pView.newPos;
		pView.removeEventListener(nav.animEnd, PviewMoved, false);
	} else {
		pView.style.cssText = oldCSS;
	}
	pView.newPos = lmw + ' top:' + top + ';';
	pView.addEventListener(nav.animEnd, PviewMoved, false);
	pView.classList.add('de-pview-anim');
	pView.style[nav.animName] = uId;
}

function setPviewPosition(link, pView, animFun) {
	if (pView.link === link) {
		return;
	}
	pView.link = link;
	var isTop, top, oldCSS, cr = link.getBoundingClientRect(),
		offX = cr.left + window.pageXOffset + link.offsetWidth / 2,
		offY = cr.top + window.pageYOffset,
		bWidth = doc.documentElement.clientWidth,
		isLeft = offX < bWidth / 2,
		tmp = (isLeft ? offX : offX -
			Math.min(parseInt(pView.offsetWidth, 10), offX - 10)),
		lmw = 'max-width:' + (bWidth - tmp - 10) + 'px; left:' + tmp + 'px;';
	if (animFun) {
		oldCSS = pView.style.cssText;
		pView.style.cssText = 'opacity: 0; ' + lmw;
	} else {
		pView.style.cssText = lmw;
	}
	top = pView.offsetHeight;
	isTop = top + cr.top + link.offsetHeight < window.innerHeight || cr.top - top < 5;
	top = (isTop ? offY + link.offsetHeight : offY - top) + 'px';
	pView.aLeft = isLeft;
	pView.aTop = isTop;
	if (animFun) {
		animFun(pView, lmw, top, oldCSS);
	} else {
		pView.style.top = top;
	}
}

function addRefMap(post, tUrl) {
	var i, ref, len, bStr = '<a ' + aib.rLinkClick + ' href="' + tUrl + aib.anchor,
		html = ['<div class="de-refmap">'];
	for (i = 0, ref = post.ref, len = ref.length; i < len; ++i) {
		html.push(bStr, ref[i], '" class="de-reflink">&gt;&gt;', ref[i],
			'</a><span class="de-refcomma">, </span>');
	}
	html.push('</div>');
	if (aib.dobr) {
		post.msg.nextElementSibling.insertAdjacentHTML('beforeend', html.join(''));
	} else {
		post.msg.insertAdjacentHTML('afterend', html.join(''));
	}
}

function genRefMap(posts, thrURL) {
	var tc, lNum, post, ref, i, len, links, url, pNum, opNums = Thread.tNums;
	for (pNum in posts) {
		for (i = 0, links = $T('a', posts[pNum].msg), len = links.length; i < len; ++i) {
			tc = links[i].textContent;
			if (tc[0] === '>' && tc[1] === '>' && (lNum = +tc.substr(2)) && (lNum in posts)) {
				post = posts[lNum];
				ref = post.ref;
				if (ref.indexOf(pNum) === -1) {
					ref.push(pNum);
					post.hasRef = true;
				}
				if (opNums.indexOf(lNum) !== -1) {
					links[i].classList.add('de-opref');
				}
				if (thrURL) {
					url = links[i].getAttribute('href');
					if (url[0] === '#') {
						links[i].setAttribute('href', thrURL + url);
					}
				}
			}
		}
	}
}

function updRefMap(post, add) {
	var tc, ref, idx, link, lNum, lPost, i, len, links, pNum = post.num,
		strNums = add && Cfg.strikeHidd && Post.hiddenNums.length !== 0 ? Post.hiddenNums : null,
		opNums = add && Thread.tNums;
	for (i = 0, links = $T('a', post.msg), len = links.length; i < len; ++i) {
		link = links[i];
		tc = link.textContent;
		if (tc[0] === '>' && tc[1] === '>' && (lNum = +tc.substr(2)) && (lNum in pByNum)) {
			lPost = pByNum[lNum];
			if (!TNum) {
				link.href = '#' + (aib.fch ? 'p' : '') + lNum;
			}
			if (add) {
				if (strNums && strNums.lastIndexOf(lNum) !== -1) {
					link.classList.add('de-ref-hid');
				}
				if (opNums.indexOf(lNum) !== -1) {
					link.classList.add('de-opref');
				}
				if (lPost.ref.indexOf(pNum) === -1) {
					lPost.ref.push(pNum);
					post.hasRef = true;
					if (Cfg.hideRefPsts && lPost.hidden) {
						if (!post.hidden) {
							post.hideRefs();
						}
						post.setVisib(true);
						post.note = 'reference to >>' + lNum;
					}
				} else {
					continue;
				}
			} else if (lPost.hasRef) {
				ref = lPost.ref;
				idx = ref.indexOf(pNum);
				if (idx === -1) {
					continue;
				}
				ref.splice(idx, 1);
				if (ref.length === 0) {
					lPost.hasRef = false;
					$del($c('de-refmap', lPost.el));
					continue;
				}
			}
			$del($c('de-refmap', lPost.el));
			addRefMap(lPost, '');
		}
	}
}


// THREADS
// ===========================================================================================================

function Thread(el, prev) {
	if (aib._420 || aib.tiny) {
		$after(el, el.lastChild);
		$del($c('clear', el));
	}
	var i, pEl, lastPost,
		els = aib.getPosts(el),
		len = els.length,
		num = aib.getTNum(el),
		omt = TNum ? 1 : aib.getOmitted($q(aib.qOmitted, el), len);
	this.num = num;
	Thread.tNums.push(+num);
	this.pcount = omt + len;
	pByNum[num] = lastPost = this.op = el.post = new Post(aib.getOp(el), this, num, 0, true,
		prev ? prev.last : null);
	for (i = 0; i < len; i++) {
		num = aib.getPNum(pEl = els[i]);
		pByNum[num] = lastPost = new Post(pEl, this, num, omt + i, false, lastPost);
	}
	this.last = lastPost;
	el.style.counterReset = 'de-cnt ' + omt;
	el.removeAttribute('id');
	el.setAttribute('de-thread', null);
	visPosts = Math.max(visPosts, len);
	this.el = el;
	this.prev = prev;
	if (prev) {
		prev.next = this;
	}
}
Thread.parsed = false;
Thread.clearPostsMark = function () {
	firstThr.clearPostsMarks();
};
Thread.loadNewPosts = function (e) {
	if (e) {
		$pd(e);
	}
	$alert(Lng.loading[lang], 'newposts', true);
	firstThr.clearPostsMarks();
	updater.forceLoad();
};
Thread.tNums = [];
Thread.prototype = {
	hasNew: false,
	hidden: false,
	loadedOnce: false,
	next: null,
	get lastNotDeleted() {
		var post = this.last;
		while (post.deleted) {
			post = post.prev;
		}
		return post;
	},
	get nextNotHidden() {
		for (var thr = this.next; thr && thr.hidden; thr = thr.next) {}
		return thr;
	},
	get prevNotHidden() {
		for (var thr = this.prev; thr && thr.hidden; thr = thr.prev) {}
		return thr;
	},
	get topCoord() {
		return this.op.topCoord;
	},
	clearPostsMarks: function () {
		if (this.hasNew) {
			this.hasNew = false;
			$each($Q('.de-new-post', this.el), function (el) {
				el.classList.remove('de-new-post');
			});
			doc.removeEventListener('click', Thread.clearPostsMark, true);
		}
	},
	deletePost: function (post, delAll, removePost) {
		var tPost, idx = post.count, count = 0;
		do {
			if (removePost) {
				$del(post.wrap);
				delete pByNum[post.num];
				if (post.hidden) {
					post.unhideRefs();
				}
				updRefMap(post, false);
				if (post.prev.next = post.next) {
					post.next.prev = post.prev;
				}
				if (this.last === post) {
					this.last = post.prev;
				}
			} else {
				post.deleted = true;
				post.btns.classList.remove('de-post-counter');
				post.btns.classList.add('de-post-deleted');
				post.wrap.classList.add('de-post-removed');
				($q('input[type="checkbox"]', post.el) || {}).disabled = true;
			}
			post = post.nextNotDeleted;
			count++;
		} while (delAll && post);
		if (!spells.hasNumSpell) {
			sVis.splice(idx, count);
		}
		for (tPost = post; tPost; tPost = tPost.nextInThread) {
			tPost.count -= count;
		}
		this.pcount -= count;
		return post;
	},
	load: function (last, smartScroll, Fn) {
		if (!Fn) {
			$alert(Lng.loading[lang], 'load-thr', true);
		}
		ajaxLoad(aib.getThrdUrl(brd, this.num), true, function threadOnload(last, smartScroll, Fn, form, xhr) {
			this.loadFromForm(last, smartScroll, form);
			Fn && Fn();
		}.bind(this, last, smartScroll, Fn), function (eCode, eMsg, xhr) {
			$alert(getErrorMessage(eCode, eMsg), 'load-thr', false);
			if (typeof this === 'function') {
				this();
			}
		}.bind(Fn));
	},
	loadFromForm: function (last, smartScroll, form) {
		var nextCoord, els = aib.getPosts(form),
			op = this.op,
			thrEl = this.el,
			expEl = $c('de-expand', thrEl),
			nOmt = last === 1 ? 0 : Math.max(els.length - last, 0);
		if (smartScroll) {
			if (this.next) {
				nextCoord = this.next.topCoord;
			} else {
				smartScroll = false;
			}
		}
		pr.closeQReply();
		$del($q(aib.qOmitted + ', .de-omitted', thrEl));
		if (!this.loadedOnce) {
			if (op.trunc) {
				op.updateMsg(replacePost($q(aib.qMsg, form)));
			}
			op.ref = [];
			this.loadedOnce = true;
		}
		this._checkBans(op, form);
		this._parsePosts(els);
		thrEl.style.counterReset = 'de-cnt ' + (nOmt + 1);
		if (this._processExpandThread(els, last === 1 ? els.length : last)) {
			$del(expEl);
		} else if (!expEl) {
			thrEl.insertAdjacentHTML('beforeend', '<span class="de-expand">[<a href="' +
				aib.getThrdUrl(brd, this.num) + aib.anchor + this.last.num + '">' +
				Lng.collapseThrd[lang] + '</a>]</span>');
			thrEl.lastChild.onclick = function (e) {
				$pd(e);
				this.load(visPosts, true, null);
			}.bind(this);
		} else if (expEl !== thrEl.lastChild) {
			thrEl.appendChild(expEl);
		}
		if (nOmt !== 0) {
			op.el.insertAdjacentHTML('afterend', '<div class="de-omitted">' + nOmt + '</div>');
		}
		if (smartScroll) {
			scrollTo(pageXOffset, pageYOffset - (nextCoord - this.next.topCoord));
		}
		closeAlert($id('de-alert-load-thr'));
	},
	loadNew: function (Fn, useAPI) {
		if (aib.dobr && useAPI) {
			return getJsonPosts('/api/thread/' + brd + '/' + TNum + '.json',
				function checkNewPosts(status, sText, json, xhr) {
					if (status !== 200 || json.error) {
						Fn(status, sText || json.message, 0, xhr);
					} else {
						if (this._lastModified !== json.last_modified || this.pcount !== json.posts_count) {
							this._lastModified = json.last_modified;
							updater.updateXHR(this.loadNew(Fn, false));
						} else {
							Fn(200, '', 0, xhr);
						}
						Fn = null;
					}
				}.bind(this)
			);
		}
		return ajaxLoad(aib.getThrdUrl(brd, TNum), true, function parseNewPosts(form, xhr) {
			Fn(200, '', this.loadNewFromForm(form), xhr);
			Fn = null;
		}.bind(this), function (eCode, eMsg, xhr) {
			Fn(eCode, eMsg, 0, xhr);
			Fn = null;
		});
	},
	loadNewFromForm: function (form) {
		this._checkBans(firstThr.op, form);
		var lastOffset = pr.isVisible ? pr.topCoord : null,
			info = this._parsePosts(aib.getPosts(form));
		if (lastOffset !== null) {
			scrollTo(pageXOffset, pageYOffset - (lastOffset - pr.topCoord));
		}
		if (info[0] !== 0) {
			$id('de-panel-info').firstChild.textContent = this.pcount + '/' +
				$Q(aib.qThumbImages, dForm).length;
		}
		return info[1];
	},
	setFavBtn: function (state) {
		var el = $c(state ? 'de-btn-fav' : 'de-btn-fav-sel', this.op.btns);
		if (el) {
			el.className = state ? 'de-btn-fav-sel' : 'de-btn-fav';
			el.title = state ? Lng.delFav[lang] : Lng.addFav[lang];
		}
	},
	setFavorState: function (val) {
		this.setFavBtn(val);
		getStoredObj('DESU_Favorites', function (fav) {
			var h = aib.host,
				b = brd,
				num = this.num;
			if (val) {
				if (!fav[h]) {
					fav[h] = {};
				}
				if (!fav[h][brd]) {
					fav[h][brd] = {};
				}
				fav[h][brd].url = aib.prot + '//' + aib.host + aib.getPageUrl(brd, 0);
				fav[h][brd][num] = {
					'cnt': this.pcount,
					'new': 0,
					'txt': this.op.title,
					'url': aib.getThrdUrl(brd, num)
				};
			} else {
				removeFavoriteEntry(fav, h, b, num, false);
			}
			saveFavorites(fav);
		}.bind(this));
	},
	updateHidden: function (data) {
		var realHid, date = Date.now(),
			thr = this;
		do {
			realHid = thr.num in data;
			if (thr.hidden ^ realHid) {
				if (realHid) {
					thr.op.setUserVisib(true, date, false);
					data[thr.num] = thr.op.title;
				} else if (thr.hidden) {
					thr.op.setUserVisib(false, date, false);
				}
			}
		} while (thr = thr.next);
	},

	_lastModified: '',
	_addPost: function (parent, el, i, prev) {
		var post, num = aib.getPNum(el),
			wrap = aib.getWrap(el, false);
		el = replacePost(el);
		pByNum[num] = post = new Post(el, this, num, i, false, prev);
		Object.defineProperty(post, 'wrap', { value: wrap });
		parent.appendChild(wrap);
		if (TNum && Cfg.animation) {
			nav.animEvent(post.el, function (node) {
				node.classList.remove('de-post-new');
			});
			post.el.classList.add('de-post-new');
		}
		new YouTube().parseLinks(post);
		if (Cfg.imgSrcBtns) {
			addImagesSearch(el);
		}
		post.addFuncs();
		preloadImages(el);
		if (TNum && Cfg.markNewPosts) {
			this._addPostMark(el);
		}
		return post;
	},
	_addPostMark: function (postEl) {
		if (updater.focused) {
			this.clearPostsMarks();
		} else {
			if (!this.hasNew) {
				this.hasNew = true;
				doc.addEventListener('click', Thread.clearPostsMark, true);
			}
			postEl.classList.add('de-new-post');
		}
	},
	_checkBans: function (op, thrNode) {
		var pEl, bEl, post, i, bEls, len;
		if (aib.qBan) {
			for (i = 0, bEls = $Q(aib.qBan, thrNode), len = bEls.length; i < len; ++i) {
				bEl = bEls[i];
				pEl = aib.getPostEl(bEl);
				post = pEl ? pByNum[aib.getPNum(pEl)] : op;
				if (post && !post.banned) {
					if (!$q(aib.qBan, post.el)) {
						post.msg.appendChild(bEl);
					}
					post.banned = true;
				}
			}
		}
	},
	_importPosts: function (last, newPosts, begin, end) {
		var newCount, newVisCount, fragm = doc.createDocumentFragment(),
		newCount = newVisCount = end - begin;
		for (; begin < end; ++begin) {
			last = this._addPost(fragm, newPosts[begin], begin + 1, last);
			newVisCount -= spells.check(last);
		}
		return [newCount, newVisCount, fragm, last];
	},
	_parsePosts: function (nPosts) {
		var i, cnt, firstChangedPost, res, temp, saveSpells = false,
			newPosts = 0,
			newVisPosts = 0,
			len = nPosts.length,
			post = this.lastNotDeleted;
		if (aib.dobr || (post.count !== 0 &&
		   (post.count > len || aib.getPNum(nPosts[post.count - 1]) !== post.num)))
		{
			firstChangedPost = null;
			post = this.op.nextNotDeleted;
			for (i = post.count - 1; i < len && post; ) {
				if (post.num !== aib.getPNum(nPosts[i])) {
					if (+post.num > +aib.getPNum(nPosts[i])) {
						if (!firstChangedPost) {
							firstChangedPost = post.prev;
						}
						cnt = 0;
						do {
							cnt++;
							i++;
						} while (+aib.getPNum(nPosts[i]) < +post.num);
						res = this._importPosts(post.prev, nPosts, i - cnt, i);
						newPosts += res[0];
						this.pcount += res[0];
						newVisPosts += res[1];
						$after(post.prev.wrap, res[2]);
						res[3].next = post;
						post.prev = res[3];
						for (temp = post; temp; temp = temp.nextInThread) {
							temp.count += cnt;
						}
					} else {
						if (!firstChangedPost) {
							firstChangedPost = post;
						}
						post = this.deletePost(post, false, !TNum);
					}
				} else {
					i++;
					post = post.nextNotDeleted;
				}
			}
			if (i === len && post) {
				this.deletePost(post, true, !TNum);
			}
			if (firstChangedPost && spells.hasNumSpell) {
				disableSpells();
				for (post = firstChangedPost.nextInThread; post; post = post.nextInThread) {
					spells.check(post);
				}
				saveSpells = true;
			}
			if (newPosts !== 0) {
				for (post = firstChangedPost; post; post = post.nextInThread) {
					updRefMap(post, true);
				}
			}
		}
		if (len + 1 > this.pcount) {
			res = this._importPosts(this.last, nPosts, this.lastNotDeleted.count, len);
			newPosts += res[0];
			newVisPosts += res[1];
			this.el.appendChild(res[2]);
			this.last = res[3];
			this.pcount = len + 1;
			saveSpells = true;
		}
		getStoredObj('DESU_Favorites', function (fav) {
			var el, f, h = aib.host;
			if (fav[h] && fav[h][brd] && (f = fav[h][brd][this.op.num])) {
				if (el = $id('de-content-fav')) {
					el = $q('.de-fav-current > .de-entry[de-num="' + this.op.num + '"] .de-fav-inf-old', el);
					el.textContent = this.pcount;
					el = el.nextElementSibling;
					el.style.display = 'none';
					el.textContent = 0;
				}
				f.cnt = this.pcount;
				f['new'] = 0;
				setStored('DESU_Favorites', JSON.stringify(fav));
			}
		}.bind(this));
		if (saveSpells) {
			spells.end(savePosts);
		}
		return [newPosts, newVisPosts];
	},
	_processExpandThread: function (nPosts, num) {
		var i, fragm, tPost, len, needRMUpdate, post = this.op.next,
			vPosts = this.pcount === 1 ? 0 : this.last.count - post.count + 1;
		if (vPosts > num) {
			while (vPosts-- !== num) {
				post.wrap.classList.add('de-hidden');
				post.omitted = true;
				post = post.next;
			}
			needRMUpdate = false;
		} else if (vPosts < num) {
			fragm = doc.createDocumentFragment();
			tPost = this.op;
			len = nPosts.length;
			for (i = Math.max(0, len - num), len -= vPosts; i < len; ++i) {
				tPost = this._addPost(fragm, nPosts[i], i + 1, tPost);
				spells.check(tPost);
			}
			$after(this.op.wrap, fragm);
			tPost.next = post;
			if (post) {
				post.prev = tPost;
			}
			needRMUpdate = true;
			num = Math.min(len + vPosts, num);
		} else {
			return num <= visPosts;
		}
		while (vPosts-- !== 0) {
			if (post.trunc) {
				post.updateMsg(replacePost($q(aib.qMsg, nPosts[post.count - 1])));
			}
			if (post.omitted) {
				post.wrap.classList.remove('de-hidden');
				post.omitted = false;
			}
			if (needRMUpdate) {
				updRefMap(post, true);
			}
			post = post.next;
		}
		return num <= visPosts;
	}
};


// BROWSER
// ===========================================================================================================

function getNavFuncs() {
	if (!('contains' in String.prototype)) {
		String.prototype.contains = function (s) {
			return this.indexOf(s) !== -1;
		};
		String.prototype.startsWith = function (s) {
			return this.indexOf(s) === 0;
		};
	}
	if (!('repeat' in String.prototype)) {
		String.prototype.repeat = function (nTimes) {
		  return new Array(nTimes + 1).join(this.valueOf());
		};
	}
	if (!('clz32' in Math)) {
		Math.clz32 = function (x) {
			return x < 1 ? x === 0 ? 32 : 0 : 31 - ((Math.log(x) / Math.LN2) >> 0);
		};
	}
	if ('toJSON' in aProto) {
		delete aProto.toJSON;
	}
	if (!('URL' in window)) {
		window.URL = window.webkitURL;
	}
	var ua = window.navigator.userAgent,
		firefox = ua.contains('Gecko/'),
		presto = window.opera ? +window.opera.version() : 0,
		opera11 = presto ? presto < 12.1 : false,
		webkit = ua.contains('WebKit/'),
		chrome = webkit && ua.contains('Chrome/'),
		safari = webkit && !chrome,
		isGM = typeof GM_setValue === 'function' && 
			(!chrome || !GM_setValue.toString().contains('not supported')),
		isChromeStorage = window.chrome && !!window.chrome.storage,
		isScriptStorage = !!scriptStorage && !ua.contains('Opera Mobi'),
		scriptInstall =
			firefox ? (typeof Components !== 'undefined' && !!Components.interfaces.nsIFile ?
				'Greasemonkey' : 'Scriptish') :
			isChromeStorage ? 'Chrome extension' :
			isGM ? 'Monkey' : 'Native userscript';
	if (!window.GM_xmlhttpRequest) {
		window.GM_xmlhttpRequest = $xhr;
	}
	return {
		get ua() {
			return navigator.userAgent + (this.Firefox ? ' [' + navigator.buildID + ']' : '');
		},
		Firefox: firefox,
		Opera11: opera11,
		Presto: presto,
		WebKit: webkit,
		Chrome: chrome,
		Safari: safari,
		isGM: isGM,
		isChromeStorage: isChromeStorage,
		isScriptStorage: isScriptStorage,
		isGlobal: isGM || isChromeStorage || isScriptStorage,
		scriptInstall: scriptInstall,
		cssFix: webkit ? '-webkit-' : opera11 ? '-o-' : '',
		Anim: !opera11,
		animName: webkit ? 'webkitAnimationName' : opera11 ? 'OAnimationName' : 'animationName',
		animEnd: webkit ? 'webkitAnimationEnd' : opera11 ? 'oAnimationEnd' : 'animationend',
		animEvent: function (el, Fn) {
			el.addEventListener(this.animEnd, function aEvent() {
				this.removeEventListener(nav.animEnd, aEvent, false);
				Fn(this);
				Fn = null;
			}, false);
		},
		fixLink: safari ? getAbsLink : function fixLink(url) {
			return url;
		},
		get hasWorker() {
			var val = 'Worker' in (this.Firefox ? unsafeWindow : Window);
			Object.defineProperty(this, 'hasWorker', { value: val });
			return val;
		},
		get canPlayMP3() {
			var val = !!new Audio().canPlayType('audio/mpeg;');
			Object.defineProperty(this, 'canPlayMP3', { value: val });
			return val;
		},
		get canPlayWebm() {
			var val = !!new Audio().canPlayType('video/webm; codecs="vp8,vorbis"');
			Object.defineProperty(this, 'canPlayWebm', { value: val });
			return val;
		},
		get matchesSelector() {
			var dE = doc.documentElement,
				fun = dE.matchesSelector || dE.mozMatchesSelector ||
					dE.webkitMatchesSelector || dE.oMatchesSelector,
				val = Function.prototype.call.bind(fun);
			Object.defineProperty(this, 'matchesSelector', { value: val });
			return val;
		},
		// See https://github.com/greasemonkey/greasemonkey/issues/2034 for more info
		getUnsafeUint8Array: function (data, i, len) {
			var rv;
			if(typeof i === 'undefined') {
				rv = new Uint8Array(data);
				return rv instanceof Uint8Array ? rv : new unsafeWindow.Uint8Array(data);
			}
			rv = new Uint8Array(data, i, len);
			return rv instanceof Uint8Array ? rv : new unsafeWindow.Uint8Array(data, i, len);
		},
		getUnsafeDataView: function (data) {
			var rv = new DataView(data);
			return rv instanceof DataView ? rv : new unsafeWindow.DataView(data);
		}
	};
}


// IMAGEBOARD
// ===========================================================================================================

function getImageBoard(checkDomains, checkOther) {
	var prot = window.location.protocol;
	var ibDomains = {
		'02ch.net': [{
			qPostRedir: { value: 'input[name="gb2"][value="thread"]' },
			ru: { value: true },
			timePattern: { value: 'yyyy+nn+dd++w++hh+ii+ss' }
		}],
		'2chru.net': [{
			_2chru: { value: true }
		}, 'form[action*="imgboard.php?delete"]'],
		get '2-chru.net'() { return this['2chru.net']; },
		get '2-ch.su'() { return this['2--ch.ru']; },
		'2--ch.ru': [{
			tire: { value: true },

			qPages: { value: 'table[border="1"] tr:first-of-type > td:first-of-type a' },
			qPostRedir: { value: null },
			qTable: { value: 'table:not(.postfiles)' },
			qThread: { value: '.threadz' },
			getFileWrap: { value: function (el) {
				return el.parentNode;
			} },
			getOmitted: { value: function (el, len) {
				var txt;
				return el && (txt = el.textContent) ? +(txt.match(/\d+/) || [0])[0] - len : 1;
			} },
			getPageUrl: { value: function (b, p) {
				return fixBrd(b) + (p > 0 ? p : 0) + '.memhtml';
			} },
			css: { value: 'span[id$="_display"], #fastload { display: none !important; }' },
			docExt: { value: '.html' },
			fixFileInputs: { value: function (el) {
				var str = '><input name="file" maxlength="4" ' +
					'accept="|sid|7z|bz2|m4a|flac|lzh|mo3|rar|spc|fla|nsf|jpg|mpp|aac|gz|xm|wav|' +
					'mp3|png|it|lha|torrent|swf|zip|mpc|ogg|jpeg|gif|mod" type="file"></input></div>';
				el.parentNode.innerHTML = '<div' + str + ('<div style="display: none;"' + str).repeat(3);
			} },
			hasPicWrap: { value: true },
			isBB: { value: true },
			ru: { value: true }
		}],
		'410chan.org': [{
			_410: { value: true },

			qPostRedir: { value: 'input#noko' },
			getSage: { value: function (post) {
				var el = $c('filetitle', post);
				return el && el.textContent.contains('\u21E9');
			} },
			formButtons: { get: function () {
				return Object.create(this._formButtons, {
					tag: { value: ['**', '*', '__', '^^', '%%', '`', '', '', 'q'] }
				});
			} },
			isBB: { value: false },

			timePattern: { value: 'dd+nn+yyyy++w++hh+ii+ss' }
		}, 'script[src*="kusaba"]'],
		'420chan.org': [{ // Posting doesn't work (antispam protection)
			_420: { value: true },
			
			qBan: { value: '.ban' },
			qError: { value: 'pre' },
			qHide: { value: '.replyheader ~ *' },
			qPages: { value: '.pagelist > a:last-child' },
			qPostRedir: { value: null },
			qThread: { value: '[id*="thread"]' },
			getTNum: { value: function (op) {
				return $q('a[id]', op).id.match(/\d+/)[0];
			} },
			css: { value: '#content > hr, .hidethread, .ignorebtn, .opqrbtn, .qrbtn, noscript { display: none !important; }\
				.de-thr-hid { margin: 1em 0; }' },
			docExt: { value: '.php' },
			formButtons: { get: function () {
				return Object.create(this._formButtons, {
					tag: { value: ['**', '*', '', '', '%', 'pre', '', '', 'q'] }
				});
			} },
			isBB: { value: true }
		}],
		'4chan.org': [{
			fch: { value: true },
			
			cFileInfo: { value: 'fileText' },
			cOPost: { value: 'op' },
			cReply: { value: 'post reply' },
			cSubj: { value: 'subject' },
			qBan: { value: 'strong[style="color: red;"]' },
			qDelBut: { value: '.deleteform > input[type="submit"]' },
			qError: { value: '#errmsg' },
			qHide: { value: '.postInfo ~ *' },
			qImgLink: { value: '.fileText > a' },
			qName: { value: '.name' },
			qOmitted: { value: '.summary.desktop' },
			qPages: { value: '.pagelist > .pages:not(.cataloglink) > a:last-of-type' },
			qPostForm: { value: 'form[name="post"]' },
			qPostRedir: { value: null },
			qRef: { value: '.postInfo > .postNum' },
			qTable: { value: '.replyContainer' },
			qThumbImages: { value: '.fileThumb > img' },
			getPageUrl: { value: function (b, p) {
				return fixBrd(b) + (p > 1 ? p : '');
			} },
			getSage: { value: function (post) {
				return !!$q('.id_Heaven, .useremail[href^="mailto:sage"]', post);
			} },
			getTNum: { value: function (op) {
				return $q('input[type="checkbox"]', op).name.match(/\d+/)[0];
			} },
			getWrap: { value: function (el, isOp) {
				return el.parentNode;
			} },
			anchor: { value: '#p' },
			css: { value: '.backlink, .extButton, hr.desktop, .navLinks, .postMenuBtn, #togglePostFormLink { display: none !important; }\
				.postForm { display: table !important; }\
				textarea { margin-right: 0 !important; }' },
			docExt: { value: '' },
			firstPage: { value: 1 },
			formButtons: { get: function () {
				return Object.create(this._formButtons, {
					tag: { value: ['**', '*', '__', '^H', 'spoiler', 'code', '', '', 'q'] },
					bb: { value: [false, false, false, false, true, true, false, false, false] }
				});
			} },
			rLinkClick: { value: '' },
			rep: { value: true },
			res: { value: 'thread/' },
			timePattern: { value: 'nn+dd+yy+w+hh+ii-?s?s?' }
		}],
		'7chan.org': [{
			init: { value: function () { return true; } }
		}],
		'britfa.gs': [{
			init: { value: function () { return true; } }
		}],
		get 'dmirrgetyojz735v.onion'() { return this['2chru.net']; },
		'dobrochan.com': [{
			dobr: { value: true },

			anchor: { value: '#i' },
			cFileInfo: { value: 'fileinfo' },
			cSubj: { value: 'replytitle' },
			qDForm: { value: 'form[action*="delete"]' },
			qError: { value: '.post-error, h2' },
			qMsg: { value: '.postbody' },
			qOmitted: { value: '.abbrev > span:first-of-type' },
			qPages: { value: '.pages > tbody > tr > td' },
			qPostRedir: { value: 'select[name="goto"]' },
			qTrunc: { value: '.abbrev > span:nth-last-child(2)' },
			getFileWrap: { value: function (el) {
				return el.parentNode;
			} },
			getImgLink: { value: function (img) {
				var el = img.parentNode;
				if (el.tagName === 'A') {
					return el;
				}
				return $q('.fileinfo > a', img.previousElementSibling ? el : el.parentNode);
			} },
			getImgWrap: { value: function (el) {
				return el.tagName === 'A' ? (el.previousElementSibling ? el : el.parentNode).parentNode :
					el.firstElementChild.tagName === 'IMG' ? el.parentNode : el;
			} },
			getPageUrl: { value: function (b, p) {
				return fixBrd(b) + (p > 0 ? p + this.docExt : 'index.xhtml');
			} },
			getTNum: { value: function (op) {
				return $q('a[name]', op).name.match(/\d+/)[0];
			} },
			insertYtPlayer: { value: function (msg, playerHtml) {
				var prev = msg.previousElementSibling,
					node = prev.tagName === 'BR' ? prev : msg;
				node.insertAdjacentHTML('beforebegin', playerHtml);
				return node.previousSibling;
			} },
			css: { value: '.delete > img, .popup, .reply_, .search_google, .search_iqdb { display: none !important; }\
				.delete { background: none; }\
				.delete_checkbox { position: static !important; }\
				.file + .de-video-obj { float: left; margin: 5px 20px 5px 5px; }\
				.de-video-obj + div { clear: left; }' },
			disableRedirection: { value: function (el) {
				($q(this.qPostRedir, el) || {}).selectedIndex = 1;
			} },
			fixFileInputs: { value: function (el) {
				el = $id('files_parent');
				$each($Q('input[type="file"]', el), function (el) {
					el.removeAttribute('onchange');
				});
				el.firstElementChild.value = 1;
			} },
			hasPicWrap: { value: true },
			init: { value: function () {
				if (window.location.pathname === '/settings') {
					nav = getNavFuncs();
					$q('input[type="button"]', doc).addEventListener('click', function () {
						readCfg(function () {
							saveCfg('__hanarating', $id('rating').value);
						});
					}, false);
					return true;
				}
			} },
			rLinkClick: { value: 'onclick="Highlight(event, this.getAttribute(\'de-num\'))"' },
			ru: { value: true },
			timePattern: { value: 'dd+m+?+?+?+?+?+yyyy++w++hh+ii-?s?s?' }
		}],
		get 'dobrochan.org'() { return this['dobrochan.com']; },
		'dva-ch.net': [{
			dvachnet: { value: true },
		}],
		'hiddenchan.i2p': [{
			hid: { value: true }
		}, 'script[src*="kusaba"]'],
		get 'honokakawai.com'() { return this['2--ch.ru']; },
		'inach.org': [{
			qPostRedir: { value: 'input[name="fieldnoko"]' },
			css: { value: '#postform > table > tbody > tr:first-child { display: none !important; }' },
			init: { value: function () {
				if (doc.cookie.contains('no_captcha_cook=1') && window.location.pathname.contains('res')) {
					$id('captcha_field').innerHTML = 'Вам не нужно вводить капчу.';
				}
			} },
			isBB: { value: true },
			timePattern: { value: 'nn+dd+yyyy++w++hh+ii+ss' }
		}],
		'krautchan.net': [{
			krau: { value: true },
			
			cFileInfo: { value: 'fileinfo' },
			cReply: { value: 'postreply' },
			cRPost: { value: 'postreply' },
			cSubj: { value: 'postsubject' },
			qBan: { value: '.ban_mark' },
			qDForm: { value: 'form[action*="delete"]' },
			qError: { value: '.message_text' },
			qHide: { value: 'div:not(.postheader)' },
			qImgLink: { value: '.filename > a' },
			qOmitted: { value: '.omittedinfo' },
			qPages: { value: 'table[border="1"] > tbody > tr > td > a:nth-last-child(2) + a' },
			qPostRedir: { value: 'input#forward_thread' },
			qRef: { value: '.postnumber' },
			qThread: { value: '.thread_body' },
			qThumbImages: { value: 'img[id^="thumbnail_"]' },
			qTrunc: { value: 'p[id^="post_truncated"]' },
			getFileWrap: { value: function (el) {
				return el.parentNode;
			} },
			getImgWrap: { value: function (el) {
				return el.parentNode;
			} },
			getSage: { value: function (post) {
				return !!$c('sage', post);
			} },
			getTNum: { value: function (op) {
				return $q('input[type="checkbox"]', op).name.match(/\d+/)[0];
			} },
			insertYtPlayer: { value: function (msg, playerHtml) {
				var pMsg = msg.parentNode,
					prev = pMsg.previousElementSibling,
					node = prev.hasAttribute('style') ? prev : pMsg;
				node.insertAdjacentHTML('beforebegin', playerHtml);
				return node.previousSibling;
			} },
			css: { value: 'img[id^="translate_button"], img[src$="button-expand.gif"], img[src$="button-close.gif"], body > center > hr, form > div:first-of-type > hr, h2, .sage { display: none !important; }\
					div[id^="Wz"] { z-index: 10000 !important; }\
					.de-thr-hid { margin-bottom: ' + (!TNum ? '7' : '2') + 'px; float: none !important; }\
					.file_reply + .de-video-obj, .file_thread + .de-video-obj { margin: 5px 20px 5px 5px; float: left; }\
					.de-video-obj + div { clear: left; }' },
			fixFileInputs: { value: function (el) {
				var i, len, node = $id('files_parent'),
					str = '';
				for (i = 0, len = 4; i < len; ++i) {
					str += '<div' + (i === 0 ? '' : ' style="display: none;"') +
						'><input type="file" name="file_' +  i + '" tabindex="7"></input></div>';
				}
				node.innerHTML = str;
				node.removeAttribute('id');
			} },
			formButtons: { get: function () {
				return Object.create(this._formButtons, {
					tag: { value: ['b', 'i', 'u', 's', 'spoiler', 'aa', '', '', 'q'] },
				});
			} },
			hasPicWrap: { value: true },
			init: { value: function () {
				doc.body.insertAdjacentHTML('beforeend', '<div style="display: none;">' +
					'<div onclick="window.lastUpdateTime = 0;"></div>' +
					'<div onclick="if (boardRequiresCaptcha) { requestCaptcha(true); }"></div>' +
					'<div onclick="setupProgressTracking();"></div>' +
				'</div>');
				var els = doc.body.lastChild.children;
				this.btnZeroLUTime = els[0];
				this.initCaptcha = els[1];
				this.addProgressTrack = els[2];
			} },
			isBB: { value: true },
			rep: { value: true },
			res: { value: 'thread-' },
			rLinkClick: { value: 'onclick="highlightPost(this.textContent.substr(2)))"' },
			timePattern: { value: 'yyyy+nn+dd+hh+ii+ss+--?-?-?-?-?' }
		}],
		'mlpg.co': [{
			cOPost: { value: 'opContainer' },
			getWrap: { value: function (el, isOp) {
				return el.parentNode;
			} },
			css: { value: '.image-hover, form > div[style="text-align: center;"], form > div[style="text-align: center;"] + hr { display: none !important; }' },
			formButtons: { get: function () {
				return Object.create(this._formButtons, {
					tag: { value: ['b', 'i', 'u', '-', 'spoiler', 'c', '', '', 'q'] },
				});
			} },
			isBB: { value: true }
		}, 'form[name*="postcontrols"]'],
		'ponychan.net': [{
			pony: { value: true },
			
			cOPost: { value: 'op' },
			qPages: { value: 'table[border="0"] > tbody > tr > td:nth-child(2) > a:last-of-type' },
			css: { value: '#bodywrap3 > hr { display: none !important; }' }
		}, 'script[src*="kusaba"]'],
		'reptila.ch': [{
			qMsg: { value: '.message' },
		}, 'form[action*="imgboard.php?delete"]'],
		'syn-ch.ru': [{
			synch: { value: true },
			
			cFileInfo: { value: 'unimportant' },
			css: { value: '.fa-sort, .image_id { display: none !important; }\
				time:after { content: none; }' },
			formButtons: { get: function () {
				return Object.create(this._formButtons, {
					tag: { value: ['b', 'i', 'u', 's', 'spoiler', 'code', 'sub', 'sup', 'q'] },
				});
			} },
			init: { value: function () {
				var val = '{"simpleNavbar":true,"textCountForm":true,"showInfo":true}';
				if (locStorage.getItem('settings') !== val) {
					locStorage.setItem('settings', val);
					window.location.reload();
				}
			} },
			isBB: { value: true }
		}, 'form[name*="postcontrols"]'],
		get 'syn-ch.com'() { return this['syn-ch.ru']; },
		get 'syn-ch.org'() { return this['syn-ch.ru']; }
	};

	var ibEngines = {
		'section.posts': {
			mak: { value: true },

			cReply: { value: 'post reply' },
			cSubj: { value: 'post-title' },
			qBan: { value: 'font[color="#C12267"]' }, // FIXME
			qDForm: { value: '#posts-form' },
			qHide: { value: '.post-details ~ *' },
			qImgLink: { value: '.file-attr > .desktop' },
			qMsg: { value: '.post-message' },
			qName: { value: '.ananimas' },
			qOmitted: { value: '.mess-post' },
			qPostRedir: { value: null },
			qThumbImages: { value: '.preview' },
			qTrunc: { value: null },
			getImgParent: { value: function (el) {
				var el = $parent(el, 'FIGURE'),
					parent = el.parentNode;
				return parent.lastElementChild === el ? parent : el;
			} },
			getImgWrap: { value: function (el) {
				return $parent(el, 'FIGURE');
			} },
			getPNum: { value: function (post) {
				return post.getAttribute('data-num');
			} },
			getWrap: { value: function (el) {
				return el.parentNode;
			} },
			cssEn: { value: '.ABU-refmap, .box[onclick="ToggleSage()"], header > hr, img[alt="webm file"], label[for="name"], .media-expand-button, .norm-reply, .passcode-banner > hr, .postform-hr, .postpanel > :not(img), .posts > hr, .reflink:before, .thread-nav { display: none !important; }\
				.captcha-image > img { cursor: pointer; }\
				.de-abtn { transition: none; }\
				#de-txt-panel { font-size: 16px !important; }' },
			formButtons: { get: function () {
				return Object.create(this._formButtons, {
					tag: { value: ['B', 'I', 'U', 'S', 'SPOILER', 'CODE', 'SUP', 'SUB', 'q'] }
				});
			} },
			hasPicWrap: { value: true },
			init: { value: function () {
				$script('window.FormData = void 0;');
				doc.body.insertAdjacentHTML('afterbegin', '<div id="jcaptcha"></div>');
				var el = $q('tr:not([class])', doc.body);
				if (!el) {
					return;
				}
				doc.body.insertAdjacentHTML('beforeend', '<div style="display: none;">' +
					'<div onclick="loadCaptcha();"></div>' +
				'</div>');
				this.updateCaptcha = function (el, focus) {
					this.click();
					el.style.display = '';
					el = $id('captcha-value');
					if (el) {
						pr.cap = el;
						el.tabIndex = 999;
						if (focus) {
							el.focus();
						}
					}
				}.bind(doc.body.lastChild.firstChild, el);
				el.addEventListener('click', function (e) {
					if (e.target.tagName === 'IMG') {
						this.updateCaptcha(true);
					}
				}.bind(this), true);
			} },
			isBB: { value: true },
			lastPage: { configurable: true, get: function () {
				var els = $Q('.pager > a:not([class])', doc),
					val = els ? els.length : 1;
				Object.defineProperty(this, 'lastPage', { value: val });
				return val;
			} },
			rLinkClick: { value: '' }
		},
		'#ABU_css, #ShowLakeSettings': {
			abu: { value: true },

			qBan: { value: 'font[color="#C12267"]' },
			qDForm: { value: '#posts-form, #posts_form, #delform' },
			qOmitted: { value: '.mess_post, .omittedposts' },
			qPostRedir: { value: null },
			getImgWrap: { value: function (el) {
				return el.parentNode.parentNode;
			} },
			getSage: { writable: true, value: function (post) {
				if ($c('postertripid', dForm)) {
					this.getSage = function (post) {
						return !$c('postertripid', post);
					};
				} else {
					this.getSage = Object.getPrototypeOf(this).getSage;
				}
				return this.getSage(post);
			} },
			cssEn: { value: '#ABU_alert_wait, .ABU_refmap, #captcha_div + font, #CommentToolbar, .postpanel, #usrFlds + tbody > tr:first-child, body > center { display: none !important; }\
				.de-abtn { transition: none; }\
				#de-txt-panel { font-size: 16px !important; }\
				.reflink:before { content: none !important; }' },
			formButtons: { get: function () {
				return Object.create(this._formButtons, {
					tag: { value: ['b', 'i', 'u', 's', 'spoiler', 'code', 'sup', 'sub', 'q'] }
				});
			} },
			init: { value: function () {
				var cd = $id('captcha_div'),
				img = cd && $t('img', cd);
				if (img) {
					cd.setAttribute('onclick', ['var el, i = 4,',
						 'isCustom = (typeof event.detail === "object") && event.detail.isCustom;',
						 "if (!isCustom && event.target.tagName !== 'IMG') {",
						 'return;',
						 '}',
						 'do {', img.getAttribute('onclick'), '} while (--i > 0 && !/<img|не нужно/i.test(this.innerHTML));',
						 "if (el = this.getElementsByTagName('img')[0]) {",
						 "el.removeAttribute('onclick');",
						 "if ((!isCustom || event.detail.focus) && (el = this.querySelector('input[type=\\'text\\']'))) {",
						 'el.focus();',
						 '}',
						 '}'
					].join(''));
					img.removeAttribute('onclick');
				}
			} },
			isBB: { value: true }
		},
		'form[action*="futaba.php"]': {
			futa: { value: true },
			
			qDForm: { value: 'form:not([enctype])' },
			qImgLink: { value: 'a[href$=".jpg"], a[href$=".png"], a[href$=".gif"]' },
			qOmitted: { value: 'font[color="#707070"]' },
			qPostForm: { value: 'form:nth-of-type(1)' },
			qPostRedir: { value: null },
			qRef: { value: '.del' },
			qThumbImages: { value: 'a[href$=".jpg"] > img, a[href$=".png"] > img, a[href$=".gif"] > img' },
			getPageUrl: { value: function (b, p) {
				return fixBrd(b) + (p > 0 ? p + this.docExt : 'futaba.htm');
			} },
			getPNum: { value: function (post) {
				return $t('input', post).name;
			} },
			getPostEl: { value: function (el) {
				while (el && el.tagName !== 'TD' && !el.hasAttribute('de-thread')) {
					el = el.parentElement;
				}
				return el;
			} },
			getPosts: { value: function (thr) {
				return $Q('td:nth-child(2)', thr);
			} },
			getTNum: { value: function (op) {
				return $q('input[type="checkbox"]', op).name.match(/\d+/)[0];
			} },
			cssEn: { value: '.de-cfg-body, .de-content { font-family: arial; }\
				.ftbl { width: auto; margin: 0; }\
				.reply { background: #f0e0d6; }\
				span { font-size: inherit; }' },
			docExt: { value: '.htm' }
		},
		'form[action*="imgboard.php?delete"]': {
			tinyIb: { value: true },

			qPostRedir: { value: null },
			ru: { value: true }
		},
		'form[name*="postcontrols"]': {
			tiny: { value: true },
			
			cFileInfo: { value: 'fileinfo' },
			cReply: { value: 'post reply' },
			cSubj: { value: 'subject' },
			cTrip: { value: 'trip' },
			qDForm: { value: 'form[name="postcontrols"]' },
			qHide: { value: '.intro ~ *'},
			qImgLink: { value: 'p.fileinfo > a:first-of-type' },
			qMsg: { value: '.body' },
			qName: { value: '.name' },
			qOmitted: { value: '.omitted' },
			qPages: { value: '.pages > a:nth-last-of-type(2)' },
			qPostForm: { value: 'form[name="post"]' },
			qPostRedir: { value: null },
			qRef: { value: '.post_no:nth-of-type(2)' },
			qTable: { value: '.post.reply' },
			qTrunc: { value: '.toolong' },
			firstPage: { value: 1 },
			formButtons: { get: function () {
				return Object.create(this._formButtons, {
					tag: { value: ["'''", "''", '__', '^H', '**', '`', '', '', 'q'] },
				});
			} },
			timePattern: { value: 'nn+dd+yy++w++hh+ii+ss' },
			getPageUrl: { value: function (b, p) {
				return p > 1 ? fixBrd(b) + p + this.docExt : fixBrd(b);
			} },
			getTNum: { value: function (op) {
				return $q('input[type="checkbox"]', op).name.match(/\d+/)[0];
			} },
			cssEn: { get: function () {
				return '.banner, ' + (TNum ? '' : '.de-btn-rep, ') + '.mentioned, .post-hover { display: none !important; }\
				div.post.reply { float: left; clear: left; display: block; }\
				form, form table { margin: 0; }';
			} }
		},
		'script[src*="kusaba"]': {
			kus: { value: true },
			
			cOPost: { value: 'postnode' },
			qError: { value: 'h1, h2, div[style*="1.25em"]' },
			qPostRedir: { value: null },
			cssEn: { value: '.extrabtns, #newposts_get, .replymode, .ui-resizable-handle, blockquote + a { display: none !important; }\
				.ui-wrapper { display: inline-block; width: auto !important; height: auto !important; padding: 0 !important; }' },
			isBB: { value: true },
			rLinkClick: { value: 'onclick="highlight(this.textContent.substr(2), true)"' }
		},
		get 'form[action$="board.php"]'() { return this['script[src*="kusaba"]']; },
		'link[href$="phutaba.css"]': {
			cOPost: { value: 'thread_OP' },
			cReply: { value: 'post' },
			cRPost: { value: 'thread_reply' },
			qError: { value: '.error' },
			qMsg: { value: '.text' },
			cSubj: { value: 'subject' },
			cTrip: { value: 'tripcode' },
			qHide: { value: '.post > .post_body' },
			qPages: { value: '.pagelist > li:nth-last-child(2)' },
			qTrunc: { value: '.tldr' },
			qImgLink: { value: '.filename > a' },
			qPostRedir: { value: 'input[name="gb2"][value="thread"]' },
			css: { value: '.content > hr, .de-parea > hr { display: none !important }' },
			fixFileInputs: { value: function (el) {
				var str = '><input name="file" type="file"></input></div>';
				el.removeAttribute('onchange');
				el.parentNode.parentNode.innerHTML = '<div' + str + ('<div style="display: none;"' + str).repeat(3);
			} },
			getFileWrap: { value: function (el) {
				return el.parentNode;
			} },
			getImgWrap: { value: function (el) {
				return el.parentNode.parentNode;
			} },
			getSage: { value: function (post) {
				return !!$q('.sage', post);
			} },
			docExt: { value: '' },
			isBB: { value: true },
			res: { value: 'thread/' }
		}
	};

	var ibBase = {
		cFileInfo: 'filesize',
		cOPost: 'oppost',
		cReply: 'reply',
		cRPost: 'reply',
		cSubj: 'filetitle',
		cTrip: 'postertrip',
		qBan: '',
		qDelBut: 'input[type="submit"]',
		qDForm: '#delform, form[name="delform"]',
		qError: 'h1, h2, font[size="5"]',
		qHide: '.de-post-btns ~ *',
		get qImgLink() {
			var val = '.' + this.cFileInfo + ' a[href$=".jpg"], ' +
				'.' + this.cFileInfo + ' a[href$=".jpeg"], ' +
				'.' + this.cFileInfo + ' a[href$=".png"], ' +
				'.' + this.cFileInfo + ' a[href$=".gif"], ' +
				'.' + this.cFileInfo + ' a[href$=".webm"]';
			Object.defineProperty(this, 'qImgLink', { value: val });
			return val;
		},
		qMsg: 'blockquote',
		get qMsgImgLink() {
			var val = this.qMsg + ' a[href*=".jpg"], ' +
				this.qMsg + ' a[href*=".png"], ' +
				this.qMsg + ' a[href*=".gif"], ' +
				this.qMsg + ' a[href*=".jpeg"]';
			Object.defineProperty(this, 'qMsgImgLink', { value: val });
			return val;
		},
		qName: '.postername, .commentpostername',
		qOmitted: '.omittedposts',
		qPages: 'table[border="1"] > tbody > tr > td:nth-child(2) > a:last-of-type',
		qPostForm: '#postform',
		qPostRedir: 'input[name="postredir"][value="1"]',
		qRef: '.reflink',
		qTable: 'form > table, div > table, div[id^="repl"]',
		qThumbImages: '.thumb, .de-thumb, .ca_thumb, img[src*="thumb"], img[src*="/spoiler"], img[src^="blob:"]',
		get qThread() {
			var val = $c('thread', doc) ? '.thread' :
				$q('div[id*="_info"][style*="float"]', doc) ? 'div[id^="t"]:not([style])' :
				'[id^="thread"]';
			Object.defineProperty(this, 'qThread', { value: val });
			return val;
		},
		qTrunc: '.abbrev, .abbr, .shortened',
		getFileWrap: function (el) {
			return el;
		},
		getImgLink: function (img) {
			var el = img.parentNode;
			return el.tagName === 'SPAN' ? el.parentNode : el;
		},
		getImgParent: function (el) {
			return this.getImgWrap(el);
		},
		getImgSize: function (info) {
			if (info) {
				var sz = info.match(/(\d+)\s?[x×]\s?(\d+)/);
				return [sz[1], sz[2]];
			}
			return [-1, -1];
		},
		getImgWeight: function (info) {
			var w = info.match(/(\d+(?:[\.,]\d+)?)\s*([mkк])?i?[bб]/i);
			return w[2] === 'M' ? (w[1] * 1e3) | 0 : !w[2] ? Math.round(w[1] / 1e3) : w[1];
		},
		getImgWrap: function (el) {
			var node = (el.tagName === 'SPAN' ? el.parentNode : el).parentNode;
			return node.tagName === 'SPAN' ? node.parentNode : node;
		},
		getOmitted: function (el, len) {
			var txt;
			return el && (txt = el.textContent) ? +(txt.match(/\d+/) || [0])[0] + 1 : 1;
		},
		getOp: function (thr) {
			var el, op, opEnd;
			if (op = localRun && $q('div[de-oppost]', thr) || $c(this.cOPost, thr)) {
				return op;
			}
			op = thr.ownerDocument.createElement('div');
			op.setAttribute('de-oppost', '');
			opEnd = $q(this.qTable, thr);
			while ((el = thr.firstChild) !== opEnd) {
				op.appendChild(el);
			}
			if (thr.hasChildNodes()) {
				thr.insertBefore(op, thr.firstChild);
			} else {
				thr.appendChild(op);
			}
			return op;
		},
		getPNum: function (post) {
			return post.id.match(/\d+/)[0];
		},
		getPageUrl: function (b, p) {
			return fixBrd(b) + (p > 0 ? p + this.docExt : '');
		},
		getPostEl: function (el) {
			while (el && !el.classList.contains(this.cRPost) && !el.hasAttribute('de-thread')) {
				el = el.parentElement;
			}
			return el;
		},
		getPosts: function (thr) {
			return $Q('.' + this.cRPost, thr);
		},
		getSage: function (post) {
			var a = $q('a[href^="mailto:"], a[href="sage"]', post);
			return !!a && /sage/i.test(a.href);
		},
		getThrdUrl: function (b, tNum) {
			return this.prot + '//' + this.host + fixBrd(b) + this.res + tNum + this.docExt;
		},
		getTNum: function (op) {
			return $q('input[type="checkbox"]', op).value;
		},
		getWrap: function (el, isOp) {
			if (isOp) {
				return el;
			}
			if (el.tagName === 'TD') {
				Object.defineProperty(this, 'getWrap', { value: function (el, isOp) {
					return isOp ? el : $parent(el, 'TABLE');
				}});
			} else {
				Object.defineProperty(this, 'getWrap', { value: function (el, isOp) {
					return el;
				}});
			}
			return this.getWrap(el, isOp);
		},
		insertYtPlayer: function (msg, playerHtml) {
			msg.insertAdjacentHTML('beforebegin', playerHtml);
			return msg.previousSibling;
		},
		anchor: '#',
		css: '',
		cssEn: '',
		disableRedirection: function (el) {
			if (this.qPostRedir) {
				($q(this.qPostRedir, el) || {}).checked = true;
			}
		},
		dm: '',
		docExt: '.html',
		firstPage: 0,
		fixFileInputs: emptyFn,
		get _formButtons() {
			var bb = this.isBB;
			return {
				id: ['bold', 'italic', 'under', 'strike', 'spoil', 'code', 'sup', 'sub', 'quote'],
				val: ['B', 'i', 'U', 'S', '%', 'C', 'v', '^', '&gt;'],
				tag: bb ? ['b', 'i', 'u', 's', 'spoiler', 'code', '', '', 'q'] :
					['**', '*', '', '^H', '%%', '`', '', '', 'q'],
				bb: [bb, bb, bb, bb, bb, bb, bb, bb, bb]
			};
		},
		get formButtons() {
			return this._formButtons;
		},
		hasPicWrap: false,
		host: window.location.hostname,
		init: null,
		isBB: false,
		get lastPage() {
			var el = $q(this.qPages, doc),
				val = el && +aProto.pop.call(el.textContent.match(/\d+/g) || []) || 0;
			if (pageNum === val + 1) {
				val++;
			}
			Object.defineProperty(this, 'lastPage', { value: val });
			return val;
		},
		prot: prot,
		get reCrossLinks() {
			var val = new RegExp('>https?:\\/\\/[^\\/]*' + this.dm + '\\/([a-z0-9]+)\\/' +
				regQuote(this.res) + '(\\d+)(?:[^#<]+)?(?:#i?(\\d+))?<', 'g');
			Object.defineProperty(this, 'reCrossLinks', { value: val });
			return val;
		},
		get rep() {
			var val = dTime || spells.haveReps || Cfg.crossLinks;
			Object.defineProperty(this, 'rep', { value: val });
			return val;
		},
		res: 'res/',
		rLinkClick: 'onclick="highlight(this.textContent.substr(2))"',
		ru: false,
		timePattern: 'w+dd+m+yyyy+hh+ii+ss'
	};

	localRun = prot === 'file:';
	var i, ibObj = null, dm = localRun ?
		(window.location.pathname.match(/\/([^-]+)-[^-]+-[^\.]+\.[a-z]+$/) || [,''])[1] :
		window.location.hostname
			.match(/(?:(?:[^.]+\.)(?=org\.|net\.|com\.))?[^.]+\.[^.]+$|^\d+\.\d+\.\d+\.\d+$|localhost/)[0];
	if (checkDomains) {
		if (dm in ibDomains) {
			ibObj = (function createBoard(info) {
				return Object.create(
					info[2] ? createBoard(ibDomains[info[2]]) :
					info[1] ? Object.create(ibBase, ibEngines[info[1]]) :
					ibBase, info[0]
				);
			})(ibDomains[dm]);
			checkOther = false;
		}
	}
	if (checkOther) {
		for (i in ibEngines) {
			if ($q(i, doc)) {
				ibObj = Object.create(ibBase, ibEngines[i]);
				break;
			}
		}
		if (!ibObj) {
			ibObj = ibBase;
		}
	}
	if (ibObj) {
		ibObj.dm = dm;
	}
	return ibObj;
};


// INITIALIZATION
// ===========================================================================================================

function Initialization(checkDomains) {
	if (/^(?:about|chrome|opera|res)/i.test(window.location)) {
		return false;
	}
	try {
		locStorage = window.localStorage;
		sesStorage = window.sessionStorage;
		sesStorage['__de-test'] = 1;
	} catch(e) {
		if (typeof unsafeWindow !== 'undefined') {
			locStorage = unsafeWindow.localStorage;
			sesStorage = unsafeWindow.sessionStorage;
		}
	}
	if (!(locStorage && typeof locStorage === 'object' && sesStorage)) {
		console.log('WEBSTORAGE ERROR: please, enable webstorage!');
		return false;
	}
	var intrv, url;
	switch (window.name) {
	case '': break;
	case 'de-iframe-pform':
	case 'de-iframe-dform':
		$script('window.top.postMessage("A' + window.name + '" + document.documentElement.outerHTML, "*");');
		return false;
	case 'de-iframe-fav':
		intrv = setInterval(function () {
			$script('window.top.postMessage("B' + (doc.body.offsetHeight + 5) + '", "*");');
		}, 1500);
		window.addEventListener('load', setTimeout.bind(window, clearInterval, 3e4, intrv), false);
		liteMode = true;
		pr = {};
	}
	if (!aib) {
		aib = getImageBoard(checkDomains, true);
	}
	if (aib.init && aib.init()) {
		return false;
	}
	dForm = $q(aib.qDForm + ', form[de-form]', doc);
	if (!dForm || $id('de-panel')) {
		return false;
	}
	nav = getNavFuncs();

	window.addEventListener('storage', function (e) {
		var data, temp, post, val = e.newValue;
		if (!val) {
			return;
		}
		switch (e.key) {
		case '__de-post': {
			try {
				data = JSON.parse(val);
			} catch(e) {
				return;
			}
			temp = data.hide;
			if (data.brd === brd && (post = pByNum[data.num]) && (post.hidden ^ temp)) {
				post.setUserVisib(temp, data.date, false);
			} else {
				if (!(data.brd in bUVis)) {
					bUVis[data.brd] = {};
				}
				bUVis[data.brd][data.num] = [+!temp, data.date];
			}
			if (data.isOp) {
				if (!(data.brd in hThr)) {
					if (temp) {
						hThr[data.brd] = {};
					} else {
						break;
					}
				}
				if (temp) {
					hThr[data.brd][data.num] = data.title;
				} else {
					delete hThr[data.brd][data.num];
				}
			}
			break;
		}
		case '__de-threads': {
			try {
				hThr = JSON.parse(val);
			} catch(e) {
				return;
			}
			if (!(brd in hThr)) {
				hThr[brd] = {};
			}
			firstThr.updateHidden(hThr[brd]);
			break;
		}
		case '__de-spells': {
			try {
				data = JSON.parse(val);
			} catch(e) {
				return;
			}
			Cfg.hideBySpell = data.hide;
			if (temp = $q('input[info="hideBySpell"]', doc)) {
				temp.checked = data.hide;
			}
			doc.body.style.display = 'none';
			disableSpells();
			if (data.data) {
				spells.setSpells(data.data, false);
				if (temp = $id('de-spell-edit')) {
					temp.value = spells.list;
				}
			} else {
				if (data.data === '') {
					spells.disable();
					if (temp = $id('de-spell-edit')) {
						temp.value = '';
					}
					saveCfg('spells', '');
				}
				spells.enable = false;
			}
			doc.body.style.display = '';
		}
		default: return;
		}
		toggleContent('hid', true);
	}, false);

	if (localRun) {
		url = window.location.pathname.match(/\/[^-]+-([^-]+)-([^\.]+)\.[a-z]+$/);
		aib.prot = 'http:';
		aib.host = aib.dm;
		brd = url ? url[1] : '';
		TNum = url ? url[2] : '';
		pageNum = 0;
		aib.docExt = '.html';
	} else {
		url = (window.location.pathname || '').match(new RegExp(
			'^(?:\\/?([^\\.]*?(?:\\/[^\\/]*?)?)\\/?)?' + '(' + regQuote(aib.res) + ')?' +
			'(\\d+|index|wakaba|futaba)?' + '(\\.(?:[a-z]+))?(?:\\/|$)'
		));
		brd = url[1].replace(/\/$/, '');
		TNum = url[2] ? url[3] :
			aib.futa ? +(window.location.search.match(/\d+/) || [false])[0] :
			false;
		pageNum = url[3] && !TNum ? +url[3] || aib.firstPage : aib.firstPage;
		if (!aib.hasOwnProperty('docExt') && url[4]) {
			aib.docExt = url[4];
		}
	}
	dummy = doc.createElement('div');
	return true;
}

function parseThreadNodes(form, threads) {
	var el, i, len, node, fNodes = aProto.slice.call(form.childNodes),
		cThr = doc.createElement('div');
	for (i = 0, len = fNodes.length - 1; i < len; ++i) {
		node = fNodes[i];
		if (node.tagName === 'HR') {
			form.insertBefore(cThr, node);
			form.insertBefore(cThr.lastElementChild, node);
			el = cThr.lastElementChild;
			if (el.tagName === 'BR') {
				form.insertBefore(el, node);
			}
			threads.push(cThr);
			cThr = doc.createElement('div');
		} else {
			cThr.appendChild(node);
		}
	}
	cThr.appendChild(fNodes[i]);
	form.appendChild(cThr);
	return threads;
}

function parseDelform(node, thrds) {
	var i, lThr, len = thrds.length;
	$each($T('script', node), $del);
	if (len === 0) {
		Thread.parsed = true;
		if (localRun) {
			thrds = $Q('div[de-thread]', doc);
			len = thrds.length;
		}
		if (len === 0) {
			thrds = parseThreadNodes(dForm, []);
			len = thrds.length;
		}
	}
	if (len) {
		firstThr = lThr = new Thread(thrds[0], null);
	}
	for (i = 1; i < len; i++) {
		lThr = new Thread(thrds[i], lThr);
	}
	lastThr = lThr;
	node.setAttribute('de-form', '');
	node.removeAttribute('id');
	if (aib.abu && TNum) {
		lThr = firstThr.el;
		while ((node = lThr.nextSibling) && node.tagName !== 'HR') {
			$del(node);
		}
	}
}

function replaceString(txt) {
	if (dTime) {
		txt = dTime.fix(txt);
	}
	if (aib.fch || aib.krau) {
		if (aib.fch) {
			txt = txt.replace(/<\/?wbr>/g, '').replace(/ \(OP\)<\/a/g, '</a');
		}
		txt = txt.replace(/(^|>|\s|&gt;)(https*:\/\/[^"<>]*?)(<\/a>)?(?=$|<|\s)/ig, function (x, a, b, c) {
			return c ? x : a + '<a href="' + b + '">' + b + '</a>';
		});
	}
	if (spells.haveReps) {
		txt = spells.replace(txt);
	}
	if (Cfg.crossLinks) {
		txt = txt.replace(aib.reCrossLinks, function (str, b, tNum, pNum) {
			return '>&gt;&gt;/' + b + '/' + (pNum || tNum) + '<';
		});
	}
	return txt;
}

function replacePost(el) {
	if (aib.rep) {
		el.innerHTML = replaceString(el.innerHTML);
	}
	return el;
}

function replaceDelform() {
	if (liteMode) {
		doc.body.insertAdjacentHTML('afterbegin', dForm.outerHTML);
		dForm = doc.body.firstChild;
		window.addEventListener('load', function () {
			while (dForm.nextSibling) {
				$del(dForm.nextSibling);
			}
		}, false);
	} else if (aib.rep) {
		dForm.insertAdjacentHTML('beforebegin', replaceString(dForm.outerHTML));
		dForm.style.display = 'none';
		dForm.id = 'de-dform-old';
		dForm = dForm.previousSibling;
		window.addEventListener('load', function () {
			$del($id('de-dform-old'));
		}, false);
	}
}

function initDelformAjax() {
	var btn;
	if (Cfg.ajaxReply === 2) {
		dForm.onsubmit = $pd;
		if (btn = $q(aib.qDelBut, dForm)) {
			btn.onclick = function (e) {
				$pd(e);
				pr.closeQReply();
				$alert(Lng.deleting[lang], 'deleting', true);
				new html5Submit(dForm, e.target, checkDelete);
			};
		}
	} else if (Cfg.ajaxReply === 1) {
		dForm.insertAdjacentHTML('beforeend',
			'<iframe name="de-iframe-pform" src="about:blank" style="display: none;"></iframe>' +
			'<iframe name="de-iframe-dform" src="about:blank" style="display: none;"></iframe>'
		);
		dForm.target = 'de-iframe-dform';
		dForm.onsubmit = function () {
			pr.closeQReply();
			$alert(Lng.deleting[lang], 'deleting', true);
		};
	}
}

function initThreadUpdater(title, enableUpdate) {
	var focused, delay, checked4XX, loadTO, audioRep, currentXHR, audioEl, stateButton, hasAudio,
		initDelay, favIntrv, favNorm, favHref, notifGranted, enabled = false,
		disabledByUser = true,
		inited = false,
		lastECode = 200,
		sendError = false,
		newPosts = 0,
		aPlayers = 0;
	if (('hidden' in doc) || ('webkitHidden' in doc)) {
		focused = !(doc.hidden || doc.webkitHidden);
		doc.addEventListener((nav.WebKit ? 'webkit' : '') + 'visibilitychange', function () {
			if (doc.hidden || doc.webkitHidden) {
				focused = false;
				firstThr && firstThr.clearPostsMarks();
			} else {
				onVis();
			}
		}, false);
	} else {
		focused = false;
		window.addEventListener('focus', onVis, false);
		window.addEventListener('blur', function () {
			focused = false;
			firstThr.clearPostsMarks();
		}, false);
		window.addEventListener('mousemove', function mouseMove() {
			window.removeEventListener('mousemove', mouseMove, false);
			onVis();
		}, false);
	}
	if (enableUpdate) {
		init();
	}
	if (focused && Cfg.desktNotif && ('permission' in Notification)) {
		switch (Notification.permission.toLowerCase()) {
		case 'default': requestNotifPermission(); break;
		case 'denied': saveCfg('desktNotif', 0);
		}
	}

	function init() {
		audioEl = null;
		stateButton = null;
		hasAudio = false;
		initDelay = Cfg.updThrDelay * 1e3;
		favIntrv = 0;
		favNorm = notifGranted = inited = true;
		favHref = ($q('head link[rel="shortcut icon"]', doc) || {}).href;
		enable(true);
	}

	function enable(startLoading) {
		enabled = true;
		checked4XX = false;
		newPosts = 0;
		delay = initDelay;
		if (startLoading) {
			loadTO = setTimeout(loadPostsFun, delay);
		}
	}

	function disable(byUser) {
		disabledByUser = byUser;
		if (enabled) {
			clearTimeout(loadTO);
			enabled = hasAudio = false;
			setState('off');
			var btn = $id('de-btn-audio-on');
			if (btn) {
				btn.id = 'de-btn-audio-off';
			}
		}
	}

	function toggleAudio(aRep) {
		if (!audioEl) {
			audioEl = $new('audio', {
				'preload': 'auto',
				'src': 'https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/signal.ogg'
			}, null);
		}
		audioRep = aRep;
		return hasAudio = !hasAudio;
	}

	function audioNotif() {
		if (focused) {
			hasAudio = false;
		} else {
			audioEl.play()
			setTimeout(audioNotif, audioRep);
			hasAudio = true;
		}
	}

	function requestNotifPermission() {
		notifGranted = false;
		Notification.requestPermission(function (state) {
			if (state.toLowerCase() === 'denied') {
				saveCfg('desktNotif', 0);
			} else {
				notifGranted = true;
			}
		});
	}

	function loadPostsFun() {
		currentXHR = firstThr.loadNew(onLoaded, true);
	}

	function forceLoadPosts() {
		if (currentXHR) {
			currentXHR.abort();
		}
		if (!enabled && !disabledByUser) {
			enable(false);
		} else {
			clearTimeout(loadTO);
			delay = initDelay;
		}
		loadPostsFun();
	}

	function favIcoBlink() {
		$del($q('link[rel="shortcut icon"]', doc.head));
		doc.head.insertAdjacentHTML('afterbegin', '<link rel="shortcut icon" href="' +
			(!favNorm ? favHref : 'data:image/x-icon;base64,' + this) + '">');
		favNorm = !favNorm;
	}

	function onLoaded(eCode, eMsg, lPosts, xhr) {
		if (currentXHR !== xhr && eCode === 0) { // Loading aborted
			return;
		}
		currentXHR = null;
		infoLoadErrors(eCode, eMsg, -1);
		if (eCode !== 200 && eCode !== 304) {
			lastECode = eCode;
			if (Cfg.favIcoBlink && !focused && favHref) {
				clearInterval(favIntrv);
				favIntrv = setInterval(favIcoBlink.bind('iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAA3' +
					'NCSVQICAjb4U/gAAAALVBMVEX////QRDfQRDfQRDfQRDfQRDfQRDfQRDfQRDfQRDfQRDfQRDfQRDfQRDfQRDdi' +
					'Ad5MAAAAD3RSTlMAESIzRFVmd4iZu8zd7v9ufV8LAAAACXBIWXMAAAsSAAALEgHS3X78AAAAFXRFWHRDcmVhdG' +
					'lvbiBUaW1lADEwLzIvMTOFMzGTAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAAH9J' +
					'REFUCJljYEAAjbO3C0E067l37946ABlxLxWY6q4wMDDde+PAwPxGgYHj5bnLDAx1BQw8j3yBKvQ2MPA9YL53mI' +
					'HvAJDB4PPOAMjgfsTA/O4wUIrjOQODzdt5CQyM9wwYmO+9EWBg8H2uwDTvMdBkFqAVbwxAlqmvOV2I5AYASFUr' +
					'cXUe0gcAAAAASUVORK5CYII='), 800);
			}
			if (!Cfg.noErrInTitle) {
				updateTitle();
			}
			if (eCode !== 0 && eCode < 500) {
				if (!checked4XX && (eCode === 404 || eCode === 400)) {
					checked4XX = true;
				} else {
					updateTitle();
					disable(false);
					return;
				}
			}
			setState('warn');
			if (enabled) {
				loadTO = setTimeout(loadPostsFun, delay);
			}
			return;
		}
		if (lastECode !== 200) {
			lastECode = 200;
			setState('on');
			checked4XX = false;
			if ((focused || lPosts === 0) && !Cfg.noErrInTitle) {
				updateTitle();
			}
		}
		if (!focused) {
			if (lPosts !== 0) {
				if (Cfg.favIcoBlink && favHref && newPosts === 0) {
					favIntrv = setInterval(favIcoBlink.bind('iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAA' +
						'AABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbB' +
						'SAcACBAAAeaR9cIAAAAASUVORK5CYII='), 800);
				}
				newPosts += lPosts;
				updateTitle();
				if (Cfg.desktNotif && notifGranted) {
					var post = firstThr.last,
						imgs = post.images,
						notif = new Notification(aib.dm + '/' + brd + '/' + TNum + ': ' + newPosts +
							Lng.newPost[lang][lang !== 0 ? +(newPosts !== 1) : (newPosts % 10) > 4 ||
							(newPosts % 10) === 0 || (((newPosts % 100) / 10) | 0) === 1 ? 2 :
							(newPosts % 10) === 1 ? 0 : 1] + Lng.newPost[lang][3],
						{
							'body': post.text.substring(0, 250).replace(/\s+/g, ' '),
							'tag': aib.dm + brd + TNum,
							'icon': imgs.length === 0 ? favHref : imgs[0].src
						});
					notif.onshow = function () {
						setTimeout(this.close.bind(this), 12e3);
					};
					notif.onclick = function () {
						window.focus();
					};
					notif.onerror = function () {
						window.focus();
						requestNotifPermission();
					};
				}
				if (hasAudio) {
					if (audioRep) {
						audioNotif();
					} else {
						audioEl.play()
					}
				}
				delay = initDelay;
			} else if (delay !== 12e4) {
				delay = Math.min(delay + initDelay, 12e4);
			}
		}
		if (enabled) {
			loadTO = setTimeout(loadPostsFun, delay);
		}
	}

	function setState(state) {
		var btn = stateButton || (stateButton = $q('a[id^="de-btn-upd"]', doc));
		btn.id = 'de-btn-upd-' + state;
		btn.title = Lng.panelBtn['upd-' + (state === 'off' ? 'off' : 'on')][lang];
	}

	function onVis() {
		if (Cfg.favIcoBlink && favHref) {
			clearInterval(favIntrv);
			favNorm = true;
			$del($q('link[rel="shortcut icon"]', doc.head));
			doc.head.insertAdjacentHTML('afterbegin', '<link rel="shortcut icon" href="' + favHref + '">');
		}
		newPosts = 0;
		focused = true;
		sendError = false;
		setTimeout(function () {
			updateTitle();
			if (enabled) {
				forceLoadPosts();
			}
		}, 200);
	}

	function updateTitle() {
		doc.title = (aPlayers === 0 ? '' : '♫ ') +
			(sendError === true ? '{' + Lng.error[lang] + '} ' : '') +
			(lastECode === 200 ? '' : '{' + lastECode + '} ') +
			(newPosts === 0 ? '' : '[' + newPosts + '] ') + title;
	}

	function addPlayingTag() {
		aPlayers++;
		if (aPlayers === 1) {
			updateTitle();
		}
	}

	function removePlayingTag() {
		aPlayers = Math.max(aPlayers - 1, 0);
		if (aPlayers === 0) {
			updateTitle();
		}
	}

	function sendErrNotif() {
		if (Cfg.sendErrNotif && !focused) {
			sendError = true;
			updateTitle();
		}
	}

	return {
		get enabled() {
			return enabled;
		},
		get focused() {
			return focused;
		},
		forceLoad: forceLoadPosts,
		enable: function () {
			if (!inited) {
				init();
			} else if (!enabled) {
				enable(true);
			} else {
				return;
			}
			setState('on');
		},
		disable: function () {
			disable(true);
		},
		updateXHR: function (newXHR) {
			currentXHR = newXHR;
		},
		toggleAudio: toggleAudio,
		addPlayingTag: addPlayingTag,
		removePlayingTag: removePlayingTag,
		sendErrNotif: sendErrNotif
	};
}

function initPage() {
	if (Cfg.updScript) {
		checkForUpdates(false, function (html) {
			$alert(html, 'updavail', false);
		});
	}
	if (TNum) {
		if (Cfg.rePageTitle) {
			doc.title = '/' + brd + ' - ' + firstThr.op.title;
		}
		if (!localRun) {
			firstThr.el.insertAdjacentHTML('afterend',
				'<div id="de-updater-div">&gt;&gt; [<a class="de-abtn" id="de-updater-btn" href="#"></a>]' +
				(aib.mak ? '[<a class="de-abtn" href="#" onclick="UnbanShow();">Реквест разбана</a>]' : '') +
				'</div>');
			firstThr.el.nextSibling.addEventListener('click', Thread.loadNewPosts, false);
		}
	} else if (needScroll) {
		setTimeout(window.scrollTo, 20, 0, 0);
	}
	updater = initThreadUpdater(doc.title, TNum && Cfg.ajaxUpdThr);
}

function checkForUpdates(isForce, Fn) {
	var day, temp = Cfg.scrUpdIntrv;
	if (!isForce) {
		day = 2 * 1000 * 60 * 60 * 24;
		switch (temp) {
		case 0: temp = day; break;
		case 1: temp = day * 2; break;
		case 2: temp = day * 7; break;
		case 3: temp = day * 14; break;
		default: temp = day * 30;
		}
		if (Date.now() - +comCfg.lastUpd < temp) {
			return;
		}
	}
	GM_xmlhttpRequest({
		'method': 'GET',
		'url': 'https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.meta.js',
		'headers': {'Content-Type': 'text/plain'},
		'onreadystatechange': function (xhr) {
			if (xhr.readyState !== 4) {
				return;
			}
			if (xhr.status === 200) {
				var dVer = xhr.responseText.match(/@version\s+([0-9.]+)/)[1].split('.'),
					cVer = version.split('.'),
					len = cVer.length > dVer.length ? cVer.length : dVer.length,
					i = 0,
					isUpd = false;
				if (!dVer) {
					if (isForce) {
						Fn('<div style="color: red; font-weigth: bold;">' + Lng.noConnect[lang] + '</div>');
					}
					return;
				}
				saveComCfg('lastUpd', Date.now());
				while (i < len) {
					if ((+dVer[i] || 0) > (+cVer[i] || 0)) {
						isUpd = true;
						break;
					} else if ((+dVer[i] || 0) < (+cVer[i] || 0)) {
						break;
					}
					i++;
				}
				if (isUpd) {
					Fn('<a style="color: blue; font-weight: bold;" href="https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.user.js">' +
					Lng.updAvail[lang] + '</a>');
				} else if (isForce) {
					Fn(Lng.haveLatest[lang]);
				}
			} else if (isForce) {
				Fn('<div style="color: red; font-weigth: bold;">' + Lng.noConnect[lang] + '</div>');
			}
		}
	});
}


// CSS
// ===========================================================================================================

function getThemeLang() {
	return !Cfg.scriptStyle ? 'fr' :
		Cfg.scriptStyle === 1 ? 'en' :
		'de';
}

function scriptCSS() {
	var p, x = '';
	function cont(id, src) {
		return id + ':before { content: ""; padding: 0 16px 0 0; margin: 0 4px; background: url(' + src + ') no-repeat center; }';
	}
	function gif (id, src) {
		return id + ' { background: url(data:image/gif;base64,' + src + ') no-repeat center !important; }';
	}

	// Settings window
	x += '#de-main- { -moz-box-sizing: content-box; box-sizing: content-box; }\
		.de-block { display: block; }\
		#de-content-cfg > div { float: left; border-radius: 10px 10px 0 0; width: auto; min-width: 0; padding: 0; margin: 5px 20px; }\
		.de-cfg-head { padding: 3px; border-radius: 10px 10px 0 0; color: #fff; text-align: center; font: bold 14px arial; cursor: default; }\
		.de-cfg-head:lang(en), #de-panel:lang(en) { background: linear-gradient(to bottom, #4b90df, #3d77be 5px, #376cb0 7px, #295591 13px, rgba(0,0,0,0) 13px), linear-gradient(to bottom, rgba(0,0,0,0) 12px, #183d77 13px, #1f4485 18px, #264c90 20px, #325f9e 25px); }\
		.de-cfg-head:lang(fr), #de-panel:lang(fr) { background: linear-gradient(to bottom, #7b849b, #616b86 2px, #3a414f 13px, rgba(0,0,0,0) 13px), linear-gradient(to bottom, rgba(0,0,0,0) 12px, #121212 13px, #1f2740 25px); }\
		.de-cfg-head:lang(de), #de-panel:lang(de) { background: #777; }\
		.de-cfg-body { min-height: 304px; min-width: 357px; padding: 11px 7px 7px; margin-top: -1px; font: 13px sans-serif !important;}\
		.de-cfg-body input, .de-cfg-body label, .de-cfg-body select { width: auto; padding: 0 !important; margin: 1px 2px !important; }\
		.de-cfg-body input[type="button"], .de-cfg-body input[type="text"] { padding: 1px 2px !important; }\
		.de-cfg-body, #de-cfg-btns { border: 1px solid #183d77; border-top: none; }\
		.de-cfg-body:lang(de), #de-cfg-btns:lang(de) { border-color: #444; }\
		#de-cfg-btns { padding: 3px; font-size: 13px !important; }\
		#de-cfg-btns input { padding: 0 3px; }\
		#de-cfg-bar { width: 100%; display: table; background-color: #1f2740; margin: 0; padding: 0; }\
		#de-cfg-bar:lang(en) { background-color: #325f9e; }\
		#de-cfg-bar:lang(de) { background-color: #777; }\
		.de-cfg-depend { padding-left: 25px; }\
		.de-cfg-tab { padding: 4px 4px; border-radius: 4px 4px 0 0; font: bold 12px arial; text-align: center; cursor: default; }\
		.de-cfg-tab-back { display: table-cell !important; float: none !important; width:auto; min-width: 0 !important; padding: 0 !important; box-shadow: none !important; border: 1px solid #183d77 !important; border-radius: 4px 4px 0 0 !important; opacity: 1; }\
		.de-cfg-tab-back:lang(de) { border-color: #444 !important; }\
		.de-cfg-tab-back:lang(fr) { border-color: #121421 !important; }\
		.de-cfg-tab-back[selected="true"] { border-bottom: none !important; }\
		.de-cfg-tab-back[selected="false"] > .de-cfg-tab { background-color: rgba(0,0,0,.2); }\
		.de-cfg-tab-back[selected="false"] > .de-cfg-tab:lang(en), .de-cfg-tab-back[selected="false"] > .de-cfg-tab:lang(fr) { background: linear-gradient(to bottom, rgba(132,132,132,.35) 0%, rgba(79,79,79,.35) 50%, rgba(40,40,40,.35) 50%, rgba(80,80,80,.35) 100%) !important; }\
		.de-cfg-tab-back[selected="false"] > .de-cfg-tab:hover { background-color: rgba(99,99,99,.2); }\
		.de-cfg-tab-back[selected="false"] > .de-cfg-tab:hover:lang(en), .de-cfg-tab-back[selected="false"] > .de-cfg-tab:hover:lang(fr)  { background: linear-gradient(to top, rgba(132,132,132,.35) 0%, rgba(79,79,79,.35) 50%, rgba(40,40,40,.35) 50%, rgba(80,80,80,.35) 100%) !important; }\
		.de-cfg-tab::' + (nav.Firefox ? '-moz-' : '') + 'selection { background: transparent; }\
		.de-cfg-unvis { display: none; }\
		#de-spell-panel { float: right; }\
		#de-spell-panel > a { padding: 0 4px; }\
		#de-spell-div { display: table; }\
		#de-spell-div > div { display: table-cell; vertical-align: top; }\
		#de-spell-edit { padding: 2px !important; width: 325px; height: 180px; max-width: 100%; border: none !important; outline: none !important; }\
		#de-spell-rowmeter { padding: 2px 3px 0 0; margin: 2px 0; overflow: hidden; width: 2em; height: 182px; text-align: right; color: #fff; font: 12px courier new; }\
		#de-spell-rowmeter:lang(en), #de-spell-rowmeter:lang(fr) { background-color: #616b86; }\
		#de-spell-rowmeter:lang(de) { background-color: #777; }';

	// Main panel
	x += '#de-btn-logo { margin-right: 3px; cursor: pointer; }\
		#de-panel { height: 25px; z-index: 9999; border-radius: 15px 0 0 0; cursor: default;}\
		#de-panel-btns { display: inline-block; padding: 0 0 0 2px; margin: 0; height: 25px; border-left: 1px solid #8fbbed; }\
		#de-panel-btns:lang(de), #de-panel-info:lang(de) { border-color: #ccc; }\
		#de-panel-btns:lang(fr), #de-panel-info:lang(fr) { border-color: #616b86; }\
		#de-panel-btns > li { margin: 0 1px; padding: 0; }\
		#de-panel-btns > li, #de-panel-btns > li > a, #de-btn-logo { display: inline-block; width: 25px; height: 25px; }\
		#de-panel-btns:lang(en) > li, #de-panel-btns:lang(fr) > li  { transition: all 0.3s ease; }\
		#de-panel-btns:lang(en) > li:hover, #de-panel-btns:lang(fr) > li:hover { background-color: rgba(255,255,255,.15); box-shadow: 0 0 3px rgba(143,187,237,.5); }\
		#de-panel-btns:lang(de) > li > a { border-radius: 5px; }\
		#de-panel-btns:lang(de) > li > a:hover { width: 21px; height: 21px; border: 2px solid #444; }\
		#de-panel-info { vertical-align: 6px; padding: 2px 6px; margin-left: 2px; height: 25px; border-left: 1px solid #8fbbed; color: #fff; font: 18px serif; }';
	p = 'R0lGODlhGQAZAIAAAPDw8P///yH5BAEAAAEALAAAAAAZABkA';
	x += gif ('#de-btn-logo', p + 'QAI5jI+pywEPWoIIRomz3tN6K30ixZXM+HCgtjpk1rbmTNc0erHvLOt4vvj1KqnD8FQ0HIPCpbIJtB0KADs=');
	x += gif ('#de-btn-settings', p + 'QAJAjI+pa+API0Mv1Ymz3hYuiQHHFYjcOZmlM3Jkw4aeAn7R/aL6zuu5VpH8aMJaKtZR2ZBEZnMJLM5kIqnP2csUAAA7');
	x += gif ('#de-btn-hidden', p + 'QAI5jI+pa+CeHmRHgmCp3rxvO3WhMnomUqIXl2UmuLJSNJ/2jed4Tad96JLBbsEXLPbhFRc8lU8HTRQAADs=');
	x += gif ('#de-btn-favor', p + 'QAIzjI+py+AMjZs02ovzobzb1wDaeIkkwp3dpLEoeMbynJmzG6fYysNh3+IFWbqPb3OkKRUFADs=');
	x += gif ('#de-btn-video', p + 'AAI9jI+py+0Po5wTWEvN3VjyH20a6HDHB5TiaTIkuyov3MltEuM3nS5z8EPsgsIY6rE6QlA5JDMDbEKn1KqhAAA7');
	x += gif ('#de-btn-refresh', p + 'AAJBjI+py+0Po5zUgItBxDZrmHUcGAbe15xiybCm5iYegsaHfY8Kvrb6/qPhZr7LgrcyJlHFE1LoVG6ilVewis1qDQUAOw==');
	x += gif ('#de-btn-goback', p + 'QAIrjI+pmwAMm4u02gud3lzjD4biJgbd6VVPybbua61lGqIoY98ZPcvwD4QUAAA7');
	x += gif ('#de-btn-gonext', p + 'QAIrjI+pywjQonuy2iuf3lzjD4Zis0Xd6YnQyLbua61tSqJnbXcqHVLwD0QUAAA7');
	x += gif ('#de-btn-goup', p + 'QAIsjI+pm+DvmDRw2ouzrbq9DmKcBpVfN4ZpyLYuCbgmaK7iydpw1OqZf+O9LgUAOw==');
	x += gif ('#de-btn-godown', p + 'QAItjI+pu+DA4ps02osznrq9DnZceIxkYILUd7bue6WhrLInLdokHq96tnI5YJoCADs=');
	x += gif ('#de-btn-expimg', p + 'QAI9jI+pGwDn4GPL2Wep3rxXFEFel42mBE6kcYXqFqYnVc72jTPtS/KNr5OJOJMdq4diAXWvS065NNVwseehAAA7');
	x += gif ('#de-btn-preimg', p + 'QAJFjI+pGwCcHJPGWdoe3Lz7qh1WFJLXiX4qgrbXVEIYadLLnMX4yve+7ErBYorRjXiEeXagGguZAbWaSdHLOow4j8Hrj1EAADs=');
	x += gif ('#de-btn-maskimg', p + 'QAJQjI+pGwD3TGxtJgezrKz7DzLYRlKj4qTqmoYuysbtgk02ZCG1Rkk53gvafq+i8QiSxTozIY7IcZJOl9PNBx1de1Sdldeslq7dJ9gsUq6QnwIAOw==');
	x += gif ('#de-btn-savethr', p + 'QAJFjI+pG+CQnHlwSYYu3rz7RoVipWib+aVUVD3YysAledKZHePpzvecPGnpDkBQEEV03Y7DkRMZ9ECNnemUlZMOQc+iT1EAADs=')
	x += gif ('#de-btn-catalog', p + 'QAI2jI+pa+DhAHyRNYpltbz7j1Rixo0aCaaJOZ2SxbIwKTMxqub6zuu32wP9WsHPcFMs0XDJ5qEAADs=');
	x += gif ('#de-btn-audio-off', p + 'QAI7jI+pq+DO1psvQHOj3rxTik1dCIzmSZqfmGXIWlkiB6L2jedhPqOfCitVYolgKcUwyoQuSe3WwzV1kQIAOw==');
	x += gif ('#de-btn-audio-on', p + 'QAJHjI+pq+AewJHs2WdoZLz7X11WRkEgNoHqimadOG7uAqOm+Y6atvb+D0TgfjHS6RIp8YQ1pbHRfA4n0eSTI7JqP8Wtahr0FAAAOw==');
	x += gif ('#de-btn-enable', p + 'AAJAjI+py+0Po5wUWKoswOF27z2aMX6bo51lioal2bzwISPyHSZ1lts9fwKKfjQiyXgkslq95TAFnUCdUirnis0eCgA7');
	p = 'Dw8P///wAAACH5BAEAAAIALAAAAAAZABkAQAJElI+pe2EBoxOTNYmr3bz7OwHiCDzQh6bq06QSCUhcZMCmNrfrzvf+XsF1MpjhCSainBg0AbKkFCJko6g0MSGyftwuowAAOw==';
	x += gif ('#de-btn-upd-on', 'R0lGODlhGQAZAJEAADL/Mv' + p);
	x += gif ('#de-btn-upd-off', 'R0lGODlhGQAZAJEAAP8yMv' + p);
	x += gif ('#de-btn-upd-warn', 'R0lGODlhGQAZAJEAAP/0Qf' + p);

	if (Cfg.disabled) {
		applyCSS(x);
		return;
	}

	// Post panel
	x += '.de-post-btns { margin-left: 4px; }\
		.de-post-note { color: inherit; margin: 0 4px; vertical-align: 1px; font: italic bold 12px serif; }\
		.de-thread-note { font-style: italic; }\
		.de-btn-expthr, .de-btn-fav, .de-btn-fav-sel, .de-btn-hide, .de-btn-hide-user, .de-btn-rep, .de-btn-sage, .de-btn-src, .de-btn-stick, .de-btn-stick-on { transform:rotate(0deg); display: inline-block; margin: 0 4px -2px 0 !important; cursor: pointer; ';
	if (Cfg.postBtnsCSS === 0) {
		x += 'color: #4F7942; font-size: 14px; }\
			.de-post-hide .de-btn-hide:after { content: "\u271A"; }\
			.de-post-hide .de-btn-hide-user:after { content: "\u271A"; }\
			.de-btn-expthr:after { content: "\u21D5"; }\
			.de-btn-fav:after { content: "\u2605"; }\
			.de-btn-fav-sel:after { content: "[\u2605]"; }\
			.de-btn-hide:after { content: "\u2716"; }\
			.de-btn-hide-user:after { content: "\u2716"; color: red !important; }\
			.de-btn-rep:after { content: "\u25B6"; }\
			.de-btn-sage:after { content: "\u274E"; }\
			.de-btn-src:after { content: "[S]"; }\
			.de-btn-stick:after { content: "\u25FB"; }\
			.de-btn-stick-on:after { content: "\u25FC"; }';
	} else if (Cfg.postBtnsCSS === 1) {
		p = 'R0lGODlhDgAOAKIAAPDw8KCgoICAgEtLS////wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA4AAAM';
		x += 'padding: 0 14px 14px 0; }';
		x += gif ('.de-post-hide .de-btn-hide', p + '4SLLcqyHKGRe1E1cARPaSwIGVI3bOIAxc26oD7LqwusZcbMcNC9gLHsMHvFFixwFlGRgQdNAoIQEAOw==');
		x += gif ('.de-post-hide .de-btn-hide-user', 'R0lGODlhDgAOAKIAAP+/v6CgoICAgEtLS////wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA4AAAM4SLLcqyHKGRe1E1cARPaSwIGVI3bOIAxc26oD7LqwusZcbMcNC9gLHsMHvFFixwFlGRgQdNAoIQEAOw==');
		x += gif ('.de-btn-expthr', p + '5SLLcqyHGJaeoAoAr6dQaF3gZGFpO6AzNoLHMAC8uMAty+7ZwbfYzny02qNSKElkloDQSZNAolJAAADs=');
		x += gif ('.de-btn-fav', p + '4SLLcqyHGJaeoAoAradec1Wigk5FoOQhDSq7DyrpyvLRpDb84AO++m+YXiVWMAWRlmSTEntAnIQEAOw==');
		x += gif ('.de-btn-fav-sel', 'R0lGODlhDgAOAKIAAP/hAKCgoICAgEtLS////wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA4AAAM4SLLcqyHGJaeoAoAradec1Wigk5FoOQhDSq7DyrpyvLRpDb84AO++m+YXiVWMAWRlmSTEntAnIQEAOw==');
		x += gif ('.de-btn-hide', p + '7SLLcqyHKGZcUE1ctAPdb0AHeCDpkWi4DM6gtGwtvOg9xDcu0rbc4FiA3lEkGE2QER2kGBgScdColJAAAOw==');
		x += gif ('.de-btn-hide-user', 'R0lGODlhDgAOAKIAAL//v6CgoICAgEtLS////wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA4AAAM7SLLcqyHKGZcUE1ctAPdb0AHeCDpkWi4DM6gtGwtvOg9xDcu0rbc4FiA3lEkGE2QER2kGBgScdColJAAAOw==');
		x += gif ('.de-btn-rep', p + '2SLLcqyHKGZe0NGABAL5C1XWfM47NsAznqA6qwLbAG8/nfeexvNe91UACywSKxsmAAGs6m4QEADs=');
		x += gif ('.de-btn-sage', 'R0lGODlhDgAOAJEAAPDw8EtLS////wAAACH5BAEAAAIALAAAAAAOAA4AAAIZVI55pu0AgZs0SoqTzdnu5l1P1ImcwmBCAQA7');
		x += gif ('.de-btn-src', p + '/SLLcqyEuKWKYF4Cl6/VCF26UJHaUIzaDMGjA8Gqt7MJ47Naw3O832kxnay1sx11g6KMtBxEZ9DkdEKTYLCEBADs=');
		x += gif ('.de-btn-stick', p + 'xSLLcqyHKGRe9wVYntQBgKGxMKDJDaQJouqzsMrgDTNO27Apzv88YCjAoGRB8yB4hAQA7');
		x += gif ('.de-btn-stick-on', 'R0lGODlhDgAOAKIAAL//v6CgoICAgEtLS////wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA4AAAMxSLLcqyHKGRe9wVYntQBgKGxMKDJDaQJouqzsMrgDTNO27Apzv88YCjAoGRB8yB4hAQA7');
	} else {
		p = 'R0lGODlhDgAOAJEAAPDw8IyMjP///wAAACH5BAEAAAIALAAAAAAOAA4AAAI';
		x += 'padding: 0 14px 14px 0; }';
		x += gif ('.de-post-hide .de-btn-hide', p + 'ZVI55pu3vAIBI0mOf3LtxDmWUGE7XSTFpAQA7');
		x += gif ('.de-post-hide .de-btn-hide-user', 'R0lGODlhDgAOAJEAAP+/v4yMjP///wAAACH5BAEAAAIALAAAAAAOAA4AAAIZVI55pu3vAIBI0mOf3LtxDmWUGE7XSTFpAQA7 ');
		x += gif ('.de-btn-expthr', p + 'bVI55pu0BwEMxzlonlHp331kXxjlYWH4KowkFADs=');
		x += gif ('.de-btn-fav', p + 'dVI55pu0BwEtxnlgb3ljxrnHP54AgJSGZxT6MJRQAOw==');
		x += gif ('.de-btn-fav-sel', 'R0lGODlhDgAOAJEAAP/hAIyMjP///wAAACH5BAEAAAIALAAAAAAOAA4AAAIdVI55pu0BwEtxnlgb3ljxrnHP54AgJSGZxT6MJRQAOw==');
		x += gif ('.de-btn-hide', p + 'dVI55pu2vQJIN2GNpzPdxGHwep01d5pQlyDoMKBQAOw==');
		x += gif ('.de-btn-hide-user', 'R0lGODlhDgAOAJEAAL//v4yMjP///wAAACH5BAEAAAIALAAAAAAOAA4AAAIdVI55pu2vQJIN2GNpzPdxGHwep01d5pQlyDoMKBQAOw==');
		x += gif ('.de-btn-rep', p + 'aVI55pu2vAIBISmrty7rx63FbN1LmiTCUUAAAOw==');
		x += gif ('.de-btn-sage', 'R0lGODlhDgAOAJEAAPDw8FBQUP///wAAACH5BAEAAAIALAAAAAAOAA4AAAIZVI55pu0AgZs0SoqTzdnu5l1P1ImcwmBCAQA7');
		x += gif ('.de-btn-src', p + 'fVI55pt0ADnRh1uispfvpLkEieGGiZ5IUGmJrw7xCAQA7');
		x += gif ('.de-btn-stick', p + 'XVI55pu0PI5j00erutJpfj0XiKDKRUAAAOw==');
		x += gif ('.de-btn-stick-on', 'R0lGODlhDgAOAJEAAL//v4yMjP///wAAACH5BAEAAAIALAAAAAAOAA4AAAIXVI55pu0PI5j00erutJpfj0XiKDKRUAAAOw==');
	}
	if (!pr.form && !pr.oeForm) {
		x += '.de-btn-rep { display: none; }';
	}

	// Search images buttons
	x += cont('.de-src-google', 'https://google.com/favicon.ico');
	x += cont('.de-src-tineye', 'https://tineye.com/favicon.ico');
	x += cont('.de-src-iqdb', '//iqdb.org/favicon.ico');
	x += cont('.de-src-saucenao', 'https://saucenao.com/favicon.ico');

	// Posts counter
	x += '.de-post-counter:after { counter-increment: de-cnt 1; content: counter(de-cnt); margin-right: 4px; vertical-align: 1px; color: #4f7942; font: bold 11px tahoma; cursor: default; }\
		.de-post-deleted:after { content: "' + Lng.deleted[lang] + '"; margin-right: 4px; vertical-align: 1px; color: #727579; font: bold 11px tahoma; cursor: default; }';

	// Text format buttons
	x += '#de-txt-panel { display: block; height: 23px; font-weight: bold; cursor: pointer; }\
		#de-txt-panel > span:empty { display: inline-block; width: 27px; height: 23px; }';
	p = 'R0lGODlhFwAWAJEAAPDw8GRkZAAAAP///yH5BAEAAAMALAAAAAAXABYAQAJ';
	x += gif ('#de-btn-bold:empty', p + 'T3IKpq4YAoZgR0KqqnfzipIUikFWc6ZHBwbQtG4zyonW2Vkb2iYOo8Ps8ZLOV69gYEkU5yQ7YUzqhzmgsOLXWnlRIc9PleX06rnbJ/KITDqTLUAAAOw==');
	x += gif ('#de-btn-italic:empty', p + 'K3IKpq4YAYxRCSmUhzTfx3z3c9iEHg6JnAJYYSFpvRlXcLNUg3srBmgr+RL0MzxILsYpGzyepfEIjR43t5kResUQmtdpKOIQpQwEAOw==');
	x += gif ('#de-btn-under:empty', p + 'V3IKpq4YAoRARzAoV3hzoDnoJNlGSWSEHw7JrEHILiVp1NlZXtKe5XiptPrFh4NVKHh9FI5NX60WIJ6ATZoVeaVnf8xSU4r7NMRYcFk6pzYRD2TIUAAA7');
	x += gif ('#de-btn-strike:empty', p + 'S3IKpq4YAoRBR0qqqnVeD7IUaKHIecjCqmgbiu3jcfCbAjOfTZ0fmVnu8YIHW6lgUDkOkCo7Z8+2AmCiVqHTSgi6pZlrN3nJQ8TISO4cdyJWhAAA7');
	x += gif ('#de-btn-spoil:empty', 'R0lGODlhFwAWAJEAAPDw8GRkZP///wAAACH5BAEAAAIALAAAAAAXABYAQAJBlIKpq4YAmHwxwYtzVrprXk0LhBziGZiBx44hur4kTIGsZ99fSk+mjrMAd7XerEg7xnpLIVM5JMaiFxc14WBiBQUAOw==');
	x += gif ('#de-btn-code:empty', p + 'O3IKpq4YAoZgR0KpqnFxokH2iFm7eGCEHw7JrgI6L2F1YotloKek6iIvJAq+WkfgQinjKVLBS45CePSXzt6RaTjHmNjpNNm9aq6p4XBgKADs=');
	x += gif ('#de-btn-sup:empty', p + 'Q3IKpq4YAgZiSQhGByrzn7YURGFGWhxzMuqqBGC7wRUNkeU7nnWNoMosFXKzi8BHs3EQnDRAHLY2e0BxnWfEJkRdT80NNTrliG3aWcBhZhgIAOw==');
	x += gif ('#de-btn-sub:empty', p + 'R3IKpq4YAgZiSxquujtOCvIUayAkVZEoRcjCu2wbivMw2WaYi7vVYYqMFYq/i8BEM4ZIrYOmpdD49m2VFd2oiUZTORWcNYT9SpnZrTjiML0MBADs=');
	x += gif ('#de-btn-quote:empty', p + 'L3IKpq4YAYxRUSKguvRzkDkZfWFlicDCqmgYhuGjVO74zlnQlnL98uwqiHr5ODbDxHSE7Y490wxF90eUkepoysRxrMVaUJBzClaEAADs=');

	// Show/close animation
	if (nav.Anim) {
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
			@keyframes de-post-new { from { transform: translate(0,-50%) scaleY(0); opacity: 0; } }\
			.de-pview-anim { animation-duration: .2s; animation-timing-function: ease-in-out; animation-fill-mode: both; }\
			.de-open { animation: de-open .7s ease-out both; }\
			.de-close { animation: de-close .7s ease-in both; }\
			.de-blink { animation: de-blink .7s ease-in-out both; }\
			.de-cfg-open { animation: de-cfg-open .2s ease-out backwards; }\
			.de-cfg-close { animation: de-cfg-close .2s ease-in both; }\
			.de-post-new { animation: de-post-new .2s ease-out both; }';
	}

	// Embedders
	x += cont('.de-video-link.de-ytube', 'https://youtube.com/favicon.ico');
	x += cont('.de-video-link.de-vimeo', 'https://vimeo.com/favicon.ico');
	x += cont('.de-img-arch', 'data:image/gif;base64,R0lGODlhEAAQALMAAF82SsxdwQMEP6+zzRA872NmZQesBylPHYBBHP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAQARTMMlJaxqjiL2L51sGjCOCkGiBGWyLtC0KmPIoqUOg78i+ZwOCUOgpDIW3g3KJWC4t0ElBRqtdMr6AKRsA1qYy3JGgMR4xGpAAoRYkVDDWKx6NRgAAOw==');
	x += cont('.de-img-audio', 'data:image/gif;base64,R0lGODlhEAAQAKIAAGya4wFLukKG4oq3802i7Bqy9P///wAAACH5BAEAAAYALAAAAAAQABAAQANBaLrcHsMN4QQYhE01OoCcQIyOYQGooKpV1GwNuAwAa9RkqTPpWqGj0YTSELg0RIYM+TjOkgba0sOaAEbGBW7HTQAAOw==');
	x += '.de-current:after { content: " \u25C6"; }\
		.de-img-arch, .de-img-audio { color: inherit; text-decoration: none; font-weight: bold; }\
		.de-img-pre, .de-img-full { display: block; border: none; outline: none; cursor: pointer; }\
		.de-img-pre { max-width: 200px; max-height: 200px; }\
		.de-img-full { float: left; }\
		.de-img-center { position: fixed; margin: 0 !important; z-index: 9999; background-color: #ccc; border: 1px solid black !important; -moz-box-sizing: content-box; box-sizing: content-box; }\
		#de-img-btn-next > div, #de-img-btn-prev > div { height: 36px; width: 36px; }' +
		gif ('#de-img-btn-next > div', 'R0lGODlhIAAgAIAAAPDw8P///yH5BAEAAAEALAAAAAAgACAAQAJPjI8JkO1vlpzS0YvzhUdX/nigR2ZgSJ6IqY5Uy5UwJK/l/eI6A9etP1N8grQhUbg5RlLKAJD4DAJ3uCX1isU4s6xZ9PR1iY7j5nZibixgBQA7') +
		gif ('#de-img-btn-prev > div', 'R0lGODlhIAAgAIAAAPDw8P///yH5BAEAAAEALAAAAAAgACAAQAJOjI8JkO24ooxPzYvzfJrWf3Rg2JUYVI4qea1g6zZmPLvmDeM6Y4mxU/v1eEKOpziUIA1BW+rXXEVVu6o1dQ1mNcnTckp7In3LAKyMchUAADs=') +
		'#de-img-btn-next, #de-img-btn-prev { position: fixed; top: 50%; z-index: 10000; margin-top: -8px; background-color: black; cursor: pointer; }\
		#de-img-btn-next { right: 0; border-radius: 10px 0 0 10px; }\
		#de-img-btn-prev { left: 0; border-radius: 0 10px 10px 0; }\
		.de-mp3, .de-video-obj { margin: 5px 20px; }\
		.de-video-title[de-time]:after { content: " [" attr(de-time) "]"; color: red; }\
		td > a + .de-video-obj, td > img + .de-video-obj { display: inline-block; }\
		video { background: black; }';

	// Other
	x += cont('.de-wait', 'data:image/gif;base64,R0lGODlhEAAQALMMAKqooJGOhp2bk7e1rZ2bkre1rJCPhqqon8PBudDOxXd1bISCef///wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAMACwAAAAAEAAQAAAET5DJyYyhmAZ7sxQEs1nMsmACGJKmSaVEOLXnK1PuBADepCiMg/DQ+/2GRI8RKOxJfpTCIJNIYArS6aRajWYZCASDa41Ow+Fx2YMWOyfpTAQAIfkEBQAADAAsAAAAABAAEAAABE6QyckEoZgKe7MEQMUxhoEd6FFdQWlOqTq15SlT9VQM3rQsjMKO5/n9hANixgjc9SQ/CgKRUSgw0ynFapVmGYkEg3v1gsPibg8tfk7CnggAIfkEBQAADAAsAAAAABAAEAAABE2QycnOoZjaA/IsRWV1goCBoMiUJTW8A0XMBPZmM4Ug3hQEjN2uZygahDyP0RBMEpmTRCKzWGCkUkq1SsFOFQrG1tr9gsPc3jnco4A9EQAh+QQFAAAMACwAAAAAEAAQAAAETpDJyUqhmFqbJ0LMIA7McWDfF5LmAVApOLUvLFMmlSTdJAiM3a73+wl5HYKSEET2lBSFIhMIYKRSimFriGIZiwWD2/WCw+Jt7xxeU9qZCAAh+QQFAAAMACwAAAAAEAAQAAAETZDJyRCimFqbZ0rVxgwF9n3hSJbeSQ2rCWIkpSjddBzMfee7nQ/XCfJ+OQYAQFksMgQBxumkEKLSCfVpMDCugqyW2w18xZmuwZycdDsRACH5BAUAAAwALAAAAAAQABAAAARNkMnJUqKYWpunUtXGIAj2feFIlt5JrWybkdSydNNQMLaND7pC79YBFnY+HENHMRgyhwPGaQhQotGm00oQMLBSLYPQ9QIASrLAq5x0OxEAIfkEBQAADAAsAAAAABAAEAAABE2QycmUopham+da1cYkCfZ94UiW3kmtbJuRlGF0E4Iwto3rut6tA9wFAjiJjkIgZAYDTLNJgUIpgqyAcTgwCuACJssAdL3gpLmbpLAzEQA7');
	x += '.de-abtn { text-decoration: none !important; outline: none; }\
		.de-after-fimg { clear: left; }\
		#de-alert { position: fixed; right: 0; top: 0; z-index: 9999; font: 14px arial; cursor: default; }\
		#de-alert > div { overflow: visible !important; float: right; clear: both; width: auto; min-width: 0pt; padding: 10px; margin: 1px; border: 1px solid grey; white-space: pre-wrap; }\
		.de-alert-btn { display: inline-block; vertical-align: top; color: green; cursor: pointer; }\
		.de-alert-btn:not(.de-wait) + div { margin-top: .15em; }\
		.de-alert-msg { display: inline-block; }\
		.de-content textarea { display: block; margin: 2px 0; font: 12px courier new; ' + (nav.Presto ? '' : 'resize: none !important; ') + '}\
		.de-content-block > a { color: inherit; font-weight: bold; font-size: 14px; }\
		.de-content-block > input { margin: 0 4px; }\
		#de-content-fav, #de-content-hid, #de-content-vid { font-size: 16px; padding: 10px; border: 1px solid gray; border-radius: 8px; }\
		.de-editor { display: block; font: 12px courier new; width: 619px; height: 337px; tab-size: 4; -moz-tab-size: 4; -o-tab-size: 4; }\
		.de-entry { display: block !important; float: none !important; width: auto; max-width: 100% !important; margin: 2px 0 !important; padding: 0 !important; border: none; font-size: 14px; ' + (nav.Presto ? 'white-space: nowrap; ' : '') + '}\
		.de-entry > a { text-decoration: none; border: none; }\
		.de-entry > input { margin: 2px 4px; }\
		.de-fav-inf-posts { float: right; margin-right: 4px; font: bold 14px serif; cursor: default; }\
		.de-fav-inf-new { color: #424f79; }\
		.de-fav-inf-new:before { content: "+ "; }\
		.de-fav-inf-old { color: #4f7942; }\
		.de-fav-title { margin-right: 15px; }\
		.de-file { display: inline-block; margin: 1px; height: 130px; width: 130px; text-align: center; border: 1px dashed grey; }\
		.de-file > .de-file-del { float: right; }\
		.de-file > .de-file-rar { float: left; }\
		.de-file > .de-file-rarmsg { float: left; padding: 0 4px 2px; color: #fff; background-color: rgba(55, 55, 55, 0.5); }\
		.de-file > .de-file-utils { display: none; }\
		.de-file > div { display: table; width: 100%; height: 100%; cursor: pointer; }\
		.de-file > div > div { display: table-cell; vertical-align: middle; }\
		.de-file + [type="file"] { opacity: 0; margin: 1px 0 0 -132px !important; vertical-align: top; width: 132px !important; height: 132px; border: none !important; cursor: pointer; }\
		.de-file-drag { background: rgba(88, 88, 88, 0.4); border: 1px solid grey; }\
		.de-file-hover > .de-file-utils { display: block; position: relative; margin: -18px 2px; }\
		.de-file-img > img, .de-file-img > video { max-width: 126px; max-height: 126px; }\
		.de-file-off > div > div:after { content: "' + Lng.noFile[lang] + '" }\
		.de-file-rarmsg { margin: 0 5px; font: bold 11px tahoma; cursor: default; }\
		.de-file-del, .de-file-rar { display: inline-block; margin: 0 4px -3px; width: 16px; height: 16px; cursor: pointer; }';
	x += gif ('.de-file-del', 'R0lGODlhEAAQALMOAP8zAMopAJMAAP/M//+DIP8pAP86Av9MDP9sFP9zHv9aC/9gFf9+HJsAAP///wAAACH5BAEAAA4ALAAAAAAQABAAAARU0MlJKw3B4hrGyFP3hQNBjE5nooLJMF/3msIkJAmCeDpeU4LFQkFUCH8VwWHJRHIM0CiIMwBYryhS4XotZDuFLUAg6LLC1l/5imykgW+gU0K22C0RADs=');
	x += gif ('.de-file-rar', 'R0lGODlhEAAQALMAAF82SsxdwQMEP6+zzRA872NmZQesBylPHYBBHP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAQARTMMlJaxqjiL2L51sGjCOCkGiBGWyLtC0KmPIoqUOg78i+ZwOCUOgpDIW3g3KJWC4t0ElBRqtdMr6AKRsA1qYy3JGgMR4xGpAAoRYkVDDWKx6NRgAAOw==');
	x += '.de-menu { padding: 0 !important; margin: 0 !important; width: auto; min-width: 0; z-index: 9999; border: 1px solid grey !important;}\
		.de-menu-item { display: block; padding: 3px 10px; color: inherit; text-decoration: none; font: 13px arial; white-space: nowrap; cursor: pointer; }\
		.de-menu-item:hover { background-color: #222; color: #fff; }\
		.de-new-post { ' + (nav.Presto ? 'border-left: 4px solid blue; border-right: 4px solid blue; }' : 'box-shadow: 6px 0 2px -2px blue, -6px 0 2px -2px blue; }') + '\
		.de-omitted { color: grey; font-style: italic; }\
		.de-omitted:before { content: "' + Lng.postsOmitted[lang] + '"; }\
		.de-opref::after { content: " [OP]"; }\
		.de-parea { text-align: center; }\
		.de-parea-btn-close:after { content: "' + Lng.hideForm[lang] + '" }\
		.de-parea-btn-thrd:after { content: "' + Lng.makeThrd[lang] + '" }\
		.de-parea-btn-reply:after { content: "' + Lng.makeReply[lang] + '" }\
		.de-pview { position: absolute; width: auto; min-width: 0; z-index: 9999; border: 1px solid grey !important; margin: 0 !important; display: block !important; }\
		.de-pview-info { padding: 3px 6px !important; }\
		.de-pview-link { font-weight: bold; }\
		#de-qarea > .de-cfg-head { text-align: left; cursor: pointer; }\
		.de-qarea-hanging { position: fixed; z-index: 9990; margin: 0; padding: 0; border: 1px solid gray; border-radius: 10px 10px 0 0; }\
		.de-qarea-hanging #de-qarea-utils > span:hover { color: #ff6; }\
		.de-qarea-inline { float: none; clear: left; width: 100%; padding: 3px 0 3px 3px; margin: 2px 0; }\
		#de-qarea-target { font-weight: bold; margin-left: 4px; }\
		#de-qarea-utils { float: right; margin-top: ' + (nav.Chrome ? -1 : -4) + 'px; font: normal 16px arial; cursor: pointer; }\
		#de-qarea-utils > span { margin-right: 4px; }\
		.de-ref-hid { text-decoration: line-through !important; }\
		.de-refmap { margin: 10px 4px 4px 4px; font-size: 75%; font-style: italic; }\
		.de-refmap:before { content: "' + Lng.replies[lang] + ' "; }\
		.de-reflink { text-decoration: none; }\
		.de-refcomma:last-child { display: none; }\
		#de-sagebtn { margin-right: 7px; cursor: pointer; }\
		.de-selected, .de-error-key { ' + (nav.Presto ? 'border-left: 4px solid red; border-right: 4px solid red; }' : 'box-shadow: 6px 0 2px -2px red, -6px 0 2px -2px red; }') + '\
		#de-txt-resizer { display: inline-block !important; float: none !important; padding: 6px; margin: -2px -12px; vertical-align: bottom; border-bottom: 2px solid #555; border-right: 2px solid #444; cursor: se-resize; }\
		#de-updater-btn:after { content: "' + Lng.getNewPosts[lang] + '" }\
		#de-updater-div { clear: left; margin-top: 10px; }\
		.de-viewed { color: #888 !important; }\
		.de-hidden, small[id^="rfmap"], body > hr, .theader, .postarea, .thumbnailmsg { display: none !important; }\
		form > hr { clear: both }\
		' + aib.css + aib.cssEn + '.de-post-hide > ' + aib.qHide + ' { display: none !important; }';

	if (!nav.Firefox) {
		x = x.replace(/(transition|keyframes|transform|animation|linear-gradient)/g, nav.cssFix + '$1');
		if (!nav.Presto) {
			x = x.replace(/\(to bottom/g, '(top').replace(/\(to top/g, '(bottom');
		}
	}

	applyCSS(x);
}

function applyCSS(x) {
	$css(x).id = 'de-css';
	$css('').id = 'de-css-dynamic';
	$css('').id = 'de-css-user';
	updateCSS();
}

function updateCSS() {
	var x = '#de-video-list { padding: 0 0 4px; max-width: ' + (+Cfg.YTubeWidth + 40) + 'px; max-height: ' + (window.innerHeight - +Cfg.YTubeHeigh - 100) + 'px; overflow: auto; }';
	if (Cfg.attachPanel) {
		x += '.de-content { position: fixed; right: 0; bottom: 25px; z-index: 9999; max-height: 92%; overflow-x: visible; overflow-y: auto; }\
		#de-content-fav, #de-content-hid { overflow-y: scroll; }\
		#de-panel { position: fixed; right: 0; bottom: 0; }'
	} else {
		x += '.de-content { clear: both; float: right; }\
		#de-panel { float: right; clear: both; }'
	}
	if (!Cfg.panelCounter) {
		x += '#de-panel-info { display: none; }';
	}
	if (!Cfg.imgNavBtns) {
		x += '#de-img-btn-next, #de-img-btn-prev { display: none; }';
	}
	if (Cfg.maskImgs) {
		x += '.de-img-pre, .de-video-obj, .thumb, .ca_thumb, .fileThumb, img[src*="spoiler"], img[src*="thumb"], img[src^="blob"] { opacity: 0.07 !important; }\
			.de-img-pre:hover, .de-video-obj:hover, .thumb:hover, .ca_thumb:hover, .fileThumb:hover, img[src*="spoiler"]:hover, img[src*="thumb"]:hover, img[src^="blob"]:hover { opacity: 1 !important; }';
	}
	if (!aib.dobr && !aib.krau && !aib.mak) {
		x += '.de-img-full { margin: 2px 5px; }';
	}
	if (Cfg.delHiddPost) {
		x += '.de-thr-hid, .de-thr-hid + div + br, .de-thr-hid + div + br + hr { display: none; }';
	}
	if (Cfg.noPostNames) {
		x += aib.qName + ', .' + aib.cTrip + ' { display: none; }';
	}
	if (Cfg.noSpoilers) {
		if (aib.krau || aib.fch || aib._410) {
			x += '.spoiler, s { color: #fff !important; }\
				.spoiler > a, s > a { color: #fff !important; }';
		} else {
			x += '.spoiler { color: inherit !important; }\
				.spoiler > a { color: inherit !important; }';
		};
	}
	if (Cfg.noPostScrl) {
		x += 'blockquote, blockquote > p, .code_part { height: auto !important; max-height: 100% !important; overflow: visible !important; }';
	}
	if (Cfg.noBoardRule) {
		x += (aib.futa ? '.chui' : '.rules, #rules, #rules_row') + ' { display: none; }';
	}
	if (aib.abu) {
		if (Cfg.addYouTube) {
			x += 'div[id^="post_video"] { display: none !important; }';
		}
	}
	$id('de-css-dynamic').textContent = x;
	$id('de-css-user').textContent = Cfg.userCSS ? Cfg.userCSSTxt : '';
}


// MAIN
// ===========================================================================================================

function addDelformStuff(isLog) {
	preloadImages(null);
	isLog && new Logger().log('Preload images');
	embedMP3Links(null);
	isLog && new Logger().log('MP3 links');
	new YouTube().parseLinks(null);
	isLog && new Logger().log('YouTube links');
	if (Cfg.addImgs) {
		embedImagesLinks(dForm);
		isLog && new Logger().log('Image links');
	}
	if (Cfg.imgSrcBtns) {
		addImagesSearch(dForm);
		isLog && new Logger().log('Sauce buttons');
	}
	if (firstThr && Cfg.linksNavig === 2) {
		genRefMap(pByNum, '');
		for (var post = firstThr.op; post; post = post.next) {
			if (post.hasRef) {
				addRefMap(post, '');
			}
		}
		isLog && new Logger().log('Reflinks map');
	}
}

function initScript(checkDomains) {
	new Logger().init();
	if (!Initialization(checkDomains)) {
		return;
	}
	new Logger().log('Init');
	readCfg(doScript);
}

function doScript() {
	new Logger().log('Config loading');
	if (Cfg.disabled) {
		addPanel();
		scriptCSS();
		return;
	}
	spells = new Spells(!!Cfg.hideBySpell);
	new Logger().log('Parsing spells');
	doc.body.style.display = 'none';
	replaceDelform();
	new Logger().log('Replace delform');
	pr = new PostForm($q(aib.qPostForm, doc), false, !liteMode, doc);
	pByNum = Object.create(null);
	try {
		parseDelform(dForm, $Q(aib.qThread, dForm));
	} catch(e) {
		console.log('DELFORM ERROR:\n' + getPrettyErrorMessage(e));
		doc.body.style.display = '';
		return;
	}
	initDelformAjax();
	readViewedPosts();
	new Logger().log('Parse delform');
	if (Cfg.hotKeys) {
		hKeys = new HotKeys();
		new Logger().log('Init keybinds');
	}
	if (!liteMode) {
		initPage();
		new Logger().log('Init page');
		addPanel();
		new Logger().log('Add panel');
	}
	initMessageFunctions();
	addDelformStuff(true);
	scriptCSS();
	doc.body.style.display = '';
	new Logger().log('Apply CSS');
	readPosts();
	readUserPosts();
	readFavoritesPosts();
	new Logger().log('Apply spells');
	new Logger().finish();
}

if (doc.readyState === 'interactive' || doc.readyState === 'complete') {
	needScroll = false;
	initScript(true);
} else {
	aib = getImageBoard(true, false);
	needScroll = true;
	doc.addEventListener(doc.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll", function wheelFunc(e) {
		needScroll = false;
		doc.removeEventListener(e.type, wheelFunc, false);
	}, false);
	doc.addEventListener('DOMContentLoaded', initScript.bind(null, false), false);
}

})(window.opera && window.opera.scriptStorage);
