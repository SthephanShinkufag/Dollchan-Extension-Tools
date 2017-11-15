// ==UserScript==
// @name            Dollchan Extension Tools
// @version         17.10.24.0
// @namespace       http://www.freedollchan.org/scripts/*
// @author          Sthephan Shinkufag @ FreeDollChan
// @copyright       © Dollchan Extension Team. See the LICENSE file for license rights and limitations (MIT).
// @description     Doing some profit for imageboards
// @icon            https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Icon.png
// @updateURL       https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.meta.js
// @run-at          document-start
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_deleteValue
// @grant           GM_openInTab
// @grant           GM_xmlhttpRequest
// @grant           GM.getValue
// @grant           GM.setValue
// @grant           GM.deleteValue
// @grant           GM.xmlHttpRequest
// @grant           unsafeWindow
// @include         *
// @nocompat        Chrome
// ==/UserScript==

/* eslint indent: ["error", "tab", {
	"flatTernaryExpressions": true,
	"outerIIFEBody": 0
}], no-var: "error" */
(function deMainFuncInner(scriptStorage, FormData, scrollTo, localData) {
'use strict';

const version = '17.10.24.0';
const commit = '6ede269';

/* ==[ DefaultCfg.js ]== */
/* ==[ Localization.js ]== */
/* ==[ GlobalVars.js ]== */
/* ==[ Utils.js ]== */
/* ==[ Storage.js ]== */
/* ==[ Panel.js ]== */
/* ==[ WindowUtils.js ]== */
/* ==[ WindowVidHid.js ]== */
/* ==[ WindowFavorites.js ]== */
/* ==[ WindowSettings.js ]== */
/* ==[ MenuPopups.js ]== */
/* ==[ Hotkeys.js ]== */
/* ==[ ContentLoad.js ]== */
/* ==[ TimeCorrection.js ]== */
/* ==[ Players.js ]== */
/* ==[ Ajax.js ]== */
/* ==[ Pages.js ]== */
/* ==[ Spells.js ]== */
/* ==[ Form.js ]== */
/* ==[ FormSubmit.js ]== */
/* ==[ FormFile.js ]== */
/* ==[ FormCaptcha.js ]== */
/* ==[ Posts.js ]== */
/* ==[ PostPreviews.js ]== */
/* ==[ PostImages.js ]== */
/* ==[ PostBuilders.js ]== */
/* ==[ RefMap.js ]== */
/* ==[ Threads.js ]== */
/* ==[ ThreadUpdater.js ]== */
/* ==[ DelForm.js ]== */
/* ==[ Browser.js ]== */
/* ==[ BoardDefaults.js ]== */
/* ==[ BoardDetector.js ]== */
/* ==[ Misc.js ]== */
/* ==[ SvgIcons.js ]== */
/* ==[ Css.js ]== */
/* ==[ Main.js ]== */
/* ==[ Tail ]== */
}(
	window.opera && window.opera.scriptStorage,
	window.FormData,
	(x, y) => window.scrollTo(x, y),
	/* global localData */ typeof localData === 'object' ? localData : null
));
