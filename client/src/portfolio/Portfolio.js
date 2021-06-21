import React from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'

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

const GlobalStyle = createGlobalStyle`
  html {
    font-family: 'Heebo', sans-serif;
    height: 100%;
    background-color: ${p => p.theme.bgColor};
  }

  body {
    margin: 0;
    padding: 80px 0 200px 0;
  }
`

const theme = {
  bgColor: 'rgb(250, 250, 250)',
  navTextColor: 'rgb(80, 80, 80)',
  titleTextColor: 'rgb(80, 80, 80)',
  bodyTextColor: 'rgb(120, 120, 120)',
  cellColor: 'rgb(242, 242, 242)',
}

export default function Portfolio() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navbar onSelection={i => i.current?.scrollTo(i)} />
      <Section
        title="About Me"
        offset={0}
        children={<About image={profileImage} description={data.aboutMe} />}
      />
      <Section
        title="Projects"
        offset={1}
        children={<Projects projects={data.projects} />}
      />
      <Section
        title="Resume"
        offset={2}
        children={<Resume resumeLink={resumeLink} cvLink={cvLink} />}
      />
      <Section
        title="Contact"
        offset={3}
        children={<Contact contacts={data.contacts} />}
      />
    </ThemeProvider>
  )
}
