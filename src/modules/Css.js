/* ==[ Css.js ]===============================================================================================
                                                     CSS
=========================================================================================================== */

/* eslint-disable max-len */

function scriptCSS() {
	const cont = (id, src) => `${ id }::before { content: ""; display: inline-block; vertical-align: -3px; padding: 16px 16px 0 0; margin-right: 4px; background: url(${ src }) no-repeat center; background-size: contain; }`;

	let x = `
	/* Main panel */
	#de-panel { position: fixed; right: 0; bottom: 0; z-index: 9999; border-radius: 15px 0 0 0; cursor: default; display: flex; min-height: 25px; color: #F5F5F5; }
	#de-panel-logo { flex: none; margin: auto 3px auto 0; cursor: pointer; }
	#de-panel-buttons { flex: 0 1 auto; display: flex; flex-flow: row wrap; align-items: center; padding: 0 0 0 2px; margin: 0; border-left: 1px solid #616b86; }
	.de-panel-button { display: block; flex: none; margin: 0 1px; padding: 0; transition: all .3s ease; }
	a.de-panel-button, a.de-panel-button:hover { color: inherit !important; }
	.de-panel-svg, #de-panel-logo, .de-panel-logo-svg, .de-panel-button { width: 25px; height: 25px; }
	#de-panel-goback { transform: rotate(180deg); will-change: transform; }
	#de-panel-godown { transform: rotate(90deg); will-change: transform; }
	#de-panel-goup { transform: rotate(-90deg); will-change: transform; }
	#de-panel-upd-on { fill: #32ff32; }
	#de-panel-upd-warn { fill: #fff441; }
	#de-panel-upd-off { fill: #ff3232; }
	#de-panel-audio-on > .de-panel-svg > .de-use-audio-off, #de-panel-audio-off > .de-panel-svg > .de-use-audio-on { display: none; }
	#de-panel-info { display: flex; flex: none; padding: 0 6px; margin-left: 2px; border-left: 1px solid #616b86; font: 18px serif; }
	#de-panel-info-icount::before, #de-panel-info-acount:not(:empty)::before { content: "/"; }
	#de-svg-icons, #de-svg-icons > svg { height: 0; width: 0; position: fixed; }
	.de-svg-fill { stroke: none; fill: currentColor; }
	.de-svg-stroke { stroke: currentColor; fill: none; }
	use { fill: inherit; pointer-events: none; }

	/* Panel theme */
	.de-img-btn, #de-panel, .de-win-head ${ [
		/* Gradient darkblue */
		'{ background: linear-gradient(to bottom, #7b849b, #616b86 8%, #3a414f 52%, rgba(0,0,0,0) 52%), linear-gradient(to bottom, rgba(0,0,0,0) 48%, #121212 52%, #1f2740 100%); }',
		/* Gradient blue */
		`{ background: linear-gradient(to bottom, #4b90df, #3d77be 20%, #376cb0 28%, #295591 52%, rgba(0,0,0,0) 52%), linear-gradient(to bottom, rgba(0,0,0,0) 48%, #183d77 52%, #1f4485 72%, #264c90 80%, #325f9e 100%); }
		#de-panel-buttons, #de-panel-info { border-color: #8fbbed; }`,
		/* Solid grey */
		`{ background-color: #777; }
		#de-panel-buttons, #de-panel-info { border-color: #ccc; }
		.de-panel-svg:hover { border: 2px solid #444; border-radius: 5px; box-sizing: border-box; transition: none; }`,
		/* Transparent blue */
		'{ background-color: rgba(0,20,80,.72); }',
		/* Square dark */
		`{ background: none; background-color: #333; border-radius: 0 !important; }
		#de-win-reply.de-win { border-radius: 0 !important; }
		#de-panel-buttons, #de-panel-info { border-color: #666; }`
	][Cfg.scriptStyle] }
	.de-logo { background: linear-gradient(to bottom, #7b849b, #616b86 8%, #3a414f 52%, rgba(0,0,0,0) 52%), linear-gradient(to bottom, rgba(0,0,0,0) 48%, #121212 52%, #1f2740 100%); }
	${ Cfg.scriptStyle === 2 ?
		'.de-panel-svg:hover { border: 2px solid #444; border-radius: 5px; box-sizing: border-box; transition: none; }' :
		'.de-panel-button:hover { background-color: rgba(255,255,255,.15); box-shadow: 0 0 3px rgba(143,187,237,.5); }' }\r\n`;

	if(Cfg.disabled) {
		$css(x).id = 'de-css';
		return;
	}

	x += `
	/* Windows */
	.de-win .de-btn-toggle { transform: rotate(180deg); }
	.de-resizer { position: absolute; }
	.de-resizer-bottom { height: 6px; bottom: -3px; left: 0; right: 0; cursor: ns-resize; }
	.de-resizer-left { width: 6px; top: 0px; bottom: 0px; left: -3px; cursor: ew-resize; }
	.de-resizer-right { width: 6px; top: 0px; bottom: 0px; right: -3px; cursor: ew-resize; }
	.de-resizer-top { height: 6px; top: -3px; left: 0; right: 0; cursor: ns-resize; }
	.de-win > .de-win-head { cursor: move; }
	.de-win-buttons { position: absolute; right: 0; margin: 0 2px 0 0; font-size: 0; cursor: pointer; }
	.de-win-buttons > svg { transition: background .3s ease, box-shadow .3s ease; }
	.de-win-buttons > svg:hover { background-color: rgba(255,255,255,.2); box-shadow: 0 0 2px rgba(255,255,255,.4); }
	.de-win-inpost > .de-win-head > .de-win-buttons > svg:hover { background-color: rgba(64,64,64,.15); box-shadow: 0 0 2px rgba(64,64,64,.3); }
	#de-win-cfg { width: 355px; }
	#de-win-cfg, #de-win-fav, #de-win-hid, #de-win-vid { position: fixed; max-height: 92%; overflow-x: hidden; overflow-y: auto; }
	#de-win-cfg > .de-win-body { float: none; display: block; width: auto; min-width: 0; max-width: 100% !important; padding: 0; margin: 0 !important; border: none; }
	#de-win-fav > .de-win-body, #de-win-hid > .de-win-body, #de-win-vid > .de-win-body { padding: 6px; border: 1px solid gray; }
	#de-win-hid { max-width: 60%; }
	#de-win-vid > .de-win-body { display: flex; flex-direction: column; align-items: center; }
	#de-win-vid .de-entry { white-space: normal; }
	.de-win-head { position: relative; padding: 2px; border-radius: 10px 10px 0 0; color: #F5F5F5; font: bold 14px/16px arial; text-align: center; cursor: default; }

	/* Settings window */
	.de-block { display: block; }
	#de-btn-spell-add { margin-left: auto; }
	#de-cfg-bar { display: flex; margin: 0; padding: 0; }
	.de-cfg-body { min-height: 331px; padding: 9px 7px 7px; margin-top: -1px; font: 13px/15px arial !important; -moz-box-sizing: content-box; box-sizing: content-box; }
	.de-cfg-body, #de-cfg-buttons { border: 1px solid #183d77; border-top: none; }
	.de-cfg-button { padding: 0 ${ nav.isFirefox ? '2' : '4' }px !important; margin: 0 4px; height: 21px; font: 12px arial !important; }
	#de-cfg-button-debug { padding: 0 2px; font: 13px/15px arial; }
	#de-cfg-buttons { display: flex; align-items: center; padding: 3px; }
	#de-cfg-buttons > label { flex: 1 0 auto; }
	.de-cfg-chkbox { ${ nav.isPresto ? '' : 'vertical-align: -1px !important; ' }margin: 2px 1px !important; }
	#de-cfg-info { display: flex; flex-direction: column; }
	input[type="text"].de-cfg-inptxt { width: auto; height: auto; min-height: 0; padding: 0 2px !important; margin: 1px 4px 1px 0 !important; font: 13px arial !important; }
	.de-cfg-inptxt, .de-cfg-label, .de-cfg-select { display: inline; width: auto; height: auto !important; font: 13px/15px arial !important; }
	.de-cfg-label { padding: 0; margin: 0; }
	.de-cfg-select { padding: 0 2px; margin: 1px 0; font: float: none; }
	.de-cfg-tab { flex: 1 0 auto; display: block !important; margin: 0 !important; float: none !important; width: auto !important; min-width: 0 !important; padding: 4px 0 !important; box-shadow: none !important; border: 1px solid #444 !important; border-radius: 4px 4px 0 0 !important; opacity: 1; font: bold 12px arial; text-align: center; cursor: default; background-image: linear-gradient(to bottom, rgba(132,132,132,.35) 0%, rgba(79,79,79,.35) 50%, rgba(40,40,40,.35) 50%, rgba(80,80,80,.35) 100%) !important; }
	.de-cfg-tab:hover { background-image: linear-gradient(to top, rgba(132,132,132,.35) 0%, rgba(79,79,79,.35) 50%, rgba(40,40,40,.35) 50%, rgba(80,80,80,.35) 100%) !important; }
	.de-cfg-tab[selected], .de-cfg-tab[selected]:hover { background-image: none !important; border-bottom: none !important; }
	.de-cfg-tab::${ nav.isFirefox ? '-moz-' : '' }selection { background: transparent; }
	.de-cfg-unvis { display: none !important; }
	.de-depend { padding-left: 17px; }
	#de-info-log, #de-info-stats { width: 100%; padding: 0px 7px; }
	#de-info-log { overflow-y: auto; border-left: 1px solid grey; }
	.de-info-name { flex: 1 0 auto; }
	.de-info-row { display: flex; }
	#de-info-table { display: flex; flex: 1 0 auto; }
	.de-spell-btn { padding: 0 4px; }
	#de-spell-editor { display: flex; align-items: stretch; height: 222px; padding: 2px 0; }
	#de-spell-panel { display: flex; }
	#de-spell-txt { padding: 2px !important; margin: 0; width: 100%; min-width: 0; border: none !important; outline: none !important; font: 12px courier new; ${ nav.isPresto ? '' : 'resize: none !important; ' }}
	#de-spell-rowmeter { padding: 2px 3px 0 0; overflow: hidden; min-width: 2em; background-color: #616b86; text-align: right; color: #fff; font: 12px courier new; }
	#de-win-cfg.de-win-fixed { z-index: 10001 !important; }

	/* Settings window theme */
	${ [/* Gradient darkblue */
		`#de-cfg-bar { background-color: #1f2740; }
		.de-cfg-tab { border-color: #121421 !important; }`,
		/* Gradient blue */
		`#de-cfg-bar { background-color: #325f9e; }
		.de-cfg-tab { border-color: #183d77 !important; }`,
		/* Solid grey */
		`#de-cfg-bar, #de-spell-rowmeter { background-color: #777; }
		.de-cfg-body, #de-cfg-buttons { border-color: #444; }`,
		/* Transparent blue */
		`#de-cfg-bar { background-color: rgba(0,20,80,.72); }
		.de-cfg-tab { border-color: #001450 !important; }`,
		/* Square dark */
		`#de-cfg-bar { background-color: #222; }
		.de-cfg-body, #de-cfg-buttons { border-color: #666; }`
	][Cfg.scriptStyle] }

	/* Favorites window */
	.de-entry { display: flex !important; align-items: center; float: none !important; padding: 0 !important; margin: 1px 0 !important; min-width: 0 !important; border: none !important; font-size: 13px; overflow: hidden !important; white-space: nowrap; }
	.de-entry-title { flex: auto; padding-left: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
	#de-fav-buttons, #de-hid-buttons { padding-top:6px; }
	.de-fav-entries { border-top: 1px solid rgba(80,80,80,.3); }
	.de-fav-entries-hide, .de-fav-inf-icon:not(.de-fav-closed):not(.de-fav-unavail):not(.de-fav-wait), .de-fav-closed > .de-fav-unavail-use, .de-fav-closed > .de-fav-wait-use, .de-fav-unavail > .de-fav-closed-use, .de-fav-unavail > .de-fav-wait-use, .de-fav-wait > .de-fav-closed-use, .de-fav-wait > .de-fav-unavail-use { display: none; }
	.de-fav-del-btn { margin-left: 2px; cursor: pointer; }
	.de-fav-del-btn > svg { width: 12px; height: 12px; opacity: 0.65; vertical-align: -2px; }
	.de-fav-del-btn[de-checked] > svg { color: red; background-color: rgba(255,0,0,.2); border-radius: 7px; opacity: 1; }
	.de-fav-header { display: flex; cursor: pointer; font-size: 13px; }
	.de-fav-header-btn { flex: 1 0 auto; margin-right: 2px; font-size: 11px; color: inherit; text-align: right; opacity: 0.65; }
	.de-fav-header-link { margin-left: 2px; color: inherit; font-weight: bold; text-decoration: none; outline: none; }
	.de-fav-inf { flex: none; padding: 0 4px 0 10px; font: bold 14px serif; cursor: default; }
	.de-fav-inf-icon, .de-fav-inf-iwrap  { width: 16px; height: 16px; }
	.de-fav-inf-icon { margin-bottom: -3px; }
	.de-fav-inf-new { color: #424f79; }
	.de-fav-inf-new::after { content: " +"; }
	.de-fav-inf-old { color: #4f7942; }
	.de-fav-inf-you { padding: 0 4px; margin-right: 4px; border-radius: 3px; color: #fff; background-color: #424f79; opacity: 0.65; }
	.de-fav-link { flex: none; margin-left: 2px; text-decoration: none; border: none; }
	.de-fav-table-unfold > .de-fold-block > .de-fav-entries { display: initial !important; }
	.de-fav-unavail { color: #cf4436; }
	.de-fold-block { border: 1px solid rgba(120,120,120,.8); border-radius: 2px; }
	.de-fold-block:not(:first-child) { border-top: none; }

	/* Post panel */
	.de-btn-hide > .de-btn-unhide-use, .de-btn-hide-user > .de-btn-unhide-use, .de-btn-unhide > .de-btn-hide-use, .de-btn-unhide-user > .de-btn-hide-use { display: none; }
	.de-btn-clear, .de-btn-close, .de-btn-expthr, .de-btn-fav, .de-btn-fav-sel, .de-btn-hide, .de-btn-hide-user, .de-btn-reply, .de-btn-report, .de-btn-sage, .de-btn-src, .de-btn-stick, .de-btn-stick-on, .de-btn-toggle, .de-btn-unhide, .de-btn-unhide-user { margin: 0 2px -3px 0 !important; cursor: pointer; width: 16px; height: 16px; }${
	!pr.form && !pr.oeForm ? '.de-btn-reply { display: none; }' : '' }
	.de-post-btns { margin-left: 4px; }
	.de-post-btns-back { fill: inherit; stroke: none; }
	.de-post-note:not(:empty) { color: inherit; margin: 0 4px; vertical-align: 1px; font: italic bold 12px serif; }
	.de-thread-note { font-style: italic; }

	/* Sauce buttons */
	${ cont('.de-src-google', 'data:image/gif;base64,R0lGODlhEAAQAMQAAIy0+tHh/gJc8Qlh8UyM9H2r9/3///7//x+OfACSJy+mTZHQos3Te////f///v3HAP+uAPzWjvWTWeUTAPSdl/79/f////39/f///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABgALAAAAAAQABAAAAVuICaKh2Eax6hih+W+bqoaLjXdE+UaY2vhwInrInLhdBYbDEOL3GBQS4X2gEiiUBoEAhMIBl6CpaHlvrxocaO1XUQBgsLYxUgkot7AGONS2N0WCwgCYhZFfXaJCQguDiMvC34JCoCOKlgvK49QKyEAOw==') }
	${ cont('.de-src-yandex', 'data:image/gif;base64,R0lGODlhEAAQAMQAAP////v7+/r5+fb29vHx8eLi4tnZ2dTU1NDQ0MvLy8fHx8TExPzJv/immvlXRvq0re4UEdeGhtbFxcnJyby8vKampm5ubv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABcALAAAAAAQABAAAAVx4CWOZCkOQKqq5uoCQhnMQuPcc2CQuc3YuQBJQHQ8BA8HkUgYDZ6Qx+ABeVoVIoL2RmhAtODmpUD23iDkdEFkaBsiEAfE3a6IDngJJALH4ycjCIJyCXCCgiQJhXuLigl2IwqSk5QUJRQLmZqaFiaeniEAOw==') }
	${ cont('.de-src-tineye', 'data:image/gif;base64,R0lGODlhEAAQAMQAAP///wAAAAwOEhg4UDZ7skGNxkuf3Vycxx4nLerw9DlSX2FnanO21Epxg4LO62KOnpXj+ZGcmb7CvbZ6RfxmAIxBCzsGAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABcALAAAAAAQABAAAAWlYGIUZGGc6HgkxzSRozIgdHMUx0NR5hH8v8VjeFsoDAyFpcKcQByMnIGgYDAikmxkOLQWqNAGQhAQLBC/BgSXC0QivwgAgFbjHLQ5XDKXBBRrBA80WAABRgkJPwxfDw2HCYYBfHABDSQMDgoIEgs/ZgoPDmuYEFEHmQ6jT5ckBKirEE8HCgEWJQe5ZwJjQBYRBwQMsk8RFgJkP04sVrHGNAEVEAAhADs=') }
	${ cont('.de-src-saucenao', 'data:image/gif;base64,R0lGODlhEAAQAIAAAP///wAAACwAAAAAEAAQAAACJ4yPacDtvpQCkU1KT0P75i49mbSAZACd6HN2pmbBI7pe9K1+4q5KBQA7') }
	${ cont('.de-src-iqdb', 'data:image/gif;base64,R0lGODlhEAAQAMQAAP//////AP8A//8AAAD//wD/AAAA/wAAANx/hV1ISW9YWvLOd/u0T+WlTNaqcKdtMv/r1mxML7OCVoxtUbmmlfPRuKKGeHpcTvK3nEEvKGpRTCcbGU48OYVua3tkYv///yH5BAEAAB8ALAAAAAAQABAAAAW4INV5ZDcmibM0iVJRnukpmnJJDdNwnDWSk4vCNMnpGJXfwqHReDQJTuTxmEhmqoTFEtRsNhltRTFZTBKUl2IzAmeE2csFA8kcKADLl5NgSDgaGRYAFVYQABkRgAxnGhcdEJEVhxYSDhwNEQkaEhSRGBgIGBUOGBwXERkcExyeFaGjr4E8qgcHDpKgkQpRGhwZYA4Vw6CvPBOpwD0ODlMSoxcJOQ8ZyhccBxkSkRRFDw4SD1/jF5MQIQA7') }
	${ cont('.de-src-tracemoe', 'data:image/gif;base64,R0lGODlhEAAPALMAAAAAAP///9fY18HBwTg4ODw1No6PjoFnZhoBAXNGRf/V1KmRkf///wAAAAAAAAAAACH5BAEAAAwALAAAAAAQAA8AAAQ5EMhJq7046w0I9hMhBAIoiSQ4BiS1tgQrg7EceIM8UDm7S4aBwRIcYgoFjmSxQHASCkWCc6gelJkIADs=') }

	/* Posts counter */
	.de-post-counter { margin: 0 4px 0 2px; vertical-align: 1px; font: bold 11px tahoma; color: #4f7942; cursor: default; }
	.de-post-counter-deleted { color: #727579; }
	.de-post-counter-you { vertical-align: 1px; font: bold 11px tahoma; color: #505a7a; cursor: default; }

	/* Text markup buttons */
	.de-markup-back { fill: #f0f0f0; stroke: #808080; }
	#de-txt-panel { display: block; font-weight: bold; cursor: pointer; }
	#de-txt-panel > div { display: inline-block; }
	#de-txt-panel > div > svg { width: 23px; height: 22px; margin: 0 2px; }\r\n`;

	if('animation' in docBody.style) {
		x += `
		/* Show/hide animation */
		@keyframes de-open { 0% { transform: translateY(-100%); } 100% { transform: translateY(0); } }
		@keyframes de-close { 0% { transform: translateY(0); } 100% { transform: translateY(-100%); } }
		@keyframes de-blink {
			0%, 100% { transform: translateX(0); }
			10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
			20%, 40%, 60%, 80% { transform: translateX(10px); }
		}
		@keyframes de-post-open-tl { from { transform: translate(-50%,-50%) scale(0); opacity: 0; } }
		@keyframes de-post-open-bl { from { transform: translate(-50%,50%) scale(0); opacity: 0; } }
		@keyframes de-post-open-tr { from { transform: translate(50%,-50%) scale(0); opacity: 0; } }
		@keyframes de-post-open-br { from { transform: translate(50%,50%) scale(0); opacity: 0; } }
		@keyframes de-post-close-tl { to { transform: translate(-50%,-50%) scale(0); opacity: 0; } }
		@keyframes de-post-close-bl { to { transform: translate(-50%,50%) scale(0); opacity: 0; } }
		@keyframes de-post-close-tr { to { transform: translate(50%,-50%) scale(0); opacity: 0; } }
		@keyframes de-post-close-br { to { transform: translate(50%,50%) scale(0); opacity: 0; } }
		@keyframes de-post-new { from { transform: translate(0,-50%) scaleY(0); opacity: 0; } }
		@keyframes de-win-open { from { transform: translate(0,50%) scaleY(0); opacity: 0; } }
		@keyframes de-win-close { to { transform: translate(0,50%) scaleY(0); opacity: 0; } }
		.de-pview-anim { animation-duration: .2s; animation-timing-function: ease-in-out; animation-fill-mode: both; }
		.de-open { animation: de-open .15s ease-out both; }
		.de-close { animation: de-close .15s ease-in both; }
		.de-blink { animation: de-blink .7s ease-in-out both; }
		.de-post-new { animation: de-post-new .2s ease-out both; }
		.de-win-open { animation: de-win-open .2s ease-out backwards; }
		.de-win-close { animation: de-win-close .2s ease-in both; }\r\n`;
	} else {
		Cfg.animation = 0;
	}

	let p = Math.max(Cfg.minImgSize || 0, 50);
	x += `
	/* Full images */
	.de-img-embed, .de-fullimg { display: block; border: none; outline: none; cursor: pointer; image-orientation: from-image; }
	.de-img-embed { max-width: 200px; max-height: 200px; }
	.de-fullimg, .de-fullimg-wrap-link { flex: 0 0 auto; transition: none !important; }
	.de-fullimg-after { clear: left; }
	.de-fullimg-center { position: fixed; margin: 0 !important; z-index: 9999; background-color: #ccc; border: 1px solid black !important; -moz-box-sizing: content-box; box-sizing: content-box; }
	.de-fullimg-info { position: absolute; bottom: -22px; left: 50%; padding: 1px 4px; transform: translateX(-50%); background-color: rgba(64,64,64,.8); white-space: nowrap; line-height: 17px; }
	.de-fullimg-info > .de-btn-src { color: #fff; }
	.de-fullimg-link { float: none !important; display: inline-block; font: bold 12px tahoma; color: #fff !important; text-decoration: none; outline: none; }
	.de-fullimg-link:hover { color: #fff !important; background: rgba(64,64,64,.6); }
	.de-fullimg-load { position: absolute; z-index: 2; width: 50px; height: 50px; top: 50%; left: 50%; margin: -25px; }
	.de-fullimg-rotated { transform-origin: top left; width: auto !important; max-width: none !important; }
	.de-fullimg-video-hack { width: 100%; height: calc(100% - 40px); position: absolute; z-index: 1; cursor: pointer; }
	.de-fullimg-wrap { position: relative; margin-bottom: 24px; }
	.de-fullimg-wrap-center, .de-fullimg-wrap-link, .de-fullimg-video > video { width: inherit; height: inherit; }
	.de-fullimg-wrap-center > .de-fullimg-wrap-link > .de-fullimg { height: 100%; }
	.de-fullimg-wrap-inpost { min-width: ${ p }px; min-height: ${ p }px; float: left; ${ aib.multiFile ? '' : 'margin: 2px 5px; -moz-box-sizing: border-box; box-sizing: border-box; ' } }
	.de-fullimg-wrap-nosize > .de-fullimg-wrap-link > .de-fullimg { opacity: 0.3; }
	.de-img-btn { position: fixed; top: 50%; z-index: 10000; height: 36px; width: 36px; border-radius: 10px 0 0 10px; color: #f0f0f0; cursor: pointer; }
	.de-img-btn > svg { height: 32px; width: 32px; margin: 2px; }
	#de-img-btn-auto { right: 0; margin-top: 58px; }
	.de-img-btn-auto-on { color: #ffe100; }
	#de-img-btn-next { right: 0; margin-top: -18px; }
	.de-img-btn-none { display: none; }
	#de-img-btn-prev { left: 0; margin-top: -18px; transform: scaleX(-1); }
	#de-img-btn-rotate { right: 0; margin-top: 20px; }
	.de-img-name { text-decoration: none !important; }

	/* Embedders */
	${ cont('.de-video-link.de-ytube', 'https://youtube.com/favicon.ico') }
	${ cont('.de-video-link.de-vimeo', 'https://vimeo.com/favicon.ico') }
	${ cont('.de-img-arch', 'data:image/gif;base64,R0lGODlhEAAQALMAAF82SsxdwQMEP6+zzRA872NmZQesBylPHYBBHP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAQARTMMlJaxqjiL2L51sGjCOCkGiBGWyLtC0KmPIoqUOg78i+ZwOCUOgpDIW3g3KJWC4t0ElBRqtdMr6AKRsA1qYy3JGgMR4xGpAAoRYkVDDWKx6NRgAAOw==') }
	${ cont('.de-img-audio', 'data:image/gif;base64,R0lGODlhEAAQAKIAAGya4wFLukKG4oq3802i7Bqy9P///wAAACH5BAEAAAYALAAAAAAQABAAQANBaLrcHsMN4QQYhE01OoCcQIyOYQGooKpV1GwNuAwAa9RkqTPpWqGj0YTSELg0RIYM+TjOkgba0sOaAEbGBW7HTQAAOw==') }
	.de-current::after { content: " \u25CF"; }
	.de-img-arch, .de-img-audio { margin-left: 4px; color: inherit; text-decoration: none; font-weight: bold; }
	.de-mp3 { margin: 5px 20px; }
	.de-video-obj { margin: 5px 20px; white-space: nowrap; }
	.de-video-obj-inline { display: inline-block; }
	#de-video-btn-resize { padding: 0 14px 8px 0; margin: 0 8px; border: 2px solid; border-radius: 2px; }
	#de-video-btn-hide, #de-video-btn-prev { margin-left: auto; }
	#de-video-buttons { display: flex; margin-bottom: 2px; align-items: center; width: 100%; line-height: 16px; }
	#de-video-buttons > a:not(:hover) { color: inherit; }
	.de-video-expanded { width: 854px !important; height: 480px !important; }
	#de-video-list { padding: 0 0 4px; overflow-y: auto; width: 100%; }
	.de-video-refpost { margin: 0 3px; color: inherit; text-decoration: none; cursor: pointer; }
	.de-video-resizer::after { content: "\u2795"; margin: 0 -15px 0 3px; vertical-align: 6px; color: #000; font-size: 12px; cursor: pointer; }
	.de-video-player, .de-video-thumb { width: 100%; height: 100%; }
	a.de-video-player { display: inline-block; position: relative; border-spacing: 0; border: none; }
	a.de-video-player::after { content: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAWCAQAAACMYb/JAAAArklEQVR4AYXSr05CYRjA4cPGxjRosTijdvNJzmD1CrwAvQWugASNwGg0MoErOIVCPCMx0hmBMaAA4mPX8/2rT/i+9/1lPu0M3MtCN1OAvS+NEFkDmHqoJwcAbHzUkb9n7C5FqLynCAzdpAhLrynCRc9VnEDpKUWYpUmZIlt5nBQeY889amvGPj33HBvdt45WbAELeWyNP/qu/8dwBrDyVp9UBRi5DYXZdTLxEs77F5bCVAHlDJ1UAAAAAElFTkSuQmCC"); position: absolute;top: 50%; left: 50%; padding: 12px 24px; margin: -22px 0 0 -32px; background-color: rgba(255,0,0,.4); border-radius: 8px; line-height: 0; }
	a.de-video-player:hover::after { background-color: rgba(255,0,0,.7); }
	.de-video-title[de-time]::after { content: " [" attr(de-time) "]"; color: red; }
	.de-vocaroo > embed { display: inline-block; }
	video { background: black; }

	/* File inputs */
	.de-file { display: inline-block; vertical-align: top; margin: 1px; height: ${ p = aib.multiFile ? 90 : 130 }px; width: ${ p }px; text-align: center; background-color: rgba(96,96,96,.15); border: 1px dashed grey; }
	.de-file > .de-file-img > div { display: flex; justify-content: center; align-items: center; height: ${ p }px; cursor: pointer; }
	.de-file > .de-file-utils { display: none; height: 18px; margin-top: -20px; padding: 1px 0; background: rgba(64,64,64,.6); position: relative; -moz-box-sizing: initial; box-sizing: initial; }
	.de-file > .de-file-utils > .de-file-rarmsg { display: block; position: absolute; bottom: 20px; width: 100%; margin: 0; background: rgba(64,64,64,.6); color: #fff; }
	#de-file-area { margin-top: 1px; width: 275px; min-width: 100%; max-width: 100%; overflow-x: auto; overflow-y: hidden; white-space: nowrap; }
	.de-file-drag { background: rgba(96,96,96,.8); border: 1px solid grey; opacity: .7; }
	.de-file:hover:not(.de-file-drag) > .de-file-utils { display: block !important; }
	img.de-file-img, video.de-file-img { max-width: ${ p }px; max-height: ${ p }px; }
	.de-file-input { max-width: 300px; }
	.de-file-input + .de-file-utils { margin-left: 4px; }
	.de-file-off > .de-file-img > div::after { content: "${ Lng.dropFileHere[lang] }"; display: block; width: 80px; margin: 0 auto; font: 11px arial; opacity: .8; white-space: initial; }
	.de-file-rarmsg { margin: 0 2px; vertical-align: 4px; font: bold 11px tahoma; cursor: default; }
	.de-file-btn-del, .de-file-btn-rar, .de-file-btn-ren, .de-file-btn-txt { margin: 0 1px; cursor: pointer; }
	.de-file-btn-del > svg, .de-file-btn-rar > svg, .de-file-btn-ren > svg, .de-file-btn-txt > svg { width: 16px; height: 16px; }
	.de-file-spoil { margin: 0 3px; vertical-align: 1px; }
	.de-file-txt-add { font-weight: bold; width: 21px; padding: 0 !important; }
	.de-file-txt-input { border: 1px solid #9c9c9c; padding: 2px; font: 12px/16px sans-serif; }
	.de-file-txt-noedit { background: rgba(255,255,255,.5); cursor: pointer; }
	.de-file-utils { display: inline-block; float: none; vertical-align: -3px; }

	/* Reply form */
	.de-parea { text-align: center; }
	.de-parea-btn-close::after { content: "${ Lng.hideForm[lang] }"; }
	.de-parea-btn-thr::after { content: "${ Lng.makeThr[lang] }"; }
	.de-parea-btn-reply::after { content: "${ Lng.makeReply[lang] }"; }
	#de-pform > form { padding: 0; margin: 0; border: none; }
	#de-pform input[type="text"], #de-pform input[type="file"] { width: 200px; }
	#de-resizer-text { display: inline-block !important; float: none !important; padding: 5px; margin: ${ nav.isPresto ? '-2px -10px' : '0 0 -2px -10px' }; border-bottom: 2px solid #666; border-right: 2px solid #666; cursor: se-resize; }
	.de-win-inpost { float: none; clear: left; display: inline-block; width: auto; padding: 3px; margin: 2px 0; }
	.de-win-inpost > .de-resizer { display: none; }
	.de-win-inpost > .de-win-head { background: none; color: inherit; }
	#de-win-reply { width: auto !important; min-width: 0; padding: 0 !important; border: none !important; }
	#de-win-reply.de-win { position: fixed !important; padding: 0 !important; margin: 0 !important; border-radius: 10px 10px 0 0; }
	#de-win-reply.de-win > .de-win-body { padding: 2px 2px 0 1px; border: 1px solid gray; }
	#de-win-reply.de-win .de-textarea { min-width: 98% !important; resize: none !important; }
	#de-win-reply.de-win #de-resizer-text { display: none !important; }
	#de-sagebtn { display: inline-block; margin: 3px 4px 0 4px !important; cursor: pointer; }
	.de-textarea { display: inline-block; padding: 3px !important; min-width: 275px !important; min-height: 90px !important; resize: both; transition: none !important; }

	/* Thread navigation */
	#de-thr-navarrow { display: none; position: absolute; top: 50%; left: 34px; transform: translateY(-50%); width: 7px; height: 7px; }
	#de-thr-navpanel { color: #F5F5F5; height: 98px; width: 41px; position: fixed; top: 50%; left: 0px; padding: 0; margin: -49px 0 0; background: #777; border: 1px solid #525252; border-left: none; border-radius: 0 5px 5px 0; cursor: pointer; z-index: 1000; }
	.de-thr-navpanel-hidden { opacity: .7; margin-left: -34px !important; }
	.de-thr-navpanel-hidden > #de-thr-navarrow { display: initial; }
	#de-thr-navup { padding: 12px 9px 13px 8px; border-radius: 0 5px 0 0; }
	#de-thr-navdown { padding: 13px 9px 12px 8px; border-radius: 0 0 5px 0; }
	#de-thr-navup, #de-thr-navdown { width: 41px; height: 49px; -moz-box-sizing: border-box; box-sizing: border-box; }
	:not(.de-thr-navpanel-hidden) > #de-thr-navup:hover, :not(.de-thr-navpanel-hidden) > #de-thr-navdown:hover { background: #555; }

	/* Other */
	.de-abtn { text-decoration: none !important; outline: none; }
	.de-button { flex: none; padding: 0 ${ nav.isFirefox ? 2 : 4 }px !important; margin: 1px 2px; height: 24px; font: 13px arial; }
	.de-editor { display: block; font: 12px courier new; width: 619px; height: 337px; tab-size: 4; -moz-tab-size: 4; -o-tab-size: 4; }
	.de-hidden { float: left; overflow: hidden !important; margin: 0 !important; padding: 0 !important; border: none !important; width: 0 !important; height: 0 !important; display: inline !important; }
	.de-input-key { padding: 0 2px !important; margin: 0 !important; font: 13px/15px arial !important; }
	input[type="text"].de-input-selected { background: rgba(255,255,150,0.4) !important }
	.de-link-parent { outline: 1px dotted !important; }
	.de-link-pview { font-weight: bold; }
	.de-link-ref { text-decoration: none; }
	.de-list { padding-top: 4px; }
	.de-list::before { content: "\u25CF"; margin-right: 4px; }
	.de-logo { display: inline-block; margin-right: 10px; fill: inherit; color: #F5F5F5; border-radius: 80px 0 0 0; }
	.de-logo > svg { width: 122px; height: 122px; }
	.de-menu { padding: 0 !important; margin: 0 !important; width: auto !important; min-width: 0 !important; z-index: 10002; border: 1px solid grey !important; text-align: left; }
	.de-menu-item { display: block; padding: 3px 10px; color: inherit; text-decoration: none; font: 13px arial; white-space: nowrap; cursor: pointer; }
	.de-menu-item:hover { background-color: #222; color: #fff; }
	.de-omitted { color: grey; }
	.de-omitted::before { content: "${ Lng.postsOmitted[lang] }"; }
	.de-popup { overflow: visible !important; clear: both !important; width: auto !important; min-width: 0pt !important; padding: 8px !important; margin: 1px !important; border: 1px solid grey !important; display: block !important; float: right !important; max-width: initial !important; }
	.de-popup-btn { display: inline-block; vertical-align: top; color: green; cursor: pointer; line-height: 1.15; }
	.de-popup-msg { display: inline-block; white-space: pre-wrap; }
	.de-popup-msg > hr { margin: 0 !important; }
	.de-post-hiddencontent { display: none !important; }
	.de-pview { position: absolute; width: auto; min-width: 0; z-index: 9999; border: 1px solid grey !important; margin: 0 !important; display: block !important; }
	.de-pview-info { padding: 3px 6px !important; }
	.de-ref-del::after { content: " (Del)"; }
	.de-ref-op::after { content: " (OP)"; }
	.de-refcomma:last-child { display: none; }
	.de-refmap { margin: 10px 4px 4px 4px; font-size: 75%; font-style: italic; }
	.de-refmap::before { content: "${ Lng.replies[lang] } "; }
	.de-replies-hide::after { content: "${ Lng.hidePosts[lang] }"; }
	.de-replies-show::after { content: "${ Lng.showPosts[lang] }"; }
	.de-thr-buttons { clear: left; margin-top: 5px; }
	${ aib.t ? '.de-thr-buttons > .de-btn-reply { display: none; }' : '' }
	.de-thr-collapse-link::after { content: "${ Lng.collapseThr[lang] }"; }
	.de-thr-hid { display: block; padding: 2px; }
	.de-thr-updater-link::after { content: "${ Lng.getNewPosts[lang] }"; }
	#de-updater-count::before { content: ": "; }
	.de-viewed { color: #747488 !important; }
	.de-wait, .de-fav-wait , .de-fullimg-load { animation: de-wait-anim 1s linear infinite; }
	.de-wait { margin: 0 2px -3px 0 !important; width: 16px; height: 16px; }
	#de-wrapper-popup { overflow-x: hidden !important; overflow-y: auto !important; -moz-box-sizing: border-box; box-sizing: border-box; max-height: 100vh; position: fixed; right: 0; top: 0; z-index: 9999; font: 14px arial; cursor: default; }
	@keyframes de-wait-anim { to { transform: rotate(360deg); } }
	form > hr { clear: both }`;

	$css(x).id = 'de-css';
	$css('').id = 'de-css-dynamic';
	$css('').id = 'de-css-user';
	updateCSS();
}

function updateCSS() {
	const x = `
	.de-video-obj { width: ${ Cfg.YTubeWidth }px; height: ${ Cfg.YTubeHeigh }px; }
	.de-new-post { ${ nav.isPresto ?
		'border-left: 4px solid rgba(107,134,97,.7); border-right: 4px solid rgba(107,134,97,.7)' :
		'box-shadow: 6px 0 2px -2px rgba(107,134,97,.8), -6px 0 2px -2px rgba(107,134,97,.8)'
	} !important; }
	.de-selected, .de-input-error { ${ nav.isPresto ?
		'border-left: 4px solid rgba(220,0,0,.7); border-right: 4px solid rgba(220,0,0,.7)' :
		'box-shadow: 6px 0 2px -2px rgba(220,0,0,.8), -6px 0 2px -2px rgba(220,0,0,.8)'
	} !important; }
	${ Cfg.markMyPosts ?
		`.de-mypost { ${ nav.isPresto ?
			'border-left: 4px solid rgba(97,107,134,.7); border-right: 4px solid rgba(97,107,134,.7)' :
			'box-shadow: 6px 0 2px -2px rgba(97,107,134,.8), -6px 0 2px -2px rgba(97,107,134,.8)'
		} !important; }
		.de-mypost-reply { border-left: 5px dotted rgba(97,107,134,.8) !important; }` : '' }
	${ Cfg.markMyLinks ?
		`.de-ref-del.de-ref-you::after { content: " (Del)(You)"; }
			.de-ref-op.de-ref-you::after { content: " (OP)(You)"; }
			.de-ref-you::after { content: " (You)"; }` :
		'.de-post-counter-you { display: none; }' }
	${ Cfg.postBtnsCSS === 0 ?
		`.de-btn-expthr, .de-btn-fav, .de-btn-hide, .de-btn-reply, .de-btn-report, .de-btn-src, .de-btn-stick, .de-btn-unhide { fill: rgba(0,0,0,0); color: currentColor; }
			.de-btn-fav-sel, .de-btn-hide-user, .de-btn-sage, .de-btn-stick-on, .de-btn-unhide-user { fill: rgba(0,0,0,0); color: #F00; }` :
		`.de-btn-expthr, .de-btn-fav, .de-btn-hide, .de-btn-reply, .de-btn-report, .de-btn-sage, .de-btn-src, .de-btn-stick, .de-btn-unhide { color: #F5F5F5; }
			.de-btn-expthr, .de-btn-fav, .de-btn-fav-sel, .de-btn-hide, .de-btn-hide-user, .de-btn-reply, .de-btn-report, .de-btn-src, .de-btn-stick, .de-btn-stick-on, .de-btn-unhide, .de-btn-unhide-user { fill: ${ Cfg.postBtnsCSS === 1 && !nav.isPresto ? 'url(#de-btn-back-gradient)' : Cfg.postBtnsBack }; }
			.de-btn-fav-sel { color: #FFE100; }
			.de-btn-hide-user { color: #BFFFBF; }
			.de-btn-sage { fill: #4B4B4B; }
			.de-btn-stick-on { color: #BFFFBF; }
			.de-btn-unhide-user { color: #FFBFBF; }` }
	.de-fullimg-wrap-inpost > .de-fullimg { ${ Cfg.resizeImgs ?
		`max-width: 100%;${ Cfg.resizeImgs === 2 ? ' max-height: 96vh' : '' }` :
		'width: auto' }; }
	${ Cfg.maskImgs ?
		`${ aib.qPostImg }, .de-img-embed, .de-video-obj { opacity: ${ Cfg.maskVisib / 100 } !important; }
			${ aib.qPostImg.split(', ').join(':hover, ') }:hover, .de-img-embed:hover, .de-video-obj:hover { opacity: 1 !important; }
			.de-video-obj:not(.de-video-obj-inline) { clear: both; }` : '' }
	${ Cfg.imgNames === 1 ?
		`.de-img-name { display: inline-block; max-width: 165px; overflow: hidden; white-space: nowrap; vertical-align: bottom; text-overflow: ellipsis; }
			.de-img-name::before { content: "." attr(de-ext); float: right; }` : '' }
	${ Cfg.imgNames === 2 ? '.de-img-name { text-transform: capitalize; }' : '' }
	${ Cfg.widePosts ? '.de-reply { float: none; width: 99.9%; margin-left: 0; }' : '' }
	${ Cfg.strikeHidd ? '.de-link-hid { text-decoration: line-through !important; }' : '' }
	${ Cfg.noSpoilers === 1 ?
		`.spoiler, s { color: #F5F5F5 !important; background-color: #888 !important; }
			.spoiler > a, s > a:not(:hover) { color: #F5F5F5 !important; background-color: #888 !important; }` : '' }
	${ Cfg.noSpoilers === 2 ?
		`.spoiler, s { color: inherit !important; }
			.spoiler > a, s > a:not(:hover) { color: inherit !important; }` : '' }
	${ Cfg.addSageBtn ? '' : '#de-sagebtn, ' }
	${ Cfg.delHiddPost === 1 || Cfg.delHiddPost === 3 ?
		'.de-thr-hid, .de-thr-hid + div + br, .de-thr-hid + div + hr, .de-thr-hid + div + br + hr, .de-thr-hid + div + div + hr, ' :
		'.de-thr-hid:not([style="display: none;"]) + div + br, ' }
	${ Cfg.imgNavBtns ? '' : '.de-img-btn, ' }
	${ Cfg.imgInfoLink ? '' : '.de-fullimg-info, ' }
	${ Cfg.noPostNames ? `${ aib.qPostName }, ${ aib.qPostTrip }, ` : '' }
	${ Cfg.noBoardRule ? `${ aib.qFormRules }, ` : '' }
	${ Cfg.panelCounter ? '' : '#de-panel-info, ' }
	${ Cfg.removeHidd ? '.de-link-ref.de-link-hid, .de-link-ref.de-link-hid + .de-refcomma, ' : '' }
	${ Cfg.showHideBtn ? '' : '.de-btn-hide, ' }
	${ Cfg.showRepBtn ? '' : '.de-btn-reply, ' }
	${ Cfg.thrBtns || aib.t ? '' : '.de-thr-updater, ' }
	${ Cfg.thrBtns === 1 || Cfg.thrBtns === 2 && !aib.t ? '' : '.de-thr-buttons > svg, ' }
	${ Cfg.ajaxPosting ? '' : '.de-file-btn-rar, .de-file-btn-txt, ' }
	${ Cfg.fileInputs ? '' : '.de-file-txt-wrap, .de-file-btn-txt, ' }
	${ !aib.kusaba && (aib.multiFile || Cfg.fileInputs !== 2) ?
		'#de-pform form > table > tbody > tr > td:not([colspan]):first-child, #de-pform form > table > tbody > tr > th:first-child, ' : ''
	}body > hr, .postarea, .theader { display: none !important; }\r\n`;
	$id('de-css-dynamic').textContent = (x + aib.css).replace(/[\r\n\t]+/g, '\r\n\t');
	$id('de-css-user').textContent = Cfg.userCSS ? Cfg.userCSSTxt : '';
}

/* eslint-enable max-len */
