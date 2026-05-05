import React, { useEffect } from "react";
import { useState } from "react";
import "./UserDetail.css"
import { useNavigate } from "react-router-dom";


function UserDetail(){
    const [User, setUser] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        UserSerarch()
    },[])

   async function UserSerarch() { 
    const res = await fetch("https://new-eight-alpha-24.vercel.app/api/data")
    const UserData = await res.json()
    setUser(UserData)

   }
  
    return(<>
    
       <div className="container">
        <div className="header">
            <h2>User Details</h2>
       <div className="count">Total Users: {User.length}</div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>

        <tbody>
          {User.map((user) => (
            <tr key={user._id}
            onClick={()=>{navigate(`/AdminDomainMain/User-Detail/${user._id}`)}}>
              <td>{user.Name}</td>
              <td>{user.Mail}</td>
              <td>{user.Phone}</td>
              <td>{user.Address}</td>
            </tr>
          ))}
        </tbody>
       
      </table>
    </div>
    
    </>
    )
     
}
export {UserDetail}
