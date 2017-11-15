const port = chrome.runtime.connect({ name: 'de-question' });
port.postMessage({ question: 'isDollchanEnabled' });
port.onMessage.addListener(msg => {
	if(msg.answer === true) {

		/* ==[Dollchan]== */

	}
});
