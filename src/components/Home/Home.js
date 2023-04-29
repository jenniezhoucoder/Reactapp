import React, { useState, useEffect } from "react";
import Product from "../Product/Product";

import UserService from "../../services/user.service";

import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Home = () => {
  // const [content, setContent] = useState("");
  // const [isAdmin, setIsAdmin] = useState(false);

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/test/getproducts?page=${page}&perPage=8`)
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
      <Product />
    </>
  );
};

export default Home;
