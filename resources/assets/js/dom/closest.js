module.exports = (function() {
  function closest(elem, selector) {
    while (elem && !this.matches(elem, selector)) {
      elem = elem.parentNode;
    }

    return elem || null;
  }

  return closest;
})();
