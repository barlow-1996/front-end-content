# react 扩展功能

## setState 更新的两种写法

1. setState(stateChange[, callback]) ------ 对象式的 setState
    1. stateChange 为状态改变对象（该对象可体现出状态的更改）
    2. callback 是可选的回调函数，它在状态更新完毕、界面更新后(render 执行后)才被调用

2. setState(updater[, callback]) ------ 函数式的 setState
    1. updater 为返回 stateChange 对象的函数，它可接受到 state 和 props
    2. callback 是可选的回调函数，它在状态更新完毕、界面更新后(render 执行后)才被调用

### 总结

1. 对象式的 setState 是函数式的 setState 的简写方式(语法糖)
2. 使用原则：
    1. 如果新状态不依赖于原状态 ---> 使用对象方式
    2. 如果新状态依赖于原状态 ---> 使用函数方式
    3. 如果需要在 setState() 执行后获取最新状态数据，要在第二个 callback 函数中读取
**setState 是异步更新数据的**

## Hooks

Hook 是 react 16.8 版本增加的新语法，可以在函数式组件中使用 state 和其它 react 特性

常用的 Hook：
State Hook: React.useState()
Effect Hook: React.useEffect()
Ref Hook: React.useRef()

### State Hook

State Hook 让函数式组件也可以有自己的 state，并进行状态数据的读写操作
语法: const [xxx, setXxx] = React.useState(initValue);
参数：第一次初始化指定的值在内部会被缓存
返回值：包含2个元素的数组，第1个为内部当前状态值，第2个为更新状态的函数

setXxx() 两种写法：
setXxx(newValue): 参数为非函数值，直接指定新的状态值，内部会覆盖原来的状态值
setXxx(value => newValue): 参数为函数，接受原本的状态值，返回新状态值，内部会覆盖原来的状态值

### Effect Hook

Effect Hook 让函数式组件也可以使用钩子
语法：React.useEffect(() => {
    // 在此能够执行 componentDidmount 或 componentDidUpdate 钩子
    return () => {
        // 在此能够执行 componentWillUnmount 钩子
    }
}, [stateValue])
参数：
第一个参数为一个回调函数，会在页面刚挂载时执行一次，以及每次指定的状态更新时都会执行一次；该回调函数可以返回一个函数，该函数会在组件卸载前执行，相当于 componentWillUnmount
第二个参数为数组，能够指定监听哪些 state 变化，被监听的状态每次更新时都会执行该回调函数，回调函数相当于 componentDidUpdate；若为空数组，则相当于 componentDidMount
若省略第二个参数，则会自动监听所有 state 值的变化

可以把 Effect Hook 看作是 componentDidMount、componentDidUpdate、componentWillUnmount 三个钩子的组合

### Ref Hook

Ref Hook 让函数式组件存储/查找组件内的标签或任意其他数据
语法：const xxx = useRef();
xxx 能够保存标签对象，用法与类式组件的 React.createRef() 类似

## Fragment

在每个组件的最外层都要包一个 div 标签，这样就会无故渲染一个 div
如果不想拥有一个真实 DOM 根标签，就可以使用 Fragment，Fragment 标签不会被渲染到页面上

```javascript
import React, { Component, Fragment } from 'react';
render() {
    return (
      <Fragment>
        ...
      </Fragment>
    );
}
```

## Context

Context 是一种组件间通信方式，常用于【祖组件】与【后代组件】间通信
语法：

```javascript
// 1. 创建 Context 容器对象
const XxxContext = React.createContext(); 
// 2. 渲染子组件时外面包裹 XxxContext.Provider，通过 value 属性给后代组件传递数据
<XxxContext.Provider value={数据}>
    子组件
</XxxContext.Provider> 
// 3. 后代组件读取数据
// 第一种方式：适用于类式组件
static contextType = xxxContext // 声明接收 context
this.context // 读取 context 中的 value 数据
// 第二种方式：函数式组件和类式组件都适用
<xxxContext.Consumer>
    {
        value => ( // value 就是 context 中的 value 数据
            要显示的内容
        )
    }
</xxxContext.Consumer> 
```

在实际开发中，一般都不用 context，而是用它封装的 react 插件(如 react-redux)

## 组件优化(optimize)

Component 的两个问题导致效率低：
1.只要执行 setState() 即使不改变状态，组件也会重新 render()
2.只要当前组件重新 render()，就会自动重新 render 子组件(即使子组件没有用到父组件任何数据)

原因：Component 中的 shouldComponentUpdate() 总返回 true

效率高的做法：只有当组件的 state 或 props 数据发生变化时才进行 render

解决：
方法一：重写 shouldComponentUpdate 方法，比较新旧 state 或 props 数据，若有变化才返回 true，否则返回 false
方法二：使用 PureComponent，PureComponent 自动重写了 shouldComponentUpdate 方法，只有 state 或 props 数据发生变化才返回 true
用法：
import React, { PureComponent } from 'react';
class Child extends PureComponent {}

注意：只进行 state 或 props 数据的浅比较，如果对象的属性值变化了仍然返回 false
如果想返回 true 的话需要重新创建一个新对象，拷贝完原对象的属性后重新赋值

项目中一般使用 PureComponent 来优化组件

## renderProps

renderProps 类似于 VUE 中的插槽技术，能向组件内部动态传入带内容的结构

- childrenProps：通过组件标签体传入结构(可传入任何值，可以是文本、react元素、组件、甚至是函数)
如果 B 组件需要 A 组件内的数据，childrenProps 方法无法拿到

```javascript
// Parent 组件
<h3>我是 Parent 组件</h3>
<A>
  <B />
</A>
// A 组件
<h3>我是 A 组件</h3>
{this.props.children}
```

- renderProps：通过组件标签属性传入结构，并可携带数据，一般用 render 属性(传入一个函数)

```javascript
// Parent 组件
<h3>我是 Parent 组件</h3>
<A render={(name) => <B name={name}/>}/>
// A 组件（state = {name: 'byl'};）
<h3>我是 A 组件</h3>
{this.props.render(this.state.name)}
// B 组件
<h3>我是 B 组件，名字：{this.props.name}</h3>
```

## 错误边界(Error boundary)

错误边界用来捕获后代组件的错误，并渲染出备用页面
只能捕获后代组件**生命周期**产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误

语法：

```javascript
// getDerivedStateFromError 配合 componentDidCatch 一起使用
state = {
  hasError: false // 用于标识子组件是否产生错误
}
// 当该组件的子组件出现错误时会触发 getDerivedStateFromError 调用，并携带错误信息
static getDerivedStateFromError(error) {
  console.log(error);
  // 在 render 之前触发，并返回新的 state
  return {hasError: true};
}
// 该函数也属于钩子，当子组件出错时会自动被调用。该函数主要用来统计错误次数，反馈给服务器，用于通知编码人员解决 bug
componentDidCatch(error, info) {
  console.log('发生错误！');
}
```
