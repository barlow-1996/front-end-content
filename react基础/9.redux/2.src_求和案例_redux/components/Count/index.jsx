import React, { Component } from 'react';
// 引入 store，用于获取 redux 中保存的状态
import store from '../../redux/store';
// 引入 actionCreator 专门用于创建 action 对象
import {createIncrementAction, createDecrementAction} from '../../redux/count_action'

class Count extends Component {

  componentDidMount() {
    // 监测 redux 中状态的变化，只要变化就调用 render
    store.subscribe(() => {
      this.setState({});
    })
  }

  // 加法
  increment = () => {
    const {value} = this.selectNumber;
    store.dispatch(createIncrementAction(+value));
  }

  // 减法
  decrement = () => {
    const {value} = this.selectNumber;
    store.dispatch(createDecrementAction(+value));
  }

  // 奇数时加法
  incrementIfOdd = () => {
    const {value} = this.selectNumber;
    const count = store.getState();
    if(count % 2 !== 0) {
      store.dispatch(createIncrementAction(+value));
    }
  }

  // 异步加法
  incrementAsync = () => {
    const {value} = this.selectNumber;
    const p = Promise.resolve(+value);
    p.then(
      v => {
        store.dispatch(createIncrementAction(v));
      }
    )
  }
  
  render() {
    return (
      <div>
        <h1>当前求和为：{store.getState()}</h1>
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

export default Count;