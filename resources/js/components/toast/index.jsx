import React from "react";
import { useEffect } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export default function ToastComponent(props) {
    const { showToast, setShowToast, toastMessage } = props;

    useEffect(() => {
        if (showToast) {
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }
    }, [showToast]);

    return (
        <ToastContainer position="top-end" className="p-3">
            <Toast
                show={showToast}
                style={{
                    backgroundColor:
                        toastMessage.title === "Error" ? "red" : "green",
                }}
            >
                <Toast.Header closeButton={false}>
                    <strong className="me-auto">{toastMessage.title}</strong>
                </Toast.Header>
                <Toast.Body>{toastMessage.message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}
