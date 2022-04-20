# JSX

JSX 是 react 定义的 JS 扩展语法
本质是 React.createElement(compoments, props, children) 的语法糖，用来简化 虚拟DOM 的创建，被 babel/preset-react 插件转译为 createElement 方法

## 语法规则

1. 定义虚拟 DOM 时不要用引号，如 const VDOM = `<h1 id="title">Hello, world!</h1>`;
2. 标签中混入 JS 变量或表达式时要使用 {}【注意：JSX 中不能混入 JS 语句】
3. 在 JSX 中定义虚拟 DOM 的类名时不要用 class，要用 className
4. 在 JSX 中定义内联样式时，要用 style={{key: value}} 的形式定义
5. JSX 定义 虚拟 DOM 时必须只有一个根标签
6. JSX 定义的标签必须闭合 `<input type="text"/> 或 <input type="text"><input>`
7. JSX 定义的标签首字母若为小写，则将该标签转为 HTML 中的同名标签；若为大写，react 会去渲染对应的组件，若组件没有定义则报错
8. JSX 添加注释需要在外面添加大括号，里面用 JS 的方式添加 {// xxx...}
