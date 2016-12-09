module.exports = (function() {
  /**
   * Get current viewport width.
   * https://plainjs.com/javascript/styles/getting-width-and-height-of-an-element-23/
   * @return {Number}
   */
  function getWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }

  /**
   * Get current viewport height.
   * https://plainjs.com/javascript/styles/getting-width-and-height-of-an-element-23/
   * @return {Number}
   */
  function getHeight() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  }

  var width = getWidth();
  var height = getHeight();

  window.addEventListener('resize', function() {
    width = getWidth();
    height = getHeight();
  });

  return {
    width: width,
    height: height
  };
})();
