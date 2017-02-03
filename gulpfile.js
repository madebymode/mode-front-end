var elixir = require('laravel-elixir');
var gulp = require('gulp');

require('laravel-elixir-imagemin');
require('laravel-elixir-svgstore');
require('laravel-elixir-livereload');



// ------------------------------
// Config
// ------------------------------

var inProduction = elixir.config.production;

// CSS
// Disable media query merging from clean-css
elixir.config.css.minifier.pluginOptions.mediaMerging = false;
// https://www.npmjs.com/package/gulp-autoprefixer#api
elixir.config.css.autoprefix.options.remove = false;
// https://github.com/ai/browserslist#browserslist-
elixir.config.css.autoprefix.options.browsers = [
  '> 1%',
  'last 2 versions',
  'Firefox ESR',
  'Opera 12.1',
  'ie 8',
  'ie 9',
  'iOS >= 7'
];

// JS
// Webpack config is stored in `webpack.config.js`

// Images
elixir.config.images = {
  folder: 'img',
  outputFolder: 'img'
};
var svgSpritePath = 'public/img/svg/sprites';
var svgminPlugins = [
  { removeUnknownsAndDefaults: false },
  { removeUselessStrokeAndFill: false },
  { collapseGroups: false }
];



// ------------------------------
// Helper Tasks
// ------------------------------

require('./gulp-tasks/responsive-images');
require('./gulp-tasks/gzip');



// ------------------------------
// Build Tasks
// ------------------------------

elixir(function(mix) {
  // Sass
  mix.sass('app.scss');

  // JavaScript
  mix.webpack('app.js');

  // Images
  mix.imagemin();
  mix.responsiveImages();
  mix.svgstore('resources/assets/img/svg/global', svgSpritePath, 'global.svg', svgminPlugins);
  mix.gzip(['public/img/**/*.svg', '!public/img/**/*.svg.gz'], 'public/img/');

  // Production Tasks
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
    'public/js/*.js'
  ]);
});
