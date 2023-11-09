/* ==[ Players.js ]===========================================================================================
                                          PLAYERS / LINKS EMBEDDERS
                                youtube, vimeo, mp3, vocaroo embedding players
=========================================================================================================== */

class Videos {
	constructor(post, player = null, playerInfo = null) {
		this.currentLink = null;
		this.hasLinks = false;
		this.linksCount = 0;
		this.loadedLinksCount = 0;
		this.playerInfo = null;
		this.post = post;
		this.titleLoadFn = null;
		this.vData = [[], []];
		if(player && playerInfo) {
			Object.defineProperty(this, 'player', { value: player });
			this.playerInfo = playerInfo;
		}
	}
	static addPlayer(obj, m, isYtube, enableJsapi = false) {
		const el = obj.player;
		obj.playerInfo = m;
		let txt;
		if(isYtube) {
			const list = m[0].match(/list=[^&#]+/);
			txt = `<iframe class="de-video-player" src="https://www.youtube.com/embed/${ m[1] }?start=` +
				((m[2] ? m[2] * 3600 : 0) + (m[3] ? m[3] * 60 : 0) + (m[4] ? +m[4] : 0)) +
				(enableJsapi ? '&enablejsapi=1' : Cfg.embedYTube === 1 ? '&autoplay=1' : '') +
				(list ? '&' + list[0] : '') + '" frameborder="0" allowfullscreen></iframe>';
		} else {
			const id = m[1] + (m[2] ? m[2] : '');
			txt = `<iframe class="de-video-player" src="${ aib.protocol }//player.vimeo.com/video/${ id }${
				Cfg.embedYTube === 1 ? '?autoplay=1' : ''
			}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`;
		}
		el.innerHTML = txt + (enableJsapi ? '' :
			`<span class="de-video-resizer" title="${ Lng.expandVideo[lang] }"></span>`);
		$show(el);
		if(!enableJsapi) {
			el.lastChild.onclick = e => e.target.parentNode.classList.toggle('de-video-expanded');
		}
	}
	static setLinkData(link, data, isCloned = false) {
		const [title, author, views, publ, duration] = data;
		if(Panel.isVidEnabled && !isCloned) {
			const clonedLink = $q(`.de-entry > .de-video-link[href="${ link.href }"]:not(title)`);
			if(clonedLink) {
				Videos.setLinkData(clonedLink, data, true);
			}
		}
		link.textContent = title;
		link.classList.add('de-video-title');
		link.setAttribute('de-author', author);
		link.title = (duration ? Lng.duration[lang] + duration : '') +
			(publ ? `, ${ Lng.published[lang] + publ }\n` : '') +
			Lng.author[lang] + author + (views ? ', ' + Lng.views[lang] + views : '');
	}
	get player() {
		const { post } = this;
		const value = $bBegin(post.msg, `<div class="de-video-obj${
			post.images.hasAttachments && !post.isOp ? ' de-video-obj-inline' : '' }"></div>`);
		Object.defineProperty(this, 'player', { value });
		return value;
	}
	addLink(m, loader, link, isYtube) {
		this.hasLinks = true;
		this.linksCount++;
		if(this.playerInfo === null) {
			if(Cfg.embedYTube === 1) {
				this._addThumb(m, isYtube);
			}
		} else if(!link && $q(`.de-video-link[href*="${ m[1] }"]`, this.post.msg)) {
			return;
		}
		let dataObj;
		if(loader && (dataObj = Videos._global.vData[+!isYtube][m[1]])) {
			this.vData[+!isYtube].push(dataObj);
		}
		let time = '';
		[time, m[2], m[3], m[4]] = Videos._fixTime(m[4], m[3], m[2]);
		if(link) {
			link.href = link.href.replace(/^http:/, 'https:');
			if(time) {
				link.setAttribute('de-time', time);
			}
			link.className = `de-video-link ${ isYtube ? 'de-ytube' : 'de-vimeo' }`;
		} else {
			const src = isYtube ?
				`${ aib.protocol }//www.youtube.com/watch?v=${ m[1] }${ time ? '#t=' + time : '' }` :
				`${ aib.protocol }//vimeo.com/${ m[1] }`;
			link = $bEnd(this.post.msg, `<p class="de-video-ext"><a class="de-video-link ${
				isYtube ? 'de-ytube' : 'de-vimeo' }${ time ? '" de-time="' + time : ''
			}" href="${ src }">${ dataObj ? '' : src }</a></p>`).firstChild;
		}
		if(dataObj) {
			Videos.setLinkData(link, dataObj);
		}
		if(this.playerInfo === null || this.playerInfo === m) {
			this.currentLink = link;
		}
		link.videoInfo = m;
		let vidListEl;
		if(Panel.isVidEnabled && (vidListEl = $id('de-video-list'))) {
			updateVideoList(vidListEl, link, this.post.num);
		}
		if(loader && !dataObj) {
			loader.runTask([link, isYtube, this, m[1]]);
		}
	}
	clickLink(el, mode) {
		const m = el.videoInfo;
		if(this.playerInfo !== m) {
			this.currentLink.classList.remove('de-current');
			this.currentLink = el;
			if(mode === 1) {
				this._addThumb(m, el.classList.contains('de-ytube'));
			} else {
				el.classList.add('de-current');
				this.setPlayer(m, el.classList.contains('de-ytube'));
			}
			return;
		}
		if(mode === 1) {
			if($q('.de-video-thumb', this.player)) {
				el.classList.add('de-current');
				this.setPlayer(m, el.classList.contains('de-ytube'));
			} else {
				el.classList.remove('de-current');
				this._addThumb(m, el.classList.contains('de-ytube'));
			}
		} else {
			el.classList.remove('de-current');
			$hide(this.player);
			this.player.innerHTML = '';
			this.playerInfo = null;
		}
	}
	setPlayer(m, isYtube) {
		Videos.addPlayer(this, m, isYtube);
	}
	toggleFloatedThumb(linkEl, isOutEvent) {
		let el = $id('de-video-thumb-floated');
		if(isOutEvent) {
			el.remove();
			return;
		}
		if(!el) {
			el = $bEnd(doc.body, `<img id="de-video-thumb-floated" src="https://i.ytimg.com/vi/${
				linkEl.videoInfo[1] }/0.jpg">`);
		}
		const cr = linkEl.getBoundingClientRect();
		const pvHeight = Cfg.YTubeHeigh;
		const isTop = cr.top + cr.height + pvHeight < nav.viewportHeight();
		el.style.cssText = `position: absolute; left: ${ deWindow.pageXOffset + cr.left }px; top: ${
			deWindow.pageYOffset + (isTop ? cr.top + cr.height : cr.top - pvHeight) }px; width: ${
			Cfg.YTubeWidth }px; height: ${ pvHeight }px; z-index: 9999;`;
	}
	updatePost(oldLinks, newLinks, cloned) {
		const loader = !cloned && Videos._getTitlesLoader();
		let j = 0;
		for(let i = 0, len = newLinks.length; i < len; ++i) {
			const el = newLinks[i];
			const link = oldLinks[j];
			if(link?.classList.contains('de-current')) {
				this.currentLink = el;
			}
			if(cloned) {
				el.videoInfo = link.videoInfo;
				j++;
			} else {
				const m = el.href.match(Videos.ytReg);
				if(m) {
					this.addLink(m, loader, el, true);
					j++;
				}
			}
		}
		this.currentLink = this.currentLink || newLinks[0];
		if(loader) {
			loader.completeTasks();
		}
	}

	static _fixTime(seconds = 0, minutes = 0, hours = 0) {
		if(seconds >= 60) {
			minutes += Math.floor(seconds / 60);
			seconds %= 60;
		}
		if(minutes >= 60) {
			hours += Math.floor(seconds / 60);
			minutes %= 60;
		}
		return [
			(hours ? hours + 'h' : '') +
			(minutes ? minutes + 'm' : '') +
			(seconds ? seconds + 's' : ''),
			hours, minutes, seconds
		];
	}
	static _getTitlesLoader() {
		return Cfg.YTubeTitles && new TasksPool(4, (num, info) => {
			const [, isYtube,, id] = info;
			if(isYtube) {
				return Cfg.ytApiKey ? Videos._getYTInfoAPI(info, num, id) :
					Videos._getYTInfoOembed(info, num, id);
			}
			return $ajax(`${ aib.protocol }//vimeo.com/api/v2/video/${ id }.json`, null, true).then(xhr => {
				const entry = JSON.parse(xhr.responseText)[0];
				return Videos._titlesLoaderHelper(
					info, num,
					entry.title,
					entry.user_name,
					entry.stats_number_of_plays,
					/(.*)\s(.*)?/.exec(entry.upload_date)[1],
					Videos._fixTime(entry.duration)[0]);
			}).catch(() => Videos._titlesLoaderHelper(info, num));
		}, () => (sesStorage['de-videos-data2'] = JSON.stringify(Videos._global.vData)));
	}
	static _getYTInfoAPI(info, num, id) {
		return $ajax(
			`https://www.googleapis.com/youtube/v3/videos?key=${ Cfg.ytApiKey }&id=${ id }` +
			'&part=snippet,statistics,contentDetails&fields=items/snippet/title,items/snippet/publishedAt,' +
			'items/snippet/channelTitle,items/statistics/viewCount,items/contentDetails/duration',
			null, true
		).then(xhr => {
			const items = JSON.parse(xhr.responseText).items[0];
			return Videos._titlesLoaderHelper(
				info, num,
				items.snippet.title,
				items.snippet.channelTitle,
				items.statistics.viewCount,
				items.snippet.publishedAt.substr(0, 10),
				items.contentDetails.duration.substr(2).toLowerCase());
		}).catch(() => Videos._getYTInfoOembed(info, num, id));
	}
	static _getYTInfoOembed(info, num, id) {
		const canSendCORS = nav.canUseFetch;
		return (canSendCORS ?
			$ajax(`https://www.youtube.com/oembed?url=http%3A//youtube.com/watch%3Fv%3D${
				id }&format=json`, null, true) :
			$ajax(`https://noembed.com/embed?url=http%3A//youtube.com/watch%3Fv%3D${ id }&callback=?`)
		).then(xhr => {
			const res = xhr.responseText;
			const json = JSON.parse(canSendCORS ? res : res.replace(/^[^{]+|\)$/g, ''));
			return Videos._titlesLoaderHelper(info, num, json.title, json.author_name, null, null, null);
		}).catch(() => Videos._titlesLoaderHelper(info, num));
	}
	static _titlesLoaderHelper([link, isYtube, videoObj, id], num, ...data) {
		if(data.length) {
			Videos.setLinkData(link, data);
			Videos._global.vData[+!isYtube][id] = data;
			videoObj.vData[+!isYtube].push(data);
			if(videoObj.titleLoadFn) {
				videoObj.titleLoadFn(data);
			}
		}
		videoObj.loadedLinksCount++;
		// Wait for 3 sec every 30 links
		if(num % 30 === 0) {
			return Promise.reject(new TasksPool.PauseError(3e3));
		}
		return new Promise(resolve => setTimeout(resolve, 250));
	}
	_addThumb(m, isYtube) {
		const el = this.player;
		this.playerInfo = m;
		el.classList.remove('de-video-expanded');
		$show(el);
		const str = `<a class="de-video-player" href="${ aib.protocol }`;
		if(isYtube) {
			el.innerHTML = `${ str }//www.youtube.com/watch?v=${ m[1] }" target="_blank">` +
				`<img class="de-video-thumb de-ytube" src="https://i.ytimg.com/vi/${ m[1] }/0.jpg"></a>`;
			return;
		}
		el.innerHTML = `${ str }//vimeo.com/${ m[1] }" target="_blank">` +
			'<img class="de-video-thumb de-vimeo" src=""></a>';
		$ajax(`${ aib.protocol }//vimeo.com/api/v2/video/${ m[1] }.json`, null, true).then(xhr => {
			el.firstChild.firstChild.setAttribute('src', JSON.parse(xhr.responseText)[0].thumbnail_large);
		}).catch(Function.prototype);
	}
}
Videos.ytReg =
	/^https?:\/\/(?:www\.|m\.)?youtu(?:be\.com\/(?:watch\?.*?v=|v\/|embed\/)|\.be\/)([a-zA-Z0-9-_]+).*?(?:t(?:ime)?=(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?)?$/;
Videos.vimReg =
	/^https?:\/\/(?:www\.)?vimeo\.com\/(?:[^?]+\?clip_id=|.*?\/)?(\d+).*?(#t=\d+)?$/;
Videos._global = {
	get vData() {
		let value;
		try {
			value = Cfg.YTubeTitles ? JSON.parse(sesStorage['de-videos-data2'] || '[{}, {}]') : [{}, {}];
		} catch(err) {
			value = [{}, {}];
		}
		Object.defineProperty(this, 'vData', { value });
		return value;
	}
};

class VideosParser {
	constructor() {
		this._loader = Videos._getTitlesLoader();
	}
	endParser() {
		if(this._loader) {
			this._loader.completeTasks();
		}
	}
	parse(data) {
		const isPost = data instanceof AbstractPost;
		const loader = this._loader;
		VideosParser._parserHelper('a[href*="youtu"]', data, loader, isPost, true, Videos.ytReg);
		if(Cfg.addVimeo) {
			VideosParser._parserHelper('a[href*="vimeo.com"]', data, loader, isPost, false, Videos.vimReg);
		}
		const vids = aib.fixVideo(isPost, data);
		for(let i = 0, len = vids.length; i < len; ++i) {
			const [post, m, isYtube] = vids[i];
			if(post) {
				post.videos.addLink(m, loader, null, isYtube);
			}
		}
		return this;
	}

	static _parserHelper(qPath, data, loader, isPost, isYtube, reg) {
		const links = $Q(qPath, isPost ? data.el : data);
		for(let i = 0, len = links.length; i < len; ++i) {
			const link = links[i];
			const m = link.href.match(reg);
			if(m) {
				const mPost = isPost ? data : aib.getPostOfEl(link);
				if(mPost) {
					mPost.videos.addLink(m, loader, link, isYtube);
				}
			}
		}
	}
}

// Embed .mp3 and Vocaroo links
function embedAudioLinks(data) {
	const isPost = data instanceof AbstractPost;
	if(Cfg.addMP3) {
		const els = $Q('a[href*=".mp3"], a[href*=".opus"]', isPost ? data.el : data);
		for(let i = 0, len = els.length; i < len; ++i) {
			const link = els[i];
			if((link.target !== '_blank' && link.rel !== 'nofollow') ||
				!link.pathname.includes('.mp3') && !link.pathname.includes('.opus')
			) {
				continue;
			}
			const src = link.href;
			const el = (isPost ? data : aib.getPostOfEl(link)).mp3Obj;
			if(nav.canPlayMP3) {
				if(!$q(`audio[src="${ src }"]`, el)) {
					el.insertAdjacentHTML('beforeend',
						`<p><audio src="${ src }" preload="none" controls></audio></p>`);
				}
			// Flash plugin for old browsers that not support HTML5 audio
			} else if(!$q(`object[FlashVars*="${ src }"]`, el)) {
				el.insertAdjacentHTML('beforeend', '<object data="' +
					'http://junglebook2007.narod.ru/audio/player.swf" type="application/x-shockwave-flash" ' +
					'wmode="transparent" width="220" height="16" FlashVars="playerID=1&amp;' +
					'bg=0x808080&amp;leftbg=0xB3B3B3&amp;lefticon=0x000000&amp;rightbg=0x808080&amp;' +
					'rightbghover=0x999999&amp;rightcon=0x000000&amp;righticonhover=0xffffff&amp;' +
					'text=0xffffff&amp;slider=0x222222&amp;track=0xf5f5dc&amp;border=0x666666&amp;' +
					`loader=0x7fc7ff&amp;loop=yes&amp;autostart=no&amp;soundFile=${ src }"><br>`);
			}
		}
	}
	if(Cfg.addVocaroo) {
		$Q('a[href*="voca.ro"], a[href*="vocaroo.com"]', isPost ? data.el : data).forEach(link => {
			if(!(link.previousSibling?.className === 'de-vocaroo')) {
				link.insertAdjacentHTML('beforebegin',
					`<iframe class="de-vocaroo" width="300" height="48" src="https://vocaroo.com/embed/${
						getFileName(link.href) }" frameborder="0"></iframe>`);
			}
		});
	}
}
