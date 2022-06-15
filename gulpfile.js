/* eslint no-undef: "off" */

const browserify   = require('browserify');
const { spawn }    = require('child_process');
const gulp         = require('gulp');
const newfile      = require('gulp-file');
const headerfooter = require('gulp-headerfooter');
const replace      = require('gulp-replace');
const streamify    = require('gulp-streamify');
const strip        = require('gulp-strip-comments');
const tap          = require('gulp-tap');
const source       = require('vinyl-source-stream');

const watchedPaths = [
	'src/modules/*',
	'src/es5-polyfills.js',
	'Dollchan_Extension_Tools.meta.js'
];

// Updates commit version in Wrap.js module
gulp.task('updatecommit', cb => {
	let stdout, stderr;
	const git = spawn('git', ['rev-parse', 'HEAD']);
	git.stdout.on('data', data => (stdout = String(data)));
	git.stderr.on('data', data => (stderr = String(data)));
	git.on('close', code => {
		if(code !== 0) {
			throw new Error(`Git error:\n${ stdout ? `${ stdout }\n` : '' }${ stderr }`);
		}
		gulp.src('src/modules/Wrap.js')
			.pipe(replace(/^const commit = '[^']*';$/m, `const commit = '${ stdout.trim().substr(0, 7) }';`))
			.pipe(gulp.dest('src/modules'))
			.on('end', cb);
	});
});

// Makes es6-script from module files
gulp.task('make:es6', gulp.series('updatecommit', () =>
	gulp.src('src/modules/Wrap.js').pipe(tap(wrapFile => {
		let count = 0;
		let str = wrapFile.contents.toString();
		const arr = str.match(/\/\* ==\[ .*? \]== \*\//g);
		for(let i = 0, len = arr.length - 1; i < len; ++i) {
			gulp.src(`src/modules/${ arr[i].replace(/\/\* ==\[ | \]== \*\//g, '') }`)
				.pipe(tap(moduleFile => {
					str = str.replace(arr[i], moduleFile.contents.toString());
					if(++count === len) {
						newfile('src/Dollchan_Extension_Tools.es6.user.js', `\r\n${ str }`)
							.pipe(streamify(headerfooter.header('Dollchan_Extension_Tools.meta.js')))
							.pipe(gulp.dest('.'));
					}
				}));
		}
	}))
));

// Copy es6 script from src/ to extension/ folder
gulp.task('copyext', () => gulp.src('src/Dollchan_Extension_Tools.es6.user.js')
	.pipe(gulp.dest('extension/')));

// Makes es5-script from es6-script
gulp.task('make:es5', gulp.series(
	'make:es6',
	() => browserify(['src/es5-polyfills.js', 'src/Dollchan_Extension_Tools.es6.user.js'])
		.transform('babelify', { presets: ['@babel/preset-env'] })
		.bundle()
		.pipe(source('Dollchan_Extension_Tools.user.js'))
		.pipe(streamify(strip()))
		.pipe(streamify(headerfooter(
			'/* eslint-disable */\n(function deMainFuncOuter(localData) {\n',
			'})(null);')))
		.pipe(streamify(headerfooter.header('Dollchan_Extension_Tools.meta.js')))
		.pipe(gulp.dest('.')),
	'copyext'
));

gulp.task('make', gulp.series('make:es5'));

// Split es6-script into separate module files
gulp.task('make:modules', () => gulp.src('src/Dollchan_Extension_Tools.es6.user.js').pipe(tap(file => {
	const arr = file.contents.toString().split('// ==/UserScript==\r\n\r\n')[1].split('/* ==[ ');
	let wrapStr = `${ arr[0].slice(0, -2) }\r\n`;
	for(let i = 1, len = arr.length; i < len; ++i) {
		let str = arr[i];
		if(i !== len - 1) {
			str = str.slice(0, -2); // Remove last \r\n
			wrapStr += `/* ==[ ${ str.split(' ]==')[0] } ]== */\r\n`;
		} else {
			wrapStr += `/* ==[ ${ str }`;
			break;
		}
		const fileName = str.slice(0, str.indexOf(' ]'));
		newfile(`src/modules/${ fileName }`, `/* ==[ ${ str }`).pipe(gulp.dest('.'));
	}
	newfile('src/modules/Wrap.js', wrapStr).pipe(gulp.dest('.'));
})));

// Waits for changes in watchedPaths files, then makes es5 and es6-scripts
gulp.task('watch', () => gulp.watch(watchedPaths, gulp.series('make')));
gulp.task('default', gulp.parallel('make', 'watch'));
