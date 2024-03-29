import Reat from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeaderComponent from "../components/header/index";
import HomePage from "./HomePage";
import ShopPage from "./ShopPage";
import ProductPage from "./ProductPage";
import CartPage from "./CartPage";
import ErrorPage from "./ErrorPage";
import AboutPage from "./AboutPage";
import FooterComponent from "../components/footer";
import "./style.scss";
import LayoutProfile from "./profile";
import ConfirmOrderPage from "./ConfirmOrderPage";

function Index() {
    return (
        <Router>
            <HeaderComponent />
            <div className="body-page">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route
                        path="/confirm-order/*"
                        element={<ConfirmOrderPage />}
                    />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/profile/*" element={<LayoutProfile />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </div>
            <FooterComponent />
        </Router>
    );
}

export default Index;
