import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { SECTIONS } from './util/sections'
import * as Theme from './util/theme'

import Navbar from './components/Navbar'
import Section from './components/Section'

export default function Portfolio() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const [dark, setDark] = useState(prefersDark)

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    setDark(e.matches)
  })

  return (
    <ThemeProvider theme={dark ? Theme.DARK : Theme.LIGHT}>
      <Theme.GlobalStyle />
      <Navbar title='Chappy Asel' sections={SECTIONS} />
      {SECTIONS.map(section => (
        <Section key={section.id} {...section} />
      ))}
    </ThemeProvider>
  )
}
