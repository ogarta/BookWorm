import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import addressApi from "../../adapters/addressApi";
import FormAddressComponent from "../formAddress";
import FormReciver from "../formAddress";
import ListAddressComponent from "../listReciver";
import ModalCreateAddressComponent from "../modal/createAddress";
import "./style.scss";

export default function InformationOrderComponet(props) {
    const {
        formRef,
        shippingCost,
        setShippingCost,
        isDisable,
        setAddress,
        address,
    } = props;

    const [show, setShow] = useState(false);
    const [showAddAddress, setShowAddAddress] = useState(false);
    const [listAddress, setListAddress] = useState(null);

    useEffect(() => {
        const getlistAddress = async () => {
            try {
                const response = await addressApi.getListAddress();
                response.data.map((item) => {
                    item.delete = false;
                    if (item.default) {
                        item.choosen = true;
                    } else {
                        item.choosen = false;
                    }
                });
                setListAddress(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getlistAddress();
    }, []);

    useEffect(() => {
        if (listAddress !== null) {
            const addressChoosen = listAddress.find((item) => item.choosen);
            setAddress(addressChoosen);
        }
    }, [listAddress]);

    const handleClose = (isShowAdd) => {
        setShow(false);
        if (isShowAdd) {
            setShowAddAddress(true);
        }
    };

    return (
        <>
            <Card className="information__order__card">
                <Card.Header>Information of address</Card.Header>
                <Card.Body>
                    {address && (
                        <FormAddressComponent
                            isDisable={isDisable}
                            formRef={formRef}
                            address={address}
                            setShippingCost={setShippingCost}
                            shippingCost={shippingCost}
                        />
                    )}

                    <Button
                        variant="secondary"
                        onClick={() => setShow(true)}
                        className="button__choose__reciver"
                    >
                        Choose another address
                    </Button>
                </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Choose address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListAddressComponent
                        listAddress={listAddress}
                        setListAddress={setListAddress}
                        setAddress={setAddress}
                        handleClose={handleClose}
                    />
                </Modal.Body>
            </Modal>

            <ModalCreateAddressComponent
                listAddress={listAddress}
                showAddAddress={showAddAddress}
                setShowAddAddress={setShowAddAddress}
                isDisable={isDisable}
                setListAddress={setListAddress}
            />
        </>
    );
}
