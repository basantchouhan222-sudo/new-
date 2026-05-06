import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./ProductListingDetail.css";

function ProductListDetail() {
  const { idslug } = useParams();
  const id = idslug.split("-")[0];
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [editMode, setEditMode] = useState(true);
  const [formData, setFormData] = useState({});

  // 🔹 GET PRODUCT
  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    const res = await fetch(
      `https://new-eight-alpha-24.vercel.app/api/product/${id}`
    );
    const data = await res.json();
    const item = data.data || data;
    setProduct(item);
    setFormData(item);
  };

  // 🔹 NORMAL INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 PHOTO INPUT CHANGE (IMPORTANT ⭐)
  const handlePhotoChange = (index, value) => {
    const newPhotos = [...formData.Photo];
    newPhotos[index] = value;

    setFormData({
      ...formData,
      Photo: newPhotos,
    });
  };

  // 🔹 UPDATE PRODUCT
  const updateProduct = async () => {
    // ⭐ VALIDATION
    if (!formData.Photo || formData.Photo.length < 5) {
      toast.error("Minimum 5 photos required");
      return;
    }

    const res = await fetch(
      `https://new-eight-alpha-24.vercel.app/api/product/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    const data = await res.json();
    toast.success("Product Updated");
    setProduct(data.data);
    setEditMode(true);
  };

  if (!product) return <h1 className="loading">Loading...</h1>;

  return (
    <div className="productDetailPage">
      <div className="productContainer">
        
        {/* LEFT SIDE IMAGES */}
        <div className="imageSection">
          {product.Photo.map((img, i) => (
            <img key={i} src={img} alt="food" className="productImage" />
          ))}
        </div>

        {/* RIGHT SIDE INFO */}
        <div className="infoSection">

          <button
            className="closebtnforBack"
            onClick={() => navigate("/AdminDomainMain/Product-List")}
          >
            X
          </button>

          {editMode ? (
            <>
              <h1>{product.Productname}</h1>
              <p>Category : {product.Category}</p>
              <p>Food Type : {product.Food}</p>
              <p>{product.Discription}</p>
              <h2>₹ {product.Price}</h2>
              <p>Stock : {product.Qty}</p>

              <button className="editBtn" onClick={() => setEditMode(false)}>
                Edit Product
              </button>
            </>
          ) : (
            <>
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
                placeholder="Stock"
              />

              <textarea
                name="Discription"
                value={formData.Discription}
                onChange={handleChange}
                placeholder="Description"
              />

              {/* ⭐ PHOTO EDIT SECTION */}
              <h3>Product Photos (Min 5)</h3>
<h3>Product Photos</h3>

{formData.Photo?.map((photo, index) => (
  <input
    key={index}
    type="text"
    value={photo}
    placeholder={`Photo URL ${index + 1}`}
    onChange={(e) => handlePhotoChange(index, e.target.value)}
  />
))}

              <div className="btnRow">
                <button className="saveBtn" onClick={updateProduct}>
                  Save Changes
                </button>

                <button
                  className="cancelBtn"
                  onClick={() => setEditMode(true)}
                >
                  Cancel
                </button>
              </div>
            </>
          )}

          <Toaster />
        </div>
      </div>
    </div>
  );
}

export { ProductListDetail };