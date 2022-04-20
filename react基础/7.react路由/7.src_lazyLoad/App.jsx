import React, { Component, lazy, Suspense } from 'react'
import { NavLink, Route } from 'react-router-dom'
import Header from './components/Header'
import './App.css'
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
// import Home from './pages/Home'
// import About from './pages/About'

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
            <Suspense fallback={<h1>Loading...</h1>}>
              <Route path="/about" component={About} />
              <Route path="/home" component={Home} />
            </Suspense>
          </div>
        </div>
      </div>
    )
  }
}

