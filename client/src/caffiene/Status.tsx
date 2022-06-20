import React, { useContext, useEffect, useState } from 'react'
import { AccountContext } from './Account'

export default function Status() {
  const [status, setStatus] = useState(false)
  const { getSession, logOut } = useContext(AccountContext)

  useEffect(() => {
    getSession().then((user: any) => {
      setStatus(true)
    })
  }, [])

  return <div>{status ? <button onClick={logOut}>log out</button> : 'please log in'}</div>
}
