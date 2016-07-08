// TODO: Move to mode-front-end
module.exports = (function(window, document) {

  /**
   * Returns the version of Internet Explorer or a -1 (indicating the use of
   * another browser).
   *
   * Based on:
   * - http://stackoverflow.com/a/17907562/1786459
   * - https://msdn.microsoft.com/en-us/library/ms537509(v=vs.85).aspx#ParsingUA
   *
   * @return {Number}
   */
  function getVersion() {
    var ieVersion = -1,
      ieRegex;

    if (navigator.appName === 'Microsoft Internet Explorer') {
      ieRegex = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    } else if (navigator.appName === 'Netscape') {
      ieRegex = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
    }

    if (ieRegex && ieRegex.exec(navigator.userAgent) !== null) {
      ieVersion = parseFloat(RegExp.$1);
    }

    return ieVersion;
  }

  /**
   * Is browser version less than IE 11?
   * @return {Boolean}
   */
  function isLessThanIE11() {
    var version = getVersion();

    return version >= 0 && version < 11.0;
  }

  /**
   * Add helper classes to document.
   * @return {void}
   */
  function addClassesToDocument() {
    var activeClass = 'ie-lt-11';

    if (isLessThanIE11()) {
      document.documentElement.className = document.documentElement.className + ' ' + activeClass;
    }
  }

  window.addEventListener('DOMContentLoaded', addClassesToDocument);

  return {
    version: getVersion,
    isLessThan11: isLessThanIE11
  };

})(window, document);
