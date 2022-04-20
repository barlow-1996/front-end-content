/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {setToken} from '../../utils/auth'
import './index.css'
class Login extends Component {

  onFinish = (values) => {
    console.log(values);
    setToken(values.username);
    this.props.history.push('/admin');
  };

  render () {
    return (
      <Card title="QF Admin SYS" className="login-form">
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入姓名!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住密码</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              忘记密码?
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>&nbsp;
            <a href="">注册用户</a>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default Login;