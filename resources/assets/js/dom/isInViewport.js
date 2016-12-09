var getWindow = require('./window');

module.exports = (function() {
  /**
   * Check whether an element is inside the viewport.
   *
   * Based on `isElementInViewport`: http://stackoverflow.com/a/7557433/1786459
   *
   * @param  {Element}  el
   * @return {Boolean}
   */
  function isInViewport(el) {
    if (typeof jQuery === 'function' && el instanceof jQuery) {
      el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= getWindow.height() &&
      rect.right <= getWindow.width()
    );
  }

  return isInViewport;
})();
