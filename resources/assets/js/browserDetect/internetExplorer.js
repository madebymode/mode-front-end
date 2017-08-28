module.exports = (function(window, document) {

  /**
   * Returns the version of Internet Explorer or a -1 (indicating the use of another browser).
   * @see http://stackoverflow.com/a/17907562/1786459
   * @see https://msdn.microsoft.com/en-us/library/ms537509(v=vs.85).aspx#ParsingUA
   * @return {Number}
   */
  function getVersion() {
    let ieVersion = -1,
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
    let version = getVersion();

    return version >= 0 && version < 11.0;
  }

  /**
   * Add helper classes to document.
   * @return {Boolean}
   */
  function addClassToDocument(className) {
    return (document.documentElement.className = document.documentElement.className + ' ' + className);
  }

  /**
   * Update document classes based on browser version.
   * @return {Boolean}
   */
  function updateDocumentClasses() {
    let version = getVersion();

    // Return false for non-IE browsers
    if (version < 0) {
      return false;
    }

    addClassToDocument('ie');

    if (version < 11.0) {
      addClassToDocument('ie-lt-11');
    }
    if (version < 10.0) {
      addClassToDocument('ie-lt-10');
    }
  }

  window.addEventListener('DOMContentLoaded', updateDocumentClasses);

  return {
    version: getVersion,
    isLessThan11: isLessThanIE11
  };

})(window, document);
