import React from 'react'

import { Account } from './Account'
import Login from './Login'
import Signup from './Signup'
import Status from './Status'

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
