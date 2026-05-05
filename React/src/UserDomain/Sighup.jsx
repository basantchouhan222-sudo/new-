import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function SighupForm() {

  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [mail, setmail] = useState("");
  const [address, setaddress] = useState("");
  const Navigate = useNavigate()
 


  async function data(e) {
    e.preventDefault();
 const Time = new Date()
    if(!name){
      return(toast.error("Please Enter a Name "))
    }
  const Strongpassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%&*()])[A-Za-z\d!@#$%&*()]{8,}$/; 
    if (!Strongpassword.test(password)) {
  return toast.error("Password must be 8+ chars, number & special symbol required");
}
    if(phone.length !== 10){
      return(toast.error("Please Enter Phone NO. "))
    }
  const StrongMail = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*@gmail\.com$/;
   if (!StrongMail.test(mail)) {
  return toast.error("Please enter valid mail");
}
    if(!address.length >= 6){
      return(toast.error("Please Enter a address "))
    }
    try {
      const res = await fetch("https://new-eight-alpha-24.vercel.app/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Name: name,
          Password: password,
          Mail: mail,
          Phone: phone,
          Address: address,
          createdAt : Time
        })
      });
      if (res.ok) {
        toast.success("SIGHUP SUCCESSFULLY ");
        setname(""),setpassword(""),setaddress(""),setphone(""),setmail("")
        console.log(res)
        setTimeout(()=>{
          Navigate("/Login")
        },1000)
        
      } else {
        toast.error("Error ");
      }
    } catch (error) {
      toast.error("Failed ");
    }
  }

return (
<>
<Toaster/>

<div className="AuthPage">
  <div className="AuthCard">

    {/* CLOSE BUTTON */}
    <div className="crossLogin" onClick={()=>Navigate("/")}>✖</div>

    {/* LEFT ANIMATION (NEW ONE) */}
    <div className="AuthLeft">
      <span></span>

      <DotLottieReact
        src="https://lottie.host/148756ab-b00f-4520-b15f-61ef409aee9f/9AjCWqTrZq.lottie"
        loop
        autoplay
        style={{ width: "450px", height: "450px", zIndex:999 }}
      />
    </div>

    {/* RIGHT SIGNUP FORM */}
    <div className="AuthRight">
      <h1>Create Account</h1>

      <input type="text" placeholder="Name"
        value={name} onChange={(e)=>setname(e.target.value)} />

      <input type="password" placeholder="Password"
        value={password} onChange={(e)=>setpassword(e.target.value)} />

      <input type="text" placeholder="Phone"
        value={phone} onChange={(e)=>setphone(e.target.value)} />

      <input type="text" placeholder="Email"
        value={mail} onChange={(e)=>setmail(e.target.value)} />

      <input type="text" placeholder="Address"
        value={address} onChange={(e)=>setaddress(e.target.value)} />

      <button onClick={data}>SIGN UP</button>

      <div className="signup" onClick={()=>Navigate("/Login")}>
        Already have account? Login
      </div>
    </div>

  </div>
</div>
</>
);
}

export { SighupForm };