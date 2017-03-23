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
 *   'sprite_path' => 'path/to/sprites',
 *   'attributes' => ['data-name' => 'Example Icon'],
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
 * - $sprite_path
 */


$_icon_id = implode('-', ['svg', $icon, uniqid()]);
$_sprite_path = '/img/svg/sprites';

// allow overriding the default sprite path
if (!empty($sprite_path)) {
  $_sprite_path = $sprite_path;
}

$attributes = empty($attributes) ? [] : $attributes;
if (empty($attributes['class'])) {
  $attributes['class'] = [];
}

// ensure the class attribute is an array
if (!is_array($attributes['class'])) {
  $attributes['class'] = [$attributes['class']];
}

// Sprite
$sprite = empty($sprite) ? 'global' : $sprite;

// Class
// class attribute gets merged with a class key on the attributes key.
// this allows all HTML attributes to be rendered with the renderAttributes helper
$class = empty($class) ? [] : [$class];
$attributes['class'] = array_merge($class, $attributes['class']);
array_unshift($attributes['class'], 'o-icon  o-icon--' . pathinfo($icon, PATHINFO_FILENAME));

// convert the class array to a string
$attributes['class'] = implode(" ", $attributes['class']);
?>
<i{!! renderAttributes($attributes) !!}>
  @if (!empty($source))
  {!! $source !!}
  @else
  <svg>
    <use xlink:href="{{ $_sprite_path }}/{{ $sprite }}.svg#{{ $icon }}"></use>
  </svg>
  @endif
</i>
