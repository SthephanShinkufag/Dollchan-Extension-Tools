/* ==[ BoardDetector.js ]=====================================================================================
                                             IMAGEBOARD DETECTOR
=========================================================================================================== */

function getImageBoard(checkDomains, checkEngines) {
	const ibDomains = {};
	const ibEngines = [];

	// ENGINES
	ibEngines.push(['form[action$="wakaba.pl"]', BaseBoard]);

	class Kusaba extends BaseBoard {
		constructor(...args) {
			super(...args);
			this.formHeaders = true;
			this.formParent = 'replythread';
			this.markupBB = true;
			this.qError = 'h1, h2, div[style*="1.25em"]';
			this.qFormRedir = 'input[name="redirecttothread"][value="1"]';
		}
		get css() {
			return `.extrabtns > a, .extrabtns > span, #newposts_get, .replymode, .ui-resizable-handle,
					blockquote + a { display: none; }
				.ui-wrapper { display: inline-block; width: auto !important;
					height: auto !important; padding: 0 !important; }`;
		}
		getCaptchaSrc(src) {
			return src.replace(/\?[^?]+$|$/, '?' + Math.random());
		}
		getImgRealName(wrap) {
			const el = $q('.filesize', wrap);
			if(el) {
				const info = el.textContent.split(',');
				if(info.length > 2) {
					return info.pop().replace(')', '');
				}
			}
			return super.getImgRealName(wrap);
		}
		init() {
			const el = $id('posttypeindicator');
			if(el) {
				el.previousSibling?.remove();
				el.nextSibling?.remove();
				el.remove();
			}
			return false;
		}
	}
	ibEngines.push(['script[src*="kusaba"]', Kusaba], ['form#delform[action$="/board.php"]', Kusaba]);

	class Tinyboard extends BaseBoard {
		constructor(...args) {
			super(...args);
			this.cReply = 'post reply';
			this.firstPage = 1;
			this.formParent = 'thread';
			this.hasCatalog = true;
			this.hasPostsBreak = true;
			this.hasRefererErr = true;
			this.jsonSubmit = true;
			this.qClosed = '.fa-lock';
			this.qDelForm = 'form[name*="postcontrols"]';
			this.qForm = 'form[name="post"]';
			this.qFormPassw = 'input[name="password"]:not([type="hidden"])';
			this.qFormRedir = null;
			this.qOmitted = '.omitted';
			this.qOPostEnd = '.post.reply';
			this.qPages = '.pages';
			this.qPostHeader = '.intro';
			this.qPostImgInfo = '.fileinfo';
			this.qPostMsg = '.body';
			this.qPostName = '.name';
			this.qPostRef = '.post_no + a';
			this.qPostSubj = '.subject';
			this.qPostTrip = '.trip';
			this.qTrunc = '.toolong';
			this.timePattern = 'nn+dd+yy++w++hh+ii+ss';
			this._origInputs = null;
		}
		get css() {
			return `.banner, .de-win-reply + br, .hide-thread-link, .mentioned,
					.post-hover { display: none !important; }
				#de-win-reply.de-win-inpost { display: block; width: fit-content !important; }
				${ Cfg.imgNames ? `.postfilename, .unimportant > a[download] { display: none }
					.fileinfo > .unimportant { white-space: nowrap; }` : '' }`;
		}
		get markupTags() {
			return ['\'\'\'', '\'\'', '__', '~~', '**', '[code'];
		}
		get qPostImgNameLink() {
			return 'p.fileinfo > a:first-of-type';
		}
		async changeReplyMode(form, tNum) {
			const query = 'div[style="display:none"], input[style="display:none"], ' +
				'span[style="display:none"], textarea[style="display:none"], ' +
				'input[type="hidden"]:not(.de-input-hidden)';
			if(!$q('input[name="thread"]', form)) {
				// Switching from the thread creation to post reply mode occurs. Saving the original fields.
				this._origInputs = [doc.createElement('div'), postform.subm.value];
				$Q(query, form).forEach(el => this._origInputs[0].append(el));
			} else if(!tNum) {
				// Switching from the post reply to thread creation occurs. Restoring the original fields.
				postform.subm.value = this._origInputs[1];
				$delAll(query, form);
				form.insertAdjacentHTML('beforeend', this._origInputs[0].innerHTML);
				this._origInputs = null;
				return;
			}
			// Post reply mode. Loading a thread with a form that contains the correct hidden fields.
			const errFn = () => {
				$popup('load-form', Lng.errFormLoad[lang]);
				postform.closeReply();
			};
			$popup('load-form', Lng.loading[lang], true);
			await ajaxLoad(this.getThrUrl(this.b, tNum), false).then(loadedDoc => {
				const loadedForm = $q(this.qForm, loadedDoc);
				if(!loadedForm) {
					errFn();
					return;
				}
				postform.subm.value = $q(this.qFormSubm, loadedDoc).value;
				$delAll(query, form);
				$Q(query, loadedForm).forEach(el => form.append(doc.adoptNode(el)));
				closePopup('load-form');
			}, errFn);
		}
		fixHTML(data, isForm) {
			const formEl = super.fixHTML(data, isForm);
			$Q('br.clear', formEl).forEach(brEl => {
				const hr = brEl.nextElementSibling;
				if(hr?.tagName.toLowerCase() === 'hr') {
					brEl.parentNode.after(hr);
				}
				brEl.remove();
			});
			return formEl;
		}
		fixVideo(isPost, data) {
			return Array.from($Q('.video-container, #ytplayer', isPost ? data.el : data), el => {
				const value = [isPost ? data : this.getPostOfEl(el), el.id === 'ytplayer' ?
					el.src.match(Videos.ytReg) : ['', el.getAttribute('data-video')], true];
				el.remove();
				return value;
			});
		}
		getImgRealName(wrap) {
			return $q('.postfilename', wrap)?.textContent ||
				$q('.unimportant > a[download]', wrap)?.download ||
				$q(this.qPostImgNameLink, wrap)?.textContent || '';
		}
		getPageUrl(board, page) {
			return page > 1 ? fixBoardName(board) + page + this.docExt : fixBoardName(board);
		}
		getSubmitData({ error, id }) {
			return { error, postNum: id && +id };
		}
		getTNum(thr) {
			return +$q('input[type="checkbox"]', thr).name.match(/\d+/);
		}
		init() {
			$script('window.FormData = void 0;');
			const formEl = $q(this.qForm);
			if(formEl) {
				formEl.insertAdjacentHTML('beforeend',
					'<input class="de-input-hidden" name="json_response" value="1" type="hidden">');
			}
			return false;
		}
		isAjaxStatusOK(status) {
			return status === 200 || status === 206 || status === 400;
		}
		updateSubmitBtn() {}
	}
	ibEngines.push(['form[name*="postcontrols"]', Tinyboard]);

	class Vichan extends Tinyboard {
		constructor(...args) {
			super(...args);
			this.multiFile = true;
			this.qDelPassw = '#password';
			this.qPostImg = '.post-image[alt]:not(.deleted)';
		}
		get css() {
			return `${ super.css }
				.add_image, .de-ref-op + small, #expand-all-images, .fileinfo small, .format-text, .post-btn,
					.watchThread, .fileinfo > span[style*="white-space:"]
					${ Cfg.fileInputs === 2 ? ', #upload' : '' } { display: none !important; }
				.boardlist { z-index: 1 !important; }
				.de-file-input { margin-left: 0; }
				.multifile { width: auto !important; }
				.multifile > .fileinfo { width: 275px; padding-right: 0 !important; }`;
		}
		get qPostImgNameLink() {
			return 'p.fileinfo a:first-of-type:not(.hide-image-link)';
		}
		fixFileInputs(el) {
			el.innerHTML = Array.from({ length: 5 }, (val, i) =>
				`<div class="de-file-wrap"${ i ? ' style="display: none;"' : '' }>
				<input type="file" name="file${ i ? i + 1 : '' }"></div>`
			).join('');
		}
		fixHTMLHelper(str) {
			return str.replace(/"(?:\/vichan)?\/player\.php\?v=([^&]+)&[^"]+"/g, '"$1"');
		}
		getImgWrap(img) {
			return img.closest('div.file');
		}
		init() {
			super.init();
			if(locStorage.file_dragdrop !== 'false') {
				locStorage.file_dragdrop = false;
				deWindow.location.reload();
				return true;
			}
			$script('highlightReply = Function.prototype;');
			setTimeout(() => $id('updater')?.remove(), 0);
			$id('body')?.removeAttribute('id');
			return false;
		}
	}
	ibEngines.push(['tr#upload', Vichan]);

	class TinyIB extends BaseBoard {
		constructor(...args) {
			super(...args);
			this.hasCatalog = true;
			this.qDelForm = $id('posts') ? '#posts' : '#delform';
			this.qError = 'body[align=center] div, div[style="margin-top: 50px;"]';
			this.qPostImg = 'img.thumb, video.thumb';
			this.qPostMsg = '.message';
		}
		get css() {
			return '.backlinks, .replymode { display: none; }';
		}
		fixHTMLHelper(str) {
			return str.replace(/="\.\.\//g, this.b ? `="/${ this.b }/` : '="/');
		}
		getCaptchaSrc(src) {
			return src.replace(/\?[^?]+$|$/, '?' + Math.random());
		}
		getImgRealName(wrap) {
			const el = $q('.filesize', wrap);
			if(el) {
				const info = el.textContent.split(',');
				if(info.length > 2) {
					return info.pop().replace(')', '');
				}
			}
			return super.getImgRealName(wrap);
		}
		getImgWrap(img) {
			return img.parentNode.parentNode.parentNode;
		}
		init() {
			$Q('.message > .omittedposts').forEach(el => {
				el.insertAdjacentHTML('afterend',
					'<span class="abbrev">Post too long. <a href="#">Click to view.</a>');
				el.remove();
			});
			return false;
		}
	}
	ibEngines.push(['form[action$="imgboard.php?delete"]', TinyIB]);

	class Lynxchan extends BaseBoard {
		constructor(...args) {
			super(...args);
			this.cReply = 'innerPost';
			this.firstPage = 1;
			this.formParent = 'threadId';
			this.hasCatalog = true;
			this.jsonSubmit = true;
			this.multiFile = true;
			this.qDelBtn = '#deleteFormButton';
			this.qDelForm = 'form[action$="contentActions.js"]';
			this.qError = '#errorLabel, #labelMessage';
			this.qForm = '.form-post, form[action$="newThread.js"], form[action$="replyThread.js"]';
			this.qFormPassw = 'input[name="password"]';
			this.qFormRules = '.form-post > .small';
			this.qFormSubm = '#formButton, #de-postform-submit';
			this.qOmitted = '.labelOmission';
			this.qOPost = '.innerOP';
			this.qOPostEnd = '.divPosts';
			this.qPages = '#divPages';
			this.qPost = '.innerPost, .markedPost';
			this.qPostHeader = '.postInfo, .de-post-btns';
			this.qPostImg = '.imgLink > img, img[src*="/.media/"]';
			this.qPostImgInfo = '.uploadDetails';
			this.qPostMsg = '.divMessage';
			this.qPostRef = '.linkQuote';
			this.qPostSubj = '.labelSubject';
			this.qPostsParent = '.divPosts';
			this.qTrunc = '.contentOmissionIndicator';
			this._hasNewAPI = false;
		}
		get css() {
			return `.de-video-link + div[style="display: inline;"] > .embedButton, .de-parea > hr,
					.divRefresh, #jsButton, .hideButton, .nameLink, #newPostFieldset, .panelBacklinks,
					.quoteTooltip, body > div[style^="display: inline;"] { display: none !important; }
				.divPosts { margin: 0 0; }
				#formButton { display: initial !important; }
				.form-post button, .form-post input, .form-post img { width: initial; }`;
		}
		get markupTags() {
			return ['\'\'\'', '\'\'', '__', '~~', '**', '[code'];
		}
		get qPostImgNameLink() {
			return '.originalNameLink';
		}
		get qThread() {
			return '.opCell';
		}
		captchaUpdate() {
			$script('reloadCaptcha();');
			return null;
		}
		changeReplyMode(form, tNum) {
			const action = form.getAttribute('action');
			form.setAttribute('action', tNum ? action.replace('newThread', 'replyThread') :
				action.replace('replyThread', 'newThread'));
		}
		fixFileInputs(el) {
			const str = ' class="de-file-wrap"><input name="files" type="file"></div>';
			el.innerHTML = '<div' + str +
				('<div style="display: none;"' + str).repeat((+$id('labelMaxFiles')?.textContent || 3) - 1);
		}
		getCaptchaParent() {
			return $id('captchaDiv');
		}
		getImgRealName(wrap) {
			return $q('.originalNameLink', wrap).textContent;
		}
		getImgSrcLink(img) {
			return $q('.originalNameLink', this.getImgWrap(img));
		}
		getImgWrap(img) {
			return img.closest('figure');
		}
		getPageUrl(board, page) {
			return fixBoardName(board) + (page > 1 ? page + this.docExt : 'index.html');
		}
		getPNum(post) {
			return +$q('.deletionCheckBox', post).name.split('-')[2];
		}
		getPostWrap(el, isOp) {
			return isOp ? el : el.parentNode;
		}
		getSubmitData({ status, data }) {
			return {
				error  : status === 'error' ? data : null,
				postNum: status === 'ok' ? +data : null
			};
		}
		getTNum(thr) {
			return +$q('.deletionCheckBox', thr).name.split('-')[1];
		}
		init() {
			$script(`if("autoRefresh" in window) {
					clearInterval(refreshTimer);
				}
				if("thread" in window) {
					if(thread.refreshTimer) {
						clearInterval(thread.refreshTimer);
						Object.defineProperty(thread, "startTimer",
							{ value: Function.prototype, writable: false, configurable: false });
					}
					Object.defineProperty(thread, "changeRefresh",
						{ value: Function.prototype, writable: false, configurable: false });
				}`);
			const submEl = $id('formButton');
			if(submEl) {
				this._hasNewAPI = true;
				submEl.insertAdjacentHTML('afterend', `<button id="de-postform-submit" type="submit">${
					submEl.innerHTML }</button>`);
				submEl.remove();
			}
			const formEl = $q(this.qForm);
			if(formEl && !$q('td', formEl)) {
				const table = $aBegin($q(this.qForm), '<table><tbody></tbody></table>').firstChild;
				const els = $Q('#captchaDiv, #divUpload, #fieldEmail, #fieldMessage, #fieldName,' +
					' #fieldPostingPassword, #fieldSubject');
				for(let i = 0, len = els.length; i < len; ++i) {
					$bEnd(table, '<tr><th></th><td></td></tr>').lastChild.append(els[i]);
				}
			}
			return false;
		}
		isAjaxStatusOK(status) {
			return status === 200 || status === 206 || status === 400 || status === 500;
		}
		isIgnoreError(txt) {
			try {
				const obj = JSON.parse(txt);
				if(obj.status === 'ok' && obj.data && (obj.data.removedThreads || obj.data.removedPosts)) {
					return true;
				}
			} catch(err) {}
			return false;
		}
		async sendHTML5Post(form, data, needProgress, hasFiles) {
			let ajaxParams;
			if(this._hasNewAPI) {
				ajaxParams = { data, method: 'POST' };
			} else {
				const getBase64 = async file => new Promise((resolve, reject) => {
					const reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = () => resolve(reader.result);
					reader.onerror = err => reject(err);
				});
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
							name   : file.name,
							spoiler: false
						});
					}
				}
				const cookieObj = getCookies();
				ajaxParams = {
					data: JSON.stringify({
						captchaId : cookieObj.captchaid,
						bypassId  : cookieObj.bypass,
						parameters: dataObj,
						auth      : { login: cookieObj.login, hash: cookieObj.hash }
					}),
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					method : 'POST'
				};
			}
			if(needProgress && hasFiles) {
				ajaxParams.onprogress = getUploadFunc();
			}
			const task = getFileName(form.attributes.action.value);
			const url = this._hasNewAPI ? `/${ task }?json=1` : '/.api/' + task.replace('.js', '');
			return $ajax(url, ajaxParams).then(xhr => xhr.responseText).catch(err => Promise.reject(err));
		}
		updateSubmitBtn(el) {
			el.textContent = Lng.reply[lang];
		}
	}
	ibEngines.push(['form[action$="contentActions.js"]', Lynxchan]);

	class FoolFuuka extends BaseBoard {
		constructor(...args) {
			super(...args);
			this.cReply = 'post_wrapper';
			this.docExt = '';
			this.firstPage = 1;
			this.qDelForm = '#main';
			this.qOmitted = '.omitted_text';
			this.qOPostEnd = '.posts';
			this.qPages = '.paginate > ul > li:nth-last-child(3)';
			this.qPost = '.post[id]';
			this.qPostHeader = 'header';
			this.qPostImg = '.post_image, .thread_image';
			this.qPostImgInfo = '.post_file_metadata, .thread_image_box > .post_file';
			this.qPostMsg = '.text';
			this.qPostRef = '.post_data > a[data-function="quote"]';
			this.qPostSubj = '.post_title';
			this.qPostsParent = '.posts';
			this.res = 'thread/';
		}
		get css() {
			return `.backlink_list { display: none !important; }
				.de-oppost > .thread_image_box { margin: 0 20px 10px 15px; float: left; text-align: center;
					color: #bfbfbf; font-size: .8em; line-height: 150%; }`;
		}
		get isArchived() {
			return true;
		}
		get qPostImgNameLink() {
			return '.post_file_filename';
		}
		get qThread() {
			return '.thread[id]';
		}
		fixHTMLHelper(str) {
			return str.replace(/\/#(\d+)"/g, '#$1"').replace(/\/post\/(\d+)\/"/g, '/#$1"');
		}
		getImgWrap(img) {
			return img.parentNode.parentNode.parentNode;
		}
		getPageUrl(board, page) {
			return fixBoardName(board) + (page > 1 ? `page/${ page }/` : '');
		}
		getTNum(thr) {
			return +thr.getAttribute('data-thread-num');
		}
		init() {
			defaultCfg.ajaxUpdThr = 0;
			const el = $q('.search_box');
			if(el) {
				doc.body.append(el);
			}
			return false;
		}
		parseURL() {
			super.parseURL();
			this.page = +(this.b.match(/\/page\/(\d+)/) || [1, 1])[1];
			this.b = this.b.replace(/\/page\/\d+/, '');
		}
	}
	ibEngines.push(['meta[name="generator"][content^="FoolFuuka"]', FoolFuuka]);

	// DOMAINS
	class /* _2ch */ Makaba extends BaseBoard {
		constructor(...args) {
			super(...args);
			this.cReply = 'de-reply-class';
			this.formParent = 'thread';
			this.hasArchive = true;
			this.hasCatalog = true;
			this.hasOPNum = true;
			this.JsonBuilder = MakabaPostsBuilder;
			this.jsonSubmit = true;
			this.multiFile = true;
			this.noCapUpdTime = true;
			this.noMarkupBtns = true;
			this.qBan = '.post__pomyanem';
			this.qClosed = 'use[*|href="#icon__closed"]';
			this.qDelForm = '#posts-form, #js-posts';
			this.qFormFile = '.postform__raw.filer input[type="file"]';
			this.qFormRedir = null;
			this.qFormRules = '.rules';
			this.qFormSpoiler = '.nsfw-input';
			this.qFormSubm = '#submit';
			this.qFormTd = '.postform__raw';
			this.qFormTr = '.postform__raw';
			this.qFormTxta = '#shampoo';
			this.qOmitted = '.thread__missed';
			this.qOPost = '.post_type_oppost';
			this.qPost = '.post_type_reply[data-num]';
			this.qPostHeader = '.post__details';
			this.qPostImg = '.post__file-preview';
			this.qPostImgInfo = '.post__file-attr';
			this.qPostMsg = '.post__message';
			this.qPostName = '.post__anon, .post__email';
			this.qPostRef = '.post__reflink:nth-child(2)';
			this.qPostSubj = '.post__title';
			this.qPostUid = 'span[id^="id_tag_"]';
			this.qReplyBtn = '.post__detailpart.desktop > a';
			this.qTrunc = null;
			this.timePattern = 'dd+nn+yy+w+hh+ii+ss';
		}
		get css() {
			return `._captcha-keyboard-selected-stub, .js-post-findimg, .js-post-saveimg,
					.media-expand-button, .media-thumbnail, .newpost, .post__btn:not(.icon_type_active),
					.post__number, .post__refmap { display: none !important; }
				._captcha-container { margin: 0 !important; }
				._captcha-keyboard-button { width: 35px !important; height: 35px !important;
					padding: 0 !important; }
				.de-pview > .post__details { margin-left: 4px; }
				.de-refmap { margin-top: 0; }
				.de-reply-class { background: var(--theme_default_postbg); border-radius: 3px; }
				#down-nav-arrow, #up-nav-arrow { z-index: 0; }
				.header__opts_sticky { z-index: 10; }
				.post__message { padding-left: 0px; margin-left: 16px; min-width: 15%; word-wrap: normal;
					word-break: normal; }
				.post_type_hidden { opacity: unset; cursor: default; }
				.post_type_hidden .post__message:not(.de-post-hiddencontent),
					.post_type_hidden .post__images:not(.de-post-hiddencontent) { display: block !important; }
				.postarea { display: initial !important; }
				.postform { width: auto; }
				${ Cfg.addSageBtn ? '.options__box:first-of-type { display: none !important; }' : '' }
				${ Cfg.expandTrunc ? `.expand-large-comment,
					div[id^="shrinked-post"] { display: none !important; }
					div[id^="original-post"] { display: block !important; }` : '' }
				${ Cfg.imgNames === 2 ? `.post__filezise { display: inline !important; }
					.post__file-attr { margin-bottom: 1px; }` : '' }
				${ Cfg.widePosts ? '.post__message { max-width: 98vw; }' : '' }`;
		}
		get isArchived() {
			return this.b.includes('/arch');
		}
		get lastPage() {
			const els = $Q('.pager > a:not([class])');
			const value = els ? els.length : 1;
			Object.defineProperty(this, 'lastPage', { value });
			return value;
		}
		get postersCount() {
			return $q('span[title="Постеры"]')?.innerHTML.match(/\d+$/)[0] || '';
		}
		get qFormMail() {
			return 'input[name="email"]';
		}
		get qFormName() {
			return 'input[name="name"]';
		}
		get qFormSubj() {
			return 'input[name="subject"]';
		}
		get qPostImgNameLink() {
			return '.post__file-attr > .desktop';
		}
		get reportForm() {
			const value = (pNum, tNum) => ($q('input[type="button"]', $popup(
				'edit-report',
				`<input name="comment" value="" placeholder="${
					pNum === tNum ? Lng.reportThr[lang] : Lng.reportPost[lang]
				}" type="text"> <input value="OK" type="button">`)
			).onclick = e => {
				const inpEl = e.target.previousElementSibling;
				if(!inpEl.value) {
					inpEl.classList.add('de-input-error');
					return;
				}
				const formData = new FormData();
				const data = { board: this.b, thread: tNum, post: pNum, comment: inpEl.value };
				for(const key in data) {
					if($hasProp(data, key)) {
						formData.append(key, data[key]);
					}
				}
				closePopup('edit-report');
				$popup('report', Lng.sending[lang], true);
				$ajax('/user/report', {
					method     : 'POST',
					data       : formData,
					success() {},
					contentType: false,
					processData: false
				}).then(xhr => {
					let obj;
					try {
						obj = JSON.parse(xhr.responseText);
					} catch(err) {}
					$popup('report', obj.result === 1 ? Lng.succReported[lang] :
						Lng.error[lang] + ': ' + obj.error.message);
				});
			});
			Object.defineProperty(this, 'reportForm', { value });
			return value;
		}
		get captchaInit() {
			$script(`const loadCapFn =
				() => new EmojiCaptcha({ createWarningFn: generateWarning }).requestController();`);
			Object.defineProperty(this, 'captchaInit', { value: null });
			return null;
		}
		captchaUpdate() {
			$script('loadCapFn();');
			return null;
		}
		clearFileInputs() {
			$q('.postform__sticker-img')?.remove();
			const el = $q('.sticker-input', postform.form);
			if(el) {
				el.value = '';
			}
		}
		deleteTruncMsg(post, el) {
			el.previousSibling.remove();
			$show(el.previousSibling);
			el.remove();
		}
		fixFileInputs(el) {
			el.innerHTML = Array.from({ length: 8 }, (val, i) =>
				`<div class="de-file-wrap"${ i ? ' style="display: none;"' : '' }>
					<input type="file" name="file[]">
					<input class="nsfw-input" name="file_${ i }_nsfw"` +
						' type="checkbox" value="1" style="display: none;"></div>'
			).join('');
		}
		getBanId(postEl) {
			const el = $q(this.qBan, postEl);
			return !el ? 0 : el.textContent.includes('предупрежден') ? 2 : 1;
		}
		getImgWrap(img) {
			return img.closest('figure');
		}
		getJsonApiUrl(board, tNum) {
			return `/${ board }/res/${ tNum }.json`;
		}
		getPNum(post) {
			return +post.getAttribute('data-num');
		}
		getPostWrap(el) {
			return el;
		}
		getSage(post) {
			this.getSage = $q('span[id^="id_tag_"]') ?
				post => !$q('span[id^="id_tag_"], .post__ophui', post) : super.getSage;
			return this.getSage(post);
		}
		getSubmitData(json) {
			let error = null;
			let postNum = null;
			if(json.result === 1) {
				postNum = +json.num;
				if(json.thread > 0) {
					postNum = +json.thread;
				}
			} else {
				error = Lng.error[lang] + ': ' + json.error.message;
			}
			return { error, postNum };
		}
		handlePostClick(post, el, e) {
			const { classList } = el;
			// Click on like/dislike elements
			let likeEl = el;
			if(classList.contains('post__rate') ||
				(likeEl = el.parentNode).classList.contains('post__rate')
			) {
				const task = likeEl.id.split('-')[0];
				const num = +likeEl.id.match(/\d+/);
				$ajax(`/api/${ task }?board=${ aib.b }&num=${ num }`).then(xhr => {
					const obj = JSON.parse(xhr.responseText);
					if(obj.result !== 1) {
						$popup('err-2chlike', Lng.error[lang] + ': ' + obj.error.message);
						return;
					}
					likeEl.classList.add(`post__rate_${ task }d`);
					const countEl = $q(`#${ task }-count${ num }`, likeEl);
					countEl.textContent = +countEl.textContent + 1;
				}, () => $popup('err-2chlike', Lng.noConnect[lang]));
			}
			// Click on "truncated message" link
			if(classList.contains('expand-large-comment')) {
				post._getFullMsg(el, false);
				e.preventDefault();
				e.stopPropagation();
			}
			// Click on spoiler image
			if(classList.contains('file__nsfw')) {
				$hide(el);
			}
			if(classList.contains('post__file-nsfw')) {
				$hide(el.firstElementChild);
			}
		}
		init() {
			let isOldMakaba = true;
			if($id('js-posts')) { // New Makaba engine
				isOldMakaba = false;
				$Q('.thread__missed').forEach(el =>
					el.innerHTML = el.innerHTML.replace(/ (\d+) постов/, (m, i) => ` ${ i - 1 } постов`));
			}
			$script(`(function() {
				function fixGlobalFunc(name) {
					Object.defineProperty(window, name,
						{ value: Function.prototype, writable: false, configurable: false });
				}
				${ isOldMakaba ? 'fixGlobalFunc("autorefresh_start");' : '' }
				fixGlobalFunc("linkremover");
				fixGlobalFunc("Media");
				window.FormData = void 0;
			})();`);
			$Q('.autorefresh').forEach(el => {
				const inpEl = $q('input', el);
				if(inpEl.checked) {
					inpEl.click();
				}
			});
			$Q('.js-update-thread, #postbtn-favorite-bottom').forEach(el => {
				let node;
				while((node = el.nextSibling) && node.title !== 'Всего постов в треде') {
					node.remove();
				}
				el.remove();
			});
			const el = $id('shampoo');
			if(el) {
				el.tabIndex = 1;
			}
			return false;
		}
		observeContent(checkDomains, dataPromise) {
			if($q('#posts-form > .thread, #js-posts > .thread, [de-form] > .thread')) {
				return true;
			}
			const initObserver = new MutationObserver(mutations => {
				if(mutations[0].addedNodes[0]?.className === 'thread') {
					initObserver.disconnect();
					runMain(checkDomains, dataPromise);
				}
			});
			const el = $q('#posts-form, #js-posts, [de-form]');
			if(el) {
				initObserver.observe(el, { childList: true });
			}
			return false;
		}
		updateCounters(postCount, filesCount, postersCount) {
			$Q('.tn__item > span[title="Всего постов в треде"]').forEach(
				el => el.innerHTML = el.innerHTML.replace(/\d+$/, postCount));
			$Q('.tn__item > span[title="Всего файлов в треде"]').forEach(
				el => el.innerHTML = el.innerHTML.replace(/\d+$/, filesCount));
			$Q('.tn__item > span[title="Постеры"]').forEach(
				el => el.innerHTML = el.innerHTML.replace(/\d+$/, postersCount));
		}
	}
	ibDomains['2ch.life'] = ibDomains['2ch.org'] = ibDomains['2ch.su'] = Makaba;

	class _2channel extends Makaba {
		constructor(...args) {
			super(...args);
			this.cReply = 'post reply';
			this.hasArchive = false;
			this.JsonBuilder = null;
			this.jsonSubmit = true;
			this.qBan = '.pomyanem';
			this.qClosed = '.icon-lock';
			this.qForm = '#de-postform';
			this.qFormFile = 'input[name="formimages[]"]';
			this.qFormTd = 'div[class^="freply__"]';
			this.qFormTr = 'div[class^="freply__"]';
			this.qFormRules = '.rules-area';
			this.qOmitted = '.mess-post';
			this.qOPost = '.oppost';
			this.qPost = '.post.reply[data-num]';
			this.qPostHeader = '.post-details';
			this.qPostImg = '.preview';
			this.qPostImgInfo = '.file-attr';
			this.qPostMsg = '.post-message';
			this.qPostName = '.ananimas, .post-email';
			this.qPostRef = '.reflink';
			this.qPostSubj = '.post-title';
			this.qReplyBtn = '.post-details > .desktop > a';
		}
		get css() {
			return `.newpost, .newpost + hr, .postpanel > :not(img), .refmap, #youtube-thumb-float
					{ display: none !important; }
				.de-win-opened:not(#de-win-cfg) > .de-win-body { background-color: #eee !important; }
				.postform { width: initial; }
				.preview.lazy { opacity: 1; }`;
		}
		get qPostImgNameLink() {
			return '.file-attr > .desktop';
		}
		get reportForm() {
			return null;
		}
		captchaInit(captcha) {
			return this.captchaUpdate(captcha);
		}
		captchaUpdate(captcha) {
			$script(`grecaptcha.execute(window.recaptcha_site_key, { action: "submit" })
				.then(function(t) { document.getElementById("g-key").value = t; });`);
			const url = `/api/captcha/service_id?board=${ this.b }&thread=` + (postform.tNum || 0);
			return captcha.updateHelper(url, xhr => {
				const box = $q('.captcha');
				let data = xhr.responseText;
				try {
					data = JSON.parse(data);
				} catch(err) {}
				switch(data.mode) {
				case 1: { // Captcha is enabled
					const el = $q('.captcha__image');
					const img = $q('img', el) || $aBegin(el, '<img>');
					img.src = '';
					img.src = 'data:image/png;base64,' + data.image;
					$id('captcha-key').value = data.token;
					break;
				}
				case 2: return CancelablePromise.reject(new CancelError()); // Captcha is disabled
				case 3: box.innerHTML = 'Вам больше не нужно вводить капчу.'; break; // Trusted
				default: box.innerHTML = Lng.error[lang];
				}
				$show(box);
				box.removeAttribute('hidden');
				captcha.textEl.tabIndex = 999;
			});
		}
		fixFileInputs(el) {
			el.innerHTML = Array.from({ length: 4 }, (val, i) =>
				`<div class="de-file-wrap"${ i ? ' style="display: none;"' : '' }>
				<input type="file" name="formimages[]"></div>`
			).join('');
		}
		fixHTMLHelper(str) {
			return str.replace(/src="[^>]+" data-src="/g, 'src="');
		}
		getCaptchaParent() {
			return $q('.captcha');
		}
		getPostWrap(el) {
			return el.parentNode;
		}
		getSubmitData(json) {
			let error = json.Reason || json.Error || null;
			let postNum = null;
			if(error) {
				error = Lng.error[lang] + ': ' + error;
			} else if(json.Status) {
				if(json.Status === 'Redirect') {
					postNum = +json.Target;
				} else if(json.Status === 'OK') {
					postNum = +json.Num;
				}
			}
			return { error, postNum };
		}
		init() {
			super.init();
			let el = $id('postform');
			if(el) {
				el.id = 'de-postform';
				el.setAttribute('action', '/api' + el.getAttribute('action'));
			}
			el = $q('.freply__sendarea');
			if(el) {
				el.innerHTML = '<input id="submit" type="submit" tabindex="5" title="Или Ctrl+Enter"' +
					' class="freply__sendbutton" value="Ответ">';
			}
			el = $q('.captcha');
			if(el) {
				$q('.freply__files-and-captcha').before(el);
			}
			return false;
		}
	}
	ibDomains['2channel.moe'] =
		ibDomains['2channel5s3pvmo2364gs25e5xrx7nz6kivqhpj6ihh3df4hykvxysqd.onion'] = _2channel;

	class _2chRip extends BaseBoard {
		constructor(...args) {
			super(...args);
			this.jsonSubmit = true;
			this.qReplyBtn = '.replytothread > a';
		}
		get css() {
			return `small[id^="rfmap_"], #submit_button, .qreply_btn { display: none; }
				#subject + div { display: inline !important; }
				.replypage .reply .reflink::before { content: "" }`;
		}
		captchaUpdate(captcha) {
			return captcha.updateHelper('/cgi/captcha?task=get_id', ({ responseText: id }) => {
				$id('imgcaptcha').src = '/cgi/captcha?task=get_image&id=' + id;
				$id('captchaid').value = id;
			});
		}
		getSubmitData(json) {
			return {
				error  : json.message ? json.message_title + ': ' + json.message : null,
				postNum: json.num ? +json.num : null
			};
		}
		init() {
			defaultCfg.captchaLang = 2;
			$script('postFormSubmit = Function.prototype;');
			$id('postform').insertAdjacentHTML('beforeend', '<input type="hidden" name="json" value="1">');
			return false;
		}
	}
	ibDomains['2ch.rip'] = ibDomains['dva-ch.net'] = _2chRip;

	class _410chan extends Kusaba {
		constructor(...args) {
			super(...args);
			this.hasCatalog = true;
			this.markupBB = false;
			this.qClosed = '.post-badge-locked';
			this.qFormRedir = 'input#noko';
			this.qPages = '.pgstbl > table > tbody > tr > td:nth-child(2)';
			this.timePattern = 'dd+nn+yyyy++w++hh+ii+ss';
		}
		get css() {
			return `${ super.css }
				#posttypeindicator, #resizer, .threadlinksbottom { display: none; }
				.reflink::after { content: none !important; }
				.toppanel { z-index: 1; }`;
		}
		get markupTags() {
			return ['**', '*', '__', '^^', '%%', '`'];
		}
		captchaUpdate(captcha) {
			return captcha.updateHelper(`/api_adaptive.php?board=${ this.b }`, xhr => {
				if(xhr.responseText === '1') {
					captcha.textEl.disabled = true;
					setTimeout(() => (captcha.textEl.value = 'проезд оплачен'), 0);
					return;
				}
				captcha.textEl.disabled = false;
				captcha.textEl.value = '';
				const img = $q('img', captcha.parentEl);
				const src = img.getAttribute('src');
				img.src = '';
				img.src = this.getCaptchaSrc(src);
			});
		}
		getCaptchaSrc(src) {
			return src.replace(/\?[^?]+$|$/, `?board=${ this.b }&${ Math.random() }`);
		}
		getSage(post) {
			return !!$q('.filetitle', post)?.textContent.includes('\u21E9');
		}
		init() {
			defaultCfg.captchaLang = 0;
			return false;
		}
	}
	ibDomains['410chan.org'] = ibDomains['410chan.ru'] = _410chan;

	class _4chan extends BaseBoard {
		constructor(...args) {
			super(...args);
			this._4chan = true;

			this.anchor = '#p';
			this.cReply = 'post reply';
			this.docExt = '';
			this.firstPage = 1;
			this.formParent = 'resto';
			this.hasCatalog = true;
			this.hasTextLinks = true;
			this.JsonBuilder = _4chanPostsBuilder;
			this.qBan = 'strong[style="color: red;"]';
			this.qClosed = '.archivedIcon, .closedIcon';
			this.qDelBtn = '.deleteform > input[type="submit"]';
			this.qError = '#errmsg';
			this.qForm = 'form[name="post"]';
			this.qFormRedir = null;
			this.qOmitted = '.summary.desktop';
			this.qOPost = '.op';
			this.qOPostEnd = '.replyContainer';
			this.qPages = '.pagelist > .pages:not(.cataloglink) > a:last-of-type';
			this.qPostHeader = '.postInfo';
			this.qPostImg = '.fileThumb > img:not(.fileDeletedRes)';
			this.qPostImgInfo = '.fileText';
			this.qPostName = '.name';
			this.qPostRef = '.postInfo > .postNum';
			this.qPostSubj = '.subject';
			this.qPostUid = '.hand';
			this.qReplyBtn = '.replylink';
			this.res = 'thread/';
			this.timePattern = 'nn+dd+yy+w+hh+ii-?s?s?';
		}
		get captchaUpdate() {
			const value = !$id('captchaFormPart') ? null : captcha => {
				const containerEl = $id('t-root');
				if(!containerEl) {
					captcha.hasCaptcha = false;
					return;
				}
				containerEl.insertAdjacentHTML('afterend', '<div id="t-root"></div>');
				containerEl.remove();
				$script('initTCaptcha();');
				setTimeout(() => {
					captcha.textEl = $id('t-resp');
					captcha.textEl.tabIndex = 999;
					captcha.initTextEl();
				}, 1e3);
				return null;
			};
			Object.defineProperty(this, 'captchaUpdate', { value });
			return value;
		}
		get css() {
			return `.backlink, #blotter, .de-file-utils + .desktop, .extButton, hr.desktop, .navLinks,
					.postMenuBtn, #togglePostFormLink { display: none !important; }
				#bottomReportBtn { display: initial !important; }
				#g-recaptcha { height: initial; }
				.post-hidden:not(#quote-preview) input, .post-hidden:not(#quote-preview) .replyContainer,
					.post-hidden:not(#quote-preview) .summary, .post-hidden:not(#quote-preview) .op .file,
					.post-hidden:not(#quote-preview) .file, .post-hidden .wbtn, .post-hidden .postNum span,
					.post-hidden:not(#quote-preview) .backlink, div.post-hidden:not(#quote-preview) div.file,
					div.post-hidden:not(#quote-preview) blockquote.postMessage { display: unset; }
				.post-hidden .extButton, .post-hidden:not(#quote-preview) .postInfo { opacity: unset; }
				.postForm { display: table !important; width: auto !important; }
				textarea { margin-right: 0 !important; }
				${ Cfg.widePosts ? '.sideArrows { display: none; }' : '' }`;
		}
		get markupTags() {
			return ['', '', '', '', $q('input[type="checkbox"][name="spoiler"]') ? '[spoiler' : '',
				this.b === 'g' ? '[code' : ''];
		}
		get postersCount() {
			const value = $q('span[class="ts-ips"]')?.innerHTML || '';
			if(!value) {
				$script(`setTimeout(function() {
					document.getElementById("de-panel-info-posters").textContent = window.unique_ips || "";
				}, 0)`);
			}
			return value;
		}
		get qFormSubj() {
			return 'input[name="sub"]';
		}
		get qPostImgNameLink() {
			return '.fileText > a';
		}
		fixDeadLinks(str) {
			return str.replace(/<span class="deadlink">&gt;&gt;(\d+)<\/span>/g,
				'<a class="de-ref-del deadlink" href="#p$1">&gt;&gt;$1</a>');
		}
		fixHTMLHelper(str) {
			return str.replace(/<span>([^<]+)(?:<\/?wbr>)?([^<]+)<\/span> \[<a [^>]+>Embed<\/a>\]/g, '$1$2')
				.replace(/<\/?wbr>/g, '')
				.replace(/( \(OP\)| →)<\/a/g, '</a')
				.replace(/is2\.4chan/g, 'i.4cdn');
		}
		fixVideo() {
			return [];
		}
		getImgInfo(wrap) {
			return $q(this.qPostImgInfo, wrap)?.lastChild.textContent || '';
		}
		getImgRealName(wrap) {
			const el = $q(this.qPostImgNameLink, wrap);
			return el ? el.title || el.parentNode.title || el.textContent : '';
		}
		getImgWrap(img) {
			return img.parentNode.parentNode;
		}
		getJsonApiUrl(board, tNum) {
			return `//a.4cdn.org/${ board }/thread/${ tNum }.json`;
		}
		getPageUrl(board, page) {
			return fixBoardName(board) + (page > 1 ? page : '');
		}
		getPostWrap(el) {
			return el.parentNode;
		}
		getSage(post) {
			return !!$q('.id_Heaven, .useremail[href^="mailto:sage"]', post);
		}
		getSubmitData(dc) {
			let error = null;
			let postNum = null;
			const errEl = $q('#errmsg', dc);
			if(errEl) {
				error = errEl.innerHTML;
			} else {
				try {
					postNum = +$q('h1', dc).nextSibling.textContent.match(/no:(\d+)/)[1];
				} catch(err) {}
			}
			return { error, postNum };
		}
		getTNum(thr) {
			return +$q('input[type="checkbox"]', thr).name.match(/\d+/);
		}
		handlePostClick(post, el, e) {
			if(el.classList.contains('de-img-name')) {
				post.downloadImageByLink(el, e);
			}
		}
		init() {
			Cfg.findImgFile = 0;
			Cfg.txtBtnsLoc = 0;
			$id('styleSelector')?.setAttribute('onchange', 'setActiveStyleSheet(this.value);');
			return false;
		}
		reportForm(pNum) {
			$script(`Report.open('${ pNum }', '${ this.b }');`);
			return true;
		}
	}
	ibDomains['4chan.org'] = _4chan;

	class _7chan extends Kusaba {
		init() {
			return true;
		}
	}
	ibDomains['7chan.org'] = _7chan;

	class _8kun extends Vichan {
		getEmptyFile(field, name) {
			return { el: field, name, value: undefined };
		}
	}
	ibDomains['8kun.top'] = _8kun;

	class Aoba extends Kusaba {
		constructor(...args) {
			super(...args);
			this.hasCatalog = true;
		}
		get css() {
			return '.extrabtns, input[name="board"] + hr, .replymode, #rswapper + hr { display: none; }';
		}
		init() {
			defaultCfg.captchaLang = 2;
			return false;
		}
	}
	ibDomains['aoba.me'] = Aoba;

	class Archived extends FoolFuuka {
		getImgRedirectSrc(url) {
			return $ajax(url).then(xhr => xhr.responseText.match(/<meta[^>]+url=([^"]+)">/)[1]);
		}
	}
	ibDomains['archived.moe'] = Archived;

	class Arhivach extends BaseBoard {
		constructor(...args) {
			super(...args);
			this.cReply = 'post';
			this.docExt = '';
			this.hasOPNum = true;
			this.qDelBtn = null;
			this.qDelForm = 'body > .container-fluid';
			this.qDelPassw = null;
			this.qPost = '.post[postid]:not(:first-child)';
			this.qPostHeader = '.post_head';
			this.qPostImg = '.post_image > img';
			this.qPostMsg = '.post_comment_body';
			this.qPostRef = '.post_id, .post_head > b';
			this.qPostSubj = '.post_subject';
			this.res = 'thread/';
		}
		get css() {
			return `.media-expand-button, .post_replies, .post_num, .poster_sage { display: none !important; }
				.navbar-fixed-top, .thread_header_fixed { z-index: 5 !important; }
				.post { overflow-x: auto !important; }
				.thread_inner img.de-fullimg { max-width: 100% !important; max-height: 100% !important; }`;
		}
		get isArchived() {
			return true;
		}
		get qPostImgNameLink() {
			return '.img_filename';
		}
		get qThread() {
			return '.thread_inner';
		}
		fixHTML(data, isForm) {
			const formEl = super.fixHTML(data, isForm);
			const links = $Q('.expand_image', formEl);
			for(let i = 0, len = links.length; i < len; ++i) {
				const link = links[i];
				const href = link.getAttribute('onclick')?.match(/(?:https?:\/|\/storage)[^']+/);
				if(href) {
					link.href = href[0];
					link.removeAttribute('onclick');
				}
			}
			return formEl;
		}
		getImgInfo(wrap) {
			return wrap.title;
		}
		getImgWrap(img) {
			return img.closest('a').parentNode;
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
		getTNum(thr) {
			return this.getPNum(this.getOp(thr));
		}
		init() {
			defaultCfg.ajaxUpdThr = 0;
			setTimeout(() => {
				const delPosts = $Q('.post_deleted');
				for(let i = 0, len = delPosts.length; i < len; ++i) {
					const post = pByNum.get(this.getPNum(delPosts[i]));
					if(post) {
						post.thr.deletePosts(post, false, false);
					}
				}
				$css(`.post { background-color: ${
					getComputedStyle($q('.post')).getPropertyValue('background-color') } !important; }`);
			}, 500);
			return false;
		}
	}
	ibDomains['arhivach.vc'] =
		ibDomains['arhivachqqqvwqcotafhk4ks2he56seuwcshpayrm5myeq45vlff44yd.onion'] = Arhivach;

	class Bulochka extends _410chan {
		constructor(...args) {
			super(...args);
			this.markupBB = true;
		}
		get captchaUpdate() {
			return null;
		}
		get markupTags() {
			return ['b', 'i', 'u', 's', 'spoiler', 'code'];
		}
		getCaptchaSrc(src) {
			return super.getCaptchaSrc(src);
		}
		init() {
			super.init();
			const capInp = $q('input[name="captcha"]');
			const fapInp = $q('input[name="faptcha"]');
			if(capInp && fapInp) {
				capInp.disabled = false;
				fapInp.disabled = true;
				$hide($q('tr[name=faptcha_tr]'));
				while(capInp.nextSibling) {
					capInp.nextSibling.remove();
				}
			}
			$script('try { $(\'input.preview-btn\').on(\'click\', preview_clicked); } catch(err) {}');
			return false;
		}
	}
	ibDomains['014chan.org'] = ibDomains['bulochka.org'] = Bulochka;

	class Deadach extends Vichan {
		constructor(...args) {
			super(...args);
			this.qPostImg = '.post-img';
		}
		get css() {
			return `${ super.css }
				.format-text > button:not([class]), .image_id, .open-form { display: none !important; }
				.file { margin-right: 20px; }
				.format-text { display: block !important; }
				.postarea { display: initial !important; }
				.postform__limits { position: initial; }`;
		}
		get markupTags() {
			return ['[b', '[i', '__', '~~', '**', '```'];
		}
		fixHTMLHelper(str) {
			return super.fixHTMLHelper(str).replace(/<img class="post-image/g, '<img class="post-img');
		}
	}
	ibDomains['deada.ch'] = Deadach;

	class Dobrochan extends Vichan {
		get css() {
			return `${ super.css }
				.de-parea > hr { margin-top: 0.7em; }
				#de-pform input[type="text"] { float: none !important; }`;
		}
		get markupTags() {
			return ['**', '*', '', '~~', '%%', ''];
		}
		captchaUpdate() {
			$script('load_captcha("/vichan/inc/captcha/entrypoint.php", "abcdefghijklmnopqrstuvwxyz");');
			return null;
		}
	}
	ibDomains['dobrochan.net'] = Dobrochan;

	class Dollchan extends BaseBoard {
		constructor(...args) {
			super(...args);
			this.hasCatalog = true;
			this.markupBB = true;
			this.multiFile = true;
			this.qDelForm = $id('posts') ? '#posts' : '#delform';
			this.qError = 'body[align=center] div, div[style="margin-top: 50px;"]';
			this.qPages = '.pagelist';
			this.qPostImg = 'img.thumb, video.thumb';
			this.qPostMsg = '.message';
			this.qPostRef = '.post-reflink';
			this.qPostUid = '.posteruid';
			this.timePattern = 'yy+nn+dd+w+hh+ii+ss';
		}
		get captchaInit() {
			const value = () => this._getPasscodeStatus().then(status => {
				const hasPasscode = status === 'valid';
				$toggle($id('captchablock').lastElementChild, !hasPasscode);
				$toggle($id('validcaptchablock'), hasPasscode);
				$toggle($id('invalidcaptchablock'), status === 'invalid');
				if(!hasPasscode) {
					const inpEl = $id('captcha');
					if(inpEl) {
						inpEl.value = '';
					}
				}
			});
			Object.defineProperty(this, 'captchaInit', { value });
			return value;
		}
		get reportForm() {
			const value = async (pNum, tNum) => {
				const passcodeStatus = await this._getPasscodeStatus();
				const isValidPasscode = passcodeStatus === 'valid';
				const recapEl = $id('g-recaptcha');
				const hasCaptcha = !!$id('captchablock');
				let captchaHTML = '';
				if(recapEl || hasCaptcha) {
					if(isValidPasscode) {
						captchaHTML = `<div>No captcha: you are a passcode user. <a href="/${
							aib.b }/imgboard.php?passcode&logout">Log Out.</a></div>`;
					} else {
						if(recapEl) {
							captchaHTML = '<div style="min-height: 80px;"><div id="g-recaptcha2" class="' +
								`g-recaptcha" data-sitekey="${ recapEl.dataset.sitekey }"></div></div>`;
						} else {
							captchaHTML = `<div><img src="/${ aib.b }/inc/captcha.php?${ Math.random() }"` +
								' width="175" height="55" alt="CAPTCHA" style="cursor: pointer;" onclick="' +
								`this.src = '/${ aib.b }/inc/captcha.php?' + Math.random();"></div>` +
								`<input type="text" name="captcha" style="width: 300px;" placeholder="${
									Lng.captcha[lang] }" accesskey="c" autocomplete="off">`;
						}
						if(passcodeStatus === 'invalid') {
							captchaHTML += `<div>Your pass code seems to be not valid. <a href="/${
								aib.b }/imgboard.php?passcode" target="_blank">Log In Again?</a></div>`;
						}
					}
				}
				const formEl = $q('.report-form', $popup('edit-report',
					(pNum === tNum ? Lng.reportThr[lang] : Lng.reportPost[lang]) +
					`<div class="report-form"><input type="text" name="reason" value="" placeholder="${
						Lng.reportReason[lang] }" style=" width: 300px;">` + captchaHTML + '</div>'));
				if(recapEl && !isValidPasscode) {
					const script = doc.createElement('script');
					script.type = 'text/javascript';
					script.textContent = `grecaptcha.render('g-recaptcha2', {'sitekey': '${
						recapEl.dataset.sitekey }'});`;
					doc.head.append(script);
				}
				$bEnd(formEl, '<input type="button" value="OK">').onclick = () => {
					const inpEl = $q('input', formEl);
					if(!inpEl.value) {
						inpEl.classList.add('de-input-error');
						return;
					}
					const formData = new FormData();
					const data = { id: pNum, reason: inpEl.value, json: 1 };
					if(!isValidPasscode) {
						if(recapEl) {
							data['g-recaptcha-response'] = $q('.g-recaptcha-response', formEl).value;
						} else if(hasCaptcha) {
							data.captcha = $q('input[name="captcha"]', formEl).value;
						}
					}
					for(const key in data) {
						if($hasProp(data, key)) {
							formData.append(key, data[key]);
						}
					}
					closePopup('edit-report');
					$popup('report', Lng.sending[lang], true);
					const url = this.protocol + '//' + this.host + '/' + this.b +
						'/imgboard.php?report&addreport&json=1';
					$ajax(url, {
						method     : 'POST',
						data       : formData,
						success() {},
						contentType: false,
						processData: false
					}).then(xhr => {
						let obj;
						try {
							obj = JSON.parse(xhr.responseText);
						} catch(err) {
							$popup('report', Lng.reportError[lang] + ':<br>' + xhr.responseText);
							return;
						}
						$popup('report', obj.result === 'ok' ? Lng.succReported[lang] :
							obj.result === 'alreadysent' ? Lng.alreadyReported[lang] :
							Lng.reportError[lang] +
								(obj.result === 'error' && obj.message ? ':<br>' + obj.message : ''));
					});
				};
			};
			Object.defineProperty(this, 'reportForm', { value });
			return value;
		}
		fixFileInputs(el) {
			const str = ' class="de-file-wrap"><input type="file" name="file[]"></div>';
			el.innerHTML = '<div' + str + ('<div style="display: none;"' + str).repeat(3);
		}
		getCaptchaSrc(src) {
			return src.replace(/\?[^?]+$|$/, '?' + Math.random());
		}
		getImgRealName(wrap) {
			return $q('.filesize > a', wrap).textContent;
		}
		getImgWrap(img) {
			return img.closest('.image-container');
		}
		async _getPasscodeStatus() {
			let status = 'showcaptcha';
			if(getCookies().passcode === '1') {
				try {
					const xhr = await $ajax(this.protocol + '//' + this.host + '/' + this.b +
						'/imgboard.php?passcode&check');
					status = xhr.responseText === 'OK' ? 'valid' : 'invalid';
				} catch(err) {
					status = 'invalid';
				}
			}
			return status;
		}
	}
	ibDomains['dollchan.net'] = Dollchan;

	class Ejchan extends Vichan {
		constructor(...args) {
			super(...args);
			this.qDelForm = '.thread-outer';
			this.qPostRef = '.post-left';
		}
		get css() {
			return `${ super.css }
				.intro { justify-content: normal; }`;
		}
		getTNum(thr) {
			return thr.id.match(/\d+/);
		}
	}
	ibDomains['ejchan.site'] = Ejchan;

	class Endchan extends Lynxchan {
		constructor(...args) {
			super(...args);
			this.jsonSubmit = false;
			this.qTrunc = '.contentOmissionIndicator > p';
		}
		get css() {
			return `${ super.css }
				.bottomNav, .delLink, #expandAll, .hidePost, .hideThread, .linkLast50,
					.linkPreview, #modeBanner, .watchButton { display: none !important; }
				#de-main-container, .de-pview { font-size: 75%; }`;
		}
		getSubmitData(jsonString) {
			const { status, data } = JSON.parse(jsonString);
			return {
				error  : status === 'error' ? data : null,
				postNum: status === 'ok' ? +data : null
			};
		}
		init() {
			super.init();
			$Q('.imgLink > img[src^="/.youtube/"]').forEach(el => el.closest('figure').remove());
			$Q('.youtube_wrapper').forEach(el => {
				const src = $q('a', el).href;
				$bBegin(el, `<a href="${ src }">${ src }</a>`).nextSibling.remove();
			});
			this._hasNewAPI = false;
			return false;
		}
	}
	ibDomains['endchan.net'] = ibDomains['endchan.org'] =
		ibDomains['endchancxfbnrfgauuxlztwlckytq7rgeo5v6pc2zd4nyqo3khfam4ad.onion'] =
		ibDomains['enxx3byspwsdo446jujc52ucy2pf5urdbhqw3kbsfhlfjwmbpj5smdad.onion'] = Endchan;

	class Escapechain extends Makaba {
		get clearFileInputs() {
			return null;
		}
		getCaptchaEl() {
			return null;
		}
	}
	ibDomains['escapechain.ru'] =
		ibDomains['mk2dodftctwgnux6z7iafm5tcyj7xrv7aytlh25zka45m7svvb6olfyd.onion'] = Escapechain;

	class Gensokyo extends Kusaba {
		constructor(...args) {
			super(...args);
			this.hasRefererErr = true;
		}
	}
	ibDomains['gensokyo.4otaku.org'] = Gensokyo;

	class Iichan extends BaseBoard {
		constructor(...args) {
			super(...args);
			this.hasArchive = true;
			this.hasCatalog = true;
		}
		get catalogUrl() {
			return `${ this.protocol }//${ this.host }/${ this.b }/catalogue.html`;
		}
		get css() {
			return `.iichan-hide-thread-btn, .iichan-quick-reply-btn, .postnum { display: none !important; }
			.replypage div[id^="thread"] span.reflink::after { content: none; }`;
		}
		get isArchived() {
			return this.b.includes('/arch');
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
		getImgRealName(wrap) {
			return $q('.filesize > em', wrap).textContent.split(',')[2] || super.getImgRealName(wrap);
		}
		init() {
			defaultCfg.addSageBtn = 0;
			$script('highlight = Function.prototype;');
			let el = $q(this.qFormSpoiler);
			if(el) {
				$hide(el = el.parentNode);
				el.previousSibling.remove();
			}
			return false;
		}
	}
	ibDomains['iichan.hk'] = ibDomains['iichan.lol'] = ibDomains['ii.yakuji.moe'] = Iichan;

	class Ivchan extends BaseBoard {
		constructor(...args) {
			super(...args);
			this.anchor = '#i';
			this.formParent = 'thread_id';
			this.multiFile = true;
			this.qClosed = 'img[src="/images/locked.png"]';
			this.qDelForm = 'form[action*="delete"]';
			this.qError = '.post-error, h2';
			this.qFormRedir = 'select[name="goto"]';
			this.qOmitted = '.abbrev > span:last-of-type';
			this.qPages = '.pages > tbody > tr > td';
			this.qPostImgInfo = '.fileinfo';
			this.qPostMsg = '.postbody';
			this.qPostSubj = '.replytitle';
			this.qTrunc = '.abbrev > span:first-of-type';
			this.timePattern = 'dd+m+?+?+?+?+?+yyyy++w++hh+ii-?s?s?';
		}
		get css() {
			return `.de-video-obj-inline { margin-left: 5px; }
				.delete > img, .popup, .reply_, .search_google, .search_iqdb { display: none; }
				.delete { background: none; }
				.delete_checkbox { position: static !important; }`;
		}
		deleteTruncMsg(post, el, isInit) {
			el.previousSibling?.remove();
			el.nextSibling?.remove();
			el.remove();
			if(isInit) {
				post.msg.replaceWith($q('.alternate', post.el));
			} else {
				const sRunner = new SpellsRunner();
				post.updateMsg($q('.alternate', post.el), sRunner);
				sRunner.endSpells();
			}
			post.msg.classList.remove('alternate');
		}
		getImgSrcLink(img) {
			// There can be a censored <img> without <a> parent
			const el = img.parentNode;
			return el.tagName.toLowerCase() === 'a' ? el :
				$q('.fileinfo > a', img.previousElementSibling ? el : el.parentNode);
		}
		getImgWrap(img) {
			const el = img.parentNode;
			return el.tagName.toLowerCase() === 'a' ?
				(el.previousElementSibling ? el : el.parentNode).parentNode :
				img.previousElementSibling ? el : el.parentNode;
		}
		getPageUrl(board, page) {
			return fixBoardName(board) + (page > 0 ? page + this.docExt : 'index.xhtml');
		}
		getTNum(thr) {
			return +$q('a[name]', thr).name.match(/\d+/);
		}
	}
	ibDomains['ivchan.net'] = Ivchan;

	class Kohlchan extends Lynxchan {
		constructor(...args) {
			super(...args);
			this.kohlchan = true;

			this.hasTextLinks = true;
			this.markupBB = true;
			this.qFormRules = '#rules_row';
			this.qPostImg = '.uploadCell > a > img';
			this.qReplyBtn = '.linkReply';
			this.timePattern = 'yyyy+nn+dd+hh+ii+ss';
		}
		get css() {
			return `${ super.css }
				.extraMenuButton, #postingForm, .sage { display: none; }
				::placeholder { color: gray !important; }`;
		}
		get fixKCUnixFilenames() {
			let value = null;
			if(locStorage.unixFilenames === 'true') {
				value = post => {
					const containerEl = $q('div.panelUploads', post.el);
					const imgLinks = $Q('.de-img-link:not(.unixLink)', containerEl);
					let timetext = new Date(containerEl.parentElement.parentElement
						.querySelectorAll('span.labelCreated')[0].textContent.replaceAll('-', '/')).getTime();
					timetext += timetext % 999;
					for(let j = 0; j < imgLinks.length; ++j) {
						const imgLink = imgLinks[j];
						const parentEl = imgLink.parentElement;
						imgLink.href += '/' + timetext +
							(j === 0 && imgLinks.length === 1 ? '.' : `-${ j }.`) +
							$q('a.originalNameLink', parentEl.nodeName === 'SPAN' ?
								parentEl.parentElement : parentEl).title.split('.').pop();
						imgLink.classList.add('unixLink');
					}
				};
			}
			Object.defineProperty(this, 'fixKCUnixFilenames', { value });
			return value;
		}
		get markupTags() {
			return ['b', 'i', 'u', 's', 'spoiler', 'code'];
		}
		captchaAfterSubmit(data) {
			if(data !== '{"status":"bypassable"}') {
				return false;
			}
			$popup('upload', `<div>Tor / VPN / Proxy detected</div><!--
				--><div>You need a block bypass to post</div><!--
				--><div><img src="/captcha.js?d=${ new Date().toString() }" class="captchaImage"` +
					` title="Click to reload" onclick="captchaUtils.reloadCaptcha();"><!--
				--></div><div><!--
					--><input type="button" class="modalOkButton" value="Send"><!--
					--><input type="text" class="modalAnswer"><!--
				--></div>`).style.cssText = 'text-align: center;';
			const submitEl = $q('.modalOkButton');
			const inputEl = $q('.modalAnswer');
			submitEl.onclick = () => {
				$popup('captcha', Lng.sending[lang], true);
				const formData = new FormData();
				formData.append('captcha', inputEl.value.trim());
				$ajax('/renewBypass.js?json=1', { data: formData, method: 'POST' }).then(xhr => {
					const obj = JSON.parse(xhr.responseText);
					switch(obj.status) {
					case 'ok':
					case 'finish':
						closePopup('captcha');
						$popup('upload', 'OK! You may now post.');
						return;
					case 'hashcash':
						closePopup('captcha');
						$popup('upload', '<a target="_blank" href=' +
							'"/addon.js/hashcash/?action=get">Click here to activate your bypass.</a>');
						return;
					default: $popup('captcha', obj.data || xhr.responseText);
					}
				}, () => $popup('captcha', Lng.noConnect[lang]));
			};
			inputEl.onkeydown = e => {
				if(e.key === 'Enter') {
					submitEl.click();
					e.preventDefault();
				}
			};
			if(postform.isQuick) {
				postform.setReply(true, false);
			}
			updater.sendErrNotif();
			updater.continueUpdater();
			return true;
		}
		getImgRealName(wrap) {
			return $q('.originalNameLink', wrap).title;
		}
		getSage(post) {
			return $q('.sage', post).hasChildNodes();
		}
		init() {
			if(!this.host.includes('nocsp.') && this.host.includes('kohlchan.net')) {
				deWindow.location.assign(deWindow.location.href
					.replace(/(www\.)?kohlchan\.net/, 'nocsp.kohlchan.net'));
				return true;
			}
			if(locStorage.autoRefreshMode !== 'false' || locStorage.convertLocalTimes !== 'false') {
				locStorage.autoRefreshMode = false;
				locStorage.convertLocalTimes = false;
				deWindow.location.reload();
				return true;
			}
			$Q('.imgLink').forEach(el => (el.className = 'de-img-link'));
			return super.init();
		}
		sendHTML5Post(form, data, needProgress, hasFiles) {
			const oekakiEl = $id('wPaint');
			if(oekakiEl?.hasChildNodes() && oekakiEl.style.display !== 'none') {
				hasFiles = true;
				const mime = { type: 'image/png' };
				const files = [new File([
					new Blob([ContentLoader.getDataFromCanvas($q('.wPaint-canvas', oekakiEl))], mime)
				], 'oekaki.png', mime), ...data.getAll('files').slice(0, -1)];
				data.delete('files');
				for(const file of files) {
					data.append('files', file);
				}
			}
			return super.sendHTML5Post(form, data, needProgress, hasFiles);
		}
	}
	ibDomains['kohlchan.net'] = ibDomains['kohlchan.ws'] =
		ibDomains['kohlchanvwpfx6hthoti5fvqsjxgcwm3tmddvpduph5fqntv5affzfqd.onion'] = Kohlchan;

	class Kropyvach extends Vichan {
		constructor(...args) {
			super(...args);
			this.markupBB = true;
		}
		get css() {
			return super.css + (this.t ? '' : '\r\n.de-btn-reply { display: none !important; }');
		}
		get markupTags() {
			return ['b', 'i', 'u', 's', 'spoiler', 'code'];
		}
	}
	ibDomains['kropyva.ch'] = Kropyvach;

	class Lainchan extends Vichan {
		constructor(...args) {
			super(...args);
			this.markupBB = true;
			this.qOPost = '.op';
		}
		get css() {
			return `${ super.css }
				${ Cfg.imgNames ? '.details > a { display: none; }' : '' }`;
		}
		get markupTags() {
			return ['b', 'i', '', '', 'spoiler', 'code'];
		}
		getImgRealName(wrap) {
			return $q('.details > a, .postfilename', wrap).textContent;
		}
		init() {
			super.init();
			$Q('.files + .post.op').forEach(el => el.prepend(el.previousElementSibling));
			return false;
		}
	}
	ibDomains['lainchan.org'] = Lainchan;

	class Nichan extends Vichan {
		constructor(...args) {
			super(...args);
			this.markupBB = true;
			this.qPages = '.bottom > .pages';
			this.qPostImg = '.post-image[alt]:not(.deleted), video.post-image';
		}
		get css() {
			return `${ super.css }
				.createbutton, label[for="email_selectbox"] { display: none !important; }`;
		}
		get markupTags() {
			return ['b', 'i', 'u', 's', 'spoiler', 'code'];
		}
	}
	ibDomains['nichan.net'] = Nichan;

	class Nowere extends BaseBoard {
		get markupTags() {
			return ['**', '***', '', '^H', '', ''];
		}
		init() {
			$script('highlight = Function.prototype;');
			return false;
		}
	}
	ibDomains['nowere.net'] = Nowere;

	class Ponyach extends BaseBoard {
		constructor(...args) {
			super(...args);
			this.formParent = 'replythread';
			this.jsonSubmit = true;
			this.multiFile = true;
			this.qBan = 'font[color="#FF0000"]';
			this.qPostImgInfo = '.filesize[style="display: inline;"]';
		}
		get qPostImgNameLink() {
			return 'a:first-of-type';
		}
		getImgInfo(wrap) {
			return wrap.textContent;
		}
		getImgRealName(wrap) {
			return $q('.mobile_filename_hide', wrap).textContent.trim();
		}
		getImgWrap(img) {
			return $q('#fs_' + img.alt, img.closest('.post-files')) || img.closest('.filesize');
		}
		getPNum(post) {
			return +post.getAttribute('data-num');
		}
		getSubmitData({ error, id }) {
			return { error, postNum: id && +id };
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
	ibDomains['ponyach.com'] = Ponyach;

	class Synch extends Vichan {
		constructor(...args) {
			super(...args);
			this.markupBB = true;
			this.qPages = '.pagination';
			this.qPostImgInfo = '.unimportant';
		}
		get css() {
			return `${ super.css }
				.fa-sort { display: none; }
				time::after { content: none; }`;
		}
		get markupTags() {
			return ['b', 'i', 'u', 's', 'h', 'code', 'sup', 'sub'];
		}
		get qPostImgNameLink() {
			return '.file-info > a';
		}
		fixHTML(data, isForm) {
			const formEl = super.fixHTML(data, isForm);
			const els = $Q('.btn-group', formEl);
			for(let i = 0, len = els.length; i < len; ++i) {
				els[i].replaceWith($q('a', els[i]));
			}
			return formEl;
		}
		getImgWrap(img) {
			return img.parentNode.parentNode;
		}
		init() {
			const val = '{ "simpleNavbar": true }';
			if(locStorage.settings !== val) {
				locStorage.settings = val;
				deWindow.location.reload();
				return true;
			}
			super.init();
			defaultCfg.timePattern = 'w+dd+m+yyyy+hh+ii+ss';
			defaultCfg.timeOffset = 4;
			defaultCfg.correctTime = 1;
			return false;
		}
	}
	ibDomains['syn-ch.com'] = ibDomains['syn-ch.com.ua'] = ibDomains['syn-ch.org'] =
		ibDomains['syn-ch.ru'] = Synch;

	class Warosu extends BaseBoard {
		constructor(...args) {
			super(...args);
			this.hasHtmlTag = false;
			this.qDelForm = '.content';
			this.qForm = '.subreply';
			this.qFormSubm = '.g-recaptcha';
			this.qOPost = '.comment';
			this.qPostImgInfo = '.fileinfo';
			this.qPostRef = '.js';
			this.res = 'thread/';
		}
		get css() {
			return `.quoted-by { display: none !important; }
				.de-btn-img { float: left; }
				.thumb { margin-left: 0; }`;
		}
		get qPostImgNameLink() {
			return 'br + a';
		}
		fixHTMLHelper(str) {
			return str.replace(/\/post\/(\d+)"/g, '/$1"');
		}
		getImgRealName(wrap) {
			return $q('.fileinfo', wrap).textContent.split(', ').pop();
		}
		getImgWrap(img) {
			return img.parentNode.parentNode;
		}
		getTNum(thr) {
			return +$q('.comment', thr).id.match(/\d+/);
		}
		getThrUrl(board, tNum) {
			return this.protocol + '//' + this.host + fixBoardName(board) + this.res + tNum;
		}
	}
	ibDomains['warosu.org'] = Warosu;

	const wLoc = deWindow.location;
	const { protocol } = wLoc;
	let domain = localData?.domain;
	if(checkDomains) {
		if(!domain) {
			const host = wLoc.hostname.toLowerCase();
			const ibKeys = Object.keys(ibDomains);
			let i = ibKeys.length;
			while(i--) {
				domain = ibKeys[i];
				if(host === domain || host.endsWith('.' + domain)) {
					return new ibDomains[domain](protocol, domain);
				}
			}
		} else if(domain in ibDomains) {
			return new ibDomains[domain](protocol, domain);
		}
	}
	if(!domain) {
		domain = wLoc.hostname;
	}
	if(!domain || !checkEngines) {
		return null;
	}
	domain = domain.match(/(?:(?:[^.]+\.)(?=org\.|net\.|com\.))?[^.]+\.[^.]+$|^\d+\.\d+\.\d+\.\d+$|localhost/)[0];
	for(let i = ibEngines.length - 1; i >= 0; --i) {
		const [path, Ctor] = ibEngines[i];
		if($q(path, doc)) {
			return new Ctor(protocol, domain);
		}
	}
	return null;
}
