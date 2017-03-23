<?php

if (!function_exists('icon')) {

    /**
     * Render icons.
     * @param  string $name
     * @param  array  $data
     * @return string
     */
    function icon($name = '', array $data = [])
    {
        $data['sprite'] = empty($data['sprite']) ? 'global' : $data['sprite'];
        $data['icon'] = $name;

        // check if the name contains the base path. If so, assume it's the full path
        // to a file and load it's source.
        if (stripos($name, base_path()) !== false && file_exists($name)) {
            $data['source'] = file_get_contents($name);
        }

        return view('elements.icon', $data)->render();
    }
}
