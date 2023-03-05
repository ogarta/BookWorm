import React, { useState } from "react";
import { useEffect } from "react";
import addressApi from "../../adapters/addressApi";
import { Col, Form, Row } from "react-bootstrap";
import "./style.scss";
export default function FormReciver(props) {
    const { formRef, reciver, isDisable, setShippingCost } = props;
    const [listAddress, setListAddress] = useState([]);

    const [showAddAddress, setShowAddAddress] = useState(false);

    useEffect(() => {
        if (reciver === undefined) {
            const fetchListAddress = async () => {
                try {
                    const response = await addressApi.getListAddress();
                    response.data.push({
                        id: "add",
                        state: "Add new address",
                        street: "",
                        city: "",
                    });
                    setListAddress(response.data);
                    if (response.data.length == 0) {
                        setShowAddAddress(true);
                    }
                } catch (error) {
                    console.log("Failed to fetch address: ", error);
                }
            };
            fetchListAddress();
        }
    }, []);

    return (
        <Form className="form__information__order" ref={formRef}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Row>
                    <Col sm={3}>
                        <Form.Label>Full Name</Form.Label>
                    </Col>
                    <Col sm={7}>
                        {reciver ? (
                            <Form.Control
                                className="input__name"
                                type="text"
                                placeholder="Enter full name"
                                value={reciver.name}
                                disabled={isDisable}
                            />
                        ) : (
                            <Form.Control
                                className="input__name"
                                type="text"
                                placeholder="Enter full name"
                                disabled={isDisable}
                            />
                        )}
                    </Col>
                </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhone">
                <Row>
                    <Col sm={3}>
                        <Form.Label>Phone</Form.Label>
                    </Col>
                    <Col sm={7}>
                        {reciver ? (
                            <Form.Control
                                type="text"
                                placeholder="Enter phone"
                                value={reciver.phone}
                                onChange={(e) => {}}
                                disabled={isDisable}
                            />
                        ) : (
                            <Form.Control
                                type="text"
                                placeholder="Enter phone"
                                onChange={(e) => {}}
                                disabled={isDisable}
                            />
                        )}
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
                <Row>
                    <Col sm={3}>
                        <Form.Label>Reciver's address</Form.Label>
                    </Col>
                    <Col sm={7}>
                        {reciver ? (
                            <Form.Select
                                aria-label="Default select example"
                                disabled={isDisable}
                            >
                                <option value={reciver.address.id}>
                                    {reciver.address.state +
                                        ", " +
                                        reciver.address.street +
                                        ", " +
                                        reciver.address.city}
                                </option>
                            </Form.Select>
                        ) : (
                            <Form.Select
                                aria-label="Default select example"
                                disabled={isDisable}
                                onChange={(e) => {
                                    if (e.target.value === "add") {
                                        setShowAddAddress(true);
                                    }
                                }}
                            >
                                {listAddress ? (
                                    listAddress.map((address) => (
                                        <option
                                            key={address.id}
                                            value={address.id}
                                        >
                                            {address.id === "add"
                                                ? address.state
                                                : address.state +
                                                  ", " +
                                                  address.street +
                                                  ", " +
                                                  address.city}
                                        </option>
                                    ))
                                ) : (
                                    <option value="add">Add new address</option>
                                )}
                            </Form.Select>
                        )}
                    </Col>
                </Row>
            </Form.Group>

            {showAddAddress && (
                <>
                    <Form.Group className="mb-3" controlId="formHouseNumber">
                        <Row>
                            <Col sm={3}>
                                <Form.Label>House Number</Form.Label>
                            </Col>
                            <Col sm={7}>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter House Number"
                                    onChange={(e) => {}}
                                    disabled={isDisable}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formStreet">
                        <Row>
                            <Col sm={3}>
                                <Form.Label>Street</Form.Label>
                            </Col>
                            <Col sm={7}>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter street"
                                    onChange={(e) => {}}
                                    disabled={isDisable}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCity">
                        <Row>
                            <Col sm={3}>
                                <Form.Label>City</Form.Label>
                            </Col>
                            <Col sm={7}>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter city"
                                    onChange={(e) => {}}
                                    disabled={isDisable}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                </>
            )}

            {reciver && (
                <Form.Group className="mb-3" controlId="formBasicMethod">
                    <Row>
                        <Col sm={3}>
                            <Form.Label>Payment Method</Form.Label>
                        </Col>
                        <Col sm={7}>
                            <Form.Select
                                aria-label="Default select example"
                                defaultValue="1"
                                onChange={(e) => {
                                    if (e.target.value === "0") {
                                        setShippingCost(10);
                                    } else {
                                        setShippingCost(0);
                                    }
                                }}
                            >
                                <option value="1">Get at store</option>
                                <option value="0">Ship</option>
                            </Form.Select>
                        </Col>
                    </Row>
                </Form.Group>
            )}
        </Form>
    );
}
