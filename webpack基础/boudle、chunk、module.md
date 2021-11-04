# bundle\chunk\module

- bundle: 是 webpack 打包出来的文件
- chunk：是一个代码块，由多个模块组合而成，用于代码的合并和分割
- module：是开发中的单个模块，一个模块对应一个文件

## chunk

Webpack 通过入口模块递归所有依赖模块，并逐个打包模块，这些模块就形成了一个 chunk

entry: './src/js/main.js' // 大多数情况下，一个 Chunk 会生产一个 Bundle
entry: ['./src/js/main.js','./src/js/other.js'] // 这样的情况也只产生一个 chunk，最终都打包到一个 bundle 里

// 这种情况产生了两个 chunk，对象中一个字段就会产生一个Chunk
// 产生了两个Chunk，最终会生成两个Bundle，一个名称肯定不够用了，所以在output中filename直接写死名称，会报错
entry: {
    main: './src/js/main.js',
    other: './src/js/other.js'
},
output: {
    // path: __dirname + "/public",
    // filename:'bundle.js'
    // 以上2行会报错

    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "[name].js", //打包后输出文件的文件名
}

打包后 public 文件夹生成两个打包后的文件，main.js 和 other.js
