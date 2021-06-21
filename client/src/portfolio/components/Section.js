import React from 'react'
import styled from 'styled-components'

const Content = styled.div`
  margin: auto;
  max-width: 2000px;
  padding: 100px 0 100px 0;
  background-color: clear;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: visible;
`

const Title = styled.h1`
  margin: 0 0 20px 0;
  text-align: center;
  color: ${p => p.theme.titleTextColor};
  font-size: min(max(7vw, 40px), 70px);
`

export default function Section({ title, offset, children }) {
  return (
    <Content>
      <Title>{title}</Title>
      {children}
    </Content>
  )
}
