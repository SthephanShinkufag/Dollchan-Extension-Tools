## ![dE](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/raw/master/Icon.png) Dollchan Extension Tools

>
**Get as userscript: [ES5 version](https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.user.js) or [ESNext version](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/raw/master/src/Dollchan_Extension_Tools.es6.user.js)** (Firefox 52+, Chrome 55+, Opera 42+)
>
**Get as Chrome [Extension](https://chrome.google.com/webstore/detail/dollchan-extension-tools/ipnoalfffblkaodfmipjjgkfbgcfadad)**

### Wiki

>
**[Russian](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki)**
~
**[English](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/home-en)**

### Home page

>
**[https://dscript.me/](https://dscript.me/)**

### License

© 2017 Dollchan Extension Tools Team. See the [LICENSE file](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/blob/master/LICENSE) for license rights and limitations (MIT).

### Userscript compilation

* Install [Node.js](https://nodejs.org/) if not yet.
* Install [Gulp](http://gulpjs.com/) globally: `npm install -g gulp`
* Go to Dollchan repo and run `npm install` to update dependencies.

You can make both ES5 and ESNext userscript versions from [/src/modules](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/tree/master/src/modules) by running:

`gulp make`

Or you can make ESNext version only:

`gulp make:es6`

Also you can make separate source modules from your ESNext version:

`gulp make:modules`



