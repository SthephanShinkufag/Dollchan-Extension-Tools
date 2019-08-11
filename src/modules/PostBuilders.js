/* ==[ PostBuilders.js ]======================================================================================
                                          BUILDERS FOR LOADED POSTS
=========================================================================================================== */

class DOMPostsBuilder {
	constructor(form, isArchived) {
		this._form = form;
		this._posts = $Q(aib.qRPost, form);
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
		return aib.fixHTML(doc.adoptNode(aib.getOp($q(aib.qThread, this._form) || this._form)));
	}
	getPostEl(i) {
		return aib.fixHTML(doc.adoptNode(this._posts[i]));
	}
	getRefLinksNum(i, thrUrl) { // i === 0 - OP-post
		const msg = i === 0 ? $q(aib.qPostMsg, this._form) : $q(aib.qPostMsg, this._posts[i - 1]);
		const links = $Q('a', msg);
		const rv = [];
		for(let lNum, i = 0, len = links.length; i < len; ++i) {
			const link = links[i];
			const tc = link.textContent;
			if(tc[0] === '>' && tc[1] === '>') {
				let lNum =  parseInt(tc.substr(2), 10);
				if (lNum) {
					rv.push([null, lNum]);
					const url = link.getAttribute('href');
					if(url[0] === '#') {
						link.setAttribute('href', thrURL + url);
					}
					if(!aib.hasOPNum && DelForm.tNums.has(lNum)) {
						link.classList.add('de-ref-op');
					}
					if(MyPosts.has(lNum)) {
						link.classList.add('de-ref-you');
					}
				}
			}
		}
		return rv;
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
	constructor(json, brd) {
		this._posts = json.posts;
		this._brd = brd;
		this.length = json.posts.length - 1;
		this.postersCount = this._posts[0].unique_ips;
	}
	static fixFileName(name, maxLength) {
		const decodedName = name.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'")
			.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
		return decodedName.length <= maxLength ? { isFixed: false, name } : {
			isFixed : true,
			name    : decodedName.slice(0, 25).replace(/&/g, '&amp;').replace(/"/g, '&quot;')
				.replace(/'/g, '&#039;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
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
		const brd = this._brd;
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
				`//i.4cdn.org/${ brd }/${ data.tim }s.jpg`;
			fileHTML = `<div class="file" id="f${ num }">
				<div class="fileText" id="fT${ num }"${ fileTextTitle }>File:
					<a href="//i.4cdn.org/${ brd }/${ data.tim +
						data.ext }" ${ aHref } target="_blank">${ name }</a>
					(${ size }, ${ data.ext === '.pdf' ? 'PDF' : data.w + 'x' + data.h })
				</div>
				<a class="fileThumb ${ isSpoiler ? 'imgspoiler' : '' }" href="//i.4cdn.org/${ brd }/` +
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
		let highlight = '', ccBy = '';
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
		let ccName = '', ccText = '', ccImg = '', ccClass = '';
		if(cc) {
			ccName = cc[0].toUpperCase() + cc.slice(1);
			ccText = `<strong class="capcode hand id_${ cc === 'founder' ? 'admin' : cc }` +
				`" title="Highlight posts by ${ ccBy }">## ${ ccName }</strong>`;
			ccImg = `<img src="${ _icon(cc + 'icon') }" alt="${
				ccName } Icon." title="This user is 4chan ${ ccName }." class="identityIcon">`;
			ccClass = 'capcode' + (cc === 'founder' ? 'Admin' : ccName);
		}

		// --- POST ---
		const { name = '' } = data;
		const nameEl = `<span class="name">${ name }</span>`;
		const mobNameEl = name.length <= 30 ? nameEl :
			`<span class="name" data-tip data-tip-cb="mShowFull">${ name.substring(30) }(…)</span>`;
		const tripEl = `${ data.trip ? `<span class="postertrip">${ data.trip }</span>` : '' }`;
		const posteruidEl = data.id && !data.capcode ? `<span class="posteruid id_${ data.id }` +
			`">(ID: <span class="hand" title="Highlight posts by this ID">${ data.id }</span>)</span>` : '';
		const flagEl = data.country ? `<span title="${ data.country_name }" class="flag flag-${
			data.country.toLowerCase() }"></span>` : '';
		const emailEl = data.email ? `<a href="mailto:${
			data.email.replace(/ /g, '%20') }" class="useremail">` : '';
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
	getRefLinksNum(i, thrUrl) { // i === 0 - OP-post
		const msg = this._posts[i].com || '';
		const regex = /(<a[^>]*?)(?: class="([^"]+)")?([^>]*?) href="([^"]+)"([^>]*?)(?: class="([^"]+)")?([^>]*?)>&gt;&gt;(\d+)/g;
		const rv = [];
		this._posts[i].com = msg.replace(regex, (full, part1, classes1, part2, url, part3, classes2, part4, num) => {
			const lNum = +num;
			rv.push([null, lNum]);
			const isOpLink = DelForm.tNums.has(lNum);
			const isYouLink = MyPosts.has(lNum);
			const fixedUrl = url[0] == '#' ? thrUrl + url : url;
			if (isOpLink || isYouLink) {
				let classes = [];
				if (isOpLink) {
					classes.push('de-ref-op');
				}
				if (isYouLink) {
					classes.push('de-ref-you');
				}
				classes = classes.join(' ');
				if (classes1 !== undefined) {
					return `${part1} class="${classes} ${classes1}"${part2} href="${fixedUrl}"${part3}${part4}>&gt;&gt;${num}`
				}
				if (classes2 !== undefined) {
					return `${part1}${part2} href="${fixedUrl}"${part3} class="${classes} ${classes2}"${part4}>&gt;&gt;${num}`
				}
				return `${part1}${part2} href="${fixedUrl}"${part3}${part4} class="${classes}">&gt;&gt;${num}`
			}
			if (classes1 !== undefined) {
				return `${part1} class="${classes1}"${part2} href="${fixedUrl}"${part3}${part4}>&gt;&gt;${num}`
			}
			if (classes2 !== undefined) {
				return `${part1}${part2} href="${fixedUrl}"${part3} class="${classes2}"${part4}>&gt;&gt;${num}`
			}
			return `${part1}${part2} href="${fixedUrl}"${part3}${part4}>&gt;&gt;${num}`
		});
		return rv;
	}
	* bannedPostsData() {}
}
_4chanPostsBuilder._customSpoiler = new Map();

class DobrochanPostsBuilder {
	constructor(json, brd) {
		if(json.error) {
			throw new AjaxError(0, `API error: ${ json.error.message }`);
		}
		this._json = json.result;
		this._brd = brd;
		this._posts = json.result.threads[0].posts;
		this.length = this._posts.length - 1;
		this.postersCount = '';
	}
	get isClosed() {
		return !!this._json.threads[0].archived;
	}
	getOpMessage() {
		return $add(aib.fixHTML(`<div class="postbody"> ${ this._posts[0].message_html }</div>`));
	}
	getPNum(i) {
		return this._posts[i + 1].display_id;
	}
	getOpEl() {
		return this.getPostEl(-1);
	}
	getPostEl(i) {
		const el = $add(aib.fixHTML(this.getPostHTML(i)));
		if (i == -1) {
			return el;
		}
		return el.firstElementChild.firstElementChild.lastElementChild;
	}
	getPostHTML(i) {
		const data = this._posts[i + 1];
		const num = data.display_id;
		const brd = this._brd;
		const multiFile = data.files.length > 1;

		// --- FILE ---
		let filesHTML = '';
		for(const { file_id, metadata, rating, size, src, thumb, thumb_height, thumb_width } of data.files) {
			let fileName, fullFileName, th = thumb;
			let thumbW = 200;
			let thumbH = 200;
			const ext = src.split('.').pop();
			if(brd === 'b' || brd === 'rf') {
				fileName = fullFileName = th.split('/').pop();
			} else {
				fileName = fullFileName = src.split('/').pop();
				if(multiFile && fileName.length > 20) {
					fileName = fileName.substr(0, 20 - ext.length) + '(…)' + ext;
				}
			}
			const maxRating = 'r15'; // FIXME: read from settings
			if(rating === 'r-18g' && maxRating !== 'r-18g') {
				th = 'images/r-18g.png';
			} else if(rating === 'r-18' && (maxRating !== 'r-18g' || maxRating !== 'r-18')) {
				th = 'images/r-18.png';
			} else if(rating === 'r-15' && maxRating === 'sfw') {
				th = 'images/r-15.png';
			} else if(rating === 'illegal') {
				th = 'images/illegal.png';
			} else {
				thumbW = thumb_width;
				thumbH = thumb_height;
			}
			const fileInfo = `<div class="fileinfo${ multiFile ? ' limited' : '' }">Файл:
				<a href="/${ src }" title="${ fullFileName }" target="_blank">${ fileName }</a><br>
				<em>${ ext }, ${ prettifySize(size) }, ${ metadata.width }x${ metadata.height }
				</em>${ multiFile ? '' : ' - Нажмите на картинку для увеличения' }<br>
				<a class="edit_ icon" href="/utils/image/edit/${ file_id }/${ num }">
					<img title="edit" alt="edit" src="/images/blank.png">
				</a>
			</div>`;
			filesHTML += `${ multiFile ? '' : fileInfo }
			<div id="file_${ num }_${ file_id }" class="file">${ multiFile ? fileInfo : '' }
				<a href="/${ src }" target="_blank">
					<img class="thumb" src="/${ th }" width="${ thumbW }" height="${ thumbH }">
				</a>
			</div>`;
		}

		// --- POST ---
		const date = data.date.replace(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/,
			(all, y, mo, d, h, m, s) => {
				const dt = new Date(y, +mo - 1, d, h, m, s);
				return `${ pad2(dt.getDate()) } ${ Lng.fullMonth[1][dt.getMonth()] } ${ dt.getFullYear()
				} (${ Lng.week[1][dt.getDay()] }) ${ pad2(dt.getHours()) }:${ pad2(dt.getMinutes()) }`;
			});
		const isOp = i === -1;
		return `${ isOp ? `<div id="post_${ num }" class="oppost post">` :
			`<table id="post_${ num }" class="replypost post"><tbody><tr>
			<td class="doubledash">&gt;&gt;</td>
			<td class="reply" id="reply${ num }">` }
				<a name="i${ num }"></a>
				<label>
					<input name="${ num }" value="${ data.thread_id }" ` +
						`class="delete_checkbox" id="delbox_${ num }" type="checkbox">
					${ data.subject ? `<span class="replytitle">${ data.subject }</span>` : '' }
					<span class="postername">${ data.name || 'Анонимус' }</span> ${ date }
				</label>
				<span class="reflink">
					<a href="/${ brd }/res/${ data.thread_id }.xhtml#i${ num }"> No.${ num }</a>
				</span><br>
				${ filesHTML }
				${ multiFile ? '<div style="clear: both;"></div>' : '' }
				<div class="postbody"> ${ data.message_html }</div>
			${ isOp ? '</div>' : '</td></tr></tbody></table>' }`;
	}
	getRefLinksNum(i, thrUrl) { // i === 0 - OP-post
		const msg = this._posts[i].message_html || '';
		const regex = /(<a[^>]*?)(?: class="([^"]+)")?([^>]*)>&gt;&gt;(\d+)/g;
		const rv = [];
		this._posts[i].message_html = msg.replace(regex, (full, part1, classes, end, num) => {
			const lNum = +num;
			rv.push([null, lNum]);
			const isOpLink = DelForm.tNums.has(lNum);
			const isYouLink = MyPosts.has(lNum);
			if (isOpLink || isYouLink) {
				let eClasses = [];
				if (isOpLink) {
					eClasses.push('de-ref-op');
				}
				if (isYouLink) {
					eClasses.push('de-ref-you');
				}
				eClasses = eClasses.join(' ');
				if (classes === undefined) {
					return `${part1}${end} class="${eClasses}">&gt;&gt;${num}`;
				}
				return `${part1} class="${eClasses} ${classes}"${end}>&gt;&gt;${num}`;
			}
			return full;
		});
		return rv;
	}
	* bannedPostsData() {}
}

class MakabaPostsBuilder {
	constructor(json, brd) {
		if(json.Error) {
			throw new AjaxError(0, `API error: ${ json.Error } (${ json.Code })`);
		}
		this._json = json;
		this._brd = brd;
		this._posts = json.threads[0].posts;
		this.length = json.posts_count - +!!aib._2channel;
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
		const { num } = data;
		const brd = this._brd;
		const isNew = this._isNew;
		const p = isNew ? 'post__' : '';
		const _switch = (val, obj) => val in obj ? obj[val] : obj['@@default'];

		// --- FILE ---
		let filesHTML = '';
		if(data.files && data.files.length !== 0) {
			filesHTML = `<div class="${ isNew ? 'post__images post__images_type_' : 'images images-' }${
				data.files.length === 1 ? 'single' : 'multi' }">`;
			for(const file of data.files) {
				const imgId = num + '-' + file.md5;
				const { fullname = file.name, displayname: dispName = file.name } = file;
				const isVideo = file.type === 6 || file.type === 10;
				const imgClass = isNew ?
					`post__file-preview${ isVideo ? ' post__file-webm' : '' }${
						data.nsfw ? ' post__file-nsfw' : '' }` :
					`img preview${ isVideo ? ' webm-file' : '' }`;
				filesHTML += `<figure class="${ p }image">
					<figcaption class="${ p }file-attr">
						<a id="title-${ imgId }" class="desktop" target="_blank" href="` +
							`${ file.type === 100 /* is sticker */ ? file.install : file.path }"` +
							`${ dispName === fullname ? '' : ` title="${ fullname }"` }>${ dispName }</a>
						<span class="${ isNew ? 'post__filezise' : 'filesize' }">(${ file.size }Кб, ` +
							`${ file.width }x${ file.height }${ isVideo ? ', ' + file.duration : '' })</span>
					</figcaption>
					<div id="exlink-${ imgId }"${ isNew ? '' : 'class="image-link"' }>
						<a ${ isNew ? 'class="post__image-link" ' : '' }href="${ file.path }">
							<img class="${ imgClass }" src="${ file.thumbnail }" alt="${ file.width }x` +
								`${ file.height }" width="${ file.tn_width }" height="${ file.tn_height }">
						</a>
					</div>
				</figure>`;
			}
			filesHTML += '</div>';
		}

		// --- POST ---
		const emailEl = data.email ?
			`<a href="${ data.email }" class="${ isNew ? 'post__' : 'post-' }email">${ data.name }</a>` :
			`<span class="${ isNew ? 'post__anon' : 'ananimas' }">${ data.name }</span>`;
		const tripEl = !data.trip ? '' : `<span class="${ _switch(data.trip, {
			'!!%adm%!!'        : `${ p }adm">## ${ aib._2channel ? 'Admin' : 'Abu' } ##`,
			'!!%mod%!!'        : `${ p }mod">## Mod ##`,
			'!!%Inquisitor%!!' : `${ p }inquisitor">## Applejack ##`,
			'!!%coder%!!'      : `${ p }mod">## Кодер ##`,
			'!!%curunir%!!'    : `${ p }mod">## Curunir ##`,
			'@@default'        :
				`${ data.trip_style ? data.trip_style : isNew ? 'post__trip' : 'postertrip' }">` + data.trip
		}) }</span>`;
		const refHref = `/${ brd }/res/${ parseInt(data.parent) || num }.html#${ num }`;
		let rate = '';
		if(this._hasLikes) {
			const likes = `<div id="like-div${ num }" class="${ isNew ?
				`post__detailpart post__rate post__rate_type_like" title="Мне это нравится">
					<svg xmlns="http://www.w3.org/2000/svg" class="post__rate-icon icon">
						<use xlink:href="#icon__thunder"></use></svg>` :
				'like-div"> <span class="like-icon"> <i class="fa fa-bolt"></i></span>'
			} <span id="like-count${ num }"${ isNew ? '' : 'class="like-count"' }>`;
			const dislikes = likes.replace(/like/g, 'dislike').replace('icon__thunder', 'icon__thumbdown');
			rate = `${ likes }${ data.likes || 0 }</span></div>
				${ dislikes }${ data.dislikes || 0 }</span></div>`;
		}
		const isOp =  i === -1;
		const wrapClass = !isNew ? 'post-wrapper' : isOp ? 'thread__oppost' : 'thread__post';
		const timeReflink = `<span class="${ isNew ? 'post__time' : 'posttime' }">${ data.date }</span>
			<span class="${ isNew ? 'post__detailpart' : 'reflink' }">` +
				`<a id="${ num }" ${ isNew ? 'class="post__reflink" ' : '' }href="${ refHref }">` +
					`${ aib._2channel ? 'No.' : '№' }</a>` +
				`<a class="${ isNew ? 'post__reflink ' : '' }postbtn-reply-href" href="${ refHref }"` +
					` name="${ num }">${ num }</a>
			</span>`;
		return `<div id="post-${ num }" class="${ wrapClass }">
			<div class="post ${ isNew ? 'post_type_' : '' }${ isOp ? 'oppost' : 'reply' }` +
				`${ filesHTML ? ' withimg' : '' }" id="post-body-${ num }" data-num="${ num }">
				<div id="post-details-${ num }" class="${ isNew ? 'post__details' : 'post-details' }">
					<input type="checkbox" name="delete" value="${ num }">
					${ !data.subject ? '' : `<span class="${ isNew ? 'post__' : 'post-' }title">` +
						`${ data.subject + (data.tags ? ` /${ data.tags }/` : '') }</span>` }
					${ emailEl }
					${ data.icon ? `<span class="${ isNew ? 'post__' : 'post-' }icon">` +
						`${ data.icon }</span>` : '' }
					${ tripEl }
					${ data.op === 1 ? `<span class="${ p }ophui"># OP</span>&nbsp;` : '' }
					${ isNew ? timeReflink : `<span class="posttime-reflink">
						${ timeReflink }
					</span>` }
					${ rate }
				</div>
				${ filesHTML }
				${ this._getPostMsg(data) }
			</div>
		</div>`;
	}
	getRefLinksNum(i, thrUrl) { // i === 0 - OP-post
		const msg = this._posts[i].comment || '';
		const regex = /(<a[^>]*?)(?: class="([^"]+)")?([^>]*)>>>(\d+)/g;
		const rv = [];
		this._posts[i].comment = msg.replace(regex, (full, part1, classes, end, num) => {
			const lNum = +num;
			rv.push([null, lNum]);
			if(MyPosts.has(lNum)) {
				link.classList.add('de-ref-you');
				if (classes === undefined) {
					return `${part1}${end} class="de-ref-you">&gt;&gt;${num}`;
				}
				return `${part1} class="de-ref-you ${classes}"${end}>&gt;&gt;${num}`;
			}
			return full;
		});
		return rv;
	}
	* bannedPostsData() {
		const p = this._isNew ? 'post__' : '';
		for(const { banned, num } of this._posts) {
			switch(banned) {
			case 1:
				yield [1, num, $add(`<span class="${ p }pomyanem">(Автор этого поста был забанен.)</span>`)];
				break;
			case 2:
				yield [2, num, $add(`<span class="${ p }pomyanem">` +
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
	get _isNew() {
		const value = !!$q('.post_type_oppost');
		Object.defineProperty(this, '_isNew', { value });
		return value;
	}
	_getPostMsg(data) {
		const _switch = (val, obj) => val in obj ? obj[val] : obj['@@default'];
		const comment = data.comment.replace(/<script /ig, '<!--<textarea ')
			.replace(/<\/script>/ig, '</textarea>-->');
		const p = this._isNew ? 'post__' : '';
		return `<blockquote id="m${ data.num }" class="${ this._isNew ? 'post__' : 'post-' }message">` +
			`${ comment }${ _switch(data.banned, {
				1           : `<br><span class="${ p }pomyanem">(Автор этого поста был забанен.)</span>`,
				2           : `<br><span class="${ p }pomyanem">(Автор этого поста был предупрежден.)</span>`,
				'@@default' : ''
			}) }</blockquote>`;
	}
}
