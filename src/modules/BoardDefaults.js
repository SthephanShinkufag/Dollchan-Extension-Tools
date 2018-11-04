/* ==[ BoardDefaults.js ]=====================================================================================
                                             IMAGEBOARD DEFAULTS
=========================================================================================================== */

class BaseBoard {
	constructor(prot, dm) {
		// Query paths
		this.cReply = 'reply';
		this.qBan = null;
		this.qClosed = null;
		this.qDelBut = 'input[type="submit"]'; // Differs _4chanOrg
		this.qDelPassw = 'input[type="password"], input[name="password"]'; // Differs Vichan
		this.qDForm = '#delform, form[name="delform"]';
		this.qError = 'h1, h2, font[size="5"]';
		this.qForm = '#postform';
		this.qFormFile = 'tr input[type="file"]'; // Differs Makaba
		this.qFormPassw = 'tr input[type="password"]';
		this.qFormRedir = 'input[name="postredir"][value="1"]';
		this.qFormRules = '.rules, #rules';
		this.qFormSpoiler = 'input[type="checkbox"][name="spoiler"]'; // Differs Ernstchan
		this.qFormSubm = 'tr input[type="submit"]';
		this.qFormTd = 'td';
		this.qFormTr = 'tr';
		this.qFormTxta = 'tr:not([style*="none"]) textarea:not([style*="display:none"])'; // Differs Makaba
		this.qImgInfo = '.filesize';
		this.qOmitted = '.omittedposts';
		this.qOPost = '.oppost';
		this.qPages = 'table[border="1"] > tbody > tr > td:nth-child(2) > a:last-of-type';
		this.qPostHeader = '.de-post-btns';
		this.qPostImg = '.thumb, .ca_thumb, img[src*="thumb"], img[src*="/spoiler"], img[src^="blob:"]';
		this.qPostMsg = 'blockquote';
		this.qPostName = '.postername, .commentpostername';
		this.qPostSubj = '.filetitle';
		this.qPostTrip = '.postertrip';
		this.qPostRef = '.reflink';
		this.qRPost = '.reply';
		this.qTrunc = '.abbrev, .abbr, .shortened';

		this.anchor = '#';
		this.b = '';
		this.dm = dm;
		this.docExt = null;
		this.firstPage = 0;
		this.formParent = 'parent';
		this.hasAltCaptcha = false;
		this.hasCatalog = false;
		this.hasOPNum = false;
		this.hasPicWrap = false;
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

		this._qOPostEnd = 'form > table, div > table, div[id^="repl"]';
	}
	get qFormMail() {
		return nav.cssMatches('tr:not([style*="none"]) input:not([type="hidden"]):not([style*="none"])',
			'[name="email"]', '[name="em"]', '[name="field2"]', '[name="sage"]');
	}
	get qFormName() {
		return nav.cssMatches('tr:not([style*="none"]) input:not([type="hidden"]):not([style*="none"])',
			'[name="name"]', '[name="field1"]');
	}
	get qFormSubj() {
		return nav.cssMatches('tr:not([style*="none"]) input:not([type="hidden"]):not([style*="none"])',
			'[name="subject"]', '[name="field3"]');
	}
	get qImgNameLink() {
		const value = nav.cssMatches(this.qImgInfo.split(', ').join(' a, ') + ' a',
			'[href$=".jpg"]', '[href$=".jpeg"]', '[href$=".png"]', '[href$=".gif"]',
			'[href$=".webm"]', '[href$=".mp4"]', '[href$=".ogv"]', '[href$=".apng"]', ', [href^="blob:"]');
		Object.defineProperty(this, 'qImgNameLink', { value });
		return value;
	}
	get qMsgImgLink() { // Sets here only
		const value = nav.cssMatches(this.qPostMsg.split(', ').join(' a, ') + ' a',
			'[href$=".jpg"]', '[href$=".jpeg"]', '[href$=".png"]', '[href$=".gif"]');
		Object.defineProperty(this, 'qMsgImgLink', { value });
		return value;
	}
	get qThread() {
		const value = $q('.thread') ? '.thread' : '[id^="thread"]';
		Object.defineProperty(this, 'qThread', { value });
		return value;
	}
	get capLang() { // Differs _410chanOrg
		return this.ru ? 2 : 1;
	}
	get catalogUrl() { // Differs Iichan
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
	get fixDeadLinks() { // Differs _4chanOrg
		return null;
	}
	get fixHTMLHelper() {
		return null;
	}
	get fixFileInputs() {
		return null;
	}
	get getImgRedirectSrc() {
		return null;
	}
	get getSubmitData() {
		return null;
	}
	get initCaptcha() {
		return null;
	}
	get isArchived() {
		return false;
	}
	get lastPage() { // Differs Makaba
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
	get observeContent() { // Differs Makaba
		return null;
	}
	get reCrossLinks() { // Sets here only
		const value = new RegExp(`>https?:\\/\\/[^\\/]*${ this.dm }\\/([a-z0-9]+)\\/${
			quoteReg(this.res) }(\\d+)(?:[^#<]+)?(?:#i?(\\d+))?<`, 'g');
		Object.defineProperty(this, 'reCrossLinks', { value });
		return value;
	}
	get sendHTML5Post() { // Differs LynxChan
		return null;
	}
	get updateCaptcha() {
		return null;
	}
	disableRedirection(el) { // Differs Dobrochan
		$hide($qParent(el, aib.qFormTr));
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
			str = str.replace(aib.reCrossLinks, (_, b, tNum, pNum) => `>&gt;&gt;/${ b }/${ pNum || tNum }<`);
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
				$del(el);
			}
			if(Cfg.addVimeo && (m = src.match(Videos.vimReg))) {
				videos.push([isPost ? data : this.getPostOfEl(el), m, false]);
				$del(el);
			}
		}
		return videos;
	}
	getBanId(postEl) { // Differs Makaba
		return this.qBan && $q(this.qBan, postEl) ? 1 : 0;
	}
	getCapParent(el) { // Differs LynxChan
		return $qParent(el, this.qFormTr);
	}
	getCaptchaSrc(src, tNum) {
		const tmp = src.replace(/pl$/, 'pl?key=mainpage&amp;dummy=')
			.replace(/dummy=[\d.]*/, 'dummy=' + Math.random());
		return tNum ? tmp.replace(/mainpage|res\d+/, 'res' + tNum) : tmp.replace(/res\d+/, 'mainpage');
	}
	getImgInfo(wrap) {
		const el = $q(this.qImgInfo, wrap);
		return el ? el.textContent : '';
	}
	getImgRealName(wrap) {
		const el = $q(this.qImgNameLink, wrap);
		return el ? el.title || el.textContent : '';
	}
	getImgSrcLink(img) {
		return $parent(img, 'A');
	}
	getImgWrap(img) {
		return ($parent(img, 'A') || img).parentNode;
	}
	getJsonApiUrl() {}
	getOmitted(el) {
		return +(el && (el.textContent || '').match(/\d+/)) + 1;
	}
	getOp(thr) { // Differs Arhivach
		let op = localData ? $q('div[de-oppost]', thr) : $q(this.qOPost, thr);
		if(op) {
			return op;
		}
		op = thr.ownerDocument.createElement('div');
		op.setAttribute('de-oppost', '');
		let el;
		const opEnd = $q(this._qOPostEnd, thr);
		while((el = thr.firstChild) && (el !== opEnd)) {
			op.appendChild(el);
		}
		if(thr.hasChildNodes()) {
			thr.insertBefore(op, thr.firstChild);
		} else {
			thr.appendChild(op);
		}
		return op;
	}
	getPageUrl(b, p) {
		return fixBrd(b) + (p > 0 ? p + this.docExt : '');
	}
	getPNum(post) {
		return +post.id.match(/\d+/);
	}
	getPostElOfEl(el) {
		const sel = this.qRPost + ', [de-thread]';
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
			{ value: el.tagName === 'TD' ? (el, isOp) => isOp ? el : $parent(el, 'TABLE') : el => el });
		return this.getPostWrap(el, isOp);
	}
	getSage(post) {
		if($q('.sage', post)) {
			return true;
		}
		const el = $q('a[href^="mailto:"], a[href="sage"]', post);
		return !!el && /sage/i.test(el.href);
	}
	getThrUrl(b, tNum) { // Differs Arhivach
		return this.prot + '//' + this.host + fixBrd(b) + this.res + tNum + this.docExt;
	}
	getTNum(op) {
		return +$q('input[type="checkbox"]', op).value;
	}
	insertYtPlayer(msg, playerHtml) { // Differs Dobrochan
		return $bBegin(msg, playerHtml);
	}
	isAjaxStatusOK(status) {
		return status === 200 || status === 206;
	}
	parseURL() { // Sets here only
		const url = (deWindow.location.pathname || '').replace(/^\//, '');
		if(url.match(this.res)) { // We are in thread
			const temp = url.split(this.res);
			this.b = temp[0].replace(/\/$/, '');
			this.t = +temp[1].match(/^\d+/)[0];
			this.page = this.firstPage;
		} else { // We are on board
			const temp = url.match(/\/?(\d+)[^/]*?$/);
			this.page = temp && +temp[1] || this.firstPage;
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
