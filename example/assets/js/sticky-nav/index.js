var transitionEvent = require('mode-front-end/resources/assets/js/event/transitionEvent');
var throttle = require('mode-front-end/resources/assets/js/event/throttle');

module.exports = (function(window, document, undefined) {

  var Headroom = require('headroom.js'),
      header   = document.querySelector('.c-header'),
      body     = document.querySelector('body'),
      hasPastThreshold = false;

  // If no header, return noop
  if (!header) {
    return {
      headroom: null,
      addOn: {
        el: null
      }
    };
  }

  var headroom = new Headroom(header, {
    offset: 150,
    tolerance: 3,
    onTop: switchToDefaultNav,
    onNotTop: switchToStickyNav
  });

  headroom.init();

  // Create custom events for Headroom.js to hook up header-based layout changes
  var stickyNavChangedEvent = document.createEvent('CustomEvent');
  stickyNavChangedEvent.initEvent('stickyNavChanged', true, true);

  /**
   * Transition to full nav
   * @return {void}
   */
  function switchToDefaultNav() {
    if (!hasPastThreshold) {
      return false;
    }

    var nav = this.elem;

    var transitionEnd = function(e) {
      nav.classList.remove('c-header--sticky');

      nav.classList.remove('c-header--slide-up');
      window.dispatchEvent(stickyNavChangedEvent);
    };

    setTimeout(transitionEnd, 400);
    nav.classList.add('c-header--slide-up');
    body.classList.remove('has-sticky-nav');
  }

  /**
   * Transition to essentials nav
   * @return {void}
   */
  function switchToStickyNav() {
    hasPastThreshold = true;

    var nav = this.elem;

    var transitionEnd = function(e) {
      nav.classList.add('c-header--sticky');
      body.classList.add('has-sticky-nav');

      nav.classList.remove('c-header--slide-up');
      window.dispatchEvent(stickyNavChangedEvent);
    };

    setTimeout(transitionEnd, 400);
    nav.classList.add('c-header--slide-up');
  }



  // ------------------------------
  // Header Add-ons
  // ------------------------------

  // Create custom events for Headroom.js to hook up header-based layout changes
  var headerAddOnChangedEvent = document.createEvent('CustomEvent');
  headerAddOnChangedEvent.initEvent('headerAddOnChanged', true, true);

  /**
   * Create dropdown based on toggle button's hash.
   * @param  {Element}  button
   */
  function HeaderAddOn(el) {
    if (!el) {
      return false;
    }

    this.el = el;

    // TODO: Extend default options
    this.options = JSON.parse(this.el.getAttribute('data-header-add-on')) || {
      scrollTop: null,
      scrollTopOffset: 250
    };

    this.scrollTopElement = document.querySelector(this.options.scrollTop);
    this.setScrollTop();

    this.isOpen = false;
  }

  /**
   * Get scrollTop position relative to document.
   */
  HeaderAddOn.prototype.setScrollTop = function() {
    this.scrollTop = this.options.scrollTopOffset;

    if (this.scrollTopElement) {
      this.scrollTop += (this.scrollTopElement.getBoundingClientRect().top - body.getBoundingClientRect().top);
    }
  };

  HeaderAddOn.prototype.open = function() {
    var transitionEnd = (function(e) {
      this.isOpen = true;
      window.dispatchEvent(headerAddOnChangedEvent);
      this.el.removeEventListener(transitionEvent('end'), transitionEnd);
    }).bind(this);

    this.el.addEventListener(transitionEvent('end'), transitionEnd);
    this.el.classList.add('is-active');
  };

  HeaderAddOn.prototype.close = function() {
    var transitionEnd = (function(e) {
      this.isOpen = false;
      window.dispatchEvent(headerAddOnChangedEvent);
      this.el.removeEventListener(transitionEvent('end'), transitionEnd);
    }).bind(this);

    this.el.addEventListener(transitionEvent('end'), transitionEnd);
    this.el.classList.remove('is-active');
  };

  var addOn = new HeaderAddOn(document.querySelector('.c-header__add-on'));

  /**
   * Open/close header add-on based on document scroll position.
   * @param  {Event}  e
   */
  function addOnScrollHandler(e) {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // TODO: Bottom threshold
    if (scrollTop >= addOn.scrollTop) {
      addOn.open();
      header.classList.add('has-add-on');
    } else {
      addOn.close();
      header.classList.remove('has-add-on');
    }
  }

  if (addOn.el) {
    window.addEventListener('scroll', throttle(addOnScrollHandler, 100));
    window.addEventListener('resize', throttle(addOn.setScrollTop.bind(addOn), 100));
  }



  // ------------------------------
  // Public API
  // ------------------------------

  return {
    headroom: headroom,
    addOn: addOn
  };

})(window, document);
