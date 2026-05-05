import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import bg from "./AdminFoodPhoto.jpg"
import "./AdminLogin.css"
import toast, { Toaster } from "react-hot-toast";

function AdminLogin(){
    const [AdminLoginmail,SetAdminLoginMail] = useState("")
    const [AdminLoginPassword,SetAdminLoginPassword] = useState("")
    const navigate = useNavigate()
     


    async function AdminLoginbtn() {
        try{

        
    const res = await fetch("http://localhost:4000/api/admin")
    const Admindata = await res.json()

   const findAdmin = Admindata.find((data)=> {
    return(data.AdminMail === AdminLoginmail && 
           data.AdminPassword === AdminLoginPassword)
              });

       if( findAdmin ){

        SetAdminLoginMail("")
        SetAdminLoginPassword("")

            toast.success("Admin Login SuccessFully")

              localStorage.setItem("admin",JSON.stringify(findAdmin));
              
              setTimeout(() => {
               navigate("/AdminDomainMain")
              }, 2000);
       
            }
            else{
                toast.error("invalid Admin Mail or Pasword ")
            } 
    }
     catch(err){
        console.log(err)
    }
    
    }
    
    return(
    <>
  
    <div className="AdminLoginWrapper" style={{ backgroundImage: `url(${bg})` }}>
  <div className="AdminLoginPageDesine">
    <div className="AdminLoginPageDesine1">
       <button onClick={()=>{navigate("/")}} className="CloseBtnForAdminLogin">X</button>
      <div className="AdminLoginPageDesine2">

        <h2>Admin Login</h2>

        <input
          type="text"
          className="AdminLoginPageMail"
          placeholder="Admin Mail"
          value={AdminLoginmail}
          onChange={(e)=>SetAdminLoginMail(e.target.value)}
        />

        <input
          type="password"
          className="AdminLoginPagePassword"
          placeholder="Admin Password"
          value={AdminLoginPassword}
          onChange={(e)=>SetAdminLoginPassword(e.target.value)}
        />

        <button onClick={AdminLoginbtn}>Login</button>

      </div>
    </div>
  </div>
 <Toaster/>
</div>
    

    
    </>
    )
}
export{AdminLogin}