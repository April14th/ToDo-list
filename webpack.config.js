const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

module.exports = {
    entry: './js/toDo.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/toDo.js'
    },
    
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
}