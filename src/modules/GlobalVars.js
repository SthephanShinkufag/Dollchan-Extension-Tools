/* ==[ GlobalVars.js ]== */

const doc = window.document;
const emptyFn = Function.prototype;
const aProto = Array.prototype;
const Images_ = { preloading: false, afterpreload: null, progressId: null, canvas: null };
const gitWiki = 'https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/';
const gitRaw = 'https://raw.githubusercontent.com/SthephanShinkufag/Dollchan-Extension-Tools/master/';

let $each, aib, Cfg, docBody, dTime, dummy, excludeList, isExpImg, isPreImg, lang, locStorage, nav,
	needScroll, pByEl, pByNum, pr, sesStorage, updater;
let quotetxt = '';
let nativeXHRworks = true;
let visPosts = 2;
let topWinZ = 0;
