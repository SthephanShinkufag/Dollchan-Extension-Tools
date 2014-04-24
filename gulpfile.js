var gulp = require('gulp');

var concat = require('gulp-concat');
var jshint = require('gulp-jshint');

var paths = {
	scripts: [
		'src/_head.js',
		'src/_defaultCfg.js',
		'src/utilites.js',
		'src/storage_and_config.js',
		'src/main_panel.js',
		'src/settings_window.js',
		'src/menus_and_popups.js',
		'src/keyboard_navigation.js',
		'src/form_submit.js',
		'src/content_features.js',
		'src/time_correction.js',
		'src/players.js',
		'src/ajax.js',
		'src/spells.js',
		'src/styles.js',
		'src/script_updating.js',
		'src/postform.js',
		'src/images.js',
		'src/post.js',
		'src/preview.js',
		'src/thread.js',
		'src/imageboard.js',
		'src/browser.js',
		'src/initialization.js',
		'src/main.js',
		'src/_tail.js',
	],
};

gulp.task('scripts', function() {
	return gulp.src(paths.scripts)
		.pipe(concat('Dollchan_Extension_Tools.user.js', {newLine: ''}))
		.pipe(gulp.dest('.'));
});

gulp.task('lint', function() {
	return gulp.src(paths.scripts)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);
