// TODO: Remove jQuery dependency, use Promise instead
module.exports = (function(window, document, undefined) {

  /**
   * Checks whether an adblocker is currently active (without an extra HTTP request)
   * @see https://christianheilmann.com/2015/12/25/detecting-adblock-without-an-extra-http-overhead/
   * @return {Promise}
   */
  function checkAdblocker() {
    let defer = $.Deferred();

    let test = document.createElement('div');
    test.innerHTML = '&nbsp;';
    test.className = 'adsbox';

    document.body.appendChild(test);

    window.setTimeout(() => {
      defer.resolve(test.offsetHeight === 0);
      test.remove();
    }, 100);

    return defer.promise();
  }

  return checkAdblocker;

})(window, document);
