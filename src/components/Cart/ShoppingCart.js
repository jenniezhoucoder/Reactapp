import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import CartService from "../../services/cart.service";
import AuthService from "../../services/auth.service";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const { userId } = useParams();
  const user = AuthService.getCurrentUser();
  const username = user ? user.username : null;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await CartService.getCart(userId);
        setCart(response.data.products);
        setTotal(response.data.total);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
  }, [userId]);

  const handleRemoveToCart = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/user/${username}/cart`,
        { data: { productId } }
      );
      const updatedCart = response.data;
      setCart(updatedCart.products);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Modal.Header>
        <Modal.Title>Shopping Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cart && cart.length > 0 ? (
          <Container>
            {cart.map((item) => (
              <Row key={item._id}>
                <ItemList
                  id={userId}
                  name={item.product.name}
                  link={item.product.link}
                  price={item.product.price}
                  quantity={item.quantity}
                  productId={item.product._id}
                  onRemoveFromCart={handleRemoveToCart}
                />
              </Row>
            ))}
          </Container>
        ) : (
          <p>Your shopping cart is empty</p>
        )}

        <p>Apply Discount Code</p>
        <InputGroup className="mb-3">
          <Form.Control placeholder="20OFF" />
          <Button variant="outline-secondary" id="button-addon2">
            Apply
          </Button>
        </InputGroup>
        <h4>Subtotal: ${total}</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary">Continue to checkout</Button>
      </Modal.Footer>
    </>
  );
};

export default ShoppingCart;
