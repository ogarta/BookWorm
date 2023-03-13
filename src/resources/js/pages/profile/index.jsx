import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Container, Nav, ToastContainer, Toast } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import HistoryOrder from "./historyOrder";
import ProfilePage from "./infomation";
import ListAddressPage from "./listAddress";
import "./style.scss";

export default function LayoutProfile() {
    const param = useParams();
    const title = Object.values(param).map((item) => item);
    const [toast, setToast] = useState({
        show: false,
        message: "",
        title: "",
        status: "",
    });

    useEffect(() => {
        if (toast.show) {
            setTimeout(() => {
                setToast({
                    show: false,
                    message: "",
                    title: "",
                    status: "",
                });
            }, 3000);
        }
    }, [toast.show]);

    return (
        <>
            <Container className="mt-3 container__profile">
                <h1 className="title">{title[0] ? title[0] : "Profile"}</h1>
                <div className="container-content">
                    <div className="NavProfile">
                        <Button>
                            <Link className="nav-link" to="/profile">
                                Profile
                            </Link>
                        </Button>
                        <Button>
                            <Link className="nav-link" to="/profile/address">
                                Address
                            </Link>
                        </Button>
                        <Button>
                            <Link className="nav-link" to="/profile/orders">
                                Order
                            </Link>
                        </Button>
                    </div>
                    <br />
                    <Container className="container-profile">
                        <Routes>
                            <Route
                                path="/"
                                element={<ProfilePage setToast={setToast} />}
                            />
                            <Route
                                path="/orders"
                                element={<HistoryOrder setToast={setToast} />}
                            />
                            <Route
                                path="/address"
                                element={
                                    <ListAddressPage setToast={setToast} />
                                }
                            />
                            <Route path="*" element={<ErrorPage />} />
                        </Routes>
                    </Container>
                </div>
            </Container>
            <ToastContainer position="top-end">
                <Toast
                    className="d-inline-block m-1"
                    bg={toast.status === "success" ? "success" : "danger"}
                    show={toast.show}
                >
                    <Toast.Header>
                        <strong className="me-auto">{toast.title}</strong>
                    </Toast.Header>
                    <Toast.Body>{toast.message}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}
