//============================================================================================================
//													AJAX
//============================================================================================================

function ajaxLoad(url, loadForm, Fn, errFn) {
	var origXHR = GM_xmlhttpRequest({
		'method': 'GET',
		'url': nav.fixLink(url),
		'onreadystatechange': function(xhr) {
			if(xhr.readyState !== 4) {
				return;
			}
			if(xhr.status !== 200) {
				if(errFn) {
					errFn(xhr.status, xhr.statusText, origXHR);
				}
			} else if(Fn) {
				do {
					var el, text = xhr.responseText;
					if((aib.futa ? /<!--gz-->$/ : /<\/html?>[\s\n\r]*$/).test(text)) {
						el = $DOM(text);
						if(!loadForm || (el = $q(aib.qDForm, el))) {
							Fn(el, origXHR);
							break;
						}
					}
					if(errFn) {
						errFn(0, Lng.errCorruptData[lang], origXHR);
					}
				} while(false);
			}
			loadForm = Fn = errFn = origXHR = null;
		}
	});
	return origXHR;
}

function getJsonPosts(url, Fn) {
	var origXHR = GM_xmlhttpRequest({
		'method': 'GET',
		'url': nav.fixLink(url),
		'onreadystatechange': function(xhr) {
			if(xhr.readyState !== 4) {
				return;
			}
			if(xhr.status === 304) {
				closeAlert($id('de-alert-newposts'));
			} else {
				try {
					var json = JSON.parse(xhr.responseText);
				} catch(e) {
					Fn(1, e.toString(), null, origXHR);
				} finally {
					if(json) {
						Fn(xhr.status, xhr.statusText, json, origXHR);
					}
					Fn = origXHR = null;
				}
			}
		}
	});
}

function loadFavorThread() {
	var post, el = this.parentNode.parentNode,
		ifrm = $t('iframe', el),
		cont = $c('de-content', doc);
	$del($id('de-fav-wait'));
	if(ifrm) {
		$del(ifrm);
		cont.style.overflowY = 'auto';
		return;
	}
	if((post = pByNum[el.getAttribute('info').split(';')[2]]) && !post.hidden) {
		scrollTo(0, pageYOffset + post.el.getBoundingClientRect().top);
		return;
	}
	$del($id('de-iframe-fav'));
	$c('de-content', doc).style.overflowY = 'scroll';
	el.insertAdjacentHTML('beforeend', '<iframe name="de-iframe-fav" id="de-iframe-fav" src="' +
		$t('a', el).href + '" scrolling="no" style="border: none; width: ' +
		(doc.documentElement.clientWidth - 55) + 'px; height: 1px;"><div id="de-fav-wait" ' +
		'class="de-wait" style="font-size: 1.1em; text-align: center">' + Lng.loading[lang] + '</div>');
}

function loadPages(count) {
	var fun, i = pageNum,
		len = Math.min(aib.lastPage + 1, i + count),
		pages = [],
		loaded = 1;
	count = len - i;

	function onLoadOrError(idx, eCodeOrForm, eMsgOrXhr, maybeXhr) {
		if(typeof eCodeOrForm === 'number') {
			pages[idx] = $add('<div><center style="font-size: 2em">' +
				getErrorMessage(eCodeOrForm, eMsgOrXhr) + '</center><hr></div>');
		} else {
			pages[idx] = replacePost(eCodeOrForm);
		}
		if(loaded === count) {
			var el, df, j, parseThrs = Thread.parsed,
				threads = parseThrs ? [] : null;
			for(j in pages) {
				if(j != pageNum) {
					dForm.insertAdjacentHTML('beforeend', '<center style="font-size: 2em">' +
						Lng.page[lang] + ' ' + j + '</center><hr>');
				}
				df = pages[j];
				if(parseThrs) {
					threads = parseThreadNodes(df, threads);
				}
				while(el = df.firstChild) {
					dForm.appendChild(el);
				}
			}
			if(!parseThrs) {
				threads = $Q(aib.qThread, dForm);
			}
			do {
				if(threads.length !== 0) {
					try {
						parseDelform(dForm, threads);
					} catch(e) {
						$alert(getPrettyErrorMessage(e), 'load-pages', true);
						break;
					}
					initDelformAjax()
					readFavorites();
					addDelformStuff(false);
					readUserPosts();
					checkPostsVisib();
					saveFavorites();
					saveUserPosts();
					$each($Q('input[type="password"]', dForm), function(pEl) {
						pr.dpass = pEl;
						pEl.value = Cfg['passwValue'];
					});
					if(keyNav) {
						keyNav.clear(pageNum + count - 1);
					}
				}
				closeAlert($id('de-alert-load-pages'));
			} while(false);
			$disp(dForm);
			loaded = pages = count = null;
		} else {
			loaded++;
		}
	}

	$alert(Lng.loading[lang], 'load-pages', true);
	$each($Q('a[href^="blob:"]', dForm), function(a) {
		window.URL.revokeObjectURL(a.href);
	});
	Pview.clearCache();
	isExpImg = false;
	pByNum = Object.create(null);
	Thread.tNums = [];
	Post.hiddenNums = [];
	$disp(dForm);
	dForm.innerHTML = '';
	if(pr.isQuick) {
		if(pr.file) {
			pr.delFileUtils(getAncestor(pr.file, 'TR'), true);
		}
		pr.txta.value = '';
	}
	while(i < len) {
		fun = onLoadOrError.bind(null, i);
		ajaxLoad(aib.getPageUrl(brd, i++), true, fun, fun);
	}
}

function infoLoadErrors(eCode, eMsg, newPosts) {
	if(eCode === 200 || eCode === 304) {
		closeAlert($id('de-alert-newposts'));
	} else if(eCode === 0) {
		$alert(eMsg || Lng.noConnect[lang], 'newposts', false);
	} else {
		$alert(Lng.thrNotFound[lang] + TNum + '): \n' + getErrorMessage(eCode, eMsg), 'newposts', false);
		if(newPosts !== -1) {
			doc.title = '{' + eCode + '} ' + doc.title;
		}
	}
}

function getHanaFile(file, id) {
	var name, src = file['src'],
		thumb = file['thumb'],
		thumbW = file['thumb_width'],
		thumbH = file['thumb_height'],
		size = file['size'],
		rating = file['rating'],
		maxRating = Cfg['__hanarating'] || 'r-15',
		kb = 1024,
		mb = 1048576,
		gb = 1073741824;
	if(brd === 'b' || brd === 'rf') {
		name = thumb.substring(thumb.lastIndexOf("/") + 1);
	} else {
		name = src.substring(src.lastIndexOf("/") + 1);
		if(name.length > 17) {
			name = name.substring(0, 17) + '...';
		}
	}
	thumb = rating === 'r-18g' && maxRating !== 'r-18g' ? 'images/r-18g.png' :
		rating === 'r-18' && (maxRating !== 'r-18g' || maxRating !== 'r-18') ? 'images/r-18.png' :
		rating === 'r-15' && maxRating === 'sfw' ? 'images/r-15.png' :
		rating === 'illegal' ? 'images/illegal.png' :
		file['thumb'];
	if(thumb !== file['thumb']) {
		thumbW = 200;
		thumbH = 200;
	}
	return '<div class="file"><div class="fileinfo">Файл: <a href="/' + src + '" target="_blank">' +
		name + '</a><br><em>' + file['thumb'].substring(file['thumb'].lastIndexOf('.') + 1) + ', ' + (
			size < kb ? size + ' B' :
			size < mb ? (size / kb).toFixed(2) + ' KB' :
			size < gb ? (size / mb).toFixed(2) + ' MB' :
			(size / gb).toFixed(2) + ' GB'
		) + ', ' + file['metadata']['width'] + 'x' + file['metadata']['height'] +
		'</em><br><a class="edit_ icon" href="/utils/image/edit/' + file['file_id'] + '/' + id +
		'"><img title="edit" alt="edit" src="/images/blank.png"></a></div><a href="/' + src +
		'" target="_blank"><img class="thumb" src="/' + thumb + '" width="' + thumbW + '" height="' +
		thumbH + '"></a></div>';
}

function getHanaPost(postJson) {
	var i, html, id = postJson['display_id'],
		files = postJson['files'],
		len = files.length,
		wrap = $new('table', {'id': 'post_' + id, 'class': 'replypost post'}, null);
	html = '<tbody><tr><td class="doubledash">&gt;&gt;</td><td id="reply' + id + '" class="reply">' +
		'<a name="i' + id + '"></a><label><a class="delete icon"><input type="checkbox" id="delbox_' +
		id + '" class="delete_checkbox" value="' + postJson['thread_id'] + '" name="' + id +
		'"></a><span class="replytitle">' + postJson['subject'] + '</span> <span class="postername">' +
		postJson['name'] + '</span> ' + aib.hDTFix.fix(postJson['date']) +
		' </label><span class="reflink"><a onclick="Highlight(0, ' + id + ')" href="/' + brd +
		'/res/' + TNum + '.xhtml#i' + id + '">No.' + id + '</a></span><br>';
	for(i = 0; i < len; i++) {
		html += getHanaFile(files[i], postJson['post_id']);
	}
	wrap.innerHTML = html + (len > 1 ? '<div style="clear: both;"></div>' : '') +
		'<div class="postbody">' + postJson['message_html'] +
		'</div><div class="abbrev"></div></td></tr></tbody>';
	return [wrap, wrap.firstChild.firstChild.lastChild];
}

