/* ==[ PostBuilders.js ]======================================================================================
                                          BUILDERS FOR LOADED POSTS
=========================================================================================================== */

class DOMPostsBuilder {
	constructor(form) {
		this._form = form;
		this._posts = $Q(aib.qPost, form);
		this.length = this._posts.length;
		this.postersCount = '';
	}
	get isClosed() {
		return aib.qClosed && !!$q(aib.qClosed, this._form);
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
