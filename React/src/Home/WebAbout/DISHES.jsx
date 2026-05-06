import { WebHeader } from "../WebHeader";
import React, { useEffect, useState } from "react";
import "./DISHES.css";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Footer } from "../Footer";

function DISHES(){

  const [products, setProducts] = useState([]);
  const { addToCart, cart } = useCart();
  const navigate = useNavigate();

  
  useEffect(() => {
    fetch("https://new-eight-alpha-24.vercel.app/api/product")
      .then(res => res.json())
      .then(data => {
        const productArray = data.data || data;
        setProducts(productArray);
      })
      .catch(err => console.log(err));
  }, []);


  const visibleProducts = products.filter(
    product => !cart.some(item => item._id === product._id)
  );

  
const handleAddToCart = (product) => {
  const productWithQty = {
    ...product,   
    qty: 1
  };

  addToCart(productWithQty);

  toast.success("Added To Cart 🛒");
};
const handleBuyNow = (product) => {

  const productWithQty = {
    ...product, qty: 1
  };

  console.log("BUY NOW 👉", productWithQty);

  localStorage.setItem("checkoutItem", JSON.stringify(productWithQty));
  navigate("/BuyOrder");
};


  return (
    <>
      <WebHeader />

      <div className="productsPage">
        <h1 className="pageTitle">🔥 Our Foods</h1>

        <div className="productsGrid">

          {visibleProducts.map(product => (
            <div className="productCard" key={product._id} onClick={() =>  {navigate(`/Food/${product._id}-${product.slug}`)}}>

              <img src={product.Photo?.[0]} alt={product.Productname} />
              <h3>{product.Productname}</h3>
              <p className="desc">{product.Discription}</p>
              <div className="price">₹ {product.Price}</div>

              <div className="btnGroup">
                <button 
                  className="cartBtn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add To Cart
                </button>

                <button 
                  className="buyBtn"
                  onClick={() => handleBuyNow(product)}
                >
                  Buy Now
                </button>
              </div>

            </div>
          ))}

        </div>
      </div>
        <Footer/>
    </>
  );
}

export { DISHES };