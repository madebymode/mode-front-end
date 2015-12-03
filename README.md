# mode-front-end

MODE's front-end toolkit

## Includes

- EditorCongif
- scss-lint config
- Gulp build (using Laravel Elixir)
- Base Sass files
- Base JS (at least, an example JS file)
- Example preview page

## TODOs

- Add markup partials (e.g., ZorroSVG)
- Remove B&B-specific Sass
- Clean up / add generic JS modules

### For B&B project

- `js/_slider.scss` Too complex, not JS-specific. `js-` rules shouldn't have
  any CSS related to them—they should *only* be used by JavaScript to identify
  elements.
