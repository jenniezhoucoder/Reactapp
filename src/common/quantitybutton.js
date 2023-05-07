import { Button, Col, Row } from "react-bootstrap";

const QuantityButton = ({ cartQuantity, handleUpdateBtn, product }) => {
  return (
    <>
      <Col>
        <Row>
          <Button
            variant="light"
            onClick={() => handleUpdateBtn("minus", product)}
          >
            <i className="bi bi-dash"></i>
          </Button>
          <span> {cartQuantity || 1}</span>
          <Button
            variant="light"
            onClick={() => handleUpdateBtn("plus", product)}
          >
            <i className="bi bi-plus"></i>
          </Button>
        </Row>
      </Col>
    </>
  );
};

export default QuantityButton;
