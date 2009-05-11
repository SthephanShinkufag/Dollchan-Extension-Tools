// Bender Sage Fighter
// 2084-05-11 version
// Copyright (C) 2084, Bender Bending Rodríguez 
// (some parts were shamefully stolen from internet)
//
// Released under the Kill All Humans License:
// You can use this script as long as you 
// 1) Going to kill all humans
// 2) OR going to build Huge Battle Robot 
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Bender Sage Fighter
// @namespace     Bender
// @description   Hides specific posts in threads
// @include       http://0chan.ru/*/res/*
// @include       http://www.0chan.ru/*/res/*
// ==/UserScript==

HIDE=1
UNHIDE=0

// config
operaCfg = new Array();
function getConfigValue(name) 
{
    if(navigator.appName == "Opera") { return operaCfg[name]; }
    return GM_getValue(name);
}

function setConfigValue(name,value) 
{
    if(navigator.appName == "Opera") { operaCfg[name]=value; return }
	GM_setValue(name, value);
}


//generate uniqual id based on board and post number
function gensym(name,post)
{
    if(post == undefined)
        post = "";
    return "BENDER_SAGE_FIGHTER_"+name+"_"+board+"_"+post;
}

//visibility
visibility = new Array();
expires = new Array();

function getVisibility(post)
{
    key = board + post;
    if( key in visibility )
        return visibility[key];
    return null;
}

var DELAY =  2 * 24 * 60 * 60 * 1000;

// every time we need to reread visibility
// so working from multiply windows will not screw all changes
function setVisibilityCheap(post,stat)
{
    now = (new Date()).getTime();
    visibility[board+post] = stat;
    expires[board+post] = now + DELAY;
}

function readVisibility()
{
    visibility = new Array();
    vs=getConfigValue(gensym('VISIBILITY'));
    if(vs == undefined){
        return;
    }
    entries = vs.split('|');
    entries.pop();
    now = (new Date()).getTime();
    for(var i = 0; i < entries.length; i++){
        [key,value,exp]=entries[i].split('=');
        if(now < exp){
            visibility[key] = value;
            expires[key] = exp;
        }
    }
}

function storeVisibility()
{
    var text = "";
    for(var key in visibility)
        text += key + "=" + visibility[key] + "=" + expires[key] + "|";
    setConfigValue(gensym('VISIBILITY'), text);
}


//toggle visibility status
function modVisibility(node,stat)
{
    if(stat == HIDE)
        node.style.display = "none";
    else
        node.style.display = "block";
}

//toggle visibility status of all children with given classname 
function modChildrenByClass(node,clas,vis)
{
    var els = node.getElementsByClassName(clas);
    for(var i=0; i<els.length; i++)
        modVisibility(els[i],vis);
}

//toggle visibility status of all children with given tagname 
function modChildrenByTag(node,tag,vis)
{
    var els = node.getElementsByTagName(tag);
    for(var i=0; i<els.length; i++)
        modVisibility(els[i],vis);
}

function invertStatus(stat)
{
    if(stat == UNHIDE)
        return HIDE;
    return UNHIDE;
}

// hide/unhide post
function togglePostVisibility(postNode,postNum)
{
    var button = hideButton(postNum);
    var oldStat = getVisibility(postNum);
    var stat = UNHIDE;
    if(!button){
        alert("no button for post "+postNum+" in " + postNode);
        return;
    }
    if(oldStat == UNHIDE){
        stat = HIDE;
        button.value='unhide';
    } else if(oldStat == HIDE){
        stat = UNHIDE;
        button.value='hide';
    }
    

    modChildrenByTag(postNode,'br', stat);
    modChildrenByTag(postNode,'blockquote', stat);
    modChildrenByTag(postNode,'img', stat);
    modChildrenByClass(postNode,'filesize', stat);
    setVisibilityCheap(postNum,stat);
}


// UTILS
function incc(arr,w)
{
    if( arr[w] ) 
        arr[w] += 1;
    else 
        arr[w] = 1;
}

function assert(cond, message)
{
    if(cond)
        return;
    throw message;
}

function truncStr(str)
{
    var maxlen = 20;
    return (str.length < maxlen) ? str : str.substr(0,maxlen-2) + "..";
}
function max(a,b){ return b > a ? b : a; }
function min(a,b){ return b < a ? b : a; }
function regexpSym() {return gensym("regexp");}
function hideSageSym() { return gensym("hide_sage"); }
function hideSageBox(){ return  document.getElementById(hideSageSym()); }
function hideButtonSym(postNum){ return gensym('hider', postNum); }
function hideButton(postNum){ return document.getElementById(hideButtonSym(postNum)); }
function removeNode(node){if(node) node.parentNode.removeChild(node);}
function createInput(type, value)
{
    var input = document.createElement('INPUT');
    input.type = type;
    if(value != undefined)
        input.value = value;
    return input;
}

// Wipe detectors
function getTextImpl(node)
{
    if(node.nodeName == "#text")
        return node.data;
    if(node.nodeName == "BR")
        return "\n";

    var text = "";
    for(var i = 0; i < node.childNodes.length; i++ ){
        text += getTextImpl(node.childNodes[i]);
    }
    return text;
}


function detectWipe_alnum(text)
{
    text = text.replace(/\n/g, " ");
    text = text.replace(/\//g, " ");
    text = text.toUpperCase();
    al = new RegExp("[A-Z]");
    num = new RegExp("[0-9]");
    var words = text.split(new RegExp(" "));
    
    if(words.length <= 5)
        return null;

    var wrds = 0;
    for(var i = 0; i < words.length; ++i ){
        word = words[i].length;
        if(word.length <= 6)
            continue;
        alc=0;
        nmc=0;

        //TODO:rewrite someday
        for(var j = 0; j < word.length; ++j){
            if(al.exec(word[j]) != null)
                alc += 1;
            if(num.exec(word[j]) != null)
                nmc += 1;
        }
        if(min(alc,nmc)>3)
            wrds += 1;
    }
    if(wrds >= 9)
        return "alnum x"+wrds;

    return null;
}


function detectWipe_caseSage(text)
{
    text = text.replace(/\n/g, " ");
    text = text.replace(new RegExp("[-.,!@#$%^&*()_+={}:\"'<>/?[]","g"), "");
    var words = text.split(new RegExp(" "));
    
    if(words.length <= 6)
        return null;

    var count = new Array(); 

    var wrds = 0;
    var ttl = 0;
    for(var i = 0; i < words.length; ++i ){
        if(words[i].length < 5)
            continue;
        ttl += 1;
        word = words[i];
        
        //очень параноидально и наивно
        up = word.toUpperCase();
        lw = word.toLowerCase();
        upc=0;
        lwc=0;
        for(var j = 0; j < word.length; ++j){
            //TODO: надо бы разобраться как русские буквы хранятся внтри. Но мне лень. 
            //Potomu uzaetsa translit
            if(up.charAt(j) == lw.charAt(j))
                continue;
            if(word.charAt(j) == up.charAt(j))
                upc += 1;
            else if (word.charAt(j) == lw.charAt(j))
                lwc += 1;
        }
        if(min(lwc,upc) > 3 && lwc + upc >= 4)
            wrds +=1;
    }

    if(wrds > max(ttl, 6))
        return "CaSe x" + wrds;

    return null;
}


function detectWipe_sameLines(text)
{
    text = text.replace(/  */g, " ");
    var lines = text.split(/\n/);
    
    if(lines.length < 4)
        return null;

    var count = new Array(); 
    all = 0;
    for(var i = 0; i < lines.length; ++i ){
        if(lines[i].length == 0)
            continue;
        all += 1;
        incc(count,lines[i]);
    }
    for(var it in count){
        if((count[it] > all/2 - count[it]) && count[it] >= 5){
            return "line:" + truncStr(it) + "x" + count[it];
        }
    }
    return null;
}

function detectWipe_sameWords(text)
{
    assert(text != null && text != undefined, "no text provided");
    text = text.replace(/\n/g, " ");
    text = text.replace(/[-.,!@#$%^&*()_+={}:\"'<>/?[]/g, " ");
    text = text.toUpperCase();
    var words = text.split(new RegExp(" "));
    
    if(words.length <= 17)
        return null;


    var count = new Array(); 

    var wrds = 0;
    for(var i = 0; i < words.length; ++i ){
        if(words[i].length <= 2)
            continue;
        wrds += 1;
        incc(count,words[i])
    }
    if(wrds <= 10)
        return undefined;
    keys=0; //TODO: get number of keys in more proper way
    pop="";
    mpop = -1;
    for(var it in count){
        keys += 1;
        if(count[it] > mpop){
            mpop = count[it];
            pop = it;
        }
        if(count[it] > (wrds / 3)){
            return "word:" + truncStr(it) + " x" + count[it];
        }
    }
    pop = truncStr(pop);
    if(wrds > 100 && keys <= 15)
        return "word2: "+pop+" ttl:" + wrds  + ", dif:" + keys;
    if(wrds / keys > 10)
        return "word3: "+pop+" ttl:" + wrds  + ", dif:" + keys;
    return null;
}



function detectWipe_nonAlnum(text)
{
    text = text.replace(/\n/g, " ");
    text = text.toUpperCase();
    var alnum = /[0-9A-Z]/g;
    var words = text.split(" ");
    var garbage = 0;
    var bytes = 0;
    var longest="";
    for(var i = 0; i<words.length; ++i){
        var word = words[i];
        if(word.length < 3)
            continue;
        bytes += word.length;
        var w = word.replace(alnum, "");
        if(w.length > 3)
            garbage += w.length;
        if(w.length > longest.length)
            longest = w;
    }
    garbPerc = garbage * 1.0 / bytes;
    if(garbPerc >= 0.4)
        return "nonalnum:"+truncStr(longest)+"/g%="+parseInt(garbPerc * 100);
    return null;
}


function detectWipe_longWords(text)
{
    text = text.replace(/[-.,!@#$%^&*()_+={}:\"'<>?[]/g, "");
    text = text.replace(/\n/g, " ");
    text = text.replace(/\//g, " ");
    var longWords = 0;
    var words = text.split(" ");
    var longest="";
    if(words.length < 3)
        return null;
    len = 0;
    for(var i = 0; i<words.length; ++i){
        longest = words[i].length > longest.length ? words[i] : longest;
        len += (words[i].length);
    }
    lws = len * 1.0 / words.length;
    if(lws > 14)
        return "longwords: "+truncStr(longest)+" lws "+parseInt(100*lws)/100.0;
    return null;
}

function translit(_text)
{
    //TODO: переписать нафиг
    var text = _text.replace(/й/g,'i').replace(/ц/g,'s').replace(/у/g,'y').replace(/к/g,'k').replace(/е/g,'e').replace(/н/g,'n');
    text = text.replace(/ё/g,'e').replace(/г/g,'g').replace(/ш/g,'s').replace(/щ/g,'s').replace(/з/g,'z').replace(/х/g,'x');
    text = text.replace(/ъ/g,'t').replace(/ф/g,'f').replace(/ы/g,'i').replace(/в/g,'v').replace(/а/g,'a').replace(/п/g,'p');
    text = text.replace(/р/g,'p').replace(/о/g,'o').replace(/л/g,'l').replace(/д/g,'d').replace(/ж/g,'j');
    text = text.replace(/э/g,'e').replace(/я/g,'a').replace(/ч/g,'c').replace(/с/g,'c').replace(/м/g,'m');
    text = text.replace(/и/g,'i').replace(/т/g,'').replace(/ь/g,'i').replace(/б/g,'b').replace(/ю/g,'u');
    
    text = text.replace(/Й/g,'I').replace(/Ц/g,'S').replace(/У/g,'Y').replace(/К/g,'K').replace(/Е/g,'E');
    text = text.replace(/Ё/g,'E').replace(/Н/g,'H').replace(/ь/g,'I');
    text = text.replace(/Г/g,'g').replace(/Ш/g,'S').replace(/Щ/g,'S').replace(/З/g,'Z').replace(/Х/g,'X');
    text = text.replace(/Ъ/g,'T').replace(/Ф/g,'F').replace(/Ы/g,'I').replace(/В/g,'B').replace(/А/g,'A').replace(/П/g,'P');
    text = text.replace(/Р/g,'P').replace(/О/g,'O').replace(/Л/g,'L').replace(/Д/g,'D').replace(/Ж/g,'J').replace(/Э/g,'E');
    text = text.replace(/Я/g,'A').replace(/Ч/g,'S').replace(/С/g,'C').replace(/М/g,'M').replace(/И/g,'I');
    text = text.replace(/Т/g,'T').replace(/Ь/g,'i').replace(/Б/g,'B').replace(/Ю/g,'u');
    return text;
}



function getText(postNode)
{
    var replies = postNode.getElementsByClassName("reply");
    var reply = replies[0];
    var nodes = reply.getElementsByTagName('blockquote');
    if(nodes.length <= 0)
        return null;
    nodes = nodes[0].childNodes;
    if(nodes.length <= 0)
        return null;
    node = nodes[0];
    return getTextImpl(node);
}
zzz=undefined;

// main wipe detection
function detectWipe(postNode)
{
    var txt = translit(getText(postNode));

    var detectors = [
        detectWipe_sameWords,
        detectWipe_sameLines,
        detectWipe_longWords,
        detectWipe_nonAlnum,
        detectWipe_alnum,  
        detectWipe_caseSage
    ];


    for (var i = 0; i < detectors.length; ++i){
        var detector = detectors[i];
        var sage =  detector(txt);
        if(sage != null){
            return sage; 
        }
    }
    return null;
}



function toggleSage()
{
    setConfigValue( hideSageSym(), hideSageBox().checked );
    if(hideSageBox().checked)
        forEachReply( hideSagePosts );
    else
        forEachReply( unhideSagePosts );
    forEachReply( actuallyHideHiddenPosts );
    storeVisibility();
}

function preventEnter(e)
{
    if(e.which == 13){
        e.preventDefault();
        e.stopPropagation();
    }
}

function modifyByRegexp(newStatus)
{
    var field = document.getElementById(regexpSym());
    if(field.value == "")
    {
        alert("Введите регулярное выражение");
        return;
    }


    var field = document.getElementById(regexpSym());
    var re = new RegExp(translit(field.value.toUpperCase()));

    functor = function(postNode, postNum){
        if(getVisibility(postNum) == newStatus)
            return;
        var text = translit(getText(postNode).toUpperCase()).replace(/\n/g," ");;
        if(re.exec(text)){
            togglePostVisibility(postNode, postNum);
            notice = document.getElementById(gensym('notice', postNum));
            removeNode(notice);
            makeNotice(postNode, 'regexp matched: '+field.value, 'notice', postNum);
        }
    };

    forEachReply(functor);
    storeVisibility();
}

function addConfig()
{
    postform = document.getElementById("postform");
    if(!postform){
        alert("ineternal error: cannot find postform");
        return;
    }
    
    // create button
    var box = createInput('checkbox');
    box.id = hideSageSym();
    box.addEventListener("click", toggleSage, false);
    box.checked = getConfigValue(hideSageSym());

    // append button
    tbodies = postform.getElementsByTagName('tbody');
    tbody = tbodies[0];

    insertRow = function(title){
        var row = tbody.insertRow(-1);
        var cell = row.insertCell(-1);
        cell.className = "postblock";
        cell.appendChild(document.createTextNode(title));
        return row;
    };
    
    row = insertRow('Antisage');
    
    cell = row.insertCell(-1);
    cell.appendChild(box);
    cell.appendChild(document.createTextNode('(прятать sage сообщения)'));

    // append regexp hider
    row = insertRow('Regexp');
    
    var field = createInput('text', '');
    field.id = regexpSym();
    field.addEventListener("keypress", preventEnter, false);
    
    cell = row.insertCell(-1);
    cell.appendChild(field);

    var button = createInput('button', 'hide');
    button.addEventListener("click", function(){modifyByRegexp(HIDE);}, false);
    cell.appendChild(button);
    
    button = createInput('button','unhide');
    button.addEventListener("click", function(){modifyByRegexp(UNHIDE);}, false);
    cell.appendChild(button);
}

function getPostHeader(node)
{
    var n = node.getElementsByClassName("reflink");
    if(n.length == 0)
        return null;
    return n[0];
}

function makeNotice(node, text, id, postNum)
{
    header = getPostHeader(node);
    var link = document.createElement('a');
    if(id)
        link.id = gensym(id, postNum);
    link.appendChild(document.createTextNode(text));
    link.addEventListener("click", (function(lnk){return function() { removeNode(lnk);}})(link), false);
    header.appendChild(link);
}


function forEachReply(lambda)
{
    // prepare re for extractin post numbers
    var re_reply = new RegExp("reply(.*)");
    for(var i=0; i<replies.length; i++){
        var postNode = replies[i];
        var reply = postNode.getElementsByClassName("reply");

        // get post number of reply
        if(reply.length == 0)
            continue;   //OP has no reply-id
        
        var match = re_reply.exec(reply[0].id);
        var postNum = match[1];
        var header = getPostHeader(postNode);
        if(!header)
            continue;
        lambda(postNode, postNum);
    }
}
function isSagePost(postNode)
{
    posterNames = postNode.getElementsByClassName("postername");
    if(posterNames.length == 0)
        return false;
    var posterName = posterNames[0];
    var tags = posterName.getElementsByTagName('a');
    if(tags.length == 0)
        return false;
    var tag = tags[0];
    if(tag.href != "mailto:sage")
        return false;
    return true;
}


//
// forEachReply-compatable functions
//
function debugAlert(postNode, postNum)
{
    var txt="";
    alert(txt);
}

// inject "hide post" button after each post
function injectHidePostButton(postNode, postNum)
{
    var button = createInput('button', 'hide');
    button.id = hideButtonSym(postNum);
    button.addEventListener("click", (function(node,thrd){return function() {
            togglePostVisibility(node,thrd); 
            storeVisibility();
        }}) (postNode,postNum), false);
    getPostHeader(postNode).appendChild(button);

    if(getConfigValue("BENDER_debug")){
        button = createInput('button', 'DEBUG');
        button.id = gensym('debug', postNum);
        button.addEventListener("mousedown", function() {alert('haha2');}, false);
        getPostHeader(postNode).appendChild(button);
    }
}

// if post is detected as sage - hide it 
function actuallyHideHiddenPosts(postNode, postNum)
{
    var visibility = getVisibility(postNum);
    if( visibility != HIDE )
        return;

    setVisibilityCheap(postNum,UNHIDE); //dirty hack: mark post as visible
    togglePostVisibility(postNode, postNum);
}


// detect and hide sage posts 
function detectWipePosts(postNode, postNum)
{
    var visibility = getVisibility(postNum);
    if( visibility == HIDE || visibility == UNHIDE )
        return;

    var sage = detectWipe(postNode);
    if(sage == null){
        setVisibilityCheap(postNum,UNHIDE);
        return;
    }

    setVisibilityCheap(postNum,HIDE);
    makeNotice(postNode, 'AUTO-HIDDEN: '+sage, 'notice', postNum);
}


function hideSagePosts(postNode, postNum)
{
    if(!isSagePost(postNode))
        return;


    notice = document.getElementById(gensym('notice', postNum));
    removeNode(notice);

    if(getVisibility(postNum) != HIDE)
        makeNotice(postNode, 'AUTO-HIDDEN: Sage(не поднимать этот тред)', 'notice', postNum);
    setVisibilityCheap(postNum,HIDE);
}
function unhideSagePosts(postNode, postNum)
{
    if(!isSagePost(postNode))
        return;

    // unhide sage post
    setVisibilityCheap(postNum,HIDE); //dirty hack: mark post as hidden
    togglePostVisibility(postNode, postNum);

    // remove notice
    notice = document.getElementById(gensym('notice', postNum));
    removeNode(notice);

    //detect wipe post
    detectWipePosts(postNode, postNum);
}


//
// MAIN
//

// extract board & thread
var re = new RegExp("0chan.ru/(.*)/res/(.*).html");
var match = re.exec(location.href);
assert(match != null, 'internal error: can not parse url'); 

var board = match[1];
var opThreadNum = match[2];
var thread = document.getElementById("thread"+opThreadNum+board);
assert(thread != null, 'internal error: thread not found'); 


readVisibility();
addConfig();

// find posts
var replies = thread.getElementsByClassName("postnode");
assert(replies != null, 'internal error: posts not found'); 


// run some nice algorithms
forEachReply( injectHidePostButton );
forEachReply( detectWipePosts );
if(hideSageBox().checked)
    forEachReply( hideSagePosts );
forEachReply( actuallyHideHiddenPosts );


// store changed visibility
storeVisibility();
