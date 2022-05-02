import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import * as Theme from './util/theme'

import About from './components/About'
import Contact from './components/Contact'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Resume from './components/Resume'
import Section from './components/Section'

// tslint:disable: ordered-imports
import { DATA } from './util/data'
const profileImage = require('./img/about/profile.jpg')
const resumeLink = require('./docs/Gabriel \'Chappy\' Asel Resume.pdf')
const cvLink = require('./docs/Gabriel \'Chappy\' Asel CV.pdf')

const SECTIONS = [
  {
    title: 'About Me',
    id: 'about',
    contents: <About image={profileImage} description={DATA.aboutMe} />,
  },
  {
    title: 'Projects',
    id: 'projects',
    contents: <Projects projects={DATA.projects} />,
  },
  {
    title: 'Resume',
    id: 'resume',
    contents: <Resume resumeLink={resumeLink} cvLink={cvLink} />,
  },
  {
    title: 'Contact',
    id: 'contact',
    contents: <Contact contacts={DATA.contacts} />,
  },
]

export default function Portfolio() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const [dark, setDark] = useState(prefersDark)

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e: any) => {
    setDark(e.matches)
  })

  return (
    <ThemeProvider theme={dark ? Theme.DARK : Theme.LIGHT}>
      <Theme.GlobalStyle />
      <Navbar title='Chappy Asel' items={SECTIONS} />
      {SECTIONS.map((section: any) => (
        <Section key={section.id} {...section} />
      ))}
    </ThemeProvider>
  )
}
