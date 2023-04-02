import IMAGE from "../../assets";
import { Image } from "react-bootstrap";
export default function ErrorPage() {
    return (
        <div
            style={{
                textAlign: "center",
            }}
        >
            <img
                src={IMAGE["Error404"]}
                alt="Error404"
                style={{ width: "100%", height: "300px" }}
            />
            <button className="btn btn-secondary btn-back-home">
                <a
                    href="/"
                    style={{
                        color: "white",
                        textDecoration: "none",
                    }}
                >
                    Back to Home
                </a>
            </button>
        </div>
    );
}
