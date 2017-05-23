---
title: Sass
name: sass
category: Sass
hologram: true
---
Import `common.scss` into your app’s stylesheet:

```scss
@import '../../../node_modules/mode-front-end/resources/assets/sass/common';
@include css-normalize();
@include css-reset();
```

**Note**: This path assumes your stylesheet is in `resources/assets/sass/`.

## Required Variables

- `$breakpoints` : Used by `mq` and `breakpoints` in `tools/_responsive.scss`. Defaults to `(xs: em(320, 16), sm: em(480, 16), md: em(768, 16), lg: em(980, 16), xl: em(1200, 16))`.
- `$font-size`   : Used by `em` in `functions/_typography.scss`. Defaults to `16`.
- `$fonts-path`  : Used by `font-url` in `functions/_assets.scss`. Defaults to `/font`.
- `$images-path` : Used by `image-url` in `functions/_assets.scss`. Defaults to `/img`.

## Functions

- Assets
    - `font-url($path)`
    - `image-url($path)`
- Data URIs
    - `svg($svg, $width, $height)`
- <s>Math</s>
- Strings
    - `escape-selector($selector)`
    - `explode($string, [$delimiter: ''])`
    - `str-replace($string, $search, [$replace: ''])`
    - `to-string($value)`
- Typography
    - `tracking($tracking)`
- Units
    - `em($pixels, [$context: $font-size])`
    - `rem($pixels)`
    - `strip-unit($value)`

## Mixins

### Accessibility

- `hover([$active-classes...])`
- `invisible-until-active([$active-class: 'is-active'])`
- `show-on-focus()`
- `visually-hidden()`

### Base CSS

- `css-normalize()`
- `css-reset()`

### Generators

- `u-property($property, $alias, $value, [$at-breakpoint])`
- `u-property-directional($property, $alias, $value, [$at-breakpoint])`

### Helpers

- `clearfix()`
- `font-smoothing([$is-bold: false])`
- `placeholder()`
- `scroll()`
- `scroll-disabled()`

### Polyfills

- `object-fit($value)`

### Responsive

- `add-breakpoint($alias, $value)`
- `breakpoints($class-name, [$at-breakpoint: null])`
- `mq($breakpoint-name)`
