var matches = require('./matches');

module.exports = (function() {
  /**
   * Return the first parent of an element that matches a given selector.
   * @param  {Element}  elem
   * @param  {String}   selector
   * @return {Element}
   */
  function closest(elem, selector) {
    while (elem && !matches(elem, selector)) {
      elem = elem.parentNode;
    }

    return elem || null;
  }

  return closest;
})();
