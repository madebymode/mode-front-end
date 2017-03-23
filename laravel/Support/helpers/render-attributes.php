<?php

if (!function_exists('renderAttributes')) {
    function renderAttributes(array $attrs, $prefix = '') {

        if (empty($attrs)) {
            return '';
        }

        $keys = array_keys($attrs);

        $attrStrings = [];
        foreach($keys as $key) {
            $attrStrings[] = sprintf('%s%s="%s"', $prefix, $key, addcslashes($attrs[$key], "\""));
        }

        // add an empty space before the full set of attributes
        if (!empty($attrStrings)) {
            array_unshift($attrStrings, "");
        }

        return implode(" ", $attrStrings);
    }
}
