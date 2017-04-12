<?php

if (!function_exists('render_attributes')) {

    /**
     * Get string from array of HTML attributes.
     * @param  array   $attrs
     * @param  string  $prefix
     * @return string
     */
    function render_attributes(array $attrs, $prefix = '')
    {
        if (empty($attrs)) {
            return '';
        }

        $attrStrings = [];
        foreach(array_keys($attrs) as $key) {
            $attrStrings[] = sprintf('%s%s="%s"', $prefix, $key, addcslashes($attrs[$key], '"'));
        }

        return ' ' . implode(' ', $attrStrings);
    }
}
