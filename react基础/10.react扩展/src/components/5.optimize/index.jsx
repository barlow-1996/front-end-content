import React, { PureComponent } from 'react';
import './index.css'
class Parent extends PureComponent {
  state = {carName: '奔驰c63'};
  changeCar = () => {
    this.setState({carName: '迈巴赫'});
  }
  render() {
    console.log('parent---render');
    const {carName} = this.state;
    return (
      <div className="parent">
        <h2>我是 Parent 组件</h2>
        <span>我的车：{carName}</span>&nbsp;
        <button onClick={this.changeCar}>点我换车</button>
        <Child carName={carName} />
      </div>
    );
  }
}
class Child extends PureComponent {
  render() {
    console.log('child---render');
    return (
      <div className="child">
        <h2>我是 Child 组件</h2>
        <span>我接到的车是：{this.props.carName}</span>
      </div>
    );
  }
}

export default Parent;