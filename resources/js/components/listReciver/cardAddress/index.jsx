import React from "react";
import { Button, Card } from "react-bootstrap";
import "./style.scss";
export default function CardaddressComponent(props) {
    const { address, setChoosen, isEditCard } = props;

    const handleClick = () => {
        setChoosen({ type: "address", id: address.id });
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        setChoosen({ type: "delete", id: address.id });
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        setChoosen({ type: "edit", id: address.id });
    };
    return (
        <Card
            className="card__address"
            style={address.choosen ? { border: "2px solid green" } : {}}
            onClick={() => handleClick()}
        >
            <Card.Body>
                <div className="card__address__header">
                    <Card.Title>
                        {address.name}
                        <span className="card__address__header__default">
                            {address.choosen ? " (Default)" : ""}
                        </span>
                    </Card.Title>
                    {isEditCard ? (
                        <Button
                            variant="danger"
                            onClick={(e) => handleDelete(e)}
                            disabled={address.choosen}
                        >
                            X
                        </Button>
                    ) : null}
                </div>
                <Card.Text>Phone: {address.phone}</Card.Text>
                <Card.Text>Type Address: {address.type_address} </Card.Text>
                <div className="card__address__address">
                    <Card.Text
                        title={
                            " " +
                            address.number_address +
                            ", " +
                            address.street +
                            ", " +
                            address.district +
                            ", " +
                            address.city
                        }
                    >
                        Address:
                        {" " +
                            address.number_address +
                            ", " +
                            address.street +
                            ", " +
                            address.district +
                            ", " +
                            address.city}
                    </Card.Text>
                    {isEditCard ? (
                        <Button
                            variant="secondary"
                            onClick={(e) => handleEdit(e)}
                        >
                            Edit
                        </Button>
                    ) : null}
                </div>
            </Card.Body>
        </Card>
    );
}
