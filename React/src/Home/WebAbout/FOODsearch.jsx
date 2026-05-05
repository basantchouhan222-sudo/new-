import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./FOODsearch.css";
import { WebHeader } from "../WebHeader";
import { useCart } from "../../context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { Footer } from "../Footer"; 
function FOODsearch() {

  const { idslug } = useParams();
  const { addToCart } = useCart();   
  const navigate = useNavigate();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImg, setMainImg] = useState([]);
  const [msg, setMsg] = useState("");
  const [qty, setQty] = useState(1);
  const [FoodList, setFoodList] = useState(null);

  // API CALL
const getFood = async () => {
  try {
    setLoading(true);
    const res = await fetch(`http://localhost:4000/api/product/${idslug}`);
    const data = await res.json();
    setFood(data.data || data);
  } catch (err) {
    console.log("Single product error:", err);
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  const getAllFood = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/product");
      const data = await res.json();
      setFoodList(data.data || data);
    } catch (err) {
      console.log("FoodList error:", err);
    }
  };

  getAllFood();
}, []);

  useEffect(() => {
    setLoading(true)
    getFood();
  }, [idslug]);

  // default image
  useEffect(() => {
    if (food?.Photo?.length) {
      setMainImg(food.Photo[0]);
    }
  }, [food]);

  if (loading) return <h1 className="loader">Loading Product...</h1>;
  if (!food) return <h1>Product Not Found</h1>;

  const { Productname, Photo, Discription, Price, Category, Food } = food;

  // ADD TO CART WITH QTY
  const handleAddCart = () => {

    const productWithQty = {
      ...food,
      qty: qty
    };

    addToCart(productWithQty);

    setMsg(`${qty} Item added to cart 🛒`);

    setTimeout(() => setMsg(""), 1500);

    setTimeout(() => navigate("/Cart"), 1000);
  };
  const decreaseQty = () => {
  if (qty > 1) {
    setQty(qty - 1);
  } else {
    toast.error("Minimum 1 quantity required");
  }
};
const handleBuyNow = () => {

  const productWithQty = {
    ...food,
    qty: qty
  };

  localStorage.setItem(
    "checkoutItem",
    JSON.stringify(productWithQty)
  );

  // redirect to buy page
  navigate("/BuyOrder");
};
  return (
    <>
      <WebHeader />

      {msg && <div className="cartMessage">{msg}</div>}
         <Toaster/>

      <div className="FOOD">
        <div className="FOOD-A1">

          {/* THUMBNAILS */}
          <div className="thumbs">
            {Photo?.map((img, index) => (
              <div key={index} className="thumb" onClick={() => setMainImg(img)}>
                <img src={img} alt={Productname} />
              </div>
            ))}
          </div>

          {/* BIG IMAGE */}
          <div className="bigImage">
            <img src={mainImg} alt="product" />
          </div>

          {/* DETAILS */}
          <div className="details">
            <h1 className="title">{Productname}</h1>
            <p className="desc">{Discription}</p>

            <div className="meta">
              <h2 className="price">₹ {Price}</h2>
              <p>Category : {Category}</p>
              <p>Type : {Food}</p>
            </div>

            {/* QTY BOX */}
            <div className="qtyBox">
              <button 
                className="qtyBtn"
                onClick={decreaseQty}
              >
                −
              </button>

              <span className="qtyNumber">{qty}</span>

              <button 
                className="qtyBtn"
                onClick={() => setQty(qty + 1)}
              >
                +
              </button>
            </div>

            {/* BUTTONS */}
            <div className="btns">
              <button className="cartBtn" onClick={handleAddCart}>
                Add To Cart
              </button>

             <button className="buyBtn" onClick={handleBuyNow}>
              Buy Now
            </button>           
             </div>

          </div>
        </div>
        <div className="PRODUCT-LIST-ONE">

        <div className="PRODUCT-LIST">
          {
            FoodList?.map((item,index)=>(
              <div 
                key={index}
                className="productItem"
                onClick={() => navigate(`/Food/${item._id}-${item.slug}`)}
              >
                <img src={item.Photo[0]} alt={item.Productname} />
                <h3>{item.Productname}</h3>
                <p>₹ {item.Price}</p>
              </div>
            ))
          }
        </div>
        </div>
 <Footer/>
      </div>
    </>
  );
}

export { FOODsearch };