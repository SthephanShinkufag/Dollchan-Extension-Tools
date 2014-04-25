//============================================================================================================
//												FORM SUBMIT
//============================================================================================================

function getSubmitResponse(dc, isFrame) {
	var i, els, el, err = '', form = $q(aib.qDForm, dc);
	if(dc.body.hasChildNodes() && !form) {
		for(i = 0, els = $Q(aib.qError, dc); el = els[i++];) {
			err += el.innerHTML + '\n';
		}
		if(!(err = err.replace(/<a [^>]+>Назад.+|<br.+/, ''))) {
			err = Lng.error[lang] + ':\n' + dc.body.innerHTML;
		}
		err = /:null|successful|uploaded|updating|обновл|удален[о\.]/i.test(err) ? '' : err.replace(/"/g, "'");
	}
	return [(isFrame ? window.location : form ? aib.getThrdUrl(brd, aib.getTNum(form)) : ''), err];
}

function checkUpload(response) {
	if(aib.krau) {
		pr.form.action = pr.form.action.split('?')[0];
		$id('postform_row_progress').style.display = 'none';
		aib.btnZeroLUTime.click();
	}
	var err = response[1];
	if(err) {
		if(pr.isQuick) {
			pr.setReply(true, false);
		}
		if(/captch|капч|подтвер|verifizie/i.test(err)) {
			pr.refreshCapImg(true);
		}
		$alert(err, 'upload', false);
		updater.sendErrNotif();
		return;
	}
	pr.txta.value = '';
	if(pr.file) {
		pr.delFileUtils(getAncestor(pr.file, 'TR'), true);
		if(aib.krau) {
			var fileInputs = $Q('input[type="file"]', $id('files_parent'));
			if(fileInputs.length > 1) {
				$each(fileInputs, function(input, index) {
					if(index > 0) {
						$del(input.parentNode);
					}
				});
				aib.btnSetFCntToOne.click();
			}
		}
	}
	if(pr.video) {
		pr.video.value = '';
	}
	Cfg['stats'][pr.tNum ? 'reply' : 'op']++;
	saveComCfg(aib.dm, Cfg);
	if(!pr.tNum) {
		window.location = response[0];
		return;
	}
	if(TNum) {
		firstThr.clearPostsMarks();
		firstThr.loadNew(function(eCode, eMsg, np, xhr) {
			infoLoadErrors(eCode, eMsg, 0);
			closeAlert($id('de-alert-upload'));
			if(Cfg['scrAfterRep']) {
				scrollTo(0, pageYOffset + firstThr.last.el.getBoundingClientRect().top);
			}
		}, true);
	} else {
		pByNum[pr.tNum].thr.load(visPosts, false, closeAlert.bind(window, $id('de-alert-upload')));
	}
	pr.closeQReply();
	pr.refreshCapImg(false);
}

function endDelete() {
	var el = $id('de-alert-deleting');
	if(el) {
		closeAlert(el);
		$alert(Lng.succDeleted[lang], 'deleted', false);
	}
}

function checkDelete(response) {
	if(response[1]) {
		$alert(Lng.errDelete[lang] + response[1], 'deleting', false);
		updater.sendErrNotif();
		return;
	}
	var el, i, els, len, post, tNums = [],
		num = (doc.location.hash.match(/\d+/) || [null])[0];
	if(num && (post = pByNum[num])) {
		if(!post.isOp) {
			post.el.className = aib.cReply;
		}
		doc.location.hash = '';
	}
	for(i = 0, els = $Q('.' + aib.cRPost + ' input:checked', dForm), len = els.length; i < len; ++i) {
		el = els[i];
		el.checked = false;
		if(!TNum && tNums.indexOf(num = aib.getPostEl(el).post.tNum) === -1) {
			tNums.push(num);
		}
	}
	if(TNum) {
		firstThr.clearPostsMarks();
		firstThr.loadNew(function(eCode, eMsg, np, xhr) {
			infoLoadErrors(eCode, eMsg, 0);
			endDelete();
		}, false);
	} else {
		tNums.forEach(function(tNum) {
			pByNum[tNum].thr.load(visPosts, false, endDelete);
		});
	}
}

function html5Submit(form, button, fn) {
	this.boundary = '---------------------------' + Math.round(Math.random() * 1e11);
	this.data = [];
	this.busy = 0;
	this.error = false;
	this.url = form.action;
	this.fn = fn;
	$each($Q('input:not([type="submit"]):not([type="button"]), textarea, select', form),
		this.append.bind(this));
	this.append(button);
	this.submit();
}
html5Submit.prototype = {
	append: function(el) {
		var file, fName, idx, fr,
			pre = '--' + this.boundary + '\r\nContent-Disposition: form-data; name="' + el.name + '"';
		if(el.type === 'file' && el.files.length > 0) {
			file = el.files[0];
			fName = file.name;
			this.data.push(pre + '; filename="' + (
				!Cfg['removeFName'] ? fName : ' ' + fName.substring(fName.lastIndexOf('.'))
			) + '"\r\nContent-type: ' + file.type + '\r\n\r\n', null, '\r\n');
			idx = this.data.length - 2;
			if(!/^image\/(?:png|jpeg)$|^video\/webm$/.test(file.type)) {
				this.data[idx] = file;
				return;
			}
			fr = new FileReader();
			fr.onload = function(name, e) {
				var dat = this.clearImage(e.target.result, el.imgFile,
					Cfg['postSameImg'] && String(Math.round(Math.random() * 1e6)));
				if(dat) {
					this.data[idx] = new Blob(dat);
					this.busy--;
					this.submit();
				} else {
					this.error = true;
					$alert(Lng.fileCorrupt[lang] + name, 'upload', false);
				}
			}.bind(this, fName);
			fr.readAsArrayBuffer(file);
			this.busy++;
		} else if(el.type !== 'checkbox' || el.checked) {
			this.data.push(pre + '\r\n\r\n' + el.value + '\r\n');
		}
	},
	submit: function() {
		if(this.error || this.busy !== 0) {
			return;
		}
		this.data.push('--' + this.boundary + '--\r\n');
		$xhr({
			'method': 'POST',
			'headers': {'Content-type': 'multipart/form-data; boundary=' + this.boundary},
			'data': new Blob(this.data),
			'url': nav.fixLink(this.url),
			'onreadystatechange': function(xhr) {
				if(xhr.readyState === 4) {
					if(xhr.status === 200) {
						this(getSubmitResponse($DOM(xhr.responseText), false));
					} else {
						$alert(xhr.status === 0 ? Lng.noConnect[lang] :
							'HTTP [' + xhr.status + '] ' + xhr.statusText, 'upload', false);
					}
				}
			}.bind(this.fn)
		});
	},
	readExif: function(data, off, len) {
		var i, j, dE, tag, tgLen, xRes = 0,
			yRes = 0,
			resT = 0,
			dv = new DataView(data, off),
			le = String.fromCharCode(dv.getUint8(0), dv.getUint8(1)) !== 'MM';
		if(dv.getUint16(2, le) !== 0x2A) {
			return null;
		}
		i = dv.getUint32(4, le);
		if(i > len) {
			return null;
		}
		for(tgLen = dv.getUint16(i, le), j = 0; j < tgLen; j++) {
			tag = dv.getUint16(dE = i + 2 + 12 * j, le);
			if(tag !== 0x011A && tag !== 0x011B && tag !== 0x0128) {
				continue;
			}
			if(tag === 0x0128) {
				resT = dv.getUint16(dE + 8, le) - 1;
			} else {
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
		return new Uint8Array([resT, xRes >> 8, xRes & 0xFF, yRes >> 8, yRes & 0xFF]);
	},
	clearImage: function(data, extraData, rand) {
		var tmp, i, len, deep, val, lIdx, jpgDat, img = new Uint8Array(data),
			rExif = !!Cfg['removeEXIF'],
			rv = extraData ? rand ? [img, extraData, rand] : [img, extraData] : rand ?
				[img, rand] : [img];
		if(!Cfg['postSameImg'] && !rExif && !extraData) {
			return rv;
		}
		// JPG
		if(img[0] === 0xFF && img[1] === 0xD8) {
			for(i = 2, deep = 1, len = img.length - 1, val = [null, null], lIdx = 2, jpgDat = null; i < len; ) {
				if(img[i] === 0xFF) {
					if(rExif) {
						if(!jpgDat && deep === 1) {
							if(img[i + 1] === 0xE1 && img[i + 4] === 0x45) {
								jpgDat = this.readExif(data, i + 10, (img[i + 2] << 8) + img[i + 3]);
							} else if(img[i + 1] === 0xE0 && img[i + 7] === 0x46) {
								jpgDat = img.subarray(i + 11, i + 16);
							}
						}
						if((img[i + 1] >> 4) === 0xE || img[i + 1] === 0xFE) {
							if(lIdx !== i) {
								val.push(img.subarray(lIdx, i));
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
					rv[0] = new Uint8Array(data, 0, i);
				}
				return rv;
			}
			val[0] = new Uint8Array([0xFF, 0xD8, 0xFF, 0xE0, 0, 0x0D, 0x4A, 0x46, 0x49, 0x46, 0, 1, 1]);
			val[1] = jpgDat || new Uint8Array([0, 0, 1, 0, 1]);
			val.push(img.subarray(lIdx, i));
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
			for(i = 0, len = img.length - 7; i < len && (img[i] !== 0x49 ||
				img[i + 1] !== 0x45 || img[i + 2] !== 0x4E || img[i + 3] !== 0x44); i++) {}
			i += 8;
			if(i !== len && (extraData || len - i <= 75)) {
				rv[0] = new Uint8Array(data, 0, i);
			}
			return rv;
		}
		// WEBM
		if(img[0] === 0x1a && img[1] === 0x45 && img[2] === 0xDF && img[3] === 0xA3) {
			return new WebmParser(data).addData(rand).getData();
		}
		return null;
	}
};

WebmParser = function(data) {
	var EBMLId = 0x1A45DFA3,
		segmentId = 0x18538067,
		voidId = 0xEC;
	function WebmElement(data, dataLength, offset) {
		var num, clz, id, size, headSize = 0;
		if(offset + 4 >= dataLength) {
			return;
		}
		num = data.getUint32(offset);
		clz = Math.clz32(num);
		if(clz > 3) {
			this.error = true;
			return;
		}
		id = num >>> (8 * (3 - clz));
		headSize += clz + 1;
		offset += clz + 1;
		if(offset + 4 >= dataLength) {
			this.error = true;
			return;
		}
		num = data.getUint32(offset);
		clz = Math.clz32(num);
		if(clz > 3) {
			if((num & (0xFFFFFFFF >>> (clz + 1))) !== 0) {
				this.error = true;
				return; // We cannot handle webm-files with size greater than 4Gb :(
			}
			if(offset + 8 >= dataLength) {
				this.error = true;
				return;
			}
			headSize += 4;
			offset += 4;
			num = data.getUint32(offset);
			clz -= 4;
		}
		size = num >>> (8 * (3 - clz));
		headSize += clz + 1;
		offset += clz + 1;
		if(offset + size > dataLength) {
			this.error = true;
			return;
		}
		this.data = data;
		this.offset = offset;
		this.endOffset = offset + size;
		this.id = id;
		this.headSize = headSize;
		this.size = size;
	}
	WebmElement.prototype = {
		error: false,
		id: 0
	};

	function Parser(data) {
		var dv = new DataView(data),
			len = data.byteLength,
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
		addData: function(data) {
			if(this.error || !data) {
				return this;
			}
			var size = typeof data === 'string' ? data.length : data.byteLength;
			if(size > 127) {
				this.error = true;
				return;
			}
			this.rv.push(new Uint8Array([voidId, 0x80 | size]), data);
			return this;
		},
		getData: function() {
			if(this.error) {
				return null;
			}
			var len = this.segment.endOffset;
			this.rv[0] = len === this.length ? this.data : new Uint8Array(this.data, 0, len);
			return this.rv;
		}
	};

	WebmParser = Parser;
	return new Parser(data);
}

