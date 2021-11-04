# 什么是 typescript（TS）

typescript 是 javascript 的超集

在 JS 的基础上添加了类型检测、接口、枚举、泛型等
例：let age: number = 18; // age 变量有了明确的类型: number

typescript 并不直接在浏览器上运行，需要编译器编译成 javascript 来运行

## 相比于 JS 的优势

优势一：类型化思维方式，使得开发更加严谨，提前发现错误
优势二：类型系统提高了代码的可读性，并使维护和重构代码更加容易
优势三：补充了接口、枚举等开发大型应用时 JS 缺失的功能

vue3.0 源码使用 TS 重写，所以 TS 是趋势

## 缺点

1. 需要长时间的来编译代码
2. 在使用第三方库时，需要有三方库的定义文件，并不是所有三方库都提供了定义文件

## 安装解析 TS 的工具包

node.js 和 浏览器只认识 JS 代码，不认识 TS 代码，所以要安装解析 TS 工具包
解析 TS 工具包能将 TS 代码转化为 JS 代码

安装命令：npm i typescript -g

## 解析 TS 文件

写好 TS 代码后，在终端中输入命令： tsc xxx.ts
tsc 是解析 ts 的标识，就跟打开 js 文件前面加 node 一样
解析完之后，当前目录下会生成一个同名的 js 文件，再用 node xxx.js 来执行 js 代码

将多个 ts 文件合并成一个 js 文件: tsc --outfile xxx.js xxx1.ts xxx2.ts
系统会将 xxx1.ts 和 xxx2.ts 一起编译到 xxx.js 文件中

ts 还可以自动监视文件内容的变化，当ts文件发生变化时可以自动对文件进行解析
用法：tsc xxx.ts -w  (加上 -w 就开始自动监视文件的变化了)

## 配置 TS 解析器

在当前工作目录下新建一个 tsconfig.json 文件就可以对 ts 解析器进行配置
在当前目录加了这个文件以后，默认输入 tsc 就可以自动解析当前目录下所有ts文件
同理，输入 tsc -w 就可以同时监视所有 ts 文件内容的变化

## 简化方式

ts-node 工具包在内部自动将 TS 转化为 JS，然后自动执行 js 代码
该工具包是在内部转化的，所以不会生成新的 js 文件
安装命令：npm i ts-node -g

安装 ts-node 包之后，可以直接在终端用 ts-node xxx.ts 来执行 TS 代码
