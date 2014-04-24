//============================================================================================================
//											CONTENT FEATURES
//============================================================================================================

function initMessageFunctions() {
	window.addEventListener('message', function(e) {
		var temp, data = e.data.substring(1);
		switch(e.data[0]) {
		case 'A':
			temp = data.split('$#$');
			if(temp[0] === 'de-iframe-pform') {
				checkUpload([temp[1], temp[2]]);
			} else {
				checkDelete([temp[1], temp[2]]);
			}
			$q('iframe[name="' + temp[0] + '"]', doc).src = 'about:blank';
			return;
		case 'B':
			$del($id('de-fav-wait'));
			$id('de-iframe-fav').style.height = data + 'px';
			return;
		}
	}, false);
}

function detectImgFile(ab) {
	var i, j, dat = new Uint8Array(ab),
		len = dat.length;
	/* JPG [ff d8 ff e0] = [яШяа] */
	if(dat[0] === 0xFF && dat[1] === 0xD8) {
		for(i = 0, j = 0; i < len - 1; i++) {
			if(dat[i] === 0xFF) {
				/* Built-in JPG */
				if(dat[i + 1] === 0xD8) {
					j++;
				/* JPG end [ff d9] */
				} else if(dat[i + 1] === 0xD9 && --j === 0) {
					i += 2;
					break;
				}
			}
		}
	/* PNG [89 50 4e 47] = [‰PNG] */
	} else if(dat[0] === 0x89 && dat[1] === 0x50) {
		for(i = 0; i < len - 7; i++) {
			/* PNG end [49 45 4e 44 ae 42 60 82] */
			if(dat[i] === 0x49 && dat[i + 1] === 0x45 && dat[i + 2] === 0x4E && dat[i + 3] === 0x44) {
				i += 8;
				break;
			}
		}
	} else {
		return {};
	}
	/* Ignore small files */
	if(i !== len && len - i > 60) {
		for(len = i + 90; i < len; i++) {
			/* 7Z [37 7a bc af] = [7zјЇ] */
			if(dat[i] === 0x37 && dat[i + 1] === 0x7A && dat[i + 2] === 0xBC) {
				return {'type': 0, 'idx': i, 'data': ab};
			/* ZIP [50 4b 03 04] = [PK..] */
			} else if(dat[i] === 0x50 && dat[i + 1] === 0x4B && dat[i + 2] === 0x03) {
				return {'type': 1, 'idx': i, 'data': ab};
			/* RAR [52 61 72 21] = [Rar!] */
			} else if(dat[i] === 0x52 && dat[i + 1] === 0x61 && dat[i + 2] === 0x72) {
				return {'type': 2, 'idx': i, 'data': ab};
			/* OGG [4f 67 67 53] = [OggS] */
			} else if(dat[i] === 0x4F && dat[i + 1] === 0x67 && dat[i + 2] === 0x67) {
				return {'type': 3, 'idx': i, 'data': ab};
			/* MP3 [0x49 0x44 0x33] = [ID3] */
			} else if(dat[i] === 0x49 && dat[i + 1] === 0x44 && dat[i + 2] === 0x33) {
				return {'type': 4, 'idx': i, 'data': ab};
			}
		}
	}
	return {};
}

function workerQueue(mReqs, wrkFn, errFn) {
	if(!nav.hasWorker) {
		this.run = this._runSync.bind(wrkFn);
		return;
	}
	this.queue = new $queue(mReqs, this._createWrk.bind(this), null);
	this.run = this._runWrk;
	this.wrks = new $workers('self.onmessage = function(e) {\
		var info = (' + String(wrkFn) + ')(e.data[1]);\
		if(info.data) {\
			self.postMessage([e.data[0], info], [info.data]);\
		} else {\
			self.postMessage([e.data[0], info]);\
		}\
	}', mReqs);
	this.errFn = errFn;
}
workerQueue.prototype = {
	_runSync: function(data, transferObjs, Fn) {
		Fn(this(data));
	},
	onMess: function(Fn, e) {
		this.queue.end(e.data[0]);
		Fn(e.data[1]);
	},
	onErr: function(qIdx, e) {
		this.queue.end(qIdx);
		this.errFn(e);
	},
	_runWrk: function(data, transObjs, Fn) {
		this.queue.run([data, transObjs, this.onMess.bind(this, Fn)]);
	},
	_createWrk: function(qIdx, num, data) {
		var w = this.wrks[qIdx];
		w.onmessage = data[2];
		w.onerror = this.onErr.bind(this, qIdx);
		w.postMessage([qIdx, data[0]], data[1]);
	},
	clear: function() {
		this.wrks.clear();
		this.wrks = null;
	}
};

function addImgFileIcon(fName, info) {
	var app, ext, type = info['type'];
	if(typeof type !== 'undefined') {
		if(type === 2) {
			app = 'application/x-rar-compressed';
			ext = 'rar';
		} else if(type === 1) {
			app = 'application/zip';
			ext = 'zip';
		} else if(type === 0) {
			app = 'application/x-7z-compressed';
			ext = '7z';
		} else if(type === 3) {
			app = 'audio/ogg';
			ext = 'ogg';
		} else {
			app = 'audio/mpeg';
			ext = 'mp3';
		}
		this.insertAdjacentHTML('afterend', '<a href="' + window.URL.createObjectURL(
				new Blob([new Uint8Array(info['data']).subarray(info['idx'])], {'type': app})
			) + '" class="de-img-' + (type > 2 ? 'audio' : 'arch') + '" title="' + Lng.downloadFile[lang] +
			'" download="' + fName.substring(0, fName.lastIndexOf('.')) + '.' + ext + '">.' + ext + '</a>'
		);
	}
}

function downloadImgData(url, Fn) {
	downloadObjInfo({
		'method': 'GET',
		'url': url,
		'onreadystatechange': function onDownloaded(url, e) {
			if(e.readyState !== 4) {
				return;
			}
			var isAb = e.responseType === 'arraybuffer';
			if(e.status === 0 && isAb) {
				Fn(new Uint8Array(e.response));
			} else if(e.status !== 200) {
				if(e.status === 404 || !url) {
					Fn(null);
				} else {
					downloadObjInfo({
						'method': 'GET',
						'url': url,
						'onreadystatechange': onDownloaded.bind(null, null)
					});
				}
			} else if(isAb) {
				Fn(new Uint8Array(e.response));
			} else {
				for(var len, i = 0, txt = e.responseText, rv = new Uint8Array(len = txt.length); i < len; ++i) {
					rv[i] = txt.charCodeAt(i) & 0xFF;
				}
				Fn(rv);
			}
		}.bind(null, url)
	});
}

function downloadObjInfo(obj) {
	if(nav.Firefox && aib.fch && !obj.url.startsWith('blob')) {
		obj['overrideMimeType'] = 'text/plain; charset=x-user-defined';
		GM_xmlhttpRequest(obj);
	} else {
		obj['responseType'] = 'arraybuffer';
		try {
			$xhr(obj);
		} catch(e) {
			Fn(null);
		}
	}
}

function preloadImages(post) {
	if(!Cfg['preLoadImgs'] && !Cfg['openImgs'] && !isPreImg) {
		return;
	}
	var lnk, url, iType, nExp, el, i, len, els, queue, mReqs = post ? 1 : 4, cImg = 1,
		rjf = (isPreImg || Cfg['findImgFile']) && new workerQueue(mReqs, detectImgFile, function(e) {
			console.error("FILE DETECTOR ERROR, line: " + e.lineno + " - " + e.message);
		});
	if(isPreImg || Cfg['preLoadImgs']) {
		queue = new $queue(mReqs, function(qIdx, num, dat) {
			downloadImgData(dat[0], function(idx, data) {
				if(data) {
					var a = this[1],
						fName = this[0].substring(this[0].lastIndexOf("/") + 1),
						aEl = $q(aib.qImgLink, aib.getImgWrap(a));
					aEl.setAttribute('download', fName);
					a.href = window.URL.createObjectURL(new Blob([data], {'type': this[2]}));
					a.setAttribute('de-name', fName);
					if(this[3]) {
						this[3].src = a.href;
					}
					if(rjf) {
						rjf.run(data.buffer, [data.buffer], addImgFileIcon.bind(aEl, fName));
					}
				}
				queue.end(idx);
				if(Images_.progressId) {
					$alert(Lng.loadImage[lang] + cImg + '/' + len, Images_.progressId, true);
				}
				cImg++;
			}.bind(dat, qIdx));
		}, function() {
			Images_.preloading = false
			if(Images_.afterpreload) {
				Images_.afterpreload();
				Images_.afterpreload = Images_.progressId = null;
			}
			rjf && rjf.clear();
			rjf = queue = cImg = len = null;
		});
		Images_.preloading = true;
	}
	for(i = 0, els = $Q(aib.qThumbImages, post || dForm), len = els.length; i < len; i++) {
		if(lnk = getAncestor(el = els[i], 'A')) {
			url = lnk.href;
			nExp = !!Cfg['openImgs'];
			if(/\.gif$/i.test(url)) {
				iType = 'image/gif';
			} else {
				if(/\.jpe?g$/i.test(url)) {
					iType = 'image/jpeg';
				} else if(/\.png$/i.test(url)) {
					iType = 'image/png';
				} else if(/\.webm$/i.test(url)) {
					iType = 'video/webm';
				} else {
					continue;
				}
				nExp &= !Cfg['openGIFs'];
			}
			if(queue) {
				queue.run([url, lnk, iType, nExp && el]);
			} else if(nExp) {
				el.src = url;
			}
		}
	}
	queue && queue.complete();
}

function getDataFromImg(img) {
	var cnv = Images_.canvas || (Images_.canvas = doc.createElement('canvas'));
	cnv.width = img.width;
	cnv.height = img.height;
	cnv.getContext('2d').drawImage(img, 0, 0);
	return new Uint8Array(atob(cnv.toDataURL("image/png").split(',')[1]).split('').map(function(a) {
		return a.charCodeAt();
	}));
}

function loadDocFiles(imgOnly) {
	var els, files, progress, counter, count = 0,
		current = 1,
		warnings = '',
		tar = new $tar(),
		dc = imgOnly ? doc : doc.documentElement.cloneNode(true);
	Images_.queue = new $queue(4, function(qIdx, num, dat) {
		downloadImgData(dat[0], function(idx, data) {
			var name = this[1].replace(/[\\\/:*?"<>|]/g, '_'), el = this[2];
			progress.value = current;
			counter.innerHTML = current;
			current++;
			if(this[3]) {
				if(!data) {
					warnings += '<br>' + Lng.cantLoad[lang] + '<a href="' + this[0] + '">' +
						this[0] + '</a><br>' + Lng.willSavePview[lang];
					$alert(Lng.loadErrors[lang] + warnings, 'floadwarn', false);
					name = 'thumb-' + name.replace(/\.[a-z]+$/, '.png');
					data = getDataFromImg(this[2]);
				}
				if(!imgOnly) {
					el.classList.add('de-thumb');
					el.src = this[3].href = $q(aib.qImgLink, aib.getImgWrap(this[3])).href =
						name = 'images/' + name;
				}
				tar.addFile(name, data);
			} else if(data && data.length > 0) {
				tar.addFile(el.href = el.src = 'data/' + name, data);
			} else {
				$del(el);
			}
			Images_.queue.end(idx);
		}.bind(dat, qIdx));
	}, function() {
		var u, a, dt;
		if(!imgOnly) {
			dt = doc.doctype;
			$t('head', dc).insertAdjacentHTML('beforeend',
				'<script type="text/javascript" src="data/dollscript.js"></script>');
			tar.addString('data/dollscript.js', '(' + String(de_main_func) + ')(null, true);');
			tar.addString(
				TNum + '.html', '<!DOCTYPE ' + dt.name +
				(dt.publicId ? ' PUBLIC "' + dt.publicId + '"' : dt.systemId ? ' SYSTEM' : '') +
				(dt.systemId ? ' "' + dt.systemId + '"' : '') + '>' + dc.outerHTML
			);
		}
		u = window.URL.createObjectURL(tar.get());
		a = $new('a', {'href': u, 'download': aib.dm + '-' + brd.replace(/[\\\/:*?"<>|]/g, '') +
			'-t' + TNum + (imgOnly ? '-images.tar' : '.tar')}, null);
		doc.body.appendChild(a);
		a.click();
		setTimeout(function(el, url) {
			window.URL.revokeObjectURL(url);
			$del(el);
		}, 0, a, u);
		$del($id('de-alert-filesload'));
		Images_.queue = tar = warnings = count = current = imgOnly = progress = counter = null;
	});
	els = aProto.slice.call($Q(aib.qThumbImages, $q('[de-form]', dc)));
	count += els.length;
	els.forEach(function(el) {
		var lnk, url;
		if(lnk = getAncestor(el, 'A')) {
			url = lnk.href;
			Images_.queue.run([url, lnk.getAttribute('de-name') ||
				url.substring(url.lastIndexOf("/") + 1), el, lnk]);
		}
	});
	if(!imgOnly) {
		files = [];
		$each($Q('script, link[rel="alternate stylesheet"], span[class^="de-btn-"],' +
			' #de-main > div, .de-parea, #de-qarea, ' + aib.qPostForm, dc), $del);
		$each($T('a', dc), function(el) {
			var num, tc = el.textContent;
			if(tc[0] === '>' && tc[1] === '>' && (num = +tc.substr(2)) && (num in pByNum)) {
				el.href = aib.anchor + num;
			} else {
				el.href = getAbsLink(el.href);
			}
			if(!el.classList.contains('de-preflink')) {
				el.className = 'de-preflink ' + el.className;
			}
		});
		$each($Q('.' + aib.cRPost, dc), function(post, i) {
			post.setAttribute('de-num', i === 0 ? TNum : aib.getPNum(post));
		});
		$each($Q('link, *[src]', dc), function(el) {
			if(els.indexOf(el) !== -1) {
				return;
			}
			var temp, i, ext, name, url = el.tagName === 'LINK' ? el.href : el.src;
			if(!this.test(url)) {
				$del(el);
				return;
			}
			name = url.substring(url.lastIndexOf("/") + 1).replace(/[\\\/:*?"<>|]/g, '_')
				.toLowerCase();
			if(files.indexOf(name) !== -1) {
				temp = url.lastIndexOf('.');
				ext = url.substring(temp);
				url = url.substring(0, temp);
				name = name.substring(0, name.lastIndexOf('.'));
				for(i = 0; ; ++i) {
					temp = name + '(' + i + ')' + ext;
					if(files.indexOf(temp) === -1) {
						break;
					}
				}
				name = temp;
			}
			files.push(name);
			Images_.queue.run([url, name, el, null]);
			count++;
		}.bind(new RegExp('^\\/\\/?|^https?:\\/\\/([^\\/]*\.)?' + regQuote(aib.dm) + '\\/', 'i')));
	}
	$alert((imgOnly ? Lng.loadImage[lang] : Lng.loadFile[lang]) +
		'<br><progress id="de-loadprogress" value="0" max="' + count + '"></progress> <span>1</span>/' +
		count, 'filesload', true);
	progress = $id('de-loadprogress');
	counter = progress.nextElementSibling;
	Images_.queue.complete();
	els = null;
}

