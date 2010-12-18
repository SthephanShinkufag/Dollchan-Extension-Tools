// ==UserScript==
// @name			Dollchan Extension Tools
// @version			2010-12-18
// @namespace		http://freedollchan.org/scripts
// @author			Sthephan Shinkufag @ FreeDollChan
// @copyright		(C)2084, Bender Bending Rodríguez
// @description		Doing some profit for imageboards
// @include			*
// ==/UserScript==

(function(scriptStorage) {
var defaultCfg = [
	1,		// 0	antiwipe detectors:
	1,		// 1		same lines
	1,		// 2		same words
	1,		// 3		specsymbols
	1,		// 4		long columns
	1,		// 5		long words
	1,		// 6		numbers
	0,		// 7		cAsE/CAPS
	0,		// 8	hide posts with sage
	0,		// 9	hide posts with theme
	0,		// 10	hide posts without text
	0,		// 11	hide posts without img
	0,		// 12	hide posts by text size:
	500,	// 13		text size in symbols
	0,		// 14	hide posts by regexp
	0,		// 15	process hidden posts (0=off, 1=merge, 2=full hide)
	1,		// 16	mouseover hidden posts preview
	1,		// 17	additional hider menu
	1,		// 18	apply filter to threads
	1,		// 19	upload new posts (0=off, 1=auto, 2=onclick+count, 3=onclick)
	1,		// 20	format buttons(0=off, 1=graph, 2=text, 3=standart)
	1,		// 21	expand images (0=off, 1=simple, 2=+preview)
	2,		// 22	>>links navigation (0=off, 1=no map, 2=+refmap)
	1,		// 23	reply without reload (verify on submit)
	1,		// 24	YouTube player
	1,		// 25	mp3 player
	1,		// 26	expand shorted posts
	0,		// 27	hide post names
	1,		// 28	hide scrollers in posts
	0,		// 29	open spoilers
	1,		// 30	email field -> sage btn
	0,		// 31	reply with SAGE
	0,		// 32	move postform down
	2,		// 33	2-ch captchas (x0,x1,x2)
	0,		// 34	apply user name:
	'',		// 35		user name value
	0,		// 36	apply user password:
	'',		// 37		user password value
	1,		// 38	hide board rules
	1,		// 39	hide 'goto' field
	1,		// 40	hide password field
	335,	// 41	textarea width
	80,		// 42	textarea height
	1,		// 43	auto upload interval
	0,		// 44	insert post number on click
	1,		// 45	move format buttons down
	1,		// 46	animated popups
	1,		// 47	force captcha input(0=off, 1=en, 2=ru)
	0,		// 48	show post buttons as text
	1		// 49	show images by links
],
Cfg = [],
Visib = [],
Posts = [],
oPosts = [],
refArr = [],
Expires = [],
postByNum = [],
ajaxPosts = {},
ajaxThrds = [],
doc = document,
STORAGE_LIFE = 259200000, // 3 days
nav = sav = ch = pr = qr = {},
dm = ks = ks0 = wk = brd = res = main = replyClass = refSpan = postMsg = dForm = hasSage = undefined;


/*=============================================================================
									UTILS
=============================================================================*/

function $X(path, root) {
	return doc.evaluate(path, root || doc, null, 6, null);
}
function $x(path, root) {
	return doc.evaluate(path, root || doc, null, 8, null).singleNodeValue;
}
function $id(id) {
	return doc.getElementById(id);
}
function $next(el) {
	do el = el.nextSibling;
	while(el && el.nodeType != 1);
	return el;
}
function $prev(el) {
	do el = el.previousSibling;
	while(el && el.nodeType != 1);
	return el;
}
function $up(el, i) {
	if(!i) i = 1;
	while(i--) el = el.parentNode;
	return el;
}
function $1(el) {
	return el.firstChild;
}
function $each(list, fn) {
	if(!list) return;
	var i = list.snapshotLength;
	if(i > 0) while(i--) fn(list.snapshotItem(i), i);
}
function $html(el, html) {
	var cln = el.cloneNode(false);
	cln.innerHTML = html;
	el.parentNode.replaceChild(cln, el);
	return cln;
}
function $attr(el, attr) {
	for(var key in attr) {
		if(key == 'html') {el.innerHTML = attr[key]; continue}
		if(key == 'text') {el.textContent = attr[key]; continue}
		if(key == 'value') {el.value = attr[key]; continue}
		el.setAttribute(key, attr[key]);
	}
	return el;
}
function $event(el, events) {
	for(var key in events)
		el.addEventListener(key, events[key], false);
}
function $rattr(el, attr) {
	if(el.getAttribute(attr)) el.removeAttribute(attr);
	if(nav.Opera) if(el[attr]) el[attr] = '';
}
function $revent(el, events) {
	for(var key in events)
		el.removeEventListener(key, events[key], false);
}
function $append(el, childs) {
	for(var i = 0, len = childs.length; i < len; i++)
		if(childs[i]) el.appendChild(childs[i]);
}
function $before(el, inserts) {
	for(var i = 0, len = inserts.length; i < len; i++)
		if(inserts[i]) el.parentNode.insertBefore(inserts[i], el);
}
function $after(el, inserts) {
	var i = inserts.length;
	while(i--) if(inserts[i]) el.parentNode.insertBefore(inserts[i], el.nextSibling);
}
function $new(tag, attr, events) {
	var el = doc.createElement(tag);
	if(attr) $attr(el, attr);
	if(events) $event(el, events);
	return el;
}
function $New(tag, childs, attr, events) {
	var el = $new(tag, attr, events);
	$append(el, childs);
	return el;
}
function $txt(el) {
	return doc.createTextNode(el);
}
function $btn(val, fn) {
	return $new('input', {'type': 'button', 'value': val}, {'click': fn});
};
function $if(cond, el) {
	if(cond) return el;
	return null;
}
function $disp(el) {
	el.style.display = el.style.display == 'none' ? '' : 'none';
}
function $del(el) {
	if(el) el.parentNode.removeChild(el);
}
function delNexts(el) {
	while(el.nextSibling) $del(el.nextSibling);
}
function delChilds(el) {
	while(el.hasChildNodes()) el.removeChild($1(el));
}
function getOffset(a, b) {
	var c = 0;
	while (a) {c += a[b]; a = a.offsetParent}
	return c;
}
function $close(el) {
	if(!el) return;
	if(Cfg[46] == 0) {$del(el); return}
	var h = el.clientHeight - 18;
	el.style.height = h + 'px';
	var i = 8;
	var closing = setInterval(function() {
		if(!el || i-- < 0) {clearInterval(closing); $del(el); return}
		var s = el.style;
		s.opacity = i/10;
		s.paddingTop = parseInt(s.paddingTop) - 1 + 'px';
		s.paddingBottom = parseInt(s.paddingBottom) - 1 + 'px';
		var hh = parseInt(s.height) - h/10;
		s.height = (hh < 0 ? 0 : hh) + 'px';
	}, 30);
}
function $show(el) {
	var i = 0;
	if(Cfg[46] == 0) {el.style.opacity = 1; el.style.padding = '10px 10px 10px 5px'; return}
	var showing = setInterval(function() {
		if(!el || i++ > 8) {clearInterval(showing); return}
		var s = el.style;
		s.opacity = i/10;
		s.paddingTop = parseInt(s.paddingTop) + 1 + 'px';
		s.paddingBottom = parseInt(s.paddingBottom) + 1 + 'px';
	}, 30);
}
function toggleChk(el) {
	el.checked = !el.checked;
}
function rand10() {
	return Math.floor(Math.random()*1e10).toString(10);
}
function incc(arr, w) {
	if(arr[w]) arr[w] += 1;
	else arr[w] = 1;
}
function InsertInto(x, text) {
	var scrtop = x.scrollTop;
	var start = x.selectionStart;
	var end = x.selectionEnd;
	x.value = x.value.substr(0, start) + text + x.value.substr(end);
	x.setSelectionRange(start + text.length, start + text.length);
	x.focus();
	x.scrollTop = scrtop;
}
String.prototype.trim = function() {
	var str = this.replace(/^\s\s*/, '');
	var i = str.length;
	while(/\s/.test(str.charAt(--i)));
	return str.substring(0, i + 1); 
};
function txtSelection() {
	return nav.Opera ? doc.getSelection() : window.getSelection().toString();
}
function Log(txt) {
	var newTime = (new Date()).getTime();
	timeLog += '\n' + txt + ': ' + (newTime - oldTime).toString() + 'мс';
	oldTime = newTime;
}

/*=============================================================================
								STORAGE / CONFIG
=============================================================================*/

function setCookie(name, value, life) {
	if(name) doc.cookie = escape(name) + '=' + escape(value) + ';expires=' 
		+ (new Date((new Date()).getTime()
		+ (life == 'delete' ? -10 : STORAGE_LIFE))).toGMTString() + ';path=/';
}

function getCookie(name) {
	var arr = doc.cookie.split('; ');
	var i = arr.length;
	while(i--) {
		var one = arr[i].split('=');
		if(one[0] == escape(name)) return unescape(one[1]);
	}
}

function turnCookies(name) {
	var data = getCookie(ID('Cookies'));
	var arr = data ? data.split('|') : [];
	arr[arr.length] = name;
	if(arr.length > 13) {
		setCookie(arr[0], '', 'delete');
		arr.splice(0, 1);
	}
	setCookie(ID('Cookies'), arr.join('|'));
}

function getStored(name) {
	if(sav.GM) return GM_getValue(name);
	if(sav.script) return scriptStorage.getItem(name);
	if(sav.local) return localStorage.getItem(name);
	return getCookie(name);
}

function setStored(name, value) {
	if(sav.GM) {GM_setValue(name, value); return}
	if(sav.script) {scriptStorage.setItem(name, value); return}
	if(sav.local) {localStorage.setItem(name, value); return}
	setCookie(name, value);
}

function ID(name, pNum) {
	var c = !sav.cookie ? '_' + dm : '';
	if(name == 'Posts' || name == 'Threads')
		return 'DESU_' + name + c + '_' + brd + (!pNum ? '' : '_' + pNum);
	if(name == 'Config' || name == 'Cookies' || name == 'RegExpr')
		return 'DESU_' + name + c;
}

function setDefaultCfg() {
	Cfg = defaultCfg;
	if(ch.dc || ch._0ch || dm == 'ne2.ch') Cfg[47] = 2;
	if(ch.iich) {Cfg[38] = 0; Cfg[47] = 0}
	setStored(ID('Config'), defaultCfg.join('|'));
}

function saveCfg(num, val) {
	Cfg[num] = val;
	setStored(ID('Config'), Cfg.join('|'));
}

function toggleCfg(num) {
	saveCfg(num, Cfg[num] == 0 ? 1 : 0);
}

function initCfg() {
	var data = getStored(ID('Config'));
	if(!data) setDefaultCfg();
	else Cfg = data.split('|');
	if(!getStored(ID('RegExpr'))) setStored(ID('RegExpr'), '');
}

function getVisib(pNum) {
	var key = !sav.cookie ? brd + pNum : postByNum[pNum].Count;
	if(key in Visib) return Visib[key];
}

function readPostsVisib() {
	var data;
	if(!sav.cookie) {
		data = getStored(ID('Posts'));
		if(!data) return;
		var arr = data.split('-');
		var i = arr.length/3;
		while(i--) {
			if((new Date()).getTime() < arr[i*3 + 2]) {
				Visib[arr[i*3]] = arr[i*3 + 1];
				Expires[arr[i*3]] = arr[i*3 + 2];
			} else setStored(ID('Posts'), arr.splice(i*3, 3).join('-'));
		}
	} else if(!main) {
		data = getStored(ID('Posts', oPosts[0].Num));
		if(!data) return;
		for(var i = 0, len = data.length; i < len; i++)
			Visib[i + 2] = data[i];
	}
	forAll(function(post) {post.Vis = getVisib(post.Num)});
}

function storePostsVisib() {
	if(!sav.cookie) {
		var arr = [];
		for(var key in Visib) {
			if(!/^\d$/.test(Visib[key])) break;
			arr[arr.length] = key + '-' + Visib[key] + '-' + Expires[key];
		}
		setStored(ID('Posts'), arr.join('-'));
	} else {
		if(!main) {
			var name = ID('Posts', oPosts[0].Num);
			if(!getStored(name)) turnCookies(name);
			setStored(name, Visib.join(''));
		}
	}
}

function readThreadsVisib() {
	var data = getStored(ID('Threads'));
	if(!data) return;
	var arr = data.split('-');
	var ar = [];
	var i = arr.length;
	while(i--) ar[arr[i]] = 1;
	forOP(function(post) {
		if(brd + post.Num in ar) {hideThread(post); post.Vis = 0}
	});
}

function storeThreadVisib(post, vis) {
	if(post.Vis == vis) return;
	post.Vis = vis;
	var key = brd + post.Num;
	var data = getStored(ID('Threads'));
	var arr = data ? data.split('-') : [];
	if(vis == 0) {
		if(sav.cookie && arr.length > 80) arr.splice(0, 1);
		arr[arr.length] = key;
	} else {
		var i = arr.length;
		while(i--) if(arr[i] == key) arr.splice(i, 1);
	}
	setStored(ID('Threads'), arr.join('-'));
}

function storeFavorities(post) {
	var txt = getTitle(post).replace(/\|/g, '');
	txt = !sav.cookie ? txt.substring(0, 70) : txt.substring(0, 25);
	var pNum = post.Num;
	var data = getStored('DESU_Favorities');
	var arr = data ? data.split('|') : [];
	if(sav.cookie && arr.length/4 > 25) return;
	for(var i = 0; i < arr.length/4; i++)
		if(arr[i*4 + 1] == brd && arr[i*4 + 2] == pNum) return;
	arr[arr.length] = (/www\./.test(location.hostname) ? 'www.' : '') + dm + '|'
		+ brd + (/\/arch/.test(location.pathname) ? '/arch|' : '|') + pNum + '|' + txt;
	setStored('DESU_Favorities', arr.join('|'));
}

function removeFavorities(el) {
	var key = el.textContent.replace('arch/', '').replace(res, '').split('/');
	var arr = getStored('DESU_Favorities').split('|');
	for(var i = 0; i < arr.length/4; i++)
		if(arr[i*4] == key[0] && arr[i*4 + 1].split('/')[0] == key[1] && arr[i*4 + 2] == key[2])
			arr.splice(i*4, 4);
	$del($up(el, 2));
	if(arr.length == 0)
		$1($id('DESU_favor')).innerHTML = '<b>Избранные треды отсутствуют...</b>';
	setStored('DESU_Favorities', arr.join('|'));
}


/*=============================================================================
							CONTROLS / COMMON CHANGES
=============================================================================*/

function addControls() {
	var chBox = function(num, txt, fn, id) {
		var x = $new('input', {
			'type': 'checkbox'}, {
			'click': function() {fn ? fn() : toggleCfg(num)}
		});
		x.checked = Cfg[num] == 1;
		if(id) x.id = id;
		return $New('span', [x, $txt(' ' + txt)]);
	};
	var trBox = function(num, txt, fn, id) {
		return $New('tr', [chBox(num, txt, fn, id)]);
	};
	var optSel = function(id, arr, num, fn) {
		for(var i = 0; i < arr.length; i++)
			arr[i] = '<option value="' + i + '">' + arr[i] + '</option>';
		var x = $new('select', {'id': id, 'html': arr.join('')}, {
			'change': (fn ? fn : function() {saveCfg(num, this.selectedIndex)})
		});
		x.selectedIndex = Cfg[num];
		return x;
	};
	var tools = $new('tbody', {'style': 'font:13px sans-serif'});
	var el = pr.area || dForm;
	while(true) {
		var x = el.previousSibling;
		if(x.nodeType == 1 && (x.className == 'logo' || x.tagName == 'HR')) break;
		$del(x);
	}
	$before(el, [
		$New('div', [
			$btn('Настройки', function() {
				delChilds($id('DESU_hidden'));
				delChilds($id('DESU_favor'));
				$disp($id('DESU_controls'));
			}),
			$btn('Скрытое', hiddenPostsPreview),
			$btn('Избранное', favorThrdsPreview),
			$new('input', {
				'type': 'button',
				'id': 'refresh_btn',
				'value': 'Обновить'}, {
				'click': function(e) {
					window.location.reload();
					e.stopPropagation();
					e.preventDefault()
				},
				'mouseover': function() {if(main) selectAjaxPages()},
				'mouseout': function(e) {if(main) removeSelMenu(e.relatedTarget)}
			}),
			$if(main && pr.on, $btn('Создать тред', function() {$disp(pr.area)})),
			$if(main && (ch._2ch || ch._0ch) && brd == 'b', $New('div', [
				$new('span', {
					'html': '[<a>2-0</a>]'}, {
					'click': function() {
						var hh = doc.body.offsetHeight, ww = doc.body.offsetWidth;
						delChilds(doc.body);
						$append(doc.body, [
							$new('div', {'html': '<iframe style="width:' + ww + 'px; height:' + hh  + 'px" src="http://2-ch.ru/b" />'}),
							$new('div', {'html': '<iframe style="width:' + ww + 'px; height:' + hh  + 'px" src="http://0chan.ru/b" />'})
						]);
					}}
				)], {'style': 'float:right; cursor:pointer'})),
			$if(!main, $New('div', [
				$new('span', {
					'html': '[<a href="http://' + location.hostname + '/' + brd + '/">Назад</a>]'
				})
				], {'style': 'float:right'}))
			], {
			'id': 'DESU_panel',
			'style': 'width:100%; text-align:left'
		}),
		$New('div', [
			$New('div', [$New('table', [tools])], {
				'class': replyClass,
				'id': 'DESU_controls',
				'style': 'display:none; overflow:hidden; width:380px; min-width:380px;' +
					' border:1px solid grey; margin:5px 0px 5px 20px; padding:5px'
			}),
			$new('div', {'id': 'DESU_hidden'}),
			$new('div', {'id': 'DESU_favor'})
			], {
			'id': 'DESU_content',
			'style':  'text-align:left'
		}),
		$new('hr')
	]);
	$append(tools, [
		$new('tr', {
			'text': 'Dollchan Extension Tools',
			'style': 'width:100%; text-align:center; font-weight:bold; font-size:14px'
		}),
		$New('tr', [
			chBox(0, 'Анти-вайп детекторы '),
			$new('span', {
				'html': '[<a>&gt;</a>]',
				'style': 'cursor:pointer'}, {
				'click': function() {$disp($id('antiwipe_cfg'))}
			})
		]),
		$New('div', [
			trBox(1, 'Повтор строк'),
			trBox(2, 'Повтор слов'),
			trBox(3, 'Спецсимволы'),
			trBox(4, 'Длинные колонки'),
			trBox(5, 'Длинные слова'),
			trBox(6, 'Числа'),
			trBox(7, 'КАПС/реГисТР')
			], {
			'id': 'antiwipe_cfg',
			'style': 'display:none; padding-left:15px'
		}),
		$if(hasSage, trBox(8, 'Скрывать с сажей ', toggleSage, 'sage_hider')),
		$if(pr.subj, trBox(9, 'Скрывать с темой ', toggleTitle)),
		trBox(10, 'Скрывать без текста ', toggleNotext, 'notext_hider'),
		trBox(11, 'Скрывать без изображений ', toggleNoimage, 'noimage_hider'),
		$New('tr', [
			chBox(12, 'Скрывать с текстом более ', toggleMaxtext, 'maxtext_hider'),
			$new('input', {
				'type': 'text',
				'id': 'maxtext_field',
				'value': Cfg[13],
				'size': 4
			}),
			$txt(' символов')
		]),
		$New('tr', [
			chBox(14, 'Выражения: ', toggleRegexp, 'regexp_hider'),
			$new('span', {
				'html': '[<a>?</a>]',
				'style': 'cursor:pointer'}, {
				'click': function() {$alert('Поиск в тексте/теме поста:\nвыраж.1\nвыраж.2\n...\n\nРегулярные выражения: $exp выраж.\n$exp /[bб].[tт]+[hх].[rр][tт]/ig\n$exp /кукл[оа]([её]б|бляд|быдл)/ig\n\nКартинки: $img [<,>,=][вес][@ширxвыс]\n$img <35@640x480\n$img >@640x480\n$img =35\n\nИмя/трипкод: $name [имя][!трипкод][!!трипкод]\n$name Sthephan!ihLBsDA91M\n$name !!PCb++jGu\nЛюбой трипкод: $alltrip\n\nАвтозамена (после перезагр.): $rep искомое заменяемое\n$rep /\:cf:/ig <img src="http://1chan.ru/img/coolface.gif" />\n$rep /(ху[йияеё])/ig <font color="red">beep</font>')}
			}),
			$attr($btn('Применить', function() {applyRegExp()}), {'style': 'float:right'}),
			$new('br'),
			$new('textarea', {
				'id': 'regexp_field',
				'value': getStored(ID('RegExpr')),
				'rows': 9,
				'cols': 50,
				'style': 'font:12px courier new'
			})
		]),
		$New('tr', [
			optSel('prochidden_sel', ['Не изменять', 'Объединять', 'Удалять'], 15, function() {
				processHidden(this.selectedIndex, Cfg[15]);
			}),
			$txt(' скрытые посты')
		]),
		trBox(16, 'Быстрый просмотр скрытых постов'),
		trBox(17, 'Дополнительное меню по кнопке скрытия'),
		trBox(18, 'Применять фильтры к тредам'),
		$new('hr'),
		$New('tr', [
			optSel('upload_sel', ['Откл.', 'Авто', 'Счет+клик', 'По клику'], 19),
			$txt(' подгрузка постов в треде, T='),
			optSel('upload_int', [0.5, 1, 1.5, 2, 5, 15, 30], 43),
			$txt('мин*')
		]),
		$if(pr.on, $New('tr', [
			optSel('txtbtn_sel', ['Откл.', 'Графич.', 'Упрощ.', 'Станд.'], 20, function() {
				saveCfg(20, this.selectedIndex);
				$each($X('.//div[@id="txt_btns"]'), function(el) {$del(el)});
				if(Cfg[20] != 0) {textFormatPanel(pr); if(qr.on) textFormatPanel(qr)}
			}), 
			$txt(' кнопки форматирования '),
			chBox(45, 'внизу ', function() {
				toggleCfg(45);
				if(Cfg[20] != 0) {textFormatPanel(pr); if(qr.on) textFormatPanel(qr)}
			})
		])),
		$New('tr', [
			optSel('imgexp_sel', ['Не', 'Обычно', 'С превью'], 21),
			$txt(' раскрывать изображения')
		]),
		$New('tr', [
			optSel('refprv_sel', ['Откл.', 'Без карты', 'С картой'], 22),
			$txt(' навигация по >>ссылкам*')
		]),
		$if(!(ch._4ch && !(sav.GM || sav.script)),
			trBox(23, 'Постить без перезагрузки (проверять ответ)*')),
		trBox(46, 'Анимировать уведомления'),
		trBox(48, 'Кнопки постов в виде текста*'),
		trBox(24, 'Плейер к YouTube ссылкам*'),
		trBox(25, 'Плейер к mp3 ссылкам*'),
		trBox(49, 'Загружать изображения по ссылкам*'),
		$if(!ch.dc, trBox(26, 'Раскрывать сокращенные посты*')),
		trBox(44, 'Вставлять ссылку по клику на №поста*'),
		trBox(27, 'Скрывать имена в постах', function() {toggleCfg(27); scriptStyles()}),
		$if(ch._2ch, trBox(28, 'Без скролла в постах', function() {toggleCfg(28); scriptStyles()})),
		trBox(29, 'Раскрывать спойлеры', function() {toggleCfg(29); scriptStyles()}),
		$if(pr.mail && hasSage, trBox(30, 'Sage вместо поля E-mail*')),
		$if(pr.on, trBox(32, 'Форма ответа внизу*')),
		$New('tr', [
			optSel('caplang_sel', ['Откл.', 'Eng', 'Rus'], 47),
			$txt(' быстрый ввод капчи'),
			$if(ch._2ch, $New('span', [
				$txt(', *отображать '),
				optSel('capnum_sel', [0, 1, 2], 33)
			])),
		]),
		$if(pr.name, $New('tr', [
			$new('input', {'type': 'text', 'id': 'usrname_field', 'value': Cfg[35], 'size': 20}),
			chBox(34, ' Постоянное имя', function() {
				toggleCfg(34);
				saveCfg(35, $id('usrname_field').value.replace(/\|/g, ''));
				var val = ($id('usrname_box').checked) ? Cfg[35] : '';
				pr.name.value = val;
				if(qr.on) qr.name.value = val;
			}, 'usrname_box')
		])),
		$if(pr.passw, $New('tr', [
			$new('input', {'type': 'text', 'id': 'usrpass_field', 'value': Cfg[37], 'size': 20}),
			chBox(36, ' Постоянный пароль', function () {
				toggleCfg(36);
				saveCfg(37, $id('usrpass_field').value.replace(/\|/g, ''));
				var val = $id('usrpass_box').checked ? Cfg[37] : rand10().substring(0, 8);
				pr.passw.value = val;
				del_passw.value = val;
				if(qr.on) qr.passw.value = val;
			}, 'usrpass_box')
		])),
		$if(pr.on, $New('tr', [
			$txt('Не отображать: '),
			$if(pr.rules, chBox(38, 'правила ', function() {
				toggleCfg(38); $disp(pr.rules); if(qr.on) $disp(qr.rules);
			})),
			$if(pr.gothr, chBox(39, 'поле goto ', function() {
				toggleCfg(39); $disp(pr.gothr); if(qr.on) $disp(qr.gothr);
			})),
			$if(pr.passw, chBox(40, 'пароль ', function() {
				toggleCfg(40); $disp($up(pr.passw, 2)); if(qr.on) $disp($up(qr.passw, 2));
			}))
		])),
		$new('hr'),
		$New('tr', [
			$new('span', {
				'id': 'process_time',
				'style': 'font-style:italic; cursor:pointer'}, {
				'click': function() {
					$alert('Версия: 2010-12-18\nХранение: ' + (
						sav.GM ? 'Mozilla config' : (
						sav.local ? 'LocalStorage' : (
						sav.script ? 'Opera ScriptStorage' :
						'Cookies'))) + '\n' + timeLog
					);
				}
			}),
			$attr($btn('Сброс', function() {
				setDefaultCfg();
				setStored('DESU_Favorities', '');
				setStored(ID('RegExpr'), '');
				window.location.reload();
			}), {'style': 'float:right'})
		])
	]);
	$append(doc.body, [$new('div', {
		'id': 'DESU_alertbox',
		'style': 'position:fixed; top:0; right:0; z-index:9999; cursor:default; font:14px sans-serif'
	})]);
}

function hiddenPostsPreview() {
	delChilds($id('DESU_favor'));
	$id('DESU_controls').style.display = 'none';
	var div = $id('DESU_hidden');
	if(div.hasChildNodes()) {delChilds(div); return}
	div.innerHTML = '<table style="margin:5px 0px 5px 20px"><tbody align="left"></tbody></table>';
	var table = $x('.//tbody', div);
	var clones = [], tcnt = 0, pcnt = 0;
	forAll(function(post) {if(post.Vis == 0) {
		var pp = !post.isOp;
		var cln = $attr(($id('hiddenthr_' + post.Num) || post).cloneNode(true), {
			'id': '',
			'style': 'cursor:default'
		});
		clones.push(cln);
		cln.pst = post;
		cln.vis = 0;
		$event(pp
			? $attr($x('.//a[@id="phide_' + post.Num + '"]', cln), {'id': ''})
			: $x('.//a', cln), {
				'click': function(el) {return function() {
					el.vis = (el.vis == 0) ? 1 : 0;
					if(pp) togglePost(el, el.vis);
					else if(el.vis == 0) $disp($next(el));
				}}(cln)
		});
		$event($x(refSpan, cln) || $x('.//a', cln), {
			'mouseover': function(el) {return function() {
				if(el.vis == 0) {
					if(pp) togglePost(el, 1);
					else $next(el).style.display = 'block';
				}
			}}(cln),
			'mouseout': function(el) {return function() {
				if(el.vis == 0) {
					if(pp) togglePost(el, 0);
					else $next(el).style.display = 'none';
				}
			}}(cln)
		});
		$append(table, [
			$if(((!pp && tcnt++ == 0) || (pp && pcnt++ == 0)), $new('tr', {
				'html': '<th><b>Скрытые ' + (pp ? 'посты' : 'треды') + ':</b></th>'
			})),
			$New('tr', [
				cln,
				$if(!pp, $attr(post.cloneNode(true), {'style':
					'display:none; padding-left:15px; overflow:hidden; border:1px solid grey'
				}))
			])
		]);
		if(!pp) togglePost($next(cln), 1);
		doRefPreview(cln);
	}});
	if(!table.hasChildNodes()) {
		table.innerHTML = '<tr><th>Скрытое отсутствует...</th></tr>';
		return;
	}
	$append(table.insertRow(-1), [
		$new('hr'),
		$btn('Раскрыть все', function() {
			if(/все/.test(this.value)) {
				this.value = 'Вернуть назад';
				for(var cln, i = 0; cln = clones[i++];)
					setPostVisib(cln.pst, 1);
			} else {
				this.value = 'Раскрыть все';
				for(var cln, i = 0; cln = clones[i++];)
					setPostVisib(cln.pst, cln.vis);
			}
		}),
		$btn('Сохранить', function() {
			for(var cln, i = 0; cln = clones[i++];)
				if(cln.vis != 0) setPostVisib(cln.pst, 1);
			storePostsVisib();
			delChilds(div);
		})
	]);
}

function favorThrdsPreview() {
	delChilds($id('DESU_hidden'));
	$id('DESU_controls').style.display = 'none';
	var div = $id('DESU_favor');
	if(div.hasChildNodes()) {delChilds(div); return}
	div.innerHTML = '<table style="margin:5px 0px 5px 20px"><tbody align="left"></tbody></table>';
	var table = $x('.//tbody', div);
	var data = getStored('DESU_Favorities');
	if(!data) table.innerHTML = '<tr><th>Избранные треды отсутствуют...</th></tr>';
	else {
		$append(table, [$new('tr', {'html': '<th><b>Избранные треды:</b></th>'})]);
		var arr = data.split('|');
		for(var i = 0; i < arr.length/4; i++) {
			var host = arr[i*4];
			var b = arr[i*4 + 1];
			var tNum = arr[i*4 + 2];
			var title = arr[i*4 + 3];
			if((!sav.cookie && title.length >= 70) || (sav.cookie && title.length >= 25))
				title += '..';
			$append(table, [$New('tr', [
				$New('div', [
					$new('input', {'type': 'checkbox'}),
					$if(host == location.hostname, $new('span', {
						'class': 'expthr_icn',
						'title': 'Просмотреть',
						'html': (Cfg[48] == 1 ? ' [e] ' : '')}, {
						'click': function(b, tNum) {return function() {
							loadFavorThread($up(this, 2), b, tNum);
						}}(b, tNum)
					})),
					$new('a', {
						'href': 'http://' + host + '/' + (b != '' ? b + '/' : '')
							+ (host != 'krautchan.net' ? 'res/' : 'thread-') + tNum
							+ (host != 'dobrochan.ru' ? '.html' : '.xhtml'),
						'html': host + '/' + b + '/' + tNum
					}),
					$txt(' - ' + title)
					], {
					'class': replyClass,
					'style': 'cursor:default',
					'html': '&nbsp'
				}),
				$new('div', {
					'class': 'thread',
					'id': tNum,
					'style': 'display:none; padding-left:15px; border:1px solid grey'
				})
				], {
				'id': 'favor_note'
			})]);
		}
	}
	$append(table.insertRow(-1), [
		$new('hr'),
		$btn('Удалить', function() {
			$each($X('.//tr[@id="favor_note"]', table), function(el) {
				if($x('.//input', el).checked) removeFavorities($x('.//a' , el));
			});
		}),
		$btn('Правка', function() {
			var el = $id('favor_edit');
			el.value = getStored('DESU_Favorities');
			$disp($up(el));
		})
	]);
	$append(table.insertRow(-1), [
		$new('textarea', {
			'id': 'favor_edit',
			'value': getStored('DESU_Favorities'),
			'rows': 9,
			'cols': 70,
			'style': 'display:block; font:12px courier new'
		}),
		$btn('Сохранить', function() {
			setStored('DESU_Favorities', $id('favor_edit').value.trim());
			delChilds($id('DESU_favor'));
			favorThrdsPreview();
		})
	]);
	$disp($up($id('favor_edit')));
	doRefPreview(table);
}

function $alert(txt, id, htm) {
	var el;
	var nid = 'DESU_alert' + (id ? '_' + id : '');
	if(id) el = $id(nid);
	if(!el) {
		el = $New('div', [
			$if(id != 'wait', $new('a', {
				'style': 'display:inline-block; cursor:pointer; vertical-align:top; font-size:150%',
				'text': '× '}, {
				'click': function() {$close($up(this))}})),
			$if(id == 'wait', $new('span', {'class': 'wait_icn', 'html': '&nbsp;'})),
			$new('div', {'style': 'display:inline-block; margin-top:4px'})
			], {
			'class': replyClass,
			'id': nid,
			'style': 'float:right; clear:both; opacity:0; width:auto; min-width:0; '
				+ 'padding:0 10px 5px 5px; margin:1px; overflow:hidden; '
				+ 'white-space:pre-wrap; outline:0; border:1px solid grey'
		});
		$append($id('DESU_alertbox'), [el]);
		$show(el);
	}
	if(htm) $next($1(el)).innerHTML = txt.trim();
	else $next($1(el)).textContent = txt.trim();
}

/*-----------------------------Dropdown select menus-------------------------*/

function removeSelMenu(x) {
	if(!$x('ancestor-or-self::*[@id="sel_menu"]', x)) $del($id('sel_menu'));
}

function addSelMenu(id, dx, dy, arr) {
	$before(dForm, [$new('div', {
		'class': replyClass,
		'id': 'sel_menu',
		'style': 'position:absolute; left:' + (getOffset($id(id), 'offsetLeft') + dx).toString()
			+ 'px; top:' + (getOffset($id(id), 'offsetTop') + dy).toString() + 'px; z-index:250; '
			+ 'cursor:pointer; width:auto; min-width:0; border:1px solid grey; padding:0 5px 0 5px',
		'html': '<a>' + arr.join('</a><br><a>') + '</a>'}, {
		'mouseout': function(e) {removeSelMenu(e.relatedTarget)}
	})]);
	return $X('.//a', $id('sel_menu'));
}

function selectPostHider(post) {
	if(Cfg[17] == 0 || (Cfg[18] == 0 && post.isOp)) return;
	var a = addSelMenu('phide_' + post.Num, 0, Cfg[48] == 0 ? 14 : 19,
		['Скрывать выделенное', 'Скрывать изображение', 'Скрыть схожий текст']);
	$event(a.snapshotItem(0), {
		'mouseover': function() {quotetxt = txtSelection().trim()},
		'click': function() {applyRegExp(quotetxt)}
	});
	$event(a.snapshotItem(1), {'click': function() {regExpImage(post)}});
	$event(a.snapshotItem(2), {'click': function() {hideBySameText(post)}});
}

function selectExpandThread(post) {
	var p = ' постов';
	$each(addSelMenu('expthrd_' + post.Num, 0, Cfg[48] == 0 ? 14 : 19,
		[5 + p, 15 + p, 30 + p, 50 + p, 100 + p]),
		function(a) {
			$event(a, {'click': function() {loadThread(post, parseInt(this.textContent))}});
		}
	);
}

function selectAjaxPages() {
	var p = ' страниц';
	$each(addSelMenu('refresh_btn', 2, 21,
		[1 + p + 'а', 2 + p + 'ы', 3 + p + 'ы', 4 + p + 'ы', 5 + p]),
		function(a, i) {
			$event(a, {'click': function() {loadPages(i + 1)}});
		}
	);
}

/*-------------------------------Changes in postform-------------------------*/

function refreshCapSrc(src, tNum) {
	if(wk) {
		if(tNum > 0) src = src.replace(/mainpage|res\d+/ig, 'res' + tNum);
		src = src.replace(/dummy=\d*/, 'dummy=' + rand10());
	} else src = src.replace(/\?[^?]+$|$/, (!ch._410 ? '?' : '?board=' + brd + '&') + Math.random());
	return src;
}

function refreshCapImg(node, tNum) {
	var tr = $x('ancestor::tr[1]', node);
	if(!ch.dc) 
		$each($X('.//img', tr), function(img) {
			var src = img.src;
			img.src = '';
			img.src = refreshCapSrc(src, tNum);
		});
	else {
		var e = doc.createEvent('MouseEvents');
		e.initEvent('click', true, true);
		$x('.//img', tr).dispatchEvent(e);
	}
}

function makeCapImg(tNum) {
	var src;
	if(ch._2ch) src = '/' + brd + '/captcha.png?key=mainpage&amp;dummy=' + rand10();
	if(ks) src = 'http://' + location.hostname + (!ch._410 ? '/captcha.php?' + Math.random() : '/faptcha.php?board=' + brd);
	if(!ch._2ch && !ks) src = $x('ancestor::tr[1]//img', pr.capinp).src;
	return $new('img', {
		'alt': 'загрузка...',
		'title': 'Обновить капчу',
		'style': 'display:block; cursor:pointer; border:none',
		'src': refreshCapSrc(src, tNum)}, {
		'click': function() {refreshCapImg(pr.capinp, tNum)}
	});
}

function forceCap(e) {
	if(Cfg[47] == 0 || e.which == 0) return;
	var code = e.charCode || e.keyCode;
	var ru = 'йцукенгшщзхъфывапролджэячсмитьбюё';
	var en = 'qwertyuiop[]asdfghjkl;\'zxcvbnm,.`';
	var chr = String.fromCharCode(code).toLowerCase();
	var i = en.length;
	if(Cfg[47] == 1) {
		if(code < 0x0410 || code > 0x04FF) return;
		while(i--) if(chr == ru[i]) chr = en[i];
	} else {
		if(code < 0x0021 || code > 0x007A) return;
		while(i--) if(chr == en[i]) chr = ru[i];
	}
	e.preventDefault();
	InsertInto(e.target, chr);
}

function sageBtnFunc(obj) {
	var c = Cfg[31] == 1;
	var mail = $prev($attr($x('.//span[@id="sage_btn"]', obj.form), {'html': c
		? '&nbsp;<span class="sage_icn"></span><b style="color:red">SAGE</b>'
		: '<i>(no&nbsp;sage)</i>'}));
	if(mail.type == 'text') mail.value = c ? 'sage' : (ch._4ch ? 'noko' : '');
	else mail.checked = c ? true : false;
}

function sageBtnEvent(e) {
	toggleCfg(31);
	sageBtnFunc(pr);
	if(qr.on) sageBtnFunc(qr);
	e.preventDefault();
	e.stopPropagation();
}

function textareaResizer(obj) {
	$del($x('.//img[@id="resizer"]', obj.form));
	var el = obj.txta;
	$event(el, {'keypress': function(e) {
		var code = e.charCode || e.keyCode;
		if((code == 33 || code == 34) && e.which == 0) {e.target.blur(); window.focus()}
	}});
	var resmove = function(e) {
		el.style.width = e.pageX - getOffset(el, 'offsetLeft') + 'px';
		el.style.height = e.pageY - getOffset(el, 'offsetTop') + 'px';
	};
	var resstop = function() {
		$revent(doc.body, {'mousemove': resmove, 'mouseup': resstop});
		saveCfg(41, parseInt(el.style.width));
		saveCfg(42, parseInt(el.style.height));
	};
	var x = 14;
	var y = (nav.Opera) ? 9 : (nav.Chrome ? 2 : 6);
	el.style.cssText = 'width:' + Cfg[41] + 'px; height:' + Cfg[42] + 'px';
	$after(el, [$New('div', [$new('img', {
		'id': 'resizer',
		'src': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABlBMVEUAAAAAA\
			AClZ7nPAAAAAWJLR0QAiAUdSAAAAAF0Uk5TAEDm2GYAAAAWSURBVHjaY2BAAYyMDMNagBENYAgAABMoAD3fBUDW\
			AAAAAElFTkSuQmCC',
		'style': 'position:relative; left:-' + x + 'px; top:' + y + 'px; cursor:se-resize'}, {
		'mousedown': function(e) {
			e.preventDefault();
			$event(doc.body, {'mousemove': resmove, 'mouseup': resstop});
		}
	})], {'style': 'display:inline-block'})]);
}

function formSubmit(obj) {
	$event($attr(obj.subm, {'value': 'Отправить'}), {'click': function() {
		if(Cfg[23] == 1) {
			if(ch._4ch && (sav.GM || sav.script)) setStored('DESU_4chan_cache', 're');
			$alert('Проверка...', 'wait');
		}
		if(ks0) $attr(obj.txta, {'id': 'message', 'name': 'message'});
		if(obj == qr) pr.txta.value = qr.txta.value;
	}});
}

function iframeLoad(e) {
	var err, xp;
	if(!ch._4ch) try {
		var frm = e.target.contentDocument;
		if(!frm || !frm.body || frm.location == 'about:blank' || !frm.body.innerHTML) return;
	} catch(er) {
		$close($id('DESU_alert_wait'));
		if(ks) {
			var lh = location.href;
			if(/www\./.test(lh)) lh = lh.replace('www.', '');
			else lh = lh.replace(/http:\/\//, 'http://www.');
			$alert('Iframe error. Попробуйте <a href="' + lh + '">' + lh + '</a>', null, true);
		} else $alert('Unknown iframe error');
		return;
	} else {
		var re = getStored('DESU_4chan_cache');
		if(!re || re == '') return;
		setStored('DESU_4chan_cache', '');
		if(/^Error/.test(re)) err = re;
	}
	if(ch.dc && /error/.test(frm.location.pathname))
		xp = './/td[@class="post-error"]';
	if(ch.krau && frm.location.pathname == '/post')
		xp = './/td[starts-with(@class,"message_text")]';
	if((wk || ks) && !ch._4ch && !frm.getElementById('delform')) {
		if(ch._2ch) xp = './/font[@size="5"]';
		if(ks) xp = './/h1|.//h2|.//div[contains(@style, "1.25em")]';
		if(wk && !ch._2ch) err = frm.getElementsByTagName('h2')[0] || frm.getElementsByTagName('h1')[0];
	}
	if(xp) err = frm.evaluate(xp, frm, null, 6, null);
	if(err) {
		var txt = '';
		if(!wk || ch._2ch) $each(err, function(el) {txt += el.innerHTML + '\n'});
		else txt = (!ch._4ch ? err.innerHTML : err).replace(/<br.*/ig, '');
		$close($id('DESU_alert_wait'));
		$alert(txt || 'Ошибка:\n' + (frm.body || frm).innerHTML, null, true);
	} else {
		if(pr.on) pr.txta.value = '';
		if(pr.file) pr.file = $x('.//input[@type="file"]', $html($up(pr.file), $up(pr.file).innerHTML));
		if(qr.on || !main) {
			if(main) loadThread(postByNum[getThread(qr.form).id.match(/\d+/)], 8);
			else {$del(qr.form); loadNewPosts(true)}
			qr = {};
			if(pr.capinp) {
				pr.capinp.value = '';
				if(!ch._4ch) refreshCapImg(pr.capinp, oPosts[0].Num);
			}
		} else window.location = !ch._4ch ? frm.location : re;
	}
	if(!ch._4ch) frm.location.replace('about:blank');
}

function doChanges() {
	if(!main) doc.title = '/' + brd + ' - ' + getTitle(oPosts[0]).substring(0, 50);
	if(ch._2ch) $each($X('.//small', dForm), function(el) {$del(el)});
	if(ks0) {
		$event(window, {'load': function() {setTimeout(function() {
			$each($X('.//div[@class="replieslist"]', dForm), function(el) {$del(el)});
		}, 10)}});
		if(!main) {
			delNexts(Posts[Posts.length - 1] || oPosts[0]);
			$del($id('newposts_get'));
			$del($id('newposts_load'));
		}
		if(pr.on) {
			$del($id('captcha_status'));
			$html($x('ancestor::td[1]', pr.txta), '<textarea cols="48" rows="4" accesskey="m" />');
			pr.txta = $x('.//textarea', pr.form);
		}
	}
	if(!pr.on) return;
	$append(pr.area, [$x('following-sibling::hr', pr.area)]);
	if(main) $disp(pr.area);
	else if(Cfg[32] == 1) $after(dForm, [pr.area]);
	if(pr.subm.nextSibling) delNexts(pr.subm);
	textFormatPanel(pr);
	textareaResizer(pr);
	formSubmit(pr);
	$each($X('.//input[@type="text"]', pr.form), function(el) {el.size = 35});
	if(Cfg[38] == 1 && pr.rules) $disp(pr.rules);
	if(Cfg[39] == 1 && pr.gothr) $disp(pr.gothr);
	if(Cfg[33] == 0 && pr.capinp) $disp($x('ancestor::tr[1]', pr.capinp));
	if(Cfg[40] == 1 && pr.passw) $disp($x('ancestor::tr[1]', pr.passw));
	if(Cfg[34] == 1 && pr.name) setTimeout(function() {pr.name.value = Cfg[35]} , 10);
	del_passw = $X('.//input[@type="password"]').snapshotItem(1);
	if(del_passw) setTimeout(function() {
		if(Cfg[36] == 1) {pr.passw.value = Cfg[37]; del_passw.value = Cfg[37]}
		else del_passw.value = pr.passw.value;
	}, 10);
	var logo = $x('.//div[@class="logo"]');
	if(ch.dc) $del($id('hideinfotd'));
	if(ch._4ch) {
		pr.area.style.paddingLeft = '0px';
		$each($X('.//script'), function(el) {$del(el)})
		$del($x('preceding-sibling::div', $x('.//table', pr.form)));
		$del($next(logo));
		$del($next(logo));
	}
	if(pr.capinp) {
		if(ch._2ch) {
			var td = $x('ancestor::td[1]', pr.capinp);
			delChilds(td);
			pr.capinp = $new('input', {'type': 'text', 'name': 'captcha', 'size': 35});
			$append(td, [pr.capinp]);
			for(var i = 0; i < Cfg[33]; i++)
				$after(pr.capinp, [makeCapImg(main ? 0 : oPosts[0].Num)]);
		} else {
			$rattr(pr.capinp, 'onclick');
			$rattr(pr.capinp, 'onfocus');
			$rattr(pr.capinp, 'onkeypress');
		}
		if(ks || (wk && !ch._4ch && !ch._2ch)) {
			var img = $x('.//a|.//img', $x('ancestor::tr[1]', pr.capinp))
			$up(img).replaceChild(makeCapImg(main ? 0 : oPosts[0].Num), img);
		}
		$event($attr(pr.capinp, {'autocomplete': 'off'}), {'keypress': forceCap});
	}
	if(Cfg[30] == 1 && pr.mail && hasSage) {
		$disp(pr.mail);
		if(pr.name && pr.name.type != 'hidden') {
			delNexts(pr.name);
			var mail_tr = $x('ancestor::tr[1]', pr.mail);
			$after(pr.name, [pr.mail]);
			$del(mail_tr);
		}
		delNexts(pr.mail);
		$append($up(pr.mail), [$txt(' '), $new('span', {
			'id': 'sage_btn',
			'style': 'cursor:pointer'}, {
			'click': sageBtnEvent}
		)]);
		sageBtnFunc(pr);
	}
	if(Cfg[23] == 1 && !(ch._4ch && !(sav.GM || sav.script))) {
		doc.body.appendChild($new('div', {'html':  '<iframe name="submitcheck" id="submitcheck" ' +
			'src="about:blank" style="visibility:hidden; width:0px; height:0px; border:none" />'}));
		$rattr($attr(pr.form, {'target': 'submitcheck'}), 'onsubmit');
		var load = nav.Opera ? 'DOMFrameContentLoaded' : 'load';
		$event($id('submitcheck'), {load: iframeLoad});
		if(ch._4ch) setStored('DESU_4chan_cache', '');
	}
}

/*-----------------------------Quick Reply under post------------------------*/

function quickReply(post) {
	var tNum = getThread(post).id.match(/\d+/);
	if(!qr.on) {
		qr = new replyForm($attr(pr.form.cloneNode(true), {'class': replyClass}))
		qr.txta.value = pr.txta.value;
		textFormatPanel(qr);
		textareaResizer(qr);
		formSubmit(qr);
		var sage = $x('.//span[@id="sage_btn"]', qr.form);
		if(sage) $event(sage, {'click': sageBtnEvent});
		if(qr.capinp) {
			$event(qr.capinp, {'keypress': forceCap});
			if(!ch._4ch) $each($X('ancestor::tr[1]//img', qr.capinp), function(el) {
				$event(el, {'click': function() {refreshCapImg(qr.capinp, tNum)}});
			});
		}
		if(main && (wk || ch.krau)) $before($1(qr.form), [$new('input', {
			'type': 'hidden',
			'id': 'thr_id',
			'name': (!ch._4ch ? 'parent' : 'resto'),
			'value': tNum
		})]);
		if(ch._4ch) $each($X('.//a[@id="recaptcha_reload_btn"]'), function(btn) {
			$event(btn, {'click': function() {
				if(qr.on) setTimeout(function() {
					var x = './/div[@id="recaptcha_image"]/img';
					$x(x, qr.form).src = $x(x, pr.form).src;
					qr.txta.focus();
				}, 2000);
			}});
		});
	}
	if($next(post) == qr.form) {$disp(qr.form); return}
	$after(post, [qr.form]);
	qr.form.style.display = 'block';
	if(qr.capinp && wk && !ch._4ch) refreshCapImg(qr.capinp, tNum);
	if(main) $x('.//input[@id="thr_id" or @name="thread_id" or @name="replythread"]', qr.form).value = tNum;
	InsertInto(qr.txta, '>>' + post.Num + quotetxt.replace(/(^|\n)(.)/gm, '\n>$2') + '\n');
}

/*----------------------------Text formatting buttons------------------------*/

function insertTags(x, tag1, tag2) {
	var start = x.selectionStart, end = x.selectionEnd, scrtop = x.scrollTop;
	var text = x.value.substring(start, end);
	if(tag1 == '' && tag2 == '') {
		var i = text.trim().length;
		while(i--) tag2 += '^H';
	}
	var len = end + tag1.length + tag2.length;
	if(text.match(/^\s+/))
		tag1 = text.match(/^\s+/)[0] + tag1;
	if(text.match(/\s+$/))
		tag2 += text.match(/\s+$/)[0];
	text = text.trim();
	x.value = (text != '')
		? x.value.substr(0, start) + tag1 + text + tag2 + x.value.substr(end)
		: tag1 + x.value + tag2;
	x.setSelectionRange(len, len);
	x.focus();
	x.scrollTop = scrtop;
}

function tfBtn(title, wktag, bbtag, val, style, src, x) {
	var btn = $new('span', {
		'title': title,
		'style': 'cursor:pointer; vertical-align:top;' + (Cfg[20] == 1 ? 'padding:0 27px 23px 0; background:url(data:image/gif;base64,' + src + ') no-repeat' : ''),
		'html': (Cfg[20] == 2 ? '<a style="' + style + '">' + val + '</a>' + (val != '&gt;' ? ' / ' : '') : (Cfg[20] == 3 ? '<input type="button" value="' + val + '" style="font-weight:bold;' + style + '">' : ''))
	});
	if(val != '&gt;') $event(btn, {
		'click': function() {
			if(ch._0ch || ch._2ch || ch.krau || dm == 'sibirchan.ru' || dm == 'zadraw.ch')
				insertTags(x, '[' + bbtag + ']', '[/' + bbtag + ']');
			else insertTags(x, wktag, wktag);
		}
	});
	else $event(btn, {
		'mouseover': function() {quotetxt = txtSelection()},
		'click': function() {
			var start = x.selectionStart, end = x.selectionEnd;
			InsertInto(x, '>' + (start == end
				? quotetxt : x.value.substring(start, end)).replace(/\n/gm, '\n>'));
		}
	});
	return btn;
}

function textFormatPanel(obj) {
	$del($x('.//div[@id="txt_btns"]', obj.form));
	if(Cfg[20] == 0) return;
	var tx = obj.txta;
	var pre = 'R0lGODlhFwAWAMQAAP//////AP8A//8AAAD//wD/AAAA/wAAAPb2+Onq7Bc/e053qitemNXZ3Wmdypm92';
	var btns = $New('div', [
		$if(Cfg[20] == 2, $txt('[ ')),
		tfBtn('Жирный', '**', 'b', 'B', '', pre +'2hoaP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAXABYAAAWTYBQtZGmepjg+bOu+7hIxD2LfeI4/DK3/Op4PSEQIazjIYbmEQII95E3JZD530ZzyajtwbUJHYjzekhPLc8LRE5/NZa+azXCTqdWDet1W46sQc20NhIRbhQ2HhXQOiIleiFSIdAuOioaQhQs9lZF5TI6bDJ2Ff02ODaKkqKyanK2whKqxsJsjKLi4Kgq8vb6/viIhADs=', tx),
		tfBtn('Наклонный', '*', 'i', 'i', 'font-style:italic', pre +'2hoaP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAXABYAAAV5YBQtZGmepjg+bOu+7hIxD2LfeI4/DK3/Op4PSEQIa0TI4XcsKpk9ZBHKcCSuWKwym3X0rFztIXz1VskJJQRtBofV7G9jTp8r6/g2nn7fz80Lfmp+cws9gXt9hIYMiHiKfoyOhIuHlJeSl5SGIyienioKoqOkpaQiIQA7', tx),
		$if(!ch.dc && !ch._410, tfBtn('Подчеркнутый', '__', 'u', 'U', 'text-decoration:underline', pre +'6CgoGhoaP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAXABYAAAWPoCQtZGmepjg+bOu+7iIxD2LfeI4/DK3/Op4PSEQIazjIIbnMHXNKZrCHvEWtzV3Pkeh2IwdvAizuOrZlslctPjO4YvY4XHbD1/Rv3mtv+P1gEH9gf399hWARigeMhX5uC44NYIwQSpILPZGSnI6ZDJudop+hDYynqI1/pKKtrK2dmSMotLQqCri5uru6IiEAOw=='), tx),
		tfBtn('Зачеркнутый', '', 's', 'S', 'text-decoration:line-through', pre +'2hoaE1NTf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAXABYAAAWNoCQtZGmepjg+bOu+7iIxD2LfeI4/DK3/Op4PSEQIazrIYQn5HXXL6KGZe+KUkIQWW+05tOAlWCseO7zjBDbNPjO+aog8Kq/XtW54en5g470NgYKDWIOBeYNLhoqGbguEU4KFhgs9j4lSBxGGgZUMl5BMnJ2Wo6aDnqCno6mrp5UjKLKyKgq2t7i5uCIhADs=', tx),
		tfBtn('Спойлер', '%%', 'spoiler', '%', '', pre +'2hoaP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAXABYAAAV7YBQtZGmepjg+bOu+7hIxD2LfeI4/DK3/Op4PSEQIa0Xg0XZoOp9Q2xIBqVqvWGnPkUhgv9euY9sFm8Vkr/mLZnDV63Bi7G404lg73WGH+p96PQt2hIWGhguCh4uHiQyDjJENjpCSi5SWjJiZjQwjKKCgKgqkpaanpiIhADs=', tx),
		tfBtn('Код', "`", 'code', 'C', '', pre +'2hoaP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAXABYAAAWGYBQtZGmepjg+bOu+7hIxD2LfeI4/DK3/Op4PSEQIa0Xg8Qc5OCGQYA+Jazqv0V3Pkeh2rd4ENJxwbMlNsrp8DjvXZDOD6z7Aw3JHY7938v+AeYBNgIUNcguDfnxQgAs9iYpXT46QhlYHjZUMkYaee4+cn6OhnaOFjyMoq6sqCq+wsbKxIiEAOw==', tx),
		tfBtn('Цитировать', '', '', '&gt;', '', pre +'2hoaP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAXABYAAAWEYBQtZGmepjg+bOu+7hIxD2LfeI4/DK3/Op4PSEQIa7jDoWg75iAQZdGpg0p/Qkdiy+VaD92to6cNh7/dMaNsPke5anabq4TAyY28ft+oQ/ZxfHt+gmoLgn0HUIgNCz2Hg4p/jI2PfIuUeY4MkJmIm52efKCinwwjKKmpKgqtrq+wryIhADs=', tx),
		$if(Cfg[20] == 2, $txt(' ]'))
		], {
		'id': 'txt_btns',
		'html': '&nbsp;',
		'style': 'padding:1px; font-weight:bold; display:' + (Cfg[45] == 0 ? 'inline-block;' : 'block;') + (Cfg[20] == 1 ? 'height:23px;' : '')
	});
	if(Cfg[45] == 0) $after(obj.subm, [btns]);
	else $before(tx, [btns]);
}

/*-------------------------Append styles for elements------------------------*/

function scriptStyles() {
	var icn = function(nm, src) {return nm + ' {vertical-align:middle; padding-left:18px; cursor:pointer; background:url(data:image/gif;base64,' + src + ') no-repeat} '};
	var pre = 'R0lGODlhDgAPALMAAP//////AP8A//8AAAD//wD/AAAA/wAAAN3d3cDAwJmZmYCAgGBgYEtLS////wAAACH5BAEAAA4ALAAAAAAOAA8AAAR';
	var txt = 'td.reply {width:auto} .pcount, .pcountb {font-size:13px;font-weight:bold;cursor:default} .pcount {color:#4f7942} .pcountb {color:#c41e3a} .rfmap {font-size:70%; font-style:italic} .wait_icn {padding:0 16px 16px 0; background:url( data:image/gif;base64,R0lGODlhEAAQALMMAKqooJGOhp2bk7e1rZ2bkre1rJCPhqqon8PBudDOxXd1bISCef///wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAMACwAAAAAEAAQAAAET5DJyYyhmAZ7sxQEs1nMsmACGJKmSaVEOLXnK1PuBADepCiMg/DQ+/2GRI8RKOxJfpTCIJNIYArS6aRajWYZCASDa41Ow+Fx2YMWOyfpTAQAIfkEBQAADAAsAAAAABAAEAAABE6QyckEoZgKe7MEQMUxhoEd6FFdQWlOqTq15SlT9VQM3rQsjMKO5/n9hANixgjc9SQ/CgKRUSgw0ynFapVmGYkEg3v1gsPibg8tfk7CnggAIfkEBQAADAAsAAAAABAAEAAABE2QycnOoZjaA/IsRWV1goCBoMiUJTW8A0XMBPZmM4Ug3hQEjN2uZygahDyP0RBMEpmTRCKzWGCkUkq1SsFOFQrG1tr9gsPc3jnco4A9EQAh+QQFAAAMACwAAAAAEAAQAAAETpDJyUqhmFqbJ0LMIA7McWDfF5LmAVApOLUvLFMmlSTdJAiM3a73+wl5HYKSEET2lBSFIhMIYKRSimFriGIZiwWD2/WCw+Jt7xxeU9qZCAAh+QQFAAAMACwAAAAAEAAQAAAETZDJyRCimFqbZ0rVxgwF9n3hSJbeSQ2rCWIkpSjddBzMfee7nQ/XCfJ+OQYAQFksMgQBxumkEKLSCfVpMDCugqyW2w18xZmuwZycdDsRACH5BAUAAAwALAAAAAAQABAAAARNkMnJUqKYWpunUtXGIAj2feFIlt5JrWybkdSydNNQMLaND7pC79YBFnY+HENHMRgyhwPGaQhQotGm00oQMLBSLYPQ9QIASrLAq5x0OxEAIfkEBQAADAAsAAAAABAAEAAABE2QycmUopham+da1cYkCfZ94UiW3kmtbJuRlGF0E4Iwto3rut6tA9wFAjiJjkIgZAYDTLNJgUIpgqyAcTgwCuACJssAdL3gpLmbpLAzEQA7) no-repeat}';
	if(Cfg[48] == 0) txt +=
		icn('.hide_icn', pre + 'U0MlJq7o4X7dQ+mCILAuohOdHfgpQJguQLowSA+7tKkxt4wgEbnHpkWhCAIJxNJIYyWWTSQMmqUYGDtBobJmMxhOAJZO6LM3l0/WE3oiGo0uv0x0RADs=') +
		icn('.unhide_icn', pre + 'N0MlJq7o4X7dQ+mCILEuYMIxJfheDIMz1LTHGAEDd1uidozsaAvciMmhHF3EIgCFJPVwPeiTRpFZaI+tyWhsN1g7zAXtMooYDzG6zHREAOw==') +
		icn('.rep_icn', pre + 'O0MlJq7o4X7dQ+mCILAt4hSD5LQCghgtzsa27YIys0LV75SRGr4VgxIyxIaB4DPYQiEYQ2SBGpUFsA9rAkhZdUFejSHQ9KFHD0W27244IADs=') +
		icn('.sage_icn','R0lGODlhDgAPALMAAP//////AP8A//8AAAD//wD/AAAA/wAAAO7u7oCAgGBgYEtLS////wAAAAAAAAAAACH5BAEAAAwALAAAAAAOAA8AAARBkMlJq7o4X6aS/6B3fVonmomCrAiqLNiyeHIMXwuL3K/sz4mfUKYbCmnGxUG3OvwwS9bBlolObSfF4WpaMJI/RgQAOw==') +
		icn('.expthr_icn', pre + 'P0MlJq7o4X7dQ+gsALF+CLCSIiGeJqiKbLkzGIEiNMfp15zYGCtXANYY04bCIOA55SKYTBV0akQxnMQZoEhulbRf8aRTDIrKp4TC7325HBAA7') +
		icn('.fav_icn', pre + 'T0MlJq7o4X7dQ+skFJsiyjAqCKKOJAgALLoxpInBpMzUM4D8frcbwGQHEGi1hTCh5puLxWWswAY0GLNGgdbVYE/hr5ZY/WXTDM2ojGo6sfC53RAAAOw==');
		else txt += '.hide_icn, .unhide_icn, .rep_icn, .sage_icn, .expthr_icn, .fav_icn {cursor:pointer}';
	if((ch._2ch && getCookie('wakabastyle') != 'Futaba') || ks0) txt += '.postblock {background:#bbb} ';
	if(Cfg[27] == 1) txt += '.commentpostername, .postername, .postertrip {display:none} ';
	if(Cfg[28] == 1) txt += 'blockquote {max-height:100% !important; overflow:visible !important} ';
	if(Cfg[29] == 1) txt += '.spoiler {background:#888 !important; color:#CCC !important} .hide {color:#AAA !important; opacity:1 !important}';
	if(!$id('desustyle')) {
		$x('.//head').appendChild($new('style', {'id': 'desustyle', 'type': 'text/css', 'text': txt}));
		if(nav.Chrome) $disp(dForm);
	} else $id('desustyle').textContent = txt;
}


/*=============================================================================
							FOR POSTS AND THREADS
=============================================================================*/

function forPosts(fn) {
	for(var post, i = 0; post = Posts[i++];) fn(post);
}

function forOP(fn) {
	for(var post, i = 0; post = oPosts[i++];) fn(post);
}

function forAll(fn) {
	forOP(fn); forPosts(fn);
}

function getThread(el) {
	return $x('ancestor::div[@class="thread"]', el);
}

function getPost(el) {
	return !ks0
		? $x('ancestor::table[1]', el) || $x('ancestor::div[starts-with(@id,"oppost")]', el)
		: $x('ancestor::div[@class="postnode"]', el) || $x('ancestor::table[1]', el);
}

function getTitle(post) {
	var t = $x('.//span[@class="filetitle" or @class="replytitle"]', post);
	if(t) t = t.textContent.trim();
	if(!t || t == '') t = post.Text.trim();
	return t.replace(/\s/g, ' ');
}

function getText(el) {
	var n = el.nodeName;
	if(n == '#text') return el.data;
	if(n == 'BR' && !ch.dc) return '\n';
	var t = [];
	if(n == 'P' || n == 'BLOCKQUOTE' || n == 'LI') t[t.length] = '\n';
	var arr = el.childNodes;
	for(var x, i = 0; x = arr[i++];)
		t[t.length] = getText(x);
	return t.join('');
}

function getImages(post) {
	var imgs = $X('.//a[@target="_blank"]//img|.//img[@class="thumb"]', post);
	if(imgs.snapshotLength > 0) return imgs;
}

function isSage(post) {
	if(!hasSage) return false;
	if(wk || ks) {
		var a = $x('.//a[starts-with(@href,"mailto:")]', post);
		return a && /sage/i.test(a.href);
	} else {
		if(ch.dc) return Boolean($x('.//img[@alt="Сажа"]', post));
		if(ch.krau) return Boolean($x('.//span[@class="sage"]', post));
	}
	return false;
}

function isTitled(post) {
	if(!ks0 && $x('.//span[@class="replytitle"]', post).textContent.trim() == '') return false;
	if(ks0 && !$x('.//span[@class="filetitle"]', post)) return false;
	return true;
}

/*-------------------------------Post buttons--------------------------------*/

function addHidePostBtn(post) {
	var el = $new('a', {
		'class': 'hide_icn',
		'id': 'phide_' + post.Num}, {
		'click': function() {
			if(!post.isOp) togglePostVisib(post);
			else {hideThread(post); storeThreadVisib(post, 0)}
		},
		'mouseover': function() {selectPostHider(post)},
		'mouseout': function(e) {removeSelMenu(e.relatedTarget)}
	});
	if(Cfg[48] == 1) $attr(el , {'text': 'x '});
	return el;
}

function addQuickRepBtn(post) {
	var el = $new('a', {
		'class': 'rep_icn',
		'title': 'Быстрый ответ'}, {
		'mouseover': function() {quotetxt = txtSelection()},
		'click': function() {quickReply(post)}
	});
	if(Cfg[48] == 1) $attr(el , {'text': '> '});
	return el;
}

function addExpandThreadBtn(post) {
	var el = $new('a', {
		'class': 'expthr_icn',
		'id': 'expthrd_' + post.Num}, {
		'click': function() {loadThread(post, 1)},
		'mouseover': function() {selectExpandThread(post)},
		'mouseout': function(e) {removeSelMenu(e.relatedTarget)}
	});
	if(Cfg[48] == 1) $attr(el , {'text': 'e '});
	return el;
}

function addFavorBtn(post) {
	var el = $new('a', {
		'class': 'fav_icn',
		'title': 'В избранное'}, {
		'click': function() {storeFavorities(post)}
	});
	if(Cfg[48] == 1) $attr(el , {'text': 'f '});
	return el;
}

function addSageMarker() {
	var el = $new('span', {
		'class': 'sage_icn',
		'title': 'SAGE'}, {
		'click': function() {toggleSage(); toggleChk($id('sage_hider'))}
	});
	if(Cfg[48] == 1) $attr(el , {'html': '<b>sage</b> '});
	return el;
}

function addPostCounter(post) {
	return $new('i', {
		'class': (post.Count < 500 ? 'pcount' : 'pcountb'),
		'text': post.Count
	});
}

function addNote(post, text) {
	post.Btns.appendChild($new('a', {
		'id': 'note_' + post.Num,
		'style': 'font-size:12px; font-style:italic',
		'text': text}, {
		'click': function() {$del(this)}
	}));
}

function addPostButtons(post, isCount) {
	var x = [], i = 0;
	var el = doc.createElement('span');
	if(Cfg[48] == 0) el.className = 'reflink';
	if(!wk || ch._4ch) el.innerHTML = '&nbsp;';
	if(ks) $del($x('.//span[@class="extrabtns"]', post));
	if(ch.dc) $del($x('.//a[@class="reply_ icon"]', post));
	if(ch._4ch) $X('.//a[@class="quotejs"]', post).snapshotItem(1).textContent = post.Num;
	if(!post.isOp) {
		if(!main || isCount) x[i++] = addPostCounter(post);
		if(isSage(post)) x[i++] = addSageMarker();
		if(pr.on) x[i++] = addQuickRepBtn(post);
	} else {
		if(isSage(post)) x[i++] = addSageMarker();
		x[i++] = addFavorBtn(post);
		if(pr.on) x[i++] = addQuickRepBtn(post);
		if(main) x[i++] = addExpandThreadBtn(post);
	}
	x[i++] = addHidePostBtn(post);
	var i = x.length;
	while(i--) el.appendChild(x[i]);
	var ref = $x(refSpan, post)
	if(Cfg[44] == 1) $event(ref, {'click': function(e) {
		if(Cfg[44] == 0 || !pr.on || /Reply|Ответ/.test(e.target.textContent)) return;
		e.stopPropagation(); e.preventDefault();
		var el = !qr.on || qr.form.style.display == 'none' ? pr : qr;
		if(main && el == pr && pr.area.style.display == 'none') $disp(pr.area);
		InsertInto(el.txta, '>>' + post.Num);
	}});
	$after(ref, [el]);
	post.Btns = el;
}

/*----------------------------------Players----------------------------------*/

function insertYouTube(link, el) {
	if($x('.//embed[@src="' + link + '"]', el)) delChilds($1(el));
	else $html($1(el), '<embed src="' + link +
		'" type="application/x-shockwave-flash" wmode="transparent" width="320" height="262" />');
}

function addYouTube(post) {
	if(Cfg[24] == 0) return;
	var pattern = /http:\/\/(www\.)?youtube\.com\/watch\?v=([^&]+).*$/;
	$each($X('.//a[contains(@href,"youtube")]', post || dForm), function(link, i) {
		if(!pattern.test(link.href)) return;
		var pst = post || getPost(link);
		var el = $x('.//div[@id="ytube_div"]', pst);
		if(!el) {
			var msg = $x(postMsg, pst);
			el = $New('div', [$new('span')], {'id': 'ytube_div'});
			$before($1(msg), [el]);
			msg.style.minWidth = '560px';
		}
		var path = 'http://www.youtube.com/v/' + link.href.match(pattern)[2] + '&hl=en_US&fs=1&';
		$after(link, [$new('span', {
			'style': 'cursor:pointer',
			'html': '<b> ' + unescape('%u25BA') + '</b>'}, {
			'click': function(path, el) {return function() {insertYouTube(path, el)}}(path, el)
		})]);
		insertYouTube(path, el);
	});
}

function addMP3(post) {
	if(Cfg[25] == 0) return;
	$each($X('.//a[contains(@href,".mp3")]', post || dForm), function(link) {
		if(!(link.target == '_blank' || link.rel == 'nofollow')) return;
		var src = link.href;
		src = src.substr(link.href.lastIndexOf('http://')); 
		var pst = post || getPost(link);
		var el = $x('.//div[@id="mp3_div"]', pst);
		if(!el) {
			el = $new('div', {'id': 'mp3_div'});
			$before($1($x(postMsg, pst)), [el]);
		}
		if(!$x('.//param[contains(@value,"' + src + '")]', el)) $html(el, el.innerHTML + '<object data="http://junglebook2007.narod.ru/audio/player.swf" wmode="transparent" type="application/x-shockwave-flash" width="220" height="16"><param value="http://junglebook2007.narod.ru/audio/player.swf" name="movie"><param value="playerID=1&amp;bg=0x808080&amp;leftbg=0xB3B3B3&amp;lefticon=0x000000&amp;rightbg=0x808080&amp;rightbghover=0x999999&amp;rightcon=0x000000&amp;righticonhover=0xffffff&amp;text=0xffffff&amp;slider=0x222222&amp;track=0xf5f5dc&amp;border=0x666666&amp;loader=0x7fc7ff&amp;loop=yes&amp;autostart=no&amp;soundFile=' + src + '" name="FlashVars"><param value="high" name="quality"><param value="true" name="menu"><param value="transparent" name="wmode"></object><br>  ');
	});
}

function addImages(post) {
	if(Cfg[49] == 0) return;
	var links = $X(postMsg + '//a[contains(@href,".jpg") or contains(@href,".png") or contains(@href,".gif")]', post || dForm);
	var len = links.snapshotLength;
	if(len < 1) return;
	for(var i = 0; i < len; i++) {
		var link = links.snapshotItem(i);
		var src = link.href;
		var pst = post || getPost(link);
		var el = $x('.//div[@id="img_div"]', pst);
		if(!el) {
			el = $new('div', {'id': 'img_div'});
			$before($1($x(postMsg, pst)), [el]);
		}
		el.appendChild($new('img', {
			'id': 'pre_img',
			'src': src.substr(src.lastIndexOf('http://')),
			'style': 'display:none; cursor:pointer; margin:4px'}, {
			'load': function() {
				var w = this.width;
				var h = this.height;
				$event(this, {'click': function(w, h) {return function() {
					if(this.id == 'pre_img') $attr(this, {'id': 'full_img', 'width': w, 'height': h});
					else $attr(this, {'id': 'pre_img', 'width': 200, 'height': 200*h/w});
				}}(w, h)});
				this.width = 200;
				this.height = 200*h/w;
				this.style.display = '';
			},
		}));
	}
}


/*--------------------------------Expand images------------------------------*/

function expandImg(a, post) {
	var img = $x('.//img', a);
	var pre = $x('.//img[@id="pre_img"]', a);
	var full = $x('.//img[@id="full_img"]', a);
	$disp(img);
	if(pre) {$disp(pre); return}
	if(full) {$disp(full); return}
	var maxw = doc.body.clientWidth - getOffset(a, 'offsetLeft') - 20;
	var sz = getImgSize(post.Img.snapshotLength > 1 ? $x('ancestor::div[1]', a) : post).split(/[x|×]/);
	var r = sz[0]/sz[1];
	var w = sz[0] < maxw ? sz[0] : maxw;
	var h = w/r;
	$append(a, [
		$if(Cfg[21] == 2, $attr(img.cloneNode(false), {
			'class': 'thumb',
			'id': 'pre_img',
			'width': w,
			'height': h,
			'style': 'display:block'
		})),
		$new('img', {
			'class': 'thumb',
			'id': 'full_img',
			'alt': 'Загрузка...',
			'src': $x('ancestor-or-self::a[1]', a).href,
			'width': w,
			'height': h,
			'style': 'display:' + (Cfg[21] == 2 ? 'none' : 'block')}, {
			'load': function() {
				$del($x('.//img[@id="pre_img"]', $up(this)));
				if(img.style.display == 'none') this.style.display = 'block';
			}
		})
	]);
}

function expandHandleImg(post) {
	$each(post.Img, function(img) {
		var a = $x('ancestor::a[1]', img);
		$rattr(a, 'onclick');
		$rattr(img, 'onclick');
		$event(a, {'click': function(e) {
			if(Cfg[21] != 0) {e.preventDefault(); expandImg(this, post)}
		}});
	});
}

function allImgExpander() {
	if(Cfg[21] == 0 || main || (ks && !ch._0ch) || !getImages(dForm)) return;
	if(ch._0ch) $del($next(oPosts[0]));
	var txt = '[<a>Раскрыть изображения</a>]';
	oPosts[0].appendChild($new('span', {
		'id': 'expimgs_btn',
		'style': 'cursor:pointer',
		'html': txt}, {
		'click': function() {
			forPosts(function(post) {
				if(post.Img && post.Vis != 0)
					$each(post.Img, function(img) {expandImg($x('ancestor::a[1]', img), post)})
			});
			var btn = $id('expimgs_btn');
			btn.innerHTML = /Раскрыть/.test(btn.innerHTML) ? '[<a>Свернуть изображения</a>]' : txt;
		}}));
}

/*--------------------------Add map of answers to post-----------------------*/

function getRefMap(pNum, rNum, arr, dir) {
	if(!arr[rNum]) arr[rNum] = [];
	if((',' + arr[rNum].toString() + ',').indexOf(',' + pNum + ',') < 0) {
		if(dir) arr[rNum].push(pNum);
		else arr[rNum].unshift(pNum);
	}
}

function ajaxRefmap(x, pNum) {
	if(x) for(var i = 0; rLen = x.length, i < rLen; i++)
		getRefMap(pNum, x[i].match(/\d+/g), refArr, true);
}

function showRefMap(post, rNum, isUpd, arr, tNum, b) {
	if(!arr[rNum]) return;
	var ref = arr[rNum].toString().replace(/(\d+)/g, 
		'<a href="' + (tNum ? '/' + b + '/' + res + tNum + '.html' : '')
		+ '#$1" onclick="highlight($1)">&gt;&gt;$1</a>'
	);
	var el;
	if(isUpd) el = $id('rfmap_' + rNum);
	if(!el) {
		if(!post || !post.innerHTML) return;
		var msg = post.Msg || $x(postMsg, post);
		if(!msg) return;
		el = $new('div', {
			'class': 'rfmap',
			'id': 'rfmap_' + rNum,
			'html': '<br>&nbsp;Ответы: ' + ref
		});
		doRefPreview(el);
		$after(msg, [el]);
	} else {
		var htm = el.innerHTML;
		if(htm.indexOf(ref) < 0) doRefPreview($html(el, htm + ', ' + ref));
	}
}

function doRefMap(post) {
	if(Cfg[22] != 2) return;
	var arr = [];
	$each($X('.//a[starts-with(text(),">>")]', (post ? post.Msg : dForm)), function(link) {
		if(/\//.test(link.textContent)) return;
		var rNum = (link.hash || link.pathname.substring(link.pathname.lastIndexOf('/'))).match(/\d+/);
		var pst = getPost(link);
		if(postByNum[rNum] && pst) getRefMap(pst.id.match(/\d+/), rNum, arr);
	});
	for(var rNum in arr) showRefMap(postByNum[rNum], rNum, Boolean(post), arr);
}

/*---------------------------Posts preview by reflinks-----------------------*/

function delPostPreview(e) {
	var el = $x('ancestor-or-self::div[starts-with(@id,"pstprew")]', e.relatedTarget);
	if(!el) $each($X('.//div[starts-with(@id,"pstprew")]'), function(clone) {$del(clone)});
	else while(el.nextSibling) $del(el.nextSibling);
}

function showPostPreview(e) {
	setTimeout(function() {
		$del($x('.//div[starts-with(@id,"preview") or starts-with(@id,"pstprev")]'));
	}, 5);
	var tNum = this.pathname.substring(this.pathname.lastIndexOf('/')).match(/\d+/);
	var pNum = this.hash.match(/\d+/) || tNum;
	var b = this.pathname.match(/[^\/]+/);
	if(/\.html$|^res$/.test(b) || !b) b = '';
	var div = $new('div', {
		'style': 'position:absolute; top:0; left:0; width:100%; height:100%'
	});
	doc.body.appendChild(div);
	var hh = div.offsetHeight, ww = div.offsetWidth;
	$del(div);
	var x = e.clientX + (doc.documentElement.scrollLeft || doc.body.scrollLeft) + 2;
	var y = e.clientY + (doc.documentElement.scrollTop || doc.body.scrollTop);
	var cln = $new('div', {
		'class': replyClass,
		'id': 'pstprew_' + pNum,
		'style': 'position:absolute; z-index:300; width:auto; min-width:0; border:1px solid grey; '
			+ (x < ww/2 ? 'left:' + x : 'right:' + parseInt(ww - x + 2)) + 'px; '
			+ (e.clientY < hh*0.75 ? 'top:' + y : 'bottom:' + parseInt(hh - y - 4)) + 'px'}, {
		'mouseout': delPostPreview});
	var functor = function(cln, html) {
		cln.innerHTML = htmlReplace(html);
		cln.Img = getImages(cln);
		doRefPreview(cln);
		expandHandleImg(cln);
		addYouTube(cln);
		if(Cfg[22] == 2 && refArr[pNum]) {
			$each($X('.//div[@class="rfmap"]', cln), function(el) {$del(el)});
			showRefMap(cln, pNum, false, refArr, tNum, b);
		}
	};
	if(b == brd) var post = postByNum[pNum];
	cln.innerHTML = '<span class="wait_icn">&nbsp;</span><span>&nbsp;Загрузка...</span>';
	if(post) {
		functor(cln, ($x('.//td[@class="' + replyClass + '"]', post) || post).innerHTML);
		if(post.Vis == 0) togglePost(cln);
	} else if(ajaxPosts[tNum] && ajaxPosts[tNum][pNum]) functor(cln, ajaxPosts[tNum][pNum]);
	else AJAX(true, b, tNum, function(err) {
		functor(cln, err || ajaxPosts[tNum][pNum] || 'Пост не найден');
	});
	$del($id(cln.id));
	dForm.appendChild(cln);
}

function doRefPreview(el) {
	if(Cfg[22] == 0) return;
	$each($X('.//a[starts-with(text(),">>")]', el || dForm), function(link) {
		if(ch.dc) $rattr(link, 'onmouseover');
		$event(link, {'mouseover': showPostPreview, 'mouseout': delPostPreview});
	});
}


/*=============================================================================
								AJAX FUNCTIONS
=============================================================================*/

function getpNum(x) {
	return (x.match(/<input[^>]+checkbox[^>]+>/i) || x.match(/<a\s+name="\d+">/i))[0].match(/(\d+)/)[0];
}

function fix4chan(x) {
	return !(ch._4ch || ch.krau) ? x : x.split('<!-- Start')[0].replace(/(^|>|\s)(https*:\/\/.*?)($|<|\s)/ig, '$1<a href="$2">$2</a>$3');
}

function parseHTMLdata(x) {
	x = x.split(/<form[^>]+del[^>]+>/)[1].split('</form>')[0];
	var thrds = x.substring(0, x.lastIndexOf(!ch.krau ? x.match(/<br[^>]+left/) : '<div style="clear: both">')).split(!ch.krau ? /<br[^>]+left["\s<\/p>]+<hr[^>]*>/ : /<\/div>\s+<div[^>]+class="thread"[^>]*>/);
	for(var i = 0, tLen = thrds.length; i < tLen; i++) {
		var tNum = getpNum(thrds[i]);
		var posts = thrds[i].split(/<table[^>]*>/);
		ajaxThrds[i] = tNum;
		ajaxPosts[tNum] = {keys: []};
		for(var j = 0, pLen = posts.length; j < pLen; j++) {
			var x = posts[j];
			var pNum = getpNum(x);
			ajaxPosts[tNum].keys.push(pNum);
			ajaxPosts[tNum][pNum] = x.substring((!/<\/td/.test(x) && /filesize">/.test(x)) ? x.indexOf('filesize">') - 13 : (/<label/.test(x) ? x.indexOf('<label') : x.indexOf('<input')), /<\/td/.test(x) ? x.lastIndexOf('</td') : (/omittedposts">/.test(x) ? x.lastIndexOf('</span') + 7 : (/<\/div/.test(x) && (!ks || ks0) ? x.lastIndexOf('</div') + 6 : x.lastIndexOf('</blockquote') + 13))).replace(/(href="#)(\d+")/g, 'href="' + tNum + '#$2');
			x = ajaxPosts[tNum][pNum];
			ajaxRefmap(x.substr(x.indexOf('<blockquote>') + 12).match(/&gt;&gt;\d+/g), pNum)
		}
	}
}

function parseJSONdata(x) {
	var thrds = eval('(' + x.substring(x.indexOf('threads') - 2, x.lastIndexOf('events') - 4) + ')').threads;
	for(var i = 0, tLen = thrds.length; i < tLen; i++) {
		var tNum = thrds[i].display_id;
		var posts = thrds[i].posts;
		ajaxThrds[i] = tNum;
		ajaxPosts[tNum] = {keys: []};
		for(var j = 0, pLen = posts.length; j < pLen; j++) {
			var x = posts[j];
			var pNum = x.display_id;
			ajaxPosts[tNum].keys.push(pNum);
			var farr = [];
			for(var f = 0, fLen = x.files.length; f < fLen; f++) {
				var fl = x.files[f];
				var m = fl.metadata;
				var a = '<a href="/' + fl.src + '" target="_blank">';
				farr[farr.length] = '<div class="file"><div class="fileinfo">Файл: ' + a + fl.src.substr(fl.thumb.lastIndexOf('/') + 1) + '</a><br><em>' + fl.src.substr(fl.src.indexOf('.') + 1) + ', ' + (fl.size/1024).toFixed(2) + ' KB, ' + (!/MP3|OggVorbis/.test(m.type) ? m.width + '×' + m.height : Math.floor(m.length/60).toString() + ':' + Math.floor(m.length - Math.floor(m.length/60)*60).toString() + ' m @ ' + Math.floor(m.bitrate/1000) + 'kbps<br>' + m.artist + ' — ' + m.album + ' / ' + m.title) + '</em><br></div>' + a + '<img src="/' + fl.thumb + '" class="thumb" alt="/' + fl.src + '"></a></div>';
			}
			var txt = (x.message || '').split('\r\n');
			for(var r = 0, rLen = txt.length; r < rLen; r++) {
				if(/^\s{4}/.test(txt[r])) txt[r] = txt[r].substr(4);
				else txt[r] = txt[r].replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/(&gt;&gt;)(\d+)/g, '<a href="/' + brd + '/' + res + tNum + '.xhtml#i$2">$1$2</a>').replace(/(https*:\/\/.+?)(?:\s|&gt;|$)/ig, '<a href="$1">$1</a>').replace(/(\*\*)(.+?)(\*\*)/g, '<b>$2</b>').replace(/(\*)(.+?)(\*)/g, '<i>$2</i>').replace(/(__)(.+?)(__)/g, '<b>$2</b>').replace(/(_)(.+?)(_)/g, '<i>$2</i>').replace(/(`)(.+?)(`)/g, '<code>$2</code>').replace(/(%%)(.+?)(%%)/g, '<span class="spoiler">$2</span>').replace(/(^|\s)([^\s]+?)(\^W|\^H)+/g, '$1<del>$2</del>').replace(/^(&gt;.*)$/, '<blockquote depth="0">$1</blockquote>');
			}
			ajaxPosts[tNum][pNum] = '<label><a class="delete icon"><img src="/images/blank.png"></a>' + (x.sage ? '<img src="/images/sage-carbon.png" alt="Сажа" title="Сажа">' : '') + (x.subject ? '<span class="replytitle">' + x.subject + '</span>' : '') + '<span class="postername">' + x.name + '</span> ' + x.date + ' </label><span class="reflink"><a href="/' + brd + '/' + res + tNum + '.xhtml#i' + pNum + '">No.' + pNum + '</a></span>' + (j == 0 ? '<span class="cpanel">[<a href="/' + brd + '/' + res + tNum + '.xhtml">Открыть тред</a>]</span>' : '') + '<br>' + (x.files.length > 0 ? farr.join('') + (x.files.length > 1 ? '<br style="clear: both">' : '') : '') + '<div class="postbody"><div class="message">' + txt.join('<br>').replace(/(^|<br>)(%%<br>)(.+?)(<br>%%.*?)(<br>|$)/g, '<div class="spoiler">$3</div>').replace(/(^|<br>)(``<br>)(.+?)(<br>``.*?)(<br>|$)/g, '<pre>$3</pre>').replace(/quote><br>/g, 'quote>') + '</div></div>' + (x.op == true ? '<div class="abbrev">' + 'Всего ' + thrds[i].posts_count + ' постов, из них ' + thrds[i].files_count + ' с файлами</div>' : '');
			ajaxRefmap((x.message || '').match(/>>\d+/g), pNum);
		}
	}
}

function AJAX(isThrd, b, id, fn) {
	b = b != '' ? b + '/' : '';
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(xhr.readyState != 4) return;
		if(xhr.status == 200) {
			if(ch.dc) parseJSONdata(xhr.responseText);
			else parseHTMLdata(xhr.responseText);
			fn();
		} else fn('HTTP ' + xhr.status + ' ' + xhr.statusText);
	};
	xhr.open('GET', (isThrd
		? (ch.dc 
			? '/api/thread/new/' + b + id + '.json?last_post=0'
			: '/' + b + '/' + res + id + '.html')
		: ('/' + b + (ch.dc
			? ((id != '' ? id : 'index') + '.json?last_post=0')
			: (id != '' ? id + '.html' : '')))
	), true);
	xhr.setRequestHeader('Accept-Encoding', 'deflate, gzip, x-gzip');
	xhr.send(false);
}

function newPost(thr, tNum, i, isCount) {
	var pNum = ajaxPosts[tNum].keys[i];
	var html = htmlReplace(ajaxPosts[tNum][pNum]);
	var post = thr.appendChild($new(i > 0 ? 'table' : 'div', {
		'id': (i > 0 ? 'post_' : 'oppost_') + pNum,
		'html': (i > 0 ? '<tbody><tr><td class="doubledash">&gt;&gt;</td><td class="'
			+ replyClass + '" id="reply' + pNum + '">' + html + '</td></tr></tbody>' : html)
	}));
	if(i == 0) oPosts[oPosts.length] = post;
	else Posts[Posts.length] = post;
	postByNum[pNum] = post;
	post.Num = pNum;
	post.Count = i + 1;
	if(!(sav.cookie && main)) post.Vis = getVisib(pNum);
	post.Msg = $x(postMsg, post);
	post.Text = getText(post.Msg).trim();
	post.Img = getImages(post);
	post.isOp = i == 0;
	addPostButtons(post, isCount);
	doPostFilters(post);
	if(post.Vis == 0) setPostVisib(post, 0);
	if(Cfg[15] == 1) mergeHidden(post);
	doRefMap(post);
	if(Cfg[21] != 0) expandHandleImg(post);
	doRefPreview(post.Msg);
	addMP3(post);
	addYouTube(post);
	addImages(post);
	return post;
}

function expandPost(post) {
	if(post.Vis == 0 || !$x('.//div[@class="abbrev"]|.//span[@class="abbr"]', post)) return;
	var tNum = getThread(post).id.match(/\d+/);
	AJAX(true, brd, tNum, function() {
		var txt = htmlReplace(ajaxPosts[tNum][post.Num]);
		post.Msg = $html(post.Msg, txt.substring(txt.indexOf('<blockq') + 12, txt.lastIndexOf('</blockq')));
		post.Text = getText(post.Msg);
		doRefPreview(post.Msg);
		addMP3(post);
		addYouTube(post);
		addImages(post);
	});
}

function expandThread(thr, tNum, last, del) {
	var len = ajaxPosts[tNum].keys.length;
	if(last != 1) last = len - last;
	if(last <= 0) last = 1;
	for(var i = last; i < len; i++) {
		var post = newPost(thr, tNum, i, true);
		if(del) post.isDel = true;
	}
	if(!sav.cookie) storeHiddenPosts();
	$close($id('DESU_alert_wait'));
}

function loadThread(post, last) {
	$alert('Загрузка...', 'wait');
	var thr = getThread(post);
	var tNum = post.Num;
	AJAX(true, brd, tNum, function(err) {
		if(err) {
			$close($id('DESU_alert_wait'));
			$alert(err);
		} else {
			$del($x('.//span[@class="omittedposts" or @class="abbr" or @class="omittedinfo"]|.//div[@class="abbrev"]', thr));
			$del($id('rfmap_' + tNum));
			delNexts(post);
			expandThread(thr, tNum, last);
		}
	});
}

function loadFavorThread(el, b, tNum) {
	var thr = $x('.//div[@class="thread"]', el);
	if(thr.style.display != 'none') {$disp(thr); return}
	$alert('Загрузка...', 'wait');
	AJAX(true, b, tNum, function(err) {
		if(err) {
			$close($id('DESU_alert_wait'));
			$alert(err);
		} else {
			delChilds(thr);
			newPost(thr, tNum, 0, true);
			expandThread(thr, tNum, 5, true);
			$disp(thr);
		}
	});
}

function getDelPosts() {
	var tNum = oPosts[0].Num;
	var j = 2, del = 0, isdel = false;
	for(var i = 0, len = Posts.length; i < len; i++) {
		var post = Posts[i];
		if(!ajaxPosts[tNum][post.Num]) {
			if(!post.isDel)
				$attr($x('.//i[starts-with(@class,"pcount")]' , post), {
					'style': 'color:#727579',
					'text': 'удалён'
				});
			post.isDel = true;
			isdel = true;
		} else {
			if(!post.isDel) {
				if(isdel) $x('.//i[starts-with(@class,"pcount")]' , post).textContent = j;
				j++;
			}
		}
		if(post.isDel) del++;
	}
	return del;
}

function infoNewPosts(err, del) {
	if(Cfg[19] == 3) return;
	if(err) {
		$alert('Тред №' + oPosts[0].Num + ' недоступен:\n' + err);
		clearInterval(ajaxInterval);
	} else if(Cfg[19] == 2) {
		var inf = parseInt(ajaxPosts[oPosts[0].Num].keys.length - Posts.length + del - 1)
		$alert('ITT новых постов: ' + inf, 'newpst');
		doc.title = '/' + brd + ' [' + inf + '] ' + getTitle(oPosts[0]).substring(0, 50);
	}
}

function loadNewPosts(inf) {
	if(inf) $alert('Загрузка...', 'wait');
	var tNum = oPosts[0].Num;
	AJAX(true, brd, tNum, function(err) {
		if(!err) {
			var del = getDelPosts();
			for(var i = Posts.length - del + 1, len = ajaxPosts[tNum].keys.length; i < len; i++)
				newPost($x('.//div[@class="thread"]', dForm), tNum, i, true);
			storeHiddenPosts();
		}
		if(inf) $close($id('DESU_alert_wait'));
		infoNewPosts(err, del);
	});
}

function initNewPosts() {
	if(main) return;
	var C = Cfg[43];
	var t = (C == 0 ? 0.5 : (C == 1 ? 1 : (C == 2 ? 1.5
		: (C == 3 ? 2 : (C == 4 ? 5 : (C == 5 ? 15 : 30))))))*60000;
	if(Cfg[19] == 1) ajaxInterval = setInterval(function() {loadNewPosts()}, t);
	if(Cfg[19] == 2) {
		$alert('ITT новых постов: 0', 'newpst');
		ajaxInterval = setInterval(function() {
			AJAX(true, brd, oPosts[0].Num, function(err) {infoNewPosts(err, getDelPosts())});
		}, t);
	}
	if(Cfg[19] == 2 || Cfg[19] == 3)
		$after($x('.//div[@class="thread"]'), [$new('span', {
			'id': 'newpst_btn',
			'style': 'cursor:pointer',
			'html': '[<a>Получить новые посты</a>]'}, {
			'click': function() {loadNewPosts(true)}
		})]);
}

function loadPages(len) {
	$alert('Загрузка...', 'wait');
	delChilds(dForm);
	Posts = []; oPosts = []; refArr = [];
	for(var p = 0; p < len; p++)
		AJAX(false, brd, p == 0 ? '' : p, function(p, len) {return function() {
			for(var i = 0, tLen = ajaxThrds.length; i < tLen; i++) {
				var tNum = ajaxThrds[i];
				var thr = $new('div', {'class': 'thread', 'id': tNum});
				$append(dForm, [thr, $new('br', {'clear': 'left'}), $new('hr')]);
				for(var j = 0, pLen = ajaxPosts[tNum].keys.length; j < pLen; j++) {
					var post = newPost(thr, tNum, j);
					if(Cfg[26] == 1 && !ch.dc) expandPost(post);
				}
			}
			if(!sav.cookie) storeHiddenPosts();
			readThreadsVisib();
			if(p == len - 1) $close($id('DESU_alert_wait'));
		}}(p, len));
}


/*=============================================================================
								HIDERS / FILTERS
=============================================================================*/

function hideThread(post, note) {
	if(post.Vis == 0) return;
	togglePost(post, 0);
	var x = $new('div', {
		'class': replyClass,
		'id': 'hiddenthr_' + post.Num,
		'style': 'display:inline; cursor:default',
		'html': 'Тред <a style="cursor:pointer">№' + post.Num + '</a> скрыт <i>('
			+ (!note ? getTitle(post).substring(0, 50) : 'autohide: ' + note) + ')' + '</i>'
	});
	$event($x('.//a', x), {
		'click': function() {togglePost(post, 1); unhideThread(post)},
		'mouseover': function() {togglePost(post, 1)},
		'mouseout': function() {togglePost(post, 1)}
	});
	$before($up(post), [x]);
	if(Cfg[15] == 2) {$disp(x); $disp($next($next(x))); $disp($next($next($next(x))))}
}

function unhideThread(post) {
	if(post.Vis == 1) return;
	togglePost(post, 1);
	$del($id('hiddenthr_' + post.Num));
	storeThreadVisib(post, 1);
}

function prevHidden(e) {togglePost(getPost(this), 1)}
function unprevHidden(e) {togglePost(getPost(this), 0)}

function applyPostVisib(post, vis) {
	if(post.isOp) return;
	if(!sav.cookie) {
		Visib[brd + post.Num] = vis;
		Expires[brd + post.Num] = (new Date()).getTime() + STORAGE_LIFE;
	} else Visib[post.Count] = vis;
	post.Vis = vis;
	if(Cfg[15] == 2) post.style.display = (vis == 0) ? 'none' : '';
}

function setPostVisib(post, vis) {
	if(post.isOp) {
		if(vis == 0) hideThread(post);
		else unhideThread(post);
		return;
	}
	if(Cfg[48] == 0) $x('.//a', post.Btns).className = (vis == 0) ? 'unhide_icn' : 'hide_icn';
	else $x('.//a', post.Btns).textContent = (vis == 0) ? '+ ' : 'x ';
	togglePost(post, vis);
	applyPostVisib(post, vis);
	if(Cfg[16] == 0) return;
	var reflink = $prev(post.Btns);
	if(vis == 0) $event(reflink, {'mouseover': prevHidden, 'mouseout': unprevHidden});
	else $revent(reflink, {'mouseover': prevHidden, 'mouseout': unprevHidden});
}

function togglePostVisib(post) {
	post.Vis = (post.Vis == 1) ? 0 : 1;
	setPostVisib(post, post.Vis);
	storePostsVisib();
}

function hidePost(post, note) {
	if(!post.isOp) {
		if(post.Vis != 0) addNote(post, ' autohide: ' + note + ' ');
		applyPostVisib(post, 0);
	} else if(Cfg[18] == 1) {
		hideThread(post, note);
		storeThreadVisib(post, 0);
	}
}

function unhidePost(post) {
	if(!post.isOp) {
		if(detectWipe(post) != null) return;
		setPostVisib(post, 1);
		$del($id('note_' + post.Num));
		hideByWipe(post);
	} else if(Cfg[18] == 1) unhideThread(post);
}

function storeHiddenPosts() {
	forPosts(function(post) {if(post.Vis == 0) setPostVisib(post, 0)});
	storePostsVisib();
}

function togglePost(post, vis) {
	if(post.isOp) $disp($up(post));
	var txt = './/br|.//small|.//div[starts-with(@id,"rfmap")]';
	if(ch.dc) txt += '|.//div[@class="postbody" or @class="file" or @class="fileinfo"]';
	if(ch.krau) txt += '|.//div[@class="file_reply"]|.//blockquote';
	if(wk || ks) txt += '|.//blockquote|.//a[@target="_blank"]|.//span[@class="filesize" or @class="thumbnailmsg"]|.//div[@class="nothumb"]';
	if(post.isOp) txt += '|.//span[@class="omittedposts"]|.//div[@class="abbrev"]'
	$each($X(txt, post), function(el) {el.style.display = (vis == 0) ? 'none' : ''});
}

function mergeHidden(post) {
	if(post.Vis != 0) return;
	var el = $prev(post);
	if(!/merged/.test(el.id)) {
		el = $new('div', {'id': 'merged_' + post.Num, 'style': 'display:none'});
		$before(post, [$new('span', {
			'style': 'display:block; cursor:pointer'}, {
			'click': function() {
				var hDiv = $id('merged_' + post.Num);
				$prev(hDiv).innerHTML = 
					(hDiv.style.display == 'none' ? unescape('%u25BC') : unescape('%u25B2'))
					+ '[<i><a>Скрыто:</a> ' + hDiv.childNodes.length + '</i>]';
				$disp(hDiv);
			}}
		), el]);
	}
	el.appendChild(post);
	var next = $next(post);
	if(!next || getVisib(next.id.match(/\d+/)) == 1)
		$prev(el).innerHTML =
			unescape('%u25B2') + '[<i><a>Скрыто:</a> ' + el.childNodes.length + '</i>]';
}

function processHidden(newCfg, oldCfg) {
	if(newCfg == 2 || oldCfg == 2) {
		forPosts(function(post) {if(post.Vis == 0) $disp(post)});
		if(Cfg[18] == 1)
			$each($X('.//div[starts-with(@id,"hiddenthr_")]'), function(x) {
				$disp(x);
				$disp($next($next(x))); $disp($next($next($next(x))));
			});
	}
	if(oldCfg == 1)
		$each($X('.//div[starts-with(@id,"merged_")]'), function(el) {
			var px = el.childNodes;
			var i = px.length;
			while(i--) $after(el, [px[i]]);
			$del($prev(el));
			$del(el);
		});
	if(newCfg == 1) forAll(mergeHidden);
	saveCfg(15, newCfg);
}

/*-----------------------------------Filters---------------------------------*/

function doPostFilters(post) {
	if(post.Vis == 0) return;
	var C = Cfg;
	if(C[0] == 1) hideByWipe(post);
	if(C[8] == 1 && hasSage) hideBySage(post);
	if(C[9] == 1 && pr.subj && !post.isOp) hideByTitle(post);
	if(C[10] == 1) hideByNoText(post);
	if(C[11] == 1) hideByNoImage(post);
	if(C[12] == 1) hideByMaxtext(post);
	if(C[14] == 1) hideByRegexp(post);
}

function hideBySage(post) {
	if(isSage(post)) hidePost(post, 'sage');
}
function toggleSage() {
	toggleCfg(8);
	if(Cfg[8] == 1) forAll(hideBySage);
	else forAll(function(post) {if(isSage(post)) unhidePost(post)});
	storeHiddenPosts();
}

function hideByNoText(post) {
	if(post.Text == '') hidePost(post, 'no text');
}
function toggleNotext() {
	toggleCfg(10);
	if(Cfg[10] == 1) forAll(hideByNoText);
	else forAll(function(post) {if(post.Text == '') unhidePost(post)});
	storeHiddenPosts();
}

function hideByNoImage(post) {
	if(!post.Img) hidePost(post, 'no image');
}
function toggleNoimage() {
	toggleCfg(11);
	if(Cfg[11] == 1) forAll(hideByNoImage);
	else forAll(function(post) {if(!post.Img) unhidePost(post)});
	storeHiddenPosts();
}

function hideByTitle(post) {
	if(isTitled(post)) hidePost(post, 'theme field');
}
function toggleTitle() {
	toggleCfg(9);
	if(Cfg[9] == 1) forPosts(hideByTitle);
	else forPosts(function(post) {if(isTitled(post)) unhidePost(post)});
	storeHiddenPosts();
}

function hideByMaxtext(post) {
	var len = post.Text.replace(/\n/g, '').length;
	if(len >= parseInt(Cfg[13]))
		hidePost(post, 'text n=' + len + ' > max');
}
function toggleMaxtext() {
	var fld = $id('maxtext_field');
	if(isNaN(fld.value)) {
		$id('maxtext_hider').checked = false;
		saveCfg(12, 0);
		$alert('введите число знаков');
		return;
	}
	toggleCfg(12);
	saveCfg(13, fld.value);
	if(Cfg[12] == 1) forAll(hideByMaxtext);
	else forAll(function(post) {
		if(post.Text.replace(/\n/g, '').length >= parseInt(Cfg[13]))
		unhidePost(post);
	});
	storeHiddenPosts();
}

/*----------------------Hide/change posts by expressions---------------------*/

function htmlReplace(txt) {
	var exp = getStored(ID('RegExpr'));
	if(Cfg[14] == 0 || !exp || !/\$rep /.test(exp)) return txt;
	exp = exp.split('\n');
	var i = exp.length;
	while(i--) {
		var x = exp[i].trim();
		if(/\$rep /.test(x)) {
			var re = x.split(' ')[1];
			var l = re.lastIndexOf('/');
			var wrd = x.substr(x.indexOf(re) + re.length + 1);
			re = new RegExp(re.substr(1, l - 1), re.substr(l + 1));
			txt = txt.replace(re, wrd);
		}
	}
	return txt;
}

function wrongRegExp(txt) {
	txt = (txt || '').trim().split('\n');
	var i = txt.length;
	while(i--)
		if(/\$exp\s|\$rep\s/.test(txt[i]))
			try {
				x = txt[i].split(' ')[1].trim();
				var l = x.lastIndexOf('/');
				new RegExp(x.substr(1, l - 1), x.substr(l + 1));
			} catch(e) {return txt[i]}
	return null;
}

function hideByRegexp(post) {
	var exp = doRegexp(post);
	if(exp) hidePost(post, 'match ' + exp.substring(0, 20) + '..');
}

function applyRegExp(txt) {
	var fld = $id('regexp_field');
	var val = fld.value.trim();
	if(txt) {
		if(txt.trim() == '') return;
		toggleRegexp();
		var nval = '\n' + val;
		var ntxt = '\n' + txt;
		val = (nval.indexOf(ntxt) > -1 ? nval.split(ntxt).join('') : val + ntxt).trim();
	}
	var wrong = wrongRegExp(val);
	if(wrong) {$alert('Ошибка в ' + wrong); return}
	fld.value = val;
	forAll(function(post) {if(doRegexp(post)) unhidePost(post)})
	setStored(ID('RegExpr'), val);
	$id('regexp_hider').checked = val != '';
	if(val != '') {
		saveCfg(14, 1);
		forAll(hideByRegexp);
		storeHiddenPosts();
	} else saveCfg(14, 0);
}

function toggleRegexp() {
	var val = $id('regexp_field').value.trim();
	var wrong = wrongRegExp(val);
	if(!wrong) setStored(ID('RegExpr'), val);
	if(val != '' && !wrong) {
		toggleCfg(14);
		if(Cfg[14] == 1) forAll(hideByRegexp);
		else forAll(function(post) {if(doRegexp(post)) unhidePost(post)})
		storeHiddenPosts();
	} else {
		if(wrong) $alert('Ошибка в ' + wrong);
		$id('regexp_hider').checked = false;
		saveCfg(14, 0);
	}
}

function doRegexp(post) {
	var exp = getStored(ID('RegExpr')).split('\n');
	var pname = $x('.//span[@class="commentpostername" or @class="postername"]', post);
	var ptrip = $x('.//span[@class="postertrip"]', post);
	var ptitle = $x('.//span[@class="replytitle" or @class="filetitle"]', post);
	var i = exp.length;
	while(i--) {
		var x = exp[i].trim();
		if(/\$rep /.test(x)) continue;
		if(/\$img /.test(x)) {
			if(!post.Img) continue;
			var img = doImgRegExp(post, x.split(' ')[1]);
			if(img != null) return img; else continue;
		}
		if(/\$name /.test(x)) {
			x = x.split(' ')[1];
			var nm = x.split(/!+/)[0];
			var tr = x.split(/!+/)[1];
			if(pname && nm != '' && pname.textContent.indexOf(nm) > -1 ||
				ptrip && tr != '' && ptrip.textContent.indexOf(tr) > -1) return x;
		}
		if(/\$exp /.test(x)) {
			x = x.split(' ')[1];
			var l = x.lastIndexOf('/');
			var re = new RegExp(x.substr(1, l - 1), x.substr(l + 1));
			if(post.Text.match(re)) return x;
			if(post.innerHTML.match(re)) return x;
		}
		if(x == '$alltrip' && ptrip) return x;
		x = x.toLowerCase();
		if(ptitle && ptitle.textContent.toLowerCase().indexOf(x) > -1) return x;
		if(post.Text.toLowerCase().indexOf(x) > -1) return x;
	}
}

function regExpImage(post) {
	if(!post.Img) {
		toggleNoimage();
		toggleChk($id('noimage_hider'));
	} else applyRegExp('$img =' + getImgWeight(post) + '@' + getImgSize(post));
}

function doImgRegExp(post, exp) {
	if(exp == '') return;
	var s = exp.split('@');
	var stat = s[0].substring(0, 1);
	var expK = s[0].substring(1);
	if(expK != '') {
		var imgK = getImgWeight(post);
		if((stat == '<' && imgK < expK) ||
			(stat == '>' && imgK > expK) ||
			(stat == '=' && imgK == expK))
			{if(!s[1]) return('image ' + exp)}
		else return;
	}
	if(s[1]) {
		var x = s[1].split(/[x|×]/);
		var expW = x[0], expH = x[1];
		var sz = getImgSize(post).split(/[x|×]/);
		var imgW = sz[0], imgH = sz[1];
		if((stat == '<' && imgW < expW && imgH < expH) ||
			(stat == '>' && imgW > expW && imgH > expH) ||
			(stat == '=' && (imgW == expW && imgH == expH)))
			return 'image ' + exp;
	}
}

function getImgWeight(post) {
	var inf = $x('.//em|.//span[@class="filesize" or @class="fileinfo"]', post).textContent.match(/\d+[\.\d\s|m|k|к]*[b|б]/i)[0];
	var w = parseFloat(inf.match(/[\d|\.]+/));
	if(/MB/.test(inf)) w = w*1000;
	if(/\d[\s]*B/.test(inf)) w = (w/1000).toFixed(2);
	return w;
}

function getImgSize(post) {
	return $x('.//em|.//span[@class="filesize" or @class="fileinfo"]', post).textContent.match(/\d+[x|×]\d+/)[0];
}

/*-------------------------Hide posts with similar text----------------------*/

function getWrds(post) {
	return post.Text.replace(/\s+/g, ' ').replace(/[\?\.\\\/\+\*\$\^\(\)\|\{\}\[\]!@#%_=:;<,-]/g, '').substring(0, 1000).split(' ');
}

function hideBySameText(post) {
	if(post.Text == '') {
		toggleNotext();
		toggleChk($id('notext_hider'));
		return;
	}
	var vis = post.Vis;
	forAll(function(target) {findSameText(target, post, vis, getWrds(post))});
	storeHiddenPosts();
}

function findSameText(post, origPost, origVis, origWords) {
	var words = getWrds(post);
	var origLen = origWords.length;
	if(words.length > origLen*2.5 || words.length < origLen*0.5) return;
	var matchCount = 0;
	var i = origWords.length;
	while(i--) {
		if(origWords.length > 6 && origWords[i].length < 3) {origLen--; continue}
		var j = words.length;
		while(j--) if((words[j] == origWords[i]) || (origWords[i].substring(0, 2) == '>>' && words[j].substring(0, 2) == '>>')) matchCount++;
	}
	if(!(matchCount >= origLen*0.5 && words.length < origLen*2.5)) return;
	$del($id('note_' + post.Num));
	if(origVis != 0) hidePost(post, ' same text as >>' + origPost.Num);
	else unhidePost(post);
}


/*=============================================================================
								WIPE DETECTORS
=============================================================================*/

function detectWipe(post) {
	var detectors = [
		detectWipe_sameLines,
		detectWipe_sameWords,
		detectWipe_specSymbols,
		detectWipe_longColumn,
		detectWipe_longWords,
		detectWipe_numbers,
		detectWipe_caseWords
	];
	for(var i = 0; i < detectors.length; i++) {
		var detect = detectors[i](post.Text);
		if(detect != null) return detect;
	}
}

function hideByWipe(post) {
	if(post.Vis == 0 || post.Vis == 1) return;
	var note = detectWipe(post);
	if(note != null) hidePost(post, note);
	else applyPostVisib(post, 1);
}

function detectWipe_sameLines(txt) {
	if(Cfg[1] == 0) return;
	var lines = txt.replace(/> /g, '').split('\n');
	var len = lines.length;
	if(len < 5) return;
	var arr = [], n = 0;
	for(var i = 0; i < len; i++)
		if(lines[i].length > 0) {n++; incc(arr, lines[i])}
	for(var x in arr)
		if(arr[x] > n/4 && arr[x] >= 5)
			return 'same lines: "' + x.substr(0, 20) + '" x' + parseInt(arr[x] + 1);
}

function detectWipe_sameWords(txt) {
	if(Cfg[2] == 0) return;
	txt = txt.replace(/[\s\.\?\!,>]+/g, ' ').toUpperCase();
	var words = txt.split(' ');
	var len = words.length;
	if(len <= 13) return;
	var arr = [], n = 0;
	for(var i = 0; i < len; i++)
		if(words[i].length > 1) {n++; incc(arr, words[i])}
	if(n <= 10) return;
	var keys = 0, pop = '', mpop = -1;
	for(var x in arr) {
		keys++;
		if(arr[x] > mpop) {mpop = arr[x]; pop = x}
		if(n > 25 && arr[x] > n/3.5)
			return 'same words: "' + x.substr(0, 20) + '" x' + arr[x];
	}
	pop = pop.substr(0, 20);
	if((n > 80 && keys <= 20) || n/keys > 7)
		return 'same words: "' + pop + '" x' + mpop;
}

function detectWipe_specSymbols(txt) {
	if(Cfg[3] == 0) return;
	txt = txt.replace(/\s+/g, '');
	var all = txt; 
	txt = txt.replace(/[0-9a-zа-я\.\?!,]/ig, '');
	var proc = txt.length/all.length;
	if(all.length > 30 && proc > 0.4)
		return 'specsymbols: ' + parseInt(proc*100) + '%';
}

function detectWipe_longColumn(txt) {
	if(Cfg[4] == 0) return;
	var n = 0;
	var rows = txt.split('\n');
	var len = rows.length;
	for(var i = 0; i < len; i++) {
		if(rows[i].length < 9) n++;
		else return;
	}
	if(len > 45) return 'long text x' + len;
	if(n > 5) return 'columns x' + n;
}

function detectWipe_longWords(txt) {
	if(Cfg[5] == 0) return;
	txt = txt.replace(/(https*:\/\/.*?)(\s|$)/g, '').replace(/[\s\.\?!,>:;-]+/g, ' ');
	var words = txt.split(' ');
	var n = 0, all = '', lng = '';
	for(var i = 0, len = words.length; i < len; i++)
		if(words[i].length > 1) {
			n++;
			all += words[i];
			lng = words[i].length > lng.length ? words[i] : lng;
		}
	if((n == 1 && lng.length > 70) || (n > 1 && all.length/n > 12))
		return 'long words: "' + lng.substr(0, 20) + '.."';
}

function detectWipe_numbers(txt) {
	if(Cfg[6] == 0) return;
	txt = txt.replace(/\s+/g, ' ').replace(/(>>\d+|https*:\/\/.*?)(\s|$)/g, '');
	var len = txt.length;
	var proc = (len - txt.replace(/[0-9]/g, '').length)/len;
	if(len > 30 && proc > 0.4) return 'numbers: ' + parseInt(proc*100) + '%';
}

function detectWipe_caseWords(txt) {
	if(Cfg[7] == 0) return;
	txt = txt.replace(/[\s+\.\?!,-]+/g, ' ');
	var words = txt.split(' ');
	var len = words.length;
	if(len <= 4) return;
	var n = 0, all = 0, caps = 0;
	for(var i = 0; i < len; i++) {
		if(words[i].length < 5) continue;
		all++;
		var word = words[i];
		var up = word.toUpperCase();
		var lw = word.toLowerCase();
		var upc = 0, lwc = 0;
		var cap = word.match(/[a-zа-я]/ig);
		if(cap) {
			cap = cap.toString().trim();
			if(cap != '' && cap.toUpperCase() == cap) caps++;
		}
		for(var j = 0; j < word.length; j++) {
			if(up.charAt(j) == lw.charAt(j)) continue;
			if(word.charAt(j) == up.charAt(j)) upc++;
			else if(word.charAt(j) == lw.charAt(j)) lwc++;
		}
		var min = upc < lwc ? upc : lwc;
		if(min >= 2 && lwc + upc >= 5) n++;
	}
	if(n/all >= 0.3 && all > 8) return 'cAsE words: ' + parseInt(n/len*100) + '%';
	if(caps/all >= 0.3 && all > 5) return 'CAPSLOCK';
}


/*=============================================================================
								INITIALIZATION
=============================================================================*/

function replyForm(x) {
	var f = $x('descendant-or-self::form', x);
	if(!x || !f) return;
	this.on = true;
	this.area = !ch.dc ? x : $up(x);
	this.form = f;
	this.capinp = $x(!ch._4ch
		? './/input[@name="' + (!ch._410 ? 'c' : 'f') + 'aptcha"]'
		: './/input[@id="recaptcha_response_field"]', f);
	this.txta = $x('.//textarea' + (ch.krau ? '[@name="internal_t"]' : ''), f);
	this.subm = $x('.//input[@type="submit"]', f);
	this.file = $x('.//input[@type="file"]', f);
	this.passw = $x('.//input[@type="password"]', f);
	this.rules = $x('.//*[@class="rules"]|.//ul', x);
	this.gothr = $x('.//tr[@id="trgetback"]', f)
		|| $x('ancestor::tr[1]', $x('.//input[@type="radio" or @name="gotothread"]', f));
	var name, mail, subj;
	if(wk && !ch.iich && !ch._2ch && !ch._4ch)
		{name = 'field1'; mail = dm != 'wakachan.org' ? 'field2' : 'dont_bump'; subj = 'field3'}
	if(ks) {name = 'name'; mail = 'em'; subj = 'subject'}
	if(ch._4ch) {name = 'name'; mail = 'email'; subj = 'sub'}
	if(ch.krau) {name = 'internal_n'; mail = 'sage'; subj = 'internal_s'}
	if(ch._2ch) {name = 'akane'; mail = 'nabiki'; subj = 'kasumi'}
	if(ch.iich) {name = 'nya1'; mail = 'nya2'; subj = 'nya3'}
	if(ch.dc) {name = 'name'; mail = 'sage'; subj = 'subject'}
	this.name = $x('.//input[@name="' + name + '"]', f);
	this.mail = $x('.//input[@name="' + mail + '"]', f);
	this.subj = $x('.//input[@name="' + subj + '"]', f);
}

function initBoard() {
	if(window.location == 'about:blank') return false;
	dm = location.hostname.replace(/^www\./, '');
	ch = {
		_4ch: /4chan\.org/.test(dm),
		krau: dm == 'krautchan.net',
		_0ch: dm == '0chan.ru',
		_2ch: dm == '2-ch.ru',
		iich: dm == 'iichan.ru',
		dc: dm == 'dobrochan.ru',
		_410: dm == '410chan.ru'
	};
	ks = Boolean($x('.//script[contains(@src, "kusaba")]'));
	wk = Boolean($x('.//script[contains(@src, "wakaba") or contains(@src, "matsuba")]')) || ch._4ch;
	if(!ks && !wk && !ch.dc && !ch.krau) return false;
	var ua = navigator.userAgent;
	nav = {
		Firefox: /firefox|minefield/i.test(ua),
		Opera: /opera/i.test(ua),
		Chrome: /chrome/i.test(ua)
	};
	var gs = nav.Firefox && GM_setValue != null;
	var ls = typeof localStorage === 'object' && localStorage != null;
	var ss = nav.Opera && scriptStorage != null;
	sav = {
		GM: gs,
		local: ls && !ss && !gs,
		script: ss,
		cookie: !ls && !ss && !nav.Firefox
	};
	if(/^sys\.4chan/.test(dm)) {
		var re = getStored('DESU_4chan_cache');
		if(re && re == 're') {
			setStored('DESU_4chan_cache', doc.title != 'Post successful!'
				? 'Error: ' + $x('.//table//font/b').innerHTML
				: $x('.//meta').content.match(/http:\/\/[^"]+/)[0]);
			window.location = 'about:blank';
		}
	}
	if(/submitcheck/.test(window.name)) return false;
	dForm = $x('.//form[@id="delform" or @name="delform" or contains(@action, "delete")]');
	if(!dForm || $id('DESU_panel')) return false;
	ks0 = ch._0ch || dm == 'xchan.ru';
	brd = location.pathname.substr(1).split('/')[0];
	if(/\.html$|^res$/.test(brd)) brd = '';
	if(dm == 'chuck.dfwk.ru' && brd == '') brd = 'df';
	res = ch.krau ? 'thread-' : 'res/';
	main = location.pathname.indexOf('/' + res) < 0;
	replyClass = ch.krau ? 'postreply' : 'reply';
	refSpan = './/span[' + (
		ch.krau ? '@class="postnumber"]' : (
		ch._4ch ? 'starts-with(@id,"no")]' : '@class="reflink"]'));
	postMsg = !ch.dc ? './/blockquote' : './/div[@class="postbody"]';
	pr = new replyForm($x('.//div[@class="postarea"]') || $id('postform'));
	hasSage = !ch.iich || !pr.mail;
	return true;
}

function initDelform() {
	if(ch._2ch) $del($x('.//div[@align="right"][last()]/script'));
	$disp(dForm);
	try {
		var html;
		var thrdivs = $X('.//div[starts-with(@id, "thread")]', dForm);
		if(thrdivs.snapshotLength == 0) {
			html = dForm.innerHTML;
			var thrds = html.split(/<br clear="left"[<\/p>\s]+<hr>/i);
			var i = thrds.length - 1;
			while(i--) {
				var posts = thrds[i].split(/<table[^>]*>/i);
				var j = posts.length;
				while(j-- > 1) posts[j] = '<table id="post_' + getpNum(posts[j]) + '">' + posts[j];
				var tNum = getpNum(posts[0]);
				posts[0] = '<div id="oppost_' + tNum + '">' + posts[0] + '</div>';
				thrds[i] = '<div class="thread" id="thread_' + tNum + '">' + posts.join('') + '</div>';
			}
			dForm = $html(dForm, htmlReplace(fix4chan(thrds.join('<br clear="left"><hr>'))));
		} else {
			if(wk || ks) $each(thrdivs, function(thr) {
				$attr(thr, {'id': 'thread_' + $prev($x('.//label', thr)).name, 'class': 'thread'});
			});
			if(!ks0 && !ch.dc) {
				$each($X('.//td[@class="' + replyClass + '"]', dForm), function(el) {
					$attr($up(el, 3), {'id': 'post_' + el.id.match(/\d+/)});
				});
				$each($X('.//div[@class="thread"]', dForm), function(thr) {
					var op = $new('div', {'id': 'oppost_' + thr.id.match(/\d+/)});
					var nodes = thr.childNodes;
					var arr = [], x = 0;
					for(var el, j = 1; el = nodes[j++];) {
						if(el.tagName == 'TABLE' || /^replies/.test(el.id)) break;
						arr[x++] = el;
					}
					for(var el, j = 0; el = arr[j++];)
						op.appendChild(el);
					$before($1(thr), [op]);
				});
			}
			if(ks0) $each($X('.//div[@class="postnode"]', dForm), function(post) {
				var el = $x('.//td[@class="reply"]', post);
				post.id = el ? 'post_' + el.id.match(/\d+/) : 'oppost_' + $up(post).id.match(/\d+/);
			});
			html = dForm.innerHTML;
			var htm = htmlReplace(html);
			if(html != htm || ch.krau) dForm = $html(dForm, fix4chan(htm));
		}
	} catch(e) {$disp(dForm); return false}
	if(!nav.Chrome) $disp(dForm);
	$each($X('.//' + (!ks0 ? 'table' : 'div') + '[starts-with(@id,"post")]', dForm), function(post, i) {
		Posts[i] = post;
		post.isOp = false;
		post.Count = i + 2;
	});
	$each($X('.//div[starts-with(@' + (ch.dc ? 'class' : 'id') + ',"oppost")]', dForm), function(post, i) {
		oPosts[i] = post;
		post.isOp = true;
		post.Count = 1;
	});
	forAll(function(post) {
		post.Msg = $x(postMsg, post);
		post.Num = post.id.match(/\d+/);
		post.Text = getText(post.Msg).trim();
		post.Img = getImages(post);
		postByNum[post.Num] = post;
	});
	return true;
}


/*=============================================================================
									MAIN
=============================================================================*/

function doScript() {
	var initTime = (new Date()).getTime();
	oldTime = initTime; timeLog = '';
	if(!initBoard()) return;		Log('initBoard');
	initCfg();						Log('initCfg');
	if(!initDelform()) return;		Log('initDelform');
	readPostsVisib();				Log('readPostsVisib');
	readThreadsVisib();				Log('readThreadsVisib');
	addControls();					Log('addControls');
	doChanges();					Log('doChanges');
	forAll(addPostButtons);			Log('addPostButtons');
	doRefPreview();					Log('doRefPreview');
	doRefMap();						Log('doRefMap');
	forAll(doPostFilters);			Log('doPostFilters');
	storeHiddenPosts();				Log('storeHiddenPosts');
	initNewPosts();					Log('initNewPosts');
	if(Cfg[15] == 1) {
		forPosts(mergeHidden);		Log('mergeHidden')}
	if(Cfg[21] != 0) {
		allImgExpander();
		forAll(expandHandleImg);	Log('expandImg')}
	if(Cfg[26] == 1 && main && !ch.dc) {
		forAll(expandPost);			Log('expandPost')}
	addMP3();						Log('addMP3');
	addYouTube();					Log('addYouTube');
	addImages();					Log('addImages');
	scriptStyles();					Log('scriptStyles');
	var endTime = oldTime - initTime;
	timeLog += '\n\nВсего: ' + endTime + 'мс';
	$id('process_time').textContent = 'Время обработки: ' + endTime + 'мс';
}

if(window.opera) $event(doc, {'DOMContentLoaded': doScript});
else doScript();
})(window.opera ? window.opera.scriptStorage : null);