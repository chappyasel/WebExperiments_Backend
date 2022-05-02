import React from 'react'
import styled from 'styled-components'
import * as Theme from '../util/theme'

const Content: Theme.Component<{ contact: Contact }> = styled.div`
  margin: 10px;
  width: min(20vw, 100px);
  height: min(20vw, 100px);
  background-image: ${(p: Theme.Props) =>
    `url(${require('../img/contact/' + p.contact.image)})`};
  background-position: center;
  background-size: min(20vw, 100px);
  background-color: ${(p: Theme.Props) => p.theme.cellColor};
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.14);
    transform: scale(1.05);
  }
`

export interface Contact {
  name: string
  link: string
  image: string
}

export interface ContactProps {
  contact: Contact
}

export default function ContactItem({ contact }: ContactProps): JSX.Element {
  return (
    <Content
      contact={contact}
      title={contact.name}
      onClick={(_) => window.open(contact.link, '_blank')}
    />
  )
}
