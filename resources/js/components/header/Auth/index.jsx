import React, { useEffect, useState } from "react";
import LoginComponent from "./login";
import "./style.scss";
import LogOut from "./LogOut";
import { NavDropdown } from "react-bootstrap";
import SignUpComponent from "./SignUp";
import authAdapter from "../../../adapters/authAdapter";
import { Link } from "react-router-dom";

export default function AuthComponent(props) {
    const { setToastMessage, setShowToast } = props;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await authAdapter.getUser();
                setUser(response.data);
            } catch (error) {
                setUser(null);
            }
        };
        getUser();
    }, []);

    if (user) {
        return (
            <>
                <NavDropdown title={user.first_name + " " + user.last_name}>
                    <LogOut
                        setUser={setUser}
                        setShowToast={setShowToast}
                        setToastMessage={setToastMessage}
                    />
                    <Link to="/profile" className="dropdown-item">
                        Profile
                    </Link>
                </NavDropdown>
            </>
        );
    }

    return (
        <>
            <LoginComponent
                setUser={setUser}
                setShowToast={setShowToast}
                setToastMessage={setToastMessage}
            />

            <SignUpComponent
                setUser={setUser}
                setShowToast={setShowToast}
                setToastMessage={setToastMessage}
            />
        </>
    );
}
