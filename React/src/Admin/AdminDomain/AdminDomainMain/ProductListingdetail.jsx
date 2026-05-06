
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductListingDetail.css";
import toast, { Toaster } from "react-hot-toast";


function ProductListDetail() {
const { idslug } = useParams();
const id = idslug.split("-")[0];   
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [editMode, setEditMode] = useState(true);
  const [formData, setFormData] = useState({});


  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    const res = await fetch(`https://new-eight-alpha-24.vercel.app/api/product/${id}`);
    const data = await res.json();
    setProduct(data.data|| data);
    setFormData(data.data || data);
  };

  // 🔹 Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 PATCH update
  const updateProduct = async () => {
    const res = await fetch(`https://new-eight-alpha-24.vercel.app/api/product/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    toast.success("Product Updated ");

    setProduct(data.data);
    setEditMode(false);
  };

  if (!product) return <h1 className="loading">Loading...</h1>;

  return (
    <div className="productDetailPage">
      <div className="productContainer">

        {/* LEFT SIDE IMAGES */}
        <div className="imageSection">
          {product.Photo.map((item ,index) => (
            <img key={index} src={item} alt="food" className="productImage" />
          ))}
        </div>
        
        <div className="infoSection">

       
          {editMode ? (
            <>
            <button className="closebtnforBack" onClick={()=>{navigate("/AdminDomainMain/Product-List")}}>X</button>
              <h1 className="productTitle">{product.Productname}</h1>
              <p>Category : {product.Category}</p>
              <p>Food Type : {product.Food}</p>
              <p className="productDesc">{product.Discription}</p>
              <h2 className="price">₹ {product.Price}</h2>
              <p>Stock : {product.Qty}</p>

              <button className="editBtn" onClick={() => setEditMode(false)}>
                Edit Product 
              </button>
               <Toaster/>
            </>
          ) : (
            <>
            <button className="closebtnforBack" onClick={()=>{navigate("/AdminDomainMain/Product-List")}}>X</button>

              <h2>Edit Product</h2>

              <input
                name="Productname"
                value={formData.Productname}
                onChange={handleChange}
                placeholder="Product Name"
              />

              <input
                name="Category"
                value={formData.Category}
                onChange={handleChange}
                placeholder="Category"
              />

              <input
                name="Food"
                value={formData.Food}
                onChange={handleChange}
                placeholder="Food Type"
              />

              <input
                name="Price"
                value={formData.Price}
                onChange={handleChange}
                placeholder="Price"
              />

              <input
                name="Qty"
                value={formData.Qty}
                onChange={handleChange}
                placeholder="Stock Qty"
              />

              <textarea
                name="Discription"
                value={formData.Discription}
                onChange={handleChange}
                placeholder="Description"
              />

              <div className="btnRow">
                <button className="saveBtn" onClick={updateProduct}>
                  Save Changes 
                </button>

                <button className="cancelBtn" onClick={() => setEditMode(false)}>
                  Cancel 
                </button>
              </div>
               <Toaster/>
            </>
          )}

        </div>
      </div>

    </div>
  );
}

export { ProductListDetail };