import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import "./BUYProduct.css";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Footer } from "../Footer";


function BuyPoduct() {
  
const navigate = useNavigate()
  const { cart, totalPrice } = useCart();

  const [buyNowItem, setBuyNowItem] = useState(null);

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("checkoutItem"));
    console.log("Checkout item 👉", item); 
    if (item) setBuyNowItem(item);
  }, []);

  const productsToShow = buyNowItem ? [buyNowItem] : cart;

  const finalPrice = buyNowItem
    ? buyNowItem.Price * buyNowItem.qty
    : totalPrice;

   

const handlePayment = async () => {
    const login = JSON.parse(localStorage.getItem("User"))
    if(login){
      const buyNowItem = JSON.parse(localStorage.getItem("checkoutItem"));
  const productsToSend = buyNowItem ? [buyNowItem] : cart;

  const finalAmount = buyNowItem
    ? buyNowItem.Price * buyNowItem.qty
    : totalPrice;

  const orderData = {
    products: productsToSend,
    totalAmount: finalAmount,
    user: "Demo User"
  };
  try {
    const res = await fetch("http://localhost:4000/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    });

    const data = await res.json();
    console.log(data);

    alert("Payment Successful & Order Saved 🎉");

    // cleanup
    localStorage.removeItem("checkoutItem");

  } catch (err) {
    console.log(err);
    alert("Payment Failed ❌");
  }

    }else{
      toast.error("we need to login")
      setTimeout(() => {
        navigate("/Login")
      },1000);
    }

  
};
  return (
    <>
    <div className="Buy-Product">
      <Toaster/>

      {productsToShow.map((item) => (
        <div className="Product-Name" key={item._id}>
          <img src={item.Photo?.[0]} alt={item.Productname} />
          <div>
            <h3>{item.Productname}</h3>
            <div className="itemTotal">
              ₹ {item.Price} × {item.qty || 1}
            </div>
          </div>
        </div>
      ))}

      <div className="cartRight">
        <div className="summaryBox">
          <h2>Order Summary</h2>

          <div className="summaryRow">
            <span>Total Items</span>
            <span>{productsToShow.length}</span>
          </div>

          <div className="summaryRow">
            <span>Total Amount</span>
            <span>₹ {finalPrice}</span>
          </div>

          <button className="payBtn" onClick={handlePayment}>
            Process to Pay
          </button>
<button onClick={() => navigate("/Food")} className="backbtn">
  Cancel
</button>
        </div>
      </div>

    </div>
      <Footer/>
    </>
  );
}

export { BuyPoduct };