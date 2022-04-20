import React, { Component } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import List from './components/List'
import './App.css'
export default class App extends Component {
  // 状态在哪个组件中则操作状态的方法就在哪个组件中
  state = {
    todos: [
      {id: 1, name: '吃饭', done: true},
      {id: 2, name: '睡觉', done: true},
      {id: 3, name: '打豆豆', done: false}
    ]
  }

  // 用于添加一个 todo 事件，接收一个 todo 对象
  addTodo = (todoObj) => {
    const {todos} = this.state;
    this.setState({todos: [todoObj, ...todos]});
  }

  // 用于改变相应 todo 对象的 done 状态
  changeTodo = (id, done) => {
    const {todos} = this.state;
    const newTodos = todos.map(todo => {
      if(todo.id === id) return {...todo, done};
      else return todo;
    })
    this.setState({todos: newTodos});
  }

  // 用于删除相应的 todo 对象
  delTodo = (id) => {
    const {todos} = this.state;
    const newTodos = todos.filter(todo => todo.id !== id);
    this.setState({todos: newTodos});
  }

  // 用于全选
  checkAll = (done) => {
    const {todos} = this.state;
    const newTodos = todos.map(todo => {
      return {...todo, done};
    })
    this.setState({todos: newTodos});
  }

  // 清除已完成的 todo 对象
  clearTodo = () => {
    const {todos} = this.state;
    const newTodos = todos.filter(todo => !todo.done);
    this.setState({todos: newTodos});
  }

  render() {
    const {todos} = this.state;
    return (
      <div>
        <Header addTodo={this.addTodo} lenId={todos.length}></Header>
        <List todos={todos} changeTodo={this.changeTodo} delTodo={this.delTodo}></List>
        <Footer todos={todos} checkAll={this.checkAll} clearTodo={this.clearTodo}></Footer>
      </div>
    )
  }
}

