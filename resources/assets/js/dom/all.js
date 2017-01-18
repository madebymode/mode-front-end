module.exports = (function() {
  return {
    childDepth: require('./childDepth'),
    children: require('./children'),
    classList: require('./classList'),
    closest: require('./closest'),
    getIndex: require('./getIndex'),
    isInBounds: require('./isInBounds'),
    isInViewport: require('./isInViewport'),
    isVisible: require('./isVisible'),
    matches: require('./matches'),
    offset: require('./offset'),
    outerHeight: require('./outerHeight'),
    outerWidth: require('./outerWidth'),
    parents: require('./parents'),
    position: require('./position'),
    ResizeSensor: require('./ResizeSensor'),
    Visibility: require('./Visibility'),
    window: require('./window')
  };
})();
