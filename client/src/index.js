import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import App from './App'

const GlobalStyle = createGlobalStyle`
  html {
    font-family: 'Heebo', sans-serif;
    height: 100%;
    background-color: white;
  }

  body {
    margin: 0;
  }
`

render(
  <React.Fragment>
    <GlobalStyle />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById('root')
)
