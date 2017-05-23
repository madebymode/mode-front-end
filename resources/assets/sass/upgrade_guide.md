---
title: Upgrade Guide
name: upgrade_guide
category: Getting Started
hologram: true
---

## Upgrading to 2.0.0 from 1.3.x

Estimated upgrade time: …

### New Browser Support

If your project doesn’t require support for iOS 7, IE 9, or old Android Stock Browsers you can:

- Remove [viewport-units-buggyfill](https://github.com/rodneyrehm/viewport-units-buggyfill)
- Update your [Browserlist config](https://github.com/madebymode/mode-front-end/pull/9/files#diff-b9e12334e9eafd8341a6107dd98510c9) to IE 10+ and iOS 8+

### `$gutter` in `rem`s

For most dimensions (except [media queries](https://zellwk.com/blog/media-query-units/)) we’re beginning to use `rem`s. So, for example, we’ve updated our [default `$gutter` values to `rem`](https://github.com/madebymode/mode-front-end/pull/9/files#diff-cae1573f741c66d839344a54ac976917).

### Object Mixins

To keep our objects consistent, and to make each object’s structure clear, we’ve decided that every object should use separate mixins for its elements. So we’ve brought back the `o-grid__item()` mixin, as well as a few others.

Here are all the objects that require separate element mixins:

#### Grid

```scss
@include o-grid();
@include o-grid__item();
```

#### List

```scss
@include o-list();
@include o-list__item();
```

#### Media

```scss
@include o-media();
@include o-media__figure();
@include o-media__body();
```

#### Table

```scss
@include o-table();
@include o-table__item();
```

#### Video

```scss
@include o-video();
@include o-video__wrapper();
@include o-video__element();
@include o-video__play();
@include o-video__close();
```

### `o-icon()` has `max-height`

If you have any icon elements without an explicit width/height (e.g., using `@include o-icon--size()`), then you may need to double check that the new `max-height: 100%;` style doesn’t accidently resize any of your icons.

If this casues issues, you can override the change by adding `.o-icon { max-height: none; }`.

### `o-list()` resets `padding-left`

In cases where `css-reset()` isn’t used, `o-list()` now sets `padding-left: 0;`.

If this causes issues, you can override the change with a padding utility. For example, `@include u-padding('left-40', rem(40));`.

### List Modifiers

Several changes have been made to the `o-list()` modifiers:

- Rename all plural modifiers to be singular:
  - `o-list--borders()` → `o-list--border()`
  - `o-list--bullets()` → `o-list--bullet()`
  - `o-list--commas()` → `o-list--comma()`
  - `o-list--numbers()` → `o-list--number()`
  - `o-list--slashes()` → `o-list--slash()`
- Rename `o-list--numbers-roman()` to `o-list--roman()`
- Add [`$alias` and `$margin` arguments](https://github.com/madebymode/mode-front-end/pull/9/files#diff-4734d36ce3ff8c2ce853bc92f126617fL25) to `o-list--bullet()`:
  - For example, `@include o-list--bullet();` becomes `@include o-list--bullet('', 1rem);`
- If needed, manually add the [`top: -2px;`](https://github.com/madebymode/mode-front-end/pull/9/files#diff-4734d36ce3ff8c2ce853bc92f126617fL35) removed from `.o-list--bullet > .o-list__item::before`
- If needed, manually add the [`margin-left: -2px;` and the extra space in `content`](https://github.com/madebymode/mode-front-end/pull/9/files#diff-3c374b25d11b32dfd260f25e778fc2d9L31) removed from `.o-list--comma > .o-list__item:not(:last-child)::after`
- Add [`$alias` and `$padding` arguments](https://github.com/madebymode/mode-front-end/pull/9/files#diff-10d94f277aae9faa6caaa1eaad80c702L25) to `o-list--disc()`:
  - For example, `@include o-list--disc();` becomes `@include o-list--disc('', 1rem);`
- If needed, manually add the [`padding-bottom: em(6);`](https://github.com/madebymode/mode-front-end/pull/9/files#diff-10d94f277aae9faa6caaa1eaad80c702L30) removed from `.o-list--disc > .o-list__item`
- If needed, manually remove the [extra space in `content`](https://github.com/madebymode/mode-front-end/pull/9/files#diff-1bd24679b77ee26a111ecbd8582dfbe1L35) removed from `.o-list--slash > .o-list__item`

### `object-fit()` Mixin

`@include object-fit('cover');` requires an argument now, so update any references you had to at least include the default `'cover'` value.

### `.u-object-fit-cover` and `.u-transform-center` Styles

- Replace any `.u-object-fit-cover { … }` styles with the mixin `@include u-object-fit('cover');`
- Replace any `.u-transform-center { … }` styles with the mixin `@include u-transform('center', translate(-50%, -50%));`

### Replace `u-small-caps()`

If your project depends on any of the `u-small-caps` mixins, you’ll need to copy those back into your project from the [source code](https://github.com/madebymode/mode-front-end/blob/v1.3.3/resources/assets/sass/utilities/_small-caps.scss).

Small caps will be overhauled as an object in a future update, so stay tuned.

### `u-content()` Mixin

Replace any `u-content()` references with either `u-content-before()` or `u-content-after()`.

### `u-flex()` Mixin

If you have any custom `.u-flex-*` classes, replace them with the new `u-flex()` mixin:

For example, `.u-flex-1 { … }` becomes `@include u-flex('1', 1);`.

### `u-opacity()` Mixin

Update all `u-opacity()` references so they include an alias:

For example, `@include u-opacity(50);` becomes `@include u-opacity('50', 0.5);`.

### `u-position()` Mixin

Update all `u-position()` references so they include an alias:

For example, `@include u-position(1, 2);` becomes `@include u-position('1/2', percentage(1 / 2));`.

If you have any custom `.u-position-*` classes, do the same.

For example, `.u-position-center { … }` becomes:

```scss
@include u-position('center', absolute) {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

### Width and Height Utilities

- Update all `u-width()` references so they include an alias:
  - For example, `@include u-width(1, 2);` becomes `@include u-width('1/2', percentage(1 / 2));`
- Update all `u-max-height()` references so they include an alias:
  - For example, `@include u-max-height(100);` becomes `@include u-max-height('100', em(100));`
- Update all `u-max-width()` references so they include an alias:
  - For example, `@include u-max-width(100);` becomes `@include u-max-width('100', em(100));`
- Update all `u-min-height()` references so they include an alias:
  - For example, `@include u-min-height(100);` becomes `@include u-min-height('100', em(100));`
- Update all `u-min-width()` references so they include an alias:
  - For example, `@include u-min-width(100);` becomes `@include u-min-width('100', em(100));`

Ideally, you should also update any `em` values to `rem`.

## Upgrading to 1.3.0 from 1.2.x

Estimated upgrade time: 0.5 hour

### Transfer mode-front-end to madebymode account

If you reference the full URL to mode-front-end anywhere, you’ll need to update it to https://github.com/madebymode/mode-front-end/

## Upgrading to 1.0.2 from 0.41.x

Estimated upgrade time: 2–4 hours

### Config Files

- In `.editorconfig` set all markup files to `indent_size = 2`:
  - For example, [`[*.{html,blade.php}] indent_size = 2`](https://github.com/madebymode/mode-front-end/compare/v0.41.0...v1.0.0?diff=unified&name=v1.0.0#diff-1e70daafb475c0ce3fef7d2728279182R12)
- Update [`.gitignore`](https://github.com/madebymode/mode-front-end/compare/v0.41.0...v1.0.0?diff=unified&name=v1.0.0#diff-a084b794bc0759e7a6b77810e01874f2)

### New Build Process

- Use `yarn` to install npm packages
- Update `gulpfile.js` with latest tasks:
  - Replace `responsiveImgs` task with `gulp-tasks/responsive-images.js`
- Replace Browserify with Webpack:
  - `yarn remove browserify browserify-shim laravel-elixir-browserify-official`
  - `yarn add laravel-elixir-webpack-official webpack`
  - [Remove Browserify config](https://github.com/madebymode/mode-front-end/compare/v0.41.0...v1.0.0?diff=unified&name=v1.0.0#diff-b9e12334e9eafd8341a6107dd98510c9L22)
  - Change `mix.browserify(…);` to `mix.webpack(…);`
  - If needed, add a custom `webpack.config.js`

If you want, you can do a clean sweep of all your config and starter kit files by running the new mode-front-end install helpers:

```bash
npm run init-starter-kit --prefix ./node_modules/mode-front-end
npm run init-config --prefix ./node_modules/mode-front-end
yarn add gulp gulp-gzip gulp-responsive laravel-elixir laravel-elixir-imagemin laravel-elixir-livereload laravel-elixir-svgstore laravel-elixir-webpack-official webpack
npm run init-gulp --prefix ./node_modules/mode-front-end
```

Then use `git add -p` to pick which changes you want to commit.

### `.o-section` and `.o-grid` Styles

- Replace any `.o-section { … }` styles with the mixin `@include o-section();`
- Remove all `@include o-grid__item();` mixins (`.o-grid__item` styles are included in `@include o-grid__item();` now)

### `.o-grid__item` Styles

If your styles depend on `.o-grid__item` having a default `display` and `position`, you’ll need to add those styles back:

```css
.o-grid__item {
  display: block;
  position: relative;
}
```

## Upgrading to 0.41.0 from 0.40.x

Estimated upgrade time: 1 hour

### JavaScript Namespaces

- Update any references to `all.js` to `index.js`:
  - For example, `const dom = require('mode-front-end/resources/assets/js/dom/all');` becomes `const dom = require('mode-front-end/resources/assets/js/dom');`

## Upgrading to 0.31.0 from 0.30.x

Estimated upgrade time: 1 hour

### `.o-grid` Styles

- Replace any `.o-grid { … }` styles with the mixin `@include o-grid();`
- Replace any `.o-grid__item { … }` styles with the mixin `@include o-grid__item();`

## Upgrading to 0.27.0 from 0.26.x

Estimated upgrade time: 1–2 hours

### Normalize.css and Reset Styles

- Replace Normalize.css with the mixin `@include css-normalize();`
- Replace reset styles with the mixin `@include css-reset();`

### `.o-grid` Styles

- Rename all `o-grid__cell` references to `o-grid__item`:
  - For example, `<div class="o-grid__cell"></div>` becomes `<div class="o-grid__item"></div>`

We decided to use “item” as a standard element name (e.g., `o-list__item`).
