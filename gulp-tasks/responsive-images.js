// TODO: Make a non-Elixir fallback for responsive-images
// TODO: Make settings configurable

// TODO: Fix deprecation warnings
// (node:78647) DeprecationWarning: quality: use jpeg({ quality: ... }), webp({ quality: ... }) and/or tiff({ quality: ... }) instead
// (node:78647) DeprecationWarning: progressive: use jpeg({ progressive: ... }) and/or png({ progressive: ... }) instead
// (node:78647) DeprecationWarning: withoutChromaSubsampling: use jpeg({ chromaSubsampling: "4:4:4" }) instead
// (node:78647) DeprecationWarning: compressionLevel: use png({ compressionLevel: ... }) instead

var gulp = require('gulp');
var responsive = require('gulp-responsive');
var elixir = require('laravel-elixir');

/**
 * Responsive Images
 */
elixir.extend('responsiveImages', function() {
  // Note: Exclude images ending in `@*.jpg`
  var src = [
    'public/img/**/**/*.{jpg,png}',
    '!public/img/**/**/*@*.{jpg,png}'
  ];
  var dest = 'public/img/';

  new elixir.Task('responsive-images', function() {
    return gulp.src(src)
      .pipe(responsive({
        // Full-width images
        '**/*.{jpg,png}': [
          { width: 1200, rename: { suffix: '@1200' } },
          { width: 1000, rename: { suffix: '@1000' } },
          { width: 800, rename: { suffix: '@800' } },
          { width: 600, rename: { suffix: '@600' } },
          { width: 400, rename: { suffix: '@400' } },
          // Lazy-load placeholders
          { width: 27, rename: { suffix: '@27' } }
        ]
      // Global Settings
      }, {
        errorOnUnusedImage: false,
        errorOnEnlargement: false,
        progressive: true,
        quality: 70,
        silent: false,
        stats: true
      }))
      .pipe(gulp.dest(dest))
      .pipe(new elixir.Notification('Responsive images created'));
  });
  // Note: Watching these images gets pretty heavy. Better to leave as separate build step instead of constant updates.
  // }).watch(src);
});
