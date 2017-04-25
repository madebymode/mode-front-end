module.exports = (function(undefined) {
  /**
   * Get YouTube ID. Taken from https://gist.github.com/takien/4077195
   * Consider using https://github.com/jmorrell/get-youtube-id/blob/master/index.js
   * @param  {String}  url
   * @return {String}
   */
  function getYouTubeId(url) {
    var id = '';
    url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

    if (url[2] !== undefined) {
      id = url[2].split(/[^0-9a-z_\-]/i);
      id = id[0];
    } else {
      id = url;
    }

    return id;
  }

  return getYouTubeId;
})();
