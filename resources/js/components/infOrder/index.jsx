import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import addressApi from "../../adapters/addressApi";
import reciverApi from "../../adapters/reciverApi";
import FormReciver from "../formReciver";
import ListReciver from "../listReciver";
import "./style.scss";

export default function InformationOrder(props) {
    const {
        formRef,
        shippingCost,
        setShippingCost,
        isDisable,
        setReciver,
        reciver,
    } = props;

    const [show, setShow] = useState(false);
    const [showAddReciver, setShowAddReciver] = useState(false);
    const [listReciver, setListReciver] = useState([]);

    const formNewReciver = useRef();
    const idNewAddress = useRef();

    useEffect(() => {
        const fetchListReciver = async () => {
            try {
                const response = await reciverApi.getListReciver();
                console.log("Fetch list reciver successfully: ", response.data);
                response.data.map((item) => {
                    if (item.is_default) {
                        item.choosen = true;
                    } else {
                        item.choosen = false;
                    }
                });
                setListReciver(response.data);
            } catch (error) {
                console.log("Failed to fetch address: ", error);
            }
        };
        fetchListReciver();
    }, []);

    useEffect(() => {
        if (listReciver.length > 0) {
            const reciverChoosen = listReciver.find((item) => item.choosen);
            setReciver(reciverChoosen);
        }
    }, [listReciver]);

    const handleClose = (isShowAdd) => {
        setShow(false);
        if (isShowAdd) {
            setShowAddReciver(true);
        }
    };

    const handleSaveReciver = (e) => {
        e.preventDefault();
        // check form valid
        let formValid = false;
        formNewReciver.current.dispatchEvent(
            new Event("submit", { cancelable: true })
        );

        // remove all invalid-feedback
        const invalidFeedback =
            formNewReciver.current.querySelectorAll(".invalid-feedback");
        invalidFeedback.forEach((item) => {
            item.remove();
        });
        // remove all is-invalid
        const invalidInput =
            formNewReciver.current.querySelectorAll(".is-invalid");
        invalidInput.forEach((item) => {
            item.classList.remove("is-invalid");
        });

        const formDataInput = formNewReciver.current.querySelectorAll("input");

        formDataInput.forEach((input) => {
            if (!input.value) {
                // set error input
                input.classList.add("is-invalid");
                // append child below div parent of input tag
                const error = document.createElement("div");
                error.classList.add("invalid-feedback");
                error.innerText = "This field is required";
                input.parentNode.appendChild(error);

                formValid = true;
                return;
            }

            if (input.id == "formBasicPhone") {
                if (isNaN(input.value)) {
                    input.classList.add("is-invalid");
                    const error = document.createElement("div");
                    error.classList.add("invalid-feedback");
                    error.innerText = "Phone number must be a number";
                    input.parentNode.appendChild(error);

                    formValid = true;
                    return;
                }
                if (input.value.length < 10 || input.value.length > 11) {
                    input.classList.add("is-invalid");
                    const error = document.createElement("div");
                    error.classList.add("invalid-feedback");
                    error.innerText = "Phone number must be 10 or 11 digits";
                    input.parentNode.appendChild(error);

                    formValid = true;
                    return;
                }
            }
        });

        if (formValid) {
            return;
        }

        if (formNewReciver.current.querySelector("input#formHouseNumber")) {
            const paramsAddress = {
                state: formNewReciver.current.querySelector(
                    "input#formHouseNumber"
                ).value,
                street: formNewReciver.current.querySelector("input#formStreet")
                    .value,
                city: formNewReciver.current.querySelector("input#formCity")
                    .value,
            };
            const postCreateAddress = async () => {
                try {
                    const response = await addressApi.createAddress(
                        paramsAddress
                    );
                    idNewAddress.current = response.data.id;
                } catch (error) {
                    console.log("Failed to create address: ", error);
                }
            };
            postCreateAddress();
        }

        const paramsReciver = {
            name: formNewReciver.current.querySelector("input#formBasicName")
                .value,
            phone: formNewReciver.current.querySelector("input#formBasicPhone")
                .value,
            address_id: idNewAddress.current
                ? idNewAddress.current
                : formNewReciver.current.querySelector(
                      "select#formBasicAddress"
                  ).value,
            is_default: false,
        };
        console.log(paramsReciver);
        const postCreateReciver = async () => {
            try {
                const response = await reciverApi.createReciver(paramsReciver);
                const newReciver = response.data;
                newReciver.choosen = true;
                listReciver.map((item) => {
                    item.choosen = false;
                });
                setListReciver([...listReciver, response.data]);
                setShowAddReciver(false);
            } catch (error) {
                console.log("Failed to create reciver: ", error);
            }
        };
        postCreateReciver();
    };

    console.log("list reciver: ", listReciver);
    console.log("reciver: ", reciver);

    return (
        <>
            <Card className="information__order__card">
                <Card.Header>Information of reciver</Card.Header>
                <Card.Body>
                    {reciver && (
                        <FormReciver
                            isDisable={isDisable}
                            formRef={formRef}
                            reciver={reciver}
                            setShippingCost={setShippingCost}
                        />
                    )}
                    <Button
                        variant="secondary"
                        onClick={() => setShow(true)}
                        className="button__choose__reciver"
                    >
                        Choose another recipient
                    </Button>
                </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Choose a recipient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListReciver
                        listReciver={listReciver}
                        setListReciver={setListReciver}
                        setReciver={setReciver}
                        handleClose={handleClose}
                    />
                </Modal.Body>
            </Modal>

            <Modal
                size="lg"
                show={showAddReciver}
                onHide={() => setShowAddReciver(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new recipient</Modal.Title>
                </Modal.Header>
                <Modal.Body
                    style={{
                        paddingLeft: "100px",
                    }}
                >
                    {showAddReciver && (
                        <FormReciver
                            isDisable={!isDisable}
                            formRef={formNewReciver}
                        />
                    )}
                    <Button variant="secondary" onClick={handleSaveReciver}>
                        Save and choose
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
}
