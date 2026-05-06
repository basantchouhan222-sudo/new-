import React, { useEffect, useRef, useState } from "react";
import "./Banner.css";
import foodimg from "../assets/image.png";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import thali from "../assets/thali.png";
import thali1 from "../assets/thali1.png"
import thali2 from "../assets/thali2.png"

import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/react-splide/css/core";

function Banner() {

  const [ShowProduct ,SetShowProduct] = useState([])
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const CartFor = async()=>{
    const res = await fetch("https://new-eight-alpha-24.vercel.app/api/product")
    const Data = await res.json()
    SetShowProduct(Data.data || Data)
  }


  useEffect(()=>{
    CartFor()
  },[])

  /* HERO IMAGE SCROLL ANIMATION */
  const foodRef = useRef(null);
  const AboutPointRef = useRef(null)

 useEffect(() => {
  const handleScroll = () => {
    const scrollValue = window.scrollY;
    const rotateValue = scrollValue * 0.2;
    const sizeValue = scrollValue * 0.7;

    const screenWidth = window.innerWidth;
    const moveSide = Math.min(scrollValue, screenWidth * 0.3);

    if (foodRef.current) {
      // rotate
      foodRef.current.style.setProperty("--rotate", `${rotateValue}deg`);

      // width (min 450px)
      const newWidth = Math.max(1500, Math.min(900, 1000 - sizeValue));
      foodRef.current.style.width = `${newWidth}px`;

      // move side
      foodRef.current.style.marginLeft = `${moveSide}px`;

      // scale
      const scaleValue = Math.max(0.5, 1 - scrollValue / 1000);
      foodRef.current.style.setProperty("--scale", scaleValue);

      // position logic
      const triggerPoint = window.innerHeight * 0.75;
      const freezePoint = window.innerHeight * 1.4;

      if (scrollValue  < triggerPoint) {
        foodRef.current.style.position = "fixed";
        foodRef.current.style.top = "50%";

      } else if (scrollValue < freezePoint) {
        foodRef.current.style.position = "absolute";
        foodRef.current.style.top = `${triggerPoint + 550}px`;

      } else {
        foodRef.current.style.position = "absolute";
        foodRef.current.style.top = `${triggerPoint + 500}px`;
      }
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  /* ABOUT FADE ANIMATION */
  useEffect(() => {
    const handleScroll = () => {
      if (!AboutPointRef.current) return; 
      const scrollAmount = window.scrollY;

      if (scrollAmount >= 480) {
        const moveValue = scrollAmount * 0.010;
        const finalMove = Math.min(moveValue, 1);
        AboutPointRef.current.style.opacity = finalMove;
      } else {
        AboutPointRef.current.style.opacity = 0;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <div className="Hero1">
        <div className="heroBg"></div>
        <img ref={foodRef} src={foodimg} alt="Food" className="heroFood" />
        <div className="heroOverlay"></div>

        <div className="heroText1">
          <div className="heroText">
            <h1>Fresh Food Delivered Fast</h1>
            <p>Hot • Tasty • Delivered in Minutes</p>
            <button onClick={()=>navigate("/Food")}>Order Now</button>
          </div>

          <div ref={AboutPointRef} className="DetailSecond">
           <h1>We Cook With Love</h1>
<h2>Welcome To Our Kitchen</h2>

<p>
  At FoodHub, cooking is more than just preparing meals — it’s about 
  creating experiences. Our journey started with a simple idea: make 
  delicious, hygienic and affordable food accessible to everyone.
  Every dish is prepared with fresh ingredients, authentic recipes and
  strict quality standards.
</p>

<p>
  Whether you’re craving comfort food, quick snacks, or full meals for
  your family, we make sure every bite feels homemade and satisfying.
  We combine speed, taste and quality so you never have to compromise.
</p>

<ul className="aboutPoints">
  <li>Fresh & Premium Quality Ingredients</li>
  <li>Fast & Reliable Delivery Service</li>
  <li>Affordable Meals For Everyone</li>
  <li>Clean & Hygienic Kitchen Practices</li>
  <li>Loved By Thousands Of Happy Customers</li>
</ul>
          </div>
        </div>
      </div>
<div className="SwiperInsideCenter">
     <div className="SwiperInside">

<Splide
  options={{
    type: "loop",
    perPage: 4,
    gap: "50px",
    speed: 800,

    arrows: true,
    pagination: true,
    autoplay: true,
    interval: 3000,
    pauseOnHover: true,

    drag: "free",                
    noDrag: ".ProductSlider, button",
    dragMinThreshold: { mouse: 10, touch: 20 }, 

    breakpoints: {
      1200: { perPage: 3 },
      900: { perPage: 2 },
      600: { perPage: 1 },
    },
  }}
>

    {ShowProduct.map((item,index) => (
      <SplideSlide key={index}>
        <div
          className="ProductSlider"
         onClick={()=>{
               navigate(`/Food/${item._id}-${item.slug}`) 
            }}
        >
          <img src={item.Photo[0]} alt={item.Productname} />

          <div className="productInfo">
            <h1>{item.Productname}</h1>
            <h2>{item.Category}</h2>
            <p className="desc">{item.Discription}</p>
            <p className="price">₹ {item.Price}</p>

            <button
              className="AddToCart"
              onClick={(e)=>{
                e.stopPropagation(); 
                addToCart(item);
                setTimeout(()=>{
                  navigate(`/Food/${item._id}-${item.slug}`) 
                },500)
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </SplideSlide>
    ))}

  </Splide>

</div>
</div>


<section className="thaliSection">
  <div className="darkforit"></div>
  <div className="ThaliContent-Main">
      <div className="thaliContent">
        <h1>Traditional Indian Thali</h1>

        <p>
          Indian thali ek complete meal hota hai jo ek hi platter me
          multiple dishes serve karta hai. Isme taste, nutrition aur
          variety ka perfect balance hota hai.
        </p>

        <ul>
          <li> Dal & Sabzi – Healthy and protein rich</li>
          <li> Steamed Rice – Light & fluffy</li>
          <li> Fresh Roti – Soft Indian bread</li>
          <li> Salad – Fresh & crunchy</li>
          <li>Sweet Dish – Meal ka perfect ending</li>
        </ul>

        <button onClick={()=>{navigate("/Food")}}>Order Thali</button>
      </div>

      {/* RIGHT IMAGE */}
      <div className="thaliImage">
        <img src={thali1} alt="Indian Thali" className="thali1"/>
        <img src={thali2} alt="Indian Thali" className="thali2"/>
         <img src={thali} alt="Indian Thali" className="thaliCenter"/>
      </div>
      </div>

    </section>
   <div className="productListTwo">
  {ShowProduct.map((item, index) => (
    <div
      key={index}
      className="productCard"
      onClick={() => navigate(`/Food/${item._id}-${item.slug}`)}
    >
      <img src={item.Photo[0]} alt={item.Productname} />
      <h3>{item.Productname}</h3>
      <p>₹ {item.Price}</p>
    </div>
  ))}
</div>

    </>
  );
}

export { Banner };