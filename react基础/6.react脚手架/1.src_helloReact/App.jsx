import React, {Component} from 'react'
import Hello from './components/Hello/Hello'
import Welcome from './components/welcome/Welcome'
export default class App extends Component {
  render() {
    return (
      <div>
        <Hello/>
        <Welcome/>
      </div>
    )
  }
}