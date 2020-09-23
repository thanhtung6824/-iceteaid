const webpackTypes = require('./packages/types/webpack.config');
const webpackCore = require('./packages/core/webpack.config');
const webpackNative = require('./packages/react-native/webpack.config');
const webpackWeb = require('./packages/web/webpack.config');

const {merge} = require('webpack-merge');

const commonConfig = {};

module.exports = env => {
    console.log(env);
    switch (env) {
        case 'types':
            return merge(commonConfig, webpackTypes);
        case 'core':
            return merge(commonConfig, webpackCore);
        case 'react-native':
            return merge(commonConfig, webpackNative);
        case 'web':
            return merge(commonConfig, webpackWeb)
        default:
            throw new Error('No matching configuration was found!');
    }
};
