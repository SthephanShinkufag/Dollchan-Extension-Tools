/**
 * @externs
 */

/** @return {String} */ Document.prototype.getSelection = function() {};
/** @type {Object} */ Window.opera;
/** @type {Object} */ Window.opera.scriptStorage; 

/**
 * @param {String} html
 * @return {Node}
 */
Document.prototype.implementation.createHTMLDocument = function(html) {};
/**
 * @constructor
 * @return {Object}
 * @nosideeffects
 */
function MozBlobBuilder() {};
/**
 * @param {Object} obj
 * @return {String}
 */
function uneval(obj) {};

Window.JSON = {};
/**
 * @param {string} text
 * @param {(function(string, *) : *)=} opt_reviver
 * @return {*}
 */
Window.JSON.parse = function(text, opt_reviver) {};

/** @type {String} */ XMLHttpRequest.prototype.finalUrl; 
var localStorage = {}, sessionStorage = {};

/**
 * @param {String} text
 * @return {undefined}
 */
function GM_log(text) {};
/**
 * @param {String} text
 * @return {undefined}
 */
Window.GM_log = function(text) {};
/**
 * @param {Object} obj
 * @return {undefined}
 */
function GM_xmlhttpRequest(obj) {};
/**
 * @param {Object} obj
 * @return {undefined}
 */
Window.GM_xmlhttpRequest = function(obj) {};
/**
 * @param {String} name
 * @param {String} value
 * @return {undefined}
 */
function GM_setValue(name, value) {};
/**
 * @param {String} name
 * @return {String}
 */
function GM_getValue(name) {};
/**
 * @param {String} url
 * @param {Boolean} loadInBackground
 * @param {Boolean} reuseTab
 * @return {undefined}
 */
function GM_openInTab(url, loadInBackground, reuseTab) {};

var Cfg = {};

/** @type {String} */ Cfg.version;
/** @type {Number} */ Cfg.lang;
/** @type {Number} */ Cfg.sstyle;
/** @type {Number} */ Cfg.spells;
/** @type {Number} */ Cfg.awipe;
/** @type {Number} */ Cfg.samel;
/** @type {Number} */ Cfg.samew;
/** @type {Number} */ Cfg.longp;
/** @type {Number} */ Cfg.longw;
/** @type {Number} */ Cfg.caps;
/** @type {Number} */ Cfg.specs;
/** @type {Number} */ Cfg.nums;
/** @type {Number} */ Cfg.menuhd;
/** @type {Number} */ Cfg.viewhd;
/** @type {Number} */ Cfg.delhd;
/** @type {Number} */ Cfg.filthr;
/** @type {Number} */ Cfg.updthr;
/** @type {Number} */ Cfg.updint;
/** @type {Number} */ Cfg.updfav;
/** @type {Number} */ Cfg.navig;
/** @type {String} */ Cfg.navdel;
/** @type {Number} */ Cfg.navmrk;
/** @type {Number} */ Cfg.navhid;
/** @type {Number} */ Cfg.navdis;
/** @type {Number} */ Cfg.expimg;
/** @type {Number} */ Cfg.expost;
/** @type {Number} */ Cfg.ctime;
/** @type {String} */ Cfg.ctmofs;
/** @type {String} */ Cfg.ctmpat;
/** @type {Number} */ Cfg.insnum;
/** @type {Number} */ Cfg.animp;
/** @type {Number} */ Cfg.aclose;
/** @type {Number} */ Cfg.rtitle;
/** @type {Number} */ Cfg.attach;
/** @type {Number} */ Cfg.icount;
/** @type {Number} */ Cfg.showmp;
/** @type {Number} */ Cfg.ospoil;
/** @type {Number} */ Cfg.noname;
/** @type {Number} */ Cfg.noscrl;
/** @type {Number} */ Cfg.mp3;
/** @type {Number} */ Cfg.addimg;
/** @type {Number} */ Cfg.imgsrc;
/** @type {Number} */ Cfg.ytube;
/** @type {Number} */ Cfg.yptype;
/** @type {Number} */ Cfg.ywidth;
/** @type {Number} */ Cfg.yheigh;
/** @type {Number} */ Cfg.yhdvid;
/** @type {Number} */ Cfg.ytitle;
/** @type {Number} */ Cfg.verify;
/** @type {Number} */ Cfg.rndimg;
/** @type {Number} */ Cfg.addfav;
/** @type {Number} */ Cfg.keynav;
/** @type {Number} */ Cfg.sagebt;
/** @type {Number} */ Cfg.svsage;
/** @type {Number} */ Cfg.issage;
/** @type {Number} */ Cfg.pform;
/** @type {Number} */ Cfg.tform;
/** @type {Number} */ Cfg.forcap;
/** @type {Number} */ Cfg.txtbtn;
/** @type {Number} */ Cfg.txtpos;
/** @type {Number} */ Cfg.name;
/** @type {String} */ Cfg.namval;
/** @type {Number} */ Cfg.passw;
/** @type {String} */ Cfg.pasval;
/** @type {Number} */ Cfg.sign;
/** @type {String} */ Cfg.sigval;
/** @type {Number} */ Cfg.norule;
/** @type {Number} */ Cfg.nogoto;
/** @type {Number} */ Cfg.nopass;
/** @type {Number} */ Cfg.mask;
/** @type {Number} */ Cfg.texw;
/** @type {Number} */ Cfg.texh;
/** @type {Number} */ Cfg.enupd;
/** @type {Number} */ Cfg.betaupd;
/** @type {Number} */ Cfg.lupdchk;
/** @type {Number} */ Cfg.supdint;