import React from 'react'
import Table from 'react-bootstrap/Table'

export interface Target {
  diceNumber: number,
  alreadyHave: number,
  scenarios: [any]
}

export interface TargetsProps {
  targets: Target[]
}

export default function OutputTable({ targets }: TargetsProps): JSX.Element {
  return (
    <>
      {targets.map(target => (
        <div>
          <h1>
            Odds for {target.diceNumber}s (you have {target.alreadyHave}):
          </h1>
          <Table key={target.diceNumber} bordered striped size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Probability</th>
                <th>Spot On</th>
              </tr>
            </thead>
            <tbody>
              {target.scenarios.map(scenario => {
                const probability = (scenario.probability * 100).toFixed(2)
                const spotOn = (scenario.spotOnProbability * 100).toFixed(2)
                return (
                  <tr>
                    <td>{scenario.numMatches}</td>
                    <td>{probability}%</td>
                    <td>{spotOn}%</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      ))}
    </>
  )
}
