var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('css', function () {
  var postcss = require('gulp-postcss');
  var cssnext = require('postcss-cssnext');

  var processors = [ cssnext ];

  return gulp.src('src/**/*.css')
    .pipe( sourcemaps.init() )
    .pipe( postcss(processors) )
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest('build/') );
});
