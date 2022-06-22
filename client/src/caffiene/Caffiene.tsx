import React from 'react'

import { Auth } from './auth'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Status from './components/auth/Status'
import DoseTable from './components/DoseTable'

export default function Caffiene() {
  return (
    <Auth>
      <Status />
      <Signup />
      <Login />
      <DoseTable />
    </Auth>
  )
}
