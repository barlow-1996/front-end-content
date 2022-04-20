import React, { Component } from 'react';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import Messages from './Messages'
import News from './News';
class Home extends Component {
  render () {
    return (
      <div>
        <h3>我是 Home 内容</h3>
        <div>
          <ul>
            <li>
              {/* 注册子路由时要带上父路由的 path */}
              <NavLink to="/home/news">News</NavLink>
            </li>
            <li>
              <NavLink to="/home/messages">Messages</NavLink>
            </li>
          </ul>
          <Switch>
            <Route path="/home/news" component={News}></Route>
            <Route path="/home/messages" component={Messages}></Route>
            <Redirect to="/home/news"></Redirect>
          </Switch>
        </div>
      </div>
    );
  }
}

export default Home;