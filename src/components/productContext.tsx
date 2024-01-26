import React, { useContext, useEffect, useState, ReactNode } from "react";
import { createContext } from "react";
import { ProductProps } from "./type";

interface Props {
  children?: ReactNode;
}

interface ContextProp {
  cartQuantity: number | undefined;
  setCartQuantity: React.Dispatch<React.SetStateAction<number | undefined>>;
  cartProducts: ProductProps[] | null;
  setCartProducts: React.Dispatch<React.SetStateAction<ProductProps[] | null>>;
  productsToFilter: ProductProps[] | null;
  products: ProductProps[] | null;
  setProducts: React.Dispatch<React.SetStateAction<ProductProps[] | null>>;
}

const ProductContext = createContext({} as ContextProp);

export const ProductProvider = ({ children }: Props) => {
  const [products, setProducts] = useState<ProductProps[] | null>([]);
  const [productsToFilter, setProductsToFilter] = useState<
    ProductProps[] | null
  >([]);
  const [cartProducts, setCartProducts] = useState<ProductProps[] | null>([]);
  const [cartQuantity, setCartQuantity] = useState<number>();

  const [loading, setLoading] = useState(true);

  const getAllProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      setProducts(data.products);
      setProductsToFilter(data.products);
      setLoading(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <ProductContext.Provider
        value={{
          products,
          setProducts,
          productsToFilter,
          cartProducts,
          setCartProducts,
          cartQuantity,
          setCartQuantity,
        }}
      >
        {children}
      </ProductContext.Provider>
    </div>
  );
};

export const useProductContext = () => {
  return useContext(ProductContext);
};
