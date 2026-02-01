/* ==[ PostBuilders.js ]======================================================================================
                                          BUILDERS FOR LOADED POSTS
=========================================================================================================== */

class DOMPostsBuilder {
	constructor(form, isArchived) {
		this._form = form;
		this._posts = $Q(aib.qPost, form);
		this.length = this._posts.length;
		this.postersCount = '';
		this._isArchived = isArchived;
	}
	get isClosed() {
		return aib.qClosed && !!$q(aib.qClosed, this._form) || this._isArchived;
	}
	getOpMessage() {
		return aib.fixHTML(doc.adoptNode($q(aib.qPostMsg, this._form)));
	}
	getPNum(i) {
		return aib.getPNum(this._posts[i]);
	}
	getOpEl() {
		return aib.fixHTML(aib.getOp($q(aib.qThread, this._form) || this._form));
	}
	getPostEl(i) {
		return aib.fixHTML(this._posts[i]);
	}
	* getRefLinks(i, thrUrl) { // i === 0 - OP-post
		const msg = i === 0 ? $q(aib.qPostMsg, this._form) : $q(aib.qPostMsg, this._posts[i - 1]);
		const links = $Q('a', msg);
		for(let i = 0, len = links.length; i < len; ++i) {
			const link = links[i];
			const tc = link.textContent;
			if(tc[0] === '>' && tc[1] === '>') {
				const lNum = parseInt(tc.substr(2), 10);
				if(lNum) {
					yield [link, lNum];
					const url = link.getAttribute('href');
					if(url[0] === '#') {
						link.setAttribute('href', thrUrl + url);
					}
				}
			}
		}
	}
	* bannedPostsData() {
		const banEls = $Q(aib.qBan, this._form);
		for(let i = 0, len = banEls.length; i < len; ++i) {
			const banEl = banEls[i];
			const postEl = aib.getPostElOfEl(banEl);
			yield [1, postEl ? aib.getPNum(postEl) : null, doc.adoptNode(banEl)];
		}
	}
}

class _4chanPostsBuilder {
	constructor(json, board) {
		this._posts = json.posts;
		this._board = board;
		this.length = json.posts.length - 1;
		this.postersCount = this._posts[0].unique_ips;
		this._colorIDs = [];
	}
	static fixFileName(name, maxLength) {
		const decodedName = name.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#039;', '\'')
			.replaceAll('&lt;', '<').replaceAll('&gt;', '>');
		return decodedName.length <= maxLength ? { isFixed: false, name } : {
			isFixed : true,
			name    : decodedName.slice(0, 25).replaceAll('&', '&amp;').replaceAll('"', '&quot;')
				.replaceAll('\'', '&#039;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
		};
	}
	get isClosed() {
		return !!(this._posts[0].closed || this._posts[0].archived);
	}
	getOpMessage() {
		const { no, com } = this._posts[0];
		return $add(aib.fixHTML(`<blockquote class="postMessage" id="m${ no }"> ${ com }</blockquote>`));
	}
	getPNum(i) {
		return this._posts[i + 1].no;
	}
	getOpEl() {
		return this.getPostEl(-1);
	}
	getPostEl(i) {
		return $add(aib.fixHTML(this.getPostHTML(i))).lastElementChild;
	}
	getPostHTML(i) {
		const data = this._posts[i + 1];
		const num = data.no;
		const board = this._board;
		const _icon = id => `//s.4cdn.org/image/${ id }${
			deWindow.devicePixelRatio < 2 ? '.gif' : '@2x.gif' }`;

		// --- FILE ---
		let fileHTML = '';
		if(data.filedeleted) {
			fileHTML = `<div id="f${ num }" class="file"><span class="fileThumb">
				<img src="${ _icon('filedeleted-res') }" class="fileDeletedRes" alt="File deleted.">
			</span></div>`;
		} else if(typeof data.filename === 'string') {
			let { name, isFixed: needTitle } = _4chanPostsBuilder.fixFileName(data.filename, 30);
			name += data.ext;
			if(!data.tn_w && !data.tn_h && data.ext === '.gif') {
				data.tn_w = data.w;
				data.tn_h = data.h;
			}
			const isSpoiler = data.spoiler;
			if(isSpoiler) {
				name = 'Spoiler Image';
				data.tn_w = data.tn_h = 100;
				needTitle = false;
			}
			const size = prettifySize(data.fsize);
			const fileTextTitle = isSpoiler ? ` title="${ data.filename + data.ext }"` : '';
			const aHref = needTitle ? `title="${ data.filename + data.ext }"` : '';
			const imgSrc = isSpoiler ? '//s.4cdn.org/image/spoiler.png' :
				`//i.4cdn.org/${ board }/${ data.tim }s.jpg`;
			fileHTML = `<div class="file" id="f${ num }">
				<div class="fileText" id="fT${ num }"${ fileTextTitle }>File:
					<a href="//i.4cdn.org/${ board }/${ data.tim +
						data.ext }" ${ aHref } target="_blank">${ name }</a>
					(${ size }, ${ data.ext === '.pdf' ? 'PDF' : data.w + 'x' + data.h })
				</div>
				<a class="fileThumb ${ isSpoiler ? 'imgspoiler' : '' }" href="//i.4cdn.org/${ board }/` +
					`${ data.tim + data.ext }" target="_blank">
					<img src="${ imgSrc }" alt="${ size }" data-md5="` +
						`${ data.md5 }" style="height: ${ data.tn_h }px; width: ${ data.tn_w }px;">
					<div data-tip="" data-tip-cb="mShowFull" class="mFileInfo mobile">
						${ size } ${ data.ext.substr(1).toUpperCase() }
					</div>
				</a>
			</div>`;
		}

		// --- CAPCODE ---
		let highlight = '';
		let ccBy = '';
		let cc = data.capcode;
		switch(cc) {
		case 'admin_highlight':
			highlight = ' highlightPost';
			cc = 'admin';
			/* falls through */
		case 'admin': ccBy = 'Administrators'; break;
		case 'mod': ccBy = 'Moderators'; break;
		case 'developer': ccBy = 'Developers'; break;
		case 'manager': ccBy = 'Managers'; break;
		case 'founder': ccBy = 'Founder';
		}
		let ccName = '';
		let ccText = '';
		let ccImg = '';
		let ccClass = '';
		if(cc) {
			ccName = cc[0].toUpperCase() + cc.slice(1);
			ccText = `<strong class="capcode hand id_${ cc === 'founder' ? 'admin' : cc }` +
				`" title="Highlight posts by ${ ccBy }">## ${ ccName }</strong>`;
			ccImg = `<img src="${ _icon(cc + 'icon') }" alt="${
				ccName } Icon." title="This user is 4chan ${ ccName }." class="identityIcon">`;
			ccClass = 'capcode' + (cc === 'founder' ? 'Admin' : ccName);
		}

		// --- POST ---
		const { id, name = '' } = data;
		const nameEl = `<span class="name">${ name }</span>`;
		const mobNameEl = name.length <= 30 ? nameEl :
			`<span class="name" data-tip data-tip-cb="mShowFull">${ name.substring(30) }(…)</span>`;
		const tripEl = `${ data.trip ? `<span class="postertrip">${ data.trip }</span>` : '' }`;
		const cID = id ? this._colorIDs[id] || this._computeIDColor(id) : null;
		const posteruidEl = id && !data.capcode ? `<span class="posteruid id_${ id }` +
			`">(ID: <span class="hand" title="Highlight posts by this ID" style="background-color: rgb(${
				cID[0] }, ${ cID[1] }, ${ cID[2] }); color: ${ cID[3] ? 'black' : 'white' };">${
				id }</span>)</span>` : '';
		const flagEl = (data.country ? `<span title="${ data.country_name }" class="flag flag-${
			data.country.toLowerCase() }"></span>` : '') +
			(data.board_flag ? `<span title="${ data.flag_name }" class="bfl bfl-${
				data.board_flag.toLowerCase() }"></span>` : '');
		const emailEl = data.email ? `<a href="mailto:${
			data.email.replaceAll(' ', '%20') }" class="useremail">` : '';
		const replyEl = `<a href="#p${ num }" title="Link to this post">No.</a><a href="javascript:quote('${
			num }');" title="Reply to this post">${ num }</a>`;
		const subjEl = `<span class="subject">${ data.sub || '' }</span>`;
		return `<div class="postContainer replyContainer" id="pc${ num }">
			<div class="sideArrows" id="sa${ num }">&gt;&gt;</div>
			<div id="p${ num }" class="post ${ i === -1 ? 'op' : 'reply' } ${ highlight }">
				<div class="postInfoM mobile" id="pim${ num }">
					<span class="nameBlock ${ ccClass }">
						${ mobNameEl }
						${ tripEl }
						${ ccText }
						${ ccImg }
						${ posteruidEl }
						${ flagEl }<br>
						${ subjEl }
					</span>
					<span class="dateTime postNum" data-utc="${ data.time }">${ data.now } ${ replyEl }</span>
				</div>
				<div class="postInfo desktop" id="pi${ num }">
					<input name="${ num }" value="delete" type="checkbox">
					${ subjEl }
					<span class="nameBlock ${ ccClass }">
						${ emailEl }
							${ nameEl }
							${ tripEl }
							${ ccText }
						${ data.email ? '</a>' : '' }
						${ ccImg }
						${ posteruidEl }
						${ flagEl }
					</span>
					<span class="dateTime" data-utc="${ data.time }">${ data.now }</span>
					<span class="postNum desktop">${ replyEl }</span>
				</div>
				${ fileHTML }
				<blockquote class="postMessage" id="m${ num }"> ${ data.com || '' }</blockquote>
			</div>
		</div>`;
	}
	* bannedPostsData() {}

	_computeIDColor(text) {
		let hash = 0;
		for(let i = 0, len = text.length; i < len; ++i) {
			hash = (hash << 5) - hash + text.charCodeAt(i);
		}
		const r = hash >> 24 & 255;
		const g = hash >> 16 & 255;
		const b = hash >> 8 & 255;
		const value = this._colorIDs[text] = [r, g, b, 0.299 * r + 0.587 * g + 0.114 * b > 125];
		return value;
	}
}
_4chanPostsBuilder._customSpoiler = new Map();

class MakabaPostsBuilder {
	constructor(json, board) {
		if(json.Error) {
			throw new AjaxError(0, `API error: ${ json.Error } (${ json.Code })`);
		}
		this._json = json;
		this._board = board;
		this._posts = json.threads[0].posts;
		this.length = json.posts_count - 1;
		this.postersCount = json.unique_posters;
	}
	get isClosed() {
		return this._json.is_closed;
	}
	getOpMessage() {
		return $add(aib.fixHTML(this._getPostMsg(this._posts[0])));
	}
	getPNum(i) {
		return this._posts[i + 1].num;
	}
	getOpEl() {
		return this.getPostEl(-1);
	}
	getPostEl(i) {
		return $add(aib.fixHTML(this.getPostHTML(i))).firstElementChild;
	}
	getPostHTML(i) {
		const data = this._posts[i + 1];
		const { files, num } = data;
		const board = this._board;
		const _switch = (val, obj) => val in obj ? obj[val] : obj['@@default'];

		// --- FILE ---
		let filesHTML = '';
		if(files?.length) {
			filesHTML = `<div class="post__images post__images_type_${
				files.length === 1 ? 'single' : 'multi' }">`;
			for(const file of files) {
				const { fullname = file.name, displayname: dispName = file.name, type } = file;
				const isVideo = type === 6 || type === 10;
				let imgHTML = `<img class="post__file-preview${ isVideo ? ' post__file-webm' : '' }" src="${
					file.thumbnail }" alt="${ file.width }x${ file.height }" width="${
					file.tn_width }" height="${ file.tn_height }">`;
				if(file.nsfw) {
					imgHTML = `<div class="post__file-nsfw">
						<div class="file__nsfw">
							<span class="file__nsfw-title">NSFW</span>
							<span class="file__nsfw-description">[ Нажмите, чтобы открыть ]</span>
						</div>
						${ imgHTML }
					</div>`;
				}
				filesHTML += `<figure class="post__image">
					<figcaption class="post__file-attr">
						<a id="title-${ num + '-' + file.md5 }" class="desktop" target="_blank" href="` +
							`${ type === 100 /* is sticker */ ? file.install : file.path }"` +
							`${ dispName === fullname ? '' : ` title="${ fullname }"` }>${ dispName }</a>
						<span class="post__filezise">(${ file.size }Кб, ` +
							`${ file.width }x${ file.height }${ isVideo ? ', ' + file.duration : '' })</span>
					</figcaption>
					<a class="post__image-link" href="${ file.path }" onclick="return false;">
						${ imgHTML }
					</a>
				</figure>`;
			}
			filesHTML += '</div>';
		}

		// --- POST ---
		const emailEl = data.email ?
			`<a href="${ data.email }" class="post__email">${ data.name }</a>` :
			`<span class="post__anon">${ data.name }</span>`;
		const tripEl = !data.trip ? '' : `<span class="${ _switch(data.trip, {
			'!!%adm%!!'        : 'post__adm">## Abu ##',
			'!!%mod%!!'        : 'post__mod">## Mod ##',
			'!!%Inquisitor%!!' : 'post__inquisitor">## Applejack ##',
			'!!%coder%!!'      : 'post__mod">## Кодер ##',
			'!!%curunir%!!'    : 'post__mod">## Curunir ##',
			'@@default'        : `${ data.trip_style ? data.trip_style : 'post__trip' }">` + data.trip
		}) }</span>`;
		const refHref = `/${ board }/res/${ parseInt(data.parent) || num }.html#${ num }`;
		let rate = '';
		if(this._hasLikes) {
			const likes = `<div id="like-div${ num }" class="post__detailpart post__rate` +
				` post__rate_type_like" title="Мне это нравится">
					<svg xmlns="http://www.w3.org/2000/svg" class="post__rate-icon icon">
						<use xlink:href="#icon__thunder"></use></svg> <span id="like-count${ num }">`;
			const dislikes = likes.replaceAll('like', 'dislike').replace('icon__thunder', 'icon__thumbdown');
			rate = `${ likes }${ data.likes || 0 }</span></div>
				${ dislikes }${ data.dislikes || 0 }</span></div>`;
		}
		const isOp = i === -1;
		const reflink = `<a id="${ num }" class="post__reflink" href="${ refHref }">№</a>` +
				`<a class="post__reflink postbtn-reply-href" href="${ refHref }"` +
					` name="${ num }">${ num }</a>`;
		const w = el => `<span class="post__detailpart">${ el }</span>`;
		return `<div id="post-${ num }" class="post post_type_${ isOp ? 'oppost' : 'reply' }` +
			`${ filesHTML ? ' post_withimg' : '' }" data-num="${ num }">
			<div id="post-details-${ num }" class="post__details">
				<input class="turnmeoff" type="checkbox" name="delete" value="${ num }">
				${ !data.subject ? '' : w('<span class="post__title">' +
					`${ data.subject + (data.tags ? ` /${ data.tags }/` : '') }</span>`) }
				${ w(`
					${ emailEl }
					${ data.icon ? '<span class="post__icon">' +
						`${ data.icon }</span>` : '' }
					${ tripEl }
					${ data.op === 1 ? '<span class="post__ophui"># OP</span>&nbsp;' : '' }
				`) }
				${ w(`<span class="post__time">${ data.date }</span>`) }
				${ w(reflink) }
				${ rate }
			</div>
			${ filesHTML }
			${ this._getPostMsg(data) }
		</div>`;
	}
	* bannedPostsData() {
		for(const { banned, num } of this._posts) {
			switch(banned) {
			case 1:
				yield [1, num, $add('<span class="post__pomyanem">(Автор этого поста был забанен.)</span>')];
				break;
			case 2:
				yield [2, num, $add('<span class="post__pomyanem">' +
					'(Автор этого поста был предупрежден.)</span>')];
				break;
			}
		}
	}

	get _hasLikes() {
		const value = !!$q('.like-div, .post__rate');
		Object.defineProperty(this, '_hasLikes', { value });
		return value;
	}
	_getPostMsg(data) {
		const _switch = (val, obj) => val in obj ? obj[val] : obj['@@default'];
		const comment = data.comment.replace(/<script /ig, '<!--<textarea ')
			.replace(/<\/script>/ig, '</textarea>-->');
		return `<article id="m${ data.num }" class="post__message">` +
			`${ comment }${ _switch(data.banned, {
				1           : '<br><span class="post__pomyanem">(Автор этого поста был забанен.)</span>',
				2           : '<br><span class="post__pomyanem">(Автор этого поста был предупрежден.)</span>',
				'@@default' : ''
			}) }</article>`;
	}
}
