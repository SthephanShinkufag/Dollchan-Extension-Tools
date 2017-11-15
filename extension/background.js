function saveStorage(obj) {
	chrome.storage.local.set({ 'de-enabled': isEnabled }, function(e) {
		if(e) {
			console.error('Storage error: ' + e);
		}
	});
}

function setIcon(enabled) {
	chrome.browserAction.setIcon({ path: `icons/logo-32${ enabled ? '' : '-disabled' }.svg` });
	chrome.browserAction.setTitle({ title: `${ enabled ? 'Disable' : 'Enable' } Dollchan-Extension` });
}

// Run
let isEnabled = true;
chrome.storage.local.get('de-enabled', function(obj) {
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
});
chrome.runtime.onConnect.addListener(port => {
	if(port.name === 'de-question') {
		port.onMessage.addListener(msg => {
			if(msg.question === 'isDollchanEnabled') {
				port.postMessage({ answer: isEnabled });
			}
		});
	}
});
