import { Alert } from "react-bootstrap";

export default function AlertComponent(paramas) {
    if (paramas.type === "success") {
        return (
            <Alert variant="success">
                <Alert.Heading>{paramas.title}</Alert.Heading>
                <p>{paramas.message}</p>
            </Alert>
        );
    }
    return (
        <Alert variant="danger">
            <Alert.Heading>{paramas.title}</Alert.Heading>
            <hr />
            <p>{paramas.message}</p>
        </Alert>
    );
}
