var babelify     = require('babelify');
var browserify   = require('browserify');
var spawn        = require('child_process').spawn;
var gulp         = require('gulp');
var concat       = require('gulp-concat');
var newfile      = require('gulp-file');
var headerfooter = require('gulp-headerfooter');
var replace      = require('gulp-replace');
var streamify    = require('gulp-streamify');
var strip        = require('gulp-strip-comments');
var tap          = require('gulp-tap');
var source       = require('vinyl-source-stream');

var paths = {
	scripts: [
		'src/es5-polyfills.js',
		'src/Dollchan_Extension_Tools.es6.user.js',
		'Dollchan_Extension_Tools.meta.js'
	],
	modules: [
		'src/modules/Head.js',
		'src/modules/DefaultCfg.js',
		'src/modules/Localization.js',
		'src/modules/GlobalVars.js',
		'src/modules/Utils.js',
		'src/modules/Storage.js',
		'src/modules/Panel.js',
		'src/modules/WindowUtils.js',
		'src/modules/WindowVidHid.js',
		'src/modules/WindowFavorites.js',
		'src/modules/WindowSettings.js',
		'src/modules/MenuPopups.js',
		'src/modules/Hotkeys.js',
		'src/modules/ContentLoad.js',
		'src/modules/TimeCorrection.js',
		'src/modules/Players.js',
		'src/modules/Ajax.js',
		'src/modules/Pages.js',
		'src/modules/Spells.js',
		'src/modules/Form.js',
		'src/modules/FormSubmit.js',
		'src/modules/FormFile.js',
		'src/modules/FormCaptcha.js',
		'src/modules/Posts.js',
		'src/modules/PostPreviews.js',
		'src/modules/PostImages.js',
		'src/modules/PostBuilders.js',
		'src/modules/RefMap.js',
		'src/modules/Threads.js',
		'src/modules/ThreadUpdater.js',
		'src/modules/DelForm.js',
		'src/modules/Browser.js',
		'src/modules/BoardDefaults.js',
		'src/modules/BoardDetector.js',
		'src/modules/Misc.js',
		'src/modules/SvgIcons.js',
		'src/modules/Css.js',
		'src/modules/Main.js',
		'src/modules/Tail.js'
	]
};

// Updates commit version in Head.js module
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
		gulp.src('src/modules/Head.js')
			.pipe(replace(/^const commit = '[^']*';$/m, 'const commit = \'' + stdout.trim().substr(0, 7) + '\';'))
			.pipe(gulp.dest('src/modules'))
			.on('end', cb);
	});
});

// Makes es6-script from module files
gulp.task('make:es6', ['updatecommit'], function() {
	return gulp.src(paths.modules)
		.pipe(concat('Dollchan_Extension_Tools.es6.user.js', {newLine: '\r\n'}))
		.pipe(gulp.dest('src'));
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
		newfile('src/modules/Head.js', arr[0].slice(0, -2)).pipe(gulp.dest('')); // Replace file with new
		for(var i = 1, len = arr.length; i < len; ++i) {
			var str = arr[i];
			if(i !== len - 1) {
				str = str.slice(0, -2); // Remove last \r\n
			}
			var fileName = str.slice(0, str.indexOf(' ]'));
			newfile('src/modules/' + fileName, '/*==[ ' + str).pipe(gulp.dest(''));
		}
	}));
});

// Makes firefox-extension from es5-script
gulp.task('make:extension', ['make'], function() {
	return gulp.src('Dollchan_Extension_Tools.user.js')
		.pipe(replace('global.regenerator', 'window.regenerator'))
		.pipe(gulp.dest('dollchan-extension/data'));
});

gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['make']);
});

gulp.task('default', ['make', 'watch']);
