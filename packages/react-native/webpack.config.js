const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'production',
    entry: path.join(__dirname, 'src/index.ts'),
    target: 'node',
    externals: [
        // nodeExternals()
        'react',
        'react-native',
        'react-native-webview',
        'rxjs',
        'iceteaid-core',
        'iceteaid-type',
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'node_modules/whatwg-url')
                ],
                use: [
                    {
                        loader: 'ts-loader',
                        // options: {
                        //     presets: [
                        //         '@babel/preset-env',
                        //         "@babel/preset-typescript",
                        //         "module:metro-react-native-babel-preset",
                        //     ],
                        //     plugins: [
                        //         "@babel/proposal-class-properties",
                        //         "@babel/proposal-object-rest-spread",
                        //         "@babel/plugin-transform-modules-commonjs"
                        //     ]
                        // }
                    },
                ]
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        library: '',
    },
};
