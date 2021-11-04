# 打包文件解析

在运行 npm run build 后，在工作区内会生成一个 dist 文件夹
里面包括一个index.html文件和static文件夹

## static文件夹解析

- js文件夹中有三个文件
  app.js：包括当前应用程序开发的所有代码（业务代码）
  manifest.js: 为我们打包的代码做底层支撑
  vendor.js: 提供商或第三方（包括vue、vue-rouer、axios等）

- css文件夹： 所有编写的css代码
