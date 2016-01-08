/**
 * Dependencies
 */
var gulp = require('gulp');
var elixir = require('laravel-elixir');
require('laravel-elixir-imagemin');
require('laravel-elixir-livereload');
var responsive = require('gulp-responsive');

/**
 * Config
 */
var inProduction = elixir.config.production;

// CSS
// Disable media query merging from clean-css
// https://github.com/jakubpawlowicz/clean-css/blob/626480c057ddf13bc0b0135e9a12eeb975c17be3/README.md#how-to-use-clean-css-api
elixir.config.css.cssnano.pluginOptions = {
  "mediaMerging": false
};

// JS
elixir.config.js.browserify.transformers.push({
  name: 'browserify-shim',
  options: {}
});

// Images
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
 * Elixir Build
 */
elixir(function(mix) {
  mix.sass('example.scss');

  mix.browserify('app.js');

  mix.imagemin();
  mix.responsiveImgs();

  if (inProduction) {
    mix.version([
      'css/example.css',
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
