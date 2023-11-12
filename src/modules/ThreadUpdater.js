/* ==[ ThreadUpdater.js ]=====================================================================================
                                                THREAD UPDATER
=========================================================================================================== */

function initThreadUpdater(title, enableUpdate) {
	let focusLoadTime;
	let disabledByUser = true;
	let enabled = false;
	let repliesToYou = new Set();
	let lastECode = 200;
	let newPosts = 0;
	let paused = false;
	let sendError = false;
	const storageName = `de-last-postscount-${ aib.b }-${ aib.t }`;

	const audio = {
		enabled  : false,
		repeatMS : 0,
		disableAudio() {
			this.stopAudio();
			this.enabled = false;
			const btn = $id('de-panel-audio-on');
			if(btn) {
				btn.id = 'de-panel-audio-off';
			}
		},
		playAudio() {
			this.stopAudio();
			if(this.repeatMS === 0) {
				this._el.play();
				return;
			}
			this._playInterval = setInterval(() => this._el.play(), this.repeatMS);
		},
		stopAudio() {
			if(this._playInterval) {
				clearInterval(this._playInterval);
				this._playInterval = null;
			}
		},

		get _el() {
			const value = doc.createElement('audio');
			value.setAttribute('preload', 'auto');
			value.src = gitRaw + 'signal.ogg';
			Object.defineProperty(this, '_el', { value });
			return value;
		}
	};

	const counter = {
		count(delayMS, useCounter, callback) {
			if(!this._enabled || !useCounter) {
				this._countingTO = setTimeout(() => {
					this._countingTO = null;
					callback();
				}, delayMS);
				return;
			}
			let seconds = delayMS / 1e3;
			this._set(seconds);
			this._countingIV = setInterval(() => {
				seconds--;
				if(seconds === 0) {
					this._stopCounter();
					callback();
				} else {
					this._set(seconds);
				}
			}, 1e3);
		},
		disableCounter() {
			this._enabled = false;
			this._stopCounter();
			$hide(this._el);
		},
		enableCounter() {
			this._enabled = true;
			$show(this._el);
		},
		setWait() {
			this._stopCounter();
			if(this._enabled) {
				this._el.innerHTML = '<svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg>';
			}
		},

		_countingTO : null,
		_countingIV : null,
		_enabled    : false,
		get _el() {
			const value = $id('de-updater-count');
			Object.defineProperty(this, '_el', { value });
			return value;
		},
		_set(seconds) {
			this._el.innerHTML = seconds;
		},
		_stopCounter() {
			if(this._countingIV) {
				clearInterval(this._countingIV);
				this._countingIV = null;
			}
			if(this._countingTO) {
				clearTimeout(this._countingTO);
				this._countingTO = null;
			}
		}
	};

	const favicon = {
		get canBlink() {
			return Cfg.favIcoBlink && !!this.originalIcon;
		},
		get originalIcon() {
			return this._iconEl ? this._iconEl.href : null;
		},
		initIcons() {
			if(this._isInited) {
				return;
			}
			this._isInited = true;
			const icon = new Image();
			icon.onload = e => {
				try {
					this._initIconsHelper(e.target);
				} catch(err) {
					console.warn('Icon error:', err);
				}
			};
			if(aib._4chan) {
				// Due to CORS we cannot apply href to icon.src directly
				$ajax(this._iconEl.href, { responseType: 'blob' }, true).then(xhr => {
					icon.src = 'response' in xhr ?
						deWindow.URL.createObjectURL(xhr.response) : '/favicon.ico';
				});
				return;
			}
			icon.src = this._iconEl.href;
		},
		startBlink(isError) {
			const iconUrl = !this._hasIcons ? this._emptyIcon :
				isError ? this._iconError :
				repliesToYou.size ? this._getIconYou(newPosts) : this._getIconNew(newPosts);
			if(this._blinkInterv) {
				if(this._currentIcon === iconUrl) {
					return;
				}
				clearInterval(this._blinkInterv);
			}
			this._currentIcon = iconUrl;
			this._blinkInterv = setInterval(() => {
				this._isOrigIcon = !this._isOrigIcon;
				this._setIcon(this._isOrigIcon ? this.originalIcon : this._currentIcon);
			}, this._blinkMS);
		},
		stopBlink() {
			if(this._blinkInterv) {
				clearInterval(this._blinkInterv);
				this._blinkInterv = null;
			}
			if(!this._isOrigIcon) {
				this._setIcon(this.originalIcon);
				this._isOrigIcon = true;
			}
		},
		updateIcon(isError) {
			if(!isError && !newPosts) {
				this._setIcon(this.originalIcon);
			} else if(this._hasIcons) {
				this._setIcon(isError ? this._iconError :
					repliesToYou.size ? this._getIconYou(newPosts) : this._getIconNew(newPosts));
			}
		},

		_blinkInterv : null,
		_blinkMS     : 800,
		_currentIcon : null,
		_emptyIcon   : 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
		_getIconNew  : () => null,
		_getIconYou  : () => null,
		_hasIcons    : false,
		_iconError   : null,
		_iconsNew    : [],
		_iconsYou    : [],
		_isInited    : false,
		_isOrigIcon  : true,
		get _iconEl() {
			const el = $q('link[rel="shortcut icon"]', doc.head) ||
				$bEnd(doc.head, '<link href="/favicon.ico" rel="shortcut icon"/>');
			Object.defineProperties(this, {
				_iconEl      : { value: el, writable: true },
				originalIcon : { value: el.href }
			});
			return el;
		},
		_drawCanvCircle(ctx, strokeColor, fillColor, scale) {
			ctx.beginPath();
			ctx.arc(10.5 * scale, 10.5 * scale, 5 * scale, 0, 2 * Math.PI);
			ctx.fillStyle = fillColor;
			ctx.fill();
			ctx.lineWidth = 1;
			ctx.strokeStyle = strokeColor;
			ctx.stroke();
		},
		_drawCanvLines(ctx, line1, line2, color, width, scale) {
			ctx.beginPath();
			ctx.strokeStyle = color;
			ctx.lineWidth = width * scale;
			ctx.moveTo(line1[0] * scale, line1[1] * scale);
			ctx.lineTo(line1[2] * scale, line1[3] * scale);
			ctx.moveTo(line2[0] * scale, line2[1] * scale);
			ctx.lineTo(line2[2] * scale, line2[3] * scale);
			ctx.stroke();
		},
		_drawIconsNewYou(ctx, canvas, id, iconCircle, scale) {
			ctx.putImageData(iconCircle, 0, 0);
			ctx.fillStyle = '#fff';
			if(id) {
				ctx.font = `bold ${ 12 * scale }px Arial`;
				ctx.fillText(id, 7 * scale, 15 * scale);
			} else {
				ctx.fillRect(6 * scale, 9 * scale, 2 * scale, 3 * scale);
				ctx.fillRect(9.5 * scale, 9 * scale, 2 * scale, 3 * scale);
				ctx.fillRect(13 * scale, 9 * scale, 2 * scale, 3 * scale);
			}
			return canvas.toDataURL('image/png');
		},
		_initIconsHelper(icon) {
			const canvas = doc.createElement('canvas');
			const ctx = canvas.getContext('2d');
			const wh = Math.max(icon.naturalHeight, 16 * (deWindow.devicePixelRatio || 1));
			const scale = wh / 16;
			canvas.width = canvas.height = wh;
			ctx.drawImage(icon, 0, 0, wh, wh);
			const original = ctx.getImageData(0, 0, wh, wh);
			// Error (red cross)
			this._drawCanvLines(ctx, [15, 15, 7, 7], [7, 15, 15, 7], '#780000', 3, scale);
			this._drawCanvLines(ctx, [14.5, 14.5, 7.5, 7.5], [7.5, 14.5, 14.5, 7.5], '#fa2020', 1.5, scale);
			this._iconError = canvas.toDataURL('image/png');
			// New posts (green circle)
			ctx.putImageData(original, 0, 0);
			this._drawCanvCircle(ctx, '#174f1d', '#00a000', scale);
			const iconNewCircle = ctx.getImageData(0, 0, wh, wh);
			// Replies to you (blue circle)
			ctx.putImageData(original, 0, 0);
			this._drawCanvCircle(ctx, '#122091', '#1b6df5', scale);
			const iconYouCircle = ctx.getImageData(0, 0, wh, wh);
			this._getIconNew = newPosts => {
				const id = newPosts < 10 ? newPosts : 0;
				return this._iconsNew[id] || (this._iconsNew[id] =
					this._drawIconsNewYou(ctx, canvas, id, iconNewCircle, scale));
			};
			this._getIconYou = newPosts => {
				const id = newPosts < 10 ? newPosts : 0;
				return this._iconsYou[id] || (this._iconsYou[id] =
					this._drawIconsNewYou(ctx, canvas, id, iconYouCircle, scale));
			};
			this._hasIcons = true;
		},
		_setIcon(iconUrl) {
			this._iconEl.remove();
			this._iconEl = $aBegin(doc.head, `<link rel="shortcut icon" href="${ iconUrl }">`);
		}
	};

	const notification = {
		get canShow() {
			return Cfg.desktNotif && this._granted;
		},
		async checkPermission() {
			if(Cfg.desktNotif && ('permission' in Notification)) {
				switch(Notification.permission.toLowerCase()) {
				case 'default': this._requestPermission(); break;
				case 'denied': await CfgSaver.save('desktNotif', 0);
				}
			}
		},
		closeNotif() {
			if(this._notifEl) {
				this._notifEl.close();
				this._notifEl = null;
			}
		},
		showNotif() {
			const lngQuantity = num => {
				const new10 = num % 10;
				return lang === 1 ? +(num !== 1) :
					new10 > 4 || new10 === 0 || (((num % 100) / 10) | 0) === 1 ? 2 :
					new10 === 1 ? 0 : 1;
			};
			const post = Thread.first.last;
			const toYou = repliesToYou.size;
			const notif = new Notification(`${ aib.domain }/${ aib.b }/${ aib.t }: ${ newPosts } ${
				Lng.newPost[lang][lngQuantity(newPosts)] }. ${
				toYou ? `${ toYou } ${ Lng.youReplies[lang][lngQuantity(toYou)] }.` : '' }`,
			{
				body : Lng.latestPost[lang] + ':\n' + post.text.substring(0, 250).replace(/\s+/g, ' '),
				icon : post.images.firstAttach ? post.images.firstAttach.src : favicon.originalIcon,
				tag  : aib.domain + aib.b + aib.t
			});
			notif.onshow = () => setTimeout(() => notif === this._notifEl && this.closeNotif(), 12e3);
			notif.onclick = () => deWindow.focus();
			notif.onerror = () => {
				deWindow.focus();
				this._requestPermission();
			};
			this._notifEl = notif;
		},

		_granted : true,
		_notifEl : null,
		_requestPermission() {
			this._granted = false;
			Notification.requestPermission(async state => {
				if(state.toLowerCase() === 'denied') {
					await CfgSaver.save('desktNotif', 0);
				} else {
					this._granted = true;
				}
			});
		}
	};

	const updMachine = {
		start(needSleep = false, loadOnce = false) {
			if(this._state !== -1) {
				this.stopUpdater(false);
			}
			this._state = 0;
			this._loadOnce = loadOnce;
			this._delay = this._initDelay = Cfg.updThrDelay * 1e3;
			if(!loadOnce) {
				this._setUpdateStatus('on');
			}
			this._makeStep(needSleep);
		},
		stopUpdater(updateStatus = true) {
			if(this._state !== -1) {
				this._state = -1;
				if(this._loadPromise) {
					this._loadPromise.cancelPromise();
					this._loadPromise = null;
				}
				counter.setWait();
				if(updateStatus) {
					this._setUpdateStatus('off');
				}
			}
		},

		_delay       : 0,
		_initDelay   : 0,
		_loadOnce    : false,
		_loadPromise : null,
		_seconds     : 0,
		_state       : -1,
		get _panelButton() {
			const value = $q('button[id^="de-panel-upd"]');
			if(value) {
				Object.defineProperty(this, '_panelButton', { value });
			}
			return value;
		},
		_handleNewPosts(lPosts, err) {
			if(err instanceof CancelError) {
				return;
			}
			infoLoadErrors(err, false);
			const eCode = err instanceof AjaxError ? err.code : 0;
			if(eCode !== 200 && eCode !== 304) {
				if(doc.hidden && favicon.canBlink) {
					favicon.startBlink(true);
				}
				if(eCode === -1 || (eCode === 404 && lastECode === 404)) {
					Thread.removeSavedData(aib.b, aib.t); // Not working yet
					updateTitle(eCode);
					disableUpdater();
				} else {
					this._setUpdateStatus('warn');
					updateTitle(eCode);
					this._makeStep();
				}
				lastECode = eCode;
				// Updating Favorites: failed thread loading
				updateFavorites(aib.t, getErrorMessage(err), 'error');
				return;
			}
			if(lastECode !== 200) {
				favicon.stopBlink();
				this._setUpdateStatus('on');
				updateTitle(eCode);
			}
			lastECode = eCode;
			if(doc.hidden) {
				if(lPosts !== 0) {
					newPosts += lPosts;
					updateTitle();
					if(favicon.canBlink) {
						favicon.startBlink(false);
					}
					if(notification.canShow) {
						notification.showNotif();
					}
					if(audio.enabled) {
						audio.playAudio();
					}
					sesStorage[storageName] = Thread.first.postsCount;
					this._delay = this._initDelay;
				} else if(this._delay !== 12e4) {
					this._delay = Math.min(this._delay + this._initDelay, 12e4);
				}
			}
			this._makeStep();
		},
		_makeStep(needSleep = true) {
			while(true) {
				switch(this._state) {
				case 0:
					if(needSleep) {
						this._state = 1;
						counter.count(this._delay, !doc.hidden, () => this._makeStep());
						return;
					}
					/* falls through */
				case 1:
					counter.setWait();
					this._state = 2;
					this._loadPromise = Thread.first.loadNewPosts().then(
						({ newCount, locked }) =>
							this._handleNewPosts(newCount, locked ? AjaxError.Locked : AjaxError.Success),
						err => this._handleNewPosts(0, err));
					return;
				case 2:
					this._loadPromise = null;
					if(this._loadOnce) {
						this._state = -1;
						return;
					}
					this._state = 0;
					break;
				default:
					console.error('Invalid thread updater state:', this._state, new Error().stack);
					return;
				}
			}
		},
		_setUpdateStatus(status) {
			if(this._panelButton) {
				this._panelButton.id = 'de-panel-upd-' + status;
				this._panelButton.title = Lng.panelBtn[`upd-${ status === 'off' ? 'off' : 'on' }`][lang];
				if(nav.isPresto) {
					this._panelButton.innerHTML =
						'<svg class="de-panel-svg"><use xlink:href="#de-symbol-panel-upd"/></svg>';
				}
			}
		}
	};

	function enableUpdater() {
		enabled = true;
		disabledByUser = paused = false;
		repliesToYou = new Set();
		newPosts = 0;
		focusLoadTime = -1e4;
		notification.checkPermission();
		if(Cfg.updCount) {
			counter.enableCounter();
		}
		favicon.initIcons();
	}

	function disableUpdater() {
		if(enabled) {
			audio.disableAudio();
			counter.disableCounter();
			updMachine.stopUpdater();
			enabled = false;
		}
	}

	function forceLoadPosts() {
		if(enabled && paused) {
			return;
		}
		if(!enabled && !disabledByUser) {
			enableUpdater();
		}
		updMachine.start(false, !enabled);
	}

	function updateTitle(eCode = lastECode) {
		doc.title = (sendError === true ? `{${ Lng.error[lang] }} ` : '') +
			(eCode <= 0 || eCode === 200 ? '' : `{${ eCode }} `) +
			(newPosts ? `[${ newPosts }] ` : '') + title;
		favicon.updateIcon(eCode !== 200 && eCode !== 304);
	}

	doc.addEventListener('visibilitychange', e => {
		if(!doc.hidden) {
			const focusTime = e.timeStamp;
			favicon.stopBlink();
			audio.stopAudio();
			notification.closeNotif();
			newPosts = 0;
			repliesToYou = new Set();
			sendError = false;
			setTimeout(() => {
				updateTitle();
				if(enabled && focusTime - focusLoadTime > 1e4) {
					focusLoadTime = focusTime;
					forceLoadPosts();
				}
			}, 200);
			if(aib.t) {
				const thr = Thread.first;
				// Updating Favorites: visiting a previously inactive page
				updateFavorites(thr.op.num, [thr.postsCount, 0, 0, thr.last.num], 'update');
			}
		} else if(Thread.first) {
			Post.clearMarks();
		}
	});
	if(enableUpdate) {
		enableUpdater();
		updMachine.start(true);
	}

	return {
		get getRepliesToYou() {
			return repliesToYou.size;
		},
		addReplyToYou(pNum) {
			repliesToYou.add(pNum);
		},
		continueUpdater(needSleep = false) {
			if(enabled && paused) {
				updMachine.start(needSleep);
				paused = false;
			}
		},
		disableUpdater() {
			disabledByUser = true;
			disableUpdater();
		},
		enableUpdater() {
			if(!enabled) {
				enableUpdater();
				updMachine.start();
			}
		},
		forceLoad(e) {
			if(e) {
				e.preventDefault();
			}
			Post.clearMarks();
			if(enabled && paused) {
				return;
			}
			$popup('newposts', Lng.loading[lang], true);
			forceLoadPosts();
		},
		pauseUpdater() {
			if(enabled && !paused) {
				updMachine.stopUpdater();
				paused = true;
			}
		},
		toggle() {
			if(enabled) {
				this.disableUpdater();
			} else {
				this.enableUpdater();
			}
		},
		toggleAudio(repeatMS) {
			if(audio.enabled) {
				audio.stopAudio();
				return (audio.enabled = false);
			}
			audio.repeatMS = repeatMS;
			return (audio.enabled = true);
		},
		toggleCounter(enableCnt) {
			if(enableCnt) {
				counter.enableCounter();
				counter.setWait();
			} else {
				counter.disableCounter();
			}
			forceLoadPosts();
		},
		sendErrNotif() {
			if(Cfg.sendErrNotif && doc.hidden) {
				sendError = true;
				updateTitle();
			}
		}
	};
}
