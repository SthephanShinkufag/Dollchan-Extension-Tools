/* eslint indent: ["error", "tab", { "outerIIFEBody": 0 }] */
(function() {
'use strict';
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

function setOptionToggle(isEnabled) {
	const el = document.getElementById('option-toggle');
	el.classList.toggle('option-toggle-disabled', !isEnabled);
	el.textContent = isEnabled ? 'Enabled' : 'Disabled';
}

document.addEventListener('click', e => {
	const el = e.target;
	switch(el.id) {
	case 'option-toggle':
		// Conversation with background.js
		chrome.runtime.sendMessage({ 'de-messsage': 'toggleDollchan' },
			response => setOptionToggle(response.answer));
		break;
	case 'option-settings':
		chrome.tabs.create({ url: '../settings/settings.html' });
		window.close();
		break;
	}
}, true);

getStored('DESU_enabled').then(val => setOptionToggle(val === true));
}());
