import React, { useState } from "react";
import { Button, Container, Nav } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import HistoryOrder from "./historyOrder";
import Profile from "./infomation";
import ListAdress from "./listAddress";
import "./style.scss";

export default function LayoutProfile() {
    const param = useParams();
    const title = Object.values(param).map((item) => item);
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
                            <Route path="/" element={<Profile />} />
                            <Route path="/orders" element={<HistoryOrder />} />
                            <Route path="/address" element={<ListAdress />} />
                            <Route path="*" element={<ErrorPage />} />
                        </Routes>
                    </Container>
                </div>
            </Container>
        </>
    );
}
