/*doc
---
title: JavaScript
name: javascript
category: JavaScript
---
Use namespacing to require helper functions in your application:

```js
var dom = require('mode-front-end/resources/assets/js/dom');
```

## Analytics

- `trackEvent`

## Animation

- `slideDown`
- `slideUp`

## Array

- `filter`
- `inArray`
- `isArray`
- `map`
- `mapObj`
- `reduce`

## Browser Detect

- `internetExplorer`
- `ios`
- `fontFeatures`

## DOM

- `childDepth`
- `children`
- `classList`
- `closest`
- `getIndex`
- `isInBounds`
- `isInViewport`
- `isVisible`
- `matches`
- `offset`
- `outerHeight`
- `outerWidth`
- `parents`
- `position`
- `ResizeSensor`
- `Visibility`
- `window`

## Event

- `animationEvents`
- `clearStack`
- `customEvent`
- `debounce`
- `on`
- `throttle`
- `transitionEvents`

## General

- `menuAim`

## HTTP

- `ajax`

## Object

- `extend`

## Shim

- `requestAnimationFrame`

## Time

- `daysSince`

## Typography

- `balanceText`
- `shorten`

## Video

- `getYouTubeId`
- `youTubeReady`
*/
module.exports = (function() {
  return {
    analytics: require('./analytics'),
    animation: require('./animation'),
    array: require('./array'),
    browserDetect: require('./browserDetect'),
    dom: require('./dom'),
    event: require('./event'),
    form: require('./form'),
    general: require('./general'),
    https: require('./http'),
    object: require('./object'),
    shim: require('./shim'),
    typography: require('./typography'),
    video: require('./video')
  };
})();
