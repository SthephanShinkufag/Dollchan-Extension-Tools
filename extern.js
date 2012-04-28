/**
 * @externs
 */

/** @return {String} */ Document.prototype.getSelection = function() {};
/** @type {Object} */ Window.prototype.opera;
/** @type {Object} */ Window.prototype.opera.scriptStorage; 

/**
 * @param {String} html
 * @return {Node}
 */
Document.prototype.implementation.createHTMLDocument = function(html) {};
/**
 * @param {Array.<String>} blb
 * @param {Object} par
 * @return {!Blob}
 */
Document.prototype.Blob = function(blb,par) {};
/** @type {String} */ XMLHttpRequest.prototype.finalUrl; 

/**
 * @param {String} text
 * @return {undefined}
 */
Window.prototype.GM_log = function(text) {};
/**
 * @param {Object} obj
 * @return {undefined}
 */
Window.prototype.GM_xmlhttpRequest = function (obj) {};
/**
 * @param {String} name
 * @param {String} value
 * @return {undefined}
 */
Window.prototype.GM_setValue = function(name, value) {};
/**
 * @param {String} name
 * @return {String}
 */
Window.prototype.GM_getValue = function(name) {};
/**
 * @param {String} url
 * @param {Boolean} loadInBackground
 * @param {Boolean} reuseTab
 * @return {undefined}
 */
Window.prototype.GM_openInTab = function(url, loadInBackground, reuseTab) {};

var Cfg = {};
var defaultCfg = {};

/** @type {String} */ Cfg.version;
/** @type {String} */ defaultCfg.version;
/** @type {Number} */ Cfg.lang;
/** @type {Number} */ defaultCfg.lang;
/** @type {Number} */ Cfg.sstyle;
/** @type {Number} */ defaultCfg.sstyle;
/** @type {Number} */ Cfg.spells;
/** @type {Number} */ defaultCfg.spells;
/** @type {Number} */ Cfg.awipe;
/** @type {Number} */ defaultCfg.awipe;
/** @type {Number} */ Cfg.samel;
/** @type {Number} */ defaultCfg.samel;
/** @type {Number} */ Cfg.samew;
/** @type {Number} */ defaultCfg.samew;
/** @type {Number} */ Cfg.longp;
/** @type {Number} */ defaultCfg.longp;
/** @type {Number} */ Cfg.longw;
/** @type {Number} */ defaultCfg.longw;
/** @type {Number} */ Cfg.caps;
/** @type {Number} */ defaultCfg.caps;
/** @type {Number} */ Cfg.specs;
/** @type {Number} */ defaultCfg.specs;
/** @type {Number} */ Cfg.nums;
/** @type {Number} */ defaultCfg.nums;
/** @type {Number} */ Cfg.menuhd;
/** @type {Number} */ defaultCfg.menuhd;
/** @type {Number} */ Cfg.viewhd;
/** @type {Number} */ defaultCfg.viewhd;
/** @type {Number} */ Cfg.delhd;
/** @type {Number} */ defaultCfg.delhd;
/** @type {Number} */ Cfg.filthr;
/** @type {Number} */ defaultCfg.filthr;
/** @type {Number} */ Cfg.updthr;
/** @type {Number} */ defaultCfg.updthr;
/** @type {Number} */ Cfg.updint;
/** @type {Number} */ defaultCfg.updint;
/** @type {Number} */ Cfg.updfav;
/** @type {Number} */ defaultCfg.updfav;
/** @type {Number} */ Cfg.navig;
/** @type {Number} */ defaultCfg.navig;
/** @type {String} */ Cfg.navdel;
/** @type {String} */ defaultCfg.navdel;
/** @type {Number} */ Cfg.navmrk;
/** @type {Number} */ defaultCfg.navmrk;
/** @type {Number} */ Cfg.navhid;
/** @type {Number} */ defaultCfg.navhid;
/** @type {Number} */ Cfg.navdis;
/** @type {Number} */ defaultCfg.navdis;
/** @type {Number} */ Cfg.expimg;
/** @type {Number} */ defaultCfg.expimg;
/** @type {Number} */ Cfg.expost;
/** @type {Number} */ defaultCfg.expost;
/** @type {Number} */ Cfg.ctime;
/** @type {Number} */ defaultCfg.ctime;
/** @type {String} */ Cfg.ctmofs;
/** @type {String} */ defaultCfg.ctmofs;
/** @type {String} */ Cfg.ctmpat;
/** @type {String} */ defaultCfg.ctmpat;
/** @type {Number} */ Cfg.insnum;
/** @type {Number} */ defaultCfg.insnum;
/** @type {Number} */ Cfg.animp;
/** @type {Number} */ defaultCfg.animp;
/** @type {Number} */ Cfg.aclose;
/** @type {Number} */ defaultCfg.aclose;
/** @type {Number} */ Cfg.rtitle;
/** @type {Number} */ defaultCfg.rtitle;
/** @type {Number} */ Cfg.attach;
/** @type {Number} */ defaultCfg.attach;
/** @type {Number} */ Cfg.icount;
/** @type {Number} */ defaultCfg.icount;
/** @type {Number} */ Cfg.showmp;
/** @type {Number} */ defaultCfg.showmp;
/** @type {Number} */ Cfg.ospoil;
/** @type {Number} */ defaultCfg.ospoil;
/** @type {Number} */ Cfg.noname;
/** @type {Number} */ defaultCfg.noname;
/** @type {Number} */ Cfg.noscrl;
/** @type {Number} */ defaultCfg.noscrl;
/** @type {Number} */ Cfg.mp3;
/** @type {Number} */ defaultCfg.mp3;
/** @type {Number} */ Cfg.addimg;
/** @type {Number} */ defaultCfg.addimg;
/** @type {Number} */ Cfg.imgsrc;
/** @type {Number} */ defaultCfg.imgsrc;
/** @type {Number} */ Cfg.ytube;
/** @type {Number} */ defaultCfg.ytube;
/** @type {Number} */ Cfg.yptype;
/** @type {Number} */ defaultCfg.yptype;
/** @type {Number} */ Cfg.ywidth;
/** @type {Number} */ defaultCfg.ywidth;
/** @type {Number} */ Cfg.yheigh;
/** @type {Number} */ defaultCfg.yheigh;
/** @type {Number} */ Cfg.yhdvid;
/** @type {Number} */ defaultCfg.yhdvid;
/** @type {Number} */ Cfg.ytitle;
/** @type {Number} */ defaultCfg.ytitle;
/** @type {Number} */ Cfg.verify;
/** @type {Number} */ defaultCfg.verify;
/** @type {Number} */ Cfg.rndimg;
/** @type {Number} */ defaultCfg.rndimg;
/** @type {Number} */ Cfg.addfav;
/** @type {Number} */ defaultCfg.addfav;
/** @type {Number} */ Cfg.keynav;
/** @type {Number} */ defaultCfg.keynav;
/** @type {Number} */ Cfg.sagebt;
/** @type {Number} */ defaultCfg.sagebt;
/** @type {Number} */ Cfg.svsage;
/** @type {Number} */ defaultCfg.svsage;
/** @type {Number} */ Cfg.issage;
/** @type {Number} */ defaultCfg.issage;
/** @type {Number} */ Cfg.pform;
/** @type {Number} */ defaultCfg.pform;
/** @type {Number} */ Cfg.tform;
/** @type {Number} */ defaultCfg.tform;
/** @type {Number} */ Cfg.forcap;
/** @type {Number} */ defaultCfg.forcap;
/** @type {Number} */ Cfg.txtbtn;
/** @type {Number} */ defaultCfg.txtbtn;
/** @type {Number} */ Cfg.txtpos;
/** @type {Number} */ defaultCfg.txtpos;
/** @type {Number} */ Cfg.name;
/** @type {Number} */ defaultCfg.name;
/** @type {String} */ Cfg.namval;
/** @type {String} */ defaultCfg.namval;
/** @type {Number} */ Cfg.passw;
/** @type {Number} */ defaultCfg.passw;
/** @type {String} */ Cfg.pasval;
/** @type {String} */ defaultCfg.pasval;
/** @type {Number} */ Cfg.sign;
/** @type {Number} */ defaultCfg.sign;
/** @type {String} */ Cfg.sigval;
/** @type {String} */ defaultCfg.sigval;
/** @type {Number} */ Cfg.norule;
/** @type {Number} */ defaultCfg.norule;
/** @type {Number} */ Cfg.nogoto;
/** @type {Number} */ defaultCfg.nogoto;
/** @type {Number} */ Cfg.nopass;
/** @type {Number} */ defaultCfg.nopass;
/** @type {Number} */ Cfg.mask;
/** @type {Number} */ defaultCfg.mask;
/** @type {Number} */ Cfg.texw;
/** @type {Number} */ defaultCfg.texw;
/** @type {Number} */ Cfg.texh;
/** @type {Number} */ defaultCfg.texh;