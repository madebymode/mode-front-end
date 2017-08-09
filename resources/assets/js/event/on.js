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
  let element = document.querySelector(parentSelector);

  if (!element) {
    return false;
  }

  element.addEventListener(eventName, function(event) {
    let possibleTargets = element.querySelectorAll(childSelector);
    let target = event.target;

    for (let i = 0, l = possibleTargets.length; i < l; i++) {
      let el = target;
      let p = possibleTargets[i];

      while (el && el !== element) {
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
