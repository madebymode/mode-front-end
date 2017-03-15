var matches = require('./matches');

module.exports = (function() {
  /**
   * Get the number of nested layers between an element and its ancestor.
   * Optionally filters layers by a selector.
   * @see http://tympanus.net/codrops/2013/08/13/multi-level-push-menu/
   * @param  {Element}  el
   * @param  {Element}  ancestor
   * @param  {String}   selector
   * @param  {Number}   count
   * @return {Boolean}
   */
  function childDepth(elem, ancestor, selector, count) {
    count = count || 0;

    if (elem === ancestor) {
      return count;
    }

    // If no selector is specified, match every layer
    if (!selector) {
      count++;
    // Otherwise, only count matching layers
    } else if (matches(elem, selector)) {
      count++;
    }

    return elem.parentNode && this.childDepth(elem.parentNode, ancestor, selector, count);
  }

  return childDepth;
})();
