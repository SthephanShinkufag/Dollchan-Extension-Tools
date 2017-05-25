/*==[ ContentLoad.js ]========================================================================================
                                             CONTENT DOWNLOADING
                      images/webm preloading, rarjpeg detecting, thread/images downloading
============================================================================================================*/

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
				return { type: 0, idx: i, data: ab };
			/* ZIP [50 4b 03 04] = [PK..] */
			} else if(dat[i] === 0x50 && dat[i + 1] === 0x4B && dat[i + 2] === 0x03) {
				return { type: 1, idx: i, data: ab };
			/* RAR [52 61 72 21] = [Rar!] */
			} else if(dat[i] === 0x52 && dat[i + 1] === 0x61 && dat[i + 2] === 0x72) {
				return { type: 2, idx: i, data: ab };
			/* OGG [4f 67 67 53] = [OggS] */
			} else if(dat[i] === 0x4F && dat[i + 1] === 0x67 && dat[i + 2] === 0x67) {
				return { type: 3, idx: i, data: ab };
			/* MP3 [0x49 0x44 0x33] = [ID3] */
			} else if(dat[i] === 0x49 && dat[i + 1] === 0x44 && dat[i + 2] === 0x33) {
				return { type: 4, idx: i, data: ab };
			}
		}
	}
	return {};
}

function WorkerPool(mReqs, wrkFn, errFn) {
	if(!nav.hasWorker) {
		this.run = (data, transferObjs, fn) => fn(wrkFn(data));
		return;
	}
	var url = window.URL.createObjectURL(new Blob([`self.onmessage = function(e) {
		var info = (${ String(wrkFn) })(e.data);
		if(info.data) {
			self.postMessage(info, [info.data]);
		} else {
			self.postMessage(info);
		}
	}`], { type: 'text/javascript' }));
	this._pool = new TasksPool(mReqs, (num, data) => this._createWorker(num, data), null);
	this._freeWorkers = [];
	this._url = url;
	this._errFn = errFn;
	while(mReqs--) {
		this._freeWorkers.push(new Worker(url));
	}
}
WorkerPool.prototype = {
	run(data, transferObjs, fn) {
		this._pool.run([data, transferObjs, fn]);
	},
	_createWorker(num, data) {
		return new Promise((resolve, reject) => {
			var w = this._freeWorkers.pop(),
				[sendData, transferObjs, fn] = data;
			w.onmessage = e => {
				fn(e.data);
				this._freeWorkers.push(w);
				resolve();
			};
			w.onerror = err => {
				resolve();
				this._freeWorkers.push(w);
				this._errFn(err);
			};
			w.postMessage(sendData, transferObjs);
		});
	},
	clear() {
		window.URL.revokeObjectURL(this._url);
		this._freeWorkers = [];
	}
};

function addImgFileIcon(nameLink, fName, info) {
	var app, ext, type = info.type;
	if(typeof type === 'undefined') {
		return;
	}
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
	nameLink.insertAdjacentHTML('afterend', '<a href="' + window.URL.createObjectURL(
			new Blob([nav.getUnsafeUint8Array(info.data, info.idx)], { type: app })
		) + '" class="de-img-' + (type > 2 ? 'audio' : 'arch') + '" title="' + Lng.downloadFile[lang] +
		'" download="' + fName.substring(0, fName.lastIndexOf('.')) + '.' + ext + '">.' + ext + '</a>');
}

function downloadImgData(url, repeatOnError = true) {
	return $ajax(url, {
		responseType: 'arraybuffer',
		overrideMimeType: 'text/plain; charset=x-user-defined'
	}, url.startsWith('blob')).then(xhr => {
		if(xhr.status === 0 && xhr.responseType === 'arraybuffer') {
			return new Uint8Array(xhr.response);
		}
		if('response' in xhr) {
			return nav.getUnsafeUint8Array(xhr.response);
		}
		const txt = xhr.responseText;
		const rv = new Uint8Array(txt.length);
		for(let i = 0, len = txt.length; i < len; ++i) {
			rv[i] = txt.charCodeAt(i) & 0xFF;
		}
		return rv;
	}, err => err.code !== 404 && repeatOnError ? downloadImgData(url, false) : null);
}

function preloadImages(data) {
	if(!Cfg.preLoadImgs && !Cfg.openImgs && !isPreImg) {
		return;
	}
	var pool, isPost = data instanceof AbstractPost;
	if(isPreImg || Cfg.preLoadImgs) {
		var cImg = 1,
			mReqs = isPost ? 1 : 4,
			rjf = (isPreImg || Cfg.findImgFile) && new WorkerPool(mReqs, detectImgFile, function(e) {
				console.error('File detector error:', `line: ${ e.lineno } - ${ e.message }`);
			});
		pool = new TasksPool(mReqs, (num, data) => downloadImgData(data[0]).then(imageData => {
			const [url, imgLink, iType, nExp, el] = data;
			if(imageData) {
				const fName = url.substring(url.lastIndexOf('/') + 1);
				const nameLink = $q(aib.qImgNameLink, aib.getImgWrap(el));
				imgLink.setAttribute('download', fName);
				nameLink.setAttribute('download', fName);
				nameLink.setAttribute('de-href', nameLink.href);
				imgLink.href = nameLink.href =
					window.URL.createObjectURL(new Blob([imageData], { type: iType }));
				if(iType === 'video/webm') {
					el.setAttribute('de-video', '');
				}
				if(nExp) {
					el.src = imgLink.href;
				}
				if(rjf) {
					rjf.run(imageData.buffer, [imageData.buffer],
						info => addImgFileIcon(nameLink, fName, info));
				}
			}
			if(Images_.progressId) {
				$popup(Images_.progressId, Lng.loadImage[lang] + cImg + '/' + len, true);
			}
			cImg++;
		}), function() {
			Images_.preloading = false;
			if(Images_.afterpreload) {
				Images_.afterpreload();
				Images_.afterpreload = Images_.progressId = null;
			}
			if(rjf) {
				rjf.clear();
			}
		});
		Images_.preloading = true;
	}
	var els = $Q(aib.qPostImg, isPost ? data.el : data);
	for(var i = 0, len = els.length; i < len; ++i) {
		var el = els[i],
			imgLink = $parent(el = els[i], 'A');
		if(!imgLink) {
			continue;
		}
		let nExp = !!Cfg.openImgs;
		const url = imgLink.href;
		const iType = getFileType(url);
		if(!iType) {
			continue;
		} else if(iType === 'image/gif') {
			nExp &= Cfg.openImgs !== 3;
		} else {
			if(iType === 'video/webm') {
				nExp = false;
			}
			nExp &= Cfg.openImgs !== 2;
		}
		if(pool) {
			pool.run([url, imgLink, iType, nExp, el]);
		} else if(nExp) {
			el.src = url; // !
		}
	}
	if(pool) {
		pool.complete();
	}
}

function getDataFromImg(el) {
	try {
		var cnv = Images_.canvas || (Images_.canvas = doc.createElement('canvas'));
		cnv.width = el.width;
		cnv.height = el.height;
		cnv.getContext('2d').drawImage(el, 0, 0);
		return Promise.resolve(new Uint8Array(atob(cnv.toDataURL('image/png').split(',')[1])
			.split('').map(a => a.charCodeAt())));
	} catch(e) {
		return downloadImgData(el.src);
	}
}

function loadDocFiles(imgOnly) {
	var els, progress, counter, count = 0,
		current = 1,
		warnings = '',
		tar = new TarBuilder(),
		dc = imgOnly ? doc : doc.documentElement.cloneNode(true);
	Images_.pool = new TasksPool(4, (num, data) => downloadImgData(data[0]).then(imgData => {
		var [url, fName, el, imgLink] = data,
			safeName = fName.replace(/[\\\/:*?"<>|]/g, '_');
		progress.value = current;
		counter.innerHTML = current;
		current++;
		if(imgLink) {
			var thumbName = safeName.replace(/\.[a-z]+$/, '.png');
			if(imgOnly) {
				thumbName = 'thumb-' + thumbName;
			} else {
				thumbName = 'thumbs/' + thumbName;
				safeName = imgData ? 'images/' + safeName : thumbName;
				imgLink.href = $q('a[de-href], ' + aib.qImgNameLink, aib.getImgWrap(el)).href = safeName;
			}
			if(imgData) {
				tar.addFile(safeName, imgData);
			} else {
				warnings += '<br>' + Lng.cantLoad[lang] + '<a href="' + url + '">' + url +
					'</a><br>' + Lng.willSavePview[lang];
				$popup('err-files', Lng.loadErrors[lang] + warnings);
				if(imgOnly) {
					return getDataFromImg(el).then(data => tar.addFile(thumbName, data), emptyFn);
				}
			}
			return imgOnly ? null : getDataFromImg(el).then(data => {
				el.src = thumbName;
				tar.addFile(thumbName, data);
			}, () => { el.src = safeName; });

		} else if(imgData && imgData.length > 0) {
			tar.addFile(el.href = el.src = 'data/' + safeName, imgData);
		} else {
			$del(el);
		}
	}), function() {
		var docName = aib.dm + '-' + aib.b.replace(/[\\\/:*?"<>|]/g, '') + '-' + aib.t;
		if(!imgOnly) {
			$q('head', dc).insertAdjacentHTML('beforeend',
				'<script type="text/javascript" src="data/dollscript.js" charset="utf-8"></script>');
			$each($Q('#de-css, #de-css-dynamic, #de-css-user', dc), $del);
			var scriptStr, localData = JSON.stringify({ dm: aib.dm, b: aib.b, t: aib.t });
			if(nav.isES6) {
				scriptStr = '(' + String(de_main_func_inner) + ')(null, null, (x, y) => window.scrollTo(x, y), ' + localData + ');';
			} else {
				scriptStr = '(' + String(de_main_func_outer) + ')(' + localData + ');';
			}
			tar.addString('data/dollscript.js', scriptStr);
			var dt = doc.doctype;
			tar.addString(docName + '.html', '<!DOCTYPE ' + dt.name +
				(dt.publicId ? ' PUBLIC "' + dt.publicId + '"' : dt.systemId ? ' SYSTEM' : '') +
				(dt.systemId ? ' "' + dt.systemId + '"' : '') + '>' + dc.outerHTML);
		}
		downloadBlob(tar.get(), docName + (imgOnly ? '-images.tar' : '.tar'));
		$del($id('de-popup-load-files'));
		Images_.pool = tar = warnings = count = current = imgOnly = progress = counter = null;
	});
	els = Array.from($Q(aib.qPostImg, $q('[de-form]', dc)));
	count += els.length;
	els.forEach(function(el) {
		var imgLink = $parent(el, 'A');
		if(imgLink) {
			var url = imgLink.href;
			if(aib.tiny) {
				url = url.replace(/^.*?\?v=|&.*?$/g, '');
			}
			Images_.pool.run([url, imgLink.getAttribute('download') ||
				url.substring(url.lastIndexOf('/') + 1), el, imgLink]);
		}
	});
	if(!imgOnly) {
		$each($Q('#de-main, .de-parea, .de-post-btns, .de-btn-src, .de-refmap, .de-thread-buttons, ' +
			'.de-video-obj, #de-win-reply, link[rel="alternate stylesheet"], script, ' + aib.qForm, dc), $del);
		$each($Q('a', dc), function(el) {
			var num, tc = el.textContent;
			if(tc[0] === '>' && tc[1] === '>' && (num = +tc.substr(2)) && pByNum.has(num)) {
				el.href = aib.anchor + num;
				if(!el.classList.contains('de-link-pref')) {
					el.className = 'de-link-pref ' + el.className;
				}
			} else {
				el.href = getAbsLink(el.href);
			}
		});
		$each($Q(aib.qRPost, dc), function(post, i) {
			post.setAttribute('de-num', i === 0 ? aib.t : aib.getPNum(post));
		});
		var files = [];
		var urlRegex = new RegExp('^\\/\\/?|^https?:\\/\\/([^\\/]*\.)?' +
			quoteReg(aib.fch ? '4cdn.org' : aib.dm) + '\\/', 'i');
		$each($Q('link, *[src]', dc), function(el) {
			if(els.indexOf(el) !== -1) {
				return;
			}
			var fName, url = el.tagName === 'LINK' ? el.href : el.src;
			if(!urlRegex.test(url)) {
				$del(el);
				return;
			}
			fName = url.substring(url.lastIndexOf('/') + 1).replace(/[\\\/:*?"<>|]/g, '_').toLowerCase();
			if(files.indexOf(fName) !== -1) {
				var temp = url.lastIndexOf('.'),
					ext = url.substring(temp);
				url = url.substring(0, temp);
				fName = fName.substring(0, fName.lastIndexOf('.'));
				for(var i = 0; ; ++i) {
					temp = fName + '(' + i + ')' + ext;
					if(files.indexOf(temp) === -1) {
						break;
					}
				}
				fName = temp;
			}
			files.push(fName);
			Images_.pool.run([url, fName, el, null]);
			count++;
		});
	}
	$popup('load-files', (imgOnly ? Lng.loadImage[lang] : Lng.loadFile[lang]) +
		'<br><progress id="de-loadprogress" value="0" max="' + count +
		'"></progress> <span>1</span>/' + count, true);
	progress = $id('de-loadprogress');
	counter = progress.nextElementSibling;
	Images_.pool.complete();
	els = null;
}
