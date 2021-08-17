import React, { FC } from 'react'
import { Navbar, Container } from 'react-bootstrap'
import styled from 'styled-components'
import { capitalize } from '../utils/text'

type PropsHeader = {
  userName: string
}
const Header: FC<PropsHeader> = ({ userName }) => {


  return (
    <>
      <Navbar bg="primary" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="#home">Kanban board</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: {capitalize(userName)}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Support />
    </>
  )
}
const Support = styled.div`
height:50px
`


export default Header