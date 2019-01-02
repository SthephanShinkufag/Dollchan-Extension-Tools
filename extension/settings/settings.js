/* eslint indent: ["error", "tab", { "outerIIFEBody": 0 }] */
(function() {
'use strict';
const emptyFn = Function.prototype;
const $id = id => document.getElementById(id);

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

getStored('DESU_scope').then(scopeObj => {
	if(!scopeObj) {
		scopeObj = {};
	}
	$id('scope-includes-value').value = scopeObj.includes || '*';
	$id('scope-excludes-value').value = scopeObj.excludes || '';
});

document.addEventListener('click', e => {
	const el = e.target;
	if(el.classList.contains('tab')) {
		document.querySelector('.tab.active').classList.remove('active');
		document.querySelector('.content.active').classList.remove('active');
		el.classList.add('active');
		$id('content-' + el.id.split('-')[1]).classList.add('active');
	}
	if(el.id === 'save-scope') {
		setStored('DESU_scope', {
			includes : $id('scope-includes-value').value.trim(),
			excludes : $id('scope-excludes-value').value.trim()
		});
	}
}, true);
}());
