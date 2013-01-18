// ==UserScript==
// @name			Dollchan Extension Tools
// @version			13.1.14.0
// @namespace		http://www.freedollchan.org/scripts/*
// @author			Sthephan Shinkufag @ FreeDollChan
// @copyright		(C)2084, Bender Bending Rodriguez
// @description		Doing some profit for imageboards
// @icon			https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/stable/Icon.png
// @updateURL		https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/stable/Dollchan_Extension_Tools.meta.js
// @run-at			document-start
// @include			*
// ==/UserScript==

(function(scriptStorage) {
var version = '13.1.14.0',
defaultCfg = {
	'language':		0,		// script language [0=ru, 1=en]
	'hideBySpell':	1,		// hide posts by spells
	'menuHiddBtn':	1,		// menu on hide button
	'hideRefPsts':	0,		// hide post with references to hidden posts
	'delHiddPost':	0,		// delete hidden posts
	'updThread':	1,		// update threads [0=off, 1=auto, 2=click]
	'updThrDelay':	60,		//		threads update interval in sec
	'favIcoBlink':	1,		//		favicon blinking, if new posts detected
	'desktNotif':	0,		//		desktop notifications, if new posts detected
	'expandPosts':	2,		// expand shorted posts [0=off, 1=auto, 2=on click]
	'expandImgs':	2,		// expand images by click [0=off, 1=in post, 2=by center]
	'maskImgs':		0,		// mask images
	'preLoadImgs':	0,		// pre-load images
	'findImgFile':	0,		// 		detect built-in files in images
	'openImgs':		0,		// 		open images in posts
	'openGIFs':		0,		// 		open only GIFs in posts
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
	'scrAfterRep':	0,		// scroll to the bottom after reply
	'noThrdForm':	1,		// hide thread-creating form
	'favOnReply':	1,		// add thread to favorites on reply
	'addSageBtn':	1,		// email field -> sage btn
	'warnSubjTrip':	0,		// warn if subject field contains tripcode
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
	'userCSS':		0,		// user style
	'userCSSTxt':	'',		//		text
	'expandPanel':	0,		// show full main panel
	'attachPanel':	1,		// attach main panel
	'panelCounter':	1,		// posts/images counter in script panel
	'rePageTitle':	1,		// replace page title in threads
	'animation':	1,		// animation in script
	'closePopups':	0,		// auto-close popups
	'updScript':	1,		// check for script's update
	'scrUpdIntrv':	1,		// 		check interval in days (every val+1 day)
	'textaWidth':	500,	// textarea width
	'textaHeight':	160		// textarea height
},

Lng = {
	cfg: {
		'hideBySpell':	['Заклинания: ', 'Magic spells: '],
		'menuHiddBtn':	['Дополнительное меню кнопок скрытия ', 'Additional menu of hide buttons'],
		'hideRefPsts':	['Скрывать ответы на скрытые посты*', 'Hide replies to hidden posts*'],
		'delHiddPost':	['Удалять скрытые посты', 'Delete hidden posts'],

		'updThread': {
			sel:		[['Откл.', 'Авто', 'По клику'], ['Disable', 'Auto', 'On click']],
			txt:		['AJAX обновление треда* ', 'AJAX thread update* ']
		},
		'updThrDelay':	[' (сек)', ' (sec)'],
		'favIcoBlink':	['мигать фавиконом при новых постах*', 'Favicon blinking on new posts*'],
		'desktNotif':	['Уведомления на рабочем столе', 'Desktop notifications'],
		'expandPosts': {
			sel:		[['Откл.', 'Авто', 'По клику'], ['Disable', 'Auto', 'On click']],
			txt:		['AJAX загрузка сокращенных постов*', 'AJAX upload of shorted posts*']
		},
		'expandImgs': {
			sel:		[['Откл.', 'В посте', 'По центру'], ['Disable', 'In post', 'By center']],
			txt:		['раскрывать изображения ', 'expand images ']
		},
		'preLoadImgs':	['Предварительно загружать изображения*', 'Pre-load images*'],
		'findImgFile':	['Распознавать встроенные файлы в изображениях*', 'Detect built-in files in images*'],
		'openImgs':		['Раскрывать изображения', 'Open images'],
		'openGIFs':		['только GIFы', 'GIFs only'],
		'postBtnsTxt':	['Кнопки постов в виде текста*', 'Show post buttons as text*'],
		'imgSrcBtns':	['Добавлять кнопки для поиска изображений*', 'Add image search buttons*'],
		'noSpoilers':	['Открывать текстовые спойлеры', 'Open text spoilers'],
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
			txt:		['', '']
		},
		'YTubeHD':		['HD ', 'HD '],
		'YTubeTitles':	['Загружать названия к YouTube-ссылкам*', 'Load titles into YouTube-links*'],

		'ajaxReply':	{
			sel:		[['Откл.', 'Iframe', 'HTML5'], ['Disable', 'Iframe', 'HTML5']],
			txt:		['AJAX отправка постов*', 'posting with AJAX*']
		},
		'postSameImg':	['Возможность отправки одинаковых изображений', 'Ability to post same images'],
		'removeEXIF':	['Удалять EXIF из отправляемых JPEG-изображений', 'Remove EXIF from uploaded JPEG-images'],
		'removeFName':	['Удалять имя из отправляемых файлов', 'Remove names from uploaded files'],
		'addPostForm': {
			sel:		[['Сверху', 'Внизу', 'В постах', 'Отдельная'], ['At top', 'At bottom', 'Inline', 'Hanging']],
			txt:		['форма ответа в треде* ', 'reply form in thread* ']
		},
		'scrAfterRep':	['Перемещаться в конец треда после отправки', 'Scroll to the bottom after reply'],
		'noThrdForm':	['Прятать форму создания треда', 'Hide thread creating form'],
		'favOnReply':	['Добавлять тред в избранное при ответе', 'Add thread to favorites on reply'],
		'addSageBtn':	['Sage вместо поля E-mail* ', 'Sage button instead of E-mail field* '],
		'warnSubjTrip':	['Предупреждать при наличии трип-кода в поле тема', 'Warn if field subject contains trip-code'],
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

		'scriptStyle': {
			sel:		[['Glass black', 'Glass blue', 'Solid grey'], ['Glass black', 'Glass blue', 'Solid grey']],
			txt:		['стиль скрипта', 'script style']
		},
		'userCSS':		['Пользовательский CSS ', 'User CSS '],
		'attachPanel':	['Прикрепить главную панель', 'Attach main panel'],
		'panelCounter':	['Счетчик постов/изображений на главной панели', 'Counter of posts/images on main panel'],
		'rePageTitle':	['Название треда в заголовке вкладки*', 'Thread title in page tab*'],
		'animation':	['CSS3 анимация в скрипте', 'CSS3 animation in script'],
		'closePopups':	['Автоматически закрывать уведомления', 'Close popups automatically'],
		'updScript':	['Автоматически проверять обновления скрипта', 'Check for script update automatically'],
		'scrUpdIntrv': {
			sel:		[['Каждый день', 'Каждые 2 дня', 'Каждую неделю', 'Каждые 2 недели', 'Каждый месяц'], ['Every day', 'Every 2 days', 'Every week', 'Every 2 week', 'Every month']],
			txt:		['интервал проверки', 'check interval']
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
		'attach':	['Прикрепить/Открепить', 'Attach/Detach'],
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

	selHiderMenu:	{
		'sel':		['Скрывать выделенное', 'Hide selected text'],
		'trip':		['Скрывать трип-код', 'Hide with trip-code'],
		'img':		['Скрывать изображение', 'Hide with image'],
		'ihash':	['Скрывать схожие изобр.', 'Hide similar images'],
		'text':		['Скрыть схожий текст', 'Hide similar text'],
		'noimg':	['Скрывать без изображений', 'Hide without images'],
		'notext':	['Скрывать без текста', 'Hide without text']
	},
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

	keyNavHelp:		[
		'"Ctrl+Влево" - предыдущая страница,\n"Ctrl+Вправо" - следующая страница.\n\n' +
		'На доске:\n"J" - тред ниже,\n"K" - тред выше,\n"N" - пост ниже,\n"M" - пост выше,\n' +
		'"V" - вход в тред.\n\nВ треде:\n"J" - пост ниже,\n"K" - пост выше,\n"V" - быстрый ответ',
		'"Ctrl+Left" - previous page\n"Ctrl+Right" - next page.\n\n' +
		'On board:\n"J" - thread below,\n"K" - thread above,\n"N" - post below,\n"M" - post above,\n' +
		'"V" - enter a thread.\n\nIn thread:\n"J" - post below,\n"K" - post above,\n"V" - quick reply.'
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

	editor:			{
		cfg:		['Редактирование настроек:', 'Edit settings:'],
		hidden:		['Редактирование скрытых тредов:', 'Edit hidden threads:'],
		favor:		['Редактирование избранного:', 'Edit favorites:'],
		css:		['Редактирование CSS', 'Edit CSS']
	},

	add:			['Добавить', 'Add'],
	apply:			['Применить', 'Apply'],
	clear:			['Очистить', 'Clear'],
	help:			['Помощь', 'Help'],
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
	succDeleted:	['Успешно удалено!', 'Succesfully deleted!'],
	errDelete:		['Не могу удалить:\n', 'Can\'t delete:\n'],
	cTimeError:		['Неправильные настройки времени', 'Invalid time settings'],
	noGlobalCfg:	['Глобальные настройки не найдены', 'Global config not found'],
	postNotFound:	['Пост не найден', 'Post not found'],
	unreadMsg:		['В треде %m непрочитанных сообщений.', 'There are %m unreaded messages in thread.'],
	dontShow:		['Не отображать: ', 'Do not show: '],
	checkNow:		['Проверить сейчас', 'Check now'],
	updAvail:		['Доступно обновление!', 'Update available!'],
	haveLatest:		['У вас стоит самая последняя версия!', 'You have latest version!'],
	version:		['Версия: ', 'Version: '],
	storage:		['Хранение: ', 'Storage: '],
	thrViewed:		['Тредов просмотрено: ', 'Threads viewed: '],
	thrCreated:		['Тредов создано: ', 'Threads created: '],
	posts:			['Постов: ', 'Posts: '],
	total:			['Всего: ', 'Total: '],
	debug:			['Отладка', 'Debug'],
	infoDebug:		['Информация для отладки', 'Information for debugging'],
	loadGlobal:		['Загрузить глобальные настройки', 'Load global settings'],
	saveGlobal:		['Сохранить настройки как глобальные', 'Save settings as global'],
	editInTxt:		['Правка в текстовом формате', 'Edit in text format'],
	resetCfg:		['Сбросить в настройки по умолчанию', 'Reset settings to defaults'],
	conReset:		['Данное действие удалит все ваши настройки и закладки. Продолжить?', 'This will delete all your preferences and favourites. Continue?'],
	clrSelected:	['Удалить выделенные записи', 'Remove selected notes'],
	saveChanges:	['Сохранить внесенные изменения', 'Save your changes'],
	infoCount:		['Обновить счетчики постов', 'Refresh posts counters'],
	infoPage:		['Проверить актуальность тредов (до 5 страницы)', 'Check for threads actuality (up to 5 page)'],
	clrDeleted:		['Очистить записи недоступных тредов', 'Clear notes of inaccessible threads'],
	hiddenPosts:	['Скрытые посты на странице', 'Hidden posts on page'],
	hiddenThrds:	['Скрытые треды', 'Hidden threads'],
	noHidPosts:		['На этой странице нет скрытых постов...', 'No hidden posts on this page...'],
	noHidThrds:		['Нет скрытых тредов...', 'No hidden threads...'],
	expandAll:		['Раскрыть все', 'Expand all'],
	invalidData:	['Некорректный формат данных', 'Incorrect data format'],
	favThrds:		['Избранные треды:', 'Favorite threads:'],
	noFavThrds:		['Нет избранных тредов...', 'Favorites is empty...'],
	reply:			['Ответ', 'Reply'],
	replyTo:		['Ответ в', 'Reply to'],
	replies:		['Ответы:', 'Replies:'],
	postsOmitted:	['Пропущено ответов: ', 'Posts omitted: '],
	collapseThrd:	['Свернуть тред', 'Collapse thread'],
	deleted:		['удалён', 'deleted'],
	getNewPosts:	['Получить новые посты', 'Get new posts'],
	page:			['Страница', 'Page'],
	hiddenThrd:		['Скрытый тред:', 'Hidden thread:'],
	expandForm:		['Раскрыть форму', 'Expand form'],
	search:			['Искать в ', 'Search in '],
	wait:			['Ждите', 'Wait'],
	addFile:		['+ файл', '+ file'],
	helpAddFile:	['Добавить .ogg, .rar, .zip, или .7z к картинке', 'Add .ogg, .rar, .zip, or .7z to image '],
	downloadFile:	['Скачать содержащийся в картинке файл', 'Download existing file from image'],
	fileCorrupt:	['Файл повреждён: ', 'File is corrupted: '],
	subjHasTrip:	['Поле "Тема" содержит трипкод', '"Subject" field contains tripcode'],

	seSyntaxErr:	['синтаксическая ошибка', 'syntax error'],
	seUnknown:		['неизвестный спелл: ', 'unknown spell: '],
	seMissOp:		['пропущен оператор', 'missing operator'],
	seMissSpell:	['пропущен спелл', 'missing spell'],
	seErrConvNum:	['ошибка преобразования %1 в число', 'can\'t convert %1 to number'],
	seErrRegex:		['синтаксическая ошибка в регулярном выражении: ', 'syntax error in regular expression: '],
	seUnexpChar:	['неожиданный символ ', 'unexpected character '],
	seMissOpBkt:	['пропущена открывающаяся скобка', 'missing ( in parenthetical'],
	seMissClBkt:	['пропущена закрывающаяся скобка', 'missing ) in parenthetical'],
	seRow:			[' (строка ', ' (row '],
	seCol:			[', столбец ', ', column ']
},

uWindow, doc = window.document, aProto = Array.prototype,
Cfg, comCfg, hThr, comHThr, Favor, pByNum = {}, Posts = [], Threads = [], sVis, uVis,
aib = {}, nav, brd, TNum, pageNum, docExt, docTitle,
pr, dForm, oeForm, dummy, postWrapper, spells, aSpellTO, fData,
Pviews = {deleted: [], ajaxed: {}, top: null, outDelay: null},
Favico = {href: '', delay: null, focused: false},
Audio = {enabled: false, el: null, repeat: false, running: false},
oldTime, timeLog = [], dTime,
ajaxInterval, lang, hideTubeDelay, tubeTitles, quotetxt = '', liteMode, isExpImg,
reTubeLink = /^https?:\/\/(?:www\.)?youtu(?:be\.com\/(?:watch\?.*?v=|v\/|embed\/)|\.be\/)([^&#?]+).*?(?:t(?:ime)?=(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?)?$/,
$each = Function.prototype.call.bind(aProto.forEach);


/*==============================================================================
									UTILITES
==============================================================================*/

function $x(path, root) {
	return doc.evaluate(path, root, null, 8, null).singleNodeValue;
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

function $script(text) {
	return doc.head.appendChild($new('script', {'type': 'text/javascript', 'text': text}, null));
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
	if(el) {
		el.parentNode.removeChild(el);
	}
}

function $offset(el) {
	var box = el.getBoundingClientRect();
	return {
		top: box.top + window.pageYOffset,
		left: box.left + window.pageXOffset
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

function $isEmpty(obj) {
	for(var i in obj) {
		if(obj.hasOwnProperty(i)) {
			return false;
		}
	}
	return true;
}

function $log(txt) {
	var newTime = Date.now(),
		time = newTime - oldTime;
	if(time > 1) {
		timeLog.push(txt + ': ' + time + 'ms');
		oldTime = newTime;
	}
}

function $xhr(obj) {
	var h, xhr = new window.XMLHttpRequest();
	if(obj['onreadystatechange']) {
		xhr.onreadystatechange = obj['onreadystatechange'].bind(window, xhr);
	}
	if(obj['onload']) {
		xhr.onload = obj['onload'].bind(window, xhr);
	}
	xhr.open(obj['method'], obj['url'], true);
	if(obj['responseType']) {
		xhr.responseType = obj['responseType'];
	}
	for(h in obj['headers']) {
		xhr.setRequestHeader(h, obj['headers'][h]);
	}
	xhr.send(obj['data'] || null);
}

/** @constructor */
function $queue(maxNum, Fn, endFn) {
	this.array = [];
	this.length = 0;
	this.fn = Fn;
	this.endFn = endFn;
	this.mNum = maxNum;
	this.cNum = 0;
	this.completed = false;
}
$queue.prototype = {
	run: function(data) {
		var num = this.cNum;
		if(num === this.mNum) {
			this.array.push(data);
			this.length++;
		} else {
			this.cNum++;
			this.fn(num, data);
		}
	},
	end: function() {
		this.cNum--;
		if(this.length !== 0) {
			this.length--;
			this.run(this.array.splice(0, 1)[0]);
		} else if(this.completed && this.cNum === 0) {
			this.endFn();
		}
	},
	complete: function() {
		if((this.length | this.cNum) === 0) {
			this.endFn();
		} else {
			this.completed = true;
		}
	}
};

function regQuote(str) {
	return (str + '').replace(/([.?*+^$[\]\\(){}|\-])/g, '\\$1');
}

function getPost(el) {
	return $x('ancestor::*[@de-post]', el);
}

function getPostImages(el) {
	return el.querySelectorAll('.thumb, img[src*="thumb"], img[src*="/spoiler"], img[src^="blob:"]');
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
	var inf = $c(aib.cFileInfo, post).textContent.match(/(\d+(?:\.\d+)?)\s*([mkк])?[bб]/i),
		w = parseFloat(inf[1]);
	return inf[2] === 'M' ? (w * 1e3) | 0 : !inf[2] ? Math.round(w / 1e3) : w;
}

function getImgSize(post) {
	var m, el = $c(aib.cFileInfo, post);
	if(aib.brit) {
		m = el.onclick.toString().split("', '");
		return [m[3], m[4]];
	}
	m = el ? el.textContent.match(/(\d+)[x×](\d+)/) : false;
	return m ? m.slice(1) : [null, null];
}

function fixBrd(b) {
	return '/' + b + (b ? '/' : '');
}

function getPrettyJSON(obj, indent) {
	var sJSON, iCount, isArr = obj instanceof Array;
	if(isArr) {
		if(obj.length === 0) {
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
			type === 'string' ? '"' + val.replace(/(["\n\\])/g, '\\$1') + '"' : type
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

function delStored(id) {
	if(nav.isGM) {
		GM_deleteValue(id);
	} else if(scriptStorage) {
		scriptStorage.removeItem(id);
	} else {
		localStorage.removeItem(id);
	}
}

function getStoredObj(id, def) {
	try {
		return JSON.parse(getStored(id)) || def;
	} catch(e) {
		return def;
	}
}

function getCfg(obj) {
	if(obj && !$isEmpty(obj)) {
		return obj;
	} else {
		try {
			var rv = JSON.parse(getStored('DESU_Config_' + aib.dm));
			delStored('DESU_Config_' + aib.dm);
			if(rv['version']) {
				delete rv['version'];
				delete rv['lastScrUpd'];
				return rv;
			}
		} catch(e) {}
		return false;
	}
}

function saveComCfg(dm, obj) {
	if(obj) {
		comCfg[dm] = obj;
	} else {
		delete comCfg[dm];
	}
	setStored('DESU_Config', JSON.stringify(comCfg));
}

function saveCfg(id, val) {
	if(Cfg[id] !== val) {
		Cfg[id] = val;
		saveComCfg(aib.dm, Cfg);
	}
}

function readCfg() {
	comCfg = getStoredObj('DESU_Config', {});
	Cfg = getCfg(comCfg[aib.dm]);
	if(!Cfg) {
		Cfg = {};
		if(nav.isGlobal) {
			for(var i in comCfg['global']) {
				Cfg[i] = comCfg['global'][i];
			}
		}
		Cfg['captchaLang'] = aib.ru ? 2 : 1;
		Cfg['timePattern'] = Cfg['timeOffset'] = '';
		Cfg['correctTime'] = 0;
	}
	Cfg.__proto__ = defaultCfg;
	if(!nav.isBlob) {
		Cfg['preLoadImgs'] = 0;
		if(Cfg['ajaxReply'] === 2) {
			Cfg['ajaxReply'] = 1;
		}
	}
	if((aib.nul || aib.tiny) && Cfg['ajaxReply'] === 2) {
		Cfg['ajaxReply'] = 1;
	}
	if(!nav.Anim) {
		Cfg['animations'] = 0;
	}
	if(!nav.Firefox) {
		defaultCfg['favIcoBlink'] = 0;
	}
	if(nav.WebKit) {
		Cfg['favIcoBlink'] = 0;
	} else {
		Cfg['desktNotif'] = 0;
	}
	if(nav.Opera) {
		if(nav.Opera < 12) {
			Cfg['YTubeTitles'] = 0;
		}
		if(Cfg['YTubeType'] === 2) {
			Cfg['YTubeType'] = 1;
		}
		Cfg['preLoadImgs'] = 0;
		Cfg['findImgFile'] = 0;
		Cfg['updScript'] = 0;
	}
	if(Cfg['updThrDelay'] < 15) {
		Cfg['updThrDelay'] = 15;
	}
	if(!Cfg['saveSage']) {
		Cfg['sageReply'] = 0;
	}
	if(!Cfg['passwValue']) {
		Cfg['passwValue'] = Math.round(Math.random() * 1e15).toString(32);
	}
	if(!Cfg['stats']) {
		Cfg['stats'] = {'view': 0, 'op': 0, 'reply': 0};
	}
	if(TNum) {
		Cfg['stats']['view']++;
	}
	saveComCfg(aib.dm, Cfg);
	lang = Cfg['language'];
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
	spells = new Spells(!!Cfg['hideBySpell']);
	tubeTitles = JSON.parse(sessionStorage['de-yt-titles'] || '{}');
	aib.rep = aib.fch || aib.krau || dTime || spells.haveReps || Cfg['crossLinks'];
}

function toggleCfg(id) {
	saveCfg(id, !Cfg[id] ? 1 : 0);
}

function readPostsVisib() {
	sVis = [];
	if(TNum) {
		var data = (sessionStorage['de-hidden-' + brd + TNum] || '').split(',');
		if(data.length === 2 && +data[0] === (Cfg['hideBySpell'] ? spells.hash : 0)) {
			sVis = data[1].split('');
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
		sessionStorage['de-hidden-' + brd + TNum] =
			(Cfg['hideBySpell'] ? spells.hash + ',' : '0,') + sVis.join('');
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
	comHThr = getStoredObj('DESU_Threads', {});
	hThr = (comHThr[aib.dm] || {})[brd] || {};
}

function cleanHiddenThreads(b) {
	if($isEmpty(comHThr[aib.dm][b])) {
		delete comHThr[aib.dm][b];
	}
	if($isEmpty(comHThr[aib.dm])) {
		delete comHThr[aib.dm];
	}
}

function saveHiddenThreads() {
	(comHThr[aib.dm] || (comHThr[aib.dm] = {}))[brd] = hThr;
	cleanHiddenThreads(brd);
	setStored('DESU_Threads', JSON.stringify(comHThr));
}

function toggleHiddenThread(post, vis) {
	if(vis === 0) {
		hThr[post.num] = post.tTitle;
	} else {
		delete hThr[post.num];
	}
	saveHiddenThreads();
}

function readFavorites() {
	Favor = getStoredObj('DESU_Favorites', {});
}

function saveFavorites() {
	setStored('DESU_Favorites', JSON.stringify(Favor));
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
		saveFavorites();
		return;
	}
	if(!Favor[h]) {
		Favor[h] = {};
	}
	if(!Favor[h][b]) {
		Favor[h][b] = {};
	}
	Favor[h][b][tNum] = {'cnt': post.thr.pCount, 'txt': post.tTitle, 'url': aib.getThrdUrl(brd, tNum)};
	btn.className = 'de-btn-fav-sel';
	saveFavorites();
}

function readViewedPosts() {
	if(Cfg['markViewed']) {
		var data = sessionStorage['de-viewed'];
		if(data) {
			data.split(',').forEach(function(pNum) {
				var post = pByNum[pNum];
				if(post) {
					post.classList.add('de-viewed');
					post.viewed = true;
				}
			});
		}
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

function closePanel() {
	if(Cfg['animation']) {
		nav.animEvent($id('de-panel'), function(node) {
			$id('de-panel-btns').style.display = 'none';
			$id('de-panel').removeAttribute('class');
		});
		$id('de-panel').className = 'de-panel-close';
	} else {
		$id('de-panel-btns').style.display = 'none';
	}
}

function addPanel() {
	var imgLen = getPostImages(dForm).length;
	$before(dForm, $New('div', {'id': 'de-main', 'lang': getThemeLang()}, [
		$event($New('div', {'id': 'de-panel'}, [
			$new('span', {'id': 'de-btn-logo', 'title': Lng.panelBtn['attach'][lang]}, {'click': function() {
				var el = this.parentNode;
				if(Cfg['expandPanel']) {
					closePanel();
					el.locked = false;
				} else {
					el.locked = true;
				}
				toggleCfg('expandPanel');
			}}),
			$New('ul', {
				'id': 'de-panel-btns',
				'style': 'display: ' + (Cfg['expandPanel'] ? 'inline-block;' : 'none;')
			}, [
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
				}, null, TNum ? null : addAjaxPagesMenu, 'de_out(false)'),
				pButton('goback', null, aib.getPageUrl(brd, pageNum - 1), null, null),
				$if(!TNum, pButton('gonext', null, aib.getPageUrl(brd, pageNum + 1), null, null)),
				pButton('goup', function(e) {
					$pd(e);
					window.scrollTo(0, 0);
				}, null, null, null),
				pButton('godown', function(e) {
					$pd(e);
					window.scrollTo(0, doc.body.scrollHeight || doc.body.offsetHeight);
				}, null, null, null),
				$if(!TNum && (pr.form || oeForm), pButton('newthr', toggleMainReply, null, null, null)),
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
				$if(TNum && Cfg['updThread'] === 1, pButton('upd-on', function(e) {
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
					$del($id('de-menu'));
				}, null, addAudioNotifMenu, 'de_out(false)')),
				$if(aib.nul || aib.fch, pButton(
					'catalog', null,
					'//' + aib.host + '/' + brd + '/catalog.html',
					null, null
				)),
				$if(TNum, $add('<div id="de-panel-info"><span title="' +  Lng.panelBtn['counter'][lang] + '">' +
					Posts.length + '/' + imgLen + '</span></div>'))
			])
		]), {
			'mouseover': function() {
				if(!Cfg['expandPanel']) {
					clearTimeout(this.odelay);
					$id('de-panel-btns').style.display = 'inline-block';
					if(Cfg['animation']) {
						this.className = 'de-panel-open';
					}
				}
			},
			'mouseout': function() {
				if(!Cfg['expandPanel'] && !this.locked) {
					this.odelay = setTimeout(closePanel, 500);
				}
			}
		}),
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
	$id('de-panel').locked = isUpd || el.id !== id;
	if(el.hasChildNodes() && Cfg['animation']) {
		nav.animEvent(el, function(node) {
			showContent(node, id, name, isUpd);
			id = name = isUpd = null;
		});
		el.className = 'de-content de-cfg-close';
	} else {
		showContent(el, id, name, isUpd);
	}
}

function addContentBlock(parent, title) {
	return parent.appendChild($New('div', {'class': 'de-content-block'}, [
		$new('input', {'type': 'checkbox'}, {'click': function() {
			for(var el, res = this.checked, i = 0, els = $Q('.de-entry > div > input', this.parentNode); el = els[i++];) {
				el.checked = res;
			}
		}}),
		$new('b', {'text': title}, null)
	]));
}

function showContent(cont, id, name, isUpd) {
	var h, b, tNum, els, post, cln, block, obj, i = $id('de-panel');
	cont.innerHTML = cont.style.backgroundColor = '';
	if(!isUpd && cont.id === id) {
		cont.removeAttribute('id');
		return;
	}
	cont.id = id;
	if(name === 'cfg') {
		addSettings(cont);
	} else if(Cfg['attachPanel']) {
		cont.style.backgroundColor = $getStyle(doc.body, 'background-color');
	}

	if(name === 'hid') {
		readHiddenThreads();
		obj = comHThr[aib.dm];
		for(i = 0, els = $C('de-post-hid', dForm); post = els[i++];) {
			if(post.isOp) {
				continue;
			}
			(cln = post.cloneNode(true)).removeAttribute('id');
			cln.style.display = '';
			cln.hide = true;
			cln.pst = post;
			cln.btn = $q('.de-btn-hide, .de-btn-hide-user', cln);
			cln.btn.parentNode.className = 'de-ppanel';
			cln.btn.onmouseover = cln.btn.onmouseout = null;
			cln.btn.onclick = function() {
				var pst = getPost(this);
				togglePostContent(pst, pst.hide = !pst.hide);
			};
			(block || (block = cont.appendChild(
				$add('<div class="de-content-block"><b>' + Lng.hiddenPosts[lang] + ':</b></div>')
			))).appendChild($New('div', {'class': 'de-entry'}, [cln]));
		}
		if(block) {
			$append(cont, [
				$btn(Lng.expandAll[lang], '', function() {
					$each($Q('.de-entry > [de-post]', this.parentNode), function(el) {
						togglePostContent(el, el.hide = !el.hide);
					});
					this.value = this.value === Lng.undo[lang] ? Lng.expandAll[lang] : Lng.undo[lang];
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
			cont.appendChild($new('b', {'text': Lng.noHidPosts[lang]}, null));
		}
		$append(cont, [
			doc.createElement('hr'),
			$new('b', {'text': ($isEmpty(obj) ? Lng.noHidThrds[lang] : Lng.hiddenThrds[lang] + ':')}, null)
		]);
		if(!$isEmpty(obj)) {
			for(b in obj) {
				block = addContentBlock(cont, '/' + b);
				for(tNum in obj[b]) {
					block.insertAdjacentHTML('beforeend', '<div class="de-entry" info="' + b + ';' +
						tNum + '"><div class="' + aib.cReply + '"><input type="checkbox"><a href="' +
						aib.getThrdUrl(b, tNum) + '" target="_blank">№' + tNum + '</a> - ' +
						obj[b][tNum] + '</div></div>');
				}
			}
		}
		$append(cont, [
			doc.createElement('hr'),
			addEditButton('hidden', comHThr[aib.dm], true, function() {
				comHThr[aib.dm] = JSON.parse(
					$t('textarea', $id('de-alert-edit-hidden')).value.trim().replace(/[\n\r\t]/g, '')
				);
				setStored('DESU_Threads', JSON.stringify(comHThr));
			}),
			$btn(Lng.clear[lang], Lng.clrDeleted[lang], function() {
				$each($Q('.de-entry[info]', this.parentNode), function(el) {
					var arr = el.getAttribute('info').split(';');
					ajaxGetPosts(aib.getThrdUrl(arr[0], arr[1]), false, null, function(err) {
						delete comHThr[aib.dm][arr[0]][arr[1]];
						cleanHiddenThreads(arr[0]);
						saveHiddenThreads();
						saveUserPostsVisib();
						arr = null;
					});
				});
			}),
			$btn(Lng.remove[lang], Lng.clrSelected[lang], function() {
				$each($Q('.de-entry[info]', this.parentNode), function(el) {
					var arr = el.getAttribute('info').split(';');
					if($t('input', el).checked) {
						if(pByNum[arr[1]]) {
							setUserPostVisib(pByNum[arr[1]], false);
						} else {
							delete comHThr[aib.dm][arr[0]][arr[1]];
							cleanHiddenThreads(arr[0]);
						}
					}
				});
				saveHiddenThreads();
				saveUserPostsVisib();
			})
		]);
	}

	if(name === 'fav') {
		readFavorites();
		for(h in Favor) {
			for(b in Favor[h]) {
				block = addContentBlock(cont, h + '/' + b);
				for(tNum in Favor[h][b]) {
					i = Favor[h][b][tNum];
					if(!i['url'].startsWith('http')) {
						i['url'] = (h === aib.host ? aib.prot + '//' : 'http://') + h + i['url'];
					}
					block.appendChild($New('div', {'class': 'de-entry', 'info': h + ';' + b + ';' + tNum}, [
						$New('div', {'class': aib.cReply}, [
							$add('<input type="checkbox">'),
							$new('span', {'class': 'de-btn-expthr'}, {'click': loadFavorThread}),
							$add('<a href="' + i['url'] + '">№' + tNum + '</a>'),
							$add('<span class="de-fav-title"> - ' + i['txt'] + '</span>'),
							$add('<span class="de-fav-inf-page"></span>'),
							$add('<span class="de-fav-inf-posts">[<span class="de-fav-inf-old">' +
								i['cnt'] + '</span>]</span>')
						])
					]));
				}
			}
		}
		cont.insertAdjacentHTML('afterbegin', '<b>' + (Lng[block ? 'favThrds' : 'noFavThrds'][lang]) + '</b>');
		$append(cont, [
			doc.createElement('hr'),
			addEditButton('favor', Favor, true, function() {
				Favor = JSON.parse(
					$t('textarea', $id('de-alert-edit-favor')).value.trim().replace(/\\\n|[\n\r\t]/g, '')
				);
				setStored('DESU_Favorites', JSON.stringify(Favor));
			}),
			$btn(Lng.info[lang], Lng.infoCount[lang], function() {
				$each($C('de-entry', doc), function(el) {
					var c, arr = el.getAttribute('info').split(';'),
						f = Favor[arr[0]][arr[1]][arr[2]];
					if(arr[0] !== aib.host) {
						return;
					}
					c = $attr($c('de-fav-inf-posts', el).firstElementChild, {'class': 'de-wait', 'text': ''});
					ajaxGetPosts(aib.getThrdUrl(arr[1], arr[2]), true, function(els, op) {
						var cnt = els.length + 1;
						c.textContent = cnt;
						if(cnt > f.cnt) {
							c.className = 'de-fav-inf-new';
							f.cnt = cnt;
							setStored('DESU_Favorites', JSON.stringify(Favor));
						} else {
							c.className = 'de-fav-inf-old';
						}
						c = f = null;
					}, function(err) {
						c.textContent = err;
						c.className = 'de-fav-inf-old';
						c = null;
					});
				});
			}),
			$btn(Lng.page[lang], Lng.infoPage[lang], function() {
				var i = 6,
					loaded = 0;
				$alert(Lng.loading[lang], 'load-pages', true);
				while(i--) {
					loadPageHelper(i, function(page, idx) {
						for(var arr, el, j = 0, els = $C('de-entry', doc); el = els[j++];) {
							arr = el.getAttribute('info').split(';');
							if(arr[0] === aib.host && arr[1] === brd) {
								el = $c('de-fav-inf-page', el);
								if((new RegExp('(?:№|No.|>)\\s*' + arr[2] + '\\s*<')).test(page.innerHTML)) {
									el.innerHTML = '@' + (aib.tiny ? idx + 1 : idx);
								} else if(loaded === 5 && !el.textContent.contains('@')) {
									el.innerHTML = '@?';
								}
							}
						}
						if(loaded === 5) {
							closeAlert($id('de-alert-load-pages'));
						}
						loaded++;
					});
				}
			}),
			$btn(Lng.clear[lang], Lng.clrDeleted[lang], function() {
				$each($C('de-entry', doc), function(el) {
					var arr = el.getAttribute('info').split(';');
					if(nav.Opera && arr[0] !== aib.host) {
						return;
					}
					ajaxGetPosts(Favor[arr[0]][arr[1]][arr[2]]['url'], false, null, function(err) {
						removeFavorites(arr[0], arr[1], arr[2]);
						saveFavorites();
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
				saveFavorites();
			})
		]);
	}

	if(Cfg['animation']) {
		cont.className = 'de-content de-cfg-open';
	}
}


/*==============================================================================
								"SETTINGS" WINDOW
==============================================================================*/

function fixSettings() {
	var toggleBox = function(state, arr) {
		var i = arr.length;
		while(i--) {
			($q(arr[i], doc) || {}).disabled = !state;
		}
	};
	toggleBox(Cfg['updThread'] === 1, [
		'input[info="updThrDelay"]', 'input[info="favIcoBlink"]', 'input[info="desktNotif"]'
	]);
	toggleBox(Cfg['preLoadImgs'], ['input[info="findImgFile"]']);
	toggleBox(Cfg['openImgs'], ['input[info="openGIFs"]']);
	toggleBox(Cfg['linksNavig'], [
		'input[info="linksOver"]',
		'input[info="linksOut"]',
		'input[info="markViewed"]',
		'input[info="strikeHidd"]',
		'input[info="noNavigHidd"]'
	]);
	toggleBox(Cfg['addYouTube'] && Cfg['addYouTube'] !== 4, [
		'select[info="YTubeType"]', 'input[info="YTubeHD"]'
	]);
	toggleBox(Cfg['addYouTube'], [
		'input[info="YTubeWidth"]', 'input[info="YTubeHeigh"]', 'input[info="YTubeTitles"]'
	]);
	toggleBox(Cfg['ajaxReply'] === 2, [
		'input[info="postSameImg"]', 'input[info="removeEXIF"]', 'input[info="removeFName"]'
	]);
	toggleBox(Cfg['addTextBtns'], ['input[info="txtBtnsLoc"]']);
	toggleBox(Cfg['updScript'], ['select[info="scrUpdIntrv"]']);
}


function lBox(id, isBlock, Fn) {
	var el = $new('input', {'info': id, 'type': 'checkbox'}, {'click': function() {
		toggleCfg(this.getAttribute('info'));
		fixSettings();
		if(Fn) {
			Fn(this);
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

function optSel(id, isBlock, Fn) {
	for(var i = 0, x = Lng.cfg[id], len = x.sel[lang].length, el, opt = ''; i < len; i++) {
		opt += '<option value="' + i + '">' + x.sel[lang][i] + '</option>';
	}
	(el = $event($add('<select info="' + id + '">' + opt + '</select>'), {
		'change': Fn ? Fn : function() {
			saveCfg(this.getAttribute('info'), this.selectedIndex);
			fixSettings();
		}
	})).selectedIndex = Cfg[id];
	return $New('label', isBlock ? {'class': 'de-block'} : null, [el, $txt(' ' + x.txt[lang])]);
}

function cfgTab(name) {
	return $New('div', {'class': aib.cReply + ' de-cfg-tab-back', 'selected': false}, [$new('div', {
		'class': 'de-cfg-tab',
		'text': Lng.cfgTab[name][lang],
		'info': name}, {
		'click': function() {
			var el, id, pN = this.parentNode;
			if(pN.getAttribute('selected') === 'true') {
				return;
			}
			if(el = $c('de-cfg-body', doc)) {
				el.className = 'de-cfg-unvis';
				$q('.de-cfg-tab-back[selected="true"]', doc).setAttribute('selected', false);
			}
			pN.setAttribute('selected', true);
			if(!(el = $id('de-cfg-' + (id = this.getAttribute('info'))))) {
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
				spells.update();
				$id('de-spell-edit').value = spells.list;
			}
			fixSettings();
		}
	})]);
}

function updRowMeter() {
	var top = this.scrollTop,
		el = $id('de-spell-rowmeter'),
		num = el.numLines || 1,
		str = '',
		i = 19;
	if(num - i < (top / 12) | 0 + 1) {
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
		lBox('hideBySpell', false, toggleSpells),
		$New('div', {'id': 'de-spell-panel'}, [
			$new('a', {
				'text': Lng.add[lang],
				'href': '#',
				'class': 'de-abtn',
				'onmouseout': 'de_out(false)'}, {
				'click': $pd,
				'mouseover': addSpellMenu
			}),
			$new('a', {'text': Lng.apply[lang], 'href': '#', 'class': 'de-abtn'}, {'click': function(e) {
				$pd(e);
				saveCfg('hideBySpell', 1);
				$q('input[info="hideBySpell"]', doc).checked = true;
				toggleSpells();
			}}),
			$new('a', {'text': Lng.clear[lang], 'href': '#', 'class': 'de-abtn'}, {'click': function(e) {
				$pd(e);
				$id('de-spell-edit').value = '';
				toggleSpells();
			}}),
			$add('<a href="https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/Spells-' +
				(lang ? 'en' : 'ru') + '" class="de-abtn" target="_blank">' + Lng.help[lang] + '</a>')
		]),
		$New('div', {'id': 'de-spell-div'}, [
			$add('<div><div id="de-spell-rowmeter"></div></div>'),
			$New('div', null, [$new('textarea', {'id': 'de-spell-edit', 'wrap': 'off'}, {
				'keydown': updRowMeter,
				'scroll': updRowMeter
			})])
		]),
		lBox('menuHiddBtn', true, null),
		lBox('hideRefPsts', true, null),
		lBox('delHiddPost', true, function() {
			$each($C('de-post-hid', dForm), function(post) {
				var wrap = aib.getWrap(post),
					hide = !wrap.classList.contains('de-hidden');
				if(hide) {
					wrap.insertAdjacentHTML('afterend', '<span style="counter-increment: de-cnt 1;"></span>');
				} else {
					$del(wrap.nextSibling);
				}
				wrap.classList.toggle('de-hidden');
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
		$New('div', {'class': 'de-cfg-depend'}, [
			$if(!nav.WebKit, lBox('favIcoBlink', true, null)),
			$if(nav.WebKit, lBox('desktNotif', true, function() {
				if(Cfg['desktNotif']) {
					window.webkitNotifications.requestPermission();
				}
			}))
		]),
		optSel('expandPosts', true, null),
		optSel('expandImgs', true, null),
		$if(nav.isBlob && !nav.Opera, lBox('preLoadImgs', true, null)),
		$if(nav.isBlob && !nav.Opera, $New('div', {'class': 'de-cfg-depend'}, [
			lBox('findImgFile', true, null)
		])),
		$New('div', null, [
			lBox('openImgs', false, null),
			$txt(' ('),
			lBox('openGIFs', false, null),
			$txt(')*')
		]),
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
		$New('div', {'class': 'de-cfg-depend'}, [
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
		$New('div', {'class': 'de-cfg-depend'}, [
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
		$New('div', {'class': 'de-cfg-depend'}, [
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
		$if(nav.isBlob, $New('div', {'class': 'de-cfg-depend'}, [
			lBox('postSameImg', true, null),
			lBox('removeEXIF', true, null),
			lBox('removeFName', true, null)
		])),
		$if(pr.form, optSel('addPostForm', true, null)),
		$if(pr.form, lBox('scrAfterRep', true, null)),
		$if(pr.form, lBox('noThrdForm', true, function() {
			if(!TNum) {
				$id('de-parea').style.display = Cfg['noThrdForm'] ? 'none' : '';
			}
		})),
		lBox('favOnReply', true, null),
		$if(pr.mail, $New('div', null, [
			lBox('addSageBtn', false, null),
			lBox('saveSage', false, null)
		])),
		$if(pr.subj, lBox('warnSubjTrip', false, null)),
		optSel('captchaLang', true, null),
		$if(pr.form, $New('div', null, [
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
			$if(pr.form || oeForm, $txt(Lng.dontShow[lang])),
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
		optSel('scriptStyle', true, function() {
			saveCfg('scriptStyle', this.selectedIndex);
			$id('de-main').lang = getThemeLang();
		}),
		$New('div', null, [
			lBox('userCSS', false, updateCSS),
			addEditButton('css', Cfg['userCSSTxt'], false, function() {
				saveCfg('userCSSTxt', $t('textarea', $id('de-alert-edit-css')).value);
				updateCSS();
			})
		]),
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
			$New('div', {'class': 'de-cfg-depend'}, [
				optSel('scrUpdIntrv', true, null),
				$btn(Lng.checkNow[lang], '', function() {
					var el = $id('de-cfg-updresult');
					el.innerHTML = '<span class="de-wait">' + Lng.checking[lang] + '</div>';
					checkForUpdates(true, function(html) {
						el.innerHTML = html;
					});
				})
			]),
			$new('div', {'id': 'de-cfg-updresult'}, null)
		]))
	]);
}

function getCfgInfo() {
	return $New('div', {'class': 'de-cfg-unvis', 'id': 'de-cfg-info'}, [
		$add('<div style="width: 179px;"><b>' + Lng.version[lang] + version + '</b><br><br>' +
			Lng.thrViewed[lang] + Cfg['stats']['view'] + '<br>' +
			Lng.thrCreated[lang] + Cfg['stats']['op'] + '<br>' +
			Lng.posts[lang] + Cfg['stats']['reply'] + '</div>'),
		$add('<div style="padding-left: 7px; border-left: 1px solid grey;">' +
			timeLog.join('<br>') + '</div>'),
		$add('<span><a href="http://www.freedollchan.org/scripts/" target="_blank">Freedollchan</a>&nbsp;' +
			'<a href="https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/' +
			(lang ? 'home-en/' : '') + '" target="_blank">Github</a></span>'),
		$attr($btn(Lng.debug[lang], Lng.infoDebug[lang], function() {
			var i, nCfg = {};
			for(i in Cfg) {
				if(Cfg[i] !== defaultCfg[i] && i !== 'stats' && i !== 'nameValue' && i !== 'passwValue' && i !== 'signatValue') {
					nCfg[i] = Cfg[i];
				}
			}
			$alert(Lng.infoDebug[lang] + ':<textarea readonly class="de-editor">' + getPrettyJSON({
				'version': version,
				'location': String(window.location),
				'nav': nav,
				'cfg': nCfg,
				'spells': spells.list.split('\n'),
				'cSpells': getStored('DESU_CSpells_' + aib.dm),
				'oSpells': sessionStorage['de-spells-' + brd + TNum],
				'perf': timeLog
			}, '') + '</textarea>', 'help-debug', false);
		}), {'style': 'float: right;'})
	]);
}

function addEditButton(name, val, isJSON, Fn) {
	return $btn(Lng.edit[lang], Lng.editInTxt[lang], function() {
		$alert('', 'edit-' + name, false);
		$append($c('de-alert-msg', $id('de-alert-edit-' + name)), [
			$txt(Lng.editor[name][lang]),
			$new('textarea', {'class': 'de-editor', 'value': isJSON ? getPrettyJSON(val, '') : val}, null),
			$btn(Lng.save[lang], Lng.saveChanges[lang], isJSON ? function() {
				try {
					Fn();
					window.location.reload();
				} catch(e) {
					$alert(Lng.invalidData[lang], 'err-invaliddata', false);
				}
			} : Fn)
		]);
	});
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
			optSel('language', false, function() {
				saveCfg('language', lang = this.selectedIndex);
				$del($id('de-main'));
				$del($id('de-css'));
				$del($id('de-css-dynamic'));
				scriptCSS();
				addPanel();
				toggleContent('cfg', false);
			}),
			$New('div', {'style': 'float: right;'}, [
				$if(nav.isGlobal, $btn(Lng.load[lang], Lng.loadGlobal[lang], function() {
					if(getCfg(comCfg['global'])) {
						saveComCfg(aib.dm, null);
						window.location.reload();
					} else {
						$alert(Lng.noGlobalCfg[lang], 'err-noglobalcfg', false);
					}
				})),
				$if(nav.isGlobal, $btn(Lng.save[lang], Lng.saveGlobal[lang], function() {
					var i, obj = {},
						com = comCfg[aib.dm];
					for(i in com) {
						if(com[i] !== defaultCfg[i] && i !== 'stats') {
							obj[i] = com[i];
						}
					}
					saveComCfg('global', obj);
					toggleContent('cfg', true);
				})),
				addEditButton('cfg', Cfg, true, function() {
					saveComCfg(aib.dm, JSON.parse(
						$t('textarea', $id('de-alert-edit-cfg')).value.trim().replace(/[\n\r\t]/g, '')
					));
				}),
				$btn(Lng.reset[lang], Lng.resetCfg[lang], function() {
					if(confirm(Lng.conReset[lang])) {
						delStored('DESU_Config');
						delStored('DESU_Favorites');
						delStored('DESU_Threads');
						setStored(
							'DESU_Spells_' + aib.dm,
							'[1,85765385,"#wipe(samelines,samewords,longwords,numbers)"]'
						);
						window.location.reload();
					}
				})
			]),
			$new('div', {'style': 'clear: both;'}, null)
		])
	]));
	$c('de-cfg-tab', Set).click();
	$id('de-spell-edit').setSelectionRange(0, 0);
	updRowMeter();
}


/*==============================================================================
								POPUP ALERT MESSAGES
==============================================================================*/

function closeAlert(el) {
	if(el) {
		el.closeTimeout = null;
		if(Cfg['animation']) {
			nav.animEvent(el, $del);
			el.classList.add('de-close');
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
				node.classList.remove('de-blink');
			});
			el.classList.add('de-blink');
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
				node.classList.remove('de-open');
			});
			el.classList.add('de-open');
		}
	}
	if(Cfg['closePopups'] && !wait && !id.contains('help')) {
		el.closeTimeout = setTimeout(closeAlert, 4e3, el);
	}
}


/*==============================================================================
								DROPDOWN SELECT MENU
==============================================================================*/

function addMenu(el, isPanel, html) {
	var y, pos, menu, offE = $offset(el);
	if(Cfg['attachPanel'] && isPanel) {
		pos = 'fixed';
		y = el.id === 'de-btn-refresh' || el.id === 'de-btn-audio-off' ?
			'bottom: 25' :
			'top: ' + (el.getBoundingClientRect().top + el.offsetHeight);
	} else {
		pos = 'absolute';
		y = 'top: ' + (offE.top + el.offsetHeight);
	}
	doc.body.insertAdjacentHTML('beforeend', '<div class="' + aib.cReply +
		'" id="de-menu" style="position: ' + pos + '; ' + (
			el.className === 'de-btn-src' ?
				'left: ' + offE.left :
				'right: ' + (doc.documentElement.clientWidth - offE.left - el.offsetWidth)
		) + 'px; ' + y + 'px;" onmouseout="de_out(false)" onmouseover="de_overmenu(this)">' + html + '</div>');
	el = $event(doc.body.lastChild, {'mouseover': function() {
		if(this) {
			markPviewToDel(this, false);
		}
	}.bind(getPost(el))});
	return html ? $Q('span', el) : el;
}

function addSpellMenu(e) {
	$each(addMenu(
		e.target, true,
		'<div style="display: inline-block; border-right: 1px solid grey;"><span>' +
			('#words,#exp,#exph,#imgn,#ihash,#subj,#name,#trip,#img')
				.split(',').join('</span><span>') +
			'</span></div><div style="display: inline-block;"><span>' +
			('#sage,#op,#tlen,#all,#video,#num,#wipe,#rep,#outrep')
				.split(',').join('</span><span>') + '</span></div>'
	), function(el) {
		el.onclick = function() {
			var exp = this.textContent,
				idx = spells.names.indexOf(exp.substr(1));
			$txtInsert($id('de-spell-edit'), exp + (
				TNum && exp !== '#op' && exp !== '#rep' && exp !== '#outrep' ?
					'[' + brd + ',' + TNum + ']' : ''
			) + (idx < 5 || idx > 14 ? '(' : ''));
		};
	});
}

function addSelSpell(selText) {
	var start = this.startContainer,
		end = this.endContainer;
	if(start.nodeType === 3) {
		start = start.parentNode;
	}
	if(end.nodeType === 3) {
		end = end.parentNode;
	}
	if((nav.matchesSelector(start, aib.qMsg + ' *') && nav.matchesSelector(end, aib.qMsg + ' *')) ||
		(nav.matchesSelector(start, '.' + aib.cSubj) && nav.matchesSelector(end, '.' + aib.cSubj))
	) {
		if(selText.contains('\n')) {
			addSpell('#exp', '(/' + regQuote(selText).replace(/\n/g, '\\n').replace(/\r/g, '') + '/)');
		} else {
			addSpell('#words', '(' + selText.replace(/\)/g, '\\)').toLowerCase() + ')');
		}
	} else {
		dummy.innerHTML = '';
		dummy.appendChild(this.cloneContents());
		addSpell('#exph', '(/' + regQuote(dummy.innerHTML.replace(/^<[^>]+>|<[^>]+>$/g, '')) + '/)');
	}
}

function addPostHideMenu(post) {
	if(!Cfg['menuHiddBtn']) {
		return;
	}
	var el, sel, ssel, menu = addMenu(post.btns.firstChild, false, ''),
		add = function(name, Fn) {
			menu.appendChild($add('<span>' + Lng.selHiderMenu[name][lang] + '</span>')).onclick = Fn;
		};
	sel = nav.Opera ? doc.getSelection() : window.getSelection();
	if(ssel = sel.toString()) {
		add('sel', addSelSpell.bind(sel.getRangeAt(0), ssel));
	}
	if(el = $c(aib.cTrip, post)) {
		add('trip', function() {
			addSpell('#trip', '(' + el.textContent.replace(/\)/g, '\\)') + ')');
		});
	}
	if(post.img[0]) {
		add('img', function() {
			addSpell('#img', '(=' + getImgWeight(post) + '@' + getImgSize(post).join('x') + ')');
		});
		add('ihash', function() {
			addSpell('#ihash', '(' + getImgHash(post) + ')');
		});
	} else {
		add('noimg', function() {
			addSpell('(#all', ' & !#img)');
		});
	}
	if(getText(post)) {
		add('text', hideBySameText.bind(window, post));
	} else {
		add('notext', function() {
			addSpell('(#all', ' & !#tlen)');
		});
	}
	menu = null;
}

function addExpandThreadMenu(post) {
	$each(addMenu(
		$c('de-btn-expthr', post.btns), false,
		'<span>' + Lng.selExpandThrd[lang].join('</span><span>') + '</span>'
	), function(el) {
		el.onclick = function() {
			loadThread(post, parseInt(this.textContent, 10), null);
		};
	});
}

function addAjaxPagesMenu() {
	$each(addMenu(
		this, true, '<span>' + Lng.selAjaxPages[lang].join('</span><span>') + '</span>'
	), function(el) {
		el.onclick = function() {
			var i = aProto.indexOf.call(this.parentNode.children, this);
			if(i === 0) {
				updatePage();
			} else {
				loadPages(i + 1);
			}
		};
	});
}

function addAudioNotifMenu() {
	if(this.id !== 'de-btn-audio-off') {
		return;
	}
	$each(addMenu($id('de-btn-audio-off'), true,
		'<span>' + Lng.selAudioNotif[lang].join('</span><span>') + '</span>'
	), function(el) {
		el.onclick = function() {
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

function addImgSearchMenu(node) {
	var p = node.nextSibling.href + '" target="_blank">' + Lng.search[lang],
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
	addMenu(
		node, false, '<a class="de-src-iqdb" href="http://iqdb.org/?url=' + p + 'IQDB</a>' +
			'<a class="de-src-tineye" href="http://tineye.com/search/?url=' + p + 'TinEye</a>' +
			'<a class="de-src-google" href="http://google.com/searchbyimage?image_url=' + p + 'Google</a>' +
			'<a class="de-src-saucenao" href="http://saucenao.com/search.php?url=' + p + 'SauceNAO</a>' + str
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
			var post = posts[idx], mIdx = idx;
			while(post.hide || post.thr.hide) {
				post = posts[mIdx += dir];
				if(!post) {
					return idx;
				}
			}
			if(mIdx !== idx || scroll) {
				window.scrollTo(
					0, toTop ?
						$offset(post).top :
						$offset(post).top - window.innerHeight / 2 + post.clientHeight / 2
				);
			}
			if(idx = $c('de-selected', doc)) {
				idx.classList.remove('de-selected');
			}
			if(post.isOp) {
				post = post.thr;
			}
			post.classList.add('de-selected');
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
		if(e.ctrlKey) {
			if(kc === 37) {
				window.location.pathname = aib.getPageUrl(brd, TNum || pageNum === 0 ? 0 : pageNum - 1);
			} else if(!TNum && kc === 39) {
				window.location.pathname = aib.getPageUrl(brd, pageNum + 1);
			}
			return;
		}
		if(
			e.altKey || e.shiftKey ||
			kc !== 74 && kc !== 75 && kc !== 77 && kc !== 78 && kc !== 86 && kc !== 116
		) {
			return;
		}
		if(kc === 116) {
			if(!TNum) {
				$pd(e);
				updatePage();
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
				GM_openInTab(aib.getThrdUrl(brd, Threads[curTh].num), false, true);
			} else {
				window.open(aib.getThrdUrl(brd, Threads[curTh].num), '_blank');
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
	var pArea = $New('div', {'id': 'de-parea'}, [
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
	pArea.insertAdjacentHTML('afterend', '<div id="de-qarea" class="' + aib.cReply + '" style="display: none;"></div>');
	if(Cfg['addPostForm'] === 3) {
		$append($id('de-qarea'), [
			$add('<span id="de-qarea-target">' + Lng.replyTo[lang] + ' <a class="de-abtn"></a></span>'),
			$new('span', {'id': 'de-qarea-close', 'text': '×'}, {'click': showMainReply})
		]);
	}
	if(aib.tire) {
		$each($Q('input[type="hidden"]', dForm), $del);
		dForm.appendChild($c('userdelete', doc.body));
	}
	if(pr.form) {
		doPostformChanges(null, null);
	} else if(oeForm) {
		ajaxGetPosts(aib.getThrdUrl(brd, Posts[0].num), false, doPostformChanges, null);
	}
}

function addTextResizer() {
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
		node.imgFile = null;
	});
}

function processInput() {
	if(!this.haveBtns) {
		this.haveBtns = true;
		$after(this, $new('button', {
			'class': 'de-file-util de-file-del',
			'text': Lng.clear[lang],
			'type': 'button'}, {
			'click': function(e) {
				$pd(e);
				var el = this.parentNode;
				delFileUtils(el);
				$event(pr.file = $q('input[type="file"]', $html(el, el.innerHTML)), {'change': processInput});
			}
		}));
	} else if(this.imgFile) {
		this.imgFile = null;
		$del(this.nextSibling);
	}
	$del($c('de-file-rar', this.parentNode));
	eventFiles(pr.getTR(this));
	if(!nav.isBlob || !/^image\/(?:png|jpeg)$/.test(this.files[0].type)) {
		return;
	}
	$after(this, $new('button', {
		'class': 'de-file-util de-file-rar',
		'text': Lng.addFile[lang],
		'title': Lng.helpAddFile[lang],
		'type': 'button'}, {
		'click': function(e) {
			$pd(e);
			var el = $id('de-input-rar') || doc.body.appendChild($new('input', {
					'id': 'de-input-rar',
					'type': 'file',
					'style': 'display: none;'
				}, null));
			el.onchange = function(inp, e) {
				$del(this);
				var file = e.target.files[0],
					fr = new FileReader();
				inp.insertAdjacentHTML('afterend', '<span class="de-file-util" style="margin: 0 5px;">' +
					'<span class="de-wait"></span>' + Lng.wait[lang] + '</span>');
				fr.onload = function(input, node, e) {
					if(input.nextSibling === node) {
						$attr(node, {
							'style': 'font-weight: bold; margin: 0 5px; cursor: default;',
							'title': input.files[0].name + ' + ' + this.name,
							'text': input.files[0].name.replace(/^.+\./, '') + ' + ' +
								this.name.replace(/^.+\./, '')
						});
						input.imgFile = e.target.result;
					}
				}.bind(file, inp, inp.nextSibling);
				fr.readAsArrayBuffer(file);
			}.bind(this, $q('input[type="file"]', this.parentNode));
			el.click();
		}
	}));
}

function refreshCapSrc(src, tNum) {
	if(aib.kus || aib.tinyIb) {
		return src.replace(/\?[^?]+$|$/, (aib._410 ? '?board=' + brd + '&' : '?') + Math.random());
	}
	if(tNum > 0) {
		src = src.replace(/mainpage|res\d+/ig, 'res' + tNum);
	}
	return src.replace(/dummy=[\d\.]*/, 'dummy=' + Math.random());
}

function refreshCapImg(tNum, isFocus) {
	if(!pr.cap) {
		return;
	}
	if(aib.abu) {
		uWindow['GetCaptcha']('captcha_div');
		pr.cap = $q('input[name="captcha_value"]', pr.form);
	}
	if(isFocus) {
		pr.cap.focus();
	}
	if(aib.abu) {
		return;
	}
	pr.cap.value = '';
	var src, e, img = pr.recap ? $id('recaptcha_image') || pr.recap : $t('img', pr.getTR(pr.cap));
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

function updateCaptcha() {
	if(!pr.cap || aib.abu) {
		return;
	}
	var img, _img;
	if(pr.recap && (img = $id('recaptcha_image'))) {
		$attr(img, {'onclick': 'Recaptcha.reload()', 'style': 'width: 300px; cursor: pointer;'});
	}
	pr.cap.autocomplete = 'off';
	pr.cap.onfocus = null;
	pr.cap.onkeypress = (function() {
		var ru = 'йцукенгшщзхъфывапролджэячсмитьбюё',
			en = 'qwertyuiop[]asdfghjkl;\'zxcvbnm,.`';
		return function(e) {
			if(!Cfg['captchaLang'] || e.which === 0) {
				return;
			}
			var i, code = e.charCode || e.keyCode,
				chr = String.fromCharCode(code).toLowerCase();
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
	})();
	if(aib.hana || pr.recap) {
		return;
	}
	img = $q('a, img', pr.getTR(pr.cap));
	_img = $new('img', {
		'alt': Lng.loading[lang],
		'title': Lng.refresh[lang],
		'style': 'display: block; border: none; cursor: pointer;'}, {
		'click': function() {
			refreshCapImg(TNum || 0, false);
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

function doPostformChanges(el, btn) {
	pr.form.style.display = 'inline-block';
	pr.form.style.textAlign = 'left';
	if(nav.Firefox) {
		$event(pr.txta, {'mouseup': function() {
			saveCfg('textaWidth', parseInt(this.style.width, 10));
			saveCfg('textaHeight', parseInt(this.style.height, 10));
		}});
	} else {
		addTextResizer();
	}
	addTextPanel();
	pr.txta.style.cssText =
		'padding: 0; width: ' + Cfg['textaWidth'] + 'px; height: ' + Cfg['textaHeight'] + 'px;';
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
		if(Cfg['warnSubjTrip'] && pr.subj && /#.|##./.test(pr.subj.value)) {
			$pd(e);
			$alert(Lng.subjHasTrip[lang], 'upload', false);
			return;
		}
		if(spells.haveOutreps) {
			val = spells.outReplace(val);
		}
		if(Cfg['userSignat'] && sVal) {
			val += '\n' + sVal;
		}
		if(pr.tNum && ($c('filetitle', pByNum[pr.tNum]) || {}).textContent ===
			'Dollchan Extension Tools' && !/`\-{50}`$/.test(val)) {
			val += '\n\n`--------------------------------------------------`\n' +
				'`' + window.navigator.userAgent + '`\n`v' + version + '`' +
				'\n`--------------------------------------------------`';
		}
		pr.txta.value = val;
		if(Cfg['ajaxReply']) {
			$alert(Lng.checking[lang], 'upload', true);
		}
		if(Cfg['favOnReply'] && pr.tNum) {
			toggleFavorites(pByNum[pr.tNum], $c('de-btn-fav', pByNum[pr.tNum].btns));
		}
		if(pr.video && (val = pr.video.value) && (val = val.match(reTubeLink))) {
			pr.video.value = aib.nul ? val[1] : 'http://www.youtube.com/watch?v=' + val[1];
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
		$disp(pr.getTR(pr.passw));
	}
	$event(window, {'load': function() {
		if(Cfg['userName'] && pr.name) {
			setTimeout(setUserName, 1e3);
		}
		if(pr.passw) {
			setTimeout(setUserPassw, 1e3);
		}
	}});
	updateCaptcha();
	if(Cfg['addSageBtn'] && pr.mail) {
		btn = $new('span', {'id': 'de-sagebtn'}, {'click': function(e) {
			e.stopPropagation();
			$pd(e);
			toggleCfg('sageReply');
			doSageBtn();
		}});
		el = $x('ancestor::label', pr.mail) || pr.mail;
		if(el.nextElementSibling || el.previousElementSibling) {
			$disp(el);
			$after(el, btn);
		} else {
			$disp(pr.getTR(pr.mail));
			$after(pr.name || pr.subm, btn);
		}
		setTimeout(doSageBtn, 0);
	}
	if(Cfg['ajaxReply'] === 2) {
		pr.form.onsubmit = function(e) {
			$pd(e);
			doHTML5Submit(pr.form, pr.subm, checkUpload);
		};
		dForm.onsubmit = $pd;
		if(btn = $q(aib.qDelBut, dForm)) {
			btn.onclick = function(e) {
				$pd(e);
				showMainReply();
				$alert(Lng.deleting[lang], 'deleting', true);
				doHTML5Submit(dForm, this, checkDelete);
			};
		}
	} else if(Cfg['ajaxReply'] === 1) {
		$id('de-main').insertAdjacentHTML('beforeend',
			'<iframe name="de-iframe-pform" src="about:blank" style="display: none;"></iframe>' +
			'<iframe name="de-iframe-dform" src="about:blank" style="display: none;"></iframe>'
		);
		$attr(pr.form, {'target': 'de-iframe-pform'}).onsubmit = null;
		$attr(dForm, {'target': 'de-iframe-dform'}).onsubmit = function() {
			showMainReply();
			$alert(Lng.deleting[lang], 'deleting', true);
		};
	}
	if(pr.file) {
		eventFiles(pr.getTR(pr.file));
	}
}


/*==============================================================================
							FORM SUBMIT FUNCTIONS
==============================================================================*/

function getSubmitResponse(dc, isFrame) {
	var i, els, el, err = '', form = $q(aib.qDForm, dc);
	if(dc.body.hasChildNodes() && !form) {
		for(i = 0, els = $Q(aib.qError, dc); el = els[i++];) {
			err += el.innerHTML + '\n';
		}
		if(!(err = err.replace(/<a [^>]+>Назад.+|<br.+/, ''))) {
			err = Lng.error[lang] + '\n' + dc.body.innerHTML;
		}
		err = /successful|uploaded|updating|обновл|удален[о\.]/i.test(err) ? '' : err.replace(/"/g, "'");
	}
	return [(isFrame ? window.location : form ? aib.getThrdUrl(brd, aib.getTNum(form)) : ''), err];
}

function checkUpload(response) {
	var qArea, el, err = response[1];
	if(err) {
		if(pr.isQuick) {
			$disp(qArea = $id('de-qarea'));
			qArea.appendChild($id('de-pform'));
		}
		if(/captch|капч|подтвер/i.test(err)) {
			refreshCapImg(pr.tNum, true);
		}
		$alert(err, 'upload', false);
		return;
	}
	pr.txta.value = '';
	if(pr.file) {
		delFileUtils(el = pr.getTR(pr.file));
		pr.file = $q('input[type="file"]', el = $html(el, el.innerHTML));
		eventFiles(el);
	}
	if(pr.video) {
		pr.video.value = '';
	}
	Cfg['stats'][pr.tNum ? 'reply' : 'op']++;
	saveComCfg(aib.dm, Cfg);
	if(!pr.tNum) {
		window.location = response[0];
		return;
	}
	if(TNum) {
		loadNewPosts(function(focus) {
			closeAlert($id('de-alert-upload'));
			if(Cfg['scrAfterRep']) {
				$focus(Posts[Posts.length - 1]);
			}
		});
	} else {
		loadThread(pByNum[pr.tNum], 5, closeAlert.bind(window, $id('de-alert-upload')));
	}
	showMainReply();
	refreshCapImg(pr.tNum, false);
}

function endDelete() {
	var el = $id('de-alert-deleting');
	if(el) {
		closeAlert(el);
		$alert(Lng.succDeleted[lang], 'deleted', false);
	}
}

function checkDelete(response) {
	if(response[1]) {
		$alert(Lng.errDelete[lang] + response[1], 'deleting', false);
		return;
	}
	for(var el, tNum, tNums = [], i = 0, els = $Q('[de-post] input:checked', dForm); el = els[i++];) {
		el.checked = false;
		if(!TNum && tNums.indexOf(tNum = getPost(el).thr.num) === -1) {
			tNums.push(tNum);
		}
	}
	if(TNum) {
		loadNewPosts(endDelete);
	} else {
		tNums.forEach(function(tNum) {
			loadThread(pByNum[tNum], 5, endDelete);
		});
	}
}

function doHTML5Submit(form, button, Fn) {
	fData = {
		boundary: '---------------------------' + Math.round(Math.random() * 1e11),
		data: [],
		busy: 0,
		error: false,
		url: form.action,
		fn: Fn
	};
	$each($Q('input:not([type="submit"]):not([type="button"]), textarea, select', form), appendFormData);
	appendFormData(button);
	submitFormData();
}

function appendFormData(el) {
	var file, fName, idx, fr,
		pre = '--' + fData.boundary + '\r\nContent-Disposition: form-data; name="' + el.name + '"';
	if(el.type === 'file' && el.files.length > 0) {
		file = el.files[0];
		fName = file.name;
		fData.data.push(pre + '; filename="' + (
			!Cfg['removeFName'] ? fName : ' ' + fName.substring(fName.lastIndexOf('.'))
		) + '"\r\nContent-type: ' + file.type + '\r\n\r\n', null, '\r\n');
		idx = fData.data.length - 2;
		if(!/^image\/(?:png|jpeg)$/.test(file.type)) {
			fData.data[idx] = file;
			return;
		}
		fr = new FileReader();
		fr.onload = function(e) {
			var dat = clearImageData(new Uint8Array(e.target.result), !!el.imgFile);
			if(dat) {
				if(el.imgFile) {
					dat.push(el.imgFile);
				}
				if(Cfg['postSameImg']) {
					dat.push(String(Math.round(Math.random() * 1e6)));
				}
				fData.data[idx] = new Blob(dat);
				fData.busy--;
				submitFormData();
			} else {
				fData.error = true;
				$alert(Lng.fileCorrupt[lang] + fName, 'upload', false);
			}
		}
		fr.readAsArrayBuffer(file);
		fData.busy++;
	} else if(el.type !== 'checkbox' || el.checked) {
		fData.data.push(pre + '\r\n\r\n' + el.value + '\r\n');
	}
}

function submitFormData() {
	if(fData.error || fData.busy) {
		return;
	}
	var headers = {'Content-type': 'multipart/form-data; boundary=' + fData.boundary};
	if(nav.Firefox) {
		headers['Referer'] = '' + doc.location;
	}
	fData.data.push('--' + fData.boundary + '--\r\n');
	GM_xmlhttpRequest({
		'method': 'POST',
		'headers': headers,
		'data': new Blob(fData.data),
		'url': nav.fixLink(fData.url),
		'onreadystatechange': function(xhr) {
			if(xhr.readyState !== 4) {
				return;
			}
			if(xhr.status === 200) {
				fData.fn(getSubmitResponse(nav.toDOM(xhr.responseText), false));
			} else {
				$alert(
					xhr.status === 0 ? Lng.noConnect[lang] : 'HTTP [' + xhr.status + '] ' + xhr.statusText,
					'upload', false
				);
			}
			fData = null;
		}
	});
}

function readExifData(exif, off, len) {
	var i, j, dE, tag, tgLen, xRes = 0,
		yRes = 0,
		resT = 0,
		le = String.fromCharCode(exif[off], exif[off + 1]) !== 'MM',
		dv = new DataView(exif.buffer, off);
	if(dv.getUint16(2, le) !== 0x2A) {
		return null;
	}
	i = dv.getUint32(4, le);
	if(i > len) {
		return null;
	}
	for(tgLen = dv.getUint16(i, le), j = 0; j < tgLen; j++) {
		tag = dv.getUint16(dE = i + 2 + 12 * j, le);
		if(tag !== 0x011A && tag !== 0x011B && tag !== 0x0128) {
			continue;
		}
		if(tag === 0x0128) {
			resT = dv.getUint16(dE + 8, le) - 1;
		} else {
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
	return [resT, xRes >> 8, xRes & 0xFF, yRes >> 8, yRes & 0xFF];
}

function clearImageData(dat, delExtraData) {
	var tmp, i, j, len, out, jpgDat, rData, rExif = !!Cfg['removeEXIF'];
	if(!Cfg['postSameImg'] && !rExif && !delExtraData) {
		return [dat];
	}
	if(dat[0] === 0xFF && dat[1] === 0xD8) {
		for(i = 2, j = 0, out = 1, len = dat.length - 1, rData = [2], jpgDat = null; i < len; ) {
			if(dat[i] === 0xFF) {
				if(rExif) {
					if(!jpgDat && out === 1) {
						if(dat[i + 1] === 0xE1 && dat[i + 4] === 0x45) {
							jpgDat = readExifData(dat, i + 10, (dat[i + 2] << 8) + dat[i + 3]);
						} else if(dat[i + 1] === 0xE0 && dat[i + 7] === 0x46) {
							jpgDat = [dat[i + 11], dat[i + 12], dat[i + 13], dat[i + 14]];
						}
					}
					if((dat[i + 1] >> 4) === 0xE || dat[i + 1] === 0xFE) {
						tmp = 2 + (dat[i + 2] << 8) + dat[i + 3];
						j += tmp;
						rData.push(i, i += tmp);
						continue;
					}
				}
				if(dat[i + 1] === 0xD8) {
					out++;
				} else if(dat[i + 1] === 0xD9 && --out === 0) {
					break;
				}
			}
			i++;
		}
		i += 2;
		if(!delExtraData && len - i > 75) {
			i = len;
		}
		if(j === 0) {
			return i === len ? [dat] : [new Uint8Array(dat, i)];
		}
		rData.push(i);
		out = new Uint8Array(i - j + 18);
		out.set([0xFF, 0xD8, 0xFF, 0xE0, 0, 0x10, 0x4A, 0x46, 0x49, 0x46, 0, 1, 1]
			.concat(jpgDat || [0, 0, 1, 0, 1]), 0
		);
		for(i = 0, j = 20, len = rData.length; i < len; i += 2) {
			out.set(dat.subarray(rData[i], rData[i + 1]), j);
			j += rData[i + 1] - rData[i];
		}
		return [out];
	}
	if(dat[0] === 0x89 && dat[1] === 0x50) {
		for(i = 0, len = dat.length - 7; i < len && (dat[i] !== 0x49 || dat[i + 1] !== 0x45 || dat[i + 2] !== 0x4E || dat[i + 3] !== 0x44); i++) {}
		i += 8;
		return i === len || (!delExtraData && len - i > 75) ? [dat] : [new Uint8Array(dat, i)];
	}
	return null;
}


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
			pr.form.insertAdjacentHTML('afterbegin', '<input type="hidden" id="thr_id" value="' + tNum + '" name="' + (
				aib.fch || aib.futa ? 'resto' :
				aib.tiny ? 'thread' :
				'parent'
			) + '">');
			if(oeForm) {
				$del($q('input[name="oek_parent"]', oeForm));
				oeForm.insertAdjacentHTML('afterbegin', '<input type="hidden" value="' +
					tNum + '" name="oek_parent">');
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
	if(!pr.recap && !aib.kus && !aib.abu) {
		refreshCapImg(tNum, false);
	}
	if(aib._420 && pr.txta.value === 'Comment') {
		pr.txta.value = '';
	}
	$txtInsert(pr.txta, '>>' + post.num + (quotetxt || '').replace(/(?:^|\n)(.)/gm, '\n> $1') + '\n');
	if(Cfg['addPostForm'] === 3) {
		$attr($t('a', $id('de-qarea-target')), {'href': aib.getThrdUrl(brd, tNum), 'text': '#' + tNum});
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

function addTextButton(bb, tPanel, id) {
	var btn, key = this[id];
	if(key['off']) {
		return;
	}
	if(!(btn = $id('de-btn-' + id))) {
		btn = $new('span', {
			'id': 'de-btn-' + id,
			'title': Lng.txtBtn[id][lang],
			'de-tag': key['tag'],
			'de-bb': bb || !!key['bb']
		}, null);
		if(id === 'quote') {
			btn.onmouseover = function() {
				quotetxt = $txtSelect();
			};
			btn.onclick = function(e) {
				var x = pr.txta,
					start = x.selectionStart,
					end = x.selectionEnd;
				$pd(e);
				$txtInsert(x, '> ' + (
					start === end ? quotetxt : x.value.substring(start, end)
				).replace(/\n/gm, '\n> '));
			};
		} else {
			btn.onclick = function(e) {
				var txt, len, x = pr.txta,
					start = x.selectionStart,
					end = x.selectionEnd,
					scrtop = x.scrollTop,
					tag = this.getAttribute('de-tag');
				$pd(e);
				if(this.getAttribute('de-bb') === 'true') {
					txt = '[' + tag + ']' + x.value.substring(start, end) + '[/' + tag + ']';
				} else {
					txt = '';
					x.value.substring(start, end).split('\n').forEach(function(line) {
						var m = line.match(/^(\s*)(.*?)(\s*)$/);
						txt += '\n' + m[1] + (tag !== '^H' ? tag + m[2] + tag
							: m[2] + new Array(m[2].length + 1).join('^H')
						) + m[3];
					});
					txt = txt.slice(1);
				}
				len = start + txt.length;
				x.value = x.value.substr(0, start) + txt + x.value.substr(end);
				x.setSelectionRange(len, len);
				x.focus();
				x.scrollTop = scrtop;
				txt = tag = null;
			};
		}
		tPanel.appendChild(btn);
	}
	btn.innerHTML =
		Cfg['addTextBtns'] === 2 ? (
			(id === 'bold' ? '[ ' : '') + '<a class="de-abtn" href="#">' + key['val'] + '</a>' +
			(id !== 'quote' ? ' / ' : ' ]')
		) :
		Cfg['addTextBtns'] === 3 ?
			('<input type="button" value="' + key['val'] + '" style="font-weight: bold;">') :
		'';
}

function addTextPanel() {
	if(!pr.txta) {
		return;
	}
	var tPanel, bb = (aib.kus && !aib._410) || aib.krau || aib._420 || aib.mlpg || aib.abu,
		btns = {
			'bold': {
				'val': 'B',
				'tag': (bb ? (aib._420 ? '**' : 'b') : (aib.tiny ? "'''" : '**'))
			},
			'italic': {
				'val': 'i',
				'tag': (bb ? (aib._420 ? '*' : 'i') : (aib.tiny ? "''" : '*'))
			},
			'under': {
				'val': 'U',
				'tag': (bb ? 'u' : '__'),
				'off': aib._420 || !bb
			},
			'strike': {
				'val': 'S',
				'tag': (bb ? (aib.mlpg ? '-' : 's') : (aib._410 ? '^^' : '^H')),
				'off': aib._420 || aib._4chon
			},
			'spoil': {
				'val': '%',
				'tag': ((bb || aib.fch) ? (aib._420 ? '%' : 'spoiler') : (aib.tiny ? '**' : '%%')),
				'bb': aib.fch
			},
			'code': {
				'val': 'C',
				'tag': (bb ? (aib._420 ? 'pre' : aib.mlpg ? 'c' : aib.krau ? 'aa' : 'code') : '`'),
				'off': aib._4chon
			},
			'quote': {'val': '&gt;'}
		}
	$after(
		Cfg['txtBtnsLoc'] ? $id('de-txt-resizer') || pr.txta :
			aib._420 ? $c('popup', pr.form) :
			pr.subm,
		tPanel = $attr($id('de-txt-panel') || $new('span', {'id': 'de-txt-panel'}, null), {
			'lang': (!Cfg['addTextBtns'] ? 'en' : !Cfg['txtBtnsLoc'] ? 'ru' : '')
		})
	);
	nav.forEach(btns, addTextButton.bind(btns, bb, tPanel));
}


/*==============================================================================
									POST BUTTONS
==============================================================================*/

function addPostRef(ref) {
	if(pr.form && Cfg['insertNum']) {
		if(aib.nul || TNum && (aib.kus || aib.tinyIb)) {
			$each($T('a', ref), function(el) {
				el.onclick = null;
			});
		}
		if(!aib.brit) {
			ref.onclick = insertRefLink;
		}
	}
}

function addPostButtons(post) {
	var h, ref = $q(aib.qRef, post),
		html = '<span class="de-ppanel ' + (post.isOp ? '' : 'de-ppanel-cnt') + '" info="' + post.num + '"><span class="de-btn-hide" onclick="de_hideclick(this)" onmouseover="de_hideover(this)" onmouseout="de_out(this)"></span>' + (pr.qButton || oeForm ? '<span class="de-btn-rep" onclick="de_qrepclick(this)" onmouseover="de_qrepover()"></span>' : '');
	if(post.isOp) {
		if(!TNum) {
			html += '<span class="de-btn-expthr" onclick="de_expclick(this)" onmouseover="de_expover(this)" onmouseout="de_out(this)"></span>';
		}
		h = aib.host;
		if(Favor[h] && Favor[h][brd] && Favor[h][brd][post.num]) {
			html += '<span class="de-btn-fav-sel" onclick="de_favclick(this)"></span>';
			Favor[h][brd][post.num].cnt = post.thr.pCount;
		} else {
			html += '<span class="de-btn-fav" onclick="de_favclick(this)"></span>';
		}
	}
	ref.insertAdjacentHTML('afterend', html + (
		post.sage ? '<span class="de-btn-sage" title="SAGE" onclick="de_sageclick()"></span>' : ''
	) + '</span>');
	addPostRef(post.pref = ref);
	post.btns = ref.nextSibling;
}

/*==============================================================================
									CONTENT FEATURES
==============================================================================*/

function initMessageFunctions() {
	uWindow['de_hideover'] = function(el) {
		el.odelay = setTimeout(addPostHideMenu, Cfg['linksOver'], pByNum[+el.parentNode.getAttribute('info')]);
	};
	uWindow['de_srcover'] = function(el) {
		el.odelay = setTimeout(addImgSearchMenu, Cfg['linksOver'], el);
	};
	uWindow['de_expover'] = function(el) {
		el.odelay = setTimeout(addExpandThreadMenu, Cfg['linksOver'], pByNum[+el.parentNode.getAttribute('info')]);
	};
	uWindow['de_qrepover'] = function() {
		quotetxt = $txtSelect();
	};
	uWindow['de_out'] = function(el) {
		if(el) {
			clearTimeout(el.odelay);
		}
		if(el = $id('de-menu')) {
			el.odelay = setTimeout($del, 75, el);
		}
	};
	uWindow['de_favclick'] = function(el) {
		setTimeout(toggleFavorites, 0, pByNum[+el.parentNode.getAttribute('info')], el);
	};
	uWindow['de_hideclick'] = function(el) {
		setTimeout(toggleUserPostVisib, 0, pByNum[+el.parentNode.getAttribute('info')]);
	};
	uWindow['de_expclick'] = function(el) {
		loadThread(pByNum[+el.parentNode.getAttribute('info')], 1, null);
	};
	uWindow['de_qrepclick'] = function(el) {
		showQuickReply(pByNum[+el.parentNode.getAttribute('info')]);
	};
	uWindow['de_sageclick'] = function() {
		setTimeout(addSpell, 0, '#sage', '');
	};
	uWindow['de_isearch'] = function(e, name) {
		$pd(e);
		window.postMessage("_" + name + ";" + e.target.getAttribute("de-url"), "*");
		$del($id('de-menu'));
	};
	uWindow['de_overmenu'] = function(el) {
		clearTimeout(el.odelay);
	};

	$event(window, {'message': function(e) {
		var temp, data = e.data.substring(1);
		switch(e.data[0]) {
		case 'A':
			temp = data.split('$#$');
			if(temp[0] === 'de-iframe-pform') {
				checkUpload([temp[1], temp[2]]);
			} else {
				checkDelete([temp[1], temp[2]]);
			}
			$id(temp[0]).src = 'about:blank';
			return;
		case 'B':
			$del($id('de-fav-wait'));
			$id('de-iframe-fav').style.height = data + 'px';
			return;
		}
	}});
}

function detectImgFile(ab) {
	var i, j, dat = new Uint8Array(ab),
		len = dat.length;
	// JPG [ff d8 ff e0] = [яШяа]
	if(dat[0] === 0xFF && dat[1] === 0xD8) {
		for(i = 0, j = 0; i < len - 1; i++) {
			if(dat[i] === 0xFF) {
				// Built-in JPG
				if(dat[i + 1] === 0xD8) {
					j++;
				// JPG end [ff d9]
				} else if(dat[i + 1] === 0xD9 && --j === 0) {
					i += 2;
					break;
				}
			}
		}
	// PNG [89 50 4e 47] = [‰PNG]
	} else if(dat[0] === 0x89 && dat[1] === 0x50) {
		for(i = 0; i < len - 7; i++) {
			// PNG end [49 45 4e 44 ae 42 60 82]
			if(dat[i] === 0x49 && dat[i + 1] === 0x45 && dat[i + 2] === 0x4E && dat[i + 3] === 0x44) {
				i += 8;
				break;
			}
		}
	} else {
		return {};
	}
	// Ignore small files
	if(i !== len && len - i > 60) {
		for(len = i + 90; i < len; i++) {
			// 7Z [37 7a bc af] = [7zјЇ]
			if(dat[i] === 0x37 && dat[i + 1] === 0x7A && dat[i + 2] === 0xBC) {
				return {'type': 0, 'idx': i, 'data': ab};
			// ZIP [50 4b 03 04] = [PK..]
			} else if(dat[i] === 0x50 && dat[i + 1] === 0x4B && dat[i + 2] === 0x03) {
				return {'type': 1, 'idx': i, 'data': ab};
			// RAR [52 61 72 21] = [Rar!]
			} else if(dat[i] === 0x52 && dat[i + 1] === 0x61 && dat[i + 2] === 0x72) {
				return {'type': 2, 'idx': i, 'data': ab};
			// OGG [4f 67 67 53] = [OggS]
			} else if(dat[i] === 0x4F && dat[i + 1] === 0x67 && dat[i + 2] === 0x67) {
				return {'type': 3, 'idx': i, 'data': ab};
			// MP3 [0x49 0x44 0x33] = [ID3]
			} else if(dat[i] === 0x49 && dat[i + 1] === 0x44 && dat[i + 2] === 0x33) {
				return {'type': 4, 'idx': i, 'data': ab};
			}
		}
	}
	return {};
}

/** @constructor */
function workerQueue(mReqs, wrkFn, errFn) {
	if(!nav.isWorker) {
		this.find = this._findSync.bind(wrkFn);
		return;
	}
	this.url = window.URL.createObjectURL(new Blob([
		'var fn = ' + String(wrkFn) + ';\
		self.onmessage = function(e) {\
			var info = fn(e.data);\
			self.postMessage(info, info.data ? [info.data] : null);\
		}'
	], {'type': 'text/javascript'}));
	this.queue = new $queue(mReqs, this._createWrk.bind(this), null);
	this.find = this._findWrk;
	this.wrks = [];
	this.onErr = this._onErr.bind(this, errFn);
	while(mReqs > 0) {
		this.wrks.push(new nav.Worker(this.url));
		mReqs--;
	}
}
workerQueue.prototype = {
	_findSync: function(data, Fn) {
		Fn(this(data));
	},
	onMess: function(Fn, e) {
		this.queue.end();
		Fn(e.data);
	},
	_onErr: function(Fn, e) {
		this.queue.end();
		Fn(e);
	},
	_findWrk: function(data, Fn) {
		this.queue.run([data, this.onMess.bind(this, Fn)]);
	},
	_createWrk: function(num, data) {
		var w = this.wrks[num];
		w.onmessage = data[1];
		w.onerror = this.onErr;
		w.postMessage(data[0], [data[0]]);
	},
	clear: function() {
		this.wrks = null;
		window.URL.revokeObjectURL(this.url);
	}
};

function addImgFileIcon(info) {
	var app, ext, fName, type = info['type'];
	if(typeof type !== 'undefined') {
		fName = this.getAttribute('download');
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
		$q(aib.qImgLink, aib.getPicWrap(this)).insertAdjacentHTML('afterend',
			'<a href="' + window.URL.createObjectURL(new Blob([new Uint8Array(info['data']).subarray(info['idx'])], {'type': app})) +
			'" class="' + (type > 2 ? 'de-img-audio' : 'de-img-arch') + '" title="' + Lng.downloadFile[lang] +
			'" download="' + fName.substring(0, fName.lastIndexOf('.')) + '.' + ext + '">.' + ext + '</a>'
		);
	}
}

function downloadImgData(url, Fn) {
	var obj = {
		'method': 'GET',
		'url': url,
		'onreadystatechange': function(e) {
			if(e.readyState !== 4) {
				return;
			}
			if(e.status === 200) {
				if(nav.Firefox && aib.fch) {
					Fn(new Uint8Array(e.responseText.split('').map(function(a) { return a.charCodeAt(); })));
				} else {
					Fn(new Uint8Array(e.response));
				}
			} else {
				Fn(null);
			}
		}
	};
	if(nav.Firefox && aib.fch) {
		obj['overrideMimeType'] = 'text/plain; charset=x-user-defined';
		GM_xmlhttpRequest(obj);
	} else {
		obj['responseType'] = 'arraybuffer';
		$xhr(obj);
	}
}

function preloadImages(post) {
	if(!Cfg['preLoadImgs'] && !Cfg['openImgs']) {
		return;
	}
	var lnk, url, iType, nExp, el, i, els, mReqs = post ? 1 : 4,
		rjf = Cfg['findImgFile'] && new workerQueue(mReqs, detectImgFile, function(e) {
			console.error("FILE DETECTOR ERROR, line: " + e.lineno + " - " + e.message);
		}),
		queue = Cfg['preLoadImgs'] && new $queue(mReqs, function(num, dat) {
			var a = dat[0],
				type = dat[2],
				eImg = dat[3];
			downloadImgData(dat[1], function(data) {
				if(data) {
					a.href = window.URL.createObjectURL(new Blob([data], {"type": type}));
					if(eImg) {
						$t('img', a).src = a.href;
					}
					if(rjf) {
						rjf.find(data.buffer, addImgFileIcon.bind(a));
					}
				}
				a = eImg = type = null;
				queue.end();
			});
		}, function() {
			rjf && rjf.clear();
			rjf = queue = null;
		});
	for(i = 0, els = getPostImages(post || dForm); el = els[i++];) {
		lnk = $x("ancestor::a[1]", el);
		if(!lnk) {
			continue;
		}
		url = lnk.href;
		nExp = !!Cfg['openImgs'];
		if(/\.gif$/i.test(url)) {
			iType = 'image/gif';
		} else {
			if(/\.jpe?g$/i.test(url)) {
				iType = 'image/jpeg';
			} else if(/\.png$/i.test(url)) {
				iType = 'image/png';
			} else {
				continue;
			}
			nExp &= !Cfg['openGIFs'];
		}
		lnk.setAttribute('download', url.substring(url.lastIndexOf("/") + 1));
		if(queue) {
			queue.run([lnk, url, iType, nExp]);
		} else if(nExp) {
			el.src = url;
		}
	}
	queue && queue.complete();
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

dateTime.prototype = {
	init: function(txt) {
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
	},
	fix: function(txt) {
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
	}
};


/*==============================================================================
							ON LINKS VIDEO / MP3 PLAYERS
==============================================================================*/

function getTubeTitle() {
	if(!Cfg['YTubeTitles']) {
		return false;
	}
	var queue = new $queue(8, function(num, data) {
		setTimeout(GM_xmlhttpRequest, 0, {
			'method': 'GET',
			'url': 'https://gdata.youtube.com/feeds/api/videos/' + data[1] + '?alt=json&fields=title/text()',
			'onreadystatechange': function(xhr) {
				if(xhr.readyState === 4) {
					var text;
					if(xhr.status === 200) {
						try {
							text = JSON.parse(xhr.responseText)['entry']['title']['$t'];
							tubeTitles[data[1]] = text;
						} catch(e) {}
					}
					setTubeTitle(data[0], text);
					queue.end();
					data = null;
				}
			}
		});
	}, function() {
		sessionStorage['de-yt-titles'] = JSON.stringify(tubeTitles);
		queue = null;
	})
	return queue;
}

function setTubeTitle(link, text) {
	if(text) {
		link.textContent = text;
		link.textData = 2;
	} else {
		link.textData = 1;
	}
	if(link.spellFn) {
		link.spellFn(text);
		link.spellFn = null;
	}
}

function addHTML5Video(el, id, time) {
	setTimeout(GM_xmlhttpRequest, 0, {
		'method': 'GET',
		'url': 'https://www.youtube.com/watch?v=' + id,
		'onload': function(xhr) {
			var group, i, len, x, videoPair, j, pair, url, itag, sig, src, videoURL = [],
				formats = xhr.responseText.match(/\"url_encoded_fmt_stream_map\":\s*\"([^\"]+)\"/),
				sep1 = '%2C',
				sep2 = '%26',
				sep3 = '%3D';
			if(formats) {
				formats = formats[1];
				if(formats.contains(',')) { 
					sep1 = ',';
					sep2 = formats.contains('&') ? '&' : '\\u0026';
					sep3 = '=';
				}
				for(i = 0, group = formats.split(sep1), len = group.length; i < len; i++) {
					x = group[i].split(sep2);
					videoPair = [];
					for(j = 0; j < x.length; j++) {
						pair = x[j].split(sep3);
						if(pair.length === 2) {
							videoPair[pair[0]] = pair[1];
						}
					}
					url = videoPair['url'];
					if(!url) {
						continue;
					}
					url = unescape(unescape(url)).replace(/\\\//g, '/').replace(/\\u0026/g, '&');
					itag = videoPair['itag'];
					if(!itag) {
						continue;
					}
					sig = videoPair['sig'];
					if(sig) {
						url += "&signature=" + sig;
					}
					if(url.toLowerCase().startsWith('http')) {
						videoURL[itag] = url;
					}
				}
				src = Cfg['YTubeHD'] ? (videoURL[45] || videoURL[44] || videoURL[43]) : videoURL[43];
			}
			if(!src) {
				addFlashVideo(el, id, time);
				el = id = time = null;
				return;
			}
			el.innerHTML = '<video poster="https://i.ytimg.com/vi/' + id + '/0.jpg" controls="controls" ' +
				'preload="none" src="' + src + (nav.Firefox && nav.Firefox < 14 ? '&' + Math.random() : '') +
				'" width="' + Cfg['YTubeWidth'] + '" height="' + Cfg['YTubeHeigh'] + '"></video>';
			if(time) {
				el.firstChild.onloadedmetadata = function() {
					this.currentTime = time;
					time = null;
				};
			}
			el = id = null;
		}
	});
}

function addFlashVideo(el, id, time) {
	var wh = ' width="' + Cfg['YTubeWidth'] + '" height="' + Cfg['YTubeHeigh'] + '">';
	el.innerHTML = Cfg['YTubeType'] === 1 ?
		'<iframe type="text/html" src="https://www.youtube.com/embed/' + id +
			(Cfg['YTubeHD'] ? '?hd=1&' : '?') + 'start=' + time + '&html5=1" frameborder="0"' + wh :
		'<embed type="application/x-shockwave-flash" src="https://www.youtube.com/v/' + id +
			(Cfg['YTubeHD'] ? '?hd=1&' : '?') + 'start=' + time + '" wmode="transparent"' + wh;
}

function addTubePlayer(el, m) {
	var time = (m[2] ? m[2] * 3600 : 0) + (m[3] ? m[3] * 60 : 0) + (m[4] ? +m[4] : 0);
	el.ytInfo = m;
	if(Cfg['YTubeType'] !== 2) {
		addFlashVideo(el, m[1], time);
	} else {
		addHTML5Video(el, m[1], time);
	}
}

function addTubeImage(el, m) {
	el.ytInfo = m;
	el.innerHTML = '<a href="https://www.youtube.com/watch?v=' + m[1] + '" target="_blank">' +
		'<img src="https://i.ytimg.com/vi/' + m[1] + '/0.jpg" width="' + Cfg['YTubeWidth'] +
		'" height="' + Cfg['YTubeHeight'] + '"></a>';
	if(Cfg['addYouTube'] === 3) {
		el.firstChild.onclick = clickTubeImage;
	}
}

function clickTubeImage(e) {
	$pd(e);
	var node = this.parentNode;
	addTubePlayer(node, node.ytInfo);
}

function clickTubeLink(e) {
	var m = this.ytInfo,
		el = $c('de-ytube-obj', getPost(this));
	$pd(e);
	if(el.ytInfo === m) {
		el.innerHTML = '';
		el.ytInfo = null;
	} else if(Cfg['addYouTube'] > 2) {
		addTubeImage(el, m);
	} else {
		addTubePlayer(el, m);
	}
}

function updatePostTube(post, oldLinks, newLinks, cloned) {
	var i, j, el, link, m, queue = !cloned && getTubeTitle(),
		len = newLinks.length;
	for(i = 0, j = 0; i < len; i++) {
		el = newLinks[i];
		link = oldLinks[j];
		if(cloned) {
			el.ytInfo = link.ytInfo;
			el.onclick = clickTubeLink;
		} else if(m = el.href.match(reTubeLink)) {
			embedTubeLink(el, link ? link.ytInfo : m, post, queue);
			j++;
		}
	}
	queue && queue.complete();
}

function embedTubeLink(link, m, post, queue) {
	var msg, prev, el, title;
	if(!post.ytObj) {
		post.ytObj = el = $new('div', {'class': 'de-ytube-obj'}, null);
		if(Cfg['addYouTube'] > 2) {
			addTubeImage(el, m);
		} else if(Cfg['addYouTube'] === 2) {
			addTubePlayer(el, m);
		}
		msg = post.msg || $q(aib.qMsg, post);
		if(aib.krau) {
			msg = msg.parentNode;
			prev = msg.previousElementSibling;
			$before(prev.hasAttribute('style') ? prev : msg, el);
		} else {
			$before(msg, el);
		}
	}
	link.href = link.href.replace(/^http:/, 'https:');
	link.ytInfo = m;
	link.className = 'de-ytube-link';
	link.onclick = clickTubeLink;
	if(Cfg['YTubeTitles'] && queue) {
		title = tubeTitles[m[1]];
		if(title) {
			setTubeTitle(link, title);
		} else {
			queue.run([link, m[1]]);
		}
	}
}

function embedTubeLinks(post) {
	if(!Cfg['addYouTube']) {
		return;
	}
	var i, els, el, m, src, pst, queue = getTubeTitle();
	for(i = 0, els = $Q('embed, object, iframe', post || dForm); el = els[i++];) {
		if(!(m = (el.src || el.data).match(reTubeLink))) {
			continue;
		}
		src = 'https://www.youtube.com/watch?v=' + m[1];
		if(m[4] || m[3] || m[2]) {
			src += '#t=' + (m[2] ? m[2] + 'h' : '') + (m[3] ? m[3] + 'm' : '') + (m[4] ? m[4] + 's' : '');
		}
		pst = post || getPost(el);
		(pst.msg || $q(aib.qMsg, pst)).insertAdjacentHTML('beforeend',
			'<p class="de-ytube-ext"><a href="' + src + '">' + src + '</a></p>');
		$del(el);
	}
	for(i = 0, els = $Q('a[href*="youtu"]', post || dForm); el = els[i++];) {
		if(m = el.href.match(reTubeLink)) {
			embedTubeLink(el, m, post || getPost(el), queue);
		}
	}
	queue && queue.complete();
}

function checkTubeLink(text) {
	var post = this[0];
	if(post) {
		if(text && this[1].test(text)) {
			Spells.retAsyncVal.apply(null, this.concat(true, true));
			this[0] = false;
		} else if(--post.ytCount === 0) {
			post.ytCount = null;
			Spells.retAsyncVal.apply(null, this.concat(false, true));
		}
	}
}

function embedMP3Links(post) {
	if(!Cfg['addMP3']) {
		return;
	}
	for(var pst, el, link, i = 0, els = $Q('a[href*=".mp3"]', post || dForm); link = els[i++];) {
		if(!(link.target === '_blank' || link.rel === 'nofollow')) {
			continue;
		}
		pst = post || getPost(link);
		if(!(el = $c('de-mp3', pst))) {
			el = $new('div', {'class': 'de-mp3'}, null);
			$before(pst.msg || $q(aib.qMsg, pst), el);
		}
		if(!$q('object[FlashVars*="' + link.href + '"]', el)) {
			el.innerHTML += '<object data="http://junglebook2007.narod.ru/audio/player.swf" type="application/x-shockwave-flash" wmode="transparent" width="220" height="16" FlashVars="playerID=1&amp;bg=0x808080&amp;leftbg=0xB3B3B3&amp;lefticon=0x000000&amp;rightbg=0x808080&amp;rightbghover=0x999999&amp;rightcon=0x000000&amp;righticonhover=0xffffff&amp;text=0xffffff&amp;slider=0x222222&amp;track=0xf5f5dc&amp;border=0x666666&amp;loader=0x7fc7ff&amp;loop=yes&amp;autostart=no&amp;soundFile=' + link.href + '"><br>';
		}
	}
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
		scrW = doc.documentElement.clientWidth,
		scrH = window.innerHeight,
		full = $c('de-img-full', a);
	if(full && isExp || !full && isExp === false) {
		return;
	}
	if(Cfg['expandImgs'] === 1 && !$q('img[style*="fixed"]', a)) {
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
	a.insertAdjacentHTML('beforeend', '<img class="de-img-full" src="' + a.href + '" alt="' + 
		a.href + '" width="' + newW + '" height="' + newH + '">');
	if(Cfg['expandImgs'] === 2) {
		full = a.lastChild;
		full.classList.add('de-img-center');
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

function embedImgLinks(el) {
	if(!Cfg['addImgs']) {
		return;
	}
	for(var a, link, i = 0, els = $Q(
		aib.qMsg + ' a[href*=".jpg"], ' + aib.qMsg + ' a[href*=".png"], ' + aib.qMsg + ' a[href*=".gif"]', el
	); link = els[i++];) {
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
	for(var link, i = 0, els = $Q(aib.qImgLink, el); link = els[i++];) {
		if(/google\.|tineye\.com|iqdb\.org/.test(link.href)) {
			$del(link);
			continue;
		}
		if(link.firstElementChild) {
			continue;
		}
		link.insertAdjacentHTML('beforebegin', '<span class="de-btn-src" onmouseover="de_srcover(this)" onmouseout="de_out(this)"></span>');
	}
}

function expandPostImg(a, isExp) {
	if(a && /\.jpe?g|\.png|.\gif|^blob:/i.test(a.href)) {
		addFullImg(a, getImgSize(aib.getPicWrap(a)), isExp);
	}
}

function expandAllPostImg(post, isExp) {
	for(var el, i = 0; el = post.img[i++];) {
		expandPostImg($x('ancestor::a[1]', el), isExp);
	}
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


/*==============================================================================
								MAP OF >>REFLINKS
==============================================================================*/

function getRelLink(num) {
	return '<a href="#' + num + '">&gt;&gt;' + num + '</a>';
}

function addRefMap(post) {
	post.msg.insertAdjacentHTML('afterend',
		'<div class="de-refmap">' + post.ref.map(this).join(', ') + '</div>');
}

function genRefMap(posts, tUrl) {
	if(Cfg['linksNavig'] !== 2) {
		return;
	}
	var refMap = [];
	nav.forEach(posts, function(pNum) {
		for(var tc, link, lNum, lPost, i = 0, links = $T('a', this[pNum].msg); link = links[i++];) {
			tc = link.textContent;
			if(tc.startsWith('>>') && (lNum = +tc.substr(2)) && (lPost = this[lNum])) {
				if(typeof lPost.ref === 'undefined') {
					lPost.ref = [pNum];
					refMap.push(lPost);
				} else if(lPost.ref.indexOf(pNum) === -1) {
					lPost.ref.push(pNum);
				}
			}
		}
	});
	refMap.forEach(addRefMap.bind(tUrl ? function(num) {
		return '<a href="' + tUrl + '#' + num + '">&gt;&gt;' + num + '</a>';
	} : getRelLink));
	refMap = tUrl = null;
}

function updRefMap(post, add) {
	for(var tc, ref, idx, link, lNum, lPost, pNum = post.num, i = 0, links = $T('a', post.msg); link = links[i++];) {
		tc = link.textContent;
		if(tc.startsWith('>>') && (lNum = +tc.substr(2)) && (lPost = pByNum[lNum])) {
			if(add) {
				if(typeof lPost.ref === 'undefined') {
					lPost.ref = [pNum];
				} else if(lPost.ref.indexOf(pNum) === -1) {
					lPost.ref.push(pNum);
				} else {
					continue;
				}
				if(Cfg['hideRefPsts'] && lPost.hide) {
					hidePost(post, 'reference to >>' + lNum);
				}
			} else if((ref = lPost.ref) && (idx = ref.indexOf(pNum)) !== -1) {
				ref.splice(idx, 1);
				if(ref.length === 0) {
					lPost.ref = void 0;
					$del($c('de-refmap', lPost));
					continue;
				}
			}
			$del($c('de-refmap', lPost));
			addRefMap.call(getRelLink, lPost);
			eventRefLink($c('de-refmap', lPost));
		}
	}
}


/*==============================================================================
							ON >>REFLINKS POSTS PREVIEW
==============================================================================*/

function closePview(el) {
	if(Cfg['animation']) {
		nav.animEvent(el, $del);
		el.classList.add('de-pview-anim');
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
		this.classList.remove('de-pview-anim');
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
		bWidth = doc.documentElement.clientWidth,
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
	$attr($css('@' + nav.cssFix + 'keyframes ' + uId + ' {to { ' + lmw + ' top:' + top + '; }}'), {
		'class': 'de-css-move'
	});
	if(pView.newPos) {
		pView.style.cssText = pView.newPos;
		pView.removeEventListener(nav.animEnd, PviewMoved, false);
	} else {
		pView.style.cssText = tmp;
	}
	pView.newPos = lmw + ' top:' + top + ';';
	pView.addEventListener(nav.animEnd, PviewMoved, false);
	pView.classList.add('de-pview-anim');
	pView.style[nav.animName] = uId;
}

function markRefMap(pView, pNum) {
	($c('de-pview-link', pView) || {}).className = '';
	($x('.//a[starts-with(text(),">>") and contains(text(),"' + pNum + '")]', pView) || {}).className =
		'de-pview-link';
}

function appendPviewPanel(post, pView) {
	var cnt = post.count - (post.dcount || 0),
		panel = $c('de-ppanel', pView),
		pText = (aib.getSage(post) ? '<span class="de-btn-sage" title="SAGE"></span>' : '') + (
			post.deleted ? '' :
				'<i style="vertical-align: 1px; color: #4f7942; font: bold 11px tahoma; cursor: default;">' +
				(cnt === 0 ? 'OP' : cnt + 1) + '</i>'
		);
	if(panel) {
		panel.classList.remove('de-ppanel-cnt');
		panel.innerHTML = pText;
	} else {
		$q(aib.qRef, pView).insertAdjacentHTML('afterend', '<span class="de-ppanel">' + pText + '</span');
	}
}

function getPview(post, pNum, parent, link, txt) {
	clearTimeout(Pviews.outDelay);
	var pView, inDoc, ytObjSrc;
	if(post) {
		inDoc = post.ownerDocument === doc;
		pView = inDoc ? post.cloneNode(true) : importPost(post);
		pView.setAttribute('de-post', '');
		pView.className = aib.cReply + ' de-pview' + (post.viewed ? ' de-viewed' : '');
		pView.style.display = '';
		if(aib._7ch) {
			pView.firstElementChild.style.cssText = 'max-width: 100%; margin: 0;';
			$del($c('doubledash', pView));
		}
		pView.num = pNum;
		$each($C('de-img-full', pView), $del);
		if(!inDoc) {
			embedMP3Links(pView);
			embedTubeLinks(pView);
			embedImgLinks(pView);
			addImgSearch(pView);
		} else {
			if(Cfg['addYouTube']) {
				if(ytObjSrc = $c('de-ytube-obj', post)) {
					(pView.ytObj = $c('de-ytube-obj', pView)).ytInfo = ytObjSrc.ytInfo;
					if($t('img', ytObjSrc)) {
						pView.ytObj.firstChild.onclick = clickTubeImage;
					}
				}
				updatePostTube(pView, $C('de-ytube-link', post), $C('de-ytube-link', pView), true);
			}
			if(Cfg['addImgs']) {
				$each($C('de-img-pre', pView), function(el) {
					eventLinkImg(el.parentNode);
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
		addPostRef($q(aib.qRef, pView));
		appendPviewPanel(post, pView);
		if(Cfg['markViewed']) {
			pView.readDelay = setTimeout(function(pst, num) {
				if(!pst.viewed) {
					pst.classList.add('de-viewed');
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
			node.classList.remove('de-pview-anim');
			node.style[nav.animName] = '';
		});
		pView.classList.add('de-pview-anim');
		pView.style[nav.animName] = 'de-post-open-' + (pView.aTop ? 't' : 'b') + (pView.aLeft ? 'l' : 'r');
	}
	return pView;
}

function showPview(link) {
	var b = link.pathname.match(/^\/?(.+\/)/)[1].replace(aib.res, '').replace(/\/$/, ''),
		tNum = (link.pathname.match(/.+?\/[^\d]*(\d+)/) || [,0])[1],
		pNum = (link.textContent.match(/\d+$/) || [tNum])[0],
		post = pByNum[pNum] || (Pviews.ajaxed[b] && Pviews.ajaxed[b][pNum]),
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
	ajaxGetPosts(aib.getThrdUrl(b, tNum), true, function(els, op) {
		var pst, rm, i, prNum = parent.num;
		op.isOp = true;
		op.count = 0;
		op.msg = $q(aib.qMsg, op);
		Pviews.ajaxed[b][tNum] = op;
		for(i = 0; pst = els[i]; i++) {
			pst.count = i + 1;
			pst.msg = $q(aib.qMsg, pst);
			Pviews.ajaxed[b][aib.getPNum(pst)] = pst;
		}
		genRefMap(Pviews.ajaxed[b], aib.getThrdUrl(b, tNum));
		if((pst = Pviews.ajaxed[b][pNum]) && (brd !== b || !Pviews.ajaxed[b][prNum])) {
			if(!(rm = $c('de-refmap', pst))) {
				pst.msg.insertAdjacentHTML('afterend', '<div class="de-refmap"></div>');
				rm = pst.msg.nextSibling;
			}
			rm.insertAdjacentHTML('afterbegin', '<a href="#' + prNum + '">&gt;&gt;' +
				(brd !== b ? '/' + brd + '/' : '') + prNum + '</a>' + (pst.ref ? ', ' : '')
			);
		}
		if(el && el.parentNode) {
			getPview(pst, pNum, parent, link, null);
		}
		b = pNum = tNum = parent = el = null;
	}, null);
}

function eventRefLink(el) {
	if(Cfg['linksNavig']) {
		var link, links = doc.evaluate('.//a[starts-with(text(),">>")]', el, null, 4, null);
		while(link = links.iterateNext()) {
			link.onmouseover = function() {
				if(this.textContent.length > 2) {
					this.overDelay = setTimeout(showPview, Cfg['linksOver'], this);
				}
			};
			link.onmouseout = function() {
				clearTimeout(this.overDelay);
				markPviewToDel(Pviews.top, true);
			};
		}
	}
}


/*==============================================================================
									AJAX FUNCTIONS
==============================================================================*/

function ajaxGetPosts(url, isParse, Fn, errFn) {
	setTimeout(GM_xmlhttpRequest, 0, {
		'method': 'GET',
		'url': nav.fixLink(url),
		'onreadystatechange': function(xhr) {
			if(xhr.readyState !== 4) {
				return;
			}
			if(xhr.status !== 200) {
				errFn && errFn(
					xhr.status === 0 ? Lng.noConnect[lang] : 'HTTP [' + xhr.status + '] ' + xhr.statusText
				);
			} else if(Fn) {
				var dc = nav.toDOM(xhr.responseText);
				if(isParse) {
					parseDelform($q(aib.qDForm, dc), dc, function(thr) {
						Fn(aib.getPosts(thr), aib.getOp(thr, dc));
					});
				} else {
					if(!pr.form && oeForm) {
						pr = getPostform(doc.importNode($q(aib.qPostForm, dc), true));
						$before(oeForm, pr.form);
					}
					Fn(dc, null);
				}
			}
			isParse = Fn = errFn = dc = null;
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
		sVis[post.count] = 1;
		spells.check(post, hidePost, false);
	}
	updRefMap(post, true);
	eventRefLink(post);
	embedMP3Links(post);
	embedImgLinks(post);
	if(isExpImg) {
		expandAllPostImg(post, null);
	}
}

function newPost(thr, post, pNum, i, node) {
	var pst, el;
	processPost(post, pNum, thr, i);
	addPostButtons(post);
	embedTubeLinks(post);
	addPostFunc(post);
	addImgSearch(post);
	if(postWrapper) {
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
	node.appendChild(pst);
	if(aib._4chon) {
		pst.insertAdjacentHTML('afterend', '<br>');
	}
	preloadImages(post);
	return +!post.hide;
}

function replaceFullMsg(post, fullPost) {
	var origMsg = aib.hana ? post.msg.firstElementChild : post.msg,
		repMsg = aib.hana ? $q('.alternate > div', post)
			: doc.importNode($q(aib.qMsg, fullPost), true),
		ytExt = $c('de-ytube-ext', origMsg),
		ytLinks = $Q(':not(.de-ytube-ext) > .de-ytube-link', origMsg);
	origMsg.parentNode.replaceChild(post.msg = replacePost(repMsg), origMsg);
	post.img = getPostImages(post);
	updatePostTube(post, ytLinks, $Q('a[href*="youtu"]', post.msg), false);
	if(ytExt) {
		post.msg.appendChild(ytExt);
	}
	addPostFunc(post);
}

function getFullPost(node, isFunc) {
	var post = getPost(node);
	if(aib.hana) {
		$del(node.nextSibling);
		$del(node.previousSibling);
		$del(node);
		if(isFunc) {
			replaceFullMsg(post, null);
		} else {
			post.msg.replaceChild($q('.alternate > div', post), post.msg.firstElementChild);
		}
		return;
	}
	ajaxGetPosts(aib.getThrdUrl(brd, post.thr.num), true, function(els, op) {
		var i, el;
		if(post.isOp) {
			el = op;
		} else {
			for(i = 0; (el = els[i++]) && post.num !== aib.getPNum(el);) {}
		}
		if(el) {
			replaceFullMsg(post, el);
			$del(node);
		}
		node = post = null;
	}, null);
}

function expandPost(post) {
	if(post.hide) {
		return;
	}
	var el;
	if(el = aib.isTrunc(post)) {
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
	ajaxGetPosts(aib.getThrdUrl(brd, op.num), true, function(els, newOp) {
		var i, j, opIdx, omt, lPosts, el, pCnt, len = els.length,
			thr = op.thr;
		showMainReply();
		$del($id('de-menu'));
		$del($q(aib.qOmitted + ', .de-omitted', thr));
		omt = thr.omitted;
		pCnt = thr.pCount - omt - 1;
		if(!(lPosts = thr.loadedPosts)) {
			lPosts = [op];
			if(aib.isTrunc(op)) {
				replaceFullMsg(op, newOp);
			}
			for(i = 0, omt = thr.omitted, opIdx = Posts.indexOf(op); i < pCnt; i++) {
				el = lPosts[omt + i + 1] = Posts[opIdx + i + 1];
				if(aib.isTrunc(el)) {
					replaceFullMsg(el, els[omt + i]);
				}
			}
			op.ref = void 0;
		}
		j = last !== 1 && last < len ? len - last : 0;
		thr.style.counterReset = 'de-cnt ' + ((thr.omitted = j) + 1);
		parsePosts(thr, lPosts, els, j + 1, omt);
		if(j !== 0) {
			thr.op.insertAdjacentHTML('afterend', '<div class="de-omitted">' + j + '</div>');
		}
		el = $c('de-expand', thr);
		if(last <= 5 && last !== 1) {
			$del(el && el.parentNode);
		} else if(!el) {
			thr.insertAdjacentHTML('beforeend', '<span>[<a class="de-expand" href="#"></a>]</span>');
			thr.lastChild.onclick = function(e) {
				$pd(e);
				loadThread(this.parentNode.op, 5, null);
			};
		}
		aProto.splice.apply(Posts, [Posts.indexOf(op), pCnt + 1, op].concat(lPosts.slice(j + 1, len + 1)));
		thr.loadedPosts = lPosts;
		closeAlert($id('de-alert-load-thr'));
		$focus(op);
		Fn && Fn();
		last = Fn = null;
	}, function(err) {
		$alert(err, 'load-thr', false);
		Fn && Fn();
		Fn = null;
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
	el.insertAdjacentHTML('beforeend', '<iframe name="de-iframe-fav" id="de-iframe-fav" src="' +
		$t('a', el).href + '" scrolling="no" style="border: none; width: ' +
		(doc.documentElement.clientWidth - 55) + 'px; height: 1px;"><div id="de-fav-wait" ' + 
		'class="de-wait" style="font-size: 1.1em; text-align: center">' + Lng.loading[lang] + '</div>'
	);
}

function loadPageHelper(i, Fn) {
	ajaxGetPosts(aib.getPageUrl(brd, i), false, function(idx, dc, el) {
		this(replacePost(doc.importNode($q(aib.qDForm, dc), true)), idx);
	}.bind(Fn, i), null);
}

function parsePages(pages, node) {
	$disp(node);
	dForm.parentNode.replaceChild(node, dForm);
	dForm = node;
	pages.forEach(tryToParse);
	addDelformStuff(false);
	if(isExpImg) {
		Posts.forEach(function(post) {
			expandAllPostImg(post, null);
		});
	}
	if(pr.passw) {
		pages.forEach(function(page) {
			var node = $q('input[type="password"]', page);
			pr.dpass = node;
			node.value = Cfg['passwValue'];
		});
	}
	$disp(node);
	closeAlert($id('de-alert-load-pages'));
}

function preparePage() {
	$alert(Lng.loading[lang], 'load-pages', true);
	if(Cfg['preLoadImgs']) {
		$each($Q('a[href^="blob:"]', dForm), function(a) {
			window.URL.revokeObjectURL(a.href);
		});
	}
	$disp(dForm);
	Posts = [];
	Threads = [];
	pByNum = {};
	Pviews.ajaxed = {};
}

function updatePage() {
	preparePage();
	loadPageHelper(pageNum, function(pg, idx) {
		parsePages([pg], pg);
	});
}

function loadPages(len) {
	preparePage();
	for(var el = doc.createElement('div'), i = 0, pages = new Array(len), loaded = 1; i < len; i++) {
		loadPageHelper(i, function(pg, idx) {
			pages[idx] = pg;
			if(loaded === len) {
				pages.forEach(function(page, pNum) {
					$append(el, [
						$new('center', {'text': pNum + ' ' + Lng.page[lang], 'style': 'font-size: 2em;'}, null),
						doc.createElement('hr'),
						page
					]);
				});
				parsePages(pages, el);
				loaded = pages = el = null;
			} else {
				loaded++;
			}
		});
	}
}

/*-------------------------------Threads updater------------------------------*/

function setUpdButtonState(state) {
	if(TNum && Cfg['updThread'] === 1) {
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
	if(Cfg['updThread'] !== 1) {
		return;
	}
	setUpdButtonState('on');
	if(Favico.focused) {
		return;
	}
	i += +(doc.title.match(/^\[(\d+)\]/) || [, 0])[1];
	if(Cfg['favIcoBlink'] && Favico.href) {
		clearInterval(Favico.delay);
		if(i > 0) {
			Favico.delay = setInterval(function() {
				var href = $q('link[href="' + Favico.href + '"]', doc.head) ? 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII=' : Favico.href;
				$each($Q('link[rel="shortcut icon"]', doc.head), $del);
				doc.head.appendChild($new('link', {'href': href, 'rel': 'shortcut icon'}, null));
			}, 800);
		}
	}
	doc.title = (i > 0 ? ' [' + i + '] ' : '') + docTitle;
	if(nav.WebKit && Cfg['desktNotif'] && i > 0 && window.webkitNotifications.checkPermission() === 0) {
		var notif = window.webkitNotifications.createNotification(
				'/favicon.ico', docTitle, Lng.unreadMsg[lang].replace(/%m/g, i)
			);
		notif.ondisplay = function() {
			setTimeout(this.cancel.bind(this), 12e3);
		};
		notif.onclick = function () {
			if(window.focus) {
				window.focus();
			}
			this.cancel();
		};
		notif.show();
	}
	if(Audio.enabled && !Audio.running && i > 0) {
		if(Audio.repeat) {
			audioNotification();
		} else {
			Audio.el.play()
		}
	}
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
	return '<div class="file"><div class="fileinfo">Файл: <a href="/' + src + '" target="_blank">'
		+ name + '</a><br><em>' + file['thumb'].substring(file['thumb'].lastIndexOf('.') + 1) + ', ' + (
			size < kb ? size + ' B'
			: size < mb ? (size / kb).toFixed(2) + ' KB'
			: size < gb ? (size / mb).toFixed(2) + ' MB'
			: (size / gb).toFixed(2) + ' GB'
		) + ', ' + file['metadata']['width'] + 'x' + file['metadata']['height'] +
		'</em><br><a class="edit_ icon" href="/utils/image/edit/' + file['file_id'] + '/' + id +
		'"><img title="edit" alt="edit" src="/images/blank.png"></a></div><a href="/' + src +
		'" target="_blank"><img class="thumb" src="/' + thumb + '" width="' + thumbW + '" height="' +
		thumbH + '"></a></div>';
}

function getHanaPost(postJson) {
	var i, html, id = postJson['display_id'],
		files = postJson['files'],
		len = files.length,
		post = $new('td', {'id': 'reply' + id, 'class': 'reply', 'de-post': id}, null);
	html = '<a name="i' + id + '"></a><label><a class="delete icon"><input type="checkbox" id="delbox_' +
		id + '" class="delete_checkbox" value="' + postJson['post_id'] + '" id="' + id +
		'"></a><span class="postername">' + postJson['name'] + '</span> ' + aib.hDTFix.fix(postJson['date']) +
		' </label><span class="reflink"><a onclick="Highlight(0, ' + id + ')" href="/' + brd +
		'/res/' + TNum + '.xhtml#i' + id + '">No.' + id + '</a></span><br>';
	for(i = 0; i < len; i++) {
		html += getHanaFile(files[i], postJson['post_id']);
	}
	post.innerHTML = html + (len > 1 ? '<div style="clear: both;"></div>' : '') +
		'<div class="postbody">' + postJson['message_html'] + '</div><div class="abbrev"></div>';
	return post;
}

function checkBan(el, node) {
	if(!el.isBan && aib.qBan) {
		var isBan = $q(aib.qBan, node);
		if(isBan) {
			if(!$q(aib.qBan, el)) {
				el.msg.appendChild(doc.importNode(isBan, true));
			}
			el.isBan = true;
		}
	}
}

function parsePosts(thr, oPosts, nPosts, from, omt) {
	var i, j, k, el, el_, temp, np = 0,
		len = oPosts.length,
		lastdcount = oPosts[len - 1].dcount || 0,
		len_ = nPosts.length,
		df = doc.createDocumentFragment();
	for(i = 1, j = 0; i < len || j < len_;) {
		el_ = nPosts[j];
		if(i === len - 1 && df.hasChildNodes()) {
			$after(thr.op, df);
			df = doc.createDocumentFragment();
		}
		if(i >= len) {
			np += newPost(thr, el = oPosts[i] = importPost(el_), aib.getPNum(el_), i, df);
			el.dcount = lastdcount;
		} else if(el = oPosts[i]) {
			if(!el_ || el.num !== aib.getPNum(el_)) {
				if(TNum) {
					if(!el.deleted) {
						el.deleted = true;
						if(!temp) {
							temp = sessionStorage['de-deleted-' + TNum];
						}
						temp = (temp ? temp + ',' : '') + (i + 1);
						for(k = i; k < len; k++) {
							oPosts[k].dcount = (oPosts[k].dcount || 0) + 1;
						}
						el.btns.classList.remove('de-ppanel-cnt');
						el.btns.classList.add('de-ppanel-del');
						lastdcount++;
					}
					i++;
				} else {
					k = aib.getWrap(el);
					if(aib._4chon) {
						$del(k.nextSibling);
					}
					$del(k);
					delete pByNum[el.num];
					if(el.hide) {
						unhideByRef(el);
					}
					updRefMap(el, false);
					oPosts.splice(i, 1);
					len--;
				}
				continue;
			}
			if(i < from) {
				if(i > omt) {
					aib.getWrap(el).classList.add('de-hidden');
				}
			} else if(!TNum) {
				aib.getWrap(el).classList.remove('de-hidden');
				updRefMap(el, true);
			}
			checkBan(el, el_);
		} else if(i >= from) {
			newPost(thr, el = oPosts[i] = importPost(el_), aib.getPNum(el_), i, df);
		}
		j++;
		i++;
	}
	if(temp) {
		sessionStorage['de-deleted-' + TNum] = temp;
	}
	thr.appendChild(df);
	return [thr.pCount = len_ + 1, np];
}

function loadNewPosts(Fn) {
	if(aib.hana) {
		getJsonPosts(
			'//dobrochan.ru/api/thread/' + brd + '/' + TNum +
				'/new.json?message_html&new_format&last_post=' + Posts[Posts.length - 1].num,
			function(status, sText, json) {
				if(status !== 200 || json['error']) {
					infoNewPosts(status === 0 ? Lng.noConnect[lang] : (sText || json['message']), 0);
				} else {
					var i, len, post,
						np = 0,
						el = (json['result'] || {})['posts'],
						thr = $c('de-thread', dForm),
						df = doc.createDocumentFragment();
					if(el && el.length > 0) {
						for(i = 0, len = el.length; i < len; i++) {
							post = replacePost(getHanaPost(el[i]));
							np += newPost(thr, post, el[i]['display_id'], thr.pCount + i, df);
							Posts.push(post);
						}
						thr.appendChild(df);
						thr.pCount += el.length;
					}
					infoNewPosts(null, np);
				}
				Fn && Fn();
				Fn = null;
			}
		);
		return;
	}
	ajaxGetPosts(aib.getThrdUrl(brd, TNum), true, function(els, op) {
		var data = parsePosts($c('de-thread', dForm), Posts, els, 0, 0);
		checkBan(Posts[0], op);
		infoNewPosts(null, data[1]);
		savePostsVisib();
		$id('de-panel-info').firstChild.textContent = data[0] + '/' + getPostImages(dForm).length;
		Fn && Fn();
		Fn = null;
	}, function(err) {
		infoNewPosts(err, 0);
		Fn && Fn();
		Fn = null;
	});
}

function initThreadsUpdater() {
	ajaxInterval = setInterval(function() {
		loadNewPosts(null);
	}, Cfg['updThrDelay']*1e3);
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

function setPostsVisib() {
	for(var vis, pNum, post, i = 0; post = Posts[i]; i++) {
		vis = sVis[i];
		if(uVis[pNum = post.num]) {
			if(post.isOp) {
				uVis[pNum][0] = typeof hThr[pNum] === 'undefined' ? 1 : 0;
			}
			if(uVis[pNum][0] === 0) {
				setUserPostVisib(post, true);
			} else {
				uVis[pNum][1] = Date.now();
				post.btns.firstChild.className = 'de-btn-hide-user';
			}
			if(typeof vis === 'undefined') {
				sVis[i] = 1;
				spells.check(post, function(pst, note) {
					sVis[pst.count] = 0;
				}, false);
			}
			continue;
		}
		if(post.isOp) {
			if(typeof hThr[pNum] !== 'undefined') {
				sVis[i] = vis = '0';
			} else if(vis === '0') {
				vis = null;
			}
		}
		if(vis === '0') {
			doHidePost(post, null);
		} else if(vis !== '1') {
			sVis[post.count] = 1;
			spells.check(post, hidePost, false);
		}
	}
}

function toggleUserPostVisib(post) {
	setUserPostVisib(post, !post.hide);
	saveUserPostsVisib();
}

function togglePostContent(post, hide) {
	if(hide) {
		post.classList.add('de-post-hid');
	} else {
		post.classList.remove('de-post-hid');
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
	var el, a, pNum, thr = post.thr;
	post.hide = hide;
	if(post.isOp) {
		thr.style.display = hide ? 'none' : '';
		thr.hide = hide;
		el = $id('de-thr-hid-' + (pNum = post.num));
		if(!hide && el) {
			$del(el);
			toggleHiddenThread(post, 1);
		}
		if(hide && !el) {
			thr.insertAdjacentHTML('beforebegin', '<div class="' + aib.cReply +
				' de-thr-hid" id="de-thr-hid-' + pNum + '">' + Lng.hiddenThrd[lang] +
				' <a href="#">№' + pNum + '</a><i> (' + (
					note ? 'autohide: ' + note : post.tTitle.replace(/</g, '&lt;').replace(/>/g, '&gt;')
				) + ')</i></div>');
			a = $t('a', el = thr.previousSibling);
			a.onclick = function(e) {
				$pd(e);
				toggleUserPostVisib(post);
			};
			a.onmouseover = function() {
				thr.style.display = '';
			};
			el.onmouseout = function() {
				thr.style.display = 'none';
			};
			toggleHiddenThread(post, 0);
		}
		return;
	}
	togglePostContent(post, hide);
	if(Cfg['delHiddPost']) {
		if(hide) {
			(el = aib.getWrap(post)).classList.add('de-hidden');
			el.insertAdjacentHTML('afterend', '<span style="counter-increment: de-cnt 1;"></span>');
		} else {
			(el = aib.getWrap(post)).classList.remove('de-hidden');
			$del(el.nextSibling);
		}
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
		post.pref.onmouseover = hide && function() {
			togglePostContent(getPost(this), false);
		};
		post.pref.onmouseout = hide && function() {
			togglePostContent(getPost(this), true);
		};
	}
	if(Cfg['strikeHidd']) {
		setTimeout($each, 0, $Q('a[href*="#' + post.num + '"]', dForm), hide ? function(el) {
			el.className = 'de-ref-hid';
		} : function(el) {
			el.className = null;
		});
	}
}

function doHidePost(post, note) {
	setPostVisib(post, true, note);
	hideByRef(post);
}

function hidePost(post, note) {
	if(uVis[post.num]) {
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
	sVis[post.count] = 1;
	setPostVisib(post, false, null);
	unhideByRef(post);
	$del($c('de-post-note', post));
}

function setUserPostVisib(post, hide) {
	var pNum = post.num;
	setPostVisib(post, hide, null);
	post.btns.firstChild.className = 'de-btn-hide-user';
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
	var text = getText(post),
		wrds = getWrds(text),
		hid = post.hide,
		num = post.num;
	Posts.forEach(function(target) {
		findSameText(target, num, hid, wrds);
	});
	saveUserPostsVisib();
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
	return img.hash = genImgHash(ctx.getImageData(0, 0, w || 1, h || 1).data, w, h);
}

/*==============================================================================
								SPELLS AND EXPRESSIONS
==============================================================================*/

/** @constructor */
function Spells(read) {
	if(read) {
		this.update();
	} else {
		this._disable();
	}
}
Spells.checkArr = function(val, num) {
	var i, arr;
	for(arr = val[0], i = arr.length - 1; i >= 0; i--) {
		if(arr[i] === num) {
			return true;
		}
	}
	for(arr = val[1], i = arr.length - 1; i >= 0; i--) {
		if(num >= arr[i][0] && num <= arr[i][1]) {
			return true;
		}
	}
	return false;
};
Spells.retAsyncVal = function(post, oval, flags, sStack, hFunc, nhFunc, val, async) {
	var temp, rv = spells._checkRes(flags, val);
	if(rv === null) {
		spells._continueCheck(post, sStack, hFunc, nhFunc, async);
	} else if(rv) {
		temp = sStack.pop();
		hFunc(post, spells._getMsg(temp[2][temp[0] - 1]), async);
	} else if(nhFunc) {
		nhFunc(post, async);
	}
};
Spells.prototype = {
	names: [
		'words', 'exp', 'exph', 'imgn', 'ihash', 'subj', 'name', 'trip', 'img', 'sage', 'op', 'tlen', 'all',
		'video', 'wipe', 'num'
	],
	_funcs: [
		// 0: #words
		function(post, val) {
			var pTitle;
			return getText(post).toLowerCase().contains(val) ||
				(pTitle = $q('.replytitle, .filetitle', post)) &&
				pTitle.textContent.toLowerCase().contains(val);
		},
		// 1: #exp
		function(post, val) {
			return val.test(getText(post));
		},
		// 2: #exph
		function(post, val) {
			return val.test(post.innerHTML);
		},
		// 3: #imgn
		function(post, val) {
			var inf = $c(aib.cFileInfo, post);
			return inf && val.test(inf.textContent);
		},
		// 4: #ihash
		function(post, val) {
			return post.img[0] && getImgHash(post) === val;
		},
		// 5: #subj
		function(post, val) {
			var pTitle = $q('.replytitle, .filetitle', post);
			if(!pTitle || !(pTitle = pTitle.textContent)) {
				return false;
			}
			return !val || val.test(pTitle);
		},
		// 6: #name
		function(post, val) {
			var pName = $c(aib.cName, post);
			if(!pName || !(pName = pName.textContent)) {
				return false;
			}
			return !val || pName.contains(val);
		},
		// 7: #trip
		function(post, val) {
			var pTrip = $c(aib.cTrip, post);
			if(!pTrip) {
				return false;
			}
			return !val || pTrip.textContent.contains(val);
		},
		// 8: #img
		function(post, val) {
			if(!post.img[0]) {
				return false;
			}
			if(val) {
				var temp, wh, w, h;
				if(temp = val[1]) {
					w = getImgWeight(post);
					switch(val[0]) {
					case 0: h = w >= temp[0] && w <= temp[1]; break;
					case 1: h = w < temp[0]; break;
					case 2: h = w > temp[0];
					}
					if(!h) {
						return false;
					} else if(!val[2]) {
						return true;
					}
				}
				if(temp = val[2]) {
					wh = getImgSize(post);
					w = +wh[0];
					h = +wh[1];
					switch(val[0]) {
					case 0: return w >= temp[0] && w <= temp[1] && h >= temp[2] && h <= temp[3];
					case 1: return w < temp[0] && h < temp[3];
					case 2: return w > temp[0] && h > temp[3];
					}
				}
			}
			return true;
		},
		// 9: #sage
		function(post, val) {
			return post.sage;
		},
		// 10: #op
		function(post, val) {
			return post.isOp;
		},
		// 11: #tlen
		function(post, val) {
			var text = getText(post);
			return !val ? !!text : Spells.checkArr(val, text.replace(/\n/g, '').length);
		},
		// 12: #all
		function(post, val) {
			return true;
		},
		// 13: #video
		function(post, val) {
			var args = aProto.slice.call(arguments);
			if(!val) {
				Spells.retAsyncVal.apply(null, args.concat(!!post.ytObj, false));
				return;
			}
			if(!post.ytObj || !Cfg['YTubeTitles']) {
				Spells.retAsyncVal.apply(null, args.concat(false, false));
				return;
			}
			var text, i, link, links = $C('de-ytube-link', post),
				len = links.length;
			post.ytCount = len;
			for(i = 0; i < len; i++) {
				link = links[i];
				if(link.textData === 2) {
					text = link.textContent;
					if(text && val.test(text)) {
						Spells.retAsyncVal.apply(null, args.concat(true, false));
						post.ytCount = null;
						args[0] = false;
						return;
					}
					post.ytCount--;
				} else if(link.textData === 1) {
					post.ytCount--;
				} else {
					link.spellFn = checkTubeLink.bind(args);
				}
			}
			if(post.ytCount === 0) {
				Spells.retAsyncVal.apply(null, args.concat(false, false));
				post.ytCount = null;
			}
		},
		// 14: #wipe
		function(post, val) {
			var arr, len, i, j, n, x, keys, pop, capsw, casew, _txt, txt = getText(post);
			// (1 << 0): samelines
			if(val & 1) {
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
							Spells._lastWipeMsg = 'same lines: "' + x.substr(0, 20) + '" x' + j;
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
								Spells._lastWipeMsg = 'same words: "' + x.substr(0, 20) + '" x' + pop;
								return true;
							}
						}
					}
					x = keys / len;
					if(x < 0.25) {
						Spells._lastWipeMsg = 'uniq words: ' + (x * 100).toFixed(0) + '%';
						return true;
					}
				}
			}
			// (1 << 2): longwords
			if(val & 4) {
				arr = txt.replace(/https*:\/\/.*?(\s|$)/g, '').replace(/[\s\.\?!,>:;-]+/g, ' ').split(' ');
				if(arr[0].length > 50 || ((len = arr.length) > 1 && arr.join('').length / len > 10)) {
					Spells._lastWipeMsg = 'long words';
					return true;
				}
			}
			// (1 << 3): symbols
			if(val & 8) {
				_txt = txt.replace(/\s+/g, '');
				if((len = _txt.length) > 30 &&
					(x = _txt.replace(/[0-9a-zа-я\.\?!,]/ig, '').length / len) > 0.4)
				{
					Spells._lastWipeMsg = 'specsymbols: ' + (x * 100).toFixed(0) + '%';
					return true;
				}
			}
			// (1 << 4): capslock
			if(val & 16) {
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
						Spells._lastWipeMsg = 'CAPSLOCK: ' + capsw / arr.length * 100 + '%';
						return true;
					} else if(casew / n >= 0.3 && n > 8) {
						Spells._lastWipeMsg = 'cAsE words: ' + casew / arr.length * 100 + '%';
						return true;
					}
				}
			}
			// (1 << 5): numbers
			if(val & 32) {
				_txt = txt.replace(/\s+/g, ' ').replace(/>>\d+|https*:\/\/.*?(?: |$)/g, '');
				if((len = _txt.length) > 30 && (x = (len - _txt.replace(/\d/g, '').length) / len) > 0.4) {
					Spells._lastWipeMsg = 'numbers: ' + Math.round(x * 100) + '%';
					return true;
				}
			}
			return Spells._lastWipeMsg = false;
		},
		// 15: #num
		function(post, val) {
			return Spells.checkArr(val, post.count + 1);
		}
	],
	_toRegExp: function(str, noG) {
		var l = str.lastIndexOf('/'),
			flags = str.substr(l + 1);
		return new RegExp(str.substr(1, l - 1), noG ? flags.replace('g', '') : flags);
	},
	_parseSpell: function(tokens, str, offset) {
		if(this._lastType === 2 || this._lastType === 4) {
			this._errorMessage = Lng.seMissOp[lang];
			this._lastErrCol = 0;
			return 0;
		}
		var opt, type, rType, exp, temp, noBkt,
			val = str.substr(offset + 1).match(/^([a-z]+)(?:\[([a-z0-9]+)(?:(,)|,(\s*[0-9]+))?\])?/);
		if(!val) {
			this._errorMessage = Lng.seSyntaxErr[lang];
			this._lastErrCol = 0;
			return 0;
		}
		type = this.names.indexOf(val[1]);
		this._lastType = 2;
		if(type === -1) {
			this._errorMessage = Lng.seUnknown[lang] + val[1];
			this._lastErrCol = 1;
			return 0;
		}
		if(this._opNeg) {
			rType = type | 0x100;
			this._opNeg = false;
		} else {
			rType = type;
		}
		opt = val[2] && [val[2], val[4] ? val[4] : val[3] ? -1 : false];
		str = str.substr(offset + 1 + val[0].length);
		temp = str[0] !== '(' ? 0 : str[1] === ')' ? 2 : false;
		noBkt = temp !== false;
		switch(type) {
		// #ihash
		case 4:
			exp = !noBkt && str.match(/^\((?:(\d+)|(.*?))\)/);
			if(!exp) {
				this._errorMessage = Lng.seSyntaxErr[lang];
			} else if(!exp[1]) {
				this._errorMessage = Lng.seErrConvNum[lang].replace('%1', exp[2]);
			} else {
				tokens.push([rType, +exp[1], opt]);
				return val[0].length + exp[0].length;
			}
			this._lastErrCol = val[0].length;
			return 0;
		// #img
		case 8:
			if(noBkt) {
				tokens.push([rType, '', opt]);
				return val[0].length + temp;
			}
			exp = str.match(/^\(([><=])(?:(\d+(?:\.\d+)?)(?:-(\d+(?:\.\d+)?))?)?(?:@(\d+)(?:-(\d+))?x(\d+)(?:-(\d+))?)?\)/);
			if(!exp || (!exp[2] && !exp[4])) {
				this._errorMessage = Lng.seSyntaxErr[lang];
				this._lastErrCol = val[0].length;
				return 0;
			}
			tokens.push([rType, [
				exp[1] === '=' ? 0 : exp[1] === '<' ? 1 : 2,
				exp[2] && [
					+exp[2],
					exp[3] ? +exp[3] : +exp[2]
				],
				exp[4] && [
					+exp[4],
					exp[5] ? +exp[5] : +exp[4],
					+exp[6],
					exp[7] ? +exp[7] : +exp[6]
				]
			], opt]);
			return val[0].length + exp[0].length;
		// #wipe
		case 14:
			if(noBkt) {
				tokens.push([rType, 0x3F, opt]);
				return val[0].length + temp;
			}
			exp = str.match(/^\(([a-z, ]+)\)/);
			if(exp) {
				temp = 0;
				if(!exp[1].split(/, */).some(function(v) {
					switch(v) {
					case 'samelines': temp |= 1; return false;
					case 'samewords': temp |= 2; return false;
					case 'longwords': temp |= 4; return false;
					case 'symbols': temp |= 8; return false;
					case 'capslock': temp |= 16; return false;
					case 'numbers': temp |= 32; return false;
					default: return true;
					}
				})) {
					tokens.push([rType, temp, opt]);
					return val[0].length + exp[0].length;
				}
			}
			this._errorMessage = Lng.seSyntaxErr[lang];
			this._lastErrCol = val[0].length;
			return 0;
		// #tlen
		case 11:
			if(noBkt) {
				tokens.push([rType, '', opt]);
				return val[0].length + temp;
			}
		// #num
		case 15:
			exp = !noBkt && str.match(/^\(([\d-, ]+)\)/);
			if(exp) {
				exp[1].split(/, */).forEach(function(v) {
					if(v.contains('-')) {
						var nums = v.split('-');
						nums[0] = +nums[0];
						nums[1] = +nums[1];
						this[1].push(nums);
					} else {
						this[0].push(+v);
					}
				}, temp = [[], []]);
				tokens.push([rType, temp, opt]);
				return val[0].length + exp[0].length;
			} else {
				this._errorMessage = Lng.seSyntaxErr[lang];
				this._lastErrCol = val[0].length;
				return 0;
			}
		// #video, #subj
		case 13:
		case 5:
			if(noBkt) {
				tokens.push([rType, '', opt]);
				return val[0].length + temp;
			}
		// #exp, #exph, #imgn
		case 1:
		case 2:
		case 3:
			exp = !noBkt && str.match(/^\((\/.*?[^\\]\/[ig]*)\)/);
			if(!exp) {
				this._errorMessage = Lng.seSyntaxErr[lang];
				this._lastErrCol = val[0].length;
				return 0;
			}
			temp = exp[1];
			try {
				this._toRegExp(temp, true);
			} catch(e) {
				this._errorMessage = Lng.seErrRegex[lang] + temp;
				this._lastErrCol = val[0].length;
				return 0;
			}
			tokens.push([rType, temp, opt]);
			return val[0].length + exp[0].length;
		// #sage, #op, #all, #trip
		case 7:
		case 9:
		case 10:
		case 12:
			if(noBkt) {
				tokens.push([rType, '', opt]);
				return val[0].length + temp;
			}
		// #name, #words
		default:
			exp = str.match(/^\((.*?[^\\])\)/);
			if(!exp) {
				this._errorMessage = Lng.seSyntaxErr[lang];
				this._lastErrCol = 0;
				return false;
			}
			temp = exp[1].replace(/\\\)/g, ')');
			tokens.push([rType, type === 0 ? temp.toLowerCase() : temp, opt]);
			return val[0].length + exp[0].length;
		}
	},
	_setOperator: function(scope, op) {
		if(op === 2) {
			if(!this._lastType || this._lastType === 3) {
				this._lastType = 1;
				return this._opNeg = true;
			}
		} else if(this._lastType === 2 || this._lastType === 4) {
			this._lastType = 0;
			if(op === 1) {
				scope[scope.length - 1][0] |= 0x200;
			}
			return true;
		}
		return false;
	},
	_compile: function(sList) {
		if(!sList) {
			return null;
		}
		this._lastType = this._opNeg = null;
		var d, data = [],
			scopes = [],
			scope = data,
			bkt = 0,
			col = 1,
			line = 1,
			i = 0,
			len = sList.length;
		for(; i < len; i++, col++) {
			switch(sList[i]) {
			case '\n':
				line++;
				col = 0;
			case '\r':
			case ' ': continue;
			case '#': 
				d = this._parseSpell(scope, sList, i);
				if(d === 0) {
					 this._error = this._errorMessage + Lng.seRow[lang] + line +
						Lng.seCol[lang] + (col + this._lastErrCol) + ')';
					 return false;
				} else {
					i += d;
					col += d;
				}
				break;
			case '(':
				if(this._lastType === 2 || this._lastType === 4) {
					this._error = Lng.seMissOp[lang] +
						Lng.seRow[lang] + line + Lng.seCol[lang] + col + ')';
					return false;
				}
				scopes.push(scope);
				scope.push([this._opNeg ? 0x1FF : 0xFF, []])
				scope = scope[scope.length - 1][1];
				bkt++;
				this._lastType = 3;
				this._opNeg = false;
				break;
			case ')':
				if(this._lastType === 0 || this._lastType === 1) {
					this._error = Lng.seMissSpell[lang] +
						Lng.seRow[lang] + line + Lng.seCol[lang] + col + ')';
					return false;
				}
				if(bkt > 0) {
					scope = scopes.pop();
					bkt--;
				} else {
					this._error = Lng.seMissOpBkt[lang] +
						Lng.seRow[lang] + line + Lng.seCol[lang] + col + ')';
					return false;
				}
				this._lastType = 4;
				break;
			case '|':
			case '&':
			case '!':
				if(this._setOperator(scope, sList[i] === '|' ? 0 : sList[i] === '&' ? 1 : 2)) {
					break;
				}
			default:
				this._error = Lng.seUnexpChar[lang] + sList[i] +
					Lng.seRow[lang] + line + Lng.seCol[lang] + col + ')';
				return false;
			}
		}
		if(this._lastType !== 2 && this._lastType !== 4) {
			this._error = Lng.seSyntaxErr[lang] + Lng.seRow[lang] + line + ')';
			return false;
		}
		if(bkt > 0) {
			this._error = Lng.seMissClBkt[lang] + Lng.seRow[lang] + line + ')';
			return false;
		}
		return data.length === 0 ? null : data;
	},
	_clearScope: function(nScope, item, i, len) {
		var temp, neg = (item & 0x100) !== 0;
		if(i === len - 1) {
			if(i === 0) {
				return neg ? [[12,'',null]] : null;
			}
			temp = nScope.length - 1;
			if(neg) {
				while(nScope[temp] && (nScope[temp][0] & 0x200) === 0) {
					delete nScope[temp];
					temp -= 2;
				}
				if(nScope[temp]) {
					nScope[temp][0] &= 0x1FF;
				}
				if(temp < 0) {
					return [[12,'',null]];
				}
			} else {
				while(nScope[temp] && (nScope[temp][0] & 0x200) !== 0) {
					delete nScope[temp];
					temp -= 2;
				}
				if(temp < 0) {
					return null;
				}
			}
			return nScope.length === 1 && nScope[0][0] === 0xFF ? nScope[0][1] : nScope;
		} else if((item & 0x200) !== 0) {
			if(!neg) {
				return null;
			}
		} else if(neg) {
			return [[12,'',null]];
		}
		return false;
	},
	_removeBoards: function(scope) {
		for(var i = 0, len = scope.length, nScope = [], type, spell, temp; i < len; i++) {
			spell = scope[i];
			type = spell[0] & 0xFF;
			if(type === 0xFF) {
				if(temp = this._removeBoards(spell[1])) {
					if(temp.length === 1) {
						temp = temp[0];
						temp[0] |= spell[0] & 0x200;
						temp[0] ^= spell[0] & 0x100;
						nScope.push(temp);
					} else {
						nScope.push([spell[0], temp]);
					}
					continue;
				} else {
					temp = this._clearScope(nScope, spell[0], i, len);
				}
			} else {
				temp = spell[2];
				if(temp && (temp[0] !== brd || (temp[1] === -1 ? TNum : temp[1] && temp[1] !== TNum))) {
					temp = this._clearScope(nScope, spell[0], i, len);
				} else if(type === 12) {
					temp = this._clearScope(nScope, spell[0] ^ 0x100, i, len);
				} else {
					nScope.push(spell);
					continue;
				}
			}
			if(temp !== false) {
				return temp;
			}
		}
		return nScope.length === 0 ? null :
			nScope.length === 1 && nScope[0][0] === 0xFF ? nScope[0][1] :
			nScope;
	},
	_initSpells: function(data) {
		if(data) {
			data.forEach(function initExps(item) {
				var val = item[1];
				if(val) {
					switch(item[0] & 0xFF) {
					case 1:
					case 2:
					case 3:
					case 5:
					case 13: item[1] = this(val, true); break;
					case 0xFF: val.forEach(initExps, this);
					}
				}
			}, this._toRegExp);
		}
		return data;
	},
	_checkRes: function(flags, val) {
		if((flags & 0x100) !== 0) {
			val = !val;
		}
		if((flags & 0x200) !== 0) {
			if(!val) {
				return false;
			}
		} else if(val) {
			return true;
		}
		return null;
	},
	_decompileSpell: function(type, neg, val, scope) {
		var temp, temp_, spell = (neg ? '!#' : '#') + this.names[type] + (scope ? '[' +
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
			if(val === 0x3F) {
				return spell;
			}
			temp = [];
			(val & 1) && temp.push('samelines');
			(val & 2) && temp.push('samewords');
			(val & 4) && temp.push('longwords');
			(val & 8) && temp.push('symbols');
			(val & 16) && temp.push('capslock');
			(val & 32) && temp.push('numbers');
			return spell + '(' + temp.join(',') + ')';
		}
		// #num, #tlen
		else if(type === 15 || type === 11) {
			if((temp = val[1].length - 1) !== -1) {
				for(temp_ = []; temp >= 0; temp--) {
					temp_.push(val[1][temp][0] + '-' + val[1][temp][1]);
				}
				temp_.reverse();
			}
			spell += '(';
			if(val[0].length !== 0) {
				spell += val[0].join(',') + (temp_ ? ',' : '');
			}
			if(temp_) {
				spell += temp_.join(',');
			}
			return spell + ')';
		}
		// #words, #name, #trip
		else if(type === 0 || type === 6 || type === 7) {
			return spell + '(' + val.replace(/\)/g, '\\)') + ')';
		} else {
			return spell + '(' + String(val) + ')';
		}
	},
	_getMsg: function(spell) {
		var neg = spell[0] & 0x100,
			type = spell[0] & 0xFF,
			val = spell[1];
		if(type === 0xFF) {
			return this._getMsg(val[this._lastPSpell]);
		}
		if(type === 14) {
			return (neg ? '!#wipe' : '#wipe') + (Spells._lastWipeMsg ? ': ' + Spells._lastWipeMsg : '');
		} else {
			return this._decompileSpell(type, neg, val, spell[2]);
		}
	},
	_continueCheck: function(post, sStack, hFunc, nhFunc, async) {
		var type, temp, val, rv = false,
			cInfo = sStack.pop(),
			i = cInfo[0],
			len = cInfo[1],
			scope = cInfo[2];
		while(true) {
			if(i < len) {
				temp = scope[i][0];
				type = temp & 0xFF;
				if(type === 0xFF) {
					sStack.push([i, len, scope]);
					scope = scope[i][1];
					len = scope.length;
					i = 0;
					continue;
				} else if(type === 13) {
					sStack.push([i + 1, len, scope]);
					this._funcs[type](post, scope[i][1], temp, sStack, hFunc, nhFunc);
					return;
				} else {
					val = this._funcs[type](post, scope[i][1]);
				}
				rv = this._checkRes(temp, val);
				if(rv === null) {
					i++;
					continue;
				}
				this._lastPSpell = i;
			} else {
				this._lastPSpell = i -= 1;
				rv = false;
			}
			if(cInfo = sStack.pop()) {
				i = cInfo[0];
				len = cInfo[1];
				scope = cInfo[2];
				rv = this._checkRes(scope[i][0], rv);
				if(rv === null) {
					i++;
					continue;
				}
			}
			if(rv) {
				hFunc(post, this._getMsg(scope[i]), async);
			} else if(nhFunc) {
				nhFunc(post, async);
			}
			return;
		}
	},
	_findReps: function(str) {
		var reps = [],
			outreps = [],
			rStr = '';
		str = str.replace(
			/([^\\]\)|^)?[\n\s]*(#rep(?:\[([a-z0-9]+)(?:(,)|,(\s*[0-9]+))?\])?\((\/.*?[^\\]\/[ig]*)(?:,\)|,(.*?[^\\])?\)))[\n\s]*/g,
			function(exp, preOp, fullExp, b, nt, t, reg, txt) {
				reps.push([b, nt ? -1 : t, reg, (txt || '').replace(/\\\)/g, ')')]);
				rStr += fullExp + '\n';
				return preOp || '';
			}
		).replace(
			/([^\\]\)|^)?[\n\s]*(#outrep(?:\[([a-z0-9]+)(?:(,)|,(\s*[0-9]+))?\])?\((\/.*?[^\\]\/[ig]*)(?:,\)|,(.*?[^\\])?\)))[\n\s]*/g,
			function(exp, preOp, fullExp, b, nt, t, reg, txt) {
				outreps.push([b, nt ? -1 : t, reg, (txt || '').replace(/\\\)/g, ')')]);
				rStr += fullExp + '\n';
				return preOp || '';
			}
		);
		this._TEMP.reps = reps;
		this._TEMP.outreps = outreps;
		return [str, rStr];
	},
	_optimizeReps: function(data) {
		if(data) {
			var nData = [];
			data.forEach(function(temp) {
				if(!temp[0] || (temp[0] === brd && (temp[1] === -1 ? !TNum : !temp[1] || temp[1] === TNum))) {
					nData.push([temp[2], temp[3]]);
				}
			});
			return nData.length === 0 ? false : nData;
		}
		return false;
	},
	_initReps: function(data) {
		if(data) {
			for(var i = data.length - 1; i >= 0; i--) {
				data[i][0] = this._toRegExp(data[i][0], false);
			}
		}
		return data;
	},
	_init: function(spells, reps, outreps) {
		this._spells = this._initSpells(spells);
		this._reps = this._initReps(reps);
		this._outreps = this._initReps(outreps);
		this.enable = !!this._spells;
		this.haveSpells = !!spells;
		this.haveReps = !!reps;
		this.haveOutreps = !!outreps;
	},
	_disable: function() {
		this.hash = 0;
		this.list = '';
		this.enable = false;
		this.haveSpells = this.haveReps = this.haveOutreps = false;
		saveCfg('hideBySpell', 0);
	},
	_pushSpell: function(op, scope, not, spell, args, arr) {
		spell = (not ? '!' : '') + '#' + spell;
		arr.push(
			op ? '(#op' + scope + ' & ' + spell + args + ')' :
			not && scope && spell !== '!#num' ?
				'(#all' + scope + ' & ' +spell + args + ')' :
				spell + scope + args
		);
	},
	_convertOld: function(sList) {
		var nS = [],
			rS = [],
			sS = [],
			rv = '';
		sList.forEach(function(str) {
			if(!str) {
				return;
			}
			var re, scope = '', spell, op = false;
			if(re = str.match(/^#(?:([^\/]+)\/)?(\d+)? /)) {
				scope = re[1] ? '[' + re[1] + (re[2] ? ',' + re[2] : '') + ']' : '';
				str = str.substr(re[0].length);
			}
			if(str.startsWith('#op ')) {
				str = str.substr(4);
				op = true;
			}
			if(str[0] === '#') {
				if(re = str.match(/^#([a-z]+)(?: (.*))?/)) {
					switch(re[1]) {
					case 'sage': this(op, scope, false, 'sage', '', nS); return;
					case 'notxt': this(op, scope, true, 'tlen', '', nS); return;
					case 'noimg': this(op, scope, true, 'img', '', nS); return;
					case 'trip': this(op, scope, false, 'trip', '', nS); return;
					case 'tmax':
						this(op, scope, false, 'tlen', '(' + re[2] + '-20000)', nS);
						return;
					case 'name':
						spell = re[2].split('!!');
						if(spell[1]) {
							this(op, scope, false, 'trip', '(!!' + spell[1] + ')', nS);
						}
						if(spell[0]) {
							spell = spell[0].split('!');
							if(spell[1]) {
								this(op, scope, false, 'trip', '(!' + spell[1] + ')', nS);
							}
							if(spell[0]) {
								this(op, scope, false, 'name', '(' + spell[0].replace(/\)/g, '\\)') + ')', nS);
							}
						}
						return;
					case 'skip': this(op, scope, true, 'num', '(' + re[2] + ')', sS); return;
					case 'rep':
					case 'outrep':
						spell = re[2].match(/(\/.*?[^\\]\/[ig]*)(?: (.*))?/);
						rS.push('#' + re[1] + scope + '(' + spell[1] + ',' + (spell[2] || '')
							.replace(/\)/g, '\\)') + ')')
						return;
					case 'theme': re[1] = 'subj';
					case 'exp':
					case 'exph':
					case 'imgn':
					case 'video': this(op, scope, false, re[1], '(' + re[2] + ')', nS); return;
					case 'vtag': return;
					default:
						this(op, scope, false, re[1], '(' + re[2].replace(/\)/g, '\\)') + ')', nS);
					}
				}
			} else {
				this(op, scope, false, 'words', '(' + str.replace(/\)/g, '\\)') + ')', nS);
			}
		}, this._pushSpell);
		if(Cfg['hideByWipe'] !== 0) {
			rv = [];
			(Cfg['wipeSameLin'] !== 0) && rv.push('samelines');
			(Cfg['wipeSameWrd'] !== 0) && rv.push('samewords');
			(Cfg['wipeLongWrd'] !== 0) && rv.push('longwords');
			(Cfg['wipeSpecial'] === 1) && rv.push('symbols');
			(Cfg['wipeCAPS'] === 1) && rv.push('capslock');
			(Cfg['wipeNumbers'] !== 0) && rv.push('numbers');
			rv = rv.length === 0 ? '' : '#wipe(' + rv.join(',') + ')' + (nS.length !== 0 ? ' |\n' : '');
		}
		delete Cfg['hideByWipe'];
		delete Cfg['wipeSameLin'];
		delete Cfg['wipeSameWrd'];
		delete Cfg['wipeLongWrd'];
		delete Cfg['wipeSpecial'];
		delete Cfg['wipeCAPS'];
		delete Cfg['wipeNumbers'];
		saveComCfg(aib.dm, Cfg);
		return (sS.length !== 0 ? sS.join(' &\n') + ' &\n' : '') +
			rv + nS.join(' |\n') + '\n\n' + rS.join('\n');
	},

	readed: false,
	parseText: function(str) {
		str = String(str).replace(/[\s\n]+$/, '');
		this._TEMP = {};
		var oStr = this._findReps(str),
			data = this._compile(oStr[0]);
		if(data !== false) {
			this._TEMP.gSpells = data;
		} else if(this._error) {
			try {
				$alert(Lng.error[lang] + ' ' + this._error, 'help-err-spell', false);
			} catch(e) {
				GM_log(Lng.error[lang] + ' ' + this._error);
			}
			this._TEMP.list = '';
			return false;
		}
		this._TEMP.list = oStr.join('\n\n').replace(/[\s\n]+$/, '');
		return oStr;
	},
	saveSpells: function(val) {
		this.hash = ELFHash(val);
		this.list = val;
		setStored('DESU_Spells_' + aib.dm, JSON.stringify([1, this.hash, this.list]));
		if(!val) {
			this._disable();
		}
	},
	saveTemp: function() {
		var gSpells = this._TEMP.gSpells,
			lSpells = gSpells ? this._removeBoards(gSpells) : false,
			reps = this._TEMP.reps,
			outreps = this._TEMP.outreps;
		if(reps.length === 0) {
			reps = false;
		}
		if(outreps.length === 0) {
			outreps = false;
		}
		setStored('DESU_CSpells_' + aib.dm, JSON.stringify([this.hash, gSpells, reps, outreps]));
		reps = this._optimizeReps(reps);
		outreps = this._optimizeReps(outreps);
		sessionStorage['de-spells-' + brd + TNum] = JSON.stringify([this.hash, lSpells, reps, outreps]);
		this._init(lSpells, reps, outreps);
		this.saveSpells(this._TEMP.list);
	},
	read: function() {
		var arr, data = getStored('DESU_Spells_' + aib.dm);
		this.readed = true;
		if(data) {
			try {
				arr = JSON.parse(data);
				if(arr.length < 3) {
					this.list = arr[1] ? this._convertOld(arr[1]) : '';
					this.hash = ELFHash(this.list);
				} else {
					this.hash = arr[1];
					this.list = arr[2];
				}
				return this.hash;
			} catch(e) {}
		}
		if(typeof data === 'string') {
			this.list = this._convertOld(data.split('\n'));
		} else {
			this.list = '#wipe(samelines,samewords,longwords,numbers)';
		}
		return this.hash = ELFHash(this.list);
	},
	update: function() {
		if(!this.read()) {
			this._disable();
			return;
		}
		var data, lSpells, reps, outreps, readed = false;
		try {
			data = JSON.parse(sessionStorage['de-spells-' + brd + TNum]);
			if(data && data[0] === this.hash) {
				this._init(data[1], data[2], data[3]);
				return;
			}
		} catch(e) {}
		try {
			data = JSON.parse(getStored('DESU_CSpells_' + aib.dm));
			if(data && data[0] === this.hash) {
				lSpells = data[1] ? this._removeBoards(data[1]) : false;
				reps = this._optimizeReps(data[2]);
				outreps = this._optimizeReps(data[3]);
				this._init(lSpells, reps, outreps);
				sessionStorage['de-spells-' + brd + TNum] = JSON.stringify([this.hash, lSpells, reps, outreps]);
				return;
			}
		} catch(e) {}
		data = this.parseText(this.list);
		this.saveSpells(data ? data.join('\n\n').replace(/\n+$/, '') : '');
		this.saveTemp();
	},
	enable: false,
	check: function(post, hFunc, nhFunc) {
		if(!this.enable) {
			if(post.hide && nhFunc) {
				nhFunc(post);
			}
			return;
		}
		this._continueCheck(post, [[0, this._spells.length, this._spells]], function(pst, msg, async) {
			hFunc(pst, msg);
			if(async) {
				clearTimeout(aSpellTO);
				aSpellTO = setTimeout(savePostsVisib, 500);
			}
		}, nhFunc && function(pst, async) {
			nhFunc(pst);
			if(async) {
				clearTimeout(aSpellTO);
				aSpellTO = setTimeout(savePostsVisib, 500);
			}
		}, false);
	},
	replace: function(txt) {
		for(var i = 0, len = this._reps.length; i < len; i++) {
			txt = txt.replace(this._reps[i][0], this._reps[i][1]);
		}
		return txt;
	},
	outReplace: function(txt) {
		for(var i = 0, len = this._outreps.length; i < len; i++) {
			txt = txt.replace(this._outreps[i][0], this._outreps[i][1]);
		}
		return txt;
	}
};

function hideBySpells(post) {
	spells.check(post, hidePost, unhidePost);
}

function disableSpells() {
	closeAlert($id('de-alert-help-err-spell'));
	if(spells.haveSpells) {
		Posts.forEach(function(post) {
			spells.check(post, unhidePost, false);
		});
	}
}

function toggleSpells() {
	var temp, fld = $id('de-spell-edit'),
		val = fld.value;
	if(val) {
		if(temp = spells.parseText(val)) {
			disableSpells();
			spells.saveTemp();
			fld.value = spells.list;
			if(Cfg['hideBySpell']) {
				Posts.forEach(hideBySpells);
			} else {
				spells.enable = false;
			}
			savePostsVisib();
			return;
		}
	} else {
		disableSpells();
		savePostsVisib();
	}
	spells.saveSpells('');
	$q('input[info="hideBySpell"]', doc).checked = false;
}

function addSpell(spell, arg) {
	var temp, fld = $id('de-spell-edit'),
		val = fld && fld.value,
		chk = $q('input[info="hideBySpell"]', doc);
	if(!val) {
		if(!spells.readed) {
			spells.read();
		}
		val = spells.list;
	}
	if(temp = spells.parseText(val)) {
		spell = spell + (TNum ? '[' + brd + ',' + TNum + ']' : '') + arg;
		val = temp[0].split(new RegExp('(?:^|\\|?[\\s\\n]*)' + regQuote(spell) + '(?: \\|\\n|$)', 'g'));
		if(val.length === 1) {
			temp = spells.parseText(spell + (val[0] ? ' |\n' + val[0] : '') + '\n\n' + temp[1]);
		} else {
			temp = spells.parseText(val.join('') + '\n\n' + temp[1]);
		}
		if(temp) {
			disableSpells();
			spells.saveTemp();
			if(fld) {
				chk.checked = !!(fld.value = spells.list);
			}
			if(spells.list) {
				saveCfg('hideBySpell', 1);
				Posts.forEach(hideBySpells);
			}
			return;
		}
	}
	spells.enable = false;
	if(fld) {
		chk.checked = false;
	}
	saveCfg('hideBySpell', 0);
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
	var p, x = '',
		gif = function(id, src) {
			x += id + ' { background: url(data:image/gif;base64,' + src + ') no-repeat center !important; }';
		},
		cont = function(id, src) {
			x += id + ':before { content: ""; padding: 0 16px 0 0; margin: 0 4px; background: url(' + src + ') no-repeat center; }';
		};

	// Settings window
	x += '.de-block { display: block; }\
		#de-content-cfg > div { float: left; border-radius: 10px 10px 0 0; width: auto; min-width: 0; padding: 0; margin: 5px 20px; overflow: hidden; }\
		#de-cfg-info > div { float: left; }\
		#de-cfg-head { padding: 4px; border-radius: 10px 10px 0 0; color: #fff; text-align: center; font: bold 14px arial; cursor: default; }\
		#de-cfg-head:lang(en), #de-panel:lang(en) { background: linear-gradient(to bottom, #4b90df, #3d77be 5px, #376cb0 7px, #295591 13px, rgba(0,0,0,0) 13px), linear-gradient(to bottom, rgba(0,0,0,0) 12px, #183d77 13px, #1f4485 18px, #264c90 20px, #325f9e 25px); }\
		#de-cfg-head:lang(fr), #de-panel:lang(fr) { background: linear-gradient(to bottom, #7b849b, #616b86 2px, #3a414f 13px, rgba(0,0,0,0) 13px), linear-gradient(to bottom, rgba(0,0,0,0) 12px, #121212 13px, #1f2740 25px); }\
		#de-cfg-head:lang(de), #de-panel:lang(de) { background: #777; }\
		.de-cfg-body { width: 372px; min-height: 348px; padding: 11px 7px 7px; margin-top: -1px; font: 13px sans-serif; }\
		.de-cfg-body input[type="text"] { width: auto; padding: 0px; }\
		.de-cfg-body, #de-cfg-btns { border: 1px solid #183d77; border-top: none; }\
		.de-cfg-body:lang(de), #de-cfg-btns:lang(de) { border-color: #444; }\
		#de-cfg-btns { padding: 7px 2px 2px; }\
		#de-cfg-bar { height: 25px; width: 100%; display: table; background-color: #1f2740; margin: 0; padding: 0; }\
		#de-cfg-bar:lang(en) { background-color: #325f9e; }\
		#de-cfg-bar:lang(de) { background-color: #777; }\
		.de-cfg-depend { padding-left: 25px; }\
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
		.de-cfg-unvis { display: none; }\
		#de-cfg-updresult { padding: 3px 0; font-size: 1.1em; text-align: center; }\
		#de-spell-panel { float: right; }\
		#de-spell-panel > a { padding: 0 4px; }\
		#de-spell-div { display: table; }\
		#de-spell-div > div { display: table-cell; vertical-align: top; }\
		#de-spell-edit { padding: 2px; width: 340px; height: 255px; border: none !important; outline: none !important; }\
		#de-spell-rowmeter { padding: 2px 3px 0 0; margin: 2px 0; overflow: hidden; width: 2em; height: 257px; text-align: right; color: #fff; font: 12px courier new; }\
		#de-spell-rowmeter:lang(en), #de-spell-rowmeter:lang(fr) { background-color: #616b86; }\
		#de-spell-rowmeter:lang(de) { background-color: #777; }';

	// Main panel
	x += '#de-btn-logo { margin-right: 3px; cursor: pointer; }\
		#de-panel { height: 25px; z-index: 9999; border-radius: 15px 0 0 0; cursor: default;}\
		#de-panel-btns { padding: 0 0 0 2px; margin: 0; height: 25px; border-left: 1px solid #8fbbed; }\
		#de-panel-btns:lang(de), #de-panel-info:lang(de) { border-color: #ccc; }\
		#de-panel-btns:lang(fr), #de-panel-info:lang(fr) { border-color: #616b86; }\
		#de-panel-btns > li { margin: 0 1px; padding: 0; }\
		#de-panel-btns > li, #de-panel-btns > li > a, #de-btn-logo { display: inline-block; width: 25px; height: 25px; }\
		#de-panel-btns:lang(en) > li, #de-panel-btns:lang(fr) > li  { transition: all 0.3s ease; }\
		#de-panel-btns:lang(en) > li:hover, #de-panel-btns:lang(fr) > li:hover { background-color: rgba(255,255,255,.15); box-shadow: 0 0 3px rgba(143,187,237,.5); }\
		#de-panel-btns:lang(de) > li > a { border-radius: 5px; }\
		#de-panel-btns:lang(de) > li > a:hover { width: 21px; height: 21px; border: 2px solid #444; }\
		#de-panel-info { display: inline-block; vertical-align: top; padding: 0 6px; margin: 0 0 0 2px; height: 25px; border-left: 1px solid #8fbbed; color: #fff; font: 18px serif; }';
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
	if(aib.nul || aib.fch) {
		gif('#de-btn-catalog', p + 'I2jI+pa+DhAHyRNYpltbz7j1Rixo0aCaaJOZ2SxbIwKTMxqub6zuu32wP9WsHPcFMs0XDJ5qEAADs=');
	}
	gif('#de-btn-audio-off', p + 'I7jI+pq+DO1psvQHOj3rxTik1dCIzmSZqfmGXIWlkiB6L2jedhPqOfCitVYolgKcUwyoQuSe3WwzV1kQIAOw==');
	gif('#de-btn-audio-on', p + 'JHjI+pq+AewJHs2WdoZLz7X11WRkEgNoHqimadOG7uAqOm+Y6atvb+D0TgfjHS6RIp8YQ1pbHRfA4n0eSTI7JqP8Wtahr0FAAAOw==');
	p = 'Dw8P///wAAACH5BAEAAAIALAAAAAAZABkAQAJElI+pe2EBoxOTNYmr3bz7OwHiCDzQh6bq06QSCUhcZMCmNrfrzvf+XsF1MpjhCSainBg0AbKkFCJko6g0MSGyftwuowAAOw==';
	gif('#de-btn-upd-on', 'R0lGODlhGQAZAJEAADL/Mv' + p);
	gif('#de-btn-upd-off', 'R0lGODlhGQAZAJEAAP8yMv' + p);
	gif('#de-btn-upd-warn', 'R0lGODlhGQAZAJEAAP/0Qf' + p);

	// Post panel
	x += '.de-ppanel { margin-left: 4px; }\
		.de-post-note { color: inherit; font: italic bold 12px serif; }\
		.de-ppanel > span, .de-btn-src, .de-btn-expthr, .de-btn-sage { display: inline-block; margin: 0 4px -2px 0 !important; cursor: pointer; ';
	if(!Cfg['postBtnsTxt']) {
		x += 'padding: 0 14px 14px 0; }';
		gif('.de-btn-hide-user','R0lGODlhDgAOAKIAAL//v6CgoICAgEtLS////wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA4AQAM8SLLcS2MNQGsUMYi6uB5BKI5hFgojel5YBbDDNcmvpJLkcgLq1jcuSgPmgkUmlJgFAyqNmoEBJEatxggJADs=');
		gif('.de-post-hid .de-btn-hide-user','R0lGODlhDgAOAKIAAP+/v6CgoICAgEtLS////wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA4AQAM5SLLcS2ONCcCMIoYdRBVcN4Qkp4ULmWVV20ZTM1SYBJbqvXmA3jk8IMzlgtVYFtkoNCENIJdolJAAADs=');
		p = 'R0lGODlhDgAOAKIAAPDw8KCgoICAgEtLS////wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA4AQAM';
		gif('.de-btn-hide', p + '8SLLcS2MNQGsUMYi6uB5BKI5hFgojel5YBbDDNcmvpJLkcgLq1jcuSgPmgkUmlJgFAyqNmoEBJEatxggJADs=');
		gif('.de-post-hid .de-btn-hide', p + '5SLLcS2ONCcCMIoYdRBVcN4Qkp4ULmWVV20ZTM1SYBJbqvXmA3jk8IMzlgtVYFtkoNCENIJdolJAAADs=');
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
			.de-btn-hide-user:after { content: "[×]"; }\
			.de-post-hid .de-btn-hide-user:after { content: "[+]"; }\
			.de-btn-rep:after { content: "R"; }\
			.de-btn-expthr:after { content: "E"; }\
			.de-btn-fav:after { content: "F"; }\
			.de-btn-fav-sel:after { content: "[F]"; }\
			.de-btn-sage:after { content: "Sage!"; }\
			.de-btn-src:after { content: "[Sauce]"; }';
	}

	// Search images buttons
	cont('.de-src-google', 'http://google.com/favicon.ico');
	cont('.de-src-tineye', 'http://tineye.com/favicon.ico');
	cont('.de-src-iqdb', 'http://iqdb.org/favicon.ico');
	cont('.de-src-saucenao', 'http://saucenao.com/favicon.ico');

	// Posts counter
	x += '.de-ppanel-cnt:after { counter-increment: de-cnt 1; content: counter(de-cnt); vertical-align: 1px; color: #4f7942; font: bold 11px tahoma; cursor: default; }\
		.de-ppanel-del:after { content: "' + Lng.deleted[lang] + '"; color: #727579; font: bold 11px tahoma; cursor: default; }';

	// Text format buttons
	x += '#de-txt-panel { display: block; height: 23px; font-weight: bold; cursor: pointer; }\
		#de-txt-panel > span:empty { display: inline-block; width: 27px; height: 23px; }\
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
			@keyframes de-panel-open { from { transform: translateX(92%); } to { transform: translateX(0); } }\
			@keyframes de-panel-close { to { transform: translateX(92%); } }\
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
			.de-cfg-close { animation: de-cfg-close .2s ease-in both; }\
			.de-panel-open { animation: de-panel-open .2s ease-out backwards; }\
			.de-panel-close { animation: de-panel-close .2s ease-in both; }';
	}

	// Embedders
	cont('.de-ytube-link', 'https://youtube.com/favicon.ico');
	cont('.de-img-arch', 'data:image/gif;base64,R0lGODlhEAAQALMAAF82SsxdwQMEP6+zzRA872NmZQesBylPHYBBHP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAQARTMMlJaxqjiL2L51sGjCOCkGiBGWyLtC0KmPIoqUOg78i+ZwOCUOgpDIW3g3KJWC4t0ElBRqtdMr6AKRsA1qYy3JGgMR4xGpAAoRYkVDDWKx6NRgAAOw==');
	cont('.de-img-audio', 'data:image/gif;base64,R0lGODlhEAAQAKIAAGya4wFLukKG4oq3802i7Bqy9P///wAAACH5BAEAAAYALAAAAAAQABAAQANBaLrcHsMN4QQYhE01OoCcQIyOYQGooKpV1GwNuAwAa9RkqTPpWqGj0YTSELg0RIYM+TjOkgba0sOaAEbGBW7HTQAAOw==');
	x += '.de-img-arch, .de-img-audio { color: inherit; text-decoration: none; font-weight: bold; }\
		.de-img-pre, .de-img-full { display: block; margin: ' + (aib.krau ? 0 : '2px 10px') + '; border: none; outline: none; cursor: pointer; }\
		.de-img-full { float: left; }\
		.de-img-center { position: fixed; z-index: 9999; background-color: #ccc; border: 1px solid black; }\
		.de-mp3, .de-ytube-obj { margin: 5px 20px; }\
		td > a + .de-ytube-obj { display: inline-block; }\
		video { background: black; }';

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
		.de-editor { display: block; font: 12px courier new; width: 619px; height: 337px; }\
		.de-entry { margin: 2px 0; ' + (nav.Opera ? 'white-space: nowrap; ' : '') + '}\
		.de-entry > :first-child { float: none !important; }\
		.de-entry > div > a { text-decoration: none; }\
		.de-fav-inf-posts, .de-fav-inf-page { float: right; margin-right: 5px; font: bold 16px serif; }\
		.de-fav-inf-old { color: #4f7942; }\
		.de-fav-inf-new { color: blue; }\
		.de-fav-title { margin-right: 15px; }\
		#de-menu { padding: 0 !important; margin: 0 !important; width: auto; min-width: 0; z-index: 9999; border: 1px solid grey;}\
		#de-menu span, #de-menu a { display: block; padding: 3px 10px; color: inherit; text-decoration: none; font: 13px arial; white-space: nowrap; cursor: pointer; }\
		#de-menu span:hover, #de-menu a:hover { background-color: #222; color: #fff; }\
		.de-omitted { color: grey; font-style: italic; }\
		.de-omitted:before { content: "' + Lng.postsOmitted[lang] + '"; }\
		.de-expand:before { content: "' + Lng.collapseThrd[lang] + '"; }\
		#de-parea { text-align: center;}\
		.de-ref-hid { text-decoration: line-through !important; }\
		.de-refmap { margin: 10px 4px 4px 4px; font-size: 70%; font-style: italic; }\
		.de-refmap:before { content: "' + Lng.replies[lang] + ' "; }\
		.de-refmap > a { text-decoration: none; }\
		#de-sagebtn { margin-right: 7px; cursor: pointer; }\
		.de-selected { ' + (nav.Opera ? 'border-left: 4px solid red; border-right: 4px solid red; }' : 'box-shadow: 6px 0 2px -2px red, -6px 0 2px -2px red; }') + '\
		#de-txt-resizer { display: inline-block !important; float: none !important; padding: 6px; margin: -2px -12px; vertical-align: bottom; border-bottom: 2px solid #555; border-right: 2px solid #444; cursor: se-resize; }\
		.de-viewed { color: #888 !important; }\
		.de-pview { position: absolute; width: auto; min-width: 0; z-index: 9999; border: 1px solid grey; margin: 0 !important; display: block !important; }\
		.de-pview-info { padding: 3px 6px !important; }\
		.de-pview-link { font-weight: bold; }\
		.de-hidden' + (aib._4chon ? ', .de-hidden + br' : '') + ', small[id^="rfmap"], div[id^="preview"], div[id^="pstprev"], body > hr, .theader, .postarea { display: none !important; }';
	if(aib.kus) {
		x += '#newposts_get, .extrabtns, .ui-resizable-handle, .replymode, blockquote + a { display: none !important; }\
			.ui-wrapper { display: inline-block; width: auto !important; height: auto !important; padding: 0 !important; }';
	} else if(aib.mlpg) {
		x += '#de-pform > div, .mentioned, form > div[style="text-align: center;"], form > div[style="text-align: center;"] + hr { display: none !important; }';
	}
	if(aib.krau) {
		x += '.de-post-hid > div:not(.postheader), img[id^="translate_button"], img[src$="button-expand.gif"], img[src$="button-close.gif"], body > center > hr, h2, form > div:first-of-type > hr { display: none !important; }\
			div[id^="Wz"] { z-index: 10000 !important; }\
			.de-thr-hid { margin-bottom: ' + (!TNum ? '7' : '2') + 'px; float: none !important; }\
			.file_reply + .de-ytube-obj, .file_thread + .de-ytube-obj { margin: 5px 20px 5px 5px; float: left; }\
			.de-ytube-obj + div { clear: left; }';
	} else if(aib.fch) {
		x += '.de-post-hid > .file, .de-post-hid > blockquote, .de-post-hid > .de-ytube-obj, #mpostform, .navLinks, .postingMode { display: none !important; }';
	} else if(aib.tiny) {
		x += 'form, form table { margin: 0; }\
			.de-post-hid > .intro ~ *, .post-hover, div.banner { display: none !important; }';
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
			x += '#postform nobr, .replieslist, #captcha_status, .postnode + a, .postblock + td > small, .content-background > hr, span[style="float: right;"] { display: none !important; }\
				.ui-wrapper { position: static !important; margin: 0 !important; overflow: visible !important; }\
				.ui-resizable { display: inline !important; }\
				form textarea { resize: both !important; }';
		} else if(aib.hana) {
			x += '#hideinfotd, .reply_, .delete > img, .popup, .search_google, .search_iqdb { display: none; }\
				.delete { background: none; }\
				.delete_checkbox { position: static !important; }\
				.file + .de-ytube-obj { float: left; margin: 5px 20px 5px 5px; }\
				.de-ytube-obj + div { clear: left; }';
		} else if(aib._7ch) {
			x += '.reply { background-color: ' + $getStyle(doc.body, 'background-color') + '; }';
		} else if(aib.futa) {
			x += 'span { font-size: inherit; }\
				.de-content, .de-cfg-body { font-family: arial; }\
				.ftbl { width: auto; margin: 0; }\
				.reply { background: #f0e0d6; }';
		} else if(aib.brit) {
			x += '.de-ppanel { float: left; margin-top: 0.45em; }\
				a + .threadlinktext { position: relative; top: 17px; }\
				.postthreadlinks, .pagethreadlinks, .pwpostblock { display: none; }\
				.de-btn-src { padding: 0px 10px 10px 0px !important; background-size: cover !important; }';
		} else if(aib.tinyIb) {
			x += 'br.clear { display: none !important; }';
		} else if(aib.pony) {
			x += '#bodywrap3 > hr, .blotter { display: none !important; }';
		} else if(aib.tire) {
			x += 'span[id$="_display"] { display: none; }';
		}
	}

	if(nav.Firefox < 16) {
		x = x.replace(/(transition|keyframes|transform|animation|linear-gradient)/g, nav.cssFix + '$1');
		if(!nav.Opera) {
			x = x.replace(/\(to bottom/g, '(top').replace(/\(to top/g, '(bottom');
		}
	}

	$attr($css(x), {'id': 'de-css'});
	$attr($css(''), {'id': 'de-css-dynamic'});
	$attr($css(''), {'id': 'de-css-user'});
	x = gif = cont = null;
	updateCSS();
}

function updateCSS() {
	var x;
	if(Cfg['attachPanel']) {
		x = '.de-content { position: fixed; right: 0; bottom: 25px; z-index: 9999; max-height: 95%; overflow-x: visible; overflow-y: auto; }\
		#de-panel { position: fixed; right: 0; bottom: 0; }'
	} else {
		x = '.de-content { clear: both; float: left; }\
		#de-panel { float: right; clear: both; }'
	}
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
	if(Cfg['maskImgs']) {
		x+= '.de-img-pre, .de-ytube-obj, img[src*="spoiler"], img[src*="thumb"], img[src^="blob"] { opacity: 0.07 !important; }\
			.de-img-pre:hover, .de-ytube-obj:hover, img[src*="spoiler"]:hover, img[src*="thumb"]:hover, img[src^="blob"]:hover { opacity: 1 !important; }';
	}
	if(Cfg['delHiddPost']) {
		x += '.de-thr-hid, .de-thr-hid + div + br, .de-thr-hid + div + br + hr { display: none; }';
	}
	if(Cfg['noPostNames']) {
		x += '.' + aib.cName + ', .' + aib.cTrip + ' { display: none; }';
	}
	if(Cfg['noSpoilers']) {
		x += '.spoiler' + (aib.fch ? ', s' : '') + ' { background: #888 !important; color: #ccc !important; }';
	}
	if(Cfg['noPostScrl']) {
		x += 'blockquote, blockquote > p, .code_part { max-height: 100% !important; overflow: visible !important; }';
	}
	if(Cfg['noBoardRule']) {
		x += (aib.futa ? '.chui' : '.rules, #rules, #rules_row') + ' { display: none; }';
	}
	if(aib.abu) {
		if(Cfg['openImgs']) {
			x += '.reply .img { max-width: 200px; max-height: 200px; }\
				.oppost .img { max-width: 250px; max-height: 250px }';
		}
		if(Cfg['addYouTube']) {
			x += 'div[id^="post_video"] { display: none !important; }';
		}
	}
	$id('de-css-dynamic').textContent = x;
	$id('de-css-user').textContent = Cfg['userCSS'] ? Cfg['userCSSTxt'] : '';
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
		default: temp = day * 30;
		}
		if(Date.now() - +comCfg['lastUpd'] < temp) {
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
					cVer = version.split('.'),
					len = cVer.length > dVer.length ? cVer.length : dVer.length,
					i = 0,
					isUpd = false;
				if(!dVer) {
					if(isForce) {
						Fn('<div style="color: red; font-weigth: bold;">' + Lng.noConnect[lang] + '</div>');
					}
					return;
				}
				saveComCfg('lastUpd', Date.now());
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

function Initialization() {
	if(/^(?:about|chrome|opera|res)/i.test(window.location)) {
		return false;
	}
	if(!(window.localStorage && typeof localStorage === 'object' && window.sessionStorage)) {
		GM_log('WEBSTORAGE ERROR: please, enable webstorage!');
		return false;
	}

	// Imageboard properties
	var intrv, ua, url;
	switch(aib.dm = window.location.hostname.match(
		/(?:(?:[^.]+\.)(?=org\.|net\.|com\.))?[^.]+\.[^.]+$|^\d+\.\d+\.\d+\.\d+$|localhost/
	)[0]) {
	case '4chan.org': aib.fch = true; break;
	case 'krautchan.net': aib.krau = true; break;
	case 'britfa.gs': aib.brit = true; break;
	case '420chan.org': aib._420 = true; break;
	default:
		aib.hana = !!$q('script[src*="hanabira"]', doc);
		aib.futa = !!$q('form[action*="futaba.php"]', doc);
		aib.tiny = !!$q('form[name*="postcontrols"]', doc);
		aib.kus = !!$q('script[src*="kusaba"]', doc);
	}
	if(aib.hana && window.location.pathname === '/settings') {
		$event($q('input[type="button"]', doc), {'click': function() {
			setCookie('de-rating', $id('rating').value, 1e12);
		}});
		return false;
	}
	aib.qDForm =
		aib.brit ? '.threadz' :
		aib.hana || aib.krau ? 'form[action*="delete"]' :
		aib.tiny ? 'form[name="postcontrols"]' :
		aib.futa ? 'form:not([enctype])' :
		'#delform, form[name="delform"]';
	aib.qError =
		aib.hana ? '.post-error, h2' :
		aib.kus ? 'h1, h2, div[style*="1.25em"]' :
		aib.fch ? '#errmsg' :
		aib.krau ? '.message_text' :
		aib._420 ? 'pre' :
		'h1, h2, font[size="5"]';
	aib.getTNum =
		aib.fch || aib.krau || aib.futa || aib.tiny ? function(op) {
			return $q('input[type="checkbox"]', op).name.match(/\d+/)[0];
		} : aib.hana || aib.brit ? function(op) {
			return $q('a[name]', op).name.match(/\d+/)[0];
		} : aib._420 ?  function(op) {
			return $q('a[id]', op).id.match(/\d+/)[0];
		} : function(op) {
			return $q('input[type="checkbox"]', op).value;
		};
	if(dForm = $q(aib.qDForm, doc)) {
		aib.host = window.location.hostname;
		aib.prot = window.location.protocol;
		switch(aib.dm) {
		case '0chan.hk': aib.nul = aib.kus = true; break;
		case '2--ch.ru': aib.tire = true; break;
		case '410chan.org': aib._410 = true; break;
		case 'hiddenchan.i2p': aib.hid = true; break;
		case 'dfwk.ru': aib.dfwk = true; break;
		case '7chan.org': aib._7ch = true; break;
		case 'ponychan.net': aib.pony = true; break;
		case 'mlpg.co': aib.mlpg = true; break;
		case 'ernstchan.com':
		case 'ernstchan.net': aib.erns = true; break;
		default:
			aib.abu = !!$id('ABU_css');
			aib.tinyIb = !!$q('form[action*="imgboard.php?delete"]', doc);
		}
		aib._4chon = aib.tiny && !aib.mlpg;
		aib.ru = aib.hana || aib.nul || aib.tinyIb || aib.tire || aib.dm === '02ch.net';
		aib.cReply =
			aib.krau ? 'postreply' :
			aib.tiny || aib.fch ? 'post reply' :
			'reply';
		aib.cOPost =
			aib.fch || aib.mlpg || aib.pony ? 'op' :
			aib.kus ? 'postnode' :
			'oppost';
		aib.qThread =
			aib.krau ? '.thread_body' :
			aib._420 ? '[id*="thread"]' :
			!aib.erns && $q('.thread', doc) ? '.thread' :
			$q('div[id*="_info"][style*="float"]', doc) ? 'div[id^="t"]:not([style])' :
			'[id^="thread"]' + (aib._7ch ? ':not(#thread_controls)' : '');
		aib.cName = aib.tiny || aib.fch ? 'name' : 'postername';
		aib.cTrip = aib.tiny ? 'trip' : 'postertrip';
		aib.cSubj =
			aib.krau ? 'postsubject' :
			aib.tiny || aib.fch ? 'subject' :
			aib.hana ? 'replytitle' :
			'filetitle';
		aib.qRef =
			aib.fch ? '.postInfo > .postNum' :
			aib.tiny ? '.intro > .post_no + a' :
			aib.krau ? '.postnumber' :
			aib.futa ? '.del, font[color="#117743"]' :
			'.reflink';
		aib.cFileInfo =
			aib.fch ? 'fileText' :
			aib.krau || aib.tiny || aib.hana || aib.brit ? 'fileinfo' :
			'filesize';
		aib.qImgLink = aib.brit ? '.fileinfo' : aib.krau ? '.filename > a' : (
			(aib.futa ? '' : '.' + aib.cFileInfo) + ' a[href$=".jpg"]:nth-of-type(1), ' +
			(aib.futa ? '' : '.' + aib.cFileInfo) + ' a[href$=".png"]:nth-of-type(1), ' +
			(aib.futa ? '' : '.' + aib.cFileInfo) + ' a[href$=".gif"]:nth-of-type(1)'
		);
		aib.qMsg =
			aib.hana ? '.postbody' :
			aib.tiny ? '.body' :
			aib._7ch ? '.message' :
			'blockquote';
		aib.qTrunc =
			aib.krau ? 'p[id^="post_truncated"]' :
			aib.hana ? '.abbrev > span:nth-last-child(2)' :
			aib.tiny ? '.toolong' :
			'.abbrev, .abbr, .shortened';
		aib.qOmitted =
			aib.tiny ? '.omitted' :
			aib.futa ? 'font[color="#707070"]' :
			aib.krau ? '.omittedinfo' :
			aib.hana ? '.abbrev > span:last-child' :
			aib.fch ? '.summary.desktop' :
			'.omittedposts';
		aib.qBan =
			aib.krau ? '.ban_mark' :
			aib.fch ? 'strong[style="color: red;"]' :
			aib._420 ? '.ban' :
			false;
		aib.qPostForm =
			aib.futa ? 'form:nth-of-type(1)' :
			aib.fch || aib.tiny ? 'form[name="post"]' :
			'#postform';
		aib.qDelBut = (aib.fch ? '.deleteform.desktop > ' : '') + 'input[type="submit"]';
		aib.res =
			aib.krau ? 'thread-' :
			aib.erns ? 'faden/' :
			'res/';
		aib.reCrossLinks = new RegExp(
			'>https?:\\/\\/[^\\/]*' + aib.dm +
			'\\/([a-z0-9]+)\\/' + regQuote(aib.res) + '(\\d+)(?:[^#<]+)?(?:#i?(\\d+))?<', 'g'
		);
		aib.isTrunc = function(post) {
			var el = $q(aib.qTrunc, post);
			if(el && /long|full comment|gekürzt|слишком|длинн|мног|полная версия/i.test(el.textContent)) {
				return el;
			}
			return null;
		};
		aib.getThrdUrl = function(b, tNum) {
			return aib.prot + '//' + aib.host + fixBrd(b) + (
				aib.futa ? ('futaba.php?res=' + tNum) :
				(aib.res + tNum + (aib.tire ? '.html' : docExt))
			);
		}
		aib.getPageUrl = function(b, p) {
			if(aib.tiny && p > 0) {
				p++;
			}
			return fixBrd(b) + (
				p > 0 ? (aib.erns ? 'wakaba.pl?task=show&page=' + p : p + docExt) :
				aib.futa ? 'futaba.htm' :
				aib.hana ? 'index.xhtml' : ''
			);
		};
		aib.getPicWrap =
			aib.hana ? function(el) {
				if(!el.previousElementSibling) {
					el = el.parentNode;
				}
				return el.parentNode;
			} : aib.krau ? function(el) {
				return el.parentNode;
			} : getPost;
		aib.getPosts =
			aib.futa ? function(thr) {
				return $Q('td:nth-child(2)', thr);
			} : aib.tiny || aib.fch ? function(thr) {
				return $C('reply', thr);
			} : function(thr) {
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
			} : function(thr, dc) {
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
				if(thr.hasChildNodes()) {
					$before(thr.firstChild, op);
				} else {
					thr.appendChild(op);
				}
				return op;
			};
		aib.getPNum =
			aib.futa ? function(post) {
				return $t('input', post).name;
			} : function(post) {
				return post.id.match(/\d+/)[0];
			};
		aib.getSage =
			aib.fch ? function(post) {
				return !!$q('.id_Heaven, .useremail[href^="mailto:sage"]', post);
			} : aib.krau ? function(post) {
				return !!$c('sage', post);
			} : aib._410 ? function(post) {
				return !!$x('.//span[@class="filetitle" and contains(text(),"' + unescape('%u21E9') + '")]', post);
			} : aib.nul ? function(post) {
				return !!$q('a[href="mailto:sage"], a[href^="http://www.cloudflare.com"]', post);
			} : function(post) {
				var a = $q('a[href^="mailto:"], a[href="sage"]', post);
				return a && /sage/i.test(a.href);
			};
	}

	// Check for frames loading
	switch(window.name) {
	case '': break;
	case 'de-iframe-pform':
	case 'de-iframe-dform':
		$script((
			'window.top.postMessage("A' + window.name + '$#$' +
			getSubmitResponse(doc, true).join('$#$') + '", "*");'
		).replace(/\n|\r/g, '\\n'));
		return false;
	case 'de-iframe-fav':
		intrv = setInterval(function() {
			$del($id('de-fav-script'));
			$attr($script('window.top.postMessage("B' + (doc.body.offsetHeight + 5) + '", "*");'), {
				'id': 'de-fav-script'
			});
		}, 1500);
		$event(window, {'load': setTimeout.bind(window, clearInterval, 3e4, intrv)});
		liteMode = true;
		pr = {};
	}
	if(!dForm || $id('de-panel')) {
		return false;
	}

	// Browser features
	ua = window.navigator.userAgent;
	if(!String.prototype.contains) {
		String.prototype.contains = function(s) {
			return this.indexOf(s) !== -1;
		};
		String.prototype.startsWith = function(s) {
			return this.indexOf(s) === 0;
		};
	}
	nav = {
		Firefox: +(ua.match(/mozilla.*? rv:(\d+)/i) || [,0])[1],
		Opera: window.opera ? +window.opera.version() : 0,
		WebKit: ua.contains('WebKit/')
	};
	nav.Chrome = nav.WebKit && ua.contains('Chrome/');
	nav.Safari = nav.WebKit && !nav.Chrome;
	nav.isGM = (nav.Firefox || nav.Safari) && typeof GM_setValue === 'function';
	nav.isGlobal = nav.isGM || !!scriptStorage;
	nav.cssFix =
		nav.WebKit ? '-webkit-' :
		nav.Opera ? (nav.Opera < 12.1 ? '-o-' : '') :
		nav.Firefox && nav.Firefox < 16 ? '-moz-' : '';
	if(!nav.Opera || nav.Opera >= 12) {
		nav.Anim = true;
		nav.animName =
			nav.WebKit ? 'webkitAnimationName' :
			nav.Opera && nav.Opera < 12.1 ? 'OAnimationName' :
			nav.Firefox && nav.Firefox < 16 ? 'MozAnimationName' :
			'animationName';
		nav.animEnd =
			nav.WebKit ? 'webkitAnimationEnd' :
			nav.Opera && nav.Opera < 12.1 ? 'oAnimationEnd' :
			'animationend';
		nav.animEvent = function(el, Fn) {
			el.addEventListener(nav.animEnd, function aEvent() {
				this.removeEventListener(nav.animEnd, aEvent, false);
				Fn(this);
				Fn = null;
			}, false);
		}
	}
	nav.isBlob = nav.Firefox > 14 || nav.Chrome || nav.Opera >= 12.10;
	nav.isWorker = nav.Firefox > 17 || nav.Chrome;
	if(nav.Firefox > 17) {
		$script(
			'window["de-worker"] = function(url) {\
				this.wrk = new Worker(url);\
			};\
			window["de-worker-proto"] = window["de-worker"].prototype = {\
				set onmessage(Fn) {\
					this.wrk.onmessage = Fn;\
				},\
				set onerror(Fn) {\
					this.wrk.onerror = Fn;\
				},\
				_postMessage: function() {\
					this.wrk.postMessage.apply(this.wrk, arguments);\
				}\
			};'
		);
	}
	nav.forEach =
		nav.Opera ? function(obj, Fn) {
			for(var i in obj) {
				if(obj.hasOwnProperty(i)) {
					Fn.call(obj, i);
				}
			}
		} : function(obj, Fn) {
			Object.keys(obj).forEach(Fn, obj);
		}; 
	nav.fixLink =
		nav.Safari ? function(url) {
			return url[1] === '/' ? aib.prot + url :
				url[0] === '/' ? aib.prot + '//' + aib.host + url :
				url;
		} : function(url) {
			return url;
		};
	nav.toDOM =
		nav.Firefox >= 12 ? function(html) {
			return new DOMParser().parseFromString(html, 'text/html');
		} : function(html) {
			var myDoc = doc.implementation.createHTMLDocument('');
			myDoc.documentElement.innerHTML = html;
			return myDoc;
		};
	nav.matchesSelector = Function.prototype.call.bind((function(dE) {
		return dE.matchesSelector || dE.mozMatchesSelector || dE.webkitMatchesSelector || dE.oMatchesSelector;
	})(doc.documentElement));
	uWindow =
		nav.Opera ? window :
		nav.Firefox ? unsafeWindow :
		(function() {
			var el = doc.createElement('p');
			el.setAttribute('onclick', 'return window;');
			return el.onclick();
		})();
	if(aib.hid) {
		window.setTimeout = function(Fn, num) {
			var ev = document.createEvent('HTMLEvents'),
				args = arguments;
			if(typeof Fn === 'function') {
				window.document.body.addEventListener('timeoutEvent', function() {
					Fn.apply(null, aProto.slice.call(args, 2));
					Fn = args = null;
				}, false);
				ev.initEvent('timeoutEvent', true, false);
				window.document.body.dispatchEvent(ev);
			}
			return 1;
		};
	}
	if(!window.GM_log) {
		window.GM_log = function(msg) {
			console.error(msg);
		};
	}
	if(!window.GM_xmlhttpRequest) {
		window.GM_xmlhttpRequest = $xhr;
	}
	if(nav.WebKit) {
		window.URL = window.webkitURL;
	}
	nav.Worker = nav.Firefox ? (
		nav.Firefox < 18 ? null : (function(w) {
			w.prototype.postMessage = function() {
				uWindow['de-worker-proto']._postMessage.apply(this, arguments);
			};
			return w;
		})(new Proxy(uWindow['de-worker'], {}))) : window.Worker;

	// Page properties
	url = (window.location.pathname || '').match(new RegExp(
		'^(?:\\/?([^\\.]*?)\\/?)?' +
		'(' + regQuote(aib.res) + ')?' +
		'(\\d+|index|wakaba|futaba)?' +
		'(\\.(?:[a-z]+))?$'
	));
	brd = url[1] || (aib.dfwk ? 'df' : '');
	TNum =
		url[2] ? url[3] :
		aib.futa ? +(window.location.search.match(/\d+/) || [false])[0] :
		false;
	pageNum = url[3] && !TNum ? +(
		aib.erns ? +(window.location.search.match(/\d+/) || [0])[0] : url[3]
	) || 0 : 0;
	if(aib.tiny && pageNum > 0) {
		pageNum--;
	}
	docExt = (
		aib.fch || aib.erns ? '' :
		aib.futa ? '.htm' :
		aib._420 ? '.php' :
		url[4] || '.html'
	);
	Favico.href = ($q('head link[rel="shortcut icon"]', doc) || {}).href;
	dummy = doc.createElement('div');
	return true;
}

function getPostform(form) {
	if(!form || aib.abu && $c('locked', form)) {
		return {};
	}
	var tr = aib._7ch ? 'li' : 'tr',
		p = './/' + tr + '[not(contains(@style,"none"))]//input[not(@type="hidden") and ',
		recap = $q('#recaptcha_response_field', form);
	return {
		isQuick: false,
		qButton: !aib.tiny || !!TNum,
		tNum: TNum,
		form: form,
		recap: recap,
		cap: $q('input[name*="aptcha"]:not([name="recaptcha_challenge_field"])', form) || recap,
		txta: $q(tr + ':not([style*="none"]) textarea:not([style*="display:none"])', form),
		subm: $q(tr + ' input[type="submit"]', form),
		file: $q(tr + ' input[type="file"]', form),
		passw: $q(tr + ' input[type="password"]', form),
		dpass: $q('input[type="password"], input[name="password"]', dForm),
		gothr: $x('.//tr[@id="trgetback"]|.//input[@type="radio" or @name="gotothread"]/ancestor::tr[1]', form),
		name: $x(p + '(@name="field1" or @name="name" or @name="internal_n" or @name="nya1" or @name="akane")]', form),
		mail: $x(p + (
			aib._410 ? '@name="sage"]' :
			'(@name="field2" or @name="em" or @name="sage" or @name="email" or @name="nabiki" or @name="dont_bump")]'
		), form),
		subj: $x(p + '(@name="field3" or @name="sub" or @name="subject" or @name="internal_s" or @name="nya3" or @name="kasumi")]', form),
		video: $q(tr + ' input[name="video"], ' + tr + ' input[name="embed"]', form),
		getTR: aib._7ch ? function(el) {
			return $x('ancestor::li[1]', el);
		} : function(el) {
			return $x('ancestor::tr[1]', el);
		}
	};
}

function processPost(post, pNum, thr, i) {
	post.thr = thr;
	post.count = i;
	post.msg = $q(aib.qMsg, post);
	post.img = getPostImages(post);
	post.sage = aib.getSage(post);
	post.setAttribute('de-post', '');
	pByNum[post.num = pNum] = post;
}

function parseDelform(el, dc, Fn) {
	var thrds = $Q(aib.qThread, el);
	if(Posts.length < 2) {
		aib.qTable =
			aib.fch || aib.mlpg ? '.replyContainer' :
			aib.brit ? 'div[id^="replies"] > table' :
			aib.tire ? 'table:not(.postfiles)' :
			aib.futa || $q('td.' + aib.cReply, el) ? 'form > table, div > table' :
			false;
		aib.getWrap =
			aib.fch || aib.mlpg ? function(post) {
				return post.parentNode;
			} : aib.qTable ? function(post) {
				return post.isOp ? post : $x('ancestor::table[1]', post);
			} : function(post) {
				return post;
			};
		if(aib.qTable) {
			if(postWrapper = $q(aib.qTable, el)) {
				postWrapper = dc === doc ? postWrapper.cloneNode(true) :
					doc.importNode(postWrapper, true);
			}
		}
	}
	if(thrds.length === 0) {
		aProto.slice.call($t('hr', el).parentNode.childNodes).reduce(function(prevVal, curVal, i, array) {
			if(array[i + 1]) {
				if(curVal.tagName === 'HR') {
					$before(curVal, prevVal.lastChild);
					$before(curVal, prevVal);
					$after(prevVal, prevVal.lastChild);
					this(prevVal);
					return dc.createElement('div');
				}
				prevVal.appendChild(curVal);
				return prevVal;
			}
			$after(curVal, prevVal);
			prevVal.appendChild(curVal);
		}.bind(Fn), dc.createElement('div'));
	} else {
		$each(thrds, Fn);
	}
}

function tryToParse(node) {
	try {
		$each($T('script', node), $del);
		parseDelform(node, doc, function(thr) {
			if(aib._420 || aib.tiny) {
				$after(thr, thr.lastChild);
				$del($c('clear', thr));
			}
			var i, el, omt, op = aib.getOp(thr, doc),
				els = aProto.slice.call(aib.getPosts(thr));
			processPost(op, thr.num = aib.getTNum(op), thr, 0);
			op.isOp = true;
			op.tTitle = ($c(aib.cSubj, op) || {}).textContent ||
				getText(op).substring(0, 70).replace(/\s+/g, ' ');
			op.count = 0;
			omt = TNum ? 1 : (thr.omitted = (el = $q(aib.qOmitted, thr)) && (el = el.textContent) ?
				+(el.match(/\d+/) || [0])[0] - (aib.tire ? els.length + 1 : 0) : 0) + 1;
			for(i = 0; el = els[i]; i++) {
				processPost(el, aib.getPNum(el), thr, i + omt);
			}
			Posts.push(op);
			Threads.push(op);
			Posts = Posts.concat(els);
			thr.style.counterReset = 'de-cnt ' + omt;
			thr.classList.add('de-thread');
			thr.pCount = i + omt;
			thr.op = op;
			thr.removeAttribute('id');
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
	if(aib.brit) {
		$each($Q('.reflink > a', node), function(el) {
			el.onclick = null;
			el.href = aib.getThrdUrl(brd, el.textContent);
			el.target = '_blank';
		});
	} else if(aib.abu && TNum && (node = $c('de-thread', node))) {
		while(node.nextSibling) {
			$del(node.nextSibling);
		}
		node.insertAdjacentHTML('afterend', '<hr>');
	}
	return true;
}

function replaceString(txt) {
	if(dTime) {
		txt = dTime.init(txt).fix(txt, null);
	}
	if(aib.fch || aib.krau) {
		txt = txt.replace(/(^|>|\s|&gt;)(https*:\/\/.*?)(?=$|<|\s)/ig, '$1<a href="$2">$2</a>');
	}
	if(spells.haveReps) {
		txt = spells.replace(txt);
	}
	if(Cfg['crossLinks']) {
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

function replaceDelform() {
	var html = dForm.outerHTML || new XMLSerializer().serializeToString(dForm);
	if(liteMode) {
		doc.body.insertAdjacentHTML('afterbegin', html);
		dForm = doc.body.firstChild;
		$event(window, {'load': function() {
			while(dForm.nextSibling) {
				$del(dForm.nextSibling);
			}
		}});
	} else {
		dForm.insertAdjacentHTML('beforebegin', replaceString(html));
		dForm.style.display = 'none';
		dForm.id = 'de-dform-old';
		dForm = dForm.previousSibling;
		$event(window, {'load': function() {
			$del($id('de-dform-old'));
		}});
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
	if(Cfg['updScript']) {
		checkForUpdates(false, function(html) {
			$alert(html, 'updavail', false);
		});
	}
	if(!TNum) {
		setTimeout(window.scrollTo, 20, 0, 0);
		return;
	}
	if(Cfg['rePageTitle']) {
		docTitle = '/' + brd + ' - ' + pByNum[TNum].tTitle;
		doc.title = docTitle;
	} else {
		docTitle = doc.title;
	}
	if(Cfg['updThread'] === 1) {
		if(nav.Firefox > 10 || nav.Chrome) {
			doc.addEventListener(
				(nav.WebKit ? 'webkit' : nav.Firefox < 18 ? 'moz' : '') + 'visibilitychange',
				function() {
					if(doc.hidden || doc.mozHidden || doc.webkitHidden) {
						Favico.focused = false;
					} else {
						onVis();
					}
				},
				false
			);
			Favico.focused = !(doc.hidden || doc.mozHidden || doc.webkitHidden);
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
	}
	if(Cfg['updThread'] === 2) {
		$after($c('de-thread', doc), $event($add(
			'<span>[<a href="#">' + Lng.getNewPosts[lang] + '</a>]</span>'), {
			'click': function(e) {
				$pd(e);
				$alert(Lng.loading[lang], 'newposts', true);
				loadNewPosts(null);
			}
		}));
	}
}


/*==============================================================================
										MAIN
==============================================================================*/

function addDelformStuff(isLog) {
	readFavorites();
	Posts.forEach(addPostButtons);
	saveFavorites();
	isLog && $log('addPostButtons');
	preloadImages(null);
	isLog && (Cfg['preLoadImgs'] || Cfg['openImgs']) && $log('preloadImages');
	if(Cfg['expandImgs']) {
		Posts.forEach(eventPostImg);
		isLog && $log('eventPostImg');
	}
	if(Cfg['expandPosts'] && !TNum) {
		Posts.forEach(expandPost);
		isLog && $log('expandPost');
	}
	embedMP3Links(null);
	isLog && Cfg['addMP3'] && $log('embedMP3Links');
	embedTubeLinks(null);
	isLog && Cfg['addYouTube'] && $log('embedTubeLinks');
	embedImgLinks(dForm);
	isLog && Cfg['addImgs'] && $log('embedImgLinks');
	addImgSearch(dForm);
	isLog && Cfg['imgSrcBtns'] && $log('addImgSearch');
	genRefMap(pByNum, null);
	isLog && Cfg['linksNavig'] === 2 && $log('genRefMap');
	eventRefLink(dForm);
	isLog && Cfg['linksNavig'] && $log('eventRefLink');
	readPostsVisib();
	readViewedPosts();
	setPostsVisib();
}

function doScript() {
	var initTime = oldTime = Date.now();
	if(!Initialization()) {
		return;
	}
	$log('Initialization');
	readCfg();
	$log('readCfg');
	$disp(doc.body);
	if(aib.rep || liteMode) {
		replaceDelform();
		$log('replaceDelform');
	}
	if(!tryToParse(dForm)) {
		$disp(doc.body);
		return;
	}
	$log('parseDelform');
	if(Cfg['keybNavig']) {
		initKeyNavig();
		$log('initKeyNavig');
	}
	if(!liteMode) {
		initPage();
		$log('initPage');
		addPanel();
		$log('addPanel');
		initPostform();
		$log('initPostform');
	}
	initMessageFunctions();
	addDelformStuff(true);
	savePostsVisib();
	saveUserPostsVisib();
	$log('readPosts');
	scriptCSS();
	$disp(doc.body);
	$log('scriptCSS');
	timeLog.push(Lng.total[lang] + (Date.now() - initTime) + 'ms');
}

if(doc.body) {
	doScript()
} else {
	$event(doc, {'DOMContentLoaded': doScript});
}

})(window.opera && window.opera.scriptStorage);
