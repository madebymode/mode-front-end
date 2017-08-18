var transitionEvent = require('../event/transitionEvent');

module.exports = (function() {
  /**
   * Slide an element down like jQuery's slideDown function using CSS3 transitions.
   * @see https://gist.github.com/ludder/4226288
   * @param  {element}  el
   * @param  {string}   timing
   * @return {void}
   */
  function slideDown(el, timing) {
    timing = timing || '300ms ease';

    // Get element height
    el.style.webkitTransition = 'initial';
    el.style.transition = 'initial';
    el.style.visibility = 'hidden';
    el.style.maxHeight = 'initial';
    var height = (el.offsetHeight || el.scrollHeight) + 'px';
    el.style.removeProperty('visibility');
    el.style.maxHeight = '0';
    el.style.overflow = 'hidden';

    // Begin transition
    el.style.webkitTransition = 'max-height ' + timing + ', opacity ' + timing + '';
    el.style.transition = 'max-height ' + timing + ', opacity ' + timing + '';
    var endSlideDown = function() {
      el.style.removeProperty('-webkit-transition');
      el.style.removeProperty('transition');
      el.removeEventListener(transitionEvent('end'), endSlideDown);
    };
    requestAnimationFrame(function() {
      el.addEventListener(transitionEvent('end'), endSlideDown);
      el.style.maxHeight = height;
      el.style.opacity = '1';
    });
  }

  return slideDown;
})();
