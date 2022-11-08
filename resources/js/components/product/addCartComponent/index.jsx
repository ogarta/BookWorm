import React, { useState } from "react"
import { Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { setCart } from "../../../reducers/cartReducer";
import AlertComponent from "../../alert";
import './style.scss';
export default function AddCartComponent({ dataBook }) {
    const maxQuantity = useSelector((state) => state.cartReducer.maxQuantity);
    const [quantity, setQuantity] = useState(1);
    const [showAlert, setShowAlert] = useState(false);
    const [alertParams, setAlertParams] = useState({});
    const dispatch = useDispatch();
    const renderPrice = () => {
        if (dataBook.book_price == dataBook.final_price) {
            return <p className="price card-title" id="final-price">${dataBook.book_price}</p>;
        }

        return (
            <p className="price card-title">
                <span className="text-secondary" ><del>${dataBook.book_price}</del></span>

                <span className="font-weight-bold ms-3" id="final-price" >${dataBook.final_price}</span>
            </p>

        );
    };

    const handleHideAlert = () => {
        const timer = setTimeout(() => {
            setShowAlert(false);
        }, 2000);
        return () => clearTimeout(timer);
    }

    const handleAddToCart = () => {
        // get cart from local storage
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart) {
            // check if book is already in cart
            let bookInCart = cart.find(book => book.book_id == dataBook.book_id);
            if (bookInCart) {
                // check if quantity plus quantity in cart is greater than max quantity
                if (bookInCart.quantity + quantity > maxQuantity) {
                    setAlertParams({
                        title: 'Error',
                        message: `You can only add ${maxQuantity} books to cart`,
                        variant: 'danger'
                    });
                    setShowAlert(true);
                    handleHideAlert();
                    return;
                }
            }
        }
        const data = {
            id: dataBook.id,
            book_title: dataBook.book_title,
            book_price: dataBook.book_price,
            book_cover_photo: dataBook.book_cover_photo,
            author_name: dataBook.author_name,
            quantity: quantity,
            final_price: dataBook.final_price,
        }
        dispatch(setCart(data));
        setAlertParams({
            type: "success",
            title: "Add to cart",
            message: "Add to cart successfully",
        });
        setShowAlert(true);
        handleHideAlert();
    }

    return (
        <>
            <Card className="mb-3">
                <Card.Header>
                    {renderPrice()}
                </Card.Header>
                <Card.Body>
                    <p className="title-quantity">Quantity</p>
                    <div className="box-control-quantity d-flex justify-content-center">
                        <button onClick={() => setQuantity(quantity > 1 ? (quantity - 1) : 1)}> - </button>
                        <div className=" d-flex justify-content-center" id="box-label">
                            <label className="mx-4 "> {quantity} </label>
                        </div>
                        <button onClick={() => setQuantity(quantity < maxQuantity ? (quantity + 1) : maxQuantity)}> + </button>
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                        <button type="button" className="btn btn-secondary" onClick={handleAddToCart} id="btn-add-cart">Add to cart</button>
                    </div>
                </Card.Body>
            </Card >
            {
                showAlert ? AlertComponent(alertParams) : ''
            }
        </>
    )
}