module.exports = (function(window, document, undefined) {

  // The only way to detect touch with JavaScript
  // https://medium.com/@david.gilbertson/the-only-way-to-detect-touch-with-javascript-7791a3346685
  var hasTouched = false;

  window.addEventListener('touchstart', function onFirstTouch() {
    hasTouched = true;
    document.body.classList.add('has-touched');
    window.removeEventListener('touchstart', onFirstTouch, false);
  }, false);

  return () => hasTouched;

})(window, document);
