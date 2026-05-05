import React, { useEffect, useState } from "react";
import "./UsermoreDetail.css"
import { useNavigate, useParams } from "react-router-dom";
function UserMoreDetail(){
    const [User,SetUserdata] = useState(null)
    const {id} = useParams()
    const navigate = useNavigate()


   const  UserDetail = async ()=>{
    const res = await fetch(`http://localhost:4000/api/datas/${id}`);
    const UserDetail = await res.json()
    SetUserdata(UserDetail.data)  
   }

       useEffect(()=>{
        UserDetail();
    },[]);
   console.log(User)

if(!User) return
<div className="LoadingBox">
  <h1 className="loader">Loading...</h1>
</div>
    return(<>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap" rel="stylesheet"/>
<div className="MainUserbox">
  <div className="MainUserBox2">
        <button className="ClosebtnForBack" onClick={()=>{navigate("/AdminDomainMain/User-Detail")}}>X</button>


    <h1>{User?.Name}</h1>

    <h2>Contact Information</h2>
    <p>📧 Email : {User?.Mail}</p>
    <p>📞 Phone : {User?.Phone}</p>

    <h2>Address</h2>
    <p>📍 {User?.Address}</p>

  </div>
</div>





    </>)
}
export{UserMoreDetail}