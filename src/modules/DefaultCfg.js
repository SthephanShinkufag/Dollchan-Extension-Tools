/*==[ DefaultCfg.js ]=========================================================================================
                                                DEFAULT CONFIG
============================================================================================================*/

const defaultCfg = {
	'disabled':         0,      // script enabled by default
	'language':         0,      // script language [0=ru, 1=en]
	'hideBySpell':      1,      // hide posts by spells
	'spells':           null,   // user defined spells
	'sortSpells':       0,      // sort spells when applying
	'menuHiddBtn':      1,      // menu on hide button
	'hideRefPsts':      0,      // hide posts referenced to hidden posts
	'delHiddPost':      0,      // delete hidden [0=disable, 1=all, 2=posts only, 3=threads only]
	'ajaxUpdThr':       1,      // threads updater
	'updThrDelay':      20,     //    update interval (sec)
	'updCount':         1,      //    show countdown for thread updater
	'favIcoBlink':      0,      //    favicon blinking for new posts
	'desktNotif':       0,      //    desktop notifications for new posts
	'noErrInTitle':     0,      //    don't show error number in title (except 404)
	'markNewPosts':     1,      //    mark new posts with color when tab changes
	'useDobrAPI':       1,      //    dobrochan: use json API
	'markMyPosts':      1,      // mark my posts with color
	'hideReplies':      0,      // show only op-posts in threads list
	'expandTrunc':      0,      // auto expanding of truncated posts
	'updThrBtns':       1,      // updater buttons in threads list
	'showHideBtn':      1,      // show post hide button
	'showRepBtn':       1,      // show post reply button
	'postBtnsCSS':      1,      // post buttons style [0=simple green, 1=gradient grey, 2=custom]
	'postBtnsBack':     '#8c8c8c',      // custom background color
	'noSpoilers':       1,      // expand text spoilers [0=off, 1=grey, 2=native]
	'noPostNames':      0,      // hide post names
	'widePosts':        0,      // stretch posts to screen width
	'correctTime':      0,      // correct time in posts
	'timeOffset':       '+0',   //    time offset (hours)
	'timePattern':      '',     //    search pattern
	'timeRPattern':     '',     //    replace pattern
	'expandImgs':       2,      // expand images by click [0=off, 1=in post, 2=by center]
	'imgNavBtns':       1,      //    add image navigation for full images
	'resizeDPI':        0,      //    honor dpi settings
	'resizeImgs':       1,      //    resize large images
	'minImgSize':       100,    //    minimal image's size for expanding by center (px)
	'zoomFactor':       25,     //    zoom images by this factor on every wheel event (%)
	'webmControl':      1,      //    control bar for webm files
	'webmTitles':       0,      //    get webm titles from metadata
	'webmVolume':       100,    //    default volume for webm files (%)
	'minWebmWidth':     320,    //    minimal wibm width
	'preLoadImgs':      0,      // pre-load images
	'findImgFile':      0,      //    detect built-in files in images
	'openImgs':         0,      // open images in posts [0=off, 1=all images, 2=GIFs only, 3=non-GIFs]
	'imgSrcBtns':       1,      // add image search buttons
	'delImgNames':      0,      // remove names of images
	'maskImgs':         0,      // mask images
	'maskVisib':        7,      // visibility for masked images (%)
	'linksNavig':       2,      // navigation by >>links [0=off, 1=no map, 2=+refmap]
	'linksOver':        100,    //    delay appearance (ms)
	'linksOut':         1500,   //    delay disappearance (ms)
	'markViewed':       0,      //    mark viewed posts
	'strikeHidd':       0,      //    strike >>links to hidden posts
	'removeHidd':       0,      //        remove from refmap
	'noNavigHidd':      0,      //    don't show previews for hidden posts
	'markMyLinks':      1,      // mark links to my posts with ()
	'crossLinks':       0,      // replace http: with >>/b/links
	'decodeLinks':      0,      // decode %D0%A5%D1 in links
	'insertNum':        1,      // insert >>link on postnumber click
	'addOPLink':        0,      // insert >>link for reply to op-posts on board
	'addImgs':          0,      // embed links to images
	'addMP3':           1,      // embed mp3 links
	'addVocaroo':       1,      // embed Vocaroo links
	'addYouTube':       3,      // embed YouTube links [0=off, 1=onclick, 2=player, 3=preview+player, 4=preview]
	'YTubeType':        0,      //    player type [0=flash, 1=HTML5]
	'YTubeWidth':       360,    //    player width (px)
	'YTubeHeigh':       270,    //    player height (px)
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
	'cap4chanAlt':      1,      // 4chan: use alternative captcha
	'capUpdTime':       300,    // captcha update interval (sec)
	'captchaLang':      1,      // language input in captcha [0=off, 1=en, 2=ru]
	'addTextBtns':      1,      // text format buttons [0=off, 1=graphics, 2=text, 3=usual]
	'txtBtnsLoc':       1,      //    located at [0=top, 1=bottom]
	'passwValue':       '',     // user password value
	'userName':         0,      // user name
	'nameValue':        '',     //    value
	'noBoardRule':      1,      // hide board rules
	'noPassword':       1,      // hide form password field
	'noName':           0,      // hide form name field
	'noSubj':           0,      // hide form subject field
	'scriptStyle':      0,      /* script style
		[0=Gradient darkblue, 1=gradient blue, 2=solid grey, 3=transparent blue, 4=square dark] */
	'userCSS':          0,      // user style
	'userCSSTxt':       '',     //    css text
	'expandPanel':      0,      // show full main panel
	'panelCounter':     1,      // posts/images counter in script panel [0=off, 1=all posts, 2=not hidden]
	'rePageTitle':      1,      // replace page title in threads
	'animation':        1,      // CSS3 animation in script
	'closePopups':      0,      // auto-close popups
	'inftyScroll':      1,      // infinity scroll
	'scrollToTop':      0,      // scroll to top in threads list
	'hotKeys':          1,      // enable hotkeys
	'loadPages':        1,      //    number of pages that are loaded on F5
	'updScript':        1,      // check for script's update
	'scrUpdIntrv':      1,      //    check interval in days (every val+1 day)
	'turnOff':          0,      // enable script only for this site
	'textaWidth':       300,    // textarea width (px)
	'textaHeight':      115,    // textarea height (px)
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
	'vidWinY':          'top: 0',
	'cfgTab':           'filters'       // Opened tab in Settings window
};
