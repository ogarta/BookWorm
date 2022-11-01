import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './style.scss';

function HeaderComponent() {
    return (
        <header>

            <Navbar bg="dark" variant="dark" className="navbar">
                <Container>
                    <Navbar.Brand href="/home">BOOKWORM</Navbar.Brand>
                    <Nav>
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/shop">Shop</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/cart">Cart</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </header>
    );
}

export default HeaderComponent;