<?php

if (!function_exists('icon')) {

// TODO: Either remove dependence on Laravel helpers or include core fallbacks:
// - base_path
// - view

    /**
     * Render icons.
     * @param  string  $name
     * @param  array   $data
     * @return string
     */
    function icon($name, array $data = [])
    {
        $data['sprite'] = empty($data['sprite']) ? 'global' : $data['sprite'];
        $data['icon'] = $name;

        // Load the file's source when `$name` contains the full path of a file
        if (stripos($name, base_path()) !== false && file_exists($name)) {
            $data['source'] = file_get_contents($name);
        }

        return view('elements.icon', $data)->render();
    }
}
