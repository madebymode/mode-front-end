<?php
/**
 * ## App Config
 *
 * In `config/app.php`:
 *
 * ```php
 * // Application Service Providers...
 * App\Providers\IconServiceProvider::class,
 * ```
 *
 * In `composer.json`:
 *
 * ```php
 * "autoload": {
 *     "files": [
 *         "app/Support/helpers.php"
 *     ]
 * }
 * ```
 *
 * Then copy the helper functions, the service provider, and update the autoloader:
 *
 * ```bash
 * # Provider
 * cp node_modules/mode-front-end/laravel/Providers/IconServiceProvider.php app/Providers/IconServiceProvider.php
 * # Helper
 * mkdir -p app/Support/helpers
 * cp node_modules/mode-front-end/laravel/Support/helpers.php app/Support/helpers.php
 * cp node_modules/mode-front-end/laravel/Support/helpers/icon.php app/Support/helpers/icon.php
 * # View
 * mkdir -p resources/views/elements
 * cp node_modules/mode-front-end/resources/views/elements/icon.blade.php resources/views/elements/icon.blade.php
 * # Autoloader
 * php artisan optimize
 * ```
 *
 * ## Markup
 *
 * ```php
 * Example:
 * @icon('mode-logo')
 *
 * Example with verbose options:
 * @icon('mode-logo', [
 *   'sprite' => 'global',
 *   'class' => 'u-display-block  /  u-text-align-center',
 *   'attributes' => ['data-name' => 'Example Icon']
 * ])
 * ```
 *
 * ## Variables
 *
 * Required:
 *
 * - $icon
 * - $sprite
 *
 * Optional:
 *
 * - $class
 * - $attributes
 */

$class = empty($class) ? [] : [$class];
array_unshift($class, 'o-icon  o-icon--' . $icon);
$class = implode('  /  ', $class);

$attributes = empty($attributes) ? [] : $attributes;
$attributes = implode(' ', $attributes);

?><i class="{{ $class }}" {!! $attributes !!}>
  <svg>
    <use xlink:href="{{ asset('img/svg/sprites/' . $sprite . '.svg') . '#' . $icon }}"></use>
  </svg>
</i>
