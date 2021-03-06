var dom = require('../dom');

/**
 * menu-aim is a jQuery plugin for dropdown menus that can differentiate
 * between a user trying hover over a dropdown item vs trying to navigate into
 * a submenu's contents. It will fire events when the user's mouse enters a
 * new dropdown item *and* when that item is being intentionally hovered over.
 *
 * menu-aim assumes that you have are using a menu with submenus that expand
 * to the menu's right. It will fire events when the user's mouse enters a new
 * dropdown item *and* when that item is being intentionally hovered over.
 *
 * __________________________
 * | Monkeys  >|   Gorilla  |
 * | Gorillas >|   Content  |
 * | Chimps   >|   Here     |
 * |___________|____________|
 *
 * In the above example, "Gorillas" is selected and its submenu content is
 * being shown on the right. Imagine that the user's cursor is hovering over
 * "Gorillas." When they move their mouse into the "Gorilla Content" area, they
 * may briefly hover over "Chimps." This shouldn't close the "Gorilla Content"
 * area.
 *
 * This problem is normally solved using timeouts and delays. menu-aim tries to
 * solve this by detecting the direction of the user's mouse movement. This can
 * make for quicker transitions when navigating up and down the menu. The
 * experience is hopefully similar to amazon.com/'s "Shop by Department"
 * dropdown.
 *
 * Use like so:
 *
 *      $("#menu").menuAim({
 *          activate: $.noop,  // fired on row activation
 *          deactivate: $.noop  // fired on row deactivation
 *      });
 *
 *  ...to receive events when a menu's row has been purposefully (de)activated.
 *
 * The following options can be passed to menuAim. All functions execute with
 * the relevant row's HTML element as the execution context ('this'):
 *
 *      .menuAim({
 *          // Function to call when a row is purposefully activated. Use this
 *          // to show a submenu's content for the activated row.
 *          activate: function() {},
 *
 *          // Function to call when a row is deactivated.
 *          deactivate: function() {},
 *
 *          // Function to call when mouse enters a menu row. Entering a row
 *          // does not mean the row has been activated, as the user may be
 *          // mousing over to a submenu.
 *          enter: function() {},
 *
 *          // Function to call when mouse exits a menu row.
 *          exit: function() {},
 *
 *          // Selector for identifying which elements in the menu are rows
 *          // that can trigger the above events. Defaults to "> li".
 *          rowSelector: "> li",
 *
 *          // You may have some menu rows that aren't submenus and therefore
 *          // shouldn't ever need to "activate." If so, filter submenu rows w/
 *          // this selector. Defaults to "*" (all elements).
 *          submenuSelector: "*",
 *
 *          // Direction the submenu opens relative to the main menu. Can be
 *          // left, right, above, or below. Defaults to "right".
 *          submenuDirection: "right"
 *      });
 *
 * @see https://github.com/kamens/jQuery-menu-aim
*/
var MOUSE_POSITIONS_TRACKED = 3;

var menuAim = {
  menu: null,
  activeRow: null,
  mousePositions: [],
  lastDelayLocation: null,
  timeoutId: null,
  options: {
    rowSelector: "> li",
    submenuSelector: "*",
    submenuDirection: "right",
    tolerance: 75,
    delay: 300,
    enter: function() {},
    exit: function() {},
    activate: function() {},
    deactivate: function() {},
  },

  resetTimeout: function() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  },

  onMouseMoveDocument: function(e) {
    this.mousePositions.push({ x: e.pageX, y: e.pageY });

    if (this.mousePositions.length > MOUSE_POSITIONS_TRACKED) {
      this.mousePositions.shift();
    }
  },

  onMouseLeaveMenu: function(e) {

    this.resetTimeout();

    // If exitMenu is supplied and returns true, deactivate the
    // currently active row on menu exit.
    if (typeof this.options.exitMenu === 'function' &&  this.options.exitMenu(this)) {
      if (this.activeRow) {
          this.options.deactivate(this.activeRow);
      }

      this.activeRow = null;
    }
  },

  onMouseEnterMenuRow: function(e) {
    this.resetTimeout();

    this.options.enter(e.target);
    this.possiblyActivate(e.target);
  },

  onMouseLeaveMenuRow: function(e) {

      /* https://github.com/kamens/jQuery-menu-aim/pull/29/commits - thanks to magwo */
      this.resetTimeout();
      this.options.exit(e.target);
  },

  onClickMenuRow: function(e) {
    this.activate(e.target);
  },

  /**
   * Activate a menu row.
   */
  activate: function(row) {
    if (row == this.activeRow) {
      return;
    }

    if (this.activeRow) {
      this.options.deactivate(this.activeRow);
    }

    /* https://github.com/kamens/jQuery-menu-aim/pull/33/commits */
    if (!dom.matches(row, this.options.submenuSelector)) {
      this.activeRow = null;
      return;
    }

    this.options.activate(row);
    this.activeRow = row;
  },

  /**
  * Possibly activate a menu row. If mouse movement indicates that we
  * shouldn't activate yet because user may be trying to enter
  * a submenu's content, then delay and check again later.
  */
  possiblyActivate: function(row) {

    var self = this;
    var delay = this.activationDelay();

    if (delay) {
      this.timeoutId = setTimeout(function() {
        self.possiblyActivate(row);
      }, delay);
    } else {
      this.activate(row);
    }
  },

  /**
   * Return the amount of time that should be used as a delay before the
   * currently hovered row is activated.
   *
   * Returns 0 if the activation should happen immediately. Otherwise,
   * returns the number of milliseconds that should be delayed before
   * checking again to see if the row should be activated.
   */
  activationDelay: function() {

    var options = this.options;

    if (!this.activeRow || !dom.matches(this.activeRow, this.options.submenuSelector)) {
      // If there is no other submenu row already active, then
      // go ahead and activate immediately.
      return 0;
    }

    var offset = dom.offset(this.menu),
    menuOuterWidth = dom.outerWidth(this.menu),
    upperLeft = {
        x: offset.left,
        y: offset.top
    },
    upperRight = {
        x: offset.left + menuOuterWidth,
        y: upperLeft.y
    },
    lowerLeft = {
        x: offset.left,
        y: offset.top + dom.outerHeight(this.menu)
    },
    lowerRight = {
        x: offset.left + menuOuterWidth,
        y: lowerLeft.y
    },
    loc = this.mousePositions[this.mousePositions.length - 1],
    prevLoc = this.mousePositions[0];

    if (!loc) {
      return 0;
    }

    if (!prevLoc) {
      prevLoc = loc;
    }

    /* https://github.com/kamens/jQuery-menu-aim/pull/22/commits - thanks to tuckbick */
    // Adjust the corner points to enable tolerance.
    if (options.submenuDirection == "right") {
      upperRight.y -= options.tolerance;
      lowerRight.y += options.tolerance;
    } else if (options.submenuDirection == "left") {
      upperLeft.y -= options.tolerance;
      lowerLeft.y += options.tolerance;
    } else if (options.submenuDirection == "above") {
      upperLeft.x -= options.tolerance;
      upperRight.x += options.tolerance;
    } else if (options.submenuDirection == "below") {
      lowerLeft.x -= options.tolerance;
      lowerRight.x += options.tolerance;
    }

    if (prevLoc.x < offset.left || prevLoc.x > lowerRight.x ||
      prevLoc.y < offset.top || prevLoc.y > lowerRight.y) {

      // If the previous mouse location was outside of the entire
      // menu's bounds, immediately activate.
      return 0;
    }

    if (this.lastDelayLocation &&
      loc.x == this.lastDelayLocation.x && loc.y == this.lastDelayLocation.y) {
      // If the mouse hasn't moved since the last time we checked
      // for activation status, immediately activate.
      return 0;
    }

    // Detect if the user is moving towards the currently activated
    // submenu.
    //
    // If the mouse is heading relatively clearly towards
    // the submenu's content, we should wait and give the user more
    // time before activating a new row. If the mouse is heading
    // elsewhere, we can immediately activate a new row.
    //
    // We detect this by calculating the slope formed between the
    // current mouse location and the upper/lower right points of
    // the menu. We do the same for the previous mouse location.
    // If the current mouse location's slopes are
    // increasing/decreasing appropriately compared to the
    // previous's, we know the user is moving toward the submenu.
    //
    // Note that since the y-axis increases as the cursor moves
    // down the screen, we are looking for the slope between the
    // cursor and the upper right corner to decrease over time, not
    // increase (somewhat counterintuitively).
    function slope(a, b) {
      return (b.y - a.y) / (b.x - a.x);
    }

    var decreasingCorner = upperRight,
    increasingCorner = lowerRight;

    // Our expectations for decreasing or increasing slope values
    // depends on which direction the submenu opens relative to the
    // main menu. By default, if the menu opens on the right, we
    // expect the slope between the cursor and the upper right
    // corner to decrease over time, as explained above. If the
    // submenu opens in a different direction, we change our slope
    // expectations.
    if (options.submenuDirection == "left") {
      decreasingCorner = lowerLeft;
      increasingCorner = upperLeft;
    } else if (options.submenuDirection == "below") {
      decreasingCorner = lowerRight;
      increasingCorner = lowerLeft;
    } else if (options.submenuDirection == "above") {
      decreasingCorner = upperLeft;
      increasingCorner = upperRight;
    }

    var decreasingSlope = slope(loc, decreasingCorner),
    increasingSlope = slope(loc, increasingCorner),
    prevDecreasingSlope = slope(prevLoc, decreasingCorner),
    prevIncreasingSlope = slope(prevLoc, increasingCorner);

    if (decreasingSlope < prevDecreasingSlope &&
      increasingSlope > prevIncreasingSlope) {
      // Mouse is moving from previous location towards the
      // currently activated submenu. Delay before activating a
      // new menu row, because user may be moving into submenu.
      this.lastDelayLocation = loc;
      return options.delay;
    }

    this.lastDelayLocation = null;
    return 0;
  },

};



module.exports = {
  create: function(elems, opts) {

    var self = this;

    // TODO: If element is not an Array (e.g., from `querySelector`), either convert to array or avoid looping
    Array.prototype.forEach.call(elems, function(menu) {
      self.init(menu, opts);
    });

  },

  init: function(menu, opts) {

    var instance = Object.create(menuAim);
    instance.menu = menu;

    // set options on the menu aim object
    opts = opts || {};
    for (var prop in opts) {
      if (opts.hasOwnProperty(prop)) {
        instance.options[prop] = opts[prop];
      }
    }

    menu.addEventListener('mouseleave', function(e) {
      instance.onMouseLeaveMenu(e);
    });

    var children = dom.children(menu, instance.options.rowSelector);

    // TODO: Switch this to event delegation
    for (var i = 0; i < children.length; i++) {
      var row = children[i];

      /* jshint ignore:start */
      row.addEventListener('mouseenter', function(e) {
        instance.onMouseEnterMenuRow(e);
      });
      row.addEventListener('mouseleave', function(e) {
        instance.onMouseLeaveMenuRow(e);
      });
      /* jshint ignore:end */
    }

    document.body.addEventListener('mousemove', function(e) {
      instance.onMouseMoveDocument(e);
    });
  },
};
