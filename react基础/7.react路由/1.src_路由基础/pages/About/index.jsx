import React, { Component } from 'react';

class About extends Component {
  render() {
    console.log('路由组件的props：', this.props);
    return (
      <div>
        <h3>我是 About 内容</h3>
      </div>
    );
  }
}

export default About;