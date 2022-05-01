import React from 'react'
import styled from 'styled-components'

const Content = styled.div`
  position: relative;
  width: 47%;
  margin: 10px;
  height: 300px;
  border-radius: 20px;
  box-shadow: 0px 5px 20px 2px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  overflow: hidden;

  &: hover {
    box-shadow: 0px 5px 30px 0px rgba(0, 0, 0, 0.14);
    transform: scale(1.03);
  }

  @media only screen and (max-width: 1200px) {
    width: 90%;
    height: 40vw;
    min-height: 250px;
    max-height: 350px;
  }
`

const Image = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-image: ${p =>
    `url(${require('../img/projects/' + (p.project.image ?? 'default.jpg'))})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: ${p => 'center' + (p.project.image ? 'top' : '')};
  overflow: hidden;
`

const Details = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  background-color: ${p => p.theme.cellColor};
  border-radius: 15px;

  & > h3 {
    width: auto;
    color: ${p => p.theme.bodyTextColor};
    margin: 10px 20px 10px 20px;
    padding-top: 0;
    font-size: min(max(2.5vw, 18px), 25px);
  }
`

export default function ProjectItem({ project }) {
  return (
    <Content onClick={_ => window.open(project.link, '_blank')}>
      <Image project={project} />
      <Details>
        <h3>{project.name}</h3>
      </Details>
    </Content>
  )
}
