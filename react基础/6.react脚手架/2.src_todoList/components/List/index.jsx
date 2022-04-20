import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css'
import Item from '../Item'
class List extends Component {

  // 类型检测
  static propTypes = {
    changeTodo: PropTypes.func.isRequired,
    todos: PropTypes.array.isRequired,
    delTodo: PropTypes.func.isRequired
  }

  render() {
    const {todos, changeTodo, delTodo} = this.props;
    return (
      <ul className="todo-list">
        {
          todos.map(todo => <Item key={todo.id} {...todo} changeTodo={changeTodo} delTodo={delTodo}/>)
        }
      </ul>
    );
  }
}

export default List;