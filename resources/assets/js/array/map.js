module.exports = (function() {
  /**
   * Use Array.prototype.map on array-like objects.
   * @return {Array}
   */
  function map() {
    var arr = arguments[0];
    var args = Array.prototype.slice.call(arguments, 1);
    return Array.prototype.map.apply(arr, args);
  }

  return map;
})();
