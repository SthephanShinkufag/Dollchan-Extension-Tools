//============================================================================================================
//													PLAYERS
//============================================================================================================

YouTube = new function() {
	var instance, vData, embedType, videoType, width, height, isHD, loadTitles,
		vimReg = /^https?:\/\/(?:www\.)?vimeo\.com\/(?:[^\?]+\?clip_id=)?(\d+).*?$/;

	function addThumb(el, m, isYtube) {
		var wh = ' width="' + width + '" height="' + height + '"></a>';
		if(isYtube) {
			el.innerHTML = '<a href="https://www.youtube.com/watch?v=' + m[1] + '" target="_blank">' +
				'<img class="de-video-thumb de-ytube" src="https://i.ytimg.com/vi/' + m[1] +
				'/0.jpg"' + wh;
		} else {
			el.innerHTML = '<a href="https://vimeo.com/' + m[1] + '" target="_blank">' +
				'<img class="de-video-thumb de-vimeo" src=""' + wh;
			GM_xmlhttpRequest({
				'method': 'GET',
				'url': 'http://vimeo.com/api/v2/video/' + m[1] + '.json',
				'onload': function(xhr){
					this.setAttribute('src', JSON.parse(xhr.responseText)[0]['thumbnail_large']);
				}.bind(el.firstChild.firstChild)
			});
		}
	}

	function addPlayer(el, m, isYtube) {
		var time, id = m[1],
			wh = ' width="' + width + '" height="' + height + '">';
		if(isYtube) {
			time = (m[2] ? m[2] * 3600 : 0) + (m[3] ? m[3] * 60 : 0) + (m[4] ? +m[4] : 0);
			el.innerHTML = videoType === 1 ?
				'<iframe type="text/html" src="https://www.youtube.com/embed/' + id +
					(isHD ? '?hd=1&' : '?') + 'start=' + time + '&html5=1&rel=0" frameborder="0"' + wh :
				'<embed type="application/x-shockwave-flash" src="https://www.youtube.com/v/' + id +
					(isHD ? '?hd=1&' : '?') + 'start=' + time + '" allowfullscreen="true" wmode="transparent"' + wh;
		} else {
			el.innerHTML = videoType === 1 ?
				'<iframe src="//player.vimeo.com/video/' + id +
					'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen' + wh :
				'<embed type="application/x-shockwave-flash" src="http://vimeo.com/moogaloop.swf?clip_id=' + id +
					'&server=vimeo.com&color=00adef&fullscreen=1" ' +
					'allowscriptaccess="always" allowfullscreen="true"' + wh;
		}
	}

	function addLink(post, m, loader, link, isYtube) {
		var msg, src, time, dataObj;
		post.hasYTube = true;
		if(post.ytInfo === null) {
			if(embedType === 2) {
				addPlayer(post.ytObj, post.ytInfo = m, isYtube);
			} else if(embedType > 2) {
				addThumb(post.ytObj, post.ytInfo = m, isYtube);
			}
		} else if(!link && $q('.de-video-link[href*="' + m[1] + '"]', post.msg)) {
			return;
		}
		if(loader && (dataObj = vData[m[1]])) {
			post.ytData.push(dataObj);
		}
		if(m[4] || m[3] || m[2]) {
			if(m[4] >= 60) {
				m[3] = (m[3] || 0) + Math.floor(m[4] / 60);
				m[4] %= 60;
			}
			if(m[3] >= 60) {
				m[2] = (m[2] || 0) + Math.floor(m[3] / 60);
				m[3] %= 60;
			}
			time = (m[2] ? m[2] + 'h' : '') + (m[3] ? m[3] + 'm' : '') + (m[4] ? m[4] + 's' : '');
		}
		if(link) {
			link.href = link.href.replace(/^http:/, 'https:');
			if(time) {
				link.setAttribute('de-time', time);
			}
			if(dataObj) {
				link.textContent = dataObj[0];
				link.className = 'de-video-link de-ytube de-video-title';
				link.setAttribute('de-author', dataObj[1]);
			} else {
				link.className = 'de-video-link ' + (isYtube ? 'de-ytube' : 'de-vimeo');
			}
		} else {
			src = isYtube ? 'https://www.youtube.com/watch?v=' + m[1] + (time ? '#t=' + time : '')
				: 'https://vimeo.com/' + m[1];
			post.msg.insertAdjacentHTML('beforeend',
				'<p class="de-video-ext"><a ' + (dataObj ? 'de-author="' + dataObj[1] + '" ' : '') +
					(time ? 'de-time="' + time + '" ' : '') +
					'class="de-video-link ' + (isYtube ? 'de-ytube' : 'de-vimeo') +
					(dataObj ? ' de-video-title' : '') +
					'" href="' + src + '">' + (dataObj ? dataObj[0] : src) + '</a></p>');
			link = post.msg.lastChild.firstChild;
		}
		if(!post.ytInfo || post.ytInfo === m) {
			post.ytLink = link;
		}
		link.ytInfo = m;
		if(loader && !dataObj) {
			post.ytLinksLoading++;
			loader.run([post, link, m[1]]);
		}
	}

	function getYtubeTitleLoader() {
		var queueEnd, queue = new $queue(4, function(qIdx, num, data) {
			if(num % 30 === 0) {
				queue.pause();
				setTimeout(queue.continue.bind(queue), 3e3);
			}
			GM_xmlhttpRequest({
				'method': 'GET',
				'url': 'https://gdata.youtube.com/feeds/api/videos/' + data[2] +
					'?alt=json&fields=title/text(),author/name',
				'onreadystatechange': function(idx, xhr) {
					if(xhr.readyState !== 4) {
						return;
					}
					var entry, title, author, data, post = this[0], link = this[1];
					try {
						if(xhr.status === 200) {
							entry = JSON.parse(xhr.responseText)['entry'];
							title = entry['title']['$t'];
							author = entry['author'][0]['name']['$t'];
						}
					} finally {
						if(title) {
							link.textContent = title;
							link.setAttribute('de-author', author);
							link.classList.add('de-video-title');
							vData[this[2]] = data = [title, author];
							post.ytData.push(data);
							post.ytLinksLoading--;
							if(post.ytHideFun !== null) {
								post.ytHideFun(data);
							}
						}
						setTimeout(queueEnd, 250, idx);
					}
				}.bind(data, qIdx)
			});
		}, function() {
			sessionStorage['de-ytube-data'] = JSON.stringify(vData);
			queue = queueEnd = null;
		});
		queueEnd = queue.end.bind(queue);
		return queue;
	}

	function YouTubeSingleton() {
		if(instance) {
			return instance;
		}
		instance = this;
		embedType = Cfg['addYouTube'];
		if(embedType === 0) {
			this.parseLinks = emptyFn;
			this.updatePost = emptyFn;
		}
		loadTitles = Cfg['YTubeTitles'];
		if(loadTitles) {
			vData = JSON.parse(sessionStorage['de-ytube-data'] || '{}');
		}
		videoType = Cfg['YTubeType'];
		width = Cfg['YTubeWidth'];
		height = Cfg['YTubeHeigh'];
		isHD = Cfg['YTubeHD'];
	}
	YouTubeSingleton.prototype = {
		embedType: embedType,
		ytReg: /^https?:\/\/(?:www\.|m\.)?youtu(?:be\.com\/(?:watch\?.*?v=|v\/|embed\/)|\.be\/)([^&#?]+).*?(?:t(?:ime)?=(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?)?$/,
		vData: vData,

		addPlayer: addPlayer,
		addThumb: addThumb,
		parseLinks: function(post) {
			var i, len, els, el, src, m, embedTube = [],
				loader = loadTitles && getYtubeTitleLoader();
			for(i = 0, els = $Q('embed, object, iframe', post ? post.el : dForm), len = els.length; i < len; ++i) {
				el = els[i];
				src = el.src || el.data;
				if(m = src.match(this.ytReg)) {
					embedTube.push(post || aib.getPostEl(el).post, m, true);
					$del(el);
				}
				if(Cfg['addVimeo'] && (m = src.match(vimReg))) {
					embedTube.push(post || aib.getPostEl(el).post, m, false);
					$del(el);
				}
			}
			for(i = 0, els = $Q('a[href*="youtu"]', post ? post.el : dForm), len = els.length; i < len; ++i) {
				el = els[i];
				if(m = el.href.match(this.ytReg)) {
					addLink(post || aib.getPostEl(el).post, m, loader, el, true);
				}
			}
			if(Cfg['addVimeo']) {
				for(i = 0, els = $Q('a[href*="vimeo.com"]', post ? post.el : dForm), len = els.length; i < len; ++i) {
					el = els[i];
					if(m = el.href.match(vimReg)) {
						addLink(post || aib.getPostEl(el).post, m, null, el, false);
					}
				}
			}
			for(i = 0, len = embedTube.length; i < len; i += 3) {
				addLink(embedTube[i], embedTube[i + 1], loader, null, embedTube[i + 2]);
			}
			loader && loader.complete();
		},
		updatePost: function(post, oldLinks, newLinks, cloned) {
			var i, j, el, link, m, loader = !cloned && loadTitles && getYtubeTitleLoader(),
				len = newLinks.length;
			for(i = 0, j = 0; i < len; i++) {
				el = newLinks[i];
				link = oldLinks[j];
				if(link && link.classList.contains('de-current')) {
					post.ytLink = el;
				}
				if(cloned) {
					el.ytInfo = link.ytInfo;
					j++;
				} else if(m = el.href.match(this.ytReg)) {
					addLink(post, m, loader, el, true);
					j++;
				}
			}
			post.ytLink = post.ytLink || newLinks[0];
			loader && loader.complete();
		}
	};

	return YouTubeSingleton;
}

function embedMP3Links(post) {
	var el, link, src, i, els, len;
	if(!Cfg['addMP3']) {
		return;
	}
	for(i = 0, els = $Q('a[href*=".mp3"]', post ? post.el : dForm), len = els.length; i < len; ++i) {
		link = els[i];
		if(link.target !== '_blank' && link.rel !== 'nofollow') {
			continue;
		}
		src = link.href;
		el = (post || aib.getPostEl(link).post).mp3Obj;
		if(nav.canPlayMP3) {
			if(!$q('audio[src="' + src + '"]', el)) {
				el.insertAdjacentHTML('beforeend',
					'<p><audio src="' + src + '" preload="none" controls></audio></p>');
				link = el.lastChild.firstChild;
				link.addEventListener('play', updater.addPlayingTag, false);
				link.addEventListener('pause', updater.removePlayingTag, false);
			}
		} else if(!$q('object[FlashVars*="' + src + '"]', el)) {
			el.insertAdjacentHTML('beforeend', '<object data="http://junglebook2007.narod.ru/audio/player.swf" type="application/x-shockwave-flash" wmode="transparent" width="220" height="16" FlashVars="playerID=1&amp;bg=0x808080&amp;leftbg=0xB3B3B3&amp;lefticon=0x000000&amp;rightbg=0x808080&amp;rightbghover=0x999999&amp;rightcon=0x000000&amp;righticonhover=0xffffff&amp;text=0xffffff&amp;slider=0x222222&amp;track=0xf5f5dc&amp;border=0x666666&amp;loader=0x7fc7ff&amp;loop=yes&amp;autostart=no&amp;soundFile=' + src + '"><br>');
		}
	}
}

