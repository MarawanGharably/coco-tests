const { parsed: envVars } = require('dotenv').config({ path: `./dotenv/${process.env.APP_ENV}.env` });

let assetPrefix = '/';
let basePath = '';

//Exception for FB only! Features hosted under sub-folders
//BASE_PATH passed here from Dockerfile
if (process.env.APP_ENV === 'feature') {
    assetPrefix = `https://features.obsessvr.com${process.env.BASE_PATH}`;
    basePath = process.env.BASE_PATH;
}

module.exports = {
    distDir: 'build',
    reactStrictMode: false,
    assetPrefix: assetPrefix,
    basePath: basePath,
    trailingSlash: true,
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        const { mode } = config;
        if (!isServer) config.resolve.fallback.fs = false;
        // console.log('>WEBPACK::envVars', envVars);

        return config; // Important: return the modified config
    },
    env: {
        CMS_URL: process.env.CMS_URL,
        WEB_STORE_BUCKET_PATH: process.env.WEB_STORE_BUCKET_PATH,
        API_URL: process.env.API_URL,
        BASE_PATH: process.env.BASE_PATH || false,
    },
    eslint: {
        // Warning: Dangerously allow production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },

    publicRuntimeConfig: {
        API_URL: process.env.API_URL,
        BASE_PATH: process.env.BASE_PATH || false,
    },
};
