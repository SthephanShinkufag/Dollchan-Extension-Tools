![Last commit](https://img.shields.io/github/last-commit/SthephanShinkufag/Dollchan-Extension-Tools.svg)&nbsp;![Commit activity](https://img.shields.io/github/commit-activity/y/SthephanShinkufag/Dollchan-Extension-Tools.svg)&nbsp;![Bugs](https://img.shields.io/github/issues/SthephanShinkufag/Dollchan-Extension-Tools/bug.svg)&nbsp;![Enhancements](https://img.shields.io/github/issues/SthephanShinkufag/Dollchan-Extension-Tools/enhancement.svg)

# ![dE](https://raw.githubusercontent.com/SthephanShinkufag/Dollchan-Extension-Tools/master/extension/v3/icons/logo-32.png) Dollchan Extension Tools

- **[ [ESNEXT USERSCRIPT](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/raw/master/src/Dollchan_Extension_Tools.es6.user.js) ]** &mdash; Firefox 77+, Chrome 85+, Opera 71+
- **[ [ES5 USERSCRIPT](https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.user.js) ]** &mdash; for old browsers
- **[ [FIREFOX EXTENSION](https://addons.mozilla.org/firefox/addon/dollchan_extension/) ]**

---
- **[ [English wiki](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/home-en) ]**
- **[ [Russian wiki](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki) ]**
- **[ [Homepage](https://dollchan.net/extension/) ]**
- **License:** © 2023 Dollchan Extension Tools Team.<br>See the [LICENSE file](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/blob/master/LICENSE) for license rights and limitations (MIT).

---
**Dollchan Extension** is the userscript and extension that combines various options & features, making you hang out on [imageboards](https://en.wikipedia.org/wiki/Imageboard) in an easier and more convenient way. If you have visited sites like [4chan.org](http://4chan.org/) or [2ch.hk](https://2ch.hk/), then you probably already heard about it.

It provides such functions:
- Sending posts without reloading page.
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
### Compilation:

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
3. Select the path to `/extension/v3` directory in your Dollchan repo.<br>
If you don't have a Dollchan repo, download and unpack the [repository archive](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/archive/master.zip) from the last state.
4. Done.

**Firefox**
1. Go to the extensions page by typing `about:addons` in your browser's address bar,<br>
disable your existing Dollchan extension if available.
2. Go to `about:debugging#addons` page, press the `"Download temporary add-on…"` button.
3. Open the `/extension/v3` directory in your Dollchan repo and select the path to `manifest.json` file.<br>
If you don't have a Dollchan repo, download and unpack the [repository archive](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/archive/master.zip) from the last state.
4. Done.

**Firefox for Android**
1. Install [web-ext](https://github.com/mozilla/web-ext) using Git:<br>
`npm install -g web-ext`<br>
2. Install [Android Studio](https://developer.android.com/studio) on your development computer.
3. Install [Firefox for Android Nightly](https://play.google.com/store/apps/details?id=org.mozilla.fenix) on your device.
4. [Enable Android USB debugging on the device](https://developer.android.com/studio/debug/dev-options).
5. Attach your device to the development computer using a USB cable.<br>
When prompted, allow USB debugging for the connection.
6. In the settings view for Firefox for Android Nightly, enable "Remote debugging via USB."
7. Run with Git:<br>
`web-ext run -t firefox-android --source-dir ./extension/v3 --adb-device XXX --firefox-apk org.mozilla.fenix`<br>
where `XXX` is the name of your device (it will be displayed if you enter `XXX` instead of the name, replace `XXX` with the given name and run the command again)

---
### Support the project by donating:

- BTC: `13NWiiMocssmXiaVKRG4A4SQ6JP4WbLACz`
- BTC (SegWit): `bc1q2x33mkrwv6zadhflvxv2cct45ssn5a7t4ygvtj`
- ETH: `0xffa96732ae8df25c34444c70c0d59c752a47aafa`
- Mastercard: `5375411208220306`
- [Donate online (UAH)](https://send.monobank.ua/jar/A7Saf6YAaz)

