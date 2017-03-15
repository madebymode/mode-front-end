# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

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

- [Remove `o-grid__item` mixin](https://github.com/tannerhodges/mode-front-end/commit/702c80db3e691d78fcb72594c4d56ce9365381fe).
- Remove extra dependencies (from package.json and README install notes)
- Remove old `menuAim` comments

## [0.41.0] - 2017-01-18

### Changed

- Renamed `all.js` files to `index.js` for simpler namespaces:
  - For example, `var dom = require('mode-front-end/resources/assets/js/dom/all');` becomes `var dom = require('mode-front-end/resources/assets/js/dom');`.

## [0.31.0] - 2016-09-16

### Changed

- Converted `.o-grid` styles to mixins:
  - `@include o-grid;`
  - `@include o-grid__item;`

## [0.27.0] - 2016-08-25

### Changed

- Converted `normalize` and `reset` to mixins:
  - `@include css-normalize;`
  - `@include css-reset;`
- Renamed `.o-grid__cell` to `.o-grid__item` to match standard naming (using "item" as often as possible).
  - For example, `<div class="o-grid__cell"></div>` becomes `<div class="o-grid__item"></div>`.

[Unreleased]: https://github.com/tannerhodges/mode-front-end/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/tannerhodges/mode-front-end/compare/v0.41.0...v1.0.0
[0.41.0]: https://github.com/tannerhodges/mode-front-end/compare/v0.31.0...v0.41.0
[0.31.0]: https://github.com/tannerhodges/mode-front-end/compare/v0.27.0...v0.31.0
[0.27.0]: https://github.com/tannerhodges/mode-front-end/compare/v0.0.1...v0.27.0
