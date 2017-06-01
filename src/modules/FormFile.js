/*==[ FormFile.js ]===========================================================================================
                                                 FILE INPUTS
                 image/webm files in postform: preview, adding by url, drag-n-drop, deleting
============================================================================================================*/

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
			value.innerHTML = '<div style="display: none;">' + value.innerHTML + '</div><div></div>';
			value = value.lastChild;
		}
		Object.defineProperty(this, 'thumbsEl', { value });
		return value;
	}
	changeMode() {
		const cfg = Cfg.fileInputs === 2;
		for(let inp of this._inputs) {
			inp.changeMode(cfg);
		}
		this.hide();
	}
	clear() {
		for(let inp of this._inputs) {
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
		this._isUrlEditable = false;
		this._mediaEl = null;
		this._parent = parent;
		this._rarMsg = null;
		this._spoilEl = $q('input[type="checkbox"][name="spoiler"]', el.parentNode);
		this._thumb = null;
		this._utils = $add(`<div class="de-file-utils">
			<div class="de-file-rar" title="${ Lng.helpAddFile[lang] }" style="display: none;"></div>
			<input class="de-file-spoil" type="checkbox" title="${ Lng.spoilFile[lang] }" style="display: none;">
			<div class="de-file-url" title="${ Lng.addManually[lang] }"></div>
			<div class="de-file-del" title="${ Lng.removeFile[lang] }" style="display: none;"></div>
		</div>`);
		[this._btnRarJpg, this._btnSpoil, this._btnUrl, this._btnDel] = Array.from(this._utils.children);
		this._utils.addEventListener('click', this);
		this._urlWrap = $add(`<span class="de-file-url-wrap">
			<input type="text" class="de-file-url-input de-file-url-noedit" title="${
				Lng.youCanDrag[lang] }" placeholder="${ Lng.dropFileHere[lang] }">
			<input type="button" class="de-file-url-add" value="+" title="${
				Lng.addManually[lang] }" style="display: none;"></span>`);
		[this._urlInput, this._urlAddBtn] = Array.from(this._urlWrap.children);
		this._urlWrap.addEventListener('click', this);
		this._toggleDragEvents(this._urlWrap, true);
		$hide(el);
		el.obj = this;
		el.classList.add('de-file-input');
		el.addEventListener('change', this);
		if(el.files && el.files[0]) {
			this._removeFile();
		}
		if(this._isThumb) {
			this._initThumbs();
		} else {
			$before(el, this._urlWrap);
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
		const urlTr = this._urlWrap.parentNode.parentNode;
		$before(this._input, this._urlWrap);
		$after(this._input, this._utils);
		$del(urlTr);
		$show(this._parent.fileTd.parentNode);
		$show(this._urlWrap);
		if(this._mediaEl) {
			window.URL.revokeObjectURL(this._mediaEl.src);
		}
		this._toggleDragEvents(this._thumb, false);
		$del(this._thumb);
		this._thumb = this._mediaEl = null;
	}
	clear() {
		if(this._isThumb) {
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
			$hide(this._urlAddBtn);
			$del(this._rarMsg);
			if(this._isThumb) {
				$hide(this._urlWrap);
			}
			this._urlInput.value = '';
			this._urlInput.classList.add('de-file-url-noedit');
			this._urlInput.placeholder = Lng.dropFileHere[lang];
		}
		this.extraFile = this.imgFile = null;
		this._isUrlEditable = false;
		this._changeFilesCount(-1);
		this._removeFile();
	}
	handleEvent(e) {
		const el = e.target;
		const isThumb = el === this._thumb || el.className === 'de-file-img';
		switch(e.type) {
		case 'change': setTimeout(() => this._onFileChange(false), 20); return;
		case 'click':
			if(isThumb) {
				this._input.click();
			} else if(el === this._btnDel) {
				this.clear();
				this._parent.hide();
			} else if(el === this._btnSpoil) {
				this._spoilEl.checked = this._btnSpoil.checked;
				return;
			} else if(el === this._btnRarJpg) {
				this._addRarJpeg();
			} else if(el === this._btnUrl) {
				this._showDelBtn((this._isUrlEditable = true));
				$show(this._urlAddBtn);
				if(this._isThumb) {
					$toggle(this._urlWrap);
				}
				this._urlInput.classList.remove('de-file-url-noedit');
				this._urlInput.placeholder = Lng.enterTheLink[lang];
				this._urlInput.focus();
			} else if(el === this._urlAddBtn) {
				this._addUrlFile(this._urlInput.value);
			} else if(el === this._urlInput && !this._isUrlEditable) {
				this._input.click();
				this._urlInput.blur();
			}
			e.stopPropagation();
			$pd(e);
			return;
		case 'dragenter':
			if(isThumb) {
				this._thumb.classList.add('de-file-drag');
			}
			return;
		case 'dragleave':
			if(isThumb && !this._thumb.contains(e.relatedTarget)) {
				this._thumb.classList.remove('de-file-drag');
			}
			return;
		case 'drop':
			const dt = e.dataTransfer;
			if(!isThumb && el !== this._urlInput) {
				return;
			}
			const file = dt.files[0];
			if(file) {
				readFile(file).then(({ data }) => {
					this.imgFile = [data, file.name, file.type];
					this._onFileChange(true);
				});
			} else {
				this._addUrlFile(dt.getData('text/plain'));
			}
			setTimeout(() => this._thumb.classList.remove('de-file-drag'), 10);
			e.stopPropagation();
			$pd(e);
		}
	}
	hide() {
		if(this._isThumb) {
			this._showDelBtn(false);
			$hide(this._thumb);
			$hide(this._urlWrap);
		}
		$hide(this._wrap);
	}
	show() {
		if(this._isThumb) {
			$show(this._thumb);
		}
		$show(this._wrap);
	}

	get _isThumb() {
		return Cfg.fileInputs === 2;
	}
	get _wrap() {
		return aib.multiFile ? this._input.parentNode : this._input;
	}
	_addNewThumb(fileData, fileName, fileSize, fileType) {
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
		el.onchange = e => {
			$hide(this._btnRarJpg);
			const myBtn = this._rarMsg = $aBegin(this._utils, '<span><svg class="de-wait">' +
				'<use xlink:href="#de-symbol-wait"/></svg>' + Lng.wait[lang] + '</span>');
			const file = e.target.files[0];
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
	_addUrlFile(url) {
		if(!url) {
			return;
		}
		$popup('file-loading', Lng.loading[lang], true);
		downloadImgData(url, false).then(data => {
			if(!data) {
				$popup('file-loading', Lng.cantLoad[lang] + 'URL: ' + url);
				return;
			}
			closePopup('file-loading');
			this._isUrlEditable = false;
			this.imgFile = [data.buffer, url.split('/').pop(), getFileType(url)];
			if(this._isThumb) {
				$hide(this._urlWrap);
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
		$hide(this._urlWrap);
		($q('.de-file-url-area') || $bBegin(fileTr,
			'<tr class="de-file-url-area"><td></td><td></td></tr>')).lastChild.appendChild(this._urlWrap);
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
		this._urlInput.value = hasImgFile ? this.imgFile[1] : this._input.files[0].name;
		if(!hasImgFile) {
			this.imgFile = null;
		}
		if(this._parent.onchange) {
			this._parent.onchange();
		}
		if(this._isThumb) {
			this._showPviewImage();
		}
		if(this.hasFile) {
			this.extraFile = null;
		} else {
			this.hasFile = true;
			this._changeFilesCount(+1);
			this._showDelBtn(true);
			$hide(this._urlAddBtn);
			if(this._isThumb) {
				$hide(this._urlWrap);
			}
			if(this._spoilEl) {
				this._btnSpoil.checked = this._spoilEl.checked;
				$show(this._btnSpoil);
			}
			this._urlInput.classList.add('de-file-url-noedit');
			this._urlInput.placeholder = Lng.dropFileHere[lang];
		}
		this._parent.hide();
		if(!nav.Presto && !aib.fch &&
		   /^image\/(?:png|jpeg)$/.test(hasImgFile ? this.imgFile[2] : this._input.files[0].type))
		{
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
	}
	_showPviewImage() {
		if(this.imgFile) {
			const [data, fileName, fileType] = this.imgFile;
			this._addNewThumb(data, fileName, data.byteLength, fileType);
		} else {
			const file = this._input.files[0];
			if(file) {
				readFile(file).then(({ data }) => {
					if(this._input.files[0] === file) {
						this._addNewThumb(data, file.name, file.size, file.type);
					}
				});
			}
		}
	}
	_showDelBtn(isShow) {
		$toggle(this._btnDel, isShow);
		$toggle(this._btnUrl, !isShow);
	}
	_toggleDragEvents(el, add) {
		const name = add ? 'addEventListener' : 'removeEventListener';
		el[name]('dragover', $pd);
		el[name]('dragenter', this);
		el[name]('dragleave', this);
		el[name]('drop', this);
	}
}
