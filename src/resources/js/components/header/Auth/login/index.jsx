import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import authAdapter from "../../../../adapters/authAdapter";
import { useForm } from "react-hook-form";
import { Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { showPopupLogin } from "../../../../reducers/popupLoginReducer";
import "./style.scss";
import { removeUser, setUser } from "../../../../reducers/userResducer";

export default function LoginComponent(props) {
    const { setToastMessage, setShowToast } = props;
    const show = useSelector((state) => state.popupLoginReducer.isShow);
    const dispatch = useDispatch();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const handleClose = () => dispatch(showPopupLogin(false));
    const handleShow = () => dispatch(showPopupLogin(true));

    const onSubmit = (data) => {
        const params = {
            email: data.email,
            password: data.password,
        };
        const login = async () => {
            try {
                const response = await authAdapter.postLogin(params);
                localStorage.setItem("token", JSON.stringify(response));
                dispatch(setUser(response.user));
                dispatch(showPopupLogin(false));
                setToastMessage({
                    title: "Success",
                    message: "Login success",
                });
            } catch (error) {
                setToastMessage({
                    title: "Error",
                    message: error.response.data.message,
                });
                dispatch(removeUser());
            }
            setShowToast(true);
        };
        login();
    };

    return (
        <>
            <Nav.Link onClick={handleShow}>Login</Nav.Link>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title className="title-login">Login</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        <label htmlFor="exampleInputEmail1">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            name="email"
                            {...register("email", { required: true })}
                        />
                        {errors.email?.type === "required" && (
                            <p role="alert" style={{ color: "red" }}>
                                Email is required
                            </p>
                        )}
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                            type={"password"}
                            className="form-control"
                            id="exampleInputPassword1"
                            name="password"
                            {...register("password", { required: true })}
                        />
                        {errors.password?.type === "required" && (
                            <p role="alert" style={{ color: "red" }}>
                                Password is required
                            </p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            className="btn btn-danger"
                            onClick={handleClose}
                        >
                            Close
                        </Button>
                        <Button
                            type="submit"
                            className="btn btn-secondary"
                            variant="primary"
                        >
                            Login
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}
