module.exports = {
    stories: [
        '../stories/**/*.stories.jsx',
        '../src/**/*.stories.jsx'
    ],
    addons: ['@storybook/addon-actions', '@storybook/addon-knobs', '@storybook/addon-links'],
    webpackFinal: async config => {
        // do mutation to the config
        return config;
    },
};