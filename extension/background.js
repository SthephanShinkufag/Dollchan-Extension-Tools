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
		// onCommitted gives an old statement of frame content, so we need to use onDOMContentLoaded
		const callback = details => {
			runScriptInFrame(details);
			chrome.webNavigation.onDOMContentLoaded.removeListener(callback);
		};
		chrome.webNavigation.onDOMContentLoaded.addListener(callback);
	}
	runScriptInFrame(details); // Regular loading at document_start
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
	case 'corsRequest': { // Chrome-extension: avoid CORS in content-script.
		// Getting data from content-script and sending a CORS request.
		const { url, params } = request;
		if(params.body) {
			// Converting text data to blob & FormData for sending in the POST request
			const str = params.body.arr;
			const buf = new ArrayBuffer(str.length);
			const bufView = new Uint8Array(buf);
			for(let i = 0, len = str.length; i < len; ++i) {
				bufView[i] = str.charCodeAt(i);
			}
			const formData = new FormData();
			formData.append('file', new Blob([buf], { type: 'image/png' }), params.body.name);
			params.body = formData;
		}
		fetch(url, params).then(async res => {
			let answer;
			switch(params.responseType) {
			case 'arraybuffer':
			case 'blob': { // Converting arraybuffer/blob from the request response
				// to text data for sending to the content-script
				const arr =  new Uint8Array(await res.arrayBuffer());
				answer = '';
				for(let i = 0, len = arr.length; i < len; ++i) {
					answer += String.fromCharCode(arr[i]);
				}
				break;
			}
			default: answer = await res.text();
			}
			sendResponse({ isError: false, answer, status: res.status, statusText: res.statusText });
		}).catch(err => sendResponse({ isError: true, answer: err }));
		return true; // Will respond asynchronously
	}
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
