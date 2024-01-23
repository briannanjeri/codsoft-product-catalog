export interface ProductProps {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

export interface ProductCategoriesProp {
  smartphones: string;
  laptops: string;
  fragrances: string;
  skincare: string;
  groceries: string;
  "home-decoration": string;
  furniture: string;
  tops: string;
  "womens-dresses": string;
  "womens-shoes": string;
  "mens-shirts": string;
  "mens-shoes": string;
  "mens-watches": string;
  "womens-watches": string;
  "womens-bags": string;
  "womens-jewellery": string;
  sunglasses: string;
  automotive: string;
  motorcycle: string;
  lighting: string;
}
