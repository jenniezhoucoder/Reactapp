import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const TempCart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemIds = cartItems.map((item) => item.productId);
    const cartQuantities = cartItems.map((item) => item.quantity);

    if (cartItems.length > 0) {
      axios
        .get(
          `http://localhost:8080/api/tempcart?productIds=${cartItemIds.join(
            ","
          )}&quantities=${cartQuantities.join(",")}`
        )
        .then((res) => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const removeProduct = (index) => {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    const updatedCartItems = cartItems.filter((item, i) => i !== index);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    setProducts(updatedCartItems);
  };

  const getTotal = () => {
    let total = 0;
    products.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total.toFixed(2);
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Shopping Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <p>Loading...</p>
        ) : products.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            {products.map((product, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <img src={product.link} style={{ maxWidth: "180px" }} />
                </div>
                <div>
                  <h3>{product.name}</h3>
                  <p>Quantity: {product.quantity}</p>
                </div>
                <div>
                  <h4>${product.price}</h4>
                  <Button variant="light" onClick={() => removeProduct(index)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        <p>Apply Discount Code</p>
        <InputGroup className="mb-3">
          <Form.Control placeholder="20OFF" />
          <Button variant="outline-secondary" id="button-addon2">
            Apply
          </Button>
        </InputGroup>
      </Modal.Body>
      <h4>Total: ${getTotal()}</h4>
      <Modal.Footer>
        <Button variant="primary">Continue to checkout</Button>
      </Modal.Footer>
    </>
  );
};

export default TempCart;
