import React from "react";
import { Card } from "react-bootstrap";

export default function CartComponent({ dataListBook }) {
    return (
        <>
            <Card>
                <Card.Header>
                    <div className="row">
                        <div className="col-md-5">Product</div>
                        <div className="col-md-2">Price</div>
                        <div className="col-md-3">Quantity</div>
                        <div className="col-md-2">Total</div>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className="row">
                        <div className="col-md-5">Product</div>
                        <div className="col-md-2">Price</div>
                        <div className="col-md-3">Quantity</div>
                        <div className="col-md-2">Total</div>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}