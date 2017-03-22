# MODE Front-End

MODE’s front-end toolkit. Heavily influenced by [@csswizardy](http://csswizardry.com/)’s [inuitcss](https://github.com/inuitcss/inuitcss) framework.

## Install

```bash
yarn add mode-front-end
npm run init-config --prefix ./node_modules/mode-front-end
```

The `init-config` script will install the following in your project root:

- [EditorCongif](http://editorconfig.org/)
- [JSHint config](https://github.com/jshint/jshint)
- [scss-lint config](https://github.com/brigade/scss-lint)

### Starter Kit

```bash
npm run init-starter-kit --prefix ./node_modules/mode-front-end
```

### Gulp Tasks (via [Elixir](http://laravel.com/docs/elixir))

```
yarn add gulp gulp-gzip gulp-responsive laravel-elixir laravel-elixir-imagemin laravel-elixir-livereload laravel-elixir-svgstore laravel-elixir-webpack-official webpack
npm run init-gulp --prefix ./node_modules/mode-front-end
```

### Other Common Packages

```bash
yarn add fontfaceobserver
yarn add lazysizes
yarn add object-fit-images
yarn add picturefill
yarn add svg4everybody
yarn add viewport-units-buggyfill
```

## Sass

Import `common.scss` into your app’s stylesheet:

```scss
@import '../../../node_modules/mode-front-end/resources/assets/sass/common';
@include css-normalize;
@include css-reset;
```

**Note**: This path assumes you’re stylesheet is in `resources/assets/sass/`.

### Variables Needed

- `$breakpoints`: Used by `mq` and `breakpoints` in `tools/_responsive.scss`.
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
    - `rem($pixels)`
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
  - `.o-grid`
  - `.o-grid__item`
- `o-grid--gutters($alias, $size, [$at-breakpoint])`
- `o-list([$at-breakpoint])`
  - `.o-list`
  - `.o-list__item`
  - `.o-list__counter`
  - `.o-list__content`
- `o-list--bullets([$at-breakpoint])`
- `o-list--commas([$at-breakpoint])`
- `o-list--disc([$at-breakpoint])`
- `o-list--inline([$at-breakpoint])`
- `o-list--leading([$at-breakpoint-zero])`
- `o-list--numbers([$at-breakpoint-roman])`
- `o-list--numbers([$at-breakpoint])`
- `o-list--slashes([$at-breakpoint])`
- `o-media([$at-breakpoint])`
    - `.o-media`
    - `.o-media__figure`
    - `.o-media__body`
- `o-section([$at-breakpoint])`

#### Components

- `c-browser-upgrade()`

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

- `.u-object-fit-cover`
- `.u-transform-center`

## JavaScript

Use namespacing to require helper functions in your application:

```js
var dom = require('mode-front-end/resources/assets/js/dom');
```

### Analytics

- `trackEvent`

### Animation

- `slideDown`
- `slideUp`

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

### Event

- `animationEvents`
- `clearStack`
- `customEvent`
- `debounce`
- `throttle`
- `transitionEvents`

### General

- `menuAim`

### HTTP

- `ajax`

### Object

- `extend`

### Shim

- `requestAnimationFrame`

### Typography

- `balanceText`
- `shorten`

### Video

- `youTubeReady`

## Laravel

### Blade Helpers

- `@icon` (see install notes in `resources/views/elements/icon.blade.php`)

---

## TODO

- [ ] Document each mixin with examples
- [ ] Add markup partials (e.g., ZorroSVG)
- [ ] Switch from [scss-lint](https://github.com/brigade/scss-lint) to either [sass-lint](https://github.com/sasstools/sass-lint) or [stylelint](https://stylelint.io/).
- [ ] Decide on standard style guide library (Hologram, Pattern Lab, etc.)
- [ ] Add JavaScript tests
- [ ] Move resources to root directory (avoid really long paths in includes)
- [ ] Drop Elixir as a dependency (use generic, reusable gulp tasks instead)
