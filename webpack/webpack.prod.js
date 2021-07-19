const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const baseConfig = require('./webpack.base.js');
const path = require('path');


const DIR_PATH = {
    BUILD: path.resolve(__dirname, '../build'),
    SRC: path.resolve(__dirname, '../src'),
};

module.exports = merge(baseConfig, {
    output: {
        path: DIR_PATH.BUILD,
        publicPath: '',
        filename: 'bundle.[hash].js',
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    ecma: 6,
                    mangle: true,
                    compress: {
                        warnings: false,
                        unused: true,
                        dead_code: true,
                        drop_console: true,
                        drop_debugger: true,
                        conditionals: true,
                        evaluate: true,
                        sequences: true,
                        booleans: true,
                    },
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
    },
});
