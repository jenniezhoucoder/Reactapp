import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import axios from "axios";

import Button from "react-bootstrap/Button";

import AuthService from "./services/auth.service";
import CartService from "./services/cart.service";

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
import Footer from "./common/footer";
import { useSelector } from "react-redux";

const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const user = await AuthService.getCurrentUser();
      if (user) {
        setCurrentUser(user);
        setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      }
    }
    fetchData();
  }, []);

  // const cartItems = useSelector((state) => state.cartReducer.cartItems);
  // console.log(cartItems);

  // const calVal = (cartItems) => {
  //   if (!Array.isArray(cartItems)) {
  //     return 0;
  //   }
  //   const totalPrice = cartItems.reduce(
  //     (total, item) => total + item.price * item.quantity,
  //     0
  //   );
  //   return totalPrice.toFixed(2);
  // };
  // const totalPrice = calVal(cartItems);
  // console.log(totalPrice);

  const logOut = () => {
    AuthService.logout();
  };

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
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/home" className="nav-link" onClick={logOut}>
                  Logout
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <Button
                type="button"
                variant="link"
                onClick={() => {
                  setShowLogin(true);
                }}
              >
                <i className="bi bi-person"></i>
              </Button>

              {/* <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Register
                </Link>
              </li> */}
              <Button
                type="button"
                variant="link"
                onClick={() => {
                  setShowRegister(true);
                }}
              >
                Register
              </Button>
            </div>
          )}

          <Button
            type="button"
            variant="link"
            onClick={() => {
              setShowCart(true);
            }}
          >
            <i className="bi bi-cart"></i>
          </Button>
        </nav>
      </div>

      <div className="container mt-3">
        <ShoppingCart show={showCart} onHide={() => setShowCart(false)} />
      </div>

      <div className="container mt-3">
        <Login show={showLogin} onHide={() => setShowLogin(false)} />
      </div>

      <div className="container mt-3">
        <Register show={showRegister} onHide={() => setShowRegister(false)} />
      </div>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/home"
            element={<Home showAdminBoard={showAdminBoard} />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/updatepassword" element={<ForgotPassword />} />
          <Route path="/addproduct" element={<CreateProduct />} />
          <Route
            path="/user/:id"
            element={<ProductDetail showAdminBoard={showAdminBoard} />}
          />
          <Route path="/editproduct/:id" element={<EditProduct />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
