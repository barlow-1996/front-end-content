import React, { Component } from 'react';
import Child from './Child';
class Parent extends Component {
  state = {
    hasError: false // 用于标识子组件是否产生错误
  }
  // 当该组件的子组件出现错误时会触发 getDerivedStateFromError 调用，并携带错误信息
  static getDerivedStateFromError(error) {
    console.log(error);
    return {hasError: true};
  }

  // 该函数也属于钩子，当子组件出错时会自动被调用。该函数主要用来统计错误次数，反馈给服务器，用于通知编码人员解决 bug
  componentDidCatch() {
    console.log('发生错误！');
  }

  render() {
    return (
      <div>
        <h2>我是 Parent 组件</h2>
        {this.state.hasError ? <h2>当前网络不稳定，请稍后重试</h2> : <Child />}
      </div>
    );
  }
}

export default Parent;