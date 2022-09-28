/* ==[ TimeCorrection.js ]====================================================================================
                                               TIME CORRECTION
=========================================================================================================== */

class DateTime {
	constructor(pattern, rPattern, diff, dtLang, onRPat) {
		this.pad2 = pad2;
		this.genDateTime = null;
		this.onRPat = null;
		if(DateTime.checkPattern(pattern)) {
			this.disabled = true;
			return;
		}
		this.regex = pattern
			.replace(/(?:[sihdny]\?){2,}/g, str => `(?:${ str.replace(/\?/g, '') })?`)
			.replace(/-/g, '[^<]')
			.replace(/\+/g, '[^0-9<]')
			.replace(/([sihdny]+)/g, '($1)')
			.replace(/[sihdny]/g, '\\d')
			.replace(/m|w/g, '([a-zA-Zа-яА-Я]+)');
		this.pattern = pattern.replace(/[?\-+]+/g, '').replace(/([a-z])\1+/g, '$1');
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
	static checkPattern(val) {
		return !val.includes('i') || !val.includes('h') || !val.includes('d') ||
			!val.includes('y') || !(val.includes('n') || val.includes('m')) ||
			/[^?\-+sihdmwny]|mm|ww|\?\?|([ihdny]\?)\1+/.test(val);
	}
	static async toggleSettings(el) {
		if(el.checked && (!/^[+-]\d{1,2}$/.test(Cfg.timeOffset) || DateTime.checkPattern(Cfg.timePattern))) {
			$popup('err-correcttime', Lng.cTimeError[lang]);
			await saveCfg('correctTime', 0);
			el.checked = false;
		}
	}
	genRFunc(rPattern) {
		return dtime => rPattern.replace('_o', (this.diff < 0 ? '' : '+') + this.diff)
			.replace('_s', () => this.pad2(dtime.getSeconds()))
			.replace('_i', () => this.pad2(dtime.getMinutes()))
			.replace('_h', () => this.pad2(dtime.getHours()))
			.replace('_d', () => this.pad2(dtime.getDate()))
			.replace('_w', () => this.arrW[dtime.getDay()])
			.replace('_n', () => this.pad2(dtime.getMonth() + 1))
			.replace('_m', () => this.arrM[dtime.getMonth()])
			.replace('_M', () => this.arrFM[dtime.getMonth()])
			.replace('_y', () => ('' + dtime.getFullYear()).substring(2))
			.replace('_Y', () => dtime.getFullYear());
	}
	getRPattern(txt) {
		const m = txt.match(new RegExp(this.regex));
		if(!m) {
			this.disabled = true;
			return false;
		}
		let rPattern = '';
		for(let i = 1, len = m.length, j = 0, str = m[0]; i < len;) {
			const a = m[i++];
			if(!a) {
				continue;
			}
			let p = this.pattern[i - 2];
			if((p === 'm' || p === 'y') && a.length > 3) {
				p = p.toUpperCase();
			}
			const k = str.indexOf(a, j);
			rPattern += str.substring(j, k) + '_' + p;
			j = k + a.length;
		}
		if(this.onRPat) {
			this.onRPat(rPattern);
		}
		this.genDateTime = this.genRFunc(rPattern);
		return true;
	}
	fix(txt) {
		if(this.disabled || (!this.genDateTime && !this.getRPattern(txt))) {
			return txt;
		}
		return txt.replace(new RegExp(this.regex, 'g'), (str, ...args) => {
			let second, minute, hour, day, month, year;
			for(let i = 0; i < 7; ++i) {
				const a = args[i];
				switch(this.pattern[i]) {
				case 's': second = a; break;
				case 'i': minute = a; break;
				case 'h': hour = a; break;
				case 'd': day = a; break;
				case 'n': month = a - 1; break;
				case 'y': year = a; break;
				case 'm': month = Lng.monthDict[a.slice(0, 3).toLowerCase()] || 0; break;
				}
			}
			const dtime = new Date(year.length === 2 ? '20' + year :
				year, month, day, hour, minute, second || 0);
			dtime.setHours(dtime.getHours() + this.diff);
			return this.genDateTime(dtime);
		});
	}
}
