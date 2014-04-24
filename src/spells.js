//============================================================================================================
//													SPELLS
//============================================================================================================

function Spells(read) {
	if(read) {
		this._read(true);
	} else {
		this.disable(false);
	}
}
Spells.names = [
	'words', 'exp', 'exph', 'imgn', 'ihash', 'subj', 'name', 'trip', 'img', 'sage', 'op', 'tlen',
	'all', 'video', 'wipe', 'num', 'vauthor'
];
Spells.needArg = [
	/* words */ true, /* exp */ true, /* exph */ true, /* imgn */ true, /* ihash */ true,
	/* subj */ false, /* name */ true, /* trip */ false, /* img */ false, /* sage */ false,
	/* op */ false, /* tlen */ false, /* all */ false, /* video */ false, /* wipe */ false,
	/* num */ true, /* vauthor */ true
];
Spells.checkArr = function(val, num) {
	var i, arr;
	for(arr = val[0], i = arr.length - 1; i >= 0; --i) {
		if(arr[i] === num) {
			return true;
		}
	}
	for(arr = val[1], i = arr.length - 1; i >= 0; --i) {
		if(num >= arr[i][0] && num <= arr[i][1]) {
			return true;
		}
	}
	return false;
};
Spells.YTubeSpell = function spell_youtube(post, val, ctx, cxTail) {
	if(!val) {
		return !!post.hasYTube;
	}
	if(!post.hasYTube || !Cfg['YTubeTitles']) {
		return false;
	}
	var i, data, len, isAuthorSpell = typeof val === 'string';
	for(i = 0, data = post.ytData, len = data.length; i < len; ++i) {
		if(isAuthorSpell ? val === data[i][1] : val.test(data[i][0])) {
			return true;
		}
	}
	if(post.ytLinksLoading === 0) {
		return false;
	}
	post.ytHideFun = function(ctx, cxTail, isASpell, val, data) {
		if(isASpell ? val === data[1] : val.test(data[0])) {
			this.ytHideFun = null;
			spells._continueCheck(this, ctx.concat(cxTail), true);
		} else if(post.ytLinksLoading === 0) {
			this.ytHideFun = null;
			spells._continueCheck(this, ctx.concat(cxTail), false);
		}
	}.bind(post, ctx, cxTail, isAuthorSpell, val);
	return null;
};
Spells.prototype = {
	_funcs: [
		// 0: #words
		function spell_words(post, val) {
			return post.text.toLowerCase().contains(val) || post.subj.toLowerCase().contains(val);
		},
		// 1: #exp
		function spell_exp(post, val) {
			return val.test(post.text);
		},
		// 2: #exph
		function spell_exph(post, val) {
			return val.test(post.html);
		},
		// 3: #imgn
		function spell_imgn(post, val) {
			for(var i = 0, imgs = post.images, len = imgs.length; i < len; ++i) {
				if(val.test(imgs[i].info)) {
					return true;
				}
			}
			return false;
		},
		// 4: #ihash
		function spell_ihash(post, val, ctx, cxTail) {
			for(var i = 0, imgs = post.images, len = imgs.length; i < len; ++i) {
				if(imgs[i].hash === val) {
					return true;
				}
			}
			if(post.hashImgsBusy === 0) {
				return false;
			}
			post.hashHideFun = function(ctx, cxTail, val, hash) {
				if(val === hash) {
					this.hashHideFun = null;
					spells._continueCheck(this, ctx.concat(cxTail), true);
				} else if(post.hashImgsBusy === 0) {
					this.hashHideFun = null;
					spells._continueCheck(this, ctx.concat(cxTail), false);
				}
			}.bind(post, ctx, cxTail, val);
			return null;
		},
		// 5: #subj
		function spell_subj(post, val) {
			var pSubj = post.subj;
			return pSubj ? !val || val.test(pSubj) : false;
		},
		// 6: #name
		function spell_name(post, val) {
			var pName = post.posterName;
			return pName ? !val || pName.contains(val) : false;
		},
		// 7: #trip
		function spell_trip(post, val) {
			var pTrip = post.posterTrip;
			return pTrip ? !val || pTrip.contains(val) : false;
		},
		// 8: #img
		function spell_img(post, val) {
			var temp, w, h, hide, img, i, imgs = post.images,
				len = imgs.length;
			if(!val) {
				return len !== 0;
			}
			for(i = 0; i < len; ++i) {
				img = imgs[i];
				if(temp = val[1]) {
					w = img.weight;
					switch(val[0]) {
					case 0: hide = w >= temp[0] && w <= temp[1]; break;
					case 1: hide = w < temp[0]; break;
					case 2: hide = w > temp[0];
					}
					if(!hide) {
						continue;
					} else if(!val[2]) {
						return true;
					}
				}
				if(temp = val[2]) {
					w = img.width;
					h = img.height;
					switch(val[0]) {
					case 0:
						if(w >= temp[0] && w <= temp[1] && h >= temp[2] && h <= temp[3]) {
							return true
						}
						break;
					case 1:
						if(w < temp[0] && h < temp[3]) {
							return true
						}
						break;
					case 2:
						if(w > temp[0] && h > temp[3]) {
							return true
						}
					}
				}
			}
			return false;
		},
		// 9: #sage
		function spell_sage(post, val) {
			return post.sage;
		},
		// 10: #op
		function spell_op(post, val) {
			return post.isOp;
		},
		// 11: #tlen
		function spell_tlen(post, val) {
			var text = post.text;
			return !val ? !!text : Spells.checkArr(val, text.replace(/\n/g, '').length);
		},
		// 12: #all
		function spell_all(post, val) {
			return true;
		},
		// 13: #video
		Spells.YTubeSpell,
		// 14: #wipe
		function spell_wipe(post, val) {
			var arr, len, i, j, n, x, keys, pop, capsw, casew, _txt, txt = post.text;
			// (1 << 0): samelines
			if(val & 1) {
				arr = txt.replace(/>/g, '').split(/\s*\n\s*/);
				if((len = arr.length) > 5) {
					arr.sort();
					for(i = 0, n = len / 4; i < len;) {
						x = arr[i];
						j = 0;
						while(arr[i++] === x) {
							j++;
						}
						if(j > 4 && j > n && x) {
							Spells._lastWipeMsg = 'same lines: "' + x.substr(0, 20) + '" x' + (j + 1);
							return true;
						}
					}
				}
			}
			// (1 << 1): samewords
			if(val & 2) {
				arr = txt.replace(/[\s\.\?\!,>]+/g, ' ').toUpperCase().split(' ');
				if((len = arr.length) > 3) {
					arr.sort();
					for(i = 0, n = len / 4, keys = 0, pop = 0; i < len; keys++) {
						x = arr[i];
						j = 0;
						while(arr[i++] === x) {
							j++;
						}
						if(len > 25) {
							if(j > pop && x.length > 2) {
								pop = j;
							}
							if(pop >= n) {
								Spells._lastWipeMsg = 'same words: "' + x.substr(0, 20) + '" x' + (pop + 1);
								return true;
							}
						}
					}
					x = keys / len;
					if(x < 0.25) {
						Spells._lastWipeMsg = 'uniq words: ' + (x * 100).toFixed(0) + '%';
						return true;
					}
				}
			}
			// (1 << 2): longwords
			if(val & 4) {
				arr = txt.replace(/https*:\/\/.*?(\s|$)/g, '').replace(/[\s\.\?!,>:;-]+/g, ' ').split(' ');
				if(arr[0].length > 50 || ((len = arr.length) > 1 && arr.join('').length / len > 10)) {
					Spells._lastWipeMsg = 'long words';
					return true;
				}
			}
			// (1 << 3): symbols
			if(val & 8) {
				_txt = txt.replace(/\s+/g, '');
				if((len = _txt.length) > 30 &&
					(x = _txt.replace(/[0-9a-zа-я\.\?!,]/ig, '').length / len) > 0.4)
				{
					Spells._lastWipeMsg = 'specsymbols: ' + (x * 100).toFixed(0) + '%';
					return true;
				}
			}
			// (1 << 4): capslock
			if(val & 16) {
				arr = txt.replace(/[\s\.\?!;,-]+/g, ' ').trim().split(' ');
				if((len = arr.length) > 4) {
					for(i = 0, n = 0, capsw = 0, casew = 0; i < len; i++) {
						x = arr[i];
						if((x.match(/[a-zа-я]/ig) || []).length < 5) {
							continue;
						}
						if((x.match(/[A-ZА-Я]/g) || []).length > 2) {
							casew++;
						}
						if(x === x.toUpperCase()) {
							capsw++;
						}
						n++;
					}
					if(capsw / n >= 0.3 && n > 4) {
						Spells._lastWipeMsg = 'CAPSLOCK: ' + capsw / arr.length * 100 + '%';
						return true;
					} else if(casew / n >= 0.3 && n > 8) {
						Spells._lastWipeMsg = 'cAsE words: ' + casew / arr.length * 100 + '%';
						return true;
					}
				}
			}
			// (1 << 5): numbers
			if(val & 32) {
				_txt = txt.replace(/\s+/g, ' ').replace(/>>\d+|https*:\/\/.*?(?: |$)/g, '');
				if((len = _txt.length) > 30 && (x = (len - _txt.replace(/\d/g, '').length) / len) > 0.4) {
					Spells._lastWipeMsg = 'numbers: ' + Math.round(x * 100) + '%';
					return true;
				}
			}
			// (1 << 5): whitespace
			if(val & 64) {
				if(/(?:\n\s*){5}/i.test(txt)) {
					Spells._lastWipeMsg = 'whitespace';
					return true;
				}
			}
			return false;
		},
		// 15: #num
		function spell_num(post, val) {
			return Spells.checkArr(val, post.count + 1);
		},
		// 16: #vauthor
		Spells.YTubeSpell
	],
	_optimizeSpells: function(spells) {
		var i, j, len, flags, type, spell, scope, neg, parensSpells, lastSpell = -1,
			newSpells = [];
		for(i = 0, len = spells.length; i < len; ++i) {
			spell = spells[i];
			flags = spell[0];
			type = flags & 0xFF;
			neg = (flags & 0x100) !== 0;
			if(type === 0xFF) {
				parensSpells = this._optimizeSpells(spell[1]);
				if(parensSpells) {
					if(parensSpells.length !== 1) {
						newSpells.push([flags, parensSpells]);
						lastSpell++;
						continue;
					} else if((parensSpells[0][0] & 0xFF) !== 12) {
						newSpells.push([(parensSpells[0][0] | (flags & 0x200)) ^ (flags & 0x100),
							parensSpells[0][1]]);
						lastSpell++;
						continue;
					}
					flags = parensSpells[0][0];
					neg = !(neg ^ ((flags & 0x100) !== 0));
				}
			} else {
				scope = spell[2];
				if(!scope || (scope[0] === brd &&
					(scope[1] === -1 ? !TNum : (!scope[1] || scope[1] === TNum))))
				{
					if(type === 12) {
						neg = !neg;
					} else {
						newSpells.push([flags, spell[1]]);
						lastSpell++;
						continue;
					}
				}
			}
			for(j = lastSpell; j >= 0 && (((newSpells[j][0] & 0x200) !== 0) ^ neg); --j) {}
			if(j !== lastSpell) {
				newSpells = newSpells.slice(0, j + 1);
				lastSpell = j;
			}
			if(neg && j !== -1) {
				newSpells[j][0] &= 0x1FF;
			}
			if(((flags & 0x200) !== 0) ^ neg) {
				break;
			}
		}
		return lastSpell === -1 ? neg ? [[12, '']] : null : newSpells;
	},
	_initSpells: function(data) {
		if(data) {
			data.forEach(function initExps(item) {
				var val = item[1];
				if(val) {
					switch(item[0] & 0xFF) {
					case 1:
					case 2:
					case 3:
					case 5:
					case 13: item[1] = toRegExp(val, true); break;
					case 0xFF: val.forEach(initExps);
					}
				}
			});
		}
		return data;
	},
	_checkRes: function(flags, val) {
		if((flags & 0x100) !== 0) {
			val = !val;
		}
		if((flags & 0x200) !== 0) {
			if(!val) {
				return false;
			}
		} else if(val) {
			return true;
		}
		return null;
	},
	_decompileSpell: function(type, neg, val, scope) {
		var temp, temp_, spell = (neg ? '!#' : '#') + Spells.names[type] + (scope ? '[' +
			scope[0] + (scope[1] ? ',' + (scope[1] === -1 ? '' : scope[1]) : '') + ']' : '');
		if(!val) {
			return spell;
		}
		// #img
		if(type === 8) {
			return spell + '(' + (val[0] === 2 ? '>' : val[0] === 1 ? '<' : '=') +
				(val[1] ? val[1][0] + (val[1][1] === val[1][0] ? '' : '-' + val[1][1]) : '') +
				(val[2] ? '@' + val[2][0] + (val[2][0] === val[2][1] ? '' : '-' + val[2][1]) + 'x' +
				val[2][2] + (val[2][2] === val[2][3] ? '' : '-' + val[2][3]) : '') + ')';
		}
		// #wipe
		else if(type === 14) {
			if(val === 0x3F) {
				return spell;
			}
			temp = [];
			(val & 1) && temp.push('samelines');
			(val & 2) && temp.push('samewords');
			(val & 4) && temp.push('longwords');
			(val & 8) && temp.push('symbols');
			(val & 16) && temp.push('capslock');
			(val & 32) && temp.push('numbers');
			(val & 64) && temp.push('whitespace');
			return spell + '(' + temp.join(',') + ')';
		}
		// #num, #tlen
		else if(type === 15 || type === 11) {
			if((temp = val[1].length - 1) !== -1) {
				for(temp_ = []; temp >= 0; temp--) {
					temp_.push(val[1][temp][0] + '-' + val[1][temp][1]);
				}
				temp_.reverse();
			}
			spell += '(';
			if(val[0].length !== 0) {
				spell += val[0].join(',') + (temp_ ? ',' : '');
			}
			if(temp_) {
				spell += temp_.join(',');
			}
			return spell + ')';
		}
		// #words, #name, #trip, #vauthor
		else if(type === 0 || type === 6 || type === 7 || type === 16) {
			return spell + '(' + val.replace(/\)/g, '\\)') + ')';
		} else {
			return spell + '(' + String(val) + ')';
		}
	},
	_decompileScope: function(scope, indent) {
		var spell, type, temp, str, dScope = [], hScope = false, i = 0, j = 0, len = scope.length;
		for(; i < len; i++, j++) {
			spell = scope[i];
			type = spell[0] & 0xFF;
			if(type === 0xFF) {
				hScope = true;
				temp = this._decompileScope(spell[1], indent + '    ');
				if(temp[1]) {
					str = ((spell[0] & 0x100) ? '!(\n' : '(\n') + indent + '    ' +
						temp[0].join('\n' + indent + '    ') + '\n' + indent + ')';
					if(j === 0) {
						dScope[0] = str;
					} else {
						dScope[--j] += ' ' + str;
					}
				} else {
					dScope[j] = ((spell[0] & 0x100) ? '!(' : '(') + temp[0].join(' ') + ')';
				}
			} else {
				dScope[j] = this._decompileSpell(type, spell[0] & 0x100, spell[1], spell[2]);
			}
			if(i !== len - 1) {
				dScope[j] += (spell[0] & 0x200) ? ' &' : ' |';
			}
		}
		return [dScope, dScope.length > 2 || hScope];
	},
	_decompileSpells: function() {
		var str, reps, oreps, data = this._data;
		if(!data) {
			this._read(false);
			if(!(data = this._data)) {
				return this._list = '';
			}
		}
		str = data[1] ? this._decompileScope(data[1], '')[0].join('\n') : '';
		reps = data[2];
		oreps = data[3];
		if(reps || oreps) {
			str += '\n\n';
			reps && reps.forEach(function(rep) {
				str += this._decompileRep(rep, false) + '\n';
			}.bind(this));
			oreps && oreps.forEach(function(orep) {
				str += this._decompileRep(orep, true) + '\n';
			}.bind(this));
			str = str.substr(0, str.length - 1);
		}
		this._data = null;
		return this._list = str;
	},
	_getMsg: function(spell) {
		var neg = spell[0] & 0x100,
			type = spell[0] & 0xFF,
			val = spell[1];
		if(type === 0xFF) {
			return this._getMsg(val[this._lastPSpell]);
		}
		if(type === 14) {
			return (neg ? '!#wipe' : '#wipe') + (Spells._lastWipeMsg ? ': ' + Spells._lastWipeMsg : '');
		} else {
			return this._decompileSpell(type, neg, val, spell[2]);
		}
	},
	_continueCheck: function(post, ctx, val) {
		var temp, rv = this._checkRes(ctx.pop(), val);
		if(rv === null) {
			if(this._check(post, ctx)) {
				return;
			}
		} else if(rv) {
			temp = ctx.pop();
			post.spellHide(this._getMsg(ctx.pop()[temp - 1]));
		} else if(!post.deleted) {
			sVis[post.count] = 1;
		}
		this._asyncWrk--;
		this.end(null);
	},
	_check: function(post, ctx) {
		var rv, type, val, temp, deep = ctx[0],
			i = ctx.pop(),
			scope = ctx.pop(),
			len = ctx.pop();
		while(true) {
			if(i < len) {
				temp = scope[i][0];
				type = temp & 0xFF;
				switch(type) {
				case 0xFF:
					ctx.push(len, scope, i);
					scope = scope[i][1];
					len = scope.length;
					i = 0;
					deep++;
					continue;
				case 4:  // #ihash
				case 13: // #video
				case 16: // #vauthor
					ctx[0] = deep;
					val = this._funcs[type](post, scope[i][1], ctx, [len, scope, i + 1, temp]);
					if(val === null) {
						this._asyncWrk++;
						return 0;
					}
					break;
				case 15: // #num
					this.hasNumSpell = true;
				default:
					val = this._funcs[type](post, scope[i][1]);
				}
				rv = this._checkRes(temp, val);
				if(rv === null) {
					i++;
					continue;
				}
				this._lastPSpell = i;
			} else {
				this._lastPSpell = i -= 1;
				rv = false;
			}
			if(deep !== 0) {
				i = ctx.pop();
				scope = ctx.pop();
				len = ctx.pop();
				deep--;
				rv = this._checkRes(scope[i][0], rv);
				if(rv === null) {
					i++;
					continue;
				}
			}
			if(rv) {
				post.spellHide(this._getMsg(scope[i]));
			} else if(!post.deleted) {
				sVis[post.count] = 1;
			}
			return +rv;
		}
	},
	_decompileRep: function(rep, isOrep) {
		return (isOrep ? '#outrep' : '#rep') +
			(rep[0] ? '[' + rep[0] + (rep[1] ? ',' + (rep[1] === -1 ? '' : rep[1]) : '') + ']' : '') +
			'(' + rep[2] + ',' + rep[3].replace(/\)/g, '\\)') + ')';
	},
	_optimizeReps: function(data) {
		if(data) {
			var nData = [];
			data.forEach(function(temp) {
				if(!temp[0] || (temp[0] === brd && (temp[1] === -1 ? !TNum : !temp[1] || temp[1] === TNum))) {
					nData.push([temp[2], temp[3]]);
				}
			});
			return nData.length === 0 ? false : nData;
		}
		return false;
	},
	_initReps: function(data) {
		if(data) {
			for(var i = data.length - 1; i >= 0; i--) {
				data[i][0] = toRegExp(data[i][0], false);
			}
		}
		return data;
	},
	_init: function(spells, reps, outreps) {
		this._spells = this._initSpells(spells);
		this._sLength = spells && spells.length;
		this._reps = this._initReps(reps);
		this._outreps = this._initReps(outreps);
		this.enable = !!this._spells;
		this.haveReps = !!reps;
		this.haveOutreps = !!outreps;
	},
	_read: function(init) {
		var spells, data;
		if(Cfg.hasOwnProperty('spells')) {
			try {
				spells = JSON.parse(Cfg['spells']);
				data = JSON.parse(sessionStorage['de-spells-' + brd + TNum]);
			} catch(e) {}
			if(data && data[0] === spells[0]) {
				this._data = spells;
				if(init) {
					this.hash = data[0];
					this._init(data[1], data[2], data[3]);
				}
				return;
			}
		} else {
			if(data = getStored('DESU_CSpells_' + aib.dm)) {
				delStored('DESU_CSpells_' + aib.dm);
				try {
					spells = JSON.parse(data);
				} catch(e) {}
				if(!spells) {
					this.disable(false);
					return;
				}
			} else {
				spells = this.parseText('#wipe(samelines,samewords,longwords,numbers,whitespace)');
			}
			saveCfg('spells', data);
		}
		if(init) {
			this.update(spells, false, false);
		} else {
			this._data = spells;
		}
	},
	_asyncWrk: 0,
	_completeFns: [],
	_hasComplFns: false,
	_data: null,
	_list: '',

	hash: 0,
	hasNumSpell: false,
	enable: false,
	get list() {
		return this._list || this._decompileSpells();
	},
	addCompleteFunc: function(Fn) {
		this._completeFns.push(Fn);
		this._hasComplFns = true;
	},
	parseText: function(str) {
		var codeGen, spells, reps = [],
			outreps = [], regexError = false,
			checkRegex = function(exp, reg) {
				if(!regexError) {
					try {
						toRegExp(reg, false);
					} catch(e) {
						var line = str.substr(0, str.indexOf(exp)).match(/\n/g).length + 1;
						$alert(Lng.error[lang] + ': ' + Lng.seErrRegex[lang].replace('%s', reg) +
							Lng.seRow[lang] + line + ')', 'help-err-spell', false);
						regexError = true;
					}
				}
			};
		str = String(str).replace(/[\s\n]+$/, '').replace(
			/([^\\]\)|^)?[\n\s]*(#rep(?:\[([a-z0-9]+)(?:(,)|,(\s*[0-9]+))?\])?\((\/.*?[^\\]\/[ig]*)(?:,\)|,(.*?[^\\])?\)))[\n\s]*/g,
			function(exp, preOp, fullExp, b, nt, t, reg, txt) {
				checkRegex(fullExp, reg);
				reps.push([b, nt ? -1 : t, reg, (txt || '').replace(/\\\)/g, ')')]);
				return preOp || '';
			}
		).replace(
			/([^\\]\)|^)?[\n\s]*(#outrep(?:\[([a-z0-9]+)(?:(,)|,(\s*[0-9]+))?\])?\((\/.*?[^\\]\/[ig]*)(?:,\)|,(.*?[^\\])?\)))[\n\s]*/g,
			function(exp, preOp, fullExp, b, nt, t, reg, txt) {
				checkRegex(fullExp, reg);
				outreps.push([b, nt ? -1 : t, reg, (txt || '').replace(/\\\)/g, ')')]);
				return preOp || '';
			}
		);
		checkRegex = null;
		if(regexError) {
			return null;
		}
		if(reps.length === 0) {
			reps = false;
		}
		if(outreps.length === 0) {
			outreps = false;
		}
		codeGen = new SpellsCodegen(str);
		spells = codeGen.generate();
		if(codeGen.hasError) {
			$alert(Lng.error[lang] + ': ' + codeGen.error, 'help-err-spell', false);
		} else if(spells || reps || outreps) {
			if(spells && Cfg['sortSpells']) {
				this.sort(spells);
			}
			return [Date.now(), spells, reps, outreps];
		}
		return null;
	},
	sort: function(sp) {
		// Wraps AND-spells with brackets for proper sorting
		for(var i = 0, len = sp.length-1; i < len; i++) {
			if(sp[i][0] > 0x200) {
				var temp = [0xFF, []];
				do {
					temp[1].push(sp.splice(i, 1)[0]);
					len--;
				} while (sp[i][0] > 0x200);
				temp[1].push(sp.splice(i, 1)[0]);
				sp.splice(i, 0, temp);
			}
		}
		sp = sp.sort();
		for(var i = 0, len = sp.length-1; i < len; i++) {
			// Removes duplicates and weaker spells
			if(sp[i][0] === sp[i+1][0] && sp[i][1] <= sp[i+1][1] && sp[i][1] >= sp[i+1][1] &&
			  (sp[i][2] === null || // Stronger spell with 3 parameters
			   sp[i][2] === undefined || // Equal spells with 2 parameters
			  (sp[i][2] <= sp[i+1][2] && sp[i][2] >= sp[i+1][2])))
			{ // Equal spells with 3 parameters
				sp.splice(i+1, 1);
				i--;
				len--;
			// Moves brackets to the end of the list
			} else if(sp[i][0] === 0xFF) {
				sp.push(sp.splice(i, 1)[0]);
				i--;
				len--;
			}
		}
	},
	update: function(data, sync, isHide) {
		var spells = data[1] ? this._optimizeSpells(data[1]) : false,
			reps = this._optimizeReps(data[2]),
			outreps = this._optimizeReps(data[3]);
		saveCfg('spells', JSON.stringify(data));
		sessionStorage['de-spells-' + brd + TNum] = JSON.stringify([data[0], spells, reps, outreps]);
		this._data = data;
		this._list = '';
		this.hash = data[0];
		if(sync) {
			localStorage['__de-spells'] = JSON.stringify({
				'hide': (!!this.list && !!isHide),
				'data': data
			});
			localStorage.removeItem('__de-spells');
		}
		this._init(spells, reps, outreps);
	},
	setSpells: function(spells, sync) {
		this.update(spells, sync, Cfg['hideBySpell']);
		if(Cfg['hideBySpell']) {
			for(var post = firstThr.op; post; post = post.next) {
				this.check(post);
			}
			this.end(savePosts);
		} else {
			this.enable = false;
		}
	},
	disable: function(sync) {
		this.enable = false;
		this._list = '';
		this._data = null;
		this.haveReps = this.haveOutreps = false;
		saveCfg('hideBySpell', false);
	},
	end: function(Fn) {
		if(this._asyncWrk === 0) {
			Fn && Fn();
			if(this._hasComplFns) {
				for(var i = 0, len = this._completeFns.length; i < len; ++i) {
					this._completeFns[i]();
				}
				this._completeFns = [];
				this._hasComplFns = false;
			}
		} else if(Fn) {
			this.addCompleteFunc(Fn);
		}
	},
	check: function(post) {
		if(this.enable) {
			return this._check(post, [0, this._sLength, this._spells, 0]);
		}
		return 0;
	},
	replace: function(txt) {
		for(var i = 0, len = this._reps.length; i < len; i++) {
			txt = txt.replace(this._reps[i][0], this._reps[i][1]);
		}
		return txt;
	},
	outReplace: function(txt) {
		for(var i = 0, len = this._outreps.length; i < len; i++) {
			txt = txt.replace(this._outreps[i][0], this._outreps[i][1]);
		}
		return txt;
	},
	addSpell: function(type, arg, scope, isNeg, spells) {
		if(!spells) {
			if(!this._data) {
				this._read(false);
			}
			spells = this._data || [Date.now(), [], false, false];
		}
		var idx, sScope = String(scope),
			sArg = String(arg);
		if(spells[1]) {
			spells[1].some(scope && isNeg ? function(spell, i) {
				var data;
				if(spell[0] === 0xFF && ((data = spell[1]) instanceof Array) && data.length === 2 &&
					data[0][0] === 0x20C && data[1][0] === type && data[1][2] == null &&
					String(data[1][1]) === sArg && String(data[0][2]) === sScope)
				{
					idx = i;
					return true;
				}
				return (spell[0] & 0x200) !== 0;
			} : function(spell, i) {
				if(spell[0] === type && String(spell[1]) === sArg && String(spell[2]) === sScope) {
					idx = i;
					return true;
				}
				return (spell[0] & 0x200) !== 0;
			});
		} else {
			spells[1] = [];
		}
		if(typeof idx !== 'undefined') {
			spells[1].splice(idx, 1);
		} else if(scope && isNeg) {
			spells[1].splice(0, 0, [0xFF, [[0x20C, '', scope], [type, arg, void 0]], void 0]);
		} else {
			spells[1].splice(0, 0, [type, arg, scope]);
		}
		this.update(spells, true, true);
		idx = null;
	}
};

function SpellsCodegen(sList) {
	this._line = 1;
	this._col = 1;
	this._sList = sList;
	this.hasError = false;
}
SpellsCodegen.prototype = {
	TYPE_UNKNOWN: 0,
	TYPE_ANDOR: 1,
	TYPE_NOT: 2,
	TYPE_SPELL: 3,
	TYPE_PARENTHESES: 4,

	generate: function() {
		return this._sList ? this._generate(this._sList, false) : null;
	},
	get error() {
		if(!this.hasError) {
			return '';
		}
		return (this._errMsgArg ? this._errMsg.replace('%s', this._errMsgArg) : this._errMsg) +
			Lng.seRow[lang] + this._line + Lng.seCol[lang] + this._col + ')';
	},

	_errMsg: '',
	_errMsgArg: null,
	_generate: function(sList, inParens) {
		var res, name, i = 0,
			len = sList.length,
			data = [],
			lastType = this.TYPE_UNKNOWN;
		for(; i < len; i++, this._col++) {
			switch(sList[i]) {
			case '\n':
				this._line++;
				this._col = 0;
			case '\r':
			case ' ': continue;
			case '#':
				if(lastType === this.TYPE_SPELL || lastType === this.TYPE_PARENTHESES) {
					this._setError(Lng.seMissOp[lang], null);
					return null;
				}
				name = '';
				i++;
				this._col++;
				while((sList[i] >= 'a' && sList[i] <= 'z') || (sList[i] >= 'A' && sList[i] <= 'Z')) {
					name += sList[i].toLowerCase();
					i++;
					this._col++;
				}
				res = this._doSpell(name, sList.substr(i), lastType === this.TYPE_NOT)
				if(!res) {
					return null;
				}
				i += res[0] - 1;
				this._col += res[0] - 1;
				data.push(res[1]);
				lastType = this.TYPE_SPELL;
				break;
			case '(':
				if(lastType === this.TYPE_SPELL || lastType === this.TYPE_PARENTHESES) {
					this._setError(Lng.seMissOp[lang], null);
					return null;
				}
				res = this._generate(sList.substr(i + 1), true);
				if(!res) {
					return null;
				}
				i += res[0] + 1;
				data.push([lastType === this.TYPE_NOT ? 0x1FF : 0xFF, res[1]]);
				lastType = this.TYPE_PARENTHESES;
				break;
			case '|':
			case '&':
				if(lastType !== this.TYPE_SPELL && lastType !== this.TYPE_PARENTHESES) {
					this._setError(Lng.seMissSpell[lang], null);
					return null;
				}
				if(sList[i] === '&') {
					data[data.length - 1][0] |= 0x200;
				}
				lastType = this.TYPE_ANDOR;
				break;
			case '!':
				if(lastType !== this.TYPE_ANDOR && lastType !== this.TYPE_UNKNOWN) {
					this._setError(Lng.seMissOp[lang], null);
					return null;
				}
				lastType = this.TYPE_NOT;
				break;
			case ')':
				if(lastType === this.TYPE_ANDOR || lastType === this.TYPE_NOT) {
					this._setError(Lng.seMissSpell[lang], null);
					return null;
				}
				if(inParens) {
					return [i, data];
				}
			default:
				this._setError(Lng.seUnexpChar[lang], sList[i]);
				return null;
			}
		}
		if(inParens) {
			this._setError(Lng.seMissClBkt[lang], null);
			return null;
		}
		if(lastType !== this.TYPE_SPELL && lastType !== this.TYPE_PARENTHESES) {
			this._setError(Lng.seMissSpell[lang], null);
			return null;
		}
		return data;
	},
	_doSpell: function(name, str, isNeg) {
		var scope, m, spellType, val, i = 0,
			spellIdx = Spells.names.indexOf(name);
		if(spellIdx === -1) {
			this._setError(Lng.seUnknown[lang], name);
			return null;
		}
		spellType = isNeg ? spellIdx | 0x100 : spellIdx;
		m = str.match(/^\[([a-z0-9\/]+)(?:(,)|,(\s*[0-9]+))?\]/);
		if(m) {
			i = m[0].length;
			str = str.substring(i);
			scope = [m[1], m[3] ? m[3] : m[2] ? -1 : false];
		} else {
			scope = null;
		}
		if(str[0] !== '(' || str[1] === ')') {
			if(Spells.needArg[spellIdx]) {
				this._setError(Lng.seMissArg[lang], name);
				return null;
			}
			return [str[0] === '(' ? i + 2 : i, [spellType, spellIdx === 14 ? 0x3F : '', scope]];
		}
		switch(spellIdx) {
		// #ihash
		case 4:
			m = str.match(/^\((\d+)\)/);
			if(+m[1] === +m[1]) {
				return [i + m[0].length, [spellType, +m[1], scope]];
			}
			break;
		// #img
		case 8:
			m = str.match(/^\(([><=])(?:(\d+(?:\.\d+)?)(?:-(\d+(?:\.\d+)?))?)?(?:@(\d+)(?:-(\d+))?x(\d+)(?:-(\d+))?)?\)/);
			if(m && (m[2] || m[4])) {
				return [i + m[0].length, [spellType, [
					m[1] === '=' ? 0 : m[1] === '<' ? 1 : 2,
					m[2] && [+m[2], m[3] ? +m[3] : +m[2]],
					m[4] && [+m[4], m[5] ? +m[5] : +m[4], +m[6], m[7] ? +m[7] : +m[6]]
				], scope]];
			}
			break;
		// #wipe
		case 14:
			m = str.match(/^\(([a-z, ]+)\)/);
			if(m) {
				val = m[1].split(/, */).reduce(function(val, str) {
					switch(str) {
					case 'samelines': return val |= 1;
					case 'samewords': return val |= 2;
					case 'longwords': return val |= 4;
					case 'symbols': return val |= 8;
					case 'capslock': return val |= 16;
					case 'numbers': return val |= 32;
					case 'whitespace': return val |= 64;
					default: return -1;
					}
				}, 0);
				if(val !== -1) {
					return [i + m[0].length, [spellType, val, scope]];
				}
			}
			break;
		// #tlen, #num
		case 11:
		case 15:
			m = str.match(/^\(([\d-, ]+)\)/);
			if(m) {
				m[1].split(/, */).forEach(function(v) {
					if(v.contains('-')) {
						var nums = v.split('-');
						nums[0] = +nums[0];
						nums[1] = +nums[1];
						this[1].push(nums);
					} else {
						this[0].push(+v);
					}
				}, val = [[], []]);
				return [i + m[0].length, [spellType, val, scope]];
			}
			break;
		// #exp, #exph, #imgn, #subj, #video
		case 1:
		case 2:
		case 3:
		case 5:
		case 13:
			m = str.match(/^\((\/.*?[^\\]\/[igm]*)\)/);
			if(m) {
				val = m[1];
				try {
					toRegExp(val, true);
				} catch(e) {
					this._setError(Lng.seErrRegex[lang], val);
					return null;
				}
				return [i + m[0].length, [spellType, val, scope]];
			}
			break;
		// #sage, #op, #all, #trip, #name, #words, #vauthor
		default:
			m = str.match(/^\((.*?[^\\])\)/);
			if(m) {
				val = m[1].replace(/\\\)/g, ')');
				return [i + m[0].length, [spellType, spellIdx === 0 ? val.toLowerCase() : val, scope]];
			}
		}
		this._setError(Lng.seSyntaxErr[lang], name);
		return null;
	},
	_setError: function(msg, arg) {
		this.hasError = true;
		this._errMsg = msg;
		this._errMsgArg = arg;
	}
};

function disableSpells() {
	closeAlert($id('de-alert-help-err-spell'));
	if(spells.enable) {
		sVis = TNum ? '1'.repeat(firstThr.pcount).split('') : [];
		for(var post = firstThr.op; post; post = post.next) {
			if(post.spellHidden && !post.userToggled) {
				post.spellUnhide();
			}
		}
	}
}

function toggleSpells() {
	var temp, fld = $id('de-spell-edit'),
		val = fld.value;
	if(val && (temp = spells.parseText(val))) {
		disableSpells();
		spells.setSpells(temp, true);
		fld.value = spells.list;
	} else {
		if(val) {
			localStorage['__de-spells'] = '{"hide": false, "data": null}';
		} else {
			disableSpells();
			spells.disable();
			saveCfg('spells', '');
			localStorage['__de-spells'] = '{"hide": false, "data": ""}';
		}
		localStorage.removeItem('__de-spells');
		$q('input[info="hideBySpell"]', doc).checked = spells.enable = false;
	}
}

function addSpell(type, arg, isNeg) {
	var temp, fld = $id('de-spell-edit'),
		val = fld && fld.value,
		chk = $q('input[info="hideBySpell"]', doc);
	if(!val || (temp = spells.parseText(val))) {
		disableSpells();
		spells.addSpell(type, arg, TNum ? [brd, TNum] : null, isNeg, temp);
		val = spells.list;
		saveCfg('hideBySpell', !!val);
		if(val) {
			for(var post = firstThr.op; post; post = post.next) {
				spells.check(post);
			}
			spells.end(savePosts);
		} else {
			saveCfg('spells', '');
			spells.enable = false;
		}
		if(fld) {
			chk.checked = !!(fld.value = val);
		}
		return;
	}
	spells.enable = false;
	if(chk) {
		chk.checked = false;
	}
}

function checkPostsVisib() {
	for(var vis, num, date = Date.now(), post = firstThr.op; post; post = post.next) {
		num = post.num;
		if(num in uVis) {
			if(post.isOp) {
				uVis[num][0] = +!(num in hThr[brd]);
			}
			if(uVis[num][0] === 0) {
				post.setUserVisib(true, date, false);
			} else {
				uVis[num][1] = date;
				post.btns.firstChild.className = 'de-btn-hide-user';
				post.userToggled = true;
			}
		} else {
			vis = sVis[post.count];
			if(post.isOp) {
				if(num in hThr[brd]) {
					vis = '0';
				} else if(vis === '0') {
					vis = null;
				}
			}
			if(vis === '0') {
				post.setVisib(true);
				post.spellHidden = true;
			} else if(vis !== '1') {
				spells.check(post);
			}
		}
	}
	spells.end(savePosts);
}

