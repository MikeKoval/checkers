'use strict';

const gulp = require('gulp');
const rollup     = require('gulp-rollup');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const debug = require('gulp-debug');
const del = require('del');
const stylus = require('gulp-stylus');

gulp.task('clean', function () {
    return del('public');
});

gulp.task('js', function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(rollup({
            entry: './src/js/app.js'
        }))
        // .pipe(babel({presets: ['es2015']}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('css', function() {
   return gulp.src('./src/styles/style.styl')
       .pipe(sourcemaps.init())
       .pipe(stylus())
       .pipe(sourcemaps.write('.'))
       .pipe(gulp.dest('public/css'))
});

gulp.task('build', ['css', 'js']);

gulp.task('watch', function() {
   gulp.watch('./src/**/*', ['build']);
});

gulp.task('default', ['build', 'watch']);