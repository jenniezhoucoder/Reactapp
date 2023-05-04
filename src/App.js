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

const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [total, setTotal] = useState(0);
  const [shoppingCart, setShoppingCart] = useState([]);

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

  const handleAddToCart = async (productId, quantity) => {
    try {
      let response;
      const user = await AuthService.getCurrentUser();
      //user login
      if (user) {
        const userId = user && user.id;
        response = await CartService.addToCart(userId, productId, quantity);
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
      fetchCart();
      console.log("productId" + productId);
    } catch (err) {
      console.error(err);
    }
  };

  // shopping cart
  const fetchCart = async () => {
    try {
      const response = await CartService.getCart(currentUser.id);
      setShoppingCart(response.data.products);
      setTotal(response.data.total);
    } catch (error) {
      console.log(error);
    }
  };

  // const fetchCart = async () => {
  //   try {
  //     const user = AuthService.getCurrentUser();
  //     let cartItem = [];
  //     const tempCart = JSON.parse(localStorage.getItem("cart")) || [];
  //     if (tempCart.length > 0) {
  //       tempCart.forEach((item) => {
  //         cartItem.push({ product: item, quantity: item.quantity });
  //       });
  //     }
  //     //if user is logined in
  //     if (user) {
  //       const response = await CartService.getCart(user.id);
  //       if (response.data.length > 0) {
  //         response.data.forEach((item) => {
  //           const index = cartItem.findIndex(
  //             (cartItem) => cartItem.product._id == item.product._id
  //           );

  //           if (index > 0) {
  //             cartItem[index].quantity += item.quantity;
  //           } else {
  //             cartItem.push(item);
  //           }
  //         });
  //       }
  //     }
  //     setShoppingCart(cartItem);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const handleRemoveToCart = async (productId) => {
    try {
      const user = await AuthService.getCurrentUser();
      if (user) {
        const username = user && user.username;
        const response = await CartService.removeFromCart(username, productId);
        const updatedCart = response.data;
        setShoppingCart(updatedCart.products);
        setTotal(response.data.total);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateTotalPrice = (deltaPrice) => {
    setTotal(total + deltaPrice);
  };

  //logout
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
                <a href="/login" className="nav-link" onClick={logOut}>
                  Logout
                </a>
              </li>
              <Button
                type="button"
                variant="link"
                onClick={() => {
                  setShowCart(true);
                }}
              >
                <i className="bi bi-cart"></i>
              </Button>
              <Button variant="link">${total}</Button>
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
        <ShoppingCart
          show={showCart}
          onHide={() => setShowCart(false)}
          user={currentUser}
          total={total}
          shoppingCart={shoppingCart}
          fetchCart={fetchCart}
          handleRemoveToCart={handleRemoveToCart}
          handleUpdateTotalPrice={handleUpdateTotalPrice}
        />
      </div>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/home"
            element={
              <Home
                // currentUser={currentUser}
                showAdminBoard={showAdminBoard}
                // cart={cart}
                // setCart={setCart}
                handleAddToCart={handleAddToCart}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/user" element={<BoardUser />} /> */}
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/updatepassword" element={<ForgotPassword />} />
          <Route path="/addproduct" element={<CreateProduct />} />
          <Route path="/user/:id" element={<ProductDetail />} />
          <Route path="/editproduct/:id" element={<EditProduct />} />
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
