# mode-front-end

[![Stories in Ready](https://badge.waffle.io/tannerhodges/mode-front-end.png?label=ready&title=Ready)](https://waffle.io/tannerhodges/mode-front-end)

MODE's front-end toolkit

```
npm install --save-dev mode-front-end
```

## Includes

- EditorCongif
- scss-lint config
- Gulp build (using Laravel Elixir)
- Base Sass files
- Base JS (at least, an example JS file)
- Example preview page

## Sass

Import `common.scss` into your app's stylesheet:

```
@import '../../../node_modules/mode-front-end/resources/assets/sass/common';
```

**Note**: This path assumes you're stylesheet is in `resources/assets/sass/`.

### Variables Needed

- `$font-size`: Used by `em` in `base/_functions.scss`. Defaults to `16`.
- `$breakpoints`: Used by `mq` and `breakpoints` in `base/_responsive.scss`.
  Defaults to `(xs: em(320, 16), sm: em(480, 16), md: em(768, 16), lg: em(980,
  16), xl: em(1200, 16) )`.

### Mixins

#### Helpers

- `clearfix`
- `hover`
- `visuallyhidden`
- `scroll`
- `scroll-disabled`

#### Responsive

- `mq($breakpoint-name)`
- `breakpoints($name, [$at-breakpoint])`

#### Objects

- ~~`overlay-bg($img-width, $img-height, $offset, $overlay-direction, [$is-responsive])`~~

#### Utilities

- `u-align($alignment, [$at-breakpoint])`
- `u-depth($depth, [$at-breakpoint])`
- `u-gutter($gutter, $gutter-val, [$at-breakpoint])`
- `u-height($size, [$at-breakpoint])`
- `u-opacity($opacity, [$at-breakpoint])`
- `u-order($order, [$at-breakpoint])`
- `u-position($size, $out-of, [$at-breakpoint])`
- `u-position-center()`
- `u-hidden([$at-breakpoint])`
- `u-display($display, [$at-breakpoint])`
- `u-width($size, $out-of, [$at-breakpoint])`

---

## TODOs

- Add markup partials (e.g., ZorroSVG)
- Remove B&B-specific Sass
- Clean up / add generic JS modules
