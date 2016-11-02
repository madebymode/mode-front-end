module.exports = (function() {
  /**
   * Extend a JavaScript object
   * https://plainjs.com/javascript/utilities/merge-two-javascript-objects-19/
   * @param  {Object} obj
   * @param  {Object} src
   * @return {Object}
   */
  function extend(obj, src) {
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        obj[key] = src[key];
      }
    }

    return obj;
  }

  return extend;
})();
