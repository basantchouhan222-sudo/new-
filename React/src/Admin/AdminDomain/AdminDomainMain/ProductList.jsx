import React, { useEffect, useState } from "react";
import "./ProductList.css";
import { useNavigate, Outlet } from "react-router-dom";


function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("https://new-eight-alpha-24.vercel.app/api/product");
    const data = await res.json();
    setProducts(data.data || data);
  };

 //https://new-eight-alpha-24.vercel.app/
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://new-eight-alpha-24.vercel.app/api/product/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      console.log(data);

      setProducts(prev => prev.filter(item => item._id !== id));

    } catch (err) {
      console.log("Delete Not Working", err);
    }
  };

  return (
    <div className="admin-page">

      
      <button
        className="floating-create-btn"
        onClick={() => navigate("/AdminDomainMain/Add-Product")}
      >
        + Add Product
      </button>

      <div className="admin-header">
        <h1>All Products</h1>
        <span className="product-count">
          Total : {products.length}
        </span>
      </div>

      <div className="table-wrapper">
        <table className="product-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Qty</th>
              <th>Description</th>
              <th>Price</th>
              <th>Photo</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr
                key={item._id}
                className="row-animate"
                onClick={() => navigate(`/AdminDomainMain/Product-List/${item._id}-${item.slug}`)}
              >
                <td>{item.Productname}</td>
                <td>{item.Category}</td>
                <td>{item.Qty}</td>
                <td>{item.Discription}</td>
                <td>₹ {item.Price}</td>
                <td>
                  <img
                    src={item.Photo[0]}
                    alt="food"
                    className="food-img"
                  />
                </td>
                <td>{item.Food}</td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      deleteProduct(item._id);
                    }}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      <Outlet />
    </div>
  );
}

export { ProductList };