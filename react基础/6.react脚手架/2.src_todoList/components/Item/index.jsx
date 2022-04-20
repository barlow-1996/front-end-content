import React, { Component } from 'react';
import './index.css'
class Item extends Component {

  state = {mouse: false}; // 识别鼠标移入、移出

  // 鼠标移入移出事件
  handleMouse = (flag)=> {
    return () => {
      this.setState({mouse: flag});
    }
  }

  // 多选框勾选或取消事件
  handleCheck = (id) => {
    return (event) => {
      this.props.changeTodo(id, event.target.checked);
    }
  }

  // 删除一个 todo 事件
  handleDel = (id) => {
    if(window.confirm('确定删除该事件吗？')) {
      this.props.delTodo(id);
    }
  }

  render () {
    const {id, name, done} = this.props;
    const {mouse} = this.state;
    return (
      <li style={{backgroundColor: mouse ? '#ddd' : 'white'}} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
        <label>
          <input type="checkbox" checked={done} onChange={this.handleCheck(id)}/>
          <span>{name}</span>
        </label>
        <button className="btn btn-danger" onClick={() => this.handleDel(id)} style={{ display: mouse ? 'block' : 'none'}}>删除</button>
      </li>
    );
  }
}

export default Item;