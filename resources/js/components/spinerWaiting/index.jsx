import React from "react";
import { Spinner } from "react-bootstrap";
import "./style.scss";

export default function SpinerWaiting(props) {
    const { type, number } = props;
    return (
        <>
            {type === "border" ? (
                <div className="spinner__waiting">
                    <Spinner animation="border" />
                </div>
            ) : (
                <div className="spinner__waiting">
                    {number &&
                        [...Array(number)].map((e, i) => (
                            <Spinner key={i} animation="grow" />
                        ))}
                </div>
            )}
        </>
    );
}
