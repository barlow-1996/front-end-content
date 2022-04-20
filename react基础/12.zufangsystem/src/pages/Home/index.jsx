import React, { Component } from 'react';
import {Route} from 'react-router-dom'

import {TabBar} from 'antd-mobile'
import Index from '../Index'
import List from '../List'
import News from '../News'
import Profile from '../Profile'
import './index.css'

class Home extends Component {
  state = {
    selectedTab: '/home',
    tabs: [
      {
        path: '/home',
        title: '首页',
        icon: "icon-ind"
      },
      {
        path: '/home/list',
        title: '找房',
        icon: "icon-findHouse"
      },
      {
        path: '/home/news',
        title: '资讯',
        icon: "icon-infom"
      },
      {
        path: '/home/profile',
        title: '我的',
        icon: "icon-my"
      },
    ]
  }

  componentDidUpdate(prevProps) {
    prevProps.location.pathname !== this.props.location.pathname && this.setState({selectedTab: this.props.location.pathname});
  }

  setRouteActive = value => {
    this.setState({selectedTab: value});
    this.props.history.push(value);
  }
  render() {
    return (
      <div className="home">
        {/* 渲染子路由 */}
        <Route exact path="/home" component={Index} />
        <Route path="/home/list" component={List} />
        <Route path="/home/news" component={News} />
        <Route path="/home/profile" component={Profile} />
        {/* tagBar区域 */}
        <TabBar onChange={value => this.setRouteActive(value)} activeKey={this.state.selectedTab}>
          {this.state.tabs.map(item => (
            <TabBar.Item key={item.path} icon={<i className={`iconfont ${item.icon}`}></i>} title={item.title} />
          ))}
        </TabBar>
      </div>
    );
  }
}

export default Home;