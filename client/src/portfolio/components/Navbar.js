import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const HEIGHT = 80
const ITEMS = ['About Me', 'Projects', 'Resume', 'Contact']

const NavbarView = styled.nav`
  position: fixed;
  top: ${p => (p.visible ? '0' : '-80px')};
  width: 100%;
  height: ${HEIGHT}px;
  background-color: ${p => p.theme.bgColor};
  box-shadow: ${p => (p.visible ? '0px 5px 10px 2px rgba(0,0,0,0.1)' : 'none')};
  z-index: 10;
  transition: all 0.4s ease 0s;
`

const Content = styled.div`
  height: 100%;
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &::before {
    content: '';
    min-width: 50px;
  }
  &::after {
    content: '';
    min-width: 50px;
  }
`

const Title = styled.p`
  font-size: min(3vw, 40px);
  font-weight: 600;
  color: ${p => p.theme.navTextColor};
  flex: 2;
`

const Item = styled.a`
  font-size: min(2.5vw, 25px);
  font-weight: 500;
  color: ${p => p.theme.navTextColor};
  text-align: center;
  text-decoration: none;
  padding: 10px;
  flex: 1;
`

export default function Navbar({ onSelection }) {
  const [prevPos, setPrevPos] = useState(0)
  const [visible, setVisible] = useState(true)

  function handleScroll() {
    const currPos = window.pageYOffset
    setVisible(currPos < HEIGHT || prevPos > currPos)
    setPrevPos(currPos)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevPos, visible, handleScroll])

  return (
    <NavbarView visible={visible}>
      <Content>
        <Title>Chappy Asel</Title>
        {ITEMS.map((title, i) => (
          <Item href="#" onClick={_ => onSelection(i)}>
            {title}
          </Item>
        ))}
      </Content>
    </NavbarView>
  )
}
