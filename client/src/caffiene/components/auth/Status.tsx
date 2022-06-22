import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../auth'
import { DB, ICreateDose, DOSE_TYPE } from '../../db'

export default function Status() {
  const [status, setStatus] = useState(false)
  const account = useContext(AuthContext)

  useEffect(() => {
    account.getSession().then(_ => {
      setStatus(true)
    })
  }, [])

  async function create() {
    const dose: ICreateDose = {
      timestamp: Math.floor(new Date().getTime() / 1000),
      consumedInterval: 600,
      name: 'Total War',
      type: DOSE_TYPE.PREWORKOUT,
    }
    const data = await DB.create(dose).catch(err => alert(err))
    console.log(data)
  }

  return (
    <div>
      {status ? <button onClick={account.logOut}>log out</button> : 'please log in'}
      <button onClick={create}>Create</button>
    </div>
  )
}
