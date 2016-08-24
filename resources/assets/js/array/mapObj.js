module.exports = (function() {

  function mapObj(obj, callback) {
    // Make sure callback is a function
    if (typeof callback !== 'function') {
      return null;
    }

    var result = [];

    // Loop through object properties
    for (var prop in obj) {
        if (!obj.hasOwnProperty(prop)) {
          continue;
        }

        // Pass prop to callback; Add to result
        result.push(callback(obj[prop]));
    }

    return result;
  }

  return mapObj;
})();
