module.exports = function() {
  'use strict';

  var jsStartTime = Date.now();

  function getTimeSinceJsStart() {
    return 'Time since JS start: ' + (Date.now() - jsStartTime) + 'ms';
  }

  // TODO: Issue with requiring Svg.js too... Woof.
  // require('svgjs');
  // console.log(SVG);

  // Resize knockout text buttons
  var observer = new FontFaceObserver('Tungsten', {
    weight: 600
  });

  observer.check().then(function () {
    //console.log('Font is available');
    setTimeout(resizeAllButtons, 100);
  }, function () {
    setTimeout(resizeAllButtons, 100);
  });

  window.onresize = resizeAllButtons;

  function resizeAllButtons() {
    var buttons = document.querySelectorAll('.js-resize-button');

    for (var i = 0; i < buttons.length; i++) {
      resizeButton(buttons[i]);
    }
  }

  function resizeButton(button) {
    var svg = SVG(button),
      shape = svg.select('polygon').members[0],
      mask = svg.select('mask').members[0],
      mask_rect = mask.select('rect').members[0],
      mask_text = mask.select('text').members[0],
      width = shape.width(),
      height = shape.height(),
      defs_are_not_rendered = mask_text.bbox().height <= 0, // Some browsers (*cough* Firefox) don't render `defs` and set the dimensions of our mask elements to 0,0
      mask_text_was_moved = false,
      buttonsSquare = document.querySelectorAll('.js-resize-sq-button');

    // Set initial size
    svg.size(width, height);

    // console.log('Resizing button: "' + mask_text.node.textContent.trim() + '"', getTimeSinceJsStart());

    if (defs_are_not_rendered) {
      mask_text.putIn(svg);
      mask_text_was_moved = true;
    }

    // Get scale ratio based on font size
    var textHeight = mask_text.bbox().height,
      scaleRatio = textHeight / 30;

    // Calculate new dimensions
    var paddingVertical = 4 * scaleRatio,
      paddingLeft       = 12 * scaleRatio,
      paddingRight      = 8 * scaleRatio,
      newHeight         = textHeight + (paddingVertical * 2),
      arrowWidth        = (23 / 43) * newHeight, // arrowWidth is 23, but you scale by comparing that to the original height (43) and multiplying by the new height
      textWidth         = mask_text.bbox().width, // Use `bbox` because `length` calculates the wrong width
      newInnerWidth     = paddingLeft + textWidth + paddingRight,
      newOuterWidth     = newInnerWidth + arrowWidth;

    if (mask_text_was_moved) {
      mask_text.putIn(mask).front();
    }

    // Resize
    mask_rect.size(newOuterWidth, newHeight);
    mask_text.x(paddingLeft);

    // TODO: How did we calculate this center position?
    // Centered Position: 31.375
    // (newHeight - textHeight) / 2 = paddingVertical
    // 42.75 - 33.75 = 9 / 2 = 4.5

    // Note: In Firefox, `y()` adds to the existing `y` value instead of resetting (e.g., 31.375 + 0)
      // This is because of how svg.js detects the `y` attribute for `text` elements: `this.bbox().y`
      // https://github.com/wout/svg.js/blob/28c8dedc8453926b741af24947ae4be4e9733eaf/src/text.js#L47-L57

    // console.log('Before: ' + mask_text.y());
    if (defs_are_not_rendered) {
      mask_text.y(0);
    } else {
      mask_text.y(paddingVertical);
    }
    // console.log('After: ' + mask_text.y());

    // TODO: Animate viewbox resize
    svg.attr('viewBox', [0, 0, newOuterWidth, newHeight].join(' '));
    svg
      // .animate(300, '<>')
      .size(newOuterWidth, newHeight);
    shape
      // .animate(300, '<>')
      .plot([[0,0], [0,newHeight], [newInnerWidth,newHeight], [newOuterWidth,newHeight/2], [newInnerWidth,0]]);

    // Resize the square icons
    for (var i = 0; i < buttonsSquare.length; i++) {
      buttonsSquare[i].setAttribute('style', 'width: ' + newHeight + 'px; height: ' + newHeight + 'px');
    }

    button.classList.add('is-resized');
  }

};
