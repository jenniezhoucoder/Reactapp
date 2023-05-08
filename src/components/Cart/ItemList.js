import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import CartService from "../../services/cart.service";
import { connect } from "react-redux";
import * as cart from "../../redux/actions/cartAction";
import CartQtyButton from "../../common/quantitybutton";

const ItemList = ({ product, updateCartAction, removeProductAction }) => {
  useEffect(() => {}, [cart]);
  const handleUpdateBtn = (action, product) => {
    const updatedProduct = {
      id: product.id,
      link: product.link,
      name: product.name,
      price: product.price,
      quantity: action === "plus" ? product.quantity + 1 : product.quantity - 1,
    };

    if (updatedProduct.quantity > 0) return updateCartAction(updatedProduct);
    if (updatedProduct.quantity < 1)
      // return removeProductAction(updatedProduct.id);
      return;
  };

  return (
    <>
      <Col>
        <img src={product.link} style={{ maxWidth: "180px" }} />
      </Col>
      <Col>
        <h4>{product.name}</h4>
        <CartQtyButton
          product={product}
          cartQuantity={product.quantity}
          handleUpdateBtn={handleUpdateBtn}
        />
      </Col>
      <Col>
        <h5>${product.price}</h5>
        <Button
          variant="link"
          type="button"
          onClick={() => removeProductAction(product)}
        >
          Remove
        </Button>
      </Col>
    </>
  );
};

const mapStateToProps = (state) => {
  return { cart: state.cartReducer };
};

export default connect(mapStateToProps, {
  updateCartAction: cart.updateCartAction,
  removeProductAction: cart.removeProductAction,
})(ItemList);
