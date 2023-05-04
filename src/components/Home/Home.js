import React, { useState, useEffect } from "react";
import Product from "../Product/Product";

import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";

import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Home = ({
  // currentUser,
  showAdminBoard,
  // cart,
  // setCart,
  handleAddToCart,
}) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/test/getproducts?page=${page}&perPage=6`)
      .then((response) => {
        setProducts(response.data.products);
        setMaxPage(response.data.maxPage);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [page]);

  return (
    <>
      <header className="jumbotron">
        <h3>Products</h3>
      </header>
      <Product
        // currentUser={currentUser}
        showAdminBoard={showAdminBoard}
        products={products}
        setProducts={setProducts}
        handleAddToCart={handleAddToCart}
        page={page}
        setPage={setPage}
        maxPage={maxPage}
        setMaxPage={setMaxPage}
      />
    </>
  );
};

export default Home;
