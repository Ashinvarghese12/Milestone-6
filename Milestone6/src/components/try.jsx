import React, { useContext, useState, useMemo, useCallback, useEffect } from "react";
import { CartContext } from "../contexts/cartContext.jsx";
import Product from "./Product.jsx";
import InfiniteScroll from "react-infinite-scroll-component"; // Import required library

const Products = () => {
  const { productData, setCartData, cartData, setOpenCart } = useContext(CartContext);
  const { data, error } = productData || {};

  const [products, setProducts] = useState([]); // State to manage loaded products
  const [currentPage, setCurrentPage] = useState(1); // Track current page for fetching

  // ... existing productWithOffer logic using useMemo (unchanged)

  const handleAddToCart = (data) => {
    // ... existing logic for adding to cart (unchanged)
  };

  const fetchData = async () => {
    // Implement your logic to fetch data based on currentPage
    // This example assumes a backend API that supports pagination
    const response = await fetch(`/api/products?page=${currentPage}`);
    const newData = await response.json();

    // Update products and current page
    setProducts([...products, ...newData]);
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    if (data) {
      // Initial data load (if data exists)
      setProducts(productsWithOffer || []); // Use productsWithOffer if available
    } else {
      // Handle loading state or error (unchanged)
    }
  }, [data, productsWithOffer]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      <InfiniteScroll
        dataLength={products.length} // Use products state for data length
        next={fetchData}
        hasMore={true} // Assume more data is available initially
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {products.map((res, index) => {
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
