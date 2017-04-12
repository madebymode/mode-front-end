<?php

if (!function_exists('asset_url')) {

// TODO: Either remove dependence on Laravel helpers or include core fallbacks:
// - env
// - elixir
// - base_path
// - public_path

    /**
     * Build a web access path for a given asset based on the environment.
     *
     * 1. Elixir: Check for an [Elixir](https://laravel.com/docs/5.3/elixir) manifest file
     *    and attempt to load the asset from there.
     * 2. Cache Busting: Check for an `ASSET_CACHE_BUSTING` environment variable. If set to true,
     *    add a timestamp to the asset for cache busting.
     * 3. CDN: Check for an `ASSET_CDN_DOMAIN` environment variable. If set to true,
     *    prepend the CDN hostname to the asset.
     *
     * @param  string  $src
     * @param  string  $buildDirectory
     * @return string
     */
    function asset_url($src, $buildDirectory = 'build')
    {
        $path = ltrim(str_replace(public_path(), '', public_path($src)), '/');

        $found_in_manifest = false;

        /**
         * 1. Elixir
         */
        if (file_exists(public_path($buildDirectory . '/rev-manifest.json'))) {
            try {
                $path = elixir($src);
                $found_in_manifest = true;
            } catch (\InvalidArgumentException $e) {}
        }

        /**
         * 2. Cache Busting
         *
         * @note This requires rewrite rules at the `.htaccess` or server level.
         *    Enabling this without the rewrites will result in a 404 for any
         *    assets that use this helper.
         */
        static $cache_ts = null;

        if (env('ASSET_CACHE_BUSTING') && is_null($cache_ts)) {
            // Default cache timestamp
            $cache_ts = time();

            // Get timestamp from deploy file if it exists
            $deploy_ts_file = base_path('.deployts');
            if (file_exists($deploy_ts_file)) {
                $cache_ts = trim(file_get_contents($deploy_ts_file));
            }
        }

        // Only append timestamp if asset wasn't found in a manifest (Elixir appends its own timestamp)
        if (!$found_in_manifest && !empty($cache_ts)) {
            $file_extension = pathinfo($path, PATHINFO_EXTENSION);
            $path = preg_replace('/(' . preg_quote($file_extension) . ')$/', $cache_ts . '.$1', $path);
        }

        /**
         * 3. CDN
         */
        $cdn_domain = rtrim(env('ASSET_CDN_DOMAIN', '/'), '/');

        return $cdn_domain . '/' . ltrim($path, '/');
    }
}
