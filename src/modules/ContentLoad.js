/* ==[ ContentLoad.js ]=======================================================================================
                                             CONTENT DOWNLOADING
                     images/video preloading, rarjpeg detecting, thread/images downloading
=========================================================================================================== */

const ContentLoader = {
	afterFn   : null,
	isLoading : false,
	popupId   : null,
	downloadThread(imgOnly) {
		let progress, counter, current = 1,
			warnings = '',
			tar = new TarBuilder();
		const dc = imgOnly ? doc : doc.documentElement.cloneNode(true);
		let els = [...$Q(aib.qPostImg, $q('[de-form]', dc))];
		let count = els.length;
		this._thrPool = new TasksPool(4, (num, data) => this.loadImgData(data[0]).then(imgData => {
			const [url, fName, el, imgLink] = data;
			let safeName = fName.replace(/[\\/:*?"<>|]/g, '_');
			progress.value = counter.innerHTML = current++;
			if(imgLink) {
				let thumbName = safeName.replace(/\.[a-z]+$/, '.png');
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
					warnings += `<br>${ Lng.cantLoad[lang] } <a href="${ url }">${ url }</a>` +
						`<br>${ Lng.willSavePview[lang] }`;
					$popup('err-files', Lng.loadErrors[lang] + warnings);
					if(imgOnly) {
						return this._getDataFromImg(el).then(data => tar.addFile(thumbName, data), emptyFn);
					}
				}
				return imgOnly ? null : this._getDataFromImg(el).then(data => {
					el.src = thumbName;
					tar.addFile(thumbName, data);
				}, () => (el.src = safeName));
			} else if(imgData && imgData.length > 0) {
				tar.addFile(el.href = el.src = 'data/' + safeName, imgData);
			} else {
				$del(el);
			}
		}), () => {
			const docName = `${ aib.dm }-${ aib.b.replace(/[\\/:*?"<>|]/g, '') }-${ aib.t }`;
			if(!imgOnly) {
				$q('head', dc).insertAdjacentHTML('beforeend',
					'<script type="text/javascript" src="data/dollscript.js" charset="utf-8"></script>');
				$q('body', dc).classList.add('de-mode-local');
				$each($Q('#de-css, #de-css-dynamic, #de-css-user', dc), $del);
				tar.addString('data/dollscript.js', `${ nav.isESNext ?
					`(${ String(deMainFuncInner) })(null, null, (x, y) => window.scrollTo(x, y), ` :
					`(${ String(/* global deMainFuncOuter */ deMainFuncOuter) })(`
				}${ JSON.stringify({ dm: aib.dm, b: aib.b, t: aib.t }) });`);
				const dt = doc.doctype;
				tar.addString(docName + '.html', '<!DOCTYPE ' + dt.name +
					(dt.publicId ? ` PUBLIC "${ dt.publicId }"` : dt.systemId ? ' SYSTEM' : '') +
					(dt.systemId ? ` "${ dt.systemId }"` : '') + '>' + dc.outerHTML);
			}
			downloadBlob(tar.get(), docName + (imgOnly ? '-images.tar' : '.tar'));
			$del($id('de-popup-load-files'));
			this._thrPool = tar = warnings = count = current = imgOnly = progress = counter = null;
		});
		els.forEach(el => {
			const imgLink = $parent(el, 'A');
			if(imgLink) {
				const url = imgLink.href;
				this._thrPool.runTask([url, imgLink.getAttribute('download') ||
					url.substring(url.lastIndexOf('/') + 1), el, imgLink]);
			}
		});
		if(!imgOnly) {
			$each($Q('#de-main, .de-parea, .de-post-btns, .de-btn-src, .de-refmap, .de-thr-buttons, ' +
				'.de-video-obj, #de-win-reply, link[rel="alternate stylesheet"], script, ' +
				aib.qForm, dc), $del);
			$each($Q('a', dc), el => {
				let num;
				const tc = el.textContent;
				if(tc[0] === '>' && tc[1] === '>' && (num = +tc.substr(2)) && pByNum.has(num)) {
					el.href = aib.anchor + num;
					if(!el.classList.contains('de-link-pref')) {
						el.className = 'de-link-pref ' + el.className;
					}
				} else {
					el.href = getAbsLink(el.href);
				}
			});
			$each($Q(aib.qRPost, dc), (el, i) => el.setAttribute('de-num', i ? aib.getPNum(el) : aib.t));
			const files = [];
			const urlRegex = new RegExp(`^\\/\\/?|^https?:\\/\\/([^\\/]*\\.)?${
				quoteReg(aib.fch ? '4cdn.org' : aib.dm) }\\/`, 'i');
			$each($Q('link, *[src]', dc), el => {
				if(els.indexOf(el) !== -1) {
					return;
				}
				let url = el.tagName === 'LINK' ? el.href : el.src;
				if(!urlRegex.test(url)) {
					$del(el);
					return;
				}
				let fName = url.substring(url.lastIndexOf('/') + 1)
					.replace(/[\\/:*?"<>|]/g, '_').toLowerCase();
				if(files.indexOf(fName) !== -1) {
					let temp = url.lastIndexOf('.');
					const ext = url.substring(temp);
					url = url.substring(0, temp);
					fName = fName.substring(0, fName.lastIndexOf('.'));
					for(let i = 0; ; ++i) {
						temp = `${ fName }(${ i })${ ext }`;
						if(files.indexOf(temp) === -1) {
							break;
						}
					}
					fName = temp;
				}
				files.push(fName);
				this._thrPool.runTask([url, fName, el, null]);
				count++;
			});
		}
		$popup('load-files', `${ imgOnly ? Lng.loadImage[lang] : Lng.loadFile[lang] }:<br><progress ` +
			`id="de-loadprogress" value="0" max="${ count }"></progress> <span>1</span>/${ count }`, true);
		progress = $id('de-loadprogress');
		counter = progress.nextElementSibling;
		this._thrPool.completeTasks();
		els = null;
	},
	loadImgData: (url, repeatOnError = true) => $ajax(url, {
		responseType     : 'arraybuffer',
		overrideMimeType : 'text/plain; charset=x-user-defined'
	}, url.startsWith('blob')).then(xhr => {
		if(xhr.status === 0 && xhr.responseType === 'arraybuffer') {
			return new Uint8Array(xhr.response);
		}
		if('response' in xhr) {
			try {
				return nav.getUnsafeUint8Array(xhr.response);
			} catch(err) {}
		}
		const txt = xhr.responseText;
		return new Uint8Array(txt.length).map((val, i) => txt.charCodeAt(i) & 0xFF);
	}, err => err.code !== 404 && repeatOnError ? ContentLoader.loadImgData(url, false) : null),
	preloadImages(data) {
		if(!Cfg.preLoadImgs && !Cfg.openImgs && !isPreImg) {
			return;
		}
		let preloadPool;
		const isPost = data instanceof AbstractPost;
		const els = $Q(aib.qPostImg, isPost ? data.el : data);
		const len = els.length;
		if(isPreImg || Cfg.preLoadImgs) {
			let cImg = 1;
			const mReqs = isPost ? 1 : 4;
			const rarJpgFinder = (isPreImg || Cfg.findImgFile) && new WorkerPool(mReqs, this._detectImgFile,
				err => console.error('File detector error:', `line: ${ err.lineno } - ${ err.message }`));
			preloadPool = new TasksPool(mReqs, (num, data) => this.loadImgData(data[0]).then(imageData => {
				const [url, imgLink, iType, isRepToOrig, el, isVideo] = data;
				if(imageData) {
					const fName = url.substring(url.lastIndexOf('/') + 1);
					const nameLink = $q(aib.qImgNameLink, aib.getImgWrap(el));
					imgLink.setAttribute('download', fName);
					if(!Cfg.imgNames) {
						nameLink.setAttribute('download', fName);
						nameLink.setAttribute('de-href', nameLink.href);
					}
					imgLink.href = nameLink.href =
						window.URL.createObjectURL(new Blob([imageData], { type: iType }));
					if(isVideo) {
						el.setAttribute('de-video', '');
					}
					if(isRepToOrig) {
						el.src = imgLink.href;
					}
					if(rarJpgFinder) {
						rarJpgFinder.runWorker(imageData.buffer, [imageData.buffer],
							info => this._addImgFileIcon(nameLink, fName, info));
					}
				}
				if(this.popupId) {
					$popup(this.popupId, `${ Lng.loadImage[lang] }: ${ cImg }/${ len }`, true);
				}
				cImg++;
			}), () => {
				this.isLoading = false;
				if(this.afterFn) {
					this.afterFn();
					this.afterFn = this.popupId = null;
				}
				if(rarJpgFinder) {
					rarJpgFinder.clearWorkers();
				}
			});
			this.isLoading = true;
		}
		for(let i = 0; i < len; ++i) {
			const el = els[i];
			const imgLink = $parent(el, 'A');
			if(!imgLink) {
				continue;
			}
			let isRepToOrig = !!Cfg.openImgs;
			const url = imgLink.href;
			const type = getFileType(url);
			const isVideo = type && (type === 'video/webm' || type === 'video/mp4' || type === 'video/ogv');
			if(!type || isVideo && Cfg.preLoadImgs === 2) {
				continue;
			} else if(type === 'image/gif') {
				isRepToOrig &= Cfg.openImgs !== 3;
			} else {
				if(isVideo) {
					isRepToOrig = false;
				}
				isRepToOrig &= Cfg.openImgs !== 2;
			}
			if(preloadPool) {
				preloadPool.runTask([url, imgLink, type, isRepToOrig, el, isVideo]);
			} else if(isRepToOrig) {
				el.src = url;
			}
		}
		if(preloadPool) {
			preloadPool.completeTasks();
		}
	},

	_canvas  : null,
	_thrPool : null,
	_addImgFileIcon(nameLink, fName, info) {
		const { type } = info;
		if(typeof type === 'undefined') {
			return;
		}
		const ext = ['7z', 'zip', 'rar', 'ogg', 'mp3'][type];
		nameLink.insertAdjacentHTML('afterend', `<a href="${ window.URL.createObjectURL(
			new Blob([nav.getUnsafeUint8Array(info.data, info.idx)], {
				type: [
					'application/x-7z-compressed',
					'application/zip',
					'application/x-rar-compressed',
					'audio/ogg',
					'audio/mpeg'][type]
			})
		) }" class="de-img-${ type > 2 ? 'audio' : 'arch' }" title="${ Lng.downloadFile[lang] }" download="${
			fName.substring(0, fName.lastIndexOf('.')) }.${ ext }">.${ ext }</a>`);
	},
	// Finds built-in files in jpg and png
	_detectImgFile: arrBuf => {
		let i, j;
		const dat = new Uint8Array(arrBuf);
		let len = dat.length;
		/* JPG [ff d8 ff e0] = [яШяа] */
		if(dat[0] === 0xFF && dat[1] === 0xD8) {
			for(i = 0, j = 0; i < len - 1; ++i) {
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
			for(i = 0; i < len - 7; ++i) {
				/* PNG end [49 45 4e 44 ae 42 60 82] */
				if(dat[i] === 0x49 && dat[i + 1] === 0x45 && dat[i + 2] === 0x4E && dat[i + 3] === 0x44) {
					i += 8;
					break;
				}
			}
		} else {
			return {};
		}
		if(i === len || len - i <= 60) { // Ignore small files (<60 bytes)
			return {};
		}
		for(len = i + 90; i < len; ++i) {
			/* 7Z [37 7a bc af] = [7zјЇ] */
			if(dat[i] === 0x37 && dat[i + 1] === 0x7A && dat[i + 2] === 0xBC) {
				return { type: 0, idx: i, data: arrBuf };
			/* ZIP [50 4b 03 04] = [PK..] */
			} else if(dat[i] === 0x50 && dat[i + 1] === 0x4B && dat[i + 2] === 0x03) {
				return { type: 1, idx: i, data: arrBuf };
			/* RAR [52 61 72 21] = [Rar!] */
			} else if(dat[i] === 0x52 && dat[i + 1] === 0x61 && dat[i + 2] === 0x72) {
				return { type: 2, idx: i, data: arrBuf };
			/* OGG [4f 67 67 53] = [OggS] */
			} else if(dat[i] === 0x4F && dat[i + 1] === 0x67 && dat[i + 2] === 0x67) {
				return { type: 3, idx: i, data: arrBuf };
			/* MP3 [0x49 0x44 0x33] = [ID3] */
			} else if(dat[i] === 0x49 && dat[i + 1] === 0x44 && dat[i + 2] === 0x33) {
				return { type: 4, idx: i, data: arrBuf };
			}
		}
		return {};
	},
	_getDataFromImg(el) {
		try {
			const cnv = this._canvas || (this._canvas = doc.createElement('canvas'));
			cnv.width = el.width;
			cnv.height = el.height;
			cnv.getContext('2d').drawImage(el, 0, 0);
			return Promise.resolve(new Uint8Array(atob(cnv.toDataURL('image/png').split(',')[1])
				.split('').map(a => a.charCodeAt())));
		} catch(err) {
			return this.loadImgData(el.src);
		}
	}
};
