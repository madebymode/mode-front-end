module.exports = (function() {
  /**
   * Get current viewport width.
   * https://plainjs.com/javascript/styles/getting-width-and-height-of-an-element-23/
   * @return {Number}
   */
  function windowWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }

  return {
    windowWidth: windowWidth
  };
});
