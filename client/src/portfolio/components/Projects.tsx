import React from 'react'
import styled from 'styled-components'
import { Projects } from '../util/data'

import ProjectItem from './ProjectItem'

export default function ProjectsView(projects: Projects) {
  return (
    <Content>
      {projects.list.map((project, _) => (
        <ProjectItem key={project.name} project={project} />
      ))}
    </Content>
  )
}

// Styles

const Content = styled.section`
  width: 80%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
`
