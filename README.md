# mode-front-end

MODE's front-end toolkit

## Includes

- EditorCongif
- scss-lint config
- Gulp build (using Laravel Elixir)
- Base Sass files
- Base JS (at least, an example JS file)
- Example preview page

## Sass

### Variables Needed

$font-size
Defaults to 16
Used by `em` function
base/_functions.scss

$breakpoints
Defaults to (
  xs: em(320, 16),
  sm: em(480, 16),
  md: em(768, 16),
  lg: em(980, 16),
  xl: em(1200, 16)
)
Used by `mq` and `breakpoints`
base/_responsive.scss

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

### For B&B project

- `js/_slider.scss` Too complex, not JS-specific. `js-` rules shouldn't have
  any CSS related to them—they should *only* be used by JavaScript to identify
  elements.
