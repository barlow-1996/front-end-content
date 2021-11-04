const {merge} = require('webpack-merge');
const common = require('./webpack.common');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = merge(common, {
  devtool: 'source-map',  // 会生成对于调试的完整的.map文件，但同时也会减慢打包速度
  plugins: [
    new CleanWebpackPlugin()
  ]
})