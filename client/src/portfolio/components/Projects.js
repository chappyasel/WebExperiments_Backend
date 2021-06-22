import React from 'react'
import styled from 'styled-components'

import ProjectItem from './ProjectItem'

const Content = styled.section`
  width: 80%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
`

export default function Projects({ projects }) {
  return (
    <Content>
      {projects.list.map((p, _) => (
        <ProjectItem key={p.name} project={p} />
      ))}
    </Content>
  )
}
