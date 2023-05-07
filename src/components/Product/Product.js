import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import AuthService from "../../services/auth.service";
import CartService from "../../services/cart.service";
import ProductCard from "./ProductCard";

function Product({ products, showAdminBoard }) {
  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Row xs={1} md={3}>
        {products.map((product) => (
          <Col key={product._id}>
            <ProductCard product={product} showAdminBoard={showAdminBoard} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Product;
