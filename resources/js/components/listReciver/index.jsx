import React from "react";
import { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import addressApi from "../../adapters/addressApi";
import CardaddressComponent from "./cardAddress";
import "./style.scss";

export default function ListAddressComponent(props) {
    const { listAddress, setListAddress, handleClose, isEditCard } = props;

    const [choosen, setChoosen] = useState({ type: "", id: "" });

    useEffect(() => {
        if (listAddress === null) {
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
                } catch (error) {
                    console.log(error);
                }
            };
            getlistAddress();
        }
    }, []);

    useEffect(() => {
        if (choosen.type === "address") {
            handleChooseAddress(choosen.id);
        }
        if (choosen.type === "delete") {
            handleDeleteAddress(choosen.id);
        }
        if (choosen.type === "edit") {
            handleEditAddress(choosen.id);
        }
    }, [choosen]);

    if (listAddress === null) {
        return (
            <Spinner
                animation="border"
                role="status"
                style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "block",
                    marginTop: "100px",
                }}
            >
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }

    const handleChooseAddress = (id) => {
        if (id === "add") {
            if (handleClose) {
                handleClose(true);
            }

            return;
        }

        if (isEditCard) {
            const addressDefault = listAddress.find(
                (item) => !item.default && item.id === id
            );
            console.log(addressDefault);
            if (addressDefault) {
                updateAddressDefault(addressDefault);
            }
        }

        const newlistAddress = listAddress.map((item) => {
            if (item.id === id) {
                item.choosen = true;
            } else {
                item.choosen = false;
            }
            return item;
        });
        setListAddress(newlistAddress);
        if (handleClose) {
            handleClose();
        }
    };

    const updateAddressDefault = async (addressDefault) => {
        try {
            // await addressApi.updateAddress({
            //     id: addressDefault.id,
            //     default: true,
            //     name: addressDefault.name,
            //     phone: addressDefault.phone,
            // });
            return;
        } catch (error) {
            return;
        }
    };

    const handleDeleteAddress = (id) => {
        const newlistAddress = listAddress.map((item) => {
            if (item.id === id) {
                item.delete = true;
            }
            return item;
        });
        setListAddress(newlistAddress);
    };

    const handleEditAddress = (id) => {
        const newlistAddress = listAddress.map((item) => {
            if (item.id === id) {
                item.edit = true;
            } else {
                item.edit = false;
            }
            return item;
        });
        setListAddress(newlistAddress);
    };

    return (
        <div className="list__address">
            {listAddress.map((item) =>
                item.delete ? null : (
                    <CardaddressComponent
                        style={{
                            marginLeft: "30px",
                            marginRight: "30px",
                        }}
                        address={item}
                        key={item.id}
                        setChoosen={setChoosen}
                        isEditCard={isEditCard}
                    />
                )
            )}
            <Card
                style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
                onClick={() => {
                    handleChooseAddress("add");
                }}
            >
                <Card.Body>
                    <Card.Title>+ Add new address</Card.Title>
                </Card.Body>
            </Card>
        </div>
    );
}
