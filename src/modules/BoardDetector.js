/* ==[ BoardDetector.js ]=====================================================================================
                                             IMAGEBOARD DETECTOR
=========================================================================================================== */

function getImageBoard(checkDomains, checkEngines) {
	const ibDomains = {};
	const ibEngines = [];

	// ENGINES
	ibEngines.push(['form[action$="wakaba.pl"]', BaseBoard]);

	class Kusaba extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);
			this.qError = 'h1, h2, div[style*="1.25em"]';
			this.qFormRedir = 'input[name="redirecttothread"][value="1"]';

			this.formHeaders = true;
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
				[el.previousSibling, el.nextSibling, el].forEach($del);
			}
			return false;
		}
	}
	ibEngines.push(['script[src*="kusaba"]', Kusaba], ['form#delform[action$="/board.php"]', Kusaba]);

	class Tinyboard extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);

			this.cReply = 'post reply';
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

			this.firstPage = 1;
			this.formParent = 'thread';
			this.hasCatalog = true;
			this.hasRefererErr = true;
			this.jsonSubmit = true;
			this.timePattern = 'nn+dd+yy++w++hh+ii+ss';
			this._origInputs = null;
		}
		get qPostImgNameLink() {
			return 'p.fileinfo > a:first-of-type';
		}
		get css() {
			return `.banner, .hide-thread-link, .mentioned,
					.post-hover { display: none !important; }
				div.post.reply:not(.de-entry):not(.de-cfg-tab):not(.de-win-body) {
					float: left !important; clear: left; display: block; }
				${ Cfg.imgNames ? `.postfilename, .unimportant > a[download] { display: none }
					.fileinfo > .unimportant { white-space: nowrap; }` : '' }`;
		}
		get markupTags() {
			return ['\'\'\'', '\'\'', '__', '~~', '**', '[code'];
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
				$Q(query, form).forEach(el => this._origInputs[0].append(el));
			} else if(!tNum) {
				// Switching from the post reply to thread creation occurs. Restoring the original fields.
				pr.subm.value = this._origInputs[1];
				$delAll(query, form);
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
				$delAll(query, form);
				$Q(query, loadedForm).forEach(el => form.append(doc.adoptNode(el)));
				closePopup('load-form');
			}, errFn);
		}
		fixHTML(data, isForm) {
			const formEl = super.fixHTML(data, isForm);
			$Q('br.clear', formEl).forEach(brEl => {
				const hr = brEl.nextElementSibling;
				if(hr && hr.tagName === 'HR') {
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
			const el = $q('.postfilename', wrap) ||
				$q('.unimportant > a[download]', wrap) || $q(this.qPostImgNameLink, wrap);
			return el.title || el.textContent;
		}
		getPageUrl(board, page) {
			return page > 1 ? fixBrd(board) + page + this.docExt : fixBrd(board);
		}
		getSubmitData({ error, id }) {
			return { error, postNum: id && +id };
		}
		getTNum(thr) {
			return +$q('input[type="checkbox"]', thr).name.match(/\d+/);
		}
		init() {
			$script('window.FormData = void 0;');
			const formEl = $q('form[name="post"]');
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
		constructor(prot, dm) {
			super(prot, dm);

			this.qDelPassw = '#password';
			this.qPostImg = '.post-image[alt]:not(.deleted)';

			this.multiFile = true;
		}
		get css() {
			return `${ super.css }
				#expand-all-images, #expand-all-images + .unimportant, .fileinfo > span[style*="nowrap;"],
					.post-btn, small, .watchThread { display: none !important; }
				body { padding: 0 5px !important; }
				.boardlist { z-index: 1 !important; }
				.fileinfo { width: 240px; }
				.multifile { width: auto !important; }`;
		}
		fixFileInputs(el) {
			el.innerHTML = Array.from({ length: 5 }, (val, i) =>
				`<div${ i ? ' style="display: none;"' : '' }>` +
				`<input type="file" name="file${ i ? i + 1 : '' }"></div>`
			).join('');
		}
		fixHTMLHelper(str) {
			return str.replace(/"\/player\.php\?v=([^&]+)&[^"]+"/g, '"$1"');
		}
		init() {
			super.init();
			if(locStorage.file_dragdrop !== 'false') {
				locStorage.file_dragdrop = false;
				deWindow.location.reload();
				return true;
			}
			$script('highlightReply = Function.prototype;');
			setTimeout(() => $del($id('updater')), 0);
			const textarea = $id('body');
			if(textarea) {
				textarea.removeAttribute('id');
			}
			return false;
		}
	}
	ibEngines.push(['tr#upload', Vichan]);

	class TinyIB extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);

			this.qError = 'body[align=center] div, div[style="margin-top: 50px;"]';
			this.qPostImg = 'img.thumb, video.thumb';
			this.qPostMsg = '.message';
		}
		get css() {
			return '.replymode { display: none; }';
		}
		fixHTMLHelper(str) {
			return str.replace(/="\.\.\//g, `="/${ this.b }/`);
		}
		getCaptchaSrc(src) {
			return src.replace(/\?[^?]+$|$/, '?' + Math.random());
		}
		getImgWrap(img) {
			return img.parentNode.parentNode.parentNode;
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
			defaultCfg.addTextBtns = 0;
			$Q('.message > .omittedposts').forEach(
				el => $replace(el, '<span class="abbrev">Post too long. <a href="#">Click to view.</a>'));
			return false;
		}
	}
	ibEngines.push(['form[action$="imgboard.php?delete"]', TinyIB]);

	class newTinyIB extends TinyIB {
		constructor(prot, dm) {
			super(prot, dm);

			this.hasCatalog = true;
			this.markupBB = true;
			this.multiFile = true;
			this.timePattern = 'yy+nn+dd+w+hh+ii+ss';
		}
		get fixHTMLHelper() {
			return null;
		}
		fixFileInputs(el) {
			const str = '><input type="file" name="file[]"></div>';
			el.innerHTML = '<div' + str + ('<div style="display: none;"' + str).repeat(3);
		}
		getImgRealName(wrap) {
			return $q('.filesize > a', wrap).textContent;
		}
		init() {
			return false;
		}
	}
	ibEngines.push(['body.tinyib', newTinyIB]);

	class Lynxchan extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);

			this.cReply = 'innerPost';
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

			this.firstPage = 1;
			this.formParent = 'threadId';
			this.hasCatalog = true;
			this.jsonSubmit = true;
			this.multiFile = true;

			this._hasNewAPI = false;
		}
		get qPostImgNameLink() {
			return '.originalNameLink';
		}
		get qThread() {
			return '.opCell';
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
			const str = '><input name="files" type="file"></div>';
			const maxEl = $id('labelMaxFiles');
			el.innerHTML = '<div' + str +
				('<div style="display: none;"' + str).repeat((maxEl ? +maxEl.textContent : 3) - 1);
		}
		getCapParent() {
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
			return fixBrd(board) + (page > 1 ? page + this.docExt : 'index.html');
		}
		getPNum(post) {
			return +$q('.deletionCheckBox', post).name.split('-')[2];
		}
		getPostWrap(el, isOp) {
			return isOp ? el : el.parentNode;
		}
		getSubmitData({ status, data }) {
			return {
				error   : status === 'error' ? data : null,
				postNum : status === 'ok' ? +data : null
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
				$replace(submEl, `<button id="de-postform-submit" type="submit">${
					submEl.innerHTML }</button>`);
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
				const getCookies = () => {
					const obj = {};
					const cookies = doc.cookie.split(';');
					for(let i = 0, len = cookies.length; i < len; ++i) {
						const parts = cookies[i].split('=');
						obj[parts.shift().trim()] = decodeURI(parts.join('='));
					}
					return obj;
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
				ajaxParams = {
					data: JSON.stringify({
						captchaId  : cookieObj.captchaid,
						bypassId   : cookieObj.bypass,
						parameters : dataObj,
						auth       : { login: cookieObj.login, hash: cookieObj.hash }
					}),
					headers : { 'Content-Type': 'application/x-www-form-urlencoded' },
					method  : 'POST'
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
		constructor(prot, dm) {
			super(prot, dm);

			this.cReply = 'post_wrapper';
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

			this.docExt = '';
			this.firstPage = 1;
			this.res = 'thread/';
		}
		get qPostImgNameLink() {
			return '.post_file_filename';
		}
		get qThread() {
			return '.thread[id]';
		}
		get css() {
			return `.backlink_list { display: none !important; }
				.de-oppost > .thread_image_box { float: left; margin: 0 20px 10px 15px; text-align: center;
					color: #bfbfbf; font-size: .8em; line-height: 150%; }`;
		}
		get isArchived() {
			return true;
		}
		fixHTMLHelper(str) {
			return str.replace(/\/#(\d+)"/g, '#$1"').replace(/\/post\/(\d+)\/"/g, '/#$1"');
		}
		getImgWrap(img) {
			return img.parentNode.parentNode.parentNode;
		}
		getPageUrl(board, page) {
			return fixBrd(board) + (page > 1 ? `page/${ page }/` : '');
		}
		getTNum(thr) {
			return +thr.getAttribute('data-thread-num');
		}
		init() {
			defaultCfg.ajaxUpdThr = 0;
			const el = $q('.search_box');
			if(el) {
				docBody.append(el);
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
	class _02ch extends Kusaba {
		constructor(prot, dm) {
			super(prot, dm);
			this._02ch = true;

			this.hasCatalog = true;
			this._capUpdPromise = null;
		}
		captchaUpdate(cap) {
			return cap.updateHelper('/captcha_update.php', xhr => {
				cap.parentEl.innerHTML = xhr.responseText;
				cap.textEl = $id('recaptcha_response_field');
				cap.initImage($q('img', cap.parentEl));
				cap.initTextEl();
			});
		}
	}
	ibDomains['02ch.su'] = _02ch;

	class _0chan extends Kusaba {
		constructor(prot, dm) {
			super(prot, dm);

			this.qDelForm = '#delform_instant';
			this.qPostHeader = '.posthead';

			this.formHeaders = false;
			this.hasCatalog = true;
			this.multiFile = true;
			this.ru = true;
		}
		get captchaInit() {
			$script(`Captcha.init(); Captcha.initForm(document.getElementById("postform"));`);
			return null;
		}
		get captchaUpdate() {
			$script('var captchaTimeout = 29.5;Captcha.state = "init";');
			return null;
		}
		get css() {
			return `.content > hr, .extrabtns, .postbutt, .replymode { display: none; }
				form { position: initial; }`;
		}
		fixFileInputs(el) {
			const str = '><input type="file" name="file"></div>';
			el.innerHTML = '<div' + str + ('<div style="display: none;"' + str).repeat(3);
		}
		fixVideo(isPost, data) {
			$Q('.video-embed', isPost ? data.el : data).forEach(el => {
				(isPost ? data : this.getPostOfEl(el)).msg
					.prepend($q('.de-video-link', el), doc.createElement('br'));
				const parent = el.parentNode;
				el.remove();
				if(!parent.firstElementChild) {
					parent.remove();
				}
			});
			return [];
		}
		getTNum(thr) {
			return +thr.getAttribute('data-threadid');
		}
	}
	ibDomains['2.0-chan.ru'] = _0chan;

	class _2__ch extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);

			this.qOPostEnd = 'table:not(.postfiles)';
			this.qPages = 'table[border="1"] td > a:last-of-type';
			this.qPostImg = 'img.thumb';

			this.docExt = '.html';
			this.hasPicWrap = true;
			this.jsonSubmit = true;
			this.markupBB = true;
			this.multiFile = true;
			this.ru = true;
		}
		get qThread() {
			return '.threadz';
		}
		get captchaInit() {
			$id('captchadiv').innerHTML =
				`<img src="${ this.getCaptchaSrc() }" style="vertical-align: bottom;" id="imgcaptcha">`;
			return null;
		}
		get css() {
			return '#fastload, .rfmap, span[id$="_display"] { display: none; }';
		}
		fixFileInputs(el) {
			const str = '><input type="file" name="file"></div>';
			el.innerHTML = '<div' + str + ('<div style="display: none;"' + str).repeat(3);
		}
		fixHTMLHelper(str) {
			return str.replaceAll('data-original="/', 'src="/');
		}
		getCaptchaSrc() {
			return `/${ this.b }/captcha.fpl?${ Math.random() }`;
		}
		getImgWrap(img) {
			return img.parentNode.parentNode.parentNode;
		}
		getOmitted(el, len) {
			let txt;
			return el && (txt = el.textContent) ? +txt.match(/\d+/) - len : 1;
		}
		getPageUrl(board, page) {
			return `${ fixBrd(board) }${ page > 0 ? page : 0 }.memhtml`;
		}
		getSubmitData(json) {
			let error = null;
			let postNum = null;
			if(json.post) {
				postNum = +json.post;
			} else {
				error = Lng.error[lang];
				if(json.error) {
					error += ': ' + json.error.text;
				}
			}
			return { error, postNum };
		}
		init() {
			const btnEl = $q('#postform input[type="button"]');
			if(btnEl) {
				$replace(btnEl, '<input type="submit" value="Отправить">');
			}
			const delFormEl = $q(this.qDelForm);
			$delAll('input[type="hidden"]', delFormEl);
			delFormEl.append($q('.userdelete'));
			return false;
		}
	}
	ibDomains['2--ch.ru'] = ibDomains['2-ch.su'] = _2__ch;

	class /* _2ch */ Makaba extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);
			this.makaba = true;

			this.cReply = 'de-reply-class';
			this.qBan = '.post__pomyanem';
			this.qClosed = '.sticky-img[src$="locked.png"]';
			this.qDelForm = '#posts-form, #js-posts';
			this.qFormFile = '.postform__raw.filer input[type="file"]';
			this.qFormRedir = null;
			this.qFormRules = '.rules';
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
			this.qTrunc = null;

			this.formParent = 'thread';
			this.hasAltCaptcha = true;
			this.hasArchive = true;
			this.hasCatalog = true;
			this.hasOPNum = true;
			this.hasPicWrap = true;
			this.JsonBuilder = MakabaPostsBuilder;
			this.jsonSubmit = true;
			this.markupBB = true;
			this.multiFile = true;
			this.timePattern = 'dd+nn+yy+w+hh+ii+ss';
			this._capUpdPromise = null;
			this._isBeta = false;
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
			return '.file-attr > .desktop, .post__file-attr > .desktop';
		}
		get css() {
			return `.js-post-findimg, .js-post-saveimg, .media-expand-button, .media-thumbnail, .newpost,
					.post__btn:not(.icon_type_active), .post__number, .post__refmap, .postform-hr,
					.thread-nav > :not(.search) { display: none !important; }
				#down-nav-arrow, #up-nav-arrow { z-index: 0; }
				.postform__raw_flex { flex-direction: column; align-items: flex-start; }
				.de-pview > .post__details { margin-left: 4px; }
				.de-reply-class { background: var(--theme_default_postbg);
					border: 1px solid var(--theme_default_border); border-radius: 3px; }
				.oekaki-height, .oekaki-width { width: 36px !important; }
				.post_type_reply { max-width: 100%; }
				.postform { width: auto; }
				.postarea { display: initial !important; }
				.postform__sticker-btn, .postform__sticker-prev { bottom: ` +
					`${ !Cfg.txtBtnsLoc || !Cfg.addTextBtns ? 3 :
					Cfg.addTextBtns === 1 ? 28 : Cfg.addTextBtns === 2 ? 19 : 25 }px !important; }
				${ Cfg.addSageBtn ? `.options__box[onclick="ToggleSage()"]
					{ display: none !important; }` : '' }
				${ Cfg.addTextBtns ? '.js-postform-mu { display: none; }' : '' }
				${ Cfg.expandTrunc ? `.expand-large-comment,
					div[id^="shrinked-post"] { display: none !important; }
					div[id^="original-post"] { display: block !important; }` : '' }
				${ Cfg.imgNames === 2 ? `.post__filezise { display: inline !important; }
					.post__file-attr { margin-bottom: 1px; }` : '' }
				${ Cfg.noSpoilers ? '.spoiler::after { width: 0; }' : '' }`;
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
		get markupTags() {
			return ['B', 'I', 'U', 'S', 'SPOILER', '', 'SUP', 'SUB'];
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
				var formData = new FormData();
				var data = {'board': this.b, 'thread': tNum, 'post': pNum, 'comment': inpEl.value};
				for (var key in data) {
					formData.append(key, data[key]);
				}
				closePopup('edit-report');
				$popup('report', Lng.sending[lang], true);
				$ajax('/user/report', {
					method: 'POST',
					data: formData,
					success() {},
					contentType: false,
					processData: false
				}).then(xhr => {
					let obj;
					try {
						obj = JSON.parse(xhr.responseText);
					} catch(err) {}
					$popup('report', obj.result === 1 ? Lng.succReported[lang] : Lng.error[lang] + ': ' + obj.error.message);
				});
			});
			Object.defineProperty(this, 'reportForm', { value });
			return value;
		}
		captchaInit(cap) {
			const box = $q('.captcha-box, .captcha');
			if(Cfg.altCaptcha) {
				box.innerHTML = `<div id="captcha-widget-main"></div>
					<input name="captcha_type" value="recaptcha" type="hidden">`;
				return null;
			}
			const img = box.firstChild;
			if(!img || img.tagName !== 'IMG') {
				box.innerHTML = `<img>
					<input name="2chcaptcha_value" maxlength="6" type="text" style="display: block;">
					<input name="2chcaptcha_id" type="hidden">`;
				const [img, inp] = [...box.children];
				img.onclick = () => this.updateCaptcha(cap);
				inp.tabIndex = 999;
				cap.textEl = inp;
			}
			return null;
		}
		captchaUpdate(cap) {
			const url = `/api/captcha/${ Cfg.altCaptcha ? 'recaptcha' : '2chcaptcha' }/id`;
			return cap.updateHelper(url, xhr => {
				const box = $q('.captcha-box, .captcha');
				let data = xhr.responseText;
				try {
					data = JSON.parse(data);
				} catch(err) {}
				if(cap.isSubmitWait && data.result !== 1) {
					pr.subm.click();
				}
				switch(data.result) {
				case 0: box.textContent = 'Пасскод недействителен. Перелогиньтесь.'; break;
				case 2: box.textContent = 'Вы - пасскодобоярин.'; break;
				case 3: return CancelablePromise.reject(new CancelError()); // Captcha is disabled
				case 1: // Captcha is enabled
					if(!Cfg.altCaptcha) {
						if(!cap.isSubmitWait) {
							const img = box.firstChild;
							img.src = '';
							img.src = `/api/captcha/2chcaptcha/show?id=${ data.id }`;
							box.lastChild.value = data.id;
							break;
						}
						$q('.captcha__key').value = data.id;
						$script($id('captcha-widget').hasChildNodes() ?
							`grecaptcha.reset(deCapWidget);
							grecaptcha.execute(deCapWidget);` :
							`deCapWidget = grecaptcha.render('captcha-widget', {
								sitekey : '${ data.id }',
								theme   : 'light',
								size    : 'invisible',
								callback: function() {
									var el = document.getElementById('captcha-widget-main');
									el.innerHTML = '<input type="hidden" name="g-recaptcha-response">';
									el.firstChild.value = grecaptcha.getResponse();
									document.getElementById('submit').click();
								}
							});
							grecaptcha.execute(deCapWidget);`);
						break;
					} else if(data.type === 'recaptcha') {
						$q('.captcha__key').value = data.id;
						if(!$id('captcha-widget-main').hasChildNodes()) {
							$script(`globRecapWidget = grecaptcha.render('captcha-widget-main', { sitekey: "${
								data.id }" });`);
						} else {
							$script('grecaptcha.reset(globRecapWidget);');
						}
						break;
					}
					/* falls through */
				default: box.innerHTML = data;
				}
			});
		}
		deleteTruncMsg(post, el) {
			el.previousSibling.remove();
			$show(el.previousSibling);
			el.remove();
		}
		fixFileInputs(el) {
			el.innerHTML = Array.from({ length: 8 }, (val, i) =>
				`<div${ i ? ' style="display: none;"' : '' }><input type="file" name="file[]"></div>`
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
			return this._isBeta ? el : el.parentNode;
		}
		getSage(post) {
			this.getSage = !$q('span[id^="id_tag_"]') ? super.getSage : post => {
				return !$q('span[id^="id_tag_"], .post__ophui', post);
			};
			return this.getSage(post);
		}
		fixHTMLHelper(str) {
			return str.replace(/<a href="https?:\/\/[^"]*"([^>]*)>(https?:\/\/[^<]+)<\/a>([^<$\s\n]+)/ig, "<a href=\"$2$3\"$1>$2$3</a>");
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
		init() {
			if($q('section.posts')) { // Old Makaba engine
				this.cReply = 'post reply';
				this.qBan = '.pomyanem';
				this.qFormFile = 'tr input[type="file"]';
				this.qFormRules = '.rules-area';
				this.qFormTd = 'td';
				this.qFormTr = 'tr';
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
				this.hasArchive = false;
				const { css } = this;
				Object.defineProperty(this, 'css', {
					configurable : true,
					get          : () => `${ css }
						#ABU-alert-wait, .ABU-refmap, .fa-media-icon, .kupi-passcode-suka, .logo + hr,
						.media-expand-button, #media-thumbnail, .message-byte-len, .nav-arrows, .norm-reply,
						.postform-hr, .postpanel > :not(img), .posts > hr, .reflink::before, .thread-nav,
						.toolbar-area { display: none !important; }
						${ Cfg.addSageBtn ? `.box[onclick="ToggleSage()"] {
							display: none !important; }` : '' }
						${ Cfg.imgNames === 2 ? `.filesize { display: inline !important; }
							.file-attr { margin-bottom: 1px; }` : '' }`
				});
			} else {
				if($id('js-posts')) { // Fix counters in beta.2ch.hk
					this._isBeta = true;
					$Q('.thread__missed').forEach(el =>
						el.innerHTML = el.innerHTML.replace(/ (\d+) постов/, (m, i) => ` ${ i - 1 } постов`));
				}
				const infEl = $q('.postform .filer__limits');
				const optEl = $q('.postform .options');
				if(infEl && optEl) {
					optEl.append(infEl);
				}
			}
			$script(`(function() {
				function fixGlobalFunc(name) {
					Object.defineProperty(window, name,
						{ value: Function.prototype, writable: false, configurable: false });
				}
				fixGlobalFunc("$alert");
				fixGlobalFunc("autorefresh_start"); // Old makaba only
				fixGlobalFunc("linkremover");
				fixGlobalFunc("Media");
				fixGlobalFunc("MExpandMedia");
				MExpandMedia.close = Function.prototype;
				window.FormData = void 0;
				$(function() { $(window).off(); });
			})();`);
			$Q('.autorefresh').forEach(el => {
				const inpEl = $q('input', el);
				if(inpEl.checked) {
					inpEl.click();
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
			if($q('#posts-form > .thread, #js-posts > .thread, form[de-form] > .thread')) {
				return true;
			}
			const initObserver = new MutationObserver(mutations => {
				if(mutations[0].addedNodes[0]?.className === 'thread') {
					initObserver.disconnect();
					runMain(checkDomains, dataPromise);
				}
			});
			const el = $q('#posts-form, #js-posts, form[de-form]');
			if(el) {
				initObserver.observe(el, { childList: true });
			}
			return false;
		}
	}
	ibDomains['2ch.hk'] = ibDomains['2ch.life'] = Makaba;

	class _2chan extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);

			this.qDelForm = 'form:not([enctype])';
			this.qForm = '#fm';
			this.qFormRedir = null;
			this.qFormRules = '.chui';
			this.qOmitted = 'font[color="#707070"]';
			this.qPost = 'td:nth-child(2)';
			this.qPostImg = 'a[href$=".jpg"] > img, a[href$=".png"] > img, a[href$=".gif"] > img';
			this.qPostRef = '.del';

			this.docExt = '.htm';
			this.formParent = 'resto';
		}
		get qPostImgNameLink() {
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
		getPageUrl(board, page) {
			return fixBrd(board) + (page > 0 ? page + this.docExt : 'futaba.htm');
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
		getTNum(thr) {
			return +$q('input[type="checkbox"]', thr).name.match(/\d+/);
		}
		init() {
			$del($q('base', doc.head)); // <base> is not compartible with SVG
			return false;
		}
	}
	ibDomains['2chan.net'] = _2chan;

	class _2channel extends Makaba {
		constructor(prot, dm) {
			super(prot, dm);
			this._2channel = true;

			this.hasAltCaptcha = false;
		}
		get reportForm() {
			return null;
		}
		captchaInit(cap) {
			return this.captchaUpdate(cap);
		}
		captchaUpdate(cap) {
			const url = `/api/captcha/service_id?board=${ this.b }&thread=` + pr.tNum;
			return cap.updateHelper(url, xhr => {
				const box = $q('.captcha');
				let data = xhr.responseText;
				try {
					data = JSON.parse(data);
				} catch(err) {}
				switch(data.result) {
				case 1: { // Captcha is enabled
					const el = $q('.captcha__image');
					const img = $q('img', el) || $aBegin(el, '<img>');
					img.src = '';
					img.src = `/api/captcha/image/${ data.id }`;
					$q('input[name="captcha_id"]').value = data.id;
					break;
				}
				case 2: return CancelablePromise.reject(new CancelError()); // Captcha is disabled
				case 3: box.innerHTML = 'Вам больше не нужно вводить капчу.'; break;
				default: box.innerHTML = data;
				}
				$show(box);
				box.removeAttribute('hidden');
				cap.textEl.tabIndex = 999;
			});
		}
		fixFileInputs(el) {
			el.innerHTML = Array.from({ length: 4 }, (val, i) =>
				`<div${ i ? ' style="display: none;"' : '' }><input type="file" name="formimages[]"></div>`
			).join('');
		}
		fixHTMLHelper(str) {
			return str.replace(/src="[^>]+" data-src="/g, 'src="');
		}
		getCapParent() {
			return $q('.captcha');
		}
		init() {
			super.init();
			this.qFormFile = 'input[name="formimages[]"]';
			this.qFormTd = 'div[class^="freply__"]';
			this.qFormTr = 'div[class^="freply__"]';
			const { css } = this;
			Object.defineProperty(this, 'css', {
				configurable : true,
				get          : () => `${ css }
					#AlertBox, .postform__checkbox.first, .postform__header, .refmap, #youtube-thumb-float
						{ display: none !important; }
					.de-win-open:not(#de-win-cfg) > .de-win-body { background-color: #eee !important; }
					.preview.lazy { opacity: 1; }`
			});
			let el = $q('.captcha');
			if(el) {
				$q('.freply__files-and-captcha').before(el);
			}
			el = $id('postform');
			if(el) {
				el.setAttribute('action', el.getAttribute('action') + '?json=1');
			}
			return false;
		}
	}
	ibDomains['2channel.moe'] = ibDomains['2channel5xx5xchx.onion'] = _2channel;

	class _2chRip extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);

			this.jsonSubmit = true;
			this.ru = true;

			this._capUpdPromise = null;
		}
		get css() {
			return `small[id^="rfmap_"], #submit_button, .qreply_btn { display: none; }
				#subject + div { display: inline !important; }
				.replypage .reply .reflink::before { content: "" }`;
		}
		captchaUpdate(cap) {
			return cap.updateHelper('/cgi/captcha?task=get_id', ({ responseText: id }) => {
				$id('imgcaptcha').src = '/cgi/captcha?task=get_image&id=' + id;
				$id('captchaid').value = id;
			});
		}
		getSubmitData(json) {
			return {
				error   : json.message ? json.message_title + ': ' + json.message : null,
				postNum : json.num ? +json.num : null
			};
		}
		init() {
			$script('postFormSubmit = Function.prototype;');
			$id('postform').insertAdjacentHTML('beforeend', '<input type="hidden" name="json" value="1">');
			return false;
		}
	}
	ibDomains['2ch.rip'] = ibDomains['dva-ch.net'] = _2chRip;

	class _410chan extends Kusaba {
		constructor(prot, dm) {
			super(prot, dm);

			this.qFormRedir = 'input#noko';
			this.qPages = '.pgstbl > table > tbody > tr > td:nth-child(2)';

			this.hasCatalog = true;
			this.markupBB = false;
			this.ru = true;
			this.timePattern = 'dd+nn+yyyy++w++hh+ii+ss';
			this._capUpdPromise = null;
		}
		get captchaLang() {
			return 0;
		}
		get css() {
			return `${ super.css }
				#resizer { display: none; }
				form > span { margin-top: 5px; }
				.de-thr-hid { display: inherit; }
				.reflink::after { content: none !important; }
				.spoiler-image:hover::after { content: none !important; }
				.topmenu { z-index: 1; }`;
		}
		get markupTags() {
			return ['**', '*', '__', '^^', '%%', '`'];
		}
		captchaUpdate(cap) {
			return cap.updateHelper(`/api_adaptive.php?board=${ this.b }`, xhr => {
				if(xhr.responseText === '1') {
					cap.textEl.disabled = true;
					setTimeout(() => (cap.textEl.value = 'проезд оплачен'), 0);
					return;
				}
				cap.textEl.disabled = false;
				cap.textEl.value = '';
				const img = $q('img', cap.parentEl);
				const src = img.getAttribute('src');
				img.src = '';
				img.src = this.getCaptchaSrc(src);
			});
		}
		getCaptchaSrc(src) {
			return src.replace(/\?[^?]+$|$/, `?board=${ aib.b }&${ Math.random() }`);
		}
		getSage(post) {
			return !!$q('.filetitle', post)?.textContent.includes('\u21E9');
		}
	}
	ibDomains['410chan.org'] = _410chan;

	class _4chan extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);
			this._4chan = true;

			this.cReply = 'post reply';
			this.qBan = 'strong[style="color: red;"]';
			this.qClosed = '.archivedIcon';
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

			this.anchor = '#p';
			this.docExt = '';
			this.firstPage = 1;
			this.formParent = 'resto';
			this.hasCatalog = true;
			this.hasTextLinks = true;
			this.JsonBuilder = _4chanPostsBuilder;
			this.res = 'thread/';
			this.timePattern = 'nn+dd+yy+w+hh+ii-?s?s?';
		}
		get qFormSubj() {
			return 'input[name="sub"]';
		}
		get qPostImgNameLink() {
			return '.fileText > a';
		}
		get captchaUpdate() {
			let value = null;
			if($id('captchaFormPart')) {
				value = cap => {
					const container = $id('t-root');
					if(!container) {
						cap.hasCaptcha = false;
						return;
					}
					$replace(container, '<div id="t-root"></div>');
					$script('initTCaptcha();');
					setTimeout(() => {
						cap.textEl = $id('t-resp');
						cap.textEl.tabIndex = 999;
						cap.initTextEl();
					}, 1e3);
					return null;
				};
			}
			Object.defineProperty(this, 'captchaUpdate', { value });
			return value;
		}
		get css() {
			return `.backlink, #blotter, .de-file-utils + .desktop, .extButton, hr.desktop, .navLinks,
					.postMenuBtn, #togglePostFormLink { display: none !important; }
				#bottomReportBtn { display: initial !important; }
				#g-recaptcha { height: initial; }
				.postForm { display: table !important; width: auto !important; }
				textarea { margin-right: 0 !important; }
				${ Cfg.widePosts ? '.sideArrows { display: none; }' : '' }`;
		}
		get markupTags() {
			return ['', '', '', '', $q('input[type="checkbox"][name="spoiler"]') ? '[spoiler' : '',
				this.b === 'g' ? '[code' : ''];
		}
		fixDeadLinks(str) {
			return str.replace(/<span class="deadlink">&gt;&gt;(\d+)<\/span>/g,
				'<a class="de-ref-del deadlink" href="#p$1">&gt;&gt;$1</a>');
		}
		fixHTMLHelper(str) {
			return str.replace(/<span>([^<]+)(?:<\/?wbr>)?([^<]+)<\/span> \[<a [^>]+>Embed<\/a>\]/g, '$1$2')
				.replace(/<\/?wbr>/g, '').replace(/( \(OP\)| →)<\/a/g, '</a');
		}
		fixVideo() {
			return [];
		}
		getImgInfo(wrap) {
			const el = $q(this.qPostImgInfo, wrap);
			return el ? el.lastChild.textContent : '';
		}
		getImgRealName(wrap) {
			const el = $q(this.qPostImgNameLink, wrap);
			return el ? el.title || el.parentNode.title || el.textContent : '';
		}
		getJsonApiUrl(board, tNum) {
			return `//a.4cdn.org/${ board }/thread/${ tNum }.json`;
		}
		getImgWrap(img) {
			return img.parentNode.parentNode;
		}
		getPageUrl(board, page) {
			return fixBrd(board) + (page > 1 ? page : '');
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
		init() {
			Cfg.findImgFile = 0;
			Cfg.txtBtnsLoc = 0;
			$id('styleSelector')?.setAttribute('onchange', 'setActiveStyleSheet(this.value);');
			return false;
		}
	}
	ibDomains['4chan.org'] = ibDomains['4channel.org'] = _4chan;

	class Archived extends FoolFuuka {
		getImgRedirectSrc(url) {
			return $ajax(url).then(xhr => xhr.responseText.match(/<meta[^>]+url=([^"]+)">/)[1]);
		}
	}
	ibDomains['archived.moe'] = Archived;

	class Arhivach extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);

			this.cReply = 'post';
			this.qDelBtn = null;
			this.qDelForm = 'body > .container-fluid';
			this.qDelPassw = null;
			this.qPost = '.post[postid]:not([postid=""])';
			this.qPostHeader = '.post_head';
			this.qPostImg = '.post_image > img';
			this.qPostMsg = '.post_comment_body';
			this.qPostRef = '.post_id, .post_head > b';
			this.qPostSubj = '.post_subject';

			this.docExt = '';
			this.hasOPNum = true;
			this.res = 'thread/';
		}
		get qPostImgNameLink() {
			return '.img_filename';
		}
		get qThread() {
			return '.thread_inner';
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
		fixHTML(data, isForm) {
			const formEl = super.fixHTML(data, isForm);
			const links = $Q('.expand_image', formEl);
			for(let i = 0, len = links.length; i < len; ++i) {
				const link = links[i];
				const href = link.getAttribute('onclick').match(/(?:https?:\/|\/storage)[^']+/);
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
	ibDomains['arhivach.ng'] = ibDomains['arhivachovtj2jrp.onion'] = Arhivach;

	class CrystalCafe extends Tinyboard {
		constructor(prot, dm) {
			super(prot, dm);

			this.qPost = '.post.reply';
		}
		get qPostImgNameLink() {
			return '.fileinfo > a[title]';
		}
		getImgInfo(wrap) {
			return $q(this.qPostImgNameLink, wrap).title;
		}
		getTNum(thr) {
			return +thr.id.match(/\d+/);
		}
	}
	ibDomains['crystal.cafe'] = CrystalCafe;

	class Dobrochan extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);
			this.dobrochan = true;

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
		captchaInit(cap) {
			if(!cap.textEl) {
				$hide($q('img', cap.parentEl));
				$show(cap.parentEl);
			}
			return null;
		}
		captchaUpdate(cap, isErr) {
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
				el.append(img);
				img.insertAdjacentHTML('afterend', '<br><input placeholder="Капча" autocomplete="off"' +
					' id="captcha" name="captcha" size="35" type="text">');
				$show(img);
				cap.isAdded = false;
				cap.originHTML = cap.parentEl.innerHTML;
				cap.addCaptcha();
			}
			return null;
		}
		deleteTruncMsg(post, el, isInit) {
			[el.previousSibling, el.nextSibling, el].forEach($del);
			if(isInit) {
				post.msg.firstElementChild.replaceWith($q('.alternate > div', post.el));
			} else {
				const sRunner = new SpellsRunner();
				post.updateMsg($q('.alternate > div', post.el), sRunner);
				sRunner.endSpells();
			}
		}
		disableRedirection(el) {
			$hide(el.closest('tr'));
			el.selectedIndex = 1;
		}
		fixFileInputs(el) {
			$Q('input[type="file"]', el).forEach(el => el.removeAttribute('onchange'));
			el.firstElementChild.value = 1;
		}
		getImgSrcLink(img) {
			// There can be a censored <img> without <a> parent
			const el = img.parentNode;
			return el.tagName === 'A' ? el :
				$q('.fileinfo > a', img.previousElementSibling ? el : el.parentNode);
		}
		getImgWrap(img) {
			const el = img.parentNode;
			return el.tagName === 'A' ? (el.previousElementSibling ? el : el.parentNode).parentNode :
				img.previousElementSibling ? el : el.parentNode;
		}
		getJsonApiUrl(board, tNum) {
			return `/api/thread/${ board }/${ tNum }/all.json?new_format&message_html&board`;
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
		getPageUrl(board, page) {
			return fixBrd(board) + (page > 0 ? page + this.docExt : 'index.xhtml');
		}
		getTNum(thr) {
			return +$q('a[name]', thr).name.match(/\d+/);
		}
		init() {
			if(deWindow.location.pathname === '/settings') {
				$q('input[type="button"]').addEventListener('click',
					() => readCfg().then(() => saveCfg('__hanarating', $id('rating').value)));
				return true;
			}
			$script('UploadProgress = Function.prototype;');
			$id('postform')?.append($q('.rules'));
			return false;
		}
		insertYtPlayer(msg, playerHtml) {
			const prev = msg.previousElementSibling;
			return $bBegin(prev.tagName === 'BR' ? prev : msg, playerHtml);
		}
	}
	ibDomains['dobrochan.com'] = ibDomains['dobrochan.org'] = ibDomains['dobrochan.ru'] = Dobrochan;

	class Endchan extends Lynxchan {
		constructor(prot, dm) {
			super(prot, dm);

			this.qTrunc = '.contentOmissionIndicator > p';
		}
		get css() {
			return `${ super.css }
				.bottomNav, .delLink, #expandAll, .hidePost, .hideThread, .linkLast50,
					.linkPreview, #modeBanner, .watchButton { display: none !important; }
				#de-main, .de-pview { font-size: 75%; }`;
		}
		init() {
			super.init();
			$Q('.imgLink > img[src^="/.youtube/"]').forEach(el => $del(el.closest('figure')));
			$Q('.youtube_wrapper').forEach(el => {
				const src = $q('a', el).href;
				$del($bBegin(el, `<a href="${ src }">${ src }</a>`).nextSibling);
			});
			return false;
		}
	}
	ibDomains['endchan.net'] = Endchan;

	class Ernstchan extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);

			this.cReply = 'post';
			this.qError = '.error > .info';
			this.qFormRedir = 'input[name="gb2"][value="thread"]';
			this.qFormSpoiler = 'input[type="checkbox"][name="spoilered"]';
			this.qOPost = '.thread_OP';
			this.qPages = '.pagelist > li:nth-last-child(2)';
			this.qPost = '.thread_reply';
			this.qPostHeader = '.post_head';
			this.qPostMsg = '.text';
			this.qPostSubj = '.subject';
			this.qPostTrip = '.tripcode';
			this.qTrunc = '.tldr';

			this.docExt = '';
			this.firstPage = 1;
			this.markupBB = true;
			this.multiFile = true;
			this.res = 'thread/';
		}
		get qPostImgNameLink() {
			return '.filename > a';
		}
		get css() {
			return `.content > hr, .de-parea > hr, .de-pview > .doubledash, .sage { display: none !important }
				.de-pview > .post { margin-left: 0; border: none; }
				#de-win-reply { float:left; margin-left:2em }`;
		}
		fixFileInputs(el) {
			const str = `><input name="file" type="file">
				<input type="hidden" name="spoilered" value="0">
				<input type="checkbox" name="spoilered" value="1"></div>`;
			el.innerHTML = '<div' + str + ('<div style="display: none;"' + str).repeat(3);
		}
		getImgWrap(img) {
			return img.parentNode.parentNode.parentNode;
		}
		getPageUrl(board, page) {
			return page > 1 ? fixBrd(board) + 'page/' + page : fixBrd(board);
		}
		getPostElOfEl(el) {
			while(el && !nav.matchesSelector(el, '.post')) {
				el = el.parentElement;
			}
			return el.parentNode;
		}
	}
	ibDomains['ernstchan.xyz'] = Ernstchan;

	class Gensokyo extends Kusaba {
		constructor(prot, dm) {
			super(prot, dm);

			this.hasRefererErr = true;
		}
	}
	ibDomains['gensokyo.4otaku.org'] = Gensokyo;

	class Iichan extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);

			this.hasArchive = true;
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
			return `${ !this.t ? '' : 'hr + #de-main { margin-top: -32px; } .logo { margin-bottom: 14px; }' }
			.iichan-hide-thread-btn, .iichan-quick-reply-btn, .postnum { display: none; }
			.replypage div[id^="thread"] span.reflink::after { content: none; }`;
		}
		get isArchived() {
			return this.b.includes('/arch');
		}
		stormWallFixAjax(url, text, el, needForm, fnResult) {
			return this.stormWallHelper(url, text, () => fnResult(el),
				frText => fnResult(getAjaxResponseEl(frText, needForm)));
		}
		stormWallFixCaptcha(url, img) {
			img.onload = img.onerror = () => {
				if(!(img.naturalHeight + img.naturalWidth)) {
					this.stormWallHelper(url, null, emptyFn, () => {
						img.src = '';
						img.src = url;
					});
				}
			};
		}
		stormWallFixSubmit(url, text, ajaxParams) {
			return this.stormWallHelper(url, text, () => $createDoc(text),
				() => $ajax(url, ajaxParams).then(xhr => $createDoc(xhr.responseText)));
		}
		stormWallHelper(url, text, fnOK, fnRes) {
			const stormWallTxt = '<script src="https://static.stormwall.pro/';
			if(text !== null && !text.includes(stormWallTxt)) {
				return fnOK();
			}
			return new Promise((resolve, reject) => {
				let loadCounter = 0;
				$popup('err-stormwall', `<div>${ Lng.stormWallCheck[lang] }</div>` +
					`<iframe id="de-stormwall" name="de-prohibited" src="${
						url }" width="500" height="500" style="display: none;"></iframe>`);
				const frEl = $id('de-stormwall');
				frEl.onload = () => {
					if(loadCounter++ < 1) {
						return;
					}
					const frText = frEl.contentWindow.document.documentElement.outerHTML;
					if(frText.includes(stormWallTxt)) {
						$show(frEl);
						reject(new AjaxError(0, Lng.stormWallErr[lang]));
						return;
					}
					closePopup('err-stormwall');
					resolve(fnRes(frText));
				};
			});
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
				$del(el.previousSibling);
			}
			return false;
		}
	}
	ibDomains['iichan.hk'] = Iichan;

	class Kohlchan extends Lynxchan {
		constructor(prot, dm) {
			super(prot, dm);
			this.kohlchan = true;

			this.qFormRules = '#rules_row';
			this.qPostImg = '.imgLink > img, .de-img-link > img';

			this.hasTextLinks = true;
			this.markupBB = true;
			this.timePattern = 'yyyy+nn+dd+hh+ii+ss';
		}
		get css() {
			return `${ super.css }
				.extraMenuButton, #postingForm, .sage { display: none; }`;
		}
		get fixKCUnixFilenames() {
			let value = null;
			if(locStorage.unixFilenames === 'true') {
				value = post => {
					const containerEl = $q('div.panelUploads', post.el);
					const imgLinks = $Q('a.imgLink:not(.unixLink)', containerEl);
					let timetext = new Date(containerEl.parentElement.parentElement
						.querySelectorAll('span.labelCreated')[0].textContent.replaceAll('-', '/')).getTime();
					timetext = timetext + timetext % 999;
					for(let j = 0; j < imgLinks.length; j++) {
						const imgLink = imgLinks[j];
						const parentEl = imgLink.parentElement;
						imgLink.href += '/' + timetext +
							(j === 0 && imgLinks.length === 1 ? '.' : '-' + j + '.') +
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
			if(pr.isQuick) {
				pr.setReply(true, false);
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
	}
	ibDomains['kohlchan.net'] = ibDomains['kohlchan.top'] = ibDomains['kohlchanagb7ih5g.onion'] =
		ibDomains['kohlchanvwpfx6hthoti5fvqsjxgcwm3tmddvpduph5fqntv5affzfqd.onion'] =
		ibDomains['kohlkanal.net'] = Kohlchan;

	class Kropyvach extends Vichan {
		constructor(prot, dm) {
			super(prot, dm);

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
		constructor(prot, dm) {
			super(prot, dm);

			this.qOPost = '.op';
		}
		get css() {
			return `${ super.css }
				.sidearrows { display: none !important; }
				.bar { z-index: 1; }
				${ Cfg.imgNames ? '.details > a { display: none; }' : '' }`;
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
			$script('highlight = Function.prototype;');
			return false;
		}
	}
	ibDomains['nowere.net'] = Nowere;

	class Ponyach extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);

			this.qBan = 'font[color="#FF0000"]';
			this.qPostImgInfo = '.filesize[style="display: inline;"]';

			this.formParent = 'replythread';
			this.jsonSubmit = true;
			this.multiFile = true;
		}
		get qPostImgNameLink() {
			return 'a:first-of-type';
		}
		getImgInfo(wrap) {
			return wrap.textContent;
		}
		getImgRealName(wrap) {
			return $q('.mobile_filename_hide', wrap).textContent;
		}
		getImgWrap(img) {
			return $id('fs_' + img.alt);
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
	ibDomains['ponyach.ru'] = Ponyach;

	class Ponychan extends Tinyboard {
		constructor(prot, dm) {
			super(prot, dm);

			this.qOPost = '.opContainer';

			this.jsonSubmit = false;
		}
		get css() {
			return `${ super.css }
				.mature_thread { display: block !important; }
				.mature_warning { display: none; }
				${ Cfg.imgNames ? '.post-filename { display: none; }' : '' }`;
		}
		getImgRealName(wrap) {
			return $q('.post-filename', wrap).textContent;
		}
		init() {
			super.init();
			$Q('img[data-mature-src]').forEach(el => (el.src = el.getAttribute('data-mature-src')));
			return false;
		}
	}
	ibDomains['ponychan.net'] = Ponychan;

	class Rfch extends Vichan {
		get css() {
			return `${ super.css }
				#coll-hide, #coll-show { display: none; }
				form[name="post"], form[name="post"] > table > tbody > tr:first-child
					{ display: block !important; }`;
		}
	}
	ibDomains['rfch.rocks'] = Rfch;

	class Synch extends Tinyboard {
		constructor(prot, dm) {
			super(prot, dm);

			this.qPages = '.pagination';
			this.qPostImgInfo = '.unimportant';

			this.markupBB = true;
		}
		get qPostImgNameLink() {
			return '.file-info > a';
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
				deWindow.location.reload();
				return true;
			}
			super.init();
			defaultCfg.timePattern = 'w+dd+m+yyyy+hh+ii+ss';
			defaultCfg.timeOffset = 4;
			defaultCfg.correctTime = 1;
			return false;
		}
		fixHTML(data, isForm) {
			const formEl = super.fixHTML(data, isForm);
			const els = $Q('.btn-group', formEl);
			for(let i = 0, len = els.length; i < len; ++i) {
				els[i].replaceWith($q('a', els[i]));
			}
			return formEl;
		}
	}
	ibDomains['syn-ch.ru'] = ibDomains['syn-ch.com'] = ibDomains['syn-ch.com.ua'] =
		ibDomains['syn-ch.org'] = Synch;

	class Warosu extends BaseBoard {
		constructor(prot, dm) {
			super(prot, dm);

			this.qDelForm = '.content';
			this.qForm = '.subreply';
			this.qPostImgInfo = 'span';
			this.qPostRef = '.js';
			this.qOPost = 'div[itemscope]';

			this.res = 'thread/';
		}
		get css() {
			return '.quoted-by { display: none !important; }';
		}
		getTNum(thr) {
			return +$q('div[itemscope]', thr).id.match(/\d+/);
		}
		fixHTMLHelper(str) {
			return str.replace(/\/post\/(\d+)"/g, '/#$1"');
		}
	}
	ibDomains['warosu.org'] = Warosu;

	const wLoc = deWindow.location;
	const prot = wLoc.protocol;
	let dm = localData?.dm;
	if(checkDomains) {
		if(!dm) {
			const ibKeys = Object.keys(ibDomains);
			let i = ibKeys.length;
			const host = wLoc.hostname.toLowerCase();
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
		dm = wLoc.hostname;
	}
	if(!dm || !checkEngines) {
		return null;
	}
	dm = dm.match(/(?:(?:[^.]+\.)(?=org\.|net\.|com\.))?[^.]+\.[^.]+$|^\d+\.\d+\.\d+\.\d+$|localhost/)[0];
	for(let i = ibEngines.length - 1; i >= 0; --i) {
		const [path, Ctor] = ibEngines[i];
		if($q(path, doc)) {
			return new Ctor(prot, dm);
		}
	}
	return null;
}
