import React from 'react'
import styled from 'styled-components'

const Content = styled.div`
  width: 80%;
  max-width: 1200px;
`

const AboutImage = styled.img`
  margin: 30px 50px 50px 0;
  float: left;
  width: 40vw;
  max-width: 500px;
  border-radius: 50%;
  box-shadow: 0px 5px 20px 2px rgba(0, 0, 0, 0.2);

  @media only screen and (max-width: 900px) {
    display: block;
    float: none;
    margin: auto;
    margin-bottom: 30px;
    width: min(80%, 400px);
  }
`

const AboutText = styled.p`
  font-size: min(max(3.5vw, 14px), 22px);
  text-align: justify;
  min-height: 300px;
  color: ${p => p.theme.bodyTextColor};

  & > a {
    color: ${p => p.theme.bodyTextColor};
  }
`

export default function About({ image, description }) {
  return (
    <Content>
      <AboutImage src={image} />
      <AboutText dangerouslySetInnerHTML={description} />
    </Content>
  )
}
