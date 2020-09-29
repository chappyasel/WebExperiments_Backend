import React from 'react'
import styled from 'styled-components'

import profileimg from './img/about/profile.jpg'
import resumepdf from "./docs/Gabriel 'Chappy' Asel Resume.pdf"
import data from './data'

import Project from './components/Project'
import Contact from './components/Contact'

const App = styled.div`
  text-align: center;
  padding-bottom: 100px;
  background-color: #f6f6f6;
`

const Section = styled.article`
  margin: 20px;
  padding: 20px;
  min-height: 200px;
  background-color: white;
  border-radius: 40px;
`

const Header = styled.h1`
  margin: 0 0 20px 0;
  text-align: center;
  color: rgb(144, 202, 249);
  font-size: 50px;

  @media only screen and (min-width: 1200px) {
    font-size: 70px;
  }

  @media only screen and (max-width: 750px) {
    font-size: 10vw;
  }
`

const AboutImage = styled.img`
  margin: 0 20px 20px 0;
  float: left;
  width: 25vw;
  min-width: 140px;
  max-width: 300px;
  border-radius: 50%;
  box-shadow: 0px 5px 20px 2px #ccc;

  @media only screen and (min-width: 1000px) {
    width: 20vw;
    margin: 0 30px 30px 10px;
  }

  @media only screen and (max-width: 750px) {
    width: 35vw;
  }
`

const AboutText = styled.p`
  font-size: 2vw;
  text-align: justify;
  min-height: 300px;
  color: #777;

  & > a {
    color: #777;
  }

  @media only screen and (min-width: 1000px) {
    font-size: 16px;
    margin: 0 10px 10px 10px;
  }

  @media only screen and (max-width: 750px) {
    font-size: 3vw;
  }
`

const Projects = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
`

const Contacts = styled.section`
  max-width: 500px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  margin: auto;
`

const ResumeLink = styled.div`
  background-color: #81d4fa;
  width: 300px;
  margin: auto;
  border-radius: 20px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 5px 15px 2px #ccc;
  cursor: pointer;

  &: hover {
    box-shadow: 0px 5px 20px 0px #ddd;
    transform: scale(1.05);
  }
`

const ResumeLinkTitle = styled.h3`
  padding: 10px;
  font-size: 25px;
  color: white;
  text-align: center;
`

export default function Portfolio() {
  return (
    <App>
      <Section>
        <Header>About Me</Header>
        <AboutImage src={profileimg} />
        <AboutText dangerouslySetInnerHTML={data.aboutMe} />
      </Section>
      <Section>
        <Header>Projects</Header>
        <Projects>
          {data.projects.list.map((p, _) => (
            <Project project={p} />
          ))}
        </Projects>
      </Section>
      <Section>
        <Header>Resume</Header>
        <section>
          <ResumeLink onClick={_ => (window.location.href = resumepdf)}>
            <ResumeLinkTitle>Download</ResumeLinkTitle>
          </ResumeLink>
        </section>
      </Section>
      <Section>
        <Header>Contact</Header>
        <Contacts>
          {data.contacts.map((c, _) => (
            <Contact contact={c} />
          ))}
        </Contacts>
      </Section>
    </App>
  )
}
