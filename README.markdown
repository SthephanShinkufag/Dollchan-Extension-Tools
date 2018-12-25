![Last commit](https://img.shields.io/github/last-commit/SthephanShinkufag/Dollchan-Extension-Tools.svg)&nbsp;![Commit activity](https://img.shields.io/github/commit-activity/y/SthephanShinkufag/Dollchan-Extension-Tools.svg)&nbsp;![Bugs](https://img.shields.io/github/issues/SthephanShinkufag/Dollchan-Extension-Tools/bug.svg)&nbsp;![Enhancements](https://img.shields.io/github/issues/SthephanShinkufag/Dollchan-Extension-Tools/enhancement.svg)

# ![dE](https://raw.githubusercontent.com/SthephanShinkufag/Dollchan-Extension-Tools/master/extension/icons/logo-32.png) Dollchan Extension Tools

Options & features that making you hang out on [imageboards](https://en.wikipedia.org/wiki/Imageboard) in an easier and more convenient way.

---
- **[ [ES5 USERSCRIPT](https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.user.js) ]** &mdash; `for old browsers`
- **[ [ESNEXT USERSCRIPT ](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/raw/master/src/Dollchan_Extension_Tools.es6.user.js) ]** &mdash; `Firefox 52+ / Chrome 55+ / Opera 42+`
- **[ [CHROME EXTENSION](https://chrome.google.com/webstore/detail/dollchan-extension-tools/ipnoalfffblkaodfmipjjgkfbgcfadad) ]**<br>![Webstore users](https://img.shields.io/chrome-web-store/users/ipnoalfffblkaodfmipjjgkfbgcfadad.svg)&nbsp;![Webstore rating](https://img.shields.io/chrome-web-store/rating/ipnoalfffblkaodfmipjjgkfbgcfadad.svg)

---
- **[English wiki](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/home-en)**
- **[Russian wiki](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki)**
- **Home: [https://dscript.me/](https://dscript.me/)**
- **License:** © 2017 Dollchan Extension Tools Team.<br>See the [LICENSE file](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/blob/master/LICENSE) for license rights and limitations (MIT).

---
### Userscript compilation:

1. Install [Node.js](https://nodejs.org/) if not yet.
2. Install [Gulp](http://gulpjs.com/) globally:<br>
`npm rm -g gulp`<br>
`npm install -g gulp-cli`
3. Go to Dollchan repo and update dependencies:<br>
`npm install`
4. Then you can make both ES5 and ESNext userscript versions from [/src/modules](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/tree/master/src/modules) by running:<br>
`gulp make`
5. Or you can make ESNext version only:<br>
`gulp make:es6`
6. Also you can make separate source modules from your ESNext version:<br>
`gulp make:modules`
