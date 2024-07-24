import { useContext } from "react";
import Header from "./components/Header";
import Products from "./components/Products";
import { CartContext } from "./contexts/cartContext";
import Cart from "./components/Cart";

function App() {
  const { openCart } = useContext(CartContext);

  return (
    <>
      <Header />
      {openCart ? <Cart /> : <Products />} 
      <footer className="text-center py-3 font-mono sticky bottom-0 z-10 bg-gray-300 ">
        <p>Conditions of Use & Sale Privacy Notice Interest-Based Ads</p>
        <p>© 1996-2024, lamy.com, Inc. or its affiliates</p>
      </footer>
    </>
  );
}

export default App;
