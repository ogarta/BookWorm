import React from "react";
import { useRef } from "react";
import { Card, Button } from "react-bootstrap";
import "./style.scss";

export default function CardOrderComponent(porps) {
    const { item, setChoosen } = porps;

    const status = useRef(null);
    const isDisabled = useRef(null);

    switch (item.order_status) {
        case 1:
            status.current = "Pending";
            isDisabled.current = false;
            break;
        case 2:
            status.current = "Shipping";
            isDisabled.current = true;
            break;
        case 3:
            status.current = "Delivered";
            isDisabled.current = true;
            break;
        case 4:
            status.current = "Cancel";
            isDisabled.current = true;
            break;
        case 5:
            status.current = "Return";
            isDisabled.current = true;
            break;
        case 6:
            status.current = "Ready";
            isDisabled.current = true;
            break;
        default:
            break;
    }

    return (
        <>
            <Card
                className="card__history__order"
                onClick={() => setChoosen({ type: "detail", id: item.id })}
            >
                <Card.Body>
                    <div className="card__history__order__header">
                        <Card.Title>
                            Order ID: {item.id}
                            <span className="card__history__order__header__status">
                                {" (" + status.current + ")"}
                            </span>
                        </Card.Title>

                        <Button
                            variant="danger"
                            onClick={(e) => {
                                e.stopPropagation();
                                setChoosen({ type: "cancel", id: item.id });
                            }}
                            disabled={isDisabled.current}
                        >
                            Cancel
                        </Button>
                    </div>
                    <Card.Text>
                        Total Price: $
                        {item.item_order
                            .map((item) => {
                                return item.price * item.quantity;
                            })
                            .reduce((a, b) => a + b, 0)}
                    </Card.Text>
                    <Card.Text>Created At: {item.order_date}</Card.Text>
                    <Card.Text>
                        Payment Method:{" "}
                        {item.payment_method == 0 ? "Ship" : "At the store"}
                    </Card.Text>
                    {item.payment_method == 0 ? (
                        <Card.Text>
                            Address:
                            {" " +
                                item.address_order_detail.number_address +
                                ", " +
                                item.address_order_detail.street +
                                ", " +
                                item.address_order_detail.district +
                                ", " +
                                item.address_order_detail.city}
                        </Card.Text>
                    ) : (
                        <Card.Text>Address: store</Card.Text>
                    )}
                </Card.Body>
            </Card>
        </>
    );
}
