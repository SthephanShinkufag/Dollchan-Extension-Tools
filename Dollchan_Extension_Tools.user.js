// Dollchan Extension Tools
// 05.03.2010 version, Sthephan Shinkufag @ Free DollChan
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
// ==/UserScript==

if(window.name.indexOf('submitcheck') == -1) {
var defaultCfg = [
	1,			// 0.	anti-wipe detectors
	0,			// 1.	hide posts with sage
	0,			// 2.	hide posts with theme
	0,			// 3.	hide posts without text
	0,			// 4.	hide posts without img
	0,			// 5.	hide posts by img size
	0,			// 6.		0=less, 1=moar, 2=round
	50,			// 7.		size in KB
	0,			// 8.	hide posts by text size
	500,		// 9.		text size in symbols
	0,			// 10.	hide by regexp
	'',			// 11.		regexp expression
	0,			// 12.	full hide of hidden posts
	1,			// 13.	merge hidden posts
	1,			// 14.	fast preview of hidden posts
	1,			// 15.	>>replies map
	1,			// 16.	'quick reply' buttons
	1,			// 17.	'add to favorities' buttons	
	0,			// 18.	show buttons as text
	1,			// 19.	show SAGE
	1,			// 20.	duplicate captcha
	1,			// 21.	don't show board rules
	0,			// 22.	empty
	1,			// 23.	expand images by click
	1,			// 24.	expand shorted posts
	1,			// 25.	hide overflow post scrollers
	1,			// 26.	>>links preview
	1,			// 27.	YouTube player
	1,			// 28.	mp3 player
	0,			// 29.	move postform down
	550,		// 30.	postform textarea width
	140,		// 31.	postform textarea height
	0,			// 32.	reply with SAGE (0=off, 1=on, 2=in all fields)
	0,			// 33.	apply user password
	'',			// 34.		user password value
	0,			// 35.	apply user name
	'',			// 36.		user name value
	2,			// 37.	upload new posts (0=no, 1=by click, 2=auto)
	0,			// 38.	reply without reload (verify on submit)
];

//=============================================================================
// 					Visibility and storage functions
//=============================================================================

function setCookie(cookieName, cookieValue, lifeTime) {
	if(!cookieName) return;
	if(lifeTime == 'delete') lifeTime = -10;
	else lifeTime = 259200; // 3 days lifetime
	document.cookie = escape(cookieName)+'='+escape(cookieValue)+';expires='+(new Date((new Date()).getTime()+(1000 * lifeTime))).toGMTString()+';path=/';
}

function getCookie(cookieName, oDefault) {
	var cookieJar = document.cookie.split('; ');
	for(var x = 0; x < cookieJar.length; x++) {
		var oneCookie = cookieJar[x].split('=');
		if(oneCookie[0] == escape(cookieName)) {
			try {eval('var footm = "'+unescape( oneCookie[1] )+'"')}
			catch(e) {return oDefault}
			return footm;
		}
	}
	return oDefault;
}

// Delete old visibility cookies (Opera)
function turnCookies(cookieName) {
	var max = 15;
	if(chan == '0chan') max = 10;
	var turnData = getCookie (getId('Cookies'));
	if(!turnData) turnData = cookieName + '|';
	else turnData += cookieName + '|';
	var entries = turnData.split('|');
	entries.pop();
	if(entries.length > max) {
		turnData = '';
		setCookie(entries[0], '', 'delete');
		entries[0] = '';
		for(var i = 1; i < entries.length; i++)
			turnData += entries[i] + '|';
	}
	setCookie(getId('Cookies'), turnData);
}

// Config operations
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

// Generate uniqual id
function getId(name, post) {
	var ch = '';
	if(saves != 'cookie') ch = '_'+chan;
	if(!post) post = ''; else post = '_'+post;
	if(name == 'Visibility' || name == 'HiddenThreads') return 'DESU_'+name+ch+'_'+board+post;
	if(name == 'Options' || name == 'Cookies') return 'DESU_'+name+ch;
	if(name == 'Favorities') return 'DESU_Favorities';
	return 'DESU_'+name+post;
}

//----------------------------Configure script options-------------------------

function setDefaultConfig() {
	var data = '';
	for(var i = 0; i < defaultCfg.length; i++)
		data += defaultCfg[i] + '|';
	Cfg = defaultCfg;
	setConfigValue(getId('Options'), data);
}

function initConfig() {
	var storeData = getConfigValue(getId('Options'));
	if(!storeData) setDefaultConfig();
	else Cfg = storeData.split('|');
}

function saveCfg(num, value) {
	Cfg[num] = value;
	var entries = getConfigValue(getId('Options')).split('|'),
		storeData = '';
	for(var i = 0; i < entries.length-1; i++) {
		if(i != num) storeData += entries[i] + '|';
		else storeData += value + '|';
	}
	setConfigValue(getId('Options'), storeData);
}

//--------------------------Configure post visibilities------------------------

function getVisibility(post) {
	if(saves == 'cookie') postKey = postCounter[post];
	else postKey = board + post;
	if(postKey in visibility) return visibility[postKey];
	return null;
}

function setVisibilityCheap(post, stat) {
	if(saves == 'cookie')
		visibility[postCounter[post]] = stat; 
	else {
		visibility[board + post] = stat;
		now = (new Date()).getTime();
		expires[board + post] = now + 259200000; //3 days lifetime
	}
}

function readPostsVisibility() {
	visibility = new Array();
	if(saves == 'cookie') {
		if(mode == 'thread') 
			var vs = getConfigValue(getId('Visibility', opNum));
		if(!vs) return;
		for(var i = 0; i < vs.length; i++)
			visibility[i+2] = vs[i];
	} else {
		var vs = getConfigValue(getId('Visibility'));
		if(!vs) return;
		var entries = vs.split('I');
		entries.pop();
		now = (new Date()).getTime();
		for(var i = 0; i < entries.length; i++) {
			var entr = entries[i].split('-');
			if(now < entr[2]) {
				visibility[entr[0]] = entr[1];
				expires[entr[0]] = entr[2];
			}
		}
	}
}

function storePostsVisibility() {
	var visbilitytext = '', vs = '', storeData = '';
	if(saves == 'cookie') {
		if(mode == 'thread') {
			for(var i = 0; i < visibility.length; i++)
				if(visibility[i] != undefined) vs += visibility[i];
			for(var i = 0; i < vs.length; i++)
				visbilitytext += vs[i];
			storeData = getId('Visibility', opNum);
			if(!getConfigValue(storeData)) turnCookies(storeData);
		}
	} else {
		for(var postKey in visibility) {
			vs = postKey + '-' + visibility[postKey] + '-' + expires[postKey] + 'I';
			if(vs.length < 40) visbilitytext += vs;
		}
		storeData = getId('Visibility');
	}
	setConfigValue(storeData, visbilitytext);
}

//----------------------------Configure hidden threads-------------------------

function storeHiddenThread(tNum, stat) {
	var storeData = getConfigValue(getId('HiddenThreads')),
		thrdkey = board + tNum;
	if(!storeData) storeData = '';
	var entries = storeData.split('I');
	if(stat == HIDE) {
		if(entries.length > 80) {
			entries.pop();
			storeData = '';
			for(var i = 1; i < entries.length; i++)
				storeData += entries[i] + 'I';
		}
		storeData += thrdkey + 'I';
	} else {
		entries.pop();
		storeData = '';
		hiddenThrds[thrdkey] = UNHIDE;
		for(var i = 0; i < entries.length; i++)
			if(entries[i] != thrdkey) storeData += entries[i] + 'I';
	}
	setConfigValue(getId('HiddenThreads'), storeData);
}

function readHiddenThreads() {
	if(chan == 'dobrochan') return;
	var storeData = getConfigValue(getId('HiddenThreads'));
	if(!storeData) return;
	var entries = storeData.split('I');
	entries.pop();
	for(var i = 0; i < entries.length; i++) {
		var thrdkey = entries[i];
		hiddenThrds[thrdkey] = HIDE;
	}
	forOPReply(function(opNode, tNum) {
		if(hiddenThrds[board + tNum] == HIDE)
			hideThread(opNode, tNum);
	});
}

//--------------------------Configure threads favorities-----------------------

function storeFavorities(pNode, pNum, stat) {
	var storeData = getConfigValue(getId('Favorities'));
	if(!storeData) storeData = '';
	var f = $x('.//span[@class="filetitle"]', pNode);
	if(f) f = f.textContent.trim();
	if(!f || f == '') f = messages[pNum].trim();
	if(saves != 'cookie') f = f.substring(0, 70);
	else f = f.substring(0, 25);
	f = f.replace(/[|"~]/g, '').replace(/\s+/g,' ');
	var thrdkey = chan + '|' + board + pNum + '|' + f + '|';
		entries = storeData.split('|');
	if(saves == 'cookie' && entries.length/3 > 25) return;
	for(var i = 0; i < parseInt(entries.length/3); i++)
		if(entries[i*3+1] == board + pNum) return;
	if(stat == 1) storeData += thrdkey;
	setConfigValue(getId('Favorities'), storeData);
}

function removeFavoritiesFromList(node) {
	var storeData = getConfigValue(getId('Favorities')),
		thrdkey = $x('.//a', node).textContent.split('/'),
		entries = storeData.split('|');
	storeData = '';
	for(var i = 0; i < parseInt(entries.length/3); i++) {
		if(entries[i*3] == thrdkey[0] && entries[i*3+1] == thrdkey[1]) continue;
		storeData += entries[i*3] + '|' + entries[i*3+1] + '|' + entries[i*3+2] + '|';
	}
	if(storeData == '') node.parentNode.appendChild(makeTxt(' [Избранные треды отсутствуют]'))
	removeNode(node.parentNode.parentNode);
	setConfigValue(getId('Favorities'), storeData);
}

//---------------Toggle visibility status of all pNode children-------------

function modChildVis(nodes, vis, style) {
	for(var node, i = 0; node = nodes.snapshotItem(i); i++)
		with(node.style) display = vis==HIDE ?'none':style;
}

function modPostVisibility(pNode, pNum, vis) {
	modChildVis($X('.//br', pNode), vis, 'block');
	modChildVis($X('.//div[@id="'+getId('answersdiv', pNum)+'"]', pNode), vis, 'block');
	if(chan != 'dobrochan') {
		modChildVis($X('.//blockquote', pNode), vis, 'block');
		modChildVis($X('.//img[starts-with(@class,"thumb")]', pNode), vis, 'block');
		modChildVis($X('.//span[@class="filesize"]', pNode), vis, 'inline');
	} else {
		modChildVis($X('.//div[@class="postbody"]', pNode), vis, 'block');
		modChildVis($X('.//div[@class="file"]', pNode), vis, 'block');
		modChildVis($X('.//div[@class="fileinfo"]', pNode), vis, 'block');
	}
	// for expanded images, hides original
	if(source == 'wakaba') {
		if($x('.//img[@class="thumb_full"]', pNode))
			$x('.//img[@class="thumb"]', pNode).style.display = 'none';
		var thumbn = $X('.//span[@class="thumbnailmsg"]', pNode);
		if(thumbn) modChildVis(thumbn, vis, 'inline');
	}
}


//=============================================================================
// 								UTILS
//=============================================================================

// Get ANY_UNORDERED_NODE_TYPE by xpath
function $x(path,rootNode)
	{return document.evaluate(path, rootNode || document, null, 8, null).singleNodeValue};
// Get UNORDERED_NODE_SNAPSHOT_TYPE by xpath
function $X(path,rootNode)
	{return document.evaluate(path, rootNode || document, null, 6, null)};

function $id(x) {return document.getElementById(x)};

function removeNode(node) {if(node) node.parentNode.removeChild(node)}

function removeChildren(node) {while(node.hasChildNodes()) node.removeChild(node.firstChild)}

function nextObject(node) {
	do node = node.nextSibling;
	while (node && node.nodeType != 1);
	return node;
}

function prevObject(node) {
	do node = node.previousSibling;
	while (node && node.nodeType != 1);
	return node;
}

function makeTxt(txt) {return document.createTextNode(txt)}

function makeNode(node) {return document.createElement(node)}

function makeInput(type, value, id, name) {
	var input = makeNode('input');
	input.type = type;
	if(value) input.value = value;
	if(id) input.id = getId(id);
	if(name) input.name = name;
	return input;
}

// Trim spaces before and after text
if('undefined' == typeof String.prototype.trim) {
	String.prototype.trim = function() {
	return this.replace(/^\s+/, '').replace(/\s+$/, '');
	}
}

// Prevent 'Enter' input
function preventEnter(e) {
	if(e.which == 13) {
		e.preventDefault();
		e.stopPropagation();
	}
}

// Input numbers and backspace only
function enterNumbersKey(e) {
	var key = (typeof e.charCode == 'undefined' ? e.keyCode : e.charCode);
	if(!/\d/.test(String.fromCharCode(key)) && key != 8 && key != 0) {
		e.preventDefault();
		e.stopPropagation();
	}
}

function incc(arr, w) {if(arr[w]) arr[w] += 1; else arr[w] = 1}
function toggle(arr, w) {arr[w] = arr[w]==0 ?1:0}
function max(a, b) {return b>a ?b:a}
function min(a, b) {return b<a ?b:a}

// Get node coordinates
function getCoord(a, b) {var c=0; while(a){c+=a[b]; a=a.offsetParent} return c}

//-----------------------------------LOAD AJAX---------------------------------

// Parse thread in assotiative array
var thrds = {};
function serialize(tid, text) {
	text = text.substring(text.search(/<form[^>]+del/) + text.match(/<form[^>]+del[^>]+>/).toString().length, text.indexOf('class="userdelete"') != -1 ? text.indexOf('class="userdelete"') - 10 : text.indexOf('deletebuttons') - 70).split(/<table[^>]*>/);
	thrds[tid] = {keys: []};
	for(var i = 0; i < text.length; i++) {
		var key = text[i].match(/(?:<input[^\d]+)(\d+)(?:[^>]+>)/)[1];
		thrds[tid].keys.push(parseInt(key));
		thrds[tid][key] = text[i].substring(text[i].indexOf(key), text[i].lastIndexOf('</td') != -1 ? text[i].lastIndexOf('</td') : (text[i].lastIndexOf('</div') != -1 ? text[i].lastIndexOf('</div') + 6 : text[i].lastIndexOf('</blockquote') + 13));
		thrds[tid][key] = thrds[tid][key].substring(thrds[tid][key].indexOf('>') + 1);
	}
}

// Ajax loading
function loadajax(addr, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			if(xhr.status == 200) {
				serialize(addr, xhr.responseText);
				callback(null);
			} else callback('HTTP ' + xhr.status + ' ' + xhr.statusText);
		}
	};
	xhr.open('GET', '/' + board + '/res/' + addr + '.html', true);
	xhr.send(null);
}


//=============================================================================
// 						Text procesing functions
//=============================================================================

function getPostMsg(pNode) {
	if(source == 'wakaba') return $x('.//blockquote', pNode);
	if(chan == '0chan') return $x('.//div[@class="postmessage"]', pNode);
	if(chan == 'dobrochan') return $x('.//div[@class="message"]', pNode) || $x('.//div[@class="postbody"]', pNode);
}

// Get text from current post
function getTextImpl(node) {
	if(node.nodeName == '#text') return node.data;
	if(node.nodeName == 'BR' && chan != 'dobrochan') return '\n';
	var text = '';
	if(node.nodeName == 'P' || node.nodeName == 'BLOCKQUOTE')
		text += '\n';
	for(var i = 0; i < node.childNodes.length; i++ )
		text += getTextImpl(node.childNodes[i]);
	return text;
}

function readMessages(pNode, pNum)
	{messages[pNum] = getTextImpl(getPostMsg(pNode)).trim()}

//----------------------------Formatting text tools----------------------------

function formatText(node, tag1, tag2) {
	var txtfield = $x('.//textarea', $x('ancestor::form', node));
	if(tag1 == '' && tag2 == '')
		for(var i = 0; i < (txtfield.selectionEnd - txtfield.selectionStart); ++i)
			tag2 += '^H';
	with(txtfield) {
		var text = value.substring(selectionStart, selectionEnd),
			beforeSel = value.substring(0, selectionStart),
			afterSel = value.substring(selectionEnd, value.length);
		if(text == '') {
			text = value;
			beforeSel = afterSel = '';
		}
		value = beforeSel + tag1 + text + tag2 + afterSel;
	}
}

function boldText() {
	if(chan == '0chan') formatText(this, '[b]', '[/b]');
	else formatText(this, '**', '**');
}
function italicText() {
	if(chan == '0chan') formatText(this, '[i]', '[/i]');
	else formatText(this, '*', '*');
}
function underlinedText() {
	if(chan == '0chan') formatText(this, '[u]', '[/u]');
	else formatText(this, '__', '__');
}
function spoilerText() {
	if(chan == '0chan') formatText(this, '[spoiler]', '[/spoiler]');
	else formatText(this, '%%', '%%');
}
function strikeText() {
	if(chan == '0chan') formatText(this, '[s]', '[/s]');
	else formatText(this, '', '');
}
function codeText() {
	if(chan == '0chan') formatText(this, '[code]', '[/code]');
	else formatText(this, "`", "`");
}


//=============================================================================
// 							WIPE DETECTORS
//=============================================================================

function detectWipe(pNode, pNum) {
	var txt = messages[pNum];
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
		var detect = detectors[i](txt);
		if(detect != null) return detect;
	}
	return null;
}

function detectWipePosts(pNode, pNum) {
	if(getVisibility(pNum) == HIDE || getVisibility(pNum) == UNHIDE) return;
	if(detectWipe(pNode, pNum) == null) {
		setVisibilityCheap(pNum, UNHIDE);
		return;
	}
	setVisibilityCheap(pNum, HIDE);
	makeNotice(pNode, pNum, ' autohide: '+detectWipe(pNode, pNum));
}

function detectWipe_longColumn(text) {
	var rows = text.split(/\n/g), shortrows = 0;
	for(var i = 0; i < rows.length; ++i) {
		if(rows[i].length < 9) shortrows++;
		else return null;
	}
	if(rows.length > 45) return 'looong post x' + rows.length;
	if(shortrows > 5) return 'column wipe x' + shortrows;
	return null;
}

function detectWipe_sameLines(text) {
	var lines = text.replace(/(> )/ig, '').split(/\n/);
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
	text = text.replace(/\n/g, ' ').replace(/[.,!@#$%^&*()_+-={}:\\"'\/<>?[]/g, ' ').toUpperCase();
	var words = text.split(' ');
	if(words.length <= 15) return null;
	var count = new Array(), wrds = 0;
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
	text = text.replace(/\s/g, '');
	var wholeText = text; 
	text = text.replace(/[0-9A-Za-zА-Яа-я]/g, '').replace(/[.!?]/g, '');
	var specsym = text.length / wholeText.length;
	if(wholeText.length > 30 && specsym > 0.40)
		return 'special symbols: ' + parseInt(specsym * 100) + '%';
	return null;
}

function detectWipe_longWords(text) {
	text = text.replace(/[.,!@#$%^&*()_+-={}:\\"'\/<>?[]/g, ' ').replace(/\n/g, ' ');
	var words = text.split(' '),
		totalText = '', wordsNum = 0, longest='';
	for(var i = 0; i < words.length; ++i) {
		if(words[i].length <= 1 || words[i].substring(0,4) == 'http' || words[i].substring(0,3) == 'www') continue;
		wordsNum++;
		totalText += words[i];
		longest = words[i].length > longest.length ? words[i] : longest;
	}
	if(wordsNum == 0) return null;
	lws = totalText.length / wordsNum;
	if(wordsNum == 1 && longest.length > 80)
		return 'long word:' + longest.substr(0, 20);
	if( ((wordsNum > 1) && (wordsNum < 6 ) && (lws > 12)) || (wordsNum >= 6 && lws > 11) )
		return 'long words:' + longest.substr(0, 20);
	return null;
}

function detectWipe_numbers(text) {
	text.replace(/\s/g, ' ');
	var re = /(>>)(\d+)/ig;
	if(text.match(re)) text = text.replace(re, '');
	var numProcent = (text.length - text.replace(/[0-9]/g, '').length) / text.length;
	if(text.length > 30 && numProcent > 0.4) return 'numbers: '+ parseInt(numProcent * 100)+'%';
}

function detectWipe_caseSage(text) {
	text = text.replace(/\n/g, ' ').replace(/[-.,!@#$%^&*()_+={}:\\"'\/<>?[]/g, '');
	var words = text.split(' ');
	if(words.length <= 3) return null;
	var wrds = 0, ttl = 0;
	for(var i = 0; i < words.length; ++i ) {
		if(words[i].length < 5) continue;
		ttl++;
		word = words[i];
		up = word.toUpperCase();
		lw = word.toLowerCase();
		upc = 0;
		lwc = 0;
		for(var j = 0; j < word.length; ++j) {
			if(up.charAt(j) == lw.charAt(j)) continue;
			if(word.charAt(j) == up.charAt(j)) upc++;
			else if (word.charAt(j) == lw.charAt(j)) lwc++;
		}
		if(min(lwc,upc) >= 2 && lwc + upc >= 4) wrds++;
	}
	if(wrds >= 5) return 'cAsEwOrDs x' + wrds;
	return null;
}


//=============================================================================
// 					Insert control elements into board form
//=============================================================================

function addControls() {
	// This creates toggle checkbox for option menu
	var addBox = function(boxEvent, CfgNum, boxIndex, boxId, boxTitle) {
		var box = makeInput('checkbox', null, boxId);
		if(boxTitle) box.title = boxTitle;
		box.addEventListener('click', function(){boxEvent(CfgNum)}, false);
		if(Cfg[CfgNum] == 1) box.checked = true;
		with(confdiv)
			appendChild(box),
			appendChild(makeTxt(boxIndex)),
			appendChild(makeNode('br'));
	}
	// Toggle & save config
	toggleCfg = function(CfgNum) {
		toggle(Cfg, CfgNum);
		saveCfg(CfgNum, Cfg[CfgNum]);
	}
	toggleCheck = function(box) {box.checked = !box.checked}
	var toggleBoardRules = function() {
		toggleCfg(21);
		with(board_rules.style) display = Cfg[21]==1 ?'none':'';
	}
	var toggleUserPassw = function() {
		toggleCfg(33);
		saveCfg(34, $id(getId('usrpass_field')).value);
		if($id(getId('usrpass_box')).checked) {
			pass_field.value = Cfg[34];
			del_passw.value = Cfg[34];
		} else {
			pass_field.value = Math.floor(Math.random()*1e10).toString(10);
			del_passw.value = pass_field.value;
		}
	}
	var toggleUserName = function() {
		toggleCfg(35);
		saveCfg(36, $id(getId('usrname_field')).value);
		if($id(getId('quickreply')))
			var QRname = $x('.//input[@name="nya1"]', QRForm) || $x('.//input[@name="akane"]', QRForm) || $x('.//input[@name="name"]', QRForm);
		if($id(getId('usrname_box')).checked) {
			name_field.value = Cfg[36];
			if(QRname) QRname.value = Cfg[36]
		} else {
			name_field.value = '';
			if(QRname) QRname.value = ''
		}
	}

	//-----------------------Create toolbar header-----------------------
	var postarea = $x('.//div[@class="postarea"]'),
		userlists = makeNode('div'),
		breaker = makeNode('div'),
		hiddendiv = makeNode('div'),
		favordiv = makeNode('div'),
		configdiv = makeNode('div');
	breaker.className = 'logo';
	hiddendiv.id = getId('hiddenposts_div');
	favordiv.id = getId('favorities_div');
	configdiv.id = getId('config_div');
	configdiv.className = 'reply';
	configdiv.style.cssText = 'font-size:small; width:380px; border-style:solid; border-color:grey; border-width:1px; margin: 7px 7px 7px 7px; display:none; overflow:hidden;';
	with(userlists.appendChild(makeInput('button', 'Настройки')))
		addEventListener('click', function() {
			configdiv.style.display = (configdiv.style.display == 'none') ?'block':'none';
		}, false),
		title = 'Показать настройки скрипта';
	userlists.appendChild(makeTxt(' '));
	with(userlists.appendChild(makeInput('button', 'Скрытые посты')))
		addEventListener('click', toggleHiddenPostsPreview, false),
		title = 'Показать список скрытых постов';
	userlists.appendChild(makeTxt(' '));
	with(userlists.appendChild(makeInput('button', 'Избранное')))
		addEventListener('click', toggleFavorites, false),
		title = 'Показать избранные треды';
	userlists.appendChild(makeTxt(' '));
	with(userlists.appendChild(makeInput('submit', 'Обновить')))
		addEventListener('click', function(event) {
			window.location.reload();
			event.stopPropagation();
			event.preventDefault();
		}, false),
		title = 'Обновить страницу';
	with(userlists)
		appendChild(configdiv),
		appendChild(hiddendiv),
		appendChild(favordiv);
	with(postarea.parentNode)
		insertBefore(userlists, postarea),
		insertBefore(breaker, postarea),
		insertBefore(makeNode('hr'), postarea);

	//-----------------------Append Config Options-----------------------
	with(configdiv.appendChild(makeNode('div')))
		textContent = 'Dollchan Extension Tools',
		style.cssText = 'font-weight:bold; width:100%; text-align:center; font-family:sans-serif';
	confdiv = makeNode('div');
	confdiv.style.cssText = 'padding:5px 5px 5px 5px; overflow:hidden;';
	configdiv.appendChild(confdiv);
	addBox(toggleCfg, 0, ' Анти-вайп детекторы');
	if(chan != 'iichan') addBox(toggleSage, 1, ' Скрывать sage посты', 'sage_hider');
	addBox(toggleTheme, 2, ' Скрывать посты с полем "Тема"');
	addBox(toggleNotext, 3, ' Скрывать посты без текста', 'notext_hider');
	addBox(toggleNoimage, 4, ' Скрывать посты без изображений', 'noimage_hider');
	// 'image by weight' hider
	with(confdiv.appendChild(makeInput('checkbox'))) {
		addEventListener('click', toggleImgSize, false);
		if(Cfg[5] == 1) checked = true;
	}
	confdiv.appendChild(makeTxt(' Скрывать с изображениями '));
	with(confdiv.appendChild(makeNode('select'))) {
		innerHTML = '<option value="0">&lt;</option><option value="1">&gt;</option><option value="2">~</option>';
		selectedIndex = Cfg[6];
		addEventListener('change', function(){saveCfg(6, this.selectedIndex)}, false);
	}
	with(confdiv.appendChild(makeInput('text', Cfg[7], 'imgsize_field')))
		size = 4,
		addEventListener('keypress', enterNumbersKey, false),
		addEventListener('keypress', preventEnter, false);
	with(confdiv)
		appendChild(makeTxt(' KB')),
		appendChild(makeNode('br'));
	// 'large text' hider
	with(confdiv.appendChild(makeInput('checkbox'))) {
		addEventListener('click', toggleMaxtext, false);
		if(Cfg[8] == 1) checked = true;
	}
	confdiv.appendChild(makeTxt(' Скрывать с текстом больше '));
	with(confdiv.appendChild(makeInput('text', Cfg[9], 'maxtext_field')))
		size = 4,
		addEventListener('keypress', enterNumbersKey, false),
		addEventListener('keypress', preventEnter, false);
	with(confdiv)
		appendChild(makeTxt(' символов')),
		appendChild(makeNode('br'));
	// regexp hider
	addBox(toggleRegexp, 10, ' Скрытие по выражению/имени/!трипкоду', 'regexp_hider');
	with(confdiv.appendChild(makeNode('textarea')))
		id = getId('regexp_field'),
		value = Cfg[11].replace(/(::)/ig, '\n'),
		rows = 4,
		cols = 43;
	confdiv.appendChild(makeNode('br'));
	addBox(toggleStrongHide, 12, ' Полностью скрывать сообщения');
	addBox(toggleCfg, 13, ' Объединять скрытые посты*');
	addBox(toggleCfg, 14, ' Быстрый просмотр скрытых постов');
	confdiv.appendChild(makeNode('hr'));
	addBox(toggleCfg, 15, ' Карта ответов*');
	addBox(toggleCfg, 16, ' Кнопки быстрого ответа*');
	addBox(toggleCfg, 17, ' Кнопки добавления в избранное*');
	addBox(toggleCfg, 18, ' Отображать кнопки в виде текста*');
	if(chan == '0chan' || chan == '2-ch')
	addBox(toggleCfg, 19, ' Отображать сажу*');
	if(chan == '2-ch')
	addBox(toggleCfg, 20, ' Дублировать капчу*');
	addBox(toggleBoardRules, 21, ' Не отображать правила борды');
	if(source == 'wakaba')
	addBox(toggleCfg, 23, ' Раскрывать изображения на странице*');
	if(chan == '2-ch' || chan == 'iichan')
	addBox(toggleCfg, 24, ' Раскрывать сокращенные посты*');
	if(chan == '2-ch')
	addBox(toggleCfg, 25, ' Убирать прокрутку с постов*');
	addBox(toggleCfg, 26, ' Просмотр постов по >> ссылкам*');
	addBox(toggleCfg, 27, ' Просмотр YouTube ссылок*');
	addBox(toggleCfg, 28, ' Проигрыватель mp3*');
	addBox(toggleCfg, 29, ' Форма ответа снизу*');
	addBox(toggleCfg, 38, ' Постить без перезагрузки (проверять ответ)*')
	// 'New posts' mode select
	with(confdiv.appendChild(makeNode('select'))) {
		innerHTML = '<option value="0">Отключена</option><option value="1">По клику</option><option value="2">Авто</option>';
		selectedIndex = Cfg[37];
		addEventListener('change', function(){saveCfg(37, this.selectedIndex)}, false);
	}
	confdiv.appendChild(makeTxt(' подгрузка новых посты в треде*'));
	confdiv.appendChild(makeNode('br'));
	if(name_field) {
		with(confdiv.appendChild(makeInput('text', Cfg[36], 'usrname_field')))
			size = '14';
		addBox(toggleUserName, 35, ' Постоянное имя', 'usrname_box');
	}
	if(pass_field) {
		with(confdiv.appendChild(makeInput('password', Cfg[34], 'usrpass_field')))
			size = '14';
		addBox(toggleUserPassw, 33, ' Постоянный пароль', 'usrpass_box');
	}
	confdiv.appendChild(makeNode('hr'));
	with(confdiv.appendChild(makeInput('button', 'Сброс настроек')))
		addEventListener('click', function() {
			setDefaultConfig();
			window.location.reload();
		}, false),
		style.cssText = 'float:right';
}


//-----------------------Comfortable changes in board form-----------------------

function modifyReplyForm() {
	if(chan == '2-ch') removeNode($x('.//a', logo));
	if(Cfg[21] == 1) board_rules.style.display = 'none';
	if(captcha) captcha.setAttribute('autocomplete', 'off');
	if(chan == '2-ch') with($x('.//style[@type="text/css"]')) textContent += ' .postblock { background:#bbbbbb }';
	if(chan != 'dobrochan') {
		if(name_field) name_field.size = 40;
		if(email_field) email_field.size = 40;
		if(theme_field) theme_field.size = 40;
		if(file_field) file_field.size = 40;
		if(video_field) video_field.size = 40;
		if(captcha) captcha.size = 40;
		if(pass_field) pass_field.size = 40;
	}
	if(Cfg[33] == 1) pass_field.value = del_passw.value = Cfg[34];
	if(Cfg[35] == 1) name_field.value = Cfg[36];
	submit_btn.addEventListener('click', function() {
		if(browzer == 'Firefox' && Cfg[38] == 0) removeNode($id(getId('sageman')));
	}, false);
	// Move postform down
	if(Cfg[29] == 1) {
		var b = delform.parentNode;
		var replyhdr = $x('.//div[@class="theader"]', b),
			postarea = $x('.//div[@class="postarea"]', b);
		b.insertBefore(postarea, delform.nextSibling);
		if(replyhdr) b.insertBefore(replyhdr, delform.nextSibling);
	}
	// Captcha generator for 2-ch
	getCaptcha = function(repmode, opnum) {
		var newcap = makeNode('img');
		if(repmode == 'thread' && !opnum) opnum = opNum;
		with(newcap) {
			if(repmode == 'thread') 
				src = '/'+board+'/captcha.pl?key=res'+opnum+'&amp;dummy='+Math.floor(Math.random()*1e10).toString(10);
			else src = '/'+board+'/captcha.pl?key=mainpage&amp;dummy='+Math.floor(Math.random()*1e10).toString(10);
			id = 'imgcaptcha';
			style.display = 'block';
			setAttribute('onclick', 'update_captcha(this)');
		}
		return newcap;
	}
	// Change captcha structure for wakaba, make it to refresh
	if(captcha && source == 'wakaba') {
		var cap_td = $x('./ancestor::td', captcha),
			cap_img = $x('.//img', cap_td);
		if(chan == '2-ch') {
			var cap_div = $id('captchadiv');
			if(cap_div) {
				captcha.removeAttribute('onfocus', 'show_captcha()');
				removeNode(prevObject(captcha));
				removeNode(cap_div);
			} else removeNode($id('imgcaptcha'));
			cap_img = getCaptcha(mode);
			cap_td.appendChild(cap_img);
			// additional captcha
			if(Cfg[20] == 1) cap_td.appendChild(getCaptcha(mode));
		}
		if(chan == 'iichan' || chan == 'wakachan') {
			cap_img.addEventListener('click', function(e) {
				this.src = this.src.replace(/dummy=\d*/, 'dummy='+Math.floor(Math.random()*1e10).toString(10));
			}, false)
		}
		cap_img.style.display = 'block';
	}
	// Force english capthca input
	if(captcha && source == 'wakaba') {
		forceCaptcha = function (captext) {
			unicode = captext.charCode || captext.keyCode;
			if(unicode > 1039) {
				captext.preventDefault();
				with(this) {
					var val = value, ss = selectionStart, offset = (unicode < 1072 ?1040:1072),
					chars = ['f', 0, 'd', 'u', 'l', 't', 0, 'p', 'b', 'q', 'r', 'k', 'v', 'y', 'j', 'g', 'h', 'c', 'n', 'e', 'a', 0, 'w', 'x', 'i', 'o', 0, 's', 'm', 0, 0, 'z'];
					value = val.substring(0, ss) + (chars[unicode - offset] || '') + val.substring(selectionEnd);
					selectionStart = ++ss, selectionEnd = ss;
				}
			}
		};
		captcha.addEventListener ('keypress', forceCaptcha, false);
	}
	// manual resize of post message input form
	var resizePostform = function(node) {
		node.style.cssText = 'width:'+Cfg[30]+'px; height:'+Cfg[31]+'px';
		var resizer = node.parentNode.appendChild(makeNode('img'));
		resizer.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABlBMVEUAAAAAAAClZ7nPAAAAAWJLR0QAiAUdSAAAAAF0Uk5TAEDm2GYAAAAWSURBVHjaY2BAAYyMDMNagBENYAgAABMoAD3fBUDWAAAAAElFTkSuQmCC';
		resizer.id = getId('resizer');
		var xpos = '14', ypos = '6';
		if(chan == '0chan') xpos = '19';
		if(browzer == 'Opera') ypos = '9';
		if(browzer == 'Chrome') ypos = '2';
		resizer.style.cssText = 'position:relative;left:-'+xpos+'px;top:'+ypos+'px;cursor:se-resize';
		var resmove = function(e) {
			node.style.width = e.pageX - getCoord(node, 'offsetLeft') + 'px';
			node.style.height = e.pageY - getCoord(node, 'offsetTop') + 'px';
		}, resstop = function() {
			with(document.body)
				removeEventListener('mousemove', resmove, false),
				removeEventListener('mouseup', resstop, false);
			saveCfg(30, parseInt(node.style.width));
			saveCfg(31, parseInt(node.style.height));
		}
		resizer.addEventListener('mousedown', function(e) {
			e.preventDefault();
			with(document.body)
				addEventListener('mousemove', resmove, false),
				addEventListener('mouseup', resstop, false);
		}, false);
	}
	resizePostform(message_field);
}


//-----------------------Check for correct reply submit--------------------------

function submitCheck() {
	with($x('.//body').appendChild(makeNode('div')))
		innerHTML = '<iframe name="submitcheck" id="submitcheck" src="about:blank" style="visibility:hidden; width:0px; height:0px; border:none;"></iframe>';
	postform.setAttribute('target', 'submitcheck');
	var iframeload = function(e) {
		with(e.srcElement || e.originalTarget) var frame = contentDocument;
		if(!frame.body) return;
		if(frame.location == 'about:blank' || !frame.body.innerHTML) return;
		// check for reply errors
		var warning = frame.getElementsByTagName('h2')[0] || frame.getElementsByTagName('h1')[0],
			frdelform = frame.getElementById('delform');
		if(chan != 'dobrochan' && (warning || !frdelform)) {
			if(!warning) warning = 'Ошибка:\n'+frame.innerHTML;
			alert(warning.firstChild.textContent);
			frame.location.replace('about:blank');
			return;
		}
		if(chan == 'dobrochan' && frame.location.pathname.indexOf('/error/') != -1) {
			for(var nodes = frame.getElementsByTagName('td'), i = 0, node; node = nodes[i]; i++)
				if(node.className == 'post-error') alert('Ошибка: ' + node.textContent);
			frame.location.replace('about:blank');
			return;
		}
		// add new posts
		if(QRForm || mode == 'thread') {
			if(mode == 'main') {
				var tNode = getThread(QRForm);
				expandThread($x('.//div[starts-with(@id,"oppost")]', tNode) || $x('.//div[starts-with(@class,"oppost")]', tNode), tNode.id.match(/\d+/), 8);
			} else {removeNode(QRForm); showNewPosts()}
			QRForm = undefined; message_field.value = '';
			if(captcha) captcha.value = '';
			if(source == 'wakaba' && captcha) {
				var cap_td = $x('./ancestor::td', captcha);
				if(chan == '2-ch') {
					var cap = $X('.//img[@id="imgcaptcha"]');
					cap.snapshotItem(0).src = cap.snapshotItem(0).src.replace(/dummy=\d*/, 'dummy='+Math.floor(Math.random()*1e10).toString(10));
					if(cap.snapshotItem(1)) cap.snapshotItem(1).src = cap.snapshotItem(1).src.replace(/dummy=\d*/, 'dummy='+Math.floor(Math.random()*1e10).toString(10));
				} else {
					var cap = $x('.//img', cap_td);
					cap.src = cap.src.replace(/dummy=\d*/, 'dummy='+Math.floor(Math.random()*1e10).toString(10));
				}
			}
		} else window.location = frame.location;
		frame.location.replace('about:blank');
	}
	if(browzer == 'Opera') window.addEventListener('DOMFrameContentLoaded', iframeload, false);
	else $id('submitcheck').addEventListener('load', iframeload, false);
}


//----------------------------Add sage select node-------------------------------

function addSageMan() {
	sagemanFunc = function(opt, mail, name, theme) {
		if(mail.type == 'text') mail.value = '';
		else mail.checked = false;
		if(opt == 1 || opt == 2) {
			if(mail.type == 'text') mail.value = 'sage';
			else mail.checked = true;
		}
		if(name) {
			if(opt == 2) name.value = 'SAGE';
			else if(Cfg[35] == 1) name.value = Cfg[36];
		}
		if(theme) {
			if(opt == 2) theme.value = 'SAGE';
			else if(theme.value == 'SAGE') theme.value = '';
		}
	}
	var sageman = makeNode('select');
	with(sageman) {
		id = getId('sageman');
		innerHTML = '<option value="0">Без сажи</option><option value="1">Sage</option><option value="2">SAGE!</option>';
		selectedIndex = Cfg[32];
		addEventListener('change', function() {
			sagemanFunc(this.selectedIndex, email_field, name_field, theme_field);
			saveCfg(32, this.selectedIndex);
		}, false);
		addEventListener('click', function(e) {e.preventDefault(); e.stopPropagation()}, false);
	}
	if(email_field.nextSibling) removeNode(email_field.nextSibling);
	with(email_field.parentNode)
		appendChild(makeTxt(' ')),
		appendChild(sageman);
	sagemanFunc(Cfg[32], email_field, name_field, theme_field);
}


//--------------------------Add text format buttons------------------------------
// Base64 from image - see http://web-apps.ru/perl-fw/data-url/

function addTextFormatPanel() {
	with(textFormatPanel = makeNode('div'))
		id = getId('textpanel'),
		innerHTML = '&nbsp;&nbsp;',
		style.display = 'inline';
	submit_btn.parentNode.appendChild(textFormatPanel);
	with(textFormatPanel.appendChild(makeNode('span'))) {
		id = getId('bold_btn');
		title = 'Жирный';
		if(Cfg[18] == 0) style.cssText = 'padding:0 27px 27px 0; background:url(data:image/gif;base64,R0lGODlhFwAWAMQAAP//////AP8A//8AAAD//wD/AAAA/wAAAPb2+Onq7Bc/e053qitemNXZ3Wmdypm922hoaP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAXABYAAAWTYBQtZGmepjg+bOu+7hIxD2LfeI4/DK3/Op4PSEQIazjIYbmEQII95E3JZD530ZzyajtwbUJHYjzekhPLc8LRE5/NZa+azXCTqdWDet1W46sQc20NhIRbhQ2HhXQOiIleiFSIdAuOioaQhQs9lZF5TI6bDJ2Ff02ODaKkqKyanK2whKqxsJsjKLi4Kgq8vb6/viIhADs=) no-repeat; cursor:pointer;';
		else innerHTML = '<strong>[<a>B</a>]</strong> ';
		addEventListener('click', boldText, false);
	}
	with(textFormatPanel.appendChild(makeNode('span'))) {
		id = getId('italic_btn');
		title = 'Наклонный';
		if(Cfg[18] == 0) style.cssText = 'padding:0 27px 27px 0; background:url(data:image/gif;base64,R0lGODlhFwAWAMQAAP//////AP8A//8AAAD//wD/AAAA/wAAAPb2+Onq7Bc/e053qitemNXZ3Wmdypm922hoaP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAXABYAAAV5YBQtZGmepjg+bOu+7hIxD2LfeI4/DK3/Op4PSEQIa0TI4XcsKpk9ZBHKcCSuWKwym3X0rFztIXz1VskJJQRtBofV7G9jTp8r6/g2nn7fz80Lfmp+cws9gXt9hIYMiHiKfoyOhIuHlJeSl5SGIyienioKoqOkpaQiIQA7) no-repeat; cursor:pointer;';
		else innerHTML = '<strong>[<em><a>I</a></em>]</strong> ';
		addEventListener('click', italicText, false);
	}
	if(chan != 'dobrochan')
	with(textFormatPanel.appendChild(makeNode('span'))) {
		id = getId('underlined_btn');
		title = 'Подчеркнутый';
		if(Cfg[18] == 0) style.cssText = 'padding:0 27px 27px 0; background:url(data:image/gif;base64,R0lGODlhFwAWAMQAAP//////AP8A//8AAAD//wD/AAAA/wAAAPb2+Onq7Bc/e053qitemNXZ3Wmdypm926CgoGhoaP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAXABYAAAWPoCQtZGmepjg+bOu+7iIxD2LfeI4/DK3/Op4PSEQIazjIIbnMHXNKZrCHvEWtzV3Pkeh2IwdvAizuOrZlslctPjO4YvY4XHbD1/Rv3mtv+P1gEH9gf399hWARigeMhX5uC44NYIwQSpILPZGSnI6ZDJudop+hDYynqI1/pKKtrK2dmSMotLQqCri5uru6IiEAOw==) no-repeat; cursor:pointer;';
		else innerHTML = '<strong>[<u><a>U</a></u>]</strong> ';
		addEventListener('click', underlinedText, false);
	}
	with(textFormatPanel.appendChild(makeNode('span'))) {
		id = getId('strike_btn');
		title = 'Зачеркнутый';
		if(Cfg[18] == 0) style.cssText = 'padding:0 27px 27px 0; background:url(data:image/gif;base64,R0lGODlhFwAWAMQAAP//////AP8A//8AAAD//wD/AAAA/wAAAPb2+Onq7Bc/e053qitemNXZ3Wmdypm922hoaE1NTf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAXABYAAAWNoCQtZGmepjg+bOu+7iIxD2LfeI4/DK3/Op4PSEQIazrIYQn5HXXL6KGZe+KUkIQWW+05tOAlWCseO7zjBDbNPjO+aog8Kq/XtW54en5g470NgYKDWIOBeYNLhoqGbguEU4KFhgs9j4lSBxGGgZUMl5BMnJ2Wo6aDnqCno6mrp5UjKLKyKgq2t7i5uCIhADs=) no-repeat; cursor:pointer;';
		else innerHTML = '<strong>[<a>S</a>]</strong> ';
		addEventListener('click', strikeText, false);
	}
	with(textFormatPanel.appendChild(makeNode('span'))) {
		id = getId('spoiler_btn');
		title = 'Спойлер';
		if(Cfg[18] == 0) style.cssText = 'padding:0 27px 27px 0; background:url(data:image/gif;base64,R0lGODlhFwAWAMQAAP//////AP8A//8AAAD//wD/AAAA/wAAAPb2+Onq7Bc/e053qitemNXZ3Wmdypm922hoaP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAXABYAAAV7YBQtZGmepjg+bOu+7hIxD2LfeI4/DK3/Op4PSEQIa0Xg0XZoOp9Q2xIBqVqvWGnPkUhgv9euY9sFm8Vkr/mLZnDV63Bi7G404lg73WGH+p96PQt2hIWGhguCh4uHiQyDjJENjpCSi5SWjJiZjQwjKKCgKgqkpaanpiIhADs=) no-repeat; cursor:pointer;';
		else innerHTML = '<strong>[<a>%</a>]</strong> ';
		addEventListener('click', spoilerText, false);
	}
	with(textFormatPanel.appendChild(makeNode('span'))) {
		id = getId('code_btn');
		title = 'Код';
		if(Cfg[18] == 0) style.cssText = 'padding:0 27px 27px 0; background:url(data:image/gif;base64,R0lGODlhFwAWAMQAAP//////AP8A//8AAAD//wD/AAAA/wAAAPb2+Onq7Bc/e053qitemNXZ3Wmdypm922hoaP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAXABYAAAWGYBQtZGmepjg+bOu+7hIxD2LfeI4/DK3/Op4PSEQIa0Xg8Qc5OCGQYA+Jazqv0V3Pkeh2rd4ENJxwbMlNsrp8DjvXZDOD6z7Aw3JHY7938v+AeYBNgIUNcguDfnxQgAs9iYpXT46QhlYHjZUMkYaee4+cn6OhnaOFjyMoq6sqCq+wsbKxIiEAOw==) no-repeat; cursor:pointer;';
		else innerHTML = '<strong>[<a>C</a>]</strong> ';
		addEventListener('click', codeText, false);
	}
}


//--------------------------Makes preview of hidden posts------------------------

function toggleHiddenPostsPreview() {
	var preview = $id(getId('hiddenposts_div'));
	if(preview.hasChildNodes()) {
		removeChildren(preview);
		return;
	}
	var table = makeNode('table');
	table.style.align = 'left';
	preview.appendChild(table);
	var posts = new Array(), nums = new Array(), clones = new Array();
	forEachReply( function(pNode, pNum) {
		if(getVisibility(pNum) != HIDE) return;
		posts[posts.length] = pNode;
		nums[nums.length] = pNum;
	});
	if(posts.length == 0) {
		preview.appendChild(makeTxt(' [Скрытые посты отсутствуют]'))
		return;
	}
	for(var i = 0; i < posts.length; ++i) {
		var clone = posts[i].cloneNode(true);
		clones[i] = clone;
		clone.num = nums[i];
		clone.vis = HIDE;
		clone.style.cssText = 'align:left; display:block';
		var btn = $x('.//span[@id="'+getId('posthider', nums[i])+'"]', clone);
		btn.addEventListener('click', function(node){return function(){
			node.vis = (node.vis==HIDE) ?UNHIDE:HIDE;
			modPostVisibility(node, node.num, node.vis);
		}}(clone), false);
		table.insertRow(-1).appendChild(clone);
	};
	var cell = table.insertRow(-1).insertCell(-1);
	with(cell.appendChild(makeInput('button', 'Сохранить изменения'))) {
		addEventListener('click', function() {
			for(var i = 0; i < clones.length; ++i) {
				if(clones[i].vis == HIDE) continue;
				togglePostVisibility(posts[i], nums[i]);
				storePostsVisibility();
			}
			removeChildren(preview);
		}, false);
	}
	with(cell.appendChild(makeInput('button', 'Отмена'))) {
		addEventListener('click', function() {removeChildren(preview)}, false)}
}


//----------------------Makes preview of 'Favorities' list-----------------------

function toggleFavorites() {
	var favorList = $id(getId('favorities_div'));
	if(favorList.hasChildNodes()) {
		removeChildren(favorList);
		return;
	}
	var entries = getConfigValue(getId('Favorities'));
	if(entries) entries = entries.split('|');
	else {
		favorList.appendChild(makeTxt(' [Избранные треды отсутствуют]'))
		return;
	}
	entries.pop();
	var table = makeNode('table');
	table.setAttribute('align', 'left');
	favorList.appendChild(table);
	for(var i = 0; i < entries.length/3; i++) {
		var getchan = entries[i*3] + '.ru',
			favorNote = makeNode('span'),
			removeNote = makeNode('span'),
			tname = entries[i*3+2];
		if((saves != 'cookie' && tname.length >= 70) || (saves == 'cookie' && tname.length >= 25)) tname += '..';
		with(removeNote) {
			title = 'Убрать запись';
			style.cssText = 'padding-left: 18px; vertical-align: middle;'+pic_hide+' cursor:pointer;';
			addEventListener('click', function(node) {return function() {
				removeFavoritiesFromList(node);
			}} (favorNote), false);
		}
		favorNote.innerHTML = parseInt(i+1)+'. '+'<a href="'+'http://'+getchan+'/'+entries[i*3+1].match(/[a-z]+/)+'/res/'+entries[i*3+1].match(/\d+/)+'.html'+'">'+entries[i*3]+'/'+entries[i*3+1]+'</a> - '+tname;
		favorNote.insertBefore(removeNote, $x('.//a', favorNote));
		table.insertRow(-1).insertCell(-1).appendChild(favorNote);
	}
}


//--------------------------------Makes Quick Reply------------------------------

QRForm = undefined;
function quickReply(pNode, pNum) {
	var tNode = getThread(pNode),
		tNum = tNode.id.match(/\d+/);
	if(QRForm) {
		// restore old quick reply
		if(nextObject(pNode) == QRForm && QRForm.style.display != 'none') {
			QRForm.style.display = 'none';
			return;
		}
		QRForm.style.display = 'block';
	} else {
		// create new quick reply
		QRForm = postform.cloneNode(true);
		QRForm.className = 'reply';
		QRForm.id = getId('quickreply');
		removeNode($x('.//img[@id="'+getId('resizer')+'"]', QRForm));
		goto_tr = $x('.//tr[@id="trgetback"]', QRForm) || $x('.//label[@for="gotothread"]', QRForm) || $x('.//input[@name="postredir"]', QRForm);
		if(Cfg[38] == 1 && goto_tr) $x('ancestor-or-self::tr', goto_tr).style.display = 'none';
		QRsage = $x('.//select[@id="'+getId('sageman')+'"]', QRForm);
		QRemail = $x('.//input', QRsage.parentNode);
		QRname = $x('.//input[@name="nya1"]', QRForm) || $x('.//input[@name="akane"]', QRForm) || $x('.//input[@name="name"]', QRForm);
		QRtheme = $x('.//input[@name="nya3"]', QRForm) || $x('.//input[@name="kasumi"]', QRForm) || $x('.//input[@name="subject"]', QRForm);
		// append text quote button
		with($x('.//div[@id="'+getId('textpanel')+'"]', QRForm).appendChild(document.createElement('span'))) {
			id = getId('quote_btn');
			title = 'Цитировать выделенный текст';
			if(Cfg[18] == 0) style.cssText = 'padding:0 27px 27px 0; background:url(data:image/gif;base64,R0lGODlhFwAWAMQAAP//////AP8A//8AAAD//wD/AAAA/wAAAPb2+Onq7Bc/e053qitemNXZ3Wmdypm922hoaP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAXABYAAAWEYBQtZGmepjg+bOu+7hIxD2LfeI4/DK3/Op4PSEQIa7jDoWg75iAQZdGpg0p/Qkdiy+VaD92to6cNh7/dMaNsPke5anabq4TAyY28ft+oQ/ZxfHt+gmoLgn0HUIgNCz2Hg4p/jI2PfIuUeY4MkJmIm52efKCinwwjKKmpKgqtrq+wryIhADs=) no-repeat; cursor:pointer;';
			else innerHTML = '<strong>[<a>&gt;</a>]</strong>';
			addEventListener('mouseover', function(){quotetxt = window.getSelection().toString().replace(/\n/g, '\n>')}, false);
			addEventListener('click', function(){$x('.//textarea', QRForm).value += '>'+quotetxt+'\n'}, false);
		}
		// append text formatting buttons
		$x('.//span[@id="'+getId('bold_btn')+'"]', QRForm).addEventListener('click', boldText, false);
		$x('.//span[@id="'+getId('italic_btn')+'"]', QRForm).addEventListener('click', italicText, false);
		if(chan != 'dobrochan')
		$x('.//span[@id="'+getId('underlined_btn')+'"]', QRForm).addEventListener('click', underlinedText, false);
		$x('.//span[@id="'+getId('spoiler_btn')+'"]', QRForm).addEventListener('click', spoilerText, false);
		$x('.//span[@id="'+getId('strike_btn')+'"]', QRForm).addEventListener('click', strikeText, false);
		$x('.//span[@id="'+getId('code_btn')+'"]', QRForm).addEventListener('click', codeText, false);
		// append sageman
		if(email_field) {
			QRsage.selectedIndex = Cfg[32];
			QRsage.addEventListener('click', function(e) {e.preventDefault(); e.stopPropagation()}, false);
			QRsage.addEventListener('change', function() {sagemanFunc(this.selectedIndex, QRemail, QRname, QRtheme)}, false);
		}
		// 0chan captcha update
		if(chan == '0chan' && captcha) {
			captcha.value = ' ';
			with($x('.//img[@id="captchaimage"]', QRForm)) {
				src = 'http://www.0chan.ru/captcha.php?' + Math.random();
				id = 'qrcaptchaimage';
				parentNode.setAttribute("onclick", "javascript:document.getElementById('qrcaptchaimage').src = 'http://www.0chan.ru/captcha.php?' + Math.random();return false;");
			}
		}
	}
	// rebuild reply to current thread
	if(mode == 'main') {
		if(source == 'wakaba') {
			var inp = makeInput('hidden', tNum, null, 'parent'),
				trap = $x('.//div[@class="trap"]', QRForm) || $x('.//div[@class="its_a_tarp"]', QRForm) || $x('.//input[@name="name"]', QRForm) || $x('.//input[@name="akane"]', QRForm);
			QRForm.insertBefore(inp, trap);
		}
		if(chan == '0chan') {
			$x('.//input[@name="replythread"]', QRForm).value = tNum;
			$x('.//span[@id="posttypeindicator"]', QRForm).textContent = 'ответ на ' + tNum;
		}
		if(chan == 'dobrochan')
			$x('.//input[@name="thread_id"]', QRForm).value = tNum;
	}
	// Captcha update
	var QRcap = $x('.//input[@name="captcha"]', QRForm);
	if(QRcap) {
		QRcap_tr = QRcap.parentNode;
		if(source == 'wakaba')
			QRcap.addEventListener('keypress', forceCaptcha, false);
		if(chan == '2-ch') {
			var QRcap_img = $X('.//img[@id="imgcaptcha"]', QRForm);
			removeNode(QRcap_img.snapshotItem(0));
			if(QRcap_img.snapshotItem(1)) removeNode(QRcap_img.snapshotItem(1));
			QRcap_tr.appendChild(getCaptcha('thread', tNum));
			if(Cfg[20] == 1) QRcap_tr.appendChild(getCaptcha('thread', tNum));
		}
		if(chan == 'iichan' || chan == 'wakachan') {
			var QRcap_img = $x('.//img', QRcap_tr);
			QRcap_img.addEventListener('click', function(e) {
				this.src = this.src.replace(/dummy=\d*/, 'dummy='+Math.floor(Math.random()*1e10).toString(10));
			}, false);
		}
		if(chan == 'iichan') QRcap_img.src = '/cgi-bin/captcha.pl/'+board+'/?key=res'+tNum+'&amp;dummy='+Math.floor(Math.random()*1e10).toString(10);
		if(chan == 'wakachan') QRcap_img.src = '/'+board+'/captcha.pl?key=res'+tNum+'&amp;dummy='+Math.floor(Math.random()*1e10).toString(10);
	}
	// restore message text
	var cloneTxt = $x('.//textarea', QRForm);
	if(cloneTxt.value == '') {
		var txt = message_field.value;
		if(txt == '') txt = '>>' + pNum + '\n'; 
		else txt += '\n>>' + pNum + '\n';
		cloneTxt.value = txt;
	} else cloneTxt.value += '\n>>' + pNum +'\n';
	// On submnit events
	var qrsubmit = $x('.//input[@type="submit"]', QRForm);
	qrsubmit.addEventListener('click', function() {
		if(browzer == 'Firefox' && Cfg[38] == 0) removeNode($id(getId('sageman')));
		message_field.value = cloneTxt.value;
	}, false);
	pNode.parentNode.insertBefore(QRForm, nextObject(pNode));
}


//=============================================================================
//					For each reply and thread functions
//=============================================================================

function getThread(node)
	{return $x('./ancestor::div[@class="thread"]', node)}

function getPost(node) {
	if(chan != '0chan') return $x('./ancestor::table', node);
	else return $x('./ancestor::div[@class="postnode"]', node) || $x('./ancestor::table[@class="loadedpost"]', node);
}

function getPostHeader(pNode)
	{return $x('.//span[@id="'+getId('postcontrols')+'"]', pNode)}

function isNoText(pNode, pNum) {
	if(messages[pNum].replace(/\s/g, '').length < 3) return true;
	return false;
}

function isSagePost(pNode) {
	if(chan == 'iichan') return false;
	if(chan == '2-ch' && !$x('.//a[@href="mailto:sage"]', pNode)) {
		var n = $x('.//span[@class="commentpostername"]', pNode);
			if(!(n && $x('.//a', n) && $x('.//a', n).href.toLowerCase() == 'mailto:sage')) return false;
	}
	if(chan == 'dobrochan' && !$x('.//img[@alt="Сажа"]', pNode)) return false;
	if(chan == '0chan' && !$x('.//span[@class="postername"]/a[@href="mailto:sage"]', pNode)) return false;
	return true;
}

function forEachReply(fn) {
	for(var pNode, i = 0; pNode = posts.snapshotItem(i); i++) {
		var pNum = pNode.id.match(/\d+/);
		postCounter[pNum] = i + 2;
		fn(pNode, pNum, i + 2);
	}
	var loaded = $X('.//table[@class="loadedpost"]');
	if(loaded.snapshotLength > 0)
	for(var pNode, i = 0; pNode = loaded.snapshotItem(i); i++) {
		var pNum = pNode.id.match(/\d+/);
		fn(pNode, pNum);
	}
}

function forOPReply(fn) {
	for(var pNode, i = 0; pNode = opposts.snapshotItem(i); i++) {
		postCounter[pNode.id.match(/\d+/)] = 1;
		fn(pNode, pNode.id.match(/\d+/), i);
	}
}

function forAllReplies(fn) {forEachReply(fn); forOPReply(fn)}

function addPostButtons(pNode, pNum, pcount) {
	// Create container
	var reflink = $x('.//span[@class="reflink"]', pNode),
		postheader = makeNode('span'),
		op = false, loaded = false;
	if($x('self::*[starts-with(@id,"oppost")]', pNode) || 
		$x('self::*[starts-with(@class,"oppost")]', pNode)) op = true;
	if(pNode.className == 'loadedpost') loaded = true;
	with(postheader) {
		id = getId('postcontrols');
		if(!(Cfg[18] == 1 && op)) className = 'reflink';
		if(chan == 'dobrochan') innerHTML = '&nbsp;';
	}
	reflink.parentNode.insertBefore(postheader, reflink.nextSibling);
	// Append post buttons
	if(op) addHideThreadButton(pNode, pNum);
	if(op && mode == 'main') addExpandThreadButton(pNode, pNum);
	if(!op) addHidePostButton(pNode, pNum);
	if(Cfg[16] == 1)
		addQuickReplyButton(pNode, pNum);
	if(op && Cfg[17] == 1)
		addFavoritiesButton(pNode, pNum);
	if(Cfg[19] == 1 && (chan == '0chan' || chan == '2-ch'))
		addSageMarker(pNode, pNum);
	if(!op && (mode == 'thread' || loaded))
		addPostCounter(pNode, pNum, pcount);
	if(op && mode == 'thread' && source == 'wakaba')
		addExpandAllImgButton(pNode, pNum);
}

function makeNotice(pNode, pNum, text) {
	var a = makeNode('a');
	a.id = getId('notice', pNum);
	a.style.cssText = 'font-size:12px; font-style:italic;';
	a.appendChild(makeTxt(text));
	a.addEventListener('click', function(){removeNode(this)}, false);
	getPostHeader(pNode).appendChild(a);
}

function addHideThreadButton(opNode, tNum) {
	if(chan == '0chan') removeNode($x('.//span[starts-with(@id,"hide")]', opNode));
	with(getPostHeader(opNode).appendChild(makeNode('span'))) {
		id = getId('threadhider', tNum);
		title = 'Скрыть тред';
		if(Cfg[18] == 0) style.cssText = 'padding-left: 18px;' + pic_hide;
		else innerHTML = '[<a>Скрыть</a>] ';
		style.cursor = 'pointer';
		addEventListener('click', function(){hideThread(opNode, tNum)}, false);
	}
}

function addExpandThreadButton(opNode, tNum) {
	if(chan == '0chan') {
		var old = $x('.//img[@class="expandthread"]', opNode);
		if(old) removeNode(old.parentNode);
	}
	with(getPostHeader(opNode).appendChild(makeNode('span'))) {
		id = getId('expandthread', tNum);
		if(Cfg[18] == 0) style.cssText = 'padding-left: 18px; background:url(data:image/gif;base64,R0lGODlhDgAPALMAAP//////AP8A//8AAAD//wD/AAAA/wAAAN3d3cDAwJmZmYCAgGBgYEtLS////wAAACH5BAEAAA4ALAAAAAAOAA8AAARP0MlJq7o4X7dQ+gsALF+CLCSIiGeJqiKbLkzGIEiNMfp15zYGCtXANYY04bCIOA55SKYTBV0akQxnMQZoEhulbRf8aRTDIrKp4TC7325HBAA7) no-repeat;';
		else innerHTML = '[<a>Развернуть</a>] ';
		style.cursor = 'pointer';
		addEventListener('mouseover', function(){expandThreadSelect(opNode, tNum)}, false);
		addEventListener('mouseout', function(e){removeSelect(e.relatedTarget)}, false);
		addEventListener('click', function(){expandThread(opNode, tNum, 1)}, false);
	}
}

function addFavoritiesButton(pNode, pNum) {
	with(getPostHeader(pNode).appendChild(makeNode('span'))) {
		id = getId('favor', pNum);
		title = 'В избранное';
		if(Cfg[18] == 0) style.cssText = 'padding-left: 18px; background:url(data:image/gif;base64,R0lGODlhDgAPALMAAP//////AP8A//8AAAD//wD/AAAA/wAAAN3d3cDAwJmZmYCAgGBgYEtLS////wAAACH5BAEAAA4ALAAAAAAOAA8AAART0MlJq7o4X7dQ+skFJsiyjAqCKKOJAgALLoxpInBpMzUM4D8frcbwGQHEGi1hTCh5puLxWWswAY0GLNGgdbVYE/hr5ZY/WXTDM2ojGo6sfC53RAAAOw==) no-repeat;';
		else innerHTML = '[<a>В избранное</a>] ';
		style.cursor = 'pointer';
		addEventListener('click', function(){storeFavorities(pNode, pNum, 1)}, false);
	}
}

pic_hide='background:url(data:image/gif;base64,R0lGODlhDgAPALMAAP//////AP8A//8AAAD//wD/AAAA/wAAAN3d3cDAwJmZmYCAgGBgYEtLS////wAAACH5BAEAAA4ALAAAAAAOAA8AAARU0MlJq7o4X7dQ+mCILAuohOdHfgpQJguQLowSA+7tKkxt4wgEbnHpkWhCAIJxNJIYyWWTSQMmqUYGDtBobJmMxhOAJZO6LM3l0/WE3oiGo0uv0x0RADs=) no-repeat;';
pic_unhide='background:url(data:image/gif;base64,R0lGODlhDgAPALMAAP//////AP8A//8AAAD//wD/AAAA/wAAAN3d3cDAwJmZmYCAgGBgYEtLS////wAAACH5BAEAAA4ALAAAAAAOAA8AAARN0MlJq7o4X7dQ+mCILEuYMIxJfheDIMz1LTHGAEDd1uidozsaAvciMmhHF3EIgCFJPVwPeiTRpFZaI+tyWhsN1g7zAXtMooYDzG6zHREAOw==) no-repeat;';
function addHidePostButton(pNode, pNum) {
	with(getPostHeader(pNode).appendChild(makeNode('span'))) {
		id = getId('posthider', pNum);
		style.cssText = 'padding-left: 18px;' + pic_hide + ' cursor:pointer;';
		addEventListener('mouseover', function(){postHiderSelect(pNode, pNum)}, false);
		addEventListener('mouseout', function(e){removeSelect(e.relatedTarget)}, false);
		addEventListener('click', function(){togglePostVisibility(pNode, pNum); storePostsVisibility()}, false);
	}
}

function postHiderSelect(pNode, pNum) {
	var select = makeNode('div');
	with(select)
		id = 'selectmenu',
		className = 'reply',
		style.cssText = 'position:absolute; left:'+(getCoord($id(getId('posthider', pNum)),'offsetLeft')).toString()+'px; top:'+(getCoord($id(getId('posthider', pNum)),'offsetTop')+16).toString()+'px; z-index:250; border-style:solid; border-width:1px; cursor:pointer; width:auto',
		innerHTML = '<a>Hide by text</a><br><a>Hide by image</a>',
		addEventListener('mouseout', function(e){removeSelect(e.relatedTarget)}, false);
	delform.parentNode.insertBefore(select, delform);
	$X('.//a', select).snapshotItem(0).addEventListener('click', function(){hideSameTextPosts(pNode, pNum)}, false);
	$X('.//a', select).snapshotItem(1).addEventListener('click', function(){hideSameImagePosts(pNode, pNum)}, false);
}

function removeSelect(node)
	{if(!$x('ancestor-or-self::*[@id="selectmenu"]', node)) removeNode($id('selectmenu'))}

function addQuickReplyButton(pNode, pNum) {
	with(getPostHeader(pNode).appendChild(makeNode('span'))) {
		id = getId('quickrep', pNum);
		title = 'Быстрый ответ';
		if(Cfg[18] == 1 && ($x('self::*[starts-with(@id,"oppost")]', pNode) || 
			$x('self::*[starts-with(@class,"oppost")]', pNode))) innerHTML = '[<a>Быстрый ответ</a>] ';
		else style.cssText = 'padding-left: 18px; background:url(data:image/gif;base64,R0lGODlhDgAPALMAAP//////AP8A//8AAAD//wD/AAAA/wAAAN3d3cDAwJmZmYCAgGBgYEtLS////wAAACH5BAEAAA4ALAAAAAAOAA8AAARO0MlJq7o4X7dQ+mCILAt4hSD5LQCghgtzsa27YIys0LV75SRGr4VgxIyxIaB4DPYQiEYQ2SBGpUFsA9rAkhZdUFejSHQ9KFHD0W27244IADs=) no-repeat;';
		style.cursor = 'pointer';
		addEventListener('click', function(){quickReply(pNode, pNum)}, false);
	}
	if(chan == 'dobrochan') removeNode($x('.//a[@class="reply_ icon"]', pNode)); // remove native quickreply
}

function addSageMarker(pNode, pNum) {
	if(isSagePost(pNode))
		with(getPostHeader(pNode).appendChild(makeNode('span')))
			title = 'SAGE',
			style.cssText = 'padding-left: 18px; background:url(data:image/gif;base64,R0lGODlhDgAPALMAAP//////AP8A//8AAAD//wD/AAAA/wAAAO7u7oCAgGBgYEtLS////wAAAAAAAAAAACH5BAEAAAwALAAAAAAOAA8AAARBkMlJq7o4X6aS/6B3fVonmomCrAiqLNiyeHIMXwuL3K/sz4mfUKYbCmnGxUG3OvwwS9bBlolObSfF4WpaMJI/RgQAOw==) no-repeat; cursor:pointer;',
		addEventListener('click', function(){toggleSage(); toggleCheck($id(getId('sage_hider')))}, false);
}

function addPostCounter(pNode, pNum, pcount) {
	with(getPostHeader(pNode).appendChild(makeNode('span')))
		id = getId('postcounter'),
		appendChild(makeTxt(pcount + ' ')),
		style.cssText = 'font-size:13px;font-style:italic;font-weight:bold;cursor:default;color:'+(pcount>=500?'#c41e3a':'#4f7942');
}

function addExpandAllImgButton(opNode, pNum) {
	if($X('.//img[@class="thumb"]', getThread(opNode)).snapshotLength > 1)
	with(opNode.appendChild(makeNode('span')))
		id = getId('expandall'),
		innerHTML = '[<a>Раскрыть изображения</a>] ',
		style.cursor = 'pointer',
		addEventListener('click', expandAllImages, false);
}

function noOverflow(pNode) {getPostMsg(pNode).style.maxHeight = '100%'}

function makeYouTube(pNode, pNum) {
	if(getVisibility(pNum) == HIDE) return;
	if(!messages[pNum].match('youtube')) return;
	var node = getPostMsg(pNode),
		links = $X('.//a[contains(@href,"youtube")]', node);
	if(links.snapshotLength > 0) {
		var pattern = /^http:\/\/(www\.)?youtube\.com\/watch\?v=([^&]+).*$/,
			template = 'http://www.youtube.com/v/desu&hl=en_US&fs=1&',
			you_div = makeNode('div'),
			thumbn = $x('.//span[@class="thumbnailmsg"]', pNode);
		if(thumbn) thumbn.textContent += '. Просмотр YouTube.';
		you_div.id = getId('youtube_div');
		node.insertBefore(you_div, node.firstChild);
		for(var link, i = 0; link = links.snapshotItem(i); i++) {
			if(link.href.match(pattern)) {
				var tubeLink = template.replace('desu', link.href.match(pattern)[2]),
					play = makeNode('span');
				play.innerHTML = '<strong> ' + unescape('%u25BA') + '</strong>';
				play.style.cursor = 'pointer';
				play.addEventListener('click', function(link,div){return function(){insertYouTube(link,div)}}(tubeLink, you_div), false);
				link.parentNode.insertBefore(play, link.nextSibling);
				if(i == 0) insertYouTube(tubeLink, you_div);
			}
		}
	}
}

function insertYouTube(tubeLink, you_div) {
	var old = $x('.//embed[@src="'+tubeLink+'"]', you_div);
	if(old) removeChildren(you_div);
	else you_div.innerHTML = '&nbsp;<embed src="'+tubeLink+'" type="application/x-shockwave-flash" wmode="transparent" width="320" height="262"></embed>';
}

function makeMP3(pNode, pNum) {
	if(getVisibility(pNum) == HIDE) return;
	var links = $X('.//a[contains(@href,".mp3") or contains(@href,".wav")]', pNode);
	if(links.snapshotLength > 0) {
		var node = getPostMsg(pNode),
			mp3 = makeNode('div');
		mp3.id = getId('mp3_div');
		node.insertBefore(mp3, node.firstChild);
		for(var link, i = 0; link = links.snapshotItem(i); i++)
			if(!$x('.//param[contains(@value,"'+link.href+'")]', mp3))
				mp3.innerHTML += '<object data="http://junglebook2007.narod.ru/audio/player.swf" wmode="transparent" type="application/x-shockwave-flash" width="220" height="16"><param value="http://junglebook2007.narod.ru/audio/player.swf" name="movie"><param value="playerID=1&amp;bg=0x808080&amp;leftbg=0xB3B3B3&amp;lefticon=0x000000&amp;rightbg=0x808080&amp;rightbghover=0x999999&amp;rightcon=0x000000&amp;righticonhover=0xffffff&amp;text=0xffffff&amp;slider=0x222222&amp;track=0xf5f5dc&amp;border=0x666666&amp;loader=0x7fc7ff&amp;loop=yes&amp;autostart=no&amp;soundFile='+link.href+'&amp;" name="FlashVars"><param value="high" name="quality"><param value="true" name="menu"><param value="transparent" name="wmode"></object><br>  ';
	}
}

//--------------------------Expand shorted posts in MAIN-------------------------

function expandPosts(pNode, pNum) {
	if(getVisibility(pNum) == HIDE) return;
	var abbrev = $x('.//div[@class="abbrev"]', pNode);
	if(!abbrev) return;
	var tNum = getThread(pNode).id.match(/\d+/);
	loadajax(tNum, function() {
		var txt = thrds[tNum][pNum],
			txtnode = abbrev.parentNode;
		txtnode.innerHTML = txt.substring(txt.indexOf('<blockquote') + 12, txt.lastIndexOf('</blockquote>'));
		if(Cfg[26] == 1) addLinksPreview(getPostMsg(pNode));
		if(Cfg[27] == 1) makeYouTube(pNode, pNum);
		if(Cfg[28] == 1) makeMP3(pNode, pNum);
	});
}

//----------------------------Expand thread in MAIN mode-------------------------
// Show select menu
function expandThreadSelect(opNode, tNum) {
	var select = makeNode('div');
	with(select)
		id = 'selectmenu',
		className = 'reply',
		style.cssText = 'position:absolute; left:'+(getCoord($id(getId('expandthread', tNum)),'offsetLeft')).toString()+'px; top:'+(getCoord($id(getId('expandthread', tNum)),'offsetTop')+16).toString()+'px; z-index:250; border-style:solid; border-width:1px; cursor:default; width:auto',
		innerHTML = '<a name="5">5 постов</a><br><a name="15">15 постов</a><br><a name="30">30 постов</a><br><a name="50">50 постов</a><br><a name="100">100 постов</a>';
		addEventListener('mouseout', function(e){removeSelect(e.relatedTarget)}, false);
	delform.parentNode.insertBefore(select, delform);
	for(var a, i = 0; a = $X('.//a', select).snapshotItem(i); i++)
		a.addEventListener('click', function(){expandThread(opNode, tNum, parseInt(this.name))}, false);
}

function expandThread(opNode, tNum, last) {
	var tNode = getThread(opNode);
	var om = $x('.//span[@class="omittedposts"]', tNode) || $x('.//div[@class="abbrev"]', tNode);
	if(om) removeNode(om);
	if(chan == '2-ch' || chan == 'iichan') expandPosts(opNode, tNum);
	while(opNode.nextSibling) removeNode(opNode.nextSibling);
	loadajax(tNum, function() {
		var len = thrds[tNum].keys.length;
		if(last != 1) last = len - last;
		if(last <=0) last = 1;
		for(var i = last; i < len; i++) {
			var pnum = thrds[tNum].keys[i],
				newpost = makeNode('table');
			newpost.className = 'loadedpost';
			newpost.id = 'post_' + pnum;
			newpost.innerHTML = '<tbody><tr><td class="doubledash">&lt;&lt;</td><td class="reply" style="width:auto" id="reply'+pnum+'">'+thrds[tNum][pnum]+'</td></tr></tbody>';
			tNode.appendChild(newpost);
			addPostFunc(newpost, pnum, i);
		}
	});
}

// Append script functions for uploaded posts
function addPostFunc(pNode, pNum, i) {
	readMessages(pNode, pNum);
	addPostButtons(pNode, pNum, i+1);
	postCounter[pNum] = i+1;
	doPostFilters(pNode, pNum);
	if(getVisibility(pNum) == HIDE) setPostVisibility(pNode, pNum, HIDE);
	if(Cfg[13] == 1 && mode == 'thread') collectHiddenPosts(pNode, pNum);
	if(Cfg[15] == 1) showPostAnswers(pNode);
	if(Cfg[23] == 1 && source == 'wakaba') imageHandling(pNode, pNum);
	if(Cfg[26] == 1) addLinksPreview(getPostMsg(pNode));
	if(Cfg[27] == 1) makeYouTube(pNode, pNum);
	if(Cfg[28] == 1) makeMP3(pNode, pNum);
}

//----------------------------Load new posts in THREAD---------------------------
// Add listener button / autoloading intervals (30 sec)
function addNewPostsButton() {
	if(Cfg[37] == 1) {
		var newbut = makeNode('span'),
			tNode = $x('.//div[@class="thread"]');
		with(newbut)
			id = getId('newposts_btn'),
			innerHTML = '[<em><a>Новые посты:</a></em> 0]',
			style.cursor = 'pointer',
			addEventListener('click', showNewPosts, false);
		if(chan == '0chan') tNode.insertBefore(newbut, $x('.//span[@style="float: right;"]', tNode));
		else tNode.appendChild(newbut);
		setInterval(function(){loadajax(opNum, function(){$id(getId('newposts_btn')).innerHTML='[<em><a>Новые посты:</a></em> '+parseInt(thrds[opNum].keys.length-$X('.//span[@id="'+getId('postcounter')+'"]').snapshotLength-1)+']'})}, 30000);
	} 
	if(Cfg[37] == 2) setInterval(showNewPosts, 30000);
}

// Upload new created posts
function showNewPosts() {
	var tNode = $x('.//div[@class="thread"]');
	loadajax(opNum, function() {
		var count = $X('.//span[@id="'+getId('postcounter')+'"]', tNode).snapshotLength + 1;
		for(var i = count; i < thrds[opNum].keys.length; i++) {
			var pnum = thrds[opNum].keys[i],
				newpost = makeNode('table');
			newpost.className = 'loadedpost';
			newpost.id = 'post_' + pnum;
			newpost.innerHTML = '<tbody><tr><td class="doubledash">&lt;&lt;</td><td class="reply" style="width:auto" id="reply'+pnum+'">'+thrds[opNum][pnum]+'</td></tr></tbody>';
			if(Cfg[37] == 1) tNode.insertBefore(newpost, $id(getId('newposts_btn')));
			else {if(chan == '0chan') tNode.insertBefore(newpost, $x('.//span[@style="float: right;"]', tNode));
				else tNode.appendChild(newpost)}
			addPostFunc(newpost, pnum, i);
			if(i == thrds[opNum].keys.length - 1) storeHiddenPosts();
		}
	});
	if(Cfg[37] == 1) $id(getId('newposts_btn')).innerHTML = '[<em><a>Новые посты:</a></em> 0]';
}

//---------------------------------Expand images---------------------------------

function expandImg(img) {
	with(img)
		style.display = 'none',
		removeEventListener('click', expandImgHandle, false);
	var thumbn = $x('.//span[@class="thumbnailmsg"]', img.parentNode);
	if(thumbn) thumbn.textContent = 'Показан полный размер, уменьшение по клику';
	var fullimg = makeNode('img');
	with(fullimg) {
		className = 'thumb_full';
		src = $x('ancestor::*[@target="_blank"]', img).href;
		if(browzer == 'Firefox') border = '0';
		style.display = 'block';
		addEventListener('click', collapseImgHandle, false);
	}
	img.parentNode.appendChild(fullimg);
}

function collapseImg(fullimg) {
	var img = $x('.//img[@class="thumb"]', fullimg.parentNode);
	removeNode(fullimg);
	with(img)
		style.display = 'inline',
		addEventListener('click', expandImgHandle, false);
	var thumbn = $x('.//span[@class="thumbnailmsg"]', img.parentNode);
	if(thumbn) thumbn.textContent = 'Показана уменьшенная копия, оригинал по клику.';
}

function expandImgHandle(e){e.preventDefault(); expandImg(e.target)}
function collapseImgHandle(e){e.preventDefault(); collapseImg(e.target)}

// Expand by click on single image
function imageHandling(pNode) {
	var img = $x('.//img[@class="thumb"]', pNode);
	if(img) img.addEventListener('click', expandImgHandle, false);
}

// Expand all images
var expimgmode = false;
function expandAllImages() {
	if(!expimgmode) {
		$id(getId('expandall')).innerHTML = '[<a>Свернуть изображения</a>] ';
		forEachReply(function(pNode) {
			var img = $x('.//img[@class="thumb"]', pNode);
			if(img && !$x('.//img[@class="thumb_full"]', pNode)) expandImg(img);
		});
	} else {
		$id(getId('expandall')).innerHTML = '[<a>Раскрыть изображения</a>] ';
		forEachReply(function(pNode) {
			var img = $x('.//img[@class="thumb_full"]', pNode);
			if(img) collapseImg(img);
		});
	}
	expimgmode = !expimgmode;
}

//-------------------------Collect hidden posts in blocks------------------------

function collectHiddenPosts(pNode, pNum) {
	if(getVisibility(pNum) == HIDE) {
		hDivs++;
		if(hDivs == 1) {
			var hDiv = makeNode('div');
			hDiv.id = getId('hiddenblock', pNum),
			hDiv.style.display = 'none';
			pNode.parentNode.insertBefore(hDiv, pNode);
			var btn = makeNode('span');
			with(btn)
				style.display = 'block',
				id = getId('hiddenblock_msg', pNum),
				addEventListener('click', function(){togglehideBlock(pNode, pNum)}, false);
			pNode.parentNode.insertBefore(btn, hDiv);
		}
		if(!hDiv) var hDiv = prevObject(pNode);
		hDiv.appendChild(pNode);
		if(!nextObject(hDiv) || getVisibility(nextObject(hDiv).id.match(/\d+/)) == UNHIDE)
			prevObject(hDiv).innerHTML = unescape('%u25B2') + '[<em><a>Скрыто:</a> ' + hDiv.childNodes.length + '</em>]';
	} else hDivs = 0;
}

function togglehideBlock(pNode, pNum) {
	var hDiv = $id(getId('hiddenblock', pNum)),
		len = '[<em><a>Скрыто:</a> ' + hDiv.childNodes.length + '</em>]';
	with(hDiv.style) {
		prevObject(hDiv).innerHTML = (display == 'none') ? unescape('%u25BC')+len : unescape('%u25B2')+len;
		display = (display == 'none') ?'block':'none';
	}
}


//------------------------------Create map of answers----------------------------

function addAnswers(links) {
	if(links.snapshotLength > 0)
	for(var link, j = 0; link = links.snapshotItem(j); j++) {
		var pNum = link.textContent.match(/\d+/),
			pNode = $x('.//table[contains(@id,"'+pNum+'")]', delform) || $x('.//div[contains(@id,"'+pNum+'") and not(@class="thread")]', delform);
		if(!pNode || !getPost(link)) continue;
		var lNum = getPost(link).id.match(/\d+/),
			adiv = $id(getId('answersdiv', pNum));
		if(!adiv) {
			var adiv = makeNode('div'), tNode = getThread(pNode);
			adiv.id = getId('answersdiv', pNum);
			adiv.style.cssText = 'font-size:small;font-style:italic';
			adiv.innerHTML = '<br>Ответы: ';
			getPostMsg(pNode).parentNode.appendChild(adiv);
		}
		var answ = link.cloneNode(true);
		answ.href = (chan != 'dobrochan') ?answ.href.replace(/#\d+/ig, '#'+lNum):answ.href.replace(/#i\d+/ig, '#i'+lNum);
		answ.setAttribute('onclick', answ.getAttribute('onclick').replace(pNum, lNum));
		answ.textContent = answ.textContent.replace(pNum, lNum);
		adiv.appendChild(answ);
		appendPreview(answ);
	}
}

function showAnswers() {
	var links = $X('.//a[starts-with(text(),">>")]');
	addAnswers(links);
}

function showPostAnswers(pNode) {
	var links = $X('.//a[starts-with(text(),">>")]', pNode);
	addAnswers(links);
}

//-------------------Cascade posts preview by links like >>1549967---------------

function makePostPrewievClone(e) {
	if(chan == '0chan') {
		removeNode($x('.//div[starts-with(@id,"preview")]'));
		e.preventDefault();
		e.stopPropagation();
	}
	var linkNum = this.textContent.match(/\d+/),
		tNum = this.pathname.substring(this.pathname.lastIndexOf('/')).match(/\d+/);
	var old = $id(getId('postprewiev', linkNum));
	if(old) removeNode(old);
	var clone = makeNode('div');
	with(clone) 
		style.borderColor = 'grey',
		className = 'reply',
		id = getId('postprewiev', linkNum);
	// if target is existing post
	var post = $x('.//table[contains(@id,"'+linkNum+'")]', delform) || $x('.//div[contains(@id,"'+linkNum+'") and not(@class="thread")]', delform);
	if(post) {
		var post_td = $x('.//td[@class="reply"]', post);
		if(post_td) {
			clone.appendChild(post_td.cloneNode(true));
			$x('.//td[@class="reply"]', clone).removeAttribute('class');
			if(getVisibility(linkNum) == HIDE) modPostVisibility(clone, linkNum, UNHIDE);
		} else clone.appendChild(post.cloneNode(true));
	}
	// else - get ajax loading
	if(!clone.firstChild)
		loadajax(tNum, function(error) {
			if(!error && !thrds[tNum][linkNum]) {
				clone.textContent = 'Пост не найден...';
			} else if(error) {
				clone.innerHTML = error;
			} else {
				clone.innerHTML = thrds[tNum][linkNum];
				addPostLinksPreview(clone);
				imageHandling(clone, linkNum);
			}
		});
	if(chan == 'wakachan') clone.style.width = 'auto';
	// put clone in document, according to screen size
	var x = getCoord(this,'offsetLeft'),
		y = getCoord(this,'offsetTop')+16;
	with(clone.style) {
		position = "absolute";
		zIndex = "900";
		borderStyle = "solid";
		borderWidth = "1px";
		if(x < document.body.clientWidth/2) {left = x + 'px'; top = y + 'px'}
		else {right = document.body.clientWidth - x - 80 + 'px'; top = y + 'px'}
	}
	delform.parentNode.insertBefore(clone, delform);
	addPostLinksPreview(clone);
	imageHandling(clone, linkNum);
	// remove clones
	clone.addEventListener('mouseout', function(e) {
		if(!$x('ancestor-or-self::*[starts-with(@id,"DESU_postprewiev")]', e.relatedTarget))
			removePostPreviewClones();
		else {
			var thisclone = $x('ancestor-or-self::*[starts-with(@id,"DESU_postprewiev")]', e.relatedTarget),
				nextclone = nextObject(thisclone);
			if(thisclone)
				while($x('ancestor-or-self::*[starts-with(@id,"DESU_postprewiev")]', nextclone)) {
					thisclone = nextclone;
					nextclone = nextObject(thisclone);
					removeNode(thisclone);
				}
		}
	}, true);
	clone.addEventListener('click', function(e) {
		if(e.target.tagName != 'IMG') removePostPreviewClones();
	}, true);
}

function removePostPreviewClones() {
	var clones = $X('.//div[starts-with(@id,"DESU_postprewiev")]');
	for(var clone, i = 0; clone = clones.snapshotItem(i); i++)
		removeNode(clone);
}

function addPostLinksPreview(pNode) {
	var textNode = getPostMsg(pNode),
		adiv = $id(getId('answersdiv', pNode.id.match(/\d+/)));
	addLinksPreview(textNode);
	if(adiv) addLinksPreview(adiv);
}

function addLinksPreview(textNode) {
	var links = $X('.//a[starts-with(text(),">>")]', textNode);
	if(links.snapshotLength <= 0) return;
	for(var link, i = 0; link = links.snapshotItem(i); i++)
		appendPreview(link)
}

function appendPreview(link) {
	if(chan == 'dobrochan' && browzer != 'Opera') link.removeAttribute("onmouseover");
	if(chan == 'dobrochan' && browzer == 'Opera') link.onmouseover = '';
	link.addEventListener('mouseover', makePostPrewievClone, false);
	link.addEventListener('mouseout', function(e) {
		if(!$x('ancestor-or-self::*[starts-with(@id,"DESU_postprewiev")]', e.relatedTarget))
			removePostPreviewClones(); 
	}, true);
	link.addEventListener('click', removePostPreviewClones, false);
}

//=============================================================================
//						Posts and threads hiders
//=============================================================================

function doPostFilters(pNode, pNum) {
	if(Cfg[12] == 1 && Cfg[13] == 0)
		strongHidePosts(pNode, pNum);
	if(Cfg[0] == 1)
		detectWipePosts(pNode, pNum);
	if(Cfg[1] == 1 && chan != 'iichan')
		hideSagePosts(pNode, pNum);
	if(Cfg[2] == 1 && theme_field)
		hideThemePosts(pNode, pNum);
	if(Cfg[3] == 1)
		hideNotextPosts(pNode, pNum);
	if(Cfg[4] == 1)
		hideNoimagePosts(pNode, pNum);
	if(Cfg[5] == 1)
		hideImgSizePosts(pNode, pNum);
	if(Cfg[8] == 1)
		hideMaxtextPosts(pNode, pNum);
	if(Cfg[10] == 1)
		hideByRegexp(pNode, pNum);
}

function hideThread(opNode, tNum) {
	var tNode = getThread(opNode);
	tNode.style.display = 'none';
	var htext = $x('.//span[@class="filetitle"]', tNode);
	if(htext) htext = htext.textContent;
	if(!htext || htext == '') htext = getTextImpl($x('.//blockquote', tNode)).trim().substring(0, 40) + '...';
	var btn = makeNode('span')
	with(btn)
		style.display = 'inline',
		id = 'hiddenthread-' + tNum,
		innerHTML = 'Тред <a>№' + tNum + '</a> скрыт <i>('+ htext +')</i>';
	$x('.//a', btn).addEventListener('click', function(){unhideThread(tNode, tNum)}, false);
	tNode.parentNode.insertBefore(btn, nextObject(tNode));
	storeHiddenThread(tNum, HIDE);
}

function unhideThread (tNode, tNum) {
	tNode.style.display = 'block';
	removeNode($id('hiddenthread-'+tNum));
	storeHiddenThread(tNum, UNHIDE);
}

function prevHidden(e){modPostVisibility(getPost(this), getPost(this).id.match(/\d+/), UNHIDE)}
function unprevHidden(e){modPostVisibility(getPost(this), getPost(this).id.match(/\d+/), HIDE)}

function togglePostVisibility(pNode, pNum) {
	var vis = getVisibility(pNum);
	vis = (vis == UNHIDE) ?HIDE:UNHIDE;
	setPostVisibility(pNode, pNum, vis);
}

function setPostVisibility(pNode, pNum, vis) {
	var btn = $x('.//span[@id="'+getId('posthider', pNum)+'"]', pNode),
		reflink = $x('.//span[@class="reflink"]', pNode);
	if(vis == HIDE) {
		btn.style.cssText = 'padding-left: 18px; ' + pic_unhide + ' cursor:pointer;';
		if(Cfg[14] == 1) {
			reflink.addEventListener('mouseover', prevHidden, false);
			reflink.addEventListener('mouseout', unprevHidden, false);
		}
	} else {
		btn.style.cssText = 'padding-left: 18px; ' + pic_hide + ' cursor:pointer;';
		if(Cfg[14] == 1) {
			reflink.removeEventListener('mouseover', prevHidden, false);
			reflink.removeEventListener('mouseout', unprevHidden, false);
		}
	}
	modPostVisibility(pNode, pNum, vis);
	setVisibilityCheap(pNum, vis);
}

function hidePosts(pNode, pNum, note) {
	var notice = $id(getId('notice', pNum));
	if(notice) removeNode(notice);
	if(getVisibility(pNum) != HIDE)
		makeNotice(pNode, pNum, ' autohide: ' + note + ' ');
	setVisibilityCheap(pNum, HIDE);
}

function unhidePosts(pNode, pNum) {
	if(detectWipe(pNode, pNum) != null) return;
	setPostVisibility(pNode, pNum, UNHIDE);
	removeNode($id(getId('notice', pNum)));
	detectWipePosts(pNode, pNum);
}

function storeHiddenPosts() {
	forEachReply(function(pNode, pNum) {
		if(getVisibility(pNum) == HIDE)
			setPostVisibility(pNode, pNum, HIDE);
	});
	storePostsVisibility();
}

function strongHidePosts(pNode, pNum)
	{pNode.style.display = (getVisibility(pNum) == HIDE && (Cfg[12] == 1 || Cfg[13] == 1)) ?'none':'block'}

function toggleStrongHide() {
	toggleCfg(12);
	if(Cfg[13] == 0) forEachReply(strongHidePosts);
}

function hideSagePosts(pNode, pNum)
	{if(isSagePost(pNode)) hidePosts(pNode, pNum, 'sage')}

function toggleSage() {
	toggleCfg(1);
	if(Cfg[1] == 1) forEachReply(hideSagePosts);
	else forEachReply(function(pNode, pNum) {
			if(isSagePost(pNode)) unhidePosts(pNode, pNum)});
	storeHiddenPosts();
}

function hideNotextPosts(pNode, pNum)
	{if(isNoText(pNode, pNum)) hidePosts(pNode, pNum, 'no text')}

function toggleNotext() {
	toggleCfg(3);
	if(Cfg[3] == 1) forEachReply(hideNotextPosts);
	else forEachReply(function(pNode, pNum) {
			if(isNoText(pNode, pNum)) unhidePosts(pNode, pNum)});
	storeHiddenPosts();
}

function hideNoimagePosts(pNode, pNum)
	{if(!$x('.//img[@class="thumb"]', pNode)) hidePosts(pNode, pNum, 'no image')}
	
function toggleNoimage() {
	toggleCfg(4);
	if(Cfg[4] == 1) forEachReply(hideNoimagePosts);
	else forEachReply(function(pNode, pNum) {
			if(!$x('.//img[@class="thumb"]', pNode)) unhidePosts(pNode, pNum)});
	storeHiddenPosts();
}

function hideThemePosts(pNode, pNum) {
	if(chan != '0chan' && $x('.//span[@class="replytitle"]', pNode).textContent == '') return;
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
			if(messages[pNum].replace(/\n/g, '').length >= parseInt(Cfg[9]))
			unhidePosts(pNode, pNum)});
	storeHiddenPosts();
}

function hideMaxtextPosts(pNode, pNum) {
	var len = messages[pNum].replace(/\n/g, '').length;
	if(len >= parseInt(Cfg[9]))
		hidePosts(pNode, pNum, 'text n=' + len + ' > max');
}

//--------------------------Hide posts by expressions--------------------------

function toggleRegexp() {
	var field = $id(getId('regexp_field'));
	if(field.value == '') {
		$id(getId('regexp_hider')).checked = false;
		saveCfg(10, 0);
		saveCfg(11, '');
		return;
	}
	toggleCfg(10);
	saveCfg(11, field.value.trim().replace(/\n/g, '::').replace(/[()?|"]/g, '').toLowerCase());
	if(Cfg[10] == 1) forEachReply(function(pNode, pNum){
			var exp = hideByRegexp(pNode, pNum);
			if(exp != null) hidePosts(pNode, pNum, 'match: ' + exp + '..');
		})
	else forEachReply(function(pNode, pNum){
			var exp = hideByRegexp(pNode, pNum);
			if(exp != null) unhidePosts(pNode, pNum)
		})
	storeHiddenPosts();
}

function hideByRegexp(pNode, pNum) {
	var field = $id(getId('regexp_field')),
		expr = Cfg[11].split('::'),
		pname = $x('.//span[@class="commentpostername"]', pNode),
		ptrip = $x('.//span[@class="postertrip"]', pNode);
	for(var i = 0; i < expr.length; ++i) {
		var nm = expr[i].split('!')[0],
			tr = expr[i].split('!')[1];
		if(messages[pNum].replace(/\s/g, '').replace(/[()?|"]/g, '').toLowerCase().match(expr[i].replace(/\s/g, '')) || (pname && nm != '' && pname.textContent.replace(/[()?|"]/g, '').toLowerCase().match(nm)) || (ptrip && tr != '' && ptrip.textContent.replace(/[()?|"]/g, '').toLowerCase().match(tr)) || (expr[i] == '!alltrip' && ptrip))
		return expr[i].substring(0,40);
	}
	return null;
}

//---------------------------Hide posts by image weight------------------------

function toggleImgSize() {
	var field = $id(getId('imgsize_field'));
	if(isNaN(field.value)) {
		saveCfg(5, 0);
		alert('введите размер в кб');
		return;
	}
	toggleCfg(5);
	saveCfg(7, parseInt(field.value));
	if(Cfg[5] == 1) forEachReply(hideImgSizePosts);
	else forEachReply(function(pNode, pNum) {
			if(!$x('.//img[@class="thumb"]', pNode)) return;
			var w = parseInt(Cfg[7]);
			if((Cfg[6] == 0 && getImageWeight(pNode) < w) || (Cfg[6] == 1 && getImageWeight(pNode) > w) || (Cfg[6] == 2 && (getImageWeight(pNode) <= w + 5) && (getImageWeight(pNode) >= w - 5)))
				unhidePosts(pNode, pNum);
		});
	storeHiddenPosts();
}

function hideImgSizePosts(pNode, pNum) {
	if(!$x('.//img[@class="thumb"]', pNode)) return;
	var w = parseInt(Cfg[7]);
	if(Cfg[6] == 0 && getImageWeight(pNode) < w)
		hidePosts(pNode, pNum, 'image < ' + w + 'kb');
	if(Cfg[6] == 1 && getImageWeight(pNode) > w)
		hidePosts(pNode, pNum, 'image > ' + w + 'kb');
	if(Cfg[6] == 2 && (getImageWeight(pNode) <= w + 5) && (getImageWeight(pNode) >= w - 5))
		hidePosts(pNode, pNum, 'image ~' + w + 'kb');
}

function getImageWeight(pNode) {
	var weight = 0;
	if(source == 'wakaba') weight = parseInt($x('.//em', pNode).textContent.split(',')[0]);
	if(chan == '0chan') {
		var imginfo = $x('.//span[@class="filesize"]', pNode).textContent.split('(')[1].split(',')[0];
		if(imginfo.split('.')[1]) weight = parseInt(imginfo.split('.')[0]) + parseInt(imginfo.split('.')[1].match(/\d+/))*0.01;
		if(imginfo.match('MB')) weight = weight*1000;
	}
	if(chan == 'dobrochan') {
		var imginfo = $x('.//em', pNode).textContent.split(',')[1];
		var weight = parseInt(imginfo.split('.')[0].match(/\d+/)) + parseInt(imginfo.split('.')[1].match(/\d+/))*0.01;
	}
	return weight;
}

//-------------------------Hide posts with similar text------------------------

function hideSameTextPosts(pNode, pNum) {
	if(isNoText(pNode, pNum))  {
		toggleNotext();
		toggleCheck($id(getId('notext_hider')))
		return;
	}
	origWords = messages[pNum].replace(/\s+/g, ' ').replace(/[-.,!@#$%^&*()_+={}:\"'<\/?]/g, '').substring(0,1000).split(' ');
	origpNum = pNum;
	origVis = getVisibility(pNum);
	forEachReply(searchSameText);
	storeHiddenPosts();
}

function searchSameText(pNode, pNum) {
	var words = messages[pNum].replace(/\s+/g, ' ').replace(/[-.,!@#$%^&*()_+={}:\"'<\/?]/g, '').substring(0,1000).split(' '),
		origLen = origWords.length;
	if(words.length > origLen*2.5 || words.length < origLen*0.5) return;
	var matchCount = 0;
	for(var i = 0; i < origWords.length; ++i) {
		if(origWords.length > 6 && origWords[i].length < 3) {origLen--; continue}
		for(var j = 0; j < words.length; ++j)
			if((words[j] == origWords[i]) || (origWords[i].substring(0,2) == '>>' && words[j].substring(0,2) == '>>')) matchCount++;
	}
	if(matchCount >= origLen*0.5 && words.length < origLen*2.5) {
		removeNode($id(getId('notice', pNum)));
		if(origVis == UNHIDE) {
			makeNotice(pNode, pNum, ' same text as >>'+origpNum);
			setVisibilityCheap(pNum, HIDE);
		} else unhidePosts(pNode, pNum);
	}
}

//-------------------------Hide posts with similar images----------------------

function hideSameImagePosts(pNode, pNum) {
	var img = $x('.//img[@class="thumb"]', pNode);
	if(!img) {
		toggleNoimage();
		toggleCheck($id(getId('noimage_hider')))
		return;
	}
	var iw = img.width, ih = img.height,
		can = makeNode('canvas'),
		cn = can.getContext('2d');
	origpNum = pNum;
	origVis = getVisibility(pNum);
	can.width = iw;
	can.height = ih;
	cn.drawImage(img,0,0);
	iData = cn.getImageData(0,0,iw,ih).data;
	for(var i = 0; i < ih; i+=10)
		for(var j = 0; j < iw; j+=10) {
			var n = (i*4)*iw+(j*4);
			var mix = (iData[n]+iData[n+1]+iData[n+2])*0.3333;
			iData[n] = mix;
			iData[n+1] = mix;
			iData[n+2] = mix;
		}
	forEachReply(searchSameImages);
	storeHiddenPosts();
}

function searchSameImages(pNode, pNum) {
	var img = $x('.//img[@class="thumb"]', pNode);
	if(!img) return;
	var iw = img.width, ih = img.height,
		matchCount = 0, count = 0,
		can = makeNode('canvas'),
		cn = can.getContext('2d');
	can.width = iw;
	can.height = ih;
	cn.drawImage(img,0,0);
	sData = cn.getImageData(0,0,iw,ih).data;
	for(var i = 0; i < ih; i+=10)
		for(var j = 0; j < iw; j+=10) {
			var n = (i*4)*iw+(j*4);
			var mix = (sData[n]+sData[n+1]+sData[n+2])*0.3333;
			if(iData[n] <= mix+10 && iData[n] >= mix-10) matchCount++;
			count++;
		}
	if(matchCount/count >= 0.4) {
		removeNode($id(getId('notice', pNum)));
		if(origVis == UNHIDE) {
			makeNotice(pNode, pNum, ' image as >>'+origpNum+' ('+parseInt(matchCount/count*100)+'%)');
			setVisibilityCheap(pNum, HIDE);
		} else unhidePosts(pNode, pNum);
	}
}


//=============================================================================
//							Initialization
//=============================================================================

function initBoard() {
	if(navigator.appName == 'Opera') browzer = 'Opera';
	else if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1) browzer = 'Chrome';
		else browzer = 'Firefox';
	if(browzer == 'Firefox') saves = 'GM';
	else if((typeof localStorage === 'object') && (localStorage != null)) saves = 'localst';
		else saves = 'cookie';
	if(location.host.indexOf('2-ch.ru') != -1) {chan = '2-ch'; source = 'wakaba'}
	if(location.host.indexOf('iichan.ru') != -1) {chan = 'iichan'; source = 'wakaba'}
	if(location.host.indexOf('wakachan.org') != -1) {chan = 'wakachan'; source = 'wakaba'}
	if(location.host.indexOf('0chan.ru') != -1) {chan = '0chan'; source = 'kusaba'}
	if(location.host.indexOf('dobrochan.ru') != -1) {chan = 'dobrochan'; source = 'hanabira'}
	if(location.pathname.indexOf('/res/') != -1) mode = 'thread';
	else mode = 'main';
	var url = location.pathname.substr(1).split('/');
	board = url[0];
	if(chan == '2-ch' && board == 'o') throw 'stop';
	if(chan == 'iichan' && board == 'o') throw 'stop';
	if(mode == 'thread') opNum = url[2].split('.')[0];
	if(chan != 'dobrochan') delform = $id('delform');
	else delform = $x('.//form[contains(@action, "delete")]');
	postform = $id('postform');
	captcha = $x('.//input[@name="captcha"]');
	submit_btn = $x('.//input[@type="submit"]');
	logo = $x('.//div[@class="logo"]');
	board_rules = $x('.//div[@class="rules"]') || $x('.//td[@class="rules"]');
	del_passw = $X('.//input[@type="password"]').snapshotItem(1);
	name_field = email_field = video_field = pass_field = undefined;
	if(chan == '2-ch') {
		name_field = $x('.//input[@name="akane"]');
		email_field = $x('.//input[@name="nabiki"]');
		theme_field = $x('.//input[@name="kasumi"]');
		message_field = $x('.//textarea[@name="shampoo"]');
		file_field = $x('.//input[@name="file"]');
		pass_field = $x('.//input[@name="password"]');
	}
	if(chan == '0chan') {
		name_field = $x('.//input[@name="name"]');
		email_field = $x('.//input[@name="em"]');
		theme_field = $x('.//input[@name="subject"]');
		message_field = $x('.//textarea[@name="message"]');
		file_field = $x('.//input[@name="imagefile"]');
		video_field = $x('.//input[@name="embed"]');
		pass_field = $x('.//input[@name="postpassword"]');
	}
	if(chan == 'iichan') {
		name_field = $x('.//input[@name="nya1"]');
		email_field = $x('.//input[@name="nya2"]');
		theme_field = $x('.//input[@name="nya3"]');
		message_field = $x('.//textarea[@name="nya4"]');
		file_field = $x('.//input[@name="file"]');
		pass_field = $x('.//input[@name="password"]');
	}
	if(chan == 'dobrochan') {
		name_field = $x('.//input[@name="name"]');
		email_field = $x('.//input[@name="sage"]');
		theme_field = $x('.//input[@name="subject"]');
		message_field = $x('.//textarea[@name="message"]');
		file_field = $x('.//input[@name="file_1"]');
		pass_field = $x('.//input[@name="password"]');
	}
	if(chan == 'wakachan') {
		name_field = $x('.//input[@name="field1"]');
		email_field = $x('.//input[@name="dont_bump"]');
		theme_field = $x('.//input[@name="field3"]');
		message_field = $x('.//textarea[@name="field4"]');
		file_field = $x('.//input[@name="file"]');
	}
}

//-------------------------------Threads Extraction----------------------------

function initBoardThreads() {
	threads = new Array();
	if(chan == '2-ch' || chan == 'wakachan') {
		if(chan == 'wakachan')
			for(var pps = delform.getElementsByTagName('P'), pp, i = 0; pp = pps[i]; i++)
				if(pp.textContent == '') removeNode(pp);
		var lastnode = delform.getElementsByTagName('TABLE'),
			lastnode = lastnode[lastnode.length - 1],
			tnum = 0;
		threads[tnum] = makeNode('div');
		delform.insertBefore(threads[tnum], delform.firstChild);
		for(var nodes = delform.childNodes, node, i = 0; node = nodes[i]; i++) {
			if(node.tagName == 'LABEL') {
				threads[tnum].id = 'thread_' + node.firstChild.value;
				threads[tnum].className = 'thread';
				continue;
			}
			var nextnode = nextObject(node);
			if((node.tagName == 'BR') && (nextnode.tagName == 'HR') && (nextObject(nextObject(nextnode)) != lastnode)) {
				tnum++;
				threads[tnum] = makeNode('div');
				delform.insertBefore(threads[tnum], nextObject(nextnode));
			}
		}
		tnum = 0;
		var nodelist = new Array();
		for(var nodes = delform.childNodes, node, i = 0; node = nodes[i]; i++) {
			if(node == lastnode) break;
			if((node.tagName == 'BR') && (nextObject(node).tagName == 'HR')) continue;
			if((node.tagName == 'HR') && (prevObject(node).tagName == 'BR')) continue;
			if(node == threads[tnum]) tnum++;
			nodelist.push(node);
		}
		tnum = -1;
		for(var node, i = 0; node = nodelist[i]; i++) {
			if(node != threads[tnum + 1]) {
				threads[tnum].appendChild(node);
				continue;
			}
			if(node == threads[tnum + 1]) tnum++;
		}
	} else {
		if(nodes = $X('./div[starts-with(@id, "thread")]', delform))
			for(var node, i = 0; node = nodes.snapshotItem(i); i++) {
				node.id = 'thread_' + node.id.match(/\d+/);
				threads[i] = node;
				threads[i].className = 'thread';
		}
	}
}

//-------------------------------Replies Extraction----------------------------

function initBoardPosts() {
	if(source == 'wakaba') {
		// updating replypost tables, like <table id="post_1632475" class="replypost">
		var replyposts = $X('.//td[@class="reply"]', delform);
		for(var replypost, i = 0; replypost = replyposts.snapshotItem(i); i++) {
			replypost.style.width = 'auto';
			with($x('./ancestor::table', replypost))
				className = 'replypost',
				id = 'post_' + replypost.id.match(/\d+/);
		}
		// make oppost divs, like <div id="post_1632475" class="oppost">
		var rr = 1;
		if(chan == 'iichan') rr = 0;
		for(var i = 0; i < threads.length - rr; i++) {
			var thread = threads[i], opdiv = makeNode('div'), nodelist = new Array();
			opdiv.className = 'oppost';
			opdiv.id = 'post_' + thread.id.match(/\d+/);
			thread.insertBefore(opdiv, thread.firstChild);
			for(var nodes = thread.childNodes, node, j = 1; node = nodes[j]; j++) {
				if(node.tagName == 'TABLE') break;
				nodelist.push(node);
			}
			for(var node, j = 0; node = nodelist[j]; j++)
				opdiv.appendChild(node);
		}
		posts = $X('.//table[@class="replypost"]', delform);
		opposts = $X('.//div[@class="oppost"]', delform);
	}

	if(chan == '0chan') {
		// updating replypost divs, like <div id="post_1632475" class="postnode">
		var allposts = $X('.//div[@class="postnode"]');
		for(var post, i = 0; post = allposts.snapshotItem(i); i++) {
			var reply = $x('.//td[@class="reply"]', post);
			if(reply) post.id = 'post_' + reply.id.match(/\d+/);
			else post.id = 'oppost_' + post.parentNode.id.match(/\d+/);
		}
		posts = $X('.//div[starts-with(@id,"post")]');
		opposts = $X('.//div[starts-with(@id,"oppost")]');
	}

	if(chan == 'dobrochan') {
		posts = $X('.//table[starts-with(@class,"replypost")]');
		opposts = $X('.//div[starts-with(@class,"oppost")]');
	}
}


//=============================================================================
//								MAIN
//=============================================================================

Cfg = new Array();
expires = new Array();
messages = new Array();
visibility = new Array();
hiddenThrds = new Array();
postCounter = new Array();
startTime = (new Date()).getTime();
HIDE = 1; UNHIDE = 0;
hDivs = 0;
initBoard();
initBoardThreads();
initBoardPosts();
readHiddenThreads();
readPostsVisibility();
initConfig();
addControls();
modifyReplyForm();
addTextFormatPanel();
if(Cfg[38] == 1) submitCheck();
if(email_field) addSageMan();
forAllReplies(readMessages);
forAllReplies(addPostButtons);
forEachReply(doPostFilters);
storeHiddenPosts();
if(Cfg[13] == 1 && mode == 'thread')
	forEachReply(collectHiddenPosts);
if(Cfg[15] == 1)
	showAnswers();
if(Cfg[23] == 1 && source == 'wakaba')
	forAllReplies(imageHandling);
if(Cfg[24] == 1 && mode == 'main' && (chan == '2-ch' || chan == 'iichan'))
	forAllReplies(expandPosts);
if(Cfg[25] == 1 && chan == '2-ch')
	forAllReplies(noOverflow);
if(Cfg[26] == 1)
	forAllReplies(addPostLinksPreview);
if(mode == 'thread')
	addNewPostsButton();
if(Cfg[28] == 1)
	forAllReplies(makeMP3);
if(Cfg[27] == 1)
	forAllReplies(makeYouTube);

// get total script processing time
with(confdiv.appendChild(makeNode('span')))
	innerHTML = 'script processing: '+((new Date()).getTime()-startTime).toString()+' ms',
	style.cssText = 'font-style:italic;cursor:default';
}