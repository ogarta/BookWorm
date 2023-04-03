import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { Card, Col, Modal, Row } from "react-bootstrap";
import ProductPageApi from "../../../api/productPageApi";
import "./style.scss";
export default function ModalDetailOrderComponent(porps) {
    const { showModal, setShowModal, item } = porps;

    const status = useRef(null);
    const isDisabled = useRef(null);
    const [listDetailBook, setListDetailBook] = useState([]);

    switch (item.order_status) {
        case 1:
            status.current = "Pending";
            isDisabled.current = false;
            break;
        case 2:
            status.current = "Shipping";
            isDisabled.current = true;
            break;
        case 3:
            status.current = "Delivered";
            isDisabled.current = true;
            break;
        case 4:
            status.current = "Cancel";
            isDisabled.current = true;
            break;
        case 5:
            status.current = "Return";
            isDisabled.current = true;
            break;
        case 6:
            status.current = "Redy";
            isDisabled.current = true;
            break;
        default:
            break;
    }

    useEffect(() => {
        const getDetailBook = async () => {
            try {
                const response = await ProductPageApi.getListDetailBook({
                    book_id: item.item_order.map((item) => item.book_id),
                });
                setListDetailBook(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getDetailBook();
    }, []);

    return (
        <>
            <Modal
                show={showModal}
                onHide={() => {
                    setShowModal(false);
                }}
                size="lg"
                className="modal__detail__order"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Order ID: {item.id}
                        <span className="card__history__order__header__status">
                            {" (" + status.current + ")"}
                        </span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card.Text>
                        Name: {item.address_order_detail.name}
                    </Card.Text>
                    <Card.Text>
                        Phone: {item.address_order_detail.phone}
                    </Card.Text>
                    <Card.Text>Created At: {item.order_date}</Card.Text>
                    <Card.Text>
                        Payment Method:{" "}
                        {item.payment_method == 0 ? "Ship" : "At the store"}
                    </Card.Text>
                    {item.payment_method == 0 ? (
                        <Card.Text>
                            Address:
                            {" " +
                                item.address_order_detail.number_address +
                                ", " +
                                item.address_order_detail.street +
                                ", " +
                                item.address_order_detail.district +
                                ", " +
                                item.address_order_detail.city}
                        </Card.Text>
                    ) : (
                        <Card.Text>Address: store</Card.Text>
                    )}
                    <div className="card__history__order__detail__table_book">
                        <Row className="head__table">
                            <Col>
                                <Card.Text>Book</Card.Text>
                            </Col>
                            <Col>
                                <Card.Text>Quantity</Card.Text>
                            </Col>
                            <Col>
                                <Card.Text>Price per book</Card.Text>
                            </Col>
                        </Row>
                        {item.item_order.map((item) => {
                            return (
                                <Row
                                    key={item.id}
                                    className="table_book__content"
                                >
                                    <Col>
                                        <Card.Text className="table_book__book__name">
                                            {
                                                listDetailBook.find(
                                                    (book) =>
                                                        book.id == item.book_id
                                                )?.book_title
                                            }
                                        </Card.Text>
                                        <Card.Text className="table_book__author">
                                            (
                                            {
                                                listDetailBook.find(
                                                    (book) =>
                                                        book.id == item.book_id
                                                )?.author.author_name
                                            }
                                            )
                                        </Card.Text>
                                    </Col>
                                    <Col>
                                        <Card.Text>{item.quantity}</Card.Text>
                                    </Col>
                                    <Col>
                                        <Card.Text>{item.price}</Card.Text>
                                    </Col>
                                </Row>
                            );
                        })}
                    </div>
                    <div className="card__history__order__detail__total">
                        <Card.Text>
                            Total Price: $
                            {item.item_order
                                .map((item) => {
                                    return item.price * item.quantity;
                                })
                                .reduce((a, b) => a + b, 0)}
                        </Card.Text>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
