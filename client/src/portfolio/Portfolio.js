import React, { useRef } from 'react'
import { ThemeProvider } from 'styled-components'
import { Parallax } from 'react-spring/renderprops-addons'

import Navbar from './components/Navbar'
import Section from './components/Section'
import About from './components/About'
import Projects from './components/Projects'
import Resume from './components/Resume'
import Contact from './components/Contact'

import data from './data'
import profileImage from './img/about/profile.jpg'
import resumeLink from "./docs/Gabriel 'Chappy' Asel Resume.pdf"

const theme = {
  bgColor: 'white',
  bgAltColor: 'rgb(245, 245, 247)',
  titleTextColor: 'rgb(80, 80, 82)',
  navTextColor: 'rgb(120, 120, 122)',
  bodyTextColor: 'rgb(120, 120, 122)',
  cellColor: 'rgb(245, 245, 247)',
}

export default function Portfolio() {
  const parallax = useRef()

  return (
    <ThemeProvider theme={theme}>
      <Parallax pages={4} ref={parallax}>
        <Section
          title="Contact"
          offset={3}
          children={<Contact contacts={data.contacts} />}
        />
        <Section
          title="Resume"
          offset={2}
          children={<Resume link={resumeLink} />}
        />
        <Section
          title="Projects"
          offset={1}
          children={<Projects projects={data.projects} />}
        />
        <Section
          title="About Me"
          offset={0}
          children={<About image={profileImage} description={data.aboutMe} />}
        />
      </Parallax>
      <Navbar onSelection={i => parallax.current?.scrollTo(i)} />
    </ThemeProvider>
  )
}
