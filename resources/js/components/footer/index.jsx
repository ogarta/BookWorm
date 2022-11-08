import { Col, Row } from "react-bootstrap";
import IMAGE from "../../../assets";
import './style.scss'
export default function FooterComponent() {
    return (
        <footer className="footer-web">
            <div>
                <img src={IMAGE['logo']} alt="logo" />
            </div>

            <div className="info-footer">
                <div>
                    <p className="title-footer">Bookworm</p>
                    <p>Address: Etown 1, 364 Cong Hoa Street</p>
                    <p>Phone: 0382349463</p>
                </div>

            </div>
        </footer >
    );
}


