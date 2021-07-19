const merge = require('webpack-merge');
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
    devServer: {
        contentBase: './build',
        historyApiFallback: true,
        hot: true,
        host: '0.0.0.0',
        port: 3000,
        open: true,
    },
    devtool: 'source-map',
});
