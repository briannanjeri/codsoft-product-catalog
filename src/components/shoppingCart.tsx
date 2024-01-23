import React, { useEffect } from "react";
import { useProductContext } from "./productContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
const ShoppingCart = () => {
  const { cartProducts, cartQuantity, setCartQuantity } = useProductContext();
  console.log("cartProducts", cartProducts);

  useEffect(() => {
    if (cartProducts) {
      setCartQuantity(cartProducts.length);
    }
  }, [cartProducts]);
  console.log("cartQuantity", cartQuantity);
  return (
    <div className="cart-container">
      <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />

      <span className="cart-count">{cartQuantity}</span>
    </div>
  );
};

export default ShoppingCart;
