import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Product() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  // const [sort, setSort] = useState("");
  // const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/test/getproducts?page=${page}&perPage=4`)
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
      <div className="d-flex justify-content-end my-3">
        <Link to={"/addproduct"}>
          <Button variant="primary">Add Product</Button>
        </Link>
      </div>
      <Row xs={1} md={4}>
        {products.map((product) => (
          <Col key={product.id}>
            <Card style={{ width: "16rem", height: "30rem" }}>
              <Card.Img variant="top" src={product.link} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <div className="flex row justify-content-start">
                  {/* <Button variant="secondary">+</Button>
                  <Card.Text>{product.quantity}</Card.Text>
                  <Button variant="light">-</Button> */}
                  <Button variant="primary">Add to cart</Button>
                  <Button variant="light">
                    <Link to={`/editproduct/${product.id}`}>Edit product</Link>
                  </Button>
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
