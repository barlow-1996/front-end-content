import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

import { NavBar } from 'antd-mobile';

import PropTypes from 'prop-types';

import './index.css'
class index extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    onBack: PropTypes.func
  }
  render() {
    const {onBack} = this.props;
    const defaultHandle = () => this.props.history.go(-1);
    return (
      <div>
        <NavBar onBack={onBack || defaultHandle}>{this.props.children}</NavBar>
      </div>
    );
  }
}

export default withRouter(index);