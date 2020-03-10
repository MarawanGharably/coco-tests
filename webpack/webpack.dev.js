const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

module.exports = merge(baseConfig, {
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
