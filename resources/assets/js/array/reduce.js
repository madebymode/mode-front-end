module.exports = (function() {
  /**
   * Use Array.prototype.reduce on array-like objects.
   * @return {Array}
   */
  function reduce() {
    var arr = arguments[0];
    var args = Array.prototype.slice.call(arguments, 1);
    return Array.prototype.reduce.apply(arr, args);
  }

  return reduce;
})();
