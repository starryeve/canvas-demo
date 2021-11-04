/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpackConfig = require("./webpack.config.js");
const { merge } = require("webpack-merge");
module.exports = merge(webpackConfig, {
  mode: "development",
  devtool: "eval-source-map",
  target: "web",
  output: {
    // filename: 'js/[name].[hash:8].js',      // 打包后的文件名称
    // path: path.resolve(__dirname,'../dist'),  // 打包后的目录
    // assetModuleFilename: 'images/[hash][ext][query]',
    // publicPath: './',
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "../public"),
      publicPath: "/",
    },
    // 默认为true
    hot: true,
    // 是否开启代码压缩
    // compress: true,
    // 启动的端口
    port: 9000,
  },
});
