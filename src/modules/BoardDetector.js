/* ==[ BoardDetector.js ]=====================================================================================
                                             IMAGEBOARD DETECTOR
=========================================================================================================== */

function getImageBoard(checkDomains) {
	const ibDomains = {};

	class Dollchan extends BaseBoard {
		constructor(...args) {
			super(...args);

			this.qDelForm = $id('posts') ? '#posts' : '#delform';
			this.qError = 'body[align=center] div, div[style="margin-top: 50px;"]';
			this.qPages = '.pagelist';
			this.qPostImg = 'img.thumb, video.thumb';
			this.qPostMsg = '.message';
			this.qPostRef = '.post-reflink';
			this.qPostUid = '.posteruid';

			this.hasCatalog = true;
			this.markupBB = true;
			this.multiFile = true;
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
									Lng.cap[lang] }" accesskey="c" autocomplete="off">`;
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
				if(recapEl && !isValidPasscode){
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
						method      : 'POST',
						data        : formData,
						success() {},
						contentType : false,
						processData : false
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
			return img.parentNode.parentNode.parentNode;
		}
	}
	ibDomains['dollchan.net'] = Dollchan;

	const wLoc = deWindow.location;
	const { protocol } = wLoc;
	let domain = localData?.domain;
	if(checkDomains) {
		if(!domain) {
			const ibKeys = Object.keys(ibDomains);
			let i = ibKeys.length;
			const host = wLoc.hostname.toLowerCase();
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
	return null;
}
