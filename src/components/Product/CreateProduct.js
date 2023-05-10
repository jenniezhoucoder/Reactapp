import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductService from "../../services/product.service";
import { Button, Row } from "react-bootstrap";
import { Dropdown, DropdownButton } from "react-bootstrap";

const categories = ["phone", "watch", "TV", "headphones", "Pad"];

const CreateProduct = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [link, setLink] = useState("");

  const [errorMessage, setErrorMessages] = useState([]);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  // const handlePreview = () => {
  //   setLink(document.getElementById("link").value);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();

    ProductService.addProduct(
      id,
      name,
      description,
      category,
      price,
      quantity,
      link
    )
      .then(() => {
        alert("Product added successfully");
        setId("");
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setQuantity("");
        setLink("");
      })
      .then(() => {
        navigate("/home");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        // alert("Error adding product");
        const errorResponse = error.response;
        if (errorResponse && errorResponse.data && errorResponse.data.errors) {
          setErrorMessages(errorResponse.data.errors.map((error) => error.msg));
        }
      });
  };

  return (
    <>
      <div className="container p-5">
        <form className="p-5" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Product Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            {/* <input
              type="text"
              className="form-control"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            /> */}
            <DropdownButton
              id="dropdown-category"
              title={category ? category : "Select category"}
            >
              {categories.map((category) => (
                <Dropdown.Item
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              className="form-control"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">In Stock Quantity</label>
            <input
              type="text"
              className="form-control"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="link">Add Image Link</label>
            <input
              type="text"
              className="form-control"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />

            {/* <div className="input-group-append">
              <Button variant="link" onClick={handlePreview}>
                Preview
              </Button>
            </div> */}
          </div>
          <Row>
            {link && (
              <img
                src={link}
                alt="Product preview"
                style={{ minWidth: "200px" }}
              />
            )}
          </Row>

          <Button type="submit">Add Product</Button>

          {errorMessage.map((error, index) => (
            <div key={index} className="alert alert-danger" role="alert">
              {error}
            </div>
          ))}
        </form>
      </div>
    </>
  );
};

export default CreateProduct;
