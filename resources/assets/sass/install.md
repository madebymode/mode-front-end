---
title: Install
name: install
category: Getting Started
hologram: true
---
```bash
npm i --save-dev mode-front-end
```

## Config

```bash
npm i --save-dev stylelint-config-property-sort-order-smacss
npm run init-config --prefix ./node_modules/mode-front-end
```

This adds the following config files your project root:

- [EditorConfig](http://editorconfig.org)
- [JSHint config](https://github.com/jshint/jshint)
- [stylelint config](https://stylelint.io)

## Starter Kit

```bash
npm i --save-dev svg4everybody picturefill lazysizes
npm run init-starter-kit --prefix ./node_modules/mode-front-end
```

## Gulp Tasks (via [Elixir](http://laravel.com/docs/elixir))

```
npm i --save-dev gulp gulp-gzip gulp-responsive laravel-elixir laravel-elixir-imagemin laravel-elixir-livereload laravel-elixir-svgstore laravel-elixir-webpack-official webpack
npm run init-gulp --prefix ./node_modules/mode-front-end
```

## Other Common Packages

```bash
npm i --save-dev fontfaceobserver
npm i --save-dev object-fit-images
```
