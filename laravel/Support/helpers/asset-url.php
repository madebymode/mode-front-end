<?php
if (!function_exists('asset_url')) {

    /**
     * build web accessible asset path for a given asset. It will check
     * for an elixir manifest file and attempt to load the asset from there.
     * If one is not available, it will fallback to using a timestamp for cache
     * busting if the ASSET_CACHE_BUSTING environment variable is set to true. Additionally,
     * it will prepend a CDN hostname if one is defined using the ASSET_CDN_DOMAIN variable
     *
     * build a web access asset path depending on the environment.
     * in production, this function will use the build in elixir()
     * helper that uses asset versioning.
     */
    function asset_url($src, $buildDirectory = 'build') {

        static $cachets = null;

        // check if asset cache busting is enabled. This is primarily done because cache busting
        // requires rewrites and the .htaccess or server level. enabling this without the rewrites
        // would result in a 404 for any assets that use this helper
        if (env('ASSET_CACHE_BUSTING')) {
            if (is_null($cachets)) {
                // set a default cache timestamp in case a deployment timestamp isn't available
                $cachets = time();
                $deploytsFile = base_path('.deployts');
                if (file_exists($deploytsFile)) {
                    $cachets = trim(file_get_contents($deploytsFile));
                }
            }
        }

        $cdnDomain = rtrim(env('ASSET_CDN_DOMAIN', '/'), '/');

        $path = ltrim(str_replace(public_path(), '', public_path($src)), '/');

        // attempt to load the file from the asset manifest from elixir.
        // prevent any errors if the asset isn't found.
        $foundInManifest = false;
        if (file_exists(public_path($buildDirectory . '/rev-manifest.json'))) {
            try {
                $path = elixir($src);
                $foundInManifest = true;
            } catch (\InvalidArgumentException $e) {
            }
        }

        // append a cache busting timestamp if the asset wasn't found in a manifest
        if (!$foundInManifest && !empty($cachets)) {
            $fileExtension = pathinfo($path, PATHINFO_EXTENSION);
            $path = preg_replace('/(' . preg_quote($fileExtension) . ')$/', $cachets . '.$1', $path);
        }

        return $cdnDomain . '/' . ltrim($path, '/');
    }
}
