const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { envKeys } = require('../dotenv/config');

const DIR_PATH = {
    BUILD: path.resolve(__dirname, '../build'),
    SRC: path.resolve(__dirname, '../src'),
};

const config = {
    entry: [
        path.join(DIR_PATH.SRC, 'index.jsx'),
    ],
    output: {
        path: DIR_PATH.BUILD,
        publicPath: '/',
        filename: 'bundle.[hash].js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[hash].css',
        }),
        new webpack.DefinePlugin(envKeys),
        new HtmlWebpackPlugin({
            template: `${DIR_PATH.SRC}/index.html`,
            filename: `${DIR_PATH.BUILD}/index.html`,
            inject: 'defer',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(png|jpg|gif|svg|eot|otf|ttf|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000,
                    },
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(vert|frag)$/,
                use: 'raw-loader',
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.scss'],
    },
};

module.exports = config;
