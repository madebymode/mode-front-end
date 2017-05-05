# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [1.3.2] - 2017-05-05

### Changed

- `asset_url` helper to correctly check manifest an all versions of Laravel

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

[Unreleased]: https://github.com/tannerhodges/mode-front-end/compare/v1.3.2...HEAD
[1.3.2]: https://github.com/tannerhodges/mode-front-end/compare/v1.3.0...v1.3.2
[1.3.1]: https://github.com/tannerhodges/mode-front-end/compare/v1.2.1...v1.3.2
[1.2.1]: https://github.com/tannerhodges/mode-front-end/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/tannerhodges/mode-front-end/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/tannerhodges/mode-front-end/compare/v1.0.3...v1.1.0
[1.0.3]: https://github.com/tannerhodges/mode-front-end/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/tannerhodges/mode-front-end/compare/v1.0.0...v1.0.2
[1.0.0]: https://github.com/tannerhodges/mode-front-end/compare/v0.41.0...v1.0.0
[0.41.0]: https://github.com/tannerhodges/mode-front-end/compare/v0.31.0...v0.41.0
[0.31.0]: https://github.com/tannerhodges/mode-front-end/compare/v0.27.0...v0.31.0
[0.27.0]: https://github.com/tannerhodges/mode-front-end/compare/v0.0.1...v0.27.0
