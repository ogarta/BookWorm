import React, { useState } from "react";
import { Card, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import IMAGE from "../../../assets";
import { minusQuantity, plusQuantity } from "../../reducers/cartReducer";
import { Link } from 'react-router-dom';

export default function CartComponent({ dataListBook }) {
    const maxQuantity = useSelector((state) => state.cartReducer.maxQuantity);
    const dishpatch = useDispatch();

    const renderPrice = (bookPrice, finalPrice) => {
        if (bookPrice == finalPrice) {
            return <p className="price">${bookPrice}</p>;
        }

        return (
            <p className="price">
                <span className="text-secondary" ><del>${bookPrice}</del></span>

                <span className="font-weight-bold ms-3" >${finalPrice}</span>
            </p>

        );
    };

    return (
        <>
            <Card>
                <Card.Header>
                    <div className="row">
                        <div className="col-md-5">Product</div>
                        <div className="col-md-2">Price</div>
                        <div className="col-md-3">Quantity</div>
                        <div className="col-md-2">Total</div>
                    </div>
                </Card.Header>
                <Card.Body>
                    {dataListBook.map((item, index) => {
                        return (
                            <div className="row mt-3" key={index}>
                                <div className="col-md-5">
                                    <Link to={`/product/${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                        <div className="d-flex">
                                            <img src={item.book_cover_photo ? IMAGE[item.book_cover_photo] : IMAGE['Empty']} alt="" width="100px" height="150px" />
                                            <div className="ms-3">
                                                <p>{item.book_title}</p>
                                                <p>{item.author_name}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                                <div className="col-md-2">
                                    {renderPrice(item.book_price, item.final_price)}
                                </div>
                                <div className="col-md-3">
                                    <div className="d-flex justify-content-start">
                                        <button onClick={() => dishpatch(minusQuantity(item.id))}> - </button>
                                        <div className="bg-dark text-white">
                                            <label className="mx-4"> {item.quantity} </label>
                                        </div>
                                        <button onClick={() => dishpatch(plusQuantity(item.id))}> + </button>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <p className="price">${(item.final_price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>

                        )
                    })}
                </Card.Body>
            </Card>
        </>
    )
}