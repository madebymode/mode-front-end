module.exports = (function() {
  /**
   * Check whether an element is visible within the viewport.
   * @param  {Element}  el
   * @return {Boolean}
   */
  function isVisible(el, offset) {
    // Defaults
    var offset = offset || 0;

    // Variables
    var rect = el.getBoundingClientRect();

    // Calculate visibility
    var hasDimensions = rect.width > 0 && rect.height > 0;
    var isInBounds = rect.top < (window.innerHeight + offset || document.documentElement.clientHeight + offset);

    return hasDimensions && isInBounds;
  }

  return isVisible;
})();
