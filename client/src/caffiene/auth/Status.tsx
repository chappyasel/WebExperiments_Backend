import React, { useContext, useEffect, useState } from 'react'
import { AccountContext } from './Account'
import fetch from 'node-fetch'
import { DOSE_TYPE, ICreateDose } from '@shared/caffiene'

export default function Status() {
  const [status, setStatus] = useState(false)
  const account = useContext(AccountContext)

  useEffect(() => {
    account.getSession().then((user: any) => {
      setStatus(true)
    })
  }, [])

  async function create() {
    try {
      const session = await account.getSession()
      const id = await session.getIdToken()
      const token = await id.getJwtToken()
      const dose: ICreateDose = {
        timestamp: Math.floor(new Date().getTime() / 1000),
        consumedInterval: 600,
        name: 'Total War',
        type: DOSE_TYPE.PREWORKOUT,
      }
      const response = await fetch('/api/caffiene/v1/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(dose),
      })
      const data = await response.json()
      console.log(response, data)
    } catch (err) {
      alert(err)
    }
  }

  async function get() {
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
      <button onClick={create}>Create</button>
      <button onClick={get}>Get</button>
    </div>
  )
}
