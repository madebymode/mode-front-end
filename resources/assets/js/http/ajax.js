module.exports = (function() {

  /**
   * Send Ajax GET request. Equivalent to jQuery's `$.get()`.
   * @see  https://plainjs.com/javascript/ajax/send-ajax-get-and-post-requests-47/
   * @note The `url` argument must contain the full request path including all
   *     GET parameters.
   * @param  {string}    url
   * @param  {function}  callback
   * @return {xhr}
   */
  function getAjax(url, callback) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
      if (xhr.readyState > 3 && xhr.status === 200) {
        callback(xhr.responseText);
      }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();

    return xhr;
  }

  /**
   * Send Ajax POST request. Equivalent to jQuery's `$.post()`.
   * @see  https://plainjs.com/javascript/ajax/send-ajax-get-and-post-requests-47/
   * @param  {string}         url
   * @param  {string|object}  data
   * @param  {function}       callback
   * @return {xhr}
   */
  function postAjax(url, data, callback) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
        function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
      ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
      if (xhr.readyState>3 && xhr.status==200) { callback(xhr.responseText); }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);

    return xhr;
  }



  // ------------------------------
  // Public
  // ------------------------------

  return {
    get: getAjax,
    post: postAjax
  };

})();
