import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/test/user/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="p-4 flex row justify-content-center">
        <Card style={{ width: "30rem", height: "50rem" }}>
          <Card.Img variant="top" src={product.link} />

          <Card.Body>
            <Card.Title>{product.category}</Card.Title>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>${product.price}</Card.Text>
            <Card.Text>{product.description}</Card.Text>
            <Button variant="primary">Add to cart</Button>
            <Button variant="light">Edit product</Button>
            <Card.Text>quantity: {product.quantity}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default ProductDetail;
