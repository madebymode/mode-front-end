<?php
/*doc
---
title: Icon PHP
name: icon-php
category: PHP
---
## Install

Make sure you've updated your `composer.json` to autoload MODE Front-End's PHP helpers (see README.md for details).

In `config/app.php`, add the `IconServiceProvider`:

```php
// Application Service Providers...
App\Providers\IconServiceProvider::class,
```

Then copy the service provider and the template and update the autoloader:

```bash
# Provider
cp node_modules/mode-front-end/laravel/Providers/IconServiceProvider.php app/Providers/IconServiceProvider.php
# Template
mkdir -p resources/views/elements
cp node_modules/mode-front-end/resources/views/elements/icon.blade.php resources/views/elements/icon.blade.php
# Autoloader
php artisan optimize
```

## Markup

```php
Example:
@icon('mode-logo')

Example with verbose options:
@icon('mode-logo', [
  'sprite'      => 'global',
  'sprite_path' => '/img/svg/sprites',
  'class'       => 'u-display-block  /  u-text-align-center',
  'attributes'  => ['data-name' => 'Example Icon'],
])

Example with inline source:
@icon('/img/svg/mode-logo.svg')
```

## Variables

Required:

- $icon
- $sprite

Optional:

- $sprite_path
- $class
- $attributes
- $source
*/

// PRIVATE
// $_icon_id = implode('-', ['svg', $icon, uniqid()]);

// DEFAULTS
$sprite = empty($sprite) ? 'global' : $sprite;
$sprite_path = empty($sprite_path) ? '/img/svg/sprites' : $sprite_path;
$class = 'o-icon  o-icon--' . pathinfo($icon, PATHINFO_FILENAME) . (empty($class) ? '' : $class);

// OPTIONS
$attributes = empty($attributes) ? [] : $attributes;
$attributes['class'] = empty($attributes['class']) ? $class : ($class . ' ' . $attributes['class']);

// OUTPUT
echo '<i' . render_attributes($attributes) . '>';
echo !empty($source) ? $source : '<svg><use xlink:href="' . $sprite_path . '/' . $sprite . '.svg#' . $icon . '"></use></svg>';
echo '</i>';
