import React from 'react'
import styled from 'styled-components'

const Content = styled.div`
  width: 80%;
  max-width: 1200px;
`

const AboutImage = styled.img`
  margin: 0 20px 20px 0;
  float: left;
  width: 25vw;
  min-width: 140px;
  max-width: 350px;
  border-radius: 50%;
  box-shadow: 0px 5px 20px 2px #ccc;

  @media only screen and (min-width: 1000px) {
    width: 20vw;
    margin: 0 30px 30px 10px;
  }

  @media only screen and (max-width: 750px) {
    width: 35vw;
  }
`

const AboutText = styled.p`
  font-size: 2.2vw;
  text-align: justify;
  min-height: 300px;
  color: ${p => p.theme.bodyTextColor};

  & > a {
    color: ${p => p.theme.bodyTextColor};
  }

  @media only screen and (min-width: 1000px) {
    font-size: 20px;
    margin: 0 10px 10px 10px;
  }

  @media only screen and (max-width: 750px) {
    font-size: 3vw;
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
