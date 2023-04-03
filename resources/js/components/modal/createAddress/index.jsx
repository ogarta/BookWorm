import React from "react";
import { useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import addressApi from "../../../api/addressApi";
import FormAddressComponent from "../../formAddress";
import FormReciver from "../../formAddress";

export default function ModalCreateAddressComponent(props) {
    const {
        showAddAddress,
        setShowAddAddress,
        isDisable,
        listAddress,
        setListAddress,
        setToast,
    } = props;

    const formnewAddress = useRef();

    const handleSaveReciver = (e) => {
        e.preventDefault();
        // check form valid
        let formValid = false;
        formnewAddress.current.dispatchEvent(
            new Event("submit", { cancelable: true })
        );

        // remove all invalid-feedback
        const invalidFeedback =
            formnewAddress.current.querySelectorAll(".invalid-feedback");
        invalidFeedback.forEach((item) => {
            item.remove();
        });
        // remove all is-invalid
        const invalidInput =
            formnewAddress.current.querySelectorAll(".is-invalid");
        invalidInput.forEach((item) => {
            item.classList.remove("is-invalid");
        });

        const formDataInput = formnewAddress.current.querySelectorAll("input");

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

        const paramsAddress = {
            name: formnewAddress.current.querySelector("input#formBasicname")
                .value,
            phone: formnewAddress.current.querySelector("input#formBasicphone")
                .value,
            number_address: formnewAddress.current.querySelector(
                "input#formBasicnumber_address"
            ).value,
            street: formnewAddress.current.querySelector(
                "input#formBasicstreet"
            ).value,
            district: formnewAddress.current.querySelector(
                "input#formBasicdistrict"
            ).value,
            city: formnewAddress.current.querySelector("input#formBasiccity")
                .value,
            type_address: formnewAddress.current.querySelector(
                "select#formBasictype_address"
            ).value,
            default: false,
        };

        handleCreateReciver(paramsAddress);
    };

    const handleCreateReciver = async (paramsAddress) => {
        try {
            const response = await addressApi.createAddress(paramsAddress);
            const newAddress = response.data;
            newAddress.choosen = true;
            listAddress.map((item) => {
                item.choosen = false;
            });
            if (setToast) {
                setToast({
                    show: true,
                    title: "Success",
                    message: "Create new address successfully",
                    status: "success",
                });
            }

            setListAddress([...listAddress, newAddress]);
            setShowAddAddress(false);
        } catch (error) {
            if (setToast) {
                setToast({
                    show: true,
                    title: "Fail",
                    message: "Create new address failed",
                    status: "danger",
                });
            }
        }
    };

    return (
        <Modal
            size="lg"
            show={showAddAddress}
            onHide={() => setShowAddAddress(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>Add new address</Modal.Title>
            </Modal.Header>
            <Modal.Body
                style={{
                    paddingLeft: "100px",
                }}
            >
                {showAddAddress && (
                    <FormAddressComponent
                        isDisable={!isDisable}
                        formRef={formnewAddress}
                        isEdit={false}
                    />
                )}
                <Button variant="secondary" onClick={handleSaveReciver}>
                    Save and choose
                </Button>
            </Modal.Body>
        </Modal>
    );
    return <div></div>;
}
