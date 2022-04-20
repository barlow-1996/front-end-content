import React, { Component } from 'react';

class Header extends Component {

  render () {
    console.log('一般组件的props：', this.props);
    return (
      <div>
        <h2>React Router Demo</h2>
      </div>
    );
  }
}

export default Header;