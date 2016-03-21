module.exports = (function() {
  function parents(elem, selector) {
    var first = true,
      result = [];

    while (elem.nodeType === 1) {
      if (!first && this.matches(elem, selector)) {
        result.push(elem);
      }
      first = false;
      elem = elem.parentNode;
    }

    return result;
  }

  return parents;
})();
