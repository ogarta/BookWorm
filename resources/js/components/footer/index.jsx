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
                        <p className="title-footer">Bookworm</p>
                        <p>Address: Etown 1, 364 Cong Hoa Street</p>
                        <p>Phone: 0382349463</p>
                    </div>
                </Col>
            </Row>
        </footer>
    );
}


