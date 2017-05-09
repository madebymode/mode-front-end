// Based on answer to "Listening for Youtube Event in JavaScript"
// @see http://stackoverflow.com/a/7988536/1786459
module.exports = (function(window, document, undefined) {

  // Define YT_ready function.
  var YT_ready = (function() {
    var onReady_funcs = [],
      api_isReady = false;

    /**
     * Add functions to call stack for when YouTube API is ready. If API is
     * ready, then go ahead and call the function.
     * @param  {Function||Boolean}  func      Function to execute on ready
     * @param  {Boolean}            b_before  If true, all qeued functions are executed
     * @return {Boolean}                      If true, the func will added to the first position in the queue
     */
    return function(func, b_before) {
      if (func === true) {
        api_isReady = true;

        while (onReady_funcs.length) {
          // Removes the first func from the array, and execute func
          onReady_funcs.shift()();
        }
      } else if (typeof func == 'function') {
        if (api_isReady) {
          func();
        } else {
          onReady_funcs[b_before ? 'unshift' : 'push'](func);
        }
      }
    };
  })();

  // function onYouTubePlayerAPIReady() {
  window.onYouTubeIframeAPIReady = function() {
    YT_ready(true);
  };

  // Load YouTube Frame API
  (function() { // Closure, to not leak to the scope
    var s = document.createElement('script');
    s.src = 'https://www.youtube.com/iframe_api';
    var before = document.getElementsByTagName('script')[0];
    before.parentNode.insertBefore(s, before);
  })();

  return YT_ready;

})(window, document);
