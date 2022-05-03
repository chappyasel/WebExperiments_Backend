import React from 'react'
import styled from 'styled-components'
import { Contact } from '../util/data'

export interface Props {
  contact: Contact
}

export default function ContactItem({ contact }: Props) {
  return (
    <Content
      contact={contact}
      title={contact.name}
      onClick={(_) => window.open(contact.link, '_blank')}
    />
  )
}

// Styles

const Content = styled('div')<{ contact: Contact }>`
  margin: 10px;
  width: min(20vw, 100px);
  height: min(20vw, 100px);
  background-image: ${p => `url(${require('../img/contact/' + p.contact.image)})`};
  background-position: center;
  background-size: min(20vw, 100px);
  background-color: ${p => p.theme.cellColor};
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.14);
    transform: scale(1.05);
  }
`
