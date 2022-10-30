import Reat from 'react';
import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';
import HeaderComponent from "../components/header/index";
import HomePage from './HomePage';

function Index() {
    return (
        <Router>
            <HeaderComponent />
            <Routes>
                <Route path="/home" element={<HomePage />} />
            </Routes>
        </Router>
    );
}

export default Index;