# react-redux

安装 react-redux：`npm i react-redux`

容器组件：放在 contaniners 文件夹中，负责和 redux 通信，将结果交给 UI 组件
UI 组件：放在 components 文件夹中，不能使用任何 redux 的 API，只负责页面的呈现与交互
容器组件和 UI 组件可整合成一个文件

## 如何创建一个容器组件————靠 react-redux 的 connect 函数

- connect(mapStateToProps, mapDispatchToProps)(UI 组件)
mapStateToProps: 映射状态，返回一个对象
**容器组件中的 store 是靠 props 传进去的，而不是在 容器组件中直接引入**

mapDispatchToProps：映射操作状态的方法，返回一个对象

## 自动监测

使用了 react-redux 后，无需在 index.js 中引入 store 使用 subscribe 方法进行监测并渲染
react-redux 的 connect 方法可在识别到状态变化后自动渲染

## Provider

Provider 由 react-redux 提供，Provider 可自动检测哪些组件需要用到 redux 中的状态
在 index.js 中引入 Provider 后无需手动给容器组件传入 store，给 App 组件包裹一个 `<Provider store={store}>` 即可
