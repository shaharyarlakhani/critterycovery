import React from 'react'; 
import logo from '../../images/logo.png';
import {Navbar, Nav, Form, Button, FormControl} from 'react-bootstrap'
  
const NavbarMain = () => { 
  return ( 
    <>
      <Navbar sticky="top" bg="light" expand="lg">
        <Navbar.Brand href="/">
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="CritteryCovery logo"
        />
        critterycovery
       </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/species">Species</Nav.Link>
            <Nav.Link href="/habitats">Habitats</Nav.Link>
            <Nav.Link href="/countries">Countries</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  ); 
}; 
  
export default NavbarMain;
