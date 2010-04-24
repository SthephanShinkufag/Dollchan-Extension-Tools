// Dollchan Extension Tools
// by Sthephan Shinkufag @ Free DollChan
// Copyright (C) 2084, Bender Bending Rodríguez
// ==UserScript==
// @name			Dollchan Extension Tools
// @version		2010-04-23
// @description	Doing some extended profit for russian AIB
// @creator		Sthephan Shinkufag
// @namespace		http://freedollchan.org/scripts
// @include		*0chan.ru*
// @include		*2-ch.ru*
// @include		*iichan.ru*
// @include		*dobrochan.ru*
// @include		*wakachan.org*
// @include		*nowere.net*
// ==/UserScript==

(function() {
var defaultCfg = [
	1,		// 0.	anti-wipe detectors
	0,		// 1.	hide posts with sage
	0,		// 2.	hide posts with theme
	0,		// 3.	hide posts without text
	0,		// 4.	hide posts without img
	0,		// 5.	-
	0,		// 6.	-
	1,		// 7.	apply filter to threads
	0,		// 8.	hide posts by text size
	500,	// 9.		text size in symbols
	0,		// 10.	hide by regexp
	1,		// 11.	additional hider menu
	0,		// 12.	full hide of hidden posts
	0,		// 13.	merge hidden posts
	1,		// 14.	fast preview of hidden posts
	1,		// 15.	>>links map
	1,		// 16.	'quick reply' buttons
	1,		// 17.	'add to favorities' buttons	
	0,		// 18.	show buttons as text
	1,		// 19.	show SAGE in posts
	2,		// 20.	multi captcha
	1,		// 21.	don't show board rules
	1,		// 22.	don't show gotothread
	1,		// 23.	expand images by click
	1,		// 24.	expand shorted posts
	1,		// 25.	hide posts overflow scrollers
	1,		// 26.	>>links preview
	1,		// 27.	YouTube player
	1,		// 28.	mp3 player
	0,		// 29.	move postform down
	530,	// 30.	postform textarea width
	140,	// 31.	postform textarea height
	0,		// 32.	reply with SAGE
	0,		// 33.	apply user password
	'',		// 34.		user password value
	0,		// 35.	apply user name
	'',		// 36.		user name value
	2,		// 37.	upload new posts (0=no, 1=by click, 2=auto)
	0,		// 38.	reply without reload (verify on submit)
	1,		// 39.	open spoilers
	1,		// 40.	don't show password field
	1,		// 41.	convert email to sage field
],

Cfg = [],
Visib = [],
Posts = [],
oPosts = [],
Expires = [],
postByNum = [],
ajaxThrds = {},
doc = document;
const HIDE = 1;
const UNHIDE = 0;
const STORAGE_LIFE = 259200000; // 3 days

//=============================================================================
//								UTILS
//=============================================================================

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
	return el;
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
	var child, len = childs.length;
	for(var i = 0; i < len; i++) {
		child = childs[i];
		if(child) el.appendChild(child);
	}
}
function $before(el, inserts) {
	var len = inserts.length;
	for(var i = 0; i < len; i++)
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
function $New(tag, childs) {
	var el = doc.createElement(tag);
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
function getCoord(a, b) {
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

function serialize(tNum, text) {
	text = text.substring(text.search(/<form[^>]+del/) + text.match(/<form[^>]+del[^>]+>/).toString().length, /class="userdelete"/.test(text) ? text.indexOf('class="userdelete"') - 10 : (/deletebuttons/.test(text) ? text.indexOf('deletebuttons') - 70 :  text.lastIndexOf('<form') - 5)).split(/<table(?! class="exif")[^>]*>/);
	ajaxThrds[tNum] = {keys: []};
	var len = text.length;
	for(var i = 0; i < len; i++) {
		var pNum = (text[i].match(/(?:<input[^\d]+)(\d+)(?:[^>]+>)/) || text[i].match(/(?:<a name="i)(\d+)(?:">)/))[1];
		ajaxThrds[tNum].keys.push(parseInt(pNum));
		ajaxThrds[tNum][pNum] = text[i].substring(text[i].indexOf(pNum), /<\/td/.test(text[i]) ? text[i].lastIndexOf('</td') : (/<\/div/.test(text[i]) ? text[i].lastIndexOf('</div') + 6 : text[i].lastIndexOf('</blockquote') + 13));
		ajaxThrds[tNum][pNum] = ajaxThrds[tNum][pNum].substring(ajaxThrds[tNum][pNum].indexOf('>') + 1);
	}
}

function $ajax(addr, b, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			if(xhr.status == 200) {
				serialize(addr, xhr.responseText);
				callback(null);
			} else callback('HTTP ' + xhr.status + ' ' + xhr.statusText);
		}
	};
	xhr.open('GET', '/' + b + '/res/' + addr + '.html', true);
	xhr.send(null);
}


//=============================================================================
//							STORAGE / CONFIG
//=============================================================================

function setCookie(name, value, life) {
	if(!name) return;
	var life = (life == 'delete') ? -10 : STORAGE_LIFE;
	var date = (new Date((new Date()).getTime() + life)).toGMTString();
	doc.cookie = escape(name) + '=' + escape(value) + ';expires=' + date + ';path=/';
}

function getCookie(name) {
	var cookieJar = doc.cookie.split('; ');
	var i = cookieJar.length;
	while(i--) {
		var oneCookie = cookieJar[i].split('=');
		if(oneCookie[0] == escape(name)) return unescape(oneCookie[1]);
	}
}

function turnCookies(name) {
	var max = ch._0ch ? 10 : 15;
	var data = getCookie(setID('Cookies'));
	var arr = data ? data.split('|') : [];
	arr[arr.length] = name;
	if(arr.length > max) {
		setCookie(arr[0], '', 'delete');
		arr.splice(0, 1);
	}
	setCookie(setID('Cookies'), arr.join('|'));
}

function getConfigValue(name) {
	if(sav.GM) return GM_getValue(name);
	if(sav.local) return localStorage.getItem(name);
	return getCookie(name);
}

function setConfigValue(name, value) {
	if(sav.GM) {GM_setValue(name, value); return}
	if(sav.local) {localStorage.setItem(name, value); return}
	setCookie(name, value);
}

function setID(name, pNum) {
	var c = !sav.cookie ? '_' + domain : '';
	if(name == 'Posts' || name == 'Threads')
		return 'DESU_' + name + c + '_' + board + (!pNum ? '' : '_' + pNum);
	if(name == 'Config' || name == 'Cookies' || name == 'RegExpr')
		return 'DESU_' + name + c;
	else return 'DESU_' + name;
}

function setDefaultCfg() {
	Cfg = defaultCfg;
	setConfigValue(setID('Config'), defaultCfg.join('|'));
}

function saveCfg(num, val) {
	Cfg[num] = val;
	setConfigValue(setID('Config'), Cfg.join('|'));
}

function initCfg() {
	var data = getConfigValue(setID('Config'));
	if(!data) setDefaultCfg();
	else Cfg = data.split('|');
	if(!getConfigValue(setID('RegExpr')))
		setConfigValue(setID('RegExpr'), '');
}

function getVisib(pNum) {
	var key = !sav.cookie ? board + pNum : postByNum[pNum].Count;
	if(key in Visib) return Visib[key];
	return null;
}

function setVisibilityCheap(post, vis) {
	var pNum = post.Num;
	if(!sav.cookie) {
		Visib[board + pNum] = vis;
		Expires[board + pNum] = (new Date()).getTime() + STORAGE_LIFE;
	} else Visib[post.Count] = vis;
	post.Vis = vis;
	if(Cfg[12] == 1) post.style.display = (vis == HIDE) ? 'none' : '';
}

function readPostsVisib() {
	if(!sav.cookie) {
		var data = getConfigValue(setID('Posts'));
		if(!data) return;
		var arr = data.split('-');
		var i = arr.length/3;
		while(i--) {
			if((new Date()).getTime() < arr[i*3 + 2]) {
				Visib[arr[i*3]] = arr[i*3 + 1];
				Expires[arr[i*3]] = arr[i*3 + 2];
			} else setConfigValue(setID('Posts'), arr.splice(i*3, 3).join('-'));
		}
	} else if(!main) {
		var data = getConfigValue(setID('Posts', oPosts[0].Num));
		if(!data) return;
		var len = data.length;
		for(var i = 0; i < len; i++)
			Visib[i + 1] = data[i];
	}
	forAll(function(post) {post.Vis = getVisib(post.Num)});
}

function storePostsVisib() {
	if(!sav.cookie) {
		var arr = [];
		for(var key in Visib)
			arr[arr.length] = key + '-' + Visib[key] + '-' + Expires[key];
		setConfigValue(setID('Posts'), arr.join('-'));
	} else {
		if(!main) {
			var name = setID('Posts', oPosts[0].Num);
			if(!getConfigValue(name)) turnCookies(name);
			setConfigValue(name, Visib.join(''));
		}
	}
}

function storeThreadVisib(post, vis) {
	if(post.Visibl == vis) return;
	post.Visibl = vis;
	var key = board + post.Num;
	var data = getConfigValue(setID('Threads'));
	var arr = data ? data.split('-') : [];
	if(vis == HIDE) {
		if(sav.cookie && arr.length > 80) arr.splice(0, 1);
		arr[arr.length] = key;
	} else {
		var i = arr.length;
		while(i--) if(arr[i] == key) arr.splice(i, 1);
	}
	setConfigValue(setID('Threads'), arr.join('-'));
}

function readThreadsVisib() {
	var data = getConfigValue(setID('Threads'));
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
	var f = $x('.//span[@class="filetitle" or @class="replytitle"]', post);
	if(f) f = f.textContent.trim();
	if(!f || f == '') f = post.Text.trim();
	f = !sav.cookie ? f.substring(0, 70) : f.substring(0, 25);
	f = f.replace(/\|/g, '').replace(/\s/g,' ');
	var pNum = post.Num;
	var data = getConfigValue(setID('Favorities'));
	var arr = data ? data.split('|') : [];
	if(sav.cookie && arr.length/4 > 25) return;
	for(var i = 0; i < arr.length/4; i++)
		if(arr[i*4 + 1] == board && arr[i*4 + 2] == pNum) return;
	arr[arr.length] = domain + '|' + board + (arch ? '/arch|' : '|') + pNum + '|' + f;
	setConfigValue(setID('Favorities'), arr.join('|'));
}

function removeFavorities(node) {
	var key = $x('.//a', node).textContent.replace('arch/', '').replace('res/', '').split('/');
	var arr = getConfigValue(setID('Favorities')).split('|');
	for(var i = 0; i < arr.length/4; i++)
		if(arr[i*4] == key[0] && arr[i*4 + 1].split('/')[0] == key[1] && arr[i*4 + 2] == key[2])
			arr.splice(i*4, 4);
	$del($up(node, 2));
	if(arr.length == 0) $id('favorities_div').appendChild($txt(' [Избранные треды отсутствуют]'));
	setConfigValue(setID('Favorities'), arr.join('|'));
}


//=============================================================================
//						CONTROLS / COMMON CHANGES
//=============================================================================

function toggleCheck(box) {box.checked = !box.checked};
function toggleCfg(num) {
	Cfg[num] = Cfg[num] == 0 ? 1 : 0;
	saveCfg(num, Cfg[num]);
}
function chkBox(boxEvent, CfgNum, boxId) {
	var box = $new('input', {
		'type': 'checkbox'}, {
		'click': function() {boxEvent(CfgNum)}});
	box.checked = Cfg[CfgNum] == 1;
	if(boxId) box.id = boxId;
	return box;
}
function trBox(boxEvent, CfgNum, boxIndex, boxId) {
	return $New('tr', [chkBox(boxEvent, CfgNum, boxId), $txt(boxIndex)])
}

function addControls()
{
	// Toolbar header
	var postarea = $x('.//div[@class="postarea" or @align="center"]') || delform;
	var tools = $new('div', {'html': '<input title="Показать настройки скрипта" value="Настройки" type="button"> <input title="Показать список скрытых постов" value="Скрытые посты" type="button"> <input title="Показать избранные треды" value="Избранное" type="button"> <input title="Обновить страницу" value="Обновить" type="button">' + ((main && postform) ? ' <input title="Показать форму ответа" value="Создать тред" type="button">' : '') + '<div style="font-size: small; width: 370px; border: 1px solid grey; margin: 7px; display: none; overflow: hidden;" class="reply"><div title="2010-04-23 version" style="cursor: pointer; font-weight: bold; width: 100%; text-align: center; font-family: sans-serif;">Dollchan Extension Tools</div><table style="padding: 5px; overflow: hidden;"></table></div><div id="hiddenposts_div"></div><div id="favorities_div"></div>'});
	var table = $x('.//table', tools);
	var btn = $X('.//input', tools);
	$event(btn.snapshotItem(0), {'click': function() {toggleDisp($up(table))}});
	$event(btn.snapshotItem(1), {'click': hiddenPostsPreview});
	$event(btn.snapshotItem(2), {'click': toggleFavorites});
	$event(btn.snapshotItem(3), {'click': function(e) {
		window.location.reload();
		e.stopPropagation();
		e.preventDefault();
	}});
	if(main && postform) $event(btn.snapshotItem(4), {'click': function() {
		toggleDisp($x('.//div[@class="postarea"]', $up(delform)));
		toggleDisp($prev(delform));
	}});
	$before(postarea, [tools, $new('div', {'class': 'logo'}), $new('hr')]);
	
	// Config control elements
	$append(table, [$New('tbody', [
		trBox(toggleCfg, 0, ' Анти-вайп детекторы'),
		$if(!ch.iich, trBox(toggleSage, 1, ' Скрывать sage посты', 'sage_hider')),
		trBox(toggleTitle, 2, ' Скрывать посты с полем "Тема"'),
		trBox(toggleNotext, 3, ' Скрывать посты без текста', 'notext_hider'),
		trBox(toggleNoimage, 4, ' Скрывать посты без изображений', 'noimage_hider'),
		$New('tr', [
			chkBox(toggleMaxtext, 8, 'maxtext_hider'),
			$txt(' Скрывать с текстом больше '),
			$new('input', {
				'type': 'text',
				'id': 'maxtext_field',
				'value': Cfg[9],
				'size': 4}, {
				'keypress': function(e) {if(e.which == 13) {e.preventDefault(); e.stopPropagation()}}}),
			$txt(' символов')
		]),
		$New('tr', [
			chkBox(toggleRegexp, 10, 'regexp_hider'),
			$txt(' Скрытие по выражению '),
			$new('span', {
				'html': '[<a>?</a>]',
				'style': 'cursor:pointer'}, {
				'click': function() {alert('Поиск в тексте/теме поста:\nвыражение\n\nРегулярные выражения: $exp выражение\n$exp /[bб].[tт]+[hх].[rр][tт]/i\n$exp /[sс][aа][gж][eа]/i\n\nКартинки: $img [<,>,=][вес в кб][@ширxвыс]\n$img <35@640x480\n$img >@640x480\n$img =35\n\nИмя/трипкод: $name [имя][!трипкод][!!трипкод]\n$name Sthephan!ihLBsDA91M\n$name !!PCb++jGu\nЛюбой трипкод: $alltrip')}}),
			$new('input', {
				'type': 'button',
				'value': 'Применить',
				'style': 'float:right'}, {
				'click': applyRegExp}),
			$new('br'),
			$new('textarea', {
				'id': 'regexp_field',
				'value': getConfigValue(setID('RegExpr')),
				'rows': 5,
				'cols': 41})
		]),
		trBox(toggleStrongHide, 12, ' Полностью скрывать посты'),
		trBox(toggleCfg, 13, ' Объединять скрытые посты*'),
		trBox(toggleCfg, 14, ' Быстрый просмотр скрытых постов'),
		trBox(toggleCfg, 11, ' Дополнительное меню по кнопке скрытия'),
		trBox(toggleCfg, 7, ' Применять фильтр к тредам'),
		$new('hr'),
		trBox(toggleCfg, 15, ' Карта ответов*'),
		$if(postform, trBox(toggleCfg, 16, ' Кнопки быстрого ответа*')),
		trBox(toggleCfg, 17, ' Кнопки добавления в избранное*'),
		trBox(toggleCfg, 18, ' Отображать кнопки в виде текста*'),
		$if(!ch.iich && !ch.dc,
			trBox(toggleCfg, 19, ' Отображать сажу*')),
		$if(wakaba, trBox(toggleCfg, 23, ' Раскрывать изображения по клику*')),
		$if(wakaba, trBox(toggleCfg, 24, ' Раскрывать сокращенные посты*')),
		$if(ch._2ch, trBox(toggleCfg, 25, ' Убирать прокрутку с постов*')),
		trBox(toggleCfg, 26, ' Просмотр постов по >> ссылкам*'),
		trBox(toggleCfg, 27, ' Просмотр YouTube ссылок*'),
		trBox(toggleCfg, 28, ' Проигрыватель mp3*'),
		trBox(toggleCfg, 39, ' Раскрывать спойлеры*'),
		$if(Rmail, trBox(toggleCfg, 41, ' Кнопка Sage вместо E-mail*')),
		$if(postform, trBox(toggleCfg, 29, ' Форма ответа снизу*')),
		trBox(toggleCfg, 38, ' Постить без перезагрузки (проверять ответ)*'),
		$New('tr', [
			$new('select', {
				'id': 'upload_select',
				'html': '<option value="0">Отключена</option><option value="1">По клику</option><option value="2">Авто</option>'}, {
				'change': function() {saveCfg(37, this.selectedIndex)}}),
			$txt(' подгрузка новых постов в треде*')
		]),
		$if(Rname, $New('tr', [
			$new('input', {
				'type': 'text',
				'id': 'usrname_field',
				'value': Cfg[36],
				'size': 20}),
			chkBox(toggleUserName, 35, 'usrname_box'),
			$txt(' Постоянное имя')
		])),
		$if(Rpass, $New('tr', [
			$new('input', {
				'type': 'text',
				'id': 'usrpass_field',
				'value': Cfg[34],
				'size': 20}),
			chkBox(toggleUserPassw, 33, 'usrpass_box'),
			$txt(' Постоянный пароль')
		])),
		$New('tr', [
			$txt('Не отображать: '),
			$if(Rrules, chkBox(toggleBoardRules, 21)),
			$if(Rrules, $txt(' правила ')),
			$if(Rgoto_tr, chkBox(toggleGotoThread, 22)),
			$if(Rgoto_tr, $txt(' поле goto ')),
			$if(Rpass, chkBox(togglePassword, 40)),
			$if(Rpass, $txt(' пароль '))
		]),
		$if(ch._2ch, $New('tr', [
			$txt(' Количество отображаемых капч* '),
			$new('select', {
				'id': 'capnum_select',
				'html': '<option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>'}, {
				'change': function() {saveCfg(20, this.selectedIndex)}})
		])),
		$new('hr'),
		$New('tr', [
			$new('span', {
				'id': 'process_time',
				'style': 'font-style:italic;cursor:pointer'}, {
				'click': function() {alert(timeLog)}}),
			$new('input', {
				'type': 'button',
				'value': 'Сброс настроек',
				'style': 'float:right'}, {
				'click': function() {setDefaultCfg(); window.location.reload()}})
		])
	])]);
	$id('upload_select').selectedIndex = Cfg[37];
	if(ch._2ch) $id('capnum_select').selectedIndex = Cfg[20];
}

//---------------------------Hidden posts preview list-------------------------

function hiddenPostsPreview() {
	var div = $id('hiddenposts_div');
	if(div.hasChildNodes()) {delChilds(div); return}
	var table = $new('table', {'align': 'left'});
	div.appendChild(table);
	var clones = [];
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
				modPostVisib(node, node.vis);
			}}(clone)});
		table.insertRow(-1).appendChild(clone);
	};
	if(!table.hasChildNodes()) {div.appendChild($txt(' [Скрытые посты отсутствуют]')); return}
	$append(table.insertRow(-1), [
		$new('input', {
			'type': 'button',
			'value': 'Раскрыть все'}, {
			'click': function() {
				if(this.value == 'Раскрыть все') {
					this.value = 'Вернуть назад';
					for(var clone, i = 0; clone = clones[i++];)
						setPostVisib(clone.pst, UNHIDE);
				} else {
					this.value = 'Раскрыть все';
					for(var clone, i = 0; clone = clones[i++];)
						setPostVisib(clone.pst, clone.vis);
				}
			}}),
		$new('input', {
			'type': 'button',
			'value': 'Сохранить изменения'}, {
			'click': function() {
				for(var clone, i = 0; clone = clones[i++];)
					if(clone.vis != HIDE) setPostVisib(clone.pst, UNHIDE);
				storePostsVisib();
				delChilds(div);
			}})
	]);
}

//------------------------'Favorite' threads prewiev list----------------------

function toggleFavorites() {
	var div = $id('favorities_div');
	if(div.hasChildNodes()) {delChilds(div); return}
	var data = getConfigValue(setID('Favorities'));
	if(!data) {div.appendChild($txt(' [Избранные треды отсутствуют]')); return}
	else var arr = data.split('|');
	var table = $new('table', {'align': 'left'});
	div.appendChild(table);
	var len = arr.length/4;
	for(var i = 0; i < len; i++) {
		var url = arr[i*4] + '/' + arr[i*4 + 1] + '/res/' + arr[i*4 + 2];
		var title = arr[i*4 + 3];
		if((!sav.cookie && title.length >= 70) || (sav.cookie && title.length >= 25)) title += '..';
		var note = $new('span', {
			'html': parseInt(i + 1) + '. ' + '<a href="' + 'http://' + url + '.html' + '">' + url + '</a> - ' + title});
		$before($x('.//a', note), [$new('span', {
			'class': 'hide_icn',
			'title': 'Убрать запись',
			'style': 'vertical-align:middle'}, {
			'click': function(node) {return function() {removeFavorities(node)}} (note)})]);
		table.insertRow(-1).insertCell(-1).appendChild(note);
	}
}

//-------------------------------Changes in postform---------------------------

function toggleBoardRules() {toggleCfg(21); toggleDisp(Rrules)}
function toggleGotoThread() {toggleCfg(22); toggleDisp(Rgoto_tr)}
function togglePassword() {toggleCfg(40); toggleDisp($up(Rpass, 2))}

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
		'src': (!isMain ? 
			'/' + board + '/captcha.pl?key=res' + tNum + '&amp;dummy=' + rand10() :
			'/' + board + '/captcha.pl?key=mainpage&amp;dummy=' + rand10())}, {
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
		sage.innerHTML = 'без сажи';
		if(mail.type == 'text') mail.value = '';
		else mail.checked = false;
	} else {
		sage.innerHTML = '<span class="sage_icn" style="vertical-align:middle"></span> SAGE';
		if(mail.type == 'text') mail.value = 'sage';
		else mail.checked = true;
	}
}

function sageBtnEvent(e) {
	toggleCfg(32);
	sageBtnFunc(Rmail, postform);
	if(QR) sageBtnFunc($prev(e.target), QR);
	e.preventDefault();
	e.stopPropagation();
}

function textareaResizer(form) {
	var node = $x('.//textarea', form);
	$event(node, {'keypress': function(e) {
		var code = e.charCode || e.keyCode;
		if((code == 33 || code == 34) && e.which == 0) {e.target.blur(); window.focus()}
	}});
	var resmove = function(e) {
		node.style.width = e.pageX - getCoord(node, 'offsetLeft') + 'px';
		node.style.height = e.pageY - getCoord(node, 'offsetTop') + 'px';
	};
	var resstop = function() {
		$revent(doc.body, {'mousemove': resmove, 'mouseup': resstop});
		if(form.id != 'quick_reply') {
			saveCfg(30, parseInt(node.style.width));
			saveCfg(31, parseInt(node.style.height));
		}
	};
	var x = !ch._0ch ? 14 : 19;
	var y = 6;
	if(nav.Opera) y = 9;
	if(nav.Chrome) y = 2;
	node.style.cssText = 'width:' + Cfg[30] + 'px; height:' + Cfg[31] + 'px';
	$up(node).appendChild($new('img', {
		'id': 'txt_resizer',
		'src': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABlBMVEUAAAAAAAClZ7nPAAAAAWJLR0QAiAUdSAAAAAF0Uk5TAEDm2GYAAAAWSURBVHjaY2BAAYyMDMNagBENYAgAABMoAD3fBUDWAAAAAElFTkSuQmCC',
		'style': 'position:relative;left:-' + x + 'px;top:' + y + 'px;cursor:se-resize'}, {
		'mousedown': function(e) {
			e.preventDefault();
			$event(doc.body, {'mousemove': resmove, 'mouseup': resstop});
		}}));
}

function changePostForm() {
	textareaResizer(postform);
	if(ch._2ch) {
		$del($x('.//a', logo));
		if(captcha && Cfg[20] == 0) toggleDisp($up(captcha, 2));
	}
	if(wakaba && !main)
		$before($next($x('.//a[text()="Назад" or text()="Return"]')), [
			$new('span', {'html': '[<a href="' + window.location + '" target="_blank">В новой вкладке</a>]'})]);
	if(Rname) Rname.size = 35;
	if(Rmail) Rmail.size = 35;
	if(Rtitle) Rtitle.size = 35;
	if(Rfile) Rfile.size = 35;
	if(Rvideo) Rvideo.size = 35;
	if(captcha) {
		$attr(captcha, {'size': 35, 'autocomplete': 'off'});
		$event(captcha, {'keypress': forceCaptcha});
	}
	if(Cfg[21] == 1) toggleDisp(Rrules);
	if(Cfg[40] == 1 && Rpass) toggleDisp($up(Rpass, 2));
	if(Cfg[35] == 1 && Rname) setTimeout(function() {Rname.value = Cfg[36]} , 10);
	if(Cfg[22] == 1 && Rgoto_tr) toggleDisp(Rgoto_tr);
	del_passw = $X('.//input[@type="password"]').snapshotItem(1);
	if(del_passw)
		setTimeout(function() {
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
	if(captcha && wakaba) {
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
		$append($up(Rmail), [
			$txt(' '),
			$new('span', {'id': 'sage_btn', 'style': 'cursor:pointer'}, {'click': sageBtnEvent})
		]);
		sageBtnFunc(Rmail, postform);
	}
}

//----------------------------Text formatting buttons--------------------------

function textFormatPanel(form) {
	var m = Cfg[18] == 0;
	var textBtns = $new('div', {
		'id': 'txt_btns',
		'html': '&nbsp;',
		'style': 'padding: 0 0 2px 0'});
	$append(textBtns, [
		$new('span', {'title': 'Жирный', 'style': (m ? 'padding:0 27px 27px 0; background:url(data:image/gif;base64,R0lGODlhFwAWAMQAAP//////AP8A//8AAAD//wD/AAAA/wAAAPb2+Onq7Bc/e053qitemNXZ3Wmdypm922hoaP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAXABYAAAWTYBQtZGmepjg+bOu+7hIxD2LfeI4/DK3/Op4PSEQIazjIYbmEQII95E3JZD530ZzyajtwbUJHYjzekhPLc8LRE5/NZa+azXCTqdWDet1W46sQc20NhIRbhQ2HhXQOiIleiFSIdAuOioaQhQs9lZF5TI6bDJ2Ff02ODaKkqKyanK2whKqxsJsjKLi4Kgq8vb6/viIhADs=) no-repeat; cursor:pointer;' : 'cursor:pointer'), 'html': (!m ? '<strong>[<a>B</a>]</strong> ' : '')}, {'click': boldText}),
		$new('span', {'title': 'Наклонный', 'style': (m ? 'padding:0 27px 27px 0; background:url(data:image/gif;base64,R0lGODlhFwAWAMQAAP//////AP8A//8AAAD//wD/AAAA/wAAAPb2+Onq7Bc/e053qitemNXZ3Wmdypm922hoaP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAXABYAAAV5YBQtZGmepjg+bOu+7hIxD2LfeI4/DK3/Op4PSEQIa0TI4XcsKpk9ZBHKcCSuWKwym3X0rFztIXz1VskJJQRtBofV7G9jTp8r6/g2nn7fz80Lfmp+cws9gXt9hIYMiHiKfoyOhIuHlJeSl5SGIyienioKoqOkpaQiIQA7) no-repeat; cursor:pointer;' : 'cursor:pointer'), 'html': (!m ? '<strong>[<em><a>I</a></em>]</strong> ' : '')}, {'click': italicText}),
		$if(!ch.dc, $new('span', {'title': 'Подчеркнутый', 'style': (m ? 'padding:0 27px 27px 0; background:url(data:image/gif;base64,R0lGODlhFwAWAMQAAP//////AP8A//8AAAD//wD/AAAA/wAAAPb2+Onq7Bc/e053qitemNXZ3Wmdypm926CgoGhoaP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAXABYAAAWPoCQtZGmepjg+bOu+7iIxD2LfeI4/DK3/Op4PSEQIazjIIbnMHXNKZrCHvEWtzV3Pkeh2IwdvAizuOrZlslctPjO4YvY4XHbD1/Rv3mtv+P1gEH9gf399hWARigeMhX5uC44NYIwQSpILPZGSnI6ZDJudop+hDYynqI1/pKKtrK2dmSMotLQqCri5uru6IiEAOw==) no-repeat; cursor:pointer;' : 'cursor:pointer'), 'html': (!m ? '<strong>[<u><a>U</a></u>]</strong> ' : '')}, {'click': underlinedText})),
		$new('span', {'title': 'Зачеркнутый', 'style': (m ? 'padding:0 27px 27px 0; background:url(data:image/gif;base64,R0lGODlhFwAWAMQAAP//////AP8A//8AAAD//wD/AAAA/wAAAPb2+Onq7Bc/e053qitemNXZ3Wmdypm922hoaE1NTf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAXABYAAAWNoCQtZGmepjg+bOu+7iIxD2LfeI4/DK3/Op4PSEQIazrIYQn5HXXL6KGZe+KUkIQWW+05tOAlWCseO7zjBDbNPjO+aog8Kq/XtW54en5g470NgYKDWIOBeYNLhoqGbguEU4KFhgs9j4lSBxGGgZUMl5BMnJ2Wo6aDnqCno6mrp5UjKLKyKgq2t7i5uCIhADs=) no-repeat; cursor:pointer;' : 'cursor:pointer'), 'html': (!m ? '<strong>[<a>S</a>]</strong> ' : '')}, {'click': strikeText}),
		$new('span', {'title': 'Спойлер', 'style': (m ? 'padding:0 27px 27px 0; background:url(data:image/gif;base64,R0lGODlhFwAWAMQAAP//////AP8A//8AAAD//wD/AAAA/wAAAPb2+Onq7Bc/e053qitemNXZ3Wmdypm922hoaP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAXABYAAAV7YBQtZGmepjg+bOu+7hIxD2LfeI4/DK3/Op4PSEQIa0Xg0XZoOp9Q2xIBqVqvWGnPkUhgv9euY9sFm8Vkr/mLZnDV63Bi7G404lg73WGH+p96PQt2hIWGhguCh4uHiQyDjJENjpCSi5SWjJiZjQwjKKCgKgqkpaanpiIhADs=) no-repeat; cursor:pointer;' : 'cursor:pointer'), 'html': (!m ? '<strong>[<a>%</a>]</strong> ' : '')}, {'click': spoilerText}),
		$new('span', {'title': 'Код', 'style': (m ? 'padding:0 27px 27px 0; background:url(data:image/gif;base64,R0lGODlhFwAWAMQAAP//////AP8A//8AAAD//wD/AAAA/wAAAPb2+Onq7Bc/e053qitemNXZ3Wmdypm922hoaP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAXABYAAAWGYBQtZGmepjg+bOu+7hIxD2LfeI4/DK3/Op4PSEQIa0Xg8Qc5OCGQYA+Jazqv0V3Pkeh2rd4ENJxwbMlNsrp8DjvXZDOD6z7Aw3JHY7938v+AeYBNgIUNcguDfnxQgAs9iYpXT46QhlYHjZUMkYaee4+cn6OhnaOFjyMoq6sqCq+wsbKxIiEAOw==) no-repeat; cursor:pointer;' : 'cursor:pointer'), 'html': (!m ? '<strong>[<a>C</a>]</strong> ' : '')}, {'click': codeText}),
		$new('span', {'title': 'Цитировать выделенное', 'style': ((Cfg[18] == 0) ? 'padding:0 27px 27px 0; background:url(data:image/gif;base64,R0lGODlhFwAWAMQAAP//////AP8A//8AAAD//wD/AAAA/wAAAPb2+Onq7Bc/e053qitemNXZ3Wmdypm922hoaP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAXABYAAAWEYBQtZGmepjg+bOu+7hIxD2LfeI4/DK3/Op4PSEQIa7jDoWg75iAQZdGpg0p/Qkdiy+VaD92to6cNh7/dMaNsPke5anabq4TAyY28ft+oQ/ZxfHt+gmoLgn0HUIgNCz2Hg4p/jI2PfIuUeY4MkJmIm52efKCinwwjKKmpKgqtrq+wryIhADs=) no-repeat; cursor:pointer' : 'cursor:pointer'), 'html': ((Cfg[18] == 1) ? '<strong>[<a>&gt;</a>]</strong>' : '')}, {'mouseover': function() {quotetxt = doc.getSelection()}, 'click': function() {InsertInto($x('.//textarea', form), '>' + quotetxt.replace(/\n/gm, '\n>') + '\n')}})
	]);
	$before($x('.//textarea', form), [textBtns]);
}

//----------------------------------Quick Reply--------------------------------

function quickReply(post) {
	var tNum = getThread(post).id.match(/\d+/);
	var pNum = post.Num;
	if(!QR) {
		var first = true;
		QR = postform.cloneNode(true);
		$attr(QR, {'class': 'reply', 'id': 'quick_reply'});
		$del($x('.//img[@id="txt_resizer"]', QR));
		$del($x('.//div[@id="txt_btns"]', QR));
		textareaResizer(QR);
		textFormatPanel(QR);
		$x('.//textarea', QR).value = '';
		var sage = $x('.//span[@id="sage_btn"]', QR);
		if(sage) $event(sage, {'click': sageBtnEvent});
		if(ch._0ch && captcha) {
			captcha.value = ' ';
			var a = $up($x('.//img[@id="captchaimage"]', QR));
			$before(a, [$new('img', {
				'src': 'http://www.0chan.ru/captcha.php?' + Math.random(),
				'style': 'cursor:pointer'}, {
				'click': function(e) {this.src = this.src.replace(/\?[^?]+$|$/, '?' + Math.random())}})]);
			$del(a);
		}
	}
	if($next(post) == QR) {toggleDisp(QR); return}
	$after(post, [QR]);
	QR.style.display = 'block';
	if(main) {
		if(wakaba) {
			if(first) $before(
				$x('.//div[@class="trap" or @class="its_a_tarp"]', QR) ||
				$x('.//input[@name="name" or @name="akane"]', QR),
				[$new('input', {'type': 'hidden', 'id': 'thr_id', 'name': 'parent', 'value': tNum})]);
			else $id('thr_id').value = tNum;
		}
		if(ch.dc) $x('.//input[@name="thread_id"]', QR).value = tNum;
		if(ch._0ch) {
			$x('.//input[@name="replythread"]', QR).value = tNum;
			$x('.//span[@id="posttypeindicator"]', QR).textContent = 'ответ на ' + tNum;
		}
	}
	var cap = $x('.//input[@name="captcha"]', QR);
	if(cap) $event(cap, {'keypress': forceCaptcha});
	if(cap && wakaba) {
		if(ch._2ch) {
			$each($X('.//img[@id="imgcaptcha"]', QR),
				function(img) {$del(img)});
			for(var i = 0; i < Cfg[20]; i++)
				$up(cap).appendChild(getCaptcha(false, tNum));
		} else {
			var img = $x('.//img', $up(cap));
			$event(img, {'click': function(e) {capRefresh(this)}});
		}
		if(ch.iich) img.src = '/cgi-bin/captcha.pl/' + board + '/?key=res' + tNum + '&amp;dummy=' + rand10();
		if(ch.unyl || ch.nowr) img.src = '/' + board + '/captcha.pl?key=res' + tNum + '&amp;dummy=' + rand10();
	}
	var ms = Rmess.value.trim();
	InsertInto($x('.//textarea', QR), ((first && ms != '') ? ms + '\n' : '') + '>>' + pNum + '\n');
	$event($x('.//input[@type="submit"]', QR), {'click': function() {Rmess.value = $x('.//textarea', QR).value}});
}

//----------------------Check for correct reply submit-------------------------

function iframeLoad(e) {
	var frame = (e.srcElement || e.originalTarget).contentDocument;
	if(!frame.body || frame.location == 'about:blank' || !frame.body.innerHTML) return;
	var err = frame.getElementsByTagName('H2')[0] || frame.getElementsByTagName('H1')[0];
	if(!ch.dc && (err || !frame.getElementById('delform'))) {
		if(!err) err = 'Ошибка:\n' + frame.innerHTML;
		alert(err.firstChild.textContent);
		frame.location.replace('about:blank');
		return;
	}
	if(/error/.test(frame.location.pathname)) {
		var nodes = frame.getElementsByTagName('TD');
		for(var node, i = 0; node = nodes[i++];)
			if(node.className == 'post-error') alert('Ошибка: ' + node.textContent);
		frame.location.replace('about:blank');
		return;
	}
	Rmess.value = '';
	if(Rfile) Rfile.value = '';
	if(QR || !main) {
		if(main) expandThread(postByNum[getThread(QR).id.match(/\d+/)], 8);
		else {$del(QR); showNewPosts()}
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
	$x('.//body').appendChild($new('div', {
		'html': '<iframe name="submitcheck" id="submitcheck" src="about:blank" style="visibility:hidden; width:0px; height:0px; border:none;"></iframe>'}));
	$attr(postform, {'target': 'submitcheck'});
	if(nav.Opera) $event(window, {'DOMFrameContentLoaded': iframeLoad});
	else $event($id('submitcheck'), {'load': iframeLoad});
}

//---------------------------Append styles for elements------------------------

function addScriptStyles() {
	var txt = 'td.reply {width: auto !important}  .pcount {font-size:13px;font-weight:bold;cursor:default;color:#4f7942}  .pcountb {font-size:13px;font-weight:bold;cursor:default;color:#c41e3a}  .hide_icn {padding-left: 18px; cursor:pointer; background:url(data:image/gif;base64,R0lGODlhDgAPALMAAP//////AP8A//8AAAD//wD/AAAA/wAAAN3d3cDAwJmZmYCAgGBgYEtLS////wAAACH5BAEAAA4ALAAAAAAOAA8AAARU0MlJq7o4X7dQ+mCILAuohOdHfgpQJguQLowSA+7tKkxt4wgEbnHpkWhCAIJxNJIYyWWTSQMmqUYGDtBobJmMxhOAJZO6LM3l0/WE3oiGo0uv0x0RADs=) no-repeat}  .unhide_icn {padding-left: 18px; cursor:pointer; background:url(data:image/gif;base64,R0lGODlhDgAPALMAAP//////AP8A//8AAAD//wD/AAAA/wAAAN3d3cDAwJmZmYCAgGBgYEtLS////wAAACH5BAEAAA4ALAAAAAAOAA8AAARN0MlJq7o4X7dQ+mCILEuYMIxJfheDIMz1LTHGAEDd1uidozsaAvciMmhHF3EIgCFJPVwPeiTRpFZaI+tyWhsN1g7zAXtMooYDzG6zHREAOw==) no-repeat}  .rep_icn {padding-left: 18px; cursor:pointer; background:url(data:image/gif;base64,R0lGODlhDgAPALMAAP//////AP8A//8AAAD//wD/AAAA/wAAAN3d3cDAwJmZmYCAgGBgYEtLS////wAAACH5BAEAAA4ALAAAAAAOAA8AAARO0MlJq7o4X7dQ+mCILAt4hSD5LQCghgtzsa27YIys0LV75SRGr4VgxIyxIaB4DPYQiEYQ2SBGpUFsA9rAkhZdUFejSHQ9KFHD0W27244IADs=) no-repeat}  .sage_icn {padding-left: 18px; cursor:pointer; background:url(data:image/gif;base64,R0lGODlhDgAPALMAAP//////AP8A//8AAAD//wD/AAAA/wAAAO7u7oCAgGBgYEtLS////wAAAAAAAAAAACH5BAEAAAwALAAAAAAOAA8AAARBkMlJq7o4X6aS/6B3fVonmomCrAiqLNiyeHIMXwuL3K/sz4mfUKYbCmnGxUG3OvwwS9bBlolObSfF4WpaMJI/RgQAOw==) no-repeat}  .expthr_icn {padding-left: 18px; cursor:pointer; background:url(data:image/gif;base64,R0lGODlhDgAPALMAAP//////AP8A//8AAAD//wD/AAAA/wAAAN3d3cDAwJmZmYCAgGBgYEtLS////wAAACH5BAEAAA4ALAAAAAAOAA8AAARP0MlJq7o4X7dQ+gsALF+CLCSIiGeJqiKbLkzGIEiNMfp15zYGCtXANYY04bCIOA55SKYTBV0akQxnMQZoEhulbRf8aRTDIrKp4TC7325HBAA7) no-repeat}  .fav_icn {padding-left: 18px; cursor:pointer; background:url(data:image/gif;base64,R0lGODlhDgAPALMAAP//////AP8A//8AAAD//wD/AAAA/wAAAN3d3cDAwJmZmYCAgGBgYEtLS////wAAACH5BAEAAA4ALAAAAAAOAA8AAART0MlJq7o4X7dQ+skFJsiyjAqCKKOJAgALLoxpInBpMzUM4D8frcbwGQHEGi1hTCh5puLxWWswAY0GLNGgdbVYE/hr5ZY/WXTDM2ojGo6sfC53RAAAOw==) no-repeat}';
	if(ch._2ch || ch._0ch) txt += '  .postblock {background:#bbb}'; // gray color for postform
	if(Cfg[39] == 1) txt += '  .spoiler {background:#888 !important; color:#CCC !important}'; // open spoilers
	if(Cfg[25] == 1) txt += '  blockquote {max-height: 100% !important}'; // remove scroller
	$x('.//head').appendChild($new('style', {'type': 'text/css', 'text': txt}));
}


//=============================================================================
//						FOR POSTS AND THREADS
//=============================================================================

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
	if(!ch._0ch) return $x('ancestor::table', node);
	else return $x('./ancestor::div[@class="postnode"]', node) || $x('./ancestor::table[@class="replypost"]', node);
}

function getPostMsg(post) {
	if(wakaba) return $x('.//blockquote', post);
	if(ch._0ch) return $x('.//div[@class="postmessage"]', post);
	if(ch.dc) return $x('.//div[@class="message"]', post) || $x('.//div[@class="postbody"]', post);
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

//----------------------------------Posts buttons------------------------------

function makeNotice(post, text) {
	post.Btns.appendChild($new('a', {
		'id': 'note_' + post.Num,
		'style': 'font-size:12px; font-style:italic',
		'text': text}, {
		'click': function() {$del(this)}}));
}

function addHideThreadBtn(post) {
	if(ch._0ch) $del($x('.//span[starts-with(@id,"hide")]', post));
	var x = $new('span', {
		'title': 'Скрыть тред'}, {
		'click': function() {hideThread(post); storeThreadVisib(post, HIDE)}});
	if(Cfg[18] == 0) x.className = 'hide_icn';
	else {x.innerHTML = '[<a>Скрыть</a>] '; x.style.cursor = 'pointer'};
	return x;
}

function addExpandThreadBtn(post) {
	if(ch._0ch) {
		var old = $x('.//img[@class="expandthread"]', post);
		if(old) $del($up(old));
	}
	var x = $new('span', {
		'id': 'expthrd_' + post.Num}, {
		'mouseover': function() {expandThreadSelect(post)},
		'mouseout': function(e) {removeSelect(e.relatedTarget)},
		'click': function() {expandThread(post, 1)}});
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
	return $new('span', {
		'id': 'phide_' + post.Num,
		'class': 'hide_icn'}, {
		'mouseover': function() {selectPostHider(post)},
		'mouseout': function(e) {removeSelect(e.relatedTarget)},
		'click': function() {togglePostVisib(post)}});
}

function selectPostHider(post) {
	if(Cfg[11] == 0) return;
	var pNum = post.Num;
	var x = $new('div', {
		'class': 'reply',
		'id': 'sel_menu',
		'style': 'position:absolute;left:' + (getCoord($id('phide_' + pNum), 'offsetLeft')).toString() + 'px; top:' + (getCoord($id('phide_' + pNum), 'offsetTop') + 16).toString() + 'px; z-index:250; border-style:solid; border-width:1px; cursor:pointer; width:auto',
		'html': '<a>Hide by text</a><br><a>Hide by image</a>'}, {
		'mouseout': function(e) {removeSelect(e.relatedTarget)}});
	$before(delform, [x]);
	$event($X('.//a', x).snapshotItem(0), {'click': function() {hideBySameText(post)}});
	$event($X('.//a', x).snapshotItem(1), {'click': function() {hideBySameImage(post)}});
}

function removeSelect(x)
	{if(!$x('ancestor-or-self::*[@id="sel_menu"]', x)) $del($id('sel_menu'))}

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
		'click': function() {toggleSage(); toggleCheck($id('sage_hider'))}});
}

function addPostCounter(post) {
	return $new('em', {
		'class': (post.Count < 500 ? 'pcount' : 'pcountb'),
		'text': post.Count});
}

function allImgExpander() {
	if($X('.//img[@class="thumb"]', delform).snapshotLength > 1)
		oPosts[0].appendChild($new('div', {
			'id': 'expimgs_btn',
			'style': 'cursor:pointer',
			'html': '[<a>Раскрыть изображения</a>]'}, {
			'click': expandAllImg}));
}

function addPostButtons(post) {
	var div = $new('span');
	var x = [], i = 0, C = Cfg;
	if(ch.dc) div.innerHTML = '&nbsp;';
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

//------------------------------------Players----------------------------------

function makeYouTube(post) {
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
				'html': '<strong> ' + unescape('%u25BA') + '</strong>'}, {
				'click': function(link, num) {return function() {insertYouTube(link, num)}}(yLink, pNum)})]);
			if(i == 0) insertYouTube(yLink, pNum);
		}
	});
}

function insertYouTube(yLink, pNum) {
	var yDiv = $id('ytube_' + pNum);
	if($x('.//embed[@src="' + yLink + '"]', yDiv)) delChilds(yDiv);
	else $html(yDiv, '&nbsp;<embed src="' + yLink + '" type="application/x-shockwave-flash" wmode="transparent" width="320" height="262"></embed>');
}

function searchMP3() {
	if($X('.//a[contains(@href,".mp3") or contains(@href,".wav")]', delform).snapshotLength > 0) forAll(makeMP3);
}

function makeMP3(post) {
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

//--------------------------------Expand images--------------------------------

function expandImg(img) {
	toggleDisp(img);
	$revent(img, {'click': expandImgHandle});
	$up(img).appendChild($new('img', {
		'class': 'thumb',
		'id': 'full_img',
		'alt': 'Image..',
		'src': $up(img).href,
		'style': 'display:block'}, {
		'click': collapseImgHandle}));
}

function collapseImg(fullimg) {
	if(!fullimg) return;
	var img = $x('.//img[@class="thumb"]', $up(fullimg));
	$del(fullimg);
	toggleDisp(img);
	$event(img, {'click': expandImgHandle});
}

function expandImgHandle(e) {e.preventDefault(); expandImg(e.target)}
function collapseImgHandle(e) {e.preventDefault(); collapseImg(e.target)}

function imgExpander(post) {
	var img = post.Img;
	if(img) $event(img, {'click': expandImgHandle});
}

function expandAllImg() {
	var btn = $id('expimgs_btn');
	var full = './/img[@id="full_img"]';
	if(/Раскрыть/.test(btn.innerHTML)) {
		btn.innerHTML = '[<a>Свернуть изображения</a>]';
		forPosts(function(post) {if(post.Img && !$x(full, post)) expandImg(post.Img)});
	} else {
		btn.innerHTML = '[<a>Раскрыть изображения</a>]';
		forPosts(function(post) {collapseImg($x(full, post))});
	}
}

//-------------------------Collect hidden posts in blocks----------------------

function mergeHidden(post) {
	if(post.Vis != HIDE) return;
	var div = $prev(post);
	var next = $next(post);
	if(!/merged/.test(div.id)) {
		div = $new('div', {'id': 'merged_' + post.Num, 'style': 'display:none'});
		$before(post, [
			$new('span', {
				'style': 'display:block; cursor:pointer'}, {
				'click': function() {
					var hDiv = $id('merged_' + post.Num);
					$prev(hDiv).innerHTML = (hDiv.style.display == 'none' ? unescape('%u25BC') : unescape('%u25B2')) + '[<em><a>Скрыто:</a> ' + hDiv.childNodes.length + '</em>]';
					toggleDisp(hDiv)}}
			), div]);
	}
	div.appendChild(post);
	if(!next || getVisib(next.id.match(/\d+/)) == UNHIDE)
		$prev(div).innerHTML = unescape('%u25B2') + '[<em><a>Скрыто:</a> ' + div.childNodes.length + '</em>]';
}

//-----------------------------Create map of answers---------------------------

function refMap(post) {
	var arr = [];
	var mod = Boolean(post);
	var search = mod ? post.Msg : delform;
	$each($X('.//a[starts-with(text(),">>")]', search), function(link) {
		if(!/\//.test(link.textContent)) {
			var refNum = link.hash.match(/\d+/) || link.pathname.substring(link.pathname.lastIndexOf('/')).match(/\d+/);
			var refpost = postByNum[refNum];
			var post = getPost(link);
			if(refpost && post) {
				var pNum = post.id.match(/\d+/);
				if(!arr[refNum]) arr[refNum] = pNum;
				else if(arr[refNum].indexOf(pNum) == -1) arr[refNum] += ', ' + pNum;
			}
		}
	});
	for(var refNum in arr) {
		var ref = arr[refNum];
		ref = ref.toString().replace(/(\d+)/g, '<a href="#$1">&gt;&gt;$1</a>');
		var map = !mod ? undefined : $id('rfmap_' + refNum);
		if(!map) {
			map = $new('small', {'id': 'rfmap_' + refNum, 'html': '<em><br>Ответы: ' + ref + '</em>'});
			refPrewiev(map);
			var msg = postByNum[refNum].Msg;
			if(msg) $up(msg).appendChild(map);
		} else refPrewiev($html(map.firstChild, map.firstChild.innerHTML + ', ' + ref));
	}
}

//---------------------------Posts preview by reflinks-------------------------

function delPrewievClones() {
	$each($X('.//div[starts-with(@id,"pstprew")]'), function(clone) {$del(clone)});
}

function doPostPrewiev(e) {
	e.preventDefault();
	e.stopPropagation();
	if(ch._0ch) $del($x('.//div[starts-with(@id,"preview")]'));
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
		'style': 'width:auto; position:absolute; z-index:900; border: solid 1px #575763; ' + ((x < doc.body.clientWidth/2) ? 'left:' + x + 'px;' : 'right:' + parseInt(doc.body.clientWidth - x - 80) + 'px;') + ' top:' + y + 'px;'}, {
		'mouseout': function(e) {
			var el = $x('ancestor-or-self::*[starts-with(@id,"pstprew")]', e.relatedTarget);
			if(!el) delPrewievClones();
			else while(/pstprew/.test($next(el).id)) $del($next(el));
		}});
	if(b == board) var post = postByNum[pNum];
	if(post) {
		var post_td = $x('.//td[@class="reply"]', post);
		if(post_td) {
			clone.appendChild(post_td.cloneNode(true));
			clone.firstChild.removeAttribute('class');
			if(post.Vis == HIDE) modPostVisib(clone, UNHIDE);
		} else clone.appendChild(post.cloneNode(true));
		refPrewiev(clone);
		imgExpander(clone);
	} else {
		clone.innerHTML = 'Загрузка...';
		$ajax(tNum, b, function(error) {
			if(!error && !ajaxThrds[tNum][pNum]) {clone.textContent = 'Пост не найден...'}
			else if(error) {clone.innerHTML = error}
			else {
				clone.innerHTML = ajaxThrds[tNum][pNum];
				refPrewiev(clone);
				imgExpander(clone);
			}
		});
	}
	$before(ndelform, [clone]);
}

function doRefPrewiev(link) {
	if(ch.dc) {
		if(!nav.Opera) {
			if(link.getAttribute('onmouseover')) link.removeAttribute('onmouseover');
		} else if(link.onmouseover) link.onmouseover = '';
	}
	$event(link, {
		'mouseover': doPostPrewiev,
		'mouseout': function(e) {
			if(!$x('ancestor-or-self::*[starts-with(@id,"pstprew")]', e.relatedTarget))
				delPrewievClones();
		}});
}

function refPrewiev(node) {
	$each($X('.//a[starts-with(text(),">>")]', node || delform), 
		function(link) {doRefPrewiev(link)});
}

//---------------------------Posts/threads ajax process------------------------

function getNewPost(pNum, html) {
	return $new('table', {
		'class': 'replypost',
		'id': 'post_' + pNum,
		'html': '<tbody><tr><td class="doubledash">&gt;&gt;</td><td class="reply" id="reply' + pNum + '">' + html + '</td></tr></tbody>'});
}

function addPostFunc(post, pNum, count) {
	Posts.push(post);
	postByNum[pNum] = post;
	post.Num = pNum;
	post.Count = count;
	post.Msg = getPostMsg(post);
	post.Text = getText(post.Msg).trim();
	post.Vis = getVisib(post);
	post.Img = $x('.//img[@class="thumb"]', post);
	post.isSage = isSagePost(post);
	post.isLoad = true;
	post.isOp = false;
	addPostButtons(post);
	doPostFilters(post);
	if(post.Vis == HIDE) setPostVisib(post, HIDE);
	if(Cfg[13] == 1 && !main) mergeHidden(post);
	if(Cfg[15] == 1) refMap(post);
	if(Cfg[23] == 1 && wakaba) imgExpander(post);
	if(Cfg[26] == 1) refPrewiev(post.Msg);
	if(Cfg[27] == 1) makeYouTube(post);
	if(Cfg[28] == 1) makeMP3(post);
}

function expandPosts(post) {
	if(post.Vis == HIDE || !$x('.//div[@class="abbrev"]', post)) return;
	var tNum = getThread(post).id.match(/\d+/);
	$ajax(tNum, board, function() {
		var txt = ajaxThrds[tNum][post.Num];
		post.Msg = $html(post.Msg, txt.substring(txt.indexOf('<blockquote') + 12, txt.lastIndexOf('</blockquote>')));
		if(Cfg[26] == 1) refPrewiev(post.Msg);
		if(Cfg[27] == 1) makeYouTube(post);
		if(Cfg[28] == 1) makeMP3(post);
	});
}

function expandThread(post, last) {
	var thread = getThread(post);
	var tNum = post.Num;
	$del($x('.//span[@class="omittedposts"]', thread) || $x('.//div[@class="abbrev"]', thread));
	if(wakaba) expandPosts(post);
	delNexts(post);
	$ajax(tNum, board, function() {
		var len = ajaxThrds[tNum].keys.length;
		if(last != 1) last = len - last;
		if(last <= 0) last = 1;
		for(var i = last; i < len; i++) {
			var pNum = ajaxThrds[tNum].keys[i];
			addPostFunc(thread.appendChild(getNewPost(pNum, ajaxThrds[tNum][pNum])), pNum, i + 1);
		}
	});
}

function expandThreadSelect(post) {
	var x = $new('div', {
		'class': 'reply',
		'id': 'sel_menu',
		'style': 'position:absolute; left:' + (getCoord($id('expthrd_' + post.Num), 'offsetLeft')).toString() + 'px; top:' + (getCoord($id('expthrd_' + post.Num), 'offsetTop') + 16).toString() + 'px; z-index:250; border-style:solid; border-width:1px; cursor:default; width:auto',
		'html': '<a name="5">5 постов</a><br><a name="15">15 постов</a><br><a name="30">30 постов</a><br><a name="50">50 постов</a><br><a name="100">100 постов</a>'}, {
		'mouseout': function(e) {removeSelect(e.relatedTarget)}});
	$each($X('.//a', x), function(a) {
		$event(a, {'click': function() {expandThread(post, parseInt(this.name))}})});
	$before(delform, [x]);
}

function showNewPosts() {
	var thread = $x('.//div[@class="thread"]');
	var tNum = oPosts[0].Num;
	$ajax(tNum, board, function() {
		var count = Posts.length + 1;
		for(var i = count; i < ajaxThrds[tNum].keys.length; i++) {
			var pNum = ajaxThrds[tNum].keys[i];
			var post = getNewPost(pNum, ajaxThrds[tNum][pNum]);
			if(Cfg[37] == 1) $before($id('newpst_btn'), [post]);
			else {if(ch._0ch) $before($x('.//span[@style="float: right;"]', thread), [post]);
				else thread.appendChild(post)}
			addPostFunc(post, pNum, i + 1);
			if(i == ajaxThrds[tNum].keys.length - 1) storeHiddenPosts();
		}
	});
	if(Cfg[37] == 1) $id('newpst_btn').innerHTML = '[<em><a>Новые посты:</a></em> 0]';
}

function initNewPosts() {
	if(Cfg[37] == 1) {
		var thread = $x('.//div[@class="thread"]');
		var tNum = oPosts[0].Num;
		var x = $new('span', {
			'id': 'newpst_btn',
			'style': 'cursor:pointer',
			'html': '[<em><a>Новые посты:</a></em> 0]'}, {
			'click': showNewPosts});
		if(ch._0ch) $before($x('.//span[@style="float: right;"]', thread), [x]);
		else thread.appendChild(x);
		setInterval(function() {$ajax(tNum, board, function() {$id('newpst_btn').innerHTML = '[<em><a>Новые посты:</a></em> ' + parseInt(ajaxThrds[tNum].keys.length - Posts.length - 1) + ']'})}, 30000);
	}
	if(Cfg[37] == 2) setInterval(showNewPosts, 30000);
}


//=============================================================================
//							HIDERS / FILTERS
//=============================================================================

function hideThread(post, notice) {
	if(post.Visibl == HIDE) return;
	var thread = $up(post);
	toggleDisp(thread);
	if(!notice) {
		var t = $x('.//span[@class="filetitle" or @class="replytitle"]', post);
		if(t) t = t.textContent;
		if(!t || t == '') t = post.Text.trim();
		t = t.trim().substring(0, 45); 
		if(t.length >= 45) t += '...';
	} else var t = 'autohide: ' + notice;
	var x = $new('span', {
		'class': 'reply',
		'id': 'hiddenthr_' + post.Num,
		'style': 'display:inline; cursor:default',
		'html': 'Тред <a>№' + post.Num + '</a> скрыт <i>(' + t + ')' + '</i>'});
	$event($x('.//a', x), {'click': function() {unhideThread(post)}});
	$after(thread, [x]);
}

function unhideThread(post) {
	if(post.Visibl == UNHIDE) return;
	toggleDisp($up(post));
	$del($id('hiddenthr_' + post.Num));
	storeThreadVisib(post, UNHIDE);
}

function prevHidden(e) {modPostVisib(getPost(this), UNHIDE)}
function unprevHidden(e) {modPostVisib(getPost(this), HIDE)}

function setPostVisib(post, vis) {
	var reflink = post.Btns.previousSibling;
	post.Btns.firstChild.className = (vis == HIDE) ? 'unhide_icn' : 'hide_icn';
	modPostVisib(post, vis);
	setVisibilityCheap(post, vis);
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
	if(post.isOp) {
		if(Cfg[7] == 1) {
			hideThread(post, note);
			storeThreadVisib(post, HIDE);
		}
		return;
	}
	if(post.Vis != HIDE) makeNotice(post, ' autohide: ' + note + ' ');
	setVisibilityCheap(post, HIDE);
}

function unhidePost(post) {
	if(post.isOp) {
		if(Cfg[7] == 1) unhideThread(post); 
		return;
	}
	if(detectWipe(post) != null) return;
	setPostVisib(post, UNHIDE);
	$del($id('note_' + post.Num));
	hideByWipe(post);
}

function toggleSamePost(post, vis, expr, notice) {
	if(!expr) return;
	$del($id('note_' + post.Num));
	if(vis == UNHIDE) {
		makeNotice(post, notice);
		setVisibilityCheap(post, HIDE);
	} else unhidePost(post);
}

function storeHiddenPosts() {
	forPosts(function(post) {if(post.Vis == HIDE) setPostVisib(post, HIDE)});
	storePostsVisib();
}

function modPostVisib(post, vis) {
	var x = [], i = 0;
	x[i++] = './/br';
	x[i++] = './/small[@id="rfmap_' + post.Num + '"]';
	if(!ch.dc) {
		x[i++] = './/blockquote';
		x[i++] = './/img[starts-with(@class,"thumb")]';
		x[i++] = './/span[@class="filesize"]';
	} else {
		x[i++] = './/div[@class="postbody"]';
		x[i++] = './/div[@class="file"]';
		x[i++] = './/div[@class="fileinfo"]';
	}
	if(wakaba) {
		if($x('.//img[@id="full_img"]', post)) post.Img.style.display = 'none';
		x[i++] = './/span[@class="thumbnailmsg"]';
	}
	while(i--) $each($X(x[i], post),
		function(node) {node.style.display = (vis == HIDE) ? 'none' : ''});
}

//-----------------------------------Filters-----------------------------------

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

function toggleStrongHide() {
	toggleCfg(12);
	forPosts(function(post) {if(post.Vis == HIDE) toggleDisp(post)});
}

function hideBySage(post)
	{if(post.isSage) hidePost(post, 'sage')}
function toggleSage() {
	toggleCfg(1);
	if(Cfg[1] == 1) forAll(hideBySage);
	else forAll(function(post) {if(post.isSage) unhidePost(post)});
	storeHiddenPosts();
}

function hideByNoText(post)
	{if(post.Text == '') hidePost(post, 'no text')}
function toggleNotext() {
	toggleCfg(3);
	if(Cfg[3] == 1) forAll(hideByNoText);
	else forAll(function(post) {if(post.Text == '') unhidePost(post)});
	storeHiddenPosts();
}

function hideByNoImage(post)
	{if(!post.Img) hidePost(post, 'no image')}
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

//--------------------------Hide posts by expressions--------------------------

function hideByRegexp(post) {
	var exp = doRegexp(post);
	if(exp != null) hidePost(post, 'match ' + exp.substring(0, 20) + '..');
}

function applyRegExp() {
	var field = $id('regexp_field');
	setConfigValue(setID('RegExpr'), field.value.trim());
	if(field.value != '') {
		forAll(hideByRegexp);
		storeHiddenPosts();
	}
}

function toggleRegexp() {
	var field = $id('regexp_field');
	if(field.value == '') {
		$id('regexp_hider').checked = false;
		saveCfg(10, 0);
		setConfigValue(setID('RegExpr'), '');
		return;
	}
	toggleCfg(10);
	setConfigValue(setID('RegExpr'), field.value.trim());
	if(Cfg[10] == 1) forAll(hideByRegexp);
	else forAll(function(post) {
		var exp = doRegexp(post);
		if(exp != null) unhidePost(post);
	})
	storeHiddenPosts();
}

function doRegexp(post) {
	var expr = getConfigValue(setID('RegExpr')).split('\n');
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

//-------------------------Hide posts with similar text------------------------

function getWrds(post)
	{return post.Text.replace(/\s+/g, ' ').replace(/[\?\.\\\/\+\*\$\^\(\)\|\{\}\[\]!@#%_=:;<,-]/g, '').substring(0, 1000).split(' ')}

function hideBySameText(post) {
	if(post.Text == '') {
		toggleNotext();
		toggleCheck($id('notext_hider'));
		return;
	}
	var vis = post.Vis;
	for(var target, i = 0; target = Posts[i++];)
		findSameText(target, post, vis, getWrds(post));
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

//-------------------------Hide posts with similar images----------------------

function hideBySameImage(post) {
	var img = post.Img;
	if(!img) {
		toggleNoimage();
		toggleCheck($id('noimage_hider'));
		return;
	}
	var iw = img.width, ih = img.height;
	var cn = $new('canvas', {'width': iw, 'height': ih}).getContext('2d');
	cn.drawImage(img, 0, 0);
	var iData = cn.getImageData(0, 0, iw, ih).data;
	for(var i = 0; i < ih; i += 10) 
		for(var j = 0; j < iw; j += 10) {
			var n = (i*4)*iw + (j*4);
			var mix = Math.round((iData[n] + iData[n + 1] + iData[n + 2])*0.3333);
			iData[n] = mix;
			iData[n + 1] = mix;
			iData[n + 2] = mix;
		}
	var vis = post.Vis;
	for(var target, i = 0; target = Posts[i++];)
		findSameImages(target, post, vis, iData);
	storeHiddenPosts();
}

function findSameImages(post, origPost, origVis, iData) {
	var img = post.Img;
	if(!img) return;
	var iw = img.width, ih = img.height;
	var matchCount = 0, count = 0;
	var cn = $new('canvas', {'width': iw, 'height': ih}).getContext('2d');
	cn.drawImage(img, 0, 0);
	var sData = cn.getImageData(0, 0, iw, ih).data;
	for(var i = 0; i < ih; i += 10) 
		for(var j = 0; j < iw; j += 10) {
			var n = (i*4)*iw + (j*4);
			var mix = Math.round((sData[n] + sData[n + 1] + sData[n + 2])*0.3333);
			if(iData[n] <= mix + 10 && iData[n] >= mix - 10) matchCount++;
			count++;
		}
	toggleSamePost(post, origVis, matchCount/count >= 0.5, ' image as >>' + origPost.Num + ' (' + parseInt(matchCount/count*100) + '%)');
}


//=============================================================================
//							WIPE DETECTORS
//=============================================================================

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
		if(post.isOp) {
			if(Cfg[7] == 1) {
				hideThread(post, wipe);
				storeThreadVisib(post, HIDE);
			}
			return;
		}
		setVisibilityCheap(post, HIDE);
		makeNotice(post, ' autohide: ' + wipe);
	} else setVisibilityCheap(post, UNHIDE);
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
	var len = words.length;
	for(var i = 0; i < len; i++) {
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


//=============================================================================
//							TEXT FUNCTIONS
//=============================================================================

String.prototype.trim = function() {
	var str = this.replace(/^\s\s*/, '');
	var length = str.length;
	while(/\s/.test(str.charAt(--length)));
	return str.substring(0, length + 1); 
};

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

function InsertTags(node, tag1, tag2) {
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

function InsertInto(x, text) {
	var start = x.selectionStart;
	var end = x.selectionEnd;
	x.value = x.value.substr(0, start) + text + x.value.substr(end);
	x.setSelectionRange(start + text.length, start + text.length);
	x.focus();
}

function boldText() {
	if(ch._0ch) InsertTags(this, '[b]', '[/b]');
	else InsertTags(this, '**', '**');
}
function italicText() {
	if(ch._0ch) InsertTags(this, '[i]', '[/i]');
	else InsertTags(this, '*', '*');
}
function underlinedText() {
	if(ch._0ch) InsertTags(this, '[u]', '[/u]');
	else InsertTags(this, '__', '__');
}
function spoilerText() {
	if(ch._0ch) InsertTags(this, '[spoiler]', '[/spoiler]');
	else InsertTags(this, '%%', '%%');
}
function strikeText() {
	if(ch._0ch) InsertTags(this, '[s]', '[/s]');
	else InsertTags(this, '', '');
}
function codeText() {
	if(ch._0ch) InsertTags(this, '[code]', '[/code]');
	else InsertTags(this, "`", "`");
}


//=============================================================================
//							INITIALIZATION
//=============================================================================

function initBoard() {
	var ua = navigator.userAgent;
	nav = {
		Firefox : /firefox|minefield/i.test(ua),
		Opera : /opera/i.test(ua),
		Chrome : /chrome/i.test(ua)
	};
	var ls = (typeof localStorage === 'object') && (localStorage != null);
	sav = {
		GM : nav.Firefox,
		local : ls && !nav.Firefox,
		cookie : !ls && !nav.Firefox
	};
	domain = location.host.match(/(?:(?:[^.]+\.)(?=org\.))?[^.]+\.[^.]+$/);
	ch = {
		_2ch: domain == '2-ch.ru',
		_0ch: domain == '0chan.ru',
		iich: domain == 'iichan.ru',
		dc: domain == 'dobrochan.ru',
		unyl: domain == 'wakachan.org',
		nowr: domain == 'nowere.net'
	};
	wakaba = !(ch.dc || ch._0ch);
	var path = location.pathname;
	main = !/\/res\//.test(path);
	arch = /\/arch\//.test(path)
	board = path.substr(1).split('/')[0];
	
	delform = !ch.dc ? $id('delform') : $x('.//form[contains(@action, "delete")]');
	if(!delform) throw 'stop';
	ndelform = $next(delform);
	logo = $x('.//div[@class="logo"]');
	Rname = Rmail = Rvideo = Rgoto_tr = Rpass = Rrules = QR = undefined;
	postform = $id('postform');
	if(!postform) return;
	captcha = $n('captcha');
	Rsubm = $x('.//input[@type="submit"]', postform);
	Rrules = $x('.//div[@class="rules"]') || $x('.//td[@class="rules"]');
	Rgoto_tr = $id('trgetback');
	if(!ch.unyl) Rpass = $n('password') || $n('postpassword');
	if(ch._2ch) {
		Rname = $n('akane');
		Rmail = $n('nabiki');
		Rtitle = $n('kasumi');
		Rmess = $n('shampoo');
		Rfile = $n('file');
	}
	if(ch._0ch) {
		Rname = $n('name');
		Rmail = $n('em');
		Rtitle = $n('subject');
		Rmess = $n('message');
		Rfile = $n('imagefile');
		Rvideo = $n('embed');
		Rgoto_tr = $up($n('gotothread'), 3);
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
	if(ch.unyl || ch.nowr) {
		Rname = $n('field1');
		Rmail = $n('dont_bump') || $n('field2');
		Rtitle = $n('field3');
		Rmess = $n('field4');
		Rfile = $n('file');
	}
}

function initDelform() {
	if(wakaba && !ch.iich) {
		if(nav.Opera) var thrd_re = !ch.unyl ? '<BR clear="left"><HR>' : '<BR clear="left"><P><HR><P></P>';
		else var thrd_re = !ch.unyl ? '<br clear="left"><hr>' : '<br clear="left"><p></p><hr>';
		var post_re = nav.Opera ? '<TABLE>' : '<table>';
		var tNum_re = /(?:<a name=")(\d+)(?:">)/i;
		var threads = delform.innerHTML.split(thrd_re);
		var i = threads.length - 1;
		while(i--) {
			var posts = threads[i].split(post_re);
			var j = posts.length;
			while(j-- > 1) posts[j] = '<table class="replypost" id="post_' + posts[j].match(tNum_re)[1] + '">' + posts[j];
			var tNum = posts[0].match(tNum_re)[1];
			posts[0] = '<div class="oppost" id="post_' + tNum + '">' + posts[0] + '</div>';
			threads[i] = '<div class="thread" id="thread_' + tNum + '">' + posts.join('') + '</div>';
		}
		toggleDisp(delform);
		delform = $html(delform, threads.join(thrd_re));
		toggleDisp(delform);
	} 
	else $each($X('./div[starts-with(@id, "thread")]', delform), function(thread) {
			$attr(thread, {'id': thread.id.match(/\d+/), 'class': 'thread'})})
	if(ch.iich) {
		$each($X('.//td[@class="reply"]', delform), function(reply) {
			$attr($x('./ancestor::table', reply), {'class': 'replypost', 'id': 'post_' + reply.id.match(/\d+/)})});
		$each($X('./div[@class="thread"]', delform), function(thread) {
			var op = $new('div', {'class': 'oppost', 'id': 'post_' + thread.id.match(/\d+/)});
			var nodes = thread.childNodes;
			var arr = [], x = 0;
			for(var node, j = 1; node = nodes[j++];) {
				if(node.tagName == 'TABLE') break;
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
}

function initPosts() {
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


//=============================================================================
//								MAIN
//=============================================================================

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
	initPosts();					Log('initPosts');
	initCfg();						Log('initCfg');
	addControls();					Log('addControls');
	readThreadsVisib();				Log('readThreadsVisib');
	readPostsVisib();				Log('readPostsVisib');
	forAll(addPostButtons);			Log('addPostButtons');
	if(Cfg[26] == 1) {
		refPrewiev();				Log('refPrewiev')}
	if(Cfg[15] == 1) {
		refMap();					Log('refMap')}
	forAll(doPostFilters);			Log('doPostFilters');
	storeHiddenPosts();				Log('storeHiddenPosts');
	if(postform) {
		changePostForm();
		textFormatPanel(postform);	Log('changePostForm')}
	if(Cfg[38] == 1) {
		submitCheck();				Log('submitCheck')}
	if(Cfg[37] != 0 && !main) {
		initNewPosts();				Log('initNewPosts')}
	if(Cfg[13] == 1 && !main) {
		forPosts(mergeHidden);		Log('mergeHidden')}
	if(Cfg[23] == 1 && wakaba) {
		forAll(imgExpander);
		if(!main) allImgExpander();	Log('imgExpander')}
	if(Cfg[24] == 1 && main && wakaba) {
		forAll(expandPosts);		Log('expandPosts')}
	if(Cfg[28] == 1) {
		searchMP3();				Log('makeMP3')}
	if(Cfg[27] == 1) {
		forAll(makeYouTube);		Log('makeYouTube')}
	addScriptStyles();				Log('addScriptStyles');
	$id('process_time').textContent = 'script processing: ' +
		((new Date()).getTime() - initTime).toString() + ' ms';
}

if(!/submitcheck/.test(window.name)) {
	if(window.opera) $event(doc, {'DOMContentLoaded': doScript});
	else doScript();
}
})();