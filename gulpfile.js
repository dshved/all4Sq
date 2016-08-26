'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
    gulp.src('./public/css/style.scss')
      .pipe(sass())
      .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
      .pipe(gulp.dest('./public/css/'))
});

gulp.task('watch', function() {
    gulp.watch('./public/css/**/*.scss', ['sass']);
    // gulp.watch('app/**/*.jade', ['jade']);
});

gulp.task('default',['sass', 'watch']);