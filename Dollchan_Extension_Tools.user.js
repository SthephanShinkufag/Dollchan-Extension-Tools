// Dollchan Sage Fighter
// 2009-06-07 version, Stephan Shinkufag @ Free Dollchan 
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
// @name          Dollchan Sage Fighter
// @namespace     Free Dollchan
// @include       http://2-ch.ru/*/res/*
// @include       http://www.2-ch.ru/*/res/*
// @include       http://2-ch.ru/*/*.html
// @include       http://www.2-ch.ru/*/*.html
// ==/UserScript==

HIDE=1
UNHIDE=0


function setCookie ( cookieName, cookieValue, lifeTime ) {
    if( !cookieName ) { return; }
    if( lifeTime == "delete" ) { lifeTime = -10; } else { lifeTime = 31536000; }
        document.cookie = escape( cookieName ) + "=" + escape( cookieValue ) +
        ";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * lifeTime ) ) ).toGMTString() + ";path=/";
}


function getCookie ( cookieName, oDefault ) {
    var cookieJar = document.cookie.split( "; " );
    for( var x = 0; x < cookieJar.length; x++ ) {
        var oneCookie = cookieJar[x].split( "=" );
        if( oneCookie[0] == escape( cookieName ) ) {
            try {
                eval('var footm = "'+unescape( oneCookie[1] )+'"');
            } catch(e) { return oDefault; }
            return footm;
        }
    }
    return oDefault;
}


// config
function getConfigValue(name)
{
    if(navigator.appName == "Opera") {
        name = getCookie(name);
        if(name == "true")
            name = true;
        if(name == "false")
            name = false;
        return name;
    }

    else
        return GM_getValue(name);
}


function setConfigValue(name,value) 
{
    if(navigator.appName == "Opera")
        setCookie(name, value);
    else
        GM_setValue(name, value);
}


//generate uniqual id based on board and post number
function gensym(name,post)
{
    if(post == undefined)
        post = "";
    return "SAGE_FIGHTER_"+name+"_"+board+"_"+post;
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
    if(vs == undefined) {
        return;
    }
    entries = vs.split('|');
    entries.pop();
    now = (new Date()).getTime();
    for(var i = 0; i < entries.length; i++) {
        [key,value,exp]=entries[i].split('=');
        if(now < exp) {
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


function modPostVisibility(postNode, stat)
{
    modChildrenByTag(postNode,'br', stat);
    modChildrenByTag(postNode,'blockquote', stat);
    modChildrenByTag(postNode,'img', stat);
    modChildrenByClass(postNode,'filesize', stat);
}


// hide/unhide post
function togglePostVisibility(postNode,postNum)
{
    var button = hideButton(postNum);
    var oldStat = getVisibility(postNum);
    var stat = UNHIDE;
    if(!button) {
        alert("no button for post "+postNum+" in " + postNode);
        return;
    }
    if(oldStat == UNHIDE) {
        stat = HIDE;
        button.value='+';
    } else if(oldStat == HIDE) {
        stat = UNHIDE;
        button.value='_';
    }
    
    modPostVisibility(postNode, stat);

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


function max(a,b) { return b > a ? b : a; }
function min(a,b) { return b < a ? b : a; }
function hideButtonSym(postNum){ return gensym('hider', postNum); }
function hideButton(postNum) { return document.getElementById(hideButtonSym(postNum)); }
function removeNode(node) {if(node) node.parentNode.removeChild(node); }
function isDefined(v) { return v!=undefined && v != null; }

function createInput(type, value, id)
{
    var input = document.createElement('INPUT');
    input.type = type;
    if(isDefined(value))
        input.value = value;
    if(isDefined(id))
        input.id = id;
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
    for(var i = 0; i < node.childNodes.length; i++ ) {
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
    for(var i = 0; i < words.length; ++i ) {
        word = words[i].length;
        if(word.length <= 6)
            continue;
        alc=0;
        nmc=0;

        //TODO:rewrite someday
        for(var j = 0; j < word.length; ++j) {
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
    for(var i = 0; i < words.length; ++i ) {
        if(words[i].length < 5)
            continue;
        ttl += 1;
        word = words[i];
        
        //очень параноидально и наивно
        up = word.toUpperCase();
        lw = word.toLowerCase();
        upc=0;
        lwc=0;
        for(var j = 0; j < word.length; ++j) {
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
    for(var i = 0; i < lines.length; ++i ) {
        if(lines[i].length == 0)
            continue;
        all += 1;
        incc(count,lines[i]);
    }
    for(var it in count) {
        if((count[it] > all/2 - count[it]) && count[it] >= 5) {
            return "same line: '" + truncStr(it) + "' x" + count[it];
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
    for(var i = 0; i < words.length; ++i ) {
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
    for(var it in count) {
        keys += 1;
        if(count[it] > mpop) {
            mpop = count[it];
            pop = it;
        }
        if(count[it] > (wrds / 3)) {
            return "same word: '" + truncStr(it) + "' x" + count[it];
        }
    }
    pop = truncStr(pop);
    if(wrds > 100 && keys <= 15)
        return "same word2: "+pop+" ttl:" + wrds  + ", dif:" + keys;
    if(wrds / keys > 10)
        return "same word3: "+pop+" ttl:" + wrds  + ", dif:" + keys;
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
    var len = 0;
    var wordsNum = words.length - 3;
    for(var i = 0; i<words.length; ++i) {
        if(words[i].length == 1)
            wordsNum--;
        longest = words[i].length > longest.length ? words[i] : longest;
        len += (words[i].length);
    }
    if(wordsNum == 0)
        wordsNum = (words.length - 3);
    lws = len / wordsNum;
    if(wordsNum == 1 && longest.length > 80)
//        return "longword: "+truncStr(longest)+" length="+longest.length;
        return "long word";
    if((wordsNum > 1) && (wordsNum <6 ) && (lws > 11))
//        return "longwords: "+truncStr(longest)+" lws="+parseInt(100*lws)/100.0+" words="+wordsNum+" len="+len;
        return "long words";
    if(wordsNum >= 6 && lws > 10)
        return "long words";
    return null;
}


function detectWipe_specialSymbols(text)
{
    text = text.replace(/\n/g, " ");
    text = text.replace(/\//g, " ");
    var wholeText = text; 
    var wholetextLen = 0;
    for(var i = 0; i<wholeText.length; ++i) {
        wholetextLen += (wholeText[i].length);
    }
    text = text.replace(/[0-9A-Z]/g, ""); 
    text = text.replace(/[a-z]/g, "");
    text = text.replace(/!?./g, "");
    var specsymText = text;
    var specsymtextLen = 0;
    for(var i = 0; i<specsymText.length; ++i) {
        specsymtextLen += (specsymText[i].length);
    }
    var specsym = wholetextLen / specsymtextLen;
    if(wholetextLen > 25 && specsym < 1.8)
//        return "spec symbols: "+specsymtextLen;
    return "special symbols";
    return null;
}


function detectWipe_columns(text)
{
    var rows = text.split(/\n/g);
    var rowsNum = 0;
    for(var i = 0; i<rows.length; ++i) {
        if(rows[i].length < 9)
            rowsNum++;
        else return null;
    }
    if(rowsNum - 3 > 4)
        return "columns wipe x"+ (rowsNum - 3);
    return null;

}


function translit(_text)
{
    //TODO: переписать нафиг. или replace'ы быстрее? лень замерить
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


// main wipe detection
function detectWipe(postNode)
{
    var txt = translit(getText(postNode));

    var detectors = [
        detectWipe_sameWords,
        detectWipe_sameLines,
        detectWipe_longWords,
        detectWipe_specialSymbols,
        detectWipe_alnum,
        detectWipe_columns,
        detectWipe_caseSage
    ];

    for (var i = 0; i < detectors.length; ++i) {
        var detector = detectors[i];
        var sage =  detector(txt);
        if(sage != null) {
            return sage; 
        }
    }
    return null;
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
    link.setAttribute('style', 'font-size:12px;font-style:italic;');
    if(id)
        link.id = gensym(id, postNum);
    link.appendChild(document.createTextNode(text));
    link.addEventListener("click", (function(lnk) {return function() { removeNode(lnk);}})(link), false);
    header.appendChild(link);
}


function forEachReply(lambda)
{
    // prepare re for extractin post numbers
    var re_reply = new RegExp("reply(.*)");
    var pcount = 0;
    for(var i=0; i<replies.length; i++) {
        var postNode = replies[i];
        var reply = postNode.getElementsByClassName("reply");
        pcount++;
        // get post number of reply
        if(reply.length == 0)
            continue;   //OP has no reply-id
        
        var match = re_reply.exec(reply[0].id);
        var postNum = match[1];
        var header = getPostHeader(postNode);
        if(!header)
            continue;
        lambda(postNode, postNum, pcount);
    }
}


// inject "hide post" button after each post
function injectHidePostButton(postNode, postNum)
{
    var button = createInput('button', '_');
    button.setAttribute("style", "width:18px;font-size:9px");
    button.id = hideButtonSym(postNum);
    button.addEventListener("click", (function(node,thrd) {return function() {
            togglePostVisibility(node,thrd); 
            storeVisibility();
        }}) (postNode,postNum), false);
    getPostHeader(postNode).appendChild(button);
}


// inject post counter after each post
function createPostCounter(postNode, postNum, pcount)
{
    header = getPostHeader(postNode);
    var postcount = document.createElement('a');
        if(pcount >= 500)
            postcount.setAttribute('style', 'font-style:italic;color:#c41e3a');
        else
            postcount.setAttribute('style', 'font-style:italic;color:#4f7942');
    postcount.appendChild(document.createTextNode(' '+pcount+' '));
    header.appendChild(postcount);
    return postcount;
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
    if(sage == null) {
        setVisibilityCheap(postNum,UNHIDE);
        return;
    }

    setVisibilityCheap(postNum,HIDE);
    makeNotice(postNode, ' autohide: '+sage, 'notice', postNum);
}


// extract board & thread
var re = new RegExp("2-ch.ru/(.*)/res/(.*).html");
var match = re.exec(location.href);
assert(match != null, 'internal error: can not parse url'); 

var board = match[1];
var opThreadNum = match[2];
var thread = document.getElementById("thread"+opThreadNum+board);
assert(thread != null, 'internal error: thread not found'); 

readVisibility();

// find posts
var replies = thread.getElementsByClassName("reply");
assert(replies != null, 'internal error: posts not found'); 


// run some nice algorithms
forEachReply( injectHidePostButton );
forEachReply( createPostCounter );
forEachReply( detectWipePosts );
forEachReply( actuallyHideHiddenPosts );


// store changed visibility[for thread mode only]
storeVisibility();
