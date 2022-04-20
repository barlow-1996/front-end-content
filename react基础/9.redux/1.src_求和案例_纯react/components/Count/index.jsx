import React, { Component } from 'react';

class Count extends Component {

  state = {
    count: 0
  }

  // 加法
  increment = () => {
    const {value} = this.selectNumber;
    const {count} = this.state;
    this.setState({count: count + +value});
  }

  // 减法
  decrement = () => {
    const {value} = this.selectNumber;
    const {count} = this.state;
    this.setState({count: count - +value});
  }

  // 奇数时加法
  incrementIfOdd = () => {
    const {value} = this.selectNumber;
    const {count} = this.state;
    if(count % 2 !== 0) {
      this.setState({count: count + +value});
    }
  }

  // 异步加法
  incrementAsync = () => {
    const {value} = this.selectNumber;
    const {count} = this.state;
    const p = Promise.resolve(value);
    p.then(
      v => {
        this.setState({count: count + +v});
      }
    )
  }
  
  render() {
    const {count} = this.state;
    return (
      <div>
        <h1>当前求和为：{count}</h1>
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