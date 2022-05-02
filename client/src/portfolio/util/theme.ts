import { createGlobalStyle, StyledComponent } from 'styled-components'

export type Component<ThemeProps extends object> = StyledComponent<'div', any, ThemeProps, never>

export interface Props {
  theme: Theme
  [key: string]: any
}

export interface Theme {
  bgColor: string
  navBGColor: string
  navTextColor: string
  titleTextColor: string
  bodyTextColor: string
  cellColor: string
}

export const LIGHT: Theme = {
  bgColor: 'rgb(250, 250, 250)',
  navBGColor: 'rgb(250, 250, 250)',
  navTextColor: 'rgb(80, 80, 80)',
  titleTextColor: 'rgb(80, 80, 80)',
  bodyTextColor: 'rgb(120, 120, 120)',
  cellColor: 'rgb(242, 242, 242)',
}

export const DARK: Theme = {
  bgColor: 'rgb(0, 0, 0)',
  navBGColor: 'rgb(32, 32, 32)',
  navTextColor: 'rgb(255, 255, 255)',
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
    background-color: ${(p: Props) => p.theme.bgColor};
  }

  body {
    margin: 0;
    padding: 80px 0 200px 0;
  }
`
