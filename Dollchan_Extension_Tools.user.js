// Dollchan Extension Tools
// by Sthephan Shinkufag @ FreeDollChan
// copyright (C) 2084, Bender Bending Rodríguez
// ==UserScript==
// @name			Dollchan Extension Tools
// @version		2010-05-11
// @description	Doing some extended profit for russian AIB
// @namespace		http://freedollchan.org/scripts
// @include		*0chan.ru*
// @include		*2-ch.ru*
// @include		*iichan.ru*
// @include		*dobrochan.ru*
// @include		*wakachan.org*
// @include		*nowere.net*
// @include		*uchan.org.ua*
// ==/UserScript==

(function() {
var defaultCfg = [
	1,		// 0		anti-wipe detectors
	0,		// 1		hide posts with sage
	0,		// 2		hide posts with theme
	0,		// 3		hide posts without text
	0,		// 4		hide posts without img
	0,		// 5		-
	0,		// 6		-
	1,		// 7		enable text format buttons
	0,		// 8		hide posts by text size
	500,	// 9		text size in symbols
	0,		// 10	hide by regexp
	1,		// 11	additional hider menu
	0,		// 12	process hidden posts (0=no, 1=merge, 2=full hide)
	1,		// 13	apply filter to threads
	1,		// 14	fast preview of hidden posts
	1,		// 15	>>links map
	1,		// 16	'quick reply' buttons
	1,		// 17	'add to favorities' buttons	
	0,		// 18	show buttons as text
	1,		// 19	show SAGE in posts
	2,		// 20	multi captcha
	1,		// 21	don't show board rules
	1,		// 22	don't show gotothread
	1,		// 23	expand images by click
	1,		// 24	expand shorted posts
	1,		// 25	hide posts overflow scrollers
	1,		// 26	>>links preview
	1,		// 27	YouTube player
	1,		// 28	mp3 player
	0,		// 29	move postform down
	530,	// 30	postform textarea width
	140,	// 31	postform textarea height
	0,		// 32	reply with SAGE
	0,		// 33	apply user password
	'',		// 34		user password value
	0,		// 35	apply user name
	'',		// 36		user name value
	2,		// 37	upload new posts (0=no, 1=by click, 2=auto)
	1,		// 38	reply without reload (verify on submit)
	1,		// 39	open spoilers
	1,		// 40	don't show password field
	1		// 41	convert email to sage field
],

Cfg = [],
Visib = [],
Posts = [],
oPosts = [],
Expires = [],
postByNum = [],
ajaxPosts = {},
ajaxThrds = [],
doc = document,
HIDE = 1,
UNHIDE = 0,
STORAGE_LIFE = 259200000; // 3 days

/*=============================================================================
								UTILS
=============================================================================*/

function $X(path, rootNode) {
	return doc.evaluate(path, rootNode || doc, null, 6, null);
}
function $x(path, rootNode) {
	return doc.evaluate(path, rootNode || doc, null, 8, null).singleNodeValue;
}
function $id(id) {
	return doc.getElementById(id);
}
function $n(name) {
	return doc.getElementsByName(name)[0];
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
}
function $event(el, events) {
	for(var key in events)
		el.addEventListener(key, events[key], false);
}
function $revent(el, events) {
	for(var key in events)
		el.removeEventListener(key, events[key], false);
}
function $append(el, childs) {
	var child;
	for(var i = 0, len = childs.length; i < len; i++) {
		child = childs[i];
		if(child) el.appendChild(child);
	}
}
function $before(el, inserts) {
	for(var i = 0, len = inserts.length; i < len; i++)
		if(inserts[i]) el.parentNode.insertBefore(inserts[i], el);
}
function $after(el, inserts) {
	var i = inserts.length;
	while(i--)
		if(inserts[i]) el.parentNode.insertBefore(inserts[i], el.nextSibling);
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
function $if(cond, el) {
	if(cond) return el;
}
function $del(el) {
	if(el) el.parentNode.removeChild(el);
}
function delNexts(el) {
	while(el.nextSibling) $del(el.nextSibling);
}
function delChilds(el) {
	while(el.hasChildNodes()) el.removeChild(el.firstChild);
}
function toggleDisp(el) {
	el.style.display = (el.style.display != 'none') ? 'none' : '';
}
function toggleChk(box) {
	box.checked = !box.checked
}
function getOffset(a, b) {
	var c = 0;
	while (a) {c += a[b]; a = a.offsetParent}
	return c;
}
function rand10() {
	return Math.floor(Math.random()*1e10).toString(10);
}
function incc(arr, w) {
	if(arr[w]) arr[w] += 1;
	else arr[w] = 1;
}
function InsertInto(x, text) {
	var start = x.selectionStart;
	var end = x.selectionEnd;
	x.value = x.value.substr(0, start) + text + x.value.substr(end);
	x.setSelectionRange(start + text.length, start + text.length);
	x.focus();
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


/*=============================================================================
							STORAGE / CONFIG
=============================================================================*/

function setCookie(name, value, life) {
	if(!name) return;
	var life = (life == 'delete') ? -10 : STORAGE_LIFE;
	var date = (new Date((new Date()).getTime() + life)).toGMTString();
	doc.cookie = escape(name) + '=' + escape(value) + ';expires=' + date + ';path=/';
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
	var max = ch._0ch ? 10 : 15;
	var data = getCookie(ID('Cookies'));
	var arr = data ? data.split('|') : [];
	arr[arr.length] = name;
	if(arr.length > max) {
		setCookie(arr[0], '', 'delete');
		arr.splice(0, 1);
	}
	setCookie(ID('Cookies'), arr.join('|'));
}

function getStored(name) {
	if(sav.GM) return GM_getValue(name);
	if(sav.local) return localStorage.getItem(name);
	return getCookie(name);
}

function setStored(name, value) {
	if(sav.GM) {GM_setValue(name, value); return}
	if(sav.local) {localStorage.setItem(name, value); return}
	setCookie(name, value);
}

function ID(name, pNum) {
	var c = !sav.cookie ? '_' + domain : '';
	if(name == 'Posts' || name == 'Threads')
		return 'DESU_' + name + c + '_' + board + (!pNum ? '' : '_' + pNum);
	if(name == 'Config' || name == 'Cookies' || name == 'RegExpr')
		return 'DESU_' + name + c;
}

function setDefaultCfg() {
	Cfg = defaultCfg;
	setStored(ID('Config'), defaultCfg.join('|'));
}

function saveCfg(num, val) {
	Cfg[num] = val;
	setStored(ID('Config'), Cfg.join('|'));
}

function toggleCfg(num) {
	var cnf = Cfg[num] == 0 ? 1 : 0;
	saveCfg(num, cnf);
}

function initCfg() {
	var data = getStored(ID('Config'));
	if(!data) setDefaultCfg();
	else Cfg = data.split('|');
	if(!getStored(ID('RegExpr')))
		setStored(ID('RegExpr'), '');
}

function getVisib(pNum) {
	var key = !sav.cookie ? board + pNum : postByNum[pNum].Count;
	if(key in Visib) return Visib[key];
	return null;
}

function applyPostVisib(post, vis) {
	var pNum = post.Num;
	if(!sav.cookie) {
		Visib[board + pNum] = vis;
		Expires[board + pNum] = (new Date()).getTime() + STORAGE_LIFE;
	} else Visib[post.Count] = vis;
	post.Vis = vis;
	if(Cfg[12] == 2) post.style.display = (vis == HIDE) ? 'none' : '';
}

function readPostsVisib() {
	if(!sav.cookie) {
		var data = getStored(ID('Posts'));
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
		var data = getStored(ID('Posts', oPosts[0].Num));
		if(!data) return;
		for(var i = 0, len = data.length; i < len; i++)
			Visib[i + 1] = data[i];
	}
	forAll(function(post) {post.Vis = getVisib(post.Num)});
}

function storePostsVisib() {
	if(!sav.cookie) {
		var arr = [];
		for(var key in Visib)
			arr[arr.length] = key + '-' + Visib[key] + '-' + Expires[key];
		setStored(ID('Posts'), arr.join('-'));
	} else {
		if(!main) {
			var name = ID('Posts', oPosts[0].Num);
			if(!getStored(name)) turnCookies(name);
			setStored(name, Visib.join(''));
		}
	}
}

function storeThreadVisib(post, vis) {
	if(post.Visibl == vis) return;
	post.Visibl = vis;
	var key = board + post.Num;
	var data = getStored(ID('Threads'));
	var arr = data ? data.split('-') : [];
	if(vis == HIDE) {
		if(sav.cookie && arr.length > 80) arr.splice(0, 1);
		arr[arr.length] = key;
	} else {
		var i = arr.length;
		while(i--) if(arr[i] == key) arr.splice(i, 1);
	}
	setStored(ID('Threads'), arr.join('-'));
}

function readThreadsVisib() {
	var data = getStored(ID('Threads'));
	if(!data) return;
	var arr = data.split('-');
	var ar = [];
	var i = arr.length;
	while(i--) ar[arr[i]] = 1;
	forOP(function(post) {
		if(board + post.Num in ar) {
			hideThread(post);
			post.Visibl = HIDE;
		}
	});
}

function storeFavorities(post) {
	var txt = getTitle(post).replace(/\|/g, '');
	txt = !sav.cookie ? txt.substring(0, 70) : txt.substring(0, 25);
	var pNum = post.Num;
	var data = getStored('DESU_Favorities');
	var arr = data ? data.split('|') : [];
	if(sav.cookie && arr.length/4 > 25) return;
	for(var i = 0; i < arr.length/4; i++)
		if(arr[i*4 + 1] == board && arr[i*4 + 2] == pNum) return;
	arr[arr.length] = domain + '|' + board + (arch ? '/arch|' : '|') + pNum + '|' + txt;
	setStored('DESU_Favorities', arr.join('|'));
}

function removeFavorities(node) {
	var key = node.textContent.replace('arch/', '').replace('res/', '').split('/');
	var arr = getStored('DESU_Favorities').split('|');
	for(var i = 0; i < arr.length/4; i++)
		if(arr[i*4] == key[0] && arr[i*4 + 1].split('/')[0] == key[1] && arr[i*4 + 2] == key[2])
			arr.splice(i*4, 4);
	$del($up(node));
	if(arr.length == 0) $id('favorities_div').appendChild($txt(' [Избранные треды отсутствуют]'));
	setStored('DESU_Favorities', arr.join('|'));
}


/*=============================================================================
						CONTROLS / COMMON CHANGES
=============================================================================*/

function addControls() {
	var postarea = $x('.//div[@class="postarea" or @align="center"]') || delform;
	var txt = '<input type="button" value="';
	var tools = $new('div', {'html': txt+'Настройки"> '+txt+'Скрытые посты"> '+txt+'Избранное"> '+txt+'Обновить" id="refresh_btn"> ' + ((main && postform) ? txt+'Создать тред">' : '') + '<div class="reply" style="font-size:small; width:370px; border:1px solid grey; margin:8px; display:none; overflow:hidden"><div style="width:100%; text-align:center; font-weight:bold; font-family:sans-serif">Dollchan Extension Tools</div><table style="padding:5px; overflow:hidden"></table></div><div id="hiddenposts_div"></div><div id="favorities_div"></div>'});
	var table = $x('.//table', tools);
	var btn = $X('.//input', tools);
	$event(btn.snapshotItem(0), {'click': function() {toggleDisp($up(table))}});
	$event(btn.snapshotItem(1), {'click': hiddenPostsPreview});
	$event(btn.snapshotItem(2), {'click': favorThrdsPreview});
	$event(btn.snapshotItem(3), {
		'click': function(e) {window.location.reload(); e.stopPropagation(); e.preventDefault()}});
	if(main) eventSelMenu(btn.snapshotItem(3), selectAjaxPages);
	if(main && postform) $event(btn.snapshotItem(4), {'click': function() {
		toggleDisp($x('.//div[@class="postarea"]', $up(delform)));
		toggleDisp($prev(delform));
	}});
	$before(postarea, [tools, $new('div', {'class': 'logo'}), $new('hr')]);
	
	var chkBox = function(num, fn, id) {
		if(!fn) fn = toggleCfg;
		var box = $new('input', {'type': 'checkbox'}, {'click': function() {fn(num)}});
		box.checked = Cfg[num] == 1;
		if(id) box.id = id;
		return box;
	},
	trBox = function(num, txt, fn, id) {
		return $New('tr', [chkBox(num, fn, id), $txt(' ' + txt)]);
	},
	optSel = function(id, arr, fn) {
		for(var i = 0; i < arr.length; i++)
			arr[i] = '<option value="' + i + '">' + arr[i] + '</option>';
		return $new('select', {'id': id, 'html': arr.join('')}, {'change': fn});
	};
	$append(table, [$New('tbody', [
		trBox(0, 'Анти-вайп детекторы'),
		$if(!ch.iich, trBox(1, 'Скрывать sage посты', toggleSage, 'sage_hider')),
		trBox(2, 'Скрывать посты с полем "Тема"', toggleTitle),
		trBox(3, 'Скрывать посты без текста', toggleNotext, 'notext_hider'),
		trBox(4, 'Скрывать посты без изображений', toggleNoimage, 'noimage_hider'),
		$New('tr', [
			chkBox(8, toggleMaxtext, 'maxtext_hider'),
			$txt(' Скрывать с текстом более '),
			$new('input', {
				'type': 'text',
				'id': 'maxtext_field',
				'value': Cfg[9],
				'size': 4}, {
				'keypress': function(e) {if(e.which == 13) {e.preventDefault(); e.stopPropagation()}}}),
			$txt(' символов')
		]),
		$New('tr', [
			chkBox(10, toggleRegexp, 'regexp_hider'),
			$txt(' Скрытие по выражению '),
			$new('span', {
				'html': '[<a>?</a>]',
				'style': 'cursor:pointer'}, {
				'click': function() {alert('Поиск в тексте/теме поста:\nвыраж.1\nвыраж.2\n...\n\nРегулярные выражения: $exp выраж.\n$exp /[bб].[tт]+[hх].[rр][tт]/i\n$exp /кукл[оа]([её]б|бляд|быдл)/i\n\nКартинки: $img [<,>,=][вес в кб][@ширxвыс]\n$img <35@640x480\n$img >@640x480\n$img =35\n\nИмя/трипкод: $name [имя][!трипкод][!!трипкод]\n$name Sthephan!ihLBsDA91M\n$name !!PCb++jGu\nЛюбой трипкод: $alltrip')}}),
			$new('input', {
				'type': 'button',
				'value': 'Применить',
				'style': 'float:right'}, {
				'click': applyRegExp}),
			$new('br'),
			$new('textarea', {
				'id': 'regexp_field',
				'value': getStored(ID('RegExpr')),
				'rows': 5,
				'cols': nav.Opera ? 47 : 41})
		]),
		$New('tr', [
			optSel('prochidden_sel', ['Не изменять', 'Объединять', 'Удалять'],
				function() {processHidden(this.selectedIndex, Cfg[12])}),
			$txt(' скрытые посты')
		]),
		trBox(14, 'Быстрый просмотр скрытых постов'),
		trBox(11, 'Дополнительное меню по кнопке скрытия'),
		trBox(13, 'Применять фильтры к тредам'),
		$new('hr'),
		$New('tr', [
			optSel('upload_sel', ['Отключена', 'По клику', 'Авто'],
				function() {saveCfg(37, this.selectedIndex)}),
			$txt(' подгрузка новых постов в треде*')
		]),
		trBox(38, 'Постить без перезагрузки (проверять ответ)*'),
		trBox(15, 'Карта >>ссылок на посты*'),
		trBox(26, 'Просмотр постов по >>ссылкам*'),
		$if(postform, trBox(16, 'Кнопки быстрого ответа*')),
		trBox(17, 'Кнопки добавления в избранное*'),
		$if(!ch.iich && !ch.dc,
			trBox(19, 'Индикатор сажи в постах*')),
		trBox(18, 'Отображать кнопки в виде текста*'),
		trBox(7, 'Кнопки форматирования текста', function() {
			toggleCfg(7);
			$each($X('.//span[@id="txt_btns"]'), function(div) {toggleDisp(div)});
		}),
		$if(wakaba, trBox(23, 'Раскрывать изображения по клику*')),
		$if(wakaba, trBox(24, 'Раскрывать сокращенные посты*')),
		$if(ch._2ch, trBox(25, 'Убирать прокрутку в постах*')),
		trBox(27, 'Плейер к YouTube ссылкам*'),
		trBox(28, 'Плейер к mp3 ссылкам*'),
		trBox(39, 'Раскрывать спойлеры*'),
		$if(Rmail, trBox(41, 'Sage вместо поля E-mail*')),
		$if(postform, trBox(29, 'Форма ответа внизу*')),
		$if(Rname, $New('tr', [
			$new('input', {
				'type': 'text',
				'id': 'usrname_field',
				'value': Cfg[36],
				'size': 20}),
			chkBox(35, toggleUserName, 'usrname_box'),
			$txt(' Постоянное имя')
		])),
		$if(Rpass, $New('tr', [
			$new('input', {
				'type': 'text',
				'id': 'usrpass_field',
				'value': Cfg[34],
				'size': 20}),
			chkBox(33, toggleUserPassw, 'usrpass_box'),
			$txt(' Постоянный пароль')
		])),
		$New('tr', [
			$txt('Не отображать: '),
			$if(Rrules, chkBox(21, function() {toggleCfg(21); toggleDisp(Rrules)})),
			$if(Rrules, $txt(' правила ')),
			$if(Rgoto_tr, chkBox(22, function() {toggleCfg(22); toggleDisp(Rgoto_tr)})),
			$if(Rgoto_tr, $txt(' поле goto ')),
			$if(Rpass, chkBox(40, function() {toggleCfg(40); toggleDisp($up(Rpass, 2))})),
			$if(Rpass, $txt(' пароль '))
		]),
		$if(ch._2ch, $New('tr', [
			$txt(' Количество отображаемых капч* '),
			optSel('capnum_sel', [0, 1, 2], function() {saveCfg(20, this.selectedIndex)})
		])),
		$new('hr'),
		$New('tr', [
			$new('span', {
				'id': 'process_time',
				'title': 'v.2010-05-11, storage: ' + (sav.GM ? 'greasemonkey' : (sav.local ? 'localstorage' : 'cookies')),
				'style': 'font-style:italic; cursor:pointer'}, {
				'click': function() {alert(timeLog)}}),
			$new('input', {
				'type': 'button',
				'value': 'Сброс настроек',
				'style': 'float:right'}, {
				'click': function() {setDefaultCfg(); window.location.reload()}})
		])
	])]);
	$id('upload_sel').selectedIndex = Cfg[37];
	$id('prochidden_sel').selectedIndex = Cfg[12];
	if(ch._2ch) $id('capnum_sel').selectedIndex = Cfg[20];
}

function hiddenPostsPreview() {
	var div = $id('hiddenposts_div');
	if(div.hasChildNodes()) {delChilds(div); return}
	var table = $new('table', {'align': 'left'});
	var clones = [];
	div.appendChild(table);
	for(var post, i = 0; post = Posts[i++];) {
		if(post.Vis != HIDE) continue;
		var clone = post.cloneNode(true);
		clones[clones.length] = clone;
		clone.pst = post;
		clone.vis = HIDE;
		$attr(clone, {'style': 'display:block', 'align': 'left'});
		var btn = $x('.//span[@id="phide_' + post.Num + '"]', clone);
		btn.removeAttribute('id');
		$event(btn, {
			'click': function(node) {return function() {
				node.vis = (node.vis == HIDE) ? UNHIDE : HIDE;
				modPostDisp(node, node.vis);
			}}(clone)});
		table.insertRow(-1).appendChild(clone);
	};
	if(!table.hasChildNodes()) {div.appendChild($txt(' [Скрытые посты отсутствуют]')); return}
	$append(table.insertRow(-1), [
		$new('input', {
			'type': 'button',
			'value': 'Раскрыть все'}, {
			'click': function() {
				if(/все/.test(this.value)) {
					this.value = 'Вернуть назад';
					for(var clone, i = 0; clone = clones[i++];)
						setPostVisib(clone.pst, UNHIDE);
				} else {
					this.value = 'Раскрыть все';
					for(var clone, i = 0; clone = clones[i++];)
						setPostVisib(clone.pst, clone.vis);
				}}}),
		$new('input', {
			'type': 'button',
			'value': 'OK'}, {
			'click': function() {
				for(var clone, i = 0; clone = clones[i++];)
					if(clone.vis != HIDE) setPostVisib(clone.pst, UNHIDE);
				storePostsVisib();
				delChilds(div)}})
	]);
}

function favorThrdsPreview() {
	var div = $id('favorities_div');
	if(div.hasChildNodes()) {delChilds(div); return}
	var data = getStored('DESU_Favorities');
	if(!data) {div.appendChild($txt(' [Избранные треды отсутствуют]')); return}
	var arr = data.split('|');
	var table = $new('table', {'align': 'left'});
	div.appendChild(table);
	for(var i = 0; i < arr.length/4; i++) {
		var url = arr[i*4] + '/' + arr[i*4 + 1] + '/res/' + arr[i*4 + 2];
		var title = arr[i*4 + 3];
		if((!sav.cookie && title.length >= 70) || (sav.cookie && title.length >= 25)) title += '..';
		$append(table, [$new('tr', {'html': parseInt(i + 1) + '. ' + '<span class="hide_icn" id="fav_' + i + '" style="vertical-align:middle"></span><a href="http://' + url + '.html">' + url + '</a> - ' + title})]);
		$event($id('fav_' + i), {'click': function() {removeFavorities($next(this))}});
	}
}

/*-----------------------------Dropdown select menus-------------------------*/

function removeSelMenu(x) {
	if(!$x('ancestor-or-self::*[@id="sel_menu"]', x)) $del($id('sel_menu'));
}

function addSelMenu(id, dx, dy, arr) {
	$before(delform, [$new('div', {
		'class': 'reply',
		'id': 'sel_menu',
		'style': 'position:absolute; left:' + (getOffset($id(id), 'offsetLeft') + dx).toString() + 'px; top:' + (getOffset($id(id), 'offsetTop') + dy).toString() + 'px; z-index:250; cursor:pointer; width:auto',
		'html': '<a>' + arr.join('</a><br><a>') + '</a>'}, {
		'mouseout': function(e) {removeSelMenu(e.relatedTarget)}})]);
	return $X('.//a', $id('sel_menu'));
}

function eventSelMenu(el, fn) {
	$event(el, {'mouseover': fn, 'mouseout': function(e) {removeSelMenu(e.relatedTarget)}});
}

function selectPostHider(post) {
	if(Cfg[11] == 0 || (Cfg[13] == 0 && post.isOp)) return;
	var a = addSelMenu('phide_' + post.Num, 0, 14, ['Скрывать выделенное', 'Скрыть схожий текст', 'Скрыть схожие изобр.']);
	$event(a.snapshotItem(0), {
			'mouseover': function() {quotetxt = txtSelection().trim()},
			'click': function() {if(quotetxt != '') {$id('regexp_field').value += '\n' + quotetxt; applyRegExp()}}});
	$event(a.snapshotItem(1), {'click': function() {hideBySameText(post)}});
	$event(a.snapshotItem(2), {'click': function() {hideBySameImage(post)}});
}

function selectExpandThread(post) {
	var p = ' постов';
	$each(addSelMenu('expthrd_' + post.Num, 0, 14, [5+p, 15+p, 30+p, 50+p, 100+p]),
		function(a) {$event(a, {'click': function() {ajaxExpandThread(post, parseInt(this.textContent))}})});
}

function selectAjaxPages() {
	var p = ' страниц';
	$each(addSelMenu('refresh_btn', 2, 21, [1+p+'а', 2+p+'ы', 3+p+'ы', 4+p+'ы', 5+p]),
		function(a, i) {$event(a, {'click': function() {ajaxPages(i + 1)}})});
}

/*-------------------------------Changes in postform-------------------------*/

function capRefresh(img) {
	img.src = img.src.replace(/dummy=\d*/, 'dummy=' + rand10());
}

function capRefresh_2ch(img) {
	$each($X('.//img', $up(img)), function(cap) {capRefresh(cap)});
}

function getCaptcha(isMain, tNum) {
	if(!isMain && !tNum) tNum = oPosts[0].Num;
	return $new('img', {
		'id': 'imgcaptcha',
		'style': 'display:block',
		'alt': 'загрузка..',
		'src': (!isMain
			? '/' + board + '/captcha.pl?key=res' + tNum + '&amp;dummy=' + rand10()
			: '/' + board + '/captcha.pl?key=mainpage&amp;dummy=' + rand10())}, {
		'click': function() {capRefresh_2ch(this)}});
}

function forceCaptcha(e) {
	if(e.which == 0 || ch.dc) return;
	var code = e.charCode || e.keyCode;
	var ru = 'йцукенгшщзхъфывапролджэячсмитьбюё';
	var en = 'qwertyuiop[]asdfghjkl;\'zxcvbnm,.`';
	var chr = String.fromCharCode(code).toLowerCase();
	var i = en.length;
	if(wakaba) {
		if(code < 0x0410 || code > 0x04FF) return;
		while(i--) if(chr == ru[i]) chr = en[i];
	}
	if(ch._0ch) {
		if(code < 0x0021 || code > 0x007A) return;
		while(i--) if(chr == en[i]) chr = ru[i];
	}
	e.preventDefault();
	InsertInto(e.target, chr);
}

function sageBtnFunc(mail, form) {
	var sage = $x('.//span[@id="sage_btn"]', form);
	if(Cfg[32] == 0) {
		sage.innerHTML = '<i>(без сажи)</i>';
		sage.style.color = '';
		if(mail.type == 'text') mail.value = '';
		else mail.checked = false;
	} else {
		sage.innerHTML = '&nbsp;<span class="sage_icn" style="vertical-align:middle"></span><b>SAGE</b>';
		sage.style.color = 'red';
		if(mail.type == 'text') mail.value = 'sage';
		else mail.checked = true;
	}
}

function sageBtnEvent(e) {
	toggleCfg(32);
	sageBtnFunc(Rmail, postform);
	if(QR) sageBtnFunc($prev($x('.//span[@id="sage_btn"]', QR)), QR);
	e.preventDefault();
	e.stopPropagation();
}

function textareaResizer(form) {
	$del($x('.//img[@id="resizer"]', form));
	var node = $x('.//textarea', form);
	$event(node, {'keypress': function(e) {
		var code = e.charCode || e.keyCode;
		if((code == 33 || code == 34) && e.which == 0) {e.target.blur(); window.focus()}
	}});
	var resmove = function(e) {
		node.style.width = e.pageX - getOffset(node, 'offsetLeft') + 'px';
		node.style.height = e.pageY - getOffset(node, 'offsetTop') + 'px';
	};
	var resstop = function() {
		$revent(doc.body, {'mousemove': resmove, 'mouseup': resstop});
		saveCfg(30, parseInt(node.style.width));
		saveCfg(31, parseInt(node.style.height));
	};
	var x = (!ch._0ch && !ch._410) ? 14 : 19;
	var y = (nav.Opera) ? 9 : (nav.Chrome ? 2 : 6);
	node.style.cssText = 'width:' + Cfg[30] + 'px; height:' + Cfg[31] + 'px';
	$up(node).appendChild($new('img', {
		'id': 'resizer',
		'src': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABlBMVEUAAAAAAAClZ7nPAAAAAWJLR0QAiAUdSAAAAAF0Uk5TAEDm2GYAAAAWSURBVHjaY2BAAYyMDMNagBENYAgAABMoAD3fBUDWAAAAAElFTkSuQmCC',
		'style': 'position:relative;left:-' + x + 'px;top:' + y + 'px;cursor:se-resize'}, {
		'mousedown': function(e) {
			e.preventDefault();
			$event(doc.body, {'mousemove': resmove, 'mouseup': resstop});
		}}));
}

function toggleUserName() {
	toggleCfg(35);
	saveCfg(36, $id('usrname_field').value);
	var val = ($id('usrname_box').checked) ? Cfg[36] : '';
	Rname.value = val;
	if(QR) ($x('.//input[@name="nya1"]', QR) || $x('.//input[@name="akane"]', QR) || $x('.//input[@name="name"]', QR)).value = val;
}

function toggleUserPassw() {
	toggleCfg(33);
	saveCfg(34, $id('usrpass_field').value);
	var val = $id('usrpass_box').checked ? Cfg[34] : rand10().substring(0, 8);
	Rpass.value = val;
	del_passw.value = val;
	if(QR) ($x('.//input[@name="password"]', QR) || $x('.//input[@name="postpassword"]', QR)).value = val;
}

function changePostForm() {
	doc.title = !main
		? board + '/' + getTitle(oPosts[0]).substring(0, 50)
		: doc.title.split(/\s/)[0] + ' - /' + board + '/';
	if(ch.ua) toggleDisp($up($x('.//div[@class="gbBlock"]')));
	if(!postform) return;
	textFormatPanel(postform);
	textareaResizer(postform);
	if(wakaba && !main)
		$before($next($x('.//a[text()="Назад" or text()="Вернуться" or text()="Return"]')), [
			$new('span', {'html': '[<a href="' + window.location + '" target="_blank">В новой вкладке</a>]'})]);
	$each($X('.//input[@type="text"]', postform), function(el) {el.size = 35});
	if(captcha) {
		if(Cfg[20] == 0) toggleDisp($up(captcha, 2));
		$attr(captcha, {'autocomplete': 'off'});
		$event(captcha, {'keypress': forceCaptcha});
	}
	if(Cfg[21] == 1) toggleDisp(Rrules);
	if(Cfg[40] == 1 && Rpass) toggleDisp($up(Rpass, 2));
	if(Cfg[35] == 1 && Rname) setTimeout(function() {Rname.value = Cfg[36]} , 10);
	if(Cfg[22] == 1 && Rgoto_tr) toggleDisp(Rgoto_tr);
	del_passw = $X('.//input[@type="password"]').snapshotItem(1);
	if(del_passw) setTimeout(function() {
		if(Cfg[33] == 1) {
			Rpass.value = Cfg[34];
			del_passw.value = Cfg[34];
		} else del_passw.value = Rpass.value;
	}, 10);
	var hr = $prev(delform);
	var b = $up(delform);
	var postarea = $x('.//div[@class="postarea"]', b);
	if(main) {
		toggleDisp(postarea);
		toggleDisp(hr);
	}
	if(Cfg[29] == 1 && !main)
		$after(delform, [$x('.//div[@class="theader" or @class="replymode"]', b), postarea, hr]);
	if(captcha && wakaba && !ch._410) {
		var td = $x('./ancestor::td', captcha);
		var img = $x('.//img', td);
		if(ch._2ch) {
			var div = $id('captchadiv');
			if(div) {
				captcha.removeAttribute('onfocus');
				$del($prev(captcha));
				$del(div);
			} else $del($id('imgcaptcha'));
			for(var i = 0; i < Cfg[20]; i++)
				td.appendChild(getCaptcha(main));
		} else {
			$event(img, {'click': function() {capRefresh(this)}});
			img.style.display = 'block';
		}
	}
	if(Cfg[41] == 1 && Rmail) {
		toggleDisp(Rmail);
		if(Rname && $up(Rname).className != 'trap' && Rname.type != 'hidden') {
			delNexts(Rname);
			var mail_tr = !ch._0ch ? $up(Rmail, 2) : $up(Rmail, 3);
			$up(Rname).appendChild(Rmail);
			$del(mail_tr);
		}
		delNexts(Rmail);
		$append($up(Rmail), [$txt(' '), $new('span', {'id': 'sage_btn', 'style': 'cursor:pointer'}, {'click': sageBtnEvent})]);
		sageBtnFunc(Rmail, postform);
	}
}

/*----------------------------Text formatting buttons------------------------*/

function insertTags(node, tag1, tag2) {
	var x = $x('.//textarea', $x('ancestor::form', node));
	var start = x.selectionStart, end = x.selectionEnd;
	if(tag1 == '' && tag2 == '')
		for(var i = 0; i < (end - start); i++)
			tag2 += '^H';
	var text = x.value.substring(start, end);
	var before = x.value.substr(0, start);
	var after = x.value.substr(end);
	if(text == '') {
		text = x.value;
		before = after = '';
	}
	x.value = before + tag1 + text + tag2 + after;
}

function tfBtn(title, wk, bb, txt, src) {
	return $new('span', {
		'title': title,
		'style': (Cfg[18] == 0 ? 'padding:0 27px 27px 0; background:url(data:image/gif;base64,' + src + ') no-repeat' : ''),
		'html': (Cfg[18] == 1 ? '<b>|<a>' + txt + '</a>|</b>' : '')}, {
		'click': function() {
			if(!ch._0ch) insertTags(this, wk, wk);
			else insertTags(this, '[' + bb + ']', '[/' + bb + ']')}});
}

function textFormatPanel(form) {
	var pre = 'R0lGODlhFwAWAMQAAP//////AP8A//8AAAD//wD/AAAA/wAAAPb2+Onq7Bc/e053qitemNXZ3Wmdypm92';
	$after($x('.//input[@type="submit"]', form), [$New('span', [
		tfBtn('Жирный', '**', 'b', 'B', pre +'2hoaP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAXABYAAAWTYBQtZGmepjg+bOu+7hIxD2LfeI4/DK3/Op4PSEQIazjIYbmEQII95E3JZD530ZzyajtwbUJHYjzekhPLc8LRE5/NZa+azXCTqdWDet1W46sQc20NhIRbhQ2HhXQOiIleiFSIdAuOioaQhQs9lZF5TI6bDJ2Ff02ODaKkqKyanK2whKqxsJsjKLi4Kgq8vb6/viIhADs='),
		tfBtn('Наклонный', '*', 'i', '<i>i</i>', pre +'2hoaP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAXABYAAAV5YBQtZGmepjg+bOu+7hIxD2LfeI4/DK3/Op4PSEQIa0TI4XcsKpk9ZBHKcCSuWKwym3X0rFztIXz1VskJJQRtBofV7G9jTp8r6/g2nn7fz80Lfmp+cws9gXt9hIYMiHiKfoyOhIuHlJeSl5SGIyienioKoqOkpaQiIQA7'),
		$if(!ch.dc && !ch._410, tfBtn('Подчеркнутый', '__', 'u', '<u>U</u>', pre +'6CgoGhoaP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAXABYAAAWPoCQtZGmepjg+bOu+7iIxD2LfeI4/DK3/Op4PSEQIazjIIbnMHXNKZrCHvEWtzV3Pkeh2IwdvAizuOrZlslctPjO4YvY4XHbD1/Rv3mtv+P1gEH9gf399hWARigeMhX5uC44NYIwQSpILPZGSnI6ZDJudop+hDYynqI1/pKKtrK2dmSMotLQqCri5uru6IiEAOw==')),
		tfBtn('Зачеркнутый', '', 's', 'S', pre +'2hoaE1NTf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAXABYAAAWNoCQtZGmepjg+bOu+7iIxD2LfeI4/DK3/Op4PSEQIazrIYQn5HXXL6KGZe+KUkIQWW+05tOAlWCseO7zjBDbNPjO+aog8Kq/XtW54en5g470NgYKDWIOBeYNLhoqGbguEU4KFhgs9j4lSBxGGgZUMl5BMnJ2Wo6aDnqCno6mrp5UjKLKyKgq2t7i5uCIhADs='),
		tfBtn('Спойлер', '%%', 'spoiler', '%', pre +'2hoaP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAXABYAAAV7YBQtZGmepjg+bOu+7hIxD2LfeI4/DK3/Op4PSEQIa0Xg0XZoOp9Q2xIBqVqvWGnPkUhgv9euY9sFm8Vkr/mLZnDV63Bi7G404lg73WGH+p96PQt2hIWGhguCh4uHiQyDjJENjpCSi5SWjJiZjQwjKKCgKgqkpaanpiIhADs='),
		tfBtn('Код', "`", 'code', 'C', pre +'2hoaP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAXABYAAAWGYBQtZGmepjg+bOu+7hIxD2LfeI4/DK3/Op4PSEQIa0Xg8Qc5OCGQYA+Jazqv0V3Pkeh2rd4ENJxwbMlNsrp8DjvXZDOD6z7Aw3JHY7938v+AeYBNgIUNcguDfnxQgAs9iYpXT46QhlYHjZUMkYaee4+cn6OhnaOFjyMoq6sqCq+wsbKxIiEAOw=='),
		$new('span', {
			'title': 'Цитировать выделенное',
			'style': (Cfg[18] == 0 ? 'padding:0 27px 27px 0; background:url(data:image/gif;base64,' + pre +'2hoaP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAXABYAAAWEYBQtZGmepjg+bOu+7hIxD2LfeI4/DK3/Op4PSEQIa7jDoWg75iAQZdGpg0p/Qkdiy+VaD92to6cNh7/dMaNsPke5anabq4TAyY28ft+oQ/ZxfHt+gmoLgn0HUIgNCz2Hg4p/jI2PfIuUeY4MkJmIm52efKCinwwjKKmpKgqtrq+wryIhADs=) no-repeat' : ''),
			'html': (Cfg[18] == 1 ? '<b>|<a>&gt;</a>|</b>' : '')}, {
			'mouseover': function() {quotetxt = txtSelection()},
			'click': function() {InsertInto($x('.//textarea', form), '>' + quotetxt.replace(/\n/gm, '\n>') + '\n')}})
		], {
		'id': 'txt_btns',
		'html': '&nbsp;',
		'style': 'padding:0 0 2px 0; cursor:pointer; width:195px;' + (Cfg[7] == 0 ? 'display:none' : '')}
	)]);
}

/*-----------------------------Quick Reply under post------------------------*/

function quickReply(post) {
	var tNum = getThread(post).id.match(/\d+/);
	var pNum = post.Num;
	if(!QR) {
		var first = true;
		QR = postform.cloneNode(true);
		$attr(QR, {'class': 'reply'});
		$del($x('.//span[@id="txt_btns"]', QR));
		textareaResizer(QR);
		textFormatPanel(QR);
		$x('.//textarea', QR).value = '';
		var sage = $x('.//span[@id="sage_btn"]', QR);
		if(sage) $event(sage, {'click': sageBtnEvent});
		if(ch.ua || ch._410 || ch._0ch) $del($x('.//small', QR));
		if(captcha && (ch._0ch || ch._410)) {
			captcha.value = ' ';
			var a = $up($x('.//img[@id="captchaimage" or @id="faptchaimage"]', QR));
			$before(a, [$new('img', {
				'src': 'http://' + domain + (ch._0ch ? '/captcha.php?' + Math.random() : '/faptcha.php?board=' + board),
				'style': 'cursor:pointer'}, {
				'click': function(e) {this.src = this.src.replace(/\?[^?]+$|$/, (!ch._410 ? '?' : '?board=' + board + '&') + Math.random())}})]);
			$del(a);
		}
	}
	if($next(post) == QR) {toggleDisp(QR); return}
	$after(post, [QR]);
	QR.style.display = 'block';
	if(main) {
		if(wakaba && !ch._410) {
			if(first) $before(
				$x('.//div[@class="trap" or @class="its_a_tarp"]', QR) ||
				$x('.//input[@name="name" or @name="akane"]', QR),
				[$new('input', {'type': 'hidden', 'id': 'thr_id', 'name': 'parent', 'value': tNum})]);
			else $id('thr_id').value = tNum;
		}
		if(ch.dc) $x('.//input[@name="thread_id"]', QR).value = tNum;
		if(ch._0ch || ch._410) $x('.//input[@name="replythread"]', QR).value = tNum;
	}
	var cap = $x('.//input[@name="captcha"]', QR);
	if(cap) $event(cap, {'keypress': forceCaptcha});
	if(cap && wakaba) {
		if(ch._2ch) {
			$each($X('.//img[@id="imgcaptcha"]', QR), function(img) {$del(img)});
			for(var i = 0; i < Cfg[20]; i++)
				$up(cap).appendChild(getCaptcha(false, tNum));
		} else {
			var img = $x('.//img', $up(cap));
			var key = '?key=res' + tNum + '&amp;dummy=' + rand10();
			$event(img, {'click': function(e) {capRefresh(this)}});
			img.src = (ch.iich ? '/cgi-bin/captcha.pl/' + board + '/' : '/' + board + '/captcha.pl') + key;
		}
	}
	var ms = Rmess.value.trim();
	InsertInto($x('.//textarea', QR), ((first && ms != '') ? ms + '\n' : '') + '>>' + pNum + '\n');
	$event($x('.//input[@type="submit"]', QR), {'click': function() {Rmess.value = $x('.//textarea', QR).value}});
}

/*----------------------Check for correct reply submit-----------------------*/

function iframeLoad(e) {
	var frame = (e.srcElement || e.originalTarget).contentDocument;
	if(!frame.body || frame.location == 'about:blank' || !frame.body.innerHTML) return;
	var err = frame.getElementsByTagName('h2')[0] || frame.getElementsByTagName('h1')[0];
	if(!ch.dc && (err || !frame.getElementById('delform'))) {
		alert(!err ? 'Ошибка:\n' + frame.innerHTML : (err.firstChild || err).textContent);
		frame.location.replace('about:blank');
		return;
	}
	if(/error/.test(frame.location.pathname)) {
		var nodes = frame.getElementsByTagName('td');
		for(var node, i = 0; node = nodes[i++];)
			if(node.className == 'post-error') alert('Ошибка: ' + node.textContent);
		frame.location.replace('about:blank');
		return;
	}
	Rmess.value = '';
	if(Rfile) Rfile.value = '';
	if(QR || !main) {
		if(main) ajaxExpandThread(postByNum[getThread(QR).id.match(/\d+/)], 8);
		else {$del(QR); ajaxNewPosts()}
		QR = undefined;
		if(captcha) captcha.value = '';
		if(wakaba && captcha) {
			var img = $x('.//img', $x('./ancestor::td', captcha));
			if(ch._2ch) capRefresh_2ch(img);
			else capRefresh(img);
		}
	} else window.location = frame.location;
	frame.location.replace('about:blank');
}

function submitCheck() {
	if(!postform) return;
	$x('.//body').appendChild($new('div', {'html': '<iframe name="submitcheck" id="submitcheck" src="about:blank" style="visibility:hidden; width:0px; height:0px; border:none"></iframe>'}));
	$attr(postform, {'target': 'submitcheck'});
	if(nav.Opera) $event(window, {'DOMFrameContentLoaded': iframeLoad});
	else $event($id('submitcheck'), {'load': iframeLoad});
}

/*---------------------------Append styles for elements----------------------*/

function scriptStyles() {
	var icn = function(nm, src) {return nm + ' {padding-left:18px; cursor:pointer; background:url(data:image/gif;base64,' + src + ') no-repeat} '};
	var pre = 'R0lGODlhDgAPALMAAP//////AP8A//8AAAD//wD/AAAA/wAAAN3d3cDAwJmZmYCAgGBgYEtLS////wAAACH5BAEAAA4ALAAAAAAOAA8AAAR';
	var txt =
		icn('.hide_icn', pre + 'U0MlJq7o4X7dQ+mCILAuohOdHfgpQJguQLowSA+7tKkxt4wgEbnHpkWhCAIJxNJIYyWWTSQMmqUYGDtBobJmMxhOAJZO6LM3l0/WE3oiGo0uv0x0RADs=') +
		icn('.unhide_icn', pre + 'N0MlJq7o4X7dQ+mCILEuYMIxJfheDIMz1LTHGAEDd1uidozsaAvciMmhHF3EIgCFJPVwPeiTRpFZaI+tyWhsN1g7zAXtMooYDzG6zHREAOw==') +
		icn('.rep_icn', pre + 'O0MlJq7o4X7dQ+mCILAt4hSD5LQCghgtzsa27YIys0LV75SRGr4VgxIyxIaB4DPYQiEYQ2SBGpUFsA9rAkhZdUFejSHQ9KFHD0W27244IADs=') +
		icn('.sage_icn','R0lGODlhDgAPALMAAP//////AP8A//8AAAD//wD/AAAA/wAAAO7u7oCAgGBgYEtLS////wAAAAAAAAAAACH5BAEAAAwALAAAAAAOAA8AAARBkMlJq7o4X6aS/6B3fVonmomCrAiqLNiyeHIMXwuL3K/sz4mfUKYbCmnGxUG3OvwwS9bBlolObSfF4WpaMJI/RgQAOw==')+
		icn('.expthr_icn', pre + 'P0MlJq7o4X7dQ+gsALF+CLCSIiGeJqiKbLkzGIEiNMfp15zYGCtXANYY04bCIOA55SKYTBV0akQxnMQZoEhulbRf8aRTDIrKp4TC7325HBAA7') +
		icn('.fav_icn', pre + 'T0MlJq7o4X7dQ+skFJsiyjAqCKKOJAgALLoxpInBpMzUM4D8frcbwGQHEGi1hTCh5puLxWWswAY0GLNGgdbVYE/hr5ZY/WXTDM2ojGo6sfC53RAAAOw==') +
	'td.reply {width:auto} .pcount {font-size:13px;font-weight:bold;cursor:default;color:#4f7942} .pcountb {font-size:13px;font-weight:bold;cursor:default;color:#c41e3a} ';
	if((ch._2ch && getCookie('wakabastyle') != 'Futaba') || ch._0ch)
		txt += '.postblock {background:#bbb} '; // gray postform color
	if(Cfg[39] == 1) txt += '.spoiler {background:#888 !important; color:#CCC !important} '; // open spoilers
	if(Cfg[25] == 1) txt += 'blockquote {max-height:100% !important; overflow:visible !important}'; // no scroller
	$x('.//head').appendChild($new('style', {'type': 'text/css', 'text': txt}));
	if(nav.Chrome) toggleDisp(delform);
}


/*=============================================================================
						FOR POSTS AND THREADS
=============================================================================*/

function forPosts(fn) {
	for(var post, i = 0; post = Posts[i++];)
		fn(post);
}

function forOP(fn) {
	for(var post, i = 0; post = oPosts[i++];)
		fn(post);
}

function forAll(fn) {
	forPosts(fn); forOP(fn);
}

function getThread(node) {
	return $x('ancestor::div[@class="thread"]', node);
}

function getPost(node) {
	return !ch._0ch
		? $x('ancestor::table', node)
		: $x('./ancestor::div[@class="postnode"]', node) || $x('./ancestor::table[@class="replypost"]', node);
}

function getTitle(post) {
	var t = $x('.//span[@class="filetitle" or @class="replytitle"]', post);
	if(t) t = t.textContent.trim();
	if(!t || t == '') t = post.Text.trim();
	return t.replace(/\s/g, ' ');
}

function getPostMsg(post) {
	return wakaba ? $x('.//blockquote', post) 
		: (ch._0ch ? $x('.//div[@class="postmessage"]', post)
		: (ch.dc ? $x('.//div[@class="message"]', post) || $x('.//div[@class="postbody"]', post) : null));
}

function getText(node) {
	var n = node.nodeName;
	if(n == '#text') return node.data;
	if(n == 'BR' && !ch.dc) return '\n';
	var t = [];
	if(n == 'P' || n == 'BLOCKQUOTE') t[t.length] = '\n';
	var arr = node.childNodes;
	for(var x, i = 0; x = arr[i++];)
		t[t.length] = getText(x);
	return t.join('');
}

function isSagePost(post) {
	if(ch.iich) return false;
	if(wakaba) {
		var a = $x('.//a[starts-with(@href,"mailto")]', post);
		return a && /mailto:sage/i.test(a.href);
	}
	if(ch.dc && $x('.//img[@alt="Сажа"]', post)) return true;
	if(ch._0ch && $x('.//span[@class="postername"]/a[@href="mailto:sage"]', post)) return true;
	return false;
}

/*----------------------------------Posts buttons----------------------------*/

function addHideThreadBtn(post) {
	var x = $new('span', {
		'id': 'phide_' + post.Num}, {
		'click': function() {hideThread(post); storeThreadVisib(post, HIDE)}});
	eventSelMenu(x, function() {selectPostHider(post)});
	if(Cfg[18] == 0) x.className = 'hide_icn';
	else {x.innerHTML = '[<a>Скрыть</a>] '; x.style.cursor = 'pointer'};
	return x;
}

function addExpandThreadBtn(post) {
	var x = $new('span', {
		'id': 'expthrd_' + post.Num}, {
		'click': function() {ajaxExpandThread(post, 1)}});
	eventSelMenu(x, function() {selectExpandThread(post)});
	if(Cfg[18] == 0) x.className = 'expthr_icn';
	else {x.innerHTML = '[<a>Развернуть</a>] '; x.style.cursor = 'pointer'};
	return x;
}

function addFavorBtn(post) {
	var x = $new('span', {
		'title': 'В избранное'}, {
		'click': function() {storeFavorities(post)}});
	if(Cfg[18] == 0) x.className = 'fav_icn';
	else {x.innerHTML = '[<a>В избранное</a>] '; x.style.cursor = 'pointer'};
	return x;
}

function addHidePostBtn(post) {
	var x = $new('span', {
		'id': 'phide_' + post.Num,
		'class': 'hide_icn'}, {
		'click': function() {togglePostVisib(post)}});
	eventSelMenu(x, function() {selectPostHider(post)});
	return x;
}

function addQuickRepBtn(post) {
	if(ch.dc) $del($x('.//a[@class="reply_ icon"]', post));
	var x = $new('span', {
		'title': 'Быстрый ответ'}, {
		'click': function() {quickReply(post)}});
	if(!(Cfg[18] == 1 && post.isOp)) x.className = 'rep_icn';
	else {x.innerHTML = '[<a>Быстрый ответ</a>] '; x.style.cursor = 'pointer'}
	return x;
}

function addSageMarker() {
	return $new('span', {
		'class': 'sage_icn',
		'title': 'SAGE'}, {
		'click': function() {toggleSage(); toggleChk($id('sage_hider'))}});
}

function addPostCounter(post) {
	return $new('i', {
		'class': (post.Count < 500 ? 'pcount' : 'pcountb'),
		'text': post.Count});
}

function addNote(post, text) {
	post.Btns.appendChild($new('a', {
		'id': 'note_' + post.Num,
		'style': 'font-size:12px; font-style:italic',
		'text': text}, {
		'click': function() {$del(this)}}));
}

function addPostButtons(post) {
	var div = $new('span');
	var x = [], i = 0, C = Cfg;
	if(ch.dc || ch._410) div.innerHTML = '&nbsp;';
	if(ch._410 || ch._0ch) $del($x('.//span[@class="extrabtns"]', post));
	if(!post.isOp) {
		div.className = 'reflink';
		if(!main || post.isLoad) x[i++] = addPostCounter(post);
		if(C[19] == 1 && post.isSage) x[i++] = addSageMarker();
		if(C[16] == 1 && postform) x[i++] = addQuickRepBtn(post);
		x[i++] = addHidePostBtn(post);
	} else {
		if(C[18] == 0) div.className = 'reflink';
		if(C[19] == 1 && post.isSage) x[i++] = addSageMarker();
		if(C[17] == 1) x[i++] = addFavorBtn(post);
		if(C[16] == 1 && postform) x[i++] = addQuickRepBtn(post);
		if(main) x[i++] = addExpandThreadBtn(post);
		x[i++] = addHideThreadBtn(post);
	}
	var i = x.length;
	while(i--) div.appendChild(x[i]);
	$after($x('.//span[@class="reflink"]', post), [div]);
	post.Btns = div;
}

/*------------------------------------Players---------------------------------*/

function insertYouTube(link, pNum) {
	var div = $id('ytube_' + pNum);
	if($x('.//embed[@src="' + link + '"]', div)) delChilds(div);
	else $html(div, '&nbsp;<embed src="' + link + '" type="application/x-shockwave-flash" wmode="transparent" width="320" height="262"></embed>');
}

function addYouTube(post) {
	if(!/youtube/.test(post.Text)) return;
	var msg = post.Msg;
	var pNum = post.Num;
	var pattern = /^http:\/\/(www\.)?youtube\.com\/watch\?v=([^&]+).*$/;
	var template = 'http://www.youtube.com/v/desu&hl=en_US&fs=1&';
	var thumbn = $x('.//span[@class="thumbnailmsg"]', post);
	if(thumbn) $html(thumbn, thumbn.innerHTML + '. Просмотр YouTube.');
	$before(msg.firstChild, [$new('div', {'id': 'ytube_' + pNum})]);
	$each($X('.//a[contains(@href,"youtube")]', msg), function(link, i) {
		if(pattern.test(link.href)) {
			var yLink = template.replace('desu', link.href.match(pattern)[2]);
			$after(link, [$new('span', {
				'style': 'cursor:pointer',
				'html': '<b> ' + unescape('%u25BA') + '</b>'}, {
				'click': function(link, num) {return function() {insertYouTube(link, num)}}(yLink, pNum)})]);
			if(i == 0) insertYouTube(yLink, pNum);
		}
	});
}

function addMP3(post) {
	var links = $X('.//a[contains(@href,".mp3") or contains(@href,".wav")]', post);
	if(!links) return;
	var msg = post.Msg;
	var mp3 = $new('div');
	$before(msg.firstChild, [mp3]);
	$each(links, function(link) {
		if(!$x('.//param[contains(@value,"' + link.href + '")]', mp3))
			mp3 = $html(mp3, '<object data="http://junglebook2007.narod.ru/audio/player.swf" wmode="transparent" type="application/x-shockwave-flash" width="220" height="16"><param value="http://junglebook2007.narod.ru/audio/player.swf" name="movie"><param value="playerID=1&amp;bg=0x808080&amp;leftbg=0xB3B3B3&amp;lefticon=0x000000&amp;rightbg=0x808080&amp;rightbghover=0x999999&amp;rightcon=0x000000&amp;righticonhover=0xffffff&amp;text=0xffffff&amp;slider=0x222222&amp;track=0xf5f5dc&amp;border=0x666666&amp;loader=0x7fc7ff&amp;loop=yes&amp;autostart=no&amp;soundFile=' + link.href + '&amp;" name="FlashVars"><param value="high" name="quality"><param value="true" name="menu"><param value="transparent" name="wmode"></object><br>  ');
	});
}

function searchMP3() {
	if($X('.//a[contains(@href,".mp3") or contains(@href,".wav")]', delform).snapshotLength > 0) forAll(addMP3);
}

/*--------------------------------Expand images------------------------------*/

function expandImg(a) {
	toggleDisp($x('.//img[@class="thumb"]', a));
	var full = $x('.//img[@id="full_img"]', a);
	if(full) toggleDisp(full);
	else a.appendChild($new('img', {'class': 'thumb', 'id': 'full_img', 'alt': 'Image..', 'src': a.href}));
}

function expandHandleImg(post) {
	if(post.Img) $event($up(post.Img), {'click': function(e) {e.preventDefault(); expandImg(this)}});
}

function allImgExpander() {
	if($X('.//img[@class="thumb"]', delform).snapshotLength <= 1) return;
	oPosts[0].appendChild($new('div', {
		'id': 'expimgs_btn',
		'style': 'cursor:pointer',
		'html': '[<a>Раскрыть изображения</a>]'}, {
		'click': function() {
			forPosts(function(post) {if(post.Img && post.Vis != HIDE) expandImg($up(post.Img))});
			var btn = $id('expimgs_btn');
			btn.innerHTML = /Раскрыть/.test(btn.innerHTML) ? '[<a>Свернуть изображения</a>]' : '[<a>Раскрыть изображения</a>]';
		}}));
}

/*--------------------------Add map of answers to post-----------------------*/

function refMap(post) {
	var arr = [];
	var mod = Boolean(post);
	$each($X('.//a[starts-with(text(),">>")]', (mod ? post.Msg : delform)), function(link) {
		if(!/\//.test(link.textContent)) {
			var rNum = link.hash.match(/\d+/) || link.pathname.substring(link.pathname.lastIndexOf('/')).match(/\d+/);
			var post = getPost(link);
			if(postByNum[rNum] && post) {
				var pNum = post.id.match(/\d+/);
				if(!arr[rNum]) arr[rNum] = pNum;
				else if(arr[rNum].indexOf(pNum) == -1) arr[rNum] = pNum + ', ' + arr[rNum];
			}
		}
	});
	for(var rNum in arr) {
		var ref = arr[rNum].toString().replace(/(\d+)/g, '<a href="#$1">&gt;&gt;$1</a>');
		var map = !mod ? undefined : $id('rfmap_' + rNum);
		if(!map) {
			map = $new('small', {'id': 'rfmap_' + rNum, 'html': '<i><br>Ответы: ' + ref + '</i>'});
			refPrewiev(map);
			var msg = postByNum[rNum].Msg;
			if(msg) $up(msg).appendChild(map);
		} else refPrewiev($html(map.firstChild, map.firstChild.innerHTML + ', ' + ref));
	}
}

/*---------------------------Posts preview by reflinks-----------------------*/

function doPostPrewiev(e) {
	e.preventDefault(); e.stopPropagation();
	$del($x('.//div[starts-with(@id,"preview")]'));
	var tNum = this.pathname.substring(this.pathname.lastIndexOf('/')).match(/\d+/);
	var pNum = this.hash.match(/\d+/) || tNum;
	var b = this.pathname;
	if(/\//.test(b.substr(0, 1))) b = b.substr(1);
	b = b.split('/')[0];
	$del($id('pstprew_' + pNum));
	var x = e.clientX + (doc.documentElement.scrollLeft || doc.body.scrollLeft) - doc.documentElement.clientLeft;
	var y = e.clientY + (doc.documentElement.scrollTop || doc.body.scrollTop) - doc.documentElement.clientTop;
	var clone = $new('div', {
		'class': 'reply',
		'id': 'pstprew_' + pNum,
		'style': 'width:auto; position:absolute; z-index:900; border:solid 1px #575763; ' +
			((x < doc.body.clientWidth/2)
				? 'left:' + x + 'px;'
				: 'right:' + parseInt(doc.body.clientWidth - x - 80) + 'px;') +
			' top:' + y + 'px;'}, {
		'mouseout': function(e) {
			var el = $x('ancestor-or-self::*[starts-with(@id,"pstprew")]', e.relatedTarget);
			if(!el) delPrewievClones();
			else while(/pstprew/.test($next(el).id)) $del($next(el));
		}});
	var functor = function(clone, html) {
		clone.innerHTML = html;
		refPrewiev(clone);
		clone.Img = $x('.//img[@class="thumb"]', clone);
		expandHandleImg(clone);
	};
	if(b == board) var post = postByNum[pNum];
	if(post) {
		var td = $x('.//td[@class="reply"]', post);
		var p = td ? td : post;
		functor(clone, p.innerHTML);
		if(post.Vis == HIDE) modPostDisp(clone);
	}
	else if(ajaxPosts[tNum] && ajaxPosts[tNum][pNum]) functor(clone, ajaxPosts[tNum][pNum]);
	else {
		clone.innerHTML = 'Загрузка...';
		AJAX('thr', b, tNum, function(err) {
			var p = ajaxPosts[tNum][pNum];
			if(p) functor(clone, p);
			else clone.textContent = err ? err : 'Пост не найден';
		});
	}
	$before(ndelform, [clone]);
}

function refPrewiev(node) {
	$each($X('.//a[starts-with(text(),">>")]', node || delform), function(link) {
		if(ch.dc) {
			if(!nav.Opera) {if(link.getAttribute('onmouseover')) link.removeAttribute('onmouseover')}
			else if(link.onmouseover) link.onmouseover = '';
		}
		$event(link, {
			'mouseover': doPostPrewiev,
			'mouseout': function(e) {
				if(!$x('ancestor-or-self::*[starts-with(@id,"pstprew")]', e.relatedTarget))
					delPrewievClones();
			}});
	});
}

function delPrewievClones() {
	$each($X('.//div[starts-with(@id,"pstprew")]'), function(clone) {$del(clone)});
}

/*=============================================================================
							AJAX FUNCTIONS
=============================================================================*/

function getpNum(x) {
	return parseInt((x.match(/(?:<input type="ch[^\d]+)(\d+)(?:[^>]+>)/) || x.match(/(?:<a name="i)(\d+)(?:">)/))[1]);
}

function parsePage(x) {
	var threads = x.substring(x.search(/<form[^>]+del/) + x.match(/<form[^>]+del[^>]+>/).toString().length, /userdelete">/.test(x) ? x.indexOf('userdelete">') - 13 : (/deletebuttons/.test(x) ? x.indexOf('deletebuttons') - 70 : x.lastIndexOf('<form') - 5)).split(/<br clear="left"[\s<\/p>]*<h[r\s\/]*>/i);
	for(var i = 0, tLen = threads.length - 1; i < tLen; i++) {
		var tNum = getpNum(threads[i]);
		var posts = threads[i].split(/<table[^>]*>/);
		ajaxThrds[i] = tNum;
		ajaxPosts[tNum] = {keys: []};
		for(var j = 0, pLen = posts.length; j < pLen; j++) {
			var x = posts[j];
			var pNum = getpNum(x);
			ajaxPosts[tNum].keys.push(pNum);
			ajaxPosts[tNum][pNum] = x.substring((!/<\/td/.test(x) && /filesize">/.test(x)) ? x.indexOf('filesize">') - 13 : x.indexOf('<label'), /<\/td/.test(x) ? x.lastIndexOf('</td') : (/omittedposts">/.test(x) ? x.lastIndexOf('</span') + 7 : (/<\/div/.test(x) ? x.lastIndexOf('</div') + 6 : x.lastIndexOf('</blockquote') + 13)));
		}
	}
}

function AJAX(mod, b, addr, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			if(xhr.status == 200) {
				parsePage(xhr.responseText);
				callback(null);
			} else callback('HTTP ' + xhr.status + ' ' + xhr.statusText);
		}
	};
	if(mod == 'thr') xhr.open('GET', '/' + b + '/res/' + addr + '.html', true);
	if(mod == 'brd') xhr.open('GET', '/' + b + '/' + addr, true);
	xhr.send(false);
}

function getNewPost(pNum, html, i) {
	return $new(i > 0 ? 'table' : 'div', {
		'class': (i > 0 ? 'replypost' : 'oppost'),
		'id': 'post_' + pNum,
		'html': (i > 0 ? '<tbody><tr><td class="doubledash">&gt;&gt;</td><td class="reply" id="reply' + pNum + '">' + html + '</td></tr></tbody>' : html)});
}

function addPostFunc(post, pNum, count, isLoad) {
	if(count == 1) oPosts[oPosts.length] = post;
	else Posts[Posts.length] = post;
	postByNum[pNum] = post;
	post.Num = pNum;
	post.Count = count;
	if(!(sav.cookie && main)) post.Vis = getVisib(pNum);
	post.Msg = getPostMsg(post);
	post.Text = getText(post.Msg).trim();
	post.Img = $x('.//img[@class="thumb"]', post);
	post.isSage = isSagePost(post);
	post.isLoad = isLoad;
	post.isOp = count == 1;
	addPostButtons(post);
	doPostFilters(post);
	if(post.Vis == HIDE) setPostVisib(post, HIDE);
	if(Cfg[12] == 1) mergeHidden(post);
	if(Cfg[15] == 1) refMap(post);
	if(Cfg[23] == 1 && wakaba) expandHandleImg(post);
	if(Cfg[26] == 1) refPrewiev(post.Msg);
	if(Cfg[27] == 1) addYouTube(post);
	if(Cfg[28] == 1) addMP3(post);
}

function ajaxExpandPost(post) {
	if(post.Vis == HIDE || !$x('.//div[@class="abbrev"]', post)) return;
	var tNum = getThread(post).id.match(/\d+/);
	AJAX('thr', board, tNum, function() {
		var txt = ajaxPosts[tNum][post.Num];
		post.Msg = $html(post.Msg, txt.substring(txt.indexOf('<blockquote') + 12, txt.lastIndexOf('</blockquote>')));
		post.Text = getText(post.Msg);
		if(Cfg[26] == 1) refPrewiev(post.Msg);
		if(Cfg[27] == 1) addYouTube(post);
		if(Cfg[28] == 1) addMP3(post);
	});
}

function ajaxExpandThread(post, last) {
	var thread = getThread(post);
	var tNum = post.Num;
	$del($x('.//span[@class="omittedposts"]', thread) || $x('.//div[@class="abbrev"]', thread));
	$del($id('rfmap_' + tNum));
	if(Cfg[24] == 1 && wakaba) ajaxExpandPost(post);
	delNexts(post);
	AJAX('thr', board, tNum, function() {
		var len = ajaxPosts[tNum].keys.length;
		if(last != 1) last = len - last;
		if(last <= 0) last = 1;
		for(var i = last; i < len; i++) {
			var pNum = ajaxPosts[tNum].keys[i];
			addPostFunc(thread.appendChild(getNewPost(pNum, ajaxPosts[tNum][pNum], i)), pNum, i + 1, true);
		}
		if(!sav.cookie) storeHiddenPosts();
	});
}

function ajaxNewPosts() {
	var thread = $x('.//div[@class="thread"]');
	var tNum = oPosts[0].Num;
	AJAX('thr', board, tNum, function() {
		for(var i = Posts.length + 1, len = ajaxPosts[tNum].keys.length; i < len; i++) {
			var pNum = ajaxPosts[tNum].keys[i];
			var post = getNewPost(pNum, ajaxPosts[tNum][pNum], i);
			if(Cfg[37] == 1) $before($id('newpst_btn'), [post]);
			else {if(ch._0ch) $before($x('.//span[@style="float: right;"]', thread), [post]);
			else thread.appendChild(post)}
			addPostFunc(post, pNum, i + 1, true);
		}
		storeHiddenPosts();
	});
	if(Cfg[37] == 1) $id('newpst_btn').innerHTML = '[<i><a>Новые посты:</a></i> 0]';
}

function initNewPosts() {
	if(Cfg[37] == 1) {
		var thread = $x('.//div[@class="thread"]');
		var tNum = oPosts[0].Num;
		var txt = '[<i><a>Новые посты:</a></i> '
		var x = $new('span', {
			'id': 'newpst_btn',
			'style': 'cursor:pointer',
			'html': txt + '0]'}, {
			'click': ajaxNewPosts});
		if(ch._0ch) $before($x('.//span[@style="float: right;"]', thread), [x]);
		else thread.appendChild(x);
		setInterval(function() {AJAX('thr', board, tNum, function() {$id('newpst_btn').innerHTML = txt + parseInt(ajaxPosts[tNum].keys.length - Posts.length - 1) + ']'})}, 60000);
	}
	if(Cfg[37] == 2) setInterval(ajaxNewPosts, 60000);
}

function ajaxPages(len) {
	delChilds(delform);
	Posts = []; oPosts = [];
	for(var p = 0; p < len; p++) {
		AJAX('brd', board, (p == 0) ? '' : p + (ch.dc ? '.xhtml' : '.html'), function() {
			for(var i = 0, tLen = ajaxThrds.length; i < tLen; i++) {
				var tNum = ajaxThrds[i];
				var thread = $new('div', {'class': 'thread', 'id': tNum});
				$append(delform, [thread, $new('br', {'clear': 'left'}), $new('hr')]);
				for(var j = 0, pLen = ajaxPosts[tNum].keys.length; j < pLen; j++) {
					var pNum = ajaxPosts[tNum].keys[j];
					var post = getNewPost(pNum, ajaxPosts[tNum][pNum], j);
					thread.appendChild(post);
					addPostFunc(post, pNum, j + 1, false);
					if(Cfg[24] == 1 && wakaba) ajaxExpandPost(post);
				}
			}
			if(!sav.cookie) storeHiddenPosts();
		})
	}
}


/*=============================================================================
							HIDERS / FILTERS
=============================================================================*/

function hideThread(post, note) {
	if(post.Visibl == HIDE) return;
	var thread = $up(post);
	var txt = !note ? getTitle(post).substring(0, 50) : 'autohide: ' + note;
	toggleDisp(thread);
	var x = $new('span', {
		'class': 'reply',
		'id': 'hiddenthr_' + post.Num,
		'style': 'display:inline; cursor:default',
		'html': 'Тред <a>№' + post.Num + '</a> скрыт <i>(' + txt + ')' + '</i>'});
	$event($x('.//a', x), {'click': function() {unhideThread(post)}});
	$after(thread, [x]);
}

function unhideThread(post) {
	if(post.Visibl == UNHIDE) return;
	toggleDisp($up(post));
	$del($id('hiddenthr_' + post.Num));
	storeThreadVisib(post, UNHIDE);
}

function filterThread(post, note) {
	if(Cfg[13] == 1) {
		hideThread(post, note);
		storeThreadVisib(post, HIDE);
	}
}

function prevHidden(e) {modPostDisp(getPost(this), UNHIDE)}
function unprevHidden(e) {modPostDisp(getPost(this), HIDE)}

function setPostVisib(post, vis) {
	var reflink = post.Btns.previousSibling;
	post.Btns.firstChild.className = (vis == HIDE) ? 'unhide_icn' : 'hide_icn';
	modPostDisp(post, vis);
	applyPostVisib(post, vis);
	if(Cfg[14] == 0) return;
	if(vis == HIDE) $event(reflink, {'mouseover': prevHidden, 'mouseout': unprevHidden});
	else $revent(reflink, {'mouseover': prevHidden, 'mouseout': unprevHidden});
}

function togglePostVisib(post) {
	post.Vis = (post.Vis == UNHIDE) ? HIDE : UNHIDE;
	setPostVisib(post, post.Vis);
	storePostsVisib();
}

function hidePost(post, note) {
	if(!post.isOp) {
		if(post.Vis != HIDE) addNote(post, ' autohide: ' + note + ' ');
		applyPostVisib(post, HIDE);
	} else filterThread(post, note);
}

function unhidePost(post) {
	if(post.isOp) {if(Cfg[13] == 1) unhideThread(post); return}
	if(detectWipe(post) != null) return;
	setPostVisib(post, UNHIDE);
	$del($id('note_' + post.Num));
	hideByWipe(post);
}

function toggleSamePost(post, vis, expr, note) {
	if(!expr) return;
	$del($id('note_' + post.Num));
	if(vis == UNHIDE) {
		if(!post.isOp) {
			addNote(post, note);
			applyPostVisib(post, HIDE);
		} else filterThread(post, note);
	} else unhidePost(post);
}

function storeHiddenPosts() {
	forPosts(function(post) {if(post.Vis == HIDE) setPostVisib(post, HIDE)});
	storePostsVisib();
}

function modPostDisp(post, vis) {
	var x = [], i = 0;
	x[i++] = './/br';
	x[i++] = './/small[@id="rfmap_' + post.Num + '"]';
	if(!ch.dc) {
		x[i++] = './/blockquote';
		x[i++] = './/img[starts-with(@class,"thumb")]';
		x[i++] = './/span[@class="filesize"]';
		x[i++] = './/div[@class="nothumb"]'; 
	} else {
		x[i++] = './/div[@class="postbody"]';
		x[i++] = './/div[@class="file"]';
		x[i++] = './/div[@class="fileinfo"]';
	}
	if(wakaba) {
		$del($x('.//img[@id="full_img"]', post));
		x[i++] = './/span[@class="thumbnailmsg"]';
	}
	while(i--) $each($X(x[i], post),
		function(node) {node.style.display = (vis == HIDE) ? 'none' : ''});
}

function mergeHidden(post) {
	if(post.Vis != HIDE) return;
	var div = $prev(post);
	var next = $next(post);
	if(!/merged/.test(div.id)) {
		div = $new('div', {'id': 'merged_' + post.Num, 'style': 'display:none'});
		$before(post, [$new('span', {
			'style': 'display:block; cursor:pointer'}, {
			'click': function() {
				var hDiv = $id('merged_' + post.Num);
				$prev(hDiv).innerHTML = (hDiv.style.display == 'none' ? unescape('%u25BC') : unescape('%u25B2')) + '[<i><a>Скрыто:</a> ' + hDiv.childNodes.length + '</i>]';
				toggleDisp(hDiv)}}
		), div]);
	}
	div.appendChild(post);
	if(!next || getVisib(next.id.match(/\d+/)) == UNHIDE)
		$prev(div).innerHTML = unescape('%u25B2') + '[<i><a>Скрыто:</a> ' + div.childNodes.length + '</i>]';
}

function processHidden(newCfg, oldCfg) {
	if(newCfg == 2 || oldCfg == 2)
		forPosts(function(post) {if(post.Vis == HIDE) toggleDisp(post)});
	if(oldCfg == 1) 
		$each($X('.//div[starts-with(@id,"merged_")]'), function(div) {
			var px = div.childNodes;
			var i = px.length;
			while(i--) $after(div, [px[i]]);
			$del($prev(div));
			$del(div);
		});
	if(newCfg == 1) forAll(mergeHidden);
	saveCfg(12, newCfg);
}

/*-----------------------------------Filters---------------------------------*/

function doPostFilters(post) {
	if(post.Vis == HIDE) return;
	var C = Cfg;
	if(C[0] == 1) hideByWipe(post);
	if(C[1] == 1 && !ch.iich) hideBySage(post);
	if(C[2] == 1 && Rtitle && !post.isOp) hideByTitle(post);
	if(C[3] == 1) hideByNoText(post);
	if(C[4] == 1) hideByNoImage(post);
	if(C[8] == 1) hideByMaxtext(post);
	if(C[10] == 1) hideByRegexp(post);
}

function hideBySage(post) {
	if(post.isSage) hidePost(post, 'sage')
}
function toggleSage() {
	toggleCfg(1);
	if(Cfg[1] == 1) forAll(hideBySage);
	else forAll(function(post) {if(post.isSage) unhidePost(post)});
	storeHiddenPosts();
}

function hideByNoText(post) {
	if(post.Text == '') hidePost(post, 'no text')
}
function toggleNotext() {
	toggleCfg(3);
	if(Cfg[3] == 1) forAll(hideByNoText);
	else forAll(function(post) {if(post.Text == '') unhidePost(post)});
	storeHiddenPosts();
}

function hideByNoImage(post) {
	if(!post.Img) hidePost(post, 'no image')
}
function toggleNoimage() {
	toggleCfg(4);
	if(Cfg[4] == 1) forAll(hideByNoImage);
	else forAll(function(post) {if(!post.Img) unhidePost(post)});
	storeHiddenPosts();
}

function hideByTitle(post) {
	if(!ch._0ch && $x('.//span[@class="replytitle"]', post).textContent.trim() == '') return;
	if(ch._0ch && !$x('.//span[@class="filetitle"]', post)) return;
	hidePost(post, 'theme field');
}
function toggleTitle() {
	toggleCfg(2);
	if(Cfg[2] == 1) forPosts(hideByTitle);
	else forPosts(function(post) {
		if(!ch._0ch && $x('.//span[@class="replytitle"]', post).textContent == '') return;
		if(ch._0ch && !$x('.//span[@class="filetitle"]', post)) return;
		unhidePost(post)});
	storeHiddenPosts();
}

function hideByMaxtext(post) {
	var len = post.Text.replace(/\n/g, '').length;
	if(len >= parseInt(Cfg[9]))
		hidePost(post, 'text n=' + len + ' > max');
}
function toggleMaxtext() {
	var field = $id('maxtext_field');
	if(isNaN(field.value)) {
		$id('maxtext_hider').checked = false;
		saveCfg(8, 0);
		alert('введите число знаков');
		return;
	}
	toggleCfg(8);
	saveCfg(9, field.value);
	if(Cfg[8] == 1) forAll(hideByMaxtext);
	else forAll(function(post) {
		if(post.Text.replace(/\n/g, '').length >= parseInt(Cfg[9]))
		unhidePost(post);
	});
	storeHiddenPosts();
}

/*--------------------------Hide posts by expressions------------------------*/

function hideByRegexp(post) {
	var exp = doRegexp(post);
	if(exp != null) hidePost(post, 'match ' + exp.substring(0, 20) + '..');
}

function applyRegExp() {
	var field = $id('regexp_field');
	var val = field.value.trim();
	field.value = val;
	setStored(ID('RegExpr'), val);
	$id('regexp_hider').checked = val != '';
	if(val != '') {
		saveCfg(10, 1);
		forAll(hideByRegexp);
		storeHiddenPosts();
	} else saveCfg(10, 0);
}

function toggleRegexp() {
	var field = $id('regexp_field');
	var val = field.value.trim();
	setStored(ID('RegExpr'), val);
	if(val != '') {
		toggleCfg(10);
		if(Cfg[10] == 1) forAll(hideByRegexp);
		else forAll(function(post) {
			var exp = doRegexp(post);
			if(exp != null) unhidePost(post);
		})
		storeHiddenPosts();
	} else {
		$id('regexp_hider').checked = false;
		saveCfg(10, 0);
	}
}

function doRegexp(post) {
	var expr = getStored(ID('RegExpr')).split('\n');
	var pname = $x('.//span[@class="commentpostername"]', post);
	var ptrip = $x('.//span[@class="postertrip"]', post);
	var ptitle = $x('.//span[@class="replytitle" or @class="filetitle"]', post);
	var i = expr.length;
	while(i--) {
		var x = expr[i].trim();
		if(/\$img /.test(x)) {
			if(!post.Img) continue;
			var img = doImgRegExp(post, x.split(' ')[1]);
			if(img != null) return img; else continue;
		}
		if(/\$name /.test(x)) {
			x = x.split(' ')[1];
			var nm = x.split(/!+/)[0];
			var tr = x.split(/!+/)[1];
			if(pname && nm != '' && pname.textContent.indexOf(nm) > -1) return x;
			if(ptrip && tr != '' && ptrip.textContent.indexOf(tr) > -1) return x;
		}
		if(/\$exp /.test(x)) {
			x = x.split(' ')[1];
			var l = x.lastIndexOf('/');
			var re = new RegExp(x.substr(1, l - 1), x.substr(l + 1));
			if(post.Text.match(re)) return x;
			if(ptitle && re.test(ptitle.textContent)) return x;
		}
		if(x == '$alltrip' && ptrip) return x;
		x = x.toLowerCase();
		if(ptitle && ptitle.textContent.toLowerCase().indexOf(x) > -1) return x;
		if(post.Text.toLowerCase().indexOf(x) > -1) return x;
	}
	return null;
}

function doImgRegExp(post, expr) {
	if(expr == '') return null;
	var s = expr.split('@');
	var stat = s[0].substring(0, 1);
	var expK = s[0].substring(1);
	if(expK != '') {
		var imgK = getImgWeight(post);
		if((stat == '<' && imgK < expK) ||
			(stat == '>' && imgK > expK) ||
			(stat == '=' && imgK == expK))
			{if(!s[1]) return('image ' + expr)}
		else return null;
	}
	if(s[1]) {
		var x = s[1].split(/[x|X|х|Х|×]/);
		var expW = x[0], expH = x[1];
		var sz = getImgSize(post).split(/[x|×]/);
		var imgW = parseInt(sz[0]), imgH = parseInt(sz[1]);
		if((stat == '<' && imgW < expW && imgH < expH) ||
			(stat == '>' && imgW > expW && imgH > expH) ||
			(stat == '=' && (imgW == expW && imgH == expH)))
			return 'image ' + expr;
	}
	return null;
}

function getImgWeight(post) {
	var w = 0;
	if(wakaba) {
		w = parseInt($x('.//em', post).textContent.split(',')[0]);
		if(ch.nowr) w = Math.round(w/1000);
	}
	if(ch._0ch) {
		var inf = $x('.//span[@class="filesize"]', post).textContent.split('(')[1].split(',')[0];
		if(inf.split('.')[1]) w = parseInt(inf.split('.')[0]) + parseInt(inf.split('.')[1].match(/\d+/))*0.01;
		if(inf.match('MB')) w = w*1000;
	}
	if(ch.dc) {
		var inf = $x('.//em', post).textContent.split(',')[1];
		w = parseInt(inf.split('.')[0].match(/\d+/)) + parseInt(inf.split('.')[1].match(/\d+/))*0.01;
	}
	return w;
}

function getImgSize(post) {
	if(wakaba) return $x('.//em', post).textContent.split(',')[1].trim();
	if(ch._0ch) return $x('.//span[@class="filesize"]', post).textContent.split('(')[1].split(',')[1];
	if(ch.dc) return $x('.//em', post).textContent.split(',')[2];
}

/*-------------------------Hide posts with similar text----------------------*/

function getWrds(post)
	{return post.Text.replace(/\s+/g, ' ').replace(/[\?\.\\\/\+\*\$\^\(\)\|\{\}\[\]!@#%_=:;<,-]/g, '').substring(0, 1000).split(' ')}

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
	while (i--) {
		if(origWords.length > 6 && origWords[i].length < 3) {origLen--; continue}
		var j = words.length;
		while (j--) if((words[j] == origWords[i]) || (origWords[i].substring(0, 2) == '>>' && words[j].substring(0, 2) == '>>')) matchCount++;
	}
	toggleSamePost(post, origVis, matchCount >= origLen*0.5 && words.length < origLen*2.5, ' same text as >>' + origPost.Num);
}

/*-------------------------Hide posts with similar images----------------------*/

function getPix(img, iw, ih) {
	var cn = $new('canvas', {'width': iw, 'height': ih}).getContext('2d');
	cn.drawImage(img, 0, 0);
	return cn.getImageData(0, 0, iw, ih).data;
}

function hideBySameImage(post) {
	var img = post.Img;
	if(!img) {
		toggleNoimage();
		toggleChk($id('noimage_hider'));
		return;
	}
	var iw = img.width, ih = img.height;
	var iData = getPix(img, iw, ih);
	for(var i = 0; i < ih; i += 10) 
		for(var j = 0; j < iw; j += 10) {
			var n = (i*4)*iw + (j*4);
			var mix = Math.round((iData[n] + iData[n + 1] + iData[n + 2])*0.3333);
			iData[n] = mix;
			iData[n + 1] = mix;
			iData[n + 2] = mix;
		}
	var vis = post.Vis;
	forAll(function(target) {findSameImages(target, post, vis, iData)});
	storeHiddenPosts();
}

function findSameImages(post, origPost, origVis, iData) {
	var img = post.Img;
	if(!img) return;
	var matchCount = 0, count = 0;
	var iw = img.width, ih = img.height;
	var sData = getPix(img, iw, ih);
	for(var i = 0; i < ih; i += 10) 
		for(var j = 0; j < iw; j += 10) {
			var n = (i*4)*iw + (j*4);
			var mix = Math.round((sData[n] + sData[n + 1] + sData[n + 2])*0.3333);
			if(iData[n] <= mix + 10 && iData[n] >= mix - 10) matchCount++;
			count++;
		}
	toggleSamePost(post, origVis, matchCount/count >= 0.5, ' image as >>' + origPost.Num + ' (' + parseInt(matchCount/count*100) + '%)');
}


/*=============================================================================
							WIPE DETECTORS
=============================================================================*/

function detectWipe(post) {
	var detectors = [
		detectWipe_sameLines,
		detectWipe_sameWords,
		detectWipe_specialSymbols,
		detectWipe_longColumn,
		detectWipe_longWords,
		detectWipe_numbers,
		detectWipe_caseSage
	];
	for(var i = 0; i < detectors.length; i++) {
		var detect = detectors[i](post.Text);
		if(detect != null) return detect;
	}
	return null;
}

function hideByWipe(post) {
	if(post.Vis == HIDE || post.Vis == UNHIDE) return;
	var wipe = detectWipe(post);
	if(wipe != null) {
		if(!post.isOp) {
			applyPostVisib(post, HIDE);
			addNote(post, ' autohide: ' + wipe);
		} else filterThread(post, wipe);
	} else applyPostVisib(post, UNHIDE);
}

function detectWipe_longColumn(text) {
	var shortrows = 0;
	var rows = text.split('\n');
	var len = rows.length;
	for(var i = 0; i < len; i++) {
		if(rows[i].length < 9) shortrows++;
		else return null;
	}
	if(len > 45) return 'looong post x' + len;
	if(shortrows > 5) return 'column wipe x' + shortrows;
	return null;
}

function detectWipe_sameLines(text) {
	var lines = text.replace(/(> )/g, '').split('\n');
	var len = lines.length;
	if(len < 5) return null;
	var count = [], all = 0;
	for(var i = 0; i < len; i++) {
		if(lines[i].length == 0) continue;
		all++;
		incc(count, lines[i]);
	}
	for(var it in count) {
		if((count[it] > all/2 - count[it]) && count[it] >= 5)
			return 'same line: "' + it.substr(0, 20) + '" x' + count[it];
	}
	return null;
}

function detectWipe_sameWords(text) {
	text = text.replace(/[\.\?\!,>]/g, ' ').replace(/\s+/g, ' ').toUpperCase();
	var words = text.split(' ');
	var len = words.length;
	if(len <= 15) return null;
	var count = [], wrds = 0;
	for(var i = 0; i < len; i++) {
		if(words[i].length <= 1) continue;
		wrds++;
		incc(count, words[i])
	}
	if(wrds <= 10) return null;
	var keys = 0, pop = '', mpop = -1;
	for(var it in count) {
		keys++;
		if(count[it] > mpop) {
			mpop = count[it];
			pop = it;
		}
		if(wrds > 25 && count[it] > (wrds / 3.5))
			return 'word: ' + it.substr(0, 20) + ' x' + count[it];
	}
	pop = pop.substr(0, 20);
	if(wrds > 80 && keys <= 20) return 'same words ' + ' total=' + wrds + ', words=' + keys;
	if(wrds / keys > 7) return 'same words ' + pop + ' total=' + wrds + ', words=' + keys;
	return null;
}

function detectWipe_specialSymbols(text) {
	text = text.replace(/\s+/g, '');
	var wholeText = text; 
	text = text.replace(/[0-9A-Za-zА-Яа-я]/g, '').replace(/[\.\?!,]/g, '');
	var specsym = text.length / wholeText.length;
	if(wholeText.length > 30 && specsym > 0.40)
		return 'special symbols: ' + parseInt(specsym * 100) + '%';
	return null;
}

function detectWipe_longWords(text) {
	text = text.replace(/http:\/\/.*?(\s|$)/g, '').replace(/[\.\?!,>]/g, ' ').replace(/\s+/g, ' ');
	var totalText = '', longest = '', wordsNum = 0;
	var words = text.split(' ');
	for(var i = 0, len = words.length; i < len; i++) {
		if(words[i].length <= 1) continue;
		wordsNum++;
		totalText += words[i];
		longest = words[i].length > longest.length ? words[i] : longest;
	}
	if(wordsNum == 0) return null;
	var lws = totalText.length / wordsNum;
	if(wordsNum == 1 && longest.length > 70)
		return 'long word:' + longest.substr(0, 20);
	if( ((wordsNum > 1) && (wordsNum < 5) && (lws > 13)) || (wordsNum >= 5 && lws > 11) )
		return 'long words:' + longest.substr(0, 20);
	return null;
}

function detectWipe_numbers(text) {
	text = text.replace(/\s+/g, ' ').replace(/(>>)(\d+)/g, '').replace(/http:\/\/.*?(\s|$)/g, '');
	var numProcent = (text.length - text.replace(/[0-9]/g, '').length) / text.length;
	if(text.length > 30 && numProcent > 0.4) return 'numbers: ' + parseInt(numProcent * 100) + '%';
}

function detectWipe_caseSage(text) {
	text = text.replace(/[\.\?!,-]/g, ' ').replace(/\s+/g, ' ');
	var words = text.split(' ');
	var len = words.length;
	if(len <= 4) return null;
	var wrds = 0, ttl = 0;
	for(var i = 0; i < len; i++) {
		if(words[i].length < 5) continue;
		ttl++;
		var word = words[i];
		var up = word.toUpperCase();
		var lw = word.toLowerCase();
		var upc = 0, lwc = 0;
		for(var j = 0; j < word.length; j++) {
			if(up.charAt(j) == lw.charAt(j)) continue;
			if(word.charAt(j) == up.charAt(j)) upc++;
			else if(word.charAt(j) == lw.charAt(j)) lwc++;
		}
		var min = upc < lwc ? upc : lwc;
		if(min >= 2 && lwc + upc >= 5) wrds++;
	}
	var caseProcent = wrds/ttl;
	if(caseProcent >= 0.3 && ttl > 8) return 'cAsEwOrDs: ' + parseInt(caseProcent*100) + '%';
	return null;
}


/*=============================================================================
							INITIALIZATION
=============================================================================*/

function initBoard() {
	var ua = navigator.userAgent;
	nav = {
		Firefox : /firefox|minefield/i.test(ua),
		Opera : /opera/i.test(ua),
		Chrome : /chrome/i.test(ua)};
	var ls = !nav.Firefox && typeof localStorage === 'object' && localStorage != null;
	sav = {
		GM : nav.Firefox,
		local : ls,
		cookie : !ls && !nav.Firefox};
	var dm = location.host.match(/(?:(?:[^.]+\.)(?=org\.))?[^.]+\.[^.]+$/)
	ch = {
		_2ch: dm == '2-ch.ru',
		_0ch: dm == '0chan.ru',
		iich: dm == 'iichan.ru',
		dc: dm == 'dobrochan.ru',
		unyl: dm == 'wakachan.org',
		nowr: dm == 'nowere.net',
		_410: dm == '410chan.ru',
		ua: dm == 'uchan.org.ua'};
	domain = dm;
	wakaba = !(ch.dc || ch._0ch);
	var path = location.pathname;
	main = !/\/res\//.test(path);
	arch = /\/arch/.test(path);
	board = path.substr(1).split('/')[0];
	delform = !ch.dc ? $id('delform') : $x('.//form[contains(@action, "delete")]');
	if(!delform) throw 'stop';
	ndelform = $next(delform);
	Rname = Rmail = Rgoto_tr = Rpass = Rrules = QR = undefined;
	postform = $id('postform');
	if(!postform) return;
	captcha = $n('captcha') || $n('faptcha');
	Rsubm = $x('.//input[@type="submit"]', postform);
	Rrules = $x('.//div[@class="rules"]|.//td[@class="rules"]');
	Rgoto_tr = $id('trgetback');
	if(!ch.unyl) Rpass = $n('password') || $n('postpassword');
	if(ch._2ch) {
		Rname = $n('akane');
		Rmail = $n('nabiki');
		Rtitle = $n('kasumi');
		Rmess = $n('shampoo');
		Rfile = $n('file');
	}
	if(ch._0ch || ch._410) {
		Rname = $n('name');
		Rmail = $n('em');
		Rtitle = $n('subject');
		Rmess = $n('message');
		Rfile = $n('imagefile');
		if(ch._0ch) Rgoto_tr = $up($n('gotothread'), 3);
	}
	if(ch.iich) {
		Rname = $n('nya1');
		Rmail = $n('nya2');
		Rtitle = $n('nya3');
		Rmess = $n('nya4');
		Rfile = $n('file');
		Rgoto_tr = $up($n('postredir'), 3);
	}
	if(ch.dc) {
		Rname = $n('name');
		Rmail = $n('sage');
		Rtitle = $n('subject');
		Rmess = $n('message');
		Rfile = $n('file_1');
	}
	if(ch.unyl || ch.nowr || ch.ua) {
		Rname = $n('field1');
		Rmail = $n('dont_bump') || $n('field2');
		Rtitle = $n('field3');
		Rmess = $n('field4');
		Rfile = $n('file');
	}
}

function initDelform() {
	if(nav.Chrome) toggleDisp(delform);
	if(wakaba && !ch.iich && !ch._410) {
		var thrd_re = /<br clear="left"[<\/p>]*<hr>/i;
		var tNum_re = /(?:<a name=")(\d+)(?:">)/i;
		var threads = delform.innerHTML.split(thrd_re);
		var i = threads.length - 1;
		while(i--) {
			var posts = threads[i].split(/<table>/i);
			var j = posts.length;
			while(j-- > 1) posts[j] = '<table class="replypost" id="post_' + posts[j].match(tNum_re)[1] + '">' + posts[j];
			var tNum = posts[0].match(tNum_re)[1];
			posts[0] = '<div class="oppost" id="post_' + tNum + '">' + posts[0] + '</div>';
			threads[i] = '<div class="thread" id="thread_' + tNum + '">' + posts.join('') + '</div>';
		}
		if(!nav.Chrome) toggleDisp(delform);
		delform = $html(delform, threads.join('<br clear="left"><hr>'));
		if(!nav.Chrome) toggleDisp(delform);
	} 
	else $each($X('./div[starts-with(@id, "thread")]', delform), function(thread) {
			$attr(thread, {'id': $prev($x('.//label', thread)).name, 'class': 'thread'})})
	if(ch.iich || ch._410) {
		$each($X('.//td[@class="reply"]', delform), function(reply) {
			$attr($up(reply, 3), {'class': 'replypost', 'id': 'post_' + reply.id.match(/\d+/)})});
		$each($X('./div[@class="thread"]', delform), function(thread) {
			var op = $new('div', {'class': 'oppost', 'id': 'post_' + thread.id.match(/\d+/)});
			var nodes = thread.childNodes;
			var arr = [], x = 0;
			for(var node, j = 1; node = nodes[j++];) {
				if(node.tagName == 'TABLE' || node.tagName == 'DIV') break;
				arr[x++] = node;
			}
			for(var node, j = 0; node = arr[j++];)
				op.appendChild(node);
			$before(thread.firstChild, [op]);
		});
	}
	if(ch._0ch)
		$each($X('.//div[@class="postnode"]'), function(post) {
			var reply = $x('.//td[@class="reply"]', post);
			post.id = reply ? 'post_' + reply.id.match(/\d+/) : 'oppost_' + $up(post).id.match(/\d+/);
		});

	var px, opx;
	if(wakaba) {
		px = './/table[@class="replypost"]';
		opx = './/div[@class="oppost"]';
	}
	if(ch._0ch) {
		px = './/div[starts-with(@id,"post")]';
		opx = './/div[starts-with(@id,"oppost")]';
	}
	if(ch.dc) {
		px = './/table[starts-with(@class,"replypost")]';
		opx = './/div[starts-with(@class,"oppost")]';
	}
	$each($X(px, delform), function(post, i) {
		Posts[i] = post;
		post.isOp = false;
		post.Count = i + 2;
	});
	$each($X(opx, delform), function(post, i) {
		oPosts[i] = post;
		post.isOp = true;
		post.Count = 1;
	});
	forAll(function(post) {
		var num = post.id.match(/\d+/);
		var msg = getPostMsg(post);
		postByNum[num] = post;
		post.Msg = msg;
		post.Num = num;
		post.Text = getText(msg).trim();
		post.Img = $x('.//img[@class="thumb"]', post);
		post.isSage = isSagePost(post);
	});
}


/*=============================================================================
								MAIN
=============================================================================*/

function Log(txt) {
	var newTime = (new Date()).getTime();
	timeLog += '\n' + txt + ': ' + (newTime - oldTime).toString() + 'ms';
	oldTime = newTime;
}

function doScript() {
	const initTime = (new Date()).getTime();
	oldTime = initTime; timeLog = '';
	initBoard();					Log('initBoard');
	initDelform();					Log('initDelform');
	initCfg();						Log('initCfg');
	readThreadsVisib();				Log('readThreadsVisib');
	readPostsVisib();				Log('readPostsVisib');
	addControls();					Log('addControls');
	forAll(addPostButtons);			Log('addPostButtons');
	if(Cfg[26] == 1) {
		refPrewiev();				Log('refPrewiev')}
	if(Cfg[15] == 1) {
		refMap();					Log('refMap')}
	forAll(doPostFilters);			Log('doPostFilters');
	storeHiddenPosts();				Log('storeHiddenPosts');
	changePostForm();				Log('changePostForm');
	if(Cfg[38] == 1) {
		submitCheck();				Log('submitCheck')}
	if(Cfg[37] != 0 && !main) {
		initNewPosts();				Log('initNewPosts')}
	if(Cfg[12] == 1) {
		forPosts(mergeHidden);		Log('mergeHidden')}
	if(Cfg[23] == 1 && wakaba) {
		forAll(expandHandleImg);
		if(!main && !ch._410)
			allImgExpander();		Log('expandHandleImg')}
	if(Cfg[24] == 1 && main && wakaba) {
		forAll(ajaxExpandPost);		Log('ajaxExpandPost')}
	if(Cfg[28] == 1) {
		searchMP3();				Log('addMP3')}
	if(Cfg[27] == 1) {
		forAll(addYouTube);			Log('addYouTube')}
	scriptStyles();					Log('scriptStyles');
	var endTime = oldTime - initTime;
	timeLog += '\n\nTotal: ' + endTime + 'ms';
	$id('process_time').textContent = 'Время обработки: ' + endTime + 'ms';
}

if(!/submitcheck/.test(window.name)) {
	if(window.opera) $event(doc, {'DOMContentLoaded': doScript});
	else doScript();
}
})();