---
title: Install
name: install
category: Getting Started
hologram: true
---
```bash
yarn add mode-front-end
npm run init-config --prefix ./node_modules/mode-front-end
```

The `init-config` script will install the following in your project root:

- [EditorConfig](http://editorconfig.org/)
- [JSHint config](https://github.com/jshint/jshint)
- [scss-lint config](https://github.com/brigade/scss-lint)

## Starter Kit

```bash
npm run init-starter-kit --prefix ./node_modules/mode-front-end
```

## Gulp Tasks (via [Elixir](http://laravel.com/docs/elixir))

```
yarn add gulp gulp-gzip gulp-responsive laravel-elixir laravel-elixir-imagemin laravel-elixir-livereload laravel-elixir-svgstore laravel-elixir-webpack-official webpack
npm run init-gulp --prefix ./node_modules/mode-front-end
```

## Other Common Packages

```bash
yarn add fontfaceobserver
yarn add lazysizes
yarn add object-fit-images
yarn add picturefill
yarn add svg4everybody
```
