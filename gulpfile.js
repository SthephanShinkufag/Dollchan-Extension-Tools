/* eslint no-var: "error", prefer-const: "error", prefer-template: "error" */

const babelify     = require('babelify');
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
	'src/Dollchan_Extension_Tools.es6.user.js',
	'Dollchan_Extension_Tools.meta.js'
];

// Updates commit version in Wrap.js module
gulp.task('updatecommit', function(cb) {
	let stdout, stderr;
	const git = spawn('git', ['rev-parse', 'HEAD']);
	git.stdout.on('data', function(data) {
		stdout = String(data);
	});
	git.stderr.on('data', function(data) {
		stderr = String(data);
	});
	git.on('close', function(code) {
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
gulp.task('make:es6', ['updatecommit'], function() {
	gulp.src('src/modules/Wrap.js').pipe(tap(function(wrapFile) {
		let count = 0;
		let str = wrapFile.contents.toString();
		const arr = str.match(/\/\* ==\[ .*? \]== \*\//g);
		for(let i = 0, len = arr.length - 1; i < len; ++i) {
			gulp.src(`src/modules/${ arr[i].replace(/\/\* ==\[ | \]== \*\//g, '') }`)
				.pipe(tap(function(moduleFile) {
					str = str.replace(arr[i], moduleFile.contents.toString());
					if(++count === len) {
						newfile('src/Dollchan_Extension_Tools.es6.user.js', str).pipe(gulp.dest('.'));
					}
				}));
		}
	}));
});

// Makes es5-script from es6-script
gulp.task('make:es5', ['make:es6'], function() {
	return browserify(['src/es5-polyfills.js', 'src/Dollchan_Extension_Tools.es6.user.js'])
		.transform(babelify)
		.bundle()
		.pipe(source('Dollchan_Extension_Tools.user.js'))
		.pipe(streamify(strip()))
		.pipe(streamify(headerfooter('(function deMainFuncOuter(localData) {\n', '})(null);')))
		.pipe(streamify(headerfooter.header('Dollchan_Extension_Tools.meta.js')))
		.pipe(gulp.dest(''));
});

gulp.task('make', ['make:es5']);

// Split es6-script into separate module files
gulp.task('make:modules', function() {
	gulp.src('src/Dollchan_Extension_Tools.es6.user.js').pipe(tap(function(file) {
		const arr = file.contents.toString().split('/* ==[ ');
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
			newfile(`src/modules/${ fileName }`, `/* ==[ ${ str }`).pipe(gulp.dest(''));
		}
		newfile('src/modules/Wrap.js', wrapStr).pipe(gulp.dest(''));
	}));
});

// Make an extension from es6-script
gulp.task('make:ext', function() {
	gulp.src('extension/caller.js').pipe(tap(function(wrapFile) {
		gulp.src('src/Dollchan_Extension_Tools.es6.user.js')
			.pipe(streamify(headerfooter(...wrapFile.contents.toString().split('/* ==[Dollchan]== */'))))
			.pipe(gulp.dest('./extension'));
	}));
});

// Waits for changes in watchedPaths files, then makes es5 and es6-scripts
gulp.task('watch', function() {
	gulp.watch(watchedPaths, ['make']);
});

gulp.task('default', ['make', 'watch']);
