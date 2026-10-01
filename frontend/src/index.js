import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import './index.css';

import Navbar from './landing_page/Navbar';
import Footer from './landing_page/Footer';
import NotFoundPage from './landing_page/NotFoundPage';


import HomePage from './landing_page/home/HomePage';
import AboutPage from './landing_page/about/AboutPage';
import PricingPage from './landing_page/pricing/PricingPage';
import ProductsPage from './landing_page/products/ProductsPage';
import Signup from './landing_page/signup/Signup';
import Login from './landing_page/signup/Login';
import Home from './landing_page/signup/Home';
import SupportPage from './landing_page/support/SupportPage';
import 'react-toastify/dist/ReactToastify.css';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CookiesProvider>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    </CookiesProvider>
);

