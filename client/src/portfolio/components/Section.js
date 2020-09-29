import React from 'react'
import styled from 'styled-components'
import { ParallaxLayer } from 'react-spring/renderprops-addons'

const Content = styled(ParallaxLayer)`
  margin-top: 40px;
  background-color: clear;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: visible;
`

const Background = styled(ParallaxLayer)`
  background-color: ${p =>
    p.offset % 2 == 0 ? p.theme.bgColor : p.theme.bgAltColor};
`

const Title = styled.h1`
  margin: 0 0 20px 0;
  text-align: center;
  color: ${p => p.theme.titleTextColor};
  font-size: 50px;

  @media only screen and (min-width: 1200px) {
    font-size: 70px;
  }

  @media only screen and (max-width: 750px) {
    font-size: 10vw;
  }
`

export default function Section({ title, offset, children }) {
  return (
    <React.Fragment>
      <Background offset={offset} speed={0} />
      <Content offset={offset} speed={1}>
        <Title>{title}</Title>
        {children}
      </Content>
    </React.Fragment>
  )
}
