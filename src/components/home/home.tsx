import React from "react";
import Category from "../category/category";
import { ProductListings } from "../productListings";

export const Home = () => {
  return (
    <div>
      <Category />
      <ProductListings />
    </div>
  );
};
