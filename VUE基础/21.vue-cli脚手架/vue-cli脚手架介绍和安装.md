# 什么是vue CLI

CLI是command-Line Interface（命令行界面），俗称脚手架。使用前提：Node.js、webpack。
使用 vue-cli可以快速搭建vue开发环境和对应的webpack配置。

## Vue CLI的使用

安装Vue脚手架： npm install -g @vue/cli  (CLI 3.x)
如下载的脚手架是3.x版本，但仍想用2.x版本来搭建项目，就需要拉取CLI 2.x的模板： npm install @vue/cli-init -g  (这时就可以既用脚手架2.x又用脚手架3.x)

## vue-cli 2.x 搭建步骤

1. vue init webpack +项目名称   （这是CLI2.x版本的初始化项目）

2. cd +项目路径  进入这个文件夹
文件夹里的每个文件夹和文件看 “文件夹解释”图解

3. npm run dev 进入工程

4. 项目完成后，用 npm run build 进行打包

### 怎样关闭ESlint代码规范

在工作目录的config文件夹下，有一个index.js，进去以后找到一个名为useEslint的变量，将true改为false。
关闭以后重新编译即可

### runtime+compiler 和 runtime-only 区别

在进行CLI脚手架搭建的时候，会提供一个选项，让开发者选择runtime + compiler模式 或者 runtime-only模式。
这二者有什么区别？二者的区别只在js的入口 main.js 中

- 在runtime+compiler模式的main.js中，通过对App进行组件注册，然后在template中使用App。
  过程大概是 template --> ast(abstract syntax tree， 抽象语法树) --> render --> virtual DOM(虚拟DOM) --> 真实DOM（UI界面）

- 而在runtime-only模式中，App是通过render函数渲染使用的。
  以上渲染过程就简化为 render --> virtual DOM --> 真实DOM。

通过比较，得出结论：1.runtime-only的性能更高；2.runtime-only的代码量更少，比上一种模式少6KB.

## vue-cli 3.x 搭建步骤

vue-cli 3 基于webpack4打造；
设计原则是“0配置”，移除了build和config文件夹；
提供了 vue ui 命令，可视化配置项目；
移除了static文件夹，新增了public文件夹，并且将index.html放入public文件夹。

1. vue create +项目名称

2. 选择配置方式（默认配置和手动配置），手动配置中空格选中自己需要的配置

3. 对应的配置单独生成文件还是放在package.json

4. 要不要把刚才自己选择的配置保存下来

5. cd +项目路径  进入这个文件夹
文件夹里的每个文件夹和文件看 “文件夹解释”图解

6. npm run serve 进入工程

7. 项目完成后，用 npm run build 进行打包

### 如何修改配置

在vue CLI 3.x 版本中，移除了build和config文件夹，那么可以去哪里更改配置呢？

- 方法一：启动配置服务器 vue ui
  点击左侧的配置，就可以进去修改一些基础配置。

- 方法二：打开node_modules文件夹，选择@vue文件夹，再选择cli-service文件夹
  CLI 3.x 将配置文件隐藏在cli-service文件夹中的lib/config中

- 在当前工作区中创建一个叫 vue.config.js 的文件
  在该文件中写入:
  module.exports = {

  }
  里面写上你想要加入的配置，vue会自动进行合并
  
## 输入 npm run serve 后执行了什么

通过 package.json 文件的 script 标签发现 serve 后面对应着一个 vue-cli-service 依赖名
脚本命令中的依赖名会直接找到 node_modules/.bin 下面的对应脚本，也就是 vue-cli-service 文件
打开这个文件发现它最终执行了一个在 node_modules/@vue文件夹里叫做 vue-cli-service.js 的文件
