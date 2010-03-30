// Dollchan Extension Tools
// 30.03.2010 version, Sthephan Shinkufag @ Free DollChan
// Copyright (C) 2084, Bender Bending Rodríguez
// ==UserScript==
// @name			Dollchan Extension Tools
// @namespace		Free Dollchan
// @description	Doing some extended profit for russian AIB
// @include		*0chan.ru*
// @include		*2-ch.ru*
// @include		*iichan.ru*
// @include		*dobrochan.ru*
// @include		*wakachan.org*
// @include		*nowere.net*
// @include		*2ch.olanet.ru*
// ==/UserScript==

var defaultCfg = [
	1,		// 0.	anti-wipe detectors
	0,		// 1.	hide posts with sage
	0,		// 2.	hide posts with theme
	0,		// 3.	hide posts without text
	0,		// 4.	hide posts without img
	0,		// 5.	empty
	0,		// 6.	empty
	0,		// 7.	empty
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
	1,		// 25.	hide overflow post scrollers
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
];

var Cfg = [];
var Visib = [];
var pNodes = [];
var opNodes = [];
var Expires = [];
var postByNum = [];
var postCounts = [];
var hiddenThrds = [];
var ajaxThrds = {};
var wakaba = true;
var main = true;
var hDivs = 0;
const HIDE = 1;
const UNHIDE = 0;
const STORAGE_LIFE = 259200000; // 3 days


//=============================================================================
//								UTILS
//=============================================================================

function $id(id) {
	return document.getElementById(id);
}
function $n(name) {
	return document.getElementsByName(name)[0];
}
function $X(path, rootNode) {
	return document.evaluate(path, rootNode || document, null, 6, null);
}
function $x(path, rootNode) {
	return document.evaluate(path, rootNode || document, null, 8, null).singleNodeValue;
}
function toArray(X) {
	var ar = [];
	var len = X.snapshotLength;
	for(var i = 0; i < len; i++)
		ar[ar.length] = X.snapshotItem(i);
	return ar;
}
function $next(x) {
	do x = x.nextSibling;
	while (x && x.nodeType != 1);
	return x;
}
function $prev(x) {
	do x = x.previousSibling;
	while (x && x.nodeType != 1);
	return x;
}
function delNode(x) {
	if(x) x.parentNode.removeChild(x);
}
function delNexts(x) {
	while (x.nextSibling) delNode(x.nextSibling);
}
function delChilds(x) {
	while (x.hasChildNodes()) x.removeChild(x.firstChild);
}
function newNode(x) {
	return document.createElement(x);
}
function newTxt(x) {
	return document.createTextNode(x);
}
function newInput(xtype, xval, xid, xname) {
	var x = newNode('input');
	x.type = xtype;
	if(xval) x.value = xval;
	if(xid) x.id = getId(xid);
	if(xname) x.name = xname;
	return x;
}
function inHTML(x, html) {
	var y = x.cloneNode(false);
	y.innerHTML = html;
	x.parentNode.replaceChild(y, x);
	return y;
}
function toggleDisplay(node) {
	node.style.display = (node.style.display != 'none') ? 'none' : '';
}
function getCoord(a, b) {
	var c = 0;
	while (a) {
		c += a[b];
		a = a.offsetParent;
	}
	return c;
}
function rand10() {
	return Math.floor(Math.random()*1e10).toString(10);
}
function incc(arr, w) {
	if(arr[w]) arr[w] += 1;
	else arr[w] = 1;
}
function toggle(arr, w) {
	arr[w] = arr[w] == 0 ? 1 : 0;
}
function max(a, b) {
	return b > a ? b : a;
}
function min(a, b) {
	return b < a ? b : a;
}
function preventEnter(e) {
	if(e.which == 13) {
		e.preventDefault();
		e.stopPropagation();
	}
}
function preventNoNum(e) {
	var key = (typeof e.charCode == 'undefined' ? e.keyCode : e.charCode);
	if(!/\d/.test(String.fromCharCode(key)) && key != 8 && key != 0) {
		e.preventDefault();
		e.stopPropagation();
	}
}

function serialize(tid, text) {
	text = text.substring(text.search(/<form[^>]+del/)+text.match(/<form[^>]+del[^>]+>/).toString().length, text.indexOf('class="userdelete"') != -1 ? text.indexOf('class="userdelete"')-10 : text.indexOf('deletebuttons')-70).split(/<table[^>]*>/);
	ajaxThrds[tid] = {keys: []};
	for(var i = 0; i < text.length; i++) {
		var key = text[i].match(/(?:<input[^\d]+)(\d+)(?:[^>]+>)/)[1];
		ajaxThrds[tid].keys.push(parseInt(key));
		ajaxThrds[tid][key] = text[i].substring(text[i].indexOf(key), text[i].lastIndexOf('</td') != -1 ? text[i].lastIndexOf('</td') : (text[i].lastIndexOf('</div') != -1 ? text[i].lastIndexOf('</div')+6 : text[i].lastIndexOf('</blockquote')+13));
		ajaxThrds[tid][key] = ajaxThrds[tid][key].substring(ajaxThrds[tid][key].indexOf('>')+1);
	}
}

function loadAJAX(addr, b, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			if(xhr.status == 200) {
				serialize(addr, xhr.responseText);
				callback(null);
			} else callback('HTTP '+xhr.status+' '+xhr.statusText);
		}
	};
	xhr.open('GET', '/'+b+'/res/'+addr+'.html', true);
	xhr.send(null);
}


//=============================================================================
//							STORAGE / CONFIG
//=============================================================================

function setCookie(name, value, life) {
	if(!name) return;
	var life = (life == 'delete') ? -10 : STORAGE_LIFE;
	document.cookie = escape(name) + '=' + escape(value) + ';expires=' + (new Date((new Date()).getTime() + life)).toGMTString() + ';path=/';
}

function getCookie(name) {
	var cookieJar = document.cookie.split("; ");
	var i = cookieJar.length;
	while(i--) {
		var oneCookie = cookieJar[i].split("=");
		if(oneCookie[0] == escape(name)) return unescape(oneCookie[1]);
	}
}

function turnCookies(name) {
	var max = (chan == '0chan') ? 10 : 15;
	var data = getCookie(getId('Cookies'));
	if(!data) data = name + '|';
	else data += name + '|';
	var entr = data.split('|');
	var len = entr.length;
	entr.pop();
	if(len > max) {
		data = '';
		setCookie(entr[0], '', 'delete');
		entr[0] = '';
		for(var i = 1; i < len; i++)
			data += entr[i] + '|';
	}
	setCookie(getId('Cookies'), data);
}

function getConfigValue(name) {
	if(saves == 'localst') return localStorage.getItem(name);
	if(saves == 'cookie') return getCookie(name);
	return GM_getValue(name);
}

function setConfigValue(name, value) {
	if(saves == 'localst') localStorage.setItem(name, value);
	if(saves == 'cookie') setCookie(name, value);
	if(saves == 'GM') GM_setValue(name, value);
}

function getId(name, pNum) {
	var c = (saves != 'cookie') ? '_' + chan : '';
	var pNum = (!pNum) ? '' : '_' + pNum;
	if(name == 'Visibility' || name == 'HiddenThreads') return 'DESU_' + name + c + '_' + board + pNum;
	if(name == 'Options' || name == 'Cookies' || name == 'RegExpr') return 'DESU_' + name + c;
	if(name == 'Favorities') return 'DESU_Favorities';
	return 'DESU_' + name + pNum;
}

function setDefaultCfg() {
	var data = '';
	var len = defaultCfg.length;
	for(var i = 0; i < len; i++)
		data += defaultCfg[i] + '|';
	Cfg = defaultCfg;
	setConfigValue(getId('Options'), data);
}

function initCfg() {
	var data = getConfigValue(getId('Options'));
	if(!data) setDefaultCfg();
	else Cfg = data.split('|');
	data = getConfigValue(getId('RegExpr'));
	if(!data) setConfigValue(getId('RegExpr'), '');
}

function saveCfg(num, val) {
	Cfg[num] = val;
	var entr = getConfigValue(getId('Options')).split('|');
	var data = '';
	var len = entr.length - 1;
	for(var i = 0; i < len; i++) {
		if(i != num) data += entr[i] + '|';
		else data += val + '|';
	}
	setConfigValue(getId('Options'), data);
}

function getVisib(pNum) {
	var postKey = (saves != 'cookie') ? board + pNum : postCounts[pNum];
	if(postKey in Visib) return Visib[postKey];
	return null;
}

function setVisibilityCheap(pNum, vis) {
	if(saves != 'cookie') {
		Visib[board + pNum] = vis;
		Expires[board + pNum] = (new Date()).getTime() + STORAGE_LIFE;
	} else Visib[postCounts[pNum]] = vis;
	if(Cfg[12] == 1) {
		var pNode = postByNum[pNum];
		if(vis == HIDE) pNode.style.display = 'none';
		if(vis == UNHIDE) pNode.style.display = '';
	}
}

function readPostsVisibility() {
	var vs;
	if(saves != 'cookie') {
		vs = getConfigValue(getId('Visibility'));
		if(!vs) return;
		var entr = vs.split('I');
		var i = entr.length - 1;
		var x;
		while(i--) {
			x = entr[i].split('-');
			if((new Date()).getTime() < x[2]) {
				Visib[x[0]] = x[1];
				Expires[x[0]] = x[2];
			}
		}
	} else {
		if(!main) vs = getConfigValue(getId('Visibility', opNum));
		if(!vs) return;
		var i = vs.length;
		while(i--) Visib[i + 2] = vs[i];
	}
}

function storePostsVisibility() {
	var data = '';
	var vs = '';
	var name = '';
	if(saves != 'cookie') {
		var postKey;
		for(postKey in Visib) {
			vs = postKey + '-' + Visib[postKey] + '-' + Expires[postKey] + 'I';
			if(vs.length < 40) data += vs;
		}
		name = getId('Visibility');
	} else {
		if(!main) {
			var i = Visib.length;
			while(i--) if(Visib[i] != undefined) vs += Visib[i];
			i = vs.length;
			while(i--) data += vs[i];
			name = getId('Visibility', opNum);
			if(!getConfigValue(name)) turnCookies(name);
		}
	}
	setConfigValue(name, data);
}

function storeHiddenThread(tNum, vis) {
	var data = getConfigValue(getId('HiddenThreads'));
	var key = board + tNum;
	if(!data) data = '';
	var entr = data.split('I');
	var i = entr.length - 1;
	if(vis == HIDE) {
		if(entr.length > 80) {
			data = '';
			while(i--) data += entr[i] + 'I';
		}
		data += key + 'I';
	} else {
		data = '';
		hiddenThrds[key] = UNHIDE;
		while(i--) if(entr[i] != key) data += entr[i] + 'I';
	}
	setConfigValue(getId('HiddenThreads'), data);
}

function readHiddenThreads() {
	var data = getConfigValue(getId('HiddenThreads'));
	if(!data) return;
	var entr = data.split('I');
	var i = entr.length - 1;
	while(i--) hiddenThrds[entr[i]] = HIDE;
	forOPReply(
		function(opNode, tNum) {
			if(hiddenThrds[board + tNum] == HIDE)
				hideThread(opNode, tNum);
		}
	);
}

function storeFavorities(pNode, pNum, stat) {
	var data = getConfigValue(getId('Favorities')) || '';
	var f = $x('.//span[@class="filetitle"]', pNode);
	if(f) f = f.textContent.trim();
	if(!f || f == '') f = pNode.Text.trim();
	f = (saves != 'cookie') ? f.substring(0, 70) : f.substring(0, 25);
	f = f.replace(/\|/g, '').replace(/\s/g,' ');
	var key = chan + '|' + board + '|' + pNum + '|' + f + '|';
	var entr = data.split('|');
	var len = entr.length/4;
	if(saves == 'cookie' && len > 25) return;
	for(var i = 0; i < len; i++)
		if(entr[i*4 + 1] == board && entr[i*4 + 2] == pNum) return;
	if(stat == 1) data += key;
	setConfigValue(getId('Favorities'), data);
}


function removeFavorities(node) {
	var key = $x('.//a', node).textContent.replace('arch/', '').replace('res/', '').split('/');
	var entr = getConfigValue(getId('Favorities')).split('|');
	var len = parseInt(entr.length/4);
	var data = '';
	for(var i = 0; i < len; i++) {
		if(getChanHost(entr[i*4]) == key[0] && entr[i*4 + 1].split('/')[0] == key[1] && entr[i*4 + 2] == key[2]) continue;
		data += entr[i*4] + '|' + entr[i*4 + 1] + '|' + entr[i*4 + 2] + '|'+ entr[i*4 + 3] + '|';
	}
	delNode(node.parentNode.parentNode);
	if(data == '') $id(getId('favorities_div')).appendChild(newTxt(' [Избранные треды отсутствуют]'))
	setConfigValue(getId('Favorities'), data);
}


//=============================================================================
//							TEXT FUNCTIONS
//=============================================================================

String.prototype.trim = function() {
	var str = this.replace(/^\s\s*/, '');
	var length = str.length;
	while(/\s/.test(str.charAt(--length)));
	return str.substring(0, length+1); 
};

function getTextImpl(node) {
	var n = node.nodeName;
	if(n == '#text') return node.data;
	if(n == 'BR' && chan != 'DC') return '\n';
	var text = (n == 'P' || n == 'BLOCKQUOTE') ? '\n' : '';
	var ch = node.childNodes;
	for(var x, i = 0; x = ch[i++];)
		text += getTextImpl(x);
	return text;
}

function InsertTags(node, tag1, tag2) {
	var x = $x('.//textarea', $x('ancestor::form', node));
	var start = x.selectionStart;
	var end = x.selectionEnd;
	if(tag1 == '' && tag2 == '')
		for(var i = 0; i < (end - start); i++) {
			tag2 += '^H';
		}
	var text = x.value.substring(start, end);
	var before = x.value.substring(0, start);
	var after = x.value.substring(end, x.value.length);
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
}

function boldText() {
	if(chan == '0chan') InsertTags(this, '[b]', '[/b]');
	else InsertTags(this, '**', '**');
}
function italicText() {
	if(chan == '0chan') InsertTags(this, '[i]', '[/i]');
	else InsertTags(this, '*', '*');
}
function underlinedText() {
	if(chan == '0chan') InsertTags(this, '[u]', '[/u]');
	else InsertTags(this, '__', '__');
}
function spoilerText() {
	if(chan == '0chan') InsertTags(this, '[spoiler]', '[/spoiler]');
	else InsertTags(this, '%%', '%%');
}
function strikeText() {
	if(chan == '0chan') InsertTags(this, '[s]', '[/s]');
	else InsertTags(this, '', '');
}
function codeText() {
	if(chan == '0chan') InsertTags(this, '[code]', '[/code]');
	else InsertTags(this, "`", "`");
}


//=============================================================================
//						CONTROLS / COMMON CHANGES
//=============================================================================

function toggleCheck(x) {x.checked = !x.checked};
function toggleCfg(CfgNum) {
	toggle(Cfg, CfgNum);
	saveCfg(CfgNum, Cfg[CfgNum]);
}
function addBox(boxEvent, CfgNum, boxIndex, boxId, nobr) {
	var x = newInput('checkbox', null, boxId);
	x.addEventListener('click', function() {boxEvent(CfgNum)}, false);
	if(Cfg[CfgNum] == 1) x.checked = true;
	confdiv.appendChild(x);
	confdiv.appendChild(newTxt(boxIndex));
	if(!nobr) confdiv.appendChild(newNode('br'));
}

function addControls() {

	// Create toolbar header
	var postarea = $x('.//div[@class="postarea" or @align="center"]') || delform;
	var body = postarea.parentNode;
	var breaker = newNode('div');
	breaker.className = 'logo';
	var tools = newNode('div');
	tools.innerHTML = '<input title="Показать настройки скрипта" value="Настройки" type="button"> <input title="Показать список скрытых постов" value="Скрытые посты" type="button"> <input title="Показать избранные треды" value="Избранное" type="button"> <input title="Обновить страницу" value="Обновить" type="button">' + ((main && postform) ? ' <input title="Показать форму ответа" value="Создать тред" type="button">' : '') + '<div style="font-size: small; width: 360px; border: 1px solid grey; margin: 7px; display: none; overflow: hidden;" class="reply"><div style="font-weight: bold; width: 100%; text-align: center; font-family: sans-serif;">Dollchan Extension Tools</div><div id="DESU_confdiv" style="padding: 5px; overflow: hidden;"></div></div><div id="DESU_hiddenposts_div"></div><div id="DESU_favorities_div"></div>';
	confdiv = $x('.//div[@id="DESU_confdiv"]', tools);
	var btn = toArray($X('.//input', tools));
	btn[0].addEventListener('click', function() {toggleDisplay(confdiv.parentNode)}, false);
	btn[1].addEventListener('click', hiddenPostsPreview, false);
	btn[2].addEventListener('click', toggleFavorites, false);
	btn[3].addEventListener('click', function(e) {
		window.location.reload();
		e.stopPropagation();
		e.preventDefault();
	}, false);
	if(main && postform) btn[4].addEventListener('click', function() {
		toggleDisplay($x('.//div[@class="postarea"]', delform.parentNode));
		toggleDisplay($prev(delform));
	}, false);
	body.insertBefore(tools, postarea);
	body.insertBefore(breaker, postarea);
	body.insertBefore(newNode('hr'), postarea);

	// Append config options
	addBox(toggleCfg, 0, ' Анти-вайп детекторы');
	if(chan != 'iichan' && chan != 'olanet') 
	addBox(toggleSage, 1, ' Скрывать sage посты', 'sage_hider');
	addBox(toggleTheme, 2, ' Скрывать посты с полем "Тема"');
	addBox(toggleNotext, 3, ' Скрывать посты без текста', 'notext_hider');
	addBox(toggleNoimage, 4, ' Скрывать посты без изображений', 'noimage_hider');
	x = newInput('checkbox');
	x.addEventListener('click', toggleMaxtext, false);
	if(Cfg[8] == 1) x.checked = true;
	confdiv.appendChild(x);
	confdiv.appendChild(newTxt(' Скрывать с текстом больше '));
	x = newInput('text', Cfg[9], 'maxtext_field');
	x.size = 4;
	x.addEventListener('keypress', preventNoNum, false);
	x.addEventListener('keypress', preventEnter, false);
	confdiv.appendChild(x);
	confdiv.appendChild(newTxt(' символов'));
	confdiv.appendChild(newNode('br'));
	addBox(toggleRegexp, 10, ' Скрытие по выражению ', 'regexp_hider', true);
	x = newNode('span');
	x.innerHTML = '[<a>?</a>]';
	x.style.cursor = 'pointer';
	x.addEventListener('click', function(){alert('Поиск в тексте/теме поста:\nвыражение\n\nРегулярные выражения: $exp выражение\n$exp /[bб].[tт]+[hх].[rр][tт]/i\n$exp /[sс][aа][gж][eа]/i\n\nКартинки: $img [<,>,=][вес в кб][@ширинаxвысота]\n$img <35@640x480\n$img >@640x480\n$img =35\n\nИмя/трипкод: $name [имя][!трипкод][!!трипкод]\n$name Sthephan!ihLBsDA91M\n$name !!PCb++jGu\nЛюбой трипкод: $alltrip')}, false);
	confdiv.appendChild(x);
	confdiv.appendChild(newNode('br'));
	x = newNode('textarea');
	x.id = getId('regexp_field');
	x.value = getConfigValue(getId('RegExpr'));
	x.rows = 5;
	x.cols = 41;
	confdiv.appendChild(x);
	confdiv.appendChild(newNode('br'));
	x = newInput('button', 'Применить');
	x.addEventListener('click', applyRegExp, false);
	confdiv.appendChild(x);
	confdiv.appendChild(newNode('br'));
	addBox(toggleStrongHide, 12, ' Полностью скрывать посты');
	addBox(toggleCfg, 13, ' Объединять скрытые посты*');
	addBox(toggleCfg, 14, ' Быстрый просмотр скрытых постов');
	addBox(toggleCfg, 11, ' Дополнительное меню по кнопке скрытия');
	confdiv.appendChild(newNode('hr'));
	addBox(toggleCfg, 15, ' Карта ответов*');
	if(postform)
	addBox(toggleCfg, 16, ' Кнопки быстрого ответа*');
	addBox(toggleCfg, 17, ' Кнопки добавления в избранное*');
	addBox(toggleCfg, 18, ' Отображать кнопки в виде текста*');
	if((wakaba && chan != 'iichan' && chan != 'olanet') || chan == '0chan')
	addBox(toggleCfg, 19, ' Отображать сажу*');
	else Cfg[19] = 0;
	if(wakaba)
	addBox(toggleCfg, 23, ' Раскрывать изображения по клику*');
	if(wakaba)
	addBox(toggleCfg, 24, ' Раскрывать сокращенные посты*');
	if(chan == '2-ch')
	addBox(toggleCfg, 25, ' Убирать прокрутку с постов*');
	addBox(toggleCfg, 26, ' Просмотр постов по >> ссылкам*');
	addBox(toggleCfg, 27, ' Просмотр YouTube ссылок*');
	addBox(toggleCfg, 28, ' Проигрыватель mp3*');
	addBox(toggleCfg, 39, ' Раскрывать спойлеры*');
	if(Rmail)
	addBox(toggleCfg, 41, ' Кнопка Sage вместо E-mail*');
	if(postform)
	addBox(toggleCfg, 29, ' Форма ответа снизу*');
	addBox(toggleCfg, 38, ' Постить без перезагрузки (проверять ответ)*')
	x = newNode('select');
	x.innerHTML = '<option value="0">Отключена</option><option value="1">По клику</option><option value="2">Авто</option>';
	x.selectedIndex = Cfg[37];
	x.addEventListener('change', function(){saveCfg(37, this.selectedIndex)}, false);
	confdiv.appendChild(x);
	confdiv.appendChild(newTxt(' подгрузка новых постов в треде*'));
	confdiv.appendChild(newNode('br'));
	if(Rname) {
		x = newInput('text', Cfg[36], 'usrname_field');
		x.size = '20';
		confdiv.appendChild(x);
		addBox(toggleUserName, 35, ' Постоянное имя', 'usrname_box');
	}
	if(Rpass) {
		x = newInput('text', Cfg[34], 'usrpass_field');
		x.size = '20';
		confdiv.appendChild(x);
		addBox(toggleUserPassw, 33, ' Постоянный пароль', 'usrpass_box');
	}
	confdiv.appendChild(newTxt('Не отображать: '));
	if(Rrules)
	addBox(toggleBoardRules, 21, ' правила', null, true);
	if(Rgoto_tr)
	addBox(toggleGotoThread, 22, ' поле goto', null, true);
	if(Rpass)
	addBox(togglePassword, 40, ' пароль', null, true);
	if(chan == '2-ch') {
		confdiv.appendChild(newTxt(' Количество отображаемых капч* '));
		x = newNode('select');
		x.innerHTML = '<option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>';
		x.selectedIndex = Cfg[20];
		x.addEventListener('change', function() {saveCfg(20, this.selectedIndex)}, false);
		confdiv.appendChild(x);
		confdiv.appendChild(newNode('br'));
	}
	confdiv.appendChild(newNode('hr'));
	x = newInput('button', 'Сброс настроек');
	x.addEventListener('click', function() {setDefaultCfg(); window.location.reload()}, false);
	x.style.cssText = 'float:right';
	confdiv.appendChild(x);
}


//-------------------------Makes preview of hidden posts-----------------------

function hiddenPostsPreview() {
	var preview = $id(getId('hiddenposts_div'));
	if(preview.hasChildNodes()) {delChilds(preview); return}
	var table = newNode('table');
	table.setAttribute('align', 'left');
	preview.appendChild(table);
	var hposts = [], clones = [], nums = [];
	forEachReply( function(pNode, pNum) {
		if(getVisib(pNum) != HIDE) return;
		hposts[hposts.length] = pNode;
		nums[nums.length] = pNum;
	});
	if(hposts.length == 0) {preview.appendChild(newTxt(' [Скрытые посты отсутствуют]')); return}
	for(var i = 0; i < hposts.length; i++) {
		var clone = hposts[i].cloneNode(true);
		clones[i] = clone;
		clone.num = nums[i];
		clone.vis = HIDE;
		clone.style.display = 'block';
		clone.setAttribute('align', 'left');
		var btn = $x('.//span[@id="' + getId('posthider', nums[i]) + '"]', clone);
		btn.addEventListener('click', function(node){return function(){
			node.vis = (node.vis == HIDE) ? UNHIDE : HIDE;
			modPostVisib(node, node.num, node.vis);
		}}(clone), false);
		table.insertRow(-1).appendChild(clone);
	};
	var cell = table.insertRow(-1).insertCell(-1);
	var x = newInput('button', 'Сохранить изменения');
	x.addEventListener('click', function() {
		for(var i = 0; i < clones.length; i++)
			if(clones[i].vis != HIDE)
				togglePostVisibility(hposts[i], nums[i]);
		delChilds(preview);
	}, false);
	cell.appendChild(x);
	x = newInput('button', 'Отмена');
	x.addEventListener('click', function() {delChilds(preview)}, false);
	cell.appendChild(x);
}


//----------------------Makes preview of 'Favorities' list-----------------------

function toggleFavorites() {
	var favorList = $id(getId('favorities_div'));
	if(favorList.hasChildNodes()) {delChilds(favorList); return}
	var entr = getConfigValue(getId('Favorities'));
	if(entr) entr = entr.split('|');
	else {favorList.appendChild(newTxt(' [Избранные треды отсутствуют]')); return}
	entr.pop();
	var table = newNode('table');
	table.setAttribute('align', 'left');
	favorList.appendChild(table);
	for(var i = 0; i < entr.length/4; i++) {
		var getchan = getChanHost(entr[i*4]);
		var favorNote = newNode('span');
		var tname = entr[i*4 + 3];
		if((saves != 'cookie' && tname.length >= 70) || (saves == 'cookie' && tname.length >= 25)) tname += '..';
		var x = newNode('span');
		x.title = 'Убрать запись';
		x.style.verticalAlign = 'middle';
		x.className = 'hidepostbtn';
		x.addEventListener('click', function(node) {return function() {removeFavorities(node)}} (favorNote), false);
		var link = getchan + '/' + entr[i*4 + 1] + '/res/' + entr[i*4 + 2];
		favorNote.innerHTML = parseInt(i + 1) + '. ' + '<a href="' + 'http://' + link + '.html' + '">' + link + '</a> - ' + tname;
		favorNote.insertBefore(x, $x('.//a', favorNote));
		table.insertRow(-1).insertCell(-1).appendChild(favorNote);
	}
}


//-------------------------------Changes in postform-----------------------------

function toggleBoardRules() {toggleCfg(21); toggleDisplay(Rrules)}
function toggleGotoThread() {toggleCfg(22); toggleDisplay(Rgoto_tr)}
function togglePassword() {toggleCfg(40); toggleDisplay(Rpass.parentNode.parentNode)}

function toggleUserName() {
	toggleCfg(35);
	saveCfg(36, $id(getId('usrname_field')).value);
	if($id(getId('usrname_box')).checked) {
		Rname.value = Cfg[36];
		if(QR) QRname.value = Cfg[36];
	} else {
		Rname.value = '';
		if(QR) QRname.value = '';
	}
}
function toggleUserPassw() {
	toggleCfg(33);
	saveCfg(34, $id(getId('usrpass_field')).value);
	if($id(getId('usrpass_box')).checked) {
		Rpass.value = Cfg[34];
		del_passw.value = Cfg[34];
	} else {
		Rpass.value = rand10().substring(0, 8);
		del_passw.value = Rpass.value;
	}
}

function capRefresh(cap) {
	var par = cap.parentNode;
	var i = Cfg[20];
	while(i--) {
		var img = par.getElementsByTagName('IMG')[i];
		img.src = img.src.replace(/dummy=\d*/, 'dummy=' + rand10());
	}
}

function getCaptcha(repmain, tNum) {
	if(!repmain && !tNum) tNum = opNum;
	var x = newNode('img');
	if(!repmain) x.src = '/' + board + '/captcha.pl?key=res' + tNum + '&amp;dummy=' + rand10();
	else x.src = '/' + board + '/captcha.pl?key=mainpage&amp;dummy=' + rand10();
	x.id = 'imgcaptcha';
	x.style.display = 'block';
	x.addEventListener('click', function(){capRefresh(this)}, false);
	return x;
}

function forceCaptcha(captext) {
	var unicode = captext.charCode || captext.keyCode;
	if(unicode > 1039) {
		captext.preventDefault();
		var val = this.value;
		var ss = this.selectionStart;
		var offset = (unicode < 1072) ?1040 : 1072;
		var chars = ['f',0,'d','u','l','t',0,'p','b','q','r','k','v','y','j','g','h','c','n','e','a',0,'w','x','i','o',0,'s','m',0,0,'z'];
		this.value = val.substring(0, ss) + (chars[unicode - offset] || '') + val.substring(this.selectionEnd);
		this.selectionStart = ++ss;
		this.selectionEnd = ss;
	}
}

function sagemanFunc(mail, form) {
	var sage = $x('.//span[@id="' + getId('sageman') + '"]', form);
	if(Cfg[32] == 0) {
		sage.innerHTML = 'без сажи';
		if(mail.type == 'text') mail.value = '';
		else mail.checked = false;
	} else {
		sage.innerHTML = '<span class="sagemarker" style="vertical-align:middle"></span> SAGE';
		if(mail.type == 'text') mail.value = 'sage';
		else mail.checked = true;
	}
}

function textareaResizer(node) {
	node.style.cssText = 'width:' + Cfg[30] + 'px; height:' + Cfg[31] + 'px';
	var res = node.parentNode.appendChild(newNode('img'));
	res.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABlBMVEUAAAAAAAClZ7nPAAAAAWJLR0QAiAUdSAAAAAF0Uk5TAEDm2GYAAAAWSURBVHjaY2BAAYyMDMNagBENYAgAABMoAD3fBUDWAAAAAElFTkSuQmCC';
	res.id = getId('resizer');
	var xpos = '14';
	var ypos = '6';
	if(chan == '0chan') xpos = '19';
	if(browzer == 'Opera') ypos = '9';
	if(browzer == 'Chrome') ypos = '2';
	res.style.cssText = 'position:relative;left:-' + xpos + 'px;top:' + ypos + 'px;cursor:se-resize';
	var resmove = function(e) {
		node.style.width = e.pageX - getCoord(node, 'offsetLeft') + 'px';
		node.style.height = e.pageY - getCoord(node, 'offsetTop') + 'px';
	};
	var resstop = function() {
		document.body.removeEventListener('mousemove', resmove, false);
		document.body.removeEventListener('mouseup', resstop, false);
		if(node.id != getId('qrtexta')) {
			saveCfg(30, parseInt(node.style.width));
			saveCfg(31, parseInt(node.style.height));
		}
	};
	res.addEventListener('mousedown', function(e) {
		e.preventDefault();
		document.body.addEventListener('mousemove', resmove, false);
		document.body.addEventListener('mouseup', resstop, false);
	}, false);
}

function changePostForm() {
	if(!postform) return;
	textareaResizer(Rmess);
	if(chan == '2-ch') {
		delNode($x('.//a', logo));
		if(captcha && Cfg[20] == 0) captcha.parentNode.parentNode.style.display = 'none';
	}
	// init fields sizes, values and visibilities
	if(Rname) Rname.size = 35;
	if(Rmail) Rmail.size = 35;
	if(Rtheme) Rtheme.size = 35;
	if(Rfile) Rfile.size = 35;
	if(Rvideo) Rvideo.size = 35;
	if(captcha) {captcha.size = 35; captcha.setAttribute('autocomplete', 'off')}
	if(Cfg[21] == 1) Rrules.style.display = 'none';
	if(Cfg[40] == 1 && Rpass) Rpass.parentNode.parentNode.style.display = 'none';
	if(Cfg[35] == 1 && Rname) setTimeout(function() {Rname.value = Cfg[36]} , 10);
	if(Cfg[22] == 1 && Rgoto_tr) Rgoto_tr.style.display = 'none';
	del_passw = $X('.//input[@type="password"]').snapshotItem(1);
	if(del_passw) {
		if(Cfg[33] == 1) setTimeout(function() {
			Rpass.value = Cfg[34];
			del_passw.value = Cfg[34];
		} , 10);
		else del_passw.value = Rpass.value;
	}
	if(captcha && wakaba) captcha.addEventListener ('keypress', forceCaptcha, false);
	var hr = $prev(delform);
	var b = delform.parentNode;
	var postarea = $x('.//div[@class="postarea"]', b);
	// hide postform in main
	if(main) {
		toggleDisplay(postarea);
		toggleDisplay(hr);
	}
	// Move postform down
	if(Cfg[29] == 1 && !main) {
		var replyhdr = $x('.//div[@class="theader"]', b) || $x('.//div[@class="replymode"]', b);
		b.insertBefore(postarea, delform.nextSibling);
		if(replyhdr) b.insertBefore(replyhdr, delform.nextSibling);
		b.insertBefore(hr, postarea.nextSibling);
	}
	// Change captcha structure for wakaba, make it refreshable
	if(captcha && wakaba) {
		var cap_td = $x('./ancestor::td', captcha);
		var cap_img = $x('.//img', cap_td);
		if(chan == '2-ch') {
			var cap_div = $id('captchadiv');
			if(cap_div) {
				captcha.removeAttribute('onfocus', 'show_captcha()');
				delNode($prev(captcha));
				delNode(cap_div);
			} else delNode($id('imgcaptcha'));
			for(var i = 0; i < Cfg[20]; i++)
				cap_td.appendChild(getCaptcha(main));
		} else {
			cap_img.addEventListener('click', function() {
				this.src = this.src.replace(/dummy=\d*/, 'dummy=' + rand10());
			}, false);
			cap_img.style.display = 'block';
		}
	}
	// remove email field, add sage select
	if(Cfg[41] == 1 && Rmail) {
		Rmail.style.display = 'none';
		if(Rname && Rname.parentNode.className != 'trap' && Rname.type != 'hidden') {
			delNexts(Rname);
			var mail_tr = (chan != '0chan') ? Rmail.parentNode.parentNode : Rmail.parentNode.parentNode.parentNode;
			Rname.parentNode.appendChild(Rmail);
			delNode(mail_tr);
		}
		var x = newNode('span');
		x.id = getId('sageman');
		x.style.cursor = 'pointer';
		x.addEventListener('click', function(e) {
			toggleCfg(32);
			sagemanFunc(Rmail, postform);
			if(QR) sagemanFunc(QRmail, QR);
			e.preventDefault();
			e.stopPropagation()
		}, false);
		delNexts(Rmail);
		Rmail.parentNode.appendChild(newTxt(' '));
		Rmail.parentNode.appendChild(x);
		sagemanFunc(Rmail, postform);
	}
	ndelform = $next(delform);
}


//-------------------------Add text format buttons-----------------------------
// Base64 from image - see http://web-apps.ru/perl-fw/data-url/

function addTextPanel(form) {
	if(!postform) return;
	var textBtns = newNode('div');
	textBtns.id = getId('textpanel');
	textBtns.innerHTML = '&nbsp;&nbsp;';
	textBtns.style.display = 'inline';
	$x('.//input[@type="submit"]', form).parentNode.appendChild(textBtns);
	var x = newNode('span');
	x.id = getId('bold_btn');
	x.title = 'Жирный';
	if(Cfg[18] == 0) x.style.cssText = 'padding:0 27px 27px 0; background:url(data:image/gif;base64,R0lGODlhFwAWAMQAAP//////AP8A//8AAAD//wD/AAAA/wAAAPb2+Onq7Bc/e053qitemNXZ3Wmdypm922hoaP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAXABYAAAWTYBQtZGmepjg+bOu+7hIxD2LfeI4/DK3/Op4PSEQIazjIYbmEQII95E3JZD530ZzyajtwbUJHYjzekhPLc8LRE5/NZa+azXCTqdWDet1W46sQc20NhIRbhQ2HhXQOiIleiFSIdAuOioaQhQs9lZF5TI6bDJ2Ff02ODaKkqKyanK2whKqxsJsjKLi4Kgq8vb6/viIhADs=) no-repeat; cursor:pointer;';
	else x.innerHTML = '<strong>[<a>B</a>]</strong> ';
	x.addEventListener('click', boldText, false);
	textBtns.appendChild(x);
	x = newNode('span');
	x.id = getId('italic_btn');
	x.title = 'Наклонный';
	if(Cfg[18] == 0) x.style.cssText = 'padding:0 27px 27px 0; background:url(data:image/gif;base64,R0lGODlhFwAWAMQAAP//////AP8A//8AAAD//wD/AAAA/wAAAPb2+Onq7Bc/e053qitemNXZ3Wmdypm922hoaP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAXABYAAAV5YBQtZGmepjg+bOu+7hIxD2LfeI4/DK3/Op4PSEQIa0TI4XcsKpk9ZBHKcCSuWKwym3X0rFztIXz1VskJJQRtBofV7G9jTp8r6/g2nn7fz80Lfmp+cws9gXt9hIYMiHiKfoyOhIuHlJeSl5SGIyienioKoqOkpaQiIQA7) no-repeat; cursor:pointer;';
	else x.innerHTML = '<strong>[<em><a>I</a></em>]</strong> ';
	x.addEventListener('click', italicText, false);
	textBtns.appendChild(x);
	if(chan != 'DC') {
		x = newNode('span');
		x.id = getId('underlined_btn');
		x.title = 'Подчеркнутый';
		if(Cfg[18] == 0) x.style.cssText = 'padding:0 27px 27px 0; background:url(data:image/gif;base64,R0lGODlhFwAWAMQAAP//////AP8A//8AAAD//wD/AAAA/wAAAPb2+Onq7Bc/e053qitemNXZ3Wmdypm926CgoGhoaP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAXABYAAAWPoCQtZGmepjg+bOu+7iIxD2LfeI4/DK3/Op4PSEQIazjIIbnMHXNKZrCHvEWtzV3Pkeh2IwdvAizuOrZlslctPjO4YvY4XHbD1/Rv3mtv+P1gEH9gf399hWARigeMhX5uC44NYIwQSpILPZGSnI6ZDJudop+hDYynqI1/pKKtrK2dmSMotLQqCri5uru6IiEAOw==) no-repeat; cursor:pointer;';
		else x.innerHTML = '<strong>[<u><a>U</a></u>]</strong> ';
		x.addEventListener('click', underlinedText, false);
		textBtns.appendChild(x);
	}
	x = newNode('span');
	x.id = getId('strike_btn');
	x.title = 'Зачеркнутый';
	if(Cfg[18] == 0) x.style.cssText = 'padding:0 27px 27px 0; background:url(data:image/gif;base64,R0lGODlhFwAWAMQAAP//////AP8A//8AAAD//wD/AAAA/wAAAPb2+Onq7Bc/e053qitemNXZ3Wmdypm922hoaE1NTf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAXABYAAAWNoCQtZGmepjg+bOu+7iIxD2LfeI4/DK3/Op4PSEQIazrIYQn5HXXL6KGZe+KUkIQWW+05tOAlWCseO7zjBDbNPjO+aog8Kq/XtW54en5g470NgYKDWIOBeYNLhoqGbguEU4KFhgs9j4lSBxGGgZUMl5BMnJ2Wo6aDnqCno6mrp5UjKLKyKgq2t7i5uCIhADs=) no-repeat; cursor:pointer;';
	else x.innerHTML = '<strong>[<a>S</a>]</strong> ';
	x.addEventListener('click', strikeText, false);
	textBtns.appendChild(x);
	x = newNode('span');
	x.id = getId('spoiler_btn');
	x.title = 'Спойлер';
	if(Cfg[18] == 0) x.style.cssText = 'padding:0 27px 27px 0; background:url(data:image/gif;base64,R0lGODlhFwAWAMQAAP//////AP8A//8AAAD//wD/AAAA/wAAAPb2+Onq7Bc/e053qitemNXZ3Wmdypm922hoaP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAXABYAAAV7YBQtZGmepjg+bOu+7hIxD2LfeI4/DK3/Op4PSEQIa0Xg0XZoOp9Q2xIBqVqvWGnPkUhgv9euY9sFm8Vkr/mLZnDV63Bi7G404lg73WGH+p96PQt2hIWGhguCh4uHiQyDjJENjpCSi5SWjJiZjQwjKKCgKgqkpaanpiIhADs=) no-repeat; cursor:pointer;';
	else x.innerHTML = '<strong>[<a>%</a>]</strong> ';
	x.addEventListener('click', spoilerText, false);
	textBtns.appendChild(x);
	x = newNode('span');
	x.id = getId('code_btn');
	x.title = 'Код';
	if(Cfg[18] == 0) x.style.cssText = 'padding:0 27px 27px 0; background:url(data:image/gif;base64,R0lGODlhFwAWAMQAAP//////AP8A//8AAAD//wD/AAAA/wAAAPb2+Onq7Bc/e053qitemNXZ3Wmdypm922hoaP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAXABYAAAWGYBQtZGmepjg+bOu+7hIxD2LfeI4/DK3/Op4PSEQIa0Xg8Qc5OCGQYA+Jazqv0V3Pkeh2rd4ENJxwbMlNsrp8DjvXZDOD6z7Aw3JHY7938v+AeYBNgIUNcguDfnxQgAs9iYpXT46QhlYHjZUMkYaee4+cn6OhnaOFjyMoq6sqCq+wsbKxIiEAOw==) no-repeat; cursor:pointer;';
	else x.innerHTML = '<strong>[<a>C</a>]</strong> ';
	x.addEventListener('click', codeText, false);
	textBtns.appendChild(x);
}


//-------------------------------Make Quick Reply------------------------------

function quickReply(pNode, pNum) {
	var tNode = getThread(pNode);
	var tNum = tNode.id.match(/\d+/);
	if(QR) {
		if($next(pNode) == QR && QR.style.display != 'none') {
			QR.style.display = 'none';
			return;
		}
		QR.style.display = 'block';
	} else {
		QR = postform.cloneNode(true);
		QR.className = 'reply';
		QR.id = getId('quickreply');
		QR.tnum = tNum;
		delNode($x('.//img[@id="' + getId('resizer') + '"]', QR));
		var mess = $x('.//textarea', QR);
		mess.id = getId('qrtexta');
		textareaResizer(mess);
		var sage = $x('.//span[@id="' + getId('sageman') + '"]', QR);
		if(sage) QRmail = $prev(sage);
		QRname = $x('.//input[@name="nya1"]', QR) || $x('.//input[@name="akane"]', QR) || $x('.//input[@name="name"]', QR);
		delNode($x('.//div[@id="' + getId('textpanel') + '"]', QR));
		addTextPanel(QR);
		// append text quote button
		var x = newNode('span');
		x.id = getId('quote_btn');
		x.title = 'Цитировать выделенный текст';
		if(Cfg[18] == 0) x.style.cssText = 'padding:0 27px 27px 0; background:url(data:image/gif;base64,R0lGODlhFwAWAMQAAP//////AP8A//8AAAD//wD/AAAA/wAAAPb2+Onq7Bc/e053qitemNXZ3Wmdypm922hoaP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAXABYAAAWEYBQtZGmepjg+bOu+7hIxD2LfeI4/DK3/Op4PSEQIa7jDoWg75iAQZdGpg0p/Qkdiy+VaD92to6cNh7/dMaNsPke5anabq4TAyY28ft+oQ/ZxfHt+gmoLgn0HUIgNCz2Hg4p/jI2PfIuUeY4MkJmIm52efKCinwwjKKmpKgqtrq+wryIhADs=) no-repeat; cursor:pointer;';
		else x.innerHTML = '<strong>[<a>&gt;</a>]</strong>';
		x.addEventListener('mouseover', function(){
			quotetxt = window.getSelection().toString().replace(/\n/g, '\n>');
		}, false);
		x.addEventListener('click', function(){
			InsertInto($x('.//textarea', QR), '\n>' + quotetxt);
		}, false);
		$x('.//div[@id="' + getId('textpanel') + '"]', QR).appendChild(x);
		// append sageman
		if(sage) sage.addEventListener('click', function(e) {
			toggleCfg(32);
			sagemanFunc(QRmail, QR);
			sagemanFunc(Rmail, postform);
			e.preventDefault();
			e.stopPropagation();
		}, false);
		// 0chan captcha update
		if(chan == '0chan' && captcha) {
			captcha.value = ' ';
			x = $x('.//img[@id="captchaimage"]', QR);
			x.src = 'http://www.0chan.ru/captcha.php?' + Math.random();
			x.id = 'qrcaptchaimage';
			x.parentNode.setAttribute("onclick", "javascript:document.getElementById('qrcaptchaimage').src = 'http://www.0chan.ru/captcha.php?' + Math.random();return false;");
		}
	}
	// rebuild reply to current thread
	if(main) {
		if(wakaba) {
			var inp = newInput('hidden', tNum, null, 'parent');
			var trap = $x('.//div[@class="trap"]', QR) || $x('.//div[@class="its_a_tarp"]', QR) || $x('.//input[@name="name"]', QR) || $x('.//input[@name="akane"]', QR);
			QR.insertBefore(inp, trap);
		}
		if(chan == '0chan') {
			$x('.//input[@name="replythread"]', QR).value = tNum;
			$x('.//span[@id="posttypeindicator"]', QR).textContent = 'ответ на ' + tNum;
		}
		if(chan == 'DC')
			$x('.//input[@name="thread_id"]', QR).value = tNum;
	}
	// Captcha update
	var cap = $x('.//input[@name="captcha"]', QR);
	if(cap && wakaba) {
		cap_tr = cap.parentNode;
		cap.addEventListener('keypress', forceCaptcha, false);
		if(chan == '2-ch') {
			var cap_img = $X('.//img[@id="imgcaptcha"]', QR);
			for(var i = 0; i < Cfg[20]; i++)
				delNode(cap_img.snapshotItem(i));
			for(var i = 0; i < Cfg[20]; i++)
				cap_tr.appendChild(getCaptcha(false, tNum));
		} else {
			var cap_img = $x('.//img', cap_tr);
			cap_img.addEventListener('click', function(e) {
				this.src = this.src.replace(/dummy=\d*/, 'dummy=' + rand10());
			}, false);
		}
		if(chan == 'iichan') cap_img.src = '/cgi-bin/captcha.pl/' + board + '/?key=res' + tNum + '&amp;dummy=' + rand10();
		if(chan == 'unyl' || chan == 'nowere') cap_img.src = '/' + board + '/captcha.pl?key=res' + tNum + '&amp;dummy=' + rand10();
	}
	// restore message text
	var mess = $x('.//textarea', QR);
	if(mess.value == '') {
		var txt = Rmess.value;
		if(txt == '') txt = '>>' + pNum; 
		else txt += '\n>>' + pNum;
		mess.value = txt;
	} else InsertInto(mess, '\n>>' + pNum);
	$x('.//input[@type="submit"]', QR).addEventListener('click', function() {Rmess.value = mess.value}, false);
	pNode.parentNode.insertBefore(QR, $next(pNode));
}


//----------------------Check for correct reply submit-------------------------

function submitCheck() {
	if(!postform) return;
	var x = newNode('div');
	x.innerHTML = '<iframe name="submitcheck" id="submitcheck" src="about:blank" style="visibility:hidden; width:0px; height:0px; border:none;"></iframe>';
	$x('.//body').appendChild(x);
	postform.setAttribute('target', 'submitcheck');
	var iframeload = function(e) {
		with(e.srcElement || e.originalTarget) var frame = contentDocument;
		if(!frame.body) return;
		if(frame.location == 'about:blank' || !frame.body.innerHTML) return;
		var warning = frame.getElementsByTagName('h2')[0] || frame.getElementsByTagName('h1')[0];
		var frdelform = frame.getElementById('delform');
		if(chan != 'DC' && (warning || !frdelform)) {
			if(!warning) warning = 'Ошибка:\n' + frame.innerHTML;
			alert(warning.firstChild.textContent);
			frame.location.replace('about:blank');
			return;
		} else if(frame.location.pathname.indexOf('/error/') != -1) {
			var nodes = frame.getElementsByTagName('td');
			for(var node, i = 0; node = nodes[i++];)
				if(node.className == 'post-error') alert('Ошибка: ' + node.textContent);
			frame.location.replace('about:blank');
			return;
		}
		Rmess.value = ''; Rfile.value = '';
		if(QR || !main) {
			if(main) expandThread(postByNum[QR.tnum], QR.tnum, 8);
			else {delNode(QR); showNewPosts()}
			QR = undefined;
			if(captcha) captcha.value = '';
			if(wakaba && captcha) {
				var cap_td = $x('./ancestor::td', captcha);
				if(chan == '2-ch') capRefresh(cap_td.firstChild);
				else {
					var cap = $x('.//img', cap_td);
					cap.src = cap.src.replace(/dummy=\d*/, 'dummy=' + rand10());
				}
			}
		} else window.location = frame.location;
		frame.location.replace('about:blank');
	}
	if(browzer == 'Opera') window.addEventListener('DOMFrameContentLoaded', iframeload, false);
	else $id('submitcheck').addEventListener('load', iframeload, false);
}


//------------------------Append styles for elements---------------------------

function addScriptStyles() {
	var txt = '.hidepostbtn {padding-left: 18px; cursor:pointer; background:url(data:image/gif;base64,R0lGODlhDgAPALMAAP//////AP8A//8AAAD//wD/AAAA/wAAAN3d3cDAwJmZmYCAgGBgYEtLS////wAAACH5BAEAAA4ALAAAAAAOAA8AAARU0MlJq7o4X7dQ+mCILAuohOdHfgpQJguQLowSA+7tKkxt4wgEbnHpkWhCAIJxNJIYyWWTSQMmqUYGDtBobJmMxhOAJZO6LM3l0/WE3oiGo0uv0x0RADs=) no-repeat}  .unhidepostbtn {padding-left: 18px; cursor:pointer; background:url(data:image/gif;base64,R0lGODlhDgAPALMAAP//////AP8A//8AAAD//wD/AAAA/wAAAN3d3cDAwJmZmYCAgGBgYEtLS////wAAACH5BAEAAA4ALAAAAAAOAA8AAARN0MlJq7o4X7dQ+mCILEuYMIxJfheDIMz1LTHGAEDd1uidozsaAvciMmhHF3EIgCFJPVwPeiTRpFZaI+tyWhsN1g7zAXtMooYDzG6zHREAOw==) no-repeat}  .quickreplybtn {padding-left: 18px; cursor:pointer; background:url(data:image/gif;base64,R0lGODlhDgAPALMAAP//////AP8A//8AAAD//wD/AAAA/wAAAN3d3cDAwJmZmYCAgGBgYEtLS////wAAACH5BAEAAA4ALAAAAAAOAA8AAARO0MlJq7o4X7dQ+mCILAt4hSD5LQCghgtzsa27YIys0LV75SRGr4VgxIyxIaB4DPYQiEYQ2SBGpUFsA9rAkhZdUFejSHQ9KFHD0W27244IADs=) no-repeat}  .sagemarker {padding-left: 18px; cursor:pointer; background:url(data:image/gif;base64,R0lGODlhDgAPALMAAP//////AP8A//8AAAD//wD/AAAA/wAAAO7u7oCAgGBgYEtLS////wAAAAAAAAAAACH5BAEAAAwALAAAAAAOAA8AAARBkMlJq7o4X6aS/6B3fVonmomCrAiqLNiyeHIMXwuL3K/sz4mfUKYbCmnGxUG3OvwwS9bBlolObSfF4WpaMJI/RgQAOw==) no-repeat}  .expandthreadbtn {padding-left: 18px; cursor:pointer; background:url(data:image/gif;base64,R0lGODlhDgAPALMAAP//////AP8A//8AAAD//wD/AAAA/wAAAN3d3cDAwJmZmYCAgGBgYEtLS////wAAACH5BAEAAA4ALAAAAAAOAA8AAARP0MlJq7o4X7dQ+gsALF+CLCSIiGeJqiKbLkzGIEiNMfp15zYGCtXANYY04bCIOA55SKYTBV0akQxnMQZoEhulbRf8aRTDIrKp4TC7325HBAA7) no-repeat}  .favoritiesbtn {padding-left: 18px; cursor:pointer; background:url(data:image/gif;base64,R0lGODlhDgAPALMAAP//////AP8A//8AAAD//wD/AAAA/wAAAN3d3cDAwJmZmYCAgGBgYEtLS////wAAACH5BAEAAA4ALAAAAAAOAA8AAART0MlJq7o4X7dQ+skFJsiyjAqCKKOJAgALLoxpInBpMzUM4D8frcbwGQHEGi1hTCh5puLxWWswAY0GLNGgdbVYE/hr5ZY/WXTDM2ojGo6sfC53RAAAOw==) no-repeat}';
	if(chan == '2-ch' || chan == '0chan') txt += '  .postblock {background:#bbb}'; // gray color for postform
	if(Cfg[39] == 1) txt += '  .spoiler {background:#888 !important; color:#CCC !important}'; // open spoilers
	var x = newNode('style');
	x.type = 'text/css';
	x.textContent = txt;
	$x('.//head').appendChild(x);
}

//=============================================================================
//						FOR POSTS AND THREADS
//=============================================================================

function forEachReply(fn) {
	for(var pNode, i = 0; pNode = pNodes[i++];)
		fn(pNode, pNode.id.match(/\d+/), i + 1, false);
}

function forOPReply(fn) {
	for(var pNode, i = 0; pNode = opNodes[i++];)
		fn(pNode, pNode.id.match(/\d+/), 1, true);
}

function forAllReplies(fn) {
	forEachReply(fn);
	forOPReply(fn);
}

function getThread(node) {
	return $x('./ancestor::div[@class="thread"]', node);
}

function getPost(node) {
	if(chan != '0chan') return $x('./ancestor::table', node);
	else return $x('./ancestor::div[@class="postnode"]', node) || $x('./ancestor::table[@class="replypost"]', node);
}

function getPostMsg(pNode) {
	if(wakaba) return $x('.//blockquote', pNode);
	if(chan == '0chan') return $x('.//div[@class="postmessage"]', pNode);
	if(chan == 'DC') return $x('.//div[@class="message"]', pNode) || $x('.//div[@class="postbody"]', pNode);
}

function isNoText(pNode) {
	if(pNode.Text.replace(/\s/g, '').length < 3) return true;
	return false;
}

function isSagePost(pNode) {
	if(chan == 'iichan' || chan == 'olanet') return false;
	if(wakaba) {
		var a = $x('.//a[starts-with(@href,"mailto:")]', pNode);
		if(a && a.href.toLowerCase().indexOf('mailto:sage') != -1) return true;
		else return false;
	}
	if(chan == 'DC' && $x('.//img[@alt="Сажа"]', pNode)) return true;
	if(chan == '0chan' && $x('.//span[@class="postername"]/a[@href="mailto:sage"]', pNode)) return true;
	return false;
}

function makeNotice(pNode, pNum, text) {
	var x = newNode('a');
	x.id = getId('notice', pNum);
	x.style.cssText = 'font-size:12px; font-style:italic;';
	x.appendChild(newTxt(text));
	x.addEventListener('click', function(){delNode(this)}, false);
	pNode.Btns.appendChild(x);
}

function addHideThreadButton(pNode, pNum) {
	if(chan == '0chan') delNode($x('.//span[starts-with(@id,"hide")]', pNode));
	var x = newNode('span');
	x.title = 'Скрыть тред';
	if(Cfg[18] == 0) x.className = 'hidepostbtn';
	else {x.innerHTML = '[<a>Скрыть</a>] '; x.style.cursor = 'pointer'}
	x.addEventListener('click', function(){hideThread(pNode, pNum)}, false);
	return x;
}

function addExpandThreadButton(pNode, pNum) {
	if(chan == '0chan') {
		var old = $x('.//img[@class="expandthread"]', pNode);
		if(old) delNode(old.parentNode);
	}
	var x = newNode('span');
	x.id = getId('expandthread', pNum);
	if(Cfg[18] == 0) x.className = 'expandthreadbtn';
	else {x.innerHTML = '[<a>Развернуть</a>] '; x.style.cursor = 'pointer'}
	x.addEventListener('mouseover', function(){expandThreadSelect(pNode, pNum)}, false);
	x.addEventListener('mouseout', function(e){removeSelect(e.relatedTarget)}, false);
	x.addEventListener('click', function(){expandThread(pNode, pNum, 1)}, false);
	return x;
}

function addFavoritiesButton(pNode, pNum) {
	var x = newNode('span');
	x.title = 'В избранное';
	if(Cfg[18] == 0) x.className = 'favoritiesbtn';
	else {x.innerHTML = '[<a>В избранное</a>] '; x.style.cursor = 'pointer'}
	x.addEventListener('click', function(){storeFavorities(pNode, pNum, 1)}, false);
	return x;
}

function addHidePostButton(pNode, pNum) {
	var x = newNode('span');
	x.id = getId('posthider', pNum);
	x.className = 'hidepostbtn';
	x.addEventListener('mouseover', function(){postHiderSelect(pNode, pNum)}, false);
	x.addEventListener('mouseout', function(e){removeSelect(e.relatedTarget)}, false);
	x.addEventListener('click', function(){togglePostVisibility(pNode, pNum)}, false);
	return x;
}

function postHiderSelect(pNode, pNum) {
	if(Cfg[11] == 0) return;
	var x = newNode('div');
	x.id = 'selectmenu';
	x.className = 'reply';
	x.style.cssText = 'position:absolute; left:' + (getCoord($id(getId('posthider', pNum)), 'offsetLeft')).toString() + 'px; top:' + (getCoord($id(getId('posthider', pNum)), 'offsetTop') + 16).toString() + 'px; z-index:250; border-style:solid; border-width:1px; cursor:pointer; width:auto';
	x.innerHTML = '<a>Hide by text</a><br><a>Hide by image</a>';
	x.addEventListener('mouseout', function(e){removeSelect(e.relatedTarget)}, false);
	delform.parentNode.insertBefore(x, delform);
	$X('.//a', x).snapshotItem(0).addEventListener('click', function(){hideSameTextPosts(pNode, pNum)}, false);
	$X('.//a', x).snapshotItem(1).addEventListener('click', function(){hideSameImagePosts(pNode, pNum)}, false);
}

function removeSelect(x)
	{if(!$x('ancestor-or-self::*[@id="selectmenu"]', x)) delNode($id('selectmenu'))}

function addQuickReplyButton(pNode, pNum, op) {
	if(chan == 'DC') delNode($x('.//a[@class="reply_ icon"]', pNode));
	var x = newNode('span');
	x.title = 'Быстрый ответ';
	if(!(Cfg[18] == 1 && op)) x.className = 'quickreplybtn';
	else {x.innerHTML = '[<a>Быстрый ответ</a>] '; x.style.cursor = 'pointer'}
	x.addEventListener('click', function(){quickReply(pNode, pNum)}, false);
	return x;
}

function addSageMarker() {
	var x = newNode('span');
	x.title = 'SAGE';
	x.className = 'sagemarker';
	x.addEventListener('click', function(){toggleSage(); toggleCheck($id(getId('sage_hider')))}, false);
	return x;
}

function addPostCounter(pNode, pNum, pcount) {
	var x = newNode('span');
	x.appendChild(newTxt(pcount + ' '));
	x.style.cssText = 'font-size:13px;font-style:italic;font-weight:bold;cursor:default;color:' + ((pcount >= 500) ? '#c41e3a' : '#4f7942');
	return x;
}

function addExpandAllImgButton() {
	if($X('.//img[@class="thumb"]', delform).snapshotLength > 1) {
		var x = newNode('div');
		x.id = getId('expandall');
		x.innerHTML = '[<a>Раскрыть изображения</a>]';
		x.style.cursor = 'pointer';
		x.addEventListener('click', expandAllImages, false);
		opNodes[0].appendChild(x);
	}
}

function addPostButtons(pNode, pNum, pcount) {
	var div = newNode('span');
	var x = [], i = 0, C = Cfg;
	var op = pNode.isOp;
	if(chan == 'DC') div.innerHTML = '&nbsp;';
	if(!op) {
		div.className = 'reflink';
		if(!main || pNode.Loaded) x[i++] = addPostCounter(pNode, pNum, pcount);
		if(C[19] == 1 && pNode.isSage) x[i++] = addSageMarker();
		if(C[16] == 1 && postform) x[i++] = addQuickReplyButton(pNode, pNum, op);
		x[i++] = addHidePostButton(pNode, pNum);
	} else {
		if(C[18] == 0) div.className = 'reflink';
		if(C[19] == 1 && pNode.isSage) x[i++] = addSageMarker();
		if(C[17] == 1) x[i++] = addFavoritiesButton(pNode, pNum);
		if(C[16] == 1 && postform) x[i++] = addQuickReplyButton(pNode, pNum, op);
		if(main) x[i++] = addExpandThreadButton(pNode, pNum);
		x[i++] = addHideThreadButton(pNode, pNum);
	}
	var i = x.length;
	while (i--) div.appendChild(x[i]);
	var reflink = $x('.//span[@class="reflink"]', pNode);
	reflink.parentNode.insertBefore(div, reflink.nextSibling);
	pNode.Btns = div;
	if(C[25] == 1) pNode.Msg.style.maxHeight = '100%';
}

//-----------------------------------Add players---------------------------------

function makeYouTube(pNode, pNum) {
	if(!pNode.Text.match('youtube')) return;
	var node = pNode.Msg;
	var links = $X('.//a[contains(@href,"youtube")]', node);
	if(links.snapshotLength > 0) {
		var pattern = /^http:\/\/(www\.)?youtube\.com\/watch\?v=([^&]+).*$/;
		var template = 'http://www.youtube.com/v/desu&hl=en_US&fs=1&';
		var yDiv = newNode('div');
		var thumbn = $x('.//span[@class="thumbnailmsg"]', pNode);
		if(thumbn) thumbn.textContent += '. Просмотр YouTube.';
		yDiv.id = getId('youtube_div', pNum);
		node.insertBefore(yDiv, node.firstChild);
		for(var i = 0; i < links.snapshotLength; i++) {
			var link = links.snapshotItem(i);
			if(link.href.match(pattern)) {
				var yLink = template.replace('desu', link.href.match(pattern)[2]);
				var x = newNode('span');
				x.innerHTML = '<strong> ' + unescape('%u25BA') + '</strong>';
				x.style.cursor = 'pointer';
				x.addEventListener('click', function(link, num){return function(){insertYouTube(link, num)}}(yLink, pNum), false);
				link.parentNode.insertBefore(x, link.nextSibling);
				if(i == 0) insertYouTube(yLink, pNum);
			}
		}
	}
}

function insertYouTube(yLink, pNum) {
	var yDiv = $id(getId('youtube_div', pNum));
	var old = $x('.//embed[@src="' + yLink + '"]', yDiv);
	if(old) delChilds(yDiv);
	else inHTML(yDiv, '&nbsp;<embed src="' + yLink + '" type="application/x-shockwave-flash" wmode="transparent" width="320" height="262"></embed>');
}

function searchMP3() {
	var links = $X('.//a[contains(@href,".mp3") or contains(@href,".wav")]', delform);
	if(links.snapshotLength > 0) forAllReplies(makeMP3);
}

function makeMP3(pNode, pNum) {
	var links = $X('.//a[contains(@href,".mp3") or contains(@href,".wav")]', pNode);
	if(links.snapshotLength > 0) {
		var node = pNode.Msg;
		var mp3 = newNode('div');
		mp3.id = getId('mp3_div', pNum);
		node.insertBefore(mp3, node.firstChild);
		for(var i = 0; i < links.snapshotLength; i++) {
			var link = links.snapshotItem(i);
			if(!$x('.//param[contains(@value,"' + link.href + '")]', mp3))
				mp3 = inHTML(mp3, '<object data="http://junglebook2007.narod.ru/audio/player.swf" wmode="transparent" type="application/x-shockwave-flash" width="220" height="16"><param value="http://junglebook2007.narod.ru/audio/player.swf" name="movie"><param value="playerID=1&amp;bg=0x808080&amp;leftbg=0xB3B3B3&amp;lefticon=0x000000&amp;rightbg=0x808080&amp;rightbghover=0x999999&amp;rightcon=0x000000&amp;righticonhover=0xffffff&amp;text=0xffffff&amp;slider=0x222222&amp;track=0xf5f5dc&amp;border=0x666666&amp;loader=0x7fc7ff&amp;loop=yes&amp;autostart=no&amp;soundFile=' + link.href + '&amp;" name="FlashVars"><param value="high" name="quality"><param value="true" name="menu"><param value="transparent" name="wmode"></object><br>  ');
		}
	}
}

//--------------------------Expand shorted posts in MAIN-------------------------

function expandPosts(pNode, pNum) {
	if(getVisib(pNum) == HIDE) return;
	var abbrev = $x('.//div[@class="abbrev"]', pNode);
	if(!abbrev) return;
	var tNum = getThread(pNode).id.match(/\d+/);
	loadAJAX(tNum, board, function() {
		var txt = ajaxThrds[tNum][pNum];
		pNode.Msg = inHTML(pNode.Msg, txt.substring(txt.indexOf('<blockquote') + 12, txt.lastIndexOf('</blockquote>')));
		if(Cfg[25] == 1) pNode.Msg.style.maxHeight = '100%';
		if(Cfg[26] == 1) linksPreview(pNode.Msg);
		if(Cfg[27] == 1) makeYouTube(pNode, pNum);
		if(Cfg[28] == 1) makeMP3(pNode, pNum);
	});
}

//----------------------------Expand thread in MAIN mode-------------------------

function expandThreadSelect(opNode, tNum) {
	var x = newNode('div');
	x.id = 'selectmenu';
	x.className = 'reply';
	x.style.cssText = 'position:absolute; left:' + (getCoord($id(getId('expandthread', tNum)), 'offsetLeft')).toString() + 'px; top:' + (getCoord($id(getId('expandthread', tNum)), 'offsetTop') + 16).toString() + 'px; z-index:250; border-style:solid; border-width:1px; cursor:default; width:auto';
	x.innerHTML = '<a name="5">5 постов</a><br><a name="15">15 постов</a><br><a name="30">30 постов</a><br><a name="50">50 постов</a><br><a name="100">100 постов</a>';
	x.addEventListener('mouseout', function(e){removeSelect(e.relatedTarget)}, false);
	delform.parentNode.insertBefore(x, delform);
	for(var a, i = 0; a = $X('.//a', x).snapshotItem(i); i++)
		a.addEventListener('click', function(){expandThread(opNode, tNum, parseInt(this.name))}, false);
}

function expandThread(opNode, tNum, last) {
	var tNode = getThread(opNode);
	var x = $x('.//span[@class="omittedposts"]', tNode) || $x('.//div[@class="abbrev"]', tNode);
	if(x) delNode(x);
	if(wakaba) expandPosts(opNode, tNum);
	delNexts(opNode);
	loadAJAX(tNum, board, function() {
		var len = ajaxThrds[tNum].keys.length;
		if(last != 1) last = len - last;
		if(last <= 0) last = 1;
		for(var i = last; i < len; i++) {
			var pnum = ajaxThrds[tNum].keys[i];
			var x = newNode('table');
			x.className = 'replypost';
			x.id = 'post_' + pnum;
			x.innerHTML = '<tbody><tr><td class="doubledash">&gt;&gt;</td><td class="reply" style="width:auto" id="reply' + pnum + '">' + ajaxThrds[tNum][pnum] + '</td></tr></tbody>';
			tNode.appendChild(x);
			addPostFunc(x, pnum, i + 1);
		}
	});
}

function addPostFunc(pNode, pNum, count) {
	pNodes.push(pNode);
	postByNum[pNum] = pNode;
	postCounts[pNum] = count;
	pNode.Msg = getPostMsg(pNode);
	pNode.Text = getTextImpl(pNode.Msg).trim();
	pNode.Img = $x('.//img[@class="thumb"]', pNode);
	pNode.isSage = isSagePost(pNode);
	pNode.isOp = false;
	pNode.Loaded = true;
	if(Cfg[25] == 1) pNode.Msg.style.maxHeight = '100%';
	addPostButtons(pNode, pNum, count);
	doPostFilters(pNode, pNum);
	if(getVisib(pNum) == HIDE) setPostVisibility(pNode, pNum, HIDE);
	if(Cfg[13] == 1 && !main) collectHiddenPosts(pNode, pNum);
	if(Cfg[15] == 1) joinRefMap(pNode);
	if(Cfg[23] == 1 && wakaba) imageHandling(pNode, pNum);
	if(Cfg[26] == 1) linksPreview(pNode.Msg);
	if(Cfg[27] == 1) makeYouTube(pNode, pNum);
	if(Cfg[28] == 1) makeMP3(pNode, pNum);
}

//----------------------------Load new posts in THREAD---------------------------

function initNewPosts() {
	if(Cfg[37] == 1) {
		var tNode = $x('.//div[@class="thread"]');
		var x = newNode('span');
		x.id = getId('newposts_btn');
		x.innerHTML = '[<em><a>Новые посты:</a></em> 0]';
		x.style.cursor = 'pointer';
		x.addEventListener('click', showNewPosts, false);
		if(chan == '0chan') tNode.insertBefore(x, $x('.//span[@style="float: right;"]', tNode));
		else tNode.appendChild(x);
		setInterval(function(){
			loadAJAX(opNum, board, function(){
				$id(getId('newposts_btn')).innerHTML='[<em><a>Новые посты:</a></em> ' + parseInt(ajaxThrds[opNum].keys.length - pNodes.length - 1) + ']';
			})
		}, 30000);
	} 
	if(Cfg[37] == 2) setInterval(showNewPosts, 30000);
}

function showNewPosts() {
	var tNode = $x('.//div[@class="thread"]');
	loadAJAX(opNum, board, function() {
		var count = pNodes.length + 1;
		for(var i = count; i < ajaxThrds[opNum].keys.length; i++) {
			var num = ajaxThrds[opNum].keys[i];
			var x = newNode('table');
			x.className = 'replypost';
			x.id = 'post_' + num;
			x.innerHTML = '<tbody><tr><td class="doubledash">&gt;&gt;</td><td class="reply" style="width:auto" id="reply' + num + '">' + ajaxThrds[opNum][num] + '</td></tr></tbody>';
			if(Cfg[37] == 1) tNode.insertBefore(x, $id(getId('newposts_btn')));
			else {if(chan == '0chan') tNode.insertBefore(x, $x('.//span[@style="float: right;"]', tNode));
				else tNode.appendChild(x)}
			addPostFunc(x, num, i + 1);
			if(i == ajaxThrds[opNum].keys.length - 1) storeHiddenPosts();
		}
	});
	if(Cfg[37] == 1) $id(getId('newposts_btn')).innerHTML = '[<em><a>Новые посты:</a></em> 0]';
}

//---------------------------------Expand images---------------------------------

function expandImg(img) {
	img.style.display = 'none';
	img.removeEventListener('click', expandImgHandle, false);
	var x = newNode('img');
	x.className = 'thumb_full';
	x.src = img.parentNode.href;
	x.border = '0';
	x.style.display = 'block';
	x.addEventListener('click', collapseImgHandle, false);
	img.parentNode.appendChild(x);
}

function collapseImg(x) {
	var img = $x('.//img[@class="thumb"]', x.parentNode);
	delNode(x);
	img.style.display = 'inline';
	img.addEventListener('click', expandImgHandle, false);
}

function expandImgHandle(e){e.preventDefault(); expandImg(e.target)}
function collapseImgHandle(e){e.preventDefault(); collapseImg(e.target)}

function imageHandling(pNode) {
	var img = pNode.Img;
	if(img) img.addEventListener('click', expandImgHandle, false);
}

function expandAllImages() {
	var btn = $id(getId('expandall'));
	if(btn.innerHTML.indexOf('Раскрыть') != -1) {
		btn.innerHTML = '[<a>Свернуть изображения</a>]';
		forEachReply(function(pNode) {
			if(pNode.Img && !$x('.//img[@class="thumb_full"]', pNode)) expandImg(pNode.Img);
		});
	} else {
		btn.innerHTML = '[<a>Раскрыть изображения</a>]';
		forEachReply(function(pNode) {
			var img = $x('.//img[@class="thumb_full"]', pNode);
			if(img) collapseImg(img);
		});
	}
}

//-------------------------Collect hidden posts in blocks------------------------

function collectHiddenPosts(pNode, pNum) {
	if(getVisib(pNum) == HIDE) {
		hDivs++;
		if(hDivs == 1) {
			var hDiv = newNode('div');
			hDiv.id = getId('hiddenblock', pNum);
			hDiv.style.display = 'none';
			pNode.parentNode.insertBefore(hDiv, pNode);
			var x = newNode('span');
			x.style.display = 'block';
			x.id = getId('hiddenblock_msg', pNum);
			x.addEventListener('click', function(){togglehideBlock(pNode, pNum)}, false);
			pNode.parentNode.insertBefore(x, hDiv);
		}
		if(!hDiv) var hDiv = $prev(pNode);
		hDiv.appendChild(pNode);
		if(!$next(hDiv) || getVisib($next(hDiv).id.match(/\d+/)) == UNHIDE)
			$prev(hDiv).innerHTML = unescape('%u25B2') + '[<em><a>Скрыто:</a> ' + hDiv.childNodes.length + '</em>]';
	} else hDivs = 0;
}

function togglehideBlock(pNode, pNum) {
	var hDiv = $id(getId('hiddenblock', pNum));
	var len = '[<em><a>Скрыто:</a> ' + hDiv.childNodes.length + '</em>]';
	$prev(hDiv).innerHTML = (hDiv.style.display == 'none') ? unescape('%u25BC') + len : unescape('%u25B2') + len;
	toggleDisplay(hDiv);
}

//------------------------------Create map of answers----------------------------

function initRefMap() {
	var links = toArray($X('.//a[starts-with(text(),">>")]'));
	var refNum, refNode, pNode, pNum, refmap;
	var arr = [];
	for(var link, i = 0; link = links[i++];) {
		if(link.textContent.indexOf('/') != -1) continue;
		refNum = link.hash.match(/\d+/) || link.pathname.substring(link.pathname.lastIndexOf('/')).match(/\d+/);
		refNode = postByNum[refNum];
		pNode = getPost(link);
		if(!refNode || !pNode) continue;
		pNum = pNode.id.match(/\d+/);
		if(!arr[refNum]) arr[refNum] = pNum;
		else if(arr[refNum].indexOf(pNum) == -1) arr[refNum] += ', ' + pNum ;
	}
	forAllReplies(function(refNode, refNum) {
		if(arr[refNum]) {
			refmap = newNode('small');
			refmap.id = getId('refmap', refNum);
			refmap.innerHTML = '<em><br>Ответы: ' + arr[refNum].toString().replace(/(\d+)/g, '<a href="#$1">&gt;&gt;$1</a>') + '</em>';
			linksPreview(refmap);
			refNode.Msg.parentNode.appendChild(refmap);
		}
	});
}

function joinRefMap(pNode) {
	var links = toArray($X('.//a[starts-with(text(),">>")]', pNode.Msg));
	var refNum, refNode, pNode, pNum, refmap;
	for(var link, i = 0; link = links[i++];) {
		if(link.textContent.indexOf('/') != -1) continue;
		refNum = link.hash.match(/\d+/) || link.pathname.substring(link.pathname.lastIndexOf('/')).match(/\d+/);
		refNode = postByNum[refNum];
		if(!refNode) continue;
		pNum = pNode.id.match(/\d+/);
		refmap = $id(getId('refmap', refNum));
		if(!refmap) {
			refmap = newNode('small');
			refmap.id = getId('refmap', refNum);
			refmap.style.cssText = 'font-size:small;font-style:italic';
			refmap.innerHTML = '<br>Ответы: ';
			refNode.Msg.parentNode.appendChild(refmap);
			refNode.appendChild(newNode('em'));
		}
		refNode = refNode.firstChild;
		if(refmap.textContent.indexOf(pNum) != -1) continue;
		if($x('.//a', refmap)) refmap.appendChild(newTxt(', '));
		var ref = newNode('a');
		ref.href = '#' + pNum;
		ref.innerHTML = '&gt;&gt;' + pNum;
		refmap.appendChild(ref);
		appendLinkPreview(ref);
	}
}

//-------------------Cascade posts preview by links like >>1549967---------------

function makePostPrewievClone(e) {
	if(chan == '0chan') {
		delNode($x('.//div[starts-with(@id,"preview")]'));
		e.preventDefault();
		e.stopPropagation();
	}
	var pNum = this.hash.match(/\d+/);
	var tNum = this.pathname.substring(this.pathname.lastIndexOf('/')).match(/\d+/);
	if(!pNum) pNum = tNum;
	var b = this.pathname;
	if(b.substr(0, 1).indexOf('/') != -1) b = b.substr(1);
	b = b.split('/')[0];
	var old = $id(getId('postprewiev', pNum));
	if(old) delNode(old);
	var clone = newNode('div');
	clone.className = 'reply';
	clone.id = getId('postprewiev', pNum);
	if(b == board.split('/')[0]) var pNode = postByNum[pNum];
	if(pNode) {
		var pNode_td = $x('.//td[@class="reply"]', pNode);
		if(pNode_td) {
			clone.appendChild(pNode_td.cloneNode(true));
			$x('.//td[@class="reply"]', clone).removeAttribute('class');
			if(getVisib(pNum) == HIDE) modPostVisib(clone, pNum, UNHIDE);
		} else clone.appendChild(pNode.cloneNode(true));
	}
	if(!clone.firstChild)
		loadAJAX(tNum, b, function(error) {
			if(!error && !ajaxThrds[tNum][pNum]) {clone.textContent = 'Пост не найден...'}
			else if(error) {clone.innerHTML = error}
			else {
				clone.innerHTML = ajaxThrds[tNum][pNum];
				linksPreview(clone);
				imageHandling(clone, pNum);
			}
		});
	var x = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft;
	var y = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop;
	clone.style.cssText = 'width:auto; position:absolute; z-index:900; border: solid 1px #575763; ' + ((x < document.body.clientWidth/2) ?'left:' + x + 'px;' : 'right:' + parseInt(document.body.clientWidth - x - 80) + 'px;') + ' top:' + y + 'px;';
	delform.parentNode.insertBefore(clone, ndelform);
	linksPreview(clone);
	imageHandling(clone, pNum);
	clone.addEventListener('mouseout', function(e) {
		if(!$x('ancestor-or-self::*[starts-with(@id,"DESU_postprewiev")]', e.relatedTarget))
			removePostPreviewClones();
		else {
			var thisclone = $x('ancestor-or-self::*[starts-with(@id,"DESU_postprewiev")]', e.relatedTarget);
			var nextclone = $next(thisclone);
			if(thisclone)
				while ($x('ancestor-or-self::*[starts-with(@id,"DESU_postprewiev")]', nextclone)) {
					thisclone = nextclone;
					nextclone = $next(thisclone);
					delNode(thisclone);
				}
		}
	}, true);
}

function removePostPreviewClones() {
	var clones = $X('.//div[starts-with(@id,"DESU_postprewiev")]');
	var i = clones.snapshotLength;
	while(i--) delNode(clones.snapshotItem(i));
}

function appendLinkPreview(link) {
	if(chan == 'DC' || chan == 'olanet') {
		if(browzer != 'Opera') {
			if(link.getAttribute('onmouseover')) link.removeAttribute('onmouseover');
			if(link.getAttribute('onmouseout')) link.removeAttribute('onmouseout');
		} else {
			if(link.onmouseover) link.onmouseover = '';
			if(link.onmouseout) link.onmouseout = '';
		}
	}
	link.addEventListener('mouseover', makePostPrewievClone, false);
	link.addEventListener('mouseout', function(e) {
		if(!$x('ancestor-or-self::*[starts-with(@id,"DESU_postprewiev")]', e.relatedTarget))
			removePostPreviewClones(); 
	}, true);
}

function linksPreview(node) {
	if(node) var links = $X('.//a[starts-with(text(),">>")]', node);
	else var links = $X('.//a[starts-with(text(),">>")]');
	var i = links.snapshotLength;
	while(i--) appendLinkPreview(links.snapshotItem(i));
}


//=============================================================================
//							HIDERS / FILTERS
//=============================================================================

function doPostFilters(pNode, pNum) {
	if(getVisib(pNum) == HIDE) return;
	if(Cfg[0] == 1)
		detectWipePosts(pNode, pNum);
	if(Cfg[1] == 1 && chan != 'iichan')
		hideSagePosts(pNode, pNum);
	if(Cfg[2] == 1 && Rtheme)
		hideThemePosts(pNode, pNum);
	if(Cfg[3] == 1)
		hideNotextPosts(pNode, pNum);
	if(Cfg[4] == 1)
		hideNoimagePosts(pNode, pNum);
	if(Cfg[8] == 1)
		hideMaxtextPosts(pNode, pNum);
	if(Cfg[10] == 1)
		hideByRegexp(pNode, pNum);
}

//------------------------------Hide/unhide threads----------------------------

function hideThread(opNode, tNum) {
	var tNode = getThread(opNode);
	tNode.style.display = 'none';
	var htext = $x('.//span[@class="filetitle"]', tNode) || $x('.//span[@class="replytitle"]', tNode);
	if(htext) htext = htext.textContent;
	if(!htext || htext == '')
		htext = (chan != 'DC') ? getTextImpl($x('.//blockquote', tNode)) : getTextImpl($x('.//div[@class="message"]', tNode));
	htext = htext.trim().substring(0, 45); 
	if(htext.length >= 45) htext += '...';
	var x = newNode('span');
	x.style.display = 'inline';
	x.id = 'hiddenthread-' + tNum;
	x.innerHTML = 'Тред <a>№' + tNum + '</a> скрыт <i>(' + htext + ')</i>';
	$x('.//a', x).addEventListener('click', function(){unhideThread(tNode, tNum)}, false);
	tNode.parentNode.insertBefore(x, $next(tNode));
	storeHiddenThread(tNum, HIDE);
}

function unhideThread(tNode, tNum) {
	tNode.style.display = 'block';
	delNode($id('hiddenthread-' + tNum));
	storeHiddenThread(tNum, UNHIDE);
}

//-------------------------------Hide/unhide posts------------------------------

function prevHidden(e){modPostVisib(getPost(this), getPost(this).id.match(/\d+/), UNHIDE)}
function unprevHidden(e){modPostVisib(getPost(this), getPost(this).id.match(/\d+/), HIDE)}

function setPostVisibility(pNode, pNum, vis) {
	var reflink = pNode.Btns.previousSibling;
	pNode.Btns.firstChild.className = (vis == HIDE) ? 'unhidepostbtn' : 'hidepostbtn';
	if(Cfg[14] == 1) {
		if(vis == HIDE) {
			reflink.addEventListener('mouseover', prevHidden, false);
			reflink.addEventListener('mouseout', unprevHidden, false);
		} else {
			reflink.removeEventListener('mouseover', prevHidden, false);
			reflink.removeEventListener('mouseout', unprevHidden, false);
		}
	}
	modPostVisib(pNode, pNum, vis);
	setVisibilityCheap(pNum, vis);
}

function togglePostVisibility(pNode, pNum) {
	var vis = getVisib(pNum);
	vis = (vis == UNHIDE) ? HIDE : UNHIDE;
	setPostVisibility(pNode, pNum, vis);
	storePostsVisibility();
}

function hidePosts(pNode, pNum, note) {
	if(getVisib(pNum) != HIDE)
		makeNotice(pNode, pNum, ' autohide: ' + note + ' ');
	setVisibilityCheap(pNum, HIDE);
}

function unhidePosts(pNode, pNum) {
	if(detectWipe(pNode, pNum) != null) return;
	setPostVisibility(pNode, pNum, UNHIDE);
	delNode($id(getId('notice', pNum)));
	detectWipePosts(pNode, pNum);
}

function toggleSamePosts(pNode, pNum, expr, notice) {
	if(expr) {
		delNode($id(getId('notice', pNum)));
		if(origVis == UNHIDE) {
			makeNotice(pNode, pNum, notice);
			setVisibilityCheap(pNum, HIDE);
		} else unhidePosts(pNode, pNum);
	}
}

function storeHiddenPosts() {
	forEachReply(function(pNode, pNum) {
		if(getVisib(pNum) == HIDE)
			setPostVisibility(pNode, pNum, HIDE);
	});
	storePostsVisibility();
}

//-------------------------Leave header of hidden post -------------------------

function modChildVis(nodes, vis, disp) {
	var i = nodes.snapshotLength;
	if(i > 0) while (i--) nodes.snapshotItem(i).style.display = (vis == HIDE) ? 'none' : disp;
}

function modPostVisib(pNode, pNum, vis) {
	modChildVis($X('.//br', pNode), vis, '');
	modChildVis($X('.//small[@id="' + getId('refmap', pNum) + '"]', pNode), vis, '');
	if(chan != 'DC') {
		modChildVis($X('.//blockquote', pNode), vis, '');
		modChildVis($X('.//img[starts-with(@class,"thumb")]', pNode), vis, '');
		modChildVis($X('.//span[@class="filesize"]', pNode), vis, 'inline');
	} else {
		modChildVis($X('.//div[@class="postbody"]', pNode), vis, '');
		modChildVis($X('.//div[@class="file"]', pNode), vis, '');
		modChildVis($X('.//div[@class="fileinfo"]', pNode), vis, '');
	}
	if(wakaba) {
		if($x('.//img[@class="thumb_full"]', pNode))
			pNode.Img.style.display = 'none';
		var thumbn = $X('.//span[@class="thumbnailmsg"]', pNode);
		if(thumbn) modChildVis(thumbn, vis, 'inline');
	}
}

//-----------------------------------Filters-----------------------------------

function toggleStrongHide() {
	toggleCfg(12);
	forEachReply(function(pNode, pNum) {
			if(getVisib(pNum) == HIDE) toggleDisplay(pNode);
	});
}

function hideSagePosts(pNode, pNum)
	{if(pNode.isSage) hidePosts(pNode, pNum, 'sage')}
function toggleSage() {
	toggleCfg(1);
	if(Cfg[1] == 1) forEachReply(hideSagePosts);
	else forEachReply(function(pNode, pNum) {
			if(pNode.isSage) unhidePosts(pNode, pNum)});
	storeHiddenPosts();
}

function hideNotextPosts(pNode, pNum)
	{if(isNoText(pNode)) hidePosts(pNode, pNum, 'no text')}
function toggleNotext() {
	toggleCfg(3);
	if(Cfg[3] == 1) forEachReply(hideNotextPosts);
	else forEachReply(function(pNode, pNum) {
			if(isNoText(pNode)) unhidePosts(pNode, pNum)});
	storeHiddenPosts();
}

function hideNoimagePosts(pNode, pNum)
	{if(!pNode.Img) hidePosts(pNode, pNum, 'no image')}
function toggleNoimage() {
	toggleCfg(4);
	if(Cfg[4] == 1) forEachReply(hideNoimagePosts);
	else forEachReply(function(pNode, pNum) {
			if(!pNode.Img) unhidePosts(pNode, pNum)});
	storeHiddenPosts();
}

function hideThemePosts(pNode, pNum) {
	if(chan != '0chan' && $x('.//span[@class="replytitle"]', pNode).textContent.trim() == '') return;
	if(chan == '0chan' && !$x('.//span[@class="filetitle"]', pNode)) return;
	hidePosts(pNode, pNum, 'theme field');
}
function toggleTheme() {
	toggleCfg(2);
	if(Cfg[2] == 1) forEachReply(hideThemePosts);
	else forEachReply(function(pNode, pNum) {
			if(chan != '0chan' && $x('.//span[@class="replytitle"]', pNode).textContent == '') return;
			if(chan == '0chan' && !$x('.//span[@class="filetitle"]', pNode)) return;
			unhidePosts(pNode, pNum)});
	storeHiddenPosts();
}

function toggleMaxtext() {
	var field = $id(getId('maxtext_field'));
	if(isNaN(field.value)) {
		saveCfg(8, 0);
		alert('введите число знаков');
		return;
	}
	toggleCfg(8);
	saveCfg(9, field.value);
	if(Cfg[8] == 1) forEachReply(hideMaxtextPosts);
	else forEachReply(function(pNode, pNum) {
		if(pNode.Text.replace(/\n/g, '').length >= parseInt(Cfg[9]))
		unhidePosts(pNode, pNum);
	});
	storeHiddenPosts();
}
function hideMaxtextPosts(pNode, pNum) {
	var len = pNode.Text.replace(/\n/g, '').length;
	if(len >= parseInt(Cfg[9]))
		hidePosts(pNode, pNum, 'text n=' + len + ' > max');
}

//--------------------------Hide posts by expressions--------------------------

function hideByRegexp(pNode, pNum) {
	var exp = doRegexp(pNode);
	if(exp != null) hidePosts(pNode, pNum, 'match ' + exp.substring(0, 20) + '..');
}

function applyRegExp() {
	var field = $id(getId('regexp_field'));
	setConfigValue(getId('RegExpr'), field.value.trim());
	if(field.value != '') {
		forEachReply(hideByRegexp);
		storeHiddenPosts();
	}
}

function toggleRegexp() {
	var field = $id(getId('regexp_field'));
	if(field.value == '') {
		$id(getId('regexp_hider')).checked = false;
		saveCfg(10, 0);
		setConfigValue(getId('RegExpr'), '');
		return;
	}
	toggleCfg(10);
	setConfigValue(getId('RegExpr'), field.value.trim());
	if(Cfg[10] == 1) forEachReply(hideByRegexp);
	else forEachReply(function(pNode, pNum){
		var exp = doRegexp(pNode, pNum);
		if(exp != null) unhidePosts(pNode, pNum)
	})
	storeHiddenPosts();
}

function doRegexp(pNode) {
	var expr = getConfigValue(getId('RegExpr')).split('\n');
	var pname = $x('.//span[@class="commentpostername"]', pNode);
	var ptrip = $x('.//span[@class="postertrip"]', pNode);
	if(chan != '0chan') var ptitle = $x('.//span[@class="replytitle"]', pNode);
	if(chan == '0chan') var ptitle = $x('.//span[@class="filetitle"]', pNode);
	var i = expr.length;
	while(i--) {
		var x = expr[i].trim();
		if(x.substring(0, 5).indexOf('$img ') != -1) {
			if(!pNode.Img) continue;
			var img = hideImgByRegexp(pNode, x.split(' ')[1]);
			if(img != null) return img; else continue;
		}
		if(x.substring(0, 6).indexOf('$name ') != -1) {
			x = x.split(' ')[1];
			var nm = x.split(/!+/)[0];
			var tr = x.split(/!+/)[1];
			if(pname && nm != '' && pname.textContent.indexOf(nm) != -1) return x;
			if(ptrip && tr != '' && ptrip.textContent.indexOf(tr) != -1) return x;
		}
		if(x == '$alltrip' && ptrip) return x;
		if(x.substring(0, 5).indexOf('$exp ') != -1) {
			x = x.split(' ')[1];
			var l = x.lastIndexOf('/');
			if(pNode.Text.match(new RegExp(x.substr(1, l - 1), x.substr(l + 1)))) return x;
			if(ptitle.textContent.match(new RegExp(x.substr(1, l - 1), x.substr(l + 1)))) return x;
		}
		x = x.toLowerCase();
		if(ptitle && ptitle.textContent.toLowerCase().indexOf(x) != -1) return x;
		if(pNode.Text.toLowerCase().indexOf(x) != -1) return x;
	}
	return null;
}

function hideImgByRegexp(pNode, expr) {
	if(expr == '') return null;
	var s = expr.split('@');
	var stat = s[0].substring(0, 1);
	var expK = s[0].substring(1);
	if(expK != '') {
		var imgK = getImageWeight(pNode);
		if((stat == '<' && imgK < expK) ||
			(stat == '>' && imgK > expK) ||
			(stat == '=' && imgK == expK))
			{if(!s[1]) return('image ' + expr)}
		else return null;
	}
	if(s[1]) {
		var x = s[1].split(/[x|X|х|Х|×]/);
		var expW = x[0];
		var expH = x[1];
		var sz = getImageSize(pNode).split(/[x|×]/);
		var imgW = parseInt(sz[0]);
		var imgH = parseInt(sz[1]);
		if((stat == '<' && imgW < expW && imgH < expH) ||
			(stat == '>' && imgW > expW && imgH > expH) ||
			(stat == '=' && (imgW == expW && imgH == expH)))
			return 'image ' + expr;
	}
	return null;
}

function getImageWeight(pNode) {
	var w = 0;
	if(wakaba) {
		w = parseInt($x('.//em', pNode).textContent.split(',')[0]);
		if(chan == 'nowere') w = Math.round(w/1000);
	}
	if(chan == '0chan') {
		var inf = $x('.//span[@class="filesize"]', pNode).textContent.split('(')[1].split(',')[0];
		if(inf.split('.')[1]) w = parseInt(inf.split('.')[0]) + parseInt(inf.split('.')[1].match(/\d+/))*0.01;
		if(inf.match('MB')) w = w*1000;
	}
	if(chan == 'DC') {
		var inf = $x('.//em', pNode).textContent.split(',')[1];
		var w = parseInt(inf.split('.')[0].match(/\d+/)) + parseInt(inf.split('.')[1].match(/\d+/))*0.01;
	}
	return w;
}

function getImageSize(pNode) {
	if(wakaba) return $x('.//em', pNode).textContent.split(',')[1].trim();
	if(chan == '0chan') return $x('.//span[@class="filesize"]', pNode).textContent.split('(')[1].split(',')[1];
	if(chan == 'DC') return $x('.//em', pNode).textContent.split(',')[2];
}

//-------------------------Hide posts with similar text------------------------

function getWrds(x)
	{return x.Text.replace(/\s+/g, ' ').replace(/[\?\.\\\/\+\*\$\^\(\)\|\{\}\[\]!@#%_=:;<,-]/g, '').substring(0, 1000).split(' ')}

function hideSameTextPosts(pNode, pNum) {
	if(isNoText(pNode)) {
		toggleNotext();
		toggleCheck($id(getId('notext_hider')))
		return;
	}
	origpNum = pNum;
	origVis = getVisib(pNum);
	origWords = getWrds(pNode);
	forEachReply(searchSameText);
	storeHiddenPosts();
}

function searchSameText(pNode, pNum) {
	var words = getWrds(pNode);
	var origLen = origWords.length;
	if(words.length > origLen*2.5 || words.length < origLen*0.5) return;
	var matchCount = 0;
	var i = origWords.length; while (i--) {
		if(origWords.length > 6 && origWords[i].length < 3) {origLen--; continue}
		var j = words.length; while (j--)
			if((words[j] == origWords[i]) || (origWords[i].substring(0, 2) == '>>' && words[j].substring(0, 2) == '>>')) matchCount++;
	}
	toggleSamePosts(pNode, pNum, matchCount >= origLen*0.5 && words.length < origLen*2.5, ' same text as >>' + origpNum);
}

//-------------------------Hide posts with similar images----------------------

function hideSameImagePosts(pNode, pNum) {
	var img = pNode.Img;
	if(!img) {
		toggleNoimage();
		toggleCheck($id(getId('noimage_hider')))
		return;
	}
	var iw = img.width;
	var ih = img.height;
	var can = newNode('canvas');
	var cn = can.getContext('2d');
	origpNum = pNum;
	origVis = getVisib(pNum);
	can.width = iw;
	can.height = ih;
	cn.drawImage(img, 0, 0);
	iData = cn.getImageData(0, 0, iw, ih).data;
	for(var i = 0; i < ih; i += 10) 
		for(var j = 0; j < iw; j += 10) {
			var n = (i*4)*iw + (j*4);
			var mix = (iData[n] + iData[n + 1] + iData[n + 2])*0.3333;
			iData[n] = mix;
			iData[n + 1] = mix;
			iData[n + 2] = mix;
		}
	forEachReply(searchSameImages);
	storeHiddenPosts();
}

function searchSameImages(pNode, pNum) {
	var img = pNode.Img;
	if(!img) return;
	var iw = img.width;
	var ih = img.height;
	var matchCount = 0;
	var count = 0;
	var can = newNode('canvas');
	var cn = can.getContext('2d');
	can.width = iw;
	can.height = ih;
	cn.drawImage(img, 0, 0);
	sData = cn.getImageData(0, 0, iw, ih).data;
	for(var i = 0; i < ih; i += 10) 
		for(var j = 0; j < iw; j += 10) {
			var n = (i*4)*iw + (j*4);
			var mix = (sData[n] + sData[n + 1] + sData[n + 2])*0.3333;
			if(iData[n] <= mix + 10 && iData[n] >= mix - 10) matchCount++;
			count++;
		}
	toggleSamePosts(pNode, pNum, matchCount/count >= 0.5, ' image as >>' + origpNum + ' (' + parseInt(matchCount/count*100) + '%)');
}


//=============================================================================
//							WIPE DETECTORS
//=============================================================================

function detectWipe(pNode, pNum) {
	var detectors = [
		detectWipe_sameLines,
		detectWipe_sameWords,
		detectWipe_specialSymbols,
		detectWipe_longColumn,
		detectWipe_longWords,
		detectWipe_numbers,
		detectWipe_caseSage
	];
	for(var i = 0; i < detectors.length; ++i) {
		var detect = detectors[i](pNode.Text);
		if(detect != null) return detect;
	}
	return null;
}

function detectWipePosts(pNode, pNum) {
	if(getVisib(pNum) == HIDE || getVisib(pNum) == UNHIDE) return;
	if(detectWipe(pNode, pNum) != null) {
		setVisibilityCheap(pNum, HIDE);
		makeNotice(pNode, pNum, ' autohide: ' + detectWipe(pNode, pNum));
	} else setVisibilityCheap(pNum, UNHIDE);
}

function detectWipe_longColumn(text) {
	var rows = text.split('\n');
	var shortrows = 0;
	for(var i = 0; i < rows.length; ++i) {
		if(rows[i].length < 9) shortrows++;
		else return null;
	}
	if(rows.length > 45) return 'looong post x' + rows.length;
	if(shortrows > 5) return 'column wipe x' + shortrows;
	return null;
}

function detectWipe_sameLines(text) {
	var lines = text.replace(/(> )/g, '').split('\n');
	if(lines.length < 5) return null;
	var count = new Array(); 
	all = 0;
	for(var i = 0; i < lines.length; ++i ) {
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
	if(words.length <= 15) return null;
	var count = new Array();
	var wrds = 0;
	for(var i = 0; i < words.length; ++i ) {
		if(words[i].length <= 1) continue;
		wrds++;
		incc(count, words[i])
	}
	if(wrds <= 10) return null;
	keys = 0; pop = ''; mpop = -1;
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
	var words = text.split(' ');
	var totalText = '';
	var wordsNum = 0;
	var longest='';
	for(var i = 0; i < words.length; i++) {
		if(words[i].length <= 1) continue;
		wordsNum++;
		totalText += words[i];
		longest = words[i].length > longest.length ? words[i] : longest;
	}
	if(wordsNum == 0) return null;
	lws = totalText.length / wordsNum;
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
	if(words.length <= 4) return null;
	var wrds = 0;
	var ttl = 0;
	for(var i = 0; i < words.length; i++) {
		if(words[i].length < 5) continue;
		ttl++;
		word = words[i];
		up = word.toUpperCase();
		lw = word.toLowerCase();
		upc = 0;
		lwc = 0;
		for(var j = 0; j < word.length; j++) {
			if(up.charAt(j) == lw.charAt(j)) continue;
			if(word.charAt(j) == up.charAt(j)) upc++;
			else if(word.charAt(j) == lw.charAt(j)) lwc++;
		}
		if(min(lwc, upc) >= 3 && lwc + upc >= 5) wrds++;
	}
	var caseProcent = wrds/ttl;
	if(caseProcent >= 0.3 && ttl > 8) return 'cAsEwOrDs: ' + parseInt(caseProcent*100) + '%';
	return null;
}


//=============================================================================
//							INITIALIZATION
//=============================================================================

function getChanName(x) {
	if(x.indexOf('2-ch.ru') != -1) {wakaba = true; return '2-ch'}
	if(x.indexOf('iichan.ru') != -1) {wakaba = true; return 'iichan'}
	if(x.indexOf('0chan.ru') != -1) {wakaba = false; return '0chan'}
	if(x.indexOf('dobrochan.ru') != -1) {wakaba = false; return 'DC'}
	if(x.indexOf('nowere.net') != -1) {wakaba = true; return 'nowere'}
	if(x.indexOf('wakachan.org') != -1) {wakaba = true; return 'unyl'}
	if(x.indexOf('2ch.olanet.ru') != -1) {wakaba = true; return 'olanet'}
}

function getChanHost(x) {
	if(x == '0chan') return '0chan.ru';
	if(x == 'DC') return 'dobrochan.ru';
	if(x == '2-ch') return '2-ch.ru';
	if(x == 'iichan') return 'iichan.ru';
	if(x == 'nowere') return 'nowere.net';
	if(x == 'unyl') return 'wakachan.org';
	if(x == 'olanet') return '2ch.olanet.ru';
}

//--------------------Define script mode and board elements--------------------

function initBoard() {
	chan = getChanName(location.host);
	if(navigator.appName == 'Opera') browzer = 'Opera';
	else if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1) browzer = 'Chrome';
		else browzer = 'Firefox';
	if(browzer == 'Firefox') saves = 'GM';
	else if((typeof localStorage === 'object') && (localStorage != null)) saves = 'localst';
		else saves = 'cookie';
	if(browzer == 'Opera') cssPref = '';
	if(browzer == 'Firefox') cssPref = '-moz-';
	if(browzer == 'Chrome') cssPref = '-webkit-';
	if(location.pathname.indexOf('/res/') != -1) main = false;
	var url = location.pathname.substr(1).split('/');
	board = url[0];
	if(url[1] == 'arch') board += '/arch';
	if(!main) opNum = url[2].split('.')[0];
	logo = $x('.//div[@class="logo"]');
	delform = (chan != 'DC') ? $id('delform') : delform = $x('.//form[contains(@action, "delete")]');
	if(!delform) throw 'stop';
	Rname = Rmail = Rvideo = Rgoto_tr = Rpass = Rrules = QR = undefined;
	postform = $id('postform');
	if(!postform) return;
	captcha = $n('captcha');
	Rsubm = $x('.//input[@type="submit"]', postform);
	Rrules = $x('.//div[@class="rules"]') || $x('.//td[@class="rules"]');
	if(chan != 'unyl') Rpass = $n('password') || $n('postpassword');
	Rgoto_tr = $id('trgetback');
	if(chan == '2-ch' || chan == 'olanet') {
		Rname = $n('akane');
		Rmail = $n('nabiki');
		Rtheme = $n('kasumi');
		Rmess = $n('shampoo');
		Rfile = $n('file');
		return;
	}
	if(chan == '0chan') {
		Rname = $n('name');
		Rmail = $n('em');
		Rtheme = $n('subject');
		Rmess = $n('message');
		Rfile = $n('imagefile');
		Rvideo = $n('embed');
		Rgoto_tr = $n('gotothread').parentNode.parentNode.parentNode;
		return;
	}
	if(chan == 'iichan') {
		Rname = $n('nya1');
		Rmail = $n('nya2');
		Rtheme = $n('nya3');
		Rmess = $n('nya4');
		Rfile = $n('file');
		Rgoto_tr = $n('postredir').parentNode.parentNode.parentNode;
		return;
	}
	if(chan == 'DC') {
		Rname = $n('name');
		Rmail = $n('sage');
		Rtheme = $n('subject');
		Rmess = $n('message');
		Rfile = $n('file_1');
		return;
	}
	if(chan == 'unyl' || chan == 'nowere') {
		Rname = $n('field1');
		Rmail = $n('dont_bump') || $n('field2');
		Rtheme = $n('field3');
		Rmess = $n('field4');
		Rfile = $n('file');
	}
}

//-------------------Get/update posts and threads in delform-------------------

function initDelform() {
	if(wakaba && chan != 'iichan' && chan != 'olanet') {
		if(browzer == 'Opera') {
			var thrdpattern = (chan != 'unyl') ? '<BR clear="left"><HR>' : '<BR clear="left"><P><HR><P></P>';
			var postpattern = '<TABLE>';
		} else {
			var thrdpattern = (chan != 'unyl') ? '<br clear="left"><hr>' : '<br clear="left"><p></p><hr>';
			var postpattern = '<table>';
		}
		var threads = delform.innerHTML.split(thrdpattern);
		var i = threads.length - 1;
		var del = threads[i];
		threads.pop();
		var oppost, thread, ind;
		while(i--) {
			thread = threads[i];
			ind = thread.indexOf(postpattern);
			if(ind == -1) ind = thread.length;
			oppost = thread.substring(0, ind);
			threads[i] = '<div class="oppost">' + oppost + '</div>' + thread.substring(oppost.length - 1).split(postpattern).join('<table class="replypost">');
		}
		var html = '<div class="thread">' + threads.join('</div> <br clear="left"><hr> <div class="thread">') + '</div>' + thrdpattern + del;
		delform.style.display = 'none';
		delform = inHTML(delform, html);
		delform.style.display = '';
		var threads = $X('./div[@class="thread"]', delform);
		var i = threads.snapshotLength;
		var tid;
		while(i--) {
			thread = threads.snapshotItem(i);
			tid = 'thread_' + $x('.//input', thread).value;
			thread.id = tid;
			thread.firstChild.id = 'post_' + tid;
		}
	}
	else {
		var threads = $X('./div[starts-with(@id, "thread")]', delform);
		var i = threads.snapshotLength;
		while(i--) {
			var node = threads.snapshotItem(i);
			node.id = 'thread_' + node.id.match(/\d+/);
			node.className = 'thread';
		}
	}
	if(chan == 'iichan' || chan == 'olanet') {
		var replyposts = $X('.//td[@class="reply"]', delform);
		var i = replyposts.snapshotLength;
		var reply, pNode;
		while(i--) {
			reply = replyposts.snapshotItem(i);
			pNode = $x('./ancestor::table', reply);
			pNode.className = 'replypost';
			pNode.id = 'post_' + reply.id.match(/\d+/);
		}
		var threads = $X('./div[@class="thread"]', delform);
		var i = threads.snapshotLength;
		var thread, opdiv, x, nodes, nodelist;
		while (i--) {
			thread = threads.snapshotItem(i);
			opdiv = newNode('div');
			opdiv.className = 'oppost';
			opdiv.id = 'post_' + thread.id.match(/\d+/);
			thread.insertBefore(opdiv, thread.firstChild);
			nodes = thread.childNodes;
			nodelist = [];
			x = 0;
			for(var node, j = 1; node = nodes[j++];) {
				if(node.tagName == 'TABLE') break;
				nodelist[x++] = node;
			}
			for(var node, j = 0; node = nodelist[j++];)
				opdiv.appendChild(node);
		}
	}
	if(wakaba) {
		pNodes = toArray($X('.//table[@class="replypost"]', delform));
		opNodes = toArray($X('.//div[@class="oppost"]', delform));
	}
	if(wakaba && chan != 'iichan' && chan != 'olanet')
		for(var pNode, i = 0; pNode = pNodes[i++];)
			pNode.id = 'post_' + $x('.//a', pNode).name;
	if(chan == 'unyl')
		for(var pNode, i = 0; pNode = pNodes[i++];)
			$x('.//td[@class="reply"]', pNode).style.width = 'auto';
	if(chan == '0chan') {
		var allposts = $X('.//div[@class="postnode"]');
		var i = allposts.snapshotLength;
		var post, reply;
		while(i--) {
			post = allposts.snapshotItem(i);
			reply = $x('.//td[@class="reply"]', post);
			if(reply) post.id = 'post_' + reply.id.match(/\d+/);
			else post.id = 'oppost_' + post.parentNode.id.match(/\d+/);
		}
		pNodes = toArray($X('.//div[starts-with(@id,"post")]', delform));
		opNodes = toArray($X('.//div[starts-with(@id,"oppost")]', delform));
	}
	if(chan == 'DC') {
		pNodes = toArray($X('.//table[starts-with(@class,"replypost")]', delform));
		opNodes = toArray($X('.//div[starts-with(@class,"oppost")]', delform));
	}
}

function initPosts() {
	var msg;
	forAllReplies(function(pNode, pNum, count) {
		postByNum[pNum] = pNode;
		postCounts[pNum] = count;
		msg = getPostMsg(pNode);
		pNode.Msg = msg;
		pNode.Text = getTextImpl(msg).trim();
		pNode.Img = $x('.//img[@class="thumb"]', pNode);
		pNode.isSage = isSagePost(pNode);
		pNode.Loaded = false;
		pNode.isOp = false;
	});
	forOPReply(function(pNode) {pNode.isOp = true});
}


//=============================================================================
//								MAIN
//=============================================================================

function getPerformTime(init) {
	var x = newNode('span');
	x.innerHTML = 'script processing: ' + ((new Date()).getTime() - init).toString() + ' ms';
	x.style.cssText = 'font-style:italic;cursor:default';
	x.addEventListener('click', function(){alert(timeLog)}, false);
	confdiv.appendChild(x);
}

function Log(txt) {
	var newTime = (new Date()).getTime();
	timeLog += '\n' + txt + ': ' + (newTime - oldTime).toString() + 'ms';
	oldTime = newTime;
}

function doScript() {
	const INIT_TIME = (new Date()).getTime();
	oldTime = INIT_TIME;
	timeLog = '';
	initBoard();							Log('initBoard');
	initDelform();							Log('initDelform');
	initPosts();							Log('initPosts');
	initCfg();								Log('initCfg');
	addControls();							Log('addControls');
	readHiddenThreads();					Log('readHiddenThreads');
	readPostsVisibility();					Log('readPostsVisibility');
	forAllReplies(addPostButtons);			Log('addPostButtons');
	if(Cfg[26] == 1)
		{linksPreview();					Log('linksPreview')}
	if(Cfg[15] == 1)
		{initRefMap();						Log('initRefMap')}
	forEachReply(doPostFilters);			Log('doPostFilters');
	storeHiddenPosts();						Log('storeHiddenPosts');
	changePostForm();						Log('changePostForm');
	addTextPanel(postform);					Log('addTextPanel');
	if(Cfg[38] == 1)
		{submitCheck();						Log('submitCheck')}
	if(Cfg[37] != 0 && !main)
		{initNewPosts();					Log('initNewPosts')}
	if(Cfg[13] == 1 && !main)
		{forEachReply(collectHiddenPosts);	Log('collectHiddenPosts')}
	if(Cfg[23] == 1 && (wakaba || chan == 'DC')) {
		forAllReplies(imageHandling);
		if(!main) addExpandAllImgButton();	Log('imageHandling');
	}
	if(Cfg[24] == 1 && main && wakaba)
		{forAllReplies(expandPosts);		Log('expandPosts')}
	if(Cfg[28] == 1)
		{searchMP3();						Log('makeMP3')}
	if(Cfg[27] == 1)
		{forAllReplies(makeYouTube);		Log('makeYouTube')}
	addScriptStyles();						Log('addScriptStyles');
	getPerformTime(INIT_TIME);
}

if(window.name.indexOf('submitcheck') == -1) {
	if(window.opera) document.addEventListener('DOMContentLoaded', doScript, true);
	else doScript();
}