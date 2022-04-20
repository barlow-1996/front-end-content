import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Detail from './Detail';
class Messages extends Component {

  state = {
    messageArr: [
      { id: '1', title: '消息1' },
      { id: '2', title: '消息2' },
      { id: '3', title: '消息3' },
    ]
  }

  render () {
    const { messageArr } = this.state;
    return (
      <div>
        <ul>
          {messageArr.map(message => {
            return (
              <li key={message.id}>
                {/* 传递 params 参数： */}
                {/* <Link to={`/home/messages/detail/${message.id}/${message.title}`}>{message.title}</Link> */}
                {/* 传递 search 参数： */}
                {/* <Link to={`/home/messages/detail?id=${message.id}&title=${message.title}`}>{message.title}</Link> */}
                {/* 传递 state 参数:  */}
                <Link to={{pathname: '/home/messages/detail', state: {id: message.id, title: message.title}}}>{message.title}</Link>
              </li>
            )
          })}
        </ul>
        <hr />
        {/* 声明接收 params 参数:  */}
        {/* <Route path="/home/messages/detail/:id/:title" component={Detail}></Route> */}
        {/* 接收 search 参数无需声明: */}
        {/* <Route path="/home/messages/detail" component={Detail}></Route> */}
        {/* 接收 state 参数无需声明: */}
        <Route path="/home/messages/detail" component={Detail}></Route>
      </div>
    );
  }
}

export default Messages;