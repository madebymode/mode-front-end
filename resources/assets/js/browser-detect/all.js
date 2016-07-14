module.exports = (function() {
  return {
    fontFeatures: require('./font-features'),
    internetExplorer: require('./internet-explorer'),
    ios: require('./ios')
  };
})();
