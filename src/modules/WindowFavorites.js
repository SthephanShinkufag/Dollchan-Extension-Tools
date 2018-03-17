/* ==[ WindowFavorites.js ]===================================================================================
                                              WINDOW: FAVORITES
=========================================================================================================== */

function saveRenewFavorites(favObj) {
	saveFavorites(favObj);
	toggleWindow('fav', true, favObj);
}

function removeFavEntry(favObj, h, b, num) {
	let f;
	if((h in favObj) && (b in favObj[h]) && (num in (f = favObj[h][b]))) {
		delete f[num];
		let len = Object.keys(f).length;
		if(f.hasOwnProperty('url')) {
			len--;
		}
		if(f.hasOwnProperty('hide')) {
			len--;
		}
		if(!len) {
			delete favObj[h][b];
			if($isEmpty(favObj[h])) {
				delete favObj[h];
			}
		}
	}
}

function toggleThrFavBtn(h, b, num, isEnable) {
	if(h === aib.host && b === aib.b && pByNum.has(num)) {
		const post = pByNum.get(num);
		post.setFavBtn(isEnable);
		post.thr.isFav = isEnable;
	}
}

function updateFavorites(num, value, mode) {
	readFavorites().then(favObj => {
		let f = favObj[aib.host];
		if(!f || !f[aib.b] || !(f = f[aib.b][num])) {
			return;
		}
		switch(mode) {
		case 'error': f.err = value; break;
		case 'update':
			f.cnt = value[0];
			f.new = 0;
			f.you = 0;
			f.last = aib.anchor + value[1];
		}
		const data = [aib.host, aib.b, num, value, mode];
		updateFavWindow(...data);
		saveFavorites(favObj);
		sendStorageEvent('__de-favorites', data);
	});
}

function updateFavWindow(h, b, num, value, mode) {
	if(mode === 'add' || mode === 'delete') {
		toggleThrFavBtn(h, b, num, mode === 'add');
		toggleWindow('fav', true, value);
		return;
	}
	const winEl = $q('#de-win-fav > .de-win-body');
	if(!winEl || !winEl.hasChildNodes()) {
		return;
	}
	const el = $q(`.de-entry[de-host="${ h }"][de-board="${ b }"][de-num="${ num }"] > .de-fav-inf`, winEl);
	if(!el) {
		return;
	}
	const [iconEl, youEl, newEl, oldEl] = [...el.children];
	$hide(youEl);
	$hide(newEl);
	if(mode === 'error') {
		iconEl.firstElementChild.setAttribute('class', 'de-fav-inf-icon de-fav-unavail');
		iconEl.title = value;
		return;
	}
	youEl.textContent = 0;
	newEl.textContent = 0;
	oldEl.textContent = value[0];
}

// Delete previously marked entries from Favorites
function cleanFavorites() {
	const els = $Q('.de-entry[de-removed]');
	const len = els.length;
	if(!len) {
		return;
	}
	readFavorites().then(favObj => {
		for(let i = 0; i < len; ++i) {
			const el = els[i];
			const h = el.getAttribute('de-host');
			const b = el.getAttribute('de-board');
			const num = +el.getAttribute('de-num');
			removeFavEntry(favObj, h, b, num);
			toggleThrFavBtn(h, b, num, false);
		}
		saveRenewFavorites(favObj);
	});
}

function showFavoritesWindow(body, favObj) {
	let html = '';
	// Create the list of favorite threads
	for(const h in favObj) {
		for(const b in favObj[h]) {
			const f = favObj[h][b];
			const hb = `de-host="${ h }" de-board="${ b }"`;
			const delBtn = '<svg class="de-fav-del-btn"><use xlink:href="#de-symbol-win-close"></use></svg>';
			let innerHtml = '';
			for(const tNum in f) {
				if(tNum === 'url' || tNum === 'hide') {
					continue;
				}
				const t = f[tNum];
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
				innerHtml += `<div class="de-entry ${ aib.cReply }" ${
					hb } de-num="${ tNum }" de-url="${ t.url }">
					${ delBtn }
					<a class="de-fav-link" title="${ Lng.goToThread[lang] }"` +
						` href="${ favLinkHref }" rel="noreferrer">${ tNum }</a>
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
			const isHide = f.hide === undefined ? h !== aib.host : f.hide;
			// Building a foldable block for specific board
			html += `<div class="de-fold-block${ isHide || b !== aib.b ? '' : ' de-fav-current' }">
				<div class="de-fav-header">
					${ delBtn }
					<a class="de-fav-header-link" title="${ Lng.goToBoard[lang] }"` +
						` href="${ f.url }" rel="noreferrer">${ h }/${ b }</a>
					<a class="de-abtn de-fav-header-btn" title="${ Lng.toggleEntries[lang] }"` +
						` href="#">${ isHide ? '&#x25BC;' : '&#x25B2;' }</a>
				</div>
				<div class="de-fav-entries${ isHide ? ' de-fav-entries-hide' : '' }" ${ hb }>
					${ innerHtml }
				</div>
			</div>`;
		}
	}

	// Appending DOM and events
	if(html) {
		$bEnd(body, `<div class="de-fav-table">${ html }</div>`).addEventListener('click', e => {
			const el = fixEventEl(e.target);
			const parentEl = el.parentNode;
			switch(el.tagName.toLowerCase() === 'svg' ? el.classList[0] : el.className) {
			case 'de-fav-link':
				sesStorage['de-win-fav'] = '1'; // Favorites will open again after following a link
				// We need to scroll to last seen post after following a link,
				// remembering of scroll position is no longer needed
				sesStorage.removeItem('de-scroll-' +
					parentEl.getAttribute('de-board') + parentEl.getAttribute('de-num'));
				break;
			case 'de-fav-del-btn': {
				const wasChecked = el.getAttribute('de-checked') === '';
				const toggleFn = btnEl => toggleAttr(btnEl, 'de-checked', '', !wasChecked);
				toggleFn(el);
				if(parentEl.className === 'de-fav-header') {
					// Select/unselect all checkboxes in board block
					const entriesEl = parentEl.nextElementSibling;
					$each($Q('.de-fav-del-btn', entriesEl), toggleFn);
					if(!wasChecked && entriesEl.classList.contains('de-fav-entries-hide')) {
						entriesEl.classList.remove('de-fav-entries-hide');
					}
				}
				const isShowDelBtns = !!$q('.de-entry > .de-fav-del-btn[de-checked]', body);
				$toggle($id('de-fav-buttons'), !isShowDelBtns);
				$toggle($id('de-fav-del-confirm'), isShowDelBtns);
				break;
			}
			case 'de-abtn de-fav-header-btn': {
				const entriesEl = parentEl.nextElementSibling;
				const isHide = !entriesEl.classList.contains('de-fav-entries-hide');
				el.innerHTML = isHide ? '&#x25BC' : '&#x25B2';
				favObj[entriesEl.getAttribute('de-host')][entriesEl.getAttribute('de-board')].hide = isHide;
				saveFavorites(favObj);
				$pd(e);
				entriesEl.classList.toggle('de-fav-entries-hide');
			}
			}
		});
	} else {
		$bEnd(body, `<center><b>${ Lng.noFavThr[lang] }</b></center>`);
	}
	const btns = $bEnd(body, '<hr><div id="de-fav-buttons"></div>');

	// "Edit" button. Calls a popup with editor to edit Favorites in JSON.
	btns.appendChild(getEditButton('favor',
		fn => readFavorites().then(favObj => fn(favObj, true, saveRenewFavorites))));

	// "Refresh" button. Updates counters of new posts for each thread entry.
	btns.appendChild($btn(Lng.refresh[lang], Lng.infoCount[lang], async () => {
		const favObj = await readFavorites();
		if(!favObj[aib.host]) {
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
			const f = favObj[host][b][num];
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
			} catch(err) {
				if((err instanceof AjaxError) && err.code === 404) { // Check for 404 error twice
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
				f.err = titleEl.title = getErrorMessage(err);
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
				const arch = b + '/arch';
				const fo = favObj[host];
				(fo[arch] || (fo[arch] = { url: favObj[host][b].url + 'arch/' }))[num] = Object.assign({}, f);
				removeFavEntry(favObj, host, b, num);
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
			saveFavorites(favObj);
		}
	}));

	// "Page" button. Shows on which page every thread is existed.
	btns.appendChild($btn(Lng.page[lang], Lng.infoPage[lang], async () => {
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
			} catch(err) {
				continue;
			}
			// Search for threads on current page
			for(let i = 0; i < len; ++i) {
				const pInfo = thrInfo[i];
				if(tNums.has(pInfo.num)) { // Check for matched thread numbers
					// Restore old icon and title status
					pInfo.iconEl.setAttribute('class', pInfo.iconClass);
					toggleAttr(pInfo.titleEl, 'title', pInfo.iconTitle, pInfo.iconTitle);
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
				toggleAttr(titleEl, 'title', iconTitle, iconTitle);
				pageEl.textContent = '@?'; // Indicates that thread not found
			}
		}
		closePopup('load-pages');
	}));

	// "Clear" button. Allows to clear 404'd threads.
	btns.appendChild($btn(Lng.clear[lang], Lng.clrDeleted[lang], async () => {
		// Sequentially load threads, and remove inaccessible
		let last404 = false;
		const els = $Q('.de-entry');
		const parent = $q('.de-fav-table');
		parent.classList.add('de-fav-table-unfold');
		for(let i = 0, len = els.length; i < len; ++i) {
			const el = els[i];
			const iconEl = $q('.de-fav-inf-icon', el);
			const titleEl = iconEl.parentNode;
			iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-wait');
			titleEl.title = Lng.updating[lang];
			try {
				await $ajax(el.getAttribute('de-url'), null, false);
				iconEl.setAttribute('class', 'de-fav-inf-icon');
				titleEl.removeAttribute('title');
			} catch(err) {
				if(err.code === 404) { // Check for 404 error twice
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
				titleEl.title = getErrorMessage(err);
			}
			last404 = false;
		}
		cleanFavorites(); // Delete marked entries
		parent.classList.remove('de-fav-table-unfold');
	}));

	// Deletion confirm/cancel buttons
	const delBtns = $bEnd(body, '<div id="de-fav-del-confirm" style="display: none;"></div>');
	delBtns.appendChild($btn(Lng.remove[lang], Lng.delEntries[lang], () => {
		$each($Q('.de-entry > .de-fav-del-btn[de-checked]', body),
			el => el.parentNode.setAttribute('de-removed', ''));
		cleanFavorites(); // Delete marked entries
		$show(btns);
		$hide(delBtns);
	}));
	delBtns.appendChild($btn(Lng.cancel[lang], '', () => {
		$each($Q('.de-fav-del-btn', body), el => el.removeAttribute('de-checked'));
		$show(btns);
		$hide(delBtns);
	}));
}
