/* ==[ WindowFavorites.js ]===================================================================================
                                              WINDOW: FAVORITES
=========================================================================================================== */

// Delete previously marked entries from Favorites
function cleanFavorites() {
	const els = $Q('.de-entry[de-removed]');
	const len = els.length;
	if(!len) {
		return;
	}
	readFavorites().then(data => {
		for(let i = 0; i < len; ++i) {
			const el = els[i];
			const h = el.getAttribute('de-host');
			const b = el.getAttribute('de-board');
			const num = +el.getAttribute('de-num');
			removeFavoriteEntry(data, h, b, num);
			// If there existed thread then switch its fav button
			if(h === aib.host && b === aib.b && pByNum.has(num)) {
				pByNum.get(num).thr.op.setFavBtn(false);
			}
		}
		saveFavorites(data);
	});
}

function showFavoritesWindow(body, data) {
	let html = '';
	// Create the list of favorite threads
	for(const h in data) {
		for(const b in data[h]) {
			const d = data[h][b];
			let innerHtml = '';
			for(const tNum in d) {
				if(tNum === 'url') { // Ignore keys with board url's
					continue;
				}
				const t = d[tNum];
				if(!t.url.startsWith('http')) { // XXX: compatibility with older versions
					t.url = (h === aib.host ? aib.prot + '//' : 'http://') + h + t.url;
				}

				// Generate DOM for separate entry
				const favLinkHref = t.url + (
					!t.last ? '' :
					t.last.startsWith('#') ? t.last :
					h === aib.host ? aib.anchor + t.last : '');
				const favInfIwrapTitle = !t.err ? '' :
					t.err === 'Closed' ? `title="${ Lng.thrClosed[lang] }"` : `title="${ t.err }"`;
				const favInfIconClass = !t.err ? '' :
					t.err === 'Closed' || t.err === 'Archived' ? 'de-fav-closed' : 'de-fav-unavail';
				const favInfYouDisp = t.you ? '' : ' style="display: none;"';
				const favInfNewDisp = t.new ? '' : ' style="display: none;"';
				innerHtml += `<div class="de-entry ${ aib.cReply }" de-host="${ h }" de-board="${
					b }" de-num="${ tNum }" de-url="${ t.url }">
					<input class="de-fav-switch" type="checkbox">
					<a class="de-fav-link" href="${ favLinkHref }" rel="noreferrer">${ tNum }</a>
					<div class="de-entry-title">- ${ t.txt }</div>
					<div class="de-fav-inf">
						<span class="de-fav-inf-iwrap" ${ favInfIwrapTitle }>
							<svg class="de-fav-inf-icon ${ favInfIconClass }">
								<use class="de-fav-closed-use" xlink:href="#de-symbol-closed"/>
								<use class="de-fav-unavail-use" xlink:href="#de-symbol-unavail"/>
								<use class="de-fav-wait-use" xlink:href="#de-symbol-wait"/>
							</svg>
						</span>
						<span class="de-fav-inf-you" title="${ Lng.myPostsRep[lang] }"${ favInfYouDisp }>
							${ t.you || 0 }</span>
						<span class="de-fav-inf-new" title="${ Lng.newPosts[lang] }"${ favInfNewDisp }>
							${ t.new || 0 }</span>
						<span class="de-fav-inf-old" title="${ Lng.oldPosts[lang] }">${ t.cnt }</span>
						<span class="de-fav-inf-page" title="${ Lng.thrPage[lang] }"></span>
					</div>
				</div>`;
			}
			if(!innerHtml) {
				continue;
			}
			// Building a foldable block for specific board
			html += `<div class="de-fold-block${ h === aib.host && b === aib.b ? ' de-fav-current' : '' }">
				<div class="de-fav-header">
					<input class="de-fav-header-switch" type="checkbox">
					<a class="de-fav-header-link" href="${ d.url }" rel="noreferrer">${ h }/${ b }</a>
				</div>
				<div class="de-fav-entries"${ h === aib.host ? ' de-opened' : ' style="display: none;"' }>
					${ innerHtml }
				</div>
			</div>`;
		}
	}

	// Appending DOM and events
	if(html) {
		$bEnd(body, `<div class="de-fav-table">${ html }</div>`).addEventListener('click', e => {
			let el = e.target;
			switch(el.className) {
			case 'de-fav-link':
				sesStorage['de-win-fav'] = '1'; // Favorites will open again after following a link
				el = el.parentNode;
				// We need to scroll to last seen post after following a link,
				// remembering of scroll position is no longer needed
				sesStorage.removeItem('de-scroll-' + el.getAttribute('de-board') + el.getAttribute('de-num'));
				break;
			case 'de-fav-header-switch': {
				const { checked } = el;
				// Select/unselect all checkboxes in board block
				el = el.parentNode.nextElementSibling;
				$each($Q('.de-entry > input', el), el => (el.checked = checked));
				if(!checked || el.hasAttribute('de-opened')) {
					return;
				}
				break;
			}
			case 'de-fav-header-link':
				el = el.parentNode.nextElementSibling;
				$pd(e); // TODO: remove and make it possible to follow a board link
				break;
			default: return;
			}
			// Fold/unfold the board block
			if(el.hasAttribute('de-opened')) {
				el.style.display = 'none';
				el.removeAttribute('de-opened');
			} else {
				el.removeAttribute('style');
				el.setAttribute('de-opened', '');
			}
		});
	} else {
		$bEnd(body, `<center><b>${ Lng.noFavThr[lang] }</b></center>`);
	}

	let div = $bEnd(body, '<hr><div id="de-fav-buttons"></div>');

	// "Edit" button. Calls a popup with editor to edit Favorites in JSON.
	div.appendChild(getEditButton('favor',
		fn => readFavorites().then(data => fn(data, true, saveFavorites))));

	// "Refresh" button. Updates counters of new posts for each thread entry.
	div.appendChild($btn(Lng.refresh[lang], Lng.infoCount[lang], async () => {
		const fav = await getStoredObj('DESU_Favorites');
		if(!fav[aib.host]) {
			return;
		}
		let isUpdate = false;
		let last404 = false;
		const myposts = JSON.parse(locStorage['de-myposts'] || '{}');
		const els = $Q('.de-entry');
		for(let i = 0, len = els.length; i < len; ++i) {
			const el = els[i];
			const host = el.getAttribute('de-host');
			const b = el.getAttribute('de-board');
			const num = el.getAttribute('de-num');
			const f = fav[host][b][num];
			// Updating doesn't works for other domains because of different posts structure
			// Updating is not needed in closed threads
			if(host !== aib.host || f.err === 'Closed' || f.err === 'Archived') {
				continue;
			}
			const [titleEl, youEl, countEl] = [...el.lastElementChild.children];
			const iconEl = titleEl.firstElementChild;
			// setAttribute for class is used because of SVG (for correct work in some browsers)
			iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-wait');
			titleEl.title = Lng.updating[lang];
			let form, isArchived;
			try {
				if(!aib.iichan) {
					form = await ajaxLoad(aib.getThrUrl(b, num));
				} else {
					[form, isArchived] = await ajaxLoad(aib.getThrUrl(b, num), true, false, true);
				}
				last404 = false;
			} catch(e) {
				if((e instanceof AjaxError) && e.code === 404) { // Check for 404 error twice
					if(last404) {
						Thread.removeSavedData(b, num); // Doesn't work. Not done now.
					} else {
						last404 = true;
						--i; // Repeat this cycle again
						continue;
					}
				}
				last404 = false;
				$hide(countEl);
				$hide(youEl);
				iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-unavail');
				f.err = titleEl.title = getErrorMessage(e);
				isUpdate = true;
				continue;
			}
			if(aib.qClosed && $q(aib.qClosed, form)) { // Check for closed thread
				iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-closed');
				titleEl.title = Lng.thrClosed[lang];
				f.err = 'Closed';
				isUpdate = true;
			} else if(isArchived) { // Moves archived threads into b/arch (iichan only)
				iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-closed');
				titleEl.title = Lng.thrArchived[lang];
				f.err = 'Archived';
				const bArch = b + '/arch';
				if(!fav[host][bArch]) {
					fav[host][bArch] = { url: fav[host][b].url + 'arch/' };
				}
				fav[host][bArch][num] = Object.assign({}, f);
				removeFavoriteEntry(fav, host, b, num);
				isUpdate = true;
			} else {
				// Thread is available and not closed
				iconEl.setAttribute('class', 'de-fav-inf-icon');
				titleEl.removeAttribute('title');
				if(f.err) { // Cancel error status if existed
					delete f.err;
					isUpdate = true;
				}
			}
			// Updating a counter of new posts
			const posts = $Q(aib.qRPost, form);
			const cnt = posts.length + 1 - f.cnt;
			countEl.textContent = cnt;
			if(cnt === 0) {
				$hide(countEl); // Hide counter if no new posts
				$hide(youEl);
			} else {
				$show(countEl);
				f.new = cnt;
				isUpdate = true;
				// Check for replies to my posts
				if(myposts && myposts[b]) {
					f.you = 0;
					for(let j = 0; j < cnt; ++j) {
						const links = $Q(aib.qPostMsg + ' a', posts[posts.length - 1 - j]);
						for(let a = 0, len = links.length; a < len; ++a) {
							const tc = links[a].textContent;
							if(tc[0] === '>' && tc[1] === '>' && myposts[b][tc.substr(2)]) {
								f.you++;
							}
						}
					}
					if(f.you) {
						youEl.textContent = f.you;
						$show(youEl);
					}
				}
			}
		}
		AjaxCache.clearCache();
		if(isUpdate) {
			setStored('DESU_Favorites', JSON.stringify(fav));
		}
	}));

	// "Page" button. Shows on which page every thread is existed.
	div.appendChild($btn(Lng.page[lang], Lng.infoPage[lang], async () => {
		const els = $Q('.de-fav-current > .de-fav-entries > .de-entry');
		const len = els.length;
		const thrInfo = [];
		if(!len) { // Cancel if no existed entries
			return;
		}
		$popup('load-pages', Lng.loading[lang], true);
		// Create indexed array of entries and "waiting" SVG icon for each entry
		for(let i = 0; i < len; ++i) {
			const el = els[i];
			const iconEl = $q('.de-fav-inf-icon', el);
			const titleEl = iconEl.parentNode;
			thrInfo.push({
				found     : false,
				num       : +el.getAttribute('de-num'),
				pageEl    : $q('.de-fav-inf-page', el),
				iconClass : iconEl.getAttribute('class'),
				iconEl,
				iconTitle : titleEl.getAttribute('title'),
				titleEl
			});
			iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-wait');
			titleEl.title = Lng.updating[lang];
		}
		// Sequentially load pages and search for favorites threads
		// We cannot know a count of pages while in the thread
		const endPage = (aib.lastPage || 10) + 1; // Check up to 10 page, if we don't know
		let infoLoaded = 0;
		for(let page = 0; page < endPage; ++page) {
			let tNums;
			try {
				const form = await ajaxLoad(aib.getPageUrl(aib.b, page));
				tNums = new Set(Array.from(DelForm.getThreads(form), thrEl => aib.getTNum(thrEl)));
			} catch(e) {
				continue;
			}
			// Search for threads on current page
			for(let i = 0; i < len; ++i) {
				const pInfo = thrInfo[i];
				if(tNums.has(pInfo.num)) { // Check for matched thread numbers
					// Restore old icon and title status
					pInfo.iconEl.setAttribute('class', pInfo.iconClass);
					if(pInfo.iconTitle) {
						pInfo.titleEl.setAttribute('title', pInfo.iconTitle);
					} else {
						pInfo.titleEl.removeAttribute('title');
					}
					pInfo.pageEl.textContent = '@' + page; // Shows page counter for current entry
					pInfo.found = true;
					infoLoaded++;
				}
			}
			if(infoLoaded === len) { // Stop pages loading when all favorite threads checked
				break;
			}
		}
		// Process missed threads that not found
		for(let i = 0; i < len; ++i) {
			const { found, pageEl, iconClass, iconEl, iconTitle, titleEl } = thrInfo[i];
			if(!found) {
				// Restore old icon and title status
				iconEl.setAttribute('class', iconClass);
				if(iconTitle) {
					titleEl.setAttribute('title', iconTitle);
				} else {
					titleEl.removeAttribute('title');
				}
				pageEl.textContent = '@?'; // Indicates that thread not found
			}
		}
		closePopup('load-pages');
	}));

	// "Clear" button. Allows to clear 404'd threads.
	div.appendChild($btn(Lng.clear[lang], Lng.clrDeleted[lang], async () => {
		// Sequentially load threads, and remove inaccessible
		let last404 = false;
		const els = $Q('.de-entry'), len = els.length;
		for(let i = 0; i < len; ++i) {
			const el = els[i];
			const iconEl = $q('.de-fav-inf-icon', el);
			const titleEl = iconEl.parentNode;
			iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-wait');
			titleEl.title = Lng.updating[lang];
			try {
				await $ajax(el.getAttribute('de-url'), null, false);
				iconEl.setAttribute('class', 'de-fav-inf-icon');
				titleEl.removeAttribute('title');
			} catch(e) {
				if(e.code === 404) { // Check for 404 error twice
					if(last404) {
						Thread.removeSavedData(el.getAttribute('de-board'), // Doesn't work. Not done now.
							+el.getAttribute('de-num'));
						el.setAttribute('de-removed', ''); // Mark an entry as deleted
					} else {
						last404 = true;
						--i; // Repeat this cycle again
						continue;
					}
				}
				iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-unavail');
				titleEl.title = getErrorMessage(e);
			}
			last404 = false;
		}
		cleanFavorites(); // Delete marked entries
	}));

	// "Deleting…" button. Hides all control buttons, shows "Apply" and "Cancel" buttons
	div.appendChild($btn(Lng.deletion[lang], Lng.delEntries[lang], () => body.classList.add('de-fav-del')));
	div = $bEnd(body, '<div id="de-fav-delbuttons"></div>');

	// "Apply" button, depends to "Deleting…"
	div.appendChild($btn(Lng.apply[lang], Lng.delEntries[lang], () => {
		$each($Q('.de-entry > input[type="checkbox"]', body), // Mark checked entries as deleted
			el => el.checked && el.parentNode.setAttribute('de-removed', ''));
		cleanFavorites(); // Delete marked entries
		body.classList.remove('de-fav-del'); // Show all control buttons
	}));

	// "Cancel" button, depends to "Deleting…"
	div.appendChild($btn(Lng.cancel[lang], '', () => {
		$each($Q('input[type="checkbox"]', body), el => (el.checked = false)); // Unselect all checkboxes
		body.classList.remove('de-fav-del'); // Show all control buttons
	}));
}
