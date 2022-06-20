import React from 'react'

import { Account } from './auth/Account'
import Login from './auth/Login'
import Signup from './auth/Signup'
import Status from './auth/Status'

export default function Caffiene() {
  return (
    <Account>
      <Status />
      <Signup />
      <Login />
    </Account>
  )
}
