// 引入一个包
const path = require('path');

// 引入 HTML 插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 引入 clean 插件
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

// webpack 中所有的配置信息都应写在 module.exports 中
module.exports = {
  // 指定入口文件
  entry: "./src/index.ts",

  // 指定打包文件所在目录
  output: {
    // 指定打包文件的目录
    path: path.resolve(__dirname, 'dist'),
    // 打包后的文件
    filename: "bundle.js"
  },

  // 指定 webpack 打包时要使用的模块
  module: {
    // 指定要加载的规则
    rules: [{
      // test 指定的是规则生效的文件
      test: /\.ts$/,
      // 要使用的 loader
      use: [
        // 配置 babel
        {
          // 指定加载器
          loader: "babel-loader",
          // 设置 babel
          options: {
            // 设置预定义的环境
            presets: [
              [
                // 指定环境的插件
                "@babel/preset-env",
                // 配置信息
                {
                  // 要兼容的目标浏览器
                  targets: {
                    "chrome": "87"
                  },
                  // 指定 corejs 的版本
                  "corejs": "3",
                  // 使用 corejs 的方式，"usage" 表示按需加载
                  "useBuiltIns": "usage"
                }
              ]
            ]
          }
        },
        'ts-loader'
      ],
      // 要排除的文件
      exclude: /node-modules/
    }]
  },

  // 配置 webpack 插件
  plugins: [
    // 该插件的作用是自动生成 html 文件，并且自动引入bundle.js
    new HtmlWebpackPlugin(),
    // 该插件的作用是清空dist文件夹，每次打包都会产生新的bundle.js文件，所以该插件在打包前都会自动清空，避免产生旧文件
    new CleanWebpackPlugin()
  ],

  // 用来设置引用模块
  resolve: {
    // ts 和 js 文件都可以作为模块使用
    extensions: ['.ts', '.js']
  }
}