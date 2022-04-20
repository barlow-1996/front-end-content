# 懒加载(lazyLoad)

`import Home from './pages/Home'` 通过该形式会直接引入路由组件，当页面上路由组件太多时全部引入会导致文件过大
设置懒加载后会当用户点击该路由组件时才会去加载该路由组件

```javascript
import React, { Component, lazy, Suspense } from 'react' // 引入内置的 lazy 和 Suspense
const Home = lazy(() => import('./pages/Home')); // 通过 lazy 函数配合 import 动态加载路由组件(路由组件代码会被分开打包)

// 使用懒加载时必须要在注册路由的地方包裹一个 Suspense 标签，fallback 能指定在加载得到路由文件前显示一个自定义 loading 界面
<Suspense fallback={<h1>Loading...</h1>}> 
  <Route path="/about" component={About} />
  <Route path="/home" component={Home} />
</Suspense>
```
