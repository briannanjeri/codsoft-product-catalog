import React from "react";
import { useProductContext } from "./productContext";
import { ProductProps } from "./type";
import { Link } from "react-router-dom";

export const ProductListings = () => {
  const { products, setProducts, cartProducts, setCartProducts } =
    useProductContext();

  const addProductToCart = (product: ProductProps) => {
    if (product != null) {
      const existingProduct = cartProducts?.find(
        (cartProduct) => cartProduct.id === product.id
      );
      if (!existingProduct) {
        setCartProducts((prevProducts) => {
          if (prevProducts !== null) {
            return [...prevProducts, product];
          } else {
            return [product];
          }
        });
      } else {
        console.log("product exists");
      }
    }
  };

  return (
    <div className="products-container">
      {products?.slice(0, 20).map((product) => (
        <div key={product.id} className="products-Card">
          <Link to={`/product-details/${product.id}`}>
            <div className="product-title">{product.title}</div>
            <img src={product.thumbnail}></img>
          </Link>
          <button
            className="cart-button"
            onClick={() => addProductToCart(product)}
          >
            Add To Cart
          </button>
        </div>
      ))}
    </div>
  );
};
