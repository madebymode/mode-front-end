module.exports = (function() {
  /**
   * Run a function after the current stack is cleared.
   * @param  {Function}  fn
   * @return {void}
   */
  function clearStack(fn) {
    setTimeout(function() {
      if (typeof fn === 'function') {
        fn.apply(null, Array.prototype.slice.call(arguments, 2));
      }
    }, 0);
  }

  return clearStack;
})();
