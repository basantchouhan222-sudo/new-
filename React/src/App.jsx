import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main} from "./Home/WebMain";
import { AdminSighup } from "./Admin/AdminSighup";
import { ABOUT }from "./Home/WebAbout/ABOUT"
import { Login } from "./UserDomain/LoginPage";
import { SighupForm } from "./UserDomain/Sighup";
import { AdminLogin } from "./Admin/AdminLogin";
import { AdminDomainMain } from "./Admin/AdminDomain/AdminDomainMain";
import { ProductList } from "./Admin/AdminDomain/AdminDomainMain/ProductList";
import { UserDetail } from "./Admin/AdminDomain/AdminDomainMain/UserDetail";
import { AdminDomainBanner } from "./Admin/AdminDomain/AdminDomainBanner";
import { CONTACT } from "./Home/WebAbout/CONTACT";
import { ORDER } from "./Home/WebAbout/ORDER";
import { DISHES } from "./Home/WebAbout/DISHES";
import { AdminProductList } from "./Admin/AdminDomain/AdminDomainMain/AdminProductList";
import { ProductListDetail } from "./Admin/AdminDomain/AdminDomainMain/ProductListingdetail";
import { UserMoreDetail } from "./Admin/AdminDomain/AdminDomainMain/UserMoreDetail";
import { ProductOrder } from "./Home/WebAbout/OrderProduct";
import { FOODsearch } from "./Home/WebAbout/FOODsearch";
import CartPage from "./context/CartPage";
import { BuyPoduct } from "./Home/WebAbout/BUYProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/admin" element={<AdminSighup />} />
        <Route path="/Login" element = {<Login/>}/>
        <Route path="/Sighup" element = {<SighupForm/>}/>
        <Route path="/About" element = {<ABOUT/>}/>
        <Route path="/Contact" element = {<CONTACT/>}/>
        <Route path="/Order" element = {<ORDER/>}/>
        <Route path="Order/:idslug" element = {<ProductOrder/>}/>
        <Route path="/Food" element = {<DISHES/>}/>
        <Route path="/Food/:idslug"element = {<FOODsearch/>}/>
        <Route path="/AdminLogin" element = {<AdminLogin/>}/>
        <Route path="/Cart" element={<CartPage/>}/>
        <Route path="/BuyOrder" element = {<BuyPoduct/>}/>

        <Route
        path="/AdminDomainMain"
         element = {<AdminDomainMain/>}>
           <Route index element={<AdminDomainBanner/>}/>

        <Route path ="Product-List" element = {<ProductList/>}/>
        <Route path= "Product-List/:idslug" element = {<ProductListDetail/>}/>
         <Route path="Add-Product" element={<AdminProductList/>}/>

        <Route path = "User-Detail" element = {<UserDetail/>}/> 
        <Route path="User-Detail/:id" element = {<UserMoreDetail/>}/>
           </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;