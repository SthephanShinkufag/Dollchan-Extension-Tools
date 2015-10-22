var gulp = require('gulp');

var jshint = require('gulp-jshint');
var babel = require('gulp-babel');
var strip = require('gulp-strip-comments');
var headerfooter = require('gulp-headerfooter');
var dest = require('gulp-dest');
var replace = require('gulp-replace');
var spawn = require('child_process').spawn;

var paths = {
	scripts: [
		'src/browser-polyfill.js',
		'src/Dollchan_Extension_Tools.es6.user.js',
		'Dollchan_Extension_Tools.meta.js'
	],
};

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
		gulp.src('src/Dollchan_Extension_Tools.es6.user.js')
			.pipe(replace(/^var commit = '[^']*';$/m, 'var commit = \'' + stdout.trim().substr(0, 7) + '\';'))
			.pipe(gulp.dest('./src/'))
			.on('end', cb);
	});
});

gulp.task('make', ['updatecommit'], function() {
	return gulp.src('src/Dollchan_Extension_Tools.es6.user.js')
		.pipe(babel({ compact: false, blacklist: ['es5.properties.mutators'] }))
		.pipe(headerfooter.header('src/regenerator-runtime.js'))
		.pipe(headerfooter.header('src/core-js.custom.js'))
		.pipe(strip())
		.pipe(headerfooter.header('(function de_main_func_outer() {\n'))
		.pipe(headerfooter.footer('})();'))
		.pipe(headerfooter.header('Dollchan_Extension_Tools.meta.js'))
		.pipe(dest('', {basename: 'Dollchan_Extension_Tools.user.'}))
		.pipe(gulp.dest('./'));
});

gulp.task('lint', function() {
	return gulp.src('src/Dollchan_Extension_Tools.es6.user.js')
		.pipe(jshint({ esnext: true, elision: true, sub: true, supernew: true, curly: true }))
		.pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['make']);
});

gulp.task('default', ['make', 'watch']);