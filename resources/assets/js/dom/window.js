module.exports = (function() {
  /**
   * Get current viewport width.
   * https://plainjs.com/javascript/styles/getting-width-and-height-of-an-element-23/
   * @return {Number}
   */
  function width() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }

  /**
   * Get current viewport height.
   * https://plainjs.com/javascript/styles/getting-width-and-height-of-an-element-23/
   * @return {Number}
   */
  function height() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  }

  return {
    width: width,
    height: height
  };
})();
