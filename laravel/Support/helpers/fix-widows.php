<?php

if (!function_exists('fix_widows')) {
    function fix_widows($text, $minWords = 2) {

        $words = preg_split('/\s+/', $text);
        $textLength = count($words);

        if (count($words) > $minWords) {
            $widows = implode('&nbsp;', array_splice($words, $minWords * -1));
        }

        return trim(implode(' ', $words) . ' ' . $widows);
    }
}
