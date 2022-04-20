import React, { Component } from 'react';
import PropTypes from 'prop-types'; // 类型检测
import './index.css'
class Header extends Component {

  // 类型检测
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
    lenId: PropTypes.number.isRequired
  }

  // 键盘事件
  handle = (event) => {
    const {keyCode, target} = event;
    const {lenId} = this.props;
    // 判断是否为回车
    if(keyCode === 13) {
      if(target.value.trim() === '') {
        alert('输入不能为空！');
        return;
      }
      // 准备好一个 todo 对象
      const todoObj = {id: lenId + 1, name: target.value, done: false};
      // 将 todoObj 传递给 App 父组件
      this.props.addTodo(todoObj);
      target.value = '';
    }
  }
  
  render() {
    return (
      <div className="todo-header">
        <input onKeyUp={this.handle} type="text" placeholder="请输入你的任务名称，按回车键确认"/>
      </div>
    );
  }
}

export default Header;