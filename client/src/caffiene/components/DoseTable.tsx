import React, { useContext, useEffect, useState } from 'react'
import { DB, ICreateDose } from '../db'

export default function DoseTable() {
  const [doses, setDoses] = useState<ICreateDose[]>([])

  async function get() {
    await DB.get()
      .then(res => setDoses(res.doses))
      .catch(err => alert(err))
  }

  return (
    <div>
      <button onClick={get}>Get</button>
      {doses.map(dose => (
        <p>{dose.name}</p>
      ))}
    </div>
  )
}
