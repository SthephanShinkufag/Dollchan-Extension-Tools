/* ==[ BoardDetector.js ]=====================================================================================
                                             IMAGEBOARD DETECTOR
=========================================================================================================== */

function getImageBoard(checkDomains, checkEngines) {
	const ibDomains = {};
	const ibEngines = [];

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
			this.hasAltCaptcha = true;
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
				.captcha-box > img { display: block; width: 221px; cursor: pointer; }
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
			const el = $q(this.qBan, postEl);
			return !el ? 0 : el.textContent.includes('предупрежден') ? 2 : 1;
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
					const name = $q(this.qPostName, post);
					return name ? name.childElementCount === 0 && !$q('.ophui', post) : false;
				};
			} else {
				this.getSage = super.getSage;
			}
			return this.getSage(post);
		}
		getSubmitData(json) {
			let error = null;
			let postNum = null;
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
			let el = $q('td > .anoniconsselectlist');
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
			const box = $q('.captcha-box', cap.parentEl);
			if(Cfg.altCaptcha && box.firstChild.tagName !== 'IMG') {
				box.innerHTML = `<img>
					<input name="2chaptcha_value" maxlength="6" type="text">
					<input name="captcha_type" value="2chaptcha" type="hidden">
					<input name="2chaptcha_id" type="hidden">`;
				const [img, inp] = [...box.children];
				img.onclick = () => this.updateCaptcha(cap);
				inp.tabIndex = 999;
				cap.textEl = inp;
			} else {
				box.innerHTML = `<div id="captcha-widget-main"></div>
					<input name="captcha_type" value="invisible_recaptcha" type="hidden">`;
			}
			return null;
		}
		updateCaptcha(cap) {
			const url = Cfg.altCaptcha ? `/api/captcha/2chaptcha/id?board=${ this.b }&thread=` + pr.tNum :
				'/api/captcha/invisible_recaptcha/id';
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
					if(data.type === 'invisible_recaptcha') {
						$q('.captcha-key').value = data.id;
						if(!$id('captcha-widget').hasChildNodes()) {
							$script(`deCapWidget = grecaptcha.render('captcha-widget', {
									sitekey : '${ data.id }',
									theme   : 'light',
									size    : 'invisible',
									callback: function() {
										var el = document.getElementById('captcha-widget-main');
										el.innerHTML = '<input type="hidden" name="g-recaptcha-response">';
										el.firstChild.value = grecaptcha.getResponse();
									}
								});
								grecaptcha.execute(deCapWidget);`);
						} else {
							$script(`grecaptcha.reset(deCapWidget);
								grecaptcha.execute(deCapWidget);`);
						}
						break;
					} else if(data.type === '2chaptcha') {
						const img = box.firstChild;
						img.src = '';
						img.src = `/api/captcha/2chaptcha/image/${ data.id }`;
						box.lastChild.value = data.id;
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

			this.cReply = 'post reply';
			this.qClosed = '.fa-lock';
			this.qDForm = 'form[name*="postcontrols"]';
			this.qForm = 'form[name="post"]';
			this.qFormPassw = 'input[name="password"]';
			this.qFormRedir = null;
			this.qImgInfo = '.fileinfo';
			this.qOmitted = '.omitted';
			this.qPages = '.pages';
			this.qPostHeader = '.intro';
			this.qPostMsg = '.body';
			this.qPostName = '.name';
			this.qPostRef = '.post_no + a';
			this.qPostSubj = '.subject';
			this.qPostTrip = '.trip';
			this.qTrunc = '.toolong';

			this.firstPage = 1;
			this.formParent = 'thread';
			this.formTd = 'th';
			this.hasCatalog = true;
			this.jsonSubmit = true;
			this.timePattern = 'nn+dd+yy++w++hh+ii+ss';

			this._origInputs = null;
			this._qTable = '.post.reply';
		}
		get qImgNameLink() {
			return 'p.fileinfo > a:first-of-type';
		}
		get css() {
			return `.banner, .hide-thread-link, .mentioned,
					.post-hover { display: none !important; }
				div.post.reply:not(.de-entry):not(.de-cfg-tab):not(.de-win-body) {
					float: left !important; clear: left; display: block; }`;
		}
		get markupTags() {
			return ["'''", "''", '__', '~~', '**', '[code'];
		}
		async changeReplyMode(form, tNum) {
			if(!this._origInputs && !$q('input[name="hash"]', form)) {
				// Board without antibot protection
				pr.subm.value = Lng.reply[lang];
				const pageInp = $q('input[name="page"]', form);
				if(tNum) {
					$del(pageInp);
				} else if(!pageInp) {
					form.insertAdjacentHTML('beforeend', '<input name="page" value="1" type="hidden">');
				}
				return;
			}
			const query = 'div[style="display:none"], input[style="display:none"], ' +
				'span[style="display:none"], textarea[style="display:none"], ' +
				'input[type="hidden"]:not(.de-input-hidden)';
			if(!$q('input[name="thread"]', form)) {
				// Switching from the thread creation to post reply mode occurs. Saving the original fields.
				this._origInputs = [doc.createElement('div'), pr.subm.value];
				$each($Q(query, form), el => this._origInputs[0].appendChild(el));
			} else if(!tNum) {
				// Switching from the post reply to thread creation occurs. Restoring the original fields.
				pr.subm.value = this._origInputs[1];
				$each($Q(query, form), $del);
				form.insertAdjacentHTML('beforeend', this._origInputs[0].innerHTML);
				this._origInputs = null;
				return;
			}
			// Post reply mode. Loading a thread with a form that contains the correct hidden fields.
			const errFn = () => {
				$popup('load-form', Lng.errFormLoad[lang]);
				pr.closeReply();
			};
			$popup('load-form', Lng.loading[lang], true);
			await ajaxLoad(aib.getThrUrl(this.b, tNum), false).then(loadedDoc => {
				const loadedForm = $q(this.qForm, loadedDoc);
				if(!loadedForm) {
					errFn();
					return;
				}
				pr.subm.value = $q(this.qFormSubm, loadedDoc).value;
				$each($Q(query, form), $del);
				$each($Q(query, loadedForm), el => form.appendChild(doc.adoptNode(el)));
				closePopup('load-form');
			}, errFn);
		}
		fixVideo(isPost, data) {
			const videos = [];
			const els = $Q('.video-container, #ytplayer', isPost ? data.el : data);
			for(let i = 0, len = els.length; i < len; ++i) {
				const el = els[i];
				videos.push([isPost ? data : this.getPostOfEl(el), el.id === 'ytplayer' ?
					el.src.match(Videos.ytReg) : ['', el.getAttribute('data-video')], true]);
				$del(el);
			}
			return videos;
		}
		getImgRealName(wrap) {
			return ($q('.postfilename, .unimportant > a[download]', wrap) ||
				$q(this.qImgNameLink, wrap)).textContent;
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
			const form = $q('form[name="post"]');
			if(form) {
				form.insertAdjacentHTML('beforeend',
					'<input class="de-input-hidden" name="json_response" value="1" type="hidden">');
			}
			$each($Q('br.clear'), el => {
				const hr = el.nextElementSibling;
				if(hr && hr.tagName === 'HR') {
					$after(el.parentNode, hr);
				}
				$del(el);
			});
			return false;
		}
		isAjaxStatusOK(status) {
			return status === 200 || status === 400;
		}
		updSubmitButton() {}
	}
	ibEngines.push(['form[name*="postcontrols"]', Tinyboard]);

	class Vichan extends Tinyboard {
		constructor(prot, dm) {
			super(prot, dm);

			this.qDelPassw = '#password';
			this.qPostImg = '.post-image[alt]:not(.deleted)';

			this.multiFile = true;
		}
		get css() {
			return `${ super.css }
				#expand-all-images, #expand-all-images + .unimportant, .fileinfo > span[style*="nowrap;"],
					.post-btn, small { display: none !important; }
				body { padding: 0 5px !important; }
				.boardlist { position: static !important; }
				.fileinfo { width: 250px; }
				.multifile { width: auto !important; }`;
		}
		fixFileInputs(el) {
			let str = '';
			for(let i = 0; i < 5; ++i) {
				str += `<div${ i ? ' style="display: none;"' : ''
				}><input type="file" name="file${ i ? i + 1 : '' }"></div>`;
			}
			el.innerHTML = str;
		}
		fixHTMLHelper(str) {
			return str.replace(/"\/player\.php\?v=([^&]+)&[^"]+"/g, '"$1"');
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
		getImgRealName(wrap) {
			const el = $q('.filesize', wrap).textContent.split(',')[2];
			return !el && super.getImgRealName(wrap) || el.replace(')', '');
		}
		init() {
			const el = $id('posttypeindicator');
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

	class LynxChan extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);

			this.cReply = 'innerPost';
			this.qDForm = 'form[action$="contentActions.js"]';
			this.qError = '#errorLabel, #labelMessage';
			this.qForm = '.form-post';
			this.qFormPassw = 'input[name="password"]';
			this.qFormRules = '.form-post > .small';
			this.qFormSubm = '#formButton';
			this.qImgInfo = '.uploadDetails';
			this.qOmitted = '.labelOmission';
			this.qOPost = '.innerOP';
			this.qPages = '#divPages';
			this.qPostHeader = '.postInfo, .de-post-btns';
			this.qPostImg = '.imgLink > img, img[src*="/.media/"]';
			this.qPostMsg = '.divMessage';
			this.qPostRef = '.linkQuote';
			this.qRPost = '.innerPost';
			this.qTrunc = '.contentOmissionIndicator';

			this.firstPage = 1;
			this.formParent = 'threadId';
			this.formTd = 'th';
			this.hasCatalog = true;
			this.jsonSubmit = true;
			this.multiFile = true;

			this._qTable = '.divPosts';
		}
		get qImgNameLink() {
			return '.originalNameLink';
		}
		get qThread() {
			return '.opCell';
		}
		get css() {
			return `.de-video-link + div[style="display: inline;"] > .embedButton, .de-parea > hr,
					.divRefresh, #jsButton, .hideButton, .nameLink, #newPostFieldset, .panelBacklinks,
					body > div[style^="display: inline;"] { display: none !important; }
				.divPosts { margin: 0 0; }
				#formButton { display: initial !important; }
				.form-post button, .form-post input, .form-post img { width: initial; }`;
		}
		get markupTags() {
			return ["'''", "''", '__', '~~', '**', '[code'];
		}
		changeReplyMode(form, tNum) {
			const action = form.getAttribute('action');
			form.setAttribute('action', tNum ? action.replace('newThread', 'replyThread') :
				action.replace('replyThread', 'newThread'));
		}
		fixFileInputs(el) {
			const str = '><input name="files" type="file"></div>';
			el.innerHTML = '<div' + str +
				('<div style="display: none;"' + str).repeat(+$id('labelMaxFiles').textContent - 1);
		}
		getCapParent(el) {
			return $id('captchaDiv');
		}
		getImgRealName(wrap) {
			return $q('.originalNameLink', wrap).textContent;
		}
		getImgSrcLink(img) {
			const el = img.parentNode;
			return el.tagName === 'A' ? el : $q('.originalNameLink', el.parentNode);
		}
		getImgWrap(img) {
			return $parent(img, 'FIGURE');
		}
		getPageUrl(b, p) {
			return fixBrd(b) + (p > 1 ? p + this.docExt : 'index.html');
		}
		getPNum(post) {
			return +$q('.deletionCheckBox', post).name.split('-')[2];
		}
		getPostWrap(el, isOp) {
			return isOp ? el : el.parentNode;
		}
		getSubmitData(json) {
			return {
				error   : json.status === 'error' ? json.data : null,
				postNum : json.status === 'ok' ? +json.data : null
			};
		}
		getTNum(op) {
			return +$q('.deletionCheckBox', op).name.split('-')[1];
		}
		init() {
			$script('if("autoRefresh" in window) clearInterval(refreshTimer);');
			if(!$q(this.qForm + ' td')) {
				const table = $aBegin($q(this.qForm), '<table><tbody></tbody></table>').firstChild;
				const els = $Q('#fieldName, #fieldEmail, #fieldSubject, #fieldMessage, ' +
					'#fieldPostingPassword, #divUpload');
				for(let i = 0, len = els.length; i < len; ++i) {
					const td = $bEnd(table, '<tr><th></th><td></td></tr>').lastChild;
					td.appendChild(els[i]);
				}
			}
			return false;
		}
		isAjaxStatusOK(status) {
			return status === 200 || status === 400 || status === 500;
		}
		async sendHTML5Post(form, data, needProgress, hasFiles) {
			const getBase64 = async function(file) {
				return new Promise((resolve, reject) => {
					const reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = () => resolve(reader.result);
					reader.onerror = error => reject(error);
				});
			};
			const getCookies = function() {
				const parsedCookies = {};
				const cookies = document.cookie.split(';');
				for(let i = 0; i < cookies.length; i++) {
					const parts = cookies[i].split('=');
					parsedCookies[parts.shift().trim()] = decodeURI(parts.join('='));
				}
				return parsedCookies;
			};
			const dataObj = { files: [] };
			const files = [];
			data.forEach(async (value, key) => {
				if(key !== 'files') {
					dataObj[key] = value;
				} else {
					files.push(value);
				}
			});
			for(let i = 0, len = files.length; i < len; ++i) {
				const file = files[i];
				if(file.type) {
					dataObj.files.push({
						content: `data:${ file.type };base64,${
							await getBase64(file).then(data => data.split(',')[1]) }`,
						name    : file.name,
						spoiler : false
					});
				}
			}
			const cookieObj = getCookies();
			const ajaxParams = {
				data: JSON.stringify({
					captchaId  : cookieObj.captchaid,
					bypassId   : cookieObj.bypass,
					parameters : dataObj,
					auth       : { login: cookieObj.login, hash: cookieObj.hash }
				}),
				headers : { 'Content-Type': 'application/x-www-form-urlencoded' },
				method  : 'POST'
			};
			if(needProgress && hasFiles) {
				ajaxParams.onprogress = getUploadFunc();
			}
			try {
				const xhr = await $ajax(
					'/.api/' + form.action.split('/').pop().replace('.js', ''), ajaxParams);
				return xhr.responseText;
			} catch(err) {
				return Promise.reject(err);
			}
		}
		updateCaptcha() {
			$script('reloadCaptcha();');
			return null;
		}
		updSubmitButton(el) {
			el.textContent = Lng.reply[lang];
		}
	}
	ibEngines.push(['form[action$="contentActions.js"]', LynxChan]);

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
			const el = $id('submit_button');
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
			$id('captchadiv').innerHTML =
				`<img src="${ this.getCaptchaSrc() }" style="vertical-align: bottom;" id="imgcaptcha">`;
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
			return `/${ this.b }/captcha.fpl?${ Math.random() }`;
		}
		getImgWrap(img) {
			return img.parentNode.parentNode.parentNode;
		}
		getOmitted(el, len) {
			let txt;
			return el && (txt = el.textContent) ? +(txt.match(/\d+/) || [0])[0] - len : 1;
		}
		getPageUrl(b, p) {
			return `${ fixBrd(b) }${ p > 0 ? p : 0 }.memhtml`;
		}
		getSubmitData(json) {
			let error = null;
			let postNum = null;
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
			const btnEl = $q('#postform input[type="button"]');
			if(btnEl) {
				$replace(btnEl, '<input type="submit" value="Отправить">');
			}
			const dFormEl = $q(this.qDForm);
			$each($Q('input[type="hidden"]', dFormEl), $del);
			dFormEl.appendChild($q('.userdelete'));
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
			return `${ super.css }
				#resizer { display: none; }
				body { margin: 0 }
				form > span { margin-top: 5px; }
				form > .de-thread-buttons { float: left; }
				.de-thr-hid { display: inherit; }
				.topmenu { position: static; }`;
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
			return src.replace(/\?[^?]+$|$/, `?board=${ aib.b }&${ Math.random() }`);
		}
		getSage(post) {
			const el = $q('.filetitle', post);
			return el && el.textContent.includes('\u21E9');
		}
		init() {
			super.init();
			// Workaround for "OK bug" #921
			$bEnd(docBody, '<span id="faptcha_input" style="display: none"></span>');
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
			this.hasAltCaptcha = true;
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
				#g-recaptcha { height: initial; }
				.postForm { display: table !important; width: auto !important; }
				textarea { margin-right: 0 !important; }
				${ Cfg.widePosts ? '.sideArrows { display: none; }' : '' }`;
		}
		get markupTags() {
			return ['', '', '', '', $q('input[type="checkbox"][name="spoiler"]') ? '[spoiler' : ''];
		}
		get updateCaptcha() {
			let value = null;
			const tr = $id('captchaFormPart');
			if(tr) {
				const capClick = $bEnd(docBody, '<div onclick="initRecaptcha();"></div>');
				value = function() {
					if(Cfg.altCaptcha) {
						$id('g-recaptcha').innerHTML = $q('noscript', tr).innerHTML;
					} else {
						$replace($id('g-recaptcha'), '<div id="g-recaptcha"></div>');
						capClick.click();
					}
					tr.removeAttribute('onclick');
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
			return str.replace(/<span>([^<]+)(?:<\/?wbr>)?([^<]+)<\/span> \[<a [^>]+>Embed<\/a>\]/g, '$1$2')
				.replace(/<\/?wbr>/g, '')
				.replace(/ \(OP\)<\/a/g, '</a');
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
			let error = null;
			let postNum = null;
			const errEl = $q('#errmsg', data);
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
			Cfg.txtBtnsLoc = 0;
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
			return `${ super.css }
				input.delete, #post-moderation-fields { display: initial !important; }`;
		}
		initCaptcha(cap) {
			$q('td', cap.parentEl).innerHTML = `<input placeholder="${ Lng.cap[lang] }" class="captcha_text` +
				`" type="text" name="captcha_text" size="25" maxlength="8" autocomplete="off">
				<input class="captcha_cookie de-input-hidden" name="captcha_cookie" type="hidden">
				<div class="captcha_html"></div>`;
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
			setTimeout(() => {
				const delPosts = $Q('.post[postid=""]');
				for(let i = 0, len = delPosts.length; i < len; ++i) {
					try {
						const post = pByNum.get(+$q('blockquote', delPosts[i])
							.getAttribute('id').substring(1));
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

			this.qPostTrip = '.poster_id';

			this.markupBB = true;
		}
		get markupTags() {
			return ['b', 'i', 'u', 's', 'spoiler', 'code'];
		}
		getImgWrap(img) {
			return img.parentNode.parentNode.parentNode;
		}
		init() {
			super.init();
			if(Cfg.ajaxUpdThr) {
				locStorage.auto_thread_update = false;
			}
			return false;
		}
	}
	ibDomains['brchan.org'] = Brchan;

	class Lolifox extends Brchan {
		get css() {
			return `${ super.css }\r\n\t${
				Cfg.noSpoilers ? `span.spoiler, span.spoiler:hover { ${
					Cfg.noSpoilers === 1 ? 'color: #F5F5F5 !important; background-color: #888 !important' :
					'color: inherit !important' }; transition: none !important; }` : '' }
				#thread-interactions { display: none; }
				.reflink::after { content: "" !important; }`;
		}
		getImgWrap(img) {
			return img.parentNode.parentNode;
		}
		getSage(post) {
			return !!$q('.sage', post);
		}
		init() {
			super.init();
			defaultCfg.timePattern = 'dd+nn+yy+++++hh+ii+ss';
			defaultCfg.timeRPattern = '_d/_n/_y(_w)_h:_i:_s';
			return false;
		}
	}
	ibDomains['lolifox.org'] = Lolifox;
	ibDomains['brchanansdnhvvnm.onion'] = Lolifox;

	class Diochan extends Kusaba {
		constructor(prot, dm) {
			super(prot, dm);

			this.multiFile = true;
		}
		get css() {
			return `${ super.css }
				.resize, .postblock { display: none; }`;
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
			const el = $id('postform');
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
			const prev = msg.previousElementSibling;
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

	class EndChan extends LynxChan {
		constructor(prot, dm) {
			super(prot, dm);

			this.qTrunc = '.contentOmissionIndicator > p';
		}
		get css() {
			return `${ super.css }
				.bottomNav, .delLink, #expandAll, .hidePost, .hideThread, .linkLast50,
					.linkPreview, #modeBanner, .watchButton { display: none !important; }
				.de-cfg-label { display: initial !important; }
				#de-main, .de-pview { font-size: 75%; }`;
		}
		init() {
			super.init();
			$each($Q('.imgLink > img[src^="/.youtube/"]'), el => $del($parent(el, 'FIGURE')));
			$each($Q('.youtube_wrapper'), el => {
				const src = $q('a', el).href;
				$del($bBegin(el, `<a href="${ src }">${ src }</a>`).nextSibling);
			});
			return false;
		}
	}
	ibDomains['endchan.xyz'] = EndChan;

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
			return `${ this.prot }//${ this.host }/${ this.b }/catalogue.html`;
		}
		get css() {
			return `${ !this.t ? '' : '#de-main { margin-top: -37px; } .logo { margin-bottom: 14px; }' }
			.iichan-hide-thread-btn { display: none; }
			.replypage div[id^="thread"] span.reflink::after { content: none; }`;
		}
		get isArchived() {
			return this.b.includes('/arch');
		}
		getImgRealName(wrap) {
			return $q('.filesize > em', wrap).textContent.split(',')[2] || super.getImgRealName(wrap);
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
			return `${ this.prot }//${ this.host }/catalog/${ this.b }`;
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
			return str.replace(/href="(#\d+)"/g, `href="/${ aib.b }/thread-${ aib.t }.html$1"`);
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
			const pMsg = msg.parentNode;
			const prev = pMsg.previousElementSibling;
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
		get css() {
			return super.css + (this.t ? '' : '\r\n.de-btn-rep { display: none !important; }');
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
			return `${ super.css }
				.sidearrows { display: none !important; }
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
			return `${ super.css }
				.replybacklinks, .resize { display: none; }`;
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

			this.jsonSubmit = false;
		}
		get css() {
			return `${ super.css }
				.mature_thread { display: block !important; }
				.mature_warning { display: none; }`;
		}
		getImgRealName(wrap) {
			return $q('.post-filename', wrap).textContent;
		}
		init() {
			super.init();
			$each($Q('img[data-mature-src]'), el => (el.src = el.getAttribute('data-mature-src')));
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
			return `${ super.css }
				.fa-sort { display: none; }
				time::after { content: none; }`;
		}
		get markupTags() {
			return ['b', 'i', 'u', 's', 'spoiler', 'code', 'sup', 'sub'];
		}
		init() {
			const val = '{ "simpleNavbar": true }';
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
	if(!dm) {
		dm = window.location.hostname;
	}
	if(!dm) {
		return null;
	}
	dm = dm.match(/(?:(?:[^.]+\.)(?=org\.|net\.|com\.))?[^.]+\.[^.]+$|^\d+\.\d+\.\d+\.\d+$|localhost/)[0];
	if(checkEngines) {
		for(let i = ibEngines.length - 1; i >= 0; --i) {
			const [path, Ctor] = ibEngines[i];
			if($q(path, doc)) {
				return new Ctor(prot, dm);
			}
		}
		return new BaseBoard(prot, dm);
	}
	return null;
}
