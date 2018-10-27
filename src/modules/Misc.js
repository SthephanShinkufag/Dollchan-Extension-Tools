/* ==[ Misc.js ]==============================================================================================
                                                MISCELLANEOUS
=========================================================================================================== */

// You can use Dollchan API listeners in Your external scripts and apps
// More info: https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/dollchan-api
const DollchanAPI = {
	initAPI() {
		this.hasListeners = false;
		if(!('MessageChannel' in window)) {
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
		if(!arg || !arg.name) {
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

// Checking for Dollchan updates from github
function checkForUpdates(isManual, lastUpdateTime) {
	if(!isManual) {
		if(Date.now() - +lastUpdateTime < [0, 1, 2, 7, 14, 30][Cfg.updDollchan] * 1e3 * 60 * 60 * 24) {
			return Promise.reject();
		}
	}
	return $ajax(
		gitRaw + 'src/modules/Wrap.js', { 'Content-Type': 'text/plain' }, false
	).then(({ responseText }) => {
		const v = responseText.match(/const version = '([0-9.]+)';/);
		const remoteVer = v && v[1] ? v[1].split('.') : null;
		if(remoteVer) {
			const currentVer = version.split('.');
			const src = `${ gitRaw }${ nav.isESNext ? 'src/' : '' }Dollchan_Extension_Tools.${
				nav.isESNext ? 'es6.' : '' }user.js`;
			saveCfgObj('lastUpd', Date.now());
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
		}
		return Promise.reject();
	}, () => !isManual ?
		Promise.reject() : `<div style="color: red; font-weigth: bold;">${ Lng.noConnect[lang] }</div>`
	);
}

function initPage() {
	if(aib.t) {
		if(Cfg.rePageTitle) {
			doc.title = `/${ aib.b } - ${ Thread.first.op.title }`;
		}
		if(!localData) {
			Cfg.stats.view++;
			saveCfgObj(aib.dm, Cfg);
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
		if(doc.hidden || needScroll) {
			scrollTo(0, 1);
		}
		return;
	}
	if(!needScroll) {
		return;
	}
	setTimeout(() => {
		const id = 'de-scroll-' + aib.b + (aib.t || '');
		const val = +sesStorage[id];
		if(val) {
			scrollTo(0, val);
			sesStorage.removeItem(id);
			return;
		}
		let post, num;
		const { hash } = window.location;
		if(hash && (num = hash.match(/#[ip]?(\d+)$/)) &&
			(num = +num[1]) && (post = pByNum.get(num)) && !post.isOp
		) {
			post.selectAndScrollTo();
		}
	}, 0);
}
