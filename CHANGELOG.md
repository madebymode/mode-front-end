# CHANGELOG

**TODO**: Note which classes can be converted to mixins.

## 1.0.0

- New install notes
- Update .gitignore
- Add yarn
- Remove extra dependencies (from package.json and README install notes)
- Update gulpfile.js with latest practices
- Replace browserify with webpack
- Add gzip task
- Add svgstore task
- Move responsive-images and gzip to separate gulp-task files
- Replace example files with default app files
- Add new starter kit files
- Add init commands to run on install (e.g., `init-config`)
- Add `@see` docblock annotations
- Remove old `menuAim` comments
- Add placeholder `app.js`
- Reorganize Sass files (core, settings, tools, and generic)
- Add `.c-browser-upgrade` component
- Convert `.o-section` to a mixin
- Add markup examples to grid mixin comments
- Add position mixin placeholder
- Add meta and examples to example page
- Added CHANGELOG

## 0.41.0

Renamed `all.js` files to `index.js` for simpler namespaces:

```js
var dom = require('mode-front-end/resources/assets/js/dom/all');
```

becomes:

```js
var dom = require('mode-front-end/resources/assets/js/dom');
```

## 0.31.0

Converted `.o-grid` styles to mixins:

```scss
@include o-grid;
@include o-grid__item;
```

## 0.27.0

Converted `normalize` and `reset` to mixins:

```scss
@include css-normalize;
@include css-reset;
```

Renamed `.o-grid__cell` to `.o-grid__item` to match standard naming (use "item" as often as possible):

```html
<div class="o-grid__cell"></div>
```

becomes:

```html
<div class="o-grid__item"></div>
```

## Between 0.1.3 and 0.11.2

Change `.o-grid` changes to `display: flex;`, which can cause stretching issues for `img` elements that are direct children of `.o-grid`.
