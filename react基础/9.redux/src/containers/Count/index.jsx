import React, { Component } from 'react'

// 引入connect 用于连接 UI组件 与 redux
import { connect } from 'react-redux'
import {createIncrementAction, createDecrementAction, createIncrementAsyncAction} from '../../redux/actions/count'

class Count extends Component {

  // 加法
  increment = () => {
    const {value} = this.selectNumber;
    this.props.increment(+value);
  }

  // 减法
  decrement = () => {
    const {value} = this.selectNumber;
    this.props.decrement(+value);
  }

  // 奇数时加法
  incrementIfOdd = () => {
    const {value} = this.selectNumber;
    if(this.props.count % 2) {
      this.props.increment(+value);
    }
  }

  // 异步加法
  incrementAsync = () => {
    const {value} = this.selectNumber;
    this.props.incrementAsync(+value);
  }
  
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Count 组件 --- 下方组件总人数为：{this.props.persons.length}</h1>
        <h4>当前求和为：{this.props.count}</h4>
        <select ref={c => this.selectNumber = c}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>add if odd</button>&nbsp;
        <button onClick={this.incrementAsync}>add async</button>
      </div>
    );
  }
}

// mapStateToProps 函数的返回对象会作为参数传给 UI 组件的 props
//mapStateToProps 函数用于传递 store 中的状态
const mapStateToProps = state => ({
  count: state.sum,
  persons: state.persons
});

// mapDispatchToProps 函数的返回对象会作为参数传给 UI 组件的 props
// mapDispatchToProps 函数用于传递操作状态的方法
/* 
const mapDispatchToProps = dispatch => (
  {
    // 通知 redux 执行加法
    increment: data => dispatch(createIncrementAction(data)),
    decrement: data => dispatch(createDecrementAction(data)),
    incrementAsync: data => dispatch(createIncrementAsyncAction(data)),
  }
)
*/
// mapDispatchToProps 可以为一个对象，只需要定义对应的 action，react-redux 会自动调用 dispatch 来改变状态
// mapDispatchToProps 简写形式：
const mapDispatchToProps = {
  increment: createIncrementAction,
  decrement: createDecrementAction,
  incrementAsync: createIncrementAsyncAction
}

// 创建并暴露一个 Count 容器组件
export default connect(mapStateToProps, mapDispatchToProps)(Count);
