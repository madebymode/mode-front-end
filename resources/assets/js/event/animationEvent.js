var t;
var el = document.createElement('fakeelement');

var prefixedAnimationEvent = {
  start: 'animationstart',
  end: 'animationend',
};

var animations = {
  'animation': { start: 'animationstart', end: 'animationend' },
  'OAnimation': { start: 'oAnimationStart', end: 'oAnimationEnd' },
  'MozAnimation': { start: 'animationstart', end: 'animationend' },
  'WebkitAnimation': { start: 'webkitAnimationStart', end: 'webkitAnimationEnd' },
};

for (t in animations) {
  if (el.style[t] !== undefined) {
    prefixedAnimationEvent = animations[t];
    break;
  }
}

module.exports = function(eventName) {
  return eventName.match(/end$/i) && prefixedAnimationEvent.end || prefixedAnimationEvent.start;
};
