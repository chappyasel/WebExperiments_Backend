import React from 'react'
import styled from 'styled-components'

import ContactItem from './ContactItem'

const Content = styled.section`
  max-width: 500px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`

export default function Contact({ contacts }) {
  return (
    <Content>
      {contacts.map((c, _) => (
        <ContactItem contact={c} />
      ))}
    </Content>
  )
}
