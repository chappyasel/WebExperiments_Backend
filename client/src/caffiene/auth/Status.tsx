import React, { useContext, useEffect, useState } from 'react'
import { AccountContext } from './Account'
import fetch from 'node-fetch'

export default function Status() {
  const [status, setStatus] = useState(false)
  const account = useContext(AccountContext)

  useEffect(() => {
    account.getSession().then((user: any) => {
      setStatus(true)
    })
  }, [])

  async function test() {
    try {
      const session = await account.getSession()
      const id = await session.getIdToken()
      const token = await id.getJwtToken()
      const response = await fetch('/api/caffiene/v1/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      console.log(response, data)
    } catch (err) {
      alert(err)
    }
  }

  return (
    <div>
      {status ? <button onClick={account.logOut}>log out</button> : 'please log in'}
      <button onClick={test}>Test</button>
    </div>
  )
}
