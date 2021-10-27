/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpackConfig = require('./webpack.config.js');
const { merge } = require('webpack-merge');
module.exports = merge(webpackConfig,{
  mode:'production',
  output: {
    filename: 'js/[name].[hash:8].js',      // 打包后的文件名称
    path: path.resolve(__dirname,'../dist'),  // 打包后的目录
    assetModuleFilename: 'images/[hash][ext][query]',
    publicPath: './',
    clean: true,
  },
})