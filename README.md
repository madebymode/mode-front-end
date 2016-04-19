# mode-front-end

[![Stories in Ready](https://badge.waffle.io/tannerhodges/mode-front-end.png?label=ready&title=Ready)](https://waffle.io/tannerhodges/mode-front-end)

MODE's front-end toolkit

```
# Install mode-front-end
npm install --save-dev mode-front-end
# Install dependencies
npm install --save-dev browserify browserify-shim gulp gulp-responsive laravel-elixir laravel-elixir-hologram laravel-elixir-imagemin laravel-elixir-livereload laravel-elixir-svgstore
# Copy starter files to project
## System files
cp node_modules/mode-front-end/.editorconfig .editorconfig
cp node_modules/mode-front-end/.gitignore .gitignore
cp node_modules/mode-front-end/.jshintrc .jshintrc
cp node_modules/mode-front-end/.scss-lint.yml .scss-lint.yml
## Gulp
cp node_modules/mode-front-end/gulpfile.js gulpfile.js
## Assets
mkdir -p resources/
cp node_modules/mode-front-end/resources/assets/ resources/assets/
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

### Functions

- Math
    - `strip-unit($value)`
- Strings
    - `explode($string, [$delimiter])`
    - `str-replace($string, $search, [$replace])`
- Fonts
    - `em($pixels, [$context])`
    - `tracking($tracking)`

### Mixins

#### Helpers

- `clearfix`
- `hover`
- `visually-hidden`
- `placeholder`
- `scroll`
- `scroll-disabled`

#### Responsive

- `mq($breakpoint-name)`
- `breakpoints($name, [$at-breakpoint])`

#### Objects

- ~~`overlay-bg($img-width, $img-height, $offset, $overlay-direction, [$is-responsive])`~~

#### Utilities

- `u-depth($depth, [$at-breakpoint])`
- `u-display($display, [$at-breakpoint])`
- `u-height($size, [$at-breakpoint])`
- `u-hidden([$at-breakpoint])`
- `u-margin($alias, $size, [$at-breakpoint])`
- `u-opacity($opacity, [$at-breakpoint])`
- `u-order($order, [$at-breakpoint])`
- `u-padding($alias, $size, [$at-breakpoint])`
- `u-position($size, $out-of, [$at-breakpoint])`
- `u-position-center()`
- `u-text-align($alignment, [$at-breakpoint])`
- `u-width($size, $out-of, [$at-breakpoint])`

### Classes

- `.o-grid`
    - `.o-grid__cell`
    - `.o-grid--flex`
    - `.o-grid--float`
    - `.o-grid--table`
    - `.o-grid--center` (applies to flex and table, not float)
    - `.o-grid--nowrap` (applies to flex)
- `.o-responsive-image`
    - `.o-responsive-image__placeholder`
    - `.o-responsive-image__image`
- `.o-section`

## JavaScript

Use namespacing to require helper functions in your application:

```
var dom = require('mode-front-end/resources/assets/js/dom/all');
```

### Array

- `map`
- `inArray`

### DOM

- `childDepth`
- `children`
- `classList`
- `closest`
- `index`
- `isElementInBounds`
- `matches`
- `offset`
- `outerHeight`
- `outerWidth`
- `parents`
- `position`
- `window`

## Event

- `transitionEvents`
- `clearStack`
- `throttle`

## Typography

- `balancetext`

---

## TODOs

- Make CSS reset optional (or create mixins)
- Make responsive image and overlapping optional includes (at least use `@mixin`s instead)
    - If responsive images are included, add lazysizes as a dependency
- Add markup partials (e.g., ZorroSVG)
- Add JavaScript tests
- Either replace Hologram with Pattern Lab or make an option to choose
