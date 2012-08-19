/**
 * @externs
 */

/** @return {String} */ Document.prototype.getSelection = function() {};
/** @type {Object} */ Window.opera;
/** @type {Object} */ Window.opera.scriptStorage; 
/** @return {String} */ Window.opera.version = function() {};

/**
 * @param {String} html
 * @return {Node}
 */
Document.prototype.implementation.createHTMLDocument = function(html) {};
/**
 * @param {String} string
 * @param {number=} start_index
 * @return {Boolean}
 * @nosideeffects
 */
String.prototype.contains = function(string, start_index) {};
/**
 * @param {String} string
 * @param {number=} start_index
 * @return {Boolean}
 * @nosideeffects
 */
String.prototype.endsWith = function(string, start_index) {};
/**
 * @param {Function|string} callback
 * @param {number} delay
 * @param {...*} var_args
 * @return {number}
 */
function setTimeout(callback, delay, var_args) {};
/**
 * @constructor
 * @return {Object}
 * @nosideeffects
 */
function MozBlobBuilder() {};

Window.JSON = {};
/**
 * @param {string} text
 * @param {(function(string, *) : *)=} opt_reviver
 * @return {*}
 */
Window.JSON.parse = function(text, opt_reviver) {};

/** @type {String} */ XMLHttpRequest.prototype.finalUrl;
var localStorage = {}, sessionStorage = {}, self = {};

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
/**
 * @param {String} path
 * @param {Node} root
 * @return {Node}
 */
function $x(path, root) {};