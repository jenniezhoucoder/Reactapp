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

const ShoppingCart = ({
  show,
  onHide,
  user,
  total,
  fetchCart,
  shoppingCart,
  handleRemoveToCart,
  handleUpdateTotalPrice,
}) => {
  const username = user ? user.username : null;
  const userId = user ? user.id : null;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (show && user && !shoppingCart.length && !isLoading) {
      setIsLoading(true);
      fetchCart().finally(() => {
        setIsLoading(false);
      });
    }
  }, [show, user, shoppingCart, isLoading, fetchCart]);

  const [shouldFetchCart, setShouldFetchCart] = useState(false);
  useEffect(() => {
    if (shouldFetchCart) {
      fetchCart();
      setShouldFetchCart(false);
    }
  }, [fetchCart, shouldFetchCart]);

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {shoppingCart && shoppingCart.length > 0 ? (
            <Container>
              {shoppingCart.map((item) => (
                <Row key={item._id}>
                  <ItemList
                    id={userId}
                    name={item.product.name}
                    link={item.product.link}
                    price={item.product.price}
                    quantity={item.quantity}
                    productId={item.product._id}
                    onRemoveFromCart={handleRemoveToCart}
                    updateTotalPrice={handleUpdateTotalPrice}
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
      </Modal>
    </>
  );
};

export default ShoppingCart;
