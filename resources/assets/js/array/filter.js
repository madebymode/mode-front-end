module.exports = (function() {
  /**
   * Use Array.prototype.filter on array-like objects.
   * @return {Array}
   */
  function filter() {
    var arr = arguments[0];
    var args = Array.prototype.slice.call(arguments, 1);
    return Array.prototype.filter.apply(arr, args);
  }

  return filter;
})();
