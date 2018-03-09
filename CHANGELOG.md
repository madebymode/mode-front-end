# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com) and this project adheres to [Semantic Versioning](http://semver.org).

## [Unreleased]

## [2.11.3] - 2018-03-09

### Added

- Set `.python-version` to 2.7.14 for [pyenv](https://github.com/pyenv/pyenv) so Python 3 doesn't cause `npm i` to fail

### Changed

- Description for `breakpoints()` mixin

### Removed

- `yarn.lock`

## [2.11.0] - 2017-10-31

### Changed

- Added `$duration` option to `invisible-until-active()` mixin

## [2.10.0] - 2017-10-26

### Added

- Page title and metadata helpers

## [2.9.0] - 2017-09-21

### Added

- Touch helper, `hasTouched`

### Fixed

- Reset list-style for `o-list` and modifiers (for projects not using the standard reset styles)

## [2.8.1] - 2017-09-21

### Fixed

- Escape special characters (e.g., %) to prevent SVG data URIs breaking in IE
- Add `undefined` to all module functions

## [2.8.0] - 2017-09-01

### Fixed

- Fix naming conflicts in on helper (or at least, try to)
- Fix `isInViewport` failing when element is null
- Drop `let` and `const` for builds that don't support ES6

## [2.7.0] - 2017-08-28

### Added

- Add `chrome.getVersion()` helper

## [2.6.3] - 2017-08-10

### Added

- Add `on` helper for event delegation
- Add `daysSince` helper

### Changed

- Add latest `.gitignore` files from Laravel 5.4.32
- Move included JS packages to Starter Kit install script

## [2.5.3] - 2017-08-09

### Added

- Add `u-line-height()` utility

## [2.4.0] - 2017-06-08

### Changed

- Added company-themed styles
- Added [stylelint](https://stylelint.io) rules

## [2.3.0] - 2017-06-05

### Changed

- Replace [scss-lint](https://github.com/brigade/scss-lint) with [stylelint](https://stylelint.io)

## [2.2.0] - 2017-06-01

### Changed

- Refactor `u-object-fit()` so it allows flexible alias/value combinations (like `u-position()`)

## [2.1.0] - 2017-05-31

### Added

- Add `get-max-width-breakpoint()` function

### Changed

- Add `btwn-*-and-*` alias for `mq()`

### Fixed

- Fix "EditorConfig" typo in README

## [2.0.0] - 2017-05-23

### Added

- Add [Hologram](https://github.com/trulia/hologram) for generating docs
- [Docs for CSS objects, components, and utilities](https://madebymode.github.io/mode-front-end)
- [Upgrade Guide](http://mode-front-end.app/index.html#upgrade_guide)
- Add `devDependencies` in `package.json`
- Add `escape-selector()` function
- Add `to-string()` function
- Add `add-breakpoint()` mixin
- Add `o-table()` object
- Add `o-video()` object + video player script
- Add utilities: `u-flex()`, `u-clearfix()`, `u-object-fit()`, `u-font-family()`, `u-font-style()`, `u-transform()`, `u-user-select()`
- caniuse.com link for `requestAnimationFrame` polyfill
- Starter kit objects and utilities
- Starter kit `app.js`
- Add `webpack.config.js`

### Removed

- Remove [viewport-units-buggyfill](https://github.com/rodneyrehm/viewport-units-buggyfill) as its not needed for last 2 versions of modern browsers anymore
- Temporarily remove `u-small-caps()` mixins (plan to repurpose as an object)
- Remove `.u-object-fit-cover` and `.u-transform-center` classes (moved to mixins)
- Remove `public/index.php` (replaced with Hologram docs)
- Remove old sub/sup reset CSS
- Remove old img-transparent folder

### Changed

- Autoprefixer Browserlist to defaults plus IE 10+ and iOS 8+
- Reorganize Sass functions (e.g., move `strip-unit()` to Units)
- Reorganize Sass mixins (e.g., Accessibility)
- Set all variables in settings as `!default`
- Set all `$gutter` values to `rem` units
- Simplify `clearfix()` mixin
- Make `object-fit()` arguments required
- Set `overflow: scroll;` so `scroll()` mixin allows horizontal scrolling
- Use separate mixins for all object elements by default (modifiers can override elements, though)
- Set `max-height: 100%;` for `o-icon()`
- Set `padding-left: 0;` for `o-list()`
- Rename `o-list--*` modifiers to be singular:
  - `o-list--borders()` → `o-list--border()`
  - `o-list--bullets()` → `o-list--bullet()`
  - `o-list--commas()` → `o-list--comma()`
  - `o-list--numbers()` → `o-list--number()`
  - `o-list--slashes()` → `o-list--slash()`
- Rename `o-list--numbers-roman()` to `o-list--roman()`
- Simplify and add configurable params for `o-list--bullet()` and `o-list--disc()`
- Add space before slash in `o-list--slash()` content
- Move `c-browser-upgrade()` to index partial
- Move flex utilities to separate partials (e.g., `align-items` and `align-self`)
- Break up `u-content()` mixin into two: `u-content-before()` and `u-content-after()`
- Refactor utilities so they allow flexible alias/value combinations: `u-max-height()`, `u-max-width()`, `u-min-height()`, `u-min-width()`, `u-opacity()`, `u-position()`, `u-width()`
- Rename JS `browser-detect` to camelCase: `browserDetect`
- Make starter kit PHP 2 spaces
- Capitalize "MODE Front-End"
- Update Required Variables in README
- Move Utilities notes from README to Hologram docs
- Update TODOs in README

### Fixed

- Fix `hover()` mixin incorrectly generating selectors for multiple active classes
- Update `u-hover()` mixin so it allows multiple active classes as a map value
- Fix `u-property-directional()` incorrectly handling aliases with dashes (e.g., `top-gray-3`)
- Fix `u-property` generators so they allow classes with special characters (use `escape-characters()` in `breakpoints()`)
- Add required media type so `mq()` generates valid CSS media queries
- Fix GitHub URL (madebymode instead of tannerhodges)
- Fix "you’re" typo in README

## [1.3.3] - 2017-05-09

### Added

- MODE favicons

### Fixed

- Fix asset helper in Laravel 5.4
- Typos and notes

## [1.3.0] - 2017-04-25

### Added

- Add `getYouTubeId` helper

## [1.2.1] - 2017-04-12

### Changed

- Transfer mode-front-end to madebymode account

## [1.2.0] - 2017-04-12

### Added

- PHP helpers:
  - `render_attributes`
  - `asset_url`
  - `fix_widows`

### Changed

- Simplify icon helper
- Make `$name` required for icon helper
- Use `snake_case` for PHP helper methods

## [1.1.0] - 2017-03-21

### Fixed

- Fix legacy grid item mixin in starter kit
- Fix broken list imports
- Fix starter SVG sprite task failing (move starter SVGs to `global` folder)

### Added

- Syntax highlighting in README
- Add example markup to starter kit (replaces default Laravel welcome view)
- Add more utility helpers (e.g., display) to starter kit
- `@icon` Blade helper (see install notes in `resources/views/elements/icon.blade.php`)

### Changed

- Replace starter kit SVGs with single MODE logo file

### Removed

- Delete unused `svg-mask` images

## [1.0.3] - 2017-03-21

### Added

- `o-list` mixins

## [1.0.2] - 2017-03-16

### Changed

- Remove default display/position from `.o-grid__item`
- Update changelog notes w/ footnote links
- Update todos in README

## [1.0.0] - 2017-03-15

### Added

- New install notes and commands:
  - `init-config`
- New starter kit files
- `yarn.lock`
- gulp tasks:
  - `gzip`
  - `svgstore`
- `@see` docblock annotations
- Add `.c-browser-upgrade` component
- Add markup examples to grid mixin comments
- Add position mixin placeholder
- Add meta and examples to example page
- Added CHANGELOG

### Changed

- `.gitignore`
- Update `gulpfile.js` with latest practices
- Replace Browserify with Webpack
- Move responsive-images and gzip to separate gulp-task files
- Replace example files with default app files
- Reorganize Sass files (core, settings, tools, and generic)
- Convert `.o-section` to a mixin

### Removed

- [Remove `o-grid__item` mixin](https://github.com/madebymode/mode-front-end/commit/702c80db3e691d78fcb72594c4d56ce9365381fe).
- Remove extra dependencies (from package.json and README install notes)
- Remove old `menuAim` comments

## [0.41.0] - 2017-01-18

### Changed

- Renamed `all.js` files to `index.js` for simpler namespaces:
  - For example, `const dom = require('mode-front-end/resources/assets/js/dom/all');` becomes `const dom = require('mode-front-end/resources/assets/js/dom');`

## [0.31.0] - 2016-09-16

### Changed

- Converted `.o-grid` styles to mixins:
  - `@include o-grid();`
  - `@include o-grid__item();`

## [0.27.0] - 2016-08-25

### Changed

- Converted `normalize` and `reset` to mixins:
  - `@include css-normalize();`
  - `@include css-reset();`
- Renamed `.o-grid__cell` to `.o-grid__item` to match standard naming (using "item" as often as possible)
  - For example, `<div class="o-grid__cell"></div>` becomes `<div class="o-grid__item"></div>`

[Unreleased]: https://github.com/madebymode/mode-front-end/compare/v2.11.3...HEAD
[2.11.3]: https://github.com/madebymode/mode-front-end/compare/v2.11.0...v2.11.3
[2.11.0]: https://github.com/madebymode/mode-front-end/compare/v2.10.0...v2.11.0
[2.10.0]: https://github.com/madebymode/mode-front-end/compare/v2.9.0...v2.10.0
[2.9.0]: https://github.com/madebymode/mode-front-end/compare/v2.8.1...v2.9.0
[2.8.1]: https://github.com/madebymode/mode-front-end/compare/v2.8.0...v2.8.1
[2.8.0]: https://github.com/madebymode/mode-front-end/compare/v2.7.0...v2.8.0
[2.7.0]: https://github.com/madebymode/mode-front-end/compare/v2.6.3...v2.7.0
[2.6.3]: https://github.com/madebymode/mode-front-end/compare/v2.5.3...v2.6.3
[2.5.3]: https://github.com/madebymode/mode-front-end/compare/v2.4.0...v2.5.3
[2.4.0]: https://github.com/madebymode/mode-front-end/compare/v2.3.0...v2.4.0
[2.3.0]: https://github.com/madebymode/mode-front-end/compare/v2.2.0...v2.3.0
[2.2.0]: https://github.com/madebymode/mode-front-end/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/madebymode/mode-front-end/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/madebymode/mode-front-end/compare/v1.3.3...v2.0.0
[1.3.3]: https://github.com/madebymode/mode-front-end/compare/v1.3.0...v1.3.3
[1.3.0]: https://github.com/madebymode/mode-front-end/compare/v1.2.1...v1.3.0
[1.2.1]: https://github.com/madebymode/mode-front-end/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/madebymode/mode-front-end/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/madebymode/mode-front-end/compare/v1.0.3...v1.1.0
[1.0.3]: https://github.com/madebymode/mode-front-end/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/madebymode/mode-front-end/compare/v1.0.0...v1.0.2
[1.0.0]: https://github.com/madebymode/mode-front-end/compare/v0.41.0...v1.0.0
[0.41.0]: https://github.com/madebymode/mode-front-end/compare/v0.31.0...v0.41.0
[0.31.0]: https://github.com/madebymode/mode-front-end/compare/v0.27.0...v0.31.0
[0.27.0]: https://github.com/madebymode/mode-front-end/compare/v0.0.1...v0.27.0
