// ==UserScript==
// @name            DollchanAPI Test
// @namespace       DollchanAPI
// @version         0.2
// @author          Dollchan Extension Tools Team
// @include         *
// ==/UserScript==

function getDollchanAPI() {
	return new Promise((resolve, reject) => {
		const dw = document.defaultView;
		const onmessage = ({ data, ports }) => {
			if(ports && ports.length === 1 && data === 'de-answer-api-message') {
				clearTimeout(to);
				dw.removeEventListener('message', onmessage);
				resolve(ports[0]);
			}
		};
		dw.addEventListener('message', onmessage);
		dw.postMessage('de-request-api-message', '*');
		const to = setTimeout(() => {
			dw.removeEventListener('message', onmessage);
			reject();
		}, 5e3);
	});
}

function runAPI() {
	getDollchanAPI().then(port => {
		port.onmessage = ({ data }) => {
			const result = data.data ;
			switch(data.name) {
			case 'expandmedia':
				const ext = result.split('.').pop();
				console.log(ext + ' is opened:', result);
				if(ext === 'webm' || ext == 'mp4') {
					console.log(document.querySelector(`video[src="${ result }"]`));
				} else {
					console.log(document.querySelector(`img[src="${ result }"]`));
				}
				break;
			case 'filechange':
				console.log('Files changed:', result);
				break;
			case 'newpost':
				console.log('New posts detected:', result);
				break;
			case 'registerapi':
				for(let key in result) {
					console.log(`API ${ key } ${ result[key] ? 'is' : 'not' } registered.`);
				}
				break;
			case 'submitform':
				if(result.success) {
					console.log('Post submitted succesfully!', result.num || '');
				} else {
					console.log('Post submitting error!', result.error);
				}
				break;
		 /* case '...': */
			}
		};
		port.postMessage({ name: 'registerapi', data: ['expandmedia'] });
		port.postMessage({ name: 'registerapi', data: ['filechange'] });
		port.postMessage({ name: 'registerapi', data: ['newpost'] });
		port.postMessage({ name: 'registerapi', data: ['submitform'] });
	 /* port.postMessage({ name: 'registerapi', data: ['...'] }); */
	}).catch(() => console.log('Dollchan API not detected!'));
}

setTimeout(runAPI, 0);