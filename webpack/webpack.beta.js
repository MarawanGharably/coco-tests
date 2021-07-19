const merge = require('webpack-merge');
const baseConfig = require('./webpack.develop.js');
const path = require('path');


const DIR_PATH = {
    BUILD: path.resolve(__dirname, '../build'),
    SRC: path.resolve(__dirname, '../src'),
};


module.exports = merge(baseConfig, {
    devtool: 'source-map',
    output: {
        path: DIR_PATH.BUILD,
        publicPath: '',
        filename: 'bundle.[hash].js',
    },
});
