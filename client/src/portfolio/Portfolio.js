import React, { useState } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import Navbar from './components/Navbar'
import Section from './components/Section'
import About from './components/About'
import Projects from './components/Projects'
import Resume from './components/Resume'
import Contact from './components/Contact'

import data from './data'
import profileImage from './img/about/profile.jpg'
import resumeLink from "./docs/Gabriel 'Chappy' Asel Resume.pdf"
import cvLink from "./docs/Gabriel 'Chappy' Asel CV.pdf"

const SECTIONS = [
  {
    title: 'About Me',
    id: 'about',
    contents: <About image={profileImage} description={data.aboutMe} />,
  },
  {
    title: 'Projects',
    id: 'projects',
    contents: <Projects projects={data.projects} />,
  },
  {
    title: 'Resume',
    id: 'resume',
    contents: <Resume resumeLink={resumeLink} cvLink={cvLink} />,
  },
  {
    title: 'Contact',
    id: 'contact',
    contents: <Contact contacts={data.contacts} />,
  },
]

const GlobalStyle = createGlobalStyle`
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

const lightTheme = {
  bgColor: 'rgb(250, 250, 250)',
  navBGColor: 'rgb(250, 250, 250)',
  navTextColor: 'rgb(80, 80, 80)',
  titleTextColor: 'rgb(80, 80, 80)',
  bodyTextColor: 'rgb(120, 120, 120)',
  cellColor: 'rgb(242, 242, 242)',
}

const darkTheme = {
  bgColor: 'rgb(0, 0, 0)',
  navBGColor: 'rgb(32, 32, 32)',
  navTextColor: 'rgb(255, 255, 255)',
  titleTextColor: 'rgb(235, 235, 235)',
  bodyTextColor: 'rgb(225, 225, 225)',
  cellColor: 'rgb(32, 32, 32)',
}

export default function Portfolio() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const [dark, setDark] = useState(prefersDark)

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', event => {
      setDark(event.matches)
    })

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Navbar title="Chappy Asel" items={SECTIONS} />
      {SECTIONS.map(section => (
        <Section key={section.id} {...section} />
      ))}
    </ThemeProvider>
  )
}
