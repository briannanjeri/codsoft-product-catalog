import React from "react";

import { Routes, Route } from "react-router-dom";
import { Home } from "./components/home/home";
import { ProductDetail } from "./components/productDetail/productDetail";
import ShoppingCartDetails from "./components/shoppingCartDetails/shoppingCartDetails";
import Navbar from "./components/Navbar/navbar";
function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/cart" element={<ShoppingCartDetails />}></Route>
        <Route path="/product-details/:id" element={<ProductDetail />}></Route>
      </Routes>
    </div>
  );
}

export default App;
