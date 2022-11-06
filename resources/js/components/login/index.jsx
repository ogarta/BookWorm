import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import authAdapter from '../../adapters/authAdapter';
import { useForm } from 'react-hook-form';
import { Dropdown, DropdownButton, NavDropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { showPopupLogin } from '../../reducers/popupLoginReducer';
export default function LoginComponent() {
    const show = useSelector((state) => state.popupLoginReducer.isShow);
    const dispatch = useDispatch();
    const [passwordShown, setPasswordShown] = useState(false);
    const [user, setUser] = useState(null);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({
        title: '',
        message: '',
    });

    const handleClose = () => dispatch(showPopupLogin(false));
    const handleShow = () => dispatch(showPopupLogin(true));

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
                dispatch(showPopupLogin(false));
                setToastMessage({
                    title: 'Success',
                    message: 'Login success',
                });
                setShowToast(true);
            } catch (error) {
                setToastMessage({
                    title: 'Error',
                    message: error.response.data.message,
                });
                setShowToast(true);
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
                    setToastMessage({
                        title: 'Success',
                        message: 'Logout success',
                    });
                    setShowToast(true);
                } catch (error) {
                    setToastMessage({
                        title: 'Error',
                        message: error.response.data.message,
                    });
                    setShowToast(true);
                }
            }
            logoutUser();
        }
    }

    if (user) {
        return (
            <>
                <NavDropdown
                    title={user.first_name + ' ' + user.last_name}
                    onSelect={handleClickLogOut}
                >
                    <NavDropdown.Item eventKey="logout">Log out</NavDropdown.Item>
                </NavDropdown>

                <Modal
                    size="lg"
                    show={showToast}
                    onHide={() => setShowToast(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                    variant="success"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {toastMessage.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{toastMessage.message}</Modal.Body>
                </Modal>
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

            <Modal
                size="lg"
                show={showToast}
                onHide={() => setShowToast(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {toastMessage.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>{toastMessage.message}</Modal.Body>
            </Modal>
        </>
    );
}