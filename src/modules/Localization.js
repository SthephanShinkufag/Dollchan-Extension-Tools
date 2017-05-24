/*==[ Localization.js ]=======================================================================================
                                                 LOCALIZATION
============================================================================================================*/

const Lng = {
	cfg: {
		'hideBySpell':  ['Спеллы: ', 'Magic spells: '],
		'sortSpells':   ['Сортировать спеллы и удалять дубликаты', 'Sort spells and delete duplicates'],
		'menuHiddBtn':  ['Дополнительное меню кнопок скрытия ', 'Additional menu of hide buttons'],
		'hideRefPsts':  ['Скрывать ответы на скрытые посты', 'Hide replies to hidden posts'],
		'delHiddPost':  {
			sel:        [['Откл.', 'Всё', 'Только посты', 'Только треды'], ['Disable', 'All', 'Posts only', 'Threads only']],
			txt:        ['Удалять скрытое', 'Delete hidden']
		},

		'ajaxUpdThr':   ['AJAX обновление треда ', 'AJAX thread update '],
		'updThrDelay':  ['(сек)', '(sec)'],
		'updCount':     ['Обратный счетчик секунд до обновления', 'Show countdown to thread update'],
		'favIcoBlink':  ['Мигать фавиконом при новых постах', 'Favicon blinking for new posts'],
		'desktNotif':   ['Уведомлять о новых постах на рабочем столе', 'Desktop notifications for new posts'],
		'noErrInTitle': ['Не показывать номер ошибки в заголовке', 'Don\'t show error number in title'],
		'markNewPosts': ['Выделять цветом новые посты', 'Mark new posts with color'],
		'useDobrAPI':   ['dobrochan: использовать json API', 'dobrochan: use json API'],
		'markMyPosts':  ['Выделять цветом мои посты', 'Mark my posts with color'],
		'hideReplies':  ['Показывать только оп-посты в списке тредов*', 'Show only op-posts in threads list*'],
		'expandTrunc':  ['Разворачивать сокращенные посты*', 'Auto expanding of truncated posts*'],
		'updThrBtns':   ['Кнопки получения новых постов в списке тредов', 'Get-new-posts buttons in threads list'],
		'showHideBtn':  ['Кнопки скрытия ', 'Hide buttons '],
		'showRepBtn':   ['Кнопки быстрого ответа', 'Quick reply buttons'],
		'postBtnsCSS': {
			sel:        [['Упрощенные', 'Серый градиент', 'Настраиваемые'], ['Simple green', 'Gradient grey', 'Custom filled']],
			txt:        ['Кнопки постов ', 'Post buttons ']
		},
		'noSpoilers':{
			sel:        [['Откл.', 'Серое', 'Родное'], ['Disable', 'Grey', 'Native']],
			txt:        ['Раскрытие текстовых спойлеров', 'Text spoilers expanding']
		},
		'noPostNames':  ['Скрывать имена в постах', 'Hide names in posts'],
		'widePosts':    ['Растягивать посты по ширине экрана', 'Stretch posts to screen width'],
		'hotKeys':      ['Горячие клавиши', 'Keyboard hotkeys'],
		'loadPages':    ['Количество страниц, загружаемых по F5', 'Number of pages that are loaded on F5 '],
		'correctTime':  ['Коррекция времени* ', 'Correct time* '],
		'timeOffset':   ['(ч) разница ', '(h) difference '],
		'timePattern':  ['Шаблон поиска', 'Search pattern'],
		'timeRPattern': ['Шаблон замены', 'Replace pattern'],

		'expandImgs': {
			sel:        [['Откл.', 'В посте', 'По центру'], ['Disable', 'In post', 'By center']],
			txt:        ['Раскрывать картинки по клику', 'Expand images on click']
		},
		'imgNavBtns':   ['Добавлять кнопки навигации по картинкам', 'Add buttons for images navigation'],
		'resizeDPI':    ['Отображать картинки пиксель в пиксель', 'Don\'t upscale images on retina displays'],
		'resizeImgs':   ['Уменьшать в экран большие картинки', 'Resize large images to fit screen'],
		'minImgSize':   ['Минимальный размер картинок (px)', 'Minimal image\'s size (px)'],
		'zoomFactor':   ['Чувствительность зума картинок [1-100%]', 'Sensibility of the images zoom [1-100%]'],
		'webmControl':  ['Показывать контрол-бар для webm-файлов', 'Show control bar for webm files'],
		'webmTitles':   ['Получать заголовки webm из метаданных', 'Get webm titles from metadata'],
		'webmVolume':   ['Громкость webm-файлов [0-100%]', 'Default volume for webm files [0-100%]'],
		'minWebmWidth': ['Минимальная ширина webm (px)', 'Minimal webm width (px)'],
		'preLoadImgs':  ['Предварительно загружать картинки*', 'Pre-load images*'],
		'findImgFile':  ['Распознавать встроенные файлы в картинках*', 'Detect built-in files in images*'],
		'openImgs': {
			sel:        [['Откл.', 'Все подряд', 'Только GIF', 'Кроме GIF'], ['Disable', 'All types', 'Only GIF', 'Non-GIF']],
			txt:        ['Заменять картинки на оригиналы*', 'Replace images with originals*']
		},
		'imgSrcBtns':   ['Добавлять кнопки для поиска картинок', 'Add image search buttons'],
		'delImgNames':  ['Скрывать имена картинок', 'Hide names of images'],
		'maskVisib':    ['Видимость при маскировке [0-100%]', 'Visibility for masked images [0-100%]'],

		'linksNavig': {
			sel:        [['Откл.', 'Без карты', 'С картой'], ['Disable', 'No map', 'With map']],
			txt:        ['Навигация по >>ссылкам* ', 'Navigation by >>links* ']
		},
		'linksOver':    ['Появление ', 'Appearance '],
		'linksOut':     ['Пропадание (мс)', 'Disappearance (ms)'],
		'markViewed':   ['Отмечать просмотренные посты', 'Mark viewed posts'],
		'strikeHidd':   ['Зачеркивать >>ссылки на скрытые посты', 'Strike >>links to hidden posts'],
		'removeHidd':   ['Удалять из карты ответов', 'Remove from replies map'],
		'noNavigHidd':  ['Не отображать превью для скрытых постов', 'Don\'t show previews for hidden posts'],
		'markMyLinks':  ['Помечать ссылки на мои посты как (You)', 'Mark links to my posts with (You)'],
		'crossLinks':   ['Преобразовывать http:// в >>/b/ссылки*', 'Replace http:// with >>/b/links*'],
		'decodeLinks':  ['Декодировать %D0%A5%D1 в ссылках*', 'Decode %D0%A5%D1 in links*'],
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
		'ytApiKey':     ['Ключ YT API*', 'YT API Key*'],

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
		'addSageBtn':   ['Кнопка Sage вместо "E-mail" ', 'Sage button instead of "E-mail" '],
		'saveSage':     ['Запоминать сажу', 'Remember sage'],
		'cap4chanAlt':  ['4chan: альтернативная капча*', '4chan: use alternative captcha*'],
		'capUpdTime':   ['Интервал обновления капчи (сек)', 'Captcha update interval (sec)'],
		'captchaLang': {
			sel:        [['Откл.', 'Eng', 'Rus'], ['Disable', 'Eng', 'Rus']],
			txt:        ['Язык ввода капчи', 'Language input in captcha']
		},
		'addTextBtns': {
			sel:        [['Откл.', 'Графич.', 'Упрощ.', 'Стандарт.'], ['Disable', 'As images', 'As text', 'Standard']],
			txt:        ['Кнопки разметки текста ', 'Text format buttons ']
		},
		'txtBtnsLoc':   ['Внизу', 'At bottom'],
		'userPassw':    ['Постоянный пароль', 'Fixed password'],
		'userName':     ['Постоянное имя', 'Fixed name'],
		'noBoardRule':  ['Правила ', 'Rules '],
		'noPassword':   ['Пароль ', 'Password '],
		'noName':       ['Имя ', 'Name '],
		'noSubj':       ['Тему', 'Subject'],

		'scriptStyle': {
			sel:        [
				['Gradient darkblue', 'Gradient blue', 'Solid grey', 'Transparent blue', 'Square dark'],
				['Gradient darkblue', 'Gradient blue', 'Solid grey', 'Transparent blue', 'Square dark']
			],
			txt:        ['Стиль скрипта', 'Script style']
		},
		'userCSS':      ['Пользовательский CSS', 'User CSS'],
		'panelCounter': {
			sel:        [['Откл.', 'Все посты', 'Без скрытых'], ['Disabled', 'All posts', 'Except hidden']],
			txt:        ['Счетчик постов/картинок на панели', 'Counter of posts/images on panel']
		},
		'rePageTitle':  ['Название треда в заголовке вкладки*', 'Thread title in page tab*'],
		'animation':    ['CSS3 анимация в скрипте', 'CSS3 animation in script'],
		'closePopups':  ['Автоматически закрывать уведомления', 'Close popups automatically'],
		'inftyScroll':  ['Бесконечная прокрутка страниц', 'Infinity scroll for pages'],
		'scrollToTop':  ['Всегда скроллить в топ на доске', 'Always scroll to top in threads list'],
		'updScript':    ['Автоматически проверять обновления скрипта', 'Check for script update automatically'],
		'scrUpdIntrv': {
			sel:        [
				['Каждый день', 'Каждые 2 дня', 'Каждую неделю', 'Каждые 2 недели', 'Каждый месяц'],
				['Every day', 'Every 2 days', 'Every week', 'Every 2 week', 'Every month']
			],
			txt:        ['', '']
		},
		'excludeList':  ['Не запускать скрипт на:', 'Prevent script launch on:'],
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
		'attach':       ['Прикрепить/Открепить панель', 'Attach/Detach panel'],
		'cfg':          ['Настройки', 'Settings'],
		'hid':          ['Скрытое', 'Hidden'],
		'fav':          ['Избранное', 'Favorites'],
		'vid':          ['Видео-ссылки', 'Video links'],
		'refresh':      ['Обновить', 'Refresh'],
		'goback':       ['Назад на доску', 'Return to board'],
		'gonext':       ['На страницу %s', 'Go to page %s'],
		'goup':         ['В начало страницы', 'To top of page'],
		'godown':       ['В конец страницы', 'To bottom of page'],
		'expimg':       ['Раскрыть все картинки', 'Expand all images'],
		'preimg':       [
			'Предзагрузка картинок ([Ctrl+Click] только для новых постов)',
			'Preload images ([Ctrl+Click] for new posts only)'
		],
		'maskimg':      ['Маскировать картинки', 'Mask images'],
		'upd-on':       ['Выключить автообновление треда', 'Disable thread autoupdate'],
		'upd-off':      ['Включить автообновление треда', 'Enable thread autoupdate'],
		'audio-off':    ['Звуковое оповещение о новых постах', 'Sound notification about new posts'],
		'catalog':      ['Перейти в каталог', 'Go to catalog'],
		'pcount':       ['Постов в треде', 'Posts in thread'],
		'pcountNotHid': ['Постов в треде (без скрытых)', 'Posts in thread (without hidden)'],
		'imglen':       ['Картинок в треде', 'Images in thread'],
		'posters':      ['Постящих в треде', 'Posters in thread'],
		'savethr':      ['Сохранить на диск', 'Save to disk'],
		'enable':       ['Включить/выключить скрипт', 'Turn on/off the script']
	},

	selHiderMenu: {
		'sel':          ['Скрывать выделенное', 'Hide selected text'],
		'name':         ['Скрывать имя', 'Hide name'],
		'trip':         ['Скрывать трип-код', 'Hide with trip-code'],
		'img':          ['Скрывать по размеру картинки', 'Hide by image size'],
		'imgn':         ['Скрывать по имени картинки', 'Hide by image name'],
		'ihash':        ['Скрывать по схожей картинке', 'Hide by similar image'],
		'noimg':        ['Скрывать без картинок', 'Hide without images'],
		'notext':       ['Скрывать без текста', 'Hide without text'],
		'text':         ['Скрыть схожий текст', 'Hide similar text'],
		'refs':         ['Скрыть с ответами', 'Hide with answers']
	},
	selExpandThr: [
		['+10 постов', 'Последние 30', 'Последние 50', 'Последние 100', 'Весь тред'],
		['+10 posts', 'Last 30 posts', 'Last 50 posts', 'Last 100 posts', 'All thread']
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
		'%l%i29 – вкл./выкл. маскировку картинок%/l',
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
		'%l%i28 – open/close main panel%/l',
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
	cancel:         ['Отмена', 'Cancel'],
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
	updating:       ['Обновление...', 'Updating...'],
	error:          ['Ошибка', 'Error'],
	noConnect:      ['Ошибка подключения', 'Connection failed'],
	internalError:	['Ошибка скрипта:\n', 'Script error:\n'],
	thrNotFound:    ['Тред недоступен (№', 'Thread is unavailable (№'],
	thrClosed:      ['Тред закрыт', 'Thread is closed'],
	thrArchived:    ['Тред в архиве', 'Thread is archived'],
	succDeleted:    ['Успешно удалено!', 'Succesfully deleted!'],
	errDelete:      ['Не могу удалить:\n', 'Can\'t delete:\n'],
	cTimeError:     ['Неправильные настройки времени', 'Invalid time settings'],
	noGlobalCfg:    ['Глобальные настройки не найдены', 'Global config not found'],
	postNotFound:   ['Пост не найден', 'Post not found'],
	dontShow:       ['Скрыть: ', 'Hide: '],
	checkNow:       ['Проверить сейчас', 'Check now'],
	updAvail:       ['Доступно обновление!', 'Update available!'],
	haveLatest:     ['У вас стоит самая последняя версия!', 'You have latest version!'],
	thrViewed:      ['Тредов посещено', 'Threads visited'],
	thrCreated:     ['Тредов создано', 'Threads created'],
	thrHidden:      ['Тредов скрыто', 'Threads hidden'],
	postsSent:      ['Постов отправлено', 'Posts sent'],
	total:          ['Всего', 'Total'],
	debug:          ['Отладка', 'Debug'],
	infoDebug:      ['Информация для отладки', 'Information for debugging'],
	fileImpExp:     ['Импорт/экспорт настроек в файл', 'Import/export config to file'],
	cfgImpExp:      ['Импорт/экспорт настроек', 'Import/export of config'],
	fileToData:     ['Загрузить данные из файла', 'Load data from a file'],
	dataToFile:     ['Получить файл</a> с данными', 'Get the file</a> with data'],
	globalCfg:      ['Глобальные настройки', 'Global config'],
	loadGlobal:     ['и применить к этому домену', 'and apply to this domain'],
	saveGlobal:     ['текущие настройки как глобальные', 'current config as global'],
	descrGlobal:    ['Глобальные настройки будут по умолчанию применяться<br>при первом посещеннии других доменов', 'Global config will apply by default<br>at the first visit of other domains'],
	editInTxt:      ['Правка в текстовом формате', 'Edit in text format'],
	resetCfg:       ['Сбросить в настройки по умолчанию', 'Reset config to defaults'],
	resetData:      ['Очистить данные', 'Reset selected data'],
	allDomains:     ['для всех доменов', 'for all domains'],
	delNotes:       ['Удаление выделенных записей', 'Deleting of selected notes'],
	saveChanges:    ['Сохранить внесенные изменения', 'Save your changes'],
	infoCount:      ['Обновить счетчики постов', 'Refresh posts counters'],
	infoPage:       ['Проверить актуальность тредов (до 10 страницы)', 'Check for threads actuality (up to 10 page)'],
	clrDeleted:     ['Очистить недоступные (404) треды', 'Clear inaccessible (404) threads'],
	oldPosts:       ['Постов при последнем посещении', 'Posts at the last visit'],
	myPostsRep:     ['Ответов на ваши посты', 'Replies to your posts'],
	newPosts:       ['Количество новых постов', 'Number of new posts'],
	thrPage:        ['Тред на @странице', 'Thread on @page'],
	hiddenPosts:    ['Скрытые посты', 'Hidden posts'],
	onPage:         [' на странице', ' on the page'],
	hidPostThr:     ['Скрытые посты и треды', 'Hidden posts and threads'],
	myPosts:        ['Мои посты', 'My posts'],
	noHidThr:       ['Нет скрытых тредов...', 'No hidden threads...'],
	invalidData:    ['Некорректный формат данных', 'Incorrect data format'],
	noFavThr:       ['Нет избранных тредов...', 'Favorites is empty...'],
	noVideoLinks:   ['Нет ссылок на видео...', 'No video links...'],
	hideLnkList:    ['Скрыть/Показать список ссылок', 'Hide/Unhide list of links'],
	prevVideo:      ['Предыдущее видео', 'Previous video'],
	nextVideo:      ['Следующее видео', 'Next video'],
	toPanel:        ['Закрепить на панели', 'Attach to panel'],
	underPost:      ['Поместить форму под пост', 'Move under post'],
	makeDrag:       ['Сделать перетаскиваемым окном', 'Make draggable window'],
	closeWindow:    ['Закрыть окно', 'Close window'],
	closeReply:     ['Закрыть форму', 'Close form'],
	replies:        ['Ответы:', 'Replies:'],
	postsOmitted:   ['Пропущено ответов: ', 'Posts omitted: '],
	showPosts:      ['Показать посты', 'Show posts'],
	hidePosts:      ['Скрыть посты', 'Hide posts'],
	collapseThr:    ['Свернуть тред', 'Collapse thread'],
	deleted:        ['удалён', 'deleted'],
	getNewPosts:    ['Получить новые посты', 'Get new posts'],
	page:           ['Страница', 'Page'],
	hiddenThr:      ['Скрытый тред', 'Hidden thread'],
	makeThr:        ['Создать тред', 'Create thread'],
	makeReply:      ['Ответить', 'Make reply'],
	noSage:         ['Без сажи', 'No sage'],
	hideForm:       ['Скрыть форму', 'Hide form'],
	search:         ['Искать в ', 'Search in '],
	wait:           ['Ждите', 'Wait'],
	noFile:         ['Нет файла', 'No file'],
	clickToAdd:     ['Выберите, либо перетащите файл', 'Select or drag and drop file'],
	removeFile:     ['Удалить файл', 'Remove file'],
	spoilFile:      ['Спойлер', 'Spoiler'],
	addUrlFile:     ['Добавить файл по ссылке', 'Add a file by url link'],
	linkToFile:     ['Введите/Перетяните сюда ссылку', 'Enter/Drop url link here'],
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
	errMsEdgeWebm:  ['Загрузите скрипт для воспроизведения webm (VP9/Opus)', 'Please load a script to play webm (VP9/Opus)'],
	expImgInline:   ['[Click] открыть в посте, [Ctrl+Click] в центре', '[Click] expand in post, [Ctrl+Click] by center'],
	expImgFull:     ['[Click] открыть в центре, [Ctrl+Click] в посте', '[Click] expand by center, [Ctrl+Click] in post'],
	nextImg:        ['Следующая картинка', 'Next image'],
	prevImg:        ['Предыдущая картинка', 'Previous image'],
	togglePost:     ['Скрыть/Раскрыть пост', 'Hide/Unhide post'],
	replyToPost:    ['Ответить на пост', 'Reply to post'],
	expandThr:      ['Развернуть тред', 'Expand thread'],
	addFav:         ['Добавить тред в Избранное', 'Add thread to Favorites'],
	delFav:         ['Убрать тред из Избранного', 'Remove thread from Favorites'],
	attachPview:    ['Закрепить превью', 'Attach preview'],
	expandVideo:    ['Развернуть/Свернуть видео', 'Expand/Collapse video'],
	duration:       ['Продолжительность: ', 'Duration: '],
	published:      ['опубликовано: ', 'published: '],
	author:         ['Автор: ', 'Author: '],
	views:          ['просмотров: ', 'views: '],

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
	sendingPost:    ['Отправка поста...', 'Sending post...'],
	sizeByte:       [' Байт', ' Byte'],
	sizeKByte:      [' КБ', ' KB'],
	sizeMByte:      [' МБ', ' MB'],
	sizeGByte:      [' ГБ', ' GB'],
	second:         ['с', 's']
};
