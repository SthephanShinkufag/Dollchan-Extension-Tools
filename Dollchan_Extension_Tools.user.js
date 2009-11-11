// Dollchan Extension Tools
// 11.11.09 version, Stephan Shinkufag @ Free Dollchan
// Copyright (C) 2084, Bender Bending Rodríguez
// To install for Firefox, you need Greasemonkey: http://greasemonkey.mozdev.org/
// For Opera, just go to 'Edit site preferences' context menu -> 'Scripting', and set the path to this script
// Praise the Goddess!
// ==UserScript==
// @name			Dollchan Extension Tools
// @namespace		Free Dollchan
// @description	Doing some extended profit for anonymous imageboards
// @include		*0chan.ru*
// @include		*2-ch.ru*
// @include		*iichan.ru*
// @include		*dobrochan.ru*
// @include		*02-ch.ru*
// @include		*02ch.su*
// ==/UserScript==

var defaultOptions = [
	0,			// 0. 	antisage_hider
	0,			// 1. 	notext_hider
	0,			// 2. 	noimage_hider
	0,			// 3. 	maxtext_hider
	500,		// 4. 	maxtext_value
	0,			// 5.	empty
	0,			// 6.	collect_hidden
	0,			// 7. 	strong_hide
	1,			// 8. 	add_samepost_hider_button
	1,			// 9. 	clone_captcha
	1,			// 10. 	hidden_posts_prewiev
	1,			// 11. 	remove_board_rules
	1,			// 12.	add_quick_reply_button
	0,			// 13. 	group_notextposts
	1,			// 14. 	add_sage_marker
	1,			// 15. 	make_youtube
	0,			// 16. 	empty
	1,			// 17. 	image handling
	0,			// 18. 	spoilers_fastview
	1,			// 19. 	postlink_preview
	1,			// 20. 	empty
	1,			// 21. 	all_wipe_detectors
	0,			// 22.	empty
	8,			// 23.	Option_Panel_x_coordinate
	160,		// 24.	Option_Panel_y_coordinate
	550,		// 25.	message_field_x_size
	140,		// 26.	message_field_y_size
	0,			// 27.	move_postfrom
	'',			// 28.	regexp_value
];

//===================================================================================
// 						Viaibility and storage functions
//===================================================================================

function setCookie(cookieName, cookieValue, lifeTime)
{
	if(!cookieName) return;
	if(lifeTime == 'delete') lifeTime = -10;
	else lifeTime = 86400; //24h lifetime
	document.cookie = escape(cookieName) + '=' + escape(cookieValue) + ';expires=' + (new Date((new Date()).getTime() + (1000 * lifeTime))).toGMTString() + ';path=/';
}

function getCookie(cookieName, oDefault)
{
	var cookieJar = document.cookie.split('; ');
	for(var x = 0; x < cookieJar.length; x++) {
		var oneCookie = cookieJar[x].split('=');
		if(oneCookie[0] == escape(cookieName)) {
			try { eval('var footm = "'+unescape( oneCookie[1] )+'"'); }
			catch(e) { return oDefault; }
			return footm;
		}
	}
	return oDefault;
}

// For Opera: storing post visibilities for each thread in separate cookies
// There are 30 cookie marks for Opera. We need to delete old cookie
function turnCookies(cookieName)
{
	var turnData = getCookie (gensym('Cookies'));
	if(!turnData) turnData = cookieName + '|';
	else turnData += cookieName + '|';
	var entries = turnData.split('|');
	entries.pop();
	if(entries.length > 15) {
		turnData = '';
		setCookie(entries[0], '', 'delete');
		entries[0] = '';
		for(var i = 1; i < entries.length; i++)
			turnData += entries[i] + '|';
	}
	setCookie(gensym('Cookies'), turnData);
}

// Config operations (cookies in Opera and greasemonkey in Firefox)
function getConfigValue(name) {
	if(navigator.appName == 'Opera') return getCookie(name);
	else return GM_getValue(name);
}

function setConfigValue(name, value) {
	if(navigator.appName == 'Opera') setCookie(name, value);
	else GM_setValue(name, value);
}

// Generate uniqual id
function gensym(name, post)
{
	if(!post) post = '';
	if(name == 'Options' || name == 'Cookies' || name == 'HiddenThreads' || name == 'Favorities') return 'DESU_' + name;
	else return 'DESU_' + name + '_' + board + '_' + post;
}

//-----------------------------------Configure Options-------------------------------

// Initialize Main Options (from cookies or from default array)
function setMainOptions()
{
	var storeData = getConfigValue(gensym('Options'));
	if(!storeData) {
		storeData = '';
		for(var i = 0; i < defaultOptions.length; i++)
			storeData += defaultOptions[i] + '|';
		option = defaultOptions;
		setConfigValue(gensym('Options'), storeData);
	} else option = storeData.split('|');
}

// Save current Main Options
function saveOptions(num, value)
{
	var entries = getConfigValue(gensym('Options')).split('|'),
		storeData = '';
	for(var i = 0; i < entries.length; i++) {
		if(i != num) storeData += entries[i] + '|';
		else storeData += value + '|';
	}
	setConfigValue(gensym('Options'), storeData);
}

//-----------------------------Configure post Visibilities---------------------------

function getVisibility(post)
{
	if(navigator.appName == 'Opera') postKey = postCounter[post];
	else postKey = board + post;
	if(postKey in visibility) return visibility[postKey];
	return null;
}

// Firefox greasemonkey storing 1000*60*60*24 = 24h lifetime 
var DELAY = 86400000;

// Reread visibility
function setVisibilityCheap(post, stat)
{
	if(navigator.appName == 'Opera')
		visibility[postCounter[post]] = stat; 
	else {
		visibility[board + post] = stat;
		now = (new Date()).getTime();
		expires[board + post] = now + DELAY;
	}
}

// Firefox: read/store visibility data in one GM stream for all threads
// Opera: read/store visibility data in separate cookies for each thread
function readVisibility()
{
	visibility = new Array();
	if(navigator.appName == 'Opera') {
		if(mode == MODE_THREAD)
			var vs = getConfigValue(gensym('Visibility', oppostNum));
		if(!vs) return;
		var entries = vs.split('I');
		entries.pop();
		for(var i = 0; i < entries.length; i++)
			visibility[i + 2] = entries[i];
	} else {
		var vs = getConfigValue(gensym('Visibility'));
		if(!vs) return;
		var entries = vs.split('I');
		entries.pop();
		now = (new Date()).getTime();
		for(var i = 0; i < entries.length; i++) {
			[postKey,value,exp]=entries[i].split('-');
			if(now < exp) {
				visibility[postKey] = value;
				expires[postKey] = exp;
			}
		}
	}
}

function storeVisibility()
{
	var visbilitytext = '', visibtext = '', storeData = '';
	if(navigator.appName == 'Opera') {
		if(mode == MODE_THREAD) {
			for(var postKey in visibility) {
				visbtext = visibility[postKey] + 'I';
				if(visbtext.length < 5) visbilitytext += visbtext;
			}
			storeData = gensym('Visibility', oppostNum);
			if(!getConfigValue(storeData)) turnCookies(storeData);
		}
	} else {
		for(var postKey in visibility) {
			visbtext = postKey + '-' + visibility[postKey] + '-' + expires[postKey] + 'I';
			if(visbtext.length < 40) visbilitytext += visbtext;
		}
		storeData = gensym('Visibility');
	}
	setConfigValue(storeData, visbilitytext);
}

//-------------------------------Configure hidden threads----------------------------

function storeHiddenThread(threadNum, stat)
{
	var storeData = getConfigValue(gensym('HiddenThreads')),
		thrdkey = board + threadNum;
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
	setConfigValue(gensym('HiddenThreads'), storeData);
}

function readHiddenThreads()
{
	var storeData = getConfigValue(gensym('HiddenThreads'));
	if(!storeData) return;
	var entries = storeData.split('I');
	entries.pop();
	for(var i = 0; i < entries.length; i++) {
		var thrdkey = entries[i];
		hiddenThrds[thrdkey] = HIDE;
	}
	forOPReply(function(postNode, threadNum) {
		if(hiddenThrds[board + threadNum] == HIDE)
			hideThread(getThreadNode(postNode), threadNum);
	});
}

//-----------------------------Configure threads favorities-------------------------

function storeFavorities(postNode, postNum, stat)
{
	var storeData = getConfigValue(gensym('Favorities'));
	if(!storeData) storeData = '';
	var htext = $x('.//span[@class="filetitle"]', postNode).textContent.replace(/[|"]/g, '');
	if(htext == '') htext = getText(postNode).trim().substring(0, 25).replace(/[|"]/g, '').replace(/\n/g, '') + '..';
	var thrdkey = chan + '|' + board + postNum + '|' + htext + '|';
		entries = storeData.split('|');
	if(entries.length/3 > 25) return;
	for(var i = 0; i < parseInt(entries.length/3); i++)
		if(entries[i*3+1] == board + postNum) return;
	if(stat == 1) storeData += thrdkey;
	setConfigValue(gensym('Favorities'), storeData);
}

function removeFavoritiesFromList(node)
{
	var storeData = getConfigValue(gensym('Favorities')),
		thrdkey = $x('.//a', node).textContent.split('/'),
		entries = storeData.split('|');
	storeData = '';
	for(var i = 0; i < parseInt(entries.length/3); i++) {
		if(entries[i*3] == thrdkey[0] && entries[i*3+1] == thrdkey[1]) continue;
		storeData += entries[i*3] + '|' + entries[i*3+1] + '|' + entries[i*3+2] + '|';
	}
	if(storeData == '') node.parentNode.appendChild(document.createTextNode(' [Избранные треды отсутствуют]'))
	removeNode(node);
	setConfigValue(gensym('Favorities'), storeData);
}

//------------------Toggle visibility status of all postnode children----------------

function modChildrenVisib(nodes, vis, style) {
	for (var node, i = 0; node = nodes.snapshotItem(i); i++) {
		if(vis == HIDE) node.style.display = 'none';
		else node.style.display = style;
	}
}

function modPostVisibility(postNode, postNum, vis)
{
	modChildrenVisib($X('.//br', postNode), vis, 'block');
	if(chan != 'dobrochan') {
		modChildrenVisib($X('.//blockquote', postNode), vis, 'block');
		modChildrenVisib($X('.//img[starts-with(@class,"thumb")]', postNode), vis, 'block');
		modChildrenVisib($X('.//span[@class="filesize"]', postNode), vis, 'inline');
	} else {
		modChildrenVisib($X('.//div[@class="postbody"]', postNode), vis, 'block');
		modChildrenVisib($X('.//div[@class="file"]', postNode), vis, 'block');
		modChildrenVisib($X('.//div[@class="fileinfo"]', postNode), vis, 'block');
	}
	// for expanded images, hides original
	if(source == 'wakaba' || chan == '02-ch'){
		if($x('.//img[@class="thumb_full"]', postNode))
			$x('.//img[@class="thumb"]', postNode).style.display = 'none';
	}
	if(source == 'wakaba') {
		var thumbn = $X('.//span[@class="thumbnailmsg"]', postNode);
		if(thumbn) modChildrenVisib(thumbn, vis, 'inline'); 
		// for grouped image-posts
		if($x('self::*[starts-with(@id,"imgpost_")]', postNode))
			compactModeVisibility(postNode, postNum, vis);
	}
}


//===================================================================================
// 								UTILS
//===================================================================================

// Get ANY_UNORDERED_NODE_TYPE by xpath
var $x = function(path,rootNode)
	{ return document.evaluate(path, rootNode || document, null, 8, null).singleNodeValue; };

// Get UNORDERED_NODE_SNAPSHOT_TYPE by xpath
var $X = function(path,rootNode)
	{ return document.evaluate(path, rootNode || document, null, 6, null); };

// Remove selected Node
function removeNode(node) { if(node) node.parentNode.removeChild(node); }

// remove all childnodes
function removeChildren(node)
	{ while(node.hasChildNodes()) node.removeChild(node.firstChild); }

// Get next node
function nextObject(node) {
	do node = node.nextSibling;
	while (node && node.nodeType != 1);
	return node;
}

// Get previous node
function previousObject(node) {
	do node = node.previousSibling;
	while (node && node.nodeType != 1);
	return node;
}

// Increment of array element
function incc(arr, w) {
	if( arr[w] ) arr[w] += 1;
	else arr[w] = 1;
}

// Toggle array element (1/0)
function toggle(arr, w) {
	if(arr[w] == 0) arr[w] = 1;
	else arr[w] = 0;
}

function max(a,b) { return b > a ? b : a; }

function min(a,b) { return b < a ? b : a; }

function truncStr(str) {
	var maxlen = 20;
	return (str.length < maxlen) ? str : str.substr(0, maxlen - 2) + '..';
}

// Trim spaces before and after text
if ('undefined' == typeof String.prototype.trim) {
	String.prototype.trim = function() {
	return this.replace(/^\s+/, '').replace(/\s+$/, '');
	}
}

function createInput(type, value, id, name) {
	var input = document.createElement('input');
	input.type = type;
	if(value) input.value = value;
	if(id) input.id = id;
	if(name) input.name = name;
	return input;
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

var offs = function(a, b) { var c = 0; while(a){c += a[b]; a = a.offsetParent } return c };

//-----------------------------------------LOAD AJAX-------------------------------------

// Parse thread in assotiative array
var thrds = {};
serialize = function(tid, text)
{
	text = text.substring(text.search(/<form[^>]+del/) + text.match(/<form[^>]+del[^>]+>/).toString().length, text.indexOf('class="userdelete"') != -1 ? text.indexOf('class="userdelete"') - 10 : text.indexOf('deletebuttons') - 70).split(/<table[^>]*>/);
	thrds[tid] = {keys: []};
	for (var i = 0; i < text.length; i++) {
		var key = text[i].match(/(?:<input[^\d]+)(\d+)(?:[^>]+>)/)[1];
		thrds[tid].keys.push(parseInt(key));
		thrds[tid][key] = text[i].substring(text[i].indexOf(key), text[i].lastIndexOf('</td') != -1 ? text[i].lastIndexOf('</td') : (text[i].lastIndexOf('</div') != -1 ? text[i].lastIndexOf('</div') + 6 : text[i].lastIndexOf('</blockquote') + 13));
		thrds[tid][key] = thrds[tid][key].substring(thrds[tid][key].indexOf('>') + 1);
	}
}

// ajax loading
loadajax = function(addr, callback)
{
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				serialize(addr, xhr.responseText);
				callback(null);
			} else callback('HTTP ' + xhr.status + ' ' + xhr.statusText);
		}
	};
	xhr.open('GET', '/' + board + '/res/' + addr + '.html', true);
	xhr.send(null);
}


//===================================================================================
// 							Text procesing functions
//===================================================================================

function getPostMsg(postNode) {
	if(source == 'wakaba' || chan == '02-ch') return $x('.//blockquote', postNode);
	if(chan == '0chan') return $x('.//div[@class="postmessage"]', postNode);
	if(chan == 'dobrochan') return $x('.//div[@class="message"]', postNode);
}

// Get text from current post
function getTextImpl(node)
{
	if(node.nodeName == '#text') return node.data;
	if(node.nodeName == 'BR' && chan != 'dobrochan') return '\n';
	var text = '';
	if(node.nodeName == 'P' || node.nodeName == 'BLOCKQUOTE')
		text += '\n';
	for (var i = 0; i < node.childNodes.length; i++ )
		text += getTextImpl(node.childNodes[i]);
	return text;
}

function getText(postNode)
	{ return getTextImpl(getPostMsg(postNode)); }

//-----------------------------------Open spoilers----------------------------------

function openSpoilers(postNode) {
	with(document.getElementsByTagName('head')[0].appendChild(document.createElement('style')))
		type = 'text/css',
		textContent = '.spoiler { background:#999 !important; color:#ccc !important; }';
}

//-------------------------------Formatting text tools------------------------------

function formatText(node, tag1, tag2)
{
	var txtfield = $x('.//textarea', $x('ancestor::form', node));
	if(tag1 == '' && tag2 == '')
		for (var i = 0; i < (txtfield.selectionEnd - txtfield.selectionStart); ++i)
			tag2 += '^H';
	with(txtfield) {
		var text = value.substring(selectionStart, selectionEnd),
			textBeforeSelect = value.substring(0, selectionStart),
			textAfterSelect = value.substring(selectionEnd, value.length);
		if(text == '') {
			text = value;
			textBeforeSelect = '';
			textAfterSelect = '';
		}
		value = textBeforeSelect + tag1 + text + tag2 + textAfterSelect;
	}
}

function boldText(e) { formatText(e.target, '**', '**'); }
function italicText(e) { formatText(e.target, '*', '*'); }
function underlinedText(e) { formatText(e.target, '__', '__'); }
function bolditalicText(e) { formatText(e.target, '**&#173;*', '*&#173;**'); }
function spoilerText(e) { formatText(e.target, '%%', '%%'); }
function strikeText(e) { formatText(e.target, '', ''); }


//===================================================================================
// 								WIPE DETECTORS
//===================================================================================

// Wipe detectors select function
function detectWipe(postNode)
{
	var txt = getText(postNode).trim();
	var detectors = [
		detectWipe_sameLines,
		detectWipe_sameWords,
		detectWipe_specialSymbols,
		detectWipe_longColumn,
		detectWipe_longWords,
		detectWipe_numbers,
		detectWipe_caseSage
	];
	for (var i = 0; i < detectors.length; ++i) {
		var detect = detectors[i](txt);
		if(detect != null) return detect;
	}
	return null;
}

function detectWipePosts(postNode, postNum)
{
	if(getVisibility(postNum) == HIDE || getVisibility(postNum) == UNHIDE) return;
	if(detectWipe(postNode) == null) {
		setVisibilityCheap(postNum, UNHIDE);
		return;
	}
	setVisibilityCheap(postNum, HIDE);
	makeNotice(postNode, ' autohide: ' + detectWipe(postNode), 'notice', postNum);
}

function detectWipe_longColumn(text)
{
	var rows = text.split(/\n/g), shortrows = 0;
	for(var i = 0; i < rows.length; ++i) {
		if(rows[i].length < 9) shortrows++;
		else return null;
	}
	if(rows.length > 45) return 'looong post x'+rows.length;
	if(shortrows > 5) return 'column wipe x' + shortrows;
	return null;
}

function detectWipe_sameLines(text)
{
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
			return 'same line: "' + truncStr(it) + '" x' + count[it];
	}
	return null;
}

function detectWipe_sameWords(text)
{
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
		if(count[it] > mpop){
			mpop = count[it];
			pop = it;
		}
		if(wrds > 25 && count[it] > (wrds / 3.5))
			return 'word: ' + truncStr(it) + ' x' + count[it];
	}
	pop = truncStr(pop);
	if(wrds > 80 && keys <= 20) return 'same words ' + ' total=' + wrds + ', words=' + keys;
	if(wrds / keys > 7) return 'same words ' + pop + ' total=' + wrds + ', words=' + keys;
	return null;
}

function detectWipe_specialSymbols(text)
{
	text = text.replace(/\s/g, '');
	var wholeText = text; 
	text = text.replace(/[0-9A-Za-zА-Яа-я]/g, '').replace(/[.!?]/g, '');
	var specsymText = text;
	var specsym = specsymText.length / wholeText.length;
	if(wholeText.length > 30 && specsym > 0.40)
		return 'special symbols: ' + parseInt(specsym * 100) + '%';
	return null;
}

function detectWipe_longWords(text)
{
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
		return 'long word:' + truncStr(longest);
	if( ((wordsNum > 1) && (wordsNum < 6 ) && (lws > 12)) || (wordsNum >= 6 && lws > 11) )
		return 'long words:' + truncStr(longest);
	return null;
}

function detectWipe_numbers(text)
{
	text.replace(/\s/g, ' ');
	var re = /(>>)(\d+)/ig;
	if(text.match(re)) text = text.replace(re, '');
	var numProcent = (text.length - text.replace(/[0-9]/g, '').length) / text.length;
	if(text.length > 30 && numProcent > 0.4) return 'numbers: '+ parseInt(numProcent * 100)+'%';
}

function detectWipe_caseSage(text)
{
	text = text.replace(/\n/g, ' ').replace(/[-.,!@#$%^&*()_+={}:\\"'\/<>?[]/g, '');
	var words = text.split(' ');
	if(words.length <= 3) return null;
	var wrds = 0, ttl = 0;
	for(var i = 0; i < words.length; ++i ){
		if(words[i].length < 5) continue;
		ttl++;
		word = words[i];
		up = word.toUpperCase();
		lw = word.toLowerCase();
		upc = 0;
		lwc = 0;
		for(var j = 0; j < word.length; ++j){
			if(up.charAt(j) == lw.charAt(j)) continue;
			if(word.charAt(j) == up.charAt(j)) upc++;
			else if (word.charAt(j) == lw.charAt(j)) lwc++;
		}
		if(min(lwc,upc) >= 2 && lwc + upc >= 4) wrds++;
	}
	if(wrds >= 5) return 'cAsEwOrDs x' + wrds;
	return null;
}


//===================================================================================
// 					Insert control elements into board form
//===================================================================================

//-----------------------------Makes main options window-----------------------------
function makeOptionPanel()
{
	var optionPanelWrapper = document.createElement('div');
	optionPanelWrapper.setAttribute('class', 'reply');
	with(optionPanelWrapper.style)
		width = '250px',
		fontSize = 'small',
		position = 'absolute',
		left = option[23] + 'px',
		top = option[24] + 'px',
		zIndex = '250',
		width = 'auto',
		borderStyle = 'solid',
		borderColor = 'grey',
		borderWidth = '1px',
		padding = '2px 2px 2px 2px';

	// For use with moving the box around
	var optionPanelHandle = document.createElement('div');
	with(optionPanelHandle.style)
		width = '100%',
		opacity = '.6',
		background = 'white',
		textAlign = 'center',
		cursor = 'move';
	optionPanelWrapper.appendChild(optionPanelHandle);

	var optionsHeader = document.createElement('div');
	optionsHeader.textContent = 'Dollchan Extension Tools';
	with(optionsHeader.style)
		fontWeight = 'bold',
		fontFamily = 'sans-serif';
	optionPanelHandle.appendChild(optionsHeader);

	var optionPanelForm = document.createElement('form');
	with(optionPanelForm)
		action = window.location.href,
		method = 'get';

	// Toggle the options display
	var optionsDisplayToggleLink = document.createElement('a');
	with(optionsDisplayToggleLink)
		href = '#',
		textContent = 'Показать настройки',
		style.cssFloat = 'left',
		style.marginRight = '1em';
	optionsDisplayToggleLink.addEventListener('click', function(event) {
		if (optionsDiv.style.display == 'none') {
			optionsDiv.style.display = 'block';
			event.target.textContent = 'Скрыть настройки';
		} else {
			optionsDiv.style.display = 'none';
			event.target.textContent = 'Показать настройки';
		}
		event.stopPropagation();
		event.preventDefault();
	}, false);
	optionPanelForm.appendChild(optionsDisplayToggleLink);

	// Create reload button
	var reloadButton = createInput('submit', 'Обновить');
	with(reloadButton)
		style.cssFloat = 'right',
		addEventListener('click', function(event) {
			window.location.reload();
			event.stopPropagation();
			event.preventDefault();
		}, false);
	optionPanelForm.appendChild(reloadButton);

	// Start new div for the options body (hides by default)
	with(optionsDiv = document.createElement('div'))
		style.clear = 'both',
		style.display = 'none';
	optionPanelForm.appendChild(optionsDiv);
	optionPanelWrapper.appendChild(optionPanelForm);

	makeMoveableHandle(optionPanelHandle); // Drag-n-drop
	delform.parentNode.insertBefore(optionPanelWrapper, delform);
}



//--------------------------------Add control elements---------------------------------
function addConfig()
{
	// This creates toggle box for option menu
	optionToggleBox = function(boxId, boxEvent, optioNum, boxIndex, boxTitle) {
		var box = createInput('checkbox', null, boxId);
		if(boxTitle) box.title = boxTitle;
		box.addEventListener('click', function(optn) {return function() { boxEvent(optn); }} (optioNum), false);
		if(option[optioNum] == 1) box.checked = true;
		with(optionsDiv)
			appendChild(box),
			appendChild(document.createTextNode(boxIndex)),
			appendChild(document.createElement('br'));
	}

	// Toggle & save option function
	toggleCfg = function(optioNum) { toggle(option, optioNum); saveOptions(optioNum, option[optioNum]); }

	optionToggleBox(gensym('antiwipe_box'), toggleCfg, 21, ' Анти-вайп детекторы', 
	'Автоматически скрывать нежелательные сообщения');

	if(source != 'wakaba')
	optionToggleBox(gensym('antisage_box'), toggleSage, 0, ' Прятать sage сообщения', 
	'Скрывает все посты, помеченные сажей');
	else
	optionToggleBox(gensym('antisage_box'), toggleSage, 0, ' Прятать сообщения с темой', 
	'Скрывает все посты, содержащие поле "тема"');

	optionToggleBox(gensym('notext_box'), toggleNotext, 1, ' Скрывать сообщения без текста', 
	'Скрывает посты с отсутствующим текстом.');

	optionToggleBox(gensym('noimage_box'), toggleNoimage, 2, ' Скрывать сообщения без картинок', 
	'Все посты без изображений будут скрыты');

	// 'large text hider'
	var box = createInput('checkbox', null, gensym('maxtexthide_box'));
	with(box)
		title = 'Скрывает посты, где количество символов больше указанного значения',
		addEventListener('click', toggleMaxtext, false);
	if(option[3] == 1) box.checked = true;
	var field = createInput('text', option[4], gensym('maxtext_field'));
	with(field)
		size = 4,
		addEventListener('keypress', enterNumbersKey, false),
		addEventListener('keypress', preventEnter, false);
	with(optionsDiv)
		appendChild(box),
		appendChild(field),
		appendChild(document.createTextNode(' Скрывать текст больше max')),
		appendChild(document.createElement('br'));

	// regexp hider
	var link = document.createElement('span');
	with(link)
		textContent = 'Скрытие по regexp',
		setAttribute('style', 'font-style:italic;');
	var field = createInput('text', option[28], gensym('regexp_field'));
	with(field)
		size = 40,
		addEventListener('keypress', preventEnter, false);
	var button = createInput('button', ' hide ');
	with(button)
		title = 'Скрывает все посты с указанной строкой',
		id = gensym('regexp_btn'),
		addEventListener('click', function() {modifyByRegexp();}, false);
	with(optionsDiv)
		appendChild(link),
		appendChild(document.createElement('br')),
		appendChild(field),
		appendChild(button),
		appendChild(document.createElement('br'));

	optionToggleBox(gensym('stronghide_box'), toggleStrongHide, 7, ' Полностью скрывать сообщения', 
	'Не отображать заголовки скрытых постов');

	if(source == 'wakaba')
		optionToggleBox(gensym('collecthidden_box'), toggleCfg, 6, ' Объединять скрытые посты в треде*', 
		'Идущие подряд посты объединяются под одной ссылкой');

	optionToggleBox(gensym('hiddenprewiev_box'), toggleCfg, 10, ' Быстрый просмотр скрытых постов', 
	'Просмотр содержимого скрытых постов по наведению курсора');

	optionToggleBox(gensym('samehider_box'), toggleCfg, 8, ' Кнопки скрытия схожих постов*', 
	'Добавляет кнопку "S" в заголовке каждого поста');

	if(chan == '0chan')
		optionToggleBox(gensym('sagemarker_box'), toggleCfg, 14, ' Отображать сажу*', 
		'Создает индикаторы сажи в заголовке поста');

	optionsDiv.appendChild(document.createElement('hr'));

	if(chan == '2-ch')
	optionToggleBox(gensym('doublecap_box'), toggleCfg, 9, ' Дублировать капчу*', 
	'Загружает дополнительное отображение капчи');

	optionToggleBox(gensym('movepostform_box'), toggleCfg, 27, ' Форма ответа снизу*', 
	'Помещает форму ответа в конец документа');

	if(chan != 'dobrochan')
	optionToggleBox(gensym('quickreply_box'), toggleCfg, 12, ' Кнопки быстрого ответа*', 
	'Добавляет кнопки быстрого ответа в заголовок каждого поста');

	toggleBoardRules = function() {
		toggleCfg(11);
		if(option[11] == 1) board_rules.style.display = 'none';
		else board_rules.removeAttribute('style');
	}
	optionToggleBox(gensym('removerules_box'), toggleBoardRules, 11, ' Не отображать правила борды', 
	'Скрывает правила под формой ответа');

	optionToggleBox(gensym('spoilerview_box'), toggleCfg, 18, ' Раскрывать спойлеры*', 
	'Отображает содержимое спойлеров. Помечает другим цветом');

	optionToggleBox(gensym('postlinkspreview_box'), toggleCfg, 19, ' Просмотр постов по >> ссылкам*', 
	'Отображает искомый пост по наведению курсора на ссылку');

	if(source == 'wakaba' || chan == 'dobrochan')
		optionToggleBox(gensym('youtube_box'), toggleCfg, 15, ' Встроенный просмотр YouTube*', 
		'Осуществляет поиск Youtube ссылок в тексте поста. Добавляет плейер к первой найденной.');

	if(source == 'wakaba' || chan == '02-ch')
		optionToggleBox(gensym('expandimages_box'), toggleCfg, 17, ' Раскрывать изображения в треде*', 
		'Раскрывать полную версию изображения внутри треда');

	if(source == 'wakaba')
	optionToggleBox(gensym('groupposts_box'), toggleCfg, 13, ' Группировать картинки в треде*', 
	'Компактно располагать в галлерею посты без текста');

	// Create 'display hidden posts list' button in reply form
	if(option[9] == 1) {
		var button = createInput('button', ' Скрытое ');
		with(button)
			addEventListener('click', toggleHiddenPostsPreview, false),
			title = 'Отобразить список скрытых постов';
		var row = tbody.insertRow(-1), cell = row.insertCell(-1);
		with(cell)
			setAttribute('valign', 'top'),
			appendChild(button);
		cell = row.insertCell(-1);
		var postsDiv = document.createElement('div');
		postsDiv.id = gensym('hiddensPostsDiv');
		cell.appendChild(postsDiv);
	}
	// Create 'Favorities' button
		var button = createInput('button', 'Избранное');
		with(button)
			addEventListener('click', toggleFavorites, false),
			title = 'Отобразить избранные треды';
		var row = tbody.insertRow(-1), cell = row.insertCell(-1);
		with(cell)
			setAttribute('valign', 'top'),
			appendChild(button);
		cell = row.insertCell(-1);
		var postsDiv = document.createElement('div');
		postsDiv.id = gensym('favoritiesDiv');
		cell.appendChild(postsDiv);
}


//--------------------------Comfortable changes in board form--------------------------

function modifyReplyForm()
{
	if(board == 'b') logo.textContent = 'Куклочан';
	if(option[11] == 1) board_rules.style.display = 'none';
	if(chan == '0chan') goto_box.checked = true;

	//change fields sizes
	if(chan != 'dobrochan') {
		if(name_field) name_field.size = 40;
		if(email_field) email_field.size = 40;
		if(theme_field) theme_field.size = 40;
		if(file_field) file_field.size = 40;
		if(captcha) captcha.size = 40;
		pass_field.size = 40;
		if(video_field) video_field.size = 40;
	}
	// Change color scheme
	if(chan == '2-ch' || chan == '0chan') {
		var tables = $X('.//td[@class="postblock"]', tbody);
		for(var tableindex, i = 0; tableindex = tables.snapshotItem(i); i++)
			tableindex.style.backgroundColor = 'lightgrey';
	}
	//Move postform down
	if(option[27] == 1) {
		var b = delform.parentNode,
			replyhdr = $x('div[@class="theader"]', b),
			postarea = $x('.//div[@class="postarea"]', b);
		postarea && b.insertBefore(postarea.parentNode.removeChild(postarea), delform.nextSibling);
		replyhdr && b.insertBefore(replyhdr.parentNode.removeChild(replyhdr), delform.nextSibling);
	}

	// captcha generator for 2-ch
	getCaptcha = function(repmode, opnum) {
		var newcap = document.createElement('img');
		if(repmode == MODE_THREAD && !opnum) opnum = oppostNum;
		with(newcap) {
			if(repmode == MODE_THREAD) 
				src = '/' + board + '/captcha.pl?key=res' + opnum + '&amp;dummy=' + Math.round(Math.random()*1000);
			else src = '/' + board + '/captcha.pl?key=mainpage&amp;dummy=' + Math.round(Math.random()*1000);
			id = 'imgcaptcha';
			style.display = 'block';
			setAttribute('onclick', 'update_captcha(this)');
		}
		return newcap;
	}

	// change captcha field structure for wakaba
	if(captcha && source == 'wakaba' && chan != '02ch') {
		var cap_td = $x('./ancestor::td', captcha),
			cap_img = undefined;
		if(chan == 'iichan') cap_img = $x('.//img', cap_td);
		if(chan == '2-ch') {
			var cap_div = $x('.//div[@id="captchadiv"]', cap_td);
			if(cap_div) {
				// remove 2-ch captcha scripts, generate new captcha
				captcha.removeAttribute('onfocus', 'show_captcha()');
				removeNode(previousObject(captcha));
				removeNode(cap_div);
				cap_img = getCaptcha(mode)
				cap_td.appendChild(cap_img);
			}
			else cap_img = $x('.//img[@id="imgcaptcha"]', cap_td);
			// additional captcha clone 
			if(option[9] == 1) { 
				cap_td.appendChild(getCaptcha(mode)); 
				cap_td.appendChild(getCaptcha(mode)); 
			}
		}
		cap_img.style.display = 'block';
	}

	// Force english capthca input
	if(captcha && (source == 'wakaba' || chan == '02-ch')) {
		forceCaptcha = function (captext) {
			unicode = captext.charCode || captext.keyCode;
			if(unicode > 1039) {
				captext.preventDefault();
				with(this) {
					var val = value, ss = selectionStart, offset = (unicode < 1072 ? 1040 : 1072),
					chars = ['f', 0, 'd', 'u', 'l', 't', 0, 'p', 'b', 'q', 'r', 'k', 'v', 'y', 'j', 'g', 'h', 'c', 'n', 'e', 'a', 0, 'w', 'x', 'i', 'o', 0, 's', 'm', 0, 0, 'z'];
					value = val.substring(0, ss) + (chars[unicode - offset] || '') + val.substring(selectionEnd);
					selectionStart =  ++ss, selectionEnd = ss;
				}
			}
		};
		captcha.addEventListener ('keypress', forceCaptcha, false);
	}

	// manual resize post message input form
	var resizePostform = function(node) {
		with (node.style) width = option[25] + 'px', height = option[26] + 'px';
		var resizer = node.parentNode.appendChild(document.createElement('img'));
		resizer.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABlBMVEUAAAAAAAClZ7nPAAAAAWJLR0QAiAUdSAAAAAF0Uk5TAEDm2GYAAAAWSURBVHjaY2BAAYyMDMNagBENYAgAABMoAD3fBUDWAAAAAElFTkSuQmCC';
		resizer.id = gensym('resizer');
		var xpos = '14', ypos = '6';
		if(source == 'kusaba') xpos = '19';
		if(navigator.appName == 'Opera') ypos = '9';
		resizer.style.cssText = 'position:relative;left:-' + xpos + 'px;top:' + ypos + 'px;cursor:se-resize';
		var resmove = function(e) {
			node.style.width = e.pageX - offs(node, 'offsetLeft') + 'px';
			node.style.height = e.pageY - offs(node, 'offsetTop') + 'px';
		}, resstop = function() {
			document.body.removeEventListener('mousemove', resmove, false);
			document.body.removeEventListener('mouseup', resstop, false);
			saveOptions(25, parseInt(node.style.width));
			saveOptions(26, parseInt(node.style.height));
		}
		resizer.addEventListener('mousedown', function(e) {
			e.preventDefault();
			document.body.addEventListener('mousemove', resmove, false);
			document.body.addEventListener('mouseup', resstop, false);
		}, false);
	}
	resizePostform(message_field);
}


//---------------------------------Add sage button-------------------------------------

function addSageButton()
{
	var sagebtn = document.createElement('span'),
		mail_tr = email_field.parentNode;
	with(sagebtn)
		innerHTML = '&nbsp;[<a>sage</a>]',
		style.cursor = 'pointer',
		id = 'sagebutton';
	mail_tr.appendChild(sagebtn);
	sagebtn.addEventListener('click', function() { email_field.value = 'sage'; }, false);
}

//-----------------------------Add text format buttons---------------------------------
// how to get base64 data, desu? - see http://web-apps.ru/perl-fw/data-url/

function addTextFormatPanel()
{
	with(textFormatPanel = document.createElement('div'))
		innerHTML = '&nbsp;&nbsp;',
		style.display = 'inline';
	submit_button.parentNode.appendChild(textFormatPanel);

	// Bold
	with(textFormatPanel.appendChild(document.createElement('span')))
		id = gensym('bold_btn'),
		title = 'Жирный',
		style.cssText = 'padding:0 27px 27px 0; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAWCAIAAACkFJBSAAAABGdBTUEAALGPC/xhBQAAAM1JREFUOE9jfPnqDQMDQ2rvPiBJBphd7ATSBTTFr3zVzL23yUNAvSB3aMfNAOr/9u0HeQioF2jC4DclIyMDLaSBIkCA6Wt8PsI0BWIopkGETUHTQ8CUzLmngLGFjCBuAZLIghDnoKkE6oXGETGmYDUXaCJhUzCTMppDyDQFzY/oply9eRcZwd1PUBDFR8SbAvQmsmKEKcAcRbwpQGciKwbqhcYRLlOwFhRo9pFsCporIMbhMwXNQjzcQWgKpMSkBIFKTEiiFrevJg9BtAMAgEe8+CQQO68AAAAASUVORK5CYII=) no-repeat; cursor:pointer;',
		addEventListener('click', boldText, false);

	// Italic button
	with(textFormatPanel.appendChild(document.createElement('span')))
		id = gensym('italic_btn'),
		title = 'Наклонный',
		style.cssText = 'padding:0 27px 27px 0; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAWCAIAAACkFJBSAAAABGdBTUEAALGPC/xhBQAAAKpJREFUOE9jfPnqDQMDQ2rvPiBJBphd7ATSBTTFr3zVzL23yUNAvSB3aMfNAOr/9u0HeQioF2jCkDMlIyMDGIJYvUyCj6hjCp6AR7glc+4pYGzhQhCH4JIF6oXGEc1NgTgESFLkFtJMuXrzLlYEMQWXLFAcJVyoYAowR+FxCNA5eNwC1AuNI/ym4DECKEUvU/C7AiJL2C10NwVSYlKCQCUmJGmL21eThyDaAeHLSs0I3iR3AAAAAElFTkSuQmCC) no-repeat; cursor:pointer;',
		addEventListener('click', italicText, false);

	// Underlined
	with(textFormatPanel.appendChild(document.createElement('span')))
		id = gensym('underlined_btn'),
		title = 'Подчеркнутый',
		style.cssText = 'padding:0 27px 27px 0; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAWCAIAAACkFJBSAAAABGdBTUEAALGPC/xhBQAAAL9JREFUOE9jfPnqDQMDQ2rvPiBJBphd7ATSBTTFr3zVzL23yUNAvSB3aMfNAOr/9u0HeQioF2jC4DdlwYIFwCBD9iOmCEQWn48GzpTMuaeAsYWMMjIyIIkAjjBFIFJAvdA4GpamXL15FxlBQgEYU3BBiAiaMiAXJVywmgLUCQHwXIrPFGCOwpRG1gx0FCQFYSoD6oXGEVZTMDVgFaGxKQTLKmRH0dgtRIYIRBnULZASkxIEKjEhmUrcvpo8BNEOAA46Am9hpFKYAAAAAElFTkSuQmCC) no-repeat; cursor:pointer;',
		addEventListener('click', underlinedText, false);

	// Bold italic
	with(textFormatPanel.appendChild(document.createElement('span')))
		id = gensym('bolditalic_btn'),
		title = 'Наклонный жирный',
		style.cssText = 'padding:0 27px 27px 0; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAWCAIAAACkFJBSAAAABGdBTUEAALGPC/xhBQAAAOZJREFUOE9jfPnqDQMDQ2rvPiBJBphd7ATSBTTFr3zVzL23yUNAvSB3aMfNAOr/9u0HeQioF2jCIDcFLYwzwADZv0AFcBGcPsIaU8gGEWsKUA8w5OEIYi7cOdhNyZx7Cq4BqB8S/ZimQETQFAD1QuMIvykQbXDXkWAKZgCj+Q7Oxe4WXEGLbApyqKGYcvXmXQiCOB7OBTLgPsKqgFhTIEYDAQFTgDkKogJiLbJD0NyCqQCoFxpHaKZgDRpc1hBlCiT5w11HlFvQ/EIMF4tbiNGGpoaqpkBKTEoQqMSEJEpx+2ryEEQ7AOgKmSs1zYWeAAAAAElFTkSuQmCC) no-repeat; cursor:pointer;',
		addEventListener('click', bolditalicText, false);

	// Strike
	with(textFormatPanel.appendChild(document.createElement('span')))
		id = gensym('strike_btn'),
		title = 'Зачеркнутый',
		style.cssText = 'padding:0 27px 27px 0; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAWCAIAAACkFJBSAAAABGdBTUEAALGPC/xhBQAAAORJREFUOE9jfPnqDQMDQ2rvPiBJBphd7ATSBTTFr3zVzL23yUNAvSB3aMfNAOr/9u0HeQioF2jCUDElIyMDHt5ANlYvE/ARZnxhNQifKRBXAElg+EMQXATNRQhTMueegquGMCAOIUYQqBcaR5imYLoFzUQ4F4spQM1wgByuyOJwNsQgfG6BhwU8mohyy9Wbd/EguAcx1aC4BVka4hc0DVgFgWoQpgBzFLIeTJvxuAWoFxpHaKYATcRMcr6+vli9jM8UoAa05I8r1AiYgj+84bKD0BRIiUkJAuU7SKIUt68mD0G0AwA1n+fssh1aWAAAAABJRU5ErkJggg==) no-repeat; cursor:pointer;',
		addEventListener('click', strikeText, false);

	// Spoiler
	with(textFormatPanel.appendChild(document.createElement('span')))
		id = gensym('spoiler_btn'),
		title = 'Спойлер',
		style.cssText = 'padding:0 27px 27px 0; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAWCAIAAACkFJBSAAAABGdBTUEAALGPC/xhBQAAAJFJREFUOE9jfPnqDQMDQ2rvPiBJBphd7ATSBTTFr3zVzL23yUNAvSB3aMfNAOr/9u0HeQioF2jCMDeFpDiChCOWcMkgBaCbkjn3FDC2gIgUQzIgWoB6oXE0LE25evMuEJEULhAtKOECESIpptFNAeYoiBAZCKgXGkejpiAHH1XDBVJiUoJAJSYkU4nbV5OHINoBJeuil9LmYj8AAAAASUVORK5CYII=) no-repeat; cursor:pointer;',
		addEventListener('click', spoilerText, false);
}


//--------------------Makes preview of hidden posts under reply form-------------------

function toggleHiddenPostsPreview()
{
	var preview = document.getElementById(gensym('hiddensPostsDiv'));
	if(preview.hasChildNodes()) {
		removeChildren(preview);
		return;
	}
	var table = document.createElement('table');
	table.setAttribute('align', 'left');
	preview.appendChild(table);
	var clones = new Array(), nums = new Array(), copied = 0;
	forEachReply( function(postNode, postNum) {
		if(getVisibility(postNum) != HIDE || copied > 10) return;
		clones[clones.length] = postNode;
		nums[nums.length] = postNum;
	});

	// create hidden posts clones
	for(var i = 0; i < clones.length; ++i) {
		copied++;
		var postNum = nums[i], postNode = clones[i], clone = postNode.cloneNode(true);
		clones[i] = clone;
		clone.id = '';
		clone.PostNum = postNum;;
		clone.Original = postNode;
		clone.Visibility = HIDE;
		clone.setAttribute('align', 'left');
		var button = $x('.//span[starts-with(@id,"DESU_posthider")]', clone);
		button.addEventListener('click', function(postNode) { return function() {
			if(postNode.Visibility == HIDE) postNode.Visibility = UNHIDE;
			else postNode.Visibility = HIDE;
			modPostVisibility(postNode, postNum, postNode.Visibility);
		}}(clone), false);
		table.insertRow(-1).appendChild(clone);
	};

	var cell = table.insertRow(-1).insertCell(-1);
	// create Apply button
	var button = createInput('button', 'Сохранить изменения');
	var applyHiddenList = function() {
		for(var i = 0; i < clones.length; ++i) {
			if(clones[i].Visibility == HIDE) continue;
			var clone = clones[i];
			togglePostVisibility(clone.Original, clone.PostNum);
			if(!$x('self::*[starts-with(@id,"imgpost_")]', clone.Original))
				clone.Original.style.display = 'block';
			else clone.Original.style.display = 'inline';
			storeHiddenPosts();
		}
		removeChildren(preview);
	}
	button.addEventListener('click', applyHiddenList, false);
	cell.appendChild(button);
	// create Cancel button
	button = createInput('button', 'Отмена');
	button.addEventListener('click', function() { removeChildren(preview); }, false);
	cell.appendChild(button);
}


//-------------------------Makes preview of 'Favorities' list--------------------------

function toggleFavorites()
{
	var favorList = document.getElementById(gensym('favoritiesDiv'));
	if(favorList.hasChildNodes()) {
		removeChildren(favorList);
		return;
	}
	var entries = getConfigValue(gensym('Favorities'));
	if(entries) entries = entries.split('|');
	else {
		favorList.appendChild(document.createTextNode(' [Избранные треды отсутствуют]'))
		return;
	}
	entries.pop();
	var table = document.createElement('table');
	table.setAttribute('align', 'left');
	favorList.appendChild(table);
	for(var i = 0; i < entries.length/3; i++) {
		var getchan = entries[i*3] + '.ru',
			linkfull = 'http://www.' + getchan +'/' + entries[i*3+1].match(/[a-z]+/) + '/res/' + entries[i*3+1].match(/\d+/) + '.html',
			linkshort = entries[i*3] + '/' + entries[i*3+1],
			favorNote = document.createElement('span'),
			removeNote = document.createElement('span');
		with(removeNote) {
			title = 'Убрать запись';
			style.cssText = 'padding-left: 18px; vertical-align: middle;' + pic_hide + ' cursor:pointer;';
			addEventListener('click', function(node) {return function() {
				removeFavoritiesFromList(node);
			}} (favorNote), false);
		}
		favorNote.innerHTML = '<a href="' + linkfull + '">' + linkshort + '</a> - ' + entries[i*3+2];
		favorNote.insertBefore(removeNote, $x('.//a', favorNote));
		table.insertRow(-1).appendChild(favorNote);
	}
}


//------------------------------------Makes Quick Reply--------------------------------

var lastForm = undefined;
var storedtext = undefined;
function quickReply(postNode, postNum)
{
	// remove old reply forms
	if(lastForm) {
		storedtext = $x('.//textarea', lastForm).value;
		if(nextObject(postNode) == lastForm) {
			removeNode(lastForm);
			lastForm = undefined;
			return;
		} else removeNode(lastForm);
	}
	// create clone of reply form
	var threadNode = getThreadNode(postNode),
		threadNum = threadNode.id.match(/\d+/),
		QRForm = postform.cloneNode(true);
	QRForm.className = 'reply';
	// remove some elements
	removeNode($x('.//img[@id="' + gensym('resizer') + '"]', QRForm));
	var hplist = $x('.//div[@id="' + gensym('hiddensPostsDiv') + '"]', QRForm);
	removeNode($x('./ancestor::tr', hplist));
	hplist = $x('.//div[@id="' + gensym('favoritiesDiv') + '"]', QRForm);
	removeNode($x('./ancestor::tr', hplist));
	// append text formatting buttons
	$x('.//span[@id="' + gensym('bold_btn') + '"]', QRForm).addEventListener('click', boldText, false);
	$x('.//span[@id="' + gensym('italic_btn') + '"]', QRForm).addEventListener('click', italicText, false);
	$x('.//span[@id="' + gensym('underlined_btn') + '"]', QRForm).addEventListener('click', underlinedText, false);
	$x('.//span[@id="' + gensym('bolditalic_btn') + '"]', QRForm).addEventListener('click', bolditalicText, false);
	$x('.//span[@id="' + gensym('spoiler_btn') + '"]', QRForm).addEventListener('click', spoilerText, false);
	$x('.//span[@id="' + gensym('strike_btn') + '"]', QRForm).addEventListener('click', strikeText, false);
	// append sage button
	if(email_field && source != 'kusaba')
		$x('.//span[@id="sagebutton"]', QRForm).addEventListener('click', function(e) {
			$x('.//input', e.target.parentNode.parentNode).value = 'sage';
		}, false);
	// captcha update
	var cap = $x('.//input[@name="captcha"]', QRForm),
		cap_tr = cap.parentNode;
	if(source == 'wakaba' && cap)
		cap.addEventListener('keypress', forceCaptcha, false);
	if(source == 'kusaba' && captcha) captcha.value = ' ';
	// rebuild reply form to current thread
	if(mode == MODE_MAIN) {
		if(source == 'wakaba') {
			var inp = createInput('hidden', threadNum, null, 'parent'),
				trap = $x('.//div[@class="trap"]', QRForm);
			if(!trap) trap = $x('.//input[@name="name"]', QRForm);
			if(!trap) trap = $x('.//input[@name="akane"]', QRForm);
			QRForm.insertBefore(inp, trap);
			var pst = $X('.//table[@class="replypost"]', threadNode),
				lastpstNum = pst.snapshotItem(pst.snapshotLength - 1).id.match(/\d+/);
			if(chan == '2-ch') { 
				var cap_img = $X('.//img[@id="imgcaptcha"]', QRForm); 
				removeNode(cap_img.snapshotItem(0)); 
				removeNode(cap_img.snapshotItem(1)); 
				removeNode(cap_img.snapshotItem(2)); 
				cap_tr.appendChild(getCaptcha(MODE_THREAD, threadNum)); 
				if(option[9] == 1) { 
					cap_tr.appendChild(getCaptcha(MODE_THREAD, threadNum)); 
					cap_tr.appendChild(getCaptcha(MODE_THREAD, threadNum)); 
				} 
			}
			if(chan == '02ch') {
				var cap_img = $x('.//img[@id="imgcaptcha"]', QRForm);
				cap_img.src = '/' + board + '/captcha.pl?key=res' + threadNum + '&amp;dummy=' + lastpstNum;
			}
			if(chan == 'iichan') {
				var cap_img = $x('.//img', cap.parentNode);
				cap_img.src = '/cgi-bin/captcha.pl/' + board + '/?key=res' + threadNum + '&amp;dummy=' + lastpstNum;
			}
		}
		if(source == 'kusaba') {
			$x('.//input[@name="replythread"]', QRForm).value = threadNum;
			$x('.//span[@id="posttypeindicator"]', QRForm).textContent = 'ответ на ' + threadNum;
			if(chan == '0chan')
				$x('.//img[@id="captchaimage"]', QRForm).src = 'http://www.0chan.ru/captcha.php?' + Math.random();
			if(chan == '02-ch')
				removeNode($x('./ancestor::tr', cap));
		}
	}
	// restore message text
	var cloneTxt = $x('.//textarea', QRForm);
	if(!storedtext) {
		var txt = message_field.value;
		if(txt == '') txt = '>>' + postNum + '\n'; 
		else txt += '\n>>' + postNum + '\n';
		cloneTxt.value = txt;
	} else cloneTxt.value = storedtext + '\n>>' + postNum +'\n';
	
	lastForm = QRForm;
	postNode.parentNode.insertBefore(QRForm, nextObject(postNode));
}


//------------------------This makes element is movable by mouse-----------------------

function makeMoveableHandle(element)
{
	// Tracking variable for the element to be moved. The parent of the clicked handle.
	var moveableElement = null, dragXoffset = 0, dragYoffset = 0;
	element.addEventListener('mousedown', function(event) {
		moveableElement = element.parentNode;
		dragHandler(event);
		event.stopPropagation();
		event.preventDefault();
	}, false);
	function dragHandler(e) {
		if (e == null) { e = window.event; htype='move';} 
		dragXoffset = e.clientX - parseInt(moveableElement.style.left);
		dragYoffset = e.clientY - parseInt(moveableElement.style.top);
		document.addEventListener('mousemove', moveHandler, false);
		document.addEventListener('mouseup', cleanup, false);
	}
	function moveHandler(e) {
		if (e == null) { e = window.event; }
		if (e.button == 0) {
			moveableElement.style.left = e.clientX - dragXoffset + 'px';
			moveableElement.style.top = e.clientY - dragYoffset + 'px';
			saveOptions(23, parseInt(moveableElement.style.left));
			saveOptions(24, parseInt(moveableElement.style.top));
		}
	}
	function cleanup(e) {
		document.removeEventListener('mousemove', moveHandler, false);
		document.removeEventListener('mouseup', cleanup, false);
	}
}


//===================================================================================
//						For each reply and thread changes
//===================================================================================

function getThreadNode(postNode)
	{ return $x('./ancestor::div[starts-with(@id,"thread")]', postNode); }

function getPostHeader(postNode) {
	if(chan != 'dobrochan') return $x('.//span[@class="reflink"]', postNode); 
	else return $x('.//span[@class="cpanel"]', postNode);
}

function isSagePost(postNode) {
	if(chan == '0chan' && !$x('.//span[@class="postername"]/a[@href="mailto:sage"]', postNode)) return false;
	if(chan == '02-ch'&& !$x('.//span[@class="sage"]', postNode)) return false;
	if(chan == 'dobrochan' && !$x('.//img[@alt="Сажа"]', postNode)) return false;
	if(source == 'wakaba') {
		var sage = $x('.//span[@class="replytitle"]', postNode).textContent.toUpperCase();
		if(!sage) return false;
	}
	return true;
}

function isNoText(postNode) {
	if(length = getText(postNode).trim().replace(/\s/g, '').replace(/\n/g, '').length <= 2) return true;
	return false;
}

// For each reply function
postCounter = new Array();
function forEachReply(lambda) {
	for(var postNode, i = 0; postNode = posts.snapshotItem(i); i++) {
		var postNum = postNode.id.match(/\d+/);
		postCounter[postNum] = i + 2;
		lambda(postNode, postNum, i + 2);
	}
}

// For OP thread reply function
function forOPReply(lambda) {
	for(var postNode, i = 0; postNode = opposts.snapshotItem(i); i++) {
		var postNum = postNode.id.match(/\d+/);
		lambda(postNode, postNum, i);
	}
}

// Makes notice in postheader
function makeNotice(node, text, id, postNum)
{
	var link = document.createElement('a');
	if(id) link.id = gensym(id, postNum);
	link.setAttribute('style', 'font-size:12px;font-style:italic;');
	link.appendChild(document.createTextNode(text));
	link.addEventListener('click', function(lnk) {return function() { removeNode(lnk);}} (link), false);
	getPostHeader(node).appendChild(link);
}

// Inject 'hide thread' button
function injectHideThreadButton (postNode, threadNum)
{
	var button = document.createElement('span');
	with(button) {
		id = gensym('threadhider', threadNum);
		title = 'Скрыть тред';
		style.cssText = 'padding-left: 18px;' + pic_hide + ' cursor:pointer;';
		button.addEventListener('click', function(node, num) {return function() {
			hideThread(node, num);
			storeHiddenThread(num, HIDE);
		}} (getThreadNode(postNode), threadNum), false);
	}
	getPostHeader(postNode).appendChild(button);
}

// Inject 'add to Favorities' button
function injectFavoritiesButton(postNode, postNum)
{
	var button = document.createElement('span');
	with(button) {
		id = gensym('favor', postNum);
		title = 'В избранное';
		style.cssText = 'padding-left: 14px; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAIAAABbdmkjAAAABGdBTUEAALGPC/xhBQAAAI5JREFUKFONkdENgCAMRHE+lmAU1nAbF2EWfXimNIVE7odreT0gHK21tCnQc0M9sdbKcjlp0HcAwDoaODZ0lO+v0fvVAi2lMGEiT6gONYElodoWEQwlwEBxRgejrIGq4B2eo7TrRXQOXqA5Z4vEI43RxH8XkLM9lXOHflKeps3PnQ8NH+s/SR6go1p+BfYAG+p+3Ck9Qp0AAAAASUVORK5CYII=) no-repeat; cursor:pointer;';
		addEventListener('click', function(node, num, stat) {return function() {
				storeFavorities(node, num, stat);
		}} (postNode, postNum, 1), false);
	}
	getPostHeader(postNode).appendChild(button);
}

// Inject 'hide current post' button
pic_hide = 'background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAIAAABbdmkjAAAABGdBTUEAALGPC/xhBQAAAJBJREFUKFOVkdENhTAMA2E+lugoXeNt8xbpLOWCKxOQQMU/xORiUrq21pZJgf4mFIm1Vh7/VwGABWqM9DyS7QWl0Xv3JAXWdKClFLwaEvXNAoANNNNshjymMw9UMQhviAKbW5H6GWVGH80LOOhcwBzodsinFB0ob70o7RyTLVig+u1Pt6vuQGcuNlA4LfcusB2ItHUivwhxeAAAAABJRU5ErkJggg==) no-repeat;'; //[x]
pic_unhide = 'background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAIAAABbdmkjAAAABGdBTUEAALGPC/xhBQAAAIlJREFUKFOVkYENgCAQA3U+lnAU1nAbF2EWvbekKhrFJgYoR3mfsZQydAp07lAk5pwZllcBgAXaYNOuxrygqgKIDMREjs4EasvouuvuH6juRUa1dESghOteQSrAcwP/UQU/FsCWdmuq1rJcq82KppQay806+2ADnzrn1z3/uPta0Z6HDRSO4VNgG/gLYoyrXrWyAAAAAElFTkSuQmCC) no-repeat;'; //[+]
function injectHidePostButton(postNode, postNum)
{
	var button = document.createElement('span');
	with(button) {
		id = gensym('posthider', postNum);
		title = 'Скрыть пост';
		style.cssText = 'padding-left: 18px;' + pic_hide + ' cursor:pointer;';
		addEventListener('click', function(node, num) {return function() {
			togglePostVisibility(node, num);
			storeVisibility();
		}} (postNode, postNum), false);
	}
	if(chan == 'dobrochan') getPostHeader(postNode).innerHTML += '&nbsp;';
	getPostHeader(postNode).appendChild(button);
}

// [S] Inject 'hide same posts' button
function injectHideSamePostButton(postNode, postNum)
{
	var button = document.createElement('span');
	with(button) {
		id = gensym('samehider', postNum);
		title = 'Скрыть схожие посты';
		style.cssText = 'padding-left: 18px; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAIAAABbdmkjAAAABGdBTUEAALGPC/xhBQAAAIpJREFUKFOVktENgCAMRHE+Pl2AUbqG27gIs+g1J5eiRPESxdjX66W61FrTpIBuE3JHM9snBGyArk3RoUOZAtjRxBY2OFpKUVRxhNCCO6vAfqIwp57T8Yaly1Wc5jKtuAHKckysgXdXmY1dc84xQNyULPEALOHi5rRXZtAGWe3Q96/rKP4DHJ8CdgIJOVdVHew+CQAAAABJRU5ErkJggg==) no-repeat; cursor:pointer;';
		addEventListener('click', function(node, num) {return function() {
			hideSamePosts(node, num);
		}} (postNode, postNum), false);
	}
	getPostHeader(postNode).appendChild(button);
}

// [>] Inject quick reply button
function injectQuickReplyButton(postNode, postNum)
{
	var button = document.createElement('span');
	with(button) {
		id = gensym('quickrep', postNum);
		title = 'Быстрый ответ';
		style.cssText = 'padding-left: 18px; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAIAAABbdmkjAAAABGdBTUEAALGPC/xhBQAAAIpJREFUKFOlkYkNhSAQRP310QSl0Ibd2Ai16FuHjBiPT+IkhF327XD9aq3ToEDnAYVjKYVpeRUAWKDG5H7bdUJJ1l0Efb86A805y8xo3+BbgD2ibhDdUO1IonIvLsS6quH6FcUPpZRsdLiyqq0NmWsHcE5wC8mV6sTwmxOj6zcDNHTkYwPV2f8KbAO08nbYMLcr9QAAAABJRU5ErkJggg==) no-repeat; cursor:pointer;';
		addEventListener('click', function(node, num) {return function() {
			quickReply(node, num);
		}} (postNode, postNum), false);
	}
	getPostHeader(postNode).appendChild(button);
}

// Injects sage marker if post with sage
function createSageMarker(postNode, postNum)
{
	if(!isSagePost(postNode)) return;
	var sageMarker = document.createElement('span');
	with(sageMarker) {
		title = 'SAGE';
		style.cssText = 'padding-left: 14px; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAIAAABbdmkjAAAABGdBTUEAALGPC/xhBQAAAH5JREFUKFONktENgDAIROt8LOEoLsoKzuAR4uVK0fS+AF+eFnu4+9gM0HMjYQR2bQTYhK52Shr0lugLAzUzylAjacpaH1VUrQ2aAkatOg+rplj/0PKtPYpfpsqsMSQ9HavQaD83EMt73cphDndY88gU5OVhy4UM3IOyhLYF9gCsIP/pnODERwAAAABJRU5ErkJggg==) no-repeat;';
		innerHTML = '&nbsp;';
	}
	getPostHeader(postNode).appendChild(sageMarker);
}

// Inject post counter
function createPostCounter(postNode, postNum, pcount)
{
	var postcount = document.createElement('a');
	with(postcount) {
		id = gensym('postcounter');
		appendChild(document.createTextNode(pcount + ' '));
		if(pcount >= 500) setAttribute('style', 'font-size:13px;font-style:italic;font-weight:bold;color:#c41e3a');
		else setAttribute('style', 'font-size:13px;font-style:italic;font-weight:bold;color:#4f7942');
		// additional function - manual decryptiog if post text was encrypted
		addEventListener('click', function(node, num) {return function() {
			DESUdecrypt(node, num);
		}} (postNode, postNum), false);
	}
	getPostHeader(postNode).appendChild(postcount);
}


//---------This makes Youtube prewiev window in posts, if YouTube links detected---------

function makeYouTube(postNode, postNum)
{
	if(getVisibility(postNum) == HIDE) return;
	var text = getText(postNode).trim().replace(/\s/g, ' ').replace(unescape('%uFEFF'), ''),
		words = text.split(' '),
		tubeLink = '';
	// search for Youtube links
	for(var i = 0; i < words.length; ++i) {
		if(words[i].substring(0,23) == 'http://www.youtube.com/') tubeLink = words[i];
		if(words[i].substring(0,16) == 'www.youtube.com/') tubeLink = 'http://' + words[i];
		if(tubeLink != '') break;
	}
	if(tubeLink != '') {
		// http://www.youtube.com/watch?v=oHg5SJYRHA0 -> http://www.youtube.com/v/oHg5SJYRHA0&hl=ru&fs=1&
		tubeLink = 'http://www.youtube.com/v/' + tubeLink.substring(31, tubeLink.length) + '&hl=ru&fs=1&';
		var node = getPostMsg(postNode),
			thumbnailmsg = $x('.//span[@class="thumbnailmsg"]', postNode);
		if(thumbnailmsg) thumbnailmsg.textContent += '. Просмотр YouTube.';
		node.innerHTML = '<object width="320" height="262"><param name="movie" value="' + tubeLink + '"></param><param name="wmode" value="transparent"></param><embed src="' + tubeLink + '" type="application/x-shockwave-flash" wmode="transparent" width="320" height="262"></embed></object><br />' + node.innerHTML;
	}
}

//--------------------------------Expand shorted long posts------------------------------

function expandPosts(postNode, postNum)
{
	var abbrev = $x('.//div[@class="abbrev"]', postNode),
		threadNum = getThreadNode(postNode).id.match(/\d+/);
	if(!abbrev) return;
	var getFullText = function(e) {
		e.preventDefault();
		loadajax(threadNum, function() {
			var txt = thrds[threadNum][postNum],
				txtnode = abbrev.parentNode;
			if(source == 'wakaba' || chan == '02-ch')
				txtnode.innerHTML = txt.substring(txt.indexOf('<blockquote') + 12, txt.lastIndexOf('</blockquote>'));
		});
	}
	$x('.//a', abbrev).addEventListener('click', getFullText, false);
}


//-------------------------Expand images in thread by clicking---------------------------

function imageHandling(postNode, postNum)
{
	var img = $x('.//img[@class="thumb"]', postNode),
		thumbnailmsg = $x('.//span[@class="thumbnailmsg"]', postNode);
	// delete expanded img, unhide normal img
	var collapseImg =  function(e) {
		e.preventDefault();
		removeNode(e.target);
		with(img)
			style.display = 'inline',
			addEventListener('click', expandImg, false);
		if(!$x('self::*[starts-with(@id,"imgpost_")]', postNode) && thumbnailmsg)
			thumbnailmsg.textContent = 'Показана уменьшенная копия, оригинал по клику.';
		else postNode.style.display = 'inline-block';
	}
	// create expanded img, hide normal img
	var expandImg = function(e) {
		e.preventDefault();
		with(img)
			style.display = 'none',
			removeEventListener('click', expandImg, false);
		if(!$x('self::*[starts-with(@id,"imgpost_")]', postNode) && thumbnailmsg)
			thumbnailmsg.textContent = 'Показана полная копия, уменьшение по клику';
		else postNode.style.display = 'block';
		var fullimg = document.createElement('img');
		with(fullimg) {
			className = 'thumb_full';
			src = $x('ancestor::*[@target="_blank"]', img).href;
			if(navigator.appName != 'Opera') border = '0';
			style.display = 'block';
			addEventListener('click', collapseImg, false);
		}
		img.parentNode.appendChild(fullimg);
	}
	if(img) img.addEventListener('click', expandImg, false);
}


//-------------------Thread display method for image-posts without text------------------

function compactMode(postNode, postNum)
{
	var img = $x('.//img[@class="thumb"]', postNode),
		thumbnailmsg = $x('.//span[@class="thumbnailmsg"]', postNode),
		fileinfo = $x('.//span[@class="filesize"]', postNode),
		timeheader = $x('.//label', postNode),
		replytitle = $x('.//span[@class="replytitle"]', postNode);
	if(!isNoText(postNode) || !img) return;
	// cut fileinfo, date, and samehider button
	if(replytitle) replytitle.style.display = 'none';
	if(thumbnailmsg) thumbnailmsg.style.display = 'none';
	if(fileinfo.innerHTML.substring(0,6) == 'Файл: ')
		fileinfo.innerHTML = fileinfo.innerHTML.substring(6);
	var re = /(<\/span>)(.*)/ig,
		ptime = timeheader.innerHTML;
	ptime = ptime.substring(ptime.length - 8, ptime.length);
	timeheader.innerHTML = timeheader.innerHTML.replace(re,'$1') + ptime;
	removeNode(document.getElementById(gensym('samehider', postNum)));
	postNode.id = 'imgpost_' + postNum;
	if(getVisibility(postNum) == UNHIDE) compactStyle(postNode);
}

// Modify grouped image-posts according to their visibility
function compactModeVisibility(postNode, postNum, stat)
{
	var thumbnailmsg = $x('.//span[@class="thumbnailmsg"]', postNode);
	if(thumbnailmsg) thumbnailmsg.style.display = 'none';
	if(stat == HIDE) {
		postNode.setAttribute('style', 'display:block;');
		$x('.//tr', postNode).removeAttribute('style');
		$x('.//td[@class="reply"]', postNode).removeAttribute('style');
		$x('.//td[@class="doubledash"]', postNode).removeAttribute('style');
	}
	else compactStyle(postNode);
}

function compactStyle(postNode)
{
	postNode.setAttribute('style', 'display:inline-block;vertical-align:top;');
	$x('.//tr', postNode).setAttribute('style', 'height:250px;');
	$x('.//td[@class="reply"]', postNode).setAttribute('style', 'vertical-align:top;width:275px;');
	$x('.//td[@class="doubledash"]', postNode).setAttribute('style', 'vertical-align:top;');
}


//-----------------------------Collect hidden posts in blocks----------------------------

var hiddenblocks = 0;
function collectHiddenPosts(postNode, postNum, pcount)
{
	if(getVisibility(postNum) == HIDE) {
		hiddenblocks++;
		if(hiddenblocks == 1) {
			// create common div of hidden threads
			var hiddenblockDiv = document.createElement('div');
			with(hiddenblockDiv)
				id = gensym('hiddenblock', postNum),
				style.display = 'none';
			postNode.parentNode.insertBefore(hiddenblockDiv, postNode);
			// create control message
			var button = document.createElement('span');
			with(button)
				style.display = 'block',
				id = gensym('hiddenblock_msg', postNum),
				addEventListener('click', function(pnode, pnum) {return function() {
					togglehideBlock(pnode, pnum);
				}} (postNode, postNum), false);
			postNode.parentNode.insertBefore(button, hiddenblockDiv);
		}
		// put hidden posts in div
		if(!hiddenblockDiv) var hiddenblockDiv = previousObject(postNode);
		hiddenblockDiv.appendChild(postNode);
		// create hidden posts counter
		if(!nextObject(hiddenblockDiv) || getVisibility(nextObject(hiddenblockDiv).id.match(/\d+/)) == UNHIDE)
			previousObject(hiddenblockDiv).innerHTML = unescape('%u25B2') + '[<em>Скрыто: ' + hiddenblockDiv.childNodes.length + '</em>]';
	}
	else hiddenblocks = 0;
}

function togglehideBlock(postNode, postNum)
{
	var hiddenblockDiv = $x('.//div[@id="' + gensym('hiddenblock', postNum) + '"]');
	with(hiddenblockDiv.style) {
		if(display == 'none') {
			display = 'block';
			previousObject(hiddenblockDiv).innerHTML = unescape('%u25BC') + '[<em>Скрыто: ' + hiddenblockDiv.childNodes.length + '</em>]';
		} else {
			display = 'none';
			previousObject(hiddenblockDiv).innerHTML = unescape('%u25B2') + '[<em>Скрыто: ' + hiddenblockDiv.childNodes.length + '</em>]';
		}
	}
}

//-----------------------Cascade posts preview by links like >>1549967-------------------

function postLinksPrewiev(postNode, postNum, pcount) 
{
	// Main make post preview clone function
	var clonepostPreview = function(e) {
		var linkNum = this.textContent.match(/\d+/),
			addr = this.pathname.substring(this.pathname.lastIndexOf('/')).match(/\d+/);
		// clean duplicate clones
		if($x('.//div[@id="' + gensym('postprewiev', linkNum) + '"]'))
			removeNode($x('.//div[@id="' + gensym('postprewiev', linkNum) + '"]'));
		// create clone
		var clone = document.createElement('div');
		with(clone) 
			style.borderColor = 'grey',
			className = 'reply', // background conforming to CSS color scheme
			id = gensym('postprewiev', linkNum);
		// if target is existing regular post
		for(var post, i = 0; post = posts.snapshotItem(i); i++)
			if(parseInt(post.id.match(/\d+/)) == linkNum && getVisibility(linkNum) == UNHIDE)
				clone.appendChild(post.cloneNode(true));
		// if target is OP-post
		if(!clone.firstChild)
			for(var post, i = 0; post = opposts.snapshotItem(i); i++)
				if(parseInt(post.id.match(/\d+/)) == linkNum)
					clone.appendChild(post.cloneNode(true));
		// if post is not loaded - get ajax loading
		if(!clone.firstChild)
			loadajax(addr, function(error) {
				if(!error && !thrds[addr][linkNum]) {
					clone.textContent = 'Пост не найден...';
				} else if(error) {
					clone.innerHTML = error;
				} else {
					clone.innerHTML = thrds[addr][linkNum];
					addlinkListeners(clone);
					imageHandling(clone, linkNum);
				}
			});
		// put clone in document, according to screen size
		var x = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft,
			y = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop;
		with(clone.style) {
			position = "absolute";
			borderStyle = "solid";
			borderWidth = "1px";
			if(x < document.body.clientWidth / 2)
				{ left = x + 'px'; top = y + 'px'; }
			else { right = document.body.clientWidth - x + 'px'; top = y + 'px'; }
		}
		delform.parentNode.insertBefore(clone, delform);
		addlinkListeners(clone);
		imageHandling(clone, linkNum);
		// add event listener to clear clone node if cursor moving out or clicking in
		clone.addEventListener('mouseout', function(e) {
			if(!$x('ancestor-or-self::*[starts-with(@id,"DESU_postprewiev")]', e.relatedTarget))
				removeAllPreviewClones(); 
		}, true);
		clone.addEventListener('click', function(e) {
			if(e.target.tagName != 'IMG')
				removeAllPreviewClones(); // exclude image handling
		}, true);
	};

	// add event listeners to founded postlinks
	var addlinkListeners = function(node) {
		var textNode = getPostMsg(node);
		for(var links = $X('.//a[starts-with(text(),">>")]', textNode), link, i = 0; link = links.snapshotItem(i); i++) {
			link.addEventListener('mouseover', clonepostPreview, false);
			link.addEventListener('mouseout', function(e) {
				if(!$x('ancestor-or-self::*[starts-with(@id,"DESU_postprewiev")]', e.relatedTarget))
					removeAllPreviewClones(); 
			}, true);
			link.addEventListener('click', removeAllPreviewClones, false);
		}

	}
	addlinkListeners(postNode);
}

//------------------------------------Hidden posts preview-------------------------------

function hiddenpostPrewiev(e)
{
	if(option[10] == 0) return;
	if(source == 'wakaba' || chan == 'dobrochan' || chan == '02-ch')
		var postNode = $x('./ancestor::table[@class="replypost"]', e.target);
	if(chan == '0chan')
		var postNode = $x('./ancestor::div[@class="postnode"]', e.target);
	if(!postNode) return;
	var threadNum = getThreadNode(postNode).id.match(/\d+/);
	var postNum = postNode.id.match(/\d+/);
	// create clone
	var clone = document.createElement('div');
	with(clone) 
		style.borderColor = 'grey',
		className = 'reply', // background conforming to CSS color scheme
		id = gensym('postprewiev', postNum);
	loadajax(threadNum, function() { clone.innerHTML = thrds[threadNum][postNum]; });
	// put clone in document, according to screen size
	with(clone.style) {
		position = "absolute";
		borderStyle = "solid";
		borderWidth = "1px";
		left = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft + 5 + 'px';
		top = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop + 5 + 'px';
	}
	delform.parentNode.insertBefore(clone, delform);
	postNode.addEventListener('mouseout', removeAllPreviewClones, false);
	postNode.addEventListener('click', removeAllPreviewClones, false);
};

function removeAllPreviewClones() {
	var clones = $X('.//div[starts-with(@id,"DESU_postprewiev")]');
	for(var clone, i = 0; clone = clones.snapshotItem(i); i++)
		removeNode(clone);
}


//===================================================================================
// 							Posts and threads hiders
//===================================================================================

//----------------------Hide thread and create 'unhide thread' link------------------

function hideThread (threadNode, threadNum)
{
	threadNode.style.display = 'none';
	var htext = $x('.//span[@class="filetitle"]', threadNode).textContent;
	if(htext == '') htext = getTextImpl($x('.//blockquote', threadNode)).substring(0, 35) + '...';
	var button = document.createElement('span')
	with(button)
		style.display = 'inline',
		id = 'hiddenthread-' + threadNum,
		innerHTML = 'Тред <a>№' + threadNum + '</a> скрыт <i>('+ htext +')</i>';
	$x('.//a', button).addEventListener('click', function(node, thrd) {return function() {
		unhideThread(node, thrd);
		}} (threadNode, threadNum), false);
	threadNode.parentNode.insertBefore(button, nextObject(threadNode));
}

function unhideThread (threadNode,threadNum)
{
	threadNode.style.display = 'block';
	removeNode(document.getElementById('hiddenthread-' + threadNum));
	storeHiddenThread(threadNum, UNHIDE);
}

//-----------------------------------Hide/unhide post--------------------------------

function togglePostVisibility(postNode, postNum)
{
	var button = document.getElementById(gensym('posthider', postNum)),
		oldStat = getVisibility(postNum), stat = UNHIDE;
	if(oldStat == UNHIDE) {
		stat = HIDE;
		button.style.cssText = 'padding-left: 18px; ' + pic_unhide + ' cursor:pointer;';
		if(option[10] == 1) postNode.addEventListener('mouseover', hiddenpostPrewiev, false);
	} else if(oldStat == HIDE) {
		stat = UNHIDE;
		button.style.cssText = 'padding-left: 18px; ' + pic_hide + ' cursor:pointer;';
		if(option[10] == 1) postNode.removeEventListener('mouseover', hiddenpostPrewiev, false);
	}
	modPostVisibility(postNode, postNum, stat);
	setVisibilityCheap(postNum, stat);
}

function storeHiddenPosts()
{
	forEachReply(function(postNode, postNum) {
		if(getVisibility(postNum) != HIDE) return;
		setVisibilityCheap(postNum, UNHIDE);
		togglePostVisibility(postNode, postNum);
	});
	storeVisibility();
}

function unhidePosts(postNode, postNum)
{
	if(detectWipe(postNode) != null) return;
	setVisibilityCheap(postNum, HIDE);
	togglePostVisibility(postNode, postNum);
	removeNode(document.getElementById(gensym('notice', postNum)));
	detectWipePosts(postNode, postNum);
}

//--------------------------Switch and apply 'Antisage' mode-------------------------

function toggleSage()
{
	toggleCfg(0);
	if(option[0] == 1) forEachReply(hideSagePosts);
	else forEachReply(function(postNode, postNum) {
			if(isSagePost(postNode)) unhidePosts(postNode, postNum);});
	storeHiddenPosts();
}

function hideSagePosts(postNode, postNum)
{
	if(!isSagePost(postNode)) return;
	removeNode(document.getElementById(gensym('notice', postNum)));
	if(getVisibility(postNum) != HIDE)
		makeNotice(postNode, ' autohide: sage ', 'notice', postNum);
	setVisibilityCheap(postNum, HIDE);
}

//--------------------------Switch and apply 'No text' mode--------------------------

function toggleNotext()
{
	toggleCfg(1);
	if(option[1] == 1) forEachReply(hideNotextPosts);
	else forEachReply(function(postNode, postNum) {
		if(!isNoText(postNode)) return;
		unhidePosts(postNode, postNum);
	});
	storeHiddenPosts();
}

function hideNotextPosts(postNode, postNum)
{
	if(!isNoText(postNode)) return;
	removeNode(document.getElementById(gensym('notice', postNum)));
	if(getVisibility(postNum) != HIDE)
		makeNotice(postNode, ' autohide: no text ', 'notice', postNum);
	setVisibilityCheap(postNum,HIDE);
}

//-------------------------Switch and apply 'No image' mode--------------------------

function toggleNoimage()
{
	toggleCfg(2);
	if(option[2] == 1) forEachReply(hideNoimagePosts);
	else forEachReply(function(postNode, postNum) {
			if($x('.//img[@class="thumb"]', postNode)) return;
			unhidePosts(postNode, postNum);
		});
	storeHiddenPosts();
}

function hideNoimagePosts(postNode, postNum)
{
	if($x('.//img[@class="thumb"]', postNode)) return;
	removeNode(document.getElementById(gensym('notice', postNum)));
	if(getVisibility(postNum) != HIDE)
		makeNotice(postNode, ' autohide: no image ', 'notice', postNum);
	setVisibilityCheap(postNum, HIDE);
}

//-------------------------Switch and apply 'Max text' mode--------------------------

function toggleMaxtext()
{
	var field = document.getElementById(gensym('maxtext_field'));
	if(isNaN(field.value)) {
		option[3] = 0;
		saveOptions(3, 0);
		alert('введите число знаков');
		return;
	}
	toggleCfg(3);
	saveOptions(4, field.value);
	if(option[3] == 1) forEachReply(hideMaxtextPosts);
	else forEachReply(function(postNode, postNum) {
			var length = getText(postNode).trim().replace(/\n/g, '').length;
			if(length >= parseInt(document.getElementById(gensym('maxtext_field')).value))
				unhidePosts(postNode, postNum);
		});
	storeHiddenPosts();
}

function hideMaxtextPosts(postNode, postNum)
{
	var length = getText(postNode).trim().replace(/\n/g, '').length;
	if(length  < parseInt(document.getElementById(gensym('maxtext_field')).value)) return;
	removeNode(document.getElementById(gensym('notice', postNum)));
	if(getVisibility(postNum) != HIDE)
		makeNotice(postNode, ' autohide: text n=' + length + ' > max', 'notice', postNum);
	setVisibilityCheap(postNum, HIDE);
}

//---------------------------Switch and apply stronghide mode------------------------

function toggleStrongHide() 
{
	toggleCfg(7);
	if(!(option[6] == 1 && source == 'wakaba'))
		forEachReply(strongHidePosts);
}

function strongHidePosts(postNode, postNum)
{
	with(postNode.style) {
		if(getVisibility(postNum) == HIDE && (option[7] == 1 || (option[6] == 1 && source == 'wakaba')))
			display = 'none';
		else {
			if(option[13] == 1 && mode == MODE_THREAD && $x('self::*[starts-with(@id,"imgpost_")]', postNode))
				display = 'inline';
			else display = 'block';
		}
	}
}

//-------------------Check 'Same Hide button' and hide similar posts-----------------

// Initialize search of similar text
function hideSamePosts(postNode, postNum)
{
	var origText = getText(postNode).trim();
	origText = origText.replace(/\n/g, ' ');
	origText = origText.replace(/[-.,!@#$%^&*()_+={}:\"'<\/?]/g, '');
	origWords = origText.split(' ');
	origpostNum = postNum;
	origvisibility = getVisibility(postNum);
	forEachReply(searchSameText);
	storeHiddenPosts();
}

// Search similar text in other posts and hide them if found
function searchSameText(postNode, postNum)
{
	var similarpost = false;
	compareText = getText(postNode).trim();
	compareText = compareText.replace(/\n/g, ' ');
	compareText = compareText.replace(/[-.,!@#$%^&*()_+={}:\"'<\/?]/g, '');
	var compareWords = compareText.split(' '),
		origwrdsNum = origWords.length;
	if(compareWords.length > origwrdsNum*2.5 || compareWords.length < origwrdsNum*0.5) return;

	var matchedCount = 0;
	for(var i = 0; i < origWords.length; ++i) {
		if(origWords.length > 6 && origWords[i].length < 3) { origwrdsNum--; continue; }
		for(var j = 0; j < compareWords.length; ++j)
			if((compareWords[j] == origWords[i]) || (origWords[i].substring(0,2) == '>>' && compareWords[j].substring(0,2) == '>>')) matchedCount++;
	}
	if(matchedCount >= origwrdsNum*0.5 && compareWords.length < origwrdsNum*2.5)
		similarpost = true;

	if(origWords.length == 1 && compareWords.length == 1 && compareWords[0] != '')
		similarpost = true;

	// Hide/unhide posts with similar text
	if(similarpost) {
		removeNode(document.getElementById(gensym('notice', postNum)));
		if(origvisibility == UNHIDE) {
			makeNotice(postNode, ' same as >>' + origpostNum , 'notice', postNum);
			setVisibilityCheap(postNum, HIDE);
		} else unhidePosts(postNode, postNum);
	}
}

//---------------------------Hide posts by Regexp function---------------------------

function modifyByRegexp()
{   
	var field = document.getElementById(gensym('regexp_field'));
	if(field.value == '') {
		alert('Введите регулярное выражение');
		return;
	}
	saveOptions(28, field.value.replace(/[|"]/g, ''));
	var button = document.getElementById(gensym('regexp_btn'));
	if(oldRegexpStat == UNHIDE) {
		RegexpStat = HIDE;
		button.value=' unhide ';
	} else if(oldRegexpStat == HIDE) {
		RegexpStat = UNHIDE;
		button.value='hide';
	}
	oldRegexpStat = RegexpStat;
	var re = new RegExp(field.value.toUpperCase());
	var functor = function(postNode, postNum) {
		if(getVisibility(postNum) == RegexpStat) return;
		var text = getText(postNode).trim().toUpperCase().replace(/\n/g, ' ');
		if(re.exec(text)) {
			togglePostVisibility(postNode, postNum);
			if(RegexpStat == HIDE)
				makeNotice(postNode, 'regexp matched: ' + field.value, 'notice', postNum);
			else removeNode(document.getElementById(gensym('notice', postNum)));
		}
	};
	forEachReply(functor);
	storeVisibility();
}


//===================================================================================
// 								Initialisation
//===================================================================================

function initBoard()
{
	// Define location, board mode, board elements
	if(location.host.indexOf('2-ch.ru') != -1) { chan = '2-ch'; source = 'wakaba'; }
	if(location.host.indexOf('iichan.ru') != -1) { chan = 'iichan'; source = 'wakaba'; }
	if(location.host.indexOf('0chan.ru') != -1) { chan = '0chan'; source = 'kusaba'; }
	if(location.host.indexOf('dobrochan.ru') != -1) { chan = 'dobrochan'; source = 'hanabira'; }
	if(location.host.indexOf('02-ch.ru') != -1) { chan = '02-ch'; source = 'kusaba'; }
	if(location.host.indexOf('02ch.su') != -1) { chan = '02ch'; source = 'wakaba'; }
	if(document.title == '404 Not Found') {
		window.stop();
		location.replace('http://nyamo.su/?t=http://' + location.host + location.pathname);
	}
	if(location.pathname.indexOf('/res/') != -1)
		mode = MODE_THREAD;
	else mode = MODE_MAIN;
	var url = location.pathname.substr(1).split('/');
	board = url[0];
	if(chan == '2-ch' && board == 'o') throw 'stop';
	if(mode == MODE_THREAD) 
		oppostNum = url[2].split('.')[0];

	if(chan != 'dobrochan') delform = $x('.//form[@id="delform"]');
	else delform = $x('.//form[contains(@action, "delete")]');
	postform = $x('.//form[@id="postform"]');
	tbody = $x('.//tbody', postform);
	captcha = $x('.//input[@name="captcha"]');
	submit_button = $x('.//input[@type="submit"]');
	logo = $x('.//div[@class="logo"]');
	board_rules = $x('.//div[@class="rules"]');
	name_field = undefined;
	email_field = undefined;
	video_field = undefined;
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
		theme_field = $x('.//input[@name="subject"]');
		message_field = $x('.//textarea[@name="message"]');
		file_field = $x('.//input[@name="imagefile"]');
		video_field = $x('.//input[@name="embed"]');
		pass_field = $x('.//input[@name="postpassword"]');
		goto_box = $x('.//input[@id="gotothread"]');
		board_rules = $x('.//td[@class="rules"]');
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
		email_field = $x('.//input[@name="email"]');
		theme_field = $x('.//input[@name="subject"]');
		message_field = $x('.//textarea[@name="message"]');
		file_field = $x('.//input[@name="file_1"]');
		pass_field = $x('.//input[@name="password"]');
	}
	if(chan == '02-ch') {
		email_field = $x('.//input[@name="em"]');
		theme_field = $x('.//input[@name="subject"]');
		message_field = $x('.//textarea[@name="message"]');
		file_field = $x('.//input[@name="imagefile"]');
		video_field = $x('.//input[@name="embed"]');
		pass_field = $x('.//input[@name="postpassword"]');
		board_rules = $x('.//td[@class="rules"]');
	}
	if(chan == '02ch') {
		email_field = $x('.//input[@name="field2"]');
		theme_field = $x('.//input[@name="field3"]');
		message_field = $x('.//textarea[@name="field4"]');
		file_field = $x('.//input[@name="file"]');
		pass_field = $x('.//input[@name="password"]');
	}
}

//-----------------------------------Threads Extraction------------------------------

function initBoardThreads()
{
	var tdiv = new Array();
	if(chan == '2-ch' || chan == '02ch') {
		// this make thread divs like <div class="thread" id="thread_1631821">>
		var lastnode = delform.getElementsByTagName('TABLE'),
			lastnode = lastnode[lastnode.length - 1],
			tnum = 0;
		tdiv[tnum] = document.createElement('div');
		with (delform) insertBefore(tdiv[tnum], firstChild);
		// insert missing thread divs
		for (var nodes = delform.childNodes, node, i = 0; node = nodes[i]; i++) {
			var nextnode = nextObject(node);
			if (node.tagName == 'LABEL') {
				tdiv[tnum].id = 'thread_' + node.firstChild.value;
				tdiv[tnum].className = 'thread';
				continue;
			}
			if((node.tagName == 'BR') && (nextnode.tagName == 'HR') && (nextObject(nextObject(nextnode)) != lastnode)) {
				tnum++;
				tdiv[tnum] = document.createElement('div');
				delform.insertBefore(tdiv[tnum], nextObject(nextnode));
			}
		}
		tnum = 0;
		var nodelist = new Array();
		// find nodes which should be in thread div
		for (var nodes = delform.childNodes, node, i = 0; node = nodes[i]; i++) {
			if((node.tagName == 'BR') && (nextObject(node).tagName == 'HR')) continue;
			if((node.tagName == 'HR') && (previousObject(node).tagName == 'BR')) continue;
			if(node == tdiv[tnum]) {
				tnum++;
				nodelist.push(node);
				continue;
			}
			if(node == lastnode) break;
			nodelist.push(node);
		}
		tnum = -1;
		for (var node, i = 0; node = nodelist[i]; i++) {
			if(node != tdiv[tnum + 1]) {
				tdiv[tnum].appendChild(node);
				continue;
			}
			if(node == tdiv[tnum + 1]) tnum++;
		}
	}

	else {
		//change div to <DIV id="thread_1631821" >
		if(nodes = $X('./div[starts-with(@id, "thread")]', delform))
			for(var node, i = 0; node = nodes.snapshotItem(i); i++) {
				node.id = 'thread_' + node.id.match(/\d+/);
				tdiv[i] = node;
		}
	}
	return tdiv;
}

//-----------------------------------Replies Extraction------------------------------

function initBoardPosts()
{
	if(source == 'wakaba' || chan == '02-ch') {
		// updating replypost tables, like <table id="post_1632475" class="replypost">
		var replyposts = $X('.//td[@class="reply"]', delform);
		for(var replypost, i = 0; replypost = replyposts.snapshotItem(i); i++) {
			var replytable = $x('./ancestor::table', replypost);
			with(replytable)
				className = 'replypost',
				id = 'post_' + replypost.id.match(/\d+/);
		}
		// make oppost divs, like <div id="post_1633744" class="oppost">
		var rr = 1;
		if(chan == '02-ch' || chan == 'iichan') rr = 0;
		for(var i = 0; i < threads.length - rr; i++) {
			var thread = threads[i];
			var opdiv = document.createElement('div');
			with(opdiv)
				className = 'oppost',
				id = 'post_' + thread.id.match(/\d+/);
			with (thread) insertBefore(opdiv, firstChild);
			var nodelist = new Array();
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
		allposts = $X('.//div[@class="postnode"]');
		for(var post, i = 0; post = allposts.snapshotItem(i); i++) {
			var reply = $x('.//td[@class="reply"]', post);
			if(reply) post.id = 'post_' + reply.id.match(/\d+/);
			else post.id = 'oppost_' + post.parentNode.id.match(/\d+/);
		}
		posts = $X('.//div[starts-with(@id,"post")]');
		opposts = $X('.//div[starts-with(@id,"oppost")]');
	}
	
	if(chan == 'dobrochan') {
		posts = $X('.//table[@class="replypost"]');
		opposts = $X('.//div[@class="oppost"]');
	}
}


//===================================================================================
// 									MAIN
//===================================================================================

HIDE = 1;
UNHIDE = 0;
MODE_MAIN = 1;
MODE_THREAD = 0;
oldRegexpStat = 0;
option = new Array();
expires = new Array();
visibility = new Array();
favorities = new Array();
hiddenThrds = new Array();
initBoard();
threads = initBoardThreads();
initBoardPosts();
if(source == 'wakaba')
	readHiddenThreads();
readVisibility();
setMainOptions();
makeOptionPanel();
addConfig();
modifyReplyForm();
addTextFormatPanel();
if(email_field && source != 'kusaba')
	addSageButton();
if(option[7] == 1 && !(option[6] == 1 && source == 'wakaba'))
	forEachReply(strongHidePosts);
if(mode == MODE_MAIN && source == 'wakaba')
	forOPReply(injectHideThreadButton);
forEachReply(injectHidePostButton);
if(mode == MODE_THREAD && option[8] == 1)
	forEachReply(injectHideSamePostButton);
if(option[12] == 1 && chan != 'dobrochan') {
	forEachReply(injectQuickReplyButton);
	forOPReply(injectQuickReplyButton);
}
if(source == 'wakaba')
	forOPReply(injectFavoritiesButton);
if(option[14] == 1 && chan == '0chan')
	forEachReply(createSageMarker);
if(mode == MODE_THREAD)
	forEachReply(createPostCounter);
if(option[21] == 1)
	forEachReply(detectWipePosts);
if(option[0] == 1)
	forEachReply(hideSagePosts);
if(option[1] == 1)
	forEachReply(hideNotextPosts);
if(option[2] == 1)
	forEachReply(hideNoimagePosts);
if(option[3] == 1)
	forEachReply(hideMaxtextPosts);
storeHiddenPosts();
if(source == 'wakaba' && mode == MODE_MAIN)
	{ forEachReply(expandPosts); forOPReply(expandPosts); }
if(option[15] == 1)
	{ forEachReply(makeYouTube); forOPReply(makeYouTube); }
if(source == 'wakaba') {
	if(option[6] == 1 && mode == MODE_THREAD)
		forEachReply(collectHiddenPosts);
	if(option[13] == 1 && mode == MODE_THREAD)
		forEachReply(compactMode);
}
if(option[17] == 1 && (source == 'wakaba' || chan == '02-ch'))
	{ forEachReply(imageHandling); forOPReply(imageHandling); }
if(option[18] == 1)
	openSpoilers();
if(option[19] == 1 && chan != 'dobrochan')
	forEachReply(postLinksPrewiev);