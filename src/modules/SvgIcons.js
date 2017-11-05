/* ==[ SvgIcons.js ]==========================================================================================
                                                  SVG ICONS
=========================================================================================================== */

/* eslint-disable max-len */

function addSVGIcons() {
	docBody.insertAdjacentHTML('beforeend', `
	<div id="de-svg-icons" style="height: 0; width: 0; position: fixed;">
	<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
	<defs>
		<linearGradient id="de-btn-back-gradient" x1="50%" y1="0%" y2="100%" x2="50%">
			<stop offset="0%" stop-color="#A0A0A0"/>
			<stop offset="50%" stop-color="#505050"/>
			<stop offset="100%" stop-color="#A0A0A0"/>
		</linearGradient>
	</defs>

	<!-- POST ICONS -->
	<symbol viewBox="0 0 16 16" id="de-symbol-post-back">
		<path class="de-post-btns-back" d="M4 1q-3 0,-3 3v8q0 3,3 3h8q3 0,3 -3v-8q0 -3,-3-3z"/>
	</symbol>
	<symbol viewBox="0 0 16 16" id="de-symbol-post-hide">
		<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>
		<line class="de-svg-stroke" stroke-width="2.5" x1="4.5" y1="11.5" x2="11.5" y2="4.5"/>
		<line class="de-svg-stroke" stroke-width="2.5" x1="11.5" y1="11.5" x2="4.5" y2="4.5"/>
	</symbol>
	<symbol viewBox="0 0 16 16" id="de-symbol-post-unhide">
		<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>
		<line class="de-svg-stroke" stroke-width="2" x1="8" y1="4" x2="8" y2="12"/>
		<line class="de-svg-stroke" stroke-width="2" x1="4" y1="8" x2="12" y2="8"/>
	</symbol>
	<symbol viewBox="0 0 16 16" id="de-symbol-post-rep">
		<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>
		<path class="de-svg-fill" d="M5 11c0 .8.6 1.2 1.3.7l5-3c.6-.4.6-1 0-1.5l-5-3C5.6 4 5 4.3 5 5v6z"/>
	</symbol>
	<symbol viewBox="0 0 16 16" id="de-symbol-post-expthr">
		<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>
		<path class="de-svg-fill" d="M4.5 6L8 3l3.5 3H9.25v4h2.25L8 13 4.5 10h2.25V6z"/>
	</symbol>
	<symbol viewBox="0 0 16 16" id="de-symbol-post-fav">
		<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>
		<path class="de-svg-fill" d="M8 3l1.5 3 3.5.5-2.5 2.2 1 3.8-3.5-2-3.5 2 1-3.8L3 6.5 6.5 6 8 3z"/>
	</symbol>
	<symbol viewBox="0 0 16 16" id="de-symbol-post-stick">
		<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>
		<path class="de-svg-fill" d="M5 5h6v6H5z"/>
	</symbol>
	<symbol viewBox="0 0 16 16" id="de-symbol-post-sage">
		<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>
		<path class="de-svg-fill" d="M4 9h8l-4 4.5zM6 3h4v1h-4zM6 5h4v1h-4zM6 7h4v1h-4z"/>
	</symbol>
	<symbol viewBox="0 0 16 16" id="de-symbol-post-src">
		<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>
		<circle class="de-svg-stroke" cx="7" cy="7" r="2.5" stroke-width="2"/>
		<line class="de-svg-stroke" stroke-width="2" x1="9" y1="9" x2="12" y2="12"/>
	</symbol>

	<!-- WINDOW ICONS -->
	<symbol viewBox="0 0 16 16" id="de-symbol-win-arrow">
		<path class="de-svg-stroke" stroke-width="3.5" d="M8 13V6"/>
		<path class="de-svg-fill"  d="M3.5 7h9L8 2.5 3.5 7z"/>
	</symbol>
	<symbol viewBox="0 0 16 16" id="de-symbol-win-close">
		<path class="de-svg-stroke" stroke-width="2.5" d="M3.5 3.5l9 9m-9 0l9-9"/>
	</symbol>

	<!-- NAVIGATION PANEL ICONS -->
	<symbol viewBox="0 0 7 7" id="de-symbol-nav-arrow">
		<path class="de-svg-fill" d="M6 3.5L2 0v7z"/>
	</symbol>
	<symbol viewBox="0 0 24 24" id="de-symbol-nav-up">
		<path class="de-svg-stroke" stroke-width="3" stroke-miterlimit="10" d="M3 22.5l9-9 9 9M3 13.5l9-9 9 9"/>
	</symbol>
	<symbol viewBox="0 0 24 24" id="de-symbol-nav-down">
		<path class="de-svg-stroke" stroke-width="3" stroke-miterlimit="10" d="M3 11.5l9 9 9-9M3 2.5l9 9 9-9"/>
	</symbol>

	<!-- MAIN PANEL -->
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-logo">
		<path class="de-svg-fill" d="M22 5h-10v16h4v-14h6z"/>
		<path class="de-svg-stroke" stroke-width="3" d="M22 20.5H12c-2.8 0-5.7 0-5.7-4s2.8-4 5.7-4H21"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-cfg">
		<circle class="de-svg-stroke" stroke-width="3" cx="12.5" cy="12.5" r="6"/>
		<path class="de-svg-stroke" stroke-width="3" d="M12.5 6.5v-3M18.5 12.5h3M12.5 18.5v3M6.5 12.5h-3M16.7 8.3L19 6M16.7 16.7L19 19M8.3 16.7L6 19M8.3 8.3L6 6"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-hid">
		<path class="de-svg-stroke" stroke-width="4" d="M6 19L19 6M6 6l13 13"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-fav">
		<path class="de-svg-fill" d="M12.5 3.5l2.5 6 6.5.5-5 4.2 2 6.8-6-4-6 4 2-6.8-5-4.2 6.5-.5 2.5-6z"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-vid">
		<path class="de-svg-fill" d="M12.5 4a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zm-1 13c-1.3 1-2.5.2-2.5-1.4V9.4C9 7.8 10.2 7 11.6 8l5.3 3c1.3.8 1.3 2.2 0 3l-5.4 3z"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-refresh">
		<path class="de-svg-fill" d="M14 4v4.3a4.5 4.5 0 1 1-3 0V4a8.5 8.5 0 1 0 3 0z"/>
		<path class="de-svg-fill" d="M13 11V4h7"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-arrow">
		<path class="de-svg-stroke" stroke-width="5" d="M4 12.5h12"/>
		<path class="de-svg-fill" d="M14 19V6l7 6.5"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-expimg">
		<path class="de-svg-stroke" stroke-width="2" d="M20 18c0 1-1 2-2 2H7c-1 0-2-1-2-2V7c0-1 1-2 2-2h11c1 0 2 1 2 2v11z"/>
		<path class="de-svg-stroke" stroke-width="3" d="M8 12.5h9"/>
		<path class="de-svg-fill" d="M10 8v9l-5-4.5M15 17V8l5 4.5"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-maskimg">
		<path class="de-svg-stroke" stroke-width="2" d="M20 18c0 1-1 2-2 2H7c-1 0-2-1-2-2V7c0-1 1-2 2-2h11c1 0 2 1 2 2v11z"/>
		<path class="de-svg-stroke" d="M5 20L20 5M5 15.5L15.5 5M5 11l6-6M20 9.5L9.5 20M20 14l-6 6"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-preimg">
		<path class="de-svg-stroke" stroke-width="2" d="M20 18c0 1-1 2-2 2H7c-1 0-2-1-2-2V7c0-1 1-2 2-2h11c1 0 2 1 2 2v11z"/>
		<path class="de-svg-stroke" stroke-width="3" d="M12.5 17V9"/>
		<path class="de-svg-fill" d="M8 15h9l-4.5 5"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-savethr">
		<path class="de-svg-fill" d="M18 4h-1v6H8V4H6C5 4 4 5 4 6v13c0 1 1 2 2 2h13c1 0 2-1 2-2V7l-3-3zM6 20v-8h13v8H6z"/>
		<path class="de-svg-stroke" stroke-width="3" d="M13.5 9V4"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-upd">
		<circle cx="12.5" cy="10.8" r="4"/>
		<path class="de-svg-stroke" stroke-width="2" stroke-linejoin="round" d="M4.5 12q8-10,16 0q-8 10,-16 0z"/>
		<path class="de-svg-stroke" d="M11 7L9.8 5M14 7l1.2-2M11 17l-1.2 2m4.2-2l1.2 2M7 8.5L5.3 6.8M7 15.5l-1.7 1.7M18 8.5l1.7-1.7M18 15.5l1.7 1.7"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-audio-off">
		<path class="de-svg-fill" d="M13 21V4L8 9H4v7h4l5 5z"/>
		<path class="de-svg-stroke" stroke-width="2" d="M15 9.5l6 6m0-6l-6 6"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-audio-on">
		<path class="de-svg-fill" d="M13 21V4L8 9H4v7h4z"/>
		<path class="de-svg-stroke" stroke-width="2" d="M15.5 7.5c1.7 3.3 1.7 6.7 0 10m3-12.5c3 5 3 10 0 15"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-catalog">
		<path class="de-svg-fill" d="M5 5h3v3H5zm12 0h3v3h-3zm-4 0h3v3h-3zM9 5h3v3H9zM5 9h3v3H5zm12 0h3v3h-3zm-4 0h3v3h-3zM9 9h3v3H9zm-4 4h3v3H5zm12 0h3v3h-3zm-4 0h3v3h-3zm-4 0h3v3H9zm-4 4h3v3H5zm12 0h3v3h-3zm-4 0h3v3h-3zm-4 0h3v3H9z"/>
	</symbol>
	<symbol viewBox="0 0 25 25" id="de-symbol-panel-enable">
		<path class="de-svg-stroke" stroke-width="3" d="M12.5 4v8"/>
		<path class="de-svg-fill" d="M16 4.8v4a5 5 0 0 1-3.5 8.7A5 5 0 0 1 9 9V4.7a8.5 8.5 0 1 0 7 0z"/>
	</symbol>

	<!-- MARKUP BUTTONS -->
	<symbol viewBox="0 0 23 22" id="de-symbol-markup-back">
		<path class="de-markup-back" stroke-width="2" d="M6 1q-5 0,-5 5v10q0 5,5 5h11q5 0,5 -5v-10q0 -5,-5-5z"/>
	</symbol>
	<symbol viewBox="0 0 23 22" id="de-symbol-markup-bold">
		<use xlink:href="#de-symbol-markup-back"/>
		<text x="5.5" y="17" style="font-family: sans-serif; font-size: 17px; font-weight: 800;">B</text>
	</symbol>
	<symbol viewBox="0 0 23 22" id="de-symbol-markup-italic">
		<use xlink:href="#de-symbol-markup-back"/>
		<text x="8" y="17" style="font-family: sans-serif; font-size: 17px; font-weight: 600; font-style: italic;">i</text>
	</symbol>
	<symbol viewBox="0 0 23 22" id="de-symbol-markup-under">
		<use xlink:href="#de-symbol-markup-back"/>
		<text x="6" y="15" width="20" style="font-family: sans-serif; font-size: 17px; font-weight: 600;">u</text>
		<path stroke="#444" stroke-width="1.5" d="M6 17H17.5"/>
	</symbol>
	<symbol viewBox="0 0 23 22" id="de-symbol-markup-strike">
		<use xlink:href="#de-symbol-markup-back"/>
		<text x="4" y="17" style="font-family: sans-serif; font-size: 22px; font-weight: 600; font-style: italic;">s</text>
		<path stroke="#444" d="M4 11H19"/>
	</symbol>
	<symbol viewBox="0 0 23 22" id="de-symbol-markup-spoil">
		<use xlink:href="#de-symbol-markup-back"/>
		<path stroke="#666" stroke-width="10" d="M4 11H19"/>
	</symbol>
	<symbol viewBox="0 0 23 22" id="de-symbol-markup-code">
		<use xlink:href="#de-symbol-markup-back"/>
		<text x="5" y="17" style="font-family: 'Lucida Console', monospace; font-size: 18px; font-weight: 600;">C</text>
	</symbol>
	<symbol viewBox="0 0 23 22" id="de-symbol-markup-sup">
		<use xlink:href="#de-symbol-markup-back"/>
		<text x="4" y="15" style="font-family: sans-serif; font-size: 16px; font-weight: 600;">x</text>
		<text x="14" y="10" style="font-family: sans-serif; font-size: 8px; font-weight: 600;">2</text>
	</symbol>
	<symbol viewBox="0 0 23 22" id="de-symbol-markup-sub">
		<use xlink:href="#de-symbol-markup-back"/>
		<text x="4" y="15" style="font-family: sans-serif; font-size: 16px; font-weight: 600;">x</text>
		<text x="14" y="17" style="font-family: sans-serif; font-size: 8px; font-weight: 600;">2</text>
	</symbol>
	<symbol viewBox="0 0 23 22" id="de-symbol-markup-quote">
		<use xlink:href="#de-symbol-markup-back"/>
		<text x="6" y="18" style="font-family: sans-serif; font-size: 20px; font-weight: 600;">&gt;</text>
	</symbol>

	<!-- OTHER -->
	<symbol viewBox="0 0 16 16" id="de-symbol-wait">
		<circle fill="#929087" cx="8" cy="2" r="2"/>
		<circle fill="#C5C2BA" cx="8" cy="14" r="2"/>
		<circle fill="#ACAAA0" cx="2" cy="8" r="2"/>
		<circle fill="#79766C" cx="14" cy="8" r="2"/>
		<circle fill="#D2CFC6" cx="12.25" cy="12.25" r="2"/>
		<circle fill="#9F9C93" cx="3.75" cy="3.75" r="2"/>
		<circle fill="#B9B6AE" cx="3.75" cy="12.25" r="2"/>
		<circle fill="#868379" cx="12.25" cy="3.75" r="2"/>
	</symbol>
	<symbol viewBox="0 0 16 16" id="de-symbol-closed">
		<image display="inline" width="16" height="16" xlink:href="data:image/gif;base64,R0lGODlhEAAQAKIAAP3rqPPOd+y6V+WmN+Dg4M7OzmZmZv///yH5BAEAAAcALAAAAAAQABAAAANCeLrWvZARUqqJkjiLj9FMcWHf6IldGZqM4zqRAcw0zXpAoO/6LfeNnS8XcAhjAIHSoFwim0wockCtUodWq+/1UiQAADs="/>
	</symbol>
	<symbol viewBox="0 0 16 16" id="de-symbol-unavail">
		<circle class="de-svg-stroke" fill="none" stroke-width="2" cx="8" cy="8" r="5"/>
		<path class="de-svg-stroke" stroke-width="2" d="M4 4l8 8"/>
	</symbol>
	</svg>
	</div>`);
}

/* eslint-enable max-len */
