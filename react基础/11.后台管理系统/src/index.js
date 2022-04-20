import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import {mainRoutes} from './routes'
import App from './App'

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/admin" render={routeProps => <App {...routeProps} />} />
      {
        mainRoutes.map(route => {
          return (
            <Route 
              key={route.path}
              path={route.path}
              component={route.component}
            />
          )
        })
      }
      <Redirect to="/admin" from="/" />
      <Redirect to="/404" />
    </Switch>
  </HashRouter>,
  document.getElementById('root'));