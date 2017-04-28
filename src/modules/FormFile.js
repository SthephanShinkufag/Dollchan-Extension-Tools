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
		var inputs = [];
		var els = $Q('input[type="file"]', this.fileTd);
		for(var i = 0, len = els.length; i < len; ++i) {
			inputs.push(new FileInput(this, els[i]));
		}
		this._inputs = inputs;
		this.hide();
	}
	get rarInput() {
		var value = $bEnd(docBody, '<input type="file" style="display: none;">');
		Object.defineProperty(this, 'rarInput', { value });
		return value;
	}
	get thumbsEl() {
		var value;
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
	changeView() {
		var cfg = !!Cfg.fileThumb;
		for(let inp of this._inputs) {
			inp.changeView(cfg);
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
		for(var els = this._inputs, i = els.length - 1; i > 0; --i) {
			let inp = els[i];
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
		this._btnDel = null;
		this._btnSpoil = null;
		this._btnRarJpg = null;
		this._dragCount = 0;
		this._input = el;
		this._inputAfter = el.nextSibling;
		this._inputParent = el.parentNode;
		this._mediaEl = null;
		this._parent = parent;
		this._spoilEl = $q('input[type="checkbox"][name="spoiler"]', el.parentNode);
		this._thumb = null;
		el.classList.add('de-file-input');
		el.addEventListener('change', this);
		if(el.files && el.files[0]) {
			this._removeFile();
		}
		if(Cfg.fileThumb) {
			this._initThumbs();
		}
		el.obj = this;
	}
	changeView(showThumbs) {
		if(showThumbs ^ !!this._thumb) {
			if(showThumbs) {
				this._initThumbs();
			} else {
				this._removeThumbs();
			}
			if(this._btnDel) {
				$after(this._buttonsPlace, this._btnDel);
			}
			if(this._btnSpoil) {
				$after(this._buttonsPlace, this._btnSpoil);
			}
			if(this._btnRarJpg) {
				$after(this._buttonsPlace, this._btnRarJpg);
			}
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
		$del(this._btnDel);
		$del(this._btnSpoil);
		$del(this._btnRarJpg);
		this.imgFile = this._btnDel = this._btnSpoil = this._btnRarJpg = null;
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
			} else if(e.target.className === 'de-file-img') {
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
		$hide(Cfg.fileThumb ? this._thumb : this._wrap);
	}
	show() {
		$show(Cfg.fileThumb ? this._thumb : this._wrap);
	}

	get _buttonsPlace() {
		return Cfg.fileThumb ? this._thumb.firstChild : this._input;
	}
	get _wrap() {
		return aib.multiFile ? this._input.parentNode : this._input;
	}
	_addRarJpeg() {
		var el = this._parent.rarInput;
		el.onchange = e => {
			$del(this._btnRarJpg);
			var myBtn = this._btnRarJpg = $aEnd(this._buttonsPlace, '<span><svg class="de-wait">' +
				'<use xlink:href="#de-symbol-wait"/></svg>' + Lng.wait[lang] + '</span>');
			var file = e.target.files[0];
			readFile(file).then(({ data }) => {
				if(this._btnRarJpg === myBtn) {
					myBtn.className = 'de-file-rarmsg de-file-utils';
					myBtn.title = this._input.files[0].name + ' + ' + file.name;
					myBtn.textContent = this._input.files[0].name.replace(/^.+\./, '') + ' + ' +
						file.name.replace(/^.+\./, '');
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
	_eventInput(el, add) {
		var name = add ? 'addEventListener' : 'removeEventListener';
		el[name]('dragover', $pd);
		el[name]('dragenter', this);
		el[name]('dragleave', this);
		el[name]('drop', this);
	}
	_initThumbs() {
		$hide(this._parent.fileTd.parentNode);
		var thumb = $bEnd(this._parent.thumbsEl,
			'<div class="de-file de-file-off"><div class="de-file-img">' +
			'<div class="de-file-img" title="' + Lng.clickToAdd[lang] + '"></div></div></div>');
		this._thumb = thumb;
		thumb.addEventListener('click', this);
		thumb.addEventListener('dragenter', this);
		this._eventInput(this._input, true);
		if(this.hasFile) {
			this._showPviewImage();
		}
	}
	_onFileChange() {
		if(this._parent.onchange) {
			this._parent.onchange();
		}
		if(Cfg.fileThumb) {
			this._showPviewImage();
		}
		if(!this.hasFile) {
			this.hasFile = true;
			this._changeFilesCount(+1);
			this._btnDel = $aEnd(this._buttonsPlace,
				`<span class="de-file-del de-file-utils" title="${ Lng.removeFile[lang] }"></span>`);
			this._btnDel.addEventListener('click', this);
			if(this._spoilEl) {
				this._btnSpoil = $aEnd(this._buttonsPlace, `<input type="checkbox" title="${
					Lng.spoilFile[lang] }" class="de-file-spoil de-file-utils">`);
				this._btnSpoil.addEventListener('click', this);
				this._btnSpoil.checked = this._spoilEl.checked;
			}
		} else if(this.imgFile) {
			this.imgFile = null;
		}
		this._parent.hide();
		if(nav.Presto || aib.fch || !/^image\/(?:png|jpeg)$/.test(this._input.files[0].type)) {
			return;
		}
		$del(this._btnRarJpg);
		this._btnRarJpg = $aEnd(this._buttonsPlace,
			`<span class="de-file-rar de-file-utils" title="${ Lng.helpAddFile[lang] }"></span>`);
		this._btnRarJpg.addEventListener('click', this);
	}
	_removeFile() {
		var oldEl = this._input,
			newEl = $aEnd(oldEl, oldEl.outerHTML);
		this._eventInput(oldEl, false);
		oldEl.removeEventListener('change', this);
		if(Cfg.fileThumb) {
			this._eventInput(newEl, true);
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
	_removeThumbs() {
		$show(this._wrap);
		$show(this._parent.fileTd.parentNode);
		if(this._mediaEl) {
			window.URL.revokeObjectURL(this._mediaEl.src);
		}
		this._eventInput(this._input, false);
		$del(this._thumb);
		this._thumb = this._mediaEl = null;
	}
	_showPviewImage() {
		var file = this._input.files[0];
		if(!file) {
			return;
		}
		readFile(file).then(({ data }) => {
			var newFile = this._input.files[0];
			if(newFile !== file) {
				return;
			}
			var el = this._thumb;
			el.classList.remove('de-file-off');
			el = el.firstChild.firstChild;
			el.title = file.name + ', ' + (file.size/1024).toFixed(2) + 'KB';
			let html;
			switch(file.type) {
			case 'video/webm':
			case 'video/mp4':
				html = '<video class="de-file-img" loop autoplay muted src=""></video>';
				break;
			default:
				html = '<img class="de-file-img" src="">';
			}
			this._mediaEl = el = $aBegin(el, html);
			el.src = window.URL.createObjectURL(new Blob([data]));
			if((el = el.nextSibling)) {
				window.URL.revokeObjectURL(el.src);
				$del(el);
			}
		});
	}
}
