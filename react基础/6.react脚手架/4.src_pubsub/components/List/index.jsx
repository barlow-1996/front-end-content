import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class List extends Component {

  state = {
    users: [], // 初始值为数组
    isFirst: true, // 是否为第一次打开页面
    isLoading: false, // 标识是否处于加载中
    err: '' // 存储请求相关的错误信息
  }

  // 组件挂载后就订阅消息
  componentDidMount() {
    this.token = PubSub.subscribe('changeState', (msg, newState) => {
      this.setState(newState);
    })
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.token);
  }

  render() {
    const {users, isFirst, isLoading, err} = this.state;
    return (
      <div>
        {
          isFirst ? <h2>输入关键字后点击搜索</h2> : 
          isLoading ? <h2>搜索中...</h2> :
          err ? <h2 style={{color: 'red'}}>{err}</h2> : 
          users.map(user => {
            return (
              <div key={user.id} style={{display: 'inline-block'}}>
                <a href={user.html_url} rel="noreferrer" target="_blank">
                  <img src={user.avatar_url} alt="avatar" style={{width: '100px'}} />
                </a>
                <p>{user.login}</p>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default List;