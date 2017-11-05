const path = require('path');
const {
    IgnorePlugin
} = require('webpack');

module.exports = {
    entry: './index',
    output: {
        library: 'LeagueHomework',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist'),
        filename: 'LeagueHomework.js'
    },
    plugins: [
        new IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            'babel-preset-es2015',
                            'babel-preset-es2016'
                        ]
                    }
                }
            }
        ]
    }
};
