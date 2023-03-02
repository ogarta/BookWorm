import React, { useEffect, useState } from "react";
import LoginComponent from "./login";
import "./style.scss";
import LogOut from "./LogOut";
import { NavDropdown } from "react-bootstrap";
import SignUpComponent from "./SignUp";
import authAdapter from "../../../adapters/authAdapter";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, setUser } from "../../../reducers/userResducer";

export default function AuthComponent(props) {
    const { setToastMessage, setShowToast } = props;
    const dishpath = useDispatch();
    const user = useSelector((state) => state.userResducer.user);
    const [isLoad, setIsLoad] = useState(true);
    useEffect(() => {
        setIsLoad(true);
        const fetchUser = async () => {
            try {
                const response = await authAdapter.getUser();
                dishpath(setUser(response.data));
            } catch (error) {
                console.log(error);
                dishpath(removeUser());
            }
            setIsLoad(false);
        };
        fetchUser();
    }, []);

    if (isLoad) {
        return <></>;
    }

    if (user) {
        return (
            <>
                <NavDropdown title={user.first_name + " " + user.last_name}>
                    <Link to="/profile" className="dropdown-item">
                        Profile
                    </Link>
                    <LogOut
                        setUser={setUser}
                        setShowToast={setShowToast}
                        setToastMessage={setToastMessage}
                    />
                </NavDropdown>
            </>
        );
    }

    return (
        <>
            <LoginComponent
                setShowToast={setShowToast}
                setToastMessage={setToastMessage}
            />

            <SignUpComponent
                setShowToast={setShowToast}
                setToastMessage={setToastMessage}
            />
        </>
    );
}
