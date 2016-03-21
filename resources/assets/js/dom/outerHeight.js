module.exports = (function() {
  function outerHeight(elem) {
    var parentElem = elem.parentNode;
    var parentStyles;
    var percentages = [];
    var computedElemStyles = window.getComputedStyle(elem);

    if (elem.style.display != "none" || elem.offsetHeight > 0) {
      return elem.offsetHeight;
    }

    percentages.push(computedElemStyles.getPropertyValue("height"));

    while (true) {
      parentStyles = window.getComputedStyle(parentElem);

      var parentHeight = parentStyles.getPropertyValue("height");

      // if the parent element doesn't have a width, continue up the tree until one is found
      if (parentHeight.indexOf('%') > -1) {
        percentages.push(parentHeight);
        parentElem = parentElem.parentNode;
        continue;
      }

      // found a width... break the loop
      break;
    }

    var finalHeight = parseFloat(parentStyles.getPropertyValue("height"));
    percentages.forEach(function(percentage) {
      percentage = parseFloat(percentage);
      if (percentage < 100) {
        finalHeight -= (finalHeight * (parseFloat(percentage) / 100));
      }
    });

    return finalHeight;
  }

  return outerHeight;
})();
