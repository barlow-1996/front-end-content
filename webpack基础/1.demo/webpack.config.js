const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const webpack = require("webpack");

const myPlugin = require('./plugins/mySelf');

module.exports = {
  mode: 'development',
  entry: __dirname + "/src/index.js", // 入口文件
  output: {
    path: __dirname + "/dist", //打包后的文件存放的地方
    filename: "bundle.js" //打包后输出文件的文件名
  },
  devServer: {
    contentBase: "./dist", // 本地服务器所加载文件的目录
    port: "8081", // 设置端口号为8081
    inline: true, // 文件修改后实时刷新
    historyApiFallback: true, // 不跳转
    hot: true, // 开启热更新
  },
  devtool: 'source-map',  // 会生成对于调试的完整的.map文件，但同时也会减慢打包速度
  module: {
    rules: [
      {
        test: /\.css$/, // 正则匹配以 .css 结尾的文件
        use: ['style-loader', 'css-loader'] // 需要用的loader. 一定要按顺序，因为调用loader是从右往左编译的
      },
      {
        test: /\.(scss|sass)$/, // 正则匹配以 .scss 和 .sass 结尾的文件
        use: ['style-loader', 'css-loader', 'sass-loader'] // 需要用的loader. 一定要按顺序，因为调用loader是从右往左编译的
      },
      {
        test: /\.js$/, // 正则匹配 js 文件
        use: ['babel-loader'], // 如果 use 需要多项配置，可写成这种对象形式
        exclude: /node_modules/ // 屏蔽 node_modules 文件夹中的 js 文件
      },
      {
        test: /\.js$/,
        use: [path.resolve(__dirname, './loaders/replaceLoader.js')]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.template.html'
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new myPlugin()
  ]
}