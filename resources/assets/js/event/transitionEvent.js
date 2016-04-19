var t;
var el = document.createElement('fakeelement');

var prefixedTransitionEvent = {
  start: 'transitionstart',
  end: 'transitionend',
};

var transitions = {
  'transition': { start: 'transitionstart', end: 'transitionend' },
  'OTransition': { start: 'oTransitionStart', end: 'oTransitionEnd' },
  'MozTransition': { start: 'transitionstart', end: 'transitionend' },
  'WebkitTransition': { start: 'webkitTransitionStart', end: 'webkitTransitionEnd' },
};

for (t in transitions) {
  if (el.style[t] !== undefined) {
    prefixedTransitionEvent = transitions[t];
    break;
  }
}

module.exports = function(eventName) {
  return eventName.match(/end$/i) && prefixedTransitionEvent.end || prefixedTransitionEvent.start;
};
