/* ==[ FormSubmit.js ]========================================================================================
                                                    SUBMIT
    postform/delform html5/iframe submit, images and webms parsing, duplicate files posting, EXIF clearing
=========================================================================================================== */

function getSubmitError(dc) {
	if(!dc.body.hasChildNodes() || $q(aib.qDForm, dc)) {
		return null;
	}
	var err = '', els = $Q(aib.qError, dc);
	for(var i = 0, len = els.length; i < len; ++i) {
		err += els[i].innerHTML + '\n';
	}
	err = err.replace(/<a [^>]+>Назад.+|<br.+/, '') || Lng.error[lang] + ':\n' + dc.body.innerHTML;
	return /successful|uploaded|updating|post deleted|обновл|удален[о.]/i.test(err) ? null : err;
}

function getUploadFunc() {
	$popup('upload', Lng.sending[lang] +
		'<br><progress id="de-uploadprogress" value="0" max="1" style="display: none; width: 200px;">' +
		'</progress><div style="display: none; font: bold 12px arial;">' +
		'<span></span> / <span></span> (<span></span>)</div>', true);
	let inited = false;
	const beginTime = Date.now();
	const progress = $id('de-uploadprogress');
	const counterWrap = progress.nextElementSibling;
	const [counterEl, totalEl, speedEl] = Array.from(counterWrap.children);
	return function(data) {
		if(!inited) {
			progress.setAttribute('max', data.total);
			$show(progress);
			totalEl.textContent = prettifySize(data.total);
			$show(counterWrap);
			inited = true;
		}
		progress.value = data.loaded;
		counterEl.textContent = prettifySize(data.loaded);
		speedEl.textContent = prettifySize((data.loaded / (Date.now() - beginTime)) * 1e3) +
			'/' + Lng.second[lang];
	};
}

function checkUpload(data) {
	var error = null, postNum = null, isDocument = data instanceof HTMLDocument;
	if(aib.getSubmitData) {
		if(aib.jsonSubmit) {
			if(aib._8ch && data.substring(0, 16) === '{"captcha":true|') {
				$ajax('/dnsbls_bypass_popup.php').then(xhr => {
					$popup('upload', xhr.responseText).style.cssText =
						'width: 350px; text-align: center;';
					$id('captcha_pop_submit').onclick = function() {
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
					updater.continue();
				});
				return;
			}
			try {
				data = JSON.parse(isDocument ? data.body.textContent : data);
			} catch(e) {
				error = getErrorMessage(e);
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
		updater.continue();
		DollchanAPI.notify('submitform', { success: false, error: error });
		return;
	}
	const tNum = pr.tNum;
	if((Cfg.markMyPosts || Cfg.markMyLinks) && postNum) {
		MyPosts.set(postNum, tNum || postNum);
	}
	if(Cfg.favOnReply && tNum && !$q('.de-btn-fav-sel', pByNum.get(tNum).el)) {
		pByNum.get(tNum).thr.setFavorState(true, 'onreply');
	}
	pr.clearForm();
	DollchanAPI.notify('submitform', { success: true, num: postNum });
	Cfg.stats[tNum ? 'reply' : 'op']++;
	saveCfgObj(aib.dm, Cfg);
	if(!tNum) {
		if(postNum) {
			window.location = aib.getThrUrl(aib.b, postNum);
		} else if(isDocument) {
			const dForm = $q(aib.qDForm, data);
			if(dForm) {
				window.location = aib.getThrUrl(aib.b, aib.getTNum(dForm));
			}
		}
		return;
	}
	if(aib.t) {
		Post.clearMarks();
		Thread.first.loadNewPosts().then(() => AjaxError.Success, e => e).then(e => {
			infoLoadErrors(e);
			if(Cfg.scrAfterRep) {
				scrollTo(0, window.pageYOffset + Thread.first.last.el.getBoundingClientRect().top);
			}
			updater.continue(true);
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
	const els = $Q('[de-form] ' + aib.qRPost + ' input:checked');
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
		} catch(e) {
			infoLoadErrors(e);
		}
	} else {
		await Promise.all(Array.from(threads).map(thr => thr.loadPosts(visPosts, false, false)));
	}
	$popup('delete', Lng.succDeleted[lang]);
}

async function html5Submit(form, submitter, needProgress = false) {
	const formData = new FormData();
	let hasFiles = false;
	for(let { name, value, type, el } of getFormElements(form, submitter)) {
		if(name === 'de-file-txt') {
			continue;
		}
		if(type === 'file') {
			hasFiles = true;
			const fileName = value.name;
			const newFileName = Cfg.removeFName ?
				' ' + fileName.substring(fileName.lastIndexOf('.')) : fileName;
			if((Cfg.postSameImg || Cfg.removeEXIF) && (
				value.type === 'image/jpeg' ||
				value.type === 'image/png' ||
				value.type === 'video/webm' && !aib.mak)
			) {
				const data = cleanFile((await readFile(value)).data, el.obj ? el.obj.extraFile : null);
				if(!data) {
					return Promise.reject(new Error(Lng.fileCorrupt[lang] + ': ' + fileName));
				}
				value = new File(data, newFileName);
			} else if(Cfg.removeFName) {
				value = new File([value], newFileName);
			}
		}
		formData.append(name, value);
	}
	const ajaxParams = { method: 'POST', data: formData };
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
		var fr = new FileReader();
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
	const subarray = (begin, end) => nav.getUnsafeUint8Array(data, begin, end - begin);
	var i, len, val, lIdx, jpgDat, img = nav.getUnsafeUint8Array(data),
		rand = Cfg.postSameImg && String(Math.round(Math.random() * 1e6)),
		rExif = !!Cfg.removeEXIF,
		rv = extraData ? rand ? [img, extraData, rand] : [img, extraData] : rand ?
			[img, rand] : [img];
	if(!rand && !rExif && !extraData) {
		return rv;
	}
	// JPG
	if(img[0] === 0xFF && img[1] === 0xD8) {
		var deep = 1;
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
		); i++) /* empty */;
		i += 8;
		if(i !== len && (extraData || len - i <= 75)) {
			rv[0] = nav.getUnsafeUint8Array(data, 0, i);
		}
		return rv;
	}
	// WEBM
	if(img[0] === 0x1a && img[1] === 0x45 && img[2] === 0xDF && img[3] === 0xA3) {
		return new WebmParser(data).addData(rand).getData();
	}
	return null;
}

function readExif(data, off, len) {
	var i, xRes = 0,
		yRes = 0,
		resT = 0,
		dv = nav.getUnsafeDataView(data, off),
		le = String.fromCharCode(dv.getUint8(0), dv.getUint8(1)) !== 'MM';
	if(dv.getUint16(2, le) !== 0x2A) {
		return null;
	}
	i = dv.getUint32(4, le);
	if(i > len) {
		return null;
	}
	for(var j = 0, tgLen = dv.getUint16(i, le); j < tgLen; j++) {
		var dE = i + 2 + 12 * j,
			tag = dv.getUint16(dE, le);
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

var WebmParser = function(data) {
	var EBMLId = 0x1A45DFA3,
		segmentId = 0x18538067,
		voidId = 0xEC;
	function WebmElement(elData, dataLength, offset) {
		if(offset + 4 >= dataLength) {
			return;
		}
		var num = elData.getUint32(offset),
			leadZeroes = Math.clz32(num);
		if(leadZeroes > 3) {
			this.error = true;
			return;
		}
		offset += leadZeroes + 1;
		if(offset >= dataLength) {
			this.error = true;
			return;
		}
		this.id = num >>> (8 * (3 - leadZeroes));
		this.headSize = leadZeroes + 1;
		num = elData.getUint32(offset);
		leadZeroes = Math.clz32(num);
		var size = num & (0xFFFFFFFF >>> (leadZeroes + 1));
		if(leadZeroes > 3) {
			var shift = 8 * (7 - leadZeroes);
			if(size >>> shift !== 0 || offset + 4 > dataLength) {
				this.error = true;
				return; // We cannot handle webm-files with size greater than 4Gb :(
			}
			size = (size << (32 - shift)) | (elData.getUint32(offset + 4) >>> shift);
		} else {
			size >>>= 8 * (3 - leadZeroes);
		}
		this.headSize += leadZeroes + 1;
		offset += leadZeroes + 1;
		if(offset + size > dataLength) {
			this.error = true;
			return;
		}
		this.data = elData;
		this.offset = offset;
		this.endOffset = offset + size;
		this.size = size;
	}
	WebmElement.prototype = {
		error : false,
		id    : 0
	};

	function Parser(data) {
		var dv = nav.getUnsafeDataView(data),
			len = dv.byteLength,
			el = new WebmElement(dv, len, 0),
			offset = 0,
			voids = [];
		error: do {
			if(el.error || el.id !== EBMLId) {
				break;
			}
			this.EBML = el;
			offset += el.headSize + el.size;
			while(true) {
				el = new WebmElement(dv, len, offset);
				if(el.error) {
					break error;
				}
				if(el.id === segmentId) {
					this.segment = el;
					break; // Ignore everything after first segment
				} else if(el.id === voidId) {
					voids.push(el);
				} else {
					break error;
				}
				offset += el.headSize + el.size;
			}
			this.voids = voids;
			this.data = data;
			this.length = len;
			this.rv = [null];
			this.error = false;
			return;
		} while(false);
		this.error = true;
	}
	Parser.prototype = {
		addData(data) {
			if(this.error || !data) {
				return this;
			}
			var size = (typeof data === 'string') ? data.length : data.byteLength;
			if(size > 127) {
				this.error = true;
				return;
			}
			this.rv.push(new Uint8Array([voidId, 0x80 | size]), data);
			return this;
		},
		getData() {
			if(this.error) {
				return null;
			}
			this.rv[0] = nav.getUnsafeUint8Array(this.data, 0, this.segment.endOffset);
			return this.rv;
		}
	};

	WebmParser = Parser;
	return new Parser(data);
};
