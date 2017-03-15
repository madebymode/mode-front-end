module.exports = (function() {
  /**
   * Is value an array?
   * Based on AngularJS's `isArray` function as documented here:
   * @see https://www.binpress.com/tutorial/angular-js-looking-under-the-hood/153
   * @param  {mixed}
   * @return {Boolean}
   */
  var isArray = (function() {
    if (typeof Array.isArray !== 'function') {
      return function(value) {
        return toString.call(value) === '[object Array]';
      };
    }
    return Array.isArray;
  })();

  return isArray;
})();
