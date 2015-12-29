var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    rename = require('gulp-rename');

gulp.task('scripts', ['clean'], function() {
  	return gulp.src('src/*.js')
    	.pipe(rename({suffix: '.min'}))
    	.pipe(uglify())
    	.pipe(gulp.dest('dist/'));
});

gulp.task('clean', function() {
    return del(['dist/']);
});

gulp.task('default', ['scripts']);