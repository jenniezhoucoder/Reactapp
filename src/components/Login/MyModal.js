import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Row } from "react-bootstrap";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import Register from "../Register/Register";
import Login from "./Login";

const MyModal = ({ show, onHide }) => {
  const [mode, setMode] = useState("signin");
  const handleMode = (newMode) => {
    setMode(newMode);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === "signin"
            ? "Sign in"
            : mode === "signup"
            ? "Sign up"
            : "Forgot Password"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {mode === "signin" && <Login mode={mode} handleMode={handleMode} />}
        {mode === "signup" && <Register mode={mode} handleMode={handleMode} />}
        {mode === "forgot-passeword" && (
          <ForgotPassword mode={mode} handleMode={handleMode} />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default MyModal;
