import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { ButtonGroup, Card, Form } from "react-bootstrap";
import CardReciver from "./cardReciver";
import "./style.scss";

export default function ListReciver(props) {
    const { listReciver, setListReciver, handleClose } = props;

    const handleChooseReciver = (id) => {
        if (id === "add") {
            handleClose(true);
            return;
        }
        const newListReciver = listReciver.map((item) => {
            if (item.id === id) {
                item.choosen = true;
            } else {
                item.choosen = false;
            }
            return item;
        });
        setListReciver(newListReciver);
        handleClose();
    };

    return (
        <div className="list__reciver">
            {listReciver.map((item) => (
                <div
                    className="list__reciver__item"
                    style={{
                        marginLeft: "30px",
                        marginRight: "30px",
                    }}
                    key={item.id}
                    onClick={() => {
                        handleChooseReciver(item.id);
                    }}
                >
                    <CardReciver reciver={item} />
                </div>
            ))}
            <Card
                style={{
                    marginLeft: "30px",
                    marginRight: "30px",
                }}
                onClick={() => {
                    handleChooseReciver("add");
                }}
            >
                <Card.Body>
                    <Card.Title>+ Add new reciver</Card.Title>
                </Card.Body>
            </Card>
        </div>
    );
}
