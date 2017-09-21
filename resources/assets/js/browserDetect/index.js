module.exports = (function() {
  return {
    chrome: require('./chrome'),
    fontFeatures: require('./fontFeatures'),
    hasTouched: require('./hasTouched'),
    internetExplorer: require('./internetExplorer'),
    ios: require('./ios')
  };
})();
