var isInViewport = require('./isInViewport');

module.exports = (function() {
  /**
   * Check whether an element is visible within the viewport.
   * @param  {Element}  el
   * @return {Boolean}
   */
  function isVisible(el) {
    if (typeof jQuery === 'function' && el instanceof jQuery) {
      el = el[0];
    }

    var rect = el.getBoundingClientRect();
    var hasDimensions = rect.width > 0 && rect.height > 0;

    return hasDimensions && isInViewport(el);
  }

  return isVisible;
})();
