var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('css', function () {
  var postcss = require('gulp-postcss');
  var cssnext = require('postcss-cssnext');
  var atImport = require('postcss-import');

  var processors = [ atImport, cssnext ];

  return gulp.src('src/**/*.css')
    .pipe( sourcemaps.init() )
    .pipe( postcss(processors) )
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest('build/') );
});

gulp.task('pug', function () {
  var pug = require('gulp-pug');

  return gulp.src('src/**/*.pug')
    .pipe( sourcemaps.init() )
    .pipe( pug() )
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest('build/') );

});
