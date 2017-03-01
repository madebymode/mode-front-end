var transitionEvent = require('../event/transitionEvent');

module.exports = (function() {
  /**
   * Slide an element up like jQuery's slideUp function using CSS3 transitions.
   * @see https://gist.github.com/ludder/4226288
   * @param  {element}  el
   * @param  {string}   timing
   * @return {void}
   */
  function slideUp(el, timing) {
    timing = timing || '300ms ease';

    // Get element height
    el.style.webkitTransition = 'initial';
    el.style.transition = 'initial';
    var height = el.offsetHeight + 'px';
    el.style.maxHeight = height;
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
      el.style.maxHeight = '0';
      el.style.opacity = '0';
    });
  }

  return slideUp;
})();
