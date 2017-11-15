chrome.runtime.sendMessage({ 'de-messsage': 'isDollchanEnabled' }, response => {
	if(!response) {
		return;
	}
	if(response.answer === true) {
		chrome.runtime.sendMessage({ 'de-messsage': 'runScript' }, response => {
			// console.log(response.answer);
		});
	}
});
