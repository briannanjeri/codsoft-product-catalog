import React, { useEffect, useState } from "react";
import { useProductContext } from "../productContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import "./style.css";
import { ProductProps } from "../type";
import CartSummary from "../cartSummary/cartSummary";
const ShoppingCartDetails = () => {
  const { cartProducts, setCartProducts } = useProductContext();
  const [filteredProducts, setFilteredProducts] = useState<any>();
  const [uniqueProducts, setUniqueProducts] = useState<ProductProps[]>([]);

  const uniqueCartProducts = [...new Set(cartProducts)];
  useEffect(() => {
    setUniqueProducts(uniqueCartProducts);
  }, []);
  useEffect(() => {
    if (cartProducts) {
      const filterProducts = uniqueCartProducts.map((product) => {
        return cartProducts.filter(
          (cartProduct) => cartProduct.id == product.id
        );
      });
      if (filterProducts) {
        setFilteredProducts(filterProducts);
      }
    }
  }, []);

  const removeProduct = (item: ProductProps) => {
    const updatedProducts = cartProducts?.filter(
      (product) => product.id != item.id
    );
    if (updatedProducts) {
      setCartProducts(updatedProducts);
    }
    const updatedUniqueProducts = uniqueProducts?.filter(
      (product) => product.id != item.id
    );
    setUniqueProducts(updatedUniqueProducts);
  };

  return (
    <div className="cart-product-detail">
      {uniqueProducts.map((product) => (
        <div className="cart-product" key={product.id}>
          <div className="product-cart-details">
            <div className="thumbnail">
              <img src={product.thumbnail} alt={product.title} />
              <div>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => removeProduct(product)}
                >
                  <span>
                    <FontAwesomeIcon className="fa-Trash" icon={faTrash} />
                  </span>
                  <span>remove Item</span>
                </span>
              </div>
            </div>
            <div className="product-cart-title">
              <h4>{product.title}</h4>
              <div className="numbers-added">
                {filteredProducts &&
                  filteredProducts.map((filteredProduct: any) =>
                    filteredProduct
                      .slice(0, 1)
                      .map(
                        (filterProduct: any) =>
                          filterProduct.id === product.id && (
                            <div> {filteredProduct.length}</div>
                          )
                      )
                  )}
                items added to the cart
              </div>
            </div>
            <div className="cart-price">
              <p>USD: {product.price}</p>
            </div>
          </div>
        </div>
      ))}
      <div>
        <CartSummary />
      </div>
    </div>
  );
};

export default ShoppingCartDetails;
