import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { Layout, Menu, Dropdown, Avatar, message } from 'antd';
import 'antd/dist/antd.css'
import * as Icon from '@ant-design/icons'
import { DownOutlined } from '@ant-design/icons';
import {adminRoutes} from '../../routes'
import './index.css'
import {clearToken} from '../../utils/auth'
const { Header, Content, Sider } = Layout;

const routes = adminRoutes.filter(route => route.isShow);

class Frame extends Component {
  menu = (
    <Menu onClick={p => {
      if(p.key === 'logout') {
        clearToken();
        this.props.history.push('/login');
      } else {
        message.info(p.key);
      }
    }}>
      <Menu.Item key="notice">通知中心</Menu.Item>
      <Menu.Item key="setting">设置</Menu.Item>
      <Menu.Item key="logout">注销</Menu.Item>
    </Menu>
  );

  routePush = (event) => {
    this.props.history.push(event.key);
  }

  render () {
    return (
      <Layout>
        <Header className="header">
          <h1 style={{color: 'white', fontSize: '30px'}}>XX商城后台管理系统</h1>
          <Dropdown overlay={this.menu}>
            <div>
              <Avatar>U</Avatar>
              <span style={{color: 'white', fontSize: '16px'}}> 超级管理员<DownOutlined /></span>
            </div>
          </Dropdown>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              {routes.map(route => {
                return (
                  <Menu.Item 
                  key={route.path}
                  icon={React.createElement(Icon[route.icon])}
                  onClick={this.routePush}
                  >
                    {route.title}
                  </Menu.Item>
                )
              })}
            </Menu>
          </Sider>
          <Layout style={{ padding: '16px' }}>
            <Content
              className="site-layout-background"
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(Frame);