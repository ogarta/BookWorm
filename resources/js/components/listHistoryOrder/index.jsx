import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import cartAdapter from "../../adapters/cartAdapter";
import CardOrderComponent from "./cardOrder";

export default function ListHistoryComponent(porps) {
    const { listOrder, setListOrder, handleShowDetail, handleCancelOrder } =
        porps;

    const idOrderRef = useRef(null);
    const [choosen, setChoosen] = useState({ type: "", id: "" });
    useEffect(() => {
        const getListOrder = async () => {
            try {
                const response = await cartAdapter.getList();
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
            <div className="history__order__list">
                {listOrder &&
                    listOrder.map((item, index) => {
                        return (
                            <CardOrderComponent
                                idOrderRef={idOrderRef}
                                key={index}
                                item={item}
                                setChoosen={setChoosen}
                            />
                        );
                    })}
            </div>
        </>
    );
}
