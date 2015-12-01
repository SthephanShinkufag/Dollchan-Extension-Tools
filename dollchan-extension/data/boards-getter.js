var domain = window.location.hostname
	.match(/(?:(?:[^.]+\.)(?=org\.|net\.|com\.))?[^.]+\.[^.]+$|^\d+\.\d+\.\d+\.\d+$|localhost/)[0];
var domains = ['0chan.cc', '0chan.so', '0-chan.ru', '02ch.net', '02ch.su', '2ch.hk', '2ch.pm', '2-chru.net', '2chru.net', '2chru.cafe', '2-chru.cafe', '2--ch.ru', '2-ch.su', '410chan.org', '4chan.org', '7chan.org', '8ch.net', 'arhivach.org', 'diochan.com', 'niuchan.org', 'dobrochan.com', 'dobrochan.org', 'dobrochan.ru', 'dva-ch.net', 'iichan.hk', 'krautchan.net', 'lainchan.org', 'mlpg.co', 'ponya.ch', 'ponyach.cf', 'ponyach.ga', 'ponyach.ml', 'ponyach.ru', 'ponychan.ru', 'ponychan.net', 'syn-ch.ru', 'syn-ch.com', 'syn-ch.org', 'uchan.to'];

if(domains.indexOf(domain) === -1) {
	var qPath =
		/* BaseBoard */ '#delform, form[name="delform"], ' +
		/*    Makaba */ '#posts-form, ' +
		/*    Futaba */ 'form[action*="futaba.php"], ' +
		/* Tinyboard */ 'form[name*="postcontrols"]';

	var body = document.body;
	var isMatch = body && !!body.querySelector(qPath);
	console.log('Check for delform: ' + isMatch);
	self.port.emit('checkBoard', isMatch);
} else {
	console.log('Domain matched: ' + domain);
	self.port.emit('checkBoard', true);
}
