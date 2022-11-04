import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import CartComponent from "../components/cart";

export default function CartPage() {
    const dataListBook = useSelector((state) => state.cartReducer.cart);
    var totalCart = 0;
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        dataListBook.map((item) => {
            totalCart += item.quantity * item.final_price;
        });
        setTotalPrice(totalCart.toFixed(2));
    }, [dataListBook]);

    return (
        <>
            <Container>
                <h2>Your cart: </h2>
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
                                    <button className="btn btn-primary">Proceed to checkout</button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </Container>

        </>
    )
}