import React, { useContext, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { DB, IDoseDelete } from '../db'

export default function DoseTable() {
  const [doses, setDoses] = useState<any[]>([])

  function getDoses() {
    DB.get()
      .then(res => setDoses(res.doses))
      .catch(err => alert(err))
  }

  function deleteDose(dose: IDoseDelete) {
    DB.delete(dose).catch(err => alert(err))
  }

  return (
    <>
      <button onClick={_ => getDoses()}>Get</button>
      <Table bordered striped size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Timestamp</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {doses.map(dose => (
            <tr key={dose.id}>
              <td>{dose.name}</td>
              <td>{dose.timestamp}</td>
              <td>{dose.type}</td>
              <td>
                <button onClick={_ => deleteDose(dose)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
