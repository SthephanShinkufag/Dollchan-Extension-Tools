var version = '14.4.9.0',
defaultCfg = {
	'disabled':		0,		// script enabled by default
	'language':		0,		// script language [0=ru, 1=en]
	'hideBySpell':	1,		// hide posts by spells
	'spells':		'',		// user defined spells
	'sortSpells':	0,		// sort spells when applying
	'menuHiddBtn':	1,		// menu on hide button
	'hideRefPsts':	0,		// hide post with references to hidden posts
	'delHiddPost':	0,		// delete hidden posts
	'ajaxUpdThr':	1,		// auto update threads
	'updThrDelay':	60,		//		threads update interval in sec
	'noErrInTitle': 0,		//		don't show error number in title except 404
	'favIcoBlink':	1,		//		favicon blinking, if new posts detected
	'markNewPosts': 1,		//		new posts marking on page focus
	'desktNotif':	0,		//		desktop notifications, if new posts detected
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
	'webmControl':	1,		//		control bar fow webm files
	'webmVolume':	0,		//		default volume for webm files
	'maskImgs':		0,		// mask images
	'preLoadImgs':	0,		// pre-load images
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
	'addMP3':		1,		// embed mp3 links
	'addImgs':		0,		// embed links to images
	'addYouTube':	3,		// embed YouTube links [0=off, 1=onclick, 2=player, 3=preview+player, 4=only preview]
	'YTubeType':	0,		//		player type [0=flash, 1=HTML5]
	'YTubeWidth':	360,	//		player width
	'YTubeHeigh':	270,	//		player height
	'YTubeHD':		0,		//		hd video quality
	'YTubeTitles':	0,		//		convert links to titles
	'addVimeo':		1,		// 		embed vimeo links
	'ajaxReply':	2,		// posting with AJAX (0=no, 1=iframe, 2=HTML5)
	'postSameImg':	1,		// 		ability to post same images
	'removeEXIF':	1,		// 		remove EXIF data from JPEGs
	'removeFName':	0,		// 		remove file name
	'sendErrNotif': 1,		//		inform about post send error if page is blurred
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
	'loadPages':	1,		//		number of pages that are loaded on F5
	'updScript':	1,		// check for script's update
	'scrUpdIntrv':	1,		// 		check interval in days (every val+1 day)
	'textaWidth':	500,	// textarea width
	'textaHeight':	160		// textarea height
},

Lng = {
	cfg: {
		'hideBySpell':	['Заклинания: ', 'Magic spells: '],
		'sortSpells':	['Сортировать спеллы и удалять дубликаты', 'Sort spells and delete duplicates'],
		'menuHiddBtn':	['Дополнительное меню кнопок скрытия ', 'Additional menu of hide buttons'],
		'hideRefPsts':	['Скрывать ответы на скрытые посты*', 'Hide replies to hidden posts*'],
		'delHiddPost':	['Удалять скрытые посты', 'Delete hidden posts'],

		'ajaxUpdThr':	['AJAX обновление треда ', 'AJAX thread update '],
		'updThrDelay':	[' (сек)', ' (sec)'],
		'noErrInTitle':	['Не показывать номер ошибки в заголовке', 'Don\'t show error number in title'],
		'favIcoBlink':	['Мигать фавиконом при новых постах', 'Favicon blinking on new posts'],
		'markNewPosts':	['Выделять новые посты при переключении на тред', 'Mark new posts on page focus'],
		'desktNotif':	['Уведомления на рабочем столе', 'Desktop notifications'],
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
		'resizeImgs':	['Уменьшать в экран большие изображения', 'Resize large images to fit screen'],
		'webmControl':	['Показывать контрол-бар для webm-файлов', 'Show control bar for webm files'],
		'webmVolume':	[' Громкость webm-файлов по умолчанию [0-100]', ' Default volume for webm files [0-100]'],
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
		'addMP3':		['Добавлять плейер к mp3 ссылкам* ', 'Add player to mp3 links* '],
		'addVimeo':		['Добавлять плейер к Vimeo ссылкам* ', 'Add player to Vimeo links* '],
		'addImgs':		['Загружать изображения к jpg, png, gif ссылкам*', 'Load images to jpg, png, gif links*'],
		'addYouTube': {
			sel:		[['Ничего', 'Плейер по клику', 'Авто плейер', 'Превью+плейер', 'Только превью'], ['Nothing', 'On click player', 'Auto player', 'Preview+player', 'Only preview']],
			txt:		['к YouTube-ссылкам* ', 'to YouTube-links* ']
		},
		'YTubeType': {
			sel:		[['Flash', 'HTML5'], ['Flash', 'HTML5']],
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
		'sendErrNotif':	['Оповещать в заголовке об ошибке отправки поста', 'Inform in title about post send error'],
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
		'userPassw':	[' Постоянный пароль ', ' Fixed password '],
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
			txt:		['', '']
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
		'preimg':	['Предзагрузка картинок ([Ctrl+Click] только для новых постов)', 'Preload images ([Ctrl+Click] for new posts only)'],
		'maskimg':	['Маскировать картинки', 'Mask images'],
		'upd-on':	['Выключить автообновление треда', 'Disable thread autoupdate'],
		'upd-off':	['Включить автообновление треда', 'Enable thread autoupdate'],
		'audio-off':['Звуковое оповещение о новых постах', 'Sound notification about new posts'],
		'catalog':	['Каталог', 'Catalog'],
		'counter':	['Постов/Изображений в треде', 'Posts/Images in thread'],
		'imgload':	['Сохранить изображения из треда', 'Save images from thread'],
		'enable':	['Включить/выключить скрипт', 'Turn on/off the script']
	},

	selHiderMenu:	{
		'sel':		['Скрывать выделенное', 'Hide selected text'],
		'name':		['Скрывать имя', 'Hide name'],
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
		'%l%i24 – предыдущая страница/изображение%/l' +
		'%l%i217 – следующая страница/изображение%/l' +
		'%l%i23 – скрыть текущий пост/тред%/l' +
		'%l%i33 – раскрыть текущий тред%/l' +
		'%l%i22 – быстрый ответ или создать тред%/l' +
		'%l%i25t – отправить пост%/l' +
		'%l%i21 – тред (на доске)/пост (в треде) ниже%/l' +
		'%l%i20 – тред (на доске)/пост (в треде) выше%/l' +
		'%l%i31 – пост (на доске) ниже%/l' +
		'%l%i30 – пост (на доске) выше%/l' +
		'%l%i32 – открыть тред%/l' +
		'%l%i210 – открыть/закрыть настройки%/l' +
		'%l%i26 – открыть/закрыть избранное%/l' +
		'%l%i27 – открыть/закрыть скрытые посты%/l' +
		'%l%i28 – открыть/закрыть панель%/l' +
		'%l%i29 – включить/выключить маскировку изображений%/l' +
		'%l%i40 – обновить тред%/l' +
		'%l%i211 – раскрыть изображение текущего поста%/l' +
		'%l%i212t – жирный%/l' +
		'%l%i213t – курсив%/l' +
		'%l%i214t – зачеркнутый%/l' +
		'%l%i215t – спойлер%/l' +
		'%l%i216t – код%/l',
		'%l%i24 – previous page/image%/l' +
		'%l%i217 – next page/image%/l' +
		'%l%i23 – hide current post/thread%/l' +
		'%l%i33 – expand current thread%/l' +
		'%l%i22 – quick reply or create thread%/l' +
		'%l%i25t – send post%/l' +
		'%l%i21 – thread (on board)/post (in thread) below%/l' +
		'%l%i20 – thread (on board)/post (in thread) above%/l' +
		'%l%i31 – on board post below%/l' +
		'%l%i30 – on board post above%/l' +
		'%l%i32 – open thread%/l' +
		'%l%i210 – open/close Settings%/l' +
		'%l%i26 – open/close Favorites%/l' +
		'%l%i27 – open/close Hidden Posts Table%/l' +
		'%l%i28 – open/close the main panel%/l' +
		'%l%i29 – turn on/off masking images%/l' +
		'%l%i40 – update thread%/l' +
		'%l%i211 – expand current post\'s images%/l' +
		'%l%i212t – bold%/l' +
		'%l%i213t – italic%/l' +
		'%l%i214t – strike%/l' +
		'%l%i215t – spoiler%/l' +
		'%l%i216t – code%/l'
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
	change:			['Сменить', 'Change'],
	reply:			['Ответ', 'Reply'],
	loading:		['Загрузка...', 'Loading...'],
	checking:		['Проверка...', 'Checking...'],
	deleting:		['Удаление...', 'Deleting...'],
	error:			['Ошибка', 'Error'],
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
	thrHidden:		['Тредов скрыто: ', 'Threads hidden: '],
	postsSent:		['Постов отправлено: ', 'Posts sent: '],
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
	nextImg:		['Следующее изображение', 'Next image'],
	prevImg:		['Предыдущее изображение', 'Previous image'],

	seSyntaxErr:	['синтаксическая ошибка в аргументе спелла: %s', 'syntax error in argument of spell: %s'],
	seUnknown:		['неизвестный спелл: %s', 'unknown spell: %s'],
	seMissOp:		['пропущен оператор', 'missing operator'],
	seMissArg:		['пропущен аргумент спелла: %s', 'missing argument of spell: %s'],
	seMissSpell:	['пропущен спелл', 'missing spell'],
	seErrRegex:		['синтаксическая ошибка в регулярном выражении: %s', 'syntax error in regular expression: %s'],
	seUnexpChar:	['неожиданный символ: %s', 'unexpected character: %s'],
	seMissClBkt:	['пропущена закрывающаяся скобка', 'missing ) in parenthetical'],
	seRow:			[' (строка ', ' (row '],
	seCol:			[', столбец ', ', column ']
},

doc = window.document, aProto = Array.prototype,
Cfg, comCfg, hThr, Favor, pByNum, sVis, bUVis, uVis, needScroll,
aib, nav, brd, TNum, pageNum, updater, keyNav, firstThr, lastThr, visPosts = 2,
YouTube, WebmParser,
pr, dForm, dummy, spells,
Images_ = {preloading: false, afterpreload: null, progressId: null, canvas: null},
oldTime, timeLog = [], dTime,
ajaxInterval, lang, quotetxt = '', liteMode, isExpImg, isPreImg,
$each = Function.prototype.call.bind(aProto.forEach),
emptyFn = function() {};

