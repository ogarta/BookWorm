import React, { useState } from "react";
import { useEffect } from "react";
import addressApi from "../../adapters/addressApi";
import { Col, Form, Row } from "react-bootstrap";
import "./style.scss";
import { columnFormAddress } from "../../constant/column.constant";
export default function FormAddressComponent(props) {
    const {
        formRef,
        address,
        isDisable,
        setShippingCost,
        isEdit,
        shippingCost,
    } = props;
    const listFormAddress = columnFormAddress;
    const [listAddress, setListAddress] = useState([
        {
            id: "empty",
            state: "",
            street: "",
            city: "",
        },
    ]);

    useEffect(() => {
        const fetchListAddress = async () => {
            try {
                const response = await addressApi.getListAddress();
                console.log("response.data: ", response.data);
                if (response.data.length == 0) {
                    if (isEdit) {
                        response.data.push({
                            id: "empty",
                            state: "Empty address",
                            street: "",
                            city: "",
                        });
                    }
                } else {
                    if (address) {
                        if (response.data.length !== 1) {
                            const index = response.data.findIndex(
                                (item) => item.id === address.address.id
                            );
                            if (index !== -1) {
                                const temp = response.data[0];
                                response.data[0] = response.data[index];
                                response.data[index] = temp;
                            }
                        }
                    }
                }
                if (!isEdit) {
                    response.data.push({
                        id: "add",
                        state: "Add new address",
                        street: "",
                        city: "",
                    });
                }
                console.log("response.data: ", response.data);
                setListAddress(response.data);
            } catch (error) {
                console.log("Failed to fetch address: ", error);
            }
        };
        fetchListAddress();
    }, []);

    return (
        <Form className="form__information__order" ref={formRef}>
            {listFormAddress.map((item, index) => {
                if (shippingCost == 0 && item.information === "address") {
                    return;
                }
                return item.type === "text" ? (
                    <Form.Group
                        className="mb-3"
                        controlId={"formBasic" + item.name}
                        key={index}
                    >
                        <Row>
                            <Col sm={3}>
                                <Form.Label>{item.label}</Form.Label>
                            </Col>
                            <Col sm={7}>
                                {address ? (
                                    isDisable ? (
                                        <Form.Control
                                            className="input__name"
                                            type="text"
                                            placeholder={item.placeholder}
                                            value={address[item.name]}
                                            disabled={isDisable}
                                            onChange={(e) => {}}
                                        />
                                    ) : (
                                        <Form.Control
                                            className="input__name"
                                            type="text"
                                            placeholder={item.placeholder}
                                            defaultValue={address[item.name]}
                                            disabled={isDisable}
                                            onChange={(e) => {}}
                                        />
                                    )
                                ) : (
                                    <Form.Control
                                        className="input__name"
                                        type="text"
                                        placeholder={item.placeholder}
                                        disabled={isDisable}
                                        onChange={(e) => {}}
                                    />
                                )}
                            </Col>
                        </Row>
                    </Form.Group>
                ) : (
                    <Form.Group
                        className="mb-3"
                        controlId={"formBasic" + item.name}
                        key={index}
                    >
                        <Row>
                            <Col sm={3}>
                                <Form.Label>{item.label}</Form.Label>
                            </Col>
                            <Col sm={7}>
                                <Form.Select
                                    aria-label="Default select example"
                                    disabled={isDisable}
                                    onChange={(e) => {}}
                                >
                                    {address ? (
                                        <>
                                            <option value={address.id}>
                                                {address[item.name]}
                                            </option>
                                            <option value={address.id}>
                                                {
                                                    item.options.filter(
                                                        (option) =>
                                                            option.value !==
                                                            address[item.name]
                                                    )[0].value
                                                }
                                            </option>
                                        </>
                                    ) : (
                                        item.options.map((option, index) => {
                                            return (
                                                <option
                                                    value={option.value}
                                                    key={index}
                                                >
                                                    {option.label}
                                                </option>
                                            );
                                        })
                                    )}
                                </Form.Select>
                            </Col>
                        </Row>
                    </Form.Group>
                );
            })}
            {address && !isEdit && (
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
