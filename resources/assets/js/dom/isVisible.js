module.exports = (function() {
  /**
   * Check whether an element is visible within the viewport.
   * @param  {Element}  el
   * @return {Boolean}
   */
  function isVisible(el, offset) {
    var rect = el.getBoundingClientRect();
    var offset = offset || 0;

    return (
      rect.top < (window.innerHeight + offset || document.documentElement.clientHeight + offset)
    );
  }
})();
