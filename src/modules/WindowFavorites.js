/* ==[ WindowFavorites.js ]===================================================================================
                                              WINDOW: FAVORITES
=========================================================================================================== */

// Saving favorites and renewing the Favorites window if it is open
function saveRenewFavorites(favObj) {
	saveFavorites(favObj);
	toggleWindow('fav', true, favObj);
}

// Removing an entry from hte favorites object
function removeFavEntry(favObj, host, board, num) {
	const entry = favObj[host]?.[board];
	if(entry?.[num]) {
		delete entry[num];
		if(!(Object.keys(entry).length - +$hasProp(entry, 'url') - +$hasProp(entry, 'hide'))) {
			delete favObj[host][board];
			if($isEmpty(favObj[host])) {
				delete favObj[host];
			}
		}
	}
}

// Toggling a favorites button in thread if it is available on page
function toggleThrFavBtn(host, board, num, isEnable) {
	if(host === aib.host && board === aib.b && pByNum.has(num)) {
		const post = pByNum.get(num);
		post.toggleFavBtn(isEnable);
		post.thr.isFav = isEnable;
	}
}

// Updating Favorites on successed/failed thread loading, or on visiting a previously inactive page
function updateFavorites(num, value, mode) {
	readFavorites().then(favObj => {
		const entry = favObj[aib.host]?.[aib.b]?.[num];
		if(!entry) {
			return;
		}
		let isUpdate = false;
		switch(mode) {
		case 'error':
			if(entry.err !== value) {
				entry.err = value;
				isUpdate = true;
			}
			break;
		case 'update':
			if(entry.last !== aib.anchor + value[3]) {
				if(doc.hidden) {
					value[1] += entry.new;
				} else {
					value[1] = value[2] = 0;
					entry.last = aib.anchor + value[3];
				}
				[entry.cnt, entry.new, entry.you] = value;
				isUpdate = true;
			}
		}
		if(isUpdate) {
			const data = [aib.host, aib.b, num, value, mode];
			updateFavWindow(...data);
			saveFavorites(favObj);
			sendStorageEvent('__de-favorites', data);
		}
	});
}

// Updating the Favorites window if it is open
function updateFavWindow(host, board, num, value, mode) {
	if(mode === 'add' || mode === 'delete') {
		toggleThrFavBtn(host, board, num, mode === 'add');
		toggleWindow('fav', true, value);
		return;
	}
	const winEl = $q('#de-win-fav > .de-win-body');
	if(!winEl?.hasChildNodes()) {
		return;
	}
	const el = $q(`.de-entry[de-host="${
		host }"][de-board="${ board }"][de-num="${ num }"] > .de-fav-inf`, winEl);
	if(!el) {
		return;
	}
	const [iconEl, youEl, newEl, oldEl] = [...el.children];
	$toggle(youEl, value[2]);
	$toggle(newEl, value[1]);
	if(mode === 'error') {
		iconEl.firstElementChild.setAttribute('class', 'de-fav-inf-icon de-fav-unavail');
		iconEl.title = value;
		return;
	}
	oldEl.textContent = value[0];
	newEl.textContent = value[1];
	youEl.textContent = value[2];
}

// Removing previously marked entries from Favorites
async function remove404Favorites(favObj) {
	const els = $Q('.de-entry[de-removed]');
	const len = els.length;
	if(!len) {
		return;
	}
	if(!favObj) {
		favObj = await readFavorites();
	}
	for(let i = 0; i < len; ++i) {
		const el = els[i];
		const host = el.getAttribute('de-host');
		const board = el.getAttribute('de-board');
		const num = +el.getAttribute('de-num');
		removeFavEntry(favObj, host, board, num);
		toggleThrFavBtn(host, board, num, false);
	}
	saveRenewFavorites(favObj);
}

// Checking if post contains reply links to my posts
function isPostRefToYou(post) {
	if(Cfg.markMyPosts) {
		const links = $Q(aib.qPostMsg.split(', ').join(' a, ') + ' a', post);
		for(let a = 0, linksLen = links.length; a < linksLen; ++a) {
			const tc = links[a].textContent;
			if(tc[0] === '>' && tc[1] === '>' && MyPosts.has(+tc.substr(2))) {
				return true;
			}
		}
	}
	return false;
}

// Checking threads for availability and new posts
async function refreshFavorites(needClear404) {
	let isUpdate = false;
	let isLast404 = false;
	const favObj = await readFavorites();
	const parentEl = $q('.de-fav-table');
	const entryEls = $Q('.de-entry');
	for(let i = 0, len = entryEls.length; i < len; ++i) {
		const entryEl = entryEls[i];
		const [titleEl, youEl, newEl, totalEl] = [...entryEl.lastElementChild.children];
		const iconEl = titleEl.firstElementChild;
		const host = entryEl.getAttribute('de-host');
		const board = entryEl.getAttribute('de-board');
		const num = entryEl.getAttribute('de-num');
		const url = entryEl.getAttribute('de-url');
		const entry = favObj[host][board][num];
		if(entry.err === 'Archived') {
			continue;
		}
		if(host !== aib.host || entry.err === 'Closed') {
			if(needClear404) {
				parentEl.classList.add('de-fav-table-unfold');
				const oldClassName = iconEl.getAttribute('class');
				const oldTitle = titleEl.title;
				// setAttribute for class is used for correct SVG work in old browsers
				iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-wait');
				titleEl.title = Lng.updating[lang];
				try {
					await $ajax(url, null, true);
					iconEl.setAttribute('class', oldClassName);
					if(oldTitle) {
						titleEl.title = oldTitle;
					} else {
						titleEl.removeAttribute('title');
					}
					isLast404 = false;
				} catch(err) {
					if((err instanceof AjaxError) && err.code === 404) { // Check for 404 error twice
						if(!isLast404) {
							isLast404 = true;
							--i; // Repeat this cycle again
							continue;
						}
						Thread.removeSavedData(board, num); // Not working yet
					}
					entryEl.setAttribute('de-removed', ''); // Mark an entry as deleted
					iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-unavail');
					titleEl.title = entry.err = getErrorMessage(err);
					isLast404 = false;
					isUpdate = true;
				}
			}
			continue;
		}
		let formEl, isArchived;
		iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-wait');
		titleEl.title = Lng.updating[lang];
		try {
			if(aib.hasArchive) {
				[formEl, isArchived] = await ajaxLoad(url, true, false, true);
			} else {
				formEl = await ajaxLoad(url);
			}
			isLast404 = false;
		} catch(err) {
			if((err instanceof AjaxError) && err.code === 404) {
				if(!isLast404) {
					isLast404 = true;
					--i;
					continue;
				}
				Thread.removeSavedData(board, num);
			}
			$hide(newEl);
			$hide(youEl);
			entryEl.setAttribute('de-removed', '');
			iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-unavail');
			titleEl.title = entry.err = getErrorMessage(err);
			isLast404 = false;
			isUpdate = true;
			continue;
		}
		if(aib.qClosed && $q(aib.qClosed, formEl)) {
			// Thread is closed
			iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-closed');
			titleEl.title = Lng.thrClosed[lang];
			entry.err = 'Closed';
			isUpdate = true;
		} else if(isArchived) {
			// Thread is archived
			iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-closed');
			titleEl.title = Lng.thrArchived[lang];
			entry.err = 'Archived';
			isUpdate = true;
		} else {
			// Thread is available and not closed
			iconEl.setAttribute('class', 'de-fav-inf-icon');
			titleEl.removeAttribute('title');
			if(entry.err) { // Cancel error status if existed
				delete entry.err;
				isUpdate = true;
			}
		}
		// Updating the posts counters
		let newCount = 0;
		let youCount = 0;
		const lastNum = entry.last.match(/\d+$/)?.[0] || 0;
		const posts = $Q(aib.qPost, formEl);
		const postsLen = posts.length;
		for(let j = 0; j < postsLen; ++j) {
			const post = posts[j];
			if(lastNum >= aib.getPNum(post)) {
				continue;
			}
			newCount++;
			if(isPostRefToYou(post)) {
				youCount++;
			}
		}
		if(newCount !== entry.new || entry.cnt !== postsLen + 1) {
			isUpdate = true;
		}
		totalEl.textContent = entry.cnt = postsLen + 1;
		if(newCount) {
			newEl.textContent = entry.new = newCount;
			$show(newEl);
			if(youCount) {
				youEl.textContent = entry.you = youCount;
				$show(youEl);
			}
		} else {
			$hide(newEl);
			$hide(youEl);
		}
	}
	AjaxCache.clearCache();
	if(needClear404) {
		if(isUpdate) {
			remove404Favorites(favObj);
		}
		parentEl.classList.remove('de-fav-table-unfold');
	} else if(isUpdate) {
		saveFavorites(favObj);
	}
}

function showFavoritesWindow(body, favObj) {
	let html = '';
	// Create the list of favorite threads
	for(const host in favObj) {
		if(!$hasProp(favObj, host)) {
			continue;
		}
		const boards = favObj[host];
		for(const board in boards) {
			if(!$hasProp(boards, board)) {
				continue;
			}
			const threads = boards[board];
			const hb = `de-host="${ host }" de-board="${ board }"`;
			const delBtn = `<span class="de-fav-del-btn">
				<svg><use xlink:href="#de-symbol-win-close"></use></svg>
			</span>`;
			let tNums;
			const tArr = Object.entries(threads);
			switch(Cfg.favThrOrder) {
			case 0: tNums = tArr; break;
			case 1: tNums = tArr.reverse(); break;
			case 2: tNums = tArr.sort((a, b) => (a[1].time || 0) - (b[1].time || 0)); break;
			case 3: tNums = tArr.sort((a, b) => (b[1].time || 0) - (a[1].time || 0));
			}
			let innerHtml = '';
			for(let i = 0, len = tNums.length; i < len; ++i) {
				const tNum = tNums[i][0];
				if(tNum === 'url' || tNum === 'hide') {
					continue;
				}
				const entry = threads[tNum];
				// Generate DOM for separate entry
				const favLinkHref = entry.url + (
					!entry.last ? '' :
					entry.last.startsWith('#') ? entry.last :
					host === aib.host ? aib.anchor + entry.last : '');
				const favInfIwrapTitle = !entry.err ? '' :
					entry.err === 'Closed' ? `title="${ Lng.thrClosed[lang] }"` : `title="${ entry.err }"`;
				const favInfIconClass = !entry.err ? '' :
					entry.err === 'Closed' || entry.err === 'Archived' ? 'de-fav-closed' : 'de-fav-unavail';
				const favInfYouDisp = entry.you ? '' : ' style="display: none;"';
				const favInfNewDisp = entry.new ? '' : ' style="display: none;"';
				innerHtml += `<div class="de-entry ${ aib.cReply }" ${
					hb } de-num="${ tNum }" de-url="${ entry.url }">
					${ delBtn }
					<a class="de-fav-link" title="${ Lng.goToThread[lang] }" ${ hb }` +
						` href="${ favLinkHref }" rel="noreferrer">${ tNum }</a>
					<div class="de-entry-title">- ${ entry.txt }</div>
					<div class="de-fav-inf">
						<span class="de-fav-inf-iwrap" ${ favInfIwrapTitle }>
							<svg class="de-fav-inf-icon ${ favInfIconClass }">
								<use class="de-fav-closed-use" xlink:href="#de-symbol-closed"/>
								<use class="de-fav-unavail-use" xlink:href="#de-symbol-unavail"/>
								<use class="de-fav-wait-use" xlink:href="#de-symbol-wait"/>
							</svg>
						</span>
						<span class="de-fav-inf-you" title="${ Lng.myPostsRep[lang] }"${ favInfYouDisp }>
							${ entry.you || 0 }</span>
						<span class="de-fav-inf-new" title="${ Lng.newPosts[lang] }"${ favInfNewDisp }>
							${ entry.new || 0 }</span>
						<span class="de-fav-inf-old" title="${ Lng.oldPosts[lang] }">${ entry.cnt }</span>
						<span class="de-fav-inf-page" title="${ Lng.thrPage[lang] }"></span>
					</div>
				</div>`;
			}
			if(!innerHtml) {
				continue;
			}
			const isHide = threads.hide === undefined ? host !== aib.host : threads.hide;
			// Building a foldable block for specific board
			html += `<div class="de-fold-block${
				host === aib.host && board === aib.b ? ' de-fav-current' : '' }">
				<div class="de-fav-header">
					${ delBtn }
					<a class="de-fav-header-link" title="${ Lng.goToBoard[lang] }"` +
						` href="${ threads.url }" rel="noreferrer">${ host }/${ board }</a>
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
			let el = nav.fixEventEl(e.target);
			let parentEl = el.parentNode;
			if(el.tagName.toLowerCase() === 'svg') {
				el = parentEl;
				parentEl = parentEl.parentNode;
			}
			switch(el.className) {
			case 'de-fav-link':
				sesStorage['de-fav-win'] = '1'; // Favorites will open again after following a link
				// We need to scroll to last seen post after following a link,
				// remembering of scroll position is no longer needed
				sesStorage.removeItem('de-scroll-' +
					parentEl.getAttribute('de-board') + (parentEl.getAttribute('de-num') || ''));
				break;
			case 'de-fav-del-btn': {
				const wasChecked = el.hasAttribute('de-checked');
				const toggleFn = btnEl => btnEl.toggleAttribute('de-checked', !wasChecked);
				toggleFn(el);
				if(parentEl.className === 'de-fav-header') {
					// Select/unselect all checkboxes in board block
					const entriesEl = parentEl.nextElementSibling;
					$Q('.de-fav-del-btn', entriesEl).forEach(toggleFn);
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
				e.preventDefault();
				entriesEl.classList.toggle('de-fav-entries-hide');
			}
			}
		});
	} else {
		body.insertAdjacentHTML('beforeend', `<center><b>${ Lng.noFavThr[lang] }</b></center>`);
	}

	const btns = $bEnd(body, '<div id="de-fav-buttons"></div>');
	btns.append(
		// "Edit" button. Calls a popup with editor to edit Favorites in JSON.
		getEditButton('favor', fn => readFavorites().then(favObj => fn(favObj, true, saveRenewFavorites))),

		// "Refresh" button. Updates counters of new posts for each thread entry.
		$button(Lng.refresh[lang], Lng.refreshCounters[lang], () => refreshFavorites(false)),

		// "Clear" button. Updates counters of new posts and clears 404 threads.
		$button(Lng.clear[lang], Lng.refreshClear404[lang], () => refreshFavorites(true)),

		// "Page" button. Shows on which page every thread is existed.
		$button(Lng.page[lang], Lng.infoPage[lang], async () => {
			const els = $Q('.de-fav-current > .de-fav-entries > .de-entry');
			const len = els.length;
			if(!len) { // Cancel if no existed entries
				return;
			}
			$popup('load-pages', Lng.loading[lang], true);
			// Create indexed array of entries and "waiting" SVG icon for each entry
			const thrInfo = [];
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
			const endPage = (aib.lastPage || 10) + 1; // Check up to 10 page, if we donʼt know
			let infoLoaded = 0;
			const updateInf = (inf, page) => {
				inf.iconEl.setAttribute('class', inf.iconClass);
				if(inf.iconTitle) {
					inf.titleEl.title = inf.iconTitle;
				} else {
					inf.titleEl.removeAttribute('title');
				}
				inf.pageEl.textContent = '@' + page;
			};
			for(let page = 0; page < endPage; ++page) {
				const tNums = new Set();
				try {
					const form = await ajaxLoad(aib.getPageUrl(aib.b, page));
					const els = DelForm.getThreads(form);
					for(let i = 0, len = els.length; i < len; ++i) {
						tNums.add(aib.getTNum(els[i]));
					}
				} catch(err) {
					continue;
				}
				// Search for threads on current page
				for(let i = 0; i < len; ++i) {
					const inf = thrInfo[i];
					if(tNums.has(inf.num)) {
						updateInf(inf, page);
						inf.found = true;
						infoLoaded++;
					}
				}
				if(infoLoaded === len) { // Stop pages loading when all favorite threads checked
					break;
				}
			}
			// Process missed threads that not found
			for(let i = 0; i < len; ++i) {
				const inf = thrInfo[i];
				if(!inf.found) {
					updateInf(inf, '?');
				}
			}
			closePopup('load-pages');
		})
	);

	// Deletion of confirm/cancel buttons
	const delBtns = $bEnd(body, '<div id="de-fav-del-confirm" style="display: none;"></div>');
	delBtns.append(
		$button(Lng.remove[lang], Lng.delEntries[lang], () => {
			$Q('.de-entry > .de-fav-del-btn[de-checked]', body).forEach(
				el => el.parentNode.setAttribute('de-removed', ''));
			remove404Favorites();
			$show(btns);
			$hide(delBtns);
		}),
		$button(Lng.cancel[lang], '', () => {
			$Q('.de-fav-del-btn', body).forEach(el => el.removeAttribute('de-checked'));
			$show(btns);
			$hide(delBtns);
		})
	);
}
