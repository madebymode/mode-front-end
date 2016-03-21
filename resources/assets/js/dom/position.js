module.exports = (function() {
  function position(elem) {
    var xPosition = 0;
    var yPosition = 0;

    while(elem) {
      xPosition += (elem.offsetLeft - elem.scrollLeft + elem.clientLeft);
      yPosition += (elem.offsetTop - elem.scrollTop + elem.clientTop);
      elem = elem.offsetParent;
    }

    return {
      x: xPosition,
      y: yPosition
    };
  }

  return position;
})();
