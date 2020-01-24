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
    path.join(DIR_PATH.SRC, 'index.js'),
  ],
  output: {
    path: DIR_PATH.BUILD,
    // '/' breaks s3 serving in feature branches, so we omit it when building for feature branches
    // * IMPORTANT: need the "" inside the single quotes here.
    publicPath: '',
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
        use: 'babel-loader',
        exclude: /node_modules\/(?!(web-store-modules|auth0-password-policies)\/).*/,
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
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
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
