import React, { useEffect, useState } from "react";
import { Slider } from "./Slider";
import "./WebHead.css";
import { useNavigate } from "react-router-dom";
import Search from "../assets/Search.png";
import Logos from "../assets/Logos.png";
import toast, { Toaster } from "react-hot-toast";
import { useCart } from "../context/CartContext";


function WebHeader() {

  const navigate = useNavigate();
  const {cart} = useCart()

  const [isLogin, setIsLogin] = useState(false);
  const [Bar, SetBar] = useState(false);
  const [SL ,setSL] =useState(false)
  const [Name, setName] = useState("👤");
  const [Searchit, setSearchit] = useState(false);
  const [SearchData, setSearchData] = useState([]);
  const [searchfor, setsearchfor] = useState("");
  const [LOGO ,setLOGO] = useState(false)

  const cartbtn = Bar ? "cart-2 cart" : "cart";

  const ForSearch = async () => {
    const res = await fetch("http://localhost:4000/api/product");
    const Data = await res.json();
    setSearchData(Data.data || Data);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  const checkLogin = () => {
    const user = JSON.parse(localStorage.getItem("User"));

    if (user) {
      setIsLogin(true);
      setName(user.Name[0]); 
    } else {
      setIsLogin(false);
      setName("👤");
    }
  };

  useEffect(() => {
    ForSearch();
    checkLogin();
  }, [ForSearch]);


  const FilterData = (SearchData).filter((item) =>
    item.Productname?.toLowerCase().includes(searchfor?.toLowerCase())
  );

  return (
    <>
      {/* HEADER */}
      <div className="main-head">

  {/* LEFT = LOGO */}
  <div className="leftHead">
    <img src={Logos} className="logo" alt="logo" />
  </div>

  {/* CENTER = NAV */}
  <div className="centerHead">
    <div className="head-A">
      <ul>
        <div className="head-R"> 
          <li onClick={() => navigate("/")} className="Home">HOME</li>
        </div>
        <li onClick={() => navigate("/About")}>ABOUT</li>
        <li onClick={() => navigate("/Contact")}>CONTACT</li>
        <li onClick={() => navigate("/Order")}>ORDER</li>
        <li onClick={() => navigate("/Food")}>FOOD</li>
      </ul>                
    </div>
  </div>
  {/* MOBILE NAVBAR */}
<div className="mobileNav">
  <ul>
    <li onClick={() => navigate("/")}>HOME</li>
    <li onClick={() => navigate("/About")}>ABOUT</li>
    <li onClick={() => navigate("/Contact")}>CONTACT</li>
    <li onClick={() => navigate("/Order")}>ORDER</li>
    <li onClick={() => navigate("/Food")}>FOOD</li>
  </ul>
</div>

  {/* RIGHT = SEARCH + CART + PROFILE */}
  <div className="rightHead">

    <div className="SearchBtn">
      <input
        className={`SearchProduct ${Searchit ? "showSearch" : ""}`}
        placeholder="Search food..."
        value={searchfor}
        onChange={(e) => setsearchfor(e.target.value)}
      />

      {searchfor && (
        <div className="SearchDropdown">
          {FilterData.length > 0 ? (
            FilterData.map((item) => (
              <p key={item._id} onClick={() => {
                setsearchfor(" "); 
                setSearchit(false);
                navigate(`/Food/${item._id}-${item.slug}`)}}>
                {item.Productname}
              </p>
            ))
          ) : (
            <p>No Product Found</p>
          )}
        </div>
      )}
    </div>

    <img
      src={Search}
      alt="Search"
      className={`SearchLogo ${Searchit ? "active" : ""}`}
      onClick={() => {setSearchit(!Searchit); setsearchfor("")}}
    />

    <div className="cartIcon" onClick={() => navigate("/Cart")}>
      🛒 ({totalItems})
    </div>

    <div className="H">
      <div
        className="Slid_Bar"
        onClick={() => {
          if (isLogin) SetBar(true);
          else navigate("/Login");
        }}
      >
        {Name}
      </div>
    </div>

  </div>
</div>

      {isLogin && (
        <Slider cartbtn={cartbtn} close={() => SetBar(false)} />
      )}
    </>
  );
}

export { WebHeader };