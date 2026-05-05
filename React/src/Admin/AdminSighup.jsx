import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./AdminSighup.css";
import { useNavigate } from "react-router-dom";

 function AdminSighup(){
   
    const navigate = useNavigate();

    const [AdminName,SetAdminName] = useState("")
    const [AdminPassword,SetAdminPassword] = useState("")
    const [AdminMail,SetAdminMail] = useState("")
    const [AdminNumber,SetAdminNumber] = useState(Number)
    const [AdminAddress,SetAdminAddress] = useState("")

    async function Adminsighupbtn(e) {
         e.preventDefault(); 
         const res = await fetch("https://new-eight-alpha-24.vercel.app/api/admin")
         const AdminData = await res.json()
       

     if(!AdminName.length >= 1 || !AdminPassword.length >= 1|| !AdminMail >= 1 || !AdminNumber >= 1 || !AdminAddress >= 1)
            return(toast.error("Enter yout Detail"))
        
    if(!AdminName.length >0)
        return(toast.error("Enter Your Full Name"))

     const PasswordRegex = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%&*()])[A-Za-z0-9!@#$%&*()]{8,}$/
    if(!PasswordRegex.test(AdminPassword))
        return(toast.error("Enter Strong Password"))

    const Admail = AdminData.find((data)=>{
       return( data.AdminMail === AdminMail)
    })
    if(Admail){
        return(toast.error("Admin Mail has Alredy Ragister "))
    }

    const EmailRegex = /^[a-zA-Z0-9][._]?[a-zA-Z0-9]*@gmail\.com$/;
    if(!EmailRegex.test(AdminMail))
        return(toast.error("Enter valid Gmail only"))


    if(AdminNumber.length !== 10)
        return(toast.error("Enter Valid Phone Number"))

    if(!AdminAddress.length >=1)
        return(toast.error("Enter your  Address"))

    try {

    const res = await fetch("https://new-eight-alpha-24.vercel.app/api/admin",{
        method :"POST",
        headers :{
            "Content-Type" :"application/json"
        },
        body: JSON.stringify({
        AdminName : AdminName,
        AdminPassword : AdminPassword,
        AdminMail : AdminMail,
        AdminPhone : AdminNumber,
        AdminAddress : AdminAddress
        })
    })
    if(res.ok){
        setTimeout(()=>{
              toast.success("Admin Data Saved");

         SetAdminName(" ")
        SetAdminPassword(" ")
        SetAdminMail(" ")
        SetAdminNumber(" ")
        SetAdminAddress(" ")
        window.location.reload("./AdminSighup.jsx")
            navigate("/AdminLogin")
        },1500)
    }else{
        toast.error("Try After Some Time");
    }
    } catch(error){
        toast.error("Faild Some network Ishu")
    }


}

    return(
        <>
        <div className="adminPage"> 
        <form onSubmit={Adminsighupbtn}>
        <Toaster/>
        <button className="AdminSighupClosebtn" onClick={()=>{navigate("/")}}>✖</button>
          <div className="admin-card">
          <h2 className="admin-title">Admin Signup </h2>
          
        <input type="text"
         placeholder="Name"
          className="admin-name"
           onChange={(e)=>{SetAdminName(e.target.value)}}
           />

        <input type="password"
         placeholder="Password" 
         className="admin-password" 
         onChange={(e)=>{SetAdminPassword(e.target.value)}}
         />

        <input type="text" 
        placeholder="Mail"
         className="admin-mail"
          onChange={(e)=>{SetAdminMail(e.target.value)}}
          />

        <input type="Number"
         placeholder="Number" 
         className="admin-number" 
         onChange={(e)=>{SetAdminNumber(e.target.value)}}
         />

        <input type="text" 
        placeholder="Address"
        className="admin-address"  
        onChange={(e)=>{SetAdminAddress(e.target.value)}}
        />
         <button className="AdminSighupbtn" type="submit">Creat Admin</button>
         
         </div>
         </form>
         </div>

        </>
    )
 }
 export{AdminSighup}