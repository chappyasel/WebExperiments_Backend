import React, { useState, useEffect } from 'react'
import { createGlobalStyle } from 'styled-components'
import '../styles/bootstrap.min.css'
import Input from './Input'
import Output from './Output'
const fetch = require('node-fetch')

const GlobalStyle = createGlobalStyle`
  html {
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

  const playGame = async () => {
    const output = await play(input)
    if (output?.targets !== undefined) {
      setTargets(output.targets)
    }
  }

  useEffect(() => {
    playGame()
  }, [input])

  return (
    <>
      <GlobalStyle />
      <Input onChange={setInput} input={input} />
      <Output targets={targets} />
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
