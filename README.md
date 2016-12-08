# MODE Front-end

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
@include css-normalize;
@include css-reset;
```

**Note**: This path assumes you're stylesheet is in `resources/assets/sass/`.

### Variables Needed

- `$breakpoints`: Used by `mq` and `breakpoints` in `base/_responsive.scss`.
  Defaults to `(xs: em(320, 16), sm: em(480, 16), md: em(768, 16), lg: em(980,
  16), xl: em(1200, 16) )`.
- `$font-size`: Used by `em` in `functions/_typography.scss`. Defaults to `16`.
- `$fonts-path`: Used by `font-url` in `functions/_assets.scss`. Defaults to
  `/font`.
- `$images-path`: Used by `image-url` in `functions/_assets.scss`. Defaults to
  `/img`.

### Functions

- Assets
    - `font-url($path)`
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

#### Base CSS

- `css-normalize`
- `css-reset`

#### Generators

- `u-property($property, $alias, $value, [$at-breakpoint])`
- `u-property-directional($property, $alias, $value, [$at-breakpoint])`

#### Helpers

- `clearfix`
- `font-smoothing([$is_bold])`
- `hover([$active-classes...])`
- `invisible-until-active`
- `object-fit([$value])`
- `placeholder`
- `scroll-disabled`
- `scroll`
- `visually-hidden`

#### Responsive

- `mq($breakpoint-name)`
- `breakpoints($name, [$at-breakpoint])`

#### Objects

- `o-icon([$at-breakpoint])`
- `o-icon--size($width, $height, [$at-breakpoint])`
- `o-grid([$at-breakpoint])`
- `o-grid__item([$at-breakpoint])`
- `o-grid--gutters($alias, $size, [$at-breakpoint])`
- `o-media([$at-breakpoint])`
    - `.o-media`
    - `.o-media__figure`
    - `.o-media__body`

#### Utilities

- `u-align-items($value, [$at-breakpoint])`
- `u-align-self($value, [$at-breakpoint])`
- `u-animation($alias, $value, [$at-breakpoint]) { @content; }`
- `u-aspect-ratio($width, $height, [$at-breakpoint])`
- `u-background-color($alias, $value, [$at-breakpoint])`
- `u-background-position($alias, $value, [$at-breakpoint])`
- `u-border($alias, $value, [$at-breakpoint])`
- `u-box-shadow($alias, $value, [$at-breakpoint])`
- `u-color($alias, $value, [$at-breakpoint])`
- `u-content($alias, [$pseudo-element], [$at-breakpoint]) { @content; }`
- `u-depth($z-index, [$at-breakpoint])`
- `u-display($display, [$at-breakpoint])`
- `u-flex-direction($value, [$at-breakpoint])`
- `u-flex-wrap($value, [$at-breakpoint])`
- `u-float($value, [$at-breakpoint])`
- `u-font-size($alias, $value, [$at-breakpoint])`
- `u-font-weight($alias, $value, [$at-breakpoint])`
- `u-height($alias, $value, [$at-breakpoint])`
- `u-hover($alias, [$active-class], [$at-breakpoint]) { @content; }`
- `u-justify-content($value, [$at-breakpoint])`
- `u-margin($alias, $size, [$at-breakpoint])`
- `u-max-height($size, [$at-breakpoint])`
- `u-max-width($size, [$at-breakpoint])`
- `u-min-height($size, [$at-breakpoint])`
- `u-min-width($size, [$at-breakpoint])`
- ~~`u-object-fit($value)`~~
- `u-opacity($value, [$at-breakpoint])`
- `u-order($value, [$at-breakpoint])`
- `u-overflow($value, [$at-breakpoint])`
- `u-padding($alias, $value, [$at-breakpoint])`
- `u-pointer-events($value, [$at-breakpoint])`
- `u-position($size, $out-of, [$at-breakpoint])`
- `u-position($size, $out-of, [$at-breakpoint])`
- `u-small-caps()`
- `u-small-caps([$active-class])`
- `u-small-caps--active([$active-class])`
- `u-small-caps--inactive`
- `u-small-caps--reset([$active-class])`
- `u-small-caps__symbol([$active-class])`
- `u-text-align($value, [$at-breakpoint])`
- `u-text-overflow($value, [$at-breakpoint])`
- `u-text-transform($value, [$at-breakpoint])`
~~- `u-transform($value, [$at-breakpoint])`~~
- `u-vertical-align($value, [$at-breakpoint])`
- `u-visually-hidden([$at-breakpoint])`
- `u-white-space($value, [$at-breakpoint])`
- `u-width($size, $out-of, [$at-breakpoint])`

### Classes

- `.o-grid`
    - `.o-grid__item`
    - `.o-grid--flex`
    - `.o-grid--float`
    - `.o-grid--table`
- `.o-section`
- `.u-object-fit-cover`
- `.u-transform-center`

## JavaScript

Use namespacing to require helper functions in your application:

```
var dom = require('mode-front-end/resources/assets/js/dom/all');
```

### Analytics

- `trackEvent`

### Array

- `filter`
- `inArray`
- `isArray`
- `map`
- `mapObj`
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
- `isInBounds`
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
- `throttle`
- `transitionEvents`

## General

- `menuAim`

## Object

- `extend`

## Shim

- `requestAnimationFrame`

## Typography

- `balanceText`
- `shorten`

## Video

- `youTubeReady`

---

## TODOs

- Better setup (e.g., single command to run like `mode-front-end init`)
    - Update example files
    - Move resources to root directory (avoid really long paths in includes)
    - Make normalize and reset optional via mixins
    - Drop Elixir as a dependency (use generic, reusable gulp tasks instead)
- Document each mixin with examples
- Add markup partials (e.g., ZorroSVG)
- Add JavaScript tests
- Decide on standard style guide library (Hologram, Pattern Lab, etc.)
