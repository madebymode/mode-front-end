module.exports = (function() {
  function matches(elem, selector) {
    if (!selector || !elem || elem.nodeType !== 1) {
      return false;
    }

    var matchesSelector = elem.webkitMatchesSelector ||
      elem.mozMatchesSelector ||
      elem.oMatchesSelector ||
      elem.msMatchesSelector ||
      elem.matchesSelector;

    if (matchesSelector) {
      return matchesSelector.call(elem, selector);
    }

    return false;
  }

  return matches;
})();
