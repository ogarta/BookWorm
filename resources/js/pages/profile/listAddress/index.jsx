import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Spinner } from "react-bootstrap";
import addressApi from "../../../adapters/addressApi";
import ListAddressComponent from "../../../components/listReciver";
import ModalCreateAddressComponent from "../../../components/modal/createAddress";
import ModalEditAddressComponent from "../../../components/modal/editAddress";
import SpinerWaiting from "../../../components/spinerWaiting";

import "./style.scss";

export default function ListAddressPage(props) {
    const { setToast } = props;
    const [listAddress, setListAddress] = useState(null);
    const [isLoad, setIsLoad] = useState(false);
    const [showModalEditAddress, setShowModalEditAddress] = useState(false);
    const [showModalCreateAddress, setShowModalCreateAddress] = useState(false);
    const isDisable = true;
    const idEditRef = useRef();

    useEffect(() => {
        if (listAddress !== null) {
            const idAddressRemove = listAddress.find((item) => item.delete);
            if (idAddressRemove) {
                setIsLoad(true);
                handleDeleteReciver(idAddressRemove.id);
            }

            const addressDefault = listAddress.find(
                (item) => !item.default && item.choosen
            );
            if (addressDefault) {
                setIsLoad(true);
                handleSetDefaultAddress(addressDefault);
            }

            const addressEdit = listAddress.find((item) => item.edit === true);
            if (addressEdit) {
                idEditRef.current = addressEdit.id;
                setShowModalEditAddress(true);
            }
        }
    }, [listAddress]);

    const handleDeleteReciver = async (id) => {
        try {
            await addressApi.deleteAddress(id);
            setToast({
                show: true,
                message: "Delete recipient successfully",
                title: "Success",
                status: "success",
            });
        } catch (error) {
            setToast({
                show: true,
                message: "Delete recipient failed",
                title: "Error",
                status: "error",
            });
        }
        setIsLoad(false);
    };

    const handleshowModalEditAddress = (isShow) => {
        if (isShow) {
            setShowModalCreateAddress(true);
        }
    };

    const handleSetDefaultAddress = async (addressDefault) => {
        try {
            addressDefault.default = true;
            await addressApi.updateAddress({
                id: addressDefault.id,
                ...addressDefault,
            });

            listAddress.forEach((item) => {
                if (item.id !== addressDefault.id) {
                    item.default = false;
                    item.choosen = false;
                    return item;
                }
                item.default = true;
                item.choosen = true;
            });
            setListAddress([...listAddress]);
            setToast({
                show: true,
                message: "Set default recipient successfully",
                title: "Success",
                status: "success",
            });
        } catch (error) {
            setToast({
                show: true,
                message: "Set default recipient failed",
                title: "Error",
                status: "error",
            });
        }
        setIsLoad(false);
    };

    return (
        <>
            <div className="list_addresses">
                <div className="list_addresses__title">
                    <h2>My List Addresses</h2>
                    <h5>Choose your default address</h5>
                    <hr></hr>
                </div>
                <div className="list_addresses__content">
                    {isLoad ? (
                        <SpinerWaiting />
                    ) : (
                        <ListAddressComponent
                            listAddress={listAddress}
                            setListAddress={setListAddress}
                            isEditCard={true}
                            handleClose={handleshowModalEditAddress}
                        />
                    )}
                </div>
            </div>
            <ModalCreateAddressComponent
                showAddAddress={showModalCreateAddress}
                setShowAddAddress={setShowModalCreateAddress}
                listAddress={listAddress}
                setListAddress={setListAddress}
                isDisable={isDisable}
                setToast={setToast}
            />
            <ModalEditAddressComponent
                showEditAddress={showModalEditAddress}
                setShowEditAddress={setShowModalEditAddress}
                listAddress={listAddress}
                setListAddress={setListAddress}
                idEditAddress={idEditRef.current}
                isDisable={isDisable}
                setToast={setToast}
            />
        </>
    );
}
