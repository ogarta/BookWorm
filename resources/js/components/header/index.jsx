import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import LoginComponent from '../login';
import { NavLink } from 'react-router-dom';
import './style.scss';

function HeaderComponent() {
    const cartNumber = useSelector((state) => state.cartReducer.cart).length;
    return (
        <header>

            <Navbar bg="dark" variant="dark" className="navbar">
                <Container>
                    <Navbar.Brand href="/home">BOOKWORM</Navbar.Brand>
                    <Nav>
                        <NavLink to="/home" className="nav-item nav-link">Home</NavLink>
                        <NavLink to="/shop" className="nav-item nav-link">Shop</NavLink>
                        <NavLink to="/about" className="nav-item nav-link">About</NavLink>
                        <NavLink to="/cart" className="nav-item nav-link">Cart ({cartNumber})</NavLink>
                        <LoginComponent />
                    </Nav>
                </Container>
            </Navbar>
        </header>
    );
}

export default HeaderComponent;