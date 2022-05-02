import React, { useState, useEffect } from 'react'
import { createGlobalStyle } from 'styled-components'
import '../styles/bootstrap.min.css'
import InputForm, { Input } from './Input'
import OutputTable from './Output'
const fetch = require('node-fetch')

const GlobalStyle = createGlobalStyle`
  html {
    margin: 20px;
  }
`

const DEFAULT_INPUT: Input = {
  myDice: [2, 0, 1, 0, 0, 2],
  totalDice: 20,
  countOnes: true,
}

export default function LiarsDice(): JSX.Element {
  const [input, setInput] = useState(DEFAULT_INPUT)
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
      <InputForm onChange={setInput} input={input} />
      <OutputTable targets={targets} />
    </>
  )
}

async function play(input: Input) {
  return await fetch('api/liarsdice/v1/play', {
    method: 'POST',
    body: JSON.stringify(input),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res: any) => res.json())
    .catch((err: any) => alert(`error: ${err}`))
}
