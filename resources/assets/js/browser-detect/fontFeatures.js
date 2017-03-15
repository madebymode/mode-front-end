var internetExplorer = require('./internetExplorer');

// TODO: Move to mode-front-end
module.exports = (function(window, document) {

  /**
   * Return CSS supports API. Otherwise, return falsy function.
   * @see https://github.com/Modernizr/Modernizr/blob/74655c45ad2cd05c002e4802cdd74cba70310f08/feature-detects/css/supports.js
   * @see http://caniuse.com/#feat=css-supports-api
   * @return {Function}
   */
  function supports() {
    // New Syntax
    if ('CSS' in window && 'supports' in window.CSS) {
      return CSS.supports.apply(CSS, arguments);
    // Old Syntax
    } else if ('supportsCSS' in window) {
      return supportsCSS.apply(window, arguments);
    }

    return false;
  }

  /**
   * Determine whether the browser supports OpenType Features (e.g., small
   * caps). Adds a helper class to the document.
   * @see http://caniuse.com/#feat=font-feature
   * @return {Boolean}
   */
  function supportsFontFeatures() {
    // HACK: Exit to avoid erroring out in PhantomJS
    if (/PhantomJS/.test(window.navigator.userAgent)) {
      return false;
    }

    var activeClass = 'supports-font-features';

    // Check CSS.supports for `font-feature-settings`
    // Make an exception for IE+ since they don't support `supports` (HA!)
    var supportsFontFeatures =
      supports("(font-feature-settings: 'smcp')") ||
      (internetExplorer.version() >= 10.0);

    // Note: Webkit prefixed version seems unstable. Several Android devices
    // are incorrectly showing lowercase letters instead of small-caps. Best
    // solution is to only support stable, non-prefixed font-feature-settings.
    // `supports("(-webkit-font-feature-settings: 'smcp')")`

    if (supportsFontFeatures) {
      // console.log('Small caps');
      document.documentElement.className = document.documentElement.className + ' ' + activeClass;
    } else {
      // console.log('No small caps');
    }
  }

  window.addEventListener('DOMContentLoaded', supportsFontFeatures);

  return supportsFontFeatures;

})(window, document);
