import Reat from 'react';
import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';
import HeaderComponent from "../components/header/index";
import HomePage from './HomePage';
import ShopPage from './ShopPage'
import ProductPage from './ProductPage'

function Index() {
    return (
        <Router>
            <HeaderComponent />
            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
        </Router>
    );
}

export default Index;