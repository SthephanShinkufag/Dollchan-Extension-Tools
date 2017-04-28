// ==UserScript==
// @name            Dollchan Extension Tools
// @version         17.2.13.0
// @namespace       http://www.freedollchan.org/scripts/*
// @author          Sthephan Shinkufag @ FreeDollChan
// @copyright       © 2017 Dollchan Extension Tools Team. See the LICENSE file for license rights and limitations (MIT).
// @description     Doing some profit for imageboards
// @icon            https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Icon.png
// @updateURL       https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.meta.js
// @run-at          document-start
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_deleteValue
// @grant           GM_openInTab
// @grant           GM_xmlhttpRequest
// @grant           unsafeWindow
// @include         *
// @nocompat        Chrome
// ==/UserScript==

/* jshint esnext:true, elision:true, noyield:true */

(function de_main_func_inner(scriptStorage, FormData, scrollTo, localData) {
'use strict';

const version = '17.2.13.0';
const commit = 'ffae733';
