import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Portfolio from './portfolio/Portfolio'
import Privacy from './weightliftingapp/Privacy'

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={Portfolio} />
      <Route exact path="/weightliftingapp/privacy" component={Privacy} />
    </Switch>
  )
}
