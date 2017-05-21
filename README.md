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
```

## Sass

Import `common.scss` into your app’s stylesheet:

```scss
@import '../../../node_modules/mode-front-end/resources/assets/sass/common';
@include css-normalize;
@include css-reset;
```

**Note**: This path assumes your stylesheet is in `resources/assets/sass/`.

### Required Variables

- `$breakpoints` : Used by `mq` and `breakpoints` in `tools/_responsive.scss`. Defaults to `(xs: em(320, 16), sm: em(480, 16), md: em(768, 16), lg: em(980, 16), xl: em(1200, 16))`.
- `$font-size`   : Used by `em` in `functions/_typography.scss`. Defaults to `16`.
- `$fonts-path`  : Used by `font-url` in `functions/_assets.scss`. Defaults to `/font`.
- `$images-path` : Used by `image-url` in `functions/_assets.scss`. Defaults to `/img`.

### Functions

- Assets
    - `font-url($path)`
    - `image-url($path)`
- Data URIs
    - `svg($svg, $width, $height)`
- ~~Math~~
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

### Mixins

#### Accessibility

- `hover([$active-classes...])`
- `invisible-until-active([$active-class: 'is-active'])`
- `show-on-focus()`
- `visually-hidden()`

#### Base CSS

- `css-normalize()`
- `css-reset()`

#### Generators

- `u-property($property, $alias, $value, [$at-breakpoint])`
- `u-property-directional($property, $alias, $value, [$at-breakpoint])`

#### Helpers

- `clearfix()`
- `font-smoothing([$is-bold: false])`
- `placeholder()`
- `scroll()`
- `scroll-disabled()`

#### Polyfills

- `object-fit($value)`

#### Responsive

- `add-breakpoint($alias, $value)`
- `breakpoints($class-name, [$at-breakpoint: null])`
- `mq($breakpoint-name)`

## JavaScript

Use namespacing to require helper functions in your application:

```js
const dom = require('mode-front-end/resources/assets/js/dom');
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

- `getYouTubeId`
- `youTubeReady`

## PHP

In your `composer.json`, update the `autoload` key to include the following `files` block:

```json
"files": [
    "./node_modules/mode-front-end/laravel/Support/helpers.php"
]
```

### General

- `fix_widows($text, [$minWords])`
- `render_attributes($attrs, [$prefix])`

### Laravel

- `asset_url($src, [$buildDirectory])`
- `icon($name, [$data])`

### Laravel Blade

- `@icon` (see install notes in `resources/views/elements/icon.blade.php`)

---

## TODO

- [ ] Document Sass core `@function`s and `@mixin`s
- [ ] Switch from [scss-lint](https://github.com/brigade/scss-lint) to either [sass-lint](https://github.com/sasstools/sass-lint) or [stylelint](https://stylelint.io/).
- [ ] Replace LiveReload with BrowserSync
- [ ] Add JavaScript tests
- [ ] Move resources to root directory (avoid really long paths in includes)
- [ ] Drop Elixir as a dependency (use generic, reusable gulp tasks instead)
