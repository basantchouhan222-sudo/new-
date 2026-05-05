import React from "react";
import "./AdminMain.css"
import { AdminDomainDetail } from "./AdminDomainDetail";
import { Outlet } from "react-router-dom";
function AdminDomainMain(){
    return(<>


     <div className="adminPage">
          <AdminDomainDetail/>
         <Outlet/>
     </div>
    </>)
}
export {AdminDomainMain}