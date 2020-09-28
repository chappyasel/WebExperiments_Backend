import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Portfolio from './portfolio/Portfolio'
import Privacy from './weightliftingapp/Privacy'

export default class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path="/" component={Portfolio} />
          <Route exact path="/weightliftingapp/privacy" component={Privacy} />
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App />
      </Switch>
    )
  }
}
