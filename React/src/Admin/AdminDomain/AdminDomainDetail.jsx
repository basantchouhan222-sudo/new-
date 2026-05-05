import React from "react";
import myVideo from "./AdminProfile.mp4";
import "./AdminMain.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


function AdminDomainDetail(){
  const navigate = useNavigate()

useEffect(() => {
  const admin = JSON.parse(localStorage.getItem("admin"));

  if (!admin) {
    navigate("/AdminLogin");
  }
}, []);
 const logoutADmin = () =>{
  localStorage.removeItem("admin")
  setTimeout(()=>{
      navigate("/AdminLogin")
  },2000)
}

  return (
   <>

     
      <div className="adminSidebar">

        <div className="adminProfile">
          <video autoPlay muted loop playsInline className="profileVideo">
            <source src={myVideo} type="video/mp4" />
          </video>
          <h3>ADMIN PANNEL</h3>
          <p>Welcome Back </p>
        </div>

        <div className="adminMenu">
          <button onClick={()=>{navigate("/AdminDomainMain")}}>MAIN</button>
          <button onClick={()=>{navigate("/AdminDomainMain/User-Detail")}}>USER DETAIL</button>
          <button onClick={()=>{navigate("/AdminDomainMain/Product-List")}}>PRODUCT LIST</button>
          <button>ORDER</button>
          <button>ANALYTICS</button>
          <button className="logoutBtn" onClick={logoutADmin}>LOGOUT</button>
        </div>
      </div>
      
        </>
  
  );
}

export {AdminDomainDetail};