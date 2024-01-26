import React, { useEffect, useState } from "react";
import { useProductContext } from "./productContext";
import { ProductProps } from "./type";
import { Link } from "react-router-dom";

export const ProductListings = () => {
  const { products, setProducts, cartProducts, setCartProducts } =
    useProductContext();
  const [activeButton, setActiveButton] = useState<string[]>([]);
  const [uniqueProducts, setUniqueProducts] = useState<ProductProps[]>([]);

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
      }
    }
  };
  useEffect(() => {
    const uniqueCartProducts = [...new Set(cartProducts)];
    setUniqueProducts(uniqueCartProducts);
  }, [cartProducts]);

  return (
    <div className="products-container">
      {products?.slice(0, 20).map((product) => (
        <div key={product.id} className="products-Card">
          <Link to={`/product-details/${product.id}`}>
            <div className="product-title">{product.title}</div>
            <img src={product.thumbnail}></img>
          </Link>
          {!uniqueProducts.some(
            (cartProduct) => cartProduct.id === product.id
          ) && (
            <button
              className="cart-button"
              onClick={() => addProductToCart(product)}
            >
              Add To Cart
            </button>
          )}

          {uniqueProducts.some(
            (cartProduct) => cartProduct.id === product.id
          ) && (
            <button className="cart-button" style={{ opacity: 0.5 }}>
              Add To Cart
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
