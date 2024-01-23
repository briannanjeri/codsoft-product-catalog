import React from "react";

import { Routes, Route } from "react-router-dom";
import { Home } from "./components/home/home";
import { ProductDetail } from "./components/productDetail/productDetail";
import ShoppingCart from "./components/shoppingCart";

function App() {
  return (
    <div className="App">
      <ShoppingCart />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product-details/:id" element={<ProductDetail />}></Route>
      </Routes>
    </div>
  );
}

export default App;
