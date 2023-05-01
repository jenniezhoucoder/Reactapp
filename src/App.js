import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import axios from "axios";

import Button from "react-bootstrap/Button";

import AuthService from "./services/auth.service";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import BoardUser from "./components/BoardUser/BoardUser";
import BoardAdmin from "./components/BoardAdmin/BoardAdmin";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import CreateProduct from "./components/Product/CreateProduct";
import ProductDetail from "./components/Product/ProductDetail";
import EditProduct from "./components/Product/EditProduct";
import ShoppingCart from "./components/Cart/ShoppingCart";
import TempCart from "./components/Cart/TempCart";
import { useNavigate } from "react-router-dom";
import Product from "./components/Product/Product";

const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const user = AuthService.getCurrentUser();

  const [cart, setCart] = useState([]);
  // const curUser = AuthService.getCurrentUser();

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const handleAddToCart = async (productId, quantity) => {
    try {
      let response;
      //user login
      if (user) {
        const userId = user && user.id;
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
      console.log("productId" + productId);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    AuthService.logout();
  };

  const navigate = useNavigate();

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Management
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {/* {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )} */}
          </div>

          {/* <InputGroup className="w-50">
          <Form.Control aria-describedby="basic-addon2" />
          <Button variant="outline-secondary" id="button-addon2">
            <i className="bi bi-search"></i>
          </Button>
        </InputGroup> */}

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  Logout
                </a>
              </li>
              <Button
                variant="link"
                onClick={() => navigate(`/cart/${currentUser.id}`)}
              >
                <i className="bi bi-cart"></i>
              </Button>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  <i className="bi bi-person"></i>
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Register
                </Link>
              </li>

              {/* <Button variant="link" onClick={() => navigate("/temp_cart")}>
              <i className="bi bi-cart"></i>
            </Button> */}
              <li className="nav-item">
                <Link to={"/tempcart"} className="nav-link">
                  <i className="bi bi-cart"></i>
                </Link>
              </li>
            </div>
          )}
        </nav>
      </div>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/home"
            element={<Home handleAddToCart={handleAddToCart} />}
          />
          {/* <Route
            path="/home"
            element={<Product handleAddToCart={handleAddToCart} />}
          /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/user" element={<BoardUser />} /> */}
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/updatepassword" element={<ForgotPassword />} />
          <Route path="/addproduct" element={<CreateProduct />} />
          <Route path="/user/:id" element={<ProductDetail />} />
          <Route path="/editproduct/:id" element={<EditProduct />} />
          <Route path="/cart/:userId" element={<ShoppingCart />} />
          <Route path="/tempcart" element={<TempCart />} />
        </Routes>
      </div>

      <div>
        <footer className="text-center text-lg-start bg-dark text-muted">
          <section>
            <a className="btn btn-outline-light btn-floating m-1" role="button">
              <i className="bi bi-twitter"></i>
            </a>

            <a className="btn btn-outline-light btn-floating m-1" role="button">
              <i className="bi bi-facebook"></i>
            </a>

            <a className="btn btn-outline-light btn-floating m-1" role="button">
              <i className="bi bi-youtube"></i>
            </a>
          </section>
          <div className="text-center p-2">© 2023 Copyright: Reserved</div>
        </footer>
      </div>
    </>
  );
};

export default App;
