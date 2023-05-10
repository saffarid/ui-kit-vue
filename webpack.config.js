const path = require('path');
const {merge} = require('webpack-merge');

module.exports = merge(require('./webpack.base'), {
    context: __dirname,

    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: {
            root: 'saffarid-ui-kit',
            amd: 'saffarid-ui-kit',
            commonjs: 'saffarid-ui-kit'
        },
        libraryTarget: 'umd',
    },

    externals: {
        vue: 'vue',
    },
});
