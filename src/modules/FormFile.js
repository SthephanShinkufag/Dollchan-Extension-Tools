/* ==[ FormFile.js ]==========================================================================================
                                                 FILE INPUTS
                 image/video files in postform: preview, adding by url, drag-n-drop, deleting
=========================================================================================================== */

class Files {
	constructor(form, fileEl) {
		this.filesCount = 0;
		this.fileTr = fileEl.closest(aib.qFormTr);
		this.onchange = null;
		this._form = form;
		this._inputs = [];
		const els = $Q('input[type="file"]', this.fileTr);
		for(let i = 0, len = els.length; i < len; ++i) {
			this._inputs.push(new FileInput(this, els[i]));
		}
		this._files = [];
		this.hideEmpty();
	}
	get rarInput() {
		const value = $bEnd(docBody, '<input type="file" style="display: none;">');
		Object.defineProperty(this, 'rarInput', { value });
		return value;
	}
	get thumbsEl() {
		let value;
		if(aib.multiFile) {
			value = $aEnd(this.fileTr, '<div id="de-file-area"></div>');
		} else {
			value = this._form.txta.closest(aib.qFormTd).previousElementSibling;
			value.innerHTML = `<div style="display: none;">${ value.innerHTML }</div><div></div>`;
			value = value.lastChild;
		}
		Object.defineProperty(this, 'thumbsEl', { value });
		return value;
	}
	changeMode() {
		const isThumbMode = Cfg.fileInputs === 2;
		for(const inp of this._inputs) {
			inp.changeMode(isThumbMode);
		}
		this.hideEmpty();
	}
	clearInputs() {
		for(const inp of this._inputs) {
			inp.clearInp();
		}
		this.hideEmpty();
	}
	hideEmpty() {
		for(let els = this._inputs, i = els.length - 1; i > 0; --i) {
			const inp = els[i];
			if(inp.hasFile) {
				break;
			} else if(els[i - 1].hasFile) {
				inp.showInp();
				break;
			}
			inp.hideInp();
		}
	}
}

class FileInput {
	constructor(parent, el) {
		this.extraFile = null;
		this.hasFile = false;
		this.imgFile = null;
		this._input = el;
		this._isTxtEditable = false;
		this._isTxtEditName = false;
		this._mediaEl = null;
		this._parent = parent;
		this._rarMsg = null;
		this._spoilEl = $q(aib.qFormSpoiler, el.parentNode);
		this._thumb = null;
		this._utils = $add(`<div class="de-file-utils">
			<span class="de-file-btn-rar" title="${ Lng.helpAddFile[lang] }" style="display: none;">
				<svg><use xlink:href="#de-symbol-file-rar"/></svg></span>
			<input class="de-file-spoil" type="checkbox" title="` +
				`${ Lng.spoilFile[lang] }" style="display: none;">
			<span class="de-file-btn-txt" title="${ Lng.addManually[lang] }">
				<svg><use xlink:href="#de-symbol-file-txt"/></svg></span>
			<span class="de-file-btn-ren" title="${ Lng.renameFile[lang] }" style="display: none;">
				<svg><use xlink:href="#de-symbol-file-ren"/></svg></span>
			<span class="de-file-btn-del" title="${ Lng.removeFile[lang] }" style="display: none;">
				<svg><use xlink:href="#de-symbol-file-del"/></svg></span>
		</div>`);
		[this._btnRar, this._btnSpoil, this._btnTxt, this._btnRen, this._btnDel] = [...this._utils.children];
		this._utils.addEventListener('click', this);
		this._txtWrap = $add(`<span class="de-file-txt-wrap">
			<input type="text" name="de-file-txt" class="de-file-txt-input de-file-txt-noedit" title="` +
				`${ Lng.youCanDrag[lang] }" placeholder="${ Lng.dropFileHere[lang] }">
			<input type="button" class="de-file-txt-add" value="+" title="` +
				`${ Lng.add[lang] }" style="display: none;"></span>`);
		[this._txtInput, this._txtAddBtn] = [...this._txtWrap.children];
		this._txtWrap.addEventListener('click', this);
		this._toggleDragEvents(this._txtWrap, true);
		el.obj = this;
		el.classList.add('de-file-input');
		el.addEventListener('change', this);
		if(el.files?.[0]) {
			this._removeFile();
		}
		if(Cfg.fileInputs) {
			$hide(el);
			if(aib.multiFile) {
				this._input.setAttribute('multiple', true);
			}
		}
		if(FileInput._isThumbMode) {
			this._initThumbs();
		} else {
			this._initUtils();
		}
	}
	async addUrlFile(url, file = null) {
		if(!url) {
			return Promise.reject(new Error('URL is null'));
		}
		$popup('file-loading', Lng.loading[lang], true);
		return await ContentLoader.loadImgData(url, false).then(data => {
			if(file) {
				deWindow.URL.revokeObjectURL(url);
			}
			if(!data) {
				$popup('file-loading', Lng.cantLoad[lang] + ' URL: ' + url);
				return;
			}
			closePopup('file-loading');
			this._isTxtEditable = this._isTxtEditName = false;
			let name = file?.name || getFileName(url);
			const type = file?.type || getFileMime(name);
			if(!type || name.includes('?')) {
				let ext;
				switch((data[0] << 8) | data[1]) {
				case 0xFFD8: ext = 'jpg'; break;
				case 0x8950: ext = 'png'; break;
				case 0x4749: ext = 'gif'; break;
				case 0x1A45: ext = 'webm'; break;
				default: ext = '';
				}
				if(ext) {
					name = name.split('?').shift() + '.' + ext;
				}
			}
			this.imgFile = { data: data.buffer, name, type: type || getFileMime(name) };
			if(!file) {
				file = new Blob([data], { type: this.imgFile.type });
				file.name = name;
			}
			this._parent._files[this._parent._inputs.indexOf(this)] = file;
			DollchanAPI.notify('filechange', this._parent._files);
			if(FileInput._isThumbMode) {
				$hide(this._txtWrap);
			}
			this._onFileChange(true);
		});
	}
	changeMode(showThumbs) {
		$toggle(this._input, !Cfg.fileInputs);
		$toggleAttr(this._input, 'multiple', true, aib.multiFile && Cfg.fileInputs);
		$toggle(this._btnRen, Cfg.fileInputs && this.hasFile);
		if(!(showThumbs ^ !!this._thumb)) {
			return;
		}
		if(showThumbs) {
			this._initThumbs();
			return;
		}
		this._initUtils();
		$show(this._parent.fileTr);
		$show(this._txtWrap);
		if(this._mediaEl) {
			deWindow.URL.revokeObjectURL(this._mediaEl.src);
		}
		this._toggleDragEvents(this._thumb, false);
		$q('.de-file-txt-area')?.remove();
		this._thumb.remove();
		this._thumb = this._mediaEl = null;
	}
	clearInp() {
		if(FileInput._isThumbMode) {
			this._thumb.classList.add('de-file-off');
			if(this._mediaEl) {
				deWindow.URL.revokeObjectURL(this._mediaEl.src);
				this._mediaEl.parentNode.title = Lng.youCanDrag[lang];
				this._mediaEl.remove();
				this._mediaEl = null;
			}
		}
		if(this._btnDel) {
			this._toggleDelBtn(false);
			$hide(this._btnSpoil);
			if(this._spoilEl) {
				this._spoilEl.checked = this._btnSpoil.checked = false;
			}
			$hide(this._btnRar);
			$hide(this._txtAddBtn);
			this._rarMsg?.remove();
			if(FileInput._isThumbMode) {
				$hide(this._txtWrap);
			}
			this._txtInput.value = '';
			this._txtInput.classList.add('de-file-txt-noedit');
			this._txtInput.placeholder = Lng.dropFileHere[lang];
		}
		this.extraFile = this.imgFile = null;
		this._isTxtEditable = this._isTxtEditName = false;
		this._changeFilesCount(-1);
		this._removeFile();
	}
	handleEvent(e) {
		const el = e.target;
		const thumb = this._thumb;
		const isThumb = el === thumb || el.className === 'de-file-img';
		switch(e.type) {
		case 'change': {
			const inpArray = this._parent._inputs;
			const curInpIdx = inpArray.indexOf(this);
			const filesLen = el.files.length;
			if(filesLen > 1) {
				const allowedLen = Math.min(filesLen, inpArray.length - curInpIdx);
				let j = allowedLen;
				for(let i = 0; i < allowedLen; ++i) {
					FileInput._readDroppedFile(inpArray[curInpIdx + i], el.files[i]).then(() => {
						if(!--j) { // Clear original file input after all allowed files will be read.
							this._removeFileHelper();
						}
					});
					this._parent._files[curInpIdx + i] = el.files[i];
				}
			} else {
				if(filesLen > 0) {
					setTimeout(() => this._onFileChange(false), 20);
					this._parent._files[curInpIdx] = el.files[0];
				} else {
					this.clearInp();
					delete this._parent._files[curInpIdx];
				}
			}
			DollchanAPI.notify('filechange', this._parent._files);
			break;
		}
		case 'click': {
			const parent = el.parentNode;
			if(isThumb) {
				this._input.click();
			} else if(parent === this._btnDel) {
				this.clearInp();
				this._parent.hideEmpty();
				delete this._parent._files[this._parent._inputs.indexOf(this)];
				DollchanAPI.notify('filechange', this._parent._files);
			} else if(parent === this._btnRar) {
				this._addRarJpeg();
			} else if(parent === this._btnRen) {
				const isShow = this._isTxtEditName = !this._isTxtEditName;
				this._isTxtEditable = !this._isTxtEditable;
				if(FileInput._isThumbMode) {
					$toggle(this._txtWrap, isShow);
				}
				$toggle(this._txtAddBtn, isShow);
				this._txtInput.classList.toggle('de-file-txt-noedit', !isShow);
				if(isShow) {
					this._txtInput.focus();
				}
			} else if(parent === this._btnTxt) {
				this._toggleDelBtn(this._isTxtEditable = true);
				$show(this._txtAddBtn);
				if(FileInput._isThumbMode) {
					$toggle(this._txtWrap);
				}
				this._txtInput.classList.remove('de-file-txt-noedit');
				this._txtInput.placeholder = Lng.enterTheLink[lang];
				this._txtInput.focus();
			} else if(el === this._btnSpoil) {
				this._spoilEl.checked = this._btnSpoil.checked;
				return;
			} else if(el === this._txtAddBtn) {
				if(this._isTxtEditName) {
					if(FileInput._isThumbMode) {
						$hide(this._txtWrap);
					}
					$hide(this._txtAddBtn);
					this._txtInput.classList.add('de-file-txt-noedit');
					this._isTxtEditable = this._isTxtEditName = false;
					const newName = this._txtInput.value;
					if(!newName) {
						this._txtInput.value = this.imgFile ? this.imgFile.name : this._input.files[0].name;
						return;
					}
					if(this.imgFile) {
						this.imgFile.isConstName = true;
						this.imgFile.name = newName;
						if(FileInput._isThumbMode) {
							this._addThumbTitle(newName, this.imgFile.data.byteLength);
						}
						return;
					}
					const file = this._input.files[0];
					readFile(file).then(({ data }) => {
						this.imgFile = { data, name: newName, type: file.type, isConstName: true };
						this._removeFileHelper(); // Clear the original file
						if(FileInput._isThumbMode) {
							this._addThumbTitle(newName, data.byteLength);
						}
					});
					return;
				} else {
					this.addUrlFile(this._txtInput.value);
				}
			} else if(el === this._txtInput && !this._isTxtEditable) {
				this._input.click();
				this._txtInput.blur();
			}
			break;
		}
		case 'dragenter':
			if(isThumb) {
				thumb.classList.add('de-file-drag');
			}
			return;
		case 'dragleave':
			if(isThumb && el.classList.contains('de-file-img')) {
				thumb.classList.remove('de-file-drag');
			}
			return;
		case 'drop': {
			const dt = e.dataTransfer;
			if(!isThumb && el !== this._txtInput) {
				return;
			}
			const filesLen = dt.files.length;
			if(filesLen) {
				const inpArray = this._parent._inputs;
				const inpLen = inpArray.length;
				for(let i = inpArray.indexOf(this), j = 0; i < inpLen && j < filesLen; ++i, ++j) {
					FileInput._readDroppedFile(inpArray[i], dt.files[j]);
					this._parent._files[i] = dt.files[j];
				}
				DollchanAPI.notify('filechange', this._parent._files);
			} else {
				this.addUrlFile(dt.getData('text/plain'));
			}
			if(FileInput._isThumbMode) {
				setTimeout(() => thumb.classList.remove('de-file-drag'), 10);
			}
		}
		}
		e.preventDefault();
		e.stopPropagation();
	}
	hideInp() {
		if(FileInput._isThumbMode) {
			this._toggleDelBtn(false);
			$hide(this._thumb);
			$hide(this._txtWrap);
		}
		$hide(this._wrap);
	}
	showInp() {
		if(FileInput._isThumbMode) {
			$show(this._thumb);
		}
		$show(this._wrap);
	}

	static get _isThumbMode() {
		return Cfg.fileInputs === 2;
	}
	static _readDroppedFile(inputObj, file) {
		return readFile(file).then(({ data }) => {
			inputObj.imgFile = { data, name: file.name, type: file.type };
			inputObj.showInp();
			inputObj._onFileChange(true);
		});
	}
	get _wrap() {
		return aib.multiFile ? this._input.parentNode : this._input;
	}
	_addNewThumb(fileData, fileName, fileType, fileSize) {
		let el = this._thumb;
		el.classList.remove('de-file-off');
		el = el.firstChild.firstChild;
		el.title = `${ fileName }, ${ (fileSize / 1024).toFixed(2) }KB`;
		this._mediaEl = el = $aBegin(el, fileType.startsWith('video/') ?
			'<video class="de-file-img" loop autoplay muted src=""></video>' :
			'<img class="de-file-img" src="">');
		el.src = deWindow.URL.createObjectURL(new Blob([fileData]));
		if((el = el.nextSibling)) {
			deWindow.URL.revokeObjectURL(el.src);
			el.remove();
		}
	}
	_addRarJpeg() {
		const el = this._parent.rarInput;
		el.onchange = e => {
			$hide(this._btnRar);
			const myBtn = this._rarMsg = $aBegin(this._utils,
				'<span><svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg></span>');
			const file = e.target.files[0];
			readFile(file).then(({ data }) => {
				if(this._rarMsg === myBtn) {
					myBtn.className = 'de-file-rarmsg';
					const origFileName = this.imgFile ? this.imgFile.name : this._input.files[0].name;
					myBtn.title = origFileName + ' + ' + file.name;
					myBtn.textContent = getFileExt(origFileName) + ' + ' + getFileExt(file.name);
					this.extraFile = data;
				}
			});
		};
		el.click();
	}
	_addThumbTitle(name, size) {
		this._thumb.firstChild.firstChild.title = `${ name }, ${ (size / 1024).toFixed(2) }KB`;
	}
	_changeFilesCount(val) {
		this._parent.filesCount = Math.max(this._parent.filesCount + val, 0);
		if(aib.dobrochan) {
			$id('post_files_count').value = this._parent.filesCount + 1;
		}
	}
	_initThumbs() {
		const { fileTr } = this._parent;
		$hide(fileTr);
		$hide(this._txtWrap);
		const isTr = fileTr.tagName.toLowerCase() === 'tr';
		const txtArea = $q('.de-file-txt-area') || $bBegin(fileTr, isTr ?
			'<tr class="de-file-txt-area"><td class="postblock"></td><td></td></tr>' :
			'<div class="de-file-txt-area"></div>');
		(isTr ? txtArea.lastChild : txtArea).append(this._txtWrap);
		this._thumb = $bEnd(this._parent.thumbsEl,
			`<div class="de-file de-file-off"><div class="de-file-img"><div class="de-file-img" title="${
				Lng.youCanDrag[lang] }"></div></div></div>`);
		['click', 'dragenter'].forEach(e => this._thumb.addEventListener(e, this));
		this._thumb.append(this._utils);
		this._toggleDragEvents(this._thumb, true);
		if(this.hasFile) {
			this._showFileThumb();
		}
	}
	_initUtils() {
		this._input.parentNode.classList.add('de-file-wrap');
		this._input.before(this._txtWrap);
		this._input.after(this._utils);
	}
	_onFileChange(hasImgFile) {
		this._txtInput.value = hasImgFile ? this.imgFile.name : this._input.files[0].name;
		if(!hasImgFile) {
			this.imgFile = null;
		}
		if(this._parent.onchange) {
			this._parent.onchange();
		}
		if(FileInput._isThumbMode) {
			this._showFileThumb();
		}
		if(this.hasFile) {
			this.extraFile = null;
		} else {
			this.hasFile = true;
			this._changeFilesCount(+1);
			this._toggleDelBtn(true);
			$hide(this._txtAddBtn);
			if(FileInput._isThumbMode) {
				$hide(this._txtWrap);
			}
			if(this._spoilEl) {
				this._btnSpoil.checked = this._spoilEl.checked;
				$show(this._btnSpoil);
			}
			this._txtInput.classList.add('de-file-txt-noedit');
			this._txtInput.placeholder = Lng.dropFileHere[lang];
		}
		this._parent.hideEmpty();
		if(!nav.isPresto && !aib._4chan &&
			/^image\/(?:png|jpeg)$/.test(hasImgFile ? this.imgFile.type : this._input.files[0].type)
		) {
			this._rarMsg?.remove();
			$show(this._btnRar);
		}
	}
	_removeFile() {
		this._removeFileHelper();
		this.hasFile = false;
		if(this._parent._files) {
			delete this._parent._files[this._parent._inputs.indexOf(this)];
		}
	}
	_removeFileHelper() {
		const oldEl = this._input;
		const newEl = $aEnd(oldEl, oldEl.outerHTML);
		oldEl.removeEventListener('change', this);
		newEl.addEventListener('change', this);
		newEl.obj = this;
		this._input = newEl;
		oldEl.remove();
	}
	_showFileThumb() {
		const { imgFile } = this;
		if(imgFile) {
			this._addNewThumb(imgFile.data, imgFile.name, imgFile.type, imgFile.data.byteLength);
			return;
		}
		const file = this._input.files[0];
		if(file) {
			readFile(file).then(({ data }) => {
				if(this._input.files[0] === file) {
					this._addNewThumb(data, file.name, file.type, file.size);
				}
			});
		}
	}
	_toggleDelBtn(isShow) {
		$toggle(this._btnDel, isShow);
		$toggle(this._btnRen, Cfg.fileInputs && isShow && this.hasFile);
		$toggle(this._btnTxt, !isShow);
	}
	_toggleDragEvents(el, isAdd) {
		const name = isAdd ? 'addEventListener' : 'removeEventListener';
		el[name]('dragover', e => e.preventDefault());
		['dragenter', 'dragleave', 'drop'].forEach(e => el[name](e, this));
	}
}
