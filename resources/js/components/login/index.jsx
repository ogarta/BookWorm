import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import authAdapter from '../../adapters/authAdapter';
import { useForm } from 'react-hook-form';
import { Dropdown, DropdownButton } from 'react-bootstrap';
export default function LoginComponent() {
    const [show, setShow] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);
    const [responseError, setResponseError] = useState(null);
    const [user, setUser] = useState(null);
    const { register, formState: { errors }, handleSubmit } = useForm();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSubmit = data => {
        const params = {
            email: data.email,
            password: data.password
        };
        const login = async () => {
            try {
                const response = await authAdapter.postLogin(params);
                localStorage.setItem('token', JSON.stringify(response));
                setUser(response.user);
                setShow(false);
            } catch (error) {
                setResponseError(error.response.data);
            }
        }
        login();
    };

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setUser(JSON.parse(localStorage.getItem('token')).user);
        }
    }, []);

    const handleClickLogOut = (e) => {
        if (e === 'logout') {
            const logoutUser = async () => {
                try {
                    const responce = await authAdapter.getLogOut();
                    console.log(responce);
                    localStorage.removeItem('token');
                    setUser(null);
                } catch (error) {
                    console.log(error.response.data);
                }
            }
            logoutUser();
        }
    }

    if (user) {
        return (
            <>
                <DropdownButton
                    drop='down'
                    variant="secondary"
                    title={user.first_name + ' ' + user.last_name}
                    autoClose="inside"
                    onSelect={handleClickLogOut}
                >
                    <Dropdown.Item eventKey="logout">Log out</Dropdown.Item>

                </DropdownButton>
            </>
        );
    }

    return (
        <>
            <Button variant="dark" onClick={handleShow}>
                Login
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                name="email" {...register("email", { required: true })} />
                            {errors.email?.type === 'required' && <p role="alert" style={{ color: "red" }}>Email is required</p>}

                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type={passwordShown ? "text" : "password"}
                                className="form-control"
                                id="exampleInputPassword1"
                                name="password" {...register("password", { required: true })} />
                            <input type="checkbox" onClick={togglePasswordVisiblity} /> Show Password
                            {errors.password?.type === 'required' && <p role="alert" style={{ color: "red" }}>Password is required</p>}
                        </div>
                        <p role="alert" style={{ color: "red" }}>{responseError}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary">
                            Login
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}