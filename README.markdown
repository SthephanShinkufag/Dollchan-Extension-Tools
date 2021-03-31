![Last commit](https://img.shields.io/github/last-commit/SthephanShinkufag/Dollchan-Extension-Tools.svg)&nbsp;![Commit activity](https://img.shields.io/github/commit-activity/y/SthephanShinkufag/Dollchan-Extension-Tools.svg)&nbsp;![Bugs](https://img.shields.io/github/issues/SthephanShinkufag/Dollchan-Extension-Tools/bug.svg)&nbsp;![Enhancements](https://img.shields.io/github/issues/SthephanShinkufag/Dollchan-Extension-Tools/enhancement.svg)

# ![dE](https://raw.githubusercontent.com/SthephanShinkufag/Dollchan-Extension-Tools/master/extension/icons/logo-32.png) Dollchan Extension Tools

- **[ [ES5 USERSCRIPT](https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.user.js) ]** &mdash; `for old browsers`
- **[ [ESNEXT USERSCRIPT ](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/raw/master/src/Dollchan_Extension_Tools.es6.user.js) ]** &mdash; `Firefox 52+ / Chrome 55+ / Opera 42+`
- **[ [FIREFOX EXTENSION](https://addons.mozilla.org/firefox/addon/dollchan-extension/) ]**<br>![Mozilla rating](https://img.shields.io/amo/rating/dollchan-extension.svg)

---
- **[English wiki](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/home-en)**
- **[Russian wiki](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki)**
- **Homepage: [https://dollchan.net/](https://dollchan.net/)**
- **License:** © 2021 Dollchan Extension Tools Team.<br>See the [LICENSE file](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/blob/master/LICENSE) for license rights and limitations (MIT).

---
**Dollchan Extension** is the userscript and extension that combines various options & features, making you hang out on [imageboards](https://en.wikipedia.org/wiki/Imageboard) in an easier and more convenient way. If you have visited sites like [4chan.org](http://4chan.org/) or [2ch.hk](https://2ch.hk/), then you probably already heard about it.

It provides such functions:
- Sending posts without rebooting.
- Thread updater with different types of alerts<br>(for example, blinking favicon or desktop notification when new posts appear).
- Hiding posts and threads by a wide choice of expressions and rules.
- Saving threads entirely with the originals of pictures.
- Preloading full pictures into memory buffer.
- Expanding threads directly on the index page.
- Adding interesting threads to your Favorites to track new posts or responses to your posts.
- "Endless scrolling" of index pages with threads.
- Easy navigation through >>links as a posts tree.
- Embedding player to YouTube and Vimeo links.
- Easy navigation through attached pictures / videos in posts.
- Applying search services to pictures and stills from videos.
- Reading metadata form webm files.
- Adding pictures to the reply form with convenient preview thumbnails.
- Posting pictures with random bytes added and custom names.
- Embedding preview thumbnails to .jpg / .png / .gif links.
- Adding your CSS rules.
- Hotkeys for many functions.

... and many other features!

Dollchan has both cross-browser and cross-board working scope. A list of supported sites includes all imageboards based on [Wakaba](https://wakaba.c3.cx/s/web/wakaba_kareha), [Kusaba](http://kusabax.cultnet.net/), [Tinyboard](https://github.com/savetheinternet/Tinyboard), [Vichan](https://github.com/vichan-devel/vichan), [TinyIB](https://github.com/tslocum/TinyIB), [LynxChan](https://gitgud.io/LynxChan/LynxChan), [FoolFuuka](https://github.com/FoolCode/FoolFuuka), their derivatives, or any other board engine that generates a html source parsable by the Dollchan, implying no critical changes were made by board maintainers.

---
### Userscript compilation:

1. Install [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/) if not yet.
2. Install [Gulp](http://gulpjs.com/) using Git:<br>
`npm rm -g gulp`<br>
`npm install -g gulp-cli`
3. Using Git, go to Dollchan repo and update dependencies:<br>
`npm install`
4. Then you can make both ES5 and ESNext userscript versions from [/src/modules](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/tree/master/src/modules) by running:<br>
`gulp make`
5. Or you can make ESNext version only:<br>
`gulp make:es6`
6. Also you can make separate source modules from your ESNext version:<br>
`gulp make:modules`

---
### How to test an extension:

**Chrome**
1. Go to the extensions page by typing `chrome://extensions/` in your browser's address bar,<br>
disable your existing Dollchan extension if available.
2. Set the `"Developer's mode"` checkbox, press the `"Load unpacked extension"` button.
3. Select the path to `/extension` directory in your Dollchan repo.<br>
If you don't have a Dollchan repo, download and unpack the [repository archive](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/archive/master.zip) from the last state.
4. Done.

**Firefox**
1. Go to the extensions page by typing `about:addons` in your browser's address bar,<br>
disable your existing Dollchan extension if available.
2. Go to `about:debugging#addons` page, press the `"Download temporary add-on…"` button.
3. Open the `/extension` directory in your Dollchan repo and select the path to `manifest.json` file.<br>
If you don't have a Dollchan repo, download and unpack the [repository archive](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/archive/master.zip) from the last state.
4. Done.

---
### Donate

- *YooMoney:*<br>
    410012122418236
- *WebMoney:*<br>
    WMZ – Z100197626370<br>
    WMR – R266614957054
- *Bitcoin:*<br>
    P2PKH – 15xEo7BVQ3zjztJqKSRVhTq3tt3rNSHFpC<br>
    P2SH – 3AhNPPpvtxQoFCLXk5e9Hzh6Ex9h7EoNzq
