/* eslint indent: ["error", "tab", { "outerIIFEBody": 0 }] */
(function() {
'use strict';
let isEnabled = false;
const emptyFn = Function.prototype;

async function getStored(id) {
	// Read storage.local first. If it not existed then read storage.sync
	const value = await new Promise(resolve => chrome.storage.local.get(id, obj => {
		if(Object.keys(obj).length) {
			resolve(obj[id]);
		} else {
			chrome.storage.sync.get(id, obj => resolve(obj[id]));
		}
	}));
	return value;
}

function setStored(id, value) {
	const obj = {};
	obj[id] = value;
	chrome.storage.sync.set(obj, () => {
		if(chrome.runtime.lastError) {
			// Store into storage.local if the storage.sync limit is exceeded
			chrome.storage.local.set(obj, emptyFn);
			chrome.storage.sync.remove(id, emptyFn);
		} else {
			chrome.storage.local.remove(id, emptyFn);
		}
	});
}

function setIcon(enabled) {
	chrome.browserAction.setIcon({ path: `icons/logo-32-light${ enabled ? '' : '-disabled' }.png` });
	chrome.browserAction.setTitle({ title: `Dollchan Extension ${ enabled ? '(enabled)' : '(disabled)' }` });
}

async function runScript(tabId, url, frameId = null) {
	let scopeObj = await getStored('DESU_scope');
	if(!scopeObj) {
		setStored('DESU_scope', scopeObj = { includes: '*', excludes: '' });
	}
	const inc = (scopeObj.includes || '*').split(/\r\n|\r|\n/);
	const exc = (scopeObj.excludes || '').split(/\r\n|\r|\n/);
	for(let i = 0, len = exc.length; i < len; ++i) {
		if(exc[i] && new RegExp(exc[i].replace(/\*/g, '.*?')).test(url)) {
			return false;
		}
	}
	for(let i = 0, len = inc.length; i < len; ++i) {
		if(inc[i] && new RegExp(inc[i].replace(/\*/g, '.*?')).test(url)) {
			const options = {
				file  : 'Dollchan_Extension_Tools.es6.user.js',
				runAt : 'document_start'
			};
			if(frameId !== null) {
				options.frameId = frameId;
				options.allFrames = false;
			} else {
				options.allFrames = true;
			}
			chrome.tabs.executeScript(tabId, options, () => chrome.runtime.lastError);
			return true;
		}
	}
	return false;
}

function runScriptInFrame(details) {
	if(isEnabled) {
		runScript(details.tabId, details.url /* frame url */, details.frameId);
	}
}

// Script loading
chrome.webNavigation.onCommitted.addListener(details => {
	if(details.transitionType === 'manual_subframe') {
		// Clicking on <a target="board"> on board's list of iichan.hk, when target iframe UPDATES its content
		// onCommitted gives an old statement of iframe content, so we need to use onDOMContentLoaded
		const callback = details => {
			runScriptInFrame(details);
			chrome.webNavigation.onDOMContentLoaded.removeListener(callback);
		};
		chrome.webNavigation.onDOMContentLoaded.addListener(callback);
	}
	runScriptInFrame(details); // Regular loading at document_start
});

// Remove settings.html from browser`s history if it will opened.
chrome.history.onVisited.addListener(details => {
	if(details.url === chrome.extension.getURL('settings/settings.html')) {
		chrome.history.deleteUrl({ url: details.url });
	}
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	switch(request['de-messsage']) {
	case 'toggleDollchan': // Conversation with menu.js
		setStored('DESU_enabled', isEnabled = !isEnabled);
		setIcon(isEnabled);
		if(isEnabled) {
			// Run the script in active tab
			chrome.tabs.query({ active: true, currentWindow: true },
				tabs => runScript(tabs[0].id, tabs[0].url));
		}
		sendResponse({ answer: isEnabled });
		break;
	default: sendResponse({ answer: 'Unknown request' });
	}
});

getStored('DESU_enabled').then(val => {
	if(typeof val !== 'boolean') {
		setStored('DESU_enabled', val = true);
	}
	setIcon(isEnabled = val);
});
}());
