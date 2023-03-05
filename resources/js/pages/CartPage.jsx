import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import CartComponent from "../components/cart";
import "../../css/cartPage.scss";
import ListOrderComponent from "../components/listOrder";

export default function CartPage() {
    const dataListBook = useSelector((state) => state.cartReducer.cart);
    return (
        <>
            <Container className="container-cart">
                <h2 className="title-cart mt-2">
                    Your cart: {dataListBook.length} items
                </h2>
                <hr />
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-lg-8 col-xl-8 mb-2">
                        <ListOrderComponent
                            dataListBook={dataListBook}
                            isSetItem={true}
                        />
                    </div>
                    <div className="col-xs-12 col-sm-12 col-lg-4 col-xl-4 mb-2">
                        <CartComponent dataListBook={dataListBook} />
                    </div>
                </div>
            </Container>
        </>
    );
}
