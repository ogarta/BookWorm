import React, { useState } from "react";
import { Card, Modal } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import { useSelector, useDispatch } from "react-redux";
import IMAGE from "../../../assets";
import { minusQuantity, plusQuantity, removeItemCart } from "../../reducers/cartReducer";
import { useNavigate } from 'react-router-dom';
import './style.scss';

export default function CartComponent({ dataListBook }) {
    const maxQuantity = useSelector((state) => state.cartReducer.maxQuantity);
    const [show, setShow] = useState(false);
    const dishpatch = useDispatch();
    const navigate = useNavigate();

    const handleClose = () => {
        setShow(false);

    };
    const handleShow = () => {
        setShow(true);
    };

    const handleClickProduct = (id) => {
        navigate(`/product/${id}`);
    }

    const renderPrice = (bookPrice, finalPrice) => {
        if (bookPrice == finalPrice) {
            return <p className="price-book price m-0">${bookPrice}</p>;
        }

        return (
            <>
                <p className="price price-book m-0" >${finalPrice} </p>
                <p className="text-secondary m-0" ><del>${bookPrice}</del></p>
            </>


        );
    };

    return (
        <>
            <Card>
                <Card.Header>
                    <div className="parmas-book-cart row">
                        <div className="col-md-5">Product</div>
                        <div className="col-md-2">Price</div>
                        <div className="col-md-3">Quantity</div>
                        <div className="col-md-2">Total</div>
                    </div>
                </Card.Header>
                <ListGroup variant="flush">
                    {dataListBook.map((item, index) => {
                        return (
                            <ListGroup.Item key={index}>
                                <div className="row-cart row">
                                    <div className="col-md-5">
                                        <div className="d-flex" onClick={() => handleClickProduct(item.id)}>
                                            <img src={item.book_cover_photo ? IMAGE[item.book_cover_photo] : IMAGE['Empty']} alt="" width="100px" height="150px" />
                                            <div className="info-book ms-3">
                                                <p className="title-book m-0">{item.book_title}</p>
                                                <p className="m-0">{item.author_name}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        {renderPrice(item.book_price, item.final_price)}
                                    </div>
                                    <div className="col-md-3">
                                        <div className="box-control-book-quantity-cart d-flex justify-content-start">
                                            <button id="btn-quantity" className="d-flex justify-content-center " onClick={() => dishpatch(minusQuantity(item.id))}> - </button>
                                            <div id="box-label">
                                                <label className="d-flex justify-content-center"> {item.quantity} </label>
                                                {item.quantity == 0 ?
                                                    (<Modal show={item.quantity == 0 ? true : false} >
                                                        <Modal.Header>
                                                            <Modal.Title>Confirm remove item</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>Are you sure you want to remove this item?</Modal.Body>
                                                        <Modal.Footer>
                                                            <button className="btn btn-secondary" onClick={() => dishpatch(plusQuantity(item.id))}>Cancel</button>
                                                            <button className="btn btn-primary" onClick={() => dishpatch(removeItemCart(item.id))}>Remove</button>
                                                        </Modal.Footer>
                                                    </Modal>) : ''
                                                }
                                            </div>
                                            <button id="btn-quantity" className="d-flex justify-content-center" onClick={() => dishpatch(plusQuantity(item.id))}> + </button>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <p className="total-price price">${(item.final_price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </Card>
        </>
    )
}