import React, { Component } from 'react';
import './index.css'
class Footer extends Component {

  checkAll = (event) => {
      this.props.checkAll(event.target.checked);
  }

  clearTodo = () => {
    this.props.clearTodo();
  }

  render() {
    const {todos} = this.props;
    // 计算已完成的个数
    const doneCount = todos.reduce((a, todo) => todo.done ? a + 1 : a, 0);
    // 总数
    const total = todos.length;

    return (
      <div className="todo-footer">
        <label>
          <input type="checkbox" onChange={this.checkAll} checked={doneCount === total && total !== 0} />
        </label>
        <span>
          <span>已完成{doneCount}</span> / 全部{total}
        </span>
        <button className="btn btn-danger" onClick={this.clearTodo}>清除已完成任务</button>
      </div>
    );
  }
}

export default Footer;