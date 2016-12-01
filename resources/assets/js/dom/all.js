module.exports = (function() {
  return {
    childDepth: require('./childDepth'),
    children: require('./children'),
    classList: require('./classList'),
    closest: require('./closest'),
    index: require('./index'),
    isInBounds: require('./isInBounds'),
    matches: require('./matches'),
    offset: require('./offset'),
    outerHeight: require('./outerHeight'),
    outerWidth: require('./outerWidth'),
    parents: require('./parents'),
    position: require('./position'),
    ResizeSensor: require('./ResizeSensor'),
    window: require('./window')
  };
})();
