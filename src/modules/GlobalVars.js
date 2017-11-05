/* ==[ GlobalVars.js ]== */

const doc = window.document;
const emptyFn = Function.prototype;
const aProto = Array.prototype;
const Images_ = { preloading: false, afterpreload: null, progressId: null, canvas: null };
const gitWiki = 'https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/';
const gitRaw = 'https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/';

let docBody, locStorage, sesStorage, Cfg, pByEl, pByNum, aib, nav, updater,
	dTime, pr, dummy, lang, isExpImg, isPreImg, needScroll, excludeList;
let quotetxt = '';
let nativeXHRworks = true;
let visPosts = 2;
let topWinZ = 0;
