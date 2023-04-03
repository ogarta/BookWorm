import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Card, Modal } from "react-bootstrap";
import cartApi from "../../api/cartApi";
import SpinerWaiting from "../spinerWaiting";
import CardOrderComponent from "./cardOrder";

export default function ListHistoryComponent(porps) {
    const { listOrder, setListOrder, handleShowDetail, handleCancelOrder } =
        porps;

    const idOrderRef = useRef(null);
    const [choosen, setChoosen] = useState({ type: "", id: "" });
    useEffect(() => {
        const getListOrder = async () => {
            try {
                const response = await cartApi.getList();
                console.log(response.data);
                setListOrder(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getListOrder();
    }, []);

    useEffect(() => {
        if (choosen.type === "detail") {
            handleShowDetail(choosen.id);
        }
        if (choosen.type === "cancel") {
            handleCancelOrder(choosen.id);
        }
    }, [choosen]);

    return (
        <>
            {listOrder === null ? (
                <SpinerWaiting type="border" />
            ) : (
                <div className="history__order__list">
                    {listOrder.length > 0 ? (
                        listOrder.map((item, index) => {
                            return (
                                <CardOrderComponent
                                    idOrderRef={idOrderRef}
                                    key={index}
                                    item={item}
                                    setChoosen={setChoosen}
                                />
                            );
                        })
                    ) : (
                        <Card
                            className="card__empty"
                            style={{
                                margin: "auto",
                                marginTop: "20px",
                            }}
                        >
                            <Card.Body>
                                <Card.Title
                                    style={{
                                        margin: 0,
                                    }}
                                >
                                    Empty
                                </Card.Title>
                                <Card.Text>You have no order history</Card.Text>
                            </Card.Body>
                        </Card>
                    )}
                </div>
            )}
        </>
    );
}
