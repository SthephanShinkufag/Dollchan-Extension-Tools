/*============================================================================================================
                                               TIME CORRECTION
============================================================================================================*/

function DateTime(pattern, rPattern, diff, dtLang, onRPat) {
	if(DateTime.checkPattern(pattern)) {
		this.disabled = true;
		return;
	}
	this.regex = pattern
		.replace(/(?:[sihdny]\?){2,}/g, str => '(?:' + str.replace(/\?/g, '') + ')?')
		.replace(/\-/g, '[^<]')
		.replace(/\+/g, '[^0-9]')
		.replace(/([sihdny]+)/g, '($1)')
		.replace(/[sihdny]/g, '\\d')
		.replace(/m|w/g, '([a-zA-Zа-яА-Я]+)');
	this.pattern = pattern.replace(/[\?\-\+]+/g, '').replace(/([a-z])\1+/g, '$1');
	this.diff = parseInt(diff, 10);
	this.arrW = Lng.week[dtLang];
	this.arrM = Lng.month[dtLang];
	this.arrFM = Lng.fullMonth[dtLang];
	if(rPattern) {
		this.genDateTime = this.genRFunc(rPattern);
	} else {
		this.onRPat = onRPat;
	}
}
DateTime.toggleSettings = function(el) {
	if(el.checked && (!/^[+-]\d{1,2}$/.test(Cfg.timeOffset) || DateTime.checkPattern(Cfg.timePattern))) {
		$popup('err-correcttime', Lng.cTimeError[lang]);
		saveCfg('correctTime', 0);
		el.checked = false;
	}
};
DateTime.checkPattern = function(val) {
	return !val.includes('i') || !val.includes('h') || !val.includes('d') || !val.includes('y') ||
		!(val.includes('n') || val.includes('m')) ||
		/[^\?\-\+sihdmwny]|mm|ww|\?\?|([ihdny]\?)\1+/.test(val);
};
DateTime.prototype = {
	genDateTime: null,
	onRPat: null,
	pad2: pad2,
	genRFunc(rPattern) {
		return new Function('dtime', 'return \'' +
			rPattern.replace('_o', (this.diff < 0 ? '' : '+') + this.diff)
			.replace('_s', '\' + this.pad2(dtime.getSeconds()) + \'')
			.replace('_i', '\' + this.pad2(dtime.getMinutes()) + \'')
			.replace('_h', '\' + this.pad2(dtime.getHours()) + \'')
			.replace('_d', '\' + this.pad2(dtime.getDate()) + \'')
			.replace('_w', '\' + this.arrW[dtime.getDay()] + \'')
			.replace('_n', '\' + this.pad2(dtime.getMonth() + 1) + \'')
			.replace('_m', '\' + this.arrM[dtime.getMonth()] + \'')
			.replace('_M', '\' + this.arrFM[dtime.getMonth()] + \'')
			.replace('_y', '\' + (\'\' + dtime.getFullYear()).substring(2) + \'')
			.replace('_Y', '\' + dtime.getFullYear() + \'') + '\';');
	},
	getRPattern(txt) {
		var m = txt.match(new RegExp(this.regex));
		if(!m) {
			this.disabled = true;
			return false;
		}
		var rPattern = '';
		for(var i = 1, len = m.length, j = 0, str = m[0]; i < len; ) {
			var a = m[i++],
				p = this.pattern[i - 2];
			if((p === 'm' || p === 'y') && a.length > 3) {
				p = p.toUpperCase();
			}
			var k = str.indexOf(a, j);
			rPattern += str.substring(j, k) + '_' + p;
			j = k + a.length;
		}
		if(this.onRPat) {
			this.onRPat(rPattern);
		}
		this.genDateTime = this.genRFunc(rPattern);
		return true;
	},
	fix(txt) {
		if(this.disabled || (!this.genDateTime && !this.getRPattern(txt))) {
			return txt;
		}
		return txt.replace(new RegExp(this.regex, 'g'), (str, ...args) => {
			var second, minute, hour, day, month, year;
			for(var i = 0; i < 7; ++i) {
				var a = args[i];
				switch(this.pattern[i]) {
				case 's': second = a; break;
				case 'i': minute = a; break;
				case 'h': hour = a; break;
				case 'd': day = a; break;
				case 'n': month = a - 1; break;
				case 'y': year = a; break;
				case 'm':
					switch(a.slice(0, 3).toLowerCase()) {
					case 'янв': case 'jan': month = 0; break;
					case 'фев': case 'feb': month = 1; break;
					case 'мар': case 'mar': month = 2; break;
					case 'апр': case 'apr': month = 3; break;
					case 'май': case 'мая': case 'may': month = 4; break;
					case 'июн': case 'jun': month = 5; break;
					case 'июл': case 'jul': month = 6; break;
					case 'авг': case 'aug': month = 7; break;
					case 'сен': case 'sep': month = 8; break;
					case 'окт': case 'oct': month = 9; break;
					case 'ноя': case 'nov': month = 10; break;
					case 'дек': case 'dec': month = 11; break;
					default: month = 0; break;
					}
				}
			}
			var dtime = new Date(year.length === 2 ? '20' + year : year, month, day, hour, minute, second || 0);
			dtime.setHours(dtime.getHours() + this.diff);
			return this.genDateTime(dtime);
		});
	}
};
