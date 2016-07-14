# mode-front-end

[![Stories in Ready](https://badge.waffle.io/tannerhodges/mode-front-end.png?label=ready&title=Ready)](https://waffle.io/tannerhodges/mode-front-end)

MODE's front-end toolkit

```
# Install mode-front-end
npm install --save-dev mode-front-end
# Install dependencies
npm install --save-dev browserify browserify-shim gulp gulp-responsive laravel-elixir laravel-elixir-imagemin laravel-elixir-livereload laravel-elixir-svgstore
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
rsync -avz node_modules/mode-front-end/example/assets/ resources/assets/
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

- `$font-size`: Used by `em` in `functions/_typography.scss`. Defaults to `16`.
- `$breakpoints`: Used by `mq` and `breakpoints` in `base/_responsive.scss`.
  Defaults to `(xs: em(320, 16), sm: em(480, 16), md: em(768, 16), lg: em(980,
  16), xl: em(1200, 16) )`.
- `$images-path`: Used by `image-url` in `functions/_assets.scss`. Defaults to
  `/img`.

### Functions

- Assets
    - `image-url($path)`
- Math
    - `strip-unit($value)`
- Strings
    - `explode($string, [$delimiter])`
    - `str-replace($string, $search, [$replace])`
- Fonts
    - `em($pixels, [$context])`
    - `tracking($tracking)`

### Mixins

#### Generators

- `u-property`

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

- `o-media([$at-breakpoint])`
- `o-grid--reverse([$at-breakpoint])`
- `o-grid--gutters($alias, $size, [$at-breakpoint])`
- ~~`overlay-bg($img-width, $img-height, $offset, $overlay-direction, [$is-responsive])`~~

#### Utilities

- `u-depth($depth, [$at-breakpoint])`
- `u-display($display, [$at-breakpoint])`
- `u-height($size, [$at-breakpoint])`
- `u-hidden([$at-breakpoint])`
- `u-margin($alias, $size, [$at-breakpoint])`
- `u-max-width($size, [$at-breakpoint])`
- `u-opacity($opacity, [$at-breakpoint])`
- `u-order($order, [$at-breakpoint])`
- `u-padding($alias, $size, [$at-breakpoint])`
- `u-position($size, $out-of, [$at-breakpoint])`
- `u-position-center()`
- `u-small-caps([$active-class])`
- `u-small-caps__symbol([$active-class])`
- `u-small-caps--inactive`
- `u-small-caps--active([$active-class])`
- `u-small-caps--reset([$active-class])`
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
- ~~`.o-responsive-image`~~
    - ~~`.o-responsive-image__placeholder`~~
    - ~~`.o-responsive-image__image`~~
- `.o-section`

## JavaScript

Use namespacing to require helper functions in your application:

```
var dom = require('mode-front-end/resources/assets/js/dom/all');
```

### Array

- `inArray`
- `map`
- `reduce`

### Browser Detect

- `internetExplorer`
- `ios`
- `fontFeatures`

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

- `animationEvents`
- `clearStack`
- `throttle`
- `transitionEvents`

## General

- `menuAim`

## Shim

- `requestAnimationFrame`

## Typography

- `balanceText`

---

## TODOs

- Make normalize and reset optional via mixins
- Drop Elixir as a dependency (use generic, reusable gulp tasks instead)
- Add markup partials (e.g., ZorroSVG)
- Add JavaScript tests
- Decide on standard style guide library (Hologram, Pattern Lab, etc.)
