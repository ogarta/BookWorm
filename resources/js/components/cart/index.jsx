import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { showPopupLogin } from "../../reducers/popupLoginReducer";
import AlertComponent from "../alert";
import "./style.scss";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { setTokenCart } from "../../reducers/cartReducer";

export default function CartComponent({ dataListBook }) {
    const [totalPrice, setTotalPrice] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const alertParams = useRef();
    let totalCart = 0;
    useEffect(() => {
        dataListBook.map((item) => {
            totalCart += item.quantity * item.final_price;
        });
        setTotalPrice(totalCart.toFixed(2));
    }, [dataListBook]);

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOrder = () => {
        if (!localStorage.getItem("token")) {
            dispatch(showPopupLogin(true));
            return;
        }
        if (dataListBook.length === 0) {
            alertParams.current = {
                title: "Error",
                message: "Your cart is empty",
                type: "error",
            };
            setShowAlert(true);
            return;
        }
        let token_cart = localStorage.getItem("token_cart");
        if (!token_cart) {
            dispatch(setTokenCart());
        }
        token_cart = localStorage.getItem("token_cart");
        return navigate("/confirm-order/" + token_cart);
    };

    return (
        <>
            <Card className="card-add-cart">
                <Card.Header>Card totals</Card.Header>
                <Card.Body>
                    <p className="total-price d-flex justify-content-center">
                        ${totalPrice}
                    </p>
                    <div className="d-flex justify-content-center">
                        <button
                            className="btn btn-secondary"
                            onClick={() => handleOrder()}
                        >
                            Placed order
                        </button>
                    </div>
                </Card.Body>
            </Card>
            {showAlert ? AlertComponent(alertParams.current) : ""}
        </>
    );
}
