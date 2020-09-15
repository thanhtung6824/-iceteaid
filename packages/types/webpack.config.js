const path = require('path');

module.exports = {
    mode: 'production',
    entry: path.join(__dirname, 'src/index.ts'),
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                exclude: /node_modules/,
                include: path.join(__dirname, 'src'),
                use: [
                    {
                        loader: 'ts-loader',
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
        path: path.join(__dirname, 'dist'),
        libraryTarget: 'umd',
        library: '',
    },
};
