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

  const [loading, setLoading] = useState(true);

  const getProductCategories = async () => {
    const data = await fetchProductCategories();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    getProductCategories();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  const filterProductOfCategories = (category: string) => {
    const filteredProducts = productsToFilter?.filter(
      (product) => product.category === category
    );
    console.log("filteredProducts");
    if (filteredProducts) {
      setProducts(filteredProducts);
    }
  };

  return (
    <div className="category-container">
      {categories &&
        categories.slice(0, 6).map((category, index) => (
          <div key={index} className="category-btn">
            <button onClick={() => filterProductOfCategories(category)}>
              {category}
            </button>
          </div>
        ))}
      <div></div>
    </div>
  );
};

export default Category;
