module.exports = (function(window, document) {

  /**
   * Returns the version of Chrome or a -1 (indicating the use of another browser).
   * @see https://stackoverflow.com/a/4900484/1786459
   * @return {Number}
   */
  function getVersion() {
    var version = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);

    return version ? parseInt(version[2], 10) : -1;
  }

  return {
    version: getVersion
  };

})(window, document);
