module.exports = (function() {
  function classList(elem, classes, operation) {
    if (typeof operation === 'undefined') {
      operation = 'add';
    }

    if (!Array.isArray(classes)) {
      classes = classes.split(/\s+/);
    }

    classes.forEach(function(className) {
      elem.classList[operation](className);
    });
  }

  return classList;
})();
