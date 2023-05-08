import Card from "react-bootstrap/Card";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../../services/auth.service";
import ProductService from "../../services/product.service";
import CartQtyButton from "../../common/quantitybutton";
import {
  addToCartAction,
  updateCartAction,
} from "../../redux/actions/cartAction";
import * as cart from "../../redux/actions/cartAction";
import { connect } from "react-redux";
import { useSelector } from "react-redux";

function ProductDetail({
  addToCartAction,
  updateCartAction,
  cart,
  showAdminBoard,
}) {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  useEffect(() => {}, [cart]);
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartQuantity =
    cartItems?.filter((item) => item.id === product?._id)[0]?.quantity || 1;

  useEffect(() => {
    ProductService.getProductDetail(id)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleAddToCart = (product) => {
    const productCart = {
      id: product?._id,
      name: product?.name,
      price: product?.price,
      quantity: cartQuantity,
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

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="p-5 flex row justify-content-center">
        <Card style={{ minHeight: "600px" }}>
          <Row>
            <Col md={4}>
              <Card.Img variant="top" src={product.link} />
            </Col>
            <Col>
              <Card.Body>
                <Card.Title>{product.category}</Card.Title>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <Card.Text>{product.description}</Card.Text>
                <CartQtyButton
                  product={product}
                  cartQuantity={cartQuantity}
                  handleUpdateBtn={handleUpdateBtn}
                />
                <Button variant="primary" onClick={handleAddToCart}>
                  Add to cart
                </Button>
                {showAdminBoard && (
                  <Button variant="light">
                    <Link to={`/editproduct/${product.id}`}>Edit product</Link>
                  </Button>
                )}

                <Card.Text style={{ color: "grey" }}>
                  In Stock: {product.quantity}
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}

// export default ProductDetail;
const mapStateToProps = (state) => {
  return { cart: state.cartReducer };
};

export default connect(mapStateToProps, { addToCartAction, updateCartAction })(
  ProductDetail
);
