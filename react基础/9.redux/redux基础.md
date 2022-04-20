# redux 基础

redux 是一个专门用于做状态管理的 JS 库(不是 react 插件库)，react/angular/vue 都能使用，但基本都与 react 使用

作用：集中式管理 react 应用中多个组件共享的状态：

1. 某个组件的状态可让其他组件随时获取
2. 某个组件需要改变另一个组件的状态
3. redux 能不用就不用，如果状态管理较为复杂时再考虑使用

## 三个核心概念

1. action(动作对象或函数，对象为同步，函数为异步)，包含两个属性：
type：表示属性，值为字符串，必要属性(唯一)
data：数据属性，值类型任意，可选属性
例：{type: 'addStudent', data: {name: 'byl', age: 18}}

2. reducer(初始化状态及加工状态)
reducer 是个纯函数，加工时根据旧的 state 和 action 返回 newState

3. store(对象，将 state、action、reducer 联系在一起)
引入 store：
import {createStore} from 'redux'
import reducer from './reducers'
const store = createStore(reducer);

store API：

- store.getState()：得到 state
- store.dispatch(action)：分发 action，触发 reducer 调用，产生新的 state
- store.subscribe(listener)：注册监听，当 redux 的 state 更新时自动调用

## 使用 redux

1. 安装 redux：`npm i redux`
2. 在 src 下创建 redux 文件夹，建立 store.js 和 reducer.js 和 action.js
3. store.js:
    1. 引入 redux 中的 createStore 函数，创建一个 store
    2. createStore 调用时要传入一个为其服务的 reducer
    3. 暴露 store 对象
4. reducer.js:
    1. reducer 本质是一个函数，接收 preState 和 action，返回加工后的状态
    2. reducer 有两个作用：初始化状态 和 加工状态
    3. reducer 被第一次调用时，是 store 自动触发的，传递的 preState 是 undefined
5. action.js: 专门用于创建 action 对象
6. 在相应的组件中注册 store 状态改变的回调，一旦监听到发生改变就重新渲染

## 使用 redux 开发者工具

1. 下载开发者工具 redux-devtools
2. 通过 npm 下载插件 `npm i redux-devtools-extension`
3. 在 store.js 中进行配置：

```javascript
import {composeWithDevTools} from 'redux-devtools-extension'
export default createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)));
```
