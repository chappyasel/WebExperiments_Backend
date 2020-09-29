import React from 'react'
import styled from 'styled-components'

const Content = styled.section``

const ResumeLink = styled.div`
  background-color: ${p => p.theme.cellColor};
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
  color: ${p => p.theme.bodyTextColor};
  font-size: 25px;
  text-align: center;
  padding: 10px;
`

export default function Resume({ link }) {
  return (
    <Content>
      <ResumeLink onClick={_ => (window.location.href = link)}>
        <ResumeLinkTitle>Download</ResumeLinkTitle>
      </ResumeLink>
    </Content>
  )
}
