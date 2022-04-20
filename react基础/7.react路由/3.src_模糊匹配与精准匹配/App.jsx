import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import './App.css'
export default class App extends Component {

  render () {
    return (
      <div>
        <div className="row">
          <Header />
        </div>
        <div className="row">
          <div className="list-group">
              <NavLink to="/about">About</NavLink>&nbsp;
              <NavLink to="/home/a/b">Home</NavLink>
          </div>
          <div className="content">
              <Route exact path="/about" component={About} />
              <Route exact path="/home" component={Home} />
          </div>
        </div>
      </div>
    )
  }
}

