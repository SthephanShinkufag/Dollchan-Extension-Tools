/* ==[ Localization.js ]======================================================================================
                                                 LOCALIZATION
=========================================================================================================== */

const Lng = {
	// Settings window: tooltips
	cfgNeedReload: [
		'Для применения необходима перезагрузка',
		'Reboot required to apply',
		'Для застосування необхідне перезавантаження'],
	// Settings window: tab names
	cfgTab: {
		filters : ['Фильтры', 'Filters', 'Фільтри'],
		posts   : ['Посты', 'Posts', 'Дописи'],
		images  : ['Картинки', 'Images', 'Зображ.'],
		links   : ['Ссылки', 'Links', 'Посил.'],
		form    : ['Форма', 'Form', 'Форма'],
		common  : ['Общее', 'Common', 'Спільне'],
		info    : ['Инфо', 'Info', 'Інфо']
	},
	// Settings window: options
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
			'Ховати відповіді на сховані дописи'],
		nextPageThr: [
			'Скрытые треды - загружать со следующих страниц',
			'Load threads from next pages instead of hidden',
			'Сховані треди - брати з наступних сторінок'],
		delHiddPost: {
			sel: [
				['Откл.', 'Всё', 'Только посты', 'Только треды'],
				['Disable', 'All', 'Posts only', 'Threads only'],
				['Вимк.', 'Все', 'Лише дописи', 'Лише треди']],
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
			'Блимати фавіконом в разі появи нових дописів'],
		desktNotif: [
			'Уведомлять о новых постах на рабочем столе',
			'Desktop notifications for new posts',
			'Повідомляти про нові дописи на стільниці'],
		markNewPosts: [
			'Выделять цветом новые посты',
			'Highlight new posts with color',
			'Виділяти кольором нові дописи'],
		markMyPosts: [
			'Выделять цветом мои посты',
			'Highlight my own posts',
			'Виділяти кольором мої дописи'],
		expandTrunc: [
			'Авторазворот сокращенных постов',
			'Autoexpand truncated posts',
			'Авторозгортання скорочених дописів'],
		widePosts: [
			'Растягивать посты по ширине экрана',
			'Stretch posts to page width',
			'Розтягувати дописи на ширину екрану'],
		limitPostMsg: [
			'Ограничение ширины текста в постах (px)',
			'Limit text width in posts messages (px)',
			'Обмеження ширини тексту в дописах (px)'
		],
		thrBtns: {
			sel: [
				['Откл.', 'Все', 'Все (на доске)', '"Новые посты" на доске'],
				['Disable', 'All', 'All (on board)', '"New posts" on board'],
				['Вимк.', 'Всі', 'Всі (на дошці)', '"Нові дописи" на дошці']],
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
				'Кнопки "Сховати допис/тред"']
		},
		showRepBtn: {
			sel: [
				['Откл.', 'С меню', 'Без меню'],
				['Disable', 'With menu', 'No menu'],
				['Вимк.', 'Із меню', 'Без меню']],
			txt: [
				'Кнопки "Ответить на пост/тред"',
				'"Reply to post/thread" buttons',
				'Кнопки "Відповісти на допис/тред"']
		},
		postBtnsCSS: {
			sel: [
				['Упрощенные', 'Серый градиент', 'Настраиваемые'],
				['Simple', 'Gradient grey', 'Custom'],
				['Спрощені', 'Сірий градієнт', 'Користувацькі']],
			txt: [
				'Кнопки постов ',
				'Post buttons ',
				'Кнопки дописів ']
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
			'Ховати імена в дописах'],
		correctTime: [
			'Коррекция времени в постах',
			'Time correction in posts',
			'Корекція часу в дописах'],
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
				['Вимк.', 'В дописі', 'По центру']],
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
				'Зменшувати при розкритті в дописі']
		},
		minImgSize: [
			'мин.',
			'min',
			'мін.'],
		maxImgSize: [
			'макс. размер раскрытия (px)',
			'max expansion size (px)',
			'макс. розмір розгортання (px)'],
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
				'Предварительно загружать картинки',
				'Preload images',
				'Наперед завантажувати зображення']
		},
		findImgFile: [
			'Распознавать файлы, встроенные в картинках',
			'Detect embedded files in images',
			'Розпізнавати файли, що вбудовані в зображення'],
		openImgs: {
			sel: [
				['Откл.', 'Все подряд', 'Только GIF', 'Кроме GIF'],
				['Disable', 'All types', 'Only GIF', 'Non-GIF'],
				['Вимк.', 'Всі', 'Лише GIF', 'Крім GIF']],
			txt: [
				'Заменять тамбнейлы на оригиналы',
				'Replace thumbnails with original images',
				'Замінювати зображення на оригінали']
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
			'Навигация постов по >>ссылкам',
			'Posts navigation by >>links',
			'Навігація дописів по >>посиланнях'],
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
			'Позначати переглянуті дописи'],
		strikeHidd: [
			'Зачеркивать >>ссылки на скрытые посты',
			'Strike >>links to hidden posts',
			'Закреслювати >>посилання на сховані дописи'],
		removeHidd: [
			'Также удалять из обратных >>ссылок',
			'Also remove from >>backlinks',
			'Також видаляти із зворотніх >>посилань'],
		noNavigHidd: [
			'Не отображать превью для скрытых постов',
			'Donʼt show previews for hidden posts',
			'Не показувати превʼю до cхованих дописів'],
		markMyLinks: [
			'Помечать ссылки на мои посты как (You)',
			'Mark links to my posts with (You)',
			'Позначати посилання на мої дописи як (You)'],
		crossLinks: [
			'Заменять http:// на >>/b/ссылки',
			'Replace http:// with >>/b/links',
			'Замінювати https:// на >>/b/посилання'],
		decodeLinks: [
			'Декодировать %D0%A5%D1 в ссылках',
			'Decode %D0%A5%D1 in links',
			'Декодувати %D0%A5%D1 в посиланнях'],
		insertNum: [
			'Вставлять >>ссылку по клику на №поста',
			'Insert >>link on №postnumber click',
			'Вставляти >>посилання на клік по №допису'],
		addOPLink: [
			'>>ссылка при ответе на OP в списке тредов',
			'Insert >>link when replying to OP on threads list',
			'>>посилання при відповіді на OP у списці тредів'],
		addImgs: [
			'Загружать картинки к jpg/png/gif ссылкам',
			'Load images for jpg/png/gif links',
			'Додавати зображення до jpg/png/gif посилань'],
		addMP3: [
			'Плеер к mp3 ссылкам',
			'Player for mp3 links',
			'Плеєр до mp3 посилань'],
		addVocaroo: [
			'к Vocaroo ссылкам',
			'for Vocaroo links',
			'до Vocaroo посилань'],
		addVimeo: [
			'Добавлять плеер к Vimeo ссылкам',
			'Add player for Vimeo links',
			'Додавати плеєр до Vimeo посилань'],
		embedYTube: {
			sel: [
				['Ничего', 'Превью+плеер', 'Плеер по клику'],
				['Nothing', 'Preview+player', 'On click player'],
				['Нічого', 'Превʼю+плеєр', 'Плеєр по кліку']],
			txt: [
				'к YouTube ссылкам',
				'for YouTube links',
				'до YouTube посилань']
		},
		YTubeTitles: [
			'Загружать названия к YouTube ссылкам',
			'Load titles for YouTube links',
			'Отримувати назви до YouTube посилань'],
		ytApiKey: [
			'Ключ YT API*',
			'YT API Key*',
			'Ключ YT API*'],

		// "Form" tab
		ajaxPosting: [
			'Отправка постов без перезагрузки',
			'Posting without page refresh',
			'Дописування без оновлення сторінки'],
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
			'Добавлять тред в Избранное после ответа',
			'Add thread to Favorites after reply',
			'Додавати тред в Вибране після відповіді'],
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
				['Gradient darkblue', 'Gradient blue', 'Solid grey', 'Transparent blue', 'Square dark',
					'Gradient pink'],
				['Gradient darkblue', 'Gradient blue', 'Solid grey', 'Transparent blue', 'Square dark',
					'Gradient pink'],
				['Gradient darkblue', 'Gradient blue', 'Solid grey', 'Transparent blue', 'Square dark',
					'Gradient pink']],
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
				['Вимкн.', 'Всі дописи', 'Крім схованих']],
			txt: [
				'Счетчик постов/картинок в треде',
				'Сounter for posts/images in thread',
				'Лічильник дописів/зображ. в треді']
		},
		rePageTitle: [
			'Название треда в заголовке вкладки',
			'Show thread title in the page tab',
			'Назва треду в заголовку вкладки'],
		inftyScroll: [
			'Бесконечная прокрутка страниц',
			'Infinite scrolling for pages',
			'Нескінченна прокрутка сторінок'],
		hideReplies: [
			'Показывать только OP в списке тредов',
			'Show only OP in threads list',
			'Показувати лише OP в списку тредів'],
		scrollToTop: [
			'Всегда перемещаться вверх в списке тредов',
			'Always scroll to top in the threads list',
			'Завжди гортати догори в списку тредів'],
		saveScroll: [
			'Запоминать позицию скролла в тредах',
			'Remember the scroll position in threads',
			'Пам`ятати позицію скролла в тредах'],
		favFolders: [
			'Папки досок в окне Избранного',
			'Boards folders in the Favorites window',
			'Папки дошок в вікні Вибраного'],
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
			'Наперед завантажити зображення\r\n([Ctrl+Click] лише для нових дописів)'],
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
			'Звукове сповіщення про нові дописи'],
		catalog: [
			'Перейти в каталог',
			'Go to catalog',
			'Перейти до каталогу'],
		enable: [
			'Включить/выключить Dollchan',
			'Turn on/off the Dollchan',
			'Увімкнути/вимкнути Dollchan'],
		postsCount: [
			'Постов в треде',
			'Posts in thread',
			'Дописів у треді'],
		postsNotHid: [
			'Постов в треде (без скрытых)',
			'Posts in thread (without hidden)',
			'Дописів у треді (крім схованих)'],
		filesCount: [
			'Картинок и видео в треде',
			'Images and videos in thread',
			'Зображень та відео у треді'],
		postersCount: [
			'Постящих в треде',
			'Posters in thread',
			'Дописувачів у треді']
	},

	// Post buttons: tooltips
	togglePost: [
		'Скрыть/Раскрыть пост',
		'Hide/Unhide post',
		'Сховати/показати допис'],
	toggleThr: [
		'Скрыть/Раскрыть тред',
		'Hide/Unhide thread',
		'Сховати/показати тред'],
	replyToPost: [
		'Ответить на пост',
		'Reply to post',
		'Відповісти на допис'],
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
		'Розмістити форму після допису'],
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
		['+10 дописів', 'Останні 30', 'Останні 50', 'Останні 100', 'Весь тред']],
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
		'Report a post',
		'Скарга на допис'],
	reportThr: [
		'Жалоба на тред',
		'Report a thread',
		'Скарга на тред'],
	markMyPost: [
		'Пометить как мой пост',
		'Mark as my post',
		'Відмітити як мій допис'
	],
	deleteMyPost: [
		'Убрать из моих постов',
		'Delete from my posts',
		'Прибрати з моїх дописів'
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
		'%l%i21 – тред (на дошці)/допис (в треді) нижче%/l',
		'%l%i20 – тред (на дошці)/допис (в треді) вище%/l',
		'%l%i31 – допис (на дошці) нижче%/l',
		'%l%i30 – допис (на дошці) вище%/l',
		'%l%i23 – приховати допис/тред%/l',
		'%l%i32 – перейти в тред%/l',
		'%l%i33 – розгорнути тред%/l',
		'%l%i211 – розгорнути зображення в дописі%/l',
		'%l%i22 – швидка відповідь%/l',
		'%l%i25t – відправити допис%/l',
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
		/* eslint-disable key-spacing, max-len, object-property-newline */
		янв: 0, фев: 1, мар: 2, апр: 3, май: 4, мая: 4, июн: 5, июл: 6, авг: 7, сен: 8, окт: 9, ноя: 10, дек: 11,
		jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
		січ: 0, лют: 1, бер: 2, кві: 3, тра: 4, чер: 5, лип: 6, сер: 7, вер: 8, жов: 9, лис: 10, гру: 11
		/* eslint-enable key-spacing, max-len, object-property-newline */
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
		'Сховані дописи та треди'],
	myPosts: [
		'Мои посты',
		'My posts',
		'Мої дописи'],

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
		'дописів надіслано'],
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
	refreshCounters: [
		'Обновить счетчики постов',
		'Refresh posts counters',
		'Оновити лічильники дописів'],
	refreshClear404: [
		'Обновить счетчики и очистить недоступные (404) треды',
		'Refresh counters and clear inaccessible (404) threads',
		'Оновити лічильники та очистити недоступні (404) треди'],
	clear404: [
		'Очистить недоступные (404) треды',
		'Clear inaccessible (404) threads',
		'Очистити недоступні (404) треди'],
	infoPage: [
		'Проверить положение тредов (до 10-й страницы)',
		'Check for threads position (up to 10th page)',
		'Перевірити актуальність тредів (до 10 сторінки)'],
	totalPosts: [
		'Всего постов в треде',
		'Total posts in thread',
		'Всього дописів в треді'],
	newPosts: [
		'Количество новых постов',
		'Number of new posts',
		'Кількість нових дописів'],
	myPostsRep: [
		'Ответов на ваши посты',
		'Replies to your posts',
		'Відповідей на ваші дописи'],
	thrPage: [
		'На какой странице сейчас тред',
		'What page is the thread on now',
		'На якій сторінці зараз тред'],
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
		'[Click] розгорнути в дописі, [Ctrl+Click] в центрі'],
	expImgFull: [
		'[Click] открыть по центру, [Ctrl+Click] в посте',
		'[Click] expand by center, [Ctrl+Click] in post',
		'[Click] розгорнути в центрі, [Ctrl+Click] в дописі'],
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
		'Допис не знайдено'],
	noHidThr: [
		'Нет скрытых тредов…',
		'No hidden threads…',
		'Немає схованих дописів…'],
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
		'Сховати дописи'],
	showPosts: [
		'Показать посты',
		'Show posts',
		'Показати дописи'],
	getNewPosts: [
		'Получить новые посты',
		'Get new posts',
		'Отримати нові дописи'],
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
		['новий допис', 'нових дописи', 'нових дописів']],
	youReplies: [
		['ответ Вам', 'ответа Вам', 'ответов Вам'],
		['reply to You', 'replies to You', 'replies to You'],
		['відповідь Вам', 'відповіді Вам', 'відповідей Вам']],
	latestPost: [
		'Последний пост',
		'Latest post',
		'Останній допис'],
	donateMsg: [
		'<b>Спасибо за использование Dollchan Extension!</b><br>Вы можете поддержать проект пожертвованием',
		'<b>Thank You for using Dollchan Extension!</b><br>You can support the project by donating',
		'<b>Дякуємо за використання Dollchan Extension!</b><br>Ви можете підтримати проект пожертвою'],
	firefoxAddon: [
		'Firefox аддон</a> доступен!',
		'Firefox add-on</a> is available!',
		'Firefox аддон</a> доступний!']
};
