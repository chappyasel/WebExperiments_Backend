import React, { useEffect, useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import '../styles/bootstrap.min.css'
import { DEFAULT_INPUT, play } from './util/interface'

import InputForm from './components/InputForm'
import OutputTable from './components/OutputTable'

export default function LiarsDice() {
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

// Styles

const GlobalStyle = createGlobalStyle`
  html {
    margin: 20px;
  }
`
