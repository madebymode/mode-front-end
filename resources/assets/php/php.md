---
title: PHP
name: php
category: PHP
hologram: true
---
In your `composer.json`, update the `autoload` key to include the following `files` block:

```json
"files": [
    "./node_modules/mode-front-end/laravel/Support/helpers.php"
]
```

## General

- `fix_widows($text, [$minWords])`
- `render_attributes($attrs, [$prefix])`

## Title
- `title()->append($title)`
- `title()->prepend($title)`
- `title()->setDelimiter($delimiter)`
- `title()->render($reverse = false)`

## Meta
- `meta()->add($name, $content, [$http_equiv = false, [$override = false, [$attrs = []]]])`
- `meta()->render([$default = []])`

## Laravel

- `asset_url($src, [$buildDirectory])`
- `icon($name, [$data])`

## Laravel Blade

- `@icon` (see install notes in `resources/views/elements/icon.blade.php`)
