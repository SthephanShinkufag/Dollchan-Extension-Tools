/*============================================================================================================
                                                     CSS
============================================================================================================*/

function scriptCSS() {
	const cont = (id, src) => id + `::before { content: ""; padding-right: 16px; margin-right: 4px; background: url(${ src }) no-repeat center; background-size: contain; }`;
	const gif = (id, src) => id + ` { background-image: url(data:image/gif;base64,${ src }); background-repeat: no-repeat; background-position: center; }`;

	// Main panel
	let p, x = `#de-panel { position: fixed; right: 0; bottom: 0; z-index: 9999; border-radius: 15px 0 0 0; cursor: default; display: flex; min-height: 25px; color: #F5F5F5; }
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
	#de-panel-info { flex: none; padding: 0 6px; margin-left: 2px; border-left: 1px solid #616b86; font: 18px serif; }
	#de-panel-info-icount::before, #de-panel-info-acount:not(:empty)::before { content: "/"; }
	.de-svg-back { fill: inherit; stroke: none; }
	.de-svg-stroke { stroke: currentColor; fill: none; }
	.de-svg-fill { stroke: none; fill: currentColor; }
	use { fill: inherit; pointer-events: none; }`;

	switch(Cfg.scriptStyle) {
	case 0: // Gradient darkblue
		x += '#de-panel, .de-win-head { background: linear-gradient(to bottom, #7b849b, #616b86 8%, #3a414f 52%, rgba(0,0,0,0) 52%), linear-gradient(to bottom, rgba(0,0,0,0) 48%, #121212 52%, #1f2740 100%); }';
		break;
	case 1: // gradient blue
		x += `#de-panel, .de-win-head { background: linear-gradient(to bottom, #4b90df, #3d77be 20%, #376cb0 28%, #295591 52%, rgba(0,0,0,0) 52%), linear-gradient(to bottom, rgba(0,0,0,0) 48%, #183d77 52%, #1f4485 72%, #264c90 80%, #325f9e 100%); }
			#de-panel-buttons, #de-panel-info { border-color: #8fbbed; }`;
		break;
	case 2: // solid grey
		x += `#de-panel, .de-win-head { background-color: #777; }
			#de-panel-buttons, #de-panel-info { border-color: #ccc; }
			.de-panel-svg:hover { border: 2px solid #444; border-radius: 5px; box-sizing: border-box; transition: none; }`;
		break;
	case 3: // transparent blue
		x += '#de-panel, .de-win-head { background-color: rgba(0,20,80,.72); }';
		break;
	case 4: // square dark
		x += `#de-panel, .de-win-head { background: none; background-color: #333; border-radius: 0 !important; }
			#de-win-reply.de-win { border-radius: 0 !important; }
			#de-panel-buttons, #de-panel-info { border-color: #666; }`;
	}
	if(Cfg.scriptStyle === 2) {
		x += '.de-panel-svg:hover { border: 2px solid #444; border-radius: 5px; box-sizing: border-box; transition: none; }';
	} else {
		x += '.de-panel-button:hover { background-color: rgba(255,255,255,.15); box-shadow: 0 0 3px rgba(143,187,237,.5); }';
	}

	if(Cfg.disabled) {
		$css(x).id = 'de-css';
		return;
	}

	// Windows
	x += `.de-win .de-btn-toggle { transform: rotate(180deg); }
	.de-resizer { position: absolute; }
	.de-resizer-bottom { height: 6px; bottom: -3px; left: 0; right: 0; cursor: ns-resize; }
	.de-resizer-left { width: 6px; top: 0px; bottom: 0px; left: -3px; cursor: ew-resize; }
	.de-resizer-right { width: 6px; top: 0px; bottom: 0px; right: -3px; cursor: ew-resize; }
	.de-resizer-top { height: 6px; top: -3px; left: 0; right: 0; cursor: ns-resize; }
	.de-win > .de-win-head { cursor: move; }
	.de-win-buttons { position: absolute; right: 0; margin: 0 2px 0 0; font-size: 0; cursor: pointer; }
	#de-win-cfg { width: 355px; }
	#de-win-cfg, #de-win-fav, #de-win-hid, #de-win-vid { position: fixed; max-height: 92%; overflow-x: hidden; overflow-y: auto; }
	#de-win-cfg > .de-win-body { float: none; display: block; width: auto; min-width: 0; max-width: 100% !important; padding: 0; margin: 0 !important; border: none; }
	#de-win-fav > .de-win-body, #de-win-hid > .de-win-body, #de-win-vid > .de-win-body { padding: 9px; border: 1px solid gray; }
	#de-win-hid { max-width: 60%; }
	#de-win-vid > .de-win-body { display: flex; flex-direction: column; align-items: center; }
	#de-win-vid .de-entry { white-space: normal; }
	.de-win-head { position: relative; padding: 2px; border-radius: 10px 10px 0 0; color: #F5F5F5; font: bold 14px/16px arial; text-align: center; cursor: default; }` +

	// Settings window
	`.de-block { display: block; }
	#de-btn-spell-add { margin-left: auto; }
	#de-cfg-bar { display: flex; margin: 0; padding: 0; }
	.de-cfg-body { min-height: 327px; padding: 9px 7px 7px; margin-top: -1px; font: 13px/15px arial !important; box-sizing: content-box; -moz-box-sizing: content-box; }
	.de-cfg-body, #de-cfg-buttons { border: 1px solid #183d77; border-top: none; }
	.de-cfg-button { padding: 0 ${ nav.Firefox ? '2' : '4' }px !important; margin: 0 4px; height: 21px; font: 12px arial !important; }
	#de-cfg-buttons { display: flex; align-items: center; padding: 3px; }
	#de-cfg-buttons > label { flex: 1 0 auto; }
	.de-cfg-chkbox { ${ nav.Presto ? '' : 'vertical-align: -1px !important; ' }margin: 2px 1px !important; }
	.de-cfg-depend { padding-left: 17px; }
	.de-cfg-inptxt { width: auto; padding: 0 2px !important; margin: 1px 4px 1px 0 !important; font: 13px arial !important; }
	.de-cfg-label { padding: 0; margin: 0; }
	.de-cfg-select { padding: 0 2px; margin: 1px 0; font: 13px arial !important; }
	.de-cfg-tab { flex: 1 0 auto; display: block !important; margin: 0 !important; float: none !important; width: auto !important; min-width: 0 !important; padding: 4px 0 !important; box-shadow: none !important; border: 1px solid #444 !important; border-radius: 4px 4px 0 0 !important; opacity: 1; font: bold 12px arial; text-align: center; cursor: default; background-image: linear-gradient(to bottom, rgba(132,132,132,.35) 0%, rgba(79,79,79,.35) 50%, rgba(40,40,40,.35) 50%, rgba(80,80,80,.35) 100%) !important; }
	.de-cfg-tab:hover { background-image: linear-gradient(to top, rgba(132,132,132,.35) 0%, rgba(79,79,79,.35) 50%, rgba(40,40,40,.35) 50%, rgba(80,80,80,.35) 100%) !important; }
	.de-cfg-tab[selected], .de-cfg-tab[selected]:hover { background-image: none !important; border-bottom: none !important; }
	.de-cfg-tab::${ nav.Firefox ? '-moz-' : '' }selection { background: transparent; }
	.de-cfg-unvis { display: none; }
	#de-info-log, #de-info-stats { width: 100%; padding: 0px 7px; }
	#de-info-log { overflow-y: auto; border-left: 1px solid grey; }
	.de-info-name { flex: 1 0 auto; }
	.de-info-row { display: flex; }
	#de-info-table { display: flex; height: 267px; }
	.de-spell-btn { padding: 0 4px; }
	#de-spell-editor { display: flex; align-items: stretch; height: 235px; padding: 2px 0; }
	#de-spell-panel { display: flex; }
	#de-spell-txt { padding: 2px !important; margin: 0; width: 100%; min-width: 0; border: none !important; outline: none !important; font: 12px courier new; ${ nav.Presto ? '' : 'resize: none !important; ' }}
	#de-spell-rowmeter { padding: 2px 3px 0 0; overflow: hidden; min-width: 2em; background-color: #616b86; text-align: right; color: #fff; font: 12px courier new; }`;

	switch(Cfg.scriptStyle) {
	case 0: // Gradient darkblue
		x += `#de-cfg-bar { background-color: #1f2740; }
			.de-cfg-tab { border-color: #121421 !important; }`;
		break;
	case 1: // gradient blue
		x += `#de-cfg-bar { background-color: #325f9e; }
			.de-cfg-tab { border-color: #183d77 !important; }`;
		break;
	case 2: // solid grey
		x += `#de-cfg-bar, #de-spell-rowmeter { background-color: #777; }
			.de-cfg-body, #de-cfg-buttons { border-color: #444; }`;
		break;
	case 3: // transparent blue
		x += `#de-cfg-bar { background-color: rgba(0,20,80,.72); }
			.de-cfg-tab { border-color: #001450 !important; }`;
		break;
	case 4: // square dark
		x += `#de-cfg-bar { background-color: #222; }
			.de-cfg-body, #de-cfg-buttons { border-color: #666; }`;
	}

	// Post panel
	x += `.de-post-btns { margin-left: 4px; }
	.de-post-note:not(:empty) { color: inherit; margin: 0 4px; vertical-align: 1px; font: italic bold 12px serif; }
	.de-thread-note { font-style: italic; }
	.de-btn-hide > .de-btn-unhide-use, .de-btn-unhide > .de-btn-hide-use, .de-btn-hide-user > .de-btn-unhide-use, .de-btn-unhide-user > .de-btn-hide-use { display: none; }
	.de-btn-close, .de-btn-expthr, .de-btn-fav, .de-btn-fav-sel, .de-btn-hide, .de-btn-hide-user, .de-btn-unhide, .de-btn-unhide-user, .de-btn-rep, .de-btn-sage, .de-btn-src, .de-btn-stick, .de-btn-stick-on, .de-btn-toggle { margin: 0 2px -3px 0 !important; cursor: pointer; width: 16px; height: 16px; }
	${ !pr.form && !pr.oeForm ? '.de-btn-rep { display: none; }' : '' }` +

	// Sauce buttons
	cont('.de-src-google', 'https://google.com/favicon.ico') +
	cont('.de-src-yandex', 'https://yandex.ru/favicon.ico') +
	cont('.de-src-tineye', 'https://tineye.com/favicon.ico') +
	cont('.de-src-saucenao', 'https://saucenao.com/favicon.ico') +
	cont('.de-src-iqdb', '//iqdb.org/favicon.ico') +
	cont('.de-src-whatanime', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAMAAADarb8dAAAAWlBMVEX////29fbT1NOOj44dGx0SEhIHCAfX2NfQ0NDBwcGztLOwsbA7Ozs4ODgeHh7/2Nf/1dTMsbGpkZGWZWRyRUQ8NTYoIyMZAAAAAAAGBASBaGeBZ2Z2XVtmTUw2fryxAAAAGHRSTlP+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v4W3wyUAAAAZElEQVQI152OSQ6AMBRCadU6zxN1uP81/Y2NSY0r2fBgA+BL/wrbWEcewEqrrHa5zpSuCJMC0IY0WiA1iJW4ikkPYCFeUlQKFASTKI8SyTc8s8sc/rBDvwbF1LVjUJzbftjv6xfbkBHGT8GSnQAAAABJRU5ErkJggg==') +

	// Posts counter
	`.de-post-counter::after { counter-increment: de-cnt 1; content: counter(de-cnt); margin: 0 4px 0 2px; vertical-align: 1px; color: #4f7942; font: bold 11px tahoma; cursor: default; }
	.de-post-deleted::after { content: "${ Lng.deleted[lang] }"; margin: 0 4px 0 2px; vertical-align: 1px; color: #727579; font: bold 11px tahoma; cursor: default; }` +

	// Text markup buttons
	`#de-txt-panel { display: block; height: 23px; font-weight: bold; cursor: pointer; }
	#de-txt-panel > span:empty { display: inline-block; width: 23px; height: 22px; margin: 0 2px; }` +
	gif('#de-btn-bold:empty', (p = 'R0lGODlhFwAWAJEAAPDw8GRkZAAAAP///yH5BAEAAAMALAAAAAAXABYAQAJ') + 'T3IKpq4YAoZgR0KqqnfzipIUikFWc6ZHBwbQtG4zyonW2Vkb2iYOo8Ps8ZLOV69gYEkU5yQ7YUzqhzmgsOLXWnlRIc9PleX06rnbJ/KITDqTLUAAAOw==') +
	gif('#de-btn-italic:empty', p + 'K3IKpq4YAYxRCSmUhzTfx3z3c9iEHg6JnAJYYSFpvRlXcLNUg3srBmgr+RL0MzxILsYpGzyepfEIjR43t5kResUQmtdpKOIQpQwEAOw==') +
	gif('#de-btn-under:empty', p + 'V3IKpq4YAoRARzAoV3hzoDnoJNlGSWSEHw7JrEHILiVp1NlZXtKe5XiptPrFh4NVKHh9FI5NX60WIJ6ATZoVeaVnf8xSU4r7NMRYcFk6pzYRD2TIUAAA7') +
	gif('#de-btn-strike:empty', p + 'S3IKpq4YAoRBR0qqqnVeD7IUaKHIecjCqmgbiu3jcfCbAjOfTZ0fmVnu8YIHW6lgUDkOkCo7Z8+2AmCiVqHTSgi6pZlrN3nJQ8TISO4cdyJWhAAA7') +
	gif('#de-btn-spoil:empty', 'R0lGODlhFwAWAJEAAPDw8GRkZP///wAAACH5BAEAAAIALAAAAAAXABYAQAJBlIKpq4YAmHwxwYtzVrprXk0LhBziGZiBx44hur4kTIGsZ99fSk+mjrMAd7XerEg7xnpLIVM5JMaiFxc14WBiBQUAOw==') +
	gif('#de-btn-code:empty', p + 'O3IKpq4YAoZgR0KpqnFxokH2iFm7eGCEHw7JrgI6L2F1YotloKek6iIvJAq+WkfgQinjKVLBS45CePSXzt6RaTjHmNjpNNm9aq6p4XBgKADs=') +
	gif('#de-btn-sup:empty', p + 'Q3IKpq4YAgZiSQhGByrzn7YURGFGWhxzMuqqBGC7wRUNkeU7nnWNoMosFXKzi8BHs3EQnDRAHLY2e0BxnWfEJkRdT80NNTrliG3aWcBhZhgIAOw==') +
	gif('#de-btn-sub:empty', p + 'R3IKpq4YAgZiSxquujtOCvIUayAkVZEoRcjCu2wbivMw2WaYi7vVYYqMFYq/i8BEM4ZIrYOmpdD49m2VFd2oiUZTORWcNYT9SpnZrTjiML0MBADs=') +
	gif('#de-btn-quote:empty', p + 'L3IKpq4YAYxRUSKguvRzkDkZfWFlicDCqmgYhuGjVO74zlnQlnL98uwqiHr5ODbDxHSE7Y490wxF90eUkepoysRxrMVaUJBzClaEAADs=');

	// Show/close animation
	if('animation' in docBody.style) {
		x += `@keyframes de-open { 0% { transform: translateY(-100%); } 100% { transform: translateY(0); } }
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
		.de-win-close { animation: de-win-close .2s ease-in both; }`;
	} else {
		Cfg.animation = 0;
	}

	// Full images
	p = Math.max(Cfg.minImgSize || 0, 50);
	x += `.de-img-pre, .de-img-full { display: block; border: none; outline: none; cursor: pointer; image-orientation: from-image; }
	.de-img-pre { max-width: 200px; max-height: 200px; }
	.de-img-load { position: absolute; z-index: 2; width: 50px; height: 50px; top: 50%; left: 50%; margin: -25px; }
	.de-img-full, .de-img-wrapper-nosize { width: 100%; height: 100%; }
	.de-img-wrapper-inpost { min-width: ${ p }px; min-height: ${ p }px; float: left; ${ aib.multiFile ? '' : 'padding: 2px 5px; -moz-box-sizing: border-box; box-sizing: border-box; ' } }
	.de-img-wrapper-nosize { position: relative; }
	.de-img-wrapper-nosize > .de-img-full { position: absolute; z-index: 1; opacity: .3; }
	.de-img-center { position: fixed; margin: 0 !important; z-index: 9999; background-color: #ccc; border: 1px solid black !important; box-sizing: content-box; -moz-box-sizing: content-box; }
	#de-img-btn-next, #de-img-btn-prev { position: fixed; top: 50%; z-index: 10000; height: 36px; width: 36px; margin-top: -18px; background-repeat: no-repeat; background-position: center; background-color: black; cursor: pointer; }
	#de-img-btn-next { background-image: url(data:image/gif;base64,R0lGODlhIAAgAIAAAPDw8P///yH5BAEAAAEALAAAAAAgACAAQAJPjI8JkO1vlpzS0YvzhUdX/nigR2ZgSJ6IqY5Uy5UwJK/l/eI6A9etP1N8grQhUbg5RlLKAJD4DAJ3uCX1isU4s6xZ9PR1iY7j5nZibixgBQA7); right: 0; border-radius: 10px 0 0 10px; }
	#de-img-btn-prev { background-image: url(data:image/gif;base64,R0lGODlhIAAgAIAAAPDw8P///yH5BAEAAAEALAAAAAAgACAAQAJOjI8JkO24ooxPzYvzfJrWf3Rg2JUYVI4qea1g6zZmPLvmDeM6Y4mxU/v1eEKOpziUIA1BW+rXXEVVu6o1dQ1mNcnTckp7In3LAKyMchUAADs=); left: 0; border-radius: 0 10px 10px 0; }` +

	// Embedders
	cont('.de-video-link.de-ytube', 'https://youtube.com/favicon.ico') +
	cont('.de-video-link.de-vimeo', 'https://vimeo.com/favicon.ico') +
	cont('.de-img-arch', 'data:image/gif;base64,R0lGODlhEAAQALMAAF82SsxdwQMEP6+zzRA872NmZQesBylPHYBBHP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAQARTMMlJaxqjiL2L51sGjCOCkGiBGWyLtC0KmPIoqUOg78i+ZwOCUOgpDIW3g3KJWC4t0ElBRqtdMr6AKRsA1qYy3JGgMR4xGpAAoRYkVDDWKx6NRgAAOw==') +
	cont('.de-img-audio', 'data:image/gif;base64,R0lGODlhEAAQAKIAAGya4wFLukKG4oq3802i7Bqy9P///wAAACH5BAEAAAYALAAAAAAQABAAQANBaLrcHsMN4QQYhE01OoCcQIyOYQGooKpV1GwNuAwAa9RkqTPpWqGj0YTSELg0RIYM+TjOkgba0sOaAEbGBW7HTQAAOw==') +
	`.de-current::after { content: " \u25CF"; }
	.de-img-arch, .de-img-audio { margin-left: 4px; color: inherit; text-decoration: none; font-weight: bold; }
	.de-mp3 { margin: 5px 20px; }
	.de-video-obj { margin: 5px 20px; white-space: nowrap; }
	.de-video-obj-inline { display: inline-block; }
	#de-video-btn-resize { padding: 0 14px 8px 0; margin: 0 8px; border: 2px solid; border-radius: 2px; }
	#de-video-btn-hide, #de-video-btn-prev { margin-left: auto; }
	#de-video-buttons { display: flex; align-items: center; width: 100%; line-height: 16px; }
	.de-video-expanded { width: 854px !important; height: 480px !important; }
	#de-video-list { padding: 0 0 4px; overflow-y: auto; width: 100%; }
	.de-video-refpost { margin: 0 3px; text-decoration: none; cursor: pointer; }
	.de-video-resizer::after { content: "\u2795"; margin: 0 -15px 0 3px; vertical-align: 6px; color: #000; font-size: 12px; cursor: pointer; }
	.de-video-player, .de-video-thumb { width: 100%; height: 100%; }
	a.de-video-player { display: inline-block; position: relative; border-spacing: 0; border: none; }
	a.de-video-player::after { content: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAWCAQAAACMYb/JAAAArklEQVR4AYXSr05CYRjA4cPGxjRosTijdvNJzmD1CrwAvQWugASNwGg0MoErOIVCPCMx0hmBMaAA4mPX8/2rT/i+9/1lPu0M3MtCN1OAvS+NEFkDmHqoJwcAbHzUkb9n7C5FqLynCAzdpAhLrynCRc9VnEDpKUWYpUmZIlt5nBQeY889amvGPj33HBvdt45WbAELeWyNP/qu/8dwBrDyVp9UBRi5DYXZdTLxEs77F5bCVAHlDJ1UAAAAAElFTkSuQmCC"); position: absolute;top: 50%; left: 50%; padding: 12px 24px; margin: -22px 0 0 -32px; background-color: rgba(255,0,0,.4); border-radius: 8px; line-height: 0; }
	a.de-video-player:hover::after { background-color: rgba(255,0,0,.7); }
	.de-video-title[de-time]::after { content: " [" attr(de-time) "]"; color: red; }
	.de-vocaroo > embed { display: inline-block; }
	video { background: black; }` +

	// File inputs
	`.de-file { display: inline-block; margin: 1px; height: ${ p = aib.multiFile ? 90 : 130 }px; width: ${ p }px; text-align: center; border: 1px dashed grey; }
	.de-file > .de-file-del, .de-file > .de-file-spoil { float: right; }
	.de-file > .de-file-rar { float: left; }
	.de-file > .de-file-rarmsg { float: left; padding: 0 4px 2px; color: #fff; background-color: rgba(55,55,55,.5); }
	.de-file > .de-file-utils { display: none; }
	.de-file > div { display: table; width: 100%; height: 100%; cursor: pointer; }
	.de-file > div > div { display: table-cell; vertical-align: middle; }
	.de-file + [type="file"] { opacity: 0; margin: 1px 0 0 -${ p + 2 }px !important; vertical-align: top; width: ${ p + 2 }px !important; height: ${ p + 2 }px; border: none !important; cursor: pointer; }
	#de-file-area { border-spacing: 0; margin-top: 1px; width: 275px; min-width: 100%; max-width: 100%; overflow-x: auto; overflow-y: hidden; white-space: nowrap; }
	.de-file-drag { background: rgba(88,88,88,.4); border: 1px solid grey; }
	.de-file:hover:not(.de-file-drag) > .de-file-utils { display: block !important; position: relative; margin: -18px 2px; }
	.de-file:hover:not(.de-file-drag) > .de-file-spoil { margin: -16px 21px; }
	img.de-file-img, video.de-file-img { max-width: ${ p - 4 }px; max-height: ${ p - 4 }px; }
	.de-file-input { max-width: 300px; }
	.de-file-off > div > div::after { content: "${ Lng.noFile[lang] }"; }
	.de-file-rarmsg { margin: 0 5px; font: bold 11px tahoma; cursor: default; }
	.de-file-del, .de-file-rar { display: inline-block; margin: 0 4px -3px; width: 16px; height: 16px; cursor: pointer; }
	.de-file-spoil { display: none; }` +
	gif('.de-file-del', 'R0lGODlhEAAQALMOAP8zAMopAJMAAP/M//+DIP8pAP86Av9MDP9sFP9zHv9aC/9gFf9+HJsAAP///wAAACH5BAEAAA4ALAAAAAAQABAAAARU0MlJKw3B4hrGyFP3hQNBjE5nooLJMF/3msIkJAmCeDpeU4LFQkFUCH8VwWHJRHIM0CiIMwBYryhS4XotZDuFLUAg6LLC1l/5imykgW+gU0K22C0RADs=') +
	gif('.de-file-rar', 'R0lGODlhEAAQALMAAF82SsxdwQMEP6+zzRA872NmZQesBylPHYBBHP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAQARTMMlJaxqjiL2L51sGjCOCkGiBGWyLtC0KmPIoqUOg78i+ZwOCUOgpDIW3g3KJWC4t0ElBRqtdMr6AKRsA1qYy3JGgMR4xGpAAoRYkVDDWKx6NRgAAOw==') +

	// Post reply
	`#de-resizer-text { display: inline-block !important; float: none !important; padding: 5px; margin: ${ nav.Presto ? '-2px -10px' : '0 0 1px -10px' }; vertical-align: bottom; border-bottom: 2px solid #666; border-right: 2px solid #666; cursor: se-resize; }
	.de-parea { text-align: center; }
	.de-parea-btn-close::after { content: "${ Lng.hideForm[lang] }"; }
	.de-parea-btn-thr::after { content: "${ Lng.makeThr[lang] }"; }
	.de-parea-btn-reply::after { content: "${ Lng.makeReply[lang] }"; }
	#de-pform > form { padding: 0; margin: 0; border: none; }
	#de-pform input[type="text"], #de-pform input[type="file"] { width: 200px; }
	.de-win-inpost { float: none; clear: left; display: inline-block; width: auto; padding: 3px; margin: 2px 0; }
	.de-win-inpost > .de-resizer { display: none; }
	.de-win-inpost > .de-win-head { background: none; color: inherit; }
	#de-win-reply { width: auto !important; min-width: 0; padding: 0 !important; border: none !important; }
	#de-win-reply.de-win { position: fixed !important; padding: 0 !important; margin: 0 !important; border-radius: 10px 10px 0 0; }
	#de-win-reply.de-win > .de-win-body { padding: 2px 2px 0 1px; border: 1px solid gray; }
	#de-win-reply.de-win .de-textarea { min-width: 98% !important; resize: none !important; }
	#de-win-reply.de-win #de-resizer-text { display: none !important; }
	#de-sagebtn { margin: 4px !important; vertical-align: top; cursor: pointer; }
	.de-textarea { display: inline-block; padding: 3px !important; min-width: 275px !important; min-height: 90px !important; resize: both; transition: none !important; }` +

	// Favorites
	`.de-fav-del > #de-fav-buttons { display: none; }
	.de-fav-del > #de-fav-delbuttons { display: block !important; }
	.de-fav-del .de-fav-header-switch, .de-fav-del .de-fav-switch { display: block !important; margin: 2px 0 2px 4px !important; flex: none; }
	#de-fav-delbuttons { display: none; }
	.de-fav-header-switch, .de-fav-switch { display: none; }
	.de-fav-header { margin-top: 0; margin-bottom: 0; padding: 1px 0; display: flex; }
	.de-fav-entries { border-top: 1px solid rgba(80,80,80,.3); }
	.de-fav-header-link { margin-left: 4px; color: inherit; font-weight: bold; font-size: 14px; flex: auto; text-decoration: none; outline: none; }
	.de-entry { display: flex !important; align-items: center; float: none !important; padding: 0 !important; margin: 2px 0 !important; border: none !important; font-size: 14px; overflow: hidden !important; white-space: nowrap; }
	.de-fav-link { flex: none; margin-left: 4px; text-decoration: none; border: none; }
	.de-entry-title { flex: auto; padding-left: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
	.de-fav-inf { flex: none; padding: 0 4px 0 10px; font: bold 14px serif; cursor: default; }
	.de-fav-inf-icon, .de-fav-inf-iwrap  { width: 16px; height: 16px; }
	.de-fav-inf-icon { margin-bottom: -3px; }
	.de-fav-inf-icon:not(.de-fav-closed):not(.de-fav-unavail):not(.de-fav-wait), .de-fav-closed > .de-fav-unavail-use, .de-fav-closed > .de-fav-wait-use, .de-fav-unavail > .de-fav-closed-use, .de-fav-unavail > .de-fav-wait-use, .de-fav-wait > .de-fav-closed-use, .de-fav-wait > .de-fav-unavail-use { display: none; }
	.de-fav-inf-new { color: #424f79; }
	.de-fav-inf-new::after { content: " +"; }
	.de-fav-inf-old { color: #4f7942; }
	.de-fav-inf-you { padding: 0 4px; margin-right: 4px; border-radius: 3px; color: #fff; background-color: #424f79; opacity: 0.65; }
	.de-fold-block { border: 1px solid rgba(120,120,120,.8); border-radius: 2px; }
	.de-fold-block:not(:first-child) { border-top: none; }` +

	// Thread nav
	`#de-thr-navpanel { color: #F5F5F5; height: 98px; width: 41px; position: fixed; top: 50%; left: 0px; padding: 0; margin: -49px 0 0; background: #777; border: 1px solid #525252; border-left: none; border-radius: 0 5px 5px 0; cursor: pointer; z-index: 1000; }
	.de-thr-navpanel-hidden { opacity: .7; margin-left: -34px !important; }
	#de-thr-navarrow { display: none; position: absolute; top: 50%; left: 34px; transform: translateY(-50%); width: 7px; height: 7px;}
	.de-thr-navpanel-hidden > #de-thr-navarrow { display: initial; }
	#de-thr-navup { padding: 12px 9px 13px 8px; border-radius: 0 5px 0 0; }
	#de-thr-navdown { padding: 13px 9px 12px 8px; border-radius: 0 0 5px 0; }
	#de-thr-navup, #de-thr-navdown { width: 41px; height: 49px; -moz-box-sizing: border-box; box-sizing: border-box; }
	:not(.de-thr-navpanel-hidden) > #de-thr-navup:hover, :not(.de-thr-navpanel-hidden) > #de-thr-navdown:hover { background: #555; }` +

	// Other
	`@keyframes de-wait-anim { to { transform: rotate(360deg); } }
	.de-wait, .de-fav-wait , .de-img-load { animation: de-wait-anim 1s linear infinite; }
	.de-wait { margin: 0 2px -3px 0 !important; width: 16px; height: 16px; }
	.de-abtn { text-decoration: none !important; outline: none; }
	.de-after-fimg { clear: left; }
	#de-wrapper-popup { overflow-x: hidden !important; overflow-y: auto !important; -moz-box-sizing: border-box; box-sizing: border-box; max-height: 100vh; position: fixed; right: 0; top: 0; z-index: 9999; font: 14px arial; cursor: default; }
	.de-popup { overflow: visible !important; clear: both !important; width: auto !important; min-width: 0pt !important; padding: 8px !important; margin: 1px !important; border: 1px solid grey !important; display: block !important; float: right !important; max-width: initial !important; }
	.de-popup-btn { display: inline-block; vertical-align: top; color: green; cursor: pointer; line-height: 1.15; }
	.de-popup-msg { display: inline-block; white-space: pre-wrap; }
	.de-button { flex: none; padding: 0 ${ nav.Firefox ? 2 : 4 }px !important; margin: 1px 2px; height: 24px; font: 13px arial; }
	.de-editor { display: block; font: 12px courier new; width: 619px; height: 337px; tab-size: 4; -moz-tab-size: 4; -o-tab-size: 4; }
	.de-hidden { float: left; overflow: hidden !important; margin: 0 !important; padding: 0 !important; border: none !important; width: 0 !important; height: 0 !important; display: inline !important; }
	.de-input-key { padding: 0 2px !important; margin: 0 !important; font: 13px/15px arial !important; }
	.de-link-parent { outline: 1px dotted !important; }
	.de-link-pview { font-weight: bold; }
	.de-link-ref { text-decoration: none; }
	.de-list { padding-top: 4px; }
	.de-list::before { content: "\u25CF"; margin-right: 4px; }
	.de-menu { padding: 0 !important; margin: 0 !important; width: auto !important; min-width: 0 !important; z-index: 9999; border: 1px solid grey !important;}
	.de-menu-item { display: block; padding: 3px 10px; color: inherit; text-decoration: none; font: 13px arial; white-space: nowrap; cursor: pointer; }
	.de-menu-item:hover { background-color: #222; color: #fff; }
	.de-omitted { color: grey; }
	.de-omitted::before { content: "${ Lng.postsOmitted[lang] }"; }
	.de-post-hiddencontent { display: none !important; }
	.de-pview { position: absolute; width: auto; min-width: 0; z-index: 9999; border: 1px solid grey !important; margin: 0 !important; display: block !important; }
	.de-pview-info { padding: 3px 6px !important; }
	.de-ref-op::after { content: " (OP)"; }
	.de-ref-del::after { content: " (Del)"; }
	.de-refmap { margin: 10px 4px 4px 4px; font-size: 75%; font-style: italic; }
	.de-refmap::before { content: "${ Lng.replies[lang] } "; }
	.de-refcomma:last-child { display: none; }
	.de-replies-hide::after { content: "${ Lng.hidePosts[lang] }"; }
	.de-replies-show::after { content: "${ Lng.showPosts[lang] }"; }
	.de-thread-buttons { clear: left; margin-top: 5px; }
	.de-thread-collapse > a::after { content: "${ Lng.collapseThr[lang] }"; }
	.de-thread-updater > a::after { content: "${ Lng.getNewPosts[lang] }"; }
	#de-updater-count::before { content: ": "; }
	.de-viewed { color: #747488 !important; }
	form > hr { clear: both }`;

	$css(x).id = 'de-css';
	$css('').id = 'de-css-dynamic';
	$css('').id = 'de-css-user';
	updateCSS();
}

function updateCSS() {
	const str = `.de-video-obj { width: ${ Cfg.YTubeWidth }px; height: ${ Cfg.YTubeHeigh }px; }
	.de-new-post { ${
		nav.Presto ? 'border-left: 4px solid rgba(107,134,97,.7); border-right: 4px solid rgba(107,134,97,.7)' :
		             'box-shadow: 6px 0 2px -2px rgba(107,134,97,.8), -6px 0 2px -2px rgba(107,134,97,.8)' }; }
	.de-selected, .de-error-input { ${
		nav.Presto ? 'border-left: 4px solid rgba(220,0,0,.7); border-right: 4px solid rgba(220,0,0,.7)' :
		             'box-shadow: 6px 0 2px -2px rgba(220,0,0,.8), -6px 0 2px -2px rgba(220,0,0,.8)' }; }
	${ Cfg.markMyPosts ? `.de-mypost { ${
		nav.Presto ? 'border-left: 4px solid rgba(97,107,134,.7); border-right: 4px solid rgba(97,107,134,.7)' :
		             'box-shadow: 6px 0 2px -2px rgba(97,107,134,.8), -6px 0 2px -2px rgba(97,107,134,.8)' }; }
		.de-mypost .de-post-counter::after { content: counter(de-cnt) " (You)"; }
		.de-mypost .de-post-deleted::after { content: "${ Lng.deleted[lang] } (You)"; }` : '' }
	${ Cfg.markMyLinks ? `.de-ref-my::after { content: " (You)"; }
		.de-ref-del.de-ref-my::after { content: " (Del)(You)"; }
		.de-ref-op.de-ref-my::after { content: " (OP)(You)"; }` : '' }
	${ Cfg.postBtnsCSS === 0 ?
	   `.de-btn-fav, .de-btn-stick, .de-btn-expthr, .de-btn-rep, .de-btn-hide, .de-btn-unhide, .de-btn-src { fill: rgba(0,0,0,0); color: #4F7942; }
		.de-btn-fav-sel, .de-btn-stick-on, .de-btn-sage, .de-btn-hide-user, .de-btn-unhide-user { fill: rgba(0,0,0,0); color: #F00; }` :
	   `.de-btn-hide, .de-btn-unhide, .de-btn-src, .de-btn-sage, .de-btn-fav, .de-btn-stick, .de-btn-expthr, .de-btn-rep { color: #F5F5F5; }
		.de-btn-hide-user { color: #BFFFBF; }
		.de-btn-unhide-user { color: #FFBFBF; }
		.de-btn-fav-sel { color: #FFE100; }
		.de-btn-stick-on { color: #BFFFBF; }
		.de-btn-sage { fill: #4B4B4B; }
		.de-btn-expthr, .de-btn-fav, .de-btn-fav-sel, .de-btn-hide, .de-btn-hide-user, .de-btn-unhide, .de-btn-unhide-user, .de-btn-rep, .de-btn-src, .de-btn-stick, .de-btn-stick-on { fill: ${ Cfg.postBtnsCSS === 1 && !nav.Presto ? 'url(#de-btn-back-gradient)' : Cfg.postBtnsBack }; }` }
	${ Cfg.hideReplies || Cfg.updThrBtns ? '.de-thread-buttons::before { content: ">> "; }' : '' }
	${ Cfg.resizeImgs ? '' : '.de-img-wrapper-inpost > .de-img-full { width: auto; }' }
	${ Cfg.maskImgs ? aib.qPostImg + `, .de-img-pre, .de-video-obj { opacity: ${ Cfg.maskVisib / 100 } !important; } ${
		aib.qPostImg.split(', ').join(':hover, ') }:hover, .de-img-pre:hover, .de-video-obj:hover { opacity: 1 !important; }
		.de-video-obj:not(.de-video-obj-inline) { clear: both; }` : '' }
	${ Cfg.delImgNames ? '.de-img-name { text-transform: capitalize; text-decoration: none; }' : ''}
	${ Cfg.widePosts ? `.${ aib.cReply.replace(/\s/, '.') }:not(.de-pview) { float: none; width: 100%; }` : '' }
	${ Cfg.strikeHidd ? '.de-link-hid { text-decoration: line-through !important; }' : '' }
	${ Cfg.noSpoilers === 1 ?
	   `.spoiler, s { color: #F5F5F5 !important; background-color: #888 !important; }
		.spoiler > a, s > a:not(:hover) { color: #F5F5F5 !important; background-color: #888 !important; }` :
	   Cfg.noSpoilers === 2 ?
	   `.spoiler, s { color: inherit !important; }
		.spoiler > a, s > a:not(:hover) { color: inherit !important; }` : '' }
	${  !Cfg.addSageBtn ? '#de-sagebtn, ' : '' }${
		 Cfg.delHiddPost === 1 || Cfg.delHiddPost === 3 ? '.de-thr-hid, .de-thr-hid + div + hr, .de-thr-hid + div + br, .de-thr-hid + div + br + hr, .de-thr-hid + div + div + hr, ' : '' }${
		!Cfg.imgNavBtns ? '#de-img-btn-next, #de-img-btn-prev, ' : '' }${
		 Cfg.noPostNames ? aib.qPostName + ', ' + aib.qPostTrip + ', ' : '' }${
		 Cfg.noBoardRule ? aib.qFormRules + ', ' : '' }${
		!Cfg.panelCounter ? '#de-panel-info, ' : '' }${
		 Cfg.removeHidd ? '.de-link-ref.de-link-hid, .de-link-ref.de-link-hid + .de-refcomma, ' : '' }${
		!Cfg.showHideBtn ? '.de-btn-hide, ' : '' }${
		!Cfg.showRepBtn ? '.de-btn-rep, ' : '' }${
		!Cfg.updThrBtns && !aib.t ? '.de-thread-updater, ' : '' }${
		!aib.kus && (aib.multiFile || !Cfg.fileThumb) ?
			'#de-pform form > table > tbody > tr > td:not([colspan]):first-child, #de-pform form > table > tbody > tr > th:first-child, ' : ''
	} body > hr, .postarea, small[id^="rfmap"], .theader { display: none !important; }`;
	$id('de-css-dynamic').textContent = str + '\n' + aib.css;
	$id('de-css-user').textContent = Cfg.userCSS ? Cfg.userCSSTxt : '';
}
