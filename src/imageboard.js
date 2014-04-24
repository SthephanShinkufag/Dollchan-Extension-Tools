//============================================================================================================
//													IMAGEBOARD
//============================================================================================================

function getImageBoard(checkDomains, checkOther) {
	var ibDomains = {
		'02ch.in': [{
			css: { value: 'span[id$="_display"] { display: none !important; }' },
			isBB: { value: true }
		}],
		'02ch.net': [{
			ru: { value: true },
			timePattern: { value: 'yyyy+nn+dd++w++hh+ii+ss' }
		}],
		'0chan.hk': [{
			nul: { value: true },
			
			css: { value: '#captcha_status, .content-background > hr, #postform nobr, .postnode + a, .replieslist, label[for="save"], span[style="float: right;"] { display: none !important; }\
				.ui-wrapper { position: static !important; margin: 0 !important; overflow: visible !important; }\
				.ui-resizable { display: inline !important; }\
				form textarea { resize: both !important; }'
			},
			ru: { value: true },
			timePattern: { value: 'w+yyyy+m+dd+hh+ii+ss' }
		}, 'script[src*="kusaba"]'],
		get '0-chan.hk'() { return this['0chan.hk']; },
		get '0-chan.ru'() { return this['0chan.hk']; },
		get '22chan.net'() { return this['ernstchan.com']; },
		get '2ch.hk'() { return [ibEngines['#ABU_css, #ShowLakeSettings']]; },
		get '2ch.cm'() { return [ibEngines['#ABU_css, #ShowLakeSettings']]; },
		get '2ch.pm'() { return [ibEngines['#ABU_css, #ShowLakeSettings']]; },
		get '2ch.re'() { return [ibEngines['#ABU_css, #ShowLakeSettings']]; },
		get '2ch.tf'() { return [ibEngines['#ABU_css, #ShowLakeSettings']]; },
		get '2ch.wf'() { return [ibEngines['#ABU_css, #ShowLakeSettings']]; },
		get '2ch.yt'() { return [ibEngines['#ABU_css, #ShowLakeSettings']]; },
		get '2-ch.so'() { return [ibEngines['#ABU_css, #ShowLakeSettings']]; },
		'2--ch.ru': [{
			tire: { value: true },
			
			qPages: { value: 'table[border="1"] tr:first-of-type > td:first-of-type a' },
			qTable: { value: 'table:not(.postfiles)' },
			_qThread: { value: '.threadz' },
			getOmitted: { value: function(el, len) {
				var txt;
				return el && (txt = el.textContent) ? +(txt.match(/\d+/) || [0])[0] - len : 1;
			} },
			docExt: { value: '.html' },
			css: { value: 'span[id$="_display"] { display: none !important; }' },
			getPageUrl: { value: function(b, p) {
				return fixBrd(b) + (p > 0 ? p : 0) + '.memhtml';
			} },
			hasPicWrap: { value: true },
			ru: { value: true },
			isBB: { value: true }
		}],
		get '2-ch.su'() { return this['2--ch.ru']; },
		get '2--ch.su'() { return this['2--ch.ru']; },
		'2chru.net': [{
			_2chru: { value: true }
		}, 'form[action*="imgboard.php?delete"]'],
		get '2-chru.net'() { return this['2chru.net']; },
		get 'dmirrgetyojz735v.onion'() { return this['2chru.net']; },
		'410chan.org': [{
			_410: { value: true },
			
			formButtons: { get: function() {
				return Object.create(this._formButtons, {
					tag: { value: ['**', '*', '__', '^^', '%%', '`', '', '', 'q'] }
				});
			} },
			getSage: { value: function(post) {
				var el = $c('filetitle', post);
				return el && el.textContent.contains('\u21E9');
			} },
			isBB: { value: false },
			timePattern: { value: 'dd+nn+yyyy++w++hh+ii+ss' }
		}, 'script[src*="kusaba"]'],
		'420chan.org': [{
			_420: { value: true },
			
			formButtons: { get: function() {
				return Object.create(this._formButtons, {
					tag: { value: ['**', '*', '', '', '%', 'pre', '', '', 'q'] }
				});
			} },
			qBan: { value: '.ban' },
			qError: { value: 'pre' },
			qPages: { value: '.pagelist > a:last-child' },
			qThread: { value: '[id*="thread"]' },
			getTNum: { value: function(op) {
				return $q('a[id]', op).id.match(/\d+/)[0];
			} },
			css: { value: '#content > hr, .hidethread, .ignorebtn, .opqrbtn, .qrbtn, noscript { display: none !important; }\
				.de-thr-hid { margin: 1em 0; }' },
			cssHide: { value: '.de-post-hid > .replyheader ~ *' },
			docExt: { value: '.php' },
			isBB: { value: true }
		}],
		'4chan.org': [{
			fch: { value: true },
			
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
			qImgLink: { value: '.fileThumb' },
			qName: { value: '.name' },
			qOmitted: { value: '.summary.desktop' },
			qPages: { value: '.pagelist > .pages:not(.cataloglink) > a:last-of-type' },
			qPostForm: { value: 'form[name="post"]' },
			qRef: { value: '.postInfo > .postNum' },
			qTable: { value: '.replyContainer' },
			qThumbImages: { value: '.fileThumb > img' },
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
			css: { value: '#mpostform, .navLinks, .postingMode { display: none !important; }' },
			cssHide: { value: '.de-post-hid > .postInfo ~ *' },
			docExt: { value: '' },
			rLinkClick: { value: '' },
			rep: { value: true },
			res: { value: 'thread/' }
		}],
		'7chan.org': [{
			init: { value: function() { return true; } }
		}],
		'9ch.ru': [{
			qRef: { value: '[color="#117743"]' },
			getPageUrl: { value: function(b, p) {
				return fixBrd(b) + (p > 0 ? p + this.docExt : 'index.htm');
			} },
			getThrdUrl: { value: function(b, tNum) {
				return this.prot + '//' + this.host + fixBrd(b) + 'index.php?res=' + tNum;
			} }
		}, 'form[action*="futaba.php"]'],
		'britfa.gs': [{
			init: { value: function() { return true; } }
		}],
		'dfwk.ru': [{
			timePattern: { value: 'w+yy+nn+dd+hh+ii' }
		}, 'script[src*="kusaba"]'],
		'dobrochan.com': [{
			dobr: { value: true },
			
			cSubj: { value: 'replytitle' },
			cFileInfo: { value: 'fileinfo' },
			qDForm: { value: 'form[action*="delete"]' },
			qError: { value: '.post-error, h2' },
			qOmitted: { value: '.abbrev > span:first-of-type' },
			qMsg: { value: '.postbody' },
			qPages: { value: '.pages > tbody > tr > td' },
			qTrunc: { value: '.abbrev > span:nth-last-child(2)' },
			timePattern: { value: 'dd+m+?+?+?+?+?+yyyy++w++hh+ii-?s?s?' },
			getImgLink: { value: function(img) {
				var el = img.parentNode;
				if(el.tagName === 'A') {
					return el;
				}
				return $q('.fileinfo > a', img.previousElementSibling ? el : el.parentNode);
			} },
			getImgSrc: { value: function(el) {
				return this.getImgLink(el).href;
			} },
			getPageUrl: { value: function(b, p) {
				return fixBrd(b) + (p > 0 ? p + this.docExt : 'index.xhtml');
			} },
			getImgWrap: { value: function(el) {
				return el.tagName === 'A' ? (el.previousElementSibling ? el : el.parentNode).parentNode :
					el.firstElementChild.tagName === 'IMG' ? el.parentNode : el;
			} },
			getTNum: { value: function(op) {
				return $q('a[name]', op).name.match(/\d+/)[0];
			} },
			css: { value: '.delete > img, .popup, .reply_, .search_google, .search_iqdb { display: none !important; }\
				.delete { background: none; }\
				.delete_checkbox { position: static !important; }\
				.file + .de-video-obj { float: left; margin: 5px 20px 5px 5px; }\
				.de-video-obj + div { clear: left; }' },
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
			} }
		}],
		'dva-ch.net': [{
			dvachnet: { value: true },
		}],
		'ernstchan.com': [{
			css: { value: '.content > hr, .de-parea > hr { display: none !important }' },
			cOPost: { value: 'thread_OP' },
			cReply: { value: 'post' },
			cRPost: { value: 'thread_reply' },
			qError: { value: '.error' },
			qMsg: { value: '.text' }
		}, 'link[href$="phutaba.css"]'],
		'hiddenchan.i2p': [{
			hid: { value: true }
		}, 'script[src*="kusaba"]'],
		'iichan.hk': [{
			iich: { value: true }
		}],
		'inach.org': [{
			css: { value: '#postform > table > tbody > tr:first-child { display: none !important; }' },
			isBB: { value: true }
		}],
		'krautchan.net': [{
			krau: { value: true },
			
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
			qPages: { value: 'table[border="1"] > tbody > tr > td > a:nth-last-child(2) + a' },
			qRef: { value: '.postnumber' },
			qThread: { value: '.thread_body' },
			qThumbImages: { value: 'img[id^="thumbnail_"]' },
			qTrunc: { value: 'p[id^="post_truncated"]' },
			timePattern: { value: 'yyyy+nn+dd+hh+ii+ss+--?-?-?-?-?' },
			getImgWrap: { value: function(el) {
				return el.parentNode;
			} },
			getSage: { value: function(post) {
				return !!$c('sage', post);
			} },
			getTNum: { value: function(op) {
				return $q('input[type="checkbox"]', op).name.match(/\d+/)[0];
			} },
			css: { value: 'img[id^="translate_button"], img[src$="button-expand.gif"], img[src$="button-close.gif"], body > center > hr, form > div:first-of-type > hr, h2, .sage { display: none !important; }\
					div[id^="Wz"] { z-index: 10000 !important; }\
					.de-thr-hid { margin-bottom: ' + (!TNum ? '7' : '2') + 'px; float: none !important; }\
					.file_reply + .de-video-obj, .file_thread + .de-video-obj { margin: 5px 20px 5px 5px; float: left; }\
					.de-video-obj + div { clear: left; }' },
			cssHide: { value: '.de-post-hid > div:not(.postheader)' },
			hasPicWrap: { value: true },
			isBB: { value: true },
			rLinkClick: { value: 'onclick="highlightPost(this.textContent.substr(2)))"' },
			rep: { value: true },
			res: { value: 'thread-' },
			init: { value: function() {
				doc.body.insertAdjacentHTML('beforeend', '<div style="display: none;">' +
					'<div onclick="window.lastUpdateTime = 0;"></div>' +
					'<div onclick="window.fileCounter = 1;"></div>' +
					'<div onclick="if(boardRequiresCaptcha) { requestCaptcha(true); }"></div>' +
					'<div onclick="setupProgressTracking();"></div>' +
				'</div>');
				var els = doc.body.lastChild.children;
				this.btnZeroLUTime = els[0];
				this.btnSetFCntToOne = els[1];
				this.initCaptcha = els[2];
				this.addProgressTrack = els[3];
			} }
		}],
		'lambdadelta.net': [{
			css: { value: '.content > hr { display: none !important }' },
			cssHide: { value: '.de-post-hid > .de-ppanel ~ *' }
		}, 'link[href$="phutaba.css"]'],
		'mlpg.co': [{
			formButtons: { get: function() {
				return Object.create(this._formButtons, {
					tag: { value: ['b', 'i', 'u', '-', 'spoiler', 'c', '', '', 'q'] },
				});
			} },
			getWrap: { value: function(el, isOp) {
				return el.parentNode;
			} },
			css: { value: '.image-hover, form > div[style="text-align: center;"], form > div[style="text-align: center;"] + hr { display: none !important; }' },
			isBB: { value: true }
		}, 'form[name*="postcontrols"]'],
		'nido.org': [{
			qPages: { value: '.pagenavi > tbody > tr > td:nth-child(2) > a:last-of-type' },
			getSage: { value: function(post) {
				return !!$q('a[href="mailto:cejas"]', post);
			} },
			init: { value: function() {
				for(var src, el, i = 0, els = $Q('span[id^="pv-"]', doc.body), len = els.length; i < len; ++i) {
					el = els[i];
					src = 'https://www.youtube.com/watch?v=' + el.id.substring(3);
					el.parentNode.insertAdjacentHTML('beforeend',
						'<p class="de-video-ext"><a href="' + src + '">' + src + '</a></p>');
					$del(el);
				}
			} }
		}, 'script[src*="kusaba"]'],
		'ponychan.net': [{
			pony: { value: true },
			
			cOPost: { value: 'op' },
			qPages: { value: 'table[border="0"] > tbody > tr > td:nth-child(2) > a:last-of-type' },
			css: { value: '#bodywrap3 > hr { display: none !important; }' }
		}, 'script[src*="kusaba"]'],
		'syn-ch.ru': [{
			css: { value: '.fa-sort, .image_id { display: none !important; }\
				time:after { content: none; }' },
			formButtons: { get: function() {
				return Object.create(this._formButtons, {
					tag: { value: ['b', 'i', 'u', 's', 'spoiler', 'code', 'sub', 'sup', 'q'] },
				});
			} },
			init: { value: function() {
				$script('$ = function(){};');
				$each($Q('.mentioned', doc), $del);
			} },
			isBB: { value: true }
		}, 'form[name*="postcontrols"]'],
		'touhouchan.org': [{
			toho: { value: true },

			css: { value: 'span[id$="_display"], #bottom_lnks { display: none !important; }' },
			isBB: { value: true }
		}],
		'urupchan.org': [{
			urup: { value: true },
			init: { value: function() {
				for(var src, el, i = 0, els = $Q('blockquote > span[style="float: left;"]', doc.body), len = els.length; i < len; ++i) {
					el = els[i];
					src = $t('a', el).href;
					el.parentNode.insertAdjacentHTML('beforeend',
						'<p class="de-video-ext"><a href="' + src + '">' + src + '</a></p>');
					$del(el);
				}
			} },
			css: { value: '#captchaimage, .replybacklinks, .messagehelperC { display: none !important }' }
		}, 'script[src*="kusaba"]']
	};

	var ibEngines = {
		'#ABU_css, #ShowLakeSettings': {
			abu: { value: true },
			
			formButtons: { get: function() {
				return Object.create(this._formButtons, {
					tag: { value: ['b', 'i', 'u', 's', 'spoiler', 'code', 'sup', 'sub', 'q'] }
				});
			} },
			qBan: { value: 'font[color="#C12267"]' },
			qDForm: { value: '#posts_form, #delform' },
			qOmitted: { value: '.mess_post, .omittedposts' },
			getImgWrap: { value: function(el) {
				return el.parentNode.parentNode;
			} },
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
			cssEn: { value: '#ABU_alert_wait, .ABU_refmap, #captcha_div + font, #CommentToolbar, .postpanel, #usrFlds + tbody > tr:first-child, body > center { display: none !important; }\
				.de-abtn { transition: none; }\
				#de-txt-panel { font-size: 16px !important; }\
				.reflink:before { content: none !important; }' },
			isBB: { value: true },
			init: { value: function() {
				var cd = $id('captcha_div'),
					img = cd && $t('img', cd);
				if(img) {
					cd.setAttribute('onclick', ['var el, i = 4,',
						'isCustom = (typeof event.detail === "object") && event.detail.isCustom;',
						"if(!isCustom && event.target.tagName !== 'IMG') {",
							'return;',
						'}',
						'do {', img.getAttribute('onclick'), '} while(--i > 0 && !/<img|не нужно/i.test(this.innerHTML));',
						"if(el = this.getElementsByTagName('img')[0]) {",
							"el.removeAttribute('onclick');",
							"if((!isCustom || event.detail.focus) && (el = this.querySelector('input[type=\\'text\\']'))) {",
								'el.focus();',
							'}',
						'}'
					].join(''));
					img.removeAttribute('onclick');
				}
			} }
		},
		'form[action*="futaba.php"]': {
			futa: { value: true },
			
			qDForm: { value: 'form:not([enctype])' },
			qImgLink: { value: 'a[href$=".jpg"], a[href$=".png"], a[href$=".gif"]' },
			qOmitted: { value: 'font[color="#707070"]' },
			qPostForm: { value: 'form:nth-of-type(1)' },
			qRef: { value: '.del' },
			qThumbImages: { value: 'a[href$=".jpg"] > img, a[href$=".png"] > img, a[href$=".gif"] > img' },
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
			cssEn: { value: '.de-cfg-body, .de-content { font-family: arial; }\
				.ftbl { width: auto; margin: 0; }\
				.reply { background: #f0e0d6; }\
				span { font-size: inherit; }' },
			docExt: { value: '.htm' }
		},
		'form[action*="imgboard.php?delete"]': {
			tinyIb: { value: true },
			ru: { value: true }
		},
		'form[name*="postcontrols"]': {
			tiny: { value: true },
			
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
			qPages: { value: '.pages > a:nth-last-of-type(2)' },
			qPostForm: { value: 'form[name="post"]' },
			qRef: { value: '.post_no:nth-of-type(2)' },
			qTrunc: { value: '.toolong' },
			firstPage: { value: 1 },
			timePattern: { value: 'nn+dd+yy++w++hh+ii+ss' },
			getPageUrl: { value: function(b, p) {
				return p > 1 ? fixBrd(b) + p + this.docExt : fixBrd(b);
			} },
			getTNum: { value: function(op) {
				return $q('input[type="checkbox"]', op).name.match(/\d+/)[0];
			} },
			cssEn: { get: function() {
				return '.banner, .mentioned, .post-hover' + (TNum ? '' : ', .de-btn-rep') + ' { display: none !important; }\
				form, form table { margin: 0; }';
			} },
			cssHide: { value: '.de-post-hid > .intro ~ *'}
		},
		'script[src*="kusaba"]': {
			kus: { value: true },
			
			cOPost: { value: 'postnode' },
			qError: { value: 'h1, h2, div[style*="1.25em"]' },
			cssEn: { value: '.extrabtns, #newposts_get, .replymode, .ui-resizable-handle, blockquote + a { display: none !important; }\
				.ui-wrapper { display: inline-block; width: auto !important; height: auto !important; padding: 0 !important; }' },
			isBB: { value: true },
			rLinkClick: { value: 'onclick="highlight(this.textContent.substr(2), true)"' }
		},
		'link[href$="phutaba.css"]': {
			phut: { value: true },
			
			cSubj: { value: 'subject' },
			cTrip: { value: 'tripcode' },
			qPages: { value: '.pagelist > li:nth-last-child(2)' },
			getImgWrap: { value: function(el) {
				return el.parentNode.parentNode;
			} },
			getSage: { value: function(post) {
				return !!$q('.sage', post);
			} },
			cssHide: { value: '.de-post-hid > .post > .post_body' },
			docExt: { value: '' },
			formButtons: { get: function() {
				return Object.create(this._formButtons, {
					tag: { value: ['b', 'i', 'u', 's', 'spoiler', 'code', '', '', 'q'] },
				});
			} },
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
				'.' + this.cFileInfo + ' a[href$=".gif"]:nth-of-type(1), ' +
				'.' + this.cFileInfo + ' a[href$=".webm"]:nth-of-type(1)';
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
		qRef: '.reflink',
		qTable: 'form > table, div > table',
		qThumbImages: '.thumb, .de-thumb, .ca_thumb, img[src*="thumb"], img[src*="/spoiler"], img[src^="blob:"]',
		timePattern: 'w+dd+m+yyyy+hh+ii+ss',
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
			return el.tagName === 'SPAN' ? el.parentNode : el;
		},
		getImgSrc: function(el) {
			return el.getAttribute('src');
		},
		getImgSize: function(info) {
			if(info) {
				var sz = info.match(/(\d+)\s?[x×]\s?(\d+)/);
				return [sz[1], sz[2]];
			}
			return [-1, -1];
		},
		getImgWeight: function(info) {
			var w = info.match(/(\d+(?:[\.,]\d+)?)\s*([mkк])?i?[bб]/i);
			return w[2] === 'M' ? (w[1] * 1e3) | 0 : !w[2] ? Math.round(w[1] / 1e3) : w[1];
		},
		getImgWrap: function(el) {
			var node = (el.tagName === 'SPAN' ? el.parentNode : el).parentNode;
			return node.tagName === 'SPAN' ? node.parentNode : node;
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
		css: '',
		cssEn: '',
		cssHide: '.de-post-hid > .de-ppanel ~ *',
		init: null,
		isBB: false,
		get lastPage() {
			var el = $q(this.qPages, doc),
				val = el && +aProto.pop.call(el.textContent.match(/\d+/g) || []) || 0;
			if(pageNum === val + 1) {
				val++;
			}
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
		firstPage: 0,
		host: window.location.hostname,
		hasPicWrap: false,
		prot: window.location.protocol,
		get rep() {
			var val = dTime || spells.haveReps || Cfg['crossLinks'];
			Object.defineProperty(this, 'rep', { value: val });
			return val;
		},
		res: 'res/',
		ru: false
	};

	var i, ibObj = null, dm = window.location.hostname
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
			checkOther = false;
		}
	}
	if(checkOther) {
		for(i in ibEngines) {
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
};

