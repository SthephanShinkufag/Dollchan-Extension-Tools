/* ==[ WindowFavorites.js ]===================================================================================
                                              WINDOW: FAVORITES
=========================================================================================================== */

function saveRenewFavorites(favObj) {
	saveFavorites(favObj);
	toggleWindow('fav', true, favObj);
}

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

function toggleThrFavBtn(host, board, num, isEnable) {
	if(host === aib.host && board === aib.b && pByNum.has(num)) {
		const post = pByNum.get(num);
		post.toggleFavBtn(isEnable);
		post.thr.isFav = isEnable;
	}
}

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
				isUpdate = true;
			}
			entry.err = value;
			break;
		case 'update':
			if(entry.cnt !== value[0]) {
				isUpdate = true;
			}
			entry.cnt = value[0];
			entry.new = entry.you = 0;
			entry.last = aib.anchor + value[1];
		}
		if(isUpdate) {
			const data = [aib.host, aib.b, num, value, mode];
			updateFavWindow(...data);
			saveFavorites(favObj);
			sendStorageEvent('__de-favorites', data);
		}
	});
}

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
			const host = el.getAttribute('de-host');
			const board = el.getAttribute('de-board');
			const num = +el.getAttribute('de-num');
			removeFavEntry(favObj, host, board, num);
			toggleThrFavBtn(host, board, num, false);
		}
		saveRenewFavorites(favObj);
	});
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
					<a class="de-fav-link" title="${ Lng.goToThread[lang] }"` +
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
				const wasChecked = el.getAttribute('de-checked') === '';
				const toggleFn = btnEl => $toggleAttr(btnEl, 'de-checked', '', !wasChecked);
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
		$button(Lng.refresh[lang], Lng.infoCount[lang], async () => {
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
				const board = el.getAttribute('de-board');
				const num = el.getAttribute('de-num');
				const entry = favObj[host][board][num];
				// Updating doesnʼt works for other domains because of different posts structure
				// Updating is not needed in closed threads
				if(host !== aib.host || entry.err === 'Closed' || entry.err === 'Archived') {
					continue;
				}
				const [titleEl, youEl, countEl] = [...el.lastElementChild.children];
				const iconEl = titleEl.firstElementChild;
				// setAttribute for class is used because of SVG (for correct work in some browsers)
				iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-wait');
				titleEl.title = Lng.updating[lang];
				let form, isArchived;
				try {
					if(!aib.hasArchive) {
						form = await ajaxLoad(aib.getThrUrl(board, num));
					} else {
						[form, isArchived] = await ajaxLoad(aib.getThrUrl(board, num), true, false, true);
					}
					last404 = false;
				} catch(err) {
					if((err instanceof AjaxError) && err.code === 404) { // Check for 404 error twice
						if(last404) {
							Thread.removeSavedData(board, num); // Not working yet
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
					entry.err = titleEl.title = getErrorMessage(err);
					isUpdate = true;
					continue;
				}
				if(aib.qClosed && $q(aib.qClosed, form)) { // Check for closed thread
					iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-closed');
					titleEl.title = Lng.thrClosed[lang];
					entry.err = 'Closed';
					isUpdate = true;
				} else if(isArchived) {
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
				// Updating a counter of new posts
				const posts = $Q(aib.qPost, form);
				const cnt = posts.length + 1 - entry.cnt;
				countEl.textContent = cnt;
				if(cnt === 0) {
					$hide(countEl); // Hide counter if no new posts
					$hide(youEl);
				} else {
					$show(countEl);
					entry.new = cnt;
					isUpdate = true;
					// Check for replies to my posts
					if(myposts?.[board]) {
						entry.you = 0;
						for(let j = 0; j < cnt; ++j) {
							const links = $Q(aib.qPostMsg.split(', ').join(' a, ') + ' a',
								posts[posts.length - 1 - j]);
							for(let a = 0, len = links.length; a < len; ++a) {
								const tc = links[a].textContent;
								if(tc[0] === '>' && tc[1] === '>' && myposts[board][tc.substr(2)]) {
									entry.you++;
								}
							}
						}
						if(entry.you) {
							youEl.textContent = entry.you;
							$show(youEl);
						}
					}
				}
			}
			AjaxCache.clearCache();
			if(isUpdate) {
				saveFavorites(favObj);
			}
		}),

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
				$toggleAttr(inf.titleEl, 'title', inf.iconTitle, inf.iconTitle);
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
		}),

		// "Clear" button. Allows to clear 404'd threads.
		$button(Lng.clear[lang], Lng.clrDeleted[lang], async () => {
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
				await $ajax(el.getAttribute('de-url'), null, true).then(xhr => {
					switch(el.getAttribute('de-host')) { // Makaba doesnʼt return 404
					case '2ch.hk':
					case '2ch.life': {
						const dc = $createDoc(xhr.responseText);
						if(dc && $q('.message-title', dc)) {
							throw new AjaxError(404, 'Error');
						}
					}
					}
					iconEl.setAttribute('class', 'de-fav-inf-icon');
					titleEl.removeAttribute('title');
					last404 = false;
				}).catch(err => {
					if(err.code === 404) { // Check for 404 error twice
						if(!last404) {
							last404 = true;
							--i; // Repeat this cycle again
							return;
						}
						Thread.removeSavedData(el.getAttribute('de-board'), // Not working yet
							+el.getAttribute('de-num'));
						el.setAttribute('de-removed', ''); // Mark an entry as deleted
					}
					iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-unavail');
					titleEl.title = getErrorMessage(err);
					last404 = false;
				});
			}
			cleanFavorites(); // Delete marked entries
			parent.classList.remove('de-fav-table-unfold');
		})
	);

	// Deletion confirm/cancel buttons
	const delBtns = $bEnd(body, '<div id="de-fav-del-confirm" style="display: none;"></div>');
	delBtns.append(
		$button(Lng.remove[lang], Lng.delEntries[lang], () => {
			$Q('.de-entry > .de-fav-del-btn[de-checked]', body).forEach(
				el => el.parentNode.setAttribute('de-removed', ''));
			cleanFavorites(); // Delete marked entries
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
