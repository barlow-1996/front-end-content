# react 脚手架

react 脚手架叫 create-react-app，整体技术架构为 react + webpack + es6 + eslint
里面包含了所有需要的配置(语法检查、JSX 编译、devServer...)，且下载好了所有相关依赖，并可直接运行

## 使用脚手架

1. 全局安装：npm install create-react-app -g

2. 在想要创建项目的目录下使用命令：create-react-app xxx(项目的文件夹名)

3. 进入项目文件夹：cd xxx

4. 启动项目：npm start

## 其他命令

- npm run build: 打包

## 脚手架文件介绍

1. public --- 静态资源文件夹
favicon.icon: 网站标签图标
index.html: 主页面
manifest.json: 应用加壳的配置文件
robots.txt: 爬虫协议配置文件

2. src --- 源码文件夹
App.css: App 组件样式
App.js: App 组件源码
App.test.js: 用于对 App 组件做测试
index.css: 全局样式
index.js: 入口文件
reportWebVitals.js: 页面性能分析文件
setupTests.js: 组件单元测试文件

## react 插件

安装 'ES7 React/Redux/GraphQL...' 插件
可输入 'rcc' 来快速生成 react 类式组件的模板，'rfc' 快速生成 react 函数式组件的模板
