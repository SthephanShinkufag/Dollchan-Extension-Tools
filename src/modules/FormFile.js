/*==[ FormFile.js ]===========================================================================================
                                                 FILE INPUTS
                         image/webm files in postform: preview, drag-n-drop, deleting
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
		const cfg = !!Cfg.fileThumb;
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
		this.hasFile = false;
		this.imgFile = null;
		this.urlFile = null;
		this._dragCount = 0;
		this._input = el;
		this._inputAfter = el.nextSibling;
		this._inputParent = el.parentNode;
		this._mediaEl = null;
		this._parent = parent;
		this._rarMsg = null;
		this._spoilEl = $q('input[type="checkbox"][name="spoiler"]', el.parentNode);
		this._thumb = null;

		// Add container with utils buttons
		this._utils = $add(`<div class="de-file-utils">
			<div class="de-file-rar" title="${ Lng.helpAddFile[lang] }" style="display: none;"></div>
			<input class="de-file-spoil" type="checkbox" title="${ Lng.spoilFile[lang] }" style="display: none;">
			<div class="de-file-url" title="${ Lng.addUrlFile[lang] }"></div>
			<div class="de-file-del" title="${ Lng.removeFile[lang] }" style="display: none;"></div>
		</div>`);
		[this._btnRarJpg, this._btnSpoil, this._btnUrl, this._btnDel] = this._utils.children;
		this._utils.addEventListener('click', this);
		el.classList.add('de-file-input');
		el.addEventListener('change', this);

		// Add input for getting files by url
		this._urlWrap = $add(`<span style="display: none;">
			<input type="text" placeholder="${ Lng.linkToFile[lang] }">
			<input type="button" class="de-file-url-add" value="+"></span>`);
		const [txtEl, btnEl] = this._urlWrap.children;
		btnEl.addEventListener('click', e => {
			const url = txtEl.value;
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
				const fileName = url.split('/').pop();
				const fileType = getFileType(url);
				this.urlFile = [data, fileName, fileType];
				if(Cfg.fileThumb) {
					$hide(this._urlWrap);
					this._addNewThumb(data, fileName, data.length, fileType);
				}
				this._onFileChange();
			});
		});

		if(el.files && el.files[0]) {
			this._removeFile();
		}
		if(Cfg.fileThumb) {
			this._initThumbs();
		} else {
			$before(this._input, this._urlWrap);
			$after(this._input, this._utils);
		}
		el.obj = this;
	}
	changeMode(showThumbs) {
		if(showThumbs ^ !!this._thumb) {
			if(showThumbs) {
				this._initThumbs();
				return;
			}
			$show(this._wrap);
			$show(this._parent.fileTd.parentNode);
			if(this._mediaEl) {
				window.URL.revokeObjectURL(this._mediaEl.src);
				$show(this._urlWrap);
			}
			this._toggleDragEvents(this._input, false);
			const urlTr = this._urlWrap.parentNode.parentNode;
			$before(this._input, this._urlWrap);
			$after(this._input, this._utils);
			$del(urlTr);
			$del(this._thumb);
			this._thumb = this._mediaEl = null;
		}
	}
	clear() {
		if(Cfg.fileThumb) {
			this._thumb.classList.add('de-file-off');
			if(this._mediaEl) {
				window.URL.revokeObjectURL(this._mediaEl.src);
				this._mediaEl.parentNode.title = Lng.clickToAdd[lang];
				$del(this._mediaEl);
				this._mediaEl = null;
			}
		}
		if(this._btnDel) {
			$hide(this._btnDel);
			$hide(this._btnSpoil);
			$hide(this._btnRarJpg);
			$del(this._rarMsg);
			$show(this._btnUrl);
			$hide(this._urlWrap);
			$show(this._input);
			this._urlWrap.firstElementChild.value = '';
		}
		this.imgFile = this.urlFile = null;
		this._changeFilesCount(-1);
		this._removeFile();
	}
	handleEvent(e) {
		switch(e.type) {
		case 'change': setTimeout(() => this._onFileChange(), 20); return;
		case 'click':
			if(e.target === this._btnDel) {
				this.clear();
				this._parent.hide();
			} else if(e.target === this._btnSpoil) {
				this._spoilEl.checked = this._btnSpoil.checked;
				return;
			} else if(e.target === this._btnRarJpg) {
				this._addRarJpeg();
			} else if(e.target === this._btnUrl) {
				$toggle(this._urlWrap);
				$toggle(this._input);
				$toggle(this._btnUrl);
				$toggle(this._btnDel);
			} else if(e.target.className === 'de-file-img') {
				this.urlFile = null;
				this._input.click();
			}
			e.stopPropagation();
			$pd(e);
			return;
		case 'dragenter':
			if(e.target === this._input) {
				this._dragCount++;
			} else {
				$after(this._thumb, this._input);
				this._thumb.classList.add('de-file-drag');
			}
			return;
		case 'dragleave':
			if(--this._dragCount === 0) {
				this._removeDropzone();
			}
			return;
		case 'drop':
			this._dragCount = 0;
			setTimeout(() => this._removeDropzone(), 10);
			return;
		}
	}
	hide() {
		if(Cfg.fileThumb) {
			$hide(this._thumb);
		}
		$hide(this._wrap);
	}
	show() {
		if(Cfg.fileThumb) {
			$show(this._thumb);
		}
		$show(this._wrap);
	}

	get _wrap() {
		return aib.multiFile ? this._input.parentNode : this._input;
	}
	_addNewThumb(fileData, fileName, fileSize, fileType) {
		let el = this._thumb;
		el.classList.remove('de-file-off');
		el = el.firstChild.firstChild;
		el.title = `${ fileName }', ${ (fileSize / 1024).toFixed(2) }KB`;
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
					const origFileName = this.urlFile ? this.urlFile[1] : this._input.files[0].name;
					myBtn.title = origFileName + ' + ' + file.name;
					myBtn.textContent = origFileName.split('.').pop() + ' + ' + file.name.split('.').pop();
					this.imgFile = data;
				}
			});
		};
		el.click();
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
		($q('.de-file-url-area') || $bBegin(fileTr,
			'<tr class="de-file-url-area"><td></td><td></td></tr>')).lastChild.appendChild(this._urlWrap);
		this._thumb = $bEnd(this._parent.thumbsEl,
			'<div class="de-file de-file-off"><div class="de-file-img">' +
			'<div class="de-file-img" title="' + Lng.clickToAdd[lang] + '"></div></div></div>');
		this._thumb.addEventListener('click', this);
		this._thumb.addEventListener('dragenter', this);
		this._thumb.appendChild(this._utils);
		this._toggleDragEvents(this._input, true);
		if(this.hasFile) {
			this._showPviewImage();
			$hide(this._urlWrap);
		}
	}
	_onFileChange() {
		if(this._parent.onchange) {
			this._parent.onchange();
		}
		if(Cfg.fileThumb) {
			this._showPviewImage();
		}
		if(this.hasFile) {
			this.imgFile = null;
		} else {
			this.hasFile = true;
			this._changeFilesCount(+1);
			$hide(this._btnUrl);
			if(!this._urlWrap.firstElementChild.value) {
				$hide(this._urlWrap);
				$show(this._input);
			} else {
				$hide(this._input);
			}
			$show(this._btnDel);
			if(this._spoilEl) {
				this._btnSpoil.checked = this._spoilEl.checked;
				$show(this._btnSpoil);
			}
		}
		this._parent.hide();
		if(nav.Presto || aib.fch ||
		   !/^image\/(?:png|jpeg)$/.test(this.urlFile ? this.urlFile[2] : this._input.files[0].type))
		{
			return;
		}
		$del(this._rarMsg);
		$show(this._btnRarJpg);
	}
	_removeFile() {
		const oldEl = this._input;
		const newEl = $aEnd(oldEl, oldEl.outerHTML);
		this._toggleDragEvents(oldEl, false);
		oldEl.removeEventListener('change', this);
		if(Cfg.fileThumb) {
			this._toggleDragEvents(newEl, true);
		}
		newEl.addEventListener('change', this);
		newEl.obj = this;
		this._input = newEl;
		$del(oldEl);
		this.hasFile = false;
	}
	_removeDropzone() {
		this._thumb.classList.remove('de-file-drag');
		if(this._inputAfter) {
			$before(this._inputAfter, this._input);
		} else {
			this._inputParent.appendChild(this._input);
		}
	}
	_showPviewImage() {
		if(this.urlFile) {
			const [data, fileName, fileType] = this.urlFile;
			this._addNewThumb(data, fileName, data.length, fileType);
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
	_toggleDragEvents(el, add) {
		const name = add ? 'addEventListener' : 'removeEventListener';
		el[name]('dragover', $pd);
		el[name]('dragenter', this);
		el[name]('dragleave', this);
		el[name]('drop', this);
	}
}
