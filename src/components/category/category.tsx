import React, { useEffect } from "react";
import { useState } from "react";
import { useProductContext } from "../productContext";
import "./style.css";
import { ProductCategoriesProp } from "../type";
import { fetchProductCategories } from "../../utils/fetchCategories";
import ShoppingCart from "../shoppingCart";
const Category = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const { products, setProducts, productsToFilter } = useProductContext();
  const [activeButton, setActiveButton] = useState<string>("");

  const [loading, setLoading] = useState(true);

  const getProductCategories = async () => {
    const data = await fetchProductCategories();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    getProductCategories();
  }, []);

  const filterProductOfCategories = (category: string) => {
    const filteredProducts = productsToFilter?.filter(
      (product) => product.category === category
    );
    if (filteredProducts) {
      setProducts(filteredProducts);
    }
  };

  const handleButtonClick = (clickedButton: string) => {
    setActiveButton(clickedButton);
  };
  const checkIsButtonActive = (clickedButton: string) => {
    if (activeButton === clickedButton) return true;
    return;
  };

  useEffect(() => {
    if (activeButton) {
      const filteredProducts = productsToFilter?.filter(
        (product) => product.category === activeButton
      );
      if (filteredProducts) {
        setProducts(filteredProducts);
      }
    }
  }, [activeButton]);

  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <div className="category-container">
      {categories &&
        categories.slice(0, 6).map((category, index) => (
          <div key={index} className="category-btn">
            <button
              style={{
                backgroundColor: checkIsButtonActive(category) && "white",
                color: checkIsButtonActive(category) && "black",
              }}
              onClick={() => handleButtonClick(category)}
            >
              {category}
            </button>
          </div>
        ))}
      <div></div>
    </div>
  );
};

export default Category;
