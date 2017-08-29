module.exports = (function(window, document, undefined) {
  /**
   * Plain JavaScript event delegation. Add a handler for whenever an element's
   * children trigger a specified event.
   * @see http://bdadam.com/blog/plain-javascript-event-delegation.html
   * @param  {String}    parentSelector
   * @param  {String}    eventName
   * @param  {String}    childSelector
   * @param  {Function}  fn
   * @return {Boolean}
   */
  function on(parentSelector, eventName, childSelector, fn) {
    let parent = document.querySelector(parentSelector);

    if (!parent) {
      return false;
    }

    parent.addEventListener(eventName, function(event) {
      let possibleTargets = parent.querySelectorAll(childSelector);
      let target = event.target;

      for (let i = 0, l = possibleTargets.length; i < l; i++) {
        let el = target;
        let p = possibleTargets[i];

        while (el && el !== parent) {
          if (el === p) {
            return fn.call(p, event);
          }

          el = el.parentNode;
        }
      }
    });

    return true;
  }

  // Example:
  // on('body', 'click', '.product', function(e) {
  //   console.log(e.target);
  // });

  return on;
})(window, document);
