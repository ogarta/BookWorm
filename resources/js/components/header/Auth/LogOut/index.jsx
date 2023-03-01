import React from "react";
import authAdapter from "../../../../adapters/authAdapter";
import { NavDropdown } from "react-bootstrap";
import "./style.scss";

export default function LogOut(props) {
    const { setUser, setToastMessage, setShowToast } = props;

    const handleClickLogOut = () => {
        const logoutUser = async () => {
            try {
                await authAdapter.getLogOut();
                localStorage.removeItem("token");
                setUser(null);
                setToastMessage({
                    title: "Success",
                    message: "Logout success",
                });
            } catch (error) {
                setToastMessage({
                    title: "Error",
                    message: error.response.data.message,
                });
            }
            setShowToast(true);
        };
        logoutUser();
    };

    return (
        <>
            <NavDropdown.Item onClick={handleClickLogOut}>
                Log out
            </NavDropdown.Item>
        </>
    );
}
