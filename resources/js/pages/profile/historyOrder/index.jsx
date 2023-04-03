import React from "react";
import { useState, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import ListHistoryComponent from "../../../components/listHistoryOrder";
import ModalDetailOrderComponent from "../../../components/modal/detailOrder";
import cartApi from "../../../api/cartApi";

export default function HistoryOrder(props) {
    const { setToast } = props;
    const [listOrder, setListOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);

    const idOrderRef = useRef(null);

    const handleShowDetail = (id) => {
        idOrderRef.current = id;
        setShowModal(true);
    };

    const handleCancelOrder = (id) => {
        if (listOrder.find((item) => item.id === id).order_status === 1) {
            setShowModalConfirm(true);
            idOrderRef.current = id;
        }
    };

    const handleConfirmCancelOrder = async () => {
        try {
            await cartApi.cancelOrder({
                id: idOrderRef.current,
                order_status: 4,
            });
            setShowModalConfirm(false);
            setListOrder(
                listOrder.map((item) => {
                    if (item.id === idOrderRef.current) {
                        return { ...item, order_status: 4 };
                    }
                    return item;
                })
            );
            setToast({
                show: true,
                message: "Cancel order success",
                title: "Success",
                status: "success",
            });
        } catch (error) {
            setToast({
                show: true,
                message: "Cancel order fail",
                title: "Error",
                status: "danger",
            });
        }
    };

    return (
        <>
            <div className="history__order">
                <div className="history__order__title">
                    <h2>My History Order</h2>
                    <h6>Click to see detail order </h6>
                    <hr></hr>
                </div>
                <div className="history__order__list">
                    <ListHistoryComponent
                        listOrder={listOrder}
                        setListOrder={setListOrder}
                        handleShowDetail={handleShowDetail}
                        handleCancelOrder={handleCancelOrder}
                    />
                </div>
            </div>
            {showModal && (
                <ModalDetailOrderComponent
                    idOrderRef={idOrderRef}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    item={listOrder.find(
                        (item) => item.id === idOrderRef.current
                    )}
                />
            )}

            <Modal
                show={showModalConfirm}
                onHide={() => {
                    setShowModalConfirm(false);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title
                        style={{
                            marginLeft: "30px",
                        }}
                    >
                        Are you sure cancle this order
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <p>
                        If you cancel this order, you will not be able to
                        recover it
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setShowModalConfirm(false);
                        }}
                    >
                        No
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleConfirmCancelOrder();
                        }}
                    >
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
