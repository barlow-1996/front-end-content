import React from 'react';
import ReactDOM from 'react-dom'
// 类式组件
// class Demo extends React.Component {
//   state = {count: 0};
//   myRef = React.createRef();
//   componentDidMount() {
//     this.timer = setInterval(() => {
//       this.setState(state => ({count: state.count + 1}));
//     }, 1000);
//   }
//   componentWillUnmount() {
//     clearInterval(this.timer);
//   }
//   add = () => {
//     this.setState(state => ({count: state.count + 1}));
//   }
//   unmount = () => {
//     ReactDOM.unmountComponentAtNode(document.getElementById('root'));
//   }
//   show = () => {
//     const {value} = this.myRef.current;
//     alert(value);
//   }
//   render() {
//     return (
//       <div>       
//         <h1>hooks 组件</h1>
//         <h2>当前求和为：{this.state.count}</h2>
//         <button onClick={this.add}>+1</button>&nbsp;
//         <button onClick={this.unmount}>卸载组件</button>&nbsp;
//         <input type="text" ref={this.myRef}/>&nbsp;
//         <button onClick={this.show}>点击提示数据</button>
//       </div>
//     );
//   }
// }

// 函数式组件
function Demo () {
  const [count, setCount] = React.useState(0) // useState 返回一个数组，数组的第一位为状态的值，第二位为改变状态的方法
  // console.log(count, setCount);
  // 通过 useRef 方法可以拿到某个具体的组件
  const myRef = React.useRef();
  // 通过 useEffect 方法能够让函数式组件使用钩子
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCount(count => count + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    }
  }, []);
  function add() {
    // setCount(count + 1); // useState 写法一
    setCount(count => count + 1); // useState 写法二
  }
  function unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
  }
  function show() {
    const {value} = myRef.current;
    alert(value);
  }
  return (
    <div>
      <h1>hooks 组件</h1>
      <h2>当前求和为：{count}</h2>
      <button onClick={add}>+1</button>&nbsp;
      <button onClick={unmount}>卸载组件</button>&nbsp;
      <input type="text" ref={myRef}/>&nbsp;
      <button onClick={show}>点击提示数据</button>
    </div>
  )
}


export default Demo;