import { Button, Col } from "react-bootstrap";

const CartItem = ({
  name,
  link,
  price,
  quantity,
  productId,
  onRemoveFromCart,
}) => {
  const handleRemoveFromCart = async () => {
    try {
      await onRemoveFromCart(productId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Col>
        <img src={link} style={{ maxWidth: "180px" }} />
      </Col>
      <Col>
        <h4>{name}</h4>
        <p>{quantity}</p>
      </Col>
      <Col>
        <h5>${price}</h5>
        <Button variant="link" onClick={handleRemoveFromCart}>
          Remove
        </Button>
      </Col>
    </>
  );
};

export default CartItem;
