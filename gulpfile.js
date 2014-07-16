/* global require */
/* jshint -W097 */
'use strict';

var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();
var gutil = require('gulp-util');

var onError = function (err) {
    gutil.beep();
    gutil.log( gutil.colors.red(err));
};

gulp.task('styles', function () {
    return gulp.src('app/scss/main.scss')
        //.pipe($.plumber(onError))
        .pipe($.sass({
            //includePaths: ['app/bower_components/foundation/scss'],
            errLogToConsole: true
        }))
        .pipe($.autoprefixer('last 1 version'))
        //.pipe($.plumber.stop())
        //.pipe($.csso())
        .pipe(gulp.dest('dist/css'))
        .pipe($.size());
});

gulp.task('scripts', function () {
    return gulp.src('app/js/**/*.js')
        //.pipe($.jshint())
        //.pipe($.jshint.reporter(require('jshint-stylish')))
        //.pipe($.uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe($.size());
});


gulp.task('images', function () {
    return gulp.src('app/img/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/img'))
        .pipe($.size());
});

gulp.task('extras', function () {
    return gulp.src(['app/*.*'], { dot: true })
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return gulp.src(['dist'], { read: false }).pipe($.clean());
});

gulp.task('build', ['scripts', 'styles', 'images', 'extras']);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

gulp.task('serve', ['styles'], function () {
    require('opn')('http://localhost:3000');
});

gulp.task('watch', ['serve'], function () {
    var server = $.livereload();

    // watch for changes

    gulp.watch([
        '*.php',
        'dist/css/**/*.css',
        'dist/js/**/*.js',
        'dist/img/**/*'
    ]).on('change', function (file) {
        server.changed(file.path);
    });

    gulp.watch('app/scss/**/*.scss', ['styles']);
    gulp.watch('app/js/**/*.js', ['scripts']);
    gulp.watch('app/img/**/*', ['images']);
});
