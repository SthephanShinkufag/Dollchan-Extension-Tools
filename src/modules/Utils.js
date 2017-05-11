/*==[ Utils.js ]==============================================================================================
                                                    UTILS
============================================================================================================*/

// DOM SEARCH

const $Q = (path, root = docBody) => root.querySelectorAll(path);

const $q = (path, root = docBody) => root.querySelector(path);

const $id = id => doc.getElementById(id);

const $each = (els, cb) => aProto.forEach.call(els, cb);

function $parent(el, tagName) {
	do {
		el = el.parentElement;
	} while(el && el.tagName !== tagName);
	return el;
}


// DOM MODIFIERS

function $before(el, node) {
	el.parentNode.insertBefore(node, el);
}

function $after(el, node) {
	const next = el.nextSibling;
	if(next) {
		el.parentNode.insertBefore(node, next);
	} else {
		el.parentNode.appendChild(node);
	}
}

function $bBegin(sibling, html) {
	sibling.insertAdjacentHTML('beforebegin', html);
	return sibling.previousSibling;
}

function $aBegin(parent, html) {
	parent.insertAdjacentHTML('afterbegin', html);
	return parent.firstChild;
}

function $bEnd(parent, html) {
	parent.insertAdjacentHTML('beforeend', html);
	return parent.lastChild;
}

function $aEnd(sibling, html) {
	sibling.insertAdjacentHTML('afterend', html);
	return sibling.nextSibling;
}

function $replace(origEl, newEl) {
	if(typeof newEl === 'string') {
		origEl.insertAdjacentHTML('afterend', newEl);
		origEl.remove();
	} else {
		origEl.parentNode.replaceChild(newEl, origEl);
	}
}

function $del(el) {
	if(el) {
		el.remove();
	}
}

function $add(html) {
	dummy.innerHTML = html;
	return dummy.firstElementChild;
}

const $txt = el => doc.createTextNode(el);

// TODO: Get rid of this function and paste buttons in html
function $btn(val, ttl, fn, className = 'de-button') {
	const el = doc.createElement('input');
	el.type = 'button';
	el.className = className;
	el.value = val;
	el.title = ttl;
	el.addEventListener('click', fn);
	return el;
}

function $script(text) {
	// We can't insert scripts directly as html
	const el = doc.createElement('script');
	el.type = 'text/javascript';
	el.textContent = text;
	$del(doc.head.appendChild(el));
}

function $css(text) {
	if(nav.Safari && !('flex' in docBody.style)) {
		text = text.replace(/(transform|transition|flex|align-items)/g, ' -webkit-$1');
	}
	return $bEnd(doc.head, `<style type="text/css">${ text }</style>`);
}

function $DOM(html) {
	const myDoc = doc.implementation.createHTMLDocument('');
	myDoc.documentElement.innerHTML = html;
	return myDoc;
}


// CSS UTILS

function $toggle(el, needToShow = el.style.display) {
	if(needToShow) {
		el.style.removeProperty('display');
	} else {
		el.style.display = 'none';
	}
}

function $show(el) {
	el.style.removeProperty('display');
}

function $hide(el) {
	el.style.display = 'none';
}

function $animate(el, cName, remove = false) {
	el.addEventListener('animationend', function aEvent() {
		el.removeEventListener('animationend', aEvent);
		if(remove) {
			el.remove();
		} else {
			el.classList.remove(cName);
		}
	});
	el.classList.add(cName);
}

// Checks the validity of the user inputted color
function checkCSSColor(color) {
	if(!color || color === 'inherit' || color === 'currentColor') {
		return false;
	}
	if(color === 'transparent') {
		return true;
	}
	const image = doc.createElement('img');
	image.style.color = 'rgb(0, 0, 0)';
	image.style.color = color;
	if(image.style.color !== 'rgb(0, 0, 0)') {
		return true;
	}
	image.style.color = 'rgb(255, 255, 255)';
	image.style.color = color;
	return image.style.color !== 'rgb(255, 255, 255)';
}


// OTHER UTILS

const pad2 = i => (i < 10 ? '0' : '') + i;

const $join = (arr, start, end) => start + arr.join(end + start) + end;

const fixBrd = b => '/' + b + (b ? '/' : '');

const getAbsLink = url =>
	url[1] === '/' ? aib.prot + url :
	url[0] === '/' ? aib.prot + '//' + aib.host + url : url;

// Prepares a string to be used as a new RegExp argument
const quoteReg = str => (str + '').replace(/([.?*+^$[\]\\(){}|\-])/g, '\\$1');

// Converts a string to a regular expression
function toRegExp(str, noG) {
	const l = str.lastIndexOf('/');
	const flags = str.substr(l + 1);
	return new RegExp(str.substr(1, l - 1), noG ? flags.replace('g', '') : flags);
}

function escapeHTML(html) {
    return doc.createElement('div').appendChild($txt(html)).parentNode.innerHTML;
}

function $pd(e) {
	e.preventDefault();
}

function $isEmpty(obj) {
	for(let i in obj) {
		if(obj.hasOwnProperty(i)) {
			return false;
		}
	}
	return true;
}

function $txtInsert(el, txt) {
	const scrtop = el.scrollTop;
	const start = el.selectionStart;
	el.value = el.value.substr(0, start) + txt + el.value.substr(el.selectionEnd);
	el.setSelectionRange(start + txt.length, start + txt.length);
	el.focus();
	el.scrollTop = scrtop;
}

// XXX: SVG events hack for Opera Presto
function fixEventEl(el) {
	if(el && nav.Presto) {
		const svg = el.correspondingUseElement;
		if(svg) {
			el = svg.ownerSVGElement;
		}
	}
	return el;
}

function onDOMLoaded(fn) {
	if(doc.readyState === 'loading') {
		doc.addEventListener('DOMContentLoaded', fn);
	} else {
		fn();
	}
}

// Allows to record the duration of code execution
const Logger = {
	finish() {
		this._finished = true;
		this._marks.push(['LoggerFinish', Date.now()]);
	},
	getData(full) {
		let duration, i = 1;
		const marks = this._marks;
		const timeLog = [];
		for(let len = marks.length - 1, lastExtra = 0; i < len; ++i) {
			duration = marks[i][1] - marks[i - 1][1] + lastExtra;
			// Ignore logs equal to 0ms
			if(full || duration > 1) {
				lastExtra = 0;
				timeLog.push([marks[i][0], duration]);
			} else {
				lastExtra = duration;
			}
		}
		duration = marks[i][1] - marks[0][1];
		timeLog.push([Lng.total[lang], duration]);
		return timeLog;
	},
	init() {
		this._marks.push(['LoggerInit', Date.now()]);
	},
	log(text) {
		if(!this._finished) {
			this._marks.push([text, Date.now()]);
		}
	},

	_finished: false,
	_marks: []
};

// Helper function, which allows to use 'yield' to await for promises completion.
// Allows to write asynchronous code, which will looks like as a synchronous.
function async(generatorFunc) {
	return function(...args) {
		function continuer(verb, arg) {
			let result;
			try {
				result = generator[verb](arg);
			} catch(err) {
				console.error('Generator throw:', err);
				return Promise.reject(err);
			}
			return result.done ? result.value : Promise.resolve(result.value).then(onFulfilled, onRejected);
		}
		const generator = generatorFunc.apply(this, args);
		const onFulfilled = arg => continuer('next', arg);
		const onRejected = arg => continuer('throw', arg);
		return onFulfilled();
	};
}

// Function that immediately calls the generator and also ends the promise chain.
// This is useful to run generators at the top-level when you don't want to continue chaining promises.
function spawn(generatorFunc, ...args) {
	return Promise.resolve(async(generatorFunc)(...args));
}

function sleep(ms) {
	return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

// Some async operations should be cancelable, to ignore all the chaining callbacks of promises.
// Cancellation is supposed to flow through a graph of promise dependencies. When a promise is cancelled, it
// will propagate to the farthest pending promises and reject them with the cancel reason CancelError.
function CancelError() {}
class CancelablePromise {
	static reject(val) {
		return new CancelablePromise((res, rej) => rej(val));
	}
	static resolve(val) {
		return new CancelablePromise((res, rej) => res(val));
	}
	constructor(resolver, cancelFn) {
		this._promise = new Promise((resolve, reject) => {
			this._reject = reject;
			resolver(value => {
				resolve(value);
				this._isResolved = true;
			}, reason => {
				reject(reason);
				this._isResolved = true;
			});
		});
		this._cancelFn = cancelFn;
		this._isResolved = false;
	}
	then(cb, eb) {
		const children = [];
		const wrap = fn => function(...args) {
			const child = fn(...args);
			if(child instanceof CancelablePromise) {
				children.push(child);
			}
			return child;
		};
		return new CancelablePromise(
			resolve => resolve(this._promise.then(cb && wrap(cb), eb && wrap(eb))),
			() => {
				for(let child of children) {
					child.cancel();
				}
				this.cancel();
			});
	}
	catch(eb) {
		return this.then(void 0, eb);
	}
	cancel() {
		this._reject(new CancelError());
		if(!this._isResolved && this._cancelFn) {
			this._cancelFn();
		}
	}
}

function Maybe(ctor/*, ...args*/) {
	this._ctor = ctor;
	//this._args = args;
	this.hasValue = false;
}
Maybe.prototype = {
	get value() {
		const ctor = this._ctor;
		this.hasValue = !!ctor;
		const val = ctor ? new ctor(/*...this._args*/) : null;
		Object.defineProperty(this, 'value', { value: val });
		return val;
	},
	end() {
		if(this.hasValue) {
			this.value.end();
		}
	}
};

class TemporaryContent {
	constructor(key) {
		const oClass = /*new.target*/this.constructor; // https://github.com/babel/babel/issues/1088
		if(oClass.purgeTO) {
			clearTimeout(oClass.purgeTO);
		}
		oClass.purgeTO = setTimeout(() => oClass.purge(), oClass.purgeSecs);
		if(oClass.data) {
			const rv = oClass.data.get(key);
			if(rv) {
				return rv;
			}
		} else {
			oClass.data = new Map();
		}
		oClass.data.set(key, this);
	}
	static get(key) {
		return this.data ? this.data.get(key) : null;
	}
	static has(key) {
		return this.data ? this.data.has(key) : false;
	}
	static purge() {
		if(this.purgeTO) {
			clearTimeout(this.purgeTO);
			this.purgeTO = null;
		}
		this.data = null;
	}
	static remove(key) {
		if(this.data) {
			this.data.delete(key);
		}
	}
}
TemporaryContent.purgeSecs = 6e4;

function TasksPool(tasksCount, taskFunc, endFn) {
	this.array = [];
	this.running = 0;
	this.num = 1;
	this.func = taskFunc;
	this.endFn = endFn;
	this.max = tasksCount;
	this.completed = this.paused = this.stopped = false;
}
TasksPool.PauseError = function(duration) {
	this.name = 'TasksPool.PauseError';
	this.duration = duration;
};
TasksPool.prototype = {
	complete() {
		if(!this.stopped) {
			if(this.array.length === 0 && this.running === 0) {
				this.endFn();
			} else {
				this.completed = true;
			}
		}
	},
	'continue'() {
		if(!this.stopped) {
			this.paused = false;
			if(this.array.length === 0) {
				if(this.completed) {
					this.endFn();
				}
				return;
			}
			while(this.array.length !== 0 && this.running !== this.max) {
				this._run(this.array.shift());
				this.running++;
			}
		}
	},
	pause() {
		this.paused = true;
	},
	run(data) {
		if(!this.stopped) {
			if(this.paused || this.running === this.max) {
				this.array.push(data);
			} else {
				this._run(data);
				this.running++;
			}
		}
	},
	stop() {
		this.stopped = true;
		this.endFn();
	},

	_end() {
		if(!this.stopped) {
			if(!this.paused && this.array.length !== 0) {
				this._run(this.array.shift());
				return;
			}
			this.running--;
			if(!this.paused && this.completed && this.running === 0) {
				this.endFn();
			}
		}
	},
	_run(data) {
		this.func(this.num++, data).then(() => this._end(), e => {
			if(e instanceof TasksPool.PauseError) {
				this.pause();
				if(e.duration !== -1) {
					setTimeout(() => this['continue'](), e.duration);
				}
			} else {
				this._end();
				throw e;
			}
		});
	}
};

function TarBuilder() {
	this._data = [];
}
TarBuilder.prototype = {
	addFile(filepath, input) {
		let i, checksum = 0;
		const fileSize = input.length;
		const header = new Uint8Array(512);
		const nameLen = Math.min(filepath.length, 100);
		for(i = 0; i < nameLen; ++i) {
			header[i] = filepath.charCodeAt(i) & 0xFF;
		}
		this._padSet(header, 100, '100777', 8); // fileMode
		this._padSet(header, 108, '0', 8); // uid
		this._padSet(header, 116, '0', 8); // gid
		this._padSet(header, 124, fileSize.toString(8), 13); // fileSize
		this._padSet(header, 136, Math.floor(Date.now() / 1000).toString(8), 12); // mtime
		this._padSet(header, 148, '        ', 8); // checksum
		// type ('0')
		header[156] = 0x30;
		for(i = 0; i < 157; i++) {
			checksum += header[i];
		}
		// checksum
		this._padSet(header, 148, checksum.toString(8), 8);
		this._data.push(header, input);
		if((i = Math.ceil(fileSize / 512) * 512 - fileSize) !== 0) {
			this._data.push(new Uint8Array(i));
		}
	},
	addString(filepath, str) {
		const sDat = unescape(encodeURIComponent(str));
		const len = sDat.length;
		const data = new Uint8Array(len);
		for(let i = 0; i < len; ++i) {
			data[i] = sDat.charCodeAt(i) & 0xFF;
		}
		this.addFile(filepath, data);
	},
	get() {
		this._data.push(new Uint8Array(1024));
		return new Blob(this._data, {'type': 'application/x-tar'});
	},

	_padSet(data, offset, num, len) {
		let i = 0;
		const nLen = num.length;
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

function getErrorMessage(e) {
	if(e instanceof AjaxError) {
		return e.toString();
	}
	if(typeof e === 'string') {
		return e;
	}
	return Lng.internalError[lang] + (
		!e.stack ? e.name + ': ' + e.message :
		nav.WebKit ? e.stack :
		e.name + ': ' + e.message + '\n' + (!nav.Firefox ? e.stack : e.stack.replace(
			/^([^@]*).*\/(.+)$/gm,
			(str, fName, line) => '    at ' + (fName ? fName + ' (' + line + ')' : line)
		))
	);
}

// https://html.spec.whatwg.org/multipage/forms.html#constructing-form-data-set
function* getFormElements(form, submitter) {
	const controls = $Q('button, input, keygen, object, select, textarea', form);
	const fixName = name => name ? name.replace(/([^\r])\n|\r([^\n])/g, '$1\r\n$2') : '';
  constructSet:
	for(let i = 0, len = controls.length; i < len; ++i) {
		const field = controls[i];
		const tagName = field.tagName.toLowerCase();
		const type = field.getAttribute('type');
		const name = field.getAttribute('name');
		if($parent(field, 'DATALIST', form) || isFormElDisabled(field) ||
		   (field !== submitter && (tagName === 'button' ||
		       (tagName === 'input' && (type === 'submit' || type === 'reset' || type ===  'button'))
		   )) ||
		   (tagName === 'input' && (
		       (type === 'checkbox' && !field.checked) ||
		       (type === 'radio' && !field.checked) ||
		       (type === 'image' && !name)
		   )) ||
		   tagName === 'object'
		) {
			continue;
		}
		if(tagName === 'select') {
			const options = $Q('select > option, select > optgrout > option', field);
			for(let j = 0, jlen = options.length; j < jlen; ++j) {
				const option = options[j];
				if(option.selected && !isFormElDisabled(option)) {
					yield {
						el: field,
						name: fixName(name),
						value: option.value,
						type: type
					};
				}
			}
		} else if(tagName === 'input') {
			switch(type) {
			case 'image': throw new Error('input[type="image"] is not supported');
			case 'checkbox':
			case 'radio':
				yield {
					el: field,
					name: fixName(name),
					value: field.value || 'on',
					type: type
				};
				continue constructSet;
			case 'file':
				if(field.files.length > 0) {
					const files = field.files;
					for(let j = 0, jlen = files.length; j < jlen; ++j) {
						yield {
							el: field,
							name: name,
							value: files[j],
							type: type
						};
					}
				} else {
					yield {
						el: field,
						name: fixName(name),
						value: new File([''], ''),
						type: 'application/octet-stream'
					};
				}
				continue constructSet;
			}
		}
		if(type === 'textarea') {
			yield {
				el: field,
				name: name || '',
				value: field.value,
				type: type
			};
		} else {
			yield {
				el: field,
				name: fixName(name),
				value: field.value,
				type: type
			};
		}
		const dirname = field.getAttribute('dirname');
		if(dirname) {
			yield {
				el: field,
				name: fixName(dirname),
				value: (nav.matchesSelector(field, ':dir(rtl)') ? 'rtl': 'ltr'),
				type: 'direction'
			};
		}
	}
}

// https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
function isFormElDisabled(el) {
	switch(el.tagName.toLowerCase()) {
	case 'button':
	case 'input':
	case 'select':
	case 'textarea':
		if(el.hasAttribute('disabled')) {
			return true;
		}
		/* falls through */
	default:
		if(nav.matchesSelector(el, 'fieldset[disabled] > :not(legend):not(:first-of-type) *')) {
			return true;
		}
	}
	return false;
}

function prettifySize(val) {
	if(val > 512 * 1024 * 1024) {
		return (val / (1024 * 1024 * 1024)).toFixed(2) + Lng.sizeGByte[lang];
	}
	if(val > 512 * 1024) {
		return (val / (1024 * 1024)).toFixed(2) + Lng.sizeMByte[lang];
	}
	if(val > 512) {
		return (val / (1024)).toFixed(2) + Lng.sizeKByte[lang];
	}
	return val.toFixed(2) + Lng.sizeByte[lang];
}

function downloadBlob(blob, name) {
	const url = nav.MsEdge ? navigator.msSaveOrOpenBlob(blob, name) : window.URL.createObjectURL(blob);
	const link = docBody.appendChild($add(`<a href="${ url }" download="${ name }"></a>`));
	link.click();
	setTimeout(() => {
		window.URL.revokeObjectURL(url);
		$del(link);
	}, 2e5);
}
