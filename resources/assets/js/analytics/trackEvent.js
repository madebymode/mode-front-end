var extend = require('../object/extend');

module.exports = (function(window, document, undefined) {

  /**
   * Helper for tracking Google Analytics events through Google Tag Manager.
   * @param  {Object}    params
   * @return {Function}
   */
  function TrackEvent(params) {
    this.debug = params.debug || false;

    // Combine new params with event defaults
    this.event = extend({
      'event'               : 'GAEvent',
      'eventCategory'       : null,
      'eventAction'         : null,
      'eventLabel'          : null,
      'eventValue'          : 0,
      'eventNonInteraction' : false
    }, params);
  }

  /**
   * Helper for tracking Google Analytics events through Google Tag Manager.
   * @param  {Object}  params
   * @return {void}
   */
  TrackEvent.prototype.fire = function(params) {
    var event = extend(this.event, params);

    if (this.debug) {
      console.log(event);
      return false;
    }

    // Only trigger event if GTM has loaded
    if (typeof dataLayer !== 'undefined' && typeof dataLayer.push === 'function') {
      dataLayer.push(event);
    }
  };

  /**
   * Helper to scope TrackEvent params and return `fire` method
   * @param  {Object}    params
   * @return {Function}
   */
  function getTrackEvent(params) {
    var trackEvent = new TrackEvent(params);

    return trackEvent.fire.bind(trackEvent);
  }

  return {
    create: getTrackEvent
  };

})(window, document);
