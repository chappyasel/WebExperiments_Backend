import React from 'react'
import { DATA } from './data'

import About from '../components/About'
import Contact from '../components/Contact'
import Projects from '../components/Projects'
import Resume from '../components/Resume'

const profileImage = require('../img/about/profile.jpg')
const resumeLink = require('../docs/Gabriel \'Chappy\' Asel Resume.pdf')
const cvLink = require('../docs/Gabriel \'Chappy\' Asel CV.pdf')

export interface Section {
  id: string
  title: string
  contents: JSX.Element
}

export const SECTIONS: Section[] = [
  {
    id: 'about',
    title: 'About Me',
    contents: <About image={profileImage} description={DATA.aboutMe} />,
  },
  {
    id: 'projects',
    title: 'Projects',
    contents: <Projects {...DATA.projects} />,
  },
  {
    id: 'resume',
    title: 'Resume',
    contents: <Resume resumeLink={resumeLink} cvLink={cvLink} />,
  },
  {
    id: 'contact',
    title: 'Contact',
    contents: <Contact contacts={DATA.contacts} />,
  },
]
