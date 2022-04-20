import React, { Component } from 'react';

class Child extends Component {
  state = {
    users: [
      {id: '001', name: 'tom', age: 18},
      {id: '002', name: 'byl', age: 22},
      {id: '003', name: 'hmy', age: 24},
    ]
    // users: 'abc'
  }

  render() {
    return (
      <div>
        <h2>我是 Child 组件</h2>
        {this.state.users.map(user => {
          return <h4 key={user.id}>{user.name} --- {user.age}</h4>
        })}
      </div>
    );
  }
}

export default Child;