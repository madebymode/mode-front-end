// Shims + Polyfills
require('svg4everybody')();

// Responsive images
document.createElement('picture');
require('picturefill');

// Lazy loading + `object-fit` polyfill
// https://github.com/aFarkas/lazysizes/tree/gh-pages/plugins/object-fit
require('lazysizes/plugins/object-fit/ls.object-fit');
require('lazysizes/plugins/parent-fit/ls.parent-fit');
require('lazysizes/plugins/respimg/ls.respimg');
require('lazysizes');

// Browser Detects
require('mode-front-end/resources/assets/js/browser-detect/internet-explorer');
require('mode-front-end/resources/assets/js/browser-detect/ios');
require('mode-front-end/resources/assets/js/browser-detect/font-features');

// Video
const video = require('mode-front-end/resources/assets/js/video');
video.player.init();
