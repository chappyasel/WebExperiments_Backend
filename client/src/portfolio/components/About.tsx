import React from 'react'
import styled from 'styled-components'
import { AboutMe } from '../util/data'

export interface Props {
  image: string
  description: AboutMe
}

export default function About({ image, description }: Props) {
  return (
    <Content>
      <AboutImage src={image} />
      <AboutText dangerouslySetInnerHTML={description} />
    </Content>
  )
}

// Styles

const Content = styled.div`
  width: 80%;
  max-width: 1200px;

  @media only screen and (max-width: 600px) {
    width: 90%;
  }
`

const AboutImage = styled.img`
  margin: 30px 50px 50px 0;
  float: left;
  width: 35vw;
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
  font-size: min(max(3vw, 15px), 20px);
  text-align: justify;
  -ms-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
  -ms-hyphenate-limit-lines: 1;
  -webkit-hyphenate-limit-lines: 1;
  min-height: 300px;
  color: ${p => p.theme.bodyTextColor};

  & > a {
    color: ${p => p.theme.bodyTextColor};
  }
`
