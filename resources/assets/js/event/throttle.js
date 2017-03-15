module.exports = (function() {
  /**
   * Throttle functions by a given number of milliseconds.
   * @see https://remysharp.com/2010/07/21/throttling-function-calls
   * @param  {Function}  fn
   * @param  {Number}    threshhold
   * @param  {Function}  scope
   * @return {Function}
   */
  function throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last,
      deferTimer;
    return function () {
      var context = scope || this;

      var now = +new Date,
        args = arguments;
      if (last && now < last + threshhold) {
        // hold on to it
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function () {
          last = now;
          fn.apply(context, args);
        }, threshhold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  }

  return throttle;
})();
