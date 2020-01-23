const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

module.exports = () => {
  const betaConfig = merge(baseConfig, {
    devtool: 'source-map'
  });

  return betaConfig;
};