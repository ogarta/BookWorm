import React from "react";
import { Card, Form } from "react-bootstrap";
import { IconBase } from "react-icons";
import "./style.scss";
export default function CardReciver(props) {
    const { reciver } = props;
    return (
        <Card
            className="card__reciver"
            style={reciver.choosen ? { border: "2px solid green" } : {}}
        >
            <Card.Body>
                <div className="card__reciver__header">
                    <Card.Title>{reciver.name}</Card.Title>
                    <Form.Check
                        type="checkbox"
                        id="default-checkbox"
                        checked={reciver.choosen}
                        onChange={() => {}}
                    />
                </div>
                <Card.Text>Phone: {reciver.phone}</Card.Text>
                <Card.Text>
                    Address:
                    {reciver.address.state +
                        ", " +
                        reciver.address.street +
                        ", " +
                        reciver.address.city}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
