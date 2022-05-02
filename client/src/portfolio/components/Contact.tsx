import React from 'react'
import styled from 'styled-components'

import ContactItem, { Contact } from './ContactItem'

const Content = styled.section`
  padding: 0 40px;
  max-width: 500px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`

export interface ContactProps {
  contacts: Contact[]
}

export default function ContactView({ contacts }: ContactProps): JSX.Element {
  return (
    <Content>
      {contacts.map((contact: Contact, _: any) => (
        <ContactItem key={contact.name} contact={contact} />
      ))}
    </Content>
  )
}
