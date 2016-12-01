module.exports = (function() {
  /**
   * Check whether an element is inside the visible bounds of another element.
   *
   * Based on `isElementInViewport`: http://stackoverflow.com/a/7557433/1786459
   *
   * @param  {Element}  el
   * @param  {Element}  parent
   * @return {Boolean}
   */
  function isInBounds(el, parent) {
    if (typeof jQuery === 'function') {
      if (el instanceof jQuery) {
        el = el[0];
      }
      if (parent instanceof jQuery) {
        parent = parent[0];
      }
    }

    // TODO: If parent is window
    var elRect = el.getBoundingClientRect(),
      parentRect = parent.getBoundingClientRect();

    return (
      elRect.top >= parentRect.top &&
      elRect.left >= parentRect.left &&
      elRect.bottom <= parentRect.bottom &&
      elRect.right <= parentRect.right
    );
  }

  return isInBounds;
})();
