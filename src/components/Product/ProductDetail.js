import Card from "react-bootstrap/Card";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../../services/auth.service";
import ProductService from "../../services/product.service";

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    ProductService.getProductDetail(id)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await AuthService.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCurrentUser();
  }, []);

  const handleAddToCart = async (productId, quantity) => {
    try {
      let response;
      //user login
      if (currentUser) {
        const userId = currentUser && currentUser.id;
        response = await axios.post(
          `http://localhost:8080/api/user/${userId}/cart`,
          {
            productId: productId,
            quantity: quantity,
          }
        );
      } else {
        //user not login
        const cartItemsFromLocalStorage = JSON.parse(
          localStorage.getItem("cart") || "[]"
        );
        const existingCartItem = cartItemsFromLocalStorage.find(
          (item) => item.productId === productId
        );

        if (existingCartItem) {
          existingCartItem.quantity += 1;
        } else {
          const newCartItem = {
            productId: productId,
            quantity: 1,
          };
          cartItemsFromLocalStorage.push(newCartItem);
        }

        localStorage.setItem("cart", JSON.stringify(cartItemsFromLocalStorage));
        setCart(cartItemsFromLocalStorage);
      }
      console.log(productId);
    } catch (err) {
      console.error(err);
    }
  };
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="p-5 flex row justify-content-center">
        <Card>
          <Row>
            <Col md={4}>
              <Card.Img variant="top" src={product.link} />
            </Col>
            <Col>
              <Card.Body>
                <Card.Title>{product.category}</Card.Title>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <Card.Text>{product.description}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleAddToCart(product._id, 1)}
                >
                  Add to cart
                </Button>
                {/* <Button variant="light">
              <Link to={`/editproduct/${product.id}`}>Edit product</Link>
            </Button> */}
                <Card.Text style={{ color: "grey" }}>
                  In Stock: {product.quantity}
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}

export default ProductDetail;
