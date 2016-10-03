'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var newer = require('gulp-newer');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

const reload = browserSync.reload;

gulp.task('css', () => {
    var postcss = require('gulp-postcss');
    var cssnext = require('postcss-cssnext');
    var atImport = require('postcss-import');

    var processors = [ atImport, cssnext ];

    return gulp.src('src/**/*.css')
        .pipe( newer('build/css') )
        .pipe( sourcemaps.init() )
        .pipe( postcss(processors) )
        .pipe( concat('style.css') )
        .pipe( gulp.dest('build/css') )
        .pipe( cssnano() )
        .pipe( rename({extname: ".min.css"}) )
        .pipe( sourcemaps.write('../sourcemaps') )
        .pipe( gulp.dest('build/css') );
});

gulp.task('pug', () => {
    var pug = require('gulp-pug');

    return gulp.src('src/pug/2-pages/*.pug', { base: 'src/pug/2-pages' })
        .pipe( newer('build/**/*.html') )
        .pipe( sourcemaps.init() )
        .pipe( pug({ pretty: true }) )
        .pipe( sourcemaps.write('./sourcemaps') )
        .pipe( gulp.dest('build/') );
});

gulp.task('serve', ['css', 'pug'], () => {
    browserSync.init({
        server: {
            baseDir: './build/'
        }
    });

    gulp.watch('src/css/**/*.css', ['css', reload]);
    gulp.watch('src/pug/**/*.pug', ['pug', reload]);
});
