module.exports = (function() {
  function outerWidth(elem) {
    var parentElem = elem.parentNode;
    var parentStyles;
    var widthPercentages = [];
    var computedElemStyles = window.getComputedStyle(elem);

    if (elem.style.display != "none" || elem.offsetWidth > 0) {
      return elem.offsetWidth;
    }

    widthPercentages.push(computedElemStyles.getPropertyValue("width"));

    while (true) {
      parentStyles = window.getComputedStyle(parentElem);

      var parentWidth = parentStyles.getPropertyValue("width");

      // if the parent element doesn't have a width, continue up the tree until one is found
      if (parentWidth.indexOf('%') > -1) {
        widthPercentages.push(parentWidth);
        parentElem = parentElem.parentNode;
        continue;
      }

      // found a width... break the loop
      break;
    }

    var finalWidth = parseFloat(parentStyles.getPropertyValue("width"));
    widthPercentages.forEach(function(percentage) {
      percentage = parseFloat(percentage);
      if (percentage < 100) {
        finalWidth -= (finalWidth * (parseFloat(percentage) / 100));
      }
    });

    return finalWidth;
  }

  return outerWidth;
})();
