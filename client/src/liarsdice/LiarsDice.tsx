import React, { useEffect, useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import '../styles/bootstrap.min.css'
import * as LiarsDice from '../../../shared/liarsdice/liarsDice'

import InputForm from './components/InputForm'
import OutputTable from './components/OutputTable'

export const DEFAULT_INPUT: LiarsDice.Input = {
  myDice: [2, 0, 1, 0, 0, 2],
  totalDice: 20,
  countOnes: true,
}

export default function LiarsDiceView() {
  const [input, setInput] = useState(DEFAULT_INPUT)
  const [output, setOutput] = useState<LiarsDice.Output>()

  useEffect(() => {
    const output = LiarsDice.play(input)
    setOutput(output)
  }, [input])

  return (
    <>
      <GlobalStyle />
      <InputForm onChange={setInput} input={input} />
      {output && <OutputTable output={output} />}
    </>
  )
}

// Styles

const GlobalStyle = createGlobalStyle`
  html {
    margin: 20px;
  }
`
