/* ==[ Misc.js ]==============================================================================================
                                                MISCELLANEOUS
=========================================================================================================== */

// You can use Dollchan API listeners in Your external scripts and apps
// More info: https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/dollchan-api
class DollchanAPI {
	static init() {
		DollchanAPI.hasListeners = false;
		if(!('MessageChannel' in window)) {
			return;
		}
		const channel = new MessageChannel();
		DollchanAPI.port = channel.port1;
		DollchanAPI.port.onmessage = DollchanAPI._handleMessage;
		DollchanAPI.activeListeners = new Set();
		const port = channel.port2;
		doc.defaultView.addEventListener('message', ({ data }) => {
			if(data === 'de-request-api-message') {
				DollchanAPI.hasListeners = true;
				document.defaultView.postMessage('de-answer-api-message', '*', [port]);
			}
		});
	}
	static hasListener(name) {
		return DollchanAPI.hasListeners && DollchanAPI.activeListeners.has(name);
	}
	static notify(name, data) {
		if(DollchanAPI.hasListener(name)) {
			DollchanAPI.port.postMessage({ name, data });
		}
	}

	static _handleMessage({ data: arg }) {
		if(!arg || !arg.name) {
			return;
		}
		let rv = null;
		const { name, data } = arg;
		switch(arg.name.toLowerCase()) {
		case 'registerapi':
			if(data) {
				rv = {};
				for(let aName of data) {
					rv[aName] = DollchanAPI._register(aName.toLowerCase());
				}
			}
			break;
		}
		DollchanAPI.port.postMessage({ name, data: rv });
	}
	static _register(name) {
		switch(name) {
		case 'expandmedia':
		case 'filechange':
		case 'newpost':
		case 'submitform': break;
		default: return false;
		}
		DollchanAPI.activeListeners.add(name);
		return true;
	}
}

// Checking for Dollchan updates from github
function checkForUpdates(isManual, lastUpdateTime) {
	if(!isManual) {
		if(Date.now() - +lastUpdateTime < [1, 2, 7, 14, 30][Cfg.scrUpdIntrv] * 1000 * 60 * 60 * 24) {
			return Promise.reject();
		}
	}
	return $ajax(
		gitRaw + 'Dollchan_Extension_Tools.meta.js', { 'Content-Type': 'text/plain' }, false
	).then(xhr => {
		const m = xhr.responseText.match(/@version\s+([0-9.]+)/);
		const remoteVer = m && m[1] ? m[1].split('.') : null;
		if(remoteVer) {
			const currentVer = version.split('.');
			const src = gitRaw + (nav.isESNext ? 'src/' : '') + 'Dollchan_Extension_Tools.' +
				(nav.isESNext ? 'es6.' : '') + 'user.js';
			saveCfgObj('lastUpd', Date.now());
			for(let i = 0, len = Math.max(currentVer.length, remoteVer.length); i < len; ++i) {
				if((+remoteVer[i] || 0) > (+currentVer[i] || 0)) {
					return '<a style="color: blue; font-weight: bold;" href="' + src + '">' +
						Lng.updAvail[lang] + '</a>';
				} else if((+remoteVer[i] || 0) < (+currentVer[i] || 0)) {
					break;
				}
			}
			if(isManual) {
				return Lng.haveLatest[lang];
			}
		}
		return Promise.reject();
	}, () => !isManual ? Promise.reject() :
		`<div style="color: red; font-weigth: bold;">${ Lng.noConnect[lang] }</div>`
	);
}

function initPage() {
	if(aib.t) {
		if(Cfg.rePageTitle) {
			doc.title = '/' + aib.b + ' - ' + Thread.first.op.title;
		}
		if(!localData) {
			Cfg.stats.view++;
			saveCfgObj(aib.dm, Cfg);
			Thread.first.el.insertAdjacentHTML('afterend', '<div class="de-thread-buttons">' +
				'<span class="de-thread-updater">[<a class="de-abtn" href="#"></a>' +
				'<span id="de-updater-count" style="display: none;"></span>]</span>' +
				(aib.mak ? '[<a class="de-abtn" href="#" onclick="UnbanShow();">Реквест разбана</a>]' : '') +
				'</div>');
		}
	} else {
		navPanel.init();
	}
	if(!localData) {
		updater = initThreadUpdater(doc.title, aib.t && Cfg.ajaxUpdThr && !aib.isArchived);
		if(aib.t) {
			Thread.first.el.nextSibling.firstChild.firstElementChild
				.addEventListener('click', updater.forceLoad);
		}
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
	setTimeout(function() {
		const val = +sesStorage['de-scroll-' + aib.b + aib.t];
		if(val) {
			scrollTo(0, val);
			sesStorage.removeItem('de-scroll-' + aib.b + aib.t);
		} else {
			let post, num;
			const { hash } = window.location;
			if(hash && (num = hash.match(/#[ip]?(\d+)$/)) &&
				(num = +num[1]) && (post = pByNum.get(num)) && !post.isOp
			) {
				post.selectAndScrollTo();
			}
		}
	}, 0);
}
