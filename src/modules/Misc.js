/* ==[ Misc.js ]==============================================================================================
                                                MISCELLANEOUS
=========================================================================================================== */

// You can use Dollchan API listeners in Your external scripts and apps
// More info: https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/dollchan-api
const DollchanAPI = {
	initAPI() {
		this.hasListeners = false;
		if(!('MessageChannel' in deWindow)) {
			return;
		}
		const channel = new MessageChannel();
		this.port = channel.port1;
		this.port.onmessage = this._handleMessage;
		this.activeListeners = new Set();
		const port = channel.port2;
		doc.defaultView.addEventListener('message', e => {
			if(e.data === 'de-request-api-message') {
				this.hasListeners = true;
				doc.defaultView.postMessage('de-answer-api-message', '*', [port]);
			}
		});
	},
	hasListener: name => DollchanAPI.hasListeners && DollchanAPI.activeListeners.has(name),
	notify(name, data) {
		if(this.hasListener(name)) {
			this.port.postMessage({ name, data });
		}
	},

	_handleMessage({ data: arg }) {
		if(!arg?.name) {
			return;
		}
		let rv = null;
		const { name, data } = arg;
		switch(name.toLowerCase()) {
		case 'registerapi':
			if(data) {
				rv = {};
				for(const aName of data) {
					rv[aName] = DollchanAPI._register(aName.toLowerCase());
				}
			}
			break;
		}
		DollchanAPI.port.postMessage({ name, data: rv });
	},
	_register(name) {
		switch(name) {
		case 'expandmedia':
		case 'filechange':
		case 'newpost':
		case 'submitform': break;
		default: return false;
		}
		this.activeListeners.add(name);
		return true;
	}
};

// Checking for Dollchan updates from Github
async function checkForUpdates(isManual, lastUpdateTime) {
	if(!isManual) {
		if(Date.now() - +lastUpdateTime < [0, 1, 2, 7, 14, 30][Cfg.updDollchan] * 1e3 * 60 * 60 * 24) {
			throw new Error('Itʼs not time for an update yet');
		}
	}
	let responseText;
	try {
		({ responseText } = await $ajax(gitRaw + 'src/modules/Wrap.js',
			{ 'Content-Type': 'text/plain' }, true));
	} catch(err) {
		if(isManual) {
			return `<div style="color: red; font-weigth: bold;">${ Lng.noConnect[lang] }</div>`;
		} else {
			throw new Error(Lng.noConnect[lang]);
		}
	}
	const v = responseText.match(/const version = '([0-9.]+)';/);
	const remoteVer = v?.[1]?.split('.');
	if(!remoteVer) {
		throw new Error('Canʼt get remote version');
	}
	const currentVer = version.split('.');
	const src = `${ gitRaw }${
		nav.isESNext ? 'src/Dollchan_Extension_Tools.es6' : 'Dollchan_Extension_Tools' }.user.js`;
	await CfgSaver.saveObj('lastUpd', () => Date.now());
	const link = `<a style="color: blue; font-weight: bold;" href="${ src }">`;
	const chLogLink = `<a target="_blank" href="${ gitWiki }${
		lang === 1 ? 'versions-en' : 'versions' }">\r\n${ Lng.changeLog[lang] }<a>`;
	for(let i = 0, len = Math.max(currentVer.length, remoteVer.length); i < len; ++i) {
		if((+remoteVer[i] || 0) > (+currentVer[i] || 0)) {
			return `${ link }${ Lng.updAvail[lang].replace('%s', v[1]) }</a>${ chLogLink }`;
		} else if((+remoteVer[i] || 0) < (+currentVer[i] || 0)) {
			break;
		}
	}
	if(isManual) {
		const c = responseText.match(/const commit = '([0-9abcdef]+)';/)[1];
		const vc = version + '.' + c;
		return c === commit ? Lng.haveLatestCommit[lang].replace('%s', vc) :
			`${ Lng.haveLatestStable[lang].replace('%s', version) }\r\n${
				Lng.newCommitsAvail[lang].replace('%s', `${ link }${ vc }</a>${ chLogLink }`) }`;
	}
	throw new Error();
}


// Donation message after Dollchan update
function showDonateMsg() {
	const item = (name, value) =>
		`<div>- <i>${ name }</i>: <i style="font: 14px monospace; color: green;">${ value }</i></div>`;
	$popup('donate', Lng.donateMsg[lang] + `:<br style="margin-bottom: 8px;"><!--
		--><div class="de-logo"><svg><use xlink:href="#de-symbol-panel-logo"/></svg></div><!--
		--><div style="display: inline-flex; flex-direction: column; gap: 6px; vertical-align: top;">` +
			item('BTC', '1BmVjk3DMPZeJUqBtqZRUCmL234Wc3Bc9Y') +
			item('BTC (SegWit)', 'bc1qleycjdph5v3g26ewy7x37n5a4kwegjgttpjwzw') +
			item('ETH (ERC20)', '0xffa96732ae8df25c34444c70c0d59c752a47aafa') +
			item('YooMoney RUB', '410012122418236') +
			item('Mastercard', '5375411208220306') +
			`<div>- <a href="https://send.monobank.ua/jar/A7Saf6YAaz" target="_blank">${
				Lng.donateOnline[lang] }</a></div>` +
		'</div>');
}

function initPage() {
	if(aib.t) {
		if(Cfg.rePageTitle && Thread.first) {
			doc.title = `/${ aib.b } - ${ Thread.first.op.title }`;
		}
		if(!localData) {
			Cfg.stats.view++;
			CfgSaver.saveObj(aib.domain, loadedCfg => {
				loadedCfg.stats.view++;
				return loadedCfg;
			});
		}
	} else {
		thrNavPanel.initThrNav();
	}
	if(!localData) {
		updater = initThreadUpdater(doc.title, aib.t && Cfg.ajaxUpdThr && !aib.isArchived);
	}
}

function scrollPage() {
	if(!aib.t && Cfg.scrollToTop) {
		scrollTo(0, 1);
		return;
	}
	setTimeout(() => {
		let post, num;
		const { hash } = deWindow.location;
		if(hash && (num = hash.match(/#[ip]?(\d+)$/)) &&
			(num = +num[1]) && (post = pByNum.get(num)) && !post.isOp
		) {
			post.selectAndScrollTo();
			return;
		}
		const id = 'de-scroll-' + aib.b + (aib.t || '');
		const val = +sesStorage[id];
		if(val && needScroll && Cfg.saveScroll) {
			scrollTo(0, val);
			sesStorage.removeItem(id);
		}
	}, 0);
}
