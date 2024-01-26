import React, { useEffect } from "react";
import { useState } from "react";
import { useProductContext } from "../productContext";
import { useParams } from "react-router-dom";
import { ProductProps } from "../type";
import "./style.css";
import CartSummary from "../cartSummary/cartSummary";

export const ProductDetail = () => {
  const {
    products,
    setProducts,
    cartProducts,
    setCartProducts,
    cartQuantity,
    setCartQuantity,
  } = useProductContext();
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(
    null
  );
  const [selectedImage, setSelectedImage] = useState();
  const [imageInView, setImageInView] = useState<string>();
  const [quantityAdded, setQuantityAdded] = useState<number>();

  const { id } = useParams();
  let productId: number | undefined;

  if (id) {
    productId = parseInt(id, 10) as number;
  }
  const product = products?.find((product) => product.id == productId);

  useEffect(() => {
    if (product) {
      setSelectedProduct(product);
    }
  }, [productId]);

  if (selectedProduct) {
  }

  useEffect(() => {
    if (selectedProduct) {
      setImageInView(selectedProduct.thumbnail);
    }
  }, [selectedProduct]);

  const updateImage = (clickedImage: any) => {
    setSelectedImage(clickedImage);
  };

  const addProductToCart = (item: ProductProps) => {
    if (cartProducts != null && cartProducts?.length >= 1) {
      const existingProduct = cartProducts.find(
        (product) => product.id === item.id
      );
      if (existingProduct) {
        setCartProducts(
          (prevProducts) => prevProducts && [...prevProducts, existingProduct]
        );
      }
    }
  };

  useEffect(() => {
    if (product != null) {
      const addedItems = cartProducts?.filter(
        (cartProduct) => cartProduct.id === product.id
      );
      setQuantityAdded(addedItems?.length);
    }
  }, [cartProducts]);

  const subtractItem = (Item: ProductProps) => {
    if (cartProducts && quantityAdded) {
      const indexOfItemToRemove = cartProducts.findIndex(
        (product) => product.id == Item.id
      );
      if (indexOfItemToRemove !== -1 && quantityAdded > 1) {
        cartProducts.splice(indexOfItemToRemove, 1);
        setCartQuantity(cartProducts?.length);
        const remainingItems = cartProducts?.filter(
          (cartProduct) => cartProduct.id === Item.id
        );
        setQuantityAdded(remainingItems.length);
      }
    }
  };

  return (
    <div className="product-detail-container">
      {selectedProduct && (
        <div className="product-details-wrapper">
          <div className="product-img">
            {!selectedImage ? (
              <img src={imageInView} alt="Thumbnail"></img>
            ) : (
              <img src={selectedImage} alt="Thumbnail"></img>
            )}

            <div className="additional-images">
              {selectedProduct.images.map((image, index) => (
                <img
                  onClick={() => updateImage(image)}
                  key={index}
                  src={image}
                  alt={`Image `}
                ></img>
              ))}
            </div>
          </div>
          <div className="product-details">
            <h1 className=" title">{selectedProduct.title}</h1>
            <div className="brand"> Brand:{selectedProduct.brand}</div>
            <div className="description">
              Description:{selectedProduct.description}
            </div>
            <div className="price">USD:{selectedProduct.price}</div>
            <div className="discount">
              Discount:{selectedProduct.discountPercentage}
            </div>
            <div className="rating">rating{selectedProduct.rating}</div>
            <div className="stock">stock:{selectedProduct.stock}</div>
            <hr></hr>
            {cartProducts?.some(
              (cartProduct) => cartProduct.id === selectedProduct.id
            ) && (
              <div className="quantity-container">
                <button
                  style={{ opacity: quantityAdded === 1 ? 0.3 : 1 }}
                  className="quantity-button"
                  onClick={() => subtractItem(selectedProduct)}
                >
                  -
                </button>
                <div>{quantityAdded} items added to the cart</div>
                <button
                  className="quantity-button"
                  onClick={() => addProductToCart(selectedProduct)}
                >
                  +
                </button>
              </div>
            )}
          </div>
          <CartSummary />
        </div>
      )}
    </div>
  );
};
