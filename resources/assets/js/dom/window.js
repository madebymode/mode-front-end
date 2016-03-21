module.exports = (function() {
  function isWindow(obj) {
    return obj !== null && obj === obj.window;
  }

  function getWindow(elem) {
    return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }

  /**
   * Get current viewport width.
   * https://plainjs.com/javascript/styles/getting-width-and-height-of-an-element-23/
   * @return {Number}
   */
  function windowWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }

  return {
    isWindow: isWindow,
    getWindow: getWindow,
    windowWidth: windowWidth
  };
});
