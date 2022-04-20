import React, { Component } from 'react';
import './index.css'
// 创建 Context 对象
const MyContext = React.createContext();

class A extends Component {
  state = {username: 'byl'};
  render() {
    const {username} = this.state;
    return (
      <div className="parent">
        <h3>我是 A 组件</h3>
        <h4>我的用户名是：{username}</h4>
        <MyContext.Provider value={username}>
          <B username={username} />
        </MyContext.Provider>
      </div>
    );
  }
}
class B extends Component {
  render() {
    return (
      <div className="child">
        <h3>我是 B 组件</h3>
        <h4>我从 A 组件接收到的用户名：{this.props.username}</h4>
        <C />
      </div>
    );
  }
}
// 类式组件接收
// class C extends Component {
//   // 声明接收 context
//   static contextType = MyContext;
//   render() {
//     console.log(this.context);
//     return (
//       <div className="grand">
//         <h3>我是 C 组件</h3>
//         <h4>我从 A 组件接收到的用户名：{this.context}</h4>
//       </div>
//     );
//   }
// }
// 函数式组件接收
function C() {
  return (
    <div className="grand">
      <h3>我是 C 组件</h3>
      <h4>我从 A 组件接收到的用户名：
        <MyContext.Consumer>
          {
            value => value
          }
        </MyContext.Consumer>
      </h4>
    </div>
  );
}
export default A;