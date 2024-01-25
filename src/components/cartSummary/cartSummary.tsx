import React, { useEffect, useState } from "react";
import { useProductContext } from "../productContext";

const CartSummary = () => {
  const { cartProducts, setCartProducts } = useProductContext();
  const [subTotal, setSubTotal] = useState<number>(0);
  let sum: number = 0;

  if (cartProducts) {
    for (const product of cartProducts) {
      if (product.discountPercentage) {
        console.log(product.price, product.discountPercentage);
        const remainder =
          product.price -
          Math.floor((product.discountPercentage / 100) * product.price);
        console.log("remainder", remainder);
        sum += remainder;
      } else {
        sum += product.price;
      }
    }
  }

  console.log("subTotal", subTotal);

  return (
    <div className="cart-summary">
      <h2 className="cart-summary-title">CART SUMMARY</h2>
      <hr className="cart-summary-divider" />
      <p className="cart-summary-subtotal">Subtotal: ${sum}</p>
    </div>
  );
};

export default CartSummary;
