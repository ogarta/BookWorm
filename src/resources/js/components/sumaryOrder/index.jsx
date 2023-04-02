import React, { useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import cartAdapter from "../../adapters/cartAdapter";
import { removeAllCart, removeItemCart } from "../../reducers/cartReducer";
import { useNavigate } from "react-router-dom";
import { showPopupLogin } from "../../reducers/popupLoginReducer";
import AlertComponent from "../alert";
import "./style.scss";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function SumaryOrderComponent(props) {
    const { dataListBook, formRef, shippingCost, address } = props;
    const [totalPrice, setTotalPrice] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const [alertParams, setAlertParams] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const totalCartRef = useRef(0);

    useEffect(() => {
        let totalCart = 0;
        dataListBook.map((item) => {
            totalCart += item.quantity * item.final_price;
        });
        totalCartRef.current = totalCart;
    }, []);

    let totalSumary = 0;
    useEffect(() => {
        totalSumary = shippingCost + totalCartRef.current;
        setTotalPrice(totalSumary.toFixed(2));
    }, [shippingCost]);

    const goHomePage = () => {
        const timer = setTimeout(() => {
            navigate("/home");
            dispatch(removeAllCart());
        }, 10000);
        return () => clearTimeout(timer);
    };

    const handleHideAlert = () => {
        const timer = setTimeout(() => {
            setShowAlert(false);
        }, 5000);
        return () => clearTimeout(timer);
    };

    const handleOrder = (e) => {
        if (address == null) {
            setAlertParams({
                title: "Error",
                message: "Please choose address",
                type: "danger",
            });
            setShowAlert(true);
            handleHideAlert();
            return;
        }

        e.preventDefault();

        // check form valid
        let formValid = false;
        formRef.current.dispatchEvent(
            new Event("submit", { cancelable: true })
        );
        // remove all invalid-feedback
        const invalidFeedback =
            formRef.current.querySelectorAll(".invalid-feedback");
        invalidFeedback.forEach((item) => {
            item.remove();
        });
        // remove all is-invalid
        const invalidInput = formRef.current.querySelectorAll(".is-invalid");
        invalidInput.forEach((item) => {
            item.classList.remove("is-invalid");
        });

        const formDataInput = formRef.current.querySelectorAll("input");
        const formDataSelect = formRef.current.querySelectorAll("select");

        formDataSelect.forEach((select) => {
            if (select.value.includes("Choose")) {
                select.classList.add("is-invalid");
                const error = document.createElement("div");
                error.classList.add("invalid-feedback");
                error.innerText = "This field is required";
                select.parentNode.appendChild(error);

                formValid = true;
                return;
            }
        });

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

        if (totalCartRef.current == 0) {
            setAlertParams({
                type: "fail",
                title: "Order fail",
                message: "You have not selected any book to order",
            });
            setShowAlert(true);
            handleHideAlert();
            return;
        }
        if (!localStorage.getItem("token")) {
            dispatch(showPopupLogin(true));
            return;
        }
        var itemsOreder = [];
        dataListBook.map((item) => {
            itemsOreder.push({
                book_id: item.id,
                quantity: item.quantity,
            });
        });
        const params = {
            payment_method: formRef.current.querySelector(
                "select#formBasicMethod"
            ).value,
            order_amount: totalPrice,
            items_order: itemsOreder,
            address_id: address.id,
        };

        const order = async () => {
            try {
                await cartAdapter.postOrder(params);
                setAlertParams({
                    type: "success",
                    title: "Order success",
                    message:
                        "We sent email order to you and will contact you soon.\n Please wait for 10s to go home page.\n Thank you",
                });
                setShowAlert(true);
                goHomePage();
            } catch (error) {
                // get cart from local storage
                let cart = JSON.parse(localStorage.getItem("cart"));
                let bookTitle = "";
                if (cart != null) {
                    // check if book is already in cart
                    error.response.data.errors.items_order.map((item) => {
                        let bookInCart = cart.find((book) => book.id == item);
                        if (bookInCart) {
                            // set alert params
                            bookTitle += " " + bookInCart.book_title;
                        }
                        dispatch(removeItemCart(item[0]));
                    });
                }
                setAlertParams({
                    type: "fail",
                    title: "Order fail",
                    message: "Book" + bookTitle + " is not exist",
                });
                setShowAlert(true);
                handleHideAlert();
            }
        };
        order();
    };

    return (
        <>
            <Card className="card-add-cart">
                <Card.Header>Order Sumary</Card.Header>
                <Card.Body>
                    <p>
                        Cart subtotal: $
                        {totalCartRef.current ? totalCartRef.current : 0}
                    </p>
                    <p>
                        Shipping:{" "}
                        {shippingCost == 0 ? "Free" : "$" + shippingCost}
                    </p>
                    <hr />
                    <p>
                        Total: <strong>${totalPrice}</strong>
                    </p>
                    <div className="d-flex justify-content-center">
                        <button
                            className="btn btn-secondary"
                            onClick={handleOrder}
                        >
                            Confirm Order
                        </button>
                    </div>
                </Card.Body>
            </Card>
            {showAlert ? AlertComponent(alertParams) : ""}
        </>
    );
}
