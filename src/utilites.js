//============================================================================================================
//												UTILITIES
//============================================================================================================

function $Q(path, root) {
	return root.querySelectorAll(path);
}

function $q(path, root) {
	return root.querySelector(path);
}

function $C(id, root) {
	return root.getElementsByClassName(id);
}

function $c(id, root) {
	return root.getElementsByClassName(id)[0];
}

function $id(id) {
	return doc.getElementById(id);
}

function $T(id, root) {
	return root.getElementsByTagName(id);
}

function $t(id, root) {
	return root.getElementsByTagName(id)[0];
}

function $append(el, nodes) {
	for(var i = 0, len = nodes.length; i < len; i++) {
		if(nodes[i]) {
			el.appendChild(nodes[i]);
		}
	}
}

function $before(el, node) {
	el.parentNode.insertBefore(node, el);
}

function $after(el, node) {
	el.parentNode.insertBefore(node, el.nextSibling);
}

function $add(html) {
	dummy.innerHTML = html;
	return dummy.firstChild;
}

function $new(tag, attr, events) {
	var el = doc.createElement(tag);
	if(attr) {
		for(var key in attr) {
			key === 'text' ? el.textContent = attr[key] :
			key === 'value' ? el.value = attr[key] :
			el.setAttribute(key, attr[key]);
		}
	}
	if(events) {
		for(var key in events) {
			el.addEventListener(key, events[key], false);
		}
	}
	return el;
}

function $New(tag, attr, nodes) {
	var el = $new(tag, attr, null);
	$append(el, nodes);
	return el;
}

function $txt(el) {
	return doc.createTextNode(el);
}

function $btn(val, ttl, Fn) {
	return $new('input', {'type': 'button', 'value': val, 'title': ttl}, {'click': Fn});
}

function $script(text) {
	$del(doc.head.appendChild($new('script', {'type': 'text/javascript', 'text': text}, null)));
}

function $css(text) {
	return doc.head.appendChild($new('style', {'type': 'text/css', 'text': text}, null));
}

function $if(cond, el) {
	return cond ? el : null;
}

function $disp(el) {
	el.style.display = el.style.display === 'none' ? '' : 'none';
}

function $del(el) {
	if(el) {
		el.parentNode.removeChild(el);
	}
}

function $DOM(html) {
	var myDoc = doc.implementation.createHTMLDocument('');
	myDoc.documentElement.innerHTML = html;
	return myDoc;
}

function $pd(e) {
	e.preventDefault();
}

function $txtInsert(el, txt) {
	var scrtop = el.scrollTop,
		start = el.selectionStart;
	el.value = el.value.substr(0, start) + txt + el.value.substr(el.selectionEnd);
	el.setSelectionRange(start + txt.length, start + txt.length);
	el.focus();
	el.scrollTop = scrtop;
}

function $txtSelect() {
	return (nav.Opera ? doc.getSelection() : window.getSelection()).toString();
}

function $isEmpty(obj) {
	for(var i in obj) {
		if(obj.hasOwnProperty(i)) {
			return false;
		}
	}
	return true;
}

function $log(txt) {
	var newTime = Date.now(),
		time = newTime - oldTime;
	if(time > 1) {
		timeLog.push(txt + ': ' + time + 'ms');
		oldTime = newTime;
	}
}

function $xhr(obj) {
	var h, xhr = new window.XMLHttpRequest();
	if(obj['onreadystatechange']) {
		xhr.onreadystatechange = obj['onreadystatechange'].bind(window, xhr);
	}
	if(obj['onload']) {
		xhr.onload = obj['onload'].bind(window, xhr);
	}
	xhr.open(obj['method'], obj['url'], true);
	if(obj['responseType']) {
		xhr.responseType = obj['responseType'];
	}
	for(h in obj['headers']) {
		xhr.setRequestHeader(h, obj['headers'][h]);
	}
	xhr.send(obj['data'] || null);
	return xhr;
}

function $queue(maxNum, Fn, endFn) {
	this.array = [];
	this.length = this.index = this.running = 0;
	this.num = 1;
	this.fn = Fn;
	this.endFn = endFn;
	this.max = maxNum;
	this.freeSlots = [];
	while(maxNum--) {
		this.freeSlots.push(maxNum);
	}
	this.completed = this.paused = false;
}
$queue.prototype = {
	run: function(data) {
		if(this.paused || this.running === this.max) {
			this.array.push(data);
			this.length++;
		} else {
			this.fn(this.freeSlots.pop(), this.num++, data);
			this.running++;
		}
	},
	end: function(qIdx) {
		if(!this.paused && this.index < this.length) {
			this.fn(qIdx, this.num++, this.array[this.index++]);
			return;
		}
		this.running--;
		this.freeSlots.push(qIdx);
		if(!this.paused && this.completed && this.running === 0) {
			this.endFn();
		}
	},
	complete: function() {
		if(this.index >= this.length && this.running === 0) {
			this.endFn();
		} else {
			this.completed = true;
		}
	},
	pause: function() {
		this.paused = true;
	},
	'continue': function() {
		this.paused = false;
		if(this.index >= this.length) {
			if(this.completed) {
				this.endFn();
			}
			return;
		}
		while(this.index < this.length && this.running !== this.max) {
			this.fn(this.freeSlots.pop(), this.num++, this.array[this.index++]);
			this.running++;
		}
	}
};

function $tar() {
	this._data = [];
}
$tar.prototype = {
	addFile: function(filepath, input) {
		var i, checksum, nameLen, fileSize = input.length,
			header = new Uint8Array(512);
		for(i = 0, nameLen = Math.min(filepath.length, 100); i < nameLen; ++i) {
			header[i] = filepath.charCodeAt(i) & 0xFF;
		}
		this._padSet(header, 100, '100777', 8);										// fileMode
		this._padSet(header, 108, '0', 8);											// uid
		this._padSet(header, 116, '0', 8);											// gid
		this._padSet(header, 124, fileSize.toString(8), 13);						// fileSize
		this._padSet(header, 136, Math.floor(Date.now() / 1000).toString(8), 12);	// mtime
		this._padSet(header, 148, '        ', 8);									// checksum
		header[156] = 0x30;															// type ('0')
		for(i = checksum = 0; i < 157; i++) {
			checksum += header[i];
		}
		this._padSet(header, 148, checksum.toString(8), 8);							// checksum
		this._data.push(header);
		this._data.push(input);
		if((i = Math.ceil(fileSize / 512) * 512 - fileSize) !== 0) {
			this._data.push(new Uint8Array(i));
		}
	},
	addString: function(filepath, str) {
		var i, len, data, sDat = unescape(encodeURIComponent(str));
		for(i = 0, len = sDat.length, data = new Uint8Array(len); i < len; ++i) {
			data[i] = sDat.charCodeAt(i) & 0xFF;
		}
		this.addFile(filepath, data);
	},
	get: function() {
		this._data.push(new Uint8Array(1024));
		return new Blob(this._data, {'type': 'application/x-tar'});
	},

	_padSet: function(data, offset, num, len) {
		var i = 0, nLen = num.length;
		len -= 2;
		while(nLen < len) {
			data[offset++] = 0x20; // ' '
			len--;
		}
		while(i < nLen) {
			data[offset++] = num.charCodeAt(i++);
		}
		data[offset] = 0x20; // ' '
	}
};

function $workers(source, count) {
	var i, wrk, wUrl;
	if(nav.Firefox) {
		wUrl = 'data:text/javascript,' + source;
		wrk = unsafeWindow.Worker;
	} else {
		wUrl = window.URL.createObjectURL(new Blob([source], {'type': 'text/javascript'}));
		this.url = wUrl;
		wrk = Worker;
	}
	for(i = 0; i < count; ++i) {
		this[i] = new wrk(wUrl);
	}
}
$workers.prototype = {
	url: null,
	clear: function() {
		if(this.url !== null) {
			window.URL.revokeObjectURL(this.url);
		}
	}
};

function regQuote(str) {
	return (str + '').replace(/([.?*+^$[\]\\(){}|\-])/g, '\\$1');
}

function fixBrd(b) {
	return '/' + b + (b ? '/' : '');
}

function getAbsLink(url) {
	return url[1] === '/' ? aib.prot + url :
		url[0] === '/' ? aib.prot + '//' + aib.host + url : url;
}

function getErrorMessage(eCode, eMsg) {
	return eCode === 0 ? eMsg || Lng.noConnect[lang] : 'HTTP [' + eCode + '] ' + eMsg;
}

function getAncestor(el, tagName) {
	do {
		el = el.parentElement;
	} while(el && el.tagName !== tagName);
	return el;
}

function getPrettyErrorMessage(e) {
	return e.stack ? (nav.WebKit ? e.stack :
			e.name + ': ' + e.message + '\n' +
			(nav.Firefox ? e.stack.replace(/^([^@]*).*\/(.+)$/gm, function(str, fName, line) {
				return '    at ' + (fName ? fName + ' (' + line + ')' : line);
			}) : e.stack)
		) : e.name + ': ' + e.message;
}

function toRegExp(str, noG) {
	var l = str.lastIndexOf('/'),
		flags = str.substr(l + 1);
	return new RegExp(str.substr(1, l - 1), noG ? flags.replace('g', '') : flags);
}

