// TODO: Move to mode-front-end
module.exports = (function(window, document) {

  /**
   * Returns iOS device, otherwise null.
   * @see http://stackoverflow.com/a/9039885/1786459
   * @return {String}
   */
  function getDevice() {
    if (window.MSStream) {
      return null;
    }

    if (/iPad/.test(navigator.userAgent)) {
      return 'ipad';
    } else if (/iPhone/.test(navigator.userAgent)) {
      return 'iphone';
    } else if (/iPod/.test(navigator.userAgent)) {
      return 'ipod';
    }

    return null;
  }

  /**
   * Returns whether device is iOS.
   * @return {String}
   */
  function isIOS() {
    return !!getDevice();
  }

  /**
   * Is browser version less than IE 11?
   * @return {void}
   */
  function addClassesToDocument() {
    var activeClass = 'ios ' + getDevice();

    if (isIOS()) {
      document.documentElement.className = document.documentElement.className + ' ' + activeClass;
    }
  }

  window.addEventListener('DOMContentLoaded', addClassesToDocument);

  return {
    device: getDevice,
    is: isIOS
  };

})(window, document);
