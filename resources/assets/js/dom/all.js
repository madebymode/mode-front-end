module.exports = (function() {
  return {
    childDepth: require('./childDepth'),
    children: require('./children'),
    closest: require('./closest'),
    index: require('./index'),
    isElementInBounds: require('./isElementInBounds'),
    matches: require('./matches'),
    offset: require('./offset'),
    outerHeight: require('./outerHeight'),
    outerWidth: require('./outerWidth'),
    parents: require('./parents'),
    position: require('./position'),
    window: require('./window')
  };
})();
