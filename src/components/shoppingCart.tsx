import React, { useEffect } from "react";
import { useProductContext } from "./productContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const ShoppingCart = () => {
  const { cartProducts, cartQuantity, setCartQuantity } = useProductContext();
  console.log("cartProducts", cartProducts);

  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate("/cart");
  };

  useEffect(() => {
    if (cartProducts) {
      setCartQuantity(cartProducts.length);
    }
  }, [cartProducts]);
  console.log("cartQuantity", cartQuantity);
  return (
    <div className="cart-container">
      <FontAwesomeIcon
        icon={faShoppingCart}
        onClick={handleIconClick}
        className="cart-icon"
      />

      <span className="cart-count">{cartQuantity}</span>
    </div>
  );
};

export default ShoppingCart;
