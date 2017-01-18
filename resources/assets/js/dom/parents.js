var matches = require('./matches');

module.exports = (function() {
  /**
   * Return all parents of an element that match a given selector.
   * @param  {Element}  elem
   * @param  {String}   selector
   * @return {Array}
   */
  function parents(elem, selector) {
    var first = true,
      result = [];

    while (elem.nodeType === 1) {
      if (!first && matches(elem, selector)) {
        result.push(elem);
      }
      first = false;
      elem = elem.parentNode;
    }

    return result;
  }

  return parents;
})();
