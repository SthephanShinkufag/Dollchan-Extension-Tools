/* ==[ FormFile.js ]==========================================================================================
                                                 FILE INPUTS
                 image/video files in postform: preview, adding by url, drag-n-drop, deleting
=========================================================================================================== */

class Files {
	constructor(form, fileEl) {
		this.filesCount = 0;
		this.fileTd = $parent(fileEl, 'TD');
		this.onchange = null;
		this._form = form;
		const inputs = [];
		const els = $Q('input[type="file"]', this.fileTd);
		for(let i = 0, len = els.length; i < len; ++i) {
			inputs.push(new FileInput(this, els[i]));
		}
		this._inputs = inputs;
		this._files = [];
		this.hide();
	}
	get rarInput() {
		const value = $bEnd(docBody, '<input type="file" style="display: none;">');
		Object.defineProperty(this, 'rarInput', { value });
		return value;
	}
	get thumbsEl() {
		let value;
		if(aib.multiFile) {
			value = $add('<tr><td></td><td><div id="de-file-area"></div></td></tr>');
			$after(this.fileTd.parentNode, value);
		} else {
			value = $q(aib.tiny ? 'th' : 'td', $parent(this._form.txta, 'TR'));
			value.innerHTML = `<div style="display: none;">${ value.innerHTML }</div><div></div>`;
			value = value.lastChild;
		}
		Object.defineProperty(this, 'thumbsEl', { value });
		return value;
	}
	changeMode() {
		const cfg = Cfg.fileInputs === 2 && Cfg.ajaxPosting;
		for(const inp of this._inputs) {
			inp.changeMode(cfg);
		}
		this.hide();
	}
	clear() {
		for(const inp of this._inputs) {
			inp.clear();
		}
		this.hide();
	}
	hide() {
		for(let els = this._inputs, i = els.length - 1; i > 0; --i) {
			const inp = els[i];
			if(inp.hasFile) {
				break;
			} else if(els[i - 1].hasFile) {
				inp.show();
				break;
			}
			inp.hide();
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
		this._mediaEl = null;
		this._parent = parent;
		this._rarMsg = null;
		this._spoilEl = $q('input[type="checkbox"][name="spoiler"]', el.parentNode);
		this._thumb = null;
		this._utils = $add(`<div class="de-file-utils">
			<div class="de-file-btn-rar" title="${ Lng.helpAddFile[lang] }" style="display: none;"></div>
			<input class="de-file-spoil" type="checkbox" title="` +
				`${ Lng.spoilFile[lang] }" style="display: none;">
			<div class="de-file-btn-txt" title="${ Lng.addManually[lang] }"></div>
			<div class="de-file-btn-del" title="${ Lng.removeFile[lang] }" style="display: none;"></div>
		</div>`);
		[this._btnRarJpg, this._btnSpoil, this._btnTxt, this._btnDel] = [...this._utils.children];
		this._utils.addEventListener('click', this);
		this._txtWrap = $add(`<span class="de-file-txt-wrap">
			<input type="text" name="de-file-txt" class="de-file-txt-input de-file-txt-noedit" title="` +
				`${ Lng.youCanDrag[lang] }" placeholder="${ Lng.dropFileHere[lang] }">
			<input type="button" class="de-file-txt-add" value="+" title="` +
				`${ Lng.add[lang] }" style="display: none;"></span>`);
		[this._txtInput, this._txtAddBtn] = [...this._txtWrap.children];
		this._txtWrap.addEventListener('click', this);
		this._toggleDragEvents(this._txtWrap, true);
		if(Cfg.ajaxPosting) {
			$hide(el);
		}
		el.obj = this;
		el.classList.add('de-file-input');
		el.addEventListener('change', this);
		if(el.files && el.files[0]) {
			this._removeFile();
		}
		if(FileInput._isThumb) {
			this._initThumbs();
		} else {
			if(Cfg.fileInputs === 1 && Cfg.ajaxPosting) {
				$before(el, this._txtWrap);
			}
			$after(el, this._utils);
		}
	}
	changeMode(showThumbs) {
		if(!(showThumbs ^ !!this._thumb)) {
			return;
		}
		if(showThumbs) {
			this._initThumbs();
			return;
		}
		const el = this._txtWrap.parentNode.parentNode;
		$before(this._input, this._txtWrap);
		$after(this._input, this._utils);
		$del(el);
		$show(this._parent.fileTd.parentNode);
		$show(this._txtWrap);
		if(this._mediaEl) {
			window.URL.revokeObjectURL(this._mediaEl.src);
		}
		this._toggleDragEvents(this._thumb, false);
		$del(this._thumb);
		this._thumb = this._mediaEl = null;
	}
	clear() {
		if(FileInput._isThumb) {
			this._thumb.classList.add('de-file-off');
			if(this._mediaEl) {
				window.URL.revokeObjectURL(this._mediaEl.src);
				this._mediaEl.parentNode.title = Lng.youCanDrag[lang];
				$del(this._mediaEl);
				this._mediaEl = null;
			}
		}
		if(this._btnDel) {
			this._showDelBtn(false);
			$hide(this._btnSpoil);
			$hide(this._btnRarJpg);
			$hide(this._txtAddBtn);
			$del(this._rarMsg);
			if(FileInput._isThumb) {
				$hide(this._txtWrap);
			}
			this._txtInput.value = '';
			this._txtInput.classList.add('de-file-txt-noedit');
			this._txtInput.placeholder = Lng.dropFileHere[lang];
		}
		this.extraFile = this.imgFile = null;
		this._isTxtEditable = false;
		this._changeFilesCount(-1);
		this._removeFile();
	}
	handleEvent(e) {
		const el = e.target;
		const thumb = this._thumb;
		const isThumb = el === thumb || el.className === 'de-file-img';
		switch(e.type) {
		case 'change': {
			setTimeout(() => this._onFileChange(false), 20);
			const index = this._parent._inputs.indexOf(this);
			if(el.files.length > 0) {
				this._parent._files[index] = el.files[0];
			} else {
				delete this._parent._files[index];
			}
			DollchanAPI.notify('filechange', this._parent._files);
			return;
		}
		case 'click':
			if(isThumb) {
				this._input.click();
			} else if(el === this._btnDel) {
				this.clear();
				this._parent.hide();
				delete this._parent._files[this._parent._inputs.indexOf(this)];
				DollchanAPI.notify('filechange', this._parent._files);
			} else if(el === this._btnSpoil) {
				this._spoilEl.checked = this._btnSpoil.checked;
				return;
			} else if(el === this._btnRarJpg) {
				this._addRarJpeg();
			} else if(el === this._btnTxt) {
				this._showDelBtn((this._isTxtEditable = true));
				$show(this._txtAddBtn);
				if(FileInput._isThumb) {
					$toggle(this._txtWrap);
				}
				this._txtInput.classList.remove('de-file-txt-noedit');
				this._txtInput.placeholder = Lng.enterTheLink[lang];
				this._txtInput.focus();
			} else if(el === this._txtAddBtn) {
				this._addUrlFile(this._txtInput.value);
			} else if(el === this._txtInput && !this._isTxtEditable) {
				this._input.click();
				this._txtInput.blur();
			}
			e.stopPropagation();
			$pd(e);
			return;
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
				this._addUrlFile(dt.getData('text/plain'));
			}
			setTimeout(() => thumb.classList.remove('de-file-drag'), 10);
			e.stopPropagation();
			$pd(e);
		}
		}
	}
	hide() {
		if(FileInput._isThumb) {
			this._showDelBtn(false);
			$hide(this._thumb);
			$hide(this._txtWrap);
		}
		$hide(this._wrap);
	}
	show() {
		if(FileInput._isThumb) {
			$show(this._thumb);
		}
		$show(this._wrap);
	}

	static get _isThumb() {
		return Cfg.fileInputs === 2 && Cfg.ajaxPosting;
	}
	static _readDroppedFile(input, file) {
		readFile(file).then(({ data }) => {
			input.imgFile = [data, file.name, file.type];
			input.show();
			input._onFileChange(true);
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
		el.src = window.URL.createObjectURL(new Blob([fileData]));
		if((el = el.nextSibling)) {
			window.URL.revokeObjectURL(el.src);
			$del(el);
		}
	}
	_addRarJpeg() {
		const el = this._parent.rarInput;
		el.onchange = ({ target }) => {
			$hide(this._btnRarJpg);
			const myBtn = this._rarMsg = $aBegin(this._utils,
				'<span><svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg></span>');
			const file = target.files[0];
			readFile(file).then(({ data }) => {
				if(this._rarMsg === myBtn) {
					myBtn.className = 'de-file-rarmsg';
					const origFileName = this.imgFile ? this.imgFile[1] : this._input.files[0].name;
					myBtn.title = origFileName + ' + ' + file.name;
					myBtn.textContent = origFileName.split('.').pop() + ' + ' + file.name.split('.').pop();
					this.extraFile = data;
				}
			});
		};
		el.click();
	}
	_addUrlFile(url, file = null) {
		if(!url) {
			return Promise.reject(new Error('URL is null'));
		}
		$popup('file-loading', Lng.loading[lang], true);
		return downloadImgData(url, false).then(data => {
			if(file) {
				window.URL.revokeObjectURL(url);
			}
			if(!data) {
				$popup('file-loading', Lng.cantLoad[lang] + ' URL: ' + url);
				return;
			}
			closePopup('file-loading');
			this._isTxtEditable = false;
			let name = file ? file.name : url.split('/').pop();
			const type = file && file.type || getFileType(name);
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
			this.imgFile = [data.buffer, name, type || getFileType(name)];
			if(!file) {
				file = new Blob([data], { type: this.imgFile[2] });
				file.name = name;
			}
			this._parent._files[this._parent._inputs.indexOf(this)] = file;
			DollchanAPI.notify('filechange', this._parent._files);
			if(FileInput._isThumb) {
				$hide(this._txtWrap);
			}
			this._onFileChange(true);
		});
	}
	_changeFilesCount(val) {
		this._parent.filesCount = Math.max(this._parent.filesCount + val, 0);
		if(aib.dobr) {
			this._parent.fileTd.firstElementChild.value = this._parent.filesCount + 1;
		}
	}
	_initThumbs() {
		const fileTr = this._parent.fileTd.parentNode;
		$hide(fileTr);
		$hide(this._txtWrap);
		($q('.de-file-txt-area') || $bBegin(fileTr, `<tr class="de-file-txt-area">
			<td class="postblock"></td><td></td></tr>`)).lastChild.appendChild(this._txtWrap);
		this._thumb = $bEnd(this._parent.thumbsEl,
			`<div class="de-file de-file-off"><div class="de-file-img"><div class="de-file-img" title="${
				Lng.youCanDrag[lang] }"></div></div></div>`);
		this._thumb.addEventListener('click', this);
		this._thumb.addEventListener('dragenter', this);
		this._thumb.appendChild(this._utils);
		this._toggleDragEvents(this._thumb, true);
		if(this.hasFile) {
			this._showPviewImage();
		}
	}
	_onFileChange(hasImgFile) {
		this._txtInput.value = hasImgFile ? this.imgFile[1] : this._input.files[0].name;
		if(!hasImgFile) {
			this.imgFile = null;
		}
		if(this._parent.onchange) {
			this._parent.onchange();
		}
		if(FileInput._isThumb) {
			this._showPviewImage();
		}
		if(this.hasFile) {
			this.extraFile = null;
		} else {
			this.hasFile = true;
			this._changeFilesCount(+1);
			this._showDelBtn(true);
			$hide(this._txtAddBtn);
			if(FileInput._isThumb) {
				$hide(this._txtWrap);
			}
			if(this._spoilEl) {
				this._btnSpoil.checked = this._spoilEl.checked;
				$show(this._btnSpoil);
			}
			this._txtInput.classList.add('de-file-txt-noedit');
			this._txtInput.placeholder = Lng.dropFileHere[lang];
		}
		this._parent.hide();
		if(!nav.Presto && !aib.fch &&
			/^image\/(?:png|jpeg)$/.test(hasImgFile ? this.imgFile[2] : this._input.files[0].type)
		) {
			$del(this._rarMsg);
			$show(this._btnRarJpg);
		}
	}
	_removeFile() {
		const oldEl = this._input;
		const newEl = $aEnd(oldEl, oldEl.outerHTML);
		oldEl.removeEventListener('change', this);
		newEl.addEventListener('change', this);
		newEl.obj = this;
		this._input = newEl;
		$del(oldEl);
		this.hasFile = false;
		delete this._parent._files[this._parent._inputs.indexOf(this)];
	}
	_showDelBtn(isShow) {
		$toggle(this._btnDel, isShow);
		$toggle(this._btnTxt, !isShow);
	}
	_showPviewImage() {
		const { imgFile } = this;
		if(imgFile) {
			this._addNewThumb(...imgFile, imgFile[0].byteLength);
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
	_toggleDragEvents(el, add) {
		const name = add ? 'addEventListener' : 'removeEventListener';
		el[name]('dragover', $pd);
		el[name]('dragenter', this);
		el[name]('dragleave', this);
		el[name]('drop', this);
	}
}
