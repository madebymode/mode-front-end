module.exports = (function() {
  /**
   * Check if an object exists in an array. Useful, for example, when Array's
   * indexOf doesn't compare DOM elements correctly.
   * @param  {Object}   obj
   * @param  {Array}    arr
   * @return {Boolean}
   */
  function inArray(obj, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (obj === arr[i]) {
        return true;
      }
    }
    return false;
  }

  return inArray;
})();
