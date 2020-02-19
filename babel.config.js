module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@emotion/babel-preset-css-prop',
    ],
    plugins: [
        '@babel/plugin-syntax-dynamic-import',
        [
            'transform-react-remove-prop-types',
            {
                mode: 'remove',
                removeImport: 'true',
                ignoreFilenames: [
                    'node_modules',
                ],
            },
        ],
        [
            '@babel/plugin-proposal-class-properties',
            {
                loose: true,
            },
        ],
        '@babel/plugin-transform-runtime',
    ],
};
