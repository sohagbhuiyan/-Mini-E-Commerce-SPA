import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Cart from './components/product/Cart';
import ProductviewPage from './components/product/ProductViewPage';
import Layout from './components/navbar/Layout';
import ScrollToTop from './components/navbar/ScrollToTop';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product/:name" element={<Layout><ProductviewPage /></Layout>} />
    </Routes>
    <ToastContainer />
    </>
  );
};

export default App;
