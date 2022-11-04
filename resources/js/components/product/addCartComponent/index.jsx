import React, { useState } from "react"
import { Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { setCart } from "../../../reducers/cartReducer";
export default function AddCartComponent({ dataBook }) {
    const maxQuantity = useSelector((state) => state.cartReducer.maxQuantity);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const renderPrice = () => {
        if (dataBook.book_price == dataBook.final_price) {
            return <p className="price">${dataBook.book_price}</p>;
        }

        return (
            <p className="price">
                <span className="text-secondary" ><del>${dataBook.book_price}</del></span>

                <span className="font-weight-bold ms-3" >${dataBook.final_price}</span>
            </p>

        );
    };
    const handleAddToCart = () => {
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
    }

    return (
        <>
            <Card>
                <Card.Header>
                    {renderPrice()}
                </Card.Header>
                <Card.Body>
                    <p>Quantity</p>
                    <div className="d-flex justify-content-center">
                        <button onClick={() => setQuantity(quantity > 1 ? (quantity - 1) : 1)}> - </button>
                        <div className="bg-dark text-white">
                            <label className="mx-4"> {quantity} </label>
                        </div>
                        <button onClick={() => setQuantity(quantity < maxQuantity ? (quantity + 1) : maxQuantity)}> + </button>
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                        <button className="btn btn-primary" onClick={handleAddToCart}>Add to cart</button>
                    </div>
                </Card.Body>
            </Card >
        </>
    )
}