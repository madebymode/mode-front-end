// Example use:
// window.balancetext = require('mode-front-end/resources/assets/js/typography/balancetext');
// window.balancetext.balancedElements.push('.js-balance-text');

/*
 * Copyright (c) 2012 Adobe Systems Incorporated. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License. *
 */

/**
 * jquery.balancetext.js
 *
 * Author: Randy Edmunds
 */

/*jslint vars: true, plusplus: true, devel: true, browser: true, nomen: true, indent: 4, maxerr: 50, regexp: true */
/*jshint laxbreak: true */
/*global jQuery, $ */

/*
 * Copyright (c) 2007-2009 unscriptable.com and John M. Hann
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the “Software”), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * Except as contained in this notice, the name(s) of the above
 * copyright holders (unscriptable.com and John M. Hann) shall not be
 * used in advertising or otherwise to promote the sale, use or other
 * dealings in this Software without prior written authorization.
 *
 * http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
 *
 */
var debounce = function(func, threshold, caller) {
  var timeout, args = arguments;
  caller = caller || null;

  return function() {

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(function() {
      func.apply(caller, args);
    }, threshold || 250);
  };
};

// TODO: Move to dom helper
var height = function(elem) {
  var elemStyles = window.getComputedStyle(elem);

  var excludeHeight = 0;
  excludeHeight += parseFloat(elemStyles.getPropertyValue('padding-top'));
  excludeHeight += parseFloat(elemStyles.getPropertyValue('padding-bottom'));

  return elem.offsetHeight - excludeHeight;
};

module.exports = (function(window, document, undefined) {
    "use strict";

    var style = document.documentElement.style,
      hasTextWrap = (style.textWrap || style.WebkitTextWrap || style.MozTextWrap || style.MsTextWrap || style.OTextWrap),
      wsMatches;

    function NextWS_params() {
      this.reset();
    }
    NextWS_params.prototype.reset = function () {
      this.index = 0;
      this.width = 0;
    };

    /**
     * Returns true iff char at index is a space character outside of HTML < > tags.
     */
    var isWS = function (txt, index) {
      var re = /\s(?![^<]*>)/g,
        match;

      if (!wsMatches) {
        // Only calc ws matches once per line
        wsMatches = [];
        while ((match = re.exec(txt)) !== null) {
          wsMatches.push(match.index);
        }
      }

      return wsMatches.indexOf(index) !== -1;
    };

    var removeTags = function (elem) {

      var brTags = elem.querySelectorAll('br[data-owner="balance-text"]');
      Array.prototype.slice.call(brTags).forEach(function(childElem) {
        elem.replaceChild(document.createTextNode(" "), childElem);
      });

      var spans = elem.querySelectorAll('span[data-owner="balance-text"]');
      if (spans.length > 0) {

        var text = '';
        Array.prototype.slice.call().forEach(function(childElem) {
          text += childElem.textContent;
          elem.removeChild(childElem);
        });

        elem.innerHTML = text;
      }
    };

    /**
     * Checks to see if we should justify the balanced text with the
     * element based on the textAlign property in the computed CSS
     *
     * @param $el        - $(element)
     */
    var isJustified = function (elem) {
      style = window.getComputedStyle(elem, null);
      return (style.textAlign === 'justify');
    };

    /**
     * Add whitespace after words in text to justify the string to
     * the specified size.
     *
     * @param txt      - text string
     * @param conWidth - container width
     */
    var justify = function (elem, txt, conWidth) {
      txt = txt.trim();
      var words = txt.split(' ').length;
      txt = txt + ' ';

      // if we don't have at least 2 words, no need to justify.
      if (words < 2) {
        return txt;
      }

      var tmp = document.createElement('span');
      tmp.innerHTML = txt;
      elem.appendChild(tmp);

      var size = tmp.offsetWidth;
      elem.removeChild(tmp);

      // Figure out our word spacing and return the element
      var wordSpacing = Math.floor((conWidth - size) / (words - 1));

      tmp.style.wordSpacing = wordSpacing + 'px';
      tmp.setAttribute('data-owner', 'balance-text');

      var div = document.createElement('div');
      div.appendChild(tmp);

      return div.innerHTML;
    };

    /**
     * In the current simple implementation, an index i is a break
     * opportunity in txt iff it is 0, txt.length, or the
     * index of a non-whitespace char immediately preceded by a
     * whitespace char.  (Thus, it doesn't honour 'white-space' or
     * any Unicode line-breaking classes.)
     *
     * @precondition 0 <= index && index <= txt.length
     */
    var isBreakOpportunity = function (txt, index) {
      return ((index === 0) || (index === txt.length) ||
              (isWS(txt, index - 1) && !isWS(txt, index)));
    };

    /**
     * Finds the first break opportunity (@see isBreakOpportunity)
     * in txt that's both after-or-equal-to index c in the direction dir
     * and resulting in line width equal to or past clamp(desWidth,
     * 0, conWidth) in direction dir.  Sets ret.index and ret.width
     * to the corresponding index and line width (from the start of
     * txt to ret.index).
     *
     * @param $el      - $(element)
     * @param txt      - text string
     * @param conWidth - container width
     * @param desWidth - desired width
     * @param dir      - direction (-1 or +1)
     * @param c        - char index (0 <= c && c <= txt.length)
     * @param ret      - return object; index and width of previous/next break
     *
     */
    var findBreakOpportunity = function(elem, txt, conWidth, desWidth, dir, c, ret) {
      var w;
      if (txt && typeof txt === 'string') {
        for(;;) {
          while (!isBreakOpportunity(txt, c)) {
            c += dir;
          }

          elem.innerHTML = txt.substr(0, c);

          // $el.html(txt.substr(0, c));
          w = elem.offsetWidth;

          if ((dir < 0)
            ? ((w <= desWidth) || (w <= 0) || (c === 0))
            : ((desWidth <= w) || (conWidth <= w) || (c === txt.length))) {
            break;
          }
          c += dir;
        }
      }
      ret.index = c;
      ret.width = w;
    };

    /**
     * Detects the width of a non-breaking space character, given the height of
     * the element with no-wrap applied.
     *
     * @param $el      - $(element)
     * @param h         - height
     *
     */
    var getSpaceWidth = function (elem, h) {

      var container = document.createElement('div');
      container.style.display = "block";
      container.style.position = "absolute";
      container.style.bottom = 0;
      container.style.right = 0;
      container.style.width = 0;
      container.style.height = 0;
      container.style.margin = 0;
      container.style.padding = 0;
      container.style.visibility = "hidden";
      container.style.overflow = "hidden";

      var space = document.createElement('span');

      space.style.fontSize = "2000px";
      space.innerHTML = "&nbsp;";

      container.appendChild(space);

      elem.appendChild(container);

      var dims = space.getBoundingClientRect();
      container.parentNode.removeChild(container);

      var spaceRatio = dims.height / dims.width;

      return (h / spaceRatio);
    };

    // Selectors to watch; calling balanceText() on a new selector adds it to this list.
    var balancedElements = ['.balance-text'];

    // Call the balanceText plugin on the elements with "balance-text" class. When a browser
    // has native support for the text-wrap property, the text balanceText plugin will let
    // the browser handle it natively, otherwise it will apply its own text balancing code.
    var applyBalanceText = function () {
      Array.prototype.slice.call(document.querySelectorAll(balancedElements.join(','))).forEach(function(elem) {
        balanceText(elem, true);
      });
    };

    var balanceText = function (elem, skipResize) {

      if (hasTextWrap) {
        // browser supports text-wrap, so do nothing
        return;
      }

      // In a lower level language, this algorithm takes time
      // comparable to normal text layout other than the fact
      // that we do two passes instead of one, so we should
      // be able to do without this limit.
      var maxTextWidth = 5000;

      removeTags(elem);   // strip balance-text tags

      // save settings
      var oldWS = elem.style.whiteSpace;
      var oldFloat = elem.style.float;
      var oldDisplay = elem.style.display;
      var oldPosition = elem.style.position;
      var oldLH = elem.style.lineHeight;

      // remove line height before measuring container size
      elem.style.lineHeight = 'normal';

      var containerWidth = elem.offsetWidth;
      var containerHeight = height(elem);

      // console.log('container', containerWidth, containerHeight);

      elem.style.whiteSpace = 'nowrap';
      elem.style.float = 'none';
      elem.style.display = 'inline';
      elem.style.position = 'static';

      var nowrapWidth = elem.offsetWidth;
      var nowrapHeight = height(elem);

      // console.log('no wrap', nowrapWidth, nowrapHeight);
      // console.log('no wrap jq', $(elem).width(), $(elem).height());

      // console.log('-------------------');

      // An estimate of the average line width reduction due
      // to trimming trailing space that we expect over all
      // lines other than the last.

      var spaceWidth = ((oldWS === 'pre-wrap') ? 0 : getSpaceWidth(elem, nowrapHeight));

      if (containerWidth > 0 &&             // prevent divide by zero
          nowrapWidth > containerWidth &&   // text is more than 1 line
          nowrapWidth < maxTextWidth) {     // text is less than arbitrary limit (make this a param?)

        var remainingText = elem.innerHTML;
        var newText = "";
        var lineText = "";
        var shouldJustify = isJustified(elem);
        var totLines = Math.round(containerHeight / nowrapHeight);
        var remLines = totLines;

        // Determine where to break:
        while (remLines > 1) {

          // clear whitespace match cache for each line
          wsMatches = null;

          var desiredWidth = Math.round((nowrapWidth + spaceWidth) / remLines - spaceWidth);

          // Guessed char index
          var guessIndex = Math.round((remainingText.length + 1) / remLines) - 1;

          var le = new NextWS_params();

          // Find a breaking space somewhere before (or equal to) desired width,
          // not necessarily the closest to the desired width.
          findBreakOpportunity(elem, remainingText, containerWidth, desiredWidth, -1, guessIndex, le);

          // Find first breaking char after (or equal to) desired width.
          var ge = new NextWS_params();
          guessIndex = le.index;
          findBreakOpportunity(elem, remainingText, containerWidth, desiredWidth, +1, guessIndex, ge);

          // Find first breaking char before (or equal to) desired width.
          le.reset();
          guessIndex = ge.index;
          findBreakOpportunity(elem, remainingText, containerWidth, desiredWidth, -1, guessIndex, le);

          // Find closest string to desired length
          var splitIndex;
          if (le.index === 0) {
              splitIndex = ge.index;
          } else if ((containerWidth < ge.width) || (le.index === ge.index)) {
              splitIndex = le.index;
          } else {
              splitIndex = ((Math.abs(desiredWidth - le.width) < Math.abs(ge.width - desiredWidth)) ? le.index : ge.index);
          }

          // Break string
          lineText = remainingText.substr(0, splitIndex);
          if (shouldJustify) {
            newText += justify(elem, lineText, containerWidth);
          } else {
            newText += lineText.replace(/\s$/, "");
            newText += '<br data-owner="balance-text" />';
          }

          remainingText = remainingText.substr(splitIndex);

          // update counters
          remLines--;
          elem.innerHTML = remainingText;
          nowrapWidth = elem.offsetWidth; // $this.width();
        }

        if (shouldJustify) {
          elem.innerHTML = newText + justify(elem, remainingText, containerWidth);
        } else {
          elem.innerHTML = newText + remainingText;
        }
      }

      // restore settings
      elem.style.whiteSpace = oldWS;
      elem.style.float = oldFloat;
      elem.style.display = oldDisplay;
      elem.style.position = oldPosition;
      elem.style.lineHeight = oldLH;
    };

    // call on load and on resize
    window.addEventListener('DOMContentLoaded', applyBalanceText);
    window.addEventListener('resize', debounce(applyBalanceText));

    return {
      init: balanceText,
      apply: applyBalanceText,
      elements: balancedElements
    };

}(window, document));
