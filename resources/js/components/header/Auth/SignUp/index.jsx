import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import authAdapter from "../../../../adapters/authAdapter";
import { useForm } from "react-hook-form";
import { Nav } from "react-bootstrap";
import "./style.scss";

export default function SignUpComponent(props) {
    const { setUser, setToastMessage, setShowToast } = props;
    const [show, setShow] = useState(false);
    const {
        register,
        setError,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        const params = {
            email: data.email,
            password: data.password,
            password_confirmation: data.passwordConfirm,
            first_name: data.firstName,
            last_name: data.lastName,
        };
        const signUp = async () => {
            try {
                await authAdapter.postSignUp(params);
                setToastMessage({
                    title: "Success",
                    message: "Sign up successfully",
                });
            } catch (error) {
                // console.log(error.response.data.errors);
                const errors = error.response.data.errors;
                for (const key in errors) {
                    setError(key, {
                        type: "custom",
                        message: errors[key][0],
                    });
                }
                setToastMessage({
                    title: "Error",
                    message: error.response.data.message,
                });
            }
            setShowToast(true);
        };
        signUp();
    };

    return (
        <>
            <Nav.Link onClick={() => setShow(true)}>SignUp</Nav.Link>

            <Modal show={show} onHide={() => setShow(false)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title className="title-login">Sign Up</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        <label htmlFor="exampleInputLastName">Last name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputLastName"
                            name="email"
                            {...register("lastName", { required: true })}
                        />
                        {errors.lastName?.type === "required" && (
                            <p role="alert" style={{ color: "red" }}>
                                Last name is required
                            </p>
                        )}
                        <label htmlFor="exampleInputFirstName">
                            First Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputFirstName"
                            name="email"
                            {...register("firstName", { required: true })}
                        />
                        {errors.firstName?.type === "required" && (
                            <p role="alert" style={{ color: "red" }}>
                                First Name is required
                            </p>
                        )}
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
                        {errors.email?.type === "custom" && (
                            <p role="alert" style={{ color: "red" }}>
                                {errors.email.message}
                            </p>
                        )}
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                            type={"password"}
                            className="form-control"
                            id="exampleInputPassword1"
                            name="password"
                            {...register("password", {
                                required: true,
                                minLength: 8,
                            })}
                        />
                        {errors.password?.type === "required" && (
                            <p role="alert" style={{ color: "red" }}>
                                Password is required
                            </p>
                        )}
                        {errors.password?.type === "minLength" && (
                            <p role="alert" style={{ color: "red" }}>
                                Password must be at least 8 characters
                            </p>
                        )}
                        <label htmlFor="exampleInputPassword1">
                            Password confirm
                        </label>
                        <input
                            type={"password"}
                            className="form-control"
                            id="exampleInputPassword1"
                            name="passwordConfirm"
                            {...register("passwordConfirm", {
                                required: true,
                                minLength: 8,
                            })}
                        />
                        {errors.passwordConfirm?.type === "required" && (
                            <p role="alert" style={{ color: "red" }}>
                                Password is required
                            </p>
                        )}
                        {errors.passwordConfirm?.type === "minLength" && (
                            <p role="alert" style={{ color: "red" }}>
                                Password must be at least 8 characters
                            </p>
                        )}
                        {errors.password?.type === "custom" && (
                            <p role="alert" style={{ color: "red" }}>
                                {errors.password.message}
                            </p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            className="btn btn-danger"
                            onClick={() => setShow(false)}
                        >
                            Close
                        </Button>
                        <Button
                            type="submit"
                            className="btn btn-secondary"
                            variant="primary"
                        >
                            Sign Up
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}
