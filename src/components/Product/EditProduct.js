import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductService from "../../services/product.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const EditProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    ProductService.editProduct(id).then((response) => {
      setProduct(response.data);
    });
  }, [id]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    ProductService.updateProduct(id, product)
      .then(() => {
        alert("Product updated successfully");
      })
      .then(() => {
        navigate("/home");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        alert("Error adding product");
      });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container p-5">
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={product.name}
              onChange={(event) =>
                setProduct({ ...product, name: event.target.value })
              }
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Product Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={product.description}
              onChange={(event) =>
                setProduct({ ...product, description: event.target.value })
              }
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              className="form-control"
              id="category"
              name="category"
              value={product.category}
              onChange={(event) =>
                setProduct({ ...product, category: event.target.value })
              }
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              className="form-control"
              id="price"
              name="price"
              value={product.price}
              onChange={(event) =>
                setProduct({ ...product, price: event.target.value })
              }
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">In Stock Quantity</label>
            <input
              type="text"
              className="form-control"
              id="quantity"
              name="quantity"
              value={product.quantity}
              onChange={(event) =>
                setProduct({ ...product, quantity: event.target.value })
              }
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="link">Add Image Link</label>
            <input
              type="text"
              className="form-control"
              id="link"
              name="link"
              value={product.link}
              onChange={(event) =>
                setProduct({ ...product, link: event.target.value })
              }
              validations={[required]}
            />
          </div>
          <Button type="submit">Update Product</Button>
        </form>
      </div>
    </>
  );
};

export default EditProductPage;
