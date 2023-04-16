import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Product() {
  return (
    <>
      <Card style={{ width: "18rem" }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title>Product name</Card.Title>
          <Card.Text>Price and description of the product</Card.Text>
          <Button variant="light">+</Button>
          $399
          <Button variant="light">-</Button>
          <Button variant="primary">edit</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: "18rem" }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title>Product name</Card.Title>
          <Card.Text>Price and description of the product</Card.Text>
          <Button variant="light">+</Button>
          $399
          <Button variant="light">-</Button>
          <Button variant="primary">edit</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default Product;
