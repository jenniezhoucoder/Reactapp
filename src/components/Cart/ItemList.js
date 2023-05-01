import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import axios from "axios";

const CartItem = ({
  id,
  name,
  link,
  price,
  quantity,
  productId,
  onRemoveFromCart,
  updateTotalPrice,
}) => {
  const [newQuantity, setNewQuantity] = useState(quantity);

  useEffect(() => {
    setNewQuantity(quantity);
  }, [quantity]);

  const updateCartItemQuantity = async (id, productId, quantity) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/user/cart/${id}/cart`,
        {
          productId,
          quantity,
        }
      );
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  const handleInc = async (productId, newQuantity) => {
    try {
      await updateCartItemQuantity(id, productId, newQuantity + 1);
      setNewQuantity(newQuantity + 1);
      updateTotalPrice(price);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDes = async (productId, newQuantity) => {
    try {
      if (newQuantity <= 1) {
        setNewQuantity(1);
        return;
      }
      await updateCartItemQuantity(id, productId, newQuantity - 1);
      setNewQuantity(newQuantity - 1);
      updateTotalPrice(-price);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      await onRemoveFromCart(productId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Col>
        <img src={link} style={{ maxWidth: "180px" }} />
      </Col>
      <Col>
        <h4>{name}</h4>
        <Row>
          <Button
            variant="light"
            onClick={() => handleDes(productId, newQuantity)}
          >
            -
          </Button>
          <p>{newQuantity}</p>
          <Button
            variant="light"
            onClick={() => handleInc(productId, newQuantity)}
          >
            +
          </Button>
        </Row>
      </Col>
      <Col>
        <h5>${price}</h5>
        <Button variant="link" onClick={handleRemoveFromCart}>
          Remove
        </Button>
      </Col>
    </>
  );
};

export default CartItem;
