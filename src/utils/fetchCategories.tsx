export const fetchProductCategories = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products/categories");
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }
    const data = await response.json();
    return data;
  } catch (error) {}
};
