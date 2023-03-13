import IMAGE from "../../assets"
import { Image } from "react-bootstrap"
export default function ErrorPage() {
    return (
        <div className="d-flex justify-content-center">
            <Image src={IMAGE['Error404']} alt="Error404" />
        </div>
    )
}