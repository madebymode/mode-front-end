<?php
if (!function_exists('meta')) {

    class PageMeta
    {
        protected $entries = [];

        /**
         * Add a meta data entry. Optionally override existing meta data entries.
         *
         * @param string  $name       name attribute for the meta tag
         * @param string  $content    content attribute for the meta tag
         * @param boolean $httpEquiv  boolean for the http-equiv attribute
         * @param boolean $override   true to override a previously set meta data item
         * @param array   $attrs      additional attrs to be placed on the meta tag
         */
        public function add($name, $content, $httpEquiv = false, $override = false, $attrs = []) {

            if (!empty($this->entries[$name]) && !$override) {
                return $this;
            }

            $this->entries[$name] = ['content' => $content, 'http-equiv' => $httpEquiv];
            return $this;
        }

        /**
         * Return a string of the meta tags for display in HTML
         *
         * @param  array  $default Array of meta data to use as the default. e.g: ['description' => ['content' => 'Page Description']]
         * @return string          String of meta tags
         */
        public function render($default = []) {

            $entries = array_merge((array) $default, (array) $this->entries);

            $html = "";
            foreach($entries as $name => $entry) {
                $key = 'name';
                if (stripos($name, "og:") === 0) {
                    $key = 'property';
                } else if (!empty($data['http-equiv'])) {
                    $key = 'http-equiv';
                }

                $html .= sprintf('<meta %s="%s" content="%s">', $key, $name, $entry['content']) . "\n";
            }

            return $html;
        }
    }

    /**
     * Helper function for getting an instance of the meta helper
     * @return \PageMeta
     */
    function meta() {

        static $meta;

        if (!$meta) {
            $meta = new \PageMeta();
        }

        return $meta;
    }
}
