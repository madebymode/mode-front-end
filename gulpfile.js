/**
 * Dependencies
 */
var elixir = require('laravel-elixir');
var gulp = require('gulp');
var path = require('path');
var responsive = require('gulp-responsive');
require('laravel-elixir-imagemin');
require('laravel-elixir-livereload');

/**
 * Config
 */
var inProduction = elixir.config.production;

elixir.config.images = {
  folder: 'img',
  outputFolder: 'img'
};

/**
 * Responsive Images
 */
elixir.extend('responsiveImgs', function() {
  var config = elixir.config;
  var src = [
    'public/img/**/*.jpg',
    '!public/img/**/*@27.jpg',
    '!public/img/**/*@half.jpg'
  ];

  new elixir.Task('responsive-imgs', function() {
    return gulp.src(src)
      .pipe(responsive({
        '**/*.jpg': [{
          width: '50%',
          rename: { suffix: '@half' }
        }, {
          width: 27,
          rename: { suffix: '@27' }
        }]
      }))
      .pipe(gulp.dest('public/img'))
      .pipe(new elixir.Notification('Responsive images created'));
  }).watch(src);
});

/**
 * Browserify
 */
elixir.config.js.browserify.transformers.push({
  name: 'browserify-shim',
  options: {}
});

/**
 * Elixir Build
 */
elixir(function(mix) {
  mix.sass('app.scss');
  mix.browserify('app.js');

  mix.imagemin();
  mix.responsiveImgs();

  if (inProduction) {
    mix.version([
      'css/app.css',
      'js/app.js',
    ]);
  }

  mix.livereload([
    'resources/views/**/*.php',
    'resources/lang/**/*.php',
    'public/css/*.css',
    '!public/css/*.build.css',
    'public/js/*.js',
    '!public/js/*.build.js',
  ]);
});
