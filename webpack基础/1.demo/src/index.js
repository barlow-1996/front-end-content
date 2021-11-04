const hello = require('./hello');
import './css/style.css'
// import './css/pink.scss'

let root = document.querySelector('#root');
root.appendChild(hello());

let div = document.createElement('div');
document.body.appendChild(div);

let render = () => {
  div.innerHTML = 'hello';
}

// 如果当前模块支持热更新的话
if(module.hot) {
  // 注册回调 当前 index.js 可接收 hello.js 的变更，当 hello.js 变更后可调用 render 方法
  module.hot.accept(['./hello.js'], render);
}

console.log('hello javascript');