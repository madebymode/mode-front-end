module.exports = (function() {
  /**
   * Return the index for a given element.
   * @param  {Element}  elem
   * @return {Number}
   */
  function getIndex(elem) {
    var i = 0;

    while ((elem = elem.previousElementSibling)) {
      i++;
    }

    return i;
  }

  return getIndex;
})();
