import React, { useState, useEffect } from 'react'
import { createGlobalStyle } from 'styled-components'
import { Table, Form, Stack } from 'react-bootstrap'
const fetch = require('node-fetch')

const GlobalStyle = createGlobalStyle`
  html {
    font-family: sans-serif;
    margin: 20px;
  }
`

export default function LiarsDice() {
  const [input, setInput] = useState({
    myDice: [2, 0, 1, 0, 0, 2],
    totalDice: 20,
    countOnes: true,
  })
  const [targets, setTargets] = useState([])

  useEffect(() => {
    const playGame = async () => {
      const output = await play(input)
      if (output?.targets !== undefined) {
        setTargets(output.targets)
      }
    }

    playGame()
  }, [input])

  return (
    <>
      <GlobalStyle />
      <Form className="mb-5">
        <Stack direction="horizontal">
          {input.myDice.map((numDice, index) => (
            <Form.Group key={index} className="mb-3" style={{ width: '100px' }}>
              <Form.Label>{numberToString(index)}</Form.Label>
              <Form.Control
                type="number"
                value={numDice}
                onChange={e => {
                  const myDice = input.myDice
                  myDice[index] = parseInt(e.target.value)
                  setInput({ ...input, myDice })
                }}
              />
            </Form.Group>
          ))}
        </Stack>
        <Form.Group className="mb-3">
          <Form.Label>Dice left</Form.Label>
          <Form.Control
            type="number"
            value={input.totalDice}
            onChange={e => setInput({ ...input, totalDice: e.target.value })}
          />
        </Form.Group>
        <Form.Check
          type="checkbox"
          label="count ones"
          checked={input.countOnes}
          onChange={e => setInput({ ...input, countOnes: e.target.checked })}
        />
      </Form>
      {targets.map(target => (
        <div>
          <h1>
            Odds for {target.diceNumber} (you have {target.alreadyHave}):
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

const play = async input =>
  await fetch('api/liarsdice/v1/play', {
    method: 'POST',
    body: JSON.stringify(input),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .catch(err => alert(`error: ${err}`))

const numberToString = number => {
  switch (number) {
    case 0:
      return 'Ones'
    case 1:
      return 'Twos'
    case 2:
      return 'Threes'
    case 3:
      return 'Fours'
    case 4:
      return 'Fives'
    case 5:
      return 'Sixes'
  }
}
