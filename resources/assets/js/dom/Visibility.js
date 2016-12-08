var isVisible = require('./isVisible');

module.exports = (function(window, document, undefined) {
  'use strict';

  if (!window.requestAnimationFrame || !document.documentElement.classList) {
    return false;
  }

  // TODO: Do we need a configurable 'enabled' class?
  // document.documentElement.classList.add('js-visibility-enabled');

  /**
   * Apply callback to elements as they scroll into view.
   * @param {NodeList}  elements
   * @param {Function}  callback
   */
  function Visibility(elements, callback) {
    this.remaining = elements;
    this.callback = callback;
    this.loop.call(this);
  }

  /**
   * Keep looking for visible elements.
   * @return {void}
   */
  Visibility.prototype.loop = function() {
    this.remaining = this.check(this.remaining);

    if (this.remaining.length > 0) {
      requestAnimationFrame(this.loop.bind(this));
    }
  };

  /**
   * Apply callback to visible elements. Return remaining elements.
   * @param  {NodeList}
   * @return {NodeList}
   */
  Visibility.prototype.check = function(elements) {
    var remaining = [];

    for (var i = 0; i < elements.length; i++) {
      if (isVisible(elements[i])) {
        this.callback(elements[i]);
      } else {
        remaining.push(elements[i]);
      }
    }

    return remaining;
  };

  return Visibility;

})(window, document);
