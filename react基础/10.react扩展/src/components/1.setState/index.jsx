import React, { Component } from 'react';

class Demo extends Component {

  state = {count: 0}

  increment = () => {
    // 对象式 setState
    // const {count} = this.state;
    // this.setState({count: count + 1}, () => {console.log(this.state.count);});
    // console.log(this.state.count); // 0. 因为 react 页面是异步更新的，调用 setState 更新状态并不会马上执行。如果想访问更新完毕后的状态就需要 setState 的第二个参数

    // 函数式 setState
    // 函数式 setState 不用先获取到原来的值，因为能从参数中直接访问到 state
    this.setState((state, props) => ({count: state.count + 1}));
  }

  render() {
    return (
      <div>
        <h1>setState 组件</h1>
        <h2>当前求和为：{this.state.count}</h2>
        <button onClick={this.increment}>+1</button>
      </div>
    );
  }
}

export default Demo;