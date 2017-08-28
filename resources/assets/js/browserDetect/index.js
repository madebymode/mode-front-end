module.exports = (function() {
  return {
    chrome: require('./chrome'),
    fontFeatures: require('./fontFeatures'),
    internetExplorer: require('./internetExplorer'),
    ios: require('./ios')
  };
})();
