import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./User-Detail.css"

function UserDetailMore() {
  const navigate = useNavigate();
  const [UserData, setUserData] = useState(null);

  // Run only once when component loads
  useEffect(() => {
    const UserDetail = JSON.parse(localStorage.getItem("User"));
    console.log(UserDetail);
    setUserData(UserDetail);
  }, []);

  const Logout = () => {
    localStorage.removeItem("User");
    toast.success("LOGOUT");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  // safety check (important)
  if (!UserData) return <h2>Loading...</h2>;

return (
<div className="ProfileCard-1">

  <button className="CloseBtn" onClick={()=>navigate("/")}>X</button>

  {/* LEFT PROFILE */}
  <div className="ProfileCard">
    <h1 className="Name">{UserData.Name}</h1>
    <h2 className="Phone">{UserData.Phone}</h2>
    <p className="Mail">{UserData.Mail}</p>
    <p className="Address">{UserData.Address}</p>

    <button onClick={Logout} className="LogOUT">LOGOUT</button>
    <button className="EditBtn">EDIT</button>
  </div>

  {/* RIGHT SIDEBAR */}
  <div className="Profile-left">
    <button className="CartBtn" onClick={()=>navigate("/Cart")}>
      YOUR CART
    </button>
  </div>

</div>
);
}

export { UserDetailMore };