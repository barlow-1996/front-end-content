import React, { Component } from 'react'
import SetState from './components/1.setState'
import Hooks from './components/2.hooks'
import Fragment from './components/3.fragment'
import Context from './components/4.context'
import Optimize from './components/5.optimize'
import RenderProps from './components/6.renderProps'
import ErrorBoundary from './components/7.errorBoundary/Parent'
export default class App extends Component {

  render () {
    return (
      <div>
        App..
        <hr />
        <SetState />
        <hr />
        <Hooks />
        <hr />
        <Fragment />
        <hr />
        <h1>Context 组件</h1>
        <Context />
        <hr />
        <h1>Optimize 组件</h1>
        <Optimize />
        <hr />
        <h1>renderProps 组件</h1>
        <RenderProps />
        <hr />
        <h1>errorBoundary 组件</h1>
        <ErrorBoundary />
      </div>
    )
  }
}

