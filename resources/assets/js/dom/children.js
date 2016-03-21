function getAttrIdentifier() {
  return 'dom-' + (new Date()).getTime();
}

module.exports = (function() {
  /**
   * Return the first level children for an element.
   */
  function children(elem, selector) {
    if (!selector) {
      return elem.children;
    }

    var randAttr = getAttrIdentifier();
    elem.setAttribute(randAttr, '');

    var nodes = elem.parentNode.querySelectorAll('[' + randAttr + '] ' + selector);
    elem.removeAttribute(randAttr);

    return nodes;
  }

  return children;
})();
