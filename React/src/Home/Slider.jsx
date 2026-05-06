import React, { useEffect, useState } from "react";
import  toast, { Toaster }  from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Slider({ cartbtn, close}) {
 const navigate = useNavigate();
 const [UserLog,setUserLog] = useState("")
 const [UserData ,setUserData] = useState("")

 const AdminOption = ()=>{  
  const AdminDeshboard = JSON.parse(localStorage.getItem("admin")) 
    if(AdminDeshboard){
      navigate("/AdminDomainMain")
    }else{
      navigate("/AdminLogin")
    }
  }
   useEffect(()=>{
   User()
     },[])
  const User =()=>{

  const UserLogin = JSON.parse(localStorage.getItem("User"))
  if(UserLogin){
    setUserLog(UserLogin?.Name?.[0].toUpperCase() || "")
    setUserData(UserLogin.Name || "")
  }

  }
    function logoutbtn(){
      localStorage.removeItem("User")
     toast.success("LOGOUT")
      setUserLog("")
      setTimeout(()=>{
        close()
      })
    }

    return (
      <>
    <div className={cartbtn}>
    <div className="Loggercontent">
      <p>WELCOME</p>
  <div className="LogginLogo" onClick={()=>{navigate("/Login/User-DetailMore")}}>{UserLog.length === 1 ? UserLog : " "} </div>
  <p>{UserData}</p>
<button onClick={()=>{logoutbtn()}} className="LogOutbtn" >LOG OUT</button>
</div>
      {/* CLOSE BUTTON */}
      <button className="close" onClick={close}>
        ✖
      </button>
       {/* <button
       className="InSliderAdminForOpen" 
       onClick={()=>{navigate("/admin");
       close();
       }}> Admin</button> */}
       <button onClick ={AdminOption}>Admin </button>


    </div>
    </>
  );
}

export { Slider };