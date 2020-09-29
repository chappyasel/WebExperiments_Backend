import React from 'react'
import styled from 'styled-components'

import NavbarItem from './NavbarItem'

const Content = styled.section`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: rgb(245, 245, 247);
  height: 80px;
  box-shadow: 0px 5px 20px 2px #ddd;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`

const items = ['About Me', 'Projects', 'Resume', 'Contact']

export default function Navbar({ onSelection }) {
  return (
    <Content>
      {items.map((t, i) => (
        <NavbarItem title={t} onSelection={() => onSelection(i)} />
      ))}
    </Content>
  )
}
