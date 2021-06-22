import React from 'react'
import styled from 'styled-components'

const Content = styled.section``

const ResumeLink = styled.div`
  background-color: ${p => p.theme.cellColor};
  width: max(min(40vw, 400px), 300px);
  margin: auto;
  border-radius: 20px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &: hover {
    box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.14);
    transform: scale(1.05);
  }
`

const ResumeLinkTitle = styled.h3`
  color: ${p => p.theme.bodyTextColor};
  font-size: min(5vw, 25px);
  text-align: center;
  padding: 15px;
`

export default function Resume({ resumeLink, cvLink }) {
  return (
    <Content>
      <ResumeLink onClick={_ => window.open(resumeLink, '_blank')}>
        <ResumeLinkTitle>Download Resume</ResumeLinkTitle>
      </ResumeLink>
      <ResumeLink onClick={_ => window.open(cvLink, '_blank')}>
        <ResumeLinkTitle>Download CV</ResumeLinkTitle>
      </ResumeLink>
    </Content>
  )
}
