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

        if (!empty($data['attributes'])) {
            $attributes = [];

            foreach ($data['attributes'] as $attributeName => $attributeValue) {
                if (empty($attributeValue)) {
                    $attributes[] = $attributeName;
                    continue;
                }
                $attributes[] = sprintf("%s=\"%s\"", $attributeName, addcslashes($attributeValue, '"'));
            }

            $data['attributes'] = $attributes;
        }

        return view('elements.icon', $data)->render();
    }
}
