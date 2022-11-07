import { Col, Row } from "react-bootstrap";
import IMAGE from "../../../assets";
import './style.scss'
export default function FooterComponent() {
    return (
        <footer>
            <Row>
                <Col xs lg="1">
                    <img src={IMAGE['logo']} alt="logo" />
                </Col>
                <Col xs lg="3">
                    <div className="info-footer">
                        <h1>Bookworm</h1>
                        <h5>Address: Etown 1, 364 Cong Hoa Street</h5>
                        <h5>Phone: 0382349463</h5>
                    </div>
                </Col>
            </Row>
        </footer>
    );
}


