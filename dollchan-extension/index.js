var data = require('sdk/self').data;
var page = require('sdk/page-mod');

page.PageMod({
	include: '*',
	contentScriptFile: data.url('boards-getter.js'),
	contentScriptWhen: 'ready',
	onAttach: function(worker) {
		worker.port.on('checkBoard', function(canRun) {
			if(canRun) {
				console.log('Script is runned.');
				worker.tab.attach({
					contentScriptFile: data.url('Dollchan_Extension_Tools.user.js')
				});
				return;
			}
			console.log('No board.');
		});
	}
});
