# nodejs 处理 ES6module

如果要使用es6模块，必须采用 .mjs后缀名
如果不希望将后缀名改成 .mjs，可以在项目的 package.json 文件中，指定 type 字段为 module:
{
   "type": "module"
}
一旦设置了以后，该目录里面的 JS 脚本，就被解释用 ES6 模块

如果此时还要使用 CommonJS 模块，那么需要将 CommonJS 脚本的后缀名都改成.cjs

如果没有type字段，或者type字段为commonjs，则.js脚本会被默认解释成 CommonJS 模块
