// TODO: Make a non-Elixir fallback for gzip

var gulp = require('gulp');
var gzip = require('gulp-gzip');
var elixir = require('laravel-elixir');

// module.exports = function(options) {
//   return function() {
//     return gulp.src(options.src)
//       .pipe(gzip(options))
//       .pipe(gulp.dest(options.dest))
//   };
// };

/**
 * Gzip
 * @param  {String}  src
 * @param  {String}  dest
 */
elixir.extend('gzip', function(src, dest) {
  new elixir.Task('gzip', function() {
    return gulp.src(src)
      .pipe(gzip({ extension: 'gz' }))
      .pipe(gulp.dest(dest));
  }).watch(src);
});
