# vue 与 react 区别

## 相似之处

1. 都是 MVVM 框架，都专注于 UI 层。都使用了虚拟 DOM，使得操作 DOM 更加高效
2. vue 和 react 只有框架的骨架，其他功能如路由、状态管理等都是分离的组件
3. 都具有组件化的结构
4. 都有自己的构建工具(vue-cli 和 create react app)，可以快速搭建开发环境
create react app 会强制使用 webpack 和 babel；而 vue-cli 可按需创造不同的模板，使用起来更加灵活

## 区别

1. HTML模板 和 JSX
vue 会使用常规的 HTML 模板进行渲染，写起来很接近标准的 HTML 元素，只是多了一些属性
react 推荐所有的模板通用 JSX 书写 ———— 一种 JS 的语法扩展，相当于在 JS 中书写 HTML

2. 双向绑定 和 状态管理
vue 可通过双向绑定进行驱动，实现 M-V\V-M 的自动更新
react 实现了 M-V，但 V-M 需要主动调用 setState 方法去实现
即改变数据时，视图会自动更新；但改变视图的内容，需要主动触发渲染视图的更新

3. 组件通信
vue实现父子组件间的通信，子组件向父组件传递数据通过绑定事件进行传输，父组件向子组件传值是通过 props 属性进行传输
react 中只有一个 props 属性，靠 props 进行组件间的通信
