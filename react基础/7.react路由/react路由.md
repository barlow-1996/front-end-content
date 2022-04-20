# react-router

在 react 中使用路由需要用到一个插件库：react-router-dom
下载：npm i react-router-dom --save-dev

## 使用路由

1.在 index.js 中注册路由
import {BrowserRouter} from 'react-router-dom' // 引入 BrowserRouter 或 HashRouter 标签
用该标签把 <App\> 整个包裹起来，让 App 组件内的所有内容都共用同一个路由

```html
<BrowserRouter>
  <App />
</BrowserRouter>
```

2.在 react 中靠路由链接实现切换组件
import { Link } from 'react-router-dom' // 引入 Link 标签实现路由链接

```html
<Link to="/about">About</Link> // 通过 to 属性控制 url 路径变化
// 注册路由时默认为 push 模式，若为 Link 标签添加 replace 属性则变为 replace 模式，即直接替换访问栈记录，无法通过后退返回上一次访问记录
<Link replace to="/about">About</Link>
```

3.在需要路由的组件展示区域匹配路由
import { Route } from 'react-router-dom' // 引入 Route 标签实现路由匹配

```html
<Route path="/about" component={About} /> // 当 url 路径变化为 path 时，显示 component 对应的组件
```

## Redirect

若首次访问页面的路径没有匹配到任何注册的路由，则可用 Redirect 指定页面的跳转路由

```html
import { Redirect } from 'react-router-dom' // 引入 Redirect 标签指定路径
<Route path="/about" component={About} />
<Route path="/home" component={Home} />
<Redirect to="/about" /> // Redirect 标签要写到所有注册路由的最后，当所有路由都无法匹配时，跳转到 Redirect 指定的路由
```

## Switch 的使用

通常情况下 path 和 component 是一一对应的关系，而如果形成了多对一的关系时 react 就会继续向下匹配(如下)，降低效率

```html
<Route path="/about" component={About} />
<Route path="/home" component={Home} />
<Route path="/home" component={About} /> // 此时若 url 路径为 /home 时会同时展示 Home 组件和 About 组件
```

可以在外面包裹一层 Switch 标签来提高路由匹配效率(单一匹配)
import { Switch } from 'react-router-dom' // 引入 Switch 标签实现单一匹配

```html
<Switch>
  <Route path="/about" component={About} />
  <Route path="/home" component={Home} /> // 谁在前就匹配谁，此时 /home 只展示 Home 组件
  <Route path="/home" component={About} /> 
</Switch>
```

## 路由组件与一般组件

一般组件存放在 components 文件夹，而路由组件要放在 pages 文件夹

若不主动向组件传送 prop，则一般组件的 props 属性为空对象(this.props == {})
而路由组件的 props 属性中有很多初始化对象（如 history、location、match 对象）

history:
  go: ƒ go(n)
  goBack: ƒ goBack()
  goForward: ƒ goForward()
  push: ƒ push(path, state)
  replace: ƒ replace(path, state)

location:
  pathname: "/about"
  search: ""
  state: undefined

match:
  params: {}
  path: "/about"
  url: "/about"

若想使一般组件拥有像路由组件这样的 props 属性(包括 history、location、match 对象)，需要引入 withRouter

```html
import { withRouter } from 'react-router-dom' // 引入 withRouter

class Header extends Component { // Header 为一般组件
  render () {}
}

export default withRouter(Header); // withRouter 的返回值是一个新组件
```
