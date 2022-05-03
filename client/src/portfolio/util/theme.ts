import { createGlobalStyle } from 'styled-components'

export interface Theme {
  bgColor: string
  navBGColor: string
  navTextColor: string
  navHoverColor: string
  titleTextColor: string
  bodyTextColor: string
  cellColor: string
}

export const LIGHT: Theme = {
  bgColor: 'rgb(250, 250, 250)',
  navBGColor: 'rgb(250, 250, 250)',
  navTextColor: 'rgb(80, 80, 80)',
  navHoverColor: 'rgb(150, 150, 150)',
  titleTextColor: 'rgb(80, 80, 80)',
  bodyTextColor: 'rgb(120, 120, 120)',
  cellColor: 'rgb(242, 242, 242)',
}

export const DARK: Theme = {
  bgColor: 'rgb(0, 0, 0)',
  navBGColor: 'rgb(32, 32, 32)',
  navTextColor: 'rgb(255, 255, 255)',
  navHoverColor: 'rgb(165, 165, 165)',
  titleTextColor: 'rgb(235, 235, 235)',
  bodyTextColor: 'rgb(225, 225, 225)',
  cellColor: 'rgb(32, 32, 32)',
}

export const GlobalStyle = createGlobalStyle`
  :root {
      color-scheme: light dark;
  }

  html {
    scroll-behavior: smooth;
    font-family: 'Heebo', sans-serif;
    height: 100%;
    background-color: ${p => p.theme.bgColor};
  }

  body {
    margin: 0;
    padding: 80px 0 200px 0;
  }
`
