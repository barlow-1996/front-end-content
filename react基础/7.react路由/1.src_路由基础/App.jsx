import React, { Component } from 'react'
import { Link, Route, Redirect } from 'react-router-dom'
import Header from './components/Header' // 一般组件
import Home from './pages/Home' // 路由组件
import About from './pages/About'
export default class App extends Component {

  render () {
    return (
      <div>
        <div className="row">
          <Header />
        </div>
        <div className="row">
          <div className="list-group">
              {/* 编写路由链接 */}
              <Link to="/about">About</Link>&nbsp;
              <Link to="/home">Home</Link>
          </div>
          <div className="content">
              {/* 注册路由 */}
              <Route path="/about" component={About} />
              <Route path="/home" component={Home} />
              <Redirect to="/about" />
          </div>
        </div>
      </div>
    )
  }
}

