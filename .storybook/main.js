const path = require('path');
module.exports = {
    stories: [
        '../stories/**/*.stories.jsx',
        '../src/**/*.stories.jsx'
    ],
    addons: ['@storybook/addon-actions', '@storybook/addon-knobs', '@storybook/addon-links'],
    webpackFinal: async config => {
        // do mutation to the config
        config.module.rules.push({
            test: /\.(sa|sc|c)ss$/,
            loaders: ['style-loader', 'css-loader', 'sass-loader'],
            include: path.resolve(__dirname, "../")
        })
        return config;
    }
};