import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import cartAdapter from "../adapters/cartAdapter";
import CartComponent from "../components/cart";
import { useDispatch } from 'react-redux';
import { showPopupLogin } from "../reducers/popupLoginReducer";
import { removeAllCart } from "../reducers/cartReducer";

export default function CartPage() {
    const dataListBook = useSelector((state) => state.cartReducer.cart);
    const dispatch = useDispatch();
    var totalCart = 0;
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        dataListBook.map((item) => {
            totalCart += item.quantity * item.final_price;
        });
        setTotalPrice(totalCart.toFixed(2));
    }, [dataListBook]);

    const handleOrder = async () => {

        if (totalPrice == 0) {
            alert('Please add book to cart');
            return;
        }

        if (!localStorage.getItem('token')) {
            dispatch(showPopupLogin(true));
            return;
        }

        var itemsOreder = [];
        dataListBook.map((item) => {
            itemsOreder.push({
                book_id: item.id,
                quantity: item.quantity,
            });

        })
        const params = {
            "order_amount": totalPrice,
            "items_order": itemsOreder
        }

        // console.log(params);

        try {
            const response = await cartAdapter.postOrder(params);
            dispatch(removeAllCart());
        } catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <>
            <Container>
                <h2>Your cart: {dataListBook.length}</h2>
                <hr />
                <div className="row">
                    <div className="col-md-8">
                        <CartComponent dataListBook={dataListBook} />
                    </div>
                    <div className="col-md-4">
                        <Card>
                            <Card.Header>
                                <p>Card totals</p>
                            </Card.Header>
                            <Card.Body>
                                <p className="d-flex justify-content-center">${totalPrice}</p>
                                <div className="d-flex justify-content-center">
                                    <button className="btn btn-primary" onClick={() => handleOrder()}>Placed order</button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </Container>

        </>
    )
}