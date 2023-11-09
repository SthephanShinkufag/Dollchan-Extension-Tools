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
			this.qPostImg = 'img.thumb, video.thumb';
			this.qPostMsg = '.message';
			this.qPostRef = '.post-reflink';

			this.hasCatalog = true;
			this.markupBB = true;
			this.multiFile = true;
			this.timePattern = 'yy+nn+dd+w+hh+ii+ss';
		}
		get captchaInit() {
			const switchCaptcha = status => {
				const hasPasscode = status === 'validpasscode';
				$toggle($id('captchablock').lastElementChild, !hasPasscode);
				$toggle($id('validcaptchablock'), hasPasscode);
				$toggle($id('invalidcaptchablock'), status === 'invalidpasscode');
				if(!hasPasscode) {
					const captchaInput = $id('captcha');
					if(captchaInput) {
						captchaInput.value = '';
					}
				}
			};
			if(getCookies().passcode === '1') {
				$ajax(this.protocol + '//' + this.host + '/' + this.b + '/imgboard.php?passcode&check').then(
					xhr => switchCaptcha(xhr.responseText === 'OK' ? 'validpasscode' : 'invalidpasscode'),
					() => switchCaptcha('invalidpasscode'));
			} else {
				switchCaptcha('showcaptcha');
			}
			return null;
		}
		getCaptchaSrc(src) {
			return src.replace(/\?[^?]+$|$/, '?' + Math.random());
		}
		get css() {
			return '.postarea + hr { display: none; }';
		}
		fixFileInputs(el) {
			const str = ' class="de-file-wrap"><input type="file" name="file[]"></div>';
			el.innerHTML = '<div' + str + ('<div style="display: none;"' + str).repeat(3);
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
