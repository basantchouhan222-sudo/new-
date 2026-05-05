import React, { useState } from "react";
import { Banner } from "./Banner";
import { WebHeader } from "./WebHeader";
import "./WebMain.css"
import toast, { Toaster } from "react-hot-toast";
import {Footer} from "./Footer";

function Main() {
  return (
    <>
       <Toaster position="top-center" reverseOrder={false} />
       <WebHeader/>
      <div className="hero">
         <Banner />
      </div> 
     <Footer/>
     
    </>
  );
}

export { Main }