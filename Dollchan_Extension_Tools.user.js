// ==UserScript==
// @name			Dollchan Extension Tools
// @version			13.9.19.0
// @namespace		http://www.freedollchan.org/scripts/*
// @author			Sthephan Shinkufag @ FreeDollChan
// @copyright		(C)2084, Bender Bending Rodriguez
// @description		Doing some profit for imageboards
// @icon			https://raw.github.com/Y0ba/Dollchan-Extension-Tools/master/Icon.png
// @updateURL		https://raw.github.com/Y0ba/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.meta.js
// @run-at			document-start
// @include			http://*
// @include			https://*
// ==/UserScript==

(function de_main_func(scriptStorage) {
var version = '13.9.19.0',
defaultCfg = {
	'language':		0,		// script language [0=ru, 1=en]
	'hideBySpell':	1,		// hide posts by spells
	'spells':		'',		// user defined spells
	'menuHiddBtn':	1,		// menu on hide button
	'hideRefPsts':	0,		// hide post with references to hidden posts
	'delHiddPost':	0,		// delete hidden posts
	'ajaxUpdThr':	1,		// auto update threads
	'updThrDelay':	60,		//		threads update interval in sec
	'favIcoBlink':	1,		//		favicon blinking, if new posts detected
	'desktNotif':	0,		//		desktop notifications, if new posts detected
	'addUpdBtn':	0,		// add update thread button
	'expandPosts':	2,		// expand shorted posts [0=off, 1=auto, 2=on click]
	'postBtnsCSS':	2,		// post buttons style [0=text, 1=classic, 2=solid grey]
	'noSpoilers':	1,		// open spoilers
	'noPostNames':	0,		// hide post names
	'noPostScrl':	1,		// no scroll in posts
	'correctTime':	0,		// correct time in posts
	'timeOffset':	'+0',	//		offset in hours
	'timePattern':	'',		//		find pattern
	'timeRPattern':	'',		//		replace pattern
	'expandImgs':	2,		// expand images by click [0=off, 1=in post, 2=by center]
	'resizeImgs':	1,		// 		resize large images
	'maskImgs':		0,		// mask images
	'prLoadImgs':	0,		// pre-load images
	'findImgFile':	0,		// 		detect built-in files in images
	'openImgs':		0,		// open images in posts
	'openGIFs':		0,		// 		open only GIFs in posts
	'imgSrcBtns':	1,		// add image search buttons
	'linksNavig':	2,		// navigation by >>links [0=off, 1=no map, 2=+refmap]
	'linksOver':	100,	//		delay appearance in ms
	'linksOut':		1500,	//		delay disappearance in ms
	'markViewed':	0,		//		mark viewed posts
	'strikeHidd':	0,		//		strike >>links to hidden posts
	'noNavigHidd':	0,		//		don't show previews for hidden posts
	'crossLinks':	0,		// replace http: to >>/b/links
	'insertNum':	1,		// insert >>link on postnumber click
	'addMP3':		1,		// mp3 player by links
	'addImgs':		0,		// add images by links
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
	'addPostForm':	2,		// postform displayed [0=at top, 1=at bottom, 2=hidden, 3=hanging]
	'scrAfterRep':	0,		// scroll to the bottom after reply
	'favOnReply':	1,		// add thread to favorites on reply
	'addSageBtn':	1,		// email field -> sage btn
	'saveSage':		1,		// remember sage
	'sageReply':	0,		//		reply with sage
	'warnSubjTrip':	0,		// warn if subject field contains tripcode
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
	'userCSSTxt':	'',		//		css text
	'expandPanel':	0,		// show full main panel
	'attachPanel':	1,		// attach main panel
	'panelCounter':	1,		// posts/images counter in script panel
	'rePageTitle':	1,		// replace page title in threads
	'animation':	1,		// animation in script
	'closePopups':	0,		// auto-close popups
	'keybNavig':	1,		// keyboard navigation
	'kNavigKeys':	null,	// 		navigation hot-keys
	'loadPages':	1,		//		number of pages that are loaded on F5
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

		'ajaxUpdThr':	['AJAX обновление треда ', 'AJAX thread update '],
		'updThrDelay':	[' (сек)', ' (sec)'],
		'favIcoBlink':	['Мигать фавиконом при новых постах', 'Favicon blinking on new posts'],
		'desktNotif':	['Уведомления на рабочем столе', 'Desktop notifications'],
		'addUpdBtn':	['Добавить кнопку обновления треда', 'Add thread update button'],
		'expandPosts': {
			sel:		[['Откл.', 'Авто', 'По клику'], ['Disable', 'Auto', 'On click']],
			txt:		['AJAX загрузка сокращенных постов*', 'AJAX upload of shorted posts*']
		},
		'postBtnsCSS': {
			sel:		[['Text', 'Classic', 'Solid grey'], ['Text', 'Classic', 'Solid grey']],
			txt:		['Стиль кнопок постов*', 'Post buttons style*']
		},
		'noSpoilers':	['Открывать текстовые спойлеры', 'Open text spoilers'],
		'noPostNames':	['Скрывать имена в постах', 'Hide names in posts'],
		'noPostScrl':	['Без скролла в постах', 'No scroll in posts'],
		'keybNavig':	['Навигация с помощью клавиатуры ', 'Navigation with keyboard '],
		'loadPages':	[' Количество страниц, загружаемых по F5', ' Number of pages that are loaded on F5 '],
		'correctTime':	['Корректировать время в постах* ', 'Correct time in posts* '],
		'timeOffset':	[' Разница во времени', ' Time difference'],
		'timePattern':	[' Шаблон поиска', ' Find pattern'],
		'timeRPattern':	[' Шаблон замены', ' Replace pattern'],

		'expandImgs': {
			sel:		[['Откл.', 'В посте', 'По центру'], ['Disable', 'In post', 'By center']],
			txt:		['раскрывать изображения по клику', 'expand images on click']
		},
		'resizeImgs':   ['Уменьшать в экран большие изображения', 'Resize large images to fit screen'],
		'preLoadImgs':	['Предварительно загружать изображения*', 'Pre-load images*'],
		'findImgFile':	['Распознавать встроенные файлы в изображениях*', 'Detect built-in files in images*'],
		'openImgs':		['Скачивать полные версии изображений*', 'Download full version of images*'],
		'openGIFs':		['Скачивать только GIFы*', 'Download GIFs only*'],
		'imgSrcBtns':	['Добавлять кнопки для поиска изображений*', 'Add image search buttons*'],

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
			sel:		[['Сверху', 'Внизу', 'Скрытая', 'Отдельная'], ['At top', 'At bottom', 'Hidden', 'Hanging']],
			txt:		['форма ответа в треде* ', 'reply form in thread* ']
		},
		'scrAfterRep':	['Перемещаться в конец треда после отправки', 'Scroll to the bottom after reply'],
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
		'filters':	['Фильтры', 'Filters'],
		'posts':	['Посты', 'Posts'],
		'images':	['Картинки', 'Images'],
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
		'expimg':	['Раскрыть картинки', 'Expand images'],
		'maskimg':	['Маскировать картинки', 'Mask images'],
		'upd-on':	['Выключить автообновление треда', 'Disable thread autoupdate'],
		'upd-off':	['Включить автообновление треда', 'Enable thread autoupdate'],
		'audio-off':['Звуковое оповещение о новых постах', 'Sound notification about new posts'],
		'catalog':	['Каталог', 'Catalog'],
		'counter':	['Постов/Изображений в треде', 'Posts/Images in thread'],
		'imgload':	['Сохранить изображения из треда', 'Save images from thread']
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

	keyNavEdit:		[
		'%l%i24 – предыдущая страница%/l' +
		'%l%i33 – следующая страница%/l' +
		'%l%i23 – скрыть текущий пост/тред%/l' +
		'%l%i22 – быстрый ответ или создать тред%/l' +
		'%l%i25t – отправить пост%/l' +
		'%l%i21 – тред (на доске)/пост (в треде) ниже%/l' +
		'%l%i20 – тред (на доске)/пост (в треде) выше%/l' +
		'%l%i31 – пост (на доске) ниже%/l' +
		'%l%i30 – пост (на доске) выше%/l' +
		'%l%i32 – открыть тред%/l' +
		'%l%i26 – открыть/закрыть избранное%/l' +
		'%l%i27 – открыть/закрыть скрытые посты%/l' +
		'%l%i28 – открыть/закрыть панель%/l' +
		'%l%i29 – включить/выключить маскировку изображений%/l',
		'%l%i24 – previous page%/l' +
		'%l%i33 – next page%/l' +
		'%l%i23 – hide current post/thread%/l' +
		'%l%i22 – quick reply or create thread%/l' +
		'%l%i25t – send post%/l' +
		'%l%i21 – thread (on board) / post (in thread) below%/l' +
		'%l%i20 – thread (on board) / post (in thread) above%/l' +
		'%l%i31 – on board post below%/l' +
		'%l%i30 – on board post above%/l' +
		'%l%i32 – open thread%/l'
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

	newPost:		[
		[' новый пост', ' новых поста', ' новых постов', '. Последний:'],
		[' new post', ' new posts', ' new posts', '. Latest: ']
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
	succDeleted:	['Успешно удалено!', 'Succesfully deleted!'],
	errDelete:		['Не могу удалить:\n', 'Can\'t delete:\n'],
	cTimeError:		['Неправильные настройки времени', 'Invalid time settings'],
	noGlobalCfg:	['Глобальные настройки не найдены', 'Global config not found'],
	postNotFound:	['Пост не найден', 'Post not found'],
	dontShow:		['Не отображать: ', 'Do not show: '],
	checkNow:		['Проверить сейчас', 'Check now'],
	updAvail:		['Доступно обновление!', 'Update available!'],
	haveLatest:		['У вас стоит самая последняя версия!', 'You have latest version!'],
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
	makeThrd:		['Создать тред', 'Create thread'],
	makeReply:		['Ответить', 'Make reply'],
	hideForm:		['Закрыть форму', 'Hide form'],
	search:			['Искать в ', 'Search in '],
	wait:			['Ждите', 'Wait'],
	addFile:		['+ файл', '+ file'],
	helpAddFile:	['Добавить .ogg, .rar, .zip, или .7z к картинке', 'Add .ogg, .rar, .zip, or .7z to image '],
	downloadFile:	['Скачать содержащийся в картинке файл', 'Download existing file from image'],
	fileCorrupt:	['Файл повреждён: ', 'File is corrupted: '],
	subjHasTrip:	['Поле "Тема" содержит трипкод', '"Subject" field contains tripcode'],
	loadImage:		['Загружаются изображения: ', 'Loading images: '],
	loadFile:		['Загружаются файлы: ', 'Loading files: '],
	cantLoad:		['Не могу загрузить ', 'Can\'t load '],
	willSavePview:	['Будет сохранено превью', 'Thumb will be saved'],
	loadErrors:		['Во время загрузки произошли ошибки:', 'Warning:'],
	errCorruptData:	['Ошибка: сервер отправил повреждённые данные', 'Error: server sent corrupted data'],

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

doc = window.document, aProto = Array.prototype,
Cfg, comCfg, hThr, Favor, pByNum, sVis, bUVis, uVis,
aib, nav, brd, TNum, pageNum, updater, youTube, keyNav, firstThr, visPosts = 2,
pr, dForm, dummy, spells,
Images_ = {preloading: false, afterpreload: null, progressId: null, canvas: null},
oldTime, timeLog = [], dTime,
ajaxInterval, lang, quotetxt = '', liteMode, isExpImg,
$each = Function.prototype.call.bind(aProto.forEach),
emptyFn = function() {};


//============================================================================================================
//												UTILITIES
//============================================================================================================

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
		for(var key in attr) {
			key === 'text' ? el.textContent = attr[key] :
			key === 'value' ? el.value = attr[key] :
			el.setAttribute(key, attr[key]);
		}
	}
	if(events) {
		for(var key in events) {
			el.addEventListener(key, events[key], false);
		}
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

function $script(text, del) {
	var s = doc.head.appendChild($new('script', {'type': 'text/javascript', 'text': text}, null));
	if(del) {
		$del(s);
	}
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

function $DOM(html) {
	var myDoc = doc.implementation.createHTMLDocument('');
	myDoc.documentElement.innerHTML = html;
	return myDoc;
}

function $getStyle(el, prop) {
	return getComputedStyle(el).getPropertyValue(prop);
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

function $queue(maxNum, Fn, endFn) {
	this.array = [];
	this.length = this.index = this.running = 0;
	this.num = 1;
	this.fn = Fn;
	this.endFn = endFn;
	this.max = maxNum;
	this.freeSlots = [];
	while(maxNum--) {
		this.freeSlots.push(maxNum);
	}
	this.completed = this.paused = false;
}
$queue.prototype = {
	run: function(data) {
		if(this.paused || this.running === this.max) {
			this.array.push(data);
			this.length++;
		} else {
			this.fn(this.freeSlots.pop(), this.num++, data);
			this.running++;
		}
	},
	end: function(qIdx) {
		if(!this.paused && this.index < this.length) {
			this.fn(qIdx, this.num++, this.array[this.index++]);
			return;
		}
		this.running--;
		this.freeSlots.push(qIdx);
		if(!this.paused && this.completed && this.running === 0) {
			this.endFn();
		}
	},
	complete: function() {
		if(this.index >= this.length && this.running === 0) {
			this.endFn();
		} else {
			this.completed = true;
		}
	},
	pause: function() {
		this.paused = true;
	},
	'continue': function() {
		this.paused = false;
		if(this.index >= this.length) {
			if(this.completed) {
				this.endFn();
			}
			return;
		}
		while(this.index < this.length && this.running !== this.max) {
			this.fn(this.freeSlots.pop(), this.num++, this.array[this.index++]);
			this.running++;
		}
	}
};

function $tar() {
	this._data = [];
}
$tar.prototype = {
	addFile: function(filepath, input) {
		var i, checksum, nameLen, fileSize = input.length,
			header = new Uint8Array(512);
		for(i = 0, nameLen = Math.min(filepath.length, 100); i < nameLen; ++i) {
			header[i] = filepath.charCodeAt(i) & 0xFF;
		}
		this._padSet(header, 100, '100777', 8);										// fileMode
		this._padSet(header, 108, '0', 8);											// uid
		this._padSet(header, 116, '0', 8);											// gid
		this._padSet(header, 124, fileSize.toString(8), 13);						// fileSize
		this._padSet(header, 136, Math.floor(Date.now() / 1000).toString(8), 12);	// mtime
		this._padSet(header, 148, '        ', 8);									// checksum
		header[156] = 0x30;															// type ('0')
		for(i = checksum = 0; i < 157; i++) {
			checksum += header[i];
		}
		this._padSet(header, 148, checksum.toString(8), 8);							// checksum
		this._data.push(header);
		this._data.push(input);
		if((i = Math.ceil(fileSize / 512) * 512 - fileSize) !== 0) {
			this._data.push(new Uint8Array(i));
		}
	},
	addString: function(filepath, str) {
		var i, len, data, sDat = unescape(encodeURIComponent(str));
		for(i = 0, len = sDat.length, data = new Uint8Array(len); i < len; ++i) {
			data[i] = sDat.charCodeAt(i) & 0xFF;
		}
		this.addFile(filepath, data);
	},
	get: function() {
		this._data.push(new Uint8Array(1024));
		return new Blob(this._data, {'type': 'application/x-tar'});
	},

	_padSet: function(data, offset, num, len) {
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

function $workers(source, count) {
	var i, wrk, wUrl;
	if(nav.Firefox) {
		wUrl = 'data:text/javascript,' + source;
		wrk = unsafeWindow.Worker;
	} else {
		wUrl = window.URL.createObjectURL(new Blob([source], {'type': 'text/javascript'}));
		this.url = wUrl;
		wrk = Worker;
	}
	for(i = 0; i < count; ++i) {
		this[i] = new wrk(wUrl);
	}
}
$workers.prototype = {
	url: null,
	clear: function() {
		if(this.url !== null) {
			window.URL.revokeObjectURL(this.url);
		}
	}
};

function regQuote(str) {
	return (str + '').replace(/([.?*+^$[\]\\(){}|\-])/g, '\\$1');
}

function getImages(el) {
	return el.querySelectorAll('.thumb, .de-thumb, .ca_thumb, ' +
		'img[src*="thumb"], img[src*="/spoiler"], img[src^="blob:"]');
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

function getAncestor(el, tagName) {
	do {
		el = el.parentElement;
	} while(el && el.tagName !== tagName);
	return el;
}


//============================================================================================================
//											STORAGE & CONFIG
//============================================================================================================

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

function getStoredObj(id) {
	var data;
	try {
		data = JSON.parse(getStored(id))
	} finally {
		return data || {};
	}
}

function saveComCfg(dm, obj) {
	comCfg = getStoredObj('DESU_Config');
	if(obj) {
		comCfg[dm] = obj;
	} else {
		delete comCfg[dm];
	}
	setStored('DESU_Config', JSON.stringify(comCfg) || '');
}

function saveCfg(id, val) {
	if(Cfg[id] !== val) {
		Cfg[id] = val;
		saveComCfg(aib.dm, Cfg);
	}
}

function readCfg() {
	comCfg = getStoredObj('DESU_Config');
	if(!(aib.dm in comCfg) || $isEmpty(Cfg = comCfg[aib.dm])) {
		Cfg = {};
		if(nav.isGlobal) {
			for(var i in comCfg['global']) {
				Cfg[i] = comCfg['global'][i];
			}
		}
		Cfg['captchaLang'] = aib.ru ? 2 : 1;
		Cfg['correctTime'] = 0;
	}
	Cfg.__proto__ = defaultCfg;
	if(!Cfg['timeOffset']) {
		Cfg['timeOffset'] = '+0';
	}
	if(!Cfg['timePattern']) {
		Cfg['timePattern'] = aib.timePattern;
	}
	if(!nav.isBlob) {
		Cfg['preLoadImgs'] = 0;
		if(Cfg['ajaxReply'] === 2) {
			Cfg['ajaxReply'] = 1;
		}
	}
	if(aib.tiny && Cfg['ajaxReply'] === 2) {
		Cfg['ajaxReply'] = 1;
	}
	if(!nav.Firefox) {
		defaultCfg['favIcoBlink'] = 0;
	}
	if(!('Notification' in window)) {
		Cfg['desktNotif'] = 0;
	}
	if(nav.Opera) {
		if(nav.Opera < 12) {
			if(!nav.isGM) {
				Cfg['YTubeTitles'] = 0;
			}
			Cfg['animation'] = 0;
		}
		if(Cfg['YTubeType'] === 2) {
			Cfg['YTubeType'] = 1;
		}
		Cfg['preLoadImgs'] = 0;
		Cfg['findImgFile'] = 0;
		if(!nav.isGM) {
			Cfg['updScript'] = 0;
		}
	}
	if(Cfg['updThrDelay'] < 10) {
		Cfg['updThrDelay'] = 10;
	}
	if('updThread' in Cfg) {
		if(Cfg['updThread'] === 1) {
			Cfg['ajaxUpdThr'] = 1;
		} else {
			Cfg['ajaxUpdThr'] = 0;
			Cfg['addUpdBtn'] = 1;
		}
		delete Cfg['updThread'];
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
		dTime = new dateTime(Cfg['timePattern'], Cfg['timeRPattern'], Cfg['timeOffset'], lang, function(rp) {
			saveCfg('timeRPattern', rp);
		});
	}
	if(aib.hana) {
		aib.hDTFix = new dateTime(
			'yyyy-nn-dd-hh-ii-ss',
			'_d _M _y (_w) _h:_i ',
			Cfg['timeOffset'] || 0,
			Cfg['correctTime'] ? lang : 1,
			null
		);
	}
}

function toggleCfg(id) {
	saveCfg(id, +!Cfg[id]);
}

function readPosts() {
	var data, str = TNum ? sessionStorage['de-hidden-' + brd + TNum] : null;
	if(typeof str === 'string') {
		data = str.split(',');
		if(data.length === 4 && +data[0] === (Cfg['hideBySpell'] ? spells.hash : 0) &&
			(data[1] in pByNum) && pByNum[data[1]].count === +data[2])
		{
			sVis = data[3].split('');
			return;
		}
	}
	sVis = [];
}

function readUserPosts() {
	bUVis = getStoredObj('DESU_Posts_' + aib.dm);
	uVis = bUVis[brd];
	if(!uVis) {
		bUVis[brd] = uVis = getStoredObj('DESU_Posts_' + aib.dm + '_' + brd);
		delStored('DESU_Posts_' + aib.dm + '_' + brd);
	}
	hThr = getStoredObj('DESU_Threads_' + aib.dm);
	if(!(brd in hThr)) {
		hThr[brd] = {};
	}
}

function savePosts() {
	if(TNum) {
		var lPost = firstThr.lastNotDeleted;
		sessionStorage['de-hidden-' + brd + TNum] = (Cfg['hideBySpell'] ? spells.hash : '0') +
			',' + lPost.num + ',' + lPost.count + ',' + sVis.join('');
	}
	saveHiddenThreads(false);
	toggleContent('hid', true);
}

function saveUserPosts() {
	var minDate, b, vis, key, str = JSON.stringify(bUVis);
	if(str.length > 1e6) {
		minDate = Date.now() - 5 * 24 * 3600 * 1000;
		for(b in bUVis) {
			if(bUVis.hasOwnProperty(b)) {
				vis = bUVis[b];
				for(key in vis) {
					if(vis.hasOwnProperty(key) && vis[key][1] < minDate) {
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
	if(updContent) {
		toggleContent('hid', true);
	}
}

function readFavorites() {
	Favor = getStoredObj('DESU_Favorites');
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
	Favor[h][b][tNum] = {
		'cnt': post.thr.pcount,
		'txt': post.title,
		'url': aib.getThrdUrl(brd, tNum)
	};
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
					post.el.classList.add('de-viewed');
					post.viewed = true;
				}
			});
		}
	}
}


//============================================================================================================
//												MAIN PANEL
//============================================================================================================

function pButton(id, href) {
	return '<li><a id="de-btn-' + id + '" class="de-abtn" title="' + Lng.panelBtn[id][lang] +
		'" href="' + href + '"></a></li>';
}

function closePanel(el) {
	if(Cfg['animation']) {
		nav.animEvent(el, function(node) {
			node.lastChild.style.display = 'none';
			node.attach = false;
			node.removeAttribute('class');
		});
		el.className = 'de-panel-close';
	} else {
		el.lastChild.style.display = 'none';
		el.attach = false;
	}
}

function addPanel() {
	var panel, imgLen = getImages(dForm).length;
	(pr.pArea[0] || dForm).insertAdjacentHTML('beforebegin',
		'<div id="de-main" lang="' + getThemeLang() + '">' +
			'<div id="de-panel">' +
				'<span id="de-btn-logo" title="' + Lng.panelBtn['attach'][lang] + '"></span>' +
				'<ul id="de-panel-btns" style="display: ' + (Cfg['expandPanel'] ? 'inline-block' : 'none') + '">' +
					pButton('settings', '#') +
					pButton('hidden', '#') +
					pButton('favor', '#') +
					(aib.arch ? '' :
						pButton('refresh', '#') +
						(!TNum && pageNum === 0 ? '' : pButton('goback', aib.getPageUrl(brd, pageNum - 1))) +
						(TNum || pageNum === aib.pagesCount ? '' : pButton('gonext', aib.getPageUrl(brd, pageNum + 1)))) +
					pButton('goup', '#') +
					pButton('godown', '#') +
					(imgLen === 0 ? '' :
						pButton('expimg', '#') +
						pButton('maskimg', '#')) +
					(!TNum ? '' :
						pButton(Cfg['ajaxUpdThr'] ? 'upd-on' : 'upd-off', '#') +
						(nav.Safari ? '' : pButton('audio-off', '#'))) +
					(!aib.nul && !aib.abu && (!aib.fch || aib.arch) ? '' :
						pButton('catalog', '//' + aib.host + '/' + (aib.abu ?
							'makaba/makaba.fcgi?task=catalog&board=' + brd : brd + '/catalog.html'))) +
					(!TNum && !aib.arch? '' :
						(nav.Opera || !nav.isBlob ? '' : pButton('imgload', '#')) +
						'<div id="de-panel-info"><span title="' + Lng.panelBtn['counter'][lang] +
							'">' + firstThr.pcount + '/' + imgLen + '</span></div>') +
				'</ul>' +
			'</div>' +
			'<div class="de-content"></div>' +
			'<div id="de-alert"></div>' +
			'<hr style="clear: both;">' +
		'</div>'
	);
	panel = $id('de-panel');
	panel.addEventListener('click', function(e) {
		switch(e.target.id) {
		case 'de-btn-logo':
			if(Cfg['expandPanel']) {
				closePanel(e.currentTarget);
			} else {
				e.currentTarget.attach = true;
			}
			toggleCfg('expandPanel');
			return;
		case 'de-btn-settings': toggleContent('cfg', false); break;
		case 'de-btn-hidden': toggleContent('hid', false); break
		case 'de-btn-favor': toggleContent('fav', false); break;
		case 'de-btn-refresh': window.location.reload(); break;
		case 'de-btn-goup': scrollTo(0, 0); break;
		case 'de-btn-godown': scrollTo(0, doc.body.scrollHeight || doc.body.offsetHeight); break;
		case 'de-btn-expimg':
			isExpImg = !isExpImg;
			$del($c('de-img-center', doc));
			for(var post = firstThr.op; post; post = post.next) {
				post.toggleImages(isExpImg);
			}
			break;
		case 'de-btn-maskimg':
			toggleCfg('maskImgs');
			updateCSS();
			break;
		case 'de-btn-upd-on':
		case 'de-btn-upd-off':
		case 'de-btn-upd-warn':
			if(updater.enabled) {
				updater.disable();
			} else {
				updater.enable();
			}
			break;
		case 'de-btn-audio-on':
		case 'de-btn-audio-off':
			if(updater.toggleAudio(0)) {
				updater.enable();
				e.target.id = 'de-btn-audio-on';
			} else {
				e.target.id = 'de-btn-audio-off';
			}
			$del($c('de-menu', doc));
			break;
		case 'de-btn-imgload':
			if($id('de-alert-imgload')) {
				break;
			}
			if(Images_.preloading) {
				$alert(Lng.loading[lang], 'imgload', true);
				Images_.afterpreload = loadDocFiles.bind(null, true);
				Images_.progressId = 'imgload';
			} else {
				loadDocFiles(true);
			}
			break;
		default: return;
		}
		$pd(e);
	}, true);
	panel.addEventListener('mouseover', function(e) {
		if(!Cfg['expandPanel']) {
			clearTimeout(this.odelay);
			this.lastChild.style.display = 'inline-block';
			if(Cfg['animation']) {
				this.className = 'de-panel-open';
			}
		}
		switch(e.target.id) {
		case 'de-btn-refresh':
			if(TNum) {
				return;
			}
		case 'de-btn-audio-off': addMenu(e);
		}
	}, false);
	panel.addEventListener('mouseout', function(e) {
		if(!Cfg['expandPanel'] && !this.attach) {
			this.odelay = setTimeout(closePanel, 500, this);
		}
		switch(e.target.id) {
		case 'de-btn-refresh':
		case 'de-btn-audio-off': removeMenu(e); break;
		}
	}, false);
}

function toggleContent(name, isUpd) {
	if(liteMode) {
		return;
	}
	var el = $c('de-content', doc),
		id = 'de-content-' + name;
	if(!el || (isUpd && el.id !== id)) {
		return;
	}
	$id('de-panel').attach = isUpd || el.id !== id;
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
			var el, res = this.checked, i = 0, els = $Q('.de-entry > div > input', this.parentNode);
			for(; el = els[i++];) {
				el.checked = res;
			}
		}}),
		$new('b', {'text': title}, null)
	]));
}

function showContent(cont, id, name, isUpd) {
	var h, b, tNum, i, els, post, cln, block;
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
		for(i = 0, els = $C('de-post-hid', dForm); post = els[i++];) {
			if(post.isOp) {
				continue;
			}
			(cln = post.cloneNode(true)).removeAttribute('id');
			cln.style.display = '';
			if(cln.classList.contains(aib.cRPost)) {
				cln.classList.add('de-cloned-post');
			} else {
				cln.className = aib.cReply + ' de-cloned-post';
			}
			cln.post = Object.create(cln.clone = post.post);
			cln.post.el = cln;
			cln.btn = $q('.de-btn-hide, .de-btn-hide-user', cln);
			cln.btn.parentNode.className = 'de-ppanel';
			cln.btn.onclick = function() {
				this.toggleContent(this.hidden = !this.hidden);
			}.bind(cln);
			(block || (block = cont.appendChild(
				$add('<div class="de-content-block"><b>' + Lng.hiddenPosts[lang] + ':</b></div>')
			))).appendChild($New('div', {'class': 'de-entry'}, [cln]));
		}
		if(block) {
			$append(cont, [
				$btn(Lng.expandAll[lang], '', function() {
					$each($Q('.de-cloned-post', this.parentNode), function(el) {
						var post = el.post;
						post.toggleContent(post.hidden = !post.hidden);
					});
					this.value = this.value === Lng.undo[lang] ? Lng.expandAll[lang] : Lng.undo[lang];
				}),
				$btn(Lng.save[lang], '', function() {
					$each($Q('.de-cloned-post', this.parentNode), function(date, el) {
						if(!el.post.hidden) {
							el.clone.setUserVisib(false, date, true);
						}
					}.bind(null, Date.now()));
					saveUserPosts();
				})
			]);
		} else {
			cont.appendChild($new('b', {'text': Lng.noHidPosts[lang]}, null));
		}
		$append(cont, [
			doc.createElement('hr'),
			$new('b', {'text': ($isEmpty(hThr) ? Lng.noHidThrds[lang] : Lng.hiddenThrds[lang] + ':')}, null)
		]);
		if(!$isEmpty(hThr)) {
			for(b in hThr) {
				if($isEmpty(hThr[b])) {
					continue;
				}
				block = addContentBlock(cont, '/' + b);
				for(tNum in hThr[b]) {
					block.insertAdjacentHTML('beforeend', '<div class="de-entry" info="' + b + ';' +
						tNum + '"><div class="' + aib.cReply + '"><input type="checkbox"><a href="' +
						aib.getThrdUrl(b, tNum) + '" target="_blank">№' + tNum + '</a> - ' +
						hThr[b][tNum] + '</div></div>');
				}
			}
		}
		$append(cont, [
			doc.createElement('hr'),
			addEditButton('hidden', hThr, true, function(data) {
				hThr = data;
				if(!(brd in hThr)) {
					hThr[brd] = {};
				}
				firstThr.updateHidden(hThr[brd]);
				saveHiddenThreads(true);
				localStorage['__de-threads'] = JSON.stringify(hThr);
				localStorage.removeItem('__de-threads');
			}),
			$btn(Lng.clear[lang], Lng.clrDeleted[lang], function() {
				$each($Q('.de-entry[info]', this.parentNode), function(el) {
					var arr = el.getAttribute('info').split(';');
					ajaxLoad(aib.getThrdUrl(arr[0], arr[1]), false, null, function(eCode, eMsg) {
						if(eCode === 404) {
							delete hThr[this[0]][this[1]];
							saveHiddenThreads(true);
						}
					}.bind(arr));
				});
			}),
			$btn(Lng.remove[lang], Lng.clrSelected[lang], function() {
				$each($Q('.de-entry[info]', this.parentNode), function(date, el) {
					var post, arr = el.getAttribute('info').split(';');
					if($t('input', el).checked) {
						if(arr[1] in pByNum) {
							pByNum[arr[1]].setUserVisib(false, date, true);
						} else {
							localStorage['__de-post'] = JSON.stringify({
								'brd': arr[0],
								'date': date,
								'isOp': true,
								'num': arr[1],
								'hide': false
							});
							localStorage.removeItem('__de-post');
						}
						delete hThr[arr[0]][arr[1]];
					}
				}.bind(null, Date.now()));
				saveHiddenThreads(true);
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
			addEditButton('favor', Favor, true, function(data) {
				Favor = data;
				setStored('DESU_Favorites', JSON.stringify(Favor));
				toggleContent('fav', true);
			}),
			$btn(Lng.info[lang], Lng.infoCount[lang], function() {
				$each($C('de-entry', doc), function(el) {
					var c, arr = el.getAttribute('info').split(';'),
						f = Favor[arr[0]][arr[1]][arr[2]];
					if(arr[0] !== aib.host) {
						return;
					}
					c = $c('de-fav-inf-posts', el).firstElementChild;
					c.className = 'de-wait';
					c.textContent = '';
					ajaxLoad(aib.getThrdUrl(arr[1], arr[2]), true, function(form) {
						var cnt = aib.getPosts(form).length + 1;
						c.textContent = cnt;
						if(cnt > f.cnt) {
							c.className = 'de-fav-inf-new';
							f.cnt = cnt;
							setStored('DESU_Favorites', JSON.stringify(Favor));
						} else {
							c.className = 'de-fav-inf-old';
						}
						c = f = null;
					}, function(eCode, eMsg) {
						c.textContent = getErrorMessage(eCode, eMsg);
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
					ajaxLoad(aib.getPageUrl(brd, i), true, function(idx, form) {
						for(var arr, el, len = this.length, i = 0; i < len; ++i) {
							arr = this[i].getAttribute('info').split(';');
							if(arr[0] === aib.host && arr[1] === brd) {
								el = $c('de-fav-inf-page', this[i]);
								if((new RegExp('(?:№|No.|>)\\s*' + arr[2] + '\\s*<'))
									.test(form.innerHTML))
								{
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
					}.bind($C('de-entry', doc), i), function() {
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
					ajaxLoad(Favor[arr[0]][arr[1]][arr[2]]['url'], false, null, function(eCode, eMsg) {
						if(eCode === 404) {
							removeFavorites(arr[0], arr[1], arr[2]);
							saveFavorites();
							arr = null;
						}
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


//============================================================================================================
//											SETTINGS WINDOW
//============================================================================================================

function fixSettings() {
	var toggleBox = function(state, arr) {
		var i = arr.length;
		while(i--) {
			($q(arr[i], doc) || {}).disabled = !state;
		}
	};
	toggleBox(Cfg['ajaxUpdThr'], ['input[info="favIcoBlink"]', 'input[info="desktNotif"]']);
	toggleBox(Cfg['expandImgs'], ['input[info="resizeImgs"]']);
	toggleBox(Cfg['preLoadImgs'], ['input[info="findImgFile"]']);
	toggleBox(Cfg['openImgs'], ['input[info="openGIFs"]']);
	toggleBox(Cfg['linksNavig'], [
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
	toggleBox(Cfg['keybNavig'], ['input[info="loadPages"]']);
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
	el = $add('<select info="' + id + '">' + opt + '</select>');
	el.addEventListener('change', Fn || function() {
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
					id === 'images' ? getCfgImages() :
					id === 'links' ? getCfgLinks() :
					id === 'form' ? getCfgForm() :
					id === 'common' ? getCfgCommon() :
					getCfgInfo()
				);
			}
			el.className = 'de-cfg-body';
			if(id === 'filters') {
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
	if(num - i < ((top / 12) | 0 + 1)) {
		str = '';
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
				'id': 'de-btn-addspell',
				'text': Lng.add[lang],
				'href': '#',
				'class': 'de-abtn'}, {
				'click': $pd,
				'mouseover': addMenu,
				'mouseout': removeMenu
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
			$add('<a href="https://github.com/Y0ba/Dollchan-Extension-Tools/wiki/Spells-' +
				(lang ? 'en' : 'ru') + '" class="de-abtn" target="_blank">[?]</a>')
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
			$each($C('de-post-hid', dForm), function(el) {
				var wrap = el.post.wrap,
					hide = !wrap.classList.contains('de-hidden');
				if(hide) {
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
		lBox('ajaxUpdThr', false, TNum ? function() {
			if(Cfg['ajaxUpdThr']) {
				updater.enable();
			} else {
				updater.disable();
			}
		} : null),
		$New('label', null, [
			inpTxt('updThrDelay', 4, null),
			$txt(Lng.cfg['updThrDelay'][lang])
		]),
		$New('div', {'class': 'de-cfg-depend'}, [
			lBox('favIcoBlink', true, null),
			$if('Notification' in window, lBox('desktNotif', true, function() {
				if(Cfg['desktNotif']) {
					Notification.requestPermission();
				}
			}))
		]),
		lBox('addUpdBtn', true, TNum ? function() {
			Thread.processUpdBtn(Cfg['addUpdBtn']);
		} : null),
		optSel('expandPosts', true, null),
		optSel('postBtnsCSS', true, null),
		lBox('noSpoilers', true, updateCSS),
		lBox('noPostNames', true, updateCSS),
		lBox('noPostScrl', true, updateCSS),
		$New('div', null, [
			lBox('correctTime', false, dateTime.toggleSettings),
			$add('<a href="https://github.com/Y0ba/Dollchan-Extension-Tools/wiki/Settings-time-' +
				(lang ? 'en' : 'ru') + '" class="de-abtn" target="_blank">[?]</a>')
		]),
		$New('div', {'class': 'de-cfg-depend'}, [
			$New('div', null, [
				inpTxt('timeOffset', 3, null),
				$txt(Lng.cfg['timeOffset'][lang])
			]),
			$New('div', null, [
				inpTxt('timePattern', 30, null),
				$txt(Lng.cfg['timePattern'][lang])
			]),
			$New('div', null, [
				inpTxt('timeRPattern', 30, null),
				$txt(Lng.cfg['timeRPattern'][lang])
			])
		])
	]);
}

function getCfgImages() {
	return $New('div', {'class': 'de-cfg-unvis', 'id': 'de-cfg-images'}, [
		optSel('expandImgs', true, null),
		$New('div', {'style': 'padding-left: 25px;'}, [ lBox('resizeImgs', false, null)]),
		$if(nav.isBlob && !nav.Opera, lBox('preLoadImgs', true, null)),
		$if(nav.isBlob && !nav.Opera, $New('div', {'class': 'de-cfg-depend'}, [
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
			$if(!(nav.Opera && nav.Opera < 12 && !nav.isGM), lBox('YTubeTitles', false, null))
		])
	]);
}

function getCfgForm() {
	return $New('div', {'class': 'de-cfg-unvis', 'id': 'de-cfg-form'}, [
		optSel('ajaxReply', true, null),
		$if(pr.form && nav.isBlob, $New('div', {'class': 'de-cfg-depend'}, [
			lBox('postSameImg', true, null),
			lBox('removeEXIF', true, null),
			lBox('removeFName', true, null)
		])),
		$if(pr.form, optSel('addPostForm', true, null)),
		$if(pr.form, lBox('scrAfterRep', true, null)),
		lBox('favOnReply', true, null),
		$if(pr.mail, $New('div', null, [
			lBox('addSageBtn', false, null),
			lBox('saveSage', false, null)
		])),
		$if(pr.subj, lBox('warnSubjTrip', false, null)),
		$if(pr.cap, optSel('captchaLang', true, null)),
		$if(pr.txta, $New('div', null, [
			optSel('addTextBtns', false, function() {
				saveCfg('addTextBtns', this.selectedIndex);
				pr.addTextPanel();
			}),
			lBox('txtBtnsLoc', false, pr.addTextPanel.bind(pr))
		])),
		$if(pr.passw, $New('div', null, [
			inpTxt('passwValue', 20, PostForm.setUserPassw),
			$txt(Lng.cfg['userPassw'][lang])
		])),
		$if(pr.name, $New('div', null, [
			inpTxt('nameValue', 20, PostForm.setUserName),
			lBox('userName', false, PostForm.setUserName)
		])),
		$if(pr.txta, $New('div', null, [
			inpTxt('signatValue', 20, null),
			lBox('userSignat', false, null)
		])),
		$New('div', null, [
			$txt(Lng.dontShow[lang]),
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
				saveCfg('userCSSTxt', this.value);
				updateCSS();
				toggleContent('cfg', true);
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
		$New('div', null, [
			lBox('keybNavig', false, function() {
				if(Cfg['keybNavig']) {
					if(keyNav) {
						keyNav.enable();
					} else {
						keyNav = new KeyNavigation();
					}
				} else if(keyNav) {
					keyNav.disable();
				}
			}),
			$btn(Lng.edit[lang], '', function(e) {
				$pd(e);
				if($id('de-alert-edit-keybnavig')) {
					return;
				}
				var aEl, evtListener, keys =  KeyNavigation.readKeys(true),
					temp = KeyEditListener.getEditMarkup(keys);
				$alert(temp[1], 'edit-keybnavig', false);
				aEl = $id('de-alert-edit-keybnavig');
				evtListener = new KeyEditListener(aEl, keys, temp[0]);
				aEl.addEventListener('focus', evtListener, true);
				aEl.addEventListener('blur', evtListener, true);
				aEl.addEventListener('click', evtListener, true);
				aEl.addEventListener('keydown', evtListener, true);
				aEl.addEventListener('keyup', evtListener, true);
			})
		]),
		$New('div', {'class': 'de-cfg-depend'}, [
			inpTxt('loadPages', 4, null),
			$txt(Lng.cfg['loadPages'][lang])
		]),
		$if(!(nav.Opera && !nav.isGM), $New('div', null, [
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
		$add('<div style="padding-bottom: 10px;">' +
			'<a href="https://github.com/Y0ba/Dollchan-Extension-Tools/wiki/versions" ' +
			'target="_blank">v' + version + '</a>&nbsp;|&nbsp;' +
			'<a href="http://www.freedollchan.org/scripts/" target="_blank">Freedollchan</a>&nbsp;|&nbsp;' +
			'<a href="https://github.com/Y0ba/Dollchan-Extension-Tools/wiki/' +
			(lang ? 'home-en/' : '') + '" target="_blank">Github</a></div>'),
		$add('<div><div style="display: inline-block; vertical-align: top; width: 186px; height: 235px;">' +
			Lng.thrViewed[lang] + Cfg['stats']['view'] + '<br>' +
			Lng.thrCreated[lang] + Cfg['stats']['op'] + '<br>' +
			Lng.posts[lang] + Cfg['stats']['reply'] + '</div>' +
			'<div style="display: inline-block; padding-left: 7px; height: 235px; ' +
			'border-left: 1px solid grey;">' + timeLog.join('<br>') + '</div></div>'),
		$btn(Lng.debug[lang], Lng.infoDebug[lang], function() {
			$alert(Lng.infoDebug[lang] +
				':<textarea readonly id="de-debug-info" class="de-editor"></textarea>', 'help-debug', false);
			$id('de-debug-info').value = JSON.stringify({
				'version': version,
				'location': String(window.location),
				'nav': nav,
				'cfg': Cfg,
				'sSpells': spells.list.split('\n'),
				'oSpells': sessionStorage['de-spells-' + brd + TNum],
				'perf': timeLog
			}, function(key, value) {
				if(key in defaultCfg) {
					if(value === defaultCfg[key] || key === 'nameValue' || key === 'passwValue' ||
						key === 'signatValue')
					{
						return void 0;
					}
				}
				return key === 'stats' ? void 0 : value;
			}, '\t');
		})
	]);
}

function addEditButton(name, val, isJSON, Fn) {
	return $btn(Lng.edit[lang], Lng.editInTxt[lang], function() {
		var ta = $new('textarea', {
			'class': 'de-editor',
			'value': isJSON ? JSON.stringify(val, null, '\t') : val
		}, null);
		$alert('', 'edit-' + name, false);
		$append($c('de-alert-msg', $id('de-alert-edit-' + name)), [
			$txt(Lng.editor[name][lang]),
			ta,
			$btn(Lng.save[lang], Lng.saveChanges[lang], isJSON ? function(fun, aName) {
				var data;
				try {
					data = JSON.parse(this.value.trim().replace(/[\n\r\t]/g, '') || '{}');
				} finally {
					if(data) {
						fun(data);
						closeAlert($id('de-alert-edit-' + aName));
						closeAlert($id('de-alert-err-invaliddata'));
					} else {
						$alert(Lng.invalidData[lang], 'err-invaliddata', false);
					}
				}
			}.bind(ta, Fn, name) : Fn.bind(ta))
		]);
	});
}

function addSettings(Set) {
	Set.appendChild($New('div', {'class': aib.cReply}, [
		$new('div', {'id': 'de-cfg-head', 'text': 'Dollchan Extension Tools'}, null),
		$New('div', {'id': 'de-cfg-bar'}, [
			cfgTab('filters'),
			cfgTab('posts'),
			cfgTab('images'),
			cfgTab('links'),
			$if(pr.form || pr.oeForm, cfgTab('form')),
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
				addEditButton('cfg', Cfg, true, function(data) {
					saveComCfg(aib.dm, data);
				}),
				$if(nav.isGlobal, $btn(Lng.load[lang], Lng.loadGlobal[lang], function() {
					if(('global' in comCfg) && !$isEmpty(comCfg['global'])) {
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
				$btn(Lng.reset[lang], Lng.resetCfg[lang], function() {
					if(confirm(Lng.conReset[lang])) {
						delStored('DESU_Config');
						delStored('DESU_Favorites');
						delStored('DESU_Threads');
						window.location.reload();
					}
				})
			]),
			$new('div', {'style': 'clear: both;'}, null)
		])
	]));
	$c('de-cfg-tab', Set).click();
	updRowMeter.call($id('de-spell-edit'));
}


//============================================================================================================
//												MENUS & POPUPS
//============================================================================================================

function closeAlert(el) {
	if(el) {
		el.closeTimeout = null;
		if(Cfg['animation']) {
			nav.animEvent(el, function(node) {
				var p = node && node.parentNode;
				if(p) {
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
	if(el) {
		$t('div', el).innerHTML = txt.trim();
		node = $t('span', el);
		node.className = cBtn;
		node.textContent = tBtn;
		clearTimeout(el.closeTimeout);
		if(!wait && Cfg['animation']) {
			nav.animEvent(el, function(node) {
				node.classList.remove('de-blink');
			});
			el.classList.add('de-blink');
		}
	} else {
		el = $id('de-alert').appendChild($New('div', {'class': aib.cReply, 'id': 'de-alert-' + id}, [
			$new('span', {'class': cBtn, 'text': tBtn}, {'click': function() {
				closeAlert(this.parentNode);
			}}),
			$add('<div class="de-alert-msg">' + txt.trim() + '</div>')
		]));
		if(Cfg['animation']) {
			nav.animEvent(el, function(node) {
				node.classList.remove('de-open');
			});
			el.classList.add('de-open');
		}
	}
	if(Cfg['closePopups'] && !wait && !id.contains('help') && !id.contains('edit')) {
		el.closeTimeout = setTimeout(closeAlert, 4e3, el);
	}
}

function showMenu(el, html, inPanel, onclick) {
	var y, pos, menu, cr = el.getBoundingClientRect();
	if(Cfg['attachPanel'] && inPanel) {
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
	menu.addEventListener('mouseover', function(e) {
		clearTimeout(e.currentTarget.odelay);
	}, true);
	menu.addEventListener('mouseout', removeMenu, true);
	menu.addEventListener('click', function(e) {
		var el = e.target;
		if(el.className = 'de-menu-item') {
			this(el);
		}
	}.bind(onclick), false);
}

function addMenu(e) {
	e.target.odelay = setTimeout(function(el) {
		switch(el.id) {
		case 'de-btn-addspell': addSpellMenu(el); return;
		case 'de-btn-refresh': addAjaxPagesMenu(el); return;
		case 'de-btn-audio-off': addAudioNotifMenu(el); return;
		}
	}, Cfg['linksOver'], e.target);
}

function removeMenu(e) {
	var el, rt = e.relatedTarget;
	clearTimeout(e.target.odelay);
	if(!rt || !nav.matchesSelector(rt, '.de-menu, .de-menu > div, .de-menu-item')) {
		if(el = $c('de-menu', doc)) {
			el.odelay = setTimeout($del, 75, el);
		}
	}
}

function addSpellMenu(el) {
	showMenu(el, '<div style="display: inline-block; border-right: 1px solid grey;">' +
		'<span class="de-menu-item">' + ('#words,#exp,#exph,#imgn,#ihash,#subj,#name,#trip,#img,<br>')
			.split(',').join('</span><span class="de-menu-item">') +
		'</span></div><div style="display: inline-block;"><span class="de-menu-item">' +
		('#sage,#op,#tlen,#all,#video,#vauthor,#num,#wipe,#rep,#outrep')
			.split(',').join('</span><span class="de-menu-item">') + '</span></div>', false,
	function(el) {
		var exp = el.textContent,
			idx = spells.names.indexOf(exp.substr(1));
		$txtInsert($id('de-spell-edit'), exp + (
			TNum && exp !== '#op' && exp !== '#rep' && exp !== '#outrep' ? '[' + brd + ',' + TNum + ']' : ''
		) + (idx < 5 || idx > 14 ? '(' : ''));
	});
}

function addAjaxPagesMenu(el) {
	showMenu(el, '<span class="de-menu-item">' +
		Lng.selAjaxPages[lang].join('</span><span class="de-menu-item">') + '</span>', true,
	function(el) {
		loadPages(aProto.indexOf.call(el.parentNode.children, el) + 1);
	});
}

function addAudioNotifMenu(el) {
	showMenu(el, '<span class="de-menu-item">' +
		Lng.selAudioNotif[lang].join('</span><span class="de-menu-item">') + '</span>', true,
	function(el) {
		var i = aProto.indexOf.call(el.parentNode.children, el);
		updater.enable();
		updater.toggleAudio(i === 0 ? 3e4 : i === 1 ? 6e4 : i === 2 ? 12e4 : 3e5);
		$id('de-btn-audio-off').id = 'de-btn-audio-on';
		$del(el.parentNode);
	});
}


//============================================================================================================
//											KEYBOARD NAVIGATION
//============================================================================================================

function KeyNavigation() {
	this.cPost = null;
	this.enabled = true;
	this.lastPage = pageNum;
	this.lastPageOffset = 0;
	this.resume(KeyNavigation.readKeys(false));
	doc.addEventListener('keydown', this, true);
}
KeyNavigation.version = 1;
KeyNavigation.readKeys = function(createNew) {
	var keys = Cfg['kNavigKeys'];
	if(!keys) {
		return KeyNavigation.getDefaultKeys();
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
		}
		keys[1] = !!nav.Firefox;
		keys[2] = keys[2].map(mapFunc);
		keys[3] = keys[3].map(mapFunc);
		saveCfg('kNavigKeys', keys);
	}
	return createNew ? JSON.parse(JSON.stringify(keys)) : keys;
};
KeyNavigation.getDefaultKeys = function() {
	var isFirefox = !!nav.Firefox;
	var globKeys = [
		/* One post/thread above     */ 0x004B /* = K                 */,
		/* One post/thread below     */ 0x004A /* = J                 */,
		/* Reply or create thread    */ 0x0052 /* = R                 */,
		/* Hide selected thread/post */ 0x0048 /* = H                 */,
		/* Open previous page        */ 0x1025 /* = Ctrl + left arrow */,
		/* Send post (txt)           */ 0xC00D /* = Alt + Enter       */,
		/* Open/close favorites posts*/ 0x4046 /* = Alt + F           */,
		/* Open/close hidden posts   */ 0x4048 /* = Alt + H           */,
		/* Open/close panel          */ 0x0050 /* = P                 */,
		/* Mask/unmask images        */ 0x0042 /* = B                 */
	];
	var nonThrKeys = [
		/* One post above */ 0x004D /* = M                  */,
		/* One post below */ 0x004E /* = N                  */,
		/* Open thread    */ 0x0056 /* = V                  */,
		/* Open next page */ 0x1027 /* = Ctrl + right arrow */,
		/* Expand thread  */ 0x0045 /* = E                  */
	];
	return [KeyNavigation.version, isFirefox, globKeys, nonThrKeys];
};
KeyNavigation.prototype = {
	clear: function(lastPage) {
		this.cPost = null;
		this.lastPage = lastPage;
		this.lastPageOffset = 0;
	},
	disable: function() {
		if(this.enabled) {
			if(this.cPost) {
				this.cPost.unselect();
			}
			doc.removeEventListener('keydown', this, true);
			this.enabled = false;
		}
	},
	enable: function() {
		if(!this.enabled) {
			this.clear(pageNum);
			doc.addEventListener('keydown', this, true);
			this.enabled = true;
		}
	},
	handleEvent: function(e) {
		if(this.paused) {
			return;
		}
		var post, scrollToThread, globIdx, ntIdx, curTh = e.target.tagName,
			kc = e.keyCode | (e.ctrlKey ? 0x1000 : 0) | (e.shiftKey ? 0x2000 : 0) |
				(e.altKey ? 0x4000 : 0) | (curTh === 'TEXTAREA' ||
				(curTh === 'INPUT' && e.target.type === 'text') ? 0x8000 : 0);
		if(kc === 0x74 || kc === 0x8074) { // F5
			if(TNum) {
				return;
			}
			loadPages(+Cfg['loadPages']);
		} else if(kc === 0x1B) { // ESC
			if(this.cPost) {
				this.cPost.unselect();
				this.cPost = null;
			}
			this.lastPageOffset = 0;
		} else if(kc === 0x801B) { // ESC (txt)
			e.target.blur();
		} else {
			globIdx = this.gKeys.indexOf(kc);
			switch(globIdx) {
			case 2: // Reply or create thread
				if(this.cPost) {
					pr.showQuickReply(this.cPost);
				} else if(!TNum) {
					// TODO: create thread
					return;
				}
				break;
			case 3: // Hide selected thread/post
				post = this._getFirstVisPost(false) || this._getNextVisPost(null, true, false);
				if(post) {
					post.toggleUserVisib();
					this._scroll(post, false, post.isOp);
				}
				break;
			case 4: // Open previous page
				if(!TNum && pageNum === 0) {
					return;
				}
				window.location.pathname = aib.getPageUrl(brd, TNum ? 0 : pageNum - 1);
				break;
			case 5: // Send post (txt)
				if(e.target !== pr.txta && e.target !== pr.cap) {
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
				// TODO: implement this
				break;
			case 9: // Mask/unmask images
				toggleCfg('maskImgs');
				updateCSS();
				break;
			case -1:
				if(TNum || (ntIdx = this.ntKeys.indexOf(kc)) === -1) {
					return;
				}
				if(ntIdx === 2) { // Open thread
					post = this._getFirstVisPost(false) || this._getNextVisPost(null, true, false);
					if(post) {
						if(nav.Firefox) {
							GM_openInTab(aib.getThrdUrl(brd, post.tNum), false, true);
						} else {
							window.open(aib.getThrdUrl(brd, post.tNum), '_blank');
						}
					}
					break;
				} else if(ntIdx === 3) { // Open next page
					if(this.lastPage === aib.pagesCount) {
						return;
					}
					window.location.pathname = aib.getPageUrl(brd, this.lastPage + 1);
					break;
				} else if(ntIdx === 4) { // Expand/collapse thread
					post = this._getFirstVisPost(false) || this._getNextVisPost(null, true, false);
					if(post) {
						if(post.thr.omitted === 0) {
							post.thr.load(visPosts, post.el, null);
						} else {
							post.thr.load(1, post.thr.op.el, null);
							if(this.cPost && this.cPost !== post) {
								this.cPost.unselect();
								this.cPost = post;
							}
						}
					}
					break;
				}
			default:
				scrollToThread = !TNum && (globIdx === 0 || globIdx === 1);
				this._scroll(this._getFirstVisPost(scrollToThread), globIdx === 0 || ntIdx === 0,
					scrollToThread);
			}
		}
		e.stopPropagation();
		$pd(e);
	},
	pause: function() {
		this.paused = true;
	},
	resume: function(keys) {
		this.gKeys = keys[2];
		this.ntKeys = keys[3];
		this.paused = false;
	},
	_getFirstVisPost: function(getThread) {
		var post, tPost;
		if(this.lastPageOffset !== pageYOffset) {
			post = getThread ? firstThr : firstThr.op;
			while(post.topCoord < 1) {
				tPost = post.next;
				if(!tPost) {
					break;
				}
				post = tPost;
			}
			if(this.cPost) {
				this.cPost.unselect();
			}
			this.cPost = getThread ? post.op.prev : post.prev;
			this.lastPageOffset = pageYOffset;
		}
		return this.cPost;
	},
	_getNextVisPost: function(cPost, isOp, toUp) {
		var thr, post;
		if(isOp) {
			thr = cPost ? toUp ? cPost.thr.prev : cPost.thr.next : firstThr;
			while(thr && thr.hidden) {
				thr = toUp ? thr.prev : thr.next;
			}
			return thr ? thr.op : null;
		}
		post = cPost ? toUp ? cPost.prev : cPost.next : firstThr.op;
		while(post) {
			if(post.thr.hidden) {
				post = toUp ? post.thr.op.prev : post.thr.last.next;
			} else if(post.hidden || post.omitted) {
				post = toUp ? post.prev : post.next
			} else {
				return post;
			}
		}
		return null;
	},
	_scroll: function(post, toUp, toThread) {
		var next = this._getNextVisPost(post, toThread, toUp);
		if(!next) {
			if(!TNum && (toUp ? pageNum > 0 : this.lastPage < aib.pagesCount)) {
				window.location.pathname = aib.getPageUrl(brd, toUp ? pageNum - 1 : this.lastPage + 1);
			}
			return;
		}
		if(post) {
			post.unselect();
		}
		if(toThread) {
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
	for(i = 0, len = allKeys.length; i < len; ++i) {
		k = allKeys[i];
		if(k !== 0) {
			for(j = i + 1; j < len; ++j) {
				if(k === allKeys[j]) {
					aInputs[i].classList.add('de-error-key');
					aInputs[j].classList.add('de-error-key');
					break;
				}
			}
		}
	}
	this.aEl = alertEl;
	this.keys = keys;
	this.allKeys = allKeys;
	this.allInputs = aInputs;
	this.errCount = $C('de-error-key', alertEl).length;
	if(this.errCount !== 0) {
		this.saveButton.disabled = true;
	}
}
// Browsers have different codes for these keys (see KeyNavigation.readKeys):
//		Firefox - '-' - 173, '=' - 61, ';' - 59
//		Chrome/Opera: '-' - 189, '=' - 187, ';' - 186
KeyEditListener.keyCodes = ['',,,,,,,,'Backspace',/* Tab */,,,,'Enter',,,'Shift','Ctrl','Alt',
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
KeyEditListener.getEditMarkup = function(keys) {
	var allKeys = [];
	var html = Lng.keyNavEdit[lang]
		.replace(/%l/g, '<label class="de-block">')
		.replace(/%\/l/g, '</label>')
		.replace(/%i([2,3])([0-9]+)(t)?/g, function(aKeys, all, id1, id2, isText) {
			var key = this[+id1][+id2],
				str = '';
			aKeys.push(key);
			if(key & 0x1000) {
				str += 'Ctrl + ';
			}
			if(key & 0x2000) {
				str += 'Shift + ';
			}
			if(key & 0x4000) {
				str += 'Alt + ';
			}
			str += KeyEditListener.keyCodes[key & 0xFFF];
			return '<input class="de-input-key" type="text" de-id1="' + id1 + '" de-id2="' + id2 +
				'" size="30" value="' + str + (isText ? '" de-text' : '"' ) + ' readonly></input>';
		}.bind(keys, allKeys)) +
	'<input type="button" id="de-keys-save" value="' + Lng.save[lang] + '"></input>' +
	'<input type="button" id="de-keys-reset" value="' + Lng.reset[lang] + '"></input>';
	return [allKeys, html];
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
	handleEvent: function(e) {
		var key, keyStr, str, id, temp, el = e.target;
		switch(e.type) {
		case 'blur':
			if(keyNav && this.errCount === 0) {
				keyNav.resume(this.keys);
			}
			this.cEl = null;
			return;
		case 'focus':
			if(keyNav) {
				keyNav.pause();
			}
			this.cEl = el;
			return;
		case 'click':
			if(el.id === 'de-keys-save') {
				saveCfg('kNavigKeys', this.keys);
			} else if(el.id === 'de-keys-reset') {
				this.keys = KeyNavigation.getDefaultKeys();
				if(keyNav) {
					keyNav.resume(this.keys);
				}
				temp = KeyEditListener.getEditMarkup(this.keys);
				this.allKeys = temp[0];
				$c('de-alert-msg', this.aEl).innerHTML = temp[1];
				this.allInputs = aProto.slice.call($C('de-input-key', this.aEl));
				this.errCount = 0;
				delete this.saveButton;
				break;
			} else if(el.className !== 'de-alert-btn') {
				return;
			}
			if(keyNav) {
				keyNav.resume(Cfg['kNavigKeys']);
			}
			closeAlert($id('de-alert-edit-keybnavig'));
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
			keyStr = KeyEditListener.keyCodes[key];
			if(keyStr == null) {
				this.cKey = -1;
				return;
			}
			str = '';
			if(e.ctrlKey) {
				str += 'Ctrl + ';
			}
			if(e.shiftKey) {
				str += 'Shift + ';
			}
			if(e.altKey) {
				str += 'Alt + ';
			}
			if(key === 16 || key === 17 || key === 18) {
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
			if(!el || key === -1) {
				return;
			}
			isError = el.classList.contains('de-error-key');
			if(!this.errorInput && key !== -1) {
				idx = this.allInputs.indexOf(el);
				oKey = this.allKeys[idx];
				if(oKey === key) {
					this.errorInput = false;
					break;
				}
				rIdx = key === 0 ? -1 : this.allKeys.indexOf(key);
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


//============================================================================================================
//												FORM SUBMIT
//============================================================================================================

function getSubmitResponse(dc, isFrame) {
	var i, els, el, err = '', form = $q(aib.qDForm, dc);
	if(dc.body.hasChildNodes() && !form) {
		for(i = 0, els = $Q(aib.qError, dc); el = els[i++];) {
			err += el.innerHTML + '\n';
		}
		if(!(err = err.replace(/<a [^>]+>Назад.+|<br.+/, ''))) {
			err = Lng.error[lang] + '\n' + dc.body.innerHTML;
		}
		err = /:null|successful|uploaded|updating|обновл|удален[о\.]/i.test(err) ? '' : err.replace(/"/g, "'");
	}
	return [(isFrame ? window.location : form ? aib.getThrdUrl(brd, aib.getTNum(form)) : ''), err];
}

function checkUpload(response) {
	var el, cln, err = response[1];
	if(err) {
		if(pr.isQuick) {
			pr.setReply(true, true);
		}
		if(/captch|капч|подтвер|verifizie/i.test(err)) {
			pr.refreshCapImg(pr.tNum, true);
		}
		$alert(err, 'upload', false);
		return;
	}
	pr.txta.value = '';
	if(pr.file) {
		PostForm.delFileUtils(el = getAncestor(pr.file, aib.trTag));
		cln = el.cloneNode(false);
		cln.innerHTML = el.innerHTML;
		el.parentNode.replaceChild(cln, el);
		pr.file = $q('input[type="file"]', el = cln);
		PostForm.eventFiles(el);
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
		firstThr.loadNew(function(eCode, eMsg, np) {
			infoLoadErrors(eCode, eMsg, 0);
			closeAlert($id('de-alert-upload'));
			if(Cfg['scrAfterRep']) {
				scrollTo(0, pageYOffset + firstThr.last.el.getBoundingClientRect().top);
			}
		}, true);
	} else {
		pByNum[pr.tNum].thr.load(visPosts, null, closeAlert.bind(window, $id('de-alert-upload')));
	}
	pr.closeQReply();
	pr.refreshCapImg(pr.tNum, false);
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
	var el, i, els, len, post, tNums = [],
		num = (doc.location.hash.match(/\d+/) || [null])[0];
	if(num && (post = pByNum[num])) {
		if(!post.isOp) {
			post.el.className = aib.cReply;
		}
		doc.location.hash = '';
	}
	for(i = 0, els = $Q('.' + aib.cRPost + ' input:checked', dForm), len = els.length; i < len; ++i) {
		el = els[i];
		el.checked = false;
		if(!TNum && tNums.indexOf(num = aib.getPostEl(el).post.tNum) === -1) {
			tNums.push(num);
		}
	}
	if(TNum) {
		firstThr.loadNew(function(eCode, eMsg, np) {
			infoLoadErrors(eCode, eMsg, 0);
			endDelete();
		}, false);
	} else {
		tNums.forEach(function(tNum) {
			pByNum[tNum].thr.load(visPosts, null, endDelete);
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
	append: function(el) {
		var file, fName, idx, fr,
			pre = '--' + this.boundary + '\r\nContent-Disposition: form-data; name="' + el.name + '"';
		if(el.type === 'file' && el.files.length > 0) {
			file = el.files[0];
			fName = file.name;
			this.data.push(pre + '; filename="' + (
				!Cfg['removeFName'] ? fName : ' ' + fName.substring(fName.lastIndexOf('.'))
			) + '"\r\nContent-type: ' + file.type + '\r\n\r\n', null, '\r\n');
			idx = this.data.length - 2;
			if(!/^image\/(?:png|jpeg)$/.test(file.type)) {
				this.data[idx] = file;
				return;
			}
			fr = new FileReader();
			fr.onload = function(name, e) {
				var dat = this.clearImage(e.target.result, !!el.imgFile);
				if(dat) {
					if(el.imgFile) {
						dat.push(el.imgFile);
					}
					if(Cfg['postSameImg']) {
						dat.push(String(Math.round(Math.random() * 1e6)));
					}
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
		} else if(el.type !== 'checkbox' || el.checked) {
			this.data.push(pre + '\r\n\r\n' + el.value + '\r\n');
		}
	},
	submit: function() {
		if(this.error || this.busy !== 0) {
			return;
		}
		this.data.push('--' + this.boundary + '--\r\n');
		$xhr({
			'method': 'POST',
			'headers': {'Content-type': 'multipart/form-data; boundary=' + this.boundary},
			'data': new Blob(this.data),
			'url': nav.fixLink(this.url),
			'onreadystatechange': function(xhr) {
				if(xhr.readyState !== 4) {
					return;
				}
				if(xhr.status === 200) {
					this(getSubmitResponse($DOM(xhr.responseText), false));
				} else {
					$alert(xhr.status === 0 ? Lng.noConnect[lang] :
						'HTTP [' + xhr.status + '] ' + xhr.statusText, 'upload', false);
				}
			}.bind(this.fn)
		});
	},
	readExif: function(data, off, len) {
		var i, j, dE, tag, tgLen, xRes = 0,
			yRes = 0,
			resT = 0,
			dv = new DataView(data, off),
			le = String.fromCharCode(dv.getUint8(0), dv.getUint8(1)) !== 'MM';
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
		return new Uint8Array([resT, xRes >> 8, xRes & 0xFF, yRes >> 8, yRes & 0xFF]);
	},
	clearImage: function(data, delExtraData) {
		var tmp, i, len, deep, rv, lIdx, mSize, jpgDat, img = new Uint8Array(data),
			rExif = !!Cfg['removeEXIF'];
		if(!Cfg['postSameImg'] && !rExif && !delExtraData) {
			return [img];
		}
		if(img[0] === 0xFF && img[1] === 0xD8) {
			for(i = 2, deep = 1, len = img.length - 1, rv = [null, null], lIdx = 2, jpgDat = null; i < len; ) {
				if(img[i] === 0xFF) {
					if(rExif) {
						if(!jpgDat && deep === 1) {
							if(img[i + 1] === 0xE1 && img[i + 4] === 0x45) {
								jpgDat = this.readExif(data, i + 10, (img[i + 2] << 8) + img[i + 3]);
							} else if(img[i + 1] === 0xE0 && img[i + 7] === 0x46) {
								jpgDat = img.subarray(i + 11, i + 15);
							}
						}
						if((img[i + 1] >> 4) === 0xE || img[i + 1] === 0xFE) {
							if(lIdx !== i) {
								rv.push(img.subarray(lIdx, i));
							}
							mSize = (img[i + 2] << 8) + img[i + 3];
							if(img[i + 1] === 0xFE) {
								i += 2 + mSize;
							} else {
								i += 2;
								while(mSize--) {
									if(img[i] === 0xFF && img[i + 1] === 0xD8) {
										i += 2;
										while(img[i] !== 0xFF || img[i + 1] !== 0xD9) {
											i++;
										}
										i += 2;
										if(i === len) {
											return null;
										}
										while(img[i] !== 0xFF) {
											i++;
										}
										if(i + 2 === len) {
											return null;
										}
										i--;
										break;
									}
									i++;
								}
							}
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
			if(!delExtraData && len - i > 75) {
				i = len;
			}
			if(lIdx === 2) {
				return i === len ? [img] : [new Uint8Array(data, 0, i)];
			}
			rv[0] = new Uint8Array([0xFF, 0xD8, 0xFF, 0xE0, 0, 0x0D, 0x4A, 0x46, 0x49, 0x46, 0, 1, 1]);
			rv[1] = jpgDat || new Uint8Array([0, 0, 1, 0, 1]);
			rv.push(img.subarray(lIdx, i));
			return rv;
		}
		if(img[0] === 0x89 && img[1] === 0x50) {
			for(i = 0, len = img.length - 7; i < len && (img[i] !== 0x49 ||
				img[i + 1] !== 0x45 || img[i + 2] !== 0x4E || img[i + 3] !== 0x44); i++) {}
			i += 8;
			return i === len || (!delExtraData && len - i > 75) ? [img] : [new Uint8Array(data, 0, i)];
		}
		return null;
	}
};


//============================================================================================================
//											CONTENT FEATURES
//============================================================================================================

function initMessageFunctions() {
	window.addEventListener('message', function(e) {
		var temp, data = e.data.substring(1);
		switch(e.data[0]) {
		case 'A':
			temp = data.split('$#$');
			if(temp[0] === 'de-iframe-pform') {
				checkUpload([temp[1], temp[2]]);
			} else {
				checkDelete([temp[1], temp[2]]);
			}
			$q('iframe[name="' + temp[0] + '"]', doc).src = 'about:blank';
			return;
		case 'B':
			$del($id('de-fav-wait'));
			$id('de-iframe-fav').style.height = data + 'px';
			return;
		}
	}, false);
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

function workerQueue(mReqs, wrkFn, errFn) {
	if(!nav.hasWorker) {
		this.run = this._runSync.bind(wrkFn);
		return;
	}
	this.queue = new $queue(mReqs, this._createWrk.bind(this), null);
	this.run = this._runWrk;
	this.wrks = new $workers('self.onmessage = function(e) {\
		var info = (' + String(wrkFn) + ')(e.data[1]);\
		self.postMessage([e.data[0], info], info.data ? [info.data] : null);\
	}', mReqs);
	this.errFn = errFn;
}
workerQueue.prototype = {
	_runSync: function(data, transferObjs, Fn) {
		Fn(this(data));
	},
	onMess: function(Fn, e) {
		this.queue.end(e.data[0]);
		Fn(e.data[1]);
	},
	onErr: function(qIdx, e) {
		this.queue.end(qIdx);
		this.errFn(e);
	},
	_runWrk: function(data, transObjs, Fn) {
		this.queue.run([data, transObjs, this.onMess.bind(this, Fn)]);
	},
	_createWrk: function(qIdx, num, data) {
		var w = this.wrks[qIdx];
		w.onmessage = data[2];
		w.onerror = this.onErr.bind(this, qIdx);
		w.postMessage([qIdx, data[0]], data[1]);
	},
	clear: function() {
		this.wrks.clear();
		this.wrks = null;
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
		$q(aib.qImgLink, aib.getPicWrap(this)).insertAdjacentHTML('afterend', '<a href="' + 
			window.URL.createObjectURL(
				new Blob([new Uint8Array(info['data']).subarray(info['idx'])], {'type': app})
			) + '" class="de-img-' + (type > 2 ? 'audio' : 'arch') + '" title="' + Lng.downloadFile[lang] +
			'" download="' + fName.substring(0, fName.lastIndexOf('.')) + '.' + ext + '">.' + ext + '</a>'
		);
	}
}

function downloadImgData(url, Fn) {
	downloadObjInfo({
		'method': 'GET',
		'url': url,
		'onreadystatechange': function onDownloaded(url, e) {
			if(e.readyState !== 4) {
				return;
			}
			var isAb = e.responseType === 'arraybuffer';
			if(e.status === 0 && isAb) {
				Fn(new Uint8Array(e.response));
			} else if(e.status !== 200) {
				if(e.status === 404 || !url) {
					Fn(null);
				} else {
					downloadObjInfo({
						'method': 'GET',
						'url': url,
						'onreadystatechange': onDownloaded.bind(null, null)
					});
				}
			} else if(isAb) {
				Fn(new Uint8Array(e.response));
			} else {
				for(var len, i = 0, txt = e.responseText, rv = new Uint8Array(len = txt.length); i < len; ++i) {
					rv[i] = txt.charCodeAt(i) & 0xFF;
				}
				Fn(rv);
			}
		}.bind(null, url)
	});
}

function downloadObjInfo(obj) {
	if(nav.Firefox && aib.fch && !obj.url.startsWith('blob')) {
		obj['overrideMimeType'] = 'text/plain; charset=x-user-defined';
		GM_xmlhttpRequest(obj);
	} else {
		obj['responseType'] = 'arraybuffer';
		try {
			$xhr(obj);
		} catch(e) {
			Fn(null);
		}
	}
}

function preloadImages(post) {
	if(!Cfg['preLoadImgs'] && !Cfg['openImgs']) {
		return;
	}
	var lnk, url, iType, nExp, el, i, len, els, queue, mReqs = post ? 1 : 4, cImg = 1,
		rjf = Cfg['findImgFile'] && new workerQueue(mReqs, detectImgFile, function(e) {
			console.error("FILE DETECTOR ERROR, line: " + e.lineno + " - " + e.message);
		});
	if(Cfg['preLoadImgs']) {
		queue = new $queue(mReqs, function(qIdx, num, dat) {
			downloadImgData(dat[0], function(idx, data) {
				if(data) {
					var a = this[1];
					a.href = window.URL.createObjectURL(new Blob([data], {'type': this[2]}));
					if(this[3]) {
						this[3].src = a.href;
					}
					if(rjf) {
						rjf.run(data.buffer, [data.buffer], addImgFileIcon.bind(a));
					}
				}
				queue.end(idx);
				if(Images_.progressId) {
					$alert(Lng.loadImage[lang] + cImg + '/' + len, Images_.progressId, true);
				}
				cImg++;
			}.bind(dat, qIdx));
		}, function() {
			Images_.preloading = false
			if(Images_.afterpreload) {
				Images_.afterpreload();
				Images_.afterpreload = Images_.progressId = null;
			}
			rjf && rjf.clear();
			rjf = queue = cImg = len = null;
		});
		Images_.preloading = true;
	}
	for(i = 0, els = getImages(post || dForm), len = els.length; i < len; i++) {
		if(lnk = getAncestor(el = els[i], 'A')) {
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
				queue.run([url, lnk, iType, nExp && el]);
			} else if(nExp) {
				el.src = url;
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
	return new Uint8Array(atob(cnv.toDataURL("image/png").split(',')[1]).split('').map(function(a) {
		return a.charCodeAt();
	}));
}

function loadDocFiles(imgOnly) {
	var els, files, progress, counter, count = 0,
		current = 1,
		warnings = '',
		tar = new $tar(),
		dc = imgOnly ? doc : doc.documentElement.cloneNode(true);
	Images_.queue = new $queue(4, function(qIdx, num, dat) {
		downloadImgData(dat[0], function(idx, data) {
			var name = this[1].replace(/[\\\/:*?"<>|]/g, '_'), el = this[2];
			progress.value = current;
			counter.innerHTML = current;
			current++;
			if(this[3]) {
				if(!data) {
					warnings += '<br>' + Lng.cantLoad[lang] + '<a href="' + this[0] + '">' +
						this[0] + '</a><br>' + Lng.willSavePview[lang];
					$alert(Lng.loadErrors[lang] + warnings, 'floadwarn', false);
					name = 'thumb-' + name.replace(/\.[a-z]+$/, '.png');
					data = getDataFromImg(this[2]);
				}
				if(!imgOnly) {
					el.classList.add('de-thumb');
					el.src = this[3].href = $q(aib.qImgLink, aib.getPicWrap(this[3])).href =
						name = 'images/' + name;
				}
				tar.addFile(name, data);
			} else if(data && data.length > 0) {
				tar.addFile(el.href = el.src = 'data/' + name, data);
			} else {
				$del(el);
			}
			Images_.queue.end(idx);
		}.bind(dat, qIdx));
	}, function() {
		var u, a, dt;
		if(!imgOnly) {
			dt = doc.doctype;
			$t('head', dc).insertAdjacentHTML('beforeend',
				'<script type="text/javascript" src="data/dollscript.js"></script>');
			tar.addString('data/dollscript.js', '(' + String(de_main_func) + ')(null, true);');
			tar.addString(
				TNum + '.html', '<!DOCTYPE ' + dt.name +
				(dt.publicId ? ' PUBLIC "' + dt.publicId + '"' : dt.systemId ? ' SYSTEM' : '') +
				(dt.systemId ? ' "' + dt.systemId + '"' : '') + '>' + dc.outerHTML
			);
		}
		u = window.URL.createObjectURL(tar.get());
		a = $new('a', {'href': u, 'download': aib.dm + '-' + brd.replace(/[\\\/:*?"<>|]/g, '') +
			'-t' + TNum + (imgOnly ? '-images.tar' : '.tar')}, null);
		doc.body.appendChild(a);
		a.click();
		setTimeout(function(el, url) {
			window.URL.revokeObjectURL(url);
			$del(el);
		}, 0, a, u);
		$del($id('de-alert-filesload'));
		Images_.queue = tar = warnings = count = current = imgOnly = progress = counter = null;
	});
	els = aProto.slice.call(getImages($q('[de-form]', dc)));
	count += els.length;
	els.forEach(function(el) {
		var lnk, url;
		if(lnk = getAncestor(el, 'A')) {
			url = lnk.href;
			Images_.queue.run([url, lnk.getAttribute('download') ||
				url.substring(url.lastIndexOf("/") + 1), el, lnk]);
		}
	});
	if(!imgOnly) {
		files = [];
		$each($Q('script, link[rel="alternate stylesheet"], span[class^="de-btn-"],' +
			' #de-main > div, .de-parea, #de-qarea, ' + aib.qPostForm, dc), $del);
		$each($T('a', dc), function(el) {
			var num, tc = el.textContent;
			if(tc.startsWith('>>') && (num = +tc.substr(2)) && (num in pByNum)) {
				el.href = aib.anchor + num;
			} else {
				el.href = getAbsLink(el.href);
			}
			if(!el.classList.contains('de-preflink')) {
				el.className = 'de-preflink ' + el.className;
			}
		});
		$each($Q('.' + aib.cRPost, dc), function(post, i) {
			post.setAttribute('de-num', i === 0 ? TNum : aib.getPNum(post));
		});
		$each($Q('link, *[src]', dc), function(el) {
			if(els.indexOf(el) !== -1) {
				return;
			}
			var temp, i, ext, name, url = el.tagName === 'LINK' ? el.href : el.src;
			if(!this.test(url)) {
				$del(el);
				return;
			}
			name = url.substring(url.lastIndexOf("/") + 1).replace(/[\\\/:*?"<>|]/g, '_')
				.toLowerCase();
			if(files.indexOf(name) !== -1) {
				temp = url.lastIndexOf('.');
				ext = url.substring(temp);
				url = url.substring(0, temp);
				name = name.substring(0, name.lastIndexOf('.'));
				for(i = 0; ; ++i) {
					temp = name + '(' + i + ')' + ext;
					if(files.indexOf(temp) === -1) {
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


//============================================================================================================
//												TIME CORRECTION
//============================================================================================================

function dateTime(pattern, rPattern, diff, dtLang, onRPat) {
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
	this.sDiff = (this.diff < 0 ? '' : '+') + this.diff;
	this.arrW = Lng.week[dtLang];
	this.arrM = Lng.month[dtLang];
	this.arrFM = Lng.fullMonth[dtLang];
	this.rPattern = rPattern;
	this.onRPat = onRPat;
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
	getRPattern: function(txt) {
		var k, p, a, str, i = 1,
			j = 0,
			m = txt.match(new RegExp(this.regex));
		if(!m) {
			this.disabled = true;
			return false;
		}
		this.rPattern = '';
		str = m[0];
		while(a = m[i++]) {
			p = this.pattern[i - 2];
			if((p === 'm' || p === 'y') && a.length > 3) {
				p = p.toUpperCase();
			}
			k = str.indexOf(a, j);
			this.rPattern += str.substring(j, k) + '_' + p;
			j = k + a.length;
		}
		this.onRPat && this.onRPat(this.rPattern);
		return true;
	},
	pad2: function(num) {
		return num < 10 ? '0' + num : num;
	},
	fix: function(txt) {
		if(this.disabled || (!this.rPattern && !this.getRPattern(txt))) {
			return txt;
		}
		return txt.replace(new RegExp(this.regex, 'g'), function() {
			var i, a, t, second, minute, hour, day, month, year, dtime;
			for(i = 1; i < 8; i++) {
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


//============================================================================================================
//													PLAYERS
//============================================================================================================

function initYouTube(embedType, videoType, width, height, isHD, loadTitles) {
	var vData, regex = /^https?:\/\/(?:www\.|m\.)?youtu(?:be\.com\/(?:watch\?.*?v=|v\/|embed\/)|\.be\/)([^&#?]+).*?(?:t(?:ime)?=(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?)?$/;

	function addFlash(el, id, time) {
		var wh = ' width="' + width + '" height="' + height + '">';
		el.innerHTML = videoType === 1 ?
			'<iframe type="text/html" src="https://www.youtube.com/embed/' + id +
				(isHD ? '?hd=1&' : '?') + 'start=' + time + '&html5=1&rel=0" frameborder="0"' + wh :
			'<embed type="application/x-shockwave-flash" src="https://www.youtube.com/v/' + id +
				(isHD ? '?hd=1&' : '?') + 'start=' + time + '" wmode="transparent"' + wh;
	}

	function addHTML5(el, id, time) {
		GM_xmlhttpRequest({
			'method': 'GET',
			'url': 'https://www.youtube.com/watch?v=' + id,
			'onload': function(el, id, time, xhr) {
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
					src = isHD ? (videoURL[46] || videoURL[45] || videoURL[44] || videoURL[43]) : videoURL[43];
				}
				if(!src) {
					addFlash(el, id, time);
					return;
				}
				el.innerHTML = '<video poster="https://i.ytimg.com/vi/' + id +
					'/0.jpg" controls="controls" preload="none" src="' + src +
					(nav.Firefox && nav.Firefox < 14 ? '&' + Math.random() : '') +
					'" width="' + width + '" height="' + height + '"></video>';
				el = el.firstChild;
				el.addEventListener('play', updater.addPlayingTag, false);
				el.addEventListener('pause', updater.removePlayingTag, false);
				if(time) {
					el.onloadedmetadata = function(e) {
						e.target.currentTime = this;
					}.bind(time);
				}
			}.bind(null, el, id, time)
		});
	}

	function addImage(el, m) {
		el.innerHTML = '<a href="https://www.youtube.com/watch?v=' + m[1] + '" target="_blank">' +
			'<img class="de-ytube-image" src="https://i.ytimg.com/vi/' + m[1] +
			'/0.jpg" width="' + width + '" height="' + height + '"></a>';
	}

	function addPlayer(el, m) {
		var time = (m[2] ? m[2] * 3600 : 0) + (m[3] ? m[3] * 60 : 0) + (m[4] ? +m[4] : 0);
		if(videoType === 2) {
			addHTML5(el, m[1], time);
		} else {
			addFlash(el, m[1], time);
		}
	}

	function addYTubeLink(post, m, loader, link) {
		var msg, src, dataObj;
		post.hasYTube = true;
		if(post.ytInfo === null) {
			if(youTube.embedType === 2) {
				youTube.addPlayer(post.ytObj, post.ytInfo = m);
			} else if(youTube.embedType > 2) {
				youTube.addImage(post.ytObj, post.ytInfo = m);
			}
		} else if(!link && $q('.de-ytube-link[href*="' + m[1] + '"]', post.msg)) {
			return;
		}
		if(loader && (dataObj = youTube.vData[m[1]])) {
			post.ytData.push(dataObj);
		}
		if(link) {
			link.href = link.href.replace(/^http:/, 'https:');
			link.className = 'de-ytube-link';
			if(dataObj) {
				link.textContent = dataObj[0];
				link.setAttribute('de-author', dataObj[1]);
			}
		} else {
			src = 'https://www.youtube.com/watch?v=' + m[1];
			if(m[4] || m[3] || m[2]) {
				src += '#t=' + (m[2] ? m[2] + 'h' : '') + (m[3] ? m[3] + 'm' : '') + (m[4] ? m[4] + 's' : '');
			}
			post.msg.insertAdjacentHTML('beforeend',
				'<p class="de-ytube-ext"><a ' + (dataObj ? 'de-author="' + dataObj[1] + '"' : '') +
					'class="de-ytube-link" href="' + src + '">' + (dataObj ? dataObj[0] : src) + '</a></p>');
			link = post.msg.lastChild.firstChild;
		}
		link.ytInfo = m;
		if(loader && !dataObj) {
			post.ytLinksLoading++;
			loader.run([post, link, m[1]]);
		}
	}

	function getTitleLoader() {
		var queueEnd, queue = new $queue(4, function(qIdx, num, data) {
			if(num % 30 === 0) {
				queue.pause();
				setTimeout(queue.continue.bind(queue), 3e3);
			}
			GM_xmlhttpRequest({
				'method': 'GET',
				'url': 'https://gdata.youtube.com/feeds/api/videos/' + data[2] +
					'?alt=json&fields=title/text(),author/name',
				'onreadystatechange': function(idx, xhr) {
					if(xhr.readyState === 4) {
						var entry, title, author, data, post = this[0], link = this[1];
						try {
							if(xhr.status === 200) {
								entry = JSON.parse(xhr.responseText)['entry'];
								title = entry['title']['$t'];
								author = entry['author'][0]['name']['$t'];
							}
						} finally {
							if(title) {
								link.textContent = title;
								link.setAttribute('de-author', author);
								vData[this[2]] = data = [title, author];
								post.ytData.push(data);
								post.ytLinksLoading--;
								if(post.ytHideFun !== null) {
									post.ytHideFun(data);
								}
							}
							setTimeout(queueEnd, 250, idx);
						}
					}
				}.bind(data, qIdx)
			});
		}, function() {
			sessionStorage['de-yt-vdata'] = JSON.stringify(vData);
			queue = queueEnd = null;
		});
		queueEnd = queue.end.bind(queue);
		return queue;
	}

	function parseLinks(post) {
		var i, len, els, el, m, embedTube = [],
			loader = loadTitles && getTitleLoader();
		for(i = 0, els = $Q('embed, object, iframe', post ? post.el : dForm), len = els.length; i < len; ++i) {
			el = els[i];
			if(m = (el.src || el.data).match(regex)) {
				embedTube.push(post || aib.getPostEl(el).post, m);
				$del(el);
			}
		}
		for(i = 0, els = $Q('a[href*="youtu"]', post ? post.el : dForm), len = els.length; i < len; ++i) {
			el = els[i];
			if(m = el.href.match(regex)) {
				addYTubeLink(post || aib.getPostEl(el).post, m, loader, el);
			}
		}
		for(i = 0, len = embedTube.length; i < len; i += 2) {
			addYTubeLink(embedTube[i], embedTube[i + 1], loader, null);
		}
		loader && loader.complete();
	}

	function updatePost(post, oldLinks, newLinks, cloned) {
		var i, j, el, link, m, loader = !cloned && loadTitles && getTitleLoader(),
			len = newLinks.length;
		for(i = 0, j = 0; i < len; i++) {
			el = newLinks[i];
			link = oldLinks[j];
			if(cloned) {
				el.ytInfo = link.ytInfo;
				j++;
			} else if(m = el.href.match(regex)) {
				addYTubeLink(post, m, loader, el);
				j++;
			}
		}
		loader && loader.complete();
	}

	if(embedType === 0) {
		return {
			parseLinks: emptyFn,
			updatePost: emptyFn,
			regex: regex
		};
	}
	if(loadTitles) {
		vData = JSON.parse(sessionStorage['de-yt-vdata'] || '{}');
	}
	return {
		addImage: addImage,
		addPlayer: addPlayer,
		embedType: embedType,
		parseLinks: parseLinks,
		updatePost: updatePost,
		regex: regex,
		vData: vData
	};
}

function embedMP3Links(post) {
	var el, link, src, i, els, len;
	if(!Cfg['addMP3']) {
		return;
	}
	for(i = 0, els = $Q('a[href*=".mp3"]', post ? post.el : dForm), len = els.length; i < len; ++i) {
		link = els[i];
		if(link.target !== '_blank' && link.rel !== 'nofollow') {
			continue;
		}
		src = link.href;
		el = (post || aib.getPostEl(link).post).mp3Obj;
		if(nav.canPlayMP3) {
			if(!$q('audio[src="' + src + '"]', el)) {
				el.insertAdjacentHTML('beforeend',
					'<p><audio src="' + src + '" preload="none" controls></audio></p>');
				link = el.lastChild.firstChild;
				link.addEventListener('play', updater.addPlayingTag, false);
				link.addEventListener('pause', updater.removePlayingTag, false);
			}
		} else {
			if(!$q('object[FlashVars*="' + src + '"]', el)) {
				el.insertAdjacentHTML('beforeend', '<object data="http://junglebook2007.narod.ru/audio/player.swf" type="application/x-shockwave-flash" wmode="transparent" width="220" height="16" FlashVars="playerID=1&amp;bg=0x808080&amp;leftbg=0xB3B3B3&amp;lefticon=0x000000&amp;rightbg=0x808080&amp;rightbghover=0x999999&amp;rightcon=0x000000&amp;righticonhover=0xffffff&amp;text=0xffffff&amp;slider=0x222222&amp;track=0xf5f5dc&amp;border=0x666666&amp;loader=0x7fc7ff&amp;loop=yes&amp;autostart=no&amp;soundFile=' + src + '"><br>');
			}
		}
	}
}


//============================================================================================================
//													AJAX
//============================================================================================================

function ajaxLoad(url, loadForm, Fn, errFn) {
	GM_xmlhttpRequest({
		'method': 'GET',
		'url': nav.fixLink(url),
		'onreadystatechange': function(loadForm, Fn, errFn, xhr) {
			if(xhr.readyState === 4) {
				if(xhr.status !== 200) {
					errFn && errFn(xhr.status, xhr.statusText);
				} else if(Fn) {
					var el, text = xhr.responseText;
					if(/<\/html>[\s\n\r]*$/.test(text)) {
						el = $DOM(text);
						if(!loadForm || (el = $q(aib.qDForm, el))) {
							Fn(el);
							return;
						}
					}
					if(errFn) {
						errFn(0, Lng.errCorruptData[lang]);
					}
				}
			}
		}.bind(null, loadForm, Fn, errFn)
	});
}

function getJsonPosts(url, Fn) {
	GM_xmlhttpRequest({'method': 'GET', 'url': nav.fixLink(url), 'onreadystatechange': function(Fn, xhr) {
		if(xhr.readyState === 4) {
			if(xhr.status === 304) {
				closeAlert($id('de-alert-newposts'));
			} else {
				try {
					var json = JSON.parse(xhr.responseText);
				} catch(e) {
					Fn(1, e.toString(), null);
					return;
				}
				Fn(xhr.status, xhr.statusText, json);
			}
		}
	}.bind(null, Fn)});
}

function loadFavorThread() {
	var post, el = this.parentNode.parentNode,
		ifrm = $t('iframe', el),
		cont = $c('de-content', doc);
	$del($id('de-fav-wait'));
	if(ifrm) {
		$del(ifrm);
		cont.style.overflowY = 'auto';
		return;
	}
	if((post = pByNum[el.getAttribute('info').split(';')[2]]) && !post.hidden) {
		scrollTo(0, pageYOffset + post.getBoundingClientRect().top);
		return;
	}
	$del($id('de-iframe-fav'));
	$c('de-content', doc).style.overflowY = 'scroll';
	el.insertAdjacentHTML('beforeend', '<iframe name="de-iframe-fav" id="de-iframe-fav" src="' +
		$t('a', el).href + '" scrolling="no" style="border: none; width: ' +
		(doc.documentElement.clientWidth - 55) + 'px; height: 1px;"><div id="de-fav-wait" ' +
		'class="de-wait" style="font-size: 1.1em; text-align: center">' + Lng.loading[lang] + '</div>');
}

function loadPages(count) {
	var fun, i = pageNum,
		len = Math.min(aib.pagesCount + 1, i + count),
		pages = [],
		loaded = 1;
	count = len - i;

	function onLoadOrError(idx, eCodeOrForm, maybeEMsg) {
		if(typeof eCodeOrForm === 'number') {
			pages[idx] = $add('<div><center style="font-size: 2em">' +
				getErrorMessage(eCodeOrForm, maybeEMsg) + '</center><hr></div>');
		} else {
			pages[idx] = replacePost(eCodeOrForm);
		}
		if(loaded === count) {
			var el, df, j, parseThrs = Thread.parsed,
				threads = parseThrs ? [] : null;
			for(j in pages) {
				if(j != pageNum) {
					dForm.insertAdjacentHTML('beforeend', '<center style="font-size: 2em">' +
						j + '</center><hr>');
				}
				df = pages[j];
				if(parseThrs) {
					threads = parseThreadNodes(df, threads);
				}
				while(el = df.firstChild) {
					dForm.appendChild(el);
				}
			}
			firstThr = tryToParse(dForm, parseThrs ? threads : $Q(aib.qThread, dForm));
			readFavorites();
			addDelformStuff(false);
			readUserPosts();
			checkPostsVisib();
			saveFavorites();
			saveUserPosts();
			$each($Q('input[type="password"]', dForm), function(pEl) {
				pr.dpass = pEl;
				pEl.value = Cfg['passwValue'];
			});
			if(pr.txta) {
				pr.txta.value = '';
			}
			if(keyNav) {
				keyNav.clear(pageNum + count - 1);
			}
			$disp(dForm);
			closeAlert($id('de-alert-load-pages'));
			loaded = pages = count = null;
		} else {
			loaded++;
		}
	}

	$alert(Lng.loading[lang], 'load-pages', true);
	$each($Q('a[href^="blob:"]', dForm), function(a) {
		window.URL.revokeObjectURL(a.href);
	});
	Pview.clearCache();
	isExpImg = false;
	pByNum = Object.create(null);
	firstThr.gInfo.tNums = [];
	$disp(dForm);
	dForm.innerHTML = '';
	while(i < len) {
		fun = onLoadOrError.bind(null, i);
		ajaxLoad(aib.getPageUrl(brd, i++), true, fun, fun);
	}
}

function infoLoadErrors(eCode, eMsg, newPosts) {
	if(eCode === 200) {
		closeAlert($id('de-alert-newposts'));
	} else if(eCode === 0) {
		$alert(eMsg || Lng.noConnect[lang], 'newposts', false);
	} else {
		$alert(Lng.thrNotFound[lang] + TNum + '): \n' + getErrorMessage(eCode, eMsg), 'newposts', false);
		if(newPosts !== -1) {
			doc.title = '{' + eCode + '} ' + doc.title;
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
		maxRating = Cfg['__hanarating'] || 'r-15',
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
	thumb = rating === 'r-18g' && maxRating !== 'r-18g' ? 'images/r-18g.png' :
		rating === 'r-18' && (maxRating !== 'r-18g' || maxRating !== 'r-18') ? 'images/r-18.png' :
		rating === 'r-15' && maxRating === 'sfw' ? 'images/r-15.png' :
		rating === 'illegal' ? 'images/illegal.png' :
		file['thumb'];
	if(thumb !== file['thumb']) {
		thumbW = 200;
		thumbH = 200;
	}
	return '<div class="file"><div class="fileinfo">Файл: <a href="/' + src + '" target="_blank">' +
		name + '</a><br><em>' + file['thumb'].substring(file['thumb'].lastIndexOf('.') + 1) + ', ' + (
			size < kb ? size + ' B' :
			size < mb ? (size / kb).toFixed(2) + ' KB' :
			size < gb ? (size / mb).toFixed(2) + ' MB' :
			(size / gb).toFixed(2) + ' GB'
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
		wrap = $new('table', {'id': 'post_' + id, 'class': 'replypost post'}, null);
	html = '<tbody><tr><td class="doubledash">&gt;&gt;</td><td id="reply' + id + '" class="reply"><a name="i' + id + '"></a><label><a class="delete icon"><input type="checkbox" id="delbox_' +
		id + '" class="delete_checkbox" value="' + postJson['post_id'] + '" id="' + id +
		'"></a><span class="postername">' + postJson['name'] + '</span> ' + aib.hDTFix.fix(postJson['date']) +
		' </label><span class="reflink"><a onclick="Highlight(0, ' + id + ')" href="/' + brd +
		'/res/' + TNum + '.xhtml#i' + id + '">No.' + id + '</a></span><br>';
	for(i = 0; i < len; i++) {
		html += getHanaFile(files[i], postJson['post_id']);
	}
	wrap.innerHTML = html + (len > 1 ? '<div style="clear: both;"></div>' : '') +
		'<div class="postbody">' + postJson['message_html'] +
		'</div><div class="abbrev"></div></td></tr></tbody>';
	return [wrap, wrap.firstChild.firstChild.lastChild];
}


//============================================================================================================
//													SPELLS
//============================================================================================================

function Spells(read) {
	if(read) {
		this._read(true);
	} else {
		this.disable(false);
	}
}
Spells.checkArr = function(val, num) {
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
};
Spells.YTubeSpell = function spell_youtube(post, val, ctx, cxTail) {
	if(!val) {
		return !!post.hasYTube;
	}
	if(!post.hasYTube || !Cfg['YTubeTitles']) {
		return false;
	}
	var i, data, len, isAuthorSpell = typeof val === 'string';
	for(i = 0, data = post.ytData, len = data.length; i < len; ++i) {
		if(isAuthorSpell ? val === data[i][1] : val.test(data[i][0])) {
			return true;
		}
	}
	if(post.ytLinksLoading === 0) {
		return false;
	}
	post.ytHideFun = function(ctx, cxTail, isASpell, val, data) {
		if(isASpell ? val === data[1] : val.test(data[0])) {
			this.ytHideFun = null;
			spells._continueCheck(this, ctx.concat(cxTail), true);
		} else if(post.ytLinksLoading === 0) {
			this.ytHideFun = null;
			spells._continueCheck(this, ctx.concat(cxTail), false);
		}
	}.bind(post, ctx, cxTail, isAuthorSpell, val);
	return null;
};
Spells.prototype = {
	names: [
		'words', 'exp', 'exph', 'imgn', 'ihash', 'subj', 'name', 'trip', 'img', 'sage', 'op', 'tlen', 'all',
		'video', 'wipe', 'num', 'vauthor'
	],
	_funcs: [
		// 0: #words
		function spell_words(post, val) {
			return post.text.toLowerCase().contains(val) || post.subj.toLowerCase().contains(val);
		},
		// 1: #exp
		function spell_exp(post, val) {
			return val.test(post.text);
		},
		// 2: #exph
		function spell_exph(post, val) {
			return val.test(post.html);
		},
		// 3: #imgn
		function spell_imgn(post, val) {
			var src, data = post.imagesData;
			for(src in data) {
				if(val.test(data[src].info)) {
					return true;
				}
			}
			return false;
		},
		// 4: #ihash
		function spell_ihash(post, val, ctx, cxTail) {
			var src, data = post.imagesData;
			for(src in data) {
				if(data[src].hash === val) {
					return true;
				}
			}
			if(post.hashImgsBusy === 0) {
				return false;
			}
			post.hashHideFun = function(ctx, cxTail, val, hash) {
				if(val === hash) {
					this.hashHideFun = null;
					spells._continueCheck(this, ctx.concat(cxTail), true);
				} else if(post.hashImgsBusy === 0) {
					this.hashHideFun = null;
					spells._continueCheck(this, ctx.concat(cxTail), false);
				}
			}.bind(post, ctx, cxTail, val);
			return null;
		},
		// 5: #subj
		function spell_subj(post, val) {
			var pSubj = post.subj;
			return pSubj ? !val || val.test(pSubj) : false;
		},
		// 6: #name
		function spell_name(post, val) {
			var pName = post.posterName;
			return pName ? !val || pName.contains(val) : false;
		},
		// 7: #trip
		function spell_trip(post, val) {
			var pTrip = post.posterTrip;
			return pTrip ? !val || pTrip.contains(val) : false;
		},
		// 8: #img
		function spell_img(post, val) {
			var temp, w, h, hide, name, dat, iData = post.imagesData;
			if(!val) {
				return !$isEmpty(iData);
			}
			for(name in iData) {
				dat = iData[name];
				if(temp = val[1]) {
					w = dat.weight;
					switch(val[0]) {
					case 0: hide = w >= temp[0] && w <= temp[1]; break;
					case 1: hide = w < temp[0]; break;
					case 2: hide = w > temp[0];
					}
					if(!hide) {
						continue;
					} else if(!val[2]) {
						return true;
					}
				}
				if(temp = val[2]) {
					w = dat.width;
					h = dat.height;
					switch(val[0]) {
					case 0:
						if(w >= temp[0] && w <= temp[1] && h >= temp[2] && h <= temp[3]) {
							return true
						}
						break;
					case 1:
						if(w < temp[0] && h < temp[3]) {
							return true
						}
						break;
					case 2:
						if(w > temp[0] && h > temp[3]) {
							return true
						}
					}
				}
			}
			return false;
		},
		// 9: #sage
		function spell_sage(post, val) {
			return post.sage;
		},
		// 10: #op
		function spell_op(post, val) {
			return post.isOp;
		},
		// 11: #tlen
		function spell_tlen(post, val) {
			var text = post.text;
			return !val ? !!text : Spells.checkArr(val, text.replace(/\n/g, '').length);
		},
		// 12: #all
		function spell_all(post, val) {
			return true;
		},
		// 13: #video
		Spells.YTubeSpell,
		// 14: #wipe
		function spell_wipe(post, val) {
			var arr, len, i, j, n, x, keys, pop, capsw, casew, _txt, txt = post.text;
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
							Spells._lastWipeMsg = 'same lines: "' + x.substr(0, 20) + '" x' + (j + 1);
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
								Spells._lastWipeMsg = 'same words: "' + x.substr(0, 20) + '" x' + (pop + 1);
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
			// (1 << 5): whitespace
			if(val & 64) {
				if(/(?:\n\s*){5}/i.test(txt)) {
					Spells._lastWipeMsg = 'whitespace';
					return true;
				}
			}
			return false;
		},
		// 15: #num
		function spell_num(post, val) {
			return Spells.checkArr(val, post.count + 1);
		},
		// 16: #vauthor
		Spells.YTubeSpell
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
		opt = val[2] ? [val[2], val[4] ? val[4] : val[3] ? -1 : false] : null;
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
					case 'whitespace': temp |= 64; return false;
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
		// #name, #words, #vauthor
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
					this._error = Lng.seMissOp[lang] + Lng.seRow[lang] + line + Lng.seCol[lang] + col + ')';
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
	_optimizeSpells: function(spells) {
		var i, len, flags, type, spell, neg, scope, parensSpells, newSpells = [];
		for(i = 0, len = spells.length; i < len; ++i) {
			spell = spells[i];
			flags = spell[0];
			type = flags & 0xFF;
			neg = (flags & 0x100) !== 0;
			if(type === 0xFF) {
				parensSpells = this._optimizeSpells(spell[1]);
				if(parensSpells) {
					if(parensSpells.length === 1) {
						newSpells.push([parensSpells[0][0],
							(parensSpells[0][1] | (flags & 0x200)) ^ (flags & 0x100)]);
					} else {
						newSpells.push([flags, parensSpells]);
					}
					continue;
				}
			} else {
				scope = spell[2];
				if(!scope || (scope[0] === brd &&
					(scope[1] === -1 ? !TNum : (!scope[1] || scope[1] === TNum))))
				{
					if(type === 12) {
						neg = !neg;
					} else {
						newSpells.push([flags, spell[1]]);
						continue;
					}
				}
			}
			if(i === len - 1) {
				if(i === 0) {
					return neg ? [[12, '']] : null;
				}
				i = newSpells.length - 1;
				if(neg) {
					while(newSpells[i] && (newSpells[i][0] & 0x200) === 0) {
						delete newSpells[i];
						i -= 2;
					}
					if(i < 0) {
						return [[12, '']];
					}
					if(newSpells[i]) {
						newSpells[i][0] &= 0x1FF;
					}
				} else {
					while(newSpells[i] && (newSpells[i][0] & 0x200) !== 0) {
						delete newSpells[i];
						i -= 2;
					}
					if(i < 0) {
						return null;
					}
				}
				return newSpells.length === 1 && newSpells[0][0] === 0xFF ? newSpells[0][1] : newSpells;
			}
			if(((flags & 0x200) !== 0) ^ neg) {
				return neg ? [[12, '']] : null;
			}
		}
		return newSpells.length === 0 ? null :
			newSpells.length === 1 && newSpells[0][0] === 0xFF ? newSpells[0][1] :
			newSpells;
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
			(val & 64) && temp.push('whitespace');
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
		// #words, #name, #trip, #vauthor
		else if(type === 0 || type === 6 || type === 7 || type === 16) {
			return spell + '(' + val.replace(/\)/g, '\\)') + ')';
		} else {
			return spell + '(' + String(val) + ')';
		}
	},
	_decompileScope: function(scope, indent) {
		var spell, type, temp, str, dScope = [], hScope = false, i = 0, j = 0, len = scope.length;
		for(; i < len; i++, j++) {
			spell = scope[i];
			type = spell[0] & 0xFF;
			if(type === 0xFF) {
				hScope = true;
				temp = this._decompileScope(spell[1], indent + '    ');
				if(temp[1]) {
					str = ((spell[0] & 0x100) ? '!(\n' : '(\n') + indent + '    ' +
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
				dScope[j] = this._decompileSpell(type, spell[0] & 0x100, spell[1], spell[2]);
			}
			if(i !== len - 1) {
				dScope[j] += (spell[0] & 0x200) ? ' &' : ' |';
			}
		}
		return [dScope, dScope.length > 2 || hScope];
	},
	_decompileSpells: function() {
		var str, reps, oreps, data = this._data;
		if(!data) {
			this._read(false);
			if(!(data = this._data)) {
				return this._list = '';
			}
		}
		str = data[1] ? this._decompileScope(data[1], '')[0].join('\n') : '';
		reps = data[2];
		oreps = data[3];
		if(reps || oreps) {
			str += '\n\n';
			reps && reps.forEach(function(rep) {
				str += this._decompileRep(rep, false) + '\n';
			}.bind(this));
			oreps && oreps.forEach(function(orep) {
				str += this._decompileRep(orep, true) + '\n';
			}.bind(this));
			str = str.substr(0, str.length - 1);
		}
		this._data = null;
		return this._list = str;
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
	_continueCheck: function(post, ctx, val) {
		var temp, rv = this._checkRes(ctx.pop(), val);
		if(rv === null) {
			if(this._check(post, ctx)) {
				return;
			}
		} else if(rv) {
			temp = ctx.pop();
			post.spellHide(this._getMsg(ctx.pop()[temp - 1]));
		} else if(!post.deleted) {
			sVis[post.count] = 1;
		}
		this._asyncWrk--;
		this.end(null);
	},
	_check: function(post, ctx) {
		var rv, type, val, temp, deep = ctx[0],
			i = ctx.pop(),
			scope = ctx.pop(),
			len = ctx.pop();
		while(true) {
			if(i < len) {
				temp = scope[i][0];
				type = temp & 0xFF;
				switch(type) {
				case 0xFF:
					ctx.push(len, scope, i);
					scope = scope[i][1];
					len = scope.length;
					i = 0;
					deep++;
					continue;
				case 4:  // #ihash
				case 13: // #video
				case 16: // #vauthor
					ctx[0] = deep;
					val = this._funcs[type](post, scope[i][1], ctx, [len, scope, i + 1, temp]);
					if(val === null) {
						this._asyncWrk++;
						return 0;
					}
					break;
				case 15: // #num
					this.hasNumSpell = true;
				default:
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
			if(deep !== 0) {
				i = ctx.pop();
				scope = ctx.pop();
				len = ctx.pop();
				deep--;
				rv = this._checkRes(scope[i][0], rv);
				if(rv === null) {
					i++;
					continue;
				}
			}
			if(rv) {
				post.spellHide(this._getMsg(scope[i]));
			} else if(!post.deleted) {
				sVis[post.count] = 1;
			}
			return +rv;
		}
	},
	_findReps: function(str) {
		var reps = [],
			outreps = [];
		str = str.replace(
			/([^\\]\)|^)?[\n\s]*(#rep(?:\[([a-z0-9]+)(?:(,)|,(\s*[0-9]+))?\])?\((\/.*?[^\\]\/[ig]*)(?:,\)|,(.*?[^\\])?\)))[\n\s]*/g,
			function(exp, preOp, fullExp, b, nt, t, reg, txt) {
				reps.push([b, nt ? -1 : t, reg, (txt || '').replace(/\\\)/g, ')')]);
				return preOp || '';
			}
		).replace(
			/([^\\]\)|^)?[\n\s]*(#outrep(?:\[([a-z0-9]+)(?:(,)|,(\s*[0-9]+))?\])?\((\/.*?[^\\]\/[ig]*)(?:,\)|,(.*?[^\\])?\)))[\n\s]*/g,
			function(exp, preOp, fullExp, b, nt, t, reg, txt) {
				outreps.push([b, nt ? -1 : t, reg, (txt || '').replace(/\\\)/g, ')')]);
				return preOp || '';
			}
		);
		return [str, reps.length === 0 ? false : reps, outreps.length === 0 ? false : outreps];
	},
	_decompileRep: function(rep, isOrep) {
		return (isOrep ? '#outrep' : '#rep') +
			(rep[0] ? '[' + rep[0] + (rep[1] ? ',' + (rep[1] === -1 ? '' : rep[1]) : '') + ']' : '') +
			'(' + rep[2] + ',' + rep[3] + ')';
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
		this._sLength = spells && spells.length;
		this._reps = this._initReps(reps);
		this._outreps = this._initReps(outreps);
		this.enable = !!this._spells;
		this.haveReps = !!reps;
		this.haveOutreps = !!outreps;
	},
	_read: function(init) {
		var spells, data;
		if(Cfg.hasOwnProperty('spells')) {
			try {
				spells = JSON.parse(Cfg['spells']);
				data = JSON.parse(sessionStorage['de-spells-' + brd + TNum]);
			} catch(e) {}
			if(data && data[0] === spells[0]) {
				this._data = spells;
				if(init) {
					this.hash = data[0];
					this._init(data[1], data[2], data[3]);
				}
				return;
			}
		} else {
			if(data = getStored('DESU_CSpells_' + aib.dm)) {
				delStored('DESU_CSpells_' + aib.dm);
				try {
					spells = JSON.parse(data);
				} catch(e) {}
				if(!spells) {
					this.disable(false);
					return;
				}
			} else {
				spells = this.parseText('#wipe(samelines,samewords,longwords,numbers)');
			}
			saveCfg('spells', data);
		}
		if(init) {
			this.update(spells, false, false);
		} else {
			this._data = spells;
		}
	},
	_asyncWrk: 0,
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
	addCompleteFunc: function(Fn) {
		this._completeFns.push(Fn);
		this._hasComplFns = true;
	},
	parseText: function(str) {
		str = String(str).replace(/[\s\n]+$/, '');
		var reps = this._findReps(str),
			spells = this._compile(reps[0]);
		if(spells !== false) {
			return [Date.now(), spells, reps[1], reps[2]];
		} else if(this._error) {
			$alert(Lng.error[lang] + ' ' + this._error, 'help-err-spell', false);
		}
		return null;
	},
	update: function(data, sync, isHide) {
		var spells = data[1] ? this._optimizeSpells(data[1]) : false,
			reps = this._optimizeReps(data[2]),
			outreps = this._optimizeReps(data[3]);
		saveCfg('spells', JSON.stringify(data));
		sessionStorage['de-spells-' + brd + TNum] = JSON.stringify([data[0], spells, reps, outreps]);
		this._data = data;
		this._list = '';
		this.hash = data[0];
		if(sync) {
			localStorage['__de-spells'] = JSON.stringify({
				'hide': (!!this.list && !!isHide),
				'data': data
			});
			localStorage.removeItem('__de-spells');
		}
		this._init(spells, reps, outreps);
	},
	setSpells: function(spells, sync) {
		this.update(spells, sync, Cfg['hideBySpell']);
		if(Cfg['hideBySpell']) {
			for(var post = firstThr.op; post; post = post.next) {
				this.check(post);
			}
			this.end(savePosts);
		} else {
			this.enable = false;
		}
	},
	disable: function(sync) {
		this.enable = false;
		this._list = '';
		this._data = null;
		this.haveReps = this.haveOutreps = false;
		saveCfg('hideBySpell', false);
	},
	end: function(Fn) {
		if(this._asyncWrk === 0) {
			Fn && Fn();
			if(this._hasComplFns) {
				for(var i = 0, len = this._completeFns.length; i < len; ++i) {
					this._completeFns[i]();
				}
				this._completeFns = [];
				this._hasComplFns = false;
			}
		} else if(Fn) {
			this.addCompleteFunc(Fn);
		}
	},
	check: function(post) {
		if(this.enable) {
			return this._check(post, [0, this._sLength, this._spells, 0]);
		}
		return 0;
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
	},
	addSpell: function(type, arg, scope, isNeg, spells) {
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

function disableSpells() {
	closeAlert($id('de-alert-help-err-spell'));
	if(spells.enable) {
		sVis = TNum ? '1'.repeat(firstThr.pcount).split('') : [];
		for(var post = firstThr.op; post; post = post.next) {
			if(post.spellHidden && !post.userToggled) {
				post.spellUnhide();
			}
		}
	}
}

function toggleSpells() {
	var temp, fld = $id('de-spell-edit'),
		val = fld.value;
	if(val && (temp = spells.parseText(val))) {
		disableSpells();
		spells.setSpells(temp, true);
		fld.value = spells.list;
	} else {
		if(val) {
			localStorage['__de-spells'] = '{"hide": false, "data": null}';
		} else {
			disableSpells();
			spells.disable();
			saveCfg('spells', '');
			localStorage['__de-spells'] = '{"hide": false, "data": ""}';
		}
		localStorage.removeItem('__de-spells');
		$q('input[info="hideBySpell"]', doc).checked = spells.enable = false;
	}
}

function addSpell(type, arg, isNeg) {
	var temp, fld = $id('de-spell-edit'),
		val = fld && fld.value,
		chk = $q('input[info="hideBySpell"]', doc);
	if(!val || (temp = spells.parseText(val))) {
		disableSpells();
		spells.addSpell(type, arg, TNum ? [brd, TNum] : null, isNeg, temp);
		val = spells.list;
		saveCfg('hideBySpell', !!val);
		if(val) {
			for(var post = firstThr.op; post; post = post.next) {
				spells.check(post);
			}
			spells.end(savePosts);
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

function checkPostsVisib() {
	for(var vis, num, date = Date.now(), post = firstThr.op; post; post = post.next) {
		num = post.num;
		if(num in uVis) {
			if(post.isOp) {
				uVis[num][0] = +!(num in hThr[brd]);
			}
			if(uVis[num][0] === 0) {
				post.setUserVisib(true, date, false);
			} else {
				uVis[num][1] = date;
				post.btns.firstChild.className = 'de-btn-hide-user';
				post.userToggled = true;
			}
		} else {
			vis = sVis[post.count];
			if(post.isOp) {
				if(num in hThr[brd]) {
					vis = '0';
				} else if(vis === '0') {
					vis = null;
				}
			}
			if(vis === '0') {
				post.setVisib(true);
				post.spellHidden = true;
			} else if(vis !== '1') {
				spells.check(post);
			}
		}
	}
	spells.end(savePosts);
}

//============================================================================================================
//													STYLES
//============================================================================================================

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
		#de-cfg-head { padding: 4px; border-radius: 10px 10px 0 0; color: #fff; text-align: center; font: bold 14px arial; cursor: default; }\
		#de-cfg-head:lang(en), #de-panel:lang(en) { background: linear-gradient(to bottom, #4b90df, #3d77be 5px, #376cb0 7px, #295591 13px, rgba(0,0,0,0) 13px), linear-gradient(to bottom, rgba(0,0,0,0) 12px, #183d77 13px, #1f4485 18px, #264c90 20px, #325f9e 25px); }\
		#de-cfg-head:lang(fr), #de-panel:lang(fr) { background: linear-gradient(to bottom, #7b849b, #616b86 2px, #3a414f 13px, rgba(0,0,0,0) 13px), linear-gradient(to bottom, rgba(0,0,0,0) 12px, #121212 13px, #1f2740 25px); }\
		#de-cfg-head:lang(de), #de-panel:lang(de) { background: #777; }\
		.de-cfg-body { min-height: 288px; padding: 11px 7px 7px; margin-top: -1px; font: 13px sans-serif; }\
		.de-cfg-body input[type="text"], .de-cfg-body select { width: auto; padding: 0 !important; margin: 0 !important; }\
		.de-cfg-body, #de-cfg-btns { border: 1px solid #183d77; border-top: none; }\
		.de-cfg-body:lang(de), #de-cfg-btns:lang(de) { border-color: #444; }\
		#de-cfg-btns { padding: 7px 2px 2px; }\
		#de-cfg-bar { width: 100%; display: table; background-color: #1f2740; margin: 0; padding: 0; }\
		#de-cfg-bar:lang(en) { background-color: #325f9e; }\
		#de-cfg-bar:lang(de) { background-color: #777; }\
		.de-cfg-depend { padding-left: 25px; }\
		.de-cfg-tab { padding: 4px 6px; border-radius: 4px 4px 0 0; font: bold 12px arial; text-align: center; cursor: default; }\
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
		#de-spell-edit { padding: 2px; width: 350px; height: 200px; border: none !important; outline: none !important; }\
		#de-spell-rowmeter { padding: 2px 3px 0 0; margin: 2px 0; overflow: hidden; width: 2em; height: 202px; text-align: right; color: #fff; font: 12px courier new; }\
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
	gif('#de-btn-expimg', p + 'I9jI+pGwDn4GPL2Wep3rxXFEFel42mBE6kcYXqFqYnVc72jTPtS/KNr5OJOJMdq4diAXWvS065NNVwseehAAA7');
	gif('#de-btn-maskimg', p + 'JQjI+pGwD3TGxtJgezrKz7DzLYRlKj4qTqmoYuysbtgk02ZCG1Rkk53gvafq+i8QiSxTozIY7IcZJOl9PNBx1de1Sdldeslq7dJ9gsUq6QnwIAOw==');
	gif('#de-btn-imgload', p + 'JFjI+pG+CQnHlwSYYu3rz7RoVipWib+aVUVD3YysAledKZHePpzvecPGnpDkBQEEV03Y7DkRMZ9ECNnemUlZMOQc+iT1EAADs=')
	gif('#de-btn-catalog', p + 'I2jI+pa+DhAHyRNYpltbz7j1Rixo0aCaaJOZ2SxbIwKTMxqub6zuu32wP9WsHPcFMs0XDJ5qEAADs=');
	gif('#de-btn-audio-off', p + 'I7jI+pq+DO1psvQHOj3rxTik1dCIzmSZqfmGXIWlkiB6L2jedhPqOfCitVYolgKcUwyoQuSe3WwzV1kQIAOw==');
	gif('#de-btn-audio-on', p + 'JHjI+pq+AewJHs2WdoZLz7X11WRkEgNoHqimadOG7uAqOm+Y6atvb+D0TgfjHS6RIp8YQ1pbHRfA4n0eSTI7JqP8Wtahr0FAAAOw==');
	p = 'Dw8P///wAAACH5BAEAAAIALAAAAAAZABkAQAJElI+pe2EBoxOTNYmr3bz7OwHiCDzQh6bq06QSCUhcZMCmNrfrzvf+XsF1MpjhCSainBg0AbKkFCJko6g0MSGyftwuowAAOw==';
	gif('#de-btn-upd-on', 'R0lGODlhGQAZAJEAADL/Mv' + p);
	gif('#de-btn-upd-off', 'R0lGODlhGQAZAJEAAP8yMv' + p);
	gif('#de-btn-upd-warn', 'R0lGODlhGQAZAJEAAP/0Qf' + p);

	// Post panel
	x += '.de-ppanel { margin-left: 4px; }\
		.de-thread-note { font-style: italic; }\
		.de-post-note { color: inherit; margin: 0 4px; vertical-align: 1px; font: italic bold 12px serif; }\
		.de-btn-hide, .de-btn-hide-user, .de-btn-rep, .de-btn-fav, .de-btn-fav-sel, .de-btn-src, .de-btn-expthr, .de-btn-sage { display: inline-block; margin: 0 4px -2px 0 !important; cursor: pointer; ';
	if(Cfg['postBtnsCSS'] === 0) {
		x += 'color: #4F7942; font-size: 14px; }\
			.de-btn-hide:after { content: "\u2716"; }\
			.de-post-hid .de-btn-hide:after { content: "\u271a"; }\
			.de-btn-hide-user:after { content: "\u2716"; color: red !important; }\
			.de-post-hid .de-btn-hide-user:after { content: "\u271a"; }\
			.de-btn-rep:after { content: "\u25b6"; }\
			.de-btn-expthr:after { content: "\u21d5"; }\
			.de-btn-fav:after { content: "\u2605"; }\
			.de-btn-fav-sel:after { content: "[\u2605]"; }\
			.de-btn-sage:after { content: "\u274e"; }\
			.de-btn-src:after { content: "[S]"; }';
	} else if(Cfg['postBtnsCSS'] === 1) {
		x += 'padding: 0 14px 14px 0; }';
		gif('.de-btn-hide-user', 'R0lGODlhDgAOAKIAAL//v6CgoICAgEtLS////wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA4AQAM8SLLcS2MNQGsUMYi6uB5BKI5hFgojel5YBbDDNcmvpJLkcgLq1jcuSgPmgkUmlJgFAyqNmoEBJEatxggJADs=');
		gif('.de-post-hid .de-btn-hide-user', 'R0lGODlhDgAOAKIAAP+/v6CgoICAgEtLS////wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA4AQAM5SLLcS2ONCcCMIoYdRBVcN4Qkp4ULmWVV20ZTM1SYBJbqvXmA3jk8IMzlgtVYFtkoNCENIJdolJAAADs=');
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
		x += 'padding: 0 14px 14px 0; }';
		gif('.de-btn-hide-user', 'R0lGODlhDgAOAJEAAL//v4yMjP///wAAACH5BAEAAAIALAAAAAAOAA4AAAIdVI55pu2vQJIN2GNpzPdxGHwep01d5pQlyDoMKBQAOw==');
		gif('.de-post-hid .de-btn-hide-user', 'R0lGODlhDgAOAJEAAP+/v4yMjP///wAAACH5BAEAAAIALAAAAAAOAA4AAAIZVI55pu3vAIBI0mOf3LtxDmWUGE7XSTFpAQA7 ');
		p = 'R0lGODlhDgAOAJEAAPDw8IyMjP///wAAACH5BAEAAAIALAAAAAAOAA4AAAI';
		gif('.de-btn-hide', p + 'dVI55pu2vQJIN2GNpzPdxGHwep01d5pQlyDoMKBQAOw==');
		gif('.de-post-hid .de-btn-hide', p + 'ZVI55pu3vAIBI0mOf3LtxDmWUGE7XSTFpAQA7');
		gif('.de-btn-rep', p + 'aVI55pu2vAIBISmrty7rx63FbN1LmiTCUUAAAOw==');
		gif('.de-btn-expthr', p + 'bVI55pu0BwEMxzlonlHp331kXxjlYWH4KowkFADs=');
		gif('.de-btn-fav', p + 'dVI55pu0BwEtxnlgb3ljxrnHP54AgJSGZxT6MJRQAOw==');
		gif('.de-btn-fav-sel','R0lGODlhDgAOAJEAAP/hAIyMjP///wAAACH5BAEAAAIALAAAAAAOAA4AAAIdVI55pu0BwEtxnlgb3ljxrnHP54AgJSGZxT6MJRQAOw==');
		gif('.de-btn-sage','R0lGODlhDgAOAJEAAPDw8FBQUP///wAAACH5BAEAAAIALAAAAAAOAA4AAAIZVI55pu0AgZs0SoqTzdnu5l1P1ImcwmBCAQA7');
		gif('.de-btn-src', p + 'fVI55pt0ADnRh1uispfvpLkEieGGiZ5IUGmJrw7xCAQA7');
	}
	if(!pr.form && !pr.oeForm) {
		x += '.de-btn-rep { display: none; }';
	}

	// Search images buttons
	cont('.de-src-google', 'http://google.com/favicon.ico');
	cont('.de-src-tineye', 'http://tineye.com/favicon.ico');
	cont('.de-src-iqdb', 'http://iqdb.org/favicon.ico');
	cont('.de-src-saucenao', 'http://saucenao.com/favicon.ico');

	// Posts counter
	x += '.de-ppanel-cnt:after { counter-increment: de-cnt 1; content: counter(de-cnt); margin-right: 4px; vertical-align: 1px; color: #4f7942; font: bold 11px tahoma; cursor: default; }\
		.de-ppanel-del:after { content: "' + Lng.deleted[lang] + '"; margin-right: 4px; vertical-align: 1px; color: #727579; font: bold 11px tahoma; cursor: default; }';

	// Text format buttons
	x += '#de-txt-panel { display: block; height: 23px; font-weight: bold; cursor: pointer; }\
		#de-txt-panel > span:empty { display: inline-block; width: 27px; height: 23px; }';
	p = 'R0lGODlhFwAWAJEAAPDw8GRkZAAAAP///yH5BAEAAAMALAAAAAAXABYAQAJ';
	gif('#de-btn-bold:empty', p + 'T3IKpq4YAoZgR0KqqnfzipIUikFWc6ZHBwbQtG4zyonW2Vkb2iYOo8Ps8ZLOV69gYEkU5yQ7YUzqhzmgsOLXWnlRIc9PleX06rnbJ/KITDqTLUAAAOw==');
	gif('#de-btn-italic:empty', p + 'K3IKpq4YAYxRCSmUhzTfx3z3c9iEHg6JnAJYYSFpvRlXcLNUg3srBmgr+RL0MzxILsYpGzyepfEIjR43t5kResUQmtdpKOIQpQwEAOw==');
	gif('#de-btn-under:empty', p + 'V3IKpq4YAoRARzAoV3hzoDnoJNlGSWSEHw7JrEHILiVp1NlZXtKe5XiptPrFh4NVKHh9FI5NX60WIJ6ATZoVeaVnf8xSU4r7NMRYcFk6pzYRD2TIUAAA7');
	gif('#de-btn-strike:empty', p + 'S3IKpq4YAoRBR0qqqnVeD7IUaKHIecjCqmgbiu3jcfCbAjOfTZ0fmVnu8YIHW6lgUDkOkCo7Z8+2AmCiVqHTSgi6pZlrN3nJQ8TISO4cdyJWhAAA7');
	gif('#de-btn-spoil:empty', 'R0lGODlhFwAWAJEAAPDw8GRkZP///wAAACH5BAEAAAIALAAAAAAXABYAQAJBlIKpq4YAmHwxwYtzVrprXk0LhBziGZiBx44hur4kTIGsZ99fSk+mjrMAd7XerEg7xnpLIVM5JMaiFxc14WBiBQUAOw==');
	gif('#de-btn-code:empty', p + 'O3IKpq4YAoZgR0KpqnFxokH2iFm7eGCEHw7JrgI6L2F1YotloKek6iIvJAq+WkfgQinjKVLBS45CePSXzt6RaTjHmNjpNNm9aq6p4XBgKADs=');
	gif('#de-btn-sup:empty', p + 'Q3IKpq4YAgZiSQhGByrzn7YURGFGWhxzMuqqBGC7wRUNkeU7nnWNoMosFXKzi8BHs3EQnDRAHLY2e0BxnWfEJkRdT80NNTrliG3aWcBhZhgIAOw==');
	gif('#de-btn-sub:empty', p + 'R3IKpq4YAgZiSxquujtOCvIUayAkVZEoRcjCu2wbivMw2WaYi7vVYYqMFYq/i8BEM4ZIrYOmpdD49m2VFd2oiUZTORWcNYT9SpnZrTjiML0MBADs=');
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
		.de-img-pre, .de-img-full { display: block; border: none; outline: none; cursor: pointer; }\
		.de-img-pre { max-width: 200px; max-height: 200px; }\
		.de-img-full { float: left; }\
		.de-img-center { position: fixed; z-index: 9999; background-color: #ccc; border: 1px solid black; }\
		.de-mp3, .de-ytube-obj { margin: 5px 20px; }\
		td > a + .de-ytube-obj { display: inline-block; }\
		video { background: black; }';

	// Other
	cont('.de-wait', 'data:image/gif;base64,R0lGODlhEAAQALMMAKqooJGOhp2bk7e1rZ2bkre1rJCPhqqon8PBudDOxXd1bISCef///wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAMACwAAAAAEAAQAAAET5DJyYyhmAZ7sxQEs1nMsmACGJKmSaVEOLXnK1PuBADepCiMg/DQ+/2GRI8RKOxJfpTCIJNIYArS6aRajWYZCASDa41Ow+Fx2YMWOyfpTAQAIfkEBQAADAAsAAAAABAAEAAABE6QyckEoZgKe7MEQMUxhoEd6FFdQWlOqTq15SlT9VQM3rQsjMKO5/n9hANixgjc9SQ/CgKRUSgw0ynFapVmGYkEg3v1gsPibg8tfk7CnggAIfkEBQAADAAsAAAAABAAEAAABE2QycnOoZjaA/IsRWV1goCBoMiUJTW8A0XMBPZmM4Ug3hQEjN2uZygahDyP0RBMEpmTRCKzWGCkUkq1SsFOFQrG1tr9gsPc3jnco4A9EQAh+QQFAAAMACwAAAAAEAAQAAAETpDJyUqhmFqbJ0LMIA7McWDfF5LmAVApOLUvLFMmlSTdJAiM3a73+wl5HYKSEET2lBSFIhMIYKRSimFriGIZiwWD2/WCw+Jt7xxeU9qZCAAh+QQFAAAMACwAAAAAEAAQAAAETZDJyRCimFqbZ0rVxgwF9n3hSJbeSQ2rCWIkpSjddBzMfee7nQ/XCfJ+OQYAQFksMgQBxumkEKLSCfVpMDCugqyW2w18xZmuwZycdDsRACH5BAUAAAwALAAAAAAQABAAAARNkMnJUqKYWpunUtXGIAj2feFIlt5JrWybkdSydNNQMLaND7pC79YBFnY+HENHMRgyhwPGaQhQotGm00oQMLBSLYPQ9QIASrLAq5x0OxEAIfkEBQAADAAsAAAAABAAEAAABE2QycmUopham+da1cYkCfZ94UiW3kmtbJuRlGF0E4Iwto3rut6tA9wFAjiJjkIgZAYDTLNJgUIpgqyAcTgwCuACJssAdL3gpLmbpLAzEQA7');
	x += '.de-abtn { text-decoration: none !important; outline: none; }\
		.de-after-fimg { clear: left; }\
		#de-alert { position: fixed; right: 0; top: 0; z-index: 9999; font: 14px arial; cursor: default; }\
		#de-alert > div { float: right; clear: both; width: auto; min-width: 0pt; padding: 10px; margin: 1px; border: 1px solid grey; white-space: pre-wrap; }\
		.de-alert-btn { display: inline-block; vertical-align: top; color: green; cursor: pointer; }\
		.de-alert-msg { display: inline-block; margin-top: .15em; }\
		.de-content { text-align: left; }\
		.de-content textarea { display: block; margin: 2px 0; font: 12px courier new; ' + (nav.Opera ? '' : 'resize: none !important; ') + '}\
		.de-content-block > a { color: inherit; font-weight: bold; }\
		#de-content-fav, #de-content-hid { font-size: 16px; padding: 10px; border: 1px solid gray; }\
		.de-editor { display: block; font: 12px courier new; width: 619px; height: 337px; tab-size: 4; -moz-tab-size: 4; -o-tab-size: 4; }\
		.de-entry { margin: 2px 0; ' + (nav.Opera ? 'white-space: nowrap; ' : '') + '}\
		.de-entry > :first-child { float: none !important; }\
		.de-entry > div > a { text-decoration: none; }\
		.de-fav-inf-posts, .de-fav-inf-page { float: right; margin-right: 5px; font: bold 16px serif; }\
		.de-fav-inf-old { color: #4f7942; }\
		.de-fav-inf-new { color: blue; }\
		.de-fav-title { margin-right: 15px; }\
		.de-menu { padding: 0 !important; margin: 0 !important; width: auto; min-width: 0; z-index: 9999; border: 1px solid grey;}\
		.de-menu-item { display: block; padding: 3px 10px; color: inherit; text-decoration: none; font: 13px arial; white-space: nowrap; cursor: pointer; }\
		.de-menu-item:hover { background-color: #222; color: #fff; }\
		.de-omitted { color: grey; font-style: italic; }\
		.de-omitted:before { content: "' + Lng.postsOmitted[lang] + '"; }\
		.de-parea { text-align: center;}\
		.de-parea-btn-close:after { content: "' + Lng.hideForm[lang] + '"}\
		.de-parea-btn-thrd:after { content: "' + Lng.makeThrd[lang] + '"}\
		.de-parea-btn-reply:after { content: "' + Lng.makeReply[lang] + '"}\
		.de-ref-hid { text-decoration: line-through !important; }\
		.de-refmap { margin: 10px 4px 4px 4px; font-size: 70%; font-style: italic; }\
		.de-refmap:before { content: "' + Lng.replies[lang] + ' "; }\
		.de-reflink { text-decoration: none; }\
		.de-refcomma:last-child { display: none; }\
		#de-sagebtn { margin-right: 7px; cursor: pointer; }\
		.de-error-key, .de-selected { ' + (nav.Opera ? 'border-left: 4px solid red; border-right: 4px solid red; }' : 'box-shadow: 6px 0 2px -2px red, -6px 0 2px -2px red; }') + '\
		#de-txt-resizer { display: inline-block !important; float: none !important; padding: 6px; margin: -2px -12px; vertical-align: bottom; border-bottom: 2px solid #555; border-right: 2px solid #444; cursor: se-resize; }\
		.de-viewed { color: #888 !important; }\
		.de-pview { position: absolute; width: auto; min-width: 0; z-index: 9999; border: 1px solid grey; margin: 0 !important; display: block !important; }\
		.de-pview-info { padding: 3px 6px !important; }\
		.de-pview-link { font-weight: bold; }\
		.de-opref::after { content: " [OP]"; }\
		.de-hidden' + (aib._4chon ? ', .de-hidden + br' : '') + ', small[id^="rfmap"], body > hr, .theader, .postarea, .thumbnailmsg { display: none !important; }\
		form > hr { clear: both }\
		' + aib.css;

	if(nav.Firefox < 16) {
		x = x.replace(/(transition|keyframes|transform|animation|linear-gradient)/g, nav.cssFix + '$1');
		if(!nav.Opera) {
			x = x.replace(/\(to bottom/g, '(top').replace(/\(to top/g, '(bottom');
		}
	}

	$css(x).id = 'de-css';
	$css('').id = 'de-css-dynamic';
	$css('').id = 'de-css-user';
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
		x += '.de-img-pre, .de-ytube-obj, .thumb, .ca_thumb, img[src*="spoiler"], img[src*="thumb"], img[src^="blob"] { opacity: 0.07 !important; }\
			.de-img-pre:hover, .de-ytube-obj:hover, img[src*="spoiler"]:hover, img[src*="thumb"]:hover, img[src^="blob"]:hover { opacity: 1 !important; }';
	}
	if(Cfg['expandImgs'] === 1 && !(aib.fch || aib.hana || aib.krau)) {
		x += '.de-img-full { margin: 2px 10px; }';
	}
	if(Cfg['delHiddPost']) {
		x += '.de-thr-hid, .de-thr-hid + div + br, .de-thr-hid + div + br + hr { display: none; }';
	}
	if(Cfg['noPostNames']) {
		x += aib.qName + ', .' + aib.cTrip + ' { display: none; }';
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
		if(Cfg['addYouTube']) {
			x += 'div[id^="post_video"] { display: none !important; }';
		}
	}
	$id('de-css-dynamic').textContent = x;
	$id('de-css-user').textContent = Cfg['userCSS'] ? Cfg['userCSSTxt'] : '';
}


//============================================================================================================
//												SCRIPT UPDATING
//============================================================================================================

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
		'url': 'https://raw.github.com/Y0ba/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.meta.js',
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
						'https://raw.github.com/Y0ba/Dollchan-Extension-Tools/master/' +
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


//============================================================================================================
//													POSTFORM
//============================================================================================================

function PostForm(form, ignoreForm, init) {
	this.oeForm = $q('form[name="oeform"], form[action*="paint"]', doc);
	if(aib.abu && ($c('locked', form) || this.oeForm)) {
		this.form = null;
		if(this.oeForm) {
			this._init();
		}
		return;
	}
	if(!ignoreForm && !form) {
		if(this.oeForm) {
			ajaxLoad(aib.getThrdUrl(brd, aib.getTNum(dForm)), false, function(dc) {
				pr = new PostForm($q(aib.qPostForm, dc), true, init);
			}, function(eCode, eMsg) {
				pr = new PostForm(null, true, init);
			});
		} else {
			this.form = null;
		}
		return;
	}
	function $x(path, root) {
		return doc.evaluate(path, root, null, 8, null).singleNodeValue;
	}
	var tr = aib.trTag,
		p = './/' + tr + '[not(contains(@style,"none"))]//input[not(@type="hidden") and ';
	this.tNum = TNum;
	this.form = form;
	this.recap = this._getReCaptcha();
	this.cap = !aib.abu && this._getCaptcha();
	this.txta = $q(tr + ':not([style*="none"]) textarea:not([style*="display:none"])', form);
	this.subm = $q(tr + ' input[type="submit"]', form);
	this.file = $q(tr + ' input[type="file"]', form);
	this.passw = $q(tr + ' input[type="password"]', form);
	this.dpass = $q('input[type="password"], input[name="password"]', dForm);
	this.gothr = $x('.//tr[@id="trgetback"]|.//input[@type="radio" or @name="gotothread"]/ancestor::tr[1]', form);
	this.name = $x(p + '(@name="field1" or @name="name" or @name="internal_n" or @name="nya1" or @name="akane")]', form);
	this.mail = $x(p + (
			aib._410 ? '@name="sage"]' :
			'(@name="field2" or @name="em" or @name="sage" or @name="email" or @name="nabiki" or @name="dont_bump")]'
		), form);
	this.subj = $x(p + '(@name="field3" or @name="sub" or @name="subject" or @name="internal_s" or @name="nya3" or @name="kasumi")]', form);
	this.video = $q(tr + ' input[name="video"], ' + tr + ' input[name="embed"]', form);
	if(init) {
		this._init();
	}
	if(!aib.abu && !this.cap) {
		window.addEventListener('load', function() {
			this.recap = this._getReCaptcha();
			if(this.cap = this._getCaptcha()) {
				this._updateCaptcha();
			}
		}.bind(this), false);
	}
}
PostForm.setUserName = function() {
	var el = $q('input[info="nameValue"]', doc);
	if(el) {
		saveCfg('nameValue', el.value);
	}
	pr.name.value = Cfg['userName'] ? Cfg['nameValue'] : '';
};
PostForm.setUserPassw = function() {
	var el = $q('input[info="passwValue"]', doc);
	if(el) {
		saveCfg('passwValue', el.value);
	}
	(pr.dpass || {}).value = pr.passw.value = Cfg['passwValue'];
};
PostForm.delFileUtils = function(el) {
	$each($Q('.de-file-util', el), $del);
	$each($Q('input[type="file"]', el), function(node) {
		node.imgFile = null;
	});
};
PostForm.eventFiles = function(tr) {
	$each($Q('input[type="file"]', tr), function(el) {
		el.addEventListener('change', PostForm.processInput, false);
	});
};
PostForm.processInput = function() {
	if(!this.haveBtns) {
		this.haveBtns = true;
		$after(this, $new('button', {
			'class': 'de-file-util de-file-del',
			'text': Lng.clear[lang],
			'type': 'button'}, {
			'click': function(e) {
				$pd(e);
				var el = this.parentNode,
					cln = el.cloneNode(false);
				PostForm.delFileUtils(el);
				cln.innerHTML = el.innerHTML;
				el.parentNode.replaceChild(cln, el);
				pr.file = $q('input[type="file"]', cln);
				pr.file.addEventListener('change', PostForm.processInput, false);
			}
		}));
	} else if(this.imgFile) {
		this.imgFile = null;
		$del(this.nextSibling);
	}
	$del($c('de-file-rar', this.parentNode));
	PostForm.eventFiles(getAncestor(this, aib.trTag));
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
						node.style.cssText = 'font-weight: bold; margin: 0 5px; cursor: default;';
						node.title = input.files[0].name + ' + ' + this.name;
						node.textContent = input.files[0].name.replace(/^.+\./, '') + ' + ' +
							this.name.replace(/^.+\./, '')
						input.imgFile = e.target.result;
					}
				}.bind(file, inp, inp.nextSibling);
				fr.readAsArrayBuffer(file);
			}.bind(this, $q('input[type="file"]', this.parentNode));
			el.click();
		}
	}));
};
PostForm.prototype = {
	isQuick: false,
	select: 0,
	pForm: null,
	pArea: [],
	qArea: null,
	addTextPanel: function() {
		var i, len, tag, html, btns, tPanel = $id('de-txt-panel');
		if(!Cfg['addTextBtns']) {
			$del(tPanel);
			return;
		}
		if(!tPanel) {
			tPanel = $new('span', {'id': 'de-txt-panel'}, {
				'click': this,
				'mouseover': this
			});
		}
		tPanel.style.cssFloat = Cfg['txtBtnsLoc'] ? 'none' : 'right';
		$after(Cfg['txtBtnsLoc'] ? $id('de-txt-resizer') || this.txta :
			aib._420 ? $c('popup', this.form) : this.subm, tPanel);
		for(html = '', i = 0, btns = aib.formButtons, len = btns['id'].length; i < len; ++i) {
			tag = btns['tag'][i];
			if(tag === '') {
				continue;
			}
			html += '<span id="de-btn-' + btns['id'][i] + '" title="' + Lng.txtBtn[i][lang] +
				'" de-tag="' + tag + '"' + (btns['bb'][i] ? 'de-bb' : '') + '>' + (
					Cfg['addTextBtns'] === 2 ?
						(i === 0 ? '[ ' : '') + '<a class="de-abtn" href="#">' + btns['val'][i] +
						'</a>' + (i === len - 1 ? ' ]' : ' / ') :
					Cfg['addTextBtns'] === 3 ?
						'<input type="button" value="' + btns['val'][i] + '" style="font-weight: bold;">' : ''
				) + '</span>';
		}
		tPanel.innerHTML = html;
	},
	handleEvent: function(e) {
		var x, start, end, scrtop, id, el = e.target;
		if(el.tagName !== 'SPAN') {
			el = el.parentNode;
		}
		id = el.id;
		if(id.startsWith('de-btn')) {
			if(e.type === 'mouseover') {
				if(id === 'de-btn-quote') {
					quotetxt = $txtSelect();
				}
				return;
			}
			x = pr.txta;
			start = x.selectionStart;
			end = x.selectionEnd;
			if(id === 'de-btn-quote') {
				$txtInsert(x, '> ' + (start === end ? quotetxt : x.value.substring(start, end))
					.replace(/\n/gm, '\n> '));
			} else {
				scrtop = x.scrollTop;
				txt = this._wrapText(el.hasAttribute('de-bb'), el.getAttribute('de-tag'),
					x.value.substring(start, end));
				len = start + txt.length;
				x.value = x.value.substr(0, start) + txt + x.value.substr(end);
				x.setSelectionRange(len, len);
				x.focus();
				x.scrollTop = scrtop;
			}
			$pd(e);
			e.stopPropagation();
		}
	},
	refreshCapImg: function(tNum, isFocus) {
		var src, img;
		if(aib.abu && (img = $id('captcha_div')) && img.hasAttribute('onclick')) {
			img.onclick(isFocus, true);
			return;
		}
		if(!this.cap || (aib.krau && !$q('input[name="captcha_name"]', this.form).hasAttribute('value'))) {
			return;
		}
		img = this.recap ? $id('recaptcha_image') || this.recap : $t('img', getAncestor(this.cap, aib.trTag));
		if(aib.hana || aib.krau || this.recap) {
			img.click();
		} else {
			src = this._refreshCapSrc(img.getAttribute('src'), tNum);
			img.src = '';
			img.src = src;
		}
		this.cap.value = '';
		if(isFocus) {
			this.cap.focus();
		}
		if(this._lastCapUpdate !== 0) {
			this._lastCapUpdate = Date.now();
		}
	},
	showQuickReply: function(post) {
		var el, tNum = post.tNum;
		if(!this.isQuick) {
			this.isQuick = true;
			this.setReply(true, true);
			$t('a', this._pBtn[this.select]).className =
				'de-abtn de-parea-btn-' + (TNum ? 'reply' : 'thrd');
			if(!TNum && !aib.kus && !aib.hana) {
				if(this.oeForm) {
					$del($q('input[name="oek_parent"]', this.oeForm));
					this.oeForm.insertAdjacentHTML('afterbegin', '<input type="hidden" value="' +
						tNum + '" name="oek_parent">');
				}
				if(this.form) {
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
		} else if(post.wrap.nextElementSibling === this.qArea) {
			this.closeQReply();
			return;
		}
		$after(post.wrap, this.qArea);
		if(!TNum) {
			this._toggleQuickReply(tNum);
		}
		if(!this.form) {
			return;
		}
		if(this._lastCapUpdate !== 0 && ((!TNum && this.tNum !== tNum) ||
			Date.now() - this._lastCapUpdate > 3e5))
		{
			this.refreshCapImg(tNum, false);
		}
		this.tNum = tNum;
		if(aib._420 && this.txta.value === 'Comment') {
			this.txta.value = '';
		}
		$txtInsert(this.txta, '>>' + post.num + (quotetxt || '').replace(/(?:^|\n)(.)/gm, '\n> $1') + '\n');
		if(Cfg['addPostForm'] === 3) {
			el = $t('a', this.qArea.firstChild);
			el.href = aib.getThrdUrl(brd, tNum);
			el.textContent = '#' + tNum;
		}
	},
	closeQReply: function() {
		if(this.isQuick) {
			this.isQuick = false;
			if(!TNum) {
				this._toggleQuickReply(0);
				$del($id('thr_id'));
			}
			this.setReply(false, TNum && Cfg['addPostForm'] < 2);
		}
	},
	setReply: function(quick, visible) {
		if(quick) {
			this.qArea.appendChild(this.pForm);
		} else {
			$after(this.pArea[this.select], this.qArea);
			$after(this._pBtn[this.select], this.pForm);
		}
		this.qArea.style.display = quick ? '' : 'none';
		this.pForm.style.display = visible ? '' : 'none';
		this.updatePAreaBtns();
	},
	toggleMainReply: function(e) {
		$pd(e);
		var select = +!(e.target.parentNode.parentNode.id === 'de-parea-up');
		if(this.isQuick) {
			this.select = select;
			this.closeQReply();
		} else {
			if(this.select === select) {
				$disp(this.pForm);
				this.updatePAreaBtns();
			} else {
				this.select = select;
				this.setReply(false, true);
			}
		}
	},
	updatePAreaBtns: function() {
		var txt = 'de-abtn de-parea-btn-',
			rep = TNum ? 'reply' : 'thrd';
		$t('a', this._pBtn[this.select]).className = txt + (this.pForm.style.display === '' ? 'close' : rep);
		$t('a', this._pBtn[+!this.select]).className = txt + rep;
	},

	_lastCapUpdate: 0,
	_pBtn: [],
	_getCaptcha: function() {
		return $q('input[type="text"][name*="aptcha"]:not([name="recaptcha_challenge_field"])', this.form) ||
			this.recap;
	},
	_getReCaptcha: function() {
		return $id('recaptcha_response_field');
	},
	_init: function() {
		this.pForm = $New('div', {'id': 'de-pform'}, [this.form, this.oeForm]);
		var btn = $New('div', null, [
			$txt('['),
			$new('a', {'href': '#'}, null),
			$txt(']')
		]);
		$before(dForm, this.pArea[0] =
			$New('div', {'class': 'de-parea', 'id': 'de-parea-up'}, [btn, doc.createElement('hr')]));
		this._pBtn[0] = btn;
		btn.addEventListener('click', this.toggleMainReply.bind(this), true);
		btn = btn.cloneNode(true);
		btn.addEventListener('click', this.toggleMainReply.bind(this), true);
		$after(aib.fch ? $c('board', dForm) : dForm, this.pArea[1] =
			$New('div', {'class': 'de-parea', 'id': 'de-parea-down'}, [btn, doc.createElement('hr')]));
		this._pBtn[1] = btn;
		this.qArea = $add('<div id="de-qarea" class="' + aib.cReply + '" style="display: none;"></div>');
		this.select = +(Cfg['addPostForm'] === 1);
		this.setReply(false, TNum && Cfg['addPostForm'] < 2);
		if(Cfg['addPostForm'] === 3) {
			$append(this.qArea, [
				$add('<span id="de-qarea-target">' + Lng.replyTo[lang] + ' <a class="de-abtn"></a></span>'),
				$new('span', {'id': 'de-qarea-close', 'text': '\u2716'}, {'click': this.closeQReply.bind(this)})
			]);
		}
		if(aib.tire) {
			$each($Q('input[type="hidden"]', dForm), $del);
			dForm.appendChild($c('userdelete', doc.body));
			this.dpass = $q('input[type="password"]', dForm);
		}
		if(this.form) {
			this._initForm();
		}
	},
	_initForm: function() {
		this.form.style.display = 'inline-block';
		this.form.style.textAlign = 'left';
		if(nav.Firefox) {
			this.txta.addEventListener('mouseup', function() {
				saveCfg('textaWidth', parseInt(this.style.width, 10));
				saveCfg('textaHeight', parseInt(this.style.height, 10));
			}, false);
		} else {
			this.txta.insertAdjacentHTML('afterend', '<div id="de-txt-resizer"></div>');
			this.txta.nextSibling.addEventListener('mousedown', {
				el: this.txta,
				elStyle: this.txta.style,
				handleEvent: function(e) {
					switch(e.type) {
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
		this.addTextPanel();
		this.txta.style.cssText = 'padding: 0; resize: both; width: ' +
			Cfg['textaWidth'] + 'px; height: ' + Cfg['textaHeight'] + 'px;';
		this.txta.addEventListener('keypress', function(e) {
			var code = e.charCode || e.keyCode;
			if((code === 33 || code === 34) && e.which === 0) {
				e.target.blur();
				window.focus();
			}
		}, false);
		this.subm.addEventListener('click', function(e) {
			var temp, val = this.txta.value,
				sVal = Cfg['signatValue'];
			if(Cfg['warnSubjTrip'] && this.subj && /#.|##./.test(this.subj.value)) {
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
			if(this.tNum && pByNum[this.tNum].subj === 'Dollchan Extension Tools') {
				temp = '\n\n' + this._wrapText(aib.formButtons.bb[5], aib.formButtons.tag[5],
					'-'.repeat(50) + '\n' + navigator.userAgent + '\nv' + version);
				if(!val.contains(temp)) {
					val += temp;
				}
			}
			this.txta.value = val;
			if(Cfg['ajaxReply']) {
				$alert(Lng.checking[lang], 'upload', true);
			}
			if(Cfg['favOnReply'] && this.tNum) {
				toggleFavorites(pByNum[this.tNum], $c('de-btn-fav', pByNum[this.tNum].btns));
			}
			if(this.video && (val = this.video.value) && (val = val.match(youTube.regex))) {
				this.video.value = aib.nul ? val[1] : 'http://www.youtube.com/watch?v=' + val[1];
			}
			if(this.isQuick) {
				$disp(this.pForm);
				$disp(this.qArea);
				$after(this._pBtn[this.select], this.pForm);
			}
		}.bind(this), false);
		$each($Q('input[type="text"], input[type="file"]', this.form), function(node) {
			node.size = 30;
		});
		if(Cfg['noGoto'] && this.gothr) {
			$disp(this.gothr);
		}
		if(Cfg['noPassword'] && this.passw) {
			$disp(getAncestor(this.passw, aib.trTag));
		}
		window.addEventListener('load', function() {
			if(Cfg['userName'] && this.name) {
				setTimeout(PostForm.setUserName, 1e3);
			}
			if(this.passw) {
				setTimeout(PostForm.setUserPassw, 1e3);
			}
		}.bind(this), false);
		if(this.cap) {
			this._updateCaptcha();
		}
		if(Cfg['addSageBtn'] && this.mail) {
			btn = $new('span', {'id': 'de-sagebtn'}, {'click': function(e) {
				e.stopPropagation();
				$pd(e);
				toggleCfg('sageReply');
				this._setSage();
			}.bind(this)});
			el = getAncestor(this.mail, 'LABEL') || this.mail;
			if(el.nextElementSibling || el.previousElementSibling) {
				$disp(el);
				$after(el, btn);
			} else {
				$disp(getAncestor(this.mail, aib.trTag));
				$after(this.name || this.subm, btn);
			}
			this._setSage();
		}
		if(Cfg['ajaxReply'] === 2) {
			this.form.onsubmit = function(e) {
				$pd(e);
				new html5Submit(this.form, this.subm, checkUpload);
			}.bind(this);
			dForm.onsubmit = $pd;
			if(btn = $q(aib.qDelBut, dForm)) {
				btn.onclick = function(e) {
					$pd(e);
					this.closeQReply();
					$alert(Lng.deleting[lang], 'deleting', true);
					new html5Submit(dForm, e.target, checkDelete);
				}.bind(this);
			}
		} else if(Cfg['ajaxReply'] === 1) {
			dForm.insertAdjacentHTML('beforeend',
				'<iframe name="de-iframe-pform" src="about:blank" style="display: none;"></iframe>' +
				'<iframe name="de-iframe-dform" src="about:blank" style="display: none;"></iframe>'
			);
			this.form.target = 'de-iframe-pform';
			this.form.onsubmit = null;
			dForm.target = 'de-iframe-dform';
			dForm.onsubmit = function() {
				this.closeQReply();
				$alert(Lng.deleting[lang], 'deleting', true);
			}.bind(this);
		}
		if(this.file) {
			PostForm.eventFiles(getAncestor(this.file, aib.trTag));
		}
	},
	_refreshCapSrc: function(src, tNum) {
		if(aib.kus || aib.tinyIb) {
			return src.replace(/\?[^?]+$|$/, (aib._410 ? '?board=' + brd + '&' : '?') + Math.random());
		}
		if(tNum > 0) {
			src = src.replace(/mainpage|res\d+/ig, 'res' + tNum);
		}
		return src.replace(/dummy=[\d\.]*/, 'dummy=' + Math.random());
	},
	_setSage: function() {
		var c = Cfg['sageReply'];
		$id('de-sagebtn').innerHTML = '&nbsp;' + (
			c ? '<span class="de-btn-sage"></span><b style="color: red;">SAGE</b>' : '<i>(no&nbsp;sage)</i>'
		);
		if(this.mail.type === 'text') {
			this.mail.value = c ? 'sage' : aib.fch ? 'noko' : '';
		} else {
			this.mail.checked = c;
		}
	},
	_toggleQuickReply: function(tNum) {
		if(this.oeForm) {
			$q('input[name="oek_parent"], input[name="replyto"]', this.oeForm).value = tNum;
		}
		if(this.form) {
			$q('#thr_id, input[name*="thread"]', this.form).value = tNum;
			if(aib.pony) {
				$q('input[name="quickreply"]', this.form).value = tNum || '';
			}
		}
	},
	_updateCaptcha: function() {
		var img, _img;
		if(this.recap && (img = $id('recaptcha_image'))) {
			img.setAttribute('onclick', 'Recaptcha.reload()');
			img.style.cssText = 'width: 300px; cursor: pointer;';
		}
		if(aib.krau) {
			$id('captcha_image').setAttribute('onclick',  'requestCaptcha(true);');
		}
		this.cap.autocomplete = 'off';
		this.cap.onfocus = function() {
			if(this._lastCapUpdate !== 0 && Date.now() - this._lastCapUpdate > 3e5) {
				this.refreshCapImg(this.tNum || 0, false);
			}
		}.bind(this);
		this.cap.onkeypress = (function() {
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
		if(aib.hana || aib.krau || this.recap) {
			return;
		}
		this._lastCapUpdate = Date.now();
		img = $q('a, img', getAncestor(this.cap, aib.trTag));
		_img = $new('img', {
			'alt': Lng.loading[lang],
			'title': Lng.refresh[lang],
			'style': 'display: block; border: none; cursor: pointer;'}, {
			'click': this.refreshCapImg.bind(this, TNum || 0, true)
		});
		if(img) {
			img.parentNode.replaceChild(_img, img);
		} else {
			while(this.cap.nextSibling) {
				$del(this.cap.nextSibling);
			}
			$after(this.cap, _img);
		}
		setTimeout(function(i) {
			i.src = this._refreshCapSrc(
				aib._410 ? ('/faptcha.php?board=' + brd) :
					aib.hid ? ('/securimage/securimage_show.php?' + Math.random()) :
					aib.kus ? '/' + brd.substr(0, brd.indexOf('/') + 1) + 'captcha.php?' + Math.random() :
					(img ? img.src : '/' + brd + '/captcha.pl?key=mainpage&amp;dummy=' + Math.random()),
				TNum || 0
			);
		}.bind(this, _img), 50);
	},
	_wrapText: function(isBB, tag, text) {
		var m;
		if(isBB) {
			if(text.contains('\n')) {
				return '[' + tag + ']' + text + '[/' + tag + ']';
			}
			m = text.match(/^(\s*)(.*?)(\s*)$/);
			return m[1] + '[' + tag + ']' + m[2] + '[/' + tag + ']' + m[3];
		}
		for(var rv = '', i = 0, arr = text.split('\n'), len = arr.length; i < len; ++i) {
			m = arr[i].match(/^(\s*)(.*?)(\s*)$/);
			rv += '\n' + m[1] + (tag === '^H' ? m[2] + '^H'.repeat(m[2].length) :
				tag + m[2] + tag) + m[3];
		}
		return rv.slice(1);
	}
}

function addImagesSearch(el) {
	for(var link, i = 0, els = $Q(aib.qImgLink, el), len = els.length; i < len; i++) {
		link = els[i];
		if(/google\.|tineye\.com|iqdb\.org/.test(link.href)) {
			$del(link);
			continue;
		}
		if(link.firstElementChild) {
			continue;
		}
		link.insertAdjacentHTML('beforebegin', '<span class="de-btn-src"></span>');
	}
}

function embedImagesLinks(el) {
	for(var a, link, i = 0, els = $Q(aib.qMsgImgLink, el); link = els[i++];) {
		if(link.parentNode.tagName === 'SMALL') {
			return;
		}
		a = link.cloneNode(false);
		a.target = '_blank';
		a.innerHTML = '<img class="de-img-pre" src="' + a.href + '" alt="' + a.href + '">';
		$before(link, a);
	}
}

//============================================================================================================
//												IMAGES FUNCTIONS
//============================================================================================================

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
	for(i = 0, j = 0; i < tmp; i++, j += 4) {
		buf[i] = buf[j] * 0.3 + buf[j + 1] * 0.59 + buf[j + 2] * 0.11;
	}
	for(i = 0; i < newh; i++) {
		for(j = 0; j < neww; j++) {
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
			if(g = hash & 0xF0000000) {
				hash ^= g >>> 24;
			}
			hash &= ~g;
		}
	}
	return {hash: hash};
}

function ImageData(post, src, el) {
	this.el = el;
	this.post = post;
	this.src = src;
}
ImageData.prototype = {
	expanded: false,
	get data() {
		var img = this.el,
			cnv = this._glob.canvas,
			w = cnv.width = img.naturalWidth,
			h = cnv.height = img.naturalHeight,
			ctx = cnv.getContext('2d');
		ctx.drawImage(img, 0, 0);
		return [ctx.getImageData(0, 0, w, h).data.buffer, w, h];
	},
	get infoEl() {
		var val = $c(aib.cFileInfo, this.wrap);
		Object.defineProperty(this, 'infoEl', { value: val });
		return val;
	},
	get info() {
		var el = this.infoEl, val = el ? el.textContent : '';
		Object.defineProperty(this, 'info', { value: val });
		return val;
	},
	get isImage() {
		var val = /\.jpe?g|\.png|\.gif|^blob:/i.test(this.src);
		Object.defineProperty(this, 'isImage', { value: val });
		return val;
	},
	get hash() {
		var hash;
		if(this.el.complete) {
			hash = this._getHash(false);
			if(hash !== null) {
				return hash;
			}
		} else {
			this.el.onload = this.el.onerror = this._onload.bind(this);
		}
		this.post.hashImgsBusy++;
		return null;
	},
	get hashSync() {
		var hash;
		if(this.hasOwnProperty('hash')) {
			hash = this.hash;
		} else {
			hash = this._getHash(true);
		}
		Object.defineProperty(this, 'hashSync', { value: hash });
		return hash;
	},
	get height() {
		var dat = aib.getImgSize(this.infoEl, this.info);
		Object.defineProperties(this, {
			'width': { value: dat[0] },
			'height': { value: dat[1] }
		});
		return dat[1];
	},
	get fullSrc() {
		var val = aib.getImgLink(this.el).href;
		Object.defineProperty(this, 'src', { value: val });
		return val;
	},
	get weight() {
		var val = aib.getImgWeight(this.info);
		Object.defineProperty(this, 'weight', { value: val });
		return val;
	},
	get width() {
		var dat = aib.getImgSize(this.infoEl, this.info);
		Object.defineProperties(this, {
			'width': { value: dat[0] },
			'height': { value: dat[1] }
		});
		return dat[0];
	},
	get wrap() {
		var val = aib.getPicWrap(this.el.parentNode);
		Object.defineProperty(this, 'wrap', { value: val });
		return val;
	},

	_glob: {
		get canvas() {
			var val = doc.createElement('canvas');
			Object.defineProperty(this, 'canvas', { value: val });
			return val;
		},
		get storage() {
			try {
				var val = JSON.parse(sessionStorage['de-imageshash']);
			} finally {
				if(!val) {
					val = {};
				}
				spells.addCompleteFunc(this._saveStorage.bind(this));
				Object.defineProperty(this, 'storage', { value: val });
				return val;
			}
		},
		get workers() {
			var val = new workerQueue(4, genImgHash, function(e) {});
			spells.addCompleteFunc(this._clearWorkers.bind(this));
			Object.defineProperty(this, 'workers', { value: val, configurable: true });
			return val;
		},

		_saveStorage: function() {
			sessionStorage['de-imageshash'] = JSON.stringify(this.storage);
		},
		_clearWorkers: function() {
			this.workers.clear();
			delete this.workers;
		},
	},
	_getHash: function(sync) {
		var data, val;
		if(this.el.naturalWidth + this.el.naturalHeight === 0) {
			val = -1;
		} else if(this.src in this._glob.storage) {
			val = this._glob.storage[this.src];
		} else {
			data = this.data;
			if(sync) {
				val = genImgHash(data).hash;
			} else {
				this._glob.workers.run(data, [data[0]], this._wrkEnd.bind(this));
				return null;
			}
		}
		Object.defineProperty(this, 'hash', { value: val });
		return val;
	},
	_onload: function(Fn, arg) {
		var hash = this._getHash(false);
		if(hash !== null) {
			this.post.hashImgsBusy--;
			if(this.post.hashHideFun !== null) {
				this.post.hashHideFun(hash);
			}
		}
	},
	_wrkEnd: function(data) {
		var hash = data.hash;
		Object.defineProperty(this, 'hash', { value: hash });
		this.post.hashImgsBusy--;
		if(this.post.hashHideFun !== null) {
			this.post.hashHideFun(hash);
		}
		this._glob.storage[this.src] = hash;
	}
}

function ImageMover(img) {
	this.el = img;
	this.elStyle = img.style;
	img.addEventListener(nav.Firefox ? 'DOMMouseScroll' : 'mousewheel', this, false);
	img.addEventListener('mousedown', this, false);
}
ImageMover.prototype = {
	curX: 0,
	curY: 0,
	moved: false,
	handleEvent: function(e) {
		switch(e.type) {
		case 'mousedown':
			this.curX = e.clientX - parseInt(this.elStyle.left, 10);
			this.curY = e.clientY - parseInt(this.elStyle.top, 10);
			doc.body.addEventListener('mousemove', this, false);
			doc.body.addEventListener('mouseup', this, false);
			break;
		case 'mousemove':
			this.elStyle.left = e.clientX - this.curX + 'px';
			this.elStyle.top = e.clientY - this.curY + 'px';
			this.moved = true;
			return;
		case 'mouseup':
			doc.body.removeEventListener('mousemove', this, false);
			doc.body.removeEventListener('mouseup', this, false);
			return;
		default: // wheel event
			var curX = e.clientX,
				curY = e.clientY,
				oldL = parseInt(this.elStyle.left, 10),
				oldT = parseInt(this.elStyle.top, 10),
				oldW = parseFloat(this.elStyle.width || this.el.width),
				oldH = parseFloat(this.elStyle.height || this.el.height),
				d = nav.Firefox ? -e.detail : e.wheelDelta,
				newW = oldW * (d > 0 ? 1.25 : 0.8),
				newH = oldH * (d > 0 ? 1.25 : 0.8);
			this.elStyle.width = newW + 'px';
			this.elStyle.height = newH + 'px';
			this.elStyle.left = parseInt(curX - (newW/oldW) * (curX - oldL), 10) + 'px';
			this.elStyle.top = parseInt(curY - (newH/oldH) * (curY - oldT), 10) + 'px';
		}
		$pd(e);
	}
};

//============================================================================================================
//													POST
//============================================================================================================

function Post(el, thr, num, count, isOp, prev) {
	var h, ref, html;
	this.count = count;
	this.el = el;
	this.isOp = isOp;
	this.num = num;
	this._pref = ref = $q(aib.qRef, el);
	this.prev = prev;
	this.thr = thr;
	if(prev) {
		prev.next = this;
	}
	el.post = this;
	html = '<span class="de-ppanel ' + (isOp ? '' : 'de-ppanel-cnt') +
		'"><span class="de-btn-hide"></span><span class="de-btn-rep"></span>';
	if(isOp) {
		if(!TNum && !aib.arch) {
			html += '<span class="de-btn-expthr"></span>';
		}
		h = aib.host;
		if(Favor[h] && Favor[h][brd] && Favor[h][brd][num]) {
			html += '<span class="de-btn-fav-sel"></span>';
			Favor[h][brd][num]['cnt'] = thr.pcount;
		} else {
			html += '<span class="de-btn-fav"></span>';
		}
	}
	ref.insertAdjacentHTML('afterend', html + (
		this.sage ? '<span class="de-btn-sage" title="SAGE"></span>' : ''
	) + '</span>');
	this.btns = ref.nextSibling;
	if(Cfg['expandPosts'] === 1 && this.trunc) {
		this._getFull(this.trunc, true);
	}
	el.addEventListener('click', this, true);
	el.addEventListener('mouseover', this, true);
	el.addEventListener('mouseout', this, true);
}
Post.getWrds = function(text) {
	return text.replace(/\s+/g, ' ').replace(/[^a-zа-яё ]/ig, '').substring(0, 800).split(' ');
};
Post.findSameText = function(oNum, oHid, oWords, date, post) {
	var j, words = Post.getWrds(post.text),
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
	if(oHid) {
		post.note = '';
		if(!post.spellHidden) {
			post.setVisib(false);
		}
		if(post.userToggled) {
			delete uVis[post.num];
			post.userToggled = false;
		}
	} else {
		post.setUserVisib(true, date, true);
		post.note = 'similar to >>' + oNum;
	}
	return false;
};
Post.sizing = {
	get wHeight() {
		var val = window.innerHeight;
		if(!this._enabled) {
			window.addEventListener('resize', this, false);
			this._enabled = true;
		}
		Object.defineProperty(this, 'wHeight', { writable: true, value: val });
		return val;
	},
	get wWidth() {
		var val = doc.documentElement.clientWidth;
		if(!this._enabled) {
			window.addEventListener('resize', this, false);
			this._enabled = true;
		}
		Object.defineProperty(this, 'wWidth', { writable: true, value: val });
		return val;
	},
	getOffset: function(el) {
		return el.getBoundingClientRect().left + window.pageXOffset;
	},
	getCachedOffset: function(pCount, el) {
		if(pCount === 0) {
			return this._opOffset === -1 ? this._opOffset = this.getOffset(el) : this._opOffset;
		}
		if(pCount > 4) {
			return this._pOffset === -1 ? this._pOffset = this.getOffset(el) : this._pOffset;
		}
		return this.getOffset(el);
	},
	handleEvent: function() {
		this.wHeight = window.innerHeight;
		this.wWidth = doc.documentElement.clientWidth;
	},

	_enabled: false,
	_opOffset: -1,
	_pOffset: -1
};
Post.prototype = {
	banned: false,
	deleted: false,
	hasRef: false,
	hasYTube: false,
	hidden: false,
	hashHideFun: null,
	hashImgsBusy: 0,
	index: 0,
	inited: true,
	kid: null,
	next: null,
	omitted: false,
	parent: null,
	prev: null,
	spellHidden: false,
	userToggled: false,
	viewed: false,
	ytHideFun: null,
	ytInfo: null,
	ytLinksLoading: 0,
	addFuncs: function() {
		updRefMap(this, true);
		embedMP3Links(this);
		if(Cfg['addImgs']) {
			embedImagesLinks(this.el);
		}
		if(isExpImg) {
			this.toggleImages(true);
		}
	},
	handleEvent: function(e) {
		var temp, el = e.target,
			type = e.type;
		if(type === 'click') {
			if(e.button !== 0) {
				return;
			}
			switch(el.tagName) {
			case 'IMG':
				if(el.className === 'de-ytube-image') {
					if(Cfg['addYouTube'] === 3) {
						youTube.addPlayer(this.ytObj, this.ytInfo);
						$pd(e);
					}
				} else if(Cfg['expandImgs'] !== 0) {
					this._clickImage(el, e);
				}
				return;
			case 'A':
				if(el.className === 'de-ytube-link') {
					var m = el.ytInfo;
					if(this.ytInfo === m) {
						this.ytObj.innerHTML = '';
						this.ytInfo = null;
					} else if(Cfg['addYouTube'] > 2) {
						youTube.addImage(this.ytObj, this.ytInfo = m);
					} else {
						youTube.addPlayer(this.ytObj, this.ytInfo = m);
					}
					$pd(e);
				} else {
					temp = el.parentNode;
					if(temp === this.trunc) {
						this._getFull(temp, false);
						$pd(e);
						e.stopPropagation();
					} else if(aib.brit) {
						if(temp.className === 'reflink') {
							el.removeAttribute('onclick');
							el.target = '_blank';
							if(this.isOp) {
								el.href = aib.getThrdUrl(brd, this.num);
							} else {
								el.href = aib.getThrdUrl(brd, this.tNum) + '#' + this.num;
							}
						}
					} else if(Cfg['insertNum'] && pr.form && temp === this._pref &&
						!/Reply|Ответ/.test(el.textContent))
					{
						if(TNum && Cfg['addPostForm'] > 1 && !pr.isQuick) {
							pr.showQuickReply(this);
						} else {
							if(aib._420 && pr.txta.value === 'Comment') {
								pr.txta.value = '';
							}
							$txtInsert(pr.txta, '>>' + this.num);
						}
						$pd(e);
						e.stopPropagation();
					}
				}
				return;
			}
			switch(el.className) {
			case 'de-btn-expthr':
				this.thr.load(1, this.el, null);
				$del(this._menu);
				this._menu = null;
				return;
			case 'de-btn-fav':
			case 'de-btn-fav-sel':
				toggleFavorites(this, el);
				return;
			case 'de-btn-hide':
			case 'de-btn-hide-user':
				this.toggleUserVisib();
				$del(this._menu);
				this._menu = null;
				return;
			case 'de-btn-rep': pr.showQuickReply(this); return;
			case 'de-btn-sage':
				addSpell(9, '', false);
				return;
			}
			if(el.classList[0] === 'de-menu-item') {
				this._clickMenu(el);
			}
			return;
		}
		switch(el.classList[0]) {
		case 'de-reflink':
		case 'de-preflink':
			if(Cfg['linksNavig']) {
				if(type === 'mouseover') {
					clearTimeout(Pview.delTO);
					this._linkDelay = setTimeout(this._addPview.bind(this, el), Cfg['linksOver']);
				} else {
					this._eventRefLinkOut(e);
				}
				$pd(e);
				e.stopPropagation();
			}
			return;
		case 'de-btn-hide':
		case 'de-btn-hide-user':
			if(type === 'mouseover') {
				this._menuDelay = setTimeout(this._addMenu.bind(this, el, 'hide'), Cfg['linksOver']);
			} else {
				this._closeMenu(e.relatedTarget);
			}
			return;
		case 'de-btn-rep':
			if(type === 'mouseover') {
				quotetxt = $txtSelect();
			}
			return;
		case 'de-btn-expthr':
			if(type === 'mouseover') {
				this._menuDelay = setTimeout(this._addMenu.bind(this, el, 'expand'), Cfg['linksOver']);
			} else {
				this._closeMenu(e.relatedTarget);
			}
			return;
		case 'de-btn-src':
			if(type === 'mouseover') {
				this._menuDelay = setTimeout(this._addMenu.bind(this, el, 'imgsrc'), Cfg['linksOver']);
			} else {
				this._closeMenu(e.relatedTarget);
			}
			break;
		case 'de-menu':
		case 'de-menu-item':
			if(type === 'mouseover') {
				clearTimeout(this._menuDelay);
			} else {
				this._closeMenu(e.relatedTarget);
			}
			return;
		}
		if(Cfg['linksNavig'] && el.tagName === 'A' && !el.lchecked) {
			if(el.textContent.startsWith('>>')) {
				el.className = 'de-preflink ' + el.className;
				clearTimeout(Pview.delTO);
				this._linkDelay = setTimeout(this._addPview.bind(this, el), Cfg['linksOver']);
				$pd(e);
				e.stopPropagation();
			} else {
				el.lchecked = true;
			}
			return;
		}
		if(this._isPview) {
			if(type === 'mouseout') {
				temp = e.relatedTarget;
				if(Pview.top && (!temp || (!Pview.getPview(temp) && !temp.classList.contains('de-imgmenu')))) {
					Pview.top.markToDel();
				}
			} else {
				temp = Pview.getPview(e.relatedTarget);
				if(!temp || temp.post !== this) {
					if(this.kid) {
						this.kid.markToDel();
					} else {
						clearTimeout(Pview.delTO);
					}
				}
			}
		}
	},
	hideRefs: function() {
		if(!Cfg['hideRefPsts'] || !this.hasRef) {
			return;
		}
		this.ref.forEach(function(num) {
			var pst = pByNum[num];
			if(pst && !pst.userToggled) {
				pst.setVisib(true);
				pst.note = 'reference to >>' + this.num;
				pst.hideRefs();
			}
		}, this);
	},
	get html() {
		var val = this.el.innerHTML;
		Object.defineProperty(this, 'html', { configurable: true,  value: val });
		return val;
	},
	get imagesData() {
		var i, len, src, els = getImages(this.el),
			data = {};
		for(i = 0, len = els.length; i < len; i++) {
			el = els[i];
			src = el.src;
			data[src] = new ImageData(this, src, el);
		}
		if(len > 0) {
			Object.defineProperties(data, {
				'$first': { value: data[els[0].src] },
				'$firstSrc': { value: els[0].src }
			});
		}
		Object.defineProperty(this, 'imagesData', { value: data });
		return data;
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
	set note(val) {
		if(this.isOp) {
			this.noteEl.textContent = val ? '(autohide: ' + val + ')' : '(' + this.title + ')';
		} else if(!Cfg['delHiddPost']) {
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
		var pName = $q(aib.qName, this.el), val = pName ? pName.textContent : '';
		Object.defineProperty(this, 'posterName', { value: val });
		return val;
	},
	get posterTrip() {
		var pTrip = $c(aib.cTrip, this.el), val = pTrip ? pTrip.textContent : '';
		Object.defineProperty(this, 'posterTrip', { value: val });
		return val;
	},
	get ref() {
		var val = [];
		Object.defineProperty(this, 'ref', { configurable: true, value: val });
		return val;
	},
	get sage() {
		var val = aib.getSage(this.el);
		Object.defineProperty(this, 'sage', { value: val });
		return val;
	},
	select: function() {
		if(this.isOp) {
			if(this.hidden) {
				this.thr.el.previousElementSibling.classList.add('de-selected');
			}
			this.thr.el.classList.add('de-selected');
		} else {
			this.el.classList.add('de-selected');
		}
	},
	setUserVisib: function(hide, date, sync) {
		this.setVisib(hide);
		this.btns.firstChild.className = 'de-btn-hide-user';
		this.userToggled = true;
		if(hide) {
			this.note = '';
			this.hideRefs();
		} else {
			this.unhideRefs();
		}
		uVis[this.num] = [+!hide, date];
		if(sync) {
			localStorage['__de-post'] = JSON.stringify({
				'brd': brd,
				'date': date,
				'isOp': this.isOp,
				'num': this.num,
				'hide': hide,
				'title': this.isOp ? this.title : ''
			});
			localStorage.removeItem('__de-post');
		}
	},
	setVisib: function(hide) {
		var el, tEl;
		if(this.hidden === hide) {
			return;
		}
		if(this.isOp) {
			this.hidden = this.thr.hidden = hide;
			tEl = this.thr.el;
			tEl.style.display = hide ? 'none' : '';
			el = $id('de-thr-hid-' + this.num);
			if(el) {
				el.style.display = hide ? '' : 'none';
			} else {
				tEl.insertAdjacentHTML('beforebegin', '<div class="' + aib.cReply +
					' de-thr-hid" id="de-thr-hid-' + this.num + '">' + Lng.hiddenThrd[lang] +
					' <a href="#">№' + this.num + '</a> <span class="de-thread-note"></span></div>');
				el = $t('a', tEl.previousSibling);
				el.onclick = el.onmouseover = el.onmouseout = function(e) {
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
				}.bind(this);
			}
			return;
		}
		if(Cfg['delHiddPost']) {
			if(hide) {
				this.wrap.classList.add('de-hidden');
				this.wrap.insertAdjacentHTML('beforebegin',
					'<span style="counter-increment: de-cnt 1;"></span>');
			} else if(this.hidden) {
				this.wrap.classList.remove('de-hidden');
				$del(this.wrap.previousSibling);
			}
		} else {
			if(!hide) {
				this.note = '';
			}
			this._pref.onmouseover = this._pref.onmouseout = hide && function(e) {
				this.toggleContent(e.type === 'mouseout');
			}.bind(this);
		}
		this.hidden = hide;
		this.toggleContent(hide);
		if(Cfg['strikeHidd']) {
			setTimeout(function(isHide) {
				$each($Q('a[href*="#' + this.num + '"]', dForm), isHide ? function(el) {
					el.className = 'de-ref-hid';
				} : function(el) {
					el.className = null;
				});
			}.bind(this, hide), 1e3);
		}
	},
	spellHide: function(note) {
		this.spellHidden = true;
		if(!this.userToggled) {
			if(TNum && !this.deleted) {
				sVis[this.count] = 0;
			}
			if(!this.hidden) {
				this.hideRefs();
			}
			this.setVisib(true);
			this.note = note;
		}
	},
	spellUnhide: function() {
		this.spellHidden = false;
		if(!this.userToggled) {
			if(TNum && !this.deleted) {
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
			.replace(/&nbsp;/g, String.fromCharCode(0x00A0))
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
	toggleContent: function(hide) {
		if(hide) {
			this.el.classList.add('de-post-hid');
		} else {
			this.el.classList.remove('de-post-hid');
		}
	},
	toggleImages: function(expand) {
		var i, dat;
		for(i in this.imagesData) {
			dat = this.imagesData[i];
			if(dat.isImage && (dat.expanded ^ expand)) {
				if(expand) {
					this._addFullImage(dat.el, dat, true);
				} else {
					this._removeFullImage(null, dat.el.nextSibling, dat.el, dat);
				}
			}
		}
	},
	toggleUserVisib: function() {
		var isOp = this.isOp,
			hide = !this.hidden,
			date = Date.now();
		this.setUserVisib(hide, date, true);
		if(isOp) {
			if(hide) {
				hThr[brd][this.num] = this.title;
			} else {
				delete hThr[brd][this.num];
			}
			saveHiddenThreads(false);
		}
		saveUserPosts();
	},
	get topCoord() {
		var el = this.isOp && this.hidden ? this.thr.el.previousElementSibling : this.el;
		return el.getBoundingClientRect().top;
	},
	get trunc() {
		var el = $q(aib.qTrunc, this.el), val = null;
		if(el && /long|full comment|gekürzt|слишком|длинн|мног|полная версия/i.test(el.textContent)) {
			val = el;
		}
		Object.defineProperty(this, 'trunc', { configurable: true, value: val });
		return val;
	},
	unhideRefs: function() {
		if(!Cfg['hideRefPsts'] || !this.hasRef) {
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
	unselect: function() {
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
	updateMsg: function(newMsg) {
		var origMsg = aib.hana ? this.msg.firstElementChild : this.msg,
			ytExt = $c('de-ytube-ext', origMsg),
			ytLinks = $Q(':not(.de-ytube-ext) > .de-ytube-link', origMsg);
		origMsg.parentNode.replaceChild(newMsg, origMsg);
		Object.defineProperties(this, {
			'msg': { configurable: true, value: newMsg },
			'trunc': { configurable: true, value: null }
		});
		delete this.html;
		delete this.text;
		youTube.updatePost(this, ytLinks, $Q('a[href*="youtu"]', newMsg), false);
		if(ytExt) {
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
		var msg, prev, val = $new('div', {'class': 'de-ytube-obj'}, null);
		if(aib.krau) {
			msg = this.msg.parentNode;
			prev = msg.previousElementSibling;
			$before(prev.hasAttribute('style') ? prev : msg, val);
		} else {
			$before(this.msg, val);
		}
		Object.defineProperty(this, 'ytObj', { value: val });
		return val;
	},

	_isPview: false,
	_linkDelay: 0,
	_menu: null,
	_menuDelay: 0,
	_pref: null,
	_selRange: null,
	_selText: '',
	_addFullImage: function(el, data, inPost) {
		var elMove, elStop, newW, newH, scrH, img, scrW = Post.sizing.wWidth;
		if(inPost) {
			(aib.hasPicWrap ? data.wrap : el.parentNode).insertAdjacentHTML('afterend',
				'<div class="de-after-fimg"></div>');
			scrW -= this._isPview ? Post.sizing.getOffset(el) : Post.sizing.getCachedOffset(this.count, el);
			el.style.display = 'none';
		} else {
			$del($c('de-img-center', doc));
		}
		newW = !Cfg['resizeImgs'] || data.width < scrW ? data.width : scrW - 2;
		newH = newW * data.height / data.width;
		if(inPost) {
			data.expanded = true;
		} else {
			scrH = Post.sizing.wHeight;
			if(Cfg['resizeImgs'] && newH > scrH) {
				newH = scrH - 2;
				newW = newH * data.width / data.height;
			}
		}
		img = $add('<img class="de-img-full" src="' + data.fullSrc + '" alt="' + data.fullSrc +
			'" width="' + newW + '" height="' + newH + '">');
		img.onload = img.onerror = function(e) {
			if(this.naturalHeight + this.naturalWidth === 0 && !this.onceLoaded) {
				this.src = this.src;
				this.onceLoaded = true;
			}
		};
		$after(el, img);
		if(!inPost) {
			img.classList.add('de-img-center');
			img.style.cssText = 'left: ' + ((scrW - newW) / 2 - 1) +
				'px; top: ' + ((scrH - newH) / 2 - 1) + 'px;';
			img.mover = new ImageMover(img);
		}
	},
	_addMenu: function(el, type) {
		var html, cr = el.getBoundingClientRect(),
			isLeft = false,
			className = 'de-menu ' + aib.cReply,
			xOffset = window.pageXOffset;
		switch(type) {
		case 'hide':
			if(!Cfg['menuHiddBtn']) {
				return;
			}
			html = this._addMenuHide();
			break;
		case 'expand':
			html = '<span class="de-menu-item" info="thr-exp">' + Lng.selExpandThrd[lang]
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
		if(this._menu) {
			clearTimeout(this._menuDelay);
			$del(this._menu);
		}
		this._menu = doc.body.lastChild;
		this._menu.addEventListener('click', this, false);
		this._menu.addEventListener('mouseover', this, false);
		this._menu.addEventListener('mouseout', this, false);
	},
	_addMenuHide: function() {
		var sel, ssel, str = '', addItem = function(name) {
				str += '<span info="spell-' + name + '" class="de-menu-item">' +
					Lng.selHiderMenu[name][lang] + '</span>';
			};
		sel = nav.Opera ? doc.getSelection() : window.getSelection();
		if(ssel = sel.toString()) {
			this._selText = ssel;
			this._selRange = sel.getRangeAt(0);
			addItem('sel');
		}
		if(this.posterTrip) {
			addItem('trip');
		}
		if($isEmpty(this.imagesData)) {
			addItem('noimg');
		} else {
			addItem('img');
			addItem('ihash');
		}
		if(this.text) {
			addItem('text');
		} else {
			addItem('notext');
		}
		return str;
	},
	_addMenuImgSrc: function(el) {
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
		return '<a class="de-menu-item de-imgmenu de-src-iqdb" href="http://iqdb.org/?url=' + p + 'IQDB</a>' +
			'<a class="de-menu-item de-imgmenu de-src-tineye" href="http://tineye.com/search/?url=' + p + 'TinEye</a>' +
			'<a class="de-menu-item de-imgmenu de-src-google" href="http://google.com/searchbyimage?image_url=' + p + 'Google</a>' +
			'<a class="de-menu-item de-imgmenu de-src-saucenao" href="http://saucenao.com/search.php?url=' + p + 'SauceNAO</a>' + str;
	},
	_addPview: function(link) {
		var tNum = (link.pathname.match(/.+?\/[^\d]*(\d+)/) || [,0])[1],
			pNum = (link.textContent.trim().match(/\d+$/) || [tNum])[0],
			pv = this._isPview ? this.kid : Pview.top;
		if(pv && pv.num === pNum) {
			Pview.del(pv.kid);
			setPviewPosition(link, pv.el, Cfg['animation'] && animPVMove);
			if(pv.parent.num !== this.num) {
				$each($C('de-pview-link', pv.el), function(el) {
					el.classList.remove('de-pview-link');
				});
				pv._markLink(this.num);
			}
			this.kid = pv;
			pv.parent = this;
		} else {
			this.kid = new Pview(this, link, tNum, pNum);
		}
	},
	_clickImage: function(el, e) {
		var data, iEl, mover, inPost = (Cfg['expandImgs'] === 1) ^ e.ctrlKey;
		switch(el.className) {
		case 'de-img-full de-img-center':
			mover= el.mover;
			if(mover.moved) {
				mover.moved = false;
				break;
			}
			el.mover = null;
		case 'de-img-full':
			iEl = el.previousSibling;
			this._removeFullImage(e, el, iEl, this.imagesData[iEl.src] || iEl.data);
			break;
		case 'de-img-pre':
			if(!(data = el.data)) {
				iEl = new Image();
				iEl.src = el.src;
				data = el.data = {
					expanded: false,
					isImage: true,
					width: iEl.width,
					height: iEl.height,
					fullSrc: el.src
				};
			}
			break;
		case 'thumb':
		case 'ca_thumb':
			data = this.imagesData[el.src];
			break;
		default:
			if(!/thumb|\/spoiler|^blob:/i.test(el.src)) {
				return;
			}
			data = this.imagesData[el.src];
		}
		if(data && data.isImage) {
			if(!inPost && (iEl = $c('de-img-center', el.parentNode))) {
				$del(iEl);
			} else {
				this._addFullImage(el, data, inPost);
			}
		}
		$pd(e);
		e.stopPropagation();
		return;
	},
	_clickMenu: function(el) {
		$del(this._menu);
		this._menu = null;
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
			if((nav.matchesSelector(start, aib.qMsg + ' *') && nav.matchesSelector(end, aib.qMsg + ' *')) ||
				(nav.matchesSelector(start, '.' + aib.cSubj) && nav.matchesSelector(end, '.' + aib.cSubj))
			) {
				if(this._selText.contains('\n')) {
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
		case 'spell-trip': addSpell(7 /* #trip */, this.posterTrip.replace(/\)/g, '\\)'), false); return;
		case 'spell-img':
			var img = this.imagesData['$first'],
				w = img.weight,
				wi = img.width,
				h = img.height;
			addSpell(8 /* #img */, [0, [w, w], [wi, wi, h, h]], false);
			return;
		case 'spell-ihash': addSpell(4 /* #ihash */, this.imagesData['$first'].hashSync, false); return;
		case 'spell-noimg': addSpell(0x108 /* (#all & !#img) */, '', true); return;
		case 'spell-text':
			var num = this.num,
				hidden = this.hidden,
				wrds = Post.getWrds(this.text),
				time = Date.now();
			for(var post = firstThr.op; post; post = post.next) {
				Post.findSameText(num, hidden, wrds, time, post);
			}
			saveUserPosts();
			return;
		case 'spell-notext': addSpell(0x10B /* (#all & !#tlen) */, '', true); return;
		case 'thr-exp': this.thr.load(parseInt(el.textContent, 10), this.el, null); return;
		}
	},
	_closeMenu: function(rt) {
		clearTimeout(this._menuDelay);
		if(this._menu && (!rt || rt.className !== 'de-menu-item')) {
			this._menuDelay = setTimeout(function() {
				$del(this._menu);
				this._menu = null;
			}.bind(this), 75);
		}
	},
	_eventRefLinkOut: function(e) {
		var rt = e.relatedTarget,
			pv = Pview.getPview(rt);
		clearTimeout(this._linkDelay);
		if(!rt || !pv) {
			if(Pview.top) {
				Pview.top.markToDel();
			}
		} else if(pv.post === this && this.kid && rt.className !== 'de-reflink') {
			this.kid.markToDel();
		}
	},
	_getFull: function(node, isInit) {
		if(aib.hana) {
			$del(node.nextSibling);
			$del(node.previousSibling);
			$del(node);
			if(isInit) {
				this.msg.replaceChild($q('.alternate > div', this.el), this.msg.firstElementChild);
			} else {
				this.updateMsg($q('.alternate > div', this.el));
			}
			return;
		}
		if(!isInit) {
			$alert(Lng.loading[lang], 'load-fullmsg', true);
		}
		ajaxLoad(aib.getThrdUrl(brd, this.tNum), true, function(node, form) {
			if(this.isOp) {
				this.updateMsg(replacePost($q(aib.qMsg, form)));
				$del(node);
			} else {
				for(var i = 0, els = aib.getPosts(form), len = els.length; i < len; i++) {
					if(this.num === aib.getPNum(els[i])) {
						this.updateMsg(replacePost($q(aib.qMsg, els[i])));
						$del(node);
						return;
					}
				}
			}
		}.bind(this, node), null);
	},
	_markLink: function(pNum) {
		$each($Q('a[href*="' + pNum + '"]', this.el), function(num, el) {
			if(el.textContent === '>>' + num) {
				el.classList.add('de-pview-link');
			}
		}.bind(null, pNum));
	},
	_removeFullImage: function(e, full, thumb, data) {
		var pv, cr, x, y, inPost = data.expanded;
		data.expanded = false;
		if(nav.Firefox && this._isPview) {
			cr = this.el.getBoundingClientRect();
			x = e.pageX;
			y = e.pageY;
			if(!inPost) {
				pv = this;
				while(x > cr.right || x < cr.left || y > cr.bottom || y < cr.top) {
					if(pv = pv.parent) {
						cr = pv.el.getBoundingClientRect();
					} else {
						if(Pview.top) {
							Pview.top.markToDel();
						}
						$del(full);
						return;
					}
				}
				if(pv.kid) {
					pv.kid.markToDel();
				}
			} else if(x > cr.right || y > cr.bottom && Pview.top) {
				Pview.top.markToDel();
			}
		}
		$del(full);
		if(inPost) {
			thumb.style.display = '';
			$del((aib.hasPicWrap ? data.wrap : thumb.parentNode).nextSibling);
		}
	}
}


//============================================================================================================
//													PREVIEW
//============================================================================================================

function Pview(parent, link, tNum, pNum) {
	var b, post = pByNum[pNum];
	if(Cfg['noNavigHidd'] && post && post.hidden) {
		return;
	}
	this.parent = parent;
	this._link = link;
	this.num = pNum;
	Object.defineProperty(this, 'tNum', { value: tNum });
	if(post && (!post.isOp || !parent._isPview || !parent._loaded)) {
		this._showPost(post);
		return;
	}
	b = link.pathname.match(/^\/?(.+\/)/)[1].replace(aib.res, '').replace(/\/$/, '');
	if(post = this._cache && this._cache[b + tNum] && this._cache[b + tNum].getPost(pNum)) {
		this._loaded = true;
		this._showPost(post);
	} else {
		this._showText('<span class="de-wait">' + Lng.loading[lang] + '</span>');
		ajaxLoad(aib.getThrdUrl(b, tNum), true, this._onload.bind(this, b), this._onerror.bind(this));
	}
}
Pview.clearCache = function() {
	Pview.prototype._cache = {};
};
Pview.del = function(pv) {
	var el;
	if(!pv) {
		return;
	}
	pv.parent.kid = null;
	if(!pv.parent._isPview) {
		Pview.top = null;
	}
	do {
		clearTimeout(pv._readDelay);
		el = pv.el;
		if(Cfg['animation']) {
			nav.animEvent(el, $del);
			el.classList.add('de-pview-anim');
			el.style[nav.animName] = 'de-post-close-' + (el.aTop ? 't' : 'b') + (el.aLeft ? 'l' : 'r');
		} else {
			$del(el);
		}
	} while(pv = pv.kid);
};
Pview.getPview = function(el) {
	while(el && !el.classList.contains('de-pview')) {
		el = el.parentElement;
	}
	return el;
};
Pview.delTO = 0;
Pview.top = null;
Pview.prototype = Object.create(Post.prototype, {
	markToDel: { value: function pvMarkToDel() {
		clearTimeout(Pview.delTO);
		Pview.delTO = setTimeout(Pview.del, Cfg['linksOut'], this);
	} },

	_isPview: { value: true },
	_loaded: { value: false, writable: true },
	_cache: { value: {}, writable: true },
	_readDelay: { value: 0, writable: true },
	_onerror: { value: function(eCode, eMsg) {
		Pview.del(this);
		this._showText(eCode === 404 ? Lng.postNotFound[lang] : getErrorMessage(eCode, eMsg));
	} },
	_onload: { value: function pvOnload(b, form) {
		var rm, parent = this.parent,
			parentNum = parent.num,
			cache = this._cache[b + this.tNum] = new PviewsCache(form, b, this.tNum),
			post = cache.getPost(this.num);
		if(post && (brd !== b || !post.hasRef || post.ref.indexOf(parentNum) === -1)) {
			if(post.hasRef) {
				rm = $c('de-refmap', post.el)
			} else {
				post.msg.insertAdjacentHTML('afterend', '<div class="de-refmap"></div>');
				rm = post.msg.nextSibling;
			}
			rm.insertAdjacentHTML('afterbegin', '<a class="de-reflink" href="' +
				aib.getThrdUrl(b, parent._isPview ? parent.tNum : parent.tNum) + aib.anchor +
				parentNum + '">&gt;&gt;' + (brd === b ? '' : '/' + brd + '/') + parentNum +
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
	_showPost: { value: function pvShowPost(post) {
		var panel, el = this.el = post.el.cloneNode(true),
			pText = (post.sage ? '<span class="de-btn-sage" title="SAGE"></span>' : '') +
				(post.deleted ? '' : '<span style="margin-right: 4px; vertical-align: 1px; color: #4f7942; ' +
				'font: bold 11px tahoma; cursor: default;">' + (post.isOp ? 'OP' : post.count + 1) + '</span>');
		el.post = this;
		el.className = aib.cReply + ' de-pview' + (post.viewed ? ' de-viewed' : '');
		el.style.display = '';
		if(aib._7ch) {
			el.firstElementChild.style.cssText = 'max-width: 100%; margin: 0;';
			$del($c('doubledash', el));
		}
		if(Cfg['linksNavig'] === 2) {
			this._markLink(this.parent.num);
		}
		this._pref = $q(aib.qRef, el);
		if(post.inited) {
			panel = $c('de-ppanel', el);
			panel.classList.remove('de-ppanel-cnt');
			panel.innerHTML = pText;
			$each($Q((!TNum && post.isOp ? aib.qOmitted + ', ' : '') +
				'.de-img-full, .de-after-fimg', el), $del);
			$each(getImages(el), function(el) {
				el.style.display = '';
			});
			if(post.hasYTube) {
				if(post.ytInfo !== null) {
					Object.defineProperty(this, 'ytObj', { value: $c('de-ytube-obj', el) });
					this.ytInfo = post.ytInfo;
				}
				youTube.updatePost(this, $C('de-ytube-link', post.el), $C('de-ytube-link', el), true);
			}
			if(Cfg['addImgs']) {
				$each($C('de-img-pre', el), function(el) {
					el.style.display = '';
				});
			}
			if(Cfg['markViewed']) {
				this._readDelay = setTimeout(function(pst) {
					if(!pst.viewed) {
						pst.el.classList.add('de-viewed');
						pst.viewed = true;
					}
					var arr = (sessionStorage['de-viewed'] || '').split(',');
					arr.push(pst.num);
					sessionStorage['de-viewed'] = arr;
				}, 2e3, post);
			}
		} else {
			this._pref.insertAdjacentHTML('afterend', '<span class="de-ppanel">' + pText + '</span');
			embedMP3Links(this);
			youTube.parseLinks(this);
			if(Cfg['addImgs']) {
				embedImagesLinks(el);
			}
			if(Cfg['imgSrcBtns']) {
				addImagesSearch(el);
			}
		}
		el.addEventListener('click', this, true);
		this._showPview(el);
	} },
	_showPview: { value: function pvShowPview(el, id) {
		if(this.parent._isPview) {
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
		if(Cfg['animation']) {
			nav.animEvent(el, function(node) {
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
	for(i = 0, len = posts.length; i < len; ++i) {
		post = posts[i];
		pBn[aib.getPNum(post)] = Object.create(pProto, {
			count: { value: i + 1 },
			el: { value: post },
			inited: { value: false },
			pvInited: { value: false, writable: true }
		});
	}
	pBn[tNum] = this._opObj = Object.create(pProto, {
		inited: { value: false },
		isOp: { value: true },
		msg: { value: $q(aib.qMsg, thr), writable: true },
		ref: { value: [], writable: true }
	});
	if(Cfg['linksNavig'] === 2) {
		genRefMap(pBn, false);
	}
	this._brd = b;
	this._thr = thr;
	this._tNum = tNum;
	this._tUrl = aib.getThrdUrl(b, tNum);
	this._posts = pBn;
}
PviewsCache.prototype = {
	getPost: function(num) {
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
		var i, j, len, num, nRef, oRef, rRef, oOp, op = this._opObj;
		op.el = replacePost(aib.getOp(this._thr));
		op.msg = $q(aib.qMsg, op.el);
		if(this._brd === brd && (oOp = pByNum[this._tNum])) {
			oRef = op.ref;
			rRef = [];
			for(i = j = 0, nRef = oOp.ref, len = nRef.length; j < len; ++j) {
				num = nRef[j];
				if(oRef[i] === num) {
					i++;
				} else if(oRef.indexOf(num) !== -1) {
					continue;
				}
				rRef.push(num)
			}
			for(len = oRef.length; i < len; i++) {
				rRef.push(oRef[i]);
			}
			op.ref = rRef;
			if(rRef.length !== 0) {
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
		this.removeEventListener(nav.animEnd, PviewMoved, false);
	}
}

function animPVMove(pView, lmw, top, oldCSS) {
	var uId = 'de-movecss-' + Math.round(Math.random() * 1e3);
	$css('@' + nav.cssFix + 'keyframes ' + uId + ' {to { ' + lmw + ' top:' + top + '; }}').className =
		'de-css-move';
	if(pView.newPos) {
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
	if(pView.link === link) {
		return;
	}
	pView.link = link;
	var isTop, top, oldCSS, cr = link.getBoundingClientRect(),
		offX = cr.left + window.pageXOffset + link.offsetWidth / 2,
		offY = cr.top + window.pageYOffset,
		bWidth = doc.documentElement.clientWidth,
		isLeft = offX < bWidth / 2,
		tmp = (isLeft ? (bWidth - offX) : offX) - 10,
		lmw = 'max-width:' + tmp + 'px; left:' + (isLeft ? offX : offX -
			Math.min(parseInt(pView.offsetWidth, 10), tmp)) + 'px;';
	if(animFun) {
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
	if(animFun) {
		animFun(pView, lmw, top, oldCSS);
	} else {
		pView.style.top = top;
	}
}

function addRefMap(post, tUrl) {
	var i, ref, len, bStr = '<a ' + aib.rLinkClick + ' href="' + tUrl + aib.anchor,
		str = '<div class="de-refmap">';
	for(i = 0, ref = post.ref, len = ref.length; i < len; ++i) {
		str += bStr + ref[i] + '" class="de-reflink">&gt;&gt;' + ref[i] +
			'</a><span class="de-refcomma">, </span>';
	}
	post.msg.insertAdjacentHTML('afterend', str + '</div>');
}

function genRefMap(posts, hideRefs) {
	var tc, lNum, post, ref, i, len, links, pNum, opNums = firstThr.gInfo.tNums;
	for(pNum in posts) {
		for(i = 0, links = $T('a', posts[pNum].msg), len = links.length; i < len; ++i) {
			tc = links[i].textContent;
			if(tc.startsWith('>>') && (lNum = +tc.substr(2)) && (lNum in posts)) {
				post = posts[lNum];
				ref = post.ref;
				if(ref.indexOf(pNum) === -1) {
					ref.push(pNum);
					post.hasRef = true;
					if(hideRefs && post.hidden) {
						post = posts[pNum];
						post.setVisib(true);
						post.note = 'reference to >>' + lNum;
						post.hideRefs();
					}
				}
				if(opNums.indexOf(lNum) !== -1) {
					links[i].classList.add('de-opref');
				}
			}
		}
	}
}

function updRefMap(post, add) {
	var tc, ref, idx, link, lNum, lPost, i, len, links, pNum = post.num,
		opNums = add && firstThr.gInfo.tNums;
	for(i = 0, links = $T('a', post.msg), len = links.length; i < len; ++i) {
		link = links[i];
		tc = link.textContent;
		if(tc.startsWith('>>') && (lNum = +tc.substr(2)) && (lNum in pByNum)) {
			lPost = pByNum[lNum];
			if(!TNum) {
				link.href = '#' + (aib.fch ? 'p' : '') + lNum;
			}
			if(add) {
				if(opNums.indexOf(lNum) !== -1) {
					link.classList.add('de-opref');
				}
				if(lPost.ref.indexOf(pNum) === -1) {
					lPost.ref.push(pNum);
					post.hasRef = true;
					if(Cfg['hideRefPsts'] && lPost.hidden) {
						if(!post.hidden) {
							post.hideRefs();
						}
						post.setVisib(true);
						post.note = 'reference to >>' + lNum;
					}
				} else {
					continue;
				}
			} else if(lPost.hasRef) {
				ref = lPost.ref;
				idx = ref.indexOf(pNum);
				if(idx === -1) {
					continue;
				}
				ref.splice(idx, 1);
				if(ref.length === 0) {
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


//============================================================================================================
//													THREAD
//============================================================================================================

function Thread(el, prev) {
	if(aib._420 || aib.tiny) {
		$after(el, el.lastChild);
		$del($c('clear', el));
	}
	var i, pEl, lastPost,
		els = aib.getPosts(el),
		len = els.length,
		num = aib.getTNum(el),
		omt = TNum ? 1 : this.omitted = aib.getOmitted($q(aib.qOmitted, el), len);
	this.num = num;
	this.gInfo.tNums.push(+num);
	this.pcount = omt + len;
	pByNum[num] = lastPost = this.op = el.post = new Post(aib.getOp(el), this, num, 0, true,
		prev ? prev.last : null);
	for(i = 0; i < len; i++) {
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
	if(prev) {
		prev.next = this;
	}
}
Thread.parsed = false;
Thread.processUpdBtn = function(add) {
	if(add) {
		firstThr.el.insertAdjacentHTML('afterend', '<span class="de-thrupdbtn">[<a href="#">' +
			Lng.getNewPosts[lang] + '</a>]</span>');
		firstThr.el.nextSibling.addEventListener('click', function(e) {
			$pd(e);
			$alert(Lng.loading[lang], 'newposts', true);
			firstThr.loadNew(infoLoadErrors, true);
		}, false);
	} else {
		$del($c('de-thrupdbtn', dForm));
	}
};
Thread.prototype = {
	hidden: false,
	gInfo: {
		tNums: []
	},
	loadedOnce: false,
	next: null,
	get lastNotDeleted() {
		var post = this.last;
		while(post.deleted) {
			post = post.prev;
		}
		return post;
	},
	load: function(last, scrollEl, Fn) {
		if(!Fn) {
			$alert(Lng.loading[lang], 'load-thr', true);
		}
		ajaxLoad(aib.getThrdUrl(brd, this.num), true, function threadOnload(last, scrollEl, Fn, form) {
			var els = aib.getPosts(form),
				op = this.op,
				thrEl = this.el,
				expEl = $c('de-expand', thrEl),
				nOmt = last === 1 ? 0 : Math.max(els.length - last, 0);
			pr.closeQReply();
			$del($q(aib.qOmitted + ', .de-omitted', thrEl));
			if(!this.loadedOnce) {
				if(op.trunc) {
					op.updateMsg(replacePost($q(aib.qMsg, form)));
				}
				delete op.ref;
				this.loadedOnce = true;
			}
			this._checkBans(op, form);
			this._parsePosts(els, nOmt, this.omitted - 1);
			this.omitted = nOmt;
			thrEl.style.counterReset = 'de-cnt ' + (nOmt + 1);
			if(nOmt !== 0) {
				op.el.insertAdjacentHTML('afterend', '<div class="de-omitted">' + nOmt + '</div>');
			}
			if(this.pcount - nOmt - 1 <= visPosts) {
				$del(expEl);
			} else if(!expEl) {
				thrEl.insertAdjacentHTML('beforeend', '<span class="de-expand">[<a href="#">' +
					Lng.collapseThrd[lang] + '</a>]</span>');
				thrEl.lastChild.onclick = function(e) {
					$pd(e);
					this.load(visPosts, this.el, null);
				}.bind(this);
			} else if(expEl !== thrEl.lastChild) {
				thrEl.appendChild(expEl);
			}
			closeAlert($id('de-alert-load-thr'));
			setTimeout(function(sEl) {
				scrollTo(0, pageYOffset + sEl.getBoundingClientRect().top);
			}, 100, scrollEl)
			Fn && Fn();
		}.bind(this, last, scrollEl, Fn), function(eCode, eMsg) {
			$alert(getErrorMessage(eCode, eMsg), 'load-thr', false);
			if(typeof this === 'function') {
				this();
			}
		}.bind(Fn));
	},
	loadNew: function(Fn, useAPI) {
		if(aib.hana && useAPI) {
			getJsonPosts('/api/thread/' + brd + '/' + TNum +
				'/new.json?message_html&new_format&last_post=' + this.last.num,
				function parseNewPosts(status, sText, json) {
					if(status !== 200 || json['error']) {
						Fn(status, sText || json['message'], 0);
					} else {
						var i, pCount, fragm, last, temp, el = (json['result'] || {})['posts'],
							len = el ? el.length : 0,
							np = len;
						if(len > 0) {
							fragm = doc.createDocumentFragment();
							pCount = this.pcount;
							last = this.last;
							for(i = 0; i < len; i++) {
								temp = getHanaPost(el[i]);
								last = this._addPost(fragm, el[i]['display_id'],
									replacePost(temp[1]), temp[0], pCount + i, last);
								np -= spells.check(last)
							}
							spells.end(savePosts);
							this.last = last;
							this.el.appendChild(fragm);
							this.pcount = pCount + len;
						}
						Fn(200, '', np);
						Fn = null;
					}
				}.bind(this)
			);
			return;
		}
		ajaxLoad(aib.getThrdUrl(brd, TNum), true, function parseNewPosts(form) {
			this._checkBans(firstThr.op, form);
			var info = this._parsePosts(aib.getPosts(form), 0, 0);
			Fn(200, '', info[1]);
			if(info[0] !== 0) {
				$id('de-panel-info').firstChild.textContent = this.pcount + '/' + getImages(dForm).length;
			}
			Fn = null;
		}.bind(this), function(eCode, eMsg) {
			Fn(eCode, eMsg, 0);
			Fn = null;
		});
	},
	get topCoord() {
		return this.op.topCoord;
	},
	updateHidden: function(data) {
		var realHid, date = Date.now(),
			thr = this;
		do {
			realHid = thr.num in data;
			if(thr.hidden ^ realHid) {
				if(realHid) {
					thr.op.setUserVisib(true, date, false);
					data[thr.num] = thr.op.title;
				} else if(thr.hidden) {
					thr.op.setUserVisib(false, date, false);
				}
			}
		} while(thr = thr.next);
	},

	_addPost: function(parent, num, el, wrap, i, prev) {
		var post = new Post(el, this, num, i, false, prev);
		pByNum[num] = post;
		Object.defineProperty(post, 'wrap', { value: wrap });
		aib.appendPost(wrap, parent);
		youTube.parseLinks(post);
		if(Cfg['imgSrcBtns']) {
			addImagesSearch(el);
		}
		post.addFuncs();
		preloadImages(el);
		return post;
	},
	_checkBans: function(op, thrNode) {
		var pEl, bEl, post, i, bEls, len;
		if(aib.qBan) {
			for(i = 0, banEls = $Q(aib.qBan, thrNode), len = banEls.length; i < len; ++i) {
				bEl = banEls[i];
				pEl = aib.getPostEl(bEl);
				post = pEl ? pByNum[aib.getPNum(pEl)] : op;
				if(post && !post.banned) {
					if(!$q(aib.qBan, post.el)) {
						post.msg.appendChild(bEl);
					}
					post.banned = true;
				}
			}
		}
	},
	_parsePosts: function(nPosts, from, omt) {
		var i, c, len, el, tPost, fragm, newPosts = 0,
			newVisPosts = 0,
			firstDelPost = null,
			rerunSpells = spells.hasNumSpell,
			saveSpells = false,
			post = this.op.nextNotDeleted;
		for(i = 0, len = nPosts.length; i <= len && post; ) {
			if(post.count - 1 === i) {
				if(i >= len || post.num !== aib.getPNum(nPosts[i])) {
					if(!firstDelPost) {
						firstDelPost = post;
					}
					c = 0;
					do {
						if(TNum) {
							post.deleted = true;
							post.btns.classList.remove('de-ppanel-cnt');
							post.btns.classList.add('de-ppanel-del');
							($q('input[type="checkbox"]', post.el) || {}).disabled = true;
						} else {
							aib.removePost(post);
							delete pByNum[post.num];
							if(post.hidden) {
								post.unhideRefs();
							}
							updRefMap(post, false);
							if(post.prev.next = post.next) {
								post.next.prev = post.prev;
							}
							if(this.last === post) {
								this.last = post.prev;
							}
						}
						post = post.nextNotDeleted;
						c++;
					} while(post && (i >= len || post.num !== aib.getPNum(nPosts[i])));
					if(!rerunSpells) {
						sVis.splice(i + 1, c);
					}
					for(tPost = post; tPost; tPost = tPost.nextInThread) {
						tPost.count -= c;
					}
				} else {
					if(i < from) {
						if(i >= omt) {
							post.wrap.classList.add('de-hidden');
							post.omitted = true;
						}
					} else if(!TNum) {
						if(post.trunc) {
							post.updateMsg(replacePost($q(aib.qMsg, nPosts[i])));
						}
						post.wrap.classList.remove('de-hidden');
						post.omitted = false;
						updRefMap(post, true);
					}
					i++;
					post = post.nextNotDeleted;
				}
			} else if(!TNum && i >= from) {
				fragm = doc.createDocumentFragment();
				tPost = this.op;
				for(c = post.count - 1; i < c; i++) {
					el = nPosts[i];
					tPost = this._addPost(fragm, aib.getPNum(el), replacePost(el),
						aib.getWrap(el, false), i + 1, tPost);
					spells.check(tPost);
				}
				$after(this.op.el, fragm);
				tPost.next = post;
				post.prev = tPost;
			} else {
				console.error('Loaded thread has extra post: ' + aib.getPNum(nPosts[i]));
				i++;
			}
		}
		this.pcount = len + 1;
		if(firstDelPost && rerunSpells) {
			disableSpells();
			for(post = firstDelPost.nextInThread; post; post = post.nextInThread) {
				spells.check(post);
			}
			saveSpells = true;
		}
		if(i < len) {
			newPosts = newVisPosts = len - i;
			post = this.last;
			fragm = doc.createDocumentFragment();
			do {
				el = nPosts[i];
				post = this._addPost(fragm, aib.getPNum(el), replacePost(el),
					aib.getWrap(el, false), i + 1, post);
				newVisPosts -= spells.check(post);
			} while(++i < len);
			this.el.appendChild(fragm);
			this.last = post;
			saveSpells = true;
		}
		if(saveSpells) {
			spells.end(savePosts);
		}
		return [newPosts, newVisPosts];
	}
};


//============================================================================================================
//													IMAGEBOARD
//============================================================================================================

function getImageBoard() {
	var ibDomains = {
		'02ch.net': [{
			ru: { value: true },
			timePattern: { value: 'yyyy+nn+dd++w++hh+ii+ss' }
		}],
		'@0chan': [{
			getSage: { value: function(post) {
				return !!$q('a[href="mailto:sage"], a[href^="http://www.cloudflare.com"]', post);
			} },
			css: { get: function() {
				return Object.getPrototypeOf(this).css +
					'#postform nobr, .replieslist, #captcha_status, .postnode + a, .postblock + td > small, .content-background > hr { display: none !important; }\
					.ui-wrapper { position: static !important; margin: 0 !important; overflow: visible !important; }\
					.ui-resizable { display: inline !important; }\
					form textarea { resize: both !important; }'
			} },
			ru: { value: true },
			timePattern: { value: 'w+yyyy+m+dd+hh+ii+ss' },

			init: { value: function() {
				$each($Q('span[style="float: right;"]', doc.body), $del);
			} },
			nul: { value: true }
		}, 'script[src*="kusaba"]'],
		get '0-chan.ru'() {
			return this['@0chan'];
		},
		get '0chan.hk'() {
			return this['@0chan'];
		},
		'2--ch.ru': [{
			qPages: { value: 'table[border="1"] tr:first-of-type > td:first-of-type a' },
			qTable: { value: 'table:not(.postfiles)' },
			_qThread: { value: '.threadz' },
			getOmitted: { value: function(el, len) {
				var txt;
				return el && (txt = el.textContent) ? +(txt.match(/\d+/) || [0])[0] - len : 1;
			} },
			getPicWrap: { value: function(el) {
				return el.parentNode.parentNode;
			} },
			css: { value: '.de-post-hid > .de-ppanel ~ *, span[id$="_display"] { display: none !important; }' },
			docExt: { value: '.html' },
			getPageUrl: { value: function(b, p) {
				return fixBrd(b) + (p > 0 ? p : 0) + '.memhtml';
			} },
			hasPicWrap: { value: true },
			ru: { value: true },
			timePattern: { value: 'w+dd+m+yyyy+hh+ii+ss' },
			init: { value: function() {
				$script('$X = $x = $del = $each = AJAX = delPostPreview = showPostPreview =\
					doRefPreview = getRefMap = showRefMap = doRefMap = get_cookie = set_cookie =\
					save_cookies = get_password = insert = highlight = set_stylesheet =\
					set_preferred_stylesheet = get_active_stylesheet =\
					get_preferred_stylesheet = set_inputs = set_delpass = do_ban = lazyadmin =\
					conf = expand = wipe = fastload_listen = threadHide = threadShow =\
					add_to_thread_cookie = remove_from_thread_cookie = toggleHidden =function(){};', true
				);
				return false;
			} },

			tire: { value: true }
		}],
		'410chan.org': [{
			formButtons: { get: function() {
				return Object.create(this._formButtons, {
					tag: { value: ['**', '*', '__', '^^', '%%', '`', '', '', 'q'] }
				});
			} },
			getSage: { value: function(post) {
				var el = $c('filetitle', post);
				return el && el.textContent.contains('\u21E9');
			} },
			timePattern: { value: 'dd+nn+yyyy++w++hh+ii+ss' },

			_410: { value: true }
		}, 'script[src*="kusaba"]'],
		'420chan.org': [{
			formButtons: { get: function() {
				return Object.create(this._formButtons, {
					tag: { value: ['**', '*', '', '', '%', 'pre', '', '', 'q'] }
				});
			} },
			qBan: { value: '.ban' },
			qError: { value: 'pre' },
			qPages: { value: '.pagelist > a:not(:first-of-type)' },
			qThread: { value: '[id*="thread"]' },
			getTNum: { value: function(op) {
				return $q('a[id]', op).id.match(/\d+/)[0];
			} },
			css: { value: '.de-post-hid > .replyheader ~ *, .opqrbtn, .qrbtn, .ignorebtn, .hidethread, noscript, #content > hr { display: none !important; }\
				.de-thr-hid { margin: 1em 0; }' },
			docExt: { value: '' },
			isBB: { value: true },

			_420: { value: true }
		}],
		'4chan.org': [{
			cFileInfo: { value: 'fileText' },
			cOPost: { value: 'op' },
			cSubj: { value: 'subject' },
			cReply: { value: 'post reply' },
			formButtons: { get: function() {
				return Object.create(this._formButtons, {
					tag: { value: ['**', '*', '__', '^H', 'spoiler', 'code', '', '', 'q'] },
					bb: { value: [false, false, false, false, true, true, false, false, false] }
				});
			} },
			qBan: { value: 'strong[style="color: red;"]' },
			qDelBut: { value: '.deleteform > input[type="submit"]' },
			qError: { value: '#errmsg' },
			qName: { value: '.name' },
			qOmitted: { value: '.summary.desktop' },
			qPages: { value: '.pagelist > .pages:not(.cataloglink) > a' },
			qPostForm: { value: 'form[name="post"]' },
			qRef: { value: '.postInfo > .postNum' },
			qTable: { value: '.replyContainer' },
			timePattern: { value: 'nn+dd+yy+w+hh+ii-?s?s?' },
			getSage: { value: function(post) {
				return !!$q('.id_Heaven, .useremail[href^="mailto:sage"]', post);
			} },
			getTNum: { value: function(op) {
				return $q('input[type="checkbox"]', op).name.match(/\d+/)[0];
			} },
			getWrap: { value: function(el, isOp) {
				return el.parentNode;
			} },
			anchor: { value: '#p' },
			css: { value: '.de-post-hid > .file, .de-post-hid > blockquote, .de-post-hid > .de-ytube-obj, .de-post-hid > .de-refmap, #mpostform, .navLinks, .postingMode { display: none !important; }' },
			docExt: { value: '' },
			rLinkClick: { value: '' },
			rep: { value: true },

			fch: { value: true }
		}],
		'4chon.net': [{
			formButtons: { get: function() {
				return Object.create(this._formButtons, {
					tag: { value: ['**', '*', '__', '', '%%', '', '', '', 'q'] }
				});
			} },
			appendPost: { value: function(el, parent) {
				parent.appendChild(el);
				el.insertAdjacentHTML('afterend', '<br>');
			} },
			removePost: { value: function(post) {
				var w = post.wrap;
				$del(w.nextSibling);
				$del(w);
			} },

			_4chon: { value: true }
		}, 'form[name*="postcontrols"]'],
		'7chan.org': [{
			cOPost: { value: 'op' },
			cFileInfo: { value: 'file_size' },
			qMsg: { value: '.message' },
			qPages: { value: '#paging > ul > li:not([id]):not(:nth-child(2))' },
			qThread: { value: '[id^="thread"]:not(#thread_controls)' },
			css: { get: function() {
				return Object.getPrototypeOf(this).css +
					'.reply { background-color: ' + $getStyle(doc.body, 'background-color') + '; }'
			} },
			timePattern: { value: 'yy+dd+nn+w+hh+ii+ss' },
			trTag: { value: 'LI' },

			_7ch: { value: true }
		}, 'script[src*="kusaba"]'],
		'britfa.gs': [{
			cFileInfo: { value: 'fileinfo' },
			qBan: { value: 'font[color="#F00"]' },
			qImgLink: { value: '.fileinfo' },
			qTable: { value: 'div[id^="replies"] > table' },
			getImgSize: { value: function(infoEl, info) {
				var m = infoEl.onclick.toString().split("', '");
				return [m[3], m[4]];
			} },
			getImgWeight: { value: function(info) {
				return -1;
			} },
			getOp: { value: function(thr) {
				var op = $c('originalpost', thr),
					msg = $t('blockquote', op);
				msg.insertAdjacentHTML('beforebegin', '<div style="clear: left;"></div>');
				while((el = thr.firstChild).tagName !== 'TABLE') {
					op.insertBefore(el, msg);
				}
				thr.replaceChild(op, thr.firstChild);
				op.removeAttribute('class');
				op.style.display = 'block';
				return op;
			} },
			getTNum: { value: function(op) {
				return $q('.reflink > a', op).textContent;
			} },
			css: { value: '.de-post-hid > .de-ppanel ~ *, .postthreadlinks, .pagethreadlinks, .pwpostblock { display: none !important; }\
				.de-ppanel { float: left; margin-top: 0.45em; }\
				a + .threadlinktext { position: relative; top: 17px; }\
				.de-btn-src { padding: 0px 10px 10px 0px !important; background-size: cover !important; }' },

			brit: { value: true }
		}],
		'chanarchive.org': [{
			// FIXME: check qPages property
			qDForm: { value: '.board' },
			arch: { value: true }
		}, null, '4chan.org'],
		'dfwk.ru': [{
			timePattern: { value: 'w+yy+nn+dd+hh+ii' }
		}, 'script[src*="kusaba"]'],
		'@ernstchan': [{
			// TODO: make it works
			cOPost: { value: 'thread_OP' },
			cReply: { value: 'post' },
			CRPost: { value: 'post' },
			cSubj: { value: 'subject' },
			cTrip: { value: 'tripcode' },
			qThread: { value: 'div[id^="thread_"]' },
			docExt: { value: '' },
			res: { value: 'faden/' },
			init: { value: function() {
				return true;
			} },

			erns: { value: true }
		}],
		get 'ernstchan.com'() {
			return this['@ernstchan'];
		},
		get 'ernstchan.net'() {
			return this['@ernstchan'];
		},
		'geekly.info': [{
			getPosts: { value: function(thr) {
				return $Q('tr:first-child > .reply', thr);
			}}
		}],
		'hiddenchan.i2p': [{
			hid: { value: true }
		}, 'script[src*="kusaba"]'],
		'iichan.hk': [{
			timePattern: { value: 'w+dd+m+yyyy+hh+ii+ss' }
		}],
		'krautchan.net': [{
			cFileInfo: { value: 'fileinfo' },
			cReply: { value: 'postreply' },
			cRPost: { value: 'postreply' },
			cSubj: { value: 'postsubject' },
			formButtons: { get: function() {
				return Object.create(this._formButtons, {
					tag: { value: ['b', 'i', 'u', 's', 'spoiler', 'aa', '', '', 'q'] },
				});
			} },
			qBan: { value: '.ban_mark' },
			qDForm: { value: 'form[action*="delete"]' },
			qError: { value: '.message_text' },
			qImgLink: { value: '.filename > a' },
			qOmitted: { value: '.omittedinfo' },
			qRef: { value: '.postnumber' },
			qThread: { value: '.thread_body' },
			qTrunc: { value: 'p[id^="post_truncated"]' },
			timePattern: { value: 'yyyy+nn+dd+hh+ii+ss+--?-?-?-?-?' },
			getPicWrap: { value: function(el) {
				return el.parentNode;
			} },
			getSage: { value: function(post) {
				return !!$c('sage', post);
			} },
			getTNum: { value: function(op) {
				return $q('input[type="checkbox"]', op).name.match(/\d+/)[0];
			} },
			pagesCount: { configurable: true, get: function() {
				var val = $T('a', $T('td',
					dForm.lastElementChild.previousElementSibling)[pageNum === 0 ? 1 : 2]).length;
				Object.defineProperty(this, 'pagesCount', { value: val });
				return val;
			} },
			css: { get: function() {
				return '.de-post-hid > div:not(.postheader), img[id^="translate_button"], img[src$="button-expand.gif"], img[src$="button-close.gif"], body > center > hr, h2, form > div:first-of-type > hr { display: none !important; }\
					div[id^="Wz"] { z-index: 10000 !important; }\
					.de-thr-hid { margin-bottom: ' + (!TNum ? '7' : '2') + 'px; float: none !important; }\
					.file_reply + .de-ytube-obj, .file_thread + .de-ytube-obj { margin: 5px 20px 5px 5px; float: left; }\
					.de-ytube-obj + div { clear: left; }'
			} },
			hasPicWrap: { value: true },
			isBB: { value: true },
			rLinkClick: { value: 'onclick="highlightPost(this.textContent.substr(2)))"' },
			rep: { value: true },
			res: { value: 'thread-' },

			krau: { value: true }
		}],
		'mlpg.co': [{
			formButtons: { get: function() {
				return Object.create(this._formButtons, {
					tag: { value: ['b', 'i', 'u', '-', 'spoiler', 'c', '', '', 'q'] },
				});
			} },
			qTable: { value: '.replyContainer' },
			getWrap: { value: function(el, isOp) {
				return el.parentNode;
			} },
			css: { get: function() {
				return Object.getPrototypeOf(this).css +
					'#de-pform > div, .mentioned, form > div[style="text-align: center;"], form > div[style="text-align: center;"] + hr { display: none !important; }';
			} },
			isBB: { value: true }
		}, 'form[name*="postcontrols"]'],
		'nido.org': [{
			qPages: { value: '.pagenavi > tbody > tr > td > a' },
			getSage: { value: function(post) {
				return !!$q('a[href="mailto:cejas"]', post);
			} },

			init: { value: function() {
				for(var src, el, i = 0, els = $Q('span[id^="pv-"]', doc.body), len = els.length; i < len; ++i) {
					el = els[i];
					src = 'https://www.youtube.com/watch?v=' + el.id.substring(3);
					el.parentNode.insertAdjacentHTML('beforeend',
						'<p class="de-ytube-ext"><a href="' + src + '">' + src + '</a></p>');
					$del(el);
				}
			} }
		}, 'script[src*="kusaba"]'],
		'ponychan.net': [{
			cOPost: { value: 'op' },
			qPages: { value: 'table[border="0"] > tbody > tr > td:nth-child(2) > a' },
			pagesCount: { configurable: true, get: function() {
				var val = $Q(this.qPages, doc).length;
				Object.defineProperty(this, 'pagesCount', { value: val });
				return val;
			} },
			css: { get: function() {
				return Object.getPrototypeOf(this).css +
					'#bodywrap3 > hr, .blotter { display: none !important; }';
			} },

			pony: { value: true }
		}, 'script[src*="kusaba"]']
	};

	var ibEngines = {
		'#ABU_css, #ShowLakeSettings': {
			formButtons: { get: function() {
				return Object.create(this._formButtons, {
					tag: { value: ['b', 'i', 'u', 's', 'spoiler', 'code', 'sup', 'sub', 'q'] }
				});
			} },
			qBan: { value: 'font[color="#C12267"]' },
			qDForm: { value: '#posts_form, #delform' },
			qOmitted: { value: '.mess_post, .omittedposts' },
			timePattern: { value: 'w+dd+m+yyyy+hh+ii+ss' },
			getSage: { writable: true, value: function(post) {
				if($c('postertripid', dForm)) {
					this.getSage = function(post) {
						return !$c('postertripid', post);
					};
				} else {
					this.getSage = Object.getPrototypeOf(this).getSage;
				}
				return this.getSage(post);
			} },
			css: { value: '#ABU_alert_wait, .de-post-hid > .de-ppanel ~ *, .ABU_refmap, .postpanel, #CommentToolbar, #usrFlds + tbody > tr:first-child, #postform > div:nth-child(2), #BottomNormalReply, body > center, .logo + div { display: none !important; }\
				#de-txt-panel { font-size: 16px !important; }\
				.de-abtn { transition: none; }\
				.reflink:before { content: none !important; }' },
			isBB: { value: true },
			init: { value: function() {
				var cd = $id('captcha_div'),
					img = cd && $t('img', cd);
				if(img) {
					cd.setAttribute('onclick', ['var i = 4, el;',
						"if(!arguments[1] && event.target.tagName !== 'IMG') {",
							'return;',
						'}',
						'do {', img.getAttribute('onclick'), '} while(--i > 0 && !/<img|не нужно/i.test(this.innerHTML));',
						"if(el = this.getElementsByTagName('img')[0]) {",
							"el.removeAttribute('onclick');",
							"if(event && (el = this.querySelector('input[type=\\'text\\']'))) {",
								'el.focus();',
							'}',
						'}'
					].join(''));
					img.removeAttribute('onclick');
				}
			} },

			abu: { value: true }
		},
		'form[action*="futaba.php"]': {
			qDForm: { value: 'form:not([enctype])' },
			qImgLink: { value: 'a[href$=".jpg"]:nth-of-type(1), a[href$=".png"]:nth-of-type(1), a[href$=".gif"]:nth-of-type(1)' },
			qOmitted: { value: 'font[color="#707070"]' },
			qPostForm: { value: 'form:nth-of-type(1)' },
			qRef: { value: '.del' },
			getPageUrl: { value: function(b, p) {
				return fixBrd(b) + (p > 0 ? p + this.docExt : 'futaba.htm');
			} },
			getPNum: { value: function(post) {
				return $t('input', post).name;
			} },
			getPostEl: { value: function(el) {
				while(el && el.tagName !== 'TD' && !el.hasAttribute('de-thread')) {
					el = el.parentElement;
				}
				return el;
			} },
			getPosts: { value: function(thr) {
				return $Q('td:nth-child(2)', thr);
			} },
			getTNum: { value: function(op) {
				return $q('input[type="checkbox"]', op).name.match(/\d+/)[0];
			} },
			css: { value: '.de-post-hid > .de-ppanel ~ * { display: none !important; }\
				span { font-size: inherit; }\
				.de-content, .de-cfg-body { font-family: arial; }\
				.ftbl { width: auto; margin: 0; }\
				.reply { background: #f0e0d6; }' },
			docExt: { value: '.htm' },

			futa: { value: true }
		},
		'form[action*="imgboard.php?delete"]': {
			init: { value: function() {
				$script('AJAX = delPostPreview = showPostPreview = showNewPosts = doRefPreview =\
					showRefMap = getRefMap = doRefMap = insertAfter = get_password =\
					update_captcha = getSelectedText = quote = insert = fixRefLinks =\
					highlight = invertAll = toggle = doTruncate = doParse = doExpand =\
					doStats = doShowHide = doDelForm = doPostForm = checkIn = doStars = function(){};', true
				);
				return false;
			} },
			ru: { value: true },
			timePattern: { value: 'dd+nn+yy+w+hh+ii+ss' },

			tinyIb: { value: true }
		},
		'form[name*="postcontrols"]': {
			cFileInfo: { value: 'fileinfo' },
			cOPost: { value: 'op' },
			cReply: { value: 'post reply' },
			cSubj: { value: 'subject' },
			cTrip: { value: 'trip' },
			formButtons: { get: function() {
				return Object.create(this._formButtons, {
					tag: { value: ["'''", "''", '__', '^H', '**', '`', '', '', 'q'] },
				});
			} },
			qDForm: { value: 'form[name="postcontrols"]' },
			qMsg: { value: '.body' },
			qName: { value: '.name' },
			qOmitted: { value: '.omitted' },
			qPages: { value: '.pages > a[href]:not(:last-of-type)' },
			qPostForm: { value: 'form[name="post"]' },
			qRef: { value: '.post_no:nth-of-type(2)' },
			qTrunc: { value: '.toolong' },
			timePattern: { value: 'nn+dd+yy++w++hh+ii+ss' },
			getPageUrl: { value: function(b, p) {
				return p > 0 ? fixBrd(b) + (p + 1) + this.docExt : fixBrd(b);
			} },
			getTNum: { value: function(op) {
				return $q('input[type="checkbox"]', op).name.match(/\d+/)[0];
			} },
			css: { value: 'form, form table { margin: 0; }\
				.de-post-hid > .intro ~ *, .post-hover, div.banner { display: none !important; }' },

			tiny: { value: true }
		},
		'script[src*="hanabira"]': {
			cSubj: { value: 'replytitle' },
			cFileInfo: { value: 'fileinfo' },
			qDForm: { value: 'form[action*="delete"]' },
			qError: { value: '.post-error, h2' },
			qOmitted: { value: '.abbrev > span:last-child' },
			qMsg: { value: '.postbody' },
			qTrunc: { value: '.abbrev > span:nth-last-child(2)' },
			timePattern: { value: 'dd+m+?+?+?+?+?+yyyy++w++hh+ii-?s?s?' },
			getImgLink: { value: function(img) {
				var el = img.parentNode;
				if(el.tagName === 'A') {
					return el;
				}
				return $q('.fileinfo > a', el.parentNode);
			} },
			getPageUrl: { value: function(b, p) {
				return fixBrd(b) + (p > 0 ? p + this.docExt : 'index.xhtm');
			} },
			getPicWrap: { value: function(el) {
				if(!el.previousElementSibling) {
					el = el.parentNode;
				}
				return el.parentNode;
			} },
			getTNum: { value: function(op) {
				return $q('a[name]', op).name.match(/\d+/)[0];
			} },
			pagesCount: { configurable: true, get: function() {
				var a = $T('a', $c('pages', doc)),
					aCnt = a.length,
					val = +a[aCnt === 1 ? aCnt - 1 : aCnt - 2].textContent || 1;
				Object.defineProperty(this, 'pagesCount', { value: val });
				return val;
			} },
			css: { value: '.de-post-hid > .de-ppanel ~ *, #hideinfotd, .reply_, .delete > img, .popup, .search_google, .search_iqdb { display: none !important; }\
				.delete { background: none; }\
				.delete_checkbox { position: static !important; }\
				.file + .de-ytube-obj { float: left; margin: 5px 20px 5px 5px; }\
				.de-ytube-obj + div { clear: left; }' },
			hasPicWrap: { value: true },
			rLinkClick: { value: 'onclick="Highlight(event, this.getAttribute(\'de-num\'))"' },
			ru: { value: true },
			init: { value: function() {
				if(window.location.pathname === '/settings') {
					nav = getNavFuncs();
					$q('input[type="button"]', doc).addEventListener('click', function() {
						readCfg();
						saveCfg('__hanarating', $id('rating').value);
					}, false);
					return true;
				}
			} },

			hana: { value: true }
		},
		'script[src*="kusaba"]': {
			cOPost: { value: 'postnode' },
			qError: { value: 'h1, h2, div[style*="1.25em"]' },
			getPicWrap: { value: function(el) {
				return el.parentNode.parentNode;
			} },
			css: { value: '.de-post-hid > .de-ppanel ~ *, #newposts_get, .extrabtns, .ui-resizable-handle, .replymode, blockquote + a { display: none !important; }\
				.ui-wrapper { display: inline-block; width: auto !important; height: auto !important; padding: 0 !important; }' },
			isBB: { value: true },
			rLinkClick: { value: 'onclick="highlight(this.textContent.substr(2), true)"' },

			kus: { value: true }
		}
	};

	var ibBase = {
		cFileInfo: 'filesize',
		cOPost: 'oppost',
		cReply: 'reply',
		cRPost: 'reply',
		cSubj: 'filetitle',
		cTrip: 'postertrip',
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
		qBan: '',
		qDelBut: 'input[type="submit"]',
		qDForm: '#delform, form[name="delform"]',
		qError: 'h1, h2, font[size="5"]',
		get qImgLink() {
			var val = '.' + this.cFileInfo + ' a[href$=".jpg"]:nth-of-type(1), ' +
				'.' + this.cFileInfo + ' a[href$=".png"]:nth-of-type(1), ' +
				'.' + this.cFileInfo + ' a[href$=".gif"]:nth-of-type(1)';
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
		qPages: 'table[border="1"] tr:first-of-type > td:nth-child(2) a',
		qPostForm: '#postform',
		qRef: '.reflink',
		qTable: 'form > table, div > table',
		timePattern: '',
		get qThread() {
			var val = $c('thread', doc) ? '.thread' :
				$q('div[id*="_info"][style*="float"]', doc) ? 'div[id^="t"]:not([style])' :
				'[id^="thread"]';
			Object.defineProperty(this, 'qThread', { value: val });
			return val;
		},
		qTrunc: '.abbrev, .abbr, .shortened',
		getImgLink: function(img) {
			var el = img.parentNode;
			while(el && el.tagName !== 'A') {
				el = el.parentNode;
			}
			return el;
		},
		getImgSize: function(infoEl, info) {
			if(info) {
				var sz = info.match(/(\d+)[x×](\d+)/);
				return [sz[1], sz[2]];
			}
			return [-1, -1];
		},
		getImgWeight: function(info) {
			var w = info.match(/(\d+(?:\.\d+)?)\s*([mkк])?i?[bб]/i);
			return w[2] === 'M' ? (w[1] * 1e3) | 0 : !w[2] ? Math.round(w[1] / 1e3) : w[1];
		},
		getOmitted: function(el, len) {
			var txt;
			return el && (txt = el.textContent) ? +(txt.match(/\d+/) || [0])[0] + 1 : 1;
		},
		getOp: function(thr) {
			var el, op, opEnd;
			if(op = $c(this.cOPost, thr)) {
				return op;
			}
			op = thr.ownerDocument.createElement('div'),
			opEnd = $q(this.qTable + ', div[id^="repl"]', thr);
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
		getPicWrap: function(el) {
			var node = el.parentNode;
			return node.tagName === 'SPAN' ? node.parentNode : node;
		},
		getPNum: function(post) {
			return post.id.match(/\d+/)[0];
		},
		getPageUrl: function(b, p) {
			return fixBrd(b) + (p > 0 ? p + this.docExt : '');
		},
		getPostEl: function(el) {
			while(el && !el.classList.contains(this.cRPost) && !el.hasAttribute('de-thread')) {
				el = el.parentElement;
			}
			return el;
		},
		getPosts: function(thr) {
			return $Q('.' + this.cRPost, thr);
		},
		getSage: function(post) {
			var a = $q('a[href^="mailto:"], a[href="sage"]', post);
			return !!a && /sage/i.test(a.href);
		},
		getThrdUrl: function(b, tNum) {
			return this.prot + '//' + this.host + fixBrd(b) + this.res + tNum + this.docExt;
		},
		getTNum: function(op) {
			return $q('input[type="checkbox"]', op).value;
		},
		getWrap: function(el, isOp) {
			if(isOp) {
				return el;
			}
			if(el.tagName === 'TD') {
				Object.defineProperty(this, 'getWrap', { value: function(el, isOp) {
					return isOp ? el : getAncestor(el, 'TABLE');
				}});
			} else {
				Object.defineProperty(this, 'getWrap', { value: function(el, isOp) {
					return el;
				}});
			}
			return this.getWrap(el, isOp);
		},
		css: '.de-post-hid > .de-ppanel ~ * { display: none !important; }',
		init: null,
		isBB: false,
		appendPost: function(el, parent) {
			parent.appendChild(el);
		},
		removePost: function(post) {
			$del(post.wrap);
		},
		get pagesCount() {
			var val = $Q(this.qPages, dForm.parentNode).length;
			Object.defineProperty(this, 'pagesCount', { value: val });
			return val;
		},
		get reCrossLinks() {
			var val = new RegExp('>https?:\\/\\/[^\\/]*' + this.dm + '\\/([a-z0-9]+)\\/' +
				regQuote(this.res) + '(\\d+)(?:[^#<]+)?(?:#i?(\\d+))?<', 'g');
			Object.defineProperty(this, 'reCrossLinks', { value: val });
			return val;
		},
		rLinkClick: 'onclick="highlight(this.textContent.substr(2))"',
		anchor: '#',
		docExt: '.html',
		dm: '',
		host: window.location.hostname,
		hasPicWrap: false,
		prot: window.location.protocol,
		get rep() {
			var val = dTime || spells.haveReps || Cfg['crossLinks'];
			Object.defineProperty(this, 'rep', { value: val });
			return val;
		},
		res: 'res/',
		ru: false,
		trTag: 'TR'
	};

	var i, ibObj = ibBase, dm = window.location.hostname
		.match(/(?:(?:[^.]+\.)(?=org\.|net\.|com\.))?[^.]+\.[^.]+$|^\d+\.\d+\.\d+\.\d+$|localhost/)[0];
	if(dm in ibDomains) {
		ibObj = (function createBoard(info) {
			return Object.create(
				info[2] ? createBoard(ibDomains[info[2]]) :
				info[1] ? Object.create(ibBase, ibEngines[info[1]]) :
				ibBase, info[0]
			);
		})(ibDomains[dm]);
	} else {
		for(i in ibEngines) {
			if($q(i, doc)) {
				ibObj = Object.create(ibBase, ibEngines[i]);
				break;
			}
		}
	}
	ibObj.dm = dm;
	if(!ibObj.init || !ibObj.init()) {
		dForm = $q(ibObj.qDForm, doc);
	}
	return ibObj;
};


//============================================================================================================
//													BROWSER
//============================================================================================================

function getNavFuncs() {
	if(!('contains' in String.prototype)) {
		String.prototype.contains = function(s) {
			return this.indexOf(s) !== -1;
		};
		String.prototype.startsWith = function(s) {
			return this.indexOf(s) === 0;
		};
	}
	if(!('repeat' in String.prototype)) {
		String.prototype.repeat = function(nTimes) {
		  return new Array(nTimes + 1).join(this.valueOf());
		};
	}
	if('toJSON' in aProto) {
		delete aProto.toJSON;
	}
	if(!('URL' in window)) {
		window.URL = window.webkitURL;
	}
	var ua = window.navigator.userAgent,
		firefox = +(ua.match(/mozilla.*? rv:(\d+)/i) || [,0])[1],
		opera = window.opera ? +window.opera.version() : 0,
		webkit = ua.contains('WebKit/'),
		chrome = webkit && ua.contains('Chrome/'),
		safari = webkit && !chrome,
		isGM = typeof GM_setValue === 'function' && 
			(!chrome || !GM_setValue.toString().contains('not supported'));
	if(!window.GM_xmlhttpRequest) {
		window.GM_xmlhttpRequest = $xhr;
	}
	return {
		Firefox: firefox,
		Opera: opera,
		WebKit: webkit,
		Chrome: chrome,
		Safari: safari,
		isGM: isGM,
		isGlobal: isGM || !!scriptStorage,
		cssFix: webkit ? '-webkit-' : opera && opera < 12.1 ? '-o-' : firefox && firefox < 16 ? '-moz-' : '',
		Anim: !opera || opera >= 12,
		animName: webkit ? 'webkitAnimationName' : opera && opera < 12.1 ? 'OAnimationName' :
			firefox && firefox < 16 ? 'MozAnimationName' : 'animationName',
		animEnd: webkit ? 'webkitAnimationEnd' : opera && opera < 12.1 ? 'oAnimationEnd' :
			'animationend',
		animEvent: function(el, Fn) {
			el.addEventListener(this.animEnd, function aEvent() {
				this.removeEventListener(nav.animEnd, aEvent, false);
				Fn(this);
				Fn = null;
			}, false);
		},
		isBlob: firefox > 14 || chrome || opera >= 12.10,
		fixLink: safari ? getAbsLink : function fixLink(url) {
			return url;
		},
		get hasWorker() {
			var val = 'Worker' in (this.Firefox ? unsafeWindow : Window);
			Object.defineProperty(this, 'hasWorker', { value: val });
			return val;
		},
		get canPlayMP3() {
			var val = !!new Audio().canPlayType('audio/mp3; codecs="mp3"');
			Object.defineProperty(this, 'canPlayMP3', { value: val });
			return val;
		},
		get matchesSelector() {
			var dE = doc.documentElement,
				fun = dE.matchesSelector || dE.mozMatchesSelector ||
					dE.webkitMatchesSelector || dE.oMatchesSelector,
				val = Function.prototype.call.bind(fun);
			Object.defineProperty(this, 'matchesSelector', { value: val });
			return val;
		}
	};
}


//============================================================================================================
//												INITIALIZATION
//============================================================================================================

function Initialization() {
	if(/^(?:about|chrome|opera|res)/i.test(window.location)) {
		return false;
	}
	if(!(window.localStorage && typeof localStorage === 'object' && window.sessionStorage)) {
		GM_log('WEBSTORAGE ERROR: please, enable webstorage!');
		return false;
	}
	var intrv, url;
	aib = getImageBoard();
	switch(window.name) {
	case '': break;
	case 'de-iframe-pform':
	case 'de-iframe-dform':
		$script((
			'window.top.postMessage("A' + window.name + '$#$' +
			getSubmitResponse(doc, true).join('$#$') + '", "*");'
		).replace(/\n|\r/g, '\\n'), true);
		return false;
	case 'de-iframe-fav':
		intrv = setInterval(function() {
			$script('window.top.postMessage("B' + (doc.body.offsetHeight + 5) + '", "*");', true);
		}, 1500);
		window.addEventListener('load', setTimeout.bind(window, clearInterval, 3e4, intrv), false);
		liteMode = true;
		pr = {};
	}
	if(!dForm || $id('de-panel')) {
		return false;
	}
	nav = getNavFuncs();

	window.addEventListener('storage', function(e) {
		var data, temp, post, val = e.newValue;
		if(!val) {
			return;
		}
		switch(e.key) {
		case '__de-post': {
			try {
				data = JSON.parse(val);
			} catch(e) {
				return;
			}
			temp = data['hide'];
			if(data['brd'] === brd && (post = pByNum[data['num']]) && (post.hidden ^ temp)) {
				post.setUserVisib(temp, data['date'], false);
			} else {
				if(!(data['brd'] in bUVis)) {
					bUVis[data['brd']] = {};
				}
				bUVis[data['brd']][data['num']] = [+!temp, data['date']];
			}
			if(data['isOp']) {
				if(!(data['brd'] in hThr)) {
					if(temp) {
						hThr[data['brd']] = {};
					} else {
						break;
					}
				}
				if(temp) {
					hThr[data['brd']][data['num']] = data['title'];
				} else {
					delete hThr[data['brd']][data['num']];
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
			if(!(brd in hThr)) {
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
			Cfg['hideBySpell'] = data['hide'];
			if(temp = $q('input[info="hideBySpell"]', doc)) {
				temp.checked = data['hide'];
			}
			doc.body.style.display = 'none';
			disableSpells();
			if(data['data']) {
				spells.setSpells(data['data'], false);
				if(temp = $id('de-spell-edit')) {
					temp.value = spells.list;
				}
			} else {
				if(data['data'] === '') {
					spells.disable();
					if(temp = $id('de-spell-edit')) {
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

	url = (window.location.pathname || '').match(new RegExp(
		'^(?:\\/?([^\\.]*?)\\/?)?' + '(' + regQuote(aib.res) + ')?' +
		'(\\d+|index|wakaba|futaba)?' + '(\\.(?:[a-z]+))?$'
	));
	brd = url[1];
	TNum = url[2] ? url[3] :
		aib.futa ? +(window.location.search.match(/\d+/) || [false])[0] :
		false;
	pageNum = url[3] && !TNum ? +(
		aib.erns ? +(window.location.search.match(/\d+/) || [0])[0] : url[3]
	) || 0 : 0;
	if(aib.tiny && pageNum > 0) {
		pageNum--;
	}
	if(!aib.hasOwnProperty('docExt') && url[4]) {
		aib.docExt = url[4];
	}
	dummy = doc.createElement('div');
	return true;
}

function parseThreadNodes(form, threads) {
	var i, len, node, fNodes = aProto.slice.call(form.childNodes),
		cThr = doc.createElement('div');
	for(i = 0, len = fNodes.length - 1; i < len; ++i) {
		node = fNodes[i];
		if(node.tagName === 'HR') {
			form.insertBefore(cThr.lastChild, node);
			form.insertBefore(cThr, node);
			form.insertBefore(cThr.lastChild, cThr.nextSibling);
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

function tryToParse(node, thrds) {
	var i, fThr, lThr, len = thrds.length;
	$each($T('script', node), $del);
	try {
		if(len === 0) {
			Thread.parsed = true;
			thrds = parseThreadNodes(dForm, []);
			len = thrds.length;
			if(len === 0) {
				return null;
			}
		}
		fThr = lThr = new Thread(thrds[0], null);
		for(i = 1; i < len; i++) {
			lThr = new Thread(thrds[i], lThr);
		}
		thrds = null;
	} catch(e) {
		GM_log('DELFORM ERROR:\n' + (e.stack ? (nav.WebKit ? e.stack :
			e.name + ': ' + e.message + '\n' +
			(nav.Firefox ? e.stack.replace(/^([^@]*).*\/(.+)$/gm, function(str, fName, line) {
				return '    at ' + (fName ? fName + ' (' + line + ')' : line);
			}) : e.stack)
		) : e.name + ': ' + e.message));
		return null;
	}
	node.setAttribute('de-form', '');
	node.removeAttribute('id');
	if(aib.abu && TNum) {
		lThr = fThr.el;
		while((node = lThr.nextSibling) && node.tagName !== 'HR') {
			$del(node);
		}
	}
	return fThr;
}

function replaceString(txt) {
	if(dTime) {
		txt = dTime.fix(txt);
	}
	if(aib.fch || aib.krau) {
		if(aib.fch) {
			txt = txt.replace(/<wbr>/g, '');
		}
		txt = txt.replace(/(^|>|\s|&gt;)(https*:\/\/.*?)(<\/a>)?(?=$|<|\s)/ig, function(x, a, b, c) {
			return c ? x : a + '<a href="' + b + '">' + b + '</a>';
		});
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
	if(liteMode) {
		doc.body.insertAdjacentHTML('afterbegin', dForm.outerHTML);
		dForm = doc.body.firstChild;
		window.addEventListener('load', function() {
			while(dForm.nextSibling) {
				$del(dForm.nextSibling);
			}
		}, false);
	} else {
		dForm.insertAdjacentHTML('beforebegin', replaceString(dForm.outerHTML));
		dForm.style.display = 'none';
		dForm.id = 'de-dform-old';
		dForm = dForm.previousSibling;
		window.addEventListener('load', function() {
			$del($id('de-dform-old'));
		}, false);
	}
}

function initThreadUpdater(title, enableUpdater) {
	var delay, checked404, loadTO, audioRep, loadPostsFun, audioEl, stateButton, hasAudio,
		initDelay, favIntrv, favNorm, favHref, enabled = false,
		inited = false,
		lastECode = 200,
		newPosts = 0,
		aPlayers = 0,
		focused = !(doc.hidden || doc.webkitHidden);

	if(enableUpdater) {
		init();
	}
	if(focused && Cfg['desktNotif'] && ('permission' in Notification)) {
		switch(Notification.permission.toLowerCase()) {
		case 'default': requestNotifPermission(); break;
		case 'denied': saveCfg('desktNotif', 0);
		}
	}

	function init() {
		audioEl = null;
		stateButton = null;
		hasAudio = false;
		initDelay = Cfg['updThrDelay'] * 1e3;
		favIntrv = 0;
		favNorm = notifGranted = inited = true;
		favHref = ($q('head link[rel="shortcut icon"]', doc) || {}).href;
		if(nav.Firefox > 18 || nav.Chrome) {
			doc.addEventListener((nav.WebKit ? 'webkit' : '') + 'visibilitychange', function() {
				if(doc.hidden || doc.webkitHidden) {
					focused = false;
				} else {
					onVis();
				}
			}, false);
		} else {
			focused = false;
			window.addEventListener('focus', onVis, false);
			window.addEventListener('blur', function() {
				focused = false;
			}, false);
			window.addEventListener('mousemove', function mouseMove() {
				window.removeEventListener('mousemove', mouseMove, false);
				onVis();
			}, false);
		}
		loadPostsFun = firstThr.loadNew.bind(firstThr, onLoaded, true);
		enable();
	}

	function enable() {
		if(!enabled) {
			enabled = true;
			checked404 = false;
			newPosts = 0;
			delay = initDelay;
			loadTO = setTimeout(loadPostsFun, delay);
		}
	}

	function disable() {
		if(enabled) {
			clearTimeout(loadTO);
			enabled = hasAudio = false;
			setState('off');
			var btn = $id('de-btn-audio-on');
			if(btn) {
				btn.id = 'de-btn-audio-off';
			}
		}
	}

	function toggleAudio(aRep) {
		if(!audioEl) {
			audioEl = $new('audio', {
				'preload': 'auto',
				'src': 'https://raw.github.com/Y0ba/Dollchan-Extension-Tools/master/signal.ogg'
			}, null);
		}
		audioRep = aRep;
		return hasAudio = !hasAudio;
	}

	function audioNotif() {
		if(focused) {
			hasAudio = false;
		} else {
			audioEl.play()
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

	function onLoaded(eCode, eMsg, lPosts) {
		infoLoadErrors(eCode, eMsg, -1);
		if(eCode !== 200) {
			lastECode = eCode;
			updateTitle();
			if(eCode !== 0 && Math.floor(eCode / 500) === 0) {
				if(eCode === 404 && !checked404) {
					checked404 = true;
				} else {
					disable();
					return;
				}
			}
			setState('warn');
			loadTO = setTimeout(loadPostsFun, delay);
			return;
		}
		if(lastECode !== 200) {
			lastECode = 200;
			setState('on');
			checked404 = false;
			if(lPosts === 0) {
				updateTitle();
			}
		}
		if(!focused) {
			if(lPosts !== 0) {
				if(Cfg['favIcoBlink'] && favHref && newPosts === 0) {
					favIntrv = setInterval(function() {
						$del($q('link[rel="shortcut icon"]', doc.head));
						doc.head.insertAdjacentHTML('afterbegin', '<link rel="shortcut icon" href="' +
							(!favNorm ? favHref : 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAA' +
							'AQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVR' +
							'Ix2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII=') + '">');
						favNorm = !favNorm;
					}, 800);
				}
				newPosts += lPosts;
				updateTitle();
				if(Cfg['desktNotif'] && notifGranted) {
					var notif = new Notification(aib.dm + '/' + brd + '/' + TNum + ': ' + newPosts +
						Lng.newPost[lang][lang !== 0 ? +(newPosts !== 1) : (newPosts % 10) > 4 ||
						(newPosts % 10) === 0 || (((newPosts % 100) / 10) | 0) === 1 ? 2 :
						(newPosts % 10) === 1 ? 0 : 1] + Lng.newPost[lang][3],
					{
						'body': firstThr.last.text.substring(0, 250).replace(/\s+/g, ' '),
						'tag': aib.dm + brd + TNum,
						'icon': firstThr.last.imagesData['$firstSrc'] || favHref
					});
					notif.onshow = function() {
						setTimeout(this.close.bind(this), 12e3);
					};
					notif.onclick = function() {
						window.focus();
					};
					notif.onerror = function() {
						window.focus();
						requestNotifPermission();
					};
				}
				if(hasAudio) {
					if(audioRep) {
						audioNotif();
					} else {
						audioEl.play()
					}
				}
				delay = initDelay;
			} else if(delay !== 12e4) {
				delay = Math.min(delay + initDelay, 12e4);
			}
		}
		loadTO = setTimeout(loadPostsFun, delay);
	}

	function setState(state) {
		var btn = stateButton || (stateButton = $q('a[id^="de-btn-upd"]', doc));
		btn.id = 'de-btn-upd-' + state;
		btn.title = Lng.panelBtn['upd-' + (state === 'off' ? 'off' : 'on')][lang];
	}

	function onVis() {
		if(Cfg['favIcoBlink'] && favHref) {
			clearInterval(favIntrv);
			favNorm = true;
			$del($q('link[rel="shortcut icon"]', doc.head));
			doc.head.insertAdjacentHTML('afterbegin', '<link rel="shortcut icon" href="' + favHref + '">');
		}
		focused = true;
		newPosts = 0;
		setTimeout(function() {
			updateTitle();
			if(enabled) {
				clearTimeout(loadTO);
				delay = initDelay;
				loadPostsFun();
			}
		}, 200);
	}

	function updateTitle() {
		doc.title = (aPlayers === 0 ? '' : '♫ ') +
			(lastECode === 200 ? '' : '{' + lastECode + '} ') +
			(newPosts === 0 ? '' : '[' + newPosts + '] ') + title;
	}

	function addPlayingTag() {
		aPlayers++;
		if(aPlayers === 1) {
			updateTitle();
		}
	}

	function removePlayingTag() {
		aPlayers = Math.max(aPlayers - 1, 0);
		if(aPlayers === 0) {
			updateTitle();
		}
	}

	return {
		get enabled() {
			return enabled;
		},
		enable: function() {
			if(!inited) {
				init();
			} else if(!enabled) {
				enable();
			} else {
				return;
			}
			setState('on');
		},
		disable: disable,
		toggleAudio: toggleAudio,
		addPlayingTag: addPlayingTag,
		removePlayingTag: removePlayingTag
	};
}

function initPage() {
	if(Cfg['updScript']) {
		checkForUpdates(false, function(html) {
			$alert(html, 'updavail', false);
		});
	}
	if(TNum) {
		if(Cfg['rePageTitle']) {
			doc.title = '/' + brd + ' - ' + pByNum[TNum].title;
		}
		if(Cfg['addUpdBtn']) {
			Thread.processUpdBtn(true);
		}
	} else {
		setTimeout(window.scrollTo, 20, 0, 0);
	}
	updater = initThreadUpdater(doc.title, TNum && Cfg['ajaxUpdThr']);
}


//============================================================================================================
//													MAIN
//============================================================================================================

function addDelformStuff(isLog) {
	var pNum, post;
	preloadImages(null);
	isLog && (Cfg['preLoadImgs'] || Cfg['openImgs']) && $log('Preload images');
	embedMP3Links(null);
	isLog && Cfg['addMP3'] && $log('MP3 links');
	youTube.parseLinks(null);
	isLog && Cfg['addYouTube'] && $log('YouTube links');
	if(Cfg['addImgs']) {
		embedImagesLinks(dForm);
		isLog && $log('Image links');
	}
	if(Cfg['imgSrcBtns']) {
		addImagesSearch(dForm);
		isLog && $log('Sauce buttons');
	}
	if(Cfg['linksNavig'] === 2) {
		genRefMap(pByNum, !!Cfg['hideRefPsts']);
		for(pNum in pByNum) {
			post = pByNum[pNum];
			if(post.hasRef) {
				addRefMap(post, '');
			}
		}
		isLog && $log('Reflinks map');
	}
}

function doScript() {
	var initTime = oldTime = Date.now();
	if(!Initialization()) {
		return;
	}
	$log('Init');
	readCfg();
	spells = new Spells(!!Cfg['hideBySpell']);
	youTube = initYouTube(Cfg['addYouTube'], Cfg['YTubeType'], Cfg['YTubeWidth'], Cfg['YTubeHeigh'],
		Cfg['YTubeHD'], Cfg['YTubeTitles']);
	readFavorites();
	$log('Read config');
	$disp(doc.body);
	if(aib.rep || liteMode) {
		replaceDelform();
		$log('Replace delform');
	}
	pr = new PostForm($q(aib.qPostForm, doc), false, !liteMode);
	pByNum = Object.create(null);
	firstThr = tryToParse(dForm, $Q(aib.qThread, dForm));
	if(!firstThr) {
		$disp(doc.body);
		return;
	}
	readViewedPosts();
	saveFavorites();
	$log('Parse delform');
	if(Cfg['keybNavig']) {
		keyNav = new KeyNavigation();
		$log('Init keybinds');
	}
	if(!liteMode) {
		initPage();
		$log('Init page');
		addPanel();
		$log('Add panel');
	}
	initMessageFunctions();
	addDelformStuff(true);
	scriptCSS();
	$disp(doc.body);
	$log('Apply CSS');
	readPosts();
	readUserPosts();
	checkPostsVisib();
	saveUserPosts();
	$log('Apply spells');
	timeLog.push(Lng.total[lang] + (Date.now() - initTime) + 'ms');
}

if(doc.readyState === 'interactive' || doc.readyState === 'complete') {
	doScript();
} else {
	doc.addEventListener('DOMContentLoaded', doScript, false);
}

})(window.opera && window.opera.scriptStorage);
