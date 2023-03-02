import React from "react";
import { Nav } from "react-bootstrap";

export default function ProfilePage() {
    return (
        <>
            <Nav
                justify
                variant="tabs"
                defaultActiveKey="/home"
                className="flex-column"
            >
                <Nav.Item>
                    <Nav.Link href="/home">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Option 2</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                        Disabled
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </>
    );
}
