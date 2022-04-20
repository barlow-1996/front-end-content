import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import Frame from './components/Frame'
import {adminRoutes} from './routes';
import './App.css'
import {isLogined} from './utils/auth'
class App extends Component {
  render() {
    return isLogined() ?
    (
      <Frame>
        <Switch>
          {
            adminRoutes.map(route => {
              return (
                <Route 
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  render={routeProps => <route.component {...routeProps} />}
                />
              )
            })
          }
          <Redirect to={adminRoutes[0].path} from="/admin" />
          <Redirect to="/404" />
        </Switch>
      </Frame>
    )
    :
    (
      <Redirect to='/login' />
    )
  }
}

export default App;