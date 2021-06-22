import React from 'react'
import styled from 'styled-components'

const Content = styled.div`
  margin: auto;
  max-width: 2000px;
  padding: 100px 0;
  background-color: clear;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: visible;

  @media only screen and (max-width: 900px) {
    padding: 50px 0;
  }
`

const Title = styled.h1`
  margin: 0 0 20px 0;
  text-align: center;
  color: ${p => p.theme.titleTextColor};
  font-size: min(max(6vw, 35px), 60px);
`

export default function Section({ title, id, contents }) {
  return (
    <Content id={id}>
      <Title>{title}</Title>
      {contents}
    </Content>
  )
}
