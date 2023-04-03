import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import AuthComponent from "./Auth";
import { NavLink } from "react-router-dom";
import IMAGE from "../../../assets";
import "./style.scss";
import ToastComponent from "../toast";

function HeaderComponent() {
    const cartNumber = useSelector((state) => state.cartReducer.cart).length;

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({
        title: "",
        message: "",
    });

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
                <Container className="container-header">
                    <Navbar.Brand href="/home">
                        <img src={IMAGE["logo"]}></img>
                        <span>BOOKWORM</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto"></Nav>
                        <Nav>
                            <NavLink to="/home" className="nav-item nav-link">
                                Home
                            </NavLink>
                            <NavLink to="/shop" className="nav-item nav-link">
                                Shop
                            </NavLink>
                            <NavLink to="/about" className="nav-item nav-link">
                                About
                            </NavLink>
                            <NavLink to="/cart" className="nav-item nav-link">
                                Cart ({cartNumber})
                            </NavLink>
                            <AuthComponent
                                setShowToast={setShowToast}
                                setToastMessage={setToastMessage}
                            />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <ToastComponent
                setShowToast={setShowToast}
                showToast={showToast}
                toastMessage={toastMessage}
            />
        </header>
    );
}

export default HeaderComponent;
