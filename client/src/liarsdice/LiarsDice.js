import React, { useState, useEffect } from 'react'
import { createGlobalStyle } from 'styled-components'
const fetch = require('node-fetch')

const GlobalStyle = createGlobalStyle`
  html {
    font-family: sans-serif;
  }
`

export default function LiarsDice() {
  const [targets, setTargets] = useState([])

  useEffect(() => {
    const loadGame = async () => {
      const input = {
        myDice: [2, 0, 1, 0, 0, 1],
        totalDice: 20,
        countOnes: true,
      }
      const output = await play(input.myDice, input.totalDice, input.countOnes)
      setTargets(output.targets)
    }

    loadGame()
  }, [])

  return (
    <>
      <GlobalStyle />
      {targets.map(target => (
        <div>
          <p>
            Odds for {target.diceNumber} (you already have {target.alreadyHave}):
          </p>
          {target.scenarios.map(scenario => {
            const probability = (scenario.probability * 100).toFixed(2)
            const spotOn = (scenario.spotOnProbability * 100).toFixed(2)
            return (
              <p>
                &nbsp;{scenario.numMatches}:&nbsp;{probability}% (spot on: {spotOn}%)
              </p>
            )
          })}
        </div>
      ))}
    </>
  )
}

const play = async (myDice, totalDice, countOnes) =>
  await fetch('api/liarsdice/v1/play', {
    method: 'POST',
    body: JSON.stringify({ myDice, totalDice, countOnes }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .catch(err => alert('error', err))
