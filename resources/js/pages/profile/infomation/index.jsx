import React from "react";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import authApi from "../../../api/authApi";
import "./style.scss";
export default function ProfilePage(props) {
    const { setToast } = props;
    const user = useSelector((state) => state.userResducer.user);
    const [show, setShow] = useState(false);
    const {
        register,
        setError,
        formState: { errors },
        handleSubmit,
        reset,
        clearErrors,
    } = useForm();
    const handleCloseModal = () => {
        setShow(false);
    };

    const onSubmit = (data) => {
        const params = {
            old_password: data.oldPassword,
            password: data.newPassword,
            password_confirmation: data.passwordConfirm,
        };
        const signUp = async () => {
            try {
                await authApi.editPassword(params);
                setToast({
                    show: true,
                    message: "Change password successfully",
                    title: "Success",
                    status: "success",
                });
                reset();
                handleCloseModal();
            } catch (error) {
                const errors = error.response.data.errors;
                console.log(errors);
                for (const key in errors) {
                    setError(key, {
                        type: "custom",
                        message: errors[key][0],
                    });
                }
            }
        };
        signUp();
    };

    if (!user) {
        return <></>;
    }

    return (
        <>
            <div className="profile">
                <div className="profile__title">
                    <h2>My Account</h2>
                    <h6>Personal Information</h6>
                    <hr></hr>
                </div>
                <div className="profile__info">
                    <div
                        className="profile__info__fullname"
                        style={{ display: "flex" }}
                    >
                        <Form className="profile__info__firstname">
                            <Form.Group controlId="formFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={user.first_name}
                                    disabled
                                />
                            </Form.Group>
                        </Form>
                        <Form className="profile__info__lastname">
                            <Form.Group controlId="formLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={user.last_name}
                                    disabled
                                />
                            </Form.Group>
                        </Form>
                    </div>
                    <Form className="profile__info__phone">
                        <Form.Group controlId="formPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={user.phone_number}
                                disabled
                            />
                        </Form.Group>
                    </Form>
                    <Form className="profile__info__email">
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={user.email}
                                disabled
                            />
                        </Form.Group>
                    </Form>
                </div>
                <hr />
                <Button
                    variant="secondary"
                    className="profile__btn"
                    onClick={() => setShow(true)}
                >
                    Change Password
                </Button>
            </div>

            <Modal show={show} onHide={handleCloseModal}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="formOldPassword">
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Old Password"
                                {...register("oldPassword", {
                                    required: "Password is required",
                                    min: {
                                        value: 8,
                                        message:
                                            "Password must be at least 8 characters",
                                    },
                                })}
                            />
                            {errors.oldPassword?.type === "required" && (
                                <p role="alert" style={{ color: "red" }}>
                                    {errors.oldPassword.message}
                                </p>
                            )}
                            {errors.old_password?.type === "custom" && (
                                <p role="alert" style={{ color: "red" }}>
                                    {errors.old_password.message}
                                </p>
                            )}
                        </Form.Group>
                        <Form.Group controlId="formNewPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="New Password"
                                {...register("newPassword", {
                                    required: "Password is required",
                                    min: {
                                        value: 8,
                                        message:
                                            "Password must be at least 8 characters",
                                    },
                                })}
                            />
                            {errors.newPassword?.type === "required" && (
                                <p role="alert" style={{ color: "red" }}>
                                    {errors.newPassword.message}
                                </p>
                            )}
                            {errors.password?.type === "custom" && (
                                <p role="alert" style={{ color: "red" }}>
                                    {errors.password.message}
                                </p>
                            )}
                        </Form.Group>
                        <Form.Group controlId="formConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                {...register("passwordConfirm", {
                                    required: "Password is required",
                                    min: {
                                        value: 8,
                                        message:
                                            "Password must be at least 8 characters",
                                    },
                                })}
                            />
                            {errors.passwordConfirm?.type === "required" && (
                                <p role="alert" style={{ color: "red" }}>
                                    {errors.passwordConfirm.message}
                                </p>
                            )}
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            onClick={() => {
                                clearErrors(["old_password", "password"]);
                            }}
                        >
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}
