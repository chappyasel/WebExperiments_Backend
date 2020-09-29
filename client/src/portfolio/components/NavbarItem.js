import React from 'react'
import styled from 'styled-components'

const Content = styled.h1`
  cursor: pointer;
  color: ${p => p.theme.navTextColor};
  padding: 20px;
  margin: auto;
`

export default function NavbarItem({ title, isSelected, onSelection }) {
  return <Content onClick={_ => onSelection()}>{title}</Content>
}
