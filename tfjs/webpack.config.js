let path = require('path');
let webpack = require('webpack');
module.exports = {
    entry: './index.js',
    output: {
        path: path.join(__dirname, 'dist'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        filename: "bundle.js"
    },
    module: {
        rules: [

        ]
    },
    devServer: {
        contentBase: "./dist",       //本地服务器所加载的页面所在的目录
        port:"8081",                   //设置默认监听端口，如果省略，默认为"8080"
        inline: true,                  //实时刷新
        historyApiFallback: true       //不跳转
    }
};