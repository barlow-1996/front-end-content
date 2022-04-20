import React, { Component } from 'react'
import { NavLink, Route, Redirect } from 'react-router-dom'
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
        <hr />
        <div className="row">
          <div className="list-group">
              <NavLink to="/about">About</NavLink>&nbsp;
              <NavLink to="/home">Home</NavLink>
          </div>
          <div className="content">
              <Route path="/about" component={About} />
              <Route path="/home" component={Home} />
              <Redirect to="/about"></Redirect>
          </div>
        </div>
      </div>
    )
  }
}

