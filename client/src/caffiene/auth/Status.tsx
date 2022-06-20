import React, { useContext, useEffect, useState } from 'react'
import { AccountContext } from './Account'

export default function Status() {
  const [status, setStatus] = useState(false)
  const account = useContext(AccountContext)

  useEffect(() => {
    account.getSession().then((user: any) => {
      console.log(user)
      setStatus(true)
    })
  }, [])

  return <div>{status ? <button onClick={account.logOut}>log out</button> : 'please log in'}</div>
}
