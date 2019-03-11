/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

// TODO: Graceful fail + error message when a DOM element is passed instead of a selector
module.exports = (function() {
  function matches(elem, selector) {
    if (!selector || !elem || elem.nodeType !== 1) {
      return false;
    }

    var matchesSelector = elem.webkitMatchesSelector ||
      elem.mozMatchesSelector ||
      elem.oMatchesSelector ||
      elem.msMatchesSelector ||
      elem.matchesSelector;

    if (matchesSelector) {
      return matchesSelector.call(elem, selector);
    }

    return false;
  }

  return matches;
})();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

var getWindow = __webpack_require__(3);

module.exports = (function() {
  /**
   * Check whether an element is inside the viewport. By default, checks
   * whether the whole element is in the viewport. Optionally checks whether
   * element is partially in the viewport.
   * @see https://stackoverflow.com/a/7557433/1786459
   * @param  {Element}  el
   * @return {Boolean}
   */
  function isInViewport(el, allowPartial) {
    if (typeof jQuery === 'function' && el instanceof jQuery) {
      el = el[0];
    }
    if (!el) {
      return false;
    }

    var rect = el.getBoundingClientRect();
    var width = getWindow.width();
    var height = getWindow.height();

    if (allowPartial) {
      var outsideOfVerticalBounds = (
        (rect.top >= height && rect.bottom >= height) ||
        (rect.top <= 0 && rect.bottom <= 0)
      );
      var outsideOfHorizontalBounds = (
        (rect.left >= width && rect.right >= width) ||
        (rect.left <= 0 && rect.right <= 0)
      );

      return !(outsideOfVerticalBounds || outsideOfHorizontalBounds);
    }

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= getWindow.height() &&
      rect.right <= getWindow.width()
    );
  }

  return isInViewport;
})();


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

var isInViewport = __webpack_require__(1);

module.exports = (function() {
  /**
   * Check whether an element is visible within the viewport.
   * @param  {Element}  el
   * @return {Boolean}
   */
  function isVisible(el) {
    if (typeof jQuery === 'function' && el instanceof jQuery) {
      el = el[0];
    }

    var rect = el.getBoundingClientRect();
    var hasDimensions = rect.width > 0 && rect.height > 0;

    return hasDimensions && isInViewport(el, true);
  }

  return isVisible;
})();


/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = (function() {
  /**
   * Get current viewport width.
   * @see https://plainjs.com/javascript/styles/getting-width-and-height-of-an-element-23/
   * @return {Number}
   */
  function width() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }

  /**
   * Get current viewport height.
   * @see https://plainjs.com/javascript/styles/getting-width-and-height-of-an-element-23/
   * @return {Number}
   */
  function height() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  }

  return {
    width: width,
    height: height
  };
})();


/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = (function(undefined) {
  /**
   * Get YouTube ID. Taken from https://gist.github.com/takien/4077195
   * Consider using https://github.com/jmorrell/get-youtube-id/blob/master/index.js
   * @param  {String}  url
   * @return {String}
   */
  function getYouTubeId(url) {
    var id = '';
    url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

    if (url[2] !== undefined) {
      id = url[2].split(/[^0-9a-z_\-]/i);
      id = id[0];
    } else {
      id = url;
    }

    return id;
  }

  return getYouTubeId;
})();


/***/ },
/* 5 */
/***/ function(module, exports) {

// Based on answer to "Listening for Youtube Event in JavaScript"
// @see https://stackoverflow.com/a/7988536/1786459
module.exports = (function(window, document, undefined) {

  // Define YT_ready function.
  var YT_ready = (function() {
    var onReady_funcs = [],
      api_isReady = false;

    /**
     * Add functions to call stack for when YouTube API is ready. If API is
     * ready, then go ahead and call the function.
     * @param  {Function||Boolean}  func      Function to execute on ready
     * @param  {Boolean}            b_before  If true, all qeued functions are executed
     * @return {Boolean}                      If true, the func will added to the first position in the queue
     */
    return function(func, b_before) {
      if (func === true) {
        api_isReady = true;

        while (onReady_funcs.length) {
          // Removes the first func from the array, and execute func
          onReady_funcs.shift()();
        }
      } else if (typeof func == 'function') {
        if (api_isReady) {
          func();
        } else {
          onReady_funcs[b_before ? 'unshift' : 'push'](func);
        }
      }
    };
  })();

  // function onYouTubePlayerAPIReady() {
  window.onYouTubeIframeAPIReady = function() {
    YT_ready(true);
  };

  // Load YouTube Frame API
  (function() { // Closure, to not leak to the scope
    var s = document.createElement('script');
    s.src = 'https://www.youtube.com/iframe_api';
    var before = document.getElementsByTagName('script')[0];
    before.parentNode.insertBefore(s, before);
  })();

  return YT_ready;

})(window, document);


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

module.exports = (function() {
  return {
    getYouTubeId: __webpack_require__(4),
    player: __webpack_require__(23),
    youTubeReady: __webpack_require__(5)
  };
})();


/***/ },
/* 7 */
/***/ function(module, exports) {

module.exports = (function() {
  /**
   * Use Array.prototype.map on array-like objects.
   * @return {Array}
   */
  function map() {
    var arr = arguments[0];
    var args = Array.prototype.slice.call(arguments, 1);
    return Array.prototype.map.apply(arr, args);
  }

  return map;
})();


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * ResizeSensor.
 * @see https://github.com/marcj/css-element-queries/blob/bfa9a7ffbe61ceda37403aca927904f0fd11cb7f/src/ResizeSensor.js
 */

/* jshint ignore:start */

/**
 * Copyright Marc J. Schmidt. See the LICENSE file at
 * https://github.com/marcj/css-element-queries/blob/master/LICENSE.
 */
;
(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === "object") {
    module.exports = factory();
  } else {
    root.ResizeSensor = factory();
  }
}(this, function () {

  // Only used for the dirty checking, so the event callback count is limted to max 1 call per fps per sensor.
  // In combination with the event based resize sensor this saves cpu time, because the sensor is too fast and
  // would generate too many unnecessary events.
  var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function (fn) {
      return window.setTimeout(fn, 20);
    };

  /**
   * Iterate over each of the provided element(s).
   *
   * @param {HTMLElement|HTMLElement[]} elements
   * @param {Function}                  callback
   */
  function forEachElement(elements, callback){
    var elementsType = Object.prototype.toString.call(elements);
    var isCollectionTyped = ('[object Array]' === elementsType
      || ('[object NodeList]' === elementsType)
      || ('[object HTMLCollection]' === elementsType)
      || ('undefined' !== typeof jQuery && elements instanceof jQuery) //jquery
      || ('undefined' !== typeof Elements && elements instanceof Elements) //mootools
    );
    var i = 0, j = elements.length;
    if (isCollectionTyped) {
      for (; i < j; i++) {
        callback(elements[i]);
      }
    } else {
      callback(elements);
    }
  }

  /**
   * Class for dimension change detection.
   *
   * @param {Element|Element[]|Elements|jQuery} element
   * @param {Function} callback
   *
   * @constructor
   */
  var ResizeSensor = function(element, callback) {
    /**
     *
     * @constructor
     */
    function EventQueue() {
      var q = [];
      this.add = function(ev) {
        q.push(ev);
      };

      var i, j;
      this.call = function() {
        for (i = 0, j = q.length; i < j; i++) {
          q[i].call();
        }
      };

      this.remove = function(ev) {
        var newQueue = [];
        for(i = 0, j = q.length; i < j; i++) {
          if(q[i] !== ev) newQueue.push(q[i]);
        }
        q = newQueue;
      }

      this.length = function() {
        return q.length;
      }
    }

    /**
     * @param {HTMLElement} element
     * @param {String}      prop
     * @returns {String|Number}
     */
    function getComputedStyle(element, prop) {
      if (element.currentStyle) {
        return element.currentStyle[prop];
      } else if (window.getComputedStyle) {
        return window.getComputedStyle(element, null).getPropertyValue(prop);
      } else {
        return element.style[prop];
      }
    }

    /**
     *
     * @param {HTMLElement} element
     * @param {Function}    resized
     */
    function attachResizeEvent(element, resized) {
      if (!element.resizedAttached) {
        element.resizedAttached = new EventQueue();
        element.resizedAttached.add(resized);
      } else if (element.resizedAttached) {
        element.resizedAttached.add(resized);
        return;
      }

      element.resizeSensor = document.createElement('div');
      element.resizeSensor.className = 'resize-sensor';
      var style = 'position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;';
      var styleChild = 'position: absolute; left: 0; top: 0; transition: 0s;';

      element.resizeSensor.style.cssText = style;
      element.resizeSensor.innerHTML =
        '<div class="resize-sensor-expand" style="' + style + '">' +
          '<div style="' + styleChild + '"></div>' +
        '</div>' +
        '<div class="resize-sensor-shrink" style="' + style + '">' +
          '<div style="' + styleChild + ' width: 200%; height: 200%"></div>' +
        '</div>';
      element.appendChild(element.resizeSensor);

      if (getComputedStyle(element, 'position') == 'static') {
        element.style.position = 'relative';
      }

      var expand = element.resizeSensor.childNodes[0];
      var expandChild = expand.childNodes[0];
      var shrink = element.resizeSensor.childNodes[1];

      var reset = function() {
        expandChild.style.width  = 100000 + 'px';
        expandChild.style.height = 100000 + 'px';

        expand.scrollLeft = 100000;
        expand.scrollTop = 100000;

        shrink.scrollLeft = 100000;
        shrink.scrollTop = 100000;
      };

      reset();
      var dirty = false;

      var dirtyChecking = function() {
        if (!element.resizedAttached) return;

        if (dirty) {
          element.resizedAttached.call();
          dirty = false;
        }

        requestAnimationFrame(dirtyChecking);
      };

      requestAnimationFrame(dirtyChecking);
      var lastWidth, lastHeight;
      var cachedWidth, cachedHeight; //useful to not query offsetWidth twice

      var onScroll = function() {
        if ((cachedWidth = element.offsetWidth) != lastWidth || (cachedHeight = element.offsetHeight) != lastHeight) {
          dirty = true;

          lastWidth = cachedWidth;
          lastHeight = cachedHeight;
        }
        reset();
      };

      var addEvent = function(el, name, cb) {
        if (el.attachEvent) {
          el.attachEvent('on' + name, cb);
        } else {
          el.addEventListener(name, cb);
        }
      };

      addEvent(expand, 'scroll', onScroll);
      addEvent(shrink, 'scroll', onScroll);
    }

    forEachElement(element, function(elem){
      attachResizeEvent(elem, callback);
    });

    this.detach = function(ev) {
      ResizeSensor.detach(element, ev);
    };
  };

  ResizeSensor.detach = function(element, ev) {
    forEachElement(element, function(elem){
      if(elem.resizedAttached && typeof ev == "function"){
        elem.resizedAttached.remove(ev);
        if(elem.resizedAttached.length()) return;
      }
      if (elem.resizeSensor) {
        elem.removeChild(elem.resizeSensor);
        delete elem.resizeSensor;
        delete elem.resizedAttached;
      }
    });
  };

  return ResizeSensor;

}));


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

var isVisible = __webpack_require__(2);

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
    var this$1 = this;

    var remaining = [];

    for (var i = 0; i < elements.length; i++) {
      if (isVisible(elements[i])) {
        this$1.callback(elements[i]);
      } else {
        remaining.push(elements[i]);
      }
    }

    return remaining;
  };

  return Visibility;

})(window, document);


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

var matches = __webpack_require__(0);

module.exports = (function() {
  /**
   * Get the number of nested layers between an element and its ancestor.
   * Optionally filters layers by a selector.
   * @see https://tympanus.net/codrops/2013/08/13/multi-level-push-menu/
   * @param  {Element}  el
   * @param  {Element}  ancestor
   * @param  {String}   selector
   * @param  {Number}   count
   * @return {Boolean}
   */
  function childDepth(elem, ancestor, selector, count) {
    count = count || 0;

    if (elem === ancestor) {
      return count;
    }

    // If no selector is specified, match every layer
    if (!selector) {
      count++;
    // Otherwise, only count matching layers
    } else if (matches(elem, selector)) {
      count++;
    }

    return elem.parentNode && this.childDepth(elem.parentNode, ancestor, selector, count);
  }

  return childDepth;
})();


/***/ },
/* 11 */
/***/ function(module, exports) {

function getAttrIdentifier() {
  return 'dom-' + (new Date()).getTime();
}

module.exports = (function() {
  /**
   * Return the first level children for an element.
   */
  function children(elem, selector) {
    if (!selector) {
      return elem.children;
    }

    var randAttr = getAttrIdentifier();
    elem.setAttribute(randAttr, '');

    var nodes = elem.parentNode.querySelectorAll('[' + randAttr + '] ' + selector);
    elem.removeAttribute(randAttr);

    return nodes;
  }

  return children;
})();


/***/ },
/* 12 */
/***/ function(module, exports) {

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


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

var matches = __webpack_require__(0);

module.exports = (function() {
  /**
   * Return the first parent of an element that matches a given selector.
   * @param  {Element}  elem
   * @param  {String}   selector
   * @return {Element}
   */
  function closest(elem, selector) {
    while (elem && !matches(elem, selector)) {
      elem = elem.parentNode;
    }

    return elem || null;
  }

  return closest;
})();


/***/ },
/* 14 */
/***/ function(module, exports) {

module.exports = (function() {
  /**
   * Return the index for a given element.
   * @param  {Element}  elem
   * @return {Number}
   */
  function getIndex(elem) {
    var i = 0;

    while ((elem = elem.previousElementSibling)) {
      i++;
    }

    return i;
  }

  return getIndex;
})();


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

module.exports = (function() {
  return {
    childDepth: __webpack_require__(10),
    children: __webpack_require__(11),
    classList: __webpack_require__(12),
    closest: __webpack_require__(13),
    getIndex: __webpack_require__(14),
    isInBounds: __webpack_require__(16),
    isInViewport: __webpack_require__(1),
    isVisible: __webpack_require__(2),
    matches: __webpack_require__(0),
    offset: __webpack_require__(17),
    outerHeight: __webpack_require__(18),
    outerWidth: __webpack_require__(19),
    parents: __webpack_require__(20),
    position: __webpack_require__(21),
    ResizeSensor: __webpack_require__(8),
    Visibility: __webpack_require__(9),
    window: __webpack_require__(3)
  };
})();


/***/ },
/* 16 */
/***/ function(module, exports) {

module.exports = (function() {
  /**
   * Check whether an element is inside the visible bounds of another element.
   * @see https://stackoverflow.com/a/7557433/1786459
   * @param  {Element}  el
   * @param  {Element}  parent
   * @return {Boolean}
   */
  function isInBounds(el, parent) {
    if (typeof jQuery === 'function') {
      if (el instanceof jQuery) {
        el = el[0];
      }
      if (parent instanceof jQuery) {
        parent = parent[0];
      }
    }

    var elRect = el.getBoundingClientRect(),
      parentRect = parent.getBoundingClientRect();

    return (
      elRect.top >= parentRect.top &&
      elRect.left >= parentRect.left &&
      elRect.bottom <= parentRect.bottom &&
      elRect.right <= parentRect.right
    );
  }

  return isInBounds;
})();


/***/ },
/* 17 */
/***/ function(module, exports) {

module.exports = (function() {
  function isWindow(obj) {
    return obj !== null && obj === obj.window;
  }

  function getWindow(elem) {
    return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }

  /**
   * Get an element's offset (top and left).
   * @see https://stackoverflow.com/a/18452333/176192
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


/***/ },
/* 18 */
/***/ function(module, exports) {

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


/***/ },
/* 19 */
/***/ function(module, exports) {

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


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

var matches = __webpack_require__(0);

module.exports = (function() {
  /**
   * Return all parents of an element that match a given selector.
   * @param  {Element}  elem
   * @param  {String}   selector
   * @return {Array}
   */
  function parents(elem, selector) {
    var first = true,
      result = [];

    while (elem.nodeType === 1) {
      if (!first && matches(elem, selector)) {
        result.push(elem);
      }
      first = false;
      elem = elem.parentNode;
    }

    return result;
  }

  return parents;
})();


/***/ },
/* 21 */
/***/ function(module, exports) {

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


/***/ },
/* 22 */
/***/ function(module, exports) {

module.exports = (function() {
  /**
   * Extend a JavaScript object
   * @see https://plainjs.com/javascript/utilities/merge-two-javascript-objects-19/
   * @param  {Object} obj
   * @param  {Object} src
   * @return {Object}
   */
  function extend(obj, src) {
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        obj[key] = src[key];
      }
    }

    return obj;
  }

  return extend;
})();


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

var dom = __webpack_require__(15);
var map = __webpack_require__(7);
var extend = __webpack_require__(22);
var getYouTubeId = __webpack_require__(4);
var youTubeReady = __webpack_require__(5);
// var analytics = require('../analytics');

// TODO: Create a reusable Video class from this
module.exports = (function(window, document, undefined) {

  var readyClass = 'is-ready';
  var activeClass = 'is-active';

  // Quality Pt. 1
  var VIDEO_QUALITY_OPTIONS = {
    quality: 'hd720',
    breakpoint: 768
  };

  /**
   * Force specific quality playback for YouTube videos.
   * @see https://stackoverflow.com/a/10757854/1786459
   * @param  {Element}  video
   * @param  {Object}   options  { quality: 'hd720', minWidth: 768 }
   * @return {Boolean}
   */
  function setQuality(video, options) {
    if (!video || typeof video.setPlaybackQuality !== 'function') {
      return false;
    }

    options = extend({
      quality: 'hd720',
      breakpoint: 768
    }, options);

    // Force high quality videos at breakpoint (assuming larger screens have better performance)
    if (dom.window.width() >= options.breakpoint) {
      video.setPlaybackQuality(options.quality);
    }

    return true;
  }

  /**
   * Load YouTube video player.
   * @param  {Element}  videoElement
   * @return {VideoPlayer}
   */
  function initVideoPlayer(videoElement) {
    var YT = window.YT;
    var videoOptions, videoId, playerOptions, videoPlayer;
    var videoContainer = dom.closest(videoElement, '.js-video-wrapper');

    // Wait for YouTube
    if (typeof YT === 'undefined') {
      console.log('Error: YouTube API failed to load.');
      return false;
    }

    // Require video ID
    if (!videoElement.id) {
      console.log('Error: No ID defined for video element', videoElement);
      return false;
    }

    // Get options
    videoOptions = extend({
      url: false,
      gaEventCategory: false
    }, JSON.parse(videoElement.getAttribute('data-video') || '{}'));

    // Require video URL
    if (!videoOptions.url) {
      console.log('Error: No video URL defined for video', videoElement);
      return false;
    }

    videoId = getYouTubeId(videoOptions.url);

    // Init player options
    playerOptions = {
      videoId: videoId,
      playerVars: {
        autohide: 1,       // Disable autohide when video ends
        autoplay: 0,       // Disable autoplay
        controls: 1,       // Show controls
        enablejsapi: 1,    // Enable JS
        // fs: 0,             // Disable default fullscreen button
        // iv_load_policy: 3, // Disable annotations
        modestbranding: 1,
        rel: 0,            // Hide related videos
        showinfo: 0,       // Hide video info
      },
      events: {}
    };

    // Allow custom dimensions
    if (videoOptions.width) { playerOptions.width = videoOptions.width; }
    if (videoOptions.height) { playerOptions.height = videoOptions.height; }

    /**
     * Ready event.
     * @param  {event}  event
     * @return {void}
     */
    playerOptions.events.onReady = function(event) {
      // Quality Pt. 2
      setQuality(event.target, VIDEO_QUALITY_OPTIONS);

      // Allow custom play buttons
      var playButtons = document.querySelectorAll('.js-video-open[data-video="#' + videoElement.id + '"]');
      map(playButtons, function (button) { return button.addEventListener('click', function (e) {
        if (videoPlayer) { videoPlayer.playVideo(); }
      }); });

      // Add hover state to player buttons
      videoContainer.addEventListener('mouseover', function () {
        map(playButtons, function (button) { return button.classList.add(activeClass); });
      });
      videoContainer.addEventListener('mouseout', function () {
        map(playButtons, function (button) { return button.classList.remove(activeClass); });
      });

      // Pause and close video when user clicks outside
      window.addEventListener('click', function (e) {
        if (videoPlayer) {
          videoPlayer.pauseVideo();
          videoContainer.classList.remove(activeClass);
        }
      });

      videoContainer.classList.add(readyClass);
      map(playButtons, function (button) { return button.classList.add(readyClass); });
    };

    /**
     * State events.
     * @param  {event}  event
     * @return {void}
     */
    playerOptions.events.onStateChange = function(event) {
      // Quality Pt. 3
      if (event.data === YT.PlayerState.BUFFERING) {
        setQuality(event.target, VIDEO_QUALITY_OPTIONS);
      }

      // CSS
      if (event.data === YT.PlayerState.BUFFERING ||
          event.data === YT.PlayerState.PLAYING) {
        videoContainer.classList.add(activeClass);
      }
      if (event.data === YT.PlayerState.ENDED) {
        videoContainer.classList.remove(activeClass);
      }

      // TODO: Analytics
      // if (videoOptions.gaEventCategory) {
      //   if (event.data === YT.PlayerState.PLAYING) {
      //     analytics.trackEvent.create({
      //       'eventCategory': videoOptions.gaEventCategory,
      //       'eventAction': 'Start Video',
      //       'eventLabel': 'https://www.youtube.com/watch?v=' + videoId
      //     });
      //   }
      //   if (event.data === YT.PlayerState.PAUSED) {
      //     analytics.trackEvent.create({
      //       'eventCategory': videoOptions.gaEventCategory,
      //       'eventAction': 'Stop Video',
      //       'eventLabel': 'https://www.youtube.com/watch?v=' + videoId
      //     });
      //   }
      //   if (event.data === YT.PlayerState.ENDED) {
      //     analytics.trackEvent.create({
      //       'eventCategory': videoOptions.gaEventCategory,
      //       'eventAction': 'Finish Video',
      //       'eventLabel': 'https://www.youtube.com/watch?v=' + videoId
      //     });
      //   }
      // }
    };

    videoPlayer = new YT.Player(videoElement, playerOptions);

    return videoPlayer;
  }



  // ------------------------------
  // Public
  // ------------------------------

  // Create array of unique video players based on play button hashes
  // var _hash;
  //
  // for (var i = 0; i < openButtons.length; i++) {
  //   _hash = openButtons[i].hash;
  //
  //   // If hash is null or element doesn't exist, continue
  //   if (!_hash || !document.querySelector(_hash)) {
  //     continue;
  //   }
  //
  //   // If player doesn't already exist, create a new one
  //   if (!videoPlayers.hasOwnProperty(_hash)) {
  //     videoPlayers[_hash] = new VideoPlayer(_hash);
  //   }
  //
  //   // Group buttons by hash
  //   openButtonsByHash[_hash] = openButtonsByHash[_hash] || []; // Create array if none exists
  //   openButtonsByHash[_hash].push(openButtons[i]);
  //
  //   // Add open event to all buttons for videos in array
  //   openButtons[i].addEventListener('click', videoPlayers[_hash].openClickListener);
  // }



  // ------------------------------
  // Public
  // ------------------------------

  return {
    init: function () { return youTubeReady(function () { return map(document.querySelectorAll('.js-video'), initVideoPlayer); }); },
    // create: () => new VideoPlayer()
  };

})(window, document);


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

// TODO: Use starter kit JS to avoid dupe code
// require('../../../starter-kit/assets/js/app');

var video = __webpack_require__(6);
video.player.init();


/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map