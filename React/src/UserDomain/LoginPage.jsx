import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";


function Login() {
  const [Mail, setMail] = useState("");
  const [Lpassword, setlpassword] = useState("");
  const Navigate = useNavigate()

async function Crack() {
  try{
     const res = await fetch("https://new-eight-alpha-24.vercel.app/api/data")
    const Data = await res.json()

     const  Findit = 
      Data.find(i => 
        i.Mail === Mail &&
         i.Password === Lpassword )
         

  if(Findit){
    setMail("")
    setlpassword("")

    localStorage.setItem("User" ,JSON.stringify(Findit));

    toast.success("Login Successfully")
    
    setTimeout(()=>{
      Navigate("/")
    },2000)
  }
  else{
    toast.error("Enter Valid Detail !")
  }

  }catch(err){
   toast.error(err)
  }
}
  
  return ( 
<>
  <Toaster/>

  <div className="AuthPage">
    <div className="AuthCard">

      <div className="crossLogin" onClick={()=>Navigate("/")}>✖</div>

      {/* LEFT ANIMATION */}
    <div className="AuthLeft">
  <span></span>

 <DotLottieReact
    src="https://lottie.host/d193d394-347a-441d-8167-c4e6571f4ba8/0nzJ6WVrMk.lottie"
    loop
    autoplay
    style={{ width: "450px", height: "450px", zIndex:999 }}
  />
</div>

      {/* RIGHT FORM */}
      <div className="AuthRight">
        <h1>Welcome Back</h1>

        <input
          type="text"
          placeholder="Enter Mail"
          value={Mail}
          onChange={(e)=>setMail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={Lpassword}
          onChange={(e)=>setlpassword(e.target.value)}
        />

        <button onClick={Crack}>LOGIN</button>

        <div className="signup" onClick={()=>Navigate("/Sighup")}>
          Create Account
        </div>
      </div>

    </div>
  </div>
</>
);
}
 export {Login}