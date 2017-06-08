/**
 * Custom select dropdowns.
 *
 * Based on selectFx.js v1.0.0
 * https://github.com/codrops/SelectInspiration/blob/4c972bee068319227dbaa27139c66369eb163954/js/selectFx.js
 *
 * ## Sass
 *
 * ```scss
 * @include c-select();
 * ```
 *
 * ## JavaScript
 *
 * ```js
 * const Select = require('mode-front-end/resources/assets/js/form/select');
 * new Select(document.querySelectorAll('.c-select'));
 * ```
 *
 * ## Markup
 *
 * ```html
 * <select class="c-select" name="select" required>
 *   <option value="" disabled selected>
 *     Placeholder
 *   </option>
 *   <optgroup label="Option Group">
 *     <option value="1">Option #1</option>
 *     <option value="2">Option #2</option>
 *     <option value="3">Option #3</option>
 *   </optgroup>
 * </select>
 * ```
 */
module.exports = (function(window, document, undefined) {
  'use strict';

  // Custom change event for selects to trigger changes
  var changeEvent = document.createEvent('CustomEvent');
  changeEvent.initEvent('change', true, true);

  /**
   * Based on https://github.com/inuyaksa/jquery.nicescroll/blob/master/jquery.nicescroll.js
   */
  function hasParent(e, p) {
    if (!e) {
      return false;
    }
    var el = e.target || e.srcElement || e || false;

    while (el && el !== p) {
      el = el.parentNode || false;
    }

    return (el !== false);
  }

  /**
   * Extend obj function
   */
  function extend(a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }

    return a;
  }

  /**
   * Select function
   */
  function Select(el, options) {
    this.el = el;
    this.options = extend({}, this.options);
    extend(this.options, options);
    this._init();
  }

  /**
   * Select options
   */
  Select.prototype.options = {
    // if true all the links will open in a new tab.
    // if we want to be redirected when we click an option, we need to define a data-link attr on the option of the native select element
    newTab: true,
    // when opening the select element, the default placeholder (if any) is shown
    stickyPlaceholder: true,
    // callback when changing the value
    onChange: function(val) {
      return false;
    }
  };

  /**
   * init function
   * initialize and cache some vars
   */
  Select.prototype._init = function() {
    // check if we are using a placeholder for the native select box
    // we assume the placeholder is disabled and selected by default
    var selectedOpt = this.el.querySelector('option[selected]');
    this.hasDefaultPlaceholder = selectedOpt && selectedOpt.disabled;

    // get selected option (either the first option with attr selected or just the first option)
    this.selectedOpt = selectedOpt || this.el.querySelector('option');

    // create structure
    this._createSelectEl();
    // all options
    this.selOpts = [].slice.call(this.selEl.querySelectorAll('li[data-option]'));
    // total options
    this.selOptsCount = this.selOpts.length;
    // current index
    this.current = this.selOpts.indexOf(this.selEl.querySelector('.is-selected')) || -1;
    // placeholder elem
    this.selPlaceholder = this.selEl.querySelector('.c-select__placeholder');
    // init events
    this._initEvents();
  };

  /**
   * creates the structure for the select element
   */
  Select.prototype._createSelectEl = function() {
    var self = this, options = '', createOptionHTML = function(el) {
      var optclass = '', classes = '', link = '';

      if (el.selectedOpt && !this.foundSelected && !this.hasDefaultPlaceholder) {
        classes += 'is-selected ';
        this.foundSelected = true;
      }
      // extra classes
      if (el.getAttribute('data-class')) {
        classes += el.getAttribute('data-class');
      }
      // link options
      if (el.getAttribute('data-link')) {
        link = 'data-link=' + el.getAttribute('data-link');
      }

      if (classes !== '') {
        optclass = 'class="' + classes + '" ';
      }

      var extraAttributes = '';

      [].forEach.call(el.attributes, function(attr) {
        var name = attr.name;

        if (name.indexOf('data-') + ['data-option', 'data-value'].indexOf(name) === -1) {
          extraAttributes += name + "='" + attr.value + "' ";
        }
      });

      return '<li ' + optclass + link + extraAttributes + ' data-option data-value="' + el.value + '"><span class="c-select__item">' + el.textContent + '</span></li>';
    };

    [].slice.call(this.el.children).forEach(function(el) {
      if (el.disabled) {
        return;
      }

      var tag = el.tagName.toLowerCase();

      if (tag === 'option') {
        options += createOptionHTML(el);
      } else if (tag === 'optgroup') {
        options += '<li class="c-select__optgroup"><span class="c-select__optgroup-label">' + el.label + '</span><ul class="c-select__list">';
        [].slice.call(el.children).forEach(function(opt) {
          options += createOptionHTML(opt);
        });
        options += '</ul></li>';
      }
    });

    var opts_el = '<div class="c-select__options"><ul class="c-select__list">' + options + '</ul></div>';
    this.selEl = document.createElement('div');
    this.selEl.className = this.el.className;
    this.selEl.tabIndex = this.el.tabIndex;
    this.selEl.innerHTML = '<span class="c-select__placeholder">' + this.selectedOpt.textContent + '</span>' + opts_el;
    this.el.parentNode.insertBefore(this.selEl, this.el);
    this.selEl.appendChild(this.el);
  };

  /**
   * initialize the events
   */
  Select.prototype._initEvents = function() {
    var self = this;

    // open/close select
    this.selPlaceholder.addEventListener('click', function() {
      self._toggleSelect();
    });

    // clicking the options
    this.selOpts.forEach(function(opt, idx) {
      opt.addEventListener('click', function() {
        self.current = idx;
        self._changeOption();
        self._toggleSelect();
      });
    });

    // close the select element if the target it's not the select element or one of its descendants..
    document.addEventListener('click', function(ev) {
      var target = ev.target;
      if (self._isOpen() && target !== self.selEl && !hasParent(target, self.selEl)) {
        self._toggleSelect();
      }
    });

    // select change events
    this.el.addEventListener('change', self._changeOption.bind(self));

    // keyboard navigation events
    this.selEl.addEventListener('keydown', function(ev) {
      var keyCode = ev.keyCode || ev.which;

      switch (keyCode) {
        // up key
        case 38:
          ev.preventDefault();
          self._navigateOpts('prev');
          break;
        // down key
        case 40:
          ev.preventDefault();
          self._navigateOpts('next');
          break;
        // space key
        case 32:
          ev.preventDefault();
          if (self._isOpen() && typeof self.preSelCurrent !== 'undefined' && self.preSelCurrent !== -1) {
            self._changeOption();
          }
          self._toggleSelect();
          break;
        // enter key
        case 13:
          ev.preventDefault();
          if (self._isOpen() && typeof self.preSelCurrent !== 'undefined' && self.preSelCurrent !== -1) {
            self._changeOption();
            self._toggleSelect();
          }
          break;
        // esc key
        case 27:
          ev.preventDefault();
          if (self._isOpen()) {
            self._toggleSelect();
          }
          break;
      }
    });
  };

  /**
   * navigate with up/dpwn keys
   */
  Select.prototype._navigateOpts = function(dir) {
    if (!this._isOpen()) {
      this._toggleSelect();
    }

    var tmpcurrent = typeof this.preSelCurrent !== 'undefined' && this.preSelCurrent !== -1 ? this.preSelCurrent : this.current;

    if (dir === 'prev' && tmpcurrent > 0 || dir === 'next' && tmpcurrent < this.selOptsCount - 1) {
      // save pre selected current - if we click on option, or press enter, or press space this is going to be the index of the current option
      this.preSelCurrent = dir === 'next' ? tmpcurrent + 1 : tmpcurrent - 1;
      // remove focus class if any..
      this._removeFocus();
      // add class focus - track which option we are navigating
      this.selOpts[this.preSelCurrent].classList.add('has-focus');
    }
  };

  /**
   * open/close select
   * when opened show the default placeholder if any
   */
  Select.prototype._toggleSelect = function() {
    // remove focus class if any..
    this._removeFocus();

    if (this._isOpen()) {
      if (this.current !== -1) {
        // update placeholder text
        this.selPlaceholder.textContent = this.selOpts[ this.current ].textContent;
        this.selEl.classList.add('has-selected');
      }
      this.selEl.classList.remove('is-open');
    } else {
      if (this.hasDefaultPlaceholder && this.options.stickyPlaceholder) {
        // everytime we open we wanna see the default placeholder text
        this.selPlaceholder.textContent = this.selectedOpt.textContent;
      }
      this.selEl.classList.add('is-open');
    }
  };

  /**
   * change option - the new value is set
   */
  Select.prototype._changeOption = function(ev) {
    // If pre selected current (if we navigate with the keyboard)...
    if (typeof this.preSelCurrent !== 'undefined' && this.preSelCurrent !== -1) {
      this.current = this.preSelCurrent;
      this.preSelCurrent = -1;
    }

    // Deactivate old selected option
    var oldOpt = this.selEl.querySelector('.is-selected');
    if (oldOpt) {
      oldOpt.classList.remove('is-selected');
    }

    // Get new selected option
    var opt = this.selOpts[ this.current ];

    // If change triggered by JavaScript, update change option
    // based on select value instead of the other way around.
    if (ev) {
      if (this.el.value && this.el.value.trim().length > 0) {
        for (var i = 0; i < this.selOpts.length; i++) {
          if (this.selOpts[i].getAttribute('data-value') === this.el.value) {
            opt = this.selectedOpt = this.selOpts[i];
            break;
          }
        }
      // Reset placeholder
      } else {
        opt = this.selectedOpt = this.el.querySelector('option');
        this.selPlaceholder.textContent = opt.textContent;
        return false;
      }
    }

    // Otherwise, update current selected value
    this.selPlaceholder.textContent = opt.textContent;
    opt.classList.add('is-selected');

    // If there's a link defined
    if (opt.getAttribute('data-link')) {
      // open in new tab?
      if (this.options.newTab) {
        window.open(opt.getAttribute('data-link'), '_blank');
      } else {
        window.location = opt.getAttribute('data-link');
      }
    }

    // Change native select element's value
    this.el.value = opt.getAttribute('data-value');

    // Manually fire `change` event
    // http://stackoverflow.com/a/28324400/1786459
    if (!ev) {
      this.el.dispatchEvent(changeEvent);
    }

    // Callback
    this.options.onChange(this.el.value);
  };

  /**
   * returns true if select element is opened
   */
  Select.prototype._isOpen = function(opt) {
    return this.selEl.classList.contains('is-open');
  };

  /**
   * removes the focus class from the option
   */
  Select.prototype._removeFocus = function(opt) {
    var focusEl = this.selEl.querySelector('.has-focus');
    if (focusEl) {
      focusEl.classList.remove('has-focus');
    }
  };



  // ------------------------------
  // Public
  // ------------------------------

  return Select;

})(window, document);
