![Last commit](https://img.shields.io/github/last-commit/SthephanShinkufag/Dollchan-Extension-Tools.svg)
![Commit activity](https://img.shields.io/github/commit-activity/y/SthephanShinkufag/Dollchan-Extension-Tools.svg)
![Open bugs](https://img.shields.io/github/issues/SthephanShinkufag/Dollchan-Extension-Tools/bug.svg)
![Open enhancements](https://img.shields.io/github/issues/SthephanShinkufag/Dollchan-Extension-Tools/enhancement.svg)

# ![dE](https://raw.githubusercontent.com/SthephanShinkufag/Dollchan-Extension-Tools/master/extension/icons/logo-48.png) Dollchan Extension Tools

Combines many options and features, making you hang out on imageboards in an easier and more convenient way.

### Userscript: [ [ES5 version](https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.user.js) ] ~ [ [ESNext version](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/raw/master/src/Dollchan_Extension_Tools.es6.user.js) ]
`ES5 is for old browsers, ESNext is for Firefox 52+ / Chrome 55+ / Opera 42+`

### Extension: [ [ Chrome store ](https://chrome.google.com/webstore/detail/dollchan-extension-tools/ipnoalfffblkaodfmipjjgkfbgcfadad) ]
![Webstore users](https://img.shields.io/chrome-web-store/users/ipnoalfffblkaodfmipjjgkfbgcfadad.svg) ![Webstore rating](https://img.shields.io/chrome-web-store/rating/ipnoalfffblkaodfmipjjgkfbgcfadad.svg)

---
### Wiki: **[Russian](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki)** ~ **[English](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/home-en)**

### Home: [https://dscript.me/](https://dscript.me/)

### License:

© 2017 Dollchan Extension Tools Team. See the [LICENSE file](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/blob/master/LICENSE) for license rights and limitations (MIT).

### Userscript compilation:

1. Install [Node.js](https://nodejs.org/) if not yet.
2. Install [Gulp](http://gulpjs.com/) globally:
```
npm rm -g gulp
npm install -g gulp-cli
```
3. Go to Dollchan repo and update dependencies:
```
npm install
```
4. Then you can make both ES5 and ESNext userscript versions from [/src/modules](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/tree/master/src/modules) by running:
```
gulp make
```
5. Or you can make ESNext version only:
```
gulp make:es6
```
6. Also you can make separate source modules from your ESNext version:
```
gulp make:modules
```

