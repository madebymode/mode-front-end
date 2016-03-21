module.exports = (function() {
  /**
   * Offset based on http://stackoverflow.com/a/18452333/176192
   * @param  {Element}  elem
   * @return {Object}
   */
  function offset(elem) {
    var docElem, win,
      box = { top: 0, left: 0 },
      doc = elem && elem.ownerDocument;

    docElem = doc.documentElement;

    if (typeof elem.getBoundingClientRect !== typeof undefined) {
      box = elem.getBoundingClientRect();
    }

    win = getWindow(doc);

    return {
      top: box.top + win.pageYOffset - docElem.clientTop,
      left: box.left + win.pageXOffset - docElem.clientLeft
    };
  }

  return offset;
})();
