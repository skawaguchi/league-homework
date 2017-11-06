const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    entry: './src/sandbox-client/index.js',
    module: {
        loaders: [
            {
                loader: 'handlebars-loader',
                test: /\.hbs$/
            }
        ],
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    output: {
        filename: 'sandbox-client.bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/sandbox-client/index.hbs',
            title: 'League Homework - Sandbox Client'
        })
    ]
};
