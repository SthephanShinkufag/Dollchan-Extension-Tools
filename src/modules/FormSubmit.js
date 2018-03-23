/* ==[ FormSubmit.js ]========================================================================================
                                                    SUBMIT
    postform/delform html5/iframe submit, images and webms parsing, duplicate files posting, EXIF clearing
=========================================================================================================== */

function getSubmitError(dc) {
	if(!dc.body.hasChildNodes() || $q(aib.qDForm, dc)) {
		return null;
	}
	const err = [...$Q(aib.qError, dc)].map(str => str.innerHTML + '\n').join('')
		.replace(/<a [^>]+>Назад.+|<br.+/, '') || Lng.error[lang] + ':\n' + dc.body.innerHTML;
	return /successful|uploaded|updating|post deleted|post created|обновл|удален[о.]/i.test(err) ? null : err;
}

function getUploadFunc() {
	$popup('upload', Lng.sending[lang] +
		'<br><progress id="de-uploadprogress" value="0" max="1" style="display: none; width: 200px;">' +
		'</progress><div style="display: none; font: bold 12px arial;">' +
		'<span></span> / <span></span> (<span></span>)</div>', true);
	let isInited = false;
	const beginTime = Date.now();
	const progress = $id('de-uploadprogress');
	const counterWrap = progress.nextElementSibling;
	const [counterEl, totalEl, speedEl] = [...counterWrap.children];
	return ({ total, loaded: i }) => {
		if(!isInited) {
			progress.setAttribute('max', total);
			$show(progress);
			totalEl.textContent = prettifySize(total);
			$show(counterWrap);
			isInited = true;
		}
		progress.value = i;
		counterEl.textContent = prettifySize(i);
		speedEl.textContent = `${ prettifySize(1e3 * i / (Date.now() - beginTime)) }/${ Lng.second[lang] }`;
	};
}

function checkUpload(data) {
	let error = null;
	let postNum = null;
	const isDocument = data instanceof HTMLDocument;
	if(aib.getSubmitData) {
		if(aib.jsonSubmit) {
			if(aib._8ch && data.substring(0, 16) === '{"captcha":true|') {
				$ajax('/dnsbls_bypass_popup.php').then(xhr => {
					$popup('upload', xhr.responseText).style.cssText =
						'width: 350px; text-align: center;';
					$id('captcha_pop_submit').onclick = () => {
						$id('captcha_message_box').innerHTML =
							'<svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg>';
						const formData = new FormData();
						formData.append('captcha_text', $q('.captcha_text').value);
						formData.append('captcha_cookie', $q('.captcha_cookie').value);
						$ajax('/dnsbls_bypass_popup.php', { method: 'POST', data: formData }).then(xhr => {
							const data = JSON.parse(xhr.responseText);
							if(data.status === 1) {
								$popup('upload', data.message);
							} else {
								$id('captcha_message_box').innerHTML = data.message;
								$id('captcha_objects').innerHTML = data.new_captcha;
							}
						});
					};
					if(pr.isQuick) {
						pr.setReply(true, false);
					}
					updater.sendErrNotif();
					updater.continueUpdater();
				});
				return;
			}
			try {
				data = JSON.parse(isDocument ? data.body.textContent : data);
			} catch(err) {
				error = getErrorMessage(err);
			}
		}
		if(!error) {
			({ error, postNum } = aib.getSubmitData(data));
		}
	} else {
		error = getSubmitError(data);
	}
	if(error) {
		if(pr.isQuick) {
			pr.setReply(true, false);
		}
		if(/[cf]aptch|капч|подтвер|verifi/i.test(error)) {
			pr.refreshCap(true);
		}
		$popup('upload', error);
		updater.sendErrNotif();
		updater.continueUpdater();
		DollchanAPI.notify('submitform', { success: false, error });
		return;
	}
	const { tNum } = pr;
	if((Cfg.markMyPosts || Cfg.markMyLinks) && postNum) {
		MyPosts.set(postNum, tNum || postNum);
	}
	if(Cfg.favOnReply && tNum && !$q('.de-btn-fav-sel', pByNum.get(tNum).el)) {
		pByNum.get(tNum).thr.toggleFavState(true);
	}
	pr.clearForm();
	DollchanAPI.notify('submitform', { success: true, num: postNum });
	Cfg.stats[tNum ? 'reply' : 'op']++;
	saveCfgObj(aib.dm, Cfg);
	if(!tNum) {
		if(postNum) {
			window.location.assign(aib.getThrUrl(aib.b, postNum));
		} else if(isDocument) {
			const dForm = $q(aib.qDForm, data);
			if(dForm) {
				window.location.assign(aib.getThrUrl(aib.b, aib.getTNum(dForm)));
			}
		}
		return;
	}
	if(aib.t) {
		Post.clearMarks();
		Thread.first.loadNewPosts().then(() => AjaxError.Success, err => err).then(err => {
			infoLoadErrors(err);
			if(Cfg.scrAfterRep) {
				scrollTo(0, window.pageYOffset + Thread.first.last.el.getBoundingClientRect().top);
			}
			updater.continueUpdater(true);
			closePopup('upload');
		});
	} else {
		pByNum.get(tNum).thr.loadPosts(visPosts, false, false).then(() => closePopup('upload'));
	}
	pr.closeReply();
	pr.refreshCap();
}

async function checkDelete(data) {
	const err = getSubmitError(data instanceof HTMLDocument ? data : $DOM(data));
	if(err) {
		$popup('delete', Lng.errDelete[lang] + ':\n' + err);
		updater.sendErrNotif();
		return;
	}
	const els = $Q(`[de-form] ${ aib.qRPost } input:checked`);
	const threads = new Set();
	const isThr = aib.t;
	for(let i = 0, len = els.length; i < len; ++i) {
		const el = els[i];
		el.checked = false;
		if(!isThr) {
			threads.add(aib.getPostOfEl(el).thr);
		}
	}
	if(isThr) {
		Post.clearMarks();
		try {
			await Thread.first.loadNewPosts();
		} catch(err) {
			infoLoadErrors(err);
		}
	} else {
		await Promise.all(Array.from(threads, thr => thr.loadPosts(visPosts, false, false)));
	}
	$popup('delete', Lng.succDeleted[lang]);
}

async function html5Submit(form, submitter, needProgress = false) {
	const data = new FormData();
	let hasFiles = false;
	for(const { name, value, type, el } of getFormElements(form, submitter)) {
		let val = value;
		if(name === 'de-file-txt') {
			continue;
		}
		if(type === 'file') {
			hasFiles = true;
			const fileName = value.name;
			const newFileName = Cfg.removeFName ?
				' ' + fileName.substring(fileName.lastIndexOf('.')) : fileName;
			const mime = value.type;
			if((Cfg.postSameImg || Cfg.removeEXIF) && (
				mime === 'image/jpeg' ||
				mime === 'image/png' ||
				mime === 'video/webm' && !aib.mak)
			) {
				const cleanData = cleanFile((await readFile(value)).data, el.obj ? el.obj.extraFile : null);
				if(!cleanData) {
					return Promise.reject(new Error(Lng.fileCorrupt[lang] + ': ' + fileName));
				}
				val = new File(cleanData, newFileName, { type: mime });
			} else if(Cfg.removeFName) {
				val = new File([value], newFileName, { type: mime });
			}
		}
		data.append(name, val);
	}
	if(aib.sendHTML5Post) {
		return aib.sendHTML5Post(form, data, needProgress, hasFiles);
	}
	const ajaxParams = {
		data,
		// TODO: [Greasemonkey] To fix the "No referrer" bug in Tinyboard/Vichan
		// headers: { Referer: aib.prot + '//' + aib.host },
		method: 'POST'
	};
	if(needProgress && hasFiles) {
		ajaxParams.onprogress = getUploadFunc();
	}
	try {
		const xhr = await $ajax(form.action, ajaxParams);
		return aib.jsonSubmit ? xhr.responseText : $DOM(xhr.responseText);
	} catch(err) {
		return Promise.reject(err);
	}
}

async function readFile(file, asText = false) {
	return new Promise(resolve => {
		const fr = new FileReader();
		// XXX: firefox hack to prevent 'XrayWrapper denied access to property "then"' errors
		fr.onload = e => resolve({ data: e.target.result });
		if(asText) {
			fr.readAsText(file);
		} else {
			fr.readAsArrayBuffer(file);
		}
	});
}

function cleanFile(data, extraData) {
	const img = nav.getUnsafeUint8Array(data);
	const rand = Cfg.postSameImg && String(Math.round(Math.random() * 1e6));
	const rv = extraData ?
		rand ? [img, extraData, rand] : [img, extraData] :
		rand ? [img, rand] : [img];
	const rExif = !!Cfg.removeEXIF;
	if(!rand && !rExif && !extraData) {
		return rv;
	}
	let i, len, val, lIdx, jpgDat;
	const subarray = (begin, end) => nav.getUnsafeUint8Array(data, begin, end - begin);
	// JPG
	if(img[0] === 0xFF && img[1] === 0xD8) {
		let deep = 1;
		for(i = 2, len = img.length - 1, val = [null, null], lIdx = 2, jpgDat = null; i < len;) {
			if(img[i] === 0xFF) {
				if(rExif) {
					if(!jpgDat && deep === 1) {
						if(img[i + 1] === 0xE1 && img[i + 4] === 0x45) {
							jpgDat = readExif(data, i + 10, (img[i + 2] << 8) + img[i + 3]);
						} else if(img[i + 1] === 0xE0 && img[i + 7] === 0x46 &&
							(img[i + 2] !== 0 || img[i + 3] >= 0x0E || img[i + 15] !== 0xFF)
						) {
							jpgDat = subarray(i + 11, i + 16);
						}
					}
					if(((img[i + 1] >> 4) === 0xE && img[i + 1] !== 0xEE) || img[i + 1] === 0xFE) {
						if(lIdx !== i) {
							val.push(subarray(lIdx, i));
						}
						i += 2 + (img[i + 2] << 8) + img[i + 3];
						lIdx = i;
						continue;
					}
				} else if(img[i + 1] === 0xD8) {
					deep++;
					i++;
					continue;
				}
				if(img[i + 1] === 0xD9 && --deep === 0) {
					break;
				}
			}
			i++;
		}
		i += 2;
		if(!extraData && len - i > 75) {
			i = len;
		}
		if(lIdx === 2) {
			if(i !== len) {
				rv[0] = nav.getUnsafeUint8Array(data, 0, i);
			}
			return rv;
		}
		val[0] = new Uint8Array([0xFF, 0xD8, 0xFF, 0xE0, 0, 0x0E, 0x4A, 0x46, 0x49, 0x46, 0, 1, 1]);
		val[1] = jpgDat || new Uint8Array([0, 0, 1, 0, 1]);
		val.push(subarray(lIdx, i));
		if(extraData) {
			val.push(extraData);
		}
		if(rand) {
			val.push(rand);
		}
		return val;
	}
	// PNG
	if(img[0] === 0x89 && img[1] === 0x50) {
		for(i = 0, len = img.length - 7; i < len && (
			img[i] !== 0x49 ||
			img[i + 1] !== 0x45 ||
			img[i + 2] !== 0x4E ||
			img[i + 3] !== 0x44
		); ++i) /* empty */;
		i += 8;
		if(i !== len && (extraData || len - i <= 75)) {
			rv[0] = nav.getUnsafeUint8Array(data, 0, i);
		}
		return rv;
	}
	// WEBM
	if(img[0] === 0x1a && img[1] === 0x45 && img[2] === 0xDF && img[3] === 0xA3) {
		return new WebmParser(data).addWebmData(rand).getWebmData();
	}
	return null;
}

function readExif(data, off, len) {
	let xRes = 0;
	let yRes = 0;
	let resT = 0;
	const dv = nav.getUnsafeDataView(data, off);
	const le = String.fromCharCode(dv.getUint8(0), dv.getUint8(1)) !== 'MM';
	if(dv.getUint16(2, le) !== 0x2A) {
		return null;
	}
	const i = dv.getUint32(4, le);
	if(i > len) {
		return null;
	}
	for(let j = 0, tgLen = dv.getUint16(i, le); j < tgLen; ++j) {
		let dE = i + 2 + 12 * j;
		const tag = dv.getUint16(dE, le);
		if(tag === 0x0128) {
			resT = dv.getUint16(dE + 8, le) - 1;
		} else if(tag === 0x011A || tag === 0x011B) {
			dE = dv.getUint32(dE + 8, le);
			if(dE > len) {
				return null;
			}
			if(tag === 0x11A) {
				xRes = Math.round(dv.getUint32(dE, le) / dv.getUint32(dE + 4, le));
			} else {
				yRes = Math.round(dv.getUint32(dE, le) / dv.getUint32(dE + 4, le));
			}
		}
	}
	xRes = xRes || yRes;
	yRes = yRes || xRes;
	return new Uint8Array([resT & 0xFF, xRes >> 8, xRes & 0xFF, yRes >> 8, yRes & 0xFF]);
}
