import React from "react";
import { useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import addressApi from "../../../adapters/addressApi";
import FormAddressComponent from "../../formAddress";

export default function ModalEditAddressComponent(props) {
    const {
        showEditAddress,
        setShowEditAddress,
        isDisable,
        listAddress,
        setListAddress,
        idEditAddress,
        setToast,
    } = props;

    console.log(idEditAddress);

    const idNewAddress = useRef();
    const formNewAddress = useRef();

    const handleSaveAddress = (e) => {
        e.preventDefault();
        // check form valid
        let formValid = false;
        formNewAddress.current.dispatchEvent(
            new Event("submit", { cancelable: true })
        );

        // remove all invalid-feedback
        const invalidFeedback =
            formNewAddress.current.querySelectorAll(".invalid-feedback");
        invalidFeedback.forEach((item) => {
            item.remove();
        });
        // remove all is-invalid
        const invalidInput =
            formNewAddress.current.querySelectorAll(".is-invalid");
        invalidInput.forEach((item) => {
            item.classList.remove("is-invalid");
        });

        const formDataInput = formNewAddress.current.querySelectorAll("input");

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

            if (input.id == "formBasicphone") {
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
            id: idEditAddress,
            name: formNewAddress.current.querySelector("input#formBasicname")
                .value,
            phone: formNewAddress.current.querySelector("input#formBasicphone")
                .value,
            number_address: formNewAddress.current.querySelector(
                "input#formBasicnumber_address"
            ).value,
            street: formNewAddress.current.querySelector(
                "input#formBasicstreet"
            ).value,
            district: formNewAddress.current.querySelector(
                "input#formBasicdistrict"
            ).value,
            city: formNewAddress.current.querySelector("input#formBasiccity")
                .value,
            type_address: formNewAddress.current.querySelector(
                "select#formBasictype_address"
            ).value,
            default: listAddress.find((item) => item.id == idEditAddress)
                .default,
        };

        const putUpdateAddress = async () => {
            try {
                const response = await addressApi.updateAddress(paramsAddress);

                const newListAddress = listAddress.map((item) => {
                    if (item.id == paramsAddress.id) {
                        return {
                            ...paramsAddress,
                            delete: item.delete,
                            choosen: item.choose,
                        };
                    }
                    return item;
                });
                setListAddress(newListAddress);
                setShowEditAddress(false);
                if (setToast) {
                    setToast({
                        show: true,
                        type: "success",
                        message: "Update recipient successfully",
                    });
                }
            } catch (error) {
                if (setToast) {
                    setToast({
                        show: true,
                        type: "danger",
                        message: "Update recipient failed",
                    });
                }
            }
        };
        putUpdateAddress();
    };

    return (
        <Modal
            size="lg"
            show={showEditAddress}
            onHide={() => setShowEditAddress(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit Address</Modal.Title>
            </Modal.Header>
            <Modal.Body
                style={{
                    paddingLeft: "100px",
                }}
            >
                {showEditAddress && (
                    <FormAddressComponent
                        address={listAddress.find(
                            (item) => item.id == idEditAddress
                        )}
                        isDisable={!isDisable}
                        formRef={formNewAddress}
                        isEdit={true}
                    />
                )}
                <Button variant="secondary" onClick={handleSaveAddress}>
                    Save
                </Button>
            </Modal.Body>
        </Modal>
    );
    return <div></div>;
}
