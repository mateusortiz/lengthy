var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename');

gulp.task('build', function() {
	return gulp.src('src/**/*.js')
	.pipe(uglify())
	.pipe(rename('lengthy.min.js'))
	.pipe(gulp.dest('./'));
});

gulp.task('default', ['build']);