import React from 'react'
import styled from 'styled-components'

const ProjectDiv = styled.div`
  position: relative;
  width: 47%;
  margin: 10px;
  height: 20vw;
  border-radius: 20px;
  box-shadow: 0px 5px 20px 2px #ccc;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  overflow: hidden;

  &: hover {
    box-shadow: 0px 5px 30px 0px #ddd;
    transform: scale(1.03);
  }
`

const Blur = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  filter: blur(2px);
  background-image: ${p =>
    `url(${require('../img/projects/' + p.project.image)})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
  overflow: hidden;
`

const Content = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  background-color: rgba(144, 204, 249, 0.8);
  border-radius: 15px;

  & > h3 {
    width: auto;
    color: white;
    margin: 10px 20px 10px 20px;
    padding-top: 0;
    font-size: 25px;
  }

  @media only screen and (max-width: 1050px) {
    width: 90%;
    height: 40vw;
    min-height: 250px;
    max-height: 300px;

    & > h3 {
      font-size: 18px;
    }
  }
`

export default function Project({ project }) {
  return (
    <ProjectDiv onClick={_ => (window.location.href = project.link)}>
      <Blur project={project} />
      <Content>
        <h3>{project.name}</h3>
      </Content>
    </ProjectDiv>
  )
}
