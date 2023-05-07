import React, { useState, useEffect } from "react";
import Product from "../Product/Product";

import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
import ProductService from "../../services/product.service";

import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Dropdown } from "react-bootstrap";

const Home = ({ showAdminBoard }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  // const showAdminBoard = AuthService.isAdmin();

  useEffect(() => {
    ProductService.getProducts(page)
      .then((response) => {
        setProducts(response.data.products);
        setMaxPage(response.data.maxPage);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [page]);

  const sortByCreatedAtAsc = () => {
    const sortedProducts = [...products].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    setProducts(sortedProducts);
  };

  const sortByPriceAsc = () => {
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);
    setProducts(sortedProducts);
  };

  const sortByPriceDes = () => {
    const sortedProducts = [...products].sort((a, b) => b.price - a.price);
    setProducts(sortedProducts);
  };

  return (
    <>
      <header className="jumbotron">
        <h3>Products</h3>
      </header>
      {showAdminBoard && (
        <div className="d-flex justify-content-end my-3">
          <Link to={"/addproduct"}>
            <Button variant="primary">Add Product</Button>
          </Link>
        </div>
      )}

      <div className="d-flex justify-content-end my-3">
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            Sort By
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={sortByCreatedAtAsc}>
              Latest Add
            </Dropdown.Item>
            <Dropdown.Item onClick={sortByPriceAsc}>
              Price: Low to High
            </Dropdown.Item>
            <Dropdown.Item onClick={sortByPriceDes}>
              Price: High to Low
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Product
        products={products}
        setProducts={setProducts}
        showAdminBoard={showAdminBoard}
      />

      <div className="d-flex justify-content-end my-3">
        {page > 1 && (
          <Button
            variant="link"
            className="me-2"
            onClick={() => setPage(page - 1)}
          >
            Prev
          </Button>
        )}
        {page < maxPage && (
          <Button variant="link" onClick={() => setPage(page + 1)}>
            Next
          </Button>
        )}
      </div>
    </>
  );
};

export default Home;
