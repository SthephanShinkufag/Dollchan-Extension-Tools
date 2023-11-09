/* ==[ ContentLoad.js ]=======================================================================================
                                             CONTENT DOWNLOADING
                     images/video preloading, rarjpeg detecting, thread/images downloading
=========================================================================================================== */

const ContentLoader = {
	afterFn   : null,
	isLoading : false,
	popupId   : null,
	downloadThread(imgOnly) {
		let progress, counter;
		let current = 1;
		let warnings = '';
		let tar = new TarBuilder();
		const dc = imgOnly ? doc : doc.documentElement.cloneNode(true);
		let els = [...$Q(aib.qPostImg, $q('[de-form]', dc))];
		let count = els.length;
		const delSymbols = (str, r = '') => str.replace(/[\\/:*?"<>|]/g, r);
		this._thrPool = new TasksPool(4, (num, data) => this.loadImgData(data[0]).then(imgData => {
			const [url, fName, el, parentLink] = data;
			let safeName = delSymbols(fName, '_');
			progress.value = counter.innerHTML = current++;
			if(parentLink) {
				let thumbName = safeName.replace(/\.[a-z]+$/, '.png');
				if(imgOnly) {
					thumbName = 'thumb-' + thumbName;
				} else {
					thumbName = 'thumbs/' + thumbName;
					safeName = imgData ? 'images/' + safeName : thumbName;
					parentLink.href = getImgNameLink(el).href = safeName;
				}
				if(imgData) {
					tar.addFile(safeName, imgData);
				} else {
					warnings += `<br>${ Lng.cantLoad[lang] } <a href="${ url }">${ url }</a>` +
						`<br>${ Lng.willSavePview[lang] }`;
					$popup('err-files', Lng.loadErrors[lang] + warnings);
					if(imgOnly) {
						return this.getDataFromImg(el).then(data =>
							tar.addFile(thumbName, data), Function.prototype);
					}
				}
				return imgOnly ? null : this.getDataFromImg(el).then(data => {
					el.src = thumbName;
					tar.addFile(thumbName, data);
				}, () => (el.src = safeName));
			} else if(imgData?.length) {
				tar.addFile(el.href = el.src = 'data/' + safeName, imgData);
			} else {
				el.remove();
			}
		}), () => {
			const docName = `${ aib.domain }-${ delSymbols(aib.b) }-${ aib.t }`;
			if(!imgOnly) {
				$q('head', dc).insertAdjacentHTML('beforeend',
					'<script type="text/javascript" src="data/dollscript.js" charset="utf-8"></script>');
				const dcBody = $q('body', dc);
				dcBody.classList.remove('de-runned');
				dcBody.classList.add('de-mode-local');
				$delAll('#de-css, #de-css-dynamic, #de-css-user', dc);
				tar.addString('data/dollscript.js', `${ nav.isESNext ?
					`(${ String(deMainFuncInner) })(window, null, (x, y) => window.scrollTo(x, y), ` :
					`(${ String(/* global deMainFuncOuter */ deMainFuncOuter) })(`
				}${ JSON.stringify({ domain: aib.domain, b: aib.b, t: aib.t }) });`);
				const dt = doc.doctype;
				tar.addString(docName + '.html', '<!DOCTYPE ' + dt.name +
					(dt.publicId ? ` PUBLIC "${ dt.publicId }"` : dt.systemId ? ' SYSTEM' : '') +
					(dt.systemId ? ` "${ dt.systemId }"` : '') + '>' + dc.outerHTML);
			}
			const title = delSymbols(Thread.first.op.title.trim());
			downloadBlob(tar.get(), `${ docName }${ imgOnly ? '-images' : '' }${
				title ? ' - ' + title : '' }.tar`);
			closePopup('load-files');
			this._thrPool = tar = warnings = count = current = imgOnly = progress = counter = null;
		});
		els.forEach(el => {
			const parentLink = el.closest('a');
			if(parentLink) {
				const url = parentLink.href;
				this._thrPool.runTask(
					[url, parentLink.getAttribute('download') || getFileName(url), el, parentLink]);
			}
		});
		if(!imgOnly) {
			$delAll('.de-btn-img, #de-main, .de-parea, .de-post-btns, .de-refmap, .de-thr-buttons, ' +
				'.de-video-obj, #de-win-reply, link[rel="alternate stylesheet"], script, ' + aib.qForm, dc);
			$Q('a', dc).forEach(el => {
				let num;
				const tc = el.textContent;
				if(tc[0] === '>' && tc[1] === '>' && (num = parseInt(tc.substr(2), 10)) && pByNum.has(num)) {
					el.href = aib.anchor + num;
					if(!el.classList.contains('de-link-postref')) {
						el.className = 'de-link-postref ' + el.className;
					}
				} else {
					el.href = aib.getAbsLink(el.href);
				}
			});
			$Q(aib.qPost, dc).forEach((el, i) => el.setAttribute('de-num', i ? aib.getPNum(el) : aib.t));
			const files = [];
			const urlRegex = new RegExp(`^\\/\\/?|^https?:\\/\\/([^\\/]*\\.)?${
				escapeRegExp(aib.domain) }\\/`, 'i');
			$Q('link, *[src]', dc).forEach(el => {
				if(els.indexOf(el) !== -1) {
					return;
				}
				let url = el.tagName.toLowerCase() === 'link' ? el.href : el.src;
				if(!urlRegex.test(url)) {
					el.remove();
					return;
				}
				let fName = delSymbols(getFileName(url).replace(/(#|\?).*?$/, ''), '_').toLowerCase();
				if(files.indexOf(fName) !== -1) {
					let temp = url.lastIndexOf('.');
					const ext = url.substring(temp);
					url = url.substring(0, temp);
					fName = cutFileExt(fName);
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
	getDataFromCanvas: el =>
		new Uint8Array(atob(el.toDataURL('image/png').split(',')[1]).split('').map(a => a.charCodeAt())),
	getDataFromImg(el) {
		if(el.getAttribute('loading') === 'lazy') {
			return this.loadImgData(el.src);
		}
		try {
			const cnv = this._canvas || (this._canvas = doc.createElement('canvas'));
			cnv.width = el.width || el.videoWidth;
			cnv.height = el.height || el.videoHeight;
			cnv.getContext('2d').drawImage(el, 0, 0);
			return Promise.resolve(this.getDataFromCanvas(cnv));
		} catch(err) {
			return this.loadImgData(el.src);
		}
	},
	loadImgData: (url, repeatOnError = true) => $ajax(
		url, { responseType: 'arraybuffer' }, !url.startsWith('blob')
	).then(xhr => {
		if('response' in xhr) {
			try {
				return new Uint8Array(xhr.response);
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
				const [url, parentLink, iType, isRepToOrig, el, isVideo] = data;
				if(imageData) {
					const fName = decodeURIComponent(getFileName(url));
					const nameLink = getImgNameLink(el);
					parentLink.setAttribute('download', fName);
					if(!Cfg.imgNames) {
						nameLink.setAttribute('download', fName);
						nameLink.setAttribute('de-href', nameLink.href);
					}
					parentLink.href = nameLink.href =
						deWindow.URL.createObjectURL(new Blob([imageData], { type: iType }));
					if(isVideo) {
						el.setAttribute('de-video', '');
					}
					if(isRepToOrig) {
						el.src = parentLink.href;
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
			const imgEl = els[i];
			const parentLink = imgEl.closest('a');
			if(!parentLink) {
				continue;
			}
			let isRepToOrig = !!Cfg.openImgs;
			const url = aib.getImgSrcLink(imgEl).getAttribute('href');
			const type = getFileMime(url);
			const isVideo = type && (type === 'video/webm' || type === 'video/mp4' ||
				type === 'video/quicktime' || type === 'video/ogv');
			if(!type || isVideo && Cfg.preLoadImgs === 2) {
				continue;
			} else if($q('img[src*="/spoiler"]', parentLink)) {
				isRepToOrig = false;
			} else if(type === 'image/gif') {
				isRepToOrig &= Cfg.openImgs !== 3;
			} else {
				if(isVideo) {
					isRepToOrig = false;
				}
				isRepToOrig &= Cfg.openImgs !== 2;
			}
			if(preloadPool) {
				preloadPool.runTask([url, parentLink, type, isRepToOrig, imgEl, isVideo]);
			} else if(isRepToOrig) {
				imgEl.src = url;
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
		nameLink.insertAdjacentHTML('afterend', `<a href="${ deWindow.URL.createObjectURL(
			new Blob([new Uint8Array(info.data, info.idx)], {
				type: [
					'application/x-7z-compressed',
					'application/zip',
					'application/x-rar-compressed',
					'audio/ogg',
					'audio/mpeg'][type]
			})
		) }" class="de-img-${ type > 2 ? 'audio' : 'arch' }" title="${
			Lng.downloadFile[lang] }" download="${ cutFileExt(fName) }.${ ext }">.${ ext }</a>`);
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
	}
};
