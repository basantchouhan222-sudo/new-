import React, { useState } from "react";
import {toast ,Toaster} from "react-hot-toast";
import "./AdminProductList.css"
import { useNavigate } from "react-router-dom";


function AdminProductList(){
   const navigate = useNavigate()

    const [productname ,setproduct] = useState("")
    const [category ,setcategory] = useState("")
    const [Discription ,setDiscription] =useState("")
    const [Qty ,setQty] = useState("")
    const [AddPhoto ,setAddphoto] = useState("")
    const [photo,setphoto] = useState([])
    const [price , setprice ] = useState("")
    const [food ,setfood] = useState("")



    const Addsomephoto = ()=>{
        if(!AddPhoto) return;

        if(photo.length >= 5){
            return toast.error("Maximum 5 photos allowed");
        }

        setphoto([...photo, AddPhoto])
        setAddphoto("")

    }

    
    async function ProuductaListing(){
       
        const Time = new Date().toISOString()

       if(
           !productname &&
           !category &&
           !Discription &&
           !Qty &&
           !price &&
           !food &&
            photo.length === 0 
           ){
            return toast.error("Enter all Detail");
         }
        if(productname.length < 3)
            return toast.error("Enter valid product name")

        if(category.length < 3)
            return toast.error("Enter category")

        if(Discription.length < 10)
            return toast.error("Enter description")

        if(Qty.length < 1)
            return toast.error("Enter quantity")

        if(price < 100)
            return toast.error("Price ₹100 se kam nahi")

        if(food.length < 1)
            return toast.error("Select category")

        if(photo.length === 0)
            return toast.error("Add at least 1 photo")

try{
    const res = await fetch("https://new-eight-alpha-24.vercel.app/api/product",{
        method :"POST" ,
        headers :{
            "Content-Type" :"application/json"
        },
        body : JSON.stringify({
            Productname : productname,
            Category : category,
            Discription : Discription,
            Qty : Qty,
            Photo : photo,
            Price : price,
            Food : food,
            slug : productname,
            createdAt : Time 
        })
    })
    if(res.ok){
          toast.success("Product Added Successfully ")
          setproduct(""),setcategory(""),setDiscription(""),setQty("")
          setphoto([]),setprice(""),setfood("")
    }else{
        toast.error("Error")
    }
    }catch(error){
        toast.error("Failed")
    }
        
    }

    return(
    <>
    <Toaster/>
  
    <div className="AdminProductListBox">
      <button onClick={()=>{navigate("/AdminDomainMain/Product-List")}} className="CrossForBack">X</button>
      <div className="AdminProductListBox2">

        <input placeholder="PRODUCT NAME"
          value={productname}
          onChange={(e)=>setproduct(e.target.value)} />

        <input placeholder="PRODUCT CATEGORY"
          value={category}
          onChange={(e)=>setcategory(e.target.value)} />

        <input placeholder="PRODUCT QTY"
          value={Qty}
          onChange={(e)=>setQty(e.target.value)} />

        <input placeholder="PRODUCT DESCRIPTION"
          value={Discription}
          onChange={(e)=>setDiscription(e.target.value)} />

        <input placeholder="PRODUCT PRICE"
          value={price}
          onChange={(e)=>setprice(e.target.value)} />

        {/* PHOTO ROW */}
        <div className="photoRow">
          <input
            placeholder="PRODUCT PHOTO LINK"
            value={AddPhoto}
            onChange={(e)=>setAddphoto(e.target.value)}
            className="photoInput"
          />

          <button onClick={Addsomephoto} className="UploadPhotoBtn">
            Upload
          </button>
        </div>

        <label className="Food-select">Choose Food Category</label>
        <select value={food}
          onChange={(e)=>setfood(e.target.value)}
          className="SetFood">

          <option value="">---Select---</option>
          <option value="Veg">Veg</option>
          <option value="NonVeg">NonVeg</option>
          <option value="Both">Both</option>
        </select>

        <button onClick={ProuductaListing} className="addProductBtn">
          Add Product
        </button>

      </div>
    </div>
    </>
    )
}

export {AdminProductList}