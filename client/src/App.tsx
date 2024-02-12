import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Caffiene from './caffiene/Caffiene'
import Cofactory from './cofactory/Cofactory'
import LiarsDice from './liarsdice/LiarsDice'
import Portfolio from './portfolio/Portfolio'
import Privacy from './weightliftingapp/Privacy'

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={Portfolio} />
      <Route exact path="/weightliftingapp/privacy" component={Privacy} />
      <Route exact path="/caffiene" component={Caffiene} />
      <Route exact path="/liarsdice" component={LiarsDice} />
      <Route exact path="/cofactory" component={Cofactory} />
    </Switch>
  )
}
