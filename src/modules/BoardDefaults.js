/* ==[ BoardDefaults.js ]=====================================================================================
                                             IMAGEBOARD DEFAULTS
=========================================================================================================== */

class BaseBoard {
	constructor(prot, dm) {
		// Imageboard-specific booleans
		this._02ch = false;
		this._4chan = false;
		this.dobrochan = false;
		this.kohlchan = false;
		this.makaba = false;

		// Query paths
		this.cReply = 'reply';
		this.qBan = null;
		this.qClosed = null;
		this.qDelBtn = 'input[type="submit"]';
		this.qDelForm = '#delform, form[name="delform"]';
		this.qDelPassw = 'input[type="password"], input[name="password"]';
		this.qError = 'h1, h2, font[size="5"]';
		this.qForm = '#postform';
		this.qFormFile = 'tr input[type="file"]';
		this.qFormPassw = 'tr input[type="password"]';
		this.qFormRedir = 'input[name="postredir"][value="1"]';
		this.qFormRules = '.rules, #rules';
		this.qFormSpoiler = 'input[type="checkbox"][name="spoiler"]'; // Ernstchan
		this.qFormSubm = 'tr input[type="submit"]';
		this.qFormTd = 'td';
		this.qFormTr = 'tr';
		this.qFormTxta = 'tr:not([style*="none"]) textarea:not([style*="display:none"])'; // Makaba
		this.qOmitted = '.omittedposts';
		this.qOPost = '.oppost';
		this.qOPostEnd = 'form > table, div > table, div[id^="repl"]';
		this.qPages = 'table[border="1"] > tbody > tr > td:nth-child(2) > a:last-of-type';
		this.qPost = '.reply';
		this.qPostHeader = '.de-post-btns';
		this.qPostImg = '.thumb, .ca_thumb, img[src*="thumb"], img[src*="/spoiler"], img[src^="blob:"]';
		this.qPostImgInfo = '.filesize';
		this.qPostMsg = 'blockquote';
		this.qPostName = '.postername, .commentpostername';
		this.qPostSubj = '.filetitle';
		this.qPostTrip = '.postertrip';
		this.qPostRef = '.reflink';
		this.qPostsParent = null;
		this.qTrunc = '.abbrev, .abbr, .shortened';

		// Other propertioes
		this.anchor = '#';
		this.b = '';
		this.dm = dm;
		this.docExt = null;
		this.firstPage = 0;
		this.formHeaders = false;
		this.formParent = 'parent';
		this.hasAltCaptcha = false;
		this.hasArchive = false;
		this.hasCatalog = false;
		this.hasOPNum = false;
		this.hasPicWrap = false;
		this.hasRefererErr = false;
		this.hasTextLinks = false;
		this.host = deWindow.location.hostname;
		this.JsonBuilder = null;
		this.jsonSubmit = false;
		this.markupBB = false;
		this.multiFile = false;
		this.page = 0;
		this.prot = prot;
		this.res = 'res/';
		this.ru = false;
		this.t = false;
		this.timePattern = 'w+dd+m+yyyy+hh+ii+ss';
	}
	get qFormMail() {
		return $match('tr:not([style*="none"]) input:not([type="hidden"]):not([style*="none"])',
			'[name="email"]', '[name="em"]', '[name="field2"]', '[name="sage"]');
	}
	get qFormName() {
		return $match('tr:not([style*="none"]) input:not([type="hidden"]):not([style*="none"])',
			'[name="name"]', '[name="field1"]');
	}
	get qFormSubj() {
		return $match('tr:not([style*="none"]) input:not([type="hidden"]):not([style*="none"])',
			'[name="subject"]', '[name="field3"]');
	}
	get qMsgImgLink() { // Sets here only
		const value = $match(this.qPostMsg.split(', ').join(' a, ') + ' a',
			'[href$=".jpg"]', '[href$=".jpeg"]', '[href$=".png"]', '[href$=".gif"]');
		Object.defineProperty(this, 'qMsgImgLink', { value });
		return value;
	}
	get qPostImgNameLink() {
		const value = $match(this.qPostImgInfo.split(', ').join(' a, ') + ' a',
			'[href$=".jpg"]', '[href$=".jpeg"]', '[href$=".png"]', '[href$=".gif"]', '[href$=".webm"]',
			'[href$=".webp"]', '[href$=".mp4"]', '[href$=".m4v"]', '[href$=".ogv"]', '[href$=".apng"]',
			', [href^="blob:"]');
		Object.defineProperty(this, 'qPostImgNameLink', { value });
		return value;
	}
	get qThread() {
		const value = $q('.thread') ? '.thread' : '[id^="thread"]';
		Object.defineProperty(this, 'qThread', { value });
		return value;
	}
	get captchaAfterSubmit() { // Kohlchan
		return null;
	}
	get captchaInit() {
		return null;
	}
	get captchaLang() { // _410chan
		return this.ru ? 2 : 1;
	}
	get captchaUpdate() {
		return null;
	}
	get catalogUrl() { // Iichan
		return `${ this.prot }//${ this.host }/${ this.b }/catalog.html`;
	}
	get changeReplyMode() {
		return null;
	}
	get css() {
		return '';
	}
	get deleteTruncMsg() {
		return null;
	}
	get fixDeadLinks() { // _4chan
		return null;
	}
	get fixHTMLHelper() {
		return null;
	}
	get fixFileInputs() {
		return null;
	}
	get fixKCUnixFilenames() { // Kohlchan
		return null;
	}
	get getImgRedirectSrc() { // Archived
		return null;
	}
	get getSubmitData() {
		return null;
	}
	get isArchived() {
		return false;
	}
	get lastPage() { // Makaba
		const el = $q(this.qPages);
		let value = el && +aProto.pop.call(el.textContent.match(/\d+/g) || []) || 0;
		if(this.page === value + 1) {
			value++;
		}
		Object.defineProperty(this, 'lastPage', { value });
		return value;
	}
	get markupTags() {
		return this.markupBB ? ['b', 'i', 'u', 's', 'spoiler', 'code'] : ['**', '*', '', '^H', '%%', '`'];
	}
	get observeContent() { // Makaba
		return null;
	}
	get reCrossLinks() { // Sets here only
		const value = new RegExp(`>https?:\\/\\/[^\\/]*${ this.dm }\\/([a-z0-9]+)\\/${
			escapeRegExp(this.res) }(\\d+)(?:[^#<]+)?(?:#i?(\\d+))?<`, 'g');
		Object.defineProperty(this, 'reCrossLinks', { value });
		return value;
	}
	get reportForm() {
		return null;
	}
	get sendHTML5Post() { // Lynxchan
		return null;
	}
	get stormWallFixAjax() { // Iichan
		return null;
	}
	get stormWallFixCaptcha() { // Iichan
		return null;
	}
	get stormWallFixSubmit() { // Iichan
		return null;
	}
	get stormWallHelper() { // Iichan
		return null;
	}
	disableRedirection(el) { // Dobrochan
		$hide(el.closest(aib.qFormTr));
		el.checked = true;
	}
	fixHTML(data, isForm = false) {
		if(!(dTime || Spells.reps || Cfg.crossLinks || Cfg.decodeLinks ||
			this.fixHTMLHelper || this.fixDeadLinks || this.hasTextLinks)
		) {
			return data;
		}
		let str;
		if(typeof data === 'string') {
			str = data;
		} else if(isForm) {
			data.id = 'de-dform-old';
			str = data.outerHTML;
		} else {
			str = data.innerHTML;
		}
		if(dTime) {
			str = dTime.fix(str);
		}
		if(this.fixHTMLHelper) {
			str = this.fixHTMLHelper(str);
		}
		if(this.fixDeadLinks) {
			str = this.fixDeadLinks(str);
		}
		if(this.hasTextLinks) {
			str = str.replace(/(^|>|\s|&gt;)(https*:\/\/[^"<>]*?)(<\/a>)?(?=$|<|\s)/ig,
				(x, a, b, c) => c ? x : `${ a }<a rel="noreferrer" href="${ b }">${ b }</a>`);
		}
		if(Spells.reps) {
			str = Spells.replace(str);
		}
		if(Cfg.crossLinks) {
			str = str.replace(aib.reCrossLinks,
				(_, board, tNum, pNum) => `>&gt;&gt;/${ board }/${ pNum || tNum }<`);
		}
		if(Cfg.decodeLinks) {
			str = str.replace(/>https?:\/\/[^<]+</ig, match => {
				try {
					return decodeURI(match);
				} catch(err) {}
				return match;
			});
		}
		if(typeof data === 'string') {
			return str;
		}
		if(isForm) {
			const newForm = $bBegin(data, str);
			$hide(data);
			deWindow.addEventListener('load', () => $del($id('de-dform-old')));
			return newForm;
		}
		data.innerHTML = str;
		return data;
	}
	fixVideo(isPost, data) {
		const videos = [];
		const els = $Q('embed, object, iframe', isPost ? data.el : data);
		for(let i = 0, len = els.length; i < len; ++i) {
			const el = els[i];
			const src = el.src || el.data;
			if(!src) {
				continue;
			}
			let m = src.match(Videos.ytReg);
			if(m) {
				videos.push([isPost ? data : this.getPostOfEl(el), m, true]);
				el.remove();
			}
			if(Cfg.addVimeo && (m = src.match(Videos.vimReg))) {
				videos.push([isPost ? data : this.getPostOfEl(el), m, false]);
				el.remove();
			}
		}
		return videos;
	}
	getAbsLink(url) { // Sets here only
		return (url[1] === '/' ? this.prot : url[0] === '/' ? this.prot + '//' + this.host : '') + url;
	}
	getBanId(postEl) { // Makaba
		return this.qBan && $q(this.qBan, postEl) ? 1 : 0;
	}
	getCapParent(el) {
		return el.closest(this.qFormTr);
	}
	getCaptchaSrc(src, tNum) {
		const temp = src.replace(/pl$/, 'pl?key=mainpage&amp;dummy=')
			.replace(/dummy=[\d.]*/, 'dummy=' + Math.random());
		return tNum ? temp.replace(/mainpage|res\d+/, 'res' + tNum) : temp.replace(/res\d+/, 'mainpage');
	}
	getImgInfo(wrap) {
		const el = $q(this.qPostImgInfo, wrap);
		return el ? el.textContent : '';
	}
	getImgRealName(wrap) {
		const el = $q(this.qPostImgNameLink, wrap);
		return el ? el.title || el.textContent : '';
	}
	getImgSrcLink(img) {
		return img.closest('a');
	}
	getImgWrap(img) {
		return (img.closest('a') || img).parentNode;
	}
	getJsonApiUrl() {}
	getOmitted(el) {
		return +(el && (el.textContent || '').match(/\d+/)) + 1;
	}
	getOp(thr) { // Arhivach
		let op = localData ? $q('.de-oppost', thr) : $q(this.qOPost, thr);
		if(op) {
			return op;
		}
		op = thr.ownerDocument.createElement('div');
		op.classList.add('de-oppost');
		let el;
		const opEnd = $q(this.qOPostEnd, thr);
		while((el = thr.firstChild) && (el !== opEnd)) {
			op.append(el);
		}
		thr.prepend(op);
		return op;
	}
	getPageUrl(board, page) {
		return fixBrd(board) + (page > 0 ? page + this.docExt : '');
	}
	getPNum(post) {
		return +post.id.match(/\d+/);
	}
	getPostElOfEl(el) {
		const sel = this.qPost + ', [de-thread], .de-pview';
		while(el && !nav.matchesSelector(el, sel)) {
			el = el.parentElement;
		}
		return el;
	}
	getPostOfEl(el) { // Sets here only
		return pByEl.get(this.getPostElOfEl(el));
	}
	getPostWrap(el, isOp) {
		if(isOp) {
			return el;
		}
		Object.defineProperty(this, 'getPostWrap',
			{ value: el.tagName === 'TD' ? (el, isOp) => isOp ? el : el.closest('table') : el => el });
		return this.getPostWrap(el, isOp);
	}
	getSage(post) {
		if($q('.sage', post)) {
			return true;
		}
		const el = $q('a[href^="mailto:"], a[href="sage"]', post);
		return !!el && /sage/i.test(el.href);
	}
	getThrUrl(board, tNum) { // Arhivach
		return this.prot + '//' + this.host + fixBrd(board) + this.res + tNum + this.docExt;
	}
	getTNum(thr) {
		return +$q('input[type="checkbox"]', thr).value;
	}
	insertYtPlayer(msg, playerHtml) { // Dobrochan
		return $bBegin(msg, playerHtml);
	}
	isAjaxStatusOK(status) {
		return status === 200 || status === 206;
	}
	isIgnoreError(txt) { // Lynxchan
		return /successful|uploaded|updating|post deleted|post created|обновл|удален[о.]/i.test(txt);
	}
	parseURL() {
		const url = (deWindow.location.pathname || '').replace(/^[/]+/, '').replace(/[/]+/g, '/');
		if(url.match(this.res)) { // We are in thread
			const temp = url.split(this.res);
			this.b = temp[0].replace(/\/$/, '');
			this.t = +temp[1].match(/^[^\d]?\d+/)[0];
			this.page = this.firstPage;
		} else { // We are on board
			const temp = url.match(/\/?(\d+)[^/]*?$/);
			this.page = +temp?.[1] || this.firstPage;
			this.b = url.replace(temp && this.page ? temp[0] : /\/(?:[^/]+\.[a-z]+)?$/, '');
		}
		if(this.docExt === null) {
			this.docExt = (url.match(/\.[a-z]+$/) || ['.html'])[0];
		}
	}
	updateSubmitBtn(el) {
		el.value = Lng.reply[lang];
	}
}
