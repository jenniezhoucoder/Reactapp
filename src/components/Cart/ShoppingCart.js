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
import { connect } from "react-redux";
import * as cart from "../../redux/actions/cartAction";
import { useSelector } from "react-redux";

const ShoppingCart = ({ show, onHide }) => {
  // const products = JSON.parse(localStorage.getItem("cartItems")) || [];
  const products = useSelector((state) => state.cartReducer.cartItems);
  // const { products } = cart;
  useEffect(() => {}, [cart]);

  const calVal = (products) => {
    const total = products
      ?.map((item) => item.price * item.quantity)
      ?.reduce((total, num) => total + Math.round(num), 0);
    return total;
  };
  const total = calVal(products);

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {products && products.length > 0 ? (
            <Container>
              {products.map((product) => (
                <Row key={product.id}>
                  <ItemList product={product} />
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

// export default ShoppingCart;

const mapStateToProps = (state) => {
  return { cart: state.cartReducer };
};
// const mapStateToProps = (state) => {
//   return { cartItems: state.cartReducer.cartItems };
// };

export default connect(mapStateToProps, {
  updateCartAction: cart.updateCartAction,
  removeProductAction: cart.removeProductAction,
})(ShoppingCart);
