import AuthService from "../../services/auth.service";
import React, { useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  addToCartAction,
  updateCartAction,
} from "../../redux/actions/cartAction";
import CartQtyButton from "../../common/quantitybutton";
import { connect } from "react-redux";
import * as cart from "../../redux/actions/cartAction";

const ProductCard = ({
  product,
  addToCartAction,
  updateCartAction,
  cart,
  showAdminBoard,
}) => {
  useEffect(() => {}, [cart]);
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartQuantity =
    cartItems?.filter((item) => item.id === product?._id)[0]?.quantity || 0;

  const handleAddToCart = (product) => {
    const productCart = {
      id: product?._id,
      name: product?.name,
      price: product?.price,
      quantity: 1,
      link: product?.link,
    };
    addToCartAction(productCart);
  };

  const handleUpdateBtn = (action, product) => {
    const updatedProduct = {
      id: product._id,
      link: product.link,
      name: product.name,
      price: product.price,
      quantity: action === "plus" ? cartQuantity + 1 : cartQuantity - 1,
    };

    if (updatedProduct.quantity < 1) return;

    if (cartItems?.filter((item) => item.id === product?._id).length === 0)
      return addToCartAction(updatedProduct);

    updateCartAction(updatedProduct);
  };
  return (
    <>
      <Card>
        <Card.Img variant="top" src={product.link} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>${product.price}</Card.Text>
          <Row>
            {cartQuantity < 1 ? (
              <Button
                variant="primary"
                type="button"
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </Button>
            ) : (
              // </Row>
              // <Row>
              <CartQtyButton
                product={product}
                cartQuantity={cartQuantity}
                handleUpdateBtn={handleUpdateBtn}
              />
              // </Row>
            )}
            {/* <Row> */}
            {showAdminBoard && (
              <Button variant="light">
                <Link to={`/editproduct/${product.id}`}>Edit product</Link>
              </Button>
            )}
          </Row>
        </Card.Body>
        <Card.Footer>
          <Link to={`/user/${product.id}`}>View Details</Link>
        </Card.Footer>
      </Card>
    </>
  );
};

const mapStateToProps = (state) => {
  return { cart: state.cartReducer };
};

export default connect(mapStateToProps, {
  addToCartAction: cart.addToCartAction,
  updateCartAction: cart.updateCartAction,
})(ProductCard);
