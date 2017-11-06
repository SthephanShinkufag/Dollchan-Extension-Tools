/* ==[ Spells.js ]============================================================================================
                                                    SPELLS
=========================================================================================================== */

var Spells = Object.create({
	hash  : null,
	names : [
		'words', 'exp', 'exph', 'imgn', 'ihash', 'subj', 'name', 'trip', 'img', 'sage', 'op', 'tlen',
		'all', 'video', 'wipe', 'num', 'vauthor'
	],
	needArg: [
		/* words */ true, /* exp */ true, /* exph */ true, /* imgn */ true, /* ihash */ true,
		/* subj */ false, /* name */ true, /* trip */ false, /* img */ false, /* sage */ false,
		/* op */ false, /* tlen */ false, /* all */ false, /* video */ false, /* wipe */ false,
		/* num */ true, /* vauthor */ true
	],
	get hiders() {
		this._init();
		return this.hiders;
	},
	get reps() {
		this._init();
		return this.reps;
	},
	get outreps() {
		this._init();
		return this.outreps;
	},
	get list() {
		var str, reps, oreps, data;
		if(Cfg.spells === null) {
			return '#wipe(samelines,samewords,longwords,symbols,numbers,whitespace)';
		}
		try {
			data = JSON.parse(Cfg.spells);
		} catch(e) {
			return '';
		}
		str = data[1] ? this._decompileScope(data[1], '')[0].join('\n') : '';
		reps = data[2];
		oreps = data[3];
		if(reps || oreps) {
			if(str) {
				str += '\n\n';
			}
			if(reps) {
				for(var rep of reps) {
					str += this._decompileRep(rep, false) + '\n';
				}
			}
			if(oreps) {
				for(var orep of oreps) {
					str += this._decompileRep(orep, true) + '\n';
				}
			}
			str = str.substr(0, str.length - 1);
		}
		return str;
	},
	add(type, arg, isNeg) {
		var fld = $id('de-spell-txt'),
			val = fld && fld.value,
			chk = $q('input[info="hideBySpell"]'),
			spells = val && this.parseText(val);
		if(!val || spells) {
			if(!spells) {
				try {
					spells = JSON.parse(Cfg.spells);
				} catch(e) {}
				spells = spells || [Date.now(), [], null, null];
			}
			var idx, scope = aib.t ? [aib.b, aib.t] : null,
				sScope = String(scope),
				sArg = String(arg);
			var isAdded = true;
			if(spells[1]) {
				spells[1].some(scope && isNeg ? function(spell, i) {
					var data;
					if(spell[0] === 0xFF &&
						((data = spell[1]) instanceof Array) &&
						data.length === 2 &&
						data[0][0] === 0x20C &&
						data[1][0] === type &&
						data[1][2] == null &&
						String(data[1][1]) === sArg &&
						String(data[0][2]) === sScope
					) {
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
			if(typeof idx === 'undefined') {
				if(scope && isNeg) {
					spells[1].unshift([0xFF, [[0x20C, '', scope], [type, arg, void 0]], void 0]);
				} else {
					spells[1].unshift([type, arg, scope]);
				}
			} else if(Cfg.hideBySpell) {
				if(spells[1].length === 1) {
					spells[1] = null;
				} else {
					spells[1].splice(idx, 1);
				}
				isAdded = false;
			}
			if(isAdded) {
				saveCfg('hideBySpell', 1);
				if(chk) {
					chk.checked = true;
				}
			} else if(!spells[1] && !spells[2] && !spells[3]) {
				saveCfg('hideBySpell', 0);
				if(chk) {
					chk.checked = false;
				}
			}
			saveCfg('spells', JSON.stringify(spells));
			this.setSpells(spells, true);
			if(fld) {
				fld.value = this.list;
			}
			Pview.updatePosition(true);
			return;
		}
		if(chk) {
			chk.checked = false;
		}
	},
	decompileSpell(type, neg, val, scope, wipeMsg = null) {
		var spell = (neg ? '!#' : '#') + Spells.names[type] + (scope ? '[' +
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
		// #wipe
		} else if(type === 14) {
			if(val === 0x3F && !wipeMsg) {
				return spell;
			}
			var [msgBit, msgData] = wipeMsg || [],
				names = [],
				bits = {
					1  : 'samelines',
					2  : 'samewords',
					4  : 'longwords',
					8  : 'symbols',
					16 : 'capslock',
					32 : 'numbers',
					64 : 'whitespace' };
			for(var bit in bits) {
				if(+bit !== msgBit) {
					if(val & +bit) {
						names.push(bits[bit]);
					}
				}
			}
			if(msgBit) {
				names.push(bits[msgBit].toUpperCase() + (msgData ? ': ' + msgData : ''));
			}
			return spell + '(' + names.join(',') + ')';
		// #num, #tlen
		} else if(type === 15 || type === 11) {
			var temp_, temp = val[1].length - 1;
			if(temp !== -1) {
				for(temp_ = []; temp >= 0; --temp) {
					temp_.push(val[1][temp][0] + '-' + val[1][temp][1]);
				}
				temp_.reverse();
			}
			spell += '(';
			if(val[0].length) {
				spell += val[0].join(',') + (temp_ ? ',' : '');
			}
			if(temp_) {
				spell += temp_.join(',');
			}
			return spell + ')';
		// #words, #name, #trip, #vauthor
		} else if(type === 0 || type === 6 || type === 7 || type === 16) {
			return spell + '(' + val.replace(/([)\\])/g, '\\$1').replace(/\n/g, '\\n') + ')';
		} else {
			return spell + '(' + String(val) + ')';
		}
	},
	disable() {
		var value = null, configurable = true;
		Object.defineProperties(this, {
			hiders  : { configurable, value },
			outreps : { configurable, value },
			reps    : { configurable, value } });
		saveCfg('hideBySpell', 0);
	},
	outReplace(txt) {
		for(var orep of this.outreps) {
			txt = txt.replace(orep[0], orep[1]);
		}
		return txt;
	},
	parseText(text) {
		var codeGen = new SpellsCodegen(text),
			data = codeGen.generate();
		if(codeGen.hasError) {
			$popup('err-spell', Lng.error[lang] + ': ' + codeGen.error);
		} else if(data) {
			if(data[0] && Cfg.sortSpells) {
				this._sort(data[0]);
			}
			return [Date.now(), data[0], data[1], data[2]];
		}
		return null;
	},
	setSpells(spells, sync) {
		if(sync) {
			this._sync(spells);
		}
		if(!Cfg.hideBySpell) {
			SpellsRunner.unhideAll();
			this.disable();
			return;
		}
		this._optimize(spells);
		if(this.hiders) {
			var sRunner = new SpellsRunner();
			for(var post = Thread.first.op; post; post = post.next) {
				sRunner.run(post);
			}
			sRunner.end();
		} else {
			SpellsRunner.unhideAll();
		}
	},
	replace(txt) {
		for(var orep of this.reps) {
			txt = txt.replace(orep[0], orep[1]);
		}
		return txt;
	},
	toggle() {
		var spells, fld = $id('de-spell-txt'),
			val = fld.value;
		if(val && (spells = this.parseText(val))) {
			closePopup('err-spell');
			this.setSpells(spells, true);
			saveCfg('spells', JSON.stringify(spells));
			fld.value = this.list;
		} else {
			if(!val) {
				closePopup('err-spell');
				SpellsRunner.unhideAll();
				this.disable();
				saveCfg('spells', JSON.stringify([Date.now(), null, null, null]));
				locStorage['__de-spells'] = '{"hide": false, "data": null}';
				locStorage.removeItem('__de-spells');
			}
			$q('input[info="hideBySpell"]').checked = false;
		}
	},

	_decompileScope(scope, indent) {
		var dScope = [],
			hScope = false;
		for(var i = 0, j = 0, len = scope.length; i < len; i++, j++) {
			var spell = scope[i],
				type = spell[0] & 0xFF;
			if(type === 0xFF) {
				hScope = true;
				var temp = this._decompileScope(spell[1], indent + '    ');
				if(temp[1]) {
					var str = ((spell[0] & 0x100) ? '!(\n' : '(\n') + indent + '    ' +
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
				dScope[j] = this.decompileSpell(type, spell[0] & 0x100, spell[1], spell[2]);
			}
			if(i !== len - 1) {
				dScope[j] += (spell[0] & 0x200) ? ' &' : ' |';
			}
		}
		return [dScope, dScope.length > 2 || hScope];
	},
	_decompileRep(rep, isOrep) {
		return (isOrep ? '#outrep' : '#rep') +
			(rep[0] ? '[' + rep[0] + (rep[1] ? ',' + (rep[1] === -1 ? '' : rep[1]) : '') + ']' : '') +
			'(' + rep[2] + ',' + rep[3].replace(/([)\\])/g, '\\$1').replace(/\n/g, '\\n') + ')';
	},
	_init() {
		if(!Cfg.hideBySpell) {
			var value = null, configurable = true;
			Object.defineProperties(this, {
				hiders  : { configurable, value },
				outreps : { configurable, value },
				reps    : { configurable, value } });
			return;
		}
		var spells, data;
		try {
			spells = JSON.parse(Cfg.spells);
			data = JSON.parse(sesStorage['de-spells-' + aib.b + (aib.t || '')]);
		} catch(e) {}
		if(data && spells && data[0] === spells[0]) {
			this.hash = data[0];
			this._setData(data[1], data[2], data[3]);
			return;
		}
		if(spells) {
			this._optimize(spells);
		} else {
			this.disable();
		}
	},
	_initHiders(data) {
		if(data) {
			for(var item of data) {
				var val = item[1];
				if(val) {
					switch(item[0] & 0xFF) {
					case 1:
					case 2:
					case 3:
					case 5:
					case 13: item[1] = toRegExp(val, true); break;
					case 0xFF: this._initHiders(val);
					}
				}
			}
		}
		return data;
	},
	_initReps(data) {
		if(data) {
			for(var item of data) {
				item[0] = toRegExp(item[0], false);
			}
		}
		return data;
	},
	_optimize(data) {
		var hiders = data[1] ? this._optimizeSpells(data[1]) : null,
			reps = data[2] ? this._optimizeReps(data[2]) : null,
			outreps = data[3] ? this._optimizeReps(data[3]) : null;
		sesStorage['de-spells-' + aib.b + (aib.t || '')] = JSON.stringify([data[0], hiders, reps, outreps]);
		this.hash = data[0];
		this._setData(hiders, reps, outreps);
	},
	_optimizeReps(data) {
		var rv = [];
		for(var rep of data) {
			if(!rep[0] || (rep[0] === aib.b && (rep[1] === -1 ? !aib.t : !rep[1] || +rep[1] === aib.t))) {
				rv.push([rep[2], rep[3]]);
			}
		}
		return !rv.length ? null : rv;
	},
	_optimizeSpells(spells) {
		var neg, lastSpell = -1,
			newSpells = [];
		for(var i = 0, len = spells.length; i < len; ++i) {
			var j, spell = spells[i],
				flags = spell[0],
				type = flags & 0xFF;
			neg = (flags & 0x100) !== 0;
			if(type === 0xFF) {
				var parensSpells = this._optimizeSpells(spell[1]);
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
				var scope = spell[2];
				if(!scope || (
					scope[0] === aib.b &&
					(scope[1] === -1 ? !aib.t : (!scope[1] || +scope[1] === aib.t))
				)) {
					if(type === 12) {
						neg = !neg;
					} else {
						newSpells.push([flags, spell[1]]);
						lastSpell++;
						continue;
					}
				}
			}
			for(j = lastSpell; j >= 0 && (((newSpells[j][0] & 0x200) !== 0) ^ neg); --j) /* empty */;
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
	_setData(hiders, reps, outreps) {
		var configurable = true;
		Object.defineProperties(this, {
			hiders  : { configurable, value: this._initHiders(hiders) },
			outreps : { configurable, value: this._initReps(outreps) },
			reps    : { configurable, value: this._initReps(reps) } });
	},
	_sort(sp) {
		// Wraps AND-spells with brackets for proper sorting
		for(let i = 0, len = sp.length - 1; i < len; i++) {
			if(sp[i][0] > 0x200) {
				const temp = [0xFF, []];
				do {
					temp[1].push(sp.splice(i, 1)[0]);
					len--;
				} while(sp[i][0] > 0x200);
				temp[1].push(sp.splice(i, 1)[0]);
				sp.splice(i, 0, temp);
			}
		}
		sp = sp.sort();
		for(let i = 0, len = sp.length - 1; i < len; i++) {
			// Removes duplicates and weaker spells
			const j = i + 1;
			if(sp[i][0] === sp[j][0] &&
				sp[i][1] <= sp[j][1] &&
				sp[i][1] >= sp[j][1] && (
					sp[i][2] === null || // Stronger spell with 3 parameters
					sp[i][2] === undefined || // Equal spells with 2 parameters
					(sp[i][2] <= sp[j][2] && sp[i][2] >= sp[j][2]))
			) { // Equal spells with 3 parameters
				sp.splice(j, 1);
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
	_sync(data) {
		locStorage['__de-spells'] = JSON.stringify({ hide: !!Cfg.hideBySpell, data });
		locStorage.removeItem('__de-spells');
	}
});

function SpellsCodegen(sList) {
	this._line = 1;
	this._col = 1;
	this._sList = sList;
	this.hasError = false;
}
SpellsCodegen.prototype = {
	TYPE_UNKNOWN     : 0,
	TYPE_ANDOR       : 1,
	TYPE_NOT         : 2,
	TYPE_SPELL       : 3,
	TYPE_PARENTHESES : 4,
	TYPE_REPLACER    : 5,

	generate() {
		return this._sList ? this._generate(this._sList, false) : null;
	},
	get error() {
		if(!this.hasError) {
			return '';
		}
		return (this._errMsgArg ? this._errMsg.replace('%s', this._errMsgArg) : this._errMsg) +
			Lng.seRow[lang] + this._line + Lng.seCol[lang] + this._col + ')';
	},

	_errMsg    : '',
	_errMsgArg : null,
	_generate(sList, inParens) {
		var spells = [],
			reps = [],
			outreps = [],
			lastType = this.TYPE_UNKNOWN,
			hasReps = false;
		for(var i = 0, len = sList.length; i < len; i++, this._col++) {
			var res;
			switch(sList[i]) {
			case '\n':
				this._line++;
				this._col = 0;
				/* falls through */
			case '\r':
			case ' ': continue;
			case '#':
				var name = '';
				i++;
				this._col++;
				while((sList[i] >= 'a' && sList[i] <= 'z') || (sList[i] >= 'A' && sList[i] <= 'Z')) {
					name += sList[i].toLowerCase();
					i++;
					this._col++;
				}
				if(name === 'rep' || name === 'outrep') {
					if(!hasReps) {
						if(inParens) {
							this._col -= 1 + name.length;
							this._setError(Lng.seRepsInParens[lang], '#' + name);
							return null;
						}
						if(lastType === this.TYPE_ANDOR || lastType === this.TYPE_NOT) {
							i -= 1 + name.length;
							this._col -= 1 + name.length;
							lookBack:
							while(i >= 0) {
								switch(sList[i]) {
								case '\n':
								case '\r':
								case ' ':
									i--;
									this._col--;
									break;
								default:
									break lookBack;
								}
							}
							this._setError(Lng.seOpInReps[lang], sList[i]);
							return null;
						}
						hasReps = true;
					}
					res = this._doRep(name, sList.substr(i));
					if(!res) {
						return null;
					}
					(name === 'rep' ? reps : outreps).push(res[1]);
					i += res[0] - 1;
					this._col += res[0] - 1;
					lastType = this.TYPE_REPLACER;
				} else {
					if(lastType === this.TYPE_SPELL || lastType === this.TYPE_PARENTHESES) {
						this._setError(Lng.seMissOp[lang], null);
						return null;
					}
					res = this._doSpell(name, sList.substr(i), lastType === this.TYPE_NOT);
					if(!res) {
						return null;
					}
					i += res[0] - 1;
					this._col += res[0] - 1;
					spells.push(res[1]);
					lastType = this.TYPE_SPELL;
				}
				break;
			case '(':
				if(hasReps) {
					this._setError(Lng.seUnexpChar[lang], '(');
					return null;
				}
				if(lastType === this.TYPE_SPELL || lastType === this.TYPE_PARENTHESES) {
					this._setError(Lng.seMissOp[lang], null);
					return null;
				}
				res = this._generate(sList.substr(i + 1), true);
				if(!res) {
					return null;
				}
				i += res[0] + 1;
				spells.push([lastType === this.TYPE_NOT ? 0x1FF : 0xFF, res[1]]);
				lastType = this.TYPE_PARENTHESES;
				break;
			case '|':
			case '&':
				if(hasReps) {
					this._setError(Lng.seUnexpChar[lang], sList[i]);
					return null;
				}
				if(lastType !== this.TYPE_SPELL && lastType !== this.TYPE_PARENTHESES) {
					this._setError(Lng.seMissSpell[lang], null);
					return null;
				}
				if(sList[i] === '&') {
					spells[spells.length - 1][0] |= 0x200;
				}
				lastType = this.TYPE_ANDOR;
				break;
			case '!':
				if(hasReps) {
					this._setError(Lng.seUnexpChar[lang], '!');
					return null;
				}
				if(lastType !== this.TYPE_ANDOR && lastType !== this.TYPE_UNKNOWN) {
					this._setError(Lng.seMissOp[lang], null);
					return null;
				}
				lastType = this.TYPE_NOT;
				break;
			case ')':
				if(hasReps) {
					this._setError(Lng.seUnexpChar[lang], ')');
					return null;
				}
				if(lastType === this.TYPE_ANDOR || lastType === this.TYPE_NOT) {
					this._setError(Lng.seMissSpell[lang], null);
					return null;
				}
				if(inParens) {
					return [i, spells];
				}
				/* falls through */
			default:
				this._setError(Lng.seUnexpChar[lang], sList[i]);
				return null;
			}
		}
		if(inParens) {
			this._setError(Lng.seMissClBkt[lang], null);
			return null;
		}
		if(lastType !== this.TYPE_SPELL &&
			lastType !== this.TYPE_PARENTHESES &&
			lastType !== this.TYPE_REPLACER
		) {
			this._setError(Lng.seMissSpell[lang], null);
			return null;
		}
		if(!reps.length) {
			reps = false;
		}
		if(!outreps.length) {
			outreps = false;
		}
		return [spells, reps, outreps];
	},
	_getScope(str) {
		var m = str.match(/^\[([a-z0-9/]+)(?:(,)|,(\s*[0-9]+))?\]/);
		if(m) {
			return [m[0].length, [m[1], m[3] ? +m[3] : m[2] ? -1 : false]];
		}
		return null;
	},
	_getRegex(str, haveComma) {
		var val, m = str.match(/^\((\/.*?[^\\]\/[igm]*)(?:\)|\s*(,))/);
		if(!m) {
			return null;
		}
		if(haveComma !== Boolean(m[2])) {
			return null;
		}
		val = m[1];
		try {
			toRegExp(val, true);
		} catch(e) {
			this._setError(Lng.seErrRegex[lang], val);
			return null;
		}
		return [m[0].length, val];
	},
	_getText(str, haveBracket) {
		if(haveBracket && (str[0] !== '(')) {
			return [0, ''];
		}
		var rv = '';
		for(var i = haveBracket ? 1 : 0, len = str.length; i < len; ++i) {
			var ch = str[i];
			if(ch === '\\') {
				if(i === len - 1) {
					return null;
				}
				switch(str[i + 1]) {
				case 'n': // \n
					rv += '\n';
					break;
				case '\\': // \
					rv += '\\';
					break;
				case ')': // )
					rv += ')';
					break;
				default:
					return null;
				}
				++i;
			} else if(ch === ')') {
				return [i + 1, rv];
			} else {
				rv += ch;
			}
		}
		return null;
	},
	_doRep(name, str) {
		var regex, scope = this._getScope(str);
		if(scope) {
			str = str.substring(scope[0]);
		} else {
			scope = [0, ['', '']];
		}
		regex = this._getRegex(str, true);
		if(regex) {
			str = str.substring(regex[0]);
			if(str[0] === ')') {
				return [regex[0] + scope[0] + 1, [scope[1][0], scope[1][1], regex[1], '']];
			}
			var val = this._getText(str, false);
			if(val) {
				return [val[0] + regex[0] + scope[0], [scope[1][0], scope[1][1], regex[1], val[1]]];
			}
		}
		this._setError(Lng.seSyntaxErr[lang], name);
		return null;
	},
	_doSpell(name, str, isNeg) {
		var m, spellType, val, temp, scope = null, i = 0,
			spellIdx = Spells.names.indexOf(name);
		if(spellIdx === -1) {
			this._setError(Lng.seUnknown[lang], name);
			return null;
		}
		temp = this._getScope(str);
		if(temp) {
			i += temp[0];
			str = str.substring(temp[0]);
			scope = temp[1];
		}
		spellType = isNeg ? spellIdx | 0x100 : spellIdx;
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
					case 'samelines': return (val |= 1);
					case 'samewords': return (val |= 2);
					case 'longwords': return (val |= 4);
					case 'symbols': return (val |= 8);
					case 'capslock': return (val |= 16);
					case 'numbers': return (val |= 32);
					case 'whitespace': return (val |= 64);
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
					if(v.includes('-')) {
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
			temp = this._getRegex(str, false);
			if(temp) {
				return [i + temp[0], [spellType, temp[1], scope]];
			}
			break;
		// #sage, #op, #all, #trip, #name, #words, #vauthor
		default:
			temp = this._getText(str, true);
			if(temp) {
				return [i + temp[0], [spellType, spellIdx === 0 ? temp[1].toLowerCase() : temp[1], scope]];
			}
		}
		this._setError(Lng.seSyntaxErr[lang], name);
		return null;
	},
	_setError(msg, arg) {
		this.hasError = true;
		this._errMsg = msg;
		this._errMsgArg = arg;
	}
};

class SpellsRunner {
	static unhideAll() {
		if(aib.t) {
			sesStorage['de-hidden-' + aib.b + aib.t] = null;
		}
		for(var post = Thread.first.op; post; post = post.next) {
			if(post.spellHidden) {
				post.spellUnhide();
			}
		}
	}
	constructor() {
		this.hasNumSpell = false;
		this._endPromise = null;
		this._spells = Spells.hiders;
		if(!this._spells) {
			this.run = this._unhidePost;
			SpellsRunner.cachedData = null;
		}
	}
	end() {
		if(this._endPromise) {
			this._endPromise.then(() => this._savePostsHelper());
		} else {
			this._savePostsHelper();
		}
	}
	run(post) {
		var interp = new SpellsInterpreter(post, this._spells);
		var res = interp.run();
		if(res instanceof Promise) {
			res = res.then(val => this._checkRes(post, val));
			this._endPromise = this._endPromise ? this._endPromise.then(() => res) : res;
			return 0;
		}
		return this._checkRes(post, res);
	}

	_checkRes(post, [hasNumSpell, val, msg]) {
		this.hasNumSpell |= hasNumSpell;
		if(val) {
			post.spellHide(msg);
			if(SpellsRunner.cachedData && !post.deleted) {
				SpellsRunner.cachedData[post.count] = [true, msg];
			}
			return 1;
		}
		return this._unhidePost(post);
	}
	_unhidePost(post) {
		if(post.spellHidden) {
			post.spellUnhide();
			if(SpellsRunner.cachedData && !post.deleted) {
				SpellsRunner.cachedData[post.count] = [false, null];
			}
		}
		return 0;
	}
	_savePostsHelper() {
		if(this._spells) {
			if(aib.t) {
				var lPost = Thread.first.lastNotDeleted,
					data = null;
				if(Spells.hiders) {
					if(SpellsRunner.cachedData) {
						data = SpellsRunner.cachedData;
					} else {
						data = [];
						for(var post = Thread.first.op; post; post = post.nextNotDeleted) {
							var hidden = post.spellHidden;
							data.push(hidden ? [true, Post.Note.text] : [false, null]);
						}
						SpellsRunner.cachedData = data;
					}
				}
				sesStorage['de-hidden-' + aib.b + aib.t] = !data ? null : JSON.stringify({
					hash      : Cfg.hideBySpell ? Spells.hash : 0,
					lastCount : lPost.count,
					lastNum   : lPost.num,
					data });
			}
			toggleWindow('hid', true);
		}
		ImagesHashStorage.endFn();
	}
}
SpellsRunner.cachedData = null;

function SpellsInterpreter(post, spells) {
	this._post = post;
	this._ctx = [spells.length, spells, 0, false];
	this._lastTSpells = [];
	this._triggeredSpellsStack = [this._lastTSpells];
	this._deep = 0;
}
SpellsInterpreter.prototype = {
	hasNumSpell: false,
	run() {
		var rv, stopCheck, isNegScope = this._ctx.pop(),
			i = this._ctx.pop(),
			scope = this._ctx.pop(),
			len = this._ctx.pop();
		while(true) {
			if(i < len) {
				var type = scope[i][0] & 0xFF;
				if(type === 0xFF) {
					this._deep++;
					this._ctx.push(len, scope, i, isNegScope);
					isNegScope = !!(((scope[i][0] & 0x100) !== 0) ^ isNegScope);
					scope = scope[i][1];
					len = scope.length;
					i = 0;
					this._lastTSpells = [];
					this._triggeredSpellsStack.push(this._lastTSpells);
					continue;
				}
				var val = this._runSpell(type, scope[i][1]);
				if(val instanceof Promise) {
					this._ctx.push(len, scope, ++i, isNegScope);
					return val.then(v => this._asyncContinue(v));
				}
				[rv, stopCheck] = this._checkRes(scope[i], val, isNegScope);
				if(!stopCheck) {
					i++;
					continue;
				}
			}
			if(this._deep !== 0) {
				this._deep--;
				isNegScope = this._ctx.pop();
				i = this._ctx.pop();
				scope = this._ctx.pop();
				len = this._ctx.pop();
				if(((scope[i][0] & 0x200) === 0) ^ rv) {
					i++;
					this._triggeredSpellsStack.pop();
					this._lastTSpells = this._triggeredSpellsStack[this._triggeredSpellsStack.length - 1];
					continue;
				}
			}
			return [this.hasNumSpell, rv, rv ? this._getMsg() : null];
		}
	},

	_wipeMsg: null,
	_asyncContinue(val) {
		var cl = this._ctx.length;
		var spell = this._ctx[cl - 3][this._ctx[cl - 2] - 1];
		var [rv, stopCheck] = this._checkRes(spell, val, this._ctx[cl - 1]);
		return stopCheck ? [this.hasNumSpell, rv, rv ? this._getMsg() : null] : this.run();
	},
	_checkRes(spell, val, isNegScope) {
		var flags = spell[0];
		var isAndSpell = ((flags & 0x200) !== 0) ^ isNegScope;
		var isNegSpell = ((flags & 0x100) !== 0) ^ isNegScope;
		if(isNegSpell ^ val) {
			this._lastTSpells.push([isNegSpell, spell, (spell[0] & 0xFF) === 14 ? this._wipeMsg : null]);
			return [true, !isAndSpell];
		}
		this._lastTSpells.length = 0;
		return [false, isAndSpell];
	},
	_getMsg() {
		var rv = [];
		for(var spellEls of this._triggeredSpellsStack) {
			for(var [isNeg, spell, wipeMsg] of spellEls) {
				rv.push(Spells.decompileSpell(spell[0] & 0xFF, isNeg, spell[1], spell[2], wipeMsg));
			}
		}
		return rv.join(' & ');
	},
	_runSpell(spellId, val) {
		switch(spellId) {
		case 0: return this._words(val);
		case 1: return this._exp(val);
		case 2: return this._exph(val);
		case 3: return this._imgn(val);
		case 4: return this._ihash(val);
		case 5: return this._subj(val);
		case 6: return this._name(val);
		case 7: return this._trip(val);
		case 8: return this._img(val);
		case 9: return this._sage(val);
		case 10: return this._op(val);
		case 11: return this._tlen(val);
		case 12: return this._all(val);
		case 13: return this._video(val);
		case 14: return this._wipe(val);
		case 15:
			this.hasNumSpell = true;
			return this._num(val);
		case 16: return this._vauthor(val);
		}
	},
	_words(val) {
		return this._post.text.toLowerCase().includes(val) || this._post.subj.toLowerCase().includes(val);
	},
	_exp(val) {
		return val.test(this._post.text);
	},
	_exph(val) {
		return val.test(this._post.html);
	},
	_imgn(val) {
		for(var image of this._post.images) {
			if((image instanceof Attachment) && val.test(image.name)) {
				return true;
			}
		}
		return false;
	},
	async _ihash(val) {
		for(var image of this._post.images) {
			if(!(image instanceof Attachment)) {
				continue;
			}
			var hash = await ImagesHashStorage.getHash(image);
			if(hash === val) {
				return true;
			}
		}
		return false;
	},
	_subj(val) {
		var pSubj = this._post.subj;
		return pSubj ? !val || val.test(pSubj) : false;
	},
	_name(val) {
		var pName = this._post.posterName;
		return pName ? !val || pName.includes(val) : false;
	},
	_trip(val) {
		var pTrip = this._post.posterTrip;
		return pTrip ? !val || pTrip.includes(val) : false;
	},
	_img(val) {
		const images = this._post.images;
		const [compareRule, weightVals, sizeVals] = val;
		if(!val) {
			return images.hasAttachments;
		}
		for(let image of images) {
			if(!(image instanceof Attachment)) {
				continue;
			}
			if(weightVals) {
				const w = image.weight;
				let hide;
				switch(compareRule) {
				case 0: hide = w >= weightVals[0] && w <= weightVals[1]; break;
				case 1: hide = w < weightVals[0]; break;
				case 2: hide = w > weightVals[0]; break;
				}
				if(!hide) {
					continue;
				} else if(!sizeVals) {
					return true;
				}
			}
			if(sizeVals) {
				const w = image.width;
				const h = image.height;
				switch(compareRule) {
				case 0:
					if(w >= sizeVals[0] && w <= sizeVals[1] && h >= sizeVals[2] && h <= sizeVals[3]) {
						return true;
					}
					break;
				case 1:
					if(w < sizeVals[0] && h < sizeVals[3]) {
						return true;
					}
					break;
				case 2:
					if(w > sizeVals[0] && h > sizeVals[3]) {
						return true;
					}
				}
			}
		}
		return false;
	},
	_sage() {
		return this._post.sage;
	},
	_op() {
		return this._post.isOp;
	},
	_tlen(val) {
		var text = this._post.text.replace(/\s+(?=\s)|\n/g, '');
		return !val ? !!text : this._tlenNum_helper(val, text.length);
	},
	_all() {
		return true;
	},
	_video(val) {
		return this._videoVauthor(val, false);
	},
	_wipe(val) {
		let arr, len, x, txt = this._post.text;
		// (1 << 0): samelines
		if(val & 1) {
			arr = txt.replace(/>/g, '').split(/\s*\n\s*/);
			if((len = arr.length) > 5) {
				arr.sort();
				for(let i = 0, n = len / 4; i < len;) {
					x = arr[i];
					let j = 0;
					while(arr[i++] === x) {
						j++;
					}
					if(j > 4 && j > n && x) {
						this._wipeMsg = [1, '"' + x.substr(0, 20) + '" x' + (j + 1)];
						return true;
					}
				}
			}
		}
		// (1 << 1): samewords
		if(val & 2) {
			arr = txt.replace(/[\s.?!,>]+/g, ' ').toUpperCase().split(' ');
			if((len = arr.length) > 3) {
				arr.sort();
				let keys = 0;
				let pop = 0;
				for(let i = 0, n = len / 4; i < len; keys++) {
					x = arr[i];
					let j = 0;
					while(arr[i++] === x) {
						j++;
					}
					if(len > 25) {
						if(j > pop && x.length > 2) {
							pop = j;
						}
						if(pop >= n) {
							this._wipeMsg = [2, 'same "' + x.substr(0, 20) + '" x' + (pop + 1)];
							return true;
						}
					}
				}
				x = keys / len;
				if(x < 0.25) {
					this._wipeMsg = [2, 'uniq ' + (x * 100).toFixed(0) + '%'];
					return true;
				}
			}
		}
		// (1 << 2): longwords
		if(val & 4) {
			arr = txt.replace(/https*:\/\/.*?(\s|$)/g, '').replace(/[\s.?!,>:;-]+/g, ' ').split(' ');
			if(arr[0].length > 50 || ((len = arr.length) > 1 && arr.join('').length / len > 10)) {
				this._wipeMsg = [4, null];
				return true;
			}
		}
		// (1 << 3): symbols
		if(val & 8) {
			const _txt = txt.replace(/\s+/g, '');
			if((len = _txt.length) > 30 && (x = _txt.replace(/[0-9a-zа-я.?!,]/ig, '').length / len) > 0.4) {
				this._wipeMsg = [8, (x * 100).toFixed(0) + '%'];
				return true;
			}
		}
		// (1 << 4): capslock
		if(val & 16) {
			arr = txt.replace(/[\s.?!;,-]+/g, ' ').trim().split(' ');
			if((len = arr.length) > 4) {
				let n = 0;
				let capsw = 0;
				let casew = 0;
				for(let i = 0; i < len; i++) {
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
					this._wipeMsg = [16, 'CAPS ' + capsw / arr.length * 100 + '%'];
					return true;
				} else if(casew / n >= 0.3 && n > 8) {
					this._wipeMsg = [16, 'cAsE ' + casew / arr.length * 100 + '%'];
					return true;
				}
			}
		}
		// (1 << 5): numbers
		if(val & 32) {
			const _txt = txt.replace(/\s+/g, ' ').replace(/>>\d+|https*:\/\/.*?(?: |$)/g, '');
			if((len = _txt.length) > 30 && (x = (len - _txt.replace(/\d/g, '').length) / len) > 0.4) {
				this._wipeMsg = [32, Math.round(x * 100) + '%'];
				return true;
			}
		}
		// (1 << 5): whitespace
		if(val & 64) {
			if(/(?:\n\s*){10}/i.test(txt)) {
				this._wipeMsg = [64, null];
				return true;
			}
		}
		return false;
	},
	_num(val) {
		return this._tlenNum_helper(val, this._post.count + 1);
	},
	_tlenNum_helper(val, num) {
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
	},
	_vauthor(val) {
		return this._videoVauthor(val, true);
	},
	_videoVauthor(val, isAuthorSpell) {
		var videos = this._post.videos;
		if(!val) {
			return !!videos.hasLinks;
		}
		if(!videos.hasLinks || !Cfg.YTubeTitles) {
			return false;
		}
		for(var siteData of videos.vData) {
			for(var data of siteData) {
				if(isAuthorSpell ? val === data[1] : val.test(data[0])) {
					return true;
				}
			}
		}
		if(videos.linksCount === videos.loadedLinksCount) {
			return false;
		}
		return new Promise(resolve => {
			videos.titleLoadFn = data => {
				if(isAuthorSpell ? val === data[1] : val.test(data[0])) {
					resolve(true);
				} else if(videos.linksCount === videos.loadedLinksCount) {
					resolve(false);
				} else {
					return;
				}
				videos.titleLoadFn = null;
			};
		});
	}
};
