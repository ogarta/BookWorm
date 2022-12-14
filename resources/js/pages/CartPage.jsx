import { useEffect, useState } from "react";
import { Alert, Card, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import cartAdapter from "../adapters/cartAdapter";
import CartComponent from "../components/cart";
import { useDispatch } from 'react-redux';
import { showPopupLogin } from "../reducers/popupLoginReducer";
import { removeAllCart, removeItemCart } from "../reducers/cartReducer";
import { useNavigate } from "react-router-dom";
import AlertComponent from "../components/alert";
import '../../css/cartPage.scss';

export default function CartPage() {
    const dataListBook = useSelector((state) => state.cartReducer.cart);
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const [alertParams, setAlertParams] = useState({});
    var totalCart = 0;
    const navigate = useNavigate();
    useEffect(() => {
        dataListBook.map((item) => {
            totalCart += item.quantity * item.final_price;
        });
        setTotalPrice(totalCart.toFixed(2));
    }, [dataListBook]);

    const goHomePage = () => {
        const timer = setTimeout(() => {
            navigate('/home');
        }, 10000);
        return () => clearTimeout(timer);
    }

    const handleHideAlert = () => {
        const timer = setTimeout(() => {
            setShowAlert(false);
        }, 5000);
        return () => clearTimeout(timer);
    }

    const handleOrder = async () => {
        if (totalPrice == 0) {
            setAlertParams({
                type: "fail",
                title: "Order fail",
                message: "You have not selected any book to order",
            });
            setShowAlert(true);
            handleHideAlert();
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
        try {
            const response = await cartAdapter.postOrder(params);
            dispatch(removeAllCart());
            setAlertParams({
                type: 'success',
                title: 'Order success',
                message: 'Please wait for 10s to redirect to home page'
            });
            setShowAlert(true);
            goHomePage();
        } catch (error) {
            // get cart from local storage
            let cart = JSON.parse(localStorage.getItem('cart'));
            let bookTitle = '';
            if (cart != null) {
                // check if book is already in cart
                error.response.data.errors.items_order.map((item) => {
                    let bookInCart = cart.find(book => book.id == item);
                    if (bookInCart) {
                        // set alert params
                        bookTitle += " " + bookInCart.book_title;
                    }
                    dispatch(removeItemCart(item[0]));
                })
            }
            setAlertParams({
                type: 'fail',
                title: 'Order fail',
                message: 'Book' + bookTitle + ' is not exist'
            });
            setShowAlert(true);
            handleHideAlert();
        }
    }

    return (
        <>
            <Container className="container-cart">
                <h2 className="title-cart mt-2">Your cart: {dataListBook.length} items</h2>
                <hr />
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-lg-8 col-xl-8 mb-2">
                        <CartComponent dataListBook={dataListBook} />
                    </div>
                    <div className="col-xs-12 col-sm-12 col-lg-4 col-xl-4 mb-2">
                        {
                            showAlert ? AlertComponent(alertParams) : ''
                        }
                        <Card className="card-add-cart">
                            <Card.Header>
                                Card totals
                            </Card.Header>
                            <Card.Body>
                                <p className="total-price d-flex justify-content-center">${totalPrice}</p>
                                <div className="d-flex justify-content-center">
                                    <button className="btn btn-secondary" onClick={() => handleOrder()}>Placed order</button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </Container>
        </>
    )
}