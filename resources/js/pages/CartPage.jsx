import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import CartComponent from "../components/cart";

export default function CartPage() {
    const dataListBook = useSelector((state) => state.cartReducer.cart);

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

                    </div>
                </div>
            </Container>

        </>
    )
}