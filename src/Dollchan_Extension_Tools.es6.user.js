// ==UserScript==
// @name            Dollchan Extension Tools
// @version         15.8.27.0
// @namespace       http://www.freedollchan.org/scripts/*
// @author          Sthephan Shinkufag @ FreeDollChan
// @copyright       (c) 2015 Dollchan Extension Tools Team. See the LICENSE file for license rights and limitations (MIT).
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

(function de_main_func_inner(scriptStorage, FormData) {
'use strict';

var version = '15.8.27.0';
var commit = '8715300';

var defaultCfg = {
	'disabled':         0,      // script enabled by default
	'language':         0,      // script language [0=ru, 1=en]
	'hideBySpell':      1,      // hide posts by spells
	'spells':           '',     // user defined spells
	'sortSpells':       0,      // sort spells when applying
	'menuHiddBtn':      1,      // menu on hide button
	'hideRefPsts':      0,      // hide post with references to hidden posts
	'delHiddPost':      0,      // delete hidden posts
	'ajaxUpdThr':       1,      // auto update threads
	'updThrDelay':      20,     //    threads update interval in sec
	'noErrInTitle':     0,      //    don't show error number in title except 404
	'favIcoBlink':      0,      //    favicon blinking, if new posts detected
	'markNewPosts':     1,      //    new posts marking on page focus
	'desktNotif':       0,      //    desktop notifications, if new posts detected
	'updCount':         1,      //    show countdown for thread updater
	'updThrBtns':       1,      // updater buttons in threads list
	'expandTrunc':      0,      // auto expanding of truncated posts
	'postBtnsCSS':      2,      // post buttons style [0=text, 1=classic, 2=solid grey]
	'showHideBtn':      1,      // show post hide button
	'showRepBtn':       1,      // show post reply button
	'noSpoilers':       1,      // open spoilers
	'noPostNames':      0,      // hide post names
	'widePosts':        0,      // stretch posts to the screen width
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
	'openImgs':         0,      // open images in posts [0=off, 1=all images, 2=GIFs only, 3=non-GIFs]
	'imgSrcBtns':       1,      // add image search buttons
	'delImgNames':      0,      // remove names of images
	'linksNavig':       2,      // navigation by >>links [0=off, 1=no map, 2=+refmap]
	'linksOver':        100,    //    delay appearance in ms
	'linksOut':         1500,   //    delay disappearance in ms
	'markViewed':       0,      //    mark viewed posts
	'strikeHidd':       0,      //    strike >>links to hidden posts
	'removeHidd':       0,      //        remove from refmap
	'noNavigHidd':      0,      //    don't show previews for hidden posts
	'crossLinks':       0,      // replace http: to >>/b/links
	'insertNum':        1,      // insert >>link on postnumber click
	'addOPLink':        0,      // insert >>link for reply to op-posts on board
	'addImgs':          0,      // embed links to images
	'addMP3':           1,      // embed mp3 links
	'addVocaroo':       1,      // embed Vocaroo links
	'addYouTube':       3,      // embed YouTube links [0=off, 1=onclick, 2=player, 3=preview+player, 4=preview]
	'YTubeType':        0,      //    player type [0=flash, 1=HTML5]
	'YTubeWidth':       360,    //    player width
	'YTubeHeigh':       270,    //    player height
	'YTubeTitles':      0,      //    convert links to titles
	'ytApiKey':         '',     //    public key for youtube API
	'addVimeo':         1,      //    embed vimeo links
	'ajaxReply':        2,      // posting with AJAX (0=no, 1=iframe, 2=HTML5)
	'postSameImg':      1,      //    ability to post same images
	'removeEXIF':       1,      //    remove EXIF data from JPEGs
	'removeFName':      0,      //    remove file name
	'sendErrNotif':     1,      //    inform about post send error if page is blurred
	'scrAfterRep':      0,      //    scroll to the bottom after reply
	'addPostForm':      2,      // postform displayed [0=at top, 1=at bottom, 2=hidden]
	'spacedQuote':      1,      // insert a space when quoting "> "
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
	'noName':           0,      // hide name field
	'scriptStyle':      0,      // script style [0=gradient black, 1=gradient blue, 2=solid grey, 3=transparent blue]
	'userCSS':          0,      // user style
	'userCSSTxt':       '',     //    css text
	'expandPanel':      0,      // show full main panel
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
	'replyWinDrag':     0,      // draggable Quick Reply form
	'replyWinX':        'right: 0',     // Quick Reply form position
	'replyWinY':        'top: 0',
	'cfgWinDrag':       0,      // draggable Settings window
	'cfgWinX':          'right: 0',     // Settings window position
	'cfgWinY':          'top: 0',
	'hidWinDrag':       0,      // draggable Hidden window
	'hidWinX':          'right: 0',     // Hidden window position
	'hidWinY':          'top: 0',
	'favWinDrag':       0,      // draggable Favorites window
	'favWinX':          'right: 0',     // Favorites window position
	'favWinY':          'top: 0',
	'favWinWidth':      500,    // Favorites window width
	'vidWinDrag':       0,      // draggable Video window
	'vidWinX':          'right: 0',     // Video window position
	'vidWinY':          'top: 0'
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
		'markNewPosts': ['Выделять новые посты при смене вкладки', 'Mark new posts when tab changes'],
		'desktNotif':   ['Уведомления на рабочем столе', 'Desktop notifications'],
		'updCount':     ['Обратный счетчик секунд до обновления', 'Show countdown to thread update'],
		'updThrBtns':   ['Кнопки получения новых постов в списке тредов', 'Get-new-posts buttons in threads list'],
		'expandTrunc':  ['Разворачивать сокращенные посты*', 'Auto expanding of truncated posts*'],
		'postBtnsCSS': {
			sel:        [['Text', 'Classic', 'Solid grey'], ['Text', 'Classic', 'Solid grey']],
			txt:        ['Кнопки постов* ', 'Post buttons* ']
		},
		'showHideBtn':  ['Скрытие ', 'Post hide '],
		'showRepBtn':   ['Ответ', 'Post reply'],
		'noSpoilers':   ['Открывать текстовые спойлеры', 'Open text spoilers'],
		'noPostNames':  ['Скрывать имена в постах', 'Hide names in posts'],
		'widePosts':    ['Растягивать посты по ширине экрана', 'Stretch posts to the screen width'],
		'hotKeys':      ['Горячие клавиши ', 'Keyboard hotkeys '],
		'loadPages':    [' Количество страниц, загружаемых по F5', ' Number of pages that are loaded on F5 '],
		'correctTime':  ['Коррекция времени* ', 'Correct time* '],
		'timeOffset':   [' (ч) разница ', ' (h) difference '],
		'timePattern':  [' Шаблон поиска', ' Find pattern'],
		'timeRPattern': [' Шаблон замены', ' Replace pattern'],

		'expandImgs': {
			sel:        [['Откл.', 'В посте', 'По центру'], ['Disable', 'In post', 'By center']],
			txt:        ['Раскрывать картинки по клику', 'Expand images on click']
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
		'openImgs': {
			sel:        [['Откл.', 'Все подряд', 'Только GIF', 'Кроме GIF'], ['Disable', 'All types', 'Only GIF', 'Non-GIF']],
			txt:        ['Скачивать полные версии картинок*', 'Download full version of images*']
		},
		'imgSrcBtns':   ['Добавлять кнопки для поиска картинок*', 'Add image search buttons*'],
		'delImgNames':  ['Скрывать имена картинок*', 'Hide names of images*'],

		'linksNavig': {
			sel:        [['Откл.', 'Без карты', 'С картой'], ['Disable', 'No map', 'With map']],
			txt:        ['Навигация по >>ссылкам* ', 'Navigation by >>links* ']
		},
		'linksOver':    [' Появление ', ' Appear. '],
		'linksOut':     [' Пропадание (мс)', ' Disappear. (ms)'],
		'markViewed':   ['Отмечать просмотренные посты*', 'Mark viewed posts*'],
		'strikeHidd':   ['Зачеркивать >>ссылки на скрытые посты', 'Strike >>links to hidden posts'],
		'removeHidd':   ['Удалять из карты ответов', 'Remove from replies map'],
		'noNavigHidd':  ['Не отображать превью для скрытых постов', 'Don\'t show previews for hidden posts'],
		'crossLinks':   ['Преобразовывать http:// в >>/b/ссылки*', 'Replace http:// with >>/b/links*'],
		'insertNum':    ['Вставлять >>ссылку по клику на №поста*', 'Insert >>link on №postnumber click*'],
		'addOPLink':    ['>>ссылка при ответе на оп-пост на доске', 'Insert >>link for reply to op-posts on board'],
		'addImgs':      ['Загружать картинки к jpg, png, gif ссылкам*', 'Load images to jpg, png, gif links*'],
		'addMP3':       ['Плеер к mp3 ссылкам* ', 'Player to mp3 links* '],
		'addVocaroo':   ['к Vocaroo ссылкам*', 'to Vocaroo links*'],
		'addVimeo':     ['Добавлять плеер к Vimeo ссылкам*', 'Add player to Vimeo links*'],
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
		'YTubeTitles':  ['Загружать названия к YouTube-ссылкам*', 'Load titles into YouTube-links*'],
		'ytApiKey':		['Ключ YT API*', 'YT API Key*'],

		'ajaxReply': {
			sel:        [['Откл.', 'Iframe', 'HTML5'], ['Disable', 'Iframe', 'HTML5']],
			txt:        ['AJAX отправка постов*', 'posting with AJAX*']
		},
		'postSameImg':  ['Возможность отправки одинаковых картинок', 'Ability to post same images'],
		'removeEXIF':   ['Удалять EXIF из JPEG ', 'Remove EXIF from JPEG '],
		'removeFName':  ['Удалять имя файлов', 'Clear file names'],
		'sendErrNotif': ['Оповещать в заголовке об ошибке отправки', 'Inform in title about post send error'],
		'scrAfterRep':  ['Перемещаться в конец треда после отправки', 'Scroll to the bottom after reply'],
		'addPostForm': {
			sel:        [['Сверху', 'Внизу', 'Скрытая'], ['At top', 'At bottom', 'Hidden']],
			txt:        ['Форма ответа в треде', 'Reply form in thread']
		},
		'spacedQuote':  ['Вставлять пробел при цитировании "> "', 'Insert a space when quoting "> "'],
		'favOnReply':   ['Добавлять тред в избранное при ответе', 'Add thread to favorites on reply'],
		'warnSubjTrip': ['Оповещать при наличии трип-кода в поле "Тема"', 'Warn if "Subject" field contains trip-code'],
		'fileThumb':    ['Область превью картинок вместо кнопки "Файл"', 'File thumbnail area instead of "File" button'],
		'addSageBtn':   ['Кнопка Sage вместо "E-mail"* ', 'Sage button instead of "E-mail"* '],
		'saveSage':     ['Запоминать сажу', 'Remember sage'],
		'captchaLang': {
			sel:        [['Откл.', 'Eng', 'Rus'], ['Disable', 'Eng', 'Rus']],
			txt:        ['Язык ввода капчи', 'Language input in captcha']
		},
		'addTextBtns': {
			sel:        [['Откл.', 'Графич.', 'Упрощ.', 'Стандарт.'], ['Disable', 'As images', 'As text', 'Standard']],
			txt:        ['Кнопки разметки текста ', 'Text format buttons ']
		},
		'txtBtnsLoc':   ['Внизу', 'At bottom'],
		'userPassw':    [' Постоянный пароль ', ' Fixed password '],
		'userName':     ['Постоянное имя', 'Fixed name'],
		'noBoardRule':  ['правила ', 'rules '],
		'noGoto':       ['поле goto ', 'goto field '],
		'noPassword':   ['пароль ', 'password '],
		'noName':       ['имя', 'name'],

		'scriptStyle': {
			sel:        [
				['Gradient black', 'Gradient blue', 'Solid grey', 'Transparent blue'],
				['Gradient black', 'Gradient blue', 'Solid grey', 'Transparent blue']
			],
			txt:        ['Стиль скрипта', 'Script style']
		},
		'userCSS':      ['Пользовательский CSS ', 'User CSS '],
		'panelCounter': ['Счетчик постов/картинок на главной панели', 'Counter of posts/images on main panel'],
		'rePageTitle':  ['Название треда в заголовке вкладки*', 'Thread title in page tab*'],
		'animation':    ['CSS3 анимация в скрипте', 'CSS3 animation in script'],
		'closePopups':  ['Автоматически закрывать уведомления', 'Close popups automatically'],
		'updScript':    ['Автоматически проверять обновления скрипта', 'Check for script update automatically'],
		'scrUpdIntrv': {
			sel:        [
				['Каждый день', 'Каждые 2 дня', 'Каждую неделю', 'Каждые 2 недели', 'Каждый месяц'],
				['Every day', 'Every 2 days', 'Every week', 'Every 2 week', 'Every month']
			],
			txt:        ['', '']
		},
		'excludeList':  ['Список доменов, запрещающих запуск скрипта:', 'Domains list for preventing script launch:'],
		'turnOff':      ['Включать скрипт только на этом сайте', 'Enable script only on this site'],

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
		'cfg':          ['Настройки', 'Settings'],
		'hid':          ['Скрытое', 'Hidden'],
		'fav':          ['Избранное', 'Favorites'],
		'vid':          ['Видео-ссылки', 'Video links'],
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
		'%l%i29 – включить/выключить маскировку картинок%/l',
		'%l%i40 – обновить тред (в треде)%/l',
		'%l%i212t – жирный%/l',
		'%l%i213t – курсив%/l',
		'%l%i214t – зачеркнутый%/l',
		'%l%i215t – спойлер%/l',
		'%l%i216t – код%/l'], [
		'%l%i24 – previous page/image%/l',
		'%l%i217 – next page/image%/l',
		'%l%i21 – thread (on board)/post (in thread) below%/l',
		'%l%i20 – thread (on board)/post (in thread) above%/l',
		'%l%i31 – on board post below%/l',
		'%l%i30 – on board post above%/l',
		'%l%i23 – hide post/thread%/l',
		'%l%i32 – go to thread%/l',
		'%l%i33 – expand thread%/l',
		'%l%i211 – expand post\'s images%/l',
		'%l%i22 – quick reply%/l',
		'%l%i25t – send post%/l',
		'%l%i210 – open/close "Settings"%/l',
		'%l%i26 – open/close "Favorites"%/l',
		'%l%i27 – open/close "Hidden"%/l',
		'%l%i218 – open/close "Videos"%/l',
		'%l%i28 – open/close the main panel%/l',
		'%l%i29 – turn on/off masking images%/l',
		'%l%i40 – update thread%/l',
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

	name:           ['Имя', 'Name'],
	subj:           ['Тема', 'Subject'],
	mail:           ['E-mail', 'E-mail'],
	cap:            ['Капча', 'Captcha'],
	video:          ['Видео', 'Video'],
	add:            ['Добавить', 'Add'],
	apply:          ['Применить', 'Apply'],
	clear:          ['Очистить', 'Clear'],
	refresh:        ['Обновить', 'Refresh'],
	load:           ['Загрузить', 'Load'],
	save:           ['Сохранить', 'Save'],
	edit:           ['Правка', 'Edit'],
	file:           ['Файл', 'File'],
	global:         ['Глобальные', 'Global'],
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
	internalError:	['Ошибка скрипта:\n', 'Script error:\n'],
	thrNotFound:    ['Тред недоступен (№', 'Thread is unavailable (№'],
	thrClosed:      ['Тред закрыт', 'Thread is closed'],
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
	thrViewed:      ['Тредов посещено', 'Threads visited'],
	thrCreated:     ['Тредов создано', 'Threads created'],
	thrHidden:      ['Тредов скрыто', 'Threads hidden'],
	postsSent:      ['Постов отправлено', 'Posts sent'],
	total:          ['Всего', 'Total'],
	debug:          ['Отладка', 'Debug'],
	infoDebug:      ['Информация для отладки', 'Information for debugging'],
	impexpCfg:      ['Импорт/экспорт настроек', 'Config import/export'],
	fileToCfg:      ['Загрузить настройки из файла', 'Load config from a file'],
	cfgToFile:      ['Сохранить файл</a> с настройками', 'Get config file</a>'],
	globalCfg:      ['Глобальные настройки', 'Global config'],
	loadGlobal:     [' и применить к этому домену', ' and apply to this domain'],
	saveGlobal:     [' текущие настройки как глобальные', ' current config as global'],
	descrGlobal:    ['Глобальные настройки будут по умолчанию применяться<br>при первом посещеннии других доменов', 'Global config will apply by default<br>at the first visit of other domains'],
	editInTxt:      ['Правка в текстовом формате', 'Edit in text format'],
	resetCfg:       ['Сбросить в настройки по умолчанию', 'Reset config to defaults'],
	conReset: [
		'Данное действие удалит все ваши настройки и закладки. Продолжить?',
		'This will delete all your preferences and favorites. Continue?'
	],
	clrSelected:    ['Удалить выделенные записи', 'Remove selected notes'],
	saveChanges:    ['Сохранить внесенные изменения', 'Save your changes'],
	infoCount:      ['Обновить счетчики постов', 'Refresh posts counters'],
	infoPage:       ['Проверить актуальность тредов (до 5 страницы)', 'Check for threads actuality (up to 5 page)'],
	clrDeleted:     ['Очистить недоступные (404) треды', 'Clear inaccessible (404) threads'],
	setByUser:      ['Выбрано пользователем', 'Set by user'],
	oldPosts:       ['Постов при последнем посещении', 'Posts at the last visit'],
	newPosts:       ['Количество новых постов', 'Number of new posts'],
	thrPage:        ['Тред на @странице', 'Thread on @page'],
	hiddenPosts:    ['Скрытые посты на странице', 'Hidden posts on the page'],
	hiddenThrds:    ['Скрытые треды', 'Hidden threads'],
	noHidPosts:     ['На этой странице нет скрытых постов...', 'No hidden posts on this page...'],
	noHidThrds:     ['Нет скрытых тредов...', 'No hidden threads...'],
	expandAll:      ['Раскрыть все', 'Expand all'],
	invalidData:    ['Некорректный формат данных', 'Incorrect data format'],
	noFavThrds:     ['Нет избранных тредов...', 'Favorites is empty...'],
	noVideoLinks:   ['Нет ссылок на видео...', 'No video links...'],
	hideLnkList:    ['Скрыть/Показать список ссылок', 'Hide/Unhide list of links'],
	prevVideo:      ['Предыдущее видео', 'Previous video'],
	nextVideo:      ['Следующее видео', 'Next video'],
	toggleWindow:   ['Закрепить на панели / Открепить', 'Attach to panel / Detach'],
	closeWindow:    ['Закрыть окно', 'Close window'],
	toggleReply:    ['Поместить под пост / Открепить', 'Move under post / Detach'],
	closeReply:     ['Закрыть форму', 'Close form'],
	replies:        ['Ответы:', 'Replies:'],
	postsOmitted:   ['Пропущено ответов: ', 'Posts omitted: '],
	collapseThrd:   ['Свернуть тред', 'Collapse thread'],
	deleted:        ['удалён', 'deleted'],
	getNewPosts:    ['Получить новые посты', 'Get new posts'],
	page:           ['Страница', 'Page'],
	hiddenThrd:     ['Скрытый тред:', 'Hidden thread:'],
	makeThrd:       ['Создать тред', 'Create thread'],
	makeReply:      ['Ответить', 'Make reply'],
	noSage:         ['Без сажи', 'No sage'],
	hideForm:       ['Скрыть форму', 'Hide form'],
	search:         ['Искать в ', 'Search in '],
	wait:           ['Ждите', 'Wait'],
	noFile:         ['Нет файла', 'No file'],
	clickToAdd:     ['Выберите, либо перетащите файл', 'Select or drag and drop file'],
	removeFile:     ['Удалить файл', 'Remove file'],
	spoilFile:      ['Спойлер', 'Spoiler'],
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
	expandVideo:    ['Развернуть/Свернуть видео', 'Expand/Collapse video'],
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
	seCol:          [', столбец ', ', column '],
	sendingPost:	['Отправка поста...', 'Sending post...'],
	sizeByte:		[' Байт', ' Byte'],
	sizeKByte:		[' КБ', ' KB'],
	sizeMByte:		[' МБ', ' MB'],
	sizeGByte:		[' ГБ', ' GB'],
	second:			['с', 's']
},

doc = window.document, aProto = Array.prototype, locStorage, sesStorage,
Cfg, hThr, pByNum, sVis, uVis, needScroll,
aib, nav, updater, hKeys, dTime, visPosts = 2, topWinZ = 0,
WebmParser, Logger,
pr, dForm, dummy, spells,
Images_ = {preloading: false, afterpreload: null, progressId: null, canvas: null},
lang, quotetxt = '', localRun, isExpImg, isPreImg, chromeCssUpd, excludeList,
$each = Function.prototype.call.bind(aProto.forEach),
emptyFn = Function.prototype,
nativeXHRworks = true;


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
	} while(el && el.tagName !== tagName);
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
	var el = doc.createElement(tag);
	if(attr) {
		for(var key in attr) {
			if(key === 'text') {
				el.textContent = attr[key];
			} else if(key === 'value') {
				el.value = attr[key];
			} else if(attr.hasOwnProperty(key)) {
				el.setAttribute(key, attr[key]);
			}
		}
	}
	if(events) {
		for(var key in events) {
			if(events.hasOwnProperty(key)) {
				el.addEventListener(key, events[key]);
			}
		}
	}
	return el;
}

function $New(tag, attr, nodes) {
	for(var i = 0, len = nodes.length, el = $new(tag, attr, null); i < len; i++) {
		if(nodes[i]) {
			el.appendChild(nodes[i]);
		}
	}
	return el;
}

function $txt(el) {
	return doc.createTextNode(el);
}

function $btn(val, ttl, Fn) {
	return $new('input', {'type': 'button', 'class': 'de-button', 'value': val, 'title': ttl}, {'click': Fn});
}

function $script(text) {
	$del(doc.head.appendChild($new('script', {'type': 'text/javascript', 'text': text}, null)));
}

function $css(text) {
	if(!nav.Firefox) {
		text = text.replace(/(transition|keyframes|transform|animation|linear-gradient)/g, nav.cssFix + '$1');
		if(!nav.Presto) {
			text = text.replace(/\(to bottom/g, '(top').replace(/\(to top/g, '(bottom');
		}
		if(nav.Safari && !('flex' in document.body.style)) {
			text = text.replace(/( flex|inline-flex|align-items)/g, ' -webkit-$1');
		}
	}
	return doc.head.appendChild($new('style', {'type': 'text/css', 'text': text}, null));
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
	for(var i in obj) {
		if(obj.hasOwnProperty(i)) {
			return false;
		}
	}
	return true;
}

Logger = new function() {
	var instance, marks = [], finished = false;
	function LoggerSingleton() {
		if(instance) {
			return instance;
		}
		instance = this;
	}
	LoggerSingleton.prototype = {
		finish() {
			finished = true;
			marks.push(['LoggerFinish', Date.now()]);
		},
		getData(full) {
			var duration, timeLog = [],
				i = 1;
			for(var len = marks.length - 1, lastExtra = 0; i < len; ++i) {
				duration = marks[i][1] - marks[i - 1][1] + lastExtra;
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
			marks.push(['LoggerInit', Date.now()]);
		},
		log(text) {
			if(!finished) {
				marks.push([text, Date.now()]);
			}
		}
	};
	return LoggerSingleton;
};

function async(generatorFunc) {
	return function(...args) {
		function continuer(verb, arg) {
			var result;
			try {
				result = generator[verb](arg);
			} catch (err) {
				console.log('Generator throw: ', err);
				return Promise.reject(err);
			}
			return result.done ? result.value : Promise.resolve(result.value).then(onFulfilled, onRejected);
		}
		var generator = generatorFunc.apply(this, args),
			onFulfilled = continuer.bind(continuer, 'next'),
			onRejected = continuer.bind(continuer, 'throw');
		return onFulfilled();
	};
}

function spawn(generatorFunc, ...args) {
	return Promise.resolve(async(generatorFunc)(...args));
}

function sleep(ms) {
	return new Promise((resolve, reject) => setTimeout(() => resolve(), ms));
}

function CancelablePromise(fn) {
	this._promise = new Promise((res, rej) => {
		this._oResFn = res;
		this._oRejFn = rej;
	});
	fn(_ => this._resFn(_), _ => this._rejFn(_), cancelFn => {
		if(!this._done) {
			this._cancelFn = cancelFn
		}
	});
}
CancelablePromise.reject = function(val) {
	return new CancelablePromise((res, rej) => rej(val));
};
CancelablePromise.resolve = function(val) {
	return new CancelablePromise((res, rej) => res(val));
};
CancelablePromise.prototype = {
	_cancelFn: null,
	_done: false,
	_kid: null,
	_parent: null,
	_rejFn(val) {
		if(this._done) {
			return;
		}
		this._cancelFn = null;
		this._done = true;
		this._oRejFn(val);
	},
	_resFn(val) {
		if(this._done) {
			return;
		}
		this._cancelFn = null;
		this._done = true;
		if(val instanceof CancelablePromise) {
			this._kid = val;
		}
		this._oResFn(val);
	},
	then(onFulfilled, onRejected) {
			if(!this._promise) {
			return null;
		}
		var rvRes, rvRej;
		var rv = new CancelablePromise((res, rej) => {
			rvRes = res;
			rvRej = rej;
		});
		rv._parent = this;
		var thenFunc = function(callback, isResolve, val) {
			rv._parent = this._kid = null;
			if(rv._canceled) {
				return;
			}
			if(callback) {
				try {
					rvRes(callback(val));
				} catch(e) {
					rvRej(e);
				}
			} else if(isResolve) {
				rvRes(val);
			} else {
				rvRej(val);
			}
		};
		this._promise.then(thenFunc.bind(this, onFulfilled, true), thenFunc.bind(this, onRejected, false));
		return rv;
	},
	catch(onRejected) {
		return this.then(void 0, onRejected);
	},
	cancel() {
		var done = this._done;
		this._done = true;
		this._promise = null;
		if(!done && this._cancelFn) {
			this._cancelFn();
			this._cancelFn = null;
		}
		if(this._kid) {
			this._kid.cancel();
		}
		if(this._parent) {
			this._parent.cancel();
		}
	}
}

function $ajax(url, params = null, useNative = nativeXHRworks) {
	return new CancelablePromise((resolve, reject, cancelFn) => {
		if(!useNative && (typeof GM_xmlhttpRequest === 'function')) {
			var obj = {
				'method': (params && params.method) || 'GET',
				'url': nav.fixLink(url),
				'onload'(e) {
					if(e.status === 200) {
						resolve(e);
					} else {
						reject(e);
					}
				}
			};
			if(params) {
				delete params.method;
				Object.assign(obj, params);
			}
			var gmxhr = GM_xmlhttpRequest(obj);
			cancelFn(() => {
				try {
					gmxhr.abort();
				} catch(e) {}
			});
			return;
		}
		var useCache = params && params.useCache;
		var xhr = new XMLHttpRequest();
		if(params && params.onprogress) {
			xhr.upload.onprogress = params.onprogress;
		}
		xhr.onreadystatechange = ({ target }) => {
			if(target.readyState === 4) {
				if(target.status === 200) {
					if(useCache) {
						aib.LastModified = target.getResponseHeader('Last-Modified');
						aib.ETag = xhr.getResponseHeader('Etag');
					}
					resolve(target);
				} else {
					reject(target);
				}
			}
		};
		try {
			xhr.open((params && params.method) || 'GET', url, true);
		} catch(e) {
			nativeXHRworks = false;
			resolve($ajax(url, params, false));
			return;
		}
		if(params) {
			if(params.responseType) {
				xhr.responseType = params.responseType;
			}
			var headers = params.headers;
			if(headers) {
				for(var h in headers) {
					if(headers.hasOwnProperty(h)) {
						xhr.setRequestHeader(h, headers[h]);
					}
				}
			}
		}
		if(useCache) {
			if(aib.LastModified) {
				xhr.setRequestHeader('If-Modified-Since', aib.LastModified);
			}
			if(aib.ETag) {
				xhr.setRequestHeader('If-None-Match', aib.ETag);
			}
		}
		xhr.send(params && params.data || null);
		cancelFn(() => xhr.abort());
	});
}

function Maybe(ctor/*, ...args*/) {
	this._ctor = ctor;
	//this._args = args;
	this.hasValue = false;
}
Maybe.prototype = {
	get value() {
		var ctor = this._ctor;
		this.hasValue = !!ctor;
		var val = ctor ? new ctor(/*...this._args*/) : null;
		Object.defineProperty(this, 'value', { value: val });
		return val;
	},
	end() {
		if(this.hasValue) {
			this.value.end();
		}
	}
};

function TasksPool(tasksCount, taskFunc, endFn) {
	this.array = [];
	this.running = 0;
	this.num = 1;
	this.func = taskFunc;
	this.endFn = endFn;
	this.max = tasksCount;
	this.completed = this.paused = this.stopped = false;
}
TasksPool.PauseError = function(duration) {
	this.name = 'TasksPool.PauseError';
	this.duration = duration;
};
TasksPool.prototype = {
	complete() {
		if(!this.stopped) {
			if(this.array.length === 0 && this.running === 0) {
				this.endFn();
			} else {
				this.completed = true;
			}
		}
	},
	'continue'() {
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
	},
	pause() {
		this.paused = true;
	},
	run(data) {
		if(!this.stopped) {
			if(this.paused || this.running === this.max) {
				this.array.push(data);
			} else {
				this._run(data);
				this.running++;
			}
		}
	},
	stop() {
		this.stopped = true;
		this.endFn();
	},

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
	},
	_run(data) {
		this.func(this.num++, data).then(() => this._end(), e => {
			if(e instanceof TasksPool.PauseError) {
				this.pause();
				if(e.duration !== -1) {
					setTimeout(() => this['continue'](), e.duration);
				}
			} else {
				this._end();
				throw e;
			}
		});
	}
};

function TarBuilder() {
	this._data = [];
}
TarBuilder.prototype = {
	addFile(filepath, input) {
		var i = 0,
			checksum = 0,
			fileSize = input.length,
			header = new Uint8Array(512);
		for(var nameLen = Math.min(filepath.length, 100); i < nameLen; ++i) {
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
		for(i = 0; i < 157; i++) {
			checksum += header[i];
		}
		// checksum
		this._padSet(header, 148, checksum.toString(8), 8);
		this._data.push(header);
		this._data.push(input);
		if((i = Math.ceil(fileSize / 512) * 512 - fileSize) !== 0) {
			this._data.push(new Uint8Array(i));
		}
	},
	addString(filepath, str) {
		var i, len, data, sDat = unescape(encodeURIComponent(str));
		for(i = 0, len = sDat.length, data = new Uint8Array(len); i < len; ++i) {
			data[i] = sDat.charCodeAt(i) & 0xFF;
		}
		this.addFile(filepath, data);
	},
	get() {
		this._data.push(new Uint8Array(1024));
		return new Blob(this._data, {'type': 'application/x-tar'});
	},

	_padSet(data, offset, num, len) {
		var i = 0, nLen = num.length;
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

function getErrorMessage(e) {
	if(e instanceof AjaxError) {
		return e.code === 0 ? e.message || Lng.noConnect[lang] : 'HTTP [' + e.code + '] ' + e.message;
	}
	return (typeof e === 'string') ? e : Lng.internalError[lang] + getPrettyErrorMessage(e);
}

function getPrettyErrorMessage(e) {
	return e.stack ? (nav.WebKit ? e.stack :
			e.name + ': ' + e.message + '\n' +
			(nav.Firefox ? e.stack.replace(/^([^@]*).*\/(.+)$/gm, function(str, fName, line) {
				return '    at ' + (fName ? fName + ' (' + line + ')' : line);
			}) : e.stack)
		) : e.name + ': ' + e.message;
}

function toRegExp(str, noG) {
	var l = str.lastIndexOf('/'),
		flags = str.substr(l + 1);
	return new RegExp(str.substr(1, l - 1), noG ? flags.replace('g', '') : flags);
}

// https://html.spec.whatwg.org/multipage/forms.html#constructing-form-data-set
function* getFormElements(form) {
	var controls = $Q('button, input, keygen, object, select, textarea', form),
		fixName = name => name ? name.replace(/([^\r])\n|\r([^\n])/g, '$1\r\n$2') : '';
  constructSet:
	for(var i = 0, len = controls.length; i < len; ++i) {
		var field = controls[i],
			tagName = field.tagName.toLowerCase(),
			type = field.getAttribute('type'),
			name = field.getAttribute('name');
		if($parent(field, 'DATALIST', form) ||
		   isFormElDisabled(field) ||
		   (tagName === 'button' && type !== 'submit') ||
		   (tagName === 'input' && (
		       (type === 'checkbox' && !field.checked) ||
		       (type === 'radio' && !field.checked) ||
		       (type === 'image' && !name)
		   )) ||
		   tagName === 'object'
		) {
			continue;
		}
		if(tagName === 'select') {
			var options = $Q('select > option, select > optgrout > option', field);
			for(var _i = 0, _len = options.length; _i < _len; ++_i) {
				var option = options[_i];
				if(option.selected && !isFormElDisabled(option)) {
					yield {
						el: field,
						name: fixName(name),
						value: option.value,
						type: type
					};
				}
			}
		} else if(tagName === 'input') {
			switch(type) {
			case 'image': throw new Error('input[type="image"] is not supported');
			case 'checkbox':
			case 'radio':
				yield {
					el: field,
					name: fixName(name),
					value: field.value || 'on',
					type: type
				};
				continue constructSet;
			case 'file':
				if(field.files.length > 0) {
					var files = field.files;
					for(var _i = 0, _len = files.length; _i < _len; ++_i) {
						yield {
							el: field,
							name: name,
							value: files[_i],
							type: type
						};
					}
				} else {
					yield {
						el: field,
						name: fixName(name),
						value: '',
						type: 'application/octet-stream'
					};
				}
				continue constructSet;
			}
		}
		if(type === 'textarea') {
			yield {
				el: field,
				name: name || '',
				value: field.value,
				type: type
			};
		} else {
			yield {
				el: field,
				name: fixName(name),
				value: field.value,
				type: type
			};
		}
		var dirname = field.getAttribute('dirname');
		if(dirname) {
			var dir = nav.matchesSelector(field, ':dir(rtl)') ? 'rtl': 'ltr';
			yield {
				el: field,
				name: fixName(dirname),
				value: dir,
				type: 'direction'
			};
		}
	}
}

function isFormElDisabled(el) {
	// https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
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

function downloadBlob(blob, name) {
	var url = window.URL.createObjectURL(blob);
	var link = doc.body.appendChild($add(`<a href="${ url }" download="${ name }"></a>`));
	link.click();
	setTimeout(() => {
		window.URL.revokeObjectURL(url);
		$del(link);
	}, 1e5);
}


// STORAGE
// ===========================================================================================================

function* getStored(id) {
	if(nav.isGM) {
		return GM_getValue(id);
	} else if(nav.isChromeStorage) {
		return (yield new Promise((resolve, reject) => {
			chrome.storage.local.get(id, function(obj) {
				if(Object.keys(obj).length) {
					resolve(obj[id]);
				} else {
					chrome.storage.sync.get(id, function(obj) {
						resolve(obj[id]);
					});
				}
			});
		}));
	} else if(nav.isScriptStorage) {
		return scriptStorage.getItem(id);
	}
	return locStorage[id];
}

function setStored(id, value) {
	if(nav.isGM) {
		GM_setValue(id, value);
	} else if(nav.isChromeStorage) {
		var obj = {};
		obj[id] = value;
		if(value.toString().length < 4095) {
			chrome.storage.sync.set(obj, emptyFn);
			chrome.storage.local.remove(id, emptyFn);
		} else {
			chrome.storage.local.set(obj, emptyFn);
			chrome.storage.sync.remove(id, emptyFn);
		}
	} else if(nav.isScriptStorage) {
		scriptStorage.setItem(id, value);
	} else {
		locStorage[id] = value;
	}
}

function delStored(id) {
	if(nav.isGM) {
		GM_deleteValue(id);
	} else if(nav.isChromeStorage) {
		chrome.storage.sync.remove(id, emptyFn);
	} else if(nav.isScriptStorage) {
		scriptStorage.removeItem(id);
	} else {
		locStorage.removeItem(id);
	}
}

function* getStoredObj(id) {
	return JSON.parse((yield* getStored(id)) || '{}') || {};
}

function saveComCfg(dm, obj) {
	spawn(getStoredObj, 'DESU_Config').then(val => {
		if(obj) {
			val[dm] = obj;
		} else {
			delete val[dm];
		}
		setStored('DESU_Config', JSON.stringify(val));
	});
}

function saveCfg(id, val) {
	if(Cfg[id] !== val) {
		Cfg[id] = val;
		saveComCfg(aib.dm, Cfg);
	}
}

function* readCfg() {
	var obj, val = yield* getStoredObj('DESU_Config');
	if(!(aib.dm in val) || $isEmpty(obj = val[aib.dm])) {
		obj = nav.isGlobal ? val.global || {} : {};
		obj.captchaLang = aib.ru ? 2 : 1;
		obj.correctTime = 0;
	}
	Cfg = Object.assign(Object.create(defaultCfg), obj);
	if(!Cfg.timeOffset) {
		Cfg.timeOffset = '+0';
	}
	if(!Cfg.timePattern) {
		Cfg.timePattern = aib.timePattern;
	}
	if(aib.fch && Cfg.ajaxReply === 2) {
		Lng.cfg['ajaxReply'].sel.forEach(a => a.splice(-1));
		Cfg.ajaxReply = 1;
	}
	if(aib.prot !== 'http:') {
		Cfg.addVocaroo = 0;
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
		Cfg.fileThumb = 0;
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
		Cfg.stats = {'view': 0, 'op': 0, 'reply': 0};
	}
	if(aib.t) {
		Cfg.stats.view++;
	}
	setStored('DESU_Config', JSON.stringify(val));
	lang = Cfg.language;
	if(Cfg.updScript) {
		checkForUpdates(false, val.lastUpd).then(html => {
			if(doc.readyState === 'interactive' || doc.readyState === 'complete') {
				$popup(html, 'updavail', false);
			} else {
				doc.addEventListener('DOMContentLoaded', () => $popup(html, 'updavail', false));
			}
		}, emptyFn);
	}
}

function toggleCfg(id) {
	saveCfg(id, +!Cfg[id]);
}

function readFav() {
	return spawn(getStoredObj, 'DESU_Favorites');
}

function readPosts() {
	var str = aib.t ? sesStorage['de-hidden-' + aib.b + aib.t] : null;
	if(typeof str === 'string') {
		var data = str.split(';');
		if(data.length === 4 && +data[0] === (Cfg.hideBySpell ? spells.hash : 0) &&
		  (data[1] in pByNum) && pByNum[data[1]].count === +data[2])
		{
			sVis = data[3].split(',');
			return;
		}
	}
	sVis = [];
}

function* readUserPosts() {
	var b = aib.b,
		date = Date.now(),
		spellsHide = Cfg.hideBySpell,
		update = false,
		globalUserVis = yield* getStoredObj('DESU_Posts_' + aib.dm);
	hThr = yield* getStoredObj('DESU_Threads_' + aib.dm);
	uVis = globalUserVis[b] || {};
	if(!(b in hThr)) {
		hThr[b] = {};
	}
	if(!dForm.firstThr) {
		return;
	}
	var maybeSpells = new Maybe(SpellsRunner);
	for(var post = dForm.firstThr.op; post; post = post.next) {
		var num = post.num;
		if(num in uVis) {
			var hidePost = uVis[num][0] === 0;
			if(post.isOp) {
				var hideThread = !!(num in hThr[b]);
				if(hidePost !== hideThread) {
					update = true;
					hidePost = hideThread;
				}
			}
			if(hidePost) {
				post.setUserVisib(true, date, false);
			} else {
				uVis[num][1] = date;
				post.btns.firstChild.className = 'de-btn-hide-user';
				post.userToggled = true;
			}
			continue;
		}
		var vis;
		if(post.isOp) {
			if(num in hThr[b]) {
				vis = '0';
			} else if(vis === '0') {
				vis = null;
			}
		} else if(spellsHide) {
			vis = sVis[post.count];
		} else {
			continue;
		}
		if(vis === '0') {
			if(!post.hidden) {
				post.setVisib(true);
				post.hideRefs();
			}
			post.spellHidden = true;
		} else if(vis !== '1') {
			maybeSpells.value.run(post);
		}
	}
	if(update) {
		globalUserVis[b] = uVis;
		setStored('DESU_Posts_' + aib.dm, JSON.stringify(globalUserVis));
	}
	maybeSpells.end();
}

function saveUserPosts() {
	spawn(getStored, 'DESU_Posts_' + aib.dm).then(str => {
		var obj;
		try {
			obj = JSON.parse(str || '{}') || {};
		} catch(e) {
			obj = {};
		}
		if(str && str.length > 1e6) {
			var minDate = Date.now() - 5 * 24 * 3600 * 1000;
			for(var b in obj) {
				if(obj.hasOwnProperty(b)) {
					var vis = obj[b];
					for(var key in vis) {
						if(vis.hasOwnProperty(key) && vis[key][1] < minDate) {
							delete vis[key];
						}
					}
				}
			}
		}
		obj[aib.b] = uVis;
		setStored('DESU_Posts_' + aib.dm, JSON.stringify(obj));
		toggleWindow('hid', true);
	});
}

function saveHiddenThreads(updWindow) {
	setStored('DESU_Threads_' + aib.dm, JSON.stringify(hThr));
	if(updWindow) {
		toggleWindow('hid', true);
	}
}

function* readFavoritesPosts() {
	var temp, update = false,
		fav = yield* getStoredObj('DESU_Favorites');
	if(!(aib.host in fav)) {
		return;
	}
	temp = fav[aib.host];
	if(!(aib.b in temp)) {
		return;
	}
	temp = temp[aib.b];
	for(var thr = dForm.firstThr; thr; thr = thr.next) {
		var num = thr.num;
		if(num in temp) {
			var f = temp[num];
			thr.setFavBtn(true);
			if(aib.t) {
				f.cnt = thr.pcount;
				f['new'] = 0;
				if(aib.t && Cfg.markNewPosts && f.last) {
					var post = pByNum[f.last.match(/\d+/)];
					if(post) {
						while(post = post.next) {
							thr._addPostMark(post.el, true);
						}
					}
				}
				f.last = aib.anchor + thr.last.num;
			} else {
				f['new'] = thr.pcount - f.cnt;
			}
			update = true;
		}
	}
	if(update) {
		setStored('DESU_Favorites', JSON.stringify(fav));
	}
	if(sesStorage['de-win-fav'] === '1') {
		toggleWindow('fav', false, null, true);
		sesStorage.removeItem('de-win-fav');
	}
}

function saveFavorites(fav) {
	setStored('DESU_Favorites', JSON.stringify(fav));
	toggleWindow('fav', true, fav);
}

function removeFavoriteEntry(fav, h, b, num, clearPage) {
	function _isEmpty(f) {
		for(var i in f) {
			if(i !== 'url' && f.hasOwnProperty(i)) {
				return false;
			}
		}
		return true;
	}
	if((h in fav) && (b in fav[h]) && (num in fav[h][b])) {
		delete fav[h][b][num];
		if(_isEmpty(fav[h][b])) {
			delete fav[h][b];
			if($isEmpty(fav[h])) {
				delete fav[h];
			}
		}
	}
	if(clearPage && h === aib.host && b === aib.b && (num in pByNum)) {
		pByNum[num].thr.setFavBtn(false);
	}
}

function readViewedPosts() {
	if(!Cfg.markViewed) {
		return;
	}
	var data = sesStorage['de-viewed'];
	if(data) {
		data.split(',').forEach(function(pNum) {
			var post = pByNum[pNum];
			if(post) {
				post.el.classList.add('de-viewed');
				post.viewed = true;
			}
		});
	}
}


// PANEL & WINDOWS
// ===========================================================================================================

var panel = {
	_hideTO: 0,
	_menuTO: 0,
	_el: null,
	get _infoEl() {
		var val = $q('#de-panel-info', this._el);
		Object.defineProperty(this, '_infoEl', { value: val, configurable: true });
		return val;
	},
	_prepareToHide() {
		if(!Cfg.expandPanel && !$c('de-win-active', doc)) {
			this._hideTO = setTimeout(() => this._el.lastChild.style.display = 'none', 500);
		}
	},
	handleEvent(e) {
		switch(e.type) {
		case 'click':
			switch(e.target.id) {
			case 'de-panel-logo':
				if(Cfg.expandPanel && !$c('de-win-active', doc)) {
					this._el.lastChild.style.display = 'none';
				}
				toggleCfg('expandPanel');
				return;
			case 'de-panel-cfg': toggleWindow('cfg', false); break;
			case 'de-panel-hid': toggleWindow('hid', false); break;
			case 'de-panel-fav': toggleWindow('fav', false); break;
			case 'de-panel-vid': toggleWindow('vid', false); break;
			case 'de-panel-refresh': window.location.reload(); break;
			case 'de-panel-goup': scrollTo(0, 0); break;
			case 'de-panel-godown': scrollTo(0, doc.body.scrollHeight || doc.body.offsetHeight); break;
			case 'de-panel-expimg':
				isExpImg = !isExpImg;
				$del($c('de-img-center', doc));
				for(var post = dForm.firstThr.op; post; post = post.next) {
					post.toggleImages(isExpImg);
				}
				break;
			case 'de-panel-preimg':
				isPreImg = !isPreImg;
				if(!e.ctrlKey) {
					preloadImages(null);
				}
			break;
			case 'de-panel-maskimg':
				toggleCfg('maskImgs');
				updateCSS();
				break;
			case 'de-panel-upd-on':
			case 'de-panel-upd-off':
			case 'de-panel-upd-warn':
				if(updater.enabled) {
					updater.disable();
				} else {
					updater.enable();
				}
				break;
			case 'de-panel-audio-on':
			case 'de-panel-audio-off':
				if(updater.toggleAudio(0)) {
					updater.enable();
					e.target.id = 'de-panel-audio-on';
				} else {
					e.target.id = 'de-panel-audio-off';
				}
				$del($c('de-menu', doc));
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
				this._el.lastChild.style.display = '';
			}
			switch(e.target.id) {
			case 'de-panel-cfg': KeyEditListener.setTitle(e.target, 10); break;
			case 'de-panel-hid': KeyEditListener.setTitle(e.target, 7); break;
			case 'de-panel-fav': KeyEditListener.setTitle(e.target, 6); break;
			case 'de-panel-vid': KeyEditListener.setTitle(e.target, 18); break;
			case 'de-panel-goback': KeyEditListener.setTitle(e.target, 4); break;
			case 'de-panel-gonext': KeyEditListener.setTitle(e.target, 17); break;
			case 'de-panel-maskimg': KeyEditListener.setTitle(e.target, 9); break;
			case 'de-panel-refresh':
				if(aib.t) {
					return;
				}
				/* falls through */
			case 'de-panel-savethr':
			case 'de-panel-audio-off':
				this._menuTO = setTimeout(() => {
					var menu = addMenu(e.target);
					menu.onover = () => clearTimeout(this._hideTO);
					menu.onout = () => this._prepareToHide();
				}, Cfg.linksOver); 
			}
			return;
		default: // mouseout
			this._prepareToHide();
			switch(e.target.id) {
			case 'de-panel-refresh':
			case 'de-panel-savethr':
			case 'de-panel-audio-off':
				clearTimeout(this._menuTO);
				this._menuTO = 0;
			}
		}
	},
	init(formEl) {
		var imgLen = $Q(aib.qThumbImages, formEl).length,
			isThr = aib.t,
			pButton = (id, href = '#') => '<a id="de-panel-' + id + '" class="de-abtn de-panel-button" title="' +
				Lng.panelBtn[id][lang] + '" href="' + href + '"></a>';
		(pr && pr.pArea[0] || formEl).insertAdjacentHTML('beforebegin',
			'<div id="de-main" lang="' + getThemeLang() + '"><div id="de-panel">' +
				'<span id="de-panel-logo" title="' + Lng.panelBtn.attach[lang] + '"></span>' +
				'<span id="de-panel-buttons"' + (Cfg.expandPanel ? '>' : ' style="display: none;">') +
				(Cfg.disabled ? pButton('enable') :
					pButton('cfg') +
					pButton('hid') +
					pButton('fav') +
					(!Cfg.addYouTube ? '' : pButton('vid')) +
					(localRun ? '' :
						pButton('refresh') +
						(!isThr && (aib.page === aib.firstPage) ? '' :
							pButton('goback', aib.getPageUrl(aib.b, aib.page - 1))) +
						(isThr || aib.page === aib.lastPage ? '' :
							pButton('gonext', aib.getPageUrl(aib.b, aib.page + 1)))
					) + pButton('goup') +
					pButton('godown') +
					(imgLen === 0 ? '' :
						pButton('expimg') +
						pButton('maskimg') +
						(nav.Presto || localRun ? '' :
							(Cfg.preLoadImgs ? '' : pButton('preimg')) +
							(!isThr ? '' : pButton('savethr')))) +
					(!isThr || localRun ? '' :
						pButton(Cfg.ajaxUpdThr ? 'upd-on' : 'upd-off') +
						(nav.Safari ? '' : pButton('audio-off'))) +
					(!aib.mak && !aib.tiny && !aib.fch ? '' :
						pButton('catalog', aib.prot + '//' + aib.host + '/' + aib.b + '/catalog.html')) +
					pButton('enable') +
					(!isThr ? '' :
						'<span id="de-panel-info" title="' + Lng.panelBtn.counter[lang] + '">' +
						dForm.firstThr.pcount + '/' + imgLen + '</span>')
				) + '</span>' +
			'</div>' + (Cfg.disabled ? '' : '<div id="de-popup"></div><hr style="clear: both;">') + '</div>');
		this._el = $id('de-panel');
		this._el.addEventListener('click', this, true);
		this._el.addEventListener('mouseover', this);
		this._el.addEventListener('mouseout', this);
	},
	remove() {
		this._el.removeEventListener('click', this, true);
		this._el.removeEventListener('mouseover', this);
		this._el.removeEventListener('mouseout', this);
		delete this._infoEl;
		$del($id('de-main'));
	},
	updateCounter(postCount, imgsCount) {
		this._infoEl.textContent = postCount + '/' + imgsCount;
	}
};

function updateWinZ(style) {
	if(style.zIndex < topWinZ) {
		style.zIndex = ++topWinZ;
	}
}

function makeDraggable(win, head, name) {
	head.addEventListener('mousedown', {
		_win: win,
		_wStyle: win.style,
		_oldX: 0,
		_oldY: 0,
		_X: 0,
		_Y: 0,
		_Z: 0,
		handleEvent(e) {
			if(!Cfg[name + 'WinDrag']) {
				return;
			}
			var curX = e.clientX,
				curY = e.clientY;
			switch(e.type) {
			case 'mousedown':
				this._oldX = curX;
				this._oldY = curY;
				this._X = Cfg[name + 'WinX'];
				this._Y = Cfg[name + 'WinY'];
				if(this._Z < topWinZ) {
					this._Z = this._wStyle.zIndex = ++topWinZ;
				}
				doc.body.addEventListener('mousemove', this);
				doc.body.addEventListener('mouseup', this);
				$pd(e);
				return;
			case 'mousemove':
				var maxX = Post.sizing.wWidth - this._win.offsetWidth,
					maxY = Post.sizing.wHeight - this._win.offsetHeight - 25,
					cr = this._win.getBoundingClientRect(),
					x = cr.left + curX - this._oldX,
					y = cr.top + curY - this._oldY;
				this._X = x >= maxX || curX > this._oldX && x > maxX - 20 ? 'right: 0' :
					x < 0 || curX < this._oldX && x < 20 ? 'left: 0' :
					'left: ' + x + 'px';
				this._Y = y >= maxY || curY > this._oldY && y > maxY - 20 ? 'bottom: 25px' :
					y < 0 || curY < this._oldY && y < 20 ? 'top: 0' :
					'top: ' + y + 'px';
				var width = this._wStyle.width;
				this._win.setAttribute('style', this._X + '; ' + this._Y +
					'; z-index: ' + this._Z + (width ? '; width: ' + width : ''));
				this._oldX = curX;
				this._oldY = curY;
				return;
			default: // mouseup
				doc.body.removeEventListener('mousemove', this);
				doc.body.removeEventListener('mouseup', this);
				saveCfg(name + 'WinX', this._X);
				saveCfg(name + 'WinY', this._Y);
			}
		}
	});
}

function WinResizer(name, dir, cfgName, win, target) {
	this.name = name;
	this.dir = dir;
	this.cfgName = cfgName;
	this.vertical = dir === 'top' || dir === 'bottom';
	this.win = win;
	this.wStyle = this.win.style;
	this.tStyle = target.style;
	$c('de-resizer-' + dir, win).addEventListener('mousedown', this);
}
WinResizer.prototype = {
	handleEvent(e) {
		var val, x, y, cr = this.win.getBoundingClientRect(),
			maxX = nav.Chrome ? doc.documentElement.clientWidth : Post.sizing.wWidth,
			maxY = nav.Chrome ? doc.documentElement.clientHeight : Post.sizing.wHeight,
			width = this.wStyle.width,
			z = '; z-index: ' + this.wStyle.zIndex + (width ? '; width:' + width : '');
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
			case 'top': val = x + '; bottom: ' + (maxY - cr.bottom) + 'px' + z; break;
			case 'bottom': val = x + '; top: ' + cr.top + 'px' + z; break;
			case 'left': val = 'right: ' + (maxX - cr.right) + 'px; ' + y + z; break;
			case 'right': val = 'left: ' + cr.left + 'px; ' + y + z;
			}
			this.win.setAttribute('style', val);
			doc.body.addEventListener('mousemove', this);
			doc.body.addEventListener('mouseup', this);
			$pd(e);
			return;
		case 'mousemove':
			if(this.vertical) {
				val = e.clientY;
				this.tStyle.height = Math.max(
					parseInt(this.tStyle.height, 10) + (
						this.dir === 'top' ? cr.top - (val < 20 ? 0 : val) :
							(val > maxY - 45 ? maxY - 25 : val) - cr.bottom
				), 90) + 'px';
			} else {
				val = e.clientX;
				this.tStyle.width = Math.max(
					parseInt(this.tStyle.width, 10) + (
						this.dir === 'left' ? cr.left - (val < 20 ? 0 : val) :
							(val > maxX - 20 ? maxX : val) - cr.right
				), this.name === 'reply' ? 275 : 380) + 'px';
			}
			return;
		default: // mouseup
			doc.body.removeEventListener('mousemove', this);
			doc.body.removeEventListener('mouseup', this);
			saveCfg(this.cfgName, parseInt(this.vertical ? this.tStyle.height : this.tStyle.width, 10));
			if(this.win.classList.contains('de-win-fixed')) {
				this.win.setAttribute('style', 'right: 0; bottom: 25px' + z);
				return;
			}
			if(this.vertical) {
				saveCfg(this.name + 'WinY', cr.top < 1 ? 'top: 0' :
					cr.bottom > maxY - 26 ? 'bottom: 25px' : 'top: ' + cr.top + 'px');
			} else {
				saveCfg(this.name + 'WinX', cr.left < 1 ? 'left: 0' :
					cr.right > maxX - 1 ? 'right: 0' : 'left: ' + cr.left + 'px');
			}
			this.win.setAttribute('style', Cfg[this.name + 'WinX'] + '; ' + Cfg[this.name + 'WinY'] + z);
		}
	}
};

function toggleWindow(name, isUpd, data, noAnim) {
	var el, main = $id('de-main'),
		win = $id('de-win-' + name),
		isActive = win && win.classList.contains('de-win-active');
	if(isUpd && !isActive) {
		return;
	}
	if(!win) {
		main.insertAdjacentHTML('afterbegin', '<div id="de-win-' + name + '" class="' +
			(Cfg[name + 'WinDrag'] ?
				'de-win" style="' + Cfg[name + 'WinX'] + '; ' + Cfg[name + 'WinY'] :
				'de-win-fixed" style="right: 0; bottom: 25px') +
			(name !== 'fav' ? '' : '; width: ' + Cfg.favWinWidth + 'px; ') + '; display: none;">' +
			'<div class="de-win-head"><span class="de-win-title">' +
				(name === 'cfg' ? 'Dollchan Extension Tools' : Lng.panelBtn[name][lang]) + '</span>' +
				'<span class="de-win-buttons">' +
					'<span class="de-btn-toggle" title="' + Lng.toggleWindow[lang] + '"></span>' +
					'<span class="de-btn-close" title="' + Lng.closeWindow[lang] + '"></span></span></div>' +
			'<div class="de-win-body' + (name === 'cfg' ? ' ' + aib.cReply : '" style="background-color: ' +
				getComputedStyle(doc.body).getPropertyValue('background-color')) + '"></div>' +
			(name !== 'fav' ? '' : '<div class="de-resizer de-resizer-left">' +
				'</div><div class="de-resizer de-resizer-right"></div>') + '</div>');
		win = main.firstChild;
		if(name === 'fav') {
			new WinResizer('fav', 'left', 'favWinWidth', win, win);
			new WinResizer('fav', 'right', 'favWinWidth', win, win);
		}
		el = win.firstChild.lastChild;
		el.lastChild.onclick = toggleWindow.bind(null, name, false);
		el.firstChild.onclick = (e) => {
			var width = win.style.width,
				w = width ? '; width: ' + width : '';
			toggleCfg(name + 'WinDrag');
			if(Cfg[name + 'WinDrag']) {
				win.classList.remove('de-win-fixed');
				win.classList.add('de-win');
				win.style.cssText = Cfg[name + 'WinX'] + '; ' + Cfg[name + 'WinY'] + w;
			} else {
				var temp = $q('.de-win-active.de-win-fixed', win.parentNode);
				if(temp) {
					toggleWindow(temp.id.substr(7), false);
				}
				win.classList.remove('de-win');
				win.classList.add('de-win-fixed');
				win.style.cssText = 'right: 0; bottom: 25px' + w;
			}
			updateWinZ(win.style);
		};
		makeDraggable(win, win.firstChild, name);
	}
	updateWinZ(win.style);
	var remove = !isUpd && isActive;
	if(!remove && !win.classList.contains('de-win') &&
	  (el = $q('.de-win-active.de-win-fixed:not(#de-win-' + name + ')', win.parentNode)))
	{
		toggleWindow(el.id.substr(7), false);
	}
	var isAnim = !noAnim && !isUpd && Cfg.animation,
		body = win.firstChild.nextSibling;
	if(isAnim && body.hasChildNodes()) {
		nav.animEvent(win, function(node) {
			showWindow(node, body, name, false, remove, data, Cfg.animation);
			body = name = remove = data = null;
		});
		win.classList.remove('de-win-open');
		win.classList.add('de-win-close');
	} else {
		showWindow(win, body, name, isUpd, remove, data, isAnim);
	}
}

function showWindow(win, body, name, isUpd, remove, data, isAnim) {
	var temp, cfgTabId;
	if(name === 'cfg' && !remove && (temp = $q('.de-cfg-tab[selected]', body))) {
		cfgTabId = temp.getAttribute('info');
	}
	body.innerHTML = '';
	if(remove) {
		win.classList.remove('de-win-active');
		win.classList.remove('de-win-close');
		win.style.display = 'none';
		if(!Cfg.expandPanel && !$c('de-win-active', doc)) {
			$id('de-panel').lastChild.style.display = 'none';
		}
		return;
	}
	win.classList.add('de-win-active');
	if(!Cfg.expandPanel) {
		$id('de-panel').lastChild.style.display = '';
	}
	switch(name) {
	case 'fav':
		if(data) {
			showFavoritesWindow(body, data);
			break;
		}
		readFav().then(fav => {
			showFavoritesWindow(body, fav);
			win.style.display = '';
			if(isAnim) {
				win.classList.add('de-win-open');
			}
		});
		return;
	case 'cfg': addSettings(body, cfgTabId); break;
	case 'hid': showHiddenWindow(body); break;
	case 'vid': showVideosWindow(body);
	}
	win.style.display = '';
	if(isAnim) {
		win.classList.add('de-win-open');
	}
}

function showVideosWindow(body) {
	var els = $C('de-video-link', dForm.el);
	if(!els.length) {
		body.innerHTML = '<b>' + Lng.noVideoLinks[lang] + '</b>';
		return;
	}
	if(!$id('de-ytube-api')) {
		doc.head.appendChild($new('script', {
			'id': 'de-ytube-api',
			'type': 'text/javascript',
			'src': aib.prot + '//www.youtube.com/player_api'
		}, null));
	}
	body.innerHTML = '<div de-disableautoplay class="de-video-obj"></div>' +
		'<div id="de-video-buttons">' +
			'<a class="de-abtn" id="de-video-btn-prev" href="#" title="' +
				Lng.prevVideo[lang] + '">&#x25C0;</a>' +
			'<a class="de-abtn" id="de-video-btn-resize" href="#" title="' +
				Lng.expandVideo[lang] + '"></a>' +
			'<a class="de-abtn" id="de-video-btn-next" href="#" title="' +
				Lng.nextVideo[lang] + '">&#x25B6;</a>' +
			'<a class="de-abtn" id="de-video-btn-hide" href="#" title="' +
				Lng.hideLnkList[lang] + '">&#x25B2;</a></div>' +
		'<div id="de-video-list" style="max-width: ' + (+Cfg.YTubeWidth + 40) + 'px; max-height: ' +
			(doc.documentElement.clientHeight * .92 - +Cfg.YTubeHeigh - 82) + 'px;"></div>';
	var linkList = body.lastChild;
	$before(linkList, $new('script', {'type': 'text/javascript', 'text':`
		(function() {
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
		})();
	`}));
	body.addEventListener('click', {
		linkList: linkList,
		listHidden: false,
		player: body.firstChild,
		playerInfo: null,
		currentLink: null,
		handleEvent(e) {
			var el = e.target;
			if(el.classList.contains('de-abtn')) {
				var node;
				switch(e.target.id) {
				case 'de-video-btn-hide':
					if((this.listHidden = !this.listHidden)) {
						this.linkList.style.display = 'none';
						e.target.textContent = '\u25BC';
					} else {
						this.linkList.style.display = '';
						e.target.textContent = '\u25B2';
					}
					break;
				case 'de-video-btn-prev':
					node = this.currentLink.parentNode;
					node = node.previousSibling || node.parentNode.lastChild;
					node.lastChild.click();
					break;
				case 'de-video-btn-next':
					node = this.currentLink.parentNode;
					node = node.nextSibling || node.parentNode.firstChild;
					node.lastChild.click();
					break;
				case 'de-video-btn-resize':
					var exp = this.player.className === 'de-video-obj';
					this.player.className = exp ? 'de-video-obj de-video-expanded' : 'de-video-obj';
					this.linkList.style.maxWidth = (exp ? 894 : +Cfg.YTubeWidth + 40) + 'px';
					this.linkList.style.maxHeight = (doc.documentElement.clientHeight * .92 -
						(exp ? 562 : +Cfg.YTubeHeigh + 82)) + 'px';
				}
				$pd(e);
				return;
			} else if(!el.classList.contains('de-video-link')) {
				pByNum[+e.target.getAttribute('de-num')].selectCurrent();
				return;
			}
			var m = el.videoInfo;
			if(this.playerInfo !== m) {
				if(this.currentLink) {
					this.currentLink.classList.remove('de-current');
				}
				this.currentLink = el;
				el.classList.add('de-current');
				this.playerInfo = m;
				Videos.addPlayer(this.player, m, el.classList.contains('de-ytube'), true);
			}
			$pd(e);
		}
	}, true);
	for(var i = 0, len = els.length; i < len; ++i) {
		var el = els[i].cloneNode(true),
			num = aib.getPostEl(els[i]).post.num;
		el.videoInfo = els[i].videoInfo;
		linkList.insertAdjacentHTML('beforeend', '<div class="de-entry ' + aib.cReply + '">&nbsp;' +
			'<a href="' + aib.anchor + num + '" de-num="' + num + '">&gt;</a></div>');
		linkList.lastChild.appendChild(el).classList.remove('de-current');
		if(i === 0) {
			el.click();
		}
		el.setAttribute('onclick', 'window.de_addVideoEvents && window.de_addVideoEvents();');
	}
}

function addContentBlock(parent, title) {
	return parent.appendChild($New('div', {'class': 'de-content-block'}, [
		$new('input', {'type': 'checkbox'}, {'click'() {
			$each($Q('.de-entry > input', this.parentNode), el => el.checked = this.checked);
		}}),
		title
	]));
}

function showHiddenWindow(body) {
	var block, els = $C('de-post-hide', dForm.el);
	for(var i = 0, len = els.length; i < len; ++i) {
		var post = els[i];
		if(post.isOp) {
			continue;
		}
		var cln = post.cloneNode(true);
		cln.removeAttribute('id');
		cln.style.display = '';
		cln.className = aib.cReply + ' de-post-hide de-cloned-post';
		cln.post = Object.create(cln.clone = post.post);
		cln.post.el = cln;
		cln.btn = $q('.de-btn-hide, .de-btn-hide-user', cln);
		cln.btn.parentNode.className = 'de-post-btns';
		cln.btn.onclick = function() {
			this.hideContent(this.hidden = !this.hidden);
		}.bind(cln.post);
		if(!block) {
			block = body.appendChild(
				$add('<div class="de-content-block"><b>' + Lng.hiddenPosts[lang] + ':</b></div>')
			);
		}
		block.appendChild($New('div', {'class': 'de-entry'}, [cln]));
	}
	if(block) {
		body.appendChild($btn(Lng.expandAll[lang], '', function() {
			$each($Q('.de-cloned-post', this.parentNode), function(el) {
				var post = el.post;
				post.hideContent(post.hidden = !post.hidden);
			});
			this.value = this.value === Lng.undo[lang] ? Lng.expandAll[lang] : Lng.undo[lang];
		}));
		body.appendChild($btn(Lng.save[lang], '', function() {
			$each($Q('.de-cloned-post', this.parentNode), function(date, el) {
				if(!el.post.hidden) {
					el.clone.setUserVisib(false, date, true);
				}
			}.bind(null, Date.now()));
			saveUserPosts();
		}));
	} else {
		body.insertAdjacentHTML('beforeend', '<b>' + Lng.noHidPosts[lang] + '</b>');
	}
	body.insertAdjacentHTML('beforeend', '<hr><b>' +
		($isEmpty(hThr) ? Lng.noHidThrds[lang] : Lng.hiddenThrds[lang] + ':') + '</b>');
	for(var b in hThr) {
		if(!$isEmpty(hThr[b])) {
			block = addContentBlock(body, $new('b', {'text': '/' + b}, null));
			for(var tNum in hThr[b]) {
				block.insertAdjacentHTML('beforeend',
					'<div class="de-entry ' + aib.cReply + '" info="' + b + ';' + tNum + '">' +
						'<input type="checkbox">' +
						'<a href="' + aib.getThrdUrl(b, tNum) + '" target="_blank">' + tNum + '</a>' +
						'<div class="de-entry-title">- ' + hThr[b][tNum] + '</div></div>');
			}
		}
	}
	body.insertAdjacentHTML('beforeend', '<hr>');
	body.appendChild(addEditButton('hidden', function(fn) {
		fn(hThr, true, function(data) {
			hThr = data;
			if(!(aib.b in hThr)) {
				hThr[aib.b] = {};
			}
			dForm.firstThr.updateHidden(hThr[aib.b]);
			saveHiddenThreads(true);
			locStorage['__de-threads'] = JSON.stringify(hThr);
			locStorage.removeItem('__de-threads');
		});
	}));
	body.appendChild($btn(Lng.clear[lang], Lng.clrDeleted[lang], async(function* () {
		for(var i = 0, els = $Q('.de-entry[info]', this.parentNode), len = els.length; i < len; ++i) {
			var [board, tNum] = els[i].getAttribute('info').split(';');
			try {
				yield $ajax(aib.getThrdUrl(board, tNum));
			} catch(xhr) {
				if(xhr.status === 404) {
					delete hThr[board][tNum];
					saveHiddenThreads(true);
				}
			}
		}
	})));
	body.appendChild($btn(Lng.remove[lang], Lng.clrSelected[lang], function() {
		$each($Q('.de-entry[info]', this.parentNode), function(date, el) {
			if($t('input', el).checked) {
				var arr = el.getAttribute('info').split(';');
				if(arr[1] in pByNum) {
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

function cleanFavorites() {
	var els = $Q('.de-entry[de-removed]', doc),
		len = els.length;
	if(len > 0) {
		readFav().then(fav => {
			for(var i = 0; i < len; ++i) {
				var el = els[i];
				removeFavoriteEntry(fav, el.getAttribute('de-host'), el.getAttribute('de-board'),
					el.getAttribute('de-num'), true);
			}
			saveFavorites(fav);
		});
	}
}

function showFavoritesWindow(body, data) {
	for(var h in data) {
		for(var b in data[h]) {
			var d = data[h][b],
				block = addContentBlock(body, d.url ?
					$new('a', {'href': d.url, 'text': h + '/' + b}, null) :
					$new('b', {'text': h + '/' + b}, null));
			if(h === aib.host && b === aib.b) {
				block.classList.add('de-fav-current');
			}
			for(var tNum in d) {
				if(tNum === 'url') {
					continue;
				}
				var t = d[tNum];
				if(!t.url.startsWith('http')) {
					t.url = (h === aib.host ? aib.prot + '//' : 'http://') + h + t.url;
				}
				block.insertAdjacentHTML('beforeend', '<div class="de-entry ' + aib.cReply + '" de-host="' +
					h + '" de-board="' + b + '" de-num="' + tNum + '" de-url="' + t.url + '">' +
					(t['type'] !== 'user' ? '' :
						'<span class="de-fav-user" title="' + Lng.setByUser[lang] + '"></span>') +
						'<input type="checkbox">' +
						'<a href="' + t.url + (!t.last ? '' : t.last.startsWith('#') ? t.last :
							h === aib.host ? aib.anchor + t.last : '') + '">' + tNum + '</a>' +
					'<div class="de-entry-title">- ' + t.txt + '</div>' +
					'<div class="de-fav-inf">' +
						'<span class="de-fav-inf-err' + (!t['err'] ? '' :
							t['err'] === 'Closed' ? ' de-fav-closed" title="' + Lng.thrClosed[lang] :
							' de-fav-unavail" title="' + t['err']) + '"></span> ' +
						'<span class="de-fav-inf-new" title="' + Lng.newPosts[lang] + '"' +
							(t['new'] ? '>' : ' style="display: none;">') + (t['new'] || 0) + '</span> ' +
						'[<span class="de-fav-inf-old" title="' +
							Lng.oldPosts[lang] + '">' + t.cnt + '</span>] ' +
						'<span class="de-fav-inf-page" title="' + Lng.thrPage[lang] + '"></span>' +
						'</span></div>');
				$t('a', block.lastChild).onclick = function() {
					sesStorage['de-win-fav'] = '1';
					var el = this.parentNode;
					sesStorage.removeItem('de-scroll-' +
						el.getAttribute('de-board') + el.getAttribute('de-num'));
				}
			}
		}
	}
	if(!body.hasChildNodes()) {
		body.insertAdjacentHTML('afterbegin', '<center><b>' + Lng.noFavThrds[lang] + '</b></center>');
	}
	body.insertAdjacentHTML('beforeend', '<hr>');
	body.appendChild(addEditButton('favor', function(fn) {
		readFav().then(val => fn(val, true, saveFavorites));
	}));
	body.appendChild($btn(Lng.refresh[lang], Lng.infoCount[lang], async(function* () {
		var err, update = false,
			els = $C('de-entry', doc),
			fav = yield* getStoredObj('DESU_Favorites');
		for(var i = 0, len = els.length; i < len; ++i) {
			var form, el = els[i],
				host = el.getAttribute('de-host'),
				b = el.getAttribute('de-board'),
				num = el.getAttribute('de-num'),
				f = fav[host][b][num];
			if(host !== aib.host || f['err'] === 'Closed') {
				continue;
			}
			el = $c('de-fav-inf-new', el);
			el.style.display = '';
			el.textContent = '';
			el.className = 'de-wait';
			try {
				form = yield ajaxLoad(aib.getThrdUrl(b, num));
			} catch(e) {
				el.classList.remove('de-wait');
				err = el.previousElementSibling;
				err.classList.add('de-fav-unavail');
				f['err'] = err.title = getErrorMessage(e);
				update = true;
				continue;
			}
			if(f['err']) {
				err = el.previousElementSibling;
				err.classList.remove('de-fav-unavail');
				err.title = '';
				delete f['err'];
				update = true;
			}
			var cnt = $Q(aib.qRPost, form).length + 1 - el.nextElementSibling.textContent;
			el.textContent = cnt;
			el.className = 'de-fav-inf-new';
			if(cnt === 0) {
				el.style.display = 'none';
			} else {
				f['new'] = cnt;
				update = true;
			}
			if($q(aib.qClosed, form)) {
				err = el.previousElementSibling;
				err.classList.add('de-fav-closed');
				err.title = Lng.thrClosed[lang];
				f['err'] = 'Closed';
				update = true;
			}
		}
		if(update) {
			setStored('DESU_Favorites', JSON.stringify(fav));
		}
	})));
	body.appendChild($btn(Lng.page[lang], Lng.infoPage[lang], async(function* () {
		var els = $Q('.de-fav-current > .de-entry', doc),
			infoCount = els.length,
			postsInfo = [];
		if(!infoCount) {
			return;
		}
		$popup(Lng.loading[lang], 'load-pages', true);
		for(var i = 0; i < infoCount; ++i) {
			var el = els[i];
			postsInfo.push([+el.getAttribute('de-num'), el = $c('de-fav-inf-page', el), false]);
			el.classList.add('de-wait');
		}
		for(var page = 0, infoLoaded = 0, endPage = (aib.lastPage || 10) + 1; page < endPage; ++page) {
			var form;
			try {
				form = new DelForm((yield ajaxLoad(aib.getPageUrl(aib.b, page))), true);
			} catch(e) {
				continue;
			}
			for(var i = 0, tNums = form.tNums; i < infoCount; ++i) {
				var pInfo = postsInfo[i];
				if(tNums.indexOf(pInfo[0]) !== -1) {
					pInfo[1].classList.remove('de-wait');
					pInfo[1].textContent = '@' + page;
					pInfo[2] = true;
					infoLoaded++;
				}
			}
			if(infoLoaded === infoCount) {
				break;
			}
		}
		for(var i = 0; i < infoCount; ++i) {
			var [, node, isFound] = postsInfo[i];
			if(!isFound) {
				node.classList.remove('de-wait');
				node.textContent = '@?';
			}
		}
		closePopup('load-pages');
	})));
	body.appendChild($btn(Lng.clear[lang], Lng.clrDeleted[lang], async(function* () {
		for(var i = 0, els = $C('de-entry', doc), len = els.length; i < len; ++i) {
			var el = els[i],
				node = $c('de-fav-inf-err', el);
			node.classList.add('de-wait');
			try {
				yield $ajax(el.getAttribute('de-url'), null, false);
			} catch(xhr) {
				if(xhr.status === 404) {
					el.setAttribute('de-removed', '');
				}
				node.classList.add('de-fav-unavail');
				node.title = getErrorMessage(new AjaxError(xhr.status, xhr.statusText));
			}
			node.classList.remove('de-wait');
		}
		cleanFavorites();
	})));
	body.appendChild($btn(Lng.remove[lang], Lng.clrSelected[lang], function() {
		$each($C('de-entry', doc), function(el) {
			if($t('input', el).checked) {
				el.setAttribute('de-removed', '');
			}
		});
		cleanFavorites();
	}));
}


// SETTINGS
// ===========================================================================================================

function fixSettings() {
	function toggleBox(state, arr) {
		var i = arr.length,
			nState = !state;
		while(i--) {
			($q(arr[i], doc) || {}).disabled = nState;
		}
	}
	toggleBox(Cfg.ajaxUpdThr, [
		'input[info="updThrDelay"]', 'input[info="noErrInTitle"]', 'input[info="favIcoBlink"]',
		'input[info="markNewPosts"]', 'input[info="desktNotif"]', 'input[info="updCount"]'
	]);
	toggleBox(Cfg.expandImgs, [
		'input[info="imgNavBtns"]', 'input[info="resizeDPI"]', 'input[info="resizeImgs"]',
		'input[info="minImgSize"]', 'input[info="zoomFactor"]',
		'input[info="webmControl"]', 'input[info="webmVolume"]'
	]);
	toggleBox(Cfg.preLoadImgs, ['input[info="findImgFile"]']);
	toggleBox(Cfg.linksNavig, [
		'input[info="linksOver"]', 'input[info="linksOut"]', 'input[info="markViewed"]',
		'input[info="strikeHidd"]', 'input[info="noNavigHidd"]'
	]);
	toggleBox(Cfg.strikeHidd && Cfg.linksNavig === 2, ['input[info="removeHidd"]']);
	toggleBox(Cfg.addYouTube && Cfg.addYouTube !== 4, ['select[info="YTubeType"]', 'input[info="addVimeo"]']);
	toggleBox(Cfg.addYouTube, [
		'input[info="YTubeWidth"]', 'input[info="YTubeHeigh"]', 'input[info="YTubeTitles"]',
		'input[info="ytApiKey"]'
	]);
	toggleBox(Cfg.YTubeTitles, ['input[info="ytApiKey"]']);
	toggleBox(Cfg.ajaxReply, ['input[info="sendErrNotif"]', 'input[info="scrAfterRep"]']);
	toggleBox(Cfg.ajaxReply === 2, [
		'input[info="postSameImg"]', 'input[info="removeEXIF"]', 'input[info="removeFName"]'
	]);
	toggleBox(Cfg.addTextBtns, ['input[info="txtBtnsLoc"]']);
	toggleBox(Cfg.updScript, ['select[info="scrUpdIntrv"]']);
	toggleBox(Cfg.hotKeys, ['input[info="loadPages"]']);
}

function lBox(id, isBlock, fn) {
	var el = $new('input', {'info': id, 'type': 'checkbox'}, {'click'() {
		toggleCfg(this.getAttribute('info'));
		fixSettings();
		if(fn) {
			fn(this);
		}
	}});
	el.checked = Cfg[id];
	return $New('label', isBlock ? {'class': 'de-block'} : null, [el, $txt(' ' + Lng.cfg[id][lang])]);
}

function inpTxt(id, size, Fn) {
	return $new('input', {'info': id, 'type': 'text', 'size': size, 'value': Cfg[id]}, {
		'keyup': Fn ? Fn : function() {
			saveCfg(this.getAttribute('info'), this.value);
		}
	});
}

function optSel(id, isBlock, Fn, className = '') {
	var el, opt = '', x = Lng.cfg[id];
	for(var i = 0, len = x.sel[lang].length; i < len; i++) {
		opt += '<option value="' + i + '">' + x.sel[lang][i] + '</option>';
	}
	el = $add('<select info="' + id + '">' + opt + '</select>');
	el.addEventListener('change', Fn || function() {
		saveCfg(this.getAttribute('info'), this.selectedIndex);
		fixSettings();
	});
	el.selectedIndex = Cfg[id];
	return $New('label', {'class': className + (isBlock ? ' de-block' : '')}, [el, $txt(' ' + x.txt[lang])]);
}

function updRowMeter(node) {
	var top = node.scrollTop,
		el = node.previousSibling,
		num = el.numLines || 1,
		i = 15;
	if(num - i < ((top / 12) | 0 + 1)) {
		var str = '';
		while(i--) {
			str += num++ + '<br>';
		}
		el.insertAdjacentHTML('beforeend', str);
		el.numLines = num;
	}
	el.scrollTop = top;
}

function getCfgFilters() {
	return $New('div', {'class': 'de-cfg-unvis', 'id': 'de-cfg-filters'}, [
		$New('div', {'id': 'de-spell-panel'}, [
			lBox('hideBySpell', false, toggleSpells),
			$new('a', {
				'id': 'de-btn-addspell',
				'text': Lng.add[lang],
				'href': '#',
				'class': 'de-abtn de-spell-btn'}, {
				'click': $pd,
				'mouseover': ({ target }) => target.odelay = setTimeout(() => addMenu(target), Cfg.linksOver),
				'mouseout': ({ target }) => clearTimeout(target.odelay)
			}),
			$new('a', {'text': Lng.apply[lang], 'href': '#', 'class': 'de-abtn de-spell-btn'}, {'click'(e) {
				$pd(e);
				saveCfg('hideBySpell', 1);
				$q('input[info="hideBySpell"]', doc).checked = true;
				toggleSpells();
			}}),
			$new('a', {'text': Lng.clear[lang], 'href': '#', 'class': 'de-abtn de-spell-btn'}, {'click'(e) {
				$pd(e);
				$id('de-spell-txt').value = '';
				toggleSpells();
			}}),
			$add('<a href="https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/Spells-' +
				(lang ? 'en' : 'ru') + '" class="de-abtn de-spell-btn" target="_blank">[?]</a>')
		]),
		$New('div', {'id': 'de-spell-editor'}, [
			$add('<div id="de-spell-rowmeter"></div>'),
			$new('textarea', {'id': 'de-spell-txt', 'wrap': 'off'}, {
				'keydown'() { updRowMeter(this); },
				'scroll'() { updRowMeter(this); }
			})
		]),
		lBox('sortSpells', true, function() {
			if(Cfg.sortSpells) {
				toggleSpells();
			}
		}),
		lBox('menuHiddBtn', true, null),
		lBox('hideRefPsts', true, null),
		lBox('delHiddPost', true, function() {
			$each($C('de-post-hide', dForm.el), function(el) {
				el.post.wrap.classList.toggle('de-hidden');
			});
			updateCSS();
		})
	]);
}

function getCfgPosts() {
	return $New('div', {'class': 'de-cfg-unvis', 'id': 'de-cfg-posts'}, [
		$if(!localRun, $New('div', null, [
			lBox('ajaxUpdThr', false, aib.t ? function() {
				if(Cfg.ajaxUpdThr) {
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
				lBox('markNewPosts', true, function() {
					dForm.firstThr.clearPostsMarks();
				}),
				$if('Notification' in window, lBox('desktNotif', true, function() {
					if(Cfg.desktNotif) {
						Notification.requestPermission();
					}
				})),
				lBox('updCount', true, function() {
					updater.toggleCounter(Cfg.updCount);
				})
			])
		])),
		lBox('updThrBtns', true, updateCSS),
		lBox('expandTrunc', true, updateCSS),
		optSel('postBtnsCSS', false, null),
		lBox('showHideBtn', false, updateCSS),
		lBox('showRepBtn', false, updateCSS),
		lBox('noSpoilers', true, updateCSS),
		lBox('noPostNames', true, updateCSS),
		lBox('widePosts', true, updateCSS),
		$New('div', null, [
			lBox('correctTime', false, DateTime.toggleSettings),
			inpTxt('timeOffset', 2, null),
			$txt(Lng.cfg.timeOffset[lang]),
			$add('<a href="https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/Settings-time-' +
				(lang ? 'en' : 'ru') + '" class="de-abtn" target="_blank">[?]</a>')
		]),
		$New('div', {'class': 'de-cfg-depend'}, [
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
		$New('div', {'class': 'de-cfg-depend'}, [
			lBox('imgNavBtns', true, updateCSS),
			lBox('resizeImgs', true, null),
			$if(Post.sizing.dPxRatio > 1, lBox('resizeDPI', true, null)),
			$New('div', null, [
				inpTxt('minImgSize', 4, function() {
					saveCfg('minImgSize', Math.max(+this.value, 1));
				}),
				$txt(Lng.cfg.minImgSize[lang])
			]),
			inpTxt('zoomFactor', 4, function() {
				saveCfg('zoomFactor', Math.min(Math.max(+this.value, 1), 100));
			}),
			$txt(Lng.cfg.zoomFactor[lang]),
			lBox('webmControl', true, null),
			$if(nav.canPlayWebm, $New('div', null, [
				inpTxt('webmVolume', 4, function() {
					var val = Math.min(+this.value || 0, 100);
					if(Attachment.viewer) {
						Attachment.viewer.setWebmVolume(val);
					}
					saveCfg('webmVolume', val);
					locStorage['__de-webmvolume'] = val;
					locStorage.removeItem('__de-webmvolume');
				}),
				$txt(Lng.cfg.webmVolume[lang])
			]))
		]),
		$if(!nav.Presto, lBox('preLoadImgs', true, null)),
		$if(!nav.Presto && !aib.fch, $New('div', {'class': 'de-cfg-depend'}, [
			lBox('findImgFile', true, null)
		])),
		optSel('openImgs', true, null),
		lBox('imgSrcBtns', true, null),
		lBox('delImgNames', true, null)
	]);
}

function getCfgLinks() {
	return $New('div', {'class': 'de-cfg-unvis', 'id': 'de-cfg-links'}, [
		optSel('linksNavig', true, null),
		$New('div', {'class': 'de-cfg-depend'}, [
			$New('div', null, [
				inpTxt('linksOver', 4, function() {
					saveCfg('linksOver', +this.value | 0);
				}),
				$txt(Lng.cfg.linksOver[lang]),
				inpTxt('linksOut', 4, function() {
					saveCfg('linksOut', +this.value | 0);
				}),
				$txt(Lng.cfg.linksOut[lang])
			]),
			lBox('markViewed', true, null),
			lBox('strikeHidd', true, null),
			$New('div', {'class': 'de-cfg-depend'}, [
				lBox('removeHidd', false, updateCSS)
			]),
			lBox('noNavigHidd', true, null)
		]),
		lBox('crossLinks', true, null),
		lBox('insertNum', true, null),
		lBox('addOPLink', true, null),
		lBox('addImgs', true, null),
		lBox('addMP3', false, null),
		$if(aib.prot === 'http:', lBox('addVocaroo', false, null)),
		optSel('addYouTube', true, null),
		$New('div', {'class': 'de-cfg-depend'}, [
			$New('div', null, [
				optSel('YTubeType', false, null),
				inpTxt('YTubeWidth', 4, null),
				$txt('\u00D7'),
				inpTxt('YTubeHeigh', 4, null)
			]),
			lBox('YTubeTitles', false, null),
			$New('div', null, [
				inpTxt('ytApiKey', 25, function() {
					saveCfg('ytApiKey', this.value.trim());
				}),
				$txt(' ' + Lng.cfg.ytApiKey[lang])
			]),
			lBox('addVimeo', true, null)
		])
	]);
}

function getCfgForm() {
	return $New('div', {'class': 'de-cfg-unvis', 'id': 'de-cfg-form'}, [
		optSel('ajaxReply', true, null),
		$if(pr.form, $New('div', {'class': 'de-cfg-depend'}, [
			$New('div', null, [
				lBox('postSameImg', true, null),
				lBox('removeEXIF', false, null),
				lBox('removeFName', false, null),
				lBox('sendErrNotif', true, null)
			]),
			lBox('scrAfterRep', true, null)
		])),
		$if(pr.form, optSel('addPostForm', true, function() {
			saveCfg('addPostForm', this.selectedIndex);
			pr.isBottom = Cfg.addPostForm === 1;
			pr.setReply(false, !aib.t || Cfg.addPostForm > 1);
		})),
		$if(pr.txta, lBox('spacedQuote', true, null)),
		lBox('favOnReply', true, null),
		$if(pr.subj, lBox('warnSubjTrip', false, null)),
		$if(pr.file && !nav.Presto, lBox('fileThumb', true, function() {
			for(var inp = pr.fileObj; true; inp = inp.next) {
				inp.updateUtils();
				if(!inp.next) {
					break;
				}
			}
			if(inp.empty) {
				inp.hideInputs();
			}
			if(!aib.kus && !aib.multiFile) {
				pr.setPlaceholders();
			}
			updateCSS();
		})),
		$if(!aib.iich && pr.mail, $New('div', null, [
			lBox('addSageBtn', false, null),
			lBox('saveSage', false, null)
		])),
		$if(pr.capTr, optSel('captchaLang', true, null)),
		$if(pr.txta, $New('div', null, [
			optSel('addTextBtns', false, function() {
				saveCfg('addTextBtns', this.selectedIndex);
				pr.addTextPanel();
			}),
			lBox('txtBtnsLoc', false, pr.addTextPanel.bind(pr))
		])),
		$if(pr.passw, $New('div', null, [
			inpTxt('passwValue', 15, PostForm.setUserPassw),
			$txt(Lng.cfg.userPassw[lang]),
			$btn(Lng.change[lang], '', function() {
				$q('input[info="passwValue"]', doc).value = Math.round(Math.random() * 1e15).toString(32);
				PostForm.setUserPassw();
			})
		])),
		$if(pr.name, $New('div', null, [
			inpTxt('nameValue', 15, PostForm.setUserName),
			$txt(' '),
			lBox('userName', false, PostForm.setUserName)
		])),
		$New('div', null, [
			$txt(Lng.dontShow[lang]),
			lBox('noBoardRule', false, updateCSS),
			$if(pr.gothr, lBox('noGoto', false, function() {
				$disp(pr.gothr);
			})),
			$if(pr.passw, lBox('noPassword', false, function() {
				$disp(pr.passw.parentNode.parentNode);
			})),
			$if(pr.name, lBox('noName', false, function() {
				$disp(pr.name.parentNode.parentNode);
			}))
		])
	]);
}

function getCfgCommon() {
	return $New('div', {'class': 'de-cfg-unvis', 'id': 'de-cfg-common'}, [
		optSel('scriptStyle', true, function() {
			saveCfg('scriptStyle', this.selectedIndex);
			$id('de-main').lang = $q('#de-win-reply > .de-win-head', doc).lang = getThemeLang();
		}),
		$New('div', null, [
			lBox('userCSS', false, updateCSS),
			addEditButton('css', function(fn) {
				fn(Cfg.userCSSTxt, false, function() {
					saveCfg('userCSSTxt', this.value);
					updateCSS();
					toggleWindow('cfg', true);
				});
			})
		]),
		lBox('panelCounter', true, updateCSS),
		lBox('rePageTitle', true, null),
		lBox('animation', true, null),
		lBox('closePopups', true, null),
		$New('div', null, [
			lBox('hotKeys', false, function() {
				if(Cfg.hotKeys) {
					if(hKeys) {
						hKeys.enable();
					} else {
						hKeys = new HotKeys();
					}
				} else if(hKeys) {
					hKeys.disable();
				}
			}),
			$btn(Lng.edit[lang], '', function(e) {
				$pd(e);
				if($id('de-popup-edit-hotkeys')) {
					return;
				}
				spawn(HotKeys.readKeys).then(keys => {
					var temp = KeyEditListener.getEditMarkup(keys),
						el = $popup(temp[1], 'edit-hotkeys', false),
						fn = new KeyEditListener(el, keys, temp[0]);
					el.addEventListener('focus', fn, true);
					el.addEventListener('blur', fn, true);
					el.addEventListener('click', fn, true);
					el.addEventListener('keydown', fn, true);
					el.addEventListener('keyup', fn, true);
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
				$btn(Lng.checkNow[lang], '', function() {
					$popup(Lng.loading[lang], 'updavail', true);
					spawn(getStoredObj, 'DESU_Config')
						.then(val => checkForUpdates(true, val.lastUpd))
						.then(html => $popup(html, 'updavail', false), emptyFn);
				})
			])
		])),
		$if(nav.isGlobal, $New('div', null, [
			$txt(Lng.cfg['excludeList'][lang]),
			$new('input', {'type': 'text', 'id': 'de-exclude-edit', 'style': 'display: block; width: 97%;',
				'value': excludeList}, {
				'keyup'() {
					setStored('DESU_Exclude', this.value);
				}
			}),
			lBox('turnOff', true, function() {
				spawn(getStoredObj, 'DESU_Config').then(val => {
					for(var dm in val) {
						if(dm !== aib.dm && dm !== 'global' && dm !== 'lastUpd') {
							val[dm].disabled = Cfg.turnOff;
						}
					}
					val[aib.dm].turnOff = Cfg.turnOff;
					setStored('DESU_Config', JSON.stringify(val));
				});
			})
		]))
	]);
}

function getCfgInfo() {
	function getHiddenThrCount() {
		var count = 0;
		for(var b in hThr) {
			for(var tNum in hThr[b]) {
				count++;
			}
		}
		return count;
	}
	function getInfoTable(data, needMs) {
		return data.map(data => `<div class="de-info-row">
			<span class="de-info-name">${ data[0] }</span>
			<span>${ data[1] + (needMs ? 'ms' : '') }</span>
		</div>`).join('');
	}
	return $New('div', {'class': 'de-cfg-unvis', 'id': 'de-cfg-info'}, [
		$add('<div style="padding-bottom: 10px;">' +
			'<a href="https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/versions" ' +
			'target="_blank">v' + version + '.' + commit + '</a>&nbsp;|&nbsp;' +
			'<a href="http://www.freedollchan.org/scripts/" target="_blank">Freedollchan</a>&nbsp;|&nbsp;' +
			'<a href="https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/' +
			(lang ? 'home-en/' : '') + '" target="_blank">Github</a></div>'),
		$add('<div id="de-info-table"><div id="de-info-stats">' + getInfoTable([
				[Lng.thrViewed[lang], Cfg.stats.view],
				[Lng.thrCreated[lang], Cfg.stats.op],
				[Lng.thrHidden[lang], getHiddenThrCount()],
				[Lng.postsSent[lang], Cfg.stats.reply]
			], false) + '</div>' +
			'<div id="de-info-log">' + getInfoTable(new Logger().getData(false), true) + '</div></div>'),
		$btn(Lng.debug[lang], Lng.infoDebug[lang], function() {
			$popup(Lng.infoDebug[lang] + ':<textarea readonly class="de-editor"></textarea>',
			       'cfg-debug', false).firstElementChild.value = JSON.stringify(
			{
				'version': version,
				'location': String(window.location),
				'nav': nav,
				'cfg': Cfg,
				'sSpells': spells.list.split('\n'),
				'oSpells': sesStorage['de-spells-' + aib.b + (aib.t || '')],
				'perf': new Logger().getData(true)
			}, function(key, value) {
				switch(key) {
				case 'stats':
				case 'nameValue':
				case 'passwValue':
				case 'ytApiKey':
					return void 0;
				}
				if(key in defaultCfg && value === defaultCfg[key]) {
					return void 0;
				}
				return value;
			}, '\t');
		})
	]);
}

function addEditButton(name, getDataFn) {
	return $btn(Lng.edit[lang], Lng.editInTxt[lang], () => getDataFn(function(val, isJSON, saveFn) {
		var el = $popup('<b>' + Lng.editor[name][lang] + '</b>' +
				'<textarea class="de-editor"></textarea>', 'edit-' + name, false),
			ta = el.lastChild;
		ta.value = (isJSON ? JSON.stringify(val, null, '\t') : val);
		el.appendChild($btn(Lng.save[lang], Lng.saveChanges[lang], isJSON ? function(fun) {
			var data;
			try {
				data = JSON.parse(this.value.trim().replace(/[\n\r\t]/g, '') || '{}');
			} finally {
				if(data) {
					fun(data);
					closePopup('edit-' + name);
					closePopup('err-invaliddata');
				} else {
					$popup(Lng.invalidData[lang], 'err-invaliddata', false);
				}
			}
		}.bind(ta, saveFn) : saveFn.bind(ta)));
	}));
}

function cfgTabClick(e) {
	var el = e.target;
	if(el.hasAttribute('selected')) {
		return;
	}
	var prefTab = $c('de-cfg-body', doc);
	if(prefTab) {
		prefTab.className = 'de-cfg-unvis';
		$q('.de-cfg-tab[selected]', doc).removeAttribute('selected');
	}
	el.setAttribute('selected', '');
	var id = el.getAttribute('info'),
		newTab = $id('de-cfg-' + id);
	if(!newTab) {
		$after($id('de-cfg-bar'), newTab =
			id === 'filters' ? getCfgFilters() :
			id === 'posts' ? getCfgPosts() :
			id === 'images' ? getCfgImages() :
			id === 'links' ? getCfgLinks() :
			id === 'form' ? getCfgForm() :
			id === 'common' ? getCfgCommon() :
			getCfgInfo()
		);
		if(id === 'filters') {
			updRowMeter($id('de-spell-txt'));
		}
	}
	newTab.className = 'de-cfg-body';
	if(id === 'filters') {
		$id('de-spell-txt').value = spells.list;
	}
	fixSettings();
}

function addSettings(body, id) {
	var cfgTab = name => $new('div', {
		'class': aib.cReply + ' de-cfg-tab',
		'text': Lng.cfgTab[name][lang],
		'info': name}, {
		'click': cfgTabClick
	});
	body.appendChild($New('div', {'id': 'de-cfg-bar'}, [
		cfgTab('filters'),
		cfgTab('posts'),
		cfgTab('images'),
		cfgTab('links'),
		$if(pr.form || pr.oeForm, cfgTab('form')),
		cfgTab('common'),
		cfgTab('info')
	]));
	body.appendChild($New('div', {'id': 'de-cfg-buttons'}, [
		optSel('language', false, function() {
			saveCfg('language', lang = this.selectedIndex);
			panel.remove();
			$del($id('de-css'));
			$del($id('de-css-dynamic'));
			scriptCSS();
			panel.init(dForm.el);
			toggleWindow('cfg', false);
		}, 'de-cfg-lang-select'),
		addEditButton('cfg', function(fn) {
			fn(Cfg, true, function(data) {
				saveComCfg(aib.dm, data);
				window.location.reload();
			});
		}),
		$btn(Lng.reset[lang], Lng.resetCfg[lang], function() {
			if(confirm(Lng.conReset[lang])) {
				delStored('DESU_Config');
				delStored('DESU_Favorites');
				delStored('DESU_Posts_' + aib.dm);
				delStored('DESU_Threads_' + aib.dm);
				delStored('DESU_keys');
				window.location.reload();
			}
		}),
		$if(nav.isGlobal, $btn(Lng.global[lang], Lng.globalCfg[lang], function() {
			var el = $popup('<b>' + Lng.globalCfg[lang] + ':</b>', 'cfg-global', false);
			el.appendChild($New('div', {'class': 'de-list'}, [
				$btn(Lng.load[lang], '', function() {
					spawn(getStoredObj, 'DESU_Config').then(val => {
						if(val && ('global' in val) && !$isEmpty(val.global)) {
							delete val[aib.dm];
							setStored('DESU_Config', JSON.stringify(val));
							window.location.reload();
						} else {
							$popup(Lng.noGlobalCfg[lang], 'err-noglobalcfg', false);
						}
					});
				}),
				$txt(Lng.loadGlobal[lang])
			]));
			el.appendChild($New('div', {'class': 'de-list'}, [
				$btn(Lng.save[lang], '', function() {
					spawn(getStoredObj, 'DESU_Config').then(val => {
						var obj = {},
							com = val[aib.dm];
						for(var i in com) {
							if(i !== 'correctTime' && i !== 'timePattern' &&
							   i !== 'userCSS' && i !== 'userCSSTxt' &&
							   com[i] !== defaultCfg[i] && i !== 'stats')
							{
								obj[i] = com[i];
							}
						}
						val.global = obj;
						setStored('DESU_Config', JSON.stringify(val));
						toggleWindow('cfg', true);
					});
				}),
				$txt(Lng.saveGlobal[lang])
			]));
			el.insertAdjacentHTML('beforeend', '<hr><small>' + Lng.descrGlobal[lang] + '</small>');
		})),
		$if(!nav.Presto, $btn(Lng.file[lang], '', function() {
			$popup('<b>' + Lng.impexpCfg[lang] + ':</b>' +
				'<div class="de-list">' + Lng.fileToCfg[lang] + ':<br>' +
					'<input type="file" accept=".json" id="de-import-file" style="margin-left: 12px;"></div>' +
				'<div class="de-list"><a id="de-export-file" href="#">' + Lng.cfgToFile[lang] + '</div>',
				'cfg-file', false);
			$id('de-import-file').onchange = function({ target: { files: [file] } }) {
				if(file) {
					readFile(file, true).then(val => {
						var dummy = JSON.parse(val);
						setStored('DESU_Config', val);
						window.location.reload();
					}).catch(() => $popup(Lng.invalidData[lang], 'err-invaliddata', false));
				}
			}
			$id('de-export-file').addEventListener('click', e => {
				spawn(getStored, 'DESU_Config').then(val => {
					downloadBlob(new Blob([val], { type: 'application/json' }), 'DE_Config.json')
				});
				$pd(e);
			}, true);
		}))
	]));
	$q('.de-cfg-tab[info="' + (id || 'filters') + '"]', body).click();
}


// MENU & POPUP
// ===========================================================================================================

function closePopup(id) {
	var el = $id('de-popup-' + id);
	if(el) {
		el.closeTimeout = null;
		if(!Cfg.animation) {
			$del(el);
			return;
		}
		nav.animEvent(el, function(node) {
			var p = node && node.parentNode;
			if(p) {
				p.removeChild(node);
			}
		});
		el.classList.add('de-close');
	}
}

function $popup(txt, id, wait) {
	var node, el = $id('de-popup-' + id),
		cBtn = 'de-popup-btn' + (wait ? ' de-wait' : ''),
		tBtn = wait ? '' : '\u2716 ';
	if(el) {
		$t('div', el).innerHTML = txt.trim();
		node = $t('span', el);
		node.className = cBtn;
		node.textContent = tBtn;
		clearTimeout(el.closeTimeout);
		if(!wait && Cfg.animation) {
			nav.animEvent(el, function(node) {
				node.classList.remove('de-blink');
			});
			el.classList.add('de-blink');
		}
	} else {
		el = $id('de-popup').appendChild($New('div', {'class': aib.cReply, 'id': 'de-popup-' + id}, [
			$new('span', {'class': cBtn, 'text': tBtn}, {'click'() {
				closePopup(id);
			}}),
			$add('<div class="de-popup-msg">' + txt.trim() + '</div>')
		]));
		if(Cfg.animation) {
			nav.animEvent(el, function(node) {
				node.classList.remove('de-open');
			});
			el.classList.add('de-open');
		}
	}
	if(Cfg.closePopups && !wait && !id.includes('edit') && !id.includes('cfg')) {
		el.closeTimeout = setTimeout(closePopup, 4e3, id);
	}
	return el.lastChild;
}

function Menu(parentEl, html, isFixed, clickFn) {
	doc.body.insertAdjacentHTML('beforeend', '<div class="' + aib.cReply +
		' de-menu" style="position: ' + (isFixed ? 'fixed' : 'absolute') +
		'; left: 0px; top: 0px; visibility: hidden;">' + html + '</div>');
	var el = doc.body.lastChild;
	var mStyle = el.style;
	var cr = parentEl.getBoundingClientRect();
	var width = el.offsetWidth;
	var xOffset = isFixed ? 0 : window.pageXOffset;
	if(cr.left + width < Post.sizing.wWidth) {
		mStyle.left = (xOffset + cr.left) + 'px';
	} else {
		mStyle.left = (xOffset + cr.right - width) + 'px';
	}
	var height = el.offsetHeight;
	var yOffset = isFixed ? 0 : window.pageYOffset;
	if(cr.bottom + height < Post.sizing.wHeight) {
		mStyle.top = (yOffset + cr.bottom) + 'px';
	} else {
		mStyle.top = (yOffset + cr.top - height) + 'px';
	}
	mStyle.removeProperty('visibility');
	this._clickFn = clickFn;
	this._el = el;
	this._parentEl = parentEl;
	el.addEventListener('mouseover', this, true);
	el.addEventListener('mouseout', this, true);
	parentEl.addEventListener('mouseout', this);
	el.addEventListener('click', this);
}
Menu.prototype = {
	_closeTO: 0,
	onover: null,
	onout: null,
	remove() {
		if(!this._el) {
			return;
		}
		this._el.removeEventListener('mouseover', this, true);
		this._el.removeEventListener('mouseout', this, true);
		this._parentEl.removeEventListener('mouseout', this);
		this._el.removeEventListener('click', this);
		$del(this._el);
		this._el = null;
	},
	handleEvent(e) {
		var el = e.target;
		switch(e.type) {
		case 'click':
			if(el.className === 'de-menu-item') {
				this.remove();
				this._clickFn(el);
			}
			break;
		case 'mouseover':
			clearTimeout(this._closeTO);
			if(this.onover) {
				this.onover();
			}
			return;
		case 'mouseout':
			clearTimeout(this._closeTO);
			var rt = e.relatedTarget;
			if(this._el && (!rt || (rt !== this._el && !this._el.contains(rt)))) {
				this._closeTO = setTimeout(() => this.remove(), 75);
				if(el !== this._parentEl && this.onout) {
					this.onout();
				}
			}
			return;
		}
	}
};

function addMenu(el) {
	switch(el.id) {
	case 'de-btn-addspell':
		return new Menu(el, '<div style="display: inline-block; border-right: 1px solid grey;">' +
			'<span class="de-menu-item">' + ('#words,#exp,#exph,#imgn,#ihash,#subj,#name,#trip,#img,<br>')
				.split(',').join('</span><span class="de-menu-item">') +
			'</span></div><div style="display: inline-block;"><span class="de-menu-item">' +
			('#sage,#op,#tlen,#all,#video,#vauthor,#num,#wipe,#rep,#outrep')
				.split(',').join('</span><span class="de-menu-item">') + '</span></div>', true,
		function(el) {
			var exp = el.textContent;
			$txtInsert($id('de-spell-txt'), exp +
				(!aib.t || exp === '#op' || exp === '#rep' || exp === '#outrep' ? '' :
					'[' + aib.b + ',' + aib.t + ']') +
				(Spells.needArg[Spells.names.indexOf(exp.substr(1))] ? '(' : ''));
		});
	case 'de-panel-refresh':
		return new Menu(el, '<span class="de-menu-item">' +
			Lng.selAjaxPages[lang].join('</span><span class="de-menu-item">') + '</span>', true,
		function(el) {
			loadPages(aProto.indexOf.call(el.parentNode.children, el) + 1);
		});
	case 'de-panel-savethr':
		return new Menu(el, '<span class="de-menu-item">' +
			Lng.selSaveThr[lang].join('</span><span class="de-menu-item">') + '</span>', true,
		function(el) {
			if(!$id('de-popup-savethr')) {
				var imgOnly = !!aProto.indexOf.call(el.parentNode.children, el);
				if(Images_.preloading) {
					$popup(Lng.loading[lang], 'savethr', true);
					Images_.afterpreload = loadDocFiles.bind(null, imgOnly);
					Images_.progressId = 'savethr';
				} else {
					loadDocFiles(imgOnly);
				}
			}
		});
	case 'de-panel-audio-off':
		return new Menu(el, '<span class="de-menu-item">' +
			Lng.selAudioNotif[lang].join('</span><span class="de-menu-item">') + '</span>', true,
		function(el) {
			var i = aProto.indexOf.call(el.parentNode.children, el);
			updater.enable();
			updater.toggleAudio(i === 0 ? 3e4 : i === 1 ? 6e4 : i === 2 ? 12e4 : 3e5);
			$id('de-panel-audio-off').id = 'de-panel-audio-on';
		});
	}
}


// HOTKEYS
// ===========================================================================================================

function HotKeys() {
	spawn(HotKeys.readKeys).then(keys => this._init(keys));
}
HotKeys.version = 7;
HotKeys.readKeys = function* () {
	var keys, str = yield* getStored('DESU_keys');
	if(!str) {
		return HotKeys.getDefaultKeys();
	}
	try {
		keys = JSON.parse(str);
	} finally {
		if(!keys) {
			return HotKeys.getDefaultKeys();
		}
		if(keys[0] !== HotKeys.version) {
			var tKeys = HotKeys.getDefaultKeys();
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
			keys[0] = HotKeys.version;
			setStored('DESU_keys', JSON.stringify(keys));
		}
		if(keys[1] ^ !!nav.Firefox) {
			var mapFunc = nav.Firefox ? function mapFuncFF(key) {
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
			keys[1] = !!nav.Firefox;
			keys[2] = keys[2].map(mapFunc);
			keys[3] = keys[3].map(mapFunc);
			setStored('DESU_keys', JSON.stringify(keys));
		}
		return keys;
	}
};
HotKeys.getDefaultKeys = function() {
	var globKeys = [
		/* One post/thread above      */ 0x004B /* = K          */,
		/* One post/thread below      */ 0x004A /* = J          */,
		/* Reply or create thread     */ 0x0052 /* = R          */,
		/* Hide selected thread/post  */ 0x0048 /* = H          */,
		/* Open previous page/picture */ 0x1025 /* = Ctrl+Left  */,
		/* Send post (txt)            */ 0xC00D /* = Alt+Enter  */,
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
	var nonThrKeys = [
		/* One post above */ 0x004D /* = M */,
		/* One post below */ 0x004E /* = N */,
		/* Open thread    */ 0x0056 /* = V */,
		/* Expand thread  */ 0x0045 /* = E */
	];
	var thrKeys = [
		/* Update thread  */ 0x0055 /* = U */
	];
	return [HotKeys.version, !!nav.Firefox, globKeys, nonThrKeys, thrKeys];
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
	clear(lastPage) {
		this.cPost = null;
		this.lastPage = lastPage;
		this.lastPageOffset = 0;
	},
	disable() {
		if(this.enabled) {
			if(this.cPost) {
				this.cPost.unselect();
			}
			doc.removeEventListener('keydown', this, true);
			this.enabled = false;
		}
	},
	enable() {
		if(!this.enabled) {
			this.clear(aib.page);
			doc.addEventListener('keydown', this, true);
			this.enabled = true;
		}
	},
	handleEvent(e) {
		if(this.paused || e.metaKey) {
			return;
		}
		var isThr = aib.t,
			curTh = e.target.tagName,
			kc = e.keyCode | (e.ctrlKey ? 0x1000 : 0) | (e.shiftKey ? 0x2000 : 0) | (e.altKey ? 0x4000 : 0) |
				(curTh === 'TEXTAREA' || (curTh === 'INPUT' &&
				(e.target.type === 'text' || e.target.type === 'password')) ? 0x8000 : 0);
		if(kc === 0x74 || kc === 0x8074) { // F5
			if(isThr || $id('de-popup-load-pages')) {
				return;
			}
			if(Attachment.viewer) {
				Attachment.viewer.close(null);
				Attachment.viewer = null;
			}
			loadPages(+Cfg.loadPages);
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
				dForm.firstThr.clearPostsMarks();
			}
			this.lastPageOffset = 0;
		} else if(kc === 0x801B) { // ESC (txt)
			e.target.blur();
		} else {
			var post, idx, globIdx = this.gKeys.indexOf(kc);
			switch(globIdx) {
			case 2: // Quick reply
				if(pr.form) {
					post = this.cPost || this._getFirstVisPost(false, true) || dForm.firstThr.op;
					this.cPost = post;
					pr.showQuickReply(post, post.num, true, false);
					post.select();
				}
				break;
			case 3: // Hide selected thread/post
				post = this._getFirstVisPost(false, true) || this._getNextVisPost(null, true, false);
				if(post) {
					post.toggleUserVisib();
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
				if(e.target !== pr.txta && e.target !== pr.cap) {
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
				$disp($id('de-panel').lastChild);
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
					post.toggleImages(!post.imagesExpanded);
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
				} else if(!isThr && this.lastPage !== aib.lastPage) {
					window.location.pathname = aib.getPageUrl(aib.b, this.lastPage + 1);
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
						if(nav.Firefox) {
							GM_openInTab(aib.getThrdUrl(aib.b, post.tNum), false, true);
						} else {
							window.open(aib.getThrdUrl(aib.b, post.tNum), '_blank');
						}
					}
					break;
				} else if(idx === 3) { // Expand/collapse thread
					post = this._getFirstVisPost(false, true) || this._getNextVisPost(null, true, false);
					if(post) {
						if(post.thr.loadedOnce && post.thr.op.next.count === 1) {
							var nextThr = post.thr.nextNotHidden;
							post.thr.load(visPosts, !!nextThr);
							post = (nextThr || post.thr).op;
						} else {
							post.thr.load(1, false);
							post = post.thr.op;
						}
						scrollTo(0, window.pageYOffset + post.topCoord);
						if(this.cPost && this.cPost !== post) {
							this.cPost.unselect();
							this.cPost = post;
						}
					}
					break;
				}
				/* falls through */
			default:
				var scrollToThr = !isThr && (globIdx === 0 || globIdx === 1);
				this._scroll(this._getFirstVisPost(scrollToThr, false),
					globIdx === 0 || idx === 0, scrollToThr);
			}
		}
		e.stopPropagation();
		$pd(e);
	},
	pause() {
		this.paused = true;
	},
	resume(keys) {
		this.gKeys = keys[2];
		this.ntKeys = keys[3];
		this.tKeys = keys[4];
		this.paused = false;
	},

	_getFirstVisPost(getThread, getFull) {
		if(this.lastPageOffset !== window.pageYOffset) {
			var post = getThread ? dForm.firstThr : dForm.firstThr.op;
			while(post.topCoord < 1) {
				var tPost = post.next;
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
	_getNextVisPost(cPost, isOp, toUp) {
		if(isOp) {
			var thr = cPost ? toUp ? cPost.thr.prevNotHidden : cPost.thr.nextNotHidden :
				dForm.firstThr.hidden ? dForm.firstThr.nextNotHidden : dForm.firstThr;
			return thr ? thr.op : null;
		}
		return cPost ? cPost.getAdjacentVisPost(toUp) : dForm.firstThr.hidden ||
			dForm.firstThr.op.hidden ? dForm.firstThr.op.getAdjacentVisPost(toUp) : dForm.firstThr.op;
	},
	_init(keys) {
		this.enabled = true;
		this.lastPage = aib.page;
		this.gKeys = keys[2];
		this.ntKeys = keys[3];
		this.tKeys = keys[4];
		doc.addEventListener('keydown', this, true);
	},
	_scroll(post, toUp, toThread) {
		var next = this._getNextVisPost(post, toThread, toUp);
		if(!next) {
			if(!aib.t && (toUp ? aib.page > aib.firstPage : this.lastPage < aib.lastPage)) {
				window.location.pathname = aib.getPageUrl(aib.b, toUp ? aib.page - 1 : this.lastPage + 1);
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

function KeyEditListener(popupEl, keys, allKeys) {
	var aInputs = aProto.slice.call($C('de-input-key', popupEl));
	for(var i = 0, len = allKeys.length; i < len; ++i) {
		var k = allKeys[i];
		if(k !== 0) {
			for(var j = i + 1; j < len; ++j) {
				if(k === allKeys[j]) {
					aInputs[i].classList.add('de-error-key');
					aInputs[j].classList.add('de-error-key');
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
	this.errCount = $C('de-error-key', popupEl).length;
	if(this.errCount !== 0) {
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
KeyEditListener.getStrKey = function(key) {
	var str = '';
	if(key & 0x1000) {
		str += 'Ctrl+';
	}
	if(key & 0x2000) {
		str += 'Shift+';
	}
	if(key & 0x4000) {
		str += 'Alt+';
	}
	str += KeyEditListener.keyCodes[key & 0xFFF];
	return str;
};
KeyEditListener.getEditMarkup = function(keys) {
	var allKeys = [];
	var html = Lng.hotKeyEdit[lang].join('')
		.replace(/%l/g, '<label class="de-block">')
		.replace(/%\/l/g, '</label>')
		.replace(/%i([2-4])([0-9]+)(t)?/g, function(aKeys, all, id1, id2, isText) {
			var key = this[+id1][+id2];
			aKeys.push(key);
			return '<input class="de-input-key" type="text" de-id1="' + id1 + '" de-id2="' + id2 +
				'" size="18" value="' + KeyEditListener.getStrKey(key) +
				(isText ? '" de-text' : '"' ) + ' readonly></input>';
		}.bind(keys, allKeys)) +
	'<input type="button" id="de-keys-save" class="de-button" value="' + Lng.save[lang] + '"></input>' +
	'<input type="button" id="de-keys-reset" class="de-button" value="' + Lng.reset[lang] + '"></input>';
	return [allKeys, html];
};
KeyEditListener.setTitle = function(el, idx) {
	var title = el.getAttribute('de-title');
	if(!title) {
		title = el.getAttribute('title');
		el.setAttribute('de-title', title);
	}
	if(hKeys && idx !== -1) {
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
	handleEvent(e) {
		var key, el = e.target;
		switch(e.type) {
		case 'blur':
			if(hKeys && this.errCount === 0) {
				hKeys.resume(this.keys);
			}
			this.cEl = null;
			return;
		case 'focus':
			if(hKeys) {
				hKeys.pause();
			}
			this.cEl = el;
			return;
		case 'click':
			var keys;
			if(el.id === 'de-keys-reset') {
				this.keys = HotKeys.getDefaultKeys();
				this.initKeys = HotKeys.getDefaultKeys();
				if(hKeys) {
					hKeys.resume(this.keys);
				}
				var temp = KeyEditListener.getEditMarkup(this.keys);
				this.allKeys = temp[0];
				$c('de-popup-msg', this.popupEl).innerHTML = temp[1];
				this.allInputs = aProto.slice.call($C('de-input-key', this.popupEl));
				this.errCount = 0;
				delete this.saveButton;
				break;
			} else if(el.id === 'de-keys-save') {
				keys = this.keys;
				setStored('DESU_keys', JSON.stringify(keys));
			} else if(el.className === 'de-popup-btn') {
				keys = this.initKeys;
			} else {
				return;
			}
			if(hKeys) {
				hKeys.resume(keys);
			}
			closePopup('edit-hotkeys');
			break;
		case 'keydown':
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
			var keyStr = KeyEditListener.keyCodes[key];
			if(keyStr === undefined) {
				this.cKey = -1;
				return;
			}
			var str = '';
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
		case 'keyup':
			el = this.cEl;
			key = this.cKey;
			if(!el || key === -1) {
				return;
			}
			var rEl, isError = el.classList.contains('de-error-key');
			if(!this.errorInput && key !== -1) {
				var idx = this.allInputs.indexOf(el),
					oKey = this.allKeys[idx];
				if(oKey === key) {
					this.errorInput = false;
					break;
				}
				var rIdx = key === 0 ? -1 : this.allKeys.indexOf(key);
				this.allKeys[idx] = key;
				if(isError) {
					idx = this.allKeys.indexOf(oKey);
					if(idx !== -1 && this.allKeys.indexOf(oKey, idx + 1) === -1) {
						rEl = this.allInputs[idx];
						if(rEl.classList.contains('de-error-key')) {
							this.errCount--;
							rEl.classList.remove('de-error-key');
						}
					}
					if(rIdx === -1) {
						this.errCount--;
						el.classList.remove('de-error-key');
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
				if(!rEl.classList.contains('de-error-key')) {
					this.errCount++;
					rEl.classList.add('de-error-key');
				}
			}
			if(!isError) {
				this.errCount++;
				el.classList.add('de-error-key');
			}
			if(this.errCount !== 0) {
				this.saveButton.disabled = true;
			}
		}
		$pd(e);
	}
};


// CONTENT FEATURES
// ===========================================================================================================

function initMessageFunctions() {
	doc.defaultView.addEventListener('message', function(e) {
		if(typeof e.data === 'string') {
			switch(e.data.substr(0, 15)) {
			case 'de-iframe-pform':
				checkUpload($DOM(e.data.substr(15)));
				$q('iframe[name="de-iframe-pform"]', doc).src = 'about:blank';
				return;
			case 'de-iframe-dform':
				checkDelete($DOM(e.data.substr(15)));
				$q('iframe[name="de-iframe-dform"]', doc).src = 'about:blank';
			}
		}
	});
}

function detectImgFile(ab) {
	var i, j, dat = new Uint8Array(ab),
		len = dat.length;
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
				return {'type': 0, 'idx': i, 'data': ab};
			/* ZIP [50 4b 03 04] = [PK..] */
			} else if(dat[i] === 0x50 && dat[i + 1] === 0x4B && dat[i + 2] === 0x03) {
				return {'type': 1, 'idx': i, 'data': ab};
			/* RAR [52 61 72 21] = [Rar!] */
			} else if(dat[i] === 0x52 && dat[i + 1] === 0x61 && dat[i + 2] === 0x72) {
				return {'type': 2, 'idx': i, 'data': ab};
			/* OGG [4f 67 67 53] = [OggS] */
			} else if(dat[i] === 0x4F && dat[i + 1] === 0x67 && dat[i + 2] === 0x67) {
				return {'type': 3, 'idx': i, 'data': ab};
			/* MP3 [0x49 0x44 0x33] = [ID3] */
			} else if(dat[i] === 0x49 && dat[i + 1] === 0x44 && dat[i + 2] === 0x33) {
				return {'type': 4, 'idx': i, 'data': ab};
			}
		}
	}
	return {};
}

function WorkerPool(mReqs, wrkFn, errFn) {
	if(!nav.hasWorker) {
		this.run = (data, transferObjs, fn) => fn(wrkFn(data));
		return;
	}
	var url = window.URL.createObjectURL(new Blob([`self.onmessage = function(e) {
		var info = (${String(wrkFn)})(e.data);
		if(info.data) {
			self.postMessage(info, [info.data]);
		} else {
			self.postMessage(info);
		}
	}`], {'type': 'text/javascript'}));
	this._pool = new TasksPool(mReqs, this._createWorker.bind(this), null);
	this._freeWorkers = [];
	this._url = url;
	this._errFn = errFn;
	while(mReqs--) {
		this._freeWorkers.push(new Worker(url));
	}
}
WorkerPool.prototype = {
	run(data, transferObjs, fn) {
		this._pool.run([data, transferObjs, fn]);
	},
	_createWorker(num, data) {
		return new Promise((resolve, reject) => {
			var w = this._freeWorkers.pop(),
				[sendData, transferObjs, fn] = data;
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
	},
	clear() {
		window.URL.revokeObjectURL(this._url);
		this._freeWorkers = [];
	}
};

function addImgFileIcon(link, fName, info) {
	var app, ext, type = info.type;
	if(typeof type === 'undefined') {
		return;
	}
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
	link.insertAdjacentHTML('afterend', '<a href="' + window.URL.createObjectURL(
			new Blob([nav.getUnsafeUint8Array(info.data, info.idx)], {'type': app})
		) + '" class="de-img-' + (type > 2 ? 'audio' : 'arch') + '" title="' + Lng.downloadFile[lang] +
		'" download="' + fName.substring(0, fName.lastIndexOf('.')) + '.' + ext + '">.' + ext + '</a>'
	);
}

function downloadImgData(url, repeatOnError = true) {
	return $ajax(url, {
		responseType: 'arraybuffer',
		overrideMimeType: 'text/plain; charset=x-user-defined'
	}, !aib.fch || url.startsWith('blob')).then(xhr => {
		if('response' in xhr) {
			return nav.getUnsafeUint8Array(xhr.response);
		}
		var txt = xhr.responseText,
			rv = new Uint8Array(txt.length);
		for(var i = 0, len = txt.length; i < len; ++i) {
			rv[i] = txt.charCodeAt(i) & 0xFF;
		}
		return rv;
	}, xhr => {
		if(xhr instanceof Error || xhr.status === 404) {
			return null;
		}
		if(xhr.status === 0 && xhr.responseType === 'arraybuffer') {
			return new Uint8Array(xhr.response);
		}
		return repeatOnError ? downloadImgData(url, false) : null;
	});
}

function preloadImages(post) {
	if(!Cfg.preLoadImgs && !Cfg.openImgs && !isPreImg) {
		return;
	}
	var pool;
	if(isPreImg || Cfg.preLoadImgs) {
		var cImg = 1,
			mReqs = post ? 1 : 4,
			rjf = (isPreImg || Cfg.findImgFile) && new WorkerPool(mReqs, detectImgFile, function(e) {
				console.error("FILE DETECTOR ERROR, line: " + e.lineno + " - " + e.message);
			});
		pool = new TasksPool(mReqs, function(num, data) {
			return downloadImgData(data[0]).then(imageData => {
				var [url, link, iType, nExp, el] = data;
				if(imageData) {
					var fName = url.substring(url.lastIndexOf("/") + 1),
						aEl = $q(aib.qImgLink, aib.getImgWrap(link));
					link.href = aEl.href = window.URL.createObjectURL(new Blob([imageData], {'type': iType}));
					link.setAttribute('download', fName);
					aEl.setAttribute('download', fName);
					if(iType === 'video/webm') {
						el.setAttribute('de-video', '');
					}
					if(nExp) {
						el.src = link.href;
					}
					if(rjf) {
						rjf.run(imageData.buffer, [imageData.buffer], addImgFileIcon.bind(null, aEl, fName));
					}
				}
				if(Images_.progressId) {
					$popup(Lng.loadImage[lang] + cImg + '/' + len, Images_.progressId, true);
				}
				cImg++;
			});
		}, function() {
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
	var els = $Q(aib.qThumbImages, post || dForm.el);
	for(var i = 0, len = els.length; i < len; ++i) {
		var el = els[i],
			link = $parent(el = els[i], 'A');
		if(!link) {
			continue;
		}
		var iType, url = link.href,
			nExp = !!Cfg.openImgs;
		if(/\.gif$/i.test(url)) {
			iType = 'image/gif';
			nExp &= Cfg.openImgs !== 3;
		} else {
			if(/\.jpe?g$/i.test(url)) {
				iType = 'image/jpeg';
			} else if(/\.png$/i.test(url)) {
				iType = 'image/png';
			} else if(/\.webm$/i.test(url)) {
				iType = 'video/webm';
				nExp = false;
			} else {
				continue;
			}
			nExp &= Cfg.openImgs !== 2;
		}
		if(pool) {
			pool.run([url, link, iType, nExp, el]);
		} else if(nExp) {
			el.src = url; // !
		}
	}
	if(pool) {
		pool.complete();
	}
}

function getDataFromImg(img) {
	var cnv = Images_.canvas || (Images_.canvas = doc.createElement('canvas'));
	cnv.width = img.width;
	cnv.height = img.height;
	cnv.getContext('2d').drawImage(img, 0, 0);
	return new Uint8Array(atob(cnv.toDataURL("image/png").split(',')[1]).split('').map(function(a) {
		return a.charCodeAt();
	}));
}

function loadDocFiles(imgOnly) {
	var els, progress, counter, count = 0,
		current = 1,
		warnings = '',
		tar = new TarBuilder(),
		dc = imgOnly ? doc : doc.documentElement.cloneNode(true);
	Images_.pool = new TasksPool(4, function(num, data) {
		return downloadImgData(data[0]).then(imgData => {
			var [url, name, el, link] = data,
				safeName = name.replace(/[\\\/:*?"<>|]/g, '_');
			progress.value = current;
			counter.innerHTML = current;
			current++;
			if(link) {
				if(!imgData) {
					warnings += '<br>' + Lng.cantLoad[lang] + '<a href="' + url + '">' +
						url + '</a><br>' + Lng.willSavePview[lang];
					$popup(Lng.loadErrors[lang] + warnings, 'err-files', false);
					safeName = 'thumb-' + safeName.replace(/\.[a-z]+$/, '.png');
					imgData = getDataFromImg(el);
				}
				if(!imgOnly) {
					el.classList.add('de-thumb');
					link.href = $q(aib.qImgLink, aib.getImgWrap(link)).href = safeName = 'images/' + safeName;
					if(safeName.match(/\.webm$/)) {
						tar.addFile(el.src = safeName.replace(/\.webm$/, '.png'), getDataFromImg(el));
					} else {
						el.src = safeName;
					}
				}
				tar.addFile(safeName, imgData);
			} else if(imgData && imgData.length > 0) {
				tar.addFile(el.href = el.src = 'data/' + safeName, imgData);
			} else {
				$del(el);
			}
		});
	}, function() {
		var name = aib.dm + '-' + aib.b.replace(/[\\\/:*?"<>|]/g, '') + '-' + aib.t;
		if(!imgOnly) {
			var dt = doc.doctype;
			$t('head', dc).insertAdjacentHTML('beforeend',
				'<script type="text/javascript" src="data/dollscript.js"></script>');
			tar.addString('data/dollscript.js', '(' +
				String(typeof de_main_func_outer === 'undefined' ? de_main_func_inner : de_main_func_outer) +
			')(null, true);');
			tar.addString(
				name + '.html', '<!DOCTYPE ' + dt.name +
				(dt.publicId ? ' PUBLIC "' + dt.publicId + '"' : dt.systemId ? ' SYSTEM' : '') +
				(dt.systemId ? ' "' + dt.systemId + '"' : '') + '>' + dc.outerHTML
			);
		}
		downloadBlob(tar.get(), name + (imgOnly ? '-images.tar' : '.tar'));
		$del($id('de-popup-load-files'));
		Images_.pool = tar = warnings = count = current = imgOnly = progress = counter = null;
	});
	els = aProto.slice.call($Q(aib.qThumbImages, $q('[de-form]', dc)));
	count += els.length;
	els.forEach(function(el) {
		var link = $parent(el, 'A');
		if(link) {
			var url = link.href;
			if(aib.tiny) {
				url = url.replace(/^.*?\?v=|&.*?$/g, '');
			}
			Images_.pool.run([url, link.getAttribute('download') ||
				url.substring(url.lastIndexOf("/") + 1), el, link]);
		}
	});
	if(!imgOnly) {
		$each($Q('#de-main, .de-parea, .de-post-btns, .de-btn-src, .de-refmap, .de-thread-buttons, ' +
			'.de-video-obj, #de-win-reply, link[rel="alternate stylesheet"], script, ' +
			aib.qPostForm, dc), $del);
		$each($T('a', dc), function(el) {
			var num, tc = el.textContent;
			if(tc[0] === '>' && tc[1] === '>' && (num = +tc.substr(2)) && (num in pByNum)) {
				el.href = aib.anchor + num;
			} else {
				el.href = getAbsLink(el.href);
			}
			if(!el.classList.contains('de-link-pref')) {
				el.className = 'de-link-pref ' + el.className;
			}
		});
		$each($Q(aib.qRPost, dc), function(post, i) {
			post.setAttribute('de-num', i === 0 ? aib.t : aib.getPNum(post));
		});
		var files = [];
		$each($Q('link, *[src]', dc), function(el) {
			if(els.indexOf(el) !== -1) {
				return;
			}
			var name, url = el.tagName === 'LINK' ? el.href : el.src;
			if(!this.test(url)) {
				$del(el);
				return;
			}
			name = url.substring(url.lastIndexOf("/") + 1).replace(/[\\\/:*?"<>|]/g, '_').toLowerCase();
			if(files.indexOf(name) !== -1) {
				var temp = url.lastIndexOf('.'),
					ext = url.substring(temp);
				url = url.substring(0, temp);
				name = name.substring(0, name.lastIndexOf('.'));
				for(var i = 0; ; ++i) {
					temp = name + '(' + i + ')' + ext;
					if(files.indexOf(temp) === -1) {
						break;
					}
				}
				name = temp;
			}
			files.push(name);
			Images_.pool.run([url, name, el, null]);
			count++;
		}.bind(new RegExp('^\\/\\/?|^https?:\\/\\/([^\\/]*\.)?' + regQuote(aib.dm) + '\\/', 'i')));
	}
	$popup((imgOnly ? Lng.loadImage[lang] : Lng.loadFile[lang]) +
		'<br><progress id="de-loadprogress" value="0" max="' + count +
		'"></progress> <span>1</span>/' + count, 'load-files', true);
	progress = $id('de-loadprogress');
	counter = progress.nextElementSibling;
	Images_.pool.complete();
	els = null;
}


// TIME CORRECTION
// ===========================================================================================================

function DateTime(pattern, rPattern, diff, dtLang, onRPat) {
	if(DateTime.checkPattern(pattern)) {
		this.disabled = true;
		return;
	}
	this.regex = pattern
		.replace(/(?:[sihdny]\?){2,}/g, function(str) {
			return '(?:' + str.replace(/\?/g, '') + ')?';
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
	if(rPattern) {
		this.genDateTime = DateTime.genRFunc(rPattern, diff);
	} else {
		this.onRPat = onRPat;
	}
}
DateTime.toggleSettings = function(el) {
	if(el.checked && (!/^[+-]\d{1,2}$/.test(Cfg.timeOffset) || DateTime.checkPattern(Cfg.timePattern))) {
		$popup(Lng.cTimeError[lang], 'err-correcttime', false);
		saveCfg('correctTime', 0);
		el.checked = false;
	}
};
DateTime.checkPattern = function(val) {
	return !val.includes('i') || !val.includes('h') || !val.includes('d') || !val.includes('y') ||
		!(val.includes('n') || val.includes('m')) ||
		/[^\?\-\+sihdmwny]|mm|ww|\?\?|([ihdny]\?)\1+/.test(val);
};
DateTime.genRFunc = function(rPattern, diff) {
	return new Function('dtime', 'return \'' +
		rPattern.replace('_o', (diff < 0 ? '' : '+') + diff)
		.replace('_s', '\' + this.pad2(dtime.getSeconds()) + \'')
		.replace('_i', '\' + this.pad2(dtime.getMinutes()) + \'')
		.replace('_h', '\' + this.pad2(dtime.getHours()) + \'')
		.replace('_d', '\' + this.pad2(dtime.getDate()) + \'')
		.replace('_w', '\' + this.arrW[dtime.getDay()] + \'')
		.replace('_n', '\' + this.pad2(dtime.getMonth() + 1) + \'')
		.replace('_m', '\' + this.arrM[dtime.getMonth()] + \'')
		.replace('_M', '\' + this.arrFM[dtime.getMonth()] + \'')
		.replace('_y', '\' + (\'\' + dtime.getFullYear()).substring(2) + \'')
		.replace('_Y', '\' + dtime.getFullYear() + \'') + '\';'
	);
};
DateTime.prototype = {
	genDateTime: null,
	onRPat: null,
	getRPattern(txt) {
		var m = txt.match(new RegExp(this.regex));
		if(!m) {
			this.disabled = true;
			return false;
		}
		var rPattern = '';
		for(var i = 1, len = m.length, j = 0, str = m[0]; i < len; ) {
			var a = m[i++],
				p = this.pattern[i - 2];
			if((p === 'm' || p === 'y') && a.length > 3) {
				p = p.toUpperCase();
			}
			var k = str.indexOf(a, j);
			rPattern += str.substring(j, k) + '_' + p;
			j = k + a.length;
		}
		if(this.onRPat) {
			this.onRPat(rPattern);
		}
		this.genDateTime = DateTime.genRFunc(rPattern, this.diff);
		return true;
	},
	pad2(num) {
		return num < 10 ? '0' + num : num;
	},
	fix(txt) {
		if(this.disabled || (!this.genDateTime && !this.getRPattern(txt))) {
			return txt;
		}
		return txt.replace(new RegExp(this.regex, 'g'), (str, ...args) => {
			var second, minute, hour, day, month, year;
			for(var i = 0; i < 7; ++i) {
				var a = args[i];
				switch(this.pattern[i]) {
				case 's': second = a; break;
				case 'i': minute = a; break;
				case 'h': hour = a; break;
				case 'd': day = a; break;
				case 'n': month = a - 1; break;
				case 'y': year = a; break;
				case 'm':
					switch(a.slice(0, 3).toLowerCase()) {
					case 'янв': case 'jan': month = 0; break;
					case 'фев': case 'feb': month = 1; break;
					case 'мар': case 'mar': month = 2; break;
					case 'апр': case 'apr': month = 3; break;
					case 'май': case 'мая': case 'may': month = 4; break;
					case 'июн': case 'jun': month = 5; break;
					case 'июл': case 'jul': month = 6; break;
					case 'авг': case 'aug': month = 7; break;
					case 'сен': case 'sep': month = 8; break;
					case 'окт': case 'oct': month = 9; break;
					case 'ноя': case 'nov': month = 10; break;
					case 'дек': case 'dec': month = 11; break;
					default: month = 0; break;
					}
				}
			}
			var dtime = new Date(year.length === 2 ? '20' + year : year, month, day, hour, minute, second || 0);
			dtime.setHours(dtime.getHours() + this.diff);
			return this.genDateTime(dtime);
		});
	}
};


// PLAYER
// ===========================================================================================================

function Videos(post, player = null, playerInfo = null) {
	this.post = post;
	this.vData = [[], []];
	if(player && playerInfo) {
		Object.defineProperties(this, {
			player: { value: player },
			playerInfo: { writable: true, value: playerInfo }
		});
	}
}
Videos._global = {
	get vData() {
		var val;
		try {
			val = Cfg.YTubeTitles ? JSON.parse(sesStorage['de-videos-data1'] || '[{}, {}]') : [{}, {}];
		} catch(e) {
			val = [{}, {}];
		}
		Object.defineProperty(this, 'vData', { value: val });
		return val;
	}
};
Videos.ytReg = /^https?:\/\/(?:www\.|m\.)?youtu(?:be\.com\/(?:watch\?.*?v=|v\/|embed\/)|\.be\/)([a-zA-Z0-9-_]+).*?(?:t(?:ime)?=(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?)?$/;
Videos.vimReg = /^https?:\/\/(?:www\.)?vimeo\.com\/(?:[^\?]+\?clip_id=|.*?\/)?(\d+).*?(#t=\d+)?$/;
Videos.addPlayer = function(el, m, isYtube, enableJsapi = false) {
	var txt;
	if(isYtube) {
		var list = m[0].match(/list=[^&#]+/);
		txt = '<iframe class="de-video-player" src="https://www.youtube.com/embed/' + m[1] +
			'?start=' + ((m[2] ? m[2] * 3600 : 0) + (m[3] ? m[3] * 60 : 0) + (m[4] ? +m[4] : 0)) +
			(enableJsapi ? '&enablejsapi=1' : Cfg.addYouTube === 3 ? '&autoplay=1' : '') +
			(list ? '&' + list[0] : '') + (Cfg.YTubeType === 1 ? '&html5=1" type="text/html"' :
				'" type="application/x-shockwave-flash"') + ' frameborder="0" allowfullscreen="1"></iframe>';
	} else {
		var id = m[1] + (m[2] ? m[2] : '');
		txt = Cfg.YTubeType === 1 ?
			'<iframe class="de-video-player" src="' + aib.prot + '//player.vimeo.com/video/' + id +
				(Cfg.addYouTube === 3 ? '?autoplay=1' : '') + '" frameborder="0" ' +
				'webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' :
			'<embed class="de-video-player" type="application/x-shockwave-flash" src="' + aib.prot +
				'//vimeo.com/moogaloop.swf' + '?clip_id=' + id + (Cfg.addYouTube === 3 ? '&autoplay=1' : '') +
				'&server=vimeo.com&color=00adef&fullscreen=1" ' +
				'allowscriptaccess="always" allowfullscreen="true"></embed>';
	}
	el.innerHTML = txt + (enableJsapi ? '' :
		'<span class="de-video-resizer" title="' + Lng.expandVideo[lang] + '"></span>');
	if(!enableJsapi) {
		el.lastChild.onclick = function() {
			var node = this.parentNode;
			node.className = node.className === 'de-video-obj' ?
				'de-video-obj de-video-expanded' : 'de-video-obj';
		};
	}
};
Videos._titlesLoaderHelper = function([link, isYtube, videoObj, id], num, ...data) {
	if(data.length !== 0) {
		var [title, author, views, publ] = data;
		link.textContent = title;
		link.setAttribute('de-author', author);
		link.classList.add('de-video-title');
		link.title = Lng.author[lang] + author +
			(views ? ', ' + Lng.views[lang] + views : '') +
			(publ ? ', ' + Lng.published[lang] + publ : '');
		Videos._global.vData[isYtube ? 0 : 1][id] = data;
		videoObj.vData[isYtube ? 0 : 1].push(data);
		if(videoObj.titleLoadFn) {
			videoObj.titleLoadFn(data);
		}
	}
	videoObj.loadedLinksCount++;
	if(num % 30 === 0) {
		return Promise.reject(new TasksPool.PauseError(3e3));
	}
	return sleep(250);
};
Videos._getYTInfoAPI = function(info, num, id) {
	return $ajax('https://www.googleapis.com/youtube/v3/videos?key=' + Cfg.ytApiKey + '&id=' + id +
	             '&part=snippet,statistics&fields=items/snippet/title,items/snippet/publishedAt,items/snippet/channelTitle,items/statistics/viewCount',
	             null, false).then(xhr => {
		var items = JSON.parse(xhr.responseText).items[0];
		return Videos._titlesLoaderHelper(info, num,
		                                  items.snippet.title,
		                                  items.snippet.channelTitle,
		                                  items.statistics.viewCount,
		                                  items.snippet.publishedAt.substr(0, 10));
	}).catch(() => Videos._getYTInfoOembed(info, num, id));
};
Videos._getYTInfoOembed = function(info, num, id) {
	return $ajax('http://www.youtube.com/oembed?url=http%3A//youtube.com/watch%3Fv%3D' + id + '&format=json',
	             null, false).then(xhr => {
		var json = JSON.parse(xhr.responseText);
		return Videos._titlesLoaderHelper(info, num,
		                                  json.title,
		                                  json.author_name,
		                                  null,
		                                  null);
	}).catch(() => Videos._titlesLoaderHelper(info, num));
};
Videos._getTitlesLoader = function() {
	return Cfg.YTubeTitles && new TasksPool(4, function(num, info) {
		var [, isYtube,, id] = info;
		if(isYtube) {
			return Cfg.ytApiKey ? Videos._getYTInfoAPI(info, num, id) : Videos._getYTInfoOembed(info, num, id);
		}
		return $ajax(aib.prot + '//vimeo.com/api/v2/video/' + id + '.json', null, false).then(xhr => {
			var entry = JSON.parse(xhr.responseText)[0];
			return Videos._titlesLoaderHelper(info, num,
			                                  entry["title"],
			                                  entry["user_name"],
			                                  entry["stats_number_of_plays"],
			                                  (/(.*)\s(.*)?/.exec(entry["upload_date"]))[1]);
		}).catch(() => Videos._titlesLoaderHelper(info, num));
	}, () => {
		sesStorage['de-videos-data1'] = JSON.stringify(Videos._global.vData);
	});
};
Videos.prototype = {
	currentLink: null,
	hasLinks: false,
	playerInfo: null,
	titleLoadFn: null,
	linksCount: 0,
	loadedLinksCount: 0,
	get player() {
		var val = aib.insertYtPlayer(this.post.msg, '<div class="de-video-obj"></div>');
		Object.defineProperty(this, 'player', { value: val });
		return val;
	},
	addLink(m, loader, link, isYtube) {
		var time, dataObj;
		this.hasLinks = true;
		this.linksCount++;
		if(this.playerInfo === null) {
			if(Cfg.addYouTube === 2) {
				this.addPlayer(m, isYtube);
			} else if(Cfg.addYouTube > 2) {
				this._addThumb(m, isYtube);
			}
		} else if(!link && $q('.de-video-link[href*="' + m[1] + '"]', this.post.msg)) {
			return;
		}
		if(loader && (dataObj = Videos._global.vData[isYtube ? 0 : 1][m[1]])) {
			this.vData[isYtube ? 0 : 1].push(dataObj);
		}
		if(m[4] || m[3] || m[2]) {
			if(m[4] >= 60) {
				m[3] = (m[3] || 0) + Math.floor(m[4] / 60);
				m[4] %= 60;
			}
			if(m[3] >= 60) {
				m[2] = (m[2] || 0) + Math.floor(m[3] / 60);
				m[3] %= 60;
			}
			time = (m[2] ? m[2] + 'h' : '') + (m[3] ? m[3] + 'm' : '') + (m[4] ? m[4] + 's' : '');
		}
		if(link) {
			link.href = link.href.replace(/^http:/, 'https:');
			if(time) {
				link.setAttribute('de-time', time);
			}
			link.className = 'de-video-link ' + (isYtube ? 'de-ytube' : 'de-vimeo');
			if(dataObj) {
				link.textContent = dataObj[0];
				link.classList.add('de-video-title');
				link.setAttribute('de-author', dataObj[1]);
				link.title = Lng.author[lang] + dataObj[1] + 
					(dataObj[2] ? ', ' + Lng.views[lang] + dataObj[2] : '') +
					(dataObj[3] ? ', ' + Lng.published[lang] + dataObj[3] : '');
			}
		} else {
			var src = isYtube ? aib.prot + '//www.youtube.com/watch?v=' + m[1] + (time ? '#t=' + time : '')
				: aib.prot + '//vimeo.com/' + m[1];
			this.post.msg.insertAdjacentHTML('beforeend',
				'<p class="de-video-ext"><a class="de-video-link ' + (isYtube ? 'de-ytube' : 'de-vimeo') +
					(dataObj ? ' de-video-title" title="' + Lng.author[lang] + dataObj[1] + ', ' +
						Lng.views[lang] + dataObj[2] + ', ' + Lng.published[lang] + dataObj[3] +
						'" de-author="' + dataObj[1] : '') + (time ? '" de-time="' + time : '') +
					'" href="' + src + '">' + (dataObj ? dataObj[0] : src) + '</a></p>');
			link = this.post.msg.lastChild.firstChild;
		}
		if(this.playerInfo === null || this.playerInfo === m) {
			this.currentLink = link;
		}
		link.videoInfo = m;
		if(loader && !dataObj) {
			loader.run([link, isYtube, this, m[1]]);
		}
	},
	addPlayer(m, isYtube) {
		this.playerInfo = m;
		Videos.addPlayer(this.player, m, isYtube);
	},
	clickLink(el, mode) {
		var m = el.videoInfo;
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
			if($c('de-video-thumb', this.player)) {
				el.classList.add('de-current');
				this.addPlayer(m, el.classList.contains('de-ytube'));
			} else {
				el.classList.remove('de-current');
				this._addThumb(m, el.classList.contains('de-ytube'));
			}
		} else {
			el.classList.remove('de-current');
			this.player.innerHTML = '';
			this.playerInfo = null;
		}
	},
	updatePost(oldLinks, newLinks, cloned) {
		var loader = !cloned && Videos._getTitlesLoader();
		for(var i = 0, j = 0, len = newLinks.length; i < len; ++i) {
			var el = newLinks[i],
				link = oldLinks[j];
			if(link && link.classList.contains('de-current')) {
				this.currentLink = el;
			}
			if(cloned) {
				el.videoInfo = link.videoInfo;
				j++;
			} else {
				var m = el.href.match(Videos.ytReg);
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
	},

	_addThumb(m, isYtube) {
		var el = this.player;
		this.playerInfo = m;
		if(isYtube) {
			el.innerHTML = '<a class="de-video-player" href="' +
				aib.prot + '//www.youtube.com/watch?v=' + m[1] + '" target="_blank">' +
				'<img class="de-video-thumb de-ytube" src="https://i.ytimg.com/vi/' + m[1] + '/0.jpg"></a>';
			return;
		}
		el.innerHTML = '<a class="de-video-player" href="' + aib.prot + '//vimeo.com/' + m[1] +
			'" target="_blank"><img class="de-video-thumb de-vimeo" src=""></a>';
		$ajax(aib.prot + '//vimeo.com/api/v2/video/' + m[1] + '.json', null, false).then(xhr => {
			try {
				el.firstChild.firstChild.setAttribute('src', JSON.parse(xhr.responseText)[0].thumbnail_large);
			} catch(e) {}
		});
	}
};

function VideosParser() {
	this._loader = Videos._getTitlesLoader();
}
VideosParser.prototype = {
	end() {
		if(this._loader) {
			this._loader.complete();
		}
	},
	parse(post = null) {
		var loader = this._loader,
			vids = aib.fixVideo(post),
			links = $Q('a[href*="youtu"]', post ? post.el : dForm.el);
		for(var i = 0, len = links.length; i < len; ++i) {
			var link = links[i],
				m = link.href.match(Videos.ytReg);
			if(m) {
				var mPost = post || (aib.getPostEl(link) || {}).post;
				if(mPost) {
					mPost.videos.addLink(m, loader, link, true);
				}
			}
		}
		if(Cfg.addVimeo) {
			links = $Q('a[href*="vimeo.com"]', post ? post.el : dForm.el);
			for(var i = 0, len = links.length; i < len; ++i) {
				var link = links[i],
					m = link.href.match(Videos.vimReg);
				if(m) {
					var mPost = post || (aib.getPostEl(link) || {}).post;
					if(mPost) {
						mPost.videos.addLink(m, loader, link, false);
					}
				}
			}
		}
		for(var i = 0, len = vids.length; i < len; ++i) {
			var [pst, m, isYtube] = vids[i];
			if(pst) {
				pst.videos.addLink(m, loader, null, isYtube);
			}
		}
		return this;
	}
};

function embedMediaLinks(post) {
	if(Cfg.addMP3) {
		var els = $Q('a[href*=".mp3"]', post ? post.el : dForm.el);
		for(var i = 0, len = els.length; i < len; ++i) {
			var link = els[i];
			if(link.target !== '_blank' && link.rel !== 'nofollow') {
				continue;
			}
			var src = link.href,
				el = (post || aib.getPostEl(link).post).mp3Obj;
			if(nav.canPlayMP3) {
				if(!$q('audio[src="' + src + '"]', el)) {
					el.insertAdjacentHTML('beforeend',
						'<p><audio src="' + src + '" preload="none" controls></audio></p>');
				}
			} else if(!$q('object[FlashVars*="' + src + '"]', el)) {
				el.insertAdjacentHTML('beforeend', '<object data="http://junglebook2007.narod.ru/audio/player.swf" type="application/x-shockwave-flash" wmode="transparent" width="220" height="16" FlashVars="playerID=1&amp;bg=0x808080&amp;leftbg=0xB3B3B3&amp;lefticon=0x000000&amp;rightbg=0x808080&amp;rightbghover=0x999999&amp;rightcon=0x000000&amp;righticonhover=0xffffff&amp;text=0xffffff&amp;slider=0x222222&amp;track=0xf5f5dc&amp;border=0x666666&amp;loader=0x7fc7ff&amp;loop=yes&amp;autostart=no&amp;soundFile=' + src + '"><br>');
			}
		}
	}
	if(Cfg.addVocaroo) {
		var els = $Q('a[href*="vocaroo.com"]', post ? post.el : dForm.el);
		for(var i = 0, len = els.length; i < len; ++i) {
			var link = els[i],
				src = link.href.split('\/').pop(),
				el = link.previousSibling;
			if(!el || el.className !== 'de-vocaroo') {
				link.insertAdjacentHTML('beforebegin', '<div class="de-vocaroo"><embed' +
					' width="148" height="44" wmode="transparent" type="application/x-shockwave-flash"' +
					' src="http://vocaroo.com/player.swf?playMediaID=' + src + '"></div>');
			}
		}
	}
}


// AJAX
// ===========================================================================================================

function AjaxError(code, message) {
	this.name = 'AjaxError';
	this.code = code;
	this.message = message;
}
AjaxError.Success = new AjaxError(200, '');

function ajaxLoad(url, returnForm = true, useCache = false) {
	return $ajax(url, { useCache: useCache }).then(xhr => {
		var el, text = xhr.responseText;
		if((aib.futa ? /<!--gz-->$/ : /<\/html?>[\s\n\r]*$/).test(text)) {
			el = returnForm ? $q(aib.qDForm, $DOM(text)) : $DOM(text);
		}
		return el ? el : CancelablePromise.reject(new AjaxError(0, Lng.errCorruptData[lang]));
	}, xhr => xhr.status === 304 ? null : CancelablePromise.reject(new AjaxError(xhr.status, xhr.statusText)));
}

function getJsonPosts(url) {
	return $ajax(url, { useCache: true }).then(xhr => JSON.parse(xhr.responseText), xhr => {
		return xhr.status === 304 ? null : CancelablePromise.reject(new AjaxError(xhr.status, xhr.statusText))
	});
}

var loadPages = async(function* (count) {
	var hasError = false;
	$popup(Lng.loading[lang], 'load-pages', true);
	Pview.clearCache();
	isExpImg = false;
	pByNum = Object.create(null);
	Post.hiddenNums = [];
	if(Attachment.viewer) {
		Attachment.viewer.close(null);
		Attachment.viewer = null;
	}
	dForm.hide();
	dForm.clear();
	if(pr.isQuick) {
		if(pr.file) {
			pr.delFilesUtils();
		}
		pr.txta.value = '';
	}
	for(var i = aib.page, len = Math.min(aib.lastPage + 1, aib.page + count); i < len; ++i) {
		var content;
		try {
			content = replacePost(yield ajaxLoad(aib.getPageUrl(aib.b, i)));
		} catch(e) {
			content = $add('<div><center style="font-size: 2em">' +
			               getErrorMessage(e) + '</center><hr></div>');
		}
		if(i != aib.page) {
			dForm.el.insertAdjacentHTML('beforeend', '<center style="font-size: 2em">' +
				Lng.page[lang] + ' ' + i + '</center><hr>');
		}
		try {
			dForm.addFormContent(content, true);
		} catch (e) {
			$popup(getPrettyErrorMessage(e), 'load-pages', true);
			hasError = true;
			break;
		}
	}
	if(!hasError) {
		dForm.initAjax();
		addDelformStuff();
		yield* readUserPosts();
		yield* readFavoritesPosts();
		$each($Q('input[type="password"]', dForm.el), function(pEl) {
			pr.dpass = pEl;
			pEl.value = Cfg.passwValue;
		});
		if(hKeys) {
			hKeys.clear(aib.page + count - 1);
		}
		closePopup('load-pages');
	}
	dForm.show();
});

function infoLoadErrors(e, showError = true) {
	var isAjax = e instanceof AjaxError,
		eCode = isAjax ? e.code : 0;
	if(eCode === 200) {
		closePopup('newposts');
	} else if(isAjax && eCode === 0) {
		$popup(e.message || Lng.noConnect[lang], 'newposts', false);
	} else {
		$popup(Lng.thrNotFound[lang] + aib.t + '): \n' + getErrorMessage(e), 'newposts', false);
		if(showError) {
			doc.title = '{' + eCode + '} ' + doc.title;
		}
	}
}


// SPELLS
// ===========================================================================================================

function Spells(read) {
	if(read) {
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
Spells.decompileSpell = function(type, neg, val, scope, wipeMsg = null) {
	var spell = (neg ? '!#' : '#') + Spells.names[type] + (scope ? '[' +
		scope[0] + (scope[1] ? ',' + (scope[1] === -1 ? '' : scope[1]) : '') + ']' : '');
	if(!val) {
		return spell;
	}
	// #img
	if(type === 8) {
		return spell + '(' + (val[0] === 2 ? '>' : val[0] === 1 ? '<' : '=') +
			(val[1] ? val[1][0] + (val[1][1] === val[1][0] ? '' : '-' + val[1][1]) : '') +
			(val[2] ? '@' + val[2][0] + (val[2][0] === val[2][1] ? '' : '-' + val[2][1]) + 'x' +
			val[2][2] + (val[2][2] === val[2][3] ? '' : '-' + val[2][3]) : '') + ')';
	}
	// #wipe
	else if(type === 14) {
		if(val === 0x3F && !wipeMsg) {
			return spell;
		}
		var [msgBit, msgData] = wipeMsg || [],
			names = [],
			bits = {1: 'samelines',2: 'samewords', 4: 'longwords', 8: 'symbols',
			        16: 'capslock', 32: 'numbers', 64: 'whitespace'
			};
		for(var bit in bits) {
			if(+bit !== msgBit) {
				if(val & +bit) {
					names.push(bits[bit]);
				}
			}
		}
		if(msgBit) {
			names.push(bits[msgBit].toUpperCase() + (msgData ? ': ' + msgData : ''));
		}
		return spell + '(' + names.join(',') + ')';
	}
	// #num, #tlen
	else if(type === 15 || type === 11) {
		var temp_, temp = val[1].length - 1;
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
	// #words, #name, #trip, #vauthor
	else if(type === 0 || type === 6 || type === 7 || type === 16) {
		return spell + '(' + val.replace(/\)/g, '\\)') + ')';
	} else {
		return spell + '(' + String(val) + ')';
	}
};
Spells.prototype = {
	_optimizeSpells(spells) {
		var neg, lastSpell = -1,
			newSpells = [];
		for(var i = 0, len = spells.length; i < len; ++i) {
			var j, spell = spells[i],
				flags = spell[0],
				type = flags & 0xFF;
			neg = (flags & 0x100) !== 0;
			if(type === 0xFF) {
				var parensSpells = this._optimizeSpells(spell[1]);
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
				var scope = spell[2];
				if(!scope || (scope[0] === aib.b &&
				   (scope[1] === -1 ? !aib.t : (!scope[1] || scope[1] === aib.t))))
				{
					if(type === 12) {
						neg = !neg;
					} else {
						newSpells.push([flags, spell[1]]);
						lastSpell++;
						continue;
					}
				}
			}
			for(j = lastSpell; j >= 0 && (((newSpells[j][0] & 0x200) !== 0) ^ neg); --j) {}
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
	_initSpells(data) {
		if(data) {
			data.forEach(function initExps(item) {
				var val = item[1];
				if(val) {
					switch(item[0] & 0xFF) {
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
	_decompileScope(scope, indent) {
		var dScope = [],
			hScope = false;
		for(var i = 0, j = 0, len = scope.length; i < len; i++, j++) {
			var spell = scope[i],
				type = spell[0] & 0xFF;
			if(type === 0xFF) {
				hScope = true;
				var temp = this._decompileScope(spell[1], indent + '    ');
				if(temp[1]) {
					var str = ((spell[0] & 0x100) ? '!(\n' : '(\n') + indent + '    ' +
						temp[0].join('\n' + indent + '    ') + '\n' + indent + ')';
					if(j === 0) {
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
			if(i !== len - 1) {
				dScope[j] += (spell[0] & 0x200) ? ' &' : ' |';
			}
		}
		return [dScope, dScope.length > 2 || hScope];
	},
	_decompileSpells() {
		var str, reps, oreps, data = this._data;
		if(!data) {
			this._read(false);
			data = this._data;
			if(!data) {
				return (this._list = '');
			}
		}
		str = data[1] ? this._decompileScope(data[1], '')[0].join('\n') : '';
		reps = data[2];
		oreps = data[3];
		if(reps || oreps) {
			if(str) {
				str += '\n\n';
			}
			if(reps) {
				reps.forEach(rep => {
					str += this._decompileRep(rep, false) + '\n';
				});
			}
			if(oreps) {
				oreps.forEach(orep => {
					str += this._decompileRep(orep, true) + '\n';
				});
			}
			str = str.substr(0, str.length - 1);
		}
		this._data = null;
		return (this._list = str);
	},
	_decompileRep(rep, isOrep) {
		return (isOrep ? '#outrep' : '#rep') +
			(rep[0] ? '[' + rep[0] + (rep[1] ? ',' + (rep[1] === -1 ? '' : rep[1]) : '') + ']' : '') +
			'(' + rep[2] + ',' + rep[3].replace(/\)/g, '\\)') + ')';
	},
	_optimizeReps(data) {
		if(!data) {
			return false;
		}
		var nData = [];
		data.forEach(function(temp) {
			if(!temp[0] || (temp[0] === aib.b && (temp[1] === -1 ? !aib.t : !temp[1] || temp[1] === aib.t))) {
				nData.push([temp[2], temp[3]]);
			}
		});
		return !nData.length ? false : nData;
	},
	_initReps(data) {
		if(data) {
			for(var i = data.length - 1; i >= 0; i--) {
				data[i][0] = toRegExp(data[i][0], false);
			}
		}
		return data;
	},
	_init(spells, reps, outreps) {
		this._spells = this._initSpells(spells);
		this._reps = this._initReps(reps);
		this._outreps = this._initReps(outreps);
		this.enable = !!this._spells;
		this.haveReps = !!reps;
		this.haveOutreps = !!outreps;
	},
	_read(init) {
		var spells, data;
		try {
			spells = JSON.parse(Cfg.spells);
			data = JSON.parse(sesStorage['de-spells-' + aib.b + (aib.t || '')]);
		} catch(e) {}
		if(data && spells && data[0] === spells[0]) {
			this._data = spells;
			if(init) {
				this.hash = data[0];
				this._init(data[1], data[2], data[3]);
			}
			return;
		}
		if(!spells) {
			spells = this.parseText('#wipe(samelines,samewords,longwords,symbols,numbers,whitespace)');
		}
		if(init) {
			this.update(spells, false, false);
		} else {
			this._data = spells;
		}
	},
	_data: null,
	_list: '',

	hash: 0,
	hasNumSpell: false,
	enable: false,
	get list() {
		return this._list || this._decompileSpells();
	},
	parseText(str) {
		var codeGen = new SpellsCodegen(str),
			data = codeGen.generate();
		if(codeGen.hasError) {
			$popup(Lng.error[lang] + ': ' + codeGen.error, 'err-spell', false);
		} else if(data) {
			if(data[0] && Cfg.sortSpells) {
				this.sort(data[0]);
			}
			return [Date.now(), data[0], data[1], data[2]];
		}
		return null;
	},
	sort(sp) {
		// Wraps AND-spells with brackets for proper sorting
		for(var i = 0, len = sp.length-1; i < len; i++) {
			if(sp[i][0] > 0x200) {
				var temp = [0xFF, []];
				do {
					temp[1].push(sp.splice(i, 1)[0]);
					len--;
				} while(sp[i][0] > 0x200);
				temp[1].push(sp.splice(i, 1)[0]);
				sp.splice(i, 0, temp);
			}
		}
		sp = sp.sort();
		for(var i = 0, len = sp.length - 1; i < len; i++) {
			// Removes duplicates and weaker spells
			if(sp[i][0] === sp[i+1][0] && sp[i][1] <= sp[i+1][1] && sp[i][1] >= sp[i+1][1] &&
			  (sp[i][2] === null || // Stronger spell with 3 parameters
			   sp[i][2] === undefined || // Equal spells with 2 parameters
			  (sp[i][2] <= sp[i+1][2] && sp[i][2] >= sp[i+1][2])))
			{ // Equal spells with 3 parameters
				sp.splice(i+1, 1);
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
	update(data, sync, isHide) {
		var spells = data[1] ? this._optimizeSpells(data[1]) : false,
			reps = this._optimizeReps(data[2]),
			outreps = this._optimizeReps(data[3]);
		saveCfg('spells', JSON.stringify(data));
		sesStorage['de-spells-' + aib.b + (aib.t || '')] = JSON.stringify([data[0], spells, reps, outreps]);
		this._data = data;
		this._list = '';
		this.hash = data[0];
		if(sync) {
			locStorage['__de-spells'] = JSON.stringify({
				'hide': (!!this.list && !!isHide),
				'data': data
			});
			locStorage.removeItem('__de-spells');
		}
		this._init(spells, reps, outreps);
	},
	setSpells(spells, sync) {
		this.update(spells, sync, Cfg.hideBySpell);
		if(Cfg.hideBySpell) {
			var sRunner = new SpellsRunner();
			for(var post = dForm.firstThr.op; post; post = post.next) {
				sRunner.run(post);
			}
			sRunner.end();
		} else {
			this.enable = false;
		}
	},
	disable(sync) {
		this.enable = false;
		this._list = '';
		this._data = null;
		this.haveReps = this.haveOutreps = false;
		saveCfg('hideBySpell', false);
	},
	replace(txt) {
		for(var i = 0, len = this._reps.length; i < len; i++) {
			txt = txt.replace(this._reps[i][0], this._reps[i][1]);
		}
		return txt;
	},
	outReplace(txt) {
		for(var i = 0, len = this._outreps.length; i < len; i++) {
			txt = txt.replace(this._outreps[i][0], this._outreps[i][1]);
		}
		return txt;
	},
	addSpell(type, arg, scope, isNeg, spells) {
		if(!spells) {
			if(!this._data) {
				this._read(false);
			}
			spells = this._data || [Date.now(), [], false, false];
		}
		var idx, sScope = String(scope),
			sArg = String(arg);
		if(spells[1]) {
			spells[1].some(scope && isNeg ? function(spell, i) {
				var data;
				if(spell[0] === 0xFF && ((data = spell[1]) instanceof Array) && data.length === 2 &&
				   data[0][0] === 0x20C && data[1][0] === type && data[1][2] == null &&
				   String(data[1][1]) === sArg && String(data[0][2]) === sScope)
				{
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
		if(typeof idx !== 'undefined') {
			spells[1].splice(idx, 1);
		} else if(scope && isNeg) {
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

	generate() {
		return this._sList ? this._generate(this._sList, false) : null;
	},
	get error() {
		if(!this.hasError) {
			return '';
		}
		return (this._errMsgArg ? this._errMsg.replace('%s', this._errMsgArg) : this._errMsg) +
			Lng.seRow[lang] + this._line + Lng.seCol[lang] + this._col + ')';
	},

	_errMsg: '',
	_errMsgArg: null,
	_generate(sList, inParens) {
		var spells = [],
			reps = [],
			outreps = [],
			lastType = this.TYPE_UNKNOWN,
			hasReps = false;
		for(var i = 0, len = sList.length; i < len; i++, this._col++) {
			var res;
			switch(sList[i]) {
			case '\n':
				this._line++;
				this._col = 0;
				/* falls through */
			case '\r':
			case ' ': continue;
			case '#':
				var name = '';
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
					if(name === 'rep') {
						reps.push(res[1]);
					} else {
						outreps.push(res[1]);
					}
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
					spells.push(res[1]);
					lastType = this.TYPE_SPELL;
				}
				break;
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
				spells.push([lastType === this.TYPE_NOT ? 0x1FF : 0xFF, res[1]]);
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
					spells[spells.length - 1][0] |= 0x200;
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
					return [i, spells];
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
		   lastType !== this.TYPE_REPLACER)
		{
			this._setError(Lng.seMissSpell[lang], null);
			return null;
		}
		if(!reps.length) {
			reps = false;
		}
		if(!outreps.length) {
			outreps = false;
		}
		return [spells, reps, outreps];
	},
	_getScope(str) {
		var m = str.match(/^\[([a-z0-9\/]+)(?:(,)|,(\s*[0-9]+))?\]/);
		if(m) {
			return [m[0].length, [m[1], m[3] ? m[3] : m[2] ? -1 : false]];
		}
		return null;
	},
	_getRegex(str, haveComma) {
		var val, m = str.match(/^\((\/.*?[^\\]\/[igm]*)(?:\)|\s*(,))/);
		if(!m) {
			return null;
		}
		if(haveComma !== !!m[2]) {
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
	},
	_getText(str, haveBracket) {
		var m = str.match(/^(\()?(.*?[^\\])\)/);
		if(!m) {
			return null;
		}
		if(haveBracket !== !!m[1]) {
			return null;
		}
		return [m[0].length, m[2].replace(/\\\)/g, ')')];
	},
	_doRep(name, str) {
		var regex, scope = this._getScope(str);
		if(scope) {
			str = str.substring(scope[0]);
		} else {
			scope = [0, ['', '']];
		}
		regex = this._getRegex(str, true);
		if(regex) {
			str = str.substring(regex[0]);
			if(str[0] === ')') {
				return [regex[0] + scope[0] + 1, [scope[1][0], scope[1][1], regex[1], '']];
			}
			var val = this._getText(str, false);
			if(val) {
				return [val[0] + regex[0] + scope[0], [scope[1][0], scope[1][1], regex[1], val[1]]];
			}
		}
		this._setError(Lng.seSyntaxErr[lang], name);
		return null;
	},
	_doSpell(name, str, isNeg) {
		var m, spellType, val, temp, i = 0,
			scope = null,
			spellIdx = Spells.names.indexOf(name);
		if(spellIdx === -1) {
			this._setError(Lng.seUnknown[lang], name);
			return null;
		}
		temp = this._getScope(str);
		if(temp) {
			i += temp[0];
			str = str.substring(temp[0]);
			scope = temp[1];
		}
		spellType = isNeg ? spellIdx | 0x100 : spellIdx;
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
			if(temp) {
				return [i + temp[0], [spellType, temp[1], scope]];
			}
			break;
		// #sage, #op, #all, #trip, #name, #words, #vauthor
		default:
			temp = this._getText(str, true);
			if(temp) {
				return [i + temp[0], [spellType, spellIdx === 0 ? temp[1].toLowerCase() : temp[1], scope]];
			}
		}
		this._setError(Lng.seSyntaxErr[lang], name);
		return null;
	},
	_setError(msg, arg) {
		this.hasError = true;
		this._errMsg = msg;
		this._errMsgArg = arg;
	}
};

function SpellsRunner() {
	this._spells = spells._spells;
	if(!this._spells) {
		this.run = () => 0;
	}
}
SpellsRunner.prototype = {
	hasNumSpell: false,
	end() {
		if(this._endPromise) {
			this._endPromise.then(() => this._savePostsHelper());
		} else {
			this._savePostsHelper();
		}
	},
	run(post) {
		var interp = new SpellsInterpreter(post, this._spells);
		var res = interp.run();
		if(res instanceof Promise) {
			res = res.then(val => this._checkRes(post, val));
			this._endPromise = this._endPromise ? this._endPromise.then(() => res) : res;
			return 0;
		}
		return this._checkRes(post, res);
	},

	_endPromise: null,
	_checkRes(post, [hasNumSpell, val, msg]) {
		this.hasNumSpell |= hasNumSpell;
		if(val) {
			post.spellHide(msg);
			return 1;
		}
		if(!post.deleted) {
			sVis[post.count] = 1;
		}
		return 0;
	},
	_savePostsHelper() {
		if(this._spells) {
			if(aib.t) {
				var lPost = dForm.firstThr.lastNotDeleted;
				sesStorage['de-hidden-' + aib.b + aib.t] = (Cfg.hideBySpell ? spells.hash : '0') +
					';' + lPost.num + ';' + lPost.count + ';' + sVis.join();
			}
			saveHiddenThreads(false);
			toggleWindow('hid', true);
		}
		ImagesHashStorage.endFn();
	}
};

function SpellsInterpreter(post, spells) {
	this._post = post;
	this._ctx = [spells.length, spells, 0, false];
	this._lastTSpells = [];
	this._triggeredSpellsStack = [this._lastTSpells];
	this._deep = 0;
}
SpellsInterpreter.prototype = {
	hasNumSpell: false,
	run() {
		var rv, stopCheck, isNegScope = this._ctx.pop(),
			i = this._ctx.pop(),
			scope = this._ctx.pop(),
			len = this._ctx.pop();
		while(true) {
			if(i < len) {
				var type = scope[i][0] & 0xFF;
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
				var val = this._runSpell(type, scope[i][1]);
				if(val instanceof Promise) {
					this._ctx.push(len, scope, ++i, isNegScope);
					return val.then(this._asyncContinue.bind(this));
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
	},

	_wipeMsg: null,
	_asyncContinue(val) {
		var cl = this._ctx.length;
		var spell = this._ctx[cl - 3][this._ctx[cl - 2] - 1];
		var [rv, stopCheck] = this._checkRes(spell, val, this._ctx[cl - 1]);
		return stopCheck ? [this.hasNumSpell, rv, rv ? this._getMsg() : null]
		                 : this.run();
	},
	_checkRes(spell, val, isNegScope) {
		var flags = spell[0];
		var isAndSpell = ((flags & 0x200) !== 0) ^ isNegScope;
		var isNegSpell = ((flags & 0x100) !== 0) ^ isNegScope;
		if(isNegSpell ^ val) {
			this._lastTSpells.push([isNegSpell, spell, (spell[0] & 0xFF) === 14 ? this._wipeMsg : null]);
			return [true, !isAndSpell];
		}
		this._lastTSpells.length = 0;
		return [false, isAndSpell];
	},
	_getMsg() {
		var rv = [];
		for(var spellEls of this._triggeredSpellsStack) {
			for(var [isNeg, spell, wipeMsg] of spellEls) {
				rv.push(Spells.decompileSpell(spell[0] & 0xFF, isNeg, spell[1], spell[2], wipeMsg));
			}
		}
		return rv.join(' & ');
	},
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
	},
	_words(val) {
		return this._post.text.toLowerCase().includes(val) || this._post.subj.toLowerCase().includes(val);
	},
	_exp(val) {
		return val.test(this._post.text);
	},
	_exph(val) {
		return val.test(this._post.html);
	},
	_imgn(val) {
		for(var image of this._post.images.data) {
			if((image instanceof Attachment) && val.test(image.info)) {
				return true;
			}
		}
		return false;
	},
	_ihash: async(function* (val) {
		for(var image of this._post.images.data) {
			if(!(image instanceof Attachment)) {
				continue;
			}
			var hash = yield* ImagesHashStorage.getHash(image);
			if(hash === val) {
				return true;
			}
		}
		return false;
	}),
	_subj(val) {
		var pSubj = this._post.subj;
		return pSubj ? !val || val.test(pSubj) : false;
	},
	_name(val) {
		var pName = this._post.posterName;
		return pName ? !val || pName.includes(val) : false;
	},
	_trip(val) {
		var pTrip = this._post.posterTrip;
		return pTrip ? !val || pTrip.includes(val) : false;
	},
	_img(val) {
		var hide, images = this._post.images,
			[compareRule, weightVals, sizeVals] = val;
		if(!val) {
			return images.hasAttachments;
		}
		for(var image of images.data) {
			if(!(image instanceof Attachment)) {
				continue;
			}
			if(weightVals) {
				var w = image.weight;
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
				var w = image.width,
					h = image.height;
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
	},
	_sage(val) {
		return this._post.sage;
	},
	_op(val) {
		return this._post.isOp;
	},
	_tlen(val) {
		var text = this._post.text.replace(/^\s+|\s+$|\s+(?=\s)|\n/g, '');
		return !val ? !!text : this._tlenNum_helper(val, text.length);
	},
	_all(val) {
		return true;
	},
	_video(val) {
		return this._videoVauthor(val, false);
	},
	_wipe(val) {
		var arr, len, x, txt = this._post.text;
		// (1 << 0): samelines
		if(val & 1) {
			arr = txt.replace(/>/g, '').split(/\s*\n\s*/);
			if((len = arr.length) > 5) {
				arr.sort();
				for(var i = 0, n = len / 4; i < len;) {
					x = arr[i];
					var j = 0;
					while(arr[i++] === x) {
						j++;
					}
					if(j > 4 && j > n && x) {
						this._wipeMsg = [1, '"' + x.substr(0, 20) + '" x' + (j + 1)];
						return true;
					}
				}
			}
		}
		// (1 << 1): samewords
		if(val & 2) {
			arr = txt.replace(/[\s\.\?\!,>]+/g, ' ').toUpperCase().split(' ');
			if((len = arr.length) > 3) {
				arr.sort();
				var keys = 0;
				for(var i = 0, n = len / 4, pop = 0; i < len; keys++) {
					x = arr[i];
					var j = 0;
					while(arr[i++] === x) {
						j++;
					}
					if(len > 25) {
						if(j > pop && x.length > 2) {
							pop = j;
						}
						if(pop >= n) {
							this._wipeMsg = [2, 'same "' + x.substr(0, 20) + '" x' + (pop + 1)];
							return true;
						}
					}
				}
				x = keys / len;
				if(x < .25) {
					this._wipeMsg = [2, 'uniq ' + (x * 100).toFixed(0) + '%'];
					return true;
				}
			}
		}
		// (1 << 2): longwords
		if(val & 4) {
			arr = txt.replace(/https*:\/\/.*?(\s|$)/g, '').replace(/[\s\.\?!,>:;-]+/g, ' ').split(' ');
			if(arr[0].length > 50 || ((len = arr.length) > 1 && arr.join('').length / len > 10)) {
				this._wipeMsg = [4, null];
				return true;
			}
		}
		// (1 << 3): symbols
		if(val & 8) {
			var _txt = txt.replace(/\s+/g, '');
			if((len = _txt.length) > 30 &&
			   (x = _txt.replace(/[0-9a-zа-я\.\?!,]/ig, '').length / len) > .4)
			{
				this._wipeMsg = [8, (x * 100).toFixed(0) + '%'];
				return true;
			}
		}
		// (1 << 4): capslock
		if(val & 16) {
			arr = txt.replace(/[\s\.\?!;,-]+/g, ' ').trim().split(' ');
			if((len = arr.length) > 4) {
				var n = 0,
					capsw = 0,
					casew = 0;
				for(var i = 0; i < len; i++) {
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
				if(capsw / n >= .3 && n > 4) {
					this._wipeMsg = [16, 'CAPS ' + capsw / arr.length * 100 + '%'];
					return true;
				} else if(casew / n >= .3 && n > 8) {
					this._wipeMsg = [16, 'cAsE ' + casew / arr.length * 100 + '%'];
					return true;
				}
			}
		}
		// (1 << 5): numbers
		if(val & 32) {
			var _txt = txt.replace(/\s+/g, ' ').replace(/>>\d+|https*:\/\/.*?(?: |$)/g, '');
			if((len = _txt.length) > 30 && (x = (len - _txt.replace(/\d/g, '').length) / len) > .4) {
				this._wipeMsg = [32, Math.round(x * 100) + '%'];
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
	},
	_num(val) {
		return this._tlenNum_helper(val, this._post.count + 1);
	},
	_tlenNum_helper(val, num) {
		var i, arr;
		for(arr = val[0], i = arr.length - 1; i >= 0; --i) {
			if(arr[i] === num) {
				return true;
			}
		}
		for(arr = val[1], i = arr.length - 1; i >= 0; --i) {
			if(num >= arr[i][0] && num <= arr[i][1]) {
				return true;
			}
		}
		return false;
	},
	_vauthor(val) {
		return this._videoVauthor(val, true);
	},
	_videoVauthor(val, isAuthorSpell) {
		var videos = this._post.videos;
		if(!val) {
			return !!videos.hasLinks;
		}
		if(!videos.hasLinks || !Cfg.YTubeTitles) {
			return false;
		}
		for(var siteData of videos.vData) {
			for(var data of siteData) {
				if(isAuthorSpell ? val === data[1] : val.test(data[0])) {
					return true;
				}
			}
		}
		if(videos.linksCount === videos.loadedLinksCount) {
			return false;
		}
		return new Promise((resolve, reject) => {
			videos.titleLoadFn = data => {
				if(isAuthorSpell ? val === data[1] : val.test(data[0])) {
					resolve(true);
				} else if(videos.linksCount === videos.loadedLinksCount) {
					resolve(false);
				} else {
					return;
				}
				videos.titleLoadFn = null;
			};
		});
	}
};

function disableSpells() {
	if(spells.enable) {
		sVis = aib.t ? '1'.repeat(dForm.firstThr.pcount).split('') : [];
		for(var post = dForm.firstThr.op; post; post = post.next) {
			if(post.spellHidden && !post.userToggled) {
				post.spellUnhide();
			}
		}
	}
	closePopup('err-spell');
}

function toggleSpells() {
	var temp, fld = $id('de-spell-txt'),
		val = fld.value;
	if(val && (temp = spells.parseText(val))) {
		disableSpells();
		spells.setSpells(temp, true);
		fld.value = spells.list;
	} else {
		if(val) {
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
	var temp, fld = $id('de-spell-txt'),
		val = fld && fld.value,
		chk = $q('input[info="hideBySpell"]', doc);
	if(!val || (temp = spells.parseText(val))) {
		disableSpells();
		spells.addSpell(type, arg, aib.t ? [aib.b, aib.t] : null, isNeg, temp);
		val = spells.list;
		saveCfg('hideBySpell', !!val);
		if(val) {
			var sRunner = new SpellsRunner();
			for(var post = dForm.firstThr.op; post; post = post.next) {
				sRunner.run(post);
			}
			sRunner.end();
		} else {
			saveCfg('spells', '');
			spells.enable = false;
		}
		if(fld) {
			chk.checked = !!(fld.value = val);
		}
		return;
	}
	spells.enable = false;
	if(chk) {
		chk.checked = false;
	}
}


// POSTFORM
// ===========================================================================================================

function PostForm(form, ignoreForm, dc) {
	this.oeForm = $q('form[name="oeform"], form[action*="paint"]', dc);
	if(!ignoreForm && !form) {
		if(this.oeForm) {
			ajaxLoad(aib.getThrdUrl(aib.b, dForm.firstThr.num), false).then(loadedDoc => {
				pr = new PostForm($q(aib.qPostForm, loadedDoc), true, loadedDoc);
			}, () => {
				pr = new PostForm(null, true, dc);
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
	this.tNum = aib.t;
	this.form = form;
	this.cap = $q('input[type="text"][name*="aptcha"], div[id*="captcha"]', form);
	this.txta = $q('tr:not([style*="none"]) textarea:not([style*="display:none"])', form);
	this.subm = $q('tr input[type="submit"]', form);
	this.file = $q('tr input[type="file"]', form);
	if(this.file) {
		this.fileTd = $parent(this.file, 'TD');
		this.spoil = $q('input[type="checkbox"][name="spoiler"]', this.fileTd);
	}
	this.passw = $q('tr input[type="password"]', form);
	this.dpass = $q('input[type="password"], input[name="password"]', dForm.el);
	this.name = $x(p + '(@name="field1" or @name="name" or @name="internal_n" or @name="nya1" or @name="akane")]', form);
	this.mail = $x(p + (
			aib._410 ? '@name="sage"]' :
			'(@name="field2" or @name="em" or @name="sage" or @name="email" or @name="nya2" or @name="nabiki" or @name="dont_bump")]'
		), form);
	this.subj = $x(p + '(@name="field3" or @name="sub" or @name="subject" or @name="internal_s" or @name="nya3" or @name="kasumi")]', form);
	this.video = $q('tr input[name="video"], tr input[name="embed"]', form);
	this.gothr = aib.qPostRedir && (p = $q(aib.qPostRedir, form)) && $parent(p, 'TR');
	this.pForm = $New('div', {'id': 'de-pform', 'class': 'de-win-body'}, [this.form, this.oeForm]);
	dForm.el.insertAdjacentHTML('beforebegin',
		'<div class="de-parea"><div>[<a href="#"></a>]</div><hr></div>');
	this.pArea[0] = dForm.el.previousSibling;
	this._pBtn[0] = this.pArea[0].firstChild;
	this._pBtn[0].firstElementChild.onclick = this.showMainReply.bind(this, false);
	var el = aib.fch ? $c('board', dForm.el) : dForm.el;
	el.insertAdjacentHTML('afterend', '<div class="de-parea"><div>[<a href="#"></a>]</div><hr></div>');
	this.pArea[1] = el.nextSibling;
	this._pBtn[1] = this.pArea[1].firstChild;
	this._pBtn[1].firstElementChild.onclick = this.showMainReply.bind(this, true);
	this.qArea = $add('<div style="display: none; ' + Cfg.replyWinX + '; ' + Cfg.replyWinY +
		'; z-index: ' + ++topWinZ + ';" id="de-win-reply" class="' + aib.cReply +
		(Cfg.replyWinDrag ? ' de-win' : ' de-win-inpost') + '"></div>');
	this.isBottom = Cfg.addPostForm === 1;
	this.setReply(false, !aib.t || Cfg.addPostForm > 1);
	el = this.qArea;
	el.insertAdjacentHTML('beforeend',
		'<div class="de-win-head">' +
			'<span class="de-win-title"></span>' +
			'<span class="de-win-buttons">' +
				'<span class="de-btn-toggle" title="' + Lng.toggleReply[lang] + '"></span>' +
				'<span class="de-btn-close" title="' + Lng.closeReply[lang] + '"></span></span></div>' +
		'<div class="de-resizer de-resizer-top"></div>' +
		'<div class="de-resizer de-resizer-left"></div>' +
		'<div class="de-resizer de-resizer-right"></div>' +
		'<div class="de-resizer de-resizer-bottom"></div>');
	el = el.firstChild;
	el.lang = getThemeLang();
	makeDraggable(this.qArea, el, 'reply');
	el = el.lastChild;
	el.firstChild.onclick = () => {
		toggleCfg('replyWinDrag');
		if(Cfg.replyWinDrag) {
			this.qArea.className = aib.cReply + ' de-win';
			updateWinZ(this.qArea.style);
		} else {
			this.qArea.className = aib.cReply + ' de-win-inpost';
			this.txta.focus();
		}
	};
	el.lastChild.onclick = this.closeReply.bind(this);
	if(aib.tire) {
		$each($Q('input[type="hidden"]', dForm.el), $del);
		dForm.el.appendChild($c('userdelete', doc.body));
		this.dpass = $q('input[type="password"]', dForm.el);
	}
	if(!this.form || !this.txta) {
		return;
	}
	new WinResizer('reply', 'top', 'textaHeight', this.qArea, this.txta);
	new WinResizer('reply', 'left', 'textaWidth', this.qArea, this.txta);
	new WinResizer('reply', 'right', 'textaWidth', this.qArea, this.txta);
	new WinResizer('reply', 'bottom', 'textaHeight', this.qArea, this.txta);
	if(!aib.kus && (aib.multiFile || !Cfg.fileThumb)) {
		this.setPlaceholders();
	}
	aib.disableRedirection(this.form);
	this.form.style.display = 'inline-block';
	this.form.style.textAlign = 'left';
	if(nav.Firefox) {
		this.txta.addEventListener('mouseup', function() {
			saveCfg('textaWidth', parseInt(this.style.width, 10));
			saveCfg('textaHeight', parseInt(this.style.height, 10));
		});
	} else {
		this.txta.insertAdjacentHTML('afterend', '<div id="de-resizer-text"></div>');
		this.txta.nextSibling.addEventListener('mousedown', {
			_el: this.txta,
			_elStyle: this.txta.style,
			handleEvent(e) {
				switch(e.type) {
				case 'mousedown':
					doc.body.addEventListener('mousemove', this);
					doc.body.addEventListener('mouseup', this);
					$pd(e);
					return;
				case 'mousemove':
					var cr = this._el.getBoundingClientRect();
					this._elStyle.width = (e.clientX - cr.left) + 'px';
					this._elStyle.height = (e.clientY - cr.top) + 'px';
					return;
				default: // mouseup
					doc.body.removeEventListener('mousemove', this);
					doc.body.removeEventListener('mouseup', this);
					saveCfg('textaWidth', parseInt(this._elStyle.width, 10));
					saveCfg('textaHeight', parseInt(this._elStyle.height, 10));
				}
			}
		}, false);
	}
	if(aib.kus) {
		while(this.subm.nextSibling) {
			$del(this.subm.nextSibling);
		}
	}
	if(!aib.iich && Cfg.addSageBtn && this.mail) {
		el = $parent(this.mail, 'LABEL') || this.mail;
		if(el.nextElementSibling || el.previousElementSibling) {
			el.style.display = 'none';
		} else {
			$parent(this.mail, 'TR').style.display = 'none';
		}
		el = $new('span', {'id': 'de-sagebtn', 'class': 'de-btn-sage'}, {'click': e => {
			e.stopPropagation();
			$pd(e);
			toggleCfg('sageReply');
			this._setSage();
		}});
		$after(this.subm, el);
		setTimeout(() => this._setSage(), 0);
		if(aib._2chru) {
			while(el.nextSibling) {
				$del(el.nextSibling);
			}
		}
	}
	this.addTextPanel();
	this.txta.classList.add('de-textarea');
	this.txta.style.cssText = 'width: ' + Cfg.textaWidth + 'px; height: ' + Cfg.textaHeight + 'px;';
	this.txta.addEventListener('keypress', function(e) {
		var code = e.charCode || e.keyCode;
		if((code === 33 || code === 34) && e.which === 0) {
			e.target.blur();
			window.focus();
		}
	});
	if(aib.dobr) {
		this.txta.removeAttribute('id');
	}
	if(!aib.tiny) {
		this.subm.value = Lng.reply[lang];
	}
	this.subm.addEventListener('click', e => {
		if(aib._2chru && !aib.reqCaptcha) {
			$ajax('/' + aib.b + '/api/requires-captcha').then(xhr => {
				aib.reqCaptcha = true;
				if(JSON.parse(xhr.responseText)['requires-captcha'] !== '1') {
					this.subm.click();
					return;
				}
				$id('captcha_tr').style.display = 'table-row';
				$id('captchaimage').src = '/' + aib.b + '/captcha?' + Math.random();
				$after(this.cap, $new('span', {
					'class': 'shortened',
					'style': 'margin: 0px .5em;',
					'text': 'проверить капчу'}, {
					'click'() {
						$ajax('/' + aib.b + '/api/validate-captcha', { method: 'POST' }).then(xhr => {
							if(JSON.parse(xhr.responseText).status === 'ok') {
								this.innerHTML = 'можно постить';
							} else {
								this.innerHTML = 'неверная капча';
								setTimeout(el => this.innerHTML = 'проверить капчу', 1e3);
							}
						}, emptyFn);
					}
				}));
			}, emptyFn);
			$pd(e);
			return;
		}
		if(Cfg.warnSubjTrip && this.subj && /#.|##./.test(this.subj.value)) {
			$pd(e);
			$popup(Lng.subjHasTrip[lang], 'upload', false);
			return;
		}
		var val = this.txta.value;
		if(spells.haveOutreps) {
			val = spells.outReplace(val);
		}
		if(this.tNum && pByNum[this.tNum].subj === 'Dollchan Extension Tools') {
			var temp = '\n\n' + this._wrapText(aib.markupBB, aib.markupTags[5],
				'-'.repeat(50) + '\n' + nav.ua + '\nv' + version + '.' + commit +
				' [' + nav.scriptInstall + ']')[1];
			if(!val.includes(temp)) {
				val += temp;
			}
		}
		this.txta.value = val;
		if(Cfg.ajaxReply) {
			$popup(Lng.checking[lang], 'upload', true);
		}
		if(this.video && (val = this.video.value) && (val = val.match(Videos.ytReg))) {
			this.video.value = 'http://www.youtube.com/watch?v=' + val[1];
		}
		if(this.isQuick) {
			this.pForm.style.display = 'none';
			this.qArea.style.display = 'none';
			$after(this._pBtn[+this.isBottom], this.pForm);
		}
		updater.pause();
	});
	if(Cfg.noGoto && this.gothr) {
		this.gothr.style.display = 'none';
	}
	if(Cfg.noPassword && this.passw) {
		$parent(this.passw, 'TR').style.display = 'none';
	}
	if(Cfg.noName && this.name) {
		$parent(this.name, 'TR').style.display = 'none';
	}
	window.addEventListener('load', () => {
		if(Cfg.userName && this.name) {
			setTimeout(PostForm.setUserName, 1e3);
		}
		if(this.passw) {
			setTimeout(PostForm.setUserPassw, 1e3);
		}
	});
	if(this.cap) {
		this.capTr = $parent(this.cap, 'TR');
		this.txta.addEventListener('focus', this._captchaInit.bind(this, this.capTr.innerHTML));
		this.form.addEventListener('click', this._captchaInit.bind(this, this.capTr.innerHTML));
		if(!aib.krau) {
			this.capTr.style.display = 'none';
		}
		if(!aib.mak && !aib.fch && !$id('recaptcha_widget_div')) {
			this.capTr.innerHTML = '';
		}
		this.cap = null;
	}
	if(Cfg.ajaxReply === 2) {
		if(aib.krau) {
			this.form.removeAttribute('onsubmit');
		}
		setTimeout(() => {
			this.form.onsubmit = e => {
				$pd(e);
				if(aib.krau) {
					aib.addProgressTrack.click();
				}
				if(aib._2chru) {
					doc.body.insertAdjacentHTML('beforeend', '<iframe class="ninja" id="csstest" src="/' +
						aib.b + '/csstest.foo"></iframe>');
					doc.body.lastChild.onload = e => {
						$del(e.target);
						spawn(html5Submit, this.form, true).then(doUploading);
					};
					return;
				}
				spawn(html5Submit, this.form, true).then(doUploading);
			};
		}, 0);
	} else if(Cfg.ajaxReply === 1) {
		this.form.target = 'de-iframe-pform';
		this.form.onsubmit = null;
	}
	el = this.file;
	if(el) {
		aib.fixFileInputs(el);
		this.eventFiles(true);
	}
}
PostForm.setUserName = function() {
	var el = $q('input[info="nameValue"]', doc);
	if(el) {
		saveCfg('nameValue', el.value);
	}
	pr.name.value = Cfg.userName ? Cfg.nameValue : '';
};
PostForm.setUserPassw = function() {
	var el = $q('input[info="passwValue"]', doc);
	if(el) {
		saveCfg('passwValue', el.value);
	}
	(pr.dpass || {}).value = pr.passw.value = Cfg.passwValue;
};
PostForm.prototype = {
	fileObj: null,
	filesCount: 0,
	isHidden: false,
	isQuick: false,
	isBottom: false,
	lastQuickPNum: -1,
	pForm: null,
	pArea: [],
	qArea: null,
	get fileArea() {
		var val;
		if(aib.multiFile) {
			val = $add('<tr><td></td><td><div id="de-file-area"></div></td></tr>');
			$after(this.fileTd.parentNode, val);
		} else {
			val = $t(aib.tiny ? 'th' : 'td', $parent(this.txta, 'TR'));
			val.innerHTML = '';
		}
		Object.defineProperty(this, 'fileArea', { value: val });
		return val;
	},
	get rarInput() {
		var val = doc.body.appendChild($new('input', {'type': 'file', 'style': 'display: none;'}, null));
		Object.defineProperty(this, 'rarInput', { value: val });
		return val;
	},
	addTextPanel() {
		var id, val, btns, html = '', tPanel = $id('de-txt-panel');
		if(!Cfg.addTextBtns) {
			$del(tPanel);
			return;
		}
		if(!tPanel) {
			tPanel = $new('span', {'id': 'de-txt-panel'}, {'click': this, 'mouseover': this});
		}
		tPanel.style.cssFloat = Cfg.txtBtnsLoc ? 'none' : 'right';
		$after(Cfg.txtBtnsLoc ? $id('de-resizer-text') || this.txta :
			aib._420 ? $c('popup', this.form) : this.subm, tPanel);
		id = ['bold', 'italic', 'under', 'strike', 'spoil', 'code', 'sup', 'sub', 'quote'],
		val = ['B', 'i', 'U', 'S', '%', 'C', 'v', '^', '&gt;']
		btns = aib.markupTags;
		for(var i = 0, len = btns.length; i < len; ++i) {
			if(btns[i] === '') {
				continue;
			}
			html += '<span id="de-btn-' + id[i] + '" de-title="' + Lng.txtBtn[i][lang] +
				'" de-tag="' + btns[i] + '">' + (
					Cfg.addTextBtns === 2 ?
						(html === '' ? '[ ' : '') + '<a class="de-abtn" href="#">' + val[i] + '</a>' +
						(i === len - 1 ? ' ]' : ' / ') :
					Cfg.addTextBtns === 3 ?
						'<button type="button" style="font-weight: bold;">' + val[i] + '</button>' : ''
				) + '</span>';
		}
		tPanel.innerHTML = html;
	},
	delFilesUtils() {
		for(var inp = this.fileObj; inp; inp = inp.next) {
			inp.delUtils();
		}
	},
	eventFiles(clear) {
		var last = null,
			els = $Q('input[type="file"]', this.fileTd);
		for(var i = 0, len = els.length; i < len; ++i) {
			var el = els[i],
				inp = el.obj;
			if(inp) {
				inp.prev = last;
				if(last) {
					last.next = inp;
				}
				last = inp;
			} else {
				el.obj = last = new FileInput(this, el, last);
				last.init(false);
				if(clear && el.files && el.files.length) {
					last.clear();
				}
			}
		}
		this.fileObj = els[0].obj;
	},
	handleEvent(e) {
		var id, el = e.target;
		if(el.tagName !== 'SPAN') {
			el = el.parentNode;
		}
		id = el.id;
		if(id.startsWith('de-btn')) {
			var x;
			if(e.type === 'mouseover') {
				if(id === 'de-btn-quote') {
					quotetxt = $txtSelect();
				}
				x = -1;
				if(hKeys) {
					switch(id.substr(7)) {
					case 'bold': x = 12; break;
					case 'italic': x = 13; break;
					case 'strike': x = 14; break;
					case 'spoil': x = 15; break;
					case 'code': x = 16;
					}
				}
				KeyEditListener.setTitle(el, x);
				return;
			}
			x = pr.txta;
			var start = x.selectionStart,
				end = x.selectionEnd,
				q = Cfg.spacedQuote ? '> ' : '>';
			if(id === 'de-btn-quote') {
				$txtInsert(x, q + (start === end ? quotetxt : x.value.substring(start, end))
					.replace(/\n/gm, '\n' + q));
				quotetxt = '';
			} else {
				var scrtop = x.scrollTop,
					val = this._wrapText(aib.markupBB, el.getAttribute('de-tag'), x.value.substring(start, end)),
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
		if(!this.isHidden && this.isBottom && $q(':focus', this.pForm)) {
			var cr = this.pForm.getBoundingClientRect();
			return cr.bottom > 0 && cr.top < doc.documentElement.clientHeight;
		}
		return false;
	},
	get topCoord() {
		return this.pForm.getBoundingClientRect().top;
	},
	showQuickReply(post, pNum, closeReply, isNumClick) {
		var temp, isThr = aib.t,
			qNum = post.tNum;
		if(!this.isQuick) {
			this.isQuick = true;
			this.setReply(true, false);
			$t('a', this._pBtn[+this.isBottom]).className =
				'de-abtn de-parea-btn-' + (isThr ? 'reply' : 'thrd');
			if(!isThr && !aib.kus && !aib.dobr && !aib.mak) {
				if(this.oeForm) {
					$del($q('input[name="oek_parent"]', this.oeForm));
					this.oeForm.insertAdjacentHTML('afterbegin',
						'<input type="hidden" value="' + qNum + '" name="oek_parent">');
				}
				if(this.form) {
					$del($q('input[name="' + aib.thrid + '"]', this.form));
					this.form.insertAdjacentHTML('afterbegin',
						'<input type="hidden" id="de_thrid" value="' + qNum + '" name="' + aib.thrid + '">');
				}
			}
		} else if(closeReply && !quotetxt && post.wrap.nextElementSibling === this.qArea) {
			this.closeReply();
			return;
		}
		$after(post.wrap, this.qArea);
		if(this.qArea.classList.contains('de-win')) {
			updateWinZ(this.qArea.style);
		}
		if(!isThr) {
			this._toggleQuickReply(qNum);
		}
		if(!this.form) {
			return;
		}
		if(this._lastCapUpdate &&
		   ((!isThr && this.tNum !== qNum) || (Date.now() - this._lastCapUpdate > 3e5)))
		{
			this.tNum = qNum;
			this.refreshCapImg(false);
		}
		this.tNum = qNum;
		if(aib._420 && this.txta.value === 'Comment') {
			this.txta.value = '';
		}
		temp = this.txta.value;
		if(!Cfg.addOPLink && !isThr && post.isOp && !isNumClick) {
			this.txta.focus();
		} else {
			$txtInsert(this.txta, (
				isNumClick ? '>>' + pNum :
					(temp !== '' && temp.slice(-1) !== '\n' ? '\n' : '') +
					(this.lastQuickPNum === pNum && temp.includes('>>' + pNum) ? '' : '>>' + pNum + '\n')) +
				(quotetxt ? quotetxt.replace(/^\n|\n$/g, '')
				.replace(/(^|\n)(.)/gm, '$1>' + (Cfg.spacedQuote ? ' ' : '') + '$2') + '\n': ''));
		}
		temp = pByNum[pNum].thr.op.title;
		if(temp.length > 27) {
			temp = temp.substr(0, 30) + '\u2026';
		}
		$c('de-win-title', this.qArea).textContent = temp || '#' + pNum;
		this.lastQuickPNum = pNum;
	},
	showMainReply(isBottom, evt) {
		this.closeReply();
		if(!aib.t) {
			this.tNum = false;
			this.refreshCapImg(false);
		}
		if(this.isBottom === isBottom) {
			this.pForm.style.display = this.isHidden ? '' : 'none';
			this.isHidden = !this.isHidden;
			this.updatePAreaBtns();
		} else {
			this.isBottom = isBottom;
			this.setReply(false, false);
		}
		if(evt) {
			$pd(evt);
		}
	},
	closeReply() {
		if(this.isQuick) {
			this.isQuick = false;
			this.lastQuickPNum = -1;
			if(!aib.t) {
				this._toggleQuickReply(0);
				$del($id('de_thrid'));
			}
			this.setReply(false, !aib.t || Cfg.addPostForm > 1);
		}
	},
	refreshCapImg(focus) {
		if(this._lastCapUpdate) {
			this._lastCapUpdate = Date.now();
		}
		if(aib.mak || aib.fch) {
			aib.updateCaptcha(focus);
		} else {
			if(!this.cap || (aib.krau && !$q('input[name="captcha_name"]', this.form).hasAttribute('value'))) {
				return;
			}
			var img = this.recap ? $id('recaptcha_image') : $t('img', this.capTr);
			if(aib.dobr || aib.krau || aib.dvachnet || this.recap) {
				img.click();
			} else if(img) {
				var src = aib.getCaptchaSrc(img.getAttribute('src'), this.tNum);
				img.src = '';
				img.src = src;
			}
		}
		if(this.cap) {
			this.cap.value = '';
			if(focus) {
				this.cap.focus();
			}
		}
	},
	setReply(quick, hide) {
		if(quick) {
			$after(this.qArea.firstChild, this.pForm);
		} else {
			$after(this.pArea[+this.isBottom], this.qArea);
			$after(this._pBtn[+this.isBottom], this.pForm);
		}
		this.isHidden = hide;
		this.qArea.style.display = quick ? '' : 'none';
		this.pForm.style.display = hide ? 'none' : '';
		this.updatePAreaBtns();
	},
	setPlaceholders() {
		this._setPlaceholder('name');
		this._setPlaceholder('subj');
		this._setPlaceholder('mail');
		this._setPlaceholder('cap');
		this._setPlaceholder('video');
	},
	updatePAreaBtns() {
		var txt = 'de-abtn de-parea-btn-',
			rep = aib.t ? 'reply' : 'thrd';
		$t('a', this._pBtn[+this.isBottom]).className = txt + (this.pForm.style.display === '' ? 'close' : rep);
		$t('a', this._pBtn[+!this.isBottom]).className = txt + rep;
	},

	_lastCapUpdate: 0,
	_pBtn: [],
	_setSage() {
		var el = $id('de-sagebtn'),
			c = Cfg.sageReply;
		el.style.opacity = c ? '1' : '.3';
		el.title = c ? 'SAGE!' : Lng.noSage[lang];
		if(this.mail.type === 'text') {
			this.mail.value = c ? 'sage' : aib.fch ? 'noko' : '';
		} else {
			this.mail.checked = c;
		}
	},
	_toggleQuickReply(tNum) {
		if(this.oeForm) {
			$q('input[name="oek_parent"], input[name="replyto"]', this.oeForm).value = tNum;
		}
		if(this.form) {
			$q('#de_thrid, input[name*="thread"]', this.form).value = tNum;
		}
	},
	_captchaInit(html) {
		if(this.capInited) {
			return;
		}
		if(aib.mak || aib.fch) {
			aib.updateCaptcha(false);
			pr.txta.tabIndex = 999;
			this.capInited = true;
			return;
		}
		if(!$id('recaptcha_widget_div')) {
			this.capTr.innerHTML = html;
		}
		this.cap = $q('input[type="text"][name*="aptcha"]:not([name="recaptcha_challenge_field"])', this.capTr);
		if(aib.tire) {
			$script('show_captcha()');
		}
		if(aib.krau) {
			aib.initCaptcha.click();
			$id('captcha_image').setAttribute('onclick', 'requestCaptcha(true);');
		}
		if(aib.dvachnet) {
			$script('get_captcha()');
		}
		setTimeout(() => this._captchaUpd(), 100);
	},
	_captchaUpd() {
		var img, a;
		if((this.recap = $id('recaptcha_response_field')) && (img = $id('recaptcha_image'))) {
			this.cap = this.recap;
			img.setAttribute('onclick', 'Recaptcha.reload()');
			img.style.cssText = 'width: 300px; cursor: pointer;';
		}
		this.capInited = true;
		this.cap.autocomplete = 'off';
		if(!aib.kus && (aib.multiFile || !Cfg.fileThumb)) {
			this.cap.placeholder = Lng.cap[lang];
		}
		this.cap.onkeypress = (function() {
			var ru = 'йцукенгшщзхъфывапролджэячсмитьбюё',
				en = 'qwertyuiop[]asdfghjkl;\'zxcvbnm,.`';
			return function(e) {
				if(!Cfg.captchaLang || e.which === 0) {
					return;
				}
				var i, code = e.charCode || e.keyCode,
					chr = String.fromCharCode(code).toLowerCase();
				if(Cfg.captchaLang === 1) {
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
		})();
		if(aib.krau) {
			return;
		}
		if(aib.dobr || aib.dvachnet || this.recap || !(img = $q('img', this.capTr))) {
			this.capTr.style.display = '';
			return;
		}
		if(!aib.kus && !aib.tinyIb) {
			this._lastCapUpdate = Date.now();
			this.cap.onfocus = () => {
				if(this._lastCapUpdate && (Date.now() - this._lastCapUpdate > 3e5)) {
					this.refreshCapImg(false);
				}
			};
			if(!aib.t && this.isQuick) {
				this.refreshCapImg(false);
			}
		}
		img.title = Lng.refresh[lang];
		img.alt = Lng.loading[lang];
		img.style.cssText = 'vertical-align: text-bottom; border: none; cursor: pointer;';
		img.onclick = this.refreshCapImg.bind(this, true);
		if((a = img.parentNode).tagName === 'A') {
			$after(a, img);
			$del(a);
		}
		this.capTr.style.display = '';
	},
	_setPlaceholder(val) {
		var el = this[val];
		if(el) {
			if(aib.multiFile || !Cfg.fileThumb) {
				el.placeholder = Lng[val][lang];
			} else {
				el.removeAttribute('placeholder');
			}
		}
	},
	_wrapText(markupBB, tag, text) {
		var m;
		if(markupBB) {
			var str;
			if(text.includes('\n')) {
				str = '[' + tag + ']' + text + '[/' + tag + ']';
				return [str.length, str];
			}
			m = text.match(/^(\s*)(.*?)(\s*)$/);
			str = m[1] + '[' + tag + ']' + m[2] + '[/' + tag + ']' + m[3];
			return [!m[2].length ? m[1].length + tag.length + 2 : str.length, str];
		}
		var rv = '', i = 0,
			arr = text.split('\n');
		for(var len = arr.length; i < len; ++i) {
			m = arr[i].match(/^(\s*)(.*?)(\s*)$/);
			rv += '\n' + m[1] + (tag === '^H' ? m[2] + '^H'.repeat(m[2].length) : tag + m[2] + tag) + m[3];
		}
		return [i === 1 && !m[2].length && tag !== '^H' ?
			m[1].length + tag.length :
			rv.length - 1, rv.slice(1)];
	}
};

function FileInput(form, el, prev) {
	this.el = el;
	this.place = el.parentNode;
	this.form = form;
	this.prev = prev;
	if(prev) {
		prev.next = this;
	}
}
FileInput.prototype = {
	empty: true,
	next: null,
	imgFile: null,
	thumb: null,
	clear() {
		var newEl, form = this.form,
			oldEl = this.el;
		oldEl.insertAdjacentHTML('afterend', oldEl.outerHTML);
		newEl = this.el.nextSibling;
		newEl.obj = this;
		newEl.addEventListener('change', this);
		newEl.addEventListener('dragleave', this);
		newEl.addEventListener('drop', this);
		if(form.file === oldEl) {
			form.file = newEl;
		}
		this.el = newEl;
		$del(oldEl);
		this.empty = true;
		this.hideInputs();
	},
	delUtils() {
		if(Cfg.fileThumb) {
			this.thumb.classList.add('de-file-off');
			if(this._mediaEl) {
				window.URL.revokeObjectURL(this._mediaEl.src);
				this._mediaEl.parentNode.title = Lng.clickToAdd[lang];
				$del(this._mediaEl);
				this._mediaEl = null;
			}
		}
		$del(this._delUtil);
		$del(this._spUtil);
		$del(this._rjUtil);
		this.imgFile = this._delUtil = this._spUtil = this._rjUtil = null;
		this._changeFilesCount(-1);
		this.clear();
	},
	updateUtils() {
		this.init(true);
		if(this._delUtil) {
			$after(this._buttonsPlace, this._delUtil);
		}
		if(this._spUtil) {
			$after(this._buttonsPlace, this._spUtil);
		}
		if(this._rjUtil) {
			$after(this._buttonsPlace, this._rjUtil);
		}
	},
	handleEvent(e) {
		switch(e.type) {
		case 'change': setTimeout(() => this._onFileChange(), 20); return;
		case 'click':
			if(e.target === this._delUtil) {
				this.delUtils();
			} else if(e.target === this._spUtil) {
				this.form.spoil.checked = this._spUtil.checked;
				return;
			} else if(e.target === this._rjUtil) {
				this._addRarJpeg();
			} else if(e.target.className === 'de-file-img') {
				this.el.click();
			}
			e.stopPropagation();
			$pd(e);
			return;
		case 'dragover':
			this.thumb.classList.add('de-file-drag');
			$after(this.thumb, this.el);
			return;
		case 'dragleave':
		case 'drop':
			setTimeout(() => {
				this.thumb.classList.remove('de-file-drag');
				var el = this.place.firstChild;
				if(el) {
					$before(el, this.el);
				} else {
					this.place.appendChild(this.el);
				}
			}, 10);
			return;
		case 'mouseover': this.thumb.classList.add('de-file-hover'); return;
		case 'mouseout': this.thumb.classList.remove('de-file-hover');
		}
	},
	hideInputs() {
		var inp = this.next;
		while(inp && inp.empty) {
			inp = inp.next;
		}
		if(!inp) {
			inp = this;
			while(inp.prev && inp.prev.empty) {
				inp = inp.prev;
			}
			var hideThumbs = Cfg.fileThumb;
			while((inp = inp.next)) {
				if(hideThumbs) {
					inp.thumb.style.display = 'none';
				} else {
					inp._wrap.style.display = 'none';
				}
			}
		}
	},
	init(update) {
		if(Cfg.fileThumb) {
			this.form.fileTd.parentNode.style.display = 'none';
			this.form.fileArea.insertAdjacentHTML('beforeend',
				'<div class="de-file de-file-off"><div class="de-file-img">' +
				'<div class="de-file-img" title="' + Lng.clickToAdd[lang] + '"></div></div></div>');
			this.thumb = this.form.fileArea.lastChild;
			this.thumb.addEventListener('mouseover', this);
			this.thumb.addEventListener('mouseout', this);
			this.thumb.addEventListener('click', this);
			this.thumb.addEventListener('dragover', this);
			this.el.addEventListener('dragleave', this);
			this.el.addEventListener('drop', this);
			if(update) {
				this._showPviewImage();
			} else if(this.prev) {
				this.thumb.style.display = 'none';
			}
		} else if(update) {
			this._wrap.style.display = '';
			this.form.fileTd.parentNode.style.display = '';
			if(this._mediaE) {
				window.URL.revokeObjectURL(this._mediaE.src);
			}
			$del(this.thumb);
			this.thumb = this._mediaEl = null;
		}
		if(!update) {
			this.el.classList.add('de-file-input');
			this.el.addEventListener('change', this);
		}
	},

	_mediaEl: null,
	_delUtil: null,
	_spUtil: null,
	_rjUtil: null,
	get _buttonsPlace() {
		return Cfg.fileThumb ? this.thumb.firstChild : this.el;
	},
	get _wrap() {
		return aib.multiFile ? this.el.parentNode : this.el;
	},
	_addRarJpeg() {
		var el = this.form.rarInput;
		el.onchange = e => {
			$del(this._rjUtil);
			this._buttonsPlace.insertAdjacentHTML('afterend',
				'<span><span class="de-wait"></span>' + Lng.wait[lang] + '</span>');
			var myRjUtil = this._rjUtil = this._buttonsPlace.nextSibling,
				file = e.target.files[0];
			readFile(file, false).then(val => {
				if(this._rjUtil === myRjUtil) {
					myRjUtil.className = 'de-file-rarmsg de-file-utils';
					myRjUtil.title = this.el.files[0].name + ' + ' + file.name;
					myRjUtil.textContent = this.el.files[0].name.replace(/^.+\./, '') + ' + ' +
						file.name.replace(/^.+\./, '');
					this.imgFile = val;
				}
			});
		};
		el.click();
	},
	_changeFilesCount(val) {
		val = this.form.filesCount + val;
		this.form.filesCount = val < 1 ? 1 : val;
		if(aib.dobr) {
			this.form.fileTd.firstElementChild.value = this.form.filesCount + 1;
		}
	},
	_onFileChange() {
		if(Cfg.fileThumb) {
			this._showPviewImage();
		} else {
			this.form.eventFiles(false);
		}
		if(this.empty) {
			this.empty = false;
			this._changeFilesCount(+1);
			$after(this._buttonsPlace, this._delUtil = $new('span', {
				'class': 'de-file-del de-file-utils',
				'title': Lng.removeFile[lang]}, {
				'click': this
			}));
			if(this.form.spoil) {
				$after(this._buttonsPlace, this._spUtil = $new('input', {
					'class': 'de-file-spoil de-file-utils',
					'type': 'checkbox',
					'title': Lng.spoilFile[lang]}, {
					'click': this
				}));
				this._spUtil.checked = this.form.spoil.checked;
			}
		} else if(this.imgFile) {
			this.imgFile = null;
		}
		if(this.next) {
			if(Cfg.fileThumb) {
				this.next.thumb.style.display = '';
			} else {
				this.next._wrap.style.display = '';
			}
		}
		if(nav.Presto || aib.fch || !/^image\/(?:png|jpeg)$/.test(this.el.files[0].type)) {
			return;
		}
		if(this._rjUtil) {
			$del(this._rjUtil);
			this._rjUtil = null;
		}
		$after(this._buttonsPlace, this._rjUtil = $new('span', {
			'class': 'de-file-rar de-file-utils',
			'title': Lng.helpAddFile[lang]}, {
			'click': this
		}));
	},
	_showPviewImage() {
		var files = this.el.files;
		if(!files || !files[0]) {
			return;
		}
		readFile(files[0], false).then(val => {
			this.form.eventFiles(false);
			if(this.empty) {
				return;
			}
			var file = this.el.files[0],
				thumb = this.thumb;
			thumb.classList.remove('de-file-off');
			thumb = thumb.firstChild.firstChild;
			thumb.title = file.name + ', ' + (file.size/1024).toFixed(2) + 'KB';
			thumb.insertAdjacentHTML('afterbegin', file.type === 'video/webm' ?
				'<video class="de-file-img" loop autoplay muted src=""></video>' :
				'<img class="de-file-img" src="">');
			this._mediaEl = thumb = thumb.firstChild;
			thumb.src = window.URL.createObjectURL(new Blob([val]));
			thumb = thumb.nextSibling;
			if(thumb) {
				window.URL.revokeObjectURL(thumb.src);
				$del(thumb);
			}
		});
	}
};


// SUBMIT
// ===========================================================================================================

function getSubmitError(dc) {
	var err = '';
	if(dc.body.hasChildNodes() && !$q(aib.qDForm, dc)) {
		if(aib.mak) {
			try {
				var json = JSON.parse(dc.body.innerHTML);
				if(json.Status !== 'OK' && json.Status !== 'Redirect') {
					return Lng.error[lang] + ":\n" + json.Reason;
				} else {
					return null;
				}
			} catch(e) {}
		}
		var els = $Q(aib.qError, dc);
		for(var i = 0, len = els.length; i < len; ++i) {
			err += els[i].innerHTML + '\n';
		}
		err = err.replace(/<a [^>]+>Назад.+|<br.+/, '') || Lng.error[lang] + ':\n' + dc.body.innerHTML;
		err = /:null|successful|uploaded|updating|обновл|удален[о\.]/i.test(err) ? '' : err.replace(/"/g, "'");
	}
	return err;
}

var doUploading = async(function* ([hasFiles, getProgress]) {
	$popup(Lng.sendingPost[lang] + (hasFiles ?
		'<br><progress id="de-uploadprogress" value="0" max="1" style="display: none; width: 200px;">' +
		'</progress><div style="display: none; font: bold 12px arial;">' +
		'<span></span> / <span></span> (<span></span>)</div>' : ''), 'upload', true);
	var p, val;
	if(hasFiles) {
		var beginTime = Date.now(),
			inited = false,
			progress = $id('de-uploadprogress'),
			counterWrap = progress.nextSibling,
			counterEl = counterWrap.firstChild,
			totalEl = counterEl.nextElementSibling,
			speedEl = totalEl.nextElementSibling;
	}
	while((p = getProgress())) {
		try {
			val = yield p;
		} catch(e) {
			$popup(getErrorMessage(e), 'upload', false)
			return;
		}
		if(val.done) {
			checkUpload(val.data);
			return;
		}
		if(hasFiles) {
			if(!inited) {
				var total = val.data.total;
				progress.setAttribute('max', total);
				progress.style.display = '';
				totalEl.textContent = prettifySize(total);
				counterWrap.style.display = '';
				inited = true;
			}
			var loaded = val.data.loaded;
			progress.value = loaded;
			counterEl.textContent = prettifySize(loaded);
			speedEl.textContent = prettifySize((loaded / (Date.now() - beginTime)) * 1e3) +
			                                   '/' + Lng.second[lang];
		}
	}
	$popup(Lng.internalError[lang] + getPrettyErrorMessage(new Error()), 'upload', false);
});

function checkUpload(dc) {
	if(aib.krau) {
		pr.form.action = pr.form.action.split('?')[0];
		$id('postform_row_progress').style.display = 'none';
		aib.btnZeroLUTime.click();
	}
	updater['continue']();
	var err = getSubmitError(dc);
	if(err) {
		if(pr.isQuick) {
			pr.setReply(true, false);
		}
		if(/captch|капч|подтвер|verifizie/i.test(err)) {
			pr.refreshCapImg(true);
		}
		$popup(err, 'upload', false);
		updater.sendErrNotif();
		return;
	}
	if(Cfg.favOnReply && pr.tNum && !$c('de-btn-fav-sel', pByNum[pr.tNum].el)) {
		pByNum[pr.tNum].thr.setFavorState(true, 'onreply');
	}
	pr.txta.value = '';
	if(pr.file) {
		pr.delFilesUtils();
	}
	if(pr.video) {
		pr.video.value = '';
	}
	Cfg.stats[pr.tNum ? 'reply' : 'op']++;
	saveComCfg(aib.dm, Cfg);
	if(!pr.tNum) {
		if(aib.mak) {
			try {
				var json = JSON.parse(dc.body.innerHTML);
				if(json.Status === 'Redirect') {
					window.location = aib.getThrdUrl(aib.b, json.Target);
				}
			} catch(e) {}
		} else {
			window.location = aib.getThrdUrl(aib.b, aib.getTNum($q(aib.qDForm, dc)));
		}
		return;
	}
	var el = !aib.tiny && !aib.kus &&
		(aib.qPostRedir === null || $q(aib.qPostRedir, dc)) ? $q(aib.qDForm, dc) : null;
	if(aib.t) {
		dForm.firstThr.clearPostsMarks();
		if(el) {
			dForm.firstThr.loadNewFromForm(el);
			if(Cfg.scrAfterRep) {
				scrollTo(0, window.pageYOffset + dForm.firstThr.last.el.getBoundingClientRect().top);
			}
			closePopup('upload');
		} else {
			dForm.firstThr.loadNew(true).then(() => AjaxError.Success, e => e).then(e => {
				infoLoadErrors(e);
				if(Cfg.scrAfterRep) {
					scrollTo(0, window.pageYOffset + dForm.firstThr.last.el.getBoundingClientRect().top);
				}
				closePopup('upload');
			});
		}
	} else {
		if(el) {
			pByNum[pr.tNum].thr.loadFromForm(visPosts, true, el);
			closePopup('upload');
		} else {
			pByNum[pr.tNum].thr.load(visPosts, false, false).then(() => closePopup('upload'));
		}
	}
	pr.closeReply();
	pr.refreshCapImg(false);
	pr.filesCount = 0;
}

var checkDelete = async(function* (dc) {
	var err = getSubmitError(dc);
	if(err) {
		$popup(Lng.errDelete[lang] + err, 'delete', false);
		updater.sendErrNotif();
		return;
	}
	var [num] = doc.location.hash.match(/\d+/) || [];
	if(num) {
		var post = pByNum[num];
		if(post) {
			if(!post.isOp) {
				post.el.className = aib.phut ? 'thread_reply' : aib.cReply;
			}
			doc.location.hash = '';
		}
	}
	var els = $Q(aib.qRPost + ' input:checked', dForm.el),
		threads = new Set(),
		isThr = aib.t;
	for(var i = 0, len = els.length; i < len; ++i) {
		var el = els[i];
		el.checked = false;
		if(!isThr) {
			threads.add(aib.getPostEl(el).post.thr);
		}
	}
	if(isThr) {
		dForm.firstThr.clearPostsMarks();
		try {
			yield dForm.firstThr.loadNew(false);
		} catch(e) {
			infoLoadErrors(e);
		}
	} else {
		for(var thr of threads) {
			yield thr.load(visPosts, false, false);
		}
	}
	$popup(Lng.succDeleted[lang], 'delete', false);
});

function* html5Submit(form, needProgress = false) {
	var formData = new FormData();
	var hasFiles = false;
	for(var {name, value, type, el} of getFormElements(form)) {
		if(type === 'file') {
			hasFiles = true;
			var fileName = value.name,
				newFileName = Cfg.removeFName ? ' ' + fileName.substring(fileName.lastIndexOf('.')) : fileName;
			if(/^image\/(?:png|jpeg)$|^video\/webm$/.test(value.type) &&
			   (Cfg.postSameImg || Cfg.removeEXIF))
			{
				var data = cleanFile((yield readFile(value, false)), el.obj.imgFile);
				if(!data) {
					return Promise.reject(Lng.fileCorrupt[lang] + fileName);
				}
				value = new File(data, newFileName)
			} else if(Cfg.removeFName) {
				value = new File([value], newFileName);
			}
		}
		formData.append(name, value);
	}
	if(needProgress) {
		var lastFuncs = null,
			promises = [new Promise((resolve, reject) => lastFuncs = {resolve, reject})];
		$ajax(form.action, {method: 'POST', data: formData, onprogress: e => {
			lastFuncs.resolve({ done: false, data: {loaded: e.loaded, total: e.total} });
			promises.push(new Promise((resolve, reject) => lastFuncs = {resolve, reject}));
		}}).then(xhr => lastFuncs.resolve({done: true, data: $DOM(xhr.responseText)}),
		         xhr => lastFuncs.reject(new AjaxError(xhr.status, xhr.statusText)));
		return [hasFiles, () => promises.shift()];
	} else {
		try {
			var xhr = yield $ajax(form.action, {method: 'POST', data: formData});
			return $DOM(xhr.responseText);
		} catch(xhr) {
			return Promise.reject(new AjaxError(xhr.status, xhr.statusText));
		}
	}
}

function readFile(file, asText) {
	return new Promise((resolve, reject) => {
		var fr = new FileReader();
		fr.onload = e => resolve(e.target.result);
		if(asText) {
			fr.readAsText(file);
		} else {
			fr.readAsArrayBuffer(file);
		}
	});
}

function cleanFile(data, extraData) {
	var i, len, val, lIdx, jpgDat, img = nav.getUnsafeUint8Array(data),
		rand = Cfg.postSameImg && String(Math.round(Math.random() * 1e6)),
		rExif = !!Cfg.removeEXIF,
		rv = extraData ? rand ? [img, extraData, rand] : [img, extraData] : rand ?
			[img, rand] : [img];
	if(!rand && !rExif && !extraData) {
		return rv;
	}
	// JPG
	if(img[0] === 0xFF && img[1] === 0xD8) {
		var deep = 1;
		for(i = 2, len = img.length - 1, val = [null, null], lIdx = 2, jpgDat = null; i < len; ) {
			if(img[i] === 0xFF) {
				if(rExif) {
					if(!jpgDat && deep === 1) {
						if(img[i + 1] === 0xE1 && img[i + 4] === 0x45) {
							jpgDat = readExif(data, i + 10, (img[i + 2] << 8) + img[i + 3]);
						} else if(img[i + 1] === 0xE0 && img[i + 7] === 0x46 &&
						         (img[i + 2] !== 0 || img[i + 3] >= 0x0E || img[i + 15] !== 0xFF))
						{
							jpgDat = img.subarray(i + 11, i + 16);
						}
					}
					if(((img[i + 1] >> 4) === 0xE && img[i + 1] !== 0xEE) || img[i + 1] === 0xFE) {
						if(lIdx !== i) {
							val.push(img.subarray(lIdx, i));
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
		val.push(img.subarray(lIdx, i));
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
		for(i = 0, len = img.length - 7; i < len && (img[i] !== 0x49 ||
			img[i + 1] !== 0x45 || img[i + 2] !== 0x4E || img[i + 3] !== 0x44); i++) {}
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
	var i, xRes = 0,
		yRes = 0,
		resT = 0,
		dv = nav.getUnsafeDataView(data, off),
		le = String.fromCharCode(dv.getUint8(0), dv.getUint8(1)) !== 'MM';
	if(dv.getUint16(2, le) !== 0x2A) {
		return null;
	}
	i = dv.getUint32(4, le);
	if(i > len) {
		return null;
	}
	for(var j = 0, tgLen = dv.getUint16(i, le); j < tgLen; j++) {
		var dE = i + 2 + 12 * j,
			tag = dv.getUint16(dE, le);
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

WebmParser = function(data) {
	var EBMLId = 0x1A45DFA3,
		segmentId = 0x18538067,
		voidId = 0xEC;
	function WebmElement(elData, dataLength, offset) {
		if(offset + 4 >= dataLength) {
			return;
		}
		var num = elData.getUint32(offset),
			clz = Math.clz32(num);
		if(clz > 3) {
			this.error = true;
			return;
		}
		offset += clz + 1;
		if(offset + 4 >= dataLength) {
			this.error = true;
			return;
		}
		var id = num >>> (8 * (3 - clz)),
			headSize = clz + 1;
		num = elData.getUint32(offset);
		clz = Math.clz32(num);
		if(clz > 3) {
			if((num & (0xFFFFFFFF >>> (clz + 1))) !== 0) {
				this.error = true;
				return; // We cannot handle webm-files with size greater than 4Gb :(
			}
			if(offset + 8 >= dataLength) {
				this.error = true;
				return;
			}
			headSize += 4;
			offset += 4;
			num = elData.getUint32(offset);
			clz -= 4;
		}
		var size = num >>> (8 * (3 - clz));
		headSize += clz + 1;
		offset += clz + 1;
		if(offset + size > dataLength) {
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
			if(el.error || el.id !== EBMLId) {
				break;
			}
			this.EBML = el;
			offset += el.headSize + el.size;
			while(true) {
				el = new WebmElement(dv, len, offset);
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
	Parser.prototype = {
		addData(data) {
			if(this.error || !data) {
				return this;
			}
			var size = (typeof data === 'string') ? data.length : data.byteLength;
			if(size > 127) {
				this.error = true;
				return;
			}
			this.rv.push(new Uint8Array([voidId, 0x80 | size]), data);
			return this;
		},
		getData() {
			if(this.error) {
				return null;
			}
			this.rv[0] = nav.getUnsafeUint8Array(this.data, 0, this.segment.endOffset);
			return this.rv;
		}
	};

	WebmParser = Parser;
	return new Parser(data);
};


// IMAGES
// ===========================================================================================================

function genImgHash(data) {
	var buf = new Uint8Array(data[0]),
		oldw = data[1],
		oldh = data[2],
		size = oldw * oldh;
	for(var i = 0, j = 0; i < size; i++, j += 4) {
		buf[i] = buf[j] * .3 + buf[j + 1] * .59 + buf[j + 2] * .11;
	}
	var newh = 8,
		neww = 8,
		levels = 3,
		areas = 256 / levels,
		values = 256 / (levels - 1),
		hash = 0;
	for(var i = 0; i < newh; i++) {
		for(var j = 0; j < neww; j++) {
			var tmp = i / (newh - 1) * (oldh - 1),
				l = Math.min(tmp | 0, oldh - 2),
				u = tmp - l;
			tmp = j / (neww - 1) * (oldw - 1);
			var c = Math.min(tmp | 0, oldw - 2),
				t = tmp - c;
			hash = (hash << 4) + Math.min(values * (((buf[l * oldw + c] * ((1 - t) * (1 - u)) +
				buf[l * oldw + c + 1] * (t * (1 - u)) +
				buf[(l + 1) * oldw + c + 1] * (t * u) +
				buf[(l + 1) * oldw + c] * ((1 - t) * u)) / areas) | 0), 255);
			var g = hash & 0xF0000000;
			if(g) {
				hash ^= g >>> 24;
			}
			hash &= ~g;
		}
	}
	return {hash: hash};
}
function ImgBtnsShowHider(nextFn, prevFn) {
	dForm.el.insertAdjacentHTML('beforeend', '<div style="display: none;">' +
		'<div id="de-img-btn-next" de-title="' + Lng.nextImg[lang] + '"></div>' +
		'<div id="de-img-btn-prev" de-title="' + Lng.prevImg[lang] + '"></div></div>');
	var btns = dForm.el.lastChild;
	this._btns = btns;
	this._btnsStyle = btns.style;
	this._nextFn = nextFn;
	this._prevFn = prevFn;
	doc.defaultView.addEventListener('mousemove', this);
	btns.addEventListener('mouseover', this);
}
ImgBtnsShowHider.prototype = {
	handleEvent(e) {
		switch(e.type) {
		case 'mousemove':
			var curX = e.clientX,
				curY = e.clientY;
			if(this._oldX !== curX || this._oldY !== curY) {
				this._oldX = curX;
				this._oldY = curY;
				this.show();
			}
			return;
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
	},
	hide() {
		this._btnsStyle.display = 'none';
		this._hidden = true;
		this._oldX = this._oldY = -1;
	},
	remove() {
		$del(this._btns);
		doc.defaultView.removeEventListener('mousemove', this);
		clearTimeout(this._hideTmt);
	},
	show() {
		if(this._hidden) {
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
	_setHideTmt() {
		clearTimeout(this._hideTmt);
		this._hideTmt = setTimeout(() => this.hide(), 2e3);
	}
};

function AttachmentViewer(data) {
	this._show(data);
}
AttachmentViewer.prototype = {
	data: null,
	close(e) {
		if(this.data.inPview && this.data.post.sticked) {
			$c('de-btn-stick-on', this.data.post.el).click();
		}
		if(this.hasOwnProperty('_btns')) {
			this._btns.remove();
		}
		this._remove(e);
	},
	handleEvent(e) {
		var isOverEvent = false;
		switch(e.type) {
		case 'mousedown':
			if(this.data.isVideo && this.data.isControlClick(e, this._elStyle.height)) {
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
			if(curX !== this._oldX || curY !== this._oldY) {
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
			if(this.data.isVideo && this.data.isControlClick(e, this._elStyle.height)) {
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
		case 'mouseover':
			isOverEvent = true;
			/* falls through */
		case 'mouseout':
			var temp = e.relatedTarget;
			if(!temp || (temp !== this._obj && !this._obj.contains(temp))) {
				if(isOverEvent) {
					this.data.post.mouseEnter();
				} else if(Pview.top && this.data.post.el !== temp && !this.data.post.el.contains(temp)) {
					Pview.top.markToDel();
				}
			}
			return;
		case 'mousewheel':
			this._handleWheelEvent(e.clientX, e.clientY,
				-1/40 * ('wheelDeltaY' in e ? e.wheelDeltaY : e.wheelDelta));
			break;
		default: // 'wheel' event
			this._handleWheelEvent(e.clientX, e.clientY, e.deltaY);
		}
		$pd(e);
	},
	navigate(isForward) {
		var data = this.data;
		do {
			data = data.getFollow(isForward);
		} while(!data.isVideo && !data.isImage);
		this.update(data, true, null);
	},
	setWebmVolume: function(val) {
		var el = this._fullEl;
		if(el.tagName === 'VIDEO') {
			if(val === 0) {
				el.muted = true;
			} else {
				el.muted = false;
				el.volume = val / 100;
			}
		}
	},
	update(data, showButtons, e) {
		this._remove(e);
		this._show(data, showButtons);
	},

	_data: null,
	_elStyle: null,
	_fullEl: null,
	_obj: null,
	_oldL: 0,
	_oldT: 0,
	_height: 0,
	_width: 0,
	_oldX: 0,
	_oldY: 0,
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
	_getHolder(el, data) {
		var [width, height, minSize] = data.computeFullSize(false);
		this._width = width;
		this._height = height;
		this._minSize = minSize ? minSize / this._zoomFactor : Cfg.minImgSize;
		this._oldL = (Post.sizing.wWidth - width) / 2 - 1;
		this._oldT = (Post.sizing.wHeight - height) / 2 - 1;
		var obj = $add('<div class="de-img-center" style="top:' + this._oldT + 'px; left:' +
			this._oldL + 'px; width:' + width + 'px; height:' + height + 'px; display: block"></div>');
		if(data.isImage) {
			obj.insertAdjacentHTML('afterbegin', '<a href="' + data.src + '"></a>');
			obj.firstChild.appendChild(el);
		} else {
			obj.appendChild(el);
		}
		return obj;
	},
	_handleWheelEvent(clientX, clientY, delta) {
		if(delta === 0) {
			return;
		}
		var width, height, oldW = this._width,
			oldH = this._height;
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
		this._elStyle.left = (this._oldL = parseInt(clientX - (width / oldW) * (clientX - this._oldL), 10)) + 'px';
		this._elStyle.top = (this._oldT = parseInt(clientY - (height / oldH) * (clientY - this._oldT), 10)) + 'px';
	},
	_show(data) {
		var el = data.getFullObject(),
			obj = this._getHolder(el, data);
		this._elStyle = obj.style;
		this.data = data;
		this._fullEl = el;
		this._obj = obj;
		if('onwheel' in obj) {
			obj.addEventListener('wheel', this, true);
		} else {
			obj.addEventListener('mousewheel', this, true);
		}
		obj.addEventListener('mousedown', this, true);
		obj.addEventListener('click', this, true);
		if(data.inPview) {
			obj.addEventListener('mouseover', this, true);
			obj.addEventListener('mouseout', this, true);
			if(!data.post.sticked) {
				$c('de-btn-stick', data.post.el).click();
			}
		}
		if(!data.inPview) {
			this._btns.show();
		} else if(this.hasOwnProperty('_btns')) {
			this._btns.hide();
		}
		dForm.el.appendChild(obj);
	},
	_remove(e) {
		if(this.data.isVideo && this._fullEl.tagName === 'VIDEO') {
			this._fullEl.pause();
			this._fullEl.removeAttribute('src');
		}
		this._obj.style.display = 'none';
		setTimeout($del, 100, this._obj);
		if(e && this.data.inPview) {
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
	collapse(e) {
		if(!this.isVideo || !this.isControlClick(e, this._fullEl.style.height)) {
			this.expanded = false;
			$del(this._fullEl);
			this._fullEl = null;
			this.el.parentNode.style.display = '';
			$del((aib.hasPicWrap ? this._getImageParent() : this.el.parentNode).nextSibling);
			if(e && this.inPview) {
				this.sendCloseEvent(e, true);
			}
			return true;
		}
		return false;
	},
	computeFullSize(inPost) {
		var minSize = Cfg.minImgSize,
			width = this.width,
			height = this.height;
		if(Cfg.resizeDPI) {
			width /= Post.sizing.dPxRatio;
			height /= Post.sizing.dPxRatio;
		}
		if(width < minSize && height < minSize) {
			var ar = width / height;
			if(width > height) {
				width = minSize;
				height = width / ar;
			} else {
				height = minSize;
				width = height * ar;
			}
		}
		if(Cfg.resizeImgs) {
			var maxWidth, maxHeight;
			if(inPost) {
				maxWidth = Post.sizing.wWidth - this._offset - 3;
				maxHeight = Number.MAX_SAFE_INTEGER;
			} else {
				maxWidth = Post.sizing.wWidth - 2;
				maxHeight = Post.sizing.wHeight - 2;
			}
			if(width > maxWidth || height > maxHeight) {
				var ar = width / height;
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
	},
	expand(inPost, e) {
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
		var el = this.el,
			size = this.computeFullSize(inPost);
		(aib.hasPicWrap ? this._getImageParent() : el.parentNode).insertAdjacentHTML('afterend',
			'<div class="de-after-fimg"></div>');
		el.parentNode.style.display = 'none';
		this._fullEl = this.getFullObject();
		this._fullEl.className = 'de-img-full';
		this._fullEl.style.width = size[0] + 'px';
		this._fullEl.style.height = size[1] + 'px';
		$after(el.parentNode, this._fullEl);
	},
	getFollowPost(isForward) {
		var imgs, post = this.post;
		do {
			post = post.getAdjacentVisPost(!isForward);
			if(!post) {
				post = isForward ? dForm.firstThr.op : dForm.lastThr.last;
				if(post.hidden || post.thr.hidden) {
					post = post.getAdjacentVisPost(!isForward);
				}
			}
			imgs = post.images;
		} while(!imgs.length);
		return isForward ? imgs.first : imgs.last;
	},
	getFullObject() {
		var obj, src = this.src;
		if(this.isVideo) {
			if(aib.tiny) {
				src = src.replace(/^.*?\?v=|&.*?$/g, '');
			}
			if(nav.canPlayWebm) {
				obj = $add('<video style="width: 100%; height: 100%" src="' + src +
					'" loop autoplay ' + (Cfg.webmControl ? 'controls ' : '') +
					(Cfg.webmVolume === 0 ? 'muted ' : '') + '></video>');
				if(Cfg.webmVolume !== 0) {
					obj.volume = Cfg.webmVolume / 100;
				}
				obj.onerror = function() {
					if(!this.onceLoaded) {
						this.load();
						this.onceLoaded = true;
					}
				};
				obj.onvolumechange = function() {
					var val = this.muted ? 0 : Math.round(this.volume * 100);
					saveCfg('webmVolume', val);
					locStorage['__de-webmvolume'] = val;
					locStorage.removeItem('__de-webmvolume');
				};
			} else {
				obj = $add('<object style="width: 100%; height: 100%" data="' + src +
					'" type="application/x-vlc-plugin">' +
					'<param name="pluginspage" value="http://www.videolan.org/vlc/" />' +
					'<param name="controls" value="' + (Cfg.webmControl ? 'true' : 'false') + '" />' +
					'<param name="loop" value="true" />' +
					'<param name="autoplay" value="true" />' +
					'<param name="wmode" value="transparent" /></object>');
			}
		} else {
			obj = $add('<img style="width: 100%; height: 100%" src="' + src + '" alt="' + src + '"></a>');
			obj.onload = obj.onerror = function(e) {
				if(this.naturalHeight + this.naturalWidth === 0 && !this.onceLoaded) {
					this.src = this.src;
					this.onceLoaded = true;
				}
			};
		}
		return obj;
	},
	isControlClick(e, styleHeight) {
		return Cfg.webmControl && e.clientY >
			(e.target.getBoundingClientRect().top + parseInt(styleHeight, 10) - 30);
	},
	sendCloseEvent(e, inPost) {
		var pv = this.post,
			cr = pv.el.getBoundingClientRect(),
			x = e.pageX - window.pageXOffset,
			y = e.pageY - window.pageYOffset;
		if(!inPost) {
			while(x > cr.right || x < cr.left || y > cr.bottom || y < cr.top) {
				pv = pv.parent;
				if(pv) {
					cr = pv.el.getBoundingClientRect();
				} else {
					if(Pview.top) {
						Pview.top.markToDel();
					}
					return;
				}
			}
			if(pv.kid) {
				pv.kid.markToDel();
			} else {
				clearTimeout(Pview.delTO);
			}
		} else if(x > cr.right || y > cr.bottom && Pview.top) {
			Pview.top.markToDel();
		}
	},

	_fullEl: null,
	get _offset() {
		var val;
		if(this.post.hidden) {
			this.post.hideContent(false);
			val = this.el.getBoundingClientRect().left + window.pageXOffset;
			this.post.hideContent(true);
		} else {
			val = this.el.getBoundingClientRect().left + window.pageXOffset;
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
	getFollow: { value(isForward) {
		var nImage = this.post.images.data[isForward ? this.idx + 1 : this.idx - 1];
		return nImage ? nImage : this.getFollowPost(isForward);
	} },
	_useCache: { value: false },
	_getImageSize: { value() {
		var iEl = new Image();
		iEl.src = this.el.src;
		return [iEl.width, iEl.height];
	} },
	_getImageSrc: { value() {
		return this.el.src;
	} },
	_getImageParent: { value() {
		return this.el.parentNode;
	} }
});

function Attachment(post, el, idx) {
	this.post = post;
	this.el = el;
	this.idx = idx;
}
Attachment.cachedOffset = -1;
Attachment.viewer = null;
Attachment.prototype = Object.create(IAttachmentData.prototype, {
	info: { configurable: true, get() {
		var val = aib.getFileInfo(aib.getImgWrap(this.el.parentNode));
		Object.defineProperty(this, 'info', { value: val });
		return val;
	} },
	weight: { configurable: true, get() {
		var val = 0;
		if(this.info) {
			var w = this.info.match(/(\d+(?:[\.,]\d+)?)\s*([mkк])?i?[bб]/i);
			val = w[2] === 'M' ? (w[1] * 1e3) | 0 : !w[2] ? Math.round(w[1] / 1e3) : w[1];
		}
		Object.defineProperty(this, 'weight', { value: val });
		return val;
	} },
	getFollow: { value(isForward) {
		var nImage = this.post.images.data[isForward ? this.idx + 1 : this.idx - 1];
		return nImage ? nImage : this.getFollowPost(isForward);
	} },

	_offset: { configurable: true, get() {
		var needCache = !this.inPview && !this.post.isOp &&
			!this.post.prev.omitted && !this.post.prev.isOp && this.post.count > 4;
		var value;
		if(!needCache || Attachment.cachedOffset === -1) {
			value = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(Object.getPrototypeOf(this)),
			                                        '_offset').get.call(this);
			if(needCache) {
				Attachment.cachedOffset = value;
			}
		} else {
			value = Attachment.cachedOffset;
			Object.defineProperty(this, '_offset', { value });
		}
		return value;
	} },
	_getImageSize: { value() {
		if(this.info) {
			var size = this.info.match(/(\d+)\s?[x\u00D7]\s?(\d+)/);
			return [size[1], size[2]];
		}
		return [-1, -1];
	} },
	_getImageSrc: { value() {
		return aib.getImgLink(this.el).href;
	} },
	_getImageParent: { value() {
		return aib.getImgParent(this.el.parentNode);
	} }
});

var ImagesHashStorage = Object.create({
	endFn() {
		if(this.hasOwnProperty('_storage')) {
			sesStorage['de-imageshash'] = JSON.stringify(this._storage);
		}
		if(this.hasOwnProperty('_workers')) {
			this._workers.clear();
			delete this._workers;
		}
	},
	get getHash() {
		var val = this._getHashHelper.bind(this);
		Object.defineProperty(this, 'getHash', { value: val });
		return val;
	},

	*_getHashHelper(imgObj) {
		var el = imgObj.el,
			src = imgObj.src;
		if(src in this._storage) {
			return this._storage[src];
		}
		if(!el.complete) {
			yield new Promise(resolve => el.addEventListener('load', () => resolve()));
		}
		if(el.naturalWidth + el.naturalHeight === 0) {
			return -1;
		}
		var data, buffer, val = -1,
			w = el.naturalWidth,
			h = el.naturalHeight;
		if(aib.fch) {
			var imgData = yield downloadImgData(el.src);
			if(imgData) {
				buffer = imgData.buffer;
			}
		} else {
			var cnv = this._canvas;
			cnv.width = w;
			cnv.height = h;
			var ctx = cnv.getContext('2d');
			ctx.drawImage(el, 0, 0);
			buffer = ctx.getImageData(0, 0, w, h).data.buffer;
		}
		if(buffer) {
			data = yield new Promise(resolve =>
				this._workers.run([buffer, w, h], [buffer], val => resolve(val)));
			if(data && ('hash' in data)) {
				val = data.hash;
			}
		}
		this._storage[src] = val;
		return val;
	},
	get _canvas() {
		var val = doc.createElement('canvas');
		Object.defineProperty(this, '_canvas', { value: val });
		return val;
	},
	get _storage() {
		var val = null;
		try {
			val = JSON.parse(sesStorage['de-imageshash']);
		} finally {
			if(!val) {
				val = {};
			}
			Object.defineProperty(this, '_storage', { value: val });
			return val;
		}
	},
	get _workers() {
		var val = new WorkerPool(4, genImgHash, emptyFn);
		Object.defineProperty(this, '_workers', { value: val, configurable: true });
		return val;
	}
});

function processImageNames(el) {
	var addSrc = Cfg.imgSrcBtns,
		delNames = Cfg.delImgNames;
	if(!addSrc && !delNames) {
		return;
	}
	for(var i = 0, els = $Q(aib.qImgLink, el), len = els.length; i < len; i++) {
		var link = els[i];
		if(/google\.|tineye\.com|iqdb\.org/.test(link.href)) {
			$del(link);
			continue;
		}
		if(link.firstElementChild) {
			continue;
		}
		if(addSrc) {
			link.insertAdjacentHTML('beforebegin', '<span class="de-btn-src" de-menu="imgsrc"></span>');
		}
		if(delNames) {
			link.classList.add('de-img-name');
			link.textContent = link.textContent.split('.').slice(-1)[0];
		}
	}
}

function embedImagesLinks(el) {
	for(var i = 0, els = $Q(aib.qMsgImgLink, el), len = els.length; i < len; ++i) {
		var link = els[i];
		if(link.parentNode.tagName === 'SMALL') {
			return;
		}
		var a = link.cloneNode(false);
		a.target = '_blank';
		a.innerHTML = '<img class="de-img-pre" src="' + a.href + '">';
		$before(link, a);
	}
}


// POSTS
// ===========================================================================================================

function Post(el, thr, num, count, isOp, prev, isLight) {
	this.count = count;
	this.el = el;
	this.isOp = isOp;
	this.num = num;
	this.thr = thr;
	this.prev = prev;
	if(prev) {
		prev.next = this;
	}
	if(isLight) {
		return;
	}
	var refEl = $q(aib.qRef, el),
		html = '<span class="de-post-btns' + (isOp ? '' : ' de-post-counter') +
			'"><span class="de-btn-hide" de-menu="hide"></span><span class="de-btn-rep"></span>';
	this._pref = refEl;
	this.ref = [];
	el.post = this;
	if(isOp) {
		if(!aib.t) {
			html += '<span class="de-btn-expthr" de-menu="expand"></span>';
		}
		html += '<span class="de-btn-fav"></span>';
	}
	this.sage = aib.getSage(el);
	if(this.sage) {
		html += '<span class="de-btn-sage" title="SAGE"></span>';
	}
	refEl.insertAdjacentHTML('afterend', html + '</span>');
	this.btns = refEl.nextSibling;
	if(Cfg.expandTrunc && this.trunc) {
		this._getFull(this.trunc, true);
	}
	el.addEventListener('mouseover', this, true);
}
Post.hiddenNums = [];
Post.getWrds = function(text) {
	return text.replace(/\s+/g, ' ').replace(/[^a-zа-яё ]/ig, '').trim().substring(0, 800).split(' ');
};
Post.findSameText = function(oNum, oHid, oWords, date, post) {
	var words = Post.getWrds(post.text),
		len = words.length,
		i = oWords.length,
		olen = i,
		_olen = i,
		n = 0;
	if(len < olen * .4 || len > olen * 3) {
		return;
	}
	while(i--) {
		if(olen > 6 && oWords[i].length < 3) {
			_olen--;
			continue;
		}
		var j = len;
		while(j--) {
			if(words[j] === oWords[i] || oWords[i].match(/>>\d+/) && words[j].match(/>>\d+/)) {
				n++;
			}
		}
	}
	if(n < _olen * .4 || len > _olen * 3) {
		return;
	}
	if(oHid) {
		post.setNote('');
		if(!post.spellHidden) {
			post.setVisib(false);
		}
		if(post.userToggled) {
			delete uVis[post.num];
			post.userToggled = false;
		}
	} else {
		post.setUserVisib(true, date, true);
		post.setNote('similar to >>' + oNum);
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
		var val = doc.documentElement.clientHeight;
		if(!this._enabled) {
			doc.defaultView.addEventListener('resize', this);
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
		if(!this._enabled) {
			doc.defaultView.addEventListener('resize', this);
			this._enabled = true;
		}
		Object.defineProperties(this, {
			'wWidth': { writable: true, configurable: true, value: val },
			'wHeight': { writable: true, configurable: true, value: doc.documentElement.clientHeight }
		});
		return val;
	},
	handleEvent() {
		this.wHeight = doc.documentElement.clientHeight;
		this.wWidth = doc.documentElement.clientWidth;
	},

	_enabled: false
};
Post.prototype = {
	banned: false,
	deleted: false,
	hasRef: false,
	hidden: false,
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
	addFuncs() {
		updRefMap(this, true);
		embedMediaLinks(this);
		if(Cfg.addImgs) {
			embedImagesLinks(this.el);
		}
		if(isExpImg) {
			this.toggleImages(true);
		}
	},
	handleEvent(e) {
		var temp, el = e.target,
			type = e.type,
			isOutEvent = type === 'mouseout';
		if(type === 'click') {
			if(e.button !== 0) {
				return;
			}
			switch(el.tagName) {
			case 'A':
				if(el.classList.contains('de-video-link')) {
					this.videos.clickLink(el, Cfg.addYouTube);
					$pd(e);
					return;
				}
				temp = el.firstElementChild;
				if(temp && temp.tagName === 'IMG') {
					el = temp;
				} else {
					temp = el.parentNode;
					if(temp === this.trunc) {
						this._getFull(temp, false);
						$pd(e);
						e.stopPropagation();
					} else if(Cfg.insertNum && pr.form && temp === this._pref &&
					          !/Reply|Ответ/.test(el.textContent))
					{
						$pd(e);
						e.stopPropagation();
						if(pr.isQuick || (aib.t && pr.isHidden)) {
							pr.showQuickReply(this.isPview ? this.getTopParent() : this, this.num, false, true);
						} else if(aib.t) {
							$txtInsert(pr.txta, '>>' + this.num);
						} else {
							window.location = el.href.replace(/#i/, '#');
						}
					} else if((temp = el.textContent)[0] === '>' && temp[1] === '>' &&
					          !temp[2].includes('\/'))
					{
						var num = temp.match(/\d+/),
							post = pByNum[num];
						if(!post) {
							return;
						}
						post.selectCurrent();
						post.el.scrollIntoView(true);
						window.location.href = aib.anchor + num;
						$pd(e);
					}
					return;
				}
				/* falls through */
			case 'IMG':
				if(el.classList.contains('de-video-thumb')) {
					if(Cfg.addYouTube === 3) {
						var vObject = this.videos;
						vObject.currentLink.classList.add('de-current');
						vObject.addPlayer(vObject.playerInfo, el.classList.contains('de-ytube'));
						$pd(e);
					}
				} else if(Cfg.expandImgs !== 0) {
					this._clickImage(el, e);
				}
				return;
			case 'OBJECT':
			case 'VIDEO':
				if(Cfg.expandImgs !== 0 && !(Cfg.webmControl &&
				   e.clientY > (el.getBoundingClientRect().top + parseInt(el.style.height, 10) - 30)))
				{
					this._clickImage(el, e);
				}
				return;
			}
			if(aib.mak && el.classList.contains('expand-large-comment')) {
				this._getFull(el, false);
				$pd(e);
				e.stopPropagation();
			}
			switch(el.className) {
			case 'de-btn-expthr':
				this.thr.load(1, false);
				if(this._menu) {
					this._menu.remove();
					this._menu = null;
				}
				return;
			case 'de-btn-fav': this.thr.setFavorState(true, 'user'); return;
			case 'de-btn-fav-sel': this.thr.setFavorState(false, 'user'); return;
			case 'de-btn-hide':
			case 'de-btn-hide-user':
				if(this.isPview) {
					pByNum[this.num].toggleUserVisib();
					this.btns.firstChild.className = 'de-btn-hide-user';
					if(pByNum[this.num].hidden) {
						this.btns.classList.add('de-post-hide');
					} else {
						this.btns.classList.remove('de-post-hide');
					}
				} else {
					this.toggleUserVisib();
				}
				if(this._menu) {
					this._menu.remove();
					this._menu = null;
				}
				return;
			case 'de-btn-rep':
				pr.showQuickReply(this.isPview ? this.getTopParent() : this, this.num, !this.isPview, false);
				quotetxt = '';
				return;
			case 'de-btn-sage': addSpell(9, '', false); return;
			case 'de-btn-stick':
			case 'de-btn-stick-on':
				el.className = this.sticked ? 'de-btn-stick' : 'de-btn-stick-on';
				this.sticked = !this.sticked;
				return;
			}
			return;
		}
		if(type === 'mouseover' && Cfg.expandImgs &&
		   !el.classList.contains('de-img-full') &&
		   (temp = this.images.getImageByEl(el)) &&
		   (temp.isImage || temp.isVideo))
		{
			el.title = Cfg.expandImgs === 1 ? Lng.expImgInline[lang] : Lng.expImgFull[lang];
		}
		if(!this._hasEvents) {
			this._hasEvents = true;
			this.el.addEventListener('click', this, true);
			this.el.addEventListener('mouseout', this, true);
		} else if(this.isPview && isOutEvent) {
			this._handleMouseEvents(e.relatedTarget, false);
		}
		switch(el.classList[0]) {
		case 'de-btn-expthr':
		case 'de-btn-hide':
		case 'de-btn-hide-user':
			this._addButtonTitle(el);
			/* falls through */
		case 'de-btn-src':
			if(isOutEvent) {
				clearTimeout(this._menuDelay);
			} else {
				this._menuDelay = setTimeout(() => this._addMenu(el), Cfg.linksOver);
			}
			return;
		case 'de-btn-rep':
			this._addButtonTitle(el);
			if(!isOutEvent) {
				quotetxt = $txtSelect();
			}
			return;
		case 'de-btn-fav':
		case 'de-btn-fav-sel':
			this._addButtonTitle(el);
			return;
		default:
			if(!Cfg.linksNavig || el.tagName !== 'A' || el.lchecked) {
				if(this.isPview && !isOutEvent) {
					this._handleMouseEvents(e.relatedTarget, true);
				}
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
			if(Cfg.linksNavig) {
				if(isOutEvent) {
					clearTimeout(this._linkDelay);
					if(this.kid) {
						this.kid.markToDel();
					} else if(!this.isPview && Pview.top) {
						Pview.top.markToDel();
					}
				} else {
					clearTimeout(Pview.delTO);
					this._linkDelay = setTimeout(() => this._addPview(el), Cfg.linksOver);
				}
				$pd(e);
				e.stopPropagation();
			}
		}
	},
	hideContent(hide) {
		if(hide) {
			this.el.classList.add('de-post-hide');
		} else {
			this.el.classList.remove('de-post-hide');
		}
		if(nav.Chrome) {
			if(hide) {
				this.el.classList.remove('de-post-unhide');
			} else {
				this.el.classList.add('de-post-unhide');
			}
			if(!chromeCssUpd) {
				chromeCssUpd = setTimeout(function() {
					doc.head.insertAdjacentHTML('beforeend',
						`<style id="de-csshide" type="text/css">
							.de-post-hide > ${aib.qHide} { display: none !important; }
							.de-post-unhide > ${aib.qHide} { display: !important; }
						</style>`);
					$del(doc.head.lastChild);
					chromeCssUpd = null;
				}, 200);
			}
		}
	},
	hideRefs() {
		if(!Cfg.hideRefPsts || !this.hasRef) {
			return;
		}
		this.ref.forEach(function(num) {
			var pst = pByNum[num];
			if(pst && !pst.userToggled) {
				pst.setVisib(true);
				pst.setNote('reference to >>' + this.num);
				pst.hideRefs();
			}
		}, this);
	},
	getAdjacentVisPost(toUp) {
		var post = toUp ? this.prev : this.next;
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
	},
	get html() {
		return PostContent.get(this).html;
	},
	get images() {
		var val = new PostImages(this);
		Object.defineProperty(this, 'images', { value: val });
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
		while(post && post.deleted) {
			post = post.nextInThread;
		}
		return post;
	},
	setNote(val) {
		if(this.isOp) {
			this.noteEl.textContent = val ? '(autohide: ' + val + ')' : '(' + this.title + ')';
		} else if(!Cfg.delHiddPost) {
			this.noteEl.textContent = val ? 'autohide: ' + val : '';
		}
	},
	get noteEl() {
		var val;
		if(this.isOp) {
			val = this.thr.el.previousElementSibling.lastChild;
		} else {
			this.btns.insertAdjacentHTML('beforeend', '<span class="de-post-note"></span>');
			val = this.btns.lastChild;
		}
		Object.defineProperty(this, 'noteEl', { value: val });
		return val;
	},
	get posterName() {
		return PostContent.get(this).posterName;
	},
	get posterTrip() {
		return PostContent.get(this).posterTrip;
	},
	select() {
		if(this.isOp) {
			if(this.hidden) {
				this.thr.el.previousElementSibling.classList.add('de-selected');
			}
			this.thr.el.classList.add('de-selected');
		} else {
			this.el.classList.add('de-selected');
		}
	},
	selectCurrent() {
		if(hKeys) {
			if(hKeys.cPost) {
				hKeys.cPost.unselect();
			}
			hKeys.cPost = this;
		} else {
			var el = $c('de-selected', doc);
			if(el) {
				el.unselect();
			}
		}
		this.select();
	},
	setUserVisib(hide, date, sync) {
		this.setVisib(hide);
		this.btns.firstChild.className = 'de-btn-hide-user';
		this.userToggled = true;
		if(hide) {
			this.setNote('');
			this.hideRefs();
		} else {
			this.unhideRefs();
		}
		uVis[this.num] = [+!hide, date];
		if(sync) {
			locStorage['__de-post'] = JSON.stringify({
				'brd': aib.b,
				'date': date,
				'isOp': this.isOp,
				'num': this.num,
				'hide': hide,
				'title': this.isOp ? this.title : ''
			});
			locStorage.removeItem('__de-post');
		}
	},
	setVisib(hide) {
		if(this.hidden === hide) {
			return;
		}
		if(this.isOp) {
			this.hidden = this.thr.hidden = hide;
			var el = $id('de-thr-hid-' + this.num),
				tEl = this.thr.el;
			tEl.style.display = hide ? 'none' : '';
			if(el) {
				el.style.display = hide ? '' : 'none';
				return;
			}
			tEl.insertAdjacentHTML('beforebegin', '<div class="' + aib.cReply +
				' de-thr-hid" id="de-thr-hid-' + this.num + '">' + Lng.hiddenThrd[lang] +
				' <a href="#">№' + this.num + '</a> <span class="de-thread-note"></span></div>');
			el = $t('a', tEl.previousSibling);
			el.onclick = el.onmouseover = el.onmouseout = e => {
				switch(e.type) {
				case 'click':
					this.toggleUserVisib();
					$pd(e);
					return;
				case 'mouseover': this.thr.el.style.display = ''; return;
				default: // mouseout
					if(this.hidden) {
						this.thr.el.style.display = 'none';
					}
				}
			};
			return;
		}
		if(Cfg.delHiddPost) {
			if(hide) {
				this.wrap.classList.add('de-hidden');
			} else if(this.hidden) {
				this.wrap.classList.remove('de-hidden');
			}
		} else {
			if(!hide) {
				this.setNote('');
			}
			this._pref.onmouseover = this._pref.onmouseout = !hide ? null :
				e => this.hideContent(e.type === 'mouseout');
		}
		this.hidden = hide;
		this.hideContent(hide);
		if(Cfg.strikeHidd) {
			setTimeout(() => this._strikePostNum(hide), 50);
		}
	},
	spellHide(note) {
		this.spellHidden = true;
		if(!this.userToggled) {
			if(aib.t && !this.deleted) {
				sVis[this.count] = 0;
			}
			if(!this.hidden) {
				this.hideRefs();
			}
			this.setVisib(true);
			this.setNote(note);
		}
	},
	spellUnhide() {
		this.spellHidden = false;
		if(!this.userToggled) {
			if(aib.t && !this.deleted) {
				sVis[this.count] = 1;
			}
			this.setVisib(false);
			this.unhideRefs();
		}
	},
	get subj() {
		return PostContent.get(this).subj;
	},
	get text() {
		return PostContent.get(this).text;
	},
	get title() {
		return PostContent.get(this).title;
	},
	get tNum() {
		return this.thr.num;
	},
	toggleImages(expand) {
		for(var image of this.images.data) {
			if(image.isImage && (image.expanded ^ expand)) {
				if(expand) {
					image.expand(true, null);
				} else {
					image.collapse(null);
				}
			}
		}
		this.imagesExpanded = expand;
	},
	toggleUserVisib() {
		var isOp = this.isOp,
			hide = !this.hidden;
		this.setUserVisib(hide, Date.now(), true);
		if(isOp) {
			if(hide) {
				hThr[aib.b][this.num] = this.title;
			} else {
				delete hThr[aib.b][this.num];
			}
			saveHiddenThreads(false);
		}
		saveUserPosts();
	},
	get topCoord() {
		return (this.isOp && this.hidden ? this.thr.el.previousElementSibling : this.el)
			.getBoundingClientRect().top;
	},
	get trunc() {
		var el = aib.qTrunc && $q(aib.qTrunc, this.el), val = null;
		if(el && /long|full comment|gekürzt|слишком|длинн|мног|полн/i.test(el.textContent)) {
			val = el;
		}
		Object.defineProperty(this, 'trunc', { configurable: true, value: val });
		return val;
	},
	unhideRefs() {
		if(!Cfg.hideRefPsts || !this.hasRef) {
			return;
		}
		this.ref.forEach(function(num) {
			var pst = pByNum[num];
			if(pst && pst.hidden && !pst.userToggled && !pst.spellHidden) {
				pst.setVisib(false);
				pst.unhideRefs();
			}
		});
	},
	unselect() {
		if(this.isOp) {
			var el = $id('de-thr-hid-' + this.num);
			if(el) {
				el.classList.remove('de-selected');
			}
			this.thr.el.classList.remove('de-selected');
		} else {
			this.el.classList.remove('de-selected');
		}
	},
	updateMsg(newMsg, sRunner) {
		var origMsg = aib.dobr ? this.msg.firstElementChild : this.msg,
			videoExt = $c('de-video-ext', origMsg),
			videoLinks = $Q(':not(.de-video-ext) > .de-video-link', origMsg);
		origMsg.parentNode.replaceChild(newMsg, origMsg);
		Object.defineProperties(this, {
			'msg': { configurable: true, value: newMsg },
			'trunc': { configurable: true, value: null }
		});
		PostContent.remove(this);
		this.videos.updatePost(videoLinks, $Q('a[href*="youtu"], a[href*="vimeo.com"]', newMsg), false);
		if(videoExt) {
			newMsg.appendChild(videoExt);
		}
		this.addFuncs();
		sRunner.run(this);
		closePopup('load-fullmsg');
	},
	get videos() {
		var val = Cfg.addYouTube ? new Videos(this) : null;
		Object.defineProperty(this, 'videos', { value: val });
		return val;
	},
	get wrap() {
		var val = aib.getWrap(this.el, this.isOp);
		Object.defineProperty(this, 'wrap', { value: val });
		return val;
	},

	_hasEvents: false,
	_linkDelay: 0,
	_menu: null,
	_menuDelay: 0,
	_selRange: null,
	_selText: '',
	_addButtonTitle(el) {
		if(el.hasTitle) {
			return;
		}
		el.hasTitle = true;
		switch(el.className) {
		case 'de-btn-hide':
		case 'de-btn-hide-user': el.title = Lng.togglePost[lang]; return;
		case 'de-btn-expthr': el.title = Lng.expandThrd[lang]; return;
		case 'de-btn-rep': el.title = Lng.replyToPost[lang]; return;
		case 'de-btn-fav': el.title = Lng.addFav[lang]; return;
		case 'de-btn-fav-sel': el.title = Lng.delFav[lang];
		}
	},
	_addMenu(el) {
		var html;
		switch(el.getAttribute('de-menu')) {
		case 'hide':
			if(!Cfg.menuHiddBtn) {
				return;
			}
			html = this._addMenuHide();
			break;
		case 'expand':
			html = '<span class="de-menu-item" info="thr-exp">' + Lng.selExpandThr[lang]
				.join('</span><span class="de-menu-item" info="thr-exp">') + '</span>';
			break;
		case 'imgsrc':
			html = this._addMenuImgSrc(el);
		}
		if(this._menu) {
			this._menu.remove();
		}
		this._menu = new Menu(el, html, false, el => this._clickMenu(el));
		if(this.isPview) {
			this._menu.onover = () => this.mouseEnter();
			this._menu.onout = () => this.markToDel();
		}
	},
	_addMenuHide() {
		var str = '', sel = nav.Presto ? doc.getSelection() : window.getSelection(),
			ssel = sel.toString(),
			getItem = name => '<span info="spell-' + name + '" class="de-menu-item">' +
				Lng.selHiderMenu[name][lang] + '</span>';
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
			str += getItem('ihash');
		} else {
			str += getItem('noimg');
		}
		if(this.text) {
			str += getItem('text');
		} else {
			str += getItem('notext');
		}
		return str;
	},
	_addMenuImgSrc(el) {
		var p = el.nextSibling.href + '" target="_blank">' + Lng.search[lang],
			c = doc.body.getAttribute('de-image-search'),
			str = '';
		if(c) {
			c = c.split(';');
			c.forEach(function(el) {
				var info = el.split(',');
				str += '<a class="de-src' + info[0] + (!info[1] ?
					'" onclick="de_isearch(event, \'' + info[0] + '\')" de-url="' :
					'" href="' + info[1]
					) + p + info[0] + '</a>';
			});
		}
		return '<a class="de-menu-item de-src-google" href="http://google.com/searchbyimage?image_url=' + p + 'Google</a>' +
			'<a class="de-menu-item de-src-yandex" href="http://yandex.ru/images/search?rpt=imageview&img_url=' + p + 'Yandex</a>' +
			'<a class="de-menu-item de-src-tineye" href="http://tineye.com/search/?url=' + p + 'TinEye</a>' +
			'<a class="de-menu-item de-src-saucenao" href="http://saucenao.com/search.php?url=' + p + 'SauceNAO</a>' +
			'<a class="de-menu-item de-src-iqdb" href="http://iqdb.org/?url=' + p + 'IQDB</a>' + str;
	},
	_addPview(link) {
		var tNum = (link.pathname.match(/.+?\/[^\d]*(\d+)/) || [,aib.getPostEl(link).post.tNum])[1],
			pNum = (link.textContent.trim().match(/\d+$/) || [tNum])[0],
			pv = this.isPview ? this.kid : Pview.top;
		if(pv && pv.num === pNum) {
			Pview.del(pv.kid);
			setPviewPosition(link, pv.el, Cfg.animation);
			if(pv.parent.num !== this.num) {
				$each($C('de-link-pview', pv.el), function(el) {
					el.classList.remove('de-link-pview');
				});
				pv._markLink(this.num);
			}
			this.kid = pv;
			pv.parent = this;
		} else if(!Cfg.noNavigHidd || !pByNum[pNum] || !pByNum[pNum].hidden) {
			this.kid = new Pview(this, link, tNum, pNum);
		}
	},
	_clickImage(el, e) {
		var data;
		if(el.classList.contains('de-img-full')) {
			if(!this.images.getImageByEl(el.previousSibling.firstElementChild).collapse(e)) {
				return;
			}
		} else if((data = this.images.getImageByEl(el)) && (data.isImage || data.isVideo)) {
			data.expand((Cfg.expandImgs === 1) ^ e.ctrlKey, e);
		} else {
			return;
		}
		$pd(e);
		e.stopPropagation();
	},
	_clickMenu(el) {
		switch(el.getAttribute('info')) {
		case 'spell-sel':
			var start = this._selRange.startContainer,
				end = this._selRange.endContainer;
			if(start.nodeType === 3) {
				start = start.parentNode;
			}
			if(end.nodeType === 3) {
				end = end.parentNode;
			}
			var inMsgSel = aib.qMsg + ', ' + aib.qMsg + ' *';
			if((nav.matchesSelector(start, inMsgSel) && nav.matchesSelector(end, inMsgSel)) ||
			   (nav.matchesSelector(start, '.' + aib.cSubj) && nav.matchesSelector(end, '.' + aib.cSubj)))
			{
				if(this._selText.includes('\n')) {
					addSpell(1 /* #exp */, '/' +
						regQuote(this._selText).replace(/\r?\n/g, '\\n') + '/', false);
				} else {
					addSpell(0 /* #words */, this._selText.toLowerCase(), false);
				}
			} else {
				dummy.innerHTML = '';
				dummy.appendChild(this._selRange.cloneContents());
				addSpell(2 /* #exph */, '/' +
					regQuote(dummy.innerHTML.replace(/^<[^>]+>|<[^>]+>$/g, '')) + '/', false);
			}
			return;
		case 'spell-name': addSpell(6 /* #name */, this.posterName, false); return;
		case 'spell-trip': addSpell(7 /* #trip */, this.posterTrip, false); return;
		case 'spell-img':
			var img = this.images.firstAttach,
				w = img.weight,
				wi = img.width,
				h = img.height;
			addSpell(8 /* #img */, [0, [w, w], [wi, wi, h, h]], false);
			return;
		case 'spell-ihash':
			spawn(ImagesHashStorage.getHash, this.images.firstAttach).then(hash => {
				if(hash !== -1) {
					addSpell(4 /* #ihash */, hash, false);
				}
			});
			return;
		case 'spell-noimg': addSpell(0x108 /* (#all & !#img) */, '', true); return;
		case 'spell-text':
			var num = this.num,
				hidden = this.hidden,
				wrds = Post.getWrds(this.text),
				time = Date.now();
			for(var post = dForm.firstThr.op; post; post = post.next) {
				Post.findSameText(num, hidden, wrds, time, post);
			}
			saveUserPosts();
			return;
		case 'spell-notext': addSpell(0x10B /* (#all & !#tlen) */, '', true); return;
		case 'thr-exp': this.thr.load(parseInt(el.textContent, 10), false);
		}
	},
	_getFull(node, isInit) {
		if(aib.dobr) {
			$del(node.nextSibling);
			$del(node.previousSibling);
			$del(node);
			if(isInit) {
				this.msg.replaceChild($q('.alternate > div', this.el), this.msg.firstElementChild);
			} else {
				var sRunner = new SpellsRunner();
				this.updateMsg($q('.alternate > div', this.el), sRunner);
				sRunner.end();
			}
			return;
		}
		if(aib.mak) {
			$del(node.previousSibling);
			node.previousSibling.style.display = '';
			$del(node);
			return;
		}
		if(!isInit) {
			$popup(Lng.loading[lang], 'load-fullmsg', true);
		}
		ajaxLoad(aib.getThrdUrl(aib.b, this.tNum)).then(form => {
			var maybeSpells = new Maybe(SpellsRunner);
			if(this.isOp) {
				this.updateMsg(replacePost($q(aib.qMsg, form)), maybeSpells.value);
				$del(node);
			} else {
				var els = $Q(aib.qRPost, form);
				for(var i = 0, len = els.length; i < len; i++) {
					if(this.num === aib.getPNum(els[i])) {
						this.updateMsg(replacePost($q(aib.qMsg, els[i])), maybeSpells.value);
						$del(node);
						break;
					}
				}
			}
			maybeSpells.end();
		}, emptyFn);
	},
	_markLink(pNum) {
		$each($Q('a[href*="' + pNum + '"]', this.el), function(num, el) {
			if(el.textContent.startsWith('>>' + num)) {
				el.classList.add('de-link-pview');
			}
		}.bind(null, pNum));
	},
	_strikePostNum(isHide) {
		var num = this.num;
		if(isHide) {
			Post.hiddenNums.push(+num);
		} else {
			var idx = Post.hiddenNums.indexOf(+num);
			if(idx !== -1) {
				Post.hiddenNums.splice(idx, 1);
			}
		}
		$each($Q('a[href*="' + aib.anchor + num + '"]', dForm.el), isHide ? function(el) {
			el.classList.add('de-link-hid');
			if(Cfg.removeHidd && el.classList.contains('de-link-ref')) {
				var refmap = el.parentNode;
				if(!$q('.de-link-ref:not(.de-link-hid)', refmap)) {
					refmap.style.display = 'none';
				}
			}
		} : function(el) {
			el.classList.remove('de-link-hid');
			if(Cfg.removeHidd && el.classList.contains('de-link-ref')) {
				var refmap = el.parentNode;
				if($q('.de-link-ref:not(.de-link-hid)', refmap)) {
					refmap.style.display = '';
				}
			}
		});
	}
};

function PostContent(post) {
	this.el = post.el;
	this.post = post;
}
PostContent.data = {};
PostContent.purgeTO = null;
PostContent.get = function(post) {
	var pNum = post.num,
		rv = PostContent.data[pNum];
	if(!rv) {
		PostContent.data[pNum] = rv = new PostContent(post);
	}
	if(PostContent.purgeTO === null) {
		PostContent.purgeTO = setTimeout(PostContent.purge, 6e4);
	}
	return rv;
};
PostContent.purge = function() {
	if(PostContent.purgeTO !== null) {
		clearTimeout(PostContent.purgeTO);
		PostContent.purgeTO = null;
	}
	PostContent.data = {};
};
PostContent.remove = function(post) {
	PostContent.data[post.num] = null;
};
PostContent.prototype = {
	get html() {
		var val = this.el.innerHTML;
		Object.defineProperty(this, 'html', { value: val });
		return val;
	},
	get posterName() {
		var pName = $q(aib.qName, this.el), val = pName ? pName.textContent.trim().replace(/\s/g, ' ') : '';
		Object.defineProperty(this, 'posterName', { value: val });
		return val;
	},
	get posterTrip() {
		var pTrip = $c(aib.cTrip, this.el), val = pTrip ? pTrip.textContent : '';
		Object.defineProperty(this, 'posterTrip', { value: val });
		return val;
	},
	get subj() {
		var subj = $c(aib.cSubj, this.el), val = subj ? subj.textContent : '';
		Object.defineProperty(this, 'subj', { value: val });
		return val;
	},
	get text() {
		var val = this.post.msg.innerHTML
			.replace(/<\/?(?:br|p|li)[^>]*?>/gi,'\n')
			.replace(/<[^>]+?>/g,'')
			.replace(/&gt;/g, '>')
			.replace(/&lt;/g, '<')
			.replace(/&nbsp;/g, '\u00A0');
		Object.defineProperty(this, 'text', { value: val });
		return val;
	},
	get title() {
		var val = this.subj || this.text.substring(0, 70).replace(/\s+/g, ' ');
		Object.defineProperty(this, 'title', { value: val });
		return val;
	}
};

function PostImages(post) {
	var els = $Q(aib.qThumbImages, post.el),
		filesMap = new WeakMap(),
		data = [],
		hasAttachments = false,
		idx = 0;
	for(var i = 0, len = els.length; i < len; ++i, ++idx) {
		var el = els[i],
			obj = new Attachment(post, el, idx);
		filesMap.set(el, obj);
		data.push(obj);
		hasAttachments = true;
	}
	if(Cfg.addImgs) {
		els = aProto.slice.call($C('de-img-pre', post.el));
		for(var i = 0, len = els.length; i < len; ++i, ++idx) {
			var el = els[i],
				obj = new EmbeddedImage(post, el, idx);
			filesMap.set(el, obj);
			data.push(obj);
		}
	}
	this.data = data;
	this.length = data.length;
	this.hasAttachments = hasAttachments;
	this._map = filesMap;
}
PostImages.prototype = {
	get first() {
		return this.data[0];
	},
	get firstAttach() {
		for(var i = 0; i < this.length; ++i) {
			var obj = this.data[i];
			if(obj instanceof Attachment) {
				return obj;
			}
		}
		return null;
	},
	get last() {
		return this.data[this.length - 1];
	},
	getImageByEl(el) {
		return this._map.get(el);
	}
};


// PREVIEWS
// ===========================================================================================================

function Pview(parent, link, tNum, pNum) {
	this.parent = parent;
	this._link = link;
	this.num = pNum;
	this.thr = parent.thr;
	Object.defineProperty(this, 'tNum', { value: tNum });
	var post = pByNum[pNum];
	if(post && (!post.isOp || !parent.isPview || !parent._loaded)) {
		this._showPost(post);
		return;
	}
	var b = link.pathname.match(/^\/?(.+\/)/)[1].replace(aib.res, '').replace(/\/$/, '');
	post = this._cache && this._cache[b + tNum] && this._cache[b + tNum].getPost(pNum);
	if(post) {
		this._loaded = true;
		this._showPost(post);
	} else {
		this._showText('<span class="de-wait">' + Lng.loading[lang] + '</span>');
		ajaxLoad(aib.getThrdUrl(b, tNum)).then(form => this._onload(b, form), e => this._onerror(e));
	}
}
Pview.clearCache = function() {
	Pview.prototype._cache = {};
};
Pview.del = function(pv) {
	if(!pv) {
		return;
	}
	pv.parent.kid = null;
	pv._link.classList.remove('de-link-parent');
	if(!pv.parent.isPview) {
		Pview.top = null;
	}
	var vPost = Attachment.viewer && Attachment.viewer.data.post;
	do {
		clearTimeout(pv._readDelay);
		if(vPost === pv) {
			Attachment.viewer.close(null);
			Attachment.viewer = vPost = null;
		}
		var el = pv.el;
		if(Cfg.animation) {
			nav.animEvent(el, $del);
			el.classList.add('de-pview-anim');
			el.style[nav.animName] = 'de-post-close-' + (el.aTop ? 't' : 'b') + (el.aLeft ? 'l' : 'r');
		} else {
			$del(el);
		}
	} while((pv = pv.kid));
};
Pview.delTO = 0;
Pview.top = null;
Pview.prototype = Object.create(Post.prototype, {
	isPview: { value: true },
	getTopParent: { value() {
		var post = this.parent;
		while(post.isPview) {
			post = post.parent;
		}
		return post;
	} },
	markToDel: { value() {
		clearTimeout(Pview.delTO);
		var lastSticked, el = this;
		do {
			if(el.sticked) {
				lastSticked = el;
			}
		} while((el = el.kid));
		if(!lastSticked || lastSticked.kid) {
			Pview.delTO = setTimeout(Pview.del, Cfg.linksOut, lastSticked ? lastSticked.kid : this);
		}
	} },
	mouseEnter: { value() {
		if(this.kid) {
			this.kid.markToDel();
		} else {
			clearTimeout(Pview.delTO);
		}
	} },

	_loaded: { value: false, writable: true },
	_cache: { value: {}, writable: true },
	_readDelay: { value: 0, writable: true },
	_handleMouseEvents: { value(el, isOverEvent) {
		if(!el || (el !== this.el && !this.el.contains(el))) {
			if(isOverEvent) {
				this.mouseEnter();
			} else if(Pview.top) {
				Pview.top.markToDel();
			}
		}
	} },
	_onerror: { value(e) {
		Pview.del(this);
		this._showText((e instanceof AjaxError) && e.code === 404 ?
			Lng.postNotFound[lang] : getErrorMessage(e));
	} },
	_onload: { value(b, form) {
		var parent = this.parent,
			parentNum = parent.num,
			cache = this._cache[b + this.tNum] = new PviewsCache(form, b, this.tNum),
			post = cache.getPost(this.num);
		if(post && (aib.b !== b || !post.hasRef || post.ref.indexOf(parentNum) === -1)) {
			var rm;
			if(post.hasRef) {
				rm = $c('de-refmap', post.el);
			} else {
				post.msg.insertAdjacentHTML('afterend', '<div class="de-refmap"></div>');
				rm = post.msg.nextSibling;
			}
			rm.insertAdjacentHTML('afterbegin', '<a class="de-link-ref" href="' +
				aib.getThrdUrl(b, parent.tNum) + aib.anchor +
				parentNum + '">&gt;&gt;' + (aib.b === b ? '' : '/' + aib.b + '/') + parentNum +
				'</a><span class="de-refcomma">, </span>');
		}
		if(parent.kid === this) {
			Pview.del(this);
			if(post) {
				this._loaded = true;
				this._showPost(post);
			} else {
				this._showText(Lng.postNotFound[lang]);
			}
		}
	} },
	_showPost: { value(post) {
		var el = this.el = post.el.cloneNode(true),
			pText = '<span class="de-btn-rep" title="' + Lng.replyToPost[lang] + '"></span>' +
				(post.sage ? '<span class="de-btn-sage" title="SAGE"></span>' : '') +
				'<span class="de-btn-stick" title="' + Lng.attachPview[lang] + '"></span>' +
				(post.deleted ? '' : '<span style="margin-right: 4px; vertical-align: 1px; color: #4f7942; ' +
				'font: bold 11px tahoma; cursor: default;">' + (post.isOp ? 'OP' : post.count + 1) + '</span>');
		el.post = this;
		el.className = aib.cReply + ' de-pview' + (post.viewed ? ' de-viewed' : '');
		el.style.display = '';
		if(Cfg.linksNavig === 2) {
			this._markLink(this.parent.num);
		}
		this._pref = $q(aib.qRef, el);
		this._link.classList.add('de-link-parent');
		if(post.inited) {
			var node = $c('de-post-btns', el);
			this.btns = node;
			this.isOp = post.isOp;
			node.classList.remove('de-post-counter');
			if(post.hidden) {
				node.classList.add('de-post-hide');
			}
			node.innerHTML = '<span class="de-btn-hide' + (post.userToggled ? '-user' : '') +
				'" de-menu="hide" title="' + Lng.togglePost[lang] + '"></span>' + pText;
			$each($Q((!aib.t && post.isOp ? aib.qOmitted + ', ' : '') +
				'.de-img-full, .de-after-fimg', el), $del);
			$each($Q(aib.qThumbImages, el), function(el) {
				el.parentNode.style.display = '';
			});
			node = $c('de-link-parent', el);
			if(node) {
				node.classList.remove('de-link-parent');
			}
			if(Cfg.addYouTube && post.videos.hasLinks) {
				if(post.videos.playerInfo !== null) {
					Object.defineProperty(this, 'videos', {
						value: new Videos(this, $c('de-video-obj', el), post.videos.playerInfo)
					});
				}
				this.videos.updatePost($C('de-video-link', post.el), $C('de-video-link', el), true);
			}
			if(Cfg.addImgs) {
				$each($C('de-img-pre', el), function(el) {
					el.style.display = '';
				});
			}
			if(Cfg.markViewed) {
				this._readDelay = setTimeout(function(pst) {
					if(!pst.viewed) {
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
			embedMediaLinks(this);
			if(Cfg.addYouTube) {
				new VideosParser().parse(this).end();
			}
			if(Cfg.addImgs) {
				embedImagesLinks(el);
			}
			processImageNames(el);
		}
		el.addEventListener('click', this, true);
		this._showPview(el);
	} },
	_showPview: { value(el, id) {
		if(this.parent.isPview) {
			Pview.del(this.parent.kid);
		} else {
			Pview.del(Pview.top);
			Pview.top = this;
		}
		this.parent.kid = this;
		el.addEventListener('mouseover', this, true);
		el.addEventListener('mouseout', this, true);
		dForm.el.appendChild(el);
		setPviewPosition(this._link, el, false);
		if(Cfg.animation) {
			nav.animEvent(el, function(node) {
				node.classList.remove('de-pview-anim');
				node.style[nav.animName] = '';
			});
			el.classList.add('de-pview-anim');
			el.style[nav.animName] = 'de-post-open-' + (el.aTop ? 't' : 'b') + (el.aLeft ? 'l' : 'r');
		}
	} },
	_showText: { value(txt) {
		this._showPview(this.el = $add('<div class="' + aib.cReply + ' de-pview-info de-pview">' +
			txt + '</div>'));
	} },
});

function PviewsCache(form, b, tNum) {
	var pBn = {},
		pProto = Post.prototype,
		thr = $q(aib.qThread, form) || form,
		posts = $Q(aib.qRPost, thr);
	for(var i = 0, len = posts.length; i < len; ++i) {
		var post = posts[i];
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
	this._b = b;
	this._thr = thr;
	this._tNum = tNum;
	this._tUrl = aib.getThrdUrl(b, tNum);
	this._posts = pBn;
	if(Cfg.linksNavig === 2) {
		genRefMap(pBn, this._tUrl);
	}
}
PviewsCache.prototype = {
	getPost(num) {
		if(num === this._tNum) {
			return this._op;
		}
		var pst = this._posts[num];
		if(pst && !pst.pvInited) {
			pst.el = replacePost(pst.el);
			delete pst.msg;
			if(pst.hasRef) {
				addRefMap(pst, this._tUrl);
			}
			pst.pvInited = true;
		}
		return pst;
	},
	get _op() {
		var oOp, op = this._opObj;
		op.el = replacePost(aib.getOp(this._thr));
		op.msg = $q(aib.qMsg, op.el);
		if(this._b === aib.b && (oOp = pByNum[this._tNum])) {
			var i, j, len, rRef = [],
				oRef = op.ref,
				nRef = oOp.ref;
			for(i = j = 0, len = nRef.length; j < len; ++j) {
				var num = nRef[j];
				if(oRef[i] === num) {
					i++;
				} else if(oRef.indexOf(num) !== -1) {
					continue;
				}
				rRef.push(num);
			}
			for(len = oRef.length; i < len; i++) {
				rRef.push(oRef[i]);
			}
			op.ref = rRef;
			if(rRef.length) {
				op.hasRef = true;
				addRefMap(op, this._tUrl);
			}
		} else if(op.hasRef) {
			addRefMap(op, this._tUrl);
		}
		Object.defineProperty(this, '_op', { value: op });
		return op;
	}
};

function PviewMoved() {
	if(this.style[nav.animName]) {
		this.classList.remove('de-pview-anim');
		this.style.cssText = this.newPos;
		this.newPos = false;
		$each($C('de-css-move', doc.head), $del);
		this.removeEventListener(nav.animEnd, PviewMoved);
	}
}

function setPviewPosition(link, pView, isAnim) {
	if(pView.link === link) {
		return;
	}
	var oldCSS, cr = link.getBoundingClientRect(),
		offX = cr.left + window.pageXOffset + link.offsetWidth / 2,
		offY = cr.top + window.pageYOffset,
		bWidth = doc.documentElement.clientWidth,
		isLeft = offX < bWidth / 2,
		tmp = (isLeft ? offX : offX - Math.min(parseInt(pView.offsetWidth, 10), offX - 10)),
		lmw = 'max-width:' + (bWidth - tmp - 10) + 'px; left:' + tmp + 'px;';
	if(isAnim) {
		oldCSS = pView.style.cssText;
		pView.style.cssText = 'opacity: 0; ' + lmw;
	} else {
		pView.style.cssText = lmw;
	}
	var top = pView.offsetHeight,
		isTop = top + cr.top + link.offsetHeight < doc.documentElement.clientHeight || cr.top - top < 5;
	top = (isTop ? offY + link.offsetHeight : offY - top) + 'px';
	pView.link = link;
	pView.aLeft = isLeft;
	pView.aTop = isTop;
	if(!isAnim) {
		pView.style.top = top;
		return;
	}
	var uId = 'de-movecss-' + Math.round(Math.random() * 1e3);
	$css('@' + nav.cssFix + 'keyframes ' + uId + ' {to { ' + lmw + ' top:' + top + '; }}').className =
		'de-css-move';
	if(pView.newPos) {
		pView.style.cssText = pView.newPos;
		pView.removeEventListener(nav.animEnd, PviewMoved);
	} else {
		pView.style.cssText = oldCSS;
	}
	pView.newPos = lmw + ' top:' + top + ';';
	pView.addEventListener(nav.animEnd, PviewMoved);
	pView.classList.add('de-pview-anim');
	pView.style[nav.animName] = uId;
}

function addRefMap(post, tUrl) {
	var bStr = '<a href="' + tUrl + aib.anchor,
		strNums = Cfg.strikeHidd && Post.hiddenNums.length ? Post.hiddenNums : null,
		html = ['<div class="de-refmap">'],
		el = post.ref;
	for(var i = 0, len = el.length; i < len; ++i) {
		var num = el[i];
		html.push(bStr, num, '" class="de-link-ref ',
			(strNums && strNums.indexOf(+num) !== -1 ? 'de-link-hid' : ''),
			'">&gt;&gt;', num, '</a><span class="de-refcomma">, </span>');
	}
	html.push('</div>');
	if(aib.dobr) {
		el = post.msg.nextElementSibling;
		if(el) {
			el.insertAdjacentHTML('beforeend', html.join(''));
		}
	} else {
		post.msg.insertAdjacentHTML('afterend', html.join(''));
	}
}

function genRefMap(posts, thrURL) {
	var opNums = dForm.tNums;
	for(var pNum in posts) {
		aib.forEachReflink(posts[pNum].msg, (link, lNum) => {
			var ref, post = posts[lNum];
			if(!post) {
				return;
			}
			ref = post.ref;
			if(ref.indexOf(pNum) === -1) {
				ref.push(pNum);
				post.hasRef = true;
			}
			if(!aib.hasOPNum && opNums.indexOf(lNum) !== -1) {
				link.classList.add('de-ref-op');
			}
			if(thrURL) {
				var url = link.getAttribute('href');
				if(url[0] === '#') {
					link.setAttribute('href', thrURL + url);
				}
			}
		});
	}
}

function updRefMap(post, add) {
	var pNum = post.num,
		strNums = add && Cfg.strikeHidd && Post.hiddenNums.length ? Post.hiddenNums : null,
		isThr = aib.t;
	aib.forEachReflink(post.msg, (link, lNum) => {
		var lPost = pByNum[lNum];
		if(!lPost) {
			return;
		}
		if(!isThr) {
			link.href = '#' + (aib.fch ? 'p' : '') + lNum;
		}
		if(add) {
			if(strNums && strNums.lastIndexOf(lNum) !== -1) {
				link.classList.add('de-link-hid');
			}
			if(!aib.hasOPNum && dForm.tNums.indexOf(lNum) !== -1) {
				link.classList.add('de-ref-op');
			}
			if(lPost.ref.indexOf(pNum) === -1) {
				lPost.ref.push(pNum);
				post.hasRef = true;
				if(Cfg.hideRefPsts && lPost.hidden) {
					if(!post.hidden) {
						post.hideRefs();
					}
					post.setVisib(true);
					post.setNote('reference to >>' + lNum);
				}
			} else {
				return;
			}
		} else if(lPost.hasRef) {
			var ref = lPost.ref,
				idx = ref.indexOf(pNum);
			if(idx === -1) {
				return;
			}
			ref.splice(idx, 1);
			if(!ref.length) {
				lPost.hasRef = false;
				$del($c('de-refmap', lPost.el));
				return;
			}
		}
		$del($c('de-refmap', lPost.el));
		addRefMap(lPost, '');
	});
}


// THREADS
// ===========================================================================================================

function Thread(el, prev, isLight) {
	var els = $Q(aib.qRPost, el),
		len = els.length,
		num = aib.getTNum(el),
		omt = aib.t ? 1 : aib.getOmitted($q(aib.qOmitted, el), len);
	this.num = num;
	this.pcount = omt + len;
	this.el = el;
	this.prev = prev;
	if(prev) {
		prev.next = this;
	}
	var lastPost = this.op = el.post = new Post(aib.getOp(el), this, num, 0, true,
		prev ? prev.last : null, isLight);
	pByNum[num] = lastPost;
	for(var i = 0; i < len; i++) {
		var pEl = els[i];
		num = aib.getPNum(pEl);
		pByNum[num] = lastPost = new Post(pEl, this, num, omt + i, false, lastPost, isLight);
	}
	this.last = lastPost;
	if(isLight) {
		return;
	}
	el.style.counterReset = 'de-cnt ' + omt;
	el.removeAttribute('id');
	el.setAttribute('de-thread', null);
	visPosts = Math.max(visPosts, len);
	if(aib._420 || aib.tiny) {
		var temp = el.lastChild;
		if(temp !== this.op.el) {
			$after(el, temp);
		}
		$del($c('clear', el));
	}
	if(!aib.t) {
		el.insertAdjacentHTML('beforeend', '<div class="de-thread-buttons">' +
			'<span class="de-thread-updater">[<a class="de-abtn" href="#"></a>]</span>');
		this.btns = el.lastChild;
		this.btns.firstElementChild.onclick = e => {
			$pd(e);
			this.load(0, false);
		};
	}
}
Thread.clearPostsMark = function() {
	dForm.firstThr.clearPostsMarks();
};
Thread.prototype = {
	hasNew: false,
	hidden: false,
	loadedOnce: false,
	next: null,
	get lastNotDeleted() {
		var post = this.last;
		while(post.deleted) {
			post = post.prev;
		}
		return post;
	},
	get nextNotHidden() {
		for(var thr = this.next; thr && thr.hidden; thr = thr.next) {}
		return thr;
	},
	get prevNotHidden() {
		for(var thr = this.prev; thr && thr.hidden; thr = thr.prev) {}
		return thr;
	},
	get topCoord() {
		return this.op.topCoord;
	},
	addPost(parent, el, i, prev, maybeVParser) {
		var post, num = aib.getPNum(el),
			wrap = aib.getWrap(el, false);
		el = replacePost(el);
		pByNum[num] = post = new Post(el, this, num, i, false, prev);
		Object.defineProperty(post, 'wrap', { value: wrap });
		parent.appendChild(wrap);
		if(aib.t && updater.focused && Cfg.animation) {
			nav.animEvent(post.el, function(node) {
				node.classList.remove('de-post-new');
			});
			post.el.classList.add('de-post-new');
		}
		if(maybeVParser.value) {
			maybeVParser.value.parse(post);
		}
		processImageNames(el);
		post.addFuncs();
		preloadImages(el);
		if(aib.t && Cfg.markNewPosts) {
			this._addPostMark(el, false);
		}
		return post;
	},
	clearPostsMarks() {
		if(this.hasNew) {
			this.hasNew = false;
			$each($Q('.de-new-post', this.el), function(el) {
				el.classList.remove('de-new-post');
			});
			doc.removeEventListener('click', Thread.clearPostsMark, true);
		}
	},
	deletePost(post, delAll, removePost) {
		var count = 0,
			idx = post.count;
		do {
			if(removePost) {
				$del(post.wrap);
				delete pByNum[post.num];
				if(post.hidden) {
					post.unhideRefs();
				}
				updRefMap(post, false);
				if((post.prev.next = post.next)) {
					post.next.prev = post.prev;
				}
				if(this.last === post) {
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
		} while(delAll && post);
		if(!spells.hasNumSpell) {
			sVis.splice(idx, count);
		}
		for(var tPost = post; tPost; tPost = tPost.nextInThread) {
			tPost.count -= count;
		}
		this.pcount -= count;
		return post;
	},
	load(last, smartScroll, informUser = true) {
		if(informUser) {
			$popup(Lng.loading[lang], 'load-thr', true);
		}
		return ajaxLoad(aib.getThrdUrl(aib.b, this.num)).then(
			form => this.loadFromForm(last, smartScroll, form),
			e => $popup(getErrorMessage(e), 'load-thr', false)
		);
	},
	loadFromForm(last, smartScroll, form) {
		var nextCoord, loadedPosts = $Q(aib.qRPost, form),
			maybeSpells = new Maybe(SpellsRunner),
			op = this.op,
			thrEl = this.el;
		if(smartScroll) {
			if(this.next) {
				nextCoord = this.next.topCoord;
			} else {
				smartScroll = false;
			}
		}
		pr.closeReply();
		$del($q(aib.qOmitted + ', .de-omitted', thrEl));
		if(!this.loadedOnce) {
			if(op.trunc) {
				op.updateMsg(replacePost($q(aib.qMsg, form)), maybeSpells.value);
			}
			op.ref = [];
			this.loadedOnce = true;
		}
		this._checkBans(form);
		aib.checkForm(form, maybeSpells);
		this._parsePosts(loadedPosts);
		var needToHide, needToOmit, needToShow, post = op.next,
			needRMUpdate = false,
			existed = this.pcount === 1 ? 0 : this.pcount - post.count;
		switch(last) {
		case 0: // get new posts
			needToHide = $C('de-hidden', thrEl).length;
			needToOmit = needToHide + post.count - 1;
			needToShow = loadedPosts.length - needToOmit;
			break;
		case 1: // get all posts
			needToHide = needToOmit = 0;
			needToShow = loadedPosts.length;
			break;
		default: // get last posts
			needToHide = Math.max(existed - last, 0);
			needToOmit = Math.max(loadedPosts.length - last, 0);
			needToShow = last;
		}
		if(needToHide) {
			while(existed-- !== needToShow) {
				post.wrap.classList.add('de-hidden');
				post.omitted = true;
				post = post.next;
			}
		} else {
			var fragm = doc.createDocumentFragment(),
				tPost = op,
				nonExisted = loadedPosts.length - existed,
				maybeVParser = new Maybe(Cfg.addYouTube ? VideosParser : null);
			for(var i = Math.max(0, nonExisted + existed - needToShow); i < nonExisted; ++i) {
				tPost = this.addPost(fragm, loadedPosts[i], i + 1, tPost, maybeVParser);
				maybeSpells.value.run(tPost);
			}
			maybeVParser.end();
			$after(op.wrap, fragm);
			tPost.next = post;
			if(post) {
				post.prev = tPost;
			}
			needRMUpdate = true;
			needToShow = Math.min(nonExisted + existed, needToShow);
		}
		while(existed-- !== 0) {
			if(post.trunc) {
				post.updateMsg(replacePost($q(aib.qMsg, loadedPosts[post.count - 1])), maybeSpells.value);
			}
			if(post.omitted) {
				post.wrap.classList.remove('de-hidden');
				post.omitted = false;
			}
			if(needRMUpdate) {
				updRefMap(post, true);
			}
			post = post.next;
		}
		maybeSpells.end();
		thrEl.style.counterReset = 'de-cnt ' + (needToOmit - needToHide + 1);
		var btn = this.btns;
		if(btn !== thrEl.lastChild) {
			thrEl.appendChild(btn);
		}
		if(!$c('de-thread-collapse', btn)) {
			btn.insertAdjacentHTML('beforeend',
				'<span class="de-thread-collapse"> [<a class="de-abtn" href="#"></a>]</span>');
			btn.lastChild.onclick = e => {
				$pd(e);
				this.load(visPosts, true);
			};
		}
		btn.lastChild.style.display = needToShow > visPosts ? '' : 'none';
		if(needToOmit > 0) {
			op.el.insertAdjacentHTML('afterend', '<div class="de-omitted">' + needToOmit + '</div>');
		}
		if(smartScroll) {
			scrollTo(window.pageXOffset, window.pageYOffset - (nextCoord - this.next.topCoord));
		}
		closePopup('load-thr');
	},
	loadNew: function(useAPI) {
		if(aib.dobr && useAPI) {
			return getJsonPosts('/api/thread/' + aib.b + '/' + aib.t + '.json').then(json => {
				if(json) {
					if(json.error) {
						return CancelablePromise.reject(new AjaxError(0, json.message));
					}
					if(this._lastModified !== json.last_modified || this.pcount !== json.posts_count) {
						this._lastModified = json.last_modified;
						return this.loadNew(false);
					}
				}
				return 0;
			});
		}
		return ajaxLoad(aib.getThrdUrl(aib.b, aib.t), true, !aib.dobr)
			.then(form => form ? this.loadNewFromForm(form) : 0);
	},
	loadNewFromForm(form) {
		this._checkBans(form);
		aib.checkForm(form, null);
		var lastOffset = pr.isVisible ? pr.topCoord : null,
			[newPosts, newVisPosts] = this._parsePosts($Q(aib.qRPost, form));
		if(lastOffset !== null) {
			scrollTo(window.pageXOffset, window.pageYOffset - (lastOffset - pr.topCoord));
		}
		if(newPosts !== 0) {
			panel.updateCounter(this.pcount, $Q(aib.qThumbImages, dForm.el).length);
		}
		return newVisPosts;
	},
	setFavBtn(state) {
		var el = $c(state ? 'de-btn-fav' : 'de-btn-fav-sel', this.op.btns);
		if(el) {
			el.className = state ? 'de-btn-fav-sel' : 'de-btn-fav';
			el.title = state ? Lng.delFav[lang] : Lng.addFav[lang];
		}
	},
	setFavorState(val, type) {
		this.setFavBtn(val);
		readFav().then(fav => {
			var b = aib.b,
				h = aib.host;
			if(val) {
				if(!fav[h]) {
					fav[h] = {};
				}
				if(!fav[h][b]) {
					fav[h][b] = {};
				}
				fav[h][b].url = aib.prot + '//' + aib.host + aib.getPageUrl(b, 0);
				fav[h][b][this.num] = {
					'cnt': this.pcount,
					'new': 0,
					'txt': this.op.title,
					'url': aib.getThrdUrl(b, this.num),
					'last': aib.anchor + this.last.num,
					'type': type
				};
			} else {
				removeFavoriteEntry(fav, h, b, this.num, false);
			}
			saveFavorites(fav);
		});
	},
	updateHidden(data) {
		var date = Date.now(),
			thr = this;
		do {
			var realHid = thr.num in data;
			if(thr.hidden ^ realHid) {
				if(realHid) {
					thr.op.setUserVisib(true, date, false);
					data[thr.num] = thr.op.title;
				} else if(thr.hidden) {
					thr.op.setUserVisib(false, date, false);
				}
			}
		} while((thr = thr.next));
	},

	_lastModified: '',
	_addPostMark(postEl, forced) {
		if(updater.focused && !forced) {
			this.clearPostsMarks();
		} else {
			if(!this.hasNew) {
				this.hasNew = true;
				doc.addEventListener('click', Thread.clearPostsMark, true);
			}
			postEl.classList.add('de-new-post');
		}
	},
	_checkBans(thrNode) {
		if(!aib.qBan) {
			return;
		}
		var bEls = $Q(aib.qBan, thrNode);
		for(var i = 0, len = bEls.length; i < len; ++i) {
			var bEl = bEls[i],
				pEl = aib.getPostEl(bEl),
				post = pEl ? pByNum[aib.getPNum(pEl)] : this.op;
			if(post && !post.banned) {
				if(!$q(aib.qBan, post.el)) {
					post.msg.appendChild(bEl);
				}
				post.banned = true;
			}
		}
	},
	_importPosts(last, newPosts, begin, end, maybeVParser, maybeSpells) {
		var newCount = end - begin,
			newVisCount = newCount,
			fragm = doc.createDocumentFragment();
		for(; begin < end; ++begin) {
			last = this.addPost(fragm, newPosts[begin], begin + 1, last, maybeVParser);
			newVisCount -= maybeSpells.value.run(last);
		}
		return [newCount, newVisCount, fragm, last];
	},
	_parsePosts(nPosts) {
		var maybeSpells = new Maybe(SpellsRunner),
			newPosts = 0,
			newVisPosts = 0,
			len = nPosts.length,
			post = this.lastNotDeleted,
			maybeVParser = new Maybe(Cfg.addYouTube ? VideosParser : null);
		if(aib.dobr || (post.count !== 0 &&
		   (post.count > len || aib.getPNum(nPosts[post.count - 1]) !== post.num)))
		{
			post = this.op.nextNotDeleted;
			var i, firstChangedPost = null;
			for(i = post.count - 1; i < len && post; ) {
				if(post.num === aib.getPNum(nPosts[i])) {
					i++;
					post = post.nextNotDeleted;
					continue;
				}
				if(+post.num > +aib.getPNum(nPosts[i])) {
					if(!firstChangedPost) {
						firstChangedPost = post.prev;
					}
					var cnt = 0;
					do {
						cnt++;
						i++;
					} while(+aib.getPNum(nPosts[i]) < +post.num);
					var res = this._importPosts(post.prev, nPosts, i - cnt, i, maybeVParser, maybeSpells);
					newPosts += res[0];
					this.pcount += res[0];
					newVisPosts += res[1];
					$after(post.prev.wrap, res[2]);
					res[3].next = post;
					post.prev = res[3];
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
				disableSpells();
				for(post = firstChangedPost.nextInThread; post; post = post.nextInThread) {
					maybeSpells.value.run(post);
				}
			}
			if(newPosts !== 0) {
				for(post = firstChangedPost; post; post = post.nextInThread) {
					updRefMap(post, true);
				}
			}
		}
		if(len + 1 > this.pcount) {
			var res = this._importPosts(this.last, nPosts, this.lastNotDeleted.count, len, maybeVParser, maybeSpells);
			newPosts += res[0];
			newVisPosts += res[1];
			this.el.appendChild(res[2]);
			this.last = res[3];
			this.pcount = len + 1;
		}
		readFav().then(fav => {
			var f = fav[aib.host];
			if(!f || !f[aib.b]) {
				return;
			}
			if((f = f[aib.b][this.op.num])) {
				var el = $q('#de-win-fav > .de-win-body', doc);
				if(el.hasChildNodes()) {
					el = $q('.de-fav-current > .de-entry[de-num="' + this.op.num + '"] .de-fav-inf-new', el);
					el.style.display = 'none';
					el.textContent = 0;
					el = el.nextElementSibling;
					el.textContent = this.pcount;
				}
				f.cnt = this.pcount;
				f['new'] = 0;
				f.last = aib.anchor + this.last.num;
				setStored('DESU_Favorites', JSON.stringify(fav));
			}
		});
		maybeVParser.end();
		maybeSpells.end();
		return [newPosts, newVisPosts];
	}
};


// BROWSER
// ===========================================================================================================

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
		console.log('WEBSTORAGE ERROR: please, enable webstorage!');
		return false;
	}
	return true;
}

function initNavFuncs() {
	if(!('includes' in String.prototype)) {
		String.prototype.includes = String.prototype.contains || function(s) {
			return this.indexOf(s) !== -1;
		};
	}
	if(!('startsWith' in String.prototype)) {
		String.prototype.startsWith = function(s) {
			return this.indexOf(s) === 0;
		};
	}
	if(!('repeat' in String.prototype)) {
		String.prototype.repeat = function(nTimes) {
			return new Array(nTimes + 1).join(this.valueOf());
		};
	}
	if(!('clz32' in Math)) {
		Math.clz32 = function(x) {
			return x < 1 ? x === 0 ? 32 : 0 : 31 - ((Math.log(x) / Math.LN2) >> 0);
		};
	}
	if(!('assign' in Object)) {
		Object.assign = function(a, b) {
			for(var i in b) {
				a[i] = b[i];
			}
			return a;
		};
	}
	if('toJSON' in aProto) {
		delete aProto.toJSON;
	}
	try {
		new File([''], '');
	} catch(e) {
		window.File = function File(arr, name) {
			var rv = new Blob(arr);
			rv.name = name;
			rv.lastModifiedDate = new Date();
			rv.__proto__ = File.prototype;
			return rv;
		};
		File.prototype = new Blob;
		var origAppend = FormData.prototype.append;
		FormData.prototype.append = function append(name, value, fileName = null) {
			if((value instanceof Blob) && ('name' in value) && fileName === null) {
				return origAppend.call(this, name, value, value.name);
			}
			return origAppend.apply(this, arguments);
		};
	}
	var ua = window.navigator.userAgent,
		firefox = ua.includes('Gecko/'),
		presto = window.opera ? +window.opera.version() : 0,
		webkit = ua.includes('WebKit/'),
		chrome = webkit && ua.includes('Chrome/'),
		safari = webkit && !chrome,
		isGM = false,
		isChromeStorage = window.chrome && !!window.chrome.storage,
		isScriptStorage = !!scriptStorage && !ua.includes('Opera Mobi');
	try {
		isGM = (typeof GM_setValue === 'function') &&
			(!chrome || !GM_setValue.toString().includes('not supported'));
	} catch(e) {}
	nav = {
		get ua() {
			return navigator.userAgent + (this.Firefox ? ' [' + navigator.buildID + ']' : '');
		},
		Firefox: firefox,
		Presto: presto,
		WebKit: webkit,
		Chrome: chrome,
		Safari: safari,
		isGM: isGM,
		isChromeStorage: isChromeStorage,
		isScriptStorage: isScriptStorage,
		isGlobal: isGM || isChromeStorage || isScriptStorage,
		scriptInstall: (firefox ? (typeof GM_info !== 'undefined' ? 'Greasemonkey' : 'Scriptish') :
			isChromeStorage ? 'Chrome extension' :
			isGM ? 'Monkey' : 'Native userscript'),
		cssFix: webkit ? '-webkit-' : '',
		animName: webkit ? 'webkitAnimationName' : 'animationName',
		animEnd: webkit ? 'webkitAnimationEnd' : 'animationend',
		animEvent(el, fn) {
			el.addEventListener(this.animEnd, function aEvent() {
				this.removeEventListener(nav.animEnd, aEvent);
				fn(this);
				fn = null;
			});
		},
		fixLink: safari ? getAbsLink : function fixLink(url) {
			return url;
		},
		get hasWorker() {
			var val = false;
			try {
				val = 'Worker' in window && 'URL' in window;
			} catch(e) {}
			if(val && this.Firefox) {
				val = +(navigator.userAgent.match(/rv:(\d{2})/) || [])[1] >= 40;
			}
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
				val = Function.prototype.call.bind(
					dE.matches || dE.mozMatchesSelector ||
					dE.webkitMatchesSelector || dE.oMatchesSelector);
			Object.defineProperty(this, 'matchesSelector', { value: val });
			return val;
		},
		// See https://github.com/greasemonkey/greasemonkey/issues/2034 for more info
		getUnsafeUint8Array(data, i = 0, len = null) {
			var rv;
			if(len === null) {
				rv = new Uint8Array(data, i);
				return (rv instanceof Uint8Array) ? rv : new unsafeWindow.Uint8Array(data, i);
			}
			rv = new Uint8Array(data, i, len);
			return (rv instanceof Uint8Array) ? rv : new unsafeWindow.Uint8Array(data, i, len);
		},
		getUnsafeDataView(data, offset) {
			var rv = new DataView(data, offset || 0);
			return (rv instanceof DataView) ? rv : new unsafeWindow.DataView(data, offset || 0);
		}
	};
}


// IMAGEBOARD
// ===========================================================================================================

function getImageBoard(checkDomains, checkEngines) {
	var prot = window.location.protocol;
	var ibDomains = {
		'02ch.net': [{
			qPostRedir: { value: 'input[name="gb2"][value="thread"]' },
			ru: { value: true },
			timePattern: { value: 'yyyy+nn+dd++w++hh+ii+ss' }
		}],
		'2chru.net': [{
			_2chru: { value: true },

			css: { value: '.small { display: none; }' }
		}, 'form[action*="imgboard.php?delete"]'],
		get '2-chru.net'() { return this['2chru.net']; },
		get '2-ch.su'() { return this['2--ch.ru']; },
		'2--ch.ru': [{
			tire: { value: true },

			qPages: { value: 'table[border="1"] tr:first-of-type > td:first-of-type a' },
			qPostRedir: { value: null },
			qTable: { value: 'table:not(.postfiles)' },
			qThread: { value: '.threadz' },
			getCaptchaSrc: { value(src, tNum) {
				return '/' + this.b + '/captcha.fpl?' + Math.random();
			} },
			getOmitted: { value(el, len) {
				var txt;
				return el && (txt = el.textContent) ? +(txt.match(/\d+/) || [0])[0] - len : 1;
			} },
			getPageUrl: { value(b, p) {
				return fixBrd(b) + (p > 0 ? p : 0) + '.memhtml';
			} },
			css: { value: 'span[id$="_display"], #fastload { display: none; }' },
			docExt: { value: '.html' },
			fixFileInputs: { value(el) {
				var str = '><input name="file" maxlength="4" ' +
					'accept="|sid|7z|bz2|m4a|flac|lzh|mo3|rar|spc|fla|nsf|jpg|mpp|aac|gz|xm|wav|' +
					'mp3|png|it|lha|torrent|swf|zip|mpc|ogg|jpeg|gif|mod" type="file"></input></div>';
				el.parentNode.innerHTML = '<div' + str + ('<div style="display: none;"' + str).repeat(3);
			} },
			hasPicWrap: { value: true },
			markupBB: { value: true },
			multiFile: { value: true },
			ru: { value: true }
		}],
		get '2ch.hk'() { return [ibEngines['body.makaba']]; },
		get '2ch.pm'() { return [ibEngines['body.makaba']]; },
		'410chan.org': [{
			_410: { value: true },

			qPostRedir: { value: 'input#noko' },
			getCaptchaSrc: { value(src, tNum) {
				return src.replace(/\?[^?]+$|$/, '?board=' + aib.b + '&' + Math.random());
			} },
			getSage: { value(post) {
				var el = $c('filetitle', post);
				return el && el.textContent.includes('\u21E9');
			} },
			css: { value: '#resizer { display: none; }' },
			markupBB: { value: false },
			markupTags: { value: ['**', '*', '__', '^^', '%%', '`', '', '', 'q'] },
			timePattern: { value: 'dd+nn+yyyy++w++hh+ii+ss' }
		}, 'script[src*="kusaba"]'],
		'420chan.org': [{
			_420: { value: true },

			qBan: { value: '.ban' },
			qError: { value: 'pre' },
			qHide: { value: '.replyheader ~ *' },
			qPages: { value: '.pagelist > a:last-child' },
			qPostRedir: { value: null },
			qThread: { value: '[id*="thread"]' },
			getTNum: { value(op) {
				return $q('a[id]', op).id.match(/\d+/)[0];
			} },
			css: { value: '#content > hr, .hidethread, .ignorebtn, .opqrbtn, .qrbtn, noscript { display: none !important; }\
				.de-thr-hid { margin: 1em 0; }' },
			docExt: { value: '.php' },
			markupBB: { value: true },
			markupTags: { value: ['**', '*', '', '', '%', 'pre', '', '', 'q'] }
		}],
		'4chan.org': [{
			fch: { value: true },

			cFileInfo: { value: 'fileText' },
			cOPost: { value: 'op' },
			cReply: { value: 'post reply' },
			cSubj: { value: 'subject' },
			qBan: { value: 'strong[style="color: red;"]' },
			qClosed: { value: '.archivedIcon' },
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
			getFileInfo: { value(wrap) {
				var el = $c(this.cFileInfo, wrap);
				return el ? el.lastChild.textContent : '';
			} },
			getPageUrl: { value(b, p) {
				return fixBrd(b) + (p > 1 ? p : '');
			} },
			getSage: { value(post) {
				return !!$q('.id_Heaven, .useremail[href^="mailto:sage"]', post);
			} },
			getTNum: { value(op) {
				return $q('input[type="checkbox"]', op).name.match(/\d+/)[0];
			} },
			getWrap: { value(el, isOp) {
				return el.parentNode;
			} },
			anchor: { value: '#p' },
			css: { value: '.backlink, #blotter, .extButton, hr.desktop, .navLinks, .postMenuBtn, #togglePostFormLink { display: none !important; }\
				.postForm { display: table !important; width: auto !important; }\
				textarea { margin-right: 0 !important; }' },
			docExt: { value: '' },
			firstPage: { value: 1 },
			init: { value() {
				Cfg.findImgFile = 0;
				var el = $id('captchaFormPart');
				if(el) {
					doc.body.insertAdjacentHTML('beforeend', '<div style="display: none;">' +
						'<div onclick="initRecaptcha();"></div></div>');
					this.updateCaptcha = function(el, focus) {
						$id('g-recaptcha').innerHTML = '';
						this.click();
						el.style.display = '';
					}.bind(doc.body.lastChild.firstChild, el);
				}
				return false;
			} },
			markupBB: { value: true },
			markupTags: { value: ['', '', '', '', 'spoiler', '', '', '', 'q'] },
			rep: { value: true },
			res: { value: 'thread/' },
			timePattern: { value: 'nn+dd+yy+w+hh+ii-?s?s?' },
			thrid: { value: 'resto' }
		}],
		'7chan.org': [{
			init: { value() { return true; } }
		}],
		'8ch.net': [{
			_8ch: { value: true },

			css: { value: '.fileinfo { width: 250px; }\
				.multifile { width: auto !important; }\
				.post-btn { display: none !important; }' },
			earlyInit: { value() {
				if(locStorage['file_dragdrop'] === 'true') {
					locStorage['file_dragdrop'] = false;
					return true;
				}
				return false;
			} },
			init: { value: null }, // Don't run tinyboard init function
			fixFileInputs: { value(el) {
				var str = '';
				for(var i = 0, len = 5; i < len; ++i) {
					str += '<div' + (i === 0 ? '' : ' style="display: none;"') +
						'><input type="file" name="file' + (i === 0 ? '' : i + 1) + '"></div>';
				}
				$id('upload').lastChild.innerHTML = str;
			} },
			multiFile: { value: true }
		}, 'form[name*="postcontrols"]'],
		'arhivach.org': [{
			cReply: { value: 'post' },
			qDForm: { value: 'body > .container-fluid' },
			qHide: { value: '.post_comment' },
			qMsg: { value: '.post_comment_body' },
			qRef: { value: '.post_id, .post_head > b' },
			qRPost: { value: '.post:not(:first-child):not([postid=""])' },
			qThread: { value: '.thread_inner' },
			getOp: { value(el) {
				return $q('.post:first-child', el);
			} },
			getPNum: { value(post) {
				return post.getAttribute('postid');
			} },
			getTNum: { value(el) {
				return this.getOp(el).getAttribute('postid');
			} },
			getThrdUrl: { value(b, tNum) {
				return $q('link[rel="canonical"]', doc.head).href;
			} },
			init: { value() {
				setTimeout(function() {
					var delPosts = $Q('.post[postid=""]', doc);
					for(var i = 0, len = delPosts.length; i < len; ++i) {
						try {
							var post = pByNum[$q('blockquote', delPosts[i]).getAttribute('id').substring(1)];
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
			} },
			css: { value: '.post_replies, .post[postid=""] { display: none !important; }\
				.post { overflow-x: auto !important; }' },
			docExt: { value: '' },
			res: { value: 'thread/' }
		}],
		'diochan.com': [{
			dio: { value: true },

			css: { value: '.resize { display: none; }' }
		}, 'script[src*="kusaba"]'],
		get 'dmirrgetyojz735v.onion'() { return this['2chru.net']; },
		'dobrochan.com': [{
			dobr: { value: true },

			anchor: { value: '#i' },
			cFileInfo: { value: 'fileinfo' },
			cSubj: { value: 'replytitle' },
			qClosed: { value: 'img[src="/images/locked.png"]' },
			qDForm: { value: 'form[action*="delete"]' },
			qError: { value: '.post-error, h2' },
			qMsg: { value: '.postbody' },
			qOmitted: { value: '.abbrev > span:last-of-type' },
			qPages: { value: '.pages > tbody > tr > td' },
			qPostRedir: { value: 'select[name="goto"]' },
			qTrunc: { value: '.abbrev > span:nth-last-child(2)' },
			getImgLink: { value(img) {
				var el = img.parentNode;
				return el.tagName === 'A' ? el :
					$q('.fileinfo > a', img.previousElementSibling ? el : el.parentNode);
			} },
			getImgWrap: { value(el) {
				return el.tagName === 'A' ? (el.previousElementSibling ? el : el.parentNode).parentNode :
					el.firstElementChild.tagName === 'IMG' ? el.parentNode : el;
			} },
			getPageUrl: { value(b, p) {
				return fixBrd(b) + (p > 0 ? p + this.docExt : 'index.xhtml');
			} },
			getTNum: { value(op) {
				return $q('a[name]', op).name.match(/\d+/)[0];
			} },
			insertYtPlayer: { value(msg, playerHtml) {
				var prev = msg.previousElementSibling,
					node = prev.tagName === 'BR' ? prev : msg;
				node.insertAdjacentHTML('beforebegin', playerHtml);
				return node.previousSibling;
			} },
			css: { value: '.delete > img, .popup, .reply_, .search_google, .search_iqdb { display: none; }\
				.delete { background: none; }\
				.delete_checkbox { position: static !important; }\
				.file + .de-video-obj { float: left; margin: 5px 20px 5px 5px; }\
				.de-video-obj + div { clear: left; }' },
			disableRedirection: { value(el) {
				($q(this.qPostRedir, el) || {}).selectedIndex = 1;
			} },
			fixFileInputs: { value(el) {
				el = $id('files_parent');
				$each($Q('input[type="file"]', el), function(el) {
					el.removeAttribute('onchange');
				});
				el.firstElementChild.value = 1;
			} },
			hasPicWrap: { value: true },
			init: { value() {
				if(window.location.pathname === '/settings') {
					if(!nav) {
						initNavFuncs();
					}
					$q('input[type="button"]', doc).addEventListener('click', function() {
						spawn(readCfg).then(() => saveCfg('__hanarating', $id('rating').value));
					});
					return true;
				}
				return false;
			} },
			multiFile: { value: true },
			ru: { value: true },
			timePattern: { value: 'dd+m+?+?+?+?+?+yyyy++w++hh+ii-?s?s?' }
		}],
		get 'dobrochan.org'() { return this['dobrochan.com']; },
		get 'dobrochan.ru'() { return this['dobrochan.com']; },
		'dva-ch.net': [{
			dvachnet: { value: true },

			ru: { value: true }
		}],
		'iichan.hk': [{
			iich: { value: true },

			css: { get() {
				return `${this.t ? '#de-main { margin-top: -37px; }\
					.logo { margin-bottom: 14px; }' : ''}`;
			} },
			init: { value() {
				doc.body.insertAdjacentHTML('beforeend', '<div onclick="highlight = function() {}"></div>');
				doc.body.lastChild.click();
				return false;
			} },
		}],
		'inach.org': [{
			qPostRedir: { value: 'input[name="fieldnoko"]' },
			markupBB: { value: true },
			timePattern: { value: 'nn+dd+yyyy++w++hh+ii+ss' }
		}],
		'krautchan.net': [{
			krau: { value: true },

			cFileInfo: { value: 'fileinfo' },
			cReply: { value: 'postreply' },
			cSubj: { value: 'postsubject' },
			qBan: { value: '.ban_mark' },
			qClosed: { value: 'img[src="/images/locked.gif"]' },
			qDForm: { value: 'form[action*="delete"]' },
			qError: { value: '.message_text' },
			qHide: { value: 'div:not(.postheader)' },
			qImgLink: { value: '.filename > a' },
			qOmitted: { value: '.omittedinfo' },
			qPages: { value: 'table[border="1"] > tbody > tr > td > a:nth-last-child(2) + a' },
			qPostRedir: { value: 'input#forward_thread' },
			qRef: { value: '.postnumber' },
			qRPost: { value: '.postreply' },
			qThread: { value: '.thread_body' },
			qThumbImages: { value: 'img[id^="thumbnail_"]' },
			qTrunc: { value: 'p[id^="post_truncated"]' },
			getImgWrap: { value(el) {
				return el.parentNode;
			} },
			getSage: { value(post) {
				return !!$c('sage', post);
			} },
			getTNum: { value(op) {
				return $q('input[type="checkbox"]', op).name.match(/\d+/)[0];
			} },
			insertYtPlayer: { value(msg, playerHtml) {
				var pMsg = msg.parentNode,
					prev = pMsg.previousElementSibling,
					node = prev.hasAttribute('style') ? prev : pMsg;
				node.insertAdjacentHTML('beforebegin', playerHtml);
				return node.previousSibling;
			} },
			css: { value: 'img[src$="button-expand.gif"], img[src$="button-close.gif"], body > center > hr, form > div:first-of-type > hr, h2, .sage { display: none; }\
				div[id^="Wz"] { z-index: 10000 !important; }\
				.de-thr-hid { float: none; }\
				.file_reply + .de-video-obj, .file_thread + .de-video-obj { margin: 5px 20px 5px 5px; float: left; }\
				.de-video-obj + div { clear: left; }\
				form[action="/paint"] > select { width: 105px; }\
				form[action="/paint"] > input[type="text"] { width: 24px !important; }' },
			fixFileInputs: { value(el) {
				var str = '';
				for(var i = 0, len = 4; i < len; ++i) {
					str += '<div' + (i === 0 ? '' : ' style="display: none;"') +
						'><input type="file" name="file_' + i + '" tabindex="7"></input></div>';
				}
				var node = $id('files_parent');
				node.innerHTML = str;
				node.removeAttribute('id');
			} },
			hasPicWrap: { value: true },
			init: { value() {
				doc.body.insertAdjacentHTML('beforeend', '<div style="display: none;">' +
					'<div onclick="window.lastUpdateTime = 0;"></div>' +
					'<div onclick="if(boardRequiresCaptcha) { requestCaptcha(true); }"></div>' +
					'<div onclick="setupProgressTracking();"></div>' +
					'<div onclick="highlightPost = function() {}"></div></div>' +
				'</div>');
				var els = doc.body.lastChild.children;
				this.btnZeroLUTime = els[0];
				this.initCaptcha = els[1];
				this.addProgressTrack = els[2];
				els[3].click();
				return false;
			} },
			markupBB: { value: true },
			markupTags: { value: ['b', 'i', 'u', 's', 'spoiler', 'aa', '', '', 'q'] },
			multiFile: { value: true },
			rep: { value: true },
			res: { value: 'thread-' },
			timePattern: { value: 'yyyy+nn+dd+hh+ii+ss+--?-?-?-?-?' }
		}],
		'lainchan.org': [{
			cOPost: { value: 'op' },
			css: { value: '.sidearrows { display: none !important; }' }
		}, 'form[name*="postcontrols"]'],
		'mlpg.co': [{
			cOPost: { value: 'opContainer' }
		}, 'form[name*="postcontrols"]'],
		get 'niuchan.org'() { return this['diochan.com']; },
		'ponya.ch': [{
			getPNum: { value(post) {
				return post.getAttribute('data-num');
			} },
			init: { value() {
				defaultCfg.postSameImg = 0;
				defaultCfg.removeEXIF = 0;
				return false;
			} },
			modifiedPosts: { configurable: true, get() {
				var val = new WeakMap();
				Object.defineProperty(this, 'modifiedPosts', { value: val });
				return val;
			} },
			postMapInited: { writable: true, value: false },
			checkForm: { value(formEl, maybeSpells) {
				var myMaybeSpells = maybeSpells || new Maybe(SpellsRunner),
					maybeVParser = new Maybe(Cfg.addYouTube ? VideosParser : null);
				if(!this.postMapInited) {
					this.postMapInited = true;
					$each($Q('.oppost[data-lastmodified], .reply[data-lastmodified]', dForm.el),
					      pEl => this.modifiedPosts.set(pEl, +pEl.getAttribute('data-lastmodified')));
				}
				$each($Q('.oppost[data-lastmodified], .reply[data-lastmodified]', formEl), pEl => {
					var nPost, post = pByNum[this.getPNum(pEl)],
						pDate = +pEl.getAttribute('data-lastmodified');
					if(post && (!this.modifiedPosts.has(pEl) || this.modifiedPosts.get(pEl) < pDate)) {
						var thr = post.thr,
							fragm = doc.createDocumentFragment();
						this.modifiedPosts.set(pEl, pDate);
						nPost = thr.addPost(fragm, pEl, post.count, post.prev, maybeVParser);
						if(thr.op === post) {
							thr.op = nPost;
						}
						if(thr.last === post) {
							thr.last = nPost;
						}
						if(post.next) {
							post.next.prev = nPost;
							nPost.next = post.next;
						}
						if(post.omitted) {
							nPost.omitted = true;
							nPost.wrap.classList.add('de-hidden');
						}
						myMaybeSpells.value.run(nPost);
						$before(post.wrap, fragm);
						$del(post.wrap);
					}
				});
				if(!maybeSpells) {
					myMaybeSpells.end();
				}
				maybeVParser.end();
			} },
			multiFile: { value: true },
			thrid: { value: 'replythread' }
		}],
		get 'ponyach.cf'() { return this['ponya.ch']; },
		get 'ponyach.ga'() { return this['ponya.ch']; },
		get 'ponyach.ml'() { return this['ponya.ch']; },
		get 'ponyach.ru'() { return this['ponya.ch']; },
		get 'ponychan.ru'() { return this['ponya.ch']; },
		'ponychan.net': [{
			cOPost: { value: 'opContainer' },
			css: { value: '.mature_thread { display: block !important; }\
				.mature_warning { display: none; }' },
			init: { value() {
				$each($Q('img[data-mature-src]', doc.body), function(el) {
					el.src = el.getAttribute('data-mature-src');
				});
				return false;
			} }
		}, 'form[name*="postcontrols"]'],
		'syn-ch.ru': [{
			cFileInfo: { value: 'unimportant' },
			css: { value: '.fa-sort { display: none; }\
				time::after { content: none; }' },
			earlyInit: { value() {
				var val = '{"simpleNavbar":true,"showInfo":true}';
				if(locStorage['settings'] !== val) {
					locStorage['settings'] = val;
					return true;
				}
				return false;
			} },
			init: { value() {
				defaultCfg.timePattern = 'w+dd+m+yyyy+hh+ii+ss';
				defaultCfg.timeOffset = 4;
				defaultCfg.correctTime = 1;
				return false;
			} },
			markupBB: { value: true },
			markupTags: { value: ['b', 'i', 'u', 's', 'spoiler', 'code', 'sub', 'sup', 'q'] }
		}, 'form[name*="postcontrols"]'],
		get 'syn-ch.com'() { return this['syn-ch.ru']; },
		get 'syn-ch.org'() { return this['syn-ch.ru']; }
	};

	var ibEngines = {
		'body.makaba': {
			mak: { value: true },

			cReply: { value: 'post reply' },
			cSubj: { value: 'post-title' },
			qBan: { value: '.pomyanem' },
			qClosed: { value: '.sticky-img[src$="locked.png"]' },
			qDForm: { value: '#posts-form' },
			qHide: { value: '.post-details ~ *' },
			qImgLink: { value: '.file-attr > .desktop' },
			qMsg: { value: '.post-message' },
			qName: { value: '.ananimas, .post-email' },
			qOmitted: { value: '.mess-post' },
			qPostRedir: { value: null },
			qRPost: { value: 'div.reply' },
			qThumbImages: { value: '.preview' },
			qTrunc: { value: null },
			nameSelector: { value: '.ananimas, .post-email, .ananimas > span, .post-email > span' },
			getImgParent: { value(node) {
				var el = $parent(node, 'FIGURE'),
					parent = el.parentNode;
				return parent.lastElementChild === el ? parent : el;
			} },
			getImgWrap: { value(el) {
				return $parent(el, 'FIGURE');
			} },
			getPNum: { value(post) {
				return post.getAttribute('data-num');
			} },
			getSage: { writable: true, value(post) {
				if(this.hasNames) {
					this.getSage = function(post) {
						var name = $q(this.qName, post);
						return name ? name.childElementCount === 0 && !$c('ophui', post) : false;
					};
				} else {
					this.getSage = Object.getPrototypeOf(this).getSage;
				}
				return this.getSage(post);
			} },
			getWrap: { value(el) {
				return el.parentNode;
			} },
			cssEn: { get() {
				return `.ABU-refmap, .box[onclick="ToggleSage()"], img[alt="webm file"], #de-win-reply.de-win .kupi-passcode-suka, .fa-media-icon, header > :not(.logo) + hr, .media-expand-button, .news, .norm-reply, .message-byte-len, .postform-hr, .postpanel > :not(img), .posts > hr, .reflink::before, .thread-nav, #ABU-alert-wait, #media-thumbnail { display: none !important; }
				.captcha-image > img { cursor: pointer; }
				.de-abtn { transition: none; }
				#de-txt-panel { font-size: 16px !important; }
				.images-area input { float: none !important; display: inline !important; }
				.images-single + .de-video-obj { display: inline-block; }
				.mess-post { display: block; }
				.postbtn-reply-href { font-size: 0px; }
				.postbtn-reply-href::after { font-size: 14px; content: attr(name); }
				${Cfg.expandTrunc ? '.expand-large-comment, div[id^="shrinked-post"] { display: none !important; } div[id^="original-post"] { display: block !important; }' : ''}
				${Cfg.delImgNames ? '.filesize { display: inline !important; }' : ''}`;
			} },
			earlyInit: { value() {
				try {
					var obj = JSON.parse(locStorage.store);
					if(obj.other.navigation !== 'page') {
						obj.other.navigation = 'page';
						locStorage.store = JSON.stringify(obj);
						return true;
					}
				} catch(e) {}
				return false;
			} },
			forEachReflink: { value(msg, fn) {
				var links = $Q('.post-reply-link', msg);
				for(var i = 0, len = links.length; i < len; ++i) {
					var link = links[i];
					fn(link, +link.getAttribute('data-num'));
				}
			} },
			hasNames: { configurable: true, get() {
				var val = !!$q('.ananimas > span[id^="id_tag_"], .post-email > span[id^="id_tag_"]', doc.body);
				Object.defineProperty(this, 'hasNames', { value: val });
				return val;
			} },
			hasOPNum: { value: true },
			hasPicWrap: { value: true },
			init: { value() {
				$script('window.FormData = void 0;');
				$each($C('autorefresh', doc), $del);
				var el = $q('td > .anoniconsselectlist', doc);
				if(el) {
					$q('.option-area > td:last-child', doc).appendChild(el);
				}
				el = $q('tr:not([class])', doc.body);
				if(!el) {
					return false;
				}
				doc.body.insertAdjacentHTML('beforeend', '<div style="display: none;">' +
					'<div onclick="loadCaptcha();"></div></div>');
				this.updateCaptcha = function(el, focus) {
					this.click();
					el.style.display = '';
					el = $id('captcha-value');
					if(el) {
						pr.cap = el;
						el.tabIndex = 999;
						if(focus) {
							el.focus();
						}
					}
				}.bind(doc.body.lastChild.firstChild, el);
				el.addEventListener('click', e => {
					if(e.target.tagName === 'IMG') {
						this.updateCaptcha(true);
						e.stopPropagation();
					}
				}, true);
				return false;
			} },
			fixFileInputs: { value(el) {
				var str = '';
				for(var i = 0, len = 4; i < len; ++i) {
					str += '<div' + (i === 0 ? '' : ' style="display: none;"') +
						'><input type="file" name="image' + (i + 1) + '"></input></div>';
				}
				$q('#postform .images-area', doc).lastElementChild.innerHTML = str;
			} },
			lastPage: { configurable: true, get() {
				var els = $Q('.pager > a:not([class])', doc),
					val = els ? els.length : 1;
				Object.defineProperty(this, 'lastPage', { value: val });
				return val;
			} },
			markupBB: { value: true },
			markupTags: { value: ['B', 'I', 'U', 'S', 'SPOILER', 'CODE', 'SUP', 'SUB', 'q'] },
			multiFile: { value: true },
			timePattern: { value: 'dd+nn+yy+w+hh+ii+ss' }
		},
		'form[action*="futaba.php"]': {
			futa: { value: true },

			qDForm: { value: 'form:not([enctype])' },
			qImgLink: { value: 'a[href$=".jpg"], a[href$=".png"], a[href$=".gif"]' },
			qOmitted: { value: 'font[color="#707070"]' },
			qPostForm: { value: 'form:nth-of-type(1)' },
			qPostRedir: { value: null },
			qRef: { value: '.del' },
			qRPost: { value: 'td:nth-child(2)' },
			qThumbImages: { value: 'a[href$=".jpg"] > img, a[href$=".png"] > img, a[href$=".gif"] > img' },
			getPageUrl: { value(b, p) {
				return fixBrd(b) + (p > 0 ? p + this.docExt : 'futaba.htm');
			} },
			getPNum: { value(post) {
				return $t('input', post).name;
			} },
			getPostEl: { value(el) {
				while(el && el.tagName !== 'TD' && !el.hasAttribute('de-thread')) {
					el = el.parentElement;
				}
				return el;
			} },
			getTNum: { value(op) {
				return $q('input[type="checkbox"]', op).name.match(/\d+/)[0];
			} },
			cssEn: { value: '.ftbl { width: auto; margin: 0; }\
				.reply { background: #f0e0d6; }\
				span { font-size: inherit; }' },
			docExt: { value: '.htm' },
			thrid: { value: 'resto' }
		},
		'form[action*="imgboard.php?delete"]': {
			tinyIb: { value: true },

			qPostRedir: { value: null },
			getCaptchaSrc: { value(src, tNum) {
				return src.replace(/\?[^?]+$|$/, '?' + Math.random());
			} },
			ru: { value: true }
		},
		'form[name*="postcontrols"]': {
			tiny: { value: true },

			cFileInfo: { value: 'fileinfo' },
			cReply: { value: 'post reply' },
			qClosed: { value: '.fa-lock' },
			cSubj: { value: 'subject' },
			cTrip: { value: 'trip' },
			qDForm: { value: 'form[name*="postcontrols"]' },
			qHide: { value: '.intro ~ *' },
			qImgLink: { value: 'p.fileinfo > a:first-of-type' },
			qMsg: { value: '.body' },
			qName: { value: '.name' },
			qOmitted: { value: '.omitted' },
			qPages: { value: '.pages > a:nth-last-of-type(2)' },
			qPostForm: { value: 'form[name="post"]' },
			qPostRedir: { value: null },
			qRef: { value: '.post_no + a' },
			qTable: { value: '.post.reply' },
			qTrunc: { value: '.toolong' },
			fixVideo: { value(post) {
				var videos = [],
					els = $Q('.video-container, #ytplayer', post ? post.el : dForm.el);
				for(var i = 0, len = els.length; i < len; ++i) {
					var el = els[i];
					videos.push([post || this.getPostEl(el).post, el.id === 'ytplayer' ?
						el.src.match(Videos.ytReg) : ['', el.getAttribute('data-video')], true]);
					$del(el);
				}
				return videos;
			} },
			getPageUrl: { value(b, p) {
				return p > 1 ? fixBrd(b) + p + this.docExt : fixBrd(b);
			} },
			getTNum: { value(op) {
				return $q('input[type="checkbox"]', op).name.match(/\d+/)[0];
			} },
			init: { value() {
				if(Cfg) {
					Cfg.fileThumb = 0;
				}
				setTimeout(function() {
					$del($id('updater'));
				}, 0);
				return false;
			} },
			firstPage: { value: 1 },
			markupTags: { value: ["'''", "''", '__', '^H', '**', '`', '', '', 'q'] },
			cssEn: { get() {
				return `.banner, ${this.t ? '' : '.de-btn-rep,'} .hide-thread-link, .mentioned, .post-hover { display: none !important; }
					div.post.reply { float: left; clear: left; display: block; }
					form, form table { margin: 0; }`;
			} },
			timePattern: { value: 'nn+dd+yy++w++hh+ii+ss' },
			thrid: { value: 'thread' }
		},
		'script[src*="kusaba"]': {
			kus: { value: true },

			cOPost: { value: 'postnode' },
			qError: { value: 'h1, h2, div[style*="1.25em"]' },
			qPostRedir: { value: null },
			getCaptchaSrc: { value(src, tNum) {
				return src.replace(/\?[^?]+$|$/, '?' + Math.random());
			} },
			cssEn: { value: '.extrabtns > a, .extrabtns > span, #newposts_get, .replymode, .ui-resizable-handle, blockquote + a { display: none !important; }\
				.ui-wrapper { display: inline-block; width: auto !important; height: auto !important; padding: 0 !important; }' },
			markupBB: { value: true }
		},
		get 'form[action$="board.php"]'() { return this['script[src*="kusaba"]']; },
		'link[href$="phutaba.css"]': {
			cOPost: { value: 'thread_OP' },
			cReply: { value: 'post' },
			cSubj: { value: 'subject' },
			cTrip: { value: 'tripcode' },
			qError: { value: '.error' },
			qHide: { value: '.post > .post_body' },
			qImgLink: { value: '.filename > a' },
			qMsg: { value: '.text' },
			qPages: { value: '.pagelist > li:nth-last-child(2)' },
			qPostRedir: { value: 'input[name="gb2"][value="thread"]' },
			qRPost: { value: '.thread_reply' },
			qTrunc: { value: '.tldr' },
			getImgWrap: { value(el) {
				return el.parentNode.parentNode;
			} },
			getSage: { value(post) {
				return !!$q('.sage', post);
			} },
			cssEn: { value: '.content > hr, .de-parea > hr, #de-pform img[src*="expand.png"], .de-pview > .doubledash { display: none !important }\n\t\t\t\t#de-win-reply { float:left; margin-left:2em }\n\t\t\t\t.de-pview > .post { margin-left:0; border:none }' },
			docExt: { value: '' },
			fixFileInputs: { value(el) {
				var str = '><input name="file" type="file"></input></div>';
				el.removeAttribute('onchange');
				el.parentNode.parentNode.innerHTML =
					'<div' + str + ('<div style="display: none;"' + str).repeat(3);
			} },
			markupBB: { value: true },
			multiFile: { value: true },
			phut: { value: true },
			res: { value: 'thread/' }
		},
		'div#mainc': {
			qDForm: { value: '#mainc' },
			getPageUrl: { value(b, p) {
				return fixBrd(b) + '?do=page&p=' + (p < 0 ? 0 : p);
			} },
			getThrdUrl: { value(b, tNum) {
				return this.prot + '//' + this.host + fixBrd(b) + '?do=thread&id=' + tNum;
			} },
			getTNum: { value(op) {
				return $q('a[name]', op).name.match(/\d+/)[0];
			} },
			css: { value: '.reply { background-color: #e4e4d6; }' },
			init: { value() {
				var el = $id('mainc'),
					pArea = $id('postarea');
				$del(el.firstElementChild);
				$before(el, pArea.nextElementSibling);
				$before(el, pArea);
				return false;
			} },
			parseURL: { value() {
				var url = window.location.search.match(/^\?do=(thread|page)&(id|p)=(\d+)$/);
				this.b = window.location.pathname.replace(/\//g, '');
				this.t = url[1] === 'thread' ? url[3] : false;
				this.page = url[1] === 'page' ? +url[3] : 0;
				this.docExt = '';
			} }
		}
	};

	var ibBase = {
		cFileInfo: 'filesize',
		cOPost: 'oppost',
		cReply: 'reply',
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
		qRPost: '.reply',
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
		fixVideo(post) {
			var videos = [],
				els = $Q('embed, object, iframe', post ? post.el : dForm.el);
			for(var i = 0, len = els.length; i < len; ++i) {
				var m, el = els[i],
					src = el.src || el.data;
				if(src) {
					if((m = src.match(Videos.ytReg))) {
						videos.push([post || this.getPostEl(el).post, m, true]);
						$del(el);
					}
					if(Cfg.addVimeo && (m = src.match(Videos.vimReg))) {
						videos.push([post || this.getPostEl(el).post, m, false]);
						$del(el);
					}
				}
			}
			return videos;
		},
		forEachReflink(msg, fn) {
			var links = $T('a', msg);
			for(var i = 0, len = links.length; i < len; ++i) {
				var lNum, tc = links[i].textContent;
				if(tc[0] === '>' && tc[1] === '>' && (lNum = +tc.substr(2))) {
					fn(links[i], lNum);
				}
			}
		},
		getCaptchaSrc(src, tNum) {
			var tmp = src.replace(/pl$/, 'pl?key=mainpage&amp;dummy=')
			             .replace(/dummy=[\d\.]*/, 'dummy=' + Math.random());
			return tNum ? tmp.replace(/mainpage|res\d+/, 'res' + tNum)
			            : tmp.replace(/res\d+/, 'mainpage');
		},
		getFileInfo(wrap) {
			var el = $c(this.cFileInfo, wrap);
			return el ? el.textContent : '';
		},
		getImgLink(img) {
			var el = img.parentNode;
			return el.tagName === 'SPAN' ? el.parentNode : el;
		},
		getImgParent(el) {
			return this.getImgWrap(el);
		},
		getImgWrap(el) {
			var node = (el.tagName === 'SPAN' ? el.parentNode : el).parentNode;
			return node.tagName === 'SPAN' ? node.parentNode : node;
		},
		getOmitted(el, len) {
			var txt;
			return el && (txt = el.textContent) ? +(txt.match(/\d+/) || [0])[0] + 1 : 1;
		},
		getOp(thr) {
			var op = localRun ? $q('div[de-oppost]', thr) : $c(this.cOPost, thr);
			if(op) {
				return op;
			}
			op = thr.ownerDocument.createElement('div');
			op.setAttribute('de-oppost', '');
			var el, opEnd = $q(this.qTable, thr);
			while((el = thr.firstChild) !== opEnd) {
				op.appendChild(el);
			}
			if(thr.hasChildNodes()) {
				thr.insertBefore(op, thr.firstChild);
			} else {
				thr.appendChild(op);
			}
			return op;
		},
		getPNum(post) {
			return post.id.match(/\d+/)[0];
		},
		getPageUrl(b, p) {
			return fixBrd(b) + (p > 0 ? p + this.docExt : '');
		},
		getPostEl(el) {
			var sel = this.qRPost + ', [de-thread]';
			while(el && !nav.matchesSelector(el, sel)) {
				el = el.parentElement;
			}
			return el;
		},
		getSage(post) {
			var a = $q('a[href^="mailto:"], a[href="sage"]', post);
			return !!a && /sage/i.test(a.href);
		},
		getThrdUrl(b, tNum) {
			return this.prot + '//' + this.host + fixBrd(b) + this.res + tNum + this.docExt;
		},
		getTNum(op) {
			return $q('input[type="checkbox"]', op).value;
		},
		getWrap(el, isOp) {
			if(isOp) {
				return el;
			}
			if(el.tagName === 'TD') {
				Object.defineProperty(this, 'getWrap', { value(el, isOp) {
					return isOp ? el : $parent(el, 'TABLE');
				}});
			} else {
				Object.defineProperty(this, 'getWrap', { value(el, isOp) {
					return el;
				}});
			}
			return this.getWrap(el, isOp);
		},
		insertYtPlayer(msg, playerHtml) {
			msg.insertAdjacentHTML('beforebegin', playerHtml);
			return msg.previousSibling;
		},
		anchor: '#',
		css: '',
		cssEn: '',
		disableRedirection(el) {
			if(this.qPostRedir) {
				($q(this.qPostRedir, el) || {}).checked = true;
			}
		},
		dm: '',
		docExt: '.html',
		LastModified: null,
		earlyInit: null,
		ETag: null,
		firstPage: 0,
		fixFileInputs: emptyFn,
		hasOPNum: false,
		hasPicWrap: false,
		host: window.location.hostname,
		init: null,
		checkForm: emptyFn,
		get lastPage() {
			var el = $q(this.qPages, doc),
				val = el && +aProto.pop.call(el.textContent.match(/\d+/g) || []) || 0;
			if(this.page === val + 1) {
				val++;
			}
			Object.defineProperty(this, 'lastPage', { value: val });
			return val;
		},
		markupBB: false,
		get markupTags() {
			return this.markupBB ? ['b', 'i', 'u', 's', 'spoiler', 'code', '', '', 'q'] :
				['**', '*', '', '^H', '%%', '`', '', '', 'q'];
		},
		multiFile: false,
		parseURL() {
			var url = (window.location.pathname || '').match(new RegExp(
				'^(?:\\/?([^\\.]*?(?:\\/[^\\/]*?)?)\\/?)?' +
				'(' + regQuote(this.res) + ')?' +
				'(\\d+|index|wakaba|futaba)?' +
				'(\\.(?:[a-z]+))?(?:\\/|$)'
			));
			this.b = url[1].replace(/\/$/, '');
			this.t = url[2] ? url[3] :
				this.futa ? +(window.location.search.match(/\d+/) || [false])[0] :
				false;
			this.page = url[3] && !this.t ? +url[3] || this.firstPage : this.firstPage;
			if(!this.hasOwnProperty('docExt') && url[4]) {
				this.docExt = url[4];
			}
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
		ru: false,
		timePattern: 'w+dd+m+yyyy+hh+ii+ss',
		thrid: 'parent'
	};

	localRun = prot === 'file:';
	var ibObj = null, dm = localRun ?
		(window.location.pathname.match(/\/([^-]+)-[^-]+-[^\.]+\.[a-z]+$/) || [,''])[1] :
		window.location.hostname
			.match(/(?:(?:[^.]+\.)(?=org\.|net\.|com\.))?[^.]+\.[^.]+$|^\d+\.\d+\.\d+\.\d+$|localhost/)[0];
	if(checkDomains) {
		if(dm in ibDomains) {
			ibObj = (function createBoard(info) {
				return Object.create(
					info[2] ? createBoard(ibDomains[info[2]]) :
					info[1] ? Object.create(ibBase, ibEngines[info[1]]) :
					ibBase, info[0]
				);
			})(ibDomains[dm]);
			checkEngines = false;
		}
	}
	if(checkEngines) {
		for(var i in ibEngines) {
			if($q(i, doc)) {
				ibObj = Object.create(ibBase, ibEngines[i]);
				break;
			}
		}
		if(!ibObj) {
			ibObj = ibBase;
		}
	}
	if(ibObj) {
		ibObj.dm = dm;
	}
	return ibObj;
}


// INITIALIZATION
// ===========================================================================================================

function Initialization(checkDomains) {
	if(!aib) {
		aib = getImageBoard(checkDomains, true);
	}
	if(checkDomains && aib.earlyInit) {
		if(!checkStorage()) {
			return null;
		}
		if(aib.earlyInit()) {
			window.location.reload();
			return null;
		}
	}
	if((aib.init && aib.init()) || $id('de-panel')) {
		return null;
	}
	var formEl = $q(aib.qDForm + ', form[de-form]', doc);
	if(!formEl) {
		return null;
	}
	if(!locStorage && !checkStorage()) {
		return null;
	}
	if(!nav) {
		initNavFuncs();
	}
	doc.defaultView.addEventListener('storage', function(e) {
		var data, temp, post, val = e.newValue;
		if(!val) {
			return;
		}
		switch(e.key) {
		case '__de-webmvolume':
			val = +val || 0;
			Cfg.webmVolume = val;
			if(Attachment.viewer) {
				Attachment.viewer.setWebmVolume(val);
			}
			temp = $q('input[info="webmVolume"]', doc.body);
			if(temp) {
				temp.value = val;
			}
			break;
		case '__de-post': (() => {
			try {
				data = JSON.parse(val);
			} catch(err) {
				return;
			}
			temp = data.hide;
			if(data.brd === aib.b && (post = pByNum[data.num]) && (post.hidden ^ temp)) {
				post.setUserVisib(temp, data.date, false);
			} else {
				uVis[data.num] = [+!temp, data.date];
			}
			if(data.isOp) {
				if(!(data.brd in hThr)) {
					if(temp) {
						hThr[data.brd] = {};
					} else {
						toggleWindow('hid', true);
						return;
					}
				}
				if(temp) {
					hThr[data.brd][data.num] = data.title;
				} else {
					delete hThr[data.brd][data.num];
				}
			}
			toggleWindow('hid', true);
		})();
		return;
		case '__de-threads': (() => {
			try {
				hThr = JSON.parse(val);
			} catch(err) {
				return;
			}
			if(!(aib.b in hThr)) {
				hThr[aib.b] = {};
			}
			dForm.firstThr.updateHidden(hThr[aib.b]);
			toggleWindow('hid', true);
		})();
		return;
		case '__de-spells': (() => {
			try {
				data = JSON.parse(val);
			} catch(err) {
				return;
			}
			Cfg.hideBySpell = data.hide;
			temp = $q('input[info="hideBySpell"]', doc);
			if(temp) {
				temp.checked = data.hide;
			}
			doc.body.style.display = 'none';
			disableSpells();
			if(data.data) {
				spells.setSpells(data.data, false);
				temp = $id('de-spell-txt');
				if(temp) {
					temp.value = spells.list;
				}
			} else {
				if(data.data === '') {
					spells.disable();
					temp = $id('de-spell-txt');
					if(temp) {
						temp.value = '';
					}
					saveCfg('spells', '');
				}
				spells.enable = false;
			}
			doc.body.style.display = '';
		})();
		/* falls through */
		default: return;
		}
	});

	if(localRun) {
		var url = window.location.pathname.match(/\/[^-]+-([^-]+)-([^\.]+)\.[a-z]+$/);
		aib.prot = 'http:';
		aib.host = aib.dm;
		aib.b = url ? url[1] : '';
		aib.t = url ? url[2] : '';
		aib.page = 0;
		aib.docExt = '.html';
	} else {
		aib.parseURL();
	}
	if(aib.t) {
		doc.defaultView.addEventListener('beforeunload', function(e) {
			sesStorage['de-scroll-' + aib.b + aib.t] = window.pageYOffset;
		});
	}
	dummy = doc.createElement('div');
	return formEl;
}


// DELFORM
// ===========================================================================================================

function DelForm(formEl, isLight) {
	this.el = formEl;
	this.isLight = isLight;
	this.tNums = [];
	this.addFormContent(formEl, false);
	formEl.setAttribute('de-form', '');
	formEl.removeAttribute('id');
}
DelForm.doReplace = function(formEl) {
	if(aib.rep) {
		formEl.insertAdjacentHTML('beforebegin', replaceString(formEl.outerHTML));
		formEl.style.display = 'none';
		formEl.id = 'de-dform-old';
		formEl = formEl.previousSibling;
		window.addEventListener('load', () => $del($id('de-dform-old')));
	}
	return formEl;
};
DelForm.prototype = {
	el: null,
	firstThr: null,
	isLight: false,
	lastThr: null,
	tNums: null,
	addFormContent(formEl, append) {
		var threads = $Q(aib.qThread, formEl),
			len = threads.length;
		$each($T('script', formEl), $del);
		if(len === 0) {
			if(localRun) {
				threads = $Q('div[de-thread]', doc);
				len = threads.length;
			}
			if(len === 0) {
				threads = this._parseThreads(formEl);
				len = threads.length;
			}
		}
		if(len === 0) {
			return;
		}
		if(append) {
			while(formEl.firstChild) {
				this.el.appendChild(formEl.firstChild);
			}
		}
		var thr = new Thread(threads[0], this.lastThr, this.isLight);
		if(this.firstThr === null) {
			this.firstThr = thr;
		}
		for(var i = 1; i < len; ++i) {
			this.tNums.push(+thr.num);
			thr = new Thread(threads[i], thr, this.isLight);
		}
		this.tNums.push(+thr.num);
		this.lastThr = thr;
	},
	clear() {
		$each($Q('a[href^="blob:"]', this.el), function(a) {
			window.URL.revokeObjectURL(a.href);
		});
		this.firstThr = this.lastThr = null;
		this.tNums = [];
		this.el.innerHTML = '';
	},
	hide() {
		this.el.style.display = 'none';
	},
	initAjax() {
		if(Cfg.ajaxReply === 2) {
			this.el.onsubmit = $pd;
			var btn = $q(aib.qDelBut, this.el);
			if(btn) {
				btn.onclick = e => {
					$pd(e);
					pr.closeReply();
					$popup(Lng.deleting[lang], 'delete', true);
					spawn(html5Submit, this.el)
						.then(checkDelete, e => $popup(getErrorMessage(e), 'delete', false));
				};
			}
		} else if(Cfg.ajaxReply === 1) {
			this.el.insertAdjacentHTML('beforeend',
				'<iframe name="de-iframe-pform" src="about:blank" style="display: none;"></iframe>' +
				'<iframe name="de-iframe-dform" src="about:blank" style="display: none;"></iframe>'
			);
			this.el.target = 'de-iframe-dform';
			this.el.onsubmit = function() {
				pr.closeReply();
				$popup(Lng.deleting[lang], 'deleting', true);
			};
		}
	},
	show() {
		this.el.style.display = '';
	},

	_parseThreads(formEl) {
		var i, len, threads = [],
			fNodes = aProto.slice.call(formEl.childNodes),
			cThr = doc.createElement('div');
		for(i = 0, len = fNodes.length - 1; i < len; ++i) {
			var node = fNodes[i];
			if(node.tagName === 'HR') {
				formEl.insertBefore(cThr, node);
				formEl.insertBefore(cThr.lastElementChild, node);
				var el = cThr.lastElementChild;
				if(el.tagName === 'BR') {
					formEl.insertBefore(el, node);
				}
				threads.push(cThr);
				cThr = doc.createElement('div');
			} else {
				cThr.appendChild(node);
			}
		}
		cThr.appendChild(fNodes[i]);
		formEl.appendChild(cThr);
		return threads;
	}
};

function replaceString(txt) {
	if(dTime) {
		txt = dTime.fix(txt);
	}
	if(aib.fch || aib.krau) {
		if(aib.fch) {
			txt = txt.replace(/<\/?wbr>/g, '').replace(/ \(OP\)<\/a/g, '</a');
		}
		if(aib.krau) {
			txt = txt.replace(/href="(#\d+)"/g, 'href="/' + aib.b + '/thread-' + aib.t + '.html$1"').
				replace(/<span class="invalidquotelink">&gt;&gt;(\d+)<\/span>/g,
					'<a class="de-ref-del" href="#$1">&gt;&gt;$1</a>');
		}
		txt = txt.replace(/(^|>|\s|&gt;)(https*:\/\/[^"<>]*?)(<\/a>)?(?=$|<|\s)/ig, function(x, a, b, c) {
			return c ? x : a + '<a href="' + b + '">' + b + '</a>';
		});
	}
	if(spells.haveReps) {
		txt = spells.replace(txt);
	}
	if(Cfg.crossLinks) {
		txt = txt.replace(aib.reCrossLinks, function(str, b, tNum, pNum) {
			return '>&gt;&gt;/' + b + '/' + (pNum || tNum) + '<';
		});
	}
	return txt;
}

function replacePost(el) {
	if(aib.rep) {
		el.innerHTML = replaceString(el.innerHTML);
	}
	return el;
}

function initThreadUpdater(title, enableUpdate) {
	var focused, updMachine, audioRep, audioEl, stateButton,
		hasAudio, initDelay, favIntrv, favNorm, favHref, notifGranted, countEl,
		useCountdown, canFocusLoad, paused, enabled = false,
		disabledByUser = true,
		inited = false,
		lastECode = 200,
		sendError = false,
		newPosts = 0;

	function init() {
		audioEl = null;
		stateButton = null;
		hasAudio = false;
		initDelay = Cfg.updThrDelay * 1e3;
		favIntrv = 0;
		favNorm = notifGranted = inited = true;
		favHref = ($q('head link[rel="shortcut icon"]', doc) || {}).href;
		updMachine = getUpdaterStateMachine();
		useCountdown = !!Cfg.updCount;
		enable();
		updMachine.start(true);
	}

	function enable() {
		enabled = canFocusLoad = true;
		paused = disabledByUser = false;
		newPosts = 0;
		if(useCountdown) {
			countEl = $id('de-updater-count');
			countEl.style.display = '';
		}
	}

	function disable(byUser) {
		disabledByUser = byUser;
		if(enabled) {
			updMachine.stop(true);
			enabled = hasAudio = false;
			setState('off');
			var btn = $id('de-panel-audio-on');
			if(btn) {
				btn.id = 'de-panel-audio-off';
			}
		}
	}

	function audioNotif() {
		if(focused) {
			hasAudio = false;
		} else {
			audioEl.play();
			setTimeout(audioNotif, audioRep);
			hasAudio = true;
		}
	}

	function requestNotifPermission() {
		notifGranted = false;
		Notification.requestPermission(function(state) {
			if(state.toLowerCase() === 'denied') {
				saveCfg('desktNotif', 0);
			} else {
				notifGranted = true;
			}
		});
	}

	function checkFocusLoad(isFocusLoad) {
		if(isFocusLoad) {
			if(!canFocusLoad) {
				return false;
			}
			canFocusLoad = false;
			setTimeout(function() {
				canFocusLoad = true;
			}, 1e4);
		}
		return true;
	}

	function forceLoadPosts(isFocusLoad) {
		if(paused) {
			return;
		}
		if(!enabled && !disabledByUser) {
			enable();
		}
		if(!checkFocusLoad(isFocusLoad)) {
			return;
		}
		updMachine.start(false);
	}

	function favIcoBlink(isEmpty) {
		var base64 = isEmpty ? /* empty.png */ 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAAtJREFUCNdjIBEAAAAwAAFletZ8AAAAAElFTkSuQmCC' :
		/* error.png */'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAALVBMVEUAAADQRDfQRDfQRDfQRDfQRDfQRDfQRDfQRDfQRDfQRDfQRDfQRDfQRDfQRDdjm0XSAAAADnRSTlMA3e4zIndEzJkRiFW7ZqubnZUAAAB9SURBVAjXY0ACXkLqkSCaW+7du0cJQMa+Fw4scWoMDCx6DxMYmB86MHC9kFNmYIgLYGB8kgRU4VfAwPeAWU+YgU8AyGBIfGcAZLA/YWB+JwyU4nrKwGD4qO8CA6eeAQOz3sMJDAxJTx1Y+h4DTWYDWvHQAGSZ60HxSCQ3AAA+NiHF9jjXFAAAAABJRU5ErkJggg==';
		$del($q('link[rel="shortcut icon"]', doc.head));
		doc.head.insertAdjacentHTML('afterbegin', '<link rel="shortcut icon" href="' +
			(!favNorm ? favHref : 'data:image/x-icon;base64,' + base64) + '">');
		favNorm = !favNorm;
	}

	function getUpdaterStateMachine() {
		var state, working = false;
		var needSleep, repeatLoading, delay, seconds, loadPromise, currentTO;

		function handleNewPosts(lPosts, error) {
			infoLoadErrors(error, false);
			var eCode = (error instanceof AjaxError) ? error.code : 0;
			if(eCode !== 200 && eCode !== 304) {
				if(Cfg.favIcoBlink && !focused && favHref) {
					clearInterval(favIntrv);
					favIntrv = setInterval(favIcoBlink, 800, false);
				}
				if(eCode === 404 && lastECode === 404) {
					updateTitle(eCode);
					disable(false);
				} else {
					lastECode = eCode;
					setState('warn');
					if(!Cfg.noErrInTitle) {
						updateTitle();
					}
				}
				return;
			}
			if(lastECode !== 200) {
				restoreFavicon();
				setState('on');
				if(!Cfg.noErrInTitle) {
					updateTitle(eCode);
				}
			}
			lastECode = eCode;
			if(!focused) {
				if(lPosts !== 0) {
					if(Cfg.favIcoBlink && favHref && newPosts === 0) {
						favIntrv = setInterval(favIcoBlink, 800, true);
					}
					newPosts += lPosts;
					updateTitle();
					if(Cfg.desktNotif && notifGranted) {
						var post = dForm.firstThr.last,
							notif = new Notification(aib.dm + '/' + aib.b + '/' + aib.t + ': ' + newPosts +
								Lng.newPost[lang][lang !== 0 ? +(newPosts !== 1) : (newPosts % 10) > 4 ||
								(newPosts % 10) === 0 || (((newPosts % 100) / 10) | 0) === 1 ? 2 :
								(newPosts % 10) === 1 ? 0 : 1] + Lng.newPost[lang][3],
							{
								'body': post.text.substring(0, 250).replace(/\s+/g, ' '),
								'tag': aib.dm + aib.b + aib.t,
								'icon': post.images.firstAttach ? post.images.firstAttach.src : favHref
							});
						notif.onshow = setTimeout.bind(window, notif.close.bind(notif), 12e3);
						notif.onclick = window.focus;
						notif.onerror = function() {
							window.focus();
							requestNotifPermission();
						};
					}
					if(hasAudio) {
						if(audioRep) {
							audioNotif();
						} else {
							audioEl.play();
						}
					}
					delay = initDelay;
				} else if(delay !== 12e4) {
					delay = Math.min(delay + initDelay, 12e4);
				}
			}
		}

		function makeStep() {
			while(true) switch(state) {
			case 0:
				if(!needSleep) {
					needSleep = true;
					state = 3;
					break;
				}
				if(!(useCountdown && (focused || !canFocusLoad))) {
					state = 2;
					break;
				}
				seconds = delay / 1000;
				/* falls through */
			case 1:
				if(seconds <= 0) {
					state = 3;
					break;
				}
				countEl.textContent = seconds--;
				state = 1;
				currentTO = setTimeout(makeStep, 1000);
				return;
			case 2:
				state = 3;
				currentTO = setTimeout(makeStep, delay);
				return;
			case 3:
				currentTO = null;
				if(useCountdown) {
					countEl.innerHTML = '<span class="de-wait"></span>';
				}
				loadPromise = dForm.firstThr.loadNew(true);
				state = 4;
				loadPromise.then(pCount => {
					handleNewPosts(pCount, AjaxError.Success);
					if(working) {
						makeStep();
					}
				}, e => {
					handleNewPosts(0, e);
					if(working) {
						makeStep();
					}
				});
				return;
			case 4:
				loadPromise = null;
				if(repeatLoading) {
					state = 0;
					break;
				}
				working = false;
				return;
			}
		}

		return {
			start(needSleepArg) {
				if(working) {
					this.stop(false);
				}
				state = 0;
				working = true;
				delay = initDelay;
				repeatLoading = enabled;
				needSleep = needSleepArg;
				makeStep();
			},
			stop(hideCountdown) {
				if(working) {
					working = false;
					if(currentTO !== null) {
						clearTimeout(currentTO);
					}
					if(loadPromise) {
						loadPromise.cancel();
					}
					currentTO = loadPromise = null;
					if(useCountdown) {
						if(hideCountdown) {
							countEl.style.display = 'none';
						} else {
							countEl.innerHTML = '<span class="de-wait"></span>';
						}
					}
				}
			}
		};
	}

	function setState(state) {
		var btn = stateButton || (stateButton = $q('a[id^="de-panel-upd"]', doc));
		btn.id = 'de-panel-upd-' + state
		btn.title = Lng.panelBtn['upd-' + (state === 'off' ? 'off' : 'on')][lang];
	}

	function restoreFavicon() {
		if(Cfg.favIcoBlink && favHref) {
			clearInterval(favIntrv);
			favNorm = true;
			$del($q('link[rel="shortcut icon"]', doc.head));
			doc.head.insertAdjacentHTML('afterbegin', '<link rel="shortcut icon" href="' + favHref + '">');
		}
	}

	function onVis() {
		restoreFavicon();
		newPosts = 0;
		focused = true;
		sendError = false;
		setTimeout(function() {
			updateTitle();
			if(enabled) {
				forceLoadPosts(true);
			}
		}, 200);
	}

	function updateTitle(eCode = lastECode) {
		doc.title = (sendError === true ? '{' + Lng.error[lang] + '} ' : '') +
			(eCode === 200 ? '' : '{' + eCode + '} ') +
			(newPosts === 0 ? '' : '[' + newPosts + '] ') + title;
	}

	if('hidden' in doc) {
		focused = !doc.hidden;
		doc.addEventListener('visibilitychange', function() {
			if(doc.hidden) {
				focused = false;
				if(dForm.firstThr) {
					dForm.firstThr.clearPostsMarks();
				}
			} else {
				onVis();
			}
		});
	} else {
		focused = false;
		doc.defaultView.addEventListener('focus', onVis);
		doc.defaultView.addEventListener('blur', function() {
			focused = false;
			dForm.firstThr.clearPostsMarks();
		});
		doc.defaultView.addEventListener('mousemove', function mouseMove() {
			doc.defaultView.removeEventListener('mousemove', mouseMove);
			onVis();
		});
	}
	if(enableUpdate) {
		init();
	}
	if(focused && Cfg.desktNotif && ('permission' in Notification)) {
		switch(Notification.permission.toLowerCase()) {
		case 'default': requestNotifPermission(); break;
		case 'denied': saveCfg('desktNotif', 0);
		}
	}

	return {
		get enabled() {
			return enabled;
		},
		get focused() {
			return focused;
		},
		forceLoad(e) {
			if(e) {
				$pd(e);
			}
			dForm.firstThr.clearPostsMarks();
			if(paused) {
				return;
			}
			$popup(Lng.loading[lang], 'newposts', true);
			forceLoadPosts(false)
		},
		enable() {
			if(!inited) {
				init();
			} else if(!enabled) {
				enable();
				updMachine.start(true);
			} else {
				return;
			}
			setState('on');
		},
		pause() {
			if(enabled && !paused) {
				updMachine.stop(false);
				paused = true;
			}
		},
		'continue'() {
			if(enabled && paused) {
				updMachine.start(false);
				paused = false;
			}
		},
		disable: disable.bind(null, true),
		toggleAudio(aRep) {
			if(!audioEl) {
				audioEl = $new('audio', {
					'preload': 'auto',
					'src': 'https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/signal.ogg'
				}, null);
			}
			audioRep = aRep;
			return (hasAudio = !hasAudio);
		},
		toggleCounter(enableCnt) {
			if(enableCnt) {
				if(!countEl) {
					countEl = $id('de-updater-count');
				}
				countEl.innerHTML = '<span class="de-wait"></span>';
				countEl.style.display = '';
				useCountdown = true;
				forceLoadPosts(false);
			} else {
				countEl.style.display = 'none';
				useCountdown = false;
			}
		},
		sendErrNotif() {
			if(Cfg.sendErrNotif && !focused) {
				sendError = true;
				updateTitle();
			}
		}
	};
}

function initPage() {
	if(aib.t) {
		if(Cfg.rePageTitle) {
			doc.title = '/' + aib.b + ' - ' + dForm.firstThr.op.title;
		}
		if(!localRun) {
			dForm.firstThr.el.insertAdjacentHTML('afterend', '<div class="de-thread-buttons">' +
				'<span class="de-thread-updater">[<a class="de-abtn" href="#"></a>' +
				'<span id="de-updater-count" style="display: none;"></span>]</span>' +
				(aib.mak ? '[<a class="de-abtn" href="#" onclick="UnbanShow();">Реквест разбана</a>]' : '') +
				'</div>');
		}
	}
	if(!localRun){
		updater = initThreadUpdater(doc.title, aib.t && Cfg.ajaxUpdThr);
		if(aib.t) {
			dForm.firstThr.el.nextSibling.firstChild.firstElementChild
				.addEventListener('click', updater.forceLoad);
		}
	}
}

function scrollPage() {
	if(!aib.t) {
		if(doc.hidden || (needScroll && window.pageYOffset !== 0)) {
			window.scrollTo(0, 0);
		}
		return;
	}
	if(!needScroll) {
		return;
	}
	setTimeout(function() {
		var post, num, hash,
			val = +sesStorage['de-scroll-' + aib.b + aib.t];
		if(val) {
			window.scrollTo(0, val);
			sesStorage.removeItem('de-scroll-' + aib.b + aib.t);
		} else if((hash = window.location.hash) &&
		          (num = hash.match(/#[ip]?(\d+)$/)) &&
		          (num = num[1]) && (post = pByNum[num]))
		{
			post.el.scrollIntoView(true);
			if(hKeys) {
				hKeys.cPost = post;
			}
			post.select();
		}
	}, 0);
}

function checkForUpdates(isForce, lastUpdateTime) {
	if(!isForce) {
		var day = 2 * 1000 * 60 * 60 * 24,
			temp = Cfg.scrUpdIntrv;
		switch(temp) {
		case 0: temp = day; break;
		case 1: temp = day * 2; break;
		case 2: temp = day * 7; break;
		case 3: temp = day * 14; break;
		default: temp = day * 30;
		}
		if(Date.now() - +lastUpdateTime < temp) {
			return Promise.reject();
		}
	}
	return $ajax('https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.meta.js',
		 {'Content-Type': 'text/plain'},
		 false
	).then(xhr => {
		var m = xhr.responseText.match(/@version\s+([0-9.]+)/),
			dVer = m && m[1] ? m[1].split('.') : null;
		if(dVer) {
			var cVer = version.split('.');
			saveComCfg('lastUpd', Date.now());
			for(var i = 0, len = Math.max(cVer.length, dVer.length); i < len; ++i) {
				if((+dVer[i] || 0) > (+cVer[i] || 0)) {
					return '<a style="color: blue; font-weight: bold;" href="' +
						'https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/' +
						'Dollchan_Extension_Tools.user.js">' + Lng.updAvail[lang] + '</a>';
				} else if((+dVer[i] || 0) < (+cVer[i] || 0)) {
					break;
				}
			}
			if(isForce) {
				return Lng.haveLatest[lang];
			}
		}
		return Promise.reject();
	}, () => isForce ? '<div style="color: red; font-weigth: bold;">' + Lng.noConnect[lang] + '</div>' :
	                   Promise.reject()
	);
}


// CSS
// ===========================================================================================================

function getThemeLang() {
	return !Cfg.scriptStyle ? 'fr' :
		Cfg.scriptStyle === 1 ? 'en' :
		Cfg.scriptStyle === 2 ? 'de':
		'es';
}

function scriptCSS() {
	function cont(id, src) {
		return id + '::before { content: ""; padding-right: 16px; margin-right: 4px; background: url(' + src + ') no-repeat center; background-size: contain; }';
	}
	function gif(id, src) {
		return id + ' { background-image: url(data:image/gif;base64,' + src + '); background-repeat: no-repeat; background-position: center; }';
	}

	// Windows
	var p, x = '\
	.de-btn-close::after { content: "\u2716"; }\
	.de-btn-toggle::after { content: "\u21E7"; font-weight: bold; }\
	.de-resizer { position: absolute; }\
	.de-resizer-bottom { height: 6px; bottom: -3px; left: 0; right: 0; cursor: ns-resize; }\
	.de-resizer-left { width: 6px; top: 0px; bottom: 0px; left: -3px; cursor: ew-resize; }\
	.de-resizer-right { width: 6px; top: 0px; bottom: 0px; right: -3px; cursor: ew-resize; }\
	.de-resizer-top { height: 6px; top: -3px; left: 0; right: 0; cursor: ns-resize; }\
	.de-win > .de-win-head { cursor: move; }\
	.de-win .de-btn-toggle::after { content: "\u21E9"; }\
	.de-win-buttons { float: right; line-height: 16px; margin-top: 1px; cursor: pointer; }\
	.de-win-buttons > span { margin-right: 4px; font-size: 15px; }\
	.de-win-buttons > span:hover { color: #f66; }\
	#de-win-cfg { width: 370px; }\
	#de-win-cfg, #de-win-fav, #de-win-hid, #de-win-vid { position: fixed; max-height: 92%; overflow-x: hidden; overflow-y: auto; }\
	#de-win-cfg > .de-win-body { float: none; display: block; width: auto; min-width: 0; max-width: 100% !important; padding: 0; margin: 0 !important; border: none; }\
	#de-win-fav > .de-win-body, #de-win-hid > .de-win-body, #de-win-vid > .de-win-body { padding: 9px; border: 1px solid gray; }\
	#de-win-fav input[type="checkbox"] { flex: none; margin-left: 15px; }\
	#de-win-vid > .de-win-body { display: flex; flex-direction: column; align-items: center; }\
	#de-win-vid .de-entry { white-space: normal; }\
	.de-win-head { padding: 2px; border-radius: 10px 10px 0 0; color: #fff; text-align: center; cursor: default; }\
	.de-win-head:lang(fr), #de-panel:lang(fr) { background: linear-gradient(to bottom, #7b849b, #616b86 8%, #3a414f 52%, rgba(0,0,0,0) 52%), linear-gradient(to bottom, rgba(0,0,0,0) 48%, #121212 52%, #1f2740 100%); }\
	.de-win-head:lang(en), #de-panel:lang(en) { background: linear-gradient(to bottom, #4b90df, #3d77be 20%, #376cb0 28%, #295591 52%, rgba(0,0,0,0) 52%), linear-gradient(to bottom, rgba(0,0,0,0) 48%, #183d77 52%, #1f4485 72%, #264c90 80%, #325f9e 100%); }\
	.de-win-head:lang(de), #de-panel:lang(de) { background-color: #777; }\
	.de-win-head:lang(es), #de-panel:lang(es) { background-color: rgba(0,20,80,.72); }\
	.de-win-title { font: bold 14px arial; margin-left: 32px; }' +

	// Settings window
	'.de-block { display: block; }\
	#de-btn-addspell { margin-left: auto; }\
	.de-cfg-body { min-height: 309px; padding: 11px 7px 7px; margin-top: -1px; font: 13px arial !important; box-sizing: content-box; -moz-box-sizing: content-box; }\
	.de-cfg-body input[type="text"], .de-cfg-body select { width: auto; padding: 1px 2px; margin: 1px 0; font: 13px arial; }\
	.de-cfg-body input[type="checkbox"] { ' + (nav.Presto ? '' : 'vertical-align: -1px; ') + 'margin: 2px 1px; }\
	.de-cfg-body label { padding: 0; margin: 0; }\
	.de-cfg-body, #de-cfg-buttons { border: 1px solid #183d77; border-top: none; }\
	.de-cfg-body:lang(de), #de-cfg-buttons:lang(de) { border-color: #444; }\
	#de-cfg-buttons { display: flex; align-items: center; padding: 3px; font-size: 13px; }\
	.de-cfg-lang-select { flex: 1 0 auto; }\
	#de-cfg-bar { display: flex; margin: 0; padding: 0; }\
	#de-cfg-bar:lang(fr) { background-color: #1f2740; }\
	#de-cfg-bar:lang(en) { background-color: #325f9e; }\
	#de-cfg-bar:lang(de) { background-color: #777; }\
	#de-cfg-bar:lang(es) { background-color: rgba(0,20,80,.72); }\
	.de-cfg-depend { padding-left: 17px; }\
	.de-cfg-tab { flex: 1 0 auto; display: block !important; margin: 0 !important; float: none !important; width: auto !important; min-width: 0 !important; padding: 4px 0 !important; box-shadow: none !important; border: 1px solid #444 !important; border-radius: 4px 4px 0 0 !important; opacity: 1; font: bold 12px arial; text-align: center; cursor: default; background-image: linear-gradient(to bottom, rgba(132,132,132,.35) 0%, rgba(79,79,79,.35) 50%, rgba(40,40,40,.35) 50%, rgba(80,80,80,.35) 100%) !important; }\
	.de-cfg-tab:hover { background-image: linear-gradient(to top, rgba(132,132,132,.35) 0%, rgba(79,79,79,.35) 50%, rgba(40,40,40,.35) 50%, rgba(80,80,80,.35) 100%) !important; }\
	.de-cfg-tab:lang(fr) { border-color: #121421 !important; }\
	.de-cfg-tab:lang(en) { border-color: #183d77 !important; }\
	.de-cfg-tab:lang(es) { border-color: #001450 !important; }\
	.de-cfg-tab[selected], .de-cfg-tab[selected]:hover { background-image: none !important; border-bottom: none !important; }\
	.de-cfg-tab::' + (nav.Firefox ? '-moz-' : '') + 'selection { background: transparent; }\
	.de-cfg-unvis { display: none; }\
	#de-info-log, #de-info-stats { width: 100%; padding: 0px 7px; }\
	#de-info-log { overflow-y: auto; border-left: 1px solid grey; }\
	.de-info-name { flex: 1 0 auto; }\
	.de-info-row { display: flex; }\
	#de-info-table { display: flex; height: 257px; }\
	.de-spell-btn { padding: 0 4px; }\
	#de-spell-editor { display: flex; align-items: center; padding: 2px 0; }\
	#de-spell-panel { display: flex; }\
	#de-spell-txt { padding: 2px !important; width: 100%; height: 196px; border: none !important; outline: none !important; font: 12px courier new; ' + (nav.Presto ? '' : 'resize: none !important; ') + '}\
	#de-spell-rowmeter { padding: 2px 3px 0 0; overflow: hidden; width: 2em; height: 196px; background-color: #616b86; text-align: right; color: #fff; font: 12px courier new; }\
	#de-spell-rowmeter:lang(de) { background-color: #777; }' +

	// Main panel
	'#de-panel { position: fixed; right: 0; bottom: 0; z-index: 9999; border-radius: 15px 0 0 0; cursor: default; display: flex; min-height: 25px; }\
	#de-panel-logo { flex: none; margin-right: 3px; cursor: pointer; min-height: 25px; width: 25px; }\
	#de-panel-buttons { flex: 0 1 auto; display: flex; flex-flow: row wrap; align-items: center; padding: 0 0 0 2px; margin: 0; border-left: 1px solid #616b86; }\
	#de-panel-buttons:lang(en), #de-panel-info:lang(en) { border-color: #8fbbed; }\
	#de-panel-buttons:lang(de), #de-panel-info:lang(de) { border-color: #ccc; }\
	.de-panel-button { display: block; width: 25px; height: 25px; flex: none; margin: 0 1px; padding: 0; transition: all .3s ease; }\
	.de-panel-button:lang(fr):hover, .de-panel-button:lang(en):hover, .de-panel-button:lang(es):hover { background-color: rgba(255,255,255,.15); box-shadow: 0 0 3px rgba(143,187,237,.5); }\
	.de-panel-button:lang(de):hover { border: 2px solid #444; border-radius: 5px; box-sizing: border-box; transition: none; }\
	#de-panel-info { flex: none; padding: 0 6px; margin-left: 2px; border-left: 1px solid #616b86; color: #fff; font: 18px serif; }' +
	gif('#de-panel-logo', (p = 'R0lGODlhGQAZAIAAAPDw8P///yH5BAEAAAEALAAAAAAZABkA') + 'QAI5jI+pywEPWoIIRomz3tN6K30ixZXM+HCgtjpk1rbmTNc0erHvLOt4vvj1KqnD8FQ0HIPCpbIJtB0KADs=') +
	gif('#de-panel-cfg', p + 'QAJAjI+pa+API0Mv1Ymz3hYuiQHHFYjcOZmlM3Jkw4aeAn7R/aL6zuu5VpH8aMJaKtZR2ZBEZnMJLM5kIqnP2csUAAA7') +
	gif('#de-panel-hid', p + 'QAI5jI+pa+CeHmRHgmCp3rxvO3WhMnomUqIXl2UmuLJSNJ/2jed4Tad96JLBbsEXLPbhFRc8lU8HTRQAADs=') +
	gif('#de-panel-fav', p + 'QAIzjI+py+AMjZs02ovzobzb1wDaeIkkwp3dpLEoeMbynJmzG6fYysNh3+IFWbqPb3OkKRUFADs=') +
	gif('#de-panel-vid', p + 'AAI9jI+py+0Po5wTWEvN3VjyH20a6HDHB5TiaTIkuyov3MltEuM3nS5z8EPsgsIY6rE6QlA5JDMDbEKn1KqhAAA7') +
	gif('#de-panel-refresh', p + 'AAJBjI+py+0Po5zUgItBxDZrmHUcGAbe15xiybCm5iYegsaHfY8Kvrb6/qPhZr7LgrcyJlHFE1LoVG6ilVewis1qDQUAOw==') +
	gif('#de-panel-goback', p + 'QAIrjI+pmwAMm4u02gud3lzjD4biJgbd6VVPybbua61lGqIoY98ZPcvwD4QUAAA7') +
	gif('#de-panel-gonext', p + 'QAIrjI+pywjQonuy2iuf3lzjD4Zis0Xd6YnQyLbua61tSqJnbXcqHVLwD0QUAAA7') +
	gif('#de-panel-goup', p + 'QAIsjI+pm+DvmDRw2ouzrbq9DmKcBpVfN4ZpyLYuCbgmaK7iydpw1OqZf+O9LgUAOw==') +
	gif('#de-panel-godown', p + 'QAItjI+pu+DA4ps02osznrq9DnZceIxkYILUd7bue6WhrLInLdokHq96tnI5YJoCADs=') +
	gif('#de-panel-expimg', p + 'QAI9jI+pGwDn4GPL2Wep3rxXFEFel42mBE6kcYXqFqYnVc72jTPtS/KNr5OJOJMdq4diAXWvS065NNVwseehAAA7') +
	gif('#de-panel-preimg', p + 'QAJFjI+pGwCcHJPGWdoe3Lz7qh1WFJLXiX4qgrbXVEIYadLLnMX4yve+7ErBYorRjXiEeXagGguZAbWaSdHLOow4j8Hrj1EAADs=') +
	gif('#de-panel-maskimg', p + 'QAJQjI+pGwD3TGxtJgezrKz7DzLYRlKj4qTqmoYuysbtgk02ZCG1Rkk53gvafq+i8QiSxTozIY7IcZJOl9PNBx1de1Sdldeslq7dJ9gsUq6QnwIAOw==') +
	gif('#de-panel-savethr', p + 'QAJFjI+pG+CQnHlwSYYu3rz7RoVipWib+aVUVD3YysAledKZHePpzvecPGnpDkBQEEV03Y7DkRMZ9ECNnemUlZMOQc+iT1EAADs=') +
	gif('#de-panel-catalog', p + 'QAI2jI+pa+DhAHyRNYpltbz7j1Rixo0aCaaJOZ2SxbIwKTMxqub6zuu32wP9WsHPcFMs0XDJ5qEAADs=') +
	gif('#de-panel-audio-off', p + 'QAI7jI+pq+DO1psvQHOj3rxTik1dCIzmSZqfmGXIWlkiB6L2jedhPqOfCitVYolgKcUwyoQuSe3WwzV1kQIAOw==') +
	gif('#de-panel-audio-on', p + 'QAJHjI+pq+AewJHs2WdoZLz7X11WRkEgNoHqimadOG7uAqOm+Y6atvb+D0TgfjHS6RIp8YQ1pbHRfA4n0eSTI7JqP8Wtahr0FAAAOw==') +
	gif('#de-panel-enable', p + 'AAJAjI+py+0Po5wUWKoswOF27z2aMX6bo51lioal2bzwISPyHSZ1lts9fwKKfjQiyXgkslq95TAFnUCdUirnis0eCgA7') +
	gif('#de-panel-upd-on', 'R0lGODlhGQAZAJEAADL/Mv' + (p = 'Dw8P///wAAACH5BAEAAAIALAAAAAAZABkAQAJElI+pe2EBoxOTNYmr3bz7OwHiCDzQh6bq06QSCUhcZMCmNrfrzvf+XsF1MpjhCSainBg0AbKkFCJko6g0MSGyftwuowAAOw==')) +
	gif('#de-panel-upd-off', 'R0lGODlhGQAZAJEAAP8yMv' + p) +
	gif('#de-panel-upd-warn', 'R0lGODlhGQAZAJEAAP/0Qf' + p);

	if(Cfg.disabled) {
		$css(x).id = 'de-css';
		return;
	}

	// Post panel
	x += '\
	.de-post-btns { margin-left: 4px; }\
	.de-post-note:not(:empty) { color: inherit; margin: 0 4px; vertical-align: 1px; font: italic bold 12px serif; }\
	.de-thread-note { font-style: italic; }\
	.de-btn-expthr, .de-btn-fav, .de-btn-fav-sel, .de-btn-hide, .de-btn-hide-user, .de-btn-rep, .de-btn-sage, .de-btn-src, .de-btn-stick, .de-btn-stick-on { transform:rotate(0deg); display: inline-block; margin: 0 4px -2px 0 !important; cursor: pointer; ' + (
	Cfg.postBtnsCSS === 0 ?
		'color: #4F7942; font-size: 14px; }\
		.de-post-hide .de-btn-hide::after { content: "\u271A"; }\
		.de-post-hide .de-btn-hide-user::after { content: "\u271A"; }\
		.de-btn-expthr::after { content: "\u2B0D"; }\
		.de-btn-fav::after { content: "\u2605"; }\
		.de-btn-fav-sel::after { content: "\u2605"; color: red; }\
		.de-btn-hide::after { content: "\u2716"; }\
		.de-btn-hide-user::after { content: "\u2716"; color: red; }\
		.de-btn-rep::after { content: "\u25B6"; }\
		.de-btn-sage::after { content: "\u274E"; }\
		.de-btn-src::after { content: "\uD83D\uDD0E"; }\
		.de-btn-stick::after { content: "\u25FB"; }\
		.de-btn-stick-on::after { content: "\u25FC"; }' :
	Cfg.postBtnsCSS === 1 ?
		'width: 14px; height: 14px; }' +
		gif('.de-post-hide .de-btn-hide', (p = 'R0lGODlhDgAOAKIAAPDw8KCgoICAgEtLS////wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA4AAAM') + '4SLLcqyHKGRe1E1cARPaSwIGVI3bOIAxc26oD7LqwusZcbMcNC9gLHsMHvFFixwFlGRgQdNAoIQEAOw==') +
		gif('.de-post-hide .de-btn-hide-user', 'R0lGODlhDgAOAKIAAP+/v6CgoICAgEtLS////wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA4AAAM4SLLcqyHKGRe1E1cARPaSwIGVI3bOIAxc26oD7LqwusZcbMcNC9gLHsMHvFFixwFlGRgQdNAoIQEAOw==') +
		gif('.de-btn-expthr', p + '5SLLcqyHGJaeoAoAr6dQaF3gZGFpO6AzNoLHMAC8uMAty+7ZwbfYzny02qNSKElkloDQSZNAolJAAADs=') +
		gif('.de-btn-fav', p + '4SLLcqyHGJaeoAoAradec1Wigk5FoOQhDSq7DyrpyvLRpDb84AO++m+YXiVWMAWRlmSTEntAnIQEAOw==') +
		gif('.de-btn-fav-sel', 'R0lGODlhDgAOAKIAAP/hAKCgoICAgEtLS////wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA4AAAM4SLLcqyHGJaeoAoAradec1Wigk5FoOQhDSq7DyrpyvLRpDb84AO++m+YXiVWMAWRlmSTEntAnIQEAOw==') +
		gif('.de-btn-hide', p + '7SLLcqyHKGZcUE1ctAPdb0AHeCDpkWi4DM6gtGwtvOg9xDcu0rbc4FiA3lEkGE2QER2kGBgScdColJAAAOw==') +
		gif('.de-btn-hide-user', 'R0lGODlhDgAOAKIAAL//v6CgoICAgEtLS////wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA4AAAM7SLLcqyHKGZcUE1ctAPdb0AHeCDpkWi4DM6gtGwtvOg9xDcu0rbc4FiA3lEkGE2QER2kGBgScdColJAAAOw==') +
		gif('.de-btn-rep', p + '2SLLcqyHKGZe0NGABAL5C1XWfM47NsAznqA6qwLbAG8/nfeexvNe91UACywSKxsmAAGs6m4QEADs=') +
		gif('.de-btn-sage', 'R0lGODlhDgAOAJEAAPDw8EtLS////wAAACH5BAEAAAIALAAAAAAOAA4AAAIZVI55pu0AgZs0SoqTzdnu5l1P1ImcwmBCAQA7') +
		gif('.de-btn-src', p + '/SLLcqyEuKWKYF4Cl6/VCF26UJHaUIzaDMGjA8Gqt7MJ47Naw3O832kxnay1sx11g6KMtBxEZ9DkdEKTYLCEBADs=') +
		gif('.de-btn-stick', p + 'xSLLcqyHKGRe9wVYntQBgKGxMKDJDaQJouqzsMrgDTNO27Apzv88YCjAoGRB8yB4hAQA7') +
		gif('.de-btn-stick-on', 'R0lGODlhDgAOAKIAAL//v6CgoICAgEtLS////wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA4AAAMxSLLcqyHKGRe9wVYntQBgKGxMKDJDaQJouqzsMrgDTNO27Apzv88YCjAoGRB8yB4hAQA7') :
	'width: 14px; height: 14px; }' +
		gif('.de-post-hide .de-btn-hide', (p = 'R0lGODlhDgAOAJEAAPDw8IyMjP///wAAACH5BAEAAAIALAAAAAAOAA4AAAI') + 'ZVI55pu3vAIBI0mOf3LtxDmWUGE7XSTFpAQA7') +
		gif('.de-post-hide .de-btn-hide-user', 'R0lGODlhDgAOAJEAAP+/v4yMjP///wAAACH5BAEAAAIALAAAAAAOAA4AAAIZVI55pu3vAIBI0mOf3LtxDmWUGE7XSTFpAQA7 ') +
		gif('.de-btn-expthr', p + 'bVI55pu0BwEMxzlonlHp331kXxjlYWH4KowkFADs=') +
		gif('.de-btn-fav', p + 'dVI55pu0BwEtxnlgb3ljxrnHP54AgJSGZxT6MJRQAOw==') +
		gif('.de-btn-fav-sel', 'R0lGODlhDgAOAJEAAP/hAIyMjP///wAAACH5BAEAAAIALAAAAAAOAA4AAAIdVI55pu0BwEtxnlgb3ljxrnHP54AgJSGZxT6MJRQAOw==') +
		gif('.de-btn-hide', p + 'dVI55pu2vQJIN2GNpzPdxGHwep01d5pQlyDoMKBQAOw==') +
		gif('.de-btn-hide-user', 'R0lGODlhDgAOAJEAAL//v4yMjP///wAAACH5BAEAAAIALAAAAAAOAA4AAAIdVI55pu2vQJIN2GNpzPdxGHwep01d5pQlyDoMKBQAOw==') +
		gif('.de-btn-rep', p + 'aVI55pu2vAIBISmrty7rx63FbN1LmiTCUUAAAOw==') +
		gif('.de-btn-sage', 'R0lGODlhDgAOAJEAAPDw8FBQUP///wAAACH5BAEAAAIALAAAAAAOAA4AAAIZVI55pu0AgZs0SoqTzdnu5l1P1ImcwmBCAQA7') +
		gif('.de-btn-src', p + 'fVI55pt0ADnRh1uispfvpLkEieGGiZ5IUGmJrw7xCAQA7') +
		gif('.de-btn-stick', p + 'XVI55pu0PI5j00erutJpfj0XiKDKRUAAAOw==') +
		gif('.de-btn-stick-on', 'R0lGODlhDgAOAJEAAL//v4yMjP///wAAACH5BAEAAAIALAAAAAAOAA4AAAIXVI55pu0PI5j00erutJpfj0XiKDKRUAAAOw==')
	) +
	(pr.form || pr.oeForm ? '' : '.de-btn-rep { display: none; }') +

	// Sauce buttons
	cont('.de-src-google', 'https://google.com/favicon.ico') +
	cont('.de-src-yandex', 'https://yandex.ru/favicon.ico') +
	cont('.de-src-tineye', 'https://tineye.com/favicon.ico') +
	cont('.de-src-saucenao', 'https://saucenao.com/favicon.ico') +
	cont('.de-src-iqdb', '//iqdb.org/favicon.ico') +

	// Posts counter
	'.de-post-counter::after { counter-increment: de-cnt 1; content: counter(de-cnt); margin-right: 4px; vertical-align: 1px; color: #4f7942; font: bold 11px tahoma; cursor: default; }\
	.de-post-deleted::after { content: "' + Lng.deleted[lang] + '"; margin-right: 4px; vertical-align: 1px; color: #727579; font: bold 11px tahoma; cursor: default; }' +

	// Text markup buttons
	'#de-txt-panel { display: block; height: 23px; font-weight: bold; cursor: pointer; }\
	#de-txt-panel > span:empty { display: inline-block; width: 23px; height: 22px; margin: 0 2px; }' +
	gif('#de-btn-bold:empty', (p = 'R0lGODlhFwAWAJEAAPDw8GRkZAAAAP///yH5BAEAAAMALAAAAAAXABYAQAJ') + 'T3IKpq4YAoZgR0KqqnfzipIUikFWc6ZHBwbQtG4zyonW2Vkb2iYOo8Ps8ZLOV69gYEkU5yQ7YUzqhzmgsOLXWnlRIc9PleX06rnbJ/KITDqTLUAAAOw==') +
	gif('#de-btn-italic:empty', p + 'K3IKpq4YAYxRCSmUhzTfx3z3c9iEHg6JnAJYYSFpvRlXcLNUg3srBmgr+RL0MzxILsYpGzyepfEIjR43t5kResUQmtdpKOIQpQwEAOw==') +
	gif('#de-btn-under:empty', p + 'V3IKpq4YAoRARzAoV3hzoDnoJNlGSWSEHw7JrEHILiVp1NlZXtKe5XiptPrFh4NVKHh9FI5NX60WIJ6ATZoVeaVnf8xSU4r7NMRYcFk6pzYRD2TIUAAA7') +
	gif('#de-btn-strike:empty', p + 'S3IKpq4YAoRBR0qqqnVeD7IUaKHIecjCqmgbiu3jcfCbAjOfTZ0fmVnu8YIHW6lgUDkOkCo7Z8+2AmCiVqHTSgi6pZlrN3nJQ8TISO4cdyJWhAAA7') +
	gif('#de-btn-spoil:empty', 'R0lGODlhFwAWAJEAAPDw8GRkZP///wAAACH5BAEAAAIALAAAAAAXABYAQAJBlIKpq4YAmHwxwYtzVrprXk0LhBziGZiBx44hur4kTIGsZ99fSk+mjrMAd7XerEg7xnpLIVM5JMaiFxc14WBiBQUAOw==') +
	gif('#de-btn-code:empty', p + 'O3IKpq4YAoZgR0KpqnFxokH2iFm7eGCEHw7JrgI6L2F1YotloKek6iIvJAq+WkfgQinjKVLBS45CePSXzt6RaTjHmNjpNNm9aq6p4XBgKADs=') +
	gif('#de-btn-sup:empty', p + 'Q3IKpq4YAgZiSQhGByrzn7YURGFGWhxzMuqqBGC7wRUNkeU7nnWNoMosFXKzi8BHs3EQnDRAHLY2e0BxnWfEJkRdT80NNTrliG3aWcBhZhgIAOw==') +
	gif('#de-btn-sub:empty', p + 'R3IKpq4YAgZiSxquujtOCvIUayAkVZEoRcjCu2wbivMw2WaYi7vVYYqMFYq/i8BEM4ZIrYOmpdD49m2VFd2oiUZTORWcNYT9SpnZrTjiML0MBADs=') +
	gif('#de-btn-quote:empty', p + 'L3IKpq4YAYxRUSKguvRzkDkZfWFlicDCqmgYhuGjVO74zlnQlnL98uwqiHr5ODbDxHSE7Y490wxF90eUkepoysRxrMVaUJBzClaEAADs=') +

	// Show/close animation
	'@keyframes de-open { 0% { transform: translateY(-100%); } 100% { transform: translateY(0); } }\
	@keyframes de-close { 0% { transform: translateY(0); } 100% { transform: translateY(-100%); } }\
	@keyframes de-blink {\
		0%, 100% { transform: translateX(0); }\
		10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }\
		20%, 40%, 60%, 80% { transform: translateX(10px); }\
	}\
	@keyframes de-post-open-tl { from { transform: translate(-50%,-50%) scale(0); opacity: 0; } }\
	@keyframes de-post-open-bl { from { transform: translate(-50%,50%) scale(0); opacity: 0; } }\
	@keyframes de-post-open-tr { from { transform: translate(50%,-50%) scale(0); opacity: 0; } }\
	@keyframes de-post-open-br { from { transform: translate(50%,50%) scale(0); opacity: 0; } }\
	@keyframes de-post-close-tl { to { transform: translate(-50%,-50%) scale(0); opacity: 0; } }\
	@keyframes de-post-close-bl { to { transform: translate(-50%,50%) scale(0); opacity: 0; } }\
	@keyframes de-post-close-tr { to { transform: translate(50%,-50%) scale(0); opacity: 0; } }\
	@keyframes de-post-close-br { to { transform: translate(50%,50%) scale(0); opacity: 0; } }\
	@keyframes de-post-new { from { transform: translate(0,-50%) scaleY(0); opacity: 0; } }\
	@keyframes de-win-open { from { transform: translate(0,50%) scaleY(0); opacity: 0; } }\
	@keyframes de-win-close { to { transform: translate(0,50%) scaleY(0); opacity: 0; } }\
	.de-pview-anim { animation-duration: .2s; animation-timing-function: ease-in-out; animation-fill-mode: both; }\
	.de-open { animation: de-open .15s ease-out both; }\
	.de-close { animation: de-close .15s ease-in both; }\
	.de-blink { animation: de-blink .7s ease-in-out both; }\
	.de-post-new { animation: de-post-new .2s ease-out both; }\
	.de-win-open { animation: de-win-open .2s ease-out backwards; }\
	.de-win-close { animation: de-win-close .2s ease-in both; }' +

	// Embedders
	cont('.de-video-link.de-ytube', 'https://youtube.com/favicon.ico') +
	cont('.de-video-link.de-vimeo', 'https://vimeo.com/favicon.ico') +
	cont('.de-img-arch', 'data:image/gif;base64,R0lGODlhEAAQALMAAF82SsxdwQMEP6+zzRA872NmZQesBylPHYBBHP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAQARTMMlJaxqjiL2L51sGjCOCkGiBGWyLtC0KmPIoqUOg78i+ZwOCUOgpDIW3g3KJWC4t0ElBRqtdMr6AKRsA1qYy3JGgMR4xGpAAoRYkVDDWKx6NRgAAOw==') +
	cont('.de-img-audio', 'data:image/gif;base64,R0lGODlhEAAQAKIAAGya4wFLukKG4oq3802i7Bqy9P///wAAACH5BAEAAAYALAAAAAAQABAAQANBaLrcHsMN4QQYhE01OoCcQIyOYQGooKpV1GwNuAwAa9RkqTPpWqGj0YTSELg0RIYM+TjOkgba0sOaAEbGBW7HTQAAOw==') +
	'.de-current::after { content: " \u25CF"; }\
	.de-img-arch, .de-img-audio { color: inherit; text-decoration: none; font-weight: bold; }\
	.de-img-pre, .de-img-full { display: block; border: none; outline: none; cursor: pointer; }\
	.de-img-pre { max-width: 200px; max-height: 200px; }\
	.de-img-full { float: left; }\
	.de-img-center { position: fixed; margin: 0 !important; z-index: 9999; background-color: #ccc; border: 1px solid black !important; box-sizing: content-box; -moz-box-sizing: content-box; }\
	#de-img-btn-next, #de-img-btn-prev { position: fixed; top: 50%; z-index: 10000; height: 36px; width: 36px; background-repeat: no-repeat; background-position: center; background-color: black; cursor: pointer; }\
	#de-img-btn-next { background-image: url(data:image/gif;base64,R0lGODlhIAAgAIAAAPDw8P///yH5BAEAAAEALAAAAAAgACAAQAJPjI8JkO1vlpzS0YvzhUdX/nigR2ZgSJ6IqY5Uy5UwJK/l/eI6A9etP1N8grQhUbg5RlLKAJD4DAJ3uCX1isU4s6xZ9PR1iY7j5nZibixgBQA7); right: 0; border-radius: 10px 0 0 10px; }\
	#de-img-btn-prev { background-image: url(data:image/gif;base64,R0lGODlhIAAgAIAAAPDw8P///yH5BAEAAAEALAAAAAAgACAAQAJOjI8JkO24ooxPzYvzfJrWf3Rg2JUYVI4qea1g6zZmPLvmDeM6Y4mxU/v1eEKOpziUIA1BW+rXXEVVu6o1dQ1mNcnTckp7In3LAKyMchUAADs=); left: 0; border-radius: 0 10px 10px 0; }\
	.de-mp3, .de-video-obj { margin: 5px 20px; white-space: nowrap; }\
	#de-video-btn-resize { padding: 0 14px 8px 0; margin: 0 8px; border: 2px solid; border-radius: 2px; }\
	#de-video-btn-hide, #de-video-btn-prev { margin-left: auto; }\
	#de-video-buttons { display: flex; align-items: center; width: 100%; line-height: 16px; }\
	.de-video-expanded { width: 854px !important; height: 480px !important; }\
	#de-video-list { padding: 0 0 4px; overflow-y: auto; width: 100%; }\
	.de-video-resizer::after { content: "\u2795"; margin: 0 -15px 0 3px; vertical-align: 6px; color: #000; font-size: 12px; cursor: pointer; }\
	.de-video-player, .de-video-thumb { width: 100%; height: 100%; }\
	a.de-video-player { display: inline-block; position: relative; border-spacing: 0; border: none; }\
	a.de-video-player::after { content: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAWCAQAAACMYb/JAAAArklEQVR4AYXSr05CYRjA4cPGxjRosTijdvNJzmD1CrwAvQWugASNwGg0MoErOIVCPCMx0hmBMaAA4mPX8/2rT/i+9/1lPu0M3MtCN1OAvS+NEFkDmHqoJwcAbHzUkb9n7C5FqLynCAzdpAhLrynCRc9VnEDpKUWYpUmZIlt5nBQeY889amvGPj33HBvdt45WbAELeWyNP/qu/8dwBrDyVp9UBRi5DYXZdTLxEs77F5bCVAHlDJ1UAAAAAElFTkSuQmCC"); position: absolute;top: 50%; left: 50%; padding: 12px 24px; margin: -22px 0 0 -32px; background-color: rgba(255,0,0,.4); border-radius: 8px; line-height: 0; }\
	a.de-video-player:hover::after { background-color: rgba(255,0,0,.7); }\
	.de-video-title[de-time]::after { content: " [" attr(de-time) "]"; color: red; }\
	.de-vocaroo > embed { display: inline-block; }\
	td > a + .de-video-obj, td > img + .de-video-obj { display: inline-block; }\
	video { background: black; }' +

	// File inputs
	'.de-file { display: inline-block; margin: 1px; height: ' + (p = aib.multiFile ? 90 : 130) + 'px; width: ' + p + 'px; text-align: center; border: 1px dashed grey; }\
	.de-file > .de-file-del, .de-file > .de-file-spoil { float: right; }\
	.de-file > .de-file-rar { float: left; }\
	.de-file > .de-file-rarmsg { float: left; padding: 0 4px 2px; color: #fff; background-color: rgba(55,55,55,.5); }\
	.de-file > .de-file-utils { display: none; }\
	.de-file > div { display: table; width: 100%; height: 100%; cursor: pointer; }\
	.de-file > div > div { display: table-cell; vertical-align: middle; }\
	.de-file + [type="file"] { opacity: 0; margin: 1px 0 0 -' + (p + 2) + 'px !important; vertical-align: top; width: ' + (p + 2) + 'px !important; height: ' + (p + 2) + 'px; border: none !important; cursor: pointer; }\
	#de-file-area { border-spacing: 0; margin-top: 1px; width: 275px; min-width: 100%; max-width: 100%; overflow-x: auto; overflow-y: hidden; white-space: nowrap; }\
	.de-file-drag { background: rgba(88,88,88,.4); border: 1px solid grey; }\
	.de-file-hover > .de-file-utils { display: block !important; position: relative; margin: -18px 2px; }\
	.de-file-hover > .de-file-spoil { margin: -16px 21px; }\
	.de-file-img > img, .de-file-img > video { max-width: ' + (p - 4) + 'px; max-height: ' + (p - 4) + 'px; }\
	.de-file-input { max-width: 300px; }\
	.de-file-off > div > div::after { content: "' + Lng.noFile[lang] + '"; }\
	.de-file-rarmsg { margin: 0 5px; font: bold 11px tahoma; cursor: default; }\
	.de-file-del, .de-file-rar { display: inline-block; margin: 0 4px -3px; width: 16px; height: 16px; cursor: pointer; }\
	.de-file-spoil { display: none; }' +
	gif('.de-file-del', 'R0lGODlhEAAQALMOAP8zAMopAJMAAP/M//+DIP8pAP86Av9MDP9sFP9zHv9aC/9gFf9+HJsAAP///wAAACH5BAEAAA4ALAAAAAAQABAAAARU0MlJKw3B4hrGyFP3hQNBjE5nooLJMF/3msIkJAmCeDpeU4LFQkFUCH8VwWHJRHIM0CiIMwBYryhS4XotZDuFLUAg6LLC1l/5imykgW+gU0K22C0RADs=') +
	gif('.de-file-rar', 'R0lGODlhEAAQALMAAF82SsxdwQMEP6+zzRA872NmZQesBylPHYBBHP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAQARTMMlJaxqjiL2L51sGjCOCkGiBGWyLtC0KmPIoqUOg78i+ZwOCUOgpDIW3g3KJWC4t0ElBRqtdMr6AKRsA1qYy3JGgMR4xGpAAoRYkVDDWKx6NRgAAOw==') +

	// Post reply
	'#de-resizer-text { display: inline-block !important; float: none !important; padding: 5px; margin: ' + (nav.Presto ? '-2px -10px' : '0 0 -1px -11px') + '; vertical-align: bottom; border-bottom: 2px solid #666; border-right: 2px solid #666; cursor: se-resize; }\
	.de-parea { text-align: center; }\
	.de-parea-btn-close::after { content: "' + Lng.hideForm[lang] + '"; }\
	.de-parea-btn-thrd::after { content: "' + Lng.makeThrd[lang] + '"; }\
	.de-parea-btn-reply::after { content: "' + Lng.makeReply[lang] + '"; }\
	#de-pform > form { padding: 0; margin: 0; border: none; }\
	#de-pform input[type="text"], #de-pform input[type="file"] { width: 200px; }\
	.de-win-inpost { float: none; clear: left; display: inline-block; width: auto; padding: 3px; margin: 2px 0; }\
	.de-win-inpost > .de-resizer { display: none; }\
	.de-win-inpost > .de-win-head { background: none; color: inherit; }\
	#de-win-reply { width: auto !important; min-width: 0; padding: 0 !important; border: none !important; }\
	#de-win-reply.de-win { position: fixed !important; padding: 0 !important; margin: 0 !important; border-radius: 10px 10px 0 0; }\
	#de-win-reply.de-win > .de-win-body { padding: 2px 2px 0 1px; border: 1px solid gray; }\
	#de-win-reply.de-win .de-textarea { min-width: 98% !important; resize: none !important; }\
	#de-win-reply.de-win #de-resizer-text { display: none !important; }\
	#de-sagebtn { margin: 4px !important; vertical-align: top; cursor: pointer; }\
	.de-textarea { display: inline-block; padding: 3px !important; min-width: 275px !important; min-height: 90px !important; resize: both; transition: none !important; }' +

	// Favorites
	'.de-content-block > a { color: inherit; font-weight: bold; font-size: 14px; }\
	.de-content-block > input { margin: 0 4px; }\
	.de-entry { display: flex !important; align-items: center; float: none !important; padding: 0 4px 0 0 !important; margin: 2px 0 !important; border: none !important; font-size: 14px; overflow: hidden !important; white-space: nowrap; }\
	.de-entry > a { flex: none; text-decoration: none; border: none; }\
	.de-entry > input { margin: 2px 4px; }\
	.de-entry-title { flex: auto; padding-left: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\
	.de-fav-inf { flex: none; padding-left: 10px; font: bold 14px serif; cursor: default; }\
	.de-fav-inf-err { color: #c33; font-size: 12px; }\
	.de-fav-inf-new { color: #424f79; }\
	.de-fav-inf-new::after { content: " +"; }\
	.de-fav-inf-old { color: #4f7942; }\
	.de-fav-user::after { content: "\u2605"; display: inline-block; font-size: 13px; margin: -1px -13px 0 2px; vertical-align: 1px; cursor: default; }\
	.de-fav-closed, .de-fav-unavail { display: inline-block; width: 16px; height: 16px; margin-bottom: -4px; }\
	.de-fav-closed { background-image: url(data:image/gif;base64,R0lGODlhEAAQAKIAAP3rqPPOd+y6V+WmN+Dg4M7OzmZmZv///yH5BAEAAAcALAAAAAAQABAAAANCeLrWvZARUqqJkjiLj9FMcWHf6IldGZqM4zqRAcw0zXpAoO/6LfeNnS8XcAhjAIHSoFwim0wockCtUodWq+/1UiQAADs=); }\
	.de-fav-unavail { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAALVBMVEUAAADQRDfQRDfQRDfQRDfQRDfQRDfQRDfQRDfQRDfQRDfQRDfQRDfQRDfQRDdjm0XSAAAADnRSTlMA3e4zIndEzJkRiFW7ZqubnZUAAAB9SURBVAjXY0ACXkLqkSCaW+7du0cJQMa+Fw4scWoMDCx6DxMYmB86MHC9kFNmYIgLYGB8kgRU4VfAwPeAWU+YgU8AyGBIfGcAZLA/YWB+JwyU4nrKwGD4qO8CA6eeAQOz3sMJDAxJTx1Y+h4DTWYDWvHQAGSZ60HxSCQ3AAA+NiHF9jjXFAAAAABJRU5ErkJggg==); }' +

	// Other
	cont('.de-wait', 'data:image/gif;base64,R0lGODlhEAAQALMMAKqooJGOhp2bk7e1rZ2bkre1rJCPhqqon8PBudDOxXd1bISCef///wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAMACwAAAAAEAAQAAAET5DJyYyhmAZ7sxQEs1nMsmACGJKmSaVEOLXnK1PuBADepCiMg/DQ+/2GRI8RKOxJfpTCIJNIYArS6aRajWYZCASDa41Ow+Fx2YMWOyfpTAQAIfkEBQAADAAsAAAAABAAEAAABE6QyckEoZgKe7MEQMUxhoEd6FFdQWlOqTq15SlT9VQM3rQsjMKO5/n9hANixgjc9SQ/CgKRUSgw0ynFapVmGYkEg3v1gsPibg8tfk7CnggAIfkEBQAADAAsAAAAABAAEAAABE2QycnOoZjaA/IsRWV1goCBoMiUJTW8A0XMBPZmM4Ug3hQEjN2uZygahDyP0RBMEpmTRCKzWGCkUkq1SsFOFQrG1tr9gsPc3jnco4A9EQAh+QQFAAAMACwAAAAAEAAQAAAETpDJyUqhmFqbJ0LMIA7McWDfF5LmAVApOLUvLFMmlSTdJAiM3a73+wl5HYKSEET2lBSFIhMIYKRSimFriGIZiwWD2/WCw+Jt7xxeU9qZCAAh+QQFAAAMACwAAAAAEAAQAAAETZDJyRCimFqbZ0rVxgwF9n3hSJbeSQ2rCWIkpSjddBzMfee7nQ/XCfJ+OQYAQFksMgQBxumkEKLSCfVpMDCugqyW2w18xZmuwZycdDsRACH5BAUAAAwALAAAAAAQABAAAARNkMnJUqKYWpunUtXGIAj2feFIlt5JrWybkdSydNNQMLaND7pC79YBFnY+HENHMRgyhwPGaQhQotGm00oQMLBSLYPQ9QIASrLAq5x0OxEAIfkEBQAADAAsAAAAABAAEAAABE2QycmUopham+da1cYkCfZ94UiW3kmtbJuRlGF0E4Iwto3rut6tA9wFAjiJjkIgZAYDTLNJgUIpgqyAcTgwCuACJssAdL3gpLmbpLAzEQA7') +
	'.de-abtn { text-decoration: none !important; outline: none; }\
	.de-after-fimg { clear: left; }\
	#de-popup { overflow-x: hidden !important; overflow-y: auto !important; -moz-box-sizing: border-box; box-sizing: border-box; max-height: 100vh; position: fixed; right: 0; top: 0; z-index: 9999; font: 14px arial; cursor: default; }\
	#de-popup > div { overflow: visible !important; float: right; clear: both; width: auto; min-width: 0pt; padding: 8px; margin: 1px; border: 1px solid grey; white-space: pre-wrap; }\
	.de-popup-btn { display: inline-block; vertical-align: top; color: green; cursor: pointer; }\
	.de-popup-btn:not(.de-wait) + div { margin-top: .15em; }\
	.de-popup-msg { display: inline-block; }\
	.de-button { flex: none; padding: 0 ' + (nav.Firefox ? '2' : '4') + 'px !important; margin: 1px; height: 24px; font: 12px arial; }\
	.de-editor { display: block; font: 12px courier new; width: 619px; height: 337px; tab-size: 4; -moz-tab-size: 4; -o-tab-size: 4; }\
	.de-hidden { float: left; overflow: hidden !important; margin: 0 !important; padding: 0 !important; border: none !important; width: 0 !important; height: 0 !important; display: inline !important; }\
	.de-input-key { height: 12px }\
	.de-link-hid { text-decoration: line-through !important; }\
	.de-link-parent { outline: 1px dotted !important; }\
	.de-link-pview { font-weight: bold; }\
	.de-link-ref { text-decoration: none; }\
	.de-list { padding-top: 4px; }\
	.de-list::before { content: "\u25CF"; margin-right: 4px; }\
	.de-menu { padding: 0 !important; margin: 0 !important; width: auto !important; min-width: 0; z-index: 9999; border: 1px solid grey !important;}\
	.de-menu-item { display: block; padding: 3px 10px; color: inherit; text-decoration: none; font: 13px arial; white-space: nowrap; cursor: pointer; }\
	.de-menu-item:hover { background-color: #222; color: #fff; }\
	.de-new-post { ' + (nav.Presto ? 'border-left: 4px solid rgba(0,0,255,.7); border-right: 4px solid rgba(0,0,255,.7); }' : 'box-shadow: 6px 0 2px -2px rgba(0,0,255,.8), -6px 0 2px -2px rgba(0,0,255,.8); }') + '\
	.de-omitted { color: grey; }\
	.de-omitted::before { content: "' + Lng.postsOmitted[lang] + '"; }\
	.de-post-hide > ' + aib.qHide + ' { display: none !important; }\
	.de-pview { position: absolute; width: auto; min-width: 0; z-index: 9999; border: 1px solid grey !important; margin: 0 !important; display: block !important; }\
	.de-pview-info { padding: 3px 6px !important; }\
	.de-ref-op::after { content: " [OP]"; }\
	.de-ref-del::after { content: " [del]"; }\
	.de-refmap { margin: 10px 4px 4px 4px; font-size: 75%; font-style: italic; }\
	.de-refmap::before { content: "' + Lng.replies[lang] + ' "; }\
	.de-refcomma:last-child { display: none; }\
	.de-selected, .de-error-key { ' + (nav.Presto ? 'border-left: 4px solid rgba(255,0,0,.7); border-right: 4px solid rgba(255,0,0,.7); }' : 'box-shadow: 6px 0 2px -2px rgba(255,0,0,.8), -6px 0 2px -2px rgba(255,0,0,.8); }') + '\
	.de-thread-buttons { clear: left; margin-top: 5px; }\
	.de-thread-collapse > a::after { content: "' + Lng.collapseThrd[lang] + '"; }\
	.de-thread-updater > a::after { content: "' + Lng.getNewPosts[lang] + '"; }\
	.de-thread-updater::before { content: ">> "; }\
	#de-updater-count::before { content: ": "; }\
	.de-viewed { color: #888 !important; }\
	form > hr { clear: both }';

	$css(x).id = 'de-css';
	$css('').id = 'de-css-dynamic';
	$css('').id = 'de-css-user';
	updateCSS();
}

function updateCSS() {
	var x = '.de-video-obj { width: ' + Cfg.YTubeWidth + 'px; height: ' + Cfg.YTubeHeigh + 'px; }';
	if(Cfg.maskImgs) {
		x += '.de-img-pre, .de-video-obj, .thumb, .ca_thumb, .fileThumb, img[src*="spoiler"], img[src*="thumb"], img[src^="blob"] { opacity: .07 !important; }\
			.de-img-pre:hover, .de-video-obj:hover, .thumb:hover, .ca_thumb:hover, .fileThumb:hover, img[src*="spoiler"]:hover, img[src*="thumb"]:hover, img[src^="blob"]:hover { opacity: 1 !important; }';
	}
	if(Cfg.delImgNames) {
		x += '.de-img-name { text-transform: capitalize; text-decoration: none; }';
	}
	if(!aib.dobr && !aib.krau && !aib.mak) {
		x += '.de-img-full { margin: 2px 5px; }';
	}
	if(Cfg.noSpoilers) {
		if(aib.krau || aib.fch || aib._8ch || aib._410 || aib.dio) {
			x += '.spoiler, s { color: #fff !important; }\
				.spoiler > a, s > a:not(:hover) { color: inherit !important; }';
		} else {
			x += '.spoiler { color: inherit !important; }\
				.spoiler > a { color: inherit !important; }';
		}
	}
	if(Cfg.widePosts) {
		x += '.' + aib.cReply.replace(/\s/, '.') + ':not(.de-pview) { float: none; width: 100%; }';
	}
	x += '.postarea, .recaptcha_image_cell + td, .recaptcha_image_cell + td + td, small[id^="rfmap"], .theader, .thumbnailmsg, ' +
		(Cfg.panelCounter ? '' : '#de-panel-info, ') +
		(Cfg.imgNavBtns ? '' : '#de-img-btn-next, #de-img-btn-prev, ') +
		(Cfg.showHideBtn ? '' : '.de-btn-hide, ') +
		(Cfg.showRepBtn ? '' : '.de-btn-rep, ') +
		(Cfg.updThrBtns || aib.t ? '' : '.de-thread-updater, ') +
		(Cfg.removeHidd ? '.de-link-ref.de-link-hid, .de-link-ref.de-link-hid + .de-refcomma, ' : '') +
		(Cfg.delHiddPost ? '.de-thr-hid, .de-thr-hid + div + hr, .de-thr-hid + div + br, .de-thr-hid + div + br + hr, .de-thr-hid + div + div + hr, ' : '') +
		(Cfg.noPostNames ? aib.qName + ', .' + aib.cTrip + ', ' : '') +
		(Cfg.noBoardRule ? (aib.mak ? '.rules-area' : aib.krau ? '#rules_row' : aib.futa ? '.chui' : '.rules, #rules') + ', ' : '') +
		(!aib.kus && (aib.multiFile || !Cfg.fileThumb) ? '#de-pform form > table > tbody > tr > td:not([colspan]):first-child, #de-pform form > table > tbody > tr > th:first-child, ' : '') +
		'body > hr { display: none !important; }';
	$id('de-css-dynamic').textContent = x + '\n' + aib.css + '\n' + aib.cssEn;
	$id('de-css-user').textContent = Cfg.userCSS ? Cfg.userCSSTxt : '';
}


// MAIN
// ===========================================================================================================

function addDelformStuff() {
	preloadImages(null);
	new Logger().log('Preload images');
	embedMediaLinks(null);
	new Logger().log('Audio links');
	if(Cfg.addYouTube) {
		new VideosParser().parse(null).end();
		new Logger().log('Video links');
	}
	if(Cfg.addImgs) {
		embedImagesLinks(dForm.el);
		new Logger().log('Image-links');
	}
	processImageNames(dForm.el);
	new Logger().log('Image names');
	if(dForm.firstThr && Cfg.linksNavig === 2) {
		genRefMap(pByNum, '');
		for(var post = dForm.firstThr.op; post; post = post.next) {
			if(post.hasRef) {
				addRefMap(post, '');
			}
		}
		new Logger().log('Reflinks map');
	}
}

function* initScript(checkDomains, readCfgPromise) {
	new Logger().init();
	var formEl = Initialization(checkDomains);
	if(!formEl) {
		return;
	}
	new Logger().log('Init');
	var str = yield* getStored('DESU_Exclude');
	if(str && str.includes(aib.dm)) {
		return;
	}
	excludeList = str || '';
	if(!Cfg) {
		if(readCfgPromise) {
			yield readCfgPromise;
		} else {
			yield* readCfg();
		}
		new Logger().log('Config loading');
	}
	if(Cfg.correctTime) {
		dTime = new DateTime(Cfg.timePattern, Cfg.timeRPattern, Cfg.timeOffset, lang,
		                     rp => saveCfg('timeRPattern', rp));
		new Logger().log('Time correction');
	}
	if(Cfg.disabled) {
		panel.init(formEl);
		scriptCSS();
		return;
	}
	spells = new Spells(!!Cfg.hideBySpell);
	new Logger().log('Parsing spells');
	doc.body.style.display = 'none';
	formEl = DelForm.doReplace(formEl);
	new Logger().log('Replace delform');
	pByNum = Object.create(null);
	try {
		dForm = new DelForm(formEl, false);
	} catch(e) {
		console.log('DELFORM ERROR:\n' + getPrettyErrorMessage(e));
		doc.body.style.display = '';
		return;
	}
	if(!localRun) {
		dForm.initAjax();
	}
	new Logger().log('Parse delform');
	pr = new PostForm($q(aib.qPostForm, doc), false, doc);
	new Logger().log('Parse postform');
	if(Cfg.hotKeys) {
		hKeys = new HotKeys();
		new Logger().log('Init keybinds');
	}
	initPage();
	new Logger().log('Init page');
	panel.init(formEl);
	new Logger().log('Add panel');
	initMessageFunctions();
	addDelformStuff();
	readViewedPosts();
	scriptCSS();
	new Logger().log('Apply CSS');
	doc.body.style.display = '';
	new Logger().log('Display page');
	scrollPage();
	new Logger().log('Scroll page');
	readPosts();
	yield* readUserPosts();
	yield* readFavoritesPosts();
	setTimeout(PostContent.purge, 0);
	new Logger().log('Apply spells');
	new Logger().finish();
}

if(/^(?:about|chrome|opera|res):$/i.test(window.location.protocol)) {
	return;
}
switch(window.name) {
case '': break;
case 'de-iframe-pform':
case 'de-iframe-dform':
	$script('window.top.postMessage("' + window.name + '" + document.documentElement.outerHTML, "*");');
	return;
}

if(doc.readyState === 'interactive' || doc.readyState === 'complete') {
	needScroll = false;
	async(initScript)(true, null);
} else {
	var cfgRead = null;
	aib = getImageBoard(true, false);
	if(aib) {
		if(!checkStorage()) {
			return;
		}
		if(aib.earlyInit) {
			aib.earlyInit();
		}
		initNavFuncs();
		cfgRead = spawn(readCfg);
	}
	needScroll = true;
	doc.addEventListener(doc.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll",
	                     function wheelFunc(e) {
	                     	needScroll = false;
	                     	doc.removeEventListener(e.type, wheelFunc);
	                     });
	doc.addEventListener('DOMContentLoaded', async(initScript.bind(null, false, cfgRead)));
}

})(window.opera && window.opera.scriptStorage, window.FormData);
