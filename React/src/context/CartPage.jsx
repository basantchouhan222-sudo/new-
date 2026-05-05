import React from "react";
import { useCart } from "./CartContext";
import "./CartPage.css";
import { WebHeader } from "../Home/WebHeader";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const navigate = useNavigate()
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    totalPrice
  } = useCart();

  return (
    <>
  {/* <WebHeader/> */}
    <div className="Addtocart">
      <button onClick={()=>{navigate("/")}} className="BackBtn">✖</button>

  {/* LEFT PRODUCTS */}
  <div className="cartLeft">

    {cart.length === 0 ? (
      <p className="empty">Cart is Empty 🛒</p>
    ) : (
      cart.map((item) => (
        <div className="cartItem" key={item._id}>

          {/* PRODUCT IMAGE */}
          <div className="cartImg">
            <img src={item.Photo?.[0]} alt={item.Productname} />
          </div>

          {/* DETAILS */}
          <div className="cartInfo">
            <h3>{item.Productname}</h3>
            <p className="price">₹ {item.Price}</p>
          </div>

          {/* QTY */}
          <div className="qtyBox">
            <button onClick={() => decreaseQty(item._id)} className="qtyBtn">−</button>
            <span className="qtyNumber">{item.qty}</span>
            <button onClick={() => increaseQty(item._id)} className="qtyBtn">+</button>
          </div>

          {/* TOTAL */}
          <div className="itemTotal">
            ₹ {item.Price * item.qty}
          </div>

          {/* REMOVE */}
          <button
            className="deleteBtn"
            onClick={() => removeFromCart(item._id)}
          >
            ✖
          </button>

        </div>
      ))
    )}

  </div>

  {/* RIGHT SUMMARY */}
  <div className="cartRight">

    <div className="summaryBox">

      <h2>Order Summary</h2>

      <div className="summaryRow">
        <span>Total Items</span>
        <span>{cart.length}</span>
      </div>

      <div className="summaryRow">
        <span>Total Amount</span>
        <span>₹ {totalPrice}</span>
      </div>

      <button className="payBtn">
        Process to Pay
      </button>

    </div>

  </div>

</div>
</>
  );
}

export default CartPage;