var gulp = require('gulp');

var jshint = require('gulp-jshint');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var paths = {
	scripts: [
		'src/browser-polyfill.js',
		'src/Dollchan_Extension_Tools.es6.user.js',
		'Dollchan_Extension_Tools.meta.js'
	],
};

gulp.task('make', function() {
	var res = concat('Dollchan_Extension_Tools.user.js', {newLine: ''});
	gulp.src('Dollchan_Extension_Tools.meta.js')
		.pipe(res, { end: false });
	gulp.src('src/browser-polyfill.js')
		.pipe(res, { end: false });
	return gulp.src('src/Dollchan_Extension_Tools.es6.user.js')
		.pipe(babel())
		.pipe(uglify())
		.pipe(res, { end: true })
		.pipe(gulp.dest('.'));
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