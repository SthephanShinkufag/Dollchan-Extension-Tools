function saveStorage(obj) {
	chrome.storage.local.set(obj, e => {
		if(e) {
			console.error('Storage error: ' + e);
		}
	});
}

function setIcon(enabled) {
	chrome.browserAction.setIcon({ path: `icons/logo-32${ enabled ? '' : '-disabled' }.png` });
	chrome.browserAction.setTitle({ title: `${ enabled ? 'Disable' : 'Enable' } Dollchan-Extension` });
}

function runScript(tabId) {
	chrome.tabs.executeScript(tabId, { file: 'Dollchan_Extension_Tools.es6.user.js' });
}

// Run
let isEnabled = true;
chrome.storage.local.get('de-enabled', obj => {
	if(!Object.keys(obj).length) {
		saveStorage({ 'de-enabled': (isEnabled = true) });
	} else {
		isEnabled = obj['de-enabled'];
	}
	setIcon(isEnabled);
});
chrome.browserAction.onClicked.addListener(tab => {
	saveStorage({ 'de-enabled': (isEnabled = !isEnabled) });
	setIcon(isEnabled);
	if(isEnabled) {
		runScript(tab.id);
	}
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	switch(request['de-messsage']) {
	case 'isDollchanEnabled':
		sendResponse({ answer: isEnabled });
		break;
	case 'runScript':
		runScript(sender.tab.id);
		sendResponse({ answer: 'Script is runned!' });
		break;
	default: sendResponse({ answer: 'Unknown request' });
	}
});
