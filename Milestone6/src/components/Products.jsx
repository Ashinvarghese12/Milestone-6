import React, { useContext, useState, useMemo, useCallback, useEffect } from "react";
import { CartContext } from "../contexts/cartContext.jsx";
import Product from "./Product.jsx";
import InfiniteScroll from "react-infinite-scroll-component";

const Products = () => {
  const { productData, setCartData, cartData, setOpenCart } = useContext(CartContext);
  const { data, error } = productData || {};


  const productsWithOffer = useMemo(() => {
    return data && data.map((product) => {
      const offerSet = [10, 25, 50, 70, 85];
      const ratingSet = [1, 2, 3, 4, 5];
      const offerPercentage =
        offerSet[Math.floor(Math.random() * offerSet.length)];
      const randomRating =
        ratingSet[Math.floor(Math.random() * ratingSet.length)];
      const originalPrice = Math.floor(
        (product.price * 100) / (100 - offerPercentage)
      );
      return { ...product, offerPercentage, randomRating, originalPrice };
    });
  }, [data]);

  const handleAddToCart = (data) => {
    const withQuantity = { ...data, quantity: 1 };
    setCartData((prev) => [...prev, withQuantity]);
    localStorage.setItem("CART", JSON.stringify([...cartData, withQuantity]));
  };

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      <InfiniteScroll
        dataLength={productsWithOffer.length} // Use productsWithOffer length
        next={useContext(CartContext).fetchMoreProducts} // Call context function
        hasMore={true} // Assume more data is available initially
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {productsWithOffer.map((res, index) => {
          const isIdPresent = cartData.some(item => item.id === res.id);
          return (
            <Product
              key={index}
              data={res}
              handleAddToCart={handleAddToCart}
              setOpenCart={setOpenCart}
              presentInCart={isIdPresent ? true : false}
            />
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default Products;
