import React, { useState } from "react";
import { useRef } from "react";
import { Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import CartComponent from "../components/cart";
import InformationOrderComponet from "../components/infOrder";
import ListOrderComponent from "../components/listOrder";
import SumaryOrderComponent from "../components/sumaryOrder";

export default function ConfirmOrderPage() {
    const [shippingCost, setShippingCost] = useState(0);
    const [address, setAddress] = useState(null);
    const dataListBook = useSelector((state) => state.cartReducer.cart);
    const formRef = useRef();

    const token = localStorage.getItem("token");
    if (!token) {
        return <ErrorPage />;
    }

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
                        <InformationOrderComponet
                            formRef={formRef}
                            shippingCost={shippingCost}
                            setShippingCost={setShippingCost}
                            isDisable={true}
                            address={address}
                            setAddress={setAddress}
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
                            address={address}
                        />
                    </div>
                </div>
            </Container>
        </>
    );
}
