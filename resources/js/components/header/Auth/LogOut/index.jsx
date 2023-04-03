import React from "react";
import authAdapter from "../../../../adapters/authAdapter";
import { NavDropdown } from "react-bootstrap";
import "./style.scss";
import { useDispatch } from "react-redux";
import { removeUser } from "../../../../reducers/userResducer";
import { redirect } from "react-router-dom";

export default function LogOut(props) {
    const { setToastMessage, setShowToast } = props;
    const dispatch = useDispatch();
    const handleClickLogOut = () => {
        const logoutUser = async () => {
            try {
                await authAdapter.getLogOut();
                localStorage.removeItem("token");
                dispatch(removeUser());
                setToastMessage({
                    title: "Success",
                    message: "Logout success",
                });
                window.location.reload();
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
