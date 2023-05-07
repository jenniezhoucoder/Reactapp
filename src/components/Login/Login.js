import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import { Button } from "react-bootstrap";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Modal from "react-bootstrap/Modal";
import { FORM } from "../../constants";
import { Link } from "react-router-dom";
import ForgotPassWord from "../ForgotPassword/ForgotPassword";

import AuthService from "../../services/auth.service";
import CartService from "../../services/cart.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        {FORM.ALERT}
      </div>
    );
  }
};

const Login = ({ show, onHide }) => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showFPass, setShowFPass] = useState(false);

  const handleForgotPassword = () => {
    setShowFPass(true);
  };

  const handleLoginAccount = () => {
    setShowFPass(false);
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password)
        .then(async () => {
          const user = await AuthService.getCurrentUser();
          const cartItems = JSON.parse(localStorage.getItem("cart"));
          console.log(cartItems);
          if (user) {
            if (cartItems && cartItems.length > 0) {
              cartItems.forEach((item) => {
                console.log("userid:" + user.id);
                console.log("cartItem" + item.productId);
                const response = CartService.addToCart(
                  user.id,
                  item.productId,
                  item.quantity
                );
              });
            }
          }
          setUsername(username);
        })
        .then(
          () => {
            navigate("/home");
            window.location.reload();
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setLoading(false);
            setMessage(resMessage);
          }
        );
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg">
        {showFPass ? (
          <ForgotPassWord show={showFPass} onHide={setShowFPass} />
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{FORM.LOGIN_TITLE}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleLogin} ref={form}>
                <div className="form-group">
                  <label htmlFor="username">{FORM.EMAIL.USERNAME}</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">{FORM.EMAIL.PASSWORD}</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <button
                    className="btn btn-primary btn-block"
                    disabled={loading}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>{FORM.LOGIN_BUTTON}</span>
                  </button>
                </div>

                {message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </Form>
            </Modal.Body>
          </>
        )}

        <Modal.Footer>
          {showFPass ? (
            <>
              <Button variant="link" onClick={handleLoginAccount}>
                Login to you account
              </Button>
            </>
          ) : (
            <>
              <Button variant="link" onClick={handleForgotPassword}>
                forgot your password?
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
