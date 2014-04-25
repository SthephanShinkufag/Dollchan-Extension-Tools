//============================================================================================================
//												MENUS & POPUPS
//============================================================================================================

function closeAlert(el) {
	if(el) {
		el.closeTimeout = null;
		if(Cfg['animation']) {
			nav.animEvent(el, function(node) {
				var p = node && node.parentNode;
				if(p) {
					p.removeChild(node);
				}
			});
			el.classList.add('de-close');
		} else {
			$del(el);
		}
	}
}

function $alert(txt, id, wait) {
	var node, el = $id('de-alert-' + id),
		cBtn = 'de-alert-btn' + (wait ? ' de-wait' : ''),
		tBtn = wait ? '' : '\u2716 ';
	if(el) {
		$t('div', el).innerHTML = txt.trim();
		node = $t('span', el);
		node.className = cBtn;
		node.textContent = tBtn;
		clearTimeout(el.closeTimeout);
		if(!wait && Cfg['animation']) {
			nav.animEvent(el, function(node) {
				node.classList.remove('de-blink');
			});
			el.classList.add('de-blink');
		}
	} else {
		el = $id('de-alert').appendChild($New('div', {'class': aib.cReply, 'id': 'de-alert-' + id}, [
			$new('span', {'class': cBtn, 'text': tBtn}, {'click': function() {
				closeAlert(this.parentNode);
			}}),
			$add('<div class="de-alert-msg">' + txt.trim() + '</div>')
		]));
		if(Cfg['animation']) {
			nav.animEvent(el, function(node) {
				node.classList.remove('de-open');
			});
			el.classList.add('de-open');
		}
	}
	if(Cfg['closePopups'] && !wait && !id.contains('help') && !id.contains('edit')) {
		el.closeTimeout = setTimeout(closeAlert, 4e3, el);
	}
}

function showMenu(el, html, inPanel, onclick) {
	var y, pos, menu, cr = el.getBoundingClientRect();
	if(Cfg['attachPanel'] && inPanel) {
		pos = 'fixed';
		y = 'bottom: 25';
	} else {
		pos = 'absolute';
		y = 'top: ' + (window.pageYOffset + cr.bottom);
	}
	doc.body.insertAdjacentHTML('beforeend', '<div class="' + aib.cReply + ' de-menu" style="position: ' +
		pos + '; right: ' + (doc.documentElement.clientWidth - cr.right - window.pageXOffset) +
		'px; ' + y + 'px;">' + html + '</div>');
	menu = doc.body.lastChild;
	menu.addEventListener('mouseover', function(e) {
		clearTimeout(e.currentTarget.odelay);
	}, true);
	menu.addEventListener('mouseout', removeMenu, true);
	menu.addEventListener('click', function(e) {
		var el = e.target;
		if(el.className === 'de-menu-item') {
			this(el);
			do {
				el = el.parentElement;
			} while (!el.classList.contains('de-menu'));
			$del(el);
		}
	}.bind(onclick), false);
}

function addMenu(e) {
	e.target.odelay = setTimeout(function(el) {
		switch(el.id) {
		case 'de-btn-addspell': addSpellMenu(el); return;
		case 'de-btn-refresh': addAjaxPagesMenu(el); return;
		case 'de-btn-audio-off': addAudioNotifMenu(el); return;
		}
	}, Cfg['linksOver'], e.target);
}

function removeMenu(e) {
	var el, rt = e.relatedTarget;
	clearTimeout(e.target.odelay);
	if(!rt || !nav.matchesSelector(rt, '.de-menu, .de-menu > div, .de-menu-item')) {
		if(el = $c('de-menu', doc)) {
			el.odelay = setTimeout($del, 75, el);
		}
	}
}

function addSpellMenu(el) {
	showMenu(el, '<div style="display: inline-block; border-right: 1px solid grey;">' +
		'<span class="de-menu-item">' + ('#words,#exp,#exph,#imgn,#ihash,#subj,#name,#trip,#img,<br>')
			.split(',').join('</span><span class="de-menu-item">') +
		'</span></div><div style="display: inline-block;"><span class="de-menu-item">' +
		('#sage,#op,#tlen,#all,#video,#vauthor,#num,#wipe,#rep,#outrep')
			.split(',').join('</span><span class="de-menu-item">') + '</span></div>', false,
	function(el) {
		var exp = el.textContent,
			idx = Spells.names.indexOf(exp.substr(1));
		$txtInsert($id('de-spell-edit'), exp + (
			TNum && exp !== '#op' && exp !== '#rep' && exp !== '#outrep' ? '[' + brd + ',' + TNum + ']' : ''
		) + (Spells.needArg[idx] ? '(' : ''));
	});
}

function addAjaxPagesMenu(el) {
	showMenu(el, '<span class="de-menu-item">' +
		Lng.selAjaxPages[lang].join('</span><span class="de-menu-item">') + '</span>', true,
	function(el) {
		loadPages(aProto.indexOf.call(el.parentNode.children, el) + 1);
	});
}

function addAudioNotifMenu(el) {
	showMenu(el, '<span class="de-menu-item">' +
		Lng.selAudioNotif[lang].join('</span><span class="de-menu-item">') + '</span>', true,
	function(el) {
		var i = aProto.indexOf.call(el.parentNode.children, el);
		updater.enable();
		updater.toggleAudio(i === 0 ? 3e4 : i === 1 ? 6e4 : i === 2 ? 12e4 : 3e5);
		$id('de-btn-audio-off').id = 'de-btn-audio-on';
	});
}

