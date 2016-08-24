module.exports = function() {
  return {
    /**
     * Create a custom event.
     * https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
     * @param  {String}  name
     * @param  {Element} context
     * @return {Event}
     */
    create: function(name, context) {
      if (!context) { context = window; }

      var event = document.createEvent('Event');
      event.initEvent(name, true, true);
    }
  };

  // Listen
  // elem.addEventListener(name, function (e) {
  //   // e.target matches elem
  // }, false);

  // Trigger
  // elem.dispatchEvent(event);
};
