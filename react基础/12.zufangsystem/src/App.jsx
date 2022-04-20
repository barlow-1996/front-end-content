import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'

import Home from './pages/Home'
import CityList from './pages/CityList'
import Map from './pages/Map'

class App extends Component {
  render () {
    return (
      <div className="app">
        {/* 配置路由 */}
        <Route path="/home" component={Home}></Route>
        <Route path="/citylist" component={CityList}></Route>
        <Route path="/map" component={Map}></Route>
        <Redirect to="/home"></Redirect>
      </div>
    );
  }
}

export default App;