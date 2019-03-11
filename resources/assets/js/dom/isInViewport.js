var getWindow = require('./window');

module.exports = (function() {
  /**
   * Check whether an element is inside the viewport. By default, checks
   * whether the whole element is in the viewport. Optionally checks whether
   * element is partially in the viewport.
   * @see https://stackoverflow.com/a/7557433/1786459
   * @param  {Element}  el
   * @return {Boolean}
   */
  function isInViewport(el, allowPartial) {
    if (typeof jQuery === 'function' && el instanceof jQuery) {
      el = el[0];
    }
    if (!el) {
      return false;
    }

    var rect = el.getBoundingClientRect();
    var width = getWindow.width();
    var height = getWindow.height();

    if (allowPartial) {
      var outsideOfVerticalBounds = (
        (rect.top >= height && rect.bottom >= height) ||
        (rect.top <= 0 && rect.bottom <= 0)
      );
      var outsideOfHorizontalBounds = (
        (rect.left >= width && rect.right >= width) ||
        (rect.left <= 0 && rect.right <= 0)
      );

      return !(outsideOfVerticalBounds || outsideOfHorizontalBounds);
    }

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= getWindow.height() &&
      rect.right <= getWindow.width()
    );
  }

  return isInViewport;
})();
