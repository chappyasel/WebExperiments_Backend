import React from 'react'
import styled from 'styled-components'
import { Contact } from '../util/data'

import ContactItem from './ContactItem'

export interface Props {
  contacts: Contact[]
}

export default function ContactView({ contacts }: Props) {
  return (
    <Content>
      {contacts.map((contact, _) => (
        <ContactItem key={contact.name} contact={contact} />
      ))}
    </Content>
  )
}

// Styles

const Content = styled.section`
  padding: 0 40px;
  max-width: 500px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`
