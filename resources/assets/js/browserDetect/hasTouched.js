module.exports = (function(window, document, undefined) {

  // TODO: Move this to a separate helper and reuse between browserDetect modules.
  /**
   * Add helper classes to document.
   * @return {Boolean}
   */
  function addClassToDocument(className) {
    return (document.documentElement.className = document.documentElement.className + ' ' + className);
  }

  // The only way to detect touch with JavaScript
  // https://medium.com/@david.gilbertson/the-only-way-to-detect-touch-with-javascript-7791a3346685
  var hasTouched = false;

  window.addEventListener('touchstart', function onFirstTouch() {
    hasTouched = true;
    addClassToDocument('has-touched');
    window.removeEventListener('touchstart', onFirstTouch, false);
  }, false);

  return () => hasTouched;

})(window, document);
