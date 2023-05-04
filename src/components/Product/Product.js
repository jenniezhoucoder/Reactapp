import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import AuthService from "../../services/auth.service";
import CartService from "../../services/cart.service";
import { Dropdown } from "react-bootstrap";

function Product({
  // currentUser,
  showAdminBoard,
  products,
  setProducts,
  handleAddToCart,
  page,
  setPage,
  maxPage,
  setMaxPage,
}) {
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

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <>
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

      <Row xs={1} md={3}>
        {products.map((product) => (
          <Col key={product._id}>
            <Card>
              <Card.Img variant="top" src={product.link} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <div className="flex row justify-content-start">
                  <Button
                    variant="primary"
                    onClick={() => handleAddToCart(product._id, 1)}
                  >
                    Add to cart
                  </Button>
                  {showAdminBoard && (
                    <Button variant="light">
                      <Link to={`/editproduct/${product.id}`}>
                        Edit product
                      </Link>
                    </Button>
                  )}
                </div>
              </Card.Body>
              <Card.Footer>
                <Link to={`/user/${product.id}`}>View Details</Link>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

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
}

export default Product;
