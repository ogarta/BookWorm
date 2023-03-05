import React, { useState } from "react";
import { useRef } from "react";
import { Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import CartComponent from "../components/cart";
import InformationOrder from "../components/infOrder";
import ListOrderComponent from "../components/listOrder";
import SumaryOrderComponent from "../components/sumaryOrder";

export default function ConfirmOrderPage() {
    const [shippingCost, setShippingCost] = useState(0);
    const [reciver, setReciver] = useState(null);
    const dataListBook = useSelector((state) => state.cartReducer.cart);
    const formRef = useRef();

    return (
        <>
            <Container
                className="container-cart"
                style={{ paddingTop: "30px" }}
            >
                <h2 className="title-cart mt-2">Confirm your order</h2>
                <hr />
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-lg-8 col-xl-8 mb-2">
                        <InformationOrder
                            formRef={formRef}
                            shippingCost={shippingCost}
                            setShippingCost={setShippingCost}
                            isDisable={true}
                            reciver={reciver}
                            setReciver={setReciver}
                        />
                        <h3
                            className="mt-2"
                            style={{
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                                color: "#000",
                                paddingTop: "20px",
                                marginBottom: "20px",
                            }}
                        >
                            Your cart: {dataListBook.length} items
                        </h3>
                        <ListOrderComponent
                            dataListBook={dataListBook}
                            isSetItem={false}
                        />
                    </div>
                    <div className="col-xs-12 col-sm-12 col-lg-4 col-xl-4 mb-2">
                        <SumaryOrderComponent
                            dataListBook={dataListBook}
                            formRef={formRef}
                            shippingCost={shippingCost}
                            reciver={reciver}
                        />
                    </div>
                </div>
            </Container>
        </>
    );
}
