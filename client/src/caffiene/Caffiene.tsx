import React from 'react'

import { Account } from './auth/Account'
import Login from './auth/Login'
import Signup from './auth/Signup'
import Status from './auth/Status'

// TODO: Database based on TypeDORM / DynamoDB
// https://medium.com/nextfaze/supercharge-%EF%B8%8F-your-dynamodb-single-table-design-pattern-with-typedorm-39168d0d2e29

export default function Caffiene() {
  return (
    <Account>
      <Status />
      <Signup />
      <Login />
    </Account>
  )
}
