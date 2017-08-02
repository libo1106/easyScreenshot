const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {

    entry: {
        "home": './src/pages/home/home.js'
    },

    output: {
        path: path.resolve(__dirname, "./dist/"),
        filename: 'assets/[name].[chunkhash].js'
    },

    resolve: {
        modules: [
            path.resolve(__dirname, "./src/components"),
            "node_modules"
        ]
    },

    module: {
        rules: [
            { test: /\.js$/, use: "babel-loader", exclude: [path.resolve(__dirname, "./node_modules")] },
            { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"]}
        ]
    },

    plugins: [
        new CleanWebpackPlugin(path.resolve(__dirname, "./dist")),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/tpl/index.html")
        })
    ]

}