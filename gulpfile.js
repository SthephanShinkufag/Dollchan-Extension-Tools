var babelify     = require('babelify');
var browserify   = require('browserify');
var spawn        = require('child_process').spawn;
var gulp         = require('gulp');
var newfile      = require('gulp-file');
var headerfooter = require('gulp-headerfooter');
var replace      = require('gulp-replace');
var streamify    = require('gulp-streamify');
var strip        = require('gulp-strip-comments');
var tap          = require('gulp-tap');
var source       = require('vinyl-source-stream');

var watchedPaths = [
	'src/modules/*',
	'src/es5-polyfills.js',
	'src/Dollchan_Extension_Tools.es6.user.js',
	'Dollchan_Extension_Tools.meta.js'
];

// Updates commit version in Wrap.js module
gulp.task('updatecommit', function(cb) {
	var git = spawn('git', ['rev-parse', 'HEAD']);
	var stdout, stderr;
	git.stdout.on('data', function(data) {
		stdout = String(data);
	});
	git.stderr.on('data', function(data) {
		stderr = String(data);
	});
	git.on('close', function(code) {
		if(code !== 0) {
			throw 'Git error:\n' + (stdout ? stdout + '\n' : '') + stderr;
		}
		gulp.src('src/modules/Wrap.js')
			.pipe(replace(/^const commit = '[^']*';$/m, 'const commit = \'' + stdout.trim().substr(0, 7) + '\';'))
			.pipe(gulp.dest('src/modules'))
			.on('end', cb);
	});
});

// Makes es6-script from module files
gulp.task('make:es6', ['updatecommit'], function() {
	gulp.src('src/modules/Wrap.js').pipe(tap(function(wrapFile) {
		var str = wrapFile.contents.toString();
		var arr = str.match(/\/\*==\[ .*? \]==\*\//g);
		for(var i = 0, count = 0, len = arr.length; i < len; ++i) {
			var match = arr[i];
			gulp.src('src/modules/' + match.replace(/\/\*==\[ | \]==\*\//g, '')).pipe(tap(function(moduleFile) {
				str = str.replace(this, moduleFile.contents.toString());
				count++;
				if(count === len) {
					newfile('src/Dollchan_Extension_Tools.es6.user.js', str).pipe(gulp.dest('.'));
				}
			}.bind(match)));
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
		.pipe(streamify(headerfooter('(function de_main_func_outer(localData) {\n', '})(null);')))
		.pipe(streamify(headerfooter.header('Dollchan_Extension_Tools.meta.js')))
		.pipe(gulp.dest(''));
});

gulp.task('make', ['make:es5']);

// Split es6-script into separate module files
gulp.task('make:modules', function() {
	gulp.src('src/Dollchan_Extension_Tools.es6.user.js').pipe(tap(function(file) {
		var arr = file.contents.toString().split('/*==[ ');
		var wrapStr = arr[0].slice(0, -2) + '\r\n';
		for(var i = 1, len = arr.length; i < len; ++i) {
			var str = arr[i];
			if(i !== len - 1) {
				str = str.slice(0, -2); // Remove last \r\n
				wrapStr += '/*==[ ' + str.split(' ]==')[0] + ' ]==*/\r\n';
			} else {
				wrapStr += '/*==[ ' + str;
				break;
			}
			var fileName = str.slice(0, str.indexOf(' ]'));
			newfile('src/modules/' + fileName, '/*==[ ' + str).pipe(gulp.dest(''));
		}
		newfile('src/modules/Wrap.js', wrapStr).pipe(gulp.dest(''));
	}));
});

// Makes firefox-extension from es5-script
gulp.task('make:extension', ['make'], function() {
	return gulp.src('Dollchan_Extension_Tools.user.js')
		.pipe(replace('global.regenerator', 'window.regenerator'))
		.pipe(gulp.dest('dollchan-extension/data'));
});

// Waits for changes in watchedPaths files, then makes es5 and es6-scripts
gulp.task('watch', function() {
	gulp.watch(watchedPaths, ['make']);
});

gulp.task('default', ['make', 'watch']);
