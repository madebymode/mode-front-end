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

## Laravel

- `asset_url($src, [$buildDirectory])`
- `icon($name, [$data])`

## Laravel Blade

- `@icon` (see install notes in `resources/views/elements/icon.blade.php`)
