import React from "react";
import classes from './Header.module.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import classes2 from '../UI/common_css.module.css';

const Header=()=>
{
    return(
        <Navbar collapseOnSelect bg="secondary" variant="dark" expand='md' className={classes2.shadow}>
            <Container fluid>
             <Navbar.Brand href="/">Expense Tracker</Navbar.Brand>
             <Navbar.Toggle aria-controls="navLinks" />
                 <Navbar.Collapse id="navLinks" className={classes['right-aligned']}>
                     <Nav>
                         <Nav.Link href="#">Home</Nav.Link>
                         <Nav.Link href="#">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Header;